# Bienvenue sur projet React High Riders !

- Mise en place du Composant Header, avec une première version de style
- Mise en place du Composant Accueil, avec une première version de style

## Configuration de l'environnement

Le projet utilise des fichiers d'environnement pour configurer l'URL du backend selon l'environnement (développement/production).

### Fichiers d'environnement

- `.env.development` - Configuration pour l'environnement de développement (utilise `http://localhost:3000`)
- `.env.production` - Configuration pour l'environnement de production (utilise le serveur AWS)
- `.env.example` - Modèle de configuration (à copier pour créer vos propres fichiers)

### Variables disponibles

- `API_BASE_URL` - URL de base de l'API backend

### Utilisation

Les commandes npm utilisent automatiquement le bon environnement :

```bash
# Développement (utilise .env.development)
npm start

# Production (utilise .env.production)
npm run build
```

Première utilisation
--------------------

```js
exemple code
```
