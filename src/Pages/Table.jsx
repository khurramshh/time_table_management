import React, { useState, useEffect } from 'react';
import PrintTables from './PrintTable';

const Table = ({ teachers, lectures }) => {
  const [teacherName, setTeacherName] = useState('');
  const [teacherNames, setTeacherNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeInputs, setTimeInputs] = useState(
    Array(teachers).fill().map(() => Array(lectures).fill({ startTime: '', endTime: '' }))
  );
  const [periods, setPeriods] = useState(Array.from({ length: teachers * Math.ceil(lectures / 4) }, (_, i) => `Period ${i + 1}`));
  const [selectedTeachers, setSelectedTeachers] = useState(
    Array.from({ length: teachers }, () => Array(lectures).fill(''))
  );
  const [subjects, setSubjects] = useState(
    Array.from({ length: teachers }, () => Array(lectures).fill(''))
  );
  const [classroom, setClassroom] = useState(
    Array.from({ length: teachers }, () => Array(lectures).fill(''))
  );
  const [rowDuplicateTeachers, setRowDuplicateTeachers] = useState(
    Array.from({ length: teachers }, () => new Set())
  );
  const [selectedDays, setSelectedDays] = useState(
    Array.from({ length: teachers }, () => Array.from({ length: lectures }, () => Array(7).fill(false)))
  );

  useEffect(() => {
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

  const handleInputChange = (e) => {
    setTeacherName(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teacherName.trim() === '') {
      setErrorMessage('Name cannot be empty');
      return;
    }

    if (teacherNames.includes(teacherName.trim())) {
      setErrorMessage('Name is already added');
      return;
    }

    setTeacherNames([...teacherNames, teacherName.trim()]);
    setTeacherName('');
    setErrorMessage('');
  };

  const handleDelete = (nameToDelete) => {
    setTeacherNames(teacherNames.filter(name => name !== nameToDelete));
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

    // Avoid automatic day selection
    const finalUpdatedDays = checkDuplicates(row, updatedSelectedTeachers, selectedDays);

    setSelectedTeachers(updatedSelectedTeachers);
    setSelectedDays(finalUpdatedDays);
  };

  const handleDaySelect = (dayIndex, row, col) => {
    const teacher = selectedTeachers[row][col];

    // Check if the same teacher and day combination already exists in the same row
    const isDayAlreadySelected = selectedDays[row].some((days, colIndex) =>
      colIndex !== col &&
      selectedTeachers[row][colIndex] === teacher &&
      days[dayIndex]
    );

    // Only toggle day selection if it is not already selected for the same teacher in the same row
    const updatedSelectedDays = selectedDays.map((rowDays, rowIndex) =>
      rowDays.map((days, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return days.map((selected, index) => {
            if (index === dayIndex) {
              // Prevent duplicate day selection for the same teacher
              return isDayAlreadySelected ? selected : !selected;
            }
            return selected;
          });
        }
        return days;
      })
    );

    const finalUpdatedDays = checkDuplicates(row, selectedTeachers, updatedSelectedDays);

    setSelectedDays(finalUpdatedDays);
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

  const handleClassroomChange = (e, row, col) => {
    const updatedClassroom = classroom.map((rowClassroom, rowIndex) =>
      rowClassroom.map((subject, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return e.target.value;
        }
        return subject;
      })
    );
    setClassroom(updatedClassroom);
  };


  const checkDuplicates = (row, teachers, days) => {
    return days.map((rowDays, colIndex) => {
      const isDuplicate = teachers[row].some((teacher, i) =>
        i !== colIndex && teacher === teachers[row][colIndex] &&
        JSON.stringify(days[row][i]) === JSON.stringify(days[row][colIndex])
      );

      // Only set background red if there's a duplicate; do not automatically select all days
      return rowDays.map((dayList, dayIndex) =>
        isDuplicate ? dayList : dayList // Ensure no automatic selection of all days
      );
    });
  };

  const columnHeaders = Array.from({ length: lectures });
  const rows = Array.from({ length: teachers }, (_, rowIndex) =>
    Array.from({ length: lectures }, (_, colIndex) => selectedTeachers[rowIndex][colIndex])
  );

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handlePeriodChange = (index, newPeriod) => {
    const updatedPeriods = [...periods];
    updatedPeriods[index] = newPeriod;
    setPeriods(updatedPeriods);
  };

  // Helper function to convert 24-hour time to 12-hour format with AM/PM
  const convertTo12HourFormat = (time) => {
    if (!time) return '';
    let [hours, minutes] = time.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert '0' hour to '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  // Handler for start time change
  const handleStartTimeChange = (rowIndex, colIndex, value) => {
    const newTimes = [...timeInputs];
    newTimes[rowIndex][colIndex] = {
      ...newTimes[rowIndex][colIndex],
      startTime: value,
    };
    setTimeInputs(newTimes);
  };

  // Handler for end time change
  const handleEndTimeChange = (rowIndex, colIndex, value) => {
    const newTimes = [...timeInputs];
    newTimes[rowIndex][colIndex] = {
      ...newTimes[rowIndex][colIndex],
      endTime: value,
    };
    setTimeInputs(newTimes);
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

      {/* Table for screen view */}
      {teachers > 0 && lectures > 0 && (
        <div className='mt-10 overflow-x-auto'>
          <table className='min-w-full bg-white border rounded-lg shadow-xl screen-table'>
            <thead>
              <tr>
                <th className='py-2 border min-w-[150px]'>Classes</th>
                {columnHeaders.map((_, i) => (
                  <th key={i} className='py-2 border min-w-[150px] text-sm'>Class {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: teachers }, (_, i) => (
                <tr key={i}>
                  <td className='py-2 border min-w-[150px] text-sm text-center'>
                    <div className='flex flex-col items-center'>
                      {/* Starting Time input field */}
                      <input
                        type='time'
                        className='w-full p-1 mb-1 rounded-lg border-none focus:outline-none text-sm'
                        value={timeInputs[i][0].startTime}
                        onChange={(e) => handleStartTimeChange(i, 0, e.target.value)}
                      />
                      {/* End time input field */}
                      <input
                        type='time'
                        className='w-full p-1 mb-1 rounded-lg border-none focus:outline-none text-sm'
                        value={timeInputs[i][0].endTime}
                        onChange={(e) => handleEndTimeChange(i, 0, e.target.value)}
                      />

                      {/* Period text */}
                      <input
                        type='text'
                        value={periods[i]}
                        onChange={(e) => handlePeriodChange(i, e.target.value)}
                        className='text-center border-none bg-transparent'
                      />
                    </div>
                  </td>
                  {Array.from({ length: lectures }, (_, j) => (
                    <td key={j} className='py-2 border min-w-[150px]'>
                      <div className='flex flex-col'>

                        <div className='mt-2 mb-2'>
                          {weekdays.map((day, dayIndex) => (
                            <span
                              key={dayIndex}
                              onClick={() => handleDaySelect(dayIndex, i, j)}
                              className={`cursor-pointer px-2 py-1 text-[0.500rem] rounded-full m-1 ${selectedDays[i][j][dayIndex] ? 'bg-gray-800 text-white' : 'bg-gray-200'
                                }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>

                        <select
                          value={selectedTeachers[i][j]}
                          onChange={(e) => handleTeacherSelect(e.target.value, i, j)}
                          className='w-full p-2 rounded-lg border-none focus:outline-none text-sm'
                          style={{
                            backgroundColor: selectedTeachers[i][j] && selectedTeachers[i].some((teacher, colIndex) =>
                              colIndex !== j && teacher === selectedTeachers[i][j] &&
                              JSON.stringify(selectedDays[i][colIndex]) === JSON.stringify(selectedDays[i][j])
                            ) ? 'red' : 'white'
                          }}
                        >
                          <option value=''>Select Teacher</option>
                          {teacherNames.map((teacher, index) => (
                            <option key={index} value={teacher}>
                              {teacher}
                            </option>
                          ))}
                        </select>

                        {/* Enter Subject Input */}
                        <input
                          type='text'
                          value={subjects[i][j]}
                          onChange={(e) => handleSubjectChange(e, i, j)}
                          placeholder='Enter subject'
                          className='mt-2 p-1 px-3 rounded-lg border-none focus:outline-none text-sm text-left bg-slate-100 table-input'
                        />

                        {/* Enter Classroom number Input */}
                        <input
                          type='text'
                          value={classroom[i][j]}
                          onChange={(e) => handleClassroomChange(e, i, j)}
                          placeholder='Enter classroom'
                          className='mt-2 p-1 px-3 rounded-lg border-none focus:outline-none text-sm text-left bg-slate-100 table-input'
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

      {/* Print Tables */}
      {teachers > 0 && lectures > 0 && (
        <div className='print-tables'>
          {/* Container for the tables */}
          <div className='print-table-container'>
            {/* Map through the columns and create separate tables for each set of 4 columns */}
            {Array.from({ length: Math.ceil(lectures / 4) }, (_, tableIndex) => (
              <table key={tableIndex} className='print-table'>
                <thead>
                  <tr>
                    <th>Classes</th>
                    {Array.from({ length: Math.min(4, lectures - tableIndex * 4) }, (_, i) => (
                      <th key={i}>Class {tableIndex * 4 + i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: teachers }, (_, i) => (
                    <tr key={i}>
                      <td className='py-2 border min-w-[150px] text-sm text-center'>
                        <div className='flex flex-col items-center'>
                          {/* Display Start Time in 12-hour format */}
                          <span>{convertTo12HourFormat(timeInputs[i][0].startTime)}</span>
                          {/* Display End Time in 12-hour format */}
                          <span>{convertTo12HourFormat(timeInputs[i][0].endTime)}</span>
                          {/* Period text */}
                          <span>{periods[i]}</span>
                        </div>
                      </td>
                      {Array.from({ length: Math.min(4, lectures - tableIndex * 4) }, (_, j) => (
                        <td key={j}>
                          <div className='flex flex-col'>
                            <div className='mt-2'>
                              {weekdays.map((day, dayIndex) => (
                                <span
                                  key={dayIndex}
                                  className={`px-2 py-1 text-sm rounded-sm mr-1 ${selectedDays[i][tableIndex * 4 + j][dayIndex]
                                    ? 'bg-blue-700 text-slate-950'
                                    : 'bg-red-700 text-slate-100'
                                    }`}
                                >
                                  {day}
                                </span>
                              ))}
                            </div>
                            <select
                              value={selectedTeachers[i][tableIndex * 4 + j]}
                              className='w-full p-2 rounded-lg border-none text-sm'
                              style={{
                                backgroundColor: rowDuplicateTeachers[i].has(
                                  selectedTeachers[i][tableIndex * 4 + j]
                                )
                                  ? 'red'
                                  : 'white',
                              }}
                            >
                              <option value=''>Select Teacher</option>
                              {teacherNames.map((teacher, index) => (
                                <option key={index} value={teacher}>
                                  {teacher}
                                </option>
                              ))}
                            </select>

                            {/* Enter Subject Input */}
                            <input
                              type='text'
                              value={"Subject: " + subjects[i][tableIndex * 4 + j]}
                              placeholder='Enter subject'
                              className='mt-2 p-1 px-3 rounded-lg border-none text-sm text-left bg-slate-100'
                            />

                            {/* Enter Classroom Input */}
                            <input
                              type='text'
                              value={"Classroom: " + classroom[i][tableIndex * 4 + j]}
                              placeholder='Enter classroom'
                              className='mt-2 p-1 px-3 rounded-lg border-none text-sm text-left bg-slate-100'
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      )}


      {/* Print Styles */}
      <style>
        {`
          @media screen {
            .print-tables {
              display: none;
            }
          }
          @media print {
            /* Hide everything except for print-tables */
            body * {
              visibility: hidden;
            }
            select {
              appearance: none;
              -webkit-appearance: none; /* for Safari */
              -moz-appearance: none; /* for Firefox */
              border: none; /* Optional: Remove border if you don't want it */
              background: transparent; /* Optional: Make background transparent */
            }
            .print-tables, .print-tables * {
              visibility: visible;
            }
            /* Ensure print-tables starts at the top of the page */
            .print-tables {
              position: absolute; /* Ensure it starts at the top of the page */
              top: 0;
              left: 0;
              width: 100%;
              margin: 0;
              padding: 0;
            }
            .print-table-container {
              width: 100%;
              page-break-inside: auto;
              margin: 0; /* Remove margins that could push content down */
              padding: 20px; /* Remove padding that could push content down */
            }
            .print-table {
              width: 50%;
              border-collapse: collapse;
              page-break-inside: auto;
              margin-bottom: 1cm;
            }
            @page {
              size: auto;
              margin: 0; /* Remove margin to ensure content starts at the top */
            }
            .print-table thead {
              display: table-header-group;
            }
            .print-table tbody {
              display: table-row-group;
            }
            .print-table tr {
              page-break-inside: auto;
            }
            .print-table th, .print-table td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            .print-table th {
              background-color: #f2f2f2;
            }
            /* Avoid unnecessary page breaks and ensure proper placement */
            .print-tables {
              page-break-before: always; /* Ensure that the content starts on a new page */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Table;
