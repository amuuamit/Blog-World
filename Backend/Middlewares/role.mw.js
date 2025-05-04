function authorizeRole(...rest) {
  return function (req, res, next) {
    if (!rest.includes(req.user.role)) {
      res.status(401).json({ Message: "User is not allowed!!" });
      return;
    }
    next();
  };
}
module.exports =  authorizeRole ;