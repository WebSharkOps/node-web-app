# Node Web App with Docker & Nginx

## Description
This is a sample Node.js web application, Dockerized, and served via Nginx reverse proxy. Logs are written to `/var/log/node-web-app/app.log` inside the container.

## Prerequisites
- Node.js 18
- Docker
- Nginx
- Linux VM (Ubuntu)

## Installation

**1. Clone the repository**
   git clone https://github.com/websharkops/node-web-app.git
   cd node-web-app
   
**2. Build Docker image**
docker build -t node-web-app .

**3. Run container**
docker run -d --name node-web-app -p 3000:3000 --env-file .env node-web-app

**4.Configure Nginx**
  
     server {
         listen 80;
         server_name localhost;
     
         location / {
             proxy_pass http://127.0.0.1:3000;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }

**5. Reload Ngin**x
sudo systemctl reload nginx


**Usage**
- Access the app from the VM:
curl http://localhost/
- Access from host machine (Windows/Mac):
curl http://<VM_IP>/

**File Structure**
node-web-app/
  ├── app.js
  ├── package.json
  ├── Dockerfile
  ├── .env
  └── README.md
Author
Bogdii — Linux DevOps practice

---

This README is ready to **commit and push** to GitHub.  

Next steps:

```bash
git add README.md
git commit -m "Update README with Docker & Nginx instructions"
git push origin main
