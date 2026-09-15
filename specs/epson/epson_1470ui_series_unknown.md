---
spec_id: admin/epson-1470ui-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson 1470Ui Series Control Spec"
manufacturer: Epson
model_family: "1470Ui Series"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "1470Ui Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:48:20.833Z
last_checked_at: 2026-09-08T22:16:26.857Z
generated_at: 2026-09-08T22:16:26.857Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the ESC/VP21 guide for Epson home projectors; its applicable-models list (ELP-TW100…TW9000W) does not explicitly include the 1470Ui Series"
  - "TCP port number, USB control details, and ESC/VP.net protocol specifics not in source"
  - "firmware version compatibility not stated in source"
  - "TCP port not stated in source (ESC/VP.net manual not included)"
  - "response parameter format not enumerated per command in source (source §2.2 states a response parameter is returned for get commands)"
  - "no settable continuous parameters documented in source."
  - "no unsolicited notifications documented in source."
  - "no multi-step control sequences for this model in source."
  - "source contains no safety warnings or interlock procedures."
  - "firmware version compatibility, protocol version, TCP port, ESC/VP.net specifics, and per-command 1470Ui availability not determinable from source"
verification:
  verdict: verified
  checked_at: 2026-09-08T22:16:26.857Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 spec actions match literal ESC/VP21 mnemonics in source; transport values verified; source has no additional distinct commands beyond the spec. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-08
---

# Epson 1470Ui Series Control Spec

## Summary
Epson projector controlled via the ESC/VP21 ASCII command protocol. ESC/VP21 is transport-independent; the source documents RS-232 serial (D-Sub 9-pin, 9600bps 8N1), USB, and TCP/IP network as bearers, with TCP details deferred to a separate ESC/VP.net manual not included in this source. Commands cover power, A/V mute, no-signal display selection, and input/source selection.

<!-- UNRESOLVED: source is the ESC/VP21 guide for Epson home projectors; its applicable-models list (ELP-TW100…TW9000W) does not explicitly include the 1470Ui Series -->
<!-- UNRESOLVED: TCP port number, USB control details, and ESC/VP.net protocol specifics not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source states "After establishing a TCP session, ESC/VP21 commands can be sent to projectors"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source (ESC/VP.net manual not included)
auth:
  type: none  # inferred: no auth procedure in source
```

Note: source also documents a USB control connection; no USB protocol enum exists in this schema — see Notes.

## Traits
```yaml
# - powerable       (PWR ON / PWR OFF commands present)
# - routable        (SOURCE input-selection commands present)
# - queryable       (get command format "command + ?" documented in source §2.2)
traits:
  - powerable  # inferred from PWRON/PWROFF command examples
  - routable   # inferred from SOURCE command examples
  - queryable  # inferred from get command format (§2.2)
```

## Actions
```yaml
# All commands are ASCII per ESC/VP21. Set commands are acknowledged with ":".
# Per-model availability of SOURCE commands varies by projector line (see source tables);
# verify against the actual device.
- id: power_on
  label: Power On
  kind: action
  command: "PWRON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWROFF"
  params: []

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

- id: no_signal_black
  label: No-Signal Display Black
  kind: action
  command: "MSEL00"
  params: []

- id: no_signal_blue
  label: No-Signal Display Blue
  kind: action
  command: "MSEL01"
  params: []

- id: no_signal_user_logo
  label: No-Signal Display User Logo
  kind: action
  command: "MSEL02"
  params: []
  # note: TW10/TW10H does not support User Logo per source

- id: power_on_setup_level
  label: Set Power-On Setup Level
  kind: action
  command: "SPWRLVL 01"
  params: []
  # note: TW200/TW200H preparation for enabling PWR ON per source footnote *1

- id: null_command
  label: Null Command (Presence Check)
  kind: action
  command: "0x0D"
  params: []
  # note: return key code (Hex 0D); projector returns ":" - used to confirm projector is in operation

# --- Source selection (SOURCE commands; per-model availability varies) ---
- id: select_input1_cyclic
  label: Select INPUT 1/A (Cyclic)
  kind: action
  command: "SOURCE 10"
  params: []

- id: select_input1_analog_rgb
  label: Select INPUT 1/A AnalogRGB
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

- id: select_input2_cyclic
  label: Select INPUT 2/B (Cyclic)
  kind: action
  command: "SOURCE 20"
  params: []

- id: select_input2_analog_rgb
  label: Select INPUT 2/B AnalogRGB
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

- id: select_input2_ypbpr_component
  label: Select INPUT 2/B YPbPr (Component)
  kind: action
  command: "SOURCE 24"
  params: []

- id: select_input2_ypbpr
  label: Select INPUT 2/B YPbPr
  kind: action
  command: "SOURCE 25"
  params: []

- id: select_input2_auto
  label: Select INPUT 2/B Auto
  kind: action
  command: "SOURCE 2F"
  params: []

- id: select_input3_cyclic
  label: Select INPUT 3 (Cyclic)
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

- id: select_input5_cyclic
  label: Select INPUT 5 (Cyclic)
  kind: action
  command: "SOURCE C0"
  params: []

- id: select_input5_scart
  label: Select INPUT 5 SCART
  kind: action
  command: "SOURCE C3"
  params: []

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

- id: select_video_cyclic
  label: Select VIDEO (Cyclic)
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

- id: select_usb_easypmp
  label: Select USB (EasyMP)
  kind: action
  command: "SOURCE 52"
  params: []

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
  values: [":"]  # projector returns a colon after executing a set command
  description: Acknowledgement returned after executing a set command (source §2.1)

- id: null_command_ack
  type: enum
  values: [":"]  # projector returns a colon for the null command (0x0D)
  description: Response to null command; confirms projector is in operation (source §2.3)

- id: error
  type: enum
  values: ["ERR"]
  description: >-
    Projector returns "ERR" plus a return key code (Hex 0D) and a colon when it
    receives an invalid command (source §2.4)

- id: get_response
  type: string
  # UNRESOLVED: response parameter format not enumerated per command in source (source §2.2 states a response parameter is returned for get commands)
  description: Response parameter returned for a get command ("command + ?")
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters documented in source.
# Step parameters INC (increment), DEC (decrement), INIT (initialize) are defined
# generically in source §2.1 but no specific variable commands are enumerated.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step control sequences for this model in source.
# (Source footnote *1 describes a TW200/TW200H-specific PWR ON enablement
# procedure involving SPWRLVL 01 - not applicable to 1470Ui.)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- Source is the ESC/VP21 Command User's Guide (Home Projectors). Its applicable-models list covers Epson home-projector lines and does not explicitly include the 1470Ui Series; command availability on the 1470Ui must be verified against a real device.
- ESC/VP21 commands are ASCII; set command = command + parameter, get command = command + `?` (§2.2). Specific get commands (e.g. `PWR?`) are not enumerated in this source — only the generic format is documented.
- Step parameters: INC increments parameter by one, DEC decrements by one, INIT initializes (§2.1).
- Null command: return key code Hex 0D; projector returns `:` (§2.3). Illegal commands return `ERR` + 0D + `:` (§2.4).
- Serial connection: select RS-232C at Advanced Setting of the menu; D-Sub 9-pin connector, projector input "Control (RS-232C)"; 9600bps, 8 data bits, no parity, 1 stop bit, no flow control.
- USB control connection also documented; refer to Appendix in full manual (details beyond scope of this refined source).
- TCP/IP network control: ESC/VP21 over an established TCP session; details in the separate ESC/VP.net protocol manual, not included in this source. TCP port not stated.
- Per-model SOURCE command availability varies widely across the source's model tables (OK/`-` columns); TW200/TW200H require a one-time `SPWRLVL 01` procedure before `PWRON` works, and TW500 requires "Network Monitoring" set to ON (footnotes *1).
<!-- UNRESOLVED: firmware version compatibility, protocol version, TCP port, ESC/VP.net specifics, and per-command 1470Ui availability not determinable from source -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:48:20.833Z
last_checked_at: 2026-09-08T22:16:26.857Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-08T22:16:26.857Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 spec actions match literal ESC/VP21 mnemonics in source; transport values verified; source has no additional distinct commands beyond the spec. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the ESC/VP21 guide for Epson home projectors; its applicable-models list (ELP-TW100…TW9000W) does not explicitly include the 1470Ui Series"
- "TCP port number, USB control details, and ESC/VP.net protocol specifics not in source"
- "firmware version compatibility not stated in source"
- "TCP port not stated in source (ESC/VP.net manual not included)"
- "response parameter format not enumerated per command in source (source §2.2 states a response parameter is returned for get commands)"
- "no settable continuous parameters documented in source."
- "no unsolicited notifications documented in source."
- "no multi-step control sequences for this model in source."
- "source contains no safety warnings or interlock procedures."
- "firmware version compatibility, protocol version, TCP port, ESC/VP.net specifics, and per-command 1470Ui availability not determinable from source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
