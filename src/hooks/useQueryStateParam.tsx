import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface UseQueryStateParamProps<T> {
  key: string;
  defaultValue: T;
}

const useQueryStateParam = <T,>({
  key,
  defaultValue,
}: UseQueryStateParamProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialValue = () => {
    const param = searchParams.get(key);
    if (!param) return defaultValue;

    try {
      let value = JSON.parse(param) as T;
      if (typeof value !== typeof defaultValue) {
        return defaultValue;
      }
      return value;
    } catch {
      return defaultValue;
    }
  };

  const [value, setValue] = useState<T>(getInitialValue());

  const searchParamsRef = useRef<URLSearchParams>(
    new URLSearchParams(searchParams)
  );

  useEffect(() => {
    searchParamsRef.current = new URLSearchParams(searchParams);
  }, [searchParams]);

  useEffect(() => {
    const params = searchParamsRef.current;

    if (value !== undefined && value !== null && value !== "") {
      params.set(key, JSON.stringify(value));
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  }, [value, key, setSearchParams]);

  return [value, setValue] as const;
};

export default useQueryStateParam;
