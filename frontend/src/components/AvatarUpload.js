import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import "./AvatarUpload.css";

function AvatarUpload() {
    const [newAvatar, setNewAvatar] = useState("");
    const [preAvatar, setPreAvatar] = useState("");
    const [active, setActive] = useState(true);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(newAvatar);

        fetch("http://localhost:5050/api/updateAvatar", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newAvatar: preAvatar }),
        })
            .then((response) => {
                sleep(3000);
                setPreAvatar("");
                return response.json();
            })
            .catch((error) => {
                console.log(error);
                console.log("error");
            });

        // const result = await createItem(item);
        // setItems([...items, result]);
    };

    useEffect(() => {
        let url = "http://localhost:5050/api/getAvatar";
        // if (email != undefined) {
        //     url = "http://localhost:5050/api/getAvatar?email=" + email;
        // }
        fetch(url, {
            method: "GET",
            credentials: "include",
            // headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                // get the item
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                // var Buffer = require("buffer/").Buffer;
                // console.log(Buffer.from(data.avatar).toString("base64"));
                setNewAvatar(data.avatar);

                // setNewAvatar(Buffer.from(data.avatar).toString("base64"));
                // setNewAvatar(
                //     `data:image/png;base64,${Buffer.from(data.avatar).toString(
                //         "base64"
                //     )}`
                // );
                // console.log(newAvatar);
                // setNewAvatar(Buffer.from(data.avatar).toString("base64"));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [preAvatar]);

    return (
        <div className="avaUpload">
            <div className="twoAva" onClick={() => setActive(!active)}>
                <div className={active ? "chosenAva active" : "chosenAva"}>
                    <h3 className="h3_avatar">Chosen</h3>
                    <img
                        className="avatar_preview"
                        src={
                            preAvatar != "" && preAvatar != undefined
                                ? preAvatar
                                : "https://www.mybucketlistevents.com/wp-content/themes/genesis-child/images/no-avatar.png"
                        }
                    />
                </div>
                <div className="currentAva">
                    <h3 className="h3_avatar">Current Avatar</h3>
                    <img
                        className="avatar_uploaded"
                        src={
                            newAvatar != undefined && newAvatar != ""
                                ? newAvatar
                                : "https://img.mgwhw.com/upload/24300/2021/08-18/202108181750058ksgu6_small.jpg"
                        }
                    />
                </div>
            </div>
            <form
                className={active ? "avaSubmit active" : "avaSubmit"}
                onSubmit={handleSubmit}
            >
                <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setPreAvatar(base64)}
                />

                <button className="submitAvatar">submit</button>
            </form>
        </div>
    );
}

export default AvatarUpload;
