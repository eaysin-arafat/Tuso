/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import EmailConfigurationForm from "@/components/email-configuration/EmailConfigurationForm";
import { EmailConfiguration } from "@/constants/api-interface";
import { useCreateEmailConfigurationMutation } from "@/features/email-configuration/email-configuration-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React from "react";
import { EmailConfigType, emailConfigInitialState } from "../constant";

const CreateEmailConfiguration = ({ toggler }: { toggler: () => void }) => {
  // Local form state
  const [formState, setFormState] = React.useState<EmailConfigType>(
    emailConfigInitialState
  );

  // Base Data for Create
  const [baseData] = useBaseDataCreate();

  // Create Email Configuration hook
  const [
    createEmailConfig,
    {
      data: emailConfigData,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
      status: createStatus,
    },
  ] = useCreateEmailConfigurationMutation();

  // Submit handler
  const handleOnSubmit = (data: EmailConfiguration) => {
    createEmailConfig({
      ...baseData,
      ...data,
    });
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "email configuration",
    messageType: "create",
    response: emailConfigData,
    isToggle: true,
    initialState: emailConfigInitialState,
    setFormState,
    toggler,
  });

  return (
    <DefaultModal
      size="4xl"
      title="Create Email Configuration"
      toggler={toggler}
    >
      {/* Email Configuration Form  */}
      <EmailConfigurationForm
        handleOnSubmit={handleOnSubmit}
        categoryState={formState}
        toggler={toggler}
      />
    </DefaultModal>
  );
};

export default CreateEmailConfiguration;
