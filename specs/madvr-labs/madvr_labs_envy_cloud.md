---
spec_id: admin/madvr_labs-envy
schema_version: ai4av-public-spec-v1
revision: 1
title: "MADVR LABS Envy Control Spec"
manufacturer: "MADVR LABS"
model_family: Envy
aliases: []
compatible_with:
  manufacturers:
    - "MADVR LABS"
  models:
    - Envy
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - madvrenvy.com
retrieved_at: 2026-05-04T18:04:28.149Z
last_checked_at: 2026-04-25T21:07:32.193Z
generated_at: 2026-04-25T21:07:32.193Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:07:32.193Z
  matched_actions: 57
  action_count: 57
  confidence: high
  summary: "All 57 spec actions found verbatim in source; transport parameters match; no extra commands; full bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# MADVR LABS Envy Control Spec

## Summary
The madVR Envy is a video calibration and processing device that supports TCP/IP control on port 44077. The device accepts ASCII text commands and sends unsolicited notifications for events such as signal changes, profile switches, and aspect ratio changes. Up to 16 concurrent TCP connections are supported.

<!-- UNRESOLVED: EDID upload/download binary format not detailed in source -->

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
- powerable
- queryable
- routable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  params: []

- id: standby
  label: Standby
  kind: action
  params: []

- id: restart
  label: Restart
  kind: action
  params: []

- id: reload_software
  label: Reload Software
  kind: action
  params: []

- id: open_menu
  label: Open Menu
  kind: action
  params:
    - name: menu_id
      type: string
      description: One of Info, Settings, Configuration, Profiles, TestPatterns

- id: close_menu
  label: Close Menu
  kind: action
  params: []

- id: key_press
  label: Key Press
  kind: action
  params:
    - name: button
      type: string
      description: POWER, INFO, MENU, LEFT, RIGHT, UP, DOWN, OK, INPUT, SETTINGS, BACK, RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN

- id: key_hold
  label: Key Hold
  kind: action
  params:
    - name: button
      type: string
      description: Same button names as key_press

- id: display_alert_window
  label: Display Alert Window
  kind: action
  params:
    - name: text
      type: string

- id: close_alert_window
  label: Close Alert Window
  kind: action
  params: []

- id: display_message
  label: Display Message
  kind: action
  params:
    - name: timeout_seconds
      type: integer
    - name: text
      type: string

- id: display_audio_volume
  label: Display Audio Volume
  kind: action
  params:
    - name: min
      type: integer
    - name: current
      type: integer
    - name: max
      type: integer
    - name: unit
      type: string

- id: display_audio_mute
  label: Display Audio Mute
  kind: action
  params: []

- id: close_audio_mute
  label: Close Audio Mute
  kind: action
  params: []

- id: set_aspect_ratio_mode
  label: Set Aspect Ratio Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Auto, Hold, or custom ratio (4:3, 16:9, 1.85:1, 2.00:1, 2.20:1, 2.35:1, 2.40:1, 2.55:1, 2.76:1)

- id: get_incoming_signal_info
  label: Get Incoming Signal Info
  kind: action
  params: []

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: action
  params: []

- id: get_masking_ratio
  label: Get Masking Ratio
  kind: action
  params: []

- id: get_temperatures
  label: Get Temperatures
  kind: action
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: action
  params: []

- id: create_profile_group
  label: Create Profile Group
  kind: action
  params:
    - name: name
      type: string

- id: rename_profile_group
  label: Rename Profile Group
  kind: action
  params:
    - name: group_id
      type: integer
    - name: name
      type: string

- id: delete_profile_group
  label: Delete Profile Group
  kind: action
  params:
    - name: group_id
      type: integer

- id: enum_profile_groups
  label: Enumerate Profile Groups
  kind: action
  params: []

- id: create_profile
  label: Create Profile
  kind: action
  params:
    - name: group
      type: string
      description: SOURCE, DISPLAY, or customProfileGroup ID
    - name: name
      type: string

- id: rename_profile
  label: Rename Profile
  kind: action
  params:
    - name: group
      type: string
    - name: profile_id
      type: integer
    - name: name
      type: string

- id: delete_profile
  label: Delete Profile
  kind: action
  params:
    - name: group
      type: string
    - name: profile_id
      type: integer

- id: add_profile_to_page
  label: Add Profile to Page
  kind: action
  params:
    - name: full_profile_id
      type: string
    - name: page_id
      type: string

- id: remove_profile_from_page
  label: Remove Profile from Page
  kind: action
  params:
    - name: full_profile_id
      type: string
    - name: page_id
      type: string

- id: activate_profile
  label: Activate Profile
  kind: action
  params:
    - name: group
      type: string
    - name: profile_id
      type: integer

- id: get_active_profile
  label: Get Active Profile
  kind: action
  params:
    - name: group
      type: string

- id: enum_profiles
  label: Enumerate Profiles
  kind: action
  params:
    - name: group
      type: string

- id: enum_setting_pages
  label: Enumerate Setting Pages
  kind: action
  params: []

- id: enum_config_pages
  label: Enumerate Config Pages
  kind: action
  params: []

- id: enum_options
  label: Enumerate Options
  kind: action
  params:
    - name: page_id
      type: string

- id: query_option
  label: Query Option
  kind: action
  params:
    - name: option_path
      type: string

- id: change_option
  label: Change Option
  kind: action
  params:
    - name: option_path
      type: string
    - name: value
      type: string

- id: inherit_option
  label: Inherit Option
  kind: action
  params:
    - name: option_path
      type: string

- id: reset_temporary
  label: Reset Temporary Settings
  kind: action
  params: []

- id: enum_3dlut_files
  label: Enumerate 3DLUT Files
  kind: action
  params: []

- id: rename_3dlut_file
  label: Rename 3DLUT File
  kind: action
  params:
    - name: old_name
      type: string
    - name: new_name
      type: string

- id: delete_3dlut_file
  label: Delete 3DLUT File
  kind: action
  params:
    - name: file_name
      type: string

- id: download_3dlut_file
  label: Download 3DLUT File
  kind: action
  params:
    - name: file_name
      type: string

- id: upload_3dlut_file
  label: Upload 3DLUT File
  kind: action
  params:
    - name: base64_size
      type: integer
    - name: crc_hex
      type: string
    - name: file_name
      type: string

- id: toggle
  label: Toggle Demo Option
  kind: action
  params:
    - name: option
      type: string
      description: ToneMap, HighlightRecovery, ContrastRecovery, ShadowRecovery, 3DLUT, ScreenBoundaries, Histogram, DebugOSD

- id: tone_map_on
  label: Tone Map On
  kind: action
  params: []

- id: tone_map_off
  label: Tone Map Off
  kind: action
  params: []

- id: download_settings_file
  label: Download Settings File
  kind: action
  params: []

- id: upload_settings_file
  label: Upload Settings File
  kind: action
  params:
    - name: base64_size
      type: integer
    - name: crc_hex
      type: string

- id: store_settings
  label: Store Settings
  kind: action
  params:
    - name: slot
      type: string
      description: Installer, Suggested, or slot index
    - name: name
      type: string
    - name: password
      type: string

- id: restore_settings
  label: Restore Settings
  kind: action
  params:
    - name: slot
      type: string

- id: download_edid_file
  label: Download EDID File
  kind: action
  params:
    - name: slot
      type: string

- id: upload_edid_file
  label: Upload EDID File
  kind: action
  params:
    - name: slot_index
      type: integer
    - name: base64_size
      type: integer
    - name: crc_hex
      type: string
    - name: name
      type: string

- id: refresh_license_info
  label: Refresh License Info
  kind: action
  params: []

- id: force_1080p60_output
  label: Force 1080p60 Output
  kind: action
  params: []

- id: hotplug
  label: Hotplug
  kind: action
  params: []

- id: bye
  label: Close Connection
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: ok
  type: enum
  values: [OK]

- id: error
  type: string
  description: ERROR "description"

- id: heartbeat_reply
  type: enum
  values: [OK]

- id: power_off_notification
  type: enum
  values: [PowerOff]

- id: standby_notification
  type: enum
  values: [Standby]

- id: restart_notification
  type: enum
  values: [Restart]

- id: reload_software_notification
  type: enum
  values: [ReloadSoftware]

- id: open_menu_notification
  type: string

- id: close_menu_notification
  type: enum
  values: [CloseMenu]

- id: key_press_notification
  type: string

- id: aspect_ratio_notification
  type: string
  description: AspectRatio pixelAR floatAR nearestAR "description"

- id: masking_ratio_notification
  type: string
  description: MaskingRatio pixelAR floatAR nearestAR

- id: set_aspect_ratio_mode_notification
  type: string

- id: profile_group_created
  type: string
  description: CreateProfileGroup groupId "name"

- id: profile_group_renamed
  type: string
  description: RenameProfileGroup groupId "name"

- id: profile_group_deleted
  type: string

- id: profile_created
  type: string
  description: CreateProfile group profileId "name"

- id: profile_renamed
  type: string

- id: profile_deleted
  type: string

- id: profile_activated
  type: string

- id: profile_added_to_page
  type: string

- id: profile_removed_from_page
  type: string

- id: change_option_notification
  type: string
  description: ChangeOption type optionPath currentValue effectiveValue

- id: inherit_option_notification
  type: string
  description: InheritOption type optionPath effectiveValue

- id: reset_temporary_notification
  type: enum
  values: [ResetTemporary]

- id: 3dlut_file_uploaded
  type: string

- id: 3dlut_file_renamed
  type: string

- id: 3dlut_file_deleted
  type: string

- id: toggle_notification
  type: string

- id: tone_map_on_notification
  type: enum
  values: [ToneMapOn]

- id: tone_map_off_notification
  type: enum
  values: [ToneMapOff]

- id: settings_uploaded
  type: enum
  values: [UploadSettingsFile]

- id: settings_stored
  type: string

- id: settings_restored
  type: string

- id: no_signal
  type: enum
  values: [NoSignal]

- id: incoming_signal_info
  type: string
  description: IncomingSignalInfo width height frameRate 2D|3D chroma bitDepth colorSpace colorspaceDetail aspectRatio

- id: outgoing_signal_info
  type: string
  description: OutgoingSignalInfo width height frameRate 2D|3D chroma bitDepth colorSpace colorspaceDetail aspectRatio

- id: display_changed
  type: enum
  values: [DisplayChanged]

- id: license_refreshed
  type: enum
  values: [RefreshLicenseInfo]

- id: force_1080p60_output_notification
  type: enum
  values: [Force1080p60Output]

- id: hotplug_notification
  type: enum
  values: [Hotplug]

- id: firmware_update
  type: enum
  values: [FirmwareUpdate]

- id: missing_heartbeat
  type: enum
  values: [MissingHeartbeat]

- id: temperatures
  type: string
  description: Temperatures gpu hdmiInput cpu mainboard future

- id: mac_address
  type: string
  description: MacAddress XX-XX-XX-XX-XX-XX

- id: active_profile
  type: string
  description: ActiveProfile group index

- id: profile
  type: string
  description: Profile fullId "name"

- id: profile_group
  type: string
  description: ProfileGroup groupId "name"

- id: setting_page
  type: string
  description: SettingPage pageId "name"

- id: config_page
  type: string
  description: ConfigPage pageId "name"

- id: option
  type: string
  description: Option type optionId currentValue effectiveValue

- id: 3dlut_file
  type: string
  description: 3DLUTFile "filename.3dlut"

- id: download_3dlut_file_info
  type: string
  description: Download3DLUTFile base64Size crcHex "filename"

- id: download_settings_file_info
  type: string
  description: DownloadSettingsFile base64Size crcHex

- id: download_edid_file_info
  type: string
  description: DownloadEDIDFile base64Size crcHex "name"
```

## Variables
```yaml
# All settings/config options are queryable/modifiable via ChangeOption command.
# Enumerate via EnumSettingPages / EnumConfigPages / EnumOptions.
# UNRESOLVED: Option value ranges not enumerated in source - must be discovered at runtime.
```

## Events
```yaml
# All notifications are events. Key categories:
# - power: PowerOff, Standby, Restart, ReloadSoftware
# - menu: OpenMenu, CloseMenu, KeyPress, KeyHold
# - signal: IncomingSignalInfo, OutgoingSignalInfo, NoSignal, DisplayChanged
# - aspect: AspectRatio, MaskingRatio, SetAspectRatioMode
# - profile: CreateProfileGroup, RenameProfileGroup, DeleteProfileGroup, CreateProfile, RenameProfile, DeleteProfile, ActivateProfile
# - options: ChangeOption, InheritOption, ResetTemporary
# - files: Upload3DLUTFile, Rename3DLUTFile, Delete3DLUTFile, UploadSettingsFile, StoreSettings, RestoreSettings
# - other: RefreshLicenseInfo, Force1080p60Output, Hotplug, FirmwareUpdate, MissingHeartbeat
# UNRESOLVED: No discrete event types enum in source - all notifications are freeform strings
```

## Macros
```yaml
# No explicit macro sequences defined in source.
# Multi-step operations (e.g., upload 3DLUT) require two commands: Upload3DLUTFile header + base64 body.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Connection lifecycle: connect → receive welcome banner → optionally send heartbeat every 20s (Envy closes connection after 60s of silence). Commands terminated by \\r, \\n, or \\r\\n. Responses: "OK" or "ERROR \\"message\\"". Notifications sent asynchronously to all connected clients. Can also open connection, send one command, close immediately — but no notifications received this way.

Profile system uses hierarchical IDs: profileGroupId_profileId (e.g., "customProfileGroup1_profile1"). Use "0" to deactivate a profile group.

3DLUT and settings file transfer uses header-then-base64-body protocol. CRC32 validation required (initialize with -1).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: binary EDID format not detailed in source -->
<!-- UNRESOLVED: option value ranges not enumerated in source -->

## Provenance

```yaml
source_domains:
  - madvrenvy.com
retrieved_at: 2026-05-04T18:04:28.149Z
last_checked_at: 2026-04-25T21:07:32.193Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:07:32.193Z
matched_actions: 57
action_count: 57
confidence: high
summary: "All 57 spec actions found verbatim in source; transport parameters match; no extra commands; full bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
