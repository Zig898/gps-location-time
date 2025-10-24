function pad(num) {
      return num.toString().padStart(2, '0');
    }

    function updateGMTTime() {
      const now = new Date();
      const hrs = pad(now.getUTCHours());
      const mins = pad(now.getUTCMinutes());
      const secs = pad(now.getUTCSeconds());
      document.getElementById('time').textContent = `${hrs}:${mins}:${secs} (UTC)`;
    }

    updateGMTTime();
    setInterval(updateGMTTime, 1000);  // every second
