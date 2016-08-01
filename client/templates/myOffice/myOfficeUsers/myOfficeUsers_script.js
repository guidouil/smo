Template.myOfficeUsers.onCreated(function(){
  this.owners = new ReactiveVar();
  this.users = new ReactiveVar();
});

Template.myOfficeUsers.onRendered(function () {
  var template = this;
  Meteor.call('getOfficeOwnersAndUsers', Router.current().params.officeId, function (err, result) {
    if (result.owners) {
      template.owners.set( result.owners);
    }
    if (result.users) {
      template.users.set(result.users);
    }
  });
});

Template.myOfficeUsers.helpers({
  office: function () {
    return Offices.findOne({_id: Router.current().params.officeId});
  },
  owners () {
    return Template.instance().owners.get();
  },
  users () {
    return Template.instance().users.get();
  },
});

Template.myOfficeUsers.events({
  'click .addOwner' (evt, template) {
    $('#ownerMail').parent().removeClass('error');
    let ownerMail = $('#ownerMail').val();
    if (validateEmail(ownerMail)) {
      Meteor.call('giveOfficeOrwnership', ownerMail, Router.current().params.officeId, function (error, result) {
        if (error) {
          console.error(error);
        }
        if (result === false) {
          $('#ownerMail').parent().addClass('error');
          $('.whoModal').modal('show');
          return false;
        }
        if (result === true) {
          $('#ownerMail').val('');
          Meteor.call('getOfficeOwnersAndUsers', Router.current().params.officeId, function (err, result) {
            if (result.owners) {
              template.owners.set( result.owners);
            }
          });
        }
      });
    } else {
      $('#ownerMail').parent().addClass('error');
    }
  },
  'keyup #ownerMail' (event) {
    if (event.which === 13) {
      event.stopPropagation();
      $('.addOwner').click();
    }
  },
  'click .removeOwner' (evt, template) {
    if (this.userId === Meteor.userId()) {
      alert('Par mesure de sécurité (et pour la santé mentale des développeurs) vous ne pouvez pas vous supprimer vous même des propriétaires de ce bureau. Désolé...');
      return false;
    }
    Meteor.call('removeOfficeOwnership', Router.current().params.officeId, this.userId, function(err, result) {
      if (result === true) {
        Meteor.call('getOfficeOwnersAndUsers', Router.current().params.officeId, function (err, result) {
          if (result.owners) {
            template.owners.set( result.owners);
          }
        });
      }
    });
  },
  'click .addUser' (evt, template) {
    $('#userMail').parent().removeClass('error');
    let userMail = $('#userMail').val();
    if (validateEmail(userMail)) {
      Meteor.call('giveOfficeUsership', userMail, Router.current().params.officeId, function (error, result) {
        if (error) {
          console.error(error);
        }
        if (result === false) {
          $('#userMail').parent().addClass('error');
          $('.whoModal').modal('show');
          return false;
        }
        if (result === true) {
          $('#userMail').val('');
          Meteor.call('getOfficeOwnersAndUsers', Router.current().params.officeId, function (err, result) {
            if (result.users) {
              template.users.set( result.users);
            }
          });
        }
      });
    } else {
      $('#userMail').parent().addClass('error');
    }
  },
  'keyup #userMail' (event) {
    if (event.which === 13) {
      event.stopPropagation();
      $('.addUser').click();
    }
  },
  'click .removeUser' (evt, template) {
    Meteor.call('removeOfficeUsership', Router.current().params.officeId, this.userId, function(err, result) {
      if (result === true) {
        Meteor.call('getOfficeOwnersAndUsers', Router.current().params.officeId, function (err, result) {
          if (result.users) {
            template.users.set( result.users);
          }
        });
      }
    });
  },
});
