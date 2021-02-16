# Cloud Alert System (Backend)
REST API using express.js

## Project structure

```
src
├── api
│   ├── middleware
│   │   └── middleware.ts
│   └── routes
|       └── device
│           ├── auth.ts
│           └── device.ts
├── config
│   ├── config.ts
│   ├── db-config.ts
│   ├── logger-config.ts
│   └── server-config.ts
|   └ ... additional-config.ts
├── db
│   ├── db.ts
│   └── models
│       ├── device
|       |    └── device.ts
│       └── user
|            └── user.ts
├── logger
│   └── logger.ts
├── server.ts
├── utils
│   └── utils.ts
└── workers
    └── workers.ts
```