
import express, { Request, Response } from "express";

import Device, { DeviceProps } from "../../db/models/device/device";
import {createLogger} from "../../logger/logger";


const router = express.Router()

router.get("/?", async (req: Request, res: Response) => {
    const devices = (await Device.find().select("-online -_id -__v").exec()) as DeviceProps[];
    return res.json(devices);
});

export default router;
