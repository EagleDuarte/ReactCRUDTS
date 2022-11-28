import { useState } from "react";

import "./login.css";

import { useNavigate } from "react-router-dom";
import { LoggedUser, User } from "../../data/Interfaces";
import { Button, TextField } from "@mui/material";

function Login() {
  const userList = JSON.parse(
    localStorage.getItem("userList") || "[]"
  ) as User[];

  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (validateLogin(e)) {
      const foundUser = userList.find(
        (user) =>
          user.email === e.target.elements.email.value &&
          user.password === e.target.elements.password.value
      );

      const loggedUser: LoggedUser = {
        name: foundUser?.name!,
        email: e.target.elements.email.value,
        notes: foundUser?.notes!,
      };

      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    }
    openUserList();
  };

  function openUserList() {
    navigate("/Home");
  }

  const validateLogin = (e: any) => {
    const foundUser = userList.find(
      (user) =>
        user.email === e.target.elements.email.value &&
        user.password === e.target.elements.password.value
    );

    if (!e.target.elements.email.value || !e.target.elements.password.value) {
      alert("Por favor, preencha todos os campos.");

      return false;
    }

    if (!foundUser) {
      alert("E-mail e/ou senha incorretos.");

      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={onSubmit}>
            <span className="login-form-title">Welcome to your NoteList! </span>

            <TextField
              name="email"
              type="text"
              placeholder="Digite seu e-mail"
              className="wrap-input"
            />
            <TextField
              name="password"
              type="password"
              placeholder="Digite sua senha"
              className="wrap-input"
            />
            <Button type="submit" className="login-form-btn">
              Login
            </Button>
          </form>

          <div className="text-center">
            <span className="txt1">Não possui conta? </span>
            <a className="txt2" href="/Register">
              Criar conta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
