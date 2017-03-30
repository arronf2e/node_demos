var app = require('express')();
var superagent = require('superagent');
var cheerio = require('cheerio');

app.get('/recommendLst', function (req, res) {

  var resObj = {
    code: 200,
    data: []
  }

  superagent.get('http://music.163.com/discover')
    .end(function (err, sres) {
      if(!err) {
        var dom = sres.text;
        var $ = cheerio.load(dom);
        var recommendLst = [];
        $(".m-cvrlst").eq(0).find('li').each(function (index, ele) {
          var cvrLink = $(ele).find('.u-cover').find('a');
          console.log(cvrLink.html());
          // 获取歌单封面
          var cover = $(ele).find('.u-cover').find('img').attr('src');
          var recommendItem = {
            id: cvrLink.attr('data-res-id'),
            title: cvrLink.attr('title'),
            href: 'http://music.163.com' + cvrLink.attr('href'),
            type: cvrLink.attr('data-res-type'),
            cover: cover
          }
          recommendLst.push(recommendItem);
        })
        resObj.data = recommendLst;
      }else {
        resObj.code = 404;
        console.log('Get data error!');
      }
      res.send(JSON.stringify(resObj));
    });
})

app.get('/playlist/:playlistId', function (req, res) {
  var playlistId = req.params.playlistId;
  var resObj = {
    code: 200,
    data: []
  };
  superagent.get(`http://music.163.com/playlist?id=${playlistId}`)
    .end(function (err, sres) {
      if(!err) {
        var playlist = {
          id: playlistId
        };
        var $ = cheerio.load(sres.text, {decodeEntities: false});
        // 获得歌单dom
        var dom = $('#m-playlist')
        // 歌单标题
        playlist.title = dom.find('.tit').text();
        // 戨单所有者
        playlist.owner = dom.find('.user').find('.name').text();
        // 创建时间
        playlist.create_time = dom.find('.user').find('.time').text();
        // 被收藏数量
        playlist.collection_count = dom.find('#content-operation').find('.u-btni-fav').attr('data-count');
        // 分享数量
        playlist.share_count = dom.find('#content-operation').find('.u-btni-share').attr('data-count');
        // 评论数量
        playlist.comment_count = dom.find('#content-operation').find('#cnt_comment_count').html();
        // 标签
        playlist.tags = [];
        dom.find('.tags').eq(0).find('.u-tag').each(function (index, ele) {
          playlist.tags.push($(ele).text());
        });
        // 歌单描述
        playlist.desc = dom.find('#album-desc-more').html();
        // 歌曲总数量
        playlist.song_count = dom.find('#playlist-track-count').text();
        // 播放总数量
        playlist.play_count = dom.find('#play-count').text();
        // 歌单歌曲
        playlist.songs = JSON.parse(dom.find('#song-list-pre-cache').find('textarea').html());
        resObj.data = playlist;
      }else {
        resObj.code = 404;
        console.log('Get data error');
      }
      res.send(JSON.stringify(resObj));
    })

})

app.listen(3000, function () {
  console.log('Server is listening at 3000');
})
