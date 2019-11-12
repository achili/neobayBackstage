#!/bin/sh

echo " --- reset to HEAD --- "
sudo git reset --hard HEAD

echo " --- pull from git server --- "
sudo git pull

echo " --- change to production mode. --- "
sudo sed -i "s/debug:\ true/debug:\ false/g" ./src/common/store/index.js

echo " --- change tank host. --- "
sudo sed -i "s/http:\/\/tank.neobay.cn/https:\/\/yctank.liyarou.com/g" ./src/common/store/index.js

echo " --- npm install --- "
sudo cnpm install

echo " --- npm run build --- "
sudo npm run build

echo " --- finish updating! --- "




