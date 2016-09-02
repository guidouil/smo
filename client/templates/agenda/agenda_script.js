Template.agenda.onCreated(function() {
  if (Router.current().params.officeId) {
    this.subscribe('Office', Router.current().params.officeId);
    this.subscribe('Reservations', Router.current().params.officeId);
  }
});

Template.agenda.helpers({
});

Template.agenda.events({
});

Template.agenda.onRendered(function () {
  if (Meteor.userId()) {
    let moment = require('moment');
    let reservations = Reservations.find({ creator: Meteor.userId() }).fetch();
    let office = false;
    if (Router.current().params && Router.current().params.officeId) {
      reservations = Reservations.find({ officeId: Router.current().params.officeId }).fetch();
      office = Offices.findOne({ _id: Router.current().params.officeId });
    }
    let calendarEvents = [];
    if (reservations && reservations.length > 0) {
      _.each( reservations, function( reservation ) {
        let startTimes = reservation.startTime.split(':');
        let start = moment(reservation.day).add(startTimes[0], 'hours').add(startTimes[1], 'minutes').toDate();
        let endTimes = reservation.endTime.split(':');
        let end = moment(reservation.day).add(endTimes[0], 'hours').add(endTimes[1], 'minutes').toDate();
        calendarEvents.push({
          id: reservation._id,
          title: 'Réservé' + '\n' + reservation.startTime + '-' + reservation.endTime,
          start: start,
          end: end,
          url: '/reservation/' + reservation._id,
          color: '#ab3883',
        });
      });
    }
    if (office && office.availabilities) {
      _.each( office.availabilities, function( availability ) {
        let opens = availability.startTime.split(':');
        let start = moment(availability.date).add(opens[0], 'hours').add(opens[1], 'minutes').toDate();
        let closes = availability.endTime.split(':');
        let end = moment(availability.date).add(closes[0], 'hours').add(closes[1], 'minutes').toDate();
        if (availability.available === true) {
          calendarEvents.push({
            title: 'Diponible\n' + availability.startTime + '-' + availability.endTime,
            start: start,
            end: end,
            url: '/my-office-calendar/' + office._id,
            color: '#00965E',
            description: 'blabla',
          });
        } else {
          calendarEvents.push({
            title: availability.user,
            start: start,
            end: end,
            url: '/my-office-calendar/' + office._id,
            color: '#DB2828',
          });
        }
      });
    }
    $('#agenda').fullCalendar({
      header: {
        left: 'today',
        center: 'prev title next',
        right: 'agendaDay,agendaWeek,month',
      },
      theme: true,
      monthNames: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
      aspectRatio: 0.7,
      defaultDate: new Date(),
      weekends: false,
      scrollTime: '08:00:00',
      allDaySlot: false,
      businessHours: true,
      buttonIcons: true, // show the prev/next text
      weekNumbers: true,
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      events: calendarEvents,
    });
  }
  $('body').animate({scrollTop: 0}, 'fast');
});
