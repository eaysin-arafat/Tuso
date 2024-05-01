import {
  DeviceType,
  EmailTemplate,
  IncidentCategory,
  IncidentPriority,
  Province,
  Team,
  TypeRoles,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { SystemDataType } from "@/constants/api-interface/system";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  firstCategories: IncidentCategory[];
  provinces: Province[];
  priorities: IncidentPriority[];
  teams: Team[];
  countries: Country[];
  deviceType: DeviceType[];
  userRoles: TypeRoles[];
  systems: SystemDataType[];
  emailNotifications: EmailTemplate[];
}
const initialState: InitialStateType = {
  firstCategories: [],
  provinces: [],
  priorities: [],
  teams: [],
  countries: [],
  deviceType: [],
  userRoles: [],
  systems: [],
  emailNotifications: [],
};

export const clientFormSlice = createSlice({
  name: "clientForm",
  initialState,
  reducers: {
    setFirstCategories: (
      state,
      action: PayloadAction<RootResponse<IncidentCategory[]>>
    ) => {
      state.firstCategories = action?.payload?.data;
    },
    setProvinces: (state, action: PayloadAction<RootResponse<Province[]>>) => {
      state.provinces = action?.payload?.data;
    },
    setPriorities: (
      state,
      action: PayloadAction<RootResponse<IncidentPriority[]>>
    ) => {
      state.priorities = action?.payload?.data;
    },
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action?.payload;
    },
    setCountries: (state, action: PayloadAction<RootResponse<Country[]>>) => {
      state.countries = action?.payload?.data;
    },
    setDeviceType: (
      state,
      action: PayloadAction<RootResponse<DeviceType[]>>
    ) => {
      state.deviceType = action?.payload?.data;
    },
    setUserRoles: (state, action: PayloadAction<RootResponse<TypeRoles[]>>) => {
      state.userRoles = action?.payload?.data;
    },
    setSystems: (
      state,
      action: PayloadAction<RootResponse<SystemDataType[]>>
    ) => {
      state.systems = action?.payload?.data;
    },
    setEmailNotification: (
      state,
      action: PayloadAction<RootResponse<EmailTemplate[]>>
    ) => {
      state.emailNotifications = action?.payload?.data;
    },
  },
});

export const {
  setCountries,
  setDeviceType,
  setFirstCategories,
  setPriorities,
  setProvinces,
  setTeams,
  setUserRoles,
  setSystems,
  setEmailNotification,
} = clientFormSlice.actions;

export default clientFormSlice.reducer;
