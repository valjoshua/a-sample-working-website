a working static website i made since these are only the criteria when uploading a published website or webapp:

**WORKS:**
Standard Web Files: HTML (.html), CSS (.css), and JavaScript (.js).

Media: Images (PNG, JPG, SVG, GIF), Videos (MP4, WebM), and Audio (MP3, WAV).

Data Files: JSON, XML, and YAML files used by your frontend scripts.

Jekyll: This is the only "active" engine GitHub runs. It automatically converts Markdown (.md) files into HTML pages when you push your code.

Client-Side Frameworks: You can host sites built with React, Vue, or Angular, provided you "build" them into static files first.

**NOT WORKING:**
Server-Side Languages: You cannot run PHP, Python (Django/Flask), Ruby on Rails, or Node.js (as a backend).

Databases: You cannot host a MySQL, PostgreSQL, or MongoDB database directly on GitHub Pages.

Hidden Credentials: You cannot securely use API keys or "secrets" in your code, because all code sent to GitHub Pages is visible to the public via the browser's "View Source" tool..
