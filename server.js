require('dotenv').config()

const http = require("http")
const express = require("express")
const path = require("path")
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

const {
    pathToFileURL
} = require("url")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const my_info = {
    msg_profile: "Back-end Developer and DevOps Engine",
    email: "leltonshift@gmail.com",
    phone: "(61) 98201-0457",
    name_profile: "Lelton Borges"
}

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

// static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + "public/css"))
app.use('/js', express.static(__dirname + "public/js"))
app.use('/img', express.static(__dirname + "public/img"))

// set View
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // res.sendFile(path.join(`${__dirname}/views/index.html`))
    res.render('index', my_info)
})

app.post('/contato', (req, res) => {

    const nome = req.body.email_envio_nome
    const email = req.body.email_envio
    const titulo = req.body.email_envio_assunto
    const texto = req.body.email_envio_texto

    const subject = `[DEV FOLIO] - CONTATO de ${nome}`
    const body = `<h3>Assunto: ${titulo}<h3>
                <p>${texto}</p>
                </hr>
                <h3>- ${nome} - ${email}</h3>`;

    transporter.sendMail({
            from: my_config_smtp.username,
            to: my_config_smtp.to,
            subject: subject,
            html: body
        })
        .then(msg => console.log(msg))
        .then()
        .then(e => res.redirect("/#contact"))
        .catch(err => {
            console.log(err)
            res.redirect("/#contact")
        })
})

app.all('/*', (req, res) => {
    res.redirect('/');
})

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Listening on ${PORT}`))