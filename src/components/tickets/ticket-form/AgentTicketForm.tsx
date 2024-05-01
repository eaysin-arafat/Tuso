/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import Select from "@/components/core/form-elements/Select";
import { useReadIncidentCategoryPageByLevelQuery } from "@/features/incident-category/incident-category-api";

const AgentTicketForm = ({
  formState,
  handleFormChange,
  inputError,
  firstLevelCategoryId,
  secondLevelCategoryId,
  thirdLevelCategoryId,
  handleFirstCategoryChange,
  handleSecondCategoryChange,
  handleThirdCategoryChange,
  isReadOnly,
  firstCategoriesOptions,
  prioritiesOptions,
  role,
}) => {
  const { data: secondCategories } = useReadIncidentCategoryPageByLevelQuery(
    { key: firstLevelCategoryId },
    {
      skip: !firstLevelCategoryId,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: thirdCategories } = useReadIncidentCategoryPageByLevelQuery(
    { key: secondLevelCategoryId },
    {
      skip: !secondLevelCategoryId,
      refetchOnMountOrArgChange: true,
    }
  );

  const renderPriorityOptions = () => {
    return prioritiesOptions?.map((priority) => (
      <option key={priority?.oid} value={priority?.oid}>
        {priority?.priority}
      </option>
    ));
  };

  const renderFirstCategoriesOptions = () => {
    return firstCategoriesOptions?.map((cat) => (
      <option key={cat?.oid} value={cat?.oid}>
        {cat?.incidentCategorys}
      </option>
    ));
  };

  const renderSecondCategoriesOptions = () => {
    return secondCategories?.data?.incidentCategories?.map((cat) => (
      <option key={cat?.categoryId} value={cat?.categoryId}>
        {cat?.incidentCategorys}
      </option>
    ));
  };

  const renderThirdCategoriesOptions = () => {
    return thirdCategories?.data?.incidentCategories?.map((cat) => (
      <option key={cat?.categoryId} value={cat?.categoryId}>
        {cat?.incidentCategorys}
      </option>
    ));
  };

  return (
    <>
      <Select
        required
        label="Priority"
        name="priorityId"
        value={formState?.priorityId}
        onChange={handleFormChange}
        errMsg={inputError?.priorityId}
        disabled={
          isReadOnly ||
          (role === 3 && firstLevelCategoryId) ||
          (role === 4 && firstLevelCategoryId)
        }
      >
        {renderPriorityOptions()}
      </Select>
      <Select
        required
        label="First Level Category"
        name="firstLevelCategoryId"
        value={firstLevelCategoryId}
        onChange={handleFirstCategoryChange}
        errMsg={inputError?.firstLevelCategoryId}
        disabled={
          isReadOnly ||
          (role === 3 && firstLevelCategoryId) ||
          (role === 4 && firstLevelCategoryId)
        }
      >
        {firstCategoriesOptions?.length && renderFirstCategoriesOptions()}
      </Select>
      <Select
        required
        label="Second Level Category"
        name="secondLevelCategoryId"
        value={secondLevelCategoryId}
        onChange={handleSecondCategoryChange}
        errMsg={inputError?.secondLevelCategoryId}
        disabled={
          isReadOnly ||
          (role === 3 && firstLevelCategoryId) ||
          (role === 4 && firstLevelCategoryId)
        }
      >
        {secondCategories?.data?.incidentCategories?.length &&
          renderSecondCategoriesOptions()}
      </Select>

      <Select
        required
        label="Third Level Category"
        name="thirdLevelCategoryId"
        value={thirdLevelCategoryId}
        onChange={handleThirdCategoryChange}
        errMsg={inputError?.thirdLevelCategoryId}
        disabled={
          isReadOnly ||
          (role === 3 && firstLevelCategoryId) ||
          (role === 4 && firstLevelCategoryId)
        }
      >
        {thirdCategories?.data?.incidentCategories?.length &&
          renderThirdCategoriesOptions()}
      </Select>
    </>
  );
};

export default AgentTicketForm;
