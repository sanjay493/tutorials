const devopsTopics = [
    {
        id: 'architecture',
        chapter: 1,
        title: 'Overview of System Architecture',
        sections: [
            {
                content: 'High-Level Deployment Flow',
                code: `                                ↓
                        Docker Build (Frontend + Backend)
                                ↓
                        Push Code to GitHub
                                ↓
                        GitHub Actions CI/CD
                                ↓
                        Oracle Cloud Ubuntu VM
                                ↓
                        Docker Compose
                                ↓
                        Nginx Reverse Proxy
                                ↓
                        FastAPI Backend (Port 8000)
                                ↓
                        React Frontend (Port 80)
                                ↓
                        HTTPS via Let's Encrypt
                                ↓
                        DuckDNS Domain`
            },
            {
                content: '🐳 Container Architecture',
                code: `                   ┌─────────────────────┐
                   │     Oracle Cloud VM   │
                   │  (Ubuntu Free Tier)   │
                   └───────────┬───────────┘
                               │
                        Docker Engine
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
 ┌───────────────┐     ┌───────────────┐      ┌───────────────┐
 │    Nginx      │     │   FastAPI     │      │    React      │
 │ Reverse Proxy │ --> │ Backend :8000 │      │ Frontend :80  │
 │ Ports 80/443  │     └───────────────┘      └───────────────┘
 └───────────────┘`,
                image: '/tutorials/DevOps/assets/image/duckdns.png'
            },
            {
                content: '🌐 Network Routing Logic',
                code: `server {
    listen 80;

    location / {
        proxy_pass http://frontend:80;
    }

    location /api {
        proxy_pass http://backend:8000;
    }
}`
            },
            {
                content: '🔁 CI/CD Pipeline',
                code: `on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - checkout
      - ssh into Oracle VM
      - docker compose down
      - docker compose up -d --build`
            }
        ],

    },
    {
        id: 'oracle-vm',
        chapter: 2,
        title: 'Oracle Virtual Machine Setup',
        sections: [
            {
                content: 'Cloud infrastructure starts with provisioning compute power. Oracle Cloud offers "Always Free" shapes that are perfect for learning DevOps. You will need to select an OS (Ubuntu 22.04 recommended), configure a Virtual Cloud Network (VCN), and download your private SSH key.',
            },
            {
                content: 'Create Instance 1) Basic information <name of your instance>',
                image: '/tutorials/DevOps/assets/image/oracle-01.png'
            },
            {
                content: 'Image and shape click change shape, then select <Ubuntu>, thereafter scroll down the page and select <Canonical Ubuntu 22.04> don\'t select any Minimal     ',
                image: '/tutorials/DevOps/assets/image/oracle-02.png'
            },
            {
                content: 'Click Next on bottom left of page to move on Security page, leave it as it is. click next again on bottom of page to move on Networking and select <Create new virtual cloud network> if not already created. Similar for Subnet. Scroll down to <Add SSH keys> section and download public and private SSh keys. Click next on bottom twice and then click Create Instance',
                image: '/tutorials/DevOps/assets/image/oracle-03.png'
            },
            {
                content: 'Under <Detail> section, you will get Instance Access. Use downloaded SSH private key to connect your machine from local machine terminal. ubuntu is default user',

                code: 'ssh -i /path/to/private-key ubuntu@your-instance-ip',

            },
            {
                content: 'Oracle Firewall Setup - Security List Configuration:\n\nConfigure the security rules for ingress and egress traffic:\n\nNavigate to Instances → Security → Security list\nClick on the created security list (e.g., "Default Security List for openvpn-905")\nConfigure the Security Rules for both Ingress and Egress',
                image: '/tutorials/DevOps/assets/image/oracle-05.png'
            },
            { image: '/tutorials/DevOps/assets/image/oracle-06.png' }
        ],
        link: 'https://aiforall.duckdns.org/oracle'
    },

    {
        id: 'docker-on-oracle',
        chapter: 3,
        title: 'Install Docker on Oracle VM',
        sections: [
            {
                content: 'SSH into server',

                code: 'ssh -i /path/to/private-key ubuntu@your-instance-ip'
            },
            {
                content: 'Update system packages',
                code: 'sudo apt update && sudo apt upgrade -y'
            },
            {
                content: 'Install Docker',
                code: 'sudo apt install docker.io -y'
            },
            {
                content: 'Install Docker Compose',
                code: 'sudo apt install docker-compose -y'
            },
            {
                content: 'Add user to docker group',
                code: 'sudo usermod -aG docker ubuntu'
            },
            {
                content: 'Verify Docker installation',
                code: 'docker --version'
            },

        ]
    },
    {
        id: 'duckdns',
        chapter: 4,
        title: 'Domain from DuckDNS',
        sections: [
            {
                content: 'Dynamic DNS (DDNS) allows you to map a memorable domain name to a home or cloud server even if its IP address changes. DuckDNS is a free, simple service that provides `yourname.duckdns.org` subdomains.',
            },
            {
                content: 'DuckDNS is a free dynamic DNS service that allows you to create a custom domain name and point it to your Oracle Cloud VM instance\'s public IP address. This is especially useful if your VM instance has a dynamic IP address that may change over time.',
                code: 'https://www.duckdns.org/',
            },
            {
                content: 'Go to: DuckDNS \n Login using Google/Github. After login you will be redirected to your dashboard where you can create a new domain. \n  Enter your desired subdomain name in the "Subdomains" field and click the "add domain" button.\n Add Oracle InstanceIP. \n',
                image: '/tutorials/DevOps/assets/image/duckdns.png'
            },

            {
                content: 'Go to your oracle cloud VM instance and run the following command to update your IP address to DuckDNS. \n',
                code: 'mkdir -p ~/duckdns',
            },
            {
                content: 'Create a shell script to update your IP address to DuckDNS. \n',
                code: 'nano ~/duckdns/duck.sh'
            },

            {
                content: 'Write the following code in the nano editor. Replace yourdomain and yourtoken with your actual domain name and token. \n',
                code: 'curl -k "https://www.duckdns.org/update?domains=yourdomain&token=yourtoken&ip=[IP_ADDRESS]" -o ~/duckdns/duck.log 2>&1'
            },

            { content: 'make the file executable & test it', code: 'chmod +x ~/duckdns/duck.sh && ~/duckdns/duck.sh' },
            {
                content: 'Create a cron job to update your IP address to DuckDNS every 5 minutes. \n',
                code: 'crontab -e'
            },
            {
                content: 'Add the following line to the crontab file: \n',
                code: '*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1'
            },
            {
                content: 'Verify that the cron job is running by checking the duck.log file. \n',

                code: 'cat ~/duckdns/duck.log'
            },
            {
                content: 'You can also check the status of your domain by running the following command: \n',
                code: 'curl -k "https://www.duckdns.org/status?domains=yourdomain&token=yourtoken"'
            },


        ],
    },
    {
        id: 'Create React App Locally',
        chapter: 5,
        title: 'Create React App Locally',
        sections: [
            {
                content: 'Your Project Structure',
                code: 'npx create vite@latest'
            },
            {
                content: ' Move to project folder and Install dependencies',
                code: 'cd my-app\nnpm install'
            },
            {
                content: 'Project Structure',
                code: `tutorial-website 
│
├── node_modules
├── public
│   └── vite.svg
│
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md`
            },
            {
                content: 'Craete a <Dockerfile in the root directory of your project.',
                code: `# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Copy custom nginx config if we had one, but default is often fine for simple SPAs
# In a real scenario, you'd want a config that handles React Router (fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`
            },
            {
                content: 'Create a <nginx.conf> file in the root directory of your project.',
                code: `server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}`
            },
            {
                content: 'Create a <docker-compose.yml> file in the root directory of your project.',
                code: `services:
  app:
    build: .
    ports:
      - "80:80"
    restart: always
    container_name: tutorials_app`
            },
            {
                content: 'Build and run the Docker container.',
                code: 'docker-compose up --build -d'
            },
            {
                content: 'Verify that the container is running.',
                code: 'docker ps'
            }
        ]
    },
    {
        id: 'docker-repository',
        chapter: 6,
        title: 'Create Docker Hub Repository',
        sections: [
            {
                content: 'First install Docker if not installed on your local machine, where you are creating your application',
                code: 'sudo apt update \n sudo apt install docker.io -y'
            },
            {
                content: 'Start Docker',
                code: 'sudo systemctl start docker'
            },
            {
                content: 'Login to Docker Hub fromloacl machine with Access token, Copy it from https://hub.docker.com/settings/security',
                code: 'docker login'
            },
            {
                content: 'Build docker image from project folder',
                code: 'docker build -t <dockerhub_username>/<repository_name> .'
            }, {
                content: 'verfity docker images',
                code: 'docker images'
            }, {
                content: 'Push docker image to Docker Hub',
                code: 'docker push <dockerhub_username>/<repository_name>'
            }
        ]
    },
    {
        id: 'docker',
        chapter: 7,
        title: 'Containerization with Docker',
        sections: [
            {
                content: 'Docker containers ensure "it works on my machine" works everywhere. A Dockerfile defines the environment, while Docker Compose manages multi-container setups.',
                code: 'FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "run", "dev"]'
            }
        ]
    },
    {
        id: 'cicd',
        chapter: 8,
        title: 'CI/CD Pipelines',
        sections: [
            {
                content: 'The final step is automation. GitHub Actions can automatically build your Docker images and deploy them to your server whenever you push code.',
                code: 'name: Deploy\non: [push]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Build and Push\n        run: | \n          docker build -t app .\n          # Add deployment commands here'
            }
        ]
    }
];

export default devopsTopics;
