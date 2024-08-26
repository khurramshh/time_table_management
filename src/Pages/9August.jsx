// import React, { useState, useEffect } from 'react';
// import PrintTables from './PrintTable';

// const Teachers = ({ teachers, lectures }) => {
//   const [teacherName, setTeacherName] = useState('');
//   const [teacherNames, setTeacherNames] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedTeachers, setSelectedTeachers] = useState(
//     Array.from({ length: teachers }, () => Array(lectures).fill(''))
//   );
//   const [subjects, setSubjects] = useState(
//     Array.from({ length: teachers }, () => Array(lectures).fill(''))
//   );
//   const [rowDuplicateTeachers, setRowDuplicateTeachers] = useState(
//     Array.from({ length: teachers }, () => new Set())
//   );

//   useEffect(() => {
//     const newRowDuplicateTeachers = selectedTeachers.map(rowTeachers => {
//       const teacherCount = rowTeachers.reduce((count, teacher) => {
//         if (teacher) {
//           count[teacher] = (count[teacher] || 0) + 1;
//         }
//         return count;
//       }, {});

//       const duplicates = new Set(
//         Object.entries(teacherCount)
//           .filter(([_, count]) => count > 1)
//           .map(([teacher]) => teacher)
//       );

//       return duplicates;
//     });

//     setRowDuplicateTeachers(newRowDuplicateTeachers);
//   }, [selectedTeachers]);

//   const handleInputChange = (e) => {
//     setTeacherName(e.target.value);
//     setErrorMessage('');
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (teacherName.trim() === '') {
//       setErrorMessage('Name cannot be empty');
//       return;
//     }

//     if (teacherNames.includes(teacherName.trim())) {
//       setErrorMessage('Name is already added');
//       return;
//     }

//     setTeacherNames([...teacherNames, teacherName.trim()]);
//     setTeacherName('');
//     setErrorMessage('');
//   };

//   const handleDelete = (nameToDelete) => {
//     setTeacherNames(teacherNames.filter(name => name !== nameToDelete));
//   };

//   const handleTeacherSelect = (teacher, row, col) => {
//     const updatedSelectedTeachers = selectedTeachers.map((rowTeachers, rowIndex) =>
//       rowTeachers.map((teacherName, colIndex) => {
//         if (rowIndex === row && colIndex === col) {
//           return teacher;
//         }
//         return teacherName;
//       })
//     );
//     setSelectedTeachers(updatedSelectedTeachers);
//   };

//   const handleSubjectChange = (e, row, col) => {
//     const updatedSubjects = subjects.map((rowSubjects, rowIndex) =>
//       rowSubjects.map((subject, colIndex) => {
//         if (rowIndex === row && colIndex === col) {
//           return e.target.value;
//         }
//         return subject;
//       })
//     );
//     setSubjects(updatedSubjects);
//   };

//   const columnHeaders = Array.from({ length: lectures });
//   const rows = Array.from({ length: teachers }, (_, rowIndex) =>
//     Array.from({ length: lectures }, (_, colIndex) => selectedTeachers[rowIndex][colIndex])
//   );

//   return (
//     <div className='bg-slate-200 p-5'>
//       {/* Form and teacher names */}
//       <div>
//         <form onSubmit={handleSubmit}>
//           <div className='flex justify-center items-center'>
//             <div>
//               <input
//                 type="text"
//                 value={teacherName}
//                 onChange={handleInputChange}
//                 placeholder="Enter teacher's name"
//                 className='bg-white rounded-xl p-2 w-96 outline-none shadow-lg'
//               />
//               {errorMessage && (
//                 <div className='text-red-500 text-center mt-2'>
//                   {errorMessage}
//                 </div>
//               )}
//             </div>
//           </div>
//         </form>

//         {teacherNames.length > 0 && (
//           <ul>
//             <div className='flex justify-center items-center'>
//               <div className='flex flex-wrap gap-10 w-8/12 rounded-lg bg-white shadow-xl p-4 mt-4'>
//                 {teacherNames.map((name, index) => (
//                   <li className='bg-blue-500 text-white rounded-lg shadow-lg p-1 px-4 flex justify-between items-center' key={index}>
//                     {name}
//                     <button onClick={() => handleDelete(name)} className='ml-2 text-white'>
//                       &#9940;
//                     </button>
//                   </li>
//                 ))}
//               </div>
//             </div>
//           </ul>
//         )}
//       </div>

//       {/* Table for screen view */}
//       {teachers > 0 && lectures > 0 && (
//         <div className='mt-10 overflow-x-auto'>
//           <table className='min-w-full bg-white border rounded-lg shadow-xl screen-table'>
//             <thead>
//               <tr>
//                 <th className='py-2 border min-w-[150px]'>Teachers</th>
//                 {columnHeaders.map((_, i) => (
//                   <th key={i} className='py-2 border min-w-[150px] text-sm'>Class {i + 1}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {Array.from({ length: teachers }, (_, i) => (
//                 <tr key={i}>
//                   <td className='py-2 border min-w-[150px] text-sm text-center'>Teacher {i + 1}</td>
//                   {Array.from({ length: lectures }, (_, j) => (
//                     <td key={j} className='py-2 border min-w-[150px]'>
//                       <div className='flex flex-col'>
//                         <select
//                           value={selectedTeachers[i][j]}
//                           onChange={(e) => handleTeacherSelect(e.target.value, i, j)}
//                           className='w-full p-2 rounded-lg border-none focus:outline-none text-sm'
//                           style={{
//                             backgroundColor: rowDuplicateTeachers[i].has(selectedTeachers[i][j]) ? 'red' : 'white'
//                           }}
//                         >
//                           <option value=''>Select Teacher</option>
//                           {teacherNames.map((teacher, index) => (
//                             <option key={index} value={teacher}>
//                               {teacher}
//                             </option>
//                           ))}
//                         </select>
//                         <input
//                           type='text'
//                           value={subjects[i][j]}
//                           onChange={(e) => handleSubjectChange(e, i, j)}
//                           placeholder='Enter subject'
//                           className='mt-2 p-1 px-3 rounded-lg border-none focus:outline-none text-sm text-left bg-slate-100 '
//                         />
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Print Tables */}
//       {teachers > 0 && lectures > 0 && (
//         <div className='print-tables'>
//           <PrintTables columns={columnHeaders} rows={rows} />
//         </div>
//       )}

//       {/* Print Styles */}
    //   <style>
    //     {`
    //      @media screen {
    //        .print-tables {
    //          display: none;
    //        }
    //      }
    //      @media print {
    //        /* Hide everything except for print-tables */
    //        body * {
    //          visibility: hidden;
    //        }
    //        /* Display only the print tables */
    //        .print-tables, .print-tables * {
    //          visibility: visible;
    //        }
    //        /* Reset margins and padding */
    //        body {
    //          margin: 0;
    //          padding: 0;
    //        }
    //        .print-tables {
    //          position: absolute;
    //          top: 0;
    //          left: 0;
    //          width: 100%;
    //          height: auto;
    //          display: block;
    //        }
    //        .print-table {
    //          width: 100%;
    //          border-collapse: collapse;
    //          page-break-inside: auto;
    //          margin-bottom: 1cm;
    //        }
    //        @page {
    //          size: auto;
    //          margin: 1cm;
    //        }
    //        .print-table thead {
    //          display: table-header-group;
    //        }
    //        .print-table tbody {
    //          display: table-row-group;
    //        }
    //        .print-table tr {
    //          page-break-inside: auto;
    //        }
    //        .print-table th, .print-table td {
    //          border: 1px solid #ddd;
    //          padding: 8px;
    //        }
    //        .print-table th {
    //          background-color: #f2f2f2;
    //        }
    //      `}
    //   </style>
//     </div>
//   );
// };

// export default Teachers;


// ********************************************************************************


// // PrintTables.js
// import React, { useState, useEffect } from 'react';

// const PrintTables = ({ columns, rows }) => {
//   const [tables, setTables] = useState([]);

//   useEffect(() => {
//     const columnsPerTable = 5;
//     const totalTables = Math.ceil(columns.length / columnsPerTable);
//     const newTables = [];

//     for (let i = 0; i < totalTables; i++) {
//       const tableColumns = columns.slice(i * columnsPerTable, (i + 1) * columnsPerTable);
//       newTables.push(
//         <table className='min-w-full bg-white border rounded-lg shadow-xl print-table' key={i}>
//           <thead>
//             <tr>
//               <th className='py-2 border min-w-[150px]'>Teachers</th>
//               {tableColumns.map((_, index) => (
//                 <th key={index} className='py-2 border min-w-[150px] text-sm'>Class {index + 1 + i * columnsPerTable}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 <td className='py-2 border min-w-[150px] text-sm text-center'>Teacher {rowIndex + 1}</td>
//                 {tableColumns.map((_, colIndex) => (
//                   <td key={colIndex} className='py-2 border min-w-[150px]'>
//                     {row[colIndex + i * columnsPerTable] || ''}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       );
//     }

//     setTables(newTables);
//   }, [columns, rows]);

//   return <div className='print-tables-container'>{tables}</div>;
// };

// export default PrintTables;

