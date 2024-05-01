/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import CategoryCreateForm from "@/components/create-category-form/CreateForm";
import { IncidentCategory } from "@/constants/api-interface";
import {
  CategoryType,
  categoryInitialState,
} from "@/constants/api-interface/category-types";
import { useCreateIncidentCategoryMutation } from "@/features/incident-category/incident-category-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React from "react";
import { useParams } from "react-router-dom";

// create third level category props type
type Props = {
  toggler: () => void;
};

/**
 * @description Create Third Level Category component
 */
const CreateThirdCategory = ({ toggler }: Props) => {
  // category state
  const [categoryState, setCategoryState] =
    React.useState<CategoryType>(categoryInitialState);

  // base data for create record
  const [baseData] = useBaseDataCreate();

  // get second category id from url
  const { secondCategoryId } = useParams();

  // create category mutation
  const [
    createCategory,
    {
      data: categoryRes,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useCreateIncidentCategoryMutation();

  // form submit handler
  const handleOnSubmit = (data: IncidentCategory) => {
    createCategory({
      ...baseData,
      ...data,
      parentId: secondCategoryId,
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

export default CreateThirdCategory;
