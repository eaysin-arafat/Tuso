import { RDPDeviceInfo } from "@/constants/api-interface";
import { Facility } from "@/constants/api-interface/Facility";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const rdpDeviceInfoApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description Create RDPDeviceInfo
     * @URI /rdp-device-info
     * @method POST
     */
    createRDPDeviceInfo: builder.mutation<RDPDeviceInfo, RDPDeviceInfo>({
      query: (rdpDeviceInfo) => ({
        url: "rdp-device-info",
        method: "POST",
        body: rdpDeviceInfo,
      }),
    }),

    /**
     * @description Read all RDPDeviceInfoes
     * @URI /rdp-device-infoes
     * @method GET
     */
    readRDPDeviceInfoes: builder.query<RootResponse<RDPDeviceInfo[]>, void>({
      query: () => ({
        url: "rdp-device-infoes",
        method: "GET",
      }),
    }),

    /**
     * @description Read RDPDeviceInfo list
     * @URI /rdp-device-info-list
     * @method GET
     */
    readRDPDeviceInfoList: builder.query<RDPDeviceInfo[], void>({
      query: () => ({
        url: "rdp-device-info-list",
        method: "GET",
      }),
    }),

    /**
     * @description Read RDPDeviceInfo by key
     * @URI /rdp-device-infoes/key/{key}
     * @method GET
     */
    readRDPDeviceInfoByKey: builder.query<RDPDeviceInfo, string>({
      query: (key) => ({
        url: `rdp-device-infoes/key/${key}`,
        method: "GET",
      }),
    }),

    /**
     * @description Read RDPDeviceInfo by name
     * @URI /rdp-device-info/key/{username}
     * @method GET
     */
    readRDPDeviceInfoByName: builder.query<RDPDeviceInfo, string>({
      query: (username) => ({
        url: `rdp-device-info/key/${username}`,
        method: "GET",
      }),
    }),

    /**
     * @description Update RDPDeviceInfo
     * @URI /rdp-device-info/{key}
     * @method PUT
     */
    updateRDPDeviceInfo: builder.mutation<
      RDPDeviceInfo,
      { key: string; body: RDPDeviceInfo }
    >({
      query: ({ key, body }) => ({
        url: `rdp-device-info/${key}`,
        method: "PUT",
        body,
      }),
    }),

    /**
     * @description Update RDPDeviceInfo by username
     * @URI /rdp-device-info-byusername/{username}
     * @method PUT
     */
    updateRDPDeviceInfoByUsername: builder.mutation<
      RDPDeviceInfo,
      { username: string; body: RDPDeviceInfo }
    >({
      query: ({ username, body }) => ({
        url: `rdp-device-info-byusername/${username}`,
        method: "PUT",
        body,
      }),
    }),

    /**
     * @description Delete RDPDeviceInfo
     * @URI /rdp-device-info/{key}
     * @method DELETE
     */
    deleteRDPDeviceInfo: builder.mutation<RDPDeviceInfo, string>({
      query: (key) => ({
        url: `rdp-device-info/${key}`,
        method: "DELETE",
      }),
    }),

    /**
     * @description Delete RDPDeviceInfo by username
     * @URI /rdp-device-info-byusername/{username}
     * @method DELETE
     */
    deleteRDPDeviceInfoByUsername: builder.mutation<RDPDeviceInfo, string>({
      query: (username) => ({
        url: `rdp-device-info-byusername/${username}`,
        method: "DELETE",
      }),
    }),

    /**
     * @description Get facilities by device id
     * @URI /rdp-deviceinfobydeviceid/{deviceId}
     * @method GET
     */
    getFacilitiesByDeviceId: builder.query<Facility[], string>({
      query: (deviceId) => ({
        url: `rdp-deviceinfobydeviceid/${deviceId}`,
        method: "GET",
      }),
    }),

    /**
     * @description Get facilities by device
     * @URI /rdp-deviceinfoesbydeviceid
     * @method GET
     */
    getFacilitiesByDevice: builder.query<Facility[], void>({
      query: () => ({
        url: "rdp-deviceinfoesbydeviceid",
        method: "GET",
      }),
    }),
  }),
});

// export api hooks
export const {
  useCreateRDPDeviceInfoMutation,
  useReadRDPDeviceInfoesQuery,
  useReadRDPDeviceInfoListQuery,
  useReadRDPDeviceInfoByKeyQuery,
  useReadRDPDeviceInfoByNameQuery,
  useUpdateRDPDeviceInfoMutation,
  useUpdateRDPDeviceInfoByUsernameMutation,
  useDeleteRDPDeviceInfoMutation,
  useDeleteRDPDeviceInfoByUsernameMutation,
  useGetFacilitiesByDeviceIdQuery,
  useGetFacilitiesByDeviceQuery,
} = rdpDeviceInfoApi;

// export api endpoints
export const rdpDeviceInfoApiEndpoints = rdpDeviceInfoApi.endpoints;

// export api
export default rdpDeviceInfoApi;
