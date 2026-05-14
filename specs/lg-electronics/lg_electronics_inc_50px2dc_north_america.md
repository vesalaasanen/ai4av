---
spec_id: admin/lg_electronics-50px2dc
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG Electronics 50PX2DC Control Spec"
manufacturer: "LG Electronics"
model_family: "50PX2DC (North America)"
aliases: []
compatible_with:
  manufacturers:
    - "LG Electronics"
  models:
    - "50PX2DC (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - proaudioinc.com
  - scribd.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.scribd.com/document/649294226/RS232-forLGTV
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-codes
retrieved_at: 2026-05-12T20:12:47.191Z
last_checked_at: 2026-05-14T05:46:57.954Z
generated_at: 2026-05-14T05:46:57.954Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T05:46:57.954Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched to source commands; transport parameters verified; bidirectional protocol coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# LG Electronics 50PX2DC Control Spec

## Summary
LG 50PX2DC is a plasma television supporting external control via RS-232C serial and wired/wireless IP (Telnet on port 9761). The source documents both interfaces with ASCII command protocols — 27 RS-232C commands and 23 IP control commands — covering power, picture, audio, tuning, input selection, 3D modes, and remote key emulation.

<!-- UNRESOLVED: USB-to-Serial converter PL2303 chip reference does not imply additional protocol capabilities -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # IP Control Telnet port - stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source for RS-232C or IP control
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
      values: [off, on]
  notes: "RS-232C: ka 00/01; IP: POWER off/on"
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [4by3, 16by9, zoom, zoom2, setbyoriginal, 14by9, justscan, fullwide, 21by9, cinema_zoom_1_to_16]
  notes: "RS-232C: kc; IP: ASPECT_RATIO [4by3/16by9/setbyoriginal/...]"
- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, on, video_mute_on]
  notes: "RS-232C: kd; IP: SCREEN_MUTE [screenmuteon/videomuteon/allmuteoff]"
- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: "RS-232C: ke 00/01; IP: VOLUME_MUTE [on/off]"
- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: kf 00-64; IP: VOLUME_CONTROL [0-100]"
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: kg; IP: PICTURE_CONTRAST [0-100]"
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: kh; IP: PICTURE_BRIGHTNESS [0-100]"
- id: colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: ki; IP: PICTURE_COLOUR [0-100]"
- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: kj; IP: PICTURE_TINT [0-100]"
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 32
  notes: "RS-232C: kk; IP: PICTURE_SHARPNESS [0-50]"
- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  notes: "RS-232C: kl; IP: OSD_SELECT [on/off]"
- id: remote_control_lock
  label: Remote Control Lock Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  notes: "RS-232C: km; IP: REMOTECONTROLER_LOCK [on/off]"
- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: kr"
- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: ks"
- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: kt; IP: AUDIO_BALANCE [0-100]"
- id: colour_temperature
  label: Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: xu; IP: PICTURE_COLOUR_TEMPERATURE [0-100]"
- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values: [orbiter, normal, colour_wash]
  notes: "RS-232C only (Plasma TV): jp 02/08/20"
- id: equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      min: 1
      max: 5
    - name: step
      type: integer
      min: 0
      max: 20
  notes: "RS-232C: jv [band][step]; IP: AUDIO_EQUALIZER [1-5] [0-20]"
- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screen_off]
  notes: "RS-232C: jq 00-05; IP: ENERGY_SAVING [screenoff/maximum/medium/minimum/off]"
- id: tune_command
  label: Tune Command
  kind: action
  params:
    - name: channel
      type: integer
    - name: mode
      type: enum
      values: [antenna, cable, sat]
  notes: "RS-232C: ma [data]; IP: CHANNEL_SETTING_ATSC_ATV [channel] antenna/cable"
- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [add, delete]
  notes: "RS-232C: mb; IP: CHANNEL_ADD_DELETE [add/delete]"
- id: key
  label: Key (Remote Key Emulation)
  kind: action
  params:
    - name: keycode
      type: string
  notes: "RS-232C: mc [keycode]; IP: KEY_ACTION [keyname]"
- id: backlight
  label: Backlight / Panel Light Control
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 64
  notes: "RS-232C: mg; IP: PICTURE_BACKLIGHT [0-100]"
- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, cadtv, satellite, isdbcs1, isdbcs2, atv, catv, av, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
  notes: "RS-232C: xb; IP: INPUT_SELECT [dtv/atv/cadtv/catv/avav1/component1/hdmi1/...]"
- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, on, 3dto2d, 2dto3d]
    - name: format
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: effect
      type: integer
      min: 0
      max: 20
  notes: "RS-232C: xt [d00][d01][d02][d03]; IP: PICTURE_3D [off/3dto2d/2dto3d on]"
- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
    - name: value
      type: integer
  notes: "RS-232C: xv [d00][d01]; IP: PICTURE_3D_EXTENSION [option] [value]"
- id: auto_configure
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      const: 1
  notes: "RS-232C: ju 01 (RGB/PC mode only); IP: autoconfig"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  notes: "Query: ka ff → returns 00 (off) or 01 (on)"
- id: ack_ok
  label: Acknowledgement OK
  type: string
  notes: "Returns [Command2][ ][SetID][ ][OK][Data][x]"
- id: ack_ng
  label: Acknowledgement NG
  type: string
  notes: "Returns [Command2][ ][SetID][ ][NG][Data][x]; Data 00 = Illegal Code"
```

## Variables
```yaml
# No standalone settable variables - all parameters are discrete actions.
# UNRESOLVED: additional status registers if any - not enumerated in source
```

## Events
```yaml
# No unsolicited notifications described in source.
# UNRESOLVED: whether device emits any asynchronous messages
```

## Macros
```yaml
# No explicit multi-step sequences described in source.
# UNRESOLVED: compound command sequences not documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - name: Remote Lock persistence
    description: "When remote control lock (km 01) is enabled and main power is cycled, lock is released after 20-30 seconds. During standby mode with lock enabled, TV will not turn on via IR or local key."
  - name: Media playback blocking
    description: "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and return NG."
  - name: RS-232C power constraint
    description: "With USB-to-Serial converter cable, power (ka) command only works when TV is already on."
# UNRESOLVED: voltage/power specifications, fault recovery sequences
```

## Notes
RS-232C uses crossed (reverse) cable. Set ID range 1–99 (decimal); 0x00–0x63 in transmission. Read mode: send FF for data. Protocol format: `[Command1][Command2][Space][SetID][Space][Data][Cr]`. IP control via Telnet on port 9761 (USA only) requires enabling 'IP Control Setup' menu via remote sequence (hold SETTINGS 5s, enter 828, set Network IP Control to On). WOL (Wake on LAN) supported via Mobile TV On setting.

<!-- UNRESOLVED: full list of key codes for IP control KEY_ACTION command — only selected examples in source -->
<!-- UNRESOLVED: USB-to-Serial PL2303 driver version compatibility -->
<!-- UNRESOLVED: wireless network control support details beyond wired ethernet -->

## Provenance

```yaml
source_domains:
  - proaudioinc.com
  - scribd.com
  - justaddpower.happyfox.com
source_urls:
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.scribd.com/document/649294226/RS232-forLGTV
  - https://justaddpower.happyfox.com/kb/article/36-lg-rs232-codes
retrieved_at: 2026-05-12T20:12:47.191Z
last_checked_at: 2026-05-14T05:46:57.954Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T05:46:57.954Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched to source commands; transport parameters verified; bidirectional protocol coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
