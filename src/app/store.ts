import authReducer from "@/features/auth/auth-slice";
import clientFormSlice from "@/features/client-form/client-form-slice";
import modalSlice from "@/features/modal/modal-slice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { API } from "../features/API/API";
import drawerReducer from "../features/drawar/drawar-slice";
import sidebarSlice from "../features/sidebar/sidebar";

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    sidebar: sidebarSlice,
    modal: modalSlice.reducer,
    auth: authReducer,
    drawer: drawerReducer,
    clientForm: clientFormSlice,
  },

  devTools: import.meta.env.MODE !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100,
      },
    }).concat(API.middleware),
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
