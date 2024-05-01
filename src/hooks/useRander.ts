import { useEffect, useState } from "react";

const useRender = (
  queryFn,
  id = undefined,
  refetchOnMountOrArgChange = true
) => {
  const { data, isLoading, isError } = id
    ? queryFn(id, {
        skip: !id,
        refetchOnMountOrArgChange,
      })
    : queryFn(undefined);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data) {
      setOptions(data?.data);
    }
  }, [data]);

  return { options, isLoading, isError };
};

export default useRender;
