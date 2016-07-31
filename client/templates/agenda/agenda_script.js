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
    let reservations = Reservations.find({ creator: Meteor.userId() }).fetch();
    let office = false;
    if (Router.current().params.officeId) {
      reservations = Reservations.find({ officeId: Router.current().params.officeId }).fetch();
      office = Offices.findOne({ _id: Router.current().params.officeId });
    }
    let calendarEvents = [];
    if (reservations && reservations.length > 0) {
      _.each( reservations, function( reservation ) {
        calendarEvents.push({
          id: reservation._id,
          title: reservation.officeNumber,
          allDay: true,
          start: reservation.date,
          url: '/office/' + reservation.officeId,
          color: '#21BA45',
        });
      });
    }
    if (office && office.availabilities) {
      _.each( office.availabilities, function( availability ) {
        if (availability.available === true) {
          calendarEvents.push({
            title: 'DISPO',
            allDay: true,
            start: availability.date,
            url: '/my-office-calendar/' + office._id,
            color: '#B5CC18',
          });
        }
      });
    }
    $('#agenda').fullCalendar({
      header: {
        left: 'title',
        center: '',
        right: 'prev,next today',
      },
      monthNames: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
      aspectRatio: 1,
      defaultDate: new Date(),
      buttonIcons: true, // show the prev/next text
      weekNumbers: false,
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: calendarEvents,
    });
  }
});
