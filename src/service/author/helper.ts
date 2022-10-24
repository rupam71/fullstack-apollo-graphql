export const sendAuthorResponse = (statusCode:number,message:string,author:any=[],count=0) => {
    return { 
        statusCode,
        message,
        result:{
            author,
            count
        }
     }
}