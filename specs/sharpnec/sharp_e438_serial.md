---
spec_id: admin/sharp-nec-e438
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E438 Projector Control Spec"
manufacturer: Sharp/NEC
model_family: E438
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E438
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:33:49.611Z
last_checked_at: 2026-06-17T19:43:25.270Z
generated_at: 2026-06-17T19:43:25.270Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "specific input terminal values referenced as appendix \"Supplementary Information by Command\" not present in this excerpt"
  - "not stated in source settings table (RTS/CTS pins are cross-connected per D-SUB 9P pinout)"
  - "full response schema for variable-length responses not fully enumerated here"
  - "source documents no unsolicited notifications; responses are request/reply only."
  - "source documents no multi-step macro sequences."
  - "no explicit power-on sequencing or voltage interlock procedures stated in source."
  - "appendix \"Supplementary Information by Command\" values (input terminals, eco mode values, base model types) not in extracted source"
  - "serial flow_control setting not stated (RTS/CTS wired per pinout)"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:43:25.270Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim in source with correct hex opcodes, parameters, and descriptions; transport values all verified against source sections 1-3. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E438 Projector Control Spec

## Summary
Sharp/NEC E438 is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect adjust, lens control and memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/information queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: specific input terminal values referenced as appendix "Supplementary Information by Command" not present in this excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN command send/receive
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated in source settings table (RTS/CTS pins are cross-connected per D-SUB 9P pinout)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE / AUDIO SELECT SET present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: VOLUME ADJUST / PICTURE ADJUST present
  - has_shutter  # inferred: SHUTTER CLOSE / OPEN present
```

## Actions
```yaml
# Notes:
#  - Command payloads are in hexadecimal notation as written in the source (e.g. "02h").
#  - <CKS> = checksum = low-order one byte of the sum of all preceding bytes.
#  - <ID1> = projector control ID; <ID2> = model code (varies by model). These are
#    framing bytes echoed by the projector in responses, not part of the request payload.
#  - Command numbering preserves the source's "NNN" command codes verbatim.
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
    notes: While turning on power, no other command is accepted.

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off (including cooling time), no other command is accepted.

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal selector (e.g. 06h = video port). Values per appendix Supplementary Information by Command."
    notes: Example for video port = "02h 03h 00h 00h 02h 01h 06h 0Eh". Response DATA01=FFh means ended with error (no signal switch).

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Turned off by input/video signal switch.

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
    notes: Turned off by input/video signal switch or volume adjustment.

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
    notes: Turned off by input/video signal switch.

  - id: cmd_025_onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness)"
      - name: DATA02
        type: byte
        description: "Adjustment mode (00h=absolute,01h=relative)"
      - name: DATA03
        type: byte
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: byte
        description: Adjustment value high-order 8 bits
    notes: Example brightness=10 = "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h".

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode (00h=absolute,01h=relative)"
      - name: DATA02
        type: byte
        description: Adjustment value low-order 8 bits
      - name: DATA03
        type: byte
        description: Adjustment value high-order 8 bits
    notes: Example volume=10 = "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value (per appendix Supplementary Information by Command)"

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target high byte (96h with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: byte
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: byte
        description: "Adjustment mode (00h=absolute,01h=relative)"
      - name: DATA04
        type: byte
        description: Adjustment value low-order 8 bits
      - name: DATA05
        type: byte
        description: Adjustment value high-order 8 bits

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Response carries projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at one-minute intervals.

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Response DATA01-04 = filter usage time (sec); DATA05-08 = filter alarm start time (sec); -1 if undefined.

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lamp select (00h=Lamp1, 01h=Lamp2 [two-lamp models only])"
      - name: DATA02
        type: byte
        description: "Content (01h=usage time seconds, 04h=remaining life %)"
    notes: Example lamp usage = "03h 96h 00h 00h 02h 00h 01h 9Ch". Negative remaining life if replacement deadline exceeded. Reflects eco mode if enabled.

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: Response DATA02-05 = kg (max 99999), DATA06-09 = mg (max 999999).

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD key code; see key code list)"
      - name: DATA02
        type: byte
        description: Key code high byte
    notes: "Example AUTO = 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh = error. Key code list: 02h00h=POWER ON,03h00h=POWER OFF,05h00h=AUTO,06h00h=MENU,07h00h=UP,08h00h=DOWN,09h00h=RIGHT,0Ah00h=LEFT,0Bh00h=ENTER,0Ch00h=EXIT,0Dh00h=HELP,0Fh00h=MAGNIFY UP,10h00h=MAGNIFY DOWN,13h00h=MUTE,29h00h=PICTURE,4Bh00h=COMPUTER1,4Ch00h=COMPUTER2,4Fh00h=VIDEO1,51h00h=S-VIDEO1,84h00h=VOLUME UP,85h00h=VOLUME DOWN,8Ah00h=FREEZE,A3h00h=ASPECT,D7h00h=SOURCE,EEh00h=LAMP MODE/ECO."

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (06h = Periphery Focus)"
      - name: DATA02
        type: byte
        description: "Motion: 00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=plus continuous,81h=minus continuous,FDh=-0.25s,FEh=-0.5s,FFh=-1s"
    notes: After 7Fh/81h, send 00h to stop. Reissuing same command during drive overrides without stop.

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Lens target selector
    notes: Response returns upper/lower limit and current value (16-bit each).

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (FFh = Stop)"
      - name: DATA02
        type: byte
        description: "Adjustment mode (00h=absolute,02h=relative)"
      - name: DATA03
        type: byte
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: byte
        description: Adjustment value high-order 8 bits
    notes: If DATA01=Stop, mode/value ignored.

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Operation (00h=MOVE,01h=STORE,02h=RESET)"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Operation (00h=MOVE,01h=STORE,02h=RESET)"
    notes: Controls profile number selected by 053-10 LENS PROFILE SET.

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)"
    notes: Response DATA02 = setting value (00h=OFF,01h=ON).

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)"
      - name: DATA02
        type: byte
        description: "Setting value (00h=OFF,01h=ON)"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Response DATA01 bitfield: Bit0=Lens memory,Bit1=Zoom,Bit2=Focus,Bit3=Lens Shift(H),Bit4=Lens Shift(V) (0=Stop,1=During operation).

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number (00h=Profile1,01h=Profile2)"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: Response DATA01 = selected profile (00h=Profile1,01h=Profile2).

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name (00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST)"
    notes: Example brightness = "03h 05h 00h 00h 03h 00h 00h 00h 0Bh". Response returns status, range limits, default, current, wide/narrow adjustment width.

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Response DATA01-03=base model type,DATA04=sound function,DATA05=profile number.

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Response DATA03=power status(00h=Standby,01h=PowerOn),DATA04=cooling,DATA05=power process,DATA06=operation status.

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Response DATA02=signal list number (practical = returned+1),DATA03/04=selection signal type,DATA05=list type,DATA06=test pattern,DATA09=content displayed.

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Response DATA01=picture mute,DATA02=sound mute,DATA03=onscreen mute,DATA04=forced onscreen mute,DATA05=onscreen display.

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: Response DATA01 = 00h normal(cover opened), 01h cover closed.

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Information type (03h=horizontal sync freq,04h=vertical sync freq)"
    notes: Response DATA02=length, DATA03..=NUL-terminated label string.

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns Light mode or Lamp mode depending on model. Values per appendix.

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: cmd_097_155_lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: Response DATA01-06 = MAC address.

  - id: cmd_097_198_pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3)"
    notes: Response DATA02 = setting value depending on target.

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: Response DATA01 = 00h OFF, 01h ON.

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Eco mode value (per appendix Supplementary Information by Command)

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name_bytes
        type: bytes
        description: Projector name DATA01-16 (up to 16 bytes)

  - id: cmd_098_198_pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Target (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3)"
      - name: DATA02
        type: byte
        description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR)"

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Setting value (00h=OFF,01h=ON)"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: Response DATA01-02 = base model type, DATA03-11 = model name, DATA12-13 = base model type.

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: Response DATA01=operation status,DATA02=content displayed,DATA03-04=signal type,DATA05=display signal type,DATA06=video mute,DATA07=sound mute,DATA08=onscreen mute,DATA09=freeze status.

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Input terminal (per appendix)
      - name: DATA02
        type: byte
        description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: Error status bits from 009. ERROR STATUS REQUEST (DATA01-12); 0=normal,1=error. Covers cover/fan/temperature/power/lamp/interlock errors.
  - id: power_state
    type: enum
    values: [standby, power_on]
    description: From 078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby,01h=Power on).
  - id: mute_state
    type: enum
    values: [off, on]
    description: Picture/sound/onscreen mute from 078-4 MUTE STATUS REQUEST.
  - id: cover_state
    type: enum
    values: [opened, closed]
    description: From 078-6 COVER STATUS REQUEST (00h=normal/opened,01h=closed).
  - id: lens_operation
    type: bitmask
    description: Lens drive state from 053-7 (memory/zoom/focus/shift H/V stop vs operating).
# UNRESOLVED: full response schema for variable-length responses not fully enumerated here
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: Sound volume, set via 030-2, query via 060-1 (DATA01=05h).
  - id: brightness
    type: integer
    description: Picture brightness, set via 030-1, query via 060-1 (DATA01=00h).
  - id: contrast
    type: integer
    description: Set via 030-1, query via 060-1 (DATA01=01h).
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: Lamp usage seconds from 037 / 037-4.
  - id: filter_usage_time
    type: integer
    unit: seconds
    description: Filter usage seconds from 037-3.
  - id: eco_mode
    type: byte
    description: Eco/Light/Lamp mode value (set 098-8, query 097-8); value map per appendix.
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: Set 098-243-1, query 097-243-1.
  - id: projector_name
    type: string
    description: LAN projector name (set 098-45, query 097-45), up to 16 bytes.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; responses are request/reply only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # cooling time blocks all other commands
  - shutter_close
interlocks:
  - "POWER ON/OFF commands block acceptance of all other commands during the on/off process (incl. cooling)."
  - "Picture/Sound/Onscreen mute are automatically turned off by input terminal or video signal switch."
# UNRESOLVED: no explicit power-on sequencing or voltage interlock procedures stated in source.
```

## Notes
- Command/response framing: responses prefixed with model/ID framing (`<ID1> <ID2>`), data length (LEN), and a trailing checksum (`<CKS>`). Error responses carry `<ERR1> <ERR2>` per the error code list (2.4).
- Checksum = low-order one byte of the sum of all preceding bytes (example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`).
- Serial cable is a cross cable; D-SUB 9P pinout cross-connects RxD/TxD and RTS/CTS.
- Usage times returned in one-second units but updated at one-minute intervals.
- Input terminal and several enum value maps are deferred to an appendix ("Supplementary Information by Command") not present in this excerpt.
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values (input terminals, eco mode values, base model types) not in extracted source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: serial flow_control setting not stated (RTS/CTS wired per pinout) -->

---

Spec emitted: 53 actions, serial+TCP, draft/low. Appended to drafts + run ingest when ready.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:33:49.611Z
last_checked_at: 2026-06-17T19:43:25.270Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:43:25.270Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim in source with correct hex opcodes, parameters, and descriptions; transport values all verified against source sections 1-3. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "specific input terminal values referenced as appendix \"Supplementary Information by Command\" not present in this excerpt"
- "not stated in source settings table (RTS/CTS pins are cross-connected per D-SUB 9P pinout)"
- "full response schema for variable-length responses not fully enumerated here"
- "source documents no unsolicited notifications; responses are request/reply only."
- "source documents no multi-step macro sequences."
- "no explicit power-on sequencing or voltage interlock procedures stated in source."
- "appendix \"Supplementary Information by Command\" values (input terminals, eco mode values, base model types) not in extracted source"
- "serial flow_control setting not stated (RTS/CTS wired per pinout)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
