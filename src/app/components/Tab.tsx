import { ChangeEvent, FC, useEffect, useRef } from "react";

interface TabProps {
    isActive: boolean;
    onTabClick: (id: number) => void;
    onCloseClick: (id: number) => void;
    tabId: number;
    text: string;
    onTextChange: (newText: string) => void;
    canDelete: boolean;
    darkMode: boolean | undefined;
}

const Tab: FC<TabProps> = ({
    onCloseClick,
    tabId,
    text,
    onTextChange,
    canDelete,
    darkMode,
}) => {
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onTextChange(e.target.value);
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    return (
        <div className="relative h-screen">
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                className={`border-2 border-indigo-300 p-2 rounded w-full h-full focus:outline-none ${
                    darkMode ? "bg-neutral-800 text-white" : "bg-white"
                }`}
            />

            {canDelete ? (
                <button
                    className="w-8 h-8 text-xl bg-red-500 text-white rounded absolute top-0 right-0"
                    onClick={() => onCloseClick(tabId)}
                >
                    &times;
                </button>
            ) : null}
        </div>
    );
};

export default Tab;
