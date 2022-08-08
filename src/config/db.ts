import mongoose from "mongoose"

const db = async () => {
    await mongoose.connect(process.env.MONGO_URI as string).then(res=>{
        console.log(`MongoDB Conntected At Port ${process.env.MONGO_URI}`)
    }).catch(error=>{
        console.log(`Someting Wrong In Database Connection.`)
    })
}

export default db;