// api/node_script.js
export default function handler(req, res) {
  const dataDariNode = {
    status: "sukses",
    pesan: "Ini adalah hasil eksekusi dari Node.js",
    waktu: new Date().toISOString()
  };
  res.status(200).json(dataDariNode);
}