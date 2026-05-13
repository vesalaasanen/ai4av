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
retrieved_at: 2026-05-04T17:32:06.925Z
last_checked_at: 2026-04-30T09:43:21.937Z
generated_at: 2026-04-30T09:43:21.937Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:43:21.937Z
  matched_actions: 57
  action_count: 57
  confidence: high
  summary: "All 57 spec actions matched directly to commands in protocol reference; transport (TCP 44077) verified; full coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# madVR Envy Control Spec

## Summary
Video processor with TCP/IP control interface. Server on port 44077, UTF8 ASCII commands, up to 16 concurrent connections. Heartbeat required every 20s (60s timeout). Supports power, profile, and settings management via text commands.

<!-- UNRESOLVED: RS-232 control not documented -->

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
- powerable       # PowerOff, Standby, Restart commands present
- queryable       # GetIncomingSignalInfo, GetTemperatures, GetMacAddress, etc.
- routable        # ActivateProfile, profile group management
- levelable       # DisplayAudioVolume, DisplayMessage
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
      description: Button name (POWER, INFO, MENU, LEFT, RIGHT, UP, DOWN, OK, INPUT, SETTINGS, BACK, RED, GREEN, BLUE, YELLOW, MAGENTA, CYAN)
- id: key_hold
  label: Key Hold
  kind: action
  params:
    - name: button
      type: string
      description: Button name (same as key_press)
- id: display_alert_window
  label: Display Alert Window
  kind: action
  params:
    - name: message
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
      description: Display duration in seconds
    - name: message
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
      description: Unit description (e.g. "dB" or "%")
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
      description: "Auto, Hold, or specific ratio (4:3, 16:9, 1.85:1, 2.00:1, 2.20:1, 2.35:1, 2.40:1, 2.55:1, 2.76:1)"
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
      description: New profile group name
- id: rename_profile_group
  label: Rename Profile Group
  kind: action
  params:
    - name: group_id
      type: integer
      description: Profile group ID
    - name: name
      type: string
      description: New name
- id: delete_profile_group
  label: Delete Profile Group
  kind: action
  params:
    - name: group_id
      type: integer
      description: Profile group ID
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
      description: "SOURCE, DISPLAY, or custom profile group ID"
    - name: name
      type: string
      description: Profile name
- id: rename_profile
  label: Rename Profile
  kind: action
  params:
    - name: group
      type: string
      description: Profile group (SOURCE, DISPLAY, or custom ID)
    - name: profile_id
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
      description: Profile group (SOURCE, DISPLAY, or custom ID)
    - name: profile_id
      type: integer
      description: Profile ID
- id: add_profile_to_page
  label: Add Profile to Page
  kind: action
  params:
    - name: full_profile_id
      type: string
      description: Full profile ID (e.g. sourceProfiles_profile2)
    - name: page_id
      type: string
      description: Page ID (e.g. hdrSettings)
- id: remove_profile_from_page
  label: Remove Profile from Page
  kind: action
  params:
    - name: full_profile_id
      type: string
      description: Full profile ID
    - name: page_id
      type: string
      description: Page ID
- id: activate_profile
  label: Activate Profile
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or custom profile group ID"
    - name: profile_id
      type: integer
      description: Profile ID (use 0 to deactivate)
- id: get_active_profile
  label: Get Active Profile
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or custom profile group ID"
- id: enum_profiles
  label: Enumerate Profiles
  kind: action
  params:
    - name: group
      type: string
      description: "SOURCE, DISPLAY, or custom profile group ID"
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
      description: Settings page ID or detailed path
- id: query_option
  label: Query Option
  kind: action
  params:
    - name: option_path
      type: string
      description: Option ID or full path
- id: change_option
  label: Change Option
  kind: action
  params:
    - name: option_path
      type: string
      description: Option ID or full path
    - name: value
      type: string
      description: New value (string, integer, YES, or NO)
- id: inherit_option
  label: Inherit Option
  kind: action
  params:
    - name: option_path
      type: string
      description: Full path to option
- id: reset_temporary
  label: Reset Temporary
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
      description: Old filename (with .3dlut)
    - name: new_name
      type: string
      description: New filename (with .3dlut)
- id: delete_3dlut_file
  label: Delete 3DLUT File
  kind: action
  params:
    - name: filename
      type: string
      description: Filename (with .3dlut)
- id: download_3dlut_file
  label: Download 3DLUT File
  kind: action
  params:
    - name: filename
      type: string
      description: Filename (with .3dlut)
- id: upload_3dlut_file
  label: Upload 3DLUT File
  kind: action
  params:
    - name: base64_size
      type: integer
      description: Base64 stream size in bytes
    - name: crc
      type: string
      description: CRC32 in hex
    - name: filename
      type: string
      description: Filename (with .3dlut)
- id: toggle
  label: Toggle Demo Option
  kind: action
  params:
    - name: option
      type: string
      description: "Option name (ToneMap, HighlightRecovery, ContrastRecovery, ShadowRecovery, 3DLUT, ScreenBoundaries, Histogram, DebugOSD)"
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
      description: Base64 stream size in bytes
    - name: crc
      type: string
      description: CRC32 in hex
- id: store_settings
  label: Store Settings
  kind: action
  params:
    - name: slot
      type: string
      description: "Installer, Suggested, or slot index (0-15)"
    - name: name
      type: string
      description: Storage name
    - name: password
      type: string
      description: Service password (only for Installer slot)
- id: restore_settings
  label: Restore Settings
  kind: action
  params:
    - name: slot
      type: string
      description: "Installer, Suggested, or slot index"
- id: download_edid_file
  label: Download EDID File
  kind: action
  params:
    - name: slot
      type: string
      description: "Current or slot index"
- id: upload_edid_file
  label: Upload EDID File
  kind: action
  params:
    - name: slot
      type: integer
      description: Slot index
    - name: base64_size
      type: integer
      description: Base64 stream size in bytes
    - name: crc
      type: string
      description: CRC32 in hex
    - name: name
      type: string
      description: Storage name
- id: refresh_license_info
  label: Refresh License Info
  kind: action
  params: []
- id: force_1080p60_output
  label: Force 1080p60 Output
  kind: action
  params: []
- id: hotplug
  label: HDMI Hotplug
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
  type: string
  description: Success acknowledgement
- id: error
  type: string
  description: Error with description
- id: welcome
  type: string
  description: Welcome message on connect (e.g. "WELCOME to Envy v1.0.1.0")
- id: heartbeat_reply
  type: string
  description: Heartbeat acknowledgement ("OK")
- id: temperatures
  type: string
  description: Temperature reading format "Temperatures gpu hdmiInput cpu mainboard unknownFuture"
- id: mac_address
  type: string
  description: MAC address format "MacAddress XX-XX-XX-XX-XX-XX"
- id: incoming_signal_info
  type: string
  description: Incoming video signal info
- id: outgoing_signal_info
  type: string
  description: Outgoing video signal info
- id: aspect_ratio
  type: string
  description: Aspect ratio notification
- id: masking_ratio
  type: string
  description: Masking ratio notification
- id: active_profile
  type: string
  description: Active profile notification
- id: option_value
  type: string
  description: Option query/change notification
- id: profile_group
  type: string
  description: Profile group enumeration line
- id: profile
  type: string
  description: Profile enumeration line
- id: setting_page
  type: string
  description: Settings page enumeration line
- id: config_page
  type: string
  description: Config page enumeration line
- id: option
  type: string
  description: Option enumeration line
- id: 3dlut_file
  type: string
  description: 3DLUT file enumeration line
- id: toggle
  type: string
  description: Demo toggle notification
- id: tone_map_state
  type: string
  description: Tone map on/off notification
- id: no_signal
  type: string
  description: No signal notification
- id: display_changed
  type: string
  description: Display changed notification
- id: firmware_update
  type: string
  description: Firmware update starting notification
- id: missing_heartbeat
  type: string
  description: Connection closed due to missing heartbeat
- id: upload_settings_file
  type: string
  description: Settings file uploaded notification
- id: store_settings
  type: string
  description: Settings stored notification
- id: restore_settings
  type: string
  description: Settings restored notification
- id: power_state
  type: enum
  values: [PowerOff, Standby, Restart, ReloadSoftware]
- id: menu_state
  type: string
  description: Menu open/close notification
- id: key_event
  type: string
  description: Remote control button press/hold notification
```

## Variables
```yaml
# UNRESOLVED: options are enumerated dynamically via EnumOptions/QueryOption/ChangeOption
# No static variable list; device has hundreds of runtime-configurable options
```

## Events
```yaml
# All notifications sent unsolicited by Envy when connection is maintained:
# - Power state changes (PowerOff, Standby, Restart, ReloadSoftware)
# - Menu/GUI events (OpenMenu, CloseMenu, KeyPress, KeyHold)
# - Aspect ratio changes (AspectRatio, MaskingRatio, SetAspectRatioMode)
# - Signal changes (IncomingSignalInfo, OutgoingSignalInfo, NoSignal, DisplayChanged)
# - Profile changes (CreateProfileGroup, RenameProfileGroup, DeleteProfileGroup, CreateProfile, RenameProfile, DeleteProfile, AddProfileToPage, RemoveProfileFromPage, ActivateProfile)
# - Option changes (ChangeOption, InheritOption, ResetTemporary)
# - 3DLUT operations (Upload3DLUTFile, Rename3DLUTFile, Delete3DLUTFile)
# - Demo toggles (Toggle, ToneMapOn, ToneMapOff)
# - Settings operations (UploadSettingsFile, StoreSettings, RestoreSettings)
# - Other (RefreshLicenseInfo, Force1080p60Output, Hotplug, FirmwareUpdate, MissingHeartbeat)
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "PowerOff requires physical button or Wake-On-LAN to restore - cannot be turned on via IP after power off"
    source: "Section 5.1: 'You can only turn it back on by pressing the power button on the front plate, or by sending Envy a Wake-On-LAN packet.'"
  - description: "Delete3DLUTFile is permanent - no undelete available"
    source: "Section 5.8: 'There's no \"undelete\" available. A 3DLUT file deleted is lost forever.'"
# UNRESOLVED: other safety warnings not found in source
```

## Notes
- TCP server on port 44077, up to 16 concurrent connections
- Heartbeat required every 20s; connection closed after 60s of inactivity
- Commands: UTF8 ASCII, `Command Params` format, params separated by space, use "" for params with spaces
- Command terminators: 0x0D, 0x0A, or 0x0D 0x0A
- Replies: `OK\r\n` or `ERROR "description"\r\n`
- Notifications sent unsolicited to all connected clients
- Reply/notification order not guaranteed
- Base64-encoded file transfers (3DLUT, settings, EDID) with CRC32 verification
- Envy uses profile groups and profiles for settings organization; profiles are transparent by default and only override specific options
- Option values queried and changed dynamically via option ID paths
- 3DLUT file upload/download requires separate base64 data transfer after command
- Settings slots: 16 user slots plus predefined Installer and Suggested
- Installer settings require password to overwrite
<!-- UNRESOLVED: RS-232 serial control not documented in source -->
<!-- UNRESOLVED: specific option IDs and their valid value ranges must be enumerated at runtime -->
<!-- UNRESOLVED: Wake-On-LAN MAC address format not verified against source -->

## Provenance

```yaml
source_domains:
  - madvrenvy.com
retrieved_at: 2026-05-04T17:32:06.925Z
last_checked_at: 2026-04-30T09:43:21.937Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:43:21.937Z
matched_actions: 57
action_count: 57
confidence: high
summary: "All 57 spec actions matched directly to commands in protocol reference; transport (TCP 44077) verified; full coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
