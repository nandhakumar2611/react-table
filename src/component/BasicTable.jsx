import React from 'react'
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table'
import studentData from '../data/students.json'
import { useMemo } from 'react'
import { useState } from 'react'

const BasicTable = () => {

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [columnFilters, setColumnFilters] = useState([]);
    const data = useMemo(() => studentData, []);
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
            header: 'Email',
            enableColumnFilter: false,
        },
        {
            accessorKey: 'date',
            header: 'DOB'
        },
        {
            accessorKey: 'phone_number',
            header: 'Phone Number'
        }
    ];
    const tableInst = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            columnFilters: columnFilters,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnFiltersChange: setColumnFilters,
    })
    console.log("tableInst", tableInst);
    console.log("tableInst", tableInst.getHeaderGroups());

    const testingFunction = (tableInst) => (
        tableInst.getHeaderGroups().map((headerGroup, index, arr) => {
          console.log("Header Group:", headerGroup);
      
          return (
            headerGroup.headers.map(header => {
              console.log("Header:", header.column.columnDef.header.length);
              return null;  // You can return any value here
            })
          );
        })
      );
      
      // Call the function
      testingFunction(tableInst);
      
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
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="search..."
                                        value={filtering}
                                        onChange={(e) => setFiltering(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className='border-collapse border'>
                                <thead>
                                    {tableInst.getHeaderGroups().map((headerGroup, index, arr) => (
                                        <React.Fragment key={headerGroup.id}>
                                            <tr>
                                                {headerGroup.headers.map(header => (
                                                    <th
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        className='px-6 py-3 border'
                                                    >
                                                        {header.isPlaceholder ? null : (
                                                            <div>
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                                {
                                                                    { asc: '⬆️', desc: '⬇️' }[
                                                                    header.column.getIsSorted() ?? null
                                                                    ]
                                                                }
                                                                {/* {
                                                                    header.column.getCanFilter() ? (
                                                                        <input
                                                                            className='bg-gray-50 border border-gray-300'
                                                                            value={(header.column.getFilterValue()) || ''}
                                                                            onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                                            placeholder='search...'
                                                                        />

                                                                    ): null
                                                                } */}
                                                            </div>
                                                        )}
                                                    </th>
                                                ))}
                                            </tr>
                                            {index === arr.length - 1 && (
                                                <tr>
                                                    {headerGroup.headers.map(header => (
                                                        <th
                                                            key={header.id}
                                                            colSpan={header.colSpan}

                                                            className='py-3 border'
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div>

                                                                    {
                                                                        header.column.getCanFilter() ? (
                                                                            <input
                                                                                className={`bg-gray-50 border border-gray-300 w-${header.column.columnDef.header.length}`}
                                                                                value={(header.column.getFilterValue()) || ''}
                                                                                onChange={(e) => header.column.setFilterValue(e.target.value)}
                                                                                placeholder='search...'
                                                                            />

                                                                        ) : null
                                                                    }
                                                                </div>
                                                            )}
                                                        </th>
                                                    ))}
                                                </tr>
                                            )}
                                        </React.Fragment>
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