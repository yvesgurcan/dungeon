@echo off
echo.
echo REACT_APP_RELEASE=stable > .env
echo REACT_APP_VERSION=0.6.3 >> .env
echo REACT_APP_STAGE=pre-alpha >> .env






type .env
echo Do not forget to move /build to /stable.
npm run build
::move ./build ./stable
::echo build folder moved to /stable