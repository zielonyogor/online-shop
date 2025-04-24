import express from 'express';
const router = express.Router();

router.get('/', (request : express.Request, response : express.Response) => {
    response.render('index', { title: 'Hello TypeScript with Express and EJS' });
  });

router.get('/test', (request : express.Request, response : express.Response) => {
    response.send('Test succeed');
});

//module.exports = router;

export default router;