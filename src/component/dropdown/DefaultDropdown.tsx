import { useState, useEffect } from "react";
import ChevronDown from "@/assets/icon/chevron-down-icon.svg";

interface DefaultDropdownProps {
    items: { label?: string, value?: string, icon?: string }[],
    classNameContainer?: string,
    value?: string,
    onSelect?: (value?: { label?: string, value?: string, icon?: string }) => void,
}

export const DefaultDropdown = ({ items, classNameContainer, value, onSelect }: DefaultDropdownProps) => {
    const initialSelection = items.find(item => item.value === value) || items[0];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(initialSelection);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (country: typeof items[0]) => {
        setSelectedCountry(country);
        setIsOpen(false);
        if (onSelect) onSelect(country); // Trigger the onSelect callback
    };

    // Update selected country when the `value` prop changes
    useEffect(() => {
        const newSelection = items.find(item => item.value === value);
        if (newSelection && newSelection.value !== selectedCountry.value) {
            setSelectedCountry(newSelection);
            if (onSelect) onSelect(newSelection); // Call onSelect with initial value if present
        }
    }, [value, items, onSelect]);

    return (
        <div className={`relative font-sans ${classNameContainer}`}>
            <div
                className="flex justify-between items-center p-2 border border-gray-300 rounded-md cursor-pointer bg-white"
                onClick={toggleDropdown}
            >
                {/* Selected country flag and label */}
                <div className="flex items-center">
                    <img
                        src={selectedCountry.icon}
                        alt={selectedCountry.label}
                        className="w-6 h-6 rounded-full mr-2"
                    />
                    {selectedCountry.label}
                </div>
                {/* Dropdown arrow icon */}
                <ChevronDown  width={20} />
                {/*<img width={20} src={chevronDown} alt="Dropdown Icon" />*/}
            </div>

            {isOpen && (
                <ul className="absolute overflow-y-scroll h-[150px] w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 py-1">
                    {items.map((country) => (
                        <li
                            key={country.value}
                            className="flex items-center px-3 py-2 cursor-pointer transition duration-200 hover:bg-gray-100"
                            onClick={() => handleSelect(country)}
                        >
                            <img
                                src={country.icon}
                                alt={country.label}
                                className="w-6 h-6 rounded-full mr-2"
                            />
                            {country.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
