
export const nameChecker=(req, res, next) =>{
    req.body.name = req.body.name.toUpperCase();
  next();
}


module.exports = {nameChecker}