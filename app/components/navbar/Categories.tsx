'use client';
import Container from "../container";


import {
     GiBoatFishing, 
     GiCactus, 
     GiCastle, 
     GiCaveEntrance, 
     GiIsland, 
     GiWindmill 
    } from "react-icons/gi";

import { MdOutlineVilla, MdTempleHindu } from "react-icons/md";

import { 
    TbBeach, 
    TbMountain,
     TbPool 
    } from "react-icons/tb";

import CategoryBox from "../CategoryBox";

import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow2 } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [ 
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has Windmills!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is Modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the Countryside!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a Pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an Island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a Lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has Skiing activities!'
    },
    {
        label: 'Snow',
        icon: BsSnow2,
        description: 'This property has Camping activities!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in a Cave!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the Desert!'
    },
    {
        label: 'Luxe',
        icon: IoDiamond,
        description: 'This property is Luxurios!'
    },
    {
        label: 'Temple',
        icon: MdTempleHindu,
        description: 'This property is in Temple area!'
    },
]

const Categories = () => {

    const params = useSearchParams();

    //extracting categories
    const category = params?.get('category');

    //hiding Categories as all categories like beach , windmill etc is needed only on index page and not on other pages
    const pathname = usePathname();
    const isMainPage = pathname == '/';
    if(!isMainPage){
        return null;
    }


    return (
        <Container>
            <div
                className="
                    pt-2
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                ">
                {categories.map((item)=>(
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category == item.label}
                    />
                ))}
            </div>
        </Container>
    )
};

export default Categories;