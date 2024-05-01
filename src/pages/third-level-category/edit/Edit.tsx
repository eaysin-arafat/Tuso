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
import CategoryCreateForm from "@/components/create-category-form/CreateForm";
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

// edit third level category props type
type Props = {
  toggler: () => void;
};

/**
 * @description Edit Third Level Category component
 */
const EditThirdCategory = ({ toggler }: Props) => {
  // get edit modal data from redux
  const { editModal } = useSelector((state: RootState) => state.modal);

  // get previous data from edit modal
  const prevData = editModal?.data as unknown as IncidentCategory;

  // category state
  const [categoryState, setCategoryState] = React.useState<CategoryType>({
    description: prevData?.description,
    incidentCategorys: prevData?.incidentCategorys,
  });

  // base data for edit record
  const [baseData] = useBaseDataEdit();

  // update category mutation
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

  // form submit handler
  const handleOnSubmit = (data: IncidentCategory) => {
    updateCategory({
      key: Number(prevData?.categoryId),
      body: {
        ...baseData,
        ...prevData,
        oid: prevData?.categoryId,
        ...data,
      },
    });
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "third label category",
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
      title="Create Third Level Category"
      toggler={toggler}
    >
      {/* Create Category Form */}
      <CategoryCreateForm
        handleOnSubmit={handleOnSubmit}
        categoryState={categoryState}
        toggler={toggler}
        categoryType="Third"
      />
    </DefaultModal>
  );
};

export default EditThirdCategory;
