const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, passes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, passes);
      });
    });
  });
};

nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passes);
});
