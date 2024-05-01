import { useEffect, useState } from "react";

const useRenderOptions = (
  queryFn,
  id = undefined,
  refetchOnMountOrArgChange = true
) => {
  const { data, isLoading, isError } = id
    ? queryFn(
        { key: id },
        {
          skip: !id,
          refetchOnMountOrArgChange,
        }
      )
    : queryFn(undefined);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    
    if (data) {
      setOptions(data?.data);
    }
  }, [data]);

  return { options, isLoading, isError };
};

export default useRenderOptions;
