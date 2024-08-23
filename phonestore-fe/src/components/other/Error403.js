import { Link } from 'react-router-dom';

function Error403(props) {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">403</h1>
                    <p className="fs-3"><span className="text-danger">Access Denied!</span></p>
                    <p className="lead">
                        You do not have permission to access this page.
                    </p>
                    <Link to="/" className="btn btn-outline-primary rounded-0">Go back to the main page</Link>
                </div>
            </div>
        </div>
    );
}

export default Error403;