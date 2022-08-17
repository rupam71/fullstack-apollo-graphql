import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { sendUserResponse } from "./helper";
import User from "./model";

export const UserMutation = {
  addUser: async (parent: any, args: any, context: any, info: any) => {
    const user = new User(args.addUserInput);

    try {
      await user.save()
      return sendUserResponse(200,"Success",user)
    } catch (error:any) {
      if(error.code) return sendUserResponse(403,"This email already used")
      else {
        const errMessage = (Object as any).entries(error.errors)[0][1].message
        return sendUserResponse(403,errMessage)
      }
    }
  },
  updateUser: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendUserResponse(403,"Permission Denied",{})
    if(context.user.id!==args.updateUserInput.id) return sendUserResponse(403,"Only User Can Update Own Profile",{})
    
    if(!mongoose.Types.ObjectId.isValid(args.updateUserInput.id)) return sendUserResponse(403,"Invalid ID")
    else if(args.updateUserInput.password) {
      const password = args.updateUserInput.password 
      if(password.length<6) return sendUserResponse(403,"Password need to be atleast 6 word")
      else if(password === "password") return sendUserResponse(403,"password can not be password")
      else {
        const salt = await bcrypt.genSalt(10)
        args.updateUserInput.password = await bcrypt.hash(args.updateUserInput.password, salt)
      }
    }

    try {
      const user = await User.findByIdAndUpdate(
        args.updateUserInput.id,
        {...args.updateUserInput},
        { new: true }
      );

      if (!user) return sendUserResponse(401,"The User With Given ID Not Found",{})
      return sendUserResponse(200,"Success",user)
    } catch (error) {
      console.log(error)
    }
    
  },
  deleteUser: async (parent: any, args: any, context: any, info: any) => {
    if(!context.user)  return sendUserResponse(403,"Permission Denied",{})
    if(context.user.id!==args.id) return sendUserResponse(403,"Only User Can Delete Own Profile",{})

    if(!mongoose.Types.ObjectId.isValid(args.id)) return sendUserResponse(403,"Invalid ID",{})

    const user = await User.findByIdAndRemove(args.id);
    if (!user) return sendUserResponse(401,"The User With Given ID Not Found",{})

    return sendUserResponse(200,"Success",user)
  },
};
