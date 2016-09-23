let RefOG = {};

RefOG.url = 'https://ws-qds.group.echonet/RefogWS?applicationId=cn=user_COT&applicationPwd=Xbfgw$85&objectType=1&searchType=RAV';

Meteor.methods({
  searchByUid: function (uid) {
    let url = RefOG.url + '&searchText=' + uid + '&inputFields=SIP_I_UID&outputFields=SIP_NOM_USUEL,SIP_PRENOM_USUEL,SIP_EMAIL_DIRECT,SIP_EMAIL_GROUPE';
    // console.log(url);
    HTTP.get(url, {
      npmRequestOptions: {
        rejectUnauthorized: false // TODO remove when deploy
      },
      timeout: 30000, // 30s
      data: 'xml'
    }, function (error, result) {
      if (error) {
        console.error(error);
      }
      // console.log(result);
      if (result && result.content) {
        // console.log(result.content);
        xml2js.parseString(result.content, function (jsError, jsResult) {
          // console.error('errors', jsError);
          // console.log('info', jsResult.RefogSearch.info[0].ResultObjects[0]);
          // console.log('data', jsResult.RefogSearch.data[0].RefogObject[0].fields[0].Field);
          if (jsResult && jsResult.RefogSearch && jsResult.RefogSearch.info[0].ResultObjects[0] == 0) {
            console.log(jsResult.RefogSearch.info[0].ResultObjects[0]);
            return false;
          }
          let datas = jsResult.RefogSearch.data[0].RefogObject[0].fields[0].Field;
          let localUid = {};
          // console.log(datas);
          _.each( datas, function (data) {
            switch (data.Name[0]) {
              case 'SIP_PRENOM_USUEL':
                localUid.firstname = data.Value[0];
                break;
              case 'SIP_NOM_USUEL':
                localUid.lastname = data.Value[0];
                break;
              case 'SIP_EMAIL_GROUPE':
              case 'SIP_EMAIL_DIRECT':
                if (data.Value[0]) {
                  localUid.mail = data.Value[0];
                }
                break;
              default:
                break;
            }
          });
          // console.log(localUid);
          LocalUids.upsert({_id: uid}, {$set: localUid});
          return true;
        });
      }
    });
  }
});
