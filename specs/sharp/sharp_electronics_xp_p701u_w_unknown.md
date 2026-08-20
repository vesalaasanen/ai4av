---
spec_id: admin/sharp-xp-p701u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics Xp P701U W Control Spec"
manufacturer: Sharp
model_family: "Xp P701U W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - "Xp P701U W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
  - res.cloudinary.com
  - manualslib.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/p701u-p621u-user-manual.pdf
  - https://res.cloudinary.com/hnymxdy5j/raw/upload/v1767755087/media/00D7F000004CKRUUA4/Sharp-ExternalControlManual_and_Appendix_Rev3-0-english.pdf
  - https://www.manualslib.com/manual/4352639/Sharp-P701u.html
retrieved_at: 2026-08-11T09:32:17.245Z
last_checked_at: 2026-08-19T09:45:05.727Z
generated_at: 2026-08-19T09:45:05.727Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full PC Control Code list not in source (dealer-referenced)"
  - "source references an \"ASCII Control Command\" common set (vol/bright/contrast/etc.)"
  - "source does not document unsolicited notifications."
  - "source does not document multi-step sequences."
  - "HTTP server login credential format; PJLink password; Crestron IP/ID/PORT defaults; firmware version compatibility."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:45:05.727Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions match the Format A/B PC Control Code tables verbatim; transport (38400 baud, 8N1, no flow control, TCP 7142, HTTP login password) supported; input/status query commands covered by Feedbacks. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Sharp Electronics Xp P701U W Control Spec

## Summary
The Sharp Xp P701U W is a projector controllable over RS-232C (serial) and wired LAN (TCP). RS-232 supports two command formats — a hex "Format A" and an ASCII "Format B" — which the projector auto-detects. LAN control uses TCP port 7142 with ASCII commands. An on-board HTTP server provides web-based control, Crestron, PJLink, and AMX integration.

<!-- UNRESOLVED: full PC Control Code list not in source (dealer-referenced) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 38400  # default per source; 19200/9600/4800 also supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142
auth:
  type: password  # HTTP server requires login password; LAN control password not detailed
```

## Traits
```yaml
- powerable       # POWER ON/OFF commands present
- routable        # INPUT SELECT commands present
- queryable       # status command returns input/error state
- levelable       # volume controllable via SOUND MUTE; volume level not in command set
```

## Actions
```yaml
- id: power_on_format_a
  label: Power On (RS-232 Format A)
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off_format_a
  label: Power Off (RS-232 Format A)
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_select_hdmi1_format_a
  label: Input Select HDMI1 (RS-232 Format A)
  kind: action
  command: "02 03 00 00 02 01 A1 A9"
  params: []

- id: input_select_hdmi2_format_a
  label: Input Select HDMI2 (RS-232 Format A)
  kind: action
  command: "02 03 00 00 02 01 A2 AA"
  params: []

- id: input_select_hdbaset_format_a
  label: Input Select HDBaseT (RS-232 Format A)
  kind: action
  command: "02 03 00 00 02 01 BF C7"
  params: []

- id: input_select_usb_a_format_a
  label: Input Select USB-A (RS-232 Format A)
  kind: action
  command: "02 03 00 00 02 01 1F 27"
  params: []

- id: picture_mute_on_format_a
  label: Picture Mute On (RS-232 Format A)
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off_format_a
  label: Picture Mute Off (RS-232 Format A)
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on_format_a
  label: Sound Mute On (RS-232 Format A)
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off_format_a
  label: Sound Mute Off (RS-232 Format A)
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: power_on_format_b
  label: Power On (RS-232 Format B / ASCII)
  kind: action
  command: "POWR   1<CR>"
  params: []

- id: power_off_format_b
  label: Power Off (RS-232 Format B / ASCII)
  kind: action
  command: "POWR   0<CR>"
  params: []

- id: input_select_hdmi1_format_b
  label: Input Select HDMI1 (RS-232 Format B / ASCII)
  kind: action
  command: "IRGB  31<CR>"
  params: []

- id: input_select_hdmi2_format_b
  label: Input Select HDMI2 (RS-232 Format B / ASCII)
  kind: action
  command: "IRGB  32<CR>"
  params: []

- id: input_select_hdbaset_format_b
  label: Input Select HDBaseT (RS-232 Format B / ASCII)
  kind: action
  command: "INET  51<CR>"
  params: []

- id: input_select_usb_a_format_b
  label: Input Select USB-A (RS-232 Format B / ASCII)
  kind: action
  command: "IUSB  41<CR>"
  params: []

- id: av_mute_on_format_b
  label: AV Mute On (RS-232 Format B / ASCII)
  kind: action
  command: "IMBK   1<CR>"
  params: []

- id: av_mute_off_format_b
  label: AV Mute Off (RS-232 Format B / ASCII)
  kind: action
  command: "IMBK   0<CR>"
  params: []

- id: sound_mute_on_format_b
  label: Sound Mute On (RS-232 Format B / ASCII)
  kind: action
  command: "MUTE   1<CR>"
  params: []

- id: sound_mute_off_format_b
  label: Sound Mute Off (RS-232 Format B / ASCII)
  kind: action
  command: "MUTE   0<CR>"
  params: []
```

## Feedbacks
```yaml
- id: input_status
  type: enum
  values: [hdmi1, hdmi2, hdbaset, usb-a]
  # Source: "Input command / Status command" table - response strings per active input

- id: error_status
  type: enum
  values: [error:temp, error:fan, error:light, error:system]
  # Source: "Status command" - Error Status column
```

## Variables
```yaml
# No settable parameters documented beyond the discrete actions above.
# UNRESOLVED: source references an "ASCII Control Command" common set (vol/bright/contrast/etc.)
# but the full command reference is hosted externally and not included in this document.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source mentions fan/light/temperature error conditions via status responses; no
# interlock procedures or power-on sequencing requirements documented in source.
```

## Notes
- RS-232 supports two formats auto-detected: Format A (hex) and Format B (ASCII).
- `<SP>` in Format B strings = `0x20`; `<CR>` = `0x0D`.
- Format A INPUT SELECT commands include a trailing checksum byte (A1 A9, A2 AA, BF C7, 1F 27) — must be transmitted verbatim.
- Default baud rate 38400; menu allows 4800/9600/19200/38400. Source recommends 9600 bps for long cable runs.
- LAN control uses TCP port 7142. HTTP server accessed via `http://<ip>/index.html` with login password (factory unset, set on first login).
- Full PC Control Code list not included in source — contact dealer.
- Common ASCII Control Command reference hosted at sharp-displays.jp.sharp (not in source).

<!-- UNRESOLVED: HTTP server login credential format; PJLink password; Crestron IP/ID/PORT defaults; firmware version compatibility. -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - res.cloudinary.com
  - manualslib.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/p701u-p621u-user-manual.pdf
  - https://res.cloudinary.com/hnymxdy5j/raw/upload/v1767755087/media/00D7F000004CKRUUA4/Sharp-ExternalControlManual_and_Appendix_Rev3-0-english.pdf
  - https://www.manualslib.com/manual/4352639/Sharp-P701u.html
retrieved_at: 2026-08-11T09:32:17.245Z
last_checked_at: 2026-08-19T09:45:05.727Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:45:05.727Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions match the Format A/B PC Control Code tables verbatim; transport (38400 baud, 8N1, no flow control, TCP 7142, HTTP login password) supported; input/status query commands covered by Feedbacks. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full PC Control Code list not in source (dealer-referenced)"
- "source references an \"ASCII Control Command\" common set (vol/bright/contrast/etc.)"
- "source does not document unsolicited notifications."
- "source does not document multi-step sequences."
- "HTTP server login credential format; PJLink password; Crestron IP/ID/PORT defaults; firmware version compatibility."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
