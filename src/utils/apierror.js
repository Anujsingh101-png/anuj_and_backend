class apierror extends Error{
    constructor(                                  // A constructor is a special method inside a class that runs automatically when you create a new object from that class.
        statuscode,                               //Every time you use new, the constructor builds and prepares the object.
        massage= "something went wronge",
        errors = [],
        statck = ""
    )
    {
        super(massage),
        this.statuscode = statuscode,                 //statusCode is the HTTP response code that tells the client (browser/Postman/frontend) what happened with the request.
        this.data = null,                           // this assigns the values to different veriables in contructor
        this.message = massage
        this.success = "failure" ,
        this.errors = errors


        if(stack){
            this.statck = stack
        }else{
            Error.capturestacktrack(this,this.constructor)
        }
    }
}

export {apierror}