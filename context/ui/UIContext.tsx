import { createContext } from 'react'


export interface UIContextProps {
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  // methods
  openSideMenu: () => void;
  closeSideMenu: () => void;
  toggleSideMenu: () => void;
  setIsAddingEntry: (x: boolean) => void;
  toggleDragging: () => void;
  startDragging: () => void;
  endDragging: () => void;
}


export const UIContext = createContext({} as UIContextProps);