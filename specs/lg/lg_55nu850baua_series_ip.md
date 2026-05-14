---
spec_id: admin/lg-55nu850baua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 55NU850BAUA Series Control Spec"
manufacturer: LG
model_family: "55NU850BAUA Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "55NU850BAUA Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T19:39:04.153Z
generated_at: 2026-04-26T19:39:04.153Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T19:39:04.153Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec actions matched source commands; transport verified; audio_treble and audio_bass added and confirmed in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG 55NU850BAUA Series Control Spec

## Summary
LG 55NU850BAUA Series 55-inch curved 4K UHD LED TV supporting both RS-232C serial and wired TCP/IP (Telnet) control. IP control operates on port 9761. The TV uses ASCII command strings with Set ID targeting (1–99 or broadcast 0) and returns OK/NG acknowledgements. During media playback or recording, all commands except Power and Key are rejected.

<!-- UNRESOLVED: 3D features not available on this non-3D model variant -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761  # UNRESOLVED: port number stated for IP control only; serial has no stated port
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source for serial; IP control uses 3-digit password (828) set via TV menu
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
  notes: RS-232: ka command works in both on/off states. USB-to-Serial: only works when TV is on.

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, wide, zoom, zoom2, set_by_program, just_scan, full_wide, cinema_zoom_1_to_16, 21by9]

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, on, video_mute]

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
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40

- id: picture_contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40

- id: picture_brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40

- id: picture_colour
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40

- id: picture_tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40 (red–green)

- id: picture_sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 50]
      description: IP control uses 0–50; serial uses 0x00–0x20

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]

- id: remotecontrol_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]
  notes: When main power is cycled, lock releases after 20–30 seconds. In standby with lock on, IR/local key power-on is blocked.

- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40

- id: picture_colour_temperature
  label: Colour Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40

- id: audio_equalizer
  label: Equalizer
  kind: action
  params:
    - name: band
      type: integer
      range: [1, 5]
      description: Frequency band number
    - name: step
      type: integer
      range: [0, 20]
      description: Step value
  notes: Precondition: Sound Mode set to EQ adjustable.

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screen_off]

- id: channel_tune
  label: Tune Command
  kind: action
  params:
    - name: channel_data
      type: array
      description: "Analog: [Data00, Data01, Data02] (high/low channel bytes + input source). Digital: [Data00, Data01, Data02, Data03, Data04, Data05] (major/minor + input source). Varies by region."
  notes: This command works differently depending on model and signal. Data structure differs significantly between analog/digital and regional variants (Europe/Mid-East/Asia vs. South Korea/North/Latin America vs. Japan).

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [delete, add]

- id: key_action
  label: Key
  kind: action
  params:
    - name: key
      type: string
      description: Key name from enumerated list
  notes: Sends IR remote key code. Supported keys include exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0–number9

- id: picture_backlight
  label: Backlight Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: IP control uses 0–100; serial uses 0x00–0x40
  notes: Precondition: Energy Saving must be off.

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, atv, cadtv, catv, av, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]
  notes: Function depends on model and signal. Serial uses hexadecimal data values.

- id: picture_3d
  label: 3D
  kind: action
  params:
    - name: mode
      type: enum
      values: [on, off, 3dto2d, 2dto3d]
    - name: pattern
      type: enum
      values: [topandbottom, sidebyside, checkboard, framesequential, columninterleaving, rowinterleaving]
    - name: direction
      type: enum
      values: [righttoleft, lefttoright]
    - name: effect
      type: integer
      range: [0, 20]
      description: 3D depth effect (0–20 for IP control; 0–20 for serial via 0x00–0x14)
  notes: Only for 3D models. During playback/recording, command is rejected.

- id: picture_3d_extension
  label: Extended 3D
  kind: action
  params:
    - name: option
      type: enum
      values: [picturecorrection, colorcorrection, sound, normal, depth, viewpoint, genre]
    - name: value
      type: mixed
      description: Varies by option — boolean (0/1), integer range, or enum (genre: 0–5)
  notes: Only for 3D models.

- id: autoconfig
  label: Auto Configure
  kind: action
  params:
    - name: action
      type: integer
      value: 1
      description: Must be 01
  notes: Adjusts picture position and minimizes image shaking. Works only in RGB (PC) mode. Only for 3D models.
- id: audio_treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "Serial uses 0x00-0x64; no IP control equivalent documented"
  notes: "RS-232C only (Command k r)."

- id: audio_bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "Serial uses 0x00-0x64; no IP control equivalent documented"
  notes: "RS-232C only (Command k s)."
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [off, on]
  query: Transmit FF data with power command
  notes: RS-232: queryable even in standby. USB-to-Serial: TV must be on to respond.

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [on, off]

- id: volume_level
  label: Volume Level
  type: integer
  range: [0, 100]
  query: Transmit FF data with volume command

- id: input_state
  label: Input State
  type: enum
  values: [dtv, atv, cadtv, catv, av, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]

- id: acknowledgement
  label: Acknowledgement
  type: object
  fields:
    - name: status
      type: enum
      values: [OK, NG]
    - name: data
      type: string
      description: Present status data if read mode; echo of PC data if write mode

- id: error_code
  label: Error Code
  type: enum
  values: [illegal_code]
  notes: Returned as NG with data 00 when illegal code received.

- id: channel_tune_response
  label: Tune Response
  type: object
  fields:
    - name: status
      type: enum
      values: [OK, NG]
    - name: data00
      type: string
      description: Physical channel number or don't-care
    - name: data01
      type: string
      description: High channel data (digital)
    - name: data02
      type: string
      description: Low channel data / Input source
    - name: data03
      type: string
      description: Major channel high byte (digital)
    - name: data04
      type: string
      description: Major channel low byte (digital)
    - name: data05
      type: string
      description: Minor/Branch channel data (digital)
```

## Variables
```yaml
# UNRESOLVED: variables are queryable via FF data but no explicit variable list in source.
# Settable parameters are all exposed as Actions with read capability via FF.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented. Device only responds to commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - When main power is off/on (plug-off/plug-in), external control lock releases after 20–30 seconds
  - In standby mode with key lock on, TV will not turn on via IR or local key power-on
  - All commands except Power (ka) and Key (mc) are rejected during media playback or recording
  - For USB-to-Serial: power command only works when TV is already on
  - IP control password (default: 828) can be changed via TV menu; set to Off when not in use
# UNRESOLVED: explicit interlock procedures for power-on sequencing not fully detailed
```

## Notes
The TV supports two control interfaces: RS-232C serial and TCP/IP (Telnet on port 9761). Serial uses hexadecimal command format `[Command1][Command2][ ][Set ID][ ][Data][Cr]` with ASCII encoding. IP control uses human-readable command strings (e.g., `VOLUME_MUTE on`, `POWER off`). Set ID range is 1–99 (decimal); broadcast ID is 0. During media playback or recording, all commands except Power and Key are rejected as NG.

Command ranges differ between interfaces: IP uses 0–100 (decimal) while serial uses 0x00–0x40 (hexadecimal) for most parameters. Query mode is activated by sending `FF` in place of data value.

The 3D commands (PICTURE_3D, PICTURE_3D_EXTENSION, AUTO_CONFIG) apply only to 3D model variants.

<!-- UNRESOLVED: TCP port number assumed stated as 9761 for IP control; no other port numbers stated -->
<!-- UNRESOLVED: serial flow control configuration not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: Events section — device sends no unsolicited notifications in documented protocol -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-04-26T19:39:04.153Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T19:39:04.153Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec actions matched source commands; transport verified; audio_treble and audio_bass added and confirmed in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
