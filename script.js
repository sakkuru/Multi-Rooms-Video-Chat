navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        $("video").attr("src", URL.createObjectURL(stream));

        const peer = new Peer({ key: "ccb51f64-1913-4b6e-a1f2-5264bab87be1" });

        peer.on('open', () => {
            const sfuRoom = peer.joinRoom(roomName, { mode: 'sfu', stream: stream });
            sfuRoom.on('stream', remoteStream => {
                const streamURL = URL.createObjectURL(remoteStream);
                const remoteId = remoteStream.peerId;
                $('#videos').append(
                    '<video autoplay class="remoteVideos" src=' + streamURL + ' id="video_' + remoteId + '">'
                );
            });
            sfuRoom.on('removeStream', stream => {
                $('#video_' + stream.peerId).remove();
            });
        });
    });