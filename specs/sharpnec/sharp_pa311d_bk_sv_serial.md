---
spec_id: admin/sharp-nec-pa311d-bk-sv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PA311D BK SV Control Spec"
manufacturer: Sharp/NEC
model_family: "PA311D BK SV"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "PA311D BK SV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:36:48.753Z
last_checked_at: 2026-06-18T09:04:26.905Z
generated_at: 2026-06-18T09:04:26.905Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "ID2 (model code) value not stated — varies by model"
  - "base model type enum values referenced via \"Appendix\" not present in source"
  - "source describes no unsolicited notifications; protocol is"
  - "source documents no multi-step sequences."
  - "no interlock sequence or confirmation procedure stated in source"
  - "ID2 model code value not stated"
  - "Appendix enum tables (input terminals, aspect, eco mode, base model type, sub inputs) not in source"
  - "firmware version compatibility not stated"
  - "adjustment value min/max bounds not fixed — returned dynamically per-gain"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:04:26.905Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PA311D BK SV Control Spec

## Summary
Sharp/NEC PA311D BK SV is a projector controllable via RS-232C serial or wired/wireless LAN. This spec documents the binary command protocol (BDT140013 Rev 7.1): power, input switching, mute (picture/sound/onscreen), picture/volume/aspect adjustment, lens control and memory, shutter, freeze, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID2 (model code) value not stated — varies by model -->
<!-- UNRESOLVED: base model type enum values referenced via "Appendix" not present in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# RS-232C and LAN both supported per §1.1
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists supported set: 115200/38400/19200/9600/4800
  # supported_baud_rates: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex stated; flow control not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # power on/off commands present
  - routable        # input switch command present
  - queryable       # many status request commands present
  - levelable       # volume / picture / lens gain adjustment present
  - mutable         # picture / sound / onscreen mute commands present
```

## Actions
```yaml
# Checksum (CKS): low-order byte of sum of all preceding bytes.
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# Example: 20h 81h 01h 60h 01h 00h -> 20+81+01+60+01+00 = 103h -> CKS = 03h

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []
  notes: "009. Returns DATA01-DATA12 error bitmap (cover/fan/temp/lamp/etc.)"

- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []
  notes: "015. No other command accepted during power-on sequence."

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []
  notes: "016. No other command accepted during power-off incl. cooling."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal value (e.g. 06h = video port). See Appendix "Supplementary Information by Command".
  notes: "018. Example for video port: 02 03 00 00 02 01 06 0E"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []
  notes: "020. Cancelled by input/video switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []
  notes: "021."

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []
  notes: "022. Cancelled by input/video switch or volume adjust."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []
  notes: "023."

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []
  notes: "024. Cancelled by input/video switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []
  notes: "025."

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {data01} FF {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high 8 bits)
  notes: "030-1. Brightness=10 example: 03 10 00 00 05 00 FF 00 0A 00 21"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: Adjustment value (low 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high 8 bits)
  notes: "030-2. Volume=10 example: 03 10 00 00 05 05 00 00 0A 00 27"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {data01} 00 {cks}"
  params:
    - name: data01
      type: integer
      description: Aspect value. See Appendix "Supplementary Information by Command".
  notes: "030-12."

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03 10 00 00 05 {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target: 96h=LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: data02
      type: integer
      description: Sub-target (FFh for lamp/light)
    - name: data03
      type: integer
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high 8 bits)
  notes: "030-15. Adjusts various gains."

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []
  notes: "037. DATA01-49 projector name, DATA83-86 lamp usage (s), DATA87-90 filter usage (s)."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []
  notes: "037-3. DATA01-04 filter usage time (s), DATA05-08 filter alarm start time (s). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "01h=usage time(s), 04h=remaining life(%)"
  notes: "037-4. Usage time example: 03 96 00 00 02 00 01 9C. Negative life% if past deadline."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total, 01h=during operation"
  notes: "037-6. DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte. E.g. 05h=AUTO, 06h=MENU, 07h=UP, 4Bh=COMPUTER1, D7h=SOURCE"
    - name: data02
      type: integer
      description: Key code high byte (00h for all listed keys)
  notes: "050. AUTO example: 02 0F 00 00 02 05 00 18. Full key code table in source §3.19."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []
  notes: "051. Closes lens shutter."

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []
  notes: "052. Opens lens shutter."

- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target (06h=Periphery Focus shown)"
    - name: data02
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+cont, 81h=-cont, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "053. Send 00h to stop continuous drive."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {data01} 00 {cks}"
  params:
    - name: data01
      type: integer
      description: Lens adjustment target
  notes: "053-1. Returns upper/lower range + current value (16-bit each)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target (FFh=Stop)"
    - name: data02
      type: integer
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high 8 bits)
  notes: "053-2. Stop ignores mode/value."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-3."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-4. Controls profile selected via LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "053-5. Returns ON/OFF."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "00h=OFF, 01h=ON"
  notes: "053-6."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []
  notes: "053-7. DATA01 bitmap: lens memory/zoom/focus/shift-H/shift-V operation state."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  notes: "053-10."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []
  notes: "053-11. Returns selected profile number."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {data01} 00 00 {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light"
  notes: "060-1. Brightness example: 03 05 00 00 03 00 00 00 0B"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []
  notes: "078-1. DATA01-03 base model type, DATA04 sound fn, DATA05 profile/timer fn."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []
  notes: "078-2. DATA03 power, DATA04 cooling, DATA05 power-on/off proc, DATA06 op status."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []
  notes: "078-3. Signal switch/signal list/signal type/test pattern/display content."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []
  notes: "078-4. Picture/sound/onscreen/forced-onscreen mute + OSD display state."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []
  notes: "078-5. DATA01-32 model name (NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []
  notes: "078-6. DATA01: 00h=normal(open), 01h=closed. Mirror/lens cover."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"
  notes: "079."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {data01} 01 {cks}"
  params:
    - name: data01
      type: integer
      description: "03h=horizontal sync freq, 04h=vertical sync freq"
  notes: "084. English info strings."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []
  notes: "097-8. Returns Light/Lamp mode value (see Appendix)."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []
  notes: "097-45. DATA01-17 projector name (NUL-terminated)."

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []
  notes: "097-155. DATA01-06 MAC address."

- id: pip_pbypicture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "097-198. Sub input values via Appendix."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []
  notes: "097-243-1. DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Eco/Light/Lamp mode value (see Appendix).
  notes: "098-8."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {data01-16} 00 {cks}"
  params:
    - name: data01_16
      type: string
      description: Projector name (up to 16 bytes)
  notes: "098-45."

- id: pip_pbypicture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Mode value (PIP=00h, PbP=01h) or position (TL/TR/BL/BR=00-03h) or sub input"
  notes: "098-198."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=OFF, 01h=ON"
  notes: "098-243-1."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []
  notes: "305-1. DATA01-02 + DATA12-13 base model type, DATA03-11 model name."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []
  notes: "305-2. DATA01-16 serial number (NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []
  notes: "305-3. Op status, content displayed, signal type, mute/freeze state."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal (see Appendix).
    - name: data02
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "319-10."
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  values: [DATA01-DATA12 bit field - see error info list §3.1]
  notes: Cover/fan/temp/power/lamp/formatter/FPGA/mirror/iris errors.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  notes: From RUNNING STATUS REQUEST DATA03/DATA06.

- id: input_signal_state
  type: composite
  values: [signal_list_number, selection_signal_type, display_content]
  notes: From INPUT STATUS REQUEST.

- id: mute_state
  type: composite
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, osd_display]
  notes: From MUTE STATUS REQUEST. Each on/off.

- id: cover_state
  type: enum
  values: [normal_open, closed]

- id: lens_operation_state
  type: bitmap
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v - each stop/operating]

- id: execution_result
  type: enum
  values: [success, error]
  notes: "Common ACK: DATA01-DATA02 = 0000h success, else error."
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [UNRESOLVED - bounds returned dynamically by Gain Parameter Request 3]
  notes: Picture Adjust target 00h.

- id: contrast
  type: integer
  notes: Picture Adjust target 01h.

- id: color
  type: integer
  notes: Picture Adjust target 02h.

- id: hue
  type: integer
  notes: Picture Adjust target 03h.

- id: sharpness
  type: integer
  notes: Picture Adjust target 04h.

- id: volume
  type: integer
  notes: Volume Adjust (target 05h).

- id: lamp_light_adjust
  type: integer
  notes: Other Adjust target 96h.

- id: lamp_usage_time_seconds
  type: integer
  notes: From INFORMATION REQUEST / LAMP INFO REQUEST 3. 1-min update granularity.

- id: filter_usage_time_seconds
  type: integer
  notes: From FILTER USAGE INFO REQUEST.

- id: eco_mode
  type: integer
  notes: Values via Appendix "Supplementary Information by Command".
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; protocol is
# strictly request/response with ACK frames.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes power-on/power-off reject other commands during the transition
# (incl. cooling), but states no explicit safety interlock procedure.
# <!-- UNRESOLVED: no interlock sequence or confirmation procedure stated in source -->
```

## Notes
- Command/response format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` — all hex, frames bounded.
- Checksum (CKS) = low-order byte of sum of all preceding bytes.
- ID1 = projector control ID; ID2 = model code (model-specific, not enumerated here).
- Error responses carry `<ERR1> <ERR2>` codes — full table in source §2.4 (23 code combinations).
- Source references an "Appendix: Supplementary Information by Command" for input terminal values, aspect values, eco mode values, base model types, and sub input values — this Appendix is not present in the refined source text.

<!-- UNRESOLVED: ID2 model code value not stated -->
<!-- UNRESOLVED: Appendix enum tables (input terminals, aspect, eco mode, base model type, sub inputs) not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: adjustment value min/max bounds not fixed — returned dynamically per-gain -->
```

Spec done. 52 actions, all hex payloads verbatim. Serial + TCP both supported (port 7142). CKS algorithm documented. Appendix enums marked UNRESOLVED (not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:36:48.753Z
last_checked_at: 2026-06-18T09:04:26.905Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:04:26.905Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "ID2 (model code) value not stated — varies by model"
- "base model type enum values referenced via \"Appendix\" not present in source"
- "source describes no unsolicited notifications; protocol is"
- "source documents no multi-step sequences."
- "no interlock sequence or confirmation procedure stated in source"
- "ID2 model code value not stated"
- "Appendix enum tables (input terminals, aspect, eco mode, base model type, sub inputs) not in source"
- "firmware version compatibility not stated"
- "adjustment value min/max bounds not fixed — returned dynamically per-gain"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
