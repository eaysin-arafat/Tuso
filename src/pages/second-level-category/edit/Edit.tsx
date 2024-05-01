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

// second level category prop types
type Props = {
  toggler: () => void;
};

// second level category component
const EditSecondCategory = ({ toggler }: Props) => {
  // get edit modal data
  const { editModal } = useSelector((state: RootState) => state.modal);

  // get previous data
  const prevData = editModal?.data as unknown as IncidentCategory;

  // category state
  const [categoryState, setCategoryState] = React.useState<CategoryType>({
    description: prevData?.description,
    incidentCategorys: prevData?.incidentCategorys,
  });

  // base data for edit record
  const [baseData] = useBaseDataEdit();

  // update second level category mutation
  const [
    updateCategory,
    { data: categoryRes, error, isError, isSuccess, status },
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

  // side effect for create category
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "Second label category",
    messageType: "update",
    response: categoryRes,
    setFormState: setCategoryState,
    toggler,
    initialState: categoryInitialState,
    isToggle: true,
  });

  return (
    <DefaultModal
      size="3xl"
      title="Create Second Level Category"
      toggler={toggler}
    >
      {/* CREATE SECOND LEVEL CATEGORY FORM */}
      <CategoryCreateForm
        handleOnSubmit={handleOnSubmit}
        categoryState={categoryState}
        toggler={toggler}
        categoryType="Second"
      />
    </DefaultModal>
  );
};

export default EditSecondCategory;
