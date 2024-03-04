"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchManufacturerProps } from "@/types";
import { manufacturers } from "@/constants";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  // const [value, setValue] = useState<string>("");

  return (
    <div className="search-manufacturer">
      <div className="relative w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open}>
              <Image
                src="/car-logo.svg"
                width={20}
                height={20}
                alt="car logo"
                className="mr-4"
              />
              {manufacturer ? manufacturer : "Volkswagen"}
              <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
          //   className="w-[200px] p-0"
          >
            <Command>
              <CommandInput placeholder="Volkswagen" />
              <CommandEmpty>No manufacturer found.</CommandEmpty>
              <CommandGroup>
                {manufacturers.map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={(currentValue) => {
                      setManufacturer(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        manufacturer === item ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SearchManufacturer;
