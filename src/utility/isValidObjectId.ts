import mongoose from 'mongoose';

const isValidObjectId = (id:any,user:string) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new Error(`${user} Id not valid`)
}

export default isValidObjectId