import express from "express";
import { CONFIG } from "./constants/env";
import { router } from "./routes";
const app = express()


app.use(express.json());

app.use('/api',router);

app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on port ${CONFIG.PORT}`)
})