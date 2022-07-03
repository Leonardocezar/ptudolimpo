import React, { useEffect, useState, useRef } from "react";

import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Table from "~/components/Table";
import Modal from "~/components/Modal";
import ContainerLoading from "~/components/Loading";
import Input from "~/components/Form/Input";
import InputMask from "~/components/Form/InputMask";
import Button from "~/components/Form/SubmitButton";

import api from "~/services/api";

import { Container, FormContainer } from "./styles";
export default function Customers() {
  const [loading, setLoading] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const formRef = useRef(null);
  const [columns, setColumns] = useState([
    { title: "Nome", field: "name" },
    { title: "Cidade", field: "city" },
    { title: "Email", field: "email" },
    { title: "Criado em ", field: "createdAt", type: "datetime" },
    { title: "Modificado em", field: "updatedAt", type: "datetime" },
  ]);

  const initialData = {
    name: "",
    city: "",
    street: "",
    number: "",
    email: "",
    phone: "",
  };
  useEffect(() => {
    async function getCustomers() {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCustomers();
  }, [updatePage]);

  async function onSave({ name, city, street, number, email, phone }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Favor preencher seu nome"),
        city: Yup.string().required("Favor preencher sua cidade"),
        street: Yup.string().required("Favor preencher sua rua"),
        number: Yup.string().required("Favor preencher o numero da sua casa"),
        email: Yup.string()
          .email("E-mail obrigatório")
          .required("Favor Preencher seu e-mail"),
        phone: Yup.string().required("Favor Preencher seu numero de telefone"),
      });
      await schema.validate(
        { name, city, street, number, email, phone },
        {
          abortEarly: false,
        }
      );
      setModalCreate(false);
      setLoading(true);
      try {
        const response = await api.post("/customers", {
          name,
          city,
          street,
          number,
          email,
          phone,
        });
        setUpdatePage(!updatePage);
        toast.success("Cadastrado com sucesso!!!");
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
        setLoading(false);
        setModalCreate(true);
      }
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

  async function onUpdate({ name, city, street, number, email, phone }) {
    setModalEdit(false);
    setLoading(true);
    try {
      const response = await api.put(`/customers/${id}`, {
        name,
        city,
        street,
        number,
        email,
        phone,
      });
      setUpdatePage(!updatePage);
      toast.success("Atualizado com sucesso!!!");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
      setModalEdit(true);
    }
  }

  return (
    <Container>
      {loading ? (
        <ContainerLoading />
      ) : (
        <Table
          columns={columns}
          title="Clientes Cadastrados"
          data={customers}
          actionsPosition={6}
          actions={[
            {
              icon: "add",
              tooltip: "Cadastrar Cliente",
              isFreeAction: true,
              onClick: (event) => setModalCreate(true),
            },
            {
              icon: "edit",
              tooltip: "Editar Cliente",
              onClick: (event, rowData) => {
                setId(rowData.id);
                setName(rowData.name);
                setCity(rowData.city);
                setStreet(rowData.street);
                setNumber(rowData.number);
                setEmail(rowData.email);
                setPhone(rowData.phone);
                setModalEdit(true);
              },
            },
          ]}
        />
      )}
      <Modal
        title="Cadastrar Cliente"
        open={modalCreate}
        handleClose={() => setModalCreate(!modalCreate)}
      >
        <Form initialData={initialData} ref={formRef} onSubmit={onSave}>
          <FormContainer>
            <Input type="text" name="name" placeholder="Nome" />
            <Input type="text" name="city" placeholder="Cidade" />
            <Input type="text" name="street" placeholder="Rua" />
            <Input type="text" name="number" placeholder="Número" />
            <Input type="email" name="email" placeholder="E-mail" />
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              placeholder="Telefone"
            />
            <Button type="submit" title="Salvar" />
          </FormContainer>
        </Form>
      </Modal>

      <Modal
        title="Editar Cliente"
        open={modalEdit}
        handleClose={() => setModalEdit(!modalEdit)}
      >
        <Form
          initialData={{ name, city, street, number, email, phone }}
          ref={formRef}
          onSubmit={onUpdate}
        >
          <FormContainer>
            <Input type="text" name="name" placeholder="Nome" />
            <Input type="text" name="city" placeholder="Cidade" />
            <Input type="text" name="street" placeholder="Rua" />
            <Input type="text" name="number" placeholder="Número" />
            <Input type="email" name="email" placeholder="E-mail" />
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              placeholder="Telefone"
            />
            <Button type="submit" title="Atualizar" />
          </FormContainer>
        </Form>
      </Modal>
    </Container>
  );
}
