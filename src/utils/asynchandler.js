const asynchandler = (requesthandler) => { return (req,res,next) =>{                  //Because Express calls the returned function, not the wrapper itself.
    Promise.resolve(requesthandler(req,res,next)).catch((err) => next(err))
} }  //asyncHandler wraps async controllers and forwards rejected promises to Express error middleware using next(), preventing unhandled promise crashes.



/*
const asynchandler = (fun) = async(req,res,next) => {                              //treate function as parameter (high order function)
    try {
        await fun(req,res,next)
    } catch (error) {
        res.status(error.code || 500) . json({
            success : false,   // for frountend
            massage : err.massage
        })
    }
} */

export {asynchandler}