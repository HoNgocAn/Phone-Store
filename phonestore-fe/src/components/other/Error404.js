import { Link } from "react-router-dom";
import React from 'react';

function Error404(props) {
    return (
        <div>

            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">404</h1>
                    <p className="fs-3"><span className="text-danger">Sorry!</span>page not found</p>
                    <p className="lead">
                        The page you are looking for does not exist.
                    </p>
                    <Link to="/" className="btn btn-outline-primary rounded-0">Go back to the main page</Link>
                </div>
            </div>

        </div>
    );
}

export default Error404;