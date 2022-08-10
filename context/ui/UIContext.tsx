import { createContext } from 'react'


export interface UIContextProps {
   sidemenuOpen: boolean
}


export const UIContext = createContext({} as UIContextProps);