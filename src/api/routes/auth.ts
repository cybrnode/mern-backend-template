import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import express, { NextFunction, Request, Response } from "express";

import User from "../../db/models/device/user";
import {ServerConfig} from '../../config/config';
import {createLogger} from '../../logger/logger';


const router = express.Router();
const serverConfig = ServerConfig.getConfig();
const logger = createLogger(__filename);

const JWT_SECRET = serverConfig.jwtSecret;


const invalidEmailOrPassResponse = {
    status: "error",
    message: "Wrong username or password",
};

const registerValidationRules = [
    body("first_name").isLength({ min: 2 }),
    body("last_name").isLength({ min: 1 }),
    body("password").isLength({ min: 6 }),
    body("username").isEmail(),
];

const loginValidationRules = [
    body("username").isEmail(),
    body("password").isLength({min: 6})
];


const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: any = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

router.post("/register", registerValidationRules, validate, async (req: Request, res: Response) => {
    const salt = await bcrypt.genSalt(10);

    try {
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: passwordHash,
        });

        logger.info(`making new user: ${user}`);

        const savedUser = await user.save();

        const response = {
            status: "success",
            action: "save",
            data: {
                user_id: savedUser._id
            },
        };

        res.json(response);
    } catch (err) {
        logger.debug(`couldn't create new user: ${err}`);
        let response = {};
        if (err.code === 11000) {
            response = { status: "error", message: "username already exists" };
        } else {
            response = { status: "error", message: err.message };
        }
        res.status(500).json(response);
    }
});

router.post("/login", loginValidationRules, validate, async (req: Request, res: Response) => {
    
    const user = await User.findOne({
        username: req.body.username
    });

    if (!user) {
        return res.status(400).json(invalidEmailOrPassResponse);
    }

    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPassValid) {
        return res.status(400).json(invalidEmailOrPassResponse);
    }

    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET);

    res.json({
        status: "success",
        action: "save",
        data: { token }
    });
});

export default router;
