import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

export const useFetch = async (mutation, ...rest) => {
  const [action, { loading, error }] = useMutation(mutation);
  const [errors, setErrors] = useState(error);
  const [Loading, setLoading] = useState(loading);
  const [Data, setData] = useState(null);
  const { data } = await action(...rest);

  useEffect(() => {
    let isMounted = true;
    try {
      if (isMounted) {
        setData(data);
        setErrors(error);
        setLoading(loading);
      }
    } catch (error) {
      if (isMounted) {
        setErrors(error);
        setLoading(loading);
        setData(null);
      }
    }
    return () => (isMounted = false);
  }, [mutation, rest]);
  return { Loading, Data, errors };
};
