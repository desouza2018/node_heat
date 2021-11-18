import "dotenv/config"
import express from "express"
import { router } from "./routes"

const app = express()
app.use(express.json())

app.use(router)

app.get("/github", (request, response) => { //req(request), res(response)
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.
        GITHUB_CLIENT_ID}`
    )// literal template(crase)
})
// Veja o link: https://www.sohamkamani.com/nodejs/oauth/#:~:text=Implementing%20OAuth%202.0%20with%20Node.js%20Updated%20on%20June,a%20Node.js%20application%20to%20implement%20the%20OAuth2%20protocol.
//https://oauth.net/2/
app.get("/signin/callback", (request, response) => {
    const { code } = request.query

    return response.json(code)
})

app.listen(4000, () => console.log("Server is running on Port 4000"))

// instalar a dependência: jsonwebtoken
// yarn add jasonwebtoken
// instalar as tipagens do jsonwebtoken: yarn add @types/jsonwebtoken -D