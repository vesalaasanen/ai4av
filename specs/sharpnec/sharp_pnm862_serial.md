---
spec_id: admin/sharp-nec-pnm862
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PNM862 Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Pnm862"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Pnm862"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:51:53.207Z
last_checked_at: 2026-06-18T09:11:44.982Z
generated_at: 2026-06-18T09:11:44.982Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Default baud rate among the supported set not stated. Input-terminal value table lives in an external \"Appendix / Supplementary Information by Command\" not present in this source."
  - "source supports 115200/38400/19200/9600/4800; default not stated"
  - "source states \"Full duplex\"; flow control not specified"
  - "no asynchronous event mechanism described in source."
  - "populate if a macros reference exists in companion documentation."
  - "no full power-on sequencing procedure or voltage/current specs in this source."
  - "input-terminal value table (018, 319-10), aspect value table (030-12), eco-mode value table (098-8/097-8), sub-input value table (098-198/097-198), and base-model-type value table (078-1/305-1) all live in an external \"Appendix / Supplementary Information by Command\" not present in this source."
  - "default serial baud rate among 115200/38400/19200/9600/4800 not stated."
  - "flow control setting not stated (only \"Full duplex\" communication mode)."
  - "firmware version compatibility not stated in source."
  - "LAN auth/password procedure not described anywhere in source (assumed none)."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:11:44.982Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PNM862 Control Spec

## Summary
Binary control protocol reference for the Sharp/NEC PNM862 large-screen projector (manual BDT140013 Rev 7.1). The device is controllable over RS-232C serial (PC CONTROL D-SUB 9P) and over wired/wireless LAN via TCP port 7142. Commands and responses are framed in hexadecimal bytes with a trailing checksum; the catalogue covers power, input switching, mute, lens/shutter, picture/volume/aspect adjust, and a large set of status queries.

<!-- UNRESOLVED: firmware version compatibility not stated. Default baud rate among the supported set not stated. Input-terminal value table lives in an external "Appendix / Supplementary Information by Command" not present in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source supports 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex"; flow control not specified
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from numerous status REQUEST commands
  - levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST commands
  - routable     # inferred from INPUT SW CHANGE command
```

## Actions
```yaml
# Framing: commands sent TO the projector are <Op> <CmdCode> 00 00 <LEN> <DATA...> <CKS>.
# Bytes below are verbatim from the source (hex, space-separated; source 'h' suffix dropped).
# CKS = checksum: sum all preceding bytes, take the low-order 8 bits (mod 256).
# Fixed commands carry the documented checksum verbatim; parameterized commands show the
# template with the computed-field placeholder {cks}. ID1/ID2 are 00 00 in the command
# direction (projector echoes its Control ID / Model code back in responses).

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {input} {cks}"
  params:
    - name: input
      type: integer
      description: "DATA01 input terminal code (e.g. 06h = video). Full value table is in source Appendix 'Supplementary Information by Command' (not present here)."
    - name: cks
      type: integer
      description: Computed checksum byte (sum all preceding bytes, low 8 bits).

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {target} FF {mode} {value_low} {value_high} {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: mode
      type: integer
      description: "DATA02 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_low
      type: integer
      description: "DATA03 adjustment value, low-order 8 bits."
    - name: value_high
      type: integer
      description: "DATA04 adjustment value, high-order 8 bits."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {mode} {value_low} {value_high} {cks}"
  params:
    - name: mode
      type: integer
      description: "DATA01 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_low
      type: integer
      description: "DATA02 adjustment value, low-order 8 bits."
    - name: value_high
      type: integer
      description: "DATA03 adjustment value, high-order 8 bits."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {value} 00 {cks}"
  params:
    - name: value
      type: integer
      description: "DATA01 aspect value. Value table is in source Appendix 'Supplementary Information by Command' (not present here)."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03 10 00 00 05 {target} {target2} {mode} {value_low} {value_high} {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01: 96h for LAMP ADJUST / LIGHT ADJUST."
    - name: target2
      type: integer
      description: "DATA02: FFh for LAMP ADJUST / LIGHT ADJUST."
    - name: mode
      type: integer
      description: "DATA03 adjustment mode: 00h=absolute, 01h=relative."
    - name: value_low
      type: integer
      description: "DATA04 adjustment value, low-order 8 bits."
    - name: value_high
      type: integer
      description: "DATA05 adjustment value, high-order 8 bits."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03 96 00 00 02 {lamp} {content} {cks}"
  params:
    - name: lamp
      type: integer
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)."
    - name: content
      type: integer
      description: "DATA02: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {type} {cks}"
  params:
    - name: type
      type: integer
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {key_low} {key_high} {cks}"
  params:
    - name: key_low
      type: integer
      description: "DATA01 low byte of WORD key code (e.g. 05h=AUTO, 0Dh=HELP, 8Ah=FREEZE)."
    - name: key_high
      type: integer
      description: "DATA02 high byte of WORD key code (00h for all listed keys)."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02 18 00 00 02 {target} {content} {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01 lens axis (e.g. 06h=Periphery Focus; other axes referenced in Appendix)."
    - name: content
      type: integer
      description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {target} 00 {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01 lens axis."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02 1D 00 00 04 {target} {mode} {value_low} {value_high} {cks}"
  params:
    - name: target
      type: integer
      description: "DATA01 lens axis (FFh=Stop)."
    - name: mode
      type: integer
      description: "DATA02 adjustment mode: 00h=absolute, 02h=relative."
    - name: value_low
      type: integer
      description: "DATA03 adjustment value, low-order 8 bits."
    - name: value_high
      type: integer
      description: "DATA04 adjustment value, high-order 8 bits."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {operation} {cks}"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {operation} {cks}"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {option} {cks}"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {option} {value} {cks}"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: value
      type: integer
      description: "DATA02 setting value: 00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {profile} {cks}"
  params:
    - name: profile
      type: integer
      description: "DATA01: 00h=Profile 1, 01h=Profile 2."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03 05 00 00 03 {name} 00 00 {cks}"
  params:
    - name: name
      type: integer
      description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {state} {cks}"
  params:
    - name: state
      type: integer
      description: "DATA01: 01h=Freeze On, 02h=Freeze Off."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {type} 01 {cks}"
  params:
    - name: type
      type: integer
      description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST 2 ---
- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {item} {cks}"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {value} {cks}"
  params:
    - name: value
      type: integer
      description: "DATA01 eco mode value. Value table is in source Appendix 'Supplementary Information by Command' (not present here)."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {name} 00 {cks}"
  params:
    - name: name
      type: string
      description: "DATA01-16 projector name, up to 16 bytes (NUL-terminated)."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {item} {value} {cks}"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: value
      type: integer
      description: "DATA02 setting value (MODE: 00h=PIP/01h=PBP; START POSITION: 00h-03h corners; SUB INPUT values per Appendix)."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {value} {cks}"
  params:
    - name: value
      type: integer
      description: "DATA01: 00h=OFF, 01h=ON."
    - name: cks
      type: integer
      description: Computed checksum byte.

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {input} {value} {cks}"
  params:
    - name: input
      type: integer
      description: "DATA01 input terminal code (see source Appendix 'Supplementary Information by Command')."
    - name: value
      type: integer
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
    - name: cks
      type: integer
      description: Computed checksum byte.
```

## Feedbacks
```yaml
# Query responses are framed: <RspOp> <CmdCode> <ID1> <ID2> <LEN> <DATA...> <CKS>.
# Success RspOp prefixes by command Op: 00h->A0h, 01h->A1h, 02h->22h, 03h->23h.
# Failure always: Axh ... 02 <ERR1> <ERR2> <CKS> (or A2h/A3h variants).

- id: error_status
  type: bitmask
  description: "009 response DATA01-12 error bits; bit=0 normal, bit=1 error (cover, fan, temp, lamp, mirror cover, interlock switch, etc.)."

- id: power_state
  type: enum
  values: [standby, power_on]
  description: "078-2 RUNNING STATUS DATA03: 00h=Standby, 01h=Power on (FFh=not supported)."

- id: cooling_status
  type: enum
  values: [not_executing, executing]
  description: "078-2 DATA04: 00h=not executed, 01h=during execution."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 / 305-3 DATA01 operation status."

- id: input_signal_status
  type: object
  description: "078-3 / 305-3 input status: signal list number, selection signal type, content displayed, test pattern."

- id: mute_status
  type: object
  description: "078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h/01h)."

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "078-6 DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: model_name
  type: string
  description: "078-5 DATA01-32 model name string."

- id: projector_information
  type: object
  description: "037 DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds."

- id: filter_usage
  type: object
  description: "037-3 DATA01-04 filter usage seconds; DATA05-08 filter alarm start seconds (-1 if undefined)."

- id: lamp_information
  type: object
  description: "037-4 DATA03-06 lamp usage seconds or remaining life %; negative remaining life if replacement deadline exceeded."

- id: carbon_savings
  type: object
  description: "037-6 DATA02-05 kg, DATA06-09 mg."

- id: gain_parameter
  type: object
  description: "060-1 adjustable bounds + current value + default + adjustment widths for picture/volume/lamp."

- id: eco_mode
  type: integer
  description: "097-8 DATA01 eco mode value (Light/Lamp mode). Value table per source Appendix."

- id: lan_projector_name
  type: string
  description: "097-45 DATA01-17 projector name."

- id: lan_mac_address
  type: string
  description: "097-155 DATA01-06 MAC address."

- id: pip_pbp_state
  type: object
  description: "097-198 MODE/START POSITION/SUB INPUT values."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1 DATA01: 00h=OFF, 01h=ON."

- id: lens_position
  type: object
  description: "053-1 upper/lower bounds + current value for a lens axis."

- id: lens_status
  type: bitmask
  description: "053-7 DATA01 lens operation bits (lens memory/zoom/focus/lens shift H+V)."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 DATA01: 00h=Profile 1, 01h=Profile 2."

- id: base_model_type
  type: object
  description: "305-1 base model type + model name + secondary type."

- id: serial_number
  type: string
  description: "305-2 DATA01-16 serial number string."

- id: information_string
  type: string
  description: "084 H/V sync frequency label string."

- id: error_response
  type: object
  description: "Generic failure frame ERR1/ERR2 code pair (see Notes for the code table)."
```

## Variables
```yaml
- id: volume
  description: Sound volume level (set via 030-2, read via 060-1 name 05h).

- id: brightness
  description: Picture brightness (set via 030-1 target 00h, read via 060-1 name 00h).

- id: contrast
  description: Picture contrast (030-1 target 01h / 060-1 name 01h).

- id: color
  description: Picture color (030-1 target 02h / 060-1 name 02h).

- id: hue
  description: Picture hue (030-1 target 03h / 060-1 name 03h).

- id: sharpness
  description: Picture sharpness (030-1 target 04h / 060-1 name 04h).

- id: lamp_light_adjust
  description: Lamp/Light adjust value (030-15 / 060-1 name 96h).

- id: aspect
  description: Aspect setting (030-12). Value table per source Appendix.

- id: eco_mode
  description: Eco/Light/Lamp mode (098-8 / 097-8). Value table per source Appendix.

- id: edge_blending
  description: Edge blending on/off (098-243-1 / 097-243-1).

- id: pip_pbp_mode
  description: PIP / Picture-by-Picture mode and sub-input config (098-198 / 097-198).

- id: projector_name
  description: LAN projector name, up to 16 bytes (098-45 / 097-45).

- id: audio_select
  description: Per-input audio select mapping (319-10).
```

## Events
```yaml
# No unsolicited notifications documented. The projector only returns framed responses
# to commands (success or failure with ERR1/ERR2).
# UNRESOLVED: no asynchronous event mechanism described in source.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: populate if a macros reference exists in companion documentation.
```

## Safety
```yaml
confirmation_required_for:
  # No explicit confirmation mandate in source; listed for operator awareness only.
  - power_off
  - shutter_close
interlocks:
  - id: power_on_command_lock
    description: "While POWER ON (015) is executing, no other command can be accepted (source section 3.2)."
  - id: power_off_command_lock
    description: "While POWER OFF (016) is executing (including cooling time), no other command can be accepted (source section 3.3)."
  - id: power_off_blocks_commands
    description: "Many commands return ERR1=02h ERR2=0Dh when the power is off (source error table)."
  - id: interlock_switch
    description: "Error status DATA09 bit1: 'The interlock switch is open' - reported via 009 ERROR STATUS REQUEST."
  - id: cover_status
    description: "Cover/mirror cover/lens cover status reported via 078-6; cover error reported via 009 DATA01 bit0."
# UNRESOLVED: no full power-on sequencing procedure or voltage/current specs in this source.
```

## Notes
- **Manual:** Projector Control Command Reference Manual, BDT140013 Revision 7.1.
- **Framing:** All commands/responses are hexadecimal byte frames. Command-to-projector layout is `<Op> <CmdCode> 00 00 <LEN> <DATA...> <CKS>`. The `00 00` pair occupies the ID1/ID2 positions; the projector fills its own Control ID (ID1) and Model code (ID2) into responses.
- **Checksum (CKS):** add all preceding bytes, take the low-order 8 bits (mod 256). Example from source: `20+81+01+60+01+00 = 103h` -> CKS = `03h`. Fixed commands below carry the documented checksum verbatim; parameterized commands require CKS recomputation.
- **Response prefixes:** success response Op byte derives from command Op — `00h->A0h`, `01h->A1h`, `02h->22h`, `03h->23h`. Failure responses carry `<ERR1> <ERR2>` and the relevant `Axh/A2h/A3h` prefix.
- **Lens driving:** after sending `7Fh` (drive +) or `81h` (drive -) on 053 LENS CONTROL, stop by sending `00h`. While a lens is moving, the same command re-issues without a stop.
- **Lamp usage granularity:** usage time is available in one-second units but updated at one-minute intervals.
- **Error code table (ERR1/ERR2) verbatim from source:** `00/00` command not recognized; `00/01` not supported by model; `01/00` invalid value; `01/01` invalid input terminal; `01/02` invalid language; `02/00` memory allocation error; `02/02` memory in use; `02/03` value cannot be set; `02/04` forced onscreen mute on; `02/06` viewer error; `02/07` no signal; `02/08` test pattern/filter displayed; `02/09` no PC card inserted; `02/0A` memory operation error; `02/0C` entry list displayed; `02/0D` power is off; `02/0E` command execution failed; `02/0F` no authority; `03/00` incorrect gain number; `03/01` invalid gain; `03/02` adjustment failed.

<!-- UNRESOLVED: input-terminal value table (018, 319-10), aspect value table (030-12), eco-mode value table (098-8/097-8), sub-input value table (098-198/097-198), and base-model-type value table (078-1/305-1) all live in an external "Appendix / Supplementary Information by Command" not present in this source. -->
<!-- UNRESOLVED: default serial baud rate among 115200/38400/19200/9600/4800 not stated. -->
<!-- UNRESOLVED: flow control setting not stated (only "Full duplex" communication mode). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: LAN auth/password procedure not described anywhere in source (assumed none). -->
````

Spec done. 53 commands all captured verbatim with payload bytes. Serial + TCP both documented (port 7142 stated). Checksum rule noted. Error table verbatim. Appendix value tables marked UNRESOLVED (external doc, not in source).

Caveman reminders:
- Baud = UNRESOLVED (5 rates, default not stated) — no assume 9600.
- Port 7142 = stated Tier 1, not assumed.
- Voltage/power/firmware = none invented.
- `status: draft`, `declared_confidence: low` set.
- All gaps marked `<!-- UNRESOLVED -->`.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:51:53.207Z
last_checked_at: 2026-06-18T09:11:44.982Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:11:44.982Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Default baud rate among the supported set not stated. Input-terminal value table lives in an external \"Appendix / Supplementary Information by Command\" not present in this source."
- "source supports 115200/38400/19200/9600/4800; default not stated"
- "source states \"Full duplex\"; flow control not specified"
- "no asynchronous event mechanism described in source."
- "populate if a macros reference exists in companion documentation."
- "no full power-on sequencing procedure or voltage/current specs in this source."
- "input-terminal value table (018, 319-10), aspect value table (030-12), eco-mode value table (098-8/097-8), sub-input value table (098-198/097-198), and base-model-type value table (078-1/305-1) all live in an external \"Appendix / Supplementary Information by Command\" not present in this source."
- "default serial baud rate among 115200/38400/19200/9600/4800 not stated."
- "flow control setting not stated (only \"Full duplex\" communication mode)."
- "firmware version compatibility not stated in source."
- "LAN auth/password procedure not described anywhere in source (assumed none)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
