---
spec_id: admin/madvr-labs-envy
schema_version: ai4av-public-spec-v1
revision: 1
title: "MADVR LABS ENVY Control Spec"
manufacturer: madVR
model_family: Envy
aliases: []
compatible_with:
  manufacturers:
    - madVR
    - "MADVR LABS"
  models:
    - Envy
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - madvrenvy.com
source_urls:
  - https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
retrieved_at: 2026-04-30T04:34:22.833Z
last_checked_at: 2026-06-02T04:56:27.647Z
generated_at: 2026-06-02T04:56:27.647Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "source contains no explicit multi-step sequences."
  - "no other safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
  - "firmware version compatibility range, voltage/current draw, MAC-address slot count, and 3DLUT byte-length validation rules not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T04:56:27.647Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions matched literally in source with correct opcodes, parameter shapes, and transport (TCP/44077/no-auth). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# MADVR LABS ENVY Control Spec

## Summary
The madVR Envy is a video processor with TCP/IP control. Envy runs as a TCP server on port 44077, supports up to 16 concurrent connections, and exchanges ASCII (UTF-8) command lines terminated by CR/LF. Commands cover power, menu/GUI, aspect ratio, profile management, options, 3DLUT files, settings, EDID, and maintenance operations; the server pushes unsolicited notifications for state changes.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 44077
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: PowerOff / Standby / Restart / ReloadSoftware
- routable        # inferred: ActivateProfile / OpenMenu navigation
- queryable       # inferred: GetIncomingSignalInfo, GetAspectRatio, GetTemperatures, etc.
```

## Actions
```yaml
# 5.1 Power
- id: power_off
  label: Power Off
  kind: action
  command: "PowerOff"
  params: []
- id: standby
  label: Standby
  kind: action
  command: "Standby"
  params: []
- id: restart
  label: Restart
  kind: action
  command: "Restart"
  params: []
- id: reload_software
  label: Reload Software
  kind: action
  command: "ReloadSoftware"
  params: []

# 5.2 Menu / GUI
- id: open_menu
  label: Open Menu
  kind: action
  command: "OpenMenu {menu}"
  params:
    - name: menu
      type: string
      description: One of Info, Settings, Configuration, Profiles, TestPatterns (or a pageId)
- id: close_menu
  label: Close Menu
  kind: action
  command: "CloseMenu"
  params: []
- id: key_press
  label: Key Press (short, <0.7s)
  kind: action
  command: "KeyPress {button}"
  params:
    - name: button
      type: string
      description: POWER, INFO, MENU=CONFIG, LEFT, RIGHT, UP, DOWN, OK, INPUT=PROFILES, SETTINGS, BACK, RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN
- id: key_hold
  label: Key Hold (>1s)
  kind: action
  command: "KeyHold {button}"
  params:
    - name: button
      type: string
      description: Same button names as KeyPress
- id: display_alert_window
  label: Display Alert Window
  kind: action
  command: "DisplayAlertWindow {text}"
  params:
    - name: text
      type: string
      description: Alert window text shown centered on display
- id: close_alert_window
  label: Close Alert Window
  kind: action
  command: "CloseAlertWindow"
  params: []
- id: display_message
  label: Display Message
  kind: action
  command: "DisplayMessage {seconds} {text}"
  params:
    - name: seconds
      type: integer
      description: Timeout in seconds
    - name: text
      type: string
      description: Message text
- id: display_audio_volume
  label: Display Audio Volume
  kind: action
  command: "DisplayAudioVolume {min} {current} {max} {unit}"
  params:
    - name: min
      type: integer
    - name: current
      type: integer
    - name: max
      type: integer
    - name: unit
      type: string
      description: Unit description, e.g. "dB" or "%"
- id: display_audio_mute
  label: Display Audio Mute
  kind: action
  command: "DisplayAudioMute"
  params: []
- id: close_audio_mute
  label: Close Audio Mute
  kind: action
  command: "CloseAudioMute"
  params: []

# 5.3 Aspect Ratio
- id: set_aspect_ratio_mode
  label: Set Aspect Ratio Mode
  kind: action
  command: "SetAspectRatioMode {mode}"
  params:
    - name: mode
      type: string
      description: Auto | Hold | 4:3 | 16:9 | 1.85:1 | 2.00:1 | 2.20:1 | 2.35:1 | 2.40:1 | 2.55:1 | 2.76:1

# 5.4 Information Requests
- id: get_incoming_signal_info
  label: Get Incoming Signal Info
  kind: query
  command: "GetIncomingSignalInfo"
  params: []
- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  command: "GetAspectRatio"
  params: []
- id: get_masking_ratio
  label: Get Masking Ratio
  kind: query
  command: "GetMaskingRatio"
  params: []
- id: get_temperatures
  label: Get Temperatures
  kind: query
  command: "GetTemperatures"
  params: []
- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "GetMacAddress"
  params: []

# 5.5 Custom Profile Groups
- id: create_profile_group
  label: Create Profile Group
  kind: action
  command: "CreateProfileGroup {name}"
  params:
    - name: name
      type: string
      description: New custom profile group name
- id: rename_profile_group
  label: Rename Profile Group
  kind: action
  command: "RenameProfileGroup {groupId} {name}"
  params:
    - name: groupId
      type: string
      description: Custom profile group ID
    - name: name
      type: string
      description: New name
- id: delete_profile_group
  label: Delete Profile Group
  kind: action
  command: "DeleteProfileGroup {groupId}"
  params:
    - name: groupId
      type: string
- id: enum_profile_groups
  label: Enumerate Profile Groups
  kind: query
  command: "EnumProfileGroups"
  params: []

# 5.6 Source, Display, Custom Profiles
- id: create_profile
  label: Create Profile
  kind: action
  command: "CreateProfile {group} {name}"
  params:
    - name: group
      type: string
      description: SOURCE | DISPLAY | customProfileGroupId
    - name: name
      type: string
      description: New profile name
- id: rename_profile
  label: Rename Profile
  kind: action
  command: "RenameProfile {group} {profileId} {name}"
  params:
    - name: group
      type: string
    - name: profileId
      type: string
    - name: name
      type: string
- id: delete_profile
  label: Delete Profile
  kind: action
  command: "DeleteProfile {group} {profileId}"
  params:
    - name: group
      type: string
    - name: profileId
      type: string
- id: add_profile_to_page
  label: Add Profile To Page
  kind: action
  command: "AddProfileToPage {fullProfileId} {pageId}"
  params:
    - name: fullProfileId
      type: string
    - name: pageId
      type: string
- id: remove_profile_from_page
  label: Remove Profile From Page
  kind: action
  command: "RemoveProfileFromPage {fullProfileId} {pageId}"
  params:
    - name: fullProfileId
      type: string
    - name: pageId
      type: string
- id: activate_profile
  label: Activate Profile
  kind: action
  command: "ActivateProfile {group} {profileId}"
  params:
    - name: group
      type: string
      description: SOURCE | DISPLAY | customProfileGroupId
    - name: profileId
      type: string
      description: 0 deactivates
- id: get_active_profile
  label: Get Active Profile
  kind: query
  command: "GetActiveProfile {group}"
  params:
    - name: group
      type: string
- id: enum_profiles
  label: Enumerate Profiles
  kind: query
  command: "EnumProfiles {group}"
  params:
    - name: group
      type: string

# 5.7 Options
- id: enum_setting_pages
  label: Enumerate Setting Pages
  kind: query
  command: "EnumSettingPages"
  params: []
- id: enum_config_pages
  label: Enumerate Configuration Pages
  kind: query
  command: "EnumConfigPages"
  params: []
- id: enum_options
  label: Enumerate Options
  kind: query
  command: "EnumOptions {pageId}"
  params:
    - name: pageId
      type: string
      description: Settings page id, config page id, or detailed path e.g. temporary\hdrSettings
- id: query_option
  label: Query Option
  kind: query
  command: "QueryOption {optionId}"
  params:
    - name: optionId
      type: string
      description: Option id or detailed path
- id: change_option
  label: Change Option
  kind: action
  command: "ChangeOption {optionIdPath} {value}"
  params:
    - name: optionIdPath
      type: string
    - name: value
      type: string
      description: Quoted string value, integer, YES, or NO
- id: inherit_option
  label: Inherit Option
  kind: action
  command: "InheritOption {optionIdPath}"
  params:
    - name: optionIdPath
      type: string
      description: Must be a detailed profile ID path
- id: reset_temporary
  label: Reset Temporary Settings
  kind: action
  command: "ResetTemporary"
  params: []

# 5.8 3DLUT Files
- id: enum_3dlut_files
  label: Enumerate 3DLUT Files
  kind: query
  command: "Enum3DLUTFiles"
  params: []
- id: rename_3dlut_file
  label: Rename 3DLUT File
  kind: action
  command: "Rename3DLUTFile {oldName.3dlut} {newName.3dlut}"
  params:
    - name: oldName.3dlut
      type: string
    - name: newName.3dlut
      type: string
- id: delete_3dlut_file
  label: Delete 3DLUT File
  kind: action
  command: "Delete3DLUTFile {fileName.3dlut}"
  params:
    - name: fileName.3dlut
      type: string
- id: download_3dlut_file
  label: Download 3DLUT File
  kind: action
  command: "Download3DLUTFile {fileName.3dlut}"
  params:
    - name: fileName.3dlut
      type: string
      description: Reply precedes file with: Download3DLUTFile {base64size} {crcInHex} {fileName.3dlut}
- id: upload_3dlut_file
  label: Upload 3DLUT File
  kind: action
  command: "Upload3DLUTFile {base64size} {crcInHex} {fileName.3dlut}"
  params:
    - name: base64size
      type: integer
    - name: crcInHex
      type: string
    - name: fileName.3dlut
      type: string
      description: Follow command with base64-encoded file body

# 5.9 Demo
- id: toggle_option
  label: Toggle Option
  kind: action
  command: "Toggle {option}"
  params:
    - name: option
      type: string
      description: ToneMap | HighlightRecovery | ContrastRecovery | ShadowRecovery | 3DLUT | ScreenBoundaries | Histogram | DebugOSD
- id: tone_map_on
  label: Tone Map On
  kind: action
  command: "ToneMapOn"
  params: []
- id: tone_map_off
  label: Tone Map Off
  kind: action
  command: "ToneMapOff"
  params: []

# 5.10 Settings Management
- id: download_settings_file
  label: Download Settings File
  kind: action
  command: "DownloadSettingsFile"
  params: []
- id: upload_settings_file
  label: Upload Settings File
  kind: action
  command: "UploadSettingsFile {base64size} {crcInHex}"
  params:
    - name: base64size
      type: integer
    - name: crcInHex
      type: string
      description: Follow with base64-encoded file body
- id: store_settings
  label: Store Settings
  kind: action
  command: "StoreSettings {target} {storageName} {password}"
  params:
    - name: target
      type: string
      description: Installer | Suggested | slotIndex (1..16)
    - name: storageName
      type: string
      description: Quoted storage name
    - name: password
      type: string
      description: Optional quoted service password (required to overwrite Installer / Suggested)
- id: restore_settings
  label: Restore Settings
  kind: action
  command: "RestoreSettings {target}"
  params:
    - name: target
      type: string
      description: Installer | Suggested | slotIndex (1..16)

# 5.11 EDID Management
- id: download_edid_file
  label: Download EDID File
  kind: action
  command: "DownloadEDIDFile {target}"
  params:
    - name: target
      type: string
      description: Current (or omit) for display EDID, or slotIndex
- id: upload_edid_file
  label: Upload EDID File
  kind: action
  command: "UploadEDIDFile {slotIndex} {base64size} {crcInHex} {storageName}"
  params:
    - name: slotIndex
      type: integer
    - name: base64size
      type: integer
    - name: crcInHex
      type: string
    - name: storageName
      type: string

# 5.12 Other
- id: refresh_license_info
  label: Refresh License Info
  kind: action
  command: "RefreshLicenseInfo"
  params: []
- id: force_1080p60_output
  label: Force 1080p60 Output
  kind: action
  command: "Force1080p60Output"
  params: []
- id: hotplug
  label: HDMI Hotplug
  kind: action
  command: "Hotplug"
  params: []
- id: bye
  label: Close Connection
  kind: action
  command: "Bye"
  params: []

# 2 Connection / Heartbeat
- id: heartbeat
  label: Heartbeat
  kind: action
  command: "Heartbeat"
  params: []
  notes: Send every 20s; server replies "OK" and closes after 60s of silence.
```

## Feedbacks
```yaml
# 5.4 Information replies
- id: mac_address
  type: string
  description: Reply to GetMacAddress, e.g. "01-02-03-04-05-06"
- id: temperatures
  type: string
  description: Reply to GetTemperatures. Format: Temperatures {gpu} {hdmiInput} "{cpu}" "{mainboard}" {unknownFuture}

# 5.5 Profile Group enumeration
- id: profile_group
  type: string
  description: One line per group: ProfileGroup {profileGroupId} "{profileGroupName}"

# 5.6 Profile enumeration / active
- id: profile
  type: string
  description: One line per profile: Profile {fullProfileId} "{profileName}"
- id: active_profile
  type: string
  description: Reply to GetActiveProfile: ActiveProfile {requestedProfileGroup} {activeProfileIndex}

# 5.7 Option enumeration / query
- id: setting_page
  type: string
  description: SettingPage {profileGroupId} "{profileName}"
- id: config_page
  type: string
  description: ConfigPage {profileGroupId} "{profileName}"
- id: option
  type: string
  description: Option {optionType} {optionId} {currentValue} {effectiveValue}; optionType is STRING or INTEGER

# 5.8 3DLUT enumeration / transfer
- id: three_dlut_file
  type: string
  description: One line per file: 3DLUTFile "{fileName.3dlut}"
- id: three_dlut_download_header
  type: string
  description: Preamble before base64 body: Download3DLUTFile {base64size} {crcInHex} "{fileName.3dlut}"

# 2 Welcome / Heartbeat / generic
- id: welcome
  type: string
  description: Initial banner sent on connect, e.g. "WELCOME to Envy v1.0.1.0"
- id: ok
  type: string
  description: Generic acknowledgement "OK"
- id: error
  type: string
  description: Generic error: ERROR "{description}"
```

## Variables
```yaml
- id: aspect_ratio
  type: string
  description: AspectRatio {pixelAR} {floatAR} {nearestWellKnownAR} "{description}" (well-known ratios: 119,133,137,143,166,175,178,185,190,200,210,220,235,239,240,255,266,276)
- id: masking_ratio
  type: string
  description: MaskingRatio {pixelAR} {floatAR} {nearestWellKnownAR}
- id: incoming_signal_info
  type: string
  description: IncomingSignalInfo {resolution} {refresh} {2D|3D} {RGB|444|422|420} {8|10|12bit} {SDR|HDR10|HLG} {601|PAL|709|DCI|2020} {TV|PC} {16:9|4:3}
- id: outgoing_signal_info
  type: string
  description: OutgoingSignalInfo {resolution} {refresh} {2D|3D} {RGB|444|422|420} {8|10|12bit} {SDR|HDR10|HLG} {601|PAL|709|DCI|2020} {TV|PC}
```

## Events
```yaml
# Section 6 notifications. All unsolicited, pushed to all connected clients.
- id: power_state
  type: enum
  values: [power_off, standby, restart, reload_software]
  description: "PowerOff / Standby / Restart / ReloadSoftware"
- id: menu_state
  type: enum
  values: [open, close]
  description: "OpenMenu {menu} / CloseMenu"
- id: key_event
  type: enum
  values: [press, hold]
  description: "KeyPress|KeyHold {ButtonName}"
- id: aspect_ratio_change
  type: string
  description: "AspectRatio / MaskingRatio / SetAspectRatioMode"
- id: profile_group_change
  type: string
  description: "CreateProfileGroup / RenameProfileGroup / DeleteProfileGroup"
- id: profile_change
  type: string
  description: "CreateProfile / RenameProfile / DeleteProfile / AddProfileToPage / RemoveProfileFromPage / ActivateProfile"
- id: option_change
  type: string
  description: "ChangeOption / InheritOption / ResetTemporary"
- id: three_dlut_change
  type: string
  description: "Upload3DLUTFile / Rename3DLUTFile / Delete3DLUTFile"
- id: demo_change
  type: string
  description: "Toggle / ToneMapOn / ToneMapOff"
- id: settings_change
  type: string
  description: "UploadSettingsFile / StoreSettings / RestoreSettings"
- id: signal_change
  type: string
  description: "NoSignal / IncomingSignalInfo / OutgoingSignalInfo / DisplayChanged"
- id: misc_event
  type: string
  description: "RefreshLicenseInfo / Force1080p60Output / Hotplug / FirmwareUpdate / MissingHeartbeat"
```

## Macros
```yaml
# UNRESOLVED: source contains no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - delete_3dlut_file    # source: "no undelete available"
  - store_settings        # source: Installer/Suggested overwrites require service password
interlocks: []
# UNRESOLVED: no other safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
- Envy supports up to 16 concurrent TCP connections on port 44077.
- Lines are CR/LF terminated (0x0D, 0x0A or 0x0D 0x0A); parameters are space-separated; quoted strings support embedded spaces.
- Replies are either "OK" or `ERROR "description"`.
- Heartbeat must be sent every 20s; server closes the connection after 60s of silence (also pushes a `MissingHeartbeat` notification first).
- Welcome banner is sent on connect, no reply required.
- 3DLUT and settings file transfers use base64 body with a `{base64size} {crcInHex}` header; CRC32 is initialised with -1 on the receiver side.
- Replies and notifications can arrive out of expected order — clients must not depend on strict ordering.
- `Bye` cleanly closes the TCP connection from the client side.
- A "Windows-only Envy IP Control Tool with Delphi source" is mentioned at http://madVR.com/EnvyIpControl.zip — not part of the wire protocol.

<!-- UNRESOLVED: firmware version compatibility range, voltage/current draw, MAC-address slot count, and 3DLUT byte-length validation rules not stated in source. -->

## Provenance

```yaml
source_domains:
  - madvrenvy.com
source_urls:
  - https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
retrieved_at: 2026-04-30T04:34:22.833Z
last_checked_at: 2026-06-02T04:56:27.647Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:56:27.647Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions matched literally in source with correct opcodes, parameter shapes, and transport (TCP/44077/no-auth). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "source contains no explicit multi-step sequences."
- "no other safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
- "firmware version compatibility range, voltage/current draw, MAC-address slot count, and 3DLUT byte-length validation rules not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
