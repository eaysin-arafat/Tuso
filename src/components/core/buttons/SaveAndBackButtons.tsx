/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import BackIcon from "@/assets/icons/Back";
import SaveIcon from "@/assets/icons/SaveIcon";

// Save and back button props
interface SaveAndBackButtonsProps {
  toggler?: () => void;
  submitHandler?: () => void;
  disableBoth?: boolean;
  backBtnText?: string;
  submitBtnText?: string;
  disableSubmit?: boolean;
  isLoading?: boolean;
  className?: string;
  saveIcon?: JSX.Element;
}

/**
 * @description Save and Back Button Component
 */
const SaveAndBackButtons = ({
  toggler = () => {},
  submitHandler = () => {},
  disableBoth,
  backBtnText,
  submitBtnText,
  disableSubmit,
  className,
  saveIcon = <SaveIcon />,
  isLoading = false,
}: SaveAndBackButtonsProps) => {
  return (
    // Save and Back Buttons
    <div
      className={`flex justify-start gap-4 ${className} ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
    >
      {/* SAVE BUTTON */}
      <button
        className={`main_btn ${
          (disableBoth || disableSubmit) &&
          "cursor-not-allowed disabled:bg-disabledColor disabled:!text-grayColor"
        } `}
        type="submit"
        disabled={disableBoth || disableSubmit || isLoading}
        onClick={submitHandler}
      >
        <span
          className={`flex items-center gap-4 ${
            disableSubmit ||
            (disableBoth ? "cursor-not-allowed text-grayColor" : "text-whiter")
          }`}
        >
          {saveIcon ? saveIcon : ""}
          {submitBtnText ? submitBtnText : isLoading ? "Loading..." : "Save"}
        </span>
      </button>

      {/* BACK BUTTON */}
      <button
        className="outline_btn hover:bg-violetTransparentColor px-4"
        type="button"
        onClick={toggler}
        disabled={disableBoth}
      >
        <BackIcon /> {backBtnText ? backBtnText : "Back"}
      </button>
    </div>
  );
};

export default SaveAndBackButtons;
