const express = require('express');
//handlebars - Express Middleware - Adds Additional functionality
//helpers to improve the dev productivity
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+"/public"));
//TO pass common data to all pages
//When something is used inside curl braces , handlebar will look for
//the helper with that name , and if it does not exist , it is going to
//look for a piece of data sent to it
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(request,response)=>{
  // response.send('Hello Express!');
  response.send({
    name: 'Sreesha',
    likes:[
      'Keyboarding'
      ,'Road Trips'
    ]
  });
});

app.get('/about',(request,response)=>{
  // response.send('Hello Express!');
  response.render('about.hbs',
    {
      pageTitle: 'About Page'
    }
  );
});
app.get('/home',(request,response)=>{
  // response.send('Hello Express!');
  response.render('home.hbs',
    {
      pageTitle: 'Home Page',
      welcomeMessage: "Hello , Wassup ! Welcome to my website ! :) "
    }
  );
});
// Port for developing locally
app.listen(3000 , ()=>{
  console.log('Server is up on port 3000');
});
