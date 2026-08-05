---
spec_id: admin/clockaudio-cdt100
schema_version: ai4av-public-spec-v1
revision: 1
title: "ClockAudio CDT100 Control Spec"
manufacturer: ClockAudio
model_family: "CDT100 MK3"
aliases: []
compatible_with:
  manufacturers:
    - ClockAudio
  models:
    - "CDT100 MK3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - clockaudio.com
source_urls:
  - https://clockaudio.com/Portals/0/docs/user-manual/MAN_CDT100_MK3.pdf
retrieved_at: 2026-08-02T17:41:55.356Z
last_checked_at: 2026-08-05T08:14:38.610Z
generated_at: 2026-08-05T08:14:38.610Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device power specifications, voltage/current ratings, and fault behavior not stated in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "power/voltage/current specs, fault recovery, full preset range beyond slot 0, and any undocumented parameters not stated in source"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:14:38.610Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions match wire-literal commands in the source table; transport port 49494/UDP confirmed; one-to-one bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# ClockAudio CDT100 Control Spec

## Summary
The ClockAudio CDT100 MK3 is a Dante-networked 4-channel microphone preamp / DSP desktop interface with Touch Switch (TS) ports and ARM-C control. Control via 3rd-party modules uses ASCII UDP datagrams on port 49494, terminated by carriage return (0x0D); device returns `ACK`/`NACK`-prefixed replies and pushes unsolicited `BSTATUS` switch-state messages to a configured async IP.

<!-- UNRESOLVED: device power specifications, voltage/current ratings, and fault behavior not stated in source -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 49494
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: QUERY, GTS, GTSB, GRGB, GARMC, GASIP, VERSION, BVERSION, etc.
  - levelable  # inferred: STSB / SGBC brightness control present
```

## Actions
```yaml
actions:
  - id: phantom_power_set
    label: Set Phantom Power
    kind: action
    command: "PP {channel} {state}"
    params:
      - name: channel
        type: integer
        description: "Channel # ; 0 = All Channels, 1..4 = single channel"
      - name: state
        type: integer
        description: "0 = off, 1 = on"

  - id: identify_set
    label: Set Identify Mode
    kind: action
    command: "ID {mode}"
    params:
      - name: mode
        type: integer
        description: "0 = off, 1 = on (Power LED flashes ~330ms on/off until changed)"

  - id: find_unit
    label: Find Unit
    kind: action
    command: "FU"
    params: []

  - id: load_preset
    label: Load Preset
    kind: action
    command: "LOAD {preset}"
    params:
      - name: preset
        type: integer
        description: "Preset # (source documents x = 0)"

  - id: save_preset
    label: Save Preset
    kind: action
    command: "SAVE {preset}"
    params:
      - name: preset
        type: integer
        description: "Preset # (source documents x = 0)"

  - id: version_query
    label: Host MCU Firmware Version
    kind: query
    command: "VERSION"
    params: []

  - id: query_state
    label: Query Phantom Power and Identify Mode
    kind: query
    command: "QUERY"
    params: []

  - id: defaults
    label: Reset to Factory Defaults
    kind: action
    command: "DEFAULTS"
    params: []

  - id: sarmc_set
    label: Set ARM-C State
    kind: action
    command: "SARMC {state}"
    params:
      - name: state
        type: integer
        description: "0 = off (inactive), 1 = on (active)"

  - id: garmc_query
    label: Get ARM-C State
    kind: query
    command: "GARMC"
    params: []

  - id: sasip_set
    label: Set Async IP Address
    kind: action
    command: "SASIP {ip}:{port}"
    params:
      - name: ip
        type: string
        description: "Target node IPv4 address for async BSTATUS messages"
      - name: port
        type: integer
        description: "Target node UDP port"

  - id: gasip_query
    label: Get Async IP Address
    kind: query
    command: "GASIP"
    params: []

  - id: fwupdate
    label: Firmware Update (reboot to update mode)
    kind: action
    command: "FWUPDATE"
    params: []

  - id: bversion_query
    label: Boot Loader Version
    kind: query
    command: "BVERSION"
    params: []

  - id: sts_set
    label: Set TS LED State
    kind: action
    command: "STS {channel} {color}={state}"
    params:
      - name: channel
        type: integer
        description: "TS # ; 0 = All channels, 1..4 = single port"
      - name: color
        type: string
        description: "R, G, or B"
      - name: state
        type: integer
        description: "0 = off, 1 = on"

  - id: gts_query
    label: Get TS Status
    kind: query
    command: "GTS {channel}"
    params:
      - name: channel
        type: integer
        description: "TS # ; 0 = All channels, 1..4 = single port"

  - id: stsb_set
    label: Set TS LED Brightness
    kind: action
    command: "STSB {channel} {color}={level}"
    params:
      - name: channel
        type: integer
        description: "TS # ; 0 = All channels, 1..4 = single port"
      - name: color
        type: string
        description: "R, G, or B"
      - name: level
        type: integer
        description: "Duty cycle % ; valid values 10, 20, 30, 40, 50, 60, 70, 80, 90, 100"

  - id: gtsb_query
    label: Get TS Brightness
    kind: query
    command: "GTSB {channel}"
    params:
      - name: channel
        type: integer
        description: "TS # ; 0 = All channels, 1..4 = single port"

  - id: srgb_set
    label: Set RGB State
    kind: action
    command: "SRGB {channel} {r} {g} {b}"
    params:
      - name: channel
        type: integer
        description: "TS # ; 0 = All channels, 1..4 = single port"
      - name: r
        type: integer
        description: "Red intensity 0..255"
      - name: g
        type: integer
        description: "Green intensity 0..255"
      - name: b
        type: integer
        description: "Blue intensity 0..255"

  - id: grgb_query
    label: Get RGB State
    kind: query
    command: "GRGB {channel}"
    params:
      - name: channel
        type: integer
        description: "TS # ; 0 = All channels, 1..4 = single port"

  - id: sgbc_set
    label: Set Global Brightness Control
    kind: action
    command: "SGBC {r} {g} {b}"
    params:
      - name: r
        type: integer
        description: "Red global brightness 0..127"
      - name: g
        type: integer
        description: "Green global brightness 0..127"
      - name: b
        type: integer
        description: "Blue global brightness 0..127"

  - id: ggbc_query
    label: Get Global Brightness Control
    kind: query
    command: "GGBC"
    params: []

  - id: demo_set
    label: Set Display Demo Mode
    kind: action
    command: "DEMO {mode}"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: sihpf_set
    label: Set Input High-pass Filter
    kind: action
    command: "SIHPF {channel} {freq}"
    params:
      - name: channel
        type: integer
        description: "Channel # 1..4"
      - name: freq
        type: integer
        description: "Frequency in Hz ; 0 = off, valid range 50..150"

  - id: gihpf_query
    label: Get Input High-pass Filter
    kind: query
    command: "GIHPF {channel}"
    params:
      - name: channel
        type: integer
        description: "Channel # 1..4"

  - id: sohpf_set
    label: Set Output High-pass Filter
    kind: action
    command: "SOHPF {freq}"
    params:
      - name: freq
        type: integer
        description: "Frequency in Hz ; 0 = off, valid range 50..150"

  - id: gohpf_query
    label: Get Output High-pass Filter
    kind: query
    command: "GOHPF"
    params: []

  - id: testmode_set
    label: Set Test Mode
    kind: action
    command: "TESTMODE {mode}"
    params:
      - name: mode
        type: integer
        description: "0 = off, 1 = Demo, 2 = TS Port Test, 3 = VU Meter, 4 = Latency Test"

  - id: glatency_query
    label: Get Latency Test Mode Measurements
    kind: query
    command: "GLATENCY"
    params: []

  - id: setctlnet_set
    label: Set Control Port IP Configuration
    kind: action
    command: "SETCTLNET {ip} {mask} {gateway}"
    params:
      - name: ip
        type: string
        description: "Control port IPv4 address ; 0.0.0.0 = dynamic (DHCP/APIPA)"
      - name: mask
        type: string
        description: "Subnet mask"
      - name: gateway
        type: string
        description: "Gateway IPv4 address"

  - id: getctlnet_query
    label: Get Control Port IP Configuration
    kind: query
    command: "GETCTLNET"
    params: []

  - id: setaudnet_set
    label: Set Audio Port IP Configuration
    kind: action
    command: "SETAUDNET {ip} {mask} {gateway}"
    params:
      - name: ip
        type: string
        description: "Audio (Dante) port IPv4 address ; 0.0.0.0 = dynamic (DHCP/APIPA)"
      - name: mask
        type: string
        description: "Subnet mask"
      - name: gateway
        type: string
        description: "Gateway IPv4 address"

  - id: getaudnet_query
    label: Get Audio Port IP Configuration
    kind: query
    command: "GETAUDNET"
    params: []

  - id: reboot
    label: Reboot Device
    kind: action
    command: "REBOOT"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: ack
    type: string
    description: "Successful command acknowledgement. Format: ACK <echoed command data>. Every valid command is echoed with ACK prefix."

  - id: nack
    type: string
    description: "Negative acknowledgement. Format: NACK <echoed command data>. Returned for unknown commands, invalid parameters, or LOAD of an unsaved preset."

  - id: query_response
    type: string
    description: "QUERY response. Format: ACK QUERY PP1=<on|off> PP2=<on|off> PP3=<on|off> PP4=<on|off> ID=<on|off>"

  - id: armc_state
    type: enum
    values: [inactive, active]
    description: "GARMC response. ACK GARMC x where x = 0 (inactive) or 1 (active)."

  - id: mcu_version
    type: string
    description: "VERSION response: ACK VERSION x.y (host MCU firmware major.minor)."

  - id: bootloader_version
    type: string
    description: "BVERSION response: ACK BVERSION x.y (boot-loader firmware major.minor)."

  - id: ts_status
    type: string
    description: "GTS response. Per channel: CHxR=y CHxG=y CHxB=y (LED 0/1) and CHxSC1/2/3=y (Switch Logic 0/1 ; SC1=touch switch, SC2=user input, SC3=RS-IN)."

  - id: ts_brightness
    type: string
    description: "GTSB response. Per channel: CHxR=y CHxG=y CHxB=y, y = 10..100 (duty cycle %)."

  - id: rgb_state
    type: string
    description: "GRGB response. Per channel: CHx r g b (0..255 each)."

  - id: global_brightness
    type: string
    description: "GGBC response: ACK GGBC r g b (0..127 each)."

  - id: input_hpf
    type: string
    description: "GIHPF response: ACK GIHPF <channel> <freq> (0 = off, else 50..150 Hz)."

  - id: output_hpf
    type: string
    description: "GOHPF response: ACK GOHPF <freq> (0 = off, else 50..150 Hz)."

  - id: latency_measurements
    type: string
    description: "GLATENCY response: ACK GLATENCY <sent> <missed> <min_ms> <avg_ms> <max_ms>."

  - id: control_net_config
    type: string
    description: "GETCTLNET response: ACK GETCTLNET <ip> <mask> <gateway>. Values programmed for next reboot; 0.0.0.0 0.0.0.0 0.0.0.0 = dynamic."

  - id: audio_net_config
    type: string
    description: "GETAUDNET response: ACK GETAUDNET <ip> <mask> <gateway>. Values programmed for next reboot; 0.0.0.0 0.0.0.0 0.0.0.0 = dynamic."

  - id: async_ip
    type: string
    description: "GASIP response: ACK GASIP <ip>:<port>."
```

## Variables
```yaml
variables:
  - id: ts_led_brightness
    type: integer
    description: "Per-TS-port LED brightness (STSB). 10..100 in 10% steps."

  - id: global_brightness
    type: integer
    description: "Per-color global brightness (SGBC). 0..127."

  - id: input_hpf_freq
    type: integer
    description: "Per-channel input HPF frequency. 0 = off, 50..150 Hz."

  - id: output_hpf_freq
    type: integer
    description: "Stereo output HPF frequency. 0 = off, 50..150 Hz."
```

## Events
```yaml
events:
  - id: bstatus_switch_change
    description: "Unsolicited switch-state change message pushed to the async IP configured via SASIP. Format: BSTATUS Bx=y<CR>. x = switch indicator (1..4 = TS Port 1..4 touch switch, 5/7/9/11 = TS Port 1..4 user input, 6/8/10/12 = TS Port 1..4 RS input). y = 0 (inactive) or 1 (active)."
    example: "BSTATUS B2=1"
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- All commands are ASCII, space-delimited, terminated by carriage return (0x0D, `<CR>`).
- UDP on port 49494. Responses return to the sender's source port. UDP is unreliable; clients must handle dropped packets.
- `FWUPDATE` produces no `ACK` — device reboots immediately into update mode, Power LED turns yellow.
- Network config changes (`SETCTLNET`, `SETAUDNET`) apply on next reboot; `REBOOT` to activate.
- `GETCTLNET`/`GETAUDNET` return programmed-for-next-boot values, not currently-running addresses.
- `VERSION` covers host MCU firmware only; Dante (Ultimo) firmware requires the Dante Controller application.
- Preset slot documented in source is 0 only; loading an unsaved preset returns `NACK`.
- `SASIP` example in source shows a colon-delimited `ip:port`; response echoes the same form.

<!-- UNRESOLVED: power/voltage/current specs, fault recovery, full preset range beyond slot 0, and any undocumented parameters not stated in source -->

## Provenance

```yaml
source_domains:
  - clockaudio.com
source_urls:
  - https://clockaudio.com/Portals/0/docs/user-manual/MAN_CDT100_MK3.pdf
retrieved_at: 2026-08-02T17:41:55.356Z
last_checked_at: 2026-08-05T08:14:38.610Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:14:38.610Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions match wire-literal commands in the source table; transport port 49494/UDP confirmed; one-to-one bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device power specifications, voltage/current ratings, and fault behavior not stated in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "power/voltage/current specs, fault recovery, full preset range beyond slot 0, and any undocumented parameters not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
