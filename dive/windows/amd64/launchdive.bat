@echo off
REM get the current directory of the script
set SCRIPT_DIR=%~dp0

REM start dive with the specified image
start "DIVE" "%SCRIPT_DIR%/dive.exe" "%1"
