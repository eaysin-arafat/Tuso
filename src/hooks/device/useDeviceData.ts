import { RDPDevice, RDPDeviceInfo } from "@/constants/api-interface";
import { useReadRDPDeviceInfoesQuery } from "@/features/rdp-device-info/rdp-device-info-api";
import { useReadRDPDevicesQuery } from "@/features/rdp/rdp-api";
import React from "react";

type DeviceData = RDPDeviceInfo & RDPDevice;

const useDeviceData = () => {
  const [deviceData, setDeviceData] = React.useState<DeviceData[]>([]);

  const { data: rdpDevices, status, refetch } = useReadRDPDevicesQuery();
  const { data: rdpUserInfo, status: rdpUserInfoStatus } =
    useReadRDPDeviceInfoesQuery();

  React.useEffect(() => {
    if (status === "fulfilled" && rdpUserInfoStatus === "fulfilled") {
      const data = rdpDevices?.data?.map((device) => {
        const userInfo = rdpUserInfo?.data?.find(
          (info) => info?.deviceId === device?.id
        );

        if (userInfo) return { ...device, ...userInfo };
        return null;
      });

      setDeviceData(data);
    }
  }, [rdpDevices, rdpUserInfo, status, rdpUserInfoStatus]);

  return { deviceData, refetch };
};

export default useDeviceData;
