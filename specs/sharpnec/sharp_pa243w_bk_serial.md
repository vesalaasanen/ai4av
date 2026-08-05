---
spec_id: admin/sharp-nec-pa243w-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PA243W BK Control Spec"
manufacturer: Sharp/NEC
model_family: "PA243W BK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "PA243W BK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:11:33.055Z
last_checked_at: 2026-07-22T00:50:14.162Z
generated_at: 2026-07-22T00:50:14.162Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model \"PA243W BK\" is a monitor model name but source document is a Projector Control Command Reference Manual — model pairing should be verified"
  - "ID2 (model code) value not specified in source — varies by model"
  - "default baud rate not stated; five rates are supported"
  - "flow_control not stated in source (RTS/CTS pins present on D-SUB 9P but no setting documented)"
  - "full operation status enum from DATA06 includes standby variants not captured here"
  - "specific eco mode enum values not in source - reference to Appendix 'Supplementary Information by Command'"
  - "no event/notification mechanism described in source"
  - "no macros described in source"
  - "no explicit safety warnings or interlock procedures stated beyond command timing notes"
  - "ID2 (model code) for PA243W BK not stated"
  - "default baud rate not stated (five rates supported: 4800/9600/19200/38400/115200)"
  - "flow control setting not stated"
  - "input terminal value mapping not in source (references external Appendix)"
  - "aspect value mapping not in source (references external Appendix)"
  - "eco mode enum values not in source (references external Appendix)"
  - "base model type values not in source (references external Appendix)"
  - "DATA01 adjustment targets for LENS CONTROL (053) partially documented — only 06h (Periphery Focus) shown"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:50:14.162Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source commands with identical hex sequences and parameters. Transport values confirmed. Bidirectional coverage achieved. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PA243W BK Control Spec

## Summary
Sharp/NEC projector controlled via RS-232C serial or wired/wireless LAN (TCP port 7142). Binary command protocol using hex-byte frames with checksum. Covers power, input switching, mute (picture/sound/onscreen), picture/volume/aspect/gain adjustment, lens control and memory, shutter, freeze, eco mode, PIP/PbP, edge blending, and extensive status queries including error status, lamp/filter usage, model info, and MAC address. Source document: Projector Control Command Reference Manual (BDT140013 Revision 7.1).

<!-- UNRESOLVED: device model "PA243W BK" is a monitor model name but source document is a Projector Control Command Reference Manual — model pairing should be verified -->
<!-- UNRESOLVED: ID2 (model code) value not specified in source — varies by model -->
<!-- UNRESOLVED: default baud rate not stated; five rates are supported -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all supported per source; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow_control not stated in source (RTS/CTS pins present on D-SUB 9P but no setting documented)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON (015) / POWER OFF (016) commands
  - queryable  # inferred from extensive status query commands (009, 037, 078, 305, etc.)
  - levelable  # inferred from PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST commands
```

## Actions
```yaml
# Binary protocol: commands are hex-byte frames. Format:
#   [type] [code] 00h 00h [LEN] [DATA...] [CKS]
# Response (success):  [type+20h] [code] <ID1> <ID2> [LEN] [DATA...] <CKS>
# Response (error):    [type+80h] [code] <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# CKS = low-order byte of sum of all preceding bytes.
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# All command payloads are verbatim from the source document.

actions:
  # ── 009. ERROR STATUS REQUEST ──
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01> ... <DATA12> <CKS>"
    notes: "DATA01-DATA12 contain error information bits. Bit=0 normal, bit=1 error."

  # ── 015. POWER ON ──
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    response: "22h 00h <ID1> <ID2> 00h <CKS>"
    notes: "While powering on, no other command can be accepted."

  # ── 016. POWER OFF ──
  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    response: "22h 01h <ID1> <ID2> 00h <CKS>"
    notes: "During power-off including cooling time, no other command can be accepted."

  # ── 018. INPUT SW CHANGE ──
  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Input terminal value (e.g. 06h = video port). See Appendix 'Supplementary Information by Command' for full list."
    response: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS> (FFh = ended with error)"

  # ── 020. PICTURE MUTE ON ──
  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    response: "22h 10h <ID1> <ID2> 00h <CKS>"
    notes: "Turned off by input terminal switch or video signal switch."

  # ── 021. PICTURE MUTE OFF ──
  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []
    response: "22h 11h <ID1> <ID2> 00h <CKS>"

  # ── 022. SOUND MUTE ON ──
  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    response: "22h 12h <ID1> <ID2> 00h <CKS>"
    notes: "Turned off by input switch, video signal switch, or volume adjustment."

  # ── 023. SOUND MUTE OFF ──
  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []
    response: "22h 13h <ID1> <ID2> 00h <CKS>"

  # ── 024. ONSCREEN MUTE ON ──
  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    response: "22h 14h <ID1> <ID2> 00h <CKS>"
    notes: "Turned off by input terminal switch or video signal switch."

  # ── 025. ONSCREEN MUTE OFF ──
  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []
    response: "22h 15h <ID1> <ID2> 00h <CKS>"

  # ── 030-1. PICTURE ADJUST ──
  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: hex
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: hex
        description: "Adjustment value (high-order 8 bits)"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (0000h=success)"
    notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  # ── 030-2. VOLUME ADJUST ──
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: hex
        description: "Adjustment value (high-order 8 bits)"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (0000h=success)"
    notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  # ── 030-12. ASPECT ADJUST ──
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: hex
        description: "Aspect value. See Appendix 'Supplementary Information by Command'."
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (0000h=success)"

  # ── 030-15. OTHER ADJUST ──
  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Target high byte (96h = LAMP ADJUST / LIGHT ADJUST)"
      - name: data02
        type: hex
        description: "Target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: data03
        type: hex
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: hex
        description: "Adjustment value (high-order 8 bits)"
    response: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (0000h=success)"

  # ── 037. INFORMATION REQUEST ──
  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01> ... <DATA98> <CKS>"
    notes: "DATA01-49=projector name, DATA83-86=lamp usage time (seconds), DATA87-90=filter usage time (seconds). Updated at 1-minute intervals."

  # ── 037-3. FILTER USAGE INFORMATION REQUEST ──
  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    response: "23h 95h <ID1> <ID2> 08h <DATA01> ... <DATA08> <CKS>"
    notes: "DATA01-04=filter usage time (seconds), DATA05-08=filter alarm start time (seconds). -1 if undefined."

  # ── 037-4. LAMP INFORMATION REQUEST 3 ──
  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: hex
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    response: "23h 96h <ID1> <ID2> 06h <DATA01> ... <DATA06> <CKS>"
    notes: "Example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life is negative if replacement deadline exceeded."

  # ── 037-6. CARBON SAVINGS INFORMATION REQUEST ──
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    response: "23h 9Ah <ID1> <ID2> 09h <DATA01> ... <DATA09> <CKS>"
    notes: "DATA02-05=Carbon Savings kg (max 99999), DATA06-09=Carbon Savings mg (max 999999)."

  # ── 050. REMOTE KEY CODE ──
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Key code low byte (see key code list)"
      - name: data02
        type: hex
        description: "Key code high byte (see key code list)"
    response: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS> (FFh=error)"
    notes: |
      Key code list: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU,
      07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER,
      0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN,
      13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2,
      4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN,
      8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO

  # ── 051. SHUTTER CLOSE ──
  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []
    response: "22h 16h <ID1> <ID2> 00h <CKS>"

  # ── 052. SHUTTER OPEN ──
  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []
    response: "22h 17h <ID1> <ID2> 00h <CKS>"

  # ── 053. LENS CONTROL ──
  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Adjustment target (06h=Periphery Focus)"
      - name: data02
        type: hex
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    response: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS> (FFh=error)"
    notes: "After 7Fh or 81h, send 00h to stop. While driving, same command can control without stop."

  # ── 053-1. LENS CONTROL REQUEST ──
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: hex
        description: "Adjustment target"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02> ... <DATA07> <CKS>"
    notes: "DATA02-03=upper limit, DATA04-05=lower limit, DATA06-07=current value."

  # ── 053-2. LENS CONTROL 2 ──
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: hex
        description: "FFh=Stop, otherwise adjustment target"
      - name: data02
        type: hex
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: hex
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: hex
        description: "Adjustment value (high-order 8 bits)"
    response: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "If DATA01=FFh (Stop), mode and value are not referenced."

  # ── 053-3. LENS MEMORY CONTROL ──
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    response: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (FFh=error)"

  # ── 053-4. REFERENCE LENS MEMORY CONTROL ──
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    response: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS> (FFh=error)"
    notes: "Controls the profile number specified in 053-10 LENS PROFILE SET."

  # ── 053-5. LENS MEMORY OPTION REQUEST ──
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "DATA02: 00h=OFF, 01h=ON."

  # ── 053-6. LENS MEMORY OPTION SET ──
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: hex
        description: "Setting value: 00h=OFF, 01h=ON"
    response: "23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

  # ── 053-7. LENS INFORMATION REQUEST ──
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    notes: "DATA01 bits: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

  # ── 053-10. LENS PROFILE SET ──
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=Profile 1, 01h=Profile 2"
    response: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

  # ── 053-11. LENS PROFILE REQUEST ──
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    notes: "DATA01: 00h=Profile 1, 01h=Profile 2. DATA02=reserved."

  # ── 060-1. GAIN PARAMETER REQUEST 3 ──
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    response: "23h 05h <ID1> <ID2> 10h <DATA01> ... <DATA16> <CKS>"
    notes: "DATA01=status, DATA02-03=upper limit, DATA04-05=lower limit, DATA06-07=default, DATA08-09=current, DATA10-11=wide width, DATA12-13=narrow width, DATA14=default valid."
    example: "03h 05h 00h 00h 03h 00h 00h 00h 0Bh (brightness)"

  # ── 078-1. SETTING REQUEST ──
  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    response: "20h 85h <ID1> <ID2> 20h <DATA01> ... <DATA32> <CKS>"
    notes: "DATA01-03=base model type, DATA04=sound function (00h=no, 01h=yes), DATA05=profile number."

  # ── 078-2. RUNNING STATUS REQUEST ──
  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    response: "20h 85h <ID1> <ID2> 10h <DATA01> ... <DATA16> <CKS>"
    notes: "DATA03=power status (00h=Standby, 01h=Power on), DATA04=cooling process, DATA05=power on/off process, DATA06=operation status."

  # ── 078-3. INPUT STATUS REQUEST ──
  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    response: "20h 85h <ID1> <ID2> 10h <DATA01> ... <DATA16> <CKS>"
    notes: "DATA01=signal switch process, DATA02=signal list number, DATA03=signal type 1, DATA04=signal type 2, DATA05=signal list type, DATA06=test pattern, DATA09=content displayed."

  # ── 078-4. MUTE STATUS REQUEST ──
  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    response: "20h 85h <ID1> <ID2> 10h <DATA01> ... <DATA16> <CKS>"
    notes: "DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display. All 00h=Off, 01h=On."

  # ── 078-5. MODEL NAME REQUEST ──
  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    response: "20h 85h <ID1> <ID2> 20h <DATA01> ... <DATA32> <CKS>"
    notes: "DATA01-32=model name (NUL-terminated string)."

  # ── 078-6. COVER STATUS REQUEST ──
  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  # ── 079. FREEZE CONTROL ──
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "01h=Freeze on, 02h=Freeze off"
    response: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"

  # ── 084. INFORMATION STRING REQUEST ──
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: hex
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    response: "20h D0h <ID1> <ID2> <LEN> <DATA01> 01h <DATA02> ... <DATA??> <CKS>"
    notes: "DATA02=label length, DATA03+=label string (NUL-terminated)."

  # ── 097-8. ECO MODE REQUEST ──
  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    notes: "DATA01=eco mode value. See Appendix 'Supplementary Information by Command'."

  # ── 097-45. LAN PROJECTOR NAME REQUEST ──
  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01> ... <DATA17> <CKS>"
    notes: "DATA01-17=projector name (NUL-terminated string)."

  # ── 097-155. LAN MAC ADDRESS STATUS REQUEST2 ──
  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01> ... <DATA06> <CKS>"
    notes: "DATA01-06=MAC address."

  # ── 097-198. PIP/PICTURE BY PICTURE REQUEST ──
  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    notes: "DATA02 value depends on DATA01 selection (MODE: 00h=PIP/01h=PbP; START POSITION: 00h-03h corners)."

  # ── 097-243-1. EDGE BLENDING MODE REQUEST ──
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    notes: "DATA01: 00h=OFF, 01h=ON."

  # ── 098-8. ECO MODE SET ──
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Eco mode value. See Appendix 'Supplementary Information by Command'."
    response: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

  # ── 098-45. LAN PROJECTOR NAME SET ──
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> ... <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes, DATA01-16)"
    response: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"

  # ── 098-198. PIP/PICTURE BY PICTURE SET ──
  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: hex
        description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; sub input values per Appendix)"
    response: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

  # ── 098-243-1. EDGE BLENDING MODE SET ──
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: hex
        description: "00h=OFF, 01h=ON"
    response: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"

  # ── 305-1. BASE MODEL TYPE REQUEST ──
  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01> ... <DATA15> <CKS>"
    notes: "DATA01-02=base model type, DATA03-11=model name, DATA12-13=base model type."

  # ── 305-2. SERIAL NUMBER REQUEST ──
  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01> ... <DATA16> <CKS>"
    notes: "DATA01-16=serial number (NUL-terminated string)."

  # ── 305-3. BASIC INFORMATION REQUEST ──
  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01> ... <DATA15> <CKS>"
    notes: "DATA01=operation status, DATA02=content displayed, DATA03=signal type 1, DATA04=signal type 2, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."

  # ── 319-10. AUDIO SELECT SET ──
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: hex
        description: "Input terminal. See Appendix 'Supplementary Information by Command'."
      - name: data02
        type: hex
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    response: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS> (DATA02: 00h=success, 01h=error)"
```

## Feedbacks
```yaml
# Response structure: success = [type+20h] [code] <ID1> <ID2> [LEN] [DATA] <CKS>
#                     error   = [type+80h] [code] <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

# Error codes (ERR1/ERR2):
- id: error_code
  type: enum
  description: "Error codes returned in ERR1/ERR2 bytes of error response"
  values:
    - { err1: "00h", err2: "00h", description: "Command cannot be recognized" }
    - { err1: "00h", err2: "01h", description: "Command not supported by model" }
    - { err1: "01h", err2: "00h", description: "Specified value is invalid" }
    - { err1: "01h", err2: "01h", description: "Specified input terminal is invalid" }
    - { err1: "01h", err2: "02h", description: "Specified language is invalid" }
    - { err1: "02h", err2: "00h", description: "Memory allocation error" }
    - { err1: "02h", err2: "02h", description: "Memory in use" }
    - { err1: "02h", err2: "03h", description: "Specified value cannot be set" }
    - { err1: "02h", err2: "04h", description: "Forced onscreen mute on" }
    - { err1: "02h", err2: "06h", description: "Viewer error" }
    - { err1: "02h", err2: "07h", description: "No signal" }
    - { err1: "02h", err2: "08h", description: "A test pattern or filter is displayed" }
    - { err1: "02h", err2: "09h", description: "No PC card is inserted" }
    - { err1: "02h", err2: "0Ah", description: "Memory operation error" }
    - { err1: "02h", err2: "0Ch", description: "An entry list is displayed" }
    - { err1: "02h", err2: "0Dh", description: "Command cannot be accepted because power is off" }
    - { err1: "02h", err2: "0Eh", description: "Command execution failed" }
    - { err1: "02h", err2: "0Fh", description: "No authority for the operation" }
    - { err1: "03h", err2: "00h", description: "Specified gain number is incorrect" }
    - { err1: "03h", err2: "01h", description: "Specified gain is invalid" }
    - { err1: "03h", err2: "02h", description: "Adjustment failed" }

# Power status (from 078-2 RUNNING STATUS REQUEST DATA03):
- id: power_state
  type: enum
  values: [standby, power_on]
  # UNRESOLVED: full operation status enum from DATA06 includes standby variants not captured here

# Mute states (from 078-4 MUTE STATUS REQUEST):
- id: picture_mute_state
  type: enum
  values: [off, on]
- id: sound_mute_state
  type: enum
  values: [off, on]
- id: onscreen_mute_state
  type: enum
  values: [off, on]
- id: freeze_state
  type: enum
  values: [off, on]
- id: cover_state
  type: enum
  values: [normal_open, closed]
```

## Variables
```yaml
- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "Lamp usage time in seconds (DATA83-86 of INFORMATION REQUEST). Updated at 1-minute intervals."
- id: filter_usage_time
  type: integer
  unit: seconds
  description: "Filter usage time in seconds (DATA87-90 of INFORMATION REQUEST)."
- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "Lamp remaining life percentage. Negative if replacement deadline exceeded."
- id: volume
  type: integer
  description: "Sound volume level (settable via VOLUME ADJUST)"
- id: brightness
  type: integer
  description: "Picture brightness (settable via PICTURE ADJUST)"
- id: contrast
  type: integer
  description: "Picture contrast (settable via PICTURE ADJUST)"
- id: eco_mode
  type: enum
  description: "Eco/Light/Lamp mode setting"
  # UNRESOLVED: specific eco mode enum values not in source - reference to Appendix 'Supplementary Information by Command'
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are command-initiated.
# UNRESOLVED: no event/notification mechanism described in source
```

## Macros
```yaml
# Source documents no multi-step command sequences.
# UNRESOLVED: no macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON: no other command accepted while powering on"
  - description: "POWER OFF: no other command accepted during power-off including cooling time"
# UNRESOLVED: no explicit safety warnings or interlock procedures stated beyond command timing notes
```

## Notes
- Binary protocol with hex-byte framing. Command frame: `[type] [code] 00h 00h [LEN] [DATA...] [CKS]`. Success response prepends `type+20h` and includes `<ID1> <ID2>`. Error response prepends `type+80h` with `02h <ERR1> <ERR2>`.
- Checksum (CKS): sum all preceding bytes, take low-order byte (8 bits).
- ID1 = control ID set on projector. ID2 = model code, varies by model. Neither value is documented in this source.
- Serial cable: D-SUB 9P cross cable. Pin assignment: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN: RJ-45 connector, 10/100 Mbps auto-switchable (IEEE 802.3 / 802.3u). TCP port 7142.
- Wireless LAN: requires separate wireless LAN unit (see operation manual).
- Several commands reference an "Appendix: Supplementary Information by Command" for input terminal values, aspect values, eco mode values, base model type values, and sub input setting values. This appendix is not included in the source text.
- Information query data (lamp/filter usage) is updated at 1-minute intervals despite being available in 1-second units.

<!-- UNRESOLVED: ID2 (model code) for PA243W BK not stated -->
<!-- UNRESOLVED: default baud rate not stated (five rates supported: 4800/9600/19200/38400/115200) -->
<!-- UNRESOLVED: flow control setting not stated -->
<!-- UNRESOLVED: input terminal value mapping not in source (references external Appendix) -->
<!-- UNRESOLVED: aspect value mapping not in source (references external Appendix) -->
<!-- UNRESOLVED: eco mode enum values not in source (references external Appendix) -->
<!-- UNRESOLVED: base model type values not in source (references external Appendix) -->
<!-- UNRESOLVED: DATA01 adjustment targets for LENS CONTROL (053) partially documented — only 06h (Periphery Focus) shown -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:11:33.055Z
last_checked_at: 2026-07-22T00:50:14.162Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:50:14.162Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source commands with identical hex sequences and parameters. Transport values confirmed. Bidirectional coverage achieved. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model \"PA243W BK\" is a monitor model name but source document is a Projector Control Command Reference Manual — model pairing should be verified"
- "ID2 (model code) value not specified in source — varies by model"
- "default baud rate not stated; five rates are supported"
- "flow_control not stated in source (RTS/CTS pins present on D-SUB 9P but no setting documented)"
- "full operation status enum from DATA06 includes standby variants not captured here"
- "specific eco mode enum values not in source - reference to Appendix 'Supplementary Information by Command'"
- "no event/notification mechanism described in source"
- "no macros described in source"
- "no explicit safety warnings or interlock procedures stated beyond command timing notes"
- "ID2 (model code) for PA243W BK not stated"
- "default baud rate not stated (five rates supported: 4800/9600/19200/38400/115200)"
- "flow control setting not stated"
- "input terminal value mapping not in source (references external Appendix)"
- "aspect value mapping not in source (references external Appendix)"
- "eco mode enum values not in source (references external Appendix)"
- "base model type values not in source (references external Appendix)"
- "DATA01 adjustment targets for LENS CONTROL (053) partially documented — only 06h (Periphery Focus) shown"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
