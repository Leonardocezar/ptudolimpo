import React, { useState } from "react";
import {
  useStyles,
  Logo,
  MenuLeft,
  MenuRight,
  MenuProfile,
  MenuItemProfile,
  MenuTitle,
  MenuSubTitle,
  Avatar,
} from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { signOut } from "~/store/modules/auth/actions";
import clsx from "clsx";
import {
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  MenuItem,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import MainListItems from "./Sidebar";
import logo from "../../../assets/horizontal.png";
import { NavLink as Link } from "react-router-dom";

import Menu from "@material-ui/core/Menu";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import history from "~/services/history";
export default function NavbarAdministrador() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openMenuTest, setOpenMenuTest] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const anchorRef = React.useRef(null);

  const profile = useSelector((state) => state.user.profile);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setOpenMenuTest(!openMenuTest);
  };

  function handleListKeyDown(event) {
    if (event.key === "click") {
      event.preventDefault();
      setOpenMenuTest(false);
    }
  }
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <MenuLeft>
            {open ? null : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </MenuLeft>
          <MenuRight>
            <MenuProfile
              ref={anchorRef}
              aria-controls={openMenuTest ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MenuItemProfile>
                <MenuTitle>{profile.name}</MenuTitle>
                <MenuSubTitle>Meu Perfil</MenuSubTitle>
              </MenuItemProfile>
              <Avatar src={profile.avatar} />
            </MenuProfile>

            <Popper
              open={openMenuTest}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener
                      onClickAway={() => setOpenMenuTest(false)}
                    >
                      <MenuList
                        autoFocusItem={openMenuTest}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={() => history.push("/administracao/perfil")}
                        >
                          Meu Perfil
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(signOut())}>
                          Sair
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </MenuRight>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persist"
        className={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        onClose={() => setOpen(!open)}
      >
        <Logo src={logo} />
        <Divider />
        <MainListItems />
      </Drawer>
    </React.Fragment>
  );
}
