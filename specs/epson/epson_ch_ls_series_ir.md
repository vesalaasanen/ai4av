---
spec_id: admin/epson-ch-ls-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson CH-LS Series Control Spec"
manufacturer: Epson
model_family: "CH-LS Series"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "CH-LS Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T15:17:07.062Z
last_checked_at: 2026-09-08T22:17:09.398Z
generated_at: 2026-09-08T22:17:09.398Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is an ESC/VP21 guide whose \"Applicable models\" list names TW/PL-series home projectors (TW100 through TW9000W, PL-HomeCinema/ProCinema); CH-LS Series is not explicitly listed in the source model tables — per-model command availability flags in the source do not cover CH-LS"
  - "TCP port not stated in source; source defers to ESC/VP.net protocol manual"
  - "per-command response value formats not enumerated in source"
  - "source describes step parameters INC (increment by one), DEC"
  - "no unsolicited notifications documented in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "TCP port, USB communication parameters, firmware compatibility, response value formats, and CH-LS model applicability not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-08T22:17:09.398Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec commands (PWRON/PWROFF/MUTE/MSEL/SOURCE 1x-5x/Ax/Cx/Dx/null) appear verbatim in source and all transport values match. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson CH-LS Series Control Spec

## Summary
Epson home projector controlled via the ESC/VP21 ASCII command protocol. ESC/VP21 is transport-independent and can be carried over RS-232C serial, USB, or TCP/IP network. This spec covers power, A/V mute, mute-screen selection, and input/source selection commands, plus the command/response framing (set/get/null commands, colon acknowledgement, ERR for illegal commands).

<!-- UNRESOLVED: the source is an ESC/VP21 guide whose "Applicable models" list names TW/PL-series home projectors (TW100 through TW9000W, PL-HomeCinema/ProCinema); CH-LS Series is not explicitly listed in the source model tables — per-model command availability flags in the source do not cover CH-LS -->

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
  connector: D-Sub 9pin
  notes: RS-232C must be selected at Advanced Setting of the menu; projector input is Control(RS-232C)
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source; source defers to ESC/VP.net protocol manual
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from command evidence in source (Tier 2)
- powerable    # inferred: PWR ON / PWR OFF commands present
- routable     # inferred: SOURCE xx input-selection commands present
- queryable    # inferred: get command format (command + "?") described in source
```

## Actions
```yaml
# Framing: commands are ASCII; the null/terminator key code is Hex 0D (CR).
# Set commands return ":" after execution. Get commands append "?".
# Per-model availability varies - see source command tables and Notes.
- id: power_on
  label: Power On
  kind: action
  command: "PWRON"
  params: []
  notes: "TW200/TW200H require SPWRLVL 01 preparation (see Macros); TW500 requires Network Monitoring = ON"

- id: power_off
  label: Power Off
  kind: action
  command: "PWROFF"
  params: []

- id: spwrlvl_set
  label: Set Power On Level
  kind: action
  command: "SPWRLVL 01"
  params: []
  notes: "Prepares TW200/TW200H for PWR ON operation (see Macros)"

- id: mute_on
  label: A/V Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: A/V Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: mute_screen_black
  label: Mute Screen Black
  kind: action
  command: "MSEL00"
  params: []

- id: mute_screen_blue
  label: Mute Screen Blue
  kind: action
  command: "MSEL01"
  params: []

- id: mute_screen_user_logo
  label: Mute Screen User Logo
  kind: action
  command: "MSEL02"
  params: []
  notes: "TW10/TW10H does not support the User Logo function"

- id: null_command
  label: Null Command (liveness check)
  kind: query
  command: "0x0D"
  params: []
  notes: "Return key code (Hex 0D); projector returns a colon; used to confirm projector is in operation"

# --- Source selection: INPUT 1/A (SOURCE 1x) ---
- id: select_input1_cyclic
  label: Select Input 1/A (cyclic)
  kind: action
  command: "SOURCE 10"
  params: []
  notes: "Cycles within signals available on INPUT 1/A"

- id: select_input1_analogrgb
  label: Select Input 1/A AnalogRGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: select_input1_digital_rgb
  label: Select Input 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: select_input1_rgb_video
  label: Select Input 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: select_input1_ycbcr
  label: Select Input 1/A YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []
  notes: "On TW5500/HC700/TW450 models this command is get-only (*7 in source)"

- id: select_input1_ypbpr
  label: Select Input 1/A YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: select_input1_auto
  label: Select Input 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

# --- Source selection: INPUT 2/B (SOURCE 2x) ---
- id: select_input2_cyclic
  label: Select Input 2/B (cyclic)
  kind: action
  command: "SOURCE 20"
  params: []
  notes: "Cycles within signals available on INPUT 2/B"

- id: select_input2_analogrgb
  label: Select Input 2/B AnalogRGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: select_input2_rgb_video
  label: Select Input 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: select_input2_ycbcr
  label: Select Input 2/B YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: select_input2_ypbpr
  label: Select Input 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: select_input2_ypbpr_alt
  label: Select Input 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: select_input2_auto
  label: Select Input 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

# --- Source selection: INPUT 3 (SOURCE 3x) ---
- id: select_input3_cyclic
  label: Select Input 3 (cyclic)
  kind: action
  command: "SOURCE 30"
  params: []
  notes: "Cycles within signals available on INPUT 3"

- id: select_input3_digital_rgb
  label: Select Input 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: select_input3_rgb_video
  label: Select Input 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: select_input3_ycbcr
  label: Select Input 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: select_input3_ypbpr
  label: Select Input 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

# --- Source selection: VIDEO (SOURCE 4x) ---
- id: select_video_cyclic
  label: Select VIDEO (cyclic)
  kind: action
  command: "SOURCE 40"
  params: []
  notes: "Cycles within signals available on VIDEO"

- id: select_video_rca
  label: Select VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: select_video_s
  label: Select VIDEO (S)
  kind: action
  command: "SOURCE 42"
  params: []

- id: select_video_ycbcr
  label: Select VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: select_video_ypbpr
  label: Select VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

# --- Source selection: USB (SOURCE 5x) ---
- id: select_usb_easypmp
  label: Select USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

# --- Source selection: HDMI (SOURCE Ax) ---
- id: select_hdmi2
  label: Select HDMI2
  kind: action
  command: "SOURCE A0"
  params: []

- id: select_hdmi_digital_rgb
  label: Select HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: select_hdmi_rgb_video
  label: Select HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: select_hdmi_ycbcr
  label: Select HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: select_hdmi_ypbpr
  label: Select HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

# --- Source selection: INPUT 5 (SOURCE Cx) ---
- id: select_input5_cyclic
  label: Select Input 5 (cyclic)
  kind: action
  command: "SOURCE C0"
  params: []
  notes: "Cycles within signals available on INPUT 5"

- id: select_input5_scart
  label: Select Input 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: select_input5_ycbcr
  label: Select Input 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: select_input5_ypbpr
  label: Select Input 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: select_input5_auto
  label: Select Input 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

# --- Source selection: WirelessHD (SOURCE Dx) ---
- id: select_wirelesshd
  label: Select WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: select_wirelesshd_digital_rgb
  label: Select WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: select_wirelesshd_rgb_video
  label: Select WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: select_wirelesshd_ycbcr
  label: Select WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: select_wirelesshd_ypbpr
  label: Select WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  type: enum
  values: [":"]
  description: "Projector returns a colon after executing a set command or null command"

- id: illegal_command_error
  type: enum
  values: ["ERR"]
  description: 'Projector returns "ERR" plus return key code (Hex 0D) and a colon when it receives an invalid command'

- id: get_response
  type: string
  description: "Get command (command + ?) returns the response parameter"  # UNRESOLVED: per-command response value formats not enumerated in source
```

## Variables
```yaml
# UNRESOLVED: source describes step parameters INC (increment by one), DEC
# (decrement by one), INIT (initialize) usable with set commands, but does not
# enumerate which commands accept them or their ranges.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
- id: enable_pwr_on_tw200
  label: Enable PWR ON on TW200/TW200H
  steps:
    - "Turn on the projector"
    - 'Send "SPWRLVL 01" after the projector reaches the condition where it can receive ESC/VP21 commands'
    - "Turn off the projector once; PWR ON works after the projector enters standby state"
  notes: "TW500 alternative: set Network Monitoring (Operation in Setting menu) to ON, turn off once, then PWR ON works from standby"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the TW200/TW200H PWR ON prep macro.
```

## Notes
- ESC/VP21 command codes are ASCII; independent of communication protocol — serial, USB, or TCP/IP network can carry them. USB is a documented transport but has no serial-line parameters; TCP details defer to the ESC/VP.net protocol manual (not in source).
- Serial: select RS-232C at Advanced Setting of the menu. Connector D-Sub 9pin, projector input Control(RS-232C).
- Set commands consist of command + parameter; parameters are either fixed values (ON, OFF, 21) or step parameters (INC/DEC/INIT).
- Source model availability tables flag per-model support ("OK"/"-") for each SOURCE code; CH-LS Series does not appear in those tables — verify against real device before use.
- On TW10, source does not cycle within signals selectable on a terminal by these commands (*3).
<!-- UNRESOLVED: TCP port, USB communication parameters, firmware compatibility, response value formats, and CH-LS model applicability not stated in source -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T15:17:07.062Z
last_checked_at: 2026-09-08T22:17:09.398Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-08T22:17:09.398Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec commands (PWRON/PWROFF/MUTE/MSEL/SOURCE 1x-5x/Ax/Cx/Dx/null) appear verbatim in source and all transport values match. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is an ESC/VP21 guide whose \"Applicable models\" list names TW/PL-series home projectors (TW100 through TW9000W, PL-HomeCinema/ProCinema); CH-LS Series is not explicitly listed in the source model tables — per-model command availability flags in the source do not cover CH-LS"
- "TCP port not stated in source; source defers to ESC/VP.net protocol manual"
- "per-command response value formats not enumerated in source"
- "source describes step parameters INC (increment by one), DEC"
- "no unsolicited notifications documented in source"
- "source contains no safety warnings, interlock procedures, or"
- "TCP port, USB communication parameters, firmware compatibility, response value formats, and CH-LS model applicability not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
