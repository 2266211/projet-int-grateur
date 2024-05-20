# **Projet intégrateur en sciences informatiques et mathématiques : QuizLab**

*Projet effectué dans le cadre du cours de Projet Intégrateur en sciences informatiques et mathématiques 420-204 RE*

*Par Mohammed Amine Elmoudarrib, Guillaume Gagnon et Dali Lourdjane*

*Groupe : 02*

*Présenté à : Monsieur Raouf Babari*

*Présenté le 21 février 2024*

## Tables des matières
- La description du projet
  - L'idée
  - L'utilité
  - L'innovation
  - Public cible
- Les acteurs
  - Les utilisateurs classiques
  - Les admins
- Les scénarios
  - Premier scénario : Utilisateur classique
  - Second scénario : Administrateur
- Les technologies
  - Technologies utilisées
  - Défis et difficultés
- Le plan de travail
  - Planification des tâches
  - Classes du projet
- Les diagrammes
  - Diagramme de Gantt
  - Diagramme de classes
  - Diagramme de déploiement
- Les preuves d'exécution du projet
  - Une vidéo
  - Des captures d'écran
- Les perspectives
- La conclusion

## La description du projet

### L'idée
Dans le cadre de notre projet d'intégration nous avons décidé de réaliser une application web de questionnaire scientifique. 
En résumé, il sera possible de réaliser des tests qui vont réfléchir le niveau de l'utilisateur dans plusieurs matières scientifiques.
Cette section ne sert que d'introduction au projet. Dans cette optique, de plus ample information se trouve dans les autres parties du livrable.

### L'utilité
Nous croyons notre application web utile pour plusieurs raisons. En premier lieu, en tant qu'utilisateur cette application permet de tester nos
connaissances dans de nombreuses matières. En deuxième lieu, il permet plus simplement d'apprendre davantage à propos d'une panoplie de sujet.

### L'innovation
Pourquoi faire ce projet? Qu'apporte-il à quiconque?
Premièrement, il est vrai qu'il existe déjà de nombreuses applications de quiz sur le web. Toutefois, ces dernières se concentrent très souvent
sur le niveau primaire ou secondaire. Deuxièmement, lorsque celles-ci ne font pas partie de cette majorité, ils sont souvent focalisés sur la culture générale.
Finalement, elles sont souvent faites pour les anglophones.
C'est ainsi qu'on se retrouve avec la question : Qu'est-ce qui fait en sorte que notre projet se démarque des sites qui existent déjà sur le web?
De un, nos questionnaires se concentrent sur le niveau collégial. De deux, ils se focalisent sur les matières scientifiques et finalement, la prémisse
de notre application est qu'elle est adapté au système collégial québécois et donc aux francophones.

### Public cible
Comme annoncé dans la section précédente, notre application répond aux besoins des étudiants au CÉGEP, ils sont donc notre public cible.
Aussi, pour être plus précis, notre projet cible les étudiants dans des programmes scientifiques.


## Les acteurs

### Les utilisateurs classiques (élèves)
Les élèves sont nos principaux utilisateurs, c'est-à-dire qu'ils forment la majorité des utilisateurs. Ils peuvent faire ce pour quoi l'application a été 
originalement créée : prendre des tests au choix. En plus de cette fonctionnalité, ils peuvent voir les résultats de leur test et reprendre un test.

### Les administrateurs
Les administrateurs ont un "pouvoir" plus important que les utilisateurs classiques, puisqu'ils interagissent avec une interface différente. Ce sont eux qui ont accès à la base de données. Par conséquent, il leur est possible de voir les réponses des tests ainsi que les résultats des utilisateurs. Ils peuvent aussi réinstialiser les scores d'un utilisateur ou supprimer un utilisateur. Finalement, leur plus grand pouvoir est de modifier les questions ou les réponses des tests.


## Les scénarios
### Premier scénario : Utilisateur classique
Les utilisateurs classiques peuvent tout d’abord décider de faire deux actions distinctes à partir de l’accueil, soit il se connecte à un compte déjà existant, soit il décide de s’inscrire. Bien évidemment, le site web communique avec l’utilisateur pour que ce dernier sache quand l’action a fonctionné et quand elle n’a pas fonctionné. Ensuite, l’utilisateur peut soit explorer la page d’accueil, soit aller voir les questionnaires. Lorsqu’il est rendu à la page des questionnaires, il peut choisir le questionnaire qu’il veut et ensuite recevoir une note en accordance à sa performance.

### Deuxième scénario : Administrateur
Les administrateurs peuvent tout d’abord se connecter, mais ils ne peuvent pas s’inscrire. En effet, les comptes d’administrateur sont manuellement entrés dans la base de données. Ensuite, on peut encore accéder aux questionnaires, mais on n'arrive pas exactement à la même page. On peut encore choisir un questionnaire, mais on trouve plutôt les statistiques reliées avec le questionnaire. En plus, on peut aussi choisir une question en particulier pour ensuite obtenir une autre statique à propos de la question en spécifique.


## Les technologies
### Technologies à utiliser
En ce qui concerne le Frontend (la vue de notre projet), le code des vues est fait sur des fichiers EJS. Ces derniers utilisent HTML et CSS ainsi qu’une partie minimale de JavaScript pour manipuler la logique sans faire appel à des scripts. Le Framework utilisé dans ces pages est Bootstrap. En ce qui concerne la partie logique de notre projet (les requêtes, les réponses et la logique général du projet), on a utilisé Node.js et, plus spécifiquement, la librairie Express.js. Ces deux technologies nous ont permis de créer un serveur web à l’aide du langage JavaScript. Pour ce qui est de la base de données, nous avons utilisé MongoDB et Compass. Cela nous a permis de ne pas avoir à utiliser le langage SQL. Cela facilite grandement notre tâche au niveau de la base de données. Compass nous permet aussi d’avoir une façon rapide de vérifier si nos données ont été accédées comme prévu. Finalement, bien que nous eussions prévu de déployer notre projet grâce à Vercel, nous avons décidé de ne pas le faire par simple manque de temps et par soucis de perfectionner d’autres aspects de notre projet intégrateur.

### Difficultés liées à ces technologies
Les difficultés que nous avons rencontré dans notre projet sont finalement partiellement similaire à celle que nous avons prévu. En effet, les trois langages de programmation que nous avons dû apprendre ont été un problème à plusieurs reprises. Nous n’étions pas familiers avec les fonctions et les détails que comportent ces langages. Toutefois, ce qui nous a le plus freiné dans notre projet, c’est l’apprentissage des libraires particulière. En effet, la librairie Express.js, par exemple, comporte énormément de détails qu’il ne faut pas manquer sous peine de trouver énormément de bug. De même, des librairies tels que bcrypt et cookie parser sont eux aussi des librairies qui ont été difficiles à utiliser à certains moments de par leurs interactions particulières avec le code Node.js et la base de données.


## Le plan de travail
### Planification des tâches
Nous estimons le plus gros du travail comme étant le code JavaScript logique sur Node.JS et les différentes interfaces graphiques utilisant HTML et CSS. Il y aura du parallélisme dans les tâches de travail: la logique avec Node.JS sera travaillé en même temps que le côté graphique du projet. Une fois que cela sera terminé, la base de données devra être mise en route. Finalement, il y aura, durant tout le projet, beaucoup de documentation et de commentaires à faire afin de s'assurer que le code soit compréhensible. À la fin du projet, il y aura des vérifications concernant l'esthétique de la page web.

### Classes
Il y a trois classes dans notre projet. En effet, comme on peut le voir dans notre diagramme de classes, il existe des utilisateurs, des questionnaires et des questions. Pour ce qui est des utilisateurs, il possède 6 attributs : un prénom (String), un nom (String), une adresse Courriel (String), leur mot de passe (String), un Array de nombre ([Number]) et un booléen qui détermine si l’utilisateur est un administrateur. Pour ce qui est des questionnaires, il possède 8 attributs : un titre (String), un Array de questions ([Question]), le nombre de question (Number), un Array de temps pris ([Number]), un Array de scores ([Number]), nombre de fois réussi (Number), nombre de fois fait (Number) et l’indice du questionnaire (Number). Finalement, pour la classe Question qui se trouve dans la classe Questionnaire, elle possède 4 attributs : la question (String), un Array d’options ([String]), l’indice de la réponse (Number) et le nombre de fois réussi (Number).


## Les diagrammes

### Diagramme de Gantt
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/9cd0c228-e465-431e-941e-36581aaa030d)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/09a03e81-f44f-4cfb-9059-30772edc1516)

### Diagramme de classes
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/3fdfb7fb-a176-4411-bbf6-8e4a4068fe5f)

### Diagramme de déploiement
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/c3b99c08-c324-432b-a2a2-07cea6597617)


## Les preuves d'exécution du projet

### Une vidéo
(Mettre le lien de la vidéo ici.)

### Des captures d'écran
Inscription pour un classique :
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/f1f0c398-2c53-480c-9a6b-0176177583a0)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/e2a85c21-f193-4171-b784-2eeaaad8b5d7)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/fd1848c0-5d08-4b3c-887a-db05dc4807ac)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/5fdccb60-48bd-469e-845a-c78495948283)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/1b10c241-2cff-4415-832d-c26cb0abdab7)
Faire un test :
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/db1a8cb1-53fa-418c-9bd6-9e0be4ff652b)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/d0c9820d-20f2-421e-a1b5-476084f8b5b7)
Connexion d'un administrateur :
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/3099c493-4762-4fb6-9807-7f073149dd80)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/9e6cbd94-0eb2-4cd3-8e84-8296abe573df)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/ffd0e0c5-75bb-49b7-b682-036a30c69533)
Explorer les statistiques (avant et après avoir choisi une question) :
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/afce2cae-9c89-42ed-a720-49163b232985)
![image](https://github.com/2266211/projet-int-grateur/assets/158298186/1b053d6e-e2a6-43b2-a829-23cee96d9fec)


## Les perspectives
Avec davantage de temps, QuizLab pourrait devenir un projet nettement plus gros sur divers aspects.
D’abord, il pourrait y avoir davantage de matières. En effet, pour le moment, il n’y a que les matières scientifiques du programme Sciences informatiques et mathématiques, avec de la chimie des solutions et de la chimie organique. Cependant, puisque l’objectif de QuizLab est d’offrir des services aux cégépiens de programmes scientifiques, le site pourrait contenir d’autres matières scientifiques, dont celles du programme Sciences de la nature : par exemple, Biologie I, Biologie II. De plus, à partir d’automne prochain, les programmes SIM et SN contiendront un cours de statistiques, lequel pourrait être ajouté à QuizLab. Finalement, des cours complémentaires scientifiques, comme Calcul III (dans l’espace) et Algèbre linéaire et géométrie vectorielle II, pourrait s’inclure dans notre projet. Avec plus de temps, nous aurions pu, en résumé, avoir des tests pour toutes les matières de chimie, de biologie, de physique et de mathématiques qui sont enseignées au cégep (donc, minimum 5 matières de plus).
Ensuite, avec davantage de temps, nous aurions pu ajouter à QuizLab une catégorie supplémentaire, soit la Programmation. Le site pourrait être divisé en 2 : Sciences et Programmation. Cette dernière division satisferait les cégépiens du programme SIM. Dans cette division, il y aurait des tests pour : Introduction à la programmation, Structures de données et POO, Développement de programmes dans un environnement graphique (ce sont les trois principaux cours de programmation). Ces trois matières pourraient également être divisées dépendamment du nombre de langages de programmation différents qui sont enseignés au cégep (Java et Python sont les principaux). Cela dit, puisque chaque utilisateur aurait sa manière de coder, nous utiliserions une IA pour vérifier si le code entré par celui-ci est bon et surtout, s’il respecte les conventions (comme le MVC ou le minuscule CamelCase).
Aussi, avec plus de temps, nous aurions pu ajouter des solutionnaires détaillés pour chaque question. Autrement dit, il y aurait un attribut solutionnaire à chaque question, ou une Classe supplémentaire (probablement idéal). Ceci semble assez banal, mais pour des exercices en mathématiques ou en physiques, qui peuvent être très longs, une bonne démarche fournie à chaque question rendrait le site beaucoup plus utile pour les utilisateurs. 
Finalement, avec du temps supplémentaire, nous aurions pu enlever la limite que les questions soient des String. Dans certaines matières, comme la chimie organique ou l’électricité et le magnétisme, les examens donnés en classe aux cégépiens comportent de nombreux schémas (par exemple, une molécule quelconque ou un circuit électrique, respectivement). Donc, QuizLab pourrait également offrir des tests où les questions ne sont pas que du texte, mais aussi des graphiques, des schémas, qui seraient, par exemple, sous le format d’une image.


## La conclusion
En conclusion, QuizLab est un site offrant des tests. Il permet aux utilisateurs, qui sont les cégépiens de programmes scientifiques, de s’évaluer dans 10 matières : Calculs différentiel et intégral, Mathématiques discrètes, Algèbre linéaire et géométrie vectorielle; Chimies générale, des solutions et organique; Mécanique, Électricité et magnétisme et Ondes et physique moderne.
Le site permet aux cégépiens de faire des tests; ils sont des utilisateurs dit classiques et utilisent une interface aussi dite classique. Les administrateurs, eux, ont accès à la base de données (ils seraient, par exemple, des enseignants) et peuvent donc faire des tests, en supprimer; ils peuvent également gérer les utilisateurs (bref, ils ont accès à tout). Finalement, les administrateurs peuvent aussi consultés les statistiques des questionnaires scientifiques. C’est-à-dire, qu’on peut voir la moyenne, la médiane, l’écart type et plus encore d’un questionnaire quelconque. Ils ont, aussi, leur propre interface, dite admin.
QuizLab offre des tests ayant les particularités suivantes. Chaque questionnaire comporte 10 questions, et chaque question comporte 4 choix multiples. Dans tous les cas, ces nombres sont respectés. Également, il n’y a qu’une réponse possible par question, et chaque question vaut pour 1 point. Il n’est pas possible d’avoir une partie des points pour une question : c’est zéro, ou 1. Les tests sont donc sur dix points.
Pour avoir réalisé QuizLab, de nombreuses technologies ont été utilisées. Pour les aspects visuels du projet, les langages HTML et CSS ont été utilisés, et Bootstrap a été le Framework utilisé. Cependant, toutes les pages ont été faites à partir de zéro, ce pourquoi il nous a fallu apprendre en détails les particularités en HTML et en CSS. Pour les aspects logiques du projet, c’est JavaScript qui a été utilisé comme langage de programmation. Le Framework utilisé était Express.JS, souvent utilisé pour les applications Web.
En raison des contraintes de temps, QuizLab reste un site Web limité. Cela dit, avec davantage de temps, nous aurions pu rajouter toutes les matières scientifiques du cégep (nouvelle division : Biologie), ajouter un catégorie Programmation au projet comportant divers examens en divers langages, insérer des solutionnaires détaillés (démarches) pour chaque question de chaque test ainsi que de permettre aux questions de ne pas juste être du texte (donc, en insérant des schémas, des graphiques).


## Notes 
Pour que le fichier QUIZ_LAB fonctionne, il faut télécharger npm_modules, ce fichier est automatiquement ajouter au projet lorsqu'on ajoute le gestionnaire npm.
