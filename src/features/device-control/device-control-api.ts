import {
  Device,
  DeviceControl,
  DeviceControlTypes,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const deviceControlApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description update device control
     * @URI /device-control/{key}
     * @Method PUT
     */
    updateDeviceControl: builder.mutation<
      RootResponse<DeviceControl>,
      { body: Device; key: number }
    >({
      query: ({ body, key }) => ({
        url: `/device-control/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["DeviceControls"],
    }),

    /**
     * @Description read device controls
     * @URI /device-controls
     * @Method GET
     */
    readDeviceControls: builder.query<DeviceControlTypes, void>({
      query: () => "/device-controls",
      providesTags: ["DeviceControls"],
    }),
  }),
});

// export api hooks
export const { useUpdateDeviceControlMutation, useReadDeviceControlsQuery } =
  deviceControlApi;

// export api endpoints
export const { endpoints: deviceControlApiEndpoints } = deviceControlApi;

// export api
export default deviceControlApi;
