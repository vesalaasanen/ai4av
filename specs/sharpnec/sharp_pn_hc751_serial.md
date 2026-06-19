---
spec_id: admin/sharp-nec-pn-hc751
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-HC751 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-HC751
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-HC751
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:24:19.853Z
last_checked_at: 2026-06-18T09:05:42.329Z
generated_at: 2026-06-18T09:05:42.329Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated. Input terminal / aspect / eco-mode / sub-input enum values referenced to a separate \"Appendix — Supplementary Information by Command\" not present in this refined source. Model code (ID2) value not stated."
  - "flow control not stated in source (communication mode = full duplex)"
  - "value not stated in source)."
  - "not in this source).\""
  - "no async event mechanism documented."
  - "none documented."
  - "exact cooling-time / power-transition duration in ms not stated in source."
  - "firmware version compatibility range not stated."
  - "model code ID2 value for PN-HC751 not stated."
  - "flow_control not stated (only \"full duplex\" mode given)."
  - "input-terminal / aspect / eco-mode / sub-input / base-model-type enum value lists live in a separate appendix absent from this refined source."
  - "numeric cooling-time / power-transition lockout duration not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:05:42.329Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-HC751 Control Spec

## Summary
Sharp/NEC PN-HC751 projector. Control via RS-232C serial + TCP/IP LAN (TCP port 7142). Binary hex command protocol, BDT140013 Rev 7.1 command reference. Covers power, input switch, mute, picture/volume/aspect adjust, shutter, lens control + memory, eco/edge-blend/PIP set, plus broad status query catalogue.

<!-- UNRESOLVED: firmware version range not stated. Input terminal / aspect / eco-mode / sub-input enum values referenced to a separate "Appendix — Supplementary Information by Command" not present in this refined source. Model code (ID2) value not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (communication mode = full duplex)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands
  - queryable    # inferred: large status-request catalogue (078-x, 037-x, 305-x, etc.)
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP/LIGHT ADJUST
  - routable     # inferred: INPUT SW CHANGE + AUDIO SELECT SET
```

## Actions
```yaml
# Framing: each command = hex byte tokens, last byte = checksum (CKS).
# CKS = low byte of sum of all preceding bytes. For parameterized commands the
# CKS must be recomputed over the final byte stream. ID1 = control ID set on
# projector; ID2 = model code (UNRESOLVED: value not stated in source).
# Success response first byte = command-type | 0x20; error response = | 0xA0.

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
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video). Full value list in Appendix - Supplementary Information by Command (UNRESOLVED: not in this source)."

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: enum
      description: "Adjustment target"
      values: ["00h Brightness", "01h Contrast", "02h Color", "03h Hue", "04h Sharpness"]
    - name: data02
      type: enum
      description: "Adjustment mode"
      values: ["00h absolute", "01h relative"]
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: enum
      description: "Adjustment mode"
      values: ["00h absolute", "01h relative"]
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. Full value list in Appendix - Supplementary Information by Command (UNRESOLVED: not in this source)."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target high byte (source example: 96h = LAMP/LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Target low byte (source example: FFh)"
    - name: data03
      type: enum
      description: "Adjustment mode"
      values: ["00h absolute", "01h relative"]
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: enum
      description: "Lamp selector (01h Lamp 2 only valid on two-lamp models)"
      values: ["00h Lamp 1", "01h Lamp 2"]
    - name: data02
      type: enum
      description: "Content"
      values: ["01h lamp usage time (seconds)", "04h lamp remaining life (%)"]

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Scope"
      values: ["00h Total Carbon Savings", "01h Carbon Savings during operation"]

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD-type key code, see key code list)"
    - name: data02
      type: integer
      description: "Key code high byte"

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target (source shows 06h Periphery Focus in header row; target list truncated in source)"
    - name: data02
      type: enum
      description: "Content / drive instruction"
      values: ["00h Stop", "01h +1s", "02h +0.5s", "03h +0.25s", "7Fh plus (continuous)", "81h minus (continuous)", "FDh -0.25s", "FEh -0.5s", "FFh -1s"]

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: enum
      description: "Stop flag"
      values: ["FFh Stop"]
    - name: data02
      type: enum
      description: "Adjustment mode"
      values: ["00h absolute", "02h relative"]
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Operation"
      values: ["00h MOVE", "01h STORE", "02h RESET"]

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Operation (acts on profile selected via 053-10)"
      values: ["00h MOVE", "01h STORE", "02h RESET"]

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Option"
      values: ["00h LOAD BY SIGNAL", "01h FORCED MUTE"]

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: enum
      description: "Option"
      values: ["00h LOAD BY SIGNAL", "01h FORCED MUTE"]
    - name: data02
      type: enum
      description: "Setting value"
      values: ["00h OFF", "01h ON"]

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Profile number"
      values: ["00h Profile 1", "01h Profile 2"]

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: enum
      description: "Adjusted value name"
      values: ["00h PICTURE/BRIGHTNESS", "01h PICTURE/CONTRAST", "02h PICTURE/COLOR", "03h PICTURE/HUE", "04h PICTURE/SHARPNESS", "05h VOLUME", "96h LAMP/LIGHT ADJUST"]

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
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Freeze state"
      values: ["01h ON", "02h OFF"]

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: enum
      description: "Information type"
      values: ["03h Horizontal sync frequency", "04h Vertical sync frequency"]

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

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Parameter"
      values: ["00h MODE", "01h START POSITION", "02h SUB INPUT / SUB INPUT 1", "09h SUB INPUT 2", "0Ah SUB INPUT 3"]

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. Full value list in Appendix - Supplementary Information by Command (UNRESOLVED: not in this source)."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01_to_data16} 00h {cks}"
  params:
    - name: data01_to_data16
      type: string
      description: "Projector name, up to 16 bytes"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: enum
      description: "Parameter"
      values: ["00h MODE", "01h START POSITION", "02h SUB INPUT / SUB INPUT 1", "09h SUB INPUT 2", "0Ah SUB INPUT 3"]
    - name: data02
      type: integer
      description: "Setting value (MODE/START POSITION enums in source; sub-input value list in Appendix - UNRESOLVED)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: enum
      description: "Setting value"
      values: ["00h OFF", "01h ON"]

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
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal. Full value list in Appendix - Supplementary Information by Command (UNRESOLVED: not in this source)."
    - name: data02
      type: enum
      description: "Audio source"
      values: ["00h terminal specified in DATA01", "01h BNC", "02h COMPUTER"]
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "12-byte error status (DATA01-12) from 009. ERROR STATUS REQUEST. Bits: cover/fan/temp/power/lamp/interlock errors; see error information list."

- id: power_state
  type: enum
  values: ["00h Standby", "01h Power on"]
  description: "DATA03 of 078-2 RUNNING STATUS REQUEST"

- id: cooling_process
  type: enum
  values: ["00h Not executed", "01h During execution"]
  description: "DATA04 of 078-2"

- id: operation_status
  type: enum
  values: ["00h Standby (Sleep)", "04h Power on", "05h Cooling", "06h Standby (error)", "0Fh Standby (Power saving)", "10h Network standby"]
  description: "DATA06 of 078-2 / DATA01 of 305-3"

- id: mute_status
  type: composite
  description: "078-4 MUTE STATUS REQUEST: picture mute / sound mute / onscreen mute / forced onscreen mute / OSD (each 00h Off / 01h On)"

- id: cover_status
  type: enum
  values: ["00h Normal (cover opened)", "01h Cover closed"]
  description: "078-6 COVER STATUS REQUEST"

- id: input_signal_status
  type: composite
  description: "078-3 INPUT STATUS REQUEST: signal switch process, signal list number, selection signal type 1/2, content displayed"

- id: lens_status
  type: bitmask
  description: "053-7: per-target lens operation state (lens memory/zoom/focus/lens shift H+V)"

- id: command_error
  type: composite
  description: "ERR1+ERR2 error code pair returned on command failure (see error code list)."
```

## Variables
```yaml
- id: volume
  description: "Sound volume (030-2 VOLUME ADJUST / 060-1 data01=05h)"

- id: brightness
  description: "Picture brightness (030-1 data01=00h / 060-1 data01=00h)"

- id: contrast
  description: "Picture contrast (030-1 data01=01h / 060-1 data01=01h)"

- id: color
  description: "Picture color (030-1 data01=02h)"

- id: hue
  description: "Picture hue (030-1 data01=03h)"

- id: sharpness
  description: "Picture sharpness (030-1 data01=04h)"

- id: lamp_light_adjust
  description: "Lamp/light adjust (030-15 data01/02=96h/FFh, 060-1 data01=96h)"

- id: aspect
  description: "Aspect value (030-12) - enum list UNRESOLVED (in Appendix)"

- id: eco_mode
  description: "Eco / light / lamp mode (098-8 SET, 097-8 REQUEST) - value enum UNRESOLVED (in Appendix)"

- id: edge_blending_mode
  description: "Edge blending on/off (098-243-1 SET, 097-243-1 REQUEST)"

- id: projector_name
  description: "LAN projector name, up to 16 bytes (098-45 SET, 097-45 REQUEST)"
```

## Events
```yaml
# Device pushes no unsolicited notifications in this protocol; all data is
# returned synchronously as a response to a request command.
# UNRESOLVED: no async event mechanism documented.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
warnings:
  - "POWER ON/OFF transition locks out all other commands until complete (source: 015, 016)."
  - "POWER OFF includes a cooling period during which no other command is accepted (source: 016)."
  - "Commands issued while power is off return error ERR1=02h ERR2=0Dh (source: error code list)."
  - "Lens continuous drive (DATA02=7Fh plus / 81h minus) must be explicitly stopped by sending 00h afterward (source: 053 LENS CONTROL)."
confirmation_required_for: []
interlocks:
  - "During POWER ON transition no other command accepted (015)."
  - "During POWER OFF including cooling time no other command accepted (016)."
  - "Commands rejected when power is off (ERR 02h 0Dh)."
  - "Lens memory option FORCED MUTE interlocks with lens memory load (053-5/053-6)."
cooldowns: []
# Source states cooling-time lockout qualitatively but gives no numeric duration.
# UNRESOLVED: exact cooling-time / power-transition duration in ms not stated in source.
```

## Notes
Binary hex protocol. Every command framed with leading type byte + opcode, trailing CKS checksum byte. CKS = low byte of sum of all preceding bytes (see source checksum example). Success responses share opcode with type-byte high nibble set to 2 (e.g. command 02h -> ack 22h, error A2h); request commands 00h/03h ack at 20h/23h, error A0h/A3h.

ID1 = projector control ID (configurable). ID2 = model code, varies by model - value for PN-HC751 NOT stated in this source. Implementer must obtain ID2 from device or full manual.

Status update granularity: lamp + filter usage time returned in 1-second units but refreshed internally at 1-minute intervals (source 037, 037-4). Lamp remaining-life goes negative once replacement deadline exceeded (037-4).

Large enum lists deferred to a separate Appendix ("Supplementary Information by Command") not included in this refined source: input terminal values (018, 319-10), aspect values (030-12), eco/light/lamp mode values (097-8, 098-8), sub-input values (097-198, 098-198), base-model-type values (078-1, 305-1). Marked UNRESOLVED where referenced.

<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: model code ID2 value for PN-HC751 not stated. -->
<!-- UNRESOLVED: flow_control not stated (only "full duplex" mode given). -->
<!-- UNRESOLVED: input-terminal / aspect / eco-mode / sub-input / base-model-type enum value lists live in a separate appendix absent from this refined source. -->
<!-- UNRESOLVED: numeric cooling-time / power-transition lockout duration not stated. -->
````

Safety fix applied: `warnings`, `interlocks` now arrays of non-empty strings only. `confirmation_required_for: []` + `cooldowns: []` empty arrays (valid). No object/array-in-array.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:24:19.853Z
last_checked_at: 2026-06-18T09:05:42.329Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:05:42.329Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated. Input terminal / aspect / eco-mode / sub-input enum values referenced to a separate \"Appendix — Supplementary Information by Command\" not present in this refined source. Model code (ID2) value not stated."
- "flow control not stated in source (communication mode = full duplex)"
- "value not stated in source)."
- "not in this source).\""
- "no async event mechanism documented."
- "none documented."
- "exact cooling-time / power-transition duration in ms not stated in source."
- "firmware version compatibility range not stated."
- "model code ID2 value for PN-HC751 not stated."
- "flow_control not stated (only \"full duplex\" mode given)."
- "input-terminal / aspect / eco-mode / sub-input / base-model-type enum value lists live in a separate appendix absent from this refined source."
- "numeric cooling-time / power-transition lockout duration not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
