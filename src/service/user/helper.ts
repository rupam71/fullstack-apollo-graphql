export const sendUserResponse = (statusCode:number,message:string,user:any={}) => {
    return { statusCode,message,user }
}