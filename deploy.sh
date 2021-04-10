#1/usr/bin/env sh
# ./deploy.sh test|production

function deploy() {
  local serviceList=$1
  local tmpFile=./app.tar
  tar -cvf $tmpFile -C ./dist ./
  for i in `awk '{print $1}' $1`
  do
    j=`awk -v I="$i" '{if(I==$1)print $2}' $serviceList`
    k=`awk -v I="$i" '{if(I==$1)print $3}' $serviceList`
    echo "Executing upapk.expect $tmpFile $i $j **** \n......"
    res=`expect upapk.expect $tmpFile $i $j $k`
    echo "=======================Processing Result========================\n"
    echo "$res\n"
    echo "=========================Result END=============================\n"
  done
  rm -f $tmpFile 
}

case $1 in
test)
  npm run build:test
  deploy passwd.test.env
  ;;
production)
  npm run build
  deploy passwd.env
  ;;
usage|*)
  echo "usage ./deploy.sh test|production"
  ;;
esac
