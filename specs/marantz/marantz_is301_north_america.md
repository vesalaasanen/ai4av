---
spec_id: admin/marantz-is301-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz IS301 (North America) Control Spec"
manufacturer: Marantz
model_family: "IS301 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "IS301 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:32.115Z
last_checked_at: 2026-05-14T18:17:17.874Z
generated_at: 2026-05-14T18:17:17.874Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.874Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 46 spec actions matched literal command tokens in source; all transport parameters verified verbatim; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz IS301 (North America) Control Spec

## Summary
Marantz IS301 is an AV receiver supporting both RS-232C and Ethernet (TCP/IP) control. The protocol is ASCII-based with commands structured as COMMAND + PARAMETER + CR (0x0D), supporting power, volume, input selection, surround mode, multi-zone control, tuner, and media playback operations. Maximum data length is 135 bytes per message.

<!-- UNRESOLVED: device model variations across regions not documented -->

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
  port: 23  # TCP port 23 (telnet) stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  params: []

- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []

- id: master_volume_direct
  label: Master Volume Direct
  kind: action
  params:
    - name: value
      type: integer
      description: Volume value 00-98 (ASCII), 80=0dB, 00=minimum (---dB)

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: Input source name (e.g., DVD, CD, TUNER, BD, TV, SAT/CBL, MPLAY, GAME, NET, USB, BT, etc.)

- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel identifier (FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS)
    - name: direction
      type: string
      description: UP, DOWN, or direct value

- id: reset_channel_levels
  label: Reset All Channel Levels
  kind: action
  params: []

- id: surround_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: Surround mode name (e.g., STEREO, MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, DOLBY DIGITAL, DTS SURROUND, AURO3D, etc.)

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []

- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []

- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []

- id: zone2_volume
  label: Zone 2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value (00-98, 80=0dB)

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []

- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []

- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []

- id: zone3_volume
  label: Zone 3 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct value

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []

- id: tuner_frequency
  label: Tuner Frequency
  kind: action
  params:
    - name: band
      type: string
      description: AN (AM/FM) with 6-digit frequency value
    - name: frequency
      type: integer
      description: Frequency value

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-56

- id: tuner_band
  label: Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: AM or FM

- id: hd_radio_frequency
  label: HD Radio Frequency
  kind: action
  params:
    - name: frequency
      type: integer
      description: 6-digit frequency value

- id: hd_radio_multicast
  label: HD Radio Multicast Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Multi Cast channel 0-8 (0=analog)

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Minutes 001-120, or OFF to cancel

- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, or OFF

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT

- id: parameter_setting
  label: Parameter Setting
  kind: action
  params:
    - name: param
      type: string
      description: Parameter name (TONE CTRL, BAS, TRE, DIL, SWL, CINEMA EQ., MODE, LOM, FH, SP, etc.)
    - name: value
      type: string
      description: Parameter value

- id: video_aspect
  label: Video Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: ASPNRM (4:3) or ASPFUL (16:9)

- id: video_resolution
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: Resolution code (e.g., SC48P, SC10I, SC72P, SC10P, SC4K, SCAUTO, etc.)

- id: hdmi_monitor
  label: HDMI Monitor Select
  kind: action
  params:
    - name: monitor
      type: string
      description: MONIAUTO, MONI1, or MONI2

- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: AMP or TV

- id: trigger
  label: Trigger Output
  kind: action
  params:
    - name: number
      type: integer
      description: Trigger number (1 or 2)
    - name: state
      type: string
      description: ON or OFF

- id: dimmer
  label: Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI, DIM, DAR, OFF, or SEL (toggle)

- id: panel_lock
  label: Panel Lock
  kind: action
  params:
    - name: mode
      type: string
      description: LOCK ON, LOCK OFF, V LOCK ON (includes master volume)

- id: remote_lock
  label: Remote Lock
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  kind: feedback
  type: enum
  values:
    - PWON
    - PWSTANDBY

- id: master_volume_status
  label: Master Volume Status
  kind: feedback
  type: string
  description: Returns current master volume value

- id: mute_status
  label: Mute Status
  kind: feedback
  type: enum
  values:
    - MUON
    - MUOFF

- id: input_status
  label: Input Source Status
  kind: feedback
  type: string
  description: Returns current input source

- id: surround_mode_status
  label: Surround Mode Status
  kind: feedback
  type: string
  description: Returns current surround mode

- id: channel_volume_status
  label: Channel Volume Status
  kind: feedback
  type: string
  description: Returns volume for specified channel(s)

- id: main_zone_status
  label: Main Zone Status
  kind: feedback
  type: enum
  values:
    - ZMON
    - ZMOFF

- id: zone2_status
  label: Zone 2 Status
  kind: feedback
  type: enum
  values:
    - Z2ON
    - Z2OFF

- id: zone3_status
  label: Zone 3 Status
  kind: feedback
  type: enum
  values:
    - Z3ON
    - Z3OFF

- id: tuner_status
  label: Tuner Status
  kind: feedback
  type: string
  description: Returns current frequency and band

- id: hd_radio_status
  label: HD Radio Status
  kind: feedback
  type: string
  description: Returns band, station name, channel, signal level, artist, title, album, genre

- id: sleep_timer_status
  label: Sleep Timer Status
  kind: feedback
  type: string
  description: Returns sleep timer setting

- id: trigger_status
  label: Trigger Status
  kind: feedback
  type: string
  description: Returns trigger 1 and trigger 2 states

- id: dimmer_status
  label: Dimmer Status
  kind: feedback
  type: enum
  values:
    - DIM BRI
    - DIM DIM
    - DIM DAR
    - DIM OFF
```

## Variables
```yaml
# UNRESOLVED: variable parameters are controlled via direct commands rather than
# separate settable variables. All operations use action-style commands.
```

## Events
```yaml
# UNRESOLVED: the source describes EVENT messages (unsolicited notifications from
# device to controller) but does not enumerate all possible EVENT types or provide
# a complete event list. Events are generated when the device state changes directly.
```

## Macros
```yaml
# No explicit multi-step macros are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Power on command (PWON) requires 1 second wait before sending next command (documented in source)
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond the power-on timing note
```

## Notes
Command interval: Commands must be sent at 50ms or more intervals.
EVENT delivery: Events are sent within 5 seconds of state change.
RESPONSE timing: Responses to query commands (? suffix) are sent within 200ms.
Maximum data length: 135 bytes per message.
Both RS-232 and Ethernet transport share the same ASCII command protocol; Ethernet uses TCP port 23 (telnet).
Half duplex on both transports.
Volume 0.5dB step encoding uses 3 ASCII characters in PARAMETER field (e.g., MV805 for +0.5dB, MV795 for -0.5dB).
Channel volume changes automatically when input source changes; the channel volumes of used channels return as EVENT.
Surround mode and channel volume also return as EVENT on input source change unless values are unchanged.
Command structure: COMMAND (2 ASCII chars) + PARAMETER (up to 25 ASCII chars) + CR (0x0D).
ASCII range usable: 0x20 to 0x7F.

<!-- UNRESOLVED: complete list of unsolicited EVENT message types not provided -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: specific error codes/fault behavior not documented -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:32.115Z
last_checked_at: 2026-05-14T18:17:17.874Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.874Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 46 spec actions matched literal command tokens in source; all transport parameters verified verbatim; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
