import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LinearStepper from './LinearStepper';
import Select from 'react-select';
import './FormStyle.css';

const StepperApp = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { label: 'Borrower Info', formContent: <Step1Form setActiveStep={setActiveStep} /> },
    { label: 'Director Info', formContent: <Step2Form setActiveStep={setActiveStep} /> },
    { label: 'Financial Info', formContent: <Step3Form setActiveStep={setActiveStep} /> },
    { label: 'Document Upload', formContent: <Step4Form setActiveStep={setActiveStep} /> }
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <div className="container">
      <LinearStepper activeStep={activeStep} steps={steps} />
      <div className="form-content">
        {React.cloneElement(steps[activeStep].formContent, { handleNext, handlePrevious })}
      </div>
    </div>
  );
};

const properties = [
  { value: 'ownHouse', label: 'Own House' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'rawLand', label: 'Raw Land' },
];
const options = [...Array(10)].map((_, index) => ({
    value: index + 1,
    label: `${index + 1}`,
  }));

const Step1Form = ({ handleNext }) => {
    const validationSchema = yup.object().shape({
      name: yup.string().required('Property Name is required'),
      property: yup.string().required('Property Type is required'),
      textarea: yup.string().required('Property Address is required'),
      numberDropdown: yup.number().required('No of units is required'),
      fileAttachment: yup.mixed().required('File attachment is required'),
    });
  
    const { handleSubmit, register, formState: { errors }, setValue } = useForm({
      resolver: yupResolver(validationSchema)
    });
  
    const onSubmit = (data) => {
      console.log(data); // Form data
      handleNext(); // Move to the next step
    };
  
    const handlePropertyChange = (selectedOption) => {
      setValue('property', selectedOption ? selectedOption.value : ''); // Set the city value
    };
    const handleNumChange = (selectedOption) => {
        setValue('numberDropdown', selectedOption ? selectedOption.value : ''); // Set the city value
      };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setValue('fileAttachment', file); // Set the file attachment value
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <h2>Borrower Company Info</h2>
        <div className="grid-container">
          <div className="grid-item">
            <p>Property Name:</p>
            <input type="text" {...register('name')} style={{width:"20rem"}} className="form-input" />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="grid-item">
            <p>Property Type:</p>
            <Select
              options={properties}
              onChange={handlePropertyChange}
              isClearable
            />
            {errors.property && <p className="error-message">{errors.property.message}</p>}
          </div>
          <div className="grid-item">
            <p>Number of Units:</p>
           <Select
            {...register('numberDropdown')}
            onChange={handleNumChange}
            options={options}
            />
            {errors.numberDropdown && <p className="error-message">{errors.numberDropdown.message}</p>}
          </div>
        </div>
          <div className="grid-item">
            <p>Property Address:</p>
            <textarea {...register('textarea')} className="form-input" />
            {errors.textarea && <p className="error-message">{errors.textarea.message}</p>}
          </div>
          <div className="grid-item">
            <p>File Attachment:</p>
            <input type="file" onChange={handleFileChange} className="form-input" />
            {errors.fileAttachment && <p className="error-message">{errors.fileAttachment.message}</p>}
          </div>
        <div className="button-container">
          <button type="submit">Continue</button>
        </div>
      </form>
    );
  };
  

const Step2Form = ({ handleNext, handlePrevious }) => {
  const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    age: yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
    handleNext(); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Director Info</h2>
      <p>Enter your email:</p>
      <input type="email" {...register('email')} className="form-input" />
      {errors.email && <p className="error-message">{errors.email.message}</p>}
      <p>Enter your age:</p>
      <input type="number" {...register('age')} className="form-input" />
      {errors.age && <p className="error-message">{errors.age.message}</p>}
      <div className="button-container">
        <button type="button" onClick={handlePrevious}>Back</button>
        <button type="submit">Continue</button>
      </div>
    </form>
  );
};

const cities = [
    { value: 'chennai', label: 'Chennai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'hyderabad', label: 'Hyderabad' },
  ];
const Step3Form = ({ handleNext, handlePrevious }) => {
  const validationSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('Postal code is required')
  });

  const { handleSubmit, register, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
    handleNext(); // Move to the next step
  };

  const handleCityChange = (selectedOption) => {
    setValue('city', selectedOption ? selectedOption.value : ''); // Set the city value
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Financial Info</h2>
      <p>Enter your address:</p>
      <input type="text" {...register('address')} className="form-input" />
      {errors.address && <p className="error-message">{errors.address.message}</p>}
      <p>Enter your city:</p>
      <Select
        options={cities}
        onChange={handleCityChange}
        isClearable
      />
      {errors.city && <p className="error-message">{errors.city.message}</p>}
      <p>Enter your postal code:</p>
      <input type="text" {...register('postalCode')} className="form-input" />
      {errors.postalCode && <p className="error-message">{errors.postalCode.message}</p>}
      <div className="button-container">
        <button type="button" onClick={handlePrevious}>Back</button>
        <button type="submit">Continue</button>
      </div>
    </form>
  );
};

const Step4Form = ({ handleNext, handlePrevious }) => {
  const validationSchema = yup.object().shape({
    phone: yup.string().required('Phone number is required')
  });

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data) => {
    console.log(data); // Form data
    handleNext(); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <h2>Document Upload</h2>
      <p>Enter your phone number:</p>
      <input type="tel" {...register('phone')} className="form-input" />
      {errors.phone && <p className="error-message">{errors.phone.message}</p>}
      <div className="button-container">
        <button type="button" onClick={handlePrevious}>Back</button>
        <button type="submit">Finish</button>
      </div>
    </form>
  );
};

export default StepperApp;
