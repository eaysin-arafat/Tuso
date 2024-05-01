/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import CountryCode from "@/components/core/form-elements/CountryCode";
import Input from "@/components/core/form-elements/Input";
import PhoneNumber from "@/components/core/form-elements/PhoneNumber";

const CallerInformationForm = ({
  formState,
  handleFormChange,
  inputError,
  setFormState,
  isReadOnly,
  userRole,
  isEdit,
  countrieOption,
}) => {
  return (
    <>
      <h3 className="mb-[-9px] col-span-full">Caller Information</h3>
      <div className="col-span-full grid md:grid-cols-2 gap-3">
        <Input
          label="Caller Name"
          name="callerName"
          value={formState?.callerName}
          onChange={handleFormChange}
          errMsg={inputError?.callerName}
          disabled={isReadOnly}
          required={!(userRole == 1 || userRole == 4) && !isEdit}
        />
        <Input
          label="Caller Email"
          type="text"
          name="callerEmail"
          value={formState?.callerEmail}
          onChange={handleFormChange}
          errMsg={inputError?.callerEmail}
          disabled={isReadOnly}
          required={!(userRole == 1 || userRole == 4) && !isEdit}
        />
      </div>
      <div className="col-span-full grid md:grid-cols-2 gap-3">
        <CountryCode
          name="callerCountryCode"
          value={formState?.callerCountryCode}
          onChange={(event) => {
            handleFormChange(event);
          }}
          resetCellPhone={() =>
            setFormState((prev) => ({ ...prev, callerCellphone: "" }))
          }
          label="Country Code"
          errMsg={inputError?.callerCountryCode}
          disabled={isReadOnly}
          countries={countrieOption}
          required={!(userRole == 1 || userRole == 4) && !isEdit}
        />
        <PhoneNumber
          label="Caller Number"
          countryCode={formState?.callerCountryCode}
          // TicketCode="+260"
          name="callerCellphone"
          value={formState?.callerCellphone}
          onChange={handleFormChange}
          errMsg={inputError?.callerCellphone}
          disabled={isReadOnly}
          required={!(userRole == 1 || userRole == 4) && !isEdit}
        />
      </div>

      <div className="col-span-full">
        <Input
          label="Caller job Title"
          name="callerJobTitle"
          value={formState?.callerJobTitle}
          onChange={handleFormChange}
          errMsg={inputError?.callerJobTitle}
          disabled={isReadOnly}
          required={!(userRole == 1 || userRole == 4) && !isEdit}
        />
      </div>
    </>
  );
};

export default CallerInformationForm;
