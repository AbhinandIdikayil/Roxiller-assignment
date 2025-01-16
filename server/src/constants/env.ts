import { config } from 'dotenv'
config()

export const CONFIG = {
    PORT: process.env.PORT,
    SEED_API_URL: process.env.SEED_API_URL as string,
    MONGO_URL: process.env.MONGO_URL as string,
    CLIENT: process.env.CLIENT as string,
    SERVER_URL: process.env.SERVER_URL as string,
    DEFAULT_MONTH: process.env.MONTH as string || 'Mar'
}
