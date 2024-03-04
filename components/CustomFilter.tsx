"use client";

import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomFilter = ({
  title,
  options,
  params,
}: {
  title: string;
  options: { title: string; value: string }[];
  params?: string | undefined;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === title) {
      params.delete(title.toLowerCase());
    } else {
      params.set(title.toLowerCase(), value);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <Select onValueChange={handleChange} defaultValue={params}>
      <SelectTrigger className="outline-none">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={title} defaultValue={params}>
          {title}
        </SelectItem>
        {options.map((item, index) => (
          <SelectItem key={index + 1} value={item.value}>
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomFilter;
