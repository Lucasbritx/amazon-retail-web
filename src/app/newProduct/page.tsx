"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function NewProduct() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      {errors.exampleRequired && <span className="text-red-500">This field is required</span>}
      <input type="submit" />
    </form>
  );
}
