'use client';

import { error } from "console";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";
import { BiRupee } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean; // for price of rooms
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}
const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    register,
    required,
    errors,
}) => {
    return (
        <div className="
            w-full
            relative
        ">
            {
                formatPrice && (
                    <BiRupee
                        size={24}
                        className="
                            text-neutral-700
                            absolute
                            top-6
                            left-2
                        "
                    />
                )
            }

            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" " // label and input ofr animation
                type={type}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-bold
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}

                `}
            />

            {/*label animatiom */}
            <label className={`
                absolute
                text-sm
                duration-150
                transform
                -translate-y-3
                top-6
                z-10
                origin-[0]
                ${formatPrice ? 'left-9' : 'left-4'}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id] ? 'text-rose-500' : 'text-zinc-500'}


            `}>
                {label}
            </label>

        </div>
    )
};
export default Input;