export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
    
  if (req.method === 'POST') {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbznlUIk4kYUHBx15C1VIU3FHOw-W3lsOwbMvtnemGAoxxJ48Pip9qBmZQzA9lofeV4O/exec", {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const result = await response.text();
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send(result);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Gagal mengirim data");
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
