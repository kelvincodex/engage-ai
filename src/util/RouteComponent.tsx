import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {RoutesConstant} from "@/util/constant/RoutesConstant.ts";

export const ProtectedRoute = ({ isAuthenticated, children, redirectPath }: {
    isAuthenticated: boolean;
    children: React.ReactNode;
    redirectPath: string;
}) => {
    const location = useLocation();

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to={redirectPath} replace state={{ from: location }} />
    );
};

export const GuestRoute = ({ isAuthenticated, children }: {
    isAuthenticated: boolean;
    children: React.ReactNode;
}) => {
    const location = useLocation();

    if (isAuthenticated) {
        const from = location.state?.from?.pathname || RoutesConstant.dashboard.overview.index;
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
};