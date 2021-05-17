import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validateValue(enteredInput);
  const showError = !inputIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredInput("");
    setIsTouched(false);
  };
  
  return {
    input: enteredInput,
    isValid: inputIsValid,
    showError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
