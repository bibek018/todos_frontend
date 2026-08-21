import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { todo } from "@/types/type";
import api from "@/lib/app";
import { Trash2 } from "lucide-react";

interface Todohandler {
  todo: todo;
  setUserTodos: React.Dispatch<React.SetStateAction<todo[] | []>>;
}

export const DeleteDialog = ({ todo, setUserTodos }: Todohandler) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      setUserTodos((current) => current.filter((t) => t._id !== todo._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background text-rose-600 dark:text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-500 dark:hover:text-rose-200"
        aria-label="Delete todo"
      >
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="h-9 px-4">Cancel</Button>} />
          <DialogClose render={<Button variant="destructive" className="h-9 px-4" onClick={handleDelete}>Delete</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};