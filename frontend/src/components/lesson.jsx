import React, {useState} from "react";
import "./lesson.css"
import ResponsivePlayer from "./ResponsePlayer";

const Lesson = () => {
    const [watchComplete, setWatchComplete] = useState(false)

    const handelWatchComplete = ({played}) => {
        if(played >= 0.7 && ! watchComplete){
            setWatchComplete(true)
        }
    }

    return (
        <div>
            <ResponsivePlayer
            url = "https://www.youtube.com/watch?v=o4jfBC0AgIM"
            onProgress={handelWatchComplete}
            />
            <div className={watchComplete ? "marker marker--is-complete" : "marker marker--not-complete"}>
                completted
            </div>
        </div>
    )
}

export default Lesson
