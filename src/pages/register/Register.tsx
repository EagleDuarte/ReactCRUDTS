import { Button, TextField } from "@mui/material";
import { text } from "node:stream/consumers";
import nodeTest from "node:test";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../data/Interfaces";

import "./register.css";

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
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={onSubmit}>
            <span className="login-form-title">Create your account now! </span>

            <TextField
              name="name"
              type="text"
              placeholder="Digite seu nome"
              className="wrap-input"
            />
            <TextField
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              className="wrap-input"
            />
            <TextField
              name="password"
              type="password"
              placeholder="Digite sua senha"
              className="wrap-input"
            />
            <TextField
              name="repassword"
              type="password"
              placeholder="Digite sua senha"
              className="wrap-input"
            />
            <Button type="submit" className="login-form-btn">
              Register
            </Button>
          </form>

          <div className="text-center">
            <span className="txt1">Já possui uma conta? </span>
            <a className="txt2" href="/">
              Faça seu login!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

/* return (
  <div className="container">
  <div className="container-login">
    <div className="wrap-login">
      <form className="login-form">
        <span className="login-form-title">Create your account now! </span>

        <span className="login-form-title"></span>

        <form onSubmit={onSubmit}>
          <div className="wrap-input">
            <input
              className={name !== "" ? "has-val input" : "input"}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Name"></span>
          </div>
          <div className="wrap-input">
            <input
              className={email !== "" ? "has-val input" : "input"}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <input
              className={password !== "" ? "has-val input" : "input"}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="focus-input"
              data-placeholder="Password"
            ></span>
          </div>
          <div className="wrap-input">
            <input
              className={repassword}
              type="password"
              name="repassword"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <span
              className="focus-input"
              data-placeholder="Repeat Password"
            ></span>
          </div>

          <div className="container-login-form-btn">
            <button className="login-form-btn" type="submit">
              Register
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="txt1">Já possui uma conta? </span>
          <a className="txt2" href="/">
            Faça seu login!
          </a>
        </div>
      </form>
    </div>
  </div>
</div>
);
}

export default Register;*/
