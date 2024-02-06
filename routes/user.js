const { Router } = require("express")
const { userDB } = require('../models/userModel')
const user = Router()




user.post('/login', async (req, res) => {
    let { username, password } = req.body
    let exactUser = await userDB.findOne({ username })

    if (!exactUser) {
        return res.status(403).json({ success: false, msg: "username or password incorrect" })
    }
    if (password !== exactUser.password) {
        return res.status(403).json({ success: false, msg: "username or password incorrect" })
    }
    res.status(202).json({ success: true, msg: "successfully sign in", innnerdata: { user: exactUser } })
});

module.exports = { user }

