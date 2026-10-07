---
spec_id: admin/epson-pl-home-cinema-5020ube-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson PL-Home Cinema 5020UBe Series Control Spec"
manufacturer: Epson
model_family: "PL-Home Cinema 5020UBe"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "PL-Home Cinema 5020UBe"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T12:50:21.688Z
last_checked_at: 2026-10-07T12:50:21.688Z
generated_at: 2026-10-07T12:50:21.688Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SPWRLVL 01"
  - "PL-Home Cinema 5020UBe is not explicitly listed in the applicable models table; command support is inferred from the broader ESC/VP21 home projector family"
  - "TCP/IP port number and session establishment details are in the ESC/VP.net protocol manual, not this source"
  - "firmware version compatibility not stated in source"
  - "TCP port number not stated in source (references ESC/VP.net protocol manual)"
  - "exact source command codes for the 5020UBe are not in this document;"
  - "specific response values for the 5020UBe are not documented in this source"
  - "no settable continuous parameters (volume, brightness, etc.) found in this source"
  - "no unsolicited notification events documented in this source"
  - "no multi-step sequences described in this source"
  - "specific power-on interlock requirements for the 5020UBe not stated in source"
  - "PL-Home Cinema 5020UBe not in the explicit applicable models list; using general ESC/VP21 home projector command set"
  - "TCP/IP port, connection sequence, and session management not documented here"
  - "specific source input codes for the 5020UBe hardware configuration not confirmed"
  - "serial connector pinout details beyond \"D-Sub 9pin\" not provided"
  - "command timing, response latency, and timeout behavior not documented"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:50:21.688Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 action units match literally and serial transport values are in the source. The 5020UBe is not in the applicable-models list, so the source is a generic same-class guide. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Epson PL-Home Cinema 5020UBe Series Control Spec

## Summary
Epson PL-Home Cinema 5020UBe is a home theater projector controllable via the ESC/VP21 ASCII command protocol over serial (RS-232C), USB, or TCP/IP network connections. This spec covers the ESC/VP21 command set as documented in Epson's command user's guide for home projectors. TCP/IP details (port, session setup) reference a separate ESC/VP.net protocol manual not included in this source.

<!-- UNRESOLVED: PL-Home Cinema 5020UBe is not explicitly listed in the applicable models table; command support is inferred from the broader ESC/VP21 home projector family -->
<!-- UNRESOLVED: TCP/IP port number and session establishment details are in the ESC/VP.net protocol manual, not this source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - usb
  - tcp  # source says commands can be sent after establishing a TCP session
addressing:
  # UNRESOLVED: TCP port number not stated in source (references ESC/VP.net protocol manual)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9pin
auth:
  type: UNRESOLVED  # source does not state this
```

## Traits
```yaml
- powerable   # inferred from PWR ON / PWR OFF commands
- routable    # inferred from SOURCE selection commands
- muteable    # inferred from MUTE ON / MUTE OFF commands
- queryable   # inferred from get command format (COMMAND ?)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  description: Turns the projector on from standby
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  description: Turns the projector to standby
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  description: Activates A/V mute
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  description: Deactivates A/V mute
  params: []

- id: blank_black
  label: Blank Screen Black
  kind: action
  command: "MSEL00"
  description: Sets blank screen to black
  params: []

- id: blank_blue
  label: Blank Screen Blue
  kind: action
  command: "MSEL01"
  description: Sets blank screen to blue
  params: []

- id: blank_user_logo
  label: Blank Screen User Logo
  kind: action
  command: "MSEL02"
  description: Sets blank screen to user logo
  params: []

- id: source_select
  label: Select Source
  kind: action
  command: "SOURCE {code}"
  description: >-
    Selects input source. The source code is model-dependent.
    Common codes include SOURCE 10 (INPUT 1 cyclic), SOURCE 11 (Analog RGB),
    SOURCE 14 (YCbCr), SOURCE 15 (YPbPr), SOURCE 1F (Auto),
    SOURCE 20 (INPUT 2 cyclic), SOURCE 21 (INPUT 2 Analog RGB),
    SOURCE 30 (INPUT 3 cyclic), SOURCE 31 (INPUT 3 Digital RGB),
    SOURCE 40 (VIDEO cyclic), SOURCE 41 (VIDEO RCA), SOURCE 42 (VIDEO S-Video),
    SOURCE A0 (HDMI), SOURCE D0 (WirelessHD).
  params:
    - name: code
      type: string
      description: Two-character source code (e.g. "10", "A0")

# UNRESOLVED: exact source command codes for the 5020UBe are not in this document;
# the command tables cover older models (TW series, PL-HomeCinema up to 8500UB/9500UB)
```

## Feedbacks
```yaml
- id: error
  label: Command Error
  type: flag
  response: "ERR\r:"
  description: >-
    Projector returns "ERR" followed by CR and ":" when an invalid command is received

- id: ready
  label: Ready Check
  type: flag
  query_command: "\r"
  description: >-
    Null command (CR / 0x0D). Projector returns ":" if operational

# UNRESOLVED: specific response values for the 5020UBe are not documented in this source
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (volume, brightness, etc.) found in this source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in this source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in this source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >-
  The PWR ON command may require one-time setup on some models. The source
  documents setup steps for TW200/TW200H and a setting requirement for TW500;
  it does not state the 5020UBe's requirements.
# UNRESOLVED: specific power-on interlock requirements for the 5020UBe not stated in source
```

## Notes
- The ESC/VP21 protocol uses ASCII command codes terminated by carriage return (0x0D).
- Set commands: projector returns ":" after successful execution.
- Get commands: append "?" to command; projector returns the parameter value.
- Null command (0x0D): projector returns ":" — useful for connectivity checks.
- Error response: "ERR" + 0x0D + ":" for invalid commands.
- INC/DEC/INIT step parameters are available for some commands (increment, decrement, initialize).
- TCP/IP network control references a separate ESC/VP.net protocol manual for session setup details.

<!-- UNRESOLVED: PL-Home Cinema 5020UBe not in the explicit applicable models list; using general ESC/VP21 home projector command set -->
<!-- UNRESOLVED: TCP/IP port, connection sequence, and session management not documented here -->
<!-- UNRESOLVED: specific source input codes for the 5020UBe hardware configuration not confirmed -->
<!-- UNRESOLVED: serial connector pinout details beyond "D-Sub 9pin" not provided -->
<!-- UNRESOLVED: command timing, response latency, and timeout behavior not documented -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T12:50:21.688Z
last_checked_at: 2026-10-07T12:50:21.688Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:50:21.688Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 action units match literally and serial transport values are in the source. The 5020UBe is not in the applicable-models list, so the source is a generic same-class guide. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SPWRLVL 01"
- "PL-Home Cinema 5020UBe is not explicitly listed in the applicable models table; command support is inferred from the broader ESC/VP21 home projector family"
- "TCP/IP port number and session establishment details are in the ESC/VP.net protocol manual, not this source"
- "firmware version compatibility not stated in source"
- "TCP port number not stated in source (references ESC/VP.net protocol manual)"
- "exact source command codes for the 5020UBe are not in this document;"
- "specific response values for the 5020UBe are not documented in this source"
- "no settable continuous parameters (volume, brightness, etc.) found in this source"
- "no unsolicited notification events documented in this source"
- "no multi-step sequences described in this source"
- "specific power-on interlock requirements for the 5020UBe not stated in source"
- "PL-Home Cinema 5020UBe not in the explicit applicable models list; using general ESC/VP21 home projector command set"
- "TCP/IP port, connection sequence, and session management not documented here"
- "specific source input codes for the 5020UBe hardware configuration not confirmed"
- "serial connector pinout details beyond \"D-Sub 9pin\" not provided"
- "command timing, response latency, and timeout behavior not documented"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
