import {
  AdvanceSearchPagination,
  ConnectResponse,
  Device,
  DeviceLog,
  RDPDevice,
  RdpLoginInfo,
  User,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const rdpApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description Read all devices type
     * @URI /rdp-devices
     * @method GET
     */
    readRDPDevices: builder.query<RootResponse<RDPDevice[]>, void>({
      query: () => ({
        url: "rdp-devices",
        method: "GET",
      }),
      providesTags: ["RdpDevices"],
    }),

    /**
     * @description Read device by key
     * @URI /rdp-device/key/{key}
     * @method GET
     */
    readDeviceByKey: builder.query<ConnectResponse, string>({
      query: (key) => ({
        url: `rdp-device/key/${key}`,
        method: "GET",
      }),
    }),

    /**
     * @description Get device activity
     * @URI /rdp-device/devices-log
     * @method GET
     */
    getDeviceActivity: builder.query<DeviceLog, AdvanceSearchPagination>({
      query: ({ fromDate, toDate, userName }) => ({
        url: `rdp-device/devices-log?fromDate=${fromDate}&toDate=${toDate}&userName=${userName}`,
        method: "GET",
      }),
    }),

    /**
     * @description Read device user by key
     * @URI /rdp-device/user/key/{key}
     * @method GET
     */
    readDeviceUserByKey: builder.query<User, string>({
      query: (key) => ({
        url: `rdp-device/user/key/${key}`,
        method: "GET",
      }),
    }),

    /**
     * @description Uninstall device by key
     * @URI /rdp-uninstall-device/key/{key}
     * @method DELETE
     */
    uninstallDeviceByKey: builder.mutation<RootResponse<Device>, string>({
      query: (deviceId) => ({
        url: `rdp-uninstall-device/key/${deviceId}`,
        method: "POST",
      }),
      invalidatesTags: ["RdpDevices"],
    }),

    /**
     * @description Rdp login
     * @URI /rdpserver/login
     * @method POST
     */
    rdpLogin: builder.mutation<RdpLoginInfo, string>({
      query: (data) => ({
        url: "rdpserver/login",
        method: "POST",
        body: data,
      }),
    }),

    /**
     * @description Read remote login concent
     * @URI /remote-login-concents
     * @method GET
     */
    readRemoteLoginConcent: builder.query<RdpLoginInfo[], void>({
      query: () => ({
        url: "remote-login-concents",
        method: "GET",
      }),
    }),

    /**
     * @description Read remote login concent by key
     * @URI /remote-login-concent/key/{key}
     * @method GET
     */
    readRemoteLoginConcentByKey: builder.query<RdpLoginInfo, string>({
      query: (key) => ({
        url: `remote-login-concent/key/${key}`,
        method: "GET",
      }),
    }),

    /**
     * @description Create remote login concent
     * @URI /remote-login-concent
     * @method POST
     */
    createRemoteLoginConcent: builder.mutation<RdpLoginInfo, RdpLoginInfo>({
      query: (data) => ({
        url: "remote-login-concent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// export api hooks
export const {
  useReadRDPDevicesQuery,
  useReadDeviceByKeyQuery,
  useGetDeviceActivityQuery,
  useReadDeviceUserByKeyQuery,
  useUninstallDeviceByKeyMutation,
  useRdpLoginMutation,
  useReadRemoteLoginConcentQuery,
  useReadRemoteLoginConcentByKeyQuery,
  useCreateRemoteLoginConcentMutation,
} = rdpApi;

// export api endpoints
export const { endpoints: rdpApiEndpoints } = rdpApi;

// export  api
export default rdpApi;
