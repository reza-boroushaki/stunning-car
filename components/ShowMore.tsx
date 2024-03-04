"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { ShowMoreProps } from "@/types";
import CustomButton from "@/components/CustomButton";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleNavigation = () => {
    const params = new URLSearchParams(searchParams);
    // Calculate the new limit based on the page number and navigation type
    const newLimit = (pageNumber + 1) * 10;

    // Update the "limit" search parameter in the URL with the new value
    params.set("limit", `${newLimit}`);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
