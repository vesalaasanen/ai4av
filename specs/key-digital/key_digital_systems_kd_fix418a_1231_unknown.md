---
spec_id: admin/key-digital-systems-kd-fix418a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-FIX418A Control Spec"
manufacturer: "Key Digital"
model_family: KD-FIX418A
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-FIX418A
  firmware: "\"1.00\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.org
  - manualslib.com
source_urls:
  - "https://www.keydigital.org/web/content/74146/KD-FIX418A%20Manual.pdf"
  - https://www.manualslib.com/manual/1764204/Key-Digital-Kd-Fix418a.html
  - https://www.keydigital.org/product/kd-fix418a-1231
retrieved_at: 2026-07-13T06:26:54.054Z
last_checked_at: 2026-07-21T23:03:12.148Z
generated_at: 2026-07-21T23:03:12.148Z
firmware_coverage: "\"1.00\""
protocol_coverage: []
known_gaps:
  - "full EDID/link control semantics, error/fault behavior, video input selection, and product family (HDMI matrix / switcher / extender) not detailed in source"
  - "no scalar level variables found in source"
  - "no async event mechanism described in source"
  - "no macros documented"
  - "no safety warnings, interlock procedures, or power-on"
  - "exact prompt string sent as ack after each command not specified"
  - "precise byte-level framing (CR only vs CR+LF) beyond \"Carriage Return Required\" not specified"
  - "error response strings / fault codes not documented"
  - "EDID programmability and LINK control semantics not detailed"
  - "whether SPO ON/OFF gates power or only output mute not explicitly disambiguated"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:03:12.148Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched verbatim in source; transport parameters confirmed; full coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Key Digital Systems KD-FIX418A Control Spec

## Summary
The KD-FIX418A is a Key Digital Systems HDMI/audio device offering bi-directional control over an RS-232 serial interface via a 3.5mm TRS connector. This spec covers the documented serial command set: output power, debug mode, analog/digital audio enable, system address, baud-rate configuration, factory reset, plus status and help queries.

<!-- UNRESOLVED: full EDID/link control semantics, error/fault behavior, video input selection, and product family (HDMI matrix / switcher / extender) not detailed in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from SPO ON/OFF output command
  - queryable   # inferred from STA status query returning state
```

## Actions
```yaml
# Notes from source:
# - Commands NOT case-sensitive.
# - Spaces shown for clarity ONLY; transmitted command strings have NO spaces.
# - Carriage Return required at end of every command string.
# - All commands MAY carry a System Address prefix "Azz" where zz=[01-99]
#   (00 = single / no prefix). Prefix not shown in command templates below.
# - After a new command is received, a prompt is sent back (ack).

- id: help
  label: Help
  kind: query
  command: "H"
  params: []
  notes: "Returns entire API in readable format."

- id: status
  label: Status Query
  kind: query
  command: "STA"
  params: []
  notes: "Returns unit status and settings in readable format."

- id: set_output_power
  label: Set Output 01 Power
  kind: action
  command: "SPO{state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: "Turn video output 01 ON or OFF."

- id: set_debug_mode
  label: Set Debug Mode
  kind: action
  command: "SPODBG{state}"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: "Enable/disable debug mode."

- id: set_analog_audio
  label: Set External Analog Audio Output
  kind: action
  command: "SPOAA{state}"
  params:
    - name: state
      type: enum
      values: [E, D]
      description: "E=Enable, D=Disable external analog audio output."

- id: set_digital_audio
  label: Set External Digital Audio Output
  kind: action
  command: "SPODA{state}"
  params:
    - name: state
      type: enum
      values: [E, D]
      description: "E=Enable, D=Disable external digital audio output."

- id: set_system_address
  label: Set System Address
  kind: action
  command: "SPCA{address}"
  params:
    - name: address
      type: string
      description: "System address xx=[00-99]; 00 = single unit."

- id: set_rs232_baud_rate
  label: Set RS-232 Baud Rate
  kind: action
  command: "SPCRSB{rate}"
  params:
    - name: rate
      type: enum
      values: ["0", "1", "2", "3", "4"]
      description: "0=57600, 1=38400, 2=19200, 3=9600, 4=4800 bps."
  notes: "Changing baud rate reconfigures the active serial link; reconnect at new rate."

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "SPCDF"
  params: []
  notes: "Reset to factory defaults."
```

## Feedbacks
```yaml
# - After each received command the device sends a prompt back (command ack).
- id: command_ack_prompt
  type: raw
  description: "Prompt returned after each new command is received."

- id: status_response
  type: raw
  description: "Response to STA; multiline status block including system address, F/W version, RS-232 config, video input EDID/LINK, video output/LINK/DBG, audio output states."

- id: help_response
  type: raw
  description: "Response to H; entire API listing in readable format."
```

## Variables
```yaml
# Settable parameters tracked via STA are reflected as actions above (power,
# debug, analog/digital audio, system address, baud rate). No additional
# continuous variables (gain/level) documented in source.
# UNRESOLVED: no scalar level variables found in source
```

## Events
```yaml
# No unsolicited notifications documented; device sends a prompt only after
# receiving a command.
# UNRESOLVED: no async event mechanism described in source
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: no macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source.
```

## Notes
- Connector: 3.5mm TRS (stereo). Pinout — Tip = RS-232 Tx Data, Ring = RS-232 Rx Data, Sleeve = Ground.
- Carriage return (`\r`) required at the end of every command string.
- Commands are not case-sensitive.
- Spaces appear in the source's help listing for clarity only; transmitted commands must contain no spaces. Templates above already omit spaces (e.g. `SPOON`, `SPOAAE`, `SPCA01`, `SPCRSB3`).
- System Address prefix `Azz` (zz=[01-99], 00=single) may precede any command for multi-unit setups.
- Source-reported device state: F/W Version 1.00, System Address 00, RS-232 57600/8/N/1, Video Input EDID=DEFAULT 00 LINK=ON, Video Output ON/LINK=ON/DBG=OFF, Analog=Enabled, Digital=Enabled.
- Third-party terminal software (e.g. TeraTerm, PuTTY) used for communication.

<!-- UNRESOLVED: exact prompt string sent as ack after each command not specified -->
<!-- UNRESOLVED: precise byte-level framing (CR only vs CR+LF) beyond "Carriage Return Required" not specified -->
<!-- UNRESOLVED: error response strings / fault codes not documented -->
<!-- UNRESOLVED: EDID programmability and LINK control semantics not detailed -->
<!-- UNRESOLVED: whether SPO ON/OFF gates power or only output mute not explicitly disambiguated -->

## Provenance

```yaml
source_domains:
  - keydigital.org
  - manualslib.com
source_urls:
  - "https://www.keydigital.org/web/content/74146/KD-FIX418A%20Manual.pdf"
  - https://www.manualslib.com/manual/1764204/Key-Digital-Kd-Fix418a.html
  - https://www.keydigital.org/product/kd-fix418a-1231
retrieved_at: 2026-07-13T06:26:54.054Z
last_checked_at: 2026-07-21T23:03:12.148Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:03:12.148Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched verbatim in source; transport parameters confirmed; full coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full EDID/link control semantics, error/fault behavior, video input selection, and product family (HDMI matrix / switcher / extender) not detailed in source"
- "no scalar level variables found in source"
- "no async event mechanism described in source"
- "no macros documented"
- "no safety warnings, interlock procedures, or power-on"
- "exact prompt string sent as ack after each command not specified"
- "precise byte-level framing (CR only vs CR+LF) beyond \"Carriage Return Required\" not specified"
- "error response strings / fault codes not documented"
- "EDID programmability and LINK control semantics not detailed"
- "whether SPO ON/OFF gates power or only output mute not explicitly disambiguated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
