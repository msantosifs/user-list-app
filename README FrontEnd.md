But : Lister les usagers obtenus d'un appel API à travers un tableau trié dans le browser (chrome).

Vous devez créer une toute nouvelle application angular (v13) qui va interroger le endpoint des users (lien plus bas) et afficher cette liste dans 
un tableau où les colonnes peuvent toutes être triées (ascendant et descendant).

Le endpoint est à l'adresse suivante : 
GET https://gorest.co.in/public/v2/users

Et le format des données de retour est le suivant :
[
{
"id": 3508,
"name": "Vaishvi Dhawan JD",
"email": "dhawan_jd_vaishvi@toy.info",
"gender": "female",
"status": "active"
},
...
]

Si pour une raison quelconque le endpoint ne serait pas disponible, vous êtes libres de trouver un autre endpoint quelconque sur le web et l'utiliser, dans la mesure où il y a tout de même quelques champs disponibles (pas seulement 2 ou 3)


SVP, documenter de quelle manière démarrer l'application et la tester.

Doivent être inclus : 
- Nouveau composant users
- Tests pertinents à l'aide de la (ou les) librairie(s) de votre choix.
- Vos aptitudes artistiques en design d'écran ne seront pas évaluées mais l'écran doit être bien structuré (par exemple, pas de texte qui dépasse les colonnes, pas de line wrapping dans les colonnes (contenu de la colonne sur 2 lignes), ...
- Application 'responsive', donc qui se comporte bien lorsqu'on 'resize' l'écran.
- Code bien formatté

Au final, il devrait y avoir 2 pages : 
La première, toute simple, contiendra votre nom et un bouton ('GET' par exemple) qui permet de lancer la requête vers l'api.
La seconde, affichera le tableau avec les données (users) reçues en #1 et contiendra aussi un lien qui permet de retourner à la page #1.




