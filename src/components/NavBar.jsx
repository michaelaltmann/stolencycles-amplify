import { Image } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/home">
            <img
              src="/icon.png"
              style={{
                borderRadius: "50%",
                backgroundColor: "white",
                height: "30px",
              }}
            />
          </Button>
          <Button color="inherit" component={Link} to="/ads">
            Ads
          </Button>
          <Button color="inherit" component={Link} to="/thefts">
            Thefts
          </Button>
          <Button color="inherit" component={Link} to="/matches">
            Matches
          </Button>
          <Button color="inherit" component={Link} to="/sellers">
            Sellers
          </Button>
          <Button color="inherit" component={Link} to="/reports">
            Reports
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
