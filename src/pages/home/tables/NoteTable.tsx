import "./note-table.css";

import React from "react";

const NoteTable = (props: any) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Description------</th>
          <th>Details------</th>
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
                  className="button style"
                >
                  Edit
                </button>
                <button
                  onClick={() => props.deleteNote(note.id)}
                  className="button style"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>There's no notes yet!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NoteTable;
