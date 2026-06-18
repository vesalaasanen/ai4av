---
spec_id: admin/sharp-nec-led-fa009i2-165in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA009I2 165in Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA009I2 165in"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA009I2 165in"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:02:30.321Z
last_checked_at: 2026-06-17T20:12:55.070Z
generated_at: 2026-06-17T20:12:55.070Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for this specific model not stated in source — required for every command/response framing. Input-terminal value table (Appendix \"Supplementary Information by Command\") not present in refined source."
  - "flow control not explicitly stated; full-duplex communication mode noted"
  - "appendix not in source.\""
  - "appendix not in source).\""
  - "appendix not in source)."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "ID2 value for LED FA009I2 165in not stated in source."
  - "Appendix \"Supplementary Information by Command\" (input-terminal value table, aspect value table, eco-mode value table, sub-input value table, base-model-type table) is not present in the refined source — several parameterized actions reference it."
  - "firmware version compatibility not stated in source."
  - "protocol version number not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:12:55.070Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source command tokens with correct hex frames, parameters, and responses; TCP port 7142 and serial params confirmed in source §1.2. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA009I2 165in Control Spec

## Summary
Sharp/NEC large-format LED projector (165 in) controlled via the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Control interface is a binary hex-byte protocol with a trailing checksum byte, carried over RS-232C serial or wired/wireless LAN (TCP). Covers power, input switching, mutes, picture/volume/aspect/lamp adjust, lens shift/zoom/focus/memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/error/lamp/filter/information queries.

<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source — required for every command/response framing. Input-terminal value table (Appendix "Supplementary Information by Command") not present in refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as selectable; 9600 chosen as common default - device-configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; full-duplex communication mode noted
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON (015) / POWER OFF (016)
  - routable        # inferred: INPUT SW CHANGE (018), AUDIO SELECT SET (319-10)
  - queryable       # inferred: many *REQUEST commands
  - levelable       # inferred: PICTURE/VOLUME/LAMP ADJUST (030-*), LENS CONTROL (053*)
```

## Actions
```yaml
# All command/response hex bytes are VERBATIM from source (BDT140013 Rev 7.1).
# Framing convention: every command begins with a lead byte; responses echo with
# bit 5/7 of lead set (20h/22h/23h -> ack frames; A0h/A1h/A2h/A3h -> error frames).
# ID1 = Control ID, ID2 = model code, CKS = checksum (low byte of sum of preceding bytes).

- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []
  response_ok: "20h  88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"
  response_err: "A0h  88h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01-DATA12 = bit-packed error info (cover/fan/temp/power/lamp/formatter/mirror cover/interlock/etc.)

- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []
  response_ok: "22h  00h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: While turning on, no other command accepted.

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []
  response_ok: "22h  01h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: During power-off (incl. cooling), no other command accepted.

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h  03h  00h  00h  02h  01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full value table in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
  response_ok: "22h  03h <ID1> <ID2> 01h <DATA01> <CKS>  (FFh = ended with error)"
  response_err: "A2h  03h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: picture_mute_on_020
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []
  response_ok: "22h  10h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: picture_mute_off_021
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []
  response_ok: "22h  11h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  11h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: sound_mute_on_022
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []
  response_ok: "22h  12h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  12h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: sound_mute_off_023
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []
  response_ok: "22h  13h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  13h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: onscreen_mute_on_024
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []
  response_ok: "22h  14h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  14h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: onscreen_mute_off_025
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []
  response_ok: "22h  15h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  15h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: picture_adjust_030_1
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: DATA02
      type: integer
      description: "Mode (00h=absolute, 01h=relative)"
    - name: DATA03
      type: integer
      description: "Value low 8 bits"
    - name: DATA04
      type: integer
      description: "Value high 8 bits"
  response_ok: "23h  10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  (0000h = OK)"
  response_err: "A3h  10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Mode (00h=absolute, 01h=relative)"
    - name: DATA02
      type: integer
      description: "Value low 8 bits"
    - name: DATA03
      type: integer
      description: "Value high 8 bits"
  response_ok: "23h  10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  (0000h = OK)"
  response_err: "A3h  10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - full table in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."
  response_ok: "23h  10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  (0000h = OK)"
  response_err: "A3h  10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target high byte - source shows DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Target low byte (FFh with DATA01=96h)"
    - name: DATA03
      type: integer
      description: "Mode (00h=absolute, 01h=relative)"
    - name: DATA04
      type: integer
      description: "Value low 8 bits"
    - name: DATA05
      type: integer
      description: "Value high 8 bits"
  response_ok: "23h  10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  (0000h = OK)"
  response_err: "A3h  10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []
  response_ok: "23h  8Ah <ID1> <ID2> 62h <DATA01> - <DATA98> <CKS>"
  response_err: "A3h  8Ah <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01-49 = projector name (NUL-terminated); DATA83-86 = lamp usage seconds; DATA87-90 = filter usage seconds.

- id: filter_usage_info_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []
  response_ok: "23h  95h <ID1> <ID2> 08h <DATA01> - <DATA08> <CKS>"
  response_err: "A3h  95h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01-04 = filter usage seconds; DATA05-08 = filter alarm start seconds (-1 if undefined).

- id: lamp_info_request_3_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h  96h  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp select (00h=Lamp 1, 01h=Lamp 2 - Lamp 2 only on two-lamp models)"
    - name: DATA02
      type: integer
      description: "Content (01h=usage time seconds, 04h=remaining life %)"
  response_ok: "23h  96h <ID1> <ID2> 06h <DATA01> - <DATA06> <CKS>"
  response_err: "A3h  96h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: carbon_savings_info_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h  9Ah  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  response_ok: "23h  9Ah <ID1> <ID2> 09h <DATA01> - <DATA09> <CKS>"
  response_err: "A3h  9Ah <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h  0Fh  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD-typed key code)"
    - name: DATA02
      type: integer
      description: "Key code high byte. Examples from source key-code table: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO."
  response_ok: "22h  0Fh <ID1> <ID2> 01h <DATA01> <CKS>  (FFh = error)"
  response_err: "A2h  0Fh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: shutter_close_051
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []
  response_ok: "22h  16h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  16h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: shutter_open_052
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []
  response_ok: "22h  17h <ID1> <ID2> 00h <CKS>"
  response_err: "A2h  17h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: lens_control_053
  label: "053. LENS CONTROL"
  kind: action
  command: "02h  18h  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target - source shows 06h=Periphery Focus. (Other target values not enumerated in refined source.)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
  response_ok: "22h  18h <ID1> <ID2> 01h <DATA01> <CKS>  (FFh = error)"
  response_err: "A2h  18h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: After 7Fh/81h, send 00h to stop driving.

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h  1Ch  00h  00h  02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (see 053 LENS CONTROL)."
  response_ok: "22h  1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02> - <DATA07> <CKS>"
  response_err: "A2h  1Ch <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA02/03 = upper limit (lo/hi), DATA04/05 = lower limit, DATA06/07 = current value.

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h  1Dh  00h  00h  04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop; otherwise lens target."
    - name: DATA02
      type: integer
      description: "Mode (00h=absolute, 02h=relative)."
    - name: DATA03
      type: integer
      description: "Value low 8 bits"
    - name: DATA04
      type: integer
      description: "Value high 8 bits"
  response_ok: "22h  1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  response_err: "A2h  1Dh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Eh  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  response_ok: "22h  1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  (FFh = error)"
  response_err: "A2h  1Eh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Fh  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  response_ok: "22h  1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  (FFh = error)"
  response_err: "A2h  1Fh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: Controls the profile selected via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h  20h  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  response_ok: "22h  20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  response_err: "A2h  20h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA02 = setting (00h=OFF, 01h=ON).

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h  21h  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h=OFF, 01h=ON"
  response_ok: "23h  21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  response_err: "A2h  21h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []
  response_ok: "22h  22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
  response_err: "A2h  22h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01 bit-packed lens operation status (Bit0 lens memory, Bit1 zoom, Bit2 focus, Bit3 lens shift H, Bit4 lens shift V) - 0=stop, 1=in operation.

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h  27h  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"
  response_ok: "22h  27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  response_err: "A2h  27h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []
  response_ok: "22h  28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  response_err: "A2h  28h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01 = profile (00h=Profile 1, 01h=Profile 2); DATA02 reserved.

- id: gain_parameter_request_3_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h  05h  00h  00h  03h <DATA01> 00h  00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name (00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST)"
  response_ok: "23h  05h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
  response_err: "A3h  05h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []
  response_ok: "20h  85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"
  response_err: "A0h  85h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01-03 = base model type; DATA04 = sound function; DATA05 = profile number / clock / sleep timer.

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []
  response_ok: "20h  85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
  notes: DATA03 = power status (00h=Standby, 01h=Power on, FFh=unsupported); DATA04 = cooling process; DATA05 = power on/off process; DATA06 = operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Standby Power saving, 10h Network standby).

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []
  response_ok: "20h  85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
  notes: DATA01 = signal switch process; DATA02 = signal list number - 1; DATA03 = selection signal type 1; DATA04 = selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 07h VIEWER 1-5, 20h DVI-D, 21h HDMI, 22h DisplayPort, 23h VIEWER 6-10).

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []
  response_ok: "20h  85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"
  notes: DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display - each 00h Off / 01h On.

- id: model_name_request_078_5
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []
  response_ok: "20h  85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"
  notes: DATA01-32 = model name (NUL-terminated).

- id: cover_status_request_078_6
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []
  response_ok: "20h  85h <ID1> <ID2> 01h <DATA01> <CKS>"
  notes: DATA01 = 00h Normal (cover opened) / 01h Cover closed.

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h  98h  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"
  response_ok: "21h  98h <ID1> <ID2> 01h <DATA01> <CKS>"
  response_err: "A1h  98h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h  D0h  00h  00h  03h  00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"
  response_ok: "20h  D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02> - <DATA??> <CKS>"
  response_err: "A0h  D0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []
  response_ok: "23h  B0h <ID1> <ID2> 02h  07h <DATA01> <CKS>"
  response_err: "A3h  B0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01 = eco mode value (full table in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source).

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []
  response_ok: "23h  B0h <ID1> <ID2> 12h  2Ch <DATA01> - <DATA17> <CKS>"
  response_err: "A3h  B0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01-17 = projector name (NUL-terminated).

- id: lan_mac_address_request_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []
  response_ok: "23h  B0h <ID1> <ID2> 08h  9Ah  00h <DATA01> - <DATA06> <CKS>"
  response_err: "A3h  B0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01-06 = MAC address (6 bytes).

- id: pip_pbp_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  response_ok: "23h  B0h <ID1> <ID2> 03h  C5h <DATA01> <DATA02> <CKS>"
  response_err: "A3h  B0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA02 - MODE: 00h=PIP / 01h=PICTURE BY PICTURE; START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT; sub-input values in Appendix (UNRESOLVED: appendix not in source).

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []
  response_ok: "23h  B0h <ID1> <ID2> 03h  DFh  00h <DATA01> <CKS>"
  response_err: "A3h  B0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01 = 00h OFF / 01h ON.

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  02h  07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (full table in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source)."
  response_ok: "23h  B1h <ID1> <ID2> 02h  07h <DATA01> <CKS>"
  response_err: "A3h  B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name (up to 16 bytes), DATA01-DATA16."
  response_ok: "23h  B1h <ID1> <ID2> 02h  2Ch <DATA01> <CKS>"
  response_err: "A3h  B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: pip_pbp_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (see 097-198 notes)."
  response_ok: "23h  B1h <ID1> <ID2> 03h  C5h <DATA01> <DATA02> <CKS>"
  response_err: "A3h  B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"
  response_ok: "23h  B1h <ID1> <ID2> 03h  DFh  00h <DATA01> <CKS>"
  response_err: "A3h  B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []
  response_ok: "20h  BFh <ID1> <ID2> 10h  00h <DATA01> - <DATA15> <CKS>"
  response_err: "A0h  BFh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01/02 = base model type; DATA03-11 = model name (NUL-terminated); DATA12/13 = base model type; DATA14/15 reserved.

- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []
  response_ok: "20h  BFh <ID1> <ID2> 12h  01h  06h <DATA01> - <DATA16> <CKS>"
  response_err: "A0h  BFh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01-16 = serial number (NUL-terminated).

- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []
  response_ok: "20h  BFh <ID1> <ID2> 10h  02h <DATA01> - <DATA15> <CKS>"
  response_err: "A0h  BFh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  notes: DATA01 = operation status; DATA02 = content displayed; DATA03-05 = signal types; DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status.

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h  C9h  00h  00h  03h  09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (value table in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source)."
    - name: DATA02
      type: integer
      description: "Setting value (00h = terminal specified in DATA01, 01h = BNC, 02h = COMPUTER)."
  response_ok: "23h  C9h <ID1> <ID2> 03h  09h <DATA01> <DATA02> <CKS>  (DATA02 00h = OK, 01h = error)"
  response_err: "A3h  C9h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
```

## Feedbacks
```yaml
# Ack/error framing is uniform: A*h lead bytes carry ERR1/ERR2 per the 2.4 error-code table.
# Verbatim error codes (ERR1, ERR2):
- id: err_unrecognized_command
  code: [00h, 00h]
  description: "The command cannot be recognized."
- id: err_not_supported
  code: [00h, 01h]
  description: "The command is not supported by the model in use."
- id: err_invalid_value
  code: [01h, 00h]
  description: "The specified value is invalid."
- id: err_invalid_input_terminal
  code: [01h, 01h]
  description: "The specified input terminal is invalid."
- id: err_invalid_language
  code: [01h, 02h]
  description: "The specified language is invalid."
- id: err_mem_alloc
  code: [02h, 00h]
  description: "Memory allocation error"
- id: err_mem_in_use
  code: [02h, 02h]
  description: "Memory in use"
- id: err_value_not_settable
  code: [02h, 03h]
  description: "The specified value cannot be set."
- id: err_forced_onscreen_mute
  code: [02h, 04h]
  description: "Forced onscreen mute on"
- id: err_viewer_error
  code: [02h, 06h]
  description: "Viewer error"
- id: err_no_signal
  code: [02h, 07h]
  description: "No signal"
- id: err_test_pattern_displayed
  code: [02h, 08h]
  description: "A test pattern or filer is displayed."
- id: err_no_pc_card
  code: [02h, 09h]
  description: "No PC card is inserted."
- id: err_mem_op_error
  code: [02h, 0Ah]
  description: "Memory operation error"
- id: err_entry_list_displayed
  code: [02h, 0Ch]
  description: "An entry list is displayed."
- id: err_power_off
  code: [02h, 0Dh]
  description: "The command cannot be accepted because the power is off."
- id: err_exec_failed
  code: [02h, 0Eh]
  description: "The command execution failed."
- id: err_no_authority
  code: [02h, 0Fh]
  description: "There is no authority necessary for the operation."
- id: err_wrong_gain_number
  code: [03h, 00h]
  description: "The specified gain number is incorrect."
- id: err_invalid_gain
  code: [03h, 01h]
  description: "The specified gain is invalid."
- id: err_adjust_failed
  code: [03h, 02h]
  description: "Adjustment failed."
```

## Variables
```yaml
# Settable non-discrete parameters are represented as parameterized Actions (030-1 PICTURE,
# 030-2 VOLUME, 030-15 OTHER/LAMP ADJUST, 053-2 LENS CONTROL 2). No separate Variables block
# is required beyond those actions.
```

## Events
```yaml
# No unsolicited notifications documented in source. All output is in response to a command.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes relevant operational constraints (NOT safety interlocks, listed for fidelity):
#   - POWER ON (015): while turning on, no other command accepted.
#   - POWER OFF (016): during power-off incl. cooling, no other command accepted.
#   - 009 ERROR STATUS bit DATA09 Bit1: "The interlock switch is open." (read-only status bit,
#     not a control procedure).
# <!-- UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. -->
```

## Notes
- Source: "Projector Control Command Reference Manual", BDT140013 Revision 7.1 (Sharp/NEC). All hex payloads copied verbatim.
- Checksum (CKS): sum all preceding bytes, take low-order one byte. Worked source example: `20h + 81h + 01h + 60h + 01h + 00h = 103h` -> CKS = `03h`.
- Framing: commands use lead bytes `00h/01h/02h/03h`; success acks use `20h/21h/22h/23h` (same low nibble); error acks use `A0h/A1h/A2h/A3h`.
- `ID1` = Control ID configured on projector; `ID2` = model code (model-dependent). <!-- UNRESOLVED: ID2 value for LED FA009I2 165in not stated in source. -->
- Baud rate is selectable among 115200/38400/19200/9600/4800; 9600 recorded as the conservative default — verify against on-device setting.
- Lamp/filter usage times returned in seconds, updated at one-minute intervals.
- Two-lamp projector features (Lamp 2) only apply to two-lamp models; this LED unit is single-light-engine — confirm applicability.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input-terminal value table, aspect value table, eco-mode value table, sub-input value table, base-model-type table) is not present in the refined source — several parameterized actions reference it. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version number not stated in source. -->
````

Spec built. 53 commands enumerated verbatim. Serial+TCP port 7142. Binary hex + checksum. Gaps marked UNRESOLVED (ID2 model code, Appendix value tables, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:02:30.321Z
last_checked_at: 2026-06-17T20:12:55.070Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:12:55.070Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source command tokens with correct hex frames, parameters, and responses; TCP port 7142 and serial params confirmed in source §1.2. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for this specific model not stated in source — required for every command/response framing. Input-terminal value table (Appendix \"Supplementary Information by Command\") not present in refined source."
- "flow control not explicitly stated; full-duplex communication mode noted"
- "appendix not in source.\""
- "appendix not in source).\""
- "appendix not in source)."
- "source contains no explicit safety warnings, interlock procedures, or"
- "ID2 value for LED FA009I2 165in not stated in source."
- "Appendix \"Supplementary Information by Command\" (input-terminal value table, aspect value table, eco-mode value table, sub-input value table, base-model-type table) is not present in the refined source — several parameterized actions reference it."
- "firmware version compatibility not stated in source."
- "protocol version number not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
