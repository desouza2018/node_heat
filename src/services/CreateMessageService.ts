import prismaClient from "../prisma"


class CreateMessageService {
    async execute(text: string, user_id: string) {// A mensagem vai receber dois parametros que serão salvos no banco de dados na tabela Message
        const message = await prismaClient.message.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true // ctrl + space para abrir opções para o user
            }
        })

        return message
    }
}

export { CreateMessageService }