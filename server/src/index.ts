import express from "express";
import { CONFIG } from "./constants/env";
import { router } from "./routes";
import { connectDB, disconnectDB } from "./db/connection";

const startServer = async () => {

    const app = express()
    app.use(express.json());
    app.use('/api', router);
    const server = app.listen(CONFIG.PORT, async () => {
        await connectDB()
        console.log(`Server is running on port ${CONFIG.PORT}`)
    })

    const shutDown = async () => {
        await disconnectDB()
        server.close(() => {
            console.log('Server closed')
        })
    }
    process.on('SIGINT',shutDown)
    process.on('SIGTERM',shutDown)
}

startServer()

