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

// second level category prop types
type Props = {
  toggler: () => void;
};

/**
 * @description CreateSecondCategory component
 */
const CreateSecondCategory = ({ toggler }: Props) => {
  // category state
  const [categoryState, setCategoryState] =
    React.useState<CategoryType>(categoryInitialState);

  // base data for create record
  const [baseData] = useBaseDataCreate();

  // get category id from url
  const { categoryId } = useParams();

  // create second level category mutation
  const [
    createCategory,
    { data: categoryRes, error, isError, isSuccess, status },
  ] = useCreateIncidentCategoryMutation();

  // form submit handler
  const handleOnSubmit = (data: IncidentCategory) => {
    createCategory({
      ...baseData,
      ...data,
      parentId: categoryId,
    });
  };

  // handle side effect on create
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "Second label category",
    messageType: "create",
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
      {/* CATEGORY FORM */}
      <CategoryCreateForm
        handleOnSubmit={handleOnSubmit}
        categoryState={categoryState}
        toggler={toggler}
        categoryType="Second"
      />
    </DefaultModal>
  );
};

export default CreateSecondCategory;
