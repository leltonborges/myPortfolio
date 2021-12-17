const http = require("http")
const express = require("express")
const path = require("path")
const {
    pathToFileURL
} = require("url")

const app = express()

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
    res.render('index', 
    {
        msg_profile: "Back-end Developer and Devps Engine",
        email: "leltonshift@gmail.com",
        phone: "(61) 98201-0457",
        name_profile: "Lelton Borges"
    })
})

const server = http.createServer(app)

server.listen(3000)