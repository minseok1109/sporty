// import { useEffect, useState } from "react";
// import useAppContext from "../../store"


// export default function Consts() {
//     const [userData, setUserData] = useState([]);
//     const {
//         store: { jwtToken },
//     } = useAppContext();
//     const headers = { Authorization: `JWT ${jwtToken}` };
//     const [{ data: originUserData, loading, error }] = useAxios({
//         url: "http://localhost:8000/accounts/api/user",
//     });

//     useEffect(() => {
//         setUserData(originUserData);
//     }, [originUserData]);
//     console.log("orginUserData:", originUserData);

//     try {
//         const response = axios({
//             url: apiUrl,
//             headers,
//         });
//         console.log("response:", response);

//     } catch (error) {
//         console.log("error: ", error);
//     }
//     const { username, nickname } = userData;

// const APP_ID = "DB06BA41-2A05-40AE-8E69-BB26D88F20D8";
// const USER_ID = { username }
// const NICKNAME = { nickname }
// const THEME = "light" || "dark";

//     return (
//         <>
//             <div>
//                 {loading && <div>Loading</div>}
//                 {error && <div>로딩 중 에러가 발생했습니다.</div>}

//             </div>
//         </>
//     );
// }






