import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { RoutesConstant } from "@/util/constant/RoutesConstant.ts";
import { routes, RouteType } from "@/router/routes";
import { DashboardLayout } from "@/view/layout/DashboardLayout.tsx";
import {RenderModalComponents} from "@/component/modal/RenderModalComponents.tsx";
import {UserDetailsResponse} from "@/model/response/auth/UserDetailsResponse.tsx";

type ComponentRouteType ={
    isAuthenticated: boolean;
    children: React.ReactNode;
    redirectPath?: string;
    userDetail?: UserDetailsResponse;
}
const ProtectedRoute = ({isAuthenticated, children, redirectPath}:ComponentRouteType) => {
    const location = useLocation();
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to={redirectPath} replace state={{ from: location }} />
    );
};

const GuestRoute = ({ isAuthenticated, children,userDetail }: ComponentRouteType) => {
    const location = useLocation();

    if (isAuthenticated) {
        const from = location.state?.from?.pathname || (userDetail?.userRoleName?.toLowerCase() != import.meta.env.VITE_NIBSS_ROLE ? RoutesConstant.dashboard.overview.index : RoutesConstant.dashboard.overview.admin );
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
};

const AppRoutes = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const isAuthenticated = !!authState?.token;
    const location = useLocation();

    const adminExemptedRoute = [RoutesConstant.dashboard.overview.index,]
    const authRoutes = routes.filter((route: RouteType) => route.metadata.isAuthenticated).filter((it)=>{
        if (authState?.userDetails?.userRoleName?.toLowerCase() == import.meta.env.VITE_NIBSS_ROLE) {
            return !adminExemptedRoute.includes(it.path);
        }
        return true;
    });

    const guestRoutes = routes.filter((route: RouteType) => !route.metadata.isAuthenticated);

    const renderComponent = (value: RouteType) => {
        const { metadata } = value;

        return metadata.hasSidebar ? (
            <DashboardLayout {...metadata?.dashboardProps}>
                <value.component />
            </DashboardLayout>
        ) : (
            <value.component />
        );
    };

    return (
        <Routes>
            {/* Root path handler */}
            <Route
                path="/"
                element={
                    <Navigate
                        to={isAuthenticated ?  RoutesConstant.dashboard.overview.index : RoutesConstant.auth.login}
                        replace
                    />
                }
            />

            {/* Guest Routes */}
            {guestRoutes.map((value, index) => {
                const { metadata } = value;

                if (metadata.redirectTo) {
                    return (
                        <Route
                            key={index}
                            path={value.path}
                            element={<Navigate to={metadata.redirectTo} replace />}
                        />
                    );
                }

                return (
                    <Route
                        key={index}
                        path={value.path}
                        element={
                            <GuestRoute userDetail={authState?.userDetails} isAuthenticated={isAuthenticated}>
                                {renderComponent(value)}
                            </GuestRoute>
                        }
                        {...metadata}
                    />
                );
            })}

            {/* Auth Routes */}
            {authRoutes.map((value, index) => {
                const { metadata } = value;

                if (metadata.redirectTo) {
                    return (
                        <Route
                            key={index}
                            path={value.path}
                            element={<Navigate to={metadata.redirectTo} replace />}
                        />
                    );
                }

                return (
                    <Route
                        key={index}
                        path={value.path}
                        element={
                            <ProtectedRoute
                                isAuthenticated={isAuthenticated}
                                redirectPath={RoutesConstant.auth.login}
                            >
                                {renderComponent(value)}
                            </ProtectedRoute>
                        }
                        {...metadata}
                    />
                );
            })}

            {/* Catch all route for undefined paths */}
            <Route
                path="*"
                element={
                    <Navigate
                        to={isAuthenticated ? (RoutesConstant.dashboard.overview.index ) : RoutesConstant.auth.login}
                        replace
                        state={{ from: location }}
                    />
                }
            />
        </Routes>
    );
};

export const AppRouter = () => {
    return (
        <>
            <AppRoutes />
            <RenderModalComponents />
        </>
    );
};