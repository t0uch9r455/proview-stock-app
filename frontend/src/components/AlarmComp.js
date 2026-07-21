import React, { useEffect, useState } from "react";
import audio1 from "./audio1.mp3";
import "./AlarmComp.css";

const Alarm = () => {
    const [AlarmHours, setAH] = useState("");
    const [AlarmMinutes, setAM] = useState("");
    const [Stopper, StopAlarm] = useState("");

    const setAlarm = () => {
        var ah = document.querySelector(".hours").value;
        var am = document.querySelector(".minutes").value;
        setAH(ah);
        setAM(am);
        checkAlarm();
    };

    const stopAlarm = () => {
        document.querySelector(".audio1").pause();
        document.querySelector(".audio1").currentTime = 0;
        StopAlarm("True");
        checkAlarm();
    };

    const checkAlarm = () => {
        var checker = setInterval(function () {
            var time = new Date();
            var curr_hr = time.getHours();
            var curr_mt = time.getMinutes();
            var curr_ss = time.getSeconds();

            // console.log(curr_hr + ":" + curr_mt);
            // console.log(AlarmHours + ":" + Alarm Minutes);

            if (
                AlarmHours == curr_hr &&
                AlarmMinutes == curr_mt &&
                curr_ss < 12
            ) {
                if (Stopper == "True") {
                    clearInterval(checker);
                }
                document.querySelector(".audio1").play();
                // console.log("It's trading time now!");
            }
        }, 5000);
    };

    useEffect(() => {
        checkAlarm();
    });

    return (
        <div className="wrapper">
            <div className="alarm_time">
                <h3>Set an Alarm</h3>
                <select className="hours">
                    <option>00</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                </select>
                <select className="minutes">
                    <option>00</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                    <option>32</option>
                    <option>33</option>
                    <option>34</option>
                    <option>35</option>
                    <option>36</option>
                    <option>37</option>
                    <option>38</option>
                    <option>39</option>
                    <option>40</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                    <option>44</option>
                    <option>45</option>
                    <option>46</option>
                    <option>47</option>
                    <option>48</option>
                    <option>49</option>
                    <option>50</option>
                    <option>51</option>
                    <option>52</option>
                    <option>53</option>
                    <option>54</option>
                    <option>55</option>
                    <option>56</option>
                    <option>57</option>
                    <option>58</option>
                    <option>59</option>
                </select>
                <br />
                <button className="setAlarm" onClick={setAlarm}>
                    Set Alarm
                </button>
                <button className="stopAlarm" onClick={stopAlarm}>
                    Stop Alarm
                </button>
            </div>
            <div className="playback">
                <audio className="audio1">
                    <source src={audio1} type="audio/mp3" />
                </audio>
            </div>
        </div>
    );
};

export default Alarm;
