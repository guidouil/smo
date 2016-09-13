# Deploy on a private server
```sh
# NOT AS ROOT
cd
rm -rf smo-source
rm -rf builds
git clone https://github.com/guidouil/smo.git smo-source
cd smo-source
meteor npm install --save moment bcrypt twix jquery hammerjs
meteor build ../builds/. --server-only
cd ../builds/
tar xzf smo-source.tar.gz
cd
forever stop smo
rm -rf smo
cd builds
mv bundle ../smo
cd ../smo/programs/server/
npm install
cd
export MONGO_URL='mongodb://127.0.0.1:27017/smo'
export PORT=3000
export ROOT_URL='http://92.222.92.44:3000'
forever start --append --uid "smo" smo/main.js
date

```

# Deploy to public Bluemix  https://console.eu-gb.bluemix.net
```sh
meteor reset && meteor build ../builds/. --server-only --architecture os.linux.x86_64

cd ../builds
rm -rf bundle
tar xzf smo.tar.gz
cp ../smo/private/bluemix_package.json ./bundle/package.json
cd bundle/programs/server/
npm install

cd ../../
chmod -R +w+x *
cf push sharemyoffice
cd ../../smo/

```

# Build iOS App (from a Mac with x code)
```sh
meteor reset
meteor build ../builds/. --server http://sharemyoffice.eu-gb.mybluemix.net
```
