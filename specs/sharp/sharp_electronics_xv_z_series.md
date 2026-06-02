---
spec_id: admin/sharp_electronics-xv_z_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics XV-Z Series Control Spec"
manufacturer: Sharp
model_family: XV-Z30000
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - XV-Z30000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.sharpusa.com
  - manualsdump.com
source_urls:
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/FrontProjectors/Manuals/hom_man_XVZ30000.pdf
  - https://manualsdump.com/en/manuals/sharp-xv-z17000/132223/68
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/FrontProjectors/QuickGuide/hom_dow_XVZ30000.pdf
retrieved_at: 2026-04-30T12:09:21.380Z
last_checked_at: 2026-04-30T15:23:23.126Z
generated_at: 2026-04-30T15:23:23.126Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN authentication credentials not stated in source (web interface mentions user/password but no defaults)"
  - "no standalone settable parameters found beyond discrete commands"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "TCP keepalive/heartbeat interval not stated"
  - "maximum concurrent LAN sessions not specified"
  - "command timeout values not stated"
  - "firmware version compatibility not stated"
  - "error code enumeration beyond ERR not detailed"
  - "LAN encryption type (HTTP/HTTPS) not stated"
  - "DHCP can be enabled but specific procedure not documented"
  - "broadcast/discovery mechanism not documented"
  - "RS-232C connector pin 4/6 crossover note - source says depends on controlling device but doesn't specify which devices need it"
  - "network reboot/reset timing not documented"
  - "username/password default credentials not stated"
  - "whether telnet or raw TCP used for LAN control not specified"
  - "anamorphic mode values - source shows \"2.35:1\" but command param only shows 0/1/2 - ambiguity"
  - "picture mode \"User2\" uses two-digit param \"10\" - single char or two-char?"
  - "RGB frequency check returns ***.* format - format and precision not fully specified"
verification:
  verdict: verified
  checked_at: 2026-04-30T15:23:23.126Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched source commands; transport verified. (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Sharp Electronics XV-Z Series Control Spec

## Summary
Sharp XV-Z Series projector supports both RS-232C and TCP/IP control. Serial: 9600 baud, 8N1, no flow control. LAN: static IP 192.168.150.2 by default, DHCP off, TCP port 10002. Commands are 4-char mnemonics with 4-digit parameters, terminated by CR (0DH). Responses: OK or ERR.

<!-- UNRESOLVED: LAN authentication credentials not stated in source (web interface mentions user/password but no defaults) -->

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
  flow_control: none
addressing:
  port: 10002  # factory default TCP data port
auth:
  type: none  # inferred: no auth procedure in source for RS-232C; LAN uses web interface credentials (unspecified)
```

## Traits
```yaml
powerable: true  # inferred: POWR command present
routable: true   # inferred: input change commands (IRGB) present
queryable: true   # inferred: status query commands (? parameters) present
levelable: true   # inferred: picture adjustments (Contrast, Bright, etc.) present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_status
  label: Power Status
  kind: query
  params: []
- id: projector_condition
  label: Projector Condition
  kind: query
  params: []
- id: lamp_status
  label: Lamp Status
  kind: query
  params: []
- id: lamp_power_status
  label: Lamp Power Status
  kind: query
  params: []
- id: lamp_quantity
  label: Lamp Quantity
  kind: query
  params: []
- id: lamp_usage_time_hours
  label: Lamp Usage Time (Hours)
  kind: query
  params: []
- id: lamp_usage_time_minutes
  label: Lamp Usage Time (Minutes)
  kind: query
  params: []
- id: lamp_life_percentage
  label: Lamp Life (Percentage)
  kind: query
  params: []
- id: model_name_check_tnam
  label: Model Name Check (TNAM)
  kind: query
  params: []
- id: model_name_check_mnrd
  label: Model Name Check (MNRD)
  kind: query
  params: []
- id: projector_name_set1
  label: Projector Name Setting 1
  kind: action
  params:
    - name: value
      type: string
      description: First 4 characters
- id: projector_name_set2
  label: Projector Name Setting 2
  kind: action
  params:
    - name: value
      type: string
      description: Middle 4 characters
- id: projector_name_set3
  label: Projector Name Setting 3
  kind: action
  params:
    - name: value
      type: string
      description: Last 4 characters
- id: projector_name_check
  label: Projector Name Check
  kind: query
  params: []
- id: input_change_computer
  label: Input Change - COMPUTER
  kind: action
  params: []
- id: input_change_component
  label: Input Change - COMPONENT
  kind: action
  params: []
- id: input_change_hdmi1
  label: Input Change - HDMI1
  kind: action
  params: []
- id: input_change_hdmi2
  label: Input Change - HDMI2
  kind: action
  params: []
- id: input_rgb_check
  label: Input RGB Check
  kind: query
  params: []
- id: input_mode_check
  label: Input Mode Check
  kind: query
  params: []
- id: input_check
  label: Input Check
  kind: query
  params: []
- id: resize
  label: Resize
  kind: action
  params:
    - name: source
      type: enum
      values: [computer, component, hdmi1, hdmi2]
    - name: mode
      type: enum
      values: [normal, 16_9, native, cinema_zoom, zoom14_9, smart_zoom]
- id: all_reset
  label: All Reset
  kind: action
  params: []
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: source
      type: enum
      values: [computer, component, hdmi1, hdmi2]
    - name: mode
      type: enum
      values: [standard, movie1, movie2, monochrome, anime, sports, stage, dynamic, user1, user2, game]
- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: source
      type: enum
      values: [computer, component, hdmi1, hdmi2]
    - name: parameter
      type: enum
      values: [contrast, bright, color, tint, sharp, red_gain, green_gain, blue_gain, clr_temp]
    - name: value
      type: integer
      description: -30 to +30 (or -2 to +2 for CLR Temp)
- id: picture_reset
  label: Picture Reset
  kind: action
  params:
    - name: source
      type: enum
      values: [computer, component, hdmi1, hdmi2]
- id: rgb_frequency_check_h
  label: RGB Frequency Check (Horizontal)
  kind: query
  params: []
- id: rgb_frequency_check_v
  label: RGB Frequency Check (Vertical)
  kind: query
  params: []
- id: td_3d_on
  label: 3D On
  kind: action
  params: []
- id: td_3d_off
  label: 3D Off
  kind: action
  params: []
- id: td_3d_format
  label: 3D Format
  kind: action
  params:
    - name: format
      type: enum
      values: [auto, side_by_side, top_and_bottom]
- id: td_3d_invert
  label: 3D Invert
  kind: action
  params: []
- id: anamorphic
  label: Anamorphic
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, 2_35_1, 16_9]
- id: lens_focus
  label: Lens Focus
  kind: action
  params:
    - name: value
      type: integer
      description: -255 to 255
- id: lens_zoom
  label: Lens Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: -255 to +255
- id: lens_vertical_shift
  label: Lens Vertical Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -800 to +800
- id: lens_horizontal_shift
  label: Lens Horizontal Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -800 to +800
- id: lens_shift_center
  label: Lens Shift Center
  kind: action
  params: []
- id: memory_save
  label: Memory Save
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 or 2
- id: memory_load
  label: Memory Load
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 or 2
- id: memory_clear
  label: Memory Clear
  kind: action
  params:
    - name: slot
      type: integer
      description: 1 or 2
- id: memory_lock
  label: Memory Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
- id: reset_network
  label: Reset Network Setting
  kind: action
  params: []
- id: restart_network
  label: Restart Network
  kind: action
  params: []
- id: lamp_timer_reset
  label: Lamp Timer Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_response
  type: enum
  values: [OK, ERR]
- id: power_status_response
  type: enum
  values: ["1=on", "0=standby"]
- id: projector_condition_response
  type: flags
  values: ["0=normal", "1=temp_high", "2=fan_error", "4=lamp_cover_open", "8=lamp_life_5pct", "16=lamp_burnout", "32=lamp_ignition_failure", "64=temp_abnormally_high"]
- id: lamp_status_response
  type: enum
  values: ["0=off", "1=on", "2=retry", "3=waiting", "4=lamp_error"]
- id: lamp_power_status_response
  type: enum
  values: ["1=on", "2=cooling", "0=standby"]
- id: input_rgb_check_response
  type: enum
  values: ["1=COMPUTER", "2=COMPONENT", "3=HDMI1", "4=HDMI2", "ERR"]
- id: resize_response
  type: enum
  values: [OK, ERR]
- id: picture_adjust_response
  type: enum
  values: [OK, ERR]
- id: rgb_frequency_response
  type: string
  description: kHz or Hz value (***.*) or ERR
- id: lamp_timer_reset_response
  type: enum
  values: [OK, ERR]
  note: Only valid in standby mode
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found beyond discrete commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Lamp timer reset command (LPRE0001) only valid in standby mode
  - Lens shift commands may return ERR if lens cover not correctly attached
  - Wait at least 30 seconds after power on before sending commands
  - Allow processing time between commands to avoid ERR from command overlap
```

## Notes
- Command format: 4-char command + 4-digit parameter + CR (0DH). Example: `POWR___1` (power on)
- Underscore (_) in command string = space character
- Asterisk (*) in parameter column = variable range per Control Contents table
- Special polling commands (POWR????, TABN, TLPS, TPOW, TLPN, TLTT, TLTM, TLTL, TNAM, MNRD, PJN0) do not reset Auto Power Off or No Operation Off timers
- Factory default LAN settings: IP 192.168.150.2, DHCP off, subnet 255.255.255.0, gateway 0.0.0.0
- LAN data port factory default: 10002; configurable range 1025-65535
- LAN search port configurable range 1025-65535
- Web interface username/password max 8 characters; projector name max 12 characters
- Supported name characters: a-z, A-Z, 0-9, -, _, (,), space
- Auto logout range: 1-65535 minutes (0=disabled)
- RS-232C uses crossover cable; LAN uses crossover for direct PC connection, straight-through for hub connections
- If LAN comm fails, restart network via menu: Network > Restart Network
- Lamp timer reset only works in standby mode; successful reset returns OK
<!-- UNRESOLVED: TCP keepalive/heartbeat interval not stated -->
<!-- UNRESOLVED: maximum concurrent LAN sessions not specified -->
<!-- UNRESOLVED: command timeout values not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: error code enumeration beyond ERR not detailed -->
<!-- UNRESOLVED: LAN encryption type (HTTP/HTTPS) not stated -->
<!-- UNRESOLVED: DHCP can be enabled but specific procedure not documented -->
<!-- UNRESOLVED: broadcast/discovery mechanism not documented -->
<!-- UNRESOLVED: RS-232C connector pin 4/6 crossover note - source says depends on controlling device but doesn't specify which devices need it -->
<!-- UNRESOLVED: network reboot/reset timing not documented -->
<!-- UNRESOLVED: username/password default credentials not stated -->
<!-- UNRESOLVED: whether telnet or raw TCP used for LAN control not specified -->
<!-- UNRESOLVED: anamorphic mode values - source shows "2.35:1" but command param only shows 0/1/2 - ambiguity -->
<!-- UNRESOLVED: picture mode "User2" uses two-digit param "10" - single char or two-char? -->
<!-- UNRESOLVED: RGB frequency check returns ***.* format - format and precision not fully specified -->

## Provenance

```yaml
source_domains:
  - files.sharpusa.com
  - manualsdump.com
source_urls:
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/FrontProjectors/Manuals/hom_man_XVZ30000.pdf
  - https://manualsdump.com/en/manuals/sharp-xv-z17000/132223/68
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/FrontProjectors/QuickGuide/hom_dow_XVZ30000.pdf
retrieved_at: 2026-04-30T12:09:21.380Z
last_checked_at: 2026-04-30T15:23:23.126Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:23:23.126Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched source commands; transport verified. (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN authentication credentials not stated in source (web interface mentions user/password but no defaults)"
- "no standalone settable parameters found beyond discrete commands"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "TCP keepalive/heartbeat interval not stated"
- "maximum concurrent LAN sessions not specified"
- "command timeout values not stated"
- "firmware version compatibility not stated"
- "error code enumeration beyond ERR not detailed"
- "LAN encryption type (HTTP/HTTPS) not stated"
- "DHCP can be enabled but specific procedure not documented"
- "broadcast/discovery mechanism not documented"
- "RS-232C connector pin 4/6 crossover note - source says depends on controlling device but doesn't specify which devices need it"
- "network reboot/reset timing not documented"
- "username/password default credentials not stated"
- "whether telnet or raw TCP used for LAN control not specified"
- "anamorphic mode values - source shows \"2.35:1\" but command param only shows 0/1/2 - ambiguity"
- "picture mode \"User2\" uses two-digit param \"10\" - single char or two-char?"
- "RGB frequency check returns ***.* format - format and precision not fully specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
