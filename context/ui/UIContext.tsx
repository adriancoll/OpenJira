import { createContext } from 'react'


export interface UIContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  
  // methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  toggleSideMenu: () => void;
  setIsAddingEntry: (x: boolean) => void;
}


export const UIContext = createContext({} as UIContextProps);