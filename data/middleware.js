
export const nameChecker=(name) =>{
return((req, res, next) =>{
    req.body.name = req.body.name.toUpperCase() || '';
    (!req.body.name ? res.status(404).json({message:'Name must be Included and Name must be uppercase'}):next())
})
}

module.exports = {nameChecker}