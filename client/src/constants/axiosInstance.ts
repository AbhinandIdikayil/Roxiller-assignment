import axios from 'axios'
import { ENV } from './env'

export const AXIOS_INSTANCE = axios.create({
    baseURL: ENV.SERVER_URL+'/api',
    withCredentials: true
})