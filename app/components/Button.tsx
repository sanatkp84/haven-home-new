'use client';

import { IconType } from "react-icons";

interface ButtonProps {
    label?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;

}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon // Alias for icon


}) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-90
            transition
            w-full
            ${outline ? 'bg-white , text-black , border-black , hover:shadow-xl' : 'bg-red-600 , text-white , border-red-600 '}
            ${small ? 'py-1 , text-sm , font-light , border-[1px] ' : 'py-2 , text-md , font-bold , border-2'}
        `}>
            {Icon && (
                <Icon 
                    size={24}
                    className="
                        absolute
                        left-4
                        top-2
                    "
                    />
            )}

            {label}

        </button>
    )
};
export default Button;