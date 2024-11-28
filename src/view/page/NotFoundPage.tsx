import {PageLayout} from "@/view/layout/PageLayout.tsx";
import React from "react";

export const NotFoundPage = () => {

    return (
        <PageLayout>
            <div className="flex flex-1 items-center justify-center w-full">
                <h2 className={' text-center'}>...Ops</h2>
                <h2 className={' text-center '}>Page Not Found</h2>
            </div>
        </PageLayout>
    )
}