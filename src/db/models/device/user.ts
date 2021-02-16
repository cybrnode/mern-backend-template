import mongoose, {Schema, Model, Document} from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        max: 255,
    },
    last_name: {
        type: String,
        required: true,
        max: 255,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    registered_at: {
        type: Date,
        default: Date.now,
    },
});

export interface UserProps extends Document {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    registered_at: Date;
}

const User: Model<UserProps> = mongoose.models.User || mongoose.model("User", userSchema);
export default  User;
