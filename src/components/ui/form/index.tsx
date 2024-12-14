"use client";

import { createContext, useContext, useMemo } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormPrimitive,
} from "./form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RadioGroupProps } from "@radix-ui/react-radio-group";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { SelectProps } from "@radix-ui/react-select";

import { Option } from "@/interfaces/shared";

import { Input, InputNumber, InputPassword, InputProps } from "./input";
import { Button } from "@/components/ui/button";
import { Switch } from "./switch";
import { Textarea, TextareaProps } from "./textarea";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Checkbox } from "./checkbox";
import { Calendar, CalendarProps } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";
import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import Combobox from "./combobox";
import { Upload } from "./upload";
import { Accept } from "react-dropzone";
import { TextEditorProps, UploadFieldProps } from "@/interfaces/form";
import TextEditor from "./textEditor";
import Loader from "@/components/ui/loader";
import Icons from "@/components/ui/icons";

interface IForm {
  children: any;
  form: UseFormReturn<any>;
  disabled?: boolean;
  isLoading?: boolean;
}

interface FormProps extends IForm {
  onSave: SubmitHandler<any>;
  onError?: SubmitErrorHandler<any>;
}

const FormContext = createContext<any>({});

const useForm = () => {
  const context = useContext<IForm>(FormContext);
  if (!context) {
    throw new Error(
      "Form compound components must be rendered within the Form component"
    );
  }
  return context;
};

const Form = ({
  id,
  form,
  className,
  children,
  disabled,
  isLoading,
  onSave,
  onError = (err: any) => console.log(err),
}: React.FormHTMLAttributes<HTMLFormElement> & FormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    form.handleSubmit(onSave, onError)(event);
  };

  const value = useMemo(
    () => ({
      form,
      children,
      disabled,
      isLoading,
    }),
    [form, children, disabled, isLoading]
  );

  return (
    <FormContext.Provider value={value}>
      <FormPrimitive {...form}>
        <form
          id={id}
          className={cn("flex flex-col gap-3", className)}
          onSubmit={handleSubmit}
        >
          {children}
        </form>
      </FormPrimitive>
    </FormContext.Provider>
  );
};

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  className,
  ...rest
}: InputProps & { label?: string; name: string }) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading ? (
              <Loader.Skeleton className="w-full h-10" />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                disabled={disabled}
                {...rest}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const InputPasswordField = ({
  name,
  label,
  placeholder,
  type = "text",
  className,
  ...rest
}: InputProps & { label?: string; name: string }) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading ? (
              <Loader.Skeleton className="w-full h-10" />
            ) : (
              <InputPassword
                placeholder={placeholder}
                {...field}
                type={type}
                disabled={disabled}
                {...rest}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const InputNumberField = ({
  name,
  label,
  placeholder,
  className,
  ...rest
}: InputProps & { label?: string; name: string }) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading ? (
              <Loader.Skeleton className="w-full h-10" />
            ) : (
              <InputNumber
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                {...rest}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SwitchField = ({
  name,
  label,
  className,
}: {
  label?: string;
  name: string;
  className?: string;
}) => {
  const { form, disabled } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Switch
              disabled={disabled}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TextareaField = ({
  name,
  label,
  placeholder,
  className,
  ...rest
}: TextareaProps & { label?: string; name: string }) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading ? (
              <Loader.Skeleton className="w-full h-20" />
            ) : (
              <Textarea
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                {...rest}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RadioField = ({
  name,
  label,
  placeholder,
  className,
  inputClassName,
  options,
  isOptionsLoading = false,
  ...rest
}: RadioGroupProps & {
  label?: string;
  name: string;
  inputClassName?: string;
  placeholder?: string;
  options: Option[];
  isOptionsLoading?: boolean;
}) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading || isOptionsLoading ? (
              <Loader.Skeleton className="w-full h-10" />
            ) : (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className={cn("flex items-start gap-4", inputClassName)}
                disabled={disabled || isOptionsLoading}
                {...rest}
              >
                {options.map((option) => (
                  <FormItem
                    key={option.value}
                    className="flex flex-row items-center gap-2"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="!plabs-caption-regular-14">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CheckboxField = ({
  name,
  label,
  className,
  inputClassName,
  containerClassName,
  options,
  isOptionsLoading = false,
}: CheckboxProps & {
  label?: string;
  name: string;
  containerClassName?: string;
  inputClassName?: string;
  options: Option[];
  isOptionsLoading?: boolean;
}) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={(_: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormItem className={containerClassName}>
            {isLoading || isOptionsLoading ? (
              <Loader.Skeleton className="w-full h-10" />
            ) : (
              options.map((item) => (
                <FormField
                  key={item.value}
                  control={form.control}
                  name={name}
                  render={({ field }: any) => {
                    const values = field.value ?? [];

                    return (
                      <FormItem
                        className={cn(
                          "flex flex-row items-center gap-2",
                          inputClassName
                        )}
                      >
                        <FormControl>
                          <Checkbox
                            checked={values?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...values, item.value])
                                : field.onChange(
                                    values?.filter(
                                      (value: any) => value !== item.value
                                    )
                                  );
                            }}
                            disabled={disabled || isOptionsLoading}
                          />
                        </FormControl>
                        <FormLabel className="!plabs-caption-regular-14">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))
            )}
          </FormItem>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CalendarField = ({
  name,
  label,
  placeholder,
  className,
  mode = "single",
  ...rest
}: CalendarProps & { label?: string; name: string; placeholder?: string }) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          {isLoading ? (
            <Loader.Skeleton className="w-full h-10" />
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <button
                    className={cn(
                      "form-input flex items-center justify-between h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-[#F2F2F2] disabled:bg-[#F8F9FB] disabled:text-[#C7C7C8]",
                      !field.value && "text-muted-foreground",
                      fieldState?.error && "error"
                    )}
                    disabled={disabled}
                  >
                    {mode === "single" ? (
                      field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{placeholder}</span>
                      )
                    ) : field.value ? (
                      <span>
                        {field.value?.from
                          ? format(field.value.from, "PPP")
                          : ""}{" "}
                        - {field.value.to ? format(field.value.to, "PPP") : ""}
                      </span>
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <Icons.Calendar className={cn("w-4 h-4")} />
                  </button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode={mode}
                  selected={field.value}
                  onSelect={field.onChange as any}
                  disabled={disabled}
                  initialFocus
                  {...rest}
                />
              </PopoverContent>
            </Popover>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SelectField = ({
  name,
  label,
  placeholder,
  className,
  options,
  isOptionsLoading = false,
  ...rest
}: SelectProps & {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  options: Option[];
  isOptionsLoading?: boolean;
}) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading || isOptionsLoading ? (
              <Loader.Skeleton className="w-full h-10" />
            ) : (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={disabled || isOptionsLoading}
                {...rest}
              >
                <FormControl>
                  <SelectTrigger className={fieldState?.error && "error"}>
                    <SelectValue
                      placeholder={placeholder ?? "Select an option"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {options.length === 0 ? (
                      <SelectEmpty>No option is available.</SelectEmpty>
                    ) : (
                      options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ComboboxField = ({
  name,
  label,
  placeholder,
  searchPlaceholder,
  className,
  options,
  isOptionsLoading = false,
  multiple,
  createable,
}: {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: Option[];
  isOptionsLoading?: boolean;
  multiple?: boolean;
  createable?: boolean;
}) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          {isLoading ? (
            <Loader.Skeleton className="w-full h-10" />
          ) : (
            <Combobox
              options={options}
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder ?? "Select an option"}
              searchPlaceholder={searchPlaceholder}
              error={!!fieldState?.error}
              disabled={disabled}
              multiple={multiple}
              createable={createable}
              isOptionsLoading={isOptionsLoading}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const UploadField = ({
  label,
  required,
  className,
  status,
  message,
  name,
  uploadClassName,
  ...rest
}: UploadFieldProps & { accept?: Accept }) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading ? (
              <Loader.Skeleton className="w-full h-[136px]" />
            ) : (
              <Upload
                className={cn("max-h-[136px]", [
                  uploadClassName,
                  !!fieldState?.error && "error",
                ])}
                values={field.value}
                onChange={field.onChange}
                disabled={disabled}
                {...rest}
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const TextEditorField = ({
  label,
  required,
  className,
  name,
  ...rest
}: TextEditorProps & { label?: string; name: string }) => {
  const { form, disabled, isLoading } = useForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }: any) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isLoading ? (
              <Loader.Skeleton className="w-full h-[136px]" />
            ) : (
              <TextEditor
                className={cn("", [!!fieldState?.error && "border-red-base"])}
                value={field.value}
                onChange={field.onChange}
                disabled={disabled}
                {...rest}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormButton = ({
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { disabled, isLoading } = useForm();

  return (
    <Button disabled={isLoading || disabled} className={className} {...rest}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Icons.LoaderCircle className="w-5 h-5 animate-spin" />
          <div>Loading...</div>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

Form.Input = InputField;
Form.Password = InputPasswordField;
Form.Number = InputNumberField;
Form.Switch = SwitchField;
Form.Textarea = TextareaField;
Form.Radio = RadioField;
Form.Checkbox = CheckboxField;
Form.Calendar = CalendarField;
Form.Select = SelectField;
Form.Combobox = ComboboxField;
// Form.Upload = UploadField
Form.TextEditor = TextEditorField;
Form.Button = FormButton;

export default Form;
