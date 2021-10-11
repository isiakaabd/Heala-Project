import { useState } from "react";

const useFormInput = (initialValue) => {
  const [formInput, setFormInput] = useState(initialValue);

  return [
    formInput,
    (e) => {
      setFormInput({ ...formInput, [e.target.name]: e.target.value });
    },
  ];
};

export default useFormInput;
