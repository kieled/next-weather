import {FC} from "react";

interface ComponentProps {
    className?: string
    name: string
}

const IconComponent: FC<ComponentProps> = ({className, name}) => {
    const iconName = () => {
        return name.slice(0, -1) + 'd'
    }

    return (
        <svg className={className}>
            <use href={`/icons/${iconName()}.svg#${iconName()}`}/>
        </svg>
    )
}

export default IconComponent