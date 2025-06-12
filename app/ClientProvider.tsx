"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import React from "react";
import AuthEventListener from "@/utils/AuthEventListener";

export default function ClientProvider({children}: {children: React.ReactNode}){
    return (
      <Provider store={store}>
        <AuthEventListener />
        {children}
      </Provider>
    );
}