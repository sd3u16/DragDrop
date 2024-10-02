function loadTranslations(selectedLang) {
    const defaultLang = 'en'; // Fallback language

    // Load the selected language JSON file
    $.getJSON(`./languages/${selectedLang}.json`, function (translations) {
        // Load the default language JSON file for fallback
        $.getJSON(`./languages/${defaultLang}.json`, function (defaultTranslations) {
            // Update all elements with data-translate-key attributes
            $('[data-translate-key]').each(function () {
                const key = $(this).data('translate-key');
                const text = translations[key] || defaultTranslations[key] || key;
                $(this).text(text);
            });
        });
    });
}

// Event handler for language switcher dropdown
$(document).ready(function () {
    $('#languageSwitcher').on('change', function () {
        const selectedLang = $(this).val(); // Get selected language
        loadTranslations(selectedLang); // Load translations for the selected language
    });

    // Load the default language (English) on page load
    loadTranslations('en');
});