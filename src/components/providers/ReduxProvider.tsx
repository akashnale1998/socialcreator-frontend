"use client";

import { Provider, useDispatch } from "react-redux";
import store, { AppDispatch } from "@/store/store";
import { getMeThunk } from "@/store/apis";
import { useEffect } from "react";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('socialcreator_token');
    if (token) {
      dispatch(getMeThunk({}));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Provider>
  );
}
