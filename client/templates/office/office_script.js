Template.office.onCreated(function () {
  this.subscribe('Office', Router.current().params.officeId);
  this.subscribe('Reservations', Router.current().params.officeId);
});

Template.office.onRendered(function () {
  Meteor.call('getDisabilities', Router.current().params.officeId, function (error, result) {
    if (result) {
      $('#startAt').pickadate({
        disable: result,
      });
      $('#endAt').pickadate({
        disable: result,
      });
    }
  });
});

Template.office.helpers({
  office () {
    return Offices.findOne({ _id: Router.current().params.officeId });
  },
  availabilityDate () {
    let office = Offices.findOne({ _id: Router.current().params.officeId });
    if (office) {
      let availability = _.find( office.availabilities, function (availability) {
        return availability.available === true;
      });
      return moment(availability.date).format('YYYY-MM-DD');
    }
    return '';
  },
});

Template.office.events({
  'click .bookOffice' () {
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
    let office = Offices.findOne({ _id: Router.current().params.officeId });
    if (office && office.availabilities && office.availabilities.length > 0) {
      startAt = new Date(startAt + ' ' + office.openAt);
      endAt = new Date(endAt + ' ' + office.closeAt);
      if (startAt > endAt) {
        $('#startAt').parent('.field').addClass('error');
        $('#endAt').parent('.field').addClass('error');
        return false;
      }
      let itr = moment.twix(startAt, endAt).iterate('days');
      let range = [];
      while (itr.hasNext()) {
        range.push(itr.next().toDate());
      }
      let disabledDays = openDaysToClosedNumbers(office.openDays);
      _.each( range, function(availabilityDate) {
        if (! _.contains( disabledDays, Number(moment(availabilityDate).format('d')))) {
          let reservation = {
            officeId: office._id,
            officeNumber: office.number,
            officeAddress: office.address,
            date: availabilityDate,
            creator: Meteor.userId(),
            createdAt: new Date(),
          };
          let reservationId = Reservations.insert(reservation);
          Meteor.call('applyReservation', reservationId);
        }
      });
      $('#startAt').val('');
      $('#endAt').val('');
      Router.go('agenda');
      return true;
    }
    return false;
  },
});
