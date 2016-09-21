let moment = require('moment');
require('twix');

Template.myOfficeAvailabilities.onCreated(function () {
  this.subscribe('Office', Router.current().params.officeId);
  this.subscribe('Reservations', Router.current().params.officeId);
  this.closedDays = new ReactiveVar([]);
});

Template.myOfficeAvailabilities.onRendered(function () {
  let template = this;
  $('.ui.checkbox').checkbox();
  $('.ui.dropdown').dropdown();
  Tracker.autorun(function () {
    let office = Offices.findOne({_id: Router.current().params.officeId});
    if (office) {
      let closedDays = [6, 7];
      if (office.availabilities && office.availabilities.length > 0) {
        _.each(office.availabilities, function (availability) {
          closedDays.push(availability.date);
        });
      }
      let reservations = Reservations.find({officeId: Router.current().params.officeId}).fetch();
      if (reservations && reservations.length > 0) {
        _.each(reservations, function (reservation) {
          closedDays.push(reservation.day);
        });
      }
      if (closedDays && closedDays.length > 0) {
        closedDays.sort(function(a, b){return a-b});
        let selectedDate = new Date();
        _.each(closedDays, function (closedDay) {
          if (moment(closedDay).isSame(selectedDate, 'day')) {
            selectedDate = moment(selectedDate).add(1, 'd').toDate();
            if (moment(selectedDate).day() === 6) { // jump the weekend
              selectedDate = moment(selectedDate).add(2, 'd').toDate();
            }
          }
        });
        template.closedDays.set(closedDays);
        $('#startAt').pickadate({
          firstDay: 1,
          min: new Date(Session.get('searchedDate')),
          formatSubmit: 'yyyy-mm-dd',
          format: 'dd/mm/yyyy',
          disable: closedDays,
          select: selectedDate,
        });
        $('#endAt').pickadate({
          firstDay: 1,
          min: new Date(Session.get('searchedDate')),
          formatSubmit: 'yyyy-mm-dd',
          format: 'dd/mm/yyyy',
          disable: closedDays,
          select: selectedDate,
        });
      }
    }
  });
});

Template.myOfficeAvailabilities.helpers({
  office () {
    return Offices.findOne({_id: Router.current().params.officeId});
  },
  selectedDate () {
    if (Session.get('searchedDate')) {
      return moment(Session.get('searchedDate')).format('YYYY-MM-DD');
    } else {
      let closedDays = Template.instance().closedDays.get();
      if (closedDays && closedDays.length > 0) {
        closedDays.sort(function(a, b){return a-b});
        let selectedDate = new Date();
        _.each(closedDays, function (closedDay) {
          if (moment(closedDay).isSame(selectedDate, 'day')) {
            selectedDate = moment(selectedDate).add(1, 'd').toDate();
            if (moment(selectedDate).day() === 6) { // jump the weekend
              selectedDate = moment(selectedDate).add(2, 'd').toDate();
            }
          }
        });
        return moment(selectedDate).format('YYYY-MM-DD');
      }
    }
  },
  todayPlaceholder() {
    if (Session.get('searchedDate')) {
      return moment(Session.get('searchedDate')).format('DD/MM/YYYY');
    } else {
      let closedDays = Template.instance().closedDays.get();
      if (closedDays && closedDays.length > 0) {
        closedDays.sort(function(a, b){return a-b});
        let selectedDate = new Date();
        _.each(closedDays, function (closedDay) {
          if (moment(closedDay).isSame(selectedDate, 'day')) {
            selectedDate = moment(selectedDate).add(1, 'd').toDate();
            if (moment(selectedDate).day() === 6) { // jump the weekend
              selectedDate = moment(selectedDate).add(2, 'd').toDate();
            }
          }
        });
        return moment(selectedDate).format('DD/MM/YYYY');
      }
    }
  },
  sortDate (availabilities) {
    check(availabilities, Array);
    let yesterday = new Date(); // today
    yesterday.setDate(yesterday.getDate() - 1); // yesterday
    availabilities = _.filter( availabilities, function (availability) {
      if (availability.date > yesterday) {
        return true;
      }
    });
    return _.sortBy(availabilities, 'date').reverse();
  },
});

Template.myOfficeAvailabilities.events({
  'click .addAvailability' (evt, tmpl) {
    $('.field').removeClass('error');
    $('.fields').removeClass('error');
    $('.ui.form').removeClass('error');
    let startAt = $('[name="startAt_submit"]').val();
    let endAt = $('[name="endAt_submit"]').val();
    if (!startAt) {
      $('.startAt').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    if (!endAt) {
      $('.endAt').addClass('error');
      $('.ui.form').addClass('error');
      return false;
    }
    let duration = 'day';
    $('.duration').each(function(index, el) {
      if ($(el).hasClass('selected')) {
        duration = el.dataset.value;
      }
    });
    let startTime = '8:00';
    let endTime = '18:00';
    if (duration === 'am') {
      endTime = '12:00';
    } else if (duration === 'pm') {
      startTime = '13:00';
    }
    startAt = moment(startAt + ' ' + startTime).toDate();
    endAt = moment(endAt + ' ' + endTime).toDate();
    if (startAt > endAt) {
      $('#startAt').parent('.field').addClass('error');
      $('#endAt').parent('.field').addClass('error');
      return false;
    }
    let itr = moment.twix(startAt, endAt).iterate('days');
    let office = Offices.findOne({_id: Router.current().params.officeId});
    let range = [];
    while (itr.hasNext()) {
      range.push(itr.next().toDate());
    }
    let disabledDays = openDaysToClosedNumbers(office.openDays);
    let groupId = Random.id();
    let closedDays = tmpl.closedDays.get();
    _.each(range, function(availabilityDate) {
      if (! _.contains( disabledDays, Number(moment(availabilityDate).format('d')))) {
        let availability = {
          groupId: groupId,
          date: availabilityDate,
          available: true,
          startTime: startTime,
          endTime: endTime,
          creator: Meteor.userId(),
          createdAt: new Date(),
        };
        Offices.update({_id: office._id}, {$push: {
          availabilities: availability,
        }});
        closedDays.push(availabilityDate);
      }
    });
    let startAtPicker = $('#startAt').pickadate('picker');
    startAtPicker.set('disable', false).set('disable', closedDays).clear().render();
    let endAtPicker = $('#endAt').pickadate('picker');
    endAtPicker.set('disable', false).set('disable', closedDays).clear().render();
    tmpl.closedDays.set(closedDays);
    return true;
  },
  'click .deleteAvailability' (evt, tmpl) {
    $(evt.currentTarget).addClass('loading');
    let availability = this;
    setTimeout(function () {
      Offices.update({_id: Router.current().params.officeId}, {$pull: {
        availabilities: availability,
      }});
      let closedDays = tmpl.closedDays.get();
      let removedDay = new Date(availability.date);
      closedDays = _.reject(closedDays, function(disabledDay, index) {
        return moment(disabledDay).isSame(removedDay, 'day');
      });
      let startAtPicker = $('#startAt').pickadate('picker');
      startAtPicker.set('disable', false).set('disable', closedDays).clear().render();
      let endAtPicker = $('#endAt').pickadate('picker');
      endAtPicker.set('disable', false).set('disable', closedDays).clear().render();
      tmpl.closedDays.set(closedDays);
      $('.deleteAvailability').removeClass('loading');
      return true;
    }, 250);
  },
  'change #startAt' () {
    $('.field').removeClass('error');
    $('.fields').removeClass('error');
    $('.ui.form').removeClass('error');
    let startAtDate = moment($('[name="startAt_submit"]').val()).toDate();
    let endAtPicker = $('#endAt').pickadate('picker');
    endAtPicker.set({
      'min': startAtDate,
      'select': startAtDate,
    });
  },
});
