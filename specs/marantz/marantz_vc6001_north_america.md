---
schema_version: ai4av-public-spec-v1
device_id: marantz/vc6001-north-america
entity_id: marantz_vc6001_north_america
spec_id: admin/marantz-vc6001-north-america
revision: 1
author: admin
title: "Marantz VC6001 (North America) Control Spec"
status: published
manufacturer: Marantz
manufacturer_key: marantz
model_family: "VC6001 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "VC6001 (North America)"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:48.374Z
retrieved_at: 2026-04-29T11:13:48.374Z
last_checked_at: 2026-04-23T08:13:13.662Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - SR
  - Z2CS
  - Z2CV
  - Z2HPF
  - Z2PS
  - Z2HDA
  - Z2SLP
  - Z2STBY
  - Z3CS
  - Z3CV
  - Z3HPF
  - Z3PS
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:13:13.662Z
  matched_actions: 77
  action_count: 77
  confidence: high
  summary: "All 77 spec actions matched literally to source; transport parameters fully verified; source contains additional device-specific commands not represented in spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz VC6001 (North America) Control Spec

## Summary
AV Surround Receiver supporting RS-232C and Ethernet (TCP/IP telnet) control. Full duplex ASCII command protocol with 2-character command codes and up to 25-character parameters terminated by CR (0x0D). Supports multi-zone power, volume, input routing, surround mode, video processing, tuner, and USB/iPod/Bluetooth playback control.
<!-- UNRESOLVED: IR control, front panel button behavior, device discovery protocols -->

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
  port: 23  # TCP port 23 (telnet) - stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # PWON/PWSTANDBY commands present
- queryable  # PW?, SI?, MV?, CV?, MU?, ZM?, etc. return responses
- routable   # SI, SD, DC, SV commands select input/output routing
- levelable  # MV, CV, PSBAS, PSTRE, and other level commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: PWON<CR>

- id: power_standby
  label: Power Standby
  kind: action
  params: []
  command: PWSTANDBY<CR>

- id: power_status
  label: Query Power Status
  kind: query
  params: []
  command: PW?<CR>

- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
  command: MVUP<CR>

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
  command: MVDOWN<CR>

- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "Volume level 00-98 (ASCII), 80=0dB, 00=--- (min). 3-char for 0.5dB steps."
  command: MV{level}<CR>

- id: master_volume_status
  label: Query Master Volume
  kind: query
  params: []
  command: MV?<CR>

- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: MUON<CR>

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: MUOFF<CR>

- id: mute_status
  label: Query Mute Status
  kind: query
  params: []
  command: MU?<CR>

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
  command: SI{source}<CR>

- id: input_status
  label: Query Input Source
  kind: query
  params: []
  command: SI?<CR>

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
  command: ZMON<CR>

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
  command: ZMOFF<CR>

- id: main_zone_status
  label: Query Main Zone Status
  kind: query
  params: []
  command: ZM?<CR>

- id: digital_input_select
  label: Select Digital Input
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
  command: SD{mode}<CR>

- id: digital_input_status
  label: Query Digital Input Status
  kind: query
  params: []
  command: SD?<CR>

- id: digital_input_format
  label: Set Digital Input Format
  kind: action
  params:
    - name: format
      type: string
      description: "AUTO, PCM, DTS"
  command: DC{format}<CR>

- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE, ON, OFF"
  command: SV{source}<CR>

- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "001-120 (ASCII), 010=10min, OFF to disable"
  command: SLP{minutes}<CR>

- id: sleep_timer_status
  label: Query Sleep Timer
  kind: query
  params: []
  command: SLP?<CR>

- id: auto_standby
  label: Set Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "15M, 30M, 60M, OFF"
  command: STBY{duration}<CR>

- id: auto_standby_status
  label: Query Auto Standby Status
  kind: query
  params: []
  command: STBY?<CR>

- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
  command: ECO{mode}<CR>

- id: eco_mode_status
  label: Query ECO Mode Status
  kind: query
  params: []
  command: ECO?<CR>

- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY, and many DTS/DOLBY/NEO variants"
  command: MS{mode}<CR>

- id: surround_mode_status
  label: Query Surround Mode
  kind: query
  params: []
  command: MS?<CR>

- id: channel_volume
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: direction
      type: string
      description: "UP, DOWN, or ** (set value 38-62 ASCII, 50=0dB)"
  command: CV{channel} {direction}<CR>

- id: channel_volume_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []
  command: CVZRL<CR>

- id: channel_volume_status
  label: Query Channel Volume Status
  kind: query
  params: []
  command: CV?<CR>

- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
  command: Z2ON<CR>

- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
  command: Z2OFF<CR>

- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or ** (value 00-98 ASCII, 80=0dB)"
  command: Z2{direction}<CR>

- id: zone2_mute
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
  command: Z2MU{state}<CR>

- id: zone2_select_input
  label: Zone2 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same as SI command sources"
  command: Z2{source}<CR>

- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
  command: Z3ON<CR>

- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
  command: Z3OFF<CR>

- id: zone3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or ** (value 00-98 ASCII, 80=0dB)"
  command: Z3{direction}<CR>

- id: zone3_mute
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
  command: Z3MU{state}<CR>

- id: zone3_select_input
  label: Zone3 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same as SI command sources"
  command: Z3{source}<CR>

- id: tuner_frequency
  label: Tuner Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: "ANUP, ANDOWN, or AN###### (6-digit frequency)"
  command: TF{direction}<CR>

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: direction
      type: string
      description: "ANUP, ANDOWN, AN## (preset 01-56), ANMEM, ANMEM##"
  command: TP{direction}<CR>

- id: tuner_band_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ANAM (AM), ANFM (FM), ANAUTO, ANMANUAL"
  command: TM{mode}<CR>

- id: hd_radio_channel
  label: HD Radio Channel
  kind: action
  params:
    - name: direction
      type: string
      description: "HDUP, HDDOWN, HD######MC* (freq + multicast channel)"
  command: TFHD{direction}<CR>

- id: hd_radio_preset
  label: HD Radio Preset
  kind: action
  params:
    - name: direction
      type: string
      description: "HDUP, HDDOWN, HD## (preset 01-56), HDMEM"
  command: TPHD{direction}<CR>

- id: hd_radio_status
  label: Query HD Radio Status
  kind: query
  params: []
  command: HD?<CR>

- id: netusb_control
  label: Net/USB/iPod/Bluetooth Control
  kind: action
  params:
    - name: command
      type: string
      description: "90 (up), 91 (down), 92 (left), 93 (right/enter/play), 94, 9A-9D, 9E (skip-), 9F (search+/-), 9G, 9H (repeat one), 9I (repeat all), 9J (repeat off), 9K (random on), 9M (random off), 9W (toggle), 9X (page next), 9Y (page prev), 9Z (search stop), RPT, RND, B## (preset call), C## (preset memory), H (preset name), FV MEM, NSA, NSE"
  command: NS{command}<CR>

- id: tone_control
  label: Tone Control
  kind: action
  params:
    - name: setting
      type: string
      description: "TONE CTRL ON/OFF, BAS UP/DOWN/##, TRE UP/DOWN/##, DIL ON/OFF/UP/DOWN/##"
  command: PS{setting}<CR>

- id: bass_sync
  label: Bass Sync
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or ** (value 00-99)"
  command: PSBSC{direction}<CR>

- id: delay_adjust
  label: Audio Delay Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN, or *** (000-999 ms)"
  command: PSDELAY{direction}<CR>

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
  command: PV{mode}<CR>

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: parameter
      type: string
      description: "CN UP/DOWN/###, BR UP/DOWN/###, ST UP/DOWN/###, HUE UP/DOWN/##, DNR OFF/LOW/MID/HI, ENH UP/DOWN/##"
  command: PV{parameter}<CR>

- id: hdmi_arc_setup
  label: HDMI ARC Setup
  kind: action
  params:
    - name: setting
      type: string
      description: "MONIAUTO, MONI1, MONI2, MONI?"
  command: VSMONI{setting}<CR>

- id: hdmi_output_resolution
  label: HDMI Output Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO, SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
  command: VSSC{resolution}<CR>

- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  params:
    - name: target
      type: string
      description: "AMP, TV"
  command: VSAUDIO {target}<CR>
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  command: PW?<CR>
  response_pattern: "PWON<CR>|PWSTANDBY<CR>"

- id: input_state
  label: Input Source State
  type: string
  command: SI?<CR>
  response_pattern: "SI.*<CR>"

- id: master_volume_state
  label: Master Volume State
  type: string
  command: MV?<CR>
  response_pattern: "MV\\d+<CR>"

- id: mute_state
  label: Mute State
  type: enum
  values: [on, off]
  command: MU?<CR>
  response_pattern: "MUON<CR>|MUOFF<CR>"

- id: channel_volume_state
  label: Channel Volume State
  type: string
  command: CV?<CR>
  response_pattern: "CV\\w+\\s+\\d+<CR>"

- id: main_zone_state
  label: Main Zone State
  type: enum
  values: [on, off]
  command: ZM?<CR>
  response_pattern: "ZMON<CR>|ZMOFF<CR>"

- id: digital_input_state
  label: Digital Input State
  type: string
  command: SD?<CR>
  response_pattern: "SD.*<CR>"

- id: surround_mode_state
  label: Surround Mode State
  type: string
  command: MS?<CR>
  response_pattern: "MS.*<CR>"

- id: zone2_state
  label: Zone2 State
  type: string
  command: Z2?<CR>
  response_pattern: "Z2.*<CR>"

- id: zone3_state
  label: Zone3 State
  type: string
  command: Z3?<CR>
  response_pattern: "Z3.*<CR>"

- id: hd_radio_state
  label: HD Radio State
  type: string
  command: HD?<CR>
  response_pattern: "HD.*<CR>"
```

## Variables
```yaml
# UNRESOLVED: many PS (parameter) commands act as settable variables but are documented
# as action-style commands. Full variable enumeration pending analysis of
# parameter ranges and response formats for all PS sub-commands.
```

## Events
```yaml
# The device sends EVENT messages when state changes occur without a controller request.
# Event form matches COMMAND form. Events sent within 5 seconds of state change.
# UNRESOLVED: complete event catalog not explicitly enumerated in source.
# Known events: power state changes, input source changes, surround mode changes,
# channel volume changes, mute state changes - all return as EVENT after direct device operation.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
# The document describes command timing requirements (50ms intervals, 1s after PWON)
# that may constitute implicit sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Send power on command (PWON) then wait 1 second before transmitting next command"
    reference: "Volume command note section, item J"
  - description: "Send commands at 50ms or more intervals"
    reference: "COMMAND section"
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing
# beyond timing notes above
```

## Notes
- Protocol is half-duplex on both RS-232 and Ethernet
- Maximum command/data length: 135 bytes
- ASCII range: 0x20–0x7F; CR (0x0D) used only as terminator
- Volume uses 0.5dB steps encoded as 2 or 3 ASCII characters
- Channel volume parameter range 38–62 ASCII for most channels (50=0dB), subwoofer 00,38–62
- Master volume range 00–98 ASCII (80=0dB, 00=--- minimum)
- EVENTS sent within 5 seconds of state change; RESPONSES sent within 200ms of request
- Command reception continues during EVENT transmission (non-blocking)
- When input source changes, channel volume and surround mode return as EVENT
- Channel volume does not re-return if already at same value before/after input change
- RESPONSE not needed for commands that already generate an EVENT (e.g., SV command)
- Some commands are model-specific (noted with asterisks in source)
- Auro-3D commands only available with Auro-3D upgrade
- HD Radio / HDRADIO / PANDORA / SIRIUSXM / SPOTIFY / LASTFM are North America model only
<!-- UNRESOLVED: complete list of model-specific command limitations -->
<!-- UNRESOLVED: Ethernet IP address configuration method not stated in source -->
<!-- UNRESOLVED: RS-232 cable wiring requirements beyond DB-9 pinout -->
<!-- UNRESOLVED: factory reset procedure not documented -->
<!-- UNRESOLVED: firmware update mechanism not documented -->

## Provenance

```yaml
source_urls:
  - https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
source_documents:
  - title: "Marantz public source"
    url: https://heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:48.374Z
retrieved_at: 2026-04-29T11:13:48.374Z
last_checked_at: 2026-04-23T08:13:13.662Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:13:13.662Z
matched_actions: 77
action_count: 77
confidence: high
summary: "All 77 spec actions matched literally to source; transport parameters fully verified; source contains additional device-specific commands not represented in spec."
```

## Known Gaps

```yaml
- SR
- Z2CS
- Z2CV
- Z2HPF
- Z2PS
- Z2HDA
- Z2SLP
- Z2STBY
- Z3CS
- Z3CV
- Z3HPF
- Z3PS
```
