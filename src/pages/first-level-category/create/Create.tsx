/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import FirstCategoryCreateForm from "@/components/create-category-form/CreateForm";
import { IncidentCategory } from "@/constants/api-interface";
import {
  CategoryType,
  categoryInitialState,
} from "@/constants/api-interface/category-types";
import { useCreateIncidentCategoryMutation } from "@/features/incident-category/incident-category-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React from "react";

// Props Type
type Props = {
  toggler: () => void;
};

const CreateFirstCategory = ({ toggler }: Props) => {
  // Local State
  const [categoryState, setCategoryState] =
    React.useState<CategoryType>(categoryInitialState);
  const [baseData] = useBaseDataCreate();

  // Create Category hook
  const [
    createCategory,
    { data: categoryRes, error, isError, isSuccess, status },
  ] = useCreateIncidentCategoryMutation();

  // Submit Handler
  const handleOnSubmit = (data: IncidentCategory) => {
    createCategory({
      ...baseData,
      ...data,
      parentId: 0,
    });
  };

  // Category Create SideEffect
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "first label category",
    messageType: "create",
    response: categoryRes,
    initialState: categoryInitialState,
    isToggle: true,
    setFormState: setCategoryState,
    toggler,
  });

  return (
    <DefaultModal
      size="3xl"
      title="Create First Level Category"
      toggler={toggler}
    >
      {/* First Category Create Form */}
      <FirstCategoryCreateForm
        handleOnSubmit={handleOnSubmit}
        categoryState={categoryState}
        toggler={toggler}
        categoryType="First"
      />
    </DefaultModal>
  );
};

export default CreateFirstCategory;
