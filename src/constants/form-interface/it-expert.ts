export type TypeItExpertForm = {
  expertId: string;
  expertName: string;
};
export type TypeItExpertErrorForm = {
  expertName?: string;
};

export const itExpertInitialState = { expertId: "", expertName: "" };
