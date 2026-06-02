---
spec_id: admin/lg_electronics-lg_display
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics LG Display Control Spec"
manufacturer: LG
model_family: "LG Display"
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - "LG Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - scribd.com
  - files.remotecentral.com
  - manua.ls
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.scribd.com/document/649294226/RS-232-forLGTV
  - https://files.remotecentral.com/library/22-1/lg/television/index.html
  - https://www.manua.ls/lg/uh5f/manual
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-codes
retrieved_at: 2026-05-12T20:27:29.643Z
last_checked_at: 2026-06-02T22:09:17.534Z
generated_at: 2026-06-02T22:09:17.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model numbers not listed in this generic companion manual. UNRESOLVED: firmware version compatibility not stated."
  - "flow control not stated"
  - "the protocol uses command/response pairs rather than independent state variables."
  - "no unsolicited event notifications documented. Device only responds to commands."
  - "no explicit safety warnings for voltage, current, or power specifications."
  - "no explicit interlock procedure for sequencing multiple displays."
  - "full list of specific LG Display model numbers this spec covers."
  - "TCP/IP control additional authentication requirements beyond 3-digit passcode."
  - "network protocol beyond Telnet (e.g., JSON-REST API) not documented."
  - "UDP control not mentioned in source."
  - "HTTP/REST control not mentioned in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:17.534Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# LG Electronics LG Display Control Spec

## Summary
Commercial LCD/LED display with both RS-232C serial and TCP/IP network control interfaces. Supports power, picture, audio, channel tuning, input routing, 3D modes, and backlight control via ASCII text-based command protocol. IP control uses Telnet on port 9761 with a 3-digit passcode (default 828). No password required for serial RS-232C control.

<!-- UNRESOLVED: specific model numbers not listed in this generic companion manual. UNRESOLVED: firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # stated: IP control Telnet port
serial:
  baud_rate: 9600  # stated
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: null  # UNRESOLVED: flow control not stated
auth:
  type: none  # inferred: no auth procedure in source for serial
  # IP control uses 3-digit passcode (default 828) entered via remote - not a password-based auth protocol
```

## Traits
```yaml
- powerable  # Power on/off commands present (ka / POWER)
- routable  # Input select commands present (xb / INPUT_SELECT)
- queryable  # Read mode via FF data returns current status
- levelable  # Volume, brightness, contrast, backlight, tint, sharpness, color, treble, bass, balance control present
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
  protocol: both
  notes: "Serial: 'ka' command; IP: 'POWER off' / 'POWER on'"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal_4x3, wide_16x9, zoom, zoom2, set_by_program, 14x9, just_scan, full_wide, 21x9, cinema_zoom_1_to_16]
  protocol: both
  notes: "Serial: 'kc'; IP: 'ASPECT_RATIO 4by3|16by9|setbyoriginal|...'"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, video_mute, screen_mute]
  protocol: both
  notes: "Serial: 'kd'; IP: 'SCREEN_MUTE screenmuteon|videomuteon|allmuteoff'"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  protocol: both
  notes: "Serial: 'ke'; IP: 'VOLUME_MUTE on|off'"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'kf' 0-64; IP: 'VOLUME_CONTROL 0 to 100'"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'kg' 0-64; IP: 'PICTURE_CONTRAST 0 to 100'"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'kh' 0-64; IP: 'PICTURE_BRIGHTNESS 0 to 100'"

- id: color_colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'ki' 0-64; IP: 'PICTURE_COLOUR 0 to 100'"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "00=Red, 64=Green"
  protocol: both
  notes: "Serial: 'kj' 0-64; IP: 'PICTURE_TINT 0 to 100'"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 32]
  protocol: both
  notes: "Serial: 'kk' 0-32; IP: 'PICTURE_SHARPNESS 0 to 50'"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  protocol: both
  notes: "Serial: 'kl'; IP: 'OSD_SELECT on|off'"

- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  protocol: both
  notes: "Serial: 'km'; IP: 'REMOTECONTROLER_LOCK on|off'"

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'kr'; IP: via AUDIO_EQUALIZER"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'ks'"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'kt' 0-64; IP: 'AUDIO_BALANCE 0 to 100'"

- id: colour_temperature
  label: Color/Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'xu' 0-64; IP: 'PICTURE_COLOUR_TEMPERATURE 0 to 100'"

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values: [orbiter, normal, colour_wash]
  protocol: serial
  notes: "Serial: 'jp'; Plasma TV only"

- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: [1, 5]
    - name: step
      type: integer
      range: [0, 20]
  protocol: both
  notes: "Serial: 'jv' (bitmask format); IP: 'AUDIO_EQUALIZER 1 to 5 0 to 20'"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screen_off]
  protocol: both
  notes: "Serial: 'jq' 00-05; IP: 'ENERGY_SAVING off|minimum|medium|maximum|screenoff'"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: integer
    - name: input_source
      type: enum
      values: [atv, catv, dtv, cadtv, sat_dtv]
    - name: major
      type: integer
      required: false
    - name: minor
      type: integer
      required: false
  protocol: both
  notes: "Serial: 'ma' (complex multi-byte); IP: 'CHANNEL_SETTING_ATSC_ATV|DTV ...'"
  notes: "Region-specific variants for South Korea, North/Latin America, Europe, Mid-East, Asia, Japan"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [add, delete_skip]
  protocol: both
  notes: "Serial: 'mb'; IP: 'CHANNEL_ADD_DELETE add|delete'"

- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: string
      description: Hex key code from key code table (e.g. 08 for Power, 0B for Input)
  protocol: both
  notes: "Serial: 'mc'; IP: 'KEY_ACTION ...'"

- id: control_backlight
  label: Control Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  protocol: both
  notes: "Serial: 'mg' (LCD/LED: backlight, Plasma: panel light); IP: 'PICTURE_BACKLIGHT 0 to 100'"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, cadtv, sat_dtv, isdb_cs1, isdb_cs2, atv, catv, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
  protocol: both
  notes: "Serial: 'xb' with hex data; IP: 'INPUT_SELECT dtv|atv|cadtv|catv|avav1|component1|hdmi1|...'"

- id: picture_3d
  label: 3D
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, on, 3dto2d, 2dto3d]
    - name: format
      type: enum
      required: false
      values: [top_and_bottom, side_by_side, check_board, frame_sequential, column_interleaving, row_interleaving]
    - name: direction
      type: enum
      required: false
      values: [right_to_left, left_to_right]
    - name: effect
      type: integer
      required: false
      range: [0, 20]
  protocol: both
  notes: "Serial: 'xt'; IP: 'PICTURE_3D ...' 3D models only"

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
    - name: value
      type: integer
  protocol: both
  notes: "Serial: 'xv'; IP: 'PICTURE_3D_EXTENSION ...' 3D models only"

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: enum
      values: [execute]
  protocol: both
  notes: "Serial: 'ju' data 01; IP: via KEY_ACTION autoconfig; RGB mode only"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  protocol: both
  notes: "Read mode: send FF data, returns current power state. ACK: [a][Set ID][OK][Data][x]"

- id: acknowledgement
  type: enum
  values: [OK, NG]
  protocol: both
  notes: "All commands return OK or NG acknowledgement. NG data 00 = illegal code."
  notes: "OK format: [Command2][Set ID][OK][Data][x]; NG format: [Command2][Set ID][NG][Data][x]"

- id: input_lock_state
  type: enum
  values: [unlocked, locked]
  notes: "Returned after remote lock commands"
```

## Variables
```yaml
# UNRESOLVED: the protocol uses command/response pairs rather than independent state variables.
# All queries are inline read-mode operations using FF data payload.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented. Device only responds to commands.
```

## Macros
```yaml
# No explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for:
  - remote_control_lock: "When main power is off & on (plug-off/plug-in, after 20-30 seconds), external control lock is released."
interlocks:
  - key_lock_power_interlock: "In standby mode (DC off by off timer or 'ka'/'mc' command), if key lock is on, TV will not turn on by power on key of IR & Local Key."
  - media_lock_interlock: "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG."
  - auto_config_rgb_only: "Auto Configure works only in RGB (PC) mode."
  - backlight_precondition: "PICTURE_BACKLIGHT requires Energy Saving to be set to off (IP control)."
  - equalizer_precondition: "AUDIO_EQUALIZER requires sound mode set to Equalizer on (IP control)."
# UNRESOLVED: no explicit safety warnings for voltage, current, or power specifications.
# UNRESOLVED: no explicit interlock procedure for sequencing multiple displays.
```

## Notes
- RS-232C uses crossed (reverse) cable. Two wiring variants documented (pages 3-4, lines 77-85).
- USB to Serial converter must use PL2303 chip (VID 0x0557, PID 0x2008).
- Serial Set ID range: 1-99 (decimal), transmitted as 0x00-0x63 (hexadecimal). Set ID 0 = broadcast (all sets).
- Serial protocol: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` — space separators as ASCII 0x20.
- IP control uses Telnet on port 9761; 3-digit passcode entered via remote (default 828).
- IP control passcode change requires on-screen menu navigation (Settings > Network > IP Control Setup).
- Wake-on-LAN supported via mobile app after enabling 'Mobile TV On'.
- Volume range differs between serial (0-64) and IP (0-100) control.
- Sharpness range differs between serial (0-32) and IP (0-50) control.
- Tint ACK response uses wrong command byte 'r' instead of 'j' in source document (line 304) — likely typo.
- 3D commands only available on 3D model variants.
- ISM Method only available on Plasma TV variants.
<!-- UNRESOLVED: full list of specific LG Display model numbers this spec covers. -->
<!-- UNRESOLVED: TCP/IP control additional authentication requirements beyond 3-digit passcode. -->
<!-- UNRESOLVED: network protocol beyond Telnet (e.g., JSON-REST API) not documented. -->
<!-- UNRESOLVED: UDP control not mentioned in source. -->
<!-- UNRESOLVED: HTTP/REST control not mentioned in source. -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - scribd.com
  - files.remotecentral.com
  - manua.ls
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.scribd.com/document/649294226/RS-232-forLGTV
  - https://files.remotecentral.com/library/22-1/lg/television/index.html
  - https://www.manua.ls/lg/uh5f/manual
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-codes
retrieved_at: 2026-05-12T20:27:29.643Z
last_checked_at: 2026-06-02T22:09:17.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:17.534Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model numbers not listed in this generic companion manual. UNRESOLVED: firmware version compatibility not stated."
- "flow control not stated"
- "the protocol uses command/response pairs rather than independent state variables."
- "no unsolicited event notifications documented. Device only responds to commands."
- "no explicit safety warnings for voltage, current, or power specifications."
- "no explicit interlock procedure for sequencing multiple displays."
- "full list of specific LG Display model numbers this spec covers."
- "TCP/IP control additional authentication requirements beyond 3-digit passcode."
- "network protocol beyond Telnet (e.g., JSON-REST API) not documented."
- "UDP control not mentioned in source."
- "HTTP/REST control not mentioned in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
