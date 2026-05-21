# Express TypeScript Auth System

A robust authentication system built with **Express** and **TypeScript**, utilizing **PostgreSQL** for persistent session management via `express-session` and `connect-pg-simple`.

## Tech Stack/Dependencies

- **Backend:** Express.js
- **Language:** TypeScript (Target: ESNext)
- **Database:** PostgreSQL
- **Session Management:** `express-session`
- **Session Store:** `connect-pg-simple` (storing sessions in Postgres)
- **DB Driver:** `pg` & `pg-pool`
- **Environment:** `dotenv`

## Prerequisites/Requirements

- **Node.js:** v18+ (Recommended)
- **PostgreSQL:** An active instance for data and session storage.
- **Package Manager:** `pnpm`

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd express-session
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```ini
   PORT=3000
   DATABASE_URL="postgres://user:password@localhost:5432/your_db"
   SESSION_SECRET="your-super-secret-key"
   DEBUG=express-session
   ```

4. **Database Schema:**
   Ensure you have created the `session` table in your PostgreSQL database to allow `connect-pg-simple` to store session data. You can find the schema in `node_modules/connect-pg-simple/table.sql`.

## Running the Application

### Development
To run the application with hot-reloading (via `ts-node` or `tsx`):
```bash
pnpm dev
```

### Production
Build and run the compiled TypeScript:
```bash
pnpm build
pnpm start
```

## API Documentation

Once the server is running, you can access the Hono instance at `http://localhost:3000`.

## Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License
Distributed under the MIT License.