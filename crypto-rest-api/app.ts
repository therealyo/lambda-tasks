import express, { Express, Request, Response } from 'express'

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})
