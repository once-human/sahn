const fs = require('fs');

// Real calculated percentages
// Spine: ~ 54%
// Left page: 12.5% to 54%
// Right page: 54% to 96%
// Top: ~ 23%
// Bottom: ~ 76%
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #111; margin: 0; padding: 50px; display: flex; justify-content: center; }
    .container { position: relative; width: 600px; height: 900px; background: url('public/notebook.png') center/contain no-repeat; }
    
    /* True paper bounds slightly inset from the cover */
    .left-page { position: absolute; background: rgba(255,0,0,0.4); top: 25.5%; left: 16%; width: 36%; height: 49%; }
    .right-page { position: absolute; background: rgba(0,0,255,0.4); top: 25.5%; left: 54%; width: 36%; height: 49%; }
  </style>
</head>
<body>
  <div class="container">
    <div class="left-page"></div>
    <div class="right-page"></div>
  </div>
</body>
</html>
`;
fs.writeFileSync('bounds.html', html);
