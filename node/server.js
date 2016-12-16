/*先安装模块
$ npm install express --save
$ npm install body-parser --save
$ npm install cookie-parser --save
$ npm install multer --save*/

var express = require('express');
var app = express();
var fs = require("fs");//上传文件

var bodyParser = require('body-parser');//post 上传文件
var multer  = require('multer');//上传文件

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })//post

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));//上传文件
app.use(multer({ dest: '/tmp/'}).array('image'));//上传文件

app.get('/index.htm1', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm1" );
})

app.get('/process_get', function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // 输出 JSON 格式
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})

//读取users.json文件
app.post('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
	   res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
       res.end(JSON.stringify(data));
   });
})

app.post('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	   data = JSON.parse( data );
	   res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
	   for(var i=0;i<data.length;i++){
		   var obj = data[i];
		   if(obj.id == req.body.idd ){
			// delete data[i];
			  data.splice(i,1);
			  console.log( data );
              res.end( JSON.stringify(data));
			  return;
			}
		   }
   });
})

app.post('/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
	   for(var i=0;i<data.length;i++){
		   var obj = data[i];
		  // data.splice(i,1);
		   if(obj.id == req.body.id ){
			   obj.name = req.body.name;
			   obj.password = req.body.password;
			   obj.profession = req.body.profession;
			  //  data.push(obj);
			   }
		   }
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.post('/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
	   for(var i =0 ;i<data.length;i++){
		  var obj =  data[i];
		  if(obj.id == req.params.id ){
			    console.log( obj );
                res.end( JSON.stringify(obj));
				return;
			  }
		   }
   });
})





var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})