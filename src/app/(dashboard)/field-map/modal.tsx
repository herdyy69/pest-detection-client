"use client";
import { LucidePencilLine, Plus } from "lucide-react";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plants, InsertPlants } from "@/server/_schema/plants";
import Form from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  serviceCreatePlants,
  serviceUpdatePlants,
} from "@/server/_services/plants";
import { toast } from "@/components/ui/alert/toast";
import { useRouter } from "next/navigation";

export const Modal = ({ name, dataY }: { name: string; dataY?: any }) => {
  const router = useRouter();
  const [modal, setModal] = React.useState(false);

  const form = useForm<Plants>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(InsertPlants),
  });

  useEffect(() => {
    if (name === "update" && dataY) {
      form.reset({
        name: dataY.name,
        description: dataY.description,
      });
    }
  }, [dataY]);

  async function onSave(data: Plants) {
    try {
      if (name === "update") {
        await serviceUpdatePlants(dataY.id, data).then(() => {
          toast.success({
            title: "Success",
            body: "Field updated successfully",
          });
          form.reset({
            name: "",
            description: "",
          });
          setModal(false);
          router.refresh();
        });
        return;
      }

      await serviceCreatePlants(data).then(() => {
        toast.success({
          title: "Success",
          body: "Field created successfully",
        });
        form.reset({
          name: "",
          description: "",
        });
        setModal(false);
        router.refresh();
      });
    } catch (error) {
      if (error instanceof Error) {
        const validationErrors = JSON.parse(error.message);
        toast.error({
          title: "Error",
          body: validationErrors[0].message || "Failed to create class",
        });
      }
    }
  }
  return (
    <div>
      <Dialog
        open={modal}
        onOpenChange={(isOpen) => {
          setModal(isOpen);
        }}
      >
        <DialogTrigger asChild>
          {name === "create" ? (
            <button className="btn btn-green flex items-center">
              <Plus className="h-4 w-4 mr-1" />
              Add Field
            </button>
          ) : (
            <LucidePencilLine size={16} className="cursor-pointer" />
          )}
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px] min-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {name === "create" ? "Add Field" : "Update Field"}
            </DialogTitle>
            <DialogDescription>
              {name === "create"
                ? "Add a new field to the field map"
                : "Update field information here"}
            </DialogDescription>
          </DialogHeader>
          <Form form={form} onSave={onSave}>
            <Form.Input
              label="Field Name"
              name="name"
              placeholder="Enter field name"
            />
            <Form.Textarea
              label="Field Description"
              name="description"
              placeholder="Enter field description"
            />
            <DialogFooter className="flex flex-row items-center">
              <Form.Button className="w-max btn btn-green">Save</Form.Button>
              <Form.Button
                className="w-max btn btn-yellow"
                type="reset"
                onClick={() => {
                  form.reset();
                }}
              >
                Reset
              </Form.Button>
              <DialogClose asChild>
                <Form.Button className="w-max btn btn-red" type="button">
                  Cancel
                </Form.Button>
              </DialogClose>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
