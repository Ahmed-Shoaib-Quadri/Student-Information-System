const express = require("express")

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false})

const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

/*------------------------------------------------------------------------------------ */
async function connectToMongoDB(){
  try{
    await  client.connect();
    console.log("Connection Established successfully")
  }catch(err){
    console.log("Error establishing database",err)
  }
}
async function validateCredentials(specifiedCollection,username,password){
  try{
    const database = client.db("Student_Information_System")
    const collection = database.collection(specifiedCollection)
    const data = await collection.find({}).toArray();
    for(let i=0;i<data.length;i++){
      if(data[i]["username"]===username&&data[i]["password"]===password){
        return true;
      }
    }
    return false;
    }catch(err){
      console.log(err);
    }
}
/*----------------------------------------------------------------------------------- */

const app = express();
let login = false;

app.set("view engine",'ejs');
app.use(express.static('public'))


/*------------------------------------------------------------------------------ */
app.get('/adminlogin',async (req,res)=>{
  res.sendFile(__dirname+'/public/adminLogin.html')
});

app.get('/studentlogin',async (req,res)=>{
  res.sendFile(__dirname+'/public/studentLogin.html')
});

app.get('/facultylogin',async (req,res)=>{
  res.sendFile(__dirname+'/public/facultyLogin.html')
});
/*------------------------------------------------------------------------------ */
app.get('/admin',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/admin.html')
else
res.redirect("adminLogin")
})

app.get('/student',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/student.html')
else
res.redirect("StudentLogin")
})

app.get('/faculty',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/faculty.html')
else
res.redirect("FacultyLogin")
})

/*-------------------------------------------------------------------------------*/

app.get('/usermanagement',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/usermanagement.html')
else
res.redirect("adminLogin")
})

app.get('/coursemanagement',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/coursemanagement.html')
else
res.redirect("adminLogin")
});

app.get('/studentreports',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/Reports.html')
else
res.redirect("adminLogin")
});

app.get('/announcements',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/Announcement.html')
else
res.redirect("adminLogin")
});

app.get('/managecourses',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/facultycourses.html')
else
res.redirect("facultyLogin")
});

app.get('/marksentry',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/gradeentry.html')
else
res.redirect("facultyLogin")
});

app.get('/facultyinfo',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/facultypersonals.html')
else
res.redirect("facultyLogin")
});

app.get('/mycourses',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/studentcourses.html')
else
res.redirect("studentLogin")
});

app.get('/myreport',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/studentreport.html')
else
res.redirect("studentLogin")
});

app.get('/studentinfo',async(req,res)=>{
  if(login)
  res.sendFile(__dirname+'/public/studentpersonals.html')
else
res.redirect("studentLogin")
});

/*--------------------------------------------------------------------------------------------*/
app.post('/submit-faculty-login',urlencodedParser,async (req,res)=>{
response ={
  username:req.body.username,
  password:req.body.password
}
const formData = JSON.parse(JSON.stringify(response));

connectToMongoDB();

const result = await validateCredentials("facultylogin",formData.username,formData.password)
if(result){
  login = true;
  res.sendFile(__dirname+'/public/faculty.html')
}else{
  res.sendFile(__dirname+'/public/facultyLogin.html');
}
});


app.post('/submit-student-login',urlencodedParser,async (req,res)=>{
  response ={
    username:req.body.username,
    password:req.body.password
  }
  const formData = JSON.parse(JSON.stringify(response));

  connectToMongoDB();
  
  const result = await validateCredentials("studentlogin",formData.username,formData.password)
  if(result){
    login = true;
    res.sendFile(__dirname+'/public/student.html')
  }else{
    res.sendFile(__dirname+'/public/studentLogin.html');
  }
  });

  app.post('/submit-admin-login',urlencodedParser,async (req,res)=>{
    response ={
      username:req.body.username,
      password:req.body.password
    }
    const formData = JSON.parse(JSON.stringify(response));
    
    connectToMongoDB();
    
    const result = await validateCredentials("adminlogin",formData.username,formData.password)
    if(result){
      login = true;
      res.sendFile(__dirname+'/public/admin.html')
    }else{
      res.sendFile(__dirname+'/public/adminLogin.html');
    }
    });
/*------------------------------------------------------------------------------------------- */

app.post('/addUser',urlencodedParser,async(req,res)=>{
  res.json("Activated");
});


//Logout
app.post('/logout',async(req,res)=>{
  login = false;
  res.sendFile(__dirname+'/public/index.html')
});



//Listening on port number 5000
app.listen(5000,()=>{
  console.log("Server is listening")
})
