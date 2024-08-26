import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import 'react-simple-typewriter/dist/index.css';

const TypewriterComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        <Typewriter
          words={['Khurram']}
          loop={false}
          cursor
          cursorStyle="_"
          typeSpeed={100}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>
    </div>
  );
};

export default TypewriterComponent;
