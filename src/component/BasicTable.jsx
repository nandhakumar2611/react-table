import React from 'react'
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table'
import studentData from '../data/students.json'
import { useMemo } from 'react'

const BasicTable = () => {
    const data = useMemo(() => studentData, [])
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID'
        },
        {
            accessorKey: 'first_name',
            header: 'First Name'
        },
        {
            accessorKey: 'last_name',
            header: 'Last Name'
        },
        {
            accessorKey: 'email',
            header: 'Email'
        },
        {
            accessorKey: 'date',
            header: 'DOB'
        },
        {
            accessorKey: 'phone_number',
            header: 'Phone Number'
        }
    ]
    const tableInst = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
    return (
        <>
            <section class="py-1 bg-blueGray-50">
                <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div class="rounded-t mb-0 px-4 py-3 border-0">
                            <div class="flex flex-wrap items-center">
                                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 class="font-semibold text-base text-blueGray-700">Basic Table</h3>
                                </div>
                                {/* <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                                </div> */}
                            </div>
                        </div>
                        <div class="block w-full overflow-x-auto">
                            <table className='border-collapse border'>
                                <thead>
                                    {tableInst.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className='px-6 py-3 border'>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {tableInst.getRowModel().rows.map(row => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id} className='px-6 py-3 border'>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default BasicTable