"use client";
import Button from "@/components/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";

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
    formState: { errors },
  } = useForm<createProductFormData>({
    resolver: zodResolver(Product),
    defaultValues: {
      name: "Kindle",
      price: 1,
      img: "https://m.media-amazon.com/images/G/32/kindle/journeys/mdTfy5FzV17nneXV/NDQyODI5YWQt._CB545036651_.jpg",
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
      window.location.href = "/";
    } else {
      console.log("Error creating product");
    }
  };

  return (
    <form className="flex flex-col p-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name:" {...register("name")} />
      {errors.name?.type === "required" && (
        <span className="text-red-500">Name is required</span>
      )}
      <Input label="Price:" type="number" {...register("price")} />
      {errors.price && <span className="text-red-500">Price is required</span>}
      <Input label="Image url" {...register("img")} />
      {errors.img && <span className="text-red-500">Image is required</span>}

      <Button type="submit">Submit</Button>
    </form>
  );
}
