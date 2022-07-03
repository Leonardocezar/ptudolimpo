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

import { Container, FormContainer } from "./styles";
export default function ServicesPage() {
  const [loading, setLoading] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const formRef = useRef(null);
  const [columns, setColumns] = useState([
    { title: "Nome", field: "name" },
    { title: "Departamento", field: "departament" },
    { title: "Criado em ", field: "createdAt", type: "datetime" },
    { title: "Modificado em", field: "updatedAt", type: "datetime" },
  ]);
  useEffect(() => {
    async function getServices() {
      try {
        const response = await api.get("/services");
        setServices(
          response.data.map((val) => {
            return {
              id: val.id,
              name: val.name.toUpperCase(),
              departament: val.department.name.toUpperCase(),
              createdAt: val.createdAt,
              updatedAt: val.updatedAt,
            };
          })
        );
      } catch (error) {}
    }
    getServices();
  }, [updatePage]);

  useEffect(() => {
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
    getDepartments();
  }, []);

  async function onSave({ department_id, name }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Favor Preencher o nome para o Serviço"),
      });
      await schema.validate(
        { department_id, name },
        {
          abortEarly: false,
        }
      );
      setModalCreate(false);
      setLoading(true);
      try {
        const response = await api.post(
          `/departments/${department_id}/services`,
          {
            name,
          }
        );
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
      const response = await api.put(`/services/${id}`, {
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
    console.log(id);
    try {
      const response = await api.delete(`/services/${id}`);
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
          title="Serviços Cadastrados"
          data={services}
          actionsPosition={5}
          actions={[
            {
              icon: "add",
              tooltip: "Cadastrar Serviço",
              isFreeAction: true,
              onClick: (event) => setModalCreate(true),
            },
            {
              icon: "edit",
              tooltip: "Editar Serviço",
              onClick: (event, rowData) => {
                setName(rowData.name);
                setId(rowData.id);
                setModalEdit(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Apagar Serviço",
              onClick: (event, rowData) => {
                onDelete(rowData.id);
              },
            },
          ]}
        />
      )}
      <Modal
        title="Cadastrar Serviço"
        open={modalCreate}
        handleClose={() => setModalCreate(!modalCreate)}
      >
        <Form
          initialData={{ name: "", department_id: "" }}
          ref={formRef}
          onSubmit={onSave}
        >
          <FormContainer>
            <Select
              placeholder="Selecione o departamento"
              name="department_id"
              options={departments}
            />
            <Input name="name" type="text" />
            <Button type="submit" title="Salvar" />
          </FormContainer>
        </Form>
      </Modal>

      <Modal
        title="Editar Serviços"
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
