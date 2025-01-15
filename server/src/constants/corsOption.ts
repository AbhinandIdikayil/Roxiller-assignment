
export const corsOption = {
    origin: process.env.CLIENT_URL, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}