---
spec_id: admin/tascam-bd-01u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tascam BD-01U Control Spec"
manufacturer: Tascam
model_family: BD-01U
aliases: []
compatible_with:
  manufacturers:
    - Tascam
  models:
    - BD-01U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tascam.com
  - cf.tascam.com
  - tascam.eu
source_urls:
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-mp1/rs232c_ethernet_protocol_bd-mp1_v0104_en.pdf
  - https://cf.tascam.com/wp-content/uploads/downloads/products/tascam/cd-400u/rs-232c_protocol_cd400u_v1.21_e.pdf
  - https://www.tascam.eu/en/docs/SS-CDR250N_RS-232C_v115.pdf
retrieved_at: 2026-05-04T15:24:28.295Z
last_checked_at: 2026-05-18T17:08:13.450Z
generated_at: 2026-05-18T17:08:13.450Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T17:08:13.450Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec action units matched to source commands; transport parameters verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Tascam BD-01U Control Spec

## Summary
Blu-ray Disc Player with RS-232C and Ethernet control interfaces. Serial: 9600/8/N/1, 3-wire half-duplex. Ethernet: TCP on port 60128, persistent connection, single client, 50ms inter-command gap. Protocol uses 3-char ASCII commands with start char "!" and unit type "7" (Blu-ray). Supports power, playback, navigation, status query, and unsolicited notifications.

<!-- UNRESOLVED: MAC address discovery not documented beyond "confirm on setup menu" -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not mentioned; 3-wire half-duplex implies none
addressing:
  port: 60128  # TCP only; source states "Destination Port Number is 60128 (fixed)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence: PWR commands, playback control, status query commands
- powerable
- queryable
- routable  # UNRESOLVED: explicit input/output routing not present; inferred from disc selection commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: open_close_tray
  label: Open/Close Tray
  kind: action
  params: []
- id: osd_up
  label: OSD Up
  kind: action
  params: []
- id: osd_down
  label: OSD Down
  kind: action
  params: []
- id: osd_left
  label: OSD Left
  kind: action
  params: []
- id: osd_right
  label: OSD Right
  kind: action
  params: []
- id: color_button_a
  label: Color Button A (Red)
  kind: action
  params: []
- id: color_button_b
  label: Color Button B (Green)
  kind: action
  params: []
- id: color_button_c
  label: Color Button C (Blue)
  kind: action
  params: []
- id: color_button_d
  label: Color Button D (Yellow)
  kind: action
  params: []
- id: enter
  label: Enter
  kind: action
  params: []
- id: return
  label: Return
  kind: action
  params: []
- id: home
  label: Home
  kind: action
  params: []
- id: menu
  label: Menu/Popup Menu
  kind: action
  params: []
- id: title
  label: Title (Top Menu)
  kind: action
  params: []
- id: display
  label: Display (On Screen)
  kind: action
  params: []
- id: pip_toggle
  label: PIP On/Off Toggle
  kind: action
  params: []
- id: pip_on
  label: PIP On
  kind: action
  params: []
- id: pip_off
  label: PIP Off
  kind: action
  params: []
- id: angle
  label: Angle
  kind: action
  params: []
- id: audio
  label: Audio
  kind: action
  params: []
- id: subtitle
  label: Subtitle
  kind: action
  params: []
- id: play
  label: Play
  kind: action
  params: []
- id: stop
  label: Stop
  kind: action
  params: []
- id: pause
  label: Pause
  kind: action
  params: []
- id: skip_up
  label: Skip Up
  kind: action
  params: []
- id: skip_down
  label: Skip Down
  kind: action
  params: []
- id: scan_ff
  label: Fast Forward
  kind: action
  params: []
- id: scan_fr
  label: Fast Reverse
  kind: action
  params: []
- id: numeric_select
  label: Numeric Select
  kind: action
  params:
    - name: digit
      type: string
      description: "01-09 for digits 1-9, 00 for 0/10"
- id: search
  label: Search
  kind: action
  params: []
- id: repeat_toggle
  label: Repeat Toggle
  kind: action
  params: []
- id: ab_repeat
  label: A-B Repeat
  kind: action
  params: []
- id: playmode_toggle
  label: Play Mode Toggle
  kind: action
  params: []
- id: clear
  label: Clear
  kind: action
  params: []
- id: dimmer
  label: Dimmer
  kind: action
  params: []
- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  params: []
- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  params: []
- id: dimmer_auto
  label: Dimmer Auto
  kind: action
  params: []
- id: language
  label: Player Menu Language
  kind: action
  params:
    - name: lang
      type: string
      description: "EN/FR/SP/GE/IT/JP"
- id: initialize
  label: Initialize
  kind: action
  params:
    - name: mode
      type: string
      description: "00=start init (when No Disc), 01=reset defaults"
- id: cec_toggle
  label: CEC Control Toggle
  kind: action
  params: []
- id: cec_on
  label: CEC Control Enable
  kind: action
  params: []
- id: cec_off
  label: CEC Control Disable
  kind: action
  params: []
- id: econtrol_toggle
  label: E-control Power Control Toggle
  kind: action
  params: []
- id: econtrol_on
  label: E-control Power Control Enable
  kind: action
  params: []
- id: econtrol_off
  label: E-control Power Control Disable
  kind: action
  params: []
- id: hdmi_audio
  label: HDMI Audio
  kind: action
  params:
    - name: mode
      type: string
      description: "00=Multi(Normal), 02=Multi(LPCM), FF=Off"
- id: status_mode
  label: Status Mode (Unsolicited Feedback)
  kind: action
  params:
    - name: mode
      type: string
      description: "00=off, 01=notify on status change, 02=don't notify No/Time, 03=notify No/Time changes"
- id: aspect_change
  label: Aspect Ratio Change
  kind: action
  params:
    - name: mode
      type: string
      description: "00=4:3 Letterbox, 01=4:3 Normal, 02=16:9 Widescreen, 03=16:9 Squeeze"
- id: resolution_change
  label: Resolution Change
  kind: action
  params:
    - name: mode
      type: string
      description: "TG=toggle, 01=Auto, 02=480p/576p, 03=720p, 04=1080i, 05=1080p, 07=1080p24"
```

## Feedbacks
```yaml
- id: spm_notification
  label: Status Mode Notification
  kind: feedback
  type: enum
  values:
    - "00"
    - "01"
    - "02"
    - "03"
  description: "00=won't send, 01=will send on change, 02=no No/Time, 03=No/Time changes"
- id: sst_status
  label: Action Status
  kind: feedback
  type: enum
  values:
    - "00"  # Standby
    - "01"  # Playback
    - "02"  # Playback Pause
    - "03"  # Stop
    - "FF"  # Unknown
- id: dst_disc_status
  label: Disc Status
  kind: feedback
  type: enum
  values:
    - "00"  # No disc
    - "01"  # DVD
    - "04"  # CD
    - "07"  # CD DATA (MP3/WMA/JPEG)
    - "10"  # BD-ROM
    - "12"  # USB
    - "FF"  # Unknown
- id: mst_dimmer
  label: Dimmer Level
  kind: feedback
  type: enum
  values:
    - "00"  # Bright
    - "02"  # Dark
    - "07"  # Auto
    - "FF"  # Unknown
- id: ast_aspect
  label: Aspect Ratio Status
  kind: feedback
  type: enum
  values:
    - "00"  # 4:3 Letterbox
    - "01"  # 4:3 Normal
    - "02"  # 16:9 Widescreen
    - "03"  # 16:9 Squeeze
    - "FF"  # Unknown/other
- id: stg_title_folder
  label: Title/Group/Folder Number
  kind: feedback
  type: string
  description: "Format: cccttt (c=current title, t=total title). Example: !7STG012255 means current 012 / total 255"
- id: stc_chapter_track
  label: Chapter/Track Number
  kind: feedback
  type: string
  description: "Format: cccttt (c=current, t=total). Up to 999. Example: !7STC012255"
- id: set_elapsed_time
  label: Elapsed Time
  kind: feedback
  type: string
  description: "Format: hmmss (hours/minutes/seconds). Example: !7SET-0001 means 00:01"
- id: smo_hdmi_resolution
  label: HDMI Output Resolution
  kind: feedback
  type: enum
  values:
    - "00"  # No Video Code
    - "02"  # 720(1440,2880) x 480p60Hz
    - "04"  # 1280x720P 60Hz
    - "05"  # 1920x1080I 60Hz
    - "16"  # 1920x1080P 60Hz
    - "17"  # 720(1440,2880) x 576p50Hz
    - "19"  # 1280x720P 50Hz
    - "20"  # 1920x1080I 50Hz
    - "31"  # 1920x1080P 50Hz
    - "32"  # 1920x1080P 24Hz
    - "35"  # 1280x720P 100Hz
    - "36"  # 1280x720P 120Hz
    - "37"  # 1920x1080P 48Hz
    - "FF"  # Unknown/Other
- id: scm_language
  label: Player Menu Language Status
  kind: feedback
  type: enum
  values:
    - "EN"
    - "FR"
    - "SP"
    - "GE"
    - "IT"
    - "JP"
- id: scc_cec_status
  label: CEC Control Status
  kind: feedback
  type: enum
  values:
    - "ON"  # Enabled
    - "OF"  # Disabled
- id: smr_hdmi_resolution_setup
  label: HDMI Resolution Setup Status
  kind: feedback
  type: enum
  values:
    - "01"  # Auto
    - "02"  # 480p/576p
    - "03"  # 720p
    - "04"  # 1080i
    - "05"  # 1080p
    - "07"  # 1080p24
    - "FF"  # Unknown
- id: sma_hdmi_audio_setup
  label: HDMI Audio Setup Status
  kind: feedback
  type: enum
  values:
    - "00"  # Multi (Normal)
    - "02"  # Multi (LPCM)
    - "FF"  # Off
```

## Variables
```yaml
# No discrete settable parameters separate from actions; all parameters embedded in command codes.
```

## Events
```yaml
# Device sends unsolicited status notifications when PMS01 is active.
# Notification format: "!7SSTxx[EOF]" etc.
# Events map to feedback items (SST, DST, MST, AST, STG, STC, SET, SMO, SCM, SCC, SMR, SMA).
# UNRESOLVED: event emission timing not explicitly detailed beyond "when status changes"
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: initialize_requires_no_disc
    description: "INI command with mode 00 (start initialization) only recognized when status is 'No Disc' (DST=00)."
  - id: aspect_resolution_requires_stop
    description: "ASC (Aspect Change) and RSC (Resolution Change) commands only recognized when status is 'Stop' (SST=03)."
```

## Notes
- Protocol header: "ISCP" magic bytes, header size 0x00000010 (16 bytes, big-endian), data size (big-endian), version 0x01, reserved=0, unit type "7" for Blu-ray Disc Player.
- End character for commands to device: [CR] (0x0D), [LF] (0x0A), or [CR][LF].
- End character for responses from device: [EOF] (0x1A) only.
- Serial: 3-wire half-duplex, no hardware flow control, fixed config 9600/8/N/1.
- Ethernet: TCP port 60128 fixed. Keep connection open continuously. Only one client at a time.
- Inter-command gap: minimum 50ms between messages from client.
- Unsolicited feedback off by default (PMS00). Send PMS01 to enable status change notifications.
- Only one simultaneous client connection allowed.
- <!-- UNRESOLVED: MAC address acquisition — "confirm on setup menu" only; no procedure documented -->
- <!-- UNRESOLVED: firmware version compatibility — not stated in source -->
- <!-- UNRESOLVED: command timing/latency expectations — not stated -->

## Provenance

```yaml
source_domains:
  - tascam.com
  - cf.tascam.com
  - tascam.eu
source_urls:
  - https://tascam.com/wp-content/uploads/downloads/products/tascam/bd-mp1/rs232c_ethernet_protocol_bd-mp1_v0104_en.pdf
  - https://cf.tascam.com/wp-content/uploads/downloads/products/tascam/cd-400u/rs-232c_protocol_cd400u_v1.21_e.pdf
  - https://www.tascam.eu/en/docs/SS-CDR250N_RS-232C_v115.pdf
retrieved_at: 2026-05-04T15:24:28.295Z
last_checked_at: 2026-05-18T17:08:13.450Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T17:08:13.450Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec action units matched to source commands; transport parameters verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
