const express = require("express");
const app = express();
const compress = require('compression');
app.use(compress());           //配合nginx做gzip压缩  express4以上写法

app.use('/', express.static('./dist'));

app.get("*",function(req, res, next){
	if(req.path.indexOf("favicon.ico") == -1) {
		res.redirect('/views' + req.path);	
	}
})

app.listen(9092, () => {
    console.log("正在监听9092");
})

