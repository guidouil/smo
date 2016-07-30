Template.office.onCreated(function () {
  this.subscribe('Office', Router.current().params.officeId);
});

Template.office.onRendered(function () {
  $('#startAt').pickadate({
    monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    today: 'Aujourd\'hui',
    clear: 'Effacer',
    close: 'Fermer',
    formatSubmit: 'yyyy-mm-dd',
  });
  $('#endAt').pickadate({
    monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    today: 'Aujourd\'hui',
    clear: 'Effacer',
    close: 'Fermer',
    formatSubmit: 'yyyy-mm-dd',
  });
});

Template.office.helpers({
  office () {
    return Offices.findOne({ _id: Router.current().params.officeId });
  },
});

Template.office.events({
});
