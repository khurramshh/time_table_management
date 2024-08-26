import React from 'react'
import Lottie from 'lottie-react';
import Clock from '../Pages/Clock.json'

const ClockAnimation = () => {
    return (
        <div className=''>
            <Lottie animationData={Clock} />
        </div>
    )
}

export default ClockAnimation
