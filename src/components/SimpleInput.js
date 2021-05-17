/*SimpleInput.js*/
import React, { useState } from 'react'

const SimpleInput = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameTyped, setNameTyped] = useState(false);
  const [emailTyped, setEmailTyped] = useState(false);
  
  // Boolean functions check input validity
  const inputIsEmpty = value => value.trim() === '';
  const checkEmail = email => email.trim().includes('@');
  
  let formIsValid = false;
  const nameInputIsValid = !inputIsEmpty(name);
  // Created to display empty error
  const emailIsNotEmpty = !inputIsEmpty(email);
  // Created to display invalid error
  const emailIsValid = checkEmail(email);
  const emailInputIsValid = emailIsValid && emailIsNotEmpty;
  const nameInputIsInvalid = !nameInputIsValid && nameTyped;
  const emailInputIsInvalid = !emailInputIsValid && emailTyped;

  formIsValid = nameInputIsValid && emailInputIsValid ? true : false;

  const nameInputChangeHandler = event => {
    setName(event.target.value);
  };

  const emailInputChangeHandler = event => {
    setEmail(event.target.value);
  };

  const nameInputBlurHandler = event => {
    setNameTyped(true);
  };

  const emailInputBlurHandler = event => {
    setEmailTyped(true);
  };

  const submitHandler = event => {
    event.preventDefault();
    setNameTyped(true);
    setEmailTyped(true);

    if(!nameInputIsValid || !emailInputIsValid) 
      return;

    console.log(name);
    setName('');
    setEmail('');
    setNameTyped(false);
    setEmailTyped(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={`form-control ${nameInputIsInvalid ? 'invalid' :                ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler} value={name}/>
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty!</p>}
      </div>
      <div className={`form-control ${emailInputIsInvalid ? 'invalid' : ''}`}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler} value={email}/>
        {!emailIsNotEmpty && emailTyped && <p className='error-text'>Email must not be empty!</p>} 
        {!emailIsValid && emailTyped && emailIsNotEmpty && <p className='error-text'>Email is not valid!</p>} 
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;