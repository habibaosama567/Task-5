const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/user', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.patch('/user/:id', async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send('No user is found')
        }
        updates.forEach((ele) => (user[ele] = req.body[ele]));
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/user', async (req, res) => {
    User.find({}).then((user) => {
        res.status(200).send(user)
    }).catch((error) => { res.status(500).send(error) })
})

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('unable to find user')
        }
        res.status(200).send(user)
    }).catch((error) => {
        res.status(500).send(error)
    })
})


router.delete('/user/:id', async (req, res) => {

    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send('unable to find user')
        }
        res.status(200).send({
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).send(error)
    }

})

module.exports = router
