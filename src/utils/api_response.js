class api_response {
    constructor(statusCode,Data,message = "success"){
        this.statusCode = statusCode,
        this.Data = Data,
        this.message = message,
        this.success = statusCode < 400
    }
}
export {api_response}