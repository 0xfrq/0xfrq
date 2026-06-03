const html = require('fs').readFileSync('d:/0xfrq/spotify.html','utf8'); 
const tracks = html.match(/"([a-zA-Z0-9]{22})"/g); 
console.log(tracks ? tracks.slice(0,5) : 'not found');
