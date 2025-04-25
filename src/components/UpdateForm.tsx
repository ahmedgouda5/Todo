"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pen } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { updateTodo } from "../../actions/Todoactions";
import { ITodo } from './../../Interfaces/index';

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  body: z.string().min(10, { message: "Body must be at least 10 characters" }),
  completed: z.boolean(),
});

type formType = z.infer<typeof formSchema>;

export default function UpdateForm({ todo }: { todo: ITodo }) {
  const [open, setOpen] = useState(false);

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: todo.title,
      body: todo.body || "",
      completed: todo.completed,
    },
  });

  const onSubmit: SubmitHandler<formType> = async ({
    title,
    body,
    completed,
  }) => {
    await updateTodo(todo.id, { title, body, completed});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-black">
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <DialogDescription>Update your todo item below.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormDescription>This is your todo title.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter details" {...field} />
                    </FormControl>
                    <FormDescription>Describe your todo.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Completed</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save changes</Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
