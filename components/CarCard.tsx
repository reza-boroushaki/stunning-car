"use client";

import { useState } from "react";
import Image from "next/image";

import { CarProps } from "@/types";
import React from "react";

import CustomButton from "./CustomButton";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import CarDetails from "./CarDetails";
import useMediaQuery from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";

interface CarCardProps {
  car: CarProps;
  index: number;
}

const CarCard = ({ car, index }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);

  const { matches } = useMediaQuery("(min-width: 768px)");

  return (
    <motion.div
      className="car-card group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: index * 0.15,
      }}
    >
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          $
        </span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /day
        </span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{drive.toUpperCase()}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{city_mpg} MPG</p>
          </div>
        </div>

        <div className="car-card__btn-container">
          {matches ? (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <>
                  <CustomButton
                    title="View More"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={() => setIsOpen(true)}
                  />
                </>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <CarDetails car={car} />
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <>
                  <CustomButton
                    title="View More"
                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                    rightIcon="/right-arrow.svg"
                    handleClick={() => setIsOpen(true)}
                  />
                </>
              </DrawerTrigger>
              <DrawerContent className="p-6">
                <CarDetails car={car} />
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>

      {/* <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      /> */}
    </motion.div>
  );
};

export default CarCard;
