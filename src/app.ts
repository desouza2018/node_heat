import "dotenv/config"
import express from 'express'

const app = express()

app.get('/github', (req, res) => { //req(request), res(response)
    res.redirect(`https://github.com/login/oauth/authorized?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

app.get("/signin/callback", (req, res) => {
    const { code} = req.query

    return res.json(code)
})

app.listen(4000, () => console.log('Server is running on Port 4000'))