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
import { PencilLine } from "lucide-react";
import { todo } from "@/types/type";
import api from "@/src/app";

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
        className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
        aria-label="Edit todo"
      >
        <PencilLine className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>

            <DialogDescription>
              Make changes to your Todo here. Click save when you're done.
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
                className="h-9 w-full min-w-0 rounded-lg border border-input bg-slate-950 px-2.5 py-1 text-sm text-slate-100 outline-none transition duration-200 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="not started" className="bg-slate-950 text-slate-100">not started</option>
                <option value="in progress" className="bg-slate-950 text-slate-100">in progress</option>
                <option value="completed" className="bg-slate-950 text-slate-100">completed</option>
              </select>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-white">
              Cancel
            </DialogClose>

            <DialogClose
              type="submit"
              className="inline-flex items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20 hover:text-cyan-100"
            >
              Save changes
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
