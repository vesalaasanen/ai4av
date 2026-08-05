---
spec_id: admin/sharp-electronics-pn-me502
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics PN-ME502 Control Spec"
manufacturer: Sharp
model_family: PN-ME652
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - PN-ME652
    - PN-ME552
    - PN-ME502
    - PN-ME432
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/PN-ME652-ME552-ME502-ME432_S-Format_command_manual_English_Rev1.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/PN-ME652-ME552-ME502-ME432_Secure_command_manual_en_Rev1.1.pdf
retrieved_at: 2026-08-05T06:21:53.410Z
last_checked_at: 2026-08-05T08:41:15.451Z
generated_at: 2026-08-05T08:41:15.451Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/power specs not in source. Firmware version compat not stated."
  - "login procedure described (username + password), credentials not specified in source"
  - "firmware version compat not stated. Voltage/power specs not in source. Credentials for LAN auth not specified (login procedure described but no default user/pass). Protocol version not stated. Return code byte sequence noted as 0DH 0AH or 0DH in one place — ambiguous, treat as CRLF."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:41:15.451Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions map to literal mnemonics (POWR, INPS, VOLM, MUTE, WIDE, INF1, SRNO, RSET, VLMP, PXCK) in the source command table, with shapes and enums aligned, and transport values (9600 baud, port 10008, login handshake) verified verbatim. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-05
---

# Sharp Electronics PN-ME502 Control Spec

## Summary
Sharp PN-ME series LCD monitor (PN-ME652/552/502/432) controlled via RS-232C (COM port) or LAN (TCP). Spec covers S-Format command set: power, input select, volume, mute, screen size, brightness, model/serial query, all reset, resolution check.

<!-- UNRESOLVED: voltage/power specs not in source. Firmware version compat not stated. -->

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
  port: 10008  # default LAN data port
auth:
  type: credentials  # UNRESOLVED: login procedure described (username + password), credentials not specified in source
  notes: "LAN login: send [username]+[space], receive [Password:], send [password]+[space], receive [OK]. Empty username/password permitted if unset. Send [BYE] + [space] to disconnect."
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWR on/off commands present
  - routable     # inferred: INPS input selection present
  - queryable    # inferred: R-direction commands return values
  - levelable    # inferred: VOLM, VLMP 0-100 level control present
```

## Actions
```yaml
# Command format: C1 C2 C3 C4 P1 P2 P3 P4 [return code 0DH 0AH]
# Parameter field is 4 chars, padded with spaces if needed.
# Direction W = write/set, R = read via "????" param, WR = both.
actions:
  - id: power_set
    label: Power Control
    kind: action
    command: "POWR{state}"
    params:
      - name: state
        type: enum
        values: ["0000", "0001"]
        description: "0000 = standby, 0001 = return from standby"
  - id: power_query
    label: Power State Query
    kind: query
    command: "POWR????"
    params: []
  - id: input_toggle
    label: Input Mode Toggle
    kind: action
    command: "INPS0000"
    params: []
  - id: input_select
    label: Input Mode Select
    kind: action
    command: "INPS{code}"
    params:
      - name: code
        type: enum
        values: ["0010", "0013", "0018", "0024", "0027", "0051", "0052", "0053", "0054", "0055", "0056"]
        description: "10=HDMI1, 13=HDMI2, 18=HDMI3, 24=HOME, 27=USB-C, 51-56=APPLICATION 1-6"
  - id: input_query
    label: Input Mode Query
    kind: query
    command: "INPS????"
    params: []
  - id: volume_set
    label: Volume Set
    kind: action
    command: "VOLM{level}"
    params:
      - name: level
        type: integer
        range: [0, 100]
        description: "4-digit zero-padded, e.g. 0030"
  - id: volume_query
    label: Volume Query
    kind: query
    command: "VOLM????"
    params: []
  - id: mute_set
    label: Mute Set
    kind: action
    command: "MUTE{state}"
    params:
      - name: state
        type: enum
        values: ["0000", "0001"]
        description: "0=Off, 1=On"
  - id: mute_query
    label: Mute Query
    kind: query
    command: "MUTE????"
    params: []
  - id: size_set
    label: Screen Size Set
    kind: action
    command: "WIDE{size}"
    params:
      - name: size
        type: enum
        values: ["0001", "0002", "0003", "0011", "0012"]
        description: "1=Wide, 2=Normal, 3=1:1, 11=Full, 12=Zoom"
  - id: size_query
    label: Screen Size Query
    kind: query
    command: "WIDE????"
    params: []
  - id: model_query
    label: Model Query
    kind: query
    command: "INF1????"
    params: []
  - id: serial_no_query
    label: Serial Number Query
    kind: query
    command: "SRNO????"
    params: []
  - id: all_reset
    label: All Reset
    kind: action
    command: "RSET0000"
    params: []
  - id: brightness_set
    label: Brightness Set
    kind: action
    command: "VLMP{level}"
    params:
      - name: level
        type: integer
        range: [0, 100]
        description: "4-digit zero-padded"
  - id: brightness_query
    label: Brightness Query
    kind: query
    command: "VLMP????"
    params: []
  - id: resolution_check
    label: Resolution Check
    kind: query
    command: "PXCK????"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, normal, input_signal_waiting]
    description: "Returned by POWR query: 0=standby, 1=normal, 2=input signal waiting"
  - id: input_mode
    type: enum
    values: [HDMI1, HDMI2, HDMI3, HOME, USB-C, APPLICATION_1, APPLICATION_2, APPLICATION_3, APPLICATION_4, APPLICATION_5, APPLICATION_6]
    description: "Returned by INPS query"
  - id: volume
    type: integer
    range: [0, 100]
    description: "Returned by VOLM query"
  - id: mute_state
    type: enum
    values: [off, on]
    description: "Returned by MUTE query"
  - id: screen_size
    type: enum
    values: [Wide, Normal, "1:1", Full, Zoom]
    description: "Returned by WIDE query"
  - id: model_name
    type: string
    description: "Returned by INF1 query"
  - id: serial_number
    type: string
    description: "Returned by SRNO query"
  - id: resolution
    type: string
    description: "Returned by PXCK query in form hhh,vvv"
  - id: response_ok
    type: literal
    value: "OK"
    description: "Return code (0DH,0AH) when command executed correctly"
  - id: response_err
    type: literal
    value: "ERR"
    description: "Return code when command unknown or unusable in current state"
  - id: response_wait
    type: literal
    value: "WAIT"
    description: "Return code when execution taking time; wait for value, do not send commands"
```

## Variables
```yaml
# No settable parameters outside discrete actions above.
```

## Events
```yaml
# No unsolicited notifications documented.
# LAN: [Login: ] prompt on connect, [Password: ] after username, [OK] after password, [Goodbye] on BYE.
```

## Macros
```yaml
# No multi-step sequences documented (login handshake is transport-level, see Transport.auth.notes).
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: all_reset
    notes: "Monitor restarts after ALL RESET. Wait >= 1 minute before sending next command."
  - command: power_set
    notes: "Perform buffer clear at sender before power On/Off. Wait >= 1 minute after power On/Off before next command."
timing:
  response_timeout: ">= 10 seconds recommended"
  inter_command_interval: ">= 100 ms between response and next command"
```

## Notes
- Command field is 4 prescribed alphanumerical chars; parameter field is 4 chars (0-9, +, -, space, ?), padded with spaces.
- Wrong: `VOLM30` — Right: `VOLM 30` (4-char param, space-padded).
- Direction "W" = set/write, "R" = read via `????`, "WR" = both.
- Commands marked `–` usable only when power on. `*` not usable in standby / input-signal-wait when Control Terminal=RS-232C or Power Save Mode=Low Power.
- RS-232 requires cross cable between COM port and monitor RS-232C terminal.
- ERR returned for unknown command or command unusable in current state. Nothing returned if connection bad. Resend recommended on ERR from interference.
- LAN auto-disconnect after "Auto Logout Time" elapses with no communication.
- Same command set used for RS-232C and LAN.

<!-- UNRESOLVED: firmware version compat not stated. Voltage/power specs not in source. Credentials for LAN auth not specified (login procedure described but no default user/pass). Protocol version not stated. Return code byte sequence noted as 0DH 0AH or 0DH in one place — ambiguous, treat as CRLF. -->
```

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/PN-ME652-ME552-ME502-ME432_S-Format_command_manual_English_Rev1.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/PN-ME652-ME552-ME502-ME432_Secure_command_manual_en_Rev1.1.pdf
retrieved_at: 2026-08-05T06:21:53.410Z
last_checked_at: 2026-08-05T08:41:15.451Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:41:15.451Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions map to literal mnemonics (POWR, INPS, VOLM, MUTE, WIDE, INF1, SRNO, RSET, VLMP, PXCK) in the source command table, with shapes and enums aligned, and transport values (9600 baud, port 10008, login handshake) verified verbatim. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/power specs not in source. Firmware version compat not stated."
- "login procedure described (username + password), credentials not specified in source"
- "firmware version compat not stated. Voltage/power specs not in source. Credentials for LAN auth not specified (login procedure described but no default user/pass). Protocol version not stated. Return code byte sequence noted as 0DH 0AH or 0DH in one place — ambiguous, treat as CRLF."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
