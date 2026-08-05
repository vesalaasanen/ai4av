---
spec_id: admin/roland-v_600uhd
schema_version: ai4av-public-spec-v1
revision: 3
title: "Roland V-600UHD Control Spec"
manufacturer: Roland
model_family: V-600UHD
aliases: []
compatible_with:
  manufacturers:
    - Roland
  models:
    - V-600UHD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/V-600UHD_reference_eng01_W.pdf
retrieved_at: 2026-06-08T13:10:54.097Z
last_checked_at: 2026-07-22T00:42:10.021Z
generated_at: 2026-07-22T00:42:10.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 baud rate selection method (9600 vs 38400) not documented"
  - "no remote power on/off command documented (power state changes may be physical-only)"
  - "source describes commands but not persistent state variables"
  - "no multi-step macro sequences described in source"
  - "GPI function assignment command format not provided — assignments done via System menu only"
  - "audio channel mapping (input audio channels 0-7 to physical audio inputs) not documented"
  - "DSK SRC Sel channel mapping not fully documented"
  - "ACS status response structure not detailed in source"
  - "no power on/off remote command documented (power state changes may be physical-only)"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:42:10.021Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched verbatim in source; transport parameters verified; complete coverage of command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Roland V-600UHD Control Spec

## Summary
The Roland V-600UHD is a 4K video switcher with 8 input channels supporting both LAN (TCP/Telnet on port 8023) and RS-232 for remote control. Commands are ASCII-encoded with STX prefix and semicolon terminator. Supports program/preset routing, transitions, composition, DSK, audio mixing, memory recall, and GPI/Tally.

<!-- UNRESOLVED: RS-232 baud rate selection method (9600 vs 38400) not documented -->
<!-- UNRESOLVED: no remote power on/off command documented (power state changes may be physical-only) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 8023
serial:
  baud_rate: 9600  # also supports 38,400; selection method not documented
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable removed: no power on/off remote command in source (Tier 2 rule requires power commands)
- routable  # PGM, PST, AUX routing commands present
- queryable  # ACS status query, VER version query present
- levelable  # IAL, OAL, OAX volume commands present
```

## Actions
```yaml
# Video-related
- id: select_pgm
  label: Select PGM Channel
  kind: action
  command: "PGM{a}"
  params:
    - name: channel
      type: integer
      description: Channel number 0 (CH 1) - 7 (CH 8)

- id: select_pst
  label: Select PST Channel
  kind: action
  command: "PST{a}"
  params:
    - name: channel
      type: integer
      description: Channel number 0 (CH 1) - 7 (CH 8)

- id: select_aux
  label: Select AUX Bus Channel
  kind: action
  command: "AUX{a}"
  params:
    - name: channel
      type: integer
      description: Channel number 0 (CH 1) - 7 (CH 8)

- id: select_transition_pattern
  label: Select Transition Pattern
  kind: action
  command: "TRS{a}"
  params:
    - name: pattern
      type: integer
      description: 0 (WIPE 1), 1 (WIPE 2), 2 (WIPE 3), 3 (MIX)

- id: set_transition_time
  label: Set Video Transition Time
  kind: action
  command: "TIM{a}"
  params:
    - name: time
      type: integer
      description: 0 (0.0 sec) - 40 (4.0 sec)

- id: auto_transition
  label: Press the [AUTO] Button
  kind: action
  command: "ATO"
  params: []

- id: cut
  label: Press the [CUT] Button
  kind: action
  command: "CUT"
  params: []

- id: select_composition_type
  label: Select COMPOSITION Type
  kind: action
  command: "CTY{a}"
  params:
    - name: type
      type: integer
      description: 0 (None), 1 (PinP1-1), 2 (PinP1-2), 3 (Key1), 4 (PinP1-1+Key1), 5 (PinP1-2+Key1)

- id: select_dsk_type
  label: Select DSK Type
  kind: action
  command: "DTY{a}"
  params:
    - name: type
      type: integer
      description: 0 (None), 1 (PinP2-1), 2 (PinP2-2), 3 (Key2), 4 (PinP2-1+Key2), 5 (PinP2-2+Key2)

- id: composition_button
  label: Press the [COMPOSITION] Button
  kind: action
  command: "CMP"
  params: []

- id: dsk_button
  label: Press the [DSK] Button
  kind: action
  command: "DSK"
  params: []

- id: set_output_fade
  label: Set Output Fade On/Off
  kind: action
  command: "FDE{a}"
  params:
    - name: state
      type: integer
      description: 0 (OFF), 1 (ON)

- id: set_output_fade_time
  label: Set Output Fade Time
  kind: action
  command: "FDT{a}"
  params:
    - name: time
      type: integer
      description: 0 (0.0 sec) - 100 (10.0 sec)

# Audio-related
- id: adjust_input_audio_level
  label: Adjust Input Audio Volume Level
  kind: action
  command: "IAL{a},{b}"
  params:
    - name: channel
      type: integer
      description: 0 (CH1) - 7 (TEST TONE)
    - name: level
      type: integer
      description: -801 (-INF dB), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)

- id: adjust_master_out_level
  label: Adjust Master Out Volume Level
  kind: action
  command: "OAL{a}"
  params:
    - name: level
      type: integer
      description: -801 (-INF dB), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)

- id: adjust_aux_bus_level
  label: Adjust AUX-bus Audio Volume Level
  kind: action
  command: "OAX{a}"
  params:
    - name: level
      type: integer
      description: -801 (-INF dB), -800 (-80.0 dB) - 0 (0.0 dB) - 100 (10.0 dB)

# System-related
- id: recall_memory
  label: Call Up Memory
  kind: action
  command: "MEM{a}"
  params:
    - name: memory
      type: integer
      description: Memory index 0 (1-1) - 63 (8-8)

- id: acquire_status
  label: Acquire V-600UHD Status
  kind: action
  command: "ACS"
  params: []

- id: version_info
  label: Get Version Information
  kind: query
  command: "VER"
  params: []

# Flow control (host -> device)
# FIX (rev 3): source states XON/XOFF are control code bytes 11H/13H, NOT ASCII
# text strings (see "Command Format": "XON (11H)/XOFF (13H) are the control codes").
# Previous revision incorrectly used the literal text "XON"/"XOFF" as the payload.
- id: flow_control_xon
  label: Flow Control XON
  kind: action
  command: "0x11"  # XON control code byte; not ASCII text, not STX-framed
  params: []

- id: flow_control_xoff
  label: Flow Control XOFF
  kind: action
  command: "0x13"  # XOFF control code byte; not ASCII text, not STX-framed
  params: []
```

## Feedbacks
```yaml
- id: ack
  type: string
  description: ACK (0x06) returned after each valid command
- id: error
  type: enum
  values:
    - "0"
    - "5"
  description: "0 = syntax error, 5 = out of range error; delivered as ERR:a (a = code)"
- id: version_info
  type: string
  description: "VER:V-600UHD,a; - version string, ASCII text"
- id: status_response
  type: string
  description: "Response to ACS status acquire; structure not detailed in source"
```

## Events
```yaml
- id: error_notification
  description: ERR:a sent spontaneously by device (a: 0 syntax / 5 out of range)
  source: "Commands spontaneously sent from the V-600UHD"
- id: xon_event
  description: XON (0x11) sent spontaneously by device for flow control
- id: xoff_event
  description: XOFF (0x13) sent spontaneously by device for flow control
```

## Variables
```yaml
# UNRESOLVED: source describes commands but not persistent state variables
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: After sending each command, verify ACK response before sending the next command
    source: "Command Reference: 'When sending a sequence of commands to the V-600UHD from a controller, after each one, be sure to verify that an ACK response is returned before sending the next command.'"
```

## Notes
- Command format: `STX + 3-letter command code + ":" + parameter(s) + ";"` (ASCII)
- STX = 0x02, ACK = 0x06, XON = 0x11, XOFF = 0x13 — these are control codes, not part of the ASCII command text stream
- RS-232 crossover (null-modem) cable required; internal crossover between DTR-DSR (pins 4<->6) and RTS-CTS (pins 7<->8) on V-600UHD side
- GPI trigger fixed at trailing edge (low: On); functions assigned via System menu > GPI
- GPI options per channel: None, PGM XPT1-8, PST XPT1-8, Memory Load1-1-8 (Bank 1 only), DSK SRC Sel1-8
- Tally output: open collector, max 12 V / 200 mA
- GPI input: photocoupler, no-voltage contact (make-contact), contact capacity DC 24 V 0.1 A or higher
- DB-25 TALLY/GPI connector, female; pin layout in source
- Memory index: 0 = 1-1, 63 = 8-8 (bank-row notation)
<!-- UNRESOLVED: RS-232 baud rate selection method (9600 vs 38400) not documented -->
<!-- UNRESOLVED: GPI function assignment command format not provided — assignments done via System menu only -->
<!-- UNRESOLVED: audio channel mapping (input audio channels 0-7 to physical audio inputs) not documented -->
<!-- UNRESOLVED: DSK SRC Sel channel mapping not fully documented -->
<!-- UNRESOLVED: ACS status response structure not detailed in source -->
<!-- UNRESOLVED: no power on/off remote command documented (power state changes may be physical-only) -->
```

---

**Diff vs rev 2:**
- `revision: 2 -> 3`
- Traits: removed `powerable` (no source support)
- Actions: `flow_control_xon` command `"XON"` -> `"0x11"`; `flow_control_xoff` command `"XOFF"` -> `"0x13"` (source: control codes 11H/13H)
- Added rev-3 fix note + 1 UNRESOLVED marker for power command

## Provenance

```yaml
source_domains:
  - static.roland.com
source_urls:
  - https://static.roland.com/assets/media/pdf/V-600UHD_reference_eng01_W.pdf
retrieved_at: 2026-06-08T13:10:54.097Z
last_checked_at: 2026-07-22T00:42:10.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:42:10.021Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched verbatim in source; transport parameters verified; complete coverage of command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 baud rate selection method (9600 vs 38400) not documented"
- "no remote power on/off command documented (power state changes may be physical-only)"
- "source describes commands but not persistent state variables"
- "no multi-step macro sequences described in source"
- "GPI function assignment command format not provided — assignments done via System menu only"
- "audio channel mapping (input audio channels 0-7 to physical audio inputs) not documented"
- "DSK SRC Sel channel mapping not fully documented"
- "ACS status response structure not detailed in source"
- "no power on/off remote command documented (power state changes may be physical-only)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
