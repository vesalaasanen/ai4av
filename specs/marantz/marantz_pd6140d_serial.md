---
spec_id: admin/marantz-pd6140d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz PD6140D Control Spec"
manufacturer: Marantz
model_family: PD6140D
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - PD6140D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - marantz.com
  - manualslib.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/default/dw87566b8e/./archive-downloads/dfu_pd6140d_final_eng.pdf
  - https://www.marantz.com/en-us/product/archive-flat-panel-displays/pd6140d/PD6140D.html
  - "https://www.manualslib.com/manual/98912/Marantz-Pd6140d.html?page=48"
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/default/dw8a8101fd/./archive-downloads/pd6140d_specs.pdf
retrieved_at: 2026-06-03T12:35:32.211Z
last_checked_at: 2026-06-23T07:02:24.562Z
generated_at: 2026-06-23T07:02:24.562Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source note states \"Contact your local dealer for a full list of the External Control Codes\" — the table below is an explicit subset, not the complete command catalogue. Additional undocumented codes likely exist."
  - "no feedback / query / response codes documented in source."
  - "firmware version compatibility not stated in source."
  - "flow control not stated in source"
  - "source documents no query/response or unsolicited feedback codes."
  - "no settable continuous parameters (volume, brightness, etc.)"
  - "no unsolicited notification codes documented in source."
  - "no multi-step sequences documented in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "flow_control not stated in source."
  - "command acknowledgement / reply format not documented."
  - "full command catalogue not provided (dealer-only)."
  - "no AUTO ID, volume, brightness, or other controls documented with payloads."
verification:
  verdict: verified
  checked_at: 2026-06-23T07:02:24.562Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions found literally in source table with exact hex sequences; all transport parameters verified against communication specifications. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Marantz PD6140D Control Spec

## Summary
The Marantz PD6140D is a plasma monitor controllable via the EXTERNAL CONTROL connector (D-Sub 9-pin male, RS-232C). This spec covers power, input selection, audio mute, picture mode, screen (aspect) mode, auto picture, and cinema mode commands documented in the vendor external control code reference.

<!-- UNRESOLVED: source note states "Contact your local dealer for a full list of the External Control Codes" — the table below is an explicit subset, not the complete command catalogue. Additional undocumented codes likely exist. -->
<!-- UNRESOLVED: no feedback / query / response codes documented in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
  connector: D-Sub 9-pin male (EXTERNAL CONTROL)
  cable: crossed (reverse) cable
  communication_code: hex
  communication_system: asynchronous
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: power on/off commands present
  - routable    # inferred: input selection commands present
```

## Actions
```yaml
# Note: payloads are hex bytes space-separated. Source writes them with an "H"
# suffix (e.g. 9FH 80H 60H 4EH 00H CDH); the H is hex notation and stripped here.
# Source OCR renders the Picture Mode parameter byte as "OAH" (capital O); this is
# a zero/digit OCR error - written here as 0A (valid hex for the picture-mode group).
# Each row below corresponds to one row in the source External Control Codes table.

- id: power_on
  label: Power On
  kind: action
  command: "9F 80 60 4E 00 CD"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "9F 80 60 4F 00 CE"
  params: []

- id: select_input_video1_bnc
  label: Select Input Video1 (BNC)
  kind: action
  command: "DF 80 60 47 01 01 08"
  params: []

- id: select_input_video2_rca
  label: Select Input Video2 (RCA)
  kind: action
  command: "DF 80 60 47 01 02 09"
  params: []

- id: select_input_video3_svideo
  label: Select Input Video3 (S-Video)
  kind: action
  command: "DF 80 60 47 01 03 0A"
  params: []

- id: select_input_dvd1_hd1_rca
  label: Select Input DVD1/HD1 (RCA)
  kind: action
  command: "DF 80 60 47 01 05 0C"
  params: []

- id: select_input_dvd2_hd2_bnc
  label: Select Input DVD2/HD2 (BNC)
  kind: action
  command: "DF 80 60 47 01 06 0D"
  params: []

- id: select_input_rgb1_minidsub15
  label: Select Input RGB1 (mini D-sub 15-pin)
  kind: action
  command: "DF 80 60 47 01 07 0E"
  params: []

- id: select_input_rgb2_5bnc
  label: Select Input RGB2 (5BNC)
  kind: action
  command: "DF 80 60 47 01 08 0F"
  params: []

- id: select_input_rgb3_dvi
  label: Select Input RGB3 (DVI)
  kind: action
  command: "DF 80 60 47 01 0C 13"
  params: []

- id: audio_mute_on
  label: Audio Mute On
  kind: action
  command: "9F 80 60 3E 00 BD"
  params: []

- id: audio_mute_off
  label: Audio Mute Off
  kind: action
  command: "9F 80 60 3F 00 BE"
  params: []

- id: picture_mode_normal
  label: Picture Mode Normal
  kind: action
  command: "DF 80 60 0A 01 01 CB"
  params: []

- id: picture_mode_theat_1
  label: Picture Mode Theatre 1
  kind: action
  command: "DF 80 60 0A 01 02 CC"
  params: []

- id: picture_mode_theat_2
  label: Picture Mode Theatre 2
  kind: action
  command: "DF 80 60 0A 01 03 CD"
  params: []

- id: picture_mode_default
  label: Picture Mode Default
  kind: action
  command: "DF 80 60 0A 01 04 CE"
  params: []

- id: screen_mode_stadium
  label: Screen Mode Stadium
  kind: action
  command: "DF 80 60 51 01 02 13"
  params: []

- id: screen_mode_zoom
  label: Screen Mode Zoom
  kind: action
  command: "DF 80 60 51 01 03 14"
  params: []

- id: screen_mode_normal
  label: Screen Mode Normal
  kind: action
  command: "DF 80 60 51 01 04 15"
  params: []

- id: screen_mode_full
  label: Screen Mode Full
  kind: action
  command: "DF 80 60 51 01 05 16"
  params: []

- id: screen_mode_14_9
  label: Screen Mode 14:9
  kind: action
  command: "DF 80 60 51 01 09 1A"
  params: []

- id: screen_mode_235_1
  label: Screen Mode 2.35:1
  kind: action
  command: "DF 80 60 51 01 0A 1B"
  params: []

- id: auto_picture_on
  label: Auto Picture On
  kind: action
  command: "DF 80 60 7F 03 03 09 00 4D"
  params: []

- id: auto_picture_off
  label: Auto Picture Off
  kind: action
  command: "DF 80 60 7F 03 03 09 01 4E"
  params: []

- id: cinema_mode_on
  label: Cinema Mode On
  kind: action
  command: "DF 80 60 C1 01 01 82"
  params: []

- id: cinema_mode_off
  label: Cinema Mode Off
  kind: action
  command: "DF 80 60 C1 01 02 83"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no query/response or unsolicited feedback codes.
# The note "Contact your local dealer for a full list" implies additional codes
# may exist but none are specified here.
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters (volume, brightness, etc.)
# documented in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification codes documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Power on/off are direct commands with no
# documented cooldown or warm-up interlock.
```

## Notes
- Source is an RS-232C external control reference for the PD6140D plasma monitor. The source explicitly states the documented codes are a subset ("Contact your local dealer for a full list of the External Control Codes if needed"), so this spec is incomplete by design.
- Communication parameters stated verbatim: asynchronous, RS-232C, 9600 bps, 8 data bits, odd parity, 1 stop bit, hex communication code.
- Connector is D-Sub 9-pin male labelled EXTERNAL CONTROL. Pinout documented in source: pin 2 RXD, pin 3 TXD, pin 5 GND, plus DTR/DSR/RTS/CTS handshake pins (1 and 9 No Connection). Source mandates a crossed (reverse) cable.
- All command payloads are 6–9 hex bytes; the final byte of each command is a per-command value (appears to be a fixed checksum/sequence byte per row, not a documented algorithm — left verbatim, do not recompute).
- Source OCR writes the Picture Mode parameter byte as "OAH" (capital O). This is a zero/digit OCR artefact; written here as 0A, the valid hex value for the picture-mode parameter group consistent with the surrounding table.
- A separate "AUTO ID settings" feature (ON/OFF) is described in source prose but no external control hex code is given for it, so it is not enumerated as an action.
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: command acknowledgement / reply format not documented. -->
<!-- UNRESOLVED: full command catalogue not provided (dealer-only). -->
<!-- UNRESOLVED: no AUTO ID, volume, brightness, or other controls documented with payloads. -->
```

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - marantz.com
  - manualslib.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/default/dw87566b8e/./archive-downloads/dfu_pd6140d_final_eng.pdf
  - https://www.marantz.com/en-us/product/archive-flat-panel-displays/pd6140d/PD6140D.html
  - "https://www.manualslib.com/manual/98912/Marantz-Pd6140d.html?page=48"
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/default/dw8a8101fd/./archive-downloads/pd6140d_specs.pdf
retrieved_at: 2026-06-03T12:35:32.211Z
last_checked_at: 2026-06-23T07:02:24.562Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T07:02:24.562Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions found literally in source table with exact hex sequences; all transport parameters verified against communication specifications. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source note states \"Contact your local dealer for a full list of the External Control Codes\" — the table below is an explicit subset, not the complete command catalogue. Additional undocumented codes likely exist."
- "no feedback / query / response codes documented in source."
- "firmware version compatibility not stated in source."
- "flow control not stated in source"
- "source documents no query/response or unsolicited feedback codes."
- "no settable continuous parameters (volume, brightness, etc.)"
- "no unsolicited notification codes documented in source."
- "no multi-step sequences documented in source."
- "source contains no safety warnings, interlock procedures, or"
- "flow_control not stated in source."
- "command acknowledgement / reply format not documented."
- "full command catalogue not provided (dealer-only)."
- "no AUTO ID, volume, brightness, or other controls documented with payloads."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
