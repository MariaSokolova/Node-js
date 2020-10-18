const time = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Warsaw'
  });

module.exports = { time };
