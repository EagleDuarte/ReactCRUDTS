import "./form-style.css";

import React, { useState } from "react";
import { Note } from "../../../data/Interfaces";
import { Button, TextField } from "@mui/material";

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
      <label>Description</label>
      <input
        className="wrap-input"
        type="text"
        name="title"
        value={note.title}
        onChange={handleInputChange}
      />
      <label>Details</label>
      <input
        className="wrap-input"
        type="text"
        name="description"
        value={note.description}
        onChange={handleInputChange}
      />
      <button className="button style">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
