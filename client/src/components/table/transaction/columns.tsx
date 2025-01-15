
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Payment = {
    id: string
    image: string
    title: string
    description: string
    category: string
    sold: boolean,
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'image',
        header: () => <div>Image</div>,
        cell: ({ row }) => {
            return <div className='w-10 h-16 '> <img src={row.original.image} className='rounded-full object-contain h-full w-full' alt="" /> </div>
        }
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return <div className="text-left"> {row.original.title} </div>
        }
    },
    {
        accessorKey: "category",
        header: () => <div className="">Category</div>,
        cell: ({ row }) => {
            return <div className='text-left capitalize'> {row?.original?.category}  </div>
        }
    },
    {
        accessorKey: "price",
        header: () => <div className="">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-left ">{formatted}</div>
        },
    },
    {
        accessorKey: "sold",
        header: "Sold",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
