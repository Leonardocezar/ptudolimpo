import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { ListItem as List, IconButton as Icon } from "@material-ui/core/";
const drawerWidth = 240;

export const Logo = styled.img`
  width: 200px;
  margin: 10px 0px 10px 0px;
`;
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 10px 0px;
`;

export const ProfileName = styled.span`
  color: #333;
  font-weight: bold;
  font-size: 16px;
`;

export const ProfileSubName = styled.span`
  color: #999;
  font-size: 12px;
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
  padding: 0px;
  margin: 0px;
`;

export const Avatar = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 50%;
`;
export const ListItem = styled(List)`
  &:hover {
    border-left-color: #06648f;
    border-left-style: solid;
    border-left-width: 4px;
  }
`;
export const IconButton = styled(Icon)`
  border-radius: 0;
  margin: 10px;
`;
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "#06648f",
    borderRadius: 0,
    boxShadow: "none",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderStyle: "solid",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  tool: {
    justifyContent: "space-between",
  },
  topimg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: "#fff",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    border: "none",
    width: drawerWidth,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
