/*用到 clarifai人脸识别的API 已经 npm install clarifai了*/
const Clarifai  = require('clarifai');
const app=new Clarifai.App({
  apiKey:'76898e3a08ef478984a6ff1bdcf6f1c5'
});
const handleapi =(req,res)=>{
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data =>{res.json(data)})
.catch(err =>{res.status(400).json('cannot receive data')})
}

const handleimage =(req,res,db)=>{
const{id} =req.body;
db('users').where('id','=',id)
.increment('entries',1)
.returning('entries')
.then(entries =>{
	res.json(entries[0]);
})
.catch(err=>res.status(400).json('unable to get entries'))
}

module.exports ={
	handleimage:handleimage,
	handleapi: handleapi

}