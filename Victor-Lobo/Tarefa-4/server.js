// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true,
})

// Array com os dados
let veiculo = []
let idCounter = 1

// Create
fastify.post('/veiculo', async (request, reply) => {
  const { modelo, ano } = request.body

  const carro = {
    id: idCounter++,
    modelo,
    ano,
  }

  veiculo.push(carro)
  reply.code(201).send(carro)
})

// Read
fastify.get('/veiculo', async () => {
  let message

  if (veiculo.length === 0) {
    message = 'Nenhum carro cadastrado!'
  } else {
    message = 'Carros listados com sucesso!'
  }
  return {
    success: true,
    message: message,
    data: veiculo
  }
})

// Read by ID
fastify.get('/veiculo/:id', async (request, reply) => {
  const { id } = request.params
  const carro = veiculo.find((u) => u.id === Number(id))


  if (!carro) {
    return reply.code(404).send({ message: 'Carro não encontrado!' })
  }
  return carro
})

// Update

fastify.put('/veiculo/:id', async (request, reply) => {
  const idParam = request.params.id
  const body = request.body

  const id = Number(idParam)
  let foundCarro = null

  for (let i = 0; i < veiculo.length; i++) {
    if (veiculo[i].id === id) {
      foundCarro = veiculo[i]
      break
    }
  }

  if (foundCarro === null) {
    reply.code(404).send({ message: 'Carro não encontrado!' })
  }

  if (body.modelo !== undefined) {
    foundCarro.modelo = body.modelo
  }

  if (body.ano !== undefined) {
    foundCarro.ano = body.ano
  }

  reply.send(foundCarro)
})

// Delete
fastify.delete('/veiculo/:id', async (request, reply) => {
  const { id } = request.params

  const carroIndex = veiculo.findIndex(u => u.id === Number(id))

  if (carroIndex === -1) {
    return reply.code(404).send({ message: 'Carro não encontrado!' })
  }

  veiculo.splice(carroIndex, 1)
  reply.code(200).send({ message: 'Carro apagado!' })
})


// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
