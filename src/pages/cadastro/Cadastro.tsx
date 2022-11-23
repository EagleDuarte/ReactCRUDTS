import { Container, Button, Paper, TextField } from "@mui/material";
import nodeTest from "node:test";
import { FormEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../shared/interfaces/Interfaces";
import { Card, paperStyled } from "../../shared/styles/Styles";
import NoteTable from "../home/tables/NoteTable";

function Register() {
  const userList = JSON.parse(
    localStorage.getItem("userList") || "[]"
  ) as User[];

  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (validateRegister(e)) {
      const user: User = {
        name: e.target.elements.name.value,
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
        notes: [],
      };

      userList.push(user);

      localStorage.setItem("userList", JSON.stringify(userList));

      navigate("/");
    }
  };
  function saveUser(e: any) {
    const user: User = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      notes: [],
      name: "",
    };

    userList.push(user);

    SaveUserList("user", userList);
  }

  function SaveUserList(key: string, value: User[]) {
    localStorage.setItem(key, JSON.stringify(value));

    redirectUser();
  }
  function redirectUser() {
    navigate("/");
  }

  const validateRegister = (e: any) => {
    const emailAlreadyUsed = userList.find(
      (user) => user.email === e.target.elements.email.value
    );

    if (
      !e.target.elements.name.value ||
      !e.target.elements.email.value ||
      !e.target.elements.password.value ||
      !e.target.elements.repassword.value
    ) {
      alert("Por favor, preencha todos os campos.");

      return false;
    }

    if (emailAlreadyUsed) {
      alert("O e-mail informado já está sendo utilizado.");

      return false;
    }

    if (
      e.target.elements.password.value !== e.target.elements.repassword.value
    ) {
      alert("Senhas não coincidem.");

      return false;
    }

    return true;
  };

  return (
    <Container sx={Card}>
      <Paper elevation={4} sx={paperStyled}>
        <header>
          <h2>Página de Cadastro</h2>
        </header>
        <form onSubmit={onSubmit}>
          <TextField name="name" type="text" placeholder="Digite seu nome" />
          <TextField name="email" type="text" placeholder="Digite seu e-mail" />
          <TextField
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />
          <TextField
            name="repassword"
            type="password"
            placeholder="Digite sua senha"
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <footer>
          <p>
            Já possui uma conta? <Link to={"/"}>Conecte-se!</Link>
          </p>
        </footer>
      </Paper>
    </Container>
  );
}

export default Register;
