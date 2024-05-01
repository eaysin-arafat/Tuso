import { Pagination } from "@/constants/api-interface";
import { ModuleData } from "@/constants/api-interface/modules";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const modulesApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create module
     * @URI /module-option
     * @Method POST
     */
    createModule: builder.mutation({
      query: (body) => ({
        url: "/module-option",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Modules"],
    }),

    /**
     * @Description read modules
     * @URI /module-options
     * @Method GET
     */
    readModules: builder.query<RootResponse<ModuleData[]>, void>({
      query: () => "/module-options",
      providesTags: ["Modules"],
    }),

    /**
     * @Description read modules by page
     * @URI /modules-option/pagination
     * @Method GET
     */
    readModulesByPage: builder.query<ModuleData, Pagination>({
      query: (paginationRequest) => ({
        url: "/modules-option/pagination",
        method: "GET",
        params: paginationRequest,
      }),
    }),

    /**
     * @Description read module by key
     * @URI /module-option/key/{key}
     * @Method GET
     */
    readModuleByKey: builder.query<ModuleData, string>({
      query: (key) => `/module-option/key/${key}`,
    }),

    /**
     * @Description update module
     * @URI /module-option/{key}
     * @Method PUT
     */
    updateModule: builder.mutation<
      ModuleData,
      { key: number; body: ModuleData }
    >({
      query: ({ key, body }) => ({
        url: `/module-option/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Modules"],
    }),

    /**
     * @Description delete module
     * @URI /module-option/{key}
     * @Method DELETE
     */
    deleteModule: builder.mutation<ModuleData, string>({
      query: (key) => ({
        url: `/module-option/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Modules"],
    }),
  }),
});

// export api hooks
export const {
  useCreateModuleMutation,
  useReadModulesQuery,
  useReadModulesByPageQuery,
  useReadModuleByKeyQuery,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = modulesApi;

// export api endpoints
export const { endpoints: modulesApiEndpoints } = modulesApi;

// export api
export default modulesApi;
