'use client';
interface HeadingProps{
    title: string;
    subtitle?: string;
    center?: boolean;
}
 const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center,

 }) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}> 
            <div className="text-xl font-bold">
                {title}
            </div>
            <div className="text-neutral-800 mt-2 font-semibold">
                {subtitle}
            </div>
        </div>
    )
};
export default Heading;