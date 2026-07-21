import React from "react";
import ReactPlayer from "react-player"
import "./Responsive-Player.css"

const ResponsivePlayer = ({give_url}) => {
    return (
        <div className="player-wrap">
            <ReactPlayer
                className="react-player"
                url = {give_url}
                controls = {true}
            />
        </div>
    )

}


export default ResponsivePlayer

