import React from "react";

const MoviePage = (props) => {
    const {page, getNextPage, getPrevPage, total} = props;
    return (
        <div className = "d-flex justify-content-between">
       <div>
            <button type="button" className="btn btn-primary">
                Всего {total} страниц             <span className="badge badge-light">Текущая {page}</span>
            </button>
        </div>
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            
            <div className="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary" onClick = {getPrevPage}>Назад</button>
                <button type="button" className="btn btn-secondary" onClick = {getNextPage}>Вперед</button>
            </div>
            
        </div>
        </div>
    )
};

export default MoviePage;
