import React from 'react';
import {Link} from "react-router-dom";

const Pagination = ({total, page, limit, link = "?page="}) => {

    let pagesCount = Math.ceil(+total / +limit);
    let pagesArr = Array(pagesCount).fill().map((e, i) => i + 1);

    return (
        pagesCount < 2
            ? ""
            : <nav>
                <ul className="pagination">
                    <li className={`page-item ${+page < 2 ? "disabled" : ""}`}>
                        <Link className="page-link" to={`${link}${+page - 1}`}>Назад</Link>
                    </li>
                    {pagesArr.map(p => {
                            return (
                                +p === +page
                                    ? <li key={p} className="page-item active" aria-current="page">
                                        <Link className="page-link" to={`${link}${p}`}>{p}</Link>
                                    </li>
                                    : <li key={p} className="page-item">
                                        <Link className="page-link" to={`${link}${p}`}>{p}</Link>
                                    </li>
                            )
                        }
                    )}
                    <li className={`page-item ${+page === +pagesCount ? "disabled" : ""}`}>
                        <Link className="page-link" to={`${link}${+page + 1}`}>Вперед</Link>
                    </li>
                </ul>
            </nav>
    );
};

export default Pagination;