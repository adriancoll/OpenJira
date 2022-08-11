import { FC, useContext, useMemo, DragEvent } from "react";

import { List, Paper } from "@mui/material";

import styles from "./EntryList.module.css";

import { UIContext, EntriesContext } from "../../../context";
import { EntryStatus } from "../../../interfaces";
import { EntryCard } from "./EntryCard";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);

  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const { dataTransfer } = event;

    const id = dataTransfer.getData("entry_id");

    const entry = entries.find((e) => e._id === id)!;

    entry.status = status;

    updateEntry(entry);

    endDragging();
  };

  return (
    <div
      className={`${isDragging && styles.dragging}`}
      onDrop={onDropEntry}
      onDragOver={allowDrop}
    >
      <Paper
        sx={{
          height: "calc(100vh - 200px)",
          overflowY: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            transition: "300ms ease-in-out",
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
