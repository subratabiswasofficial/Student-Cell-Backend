import { model, Schema, Model } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema: Schema = new Schema(
    {
        uuid: { type: String, required: true },
        type: { type: String, required: true },
        email: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        address: { type: String, required: false },
        password: { type: String, required: true },
        avatar: {
            location: {
                type: String,
                required: false
            },
            key: {
                type: String,
                required: false
            }
        }
    },
    {
        timestamps: true
    }
);

// UserSchema.pre('save', function (next, error) {});
// https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/models/User.ts

const userModel: Model<IUser> = model('user', UserSchema);
export default userModel;
