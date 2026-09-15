---
spec_id: admin/epson-powerlite-108-107-970-109w-980w-990u-w39
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson PowerLite 108 107 970 109W 980W 990U W39 Control Spec"
manufacturer: Epson
model_family: "PowerLite 108"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "PowerLite 108"
    - "PowerLite 107"
    - "PowerLite 970"
    - "PowerLite 109W"
    - "PowerLite 980W"
    - "PowerLite 990U"
    - "PowerLite W39"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T16:01:54.368Z
last_checked_at: 2026-09-10T22:17:46.245Z
generated_at: 2026-09-10T22:17:46.245Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is the \"ESC/VP21 Command User's Guide for Home Projectors\" and its Applicable Models list (section 3) enumerates older TW/HC/PC-series models (TW100...TW9000W) but does NOT explicitly name PowerLite 108/107/970/109W/980W/990U/W39. Command availability per model varies in the source tables; verification against the actual PowerLite units is required."
  - "TCP/IP control mentioned but port/base URL not stated — source defers to a separate \"ESC/VP.net protocol manual\" not included here."
  - "USB control mentioned but no USB transport details given beyond a reference to the Appendix."
  - "TCP port not stated in source (ESC/VP.net manual referenced but not provided)"
  - "response parameter format per command not enumerated in source"
  - "source contains no explicit safety warnings or interlock procedures."
  - "TCP port and ESC/VP.net framing not stated in source."
  - "firmware version compatibility not stated in source."
  - "target PowerLite 108/107/970/109W/980W/990U/W39 models not listed in the source's Applicable Models section."
verification:
  verdict: verified
  checked_at: 2026-09-10T22:17:46.245Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 wire-literal commands (PWRON, PWROFF, MUTE ON/OFF, MSEL00-02, SPWRLVL 01, 0x0D, and 40 SOURCE variants) appear verbatim in the source; transport params 9600/8/N/1 match. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson PowerLite 108 107 970 109W 980W 990U W39 Control Spec

## Summary
Epson home projector controlled via the ESC/VP21 ASCII command protocol over RS-232C serial, USB, or TCP/IP network. This spec covers power, A/V mute, source selection, and no-signal display commands, plus the serial communication parameters stated in the source guide.

<!-- UNRESOLVED: the source is the "ESC/VP21 Command User's Guide for Home Projectors" and its Applicable Models list (section 3) enumerates older TW/HC/PC-series models (TW100...TW9000W) but does NOT explicitly name PowerLite 108/107/970/109W/980W/990U/W39. Command availability per model varies in the source tables; verification against the actual PowerLite units is required. -->
<!-- UNRESOLVED: TCP/IP control mentioned but port/base URL not stated — source defers to a separate "ESC/VP.net protocol manual" not included here. -->
<!-- UNRESOLVED: USB control mentioned but no USB transport details given beyond a reference to the Appendix. -->

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
  port: null  # UNRESOLVED: TCP port not stated in source (ESC/VP.net manual referenced but not provided)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command evidence in source
- powerable    # inferred from PWR ON / PWR OFF commands
- routable     # inferred from SOURCE command tables
- queryable    # inferred from documented get-command format ("command + ?"), section 2.2; no concrete query commands enumerated in source
```

## Actions
```yaml
# Command strings verbatim from source command tables. Set commands return ":" when executed.
# All A/V-mute, source-select, and no-signal-display variants enumerated per source rows.

- id: power_on
  label: Power On
  kind: action
  command: "PWRON"
  params: []
  notes: "Source footnote (*1): on TW200/TW200H requires SPWRLVL 01 preparation; on TW500 requires Network Monitoring = ON. See Macros."

- id: power_off
  label: Power Off
  kind: action
  command: "PWROFF"
  params: []
  notes: "Source row references a 'note4' whose text is not present in the source document."

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

- id: source_display_black
  label: Source Display Black
  kind: action
  command: "MSEL00"
  params: []
  notes: "Listed under item 'SOURCE (note3)' with parameter Black."

- id: source_display_blue
  label: Source Display Blue
  kind: action
  command: "MSEL01"
  params: []

- id: source_display_user_logo
  label: Source Display User Logo
  kind: action
  command: "MSEL02"
  params: []
  notes: "Footnote (*2): TW10/TW10H does not support the User Logo function."

- id: spwrlvl_01
  label: Set Power Level 01 (PWR ON preparation for TW200/TW200H)
  kind: action
  command: "SPWRLVL 01"
  params: []
  notes: "Documented only in footnote (*1) as preparation step for enabling PWR ON on TW200/TW200H."

- id: null_command
  label: Null Command (operation check)
  kind: query
  command: "0x0D"
  params: []
  notes: "Return key code (Hex 0D). Projector returns ':'. Used to confirm the projector is in operation."

# --- Source selection: INPUT 1/A ("SOURCE 1x") ---
- id: select_input1_cyclic
  label: Select INPUT 1/A (cyclic)
  kind: action
  command: "SOURCE 10"
  params: []
  notes: "Cycles within SOURCE 1x signals. Footnote (*3): only when TW10 is connected, source is not cycled within a terminal's selectable signals."

- id: select_input1_analog_rgb
  label: Select INPUT 1/A Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: select_input1_digital_rgb
  label: Select INPUT 1/A Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: select_input1_rgb_video
  label: Select INPUT 1/A RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: select_input1_ycbcr
  label: Select INPUT 1/A YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []
  notes: "Footnote (*4): signal selected when TW10/TW20 connected. Footnote (*7): on TW5500/PC9500UB/PC9700UB, TW420/HC700, TW450/HC705HD this command can be used only for get."

- id: select_input1_ypbpr
  label: Select INPUT 1/A YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: select_input1_auto
  label: Select INPUT 1/A Auto
  kind: action
  command: "SOURCE 1F"
  params: []

# --- Source selection: INPUT 2/B ("SOURCE 2x") ---
- id: select_input2_cyclic
  label: Select INPUT 2/B (cyclic)
  kind: action
  command: "SOURCE 20"
  params: []

- id: select_input2_analog_rgb
  label: Select INPUT 2/B Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: select_input2_rgb_video
  label: Select INPUT 2/B RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: select_input2_ycbcr
  label: Select INPUT 2/B YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []
  notes: "Footnote (*5): signal selected when TW500 connected."

- id: select_input2_ypbpr
  label: Select INPUT 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: select_input2_ypbpr_alt
  label: Select INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: select_input2_auto
  label: Select INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

# --- Source selection: INPUT 3 ("SOURCE 3x") ---
- id: select_input3_cyclic
  label: Select INPUT 3 (cyclic)
  kind: action
  command: "SOURCE 30"
  params: []

- id: select_input3_digital_rgb
  label: Select INPUT 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: select_input3_rgb_video
  label: Select INPUT 3 RGB-Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: select_input3_ycbcr
  label: Select INPUT 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: select_input3_ypbpr
  label: Select INPUT 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

# --- Source selection: INPUT 5 ("SOURCE Cx") ---
- id: select_input5_cyclic
  label: Select INPUT 5 (cyclic)
  kind: action
  command: "SOURCE C0"
  params: []

- id: select_input5_scart
  label: Select INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []
  notes: "Footnote (*6): signal selected when TW600/520/550/800/700/1000 connected."

- id: select_input5_ycbcr
  label: Select INPUT 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: select_input5_ypbpr
  label: Select INPUT 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: select_input5_auto
  label: Select INPUT 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

# --- Source selection: VIDEO ("SOURCE 4x") ---
- id: select_video_cyclic
  label: Select VIDEO (cyclic)
  kind: action
  command: "SOURCE 40"
  params: []

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

# --- Source selection: USB ---
- id: select_usb_easypmp
  label: Select USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

# --- Source selection: HDMI (HDMI2) ---
- id: select_hdmi
  label: Select HDMI (HDMI2)
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

# --- Source selection: WirelessHD ---
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
- id: set_command_ack
  type: enum
  values: [":"]
  notes: "Projector returns a colon after executing a set command."

- id: get_command_response
  type: string
  # UNRESOLVED: response parameter format per command not enumerated in source
  notes: "Projector returns a response parameter after executing a get command (command + '?')."

- id: null_command_ack
  type: enum
  values: [":"]
  notes: "Projector returns a colon in response to the null command (0x0D)."

- id: error_response
  type: enum
  values: ["ERR"]
  notes: "Projector returns 'ERR' followed by a return key code (Hex 0D) and a colon when it receives invalid commands."
```

## Variables
```yaml
# No settable non-discrete parameters documented in source. Set commands use
# fixed parameters (ON/OFF, signal names) or step parameters (INC/DEC/INIT);
# no command using a step parameter is enumerated in the source command tables.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
- id: enable_pwr_on_tw200_tw200h
  label: Enable PWR ON on TW200/TW200H
  steps:
    - "Turn on the projector"
    - "After the projector reaches the condition where it can receive ESC/VP21 commands, send SPWRLVL 01"
    - "Turn off the projector once"
    - "PWR ON works after the status becomes the standby state"
  notes: "From source footnote (*1). Model-specific; not applicable to most models."

- id: enable_pwr_on_tw500
  label: Enable PWR ON on TW500
  steps:
    - "Set Network Monitoring of Operation in the Setting menu to ON"
    - "Turn off the projector once"
    - "PWR ON works after the status becomes the standby state"
  notes: "From source footnote (*1). Model-specific."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Source references a 'note4' on the PWR OFF row whose text is absent from the document.
```

## Notes
- ESC/VP21 commands are ASCII; controllable via serial, USB, or TCP/IP network. USB is documented as a valid transport but is not representable in the protocols enum used by this spec format.
- Serial setup: select RS-232C at Advanced Setting of the projector menu. Connector D-Sub 9 pin; projector input Control (RS-232C).
- Set command parameters are either fixed (e.g. ON, OFF, 21) or step parameters: INC (increment by one), DEC (decrement by one), INIT (initialize).
- Get command format is "command + ?"; no concrete get command instances are enumerated in the source tables, so none are listed as actions.
- Command availability differs per model — the source marks each SOURCE variant OK/- per model family. Verify against the target PowerLite models before use.
<!-- UNRESOLVED: TCP port and ESC/VP.net framing not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: target PowerLite 108/107/970/109W/980W/990U/W39 models not listed in the source's Applicable Models section. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-09-02T16:01:54.368Z
last_checked_at: 2026-09-10T22:17:46.245Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-10T22:17:46.245Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 wire-literal commands (PWRON, PWROFF, MUTE ON/OFF, MSEL00-02, SPWRLVL 01, 0x0D, and 40 SOURCE variants) appear verbatim in the source; transport params 9600/8/N/1 match. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is the \"ESC/VP21 Command User's Guide for Home Projectors\" and its Applicable Models list (section 3) enumerates older TW/HC/PC-series models (TW100...TW9000W) but does NOT explicitly name PowerLite 108/107/970/109W/980W/990U/W39. Command availability per model varies in the source tables; verification against the actual PowerLite units is required."
- "TCP/IP control mentioned but port/base URL not stated — source defers to a separate \"ESC/VP.net protocol manual\" not included here."
- "USB control mentioned but no USB transport details given beyond a reference to the Appendix."
- "TCP port not stated in source (ESC/VP.net manual referenced but not provided)"
- "response parameter format per command not enumerated in source"
- "source contains no explicit safety warnings or interlock procedures."
- "TCP port and ESC/VP.net framing not stated in source."
- "firmware version compatibility not stated in source."
- "target PowerLite 108/107/970/109W/980W/990U/W39 models not listed in the source's Applicable Models section."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
