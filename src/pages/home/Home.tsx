import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { Note, User, UserData } from "../../shared/interfaces/Interfaces";
import EditNoteForm from "./forms/EditNoteForm";
import AddNoteForm from "./forms/AddNoteForm";
import NoteTable from "./tables/NoteTable";

const App = () => {
  const navigate = useNavigate();

  const getUserList = JSON.parse(localStorage.getItem("userList")!);
  const getLoggedUser = JSON.parse(localStorage.getItem("loggedUser")!);

  const getUser = getUserList.find(
    (u: User) => u.email === getLoggedUser?.email
  );

  const [editing, setEditing] = useState(null);
  const [users, setUsers] = useState(getUserList);
  const [user, setUser] = useState(getUser);

  //   const initialFormState = { id: null, name: "", username: "" };
  //   const [currentUser, setCurrentUser] = useState(initialFormState);

  const saveUser = (target_user: User) => {
    localStorage.setItem("loggedUser", JSON.stringify(target_user));
    setUser(target_user);
  };

  const saveUsers = (target_user: User) => {
    const newUserList = [
      ...users.filter((u: User) => u.id != user.id),
      target_user,
    ];
    localStorage.setItem("userList", JSON.stringify(newUserList));
    setUsers(newUserList);
  };

  const addNote = (note: Note) => {
    const target_user = getUser;

    note.id = getUser.notes.length + 1;
    target_user.notes.push(note);

    saveUser(target_user);
    saveUsers(target_user);
  };

  const editNote = (note: Note) => {
    const target_user = getUser;

    const index = target_user.notes.findIndex(
      (originNote: Note) => originNote.id == editing
    );

    target_user.notes[index] = note;

    saveUser(target_user);
    saveUsers(target_user);

    setEditing(null);
  };

  const deleteNote = (id: number) => {
    const target_user = getUser;

    target_user.notes = target_user.notes.filter(
      (originNote: Note) => originNote.id !== id
    );

    saveUser(target_user);
    saveUsers(target_user);
  };

  const updateUser = (id: number, updatedUser: Partial<UserData>) => {
    const searchMessage = getUser.notes.find(
      (nota: UserData) => nota.id === id
    );
    searchMessage.name = updateUser.name;
    // @ts-ignore
    searchMessage.username = updateUser.username;
    setEditing(null);
    setUsers(
      users.map((user: UserData) => (user.id === id ? updatedUser : user))
    );
    localStorage.setItem("userList", JSON.stringify(getUserList));
  };

  return (
    <div className="container">
      <h1>Bem vindo a lista de usuários</h1>
      <div>
        <Button
          onClick={() => {
            localStorage.removeItem("loggedUser");
            navigate("/");
          }}
        >
          Sair
        </Button>
      </div>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <Fragment>
              <EditNoteForm
                editing={editing}
                editNote={editNote}
                setEditing={setEditing}
                currentUser={getLoggedUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <AddNoteForm addNote={addNote} />
            </Fragment>
          )}
        </div>
        <div className="flex-large">
          <NoteTable
            deleteNote={deleteNote}
            setEditing={setEditing}
            notes={getUser.notes}
            editNote={editNote}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
