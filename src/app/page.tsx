"use client";

import React, { useEffect, useState } from "react";
import Tab from "./components/Tab";
import TabButton from "./components/TabButton";
import DarkMode from "./components/icons/DarkMode";
import LightMode from "./components/icons/LightMode";

type Tab = {
    id: number;
    text: string;
};

const getInitialTabsState = () => {
    if (typeof window !== "undefined") {
        const savedTabs = localStorage.getItem("tabs");
        if (savedTabs) {
            return JSON.parse(savedTabs);
        } else {
            return [{ id: 0, text: "" }];
        }
    }
};

const getInitialDarkModeState = () => {
    if (typeof window !== "undefined") {
        const savedDarkMode = localStorage.getItem("darkMode");
        return savedDarkMode ? savedDarkMode === "true" : false;
    }
};

const Home: React.FC = () => {
    const [darkMode, setDarkMode] = useState(getInitialDarkModeState);
    const [tabs, setTabs] = useState(getInitialTabsState);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [canDelete, setCanDelete] = useState<boolean>(false);

    const addTab = () => {
        setTabs([...tabs, { id: tabs.length, text: "" }]);
    };

    const switchTab = (index: number) => {
        setActiveTab(index);
    };

    const closeTab = (tabId: number) => {
        const updatedTabs = tabs.filter((tab: Tab) => tab.id !== tabId);
        const updatedTabsWithNewIndexes = updatedTabs.map(
            (tab: Tab, index: number) => ({
                ...tab,
                id: index,
            })
        );
        setTabs(updatedTabsWithNewIndexes);

        if (activeTab >= updatedTabsWithNewIndexes.length) {
            setActiveTab(updatedTabsWithNewIndexes.length - 1);
        }
    };

    const updateTabText = (tabId: number, newText: string) => {
        const updatedTabs = tabs.map((tab: Tab) =>
            tab.id === tabId ? { ...tab, text: newText } : tab
        );
        setTabs(updatedTabs);
    };

    const toggleDarkMode = () => {
        const newDarkModeState = !darkMode;
        setDarkMode(newDarkModeState);
        localStorage.setItem("darkMode", newDarkModeState.toString());
    };

    useEffect(() => {
        if (tabs.length === 1) {
            setCanDelete(false);
        } else {
            setCanDelete(true);
        }
    }, [tabs]);

    useEffect(() => {
        localStorage.setItem("tabs", JSON.stringify(tabs));
    }, [tabs]);

    useEffect(() => {
        const savedTabsString = localStorage.getItem("tabs");
        if (savedTabsString) {
            const savedTabs = JSON.parse(savedTabsString);
            setTabs(savedTabs);
        }
    }, []);

    return (
        <div className={darkMode ? "bg-neutral-900" : "bg-white"}>
            <div className="max-w-screen-xl mx-auto p-5">
                <div className="flex flex-row justify-between items-center mb-5 ">
                    <div className="flex gap-1 flex-wrap">
                        {tabs?.map((tab: Tab, index: number) => (
                            <TabButton
                                key={tab.id}
                                index={index}
                                isActive={activeTab === index}
                                onTabClick={switchTab}
                                text={tab.text}
                                tabId={tab.id}
                            />
                        ))}
                        <button
                            className={`ml-3 cursor-pointer hover:underline ${
                                darkMode ? "text-white" : "text-black"
                            }`}
                            onClick={() => {
                                addTab();
                                switchTab(tabs.length);
                            }}
                        >
                            + New Tab
                        </button>
                    </div>
                    <div className="flex justify-end items-end gap-2">
                        {canDelete ? (
                            <button
                                className={`cursor-pointer hover:underline ${
                                    darkMode ? "text-white" : "text-black"
                                }`}
                                onClick={() => {
                                    setTabs([{ id: 0, text: "" }]);
                                    setActiveTab(0);
                                }}
                            >
                                Clear all tabs
                            </button>
                        ) : null}
                        <button
                            className={`cursor-pointer hover:underline ${
                                darkMode ? "text-white" : "text-black"
                            }`}
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? <LightMode /> : <DarkMode />}
                        </button>
                    </div>
                </div>
                {tabs?.map((tab: Tab, index: number) => {
                    if (tab.id === activeTab)
                        return (
                            <Tab
                                key={tab.id}
                                isActive={activeTab === index}
                                onTabClick={switchTab}
                                onCloseClick={() => closeTab(tab.id)}
                                tabId={tab.id}
                                text={tab.text}
                                onTextChange={(newText: string) =>
                                    updateTabText(tab.id, newText)
                                }
                                canDelete={canDelete}
                                darkMode={darkMode}
                            />
                        );
                })}
            </div>
        </div>
    );
};

export default Home;
