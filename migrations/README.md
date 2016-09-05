# Foosball Migrations
A CLI for **Foosball** data migrations.

## Use
### Team Color Migration
Used for removing team color wins (e.g. `team1WinsBlack`) and summing them to total team wins (e.g. `team1Wins`). The migration script takes a Firebase URL so the migration can be run against multiple databases. Example use:
```bash
node migration.js removeColors https://dev-foosball.firebaseio.com
```
