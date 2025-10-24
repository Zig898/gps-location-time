function updateGMTTime() {
      const now = new Date();
      const gmtString = now.getTime();  // gives a string like: "Tue, 25 Jul 2023 17:21:46 GMT"
      document.getElementById('time').textContent = gmtString;
    }
// Update immediately and then every second
updateGMTTime();
setInterval(updateGMTTime, 1);
