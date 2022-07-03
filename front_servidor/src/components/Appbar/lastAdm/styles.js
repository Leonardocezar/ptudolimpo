import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
const drawerWidth = 240;

export const Logo = styled.img`
  height: 50px;
  margin: 10px;
`;

export const MenuLeft = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const MenuRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const MenuProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  transition: background 0.2s;
  padding: 8px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
`;
export const MenuItemProfile = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: right;
  margin: 0px 5px 0px 5px;
`;
export const MenuTitle = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin: 0px 10px 0px 0px;
`;
export const MenuSubTitle = styled.span`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  margin: 0px 10px 0px 0px;
  text-transform: uppercase;
`;

export const Avatar = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
`;
export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#00648f",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    justifyContent: "space-between",
  },
  iconButton: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
}));
