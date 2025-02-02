"use client";
import { createContext, useContext, useState } from "react";

interface UserData {
  rank: number;
  score: number;
  percentile: number;
}

interface AppFeaturesContextType {
  userData: UserData;
  handleUserData: (data: UserData) => void;
}

const AppFeaturesContext = createContext<AppFeaturesContextType | undefined>(
  undefined
);

function AppFeaturesProvider({ children }: any) {
  const [userData, setUserData] = useState({
    rank: 1,
    percentile: 30,
    score: 10,
  });

  function handleUserData(data: any) {
    // console.log(data);
    setUserData(data);
  }

  return (
    <AppFeaturesContext.Provider value={{ handleUserData, userData }}>
      {children}
    </AppFeaturesContext.Provider>
  );
}
//

function useAppFeatures() {
  const context = useContext(AppFeaturesContext);
  if (context === undefined) {
    throw new Error("useAppFeatures must be used within a AppFeaturesProvider");
  }
  return context;
}

export { AppFeaturesProvider, useAppFeatures };
