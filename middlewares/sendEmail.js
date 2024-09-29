const nodemailer = require("nodemailer");

const sendCert = async(username, userEmail)=>{
  try {
    const mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
	  user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_PASSWORD}`
	}
    });
   const emailInfo = {
	from: `${process.env.EMAIL}`,
        to: userEmail,
        subject: "RecipePI Appreciation",
        html: `<div>
        <p>Thank you for your commitment</p>
        <p>Please find attached your certificate.</p>
	</div>`,
        attachments: [{
        filename: 'Certificate.pdf',
        path: `Cert.pdf`,
	contentType: 'application/pdf'
	}]
   };
  const result = await mailTransporter.sendMail(emailInfo);

  } catch (err) {
    console.log(err);
  }
}


module.exports = sendCert;
