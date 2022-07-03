import React, { useState, useRef } from "react";
import { Container, FormContainer, Avatar, IconButton } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileRequest } from "~/store/modules/user/actions";
import { Form } from "@unform/web";
import Input from "~/components/Form/Input";
import Button from "~/components/Form/SubmitButton";
import avatar from "~/assets/avatar.png";
import Loading from "~/components/Loading";
export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.user.profile);
  const formRef = useRef();

  async function handleSubmit(info) {
    const data = {
      name: info.name,
      email: info.email,
      oldPassword: info.oldPassword,
      password: info.password,
      id: profile.id,
    };
    dispatch(updateProfileRequest(data));
  }
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Form initialData={profile} onSubmit={handleSubmit}>
          <FormContainer>
            <IconButton>
              <Avatar src={avatar} />
            </IconButton>
            <Input name="name" placeholder="Seu nome" type="doc" />
            <Input name="email" type="email" placeholder="Seu E-mail" />
            <Input
              name="oldPassword"
              type="password"
              placeholder="Senha antiga"
            />
            <Input name="password" type="password" placeholder="Nova Senha" />
            <Button type="submit" title="Atualizar" />
          </FormContainer>
        </Form>
      )}
    </Container>
  );
}
