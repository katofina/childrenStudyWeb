"use client";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { DrawerList } from "../Drawer/DrawerList";

const ARR_BUTTONS = ["Войти", "Зарегистрироваться"];

export const Header = () => {
  const theme = useTheme();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleToggle = () => {
    setIsOpenDrawer(true);
  };
  const closeDrawer = () => {
    setIsOpenDrawer(false);
  };

  return (
    <AppBar sx={{ backgroundColor: "#FF7043", color: "#F5F5DC" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
          <IconButton sx={{borderRadius: 0, "&:hover": {backgroundColor: "inherit"}}} onClick={handleToggle}>
            <MenuIcon sx={{color: "#F5F5DC", fontSize: "2rem"}}/>
          </IconButton>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            ChildrenStudy
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            [theme.breakpoints.down("md")]: { display: "none" },
          }}
        >
          {ARR_BUTTONS.map((item) => (
            <Button
              variant="contained"
              sx={{
                color: "inherit",
                borderColor: "#F5F5DC",
                backgroundColor: "#E2725B",
                "&:hover": { backgroundColor: "#b8391f" },
              }}
              key={item}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
      <Drawer open={isOpenDrawer} onClose={closeDrawer}>
        <DrawerList/>
      </Drawer>
    </AppBar>
  );
};
