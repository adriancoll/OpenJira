import { createContext } from "react";

import { Entry } from "../../interfaces";

export interface EntriesContextProps {
  entries: Entry[];
  //methiods
  addEntry: (description: string) => void;
  updateEntry: (payload: Entry) => void;
}

export const EntriesContext = createContext({} as EntriesContextProps);
