// Registro
interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  notes: Array<Note>;
}

interface LoggedUser {
  id?: number;
  name: string;
  email: string;
  notes: Array<Note>;
}

interface UserData {
  id?: number;
  name: string;
  username: string;
}

interface Note {
  id?: number;
  title: string;
  description: string;
}

export type { User, UserData, LoggedUser, Note };
