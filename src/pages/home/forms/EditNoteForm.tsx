import "./form-style.css";

import React, { useEffect, useState } from "react";
import { Note } from "../../../data/Interfaces";
import { Button, TextField } from "@mui/material";

const EditNoteForm = (props: any) => {
  const [user, setUser] = useState(props.currentUser);
  const [note, setNote] = useState({ id: null, title: "", description: "" });

  useEffect(() => {
    if (props.editing) {
      setNote(user.notes.find((n: Note) => n.id == props.editing));
    }

    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          if (props.editing) {
            props.editNote(note);
          }
        }}
      >
        <table>
          <label>Descrição</label>
          <input
            className="wrap-input"
            type="text"
            name="title"
            value={note.title}
            onChange={handleInputChange}
          />
          <label>Detalhamento</label>
          <input
            className="wrap-input"
            type="text"
            name="description"
            value={note.description}
            onChange={handleInputChange}
          />
        </table>
        <button className="button style">Atualizar</button>
        <button
          className="button style"
          onClick={() => props.setEditing(false)}
        >
          Cancelar
        </button>
      </form>
    </main>
  );
};

export default EditNoteForm;
