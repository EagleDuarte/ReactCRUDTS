import React, { useState } from "react";
import { Note } from "../../../shared/interfaces/Interfaces";

const AddNoteForm = (props: any) => {
  const model = { id: 0, title: "", description: "" } as Note;
  const [note, setNote] = useState(model);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!note.title || !note.description) return;
        props.addNote(note);
        setNote(note);
      }}
    >
      <label>Titulo</label>
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
      <button>Adicionar</button>
    </form>
  );
};

export default AddNoteForm;
