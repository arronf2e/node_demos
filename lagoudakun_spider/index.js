const http = require('http'),
			url = require('url'), 
			async = require('async'),
			superagent = require('superagent'),
			cheerio = require('cheerio'),
			eventproxy = require('eventproxy');

let ep = new eventproxy(),
		productData = [],
		pageUrls = ['https://pro.lagou.com/project/kaifa/'],   //	存放要爬取的页面
		pageNum = 30;  //  要爬取项目的页数


// 获取 30 页的url
for(let i = 1; i <= pageNum; i++) {
	pageUrls.push(`https://pro.lagou.com/project/kaifa/${i}/`);
}

const onRequest = (req, res) => {
	
	pageUrls.forEach(pageUrl => {
		superagent
			.get(pageUrl)
			.end((err, pres) => {
					// pres 存储的是返回的html
					let $ = cheerio.load(pres.text);


					let countPerpage = $('#project_list li').length;

					let status = $('.recruiting').text();

					let pronames = $('#project_list h3');

					let prices = $(".range");

					for(let i = 0; i < countPerpage; i++) {

						// productData.push({
						// 	'status': status[i],
						// 	'proname': pronames[i],
						// 	'price': prices[i]
						// })
						console.log(pronames[i])

						// 相当于一个计数器
						ep.emit('BlogArticleHtml', 20);
					}

			})
	})
		
	ep.after('BlogArticleHtml', pageUrls.length * 2, pageUrls => {
		// 当所有BlogArticleHtml事件完成后触发该回调
		
		// console.log(productData)

	})
}

http.createServer(onRequest).listen(3000);