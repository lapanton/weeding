const {Router} = require('express')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const {name, willbe, time, children, childquantity, stay, parking, parkingPlace, songs, traditions, moscow, transfer, muzei,master, more } = req.body

    const link = new Link({
      willbe, name, time, children, childquantity, stay, parking, parkingPlace, songs, traditions, moscow, transfer, muzei,master, more, owner: req.user.userId
    })

    await link.save()

    res.status(201).json({ link })
  } catch (e) {
    console.log('e', e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
