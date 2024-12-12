import React from 'react';

const Separator: React.FC = () => {
    return (
        <div className="w-full flex items-center gap-5">
            <hr className="border-gray-600 w-full" />
            <span className="text-gray-600 font-medium">O</span>
            <hr className="border-gray-600 w-full" />
        </div>
    );
}

export default Separator;
