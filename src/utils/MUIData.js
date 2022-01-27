import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles(() => ({
  green: {
    "&:hover": {
      backgroundColor: "green",
      borderColor: "transparent",
    },
  },
  transparent: {
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: "grey",
    },
  },
}));
