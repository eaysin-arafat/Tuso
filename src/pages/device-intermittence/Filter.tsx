import DateInput from "@/components/core/form-elements/DatePicker";
import ExportBtn from "@/components/core/form-elements/ExportBtn";
import Input from "@/components/core/form-elements/Input";
import { datePickerToString } from "@/utilities/date";
import { downloadCSV } from "@/utilities/download-csv";
import { downloadXLSX } from "@/utilities/download-xlsx";
import { useState } from "react";
import { VscRefresh } from "react-icons/vsc";

const DeviceIntermittenceFilter = ({
  setUserName,
  userName,
  setDeviceFilters,
  refetch,
  data,
}) => {
  const now = new Date();
  const initialState = {
    fromDate:
      new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString() || null,
    toDate: now?.toISOString() || null,
  };
  const [date, setDate] = useState(initialState);

  // CSV download handler
  const csvDownloadHandler = () => {
    downloadCSV(data, "Device Intermittence");
  };

  // XLSX download handler
  const xlsxDownloadHandler = () => {
    downloadXLSX(data, "Device Intermittence");
  };

  // Filter Handler
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (setDeviceFilters) {
      setDeviceFilters((prev) => ({
        ...prev,
        userName: userName,
        fromDate: date?.fromDate,
        toDate: date?.toDate,
      }));
    }
  };

  // Refresh handler
  const handleRefresh = () => {
    setDeviceFilters({});
    setDate({ fromDate: null, toDate: null });
    setUserName("");

    if (refetch) {
      refetch();
    }
  };

  // Date change handler
  const handleDateChange = (date: Date, name: string) => {
    const value = datePickerToString(date);
    setDate((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        className={`grid grid-cols-3 md:flex justify-start items-center gap-2`}
      >
        {/* User Name  */}
        <Input
          placeholder="User Name"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {/* From Date */}
        <DateInput
          placeholderText="From Date"
          selected={date?.fromDate ? new Date(date?.fromDate) : null}
          onChange={(date) => {
            handleDateChange(date, "fromDate");
          }}
        />

        {/* To Date */}
        <DateInput
          placeholderText="To Date"
          selected={date?.toDate ? new Date(date?.toDate) : null}
          onChange={(date) => {
            handleDateChange(date, "toDate");
          }}
        />

        {/* Refresh Button  */}
        <button className="main_btn py-2.5" onClick={handleRefresh}>
          <VscRefresh size={18} />
        </button>

        {/* Export Button  */}
        <ExportBtn
          className="py-2.5"
          disabled={data?.length == undefined || data?.length === 0}
          csvDownloadHandler={csvDownloadHandler}
          xlsxDownloadHandler={xlsxDownloadHandler}
        />

        {/* Search Button  */}
        <button type="submit" className="main_btn py-[9px]">
          Search
        </button>
      </div>
    </form>
  );
};

export default DeviceIntermittenceFilter;
