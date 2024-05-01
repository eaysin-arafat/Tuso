/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import SaveAndBackButtons from "../../core/buttons/SaveAndBackButtons";
import Input from "../../core/form-elements/Input";
import useEditCountry from "./useEditCountry";

// country edit form props
type Props = {
  toggler: () => void;
};

// country edit form component
const CountryEditForm = ({ toggler }: Props) => {
  const { formState, handleFormChange, handleSubmit, inputError } =
    useEditCountry();
  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {/* COUNTRY NAME */}
          <Input
            label="Country Name"
            required
            onChange={handleFormChange}
            name="countryName"
            value={formState?.countryName}
            errMsg={inputError?.countryName}
          />

          {/* ISO CODE ALPHA2 */}
          <Input
            label="ISO Code Alpha2"
            required
            onChange={handleFormChange}
            name="isoCodeAlpha2"
            value={formState?.isoCodeAlpha2}
            errMsg={inputError?.isoCodeAlpha2}
          />

          {/* COUNTRY CODE */}
          <Input
            label="Country Code"
            required
            onChange={handleFormChange}
            name="countryCode"
            value={formState?.countryCode}
            errMsg={inputError?.countryCode}
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default CountryEditForm;
