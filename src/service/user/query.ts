import mongoose from "mongoose";
import { sendUserResponse } from "./helper";
import User from "./model";
import jwt from "jsonwebtoken"

export const UserQuery = {
  getAllUser: async (parent: any, args: any, context:any) => {
    if(!context.user)  return sendUserResponse(403,"Permission Denied",{})
    else return await User.find()
  },
  getUserById: async (parent: any, args: any, context:any) => {
    if(!context.user)  return sendUserResponse(403,"Permission Denied",{})
    if(!mongoose.Types.ObjectId.isValid(args.id)) return sendUserResponse(403,"Invalid ID",{})

    const user = await User.findById(args.id);
    if (!user) return sendUserResponse(401,"This User Not Exists")

    return sendUserResponse(200,"Success",user)
  },
  getProfileUser: async (parent: any, args: any) => {
    const user = await User.find({ email: args.email });

    if(user.length===0) return sendUserResponse(401,"Email Not Match")
    else if(user[0].password!==args.password) return sendUserResponse(401,"Password Not Match")
    else {
      const token = jwt.sign({ _id: user[0]._id.toString() },process.env.JWT as string)
      return sendUserResponse(200,"Success",user[0],token)
    }
  },
};
