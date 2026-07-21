const { PythonShell } = require("python-shell");

const bot = async (req, res) => {
  //Here are the option object in which arguments can be passed for the python_test.js.
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: [], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run("app.py", options, function (err, result) {
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    console.log("result: ", result.toString());
    res.send(result.toString());
  });
};

module.exports = {
  bot,
};
