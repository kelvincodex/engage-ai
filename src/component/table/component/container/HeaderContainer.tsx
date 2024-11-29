import FilledDownChevron from "@/assets/icon/filled-down-chevron.svg";
import FilledUpChevron from "@/assets/icon/filled-up-chevron.svg";
import React from "react";

export const HeaderContainer = (props: any) => {

    // console.log('HeaderContainer', props.column)


    const handleSortClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling up

        console.log('HeaderContainer handleSortClick', e);

        if (!props.enableSorting || !props.sortable) {
            return;
        }

        // Get current sort state
        const currentSort = props.column.getSort();

        // Cycle through sort states: none -> asc -> desc -> none
        let nextSort = 'asc';
        if (currentSort === 'asc') {
            nextSort = 'desc';
        } else if (currentSort === 'desc') {
            nextSort = '';
        }

        // Set the sort on the column
        props.column.setSort(nextSort);

    };

    const sort = props.column.getSort()


    return (
        <div className={'flex items-center gap-3'} onClick={handleSortClick}>
            <p className={'font-semibold'}>{props.displayName}</p>
            {
                props.displayName?.trim() != '' && (
                    <div className={''}>
                        {
                            sort == 'asc' ?
                                <FilledUpChevron/> :
                                sort == 'desc' ?
                                    <FilledDownChevron/> :
                                    <>
                                        <FilledUpChevron/>
                                        <FilledDownChevron className={'mt-1'}/>
                                    </>

                        }
                    </div>
                )
            }
        </div>
    )
}