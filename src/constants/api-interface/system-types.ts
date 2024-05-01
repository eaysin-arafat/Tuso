export const systemInitialState = {
  title: "",
  description: "",
};

export interface SystemType {
  title: string;
  description: string;
}

export interface SystemErrorType {
  title?: string;
  description?: string;
}
