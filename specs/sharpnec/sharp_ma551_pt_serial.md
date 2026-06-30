---
spec_id: admin/sharp-nec-ma551-pt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma551 Pt Control Spec"
manufacturer: Sharp/NEC
model_family: "Ma551 Pt"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ma551 Pt"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:18:08.456Z
last_checked_at: 2026-06-18T08:28:24.331Z
generated_at: 2026-06-18T08:28:24.331Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; flow_control not stated; exact Ma551 Pt input terminal value map lives in source Appendix \"Supplementary Information by Command\" (not inlined here)."
  - "flow control not stated (RTS/CTS pins present on D-SUB 9P)"
  - "source describes no unsolicited notifications; all responses are command replies."
  - "source documents no explicit multi-step sequences."
  - "no explicit power-on sequencing voltage/current interlock procedures beyond command-level rejections stated above."
  - "firmware version compatibility; exact input terminal / aspect / eco / sub-input / base-model-type value enumerations (in source Appendix not present in refined excerpt)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:28:24.331Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ma551 Pt Control Spec

## Summary
Sharp/NEC Ma551 Pt projector control spec. Binary hex protocol over RS-232C serial and TCP (port 7142). Covers power, input switching, mutes, picture/volume/aspect adjust, lens/shutter, lens memory, eco mode, PIP/PbP, edge blending, and a broad set of status queries (running status, input status, mute status, lamp/filter usage, model/serial, MAC address, error status).

<!-- UNRESOLVED: firmware version compatibility not stated; flow_control not stated; exact Ma551 Pt input terminal value map lives in source Appendix "Supplementary Information by Command" (not inlined here). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins present on D-SUB 9P)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from 015 POWER ON / 016 POWER OFF
  - queryable    # inferred from many status/gain/lamp/filter requests
  - levelable    # inferred from 030-2 VOLUME ADJUST, 030-1 PICTURE ADJUST
  - routable     # inferred from 018 INPUT SW CHANGE
```

## Actions
```yaml
# Frame: [typeByte] [cmdCode] [00h] [00h] [LEN] [DATA...] [CKS]
# CKS = low-order byte of the sum of all preceding bytes (incl. typeByte, cmdCode, LEN, DATA).
# Command bytes below are VERBATIM from source. For parameterized commands the variable
# DATA byte is shown as {name}; recompute CKS after substituting.
actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal byte (e.g. 06h = video port). See source Appendix 'Supplementary Information by Command' for full input terminal map."
      - name: checksum
        type: integer
        description: "Recomputed CKS = low byte of sum(02h+03h+00h+00h+02h+01h+{input})."
    notes: "Example DATA01=06h -> 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared on input terminal switch or video signal switch."

  - id: cmd_021_picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared on input terminal switch, video signal switch, or volume adjust."

  - id: cmd_023_sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared on input terminal switch or video signal switch."

  - id: cmd_025_onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: mode
        type: integer
        description: "00h absolute, 01h relative"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Brightness=+10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h; Brightness=-10 -> 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "00h absolute, 01h relative"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
    params:
      - name: aspect
        type: integer
        description: "Aspect value byte; see source Appendix 'Supplementary Information by Command'."
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "00h absolute, 01h relative"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "DATA01=96h DATA02=FFh => LAMP ADJUST / LIGHT ADJUST (only target documented)."

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response carries projector name, lamp usage time (s), filter usage time (s)."

  - id: cmd_037_3_filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (s) and filter alarm start time (s); -1 if undefined."

  - id: cmd_037_4_lamp_info_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: integer
        description: "00h Lamp 1, 01h Lamp 2 (01h only valid on two-lamp models)"
      - name: content
        type: integer
        description: "01h lamp usage time (s), 04h lamp remaining life (%)"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Lamp1 usage -> 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life is negative if replacement deadline exceeded."

  - id: cmd_037_6_carbon_savings_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {scope} {checksum}"
    params:
      - name: scope
        type: integer
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Returns kg (DATA02-05) + mg (DATA06-09). Max kg 99999, max mg 999999."

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
    params:
      - name: key_lo
        type: integer
        description: "Key code low byte (DATA01). See key code list."
      - name: key_hi
        type: integer
        description: "Key code high byte (DATA02)."
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "AUTO -> 02h 0Fh 00h 00h 02h 05h 00h 18h. Key codes: 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO."

  - id: cmd_051_shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
    params:
      - name: target
        type: integer
        description: "Lens target byte (e.g. 06h Periphery Focus)"
      - name: action
        type: integer
        description: "DATA02: 00h Stop, 01h drive +1s, 02h +0.5s, 03h +0.25s, 7Fh drive plus, 81h drive minus, FDh -0.25s, FEh -0.5s, FFh -1s"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "After 7Fh/81h, send 00h to stop. Lens can be controlled without stop while driving by repeating the command."

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
    params:
      - name: target
        type: integer
        description: "Lens target byte"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Returns upper/lower limits and current value for the lens target."

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01: FFh = Stop (mode/value ignored), else lens target byte"
      - name: mode
        type: integer
        description: "00h absolute, 02h relative"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Operates on the profile selected via 053-10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {option} {checksum}"
    params:
      - name: option
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Returns setting value 00h OFF / 01h ON."

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
    params:
      - name: option
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: value
        type: integer
        description: "00h OFF, 01h ON"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmask: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift(H), Bit4 Lens Shift(V) (0=Stop,1=Operating)."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {checksum}"
    params:
      - name: profile
        type: integer
        description: "00h Profile 1, 01h Profile 2"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns profile number 00h Profile 1 / 01h Profile 2."

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
    params:
      - name: name
        type: integer
        description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Brightness -> 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response carries status, upper/lower/default/current value, wide/narrow adjustment width."

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function (00h/01h), profile number (clock/sleep timer)."

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display flags."

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name (NUL-terminated)."

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h Normal (cover opened) / 01h Cover closed."

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {state} {checksum}"
    params:
      - name: state
        type: integer
        description: "01h freeze ON, 02h freeze OFF"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {info_type} 01h {checksum}"
    params:
      - name: info_type
        type: integer
        description: "03h Horizontal sync frequency, 04h Vertical sync frequency"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "Returns label length + NUL-terminated label string."

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value; see source Appendix for value map."

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (NUL-terminated, up to 17 bytes)."

  - id: cmd_097_155_lan_mac_address_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address."

  - id: cmd_097_198_pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
    params:
      - name: item
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
    notes: "MODE values 00h PIP / 01h PBP. START POSITION 00h TL, 01h TR, 02h BL, 03h BR. Sub input value map in source Appendix."

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns 00h OFF / 01h ON."

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "Eco/light/lamp mode value; see source Appendix 'Supplementary Information by Command'."
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_bytes_01-16} 00h {checksum}"
    params:
      - name: name_bytes_01-16
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16)."
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_098_198_pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
    params:
      - name: item
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h PIP / 01h PBP. START POSITION: 00h TL, 01h TR, 02h BL, 03h BR. Sub input value map in source Appendix."
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "00h OFF, 01h ON"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type + model name (NUL-terminated)."

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number (NUL-terminated, up to 16 bytes)."

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal byte; see source Appendix 'Supplementary Information by Command'."
      - name: value
        type: integer
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
      - name: checksum
        type: integer
        description: "Recomputed CKS over all preceding bytes."
```

## Feedbacks
```yaml
# Response framing: success frames begin A0h/A1h/A2h/A3h/20h/21h/22h/23h with <ID1> <ID2>.
# Error frames: A0h/A1h/A2h/A3h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.
feedbacks:
  - id: command_ack
    type: enum
    description: "Per-command success response echoes the command code with ACK framing and any requested DATA bytes."
    values: [success, error]

  - id: error_status
    type: bitmask
    description: "009 ERROR STATUS REQUEST returns DATA01-DATA12 bitmask. Bits set: cover error, fan error, temperature error, power error, lamp off/replacement moratorium, lamp usage limit, formatter error, FPGA error, lamp not present/data error, mirror cover error, ballast comms error, iris calibration error, lens not installed, foreign matter sensor, interlock switch open, system error (slave CPU / formatter)."

  - id: running_status
    type: enum
    description: "078-2 power status (00h Standby / 01h Power on), operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Power saving, 10h Network standby)."

  - id: mute_status
    type: enum
    description: "078-4 picture/sound/onscreen/forced-onscreen mute + onscreen display flags (00h Off / 01h On each)."
```

## Variables
```yaml
variables:
  - id: picture_brightness
    description: "Adjusted via 030-1 target 00h; query via 060-1 name 00h."
  - id: picture_contrast
    description: "Adjusted via 030-1 target 01h; query via 060-1 name 01h."
  - id: picture_color
    description: "Adjusted via 030-1 target 02h; query via 060-1 name 02h."
  - id: picture_hue
    description: "Adjusted via 030-1 target 03h; query via 060-1 name 03h."
  - id: picture_sharpness
    description: "Adjusted via 030-1 target 04h; query via 060-1 name 04h."
  - id: volume
    description: "Adjusted via 030-2; query via 060-1 name 05h."
  - id: lamp_light_adjust
    description: "Adjusted via 030-15; query via 060-1 name 96h."
  - id: aspect
    description: "Set via 030-12; value map in source Appendix."
  - id: eco_mode
    description: "Set via 098-8; query via 097-8; value map in source Appendix."
  - id: lan_projector_name
    description: "Set via 098-45; query via 097-45 (up to 16 bytes)."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are command replies.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: no other command accepted while power-on in progress."
  - "016 POWER OFF: no other command accepted during power-off incl. cooling time."
  - "Error code 02h 0Dh: command rejected because power is off."
  - "Error code 02h 0Fh: no authority for the operation."
  - "DATA09 Bit1: interlock switch open (reported in 009 error status)."
# UNRESOLVED: no explicit power-on sequencing voltage/current interlock procedures beyond command-level rejections stated above.
```

## Notes
- Checksum (CKS) = low-order byte of the sum of all preceding bytes in the frame. Example: `20h 81h 01h 60h 01h 00h` -> sum 103h -> CKS 03h.
- Command frame layout: `[typeByte] [cmdCode] 00h 00h [LEN] [DATA...] [CKS]`. ID1 = projector control ID, ID2 = model code (both echoed in responses, not in PC-originated commands).
- Response framing prefixes: data success `20h/21h/22h/23h`, error `A0h/A1h/A2h/A3h` (matching the command's type byte family).
- Lamp/filter usage time updated at one-minute intervals despite one-second resolution.
- Lamp remaining life (%) returns negative when replacement deadline exceeded.
- 01h (Lamp 2) in 037-4 DATA01 valid only on two-lamp projector models.
- Input terminal value map, aspect value map, eco mode value map, PIP/PbP sub input value map, and base model type map all live in the source Appendix "Supplementary Information by Command" — not inlined in this refined excerpt.
<!-- UNRESOLVED: firmware version compatibility; exact input terminal / aspect / eco / sub-input / base-model-type value enumerations (in source Appendix not present in refined excerpt). -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:18:08.456Z
last_checked_at: 2026-06-18T08:28:24.331Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:28:24.331Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; flow_control not stated; exact Ma551 Pt input terminal value map lives in source Appendix \"Supplementary Information by Command\" (not inlined here)."
- "flow control not stated (RTS/CTS pins present on D-SUB 9P)"
- "source describes no unsolicited notifications; all responses are command replies."
- "source documents no explicit multi-step sequences."
- "no explicit power-on sequencing voltage/current interlock procedures beyond command-level rejections stated above."
- "firmware version compatibility; exact input terminal / aspect / eco / sub-input / base-model-type value enumerations (in source Appendix not present in refined excerpt)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
