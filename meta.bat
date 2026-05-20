@echo off
if "%1"=="panel" (
    echo open > "%~dp0.meta-panel-trigger"
) else (
    echo Usage: meta panel
)
