import { Box, List } from "@mui/material";
import { memo } from "react";
import { LESSONS_LIST } from "../constants/constants";
import { DrawerListItem } from "./DrawerListItem";

export const DrawerList = memo(() => {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {LESSONS_LIST.map((item) => (
          <DrawerListItem key={item} item={item} />
        ))}
      </List>
    </Box>
  );
});

DrawerList.displayName = "DrawerList";
