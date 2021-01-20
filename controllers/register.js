//注册页面
//我们需要用户的NAME EMAIL PASSWORD
const handleRegister = (req,res,db,bcrypt) => {
	const{name,email,password}=req.body;
	//检查这三项任意一个都不能为空
	if(!email||!name||!password)
	{
		return res.status(400).json('incorrect form submission');
	}
	//会用到bcrypt来生成密码
	//在注册时密码就要保障好安全
	//hash将会是对应的一串随机字符
	//简单起见我们用sync
	const hash=bcrypt.hashSync(password);
	db.transaction(trx =>{
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginemail =>{
			return trx('users')
                   .returning('*')
	               .insert({
		           email:loginemail[0],
		           name:name,
		           joined:new Date()
	                 })
	               .then(user =>{
		
		            res.json(user[0]);
		        }) 
	   })
	   .then(trx.commit)
	   .catch(trx.rollback)
	               
	})
	.catch(err=>res.status(400).json('unable to register'));
}

module.exports ={
   handleRegister:handleRegister
};