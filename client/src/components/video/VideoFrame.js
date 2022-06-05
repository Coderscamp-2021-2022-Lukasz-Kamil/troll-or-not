import React, {useCallback, useContext, useEffect} from 'react';
import { MeetContext } from "./meetContext";


const VideoFrame = ({gameId}) => {

    // const { participant, jitsiName, setJitsiApi } = useMeetingEvents();

  //   const jitsiName = "super-nazwa";
  //   const participant = {
  //       name: "name",
  //   }
  // useEffect(() => {
  //   if (jitsiName) {
  //     console.log("jitsi");
  //     const domain = "meet.jit.si";
  //     const options = {
  //       roomName: jitsiName,
  //       width: 244,
  //       height: 244,
  //       parentNode: document.querySelector("#meet"),
  //       configOverwrite: {
  //         prejoinPageEnabled: false,
  //         toolbarButtons: [],
  //       },
  //       userInfo: {
  //         displayName: participant?.name,
  //       },
  //     };
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const api = new JitsiMeetExternalAPI(domain, options);
  //   //   setJitsiApi(api);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [jitsiName, participant]);


  const domain = "meet.jit.si";
  let api = {};

  const [name] = useContext(MeetContext);

  useEffect(() => {
    const options = {
      roomName: `room-${gameId}`,
      width: "100%",
      height: "100%",
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties if you want
      },
      parentNode: document.querySelector("#meet"),
      userInfo: {
        displayName: name,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    api = new window.JitsiMeetExternalAPI(domain, options);
    // api.addEventListeners({
    //   readyToClose: handleClose,
    //   participantLeft: handleParticipantLeft,
    //   participantJoined: handleParticipantJoined,
    //   videoConferenceJoined: handleVideoConferenceJoined,
    //   videoConferenceLeft: handleVideoConferenceLeft,
    // });
  }, []);

  // useEffect(() => {
  //   if (window.JitsiMeetExternalAPI) {
  //     startMeet();
  //   } else {
  //     alert("JitsiMeetExternalAPI not loaded");
  //   }
  // }, [gameId, startMeet]);

    return <div id="meet"></div>;
}

export default VideoFrame;
