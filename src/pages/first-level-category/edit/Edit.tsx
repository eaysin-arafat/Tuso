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
import FirstCategoryCreateForm from "@/components/create-category-form/CreateForm";
import { IncidentCategory } from "@/constants/api-interface";
import {
  CategoryType,
  categoryInitialState,
} from "@/constants/api-interface/category-types";
import { useUpdateIncidentCategoryMutation } from "@/features/incident-category/incident-category-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  toggler: () => void;
};

const EditFirstCategory = ({ toggler }: Props) => {
  // Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);
  const prevData = editModal?.data as unknown as IncidentCategory;

  // Local State
  const [categoryState, setCategoryState] = React.useState<CategoryType>({
    incidentCategorys: prevData?.incidentCategorys,
    description: prevData?.description,
  });

  // Edit Base Data
  const [baseData] = useBaseDataEdit();

  // Update Category hook
  const [
    updateCategory,
    {
      data: categoryRes,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useUpdateIncidentCategoryMutation();

  // Submit Handler
  const handleOnSubmit = (data: IncidentCategory) => {
    updateCategory({
      key: Number(prevData?.oid),
      body: { ...baseData, ...prevData, ...data, parentId: 0 },
    });
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "first label category",
    messageType: "update",
    response: categoryRes,
    initialState: categoryInitialState,
    isToggle: true,
    setFormState: setCategoryState,
    toggler,
  });

  return (
    <DefaultModal
      size="3xl"
      title="Update First Level Category"
      toggler={toggler}
    >
      {/* First Category Edit Form */}
      <FirstCategoryCreateForm
        handleOnSubmit={handleOnSubmit}
        categoryState={categoryState}
        toggler={toggler}
        categoryType="First"
      />
    </DefaultModal>
  );
};

export default EditFirstCategory;
