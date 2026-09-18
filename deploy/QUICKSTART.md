# Getting it running on the VM (no domain yet)

Run these in order. Replace `<OWNER>`, `<REPO>`, `<VM_IP>` and `<VM_USER>`.

## A. In the repo, on your machine

1. Set the image name in `docker-compose.yml` to your repo, all lowercase:

   ```yaml
   image: ghcr.io/madhawarathnayake/portfolio:latest
   ```

2. Generate a deploy key and add it to the VM (run locally, then paste the
   public key onto the VM in step B4), or generate it on the VM as in
   `README.md` step 6.

3. Add these repository secrets under Settings > Secrets and variables > Actions:

   | Secret | Value |
   | --- | --- |
   | `VM_HOST` | `<VM_IP>` |
   | `VM_USER` | `<VM_USER>` |
   | `VM_SSH_KEY` | the private deploy key, BEGIN and END lines included |
   | `SITE_URL` | `http://<VM_IP>` (add the scheme, no trailing slash) |

4. Commit and push to `main`. The build job pushes the image to GHCR. The deploy
   job will fail on this first run because the VM is not set up yet. That is expected.

5. Make the package public: your GitHub profile > Packages > `<REPO>` >
   Package settings > Change visibility > Public. Otherwise the VM needs a
   `read:packages` token to pull it.

## B. On the VM, over SSH

```bash
ssh <VM_USER>@<VM_IP>
```

1. Update and install Docker and nginx:

   ```bash
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://get.docker.com | sudo sh
   sudo usermod -aG docker $USER && newgrp docker
   sudo apt install -y nginx
   ```

2. Create the app directory and compose file:

   ```bash
   mkdir -p ~/portfolio && cd ~/portfolio
   nano docker-compose.yml     # paste the file from the repo, with your image name
   ```

3. Create the environment file (the contact form reads it; the site runs without it):

   ```bash
   nano .env
   # SMTP_HOST=smtp.gmail.com
   # SMTP_PORT=587
   # SMTP_USER=your.address@gmail.com
   # SMTP_PASS=your-app-password
   # CONTACT_TO=madhawasoftnet@gmail.com
   chmod 600 .env
   ```

4. Authorise the deploy key:

   ```bash
   nano ~/.ssh/authorized_keys     # add the deploy public key on its own line
   chmod 600 ~/.ssh/authorized_keys
   ```

5. Pull and start:

   ```bash
   docker compose pull
   docker compose up -d
   docker compose ps
   curl -i http://127.0.0.1:3000/api/health
   ```

   A 200 with `{"status":"ok"}` means the container is healthy.

6. Put nginx in front:

   ```bash
   sudo nano /etc/nginx/sites-available/portfolio    # paste deploy/nginx.conf
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo rm -f /etc/nginx/sites-enabled/default
   sudo nginx -t && sudo systemctl reload nginx
   curl -I http://127.0.0.1/
   ```

7. Firewall:

   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

## C. In the Azure portal

Open port 80 inbound on the VM's network security group:

Virtual machine > Networking > Network settings > Add inbound port rule
- Source: Any
- Destination port ranges: `80`
- Protocol: TCP
- Action: Allow
- Priority: 310
- Name: `AllowHTTP`

Add a second rule for `443` now if you plan to add a domain soon.

## D. Confirm

Open `http://<VM_IP>` in a browser. Then push any commit to `main` and watch the
Actions run go green, including the health check step.

## When you get a domain

1. Create an `A` record for the apex and `www` pointing at `<VM_IP>`, and wait
   for it to resolve (`dig +short yourdomain.com`).
2. Replace `server_name _;` in the nginx config with your domain, reload nginx.
3. `sudo apt install -y certbot python3-certbot-nginx`
4. `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`
5. Update the `SITE_URL` secret to `https://yourdomain.com`.
6. Update `siteUrl` in `app/layout.tsx` so the metadata and OG tags are right.

## If something is wrong

| Symptom | Check |
| --- | --- |
| `docker compose pull` says denied | Package is still private, or the image name is wrong |
| Container restarts repeatedly | `docker compose logs --tail 100` |
| `curl 127.0.0.1:3000` works, browser does not | nginx not reloaded, or port 80 closed in the Azure NSG |
| 502 from nginx | The container is down, or it is not bound to 127.0.0.1:3000 |
| Actions deploy step hangs | Deploy key not in `authorized_keys`, or `VM_HOST` is wrong |
