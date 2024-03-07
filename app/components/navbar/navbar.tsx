'use client';

import { User } from "@prisma/client"; // it was created when cmd : npx prisma db push 
import Container from "../container";
import Logo from "./logo"
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";

interface NavbarProps {
    currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    console.log({ currentUser });
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div
                className="
            
            py-4
            border-b-[1px]
            ">
                <Container>
                    <div className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                 ">
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>

            {/**Categories */}
            <Categories/>


        </div>
    );
}
export default Navbar;