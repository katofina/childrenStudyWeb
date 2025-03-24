import { AppBar, Box, Button, ButtonGroup, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import "./header.module.css";

const ARR_BUTTONS = ["Войти", "Зарегистрироваться"];

export const Header = () => {
  return (
    <AppBar sx={{ backgroundColor: "#E57373", color: "#F5F5DC" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{display: "flex", gap: 5, alignItems: "center"}}>
          <MenuIcon/>
          <Typography sx={{fontSize: "2rem", fontWeight: "bold"}}>ChildrenStudy</Typography>
        </Box>
        <Box sx={{display: "flex", gap: 2}} className="buttonBox">
          {ARR_BUTTONS.map((item) => (
            <Button variant="contained" sx={{color: "inherit", borderColor: "#F5F5DC", backgroundColor: "#e8736d"}} key={item}>{item}</Button>
            ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
