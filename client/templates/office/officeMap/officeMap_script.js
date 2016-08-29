Template.officeMap.onRendered( function () {
  let tmpl = this;
  let officeId = Router.current().params.officeId;
  let office = Offices.findOne({_id: officeId});
  if (office && office.address) {

    VazcoMaps.init({}, function() {
      tmpl.mapEngine = VazcoMaps.gMaps();
      tmpl.newMap = new tmpl.mapEngine({
        div: '#map-canvas',
        lat: 49.17682,
        lng: -0.35400,
        zoom: 16
      });

      tmpl.mapEngine.geocode({
        address: office.address,
        callback: function(results, status) {
          if (status == 'OK') {
            let latlng = results[0].geometry.location;
            if (office && Router.current().lookupTemplate() === 'EditPlace') {
              Offices.update({_id: officeId},{$set: {loc: { "type": "Point", "coordinates": [latlng.lat(), latlng.lng()] } } });
            }
            tmpl.newMap.setCenter(latlng.lat(), latlng.lng());
            tmpl.newMap.addMarker({
              lat: latlng.lat(),
              lng: latlng.lng(),
              draggable: false,
              dragend: function() {
                let point = this.getPosition();
                tmpl.mapEngine.geocode({location: point, callback: function(results) {
                  office.address.val(results[0].formatted_address);
                  tmpl.newMap.setCenter(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                }});
              }
            });
            // office.address.val(results[0].formatted_address);
          } else {
            console.log(status);
          }
        }
      });
    });
  }
});

Template.officeMap.helpers({
  officeAddress () {
    let officeId = Router.current().params.officeId;
    let office = Offices.findOne({_id: officeId});
    if (office && office.address) {
      return encodeURI(office.address);
    }
    return false;
  },
});

Template.officeMap.events({
});
