import {FC} from "react";

interface ComponentProps {
    className?: string
    name: string
}

const IconComponent: FC<ComponentProps> = ({className, name}) => {
    return (
        <svg className={className}>
            <use href={`/icons/${name}.svg#${name}`}/>
        </svg>
    )
}

export default IconComponent