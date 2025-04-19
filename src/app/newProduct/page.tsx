"use client";
import Button from "@/components/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Product = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, { message: "Price must be greater than 0" })
    .positive(),
  img: z
    .string({ required_error: "Image is required" })
    .url("Image must be a valid URL"),
});

type createProductFormData = z.infer<typeof Product>;

export default function NewProduct() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<createProductFormData>({
    resolver: zodResolver(Product),
    defaultValues: {
      name: "",
      price: 0,
      img: "",
    },
  });

  const onSubmit: SubmitHandler<createProductFormData> = async (data) => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res) {
      const { id } = await res.json();
      console.log("Product created with id: ", id);
    } else {
      console.log("Error creating product");
    }
  };

  console.log(errors);
  console.log(watch());
  console.log(watch("name"));

  return (
    <form className="container" onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="Kindle" {...register("name")} />
      {errors.name?.type === "required" && (
        <span className="text-red-500">Name is required</span>
      )}
      <input type="number" defaultValue={199} {...register("price")} />
      {errors.price && (
        <span className="text-red-500">Price is required</span>
      )}
      <input
        defaultValue="https://m.media-amazon.com/images/G/32/kindle/journeys/mdTfy5FzV17nneXV/NDQyODI5YWQt._CB545036651_.jpg"
        {...register("img")}
      />
      {errors.img && (
        <span className="text-red-500">Image is required</span>
      )}

      <Button type="submit">Submit</Button>
    </form>
  );
}
