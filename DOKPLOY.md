# Dokploy deployment

This project is prepared for Docker-based deployment in Dokploy.

## Recommended setup

1. Create an application in Dokploy from the Git repository.
2. Select **Dockerfile** as the build type.
3. Use the repository root as the Dockerfile context.
4. Expose port `3000`.
5. Point the domain to the application and enable HTTPS.
6. Deploy from the desired branch.

The Docker image runs the production Vinext server on `0.0.0.0:3000`. Set the following environment variables in Dokploy when enabling the production admin backend:

- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — long random Auth.js secret
- `AUTH_URL` — public site URL

The current `/admin` screen is a local browser-storage prototype. It is intentionally ready to be replaced by PostgreSQL + Auth.js once the Dokploy database and domain are available. Do not treat browser storage as production authentication or persistence.
