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
  - Cas d'utilisation
  - Liens scientifiques
- Les technologies
    - Technologies utilisées
    - Défis et difficultés
- Plan de travail
    - Planification des tâches
    - Classes du projet

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
de notre application est quelle est adapté au système collégial québécois et donc aux francophones.

### Public cible

Comme annoncé dans la section précédente, notre application répond aux besoins des étudiants au CÉGEP, ils sont donc notre public cible.
Aussi, pour être plus précis, notre projet cible les étudiants dans des programmes scientifiques.

### Cas d'utilisation

**Les utilisateurs classiques (élèves)**

Les élèves sont nos principaux utilisateurs, c'est-à-dire qu'ils forment la majorité des utilisateurs. Ils peuvent faire ce pour quoi l'application a été 
originalement créée : prendre des tests au choix. En plus de cette fonctionnalité, ils peuvent voir les résultats de leur test et reprendre un test.

**Les administrateurs**
Les administrateurs ont un "pouvoir" plus important que les utilisateurs classiques, puisqu'ils interagissent avec une interface différente. Ce sont eux qui ont accès à la base de données. Par conséquent, il leur est possible de voir les réponses des tests ainsi que les résultats des utilisateurs. Ils peuvent aussi réinstialiser les scores d'un utilisateur ou supprimer un utilisateur. Finalement, leur plus grand pouvoir est de modifier les questions ou les réponses des tests.

## Les technologies
### Technologies à utiliser

En ce qui concerne le Frontend (les parties visuelles du projet, les interfaces), le code sera fait en HTML et en CSS. Le Framework utilisé sera ReactJS, une librairie JavaScript.
En ce qui concerne le Backend (les requêtes et la logique du projet), Node.JS sera utilisé, qui permettra de créer un serveur web à l'aide de JavaScript.
Pour la base de donnée, MangoDB sera utilisé, principalement parce que MangoDB n'utilise pas du SQL, ce qui facilitera la réalisation du projet.
Finalement, l'hébergement et le déploiement du projet se fera avec Vercel, un service de platforme sécuritaire.

### Difficultés liées à ces technologies

Les difficultés que nous allons rencontrer avec ce projet sont nombreuses. Notre éducation académique au cégep nous a rendu habile avec un seul langage de programmation, Java. Nous allons devoir apprendre 3 langages : JavaScript, HTML et CSS. Nous n'avons également jamais utilisé de bases de données, de platformes comme Node.JS et React.JS; nous sommes habitués de simplement coder sur Intellij. Cela dit, apprendre à utiliser ces différentes technologies, et surtout de lier les codes ensemble, ne sera pas une tâche facile.

## Le plan de travail
### Planification des tâches

Nous estimons le plus gros du travail comme étant le code JavaScript logique sur Node.JS et les différentes interfaces graphiques utilisant HTML et CSS. Il y aura du parallélisme dans les tâches de travail: la logique avec Node.JS sera travaillé en même temps que le côté graphique du projet, le tout prenant au moins 1 mois. Une fois que cela sera terminé, la base de données devra être mise en route. Finalement, il y aura, durant tout le projet, beaucoup de documentation et de commentaires à faire afin de s'assurer que le code soit compréhensible. À la fin du projet, il y aura des vérifications concernant l'esthétique de la page web.

### Classes
Il y aura de nombreuses classes dans notre projet. Certaines peuvent déjà être déterminées. 
La classe mère utilisateur aura comme attributs un nom et un mot de passe, des String.
Les classes filles seront les classiques et les administrateurs. Les classiques auront comme attributs un HashMap de résultats aux différentes questions avec un Double de note finale. Les méthodes permettront de faire des examens et de répondre à leurs questions. Les administrateurs, eux, auront des méthodes pour réinstialiser des résultats, modifier des questions ou des réponses et supprimer des utilisateurs.
Il y aura également une classe questionnaire, qui aura comme attributs un nom String, un int total de points et un ArrayList de Questions. Il y aura une méthode pour modifier les questions pour les administrateurs.
Les dites Questions comporteront un nom String et une réponse double comme attributs, avec une méthode permettant de modifier la réponse finale à la question.
Finalement, la classe SiteWeb aura un Utilisateur comme attribut, avec des méthodes de connexion, d'inscription et de déconnexion.

Notes : Pour que le fichier QUIZ_LAB fonctionne, il faut télécharger npm_modules, ce fichier est automatiquement ajouter au projet lorsqu'on ajoute le gestionnaire npm.
