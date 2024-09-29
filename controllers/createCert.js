const User = require('../models/user');
const sendEmail = require('../middlewares/sendEmail');
const generateCert = require('../middlewares/gen');

console.log("Type of: ", typeof(generateCert), typeof(sendEmail), typeof(generateCert));

const emailValidator = (email) => {
    
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

exports.certifyUser = async (req, res) => {
  const { email } = req.body;
   
  if (!email || !emailValidator(email)) {
    return res.status(400).send({ msg: "Invalid email address" })
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No such account exists!" });
    }

    await generateCert(user.username);
    await sendEmail(user.username, email);
    
    return res.status(200).send({ msg: "Your certifcate has been sent to your email" });

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
    return;
  }

}

