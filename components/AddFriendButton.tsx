"use client";

import React, { useState } from "react";
import Button from "./Button";
import { addFriendValidator } from "@/lib/validations/addFriend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const AddFriendButton = () => {
  type FormData = z.infer<typeof addFriendValidator>;
  const { register, handleSubmit, setError , formState:{errors} } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const [success, setSuccess] = useState<boolean>(false);

  const addFriend = async (email: string) => {
    try {
      const validateEmail = addFriendValidator.parse(email);
      await axios.post("/api/friends/add", {
        email: validateEmail,
      });
      setSuccess(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong." });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };
  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="font-medium text-sm block leading-6 text-gray-500"
      >
        Add Friend Via Email
      </label>

      <div className="mt-2 flex gap-4">
        <input
          type="text"
          {...register("email")}
          className="block w-full rounded-md border-0 py-[1.5] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
          placeholder="email@email.com"
        />
        <Button>Add</Button>
      </div>
      <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
      {success ? (
        <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;
