const sendResponse = (result:Object,message:string="Success",statusCode=200) => {
    const response = {
        message,
        statusCode,
        result
    }

    return response
}

export default sendResponse;