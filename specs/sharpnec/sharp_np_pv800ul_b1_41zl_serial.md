---
spec_id: admin/sharpnec-np-pv800ul-b1-41zl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PV800UL-B1 Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PV800UL-B1
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PV800UL-B1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:04:29.598Z
last_checked_at: 2026-06-18T08:51:17.833Z
generated_at: 2026-06-18T08:51:17.833Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic command reference manual; literal \"NP-PV800UL-B1\" model string taken from device-name input, not from source body. Lamp unit 41ZL from device-name input."
  - "RTS/CTS pins present (pins 7/8) but flow-control mode not stated"
  - "absolute range not stated; query 060-1 DATA01=05h for bounds"
  - "query 060-1 DATA01=00h for bounds"
  - "query 053-1 per axis"
  - "source describes no unsolicited notifications; all responses are solicited."
  - "no multi-step sequences documented in source."
  - "source contains no explicit interlock procedure or power-on sequencing requirement;"
  - "firmware version compatibility not stated in source."
  - "default baud rate not stated (one of 4800/9600/19200/38400/115200)."
  - "ID1 (control ID) and ID2 (model code) default values not stated."
  - "flow_control mode not stated (RTS/CTS pins present on D-SUB 9P)."
  - "Appendix \"Supplementary Information by Command\" referenced for input-terminal values, aspect values, eco-mode values, sub-input values, base-model-type values — not included in this refined source."
  - "variable value ranges (volume/picture gains) not stated; must query 060-1 per name at runtime."
  - "voltage/current/power specs not in this control-protocol document."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:51:17.833Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PV800UL-B1 Control Spec

## Summary
Sharp/NEC NP-PV800UL-B1 laser projector (lamp unit 41ZL), controlled via RS-232C serial (D-SUB 9P PC CONTROL port) or wired/wireless LAN (TCP port 7142). Binary hex-framed protocol: commands prefixed `02h/03h`, responses `22h/23h`, request commands `00h` with responses `20h`, errors `A0h/A1h/A2h/A3h` with ERR1/ERR2 codes. Spec covers all 53 commands in the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: source is a generic command reference manual; literal "NP-PV800UL-B1" model string taken from device-name input, not from source body. Lamp unit 41ZL from device-name input. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: "115200/38400/19200/9600/4800 bps"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present (pins 7/8) but flow-control mode not stated
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable    # inferred: many REQUEST commands returning state
  - routable     # inferred: 018 INPUT SW CHANGE, 319 AUDIO SELECT SET
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
  - mutable      # inferred: 020/021/022/023/024/025 picture/sound/onscreen mute + 051/052 shutter
```

## Actions
```yaml
# Frame legend (from source §2.1/2.2):
#   Command bytes shown verbatim; <ID1>=control ID, <ID2>=model code, <CKS>=checksum.
#   Checksum = low-order byte of sum of all preceding bytes (incl. any DATA).
#   Request commands (00h-prefixed) -> 20h-prefixed response with data.
#   Set/adjust commands (02h/03h-prefixed) -> 22h/23h ack, A2h/A3h on error.
#   Error response carries <ERR1> <ERR2>; see §2.4 error-code list (Feedbacks below).

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
    notes: "While turning on, no other command accepted."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off incl. cooling time, no other command accepted."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (see Appendix 'Supplementary Information by Command'). Example 06h = video port."
    notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

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
        type: integer
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example brightness=+10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h; brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (see Appendix 'Supplementary Information by Command')"

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte: 96h (LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Adjustment target low byte: FFh"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Source table: DATA01/02 = 96h/FFh => LAMP ADJUST / LIGHT ADJUST."

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response DATA01-49 projector name, DATA83-86 lamp usage time (sec), DATA87-90 filter usage time (sec). Updated at 1-minute intervals."

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response DATA01-04 filter usage time (sec), DATA05-08 filter alarm start time (sec). -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h Lamp1, 01h Lamp2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h usage time (sec), 04h remaining life (%)"
    notes: "Example lamp1 usage: 03h 96h 00h 00h 02h 00h 01h 9Ch. Eco mode reflects in values. Negative remaining-life if past replacement deadline."

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
    notes: "Response DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see key-code list)"
      - name: DATA02
        type: integer
        description: "Key code high byte (WORD type)"
    notes: "Key code list (DATA01/02): POWER ON 02h/00h, POWER OFF 03h/00h, AUTO 05h/00h, MENU 06h/00h, UP 07h/00h, DOWN 08h/00h, RIGHT 09h/00h, LEFT 0Ah/00h, ENTER 0Bh/00h, EXIT 0Ch/00h, HELP 0Dh/00h, MAGNIFY UP 0Fh/00h, MAGNIFY DOWN 10h/00h, MUTE 13h/00h, PICTURE 29h/00h, COMPUTER1 4Bh/00h, COMPUTER2 4Ch/00h, VIDEO1 4Fh/00h, S-VIDEO1 51h/00h, VOLUME UP 84h/00h, VOLUME DOWN 85h/00h, FREEZE 8Ah/00h, ASPECT A3h/00h, SOURCE D7h/00h, LAMP MODE/ECO EEh/00h. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
        type: integer
        description: "Lens function: 06h Periphery Focus"
      - name: DATA02
        type: integer
        description: "Content: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"
    notes: "Send 00h after 7Fh/81h to stop continuous drive. Same command may be issued while driving."

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens function (see 053 LENS CONTROL)"
    notes: "Response DATA02/03 upper limit, DATA04/05 lower limit, DATA06/07 current value."

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens function; FFh = Stop (mode/value ignored)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h absolute, 02h relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"
    notes: "Controls profile selected by 053-10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    notes: "Response DATA02 setting value: 00h OFF, 01h ON."

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h OFF, 01h ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitmap: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift(H), bit4 Lens Shift(V); 0=Stop, 1=During operation."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h Profile 1, 01h Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Response DATA01: 00h Profile 1, 01h Profile 2; DATA02 reserved."

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
    notes: "Example brightness query: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response DATA01 status (00h display N/A, 01h adjust N/A, 02h adjust OK, FFh no such gain), DATA02/03 upper, DATA04/05 lower, DATA06/07 default, DATA08/09 current, DATA10/11 wide step, DATA12/13 narrow step, DATA14 default-valid flag."

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response DATA01-03 base model type, DATA04 sound function (00h N/A, 01h available), DATA05 profile (00h N/A, 01h Clock, 02h Sleep timer, 03h Clock+Sleep)."

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response DATA03 power (00h Standby, 01h Power on, FFh N/A), DATA04 cooling, DATA05 power on/off process, DATA06 operation status (00h Standby/Sleep, 04h Power on, 05h Cooling, 06h Standby/error, 0Fh Power saving, 10h Network standby)."

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Response DATA01 signal-switch process, DATA02 signal list number (practical = value+1), DATA03 selection signal type 1, DATA04 type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER(1-5), 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER(6-10)), DATA05 list type, DATA06 test pattern, DATA09 content displayed."

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h Off/Not displayed, 01h On/Displayed)."

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Response DATA01-32 model name (NUL-terminated)."

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Response DATA01: 00h Normal (cover opened), 01h Cover closed."

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h freeze on, 02h freeze off"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency"
    notes: "Response DATA01 type, DATA02 string length, DATA03.. string (NUL-terminated)."

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Response DATA01 eco-mode value (see Appendix). Returns Light mode or Lamp mode depending on projector."

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Response DATA01-17 projector name (NUL-terminated)."

  - id: cmd_097_155_lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Response DATA01-06 MAC address. Example MAC 01h-23h-45h-67h-89h-ABh: 23h B0h <ID1> <ID2> 08h 9Ah 00h 01h 23h 45h 67h 89h ABh <CKS>"

  - id: cmd_097_198_pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    notes: "Response DATA02: MODE (00h PIP, 01h PBP); START POSITION (00h TL, 01h TR, 02h BL, 03h BR); sub-input value otherwise."

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Response DATA01: 00h OFF, 01h ON."

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco-mode value (see Appendix 'Supplementary Information by Command')"

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name_bytes
        type: string
        description: "DATA01-16 projector name (up to 16 bytes), trailing 00h NUL terminator"
    notes: "Template expands 16 name bytes + 00h NUL. Source: DATA01-16 Projector name (up to 16 bytes)."

  - id: cmd_098_198_pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Value per DATA01 (MODE: 00h PIP/01h PBP; START POSITION: 00h TL/01h TR/02h BL/03h BR; else sub-input value)"
    notes: "Ack DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT 1, 03h SUB INPUT 2, 04h SUB INPUT 3."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h OFF, 01h ON"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Response DATA01/02 + DATA12/13 base model type, DATA03-11 model name (NUL-terminated)."

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Response DATA01-16 serial number (NUL-terminated)."

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Response DATA01 operation status, DATA02 content displayed, DATA03/04 signal type, DATA05 display signal type (video), DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (see Appendix)"
      - name: DATA02
        type: integer
        description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
    notes: "Ack DATA02 execution: 00h success, 01h error."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status_bitmap
    type: bitmap
    description: "009 ERROR STATUS response DATA01-12 bitmap"
    values: [normal, cover_error, temperature_bimetal, fan_error, power_error, lamp_off, lamp_replacement_moratorium, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_sensor, lamp_not_present, lamp_data_error, mirror_cover_error, lamp2_replacement_moratorium, lamp2_usage_exceeded, lamp2_not_present, lamp2_data_error, temperature_dust, foreign_matter_sensor, ballast_comm_error, iris_calibration_error, lens_not_installed, portrait_cover_up, interlock_switch_open, system_error_slave, system_error_formatter]

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, power_saving, network_standby, standby_error]
    description: "078-2 RUNNING STATUS DATA03 + DATA06"

  - id: mute_state
    type: composite
    description: "078-4 MUTE STATUS: picture, sound, onscreen, forced-onscreen, onscreen-display"

  - id: command_error
    type: enum_pair
    description: "ERR1/ERR2 error-code combinations (source §2.4)"
    values:
      - {err1: "00h", err2: "00h", meaning: "Command cannot be recognized"}
      - {err1: "00h", err2: "01h", meaning: "Command not supported by model"}
      - {err1: "01h", err2: "00h", meaning: "Specified value invalid"}
      - {err1: "01h", err2: "01h", meaning: "Specified input terminal invalid"}
      - {err1: "01h", err2: "02h", meaning: "Specified language invalid"}
      - {err1: "02h", err2: "00h", meaning: "Memory allocation error"}
      - {err1: "02h", err2: "02h", meaning: "Memory in use"}
      - {err1: "02h", err2: "03h", meaning: "Specified value cannot be set"}
      - {err1: "02h", err2: "04h", meaning: "Forced onscreen mute on"}
      - {err1: "02h", err2: "06h", meaning: "Viewer error"}
      - {err1: "02h", err2: "07h", meaning: "No signal"}
      - {err1: "02h", err2: "08h", meaning: "Test pattern or filter displayed"}
      - {err1: "02h", err2: "09h", meaning: "No PC card inserted"}
      - {err1: "02h", err2: "0Ah", meaning: "Memory operation error"}
      - {err1: "02h", err2: "0Ch", meaning: "Entry list displayed"}
      - {err1: "02h", err2: "0Dh", meaning: "Command cannot be accepted because power is off"}
      - {err1: "02h", err2: "0Eh", meaning: "Command execution failed"}
      - {err1: "02h", err2: "0Fh", meaning: "No authority for operation"}
      - {err1: "03h", err2: "00h", meaning: "Specified gain number incorrect"}
      - {err1: "03h", err2: "01h", meaning: "Specified gain invalid"}
      - {err1: "03h", err2: "02h", meaning: "Adjustment failed"}

  - id: lamp_info
    type: numeric_pair
    description: "037-4 response: usage time (sec), remaining life (%)"

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
```

## Variables
```yaml
variables:
  - id: volume
    description: "030-2 VOLUME ADJUST (absolute or relative)"
    range: null  # UNRESOLVED: absolute range not stated; query 060-1 DATA01=05h for bounds
  - id: brightness
    description: "030-1 PICTURE ADJUST target 00h"
    range: null  # UNRESOLVED: query 060-1 DATA01=00h for bounds
  - id: contrast
    description: "030-1 PICTURE ADJUST target 01h"
    range: null
  - id: color
    description: "030-1 PICTURE ADJUST target 02h"
    range: null
  - id: hue
    description: "030-1 PICTURE ADJUST target 03h"
    range: null
  - id: sharpness
    description: "030-1 PICTURE ADJUST target 04h"
    range: null
  - id: lamp_light_adjust
    description: "030-15 OTHER ADJUST (DATA01/02 = 96h/FFh)"
    range: null  # UNRESOLVED
  - id: lens_position
    description: "053 LENS CONTROL / 053-2 LENS CONTROL 2 - multiple axes (zoom/focus/shift/periphery)"
    range: null  # UNRESOLVED: query 053-1 per axis
```

## Events
```yaml
events: []
# UNRESOLVED: source describes no unsolicited notifications; all responses are solicited.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "Power-on/off commands block all other commands while in progress (incl. cooling time)."
  - "Forced onscreen mute (ERR 02h/04h) can block other commands."
  - "Cover/interlock errors surfaced in 009 ERROR STATUS DATA01 bit0 (cover), DATA09 bit1 (interlock switch open)."
# UNRESOLVED: source contains no explicit interlock procedure or power-on sequencing requirement;
# error bits above are status reporting, not safety interlocks.
```

## Notes
- Binary protocol. All byte values in source given as hex (`NNh`). ID1 = projector control ID, ID2 = model code (varies per model), CKS = low byte of sum of all preceding bytes.
- Response prefixes: `20h`/`22h`/`23h` success (request/set/adjust), `A0h`/`A2h`/`A3h` error.
- Two lamp slots supported on two-lamp models only (DATA01=01h Lamp2 in 037-4).
- Filter/lamp usage updated at 1-minute intervals though returned in seconds.
- Baud rate selectable among 5 values; source does not state a default.
- Wireless LAN via optional wireless-LAN unit (see separate operation manual).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (one of 4800/9600/19200/38400/115200). -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default values not stated. -->
<!-- UNRESOLVED: flow_control mode not stated (RTS/CTS pins present on D-SUB 9P). -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input-terminal values, aspect values, eco-mode values, sub-input values, base-model-type values — not included in this refined source. -->
<!-- UNRESOLVED: variable value ranges (volume/picture gains) not stated; must query 060-1 per name at runtime. -->
<!-- UNRESOLVED: voltage/current/power specs not in this control-protocol document. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:04:29.598Z
last_checked_at: 2026-06-18T08:51:17.833Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:51:17.833Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic command reference manual; literal \"NP-PV800UL-B1\" model string taken from device-name input, not from source body. Lamp unit 41ZL from device-name input."
- "RTS/CTS pins present (pins 7/8) but flow-control mode not stated"
- "absolute range not stated; query 060-1 DATA01=05h for bounds"
- "query 060-1 DATA01=00h for bounds"
- "query 053-1 per axis"
- "source describes no unsolicited notifications; all responses are solicited."
- "no multi-step sequences documented in source."
- "source contains no explicit interlock procedure or power-on sequencing requirement;"
- "firmware version compatibility not stated in source."
- "default baud rate not stated (one of 4800/9600/19200/38400/115200)."
- "ID1 (control ID) and ID2 (model code) default values not stated."
- "flow_control mode not stated (RTS/CTS pins present on D-SUB 9P)."
- "Appendix \"Supplementary Information by Command\" referenced for input-terminal values, aspect values, eco-mode values, sub-input values, base-model-type values — not included in this refined source."
- "variable value ranges (volume/picture gains) not stated; must query 060-1 per name at runtime."
- "voltage/current/power specs not in this control-protocol document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
