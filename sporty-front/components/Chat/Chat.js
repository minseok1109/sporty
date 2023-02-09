import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";

export default function Chat({ user }) {
  const APP_ID = "DB06BA41-2A05-40AE-8E69-BB26D88F20D8";

  return (
    <>
      <div className="App">
        <SendbirdApp
          // Add the two lines below.
          appId={APP_ID} // Specify your Sendbird application ID.
          userId={user.username}
          nickname={user.nickname} // Specify your user ID.
        />
      </div>
    </>
  );
}
