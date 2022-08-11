import { createContext } from 'react'

import { Entry } from '../../interfaces';


export interface EntriesContextProps {
   entries: Entry[]
}


export const EntriesContext = createContext({} as EntriesContextProps);