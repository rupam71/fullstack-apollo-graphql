import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

interface UserType {
  name: string
  email: string
  password: string
  phone: string
}

const UserSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value:string){
          if(!validator.isEmail(value)){
              throw new Error ('Email not valid')
          }
      },
      trim: true,
      loadClass:true
    },
    password: {
      type: String,
      required: true,
      default: 'qwer   yuio   plmbvcxd    hjhghjb guytgfuyg',
      trim : true,
      validate(value:string){
          if(value.length<6) {
              throw new Error('Password need to be atleast 6 word')
          }
          if(value==='password') {
              throw new Error('password can not be password')
          }
      }
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },    
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function(next){
  const user = this

  if(user.isModified('password')){
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }

  next()
})

const User = mongoose.model<UserType>("User", UserSchema);
export default User;
