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
import EmailConfigurationForm from "@/components/email-configuration/EmailConfigurationForm";
import { EmailConfiguration } from "@/constants/api-interface";
import { useUpdateEmailConfigurationMutation } from "@/features/email-configuration/email-configuration-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import React from "react";
import { useSelector } from "react-redux";
import { EmailConfigType, emailConfigInitialState } from "../constant";

const EditEmailConfiguration = ({ toggler }: { toggler: () => void }) => {
  //Edit modal data from redux store
  const { editModal } = useSelector((state: RootState) => state.modal);
  const prevData = editModal?.data as unknown as EmailConfiguration;

  // Form State
  const [formState, setFormState] = React.useState<EmailConfigType>({
    domainName: prevData?.domainName,
    auditmails: String(prevData?.auditmails),
    emailAddress: prevData?.emailAddress,
    password: prevData?.password,
    port: String(prevData?.port),
    smtpServer: prevData?.smtpServer,
  });

  // Edit Base Data
  const [baseData] = useBaseDataEdit();

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
  ] = useUpdateEmailConfigurationMutation();

  // Form Submit handler
  const handleOnSubmit = (data: EmailConfiguration) => {
    createEmailConfig({
      key: Number(prevData?.oid),
      body: { ...baseData, ...prevData, ...data },
    });
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "email configuration",
    messageType: "update",
    response: emailConfigData,
    initialState: emailConfigInitialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  return (
    <DefaultModal size="4xl" title="Edit Email Configuration" toggler={toggler}>
      {/* Email Configuration Form */}
      <EmailConfigurationForm
        handleOnSubmit={handleOnSubmit}
        categoryState={formState}
        toggler={toggler}
      />
    </DefaultModal>
  );
};

export default EditEmailConfiguration;
