# Checkbox Display

Une extension VS Code qui détecte et affiche des checkboxes interactives dans l'éditeur de texte.

## Fonctionnalités

Cette extension détecte automatiquement les patterns de checkbox dans vos fichiers et les affiche sous forme de symboles visuels :
- Détection et rendu automatique dans tous les fichiers
- Support multi-langage (Python, JavaScript, C/C++, Java, etc.)
- Affichage visuel en temps réel avec ☐ et ☑
- Toggle interactif par clic ou raccourci clavier

## Utilisation

### Format de checkbox

Le format s'adapte automatiquement au langage du fichier :

**Python, Ruby, Bash, YAML :**
```python
checkbox = 1 # [CB]: 1|0
file = "example.txt" # [CB]: "exam.txt"|"example.txt"
```

**JavaScript, TypeScript, C/C++, Java :**
```javascript
const checkbox = 1; // [CB]: 1|0
let file = "example.txt"; // [CB]: "exam.txt"|"example.txt"
```

### Format général
```
variable = valeur commentaire [CB]: valeur1|valeur2
```
- `valeur1` : valeur quand la checkbox est cochée ☑
- `valeur2` : valeur quand la checkbox est décochée ☐
- La variable prend automatiquement la valeur correspondant à l'état de la checkbox

### Snippet rapide

Tapez `cb` ou `checkbox` puis Tab pour insérer le pattern :
```
[CB]: value1|value2
```
Le snippet vous permet de naviguer entre les valeurs avec Tab.

### Exemples pratiques

**Python :**
```python
debug = True # [CB]: True|False
count = 10 # [CB]: 10|5
mode = "dev" # [CB]: "dev"|"prod"
```

**JavaScript :**
```javascript
const debug = true; // [CB]: true|false
let count = 10; // [CB]: 10|5
const mode = "dev"; // [CB]: "dev"|"prod"
```

**C++ :**
```cpp
bool enabled = true; // [CB]: true|false
int count = 10; // [CB]: 10|5
```

### Toggle checkbox

Trois façons de changer l'état :

1. **Clic** : Cliquez sur le lien "☑ Click to toggle" au-dessus de la ligne
2. **Raccourci clavier** :
   - **macOS**: `Cmd+Shift+C`
   - **Windows/Linux**: `Ctrl+Shift+C`
3. **Palette de commandes** : `Toggle Checkbox`

Le toggle échange automatiquement la valeur de la variable entre les deux options.

## Langages supportés

L'extension détecte automatiquement le type de commentaire selon le langage :

- **`#`** : Python, Ruby, Perl, R, YAML, Bash, Shell, PowerShell
- **`//`** : JavaScript, TypeScript, Java, C, C++, C#, Go, Rust, Swift, Kotlin, PHP, Dart

Pour les langages non listés, `#` est utilisé par défaut.

## Installation pour développement

1. Clonez ce repository
2. Ouvrez le dossier dans VS Code
3. Exécutez `npm install`
4. Appuyez sur `F5` pour lancer l'extension en mode debug
5. Une nouvelle fenêtre VS Code s'ouvrira avec l'extension activée

## Release Notes

### 0.0.2

Nouvelles fonctionnalités :
- Support multi-langage avec adaptation automatique des commentaires
- Valeurs de checkbox flexibles (nombres, strings, booléens, etc.)
- Tests complets pour tous les langages supportés

### 0.0.1

Version initiale :
- Détection automatique des patterns checkbox
- Affichage visuel des checkboxes
- Commande pour toggle l'état des checkboxes