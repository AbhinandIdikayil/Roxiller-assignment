import { AXIOS_INSTANCE } from "@/constants/axiosInstance"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"


export default function TransactionTable() {


    return (
        <div className="container mx-auto py-10">

            <DataTable columns={columns} />

        </div>
    )
}
