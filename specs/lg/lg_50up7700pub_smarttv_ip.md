---
schema_version: ai4av-public-spec-v1
device_id: lg/50up7700pub
entity_id: lg_50up7700pub_smarttv
spec_id: admin/lg-50up7700pub-smarttv
revision: 1
author: admin
title: "LG 50UP7700PUB Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 50UP7700PUB
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50UP7700PUB
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_50up7700pub_smarttv_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T15:54:57.546Z
retrieved_at: 2026-04-26T15:54:57.546Z
last_checked_at: 2026-04-26T15:54:57.546Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T15:54:57.546Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions matched literally against source; all transport parameters verified verbatim in refined manual."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 50UP7700PUB Control Spec

## Summary
LG 50UP7700PUB is a smart TV supporting both RS-232C (serial) and IP control via Telnet (TCP port 9761). The document provides full command reference for both interfaces including power, picture, audio, channel tuning, input selection, and 3D controls.

<!-- UNRESOLVED: WiFi control not documented, only wired Ethernet -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761  # stated: telnet port for IP control
serial:
  baud_rate: 9600  # stated: "Baud rate : 9600 bps (UART)"
  data_bits: 8     # stated: "Data length : 8 bits"
  parity: none      # stated: "Parity : None"
  stop_bits: 1     # stated: "Stop bit : 1 bit"
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source for RS-232; IP control uses password "828" to enable (3-digit password), but no per-command auth
```

## Traits
```yaml
- powerable       # power on/off commands present (ka, POWER)
- routable         # input selection commands present (xb, INPUT_SELECT)
- queryable        # read mode with FF data returns current state
- levelable        # volume, contrast, brightness, etc. have 0-64/100 ranges
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
      description: "Power off (00) or on (01)"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [4by3, 16by9, setbyoriginal, justscan, zoom, zoom2, cinema_zoom_1-16]
      description: "Screen aspect ratio"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, screen_on, video_on]
      description: "Screen mute, video mute, or both off"

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
      min: 0
      max: 100
      description: "Volume level 0-100 (IP) or 0-64 (RS-232)"

- id: picture_contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Contrast 0-100 (IP) or 0-64 (RS-232)"

- id: picture_brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Brightness 0-100 (IP) or 0-64 (RS-232)"

- id: picture_colour
  label: Colour
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Colour 0-100 (IP) or 0-64 (RS-232)"

- id: picture_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Tint 0-100 (IP) or 0-64 (RS-232, red 00 to green 64)"

- id: picture_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 50
      description: "Sharpness 0-50 (IP) or 0-32 (RS-232)"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "On Screen Display on/off"

- id: remotecontrol_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "Lock/unlock remote and front panel controls"

- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Audio balance 0-100"

- id: picture_colour_temperature
  label: Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Colour temperature 0-100 (IP) or 0-64 (RS-232)"

- id: audio_equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      min: 1
      max: 5
      description: "Frequency band 1-5"
    - name: step
      type: integer
      min: 0
      max: 20
      description: "EQ step value 0-20"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screenoff]
      description: "Energy saving mode (IP naming); RS-232 uses 00-05"

- id: channel_setting_atsc_atv
  label: Channel Setting ATSC/ATV
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number"
    - name: source
      type: enum
      values: [antenna, cable]
      description: "Input source"

- id: channel_setting_atsc_dtv
  label: Channel Setting ATSC DTV
  kind: action
  params:
    - name: channel
      type: integer
      description: "Physical channel number (antenna/cable with physical)"
    - name: source
      type: enum
      values: [antennanotphy, cablenotphy]
      description: "Input source without physical mapping"

- id: channel_setting_atsc_dtv_major_minor
  label: Channel Setting ATSC DTV (Major/Minor)
  kind: action
  params:
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"
    - name: source
      type: enum
      values: [antennanotphy, cablenotphy]
      description: "Input source"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: action
      type: enum
      values: [add, delete]

- id: key_action
  label: Key Action
  kind: action
  params:
    - name: key
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]
      description: "Remote control key code"

- id: picture_backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Backlight level 0-100"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]
      description: "Main picture input source (IP naming); RS-232 uses hex values"

- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, 3dto2d, on]
      description: "3D mode control"
    - name: format
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
      description: "3D format (when mode is on)"
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
      description: "3D conversion direction"
    - name: effect
      type: integer
      min: 0
      max: 20
      description: "3D effect/depth level"

- id: picture_3d_extension
  label: 3D Extension
  kind: action
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
      description: "3D option type"
    - name: value
      type: integer
      description: "Option value (0/1 for on/off, 0-20 for depth/viewpoint, 0-5 for genre)"

- id: autoconfig
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      min: 1
      max: 1
      description: "Auto configure (value must be 01)"
- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Treble level 0-100 (IP) or hex 00-64 (RS-232)"

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "Bass level 0-100 (IP) or hex 00-64 (RS-232)"

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values: [orbiter, normal, colorwash]
      description: "ISM Method (Plasma TV only): Orbiter (02), Normal (08), Color Wash (20)"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  description: "Read with FF data; returns current power state"

- id: ack_response
  label: Acknowledgement
  type: enum
  values: [OK, NG]
  description: "ACK format: [Command2][Set ID][OK/NG][Data][x]; NG returns error code 00 (Illegal Code)"

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [on, off]
  description: "Read current mute state"

- id: volume_level
  label: Volume Level
  type: integer
  min: 0
  max: 100
  description: "Read current volume (IP: 0-100, RS-232: 0-64)"

- id: input_select_state
  label: Input Select State
  type: enum
  values: [dtv, atv, cadtv, catv, avav1, component1, hdmi1, hdmi2, hdmi3]
  description: "Current main picture input source"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters separate from actions identified in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Remote control lock (km): When locked and TV is in standby (power off by ka or mc command), TV will not turn on via IR or local key power button. Must unlock first."
  - "During media playback/recording: all commands except POWER (ka) and KEY (mc) are not executed and return NG."
# UNRESOLVED: no explicit safety warnings beyond lock behavior and playback restriction
```

## Notes
- IP control uses Telnet on port 9761 with 3-digit password "828" to enable (enter via Settings > IP Control Setup > Network IP Control = On).
- RS-232 protocol: `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D, space = 0x20.
- RS-232 Set ID range: 1-99 (decimal), transmitted as 0x00-0x63 (hex). Set ID 0 controls all TVs.
- IP commands are ASCII string format (e.g., `VOLUME_MUTE on`), RS-232 uses hex codes (e.g., `k e 00`).
- Some commands have different data ranges between IP (0-100) and RS-232 (0-64) interfaces.
- Backlight control requires Energy Saving to be set to Off first.
- Equalizer requires Sound Mode > Equalizer to be enabled first.
- Power command works via RS-232 even when TV is off; via USB-to-Serial only when TV is on.
<!-- UNRESOLVED: Wake-on-LAN documented but not command protocol specified -->
<!-- UNRESOLVED: WiFi control not documented, only wired Ethernet -->
<!-- UNRESOLVED: authentication token format not specified for IP control beyond password to enable -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_50up7700pub_smarttv_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T15:54:57.546Z
retrieved_at: 2026-04-26T15:54:57.546Z
last_checked_at: 2026-04-26T15:54:57.546Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T15:54:57.546Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions matched literally against source; all transport parameters verified verbatim in refined manual."
```

## Known Gaps

```yaml
[]
```
