---
spec_id: admin/sony-bdp-s5000es
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony BDP-S5000ES Control Spec"
manufacturer: Sony
model_family: BDP-S5000ES
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - BDP-S5000ES
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
  - files.remotecentral.com
source_urls:
  - https://web.archive.org/web/20191121065716/https://docs.sony.com/release/bdps5000es_rs232_protocol.pdf
  - https://files.remotecentral.com/view/6602-17926-1/sony_bdp-s5000es_blu-ray_disc_player.html
  - https://files.remotecentral.com/view/77-235-1/sony_bdp-cx7000es_blu-ray_disc_player.html
  - https://files.remotecentral.com/library/22-1/sony/blu-ray_disc_player/index.html
retrieved_at: 2026-09-02T21:01:48.061Z
last_checked_at: 2026-09-21T22:17:40.882Z
generated_at: 2026-09-21T22:17:40.882Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers BDP-S5000ES only; broader \"BDP Series\" family compatibility not confirmed."
  - "no settable parameters documented in source"
  - "source describes no unsolicited device-initiated events"
  - "source describes no multi-step macro sequences"
  - "source contains no safety warnings, interlocks, or power-on"
  - "firmware compatibility range not stated; only the query response format is documented. Source is BDP-S5000ES specific; applicability to other \"BDP Series\" models (e.g. BDP-S3500, BDP-BX series) is not stated."
verification:
  verdict: verified
  checked_at: 2026-09-21T22:17:40.882Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions match the source command table hex tokens verbatim; transport (9600/8/N/1, serial) matches section 4; source command catalogue fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# Sony BDP-S5000ES Control Spec

## Summary
RS-232C CIS protocol for Sony BDP-S5000ES Blu-ray Disc Player. Host Controller sends framed binary commands (STX + BC + PDC + CMD + Data + CS); player returns ACK (0xFD) or NACK (0xFE). Covers transport controls, numeric keys, menu navigation, color keys, power, and a CIS firmware/model query.

<!-- UNRESOLVED: source covers BDP-S5000ES only; broader "BDP Series" family compatibility not confirmed. -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from POWER_SET (P.ON / P.OFF) commands
- queryable  # inferred from CIS_COMMAND_VERSION_REQ and MODEL_NAME_REQ
```

## Actions
```yaml
- id: numeric_key_0
  label: Numeric Key 0
  kind: action
  command: "02 02 80 00 7E"
  params: []
- id: numeric_key_1
  label: Numeric Key 1
  kind: action
  command: "02 02 80 01 7D"
  params: []
- id: numeric_key_2
  label: Numeric Key 2
  kind: action
  command: "02 02 80 02 7C"
  params: []
- id: numeric_key_3
  label: Numeric Key 3
  kind: action
  command: "02 02 80 03 7B"
  params: []
- id: numeric_key_4
  label: Numeric Key 4
  kind: action
  command: "02 02 80 04 7A"
  params: []
- id: numeric_key_5
  label: Numeric Key 5
  kind: action
  command: "02 02 80 05 79"
  params: []
- id: numeric_key_6
  label: Numeric Key 6
  kind: action
  command: "02 02 80 06 78"
  params: []
- id: numeric_key_7
  label: Numeric Key 7
  kind: action
  command: "02 02 80 07 77"
  params: []
- id: numeric_key_8
  label: Numeric Key 8
  kind: action
  command: "02 02 80 08 76"
  params: []
- id: numeric_key_9
  label: Numeric Key 9
  kind: action
  command: "02 02 80 09 75"
  params: []
- id: audio
  label: Audio
  kind: action
  command: "02 02 80 0D 71"
  params: []
- id: subtitle
  label: Subtitle
  kind: action
  command: "02 02 80 0E 70"
  params: []
- id: angle
  label: Angle
  kind: action
  command: "02 02 80 0F 6F"
  params: []
- id: previous
  label: Previous
  kind: action
  command: "02 02 80 10 6E"
  params: []
- id: next
  label: Next
  kind: action
  command: "02 02 80 11 6D"
  params: []
- id: play
  label: Play
  kind: action
  command: "02 02 80 12 6C"
  params: []
- id: pause
  label: Pause
  kind: action
  command: "02 02 80 13 6B"
  params: []
- id: stop
  label: Stop
  kind: action
  command: "02 02 80 14 6A"
  params: []
- id: cursor_up
  label: Cursor Up
  kind: action
  command: "02 02 80 15 69"
  params: []
- id: cursor_left
  label: Cursor Left
  kind: action
  command: "02 02 80 16 68"
  params: []
- id: enter
  label: Enter
  kind: action
  command: "02 02 80 17 67"
  params: []
- id: cursor_right
  label: Cursor Right
  kind: action
  command: "02 02 80 18 66"
  params: []
- id: cursor_down
  label: Cursor Down
  kind: action
  command: "02 02 80 19 65"
  params: []
- id: clear
  label: Clear
  kind: action
  command: "02 02 80 22 5B"
  params: []
- id: top_menu
  label: Top Menu
  kind: action
  command: "02 02 80 1A 64"
  params: []
- id: menu_popup
  label: Menu / Popup
  kind: action
  command: "02 02 80 1B 63"
  params: []
- id: return
  label: Return
  kind: action
  command: "02 02 80 1C 62"
  params: []
- id: time_text
  label: Time / Text
  kind: action
  command: "02 02 80 1D 61"
  params: []
- id: fwd_scan_slow
  label: FWD Scan / Slow
  kind: action
  command: "02 02 80 20 5E"
  params: []
- id: rwd_scan_slow
  label: RWD Scan / Slow
  kind: action
  command: "02 02 80 21 5D"
  params: []
- id: display
  label: Display
  kind: action
  command: "02 02 80 23 5B"
  params: []
- id: flash_minus
  label: Flash (-)
  kind: action
  command: "02 02 80 24 5A"
  params: []
- id: flash_plus
  label: Flash (+)
  kind: action
  command: "02 02 80 25 59"
  params: []
- id: home
  label: Home
  kind: action
  command: "02 02 80 30 4E"
  params: []
- id: option
  label: Option
  kind: action
  command: "02 02 80 31 4D"
  params: []
- id: red
  label: Red
  kind: action
  command: "02 02 80 32 4C"
  params: []
- id: green
  label: Green
  kind: action
  command: "02 02 80 33 4B"
  params: []
- id: blue
  label: Blue
  kind: action
  command: "02 02 80 34 4A"
  params: []
- id: yellow
  label: Yellow
  kind: action
  command: "02 02 80 35 49"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "02 02 80 60 01 1C"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "02 02 80 60 00 1D"
  params: []
- id: cis_command_version_req
  label: CIS Command Version Request
  kind: query
  command: "02 02 80 80 FE"
  params: []
- id: model_name_req
  label: Model Name Request
  kind: query
  command: "02 02 80 A0 DE"
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: ACK
  type: enum
  values: [acknowledged]
- id: nack
  label: NACK
  type: enum
  values: [rejected]
- id: firmware_version
  label: Main / Sub CPU Firmware Version
  type: string
  description: Response to CIS_COMMAND_VERSION_REQ; main CPU version (2 bytes hex) followed by sub CPU version (2 bytes hex).
- id: model_name
  label: Model Name
  type: string
  description: Response to MODEL_NAME_REQ; ASCII model name string (e.g. "BDP-S5000ES").
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in source
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited device-initiated events
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on
# sequencing requirements beyond standby-mode behavior noted in Notes.
```

## Notes
Frame format: `STX (0x02) + BC + PDC + CMD + [Data1..DataN] + CS`. PDC for this family is `0x80` (request) / `0x88` (response). Checksum (CS) = low 8 bits of the sum from BC through the byte before CS are set to 0 (i.e. two's-complement-style; sum BC..(CS-1) + CS ≡ 0 mod 256). ACK = `0xFD`, NACK = `0xFE`. Player must respond within 500 ms; if no response, host retries after 500 ms. Inter-byte interval must be < 10 ms.

While the player is in standby (normal or Quick Start), only three CIS commands are accepted: `PLAY`, `HOME`, `POWER_SET (P.ON)`. Other commands get no response. In normal standby, P.ON triggers CEC One-Touch Play; in Quick Start mode it does not. Disable "Control for HDMI" if this distinction matters.

POWER_SET is the only command in the table that carries a data byte (one byte: `0x01` = on, `0x00` = off).

<!-- UNRESOLVED: firmware compatibility range not stated; only the query response format is documented. Source is BDP-S5000ES specific; applicability to other "BDP Series" models (e.g. BDP-S3500, BDP-BX series) is not stated. -->

## Provenance

```yaml
source_domains:
  - web.archive.org
  - files.remotecentral.com
source_urls:
  - https://web.archive.org/web/20191121065716/https://docs.sony.com/release/bdps5000es_rs232_protocol.pdf
  - https://files.remotecentral.com/view/6602-17926-1/sony_bdp-s5000es_blu-ray_disc_player.html
  - https://files.remotecentral.com/view/77-235-1/sony_bdp-cx7000es_blu-ray_disc_player.html
  - https://files.remotecentral.com/library/22-1/sony/blu-ray_disc_player/index.html
retrieved_at: 2026-09-02T21:01:48.061Z
last_checked_at: 2026-09-21T22:17:40.882Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-21T22:17:40.882Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions match the source command table hex tokens verbatim; transport (9600/8/N/1, serial) matches section 4; source command catalogue fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers BDP-S5000ES only; broader \"BDP Series\" family compatibility not confirmed."
- "no settable parameters documented in source"
- "source describes no unsolicited device-initiated events"
- "source describes no multi-step macro sequences"
- "source contains no safety warnings, interlocks, or power-on"
- "firmware compatibility range not stated; only the query response format is documented. Source is BDP-S5000ES specific; applicability to other \"BDP Series\" models (e.g. BDP-S3500, BDP-BX series) is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
