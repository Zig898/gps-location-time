function pad(n){ return String(n).padStart(2,'0'); }
const first = Date.now();
function updateDisplay(offsetHours){
  // use a single UTC timestamp (ms since epoch) and add the offset
  const utcMs = Date.now(); // already UTC-based ms
  const adjusted = new Date(utcMs + offsetHours * 3600_000);

  // date components (month is 0..11 so +1)
  const y = adjusted.getUTCFullYear();
  const month = pad(adjusted.getUTCMonth() + 1); // <-- correct: +1
  const d = pad(adjusted.getUTCDate());

  // time components
  const h = pad(adjusted.getUTCHours());
  const m = pad(adjusted.getUTCMinutes());
  const s = pad(adjusted.getUTCSeconds());

  const sign = offsetHours >= 0 ? '+' : '';
  document.getElementById('time').textContent =
    `UTC${sign}${offsetHours.toFixed(2)} → ${h}:${m}:${s}`;
  document.getElementById('date').textContent =
    first - utcMs;
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
