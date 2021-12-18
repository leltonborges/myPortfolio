// btnMandar.addEventListener('click', function () {
//     Email.send({
//         Host: process.env.HOST_SMTP,
//         Username: process.env.MY_USERNAME,
//         Password: process.env.MY_PASSWORD,
//         To: process.env.MY_SEND_TO_EMAIL,
//         From: process.env.MY_SEND_FROM_EMAIL,
//         Subject: "TESTE SUBJECT",
//         Body: "Content body"
//     }).then(
//         message => alert(message)
//     );
// })


$('form.contactForm').submit(function (e) {
    e.preventDefault();
    let nome = null;
    let email = null;
    let titulo = null;
    let texto = null;

    for (let i = 0; i < e.target.elements.length; i++) {

        if (e.target.elements[i].name == 'email_envio_nome') {
            nome = e.target.elements[i].value;
        } else if (e.target.elements[i].name == 'email_envio') {
            email = e.target.elements[i].value;
        } else if (e.target.elements[i].name == 'email_envio_assunto') {
            titulo = e.target.elements[i].value;
        } else if (e.target.elements[i].name == 'email_envio_texto') {
            texto = e.target.elements[i].value;
        }

    }

    if (nome && email && titulo && texto) {
        console.log(`nome: ${nome}`);
        console.log(`email: ${email}`);
        console.log(`titulo: ${titulo}`);
        console.log(`texto: ${texto}`);
        let subject = `<h1>[DEV FOLIO] - CONTATO de ${nome}</h1>`
        let body = `<h3>Assunto: ${titulo}<h3>
                    <p>${texto}</p>
                    </hr>
                    <h3>- ${nome} - ${email}</h3>`;

        Email.send({
                Host: process.env.HOST_SMTP,
                Username: process.env.MY_USERNAME,
                Password: process.env.MY_PASSWORD,
                To: process.env.MY_SEND_TO_EMAIL,
                From: process.env.MY_SEND_FROM_EMAIL,
                Subject: subject,
                Body: body
            })
            .then(j => j.json())
            .then(json => {
                $("#sendmessage").show();
                $("#errormessage").hide();
            })
            .catch(err => {
                $("#errormessage").val(err.msg).show();
                $("#sendmessage").hide();
            })
            .finally(e => {
                $('form input').prop('disabled', false)
                $('form textarea').prop('disabled', false)
                $('#btnMandar').show();
            })

    }
})