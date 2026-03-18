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
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #FF7B72 0%, #FFD86A 55%, #4FC3F7 100%)",
        color: "#1B1F3B",
        boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <IconButton
            sx={{
              borderRadius: 1,
              backgroundColor: "rgba(255,255,255,0.25)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
            }}
            onClick={handleToggle}
          >
            <MenuIcon sx={{ color: "#1B1F3B", fontSize: "2rem" }} />
          </IconButton>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: "800" }}>
            ChildrenStudy
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            [theme.breakpoints.down("md")]: { display: "none" },
          }}
        >
          {ARR_BUTTONS.map((item) => (
            <Button
              variant="contained"
              sx={{
                color: "#1B1F3B",
                borderColor: "rgba(27,31,59,0.25)",
                backgroundColor: "rgba(255,255,255,0.8)",
                fontWeight: 700,
                "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
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
