import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export async function fetchCars(filters: FilterProps) {
  const { make, year, model, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "6bdecc61camshec85dac4026acaap13befajsne93c462d6020",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  try {
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
      {
        headers,
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery" || "");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};
