import * as React from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type FilterAccordionProps = {
  title: string;
  options: Option[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  defaultOpen?: boolean;
};

export function FilterAccordion({
  title,
  options,
  selectedValue,
  onChange,
  defaultOpen = true,
}: FilterAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="mb-4">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
    className="w-full flex items-center justify-between bg-[#627080] text-white px-5 py-4 rounded-lg"
      >
        <span className="font-outfit text-base font-medium">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Options */}
      {isOpen && (
        <div className="mt-3 px-2 flex flex-col gap-3">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name={title}
                value={opt.value}
                checked={selectedValue === opt.value}
                onChange={() => onChange?.(opt.value)}
                className="hidden"
              />
              {/* Custom radio */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedValue === opt.value
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                {selectedValue === opt.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                )}
              </div>
              <span className="text-gray-700 font-outfit text-sm">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}