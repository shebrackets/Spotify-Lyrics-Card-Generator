const card = document.getElementById('card');
const cardCover = document.getElementById('card-cover');
const coverPlaceholder = document.getElementById('cover-placeholder');
const cardTitle = document.getElementById('card-title');
const cardAuthor = document.getElementById('card-author');
const cardText = document.getElementById('card-text');

const inputBg = document.getElementById('input-bg');
const inputCover = document.getElementById('input-cover'); 
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const inputText = document.getElementById('input-text');
const charCounter = document.getElementById('char-counter');
const btnExport = document.getElementById('btn-export');
const fileNameText = document.getElementById('file-name-text');

const MAX_CHARACTERS = 220;
let isImageLoaded = false; 

function validerFormulaire() {
    const titreRempli = inputTitle.value.trim() !== "";
    const artisteRempli = inputAuthor.value.trim() !== "";
    const parolesRemplies = inputText.value.trim() !== "";

    if (isImageLoaded && titreRempli && artisteRempli && parolesRemplies) {
        btnExport.disabled = false;
    } else {
        btnExport.disabled = true;
    }
}

inputBg.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--bg-color', e.target.value);
});

inputCover.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (file) {
        const nomFichier = file.name.toLowerCase();

        // Sécurité anti-GIF
        if (nomFichier.endsWith('.gif')) {
            alert("Désolé, les images au format GIF ne sont pas acceptées. Veuillez choisir une image fixe (PNG, JPG, WEBP).");
            e.target.value = ""; 
            if (fileNameText) fileNameText.textContent = "Choisir un fichier";
            if (cardCover) cardCover.style.display = "none";
            if (coverPlaceholder) coverPlaceholder.style.display = "flex";
            isImageLoaded = false;
            validerFormulaire();
            return; 
        }

        if (fileNameText) fileNameText.textContent = file.name;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            if (cardCover) {
                cardCover.src = event.target.result;
                cardCover.style.display = "block";
            }
            if (coverPlaceholder) coverPlaceholder.style.display = "none";
            isImageLoaded = true;
            validerFormulaire();
        };
        reader.readAsDataURL(file);
        
    } else {
        if (fileNameText) fileNameText.textContent = "Choisir un fichier";
        if (cardCover) cardCover.style.display = "none";
        if (coverPlaceholder) coverPlaceholder.style.display = "flex";
        isImageLoaded = false;
        validerFormulaire();
    }
});

inputTitle.addEventListener('input', (e) => {
    cardTitle.textContent = e.target.value.trim() || "Titre de la musique";
    validerFormulaire();
});

inputAuthor.addEventListener('input', (e) => {
    const artistes = e.target.value.trim();
    cardAuthor.textContent = artistes !== "" ? `Titre • ${artistes}` : "Titre • Artiste";
    validerFormulaire();
});

inputText.addEventListener('input', (e) => {
    let text = e.target.value;

    if (text.length > MAX_CHARACTERS) {
        text = text.substring(0, MAX_CHARACTERS);
        e.target.value = text;
    }

    if (charCounter) {
        charCounter.textContent = `${text.length} / ${MAX_CHARACTERS}`;
        charCounter.style.color = text.length >= MAX_CHARACTERS ? "#ff4d4d" : "#b3b3b3";
    }

    cardText.textContent = text || "Vos paroles s'afficheront ici dès que vous commencerez à écrire...";
    validerFormulaire();
});

cardTitle.textContent = inputTitle.value.trim() || "Titre de la musique";
cardAuthor.textContent = inputAuthor.value.trim() !== "" ? `Titre • ${inputAuthor.value.trim()}` : "Titre • Artiste";
cardText.textContent = inputText.value.trim() || "Vos paroles s'afficheront ici dès que vous commencerez à écrire...";

if (charCounter) charCounter.textContent = `${inputText.value.length} / ${MAX_CHARACTERS}`;

isImageLoaded = false; 
validerFormulaire();

btnExport.addEventListener('click', () => {
    if (btnExport.disabled) return;

    html2canvas(card, {
        useCORS: true,       
        scale: 2, 
        backgroundColor: null 
    }).then(canvas => {
        const imageUri = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = `spotify-card-${cardTitle.textContent.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = imageUri;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        console.error("Erreur export :", error);
    });
});