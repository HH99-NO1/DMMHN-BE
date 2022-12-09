const fs = require("fs");
const tracer = require("tracer");
const rTracer = require("cls-rtracer");

logger = tracer.colorConsole({
  format: [
    '{{timestamp}} <{{title}}> ({{file}}:{{line}}) {{message}}', // default format
    {
      error:
        '{{timestamp}} <{{title}}> ({{file}}:{{line}}) {{message}}\nCall Stack:\n{{stack}}', // error format
    },
  ],
  dateformat: 'yyyy-mm-dd HH:MM:ss',
  transport: (data) => {
    console.log(data.output);
    fs.appendFile('./logs/server.log', `${rTracer.id()} ${data.rawoutput}\n`, (err) => {
      if (err) throw err;
    });
  },
});

module.exports = logger;
