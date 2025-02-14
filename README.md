# DICOM Image Compression

## 📌 Description
Ce projet permet d'extraire les données PixelData des fichiers DICOM et de les compresser en formats **JPEG, JPEG 2000 (JP2) et High Throughput JPEG 2000 (JPH)**.  
Il inclut également une application web pour visualiser les images.

## 📂 Structure du projet
- `scripts/` : Scripts Node.js pour l'extraction et compression des images DICOM.
- `input/` : DICOM images utilisées comme entrée.
- `output/` : Fichiers compressés en JPEG, JP2 et JPH.
  
## 🛠️ Installation et Exécution

### 1️⃣ Prérequis
- **Node.js** 
- **OpenJPEG** pour JP2 (`opj_compress`)
 *    - Linux : `sudo apt install openjpeg-tools`
 *    - Mac : `brew install openjpeg`
 *    - Windows : Télécharger OpenJPEG : https://github.com/uclouvain/openjpeg/releases
 
- **OpenJPH** pour JPH (`ojph_compress`)
*       Installer OpenJPH pour la conversion en JPH :
*     Suivre les instructions ici : https://github.com/aous72/OpenJPH

### 2️⃣ Installation
Cloner le projet et installer les dépendances :
```sh
git clone https://github.com/ton-utilisateur/DICOM-Compression.git
cd DICOM-Compression
npm install


Exécuter le script avec `node script.js`


### Observations
- **JPEG** : Rapide mais compression avec perte notable et grande taille.
- **JP2** : rapide avec qualité correcte mais toujours une perte.
- **JPH** : 'échoue probablement à cause d'une mauvaise installation ou d'un problème avec le fichier PGM.
