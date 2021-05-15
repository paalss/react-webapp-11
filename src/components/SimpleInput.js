import { useReducer } from "react";

const nameReducer = (state, action) => {
  if (action.type === "SET_ENTERED_INPUT") {
    return { ...state, enteredInput: action.value };
  }
  if (action.type === "SET_TOUCHED") {
    return { ...state, touched: action.value };
  }
};

const emailReducer = (state, action) => {
  if (action.type === "SET_ENTERED_INPUT") {
    return { ...state, enteredInput: action.value };
  }
  if (action.type === "SET_TOUCHED") {
    return { ...state, touched: action.value };
  }
};

const SimpleInput = (props) => {
  const [nameState, dispatchName] = useReducer(nameReducer, {
    enteredInput: "",
    touched: false,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    enteredInput: "",
    touched: false,
  });

  const enteredNameIsValid = nameState.enteredInput.trim() !== "";

  function validateEmail(mail) {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(mail);
  }
  const enteredEmailIsValid = validateEmail(emailState.enteredInput);

  const showNameError = !enteredNameIsValid && nameState.touched;
  const showEmailError = !enteredEmailIsValid && emailState.touched;

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    dispatchName({ type: "SET_ENTERED_INPUT", value: event.target.value });
  };

  const emailInputChangeHandler = (event) => {
    dispatchEmail({ type: "SET_ENTERED_INPUT", value: event.target.value });
  };

  const nameInputBlur = () => {
    dispatchName({ type: "SET_TOUCHED", value: true });
  };

  const emailInputBlur = () => {
    dispatchEmail({ type: "SET_TOUCHED", value: true });
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    dispatchName({ type: "SET_TOUCHED", value: true });
    dispatchEmail({ type: "SET_TOUCHED", value: true });
    
    if (!formIsValid) {
      return;
    }

    dispatchName({ type: "SET_ENTERED_INPUT", value: "" });
    dispatchEmail({ type: "SET_ENTERED_INPUT", value: "" });
    dispatchName({ type: "SET_TOUCHED", value: false });
    dispatchEmail({ type: "SET_TOUCHED", value: false });

    console.log('submitting...');
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
          onBlur={nameInputBlur}
          onChange={nameInputChangeHandler}
          value={nameState.enteredInput}
        />
        {showNameError && <p className="error-text">name cannot be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onBlur={emailInputBlur}
          onChange={emailInputChangeHandler}
          value={emailState.enteredInput}
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
