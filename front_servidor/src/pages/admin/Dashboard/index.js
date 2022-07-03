import React, { useState, useEffect } from "react";

import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import {
  FaChartBar,
  FaUser,
  FaCog,
  FaUserFriends,
  FaCartPlus,
  FaUserShield,
} from "react-icons/fa";
import { Grid } from "@material-ui/core";
import ChartLine from "~/components/Charts/Line";
import ReactLoading from "~/components/Loading";
import DashboardCardItem from "~/components/Card/DashboardCard";
import { Container, Title } from "./styles";
import api from "~/services/api";
import history from "~/services/history";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const dateFormatted = format(date, "d 'de' MMMM 'de' yyyy ", { locale: pt });

  useEffect(() => {
    async function getDepartments() {
      try {
        const response = await api.get("/departments");
        setDepartments(response.data);
      } catch (error) {}
    }
    async function getServices() {
      try {
        const response = await api.get("/services");
        setServices(response.data);
      } catch (error) {}
    }
    async function getBookings() {
      try {
        const response = await api.get("/bookings");
        setBookings(response.data);
      } catch (error) {}
    }
    async function getUsers() {
      const response = await api.get("/users");
      setUsers(response.data);
    }
    async function getOrders() {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {}
    }

    async function getCustomers() {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {}
    }
    getDepartments();
    getServices();
    getUsers();
    getOrders();
    getBookings();
    getCustomers();
  }, []);
  return loading ? (
    <ReactLoading />
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Container>
          <Title>Status dos Serviços</Title>
          <ChartLine
            scheduled={bookings.filter((val) => val.status === "scheduled")}
            progress={bookings.filter((val) => val.status === "progress")}
            finished={bookings.filter((val) => val.status === "finished")}
          />
        </Container>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Grid item xs={12} md={12} lg={12}>
          <DashboardCardItem
            title="Usuários Cadastrados"
            textColor="#7467ef"
            subtitle={users.length}
          >
            <FaUser size={50} color="#7467ef" />
          </DashboardCardItem>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <DashboardCardItem
            title="Departamentos Cadastrados"
            textColor="#63c9ee"
            subtitle={departments.length}
            onClick={() => history.push("departamentos")}
          >
            <FaUserFriends size={50} color="#63c9ee" />
          </DashboardCardItem>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4}>
        <Grid item xs={12} md={12} lg={12}>
          <DashboardCardItem
            title="Serviços Cadastrados"
            textColor="#63ee9a"
            subtitle={services.length}
            onClick={() => history.push("servicos")}
          >
            <FaCog size={50} color="#63ee9a" />
          </DashboardCardItem>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <DashboardCardItem
            title="Clientes Cadastrados"
            textColor="#ac0171"
            subtitle={customers.length}
            onClick={() => history.push("clientes")}
          >
            <FaUserShield size={50} color="#ac0171" />
          </DashboardCardItem>
        </Grid>
      </Grid>
    </Grid>
  );
}
