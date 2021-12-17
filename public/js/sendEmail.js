send.addEventListener('click', function () {

    Email.send({
        Host: process.env.HOST_SMTP,
        Username: process.env.MY_USERNAME,
        Password: process.env.MY_PASSWORD,
        To: process.env.MY_SEND_TO_EMAIL,
        From: process.env.MY_SEND_FROM_EMAIL,
        Subject: "TESTE SUBJECT",
        Body: "Content body"
    }).then(
        message => alert(message)
    );
})