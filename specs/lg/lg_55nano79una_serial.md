---
spec_id: admin/lg-55nano79una
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55NANO79UNA Control Spec"
manufacturer: LG
model_family: 55NANO79UNA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55NANO79UNA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T15:57:04.462Z
generated_at: 2026-04-26T15:57:04.462Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T15:57:04.462Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched literal command codes in source; transport parameters verified; complete command catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55NANO79UNA Control Spec

## Summary
LG NanoCell LED TV supporting RS-232C serial control and wired/wireless IP control via Telnet. Serial communication uses 9600 baud, 8 data bits, no parity, 1 stop bit. IP control operates on port 9761. Both interfaces use ASCII command strings with SET ID addressing (range 1–99, or 0 for broadcast).

<!-- UNRESOLVED: RS-232C cable type (DE9 vs phone jack) varies by model series -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 9761  # IP control Telnet port; stated explicitly for US models
auth:
  type: none  # inferred: no auth procedure in source for RS-232C or IP control
```

## Traits
```yaml
- powerable       # power on/off commands present (ka, POWER)
- routable        # input/source select commands present (xb, INPUT_SELECT)
- queryable       # read mode supported (send FF to read status)
- levelable       # volume, contrast, brightness, etc.
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  command: "ka"
  note: "RS-232C: [k][a][ ][Set ID][ ][Data][Cr]; IP: POWER on|off"
  ack: "[a][ ][Set ID][ ][OK/NG][Data][x]"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [normal, wide, zoom, zoom2, set_by_program, 14_9, full_wide, just_scan, cinema_zoom_1_to_16, 21_9]
  command: "kc"
  note: "IP: ASPECT_RATIO 4by3|16by9|setbyoriginal"
  ack: "[c][ ][Set ID][ ][OK/NG][Data][x]"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, picture_off, video_off]
  command: "kd"
  note: "Data: 00=off, 01=picture off, 10=video off; IP: SCREEN_MUTE screenmuteon|videomuteon|allmuteoff"
  ack: null  # no acknowledgement documented

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  command: "ke"
  note: "IP: VOLUME_MUTE on|off"
  ack: "[e][ ][Set ID][ ][OK/NG][Data][x]"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "kf"
  note: "RS-232C range 00-64; IP range 0-100; IP: VOLUME_CONTROL [0 to 100]"
  ack: "[f][ ][Set ID][ ][OK/NG][Data][x]"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "kg"
  note: "RS-232C range 00-64; IP range 0-100; IP: PICTURE_CONTRAST"
  ack: "[g][ ][Set ID][ ][OK/NG][Data][x]"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "kh"
  note: "RS-232C range 00-64; IP range 0-100; IP: PICTURE_BRIGHTNESS"
  ack: "[h][ ][Set ID][ ][OK/NG][Data][x]"

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "ki"
  note: "RS-232C range 00-64; IP range 0-100; IP: PICTURE_COLOUR"
  ack: "[i][ ][Set ID][ ][OK/NG][Data][x]"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "kj"
  note: "RS-232C range 00 (Red) to 64 (Green); IP range 0-100; IP: PICTURE_TINT"
  ack: "[r][ ][Set ID][ ][OK/NG][Data][x]"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]
  command: "kk"
  note: "RS-232C range 00-32; IP range 0-50; IP: PICTURE_SHARPNESS"
  ack: "[k][ ][Set ID][ ][OK/NG][Data][x]"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  command: "kl"
  note: "IP: OSD_SELECT on|off"
  ack: "[l][ ][Set ID][ ][OK/NG][Data][x]"

- id: remote_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  command: "km"
  note: "Locks front panel and remote; IP: REMOTECONTROLER_LOCK on|off"
  ack: "[m][ ][Set ID][ ][OK/NG][Data][x]"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  command: "kr"
  note: "Range 00-64; IP range 0-100"
  ack: "[r][ ][Set ID][ ][OK/NG][Data][x]"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  command: "ks"
  note: "Range 00-64; IP range 0-100"
  ack: "[s][ ][Set ID][ ][OK/NG][Data][x]"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "kt"
  note: "IP range 0-100; Center is 50"
  ack: "[t][ ][Set ID][ ][OK/NG][Data][x]"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "xu"
  note: "IP: PICTURE_COLOUR_TEMPERATURE"
  ack: "[u][ ][Set ID][ ][OK/NG][Data][x]"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screen_off]
  command: "jq"
  note: "IP: ENERGY_SAVING off|minimum|medium|maximum|screenoff|auto"
  ack: "[q][ ][Set ID][ ][OK/NG][Data][x]"

- id: backlight
  label: Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  command: "mg"
  note: "IP: PICTURE_BACKLIGHT [0 to 100]; precondition: Energy Saving off"
  ack: "[g][ ][Set ID][ ][OK/NG][Data][x]"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4, isdb_bs]
  command: "xb"
  note: "IP: INPUT_SELECT dtv|atv|cadtv|catv|avav1|component1|hdmi1|hdmi2|hdmi3"
  ack: "[b][ ][Set ID][ ][OK/NG][Data][x]"

- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: string
  command: "mc"
  note: "Sends IR remote key code; IP: KEY_ACTION [keyname]"
  ack: "[c][ ][Set ID][ ][OK/NG][Data][x]"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [add, delete]
  command: "mb"
  note: "IP: CHANNEL_ADD_DELETE add|delete"
  ack: "[b][ ][Set ID][ ][OK/NG][Data][x]"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: enum
      values: [execute]
  command: "ju"
  note: "Only works in RGB (PC) mode"
  ack: "[u][ ][Set ID][ ][OK/NG][Data][x]"
- id: ism_method
  label: ISM Method
  kind: action
  command: "jp"
  params:
    - name: mode
      type: enum
      values: [orbiter, normal, color_wash]
  note: "Only Plasma TV; Data 02=Orbiter, 08=Normal, 20=Color(Colour) Wash"

- id: equalizer
  label: Equalizer
  kind: action
  command: "jv"
  params:
    - name: frequency_band
      type: integer
      range: [1, 5]
    - name: step
      type: integer
      range: [0, 20]
  note: "Single byte: bits 7:5 encode band (000=1st..100=5th), bits 4:0 encode step 0-20"

- id: tune_command
  label: Tune Command
  kind: action
  command: "ma"
  params:
    - name: channel_data
      type: string
      description: "Multi-byte region-dependent format; see source for region-specific byte layout"

- id: three_d
  label: 3D Mode
  kind: action
  command: "xt"
  params:
    - name: mode
      type: enum
      values: [on, off, 3d_to_2d, 2d_to_3d]
    - name: pattern
      type: enum
      values: [top_and_bottom, side_by_side, check_board, frame_sequential, column_interleaving, row_interleaving]
    - name: eye_order
      type: enum
      values: [right_to_left, left_to_right]
    - name: depth
      type: integer
      range: [0, 20]
  note: "Only 3D models"

- id: extended_3d
  label: Extended 3D
  kind: action
  command: "xv"
  params:
    - name: option
      type: enum
      values: [picture_correction, depth, viewpoint, color_correction, sound_zooming, normal_image_view, genre]
    - name: value
      type: string
      description: "Range depends on option selected; see source for per-option value ranges"
  note: "Only 3D models"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  query: "ka ff"
  note: "Read mode: [k][a][ ][Set ID][ ][FF][Cr]; returns [a][ ][Set ID][ ][OK][Data][x]"

- id: ack_response
  label: Acknowledgement Response
  type: enum
  values: [OK, NG]
  note: "All commands return ACK; NG includes error data (00=Illegal Code)"

- id: input_state
  label: Input State
  type: enum
  values: [dtv, cadtv, satellite_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4, isdb_bs]
  query: "xb ff"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented as separate variables;
# all parameters are action-based with direct command/response
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented;
# device only responds to commands (polling model)
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Remote control lock (km) blocks IR and local key power-on when in standby mode"
    source: "When main power is off & on (plug-off and plug-in, after 20-30 seconds), external control lock is released."
  - description: "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG"
    source: "Note: During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG."
# UNRESOLVED: power-on sequencing requirements not explicitly stated
```

## Notes
**RS-232C Protocol:** `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, Space = 0x20. Set ID 0 = broadcast (all TVs). Read mode by sending FF as data.

**IP Control (Telnet):** Port 9761. Connect via `telnet <IP> 9761`. Commands are ASCII strings (e.g., `VOLUME_MUTE on`). Exit with `quit`. Default password for IP Control Setup menu is 828. WOL (Wake on LAN) supported via mobile app when Mobile TV On is enabled.

**RS-232C vs USB-to-Serial:** With RS-232C cable, `ka` command works in power-on OR power-off status. With USB-to-Serial converter, `ka` only works when TV is already on.

**3D Commands:** Only apply to 3D models; function varies by model and signal.

**Channel Tuning:** Tune command (ma) uses different data formats for regions (Europe/Mid-East/Colombia/Asia vs South Korea/North/Latin America vs Japan). Two-byte channel data for digital channels.

<!-- UNRESOLVED: RS-232C cable connector type (DE9 vs phone jack) depends on model series -->
<!-- UNRESOLVED: flow control configuration not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: IP control authentication for network-connected scenarios not stated -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T15:57:04.462Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T15:57:04.462Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched literal command codes in source; transport parameters verified; complete command catalogue coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
