import express from 'express';
import path from 'path';

import routing from './routes';

const app = express();
const PORT = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routing);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
