import express from 'express';
import apiRoutes from './api';

const router = express.Router();

router.get('/', (request : express.Request, response : express.Response) => {
    response.render('index', { title: 'Hello TypeScript with Express and EJS' });
  });

router.get('/test', (request : express.Request, response : express.Response) => {
    response.send('Test succeed');
});

// other TS files
router.use('/api', apiRoutes);

export default router;