const registerUser = (req,res,DB,bcrypt) => {
    const saltRounds = 10;
    const { email, first_name, last_name, password } = req.body;
    if (!email || !first_name || !last_name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    bcrypt.hash(password, saltRounds).then(hash => {
        DB.transaction(trx => {
            trx.insert({
                first_name: first_name,
                last_name: last_name,
                email: email,
            })
            .into('users')
            .returning('*')
            .then(user => {
                return trx('login')
                .returning('*')
                .insert({
                    user_id: user[0].user_id,
                    hash: hash,
                    email: email,
                })
                .then(login => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json("user with that email already exists"))
    })
}

module.exports = {
    registerUser: registerUser
};