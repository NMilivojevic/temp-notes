import React from "react";

interface TabButtonProps {
    index: number;
    isActive: boolean;
    onTabClick: (index: number) => void;
    text: string;
    tabId: number;
}

const TabButton: React.FC<TabButtonProps> = ({
    index,
    isActive,
    onTabClick,
    text,
    tabId,
}) => {
    return (
        <button
            className={`${
                isActive
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-500 text-white"
            } px-2 py-1 rounded`}
            onClick={() => onTabClick(index)}
        >
            {tabId + 1}/ {text ? `${text.slice(0, 5)}` : ""}
        </button>
    );
};

export default TabButton;
