import express, { Express } from 'express';
import { processRequest } from './lib/controllers/APIcontroller';
const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(express.json());

app.get('/', processRequest);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
