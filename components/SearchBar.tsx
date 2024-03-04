"use client";

import Image from "next/image";
import { TSearchBar } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchManufacturer from "./SearchManufacturer";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt={"magnifying glass"}
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = ({
  modelParam,
  make,
}: {
  modelParam?: string | undefined;
  make?: string;
}) => {
  const [manufacturer, setManufacturer] = useState<string | undefined>(make);
  const { register, handleSubmit } = useForm<TSearchBar>({
    defaultValues: {
      model: modelParam,
    },
  });

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: TSearchBar) => {
    const params = new URLSearchParams(searchParams);

    if (!manufacturer) {
      params.delete("make");
      params.delete("model");
      return;
    } else {
      params.set("make", manufacturer);
    }

    if (!data.model) {
      params.delete("model");
    } else {
      params.set("model", data.model);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="searchbar__item sm:mr-4">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          className="searchbar__input"
          {...register("model")}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
