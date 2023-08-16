import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { title } from "process";

interface HeadingProps {
    title: string;
    description : string;
    icon : LucideIcon;
    iconColor?: string;
    bgColor?: string;

}


const heading = ({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor
}: HeadingProps) => {
    bgColor
  return (
    <>
    <div className=" px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn(" p-2 w-fit rounded-md",bgColor)}>
            <Icon className={cn("w-8 h-8",iconColor)}/>
        </div>
        <div>
        <h2 className="text-2xl font-bold">
            {title}
        </h2>
        <p className=" text-sm text-muted-foreground">
            {description}
        </p>
    </div>
    </div>
    

    </>
  )
}

export default heading
