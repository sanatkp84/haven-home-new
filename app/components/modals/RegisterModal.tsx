'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    // creating form in tsx using react-hook-form
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    // onSubmit() for form
    // fetch data i.e name email password onSubmit

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Success!')
                registerModal.onClose(); // close the registerModal if successfully registered
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error("Oops something went wrong!!"); // if not successfully registered then error
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(()=>{
        loginModal.onOpen();
        registerModal.onClose();
    },[loginModal , registerModal]);

    // writing the body content i.e in Modal.tsx 

    const bodyContent = (

        <div className='
            flex
            flex-col
            gap-4
        '>
            <Heading
                title='Welcome to HavenHome &#128522;'
                subtitle='Create an account !'
            />
            <Input
                id='email'
                label='Email : '
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name : '
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                type='password'
                label='Password : '
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    // writing the footer content i.e in Modal.tsx in which google sign in or github

    const footerContent = (
        <div className='
            flex
            flex-col
            gap-4
            mt-3
        '>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className="
                text-neutral-500
                text-center
                mt-3
                font-light
            ">
                <div className='
                    flex 
                    flex-row i
                    tems-center
                    gap-2 
                    justify-center
                    text-black
                    font-normal
                    text-lg
                 '>
                    <div>
                        Already have an account
                    </div>
                    <div 
                        onClick={toggle}
                        className='
                            text-red-500
                            font-extrabold
                            text-lg
                            cursor-pointer 
                            hover:underline     
                     '>
                        Login
                    </div>
                </div>
            </div>
        </div>

    );


    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Sign Up'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)} // handleSubmit to wrap onSubmit
            body={bodyContent}
            footer={footerContent}

        />
    )
};
export default RegisterModal;