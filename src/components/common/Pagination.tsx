import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type itsProps = {
    currentPage: number;
    pageCount: number;
    totalCount : number;
    onClickNext: () => void;
    onClickPrev: () => void;
    onClickPage: (page: number) => void;
}

const Pagination = (props: itsProps): JSX.Element => {
    const {
        currentPage, 
        pageCount, 
        totalCount,
        onClickNext,
        onClickPrev,
        onClickPage,
    } = props;
    const maxPage = Math.ceil(totalCount / pageCount);

    if (maxPage === 1) {
        return <></>;
    }

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < maxPage;

    const handleClickNext = () =>{
        if (hasNext) {
            onClickNext();
        }
        return;
    }
    const handleClickPrev = () => {
        if (hasPrev) {
            onClickPrev();
        }
        return;
    }
    const handleClickPage = (e: number) => {
        if (currentPage !== e) {
            onClickPage(e);
        }
        return;
    }

    return (
        <div className="pagination">
            <FontAwesomeIcon
                icon={["fas","caret-square-left"]}
                onClick={handleClickPrev}
                className={`arrow ${ hasPrev ? '' : 'disabled'}`}/>
            <ul>
                {Array(maxPage).fill(0).map((_,i) => i+1).map(e => {
                    return (
                        <li key={`p${e}`}
                            onClick={() => handleClickPage(e)}
                            className={`page ${e === currentPage ? 'current' : ''}`}
                        >
                        {e}
                        </li>
                    )
                })}
            </ul>
            <FontAwesomeIcon
                    icon={["fas","caret-square-right"]}
                    onClick={handleClickNext}
                    className={`arrow ${ hasNext ? '' : 'disabled'}`}/>
        </div>
    );
}

export default Pagination;
