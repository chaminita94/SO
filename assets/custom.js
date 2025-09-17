/* Inicialitzar Google Translate */
document.addEventListener("DOMContentLoaded", function() {
  var translateScript = document.createElement("script");
  translateScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(translateScript);

  var translateDiv = document.createElement("div");
  translateDiv.id = "google_translate_element";
  translateDiv.classList.add("translate-widget");
  document.body.insertBefore(translateDiv, document.body.firstChild);
});

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'ca',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'google_translate_element'
  );
}
