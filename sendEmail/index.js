const nodemailer = require('nodemailer');

const config = {
	host: "smtp.163.com",
    secureConnection: true,
    port: 465,
    auth: {
        user: 'arronf2e@163.com',
        pass: 'zhanghao2202',
    }
}

const options = {
	from: 'arronf2e@163.com',
	to: '191446367@qq.com',
	subject: 'nodemailer test(title)',
	html: '<h2>hello nodemailer</h2>'
}

const transporter = nodemailer.createTransport(config);

transporter.sendMail(options, function(err, info) {
	if(err) {
		console.log(err)
	}else {
		console.log('Sueecss', info)
	}
})
