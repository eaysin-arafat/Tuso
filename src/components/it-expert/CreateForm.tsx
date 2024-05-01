/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { User } from "@/constants/api-interface";
import {
  TypeItExpertErrorForm,
  TypeItExpertForm,
} from "@/constants/form-interface/it-expert";
import { OnchangeEventType } from "@/constants/interface/htmlEvents";
import { useReadUsersByNameQuery } from "@/features/user-accounts/user-accounts-api";
import { URLUserList } from "@/routers/routes-link";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";

// IT expert create form props type
type ItExpertCreateFormProps = {
  toggler: () => void;
  formState: TypeItExpertForm;
  setFormState: React.Dispatch<React.SetStateAction<TypeItExpertForm>>;
  setInputError: React.Dispatch<
    React.SetStateAction<TypeItExpertErrorForm | null>
  >;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputError: TypeItExpertErrorForm | null;
};

/**
 * @description IT expert create form component
 */
const ItExpertCreateForm = ({
  toggler,
  formState,
  setFormState,
  setInputError,
  user,
  setUser,
  handleSubmit,
  inputError,
}: ItExpertCreateFormProps) => {
  // navigator hook
  const navigate = useNavigate();

  // form state
  const [itExperts, setItExperts] = useState([]);

  // search IT expert by name
  const { data: searchItExpert } = useReadUsersByNameQuery(
    formState?.expertName,
    { skip: !formState?.expertName, refetchOnMountOrArgChange: true }
  );

  // form input change handler
  const handleFormChange = (e: OnchangeEventType) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // IT expert change handler
  const handleItExpert = (expert) => {
    setFormState({
      expertId: expert?.oid,
      expertName: `${expert?.name} ${expert?.surname}`,
    });
    setItExperts([]);
    setUser(expert);
  };

  // handle side effects
  React.useEffect(() => {
    setItExperts(searchItExpert?.data);
    if (user) {
      setItExperts([]);
    }
    if (formState?.expertName?.length < 3) {
      setUser(undefined);
    }
    if (formState?.expertName?.length === 0) {
      setInputError({ expertName: "" });
    } else {
      setInputError((prev) => ({
        ...prev,
        expertName: searchItExpert?.message,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItExpert, formState?.expertName, user]);

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit} className="relative">
        {/* IT Expert name */}
        <div className="grid gap-4">
          <Input
            label="IT Expert"
            name="expertName"
            required
            onChange={handleFormChange}
            errMsg={inputError?.expertName}
            value={formState?.expertName}
          />
        </div>

        {/* IT Expert email */}
        {user && (
          <>
            {user?.email ? (
              <h5>{user?.email}</h5>
            ) : (
              <h5>
                User has no email{" "}
                <span
                  className="text-violetColor underline cursor-pointer"
                  onClick={() => navigate(URLUserList())}
                >
                  Add mail
                </span>
              </h5>
            )}
          </>
        )}

        {/* IT Expert options */}
        {itExperts?.length > 0 && (
          <div className="absolute h-full w-full mt-[2px] space-y-1 bg-whiteColor">
            {itExperts?.map((expert) => (
              <p
                className="custom_input text-[10px] cursor-pointer"
                onClick={() => handleItExpert(expert)}
              >{`${expert?.name} ${expert?.surname}`}</p>
            ))}
          </div>
        )}

        {/* SAVE AND BACK BUTTONS */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default ItExpertCreateForm;
