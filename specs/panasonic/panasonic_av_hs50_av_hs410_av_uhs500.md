---
spec_id: admin/panasonic-av-uhs500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic AV-UHS500 Control Spec"
manufacturer: Panasonic
model_family: AV-UHS500
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AV-UHS500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/download/DEF/soft/lps/AV-UHS500_InterfaceGuide(DVQP2369XA)_E.pdf"
retrieved_at: 2026-04-30T04:41:51.350Z
last_checked_at: 2026-06-02T22:12:55.128Z
generated_at: 2026-06-02T22:12:55.128Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "AV-HS50 and AV-HS410 command compatibility with AV-UHS500 protocol not verified"
  - "HTTP/REST not mentioned in source"
  - "no power on/off commands in source"
  - "no volume/gain/brightness commands found"
  - "no standalone parameter variables documented separately from query commands"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "power on/off sequencing not documented in source"
  - "error recovery procedures not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:55.128Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Panasonic AV-UHS500 Control Spec

## Summary
The AV-UHS500 is a live video switcher controllable via TCP and UDP over IPv4. Control commands follow the format `<STX>Command:Param1:Param2:Param3<ETX>` with ASCII hex encoding. Query commands return responses; update notifications are pushed via UDP at 16ms intervals. This spec covers the AV-UHS500; companion models AV-HS50 and AV-HS410 are not covered by this document.

<!-- UNRESOLVED: AV-HS50 and AV-HS410 command compatibility with AV-UHS500 protocol not verified -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 62000  # TCP/UDP receive port; default per source
  base_url: ""  # UNRESOLVED: HTTP/REST not mentioned in source
udp:
  destination_port: 65000  # default per source
auth:
  type: none  # inferred: no auth procedure in source
timing:
  min_command_interval_ms: 16
  tcp_connection_timeout_s: 20
  max_simultaneous_connections: 20
```

## Traits
```yaml
- powerable      # UNRESOLVED: no power on/off commands in source
- routable       # inferred from SBUS/XPT crosspoint commands
- queryable      # inferred from QBSC/QBST/QSNM/QTIM/QPAT/QPNP/QKRS commands
- levelable      # UNRESOLVED: no volume/gain/brightness commands found
```

## Actions
```yaml
- id: sbus
  label: Bus Selection Control
  kind: action
  params:
    - name: bus
      type: string
      description: Bus identifier (01-184, e.g., 01=ME1PGM, 07=ME1KEY3-F, etc.)
    - name: source
      type: string
      description: Source identifier (01-251, e.g., 01=IN1, 09=OPA IN1, 171=KEY OUT)

- id: spst
  label: Set Source Name Classification
  kind: action
  params:
    - name: object
      type: integer
      description: "0 = Source name"
    - name: classification
      type: integer
      description: "0 = Default, 1 = User"

- id: ssnm
  label: Set Source Name
  kind: action
  params:
    - name: object
      type: integer
      description: "0 = Source name"
    - name: target
      type: integer
      description: Source target (01-16, maps to IN1-OPB IN4)
    - name: name
      type: string
      description: Source name (max 12 bytes, alphanumeric/symbols)

- id: skrs
  label: Set Key Signal Coupling
  kind: action
  params:
    - name: status
      type: integer
      description: "0 = Fill to Source, 1 = Source to Fill"

- id: saut
  label: AUTO Transition Trigger
  kind: action
  params:
    - name: target
      type: integer
      description: "00=BKGD, 01=KEY1, 04=KEY2, 05=KEY3, 06=FTB, 07=DSK1, 08=DSK2"
    - name: effect
      type: integer
      description: "0=MIX, 1=WIPE (when target=BKGD)"
    - name: operation
      type: integer
      description: "0=Trigger ON, 1=ON Take, 2=Off Take"

- id: scut
  label: CUT Transition Trigger
  kind: action
  params:
    - name: target
      type: integer
      description: Same as SAUT target parameter

- id: stim
  label: Set AUTO Transition Time
  kind: action
  params:
    - name: target
      type: integer
      description: Same as SAUT target parameter
    - name: frames
      type: integer
      description: Transition time in frames (000000-999999)

- id: sbti
  label: Set Bus Transition Status
  kind: action
  params:
    - name: bus_type
      type: integer
      description: "01=AUX1, 02=AUX2"
    - name: enable
      type: integer
      description: "01=Enable, 02=Disable"
    - name: frames
      type: integer
      description: Transition time in frames (000000-999999)

- id: spat
  label: Set Transition Pattern
  kind: action
  params:
    - name: type
      type: integer
      description: "01=BKGD, 02=KEY1"
    - name: pattern
      type: integer
      description: "01-09=WIPE01-09, 11-19=WIPE11-19, 61-69=WIPE61-69"

- id: spnp
  label: Set PinP Parameters
  kind: action
  params:
    - name: target
      type: integer
      description: "1=PinP(*KEY1), 2=PinP(DSK1)"
    - name: pos_x
      type: integer
      description: Central X position (-10000 to 10000, scaled to -100.00 to +100.00)
    - name: pos_y
      type: integer
      description: Central Y position (-10000 to 10000, scaled to -100.00 to +100.00)
    - name: size
      type: integer
      description: Size (0-10000, scaled to 0.00-100.00)
    - name: border_width
      type: integer
      description: "0=None, 1=Small, 2=Medium, 3=Large, 4=None of the above"
    - name: border_color
      type: integer
      description: "0=White, 1=Gray1, 2=Gray2, 3=Black, 4=None of the above"
- id: qbsc
  label: Query Bus Status
  kind: query
  params:
    - name: bus
      type: string
      description: Bus identifier (01-184, same as SBUS parameter 1)
  response: absc

- id: qbst
  label: Query Crosspoint Information
  kind: query
  params:
    - name: bus
      type: string
      description: "Bus selection (00=Bus A, 01=Bus B, 02=PGM, 03=PVW, 04=KEY1-F, 05=KEY1-S, 06=KEY2-F, 07=KEY2-S, 08=KEY3-F, 09=KEY3-S, 10=DSK1-F, 11=DSK1-S, 12=DSK2-F, 13=DSK2-S, 14=AUX1, 15=AUX2, 16=AUX3, 17=AUX4, 18=DISP)"
  response: abst

- id: qsnm
  label: Query Source Name
  kind: query
  params:
    - name: object
      type: integer
      description: "0 = Source name"
    - name: target
      type: integer
      description: Source target (01-16, maps to IN1-OPB IN4)
  response: asnm

- id: qkrs
  label: Query Key Signal Coupling
  kind: query
  params: []
  response: akrs

- id: qtim
  label: Query AUTO Transition Time
  kind: query
  params:
    - name: target
      type: integer
      description: Same as SAUT parameter 1 (00=BKGD, 01=KEY1, 04=KEY2, 05=KEY3, 06=FTB, 07=DSK1, 08=DSK2)
  response: atim

- id: qbti
  label: Query Bus Transition Status
  kind: query
  params:
    - name: bus_type
      type: integer
      description: "01=AUX1, 02=AUX2"
  response: abti

- id: qpat
  label: Query Transition Pattern
  kind: query
  params:
    - name: type
      type: integer
      description: "01=BKGD, 02=KEY1"
  response: apat

- id: qpnp
  label: Query PinP Parameters
  kind: query
  params:
    - name: target
      type: integer
      description: "1=PinP(*KEY1), 2=PinP(DSK1)"
  response: apnp

- id: absc
  label: Bus Status Response
  kind: query
  params:
    - name: bus
      type: string
      description: Bus identifier (01-184, same as SBUS parameter 1)
    - name: source
      type: string
      description: Source identifier (01-251, same as SBUS parameter 2)

- id: abst
  label: Crosspoint Information Response
  kind: query
  params:
    - name: bus
      type: string
      description: Bus selection (00-18, same as QBST parameter 1)
    - name: xpt
      type: integer
      description: Crosspoint selection (00=XPT1, 01=XPT2, ..., 22=XPT23, 23=XPT24, 99=No selection)
    - name: tally
      type: integer
      description: "0=Tally Off, 1=Tally On"
```

## Feedbacks
```yaml
- id: abus
  type: command
  direction: response
  description: Bus selection response (mirrors SBUS params)

- id: asnm
  type: command
  direction: response
  description: Source name response (mirrors SSNM params)

- id: akrs
  type: command
  direction: response
  description: Key signal coupling response (mirrors SKRS params)

- id: atim
  type: command
  direction: response
  description: AUTO transition time response
  params:
    - name: target
      type: integer
    - name: frames
      type: integer
      description: Transition time in frames (000000-999999)

- id: abti
  type: command
  direction: response
  description: Bus transition status response

- id: apat
  type: command
  direction: response
  description: Transition pattern response

- id: apnp
  type: command
  direction: response
  description: PinP parameter response

- id: eror
  type: command
  direction: error_response
  params:
    - name: code
      type: integer
      description: "01=Out of parameter range, 02=Syntax error"
```

## Queries
```yaml
- id: qbsc
  label: Query Bus Status
  params:
    - name: bus
      type: string
      description: Bus identifier (01-184)
  response: absc

- id: qbst
  label: Query Crosspoint Info
  params:
    - name: bus
      type: string
      description: Bus identifier (00-18)
  response: abst

- id: qtim
  label: Query AUTO Transition Time
  params:
    - name: target
      type: integer
  response: atim

- id: qbti
  label: Query Bus Transition Status
  params:
    - name: bus_type
      type: integer
      description: "01=AUX1, 02=AUX2"
  response: abti

- id: qpat
  label: Query Transition Pattern
  params:
    - name: type
      type: integer
      description: "01=BKGD, 02=KEY1"
  response: apat

- id: qpnp
  label: Query PinP Parameters
  params:
    - name: target
      type: integer
      description: "1=PinP(*KEY1), 2=PinP(DSK1)"
  response: apnp

- id: qsnm
  label: Query Source Name
  params:
    - name: object
      type: integer
    - name: target
      type: integer
  response: asnm

- id: qkrs
  label: Query Key Signal Coupling
  params: []
  response: akrs
```

## Variables
```yaml
# UNRESOLVED: no standalone parameter variables documented separately from query commands
```

## Events
```yaml
- id: absc_update
  type: unsolicited
  protocol: udp
  description: Crosspoint status pushed at 16ms intervals when source changes
  params:
    - name: bus
      type: string
    - name: source
      type: string

- id: tsl_update
  type: unsolicited
  protocol: udp
  description: TSL Protocol v5.0 source name/tally notifications
  params:
    - name: index
      type: integer
      description: Source index (decimal 01-251)
    - name: control
      type: integer
      description: Bit-encoded tally lamp state
    - name: text
      type: string
      description: Source name (12 bytes, null-padded)
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
The command format is `<STX>Command:Param1:Param2:Param3<ETX>` where STX=0x02, ETX=0x03. Commands are 4 alphabetical characters. TCP connections timeout after 20s of inactivity. UDP update notifications are sent 3 times at 16ms intervals on source change. TSL Protocol packets are little-endian; total packet size including PBC must not exceed 2048 bytes.

Wipe pattern notes: When WIPE2 (No.18,19), SQ2 (No.33,38,39 for BKGD only, No.39), SL (No.45), or 3D2 (No.64–69) is selected, the previous wipe pattern remains active rather than the selected one.

PinP target mapping varies by format and option board: 2K mode uses KEY2; 4K with 4KDVE uses KEY2; 4K without 4KDVE uses KEY1.

<!-- UNRESOLVED: power on/off sequencing not documented in source -->
<!-- UNRESOLVED: error recovery procedures not stated in source -->

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - "https://eww.pass.panasonic.co.jp/pro-av/support/content/download/DEF/soft/lps/AV-UHS500_InterfaceGuide(DVQP2369XA)_E.pdf"
retrieved_at: 2026-04-30T04:41:51.350Z
last_checked_at: 2026-06-02T22:12:55.128Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:55.128Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "AV-HS50 and AV-HS410 command compatibility with AV-UHS500 protocol not verified"
- "HTTP/REST not mentioned in source"
- "no power on/off commands in source"
- "no volume/gain/brightness commands found"
- "no standalone parameter variables documented separately from query commands"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "power on/off sequencing not documented in source"
- "error recovery procedures not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
