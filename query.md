La query pour récupérer les contacts : 

```sql
SELECT `id`, `nom`, `nom_de_famille`, `prenom`, `id_type_entite`, `est_standalone`, `adr1`, `adr2`, `adr3`, `adr4`, `cp`, `ville`, `pays`, `url`, `mob`, `tel1`, `tel2`, `fax`, `eml`, `commentaires`, `reperes`, `latitude`, `longitude`, `geostatut`, `cree_le`, `modifie_le`
```
```sql
SELECT e.*, es.*, ep.*
FROM `entite` AS e
LEFT JOIN entite_structure AS es ON es.id_entite=e.id AND e.id_type_entite=1
LEFT JOIN entite_personne AS ep ON ep.id_entite=e.id AND e.id_type_entite=2
LIMIT 0;
```s
