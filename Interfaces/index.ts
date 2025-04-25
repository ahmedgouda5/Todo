export interface ITodo {
  id: string ;
  title: string;
  body: string | null;
  completed: boolean;
}

export interface IDeleteTodo {
  id: string;
}

