export interface ITransaction {
    id: string
    title: string,
    description: string,
    category: string,
    image: string,
    sold: boolean,
    dateOfSale: Date
}