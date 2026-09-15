---
spec_id: admin/epson-ch-ql3000w-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson CH-QL3000W Series Control Spec"
manufacturer: Epson
model_family: CH-QL3000W
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - CH-QL3000W
    - CH-QL3000B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-19T04:31:21.183Z
last_checked_at: 2026-09-08T22:17:05.305Z
generated_at: 2026-09-08T22:17:05.305Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "CH-QL3000W is not explicitly listed in the \"Applicable models\" section of the source; commands below are ESC/VP21 generic. Verify against the dedicated CH-QL3000W manual before relying on any action."
  - "source mentions RS-232C menu setting required"
  - "TCP port and any base URL not stated in source"
  - "source documents a generic \"?\" get-command format (Section 2.2) and lists"
  - "source describes INC/DEC/INIT step parameters (Section 2.1) but does not"
  - "source does not describe unsolicited notification messages."
  - "source does not describe multi-step macro sequences."
  - "source does not document safety warnings, interlocks, or power-on"
  - "TCP port not stated in source. UNRESOLVED: auth credentials not stated in source. UNRESOLVED: firmware compatibility not stated in source. UNRESOLVED: full CH-QL3000W command set not stated in source (only generic ESC/VP21 applicable to legacy Epson projector families)."
verification:
  verdict: verified
  checked_at: 2026-09-08T22:17:05.305Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions map1:1 to distinct ASCII command tokens documented in the source's Section 4 tables; transport params9600/8N1/D-Sub 9-pin all verbatim in Section 5.1. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Epson CH-QL3000W Series Control Spec

## Summary
Control spec for the Epson CH-QL3000W Series projectors, populated from the vendor ESC/VP21 protocol manual. Source documents ASCII command set usable over serial (RS-232C), USB, and TCP/IP. Model-specific command support and TCP port are not stated in the provided source excerpt.

<!-- UNRESOLVED: CH-QL3000W is not explicitly listed in the "Applicable models" section of the source; commands below are ESC/VP21 generic. Verify against the dedicated CH-QL3000W manual before relying on any action. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9-pin
  # UNRESOLVED: source mentions RS-232C menu setting required
addressing:
  base_url: ""  # UNRESOLVED: TCP port and any base URL not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from PWR ON/OFF commands
- routable        # inferred from SOURCE command family
- queryable       # inferred from "?" get-command format
```

## Actions
```yaml
- id: null_command
  label: Null command (keep-alive)
  kind: action
  command: "\r"  # CR (Hex 0D)
  params: []
  notes: "Source: Section 2.3. Projector returns ':' when operational."

- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []
  notes: "Source: Section 4. PWRON equivalent. (*1) notes special prep steps for some legacy models."

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []
  notes: "Source: Section 4. PWROFF equivalent."

- id: mute_on
  label: Mute On (PWR OFF note4)
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: source_select_input1_cycle
  label: Source Select INPUT1 cyclic
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_select_input2_cycle
  label: Source Select INPUT2 cyclic
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_select_input3_cycle
  label: Source Select INPUT3 cyclic
  kind: action
  command: "SOURCE 30"
  params: []
  notes: "Available on models with INPUT 3."

- id: source_select_video_cycle
  label: Source Select VIDEO cyclic
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_select_video_rca
  label: Source Select VIDEO (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_select_video_s
  label: Source Select VIDEO (S-Video)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_select_video_ycbcr
  label: Source Select VIDEO (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []
  notes: "Source: only OK for TW100 in documented applicability table."

- id: source_select_video_ypbpr
  label: Source Select VIDEO (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []
  notes: "Source: only OK for TW100 in documented applicability table."

- id: source_select_input1_analog_rgb
  label: Source Select INPUT1 Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_select_input1_digital_rgb
  label: Source Select INPUT1 Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_select_input1_rgb_video
  label: Source Select INPUT1 RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_select_input1_ycbcr
  label: Source Select INPUT1 YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_select_input1_ypbpr
  label: Source Select INPUT1 YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_select_input1_auto
  label: Source Select INPUT1 Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_select_input2_analog_rgb
  label: Source Select INPUT2 Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_select_input2_rgb_video
  label: Source Select INPUT2 RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_select_input2_ycbcr
  label: Source Select INPUT2 YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_select_input2_ypbpr
  label: Source Select INPUT2 YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_select_input2_ypbpr_alt
  label: Source Select INPUT2 YPbPr (alt)
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_select_input2_auto
  label: Source Select INPUT2 Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_select_input3_digital_rgb
  label: Source Select INPUT3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_select_input3_rgb_video
  label: Source Select INPUT3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []
  notes: "Source: documented for TW8000/TW9000/TW8000W/TW9000W and TW5900/TW6000/TW6000W."

- id: source_select_input3_ycbcr
  label: Source Select INPUT3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_select_input3_ypbpr
  label: Source Select INPUT3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_select_easymp_usb
  label: Source Select USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_select_input5_cycle
  label: Source Select INPUT5 cyclic
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_select_input5_scart
  label: Source Select INPUT5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_select_input5_ycbcr
  label: Source Select INPUT5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_select_input5_ypbpr
  label: Source Select INPUT5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_select_input5_auto
  label: Source Select INPUT5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_select_hdmi2_hdmi
  label: Source Select HDMI2 HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_select_hdmi2_digital_rgb
  label: Source Select HDMI2 Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_select_hdmi2_rgb_video
  label: Source Select HDMI2 RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_select_hdmi2_ycbcr
  label: Source Select HDMI2 YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_select_hdmi2_ypbpr
  label: Source Select HDMI2 YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_select_wirelesshd
  label: Source Select WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_select_wirelesshd_digital_rgb
  label: Source Select WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_select_wirelesshd_rgb_video
  label: Source Select WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_select_wirelesshd_ycbcr
  label: Source Select WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_select_wirelesshd_ypbpr
  label: Source Select WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: msel_black
  label: Test Pattern Black
  kind: action
  command: "MSEL00"
  params: []

- id: msel_blue
  label: Test Pattern Blue
  kind: action
  command: "MSEL01"
  params: []

- id: msel_user_logo
  label: Test Pattern User Logo
  kind: action
  command: "MSEL02"
  params: []
  notes: "Source: (*2) legacy TW10/TW10H do not support User Logo."

# UNRESOLVED: source documents a generic "?" get-command format (Section 2.2) and lists
# specific command codes, but does not enumerate which commands are queryable on
# CH-QL3000W. Construct GET-style actions only after confirming against the
# CH-QL3000W-specific manual.
```

## Feedbacks
```yaml
# Source documents generic response format: ":" on success, "ERR" + CR (Hex 0D) + ":"
# on illegal command (Sections 2.1, 2.4).
- id: command_ack
  type: enum
  values: [ok, error]
  notes: "':' indicates success; 'ERR\\r:' indicates illegal command."
```

## Variables
```yaml
# UNRESOLVED: source describes INC/DEC/INIT step parameters (Section 2.1) but does not
# enumerate which commands on CH-QL3000W accept these step parameters.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notification messages.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on
# sequencing specific to CH-QL3000W.
```

## Notes
- Source is the generic ESC/VP21 manual; CH-QL3000W is not listed in the "Applicable models" section. Treat the action list as a candidate set requiring verification against the CH-QL3000W-specific protocol guide.
- Serial communication per source Appendix 5.1: RS-232C, 9600 bps, 8N1, no flow control, D-Sub 9-pin. The "RS-232C" option must be selected under Advanced Setting in the projector's menu.
- Command format: ASCII codes terminated by CR (Hex 0D). Set command = `COMMAND PARAM`; Get command = `COMMAND?`. Success response = `:`. Illegal command response = `ERR\r:`. Null command (CR alone) returns `:` and can be used to confirm the projector is responsive.
- Source references an external "ESC/VP.net protocol manual" for TCP/IP session setup; that document is not included in the provided source, so TCP port, base URL, and any TCP-specific framing remain unresolved.
- USB connection is documented as supported by ESC/VP21 in principle but no USB-specific parameters are stated in the provided source.

<!-- UNRESOLVED: TCP port not stated in source. UNRESOLVED: auth credentials not stated in source. UNRESOLVED: firmware compatibility not stated in source. UNRESOLVED: full CH-QL3000W command set not stated in source (only generic ESC/VP21 applicable to legacy Epson projector families). -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-19T04:31:21.183Z
last_checked_at: 2026-09-08T22:17:05.305Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-08T22:17:05.305Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions map1:1 to distinct ASCII command tokens documented in the source's Section 4 tables; transport params9600/8N1/D-Sub 9-pin all verbatim in Section 5.1. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "CH-QL3000W is not explicitly listed in the \"Applicable models\" section of the source; commands below are ESC/VP21 generic. Verify against the dedicated CH-QL3000W manual before relying on any action."
- "source mentions RS-232C menu setting required"
- "TCP port and any base URL not stated in source"
- "source documents a generic \"?\" get-command format (Section 2.2) and lists"
- "source describes INC/DEC/INIT step parameters (Section 2.1) but does not"
- "source does not describe unsolicited notification messages."
- "source does not describe multi-step macro sequences."
- "source does not document safety warnings, interlocks, or power-on"
- "TCP port not stated in source. UNRESOLVED: auth credentials not stated in source. UNRESOLVED: firmware compatibility not stated in source. UNRESOLVED: full CH-QL3000W command set not stated in source (only generic ESC/VP21 applicable to legacy Epson projector families)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
