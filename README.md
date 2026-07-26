# EuroViz

[![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x-brightgreen?logo=springboot)](https://img.shields.io/badge/Spring%20Boot-4.x-brightgreen?logo=springboot)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://img.shields.io/badge/React-19-blue?logo=react)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
[![Docker](https://img.shields.io/badge/Docker-required-blue?logo=docker)](https://img.shields.io/badge/Docker-required-blue?logo=docker)

An interactive map of Europe for exploring population, GDP per capita and life expectancy data, powered by the World Bank API.

**🔗 Live demo:** https://euroviz.onrender.com

> **💡 Note:** The backend runs on a free instance and spins down after periods of inactivity — the first request after a while may take up to a minute to respond while it wakes up.

---

## ✨ Features

- Interactive, clickable map of European countries
- Population, GDP per capita and life expectancy for each country, with historical line charts
- Server-side caching and retry logic to handle occasional slow or failed responses from the free World Bank API
- If one data type fails to load, the others still display normally instead of the whole page breaking

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
| --------- | ---------------------------------------- |
| Backend   | Java 21, Spring Boot 4.x                  |
| Frontend  | React 19, TypeScript, Vite                |
| Charts    | Recharts                                  |
| Map       | react19-simple-maps                       |
| Container | Docker                                    |

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)

### 1. Clone the repository

```
git clone https://github.com/ardianRama/euroviz.git
cd euroviz
```

### 2. Run with Docker Compose

```
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8080

### Running without Docker

**Backend** (requires Java 21 and Maven):
```
cd backend
./mvnw spring-boot:run
```

**Frontend** (requires Node.js):
```
cd frontend
npm install
npm run dev
```

---

## 📊 Data Source

All data comes from the [World Bank Indicators API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation), specifically:

| Indicator       | Code              |
| ---------------- | ----------------- |
| Population        | `SP.POP.TOTL`      |
| GDP per capita     | `NY.GDP.PCAP.CD`   |
| Life expectancy    | `SP.DYN.LE00.IN`   |

---

## 🔗 API Endpoints

| Method | Endpoint                                 | Description              |
| ------ | ------------------------------------------ | -------------------------- |
| `GET`  | `/api/countries/{code}/population`          | Population history           |
| `GET`  | `/api/countries/{code}/gdp-per-capita`      | GDP per capita history        |
| `GET`  | `/api/countries/{code}/life-expectancy`     | Life expectancy history       |
| `GET`  | `/api/health`                                | Health check                  |

`{code}` is a 2-letter ISO country code (e.g. `se`, `fr`, `de`).

---

## 🔌 Ports

| Service  | Port |
| -------- | ---- |
| Backend  | 8080 |
| Frontend | 5173 |

---

## License

MIT © Ardian Rama
