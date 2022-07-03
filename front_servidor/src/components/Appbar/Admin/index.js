import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "~/store/modules/auth/actions";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logo from "~/assets/horizontal.png";
import avatar from "~/assets/avatar.png";
import {
  ProfileContainer,
  ProfileName,
  ProfileSubName,
  Avatar,
  Logo,
  useStyles,
  MenuLeft,
  MenuRight,
  IconButton,
} from "./styles";
import MainList from "./Sidebar";
import history from "~/services/history";
function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const profile = useSelector((state) => state.user.profile);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      <React.Fragment>
        <ProfileContainer>
          <IconButton onClick={() => history.push("/administracao/perfil")}>
            <Avatar src={avatar} />
          </IconButton>
          <ProfileName>{profile.name}</ProfileName>
          <ProfileSubName>Meu perfil</ProfileSubName>
        </ProfileContainer>
        <MainList />
      </React.Fragment>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.tool}>
          <MenuLeft></MenuLeft>
          <MenuRight>
            <IconButton onClick={() => dispatch(signOut())}>
              <ExitToAppIcon className={classes.button} />
            </IconButton>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon className={classes.button} />
            </IconButton>
          </MenuRight>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            //theme.direction === "rtl" ? "right" : "left"
            anchor={"right"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.topimg}>
              <Logo src={logo} />
            </div>

            <IconButton onClick={() => history.push("/administracao/perfil")}>
              <ProfileContainer>
                <Avatar src={avatar} />
                <ProfileName>{profile.name}</ProfileName>
                <ProfileSubName>Meu perfil</ProfileSubName>
              </ProfileContainer>
            </IconButton>
            <MainList />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className={classes.topimg}>
              <Logo src={logo} />
            </div>

            <IconButton onClick={() => history.push("/administracao/perfil")}>
              <ProfileContainer>
                <Avatar src={avatar} />
                <ProfileName>{profile.name}</ProfileName>
                <ProfileSubName>Meu perfil</ProfileSubName>
              </ProfileContainer>
            </IconButton>
            <MainList />
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
}

export default ResponsiveDrawer;
