export const sendUserResponse = (statusCode:number,message:string,user:any={},token?:string) => {
    return { 
        statusCode,
        message,
        user,
        ...(token && {token})
     }
}