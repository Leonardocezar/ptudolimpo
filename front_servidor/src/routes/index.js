import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Route from "./PrivateRouter";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core";

import SignIn from "../pages/SignIn";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminDepartments from "../pages/admin/Departments";
import AdminTeams from "../pages/admin/Teams";
import AdminServices from "../pages/admin/Services";
import AdminBookings from "../pages/admin/Bookings";
import AdminOrders from "../pages/admin/Orders";
import AdminCustomers from "../pages/admin/Customers";
import AdminWorkers from "../pages/admin/Workers";
import AdminProfile from "../pages/admin/Profile";

import AdminNavbar from "../components/Appbar/Admin";
import AutomotiveNavbar from "../components/Appbar/Automotive";
import CleaningNavbar from "../components/Appbar/Cleaning";
import DedetizationNavbar from "../components/Appbar/Dedetization";

import AutomotiveDashboard from "../pages/automotive/Dashboard";
import AutomotiveCustomer from "../pages/automotive/Customers";
import AutomotiveProfile from "../pages/automotive/Profile";

import DedetizationDashboard from "../pages/dedetization/Dashboard";
import DedetizationCustomer from "../pages/dedetization/Customers";
import DedetizationProfile from "../pages/dedetization/Profile";

import CleaningDashboard from "../pages/cleaning/Dashboard";
import CleaningCustomer from "../pages/cleaning/Customers";
import CleaningProfile from "../pages/cleaning/Profile";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/administracao" component={AdminModule} isPrivate />
      <Route path="/estetica" component={AutomotiveModule} isPrivate />
      <Route path="/higienizacao" component={CleaningModule} isPrivate />
      <Route path="/dedetizacao" component={DedetizationModule} isPrivate />
      <Route path="/" component={() => <Redirect to="/" />} />
    </Switch>
  );
}
//Todas rotas authenticadas
function AdminModule() {
  const classes = useStyles();
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route
        render={({ location, history }) => (
          <div className={classes.root}>
            <CssBaseline />
            <AdminNavbar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Route
                  exact
                  path="/administracao/dashboard"
                  component={AdminDashboard}
                />
                <Route
                  exact
                  path="/administracao/usuarios"
                  component={AdminUsers}
                />
                <Route
                  exact
                  path="/administracao/departamentos"
                  component={AdminDepartments}
                />
                <Route
                  exact
                  path="/administracao/equipes"
                  component={AdminTeams}
                />
                <Route
                  exact
                  path="/administracao/servicos"
                  component={AdminServices}
                />
                <Route
                  exact
                  path="/administracao/agendamentos"
                  component={AdminBookings}
                />
                <Route
                  exact
                  path="/administracao/pedidos"
                  component={AdminOrders}
                />
                <Route
                  exact
                  path="/administracao/clientes"
                  component={AdminCustomers}
                />
                <Route
                  exact
                  path="/administracao/funcionarios"
                  component={AdminWorkers}
                />
                <Route
                  exact
                  path="/administracao/perfil"
                  component={AdminProfile}
                />
              </Container>
            </main>
          </div>
        )}
      />
    </Switch>
  );
}

function AutomotiveModule() {
  const classes = useStyles();
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route
        render={({ location, history }) => (
          <div className={classes.root}>
            <CssBaseline />
            <AutomotiveNavbar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Route
                  exact
                  path="/estetica/dashboard"
                  component={AutomotiveDashboard}
                />
                <Route
                  exact
                  path="/estetica/clientes"
                  component={AutomotiveCustomer}
                />
                <Route
                  exact
                  path="/estetica/perfil"
                  component={AutomotiveProfile}
                />
              </Container>
            </main>
          </div>
        )}
      />
    </Switch>
  );
}

function CleaningModule() {
  const classes = useStyles();
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route
        render={({ location, history }) => (
          <div className={classes.root}>
            <CssBaseline />
            <CleaningNavbar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Route
                  exact
                  path="/higienizacao/dashboard"
                  component={CleaningDashboard}
                />
                <Route
                  exact
                  path="/higienizacao/clientes"
                  component={CleaningCustomer}
                />
                <Route
                  exact
                  path="/higienizacao/perfil"
                  component={CleaningProfile}
                />
              </Container>
            </main>
          </div>
        )}
      />
    </Switch>
  );
}
function DedetizationModule() {
  const classes = useStyles();
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route
        render={({ location, history }) => (
          <div className={classes.root}>
            <CssBaseline />
            <DedetizationNavbar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Route
                  exact
                  path="/dedetizacao/dashboard"
                  component={DedetizationDashboard}
                />
                <Route
                  exact
                  path="/dedetizacao/clientes"
                  component={DedetizationCustomer}
                />
                <Route
                  exact
                  path="/dedetizacao/perfil"
                  component={DedetizationProfile}
                />
              </Container>
            </main>
          </div>
        )}
      />
    </Switch>
  );
}
