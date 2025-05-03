import type { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
});

export interface InputFormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<z.infer<any>>; //any;
}

export const InputFormField: React.FC<InputFormFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field: fieldProps }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...fieldProps}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};