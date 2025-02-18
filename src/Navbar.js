import { useNavigate,Outlet, Link, NavLink} from "react-router-dom";
import {Button, AppBar, Toolbar, Typography, ListItem, ButtonGroup, ListItemButton} from "@mui/material";
export default function Navbar(){
    const n = useNavigate();
    return (
        <><AppBar sx={{ marginBottom: "30px" }} position="static">
        <Toolbar>
            <Typography>Undercroft Manager</Typography>
          
        <ButtonGroup>
        <NavbarItem to="/">Inventory</NavbarItem>

        <NavbarItem to="/add-prop">Add prop</NavbarItem>
        
        <NavbarItem to="/productions">Productions</NavbarItem>
        </ButtonGroup>
        <Button variant="contained" color='secondary' onClick={() =>n(-1)}
            sx={{'text-align': 'right'}}>⬅️Back</Button>
                    </Toolbar>
                  </AppBar>
        <Outlet/>
        </>

    )
}

function NavbarItem({to, children}) {
    return (
        <Button>
        <NavLink to={to}>{children}</NavLink>
        </Button>
    )
}