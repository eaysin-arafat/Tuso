/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Select from "../core/form-elements/Select";

// role form props type
type Props = {
  toggler: () => void;
};

// Role create form component
const RoleCreateForm = ({ toggler }: Props) => {
  return (
    <div>
      {/* FORM */}
      <form>
        {/* MODULE */}
        <div className="grid gap-4">
          <Select label="Module" />
        </div>

        {/* SAVE AND BACK BUTTON */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default RoleCreateForm;
