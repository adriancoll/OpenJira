import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { FC, useEffect, useReducer } from "react";

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

  const router = useRouter();
  
  const { enqueueSnackbar } = useSnackbar();


  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<{ entry: Entry }>("/entries", {
      description,
    });
    return dispatch({
      type: "[Entry] - ADD",
      payload: data.entry,
    });
  };

  const updateEntry = async (payload: Entry, showSnackbar = false ) => {
    console.log("Updating entry", payload);
    const {
      data: { entry },
    } = await entriesApi.put<{ entry: Entry }>(
      `/entries/${payload._id}`,
      payload
    );

    // mostrar snackbar
    showSnackbar && enqueueSnackbar("Entrada actualizada", {
      variant: "success",
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });

    dispatch({ type: "[Entry] - Updated", payload: { ...entry } });
  };


  const deleteEntry = async (id: string, showSnackbar = true) => {
    await entriesApi.delete(`/entries/${id}`);
    
    showSnackbar && enqueueSnackbar("Eliminado correctamente", {
      variant: "info",
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });

    dispatch({
      type: "[Entry] - Delete",
      payload: id,
    });

    router.back()
  };

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<{ entries: Entry[] }>("/entries");
      dispatch({
        type: "[Entry] - Refresh-data",
        payload: data.entries,
      });
    } catch (err) {
      console.error("error fetching entries", err);
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{ ...state, addEntry, updateEntry, deleteEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
