// Funkcja do pokazywania odpowiedniej sekcji
function showSection(sectionId) {
    // Ukrywanie wszystkich sekcji
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none'; // Ukrywamy sekcje
    });

    // Pokazywanie wybranej sekcji
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';  // Wyświetlamy wybraną sekcję
    }
}

// Dodajemy zdarzenia do przycisków
document.getElementById('headshots-btn').addEventListener('click', function() {
    showSection('gallery');  // Po kliknięciu wyświetlamy galerię
});

document.getElementById('showreels-btn').addEventListener('click', function() {
    showSection('showreels');  // Po kliknięciu wyświetlamy showreels
});

document.getElementById('about-me-btn').addEventListener('click', function() {
    showSection('about-me');  // Po kliknięciu wyświetlamy About Me
});

