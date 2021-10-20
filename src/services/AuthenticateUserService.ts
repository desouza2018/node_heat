import axios from "axios"
/**
 * Receber o code(string)
 * Recuperar o acess_token no github
 * Verificar se o usuário existe no DB e
 * se existir, será gerado um token para ele.
 * Se não existir o token, ele será criado no DB - gerará um token
 * Retornar o token com as informações do user.
 */

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        const response = await axios.post(url,null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENTE_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        })

        return response.data //Quando usamos axios, toda a informação é retornada dentro do data
    }
}


export { AuthenticateUserService }