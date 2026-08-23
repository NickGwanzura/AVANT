# Dokploy deployment

This project is prepared for Docker-based deployment in Dokploy.

## Recommended setup

1. Create an application in Dokploy from the Git repository.
2. Select **Dockerfile** as the build type.
3. Use the repository root as the Dockerfile context.
4. Expose port `3000`.
5. Point the domain to the application and enable HTTPS.
6. Deploy from the desired branch.

The Docker image runs the production Vinext server on `0.0.0.0:3000`. No local `.env` file is required for the current site. If environment variables are added later, set them in Dokploy rather than committing secrets.
