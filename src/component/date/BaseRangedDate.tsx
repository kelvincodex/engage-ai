import React, { useState, useEffect, useRef } from "react";
import {DefaultButton} from "@/component/button/DefaultButton.tsx";
import {BaseInput, BaseInputProps} from "@/component/input/BaseInput.tsx";
import {PopupPortalMenu} from "@/component/table/component/menu/PopupPortalMenu.tsx";
import CalenderIcon from "@/assets/icon/calender-icon.svg"

export interface BaseRangedDateProps extends BaseInputProps {
    currentDate?: Date;
    selectedStartDate?: string | null;
    selectedEndDate?: string | null;
    isOpen?: boolean;
    handleOnApply?:(startDate?: string, endDate?: string)=> void
    onCurrentDateChange?: (date: Date) => void;
    onSelectedStartDateChange?: (date: string | null) => void;
    onSelectedEndDateChange?: (date: string | null) => void;
    onIsOpenChange?: (isOpen: boolean) => void;
}

export default function BaseRangedDate({
                                           currentDate: propCurrentDate,
                                           selectedStartDate: propSelectedStartDate,
                                           selectedEndDate: propSelectedEndDate,
                                           isOpen: propIsOpen,
                                           onCurrentDateChange,
                                           onSelectedStartDateChange,
                                           onSelectedEndDateChange,
                                           onIsOpenChange,
                                           handleOnApply,
                                           ...props
                                       }: BaseRangedDateProps) {
    const [currentDate, setCurrentDate] = useState(propCurrentDate || new Date());
    const [selectedStartDate, setSelectedStartDate] = useState(propSelectedStartDate || null);
    const [selectedEndDate, setSelectedEndDate] = useState(propSelectedEndDate || null);
    const [isOpen, setIsOpen] = useState(propIsOpen || false);

    const datepickerRef = useRef(null);

    useEffect(() => {
        if (propCurrentDate !== undefined) {
            setCurrentDate(propCurrentDate);
        }
    }, [propCurrentDate]);

    useEffect(() => {
        if (propSelectedStartDate !== undefined) {
            setSelectedStartDate(propSelectedStartDate);
        }
    }, [propSelectedStartDate]);

    useEffect(() => {
        if (propSelectedEndDate !== undefined) {
            setSelectedEndDate(propSelectedEndDate);
        }
    }, [propSelectedEndDate]);

    useEffect(() => {
        if (propIsOpen !== undefined) {
            setIsOpen(propIsOpen);
        }
    }, [propIsOpen]);

    const handleCurrentDateChange = (newDate: Date) => {
        setCurrentDate(newDate);
        onCurrentDateChange?.(newDate);
    };

    const handleSelectedStartDateChange = (newDate: string | null) => {
        setSelectedStartDate(newDate);
        onSelectedStartDateChange?.(newDate);
    };

    const handleSelectedEndDateChange = (newDate: string | null) => {
        setSelectedEndDate(newDate);
        onSelectedEndDateChange?.(newDate);
    };

    const handleIsOpenChange = (newIsOpen: boolean) => {
        setIsOpen(newIsOpen);
        onIsOpenChange?.(newIsOpen);
    };

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`}></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(year, month, i);
            const dayString = day.toLocaleDateString("en-US");
            let className =
                "flex h-[46px] w-[46px] items-center justify-center rounded-full hover:bg-gray-2 mb-2";

            if (selectedStartDate && dayString === selectedStartDate) {
                className += " bg-primary text-white dark:text-white rounded-r-none";
            }
            if (selectedEndDate && dayString === selectedEndDate) {
                className += " bg-primary text-white dark:text-white rounded-l-none";
            }
            if (
                selectedStartDate &&
                selectedEndDate &&
                new Date(day) > new Date(selectedStartDate) &&
                new Date(day) < new Date(selectedEndDate)
            ) {
                className += " bg-dark-3 rounded-none";
            }

            daysArray.push(
                <div
                    key={i}
                    className={className}
                    data-date={dayString}
                    onClick={() => handleDayClick(dayString)}
                >
                    {i}
                </div>,
            );
        }

        return daysArray;
    };

    const handleDayClick = (selectedDay) => {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            handleSelectedStartDateChange(selectedDay);
            handleSelectedEndDateChange(null);
        } else {
            if (new Date(selectedDay) < new Date(selectedStartDate)) {
                handleSelectedEndDateChange(selectedStartDate);
                handleSelectedStartDateChange(selectedDay);
            } else {
                handleSelectedEndDateChange(selectedDay);
            }
        }
    };

    const updateInput = () => {
        if (selectedStartDate && selectedEndDate) {
            return `${selectedStartDate} - ${selectedEndDate}`;
        } else if (selectedStartDate) {
            return selectedStartDate;
        } else {
            return "";
        }
    };

    const toggleDatepicker = () => {
        handleIsOpenChange(!isOpen);
    };

    const handleApply = () => {
        console.log("Applied:", selectedStartDate, selectedEndDate);
        handleIsOpenChange(false);
        handleOnApply && handleOnApply(selectedStartDate, selectedEndDate)
    };

    const handleCancel = () => {
        handleSelectedStartDateChange(null);
        handleSelectedEndDateChange(null);
        handleIsOpenChange(false);
    };

    const handleDocumentClick = (e) => {
        if (datepickerRef.current && !datepickerRef.current.contains(e.target)) {
            handleIsOpenChange(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <section className="">
            <div className="container">
                <div className="mx-auto " ref={datepickerRef}>
                    <div className="relative mb-3">
                        <BaseInput
                            {...props}
                            leftIcon={CalenderIcon}
                            value={updateInput()}
                            onClick={toggleDatepicker}
                            placeholder="Pick a date"
                            readOnly
                        />
                    </div>
                    <PopupPortalMenu
                        closeOnClick={false}
                        position={{x: -100, y: 0}}
                        setIsOpen={handleIsOpenChange}
                        isOpen={isOpen}
                        anchorEl={datepickerRef.current}
                    >
                        <div className="w-[380px] shadow-xs flex mt-2 flex-col rounded-lg border border-stroke bg-white px-4 py-6 sm:px-6 sm:py-[30px] ">
                            <div className="flex items-center justify-between pb-2">
                                <p className="text-base font-medium">
                                    {currentDate.toLocaleString("default", {
                                        month: "long",
                                    })}{" "}
                                    {currentDate.getFullYear()}
                                </p>
                                <div className="flex items-center justify-end space-x-[10px]">
                                    <span
                                        onClick={() =>
                                            handleCurrentDateChange(
                                                new Date(
                                                    currentDate.setMonth(currentDate.getMonth() - 1),
                                                ),
                                            )
                                        }
                                        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary hover:text-white "
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="fill-current"
                                        >
                                          <path
                                              d="M10.825 14.325C10.675 14.325 10.525 14.275 10.425 14.15L4.77501 8.40002C4.55001 8.17502 4.55001 7.82502 4.77501 7.60002L10.425 1.85002C10.65 1.62502 11 1.62502 11.225 1.85002C11.45 2.07502 11.45 2.42502 11.225 2.65002L5.97501 8.00003L11.25 13.35C11.475 13.575 11.475 13.925 11.25 14.15C11.1 14.25 10.975 14.325 10.825 14.325Z"/>
                                        </svg>
                                    </span>
                                    <span
                                        onClick={() =>
                                            handleCurrentDateChange(
                                                new Date(
                                                    currentDate.setMonth(currentDate.getMonth() + 1),
                                                ),
                                            )
                                        }
                                        className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary hover:text-white"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="fill-current"
                                        >
                                          <path
                                              d="M5.17501 14.325C5.02501 14.325 4.90001 14.275 4.77501 14.175C4.55001 13.95 4.55001 13.6 4.77501 13.375L10.025 8.00003L4.77501 2.65002C4.55001 2.42502 4.55001 2.07502 4.77501 1.85002C5.00001 1.62502 5.35001 1.62502 5.57501 1.85002L11.225 7.60002C11.45 7.82502 11.45 8.17502 11.225 8.40002L5.57501 14.15C5.47501 14.25 5.32501 14.325 5.17501 14.325Z"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 pb-2 pt-4 text-sm font-normal capitalize text-body-color">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                                    (day) => (
                                        <div
                                            key={day}
                                            className="flex h-[38px] w-[38px] items-center justify-center"
                                        >
                                            {day}
                                        </div>
                                    ),
                                )}
                            </div>
                            <div
                                id="days-container"
                                className="grid grid-cols-7 text-sm font-medium text-dark"
                            >
                                {renderCalendar()}
                            </div>

                            <div className="flex items-center justify-center space-x-3 pt-4 sm:space-x-4">
                                <DefaultButton onClick={handleCancel}>
                                    Cancel
                                </DefaultButton>

                                <DefaultButton onClick={handleApply}>
                                    Apply
                                </DefaultButton>
                            </div>
                        </div>
                    </PopupPortalMenu>
                </div>
            </div>
        </section>
    );
}