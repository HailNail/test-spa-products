"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddCardButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products/add-card");
  };

  return (
    <Button onClick={handleClick} className="rounded-xl">
      + Add Card
    </Button>
  );
};

export default AddCardButton;
