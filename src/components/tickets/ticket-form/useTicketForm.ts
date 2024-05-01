/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { TypeIncidentEdit } from "@/constants/api-interface";
import { Facility } from "@/constants/api-interface/Facility";
import {
  FormSubmitEventType,
  OnchangeEventType,
} from "@/constants/interface/htmlEvents";
import {
  useCreateIncidentMutation,
  useReadIncidentsByTicketKeyQuery,
  useUpdateIncidentMutation,
  useUpdateIncidentReassignMutation,
} from "@/features/incidents/incidents-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import useCloseModal from "@/hooks/shared/useCloseModal";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { datePickerToString } from "@/utilities/date";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

export type TypeTicketForm = {
  ticketTitle?: string;
  dateOfIncident?: string;
  systemId: string;
  teamId?: string;
  teamLeadId?: string;
  callerName?: string;
  callerJobTitle?: string;
  callerCellphone?: string;
  callerEmail?: string;
  description?: string;
  priorityId?: string;
  callerCountryCode?: string;
  assignedTo: string;
  isReassigned?: boolean;
};

export type TypeTicketErrorForm = {
  ticketTitle?: string;
  dateOfIncident?: string;
  systemId?: string;
  teamId?: string;
  teamLeadId?: string;
  callerName?: string;
  callerJobTitle?: string;
  callerCellphone?: string;
  callerEmail?: string;
  description?: string;
  priorityId?: string;
  callerCountryCode?: string;

  assignedTo?: string;
  firstLevelCategoryId?: string;
  secondLevelCategoryId?: string;
  thirdLevelCategoryId?: string;
  provinceId?: string;
  districtId?: string;
  facilityId?: string;
};

const useTicketForm = () => {
  // form state
  const initialState = {
    ticketTitle: null,
    dateOfIncident: null,
    systemId: null,
    teamId: null,
    teamLeadId: null,
    callerName: null,
    callerJobTitle: null,
    callerCellphone: null,
    callerEmail: null,
    description: null,
    priorityId: null,
    callerCountryCode: null,

    assignedTo: null,
  };

  const { data } = useSelector((state: RootState) => state.modal?.editModal);
  const { user } = useSelector((state: RootState) => state.auth);
  const modalData = data as unknown as TypeIncidentEdit;

  const [baseData] = useBaseDataCreate();
  const [editBase] = useBaseDataEdit();
  const { toggler } = useCloseModal();
  const isClient = user?.roleId === 1;

  // form state
  const [formState, setFormState] = useState<TypeTicketForm>(initialState);
  const [inputError, setInputError] = useState<TypeTicketErrorForm | null>(
    null
  );
  const [fundingAgency, setFundingAgency] = React.useState([]);
  const [implementingPartner, setImplementingPartner] = React.useState([]);

  const [isValidImg, setIsValidImg] = React.useState(true);
  const imgRef = React.useRef(null);

  const [teamLeadId, setTeamLeadId] = useState<string>(null);
  console.log(setTeamLeadId);

  const [firstLevelCategoryId, setFirstLevelCategoryId] =
    useState<string>(null);
  const [secondLevelCategoryId, setSecondLevelCategoryId] =
    useState<string>("");
  const [thirdLevelCategoryId, setThirdLevelCategoryId] =
    useState<string>(null);

  const [provinceId, setProvinceId] = useState<string>(
    isClient ? user?.provinceId : null
  );
  const [districtId, setDistrictId] = useState<string>(
    isClient ? user?.districtId : null
  );
  const [facilityId, setFacilityId] = useState<string>(
    isClient ? String(user?.facilityId) : null
  );
  const [facilities, setFacilities] = useState<Facility[]>([]);
  // receive previous facilityId
  const [prevFacilityId, setPrevFacilityId] = React.useState(
    isClient ? String(user?.facilityId) : null
  );

  const [teamId, setTeamId] = useState<string>(null);

  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState<string[]>([]);
  const isReadOnly =
    modalData?.status === "Close" || (user?.roleId === 4 && !user?.isTeamLead);
  const isExpertMember = user?.roleId === 4 && !user?.isTeamLead;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);

      const reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = () => {
        // Get the base64 string without the prefix
        const base64WithoutPrefix = (reader?.result as string)?.split(",")[1];
        setImageBase64((prevState) => [...prevState, base64WithoutPrefix]);
        // setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.error(
          "Error occurred while converting image to base64:",
          error
        );
      };
    } else {
      alert("Please select a valid image file (JPEG or PNG)");
    }
  };

  const handleRemove = () => {
    setImage(null);
    setImageBase64([]);
    setImages([]);
  };

  const { data: tickets } = useReadIncidentsByTicketKeyQuery(
    modalData?.ticketNo,
    { skip: !modalData?.ticketNo, refetchOnMountOrArgChange: true }
  );

  const prevData = tickets?.data?.incidents;

  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFirstCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstLevelCategoryId(e.target.value);
  };

  const handleSecondCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondLevelCategoryId(e.target.value);
  };

  const handleThirdCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setThirdLevelCategoryId(e.target.value);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProvinceId(e.target.value);
    setDistrictId("");
    setFacilityId("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistrictId(e.target.value);
    setFacilityId("");
  };

  const handleFacilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFacilityId(e.target.value);
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamId(e.target.value);
  };

  // date change handler function
  const handleDateChange = (date: Date | null) => {
    const dateValue = datePickerToString(date);
    setFormState((prev: TypeTicketForm) => ({
      ...prev,
      dateOfIncident: dateValue,
    }));
  };

  // Create api mutation
  const [
    createIncident,
    {
      isLoading: incidentCreateLoading,
      data: incidentCreateRes,
      status: createStatus,
      isError: isCreateError,
      error: createError,
      isSuccess: isCreateSuccess,
    },
  ] = useCreateIncidentMutation();

  // Edit api mutation
  const [
    updateIncident,
    {
      data: incidentUpdateRes,
      status: updateStatus,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateIncidentMutation();

  // Edit api mutation
  const [
    updateIncidentReassign,
    {
      data: incidentUpdateReassign,
      status: updateStatusReassign,
      isError: isUpdateErrorReassign,
      error: updateErrorReassign,
      isSuccess: isUpdateSuccessReassign,
    },
  ] = useUpdateIncidentReassignMutation();

  const handleSubmit = (e: FormSubmitEventType) => {
    e.preventDefault();

    const { isValid, errors } = TicketValidator(user?.roleId, prevData, {
      ...formState,
      firstLevelCategoryId,
      secondLevelCategoryId,
      thirdLevelCategoryId,
      provinceId,
      districtId,
      facilityId,
      teamId,
    });

    if (!isValid) {
      setInputError(errors);
      return;
    }

    const submitData = {
      ...baseData,
      ...formState,

      systemId: formState?.systemId ? Number(formState?.systemId) : null,
      assignedTo: formState?.assignedTo ? Number(formState?.assignedTo) : null,
      teamLeadId: teamLeadId ? Number(teamLeadId) : null,
      firstLevelCategoryId: firstLevelCategoryId
        ? Number(firstLevelCategoryId)
        : null,
      secondLevelCategoryId: secondLevelCategoryId
        ? Number(secondLevelCategoryId)
        : null,
      thirdLevelCategoryId: thirdLevelCategoryId
        ? Number(thirdLevelCategoryId)
        : null,
      priorityId: formState?.priorityId ? Number(formState?.priorityId) : null,
      // provinceId: provinceId ? Number(provinceId) : null,
      // districtId: districtId ? Number(districtId) : null,
      facilityId: facilityId ? Number(facilityId) : null,
      teamId: teamId ? Number(teamId) : null,
      reportedBy: baseData?.createdBy,
      dateReported: baseData?.dateCreated,
      isOpen: true,
      images: images,

      resolvedRequest: false,
      isResolved: false,

      fundingAgencyList: fundingAgency,
      implementingList: implementingPartner,
    };

    const submitEditData = {
      ...prevData,
      ...formState,
      ...editBase,
      systemId: formState?.systemId ? Number(formState?.systemId) : null,
      assignedTo: formState?.assignedTo ? Number(formState?.assignedTo) : null,
      // reassignedTo:
      //   prevData?.assignedToState && formState?.assignedTo
      //     ? Number(formState?.assignedTo)
      //     : null,
      teamLeadId: teamLeadId ? Number(teamLeadId) : null,
      firstLevelCategoryId: firstLevelCategoryId
        ? Number(firstLevelCategoryId)
        : null,
      secondLevelCategoryId: secondLevelCategoryId
        ? Number(secondLevelCategoryId)
        : null,
      thirdLevelCategoryId: thirdLevelCategoryId
        ? Number(thirdLevelCategoryId)
        : null,
      priorityId: formState?.priorityId ? Number(formState?.priorityId) : null,
      facilityId: facilityId ? Number(facilityId) : null,
      teamId: teamId ? Number(teamId) : null,
      reportedBy: baseData?.createdBy,
      dateReported: baseData?.dateCreated,
      images: images,
      // images: prevData?.screenshots ? prevData?.screenshots : images,

      fundingAgencyList: fundingAgency,
      implementingList: implementingPartner,
      teamLeadDateModified: null,
      agentId: user?.roleId === 2 ? user?.oid : null,
      agentDateModified: editBase?.dateModified,
      supervisedId: user?.roleId === 3 ? user?.oid : null,
      supervisedDateModified: editBase?.dateModified,
      expertId: user?.roleId === 4 && !user?.isTeamLead ? user?.oid : null,
      expertDateModified:
        user?.roleId === 4 && !user?.isTeamLead ? editBase?.dateModified : null,
      adminId: user?.roleId === 5 ? user?.oid : null,
      adminDateModified: editBase?.dateModified,
    };

    if (prevData?.isReassigned) {
      submitEditData.reassignedTo = formState?.assignedTo
        ? Number(formState?.assignedTo)
        : null;
      // submitEditData.isReassigned = true;
    }

    if (user?.isTeamLead) {
      submitEditData.teamLeadId = user?.oid;
      submitEditData.teamLeadDateModified = editBase?.dateModified;
    }

    modalData
      ? prevData?.isReassigned
        ? updateIncidentReassign({
            key: Number(prevData?.oid),
            body: submitEditData,
          })
        : updateIncident({ key: Number(prevData?.oid), body: submitEditData })
      : createIncident(submitData);
  };

  // handle create side Effects
  useCreateSideEffects({
    error: createError,
    isError: isCreateError,
    isSuccess: isCreateSuccess,
    status: createStatus,
    message: "ticket",
    messageType: "create",
    response: incidentCreateRes,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  // handle create side Effects
  useCreateSideEffects({
    error: prevData?.isReassigned ? updateErrorReassign : updateError,
    isError: prevData?.isReassigned ? isUpdateErrorReassign : isUpdateError,
    isSuccess: prevData?.isReassigned
      ? isUpdateSuccessReassign
      : isUpdateSuccess,
    status: prevData?.isReassigned ? updateStatusReassign : updateStatus,
    message: "ticket",
    messageType: "update",
    response: prevData?.isReassigned
      ? incidentUpdateReassign
      : incidentUpdateRes,
    initialState,
    isToggle: true,
    setFormState,
    toggler,
  });

  console.log({ images, iiiii: prevData?.screenshots });

  React.useEffect(() => {
    if (prevData) {
      setFormState({
        ...prevData,
        systemId: String(prevData?.systemId),
        assignedTo: prevData?.assignedTo
          ? prevData?.assignedTo
          : String(prevData?.assignedTo),
        teamId: String(prevData?.teamId),
        teamLeadId: String(prevData?.teamLeadId),
        priorityId: String(prevData?.priorityId),
      });
      setProvinceId(String(prevData?.provinceId));
      setDistrictId(prevData?.districtId);
      setFacilityId(prevData?.facilityId);
      setFirstLevelCategoryId(prevData?.firstLevelCategoryId);
      setSecondLevelCategoryId(prevData?.secondLevelCategoryId);
      setThirdLevelCategoryId(prevData?.thirdLevelCategoryId);
      setTeamId(prevData?.teamId);
      setImageBase64(prevData?.screenshots);
      setImages(prevData?.screenshots);
      setFundingAgency(prevData?.fundingAgencyId);
      setImplementingPartner(prevData?.implementingPartnerId);
      setPrevFacilityId(prevData?.facilityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevData]);

  return {
    handleSubmit,
    formState,
    setFormState,
    handleFormChange,
    inputError,
    handleDateChange,
    provinceId,
    handleProvinceChange,
    districtId,
    handleDistrictChange,
    facilityId,
    handleFacilityChange,
    firstLevelCategoryId,
    handleFirstCategoryChange,
    secondLevelCategoryId,
    handleSecondCategoryChange,
    thirdLevelCategoryId,
    handleThirdCategoryChange,
    teamId,
    handleTeamChange,
    setIsValidImg,
    imgRef,
    isValidImg,
    prevData,
    handleRemove,
    handleImageChange,
    image,
    imageBase64,
    user,
    isReadOnly,
    fundingAgency,
    setFundingAgency,
    implementingPartner,
    setImplementingPartner,
    isExpertMember,
    images,
    setImages,
    modalData,
    incidentCreateLoading,
    setFacilityId,
    setFacilities,
    facilities,
    prevFacilityId,
  };
};

export default useTicketForm;

export const TicketValidator = (
  roleId: number,
  prevData,
  formState: TypeTicketErrorForm
) => {
  const errors: TypeTicketErrorForm = {};

  // for all user those are required
  if (!formState?.ticketTitle) errors.ticketTitle = "Required";
  if (!formState?.dateOfIncident) errors.dateOfIncident = "Required";
  if (!formState?.systemId) errors.systemId = "Required";
  if (!formState?.provinceId) errors.provinceId = "Required";
  if (!formState?.districtId) errors.districtId = "Required";
  if (!formState?.facilityId) errors.facilityId = "Required";
  if (!formState?.description) errors.description = "Required";

  // not required for client
  if (roleId !== 1) {
    if (!formState?.priorityId) errors.priorityId = "Required";
    if (!formState?.firstLevelCategoryId)
      errors.firstLevelCategoryId = "Required";
    if (!formState?.secondLevelCategoryId)
      errors.secondLevelCategoryId = "Required";
    if (!formState?.thirdLevelCategoryId)
      errors.thirdLevelCategoryId = "Required";
  }
  if (!(roleId == 1 || roleId == 2)) {
    if (!formState?.teamId) errors.teamId = "Required";
  }

  if (!prevData && !(roleId == 1 || roleId == 4)) {
    if (!formState?.callerName) errors.callerName = "Required";
    if (!formState?.callerEmail) errors.callerEmail = "Required";

    // Custom email validation
    if (!formState?.callerEmail) {
      errors.callerEmail = "Required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState?.callerEmail)) {
        errors.callerEmail = "Invalid email address";
      }
    }

    if (!formState?.callerCountryCode) errors.callerCountryCode = "Required";
    if (!formState?.callerCellphone) errors.callerCellphone = "Required";
    if (!formState?.callerJobTitle) errors.callerJobTitle = "Required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
