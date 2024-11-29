import {DefaultButton} from "@/component/button/DefaultButton.tsx";
import LeftArrowIcon from "@/assets/icon/left-arrow-icon.svg";
import React from "react";

interface ManualPaginationContainerProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}
export const  ManualPaginationContainer = ({currentPage, onPageChange, totalPages, isLoading}: ManualPaginationContainerProps)=>{

    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];
        pages.push(1);

        if (currentPage <= 3) {
            pages.push(2, 3, 4, '...', totalPages - 1, totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(
                '...',
                currentPage - 1,
                currentPage,
                currentPage + 1,
                '...',
                totalPages
            );
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();


    return (
        <div className={'flex items-center justify-between mt-2'}>
            <DefaultButton
                disabled={currentPage === 1 || isLoading}
                onClick={() => onPageChange(currentPage - 1)}
                className={'flex items-center gap-2'} bgType={'secondary'}>
                <LeftArrowIcon/>
                Previous
            </DefaultButton>

            <div className={'flex items-center gap-2 max-w-[300px]'}>
                {
                    pageNumbers.map((page, index) => {
                        if (typeof page === 'number') {

                            return (
                                <button
                                    className={`px-3 py-2 rounded-md  ${currentPage === page ? 'bg-beam-gray-color' : ''}`}
                                    onClick={() => onPageChange(page)}
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
                disabled={currentPage === totalPages || isLoading}
                onClick={() => onPageChange(currentPage + 1)}
                className={'flex items-center gap-2'} bgType={'secondary'}>
                Next
                <LeftArrowIcon className={"rotate-180"}/>
            </DefaultButton>
        </div>
    )
}


//  const fetchData = async (page: number) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${url}?page=${page}&pageSize=${pageSize}`, fetchOptions);
//       const data = await response.json();
//
//       if (gridApi) {
//         gridApi.setRowData(data.items);
//         setPaginationState({
//           currentPage: page,
//           totalPages: Math.ceil(data.totalItems / pageSize),
//           totalItems: data.totalItems,
//           itemsPerPage: pageSize
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const handlePageChange = (newPage: number) => {
//     fetchData(newPage);
//   };
// const [paginationState, setPaginationState] = useState<PaginationState>({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: pageSize
//   });
//  rowModelType="clientSide"

//todo grid api is ready
// fetchData(1);