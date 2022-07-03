import React, { useState, useEffect, useRef } from "react";

import socketio from "socket.io-client";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "~/services/api";
import { ArrayServiceStatus, ArrayServiceTime } from "~/utils";
import AlertConfirmation from "~/components/Alert/AlertConfirmation";
import Order from "~/components/List/Order";
import Modal from "~/components/Modal";
import Calendar from "~/components/Calendar";
import Input from "~/components/Form/Input";
import Select from "~/components/Form/Select";
import DatePicker from "~/components/Form/InputDate";
import Button from "~/components/Form/SubmitButton";
import notificationsound from "~/assets/notification.mp3";

import {
  Container,
  FormContainer,
  CustomerName,
  CustomerAddress,
  CustomerCity,
  Button as ButtonDelete,
} from "./styles";

export default function Bookings() {
  const [orders, setOrders] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [teams, setTeams] = useState([]);
  const [services, setServices] = useState([]);
  const [teamId, setTeamId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [start, setStart] = useState(new Date());
  const [customerId, setCustomerId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [end, setEnd] = useState("");
  const [updatePage, setUpdatePage] = useState(false);
  const [bookingCreateModal, setBookingCreateModal] = useState(false);
  const [bookingEditModal, setBookingEditModal] = useState(false);
  const [modalBookingCreate, setModalBookingCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);
  const formInitialData = {
    description: "",
    start: start,
    serviceTime: 1,
    team_id: "",
    service_id: "",
    customer_id: "",
  };
  useEffect(() => {
    const socket = socketio.connect(process.env.REACT_APP_BASE_URL, {});
    socket.on("orders", (data) => {
      let url = notificationsound;
      let audio = new Audio(url);
      audio.play();
      getOrders();
    });
    async function getOrders() {
      try {
        const response = await api.get("/orders");
        setOrders(
          response.data.filter((val) => {
            return val.is_approved === false, val.is_rejected === false;
          })
        );
      } catch (error) {}
    }

    async function getBookings() {
      try {
        const response = await api.get("/bookings");
        setBookings(
          response.data.map((val) => {
            return {
              id: val.id,
              title: parseTitle(val.status),
              start: val.start,
              end: val.end,
              color: parseColor(val.status),
              textColor: "#000",
            };
          })
        );
      } catch (error) {}
    }

    function parseTitle(st) {
      if (st === "scheduled") {
        return "Agendado";
      } else if (st === "progress") {
        return "Em Execução";
      } else {
        return "Finalizado";
      }
    }
    function parseColor(st) {
      if (st === "scheduled") {
        return "#63C9EE";
      } else if (st === "progress") {
        return "#F7F728";
      } else {
        return "#63EE9A";
      }
    }

    async function getDepartments() {
      try {
        const response = await api.get("/departments");
        setDepartments(
          response.data.map((val) => {
            return {
              label: val.name.toUpperCase(),
              value: val.id,
            };
          })
        );
      } catch (error) {}
    }
    async function getTeams() {
      try {
        const response = await api.get("/teams");
        setTeams(
          response.data.map((val) => {
            return {
              label: `Departamento : ${val.department.name.toUpperCase()} - Equipe :${val.name.toUpperCase()}`,
              value: val.id,
            };
          })
        );
      } catch (error) {}
    }
    async function getServices() {
      try {
        const response = await api.get("/services");
        setServices(
          response.data.map((val) => {
            return {
              label: val.name.toUpperCase(),
              value: val.id,
            };
          })
        );
      } catch (error) {}
    }
    getBookings();
    getTeams();
    getServices();
    getOrders();
    getCustomers();

    async function getCustomers() {
      try {
        const response = await api.get("/customers");
        setCustomers(
          response.data.map((val) => {
            return {
              label: `${val.name.toUpperCase()} - ${val.email.toLowerCase()}`,
              value: val.id,
            };
          })
        );
      } catch (error) {}
    }

    getDepartments();
  }, [updatePage]);

  async function acceptOrder(data) {
    setOrderId(data.id);
    toast.info("Verificando se o cliente já está cadastrado");
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
      let user = response.data.filter((val) => {
        return val.email === data.email;
      });

      if (user.length > 0) {
        toast.info("Cliente Já cadastrado!!");
        setCustomerId(user[0].id);
        setServiceId(data.service_id);
        setStart(parseISO(data.date));
        setBookingCreateModal(!bookingCreateModal);
      } else {
        toast.info("Cadastrando Cliente");
        try {
          const response = await api.post("/customers", {
            name: data.name,
            reference: data.reference,
            city: data.city,
            street: data.street,
            number: data.number,
            email: data.email,
            phone: data.phone,
          });
          toast.success("Cadastrado com sucesso!!!");
          setCustomerId(response.data.id);
          setServiceId(data.service_id);
          setStart(parseISO(data.date));
          setBookingCreateModal(!bookingCreateModal);
        } catch (error) {}
      }
    } catch (error) {}
  }

  async function rejectOrder(id) {
    try {
      const response = await api.put(`/orders/${id}`, {
        is_rejected: true,
      });
      setUpdatePage(!updatePage);
    } catch (error) {}
  }

  async function getServices(e) {
    try {
      const response = await api.get(`/departments/${e.value}/services`);
      setServices(
        response.data.map((val) => {
          return {
            label: val.name.toUpperCase(),
            value: val.id,
          };
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }

  async function getTeams(e) {
    try {
      const response = await api.get(`/departments/${e.value}/teams`);
      setServices(
        response.data.map((val) => {
          return {
            label: val.name.toUpperCase(),
            value: val.id,
          };
        })
      );
    } catch (error) {
      setLoading(false);
    }
  }

  async function onBooking(
    team_id,
    service_id,
    description,
    start,
    serviceTime
  ) {
    try {
      const response = await api.post("/bookings", {
        team_id,
        service_id,
        customer_id: customerId,
        description,
        start,
        end: start.getTime() + 1000 * 60 * 60 * serviceTime,
      });

      try {
        const response = await api.put(`/orders/${orderId}`, {
          is_approved: true,
        });
        setBookingCreateModal(false);
        setUpdatePage(!updatePage);
      } catch (error) {}
    } catch (error) {}
  }

  async function handleBooking({
    team_id,
    service_id,
    description,
    start,
    serviceTime,
  }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        team_id: Yup.string().required("Favor Selecionar a equipe de trabalho"),
        service_id: Yup.string().required("Favor Selecionar um serviço"),
        description: Yup.string().required(
          "Insira alguma descrição importante sobre o serviço que será executado"
        ),
        start: Yup.date().required("Favor preencher a data"),
        serviceTime: Yup.number("Formato Incorreto").required(
          "Favor preencher o tempo de execução do serviço"
        ),
      });
      await schema.validate(
        {
          team_id,
          service_id,
          description,
          start,
          serviceTime,
        },
        {
          abortEarly: false,
        }
      );

      onBooking(team_id, service_id, description, start, serviceTime);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  async function handleUpdateBooking({
    team_id,
    service_id,
    description,
    start,
    end,
    status,
  }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        team_id: Yup.string().required("Favor Selecionar a equipe de trabalho"),
        service_id: Yup.string().required("Favor Selecionar um serviço"),
        description: Yup.string().required(
          "Insira alguma descrição importante sobre o serviço que será executado"
        ),
        start: Yup.date().required("Favor preencher a data"),
        end: Yup.date().required("Favor preencher a data"),
        status: Yup.string().required("Favor preencher o status do serviço"),
      });
      await schema.validate(
        {
          team_id,
          service_id,
          description,
          start,
          end,
          status,
        },
        {
          abortEarly: false,
        }
      );

      onUpdate(team_id, service_id, description, start, end, status);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  async function onUpdate(
    team_id,
    service_id,
    description,
    start,
    end,
    status
  ) {
    try {
      toast.info("Atualizando Agendamento");
      const response = await api.put(`/bookings/${bookingId}`, {
        team_id,
        service_id,
        description,
        start,
        end,
        status,
      });
      toast.success("Atualizado com sucesso");
      setBookingEditModal(false);
      setUpdatePage(!updatePage);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function eventClick(event) {
    try {
      const response = await api.get(`/bookings/${event.event.id}`);
      setBookingId(response.data.id);
      setBooking(response.data);
      setCustomer(response.data.customer);
      var date1 = new Date(response.data.start);
      var date2 = new Date(response.data.end);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600));
      console.log(diffDays);
      setServiceTime(diffDays);
      setBookingEditModal(!bookingEditModal);
    } catch (error) {
      console.log(error);
      toast(error.response.data.error);
    }
  }

  async function dateClick(event) {
    setStart(event.date);
    setModalBookingCreate(true);
  }
  async function handleBookingSave({
    description,
    start,
    team_id,
    service_id,
    customer_id,
    serviceTime,
  }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        customer_id: Yup.string().required("Favor selecionar um cliente"),
        team_id: Yup.string().required("Favor Selecionar a equipe de trabalho"),
        service_id: Yup.string().required("Favor Selecionar um serviço"),
        description: Yup.string().required(
          "Insira alguma descrição importante sobre o serviço que será executado"
        ),
        start: Yup.date().required("Favor preencher a data"),
        serviceTime: Yup.number("Formato Incorreto").required(
          "Favor preencher o tempo de execução do serviço"
        ),
      });
      await schema.validate(
        {
          customer_id,
          team_id,
          service_id,
          description,
          start,
          serviceTime,
        },
        {
          abortEarly: false,
        }
      );

      onSave(description, start, team_id, service_id, customer_id, serviceTime);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  async function onSave(
    description,
    start,
    team_id,
    service_id,
    customer_id,
    serviceTime
  ) {
    try {
      const response = await api.post("/bookings", {
        team_id,
        service_id,
        customer_id,
        description,
        start,
        end: start.getTime() + 1000 * 60 * 60 * serviceTime,
      });
      setModalBookingCreate(!modalBookingCreate);
      setUpdatePage(true);
    } catch (error) {
      toast.error(error.response.error);
    }
  }

  async function onDelete() {
    try {
      toast.info("Excluindo agendamento");
      const response = await api.delete(`/bookings/${bookingId}`);
      toast.success("Agendamento excluido com sucesso");
      setBookingEditModal(false);
      setShowAlert(false);
      setUpdatePage(!updatePage);
    } catch (error) {
      setBookingEditModal(false);
      setShowAlert(false);
      toast.error(error.response.data.error);
    }
  }
  return (
    <Container>
      {orders.map((val) => {
        return (
          <Order
            key={val.id}
            data={val}
            accept={(data) => acceptOrder(data)}
            reject={(id) => rejectOrder(id)}
          />
        );
      })}
      <Calendar
        data={bookings}
        eventClick={(event) => eventClick(event)}
        dateClick={(date) => dateClick(date)}
      />
      <Modal
        title="Registrar Agendamento"
        open={bookingCreateModal}
        handleClose={() => setBookingCreateModal(!bookingCreateModal)}
      >
        <Form
          initialData={{
            team_id: "",
            service_id: serviceId,
            description: "",
            start: start,
            serviceTime: 1,
          }}
          ref={formRef}
          onSubmit={handleBooking}
        >
          <FormContainer>
            <Select
              placeholder="Selecione a Equipe"
              name="team_id"
              options={teams}
            />
            <Select
              placeholder="Altere o Serviço se necessário"
              name="service_id"
              options={services}
            />

            <Input
              type="text"
              name="description"
              placeholder="Descrição do serviço"
            />

            <DatePicker name="start" />

            <Select
              placeholder="Tempo de Execução"
              name="serviceTime"
              options={ArrayServiceTime}
            />
            <Button type="submit" title="Agendar Serviço" />
          </FormContainer>
        </Form>
      </Modal>

      <Modal
        title="Editar Agendamento"
        open={bookingEditModal}
        handleClose={() => setBookingEditModal(!bookingEditModal)}
      >
        <Form
          initialData={{
            team_id: booking.team_id,
            service_id: booking.service_id,
            description: booking.description,
            start: parseISO(booking.start),
            end: parseISO(booking.end),
            status: booking.status,
          }}
          ref={formRef}
          onSubmit={handleUpdateBooking}
        >
          <FormContainer>
            <CustomerName>
              <b>Cliente :</b>
              {customer.name}{" "}
            </CustomerName>
            <CustomerCity>
              <b>Cidade :</b>
              {customer.city}
            </CustomerCity>
            <CustomerAddress>
              <b>Endereço : </b>
              {customer.street}, numero {customer.number}
            </CustomerAddress>
            <CustomerAddress>
              <b>Referência : </b>
              {customer.reference}
            </CustomerAddress>
            <Select
              placeholder="Selecione a Equipe"
              name="team_id"
              options={teams}
            />
            <Select
              placeholder="Altere o Serviço se necessário"
              name="service_id"
              options={services}
            />

            <Input
              type="text"
              name="description"
              placeholder="Descrição do serviço"
            />

            <DatePicker name="start" />

            <DatePicker name="end" />
            <Select
              placeholder="Status do Serviço"
              name="status"
              options={ArrayServiceStatus}
            />
            <Button type="submit" title="Atualizar" />
          </FormContainer>
        </Form>
        <ButtonDelete onClick={() => setShowAlert(true)}>Apagar</ButtonDelete>
      </Modal>

      <Modal
        title="Cadastrar Agendamento"
        open={modalBookingCreate}
        handleClose={() => setModalBookingCreate(!modalBookingCreate)}
      >
        <Form
          initialData={formInitialData}
          ref={formRef}
          onSubmit={handleBookingSave}
        >
          <FormContainer>
            <Select
              placeholder="Selecione a cliente desejado"
              name="customer_id"
              options={customers}
            />
            <Select
              placeholder="Selecione a categoria do serviço"
              name="department_id"
              options={departments}
              onChange={getServices}
            />
            <Select
              placeholder="Selecione o serviço"
              name="service_id"
              options={services}
            />
            <Select
              placeholder="Selecione a Equipe"
              name="team_id"
              options={teams}
            />

            <Input
              type="text"
              name="description"
              placeholder="Descrição do serviço"
            />
            <DatePicker name="start" />

            <Select
              placeholder="Tempo de Execução"
              name="serviceTime"
              options={ArrayServiceTime}
            />
            <Button title="Agendar" type="submit" />
          </FormContainer>
        </Form>
      </Modal>
      <AlertConfirmation
        show={showAlert}
        onHide={() => setShowAlert(false)}
        onConfirm={onDelete}
      />
    </Container>
  );
}
