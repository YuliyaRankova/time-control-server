# Time Control API

An API built with **Express.js** for managing and tracking time control.  
It provides endpoints for handling shifts, employees, and related time-tracking features.

---

## Features
- Manage employees and shifts
- Track working hours and breaks
- Store and retrieve time control data
- REST API structure
- Configurable via `.env` file and `server-config.json`

---

##  Technologies Used
- **Node.js** → Server-side runtime
- **TypeScript** → Static typing & improved code quality
- **Express.js** → Web application framework
- **dotenv** → Manage environment variables
- **MongoDB / Mongoose** → Database and ORM
- **Winston** → Logging
- **jsonwebtoken (JWT)** → Authentication / token-based security
- **Joi** → Input validation
- **Swagger** / swagger-ui-express → API documentation / Swagger UI
- **Morgan** → HTTP request logging middleware
- **Winston** → General purpose logging
- **Jest** / ts-jest → Unit testing framework for TypeScript
- **ts-node** / tsx → Run TypeScript code directly in development
- **UUID** → Generate unique IDs for entities

---
##  Configuration
The application loads configuration from two sources:
1. **`.env` file** → Secrets and environment-specific values
2. **`server-config.json`** → Default server settings

---
## Project Structure
time-control-server
```
├── docs/                  # API documentation
│   └── openapi.json       # Swagger/OpenAPI spec
├── server-config/         # Default configuration files
│   └── server-config.json
├── src/                   # Main application source code
│   ├── config/            # App configuration
│   │   └── appConfig.ts
│   ├── controllers/       # Route controllers
│   │   ├── AccountController.ts
│   │   └── ShiftController.ts
│   ├── errorHandler/      # Centralized error handling
│   │   ├── errorHandler.ts
│   │   └── HttpError.ts
│   ├── Logger/            # Logging utilities
│   │   └── winston.ts
│   ├── model/             # Data models & Mongoose schemas
│   │   ├── Employee.ts
│   │   ├── EmployeeMongooseModel.ts
│   │   ├── Shift.ts
│   │   └── ShiftMongooseModel.ts
│   ├── routes/            # Express routes
│   │   ├── accountRouter.ts
│   │   └── shiftRouter.ts
│   ├── services/          # Business logic / service layer
│   │   ├── accountingService/
│   │   │   ├── accountService.ts
│   │   │   └── accountServiceImplMongo.ts
│   │   ├── timeControlService/
│   │   │   ├── shiftControlService.ts
│   │   │   └── shiftControlImplMongo.ts
│   ├── utils/             # Shared types and helpers
│   │   ├── appTypes.ts
│   │   └── tools.ts
│   ├── validation/        # Request validation
│   │   ├── bodyValidation.ts
│   │   ├── joiSchemas.ts
│   │   └── queryValidation.ts
│   ├── app.ts             # Express app setup
│   └── server.ts          # App entry point
├── tests/                 # Unit & integration tests
│   └── unit/
│       └── accountTest/
├── .env                   # Environment variables
├── combine.log            # Combined logs
├── error.log              # Error logs
├── jest.config.ts         # Jest configuration
├── package.json
├── package-lock.json
├── tsconfig.json          # TypeScript configuration
└── README.md
```
---
# Getting Started
## Installation
Clone the repository and set up the project locally:
```
git clone https://github.com/your-username/time-control.git
cd time-control
npm install
```
## Running

**Development mode (with auto-restart):**
```
npm run dev
```
**Production mode:**
```
npm start
```
**The app will be available at:** <http://localhost:3000>

---
## API Endpoints (Examples)
| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/api/employees` | Get all employees  |
| POST   | `/api/employees` | Add a new employee |
| GET    | `/api/shifts`    | Get all shifts     |
| POST   | `/api/shifts`    | Create a new shift |

---
## Architecture Overview
The API uses a layered architecture:

**Client → Routes → Controllers → Services → Models → MongoDB**

- **Routes** → Define endpoints
- **Controllers** → Handle requests/responses
- **Services** → Contain business logic
- **Models** → Define schemas & interact with MongoDB
- **Validation** → Validate request bodies & queries
- **Error Handler** → Centralized error responses
- **Logger** → Winston and Morgan-based logging

---












