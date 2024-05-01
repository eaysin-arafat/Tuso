/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import FormSkeleton from "@/components/core/loader/FormSkeleton";
import { useReadCountriesQuery } from "@/features/country/country-api";
import { useReadIncidentCategoriesQuery } from "@/features/incident-category/incident-category-api";
import { useReadIncidentPrioritiesQuery } from "@/features/incident-priority/incident-priority-api";
import { useReadProvincesQuery } from "@/features/province/province-api";
import { useReadSystemPermissionByUserQuery } from "@/features/system-permission/system-permission-api";
import { useReadSystemsQuery } from "@/features/systems/system-api";
import { useReadTeamsQuery } from "@/features/team/team-api";
import { styles } from "@/utilities/cn";
import { RxCross2 } from "react-icons/rx";
import AgentTicketForm from "./AgentTicketForm";
import CallerInformationForm from "./CallerInformationForm";
import ClientTicketForm from "./ClientTicketForm";
import ExpartTeamLeaderForm from "./ExpartTeamLeaderForm";
import MultipleFileInput from "./MultipleImageUpload";
import SupervisorTicketForm from "./SupervisorTicketForm";
import useTicketForm from "./useTicketForm";

interface TicketFormProps {
  toggler: () => void;
}
const TicketForm = ({ toggler }: TicketFormProps) => {
  const {
    handleSubmit,
    formState,
    handleFormChange,
    inputError,
    handleDateChange,
    provinceId,
    handleProvinceChange,
    districtId,
    handleDistrictChange,
    facilityId,
    // handleFacilityChange,
    firstLevelCategoryId,
    handleFirstCategoryChange,
    secondLevelCategoryId,
    handleSecondCategoryChange,
    thirdLevelCategoryId,
    handleThirdCategoryChange,
    teamId,
    handleTeamChange,
    prevData,
    handleRemove,
    setFormState,
    user,
    // isReadOnly,
    modalData,
    fundingAgency,
    setFundingAgency,
    implementingPartner,
    setImplementingPartner,
    images,
    setImages,
    incidentCreateLoading,
    setFacilityId,
    facilities,
    setFacilities,
    prevFacilityId,
  } = useTicketForm();

  const { data: teamsData, status: teamStatus } = useReadTeamsQuery();
  const { data: firstCategoriesOptions, status: firstCategoryStatus } =
    useReadIncidentCategoriesQuery();
  const { data: provincesOptions, status: provinceStatus } =
    useReadProvincesQuery();
  const { data: systemsOptions, status: systemStatus } = useReadSystemsQuery();
  const { data: clientSystemsOptions, status: clientSystemStatus } =
    useReadSystemPermissionByUserQuery(user?.oid, { skip: !user?.oid });
  const { data: countriesOption, status: countriesStatus } =
    useReadCountriesQuery();
  const { data: prioritiesOptions, status: prioritiesStatus } =
    useReadIncidentPrioritiesQuery();

  console.log({ prevData });

  const isOpenLoading =
    teamStatus === "pending" ||
    firstCategoryStatus === "pending" ||
    provinceStatus === "pending" ||
    countriesStatus === "pending" ||
    systemStatus === "pending" ||
    clientSystemStatus === "pending" ||
    prioritiesStatus === "pending";

  const handleConvert = (index) => {
    const modal = document.getElementById(
      `my_modal_4${index}`
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  // const isTeamMember = user?.roleId === 4 || !user?.isTeamLead;
  const isReadOnly =
    modalData?.status === "Close" ||
    (user?.roleId === 4 && user?.isTeamLead === false);

  const isAgentEditHide = user?.roleId === 2 && prevData?.thirdLevelCategoryId;
  const isSupervisorEditHide = user?.roleId === 3 && prevData?.teamId;

  // const handleConvert = (index) => {
  //   const modal = document.getElementById(`my_modal_${index}`);
  //   if (modal) {
  //     modal.showModal(); // Show the corresponding modal
  //   }
  // };

  return isOpenLoading ? (
    <FormSkeleton />
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ClientTicketForm
          districtId={districtId}
          facilityId={facilityId}
          formState={formState}
          handleDateChange={handleDateChange}
          handleDistrictChange={handleDistrictChange}
          // handleFacilityChange={handleFacilityChange}
          handleFormChange={handleFormChange}
          handleProvinceChange={handleProvinceChange}
          inputError={inputError}
          prevData={prevData}
          provinceId={provinceId}
          isReadOnly={isReadOnly}
          fundingAgency={fundingAgency}
          setFundingAgency={setFundingAgency}
          implementingPartner={implementingPartner}
          setImplementingPartner={setImplementingPartner}
          user={user}
          systemsOptions={systemsOptions?.data}
          clientSystemsOptions={clientSystemsOptions?.data}
          provincesOptions={provincesOptions?.data}
          setFacilityId={setFacilityId}
          setFacilities={setFacilities}
          facilities={facilities}
          prevFacilityId={prevFacilityId}
        />

        {user?.roleId !== 1 && (
          <AgentTicketForm
            firstLevelCategoryId={firstLevelCategoryId}
            formState={formState}
            handleFirstCategoryChange={handleFirstCategoryChange}
            handleFormChange={handleFormChange}
            handleSecondCategoryChange={handleSecondCategoryChange}
            handleThirdCategoryChange={handleThirdCategoryChange}
            inputError={inputError}
            secondLevelCategoryId={secondLevelCategoryId}
            thirdLevelCategoryId={thirdLevelCategoryId}
            isReadOnly={isReadOnly}
            firstCategoriesOptions={firstCategoriesOptions?.data}
            prioritiesOptions={prioritiesOptions?.data}
            role={user?.roleId}
          />
        )}

        {!(user?.roleId === 1 || user?.roleId === 2) && (
          <div>
            <SupervisorTicketForm
              handleTeamChange={handleTeamChange}
              inputError={inputError}
              teamId={teamId}
              isReadOnly={isReadOnly}
              user={user}
              prevData={prevData}
              teamsData={teamsData?.data}
            />
          </div>
        )}

        {((user?.roleId === 4 && user?.isTeamLead) || user?.roleId === 5) && (
          <ExpartTeamLeaderForm
            formState={formState}
            handleFormChange={handleFormChange}
            inputError={inputError}
            teamId={teamId}
            isReadOnly={isReadOnly}
            prevData={prevData}
          />
        )}

        {!(user?.roleId === 1 || user?.roleId === 4) && (
          <>
            <CallerInformationForm
              formState={formState}
              handleFormChange={handleFormChange}
              inputError={inputError}
              setFormState={setFormState}
              isReadOnly={isReadOnly}
              userRole={user?.roleId}
              isEdit={prevData}
              countrieOption={countriesOption?.data}
            />
          </>
        )}

        {(prevData?.screenshots?.length < 1 || !prevData) && (
          <div className="col-span-full">
            <MultipleFileInput
              onRemove={handleRemove}
              isImage={images}
              onChange={(base64Images) => setImages(base64Images)}
              className="mb-5 w-fit"
            />
          </div>
        )}

        {prevData?.screenshots?.length > 0 && (
          <div className="flex col-span-full gap-4">
            {prevData?.screenshots?.map((image, index) => (
              <div key={index} className=" flex">
                <button
                  type="button"
                  className="text-sm text-primaryColor cursor-pointer underline mb-3 "
                  onClick={() => handleConvert(index)} // Pass index to identify the correct image
                >
                  Attachment {index + 1}
                </button>

                <dialog id={`my_modal_4${index}`} className="modal">
                  {/* Use index to generate unique IDs */}
                  <div className="modal-box w-full max-w-5xl h-[90%] p-0">
                    <form method="dialog">
                      <button className="float-end p-2 bg-borderColor">
                        <RxCross2 />
                      </button>
                    </form>
                    <img
                      src={`data:image/png;base64,${image}`}
                      alt=""
                      className="h-full"
                    />
                  </div>
                </dialog>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles({ "mt-5": isReadOnly })}>
        <SaveAndBackButtons
          isLoading={incidentCreateLoading}
          toggler={toggler}
          className={styles("", {
            "cursor-not-allowed": incidentCreateLoading,
          })}
          disableSubmit={
            (isSupervisorEditHide && true) ||
            (isAgentEditHide && true) ||
            isReadOnly
          }
        />
      </div>
    </form>
  );
};

export default TicketForm;
