const elements = {
    card: document.getElementById('card'),
    captureZone: document.getElementById('capture-zone'),
    shadowWrapper: document.querySelector('.shadow-wrapper'),
    cardCover: document.getElementById('card-cover'),
    coverPlaceholder: document.getElementById('cover-placeholder'),
    coverWrapper: document.querySelector('.cover-wrapper'),
    cardHeader: document.querySelector('.card-header'),
    trackInfo: document.querySelector('.track-info'),
    cardTitle: document.getElementById('card-title'),
    cardAuthor: document.getElementById('card-author'),
    cardText: document.getElementById('card-text'),
    lyricsText: document.querySelector('.card-lyrics p'),
    cardFooter: document.querySelector('.card-footer'),
    spotifyLogo: document.querySelector('.spotify-logo'),
    spotifyText: document.querySelector('.card-footer span'),
    inputBg: document.getElementById('input-bg'),
    inputCover: document.getElementById('input-cover'), 
    inputTitle: document.getElementById('input-title'),
    inputAuthor: document.getElementById('input-author'),
    inputText: document.getElementById('input-text'),
    charCounter: document.getElementById('char-counter'),
    btnExport: document.getElementById('btn-export'),
    fileNameText: document.getElementById('file-name-text')
};

const MAX_CHARACTERS = 220;
let isImageLoaded = false; 

function validerFormulaire() {
    const isReady = isImageLoaded && 
                    elements.inputTitle.value.trim() !== "" && 
                    elements.inputAuthor.value.trim() !== "" && 
                    elements.inputText.value.trim() !== "";
    elements.btnExport.disabled = !isReady;
}

elements.inputBg.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--bg-color', e.target.value);
});

elements.inputCover.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.gif')) {
        alert("Les images au format GIF ne sont pas acceptées.");
        return; 
    }

    elements.fileNameText.textContent = file.name;
    const reader = new FileReader();
    
    reader.onload = (event) => {
        elements.cardCover.src = event.target.result;
        elements.cardCover.style.display = "block";
        elements.coverPlaceholder.style.display = "none";
        isImageLoaded = true;
        validerFormulaire();
    };
    reader.readAsDataURL(file);
});

elements.inputTitle.addEventListener('input', (e) => {
    const text = e.target.value.trim();
    elements.cardTitle.textContent = text || "Titre de la musique";
    validerFormulaire();
});

elements.inputAuthor.addEventListener('input', (e) => {
    const text = e.target.value.trim();
    elements.cardAuthor.textContent = text ? `Titre • ${text}` : "Titre • Artiste";
    validerFormulaire();
});

elements.inputText.addEventListener('input', (e) => {
    let text = e.target.value;
    if (text.length > MAX_CHARACTERS) {
        text = text.substring(0, MAX_CHARACTERS);
        e.target.value = text;
    }
    elements.charCounter.textContent = `${text.length} / ${MAX_CHARACTERS}`;
    elements.charCounter.style.color = text.length >= MAX_CHARACTERS ? "#ff4d4d" : "#b3b3b3";
    elements.cardText.textContent = text || "Vos paroles s'afficheront ici...";
    validerFormulaire();
});

function togglerModeExport(activation) {
    const z = elements.captureZone.style;
    const s = elements.shadowWrapper.style;
    const c = elements.card.style;

    z.position = activation ? 'fixed' : '';
    z.top = z.left = activation ? '0' : '';
    z.width = activation ? '1080px' : '';
    z.height = activation ? '1920px' : '';
    z.zIndex = activation ? '999999' : '';
    z.backgroundColor = activation ? '#1c1c1e' : '';
    z.display = z.justifyContent = z.alignItems = activation ? 'flex' : '';

    s.width = activation ? '650px' : '';
    s.boxShadow = activation ? '0 25px 60px rgba(0, 0, 0, 0.7)' : '';

    c.width = activation ? '100%' : '';
    c.minHeight = activation ? '650px' : '';
    c.borderRadius = activation ? '36px' : '';
    c.padding = activation ? '52px' : '';
    c.gap = activation ? '36px' : '24px';

    if (elements.cardHeader) elements.cardHeader.style.gap = activation ? '20px' : '12px';
    if (elements.coverWrapper) {
        elements.coverWrapper.style.width = activation ? '76px' : '48px';
        elements.coverWrapper.style.height = activation ? '76px' : '48px';
    }
    if (elements.cardCover) elements.cardCover.style.borderRadius = activation ? '10px' : '6px';
    
    if (elements.lyricsText) elements.lyricsText.style.fontSize = activation ? '38px' : '';
    if (elements.cardTitle) elements.cardTitle.style.fontSize = activation ? '26px' : '';
    if (elements.cardAuthor) elements.cardAuthor.style.fontSize = activation ? '20px' : '';
    
    if (elements.cardFooter) elements.cardFooter.style.gap = activation ? '12px' : '';
    if (elements.spotifyLogo) elements.spotifyLogo.style.width = elements.spotifyLogo.style.height = activation ? '36px' : '';
    if (elements.spotifyText) elements.spotifyText.style.fontSize = activation ? '22px' : '';
}

elements.btnExport.addEventListener('click', () => {
    if (elements.btnExport.disabled) return;

    togglerModeExport(true);

    setTimeout(() => {
        html2canvas(elements.captureZone, {
            useCORS: true,       
            scale: 1, 
            backgroundColor: '#1c1c1e',
            width: 1080,
            height: 1920
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `spotify-stories-${elements.cardTitle.textContent.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
            togglerModeExport(false);
        }).catch(error => {
            console.error("Erreur de capture :", error);
            togglerModeExport(false);
        });
    }, 40);
});