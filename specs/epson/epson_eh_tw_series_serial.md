---
spec_id: admin/epson-eh-tw-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EH-TW Series Control Spec"
manufacturer: Epson
model_family: EH-TW2800
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - EH-TW2800
    - EH-TW2900
    - EH-TW3000
    - EH-TW3200
    - EH-TW3500
    - EH-TW3600
    - EH-TW3800
    - EH-TW4000
    - EH-TW4400
    - EH-TW4500
    - EH-TW5000
    - EH-TW5500
    - EH-TW5800
    - EH-TW5900
    - EH-TW6000
    - EH-TW6000W
    - EH-TW420
    - EH-TW450
    - EH-TW8000
    - EH-TW8000W
    - EH-TW9000
    - EH-TW9000W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-01T06:57:18.607Z
last_checked_at: 2026-10-01T06:57:18.607Z
generated_at: 2026-10-01T06:57:18.607Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB connection details not provided in this source"
  - "TCP/IP connection details not provided (references ESC/VP.net manual)"
  - "Complete command set may be larger than what is documented here"
  - "TCP port number not stated in this source"
  - "no settable continuous variables (volume, brightness, etc.) found in this source"
  - "no unsolicited event/notification protocol described in this source"
  - "no safety warnings or interlock procedures found in this source"
  - "TCP/IP port and ESC/VP.net session setup not documented here"
  - "USB connection pinout and driver details not documented here"
  - "Full command set may include additional commands not in this source (e.g., SPWRLVL parameters)"
  - "Command timing/timeout requirements not stated"
  - "Lamp hours query and other diagnostic commands not documented in this source"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-01T06:57:18.607Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec action commands (PWR ON/OFF, MUTE ON/OFF, MSEL00/01/02, SOURCE family, null CR) match the source command table verbatim; transport values all verified. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# Epson EH-TW Series Control Spec

## Summary
Epson EH-TW series home projectors use the ESC/VP21 command protocol over RS-232C serial. Commands are ASCII-based and support power control, source selection, and screen blanking. Network (TCP/IP) and USB connections are also mentioned but TCP/IP details reference a separate ESC/VP.net manual.

<!-- UNRESOLVED: USB connection details not provided in this source -->
<!-- UNRESOLVED: TCP/IP connection details not provided (references ESC/VP.net manual) -->
<!-- UNRESOLVED: Complete command set may be larger than what is documented here -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source mentions TCP/IP network but defers to ESC/VP.net manual
addressing:
  # UNRESOLVED: TCP port number not stated in this source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9pin
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure mentioned in source)
```

## Traits
```yaml
- powerable    # inferred from PWR ON/OFF commands
- routable     # inferred from SOURCE selection commands
- queryable    # inferred from SOURCE ? get command format
- muteable     # inferred from MUTE ON/OFF and MSEL commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWR ON\r"
  response: ":"
  params: []
  notes: "Some models require preparation (see notes). TW200/TW200H need SPWRLVL 01 first. TW500 needs Network Monitoring set to ON."

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF\r"
  response: ":"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON\r"
  response: ":"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF\r"
  response: ":"
  params: []

- id: blank_black
  label: Blank Screen (Black)
  kind: action
  command: "MSEL00\r"
  response: ":"
  params: []

- id: blank_blue
  label: Blank Screen (Blue)
  kind: action
  command: "MSEL01\r"
  response: ":"
  params: []

- id: blank_user_logo
  label: Blank Screen (User Logo)
  kind: action
  command: "MSEL02\r"
  response: ":"
  params: []
  notes: "TW10/TW10H does not support User Logo function."

- id: select_source
  label: Select Source
  kind: action
  command: "SOURCE {source}\r"
  response: ":"
  params:
    - name: source
      type: string
      enum:
        - "10"  # INPUT 1/A cyclic
        - "11"  # AnalogRGB (INPUT 1)
        - "14"  # YCbCr/Component (INPUT 1)
        - "15"  # YPbPr/Component (INPUT 1)
        - "1F"  # Auto (INPUT 1)
        - "20"  # INPUT 2/B cyclic
        - "21"  # AnalogRGB (INPUT 2)
        - "30"  # INPUT 3 cyclic
        - "31"  # Digital RGB (INPUT 3)
        - "40"  # VIDEO cyclic
        - "41"  # VIDEO RCA
        - "42"  # VIDEO S-Video
        - "A0"  # HDMI
        - "D0"  # WirelessHD (TW8000/TW9000 series)
      description: "Two-character source code. Availability varies by model."

- id: null_command
  label: Null Command (Heartbeat)
  kind: action
  command: "\r"
  response: ":"
  params: []
  notes: "Confirms projector is operational. Sends CR (0x0D) only."
```

## Feedbacks
```yaml
- id: source_query
  label: Current Source
  type: string
  command: "SOURCE ?\r"
  response_format: "Returns current source code (e.g. 11, 41, A0)"
  values:
    - "10"
    - "11"
    - "12"
    - "13"
    - "14"
    - "15"
    - "1F"
    - "20"
    - "21"
    - "30"
    - "31"
    - "40"
    - "41"
    - "42"
    - "A0"
    - "D0"

- id: error_response
  label: Error
  type: enum
  values: [ERR]
  description: "Returned when an invalid command is received. Format: ERR + CR + colon"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables (volume, brightness, etc.) found in this source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in this source
```

## Macros
```yaml
- id: tw200_power_on_prep
  label: TW200/TW200H Power On Preparation
  steps:
    - description: "Turn on the projector manually"
    - command: "SPWRLVL 01\r"
      description: "Send after projector is ready to receive ESC/VP21 commands"
    - description: "Turn off the projector; PWR ON command will now work from standby"
  notes: "Required one-time preparation for TW200/TW200H to enable PWR ON command."

- id: tw500_power_on_prep
  label: TW500 Power On Preparation
  steps:
    - description: 'Set Network Monitoring to ON in Settings > Operation menu'
    - description: "Turn off projector once; PWR ON command will work from standby"
  notes: "Required setup for TW500 to enable PWR ON command."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in this source
```

## Notes
- ESC/VP21 commands are ASCII-based and protocol-independent (serial, USB, or TCP/IP).
- The source selection commands vary significantly by model. Not all SOURCE codes are valid for all projectors. Consult the per-model command tables in the source document.
- Error handling: projector returns "ERR" followed by CR (0x0D) and a colon for invalid commands.
- Get command format: append "?" to the command (e.g., `SOURCE ?`). Projector returns the current value.
- Set command format: `COMMAND PARAMETER`. Projector returns ":" on success.
- The actual serial command strings for power are `PWRON` and `PWROFF` (concatenated form used by some command models); the human-readable form is `PWR ON` / `PWR OFF`.
<!-- UNRESOLVED: TCP/IP port and ESC/VP.net session setup not documented here -->
<!-- UNRESOLVED: USB connection pinout and driver details not documented here -->
<!-- UNRESOLVED: Full command set may include additional commands not in this source (e.g., SPWRLVL parameters) -->
<!-- UNRESOLVED: Command timing/timeout requirements not stated -->
<!-- UNRESOLVED: Lamp hours query and other diagnostic commands not documented in this source -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-01T06:57:18.607Z
last_checked_at: 2026-10-01T06:57:18.607Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:57:18.607Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec action commands (PWR ON/OFF, MUTE ON/OFF, MSEL00/01/02, SOURCE family, null CR) match the source command table verbatim; transport values all verified. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB connection details not provided in this source"
- "TCP/IP connection details not provided (references ESC/VP.net manual)"
- "Complete command set may be larger than what is documented here"
- "TCP port number not stated in this source"
- "no settable continuous variables (volume, brightness, etc.) found in this source"
- "no unsolicited event/notification protocol described in this source"
- "no safety warnings or interlock procedures found in this source"
- "TCP/IP port and ESC/VP.net session setup not documented here"
- "USB connection pinout and driver details not documented here"
- "Full command set may include additional commands not in this source (e.g., SPWRLVL parameters)"
- "Command timing/timeout requirements not stated"
- "Lamp hours query and other diagnostic commands not documented in this source"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
