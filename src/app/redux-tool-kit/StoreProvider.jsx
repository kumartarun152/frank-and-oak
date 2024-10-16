"use client";

import { useRef } from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>
    <PersistGate loading={null} persistor={storeRef.current.persistor}>

    {children}
    </PersistGate>
    
    </Provider>;
}
