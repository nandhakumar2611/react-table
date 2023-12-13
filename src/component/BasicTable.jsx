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
            header: 'Name',
            columns: [
                {
                    accessorKey: 'first_name',
                    header: 'First Name'
                },
                {
                    accessorKey: 'last_name',
                    header: 'Last Name'
                },
            ]
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
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Basic Table</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className='border-collapse border'>
                                <thead>
                                    {tableInst.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id} className='px-6 py-3 border'>
                                                    {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
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