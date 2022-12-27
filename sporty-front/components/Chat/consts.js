import { useEffect, useState } from "react";


export default function Consts() {
    let [userData, setUserData] = useState({});

    useEffect(() => {
        const header = { Authorization: `JWT ${jwtToken}` };
        const getUserData = () => {
            fetch("http://localhost:8000/accounts/api/user", header)
                .then((response) => response.json())
                .then((json) => console.log(json));
        };
        getUserData();
    }, []);

    let { username, nickname } = userData;

    const APP_ID = "DB06BA41-2A05-40AE-8E69-BB26D88F20D8";
    const USER_ID = { username }
    const NICKNAME = { nickname }
    const THEME = "light" || "dark";


}

