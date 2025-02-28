
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import './index.css';
import { AXIOS_INSTANCE } from "@/constants/axiosInstance";
import { useDebounce } from "@/hooks/userDebounce";
import DropDown from "@/components/DropDown";
import { months } from "@/constants/months";
import { ChevronDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({
    columns,
}: DataTableProps<TData, TValue>) {

    const [searchQuery, setSearchquery] = useState<string>('')
    const [selectedMonth, setSelectedMonth] = useState<string>('Mar')
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [transactions, setTransactions] = useState<{ transactions: [], totalCount: number }>({
        transactions: [],
        totalCount: 0
    })
    const debounceSearchQuery = useDebounce(searchQuery, 500)


    const table = useReactTable({
        data: transactions.transactions,
        columns,
        pageCount: Math.ceil((transactions.totalCount || 5) / pagination.pageSize),
        state: {
            pagination
        },
        onPaginationChange: setPagination,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
    })

    const fetch = async (page: number, pageSize: number, search: string, month: string) => {
        try {
            const { data } = await AXIOS_INSTANCE.get('/transaction/get-all', {
                params: {
                    page,
                    pageSize,
                    search,
                    month
                }
            })
            setTransactions(data?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetch(pagination.pageIndex, pagination.pageSize, debounceSearchQuery, selectedMonth);
    }, [pagination.pageIndex, debounceSearchQuery, selectedMonth])

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        if (dropdownRef.current) {
            dropdownRef.current.classList.toggle("hidden");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <div className="group w-1/2">
                    <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                    <input
                        placeholder="Search"
                        type="search"
                        className="max-w-sm input rounded-md shadow-sm border"
                        value={searchQuery}
                        onChange={(e) => setSearchquery(e.target.value)}
                    />
                </div>
                <div
                    // style={{ zIndex: 99 }}
                    onClick={toggleDropdown}
                    className="relative w-[80px] h-9 px-3 pt-[0.5px] rounded-md  shadow-sm border "
                >
                    <div className=" flex justify-between items-center">
                        <h1 className="font-bold text-sm">{selectedMonth || ""}</h1>

                        <ChevronDown
                            style={{ zIndex: 90 }}
                            className="float-end mt-1.5 text-gray-600"
                        />
                    </div>
                    <div ref={dropdownRef} className="hidden ">
                        <DropDown months={months} setValue={setSelectedMonth} />
                    </div>
                </div>
            </div>
            <div className="rounded-md border">
                {
                    transactions && (
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )
                }
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
