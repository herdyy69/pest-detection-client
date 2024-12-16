import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogIcon } from "./dialog";
import Icons from "@/components/ui/icons";

interface DialogFormInterface {
  trigger?: React.ReactNode;
  triggerButton?: React.ReactNode;
  title?: string;
  body?: string;
  layout?: "default" | "center";
  color?: "blue" | "red" | "warning" | "success";
  className?: string;
  dialogIcon?: "info" | "warning";
  confirmText?: string;
  isLoading?: boolean;
  rejectText?: string;
  confirmButton?: any;
  defaultState?: boolean;
  onConfirm?: () => void;
  onReject?: () => void;
  onClose?: () => void;

  triggerClassName?: string;
}

const getColorStyle = (color: string) => {
  let style = {
    icon: "text-primary-2-500 bg-primary-2-100",
    title: "text-primary-2-500",
    body: "text-text-grey",
    cancel: "btn-outline-primary",
    confirm: "btn-primary",
  };

  switch (color) {
    case "red":
      style.icon = "text-red-500 bg-red-100";
      style.confirm = "btn-error";
      break;
    case "warning":
      style.icon = "text-warning-500 bg-warning-100";
      style.confirm = "btn-warning";
      break;
    case "success":
      style.icon = "text-success-500 bg-success-100";
      style.confirm = "btn-success";
      break;
    default:
      break;
  }

  return style;
};

const getIcon = (icon: any) => {
  switch (icon) {
    case "info":
      return <Icons.Info className="w-6 h-6" />;
    default:
      return <></>;
  }
};

export const DialogConfirmation = ({
  trigger,
  triggerButton,
  triggerClassName,
  title = "Confirmation",
  body = "The data will permanently delete, action cannot be undone. Are you sure you want to proceed with this action?",
  layout = "center",
  className,
  dialogIcon,
  color = "blue",
  rejectText,
  confirmText,
  onConfirm,
  onReject,
  isLoading = false,
  form,
  confirmButton,
  defaultState = false,
  onClose,
  ...rest
}: DialogFormInterface & ButtonProps) => {
  const handleInteractOutside = (e: Event) => {
    e.preventDefault();
  };
  const layoutCenter = layout === "center";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={triggerClassName} type="button" {...rest}>
          {trigger}
        </button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={handleInteractOutside}
        id="dialog-confirmation"
        className={cn("max-w-xl hide-scrollbar !p-0", className)}
      >
        <div
          className={cn(
            "flex gap-6 pt-10 pb-6 px-6",
            layoutCenter && "flex-col items-center justify-center"
          )}
        >
          {dialogIcon && (
            <DialogIcon className={getColorStyle(color).icon}>
              {getIcon(dialogIcon)}
            </DialogIcon>
          )}
          <div
            className={cn("flex flex-col gap-2", layoutCenter && "text-center")}
          >
            <DialogTitle className={getColorStyle(color).title}>
              {title}
            </DialogTitle>
            <DialogDescription className={getColorStyle(color).body}>
              {body}
            </DialogDescription>
          </div>
        </div>
        <DialogFooter className="bg-white border-t border-primary-2-100">
          <div className={"w-full flex justify-end py-4 px-4 gap-2"}>
            <DialogClose
              className={cn(
                "btn btn-outline-greyscale py-1 px-8 ",
                layoutCenter && "w-full",
                getColorStyle(color).cancel
              )}
              type="button"
              onClick={() => {
                onClose && onClose();
                onReject && onReject();
              }}
              disabled={isLoading}
            >
              {rejectText ?? "Batal"}
            </DialogClose>
            <DialogClose
              className={cn(
                "btn btn-red px-8",
                layoutCenter && "w-full",
                getColorStyle(color).confirm
              )}
              disabled={isLoading}
              type={form ? "submit" : "button"}
              form={form}
              onClick={() => onConfirm && onConfirm()}
            >
              {confirmText ?? "Delete"}
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
