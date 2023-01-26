import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import { useEffect, useState } from "react";
import { useStoreState } from "../../store";
import jwt_decode from "jwt-decode";

export default function Chat() {
  const store = useStoreState();
  const { jwtToken } = store;
  useEffect(() => {
    const header = { Authorization: `JWT ${jwtToken}` };
    const getUserData = () => {
      fetch("http://localhost:8000/accounts/api/user", header)
        .then((response) => response.json())
        .then((json) => console.log(json));
    };
    getUserData();
  }, []);
  console.log(jwt_decode(jwtToken));
  const APP_ID = "DB06BA41-2A05-40AE-8E69-BB26D88F20D8";

  return (
    <>
      <div className="App">
        <SendbirdApp
          // Add the two lines below.
          appId={APP_ID} // Specify your Sendbird application ID.
          //   userId={jwtToken && jwt_decode(jwtToken).payload.username}
          //   nickname={jwtToken && jwt_decode(jwtToken).payload.username} // Specify your user ID.
          // nickname={nickname}
        />
      </div>
    </>
  );
}
