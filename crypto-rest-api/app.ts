import express, { Express, Request, Response } from 'express'

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.get('/:crypto', (req: Request, res: Response) => {
    console.log(req.params.crypto);
})

app.get('/:platform', (req: Request, res: Response) => {
    console.log(req.params.platform);
})

app.get('/:platform:crypto', (req: Request, res: Response) => {
    console.log(req.params.platform);
    console.log(req.params.crypto);
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})
