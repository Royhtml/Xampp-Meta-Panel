# api/python_script.py
from http.server import BaseHTTPRequestHandler
import urllib.request
import json
class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        host = self.headers.get('Host')
        protocol = self.headers.get('X-Forwarded-Proto', 'https')
        node_url = f"{protocol}://{host}/api/node_script"
        try:
            req = urllib.request.Request(node_url)
            with urllib.request.urlopen(req) as response:
                node_data = json.loads(response.read().decode())
            final_response = {
                "pesan_python": "Python berhasil memanggil Node.js!",
                "data_dari_node": node_data
            }
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(final_response).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())