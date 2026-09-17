# Deploying to an Azure VM

One-time setup on the VM, then every push to `main` deploys itself.

## 1. Create the VM

- Ubuntu 22.04 or 24.04 LTS, B1s or B2s (B1s at 1GB RAM is enough to *run* the
  container, since the image is built by GitHub Actions, not on the VM)
- Authentication: SSH public key
- Network security group inbound rules: 22 (SSH), 80 (HTTP), 443 (HTTPS). Nothing else.
- Give it a static public IP, or the address changes on restart and DNS breaks

## 2. Point DNS at it

An `A` record for `yourdomain.com` and another for `www` pointing at the VM's
public IP. Do this before running certbot, or the certificate request fails.

## 3. Install what the VM needs

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER && newgrp docker
sudo apt install -y nginx
```

## 4. Set up the app directory

```bash
mkdir -p ~/portfolio && cd ~/portfolio
# copy docker-compose.yml from the repo into this directory
nano .env          # SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
chmod 600 .env
```

If the GHCR package is private, authenticate once:

```bash
echo "<a GitHub PAT with read:packages>" | docker login ghcr.io -u <username> --password-stdin
```

Making the package public under the repo's Package settings avoids this entirely.

## 5. nginx and TLS

```bash
sudo cp nginx.conf /etc/nginx/sites-available/portfolio   # edit the domain first
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
systemctl list-timers | grep certbot     # confirm auto-renewal is armed
```

Certbot rewrites the nginx file to add the TLS server block and the redirect.

## 6. Deploy key and GitHub secrets

On the VM:

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/deploy_key -N ""
cat ~/.ssh/deploy_key.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/deploy_key        # this private key goes into GitHub, then delete it here
```

In the repo: Settings > Secrets and variables > Actions

| Secret | Value |
| --- | --- |
| `VM_HOST` | the VM's public IP or hostname |
| `VM_USER` | your Linux username on the VM |
| `VM_SSH_KEY` | the full contents of `deploy_key`, including the BEGIN and END lines |
| `SITE_DOMAIN` | `yourdomain.com`, used by the post-deploy health check |

## 7. First deploy

```bash
git push origin main
```

The workflow installs dependencies, type checks, builds the image, pushes it to
GHCR, SSHes in, pulls and restarts the container, then polls
`https://yourdomain.com/api/health` until it returns 200.

## Operating it

```bash
docker compose logs -f --tail 100     # logs
docker compose ps                     # status
docker compose restart                # restart
docker compose pull && docker compose up -d   # manual deploy
```

Roll back to a previous build by changing the image tag in `docker-compose.yml`
to a specific commit SHA and running `docker compose up -d`.

## Worth doing next

- `sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable`
- `sudo apt install -y unattended-upgrades` for security patches
- Azure alerts on CPU and on the VM going unavailable
- A second container plus an nginx upstream swap if you want zero-downtime deploys
