import { RootState } from "@/app/store";
import { DateFunc } from "@/utilities/date";
import { useSelector } from "react-redux";

function useBaseDataCreate() {
  const { user } = useSelector((state: RootState) => state.auth);

  
  const to_day = DateFunc.toDay();

  const createBase = {
    dateCreated: to_day,
    createdBy: user?.oid,
    isDeleted: false,
  };

  return [createBase];
}

export default useBaseDataCreate;
