---
spec_id: admin/lg-43qned82aua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 43QNED82AUA Series Control Spec"
manufacturer: LG
model_family: 43QNED82AUA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 43QNED82AUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manualslib.com
  - proaudioinc.com
source_urls:
  - https://www.manualslib.com/manual/4036602/Lg-82-Series.html
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-03T07:16:25.105Z
last_checked_at: 2026-06-03T07:16:25.105Z
generated_at: 2026-06-03T07:16:25.105Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "3D features not applicable to this non-3D model per spec naming"
  - "port only stated for IP control setup; confirm actual command port"
  - "variables not explicitly documented as queryable state beyond acknowledgement"
  - "no unsolicited event notifications documented for this device"
  - "no multi-step macro sequences documented"
  - "additional safety interlocks not specified"
  - "ISM Method (jp) documented for Plasma TV only; not applicable to this LED/LCD model"
  - "3D commands documented but this model may not support 3D; requires verification"
  - "exact TCP command port confirmation — source mentions 9761 in example but does not explicitly state this is the only port"
  - "Wake-on-LAN capability mentioned but not documented as a command interface"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:16:25.105Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "Complete cross-check passed (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# LG 43QNED82AUA Series Control Spec

## Summary
LG QNED82AUA series smart TV supporting both RS-232C serial and wired TCP/IP (Telnet) control interfaces. The TV provides extensive AV control capabilities including power, picture settings, audio adjustments, channel tuning, input routing, and 3D mode control. IP control uses port 9761 via Telnet; no authentication is required beyond entering setup mode on the TV.
<!-- UNRESOLVED: 3D features not applicable to this non-3D model per spec naming -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9761  # UNRESOLVED: port only stated for IP control setup; confirm actual command port
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no authentication required for either serial or TCP control
```

## Traits
```yaml
- powerable       # power on/off commands present (ka, POWER)
- levelable       # volume, brightness, contrast, tint, sharpness, backlight, balance, treble, bass controls present
- routable        # input select commands present (xb, INPUT_SELECT)
- queryable       # read mode with FF data returns current status
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
  notes: RS-232: "ka 00" off, "ka 01" on. IP: "POWER off", "POWER on"

- id: screen_mute
  label: Screen Mute
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, video_mute_on, screen_mute_on]

- id: volume_mute
  label: Volume Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
  notes: RS-232: "ke 00" on, "ke 01" off. IP: "VOLUME_MUTE on", "VOLUME_MUTE off"

- id: volume_control
  label: Volume Control
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  notes: IP uses 0-100; RS-232 uses 0-64

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: color
  label: Color/Colour
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: tint
  label: Tint
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]
  notes: RS-232 tint range 00 (Red) to 64 (Green)

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 32]

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values: [normal, wide, zoom, zoom2, set_by_program, 14_9, just_scan, full_wide, cinema_zoom_1_16, 21_9]
  notes: RS-232 uses hex codes; IP uses text values (4by3, 16by9, setbyoriginal)

- id: osd_select
  label: OSD Select
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]

- id: remote_lock
  label: Remote Control Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [off, on]

- id: balance
  label: Balance
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: treble
  label: Treble
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: bass
  label: Bass
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 64]

- id: energy_saving
  label: Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, minimum, medium, maximum, auto, screen_off]

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
  notes: IP command "AUDIO_EQUALIZER 1 to 5" band, "0 to 20" step

- id: backlight
  label: Backlight
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
  notes: IP uses 0-100; RS-232 uses 0-64

- id: channel_tune
  label: Channel Tune
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: enum
      values: [antenna, cable]
  notes: Complex multi-parameter command; see channel tuning docs for details

- id: channel_add_delete
  label: Channel Add/Delete
  kind: action
  params:
    - name: operation
      type: enum
      values: [add, delete]

- id: key_action
  label: Key Action
  kind: action
  params:
    - name: key
      type: enum
      values: [exit, channelup, channeldown, volumeup, volumedown, arrowright, arrowleft, volumemute, deviceinput, sleepreserve, livetv, previouschannel, favoritechannel, teletext, teletextoption, returnback, avmode, captionsubtitle, arrowup, arrowdown, myapp, settingmenu, ok, quickmenu, videomode, audiomode, channellist, bluebutton, yellowbutton, greenbutton, redbutton, aspectratio, audiodescription, programmorder, userguide, smarthome, simplelink, fastforward, rewind, programminfo, programguide, play, slowplay, soccerscreen, record, 3d, autoconfig, app, screenbright, number0, number1, number2, number3, number4, number5, number6, number7, number8, number9]

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [dtv, atv, cadtv, catv, av, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]

- id: autoconfig
  label: Auto Configure
  kind: action
  params: []
  notes: Works only in RGB (PC) mode; RS-232 data 01
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  notes: Query with FF data returns current state

- id: volume_mute_state
  label: Volume Mute State
  type: enum
  values: [on, off]

- id: input_state
  label: Input State
  type: enum
  values: [dtv, atv, cadtv, catv, av, av1, av2, component1, component2, rgb, hdmi1, hdmi2, hdmi3, hdmi4]

- id: acknowledgement
  label: Command Acknowledgement
  type: enum
  values: [OK, NG]
  notes: Device returns OK or NG after each command; NG may include error code
```

## Variables
```yaml
# UNRESOLVED: variables not explicitly documented as queryable state beyond acknowledgement
# The source indicates read mode (FF data) returns current status for most commands
# but does not enumerate persistent state variables separately from actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented for this device
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - When main power is off then on (plug-out/plug-in after 20-30 seconds), external control lock is released
  - In standby mode with key lock on, TV will not turn on via IR or local key power
  - During playing or recording media, all commands except Power (ka) and Key (mc) are not executed and treated as NG
  - IP control must be explicitly enabled in TV settings menu before use
# UNRESOLVED: additional safety interlocks not specified
```

## Notes
The RS-232C protocol uses ASCII text format with carriage return (0x0D) terminator. Set ID range is 1-99 (decimal) or 0x00-0x63 (hex); Set ID 0 broadcasts to all TVs. The TCP/IP interface uses raw Telnet on port 9761 — no username/password authentication is required beyond having IP control enabled on the TV.

IP control range for picture values differs from RS-232: IP uses 0-100 while RS-232 uses 0-64 for most parameters. The channel tune command (ma) has complex multi-region variations and supports both physical channel numbers and major/minor ATSC channel numbers.

<!-- UNRESOLVED: ISM Method (jp) documented for Plasma TV only; not applicable to this LED/LCD model -->
<!-- UNRESOLVED: 3D commands documented but this model may not support 3D; requires verification -->
<!-- UNRESOLVED: exact TCP command port confirmation — source mentions 9761 in example but does not explicitly state this is the only port -->
<!-- UNRESOLVED: Wake-on-LAN capability mentioned but not documented as a command interface -->

## Provenance

```yaml
source_domains:
  - manualslib.com
  - proaudioinc.com
source_urls:
  - https://www.manualslib.com/manual/4036602/Lg-82-Series.html
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
retrieved_at: 2026-06-03T07:16:25.105Z
last_checked_at: 2026-06-03T07:16:25.105Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:16:25.105Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "Complete cross-check passed (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "3D features not applicable to this non-3D model per spec naming"
- "port only stated for IP control setup; confirm actual command port"
- "variables not explicitly documented as queryable state beyond acknowledgement"
- "no unsolicited event notifications documented for this device"
- "no multi-step macro sequences documented"
- "additional safety interlocks not specified"
- "ISM Method (jp) documented for Plasma TV only; not applicable to this LED/LCD model"
- "3D commands documented but this model may not support 3D; requires verification"
- "exact TCP command port confirmation — source mentions 9761 in example but does not explicitly state this is the only port"
- "Wake-on-LAN capability mentioned but not documented as a command interface"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
