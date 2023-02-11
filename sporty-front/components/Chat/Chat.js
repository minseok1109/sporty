import SendbirdApp from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import CustomChannelList from "./ChatList";
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider'
import { ChannelListProvider } from '@sendbird/uikit-react/ChannelList/context'
import { useState } from "react";
import React from "react";
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";
import "@sendbird/uikit-react/dist/index.css";
import CustomizedApp from "./ChatList";

export default function Chat({ user }) {
  const APP_ID = "DB06BA41-2A05-40AE-8E69-BB26D88F20D8";

  return (
    <>
      <SBProvider appId={APP_ID} userId={user.username} nickname={user.nickname}>
        <CustomizedApp />
      </SBProvider>
    </>
  );
}

