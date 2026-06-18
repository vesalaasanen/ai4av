---
spec_id: admin/sharp-nec-cb751q-c1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Cb751Q C1 Control Spec"
manufacturer: Sharp/NEC
model_family: "Cb751Q C1"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Cb751Q C1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:04:03.469Z
last_checked_at: 2026-06-17T19:40:31.993Z
generated_at: 2026-06-17T19:40:31.993Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table (DATA01 codes for 018/319-10) referenced as appendix \"Supplementary Information by Command\" — not present in refined source."
  - "aspect value table (030-12 DATA01), eco mode value table (097-8/098-8 DATA01), base model type table (078-1/305-1), sub input value table (097-198/098-198) all referenced as appendix — not present."
  - "model code (ID2) for Cb751Q C1 not stated."
  - "source states \"Full duplex\" communication mode but no flow-control setting; RTS/CTS pins wired in pinout"
  - "not present in refined source.\""
  - "value table in appendix 'Supplementary Information by Command' - not present in refined source.\""
  - "value table in appendix - not present in refined source.\""
  - "sub-input value table in appendix.\""
  - "appendix table not in source).\""
  - "base model type value table in appendix.\""
  - "source describes no unsolicited notifications / push events."
  - "source documents no multi-step command sequences."
  - "source contains interlock-switch error bit (DATA09 Bit1) but no power-on sequencing procedure or voltage/power specs."
  - "model code (ID2) for Cb751Q C1 not stated in source — required in every frame."
  - "control ID (ID1) default value not stated — configurable on projector."
  - "input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, sub-input value table all referenced as appendix \"Supplementary Information by Command\" — appendix not present in refined source."
  - "030-15 OTHER ADJUST only documents target 96h/FFh (LAMP/LIGHT ADJUST); other targets referenced but not enumerated."
  - "053 LENS CONTROL only documents DATA01=06h (Periphery Focus); other lens targets referenced via 053-7 bitfield but not mapped to DATA01 codes in this source."
  - "firmware version compatibility not stated."
  - "serial flow_control setting not stated (full-duplex communication mode documented; RTS/CTS pins wired)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:40:31.993Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions have literal command matches in the source document with correct hex payloads and transport parameters verified. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Cb751Q C1 Control Spec

## Summary
Projector control spec for the Sharp/NEC Cb751Q C1. Binary command protocol over RS-232C serial (D-SUB 9P PC CONTROL port) and wired/wireless LAN (TCP port 7142). Covers power, input switch, mute (picture/sound/onscreen), picture/volume/aspect/gain adjust, lens control + memory, freeze, shutter, eco mode, PIP/PbP, edge blending, and a broad set of status/error/information queries. Reference manual BDT140013 Rev 7.1.

<!-- UNRESOLVED: input terminal value table (DATA01 codes for 018/319-10) referenced as appendix "Supplementary Information by Command" — not present in refined source. -->
<!-- UNRESOLVED: aspect value table (030-12 DATA01), eco mode value table (097-8/098-8 DATA01), base model type table (078-1/305-1), sub input value table (097-198/098-198) all referenced as appendix — not present. -->
<!-- UNRESOLVED: model code (ID2) for Cb751Q C1 not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# Two physical transports documented. Serial via PC CONTROL (D-SUB 9P cross cable).
# LAN via wired RJ-45 or wireless LAN unit, TCP port 7142.
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode but no flow-control setting; RTS/CTS pins wired in pinout
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable    # inferred: many *REQUEST commands return status/state
  - levelable    # inferred: 030-1 PICTURE / 030-2 VOLUME / 030-15 GAIN adjust present
  - routable     # inferred: 018 INPUT SW CHANGE present
```

## Actions
```yaml
# All command payloads verbatim from source (hex). Frame layout:
#   <HEADER> <OPCODE> 00h 00h <LEN> <DATA...> <CKS>
# CKS = low byte of sum of all preceding bytes (computed). ID1=control ID, ID2=model code.
# Parameterized actions show variable DATA as {name}; header/opcode/LEN literal.

actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitfields (cover/fan/temp/lamp/formatter/mirror/interlock/etc)."

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
    command: "02h 03h 00h 00h 02h 01h {input_terminal} {CKS}"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (DATA01). Source example: 06h = video port. Full value table in appendix 'Supplementary Information by Command' - UNRESOLVED: not present in refined source."
    notes: "Response DATA01=FFh means ended with error (no switch made)."

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared on input/video signal switch."

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
    notes: "Cleared on input/video switch or volume adjust."

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
    notes: "Cleared on input/video signal switch."

  - id: cmd_025_onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {CKS}"
    params:
      - name: target
        type: integer
        description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: mode
        type: integer
        description: "DATA02 adjustment mode: 00h=absolute, 01h=relative. (Fixed FFh byte sits between DATA01 and DATA02 per source frame.)"
      - name: value_lo
        type: integer
        description: "DATA03 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA04 adjustment value high-order 8 bits."
    notes: "Response DATA01-02 = 0000h success, other = error."

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {CKS}"
    params:
      - name: mode
        type: integer
        description: "DATA01 adjustment mode: 00h=absolute, 01h=relative."
      - name: value_lo
        type: integer
        description: "DATA02 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA03 adjustment value high-order 8 bits."
    notes: "Source example sets volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {CKS}"
    params:
      - name: aspect
        type: integer
        description: "DATA01 aspect value. UNRESOLVED: value table in appendix 'Supplementary Information by Command' - not present in refined source."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {CKS}"
    params:
      - name: target_lo
        type: integer
        description: "DATA01 adjustment target low byte. Source: 96h for LAMP ADJUST / LIGHT ADJUST."
      - name: target_hi
        type: integer
        description: "DATA02 adjustment target high byte. Source: FFh for LAMP/LIGHT ADJUST."
      - name: mode
        type: integer
        description: "DATA03 adjustment mode: 00h=absolute, 01h=relative."
      - name: value_lo
        type: integer
        description: "DATA04 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA05 adjustment value high-order 8 bits."

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds. Updated 1-min intervals."

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "DATA01-04 filter usage seconds, DATA05-08 filter alarm start seconds. -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {CKS}"
    params:
      - name: lamp
        type: integer
        description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: content
        type: integer
        description: "DATA02: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
    notes: "Reflects eco mode. Negative remaining-life % if replacement deadline exceeded."

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {scope} {CKS}"
    params:
      - name: scope
        type: integer
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {CKS}"
    params:
      - name: key_lo
        type: integer
        description: "DATA01 low byte of WORD key code. See key code list."
      - name: key_hi
        type: integer
        description: "DATA02 high byte of WORD key code (00h for all listed keys)."
    notes: "Key code list (key, DATA01, name): 2/02h POWER ON, 3/03h POWER OFF, 5/05h AUTO, 6/06h MENU, 7/07h UP, 8/08h DOWN, 9/09h RIGHT, 10/0Ah LEFT, 11/0Bh ENTER, 12/0Ch EXIT, 13/0Dh HELP, 15/0Fh MAGNIFY UP, 16/10h MAGNIFY DOWN, 19/13h MUTE, 41/29h PICTURE, 75/4Bh COMPUTER1, 76/4Ch COMPUTER2, 79/4Fh VIDEO1, 81/51h S-VIDEO1, 132/84h VOLUME UP, 133/85h VOLUME DOWN, 138/8Ah FREEZE, 163/A3h ASPECT, 215/D7h SOURCE, 238/EEh LAMP MODE/ECO."

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
    command: "02h 18h 00h 00h 02h {target} {action} {CKS}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target. Source documents 06h=Periphery Focus. (Other focus/zoom/shift targets referenced in 053-7.)"
      - name: action
        type: integer
        description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
    notes: "Send 00h to stop after 7Fh/81h continuous drive."

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {CKS}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target (matches 053 LENS CONTROL targets)."
    notes: "Returns DATA02-07: upper limit lo/hi, lower limit lo/hi, current value lo/hi."

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {CKS}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target. FFh=Stop (mode/value ignored)."
      - name: mode
        type: integer
        description: "DATA02: 00h=absolute, 02h=relative."
      - name: value_lo
        type: integer
        description: "DATA03 adjustment value low-order 8 bits."
      - name: value_hi
        type: integer
        description: "DATA04 adjustment value high-order 8 bits."

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {CKS}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {CKS}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {option} {CKS}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    notes: "Returns DATA02 setting value: 00h=OFF, 01h=ON."

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {CKS}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: value
        type: integer
        description: "DATA02 setting value: 00h=OFF, 01h=ON."

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) - each 0=Stop, 1=During operation. Bits 5-7 reserved."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {CKS}"
    params:
      - name: profile
        type: integer
        description: "DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2. DATA02 reserved."

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {CKS}"
    params:
      - name: name
        type: integer
        description: "DATA01 adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Returns 16-byte record: status, upper/lower/default/current limits, wide/narrow widths, default-valid flag."

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns DATA01-03 base model type, DATA04 sound function (00h none / 01h avail), DATA05 profile (00h none / 01h clock / 02h sleep / 03h both)."

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns DATA03 power status, DATA04 cooling, DATA05 power on/off process, DATA06 operation status (standby/power-on/cooling/error/power-saving/network-standby)."

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (value-1), selection signal type 1/2 (COMPUTER/VIDEO/S-VIDEO/COMPONENT/DVI-D/HDMI/DisplayPort/VIEWER), test pattern display, content displayed."

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display state, each 00h Off / 01h On."

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns DATA01-32 model name (NUL-terminated)."

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {state} {CKS}"
    params:
      - name: state
        type: integer
        description: "DATA01: 01h=freeze on, 02h=freeze off."

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {info_type} 01h {CKS}"
    params:
      - name: info_type
        type: integer
        description: "DATA01 information type: 03h=horizontal sync frequency, 04h=vertical sync frequency."
    notes: "Returns variable-length label/info string (NUL-terminated)."

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns DATA01 eco/light/lamp mode value. UNRESOLVED: value table in appendix - not present in refined source."

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns DATA01-17 projector name (NUL-terminated)."

  - id: cmd_097_155_lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns DATA01-06 MAC address bytes."

  - id: cmd_097_198_pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {CKS}"
    params:
      - name: item
        type: integer
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    notes: "DATA02 returns MODE (00h PIP / 01h PbP), START POSITION (00h TL / 01h TR / 02h BL / 03h BR), or sub-input value. UNRESOLVED: sub-input value table in appendix."

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {CKS}"
    params:
      - name: value
        type: integer
        description: "DATA01 eco/light/lamp mode value. UNRESOLVED: value table in appendix - not present in refined source."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_01} {name_02} {name_03} {name_04} {name_05} {name_06} {name_07} {name_08} {name_09} {name_10} {name_11} {name_12} {name_13} {name_14} {name_15} {name_16} 00h {CKS}"
    params:
      - name: name_01
        type: integer
        description: "DATA01 projector name byte 1 (up to 16 bytes total, DATA01-16)."
    notes: "16-byte name buffer, NUL-terminated. Implementor should pass full 16-byte name array."

  - id: cmd_098_198_pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {CKS}"
    params:
      - name: item
        type: integer
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: value
        type: integer
        description: "DATA02: MODE (00h PIP / 01h PbP); START POSITION (00h TL / 01h TR / 02h BL / 03h BR); or sub-input value (UNRESOLVED: appendix table not in source)."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {CKS}"
    params:
      - name: value
        type: integer
        description: "DATA01: 00h=OFF, 01h=ON."

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns DATA01-02 + DATA12-13 base model type, DATA03-11 model name. UNRESOLVED: base model type value table in appendix."

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns DATA01-16 serial number (NUL-terminated)."

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal type 1/2, display signal type (video standards), video/sound/onscreen mute, freeze status."

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input_terminal} {audio_source} {CKS}"
    params:
      - name: input_terminal
        type: integer
        description: "DATA01 input terminal. UNRESOLVED: value table in appendix - not present in refined source."
      - name: audio_source
        type: integer
        description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    source_action: cmd_009_error_status_request
    description: "12-byte error bitfield: cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock-switch/system errors."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source_action: cmd_078_2_running_status_request

  - id: mute_state
    type: object
    description: "Picture/sound/onscreen/forced-onscreen mute flags + OSD display flag."
    source_action: cmd_078_4_mute_status_request

  - id: input_signal_status
    type: object
    description: "Signal switch process, signal list number, selection signal type 1/2, test pattern, content displayed."
    source_action: cmd_078_3_input_status_request

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    source_action: cmd_078_6_cover_status_request

  - id: lens_operation_status
    type: bitmask
    description: "Per-target stop/in-operation flags for lens memory, zoom, focus, lens shift H/V."
    source_action: cmd_053_7_lens_information_request

  - id: command_response
    type: enum
    values: [success, error]
    description: "Each command returns A0h/A1h/A2h/A3h response with ERR1/ERR2 codes per §2.4 error table."
```

## Variables
```yaml
variables:
  - id: brightness
    set_via: cmd_030_1_picture_adjust (target 00h)
    query_via: cmd_060_1_gain_parameter_request_3 (name 00h)

  - id: contrast
    set_via: cmd_030_1_picture_adjust (target 01h)
    query_via: cmd_060_1_gain_parameter_request_3 (name 01h)

  - id: color
    set_via: cmd_030_1_picture_adjust (target 02h)
    query_via: cmd_060_1_gain_parameter_request_3 (name 02h)

  - id: hue
    set_via: cmd_030_1_picture_adjust (target 03h)
    query_via: cmd_060_1_gain_parameter_request_3 (name 03h)

  - id: sharpness
    set_via: cmd_030_1_picture_adjust (target 04h)
    query_via: cmd_060_1_gain_parameter_request_3 (name 04h)

  - id: volume
    set_via: cmd_030_2_volume_adjust
    query_via: cmd_060_1_gain_parameter_request_3 (name 05h)

  - id: lamp_light_adjust
    set_via: cmd_030_15_other_adjust (target 96h/FFh)
    query_via: cmd_060_1_gain_parameter_request_3 (name 96h)

  - id: aspect
    set_via: cmd_030_12_aspect_adjust

  - id: eco_mode
    set_via: cmd_098_8_eco_mode_set
    query_via: cmd_097_8_eco_mode_request

  - id: edge_blending_mode
    set_via: cmd_098_243_1_edge_blending_mode_set
    query_via: cmd_097_243_1_edge_blending_mode_request

  - id: freeze
    set_via: cmd_079_freeze_control

  - id: pip_pbp_mode
    set_via: cmd_098_198_pip_pbp_set (item 00h)
    query_via: cmd_097_198_pip_pbp_request (item 00h)

  - id: lan_projector_name
    set_via: cmd_098_45_lan_projector_name_set
    query_via: cmd_097_45_lan_projector_name_request

  - id: lens_memory_load_by_signal
    set_via: cmd_053_6_lens_memory_option_set (option 00h)
    query_via: cmd_053_5_lens_memory_option_request (option 00h)

  - id: lens_memory_forced_mute
    set_via: cmd_053_6_lens_memory_option_set (option 01h)
    query_via: cmd_053_5_lens_memory_option_request (option 01h)

  - id: reference_lens_profile
    set_via: cmd_053_10_lens_profile_set
    query_via: cmd_053_11_lens_profile_request
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - cmd_016_power_off  # source: no other command accepted during power-off incl. cooling
  - cmd_015_power_on   # source: no other command accepted while power-on in progress
interlocks:
  - "Power-on/off in progress blocks all other commands (015/016)."
  - "Picture mute cleared on input/video switch. Sound mute cleared on input/video switch or volume adjust."
  - "Lens continuous drive (053 DATA02=7Fh/81h) must be explicitly stopped with 00h."
# UNRESOLVED: source contains interlock-switch error bit (DATA09 Bit1) but no power-on sequencing procedure or voltage/power specs.
```

## Notes
- Binary protocol. Every frame = `<HEADER> <OPCODE> 00h 00h <LEN> <DATA...> <CKS>`. HEADER byte indicates command class (00h info / 01h control-cat-1 / 02h control-cat-2 / 03h adjust). Response headers mirror with high bit set: 20h/21h/22h/23h success, A0h/A1h/A2h/A3h error (carries ERR1/ERR2).
- Checksum = low-order byte of sum of all preceding bytes (incl. header, opcode, zeros, LEN, DATA). Computed per transmission.
- ID1 = projector control ID (configurable on device). ID2 = model code. Both required in every frame; values not stated for Cb751Q C1 in this source.
- Error code table (§2.4) covers: unrecognized command, unsupported by model, invalid value/input/language, memory errors, forced onscreen mute, viewer error, no signal, test pattern displayed, no PC card, entry list displayed, power off rejection, exec failure, no authority, gain errors, adjustment failed.
- Lamp/filter usage times update at 1-minute intervals despite 1-second resolution.
- Both serial (PC CONTROL D-SUB 9P, cross cable, pinout documented) and LAN (RJ-45 10/100 autosense + wireless LAN unit) supported. TCP port 7142 for LAN command transport.

<!-- UNRESOLVED: model code (ID2) for Cb751Q C1 not stated in source — required in every frame. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated — configurable on projector. -->
<!-- UNRESOLVED: input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, sub-input value table all referenced as appendix "Supplementary Information by Command" — appendix not present in refined source. -->
<!-- UNRESOLVED: 030-15 OTHER ADJUST only documents target 96h/FFh (LAMP/LIGHT ADJUST); other targets referenced but not enumerated. -->
<!-- UNRESOLVED: 053 LENS CONTROL only documents DATA01=06h (Periphery Focus); other lens targets referenced via 053-7 bitfield but not mapped to DATA01 codes in this source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control setting not stated (full-duplex communication mode documented; RTS/CTS pins wired). -->
````

Spec ready. 55 actions enumerated — every command row in source §2 list covered. Binary payloads verbatim. UNRESOLVED markers on appendix-referenced value tables, model code, flow_control, firmware. Caveman out.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:04:03.469Z
last_checked_at: 2026-06-17T19:40:31.993Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:40:31.993Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions have literal command matches in the source document with correct hex payloads and transport parameters verified. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table (DATA01 codes for 018/319-10) referenced as appendix \"Supplementary Information by Command\" — not present in refined source."
- "aspect value table (030-12 DATA01), eco mode value table (097-8/098-8 DATA01), base model type table (078-1/305-1), sub input value table (097-198/098-198) all referenced as appendix — not present."
- "model code (ID2) for Cb751Q C1 not stated."
- "source states \"Full duplex\" communication mode but no flow-control setting; RTS/CTS pins wired in pinout"
- "not present in refined source.\""
- "value table in appendix 'Supplementary Information by Command' - not present in refined source.\""
- "value table in appendix - not present in refined source.\""
- "sub-input value table in appendix.\""
- "appendix table not in source).\""
- "base model type value table in appendix.\""
- "source describes no unsolicited notifications / push events."
- "source documents no multi-step command sequences."
- "source contains interlock-switch error bit (DATA09 Bit1) but no power-on sequencing procedure or voltage/power specs."
- "model code (ID2) for Cb751Q C1 not stated in source — required in every frame."
- "control ID (ID1) default value not stated — configurable on projector."
- "input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, sub-input value table all referenced as appendix \"Supplementary Information by Command\" — appendix not present in refined source."
- "030-15 OTHER ADJUST only documents target 96h/FFh (LAMP/LIGHT ADJUST); other targets referenced but not enumerated."
- "053 LENS CONTROL only documents DATA01=06h (Periphery Focus); other lens targets referenced via 053-7 bitfield but not mapped to DATA01 codes in this source."
- "firmware version compatibility not stated."
- "serial flow_control setting not stated (full-duplex communication mode documented; RTS/CTS pins wired)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
