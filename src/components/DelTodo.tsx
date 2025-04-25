"use client";

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTodo } from "../../actions/Todoactions";
import { ITodo } from "../../Interfaces";
import { useState } from "react";
import Spinner from "./ui/spinner";
import UpdateForm from "./UpdateForm";

const DelTodo = ({ todo }: { todo: ITodo }) => {
  const [isLoading, setIsLoading] = useState(false);

  
  return (
    <>
      <UpdateForm todo={todo} />
      <Button
        variant="destructive"
        onClick={async () => {
          setIsLoading(false);
          await deleteTodo(todo.id);
          setIsLoading(true);
        }}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : <Trash />}
      </Button>
    </>
  );
};

export default DelTodo;
