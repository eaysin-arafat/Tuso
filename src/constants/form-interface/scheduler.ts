export interface SchedulerFormDataType {
  isEnabled?: string;
  time: number;
}

export const schedulerInitialState = { isEnabled: "true", time: 0 };
