---
spec_id: admin/sharpnec-led-fa015i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA015I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA015I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA015I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:13:42.139Z
last_checked_at: 2026-06-17T20:38:41.428Z
generated_at: 2026-06-17T20:38:41.428Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source doc is generic \"Projector Control Command Reference Manual\" BDT140013 Rev 7.1 — no FA015I2-specific model code (ID2), input terminal value table, aspect value table, or eco-mode value table provided. Appendix \"Supplementary Information by Command\" referenced but not present in source."
  - "RTS/CTS pins present on D-SUB 9P but flow control mode not stated in comm conditions table"
  - "settable parameters are encoded as DATA bytes inside Actions"
  - "no unsolicited notification documented in source."
  - "no multi-step sequences documented in source."
  - "no further interlock procedures or power-on sequencing in source."
  - "Appendix \"Supplementary Information by Command\" not present in source — input terminal values, aspect values, eco-mode values, sub-input values, base model type values all missing."
  - "ID2 model code for FA015I2 not stated."
  - "default baud rate not explicitly marked as default."
  - "flow_control mode not stated despite RTS/CTS pins."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:38:41.428Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match verbatim commands in source; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA015I2 Control Spec

## Summary
Sharp/NEC LED FA015I2 projector. Control via RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP LAN (wired RJ-45 / wireless). Binary hex command protocol with frame markers (20h/A0h etc.), control ID, model code, and trailing checksum byte.

<!-- UNRESOLVED: source doc is generic "Projector Control Command Reference Manual" BDT140013 Rev 7.1 — no FA015I2-specific model code (ID2), input terminal value table, aspect value table, or eco-mode value table provided. Appendix "Supplementary Information by Command" referenced but not present in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps supported (auto); 115200 listed first
  data_bits: 8
  parity: none
  stop_bits: 1
  communication_mode: full_duplex  # verbatim from source
  flow_control: null  # UNRESOLVED: RTS/CTS pins present on D-SUB 9P but flow control mode not stated in comm conditions table
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF
  - queryable       # inferred: many 078/097/305 status requests
  - routable        # inferred: 018 INPUT SW CHANGE
  - levelable       # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
```

## Actions
```yaml
# Binary hex payloads verbatim from source. Frame: lead bytes are the command
# request; trailing byte is CKS checksum (sum of all preceding bytes, low byte).
# <ID1> = control ID set on projector; <ID2> = model code (per-model, UNRESOLVED
# for FA015I2). For parameterized commands the template shows the variable byte(s).

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal (06h=video port; full table in Appendix not in source)"

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Brightness 01h=Contrast 02h=Color 03h=Hue 04h=Sharpness"
    - name: DATA02
      type: enum
      description: "00h=absolute 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high 8 bits)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=absolute 01h=relative"
    - name: DATA02
      type: integer
      description: "Value (low 8 bits)"
    - name: DATA03
      type: integer
      description: "Value (high 8 bits)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Aspect value (table in Appendix, not in source)"

- id: other_adjust
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {DATA03}-{DATA05} {CKS}"
  params:
    - name: DATA03
      type: enum
      description: "00h=absolute 01h=relative"
    - name: DATA04
      type: integer
      description: "Value (low 8 bits)"
    - name: DATA05
      type: integer
      description: "Value (high 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_info_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_info_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Lamp1 01h=Lamp2 (two-lamp models only)"
    - name: DATA02
      type: enum
      description: "01h=usage time (s) 04h=remaining life (%)"

- id: carbon_savings_info_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Total 01h=During operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed codes)"

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "06h=Periphery Focus"
    - name: DATA02
      type: enum
      description: "00h=Stop 01h=+1s 02h=+0.5s 03h=+0.25s 7Fh=+ 81h=- FDh=-0.25s FEh=-0.5s FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Lens axis target (see source)"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "FFh=Stop (else axis target)"
    - name: DATA02
      type: enum
      description: "00h=absolute 02h=relative"
    - name: DATA03
      type: integer
      description: "Value (low 8 bits)"
    - name: DATA04
      type: integer
      description: "Value (high 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE 01h=STORE 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE 01h=STORE 02h=RESET"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL 01h=FORCED MUTE"
    - name: DATA02
      type: enum
      description: "00h=OFF 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=Profile1 01h=Profile2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=BRIGHTNESS 01h=CONTRAST 02h=COLOR 03h=HUE 04h=SHARPNESS 05h=VOLUME 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "01h=freeze on 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "03h=Horizontal sync freq 04h=Vertical sync freq"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE 01h=START POSITION 02h=SUB INPUT/SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Eco mode value (table in Appendix, not in source)"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE 01h=START POSITION 02h=SUB INPUT/SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "Setting value (per DATA01; sub-input values in Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "00h=OFF 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal (table in Appendix, not in source)"
    - name: DATA02
      type: enum
      description: "00h=specified terminal 01h=BNC 02h=COMPUTER"
```

## Feedbacks
```yaml
# Generic response frame: success = Axh/C2xh lead with optional DATA + CKS;
# failure = Axh lead with ERR1 ERR2 CKS. Per-command data shapes documented inline
# in each Action entry above (DATA fields).

- id: error_status
  type: bitmask
  length_bytes: 12
  description: "DATA01-DATA12 bit field; bit=0 normal, bit=1 error (cover/fan/temp/lamp/etc.)"

- id: command_ack
  type: frame
  description: "Success response: 2xh/Axh lead + ID1 ID2 + LEN + optional DATA + CKS"

- id: command_error
  type: frame
  description: "Failure response: Axh lead + ID1 ID2 + 02h + ERR1 ERR2 CKS"
  error_codes:
    ERR1_00_ERR2_00: "Command not recognized"
    ERR1_00_ERR2_01: "Command not supported by model"
    ERR1_01_ERR2_00: "Specified value invalid"
    ERR1_01_ERR2_01: "Specified input terminal invalid"
    ERR1_01_ERR2_02: "Specified language invalid"
    ERR1_02_ERR2_00: "Memory allocation error"
    ERR1_02_ERR2_02: "Memory in use"
    ERR1_02_ERR2_03: "Specified value cannot be set"
    ERR1_02_ERR2_04: "Forced onscreen mute on"
    ERR1_02_ERR2_06: "Viewer error"
    ERR1_02_ERR2_07: "No signal"
    ERR1_02_ERR2_08: "Test pattern or filter displayed"
    ERR1_02_ERR2_09: "No PC card inserted"
    ERR1_02_ERR2_0A: "Memory operation error"
    ERR1_02_ERR2_0C: "Entry list displayed"
    ERR1_02_ERR2_0D: "Command cannot be accepted (power off)"
    ERR1_02_ERR2_0E: "Command execution failed"
    ERR1_02_ERR2_0F: "No authority for operation"
    ERR1_03_ERR2_00: "Specified gain number incorrect"
    ERR1_03_ERR2_01: "Specified gain invalid"
    ERR1_03_ERR2_02: "Adjustment failed"
```

## Variables
```yaml
# UNRESOLVED: settable parameters are encoded as DATA bytes inside Actions
# above; no separate variable registry documented in source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on, no other command accepted."
  - command: power_off
    note: "While turning off (incl. cooling time), no other command accepted."
# UNRESOLVED: no further interlock procedures or power-on sequencing in source.
```

## Notes
- Source doc: "Projector Control Command Reference Manual" BDT140013 Revision 7.1. Generic across Sharp/NEC projector family — not FA015I2-specific. ID2 (model code) value UNRESOLVED.
- Checksum (CKS) = low byte of sum of all preceding bytes. Worked example in source: `20h 81h 01h 60h 01h 00h` → sum 103h → CKS 03h.
- Communication mode full duplex; baud auto-negotiable among 4800/9600/19200/38400/115200. Default 115200 assumed (listed first) — mark UNRESOLVED if device differs.
- Serial cable: cross (null-modem). D-SUB 9P pin 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- Lamp/filter usage returned in seconds, updated at 1-minute intervals.
- Lamp remaining life (%) may return negative if replacement deadline exceeded.
- Data updates (lamp/filter usage) lag at 1-minute intervals despite 1-second resolution.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in source — input terminal values, aspect values, eco-mode values, sub-input values, base model type values all missing. -->
<!-- UNRESOLVED: ID2 model code for FA015I2 not stated. -->
<!-- UNRESOLVED: default baud rate not explicitly marked as default. -->
<!-- UNRESOLVED: flow_control mode not stated despite RTS/CTS pins. -->
```

54 commands enumerated (all source rows). Spec draft complete. Gaps: Appendix value tables, ID2 model code, default baud, flow_control — all marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:13:42.139Z
last_checked_at: 2026-06-17T20:38:41.428Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:38:41.428Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match verbatim commands in source; transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source doc is generic \"Projector Control Command Reference Manual\" BDT140013 Rev 7.1 — no FA015I2-specific model code (ID2), input terminal value table, aspect value table, or eco-mode value table provided. Appendix \"Supplementary Information by Command\" referenced but not present in source."
- "RTS/CTS pins present on D-SUB 9P but flow control mode not stated in comm conditions table"
- "settable parameters are encoded as DATA bytes inside Actions"
- "no unsolicited notification documented in source."
- "no multi-step sequences documented in source."
- "no further interlock procedures or power-on sequencing in source."
- "Appendix \"Supplementary Information by Command\" not present in source — input terminal values, aspect values, eco-mode values, sub-input values, base model type values all missing."
- "ID2 model code for FA015I2 not stated."
- "default baud rate not explicitly marked as default."
- "flow_control mode not stated despite RTS/CTS pins."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
