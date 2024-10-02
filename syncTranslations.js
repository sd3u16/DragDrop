const fs = require('fs');
const path = require('path');

// Define the path to your language files (adjust the path as needed)
const languageFolderPath = path.join(__dirname, 'languages');
const defaultLanguageFile = 'en.json'; // Set default language to English

// Read the default language file (English) and other language files
const defaultLanguageData = JSON.parse(fs.readFileSync(path.join(languageFolderPath, defaultLanguageFile), 'utf8'));

fs.readdir(languageFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading language files:', err);
    return;
  }

  // Loop through each language file except the default language (English)
  files.forEach((file) => {
    if (file !== defaultLanguageFile && file.endsWith('.json')) {
      const filePath = path.join(languageFolderPath, file);
      let languageData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Sync keys
      Object.keys(defaultLanguageData).forEach((key) => {
        if (!languageData.hasOwnProperty(key)) {
          languageData[key] = defaultLanguageData[key]; // Add missing key with default value
        }
      });

      // Write the updated file back
      fs.writeFileSync(filePath, JSON.stringify(languageData, null, 2), 'utf8');
      console.log(`Synced translation keys for ${file}`);
    }
  });
});


function loadTranslations(selectedLang) {
    const defaultLang = 'en';
    $.getJSON(`/languages/${selectedLang}.json`, function(translations) {
        $.getJSON(`/languages/${defaultLang}.json`, function(defaultTranslations) {
            $('body [data-translate-key]').each(function () {
                const key = $(this).data('translate-key');
                const text = translations[key] || defaultTranslations[key]; // Fallback to English if missing
                $(this).text(text);
            });
        });
    });
}