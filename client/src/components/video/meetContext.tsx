import React, { useState } from "react";

export const MeetContext = React.createContext<any | undefined>(undefined);

export const MeetProvider = ({ children }: {children: any}) => {
  const [name, setName] = useState("");

  return (
    <MeetContext.Provider value={[name, setName]}>
      {children}
    </MeetContext.Provider>
  );
};