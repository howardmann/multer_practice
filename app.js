var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var multer = require('multer');
var upload = multer({dest: 'public/uploads/'});
var fs = require('fs');
var app = express();

app.use(express.static(path.resolve(__dirname, "public")));
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/camera', function(req, res){
  res.render('camera');
});

app.get('/images', function(req, res, next){
  var files = [];
  fs.readdir('public/uploads/', function(err, filenames){
    filenames.forEach(function(filename){
      let src = `/uploads/${filename}`;
      files.push(src);
    })
  });

  res.render('images', {data: files})
});

app.post('/profile', upload.single('avatar'), function(req, res, next){
  console.log(req.file);
  res.redirect('/images');
});

app.listen(3000, function(){
  console.log('Listening on port 3000');  
});



