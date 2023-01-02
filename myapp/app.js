const { name } = require('ejs');
var express = require('express');
var session = require('express-session')
var fs = require('fs');
const flash = require('connect-flash');
var path = require('path');
const { callbackify } = require('util');
const { error, Console } = require('console');
var app = express();
var alert = require('alert');
const { JSONCookie } = require('cookie-parser');
const { title } = require('process');
const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'ssshhhhh',
saveUninitialized: true,resave: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var sess;

app.get('/',function(req,res){
  res.render('login');
});

//login function

app.post('/login',function(req,res){
  const collection = req.app.locals.collection;
  var x = req.body.username;
  var y = req.body.password;
  const f = collection.find({ name: x, pass: y }).toArray((err, result) => {
  var t = {name: x, pass: y }
  var tt = JSON.stringify(t);

  if (x == "" || y == ""){
    alert("Please make sure you entered all required data");
  }
  
  else if(result.length == 0){
    alert("User Not Found. Make sure the username and password you entered are correct!");
  }

  else {
    sess = req.session;
    sess.username=req.body.username;
    sess.password=req.body.password;
    fs.writeFileSync("user.json" , tt)
    alert("Welcome, " + x);
    res.render('home');
   }
});
});

//Get Home Page
app.get('/home',function(req,res){
  if (req.session.username && req.session.password){
    res.render('home',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Registration Page
app.get('/registration',function(req,res){
  res.render('registration');
});

//Registration Function
  app.post('/register',function(req,res){
      const collection = req.app.locals.collection;
      var u_name = req.body.username;
      var passw = req.body.password ; 
      collection.find({ name: u_name }).toArray((err, result) => {
      
      if( u_name == "" || passw == ""){
        alert("Please make sure you've entered all the required data");
       }

      else if(result.length > 0 ){
        alert("Username already exists. Please enter a different one");
      }
      else {
          var new_user = {name: u_name, pass: passw , wanttogolist: []};
          collection.insertOne(new_user);
          alert("User registered successfully! Please Login Now");
          res.render('login');
          }
    })
 });

//Get Cities page
app.get('/cities',function(req,res){
  if (req.session.username && req.session.password){
    res.render('cities');
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }

});

//Get Hiking Page
app.get('/hiking',function(req,res){
  if (req.session.username && req.session.password){
    res.render('hiking',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Get Islands Page
app.get('/islands',function(req,res){
  if (req.session.username && req.session.password){
    res.render('islands',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});


//Get Annapurna Page
app.get('/annapurna',function(req,res){
  if (req.session.username && req.session.password){
    res.render('annapurna',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Annapurna: add to want to go list 
app.post('/addtoannapurn' , function(req,res){
  const collection = req.app.locals.collection;
  var data = fs.readFileSync("user.json");
  var users = JSON.parse(data);
  var user_name = users.name;
    collection.find({ name: user_name }).toArray((err, result) => {
      var u_name = result[0].name;
      var q = result[0].wanttogolist;
      var exists = 0;
      for(var i = 0; i < q.length; i++){
        if(q[i] == "annapurna"){
          exists = 1;
          alert("Annapurna is already in your want to go list");
          break;
        }
      }

      if(exists == 0){
        q.push("annapurna");
        collection.updateOne(
          { name: u_name }, 
          { $set: { wanttogolist: q } },  (err, result) => {}
          )
          console.log(q);
          alert("Annapurna successfully added to your Want to Go List!");
      }
        })
  });


 //get Bali Page 
app.get('/bali',function(req,res){
  if (req.session.username && req.session.password){
    res.render('bali',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Bali: add to want to go list 
app.post('/addtobali' , function(req,res){
  const collection = req.app.locals.collection;
  var data = fs.readFileSync("user.json");
  var users = JSON.parse(data);
  var user_name = users.name;
    collection.find({ name: user_name }).toArray((err, result) => {
      var u_name = result[0].name;
      var q = result[0].wanttogolist;
      //var r = q.length-1;
      var exists = 0;
      for(var i = 0; i < q.length; i++){
        if(q[i] == "bali"){
          exists = 1;
          alert("Bali is already in your want to go list");
          break;
        }
      }

      if(exists == 0){
        q.push("bali");
        collection.updateOne(
          { name: u_name }, 
          { $set: { wanttogolist: q } },  (err, result) => {}
          )
          console.log(q);
          alert("Bali successfully added to your Want to Go List!");
      }
        })
  });


//Get Inca Page
app.get('/inca',function(req,res){
  if (req.session.username && req.session.password){
    res.render('inca',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Inca: add to want to go list 
app.post('/addtoinca' , function(req,res){

  const collection = req.app.locals.collection;
  var data = fs.readFileSync("user.json");
  var users = JSON.parse(data);
  var user_name = users.name;
    collection.find({ name: user_name }).toArray((err, result) => {
      var u_name = result[0].name;
      var q = result[0].wanttogolist;
      //var r = q.length-1;
      var exists = 0;
      for(var i = 0; i < q.length; i++){
        if(q[i] == "inca"){
          exists = 1;
          alert("Inca is already in your want to go list");
          break;
        }
      }

      if(exists == 0){
        q.push("inca");
        collection.updateOne(
          { name: u_name }, 
          { $set: { wanttogolist: q } },  (err, result) => {}
          )
          console.log(q);
          alert("Inca successfully added to your Want to Go List!");
      }
        })
  });


//Get Paris Page
app.get('/paris',function(req,res){
  if (req.session.username && req.session.password){
    res.render('paris',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Paris: add to want to go list 
app.post('/addtoparis' , function(req,res){
  const collection = req.app.locals.collection;
  var data = fs.readFileSync("user.json");
  var users = JSON.parse(data);
  var user_name = users.name;
    collection.find({ name: user_name }).toArray((err, result) => {
      var u_name = result[0].name;
      var q = result[0].wanttogolist;
      //var r = q.length-1;
      var exists = 0;
      for(var i = 0; i < q.length; i++){
        if(q[i] == "paris"){
          exists = 1;
          alert("Paris is already in your want to go list");
          break;
        }
      }

      if(exists == 0){
        q.push("paris");
        collection.updateOne(
          { name: u_name }, 
          { $set: { wanttogolist: q } },  (err, result) => {}
          )
          console.log(q);
          alert("Paris successfully added to your Want to Go List!");
      }
        })
  });


//Get Rome Page
app.get('/rome',function(req,res){
  if (req.session.username && req.session.password){
    res.render('rome',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Rome: add to want to go list 
app.post('/addtorome' , function(req,res){
  const collection = req.app.locals.collection;
  var data = fs.readFileSync("user.json");
  var users = JSON.parse(data);
  var user_name = users.name;
    collection.find({ name: user_name }).toArray((err, result) => {
      var u_name = result[0].name;
      var q = result[0].wanttogolist;
      //var r = q.length-1;
      var exists = 0;
      for(var i = 0; i < q.length; i++){
        if(q[i] == "rome"){
          exists = 1;
          alert("Rome is already in your want to go list");
          break;
        }
      }

      if(exists == 0){
        q.push("rome");
        collection.updateOne(
          { name: u_name }, 
          { $set: { wanttogolist: q } },  (err, result) => {}
          )
          console.log(q);
          alert("Rome successfully added to your Want to Go List!");
      }
        })
  });

  //Get Santorini Page
app.get('/santorini',function(req,res){
  if (req.session.username && req.session.password){
    res.render('santorini',{error:""})
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

//Santorini: add to want to go list 
app.post('/addtosantorini' , function(req,res){
  const collection = req.app.locals.collection;
  var data = fs.readFileSync("user.json");
  var users = JSON.parse(data);
  var user_name = users.name;
    collection.find({ name: user_name }).toArray((err, result) => {
      var u_name = result[0].name;
      var q = result[0].wanttogolist;
      //var r = q.length-1;
      var exists = 0;
      for(var i = 0; i < q.length; i++){
        if(q[i] == "santorini"){
          exists = 1;
          alert("Santorini is already in your want to go list");
          break;
        }
      }

      if(exists == 0){
        q.push("santorini");
        collection.updateOne(
          { name: u_name }, 
          { $set: { wanttogolist: q } },  (err, result) => {}
          )
          console.log(q);
          alert("Santorini successfully added to your Want to Go List!");
      }

        })
  
  });

//Search Results Page
app.get('/searchresults',function(req,res){
  if (req.session.username && req.session.password){
    res.render('searchresults',{searchres:""})
  }
  else {
    res.redirect('/?error=you must login first');
  }               
});

//Display Search Results function
app.post('/search',function(req,res){
  
  var s=req.body.Search;
  let items=[
    {name:'annapurna', url:'/annapurna', image:'/annapurna.png'},
    {name: 'bali', url:'/bali',image:'/bali.png'},
    {name:'inca', url:'/inca', image:'/inca.png'},
    {name:'paris', url:'/paris', image:'/paris.png'},
    {name:'rome', url:'/rome', image:'/rome.png'},
    {name:'santorini', url:'/santorini', image:'/santorini.png'}
  ]
  
  let names=['annapurna','bali','inca','paris','rome','santorini'];
    let searchres= searchItem(names,s);
     let final=[];

    for (i = 0; i < searchres.length; i++){
      for (j = 0; j < items.length; j++){
        if (searchres[i] == items[j].name){
          final.push(items[j]); //contains urls of search results
        }
      }
    }
   
   res.render('searchresults',{final:final});

});

function searchItem(arr,key,res) {
  
  input = key.toLowerCase();
  let searchres=[];

  var f = 0;
   if (input.length == 0){
       alert("Search Field Cannot Be Empty!");
    }
  
   else 
      {
       for (i = 0; i < arr.length; i++) { 
          if ((arr[i].toLowerCase().includes(input)))
           {
              searchres.push(arr[i]);
              f = 1;  //search item found
           }
        }

        if (f == 0){
          alert("Destination Not Found!");
     }
      }

      return searchres;
}


//Get Want to go Page
app.get('/wanttogo',function(req,res){
 // var i = "";
 if (req.session.username && req.session.password){
  
  const collection = req.app.locals.collection;
  //var data = fs.readFileSync("user.json");
  //var users = JSON.parse(data);
  //var user_name = users.name;
  var user_name = req.session.username;
  collection.find({ name: user_name }).toArray((err, result) => {
    req.session.wanttogolist = result[0].wanttogolist;
    let q = req.session.wanttogolist;
     res.render('wanttogo', {list: q});
  })
  }
  else {
    alert("You Must Login First");
    res.redirect('/?error=you must login first');
  }
});

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017/",function(err, client)  {
    if (err) throw err;

    // Specify the database you want to access
    const db = client.db('myDB');
    const collection = db.collection('myCollection');
    app.locals.collection = collection ; 

  }
    )
//app.listen(3000);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});