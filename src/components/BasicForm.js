import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    input: enteredFName,
    isValid: fNameIsValid,
    showError: showFNameError,
    inputChangeHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    reset: resetFName,
  } = useInput((value) => value !== "");

  const {
    input: enteredLName,
    isValid: lNameIsValid,
    showError: showLNameError,
    inputChangeHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    reset: resetLName,
  } = useInput((value) => value !== "");

  const {
    input: enteredEmail,
    isValid: emailIsValid,
    showError: showEmailError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => validateEmail(value));

  function validateEmail(mail) {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(mail);
  }

  const formIsValid = fNameIsValid && lNameIsValid && emailIsValid;

  const fNameInputClass = !showFNameError
    ? "form-control"
    : "form-control invalid";

  const lNameInputClass = !showLNameError
    ? "form-control"
    : "form-control invalid";

  const emailInputClass = !showEmailError
    ? "form-control"
    : "form-control invalid";

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitting...");
    resetFName();
    resetLName();
    resetEmail();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={fNameInputClass}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={fNameChangeHandler}
            onBlur={fNameBlurHandler}
            value={enteredFName}
          />
          {showFNameError && (
            <p className="error-text">Please enter first name</p>
          )}
        </div>
        <div className={lNameInputClass}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lNameChangeHandler}
            onBlur={lNameBlurHandler}
            value={enteredLName}
          />
          {showLNameError && (
            <p className="error-text">Please enter last name</p>
          )}
        </div>
      </div>
      <div className={emailInputClass}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          placeholder="a@aa.aa"
        />
        {showEmailError && (
          <p className="error-text">Please enter valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
