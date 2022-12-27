
import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';
import { APP_ID, NICKNAME, USER_ID } from "./consts";

export default function Chat() {
    return (
        <>
            <div className="App">



                <SendbirdApp
                    // Add the two lines below.
                    appId={APP_ID}// Specify your Sendbird application ID. 
                    userId={USER_ID}    // Specify your user ID.
                // nickname={NICKNAME}
                />
            </div>
        </>
    );
}
