import React from 'react';
import './LinearStepper.css';

const LinearStepper = ({ activeStep, steps }) => {
  return (
    <div className="linear-stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === activeStep ? 'active' : ''}`}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default LinearStepper;
