import axios from "axios"
import prismaClient from "../prisma"
import { sign } from "jsonwebtoken"
/**
 * Receber o code(string)
 * Recuperar o acess_token no github
 * Recuperar infos do user no github
 * Verificar se o usuário existe no DB e
 * se existir, será gerado um token para ele.
 * Se não existir o token, ele será criado no DB - gerará um token
 * Retornar o token com as informações do user.
 */

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}
class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        const { data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url,null, {//yarn add axios, yarn add @types/axios
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json",
            },
        })

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`,
            },
        })
// Desestruturando do response.data
        const { login, id, avatar_url, name } = response.data
// Verifica se o usuário existe
        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                  github_id: id,
                  login,
                  avatar_url,
                  name
               } 
            })
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id,
                },
            },
// Utilizar um site md5 generator
// Utilizará o id do usuário
            process.env.JWT_SECRET,
            {
                subject: user.id, 
                expiresIn: "1d"  // Tempo de expiração do token 1 dia
            }
            )
//Quando usamos axios, toda a informação é retornada dentro do data
        return { token, user } // Retorna o token e as informações do usuário
    }
}


export { AuthenticateUserService }

//1:10:21