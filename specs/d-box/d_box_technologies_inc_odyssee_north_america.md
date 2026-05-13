---
spec_id: admin/d-box-odyssee
schema_version: ai4av-public-spec-v1
revision: 1
title: "D-BOX Odyssee Remote Control Protocol Spec"
manufacturer: D-BOX
model_family: "Odyssee (North America)"
aliases: []
compatible_with:
  manufacturers:
    - D-BOX
  models:
    - "Odyssee (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.d-box.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T17:31:52.762Z
last_checked_at: 2026-04-30T09:39:47.792Z
generated_at: 2026-04-30T09:39:47.792Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:39:47.792Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions matched literally in source with identical mnemonics, parameters, and response structures."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# D-BOX Odyssee Remote Control Protocol Spec

## Summary
D-BOX Odyssee haptic motion controller supporting RS-232, TCP, and UDP remote control. Commands target the unit itself or connected motion platforms via a binary-framed protocol (STX/ETX) with 5-character mnemonics. Covers motion intensity, vibration level, mute, experience mode, capture device selection, and media status queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum number of motion platforms not stated (only "1 to N") -->
<!-- UNRESOLVED: Wi-Fi configuration details not stated beyond mention of Wi-Fi support -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 61555  # TCP port
  # UDP port is 61556 (separate port for UDP protocol)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # WSTOP shuts down the unit; Wake-on-LAN supported
- levelable    # WMOTL motion intensity, WVIBL vibration level (dB range)
- queryable    # extensive READ command set (RMOTL, RVIBL, RMUTE, RFILM, etc.)
```

## Actions
```yaml
- id: set_motion_level
  label: Set Motion Intensity Level
  kind: action
  mnemonic: WMOTL
  params:
    - name: target
      type: integer
      description: "Target platform number (0=unit, 1..N=platform). Optional, defaults to 0."
    - name: level_db
      type: number
      description: "Motion intensity in dB. Range: -20 (min) to 0 (max)."
  response: ETX acknowledgement

- id: set_vibration_level
  label: Set Vibration Level
  kind: action
  mnemonic: WVIBL
  params:
    - name: target
      type: integer
      description: "Target platform number (0=unit, 1..N=platform). Optional, defaults to 0."
    - name: level_db
      type: number
      description: "Vibration level in dB. Range: -20 (min) to 0 (max)."
  response: ETX acknowledgement

- id: set_mute
  label: Set Mute
  kind: action
  mnemonic: WMUTE
  params:
    - name: target
      type: integer
      description: "Target platform number (0=unit, 1..N=platform). Optional, defaults to 0."
    - name: mute
      type: integer
      description: "0 = mute deactivated, 1 = mute activated"
  response: ETX acknowledgement

- id: set_unit_name
  label: Set Unit Name
  kind: action
  mnemonic: WNAME
  params:
    - name: name
      type: string
      description: "Name to assign to the unit"
  response: ETX acknowledgement

- id: set_motion_delay
  label: Set Motion Delay
  kind: action
  mnemonic: WDLAY
  params:
    - name: delay_ms
      type: integer
      description: "Motion delay in milliseconds"
  response: ETX acknowledgement

- id: set_recognition_tolerance
  label: Set Recognition Tolerance
  kind: action
  mnemonic: WTOLR
  params:
    - name: tolerance_s
      type: number
      description: "Recognition tolerance in seconds"
  response: ETX acknowledgement

- id: shutdown
  label: Shutdown Unit
  kind: action
  mnemonic: WSTOP
  params: []
  response: ETX acknowledgement

- id: set_capture_device
  label: Set Capture Device
  kind: action
  mnemonic: WCAPD
  params:
    - name: capture_mode
      type: integer
      description: "0=Manual, 1=OS Default, 2=USB Preferred"
    - name: device_id
      type: string
      description: "Capture device identification for Manual mode; use EM (0x19) for other modes"
  response: ETX acknowledgement

- id: set_experience_mode
  label: Set Experience Mode
  kind: action
  mnemonic: WEXPM
  params:
    - name: mode
      type: integer
      description: "0=D-BOX Coded Video, 1=D-BOX Coded Gaming, 2=Adaptive Audio, 3=Adaptive Gaming"
  response: ETX acknowledgement
```

## Feedbacks
```yaml
- id: platform_count
  label: Platform Count
  mnemonic: RPCNT
  type: integer
  description: "Number of motion platforms connected to the unit"

- id: media_status
  label: Media Status
  mnemonic: RFILM
  type: object
  description: "Current media status of the unit"
  fields:
    - name: source_status
      type: integer
      description: "0=Off, 1=Green, 2=Yellow, 3=Red (LED)"
    - name: source_status_desc
      type: string
      description: "Source status description text"
    - name: motion_code_status
      type: integer
      description: "0=Off, 1=Green, 2=Yellow, 3=Red (LED)"
    - name: motion_code_status_desc
      type: string
      description: "Motion code status description text"
    - name: media_title
      type: string
      description: "Media title (blank if no media detected)"
    - name: current_timecode_s
      type: integer
      description: "Current media timecode in seconds (0 if no media)"
    - name: total_duration_s
      type: integer
      description: "Total media duration in seconds (0 if no media)"

- id: motion_level
  label: Motion Intensity Level
  mnemonic: RMOTL
  type: number
  description: "Motion intensity in dB (-20 to 0)"

- id: vibration_level
  label: Vibration Level
  mnemonic: RVIBL
  type: number
  description: "Vibration level in dB (-20 to 0)"

- id: mute_state
  label: Mute State
  mnemonic: RMUTE
  type: integer
  description: "0=mute deactivated (activated), 1=mute activated (deactivated)"

- id: film_count
  label: Film Count
  mnemonic: RFLNB
  type: integer
  description: "Number of films in database matching the filter"
  params:
    - name: filter
      type: string
      description: "\"*\" for all, \"#\" for numeric, \"A-Z\" for specific letter. Defaults to \"*\"."

- id: unit_name
  label: Unit Name
  mnemonic: RNAME
  type: string
  description: "Name of the unit"

- id: motion_delay
  label: Motion Delay
  mnemonic: RDLAY
  type: integer
  description: "Motion delay in milliseconds"

- id: recognition_tolerance
  label: Recognition Tolerance
  mnemonic: RTOLR
  type: number
  description: "Recognition tolerance in seconds"

- id: capture_devices
  label: Capture Devices
  mnemonic: RCAPD
  type: list
  description: "List of available capture devices"
  fields:
    - name: device_name
      type: string
    - name: device_description
      type: string
    - name: device_identification
      type: string
    - name: interface_type
      type: integer
      description: "0=Internal, 1=External (e.g. USB)"
    - name: in_use
      type: integer
      description: "0=Not in use, 1=In use"
    - name: available
      type: integer
      description: "0=Not available, 1=Available"

- id: experience_mode
  label: Experience Mode
  mnemonic: REXPM
  type: object
  description: "Current experience mode and state"
  fields:
    - name: mode
      type: integer
      description: "0=D-BOX Coded Video, 1=D-BOX Coded Gaming, 2=Adaptive Audio, 3=Adaptive Gaming"
    - name: state
      type: integer
      description: "0=On, 1=Off, 2=Transitioning"
    - name: status_code
      type: integer
      description: "0=Ok, 100=Mode init failure, 101=Motion init failure, 102=HaptiSync Agent not connected, 103=Agent timeout, 104=Unknown mode, 200=Exception"
```

## Variables
```yaml
# No settable continuous variables beyond those covered by Actions (levels are set via WMOTL/WVIBL)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
- id: wake_on_lan
  label: Wake-on-LAN
  description: "Send standard Magic Packet (broadcast frame: 6×0xFF + 16×MAC address = 102 bytes) to HEMC Ethernet port. Requires prior power-on without power loss."
  steps:
    - "Construct Magic Packet: 6 bytes of 0xFF followed by 16 repetitions of target MAC address"
    - "Send as broadcast frame to HEMC Ethernet interface (not Wi-Fi)"
```

## Safety
```yaml
confirmation_required_for:
  - shutdown  # WSTOP shuts down the unit
interlocks: []
# UNRESOLVED: no safety warnings or power-on sequencing requirements found in source
```

## Notes
- Commands use binary framing: STX (0x02) ... ETX (0x03), with RS (0x1E) as record separator and EM (0x19) as empty record placeholder.
- Target number (0=unit, 1..N=platform) is optional and placed immediately after STX before the mnemonic. Defaults to 0.
- ENQ (0x05) before ETX causes response to echo the original request after GS (0x1D) separator.
- First character of 5-char mnemonic: R = READ (query), W = WRITE (command).
- Malformed commands are silently ignored; unrecognized mnemonics return NAK (0x15).
- Extra parameters beyond expected count are ignored silently.
- UDP port (61556) differs from TCP port (61555).
- Wake-on-LAN requires Ethernet connection (not Wi-Fi) and unit must have been powered at least once without losing power.
- RS-232 uses Null-Modem cable (DB-9, EIA232, same pinout as PC).

<!-- UNRESOLVED: maximum number of motion platforms (N) not specified -->
<!-- UNRESOLVED: Wi-Fi configuration method not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no protocol version stated -->

## Provenance

```yaml
source_domains:
  - support.d-box.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T17:31:52.762Z
last_checked_at: 2026-04-30T09:39:47.792Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:39:47.792Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions matched literally in source with identical mnemonics, parameters, and response structures."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
