import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

PORT = 8085
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("============================================================")
        print(f"[*] AURIS SIH 2026 VIDEO STUDIO RUNNING AT:")
        print(f"--> http://localhost:{PORT}")
        print("============================================================")
        print("Press Ctrl+C to stop the server.")
        httpd.serve_forever()

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1)
    
    url = f"http://localhost:{PORT}/index.html"
    print(f"Opening browser to {url} ...")
    webbrowser.open(url)
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping AURIS Video Studio server.")
