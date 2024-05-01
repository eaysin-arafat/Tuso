/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootResponse } from "@/constants/api-interface/root";
import { OnchangeEventType } from "@/constants/interface/htmlEvents";
import Select from "./Select";

// Country interface
type Props = {
  value?: string | number;
  onChange?: (e: any) => void;
  name?: string;
  label: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  resetCellPhone: () => void;
  isReadOnly?: boolean;
  countries: any;
};

// Country component
function CountryCode({
  value,
  onChange,
  name,
  label,
  required,
  errMsg,
  disabled,
  className,
  placeholder,
  resetCellPhone,
  isReadOnly = false,
  countries,
}: Props) {
  // filter handler
  const handleFilter = (e: OnchangeEventType) => {
    onChange(e);
    const { value } = e.target;
    const ZMCountryCode = "+260";
    if (value == ZMCountryCode) {
      if (!/^0?\d{0,9}$/.test(value) && resetCellPhone) {
        resetCellPhone();
      }
    }
  };

  return (
    <Select
      disabled={disabled}
      className={className}
      errMsg={errMsg}
      name={name}
      label={label || "Code"}
      value={value}
      onChange={handleFilter}
      placeholder={placeholder}
      required={required}
      selectShow="Country"
      isReadOnly={isReadOnly}
    >
      {renderCodeOptions(countries)}
    </Select>
  );
}

// render country code options
const renderCodeOptions = (countries: RootResponse<Country[]>) => {
  return Array?.isArray(countries) ? (
    countries?.map((countryCode) => {
      return (
        <option key={countryCode?.oid} value={countryCode?.countryCode}>
          {countryCode?.isoCodeAlpha2} ({countryCode?.countryCode})
        </option>
      );
    })
  ) : (
    <></>
  );
};

export default CountryCode;
