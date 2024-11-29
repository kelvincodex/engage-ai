import {AgGridReact} from "ag-grid-react";
import React, {useEffect, useMemo, useState} from "react";
import {DefaultButton} from "@/component/button/DefaultButton.tsx";
import LeftArrowIcon from "@/assets/icon/left-arrow-icon.svg"
interface PaginationContainerProps {
    gridRef: React.RefObject<AgGridReact>;
    isSsr?: boolean
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;

}

//props?.currentPage
export const PaginationContainer = ({isSsr, ...props}: PaginationContainerProps)=>{
    const api = props?.gridRef.current?.api;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const actCurrentPage = isSsr ? props?.currentPage :  currentPage;
    const actTotalPage = isSsr ?  props?.totalPages : totalPages;

    // Update pagination state whenever it changes
    const updatePaginationState = () => {
        if (api) {
            setCurrentPage(api.paginationGetCurrentPage() + 1);
            setTotalPages(api.paginationGetTotalPages());
        }
    };

    console.log('props?.totalPages', props?.totalPages)
    useEffect(() => {
        if (!isSsr){
            if (api) {
                updatePaginationState();
                api.addEventListener('paginationChanged', updatePaginationState);

                return () => {
                    api.removeEventListener('paginationChanged', updatePaginationState);
                };
            }
        }
    }, [api]);

    // if (!api) return null;

    const handlePageChange = (page: number) => {
        if (!isSsr){
            if (api) {
                api.paginationGoToPage(page - 1);
                setCurrentPage(page);
            }
        }else {
            props?.onPageChange && props?.onPageChange(page)
        }

    };

    const handlePrevious = () => {
        if (!isSsr){
            if (api && actCurrentPage > 1) {
                api.paginationGoToPreviousPage();
                setCurrentPage(prev => prev - 1);
            }
        }else {
            props?.onPageChange && props?.onPageChange(actCurrentPage - 1)
        }

    };

    const handleNext = () => {
        if (!isSsr){
            if (api && actCurrentPage < actTotalPage) {
                api.paginationGoToNextPage();
                setCurrentPage(prev => prev + 1);
            }
        }else {
            props?.onPageChange && props?.onPageChange(actCurrentPage + 1)
        }

    };



    // const handleFirst = () => {
    //     api?.paginationGoToFirstPage();
    // };
    //
    // const handleLast = () => {
    //     api?.paginationGoToLastPage();
    // };


    //todo Generate array of page numbers to display
    const getPageNumbers = () => {
        if (actTotalPage <= 7) {
            // If total pages is 7 or less, show all pages
            return Array.from({ length: actTotalPage }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];

        // Always show first page
        pages.push(1);

        if (actCurrentPage <= 3) {
            // Near the start
            pages.push(2, 3, 4, '...', actTotalPage - 1, actTotalPage);
        } else if (actCurrentPage >= actTotalPage - 2) {
            // Near the end
            pages.push('...', actTotalPage - 3, actTotalPage - 2, actTotalPage - 1, actTotalPage);
        } else {
            // In the middle
            pages.push(
                '...',
                actCurrentPage - 1,
                actCurrentPage,
                actCurrentPage + 1,
                '...',
                actTotalPage
            );
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();


    console.log('pageNumbers', pageNumbers);
    return (
        <div className={'flex items-center justify-between mt-2'}>
            <DefaultButton
                disabled={actCurrentPage === 1}
                onClick={handlePrevious} className={'flex items-center gap-2'} bgType={'secondary'}>
                <LeftArrowIcon />
                Previous
            </DefaultButton>

            <div className={'flex items-center gap-2 max-w-[300px]'}>
                {
                    pageNumbers.map((page, index) =>{
                        if (typeof page === 'number'){

                            return (
                                <button
                                    className={`px-3 py-2 rounded-md  ${actCurrentPage === page ? 'bg-beam-gray-color' : ''}`}
                                    onClick={()=>handlePageChange(page)}
                                    key={index}>
                                    {page}
                                </button>
                            )
                        }
                        return (
                            <span className={'px-2 '} key={index}>
                                  {page}
                            </span>
                        )
                    })

                }
            </div>

            <DefaultButton
                disabled={actCurrentPage === actTotalPage}
                onClick={handleNext} className={'flex items-center gap-2'} bgType={'secondary'}>
                Next
                <LeftArrowIcon className={"rotate-180"} />
            </DefaultButton>
        </div>
    )
}