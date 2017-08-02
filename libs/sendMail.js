const nodemailer = require('nodemailer');

exports.sendMail = function (subject, body, email) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'usermail@gmail.com',
            pass: 'pass'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Ticket Support" <user@gmail.com>', // sender address
        to: email , // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        html: "<p>" + body + "</p>" // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

}