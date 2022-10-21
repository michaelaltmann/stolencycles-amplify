import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/ads">
            Ads
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
