import { createContext } from 'react'


export interface EntriesContextProps {
   entries: []
}


export const EntriesContext = createContext({} as EntriesContextProps);