import { IncidentCategory, Pagination } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const incidentCategoryApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create incident category
     * @URI /incident-category
     * @Method POST
     */
    createIncidentCategory: builder.mutation({
      query: (body) => ({
        url: "/incident-category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    /**
     * @Description read incident categories
     * @URI /incident-categories
     * @Method GET
     */
    readIncidentCategories: builder.query<
      RootResponse<IncidentCategory[]>,
      void
    >({
      query: () => ({ url: "/incident-categories", method: "GET" }),
      providesTags: ["Category"],
    }),

    /**
     * @Description read incident category by key parent
     * @URI /incident-category/parent/key/{key}
     * @Method GET
     */
    readIncidentCategoryByKeyParent: builder.query<IncidentCategory[], string>({
      query: (key) => `/incident-category/parent/key/${key}`,
    }),

    /**
     * @Description read incident category by single key
     * @URI /incident-category-single/key/{key}
     * @Method GET
     */
    readIncidentCategoryBySingleKey: builder.query<IncidentCategory[], string>({
      query: (key) => `/incident-category-single/key/${key}`,
    }),

    /**
     * @Description read incident category page by first level
     * @URI /incident-category/pagination-firstlevel
     * @Method GET
     */
    readIncidentCategoryPageByFirstLevel: builder.query<
      RootResponse<{
        incidentCategories: IncidentCategory[];
        currentPage: number;
        totalRows: number;
      }>,
      Pagination
    >({
      query: (paginationRequest) => ({
        url: "/incident-category/pagination-firstlevel",
        method: "GET",
        params: paginationRequest,
      }),
      providesTags: ["Category"],
    }),

    /**
     * @Description read incident category page by level
     * @URI /incident-category/pagination-level/key/{key}
     * @Method GET
     */
    readIncidentCategoryPageByLevel: builder.query<
      RootResponse<{
        incidentCategories: IncidentCategory[];
        currentPage: number;
        totalRows: number;
      }>,
      Pagination
    >({
      query: ({ key, start = 1, take = 10 }) =>
        `/incident-category/pagination-level/key/${key}?start=${start}&take=${take}`,
      providesTags: ["Category"],
    }),

    /**
     * @Description update incident category
     * @URI /incident-category/{key}
     * @Method PUT
     */
    updateIncidentCategory: builder.mutation<
      RootResponse<IncidentCategory>,
      { key: number; body: IncidentCategory }
    >({
      query: ({ key, body }) => ({
        url: `/incident-category/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    /**
     * @Description delete incident category
     * @URI /incident-category/{key}
     * @Method DELETE
     */
    deleteIncidentCategory: builder.mutation({
      query: (key) => ({
        url: `/incident-category/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

// export api hooks
export const {
  useCreateIncidentCategoryMutation,
  useReadIncidentCategoriesQuery,
  useReadIncidentCategoryByKeyParentQuery,
  useReadIncidentCategoryBySingleKeyQuery,
  useReadIncidentCategoryPageByFirstLevelQuery,
  useReadIncidentCategoryPageByLevelQuery,
  useUpdateIncidentCategoryMutation,
  useDeleteIncidentCategoryMutation,
} = incidentCategoryApi;

// export api endpoints
export const { endpoints: incidentCategoryApiEndpoints } = incidentCategoryApi;

// export api
export default incidentCategoryApi;
