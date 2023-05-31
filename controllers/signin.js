const signinUser = (req,res,DB,bcrypt) => {

    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json("incorrect form sumbission")
    }

    DB('login').where('email','=',email).select('*').then(resp => {
        
        bcrypt.compare(password, resp[0].hash).then(result => {
        if(result){
            return DB('users').where('user_id','=',resp[0].user_id).select('*').then(user =>{
                res.json(user[0])
            }).catch(err => res.status(400).json('unable to get user from database'));
        }else{
            return res.status(400).json("incorrect password");
        }
        
        });

    }).catch(err => res.status(400).json('wrong email')) 

}

module.exports = {
signinUser: signinUser

};