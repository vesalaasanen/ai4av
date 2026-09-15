---
spec_id: admin/epson-ch-tw-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson CH-TW Series ESC/VP21 Control Spec"
manufacturer: Epson
model_family: CH-TW2800
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - CH-TW2800
    - CH-TW2900
    - CH-TW3000
    - CH-TW3200
    - CH-TW3500
    - CH-TW3600
    - CH-TW3800
    - CH-TW4000
    - CH-TW4400
    - CH-TW4500
    - CH-TW5000
    - CH-TW5500
    - CH-TW5800
    - CH-TW420
    - CH-TW450
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T19:59:08.056Z
last_checked_at: 2026-09-08T22:17:23.266Z
generated_at: 2026-09-08T22:17:23.266Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB and TCP/IP transport details are referenced but not specified in this document. See ESC/VP.net protocol manual and USB Appendix for those transports."
  - "settable parameters beyond fixed-value commands are not enumerated in this source."
  - "this source describes no unsolicited event messages."
  - "source describes no multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "USB transport command details not in this document."
  - "TCP/IP transport command details not in this document."
  - "get-command response parameter encoding not catalogued per command in this source."
verification:
  verdict: verified
  checked_at: 2026-09-08T22:17:23.266Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions (PWR/MUTE/MSEL/SPWRLVL/40 SOURCE variants/null) have verbatim wire-level matches in source; transport matches exactly. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson CH-TW Series ESC/VP21 Control Spec

## Summary
Control spec for the Epson CH-TW series home projectors (EH-TW2800/TW2900/TW3000/TW3200/TW3500/TW3600/TW3800/TW4000/TW4400/TW4500/TW5000/TW5500/TW5800 and EH-TW420/TW450) using the ESC/VP21 ASCII command protocol over RS-232C serial. Commands are plain ASCII terminated by CR (Hex 0D); projector replies with `:` on success or `ERR\r\n:` on invalid input.

<!-- UNRESOLVED: USB and TCP/IP transport details are referenced but not specified in this document. See ESC/VP.net protocol manual and USB Appendix for those transports. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: D-Sub 9-pin
  projector_input: Control (RS-232C)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # inferred from PWR ON / PWR OFF command examples
- routable      # inferred from SOURCE command examples
- queryable     # inferred from null command and get-command format documented
- muteable      # inferred from MUTE ON / MUTE OFF command examples
```

## Actions
```yaml
# Enumerate every distinct command-bearing entry the source documents.

- id: null_command
  label: Null Command
  kind: action
  command: "\r"
  description: Return key code (Hex 0D). Projector replies `:` if operational.
  params: []

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
  notes: Not supported on TW10/TW10H.

- id: source_cycle_input1
  label: Source Change - INPUT 1/A Cyclic
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_analog_rgb_input1
  label: Source Change - INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_digital_rgb_input1
  label: Source Change - INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_rgb_video_input1
  label: Source Change - INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_ycbcr_input1
  label: Source Change - INPUT 1/A YCbCr
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_ypbpr_input1
  label: Source Change - INPUT 1/A YPbPr
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_auto_input1
  label: Source Change - INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_cycle_input2
  label: Source Change - INPUT 2/B Cyclic
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_analog_rgb_input2
  label: Source Change - INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_rgb_video_input2
  label: Source Change - INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_ycbcr_input2
  label: Source Change - INPUT 2/B YCbCr
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_ypbpr_input2
  label: Source Change - INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_ypbpr_alt_input2
  label: Source Change - INPUT 2/B YPbPr (alt)
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_auto_input2
  label: Source Change - INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_cycle_input3
  label: Source Change - INPUT 3 Cyclic
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_digital_rgb_input3
  label: Source Change - INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_rgb_video_input3
  label: Source Change - INPUT 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_ycbcr_input3
  label: Source Change - INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_ypbpr_input3
  label: Source Change - INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_cycle_input5
  label: Source Change - INPUT 5 Cyclic
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_scart_input5
  label: Source Change - INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_ycbcr_input5
  label: Source Change - INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_ypbpr_input5
  label: Source Change - INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_auto_input5
  label: Source Change - INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_hdmi2
  label: Source Change - HDMI2 HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_hdmi_digital_rgb
  label: Source Change - HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_hdmi_rgb_video
  label: Source Change - HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_hdmi_ycbcr
  label: Source Change - HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_hdmi_ypbpr
  label: Source Change - HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_usb_easymp
  label: Source Change - USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_wirelesshd
  label: Source Change - WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_wirelesshd_digital_rgb
  label: Source Change - WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_wirelesshd_rgb_video
  label: Source Change - WirelessHD RGB-Video
  kind: action
  command: "SOURCE D3"
  params: []

- id: source_wirelesshd_ycbcr
  label: Source Change - WirelessHD YCbCr
  kind: action
  command: "SOURCE D4"
  params: []

- id: source_wirelesshd_ypbpr
  label: Source Change - WirelessHD YPbPr
  kind: action
  command: "SOURCE D5"
  params: []

- id: source_cycle_video
  label: Source Change - VIDEO Cyclic
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_video_rca
  label: Source Change - VIDEO RCA
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_video_s
  label: Source Change - VIDEO S
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_video_ycbcr
  label: Source Change - VIDEO YCbCr
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_video_ypbpr
  label: Source Change - VIDEO YPbPr
  kind: action
  command: "SOURCE 44"
  params: []

- id: spwrlvl_set
  label: Set Standby Power Level
  kind: action
  command: "SPWRLVL 01"
  description: Required precondition before PWR ON works on TW200/TW200H.
  params: []
```

## Feedbacks
```yaml
- id: ack_colon
  type: enum
  values: [":", "ERR"]
  description: Projector replies `:` on success; `ERR\r\n:` on invalid command.

- id: get_response
  type: string
  description: Get commands (format `<CMD>?`) return a response parameter after execution. Specific parameter values are not catalogued in this source.
```

## Variables
```yaml
# UNRESOLVED: settable parameters beyond fixed-value commands are not enumerated in this source.
# The protocol allows step parameters INC/DEC/INIT per Section 2.1 but does not list specific numeric parameters.
```

## Events
```yaml
# UNRESOLVED: this source describes no unsolicited event messages.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step macro sequences.
# TW200/TW200H PWR ON precondition sequence is documented as a multi-step procedure but each step is an independent action above.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
# Note: TW200/TW200H and TW500 have documented setup prerequisites for PWR ON, but these are configuration steps not safety interlocks.
```

## Notes
All commands are plain ASCII terminated by CR (Hex 0D). Set commands return `:` after execution. Get commands (terminated by `?`) return a response parameter followed by `:`. The null command (bare CR) returns `:` and is used to confirm projector is operational.

ESC/VP21 covers three transports per the source: serial (this spec), USB (USB Appendix — not in this document), TCP/IP (ESC/VP.net protocol manual — not in this document).

Per-model command availability varies significantly. The source provides four compatibility tables mapping each SOURCE command to specific CH-TW models. Use the per-action availability tables when implementing.

For TW200/TW200H: PWR ON requires sending `SPWRLVL 01` first after the projector reaches ESC/VP21-receivable state, then power-cycle once. For TW500: PWR ON requires "Network Monitoring" = ON in the Operation menu and a power-cycle.

INC/DEC/INIT step parameters are documented as part of the command format (Section 2.1) but no specific parameter names or ranges are enumerated in this source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: USB transport command details not in this document. -->
<!-- UNRESOLVED: TCP/IP transport command details not in this document. -->
<!-- UNRESOLVED: get-command response parameter encoding not catalogued per command in this source. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T19:59:08.056Z
last_checked_at: 2026-09-08T22:17:23.266Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-08T22:17:23.266Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions (PWR/MUTE/MSEL/SPWRLVL/40 SOURCE variants/null) have verbatim wire-level matches in source; transport matches exactly. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB and TCP/IP transport details are referenced but not specified in this document. See ESC/VP.net protocol manual and USB Appendix for those transports."
- "settable parameters beyond fixed-value commands are not enumerated in this source."
- "this source describes no unsolicited event messages."
- "source describes no multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "USB transport command details not in this document."
- "TCP/IP transport command details not in this document."
- "get-command response parameter encoding not catalogued per command in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
