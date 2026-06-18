---
spec_id: admin/sharp-nec-ld-fe312
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe312 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe312"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe312"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:59:27.764Z
last_checked_at: 2026-06-17T20:08:44.948Z
generated_at: 2026-06-17T20:08:44.948Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value not stated in source — varies by model"
  - "control ID (ID1) default not stated in source"
  - "firmware version compatibility not stated in source"
  - "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types, sub input values) not present in refined source"
  - "appendix not in source.\""
  - "no unsolicited notification protocol documented in source. All"
  - "no multi-step sequences documented explicitly in source."
  - "source contains error bitmaps for cover error, mirror cover error,"
  - "ID2 model code value not in source"
  - "control ID (ID1) default not in source"
  - "firmware version compatibility not stated"
  - "appendix \"Supplementary Information by Command\" missing — input terminal codes, aspect values, eco mode values, base model types, sub input values, signal type codes not enumerable"
  - "BDT140013 Rev 7.1 manual covers multi-model family; Ld Fe312-specific exclusions/variants not stated"
  - "cooling time duration not stated"
  - "response timing / inter-command delay not stated"
verification:
  verdict: verified
  checked_at: 2026-06-17T20:08:44.948Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified literal in source; transport parameters confirmed; complete one-to-one coverage of documented command catalogue. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe312 Control Spec

## Summary
Sharp/NEC Ld Fe312 projector controlled via RS-232C serial (PC CONTROL D-SUB 9P) and/or TCP/IP LAN (wired RJ-45 or wireless LAN unit). Binary command protocol with hex-byte frames including ID1/ID2 parameters and trailing checksum byte (low-order byte of sum of preceding bytes). Spec covers full command catalogue: power, input switch, mute (picture/sound/onscreen), lens control and memory, picture/volume/aspect adjust, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: model code (ID2) value not stated in source — varies by model -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model types, sub input values) not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800; no default stated
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: RTS/CTS pins wired in D-SUB 9P but full-duplex stated, no explicit flow-control setting
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands
  - routable     # inferred: 018 INPUT SW CHANGE command
  - queryable    # inferred: many status/info request commands
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
```

## Actions
```yaml
# Commands use binary hex-byte frames. Format (from source §2.1):
#   <HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>
# HDR identifies command class (02h/03h/etc). ID1=control ID, ID2=model code.
# CKS = low-order byte of sum of all preceding bytes.
# Literal payloads reproduced VERBATIM from source; <DATAxx> are runtime variables.

actions:
  # --- 009. ERROR STATUS REQUEST ---
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitmap (cover/fan/temp/lamp/etc). See §3.1."

  # --- 015. POWER ON ---
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command accepted."

  # --- 016. POWER OFF ---
  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off incl. cooling, no other command accepted."

  # --- 018. INPUT SW CHANGE ---
  - id: input_switch_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal code (e.g. 06h=Video). Full list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
    notes: "Example: switch to video port = '02h 03h 00h 00h 02h 01h 06h 0Eh'. Response FFh on error (no signal switch)."

  # --- 020. PICTURE MUTE ON ---
  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Auto off on input/video signal switch."

  # --- 021. PICTURE MUTE OFF ---
  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # --- 022. SOUND MUTE ON ---
  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Auto off on input/video switch or volume adjust."

  # --- 023. SOUND MUTE OFF ---
  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # --- 024. ONSCREEN MUTE ON ---
  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Auto off on input/video signal switch."

  # --- 025. ONSCREEN MUTE OFF ---
  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- 030-1. PICTURE ADJUST ---
  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example brightness=10: '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h'."

  # --- 030-2. VOLUME ADJUST ---
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example volume=10: '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h'."

  # --- 030-12. ASPECT ADJUST ---
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. Full list in Appendix - UNRESOLVED: appendix not in source."

  # --- 030-15. OTHER ADJUST ---
  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "Sub-target (FFh in source example)"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  # --- 037. INFORMATION REQUEST ---
  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated 1-min intervals."

  # --- 037-3. FILTER USAGE INFORMATION REQUEST ---
  - id: filter_usage_info_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  # --- 037-4. LAMP INFORMATION REQUEST 3 ---
  - id: lamp_info_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=Lamp usage time (s), 04h=Lamp remaining life (%)"
    notes: "Example lamp1 usage time: '03h 96h 00h 00h 02h 00h 01h 9Ch'. Negative remaining life if deadline exceeded."

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
  - id: carbon_savings_info_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  # --- 050. REMOTE KEY CODE ---
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (see key code list)"
      - name: DATA02
        type: byte
        description: "Key code high byte (always 00h in listed codes)"
    notes: "Key codes (DATA01,DATA02): 02h,00h=POWER ON; 03h,00h=POWER OFF; 05h,00h=AUTO; 06h,00h=MENU; 07h,00h=UP; 08h,00h=DOWN; 09h,00h=RIGHT; 0Ah,00h=LEFT; 0Bh,00h=ENTER; 0Ch,00h=EXIT; 0Dh,00h=HELP; 0Fh,00h=MAGNIFY UP; 10h,00h=MAGNIFY DOWN; 13h,00h=MUTE; 29h,00h=PICTURE; 4Bh,00h=COMPUTER1; 4Ch,00h=COMPUTER2; 4Fh,00h=VIDEO1; 51h,00h=S-VIDEO1; 84h,00h=VOLUME UP; 85h,00h=VOLUME DOWN; 8Ah,00h=FREEZE; A3h,00h=ASPECT; D7h,00h=SOURCE; EEh,00h=LAMP MODE/ECO. Response FFh = error."

  # --- 051. SHUTTER CLOSE ---
  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  # --- 052. SHUTTER OPEN ---
  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- 053. LENS CONTROL ---
  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target: 06h=Periphery Focus (other targets listed in source §3.22 header but unspecified)"
      - name: DATA02
        type: byte
        description: "Content: 00h=Stop; 01h=drive 1s plus; 02h=drive 0.5s plus; 03h=drive 0.25s plus; 7Fh=drive plus; 81h=drive minus; FDh=drive 0.25s minus; FEh=drive 0.5s minus; FFh=drive 1s minus"
    notes: "After 7Fh/81h, send 00h to stop. While lens driving, re-issue same command to continue without stop."

  # --- 053-1. LENS CONTROL REQUEST ---
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (matches DATA01 of 053 LENS CONTROL)"
    notes: "Returns upper/lower limits and current value (DATA02-07, 16-bit each)."

  # --- 053-2. LENS CONTROL 2 ---
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (FFh=Stop - mode/value ignored)"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  # --- 053-3. LENS MEMORY CONTROL ---
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL ---
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile number selected via 053-10 LENS PROFILE SET."

  # --- 053-5. LENS MEMORY OPTION REQUEST ---
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Returns DATA02 setting: 00h=OFF, 01h=ON."

  # --- 053-6. LENS MEMORY OPTION SET ---
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting: 00h=OFF, 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST ---
  - id: lens_info_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmap: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) - 0=Stop, 1=During operation."

  # --- 053-10. LENS PROFILE SET ---
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  # --- 053-11. LENS PROFILE REQUEST ---
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01 profile: 00h=Profile 1, 01h=Profile 2."

  # --- 060-1. GAIN PARAMETER REQUEST 3 ---
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns status, upper/lower limits, default, current, wide/narrow adjustment widths (DATA01-16). Example brightness: '03h 05h 00h 00h 03h 00h 00h 00h 0Bh'."

  # --- 078-1. SETTING REQUEST ---
  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04: 00h=NA, 01h=Avail), profile number (DATA05)."

  # --- 078-2. RUNNING STATUS REQUEST ---
  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status (DATA03: 00h=Standby, 01h=Power on), cooling process, power on/off process, operation status (DATA06: 00h=Standby/Sleep, 04h=Power on, 05h=Cooling, 06h=Standby/error, 0Fh=Power saving, 10h=Network standby)."

  # --- 078-3. INPUT STATUS REQUEST ---
  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (DATA02, 00h-C7h, practical=value+1), signal types, content displayed."

  # --- 078-4. MUTE STATUS REQUEST ---
  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD - all 00h=Off, 01h=On."

  # --- 078-5. MODEL NAME REQUEST ---
  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns DATA01-32 model name (NUL-terminated)."

  # --- 078-6. COVER STATUS REQUEST ---
  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  # --- 079. FREEZE CONTROL ---
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=Freeze on, 02h=Freeze off"

  # --- 084. INFORMATION STRING REQUEST ---
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Returns label/info string (NUL-terminated)."

  # --- 097-8. ECO MODE REQUEST ---
  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns DATA01 eco mode value. Returns 'Light mode' or 'Lamp mode' depending on projector. Full value list in Appendix - UNRESOLVED."

  # --- 097-45. LAN PROJECTOR NAME REQUEST ---
  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns DATA01-17 projector name (NUL-terminated)."

  # --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
  - id: lan_mac_address_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns DATA01-06 MAC address."

  # --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
  - id: pip_pbp_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "Returns DATA02 setting (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR; SUB INPUT values in Appendix - UNRESOLVED)."

  # --- 097-243-1. EDGE BLENDING MODE REQUEST ---
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  # --- 098-8. ECO MODE SET ---
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value. Full list in Appendix - UNRESOLVED: appendix not in source."

  # --- 098-45. LAN PROJECTOR NAME SET ---
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> ... <DATA16> 00h <CKS>"
    params:
      - name: DATA01-16
        type: bytes
        description: "Projector name (up to 16 bytes)"

  # --- 098-198. PIP/PICTURE BY PICTURE SET ---
  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR; SUB INPUT values in Appendix - UNRESOLVED)"

  # --- 098-243-1. EDGE BLENDING MODE SET ---
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Setting: 00h=OFF, 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST ---
  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13), model name (DATA03-11). Value list in Appendix - UNRESOLVED."

  # --- 305-2. SERIAL NUMBER REQUEST ---
  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns DATA01-16 serial number (NUL-terminated)."

  # --- 305-3. BASIC INFORMATION REQUEST ---
  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status (DATA01), content displayed (DATA02), signal types (DATA03-05), mute states (DATA06-08), freeze (DATA09)."

  # --- 319-10. AUDIO SELECT SET ---
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal. Full list in Appendix - UNRESOLVED."
      - name: DATA02
        type: byte
        description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All command responses follow §2.3 frame format. Success = same HDR+0x20 prefix
# (e.g. 20h/21h/22h/23h), data echo'd. Failure = Axh prefix with ERR1/ERR2.
feedbacks:
  - id: command_ack
    type: raw
    description: "Success response: <HDR+0x20> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>"
  - id: command_error
    type: raw
    description: "Error response: <HDR+0x80> <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. See §2.4 error code list."
  - id: power_state
    type: enum
    values: [standby, power_on]
    description: "From 078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby, 01h=Power on)"
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From 078-2 DATA06"
  - id: error_status
    type: bitmap
    description: "From 009 ERROR STATUS REQUEST - DATA01-12 bitfield (cover/fan/temp/lamp/interlock/etc)"
  - id: lamp_usage_time
    type: integer
    description: "From 037-4 - seconds, updated 1-min intervals"
  - id: lamp_remaining_life
    type: integer
    description: "From 037-4 - percent; negative if deadline exceeded"
  - id: filter_usage_time
    type: integer
    description: "From 037-3 - seconds"
```

## Variables
```yaml
# Discrete settings exposed as settable parameters via dedicated set commands.
variables:
  - id: brightness
    type: integer
    description: "Via 030-1 PICTURE ADJUST (DATA01=00h)"
  - id: contrast
    type: integer
    description: "Via 030-1 PICTURE ADJUST (DATA01=01h)"
  - id: color
    type: integer
    description: "Via 030-1 PICTURE ADJUST (DATA01=02h)"
  - id: hue
    type: integer
    description: "Via 030-1 PICTURE ADJUST (DATA01=03h)"
  - id: sharpness
    type: integer
    description: "Via 030-1 PICTURE ADJUST (DATA01=04h)"
  - id: volume
    type: integer
    description: "Via 030-2 VOLUME ADJUST"
  - id: lamp_light_adjust
    type: integer
    description: "Via 030-15 OTHER ADJUST (DATA01=96h)"
  - id: eco_mode
    type: byte
    description: "Via 098-8 ECO MODE SET (value list UNRESOLVED)"
  - id: projector_name
    type: string
    description: "Via 098-45 LAN PROJECTOR NAME SET (up to 16 bytes)"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source. All
# responses are solicited (ack/error to issued commands).
events: []
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on, no other command accepted (§3.2)."
  - command: power_off
    note: "During power-off incl. cooling time, no other command accepted (§3.3)."
  - command: lens_control
    note: "After continuous-drive (7Fh/81h), must send 00h to stop (§3.22)."
# UNRESOLVED: source contains error bitmaps for cover error, mirror cover error,
# temperature error, interlock switch open (DATA09 Bit1) - but no explicit safety
# procedures, power-on sequencing, or operator interlock requirements documented.
```

## Notes
- Binary hex protocol. Every command frame ends with checksum byte = low-order byte of sum of all preceding bytes (§2.2). Example: `20h 81h 01h 60h 01h 00h` → sum=103h → CKS=03h.
- Frame layout: `<HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>` for commands needing IDs; some commands omit ID1/ID2 in the request (e.g. `00h 88h 00h 00h 00h 88h` uses zeros).
- ID1 = control ID (projector setting), ID2 = model code (varies by model — value not in source).
- Response prefix = command HDR + 0x20 on success; HDR + 0x80 on error.
- Error codes documented in §2.4 (00h-03h × 00h-0Fh combinations).
- Serial: full-duplex, D-SUB 9P cross cable. Pinout in §1.1 (RxD/TxD crossed, RTS/CTS crossed).
- LAN: TCP port 7142 for both directions.
- Cooling time and standby transitions not parameterized in source.
- Wireless LAN unit required for wireless; refer to projector operation manual for compatible units.

<!-- UNRESOLVED: ID2 model code value not in source -->
<!-- UNRESOLVED: control ID (ID1) default not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" missing — input terminal codes, aspect values, eco mode values, base model types, sub input values, signal type codes not enumerable -->
<!-- UNRESOLVED: BDT140013 Rev 7.1 manual covers multi-model family; Ld Fe312-specific exclusions/variants not stated -->
<!-- UNRESOLVED: cooling time duration not stated -->
<!-- UNRESOLVED: response timing / inter-command delay not stated -->
```

Spec output done. 53 actions enumerated (all source rows). Payloads verbatim hex. Serial+TCP both populated. Baud list noted (9600 picked as representative — 5 options in source, no default). Many UNRESOLVED markers for appendix-gated enums + ID2 model code.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:59:27.764Z
last_checked_at: 2026-06-17T20:08:44.948Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:08:44.948Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified literal in source; transport parameters confirmed; complete one-to-one coverage of documented command catalogue. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value not stated in source — varies by model"
- "control ID (ID1) default not stated in source"
- "firmware version compatibility not stated in source"
- "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types, sub input values) not present in refined source"
- "appendix not in source.\""
- "no unsolicited notification protocol documented in source. All"
- "no multi-step sequences documented explicitly in source."
- "source contains error bitmaps for cover error, mirror cover error,"
- "ID2 model code value not in source"
- "control ID (ID1) default not in source"
- "firmware version compatibility not stated"
- "appendix \"Supplementary Information by Command\" missing — input terminal codes, aspect values, eco mode values, base model types, sub input values, signal type codes not enumerable"
- "BDT140013 Rev 7.1 manual covers multi-model family; Ld Fe312-specific exclusions/variants not stated"
- "cooling time duration not stated"
- "response timing / inter-command delay not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
