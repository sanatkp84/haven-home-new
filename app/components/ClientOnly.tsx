'use client';

import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode
}

// to check we are server side rendering or not
const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false);
    // as soon as this component is loaded means it has finished server-side rendering 
    // so change the value to true
    useEffect(() => {
        setHasMounted(true);
    }, [])
    // if the component is not loaded then return null
    if (!hasMounted) {
        return null;
    }
    return (
        <>
            {children}
        </>
    )
};
export default ClientOnly;