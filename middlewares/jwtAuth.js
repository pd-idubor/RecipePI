const jsonwebtoken = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const token = authHeader.split(' ')[1];
  console.log(token);
  jsonwebtoken.verify(token,
	  process.env.TOKEN_SECRET,
	  (err, decoded) => {
	    if (err) {
	      return res.status(401).send({
		message: "Unauthorized!",
                });
              }
	      req.userId = decoded.id;
              next();
            });
};

