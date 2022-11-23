import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Paper, TextField } from "@mui/material";
import { Card, paperStyled } from "../../shared/styles/Styles";
import { LoggedUser, User } from "../../shared/interfaces/Interfaces";

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
    <>
      <Container sx={Card}>
        <Paper elevation={4} sx={paperStyled}>
          <header>
            <h2>Pagina de Login</h2>
          </header>
          <form onSubmit={onSubmit}>
            <TextField name="email" type="text" label="E-mail" />
            <TextField name="password" type="password" label="Senha" />
            <Button type="submit">Entrar</Button>
            <footer>
              <p>
                Não possui uma conta? <Link to={"/Cadastro"}>Crie uma.</Link>
              </p>
            </footer>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
