#! /bin/bash


cd blockchain-explorer
npm run app-stop

cd ..
cd test-network

./network.sh down

