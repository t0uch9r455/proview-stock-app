import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import axios from "axios";
import "./Avatar.css";

const Avatar = ({ email }) => {
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        let url = "http://localhost:5050/api/getAvatar";
        if (email != undefined) {
            url = "http://localhost:5050/api/getAvatar?email=" + email;
        }
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
                setAvatar(data.avatar);

                // setNewAvatar(Buffer.from(data.avatar).toString("base64"));
                // setNewAvatar(
                //     `data:image/png;base64,${Buffer.from(data.avatar).toString(
                //         "base64"
                //     )}`
                // );
                console.log(avatar);
                // setNewAvatar(Buffer.from(data.avatar).toString("base64"));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [email]);

    return (
        <div>
            <img
                className="avatar_photo"
                // style={{ width: 50, height: 50 }}
                // src={`data:image/jpg;base64,${newAvatar}`}
                src={
                    avatar != undefined && avatar != ""
                        ? avatar
                        : "https://img.mgwhw.com/upload/24300/2021/08-18/202108181750058ksgu6_small.jpg"
                }
            />
        </div>
    );
};

export default Avatar;
