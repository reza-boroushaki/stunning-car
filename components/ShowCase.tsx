import React from "react";
import SearchBar from "./SearchBar";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import CarCard from "./CarCard";
import { fuels, yearsOfProduction } from "@/constants";
import CustomFilter from "./CustomFilter";
import ShowMore from "./ShowMore";

const ShowCase = async ({ searchParams }: HomeProps) => {
  const allCars = await fetchCars({
    make: searchParams.make || "",
    year: searchParams.year || "2022",
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <div className="mt-12 padding-x padding-y max-width" id="discover">
      <div className="home__text-container">
        <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
        <p>Explore out cars you might like</p>
      </div>

      <div className="home__filters">
        <SearchBar modelParam={searchParams.model} make={searchParams.make} />

        <div className="home__filter-container">
          <CustomFilter
            title="Fuel"
            options={fuels}
            params={searchParams.fuel}
          />
          <CustomFilter
            title="Year"
            options={yearsOfProduction}
            params={searchParams.year}
          />
        </div>
      </div>

      {!isDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {allCars?.map((car, index) => (
              <CarCard car={car} index={index} />
            ))}
          </div>

          <ShowMore
            pageNumber={(searchParams.limit || 10) / 10}
            isNext={(searchParams.limit || 10) > allCars.length}
          />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>{allCars?.message}</p>
        </div>
      )}
    </div>
  );
};

export default ShowCase;
