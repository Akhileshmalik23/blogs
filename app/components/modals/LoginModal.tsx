"use client";

import { signIn } from "next-auth/react";
// import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
   const router = useRouter();
   const loginModal = useLoginModal();
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      signIn("credentials", {
         ...data,
         redirect: false,
      }).then((callback) => {
         setIsLoading(false);

         if (callback?.ok) {
           
            toast.success("Logged in");
            loginModal.onClose();
            router.refresh()
         }

         if (callback?.error) {
            toast.error(callback.error);
         }
      });
   };

   const bodyContent = (
      <div className="flex flex-col gap-2">
         <Heading title="Welcome back" subtitle="Login to your account" center />
         <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required={true}
         />
         <Input
            id="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required={true}
            type="password"
         />
      </div>
   );

   const footerContent = (
      <div className="flex flex-col gap-4 mt-3">
         <hr />
         <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn("github")}
         />
      
      </div>
   );

   return (
      <Modal
         disabled={isLoading}
         isOpen={loginModal.isOpen}
         title="Login"
         actionLabel="Continue"
         onClose={loginModal.onClose}
         onSubmit={handleSubmit(onSubmit)}
         body={bodyContent}
         footer={footerContent}
      />
   );
};
export default LoginModal;
