Template.myOfficeCalendar.onRendered(function () {
  $('.checkbox').checkbox();
  $('#openAt').pickatime({
    format: 'HH:i',
    formatLabel: 'Ouvert à H:i',
    formatSubmit: 'HH:i',
  });
  $('#closeAt').pickatime({
    format: 'HH:i',
    formatLabel: 'Fermé à H:i',
    formatSubmit: 'HH:i',
  });
  $('#startAt').pickadate({
    monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    today: 'Aujourd\'hui',
    clear: 'Effacer',
    close: 'Fermer',
    formatSubmit: 'yyyy-mm-dd',
    hiddenSuffix: '_submit',
  });
  $('#endAt').pickadate({
    monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    today: 'Aujourd\'hui',
    clear: 'Effacer',
    close: 'Fermer',
    formatSubmit: 'yyyy-mm-dd'
  });
});

Template.myOfficeCalendar.helpers({
  office () {
    return Offices.findOne({_id: Router.current().params.officeId});
  },
  isOpen (day) {
    let office = Offices.findOne({_id: Router.current().params.officeId});
    if (office && office.openDays[day] === true) {
      return 'checked';
    }
    return '';
  },
  days () {
    return [
      {
        value: 'monday',
        label: 'lundi',
      },
      {
        value: 'tuesday',
        label: 'mardi',
      },
      {
        value: 'wednesday',
        label: 'mercredi',
      },
      {
        value: 'thursday',
        label: 'jeudi',
      },
      {
        value: 'friday',
        label: 'vendredi',
      },
      {
        value: 'saturday',
        label: 'samedi',
      },
      {
        value: 'sunday',
        label: 'dimanche',
      },
    ];
  },
});

Template.myOfficeCalendar.events({
  'click .saveOpenHours' () {
    $('.field').removeClass('error');
    let openDays = {};
    $('.day').each(function(index, el) {
      openDays[el.id] = el.checked;
    });
    let openAt = $('#openAt').val();
    let closeAt = $('#closeAt').val();
    if (!openAt) {
      $('#openAt').parent('.field').addClass('error');
      return false;
    }
    if (!closeAt) {
      $('#closeAt').parent('.field').addClass('error');
      return false;
    }
    if (Number(openAt.replace(':', '')) > Number(closeAt.replace(':', ''))) {
      $('#openAt').parent('.field').addClass('error');
      $('#closeAt').parent('.field').addClass('error');
      return false;
    }
    Offices.update({_id: Router.current().params.officeId}, {$set: {
      openDays: openDays,
      openAt: openAt,
      closeAt: closeAt,
    }});
    return true;
  },
  'click .addAvailability' () {
    $('.field').removeClass('error');
    let startAt = $('#startAt_hidden').val();
    let endAt = $('#endAt_hidden').val();

    if (!startAt) {
      $('#startAt').parent('.field').addClass('error');
      return false;
    }
    if (!endAt) {
      $('#endAt').parent('.field').addClass('error');
      return false;
    }
    // let moment = require('moment');
    startAt = new Date(startAt + ' ' + $('#openAt').val());
    endAt = new Date(endAt + ' ' + $('#closeAt').val());
    let availability = {
      startAt: startAt,
      endAt: endAt,
      who: Meteor.userId(),
      when: new Date(),
    };
    Offices.update({_id: Router.current().params.officeId}, {$push: {
      availabilities: availability,
    }});
  },
  'click .deleteAvailability' () {
    Offices.update({_id: Router.current().params.officeId}, {$pull: {
      availabilities: this,
    }});
  }
});
