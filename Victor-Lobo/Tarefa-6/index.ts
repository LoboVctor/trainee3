import fastify from 'fastify'
const server = fastify()

//Tipagem de "Veiculo"
interface Veiculo {
    id: number
    modelo: string
    ano: number
}

//Array com os dados
const veiculos: Veiculo[] = []
let proxID = 1

//
//CREATE
//
server.post<{ Body: Omit<Veiculo, 'id'> }>('/veiculos', (request, reply) => {
    const { modelo, ano } = request.body
    const carro: Veiculo = {
        id: proxID++,
        modelo,
        ano,
    }

    veiculos.push(carro)

    return reply.code(201).send(carro)
})

//
//READ - Todos
//
server.get('/veiculos', () => {
    return veiculos
})

//
//READ - ID
//
server.get<{ Params: { id: string } }>('/veiculos/:id', (request, reply) => {
    const id = Number(request.params.id)
    const carro = veiculos.find(i => i.id === id)

    if (!carro) {
        return reply.code(404).send({ message: 'Carro não encontrado!' })
    }
    return carro
})

//
//UPDATE 
//
server.put<{ Params: { id: string }, Body: Omit<Veiculo, 'id'> }>('/veiculos/:id', (request, reply) => {
    const id = Number(request.params.id)
    const carro = veiculos.find(i => i.id === id)

    if (!carro) {
        return reply.code(404).send({ message: 'Carro não encontrado!' })
    }

    if (request.body.modelo !== undefined) {
        carro.modelo = request.body.modelo
    }

    if (request.body.ano !== undefined) {
        carro.ano = request.body.ano
    }

    return reply.code(200).send({
        message: 'Carro atualizado',
        carro,
    })
})

//
//DELETE
//
server.delete<{ Params: { id: string } }>('/veiculos/:id', (request, reply) => {
    const id = Number(request.params.id)
    const carroIndex = veiculos.findIndex(i => i.id === id)

    if (carroIndex === -1) {
        return reply.code(404).send({ message: 'Carro não encontrado!' })
    }

    veiculos.splice(carroIndex, 1)

    return reply.code(200).send({ message: 'Carro apagado!' })
})

//
//Iniciar o servidor
//
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})