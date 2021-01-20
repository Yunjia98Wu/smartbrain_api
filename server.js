const express=require('express');
const bodyparser= require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors=require('cors');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const app=express();
app.use(bodyparser.json());
app.use(cors());
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',//localhost
    port:'5432',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
   
  }
});


// const database={
// 	users:[
// 	{
// 		id:'123',
// 		name:'John',
// 		email:'wyj@mail.com',
// 		password:'jyw',
// //entries来记录有多少图片被输入
// 		entries: 0,
// 		joined:new Date()

// 	},{
// 		id:'124',
// 		name:'sally',
// 		email:'sally@mail.com',
// 		password:'yllas',
// //entries来记录有多少图片被输入
// 		entries: 0 ,
// 		joined:new Date()

// 	}],
// 	login:[
// 	{
// 		id:'987',
// 		has:'',
// 		email:'xx@gmail.com'
// 	}]

// }
// app.get('/',(req,res)=>{
// 	res.json(database.users);
// })

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
//:id 可以取req中的内容
app.get('/profile/:id',(req,res)=>{profile.handleprofile(req,res,db)})
//更新entries
app.put('/image',(req,res)=>{image.handleimage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleapi(req,res)})


app.listen(3002,()=>{
	console.log('app is running  on 3002');
})