function updateGMTTime() {
      const now = new Date();
      const gmtHrs = now.getUTCHours();  // gives a string like: "Tue, 25 Jul 2023 17:21:46 GMT"
      const gmtMins = now.getUTCMinutes();
      document.getElementById('time').textContent = gmtMins;
      // document.getElementById('time').textContent = gmtMins;
    }
// Update immediately and then every second
updateGMTTime();
setInterval(updateGMTTime, 1);
