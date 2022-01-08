const nodemailer = require('nodemailer')

const my_config_smtp = {
    username: process.env.MY_USERNAME,
    password: process.env.MY_PASSWORD,
    to: process.env.MY_SEND_TO_EMAIL
}

const transporter = nodemailer.createTransport({
    host: process.env.HOST_SMTP,
    port: 465,
    secure: true,
    auth: {
        user: my_config_smtp.username,
        pass: my_config_smtp.password
    }
})


module.exports = {
    transporter,
    my_config_smtp
};