const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const queryUrl = 'http://www.mmjpg.com/home/';
const chooseDom = ".pic ul li a img";
// const pagemax = 10; // 获取到多少页的内容
const startindex = 1;
const dir = './source'

var urls = [];
var sumConut = 0;

function getHtml(url, page) {
	//发送请求
	request(url + page, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(body);
			$(chooseDom).each(function() {
				var src = $(this).attr('src');
				console.log('正在下载' + src);
				download(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4));
				console.log('下载完成');
			});
		}
	});
}

function download(imgUrl, dir, filename) {
	request.head(imgUrl, function(err, res, body) {
		request(imgUrl).pipe(fs.createWriteStream(dir + "/" + filename));
	});
}

function start() {
	getHtml(queryUrl, startindex);
}

start();