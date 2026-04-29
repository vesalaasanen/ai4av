---
schema_version: ai4av-public-spec-v1
device_id: madvr/madvr-envy
entity_id: madvr_envy
spec_id: admin/madvr-envy
revision: 1
author: admin
title: "madVR Envy Control Spec"
status: published
manufacturer: madVR
manufacturer_key: madvr
model_family: "madVR Envy"
aliases: []
compatible_with:
  manufacturers:
    - madVR
  models:
    - "madVR Envy"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
source_documents:
  - title: "madVR public source"
    url: https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T17:02:00.382Z
  - title: "madVR public source"
    url: https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T17:02:15.744Z
  - title: "madVR public source"
    url: https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T17:04:37.161Z
retrieved_at: 2026-04-26T17:04:37.161Z
last_checked_at: 2026-04-27T09:04:51.656Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:51.656Z
  matched_actions: 89
  action_count: 89
  confidence: high
  summary: "All 89 spec action ids match documented source commands; transport verified (TCP port 44077, no auth)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# madVR Envy Control Spec

## Summary
madVR Envy is a video processor with IP control via TCP server on port 44077, supporting up to 16 concurrent connections. ASCII text (UTF8) command/response protocol with heartbeat keepalive. Supports power management, menu/GUI control, aspect ratio overrides, profile management, option enumeration/changes, 3DLUT file transfer, settings backup/restore, and EDID management.

<!-- UNRESOLVED: voltage/current/power specs not stated in source -->

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
- powerable      # PowerOff, Standby, Restart commands present
- routable       # ActivateProfile, profile switching present
- queryable      # GetTemperatures, GetMacAddress, QueryOption, GetActiveProfile present
- levelable      # DisplayAudioVolume, ChangeOption present
```

## Actions
```yaml
# Power
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

# Menu / GUI
- id: open_menu
  label: Open Menu
  kind: action
  params:
    - name: menu
      type: string
      description: Menu name (Info, Settings, Configuration, Profiles, TestPatterns)
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
      description: Button name (POWER, INFO, MENU=CONFIG, LEFT, RIGHT, UP, DOWN, OK, INPUT=PROFILES, SETTINGS, BACK, RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN)
- id: key_hold
  label: Key Hold
  kind: action
  params:
    - name: button
      type: string
      description: Button name (same as KeyPress)
- id: display_alert_window
  label: Display Alert Window
  kind: action
  params:
    - name: text
      type: string
      description: Alert message text
- id: close_alert_window
  label: Close Alert Window
  kind: action
  params: []
- id: display_message
  label: Display Message
  kind: action
  params:
    - name: timeout
      type: integer
      description: Timeout in seconds
    - name: text
      type: string
      description: Message text
- id: display_audio_volume
  label: Display Audio Volume
  kind: action
  params:
    - name: min
      type: integer
      description: Minimum value
    - name: current
      type: integer
      description: Current value
    - name: max
      type: integer
      description: Maximum value
    - name: unit
      type: string
      description: Unit description (e.g., "dB" or "%")
- id: display_audio_mute
  label: Display Audio Mute
  kind: action
  params: []
- id: close_audio_mute
  label: Close Audio Mute
  kind: action
  params: []

# Aspect Ratio
- id: set_aspect_ratio_mode
  label: Set Aspect Ratio Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "Auto, Hold, or custom ratio (4:3, 16:9, 1.85:1, 2.00:1, 2.20:1, 2.35:1, 2.40:1, 2.55:1, 2.76:1)"

# Information
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

# Profile Groups
- id: create_profile_group
  label: Create Profile Group
  kind: action
  params:
    - name: name
      type: string
      description: Profile group name
- id: rename_profile_group
  label: Rename Profile Group
  kind: action
  params:
    - name: id
      type: integer
      description: Profile group ID
    - name: name
      type: string
      description: New name
- id: delete_profile_group
  label: Delete Profile Group
  kind: action
  params:
    - name: id
      type: integer
      description: Profile group ID
- id: enum_profile_groups
  label: Enumerate Profile Groups
  kind: action
  params: []

# Profiles
- id: create_profile
  label: Create Profile
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or customProfileGroupId"
    - name: name
      type: string
      description: Profile name
- id: rename_profile
  label: Rename Profile
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or customProfileGroupId"
    - name: id
      type: integer
      description: Profile ID
    - name: name
      type: string
      description: New name
- id: delete_profile
  label: Delete Profile
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or customProfileGroupId"
    - name: id
      type: integer
      description: Profile ID
- id: add_profile_to_page
  label: Add Profile to Page
  kind: action
  params:
    - name: fullProfileId
      type: string
      description: Full profile ID (e.g., sourceProfiles_profile2)
    - name: pageId
      type: string
      description: Page ID (e.g., hdrSettings)
- id: remove_profile_from_page
  label: Remove Profile from Page
  kind: action
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
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or customProfileGroupId"
    - name: id
      type: integer
      description: Profile ID (use 0 to deactivate)
- id: get_active_profile
  label: Get Active Profile
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or customProfileGroupId"
- id: enum_profiles
  label: Enumerate Profiles
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or customProfileGroupId"

# Settings / Configuration
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
    - name: pageId
      type: string
      description: Page ID, config page ID, or detailed page path
- id: query_option
  label: Query Option
  kind: action
  params:
    - name: optionIdPath
      type: string
      description: Option ID or full option path (e.g., hdrHighlightRecovery or customProfileGroup1_profile1\hdrHighlightRecovery)
- id: change_option
  label: Change Option
  kind: action
  params:
    - name: optionIdPath
      type: string
      description: Option ID or path
    - name: value
      type: string
      description: New value (string, integer, YES, or NO)
- id: inherit_option
  label: Inherit Option
  kind: action
  params:
    - name: optionIdPath
      type: string
      description: Option path to reset to inherit
- id: reset_temporary
  label: Reset Temporary Settings
  kind: action
  params: []

# 3DLUT Files
- id: enum_3dlut_files
  label: Enumerate 3DLUT Files
  kind: action
  params: []
- id: rename_3dlut_file
  label: Rename 3DLUT File
  kind: action
  params:
    - name: oldName
      type: string
      description: Old file name (must include .3dlut extension)
    - name: newName
      type: string
      description: New file name
- id: delete_3dlut_file
  label: Delete 3DLUT File
  kind: action
  params:
    - name: fileName
      type: string
      description: File name (must include .3dlut extension)
- id: download_3dlut_file
  label: Download 3DLUT File
  kind: action
  params:
    - name: fileName
      type: string
      description: File name
- id: upload_3dlut_file
  label: Upload 3DLUT File
  kind: action
  params:
    - name: base64size
      type: integer
      description: Size of base64-encoded file in bytes
    - name: crcHex
      type: string
      description: CRC32 in hex (initialize with -1)
    - name: fileName
      type: string
      description: File name

# Demo
- id: toggle
  label: Toggle Option
  kind: action
  params:
    - name: option
      type: string
      description: "Toggle option (ToneMap, HighlightRecovery, ContrastRecovery, ShadowRecovery, 3DLUT, ScreenBoundaries, Histogram, DebugOSD)"
- id: tonemap_on
  label: Tone Map On
  kind: action
  params: []
- id: tonemap_off
  label: Tone Map Off
  kind: action
  params: []

# Settings Management
- id: download_settings_file
  label: Download Settings File
  kind: action
  params: []
- id: upload_settings_file
  label: Upload Settings File
  kind: action
  params:
    - name: base64size
      type: integer
      description: Size of base64-encoded file in bytes
    - name: crcHex
      type: string
      description: CRC32 in hex
- id: store_settings
  label: Store Settings
  kind: action
  params:
    - name: target
      type: string
      description: "Installer, Suggested, or slot index (1-16)"
    - name: name
      type: string
      description: Storage name
    - name: password
      type: string
      description: Optional password for Installer slot
- id: restore_settings
  label: Restore Settings
  kind: action
  params:
    - name: target
      type: string
      description: "Installer, Suggested, or slot index (1-16)"

# EDID
- id: download_edid_file
  label: Download EDID File
  kind: action
  params:
    - name: slot
      type: string
      description: "Current or slot index (1-16)"
- id: upload_edid_file
  label: Upload EDID File
  kind: action
  params:
    - name: slot
      type: integer
      description: Slot index (1-16)
    - name: base64size
      type: integer
      description: Size of base64-encoded file in bytes
    - name: crcHex
      type: string
      description: CRC32 in hex
    - name: name
      type: string
      description: Storage name

# Other
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
# Simple responses
- id: ok
  type: string
  values: ["OK"]
- id: error
  type: string
  values: ["ERROR \"<error description>\""]

# Power notifications
- id: power_off
  type: notification
  payload: []
- id: standby
  type: notification
  payload: []
- id: restart
  type: notification
  payload: []
- id: reload_software
  type: notification
  payload: []

# Menu / GUI notifications
- id: open_menu
  type: notification
  payload:
    - name: menu
      type: string
      description: Menu name
- id: close_menu
  type: notification
  payload: []
- id: key_press
  type: notification
  payload:
    - name: button
      type: string
      description: Button name
- id: key_hold
  type: notification
  payload:
    - name: button
      type: string
      description: Button name

# Aspect ratio notifications
- id: aspect_ratio
  type: notification
  payload:
    - name: pixelAR
      type: string
      description: Pixel aspect ratio (e.g., 3840:1600)
    - name: floatAR
      type: float
      description: Float aspect ratio (e.g., 2.400)
    - name: nearestKnownAR
      type: integer
      description: Nearest well-known ratio code
    - name: description
      type: string
      description: Description (e.g., "Panavision")
- id: masking_ratio
  type: notification
  payload:
    - name: pixelAR
      type: string
    - name: floatAR
      type: float
    - name: nearestKnownAR
      type: integer
- id: set_aspect_ratio_mode
  type: notification
  payload:
    - name: mode
      type: string
      description: "Auto, Hold, or custom ratio"

# Signal notifications
- id: no_signal
  type: notification
  payload: []
- id: incoming_signal_info
  type: notification
  payload:
    - name: resolution
      type: string
      description: Resolution (e.g., 3840x2160)
    - name: frameRate
      type: string
      description: Frame rate (e.g., 23.976p)
    - name: dimensions
      type: string
      description: 2D or 3D
    - name: chroma
      type: string
      description: "422, 444, 420"
    - name: bitDepth
      type: string
      description: "8bit, 10bit, 12bit"
    - name: colorSpace
      type: string
      description: "SDR, HDR10, HLG"
    - name: colorGamut
      type: string
      description: "601, PAL, 709, DCI, 2020"
    - name: format
      type: string
      description: "TV or PC"
    - name: aspect
      type: string
      description: "16:9 or 4:3"
- id: outgoing_signal_info
  type: notification
  payload:
    - name: resolution
      type: string
    - name: frameRate
      type: string
    - name: dimensions
      type: string
    - name: colorSpace
      type: string
    - name: bitDepth
      type: string
    - name: colorGamut
      type: string
    - name: format
      type: string
    - name: aspect
      type: string
- id: display_changed
  type: notification
  payload: []

# Profile notifications
- id: create_profile_group
  type: notification
  payload:
    - name: id
      type: integer
      description: Assigned profile group ID
    - name: name
      type: string
      description: Profile group name
- id: rename_profile_group
  type: notification
  payload:
    - name: id
      type: integer
    - name: name
      type: string
- id: delete_profile_group
  type: notification
  payload:
    - name: id
      type: integer
- id: create_profile
  type: notification
  payload:
    - name: group
      type: string
    - name: id
      type: integer
      description: Assigned profile ID
    - name: name
      type: string
- id: rename_profile
  type: notification
  payload:
    - name: group
      type: string
    - name: id
      type: integer
    - name: name
      type: string
- id: delete_profile
  type: notification
  payload:
    - name: group
      type: string
    - name: id
      type: integer
- id: add_profile_to_page
  type: notification
  payload:
    - name: profileId
      type: string
    - name: pageId
      type: string
- id: remove_profile_from_page
  type: notification
  payload:
    - name: profileId
      type: string
    - name: pageId
      type: string
- id: activate_profile
  type: notification
  payload:
    - name: group
      type: string
    - name: id
      type: integer

# Option notifications
- id: change_option
  type: notification
  payload:
    - name: optionType
      type: string
      description: "STRING, INTEGER, etc."
    - name: optionIdPath
      type: string
    - name: currentValue
      type: string
    - name: effectiveValue
      type: string
- id: inherit_option
  type: notification
  payload:
    - name: optionType
      type: string
    - name: optionIdPath
      type: string
    - name: effectiveValue
      type: string
- id: reset_temporary
  type: notification
  payload: []

# 3DLUT notifications
- id: upload_3dlut_file
  type: notification
  payload:
    - name: fileName
      type: string
- id: rename_3dlut_file
  type: notification
  payload:
    - name: oldName
      type: string
    - name: newName
      type: string
- id: delete_3dlut_file
  type: notification
  payload:
    - name: fileName
      type: string

# Demo notifications
- id: toggle
  type: notification
  payload:
    - name: option
      type: string
- id: tonemap_on
  type: notification
  payload: []
- id: tonemap_off
  type: notification
  payload: []

# Settings management notifications
- id: upload_settings_file
  type: notification
  payload: []
- id: store_settings
  type: notification
  payload:
    - name: target
      type: string
      description: "Installer, Suggested, or slot index"
    - name: name
      type: string
- id: restore_settings
  type: notification
  payload:
    - name: target
      type: string

# Other notifications
- id: refresh_license_info
  type: notification
  payload: []
- id: force_1080p60_output
  type: notification
  payload: []
- id: hotplug
  type: notification
  payload: []
- id: firmware_update
  type: notification
  payload: []
- id: missing_heartbeat
  type: notification
  payload: []
```

## Variables
```yaml
# UNRESOLVED: settings/configuration options enumerated via EnumOptions, QueryOption, ChangeOption.
# Option values dynamically discovered at runtime via option enumeration workflow (section 7 of source).
# No static enumerated list available in source.
```

## Events
```yaml
# Envy sends event notifications asynchronously while connected.
# See Feedbacks section for event notifications.
# UNRESOLVED: specific event timing/ordering guarantees not stated in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # Power-on from fully off requires physical button press or Wake-On-LAN packet
  - condition: "PowerOff state requires physical power button or Wake-On-LAN to restore"
    description: "Envy does not react to remote control after PowerOff. Must use front panel button or Wake-On-LAN."
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source beyond power-on requirement
```

## Notes
Envy is a TCP server (not HTTP/REST). Commands are plain ASCII text terminated with CR, LF, or CRLF. Responses are "OK" or "ERROR". Notifications are asynchronous and sent to all connected clients. Heartbeat required every 20s or connection closes after 60s. Can also open connection per-command without keeping alive (no notifications in that mode).

Profile system uses inheritance: profiles are transparent by default, only explicit option changes take effect. Profile groups include predefined "SOURCE" and "DISPLAY", plus user-created custom profile groups.

Settings/configuration pages enumerated via EnumSettingPages/EnumConfigPages, options via EnumOptions, values changed via ChangeOption. Option ID paths support profile-specific overrides (e.g., customProfileGroup1_profile1\hdrHighlightRecovery).

3DLUT and settings files transferred as base64-encoded binary with CRC32 verification (initialize CRC with -1).

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: binary command byte encodings not used — all ASCII text protocol -->
<!-- UNRESOLVED: authentication token format not applicable — no auth required -->

## Provenance

```yaml
source_urls:
  - https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
source_documents:
  - title: "madVR public source"
    url: https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T17:02:00.382Z
  - title: "madVR public source"
    url: https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T17:02:15.744Z
  - title: "madVR public source"
    url: https://madvrenvy.com/wp-content/uploads/EnvyIpControl.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T17:04:37.161Z
retrieved_at: 2026-04-26T17:04:37.161Z
last_checked_at: 2026-04-27T09:04:51.656Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:51.656Z
matched_actions: 89
action_count: 89
confidence: high
summary: "All 89 spec action ids match documented source commands; transport verified (TCP port 44077, no auth)."
```

## Known Gaps

```yaml
[]
```
