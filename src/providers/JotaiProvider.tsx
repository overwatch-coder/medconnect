"use client";

import React from "react";
import { Provider, createStore } from "jotai";

const store = createStore();

const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default JotaiProvider;
