Theo Vignais | Mathieu Trunet

Fonctionnalités et Explications du Code

1. Connexion à MongoDB (src/mongodb.ts)
   gère la connexion à MongoDB et fournit une fonction pour obtenir l'objet base de données.

2. Connexion MQTT (src/mqttClient.ts)
   configure la connexion au broker MQTT et gère les événements de connexion.

3. Gestion des messages en queue (src/messageQueue.ts)
   contient les fonctions pour :

Mettre en queue un message (enqueueMessage)
Retirer un message de la queue (dequeueMessage)
Valider un message (acknowledgeMessage) 4. Consommateurs (src/consumer.ts)
Ce module implémente les consommateurs qui écoutent les messages des topics et les traitent.

5. Scheduler pour remise en queue (src/scheduler.ts)
   contient une tâche planifiée qui vérifie régulièrement les messages non validés et les remet en queue si nécessaire.

6. Point d'entrée principal (src/index.ts)
   initialise les connexions MQTT et MongoDB, démarre les consommateurs et le scheduler.

7. publisher.js
   script de generation de message

Prerequis :

- mongodb en local, avec une db nomee 'mqtt'
- Bun, un runtime de js : https://bun.sh/

Instructions:

1. installer les dependences avec > bun i
2. lancer le programme avec > bun run .\src\index.ts
3. lancer le script pour la demo avec > bun run .\publisher.js
