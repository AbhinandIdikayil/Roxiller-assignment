import { Response } from "express"


export const success = (res: Response,
    {
        data = {}, message = 'success', status = 200
    }: {
        data: any, message?: string, status?: number
    }) => {
    return res.status(status).json({ message, data })
}