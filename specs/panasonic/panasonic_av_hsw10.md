---
spec_id: admin/panasonic-av-hsw10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic AV-HSW10 Control Spec"
manufacturer: Panasonic
model_family: AV-HSW10
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AV-HSW10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
retrieved_at: 2026-04-30T04:41:48.960Z
last_checked_at: 2026-04-25T21:43:50.480Z
generated_at: 2026-04-25T21:43:50.480Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:43:50.480Z
  matched_actions: 21
  action_count: 21
  confidence: low
  summary: "All 21 spec actions matched verbatim in source; transport parameters verified; full command coverage"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Panasonic AV-HSW10 Control Spec

## Summary

The Panasonic AV-HSW10 is a Compact Live Switcher controllable over TCP and UDP via a custom text-based protocol. Commands use `<STX>`/`<ETX>` delimited strings with colon-separated parameters. TCP is used for control commands and queries; UDP carries unsolicited status update notifications (bus selection changes) and TSL Protocol 5.0 tally/name data. Up to 20 simultaneous TCP connections are supported.

<!-- UNRESOLVED: power on/off commands not documented in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 62000
  base_url: null  # N/A - direct TCP socket, not HTTP
  notes: >
    Factory-default TCP receive port 62000, UDP destination port 65000.
    Both changeable from device MENU. Factory-default IP 192.168.0.8,
    subnet 255.255.255.0.
udp:
  destination_port: 65000
  notes: >
    UDP used for unsolicited update notifications (ABSC command, sent 3x
    at 16 ms intervals on change) and TSL Protocol 5.0 tally/name data.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable    # inferred: crosspoint/bus switching commands (SBUS, QBSC)
  - queryable   # inferred: multiple query commands (QBSC, QBST, QSNM, QKRS, QTIM, QBTI, QPAT, QPNP)
  - levelable   # inferred: transition time, PinP size/position/border parameters
```

## Actions
```yaml
actions:
  - id: bus_select
    label: Set Bus Selection (Crosspoint)
    kind: action
    command: SBUS
    format: "<STX>SBUS:{bus}:{source}<ETX>"
    params:
      - name: bus
        type: enum
        description: "Bus selection: 01=PGM, 02=PVW, 03=KEY1-F, 04=KEY1-S, 05=KEY2-F, 06=KEY2-S, 113=AUX1, 114=AUX2, 153-168=MV-1..MV-16"
      - name: source
        type: enum
        description: "Source: 01-09=IN1-IN9, 10=Analog IN, 145=CBGD1, 146=CBGD2, 147=CBAR, 148=Black, 149=STILL1-V, 150=STILL1-K, 151=STILL2-V, 152=STILL2-K, 165=MV, 171=KEY OUT, 172=CLN, 201=PGM, 203=PVW, 227=AUX1, 228=AUX2, 231=IP OUT1, 232=IP OUT2, 251=CLOCK"
    response: ABUS

  - id: set_source_name_display
    label: Set Source Name Display Type
    kind: action
    command: SPST
    format: "<STX>SPST:{object}:{classification}<ETX>"
    params:
      - name: object
        type: enum
        description: "0=Source name"
      - name: classification
        type: enum
        description: "00=Default, 01=User"
    response: none

  - id: set_source_name
    label: Set Source Name
    kind: action
    command: SSNM
    format: "<STX>SSNM:{object}:{source_object}:{name}<ETX>"
    params:
      - name: object
        type: enum
        description: "00=Source name"
      - name: source_object
        type: enum
        description: "01-09=IN1-IN9, 227=AUX1, 228=AUX2"
      - name: name
        type: string
        description: "Source name, max 12 bytes, alphanumeric and symbols"
    response: ASNM

  - id: set_key_coupling
    label: Set Key Signal Coupling
    kind: action
    command: SKRS
    format: "<STX>SKRS:{status}<ETX>"
    params:
      - name: status
        type: enum
        description: "00=Fill to Source, 01=Source to Fill"
    response: AKRS

  - id: auto_transition
    label: AUTO Transition (Trigger)
    kind: action
    command: SAUT
    format: "<STX>SAUT:{source}:{effect}:{operation}<ETX>"
    params:
      - name: source
        type: enum
        description: "00=BKGD, 01=KEY1, 04=KEY2, 06=FTB"
      - name: effect
        type: enum
        description: "0=MIX, 1=WIPE (MIX used for KEY2 and FTB regardless)"
      - name: operation
        type: enum
        description: "0=Trigger ON, 1=ON Take (Off→On, excl. BKGD), 2=OFF Take (On→Off, excl. BKGD)"
    response: none

  - id: cut_transition
    label: CUT Transition (Trigger)
    kind: action
    command: SCUT
    format: "<STX>SCUT:{source}<ETX>"
    params:
      - name: source
        type: enum
        description: "Same as SAUT source: 00=BKGD, 01=KEY1, 04=KEY2, 06=FTB"
    response: none

  - id: set_auto_transition_time
    label: Set AUTO Transition Time
    kind: action
    command: STIM
    format: "<STX>STIM:{source}:{frames}<ETX>"
    params:
      - name: source
        type: enum
        description: "Same as SAUT source: 00=BKGD, 01=KEY1, 04=KEY2, 06=FTB"
      - name: frames
        type: integer
        description: "Transition time in frames, 000-999"
    response: ATIM

  - id: set_bus_transition
    label: Set Bus Transition (AUX MIX)
    kind: action
    command: SBTI
    format: "<STX>SBTI:{bus}:{enable}:{frames}<ETX>"
    params:
      - name: bus
        type: enum
        description: "01=AUX1, 02=AUX2"
      - name: enable
        type: enum
        description: "01=Enable, 02=Disable"
      - name: frames
        type: integer
        description: "Transition time in frames, 000-999"
    response: ABTI

  - id: set_transition_pattern
    label: Set Transition Pattern
    kind: action
    command: SPAT
    format: "<STX>SPAT:{type}:{pattern}<ETX>"
    params:
      - name: type
        type: enum
        description: "01=BKGD, 02=KEY1"
      - name: pattern
        type: enum
        description: "01-16=WIPE01-WIPE16"
    response: APAT

  - id: set_pinp
    label: Set PinP Parameters
    kind: action
    command: SPNP
    format: "<STX>SPNP:{target}:{x}:{y}:{size}:{border_width}:{border_color}<ETX>"
    params:
      - name: target
        type: enum
        description: "1=PinP (KEY1), 2=PinP (KEY2)"
      - name: x
        type: integer
        description: "Central X position, -10000 to +10000 (6 digits, e.g. -100.00 to +100.00)"
      - name: y
        type: integer
        description: "Central Y position, -10000 to +10000 (6 digits)"
      - name: size
        type: integer
        description: "0-10000 (5 digits, e.g. 0.00 to 100.00)"
      - name: border_width
        type: enum
        description: "0=None, 1=Small, 2=Medium, 3=Large, 4=keep current"
      - name: border_color
        type: enum
        description: "0=White, 1=Gray 1, 2=Gray 2, 3=Black, 4=keep current"
    response: APNP
```

## Feedbacks
```yaml
feedbacks:
  - id: bus_selection_response
    label: Bus Selection Response
    command: ABUS
    trigger: response to SBUS
    params:
      - name: bus
        type: enum
        description: "Same as SBUS bus parameter"
      - name: source
        type: enum
        description: "Same as SBUS source parameter"

  - id: bus_status_response
    label: Bus Status Response
    command: ABSC
    trigger: response to QBSC (TCP), or unsolicited UDP notification on bus change
    params:
      - name: bus
        type: enum
        description: "Same as SBUS bus parameter"
      - name: source
        type: enum
        description: "Same as SBUS source parameter"
    notes: "UDP notifications sent 3 times at 16 ms intervals when bus selection changes"

  - id: crosspoint_info_response
    label: Crosspoint Info Response
    command: ABST
    trigger: response to QBST
    params:
      - name: bus
        type: enum
        description: "00=Bus A, 01=Bus B, 02=PGM, 03=PVW, 04=KEY1-F, 05=KEY1-S, 06=KEY2-F, 07=KEY2-S, 14=AUX1, 15=AUX2"
      - name: crosspoint
        type: enum
        description: "00-11=XPT1-XPT12, 99=No selection"
      - name: tally
        type: enum
        description: "0=Tally Off, 1=Tally On"

  - id: source_name_response
    label: Source Name Response
    command: ASNM
    trigger: response to SSNM or QSNM
    params:
      - name: object
        type: enum
        description: "00=Source name"
      - name: source_object
        type: enum
        description: "Same as SSNM source_object"
      - name: name
        type: string
        description: "Source name, max 12 bytes"

  - id: key_coupling_response
    label: Key Signal Coupling Response
    command: AKRS
    trigger: response to SKRS or QKRS
    params:
      - name: status
        type: enum
        description: "00=Fill to Source, 01=Source to Fill"

  - id: auto_transition_time_response
    label: AUTO Transition Time Response
    command: ATIM
    trigger: response to QTIM or STIM
    params:
      - name: source
        type: enum
        description: "Same as SAUT source"
      - name: frames
        type: integer
        description: "Transition time in frames, 000-999"

  - id: bus_transition_response
    label: Bus Transition Status Response
    command: ABTI
    trigger: response to QBTI or SBTI
    params:
      - name: bus
        type: enum
        description: "01=AUX1, 02=AUX2"
      - name: enable
        type: enum
        description: "01=Enable, 02=Disable"
      - name: frames
        type: integer
        description: "Transition time in frames, 000-999"

  - id: transition_pattern_response
    label: Transition Pattern Response
    command: APAT
    trigger: response to QPAT or SPAT
    params:
      - name: type
        type: enum
        description: "01=BKGD, 02=KEY1"
      - name: pattern
        type: enum
        description: "01-16=WIPE01-WIPE16"

  - id: pinp_response
    label: PinP Parameter Response
    command: APNP
    trigger: response to QPNP or SPNP
    params:
      - name: target
        type: enum
        description: "1=PinP (KEY1), 2=PinP (KEY2)"
      - name: x
        type: integer
      - name: y
        type: integer
      - name: size
        type: integer
      - name: border_width
        type: enum
        description: "0=None, 1=Small, 2=Medium, 3=Large"
      - name: border_color
        type: enum
        description: "0=White, 1=Gray 1, 2=Gray 2, 3=Black"

  - id: error_response
    label: Error Response
    command: EROR
    trigger: error with control commands that have a response
    params:
      - name: error_code
        type: enum
        description: "01=Out of parameter range, 02=Syntax error (unrecognized command)"

  - id: tsl_tally_name
    label: TSL Protocol 5.0 Tally and Source Name
    protocol: TSL 5.0
    trigger: unsolicited UDP, sent at configurable intervals (16-80 ms) or on change
    notes: >
      Binary protocol, little-endian. Each DMSG block contains INDEX (2 bytes),
      CONTROL (2 bytes with RH tally, text tally, LH tally), LENGTH (2 bytes),
      TEXT (12 bytes source name). Full packet max 2048 bytes.
```

## Variables
```yaml
variables:
  - id: auto_transition_time
    label: AUTO Transition Time
    command_query: QTIM
    command_set: STIM
    params:
      - name: source
        type: enum
        description: "00=BKGD, 01=KEY1, 04=KEY2, 06=FTB"
    value:
      type: integer
      unit: frames
      range: "000-999"

  - id: bus_transition_enable
    label: Bus Transition Enable/Disable
    command_query: QBTI
    command_set: SBTI
    params:
      - name: bus
        type: enum
        description: "01=AUX1, 02=AUX2"
    value:
      type: enum
      values: [Enable, Disable]

  - id: bus_transition_time
    label: Bus Transition Time
    command_query: QBTI
    command_set: SBTI
    params:
      - name: bus
        type: enum
        description: "01=AUX1, 02=AUX2"
    value:
      type: integer
      unit: frames
      range: "000-999"

  - id: transition_pattern
    label: Transition Pattern
    command_query: QPAT
    command_set: SPAT
    params:
      - name: type
        type: enum
        description: "01=BKGD, 02=KEY1"
    value:
      type: enum
      values: ["WIPE01", "WIPE02", "WIPE03", "WIPE04", "WIPE05", "WIPE06", "WIPE07", "WIPE08", "WIPE09", "WIPE10", "WIPE11", "WIPE12", "WIPE13", "WIPE14", "WIPE15", "WIPE16"]

  - id: pinp_x_position
    label: PinP Central X Position
    command_query: QPNP
    command_set: SPNP
    params:
      - name: target
        type: enum
        description: "1=PinP (KEY1), 2=PinP (KEY2)"
    value:
      type: integer
      range: "-10000 to +10000"

  - id: pinp_y_position
    label: PinP Central Y Position
    command_query: QPNP
    command_set: SPNP
    params:
      - name: target
        type: enum
        description: "1=PinP (KEY1), 2=PinP (KEY2)"
    value:
      type: integer
      range: "-10000 to +10000"

  - id: pinp_size
    label: PinP Size
    command_query: QPNP
    command_set: SPNP
    params:
      - name: target
        type: enum
        description: "1=PinP (KEY1), 2=PinP (KEY2)"
    value:
      type: integer
      range: "0-10000"

  - id: key_coupling_mode
    label: Key Signal Coupling Mode
    command_query: QKRS
    command_set: SKRS
    value:
      type: enum
      values: ["Fill to Source", "Source to Fill"]

  - id: source_name_display_type
    label: Source Name Display Type
    command_set: SPST
    value:
      type: enum
      values: ["Default", "User"]

  - id: source_name
    label: Source Name
    command_query: QSNM
    command_set: SSNM
    params:
      - name: source_object
        type: enum
        description: "01-09=IN1-IN9, 227=AUX1, 228=AUX2"
    value:
      type: string
      max_length: 12
```

## Events
```yaml
events:
  - id: bus_change_notification
    label: Bus Selection Change Notification
    protocol: UDP
    command: ABSC
    description: >
      Sent via UDP when a bus selection changes. Repeated 3 times at 16 ms intervals.
      Format is same as ABSC response over TCP.
    params:
      - name: bus
        type: enum
        description: "Same as SBUS bus parameter"
      - name: source
        type: enum
        description: "Same as SBUS source parameter"

  - id: tsl_tally_update
    label: TSL Protocol 5.0 Tally/Name Update
    protocol: UDP
    description: >
      Binary UDP packets conforming to TSL Protocol 5.0. Sent at configurable
      intervals (16/32/48/64/80 ms) or on tally/name change. Contains source
      index, tally lamp state (Red/Green), and 12-byte source name per entry.
      Little-endian, max packet 2048 bytes.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes

- Command format: `<STX>` (0x02) + 4-char command + colon-separated parameters + `<ETX>` (0x03).
- Minimum command interval: 16 ms. Sending faster may cause errors.
- TCP connections timeout after 20 seconds of inactivity (no command sent within 20 s of the previous one).
- Maximum 20 simultaneous TCP connections.
- Factory-default IP: 192.168.0.8, subnet: 255.255.255.0. All network settings changeable from device MENU.
- Factory-default TCP port: 62000, UDP destination port: 65000 — both changeable from MENU.
- Setting IN1 source name changes both SDI IN1 and HDMI IN1 names simultaneously.
- ABSC over UDP is the only documented unsolicited notification (besides TSL 5.0 tally data).
- For KEY2 and FTB transitions, MIX is always used even if WIPE is specified.
- TSL 5.0 uses binary encoding (little-endian), distinct from the text-based TCP/UDP command protocol.

<!-- UNRESOLVED: power on/off control not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no audio control commands documented -->
<!-- UNRESOLVED: no key/fill material loading commands documented -->
<!-- UNRESOLVED: no still store management commands documented -->

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
retrieved_at: 2026-04-30T04:41:48.960Z
last_checked_at: 2026-04-25T21:43:50.480Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:43:50.480Z
matched_actions: 21
action_count: 21
confidence: low
summary: "All 21 spec actions matched verbatim in source; transport parameters verified; full command coverage"
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
