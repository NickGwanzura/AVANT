# Dokploy deployment

This project is prepared for Docker-based deployment in Dokploy.

## Recommended setup

1. Create an application in Dokploy from the Git repository.
2. Select **Dockerfile** as the build type.
3. Use the repository root as the Dockerfile context.
4. Expose port `3000`.
5. Point the domain to the application and enable HTTPS.
6. Deploy from the desired branch.

The Docker image runs the production Vinext server on `0.0.0.0:3000`. Set the following environment variables for the protected admin login:

- `ADMIN_EMAIL` — admin sign-in email
- `ADMIN_PASSWORD` — long unique password
- `AUTH_SECRET` — long random signing secret
- `AUTH_URL` — public site URL

The complete content studio uses the hosted `DB` and `MEDIA` bindings declared in `.openai/hosting.json` for projects, enquiries and uploads. A plain Docker deployment remains suitable for the public marketing surface, but use the Sites deployment for the durable admin backend unless equivalent D1 and R2-compatible bindings are supplied by the runtime.
