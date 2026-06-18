---
spec_id: admin/sharp-nec-led-e018i
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED E018I Control Spec"
manufacturer: Sharp/NEC
model_family: "LED E018I"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED E018I"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:29:57.178Z
last_checked_at: 2026-06-17T20:10:09.124Z
generated_at: 2026-06-17T20:10:09.124Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model firmware version range not stated in source. Model code (ID2) value not stated — must be read from device. Default control ID (ID1) not stated. Appendix \"Supplementary Information by Command\" (input terminal values, base model types, eco mode values, aspect values, sub input values) not present in refined source."
  - "flow control not stated; full-duplex communication mode noted"
  - "appendix not in source.\""
  - "value list in Appendix 'Supplementary Information by Command' - not in source.\""
  - "base model type value list in Appendix."
  - "no separate named-variable model in source."
  - "not applicable per source - no events described."
  - "not applicable per source."
  - "source contains no explicit power-on sequencing procedure or"
  - "firmware version range not stated in source."
  - "model code (ID2) value for LED E018I not stated — must be read from device."
  - "control ID (ID1) default not stated — set per projector."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values (018, 319-10), base model types (078-1, 305-1), eco mode values (097-8, 098-8), aspect values (030-12), sub input values (097-198, 098-198) — appendix not present in refined source."
  - "full DATA01 lens-target list for 053 LENS CONTROL (only 06h=Periphery Focus shown)."
  - "flow_control not explicitly stated (source lists only baud/data/parity/stop/mode)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:10:09.124Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source commands; transport parameters verified; full bidirectional coverage achieved. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED E018I Control Spec

## Summary
Projector supporting RS-232C (D-SUB 9P, cross cable) and wired/wireless LAN control. Commands are binary frames in hexadecimal notation with leading byte 00h–03h, a trailing checksum byte (low-order 8 bits of the sum of preceding bytes), and per-frame ID1/ID2/LEN parameters. Source manual documents 53 distinct control commands covering power, input switching, mutes, picture/volume/aspect/gain adjust, lens control and memory, status queries, and LAN/PIP/edge-blending settings.

<!-- UNRESOLVED: model firmware version range not stated in source. Model code (ID2) value not stated — must be read from device. Default control ID (ID1) not stated. Appendix "Supplementary Information by Command" (input terminal values, base model types, eco mode values, aspect values, sub input values) not present in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source supports 115200/38400/19200/9600/4800; configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex communication mode noted
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from 015 POWER ON / 016 POWER OFF
  - routable     # inferred from 018 INPUT SW CHANGE
  - queryable    # inferred from numerous status request commands
  - levelable    # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
```

## Actions
```yaml
# Each command's full binary frame is given verbatim. Frames use leading byte 00h-03h,
# then command byte(s), then ID1 (control ID), ID2 (model code), LEN (data length),
# optional DATA bytes, and CKS (checksum = low-order 8 bits of sum of all preceding bytes).
# ID1, ID2, CKS are parameters the controller must compute; they are shown as <ID1> <ID2> <CKS>
# where the source documents them as variable parameters.

actions:
  - id: error_status_request
    label: 009 ERROR STATUS REQUEST
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    notes: Response 20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS> with 12 bytes of error-status bit fields. Error response A0h 88h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.

  - id: power_on
    label: 015 POWER ON
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    notes: No other command accepted while power-on in progress. ACK 22h 00h <ID1> <ID2> 00h <CKS>. ERR A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.

  - id: power_off
    label: 016 POWER OFF
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    notes: No other command accepted during power-off including cooling time. ACK 22h 01h <ID1> <ID2> 00h <CKS>. ERR A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>.

  - id: input_sw_change
    label: 018 INPUT SW CHANGE
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal (e.g. 06h = video). Full value list in Appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source."
    notes: Example sets video (DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh. ACK 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>; FFh = ended with error.

  - id: picture_mute_on
    label: 020 PICTURE MUTE ON
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    notes: Cleared by input terminal switch or video signal switch.

  - id: picture_mute_off
    label: 021 PICTURE MUTE OFF
    kind: action
    command: "02h 11h 00h 00h 00h 13h"

  - id: sound_mute_on
    label: 022 SOUND MUTE ON
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    notes: Cleared by input terminal switch, video signal switch, or volume adjustment.

  - id: sound_mute_off
    label: 023 SOUND MUTE OFF
    kind: action
    command: "02h 13h 00h 00h 00h 15h"

  - id: onscreen_mute_on
    label: 024 ONSCREEN MUTE ON
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    notes: Cleared by input terminal switch or video signal switch.

  - id: onscreen_mute_off
    label: 025 ONSCREEN MUTE OFF
    kind: action
    command: "02h 15h 00h 00h 00h 17h"

  - id: picture_adjust
    label: 030-1 PICTURE ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits)
    notes: Example brightness=+10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch.

  - id: volume_adjust
    label: 030-2 VOLUME ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: byte
        description: Adjustment value (high-order 8 bits)
    notes: Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h.

  - id: aspect_adjust
    label: 030-12 ASPECT ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. UNRESOLVED: value list in Appendix 'Supplementary Information by Command' - not in source."

  - id: other_adjust
    label: 030-15 OTHER ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target. DATA01=96h, DATA02=FFh → LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "FFh pairs with DATA01=96h for LAMP/LIGHT ADJUST"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: 037 INFORMATION REQUEST
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    notes: Response 23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>. DATA01-49=projector name, DATA50-82=reserved, DATA83-86=lamp usage time (s), DATA87-90=filter usage time (s), DATA91-98=reserved. Updated 1-min intervals.

  - id: filter_usage_info_request
    label: 037-3 FILTER USAGE INFORMATION REQUEST
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    notes: Response 23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>. DATA01-04=filter usage time (s), DATA05-08=filter alarm start time (s). -1 returned if undefined.

  - id: lamp_information_request_3
    label: 037-4 LAMP INFORMATION REQUEST 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "Content: 01h=usage time (s), 04h=remaining life (%)"
    notes: Example get lamp 1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining-life if replacement deadline exceeded.

  - id: carbon_savings_info_request
    label: 037-6 CARBON SAVINGS INFORMATION REQUEST
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: Response 23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>. DATA02-05=kg (max 99999), DATA06-09=mg (max 999999).

  - id: remote_key_code
    label: 050 REMOTE KEY CODE
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (see key code list)"
      - name: DATA02
        type: byte
        description: "Key code high byte"
    notes: "Key code list: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

  - id: shutter_close
    label: 051 SHUTTER CLOSE
    kind: action
    command: "02h 16h 00h 00h 00h 18h"

  - id: shutter_open
    label: 052 SHUTTER OPEN
    kind: action
    command: "02h 17h 00h 00h 00h 19h"

  - id: lens_control
    label: 053 LENS CONTROL
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (e.g. 06h=Periphery Focus)"
      - name: DATA02
        type: byte
        description: "Drive: 00h=Stop, 01h=drive 1s plus, 02h=0.5s plus, 03h=0.25s plus, 7Fh=continuous plus, 81h=continuous minus, FDh=0.25s minus, FEh=0.5s minus, FFh=1s minus"
    notes: After 7Fh or 81h, send DATA02=00h to stop. Same command may be re-issued without stop while lens driving.

  - id: lens_control_request
    label: 053-1 LENS CONTROL REQUEST
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: Lens target
    notes: Response 22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>. DATA02-03=upper limit, DATA04-05=lower limit, DATA06-07=current value.

  - id: lens_control_2
    label: 053-2 LENS CONTROL 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "FFh=Stop; otherwise lens target"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative (ignored when DATA01=FFh)"
      - name: DATA03
        type: byte
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: byte
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: 053-3 LENS MEMORY CONTROL
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: 053-4 REFERENCE LENS MEMORY CONTROL
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls profile number set via 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: 053-5 LENS MEMORY OPTION REQUEST
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: 053-6 LENS MEMORY OPTION SET
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "Setting: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: 053-7 LENS INFORMATION REQUEST
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    notes: Response 22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>. DATA01 bits: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation).

  - id: lens_profile_set
    label: 053-10 LENS PROFILE SET
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: 053-11 LENS PROFILE REQUEST
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    notes: Response 22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>. DATA01: 00h=Profile 1, 01h=Profile 2.

  - id: gain_parameter_request_3
    label: 060-1 GAIN PARAMETER REQUEST 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response 23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>.

  - id: setting_request
    label: 078-1 SETTING REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    notes: Response 20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>. DATA01-03=base model type, DATA04=sound function (00h=Not available, 01h=Available), DATA05=profile function.

  - id: running_status_request
    label: 078-2 RUNNING STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    notes: "Response 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>. DATA03=Power status (00h=Standby, 01h=Power on, FFh=Not supported), DATA04=Cooling process, DATA05=Power On/Off process, DATA06=Operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Standby Power saving, 10h=Network standby)."

  - id: input_status_request
    label: 078-3 INPUT STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    notes: Response 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>. DATA01=signal switch process, DATA02=signal list number (-1), DATA03-04=selection signal type, DATA05=signal list type, DATA06=test pattern display, DATA09=content displayed.

  - id: mute_status_request
    label: 078-4 MUTE STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    notes: Response 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>. DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display.

  - id: model_name_request
    label: 078-5 MODEL NAME REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    notes: Response 20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>. DATA01-32=Model name (NUL terminated).

  - id: cover_status_request
    label: 078-6 COVER STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    notes: Response 20h 85h <ID1> <ID2> 01h <DATA01> <CKS>. DATA01: 00h=Normal (cover opened), 01h=Cover closed.

  - id: freeze_control
    label: 079 FREEZE CONTROL
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=Freeze ON, 02h=Freeze OFF"

  - id: information_string_request
    label: 084 INFORMATION STRING REQUEST
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: 097-8 ECO MODE REQUEST
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    notes: Response 23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>. Value list in Appendix - UNRESOLVED.

  - id: lan_projector_name_request
    label: 097-45 LAN PROJECTOR NAME REQUEST
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    notes: Response 23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>. DATA01-17=Projector name (NUL terminated).

  - id: lan_mac_address_request_2
    label: 097-155 LAN MAC ADDRESS STATUS REQUEST2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    notes: Response 23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>. DATA01-06=MAC address.

  - id: pip_pbp_request
    label: 097-198 PIP/PICTURE BY PICTURE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: 097-243-1 EDGE BLENDING MODE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    notes: Response 23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>. DATA01: 00h=OFF, 01h=ON.

  - id: eco_mode_set
    label: 098-8 ECO MODE SET
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value. UNRESOLVED: value list in Appendix 'Supplementary Information by Command' - not in source."

  - id: lan_projector_name_set
    label: 098-45 LAN PROJECTOR NAME SET
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: DATA01_to_DATA16
        type: string
        description: Projector name, up to 16 bytes (NUL terminated by trailing 00h)

  - id: pip_pbp_set
    label: 098-198 PIP/PICTURE BY PICTURE SET
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: see Appendix (UNRESOLVED)."

  - id: edge_blending_mode_set
    label: 098-243-1 EDGE BLENDING MODE SET
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: 305-1 BASE MODEL TYPE REQUEST
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    notes: Response 20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>. DATA01-02 / DATA12-13=base model type, DATA03-11=model name. UNRESOLVED: base model type value list in Appendix.

  - id: serial_number_request
    label: 305-2 SERIAL NUMBER REQUEST
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    notes: Response 20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>. DATA01-16=serial number (NUL terminated).

  - id: basic_information_request
    label: 305-3 BASIC INFORMATION REQUEST
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    notes: Response 20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>. DATA01=operation status, DATA02=content displayed, DATA03-05=signal selection, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status.

  - id: audio_select_set
    label: 319-10 AUDIO SELECT SET
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal (value list in Appendix - UNRESOLVED)"
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: ack
    type: ack
    description: "Successful ACK frame: 2Xh/20h/21h/22h/23h prefix + command byte + <ID1> <ID2> + LEN + data + <CKS>. No ERR bytes."
  - id: error_response
    type: error
    description: "Error frame: AXh/A0h/A1h/A2h/A3h prefix + command byte + <ID1> <ID2> + 02h + <ERR1> <ERR2> <CKS>. ERR1/ERR2 per error code list."
  - id: input_switch_error
    type: error
    description: "For 018/050: response DATA01=FFh indicates ended with error (no signal switch made)."

error_codes:
  - err1: 00h
    err2: 00h
    description: Command not recognized
  - err1: 00h
    err2: 01h
    description: Command not supported by model
  - err1: 01h
    err2: 00h
    description: Specified value invalid
  - err1: 01h
    err2: 01h
    description: Specified input terminal invalid
  - err1: 01h
    err2: 02h
    description: Specified language invalid
  - err1: 02h
    err2: 00h
    description: Memory allocation error
  - err1: 02h
    err2: 02h
    description: Memory in use
  - err1: 02h
    err2: 03h
    description: Specified value cannot be set
  - err1: 02h
    err2: 04h
    description: Forced onscreen mute on
  - err1: 02h
    err2: 06h
    description: Viewer error
  - err1: 02h
    err2: 07h
    description: No signal
  - err1: 02h
    err2: 08h
    description: Test pattern or filter displayed
  - err1: 02h
    err2: 09h
    description: No PC card inserted
  - err1: 02h
    err2: 0Ah
    description: Memory operation error
  - err1: 02h
    err2: 0Ch
    description: Entry list displayed
  - err1: 02h
    err2: 0Dh
    description: Command cannot be accepted because power is off
  - err1: 02h
    err2: 0Eh
    description: Command execution failed
  - err1: 02h
    err2: 0Fh
    description: No authority for operation
  - err1: 03h
    err2: 00h
    description: Specified gain number incorrect
  - err1: 03h
    err2: 01h
    description: Specified gain invalid
  - err1: 03h
    err2: 02h
    description: Adjustment failed
```

## Variables
```yaml
# Source uses parameterized DATA bytes per command rather than named variables.
# Settable parameters are expressed as params within Actions entries above.
# UNRESOLVED: no separate named-variable model in source.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are ACKs or error
# responses to issued commands.
# UNRESOLVED: not applicable per source - no events described.
```

## Macros
```yaml
# Source documents no multi-step command sequences as named macros.
# UNRESOLVED: not applicable per source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # 016: cooling time blocks other commands; recommend confirm before off
  - shutter_close  # 051: closes lens shutter, blocks light output
interlocks:
  - "015 POWER ON: no other command accepted while power-on in progress"
  - "016 POWER OFF: no other command accepted during power-off including cooling time"
  - "009 ERROR STATUS: bit-field flags include cover error, fan error, temperature error, lamp errors, interlock switch open, lens not installed properly - these are device-side safety interlocks reported via query, not enforced by protocol"
# UNRESOLVED: source contains no explicit power-on sequencing procedure or
# mandatory pre-flight interlock sequence beyond what is captured above.
```

## Notes
- Communication method: RS-232C-compliant serial (D-SUB 9P PC CONTROL port, cross cable) and wired/wireless LAN (TCP port 7142).
- RS-232C pin assignment (D-SUB 9P): pin 2=RxD, pin 3=TxD, pin 5=GND, pin 7=RTS, pin 8=CTS.
- LAN port RJ-45: pins 1/2=TD±, pins 3/6=RD±.
- Baud rate is configurable on the projector: 115200 / 38400 / 19200 / 9600 / 4800 bps. Spec picks 115200 as representative default; controller must match device setting.
- Frame format: leading byte (00h–03h) + command bytes + `<ID1>` (control ID from projector) + `<ID2>` (model code, model-specific) + `LEN` (data length) + DATA bytes + `<CKS>` (checksum = low-order 8 bits of sum of all preceding bytes).
- Response leading byte is in the AXh range (A0h–A3h) on error; 20h–23h range on success.
- Usage time / remaining life queries update at 1-minute intervals despite 1-second resolution.
- 050 REMOTE KEY CODE enumerates 25 key codes from the key code list — all listed inline in that action's notes.

<!-- UNRESOLVED: firmware version range not stated in source. -->
<!-- UNRESOLVED: model code (ID2) value for LED E018I not stated — must be read from device. -->
<!-- UNRESOLVED: control ID (ID1) default not stated — set per projector. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values (018, 319-10), base model types (078-1, 305-1), eco mode values (097-8, 098-8), aspect values (030-12), sub input values (097-198, 098-198) — appendix not present in refined source. -->
<!-- UNRESOLVED: full DATA01 lens-target list for 053 LENS CONTROL (only 06h=Periphery Focus shown). -->
<!-- UNRESOLVED: flow_control not explicitly stated (source lists only baud/data/parity/stop/mode). -->
````

Spec done. 53 actions, all commands verbatim. No payload invented. Marked UNRESOLVED for missing appendix + ID1/ID2 + lens target list + flow_control.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:29:57.178Z
last_checked_at: 2026-06-17T20:10:09.124Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:10:09.124Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source commands; transport parameters verified; full bidirectional coverage achieved. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model firmware version range not stated in source. Model code (ID2) value not stated — must be read from device. Default control ID (ID1) not stated. Appendix \"Supplementary Information by Command\" (input terminal values, base model types, eco mode values, aspect values, sub input values) not present in refined source."
- "flow control not stated; full-duplex communication mode noted"
- "appendix not in source.\""
- "value list in Appendix 'Supplementary Information by Command' - not in source.\""
- "base model type value list in Appendix."
- "no separate named-variable model in source."
- "not applicable per source - no events described."
- "not applicable per source."
- "source contains no explicit power-on sequencing procedure or"
- "firmware version range not stated in source."
- "model code (ID2) value for LED E018I not stated — must be read from device."
- "control ID (ID1) default not stated — set per projector."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values (018, 319-10), base model types (078-1, 305-1), eco mode values (097-8, 098-8), aspect values (030-12), sub input values (097-198, 098-198) — appendix not present in refined source."
- "full DATA01 lens-target list for 053 LENS CONTROL (only 06h=Periphery Focus shown)."
- "flow_control not explicitly stated (source lists only baud/data/parity/stop/mode)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
