import { SelectChangeEvent } from "@mui/material";

const handleOnChange = (event: SelectChangeEvent<unknown>) => {
 const value = event.target.value as YourEnumType;
};