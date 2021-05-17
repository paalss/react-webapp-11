import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    input: enteredName,
    isValid: enteredNameIsValid,
    showError: showNameError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  function validateEmail(mail) {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(mail);
  }
  const enteredEmailIsValid = validateEmail(enteredEmail);
  const showEmailError = !enteredEmailIsValid && enteredEmailTouched;

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  
  const emailBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetNameInput();

    setEnteredEmail("");
    setEnteredEmailTouched(false);

    console.log("submitting...");
  };

  const nameInputClasses = showNameError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = showEmailError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          value={enteredName}
        />
        {showNameError && <p className="error-text">name cannot be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
          placeholder="a@aa.aa"
        />
        {showEmailError && <p className="error-text">email must be valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
