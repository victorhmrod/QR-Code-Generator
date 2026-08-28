; Inno Setup script for QR Code Generator.
; Builds a per-user installer (no admin rights required) that:
;   - installs the app under %LOCALAPPDATA%\Programs\QR Code Generator
;   - creates Start Menu / optional Desktop shortcuts
;   - cleanly removes files on uninstall
;
; Build with: iscc installer\QRCodeGenerator.iss
; Expects the Electron app already packaged at dist-installer\win-unpacked
; (see scripts\build_installer.ps1, which does both steps).

#define MyAppName "QR Code Generator"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Victor H"
#define MyAppURL "https://github.com/victorhmrod/QR-Code-Generator"
#define MyAppExeName "QR Code Generator.exe"
#define ReleaseDir "..\dist-installer\win-unpacked"

[Setup]
AppId={{E6A5845B-9238-4902-8CFD-9C846B608315}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
; Per-user install: no admin/UAC prompt required.
PrivilegesRequired=lowest
DefaultDirName={autopf}\{#MyAppName}
DisableProgramGroupPage=yes
OutputDir=..\dist-installer
OutputBaseFilename=QRCodeGenerator-Setup-{#MyAppVersion}
SetupIconFile=..\public\icon.ico
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayIcon={app}\{#MyAppExeName}

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a &desktop shortcut"; GroupDescription: "Additional icons:"; Flags: unchecked

[Files]
Source: "{#ReleaseDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "..\LICENSE"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\README.md"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Launch {#MyAppName}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
