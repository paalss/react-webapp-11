import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== "") {
      setEnteredNameIsValid(true);
    }
  };

  const nameInputBlur = () => {
    setEnteredNameTouched(true);
    if (enteredName.trim() !== "") {
      setEnteredNameIsValid(true);
    }
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    if (enteredName.trim() !== "") {
      setEnteredNameIsValid(true);
    }
    setEnteredNameIsValid(true);

    // console.log(enteredName);
    // console.log(nameInputRef.current.value);
  };

  const nameInputIsInValid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInValid
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={nameInputBlur}
          onChange={nameInputChangeHandler}
        />
        {nameInputIsInValid && <p className="error-text">fyll ut navn</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
