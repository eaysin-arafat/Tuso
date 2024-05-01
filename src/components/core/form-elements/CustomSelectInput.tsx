/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { UserCreateErrorType } from "@/constants/form-interface/user-account";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";

// options props
type OptionProps = {
  oid: number;
  title: string;
};

// custom select input props
type Props = {
  options: OptionProps[];
  selectedOptions: number[]; // Change the type to array of numbers
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>; // Change the type to set array of numbers
  required?: boolean;
  disabled?: boolean;
  label?: string;
  errMsg?: string;
  setInputError?: React.Dispatch<React.SetStateAction<UserCreateErrorType>>;
};

// custom select input component
const CustomSelectInput = ({
  options,
  selectedOptions = [],
  setSelectedOptions,
  required,
  label = "Systems",
  disabled = false,
  errMsg,
  setInputError,
}: Props) => {
  // Open state
  const [isOpen, setIsOpen] = useState(false);

  // Search term state
  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown reference
  const dropdownRef = useRef(null);

  // Search input reference
  const searchInputRef = useRef(null);

  // handle side effects
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        searchInputRef.current.focus();
      }
    }
  };

  // Handle clicking on an option
  const handleOptionClick = (item: OptionProps) => {
    const optionId = item?.oid;
    if (!selectedOptions?.includes(optionId)) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions?.filter((id) => id !== optionId));
    }
    setSearchTerm("");
    setInputError((prev) => ({ ...prev, systems: "" }));
  };

  // Handle removing an option
  const handleRemoveOption = (optionId: number) => {
    setSelectedOptions(selectedOptions?.filter((id) => id !== optionId));
  };

  // filtered options
  const filteredOptions = options?.filter((option) =>
    option?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="flex flex-col !bg-whiteColor">
      {/* LABEL WITH REQUIRED STAR */}
      <div className="flex">
        <div className="input_label text-textColor text-xs 2xl:lg:mb-[5px] ml-[1px]">
          {label && label}
        </div>
        {required && <span className="input_required">*</span>}
      </div>

      {/* DROPD */}
      <div
        ref={dropdownRef}
        onClick={toggleDropdown}
        className={`relative min-h-[36px] lg:min-h-[38px] 2xl:min-h-[45px] w-full text-left border-[1px] !border-borderColor rounded-md cursor-pointer  ${
          isOpen ? "rounded-b-none" : "rounded-md"
        } ${disabled && "bg-disabledColor"}`}
      >
        {/* Display selected options and input */}
        <div className="flex flex-wrap items-center gap-1 p-1 h-full bg-whiteBgColor">
          {options
            ?.filter((option) => selectedOptions?.includes(option?.oid))
            ?.map((option, index) => (
              <div
                key={index}
                className={`bg-bgColor text-textColor rounded-sm flex justify-start items-center gap-1 text-xs border border-borderColor pr-1 py-1 ${
                  disabled && "bg-gray-100"
                }`}
              >
                <div
                  className={`border-r border-borderColor min-h-full flex items-center justify-center text-textColor px-1 cursor-pointer text-center  ${
                    disabled && "cursor-auto"
                  }`}
                >
                  {!disabled && (
                    <FaTimes
                      size={9}
                      className="text-textColor"
                      onClick={() => handleRemoveOption(option?.oid)}
                    />
                  )}
                </div>
                <p className="text-center flex items-center justify-center text-textColor">
                  {option?.title}
                </p>
              </div>
            ))}

          {/* Search input */}
          <input
            ref={searchInputRef}
            type="text"
            disabled={disabled}
            onClick={toggleDropdown}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-auto cursor-text !text-[14px] text-secondaryColor bg-transparent border-none outline-none py-0 px-0 ring-0 ml-2 mt-1 disabled:!bg-transparent"
          />
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <div className="absolute w-full max-h-60 overflow-y-auto rounded-b-md border-[1px] border-solid border-borderColor shadow-lg bg-bgColor ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            {filteredOptions?.length === 0 ? (
              <div className="p-2 text-gray-500 text-xs 2xl:text-sm">
                No results found
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 bg-bgColor">
                <div className="space-y-0.5 py-0.5">
                  {filteredOptions?.map((item, index) => {
                    const isSelected = selectedOptions?.includes(item?.oid);

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          handleOptionClick(item);
                        }}
                        className={`p-2 flex justify-between items-center border-t border-borderColor py-1 px-2 rounded-sm text-xs hover:bg-violetColor text-textColor hover:text-whiteColor cursor-pointer ${
                          isSelected ? "bg-violetColor text-whiteColor" : ""
                        } ${index === 0 && "border-none"}`}
                      >
                        {item?.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {errMsg && <span className="input_error">Required!</span>}
    </div>
  );
};

export default CustomSelectInput;
