---
spec_id: admin/sharp-nec-ld-e121-u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld E121 U Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld E121 U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld E121 U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:33:53.474Z
last_checked_at: 2026-06-17T20:01:17.341Z
generated_at: 2026-06-17T20:01:17.341Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact marketing model name/series not stated in this command reference (only generic \"projector\"); firmware version compatibility not stated."
  - "flow control not specified (RTS/CTS pins wired but no setting stated)"
  - "eco mode enum values listed in Appendix not included in this source excerpt"
  - "bounds returned dynamically by 060-1 request, not stated as constants"
  - "source documents no unsolicited notifications; all responses are"
  - "source documents no multi-step command sequences."
  - "no voltage/current/power specs, fault-recovery sequences, or"
  - "marketing model name / product family for \"Ld E121 U\" not confirmed in this command reference (doc is generic across projector models)."
  - "default baud rate, default control ID, and ID2 model code value not stated."
  - "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco mode values, sub-input values, base model types, selection signal types) not included in this source excerpt."
  - "firmware version compatibility not stated."
  - "flow control setting not specified (RTS/CTS hardware lines are wired per pin table but no flow-control mode is documented)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:01:17.341Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command list; transport parameters fully documented; 1:1 coverage with no extra commands. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld E121 U Control Spec

## Summary
The Sharp/NEC Ld E121 U is a projector controllable via RS-232C serial or wired/wireless LAN (TCP). This spec covers the binary control protocol documented in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/aspect/lens adjustment, lens memory, status queries, and system information requests.

<!-- UNRESOLVED: exact marketing model name/series not stated in this command reference (only generic "projector"); firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for LAN control (stated verbatim in source)
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not specified (RTS/CTS pins wired but no setting stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST commands present
```

## Actions
```yaml
# Frame format (commands sent TO projector): a sequence of hex bytes. The final
# byte is the checksum (low-order byte of the sum of all preceding bytes).
# Parameterized commands show <DATA##> placeholders; <CKS> = computed checksum.
# ID1 (control ID) and ID2 (model code) appear in RESPONSE frames only; command
# frames are documented by the source without ID bytes.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00 88 00 00 00 88"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02 03 00 00 02 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal value (hex). Example: 06h = video port. See Appendix 'Supplementary Information by Command'."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Aspect value (hex). See Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target (with DATA02=FFh): 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: string
      description: "FFh when DATA01=96h; otherwise adjustment target hi-byte"
    - name: DATA03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03 96 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03 9A 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (WORD type). See key code list (e.g. 05h=AUTO, 06h=MENU, 29h=COMPUTER1)."
    - name: DATA02
      type: string
      description: "Key code high byte (typically 00h)."

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02 18 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Target: 06h=Periphery Focus"
    - name: DATA02
      type: string
      description: "Content: 00h=Stop, 01h/02h/03h=plus 1s/0.5s/0.25s, 7Fh=plus, 81h=minus, FDh/FEh/FFh=minus 0.25s/0.5s/1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 {CKS}"
  params:
    - name: DATA01
      type: string
      description: Target lens axis (see source adjustment target list)

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02 1E 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02 1F 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02 20 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02 27 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01 98 00 00 01 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Eco mode value (hex). See Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03 B1 00 00 12 2C {DATA01}-{DATA16} 00 {CKS}"
  params:
    - name: projector_name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (depends on DATA01; e.g. MODE: 00h=PIP, 01h=PICTURE BY PICTURE)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Input terminal (hex). See Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: string
      description: "Audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing: success responses prefix the command's first byte +20h
# (e.g. 02h command -> 22h response) followed by <ID1> <ID2> <LEN> <data> <CKS>.
# Failure responses prefix the command's first byte +A0h (e.g. 02h -> A2h)
# followed by <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 DATA03 / 305-3 DATA01"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: "078-2 DATA04"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 / 305-3 DATA01"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA01 / 305-3 DATA06"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA02 / 305-3 DATA07"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA03 / 305-3 DATA08"

- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA04"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: "078-6 DATA01"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "305-3 DATA09"

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: eco mode enum values listed in Appendix not included in this source excerpt
  source: "097-8 / 098-8"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 / 098-243-1"

- id: error_status
  type: bitmap
  description: "12-byte error bitmap (009 ERROR STATUS REQUEST); bit=1 indicates error (cover/fan/temp/lamp/etc.)"
  source: "009 DATA01-DATA12"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037-4 (DATA01=00h, DATA02=01h)"

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: "037-4 (DATA01=00h, DATA02=04h)"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 DATA01-04"

- id: execution_result
  type: enum
  values: [success, error]
  description: "Generic 2-byte result (0000h=success) returned by adjust/set commands"
  source: "030-* / 053-* responses DATA01-DATA02"

- id: command_error
  type: enum
  description: "ERR1/ERR2 error code pair (see error code list, e.g. 00h/00h=unrecognized, 02h/0Dh=power off, 02h/0Fh=no authority)"
  source: "Section 2.4 error code list"
```

## Variables
```yaml
- id: brightness
  description: "Picture brightness (030-1 DATA01=00h)"
  bounds: []  # UNRESOLVED: bounds returned dynamically by 060-1 request, not stated as constants

- id: contrast
  description: "Picture contrast (030-1 DATA01=01h)"
  bounds: []  # UNRESOLVED

- id: color
  description: "Picture color (030-1 DATA01=02h)"
  bounds: []  # UNRESOLVED

- id: hue
  description: "Picture hue (030-1 DATA01=03h)"
  bounds: []  # UNRESOLVED

- id: sharpness
  description: "Picture sharpness (030-1 DATA01=04h)"
  bounds: []  # UNRESOLVED

- id: volume
  description: "Sound volume (030-2)"
  bounds: []  # UNRESOLVED

- id: lamp_light_adjust
  description: "Lamp/Light adjust (030-15 DATA01=96h)"
  bounds: []  # UNRESOLVED

- id: projector_name
  description: "LAN projector name, up to 16 bytes (098-45)"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; all responses are
# replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON: while turning on, no other command can be accepted (source 3.2)."
  - description: "POWER OFF: while turning off (including cooling time), no other command can be accepted (source 3.3)."
  - description: "LENS CONTROL (053): continuous-drive direction bytes (7Fh/81h) must be followed by 00h (Stop) to halt lens motion (source 3.22)."
# UNRESOLVED: no voltage/current/power specs, fault-recovery sequences, or
# power-on sequencing beyond the command-level interlocks above are stated in source.
```

## Notes
- **Frame format**: commands are hex byte sequences ending in a checksum byte (`<CKS>`). Checksum = low-order 8 bits of the sum of all preceding bytes. Example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- **ID1 / ID2**: Control ID and model code appear in *response* frames only (inserted after the response prefix byte). Command frames as documented omit them; the projector uses its configured control ID. Set the projector's control ID per the operation manual.
- **Response prefixes**: success response prefix = command byte 0 + 20h; error response prefix = command byte 0 + A0h (e.g. `02h` command → `22h` success / `A2h` error; `03h` → `23h`/`A3h`; `00h` → `20h`/`A0h`; `01h` → `21h`/`A1h`).
- **Usage-time granularity**: lamp/filter usage times are returned in seconds but updated at one-minute intervals (source 3.15, 3.17).
- **Cooling lockout**: during cool-down after POWER OFF the projector rejects all commands.
- **Multi-rate serial**: baud rate is selectable among 115200/38400/19200/9600/4800; the projector and controller must match. Default rate is not stated in this source.
- **Wireless LAN**: available via an optional wireless LAN unit; refer to that unit's operation manual for details.

<!-- UNRESOLVED: marketing model name / product family for "Ld E121 U" not confirmed in this command reference (doc is generic across projector models). -->
<!-- UNRESOLVED: default baud rate, default control ID, and ID2 model code value not stated. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco mode values, sub-input values, base model types, selection signal types) not included in this source excerpt. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow control setting not specified (RTS/CTS hardware lines are wired per pin table but no flow-control mode is documented). -->
````

Spec done. 53 actions, all hex payloads verbatim. Serial+TCP transport (port 7142), 8/N/1. Traits powerable/queryable/levelable inferred. Cool-down interlocks in Safety. Gaps marked `UNRESOLVED` (appendix codes, default baud, eco enum values, flow control, ID2 code).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:33:53.474Z
last_checked_at: 2026-06-17T20:01:17.341Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:01:17.341Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command list; transport parameters fully documented; 1:1 coverage with no extra commands. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact marketing model name/series not stated in this command reference (only generic \"projector\"); firmware version compatibility not stated."
- "flow control not specified (RTS/CTS pins wired but no setting stated)"
- "eco mode enum values listed in Appendix not included in this source excerpt"
- "bounds returned dynamically by 060-1 request, not stated as constants"
- "source documents no unsolicited notifications; all responses are"
- "source documents no multi-step command sequences."
- "no voltage/current/power specs, fault-recovery sequences, or"
- "marketing model name / product family for \"Ld E121 U\" not confirmed in this command reference (doc is generic across projector models)."
- "default baud rate, default control ID, and ID2 model code value not stated."
- "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco mode values, sub-input values, base model types, selection signal types) not included in this source excerpt."
- "firmware version compatibility not stated."
- "flow control setting not specified (RTS/CTS hardware lines are wired per pin table but no flow-control mode is documented)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
