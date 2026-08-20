---
spec_id: admin/nec-vp5-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC VP5 Series Control Spec"
manufacturer: NEC
model_family: "NEC VP5 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC VP5 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
  - manualowl.com
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://www.manualowl.com/m/NEC/PX-42VP5HA/Manual/195689
retrieved_at: 2026-08-08T06:05:34.103Z
last_checked_at: 2026-08-19T09:35:45.658Z
generated_at: 2026-08-19T09:35:45.658Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility ranges not stated; input-terminal and signal-type sub-enumerations are deferred to the vendor \"Supplementary Information by Command\" appendix which is not in this excerpt."
  - "source lists 115200/38400/19200/9600/4800 as supported but does not state a default; choose at deploy time"
  - "source does not document any unsolicited notifications from the"
  - "source does not define any explicit multi-step macro sequences."
  - "source contains no formal warning text or operator-safety interlocks"
  - "firmware compatibility ranges not stated; per-axis lens control codes not in this excerpt; default serial baud rate not stated."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:35:45.658Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions map one-to-one onto the source's 53-entry command list with matching literal hex frames and transport values. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-08
---

# NEC VP5 Series Control Spec

## Summary
Control spec for NEC VP5 Series projectors via RS-232C (PC CONTROL D-SUB 9P) and wired/wireless LAN using a binary framed protocol with checksum. The source document (BDT140013 Revision 7.1) catalogs power, input, picture/sound/onscreen mute, picture/volume/aspect/gain adjust, shutter, lens control and memory, freeze, eco mode, PIP/PBP, edge blending, audio select, and numerous status/information requests.

<!-- UNRESOLVED: firmware compatibility ranges not stated; input-terminal and signal-type sub-enumerations are deferred to the vendor "Supplementary Information by Command" appendix which is not in this excerpt. -->

## Transport
```yaml
# Source documents both RS-232C and LAN. Baud rate list quoted verbatim; default
# not stated, so baud_rate is left null and resolution is left to integrator.
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 as supported but does not state a default; choose at deploy time
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: rts_cts  # inferred from D-SUB 9P pinout (RTS/CTS wired on pins 7/8)
addressing:
  port: 7142
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
# Populated only from explicit source evidence.
- powerable       # inferred from POWER ON / POWER OFF commands (015, 016) and 078-2 RUNNING STATUS
- routable        # inferred from INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
- queryable       # inferred from extensive status/information requests (009, 037, 060-1, 078-*, 097-*, 305-*)
- levelable       # inferred from PICTURE ADJUST (030-1), VOLUME ADJUST (030-2), ASPECT ADJUST (030-12), OTHER ADJUST (030-15)
```

## Actions
```yaml
# Frame layout (from source §2.1):
#   command:  SOH TYPE <ID1> <ID2> LEN <DATA...> <CKS>
#   reply:    STX TYPE <ID1> <ID2> LEN <DATA...> <CKS>
#   error:    ACK TYPE <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Checksum (CKS) = low-order byte of sum of all preceding bytes (§2.2).
# <ID1> = control ID; <ID2> = model code. LEN is data-part byte count.
# Each entry below uses the literal byte sequence from the source, with
# variable bytes shown as {token} and the trailing CKS elided (computed).

# ---- 009. ERROR STATUS REQUEST ----
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00 88 00 00 00 88"
  params: []

# ---- 015. POWER ON ----
- id: power_on
  label: Power On
  kind: action
  command: "02 00 00 00 00 02"
  params: []

# ---- 016. POWER OFF ----
- id: power_off
  label: Power Off
  kind: action
  command: "02 01 00 00 00 03"
  params: []

# ---- 018. INPUT SW CHANGE ----
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02 03 00 00 02 01 {input} {cks}"
  params:
    - name: input
      type: integer
      description: Input terminal code (e.g. 06h = video). Full mapping in vendor "Supplementary Information" appendix (not in this excerpt).

# ---- 020. PICTURE MUTE ON ----
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02 10 00 00 00 12"
  params: []

# ---- 021. PICTURE MUTE OFF ----
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02 11 00 00 00 13"
  params: []

# ---- 022. SOUND MUTE ON ----
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02 12 00 00 00 14"
  params: []

# ---- 023. SOUND MUTE OFF ----
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02 13 00 00 00 15"
  params: []

# ---- 024. ONSCREEN MUTE ON ----
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02 14 00 00 00 16"
  params: []

# ---- 025. ONSCREEN MUTE OFF ----
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02 15 00 00 00 17"
  params: []

# ---- 030-1. PICTURE ADJUST ----
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: integer
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: mode
      type: integer
      description: "00h absolute, 01h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits (signed)
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits (signed)

# ---- 030-2. VOLUME ADJUST ----
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: integer
      description: "00h absolute, 01h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits (signed)
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits (signed)

# ---- 030-12. ASPECT ADJUST ----
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03 10 00 00 05 18 00 00 {aspect} 00 {cks}"
  params:
    - name: aspect
      type: integer
      description: Aspect code per vendor "Supplementary Information" appendix (not in this excerpt).

# ---- 030-15. OTHER ADJUST ----
- id: other_adjust
  label: Other (Lamp/Light) Adjust
  kind: action
  command: "03 10 00 00 05 {target_lo} {target_hi} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target_lo
      type: integer
      description: "96h (LAMP ADJUST / LIGHT ADJUST)"
    - name: target_hi
      type: integer
      description: "FFh"
    - name: mode
      type: integer
      description: "00h absolute, 01h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits (signed)
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits (signed)

# ---- 037. INFORMATION REQUEST ----
- id: information_request
  label: Information Request
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

# ---- 037-3. FILTER USAGE INFORMATION REQUEST ----
- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  command: "03 95 00 00 00 98"
  params: []

# ---- 037-4. LAMP INFORMATION REQUEST 3 ----
- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  command: "03 96 00 00 02 {lamp} {content} {cks}"
  params:
    - name: lamp
      type: integer
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h usage time (s), 04h remaining life (%)"

# ---- 037-6. CARBON SAVINGS INFORMATION REQUEST ----
- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  command: "03 9A 00 00 01 {scope} {cks}"
  params:
    - name: scope
      type: integer
      description: "00h Total, 01h During operation"

# ---- 050. REMOTE KEY CODE ----
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02 0F 00 00 02 {key_lo} {key_hi} {cks}"
  params:
    - name: key_lo
      type: integer
      description: "Key code low byte (e.g. 05h=AUTO, 07h=UP, 84h=VOL UP, EEh=LAMP MODE/ECO)."
    - name: key_hi
      type: integer
      description: "Key code high byte (00h for all keys in table)."

# ---- 051. SHUTTER CLOSE ----
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02 16 00 00 00 18"
  params: []

# ---- 052. SHUTTER OPEN ----
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02 17 00 00 00 19"
  params: []

# ---- 053. LENS CONTROL ----
- id: lens_control
  label: Lens Control (drive)
  kind: action
  command: "02 18 00 00 02 {axis} {motion} {cks}"
  params:
    - name: axis
      type: integer
      description: "06h Periphery Focus (only axis documented in this excerpt)."
    - name: motion
      type: integer
      description: "00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s. Send 00h after 7Fh/81h to stop."

# ---- 053-1. LENS CONTROL REQUEST ----
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02 1C 00 00 02 {axis} 00 {cks}"
  params:
    - name: axis
      type: integer
      description: Lens axis code per vendor "Supplementary Information" appendix (not in this excerpt).

# ---- 053-2. LENS CONTROL 2 ----
- id: lens_control_2
  label: Lens Control 2 (absolute/relative)
  kind: action
  command: "02 1D 00 00 04 {stop_or_axis} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: stop_or_axis
      type: integer
      description: "FFh = Stop (mode/value ignored). Otherwise lens axis code."
    - name: mode
      type: integer
      description: "00h absolute, 02h relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

# ---- 053-3. LENS MEMORY CONTROL ----
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02 1E 00 00 01 {op} {cks}"
  params:
    - name: op
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

# ---- 053-4. REFERENCE LENS MEMORY CONTROL ----
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02 1F 00 00 01 {op} {cks}"
  params:
    - name: op
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET (operates on profile selected via 053-10)."

# ---- 053-5. LENS MEMORY OPTION REQUEST ----
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02 20 00 00 01 {option} {cks}"
  params:
    - name: option
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

# ---- 053-6. LENS MEMORY OPTION SET ----
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02 21 00 00 02 {option} {value} {cks}"
  params:
    - name: option
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: value
      type: integer
      description: "00h OFF, 01h ON"

# ---- 053-7. LENS INFORMATION REQUEST ----
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

# ---- 053-10. LENS PROFILE SET ----
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02 27 00 00 01 {profile} {cks}"
  params:
    - name: profile
      type: integer
      description: "00h Profile 1, 01h Profile 2"

# ---- 053-11. LENS PROFILE REQUEST ----
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

# ---- 060-1. GAIN PARAMETER REQUEST 3 ----
- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  command: "03 05 00 00 03 {name} 00 00 {cks}"
  params:
    - name: name
      type: integer
      description: "00h Picture/Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust."

# ---- 078-1. SETTING REQUEST ----
- id: setting_request
  label: Setting Request
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

# ---- 078-2. RUNNING STATUS REQUEST ----
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

# ---- 078-3. INPUT STATUS REQUEST ----
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

# ---- 078-4. MUTE STATUS REQUEST ----
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

# ---- 078-5. MODEL NAME REQUEST ----
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

# ---- 078-6. COVER STATUS REQUEST ----
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

# ---- 079. FREEZE CONTROL ----
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01 98 00 00 01 {state} {cks}"
  params:
    - name: state
      type: integer
      description: "01h freeze on, 02h freeze off"

# ---- 084. INFORMATION STRING REQUEST ----
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00 D0 00 00 03 00 {info_type} 01 {cks}"
  params:
    - name: info_type
      type: integer
      description: "03h Horizontal sync frequency, 04h Vertical sync frequency"

# ---- 097-8. ECO MODE REQUEST ----
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

# ---- 097-45. LAN PROJECTOR NAME REQUEST ----
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

# ---- 097-155. LAN MAC ADDRESS STATUS REQUEST 2 ----
- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

# ---- 097-198. PIP/PICTURE BY PICTURE REQUEST ----
- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03 B0 00 00 02 C5 {field} {cks}"
  params:
    - name: field
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

# ---- 097-243-1. EDGE BLENDING MODE REQUEST ----
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

# ---- 098-8. ECO MODE SET ----
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03 B1 00 00 02 07 {value} {cks}"
  params:
    - name: value
      type: integer
      description: Eco mode value per vendor "Supplementary Information" appendix (not in this excerpt).

# ---- 098-45. LAN PROJECTOR NAME SET ----
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03 B1 00 00 12 2C {name[1..16]} 00 {cks}"
  params:
    - name: name
      type: string
      description: Projector name, up to 16 bytes, NUL-terminated.

# ---- 098-198. PIP/PICTURE BY PICTURE SET ----
- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03 B1 00 00 03 C5 {field} {value} {cks}"
  params:
    - name: field
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: value
      type: integer
      description: "For MODE: 00h PIP, 01h PBP. For START POSITION: 00h TL, 01h TR, 02h BL, 03h BR. For SUB INPUT*: see vendor appendix."

# ---- 098-243-1. EDGE BLENDING MODE SET ----
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03 B1 00 00 03 DF 00 {value} {cks}"
  params:
    - name: value
      type: integer
      description: "00h OFF, 01h ON"

# ---- 305-1. BASE MODEL TYPE REQUEST ----
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

# ---- 305-2. SERIAL NUMBER REQUEST ----
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

# ---- 305-3. BASIC INFORMATION REQUEST ----
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

# ---- 319-10. AUDIO SELECT SET ----
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03 C9 00 00 03 09 {input_terminal} {value} {cks}"
  params:
    - name: input_terminal
      type: integer
      description: Input terminal per vendor "Supplementary Information" appendix (not in this excerpt).
    - name: value
      type: integer
      description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Each maps an observable response field returned by one or more query commands.
- id: error_status
  type: bytes
  description: DATA01-DATA12 bitfield from 009 ERROR STATUS REQUEST (see source §3.1 for per-bit definitions: cover, temperature, fan, lamp, power, etc.)

- id: power_state
  type: enum
  values: [standby, power_on]
  description: DATA03 of 078-2 RUNNING STATUS REQUEST (00h=standby, 01h=power on).

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: DATA04 of 078-2 RUNNING STATUS REQUEST (00h/01h/FFh).

- id: power_transition_in_progress
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: DATA05 of 078-2 RUNNING STATUS REQUEST (00h/01h/FFh).

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby, not_supported]
  description: DATA06 of 078-2 / DATA01 of 305-3 (00h/04h/05h/06h/0Fh/10h/FFh).

- id: picture_mute
  type: enum
  values: [off, on]
  description: DATA01 of 078-4 MUTE STATUS REQUEST / DATA06 of 305-3.

- id: sound_mute
  type: enum
  values: [off, on]
  description: DATA02 of 078-4 MUTE STATUS REQUEST / DATA07 of 305-3.

- id: onscreen_mute
  type: enum
  values: [off, on]
  description: DATA03 of 078-4 MUTE STATUS REQUEST / DATA08 of 305-3.

- id: forced_onscreen_mute
  type: enum
  values: [off, on]
  description: DATA04 of 078-4 MUTE STATUS REQUEST.

- id: onscreen_display
  type: enum
  values: [not_displayed, displayed]
  description: DATA05 of 078-4 MUTE STATUS REQUEST.

- id: freeze_state
  type: enum
  values: [off, on]
  description: DATA09 of 305-3 BASIC INFORMATION REQUEST.

- id: cover_status
  type: enum
  values: [normal_open, cover_closed]
  description: DATA01 of 078-6 COVER STATUS REQUEST (00h/01h).

- id: content_displayed
  type: enum
  values: [video_signal, no_signal, viewer, test_pattern, lan, test_pattern_user, signal_switching, not_supported]
  description: DATA09 of 078-3 INPUT STATUS / DATA02 of 305-3 (00h/01h/02h/03h/04h/05h/10h/FFh).

- id: test_pattern_display
  type: enum
  values: [not_displayed, displayed, not_supported]
  description: DATA06 of 078-3 INPUT STATUS REQUEST.

- id: signal_switch_in_progress
  type: enum
  values: [not_executed, during_execution, not_supported]
  description: DATA01 of 078-3 INPUT STATUS REQUEST.

- id: signal_list_type
  type: enum
  values: [default, user, not_supported]
  description: DATA05 of 078-3 INPUT STATUS REQUEST.

- id: selection_signal_type_1
  type: integer
  description: DATA03 of 078-3 / 305-3 (01h..05h).

- id: selection_signal_type_2
  type: enum
  values: [computer, video, s_video, component, viewer_1_5, dvi_d, hdmi, displayport, viewer_6_10, not_source_input, reserved]
  description: DATA04 of 078-3 / 305-3 (01h/02h/03h/04h/05h/07h/20h/21h/22h/23h/FFh).

- id: display_signal_type
  type: enum
  values: [ntsc3_58, ntsc4_43, pal, pal60, secam, bw60, bw50, palnm, ntsc3_58_lbx, ntsc3_58_sqz, component_60hz, component_50hz, unknown, ntsc, pal_m, pal_l, not_video_input]
  description: DATA05 of 305-3 BASIC INFORMATION REQUEST (00h..0Fh/FFh), effective only when signal_type_2 is video or s-video.

- id: base_model_type
  type: bytes
  description: DATA01-DATA02 (and DATA12-DATA13) of 305-1 BASE MODEL TYPE REQUEST. Decoding in vendor "Supplementary Information" appendix (not in this excerpt).

- id: model_name
  type: string
  description: DATA01-DATA32 of 078-5 MODEL NAME REQUEST, NUL-terminated.

- id: serial_number
  type: string
  description: DATA01-DATA16 of 305-2 SERIAL NUMBER REQUEST, NUL-terminated.

- id: projector_name
  type: string
  description: DATA01-DATA49 of 037 INFORMATION REQUEST (NUL-terminated) and DATA01-DATA17 of 097-45 LAN PROJECTOR NAME REQUEST.

- id: mac_address
  type: bytes
  description: DATA01-DATA06 of 097-155 LAN MAC ADDRESS STATUS REQUEST 2.

- id: lamp_usage_seconds
  type: integer
  description: DATA83-DATA86 of 037 INFORMATION REQUEST; DATA03-DATA06 of 037-4 LAMP INFORMATION REQUEST 3. Updated at 1-minute intervals.

- id: filter_usage_seconds
  type: integer
  description: DATA01-DATA04 of 037-3 FILTER USAGE INFORMATION REQUEST.

- id: filter_alarm_start_seconds
  type: integer
  description: DATA05-DATA08 of 037-3 FILTER USAGE INFORMATION REQUEST. "-1" if undefined.

- id: lamp_remaining_life_percent
  type: integer
  description: DATA03-DATA06 of 037-4 LAMP INFORMATION REQUEST 3 with content=04h. Negative if lamp replacement deadline exceeded.

- id: carbon_savings_total_kg
  type: integer
  description: DATA02-DATA05 of 037-6 CARBON SAVINGS INFORMATION REQUEST (scope=00h, kg; max 99999).

- id: carbon_savings_total_mg
  type: integer
  description: DATA06-DATA09 of 037-6 CARBON SAVINGS INFORMATION REQUEST (scope=00h, mg; max 999999).

- id: carbon_savings_during_operation_kg
  type: integer
  description: DATA02-DATA05 of 037-6 CARBON SAVINGS INFORMATION REQUEST (scope=01h).

- id: carbon_savings_during_operation_mg
  type: integer
  description: DATA06-DATA09 of 037-6 CARBON SAVINGS INFORMATION REQUEST (scope=01h).

- id: horizontal_sync_frequency
  type: string
  description: Label+string returned by 084 INFORMATION STRING REQUEST with info_type=03h.

- id: vertical_sync_frequency
  type: string
  description: Label+string returned by 084 INFORMATION STRING REQUEST with info_type=04h.

- id: eco_mode_value
  type: integer
  description: DATA01 of 097-8 ECO MODE REQUEST. Decoding in vendor "Supplementary Information" appendix (not in this excerpt).

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: DATA01 of 097-243-1 EDGE BLENDING MODE REQUEST (00h/01h).

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: 097-198 PIP/PBP REQUEST, field=00h (MODE): 00h/01h.

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: 097-198 PIP/PBP REQUEST, field=01h: 00h/01h/02h/03h.

- id: pip_pbp_sub_input
  type: integer
  description: 097-198 PIP/PBP REQUEST, field=02h/09h/0Ah. Decoding in vendor "Supplementary Information" appendix.

- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
  description: 053-5 LENS MEMORY OPTION REQUEST, option=00h.

- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
  description: 053-5 LENS MEMORY OPTION REQUEST, option=01h.

- id: lens_status_bits
  type: bytes
  description: DATA01 of 053-7 LENS INFORMATION REQUEST (bit0 lens memory, bit1 zoom, bit2 focus, bit3 H-shift, bit4 V-shift, 0=stop / 1=moving).

- id: lens_position_range
  type: bytes
  description: DATA02-DATA07 of 053-1 LENS CONTROL REQUEST (upper/lower limit + current, 16-bit each).

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: DATA01 of 053-11 LENS PROFILE REQUEST (00h/01h).

- id: sound_function
  type: enum
  values: [not_available, available]
  description: DATA04 of 078-1 SETTING REQUEST (00h/01h).

- id: profile_function
  type: enum
  values: [not_available, clock, sleep_timer, clock_and_sleep_timer]
  description: DATA05 of 078-1 SETTING REQUEST (00h/01h/02h/03h).

- id: error_response
  type: bytes
  description: ERR1, ERR2 returned in ACK packets on failure. See source §2.4 for the 21 documented combinations (e.g. 01h/00h invalid value, 02h/07h no signal, 02h/0Dh command rejected because power is off).
```

## Variables
```yaml
# Settable scalars not exposed as one-shot actions elsewhere.
- id: audio_select
  description: 319-10 AUDIO SELECT SET, value codes (00h/01h/02h).
  settable: true

- id: edge_blending
  description: 098-243-1 EDGE BLENDING MODE SET, value codes (00h/01h).
  settable: true

- id: eco_mode
  description: 098-8 ECO MODE SET. Specific value codes deferred to vendor appendix.
  settable: true

- id: pip_pbp_mode
  description: 098-198 PIP/PICTURE BY PICTURE SET, field=00h.
  settable: true

- id: pip_pbp_start_position
  description: 098-198 PIP/PICTURE BY PICTURE SET, field=01h.
  settable: true

- id: pip_pbp_sub_input
  description: 098-198 PIP/PICTURE BY PICTURE SET, field=02h/09h/0Ah.
  settable: true

- id: lens_profile
  description: 053-10 LENS PROFILE SET (00h/01h).
  settable: true

- id: lens_memory_load_by_signal
  description: 053-6 LENS MEMORY OPTION SET, option=00h.
  settable: true

- id: lens_memory_forced_mute
  description: 053-6 LENS MEMORY OPTION SET, option=01h.
  settable: true

- id: picture_adjust_params
  description: 030-1 PICTURE ADJUST (brightness/contrast/color/hue/sharpness, abs/rel).
  settable: true

- id: volume
  description: 030-2 VOLUME ADJUST (abs/rel).
  settable: true

- id: aspect
  description: 030-12 ASPECT ADJUST. Specific value codes deferred to vendor appendix.
  settable: true

- id: lamp_or_light_adjust
  description: 030-15 OTHER ADJUST (abs/rel).
  settable: true

- id: freeze
  description: 079 FREEZE CONTROL (01h on / 02h off).
  settable: true

- id: projector_name
  description: 098-45 LAN PROJECTOR NAME SET (up to 16 bytes, NUL-terminated).
  settable: true

- id: shutter
  description: 051/052 SHUTTER CLOSE/OPEN.
  settable: true
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications from the
# projector; all responses are paired with the request that triggered them.
```

## Macros
```yaml
# UNRESOLVED: source does not define any explicit multi-step macro sequences.
# Note: while the source describes stop behavior for continuous lens drive
# (send 00h after 7Fh/81h), that is a documented single-command sequence
# encoded directly in 053. LENS CONTROL, not a separate macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  # Source §3.2 (POWER ON): while turning on, no other command accepted.
  # Source §3.3 (POWER OFF): while turning off (incl. cooling), no other command accepted.
  # Source §2.4 ERR1/ERR2=02h/0Dh: command cannot be accepted because the power is off.
  # Source §2.4 ERR1/ERR2=02h/04h: forced onscreen mute is on.
  # Source §3.1 DATA09 bit1: interlock switch is open (status flag, not an enforced interlock).
  - power_transition_lockout  # power on/off ignore other commands until complete (source §3.2, §3.3)
# UNRESOLVED: source contains no formal warning text or operator-safety interlocks
# (e.g. shutdown-on-cover-open). Only protocol-level accept/reject behavior is
# documented; mechanical/electrical safety procedures are out of scope of this ref.
```

## Notes
- Frame bytes shown in actions are literal hex from the source. Each command ends with a 1-byte CKS checksum = low-order byte of sum of all preceding bytes (§2.2). Token {cks} is intentionally omitted from the template; integrators must compute it.
- <ID1> = control ID, <ID2> = model code. LEN = number of data-part bytes (§2.2).
- Serial: RS-232C, 8N1, full-duplex. Source lists supported baud rates 4800/9600/19200/38400/115200 but does not state a default. RTS/CTS handshaking per D-SUB 9P pinout in §1.1.
- LAN: TCP port 7142 (§1.2 "Port number"). Wired 10/100 Mbps auto-negotiation; wireless unit optional.
- Reply packet types by leading byte (§2.3):
    - 20h-23h = success, with or without data part (e.g. 23h 10h ... for PICTURE/VOLUME/ASPECT ADJUST).
    - A0h-A3h = error (ERR1, ERR2 follow).
- Error codes: §2.4 lists 21 ERR1/ERR2 pairs. Notable: 02h/07h = "No signal", 02h/0Dh = "command cannot be accepted because power is off", 02h/04h = "Forced onscreen mute on".
- Many parameter tables (input-terminal codes, aspect codes, eco mode values, base-model types, PIP sub-input values) are deferred by the source to a "Supplementary Information by Command" appendix which is not included in this excerpt; those fields are marked UNRESOLVED in the relevant action params/feedback values rather than fabricated.
- PIP/PBP request and set share an identical DATA01 enum (00h MODE, 01h START POSITION, 02h SUB INPUT/1, 09h SUB INPUT 2, 0Ah SUB INPUT 3); the set response DATA01 echo in source §3.48 lists 02h/03h/04h which appears to be a source typo (matches request field codes), preserved here as-is.
<!-- UNRESOLVED: firmware compatibility ranges not stated; per-axis lens control codes not in this excerpt; default serial baud rate not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
  - manualowl.com
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://www.manualowl.com/m/NEC/PX-42VP5HA/Manual/195689
retrieved_at: 2026-08-08T06:05:34.103Z
last_checked_at: 2026-08-19T09:35:45.658Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:35:45.658Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions map one-to-one onto the source's 53-entry command list with matching literal hex frames and transport values. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility ranges not stated; input-terminal and signal-type sub-enumerations are deferred to the vendor \"Supplementary Information by Command\" appendix which is not in this excerpt."
- "source lists 115200/38400/19200/9600/4800 as supported but does not state a default; choose at deploy time"
- "source does not document any unsolicited notifications from the"
- "source does not define any explicit multi-step macro sequences."
- "source contains no formal warning text or operator-safety interlocks"
- "firmware compatibility ranges not stated; per-axis lens control codes not in this excerpt; default serial baud rate not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
