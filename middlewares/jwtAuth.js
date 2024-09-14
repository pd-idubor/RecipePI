const jsonwebtoken = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jsonwebtoken.verify(token,
	  process.env.TOKEN_SECRET,
	  (err, decoded) => {
	    if (err) {
	      return res.status(401).send({
		message: "Unauthorized!",
                });
              }
	      console.log("Token still valid");
	      req.userId = decoded.id;
              next();
            });
};

