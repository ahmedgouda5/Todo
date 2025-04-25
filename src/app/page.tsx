import AddTodoForm from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ui/toggleTheme";
import TodoTable from "@/components/ui/TodoTable";
import { getTodos } from "../../actions/Todoactions";
import Nav from "@/components/ui/nav";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const todos = await getTodos({userId:userId as string});

  return (
    <div className="flex flex-col gap-20  h-screen mx-auto w-[80%]  ">
      <div className=" flex justify-between items-center  pt-5">
        <h1 className="text-2xl font-bold">TODO</h1>
        <div className="flex gap-10 items-center">
          <ModeToggle />
          <Nav />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <AddTodoForm userId={userId} />
      </div>
      <div className="flex justify-center items-center">
        <TodoTable todos={todos} />
      </div>
    </div>
  );
};

export default page;
