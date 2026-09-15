---
spec_id: admin/epson-powerlite-108-107-970-109w-980w-990u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson PowerLite 108/107/970/109W/980W/990U Control Spec"
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
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-27T05:03:58.580Z
last_checked_at: 2026-09-10T22:17:24.238Z
generated_at: 2026-09-10T22:17:24.238Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "target models (PowerLite 108/107/970/109W/980W/990U) are not listed in the source's \"Applicable models\" section. Commands below apply per ESC/VP21 general spec; per-model support may vary and must be verified against the specific device manual."
  - "TCP port number not stated in source (ESC/VP.net manual referenced but not provided)."
  - "source does not enumerate which commands accept INC/DEC/INIT in this excerpt."
  - "source does not document unsolicited notifications in this excerpt."
  - "source does not document multi-step macro sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "TCP port for ESC/VP.net not stated in source."
  - "USB endpoint / interface details not stated in source."
  - "target models PowerLite 108/107/970/109W/980W/990U not enumerated in source \"Applicable models\" section — applicability of each action must be verified per device."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-10T22:17:24.238Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec action mnemonics (PWR/MUTE/MSEL/SOURCE/NULL + get forms) appear verbatim in source command tables; transport parameters match Appendix serial spec exactly. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Epson PowerLite 108/107/970/109W/980W/990U Control Spec

## Summary
Control spec for Epson PowerLite 108/107/970/109W/980W/990U home/education projectors via the ESC/VP21 command protocol. ESC/VP21 is an ASCII command set usable over serial, USB, or TCP/IP. Source document does not explicitly list the PowerLite 108/107/970/109W/980W/990U in its applicable-model table, so this spec is derived from the generic ESC/VP21 command catalogue.

<!-- UNRESOLVED: target models (PowerLite 108/107/970/109W/980W/990U) are not listed in the source's "Applicable models" section. Commands below apply per ESC/VP21 general spec; per-model support may vary and must be verified against the specific device manual. -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

Source states: "Baud rate: 9600bps Data length: 8 bits Parity: No Stop bit: 1 bit Flow control: No" for the serial connection. TCP port not stated in source.

<!-- UNRESOLVED: TCP port number not stated in source (ESC/VP.net manual referenced but not provided). -->

## Traits
```yaml
- powerable       # inferred from PWR/PWRON/PWROFF command examples
- routable        # inferred from SOURCE/MSEL command examples
- queryable       # inferred from "?" get-command format
```

## Actions
```yaml
# Note: ESC/VP21 set commands return ":" on success and "ERR" + CR + ":" on failure.
# Get commands are formed by appending "?" to the command code.
# Step parameters: INC (increment), DEC (decrement), INIT (initialize).

- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []
  notes: "Also accepted as 'PWRON'. For some legacy TW200/TW200H/TW500 models, requires 'SPWRLVL 01' pre-configuration - see source footnote (*1)."

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

- id: message_select_black
  label: Display Message - Black
  kind: action
  command: "MSEL00"
  params: []

- id: message_select_blue
  label: Display Message - Blue
  kind: action
  command: "MSEL01"
  params: []

- id: message_select_user_logo
  label: Display Message - User Logo
  kind: action
  command: "MSEL02"
  params: []
  notes: "Not supported on TW10/TW10H per source footnote (*2)."

- id: source_input1_cycle
  label: Source - Input 1 Cycle
  kind: action
  command: "SOURCE 10"
  params: []

- id: source_input1_analog_rgb
  label: Source - Input 1 Analog RGB
  kind: action
  command: "SOURCE 11"
  params: []

- id: source_input1_digital_rgb
  label: Source - Input 1 Digital RGB
  kind: action
  command: "SOURCE 12"
  params: []

- id: source_input1_rgb_video
  label: Source - Input 1 RGB Video
  kind: action
  command: "SOURCE 13"
  params: []

- id: source_input1_ycbcr
  label: Source - Input 1 YCbCr (Component)
  kind: action
  command: "SOURCE 14"
  params: []

- id: source_input1_ypbpr
  label: Source - Input 1 YPbPr (Component)
  kind: action
  command: "SOURCE 15"
  params: []

- id: source_input1_auto
  label: Source - Input 1 Auto
  kind: action
  command: "SOURCE 1F"
  params: []

- id: source_input2_cycle
  label: Source - Input 2 Cycle
  kind: action
  command: "SOURCE 20"
  params: []

- id: source_input2_analog_rgb
  label: Source - Input 2 Analog RGB
  kind: action
  command: "SOURCE 21"
  params: []

- id: source_input2_rgb_video
  label: Source - Input 2 RGB Video
  kind: action
  command: "SOURCE 22"
  params: []

- id: source_input2_ycbcr
  label: Source - Input 2 YCbCr (Component)
  kind: action
  command: "SOURCE 23"
  params: []

- id: source_input2_ypbpr
  label: Source - Input 2 YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: source_input2_ypbpr_alt
  label: Source - Input 2 YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: source_input2_auto
  label: Source - Input 2 Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: source_input3_cycle
  label: Source - Input 3 Cycle
  kind: action
  command: "SOURCE 30"
  params: []

- id: source_input3_digital_rgb
  label: Source - Input 3 Digital RGB
  kind: action
  command: "SOURCE 31"
  params: []

- id: source_input3_rgb_video
  label: Source - Input 3 RGB Video
  kind: action
  command: "SOURCE 33"
  params: []

- id: source_input3_ycbcr
  label: Source - Input 3 YCbCr
  kind: action
  command: "SOURCE 34"
  params: []

- id: source_input3_ypbpr
  label: Source - Input 3 YPbPr
  kind: action
  command: "SOURCE 35"
  params: []

- id: source_input5_cycle
  label: Source - Input 5 Cycle
  kind: action
  command: "SOURCE C0"
  params: []

- id: source_input5_scart
  label: Source - Input 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

- id: source_input5_ycbcr
  label: Source - Input 5 YCbCr
  kind: action
  command: "SOURCE C4"
  params: []

- id: source_input5_ypbpr
  label: Source - Input 5 YPbPr
  kind: action
  command: "SOURCE C5"
  params: []

- id: source_input5_auto
  label: Source - Input 5 Auto
  kind: action
  command: "SOURCE CF"
  params: []

- id: source_video_cycle
  label: Source - Video Cycle
  kind: action
  command: "SOURCE 40"
  params: []

- id: source_video_rca
  label: Source - Video (RCA)
  kind: action
  command: "SOURCE 41"
  params: []

- id: source_video_s
  label: Source - Video (S-Video)
  kind: action
  command: "SOURCE 42"
  params: []

- id: source_video_ycbcr
  label: Source - Video (YCbCr)
  kind: action
  command: "SOURCE 43"
  params: []

- id: source_video_ypbpr
  label: Source - Video (YPbPr)
  kind: action
  command: "SOURCE 44"
  params: []

- id: source_usb_easymp
  label: Source - USB EasyMP
  kind: action
  command: "SOURCE 52"
  params: []

- id: source_hdmi2
  label: Source - HDMI
  kind: action
  command: "SOURCE A0"
  params: []

- id: source_hdmi2_digital_rgb
  label: Source - HDMI Digital RGB
  kind: action
  command: "SOURCE A1"
  params: []

- id: source_hdmi2_rgb_video
  label: Source - HDMI RGB-Video
  kind: action
  command: "SOURCE A3"
  params: []

- id: source_hdmi2_ycbcr
  label: Source - HDMI YCbCr
  kind: action
  command: "SOURCE A4"
  params: []

- id: source_hdmi2_ypbpr
  label: Source - HDMI YPbPr
  kind: action
  command: "SOURCE A5"
  params: []

- id: source_wirelesshd
  label: Source - WirelessHD
  kind: action
  command: "SOURCE D0"
  params: []

- id: source_wirelesshd_digital_rgb
  label: Source - WirelessHD Digital RGB
  kind: action
  command: "SOURCE D1"
  params: []

- id: source_wirelesshd_rgb_video
  label: Source - WirelessHD RGB-Video
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
  label: Null Command (Keepalive)
  kind: action
  command: "\r"
  params: []
  notes: "Hex 0D (CR). Projector returns ':'. Use to confirm projector is in operation."

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PWR?"
  params: []

- id: source_status_query
  label: Source Status Query
  kind: query
  command: "SOURCE?"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "MUTE?"
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  type: enum
  values: [":"]
  notes: "Projector returns ':' after successfully executing a set command."

- id: command_error
  type: enum
  values: ["ERR"]
  notes: "Projector returns 'ERR' + CR + ':' on illegal/invalid command."
```

## Variables
```yaml
# ESC/VP21 settable parameters use step form: COMMAND INC | DEC | INIT
# UNRESOLVED: source does not enumerate which commands accept INC/DEC/INIT in this excerpt.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications in this excerpt.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
# requirements in this excerpt. Note: TW200/TW200H PWR ON pre-conditioning (SPWRLVL 01)
# and TW500 'Network Monitoring' menu requirement are operational prerequisites,
# not safety interlocks.
```

## Notes
ESC/VP21 is protocol-agnostic — same ASCII command set works over serial, USB, or TCP/IP. Source serial config: 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control, D-Sub 9-pin, RS-232C mode selectable via Advanced Setting menu. Networking uses ESC/VP.net protocol (separate manual referenced but not provided). Each SOURCE command variant corresponds to a distinct signal-type row in the source tables; per-model support varies and must be verified. Step-parameter form (`INC`/`DEC`/`INIT`) is available where applicable. Null command (CR, hex 0D) returns `:` and serves as a keepalive poll.

<!-- UNRESOLVED: TCP port for ESC/VP.net not stated in source. -->
<!-- UNRESOLVED: USB endpoint / interface details not stated in source. -->
<!-- UNRESOLVED: target models PowerLite 108/107/970/109W/980W/990U not enumerated in source "Applicable models" section — applicability of each action must be verified per device. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
retrieved_at: 2026-05-27T05:03:58.580Z
last_checked_at: 2026-09-10T22:17:24.238Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-10T22:17:24.238Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec action mnemonics (PWR/MUTE/MSEL/SOURCE/NULL + get forms) appear verbatim in source command tables; transport parameters match Appendix serial spec exactly. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "target models (PowerLite 108/107/970/109W/980W/990U) are not listed in the source's \"Applicable models\" section. Commands below apply per ESC/VP21 general spec; per-model support may vary and must be verified against the specific device manual."
- "TCP port number not stated in source (ESC/VP.net manual referenced but not provided)."
- "source does not enumerate which commands accept INC/DEC/INIT in this excerpt."
- "source does not document unsolicited notifications in this excerpt."
- "source does not document multi-step macro sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "TCP port for ESC/VP.net not stated in source."
- "USB endpoint / interface details not stated in source."
- "target models PowerLite 108/107/970/109W/980W/990U not enumerated in source \"Applicable models\" section — applicability of each action must be verified per device."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
