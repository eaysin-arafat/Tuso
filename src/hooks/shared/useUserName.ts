import { useReadUserAccountQuery } from "@/features/user-accounts/user-accounts-api";

const useUserName = () => {
  const { data: userData } = useReadUserAccountQuery(undefined, {});

  const getUserName = (userId: number) => {
    const userDetails = userData?.data?.list?.find(
      (item) => item?.oid == userId
    );
    return userDetails?.name + " " + userDetails?.surname;
  };

  return {
    getUserName,
  };
};

export default useUserName;
