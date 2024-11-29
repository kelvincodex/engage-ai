import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface PopupPortalMenuProps {
    children: ReactNode;
    isOpen: boolean;
    anchorEl: Element;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    position?: { x?: number, y?: number };
    closeOnClick?: boolean;
}

export const PopupPortalMenu = ({
                                    children,
                                    closeOnClick = true,
                                    setIsOpen,
                                    position = { x: -50, y: 0 },
                                    isOpen,
                                    anchorEl
                                }: PopupPortalMenuProps) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (anchorEl && !anchorEl.contains(event.target as Node)) {
                setIsOpen?.(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [anchorEl, setIsOpen]);

    useEffect(() => {
        if (isOpen && popupRef.current) {
            const popup = popupRef.current;
            const rect = popup.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let newX = adjustedPosition.x;
            let newY = adjustedPosition.y;

            // Check if popup extends beyond right edge
            if (rect.right > viewportWidth) {
                const overflowRight = rect.right - viewportWidth;
                newX = adjustedPosition.x - (overflowRight / rect.width * 100);
            }

            // Check if popup extends beyond left edge
            if (rect.left < 0) {
                newX = adjustedPosition.x - (rect.left / rect.width * 100);
            }

            // Check if popup extends beyond bottom edge
            if (rect.bottom > viewportHeight) {
                // Position above the anchor element
                newY = -(rect.height + 10);
            }

            // Check if popup extends beyond top edge
            if (rect.top < 0) {
                newY = 10;
            }

            if (newX !== adjustedPosition.x || newY !== adjustedPosition.y) {
                setAdjustedPosition({ x: newX, y: newY });
            }
        }
    }, [isOpen, position]);

    if (!isOpen || !anchorEl) return null;

    const portalRoot = document.body;
    const rect = anchorEl.getBoundingClientRect();

    const style: React.CSSProperties = {
        position: 'absolute',
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        zIndex: 1000,
        transform: `translate(${adjustedPosition.x}%, ${adjustedPosition.y}%)`,
        maxWidth: '200px',
    };

    return ReactDOM.createPortal(
        <div
            ref={popupRef}
            style={style}
            onClick={(e) => {
                if (!closeOnClick) {
                    e.stopPropagation();
                }
            }}
        >
            {children}
        </div>,
        portalRoot
    );
};