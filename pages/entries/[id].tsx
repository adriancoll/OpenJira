import { GetServerSideProps, NextPage } from "next";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
} from "@mui/material";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import { EntriesContext } from "../../context";
import { dbentries } from "../../database";
import moment from "moment";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
  entry: Entry;
}

const EntryDetailPage: NextPage<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const { deleteEntry, updateEntry } = useContext(EntriesContext);

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    setInputValue(value);
    setTouched(true);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStatus(value as EntryStatus);
    setTouched(true);
  };

  const handleDelete = () => deleteEntry("");

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };

    updateEntry(updatedEntry, true);
  };

  const hasErrors = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  );

  return (
    <Layout title={`Editar ${inputValue.substring(0, 20)} ...`}>
      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: 2,
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${entry._id}`}
              subheader={`Creada hace: ${moment(entry.createdAt).fromNow()}`}
            />

            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                onChange={onInputValueChanged}
                value={inputValue}
                multiline
                error={hasErrors}
                label="Nueva entrada"
                helperText={hasErrors && "Ingrese un valor"}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>

                <RadioGroup row onChange={onStatusChanged} value={status}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={<Radio />}
                      label={capitalize(option)}
                      value={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                disabled={hasErrors || !touched}
                onClick={onSave}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        onClick={handleDelete}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
        }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbentries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryDetailPage;
