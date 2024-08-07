import { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

function Dashboard() {

    const { user } = useContext(UserContext);
    const [groupName, setGroupName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.account?.group?.name) {
            setGroupName(user.account.group.name);
        }
    }, [user]);

    useEffect(() => {
        if (groupName) {
            if (groupName.includes("customer" || "employee")) {
                navigate("/");
            } else if (groupName.includes("admin")) {
                navigate("/user");
            }
        }
    }, [groupName, navigate]);

    return (
        <div>
            {!groupName && <p>Loading...</p>}
        </div>
    );
}


export default Dashboard;
