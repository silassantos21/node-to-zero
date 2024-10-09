// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     console.log('oie novo')
//     response.write('oieeeeeeeee 123 123')
//     return response.end()
// })

// server.listen(3333)

import { fastify } from 'fastify'

// import { DatabaseMemory } from './database-memory.js'

import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()

const database = new DatabasePostgres()

server.get('/', () => {
    return "Hello World"
})

////////////////////////////////////

// Request Body

server.post('/videos', async (request, reply) => {

    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

// localhost:3333/videos

server.get('/videos', async (request) => {

    const search = request.query.search

    const videos = await database.list(search)

    console.log(videos)

    return videos
})

// localhost:3333/videos/:id

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

// localhost:3333/videos/:id

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3333,
})