@echo off
echo.
echo REACT_APP_RELEASE=dev > .env
echo REACT_APP_VERSION=0.6.3 >> .env
echo REACT_APP_STAGE=pre-alpha >> .env
set currenttime=%time%
if "%currenttime:~0,1%"==" " (SET currenttime=0%currenttime:~1%)
echo REACT_APP_BUILD_TIME=%date:~10,4%/%date:~4,2%/%date:~7,2% %currenttime:~0,5% >> .env
type .env
echo Do not forget to move /build to /dev.
npm run build
::move ./build ./dev
::echo build folder moved to /dev