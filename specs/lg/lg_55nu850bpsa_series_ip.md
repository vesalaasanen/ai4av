---
spec_id: admin/lg-55nu850bpsa-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55NU850BPSA Series Control Spec"
manufacturer: LG
model_family: 55NU850BPSA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 55NU850BPSA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:04:53.296Z
generated_at: 2026-04-25T21:04:53.296Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:04:53.296Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched literally to source commands; transport parameters (port 9761, baud 9600) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55NU850BPSA Series Control Spec

## Summary
LG 55NU850BPSA Series consumer LED TV with both RS-232C serial and wired TCP/IP control interfaces. IP control operates via Telnet on port 9761 (USA only). Serial communication uses 9600 bps 8-N-1 ASCII protocol. Supports power, picture/audio adjustment, channel tuning, input routing, and 3D mode control.

<!-- UNRESOLVED: 3D features depend on model variant; not all NU850B models have 3D -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761  # TCP/IP Telnet port (USA models)
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
- powerable       # power on/off commands present
- routable        # input select command present
- queryable       # readback via FF data and ACK responses
- levelable       # volume, contrast, brightness, tint, sharpness, balance, treble, bass, backlight, color temperature
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
  transmission: "[Command1][Command2][ ][Set ID][ ][Data][Cr]"
  notes: "RS-232: ka command; IP: POWER on/off"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, wide, zoom, zoom2, original, just_scan, full_wide, cinema_zoom_1-16, 21:9]
  protocol: both
  notes: "IP accepts 4by3, 16by9, setbyoriginal"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, screen_on, video_on]
  protocol: both

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  protocol: both
  notes: "IP: VOLUME_MUTE on/off"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: picture_contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: picture_brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: picture_colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: picture_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64 Red-Green; IP range 0-100"

- id: picture_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: 0-50
  protocol: both
  notes: "RS-232 range 00-32; IP range 0-50"

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  protocol: both

- id: remote_control_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  protocol: both
  notes: "When locked, IR and local key cannot turn on TV"

- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: audio_treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: audio_bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: picture_colour_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "RS-232 range 00-64; IP range 0-100"

- id: audio_equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: 1-5
    - name: step
      type: integer
      range: 0-20
  protocol: both
  notes: "IP: AUDIO_EQUALIZER [band] [step]; Precondition: EQ must be enabled"

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screen_off]
  protocol: both
  notes: "IP accepts screenoff, maximum, medium, minimum, off"

- id: channel_tune
  label: Channel Tune
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: enum
      values: [antenna, cable, satellite, dtv_antenna, dtv_cable, dtv_antenna_nophy, dtv_cable_nophy]
  protocol: both
  notes: "Complex command with region-dependent data format; see source pp.9-10"

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [add, delete]
  protocol: both
  notes: "IP: CHANNEL_ADD_DELETE add/delete"

- id: key_action
  label: Key Action
  kind: action
  params:
    - name: key
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0-9]
  protocol: both
  notes: "Sends IR remote key code; IP: KEY_ACTION [keyname]"

- id: picture_backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: 0-100
  protocol: both
  notes: "IP: PICTURE_BACKLIGHT; Precondition: Energy Saving must be off"

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, cadtv, satellite, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4, atv, catv]
  protocol: both
  notes: "IP: INPUT_SELECT [source]; RS-232 xb command with hex values"

- id: picture_3d
  label: 3D Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off, 3dto2d, 2dto3d]
    - name: format
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: effect
      type: integer
      range: 0-20
  protocol: both
  notes: "Only for 3D models; IP: PICTURE_3D [mode] [format] [direction] [effect]"

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
    - name: value
      type: integer
      range: 0-20
  protocol: both
  notes: "Only for 3D models; IP: PICTURE_3D_EXTENSION [option] [value]"

- id: auto_configure
  label: Auto Configure
  kind: action
  params: []
  protocol: both
  notes: "Adjusts picture position; only works in RGB (PC) mode"

- id: ism_method
  label: ISM Method
  kind: action
  params:
    - name: mode
      type: enum
      values: [orbiter, normal, colour_wash]
  protocol: serial
  notes: "Only Plasma TV models; RS-232 j p command"
```

## Feedbacks
```yaml
- id: ack_response
  label: Acknowledgement
  kind: feedback
  type: enum
  values: [OK, NG]
  format: "[Command2][ ][Set ID][ ][OK/NG][Data][x]"
  notes: "OK returned on success, NG on failure or illegal code"

- id: power_status
  label: Power Status
  kind: feedback
  type: enum
  values: [off, on]
  protocol: both
  notes: "Query by sending FF data; RS-232: [k][a][ ][Set ID][ ][FF][Cr]"

- id: error_code
  label: Error Code
  kind: feedback
  type: enum
  values: [illegal_code]
  notes: "Data 00 indicates illegal code in NG response"
```

## Variables
```yaml
# UNRESOLVED: variables are queryable via FF data transmission but discrete
# parameter storage as named variables is not documented
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
  - id: remote_lock_interlock
    description: "When remote control lock (kc mm) is ON, TV cannot be turned on by IR remote or local panel key. Only external RS-232/IP command can control the TV."
  - id: media_playback_lock
    description: "During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and return NG."
  - id: auto_config_rgb_only
    description: "Auto Configure (ju) works only in RGB (PC) input mode."
  - id: 3d_precondition
    description: "3D Extension commands require PICTURE_3D to be active with appropriate format."
```

## Notes
- Serial communication uses crossed (reverse) cable; standard DE9 or phone-jack to RS-232 cable required
- Set ID range: 1-99 (decimal); Set ID 0 controls all connected TVs
- RS-232C communication parameters: 9600 bps, 8 data bits, no parity, 1 stop bit, ASCII code
- TCP/IP control via Telnet port 9761; no authentication required
- IP control is USA-only feature; requires enabling in IP Control Setup menu (password: 828)
- Power on via WOL (Wake on LAN) available when Mobile TV On is enabled
- During media playback/recording, only Power and Key commands are accepted
- 3D features are model-dependent (only 3D model variants support 3D commands)
- Energy Saving must be OFF for backlight control (mg) to function
- Equalizer control requires sound mode EQ to be enabled first
<!-- UNRESOLVED: exact port for RS-232 control not stated (device-dependent) -->
<!-- UNRESOLVED: wireless IP control availability not confirmed in source -->
<!-- UNRESOLVED: specific model variant (55NU850B vs 55NU850BPSA) control feature differences -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-25T21:04:53.296Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:04:53.296Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched literally to source commands; transport parameters (port 9761, baud 9600) verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
