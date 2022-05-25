import { model, Schema } from "mongoose";

export interface IUSer {
    email: string;
    name :string;
    password :string;
}

const userSchema = new Schema({
    name: {type:String,unique:false},
    email: {type:String,unique:false},
    password: {type:String,unique:false},
});

export const User = model<IUSer & Document>("User",userSchema);