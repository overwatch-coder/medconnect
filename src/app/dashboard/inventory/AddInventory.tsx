"use client";

import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import CustomInputForm from "@/components/CustomInputForm";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { InventoryType } from "@/types/index";
import { inventorySchema } from "@/schema/inventory.schema";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import {
  createOrEditInventory,
  getAllInventories,
} from "@/actions/inventory.action";
import RenderCustomError from "@/components/RenderCustomError";
import { Inventory } from "@/types/backend";

const AddInventory = () => {
  const { refetch: refetchInventory } = useFetch<Inventory[]>({
    queryFn: async () => await getAllInventories(),
    queryKey: ["inventory"],
    enabled: true,
  });
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<InventoryType>({
    resolver: zodResolver(inventorySchema),
    mode: "all",
  });

  const productName = watch("productName");

  const {
    mutateAsync,
    isPending: pending,
    error,
    isError,
  } = useMutateData({
    mutationFn: async (data: InventoryType) => createOrEditInventory(data),
    config: {
      queryKey: ["inventory"],
    },
    notificationData: {
      type: "New Inventory",
      title: "New inventory has been added",
      description: `The inventory ${productName} has been added successfully`,
    },
  });

  const handleFormSubmit: SubmitHandler<InventoryType> = async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        toast.success("Inventory added successfully");
        queryClient.invalidateQueries({
          queryKey: ["inventory"],
        });
        reset();
        setOpen(false);
        refetchInventory();
      },
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          <Button className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
            <PlusCircle className="text-white" size={20} />
            <span className="font-semibold">Add Product</span>
          </Button>
        </DialogTrigger>

        <DialogContent
          id="hide"
          className="flex flex-col gap-4 w-full max-w-[90vw] md:max-w-[40vw] max-h-[95vh] h-full overflow-hidden"
        >
          <DialogHeader className="overflow-y-scroll scrollbar-hide">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-xl md:text-2xl text-secondary-gray font-bold">
                Add Product
              </span>
              <DialogClose
                onClick={() => {
                  reset();
                  setOpen(false);
                }}
              >
                <X
                  className="border border-red-500 text-red-500 rounded-full"
                  size={25}
                />
              </DialogClose>
            </DialogTitle>

            <div className="flex flex-col gap-5 w-full">
              <RenderCustomError isError={isError} error={error} />

              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-4 w-full"
                method="POST"
              >
                <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
                  <div className="flex flex-col gap-5 rounded-none w-full">
                    <div className="grid grid-cols-1 gap-5 w-full">
                      <CustomInputForm
                        labelName="Product Name"
                        inputName="productName"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter product name"
                      />

                      <CustomInputForm
                        labelName="Product Type"
                        inputName="productType"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter product type"
                      />

                      <CustomInputForm
                        labelName="Quantity In Stock (pcs)"
                        inputName="inStock"
                        register={register}
                        errors={errors}
                        inputType="number"
                        placeholderText="e.g 100"
                      />

                      <CustomInputForm
                        labelName="Received Date"
                        inputName="receivedDate"
                        register={register}
                        errors={errors}
                        inputType="date"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 w-full">
                      <CustomInputForm
                        labelName="Expiry date"
                        inputName="expiryDate"
                        register={register}
                        errors={errors}
                        inputType="date"
                      />

                      <CustomInputForm
                        labelName="Manufacturer"
                        inputName="manufacturer"
                        register={register}
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter manufacturer name"
                      />
                    </div>
                  </div>

                  {/* Submit form button */}
                  <AddInventoryButton pending={pending} reset={reset} />
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddInventory;

const AddInventoryButton = ({
  pending,
  reset,
}: {
  pending: boolean;
  reset: () => void;
}) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-between">
      <DialogClose asChild>
        <Button
          disabled={pending}
          onClick={() => {
            reset();
          }}
          type="reset"
          className="text-center text-primary-gray rounded-none border border-primary-gray/50 bg-transparent hover:bg-transparent w-full"
        >
          Cancel
        </Button>
      </DialogClose>

      <Button
        disabled={pending}
        className="text-white text-center bg-primary-green hover:bg-primary-green rounded-none w-full"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Add"
        )}
      </Button>
    </div>
  );
};
