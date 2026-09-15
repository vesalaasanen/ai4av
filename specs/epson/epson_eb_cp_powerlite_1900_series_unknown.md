---
spec_id: admin/epson-eb-cp-powerlite-1900-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson EB CP PowerLite 1900 Series Control Spec"
manufacturer: Epson
model_family: "EB CP PowerLite 1900 Series"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "EB CP PowerLite 1900 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T16:01:19.956Z
last_checked_at: 2026-09-08T22:17:38.506Z
generated_at: 2026-09-08T22:17:38.506Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document's \"Applicable models\" list (Section 3) does NOT include the PowerLite 1900 / EB CP family. The PowerLite 1900 Series is typically a commercial/installation line and may use a different command protocol (ESC/VP.NET or EasyMP.net). This spec is generated against the home-projector ESC/VP21 guide as best-available evidence; if the PowerLite 1900 Series is not ESC/VP21-compatible, the commands below will not work."
  - "TCP/IP port number not stated in source (source defers to ESC/VP.net protocol manual for network details)"
  - "source describes step parameters (INC / DEC / INIT) as part of the command format (§2.1) but does not enumerate which specific Epson commands accept step parameters."
  - "source does not document unsolicited notifications from the projector."
  - "source does not document multi-step macro sequences."
  - "source does not contain safety warnings, interlock procedures, or power-on sequencing requirements beyond the TW200/TW200H \"SPWRLVL 01\" prerequisite for PWR ON (which is a model-specific setup note, not a safety interlock)."
  - "PowerLite 1900 Series family membership in the ESC/VP21 home-projector model list is not stated. Source mentions RS-232C selection via \"Advanced Setting of the Menu\" — this menu path likely differs on the PowerLite 1900 Series."
verification:
  verdict: verified
  checked_at: 2026-09-08T22:17:38.506Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions have literal command tokens present in the source command table; transport parameters (9600/8N1) verbatim in source §5.1. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson EB CP PowerLite 1900 Series Control Spec

## Summary
This spec covers the Epson EB CP PowerLite 1900 Series projector family via the ESC/VP21 ASCII command protocol. ESC/VP21 transports over serial (RS-232C), USB, and TCP/IP networks. The source document is the Epson ESC/VP21 Command User's Guide for home projectors and enumerates the generic PWR, MUTE, MSEL, and SOURCE command sets that apply across all listed models.

<!-- UNRESOLVED: source document's "Applicable models" list (Section 3) does NOT include the PowerLite 1900 / EB CP family. The PowerLite 1900 Series is typically a commercial/installation line and may use a different command protocol (ESC/VP.NET or EasyMP.net). This spec is generated against the home-projector ESC/VP21 guide as best-available evidence; if the PowerLite 1900 Series is not ESC/VP21-compatible, the commands below will not work. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - usb  # documented in source §1 "USB connection"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source

# UNRESOLVED: TCP/IP port number not stated in source (source defers to ESC/VP.net protocol manual for network details)
```

## Traits
```yaml
- powerable  # inferred from PWR ON / PWR OFF / PWRON / PWROFF command examples
- routable  # inferred from SOURCE command examples (input selection)
- queryable  # inferred from "?" get-command format described in §2.2
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []

- id: power_on_alt
  label: Power On (alternate opcode)
  kind: action
  command: "PWRON"
  params: []

- id: power_off_alt
  label: Power Off (alternate opcode)
  kind: action
  command: "PWROFF"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: test_pattern_black
  label: Test Pattern - Black
  kind: action
  command: "MSEL00"
  params: []

- id: test_pattern_blue
  label: Test Pattern - Blue
  kind: action
  command: "MSEL01"
  params: []

- id: test_pattern_user_logo
  label: Test Pattern - User Logo
  kind: action
  command: "MSEL02"
  params: []

# Source-select commands - each row from the source table is enumerated as a separate action.
- id: source_input1_cyclic
  label: Source - INPUT 1/A (cyclic)
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_input1_analog_rgb
  label: Source - INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_input1_digital_rgb
  label: Source - INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_input1_rgb_video
  label: Source - INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_input1_ycbcr
  label: Source - INPUT 1/A YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_input1_ypbpr
  label: Source - INPUT 1/A YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_input1_auto
  label: Source - INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_input2_cyclic
  label: Source - INPUT 2/B (cyclic)
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_input2_analog_rgb
  label: Source - INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_input2_rgb_video
  label: Source - INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_input2_ycbcr
  label: Source - INPUT 2/B YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_input2_ypbpr
  label: Source - INPUT 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_input2_ypbpr_alt
  label: Source - INPUT 2/B YPbPr (alternate)
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_input2_auto
  label: Source - INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_input3_cyclic
  label: Source - INPUT 3 (cyclic)
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_input3_digital_rgb
  label: Source - INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_input3_rgb_video_tw8k
  label: Source - INPUT 3 RGB Video (TW8000/TW9000/W only)
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_input3_ycbcr_tw8k
  label: Source - INPUT 3 YCbCr (TW8000/TW9000/W only)
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_input3_ypbpr_tw8k
  label: Source - INPUT 3 YPbPr (TW8000/TW9000/W only)
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_input5_cyclic
  label: Source - INPUT 5 (cyclic)
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_input5_scart
  label: Source - INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_input5_ycbcr
  label: Source - INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_input5_ypbpr
  label: Source - INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_input5_auto
  label: Source - INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_video_cyclic
  label: Source - VIDEO (cyclic)
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_video_rca
  label: Source - VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_video_s
  label: Source - VIDEO (S-Video)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_video_ycbcr
  label: Source - VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_video_ypbpr
  label: Source - VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_usb_easymp
  label: Source - USB EasyMP (TW5900/TW6000/W only)
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_hdmi_cyclic
  label: Source - HDMI (cyclic)
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_hdmi_digital_rgb
  label: Source - HDMI Digital RGB (TW8000/TW9000/W only)
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_hdmi_rgb_video
  label: Source - HDMI RGB Video (TW8000/TW9000/W only)
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_hdmi_ycbcr
  label: Source - HDMI YCbCr (TW8000/TW9000/W only)
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_hdmi_ypbpr
  label: Source - HDMI YPbPr (TW8000/TW9000/W only)
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_wirelesshd_cyclic
  label: Source - WirelessHD (cyclic)
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_wirelesshd_digital_rgb
  label: Source - WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_wirelesshd_rgb_video
  label: Source - WirelessHD RGB Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_wirelesshd_ycbcr
  label: Source - WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_wirelesshd_ypbpr
  label: Source - WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: null_command
  label: Null Command (keepalive)
  kind: action
  command: "\r"  # Hex 0D carriage return
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  type: enum
  values: [colon]
  description: "Success acknowledgement. Projector returns a colon (:) after executing a valid set command."

- id: get_response
  type: string
  description: "Response parameter returned after executing a get command (format depends on the queried command)."

- id: illegal_command_response
  type: enum
  values: [err]
  description: "Projector returns ERR followed by carriage return (Hex 0D) and colon for invalid commands."
```

## Variables
```yaml
# UNRESOLVED: source describes step parameters (INC / DEC / INIT) as part of the command format (§2.1) but does not enumerate which specific Epson commands accept step parameters.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the projector.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlock procedures, or power-on sequencing requirements beyond the TW200/TW200H "SPWRLVL 01" prerequisite for PWR ON (which is a model-specific setup note, not a safety interlock).
```

## Notes
- Source document is the ESC/VP21 Command User's Guide for Epson home projectors. Section 3 lists 50+ applicable models, but the EB CP PowerLite 1900 Series is NOT among them. This spec is generated against the home-projector guide as best-available evidence.
- Communication protocol is ASCII-coded ESC/VP21 commands terminated by CR (Hex 0D). Set commands return ":" on success. Get commands append "?" to the command mnemonic. Invalid commands return "ERR\r:".
- Serial link parameters (baud 9600, 8N1, no flow control, D-Sub 9-pin) apply only to RS-232C-capable models in the source list; PowerLite 1900 Series compatibility not confirmed.
- TCP/IP transport details (port number, wire framing) are deferred to a separate ESC/VP.net protocol manual not provided in source.
- Source §4 note (*1): TW200/TW200H require a one-time "SPWRLVL 01" setup + power cycle before PWR ON will work. TW500 requires "Network Monitoring = ON" in the Operation settings menu before PWR ON works.

<!-- UNRESOLVED: PowerLite 1900 Series family membership in the ESC/VP21 home-projector model list is not stated. Source mentions RS-232C selection via "Advanced Setting of the Menu" — this menu path likely differs on the PowerLite 1900 Series. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T16:01:19.956Z
last_checked_at: 2026-09-08T22:17:38.506Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-08T22:17:38.506Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions have literal command tokens present in the source command table; transport parameters (9600/8N1) verbatim in source §5.1. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document's \"Applicable models\" list (Section 3) does NOT include the PowerLite 1900 / EB CP family. The PowerLite 1900 Series is typically a commercial/installation line and may use a different command protocol (ESC/VP.NET or EasyMP.net). This spec is generated against the home-projector ESC/VP21 guide as best-available evidence; if the PowerLite 1900 Series is not ESC/VP21-compatible, the commands below will not work."
- "TCP/IP port number not stated in source (source defers to ESC/VP.net protocol manual for network details)"
- "source describes step parameters (INC / DEC / INIT) as part of the command format (§2.1) but does not enumerate which specific Epson commands accept step parameters."
- "source does not document unsolicited notifications from the projector."
- "source does not document multi-step macro sequences."
- "source does not contain safety warnings, interlock procedures, or power-on sequencing requirements beyond the TW200/TW200H \"SPWRLVL 01\" prerequisite for PWR ON (which is a model-specific setup note, not a safety interlock)."
- "PowerLite 1900 Series family membership in the ESC/VP21 home-projector model list is not stated. Source mentions RS-232C selection via \"Advanced Setting of the Menu\" — this menu path likely differs on the PowerLite 1900 Series."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
