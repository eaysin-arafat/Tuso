import { ProfilePicture } from "@/constants/api-interface";
import { API } from "../API/API";

export const profilePictureApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create profile picture
     * @URI /profile-picture
     * @Method POST
     */
    createProfilePicture: builder.mutation<ProfilePicture, ProfilePicture>({
      query: (body) => ({
        url: "/profile-picture",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description read profile pictures
     * @URI /profile-pictures
     * @Method GET
     */
    readProfilePictures: builder.query<ProfilePicture[], void>({
      query: () => "/profile-pictures",
    }),

    /**
     * @Description read profile picture by key
     * @URI /profile-picture/key/{key}
     * @Method GET
     */
    readProfilePictureByKey: builder.query<ProfilePicture, number>({
      query: (key) => `/profile-picture/key/${key}`,
      providesTags: ["ProfilePicture"]
    }),

    /**
     * @Description update profile picture
     * @URI /profile-picture/{key}
     * @Method PUT
     */
    updateProfilePicture: builder.mutation<
      ProfilePicture,
      { key: number; body: ProfilePicture }
    >({
      query: ({ key, body }) => ({
        url: `/profile-picture/${key}`,
        method: "PUT",
        body,
      }),
    }),

    /**
     * @Description delete profile picture
     * @URI /profile-picture/{key}
     * @Method DELETE
     */
    deleteProfilePicture: builder.mutation<ProfilePicture, string>({
      query: (key) => ({
        url: `/profile-picture/${key}`,
        method: "DELETE",
      }),
    }),
  }),
});

// export api hooks
export const {
  useCreateProfilePictureMutation,
  useReadProfilePicturesQuery,
  useReadProfilePictureByKeyQuery,
  useUpdateProfilePictureMutation,
  useDeleteProfilePictureMutation,
} = profilePictureApi;

// export api endpoints
export const { endpoints: profileApiEndpoints } = profilePictureApi;

// export api
export default profilePictureApi;
