---
spec_id: admin/lg-55uk6550pub-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55UK6550PUB Series Control Spec"
manufacturer: LG
model_family: 55UK6550PUB
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55UK6550PUB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-04T06:05:47.874Z
generated_at: 2026-05-04T06:05:47.874Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T06:05:47.874Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "Every spec action maps 1-to-1 to a documented source command; all transport parameters verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55UK6550PUB Series Control Spec

## Summary
LG 55UK6550PUB is a 4K UHD smart TV supporting both RS-232C serial and wired IP control via Telnet. Serial uses 9600 baud 8N1 ASCII. IP control connects on port 9761. Supports power, volume, picture, channel, input routing, and 3D mode control.

<!-- UNRESOLVED: RS-232C physical connector pinout not fully specified; only wire color/function mapping provided -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761  # stated: telnet port for IP control
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source for IP control
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: "Power on (01) or off (00)"
  notes: RS-232C supports power control in any state; USB-serial only when TV is on.

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [01_normal, 02_wide, 04_zoom, 05_zoom2, 06_original, 07_14by9, 09_justscan, 0b_fullwide, 0c_21by9, 10_1f_cinemazoom]
      description: "Screen aspect ratio"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [00_off, 01_screen_mute, 10_video_mute]
      description: "Screen mute, video mute, or all mute off"

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Volume level (RS-232C scale 0-64, IP scale 0-100)"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Contrast level (RS-232C scale 0-64, IP scale 0-100)"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Brightness level (RS-232C scale 0-64, IP scale 0-100)"

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Color level (RS-232C scale 0-64, IP scale 0-100)"

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Tint level: 00=Red to 64=Green (RS-232C scale 0-64, IP scale 0-100)"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 32]
      description: "Sharpness level (RS-232C scale 0-32, IP scale 0-50)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: remote_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: When locked, front panel and IR remote are disabled. Released on power cycle (20-30s unplug).

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Treble level (RS-232C scale 0-64, IP scale 0-100)"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Bass level (RS-232C scale 0-64, IP scale 0-100)"

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Balance level (RS-232C scale 0-64, IP scale 0-100)"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Color temperature (RS-232C scale 0-64, IP scale 0-100)"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screenoff]
      description: "Energy saving mode"

- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: string
      description: "Channel number or major/minor for digital; format varies by region and signal type"
  notes: Complex multi-parameter command; see source for regional variants (Europe/Mid-East/Colombia/Asia, South Korea/North/Latin America, Japan)

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [add, delete]

- id: key
  label: Key
  kind: action
  params:
    - name: keycode
      type: string
      description: "IR remote key code from key code table (hex)"
  notes: Sends IR remote command; key codes defined in key code table

- id: backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
      description: "Backlight level (RS-232C scale 0-64, IP scale 0-100)"
  notes: IP control requires Energy Saving set to off

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, cadtv, satellite, av, av2, component1, component2, catv, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
      description: "Main picture input source"

- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, 3dto2d, on]
    - name: format
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: effect
      type: integer
      range: [0, 20]
  notes: Only 3D models; 3D must be on for extended 3D commands

- id: extended_3d
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
    - name: value
      type: integer
  notes: Only 3D models; precondition: PICTURE_3D on

- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: enum
      values: [start]
  notes: Adjusts picture position and minimizes shaking; works in RGB (PC) mode only

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
  notes: Precondition: sound mode set to EQ adjustable

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values: [02_orbiter, 08_normal, 20_colorwash]
  notes: Plasma TV only
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  query: Send command with no data (FF) to read current state

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [on, off]
  query: Supported

- id: aspect_ratio_state
  label: Aspect Ratio State
  type: enum
  values: [01_normal, 02_wide, 04_zoom, 05_zoom2, 06_original, 07_14by9, 09_justscan, 0b_fullwide, 0c_21by9, 10_1f_cinemazoom]
  query: Supported

- id: input_source_state
  label: Input Source State
  type: enum
  values: [00_dtv, 01_cadtv, 02_satellite, 03_isdbscs1, 04_isdbscs2, 10_atv, 11_catv, 20_av, 21_av2, 40_component1, 41_component2, 60_rgb, 90_hdmi1, 91_hdmi2, 92_hdmi3, 93_hdmi4]
  query: Supported

- id: ack_response
  label: ACK Response
  type: enum
  values: [OK, NG]
  description: "OK returned on success; NG on failure or illegal code"
```

## Variables
```yaml
# All picture and audio settings can be read by sending FF data
# Variables match Actions with level parameters
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
  - Remote control lock (km): When active, TV cannot be turned on via IR or front panel keys; only external serial/IP control works
  - Power cycle required to release remote lock (20-30 seconds after unplug)
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond remote lock behavior
```

## Notes
**Protocol differences:**
- RS-232C: ASCII text protocol, format `[Command1][Command2][ ][Set ID][ ][Data][Cr]`
- IP control: Telnet on port 9761; text commands like `VOLUME_MUTE on` followed by Enter
- Scale differences: RS-232C uses 0-64 scale for most parameters; IP control uses 0-100 (volume, contrast, brightness, etc.) or 0-50 (sharpness)

**Set ID:** Range 1-99; Set ID 0 broadcasts to all connected TVs. Set ID is decimal in menu, hexadecimal (0x00-0x63) in protocol.

**During media playback/recording:** All commands except Power (ka) and Key (mc) return NG.

**IP control setup:** Must enable in TV menu (Settings > Mobile TV On or dedicated IP Control Setup), requires password 828 on first access.

<!-- UNRESOLVED: USB-to-Serial converter chipset (PL2303) noted but not relevant to protocol -->
<!-- UNRESOLVED: Wake-on-LAN mentioned but no protocol details for WOL commands -->
<!-- UNRESOLVED: Wireless network control not documented -->
<!-- UNRESOLVED: RS-232C physical connector type (DE9 vs phone jack) varies by model within series -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-04T06:05:47.874Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T06:05:47.874Z
matched_actions: 27
action_count: 27
confidence: high
summary: "Every spec action maps 1-to-1 to a documented source command; all transport parameters verified verbatim in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
