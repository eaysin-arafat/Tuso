import Table from "@/components/core/table/Table";
import TableBody from "@/components/core/table/TableBody";
import TableHeader from "@/components/core/table/TableHeader";
import { DeviceLogData } from "@/constants/api-interface";
import { tableHeader } from "./table-data/table-header";

type Props = {
  deviceData: DeviceLogData[];
};

const DeviceIntermittenceTable = ({ deviceData }: Props) => {
  return (
    <div className="">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full mt-2 rounded-lg pb-2">
          {/* Table component */}
          <Table className="min-w-[3900px]">
            {/* Table header */}
            <TableHeader data={tableHeader()} />

            {/* Table body */}
            {/* Mapping through user list to render table rows */}
            {deviceData &&
              deviceData?.map((device, index) => {
                const downtimeArr = device?.offlineHours?.split(":");
                const uptimeArr = device?.onlineHours?.split(":");

                const tableRow = [
                  {
                    title: index + 1,
                    w: "150px",
                  },
                  {
                    title: device?.userName,
                    w: "300px",
                  },
                  {
                    title: device?.provinceName,
                    w: "300px",
                  },
                  {
                    title: device?.districtName,
                    w: "300px",
                  },
                  {
                    title: device?.facilityName,
                    w: "300px",
                  },
                  {
                    title: device?.userType,
                    w: "300px",
                  },
                  {
                    title: device?.deviceName,
                    w: "300px",
                  },
                  {
                    title: device?.platform,
                    w: "300px",
                  },
                  {
                    title: device?.processors,
                    w: "300px",
                  },

                  {
                    title: `${device?.usedStorage}GB`,
                    w: "500px",
                  },
                  {
                    title: device?.motherboardSerial,
                    w: "300px",
                  },
                  {
                    title: device?.publicIP,
                    w: "300px",
                  },
                  {
                    title: device?.privateIP,
                    w: "400px",
                  },
                  {
                    title: device?.macAddress,
                    w: "300px",
                  },
                  {
                    title: uptimeArr
                      ? `${uptimeArr[0]}hr ${uptimeArr[1]}min`
                      : "",
                    w: "300px",
                  },
                  {
                    title: downtimeArr
                      ? `${downtimeArr[0]}hr ${downtimeArr[1]}min`
                      : "",
                    w: "300px",
                  },
                ];
                return (
                  <TableBody
                    key={index}
                    index={index}
                    length={deviceData?.length || 0}
                    data={tableRow}
                  />
                );
              })}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DeviceIntermittenceTable;
