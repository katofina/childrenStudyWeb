"use client";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ARR_BUTTONS = ["Войти", "Зарегистрироваться"];

export const Header = () => {
  const theme = useTheme();

  return (
    <AppBar sx={{ backgroundColor: "#FF7043", color: "#F5F5DC" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
          <IconButton sx={{borderRadius: 0, "&:hover": {backgroundColor: "inherit"}}}>
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
    </AppBar>
  );
};
