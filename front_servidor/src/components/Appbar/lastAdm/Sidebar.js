import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import { FaBuromobelexperte, FaCalendarAlt } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { GrClearOption } from "react-icons/gr";
import { FiUsers } from "react-icons/fi";
import { TiGroupOutline } from "react-icons/ti";
import { FiUser } from "react-icons/fi";
import { NavLink as Link } from "react-router-dom";
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
            to="/administracao/dashboard"
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
            to="/administracao/departamentos"
          />
        )}
      >
        <ListItemIcon>
          <TiGroupOutline size={20} />
        </ListItemIcon>
        <ListItemText primary="Departamentos" />
      </ListItem>

      <ListItem
        button
        component={(props) => (
          <Link
            {...props}
            activeStyle={{
              color: "#152246",
            }}
            to="/administracao/equipes"
          />
        )}
      >
        <ListItemIcon>
          <RiTeamLine size={20} />
        </ListItemIcon>
        <ListItemText primary="Equipes" />
      </ListItem>

      <ListItem
        button
        component={(props) => (
          <Link
            {...props}
            activeStyle={{
              color: "#152246",
            }}
            to="/administracao/clientes"
          />
        )}
      >
        <ListItemIcon>
          <FiUsers size={20} />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
      <ListItem
        button
        component={(props) => (
          <Link
            {...props}
            activeStyle={{
              color: "#152246",
            }}
            to="/administracao/servicos"
          />
        )}
      >
        <ListItemIcon>
          <GrClearOption size={20} />
        </ListItemIcon>
        <ListItemText primary="Servicos" />
      </ListItem>

      <ListItem
        button
        component={(props) => (
          <Link
            {...props}
            activeStyle={{
              color: "#152246",
            }}
            to="/administracao/agendamentos"
          />
        )}
      >
        <ListItemIcon>
          <FaCalendarAlt size={20} />
        </ListItemIcon>
        <ListItemText primary="Agendamentos" />
      </ListItem>
      <ListItem
        button
        component={(props) => (
          <Link
            {...props}
            activeStyle={{
              color: "#152246",
            }}
            to="/administracao/funcionarios"
          />
        )}
      >
        <ListItemIcon>
          <FiUser size={20} />
        </ListItemIcon>
        <ListItemText primary="Funcionários" />
      </ListItem>
    </List>
  );
}
