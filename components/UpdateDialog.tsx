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
import { useRouter } from "next/navigation";

interface TodoHandler {
  todo: todo;
}

export const UpdateDialog = ({ todo }: TodoHandler) => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get("todo") as string;
      const status = formData.get("status") as string;

      await api.put(`/todos/${todo._id}`, {
        title,
        status,
      });

      router.refresh();
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
              >
                <option value="not started">not started</option>
                <option value="in progress">in progress</option>
                <option value="completed">completed</option>
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
