import { Button } from "@mui/material";
import React from "react";

const NoteTable = (props: any) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Detalhamento</td>
          <td>Descrição</td>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        {props.notes && props.notes.length > 0 ? (
          props.notes.map((note: any, index: number) => (
            <tr key={note.id || index}>
              <td>{note.title}</td>
              <td>{note.description}</td>
              <td>
                <button
                  onClick={() => {
                    props.setEditing(note.id);
                  }}
                  className="button muted-button"
                >
                  Editar
                </button>
                <button
                  onClick={() => props.deleteNote(note.id)}
                  className="button muted-button"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>Sem Recados</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NoteTable;
