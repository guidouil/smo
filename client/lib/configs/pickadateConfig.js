// Extend the default picker options for all instances.
$.extend($.fn.pickadate.defaults, {
  firstDay: 1,
  min: new Date(),
  // monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  // weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  // today: 'Aujourd\'hui',
  // clear: 'Effacer',
  // close: 'Fermer',
  formatSubmit: 'yyyy-mm-dd',
  format: 'dd/mm/yyyy',
});

$.extend($.fn.pickatime.defaults, {
  format: 'HH:i',
  formatSubmit: 'HH:i',
  // clear: 'Effacer',
  // close: 'Fermer',
});
