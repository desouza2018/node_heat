import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticanteUserController"

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

export { router }

/**
 * O método handle normalmente recebe um (request, response), mas como
 * estamos utilizando ele dentro da rota:
 * router.post("/authenticate", new AuthenticateUserController().handle)
 * 
 * ele vai funcionar como um lider. 
 * Então, esta é a razão de termos passado os parâmetros handle(request, response),
 * porque automaticamente o express consegue fazer isso para gente, repassando os
 * parâmetros para o handle.
 */