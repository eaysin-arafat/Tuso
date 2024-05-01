import { RootState } from "@/app/store";
import { DateFunc } from "@/utilities/date";
import { useSelector } from "react-redux";

function useBaseDataEdit() {
  const { user } = useSelector((state: RootState) => state.auth);

  const to_day = DateFunc.toDay();

  const editBase = {
    dateModified: to_day,
    modifiedBy: user?.oid,
    isDeleted: false,
  };

  return [editBase];
}

export default useBaseDataEdit;
