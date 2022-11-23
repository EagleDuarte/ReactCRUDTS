import React, { useEffect, useState } from "react";
import { Note } from "../../../shared/interfaces/Interfaces";

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
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (props.editing) {
          props.editNote(note);
        }
      }}
    >
      <label>Detalhamento</label>
      <input
        type="text"
        name="title"
        value={note.title}
        onChange={handleInputChange}
      />
      <label>Descrição</label>
      <input
        type="text"
        name="description"
        value={note.description}
        onChange={handleInputChange}
      />
      <button>Atualizar</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancelar
      </button>
    </form>
  );
};

export default EditNoteForm;
