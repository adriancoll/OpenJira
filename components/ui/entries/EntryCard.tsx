import { FC } from "react";
import moment from "moment";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Entry } from "../../../interfaces";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
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
