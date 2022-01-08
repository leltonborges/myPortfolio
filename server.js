require('dotenv').config()

const http = require("http")
const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
const my_info = require('./config/person')
const {transporter, my_config_smtp} = require('./config/sendEmail')

const PORT = process.env.PORT || 5000;

const {
    pathToFileURL
} = require("url")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


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
        .then() // TODO: add modal success
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