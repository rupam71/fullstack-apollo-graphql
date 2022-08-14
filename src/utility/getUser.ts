import jwt from 'jsonwebtoken';
import User from '../service/user/model';

interface JwtPayload {
    _id: string
  }

export const getUser = async(token:string) => {
    const decoded = jwt.verify(token, process.env.JWT as string) as JwtPayload
    
    const user = await User.find({_id:decoded._id})

    if(user.length===0) return null
    else return user[0]
}