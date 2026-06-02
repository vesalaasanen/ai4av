---
spec_id: admin/madvr-envy
schema_version: ai4av-public-spec-v1
revision: 1
title: "madVR Envy Control Spec"
manufacturer: madVR
model_family: Envy
aliases: []
compatible_with:
  manufacturers:
    - madVR
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
retrieved_at: 2026-04-29T17:04:40.031Z
last_checked_at: 2026-06-02T21:41:48.084Z
generated_at: 2026-06-02T21:41:48.084Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "heartbeat timing and 16-connection limit come from source, but no explicit statement of firmware version applicability or which Envy hardware revisions support IP control."
  - "source describes individual commands but no named multi-step sequences"
  - "source does not document any safety warnings, interlocks, or power-on"
  - "firmware version compatibility range not stated in source."
  - "precise list of supported page IDs, option IDs, and option value ranges — source directs clients to enumerate via EnumSettingPages/EnumConfigPages/EnumOptions."
  - "full list of \"well known\" aspect ratio indices (source lists 119,133,137,143,166,175,178,185,190,200,210,220,235,239,240,255,266,276) and what each maps to."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:48.084Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions found verbatim in source; TCP port 44077 and no-auth transport confirmed; spec comprehensively covers source's command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# madVR Envy Control Spec

## Summary
The madVR Envy is a video processor controlled via a custom ASCII text TCP protocol on port 44077 (up to 16 concurrent connections). Clients send newline-terminated commands and receive `OK`, `ERROR`, or unsolicited notifications in reply. A 20-second heartbeat keeps the connection alive; 1 minute of silence causes Envy to close the socket.

<!-- UNRESOLVED: heartbeat timing and 16-connection limit come from source, but no explicit statement of firmware version applicability or which Envy hardware revisions support IP control. -->

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
# - powerable       (PowerOff, Standby, Restart, ReloadSoftware)
# - queryable       (GetIncomingSignalInfo, GetAspectRatio, GetMaskingRatio, GetTemperatures, GetMacAddress, GetActiveProfile, QueryOption, EnumOptions, EnumSettingPages, EnumConfigPages, EnumProfiles, EnumProfileGroups, Enum3DLUTFiles)
# - routable        (no: Envy is a single-input video processor - no source routing commands)
# - levelable       (no: DisplayAudioVolume only renders a GUI; it does not control Envy's audio level)
- powerable  # inferred from power command examples
- queryable  # inferred from query command examples
```

## Actions
```yaml
# ---- 5.1 Power Commands ----
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

# ---- 5.2 Menu / GUI Commands ----
- id: open_menu
  label: Open Menu
  kind: action
  command: "OpenMenu {menu}|{pageId}"
  params:
    - name: menu
      type: string
      description: Menu name or pageId (Info, Settings, Configuration, Profiles, TestPatterns, or a pageId)

- id: close_menu
  label: Close Menu
  kind: action
  command: "CloseMenu"
  params: []

- id: key_press
  label: Key Press
  kind: action
  command: "KeyPress {buttonName}"
  params:
    - name: buttonName
      type: string
      description: Button name (POWER, INFO, MENU, LEFT, RIGHT, UP, DOWN, OK, INPUT, SETTINGS, BACK, RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN)

- id: key_hold
  label: Key Hold
  kind: action
  command: "KeyHold {buttonName}"
  params:
    - name: buttonName
      type: string
      description: Button name (POWER, INFO, MENU, LEFT, RIGHT, UP, DOWN, OK, INPUT, SETTINGS, BACK, RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN)

- id: display_alert_window
  label: Display Alert Window
  kind: action
  command: 'DisplayAlertWindow "{text}"'
  params:
    - name: text
      type: string
      description: Alert window text (user must close manually)

- id: close_alert_window
  label: Close Alert Window
  kind: action
  command: "CloseAlertWindow"
  params: []

- id: display_message
  label: Display Message
  kind: action
  command: 'DisplayMessage {timeoutSeconds} "{text}"'
  params:
    - name: timeoutSeconds
      type: integer
      description: Seconds to display the message
    - name: text
      type: string
      description: Message text

- id: display_audio_volume
  label: Display Audio Volume
  kind: action
  command: 'DisplayAudioVolume {minValue} {currentValue} {maxValue} "{unitDescription}"'
  params:
    - name: minValue
      type: integer
      description: Minimum value
    - name: currentValue
      type: integer
      description: Current value
    - name: maxValue
      type: integer
      description: Maximum value
    - name: unitDescription
      type: string
      description: Unit text (e.g. "dB", "%")

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

# ---- 5.3 Temporary Aspect Ratio Overrides ----
- id: set_aspect_ratio_mode
  label: Set Aspect Ratio Mode
  kind: action
  command: "SetAspectRatioMode {mode}"
  params:
    - name: mode
      type: string
      description: Auto, Hold, or a custom aspect ratio (4:3, 16:9, 1.85:1, 2.00:1, 2.20:1, 2.35:1, 2.40:1, 2.55:1, 2.76:1)

# ---- 5.4 Information Requests ----
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

- id: heartbeat
  label: Heartbeat
  kind: action
  command: "Heartbeat"
  params: []

# ---- 5.5 Custom Profile Groups ----
- id: create_profile_group
  label: Create Profile Group
  kind: action
  command: 'CreateProfileGroup "{name}"'
  params:
    - name: name
      type: string
      description: New custom profile group name

- id: rename_profile_group
  label: Rename Profile Group
  kind: action
  command: 'RenameProfileGroup {customProfileGroupId} "{name}"'
  params:
    - name: customProfileGroupId
      type: integer
      description: Custom profile group ID
    - name: name
      type: string
      description: New name

- id: delete_profile_group
  label: Delete Profile Group
  kind: action
  command: "DeleteProfileGroup {customProfileGroupId}"
  params:
    - name: customProfileGroupId
      type: integer
      description: Custom profile group ID

- id: enum_profile_groups
  label: Enumerate Profile Groups
  kind: query
  command: "EnumProfileGroups"
  params: []

# ---- 5.6 Source, Display and Custom Profiles ----
- id: create_profile
  label: Create Profile
  kind: action
  command: 'CreateProfile {group} "{name}"'
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId
    - name: name
      type: string
      description: New profile name

- id: rename_profile
  label: Rename Profile
  kind: action
  command: 'RenameProfile {group} {profileId} "{name}"'
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId
    - name: profileId
      type: integer
      description: Profile ID
    - name: name
      type: string
      description: New profile name

- id: delete_profile
  label: Delete Profile
  kind: action
  command: "DeleteProfile {group} {profileId}"
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId
    - name: profileId
      type: integer
      description: Profile ID

- id: add_profile_to_page
  label: Add Profile To Page
  kind: action
  command: "AddProfileToPage {fullProfileId} {pageId}"
  params:
    - name: fullProfileId
      type: string
      description: Full profile ID (e.g. sourceProfiles_profile2)
    - name: pageId
      type: string
      description: Page ID

- id: remove_profile_from_page
  label: Remove Profile From Page
  kind: action
  command: "RemoveProfileFromPage {fullProfileId} {pageId}"
  params:
    - name: fullProfileId
      type: string
      description: Full profile ID
    - name: pageId
      type: string
      description: Page ID

- id: activate_profile
  label: Activate Profile
  kind: action
  command: "ActivateProfile {group} {profileId}"
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId
    - name: profileId
      type: integer
      description: Profile ID (use 0 to deactivate)

- id: get_active_profile
  label: Get Active Profile
  kind: query
  command: "GetActiveProfile {group}"
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId

- id: enum_profiles
  label: Enumerate Profiles
  kind: query
  command: "EnumProfiles {group}"
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroupId

# ---- 5.7 Accessing Options ----
- id: enum_setting_pages
  label: Enumerate Setting Pages
  kind: query
  command: "EnumSettingPages"
  params: []

- id: enum_config_pages
  label: Enumerate Config Pages
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
      description: Settings page ID, config page ID, or detailed page path

- id: query_option
  label: Query Option
  kind: query
  command: "QueryOption {optionId}"
  params:
    - name: optionId
      type: string
      description: Option ID or full path (e.g. customProfileGroup1_profile1\hdrHighlightRecovery)

- id: change_option
  label: Change Option
  kind: action
  command: "ChangeOption {optionIdPath} {value}"
  params:
    - name: optionIdPath
      type: string
      description: Option ID or path (e.g. temporary\hdrNits)
    - name: value
      type: string
      description: New value (quoted string, integer, YES, or NO)

- id: inherit_option
  label: Inherit Option
  kind: action
  command: "InheritOption {optionIdPath}"
  params:
    - name: optionIdPath
      type: string
      description: Detailed profile/option path

- id: reset_temporary
  label: Reset Temporary
  kind: action
  command: "ResetTemporary"
  params: []

# ---- 5.8 Managing 3DLUT Files ----
- id: enum_3dlut_files
  label: Enumerate 3DLUT Files
  kind: query
  command: "Enum3DLUTFiles"
  params: []

- id: rename_3dlut_file
  label: Rename 3DLUT File
  kind: action
  command: 'Rename3DLUTFile {oldFileName.3dlut} {newFileName.3dlut}'
  params:
    - name: oldFileName.3dlut
      type: string
      description: Existing 3DLUT file name
    - name: newFileName.3dlut
      type: string
      description: New 3DLUT file name

- id: delete_3dlut_file
  label: Delete 3DLUT File
  kind: action
  command: 'Delete3DLUTFile {fileName.3dlut}'
  params:
    - name: fileName.3dlut
      type: string
      description: 3DLUT file name

- id: download_3dlut_file
  label: Download 3DLUT File
  kind: query
  command: 'Download3DLUTFile {fileName.3dlut}'
  params:
    - name: fileName.3dlut
      type: string
      description: 3DLUT file name

- id: upload_3dlut_file
  label: Upload 3DLUT File
  kind: action
  command: 'Upload3DLUTFile {base64size} {crcInHex} {fileName.3dlut}'
  params:
    - name: base64size
      type: integer
      description: Number of bytes in the base64 stream
    - name: crcInHex
      type: string
      description: CRC32 of the file in hex
    - name: fileName.3dlut
      type: string
      description: 3DLUT file name

# ---- 5.9 Demo Commands ----
- id: toggle
  label: Toggle Option
  kind: action
  command: "Toggle {option}"
  params:
    - name: option
      type: string
      description: Option to toggle (ToneMap, HighlightRecovery, ContrastRecovery, ShadowRecovery, 3DLUT, ScreenBoundaries, Histogram, DebugOSD)

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

# ---- 5.10 Settings Management ----
- id: download_settings_file
  label: Download Settings File
  kind: query
  command: "DownloadSettingsFile"
  params: []

- id: upload_settings_file
  label: Upload Settings File
  kind: action
  command: "UploadSettingsFile {base64size} {crcInHex}"
  params:
    - name: base64size
      type: integer
      description: Number of bytes in the base64 stream
    - name: crcInHex
      type: string
      description: CRC32 of the file in hex

- id: store_settings
  label: Store Settings
  kind: action
  command: 'StoreSettings {target} "{storageName}" ["{password}"]'
  params:
    - name: target
      type: string
      description: Installer, Suggested, or slotIndex (1-16)
    - name: storageName
      type: string
      description: Storage name
    - name: password
      type: string
      description: Optional service password (required to overwrite Installer or Suggested)

- id: restore_settings
  label: Restore Settings
  kind: action
  command: "RestoreSettings {target}"
  params:
    - name: target
      type: string
      description: Installer, Suggested, or slotIndex (1-16)

# ---- 5.11 EDID Management ----
- id: download_edid_file
  label: Download EDID File
  kind: query
  command: "DownloadEDIDFile {target}"
  params:
    - name: target
      type: string
      description: Current or slotIndex

- id: upload_edid_file
  label: Upload EDID File
  kind: action
  command: 'UploadEDIDFile {slotIndex} {base64size} {crcInHex} "{storageName}"'
  params:
    - name: slotIndex
      type: integer
      description: EDID storage slot index
    - name: base64size
      type: integer
      description: Number of bytes in the base64 stream
    - name: crcInHex
      type: string
      description: CRC32 of the EDID in hex
    - name: storageName
      type: string
      description: Storage name

# ---- 5.12 Other Commands ----
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
```

## Feedbacks
```yaml
- id: power_off_notification
  type: enum
  values: [powering_off]
  description: "PowerOff notification"
- id: standby_notification
  type: enum
  values: [entering_standby]
  description: "Standby notification"
- id: restart_notification
  type: enum
  values: [restarting]
  description: "Restart notification"
- id: reload_software_notification
  type: enum
  values: [reloading_software]
  description: "ReloadSoftware notification"
- id: open_menu_notification
  type: string
  description: "OpenMenu {menu} notification"
- id: close_menu_notification
  type: enum
  values: [closed]
  description: "CloseMenu notification"
- id: key_press_notification
  type: string
  description: "KeyPress {buttonName} notification"
- id: key_hold_notification
  type: string
  description: "KeyHold {buttonName} notification"
- id: aspect_ratio
  type: string
  description: "AspectRatio {pixelAR} {floatAR} {nearestWellKnownAR} \"{description}\""
- id: masking_ratio
  type: string
  description: "MaskingRatio {pixelAR} {floatAR} {nearestWellKnownAR}"
- id: set_aspect_ratio_mode_notification
  type: string
  description: "SetAspectRatioMode {mode} notification"
- id: create_profile_group_notification
  type: string
  description: "CreateProfileGroup {id} \"{name}\" notification"
- id: rename_profile_group_notification
  type: string
  description: "RenameProfileGroup {id} \"{name}\" notification"
- id: delete_profile_group_notification
  type: string
  description: "DeleteProfileGroup {id} notification"
- id: create_profile_notification
  type: string
  description: "CreateProfile {group} {profileId} \"{name}\" notification"
- id: rename_profile_notification
  type: string
  description: "RenameProfile {group} {profileId} \"{name}\" notification"
- id: delete_profile_notification
  type: string
  description: "DeleteProfile {group} {profileId} notification"
- id: add_profile_to_page_notification
  type: string
  description: "AddProfileToPage {profileId} {pageId} notification"
- id: remove_profile_from_page_notification
  type: string
  description: "RemoveProfileFromPage {profileId} {pageId} notification"
- id: activate_profile_notification
  type: string
  description: "ActivateProfile {group} {profileId} notification"
- id: change_option_notification
  type: string
  description: "ChangeOption {optionType} {optionIdPath} {currentValue} {effectiveValue}"
- id: inherit_option_notification
  type: string
  description: "InheritOption {optionType} {optionIdPath} {effectiveValue}"
- id: reset_temporary_notification
  type: enum
  values: [reset]
  description: "ResetTemporary notification"
- id: upload_3dlut_file_notification
  type: string
  description: "Upload3DLUTFile \"{fileName}\" notification"
- id: rename_3dlut_file_notification
  type: string
  description: "Rename3DLUTFile {old} {new} notification"
- id: delete_3dlut_file_notification
  type: string
  description: "Delete3DLUTFile \"{fileName}\" notification"
- id: toggle_notification
  type: string
  description: "Toggle {option} notification"
- id: tone_map_state_notification
  type: enum
  values: [on, off]
  description: "ToneMapOn or ToneMapOff notification"
- id: upload_settings_file_notification
  type: enum
  values: [uploaded]
  description: "UploadSettingsFile notification"
- id: store_settings_notification
  type: string
  description: "StoreSettings {target} \"{storageName}\" notification"
- id: restore_settings_notification
  type: string
  description: "RestoreSettings {target} notification"
- id: no_signal_notification
  type: enum
  values: [no_signal]
  description: "NoSignal notification"
- id: incoming_signal_info
  type: string
  description: "IncomingSignalInfo {resolution} {rate}p {dim} {chroma} {bitDepth} {transfer} {colorspace} {ratio}"
- id: outgoing_signal_info
  type: string
  description: "OutgoingSignalInfo {resolution} {rate}p {dim} {chroma} {bitDepth} {transfer} {colorspace}"
- id: display_changed_notification
  type: enum
  values: [changed]
  description: "DisplayChanged notification"
- id: refresh_license_info_notification
  type: enum
  values: [refreshed]
  description: "RefreshLicenseInfo notification"
- id: force_1080p60_output_notification
  type: enum
  values: [activated]
  description: "Force1080p60Output notification"
- id: hotplug_notification
  type: enum
  values: [issued]
  description: "Hotplug notification"
- id: firmware_update_notification
  type: enum
  values: [installing]
  description: "FirmwareUpdate notification"
- id: missing_heartbeat_notification
  type: enum
  values: [closing]
  description: "MissingHeartbeat notification"
```

## Variables
```yaml
- name: aspect_ratio_mode
  type: string
  description: Current temporary aspect ratio mode (Auto, Hold, or a custom AR)
- name: active_profile_source
  type: integer
  description: Active profile index for SOURCE profile group (0 = none)
- name: active_profile_display
  type: integer
  description: Active profile index for DISPLAY profile group (0 = none)
- name: mac_address
  type: string
  description: Envy MAC address (xx-xx-xx-xx-xx-xx)
- name: temperatures
  type: string
  description: Current temperatures (GPU, HDMI input, CPU, mainboard) in Celsius
```

## Events
```yaml
- id: welcome
  description: "Sent on connect, e.g. WELCOME to Envy v1.0.1.0"
- id: ok_reply
  description: "OK reply to a successful command"
- id: error_reply
  description: 'ERROR "description" reply to a failed command'
- id: heartbeat_ok
  description: "OK reply to a Heartbeat command"
- id: power_off_event
  description: "PowerOff"
- id: standby_event
  description: "Standby"
- id: restart_event
  description: "Restart"
- id: reload_software_event
  description: "ReloadSoftware"
- id: open_menu_event
  description: 'OpenMenu {menu}'
- id: close_menu_event
  description: "CloseMenu"
- id: key_press_event
  description: "KeyPress {buttonName}"
- id: key_hold_event
  description: "KeyHold {buttonName}"
- id: aspect_ratio_event
  description: 'AspectRatio {pixelAR} {floatAR} {nearestWellKnownAR} "{description}"'
- id: masking_ratio_event
  description: "MaskingRatio {pixelAR} {floatAR} {nearestWellKnownAR}"
- id: set_aspect_ratio_mode_event
  description: "SetAspectRatioMode {mode}"
- id: create_profile_group_event
  description: 'CreateProfileGroup {id} "{name}"'
- id: rename_profile_group_event
  description: 'RenameProfileGroup {id} "{name}"'
- id: delete_profile_group_event
  description: "DeleteProfileGroup {id}"
- id: create_profile_event
  description: 'CreateProfile {group} {profileId} "{name}"'
- id: rename_profile_event
  description: 'RenameProfile {group} {profileId} "{name}"'
- id: delete_profile_event
  description: "DeleteProfile {group} {profileId}"
- id: add_profile_to_page_event
  description: "AddProfileToPage {profileId} {pageId}"
- id: remove_profile_from_page_event
  description: "RemoveProfileFromPage {profileId} {pageId}"
- id: activate_profile_event
  description: "ActivateProfile {group} {profileId}"
- id: change_option_event
  description: "ChangeOption {optionType} {optionIdPath} {currentValue} {effectiveValue}"
- id: inherit_option_event
  description: "InheritOption {optionType} {optionIdPath} {effectiveValue}"
- id: reset_temporary_event
  description: "ResetTemporary"
- id: upload_3dlut_file_event
  description: 'Upload3DLUTFile "{fileName}"'
- id: rename_3dlut_file_event
  description: "Rename3DLUTFile {old} {new}"
- id: delete_3dlut_file_event
  description: 'Delete3DLUTFile "{fileName}"'
- id: toggle_event
  description: "Toggle {option}"
- id: tone_map_on_event
  description: "ToneMapOn"
- id: tone_map_off_event
  description: "ToneMapOff"
- id: upload_settings_file_event
  description: "UploadSettingsFile"
- id: store_settings_event
  description: 'StoreSettings {target} "{storageName}"'
- id: restore_settings_event
  description: "RestoreSettings {target}"
- id: no_signal_event
  description: "NoSignal"
- id: incoming_signal_info_event
  description: "IncomingSignalInfo {resolution} {rate}p {dim} {chroma} {bitDepth} {transfer} {colorspace} {ratio}"
- id: outgoing_signal_info_event
  description: "OutgoingSignalInfo {resolution} {rate}p {dim} {chroma} {bitDepth} {transfer} {colorspace}"
- id: display_changed_event
  description: "DisplayChanged"
- id: refresh_license_info_event
  description: "RefreshLicenseInfo"
- id: force_1080p60_output_event
  description: "Force1080p60Output"
- id: hotplug_event
  description: "Hotplug"
- id: firmware_update_event
  description: "FirmwareUpdate"
- id: missing_heartbeat_event
  description: "MissingHeartbeat (sent ~60s after last client message; connection will close)"
```

## Macros
```yaml
# UNRESOLVED: source describes individual commands but no named multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document any safety warnings, interlocks, or power-on
# sequencing requirements. The only "caution" is the undelete note on 3DLUT files.
```

## Notes
- Welcome banner and protocol version are sent on connect (e.g. `WELCOME to Envy v1.0.1.0`); clients need not reply to it.
- Heartbeat: send `Heartbeat` every 20 seconds; Envy replies `OK` and will close the connection if no message is received within 60 seconds.
- Up to 16 concurrent TCP connections are supported.
- Commands are case-sensitive ASCII (UTF-8) terminated by 0x0D, 0x0A, or 0x0D 0x0A. Parameters with spaces must be quoted.
- Replies are `OK` or `ERROR "description"`. Successful state-changing commands also produce a notification to all connected clients.
- Replies and notifications are not strictly ordered.
- `Bye` cleanly closes the TCP connection from the server side.
- After `PowerOff`, Envy can only be woken by the front-panel power button or a Wake-On-LAN packet.
- `Delete3DLUTFile` is irreversible — there is no undelete.
- `StoreSettings Installer` / `StoreSettings Suggested` require a service password to overwrite.
- User-supplied metadata indicated protocol "REST" and manufacturer "Helper", but the source documents a custom ASCII TCP protocol on port 44077 from madVR. The spec follows the source.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: precise list of supported page IDs, option IDs, and option value ranges — source directs clients to enumerate via EnumSettingPages/EnumConfigPages/EnumOptions. -->
<!-- UNRESOLVED: full list of "well known" aspect ratio indices (source lists 119,133,137,143,166,175,178,185,190,200,210,220,235,239,240,255,266,276) and what each maps to. -->

## Provenance

```yaml
source_domains:
  - madvrenvy.com
source_urls:
  - https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
retrieved_at: 2026-04-29T17:04:40.031Z
last_checked_at: 2026-06-02T21:41:48.084Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:48.084Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions found verbatim in source; TCP port 44077 and no-auth transport confirmed; spec comprehensively covers source's command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "heartbeat timing and 16-connection limit come from source, but no explicit statement of firmware version applicability or which Envy hardware revisions support IP control."
- "source describes individual commands but no named multi-step sequences"
- "source does not document any safety warnings, interlocks, or power-on"
- "firmware version compatibility range not stated in source."
- "precise list of supported page IDs, option IDs, and option value ranges — source directs clients to enumerate via EnumSettingPages/EnumConfigPages/EnumOptions."
- "full list of \"well known\" aspect ratio indices (source lists 119,133,137,143,166,175,178,185,190,200,210,220,235,239,240,255,266,276) and what each maps to."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
