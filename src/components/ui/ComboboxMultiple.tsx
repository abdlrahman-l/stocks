"use client";

import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from "@/components/ui/Combobox";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";

type ComboboxMultipleProps = {
  options: {
    label: string;
    value: string;
    key: string;
  }[],
  onValueChange: (v: string[]) => void;
  value?: string[];
  label?: string;
  emptyMessage?: string;
  disabled?: boolean;
}

export function ComboboxMultiple({
  options,
  onValueChange,
  value,
  label = 'Options',
  emptyMessage = "No options found.",
  disabled = false,
}: ComboboxMultipleProps) {


  return (
    <Combobox
      value={value}
      onValueChange={onValueChange}
      multiple
    >
      <ComboboxLabel>{label}</ComboboxLabel>
      <ComboboxAnchor className={cn("flex-wrap px-3 py-2", {
        'data-[focused]:ring-0': disabled
      })}>
        {
          value && (
            <ComboboxBadgeList>
              {value.map((item) => {
                const option = options.find((trick) => trick.value === item);
                if (!option) return null;

                return (
                  <ComboboxBadgeItem key={item} value={item}>
                    {option.label}
                  </ComboboxBadgeItem>
                );
              })}
            </ComboboxBadgeList>
          )
        }

        {
          !disabled && (
            <>
              <ComboboxInput
                placeholder="Select options (max 3)"
                className="h-auto min-w-20 flex-1 text-sm md:text-md"
                disabled={disabled}
              />
              <ComboboxTrigger className="">
                <ChevronDown className="h-4 w-4" />
              </ComboboxTrigger>
            </>
          )
        }
      </ComboboxAnchor>
      {
        !disabled && (
          <ComboboxContent>
            <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
            {options.map((option) => (
              <ComboboxItem key={option.key} value={option.value}>
                {option.label}
              </ComboboxItem>
            ))}
          </ComboboxContent>
        )
      }
    </Combobox>
  );
}