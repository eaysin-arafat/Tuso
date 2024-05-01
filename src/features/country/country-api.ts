import { Country, Pagination, TypeCountries } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

const countryApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create country
     * @URI /country
     * @Method POST
     */
    createCountry: builder.mutation({
      query: (body) => ({
        url: `/country`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Countries"],
    }),

    /**
     * @Description read countries
     * @URI /countries
     * @Method GET
     */
    readCountries: builder.query<RootResponse<Country[]>, void>({
      query: () => `/countries`,
      // keepUnusedDataFor: Infinity,
    }),

    /**
     * @Description read countries by page
     * @URI /countries-pagination
     * @Method GET
     */
    readCountriesByPage: builder.query<TypeCountries, Pagination>({
      query: ({ start = 1, take = 10 }) =>
        `/countries-pagination?start=${start}&take=${take}`,
      providesTags: ["Countries"],
    }),

    /**
     * @Description read country by key
     * @URI /country/key/{key}
     * @Method GET
     */
    readCountryByKey: builder.query<Country, string>({
      query: (key) => `/country/key/${key}`,
    }),

    /**
     * @Description update country
     * @URI /country/{key}
     * @Method PUT
     */
    updateCountry: builder.mutation({
      query: ({ key, body }) => ({
        url: `/country/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Countries"],
    }),

    /**
     * @Description delete country
     * @URI /country/{key}
     * @Method DELETE
     */
    deleteCountry: builder.mutation<RootResponse<Country>, string>({
      query: (key) => ({
        url: `/country/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Countries"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateCountryMutation,
  useDeleteCountryMutation,
  useReadCountriesByPageQuery,
  useReadCountriesQuery,
  useReadCountryByKeyQuery,
  useUpdateCountryMutation,
} = countryApi;

// export api endpoints
export const { endpoints: countryApiEndpoints } = countryApi;

// export api
export default countryApi;
