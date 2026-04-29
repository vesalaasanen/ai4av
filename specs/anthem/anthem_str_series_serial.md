---
schema_version: ai4av-public-spec-v1
device_id: anthem/str-preamplifier
entity_id: anthem_str_series
spec_id: admin/anthem-str-series
revision: 1
author: admin
title: "Anthem STR Series Control Spec"
status: published
manufacturer: Anthem
manufacturer_key: anthem
model_family: "STR Preamplifier"
aliases: []
compatible_with:
  manufacturers:
    - Anthem
  models:
    - "STR Preamplifier"
    - "STR Integrated Amplifier"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: anthem_str_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-22T19:42:09.572Z
retrieved_at: 2026-04-22T19:42:09.572Z
last_checked_at: 2026-04-22T19:42:09.572Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-22T19:42:09.572Z
  matched_actions: 41
  action_count: 41
  confidence: high
  summary: "Every spec action matched literally in source; all transport parameters verified; spec fully represents command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Anthem STR Series Control Spec

## Summary
Anthem STR Series preamplifier and integrated amplifier supports both RS-232C and TCP/IP control interfaces. All serial commands are also valid over the TCP/IP socket. Command separator is semicolon (`;`). Average command processing latency under 30 ms; individual commands max 100 ms. Maximum command length 256 bytes; maximum response 258 bytes.

<!-- UNRESOLVED: IP port number not stated in source — configured via setup menu -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  # port: null  # UNRESOLVED: IP port configured via setup menu, not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # ZxPOWy commands present
- routable       # ZxINPyy input selection present
- queryable      # IDQ?, IDM?, IDS?, ZxVOL?, ZxMUT?, etc.
- levelable      # ZxVOL, ZxVUP, ZxVDN, Z1BAL, Z1LEV, Z1TON commands present
```

## Actions
```yaml
- id: query_info
  label: Query Device Info
  kind: query
  params:
    - name: command
      type: enum
      values: [IDQ, IDM, IDS, IDB, IDH, IDN]
      description: IDQ=model+fw+date, IDM=model, IDS=version, IDB=build date, IDH=hardware, IDN=MAC

- id: set_front_panel_brightness
  label: Set Front Panel Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: 0=off, 1=low, 2=medium, 3=high, 4=max, n=cycle

- id: set_speaker_profile
  label: Set Speaker Profile
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (00-ZZ, 00=current)
    - name: profile
      type: integer
      description: Profile number (1-4)

- id: query_speaker_profile_name
  label: Query Speaker Profile Name
  kind: query
  params:
    - name: profile
      type: integer
      description: Profile number (1-4)

- id: power
  label: Power
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone: 0=all, 1=main, 2=zone2, 3=zone3
    - name: state
      type: integer
      description: 0=off, 1=on
  note: In ECO standby mode, send power-on command twice

- id: query_power
  label: Query Power State
  kind: query
  params:
    - name: zone
      type: integer

- id: query_input_count
  label: Query Input Count
  kind: query
  params: []

- id: query_input_name
  label: Query Input Name
  kind: query
  params:
    - name: input
      type: integer
      description: Input number (01-ZZ)

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: zone
      type: integer
    - name: input
      type: integer
      description: Input number (01-ZZ)

- id: query_input
  label: Query Input Selection
  kind: query
  params:
    - name: zone
      type: integer

- id: volume_up
  label: Volume Up
  kind: action
  params:
    - name: zone
      type: integer
    - name: step
      type: number
      description: dB step 0.0 to 10.0

- id: volume_down
  label: Volume Down
  kind: action
  params:
    - name: zone
      type: integer
    - name: step
      type: number
      description: dB step 0.0 to 10.0

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: number
      description: Volume in dB (signed)

- id: query_volume
  label: Query Volume
  kind: query
  params:
    - name: zone
      type: integer

- id: mute
  label: Mute
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: 0=unmute, 1=mute, t=toggle

- id: query_mute
  label: Query Mute State
  kind: query
  params:
    - name: zone
      type: integer

- id: set_arc
  label: Set ARC
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: 0=off, 1=on

- id: query_arc
  label: Query ARC State
  kind: query
  params:
    - name: zone
      type: integer

- id: balance_left
  label: Balance Left
  kind: action
  params:
    - name: percent
      type: integer
      description: 0-100

- id: balance_right
  label: Balance Right
  kind: action
  params:
    - name: percent
      type: integer
      description: 0-100

- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: percent
      type: integer
      description: 0=left, 50=center, 100=right

- id: query_balance
  label: Query Balance
  kind: query
  params: []

- id: level_up
  label: Level Up
  kind: action
  params:
    - name: channel
      type: integer
      description: 0=subs, 1=fronts, 2=center, 3=surrounds, 4=backs, 5=LFE, 6=Heights1, 7=Heights2
    - name: step
      type: number
      description: dB step 0.0 to 10.0

- id: level_down
  label: Level Down
  kind: action
  params:
    - name: channel
      type: integer
    - name: step
      type: number
      description: dB step 0.0 to 10.0

- id: set_level
  label: Set Level
  kind: action
  params:
    - name: channel
      type: integer
    - name: level
      type: number
      description: dB (-10.0 to +10.0, LFE -10 to 0)

- id: query_level
  label: Query Level
  kind: query
  params:
    - name: channel
      type: integer

- id: tone_up
  label: Tone Up
  kind: action
  params:
    - name: band
      type: integer
      description: 0=bass, 1=treble
    - name: step
      type: number
      description: dB step 0.0 to 10.0

- id: tone_down
  label: Tone Down
  kind: action
  params:
    - name: band
      type: integer
    - name: step
      type: number

- id: set_tone
  label: Set Tone
  kind: action
  params:
    - name: band
      type: integer
      description: 0=bass, 1=treble
    - name: level
      type: number
      description: dB adjustment

- id: query_tone
  label: Query Tone
  kind: query
  params:
    - name: band
      type: integer

- id: simulate_ir
  label: Simulate IR Command
  kind: action
  params:
    - name: zone
      type: integer
    - name: key
      type: integer
      description: IR key code (see Events for key map)

- id: setup_menu
  label: Setup Menu Display
  kind: action
  params:
    - name: state
      type: integer
      description: 0=close, 1=open, t=toggle

- id: query_setup_menu
  label: Query Setup Menu State
  kind: query
  params: []

- id: query_audio_input_format
  label: Query Audio Input Format
  kind: query
  params: []
  returns:
    - 0=no input, 1=Analog, 2=PCM, 3=Dolby, 4=DSD, 5=DTS, 6=Atmos

- id: query_sampling_rate
  label: Query Audio Sampling Rate
  kind: query
  params: []
  returns:
    - kHz, 0=analog direct or no input

- id: set_listening_mode
  label: Set Audio Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00=None, 01=AnthemLogic-Movie, 02=AnthemLogic-Music, 03=PLIIx Movie, 04=PLIIx Music, 05=Neo:6 Cinema, 06=Neo:6 Music, 07=Stereo/All Channels, 08=All-Channel Mono, 09=Mono, 10=Mono-Academy, 11=Mono(L), 12=Mono(R), 13=High Blend, 14=Dolby Surround, 15=Neo:X-Cinema, 16=Neo:X-Music, na=next applicable, pa=prev applicable"

- id: query_listening_mode
  label: Query Audio Listening Mode
  kind: query
  params: []

- id: trigger_control
  label: Trigger Control
  kind: action
  params:
    - name: trigger
      type: integer
      description: 0=trigger 1, 1=trigger 2
    - name: mode
      type: integer
      description: 0=menu control, 1=RS-232/IP

- id: query_trigger_control
  label: Query Trigger Control
  kind: query
  params:
    - name: trigger
      type: integer

- id: trigger_set
  label: Trigger Set
  kind: action
  params:
    - name: trigger
      type: integer
      description: 0=trigger 1, 1=trigger 2
    - name: state
      type: integer
      description: 0=off, 1=on

- id: query_trigger_set
  label: Query Trigger Set
  kind: query
  params:
    - name: trigger
      type: integer
```

## Feedbacks
```yaml
- id: command_separator
  description: All commands end with semicolon; successful commands return just ";"

- id: error_execution
  description: "!E<OriginalCommand>" - command cannot be executed (e.g., trigger set to menu)

- id: error_out_of_range
  description: "!R<OriginalCommand>" - out-of-range parameter (MRX models); STR models snap to nearest valid value

- id: error_invalid
  description: "!E<OriginalCommand>" - invalid command

- id: error_zone_off
  description: "!Z<OriginalMessage>" - command for zone that is off (system not in standby)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented as separate from actions
# All settable parameters are action-based commands
```

## Events
```yaml
# Device sends unsolicited responses only in response to commands (no主动推送).
# IR key codes for ZxSIMyyyy command:
- id: ir_power_on
  code: "0010"
- id: ir_power_off
  code: "0011"
- id: ir_setup
  code: "0012"
- id: ir_input
  code: "0013"
- id: ir_mode
  code: "0014"
- id: ir_level
  code: "0016"
- id: ir_info
  code: "0017"
- id: ir_up
  code: "0018"
- id: ir_down
  code: "0019"
- id: ir_left
  code: "0020"
- id: ir_right
  code: "0021"
- id: ir_select
  code: "0022"
- id: ir_volume_up
  code: "0025"
- id: ir_volume_down
  code: "0026"
- id: ir_mute_toggle
  code: "0027"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Power-on in ECO standby requires double command: "Z0POW1;Z0POW1;"
  - Trigger set only available when trigger control is set to RS-232/IP
```

## Notes
- Command separator is semicolon (`;`) only — no other line feed valid
- Only commands valid in standby: `IDM?`, `ZxPOWy`, `ZxPOW?`
- Query commands should be spaced ≥200ms apart for continuous polling
- RS-232 wait at least 1s for response before retransmission
- IP control: if max connections exceeded, oldest connection forcibly closed
- IP port configured via setup menu, not stated in factory default docs
- Maximum command length 256 bytes including terminator
- Maximum response length 258 bytes

<!-- UNRESOLVED: IP port number — configured in setup menu, source does not state default value -->
<!-- UNRESOLVED: firmware version range compatibility — not stated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: anthem_str_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-22T19:42:09.572Z
retrieved_at: 2026-04-22T19:42:09.572Z
last_checked_at: 2026-04-22T19:42:09.572Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-22T19:42:09.572Z
matched_actions: 41
action_count: 41
confidence: high
summary: "Every spec action matched literally in source; all transport parameters verified; spec fully represents command catalogue."
```

## Known Gaps

```yaml
[]
```
