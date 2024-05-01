/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { Team } from "@/constants/api-interface";
import { useUpdateTeamMutation } from "@/features/team/team-api";
import useBaseDataEdit from "@/hooks/shared/useBaseDataEdit";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Textarea from "../core/form-elements/Textarea";

// edit form props type
type Props = {
  toggler: () => void;
};

// edit form input type
type TypeTeamForm = {
  title: string;
  description: string;
};

// initial form state
const initialState = {
  title: "",
  description: "",
};

// Team edit form component
const TeamEditForm = ({ toggler }: Props) => {
  // selected data for edit
  const { data } = useSelector((state: RootState) => state.modal?.editModal);

  // modal data
  const modalData = data as unknown as Team;

  // base data for edit
  const [baseData] = useBaseDataEdit();

  // form state
  const [formState, setFormState] = useState<TypeTeamForm>({
    title: modalData?.title,
    description: modalData?.description,
  });

  // update team mutation
  const [
    updateTeam,
    {
      data: teamData,
      status: createStatus,
      isError: isCreateError,
      error: createError,
      isSuccess: isCreateSuccess,
    },
  ] = useUpdateTeamMutation();

  // form validation schema
  const Schema = Joi.object({
    title: Joi.string().required().max(90).messages({
      "string.empty": "Required",
      "string.max": "Title should have a maximum length of 90",
    }),
    description: Joi.string().required().max(250).messages({
      "string.empty": "Required",
      "string.max": "Description should have a maximum length of 250",
    }),
  });

  // use form hook
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TypeTeamForm>({
    defaultValues: formState,
    resolver: joiResolver(Schema),
  });

  // handle create side Effects
  React.useEffect(() => {
    if (isCreateSuccess && createStatus === "fulfilled") {
      toast.dismiss();
      toast.success("Team has been updated successfully");
      setFormState(initialState);
      toggler();
    } else if (isCreateError && createError && "data" in createError) {
      toast.dismiss();
      toast.error(
        typeof createError.data === "string"
          ? createError?.data
          : "Error creating Team."
      );
    }
  }, [
    isCreateSuccess,
    createStatus,
    isCreateError,
    createError,
    toggler,
    teamData,
  ]);

  // FORM SUBMIT HANDLER
  const onSubmit = (data: TypeTeamForm) => {
    const submitData = {
      ...baseData,
      ...modalData,
      ...data,
    };

    updateTeam({ key: Number(modalData?.oid), body: submitData });
  };

  return (
    <div>
      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {/* TITLE */}
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label="Team Name"
                required
                name={field.name}
                onChange={field.onChange}
                value={field.value}
                errMsg={errors?.title?.message as string | undefined}
              />
            )}
          />

          {/* DESCRIPTION */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Description"
                required
                name={field.name}
                onChange={field.onChange}
                value={field.value}
                errMsg={errors?.description?.message as string | undefined}
              />
            )}
          />
        </div>

        {/* SAVE AND BACK BUTTON */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </div>
  );
};

export default TeamEditForm;
