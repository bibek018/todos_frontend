"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { todo } from "@/types/type";
import api from "@/lib/app";

interface TodoHandler {
  todo: todo;
  setUserTodos: React.Dispatch<React.SetStateAction<todo[] | []>>;
}

export const UpdateDialog = ({ todo, setUserTodos }: TodoHandler) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const title = (formData.get("todo") as string).trim();
      const status = formData.get("status") as todo["status"];

      await api.put(`/todos/${todo._id}`, {
        title,
        status,
      });

      setUserTodos((current) =>
        current.map((t) => (t._id === todo._id ? { ...t, title, status } : t))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background dark:border-white/10 dark:bg-white/5 text-cyan-600 dark:text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-500 dark:hover:text-cyan-200"
        aria-label="Edit todo"
      >
        <PencilLine className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>

            <DialogDescription>
              Make changes to your Todo here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor={`todo-${todo._id}`}>Todo</Label>

              <Input
                id={`todo-${todo._id}`}
                name="todo"
                defaultValue={todo.title}
              />
            </Field>

            <Field>
              <Label htmlFor={`status-${todo._id}`}>Status</Label>

              <select
                id={`status-${todo._id}`}
                name="status"
                defaultValue={todo.status}
                className="h-9 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground outline-none transition duration-200 focus:ring-2 focus-visible:ring-ring/50 dark:bg-slate-900"
              >
                <option value="not started" className="bg-background text-foreground">not started</option>
                <option value="in progress" className="bg-background text-foreground">in progress</option>
                <option value="completed" className="bg-background text-foreground">completed</option>
              </select>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" className="h-9 px-4">Cancel</Button>} />

            <DialogClose
              type="submit"
              render={<Button type="submit" className="h-9 px-4">Save changes</Button>}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
