'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];

}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRange,
    onChangeDate,
    onSubmit,
    disabledDates,
    disabled
}) => {
    return (
        <div className="
            bg-white
            rounded-xl
            border-[1px]
            border-neutral-200
            shadow-xl
            overflow-hidden
        ">
            <div className='
                flex
                flex-row
                items-center
                gap-1
                p-4
            '>
                <div className=' text-2xl font-semibold'>
                    &#8377;{price}
                </div>
                <div>
                    per night
                </div>
            </div>
            <hr />

            <Calendar 
                value ={dateRange}
                disabledDates = {disabledDates}
                onChange = {(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className='p-4'>
                <Button
                    disabled= {disabled}
                    label='Reserve'
                    onClick={onSubmit}
                />
            </div>
            <div className='
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-bold
                text-lg
            '>
                <div>Total</div>
                <div>&#8377;{totalPrice}</div>

            </div>

        </div>
    )
};

export default ListingReservation;