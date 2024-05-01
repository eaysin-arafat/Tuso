import SaveAndBackButtons from "@/components/core/buttons/SaveAndBackButtons";
import Input from "@/components/core/form-elements/Input";
import Select from "@/components/core/form-elements/Select";
import DefaultModal from "@/components/core/modal/DefaultModal";
import {
  SchedulerFormDataType,
  schedulerInitialState,
} from "@/constants/form-interface/scheduler";
import {
  backgroundScheduler,
  backgroundSchedulerPut,
} from "@/features/scheduler-control/SchedulerControl";
import useCloseModal from "@/hooks/shared/useCloseModal";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import React, { ChangeEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditDeviceStatusEmail = ({ toggler }: { toggler: () => void }) => {
  // Form State
  const [formState, setFormState] = React.useState<SchedulerFormDataType>(
    schedulerInitialState
  );

  // Modal Closer
  const { closeEditModal } = useCloseModal();

  // Form Validation Schema
  const schema = Joi.object({
    isEnabled: Joi.boolean().required().messages({
      "boolean.empty": "Required",
      "boolean.required": "Required",
    }),
    time: Joi.number().required().messages({
      "number.empty": "Required",
      "number.required": "Required",
    }),
  });

  // Form Submit handler
  const {
    control,
    formState: { errors },
  } = useForm<SchedulerFormDataType>({
    defaultValues: formState,
    resolver: joiResolver(schema),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await backgroundSchedulerPut({
      ...formState,
      isEnabled: formState?.isEnabled === "true" ? true : false,
    });

    if ("ok" in result) {
      if (result.ok) {
        toast.success("Email Scheduler Status updated successfully.");
        closeEditModal();
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  // Background Scheduler SideEffect
  useEffect(() => {
    backgroundScheduler()
      .then((res) => {
        if (res?.success) {
          setFormState({
            isEnabled: res.data?.isEnabled,
            time: res?.data?.timeInSeconds,
          });
        }
        if (!res.success) {
          console.log(res?.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DefaultModal size="4xl" title="Edit Device Status Email" toggler={toggler}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {/* Is Enabled */}
          <Controller
            control={control}
            name="isEnabled"
            render={({ field }) => (
              <Select
                label="Status"
                required
                name={field.name}
                value={String(formState?.isEnabled)}
                errMsg={errors.isEnabled?.message as string | undefined}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event?.target?.value);
                  setFormState((prev) => ({
                    ...prev,
                    isEnabled: event?.target?.value,
                  }));
                }}
              >
                <option value={"true"}>On</option>
                <option value={"false"}>Off</option>
              </Select>
            )}
          />

          {/* Minutes */}
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <Input
                label="Minutes"
                className="rounded-md"
                value={formState?.time}
                errMsg={errors?.time?.message as string | undefined}
                name={field.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event?.target?.value);
                  setFormState((prev) => ({
                    ...prev,
                    time: Number(event?.target?.value),
                  }));
                }}
              />
            )}
          />
        </div>

        {/* Submit Action Buttons */}
        <div className="mt-6">
          <SaveAndBackButtons toggler={toggler} />
        </div>
      </form>
    </DefaultModal>
  );
};

export default EditDeviceStatusEmail;
