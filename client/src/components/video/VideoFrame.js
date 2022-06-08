import React, { useContext, useEffect } from "react";
import { MeetContext } from "./meetContext";

const VideoFrame = ({ gameId }) => {
  const domain = "meet.jit.si";
  // eslint-disable-next-line no-unused-vars
  let api = {};

  const [name] = useContext(MeetContext);

  useEffect(() => {
    const options = {
      roomName: `room-${gameId}`,
      width: "100%",
      height: "200px",
      configOverwrite: { prejoinPageEnabled: false, toolbarButtons: [] },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [],
      },
      parentNode: document.querySelector("#meet"),
      userInfo: {
        displayName: name,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api = new window.JitsiMeetExternalAPI(domain, options);
  }, []);

  return <div id="meet"></div>;
};

export default VideoFrame;
