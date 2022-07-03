import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "~/components/Form/Input";
import Button from "~/components/Form/SubmitButton";
import logo from "~/assets/vertical.png";
import { Container, FormContainer, Logo } from "./styles";
import { signInRequest, signOut } from "~/store/modules/auth/actions";

export default function SignIn() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const loading = useSelector((state) => state.auth.loading);
  const initialData = {
    email: "",
    password: "",
  };
  useEffect(() => {
    async function logout() {
      dispatch(signOut());
    }
    logout();
  }, []);
  async function handleSubmit({ email, password }) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("E-mail obrigatório")
          .required("Favor Preencher seu e-mail"),
        password: Yup.string().required("Favor Preencher sua senha"),
      });
      await schema.validate(
        { email, password },
        {
          abortEarly: false,
        }
      );
      dispatch(signInRequest(email, password));
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

  return (
    <Container>
      <Form initialData={initialData} ref={formRef} onSubmit={handleSubmit}>
        <FormContainer>
          <Logo src={logo} />
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Button type="submit" title="Acessar" loading={loading} />
        </FormContainer>
      </Form>
    </Container>
  );
}
