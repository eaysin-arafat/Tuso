/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { useCreateTeamMutation } from "@/features/team/team-api";
import useBaseDataCreate from "@/hooks/shared/useBaseDataCreate";
import useCreateSideEffects from "@/hooks/shared/useSideEffect";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SaveAndBackButtons from "../core/buttons/SaveAndBackButtons";
import Input from "../core/form-elements/Input";
import Textarea from "../core/form-elements/Textarea";

// team create Form props type
type Props = {
  toggler: () => void;
};

// create team form input type
type TypeTeamForm = {
  title: string;
  description: string;
};

// initial form state
const initialState = {
  title: "",
  description: "",
};

/**
 * @description Team create form component
 */
const TeamCreateForm = ({ toggler }: Props) => {
  // base data for create
  const [baseData] = useBaseDataCreate();

  // form  state
  const [formState, setFormState] = useState<TypeTeamForm>(initialState);

  // create team mutation
  const [createTeam, { data: teamData, status, isError, error, isSuccess }] =
    useCreateTeamMutation();

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

  // handle side for create team
  useCreateSideEffects({
    error,
    isError,
    isSuccess,
    status,
    message: "team",
    messageType: "create",
    response: teamData,
    initialState,
    isToggle: true,
    toggler,
    setFormState,
  });

  // FORM SUBMIT HANDLER
  const onSubmit = (data: TypeTeamForm) => {
    const submitData = {
      ...baseData,
      ...data,
    };

    createTeam(submitData);
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

export default TeamCreateForm;
