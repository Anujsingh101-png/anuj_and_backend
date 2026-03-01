const asynchandler = (requesthandler) => (req,res,next) =>{                  //Because Express calls the returned function, not the wrapper itself.
    Promise.resolve(requesthandler(req,res,next)).catch((err) => next(err))
}



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