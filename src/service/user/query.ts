import mongoose from "mongoose";
import { sendUserResponse } from "./helper";
import User from "./model";

export const UserQuery = {
  getAllUser: async () => await User.find(),
  getUserById: async (parent: any, args: any) => {
    if(!mongoose.Types.ObjectId.isValid(args.id)) return sendUserResponse(403,"Invalid ID",{})

    const user = await User.findById(args.id);
    if (!user) return sendUserResponse(401,"This User Not Exists")

    return sendUserResponse(200,"Success",user)
  },
  getProfileUser: async (parent: any, args: any) => {
    const user = await User.find({ email: args.email });

    if(user.length===0) return sendUserResponse(401,"Email Not Match")
    else if(user[0].password!==args.password) return sendUserResponse(401,"Password Not Match")
    else return sendUserResponse(200,"Success",user[0])
  },
};
