import { FC, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";
import { entriesApi } from "../../services";

import { EntriesContext, entriesReducer } from "./";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<{ entry: Entry }>('/entries', {
      description
    })
    return dispatch({
      type: "[Entry] - ADD",
      payload: data.entry
    });
  };

  const updateEntry = (payload: Entry) => {
    dispatch({ type: "[Entry] - Updated", payload });
  };


  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<{ entries: Entry[] }>('/entries')
      dispatch({
        type: "[Entry] - Refresh-data",
        payload: data.entries
      })
    } catch (err) {
      console.error('error fetching entries', err)
    }
  }

  useEffect(() => {
    refreshEntries()
  }, [])


  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
