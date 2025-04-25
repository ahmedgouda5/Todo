

import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { ITodo } from "../../../Interfaces";
import DelTodo from "../DelTodo";
import { Badge } from "./badge"

export default function TodoTable( {todos}:{todos:ITodo[]}) {


  return (
    <Table>
      <TableCaption>A list of your Todos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">IDF</TableHead>
          <TableHead>title</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo?.id}>
            <TableCell className="font-medium">
            {todo.title}
            </TableCell>
            <TableCell>{todo.body}</TableCell>
            <TableCell>{todo.completed ? <Badge variant="default">Completed</Badge> : <Badge variant="outline">Not Completed</Badge>}</TableCell>
            <TableCell className=" flex  justify-end items-center space-x-2">
              <DelTodo todo={todo}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
 