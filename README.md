# 🐳 Production-Grade Dockerized App Deployment

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

> A fully containerized Node.js application with automated CI/CD pipeline, Nginx reverse proxy, and cloud deployment on AWS EC2 — built following production DevOps best practices.

## 🌐 Live Demo
**http://16.176.174.187**

---

## 📌 Project Overview

This project demonstrates a complete DevOps workflow — from writing a Dockerfile to deploying a live application on the cloud with zero-downtime updates via GitHub Actions.

Every `git push` to `main` automatically:
1. Connects to the AWS EC2 server via SSH
2. Pulls the latest code
3. Rebuilds and restarts Docker containers
4. Serves the updated app with zero manual intervention

---

## 🏗️ Architecture

```
Developer Machine
      │
      │  git push
      ▼
GitHub Repository
      │
      │  triggers
      ▼
GitHub Actions (CI/CD)
      │
      │  SSH deploy
      ▼
AWS EC2 Server (Ubuntu)
      │
      ├── Nginx (port 80) ← reverse proxy
      │         │
      │         │ proxy_pass
      ▼         ▼
      Node.js App (port 3000)
      └── Docker Compose (orchestration)
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Application | Node.js | HTTP server |
| Containerization | Docker | Package and isolate app |
| Orchestration | Docker Compose | Multi-container management |
| Reverse Proxy | Nginx | Port 80, routing, security headers |
| Cloud | AWS EC2 (t3.micro) | Production server |
| CI/CD | GitHub Actions | Auto-deploy on push |
| Monitoring | UptimeRobot | Uptime alerts and status |
| Version Control | Git + GitHub | Source code management |

---

## 📁 Project Structure

```
dockerized-app/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
├── app/
│   └── server.js             # Node.js application
├── nginx/
│   └── nginx.conf            # Reverse proxy config
├── Dockerfile                # Multi-stage container build
├── docker-compose.yml        # Service orchestration
└── README.md
```

---

## ✨ Key Features

- **Dockerized** — app runs identically in dev and production
- **Nginx reverse proxy** — handles port 80, forwards to app
- **Auto-restart** — containers recover automatically from crashes (`restart: always`)
- **Health checks** — Docker monitors app health via `/health` endpoint
- **CI/CD pipeline** — GitHub Actions deploys on every push to `main`
- **Zero manual deploys** — push code, everything else is automated
- **Uptime monitoring** — UptimeRobot pings every 5 minutes and alerts on downtime

---

## 🚀 Local Setup

### Prerequisites
- Docker Desktop installed
- Git installed

### Run locally
```bash
# Clone the repository
git clone https://github.com/SumitXops/dockerized-app.git
cd dockerized-app

# Start all services
docker compose up --build

# Visit the app
open http://localhost
```

### API Endpoints

| Endpoint | Method | Response |
|----------|--------|----------|
| `/` | GET | `{ message, hostname, uptime }` |
| `/health` | GET | `{ status: "ok", timestamp }` |

---

## ⚙️ CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main`:

```
push to main
     │
     ▼
checkout code
     │
     ▼
SSH into AWS EC2
     │
     ▼
git pull latest code
     │
     ▼
docker compose down
     │
     ▼
docker compose up --build
     │
     ▼
✅ App live with new changes
```

**Secrets required:**
- `SERVER_IP` — AWS EC2 public IP
- `SSH_PRIVATE_KEY` — EC2 key pair private key

---

## 🐋 Docker Details

### Dockerfile
- Base image: `node:20-alpine` (minimal, secure)
- Health check built in via `wget` on `/health`
- Non-root user execution

### Docker Compose Services
| Service | Image | Port |
|---------|-------|------|
| `app` | Built from Dockerfile | 3000 (internal) |
| `nginx` | nginx:alpine | 80 (public) |

---

## 📊 Monitoring

- **UptimeRobot** monitors `http://16.176.174.187` every 5 minutes
- Email alerts on downtime
- Public status page available

---

## 🧠 What I Learned

- Writing production-grade Dockerfiles with health checks
- Orchestrating multi-container apps with Docker Compose
- Configuring Nginx as a reverse proxy
- Setting up SSH-based automated deployments with GitHub Actions
- Provisioning and securing an AWS EC2 instance
- Managing GitHub repository secrets for secure CI/CD

---

## 👤 Author

**Sumit** — [@SumitXops](https://github.com/SumitXops)

---

*Built as part of a DevOps learning project covering containerization, cloud deployment, and CI/CD automation.*