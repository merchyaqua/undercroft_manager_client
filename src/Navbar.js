import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
export default function Navbar() {
  const n = useNavigate();
  return (
    <>
      <AppBar
        sx={{ marginBottom: "30px", backgroundColor: "darkgoldenrod" }}
        position="static"
      >
        <Toolbar>
          <Typography>Undercroft Manager</Typography>

          <ButtonGroup>
            <NavbarItem to="/">Inventory</NavbarItem>

            <NavbarItem to="/add-prop">Add prop</NavbarItem>

            <NavbarItem to="/productions">Productions</NavbarItem>
          </ButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => n(-1)}
            sx={{ "text-align": "right" }}
          >
            ⬅️Back
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: "20px" }}>
        <Outlet />
      </Box>
    </>
  );
}

function NavbarItem({ to, children }) {
  return (
    <Button>
      <NavLink to={to}>{children}</NavLink>
    </Button>
  );
}
