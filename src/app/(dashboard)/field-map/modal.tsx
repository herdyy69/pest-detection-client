"use client";
import { Plus } from "lucide-react";
import React from "react";
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
import { serviceCreatePlants } from "@/server/_services/plants";
import { toast } from "@/components/ui/alert/toast";

export const Modal = () => {
  const form = useForm<Plants>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(InsertPlants),
  });

  async function onSave(data: Plants) {
    try {
      await serviceCreatePlants(data).then(() => {
        toast.success({
          title: "Success",
          body: "Class created successfully",
        });
        form.reset({
          name: "",
          description: "",
        });
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
      <Dialog>
        <DialogTrigger asChild>
          <button className="btn btn-green flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Add Field
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white sm:max-w-[425px] min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Field</DialogTitle>
            <DialogDescription>Add a new field to your form</DialogDescription>
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
