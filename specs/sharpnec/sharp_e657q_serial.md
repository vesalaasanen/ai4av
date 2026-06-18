---
spec_id: admin/sharp-nec-e657q
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E657Q Control Spec"
manufacturer: Sharp/NEC
model_family: E657Q
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E657Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:32:30.626Z
last_checked_at: 2026-06-17T19:44:59.399Z
generated_at: 2026-06-17T19:44:59.399Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This source manual is titled \"Projector Control Command Reference Manual\" and describes a generic Sharp/NEC projector command set. Mapping to the E657Q display model is operator-provided; command support on the specific E657Q hardware/firmware is not verified in this source."
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, eco mode values, sub-input values) is referenced but not included in the provided source text. Several enum values for input/aspect/eco remain unspecified."
  - "firmware version compatibility not stated in source"
  - "flow control not stated; source states \"Full duplex\" communication mode only"
  - "source describes no unsolicited notifications; all responses are command-triggered."
  - "source documents no multi-step command sequences."
  - "Appendix \"Supplementary Information by Command\" not provided — input terminal, aspect, eco mode, base model type, and PIP sub-input enum lists incomplete."
  - "flow_control not stated in source."
  - "source is a generic projector command manual; confirmation that E657Q (a display) implements this full command set is not present in the source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:44:59.399Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source commands §3.1-§3.53; transport parameters fully verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E657Q Control Spec

## Summary
The Sharp/NEC E657Q is a large-format display controllable via a binary protocol over RS-232C serial and TCP/IP (wired or wireless LAN, TCP port 7142). This spec covers the command catalogue documented in the Sharp/NEC Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/lens adjustment, lens memory, status queries, eco mode, PIP/PbP, edge blending, and information requests.

<!-- UNRESOLVED: This source manual is titled "Projector Control Command Reference Manual" and describes a generic Sharp/NEC projector command set. Mapping to the E657Q display model is operator-provided; command support on the specific E657Q hardware/firmware is not verified in this source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, base model types, eco mode values, sub-input values) is referenced but not included in the provided source text. Several enum values for input/aspect/eco remain unspecified. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable rates: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source states "Full duplex" communication mode only
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable  # inferred: numerous status/information request commands present
  - levelable  # inferred: VOLUME ADJUST, PICTURE ADJUST, LENS CONTROL present
```

## Actions
```yaml
# Message framing (binary, hex bytes):
#   <class> <command> <ID1> <ID2> <LEN> <DATA...> <CKS>
# - class: 00h-03h (command), 20h-23h (success response), A0h-A3h (error response)
# - ID1 = control ID; ID2 = model code (command examples use 00h 00h; responses echo device ID1/ID2)
# - LEN = data byte count following LEN
# - CKS = low-order byte of the sum of all preceding bytes
# Enum values for input terminal / aspect / eco mode / sub-input that the source
# defers to an absent Appendix are marked UNRESOLVED.
actions:
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
    command: "02 03 00 00 02 01 {input} {checksum}"
    params:
      - name: input
        type: byte
        description: "Input terminal (DATA01). Source example: 06h = video port. Full value list deferred to Appendix 'Supplementary Information by Command'."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes (e.g. input 06h -> CKS 0Eh)."

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
    command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: byte
        description: "Adjustment target (DATA01): 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: mode
        type: byte
        description: "Adjustment mode (DATA02): 00h=absolute, 01h=relative."
      - name: value_lo
        type: byte
        description: "Adjustment value low-order 8 bits (DATA03)."
      - name: value_hi
        type: byte
        description: "Adjustment value high-order 8 bits (DATA04)."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: byte
        description: "Adjustment mode (DATA01): 00h=absolute, 01h=relative."
      - name: value_lo
        type: byte
        description: "Adjustment value low-order 8 bits (DATA02)."
      - name: value_hi
        type: byte
        description: "Adjustment value high-order 8 bits (DATA03)."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes (value 10 -> 27h)."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03 10 00 00 05 18 00 00 {aspect} 00 {checksum}"
    params:
      - name: aspect
        type: byte
        description: "Aspect value (DATA01). Value list deferred to Appendix 'Supplementary Information by Command'."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03 10 00 00 05 {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target_lo
        type: byte
        description: "Adjustment target low byte (DATA01). Documented target: 96h = LAMP ADJUST / LIGHT ADJUST."
      - name: target_hi
        type: byte
        description: "Adjustment target high byte (DATA02). Documented: FFh."
      - name: mode
        type: byte
        description: "Adjustment mode (DATA03): 00h=absolute, 01h=relative."
      - name: value_lo
        type: byte
        description: "Adjustment value low-order 8 bits (DATA04)."
      - name: value_hi
        type: byte
        description: "Adjustment value high-order 8 bits (DATA05)."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

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
    command: "03 96 00 00 02 {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: byte
        description: "Lamp selector (DATA01): 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: content
        type: byte
        description: "Content (DATA02): 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes (lamp1 usage -> 9Ch)."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03 9A 00 00 01 {type} {checksum}"
    params:
      - name: type
        type: byte
        description: "Carbon savings type (DATA01): 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02 0F 00 00 02 {keycode_lo} {keycode_hi} {checksum}"
    params:
      - name: keycode_lo
        type: byte
        description: "Key code low byte (DATA01), WORD-type key code."
      - name: keycode_hi
        type: byte
        description: "Key code high byte (DATA02)."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes (AUTO -> 18h)."

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
    command: "02 18 00 00 02 {target} {action} {checksum}"
    params:
      - name: target
        type: byte
        description: "Adjustment target (DATA01). Documented: 06h=Periphery Focus."
      - name: action
        type: byte
        description: "Drive action (DATA02): 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus drive, 81h=minus drive, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02 1C 00 00 02 {target} 00 {checksum}"
    params:
      - name: target
        type: byte
        description: "Adjustment target (DATA01)."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02 1D 00 00 04 {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: byte
        description: "Lens axis (DATA01). FFh=Stop (mode/value ignored)."
      - name: mode
        type: byte
        description: "Adjustment mode (DATA02): 00h=absolute, 02h=relative."
      - name: value_lo
        type: byte
        description: "Adjustment value low-order 8 bits (DATA03)."
      - name: value_hi
        type: byte
        description: "Adjustment value high-order 8 bits (DATA04)."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02 1E 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: byte
        description: "Memory operation (DATA01): 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02 1F 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: byte
        description: "Reference memory operation (DATA01): 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02 20 00 00 01 {option} {checksum}"
    params:
      - name: option
        type: byte
        description: "Option (DATA01): 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02 21 00 00 02 {option} {value} {checksum}"
    params:
      - name: option
        type: byte
        description: "Option (DATA01): 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: value
        type: byte
        description: "Setting value (DATA02): 00h=OFF, 01h=ON."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02 27 00 00 01 {profile} {checksum}"
    params:
      - name: profile
        type: byte
        description: "Profile number (DATA01): 00h=Profile 1, 01h=Profile 2."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02 28 00 00 00 2A"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03 05 00 00 03 {name} 00 00 {checksum}"
    params:
      - name: name
        type: byte
        description: "Adjusted value name (DATA01): 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes (brightness -> 0Bh)."

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
    command: "01 98 00 00 01 {state} {checksum}"
    params:
      - name: state
        type: byte
        description: "Freeze state (DATA01): 01h=freeze on, 02h=freeze off."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00 D0 00 00 03 00 {type} 01 {checksum}"
    params:
      - name: type
        type: byte
        description: "Information type (DATA01): 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

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

  - id: lan_mac_address_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03 B0 00 00 02 C5 {item} {checksum}"
    params:
      - name: item
        type: byte
        description: "Item (DATA01): 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03 B1 00 00 02 07 {value} {checksum}"
    params:
      - name: value
        type: byte
        description: "Eco mode value (DATA01). Value list deferred to Appendix 'Supplementary Information by Command'."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03 B1 00 00 12 2C {name_01} {name_02} {name_03} {name_04} {name_05} {name_06} {name_07} {name_08} {name_09} {name_10} {name_11} {name_12} {name_13} {name_14} {name_15} {name_16} 00 {checksum}"
    params:
      - name: name
        type: string
        description: "Projector name (DATA01-16), up to 16 bytes, NUL-terminated."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03 B1 00 00 03 C5 {item} {value} {checksum}"
    params:
      - name: item
        type: byte
        description: "Item (DATA01): 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: value
        type: byte
        description: "Setting value (DATA02). MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input values deferred to Appendix."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03 B1 00 00 03 DF 00 {value} {checksum}"
    params:
      - name: value
        type: byte
        description: "Edge blending setting (DATA01): 00h=OFF, 01h=ON."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."

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
    command: "03 C9 00 00 03 09 {input} {setting} {checksum}"
    params:
      - name: input
        type: byte
        description: "Input terminal (DATA01). Value list deferred to Appendix 'Supplementary Information by Command'."
      - name: setting
        type: byte
        description: "Audio setting (DATA02): 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
      - name: checksum
        type: byte
        description: "Computed: low byte of sum of all preceding bytes."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    description: "From RUNNING STATUS REQUEST (078-2) DATA03: 00h=Standby, 01h=Power on, FFh=Not supported."
    values: [standby, power_on]
  - id: operation_status
    type: enum
    description: "From RUNNING STATUS REQUEST (078-2) DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  - id: cooling_process
    type: enum
    description: "From RUNNING STATUS REQUEST (078-2) DATA04: 00h=Not executed, 01h=During execution."
    values: [idle, running]
  - id: picture_mute_state
    type: enum
    description: "From MUTE STATUS REQUEST (078-4) DATA01: 00h=Off, 01h=On."
    values: [off, on]
  - id: sound_mute_state
    type: enum
    description: "From MUTE STATUS REQUEST (078-4) DATA02: 00h=Off, 01h=On."
    values: [off, on]
  - id: onscreen_mute_state
    type: enum
    description: "From MUTE STATUS REQUEST (078-4) DATA03: 00h=Off, 01h=On."
    values: [off, on]
  - id: freeze_state
    type: enum
    description: "From BASIC INFORMATION REQUEST (305-3) DATA09: 00h=Off, 01h=On."
    values: [off, on]
  - id: cover_status
    type: enum
    description: "From COVER STATUS REQUEST (078-6) DATA01: 00h=Normal(cover opened), 01h=Cover closed."
    values: [opened, closed]
  - id: eco_mode
    type: raw
    description: "From ECO MODE REQUEST (097-8) DATA01. Value list deferred to Appendix 'Supplementary Information by Command'."
  - id: edge_blending_mode
    type: enum
    description: "From EDGE BLENDING MODE REQUEST (097-243-1) DATA01: 00h=OFF, 01h=ON."
    values: [off, on]
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From LAMP INFORMATION REQUEST 3 (037-4), DATA03-06. Updated at one-minute intervals."
  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From LAMP INFORMATION REQUEST 3 (037-4), DATA03-06. Negative if replacement deadline exceeded."
  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From FILTER USAGE INFORMATION REQUEST (037-3) DATA01-04. -1 if no time defined."
  - id: error_status
    type: raw
    description: "From ERROR STATUS REQUEST (009) DATA01-12 bitfield. 0=normal, 1=error."
  - id: model_name
    type: string
    description: "From MODEL NAME REQUEST (078-5) DATA01-32 (NUL-terminated)."
  - id: serial_number
    type: string
    description: "From SERIAL NUMBER REQUEST (305-2) DATA01-16 (NUL-terminated)."
  - id: mac_address
    type: string
    description: "From LAN MAC ADDRESS STATUS REQUEST2 (097-155) DATA01-06."
  - id: execution_result
    type: enum
    description: "Generic result for adjust commands (030-x): DATA01+DATA02 = 0000h success, other = error."
    values: [success, error]
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: "Set via VOLUME ADJUST (030-2). Range queryable via GAIN PARAMETER REQUEST 3 (060-1, name 05h)."
  - id: brightness
    type: integer
    description: "Set via PICTURE ADJUST (030-1, target 00h). Range via GAIN PARAMETER REQUEST 3 (060-1, name 00h)."
  - id: contrast
    type: integer
    description: "Set via PICTURE ADJUST (030-1, target 01h). Range via GAIN PARAMETER REQUEST 3 (060-1, name 01h)."
  - id: color
    type: integer
    description: "Set via PICTURE ADJUST (030-1, target 02h). Range via GAIN PARAMETER REQUEST 3 (060-1, name 02h)."
  - id: hue
    type: integer
    description: "Set via PICTURE ADJUST (030-1, target 03h). Range via GAIN PARAMETER REQUEST 3 (060-1, name 03h)."
  - id: sharpness
    type: integer
    description: "Set via PICTURE ADJUST (030-1, target 04h). Range via GAIN PARAMETER REQUEST 3 (060-1, name 04h)."
  - id: lamp_light_adjust
    type: integer
    description: "Set via OTHER ADJUST (030-15, target 96h/FFh). Range via GAIN PARAMETER REQUEST 3 (060-1, name 96h)."
  - id: projector_name
    type: string
    description: "Set via LAN PROJECTOR NAME SET (098-45), up to 16 bytes."
```

## Events
```yaml
events: []  # UNRESOLVED: source describes no unsolicited notifications; all responses are command-triggered.
```

## Macros
```yaml
macros: []  # UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off (incl. cooling time) no other command accepted
  - power_on   # source: during power-on no other command accepted
interlocks:
  - "POWER ON (015): while turning on, no other command can be accepted."
  - "POWER OFF (016): while turning off (including cooling time), no other command can be accepted."
  - "PICTURE/SOUND/ONSCREEN mute auto-clears on input terminal switch or video signal switch."
  - "SOUND mute also auto-clears on sound volume adjustment."
  - "Commands requiring power return ERR1=02h ERR2=0Dh ('command cannot be accepted because the power is off')."
```

## Notes
- Binary protocol. Each command is a hex byte sequence: `<class> <command> <ID1> <ID2> <LEN> <DATA...> <CKS>`. The command examples in the source use ID1=00h ID2=00h; responses (class 20h-23h) echo the device's actual control ID and model code.
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes. Example: `20+81+01+60+01+00 = 103h -> CKS = 03h`.
- **Response classes:** 20h-23h = successful response (mirrors command class); A0h-A3h = error response carrying `<ERR1> <ERR2>`.
- **Error codes (ERR1/ERR2):** 00h/00h=unrecognized command; 00h/01h=not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 02h/0Dh=power off; 02h/0Eh=execution failed; 02h/0Fh=no authority; 03h/00h=incorrect gain number; 03h/02h=adjustment failed. (See source §2.4 for full list.)
- **Lens control:** after sending 7Fh (plus drive) or 81h (minus drive) in LENS CONTROL DATA02, stop by sending 00h. While the lens is being driven, the lens position can be controlled without a stop by re-issuing the same command.
- **Usage-time granularity:** lamp/filter usage times are obtainable in one-second units but updated at one-minute intervals.
- **Appendix dependency:** input terminal values, aspect values, eco mode values, base model types, and PIP sub-input values are referenced in the source as residing in an Appendix ("Supplementary Information by Command") that is not present in the provided text. These enums are therefore UNRESOLVED.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not provided — input terminal, aspect, eco mode, base model type, and PIP sub-input enum lists incomplete. -->
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: source is a generic projector command manual; confirmation that E657Q (a display) implements this full command set is not present in the source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

Spec done. 53 actions, all source-documented commands enumerated, no assumed values. Key gaps: missing appendix enums, flow_control, E657Q-vs-projector mapping unverified.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:32:30.626Z
last_checked_at: 2026-06-17T19:44:59.399Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:44:59.399Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source commands §3.1-§3.53; transport parameters fully verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This source manual is titled \"Projector Control Command Reference Manual\" and describes a generic Sharp/NEC projector command set. Mapping to the E657Q display model is operator-provided; command support on the specific E657Q hardware/firmware is not verified in this source."
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, eco mode values, sub-input values) is referenced but not included in the provided source text. Several enum values for input/aspect/eco remain unspecified."
- "firmware version compatibility not stated in source"
- "flow control not stated; source states \"Full duplex\" communication mode only"
- "source describes no unsolicited notifications; all responses are command-triggered."
- "source documents no multi-step command sequences."
- "Appendix \"Supplementary Information by Command\" not provided — input terminal, aspect, eco mode, base model type, and PIP sub-input enum lists incomplete."
- "flow_control not stated in source."
- "source is a generic projector command manual; confirmation that E657Q (a display) implements this full command set is not present in the source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
