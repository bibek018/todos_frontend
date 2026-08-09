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
import { Button } from "./ui/button";
import { todo } from "@/types/type";
import api from "@/src/app";
import { useRouter } from "next/navigation";
interface Todohandler {
  todo: todo;
}
import { Trash2 } from "lucide-react";
export const DeleteDialog = ({ todo }: Todohandler) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-200"
        aria-label="Delete todo"
      >
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button className="h-8 px-3">Cancel</Button>} />
          <DialogClose render={<Button className="h-8 px-3" onClick={handleDelete}>Yes</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
