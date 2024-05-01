/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import DefaultModal from "@/components/core/modal/DefaultModal";
import DataRow from "@/components/core/table/DataRow";
import DistrictCreateForm from "@/components/district/CreateForm";
import { useSelector } from "react-redux";

type Props = {
  toggler: () => void;
};

const CreateDistrict = ({ toggler }: Props) => {
  const { data } = useSelector((state: RootState) => state.modal?.addModal);

  return (
    <DefaultModal size="3xl" title="Add District" toggler={toggler}>
      {/* Country */}
      <DataRow title="Country Name" data={data?.countryName} />

      {/* Province Name */}
      <DataRow
        title="Province Name"
        data={data.provinceName}
        className="mb-3"
      />

      {/* Create District Form  */}
      <DistrictCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateDistrict;
