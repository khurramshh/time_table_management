import React from 'react';

const PrintTables = ({ columns, rows }) => {
  const columnsPerPage = 5;

  // Split columns into chunks of 5
  const columnChunks = [];
  for (let i = 0; i < columns.length; i += columnsPerPage) {
    columnChunks.push({
      columns: columns.slice(i, i + columnsPerPage),
      rows: rows.map(row => row.slice(i, i + columnsPerPage))
    });
  }

  return (
    <div className='print-tables'>
      {columnChunks.map((chunk, index) => (
        <div key={index} className='print-table-container'>
          <table className='print-table'>
            <thead>
              <tr>
                <th>Teachers</th>
                {chunk.columns.map((_, colIndex) => (
                  <th key={colIndex}>Class {index * columnsPerPage + colIndex + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chunk.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>Teacher {rowIndex + 1}</td>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <div className='flex flex-col'>
                        <select
                          value={cell}
                          className='w-full p-2 rounded-lg border-none text-sm'
                          style={{ backgroundColor: 'white' }}
                        >
                          <option value=''>Select Teacher</option>
                          {/* Replace with your teacher options */}
                        </select>
                        <input
                          type='text'
                          placeholder='Enter subject'
                          className='mt-2 p-1 px-3 rounded-lg border-none text-sm text-left bg-slate-100'
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add space between tables if needed */}
          {index < columnChunks.length - 1 && <div className='page-break'></div>}
        </div>
      ))}
    </div>
  );
};

export default PrintTables;
