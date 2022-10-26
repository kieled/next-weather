import React, {FC} from 'react';

interface ComponentProps {
    name: string
    onClick: (value: string) => void
}

const CityButton: FC<ComponentProps> = ({name, onClick}) => {
    return (
        <button className='bg-white py-3 px-4 rounded-2xl' onClick={() => onClick(name)}>
            {name}
        </button>
    )
}

export default CityButton