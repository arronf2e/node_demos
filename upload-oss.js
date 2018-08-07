
const OSS = require('ali-oss');
const fs = require('fs');
const path = require("path");
const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'your accessKeyId',
    accessKeySecret: 'you accessKeySecret',
    bucket: 'your bucket-name'
});
const buildFolder = 'build';  // 默认为create-react-app项目，build为生产环境打包文件夹

function readBuild(buildFolder) {
    // 读取 build 文件夹下的所有文件
    let files = fs.readdirSync(`${buildFolder}`);
    // 区分文件与文件夹
    files.forEach(file => {
        let newDir = path.join(buildFolder, file);
        let stat = fs.statSync(newDir);
        // console.log(newDir, 'newDir')
        if(stat.isFile()) {
            // 如果是文件，直接上传
            put(newDir);
        }else {
            // 如果是文件夹，继续递归
            readBuild(newDir);
        }
    })
}

async function put(file) {
    // console.log(file, 'file')
    try {
        // oss中没有文件夹的概念，xxx/yyy.js，就相当于将文件传到xxx文件夹下
        let startTime = new Date();
        let result = await client.put(`xxx/xxx/${file}`, `${file}`);
        let useTime = (new Date() - startTime) / 1000;
        console.log(useTime + 's');
    } catch (e) {
        console.log(e);
    }
}

readBuild(buildFolder);


