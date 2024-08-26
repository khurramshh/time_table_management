import React from 'react';

const InputField = ({ selectedCategory, onCategoryChange, onCategoryDataChange }) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onCategoryChange(selectedValue);
    
  };

  return (
    <div className='2xl:w-96 xl:w-96 lg:w-96 md:w-96 w-60 px-1 rounded-lg mb-4 mt-28'>
      <select
        value={selectedCategory}
        onChange={handleSelectChange}
        className='border-2 border-black rounded-xl p-2 w-full'
      >
        <option value="" disabled>Select a category</option>
        <option value="School">School</option>
        <option value="College">College</option>
        <option value="University">University</option>
        <option value="Office">Office</option>
      </select>
    </div>
  );
};

export default InputField;
