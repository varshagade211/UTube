import React, {  useState,createContext } from 'react';


export const SideBarContext = createContext();

export function SideBarContextProvider({ children }) {

  const [isSidebar, setSidebar] = useState(false);


  return (
    <>
      <SideBarContext.Provider value={{isSidebar,setSidebar}}>
        {children}
      </SideBarContext.Provider>

    </>
  );
}
