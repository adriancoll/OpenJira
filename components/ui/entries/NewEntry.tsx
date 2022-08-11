import { ChangeEvent, useContext, useState } from "react";

import { Button, Box, TextField } from "@mui/material";

import SaveIcon from "@mui/icons-material/SaveOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "../../../context/entries";
import { UIContext } from "../../../context/ui";

export const NewEntry = () => {
  const { addEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setIsTouched] = useState(false);

  const toggleForm = () => setIsAddingEntry(!isAddingEntry);

  const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isDisabled = touched && inputValue.length <= 0;

  const onSave = () => {
    if (inputValue.length === 0) return;

    addEntry(inputValue.trim());

    // reset
    setInputValue("");
    setIsTouched(false);
    toggleForm();
  };

  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 2,
      }}
    >
      {!isAddingEntry ? (
        <Button
          onClick={toggleForm}
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Agregar Tarea
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            autoFocus
            label="Nueva entrada"
            multiline
            helperText={isDisabled && "Introduce un valor"}
            placeholder="Nueva entrada"
            onBlur={() => setIsTouched(true)}
            error={isDisabled}
            value={inputValue}
            onChange={onTextFieldChange}
            sx={{
              marginTop: 2,
              marginBottom: 1,
            }}
          />

          <Box display="flex" justifyContent="space-between">
            <Button onClick={toggleForm} variant="text" color="error">
              Cancelar
            </Button>

            <Button
              onClick={onSave}
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
              disabled={isDisabled}
            >
              Guardar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
