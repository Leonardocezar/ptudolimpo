import React, { useEffect, useState, useRef } from "react";

import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Table from "~/components/Table";
import Modal from "~/components/Modal";
import ContainerLoading from "~/components/Loading";
import Input from "~/components/Form/Input";
import Button from "~/components/Form/SubmitButton";
import Select from "~/components/Form/Select";

import api from "~/services/api";
import { AraryUserModule } from "~/utils";
import { Container, FormContainer } from "./styles";
export default function Workers() {
  const [loading, setLoading] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [id, setId] = useState("");
  const [module, setModule] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const formRef = useRef(null);
  const [columns, setColumns] = useState([
    { title: "Nome", field: "name" },
    { title: "Email", field: "email" },
    { title: "Criado em ", field: "createdAt", type: "datetime" },
    { title: "Modificado em", field: "updatedAt", type: "datetime" },
  ]);
  useEffect(() => {
    async function getWorkers() {
      try {
        const response = await api.get("/users");
        setWorkers(response.data);
      } catch (error) {}
    }
    getWorkers();
  }, [updatePage]);

  async function handleSubmit({ name, email, password, module }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Favor Preencher o nome"),
        email: Yup.string()
          .email("Formato de emial fora do padrãO")
          .required("Favor Preencher o email"),
        password: Yup.string()
          .min(6, "A senha precisa ter no mínimo 6 caracteres")
          .required("Favor preencher a senha e acesso do usuário"),
        module: Yup.string().required("Favor Preencher o departamento"),
      });
      await schema.validate(
        { name, email, password, module },
        {
          abortEarly: false,
        }
      );
      onSave(name, email, password, module);
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

  async function onSave(name, email, password, module) {
    setModalCreate(false);
    setLoading(true);
    try {
      const response = await api.post("/users", {
        avatar:
          "https://storagetudolimpo.s3-sa-east-1.amazonaws.com/images/profile/profile.png",
        name,
        email,
        password,
        module,
      });
      toast.success("Cadastrado com sucesso");
      setUpdatePage(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
      setModalCreate(true);
    }
  }

  async function handleUpdate({ name, email, oldPassword, password, module }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Favor Preencher o nome"),
        email: Yup.string()
          .email("Formato de emial fora do padrãO")
          .required("Favor Preencher o email"),
        oldPassword: Yup.string()
          .min(6, "A senha precisa ter no mínimo 6 caracteres")
          .required("Favor preencher a senha e acesso do usuário"),
        password: Yup.string()
          .min(6, "A senha precisa ter no mínimo 6 caracteres")
          .required("Favor preencher a senha e acesso do usuário"),
        module: Yup.string().required("Favor Preencher o departamento"),
      });
      await schema.validate(
        { name, email, oldPassword, password, module },
        {
          abortEarly: false,
        }
      );
      onUpdate(name, email, oldPassword, password, module);
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
  async function onUpdate({ name, email, oldPassword, password, module }) {
    setModalEdit(false);
    setLoading(true);
    try {
      const response = await api.put(`/admin/users/${id}`, {
        name,
        email,
        oldPassword,
        password,
        module,
      });
      toast.success("Atualizado com sucesso");
      setUpdatePage(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
      setModalEdit(true);
    }
  }
  async function onDelete(id) {
    setLoading(true);
    try {
      const response = await api.delete(`/users/${id}`);
      setUpdatePage(!updatePage);
      toast.success("Deletado com sucesso!!!");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
    }
  }
  return (
    <Container>
      {loading ? (
        <ContainerLoading />
      ) : (
        <Table
          columns={columns}
          title="Funcionários Cadastrados"
          data={workers}
          actionsPosition={5}
          actions={[
            {
              icon: "add",
              tooltip: "Cadastrar Funcionário",
              isFreeAction: true,
              onClick: (event) => setModalCreate(true),
            },
            {
              icon: "edit",
              tooltip: "Editar Funcionário",
              onClick: (event, rowData) => {
                setName(rowData.name);
                setId(rowData.id);
                setEmail(rowData.email);
                setModule(rowData.module);
                setModalEdit(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Apagar Funcionário",
              onClick: (event, rowData) => {
                onDelete(rowData.id);
              },
            },
          ]}
        />
      )}
      <Modal
        title="Cadastrar Funcionário"
        open={modalCreate}
        handleClose={() => setModalCreate(!modalCreate)}
      >
        <Form
          initialData={{ name: "", department_id: "" }}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <FormContainer>
            <Select
              placeholder="Selecione o Departamento"
              name="module"
              options={AraryUserModule}
            />
            <Input name="name" type="name" placeholder="Nome do usuário" />
            <Input name="email" type="email" placeholder="E-mail do usuário" />
            <Input
              name="password"
              type="password"
              placeholder="Senha para o usuário"
            />
            <Button type="submit" title="Salvar" />
          </FormContainer>
        </Form>
      </Modal>

      <Modal
        title="Editar Funcionário"
        open={modalEdit}
        handleClose={() => setModalEdit(!modalEdit)}
      >
        <Form
          initialData={{
            module: module,
            name: name,
            email: email,
            password: "",
            oldPassword: "",
          }}
          ref={formRef}
          onSubmit={onUpdate}
        >
          <FormContainer>
            <Select
              placeholder="Selecione o Departamento"
              name="module"
              options={AraryUserModule}
            />
            <Input name="name" type="name" placeholder="Nome do usuário" />
            <Input name="email" type="email" placeholder="E-mail do usuário" />
            <Input
              name="oldPassword"
              type="password"
              placeholder="Senha antiga"
            />
            <Input
              name="password"
              type="password"
              placeholder="Inserir a nova senha"
            />
            <Button type="submit" title="Salvar" />
          </FormContainer>
        </Form>
      </Modal>
    </Container>
  );
}
