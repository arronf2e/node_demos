const nodemailer = require('nodemailer');

const config = {
	host: "smtp.163.com", // 主机
	secureConnection: true, // 使用 SSL
	port: 465, // SMTP 端口 
	auth: {
		user: 'arronf2e@163.com',
		pass: 'zhanghao2202' // 注意这个不是邮箱的登录密码，是第三方授受密码！！！！
	}
}

const options = {
	from: 'arronf2e@163.com', //  这里一定要和上面的邮箱保持一致！！！
	to: '191446367@qq.com',
	subject: 'nodemailer test(title)',
	html: '<h2>hello nodemailer</h2>'
}

const transporter = nodemailer.createTransport(config);

transporter.sendMail(options, function(err, info) {
	if (err) {
		console.log(err)
	} else { 
		console.log('Sueecss', info)
	}
})
