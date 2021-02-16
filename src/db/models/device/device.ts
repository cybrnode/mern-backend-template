import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


// Note for Schema 
// Use Schema datatypes not the js/ts one

const deviceSchema = new Schema({
    registered_at: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    id: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // TODO: Enable this after auth implemented
        // required: true,
    },
});


// use ts datatypes in the interface.
// TODE: wat advantage we will get with the interface?

export interface DeviceProps extends mongoose.Document {
    registered_at: Date;
    id: string;
    online: boolean;
    last_seen: number;
    last_alert_time: number;
    last_alert_type: string;
    user_id: string;
    // Duplicate all props from the above schema :(
}

deviceSchema.plugin(uniqueValidator);
const Device: mongoose.Model<DeviceProps> = mongoose.models.Device || mongoose.model("Device", deviceSchema);

export default Device;
