import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Container } from "react-bootstrap";
import { useSession } from "next-auth/react";

const Meeting = () => {
    const router = useRouter();
    const [payload, setPayload] = useState(null);
    useEffect(() => {
        setPayload(router.query);
    }, [router.query]);

    useEffect(() => {
        if (payload && payload.meetingNumber && payload.userName && payload.password) {
            (async () => {
                try {
                    const VideoSDK = (await import('@zoomus/websdk/embedded')).default;
                    const client = await VideoSDK.createClient();
                    console.log(client.renderVideo)
                    let meetingSDkElement = document.getElementById('meetingSDkElement');
                    client.init({
                        language: 'en-US',
                        zoomAppRoot: meetingSDkElement,
                        size: "500px"
                    });

                    console.log(payload);
                    if (payload && payload.meetingNumber && payload.userName && payload.password) {
                        const { data } = await axios.post('/api/zoom/', payload);
                        console.log(data);
                        client.join({
                            meetingNumber: payload.meetingNumber,
                            signature: data.signature,
                            sdkKey: data.sdkKey,
                            userName: payload.userName,
                            password: payload.password,
                            tk: ""
                        });
                    }
                } catch (error) {
                    console.error('Error in useEffect:', error);
                }
            })();
        }
    }, [payload]);

    return (
        <Fragment>
            {/* <video id="my-self-view-video" width="1920" height="1080" style={{
                width: '100%',
                height: 'auto'
            }}></video>
            <canvas id="my-self-view-canvas" width="1920" height="1080" style={{
                width: '100%',
                height: 'auto'
            }}></canvas> */}
            <div style={{ width: '98vw', height: '70vh' }} className="d-flex justify-content-center">
                <div id="meetingSDkElement">
                    <h1>Meeting Not Statard Yet!!</h1>
                </div>
            </div>
        </Fragment>
    );
};

// Meeting.displayName = username;
export default Meeting;