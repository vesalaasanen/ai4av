---
spec_id: admin/classe-ssp_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe SSP-300/SSP-600 Control Spec"
manufacturer: Classe
model_family: SSP-300
aliases: []
compatible_with:
  manufacturers:
    - Classe
  models:
    - SSP-300
    - SSP-600
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-300-600_RS232_Protocol.pdf
retrieved_at: 2026-04-30T04:34:59.774Z
last_checked_at: 2026-06-02T22:05:23.696Z
generated_at: 2026-06-02T22:05:23.696Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "only RS-232 documented; TCP/IP control not present in source"
  - "no discrete settable parameters beyond action commands"
  - "no unsolicited event descriptions in source; automatic status updates"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "TCP/IP control interface not documented in source"
  - "firmware version compatibility not stated in source"
  - "video output debug commands (DBGVIDOUT) parameters not fully specified in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:23.696Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Classe SSP-300/SSP-600 Control Spec

## Summary
Classe SSP-300 and SSP-600 are surround sound processors/preamps with RS-232 control interface. Communication uses 9600 baud 8N1 ASCII commands with address fields (S300/S600) and CR/LF termination. No authentication required.

<!-- UNRESOLVED: only RS-232 documented; TCP/IP control not present in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # STBY/OPER commands present
- routable   # MAIN n, ZONE n commands present
- queryable  # STAT MAIN, STAT MODE, STAT AUTO commands present
- levelable  # VOLA, VOLZ, MVOL+/-, ZVOL+/-, balance, trim commands present
```

## Actions
```yaml
- id: main_input
  label: Change Main Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: zone_input
  label: Change Zone Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: main_input_next
  label: Next Main Input
  kind: action
  params: []

- id: main_input_prev
  label: Previous Main Input
  kind: action
  params: []

- id: zone_input_next
  label: Next Zone Input
  kind: action
  params: []

- id: zone_input_prev
  label: Previous Zone Input
  kind: action
  params: []

- id: zone_unmute
  label: Zone On (Unmute)
  kind: action
  params: []

- id: zone_mute
  label: Zone Off (Standby/Mute)
  kind: action
  params: []

- id: listening_position
  label: Set Listening Position
  kind: action
  params:
    - name: position
      type: integer
      description: Position number m

- id: volume_main
  label: Set Main Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level (0-100)

- id: volume_zone
  label: Set Zone Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Absolute volume level (00 = off)

- id: volume_main_up
  label: Main Volume Up
  kind: action
  params: []

- id: volume_main_down
  label: Main Volume Down
  kind: action
  params: []

- id: volume_zone_up
  label: Zone Volume Up
  kind: action
  params: []

- id: volume_zone_down
  label: Zone Volume Down
  kind: action
  params: []

- id: power_on
  label: Power On (Operate)
  kind: action
  params: []

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []

- id: mute
  label: Mute Main Outputs
  kind: action
  params: []

- id: unmute
  label: Unmute Main Outputs
  kind: action
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  params: []

- id: balance_center
  label: Balance Center
  kind: action
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  params: []

- id: sub_trim_up
  label: Sub Trim Up
  kind: action
  params: []

- id: sub_trim_down
  label: Sub Trim Down
  kind: action
  params: []

- id: center_trim_up
  label: Center Trim Up
  kind: action
  params: []

- id: center_trim_down
  label: Center Trim Down
  kind: action
  params: []

- id: surround_trim_up
  label: Surround Trim Up
  kind: action
  params: []

- id: surround_trim_down
  label: Surround Trim Down
  kind: action
  params: []

- id: back_trim_up
  label: Back Trim Up
  kind: action
  params: []

- id: back_trim_down
  label: Back Trim Down
  kind: action
  params: []

- id: lip_sync_up
  label: Lip Sync Delay Up
  kind: action
  params: []

- id: lip_sync_down
  label: Lip Sync Delay Down
  kind: action
  params: []

- id: lip_sync_reset
  label: Lip Sync Reset
  kind: action
  params: []

- id: trim_reset
  label: Reset All Channel Trims
  kind: action
  params: []

- id: dolby_late_night_on
  label: Dolby Late Night On
  kind: action
  params: []

- id: dolby_late_night_off
  label: Dolby Late Night Off
  kind: action
  params: []

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  params: []

- id: trigger1_on
  label: Trigger 1 On
  kind: action
  params: []

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  params: []

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  params: []

- id: lcd_screen_saver
  label: LCD Screen Saver Mode
  kind: action
  params: []

- id: lcd_low
  label: LCD Low Intensity
  kind: action
  params: []

- id: lcd_medium
  label: LCD Medium Intensity
  kind: action
  params: []

- id: lcd_high
  label: LCD High Intensity
  kind: action
  params: []

- id: pass_ir_code
  label: Pass IR Code
  kind: action
  params:
    - name: code
      type: integer
      description: IR code number (nnn)

- id: tape_monitor_off
  label: Tape Monitor Off
  kind: action
  params: []

- id: tape_monitor_on
  label: Tape Monitor On
  kind: action
  params: []

- id: set_skin
  label: Set OSD Skin
  kind: action
  params:
    - name: skin
      type: integer
      description: Skin number (1=Classe, 5=Green)

- id: debug_balanced_mode
  label: Set Balanced Mode (SSP-600 only)
  kind: action
  params:
    - name: input
      type: integer
    - name: enabled
      type: integer
      description: 0=off, 1=on

- id: debug_video_out
  label: Set Video Output State
  kind: action
  params:
    - name: output
      type: integer
    - name: state
      type: integer
      description: 0=off, 1=on
- id: zone_on
  label: Zone On
  kind: action
  params: []

- id: zone_off
  label: Zone Off
  kind: action
  params: []

- id: stat_main
  label: Request Main Volume and Input Status
  kind: query
  params: []

- id: stat_auto
  label: Enable Automatic Status Updates
  kind: action
  params: []

- id: stat_off
  label: Disable Automatic Status Updates
  kind: action
  params: []

- id: stat_mode
  label: Request Current Post Processing Mode
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  label: Command Acknowledged
  type: string
  values: ["!CRLF"]
  description: Exclamation mark followed by CR/LF indicates success

- id: command_nack
  label: Command Not Recognized
  type: string
  values: ["?CRLF"]
  description: Question mark followed by CR/LF indicates unrecognized command

- id: power_status
  label: Power Status
  type: enum
  values:
    - PWRUP
    - STBY
    - OPER

- id: main_volume
  label: Main Volume
  type: string
  description: "Format: SY VOLA vv or SY VOLA vv muted"

- id: main_input_status
  label: Main Input Status
  type: string
  description: "Format: SY MAIN n NN where n=input number, NN=name"

- id: post_processing_mode
  label: Post Processing Mode
  type: enum
  values:
    - "0: multi-channel"
    - "1: multi-channel+THX"
    - "2: Dolby Pro Logic"
    - "3: Dolby Pro Logic+THX"
    - "4: music mode club"
    - "5: music mode natural"
    - "6: music mode concert"
    - "7: music mode party"
    - "8: music mode stadium"
    - "9: music mode 6"
    - "10: music mode 7"
    - "11: mono"
    - "12: mono+THX"
    - "13: custom"
    - "14: surround 6.1"
    - "15: stereo"
    - "16: stereo+THX"
    - "17: Dolby PLII Movie"
    - "18: Dolby PLII Movie+THX"
    - "19: Dolby PLII Music"
    - "20: Dolby PLIIx Music"
    - "21: Dolby PLIIx Movie"
    - "22: Dolby PLIIx Movie+THX"
    - "23: Dolby Digital EX"
    - "24: THX Ultra2 Music"
    - "25: THX Ultra2 Cinema"
    - "26: THX Surround EX"
    - "28: DTS Neo:6+THX"
    - "29: DTS Neo:6 Cinema"
    - "30: DTS Neo:6 Cinema+THX"
    - "31: DTS Neo:6 Music"
    - "32: DTS Matrix 6.1"
    - "33: DTS Matrix 6.1+THX"
    - "34: stereo 24/96"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source; automatic status updates
# (STAT AUTO) can be enabled but source does not describe event emission format
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command acceleration: MVOL+/- and ZVOL+/- must be received within 200ms of the system's reply to activate acceleration mode.

Reply timing: device generates reply within 100ms of receipt of last command termination character. If no reply received after 100ms, reissue command.

Address format: S300 for SSP-300, S600 for SSP-600. Address field and period delimiter may be omitted if controller uniquely connects to a single device. Commands received without address field are interpreted for local operation.

<!-- UNRESOLVED: TCP/IP control interface not documented in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: video output debug commands (DBGVIDOUT) parameters not fully specified in source -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-300-600_RS232_Protocol.pdf
retrieved_at: 2026-04-30T04:34:59.774Z
last_checked_at: 2026-06-02T22:05:23.696Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:23.696Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "only RS-232 documented; TCP/IP control not present in source"
- "no discrete settable parameters beyond action commands"
- "no unsolicited event descriptions in source; automatic status updates"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "TCP/IP control interface not documented in source"
- "firmware version compatibility not stated in source"
- "video output debug commands (DBGVIDOUT) parameters not fully specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
