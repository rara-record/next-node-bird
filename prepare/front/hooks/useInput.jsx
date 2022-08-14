import { useState, useCallback } from "react";

export default (initialValuse = null) => {
  const [value, setValue] = useState(initialValuse);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
