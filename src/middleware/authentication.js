const jwt = require("jsonwebtoken");
const authentication = async function (req, res, next) {
  try {
    if (!req.headers.authorization)
      return res
        .status(400)
        .send({ status: false, message: "token is required" });
    let token = req.headers.authorization.split(" ")[1];
    let userId = req.params.userId;
   
    jwt.verify(token, JWT_ACCESS_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ status: false, message: err.message });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports={authentication}