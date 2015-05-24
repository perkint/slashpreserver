#!/bin/bash

APP_NAME=slashpreserver
ROOT_DIR=`pwd`
ROOT_DIRS='overlays'
TMP_DIR=build.tmp

# remove any left-over files from previous build
[ -f $APP_NAME.xpi ] && rm $APP_NAME.xpi

# prepare components and defaults
mkdir $TMP_DIR
echo "Copying various files to $TMP_DIR folder..."
for DIR in $ROOT_DIRS; do
  mkdir $TMP_DIR/$DIR
  FILES="`find $DIR -path '*CVS*' -prune -o -type f -print | grep -v \~`"
  echo $FILES >> files
  cp --verbose --parents $FILES $TMP_DIR
done

# Copy other files to the root of future XPI.
for ROOT_FILE in $ROOT_FILES install.rdf chrome.manifest; do
  cp --verbose $ROOT_FILE $TMP_DIR
  if [ -f $ROOT_FILE ]; then
    echo $ROOT_FILE >> files
  fi
done

cd $TMP_DIR

# generate the XPI file
echo "Generating $APP_NAME.xpi..."
zip -r ../$APP_NAME.xpi *

cd $ROOT_DIR

echo "Cleanup..."
rm files
rm -rf $TMP_DIR
echo "Done!"

