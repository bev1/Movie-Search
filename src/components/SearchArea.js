import React from 'react';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const SearchArea = (props) => {
    return (
        <div className="row" style={{marginTop: "50px", marginBottom: "0"}}>
            <div className="col s10 offset-s1 m6 offset-m3">
                <form action="" onSubmit={props.handleSubmit}>
                    <div className="row valign-wrapper" style={{marginBottom: "0"}}>
                        <div className="col s10">
                            <div className="input-field">
                                <input type="text" placeholder="Search..." onChange={props.handleChange}/>
                            </div>
                        </div>
                        <div className="col s2">
                        {props.searchTerm === '' ?
                            <button className="btn waves-effect waves-light disabled" type="submit" name="action">
                                <i className="fas fa-search"></i>
                            </button> :
                            <button className="btn waves-effect waves-light" type="submit" name="action">
                                <i className="fas fa-search"></i>
                            </button>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default SearchArea