import { Screenshot } from "@/constants/api-interface";
import { API } from "../API/API";

/**
 * @description Screenshot API
 */
export const screenshotApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description Create a screenshot
     * @URL /screenshot/:key
     * @method POST
     */
    createScreenshot: builder.mutation<Screenshot, string>({
      query: (key) => ({
        url: `screenshot/${key}`,
        method: "POST",
      }),
    }),

    /**
     * @description Create multiple screenshots
     * @URL /screenshot-multiple/:key
     * @method POST
     */
    createScreenshotMultiple: builder.mutation<Screenshot[], string>({
      query: (key) => ({
        url: `screenshot-multiple/${key}`,
        method: "POST",
      }),
    }),

    /**
     * @description Read screenshots
     * @URL /screenshots
     * @method GET
     */
    readScreenshots: builder.query<Screenshot[], void>({
      query: () => ({
        url: "screenshots",
        method: "GET",
      }),
    }),

    /**
     * @description Read screenshot by key
     * @URL /screenshot/key/:key
     * @method GET
     */
    readScreenshotByKey: builder.query<Screenshot, string>({
      query: (key) => ({
        url: `screenshot/key/${key}`,
        method: "GET",
      }),
    }),

    /**
     * @description Update a screenshot
     * @URL /screenshot/:key
     * @method PUT
     */
    updateScreenshot: builder.mutation<Screenshot, string>({
      query: (key) => ({
        url: `screenshot/${key}`,
        method: "PUT",
      }),
    }),

    /**
     * @description Delete a screenshot
     * @URL /screenshot/:key
     * @method DELETE
     */
    deleteScreenshot: builder.mutation<Screenshot, string>({
      query: (key) => ({
        url: `screenshot/${key}`,
        method: "DELETE",
      }),
    }),
  }),
});

// export api hooks
export const {
  useCreateScreenshotMutation,
  useCreateScreenshotMultipleMutation,
  useReadScreenshotsQuery,
  useReadScreenshotByKeyQuery,
  useUpdateScreenshotMutation,
  useDeleteScreenshotMutation,
} = screenshotApi;

// export api endpoints
export const { endpoints: screenshotApiEndpoints } = screenshotApi;

// export  api
export default screenshotApi;
