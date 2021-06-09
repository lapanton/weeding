const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()
const auth = require('../middleware/auth.middleware')

router.put('/:id', auth , async(req, res) =>{
  try {
    await Link.findByIdAndUpdate(req.params.id, req.body);
    res.json('Article updated');
  } catch (e) {
    console.log('error edit: ', e);
    res.status(422).send("Article update failed.");
  }

});

module.exports = router;