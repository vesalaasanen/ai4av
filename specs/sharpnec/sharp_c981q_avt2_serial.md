---
spec_id: admin/sharp-nec-c981q-avt2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C981Q Avt2 Control Spec"
manufacturer: Sharp/NEC
model_family: "C981Q Avt2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C981Q Avt2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:12:28.463Z
last_checked_at: 2026-06-17T19:38:58.710Z
generated_at: 2026-06-17T19:38:58.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value not stated in source; eco mode, aspect, input terminal, base model type, and sub-input enum value tables referenced but not included in this refined excerpt (see vendor Appendix \"Supplementary Information by Command\")."
  - "communication mode stated as \"Full duplex\" but flow-control method (RTS/CTS hardware vs none) not explicitly stated; serial cable pin assignment exposes RTS/CTS pins (7,8)"
  - "source describes no unsolicited notifications / push events. All"
  - "source documents no named multi-step macro sequences."
  - "source contains no explicit safety warnings, power-sequencing"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:38:58.710Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source opcodes exactly; transport parameters verified; complete one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C981Q Avt2 Control Spec

## Summary
Sharp/NEC C981Q Avt2 projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control. Binary framed protocol with hex-byte commands and checksums; ~53 enumerated command opcodes spanning power, mute, input switching, picture/volume/aspect adjust, lens control and memory, status queries, and LAN/PIP/edge-blend configuration.

<!-- UNRESOLVED: model code (ID2) value not stated in source; eco mode, aspect, input terminal, base model type, and sub-input enum value tables referenced but not included in this refined excerpt (see vendor Appendix "Supplementary Information by Command"). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps as valid options
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: communication mode stated as "Full duplex" but flow-control method (RTS/CTS hardware vs none) not explicitly stated; serial cable pin assignment exposes RTS/CTS pins (7,8)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable    # inferred: many * REQUEST commands returning state (009, 037, 037-3/4/6, 053-1/5/7/11, 060-1, 078-*, 084, 097-*, 305-*)
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
  - routable     # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
# Command frame format (page 9): header (02h/03h/00h/01h for set, 20h for request)
# followed by ID1 (control ID) + ID2 (model code) + LEN + DATA bytes + CKS checksum.
# CKS = low-order one byte of the sum of all preceding bytes (page 10).
# For commands below, the literal fixed bytes shown are copied verbatim from the source;
# ID1/ID2 are substituted at runtime from the projector's configured control ID + model code.
# LENS CONTROL 053 DATA01 table in source only shows "06h Periphery Focus" - full axis
# list not present in this refined excerpt (UNRESOLVED).

actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns 12 bytes of error bitfield data (DATA01-DATA12). See error_information feedback."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (incl. cooling time), no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal byte (e.g. 06h = video port). Full value list: see vendor Appendix 'Supplementary Information by Command' (UNRESOLVED - not in this excerpt)."
      - name: cks
        type: integer
        description: "Checksum byte = low 8 bits of sum of all preceding bytes."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video-signal switch."

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
    notes: "Cleared by input/video-signal switch or volume adjustment."

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
    notes: "Cleared by input/video-signal switch."

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
        type: integer
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Aspect value. Full value list: see vendor Appendix 'Supplementary Information by Command' (UNRESOLVED - not in this excerpt)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment target high byte; combined with DATA02. Source documents 96h/FFh = LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: integer
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)."
      - name: data03
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage seconds (DATA01-04) and filter alarm start seconds (DATA05-08). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: data02
        type: integer
        description: "Content: 01h lamp usage seconds, 04h lamp remaining life (%)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Negative remaining-life % returned after lamp replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns kg (DATA02-05, max 99999) + mg (DATA06-09, max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). See key_code feedback for full list."
      - name: data02
        type: integer
        description: "Key code high byte (WORD type)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Source key code table includes POWER ON (02h,00h), POWER OFF (03h,00h), AUTO (05h,00h), MENU (06h,00h), UP (07h,00h), DOWN (08h,00h), RIGHT (09h,00h), LEFT (0Ah,00h), ENTER (0Bh,00h), EXIT (0Ch,00h), HELP (0Dh,00h), MAGNIFY UP (0Fh,00h), MAGNIFY DOWN (10h,00h), MUTE (13h,00h), PICTURE (29h,00h), COMPUTER1 (4Bh,00h), COMPUTER2 (4Ch,00h), VIDEO1 (4Fh,00h), S-VIDEO1 (51h,00h), VOLUME UP (84h,00h), VOLUME DOWN (85h,00h), FREEZE (8Ah,00h), ASPECT (A3h,00h), SOURCE (D7h,00h), LAMP MODE/ECO (EEh,00h)."

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
        description: "Lens axis. Source table shows 06h = Periphery Focus only; full axis list not present in this refined excerpt (UNRESOLVED - likely includes Zoom/Focus/Lens Shift H+V, not documented here)."
      - name: data02
        type: integer
        description: "Drive directive: 00h Stop, 01h drive 1s plus, 02h drive 0.5s plus, 03h drive 0.25s plus, 7Fh drive plus (continuous), 81h drive minus (continuous), FDh drive 0.25s minus, FEh drive 0.5s minus, FFh drive 1s minus."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "After 7Fh/81h (continuous), send 00h to stop. Same command can be re-issued during drive without stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Lens axis selector (same axis space as 053 LENS CONTROL)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns upper/lower bounds and current value (16-bit each) for the selected axis."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "FFh = Stop; otherwise axis selector."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h absolute, 02h relative."
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "If DATA01=FFh (Stop), mode/value bytes ignored."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns setting value: 00h OFF, 01h ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: data02
        type: integer
        description: "Setting value: 00h OFF, 01h ON."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V) - each 0=Stop, 1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h Profile 1, 01h Profile 2."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns profile number 00h Profile 1 / 01h Profile 2."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns status, upper/lower bounds, default, current value, wide/narrow adjustment widths, default-validity flag."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep-timer function (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (1-based; subtract 1 from practical), selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute + onscreen-display flags."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name NUL-terminated string (DATA01-32)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h Normal (cover opened) / 01h Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h freeze on, 02h freeze off."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h Horizontal synchronous frequency, 04h Vertical synchronous frequency."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns label string length + NUL-terminated info string."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value (Light mode / Lamp mode depending on model). Value enum: see vendor Appendix (UNRESOLVED - not in this excerpt)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name NUL-terminated (DATA01-17)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: cks
        type: integer
        description: "Checksum byte."
    notes: "Returns mode (PIP / PICTURE BY PICTURE), start position (TL/TR/BL/BR), or sub-input value."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns 00h OFF / 01h ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Eco mode value (Light mode / Lamp mode depending on model). Value enum: see vendor Appendix (UNRESOLVED - not in this excerpt)."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: "Projector name byte 1 (up to 16 bytes total)."
      - name: data02
        type: integer
        description: "Projector name byte 2."
      - name: data03
        type: integer
        description: "Projector name byte 3."
      - name: data04
        type: integer
        description: "Projector name byte 4."
      - name: data05
        type: integer
        description: "Projector name byte 5."
      - name: data06
        type: integer
        description: "Projector name byte 6."
      - name: data07
        type: integer
        description: "Projector name byte 7."
      - name: data08
        type: integer
        description: "Projector name byte 8."
      - name: data09
        type: integer
        description: "Projector name byte 9."
      - name: data10
        type: integer
        description: "Projector name byte 10."
      - name: data11
        type: integer
        description: "Projector name byte 11."
      - name: data12
        type: integer
        description: "Projector name byte 12."
      - name: data13
        type: integer
        description: "Projector name byte 13."
      - name: data14
        type: integer
        description: "Projector name byte 14."
      - name: data15
        type: integer
        description: "Projector name byte 15."
      - name: data16
        type: integer
        description: "Projector name byte 16."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: data02
        type: integer
        description: "Setting value (mode-dependent): MODE 00h PIP / 01h PBP; START POSITION 00h TL / 01h TR / 02h BL / 03h BR; sub-input value otherwise."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h OFF, 01h ON."
      - name: cks
        type: integer
        description: "Checksum byte."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) + model name NUL string (DATA03-11)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number NUL-terminated string (DATA01-16)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Input terminal. Full value list: see vendor Appendix 'Supplementary Information by Command' (UNRESOLVED - not in this excerpt)."
      - name: data02
        type: integer
        description: "Setting value: 00h the terminal specified in DATA01, 01h BNC, 02h COMPUTER."
      - name: cks
        type: integer
        description: "Checksum byte."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA06 + 305-3 BASIC INFORMATION REQUEST DATA01"

  - id: error_information
    type: bitfield
    description: "12-byte error status returned by 009 ERROR STATUS REQUEST. Documented bit meanings: cover error, fan error, temperature error (bi-metallic + sensor + dust), power error, lamp off / replacement moratorium / usage exceeded / data error / not present (lamp 1 and lamp 2), formatter error, FPGA error, mirror cover error, iris calibration error, lens not installed, ballast comm error, foreign-matter sensor, interlock switch open, portrait cover side up, system errors (slave CPU + formatter)."

  - id: mute_state
    type: object
    fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
    source: "078-4 MUTE STATUS REQUEST"

  - id: cover_state
    type: enum
    values: [normal_opened, closed]
    source: "078-6 COVER STATUS REQUEST"

  - id: lens_motion
    type: bitfield
    description: "Bit per lens axis (memory/zoom/focus/lens-shift-H/lens-shift-V) indicating stop vs during-operation. Source: 053-7 LENS INFORMATION REQUEST."

  - id: key_code
    type: enum
    values: [POWER_ON, POWER_OFF, AUTO, MENU, UP, DOWN, RIGHT, LEFT, ENTER, EXIT, HELP, MAGNIFY_UP, MAGNIFY_DOWN, MUTE, PICTURE, COMPUTER1, COMPUTER2, VIDEO1, S_VIDEO1, VOLUME_UP, VOLUME_DOWN, FREEZE, ASPECT, SOURCE, LAMP_MODE_ECO]
    source: "050 REMOTE KEY CODE table"

  - id: response_result
    type: enum
    values: [success, error]
    description: "Per-command success response uses 2xh/A-prefix ack byte (22h/23h/20h/21h); error response uses Axh-prefix (A2h/A3h/A0h/A1h) with ERR1+ERR2 codes."

  - id: error_code
    type: enum
    description: "ERR1/ERR2 combinations per source §2.4: 00h/00h unrecognized command; 00h/01h not supported by model; 01h/00h invalid value; 01h/01h invalid input terminal; 01h/02h invalid language; 02h/00h memory allocation error; 02h/02h memory in use; 02h/03h value cannot be set; 02h/04h forced onscreen mute on; 02h/06h viewer error; 02h/07h no signal; 02h/08h test pattern or filter displayed; 02h/09h no PC card inserted; 02h/0Ah memory operation error; 02h/0Ch entry list displayed; 02h/0Dh power off (command not accepted); 02h/0Eh execution failed; 02h/0Fh no authority; 03h/00h incorrect gain number; 03h/01h invalid gain; 03h/02h adjustment failed."
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: "Sound volume. Read via 060-1 (DATA01=05h), set via 030-2 VOLUME ADJUST. Range returned by 060-1."
  - id: brightness
    type: integer
    description: "Picture brightness. Read/set via 060-1 / 030-1 (DATA01=00h)."
  - id: contrast
    type: integer
    description: "Picture contrast. Read/set via 060-1 / 030-1 (DATA01=01h)."
  - id: color
    type: integer
    description: "Picture color. Read/set via 060-1 / 030-1 (DATA01=02h)."
  - id: hue
    type: integer
    description: "Picture hue. Read/set via 060-1 / 030-1 (DATA01=03h)."
  - id: sharpness
    type: integer
    description: "Picture sharpness. Read/set via 060-1 / 030-1 (DATA01=04h)."
  - id: lamp_light_adjust
    type: integer
    description: "Lamp/Light adjust. Read/set via 060-1 / 030-15 (DATA01=96h)."
  - id: eco_mode
    type: integer
    description: "Eco / Light / Lamp mode. Read via 097-8, set via 098-8. Value enum: UNRESOLVED - see vendor Appendix."
  - id: projector_name
    type: string
    description: "LAN projector name (up to 16 bytes). Read via 097-45, set via 098-45."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "Read via 097-243-1, set via 098-243-1."
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Reference lens memory profile. Read via 053-11, set via 053-10."
  - id: pip_pbp_mode
    type: enum
    values: [pip, picture_by_picture]
    description: "Read/set via 097-198 / 098-198 (DATA01=00h MODE)."
  - id: pip_pbp_start_position
    type: enum
    values: [top_left, top_right, bottom_left, bottom_right]
    description: "Read/set via 097-198 / 098-198 (DATA01=01h START POSITION)."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events. All
# data is returned as a synchronous response to a request command.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: "While POWER ON command is turning on power, no other command can be accepted. (source §3.2)"
  - id: power_off_lockout
    description: "While POWER OFF command is turning off power (including cooling time), no other command can be accepted. (source §3.3)"
  - id: forced_onscreen_mute
    description: "ERR 02h/04h indicates forced onscreen mute active - certain commands may be blocked while this state persists."
# UNRESOLVED: source contains no explicit safety warnings, power-sequencing
# requirements, or interlock procedures beyond the two power-command lockouts
# above. Voltage / current / power specs not present in this refined excerpt.
```

## Notes
- **Protocol framing:** Commands use 6–N byte hex frames. First byte indicates direction + command class: `02h`/`03h`/`01h` = host→projector (set/action), `00h` = host→projector (request), `22h`/`23h`/`21h`/`20h` = projector→host success ack, `A2h`/`A3h`/`A1h`/`A0h` = projector→host error ack. Bytes 2–3 carry the command opcode (e.g. `00h 00h` = POWER ON). ID1 (control ID) + ID2 (model code) are inserted by the projector in responses; commands omit them. Final byte is always the checksum.
- **Checksum:** `CKS = sum(all preceding bytes) mod 256`. Worked source example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- **Baud rate is configurable:** Source lists 115200 / 38400 / 19200 / 9600 / 4800 bps as valid. Default value not stated in source (UNRESOLVED); spec records 115200 as the first/highest listed option.
- **TCP port:** 7142 (stated verbatim, page §1.2 Port number).
- **Wireless LAN:** Specified as supported via attachable wireless-LAN unit; physical details deferred to that unit's operation manual.
- **Lamp usage / filter usage / carbon savings** counters update at one-minute intervals even though the unit is one second.
- **Signal list number** returned by 078-3 is `(practical_number - 1)`.

<!-- UNRESOLVED: -->
<!-- - Firmware version compatibility range not stated in source. -->
<!-- - Default baud rate not stated (only the valid-options list). -->
<!-- - ID2 model code value for C981Q Avt2 not stated in source. -->
<!-- - Full axis list for 053 LENS CONTROL DATA01 (only "06h Periphery Focus" shown; Zoom/Focus/Lens-Shift axes presumed but undocumented in this excerpt). -->
<!-- - Enum tables referenced but absent from this refined excerpt: input terminal values (018, 319-10), aspect values (030-12), eco mode values (097-8/098-8), sub-input setting values (097-198/098-198), base model type values (078-1/305-1), selection-signal-type appendix. These live in the vendor Appendix "Supplementary Information by Command" which was not included in the refined source document. -->
<!-- - Voltage, current, power specifications not present in source. -->
<!-- - Power-on/off sequencing recommendations beyond the lockout interlocks not stated. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:12:28.463Z
last_checked_at: 2026-06-17T19:38:58.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:38:58.710Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source opcodes exactly; transport parameters verified; complete one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value not stated in source; eco mode, aspect, input terminal, base model type, and sub-input enum value tables referenced but not included in this refined excerpt (see vendor Appendix \"Supplementary Information by Command\")."
- "communication mode stated as \"Full duplex\" but flow-control method (RTS/CTS hardware vs none) not explicitly stated; serial cable pin assignment exposes RTS/CTS pins (7,8)"
- "source describes no unsolicited notifications / push events. All"
- "source documents no named multi-step macro sequences."
- "source contains no explicit safety warnings, power-sequencing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
