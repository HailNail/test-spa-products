import { Button } from "@/components/ui/button";
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
import {
  deleteProduct,
  selectProductById,
} from "@/redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

interface DialogComponentProps {
  productId: number;
}

const DialogComponent = ({ productId }: DialogComponentProps) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <motion.button
            className="absolute top-8 left-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Trash2 strokeWidth={2} stroke="oklch(71% 0.17 22)" />
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => dispatch(deleteProduct(productId))}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DialogComponent;
