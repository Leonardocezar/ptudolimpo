import React, { useEffect, useState, useRef } from "react";

import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Table from "~/components/Table";
import Modal from "~/components/Modal";
import ContainerLoading from "~/components/Loading";
import Input from "~/components/Form/Input";
import Button from "~/components/Form/SubmitButton";

import api from "~/services/api";

import { Container, FormContainer } from "./styles";
export default function Departments() {
  const [loading, setLoading] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const formRef = useRef(null);
  const [columns, setColumns] = useState([
    { title: "Nome", field: "name" },
    { title: "Criado em ", field: "createdAt", type: "datetime" },
    { title: "Modificado em", field: "updatedAt", type: "datetime" },
  ]);
  useEffect(() => {
    async function getDepartments() {
      try {
        const response = await api.get("/departments");
        setDepartments(
          response.data.map((val) => {
            return {
              id: val.id,
              name: val.name.toUpperCase(),
              createdAt: val.createdAt,
              updatedAt: val.updatedAt,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getDepartments();
  }, [updatePage]);

  async function onSave({ name }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required(
          "Favor Preencher o nome para o departamento"
        ),
      });
      await schema.validate(
        { name },
        {
          abortEarly: false,
        }
      );
      setModalCreate(false);
      setLoading(true);
      try {
        const response = await api.post("/departments", {
          name,
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

  async function onUpdate({ name }) {
    setModalEdit(false);
    setLoading(true);
    try {
      const response = await api.put(`/departments/${id}`, {
        name,
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
  async function onDelete(id) {
    setLoading(true);
    try {
      const response = await api.delete(`/departments/${id}`);
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
          title="Departamentos Cadastrados"
          data={departments}
          actionsPosition={4}
          actions={[
            {
              icon: "add",
              tooltip: "Cadastrar Departamento",
              isFreeAction: true,
              onClick: (event) => setModalCreate(true),
            },
            {
              icon: "edit",
              tooltip: "Editar Departamento",
              onClick: (event, rowData) => {
                setName(rowData.name);
                setId(rowData.id);
                setModalEdit(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Apagar Departamento",
              onClick: (event, rowData) => {
                onDelete(rowData.id);
              },
            },
          ]}
        />
      )}
      <Modal
        title="Cadastrar Departamento"
        open={modalCreate}
        handleClose={() => setModalCreate(!modalCreate)}
      >
        <Form initialData={{ name: "" }} ref={formRef} onSubmit={onSave}>
          <FormContainer>
            <Input name="name" type="text" />
            <Button type="submit" title="Salvar" />
          </FormContainer>
        </Form>
      </Modal>

      <Modal
        title="Editar Departamento"
        open={modalEdit}
        handleClose={() => setModalEdit(!modalEdit)}
      >
        <Form initialData={{ name: name }} ref={formRef} onSubmit={onUpdate}>
          <FormContainer>
            <Input name="name" type="text" />
            <Button type="submit" title="Atualizar" />
          </FormContainer>
        </Form>
      </Modal>
    </Container>
  );
}
