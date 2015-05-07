# Mapping 


Le mapping correspond au schéma des tables en SQL classique.

## Comment ça se passe ?

Pour récupérer le mapping d'un type 
```bash
$ curl -X GET :9200/index/type/_mapping
```

Utiliser un mapping explicite permet d'avoir de meilleure perf en insert.
Ca permet également de 
- réduire la taille de l'index sur le disque
- indexer uniquement les champs important 
- préparer les données pour une recherche + rapide or real time analitycs. 

Exemple de mapping 

```json
"orders" : {
  "properties" : {
    "id": {
      "type": "string",
      "store": "yes",
      "index": "not_analyzed"
  }
}
```

Lorsqu'on crée un mapping, on peut également donner à elastic des hints sur la méthode pour mieux gérer les champs. 

#### Voici les options qu'il y a sur un champ : 

- store : par défaut à non, indique si le champ doit être sauvegardé dans un index fragmenté pour un fast retrieving. 
Ca coute sur le disque mais ça permet de récupérer le champ beaucoup plus rapidement 
- index : 
  - no : Possibilité de ne pas indexer les data, elles ne seront pas cherchable alors.
  - analyzed : Analysé avec un analyseur configuré
  - not_analyzed : CE field est traité et indexé sans être analysé. 
- boost : Permet de changer l'importance du champ (1/0)
- index_analyzer : Permet de donner un analyseur particulier , si vide utilise celui du parent.
- search_analyzer : Permet de définir un analyseur particulier pdt la recherche.
_ include_in_all : inclut ce champ dans le champ _all.

On a également la possibilité de pouvoir utiliser un template dynamique pour le mapping des documents. 
Voir P 57 du bouquin. 


## Mapper des objets nesté (un contenu dans l'autre) 

A la base tout les champs contenu dans un objet sont vu comme un seul et même objet et il n'est pas possible de distinguer les valeurs entre différent objet encapsulés dans un même 
tableau. 

Heureusement elastic nous permet graĉe à un attribut de faire cette distinction : 

Exemple : 
```json
"orders" : {
  "properties" : {
      "id": {
        "type": "string",
        "store": "yes",
        "index": "not_analyzed"
      }, 
      "test" : {
        "type": "nested", 
        "properties" : {
          "name:" : { "type": "string", "store":"no"  }
        }
      }
  }
}
```

D'une manière assez simple si un document est marqué comme "nested", il va être extrait du document original et 
indexé comme un document externe.
Les nested object ne peuvent pas être recherché à l'aide de query classique, uniquement avec des nested query. 

## GeoPoint Field
Pour définir un point géographique rien de plus simple :


```json
"orders" : {
  "properties" : {
    "customer_location": {
      "type": "geo_point",
      "store": "yes"
  }
}
```

