import React from "react";

interface PageLayoutProps {
    children?: React.ReactNode;
}

export const PageLayout = ({children}: PageLayoutProps) => {
    return (
        <div className={'flex flex-col h-screen items-center bg-[#F6F8FA] justify-center p-4'}>

            {children}

        </div>
)
}