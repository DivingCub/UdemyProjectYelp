module.exports = func =>{

    return(req,res,next) =>{
        func(req,res,next).catch(next);
    }
    //抓到next的东西，从而完成后续的操作项目

}

