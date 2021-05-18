import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type==='INPUT') {
    return { value: action.value, isTouched: state.isTouched}
  }
  if (action.type==='BLUR') {
    return {isTouched: true, value: state.value}
  }
  if (action.type==='RESET') {
    return {isTouched: false, value: ''}   
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const inputIsValid = validateValue(inputState.value);
  const showError = !inputIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value})
  };
  
  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'})
  };

  const reset = () => {
    dispatch({type:'RESET'})
  };

  return {
    input: inputState.value,
    isValid: inputIsValid,
    showError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
