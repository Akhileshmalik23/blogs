'use client'
import axios from 'axios'
import useRegisterModal from "@/app/hooks/useRegisterModal"
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { error } from 'console';
import Modal from './Modal';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const toggle = useCallback(() => {
            registerModal.onClose();
            loginModal.onOpen()
        }, [registerModal, loginModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data)
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
               toast.error('Somthing went wrong')

            })
            .finally(() => {
                setIsLoading(false)
            })
    };


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to AirBnb" subtitle="Create an Account" center />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
            <Input
                id="name"
                label="Name"
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
                required
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
                onClick={() => {signIn('github')}}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Already have an account?</div>
                    <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal