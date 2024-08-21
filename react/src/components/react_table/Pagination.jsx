import React from 'react';
import GLOBALS from '../../utils/Constant';

const DOTS = '...';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

//Custom Hook
const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
        return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);
        return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
        return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
};

const Pagination = ({
    page,
    rowCount,
    totalEntries,
    onPageChange,
}) => {
    const pageSize = GLOBALS.PER_PAGE;
    const totalPages = Math.ceil(rowCount / pageSize);

    //Custom hook calling
    let paginationRange = usePagination({
        totalCount: rowCount,
        pageSize,
        siblingCount: 1,
        currentPage: page
    });

    if (page === 0 || (paginationRange == undefined || paginationRange.length === 0)) {

        paginationRange = [];
    }


    const onNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    const onPrevious = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const start = rowCount > 0 ? (page - 1) * pageSize + 1 : 0;
    const end = rowCount > 0 ? Math.min(page * pageSize, rowCount) : 0;

    return (
        <div className='d-flex'>
            <div className="col-md-5 col-sm-12">
                <div className="pagination-summary">
                    {`Showing ${start} to ${end} of ${rowCount} entries`}
                    {(totalEntries && rowCount !== totalEntries) ? ` (filtered from ${totalEntries} total entries)` : ''}
                </div>
            </div>

            <div className="col-md-7 col-sm-12">
                <div className='d-flex justify-content-end'>
                    <ul className="pagination pagination-rounded">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button className='page-link' onClick={onPrevious}>
                                &laquo;
                            </button>
                        </li>

                        {paginationRange?.map((pageNumber, index) => {
                            if (pageNumber === DOTS) {
                                return <li key={index} className="page-item disabled dots">
                                    <button className='page-link'>
                                        &#8230;
                                    </button>
                                </li>;
                            }

                            return (
                                <li key={index} className={`page-item ${pageNumber === page ? 'active' : ''}`}>
                                    <button onClick={() => onPageChange(pageNumber)} className="page-link" >
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        })}
                        <li className={`page-item ${page === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={onNext}>
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
