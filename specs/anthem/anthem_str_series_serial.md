---
spec_id: admin/anthem-str-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Anthem STR Series Control Spec"
manufacturer: Anthem
model_family: "STR Preamplifier"
aliases: []
compatible_with:
  manufacturers:
    - Anthem
  models:
    - "STR Preamplifier"
    - "STR Integrated Amplifier"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/sandbox1-anthemav/an/STR-IP-RS232-20251205192153957.xlsx
retrieved_at: 2026-04-30T04:24:14.903Z
last_checked_at: 2026-06-01T23:12:06.864Z
generated_at: 2026-06-01T23:12:06.864Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP listening port is not fixed in source; it is set via the unit's setup menu. No published safety warnings, interlocks, or error-recovery procedures appear in the source."
  - "TCP port is a user-configurable setup menu setting, not a fixed value"
  - "no safety warnings, interlocks, or power-on sequencing requirements"
verification:
  verdict: verified
  checked_at: 2026-06-01T23:12:06.864Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions matched exactly against source command reference; full bidirectional coverage; transport parameters verified. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Anthem STR Series Control Spec

## Summary
Serial and TCP/IP control spec for the Anthem STR Preamplifier and STR Integrated Amplifier. The device exposes an RS-232C interface (115200 8N1, straight DB9) and a TCP/IP socket that accepts the exact same command set; the semicolon `;` is the only valid line terminator. Documented here are the system, zone, input, volume, level, balance, tone, listening-mode, trigger, simulated-IR, and identification commands.

<!-- UNRESOLVED: TCP listening port is not fixed in source; it is set via the unit's setup menu. No published safety warnings, interlocks, or error-recovery procedures appear in the source. -->

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
  port: null  # UNRESOLVED: TCP port is a user-configurable setup menu setting, not a fixed value
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from ZxPOWy
- routable        # inferred from ZxINPyy input selection
- queryable       # inferred from ?-suffixed query commands
- levelable       # inferred from ZxVOL, ZxMUT, Z1LEV, Z1BAL, Z1TON
```

## Actions
```yaml
- id: fp_brightness
  label: Front Panel Brightness
  kind: action
  command: "FPB{x};"
  params:
    - name: x
      type: integer
      description: "0=off, 1=low, 2=medium, 3=high, 4=max, n=cycle to next"

- id: fp_brightness_query
  label: Front Panel Brightness Query
  kind: query
  command: "FPB?;"
  params: []

- id: set_speaker_profile
  label: Set Speaker Profile
  kind: action
  command: "SSP{xx}{y};"
  params:
    - name: xx
      type: string
      description: "Input number 00-ZZ (00 = current input), two-digit zero-padded"
    - name: y
      type: integer
      description: "Profile number 1-4"

- id: query_speaker_profile
  label: Query Speaker Profile
  kind: query
  command: "SSP{xx}?;"
  params:
    - name: xx
      type: string
      description: "Input number 00-ZZ, two-digit zero-padded"

- id: query_speaker_profile_name
  label: Query Speaker Profile Name
  kind: query
  command: "SPN{y}?;"
  params:
    - name: y
      type: integer
      description: "Profile number 1-4"

- id: zone_power
  label: Zone Power
  kind: action
  command: "Z{x}POW{y};"
  params:
    - name: x
      type: integer
      description: "Zone: 0=all zones, 1=main, 2/3 where applicable. For STR only Z0 and Z1 apply."
    - name: y
      type: integer
      description: "0=off, 1=on"
  notes: "In ECO standby, send twice to wake (e.g. Z0POW1;Z0POW1;). Z0 only valid for power."

- id: zone_power_query
  label: Zone Power Query
  kind: query
  command: "Z{x}POW?;"
  params:
    - name: x
      type: integer
      description: "Zone 0-3. Z0/Z1 only meaningful for STR."

- id: id_query_full
  label: Query Model and Firmware
  kind: query
  command: "IDQ?;"
  params: []

- id: id_query_model
  label: Query Model
  kind: query
  command: "IDM?;"
  params: []

- id: id_query_sw_version
  label: Query Software Version
  kind: query
  command: "IDS?;"
  params: []

- id: id_query_sw_build_date
  label: Query Software Build Date
  kind: query
  command: "IDB?;"
  params: []

- id: id_query_hw_version
  label: Query Hardware Version
  kind: query
  command: "IDH?;"
  params: []

- id: id_query_mac
  label: Query MCU MAC Address
  kind: query
  command: "IDN?;"
  params: []

- id: query_input_count
  label: Query Number of Active Inputs
  kind: query
  command: "ICN?;"
  params: []

- id: query_input_name
  label: Query Input Name
  kind: query
  command: "ISN{yy}?;"
  params:
    - name: yy
      type: string
      description: "Input number 01-ZZ, two-digit zero-padded. Max 10 ASCII characters in name."

- id: zone_input_select
  label: Zone Input Select
  kind: action
  command: "Z{x}INP{yy};"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."
    - name: yy
      type: string
      description: "Input number 01-ZZ, two-digit zero-padded"

- id: zone_input_query
  label: Zone Input Query
  kind: query
  command: "Z{x}INP?;"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."

- id: volume_up
  label: Zone Volume Up
  kind: action
  command: "Z{x}VUP{yy.y};"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."
    - name: yy.y
      type: number
      description: "Step in dB, 0.0-10.0, or m for model minimum. Rounded to nearest valid value."

- id: volume_down
  label: Zone Volume Down
  kind: action
  command: "Z{x}VDN{yy.y};"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."
    - name: yy.y
      type: number
      description: "Step in dB, 0.0-10.0, or m for model minimum. Rounded to nearest valid value."

- id: volume_set
  label: Zone Volume Set
  kind: action
  command: "Z{x}VOL{s}{yy.y};"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."
    - name: s
      type: string
      description: "Sign: + or -"
    - name: yy.y
      type: number
      description: "Volume in dB. Rounded to nearest valid value."

- id: volume_query
  label: Zone Volume Query
  kind: query
  command: "Z{x}VOL?;"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."

- id: mute
  label: Zone Mute
  kind: action
  command: "Z{x}MUT{y};"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."
    - name: y
      type: string
      description: "0=unmute, 1=mute, t=toggle"

- id: mute_query
  label: Zone Mute Query
  kind: query
  command: "Z{x}MUT?;"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."

- id: arc
  label: Zone ARC On/Off
  kind: action
  command: "Z{x}ARC{y};"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."
    - name: y
      type: integer
      description: "0=off, 1=on. Returns error if no ARC co-efficients loaded or input is analog direct."

- id: arc_query
  label: Zone ARC Query
  kind: query
  command: "Z{x}ARC?;"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."

- id: balance_left
  label: Balance Left
  kind: action
  command: "Z1BLT{yyy};"
  params:
    - name: yyy
      type: integer
      description: "Percent 0-100, or m for model minimum. Rounded to nearest valid value."

- id: balance_right
  label: Balance Right
  kind: action
  command: "Z1BRT{yyy};"
  params:
    - name: yyy
      type: integer
      description: "Percent 0-100, or m for model minimum. Rounded to nearest valid value."

- id: balance_set
  label: Balance Set
  kind: action
  command: "Z1BAL{yyy};"
  params:
    - name: yyy
      type: integer
      description: "Percent 0-100. 0=full left, 50=center, 100=full right. Rounded to nearest valid value."

- id: balance_query
  label: Balance Query
  kind: query
  command: "Z1BAL?;"
  params: []

- id: level_up
  label: Channel Level Up
  kind: action
  command: "Z1LUP{y}{zz.z};"
  params:
    - name: y
      type: integer
      description: "Channel: 0=subs (only group valid for STR), 1=fronts, 2=center, 3=surrounds, 4=backs, 5=LFE, 6=Heights1, 7=Heights2"
    - name: zz.z
      type: number
      description: "Step in dB, 0.0-10.0, or m for model minimum."

- id: level_down
  label: Channel Level Down
  kind: action
  command: "Z1LDN{y}{zz.z};"
  params:
    - name: y
      type: integer
      description: "Channel: 0=subs, 1=fronts, 2=center, 3=surrounds, 4=backs, 5=LFE, 6=Heights1, 7=Heights2"
    - name: zz.z
      type: number
      description: "Step in dB, 0.0-10.0, or m for model minimum."

- id: level_set
  label: Channel Level Set
  kind: action
  command: "Z1LEV{y}{s}{zz.z};"
  params:
    - name: y
      type: integer
      description: "Channel: 0=subs, 1=fronts, 2=center, 3=surrounds, 4=backs, 5=LFE, 6=Heights1, 7=Heights2"
    - name: s
      type: string
      description: "Sign: + or -"
    - name: zz.z
      type: number
      description: "Subs/fronts/center/surrounds/backs: -10.0 to +10.0 dB. LFE: -10 to 0 dB. Rounded to nearest valid value."

- id: level_query
  label: Channel Level Query
  kind: query
  command: "Z1LEV{y}?;"
  params:
    - name: y
      type: integer
      description: "Channel: 0=subs, 1=fronts, 2=center, 3=surrounds, 4=backs, 5=LFE, 6=Heights1, 7=Heights2"

- id: tone_up
  label: Tone Up
  kind: action
  command: "Z1TUP{y}{zz.z};"
  params:
    - name: y
      type: integer
      description: "0=bass, 1=treble"
    - name: zz.z
      type: number
      description: "Step in dB, 0.0-10.0, or m for model minimum."

- id: tone_down
  label: Tone Down
  kind: action
  command: "Z1TDN{y}{zz.z};"
  params:
    - name: y
      type: integer
      description: "0=bass, 1=treble"
    - name: zz.z
      type: number
      description: "Step in dB, 0.0-10.0, or m for model minimum."

- id: tone_set
  label: Tone Set
  kind: action
  command: "Z1TON{y}{s}{zz.z};"
  params:
    - name: y
      type: integer
      description: "0=bass, 1=treble"
    - name: s
      type: string
      description: "Sign: + or -"
    - name: zz.z
      type: number
      description: "Tone delta in dB."

- id: tone_query
  label: Tone Query
  kind: query
  command: "Z1TON{y}?;"
  params:
    - name: y
      type: integer
      description: "0=bass, 1=treble"

- id: simulate_ir
  label: Simulate IR Command
  kind: action
  command: "Z{x}SIM{yyyy};"
  params:
    - name: x
      type: integer
      description: "Zone. For STR always Z1."
    - name: yyyy
      type: string
      description: "Four-digit IR key code. Valid values: 10=Power On, 11=Power Off, 12=Setup, 13=Input, 14=Mode, 16=Level, 17=Info, 18=Up, 19=Down, 20=Left, 21=Right, 22=Select, 25=Volume Up, 26=Volume Down, 27=Mute Toggle. Zero-pad (e.g. Key 10 = 0010)."

- id: setup_menu_display
  label: Setup Menu Display
  kind: action
  command: "Z1SMD{x};"
  params:
    - name: x
      type: string
      description: "0=close, 1=open, t=toggle"

- id: setup_menu_display_query
  label: Setup Menu Display Query
  kind: query
  command: "Z1SMD?;"
  params: []

- id: query_audio_input_format
  label: Query Audio Input Format
  kind: query
  command: "Z1AIF?;"
  params: []
  notes: "Response code: 0=no input, 1=Analog, 2=PCM, 3=Dolby, 4=DSD, 5=DTS, 6=Atmos. Not all models support all formats."

- id: query_sample_rate
  label: Query Audio Sample Rate
  kind: query
  command: "Z1SRT?;"
  params: []
  notes: "Returns kHz; 0=analog direct or no input."

- id: listening_mode
  label: Audio Listening Mode
  kind: action
  command: "Z1ALM{yy};"
  params:
    - name: yy
      type: string
      description: "00=None, 01=AnthemLogic-Movie, 02=AnthemLogic-Music, 03=PLIIx Movie, 04=PLIIx Music, 05=Neo:6 Cinema, 06=Neo:6 Music, 07=Stereo, 08=All-Channel Mono, 09=Mono, 10=Mono-Academy, 11=Mono(L), 12=Mono(R), 13=High Blend, 14=Dolby Surround, 15=Neo:X-Cinema, 16=Neo:X-Music, na=cycle next applicable, pa=cycle previous applicable. For STR only Stereo, Mono, Both=L, Both=R are valid."

- id: listening_mode_query
  label: Audio Listening Mode Query
  kind: query
  command: "Z1ALM?;"
  params: []

- id: trigger_control
  label: Trigger Control Source
  kind: action
  command: "R{x}CTL{y};"
  params:
    - name: x
      type: integer
      description: "Trigger number: 0=trigger 1, 1=trigger 2"
    - name: y
      type: integer
      description: "0=menu control, 1=RS-232/IP"

- id: trigger_control_query
  label: Trigger Control Source Query
  kind: query
  command: "R{x}CTL?;"
  params:
    - name: x
      type: integer
      description: "Trigger number: 0=trigger 1, 1=trigger 2"

- id: trigger_set
  label: Trigger Set
  kind: action
  command: "R{x}SET{y};"
  params:
    - name: x
      type: integer
      description: "Trigger number: 0=trigger 1, 1=trigger 2"
    - name: y
      type: integer
      description: "0=off, 1=on. Only valid if trigger control is set to RS-232/IP."

- id: trigger_set_query
  label: Trigger State Query
  kind: query
  command: "R{x}SET?;"
  params:
    - name: x
      type: integer
      description: "Trigger number: 0=trigger 1, 1=trigger 2"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  description: "Response to ZxPOW? includes the original prefix, e.g. Z1POW1."

- id: front_panel_brightness
  type: enum
  values: [0, 1, 2, 3, 4]
  description: "Response to FPB? is FPB<0-4>."

- id: volume
  type: string
  description: "Response to ZxVOL? is Z{x}VOL{s}{yy.y}, e.g. Z1VOL-35 for -35 dB."

- id: mute
  type: enum
  values: [0, 1]
  description: "Response to ZxMUT? is Z{x}MUT<0|1>."

- id: arc
  type: enum
  values: [0, 1]
  description: "Response to ZxARC? is Z{x}ARC<0|1>."

- id: balance
  type: integer
  description: "Response to Z1BAL? is Z1BAL<0-100> percent. 0=full left, 50=center, 100=full right."

- id: channel_level
  type: string
  description: "Response to Z1LEV{y}? is Z1LEV{y}{s}{zz.z} dB. Subs/fronts/center/surrounds/backs: -10.0 to +10.0 dB. LFE: -10 to 0 dB."

- id: tone
  type: string
  description: "Response to Z1TON{y}? is Z1TON{y}{s}{zz.z} dB for y=0 (bass) or y=1 (treble)."

- id: audio_input_format
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  description: "Response to Z1AIF?. 0=no input, 1=Analog, 2=PCM, 3=Dolby, 4=DSD, 5=DTS, 6=Atmos. Not all models support all formats."

- id: sample_rate_khz
  type: integer
  description: "Response to Z1SRT? is the sample rate in kHz. 0 = analog direct or no input."

- id: listening_mode
  type: string
  description: "Response to Z1ALM? is Z1ALM{yy}. See listening_mode action for the full value list."

- id: setup_menu_display
  type: enum
  values: [0, 1]
  description: "Response to Z1SMD? is Z1SMD<0|1>."

- id: input_active_count
  type: integer
  description: "Response to ICN? is ICN<yy>, the number of active input configurations."

- id: input_name
  type: string
  description: "Response to ISN{yy}? is ISN{yy}<name> where <name> is up to 10 ASCII characters set in the setup menu."

- id: speaker_profile
  type: string
  description: "Response to SSP{xx}? is SSP{xx}{y} indicating which of profiles 1-4 is active for input {xx}."

- id: speaker_profile_name
  type: string
  description: "Response to SPN{y}? is SPN{y}<name> where <name> is the profile name in ASCII as set in setup."

- id: model_id
  type: string
  description: "Response to IDM? is IDM<model>, e.g. IDMSTR IA."

- id: software_version
  type: string
  description: "Response to IDS? is IDS<version>, e.g. IDS1.0.5560."

- id: software_build_date
  type: string
  description: "Response to IDB? is IDB<date>, e.g. IDB5/18/17."

- id: hardware_version
  type: string
  description: "Response to IDH? is IDH<version>."

- id: mac_address
  type: string
  description: "Response to IDN? is IDN<mac>, e.g. IDN0004A393FA62 (12 hex chars)."

- id: model_firmware
  type: string
  description: "Response to IDQ? is IDQ<model> <sw_ver> <build_date> <build_time>, e.g. IDQSTR IA 1.0.5560 5/18/17 16:32."

- id: trigger_control
  type: enum
  values: [0, 1]
  description: "Response to RxCTL? is RxCTL<0|1>. 0=menu, 1=RS-232/IP."

- id: trigger_state
  type: enum
  values: [0, 1]
  description: "Response to RxSET? is RxSET<0|1>. 0=off, 1=on."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements
# documented in source.
```

## Notes
- Semicolon `;` is the only valid line terminator. The device treats incoming data on the TCP socket identically to the RS-232 port.
- Pinout: DB9 pin 2=TX, pin 3=RX, pin 5=GND. Straight-wired DB9 cable used for PC connection.
- Factory-default serial: 115200 baud, 8 data bits, no parity, 1 stop bit, no flow control.
- Max command length 256 bytes including terminator; max response 258 bytes. Average latency <30 ms, individual command max 100 ms. RS-232 clients should wait at least 1 s for a response before retransmission. Continuous polling should be ~200 ms apart.
- For STR models, `Zx` is always `Z1` for every command except power, where `Z0` (all zones) is also valid alongside `Z1`.
- Power-on from ECO standby may require the power-on command to be sent twice (e.g. `Z0POW1;Z0POW1;`); the first wakes the unit, the second is the actual power-on.
- Only `IDM?`, `ZxPOWy`, and `ZxPOW?` are valid while the system is in standby; all other commands return `!E<command>`.
- Error responses: `;` on success, `!E<cmd>` for recognized-but-not-executable, `!R<cmd>` for out-of-range (MRX/AVM; STR rounds to nearest valid value), `!Z<cmd>` for command sent to a zone that is off while the system is on.
- TCP listening port is set in the setup menu; the source does not publish a default. Discovery uses Anthem DDP v1 (`PARC` magic, 16-byte device_name, 16-byte model_name, 16-byte MAC; broadcast on local subnet on connect and on graceful shutdown).
- Balance/level/tone commands are on-the-fly adjustments only; use the setup menu and Anthem Room Correction for system-level calibration.

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/sandbox1-anthemav/an/STR-IP-RS232-20251205192153957.xlsx
retrieved_at: 2026-04-30T04:24:14.903Z
last_checked_at: 2026-06-01T23:12:06.864Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T23:12:06.864Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions matched exactly against source command reference; full bidirectional coverage; transport parameters verified. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP listening port is not fixed in source; it is set via the unit's setup menu. No published safety warnings, interlocks, or error-recovery procedures appear in the source."
- "TCP port is a user-configurable setup menu setting, not a fixed value"
- "no safety warnings, interlocks, or power-on sequencing requirements"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
