#!/bin/bash
# script used in travis CI continuos deployement, called by .travis.yml 
# initially from https://github.com/probonopd/uploadtool/raw/master/upload.sh 
set +x # Do not leak information

################################################################
######################  release number of app###################
################################################################

# reading version number from package.json using bash and assigning to enviroment variable for travis 
# as explained here https://gist.github.com/DarrenN/8c6a5b969481725a4413
TRAVIS_TAG=$(cat ./package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[" ,]//g')
echo "troubleshooting TRAVIS_TAG"
echo $TRAVIS_TAG

################################################################
######################  name of the app ########################
################################################################

# doing same thing with app name, reading it from package.json to make suffix of release
UPLOADTOOL_SUFFIX=$(cat ./package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[" ,]//g')
echo "troubleshooting UPLOADTOOL_SUFFIX "
echo $UPLOADTOOL_SUFFIX

################################################################
#######  takes file to upload as argument  to the script #######
################################################################

# checks for command line argument to this script
# Exit immediately if one of the files given as arguments is not there
# because we don't want to delete the existing release if we don't have
# the new files that should be uploaded 
for file in "$@"
do
    if [ ! -e "$file" ]
    then echo "$file is missing, giving up." >&2; exit 1
    fi
done

echo "Processing"
echo $UPLOADTOOL_SUFFIX
echo $TRAVIS_TAG
echo $TRAVIS_OS_NAME

################################################################
#####################   NOT SURE WHAT THIS DOES? ###############
################################################################

if [ $# -eq 0 ]; then
    echo "No artifacts to use for release, giving up."
    exit 0
fi

if command -v sha256sum >/dev/null 2>&1 ; then
  shatool="sha256sum"
elif command -v shasum >/dev/null 2>&1 ; then
  shatool="shasum -a 256" # macOS fallback
else
  echo "Neither sha256sum nor shasum is available, cannot check hashes"
fi


################################################################
###  Setting Release name, title, and pre-release settings #####
################################################################

RELEASE_NAME="$UPLOADTOOL_SUFFIX-$TRAVIS_TAG-$TRAVIS_OS_NAME"
RELEASE_TITLE="$UPLOADTOOL_SUFFIX $TRAVIS_TAG $TRAVIS_OS_NAME"
is_prerelease="$IS_PRERELEASE"

echo  "Infoss"
echo $RELEASE_NAME
echo $RELEASE_TITLE


if [ "$ARTIFACTORY_BASE_URL" != "" ]; then
  echo "ARTIFACTORY_BASE_URL set, trying to upload to artifactory"

  if [ "$ARTIFACTORY_API_KEY" == "" ]; then
    echo "Please set ARTIFACTORY_API_KEY"
    exit 1
  fi

  files="$@"

  # DESCRIPION
  # This adds the description to the release by uploading a file 
  # artifactory doesn't support any kind of "artifact description", so we're uploading a text file containing the
  # relevant details along with the other artifacts
  tempdir=$(mktemp -d)
  info_file="$tempdir"/build-info.txt
  echo "Travis CI build log: https://travis-ci.org/$TRAVIS_REPO_SLUG/builds/$TRAVIS_BUILD_ID/" > "$info_file"
  files+=("$info_file")

  set +x

################################################################
######################      ?       ###########################
################################################################

  for file in ${files[@]}; do
    url="${ARTIFACTORY_BASE_URL}/travis-${TRAVIS_BUILD_NUMBER}/"$(basename "$file")
    md5sum=$(md5sum "$file" | cut -d' ' -f1)
    sha1sum=$(sha1sum "$file" | cut -d' ' -f1)
    sha256sum=$(sha256sum "$file" | cut -d' ' -f1)
    echo "Uploading $file to $url"
    hashsums=(-H "X-Checksum-Md5:$md5sum")
    hashsums+=(-H "X-Checksum-Sha1:$sha1sum")
    hashsums+=(-H "X-Checksum-Sha256:$sha256sum")
    if ! curl -H 'X-JFrog-Art-Api:'"$ARTIFACTORY_API_KEY" "${hashsums[@]}" -T "$file" "$url"; then
      echo "Failed to upload file, exiting"
      rm -r "$tempdir"
      exit 1
    fi
    echo
    echo "MD5 checksum: $md5sum"
    echo "SHA1 checksum: $sha1sum"
    echo "SHA256 checksum: $sha256sum"
  done
  rm -r "$tempdir"
fi


################################################################
######################      Pull Request trigger build       ###
################################################################

// TODO: perhaps coment this out? might be good if it only builds from master
// better workflow.

# PULL REQUEST Tigger Build
if [ "$TRAVIS_EVENT_TYPE" == "pull_request" ] ; then
  echo "Release uploading disabled for pull requests"
  if [ "$ARTIFACTORY_BASE_URL" != "" ]; then
    echo "Releases have already been uploaded to Artifactory, exiting"
    exit 0
  else
    echo "Release uploading disabled for pull requests, uploading to transfer.sh instead"
    rm -f ./uploaded-to
    for FILE in "$@" ; do
      BASENAME="$(basename "${FILE}")"
      curl --upload-file $FILE "https://transfer.sh/$BASENAME" > ./one-upload
      echo "$(cat ./one-upload)" # this way we get a newline
      echo -n "$(cat ./one-upload)\\n" >> ./uploaded-to # this way we get a \n but no newline
    done
  fi
  $shatool "$@"
  exit 0
fi

################################################################
######################      ?       ###########################
################################################################

if [ ! -z "$TRAVIS_REPO_SLUG" ] ; then
  # We are running on Travis CI
  echo "Running on Travis CI"
  echo "TRAVIS_COMMIT: $TRAVIS_COMMIT"
  REPO_SLUG="$TRAVIS_REPO_SLUG"
  if [ -z "$GITHUB_TOKEN" ] ; then
    echo "\$GITHUB_TOKEN missing, please set it in the Travis CI settings of this project"
    echo "You can get one from https://github.com/settings/tokens"
    exit 1
  fi
else
  # We are not running on Travis CI
  echo "Not running on Travis CI"
  if [ -z "$REPO_SLUG" ] ; then
    read -r -p "Repo Slug (GitHub and Travis CI username/reponame): " REPO_SLUG
  fi
  if [ -z "$GITHUB_TOKEN" ] ; then
    read -r -s -p "Token (https://github.com/settings/tokens): " GITHUB_TOKEN
  fi
fi

################################################################
#############               ?                         ##########
################################################################
tag_url="https://api.github.com/repos/$REPO_SLUG/git/refs/tags/$RELEASE_NAME"
tag_infos=$(curl -XGET --header "Authorization: token ${GITHUB_TOKEN}" "${tag_url}")
echo "tag_infos: $tag_infos"
tag_sha=$(echo "$tag_infos" | grep '"sha":' | head -n 1 | cut -d '"' -f 4 | cut -d '{' -f 1)
echo "tag_sha: $tag_sha"

################################################################
#############               Get release by tag name   ##########
################################################################

// https://developer.github.com/v3/repos/releases/#get-a-release-by-tag-name

release_url="https://api.github.com/repos/$REPO_SLUG/releases/tags/$RELEASE_NAME"
echo "Getting the release ID..."
echo "release_url: $release_url"
release_infos=$(curl -XGET --header "Authorization: token ${GITHUB_TOKEN}" "${release_url}")
echo "release_infos: $release_infos"
release_id=$(echo "$release_infos" | grep "\"id\":" | head -n 1 | tr -s " " | cut -f 3 -d" " | cut -f 1 -d ",")
echo "release ID: $release_id"
upload_url=$(echo "$release_infos" | grep '"upload_url":' | head -n 1 | cut -d '"' -f 4 | cut -d '{' -f 1)
echo "upload_url: $upload_url"
release_url=$(echo "$release_infos" | grep '"url":' | head -n 1 | cut -d '"' -f 4 | cut -d '{' -f 1)
echo "release_url: $release_url"
target_commit_sha=$(echo "$release_infos" | grep '"target_commitish":' | head -n 1 | cut -d '"' -f 4 | cut -d '{' -f 1)
echo "target_commit_sha: $target_commit_sha"

if [ "$TRAVIS_COMMIT" != "$target_commit_sha" ] ; then

  echo "TRAVIS_COMMIT != target_commit_sha, hence deleting $RELEASE_NAME..."
  
################################################################
#############     Delete release using id             ##########
################################################################

// https://developer.github.com/v3/repos/releases/#delete-a-release


  if [ ! -z "$release_id" ]; then
    delete_url="https://api.github.com/repos/$REPO_SLUG/releases/$release_id"
    echo "Delete the release..."
    echo "delete_url: $delete_url"
    curl -XDELETE \
        --header "Authorization: token ${GITHUB_TOKEN}" \
        "${delete_url}"
  fi

  # echo "Checking if release with the same name is still there..."
  # echo "release_url: $release_url"
  # curl -XGET --header "Authorization: token ${GITHUB_TOKEN}" \
  #     "$release_url"

################################################################
#############      delete Relese with same name?       ##########
################################################################

  if [ "$is_prerelease" = "true" ] ; then
    # if this is a continuous build tag, then delete the old tag
    # in preparation for the new release
    echo "Delete the tag..."
    delete_url="https://api.github.com/repos/$REPO_SLUG/git/refs/tags/$RELEASE_NAME"
    echo "delete_url: $delete_url"
    curl -XDELETE \
        --header "Authorization: token ${GITHUB_TOKEN}" \
        "${delete_url}"
  fi

################################################################
######################      prep release info?     ##############
################################################################

  echo "Create release..."
# https://docs.travis-ci.com/user/environment-variables/
  if [ -z "$TRAVIS_BRANCH" ] ; then
    TRAVIS_BRANCH="master"
  fi

# TODO: if body could take from commit message that would be awesome?
  if [ ! -z "$TRAVIS_JOB_ID" ] ; then
    if [ -z "${UPLOADTOOL_BODY+x}" ] ; then
      # TODO: The host could be travis-ci.org (legacy open source) or travis-ci.com (subscription or latest open source).
      BODY="Travis CI build log: https://travis-ci.org/$REPO_SLUG/builds/$TRAVIS_BUILD_ID/"
    else
      BODY="$UPLOADTOOL_BODY"
    fi
  else
    BODY="$UPLOADTOOL_BODY"
  fi

################################################################
######################      Create release       ################
################################################################

// https://developer.github.com/v3/repos/releases/#create-a-release

  release_infos=$(curl -H "Authorization: token ${GITHUB_TOKEN}" \
       --data '{"tag_name": "'"$RELEASE_NAME"'","target_commitish": "'"$TRAVIS_COMMIT"'","name": "'"$RELEASE_TITLE"'","body": "'"$BODY"'","draft": false,"prerelease": '$is_prerelease'}' "https://api.github.com/repos/$REPO_SLUG/releases")

  echo "$release_infos"

  unset upload_url
  upload_url=$(echo "$release_infos" | grep '"upload_url":' | head -n 1 | cut -d '"' -f 4 | cut -d '{' -f 1)
  echo "upload_url: $upload_url"

  unset release_url
  release_url=$(echo "$release_infos" | grep '"url":' | head -n 1 | cut -d '"' -f 4 | cut -d '{' -f 1)
  echo "release_url: $release_url"

fi # if [ "$TRAVIS_COMMIT" != "$tag_sha" ]

if [ -z "$release_url" ] ; then
  echo "Cannot figure out the release URL for $RELEASE_NAME"
  exit 1
fi


################################################################
######################      upload file to release?  ###########
################################################################

# UPLOAD FILE TO RELEASE
echo "Upload binaries to the release..."

for FILE in "$@" ; do
  FULLNAME="${FILE}"
  BASENAME="$(basename "${FILE}")"
  curl -H "Authorization: token ${GITHUB_TOKEN}" \
       -H "Accept: application/vnd.github.manifold-preview" \
       -H "Content-Type: application/octet-stream" \
       --data-binary @$FULLNAME \
       "$upload_url?name=$BASENAME"
  echo ""
done


################################################################
######################      publish release   ##################
################################################################

$shatool "$@"

if [ "$TRAVIS_COMMIT" != "$tag_sha" ] ; then
  echo "Publish the release..."

  release_infos=$(curl -H "Authorization: token ${GITHUB_TOKEN}" \
       --data '{"draft": false}' "$release_url")

  echo "$release_infos"
fi # if [ "$TRAVIS_COMMIT" != "$tag_sha" ]