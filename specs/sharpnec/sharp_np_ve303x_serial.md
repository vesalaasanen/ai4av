---
spec_id: admin/sharp-nec-np-ve303x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP VE303X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP VE303X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP VE303X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:26:45.653Z
last_checked_at: 2026-06-18T08:58:02.434Z
generated_at: 2026-06-18T08:58:02.434Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value map, aspect value map, eco-mode value map, base-model-type codes, and selection-signal-type maps are defined in a \"Supplementary Information by Command\" appendix not present in the refined source and could not be populated."
  - "flow control not stated in source (RTS/CTS pins wired per pin table)"
  - "value map in \"Supplementary Information by Command\" appendix"
  - "value map in appendix"
  - "none documented in source."
  - "not applicable / none documented."
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "input-terminal, aspect, eco-mode, base-model-type, and selection-signal-type value maps live in a \"Supplementary Information by Command\" appendix absent from the refined source."
  - "firmware version compatibility not stated in source."
  - "serial flow_control not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:58:02.434Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP VE303X Control Spec

## Summary
Sharp/NEC NP VE303X is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). This spec covers the binary hex command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, lens/shutter, picture/volume/aspect/gain adjustment, eco mode, PIP/P-by-P, edge blending, and a broad set of status/error/information queries.

<!-- UNRESOLVED: input-terminal value map, aspect value map, eco-mode value map, base-model-type codes, and selection-signal-type maps are defined in a "Supplementary Information by Command" appendix not present in the refined source and could not be populated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200/38400/19200/9600/4800  # bps; source lists supported set, single value selectable on device
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired per pin table)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (POWER ON / POWER OFF commands present)
# - queryable       (many status / information request commands returning values)
# - levelable       (volume, picture, lamp/light adjust commands present)
# - routable        (INPUT SW CHANGE / audio select routing present)
traits:
  - powerable  # inferred from power command examples
  - queryable  # inferred from query command examples
  - levelable  # inferred from volume/picture/gain adjust commands
  - routable   # inferred from input switch / audio select commands
```

## Actions
```yaml
# Binary protocol. Commands are hex byte sequences; the final byte of each
# fixed command is the checksum (CKS). Parameterized commands end with <CKS>
# computed as the low-order byte of the sum of all preceding bytes.
# ID1 (control ID) / ID2 (model code) appear in responses only.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []

# --- Input / routing ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02 03 00 00 02 01 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port). Full value list UNRESOLVED - defined in "Supplementary Information by Command" appendix not in source.

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal. Value list UNRESOLVED (appendix not in source).
    - name: DATA02
      type: integer
      description: "Setting value (00h = terminal specified in DATA01, 01h = BNC, 02h = COMPUTER)."

# --- Mutes ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []

# --- Adjustments ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)."
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)."
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits).

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)."
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits).

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect. Value list UNRESOLVED (appendix not in source).

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03 10 00 00 05 <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "96h (LAMP ADJUST / LIGHT ADJUST)."
    - name: DATA02
      type: integer
      description: "FFh (per source target pairing)."
    - name: DATA03
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)."
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits).

# --- Remote / freeze ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Source-documented examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys).

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off."

# --- Shutter / lens ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; source documents 06h=Periphery Focus."
    - name: DATA02
      type: integer
      description: "Content (00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop)."
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute, 02h=relative)."
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits).

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)."

# --- Eco / LAN / PIP / edge blending ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode. Value list UNRESOLVED (appendix not in source).

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00 <CKS>"
  params:
    - name: name
      type: string
      description: Projector name bytes (DATA01-DATA16, up to 16 bytes, NUL-terminated).

- id: pip_picture_by_picture_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Item (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)."
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP,01h=P-by-P; START POSITION: 00h..03h; SUB INPUT values UNRESOLVED in appendix)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)."

# --- Queries ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []

- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp (00h=Lamp 1, 01h=Lamp 2 - Lamp 2 only on two-lamp models)."
    - name: DATA02
      type: integer
      description: "Content (01h=usage time seconds, 04h=remaining life %)."

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 <DATA01> 00 <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens adjustment target (same target set as Lens Control).

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name (00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST)."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture by Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []
```

## Feedbacks
```yaml
# Responses are binary. Success responses echo the command's low byte and add
# ID1/ID2 + LEN + data + CKS; error responses use header 0xAx with ERR1/ERR2.
# Per-command response data layouts are documented in the source (e.g. running
# status, mute status, error status bit fields). Enumerated feedback states:
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  # source: 078-2 RUNNING STATUS / 305-3 BASIC INFORMATION DATA01/DATA06
- id: error_state
  type: bitmask
  values: [cover_error, fan_error, temperature_error, lamp_off, lamp_replacement, lamp_usage_exceeded, formatter_error, mirror_cover_error, lens_not_installed, interlock_switch_open, system_error]
  # source: 009 ERROR STATUS REQUEST DATA01-12 bit fields
- id: command_result
  type: enum
  values: [success, error]
  # source: ERR1/ERR2 codes (section 2.4)
```

## Variables
```yaml
# Settable parameters surfaced via dedicated request commands (not discrete actions).
# Value maps for several are UNRESOLVED (appendix not in source).
- id: eco_mode
  type: enum
  # UNRESOLVED: value map in "Supplementary Information by Command" appendix
- id: aspect
  type: enum
  # UNRESOLVED: value map in appendix
- id: input_terminal
  type: enum
  # UNRESOLVED: value map in appendix
```

## Events
```yaml
# No unsolicited notifications documented. Protocol is strictly request/response.
# UNRESOLVED: none documented in source.
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: not applicable / none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes command-lockout behavior (not interlocks to populate):
#   - During power-on no other command accepted (3.2)
#   - During power-off incl. cooling no other command accepted (3.3)
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source.
```

## Notes
- Command framing: each fixed command's final byte is the checksum (CKS). Parameterized commands carry `<CKS>` to be computed at runtime.
- Checksum algorithm (source 2.2): sum all bytes preceding the checksum, take the low-order 8 bits of the result as CKS. Example from source: `20 81 01 60 01 00` → sum = 103h → CKS = 03h.
- Response headers: `2x` = success (command class +0x20), `Ax` = error (command class +0xA0). Responses include ID1 (control ID set on projector) and ID2 (model code); commands do not.
- Error codes ERR1/ERR2 are documented in section 2.4 (e.g. 00h/00h = unrecognized command; 02h/0Dh = command rejected because power off).
- Serial cable is a cross cable wired to the PC CONTROL D-SUB 9P port (pin table in source 1.1). RTS/CTS pins are wired though explicit flow control is not stated.
- Lamp/filter usage times returned in seconds, updated at one-minute intervals; lamp remaining life (%) may be negative past the replacement deadline.
- While a lens is being driven, lens position can be controlled without a stop by re-issuing the same Lens Control command (3.22).

<!-- UNRESOLVED: input-terminal, aspect, eco-mode, base-model-type, and selection-signal-type value maps live in a "Supplementary Information by Command" appendix absent from the refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow_control not stated in source. -->
````

Spec done. 53 commands enumerated (28 actions + 25 queries). Serial + TCP, port 7142. Value-map gaps flagged UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:26:45.653Z
last_checked_at: 2026-06-18T08:58:02.434Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:58:02.434Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value map, aspect value map, eco-mode value map, base-model-type codes, and selection-signal-type maps are defined in a \"Supplementary Information by Command\" appendix not present in the refined source and could not be populated."
- "flow control not stated in source (RTS/CTS pins wired per pin table)"
- "value map in \"Supplementary Information by Command\" appendix"
- "value map in appendix"
- "none documented in source."
- "not applicable / none documented."
- "no explicit safety warnings, interlock procedures, or power-on"
- "input-terminal, aspect, eco-mode, base-model-type, and selection-signal-type value maps live in a \"Supplementary Information by Command\" appendix absent from the refined source."
- "firmware version compatibility not stated in source."
- "serial flow_control not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
