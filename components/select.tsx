import * as React from "react";
import { Controller, type Control, type RegisterOptions } from "react-hook-form";
import { Label } from "./ui/label";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Option = {
  label: string;
  value: string;
};

type FormSelect = {
  name?: string;
  control: Control<any>;
  label?: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
};

export default function FormSelect({
  name = "expertiseLevel",
  control,
  label = "Expertise Level",
  rules = { required: "Please select an expertise level" },
  defaultValue = "",
  disabled = false,
  className = "w-full",
  onValueChange,
}: FormSelect) {
  const options: Option[] = [
    { label: "Beginner", value: "beginner" },
    { label: "Existing Electrician", value: "existing-electrician" },
  ];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        const value = field.value ?? "";

        return (
          <div className={className}>
            <ShadcnSelect
              onValueChange={(val: string) => {
                field.onChange(val);
                if (onValueChange) onValueChange(val);
              }}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger 
                aria-label={name}
                className="bg-slate-600 text-white border-none rounded-lg py-6"
              >
                <SelectValue placeholder={label} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </ShadcnSelect>

            {fieldState.error?.message && (
              <p role="alert" className="text-sm text-red-500 mt-2">
                {String(fieldState.error.message)}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}