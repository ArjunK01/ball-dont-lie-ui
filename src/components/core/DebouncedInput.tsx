import { InputProps, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface DebouncedInputProps extends Omit<InputProps, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
}

const DebouncedInput = ({
  value,
  onChange,
  delay = 300,
  placeholder,
}: DebouncedInputProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [localValue, delay, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <TextField
      variant="standard"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default DebouncedInput;
