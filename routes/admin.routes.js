const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.post('/admin', function(req, res) {
  const { aValue } = req.body
  try {
    if (aValue === '5f0f026a2ca94749d9346a43') {
      Link.find(function(err, links) {
        res.json(links);
      });
    } else {
      res.json({ message: 'Что-то пошло не так, попробуйте снова' })
    }

  } catch (e) {
    console.log('error edit: ', e);
    res.status(422).send("Admin load failed");
  }
});

module.exports = router;