import { Box, List } from "@mui/material";
import { LESSONS_LIST } from "../constants/constants";
import { DrawerListItem } from "./DrawerListItem";

export const DrawerList = () => {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {LESSONS_LIST.map((item) => (
          <DrawerListItem key={item} item={item} />
        ))}
      </List>
    </Box>
  );
};
