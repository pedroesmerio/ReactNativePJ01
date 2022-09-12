import { createContext, ReactNode } from "react";

interface GlobalProviderProps {
  children: ReactNode;
}

interface GlobalContextProps {
  addParticipant: () => void;
  removeParticipant: () => void;
  fetchParticipant: () => void;
}
export const GlobalContext = createContext({} as GlobalContextProps);

export function GlobalProvider({ children }: GlobalProviderProps) {

  function addParticipant() {
    console.log('add')
  }

  function removeParticipant() {
    console.log('remove')
  }

  function fetchParticipant() {
    console.log('fetch')
  }

  return (
    <GlobalContext.Provider value={{
      addParticipant,
      removeParticipant,
      fetchParticipant,
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
