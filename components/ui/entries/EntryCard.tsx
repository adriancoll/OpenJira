import { FC, DragEvent, useContext } from "react";
import moment from "moment";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Entry } from "../../../interfaces";
import { UIContext } from "../../../context";
import { useRouter } from "next/router";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { endDragging, startDragging } = useContext(UIContext);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    startDragging();

    const { dataTransfer } = event;

    dataTransfer.setData("entry_id", entry._id);

    // todo: modificar el estado para indicar que estoy haciendo drag
  };

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    endDragging();
  };

  const router = useRouter()

  const handleNavigation = () => router.push(`/entries/${entry._id}`);

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      draggable
      onClick={handleNavigation}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      // eventos de drag
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            paddingRight: 2,
          }}
        >
          <Typography variant="body2">
            {moment(entry.createdAt).fromNow()}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
