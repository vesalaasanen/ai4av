---
spec_id: admin/madvr-envy
schema_version: ai4av-public-spec-v1
revision: 1
title: "madVR Envy Control Spec"
manufacturer: madVR
model_family: "madVR Envy"
aliases: []
compatible_with:
  manufacturers:
    - madVR
  models:
    - "madVR Envy"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - madvrenvy.com
source_urls:
  - https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
retrieved_at: 2026-04-26T17:04:37.161Z
last_checked_at: 2026-06-02T17:23:21.084Z
generated_at: 2026-06-02T17:23:21.084Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EDID file format, full option catalogue, and option value ranges are not enumerated in source. REST/API control is not described in this document (user note of \"REST\" is overridden by source evidence showing raw TCP ASCII)."
  - "source does not document multi-step command macros."
  - "source does not describe interlock procedures or power-on sequencing requirements beyond the PowerOff / Standby notes above."
  - "firmware version compatibility, full option/value catalogue, EDID block format, 3DLUT file format, exact set of supported color spaces/transfer characteristics (only examples listed in source)."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:21.084Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions matched literally in source; port 44077 TCP verified; no transport issues; command catalogue fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# madVR Envy Control Spec

## Summary
The madVR Envy is a video processor that exposes an ASCII text command interface over a raw TCP socket (port 44077, up to 16 concurrent connections). Clients send `Command Args⏎` lines; Envy replies with `OK⏎` or `ERROR "..."⏎` and pushes unsolicited notifications while the connection is open. A heartbeat (`Heartbeat⏎` every ~20s) is required to keep the connection alive beyond 60s of silence.

<!-- UNRESOLVED: EDID file format, full option catalogue, and option value ranges are not enumerated in source. REST/API control is not described in this document (user note of "REST" is overridden by source evidence showing raw TCP ASCII). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 44077
auth:
  type: none  # inferred: no login/password/auth procedure described in source
```

## Traits
```yaml
- powerable       # inferred: PowerOff / Standby / Restart / ReloadSoftware
- routable        # inferred: ActivateProfile, SOURCE/DISPLAY routing
- queryable       # inferred: Get* / Enum* / QueryOption commands
- levelable       # inferred: DisplayAudioVolume min/current/max
```

## Actions
```yaml
- id: heartbeat
  label: Heartbeat
  kind: action
  command: "Heartbeat"
  params: []
  notes: |
    Send every ~20 seconds. Envy closes the connection after 60 seconds of silence.
    Reply: "OK". Special command outside the numbered reference sections.

- id: power_off
  label: Power Off
  kind: action
  command: "PowerOff"
  params: []
  notes: |
    Envy no longer reacts to remote. Wake only via front-panel power button or Wake-On-LAN.

- id: standby
  label: Standby
  kind: action
  command: "Standby"
  params: []
  notes: |
    Low-power state. Still reacts to remote / front-panel / Wake-On-LAN.

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
  notes: "Takes about 2-3 seconds. Triggered automatically on certain signal-format changes."

- id: open_menu
  label: Open Menu
  kind: action
  command: "OpenMenu {menu}"
  params:
    - name: menu
      type: string
      description: One of Info, Settings, Configuration, Profiles, TestPatterns (case-insensitive; e.g. "Configuration", "hdrSettings").
  notes: "May also accept detailed page IDs from section 5.3."

- id: close_menu
  label: Close Menu
  kind: action
  command: "CloseMenu"
  params: []

- id: key_press
  label: Key Press (short)
  kind: action
  command: "KeyPress {button}"
  params:
    - name: button
      type: string
      description: |
        One of POWER, INFO, MENU(=CONFIG), LEFT, RIGHT, UP, DOWN, OK,
        INPUT(=PROFILES), SETTINGS, BACK, RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN.
  notes: "Simulates <0.7s button press."

- id: key_hold
  label: Key Hold (long)
  kind: action
  command: "KeyHold {button}"
  params:
    - name: button
      type: string
      description: Same button set as KeyPress.
  notes: "Simulates >1s button hold."

- id: display_alert_window
  label: Display Alert Window
  kind: action
  command: "DisplayAlertWindow {text}"
  params:
    - name: text
      type: string
      description: Alert text shown centered. User must close manually.

- id: close_alert_window
  label: Close Alert Window
  kind: action
  command: "CloseAlertWindow"
  params: []

- id: display_message
  label: Display Message
  kind: action
  command: "DisplayMessage {timeoutSeconds} {text}"
  params:
    - name: timeoutSeconds
      type: integer
      description: Seconds before message disappears.
    - name: text
      type: string
      description: Message body.

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
      description: 'Unit label, e.g. "dB" or "%".'
  notes: "Used to render an AVR-style volume OSD when AVR cannot."

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

- id: set_aspect_ratio_mode
  label: Set Aspect Ratio Mode
  kind: action
  command: "SetAspectRatioMode {mode}"
  params:
    - name: mode
      type: string
      description: |
        Auto, Hold, or one of 4:3, 16:9, 1.85:1, 2.00:1, 2.20:1,
        2.35:1, 2.40:1, 2.55:1, 2.76:1.
  notes: "Affects only temporary AR handling; reset on movie stop."

- id: get_incoming_signal_info
  label: Get Incoming Signal Info
  kind: query
  command: "GetIncomingSignalInfo"
  params: []
  notes: 'Reply example: "IncomingSignalInfo 3840x2160 23.976p 2D 422 10bit HDR10 2020 TV 16:9".'

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  command: "GetAspectRatio"
  params: []
  notes: 'Reply example: "AspectRatio 3840:1600 2.400 240 \"Panavision\"".'

- id: get_masking_ratio
  label: Get Masking Ratio
  kind: query
  command: "GetMaskingRatio"
  params: []
  notes: 'Reply example: "MaskingRatio 3840:1700 2.259 220".'

- id: get_temperatures
  label: Get Temperatures
  kind: query
  command: "GetTemperatures"
  params: []
  notes: |
    Reply format: "Temperatures {gpu} {hdmiInput} \"{cpu}\" \"{mainboard}\" {unknownFuture}".
    Example: Temperatures 74 67 41 45.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "GetMacAddress"
  params: []
  notes: |
    Reply format: "MacAddress 01-02-03-04-05-06".
    Useful for Wake-On-LAN.

- id: create_profile_group
  label: Create Custom Profile Group
  kind: action
  command: "CreateProfileGroup {name}"
  params:
    - name: name
      type: string
      description: Group name; new group has 1 profile.

- id: rename_profile_group
  label: Rename Custom Profile Group
  kind: action
  command: "RenameProfileGroup {customProfileGroupId} {name}"
  params:
    - name: customProfileGroupId
      type: integer
    - name: name
      type: string

- id: delete_profile_group
  label: Delete Custom Profile Group
  kind: action
  command: "DeleteProfileGroup {customProfileGroupId}"
  params:
    - name: customProfileGroupId
      type: integer

- id: enum_profile_groups
  label: Enumerate Profile Groups
  kind: query
  command: "EnumProfileGroups"
  params: []
  notes: |
    One line per group: "ProfileGroup {id} \"{name}\"", terminated by a bare "ProfileGroup." line.

- id: create_profile
  label: Create Profile
  kind: action
  command: "CreateProfile {group} {name}"
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId (numeric).
    - name: name
      type: string
  notes: 'Example: CreateProfile SOURCE "Oppo Blu-Ray Player".'

- id: rename_profile
  label: Rename Profile
  kind: action
  command: "RenameProfile {group} {profileId} {name}"
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId.
    - name: profileId
      type: integer
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
      type: integer
  notes: |
    Deleting the last profile in a custom group also deletes the group.
    Cannot delete the last profile in SOURCE/DISPLAY.

- id: add_profile_to_page
  label: Add Profile to Page
  kind: action
  command: "AddProfileToPage {fullProfileId} {pageId}"
  params:
    - name: fullProfileId
      type: string
      description: e.g. "sourceProfiles_profile2" or "customProfileGroup1_profile1".
    - name: pageId
      type: string
      description: Settings or configuration page ID, e.g. "displayConfig", "hdrSettings".

- id: remove_profile_from_page
  label: Remove Profile from Page
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
      description: SOURCE, DISPLAY, or customProfileGroupId.
    - name: profileId
      type: integer
      description: Use 0 to deactivate.
  notes: "Only one active profile per group."

- id: get_active_profile
  label: Get Active Profile
  kind: query
  command: "GetActiveProfile {group}"
  params:
    - name: group
      type: string
  notes: 'Reply: "ActiveProfile {group} {index}".'

- id: enum_profiles
  label: Enumerate Profiles
  kind: query
  command: "EnumProfiles {group}"
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId.
  notes: |
    Reply: "Profile {fullProfileId} \"{name}\"" lines, terminated by a bare "Profile." line.

- id: enum_setting_pages
  label: Enumerate Setting Pages
  kind: query
  command: "EnumSettingPages"
  params: []
  notes: 'Reply: "SettingPage {id} \"{name}\"" lines, terminated by "SettingPage." line.'

- id: enum_config_pages
  label: Enumerate Configuration Pages
  kind: query
  command: "EnumConfigPages"
  params: []
  notes: 'Reply: "ConfigPage {id} \"{name}\"" lines.'

- id: enum_options
  label: Enumerate Options
  kind: query
  command: "EnumOptions {pageId}"
  params:
    - name: pageId
      type: string
      description: Plain page ID (e.g. "hdrSettings") or detailed path (e.g. "temporary\\hdrSettings").
  notes: |
    Reply: "Option {type} {optionId} {currentValue} {effectiveValue}" lines,
    terminated by a bare "Option." line.

- id: query_option
  label: Query Option
  kind: query
  command: "QueryOption {optionIdOrPath}"
  params:
    - name: optionIdOrPath
      type: string
      description: Bare option ID or detailed path like "customProfileGroup1_profile1\\hdrHighlightRecovery".
  notes: |
    Reply: "Option {type} {optionId} {currentValue} {effectiveValue}".
    First value = value at requested path; second = effective rendering value.

- id: change_option
  label: Change Option
  kind: action
  command: "ChangeOption {optionIdPath} {value}"
  params:
    - name: optionIdPath
      type: string
      description: Bare ID (modifies base settings) or detailed path.
    - name: value
      type: string
      description: 'Quoted string, integer, YES, or NO depending on option type.'
  notes: 'Example: ChangeOption hdrNits 120.'

- id: inherit_option
  label: Inherit Option
  kind: action
  command: "InheritOption {optionIdPath}"
  params:
    - name: optionIdPath
      type: string
      description: Must be a detailed profile/temporary path; bare ID is rejected.

- id: reset_temporary
  label: Reset Temporary Settings
  kind: action
  command: "ResetTemporary"
  params: []

- id: enum_3dlut_files
  label: Enumerate 3DLUT Files
  kind: query
  command: "Enum3DLUTFiles"
  params: []
  notes: 'Reply: "3DLUTFile \"{filename}\"" lines, terminated by bare "3DLUTFile." line.'

- id: rename_3dlut_file
  label: Rename 3DLUT File
  kind: action
  command: "Rename3DLUTFile {oldName} {newName}"
  params:
    - name: oldName
      type: string
    - name: newName
      type: string

- id: delete_3dlut_file
  label: Delete 3DLUT File
  kind: action
  command: "Delete3DLUTFile {fileName}"
  params:
    - name: fileName
      type: string
  notes: "No undelete. File lost permanently."

- id: download_3dlut_file
  label: Download 3DLUT File
  kind: action
  command: "Download3DLUTFile {fileName}"
  params:
    - name: fileName
      type: string
      description: e.g. "BT.2020.3dlut".
  notes: |
    Reply: info line "Download3DLUTFile {base64size} {crcInHex} \"{fileName}\""
    followed by the file contents in base64. Verify CRC32 (init -1).

- id: upload_3dlut_file
  label: Upload 3DLUT File
  kind: action
  command: "Upload3DLUTFile {base64size} {crcInHex} {fileName}"
  params:
    - name: base64size
      type: integer
    - name: crcInHex
      type: string
    - name: fileName
      type: string
  notes: |
    Send the info line first, then the base64 file contents.
    Both lines get individual "OK" replies.

- id: toggle
  label: Toggle Demo Option
  kind: action
  command: "Toggle {option}"
  params:
    - name: option
      type: string
      description: |
        One of ToneMap, HighlightRecovery, ContrastRecovery, ShadowRecovery,
        3DLUT, ScreenBoundaries, Histogram, DebugOSD.
  notes: "Affects temporary settings."

- id: tone_map_on
  label: Tone Map On (temporary)
  kind: action
  command: "ToneMapOn"
  params: []

- id: tone_map_off
  label: Tone Map Off (temporary)
  kind: action
  command: "ToneMapOff"
  params: []

- id: download_settings_file
  label: Download Settings File
  kind: action
  command: "DownloadSettingsFile"
  params: []
  notes: |
    Reply: info line "DownloadSettingsFile {base64size} {crcInHex}"
    followed by the settings file in base64. Verify CRC32 (init -1).

- id: upload_settings_file
  label: Upload Settings File
  kind: action
  command: "UploadSettingsFile {base64size} {crcInHex}"
  params:
    - name: base64size
      type: integer
    - name: crcInHex
      type: string
  notes: "Becomes active immediately after upload."

- id: store_settings
  label: Store Settings
  kind: action
  command: "StoreSettings {slot} {storageName} {password}"
  params:
    - name: slot
      type: string
      description: 'Installer, Suggested, or slotIndex (1..16).'
    - name: storageName
      type: string
    - name: password
      type: string
      description: Required only when overwriting Installer or Suggested.
  notes: "Installer is not user-deletable/renameable. Suggested is user-deletable."

- id: restore_settings
  label: Restore Settings
  kind: action
  command: "RestoreSettings {slot}"
  params:
    - name: slot
      type: string
      description: 'Installer, Suggested, or slotIndex (1..16).'
  notes: "Restored settings become active immediately."

- id: download_edid_file
  label: Download EDID File
  kind: action
  command: "DownloadEDIDFile {slot}"
  params:
    - name: slot
      type: string
      description: 'Current (or empty) for display EDID, or slotIndex.'
  notes: |
    Reply: info line "DownloadEDIDFile {base64size} {crcInHex} \"{storage name}\""
    followed by base64 EDID block.

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
  notes: "Send info line first, then base64 EDID block."

- id: refresh_license_info
  label: Refresh License Info
  kind: action
  command: "RefreshLicenseInfo"
  params: []
  notes: "License info (e.g. user name) is not auto-refreshed from server."

- id: force_1080p60_output
  label: Force 1080p60 Output
  kind: action
  command: "Force1080p60Output"
  params: []
  notes: "Use when display fails to sync to Envy."

- id: hotplug
  label: HDMI Hotplug
  kind: action
  command: "Hotplug"
  params: []
  notes: "Issues HDMI hotplug on Envy's input port. May recover AVR/source sync."

- id: bye
  label: Close Connection
  kind: action
  command: "Bye"
  params: []
  notes: "Envy closes the TCP connection immediately."
```

## Feedbacks
```yaml
- id: welcome
  type: string
  description: |
    First line Envy sends on connect, e.g. "WELCOME to Envy v1.0.1.0".
    No reply required.
- id: ok
  type: enum
  values: [ok]
  description: 'Success reply: "OK".'
- id: error
  type: string
  description: 'Failure reply: "ERROR \"<description>\"".'
- id: incoming_signal_info
  type: string
  description: 'Notification: "IncomingSignalInfo {W}x{H} {refreshRate}p 2D|3D {chroma} {bitDepth} {transfer} {colorspace} {tv|pC} {ar}".'
- id: outgoing_signal_info
  type: string
  description: 'Notification: "OutgoingSignalInfo {W}x{H} {refreshRate}p 2D|3D {chroma} {bitDepth} {transfer} {colorspace} {tv|pC}".'
- id: aspect_ratio
  type: string
  description: 'Notification: "AspectRatio {pixelAR} {floatAR} {nearestWellKnownAR} \"{description}\"".'
- id: masking_ratio
  type: string
  description: 'Notification: "MaskingRatio {pixelAR} {floatAR} {nearestWellKnownAR}".'
- id: set_aspect_ratio_mode
  type: string
  description: 'Notification confirming the temporary AR mode change.'
- id: activate_profile
  type: string
  description: 'Notification: "ActivateProfile {group} {profileId}".'
- id: create_profile_group
  type: string
  description: 'Notification: "CreateProfileGroup {customProfileGroupId} \"{name}\"".'
- id: create_profile
  type: string
  description: 'Notification: "CreateProfile {group} {profileId} \"{name}\"".'
- id: change_option
  type: string
  description: 'Notification: "ChangeOption {type} {path} {current} {effective}".'
- id: inherit_option
  type: string
  description: 'Notification: "InheritOption {type} {path} {effective}".'
- id: no_signal
  type: enum
  values: [no_signal]
  description: 'Notification: "NoSignal".'
- id: display_changed
  type: enum
  values: [display_changed]
  description: 'Notification: a different display was just connected.'
- id: missing_heartbeat
  type: enum
  values: [missing_heartbeat]
  description: 'Notification: connection is about to close after 60s silence.'
- id: firmware_update
  type: enum
  values: [firmware_update]
  description: 'Notification: firmware is about to install.'
```

## Variables
```yaml
# Settable parameters (exposed via ChangeOption). Full catalogue not enumerated in source.
# Use EnumOptions / QueryOption to discover IDs, types, and value ranges.
- id: hdr_nits
  type: integer
  description: 'Example variable from source. ChangeOption hdrNits 120. Full option list not documented; discover via EnumOptions.'
- id: hdr_highlight_recovery
  type: integer
  description: 'Example from source. ChangeOption hdrHighlightRecovery 2..5 ("Off"=0, "Insane"=5). Discover via EnumOptions.'
```

## Events
```yaml
# All unsolicited notifications Envy pushes while a client connection is open.
# Source: section 4 (overview) and section 6 (notification reference).
- id: power_off
  message: "PowerOff"
- id: standby
  message: "Standby"
- id: restart
  message: "Restart"
- id: reload_software
  message: "ReloadSoftware"
- id: open_menu
  message: "OpenMenu {menu}"
- id: close_menu
  message: "CloseMenu"
- id: key_press
  message: "KeyPress {button}"
- id: key_hold
  message: "KeyHold {button}"
- id: aspect_ratio
  message: "AspectRatio {pixelAR} {floatAR} {nearestWellKnownAR} \"{description}\""
- id: masking_ratio
  message: "MaskingRatio {pixelAR} {floatAR} {nearestWellKnownAR}"
- id: set_aspect_ratio_mode
  message: "SetAspectRatioMode {mode}"
- id: create_profile_group
  message: "CreateProfileGroup {customProfileGroupId} \"{name}\""
- id: rename_profile_group
  message: "RenameProfileGroup {customProfileGroupId} \"{name}\""
- id: delete_profile_group
  message: "DeleteProfileGroup {customProfileGroupId}"
- id: create_profile
  message: "CreateProfile {group} {profileId} \"{name}\""
- id: rename_profile
  message: "RenameProfile {group} {profileId} \"{name}\""
- id: delete_profile
  message: "DeleteProfile {group} {profileId}"
- id: add_profile_to_page
  message: "AddProfileToPage {profileId} {pageId}"
- id: remove_profile_from_page
  message: "RemoveProfileFromPage {profileId} {pageId}"
- id: activate_profile
  message: "ActivateProfile {group} {profileId}"
- id: change_option
  message: "ChangeOption {type} {path} {current} {effective}"
- id: inherit_option
  message: "InheritOption {type} {path} {effective}"
- id: reset_temporary
  message: "ResetTemporary"
- id: upload_3dlut_file
  message: "Upload3DLUTFile \"{fileName}\""
- id: rename_3dlut_file
  message: "Rename3DLUTFile \"{oldName}\" \"{newName}\""
- id: delete_3dlut_file
  message: "Delete3DLUTFile \"{fileName}\""
- id: toggle
  message: "Toggle {option}"
- id: tone_map_on
  message: "ToneMapOn"
- id: tone_map_off
  message: "ToneMapOff"
- id: upload_settings_file
  message: "UploadSettingsFile"
- id: store_settings
  message: "StoreSettings {slot} \"{name}\""
- id: restore_settings
  message: "RestoreSettings {slot}"
- id: no_signal
  message: "NoSignal"
- id: incoming_signal_info
  message: "IncomingSignalInfo {W}x{H} {refreshRate}p 2D|3D {chroma} {bitDepth} {transfer} {colorspace} {tv|pc} {ar}"
- id: outgoing_signal_info
  message: "OutgoingSignalInfo {W}x{H} {refreshRate}p 2D|3D {chroma} {bitDepth} {transfer} {colorspace} {tv|pc}"
- id: display_changed
  message: "DisplayChanged"
- id: refresh_license_info
  message: "RefreshLicenseInfo"
- id: force_1080p60_output
  message: "Force1080p60Output"
- id: hotplug
  message: "Hotplug"
- id: firmware_update
  message: "FirmwareUpdate"
- id: missing_heartbeat
  message: "MissingHeartbeat"
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: source does not document multi-step command macros.
```

## Safety
```yaml
confirmation_required_for:
  - delete_3dlut_file  # Source: "A 3DLUT file deleted is lost forever. No undelete."
  - power_off          # Source: Envy no longer reacts to remote; requires physical button or WoL to recover.
  - store_settings     # Source: overwriting Installer/Suggested requires service password.
interlocks: []
# UNRESOLVED: source does not describe interlock procedures or power-on sequencing requirements beyond the PowerOff / Standby notes above.
```

## Notes
- All commands are case-sensitive ASCII text terminated by `⏎` (0x0D, 0x0A, or 0x0D 0x0A). Reply framing matches the request framing.
- Up to 16 concurrent TCP connections to port 44077. Connection is closed by Envy after 60 seconds of silence; clients must send `Heartbeat` every ~20 seconds to stay connected.
- The user-supplied "Known protocol: REST" contradicts the source: this revision documents raw TCP ASCII control, not HTTP/REST. A separate REST/HTTP API (if any) would require a different source.
- Replies and notifications may arrive out of order (source: section 4).
- `INHERIT` is the default state for every option in every profile. Profiles are transparent until an option is explicitly overwritten (source: section 8.3).
- Full option catalogue (settings + configuration pages, IDs, types, value ranges) is not enumerated in source. Use `EnumSettingPages` / `EnumConfigPages` / `EnumOptions` to discover.

<!-- UNRESOLVED: firmware version compatibility, full option/value catalogue, EDID block format, 3DLUT file format, exact set of supported color spaces/transfer characteristics (only examples listed in source). -->

## Provenance

```yaml
source_domains:
  - madvrenvy.com
source_urls:
  - https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
retrieved_at: 2026-04-26T17:04:37.161Z
last_checked_at: 2026-06-02T17:23:21.084Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:21.084Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions matched literally in source; port 44077 TCP verified; no transport issues; command catalogue fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EDID file format, full option catalogue, and option value ranges are not enumerated in source. REST/API control is not described in this document (user note of \"REST\" is overridden by source evidence showing raw TCP ASCII)."
- "source does not document multi-step command macros."
- "source does not describe interlock procedures or power-on sequencing requirements beyond the PowerOff / Standby notes above."
- "firmware version compatibility, full option/value catalogue, EDID block format, 3DLUT file format, exact set of supported color spaces/transfer characteristics (only examples listed in source)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
