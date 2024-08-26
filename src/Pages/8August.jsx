import React, { useState, useEffect } from 'react';

function Teachers({ teachers, lectures }) {
  const [teacherName, setTeacherName] = useState('');
  const [teacherNames, setTeacherNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState(
    Array.from({ length: teachers }, () => Array(lectures).fill(''))
  );
  const [subjects, setSubjects] = useState(
    Array.from({ length: teachers }, () => Array(lectures).fill(''))
  );
  const [rowTeacherSelectionCount, setRowTeacherSelectionCount] = useState(
    Array.from({ length: teachers }, () => ({}))
  );
  
  // Track duplicated teachers for each row
  const [rowDuplicateTeachers, setRowDuplicateTeachers] = useState(
    Array.from({ length: teachers }, () => new Set())
  );

  useEffect(() => {
    // Update duplicate teachers based on current selection
    const newRowDuplicateTeachers = selectedTeachers.map(rowTeachers => {
      const teacherCount = rowTeachers.reduce((count, teacher) => {
        if (teacher) {
          count[teacher] = (count[teacher] || 0) + 1;
        }
        return count;
      }, {});

      const duplicates = new Set(
        Object.entries(teacherCount)
          .filter(([_, count]) => count > 1)
          .map(([teacher]) => teacher)
      );

      return duplicates;
    });

    setRowDuplicateTeachers(newRowDuplicateTeachers);
  }, [selectedTeachers]);

  // Handle input changes
  const handleInputChange = (e) => {
    setTeacherName(e.target.value);
    setErrorMessage(''); // Clear error message when user is typing
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (teacherName.trim() === '') {
      setErrorMessage('Name cannot be empty'); // Set error message if empty
      return;
    }

    // Check if the name already exists in the list
    if (teacherNames.includes(teacherName.trim())) {
      setErrorMessage('Name is already added'); // Set error message for duplicate
      return;
    }

    // Add the new teacher's name to the list
    setTeacherNames([...teacherNames, teacherName.trim()]);
    setTeacherName(''); // Clear input field
    setErrorMessage(''); // Clear error message
  };

  const handleDelete = (nameToDelete) => {
    setTeacherNames(teacherNames.filter(name => name !== nameToDelete));
    setRowTeacherSelectionCount(prevState => {
      const newState = prevState.map(row => {
        const newRow = { ...row };
        delete newRow[nameToDelete];
        return newRow;
      });
      return newState;
    });
  };

  const handleTeacherSelect = (teacher, row, col) => {
    const updatedSelectedTeachers = selectedTeachers.map((rowTeachers, rowIndex) =>
      rowTeachers.map((teacherName, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return teacher;
        }
        return teacherName;
      })
    );
    setSelectedTeachers(updatedSelectedTeachers);

    // Update row teacher selection count
    setRowTeacherSelectionCount(prevState => {
      const newRowCount = [...prevState];
      const newCount = { ...newRowCount[row] };
      newCount[teacher] = (newCount[teacher] || 0) + 1;
      newRowCount[row] = newCount;
      return newRowCount;
    });
  };

  const handleSubjectChange = (e, row, col) => {
    const updatedSubjects = subjects.map((rowSubjects, rowIndex) =>
      rowSubjects.map((subject, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return e.target.value;
        }
        return subject;
      })
    );
    setSubjects(updatedSubjects);
  };

  return (
    <div className='bg-slate-200 p-5'>
      {/* Form and teacher names */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center items-center'>
            <div>
              <input
                type="text"
                value={teacherName}
                onChange={handleInputChange}
                placeholder="Enter teacher's name"
                className='bg-white rounded-xl p-2 w-96 outline-none shadow-lg'
              />
              {errorMessage && (
                <div className='text-red-500 text-center mt-2'>
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </form>

        {teacherNames.length > 0 && (
          <ul>
            <div className='flex justify-center items-center'>
              <div className='flex flex-wrap gap-10 w-8/12 rounded-lg bg-white shadow-xl p-4 mt-4'>
                {teacherNames.map((name, index) => (
                  <li className='bg-blue-500 text-white rounded-lg shadow-lg p-1 px-4 flex justify-between items-center' key={index}>
                    {name}
                    <button onClick={() => handleDelete(name)} className='ml-2 text-white'>
                      &#9940;
                    </button>
                  </li>
                ))}
              </div>
            </div>
          </ul>
        )}
      </div>

      {/* Table Started */}
      {teachers > 0 && lectures > 0 && (
        <div className='mt-10 overflow-x-auto'>
          <table className='min-w-full bg-white border rounded-lg shadow-xl print-table'>
            <thead>
              <tr>
                <th className='py-2 border min-w-[150px]'>Teachers</th>
                {Array.from({ length: lectures }, (_, i) => (
                  <th key={i} className='py-2 border min-w-[150px] text-sm'>Class {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: teachers }, (_, i) => (
                <tr key={i}>
                  <td className='py-2 border min-w-[150px] text-sm text-center'>Teacher {i + 1}</td>
                  {Array.from({ length: lectures }, (_, j) => (
                    <td key={j} className='py-2 border min-w-[150px]'>
                      <div className='flex flex-col'>
                        <select
                          value={selectedTeachers[i][j]}
                          onChange={(e) => handleTeacherSelect(e.target.value, i, j)}
                          className='w-full p-2 rounded-lg border-none focus:outline-none text-sm'
                          style={{
                            backgroundColor: rowDuplicateTeachers[i].has(selectedTeachers[i][j]) ? 'red' : 'white'
                          }}
                        >
                          <option value=''>Select Teacher</option>
                          {teacherNames.map((teacher, index) => (
                            <option key={index} value={teacher}>
                              {teacher}
                            </option>
                          ))}
                        </select>
                        <input
                          type='text'
                          value={subjects[i][j]}
                          onChange={(e) => handleSubjectChange(e, i, j)}
                          placeholder='Enter subject'
                          className='mt-2 p-1 px-3 rounded-lg border-none focus:outline-none text-sm text-left bg-slate-100'
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Print Styles */}
      <style>
        {`
          @media print {
            /* Hide everything except the table during printing */
            body * {
              visibility: hidden;
            }
            
            .print-table, .print-table * {
              visibility: visible;
            }
            
            .print-table {
              position: absolute;
              left: 0;
              top: 0;
            }
            
            /* Style table for pagination */
            .print-table {
              width: 100%;
              border-collapse: collapse;
            }
            
            /* Ensure the table fits on the page */
            @page {
              size: auto; 
              margin: 1cm; /* Adjust margins as needed */
            }
            
            /* Handle pagination */
            .print-table thead {
              display: table-header-group;
            }
            
            .print-table tbody {
              display: block;
              overflow: auto;
              max-height: 60vh; /* Adjust as needed */
            }

            .print-table tbody tr {
              page-break-inside: auto;
              page-break-after: auto;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Teachers;
