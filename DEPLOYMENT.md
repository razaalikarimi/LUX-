# Production Deployment Manual — LUXÉ

## 1. Prerequisites
- Docker Engine 24.0+ and Docker Compose v2.0+ (or an Nginx web server)
- Domain with DNS access
- Valid SSL/TLS Certificate (Let's Encrypt / Certbot recommended)

---

## 2. Docker Production Deployment
```bash
# 1. Clone or copy files to the production server
cd /var/www/luxe

# 2. Copy and customize environment variables
cp .env.example .env
nano .env

# 3. Build and launch the container
docker compose up -d --build

# 4. Verify health check
curl -f http://localhost:8081/health
```

---

## 3. Nginx Reverse Proxy & SSL Setup (Host Level)
If running multiple applications on one server, configure host Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 4. Rollback Procedure
If any deployment requires rollback:
```bash
# To rollback to a previous git commit or docker tag:
git checkout <PREVIOUS_COMMIT_TAG>
docker compose up -d --build
```
