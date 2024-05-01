/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Textarea from "../core/form-elements/Textarea";

// Module permission form props type
type Props = {
  toggler: () => void;
};

/**
 * @description Module permission form component
 */
const ModulePermissionForm = ({ toggler }: Props) => {
  return (
    // FORM
    <form>
      <div className="grid gap-4">
        {/* First Level category */}
        <Input label="First Level Category" required />

        {/* Description */}
        <Textarea label="Description" required />
      </div>

      {/* Save And Back button */}
      <div className="mt-6">
        <SaveAndBackButtons toggler={toggler} />
      </div>
    </form>
  );
};

export default ModulePermissionForm;
