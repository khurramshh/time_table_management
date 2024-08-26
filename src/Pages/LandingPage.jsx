import React, { useState, useRef, useEffect } from 'react';
import Zoom from 'react-reveal/Zoom';
import InputField from './InputField';
import ClockAnimation from './ClockAnimation';
import BackgroundImg1 from '../assets/BackgroundImg1.jpg'
import SchoolForm from './SchoolForm';
import CollegeForm from './CollegeForm';
import UniversityForm from './UniversityForm';
import OfficeForm from './OfficeForm';

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [schoolData, setSchoolData] = useState('');
  const [collegeData, setCollegeData] = useState('');
  const [universityData, setUniversityData] = useState('');
  const [officeData, setOfficeData] = useState('');

  // Refs for each form
  const schoolRef = useRef(null);
  const collegeRef = useRef(null);
  const universityRef = useRef(null);
  const officeRef = useRef(null);

  // Scroll to the selected form when category changes
  useEffect(() => {
    if (selectedCategory === 'School' && schoolRef.current) {
      schoolRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (selectedCategory === 'College' && collegeRef.current) {
      collegeRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (selectedCategory === 'University' && universityRef.current) {
      universityRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (selectedCategory === 'Office' && officeRef.current) {
      officeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCategory]);

  // Handlers to update state for each category
  const handleCategoryChange = (category, value) => {
    switch (category) {
      case 'School':
        setSchoolData(value);
        break;
      case 'College':
        setCollegeData(value);
        break;
      case 'University':
        setUniversityData(value);
        break;
      case 'Office':
        setOfficeData(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className='2xl:flex xl:flex lg:flex md:block block justify-between items-center'>
        <div className='w-11/12 px-10 pt-20'>
          <div
            className='2xl:flex xl:flex lg:flex md:flex hidden items-center justify-center md:w-4/12 md:h-96 w-4/12 h-96 absolute top-8 opacity-25 left-16 z-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${BackgroundImg1})` }}
          ></div>
          <Zoom>
            <div>
              <p className='text-5xl font-bold'>Time Management System</p>
            </div>
          </Zoom>
          <Zoom>
            <div className='w-12/12 text-justify'>
              <p className='2xl:text-md xl:text-md lg:text-md text-lg py-10'>
                Welcome to our innovative timetable generator, designed to effortlessly create customized schedules tailored to your specific needs. Experience seamless organization and efficiency, empowering you to manage your academic or professional commitments with ease.
              </p>
            </div>
          </Zoom>
          <InputField
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onCategoryDataChange={handleCategoryChange}
          />
        </div>
        <div>
          <ClockAnimation />
        </div>
      </div>
      
      {selectedCategory === 'School' && (
        <div ref={schoolRef}>
          <SchoolForm data={schoolData} setData={(value) => handleCategoryChange('School', value)} />
        </div>
      )}
      {selectedCategory === 'College' && (
        <div ref={collegeRef}>
          <CollegeForm data={collegeData} setData={(value) => handleCategoryChange('College', value)} />
        </div>
      )}
      {selectedCategory === 'University' && (
        <div ref={universityRef}>
          <UniversityForm data={universityData} setData={(value) => handleCategoryChange('University', value)} />
        </div>
      )}
      {selectedCategory === 'Office' && (
        <div ref={officeRef}>
          <OfficeForm data={officeData} setData={(value) => handleCategoryChange('Office', value)} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
