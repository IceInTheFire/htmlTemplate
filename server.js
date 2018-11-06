const express = require("express");
const app = express();
const compress = require('compression');
app.use(compress());           //配合nginx做gzip压缩  express4以上写法

app.use('/', express.static('./dist/views'));
app.use('/js', express.static('./dist/js'));
app.use('/css', express.static('./dist/css'));
app.use('/content', express.static('./dist/content'));
app.use('/lib', express.static('./dist/lib'));


app.listen(9092, () => {
    console.log("正在监听9092");
})

