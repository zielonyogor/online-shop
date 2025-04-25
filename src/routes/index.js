const express = require('express');
const apiRoutes = require('./api');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Hello TypeScript with Express and EJS' });
  });

router.get('/test', (req, res) => {
    res.send('Test succeed');
});

// other TS files
router.use('/api', apiRoutes);

module.exports = router;