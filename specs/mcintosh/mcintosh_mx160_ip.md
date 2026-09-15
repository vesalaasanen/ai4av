---
spec_id: admin/mcintosh-mx160
schema_version: ai4av-public-spec-v1
revision: 1
title: "McIntosh MX160 Control Spec"
manufacturer: McIntosh
model_family: MX160
aliases: []
compatible_with:
  manufacturers:
    - McIntosh
  models:
    - MX160
  firmware: "1.0.1-50 and above"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docdroid.net
  - scribd.com
source_urls:
  - https://www.docdroid.net/file/download/OnipkTW/mx160-serial-control-manual-v3-pdf.pdf
  - https://www.scribd.com/document/942837415/McIntosh-RS232ControlApplicationNote
retrieved_at: 2026-09-04T14:18:10.752Z
last_checked_at: 2026-09-12T22:17:36.329Z
generated_at: 2026-09-12T22:17:36.329Z
firmware_coverage: "1.0.1-50 and above"
protocol_coverage: []
known_gaps:
  - "fault behavior, error recovery, command timing, flow control, and authentication behavior are not stated in source."
  - "flow control not stated in source"
  - "source contains no safety warnings or interlock procedures."
  - "exact response formats are not documented for most queries. Volume, lip-sync, trim, source-offset, and source identifier ranges are not stated. Flow control, timeout behavior, retry procedure, and fault responses are not stated."
verification:
  verdict: verified
  checked_at: 2026-09-12T22:17:36.329Z
  matched_actions: 116
  action_count: 116
  confidence: medium
  summary: "All 116 spec actions match wire-literal commands in the McIntosh MX160 command list, transport values are documented verbatim, and no extra commands remain unrepresented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# McIntosh MX160 Control Spec

## Summary

McIntosh MX160 supports ASCII control through TCP/Telnet RS232-over-IP, conventional RS-232, and USB serial interfaces. This spec covers documented commands, queries, responses, transport settings, and initialization requirements.

<!-- UNRESOLVED: fault behavior, error recovery, command timing, flow control, and authentication behavior are not stated in source. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  host: "MX160.local"
  port: 84
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
framing:
  encoding: ASCII
  command_prefix: "!"
  command_terminator: "<CR>"
  response_terminator: "<CR>"
```

## Traits

```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions

```yaml
- id: audio_mode_previous
  label: Audio Processing Mode Down
  kind: action
  command: "!AUDMODE-"
  params: []

- id: audio_mode_query
  label: Audio Processing Mode Query
  kind: query
  command: "!AUDMODE?"
  params: []

- id: audio_mode_set
  label: Set Audio Processing Mode
  kind: action
  command: "!AUDMODE(x)"
  params:
    - name: x
      type: string
      description: Audio processing mode

- id: audio_mode_next
  label: Audio Processing Mode Up
  kind: action
  command: "!AUDMODE+"
  params: []

- id: audio_mode_list_query
  label: Audio Processing Mode List Query
  kind: query
  command: "!AUDMODEL?"
  params: []

- id: audio_type_query
  label: Input Audio Type Query
  kind: query
  command: "!AUDTYPE?"
  params: []

- id: back
  label: Back
  kind: action
  command: "!BACK"
  params: []

- id: device_name_query
  label: Device Name Query
  kind: query
  command: "!DEVICE?"
  params: []

- id: display_brightness_down
  label: Reduce Display Brightness
  kind: action
  command: "!DIM-"
  params: []

- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "!DIM?"
  params: []

- id: display_brightness_set
  label: Set Display Brightness
  kind: action
  command: "!DIM(x)"
  params:
    - name: x
      type: integer
      description: "Brightness setting: 0=100%, 1=75%, 2=50%, 3=25%"
      minimum: 0
      maximum: 3

- id: display_brightness_up
  label: Increase Display Brightness
  kind: action
  command: "!DIM+"
  params: []

- id: direction_down
  label: Direction Down
  kind: action
  command: "!DIRD"
  params: []

- id: direction_left
  label: Direction Left
  kind: action
  command: "!DIRL"
  params: []

- id: direction_right
  label: Direction Right
  kind: action
  command: "!DIRR"
  params: []

- id: direction_up
  label: Direction Up
  kind: action
  command: "!DIRU"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "!ENTER"
  params: []

- id: exit
  label: Exit
  kind: action
  command: "!EXIT"
  params: []

- id: info
  label: Info
  kind: action
  command: "!INFO"
  params: []

- id: active_interface_query
  label: Active Interface Query
  kind: query
  command: "!INTERFACE?"
  params: []

- id: lipsync_down
  label: Reduce Lip Sync
  kind: action
  command: "!LIPSYNC-"
  params: []

- id: lipsync_query
  label: Lip Sync Query
  kind: query
  command: "!LIPSYNC?"
  params: []

- id: lipsync_set
  label: Set Lip Sync
  kind: action
  command: "!LIPSYNC(x)"
  params:
    - name: x
      type: integer
      description: Lip sync value; valid range available through LIPSYNCRANGE query

- id: lipsync_up
  label: Increase Lip Sync
  kind: action
  command: "!LIPSYNC+"
  params: []

- id: lipsync_range_query
  label: Lip Sync Range Query
  kind: query
  command: "!LIPSYNCRANGE?"
  params: []

- id: loudness_query
  label: Loudness Status Query
  kind: query
  command: "!LOUDNESS?"
  params: []

- id: loudness_set
  label: Set Loudness
  kind: action
  command: "!LOUDNESS(x)"
  params:
    - name: x
      type: integer
      description: "Loudness status: 0 or 1"
      minimum: 0
      maximum: 1

- id: menu
  label: Menu
  kind: action
  command: "!MENU"
  params: []

- id: mute_toggle
  label: Toggle Mute
  kind: action
  command: "!MUTE"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "!MUTE?"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "!MUTEOFF"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "!MUTEON"
  params: []

- id: numeric_button
  label: Numeric Button
  kind: action
  command: "!NUM(x)"
  params:
    - name: x
      type: integer
      description: Numeric button
      minimum: 0
      maximum: 9

- id: ping_query
  label: Ping Query
  kind: query
  command: "!PING?"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "!POFF"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "!PON"
  params: []

- id: power_query
  label: Power Status Query
  kind: query
  command: "!POWER?"
  params: []

- id: power_off_main
  label: Main Power Off
  kind: action
  command: "!POWEROFFMAIN"
  params: []

- id: power_off_zone2
  label: Zone B Power Off
  kind: action
  command: "!POWEROFFZONE2"
  params: []

- id: power_on_main
  label: Main Power On
  kind: action
  command: "!POWERONMAIN"
  params: []

- id: power_on_zone2
  label: Zone B Power On
  kind: action
  command: "!POWERONZONE2"
  params: []

- id: power_zone2_query
  label: Zone B Power Status Query
  kind: query
  command: "!POWERZONE2?"
  params: []

- id: power_toggle
  label: Toggle Power
  kind: action
  command: "!PTOGGLE"
  params: []

- id: roomperfect_focus_previous
  label: Previous RoomPerfect Position
  kind: action
  command: "!RPFOC-"
  params: []

- id: roomperfect_focus_query
  label: RoomPerfect Position Query
  kind: query
  command: "!RPFOC?"
  params: []

- id: roomperfect_focus_set
  label: Set RoomPerfect Position
  kind: action
  command: "!RPFOC(x)"
  params:
    - name: x
      type: integer
      description: "0=bypass, 1-8=focus 1-8, 9=global"
      minimum: 0
      maximum: 9

- id: roomperfect_focus_next
  label: Next RoomPerfect Position
  kind: action
  command: "!RPFOC+"
  params: []

- id: roomperfect_focus_list_query
  label: Available RoomPerfect Positions Query
  kind: query
  command: "!RPFOCS?"
  params: []

- id: voicing_previous
  label: Previous Voicing
  kind: action
  command: "!RPVOI-"
  params: []

- id: voicing_query
  label: Active Voicing Query
  kind: query
  command: "!RPVOI?"
  params: []

- id: voicing_set
  label: Set Voicing
  kind: action
  command: "!RPVOI(x)"
  params:
    - name: x
      type: string
      description: Voicing identifier

- id: voicing_next
  label: Next Voicing
  kind: action
  command: "!RPVOI+"
  params: []

- id: voicing_list_query
  label: Available Voicings Query
  kind: query
  command: "!RPVOIS?"
  params: []

- id: setup
  label: Setup
  kind: action
  command: "!SETUP"
  params: []

- id: source_previous
  label: Previous Source
  kind: action
  command: "!SRC-"
  params: []

- id: source_query
  label: Active Source Query
  kind: query
  command: "!SRC?"
  params: []

- id: source_set
  label: Select Source
  kind: action
  command: "!SRC(x)"
  params:
    - name: x
      type: string
      description: Source identifier

- id: source_info_query
  label: Source Information Query
  kind: query
  command: "!SRC(x)?"
  params:
    - name: x
      type: string
      description: Source identifier

- id: source_next
  label: Next Source
  kind: action
  command: "!SRC+"
  params: []

- id: source_offset_down
  label: Decrease Source Volume Offset
  kind: action
  command: "!SRCOFF-"
  params: []

- id: source_offset_query
  label: Source Volume Offset Query
  kind: query
  command: "!SRCOFF?"
  params: []

- id: source_offset_set
  label: Set Source Volume Offset
  kind: action
  command: "!SRCOFF(x)"
  params:
    - name: x
      type: integer
      description: Source volume offset

- id: source_offset_up
  label: Increase Source Volume Offset
  kind: action
  command: "!SRCOFF+"
  params: []

- id: source_list_query
  label: Available Sources Query
  kind: query
  command: "!SRCS?"
  params: []

- id: software_info_query
  label: Software Information Query
  kind: query
  command: "!SWINFO?"
  params: []

- id: bass_trim_down
  label: Decrease Bass Trim
  kind: action
  command: "!TRIMBASS-"
  params: []

- id: bass_trim_query
  label: Bass Trim Query
  kind: query
  command: "!TRIMBASS?"
  params: []

- id: bass_trim_set
  label: Set Bass Trim
  kind: action
  command: "!TRIMBASS(x)"
  params:
    - name: x
      type: integer
      description: Bass trim; 10 units equal 1 dB

- id: bass_trim_up
  label: Increase Bass Trim
  kind: action
  command: "!TRIMBASS+"
  params: []

- id: center_trim_down
  label: Decrease Center Channel Trim
  kind: action
  command: "!TRIMCENTER-"
  params: []

- id: center_trim_query
  label: Center Channel Trim Query
  kind: query
  command: "!TRIMCENTER?"
  params: []

- id: center_trim_set
  label: Set Center Channel Trim
  kind: action
  command: "!TRIMCENTER(x)"
  params:
    - name: x
      type: integer
      description: Center channel trim; 10 units equal 1 dB

- id: center_trim_up
  label: Increase Center Channel Trim
  kind: action
  command: "!TRIMCENTER+"
  params: []

- id: height_trim_down
  label: Decrease Height Channel Trim
  kind: action
  command: "!TRIMHEIGHT-"
  params: []

- id: height_trim_query
  label: Height Channel Trim Query
  kind: query
  command: "!TRIMHEIGHT?"
  params: []

- id: height_trim_set
  label: Set Height Channel Trim
  kind: action
  command: "!TRIMHEIGHT(x)"
  params:
    - name: x
      type: integer
      description: Height channel trim; 10 units equal 1 dB

- id: height_trim_up
  label: Increase Height Channel Trim
  kind: action
  command: "!TRIMHEIGHT+"
  params: []

- id: lfe_trim_down
  label: Decrease LFE Channel Trim
  kind: action
  command: "!TRIMLFE-"
  params: []

- id: lfe_trim_query
  label: LFE Channel Trim Query
  kind: query
  command: "!TRIMLFE?"
  params: []

- id: lfe_trim_set
  label: Set LFE Channel Trim
  kind: action
  command: "!TRIMLFE(x)"
  params:
    - name: x
      type: integer
      description: LFE channel trim; 10 units equal 1 dB

- id: lfe_trim_up
  label: Increase LFE Channel Trim
  kind: action
  command: "!TRIMLFE+"
  params: []

- id: surround_trim_down
  label: Decrease Surround Channel Trim
  kind: action
  command: "!TRIMSURRS-"
  params: []

- id: surround_trim_query
  label: Surround Channel Trim Query
  kind: query
  command: "!TRIMSURRS?"
  params: []

- id: surround_trim_set
  label: Set Surround Channel Trim
  kind: action
  command: "!TRIMSURRS(x)"
  params:
    - name: x
      type: integer
      description: Surround channel trim; 10 units equal 1 dB

- id: surround_trim_up
  label: Increase Surround Channel Trim
  kind: action
  command: "!TRIMSURRS+"
  params: []

- id: treble_trim_down
  label: Decrease Treble Trim
  kind: action
  command: "!TRIMTREB-"
  params: []

- id: treble_trim_query
  label: Treble Trim Query
  kind: query
  command: "!TRIMTREB?"
  params: []

- id: treble_trim_set
  label: Set Treble Trim
  kind: action
  command: "!TRIMTREB(x)"
  params:
    - name: x
      type: integer
      description: Treble trim; 10 units equal 1 dB

- id: treble_trim_up
  label: Increase Treble Trim
  kind: action
  command: "!TRIMTREB+"
  params: []

- id: verbosity_set
  label: Set Verbosity Level
  kind: action
  command: "!VERB(x)"
  params:
    - name: x
      type: integer
      description: Verbosity level
      minimum: 0
      maximum: 2

- id: verbosity_query
  label: Verbosity Level Query
  kind: query
  command: "!VERB?"
  params: []

- id: volume_down
  label: Decrease Volume
  kind: action
  command: "!VOL-"
  params: []

- id: volume_down_by
  label: Decrease Volume by Amount
  kind: action
  command: "!VOL-(x)"
  params:
    - name: x
      type: integer
      description: Volume decrement

- id: volume_query
  label: Current Volume Query
  kind: query
  command: "!VOL?"
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  command: "!VOL(x)"
  params:
    - name: x
      type: integer
      description: Volume value

- id: volume_up
  label: Increase Volume
  kind: action
  command: "!VOL+"
  params: []

- id: volume_up_by
  label: Increase Volume by Amount
  kind: action
  command: "!VOL+(x)"
  params:
    - name: x
      type: integer
      description: Volume increment

- id: zone_mute_toggle
  label: Toggle Zone B Mute
  kind: action
  command: "!ZMUTE"
  params: []

- id: zone_mute_query
  label: Zone B Mute Query
  kind: query
  command: "!ZMUTE?"
  params: []

- id: zone_mute_off
  label: Zone B Mute Off
  kind: action
  command: "!ZMUTEOFF"
  params: []

- id: zone_mute_on
  label: Zone B Mute On
  kind: action
  command: "!ZMUTEON"
  params: []

- id: zone_power_off
  label: Zone B Power Off
  kind: action
  command: "!ZPOFF"
  params: []

- id: zone_power_on
  label: Zone B Power On
  kind: action
  command: "!ZPON"
  params: []

- id: zone_power_toggle
  label: Toggle Zone B Power
  kind: action
  command: "!ZPTOGGLE"
  params: []

- id: zone_source_previous
  label: Previous Zone B Source
  kind: action
  command: "!ZSRC-"
  params: []

- id: zone_source_query
  label: Current Zone B Source Query
  kind: query
  command: "!ZSRC?"
  params: []

- id: zone_source_set
  label: Set Zone B Source
  kind: action
  command: "!ZSRC(x)"
  params:
    - name: x
      type: string
      description: Zone B source identifier

- id: zone_source_info_query
  label: Zone B Source Information Query
  kind: query
  command: "!ZSRC(x)?"
  params:
    - name: x
      type: string
      description: Zone B source identifier

- id: zone_source_next
  label: Next Zone B Source
  kind: action
  command: "!ZSRC+"
  params: []

- id: zone_source_list_query
  label: Available Zone B Sources Query
  kind: query
  command: "!ZSRCS?"
  params: []

- id: zone_volume_down
  label: Decrease Zone B Volume
  kind: action
  command: "!ZVOL-"
  params: []

- id: zone_volume_down_by
  label: Decrease Zone B Volume by Amount
  kind: action
  command: "!ZVOL-(x)"
  params:
    - name: x
      type: integer
      description: Zone B volume decrement

- id: zone_volume_query
  label: Current Zone B Volume Query
  kind: query
  command: "!ZVOL?"
  params: []

- id: zone_volume_set
  label: Set Zone B Volume
  kind: action
  command: "!ZVOL(x)"
  params:
    - name: x
      type: integer
      description: Zone B volume value

- id: zone_volume_up
  label: Increase Zone B Volume
  kind: action
  command: "!ZVOL+"
  params: []

- id: zone_volume_up_by
  label: Increase Zone B Volume by Amount
  kind: action
  command: "!ZVOL+(x)"
  params:
    - name: x
      type: integer
      description: Zone B volume increment
```

## Feedbacks

```yaml
- id: audio_mode
  type: string
  query: "!AUDMODE?"

- id: available_audio_modes
  type: list
  query: "!AUDMODEL?"

- id: input_audio_type
  type: string
  query: "!AUDTYPE?"

- id: device_name
  type: string
  query: "!DEVICE?"
  example: "!DEVICE(MX160)"

- id: display_brightness
  type: enum
  query: "!DIM?"
  values:
    - 0
    - 1
    - 2
    - 3

- id: active_interface
  type: enum
  query: "!INTERFACE?"
  values:
    - IP
    - SERIAL
  examples:
    - "!INTERFACE(IP)"
    - "!INTERFACE(SERIAL)"

- id: lipsync
  type: integer
  query: "!LIPSYNC?"

- id: lipsync_range
  type: string
  query: "!LIPSYNCRANGE?"

- id: loudness
  type: enum
  query: "!LOUDNESS?"
  values:
    - 0
    - 1

- id: mute_state
  type: string
  query: "!MUTE?"

- id: ping_response
  type: string
  query: "!PING?"
  description: Returns pong

- id: power_state
  type: enum
  query: "!POWER?"
  values:
    - 0
    - 1

- id: zone_power_state
  type: enum
  query: "!POWERZONE2?"
  values:
    - 0
    - 1

- id: roomperfect_focus
  type: integer
  query: "!RPFOC?"
  values:
    - 0
    - 1
    - 2
    - 3
    - 4
    - 5
    - 6
    - 7
    - 8
    - 9

- id: available_roomperfect_positions
  type: list
  query: "!RPFOCS?"

- id: active_voicing
  type: string
  query: "!RPVOI?"

- id: available_voicings
  type: list
  query: "!RPVOIS?"

- id: active_source
  type: string
  query: "!SRC?"

- id: source_info
  type: string
  query: "!SRC(x)?"

- id: source_volume_offset
  type: integer
  query: "!SRCOFF?"

- id: available_sources
  type: list
  query: "!SRCS?"

- id: software_information
  type: list
  query: "!SWINFO?"

- id: bass_trim
  type: integer
  query: "!TRIMBASS?"

- id: center_channel_trim
  type: integer
  query: "!TRIMCENTER?"

- id: height_channel_trim
  type: integer
  query: "!TRIMHEIGHT?"

- id: lfe_channel_trim
  type: integer
  query: "!TRIMLFE?"

- id: surround_channel_trim
  type: integer
  query: "!TRIMSURRS?"

- id: treble_trim
  type: integer
  query: "!TRIMTREB?"

- id: verbosity_level
  type: integer
  query: "!VERB?"
  values:
    - 0
    - 1
    - 2

- id: volume
  type: integer
  query: "!VOL?"

- id: zone_mute_state
  type: string
  query: "!ZMUTE?"

- id: zone_source
  type: string
  query: "!ZSRC?"

- id: zone_source_info
  type: string
  query: "!ZSRC(x)?"

- id: available_zone_sources
  type: list
  query: "!ZSRCS?"

- id: zone_volume
  type: integer
  query: "!ZVOL?"
```

## Variables

```yaml
- id: audio_mode
  type: string
  set_command: "!AUDMODE(x)"

- id: display_brightness
  type: integer
  minimum: 0
  maximum: 3
  set_command: "!DIM(x)"

- id: lipsync
  type: integer
  set_command: "!LIPSYNC(x)"
  range_query: "!LIPSYNCRANGE?"

- id: loudness
  type: integer
  minimum: 0
  maximum: 1
  set_command: "!LOUDNESS(x)"

- id: roomperfect_focus
  type: integer
  minimum: 0
  maximum: 9
  set_command: "!RPFOC(x)"

- id: voicing
  type: string
  set_command: "!RPVOI(x)"

- id: source
  type: string
  set_command: "!SRC(x)"

- id: source_volume_offset
  type: integer
  set_command: "!SRCOFF(x)"

- id: bass_trim
  type: integer
  scale: "10 units = 1 dB"
  set_command: "!TRIMBASS(x)"

- id: center_channel_trim
  type: integer
  scale: "10 units = 1 dB"
  set_command: "!TRIMCENTER(x)"

- id: height_channel_trim
  type: integer
  scale: "10 units = 1 dB"
  set_command: "!TRIMHEIGHT(x)"

- id: lfe_channel_trim
  type: integer
  scale: "10 units = 1 dB"
  set_command: "!TRIMLFE(x)"

- id: surround_channel_trim
  type: integer
  scale: "10 units = 1 dB"
  set_command: "!TRIMSURRS(x)"

- id: treble_trim
  type: integer
  scale: "10 units = 1 dB"
  set_command: "!TRIMTREB(x)"

- id: verbosity_level
  type: integer
  minimum: 0
  maximum: 2
  set_command: "!VERB(x)"

- id: volume
  type: integer
  set_command: "!VOL(x)"

- id: zone_source
  type: string
  set_command: "!ZSRC(x)"

- id: zone_volume
  type: integer
  set_command: "!ZVOL(x)"
```

## Events

```yaml
- id: status_message
  prefix: "!"
  terminator: "<CR>"
  description: Status message emitted according to active verbosity level

- id: command_echo
  prefix: "#"
  terminator: "<CR>"
  description: Echo message emitted according to active verbosity level
```

## Macros

```yaml
- id: initialize_control
  label: Initialize Control Interface
  steps:
    - command: "!VERB(2)"
  description: Send whenever control system initializes and whenever unit turns on because setting is not retained through Standby.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes

Commands are case-sensitive, start with `!`, and end with carriage return. Backspace is unsupported. Status requests use `?` suffix. Responses begin with `!` for status or `#` for echo and end with carriage return.

For control while MX160 is in Standby, set `Setup / Power / Standby Mode / Network`; default Deep Sleep does not maintain network control. Conventional RS-232 uses pin 2 RX-In, pin 3 TX Out, and pin 5 GND; most installations require null modem wiring. USB serial is unavailable during Standby and therefore cannot turn unit back on.

Verbosity level 2 is recommended. Send `!VERB(2)` each time control system initializes and whenever unit turns on because verbosity setting is not retained through Standby.

<!-- UNRESOLVED: exact response formats are not documented for most queries. Volume, lip-sync, trim, source-offset, and source identifier ranges are not stated. Flow control, timeout behavior, retry procedure, and fault responses are not stated. -->

## Provenance

```yaml
source_domains:
  - docdroid.net
  - scribd.com
source_urls:
  - https://www.docdroid.net/file/download/OnipkTW/mx160-serial-control-manual-v3-pdf.pdf
  - https://www.scribd.com/document/942837415/McIntosh-RS232ControlApplicationNote
retrieved_at: 2026-09-04T14:18:10.752Z
last_checked_at: 2026-09-12T22:17:36.329Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:17:36.329Z
matched_actions: 116
action_count: 116
confidence: medium
summary: "All 116 spec actions match wire-literal commands in the McIntosh MX160 command list, transport values are documented verbatim, and no extra commands remain unrepresented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "fault behavior, error recovery, command timing, flow control, and authentication behavior are not stated in source."
- "flow control not stated in source"
- "source contains no safety warnings or interlock procedures."
- "exact response formats are not documented for most queries. Volume, lip-sync, trim, source-offset, and source identifier ranges are not stated. Flow control, timeout behavior, retry procedure, and fault responses are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
