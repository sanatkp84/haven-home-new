'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
            email: '',
            password: ''
        }
    });

    // onSubmit() for form
    // fetch data i.e name email password onSubmit

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        //in [...nextauth.ts] in CredentialsProvider --> credentials is email and password
        //so ...data will fetch these above data
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();               
            }
            
            if(callback?.error){
                toast.error(callback.error);
                
            }
        })
    }

    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal , registerModal]);

    // writing the body content i.e in Modal.tsx 

    const bodyContent = (

        <div className='
            flex
            flex-col
            gap-4
        '>
            <Heading
                title='Welcome back &#129303;'
                subtitle='Login to your account !'
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
                id='password'
                type='password'
                label='Password :'
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
                onClick={() =>  signIn('google')}
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
                mt-4
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
                        Don't have an account?
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
                        Create an account
                    </div>
                </div>
            </div>
        </div>

    );


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)} // handleSubmit to wrap onSubmit
            body={bodyContent}
            footer={footerContent}

        />
    )
};
export default LoginModal;