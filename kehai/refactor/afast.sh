#!/usr/bin/env bash
if [ $# -eq 1 ];then

   if [ "$1" = "win" ];then
        echo "dev in windows..."
        set NODE_ENV=development&set MOD=kehai&webpack-dev-server  --progress --hot

        if [ "$2" = "build" ];then
        echo "build in windows..."
            set NODE_ENV=production&set MOD=kehai&gulp default
        fi
   elif [ "$1" = "build" ];then
        npm run build
   else
        echo "tasking none"
   fi

else
     echo "start webpack-dev-server..."
     npm run dev

fi