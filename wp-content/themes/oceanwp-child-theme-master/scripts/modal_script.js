/*
jQuery(document).ready(function ($) { ... }); : Attente que le document soit prêt avant d'exécuter le code à l'intérieur de la fonction.

$(".popup-close").click(function () { ... }); : Associe une fonction à l'événement de clic sur les éléments avec la classe "popup-close".

$(this).parent().parent().parent().hide(); : Utilise $(this) pour cibler l'élément qui a déclenché l'événement de clic. Ensuite, parent() est utilisé trois fois pour remonter dans la hiérarchie du DOM, et hide() est utilisé pour masquer l'élément correspondant (la popup).

L'alternative $('.popup-overlay').hide(); peut être utilisée si la classe "popup-overlay" est directement appliquée à la popup, éliminant ainsi le besoin de plusieurs appels à parent().
*/

console.log("modal_script.js loaded");

jQuery(document).ready(function ($) {
  $(".popup-close").click(function () {
    $(this).parent().parent().parent().hide();
    // Ou $('.popup-overlay').hide();
  });
});
