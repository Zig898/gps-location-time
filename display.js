function pad(n){ return n.toString().padStart(2,'0'); }

    function updateDisplay(offsetHours){
      const now = new Date();
      const utcMillis = now.getTime(); // already UTC ms
      const adjusted = new Date(utcMillis + offsetHours * 3600_000);
      const h = pad(adjusted.getUTCHours());
      const m = pad(adjusted.getUTCMinutes());
      const s = pad(adjusted.getUTCSeconds());
      const month = pad(0);
      const d = pad(adjusted.getUTCDate());
      const y = adjusted.getUTCFullYear()
      const sign = offsetHours >= 0 ? '+' : '';
      document.getElementById('time').textContent =
        `UTC${sign}${offsetHours.toFixed(2)} → ${h}:${m}:${s}`;
      document.getElementById('date').textContent =
        `${month}/${d}/${y}`;
    }

    function startClock(offsetHours){
      updateDisplay(offsetHours);
      setInterval(() => updateDisplay(offsetHours), 1000);
    }

    function errorLocation(err){
      document.getElementById('status').textContent = 'Could not get location: ' + err.message;
    }

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
        const lon = pos.coords.longitude;               // <-- use longitude
        const offset = lon / 15;                        // 15° = 1 hour
        document.getElementById('status').textContent =
          `Longitude: ${lon.toFixed(2)}°, using offset ≈ ${offset.toFixed(2)}h`;
        startClock(offset);
      }, errorLocation, { enableHighAccuracy: false, timeout: 10000 });
    } else {
      document.getElementById('status').textContent = 'Geolocation not supported.';
    }
