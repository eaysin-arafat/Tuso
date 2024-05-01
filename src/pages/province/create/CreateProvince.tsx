/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import DefaultModal from "@/components/core/modal/DefaultModal";
import DataRow from "@/components/core/table/DataRow";
import ProvinceCreateForm from "@/components/province/CreateForm";
import { useSelector } from "react-redux";

// Define the type of the props
type Props = {
  toggler: () => void;
};

/**
 * @description Create Province component
 */
const CreateProvince = ({ toggler }: Props) => {
  const { data } = useSelector((state: RootState) => state.modal?.addModal);

  return (
    <DefaultModal size="3xl" title="Add Province" toggler={toggler}>
      {/* COUNTRY NAME */}
      <DataRow title="Country Name" data={data} className="mb-3" />

      {/* CREATE PROVINCE FORM */}
      <ProvinceCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateProvince;
