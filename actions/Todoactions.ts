"use server";

import { PrismaClient } from "@prisma/client";
import { ITodo } from "../Interfaces";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();


//! get all todos
export const getTodos = async ({ userId }: { userId: string}) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return todos;
};

//! create todo
export const createTodo = async ({
  title,
  body,
  completed,
  user_Id,
}: {
  title: string;
  body?: string | undefined;
  completed: boolean;
  user_Id: string | null;
}) => {
  const todo = await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      userId: user_Id as string,
    },
  }); 
  revalidatePath("/");
  return todo;
};

//! delete todo
export const deleteTodo = async (id: string) => {
  const todo = await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
  return todo;
};

//! update todo
export const updateTodo = async (
  id: string,
  data: Omit<ITodo, "id">
): Promise<ITodo> => {
  // قم بالتحديث بدون تضمين id في data
  const updatedTodo = await prisma.todo.update({
    where: {
      id, // تحديد الـ ID في where
    },
    data, // تمرير البيانات الجديدة (بدون id)
  });

  revalidatePath("/");
  return updatedTodo;
};
