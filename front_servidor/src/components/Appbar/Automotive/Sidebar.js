import React from "react";
import { List, ListItemIcon, ListItemText } from "@material-ui/core/";
import { FaBuromobelexperte, FaCalendarAlt } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { GrClearOption } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { TiGroupOutline } from "react-icons/ti";
import { NavLink as Link } from "react-router-dom";
import { ListItem } from "./styles";
export default function SideBar() {
  return (
    <List>
      <ListItem
        button
        component={(props) => (
          <Link
            {...props}
            activeStyle={{
              color: "#152246",
            }}
            to="/estetica/dashboard"
          />
        )}
      >
        <ListItemIcon>
          <FaBuromobelexperte size={20} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem
        button
        component={(props) => (
          <Link
            {...props}
            activeStyle={{
              color: "#152246",
            }}
            to="/estetica/clientes"
          />
        )}
      >
        <ListItemIcon>
          <FiUsers size={20} />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </List>
  );
}
