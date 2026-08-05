---
spec_id: admin/sharp-nec-p721q-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P721Q W Projector Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp P721Q W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp P721Q W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:25:01.536Z
last_checked_at: 2026-07-22T00:50:15.680Z
generated_at: 2026-07-22T00:50:15.680Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact product family naming and firmware version not stated in the refined source. ID2 (model code) value for this specific model is not stated; must be sourced from the device's \"control ID\" setting. Input terminal byte values, aspect values, eco mode values, base model type values, and sub-input values are referenced to an external \"Appendix / Supplementary Information by Command\" not present in this source."
  - "full value set referenced to external Appendix, not in source"
  - "value list in external Appendix"
  - "value list in external Appendix 'Supplementary Information by Command'"
  - "sub-input values in external Appendix"
  - "no audio-select get request in source"
  - "source describes only request/response semantics; no unsolicited"
  - "source documents no multi-step command sequences."
  - "source contains no explicit power-on sequencing procedure, voltage/current specs, or formal interlock procedure text beyond the command-blocking notes above."
  - "firmware version compatibility not stated in source."
  - "ID2 model code for the P721Q W not stated; must be read from device."
  - "external \"Supplementary Information by Command\" Appendix not in source — input terminal / aspect / eco mode / base model / sub-input enum values missing."
  - "053 LENS CONTROL target codes other than 06h (Periphery Focus) not enumerated in this source."
  - "factory-default baud rate not stated; five values are supported."
  - "authority model implied by error code 02h 0Fh but no auth procedure documented."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:50:15.680Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim in source with correct command bytes; transport fully verified; one-to-one coverage of source command catalogue. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P721Q W Projector Control Spec

## Summary
Sharp/NEC P721Q W is a projector controllable over RS-232C serial (PC CONTROL port, D-SUB 9P) and wired/wireless LAN. The protocol is binary, framed with `20h/02h/01h/03h`-prefixed messages carrying a model code (ID2), variable-length data, and a trailing low-byte checksum. This spec covers 53 distinct commands: power, input switching, mutes, picture/volume/aspect/lamp adjust, lens shift/zoom/focus/memory, shutter, freeze, eco mode, edge blending, PiP/PbP, and a broad set of status/information queries. TCP port 7142 is used for LAN control.

<!-- UNRESOLVED: exact product family naming and firmware version not stated in the refined source. ID2 (model code) value for this specific model is not stated; must be sourced from the device's "control ID" setting. Input terminal byte values, aspect values, eco mode values, base model type values, and sub-input values are referenced to an external "Appendix / Supplementary Information by Command" not present in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as supported; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex"; RTS/CTS pins present but flow control mode not stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands
  - queryable       # inferred: many status/information request commands
  - levelable       # inferred: PICTURE ADJUST, VOLUME ADJUST, LENS CONTROL, LAMP ADJUST
  - routable        # inferred: INPUT SW CHANGE command
```

## Actions
```yaml
# Frame convention (per source §2.1):
#   Command:  <MsgType> <CMD> <00h> <00h> <LEN> [data...] <CKS>
#   Ack (success): <MsgType+20h> <CMD> <ID1> <ID2> <LEN> [data...] <CKS>
#   Ack (error):   <MsgType+0A0h?> <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Checksum: low byte of the sum of all preceding bytes (including the leading type byte).
# ID1 = control ID set on projector; ID2 = model code (varies by model).

actions:

  - id: error_status_request
    label: "009. Error Status Request"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitfields (cover/fan/temp/lamp/etc.)."

  - id: power_on
    label: "015. Power On"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on is in progress."

  - id: power_off
    label: "016. Power Off"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. Input SW Change"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal selector. Example: 06h = Video port. Full value list is in external Appendix 'Supplementary Information by Command' - UNRESOLVED here."
    notes: "Response DATA01 = FFh means ended with error (no signal switch made)."

  - id: picture_mute_on
    label: "020. Picture Mute On"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: picture_mute_off
    label: "021. Picture Mute Off"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: "022. Sound Mute On"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input/video switch or volume adjustment."

  - id: sound_mute_off
    label: "023. Sound Mute Off"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: "024. Onscreen Mute On"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: onscreen_mute_off
    label: "025. Onscreen Mute Off"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. Picture Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example set brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example set brightness to -10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

  - id: volume_adjust
    label: "030-2. Volume Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. Aspect Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. Full value list is in external Appendix 'Supplementary Information by Command' - UNRESOLVED here."

  - id: other_adjust_lamp_light
    label: "030-15. Other Adjust (Lamp/Light Adjust)"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Fixed 96h (LAMP ADJUST / LIGHT ADJUST)."
      - name: DATA02
        type: byte
        description: "Fixed FFh (target sub-code per source table)."
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  - id: information_request
    label: "037. Information Request"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: "037-3. Filter Usage Information Request"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. Lamp Information Request 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)."
      - name: DATA02
        type: byte
        description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%). Negative if past replacement deadline."
    notes: "Values reflect eco mode if enabled. Updated at 1-minute intervals."

  - id: carbon_savings_information_request
    label: "037-6. Carbon Savings Information Request"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "DATA02-05 = kilograms (max 99999), DATA06-09 = milligrams (max 999999)."

  - id: remote_key_code
    label: "050. Remote Key Code"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (see key code list)."
      - name: DATA02
        type: byte
        description: "Key code high byte (see key code list)."
    notes: |
      Key code list (DATA01 / DATA02 / Key name):
      02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP,
      08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT,
      0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE,
      29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1,
      51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE,
      A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO.
      Response DATA01=FFh means ended with error. Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h.

  - id: shutter_close
    label: "051. Shutter Close"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "052. Shutter Open"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: "053. Lens Control"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target. 06h = Periphery Focus. (Other target codes not enumerated in this source.)"
      - name: DATA02
        type: byte
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
    notes: "Send 00h after 7Fh/81h to stop continuous drive. Same command may be reissued during drive without stopping."

  - id: lens_control_request
    label: "053-1. Lens Control Request"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens target selector (same coding as 053 LENS CONTROL)."
    notes: "Returns upper/lower limit and current value (DATA02-07, low/high byte pairs)."

  - id: lens_control_2
    label: "053-2. Lens Control 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "FFh=Stop (Adjustment mode/value ignored). Other values per lens target (coding not fully enumerated in source)."
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  - id: lens_memory_control
    label: "053-3. Lens Memory Control"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: "053-4. Reference Lens Memory Control"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Operates on the profile number selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. Lens Memory Option Request"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    notes: "Response DATA02: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. Lens Memory Option Set"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON."

  - id: lens_information_request
    label: "053-7. Lens Information Request"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. Lens Profile Set"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request
    label: "053-11. Lens Profile Request"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: "060-1. Gain Parameter Request 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower limits, default, current, wide/narrow adjustment widths."

  - id: setting_request
    label: "078-1. Setting Request"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05)."

  - id: running_status_request
    label: "078-2. Running Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. Input Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (-1), selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. Mute Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute state and OSD display state."

  - id: model_name_request
    label: "078-5. Model Name Request"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns NUL-terminated model name string (DATA01-32)."

  - id: cover_status_request
    label: "078-6. Cover Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. Freeze Control"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off."

  - id: information_string_request
    label: "084. Information String Request"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency."
    notes: "Returns NUL-terminated label/info string with length prefix."

  - id: eco_mode_request
    label: "097-8. Eco Mode Request"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns DATA01 = eco mode value (full value list in external Appendix - UNRESOLVED)."

  - id: lan_projector_name_request
    label: "097-45. LAN Projector Name Request"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns NUL-terminated projector name (DATA01-17)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC Address Status Request 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_pbp_request
    label: "097-198. PIP/Picture by Picture Request"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    notes: "Returns the corresponding setting value (MODE: 00h=PIP/01h=PbP; START POSITION: TL/TR/BL/BR; etc.)."

  - id: edge_blending_mode_request
    label: "097-243-1. Edge Blending Mode Request"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. Eco Mode Set"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value (full value list in external Appendix - UNRESOLVED)."

  - id: lan_projector_name_set
    label: "098-45. LAN Projector Name Set"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Projector name byte 1 (up to 16 bytes)."
      - name: DATA02
        type: byte
        description: "Projector name byte 2."
      - name: DATA03
        type: byte
        description: "Projector name byte 3."
      - name: DATA04
        type: byte
        description: "Projector name byte 4."
      - name: DATA05
        type: byte
        description: "Projector name byte 5."
      - name: DATA06
        type: byte
        description: "Projector name byte 6."
      - name: DATA07
        type: byte
        description: "Projector name byte 7."
      - name: DATA08
        type: byte
        description: "Projector name byte 8."
      - name: DATA09
        type: byte
        description: "Projector name byte 9."
      - name: DATA10
        type: byte
        description: "Projector name byte 10."
      - name: DATA11
        type: byte
        description: "Projector name byte 11."
      - name: DATA12
        type: byte
        description: "Projector name byte 12."
      - name: DATA13
        type: byte
        description: "Projector name byte 13."
      - name: DATA14
        type: byte
        description: "Projector name byte 14."
      - name: DATA15
        type: byte
        description: "Projector name byte 15."
      - name: DATA16
        type: byte
        description: "Projector name byte 16."
    notes: "Up to 16 bytes, NUL-terminated (trailing 00h already in template)."

  - id: pip_pbp_set
    label: "098-198. PIP/Picture by Picture Set"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: byte
        description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; sub-input value per external Appendix)."

  - id: edge_blending_mode_set
    label: "098-243-1. Edge Blending Mode Set"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: "305-1. Base Model Type Request"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name (DATA03-11), secondary type (DATA12-13)."

  - id: serial_number_request
    label: "305-2. Serial Number Request"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns NUL-terminated serial number string (DATA01-16)."

  - id: basic_information_request
    label: "305-3. Basic Information Request"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, displayed content, signal types, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. Audio Select Set"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal (full value list in external Appendix - UNRESOLVED)."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:

  - id: power_status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA06"

  - id: cooling_in_progress
    type: boolean
    source: "078-2 DATA04"

  - id: power_transition_in_progress
    type: boolean
    source: "078-2 DATA05"

  - id: picture_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA01"

  - id: sound_mute
    type: enum
    values: [off, on]
    source: "078-4 DATA02"

  - id: onscreen_mute
    type: enum
    values: [off, on]
    source: "078-4 DATA03"

  - id: forced_onscreen_mute
    type: enum
    values: [off, on]
    source: "078-4 DATA04"

  - id: freeze_status
    type: enum
    values: [off, on]
    source: "305-3 DATA09"

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    source: "078-6 COVER STATUS REQUEST DATA01"

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: "053-11 LENS PROFILE REQUEST DATA01"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST DATA01"

  - id: eco_mode
    type: enum
    values: []  # UNRESOLVED: full value set referenced to external Appendix, not in source
    source: "097-8 ECO MODE REQUEST DATA01"

  - id: error_status
    type: bitfield
    description: "12-byte error bitfield (DATA01-DATA12) covering cover/fan/temperature/power/lamp/interlock/system errors."
    source: "009 ERROR STATUS REQUEST"

  - id: lamp_usage_seconds
    type: integer
    source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=01h)"

  - id: lamp_remaining_life_percent
    type: integer
    source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=04h). May be negative past replacement deadline."

  - id: filter_usage_seconds
    type: integer
    source: "037-3 FILTER USAGE INFORMATION REQUEST DATA01-04"

  - id: projector_name
    type: string
    source: "097-45 LAN PROJECTOR NAME REQUEST DATA01-17"

  - id: mac_address
    type: string
    source: "097-155 LAN MAC ADDRESS STATUS REQUEST 2 DATA01-06"

  - id: model_name
    type: string
    source: "078-5 MODEL NAME REQUEST DATA01-32"

  - id: serial_number
    type: string
    source: "305-2 SERIAL NUMBER REQUEST DATA01-16"

  - id: horizontal_sync_frequency
    type: string
    source: "084 INFORMATION STRING REQUEST DATA01=03h"

  - id: vertical_sync_frequency
    type: string
    source: "084 INFORMATION STRING REQUEST DATA01=04h"

  - id: signal_switch_in_progress
    type: boolean
    source: "078-3 INPUT STATUS REQUEST DATA01"

  - id: signal_list_number
    type: integer
    description: "Returned value is 1 less than the practical number (add 1 to use). -1 (FFh) = not supported."
    source: "078-3 INPUT STATUS REQUEST DATA02"

  - id: selection_signal_type_1
    type: enum
    values: [s1, s2, s3, s4, s5]
    source: "078-3 INPUT STATUS REQUEST DATA03 / 305-3 DATA03"

  - id: selection_signal_type_2
    type: enum
    values: [computer, video, s_video, component, reserved, viewer_1_5, dvi_d, hdmi, displayport, viewer_6_10]
    description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=Not Source Input."
    source: "078-3 INPUT STATUS REQUEST DATA04 / 305-3 DATA04"

  - id: signal_list_type
    type: enum
    values: [default, user]
    source: "078-3 INPUT STATUS REQUEST DATA05"

  - id: test_pattern_displayed
    type: boolean
    source: "078-3 INPUT STATUS REQUEST DATA06"

  - id: content_displayed
    type: enum
    values: [video_signal, no_signal, viewer, test_pattern, lan_displayed, test_pattern_user, signal_switching]
    description: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN, 05h=Test pattern (user), 10h=Signal being switched."
    source: "078-3 INPUT STATUS REQUEST DATA09 / 305-3 DATA02"

  - id: display_signal_type
    type: enum
    values: [ntsc358, ntsc443, pal, pal60, secam, bw60, bw50, palnm, ntsc358_lbx, ntsc358_sqz, component_60hz, component_50hz, unknown, ntsc, pal_m, pal_l, not_video_input]
    description: "Effective only when selection_signal_type_2 is VIDEO (02h) or S-VIDEO (03h). FFh=Not Video Input."
    source: "305-3 BASIC INFORMATION REQUEST DATA05"

  - id: sound_function_available
    type: boolean
    source: "078-1 SETTING REQUEST DATA04"

  - id: profile_timer_function
    type: enum
    values: [not_available, clock_function, sleep_timer_function, clock_and_sleep_timer]
    source: "078-1 SETTING REQUEST DATA05"
```

## Variables
```yaml
variables:

  - id: brightness
    type: integer
    signed: true
    set: "030-1 PICTURE ADJUST (DATA01=00h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"

  - id: contrast
    type: integer
    signed: true
    set: "030-1 PICTURE ADJUST (DATA01=01h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=01h)"

  - id: color
    type: integer
    signed: true
    set: "030-1 PICTURE ADJUST (DATA01=02h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=02h)"

  - id: hue
    type: integer
    signed: true
    set: "030-1 PICTURE ADJUST (DATA01=03h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=03h)"

  - id: sharpness
    type: integer
    signed: true
    set: "030-1 PICTURE ADJUST (DATA01=04h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=04h)"

  - id: volume
    type: integer
    set: "030-2 VOLUME ADJUST"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"

  - id: lamp_light_adjust
    type: integer
    signed: true
    set: "030-15 OTHER ADJUST (DATA01=96h)"
    get: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=96h)"

  - id: aspect
    type: enum
    values: []  # UNRESOLVED: value list in external Appendix
    set: "030-12 ASPECT ADJUST"

  - id: lens_position
    type: integer
    description: "Per-target lens position (zoom/focus/shift/periphery focus)."
    set: "053 LENS CONTROL / 053-2 LENS CONTROL 2"
    get: "053-1 LENS CONTROL REQUEST"

  - id: pip_pbp_mode
    type: enum
    values: [pip, picture_by_picture]
    set: "098-198 PIP/PBP SET (DATA01=00h)"
    get: "097-198 PIP/PBP REQUEST (DATA01=00h)"

  - id: pip_pbp_start_position
    type: enum
    values: [top_left, top_right, bottom_left, bottom_right]
    set: "098-198 PIP/PBP SET (DATA01=01h)"
    get: "097-198 PIP/PBP REQUEST (DATA01=01h)"

  - id: lens_memory_load_by_signal
    type: enum
    values: [off, on]
    set: "053-6 LENS MEMORY OPTION SET (DATA01=00h)"
    get: "053-5 LENS MEMORY OPTION REQUEST (DATA01=00h)"

  - id: lens_memory_forced_mute
    type: enum
    values: [off, on]
    set: "053-6 LENS MEMORY OPTION SET (DATA01=01h)"
    get: "053-5 LENS MEMORY OPTION REQUEST (DATA01=01h)"

  - id: eco_mode
    type: enum
    values: []  # UNRESOLVED: value list in external Appendix 'Supplementary Information by Command'
    set: "098-8 ECO MODE SET"
    get: "097-8 ECO MODE REQUEST"

  - id: projector_name
    type: string
    description: "Up to 16 bytes, NUL-terminated."
    set: "098-45 LAN PROJECTOR NAME SET"
    get: "097-45 LAN PROJECTOR NAME REQUEST"

  - id: pip_pbp_sub_input_1
    type: enum
    values: []  # UNRESOLVED: sub-input values in external Appendix
    set: "098-198 PIP/PBP SET (DATA01=02h)"
    get: "097-198 PIP/PBP REQUEST (DATA01=02h)"

  - id: pip_pbp_sub_input_2
    type: enum
    values: []  # UNRESOLVED: sub-input values in external Appendix
    set: "098-198 PIP/PBP SET (DATA01=09h)"
    get: "097-198 PIP/PBP REQUEST (DATA01=09h)"

  - id: pip_pbp_sub_input_3
    type: enum
    values: []  # UNRESOLVED: sub-input values in external Appendix
    set: "098-198 PIP/PBP SET (DATA01=0Ah)"
    get: "097-198 PIP/PBP REQUEST (DATA01=0Ah)"

  - id: audio_select
    type: enum
    values: [terminal_specified, bnc, computer]
    description: "DATA02 setting value for the input terminal in DATA01. Set only; no dedicated get request documented in source."
    set: "319-10 AUDIO SELECT SET"
    get: null  # UNRESOLVED: no audio-select get request in source
```

## Events
```yaml
events: []
# UNRESOLVED: source describes only request/response semantics; no unsolicited
# notifications are documented. The device appears strictly poll-driven.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: "While this command is turning off the power (including the cooling time), no other command can be accepted." Cooling lockout is safety-relevant.
  - power_on   # source: "While this command is turning on the power, no other command can be accepted."
interlocks:
  - "Power on/off commands block all other commands for the duration of the transition (incl. cooling time)."
  - "Error bitfield (009) reports interlock switch open (DATA09 Bit1) and cover errors (DATA01 Bit0, DATA03 Bit5) that may block operation."
  - "02h 0Fh 'There is no authority necessary for the operation' error code implies an authority model whose procedure is not documented in source."
# UNRESOLVED: source contains no explicit power-on sequencing procedure, voltage/current specs, or formal interlock procedure text beyond the command-blocking notes above.
```

## Notes
- **Frame layout** (§2.1): all commands/responses are hexadecimal byte sequences. A typical command is `<MsgType> <CMD> 00h 00h <LEN> [data...] <CKS>`. A typical success acknowledgement reuses the command byte with `<MsgType+20h>` and includes `<ID1> <ID2>` (control ID + model code) after the command byte. Error responses use a `Axh` prefix and a 2-byte body `<ERR1> <ERR2>`.
- **Checksum** (§2.2): sum of all preceding bytes, take low-order 8 bits. Worked example: `20h 81h 01h 60h 01h 00h <CKS>` → sum = 103h → CKS = 03h.
- **ID1 (Control ID)** is whatever the projector's "control ID" is set to. **ID2 (Model code)** is model-specific and not stated in this source for the P721Q W — UNRESOLVED.
- **Baud rate** has five supported values (115200/38400/19200/9600/4800); the source does not state which is the factory default. 9600 is used as a placeholder above; verify against the device.
- **Wireless LAN** control is mentioned but specifics are deferred to the wireless LAN unit's own manual — UNRESOLVED.
- **External Appendix** referenced repeatedly ("Supplementary Information by Command") is not present in this refined source. It contains the canonical byte values for: input terminals, aspect, eco mode, base model types, and PiP/PbP sub-inputs. Treat all such enum lists above as UNRESOLVED until the Appendix is sourced.
- **Two-lamp models only**: 037-4 LAMP INFORMATION REQUEST 3 with DATA01=01h (Lamp 2) is effective only on two-lamp projector models.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: ID2 model code for the P721Q W not stated; must be read from device. -->
<!-- UNRESOLVED: external "Supplementary Information by Command" Appendix not in source — input terminal / aspect / eco mode / base model / sub-input enum values missing. -->
<!-- UNRESOLVED: 053 LENS CONTROL target codes other than 06h (Periphery Focus) not enumerated in this source. -->
<!-- UNRESOLVED: factory-default baud rate not stated; five values are supported. -->
<!-- UNRESOLVED: authority model implied by error code 02h 0Fh but no auth procedure documented. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:25:01.536Z
last_checked_at: 2026-07-22T00:50:15.680Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:50:15.680Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim in source with correct command bytes; transport fully verified; one-to-one coverage of source command catalogue. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact product family naming and firmware version not stated in the refined source. ID2 (model code) value for this specific model is not stated; must be sourced from the device's \"control ID\" setting. Input terminal byte values, aspect values, eco mode values, base model type values, and sub-input values are referenced to an external \"Appendix / Supplementary Information by Command\" not present in this source."
- "full value set referenced to external Appendix, not in source"
- "value list in external Appendix"
- "value list in external Appendix 'Supplementary Information by Command'"
- "sub-input values in external Appendix"
- "no audio-select get request in source"
- "source describes only request/response semantics; no unsolicited"
- "source documents no multi-step command sequences."
- "source contains no explicit power-on sequencing procedure, voltage/current specs, or formal interlock procedure text beyond the command-blocking notes above."
- "firmware version compatibility not stated in source."
- "ID2 model code for the P721Q W not stated; must be read from device."
- "external \"Supplementary Information by Command\" Appendix not in source — input terminal / aspect / eco mode / base model / sub-input enum values missing."
- "053 LENS CONTROL target codes other than 06h (Periphery Focus) not enumerated in this source."
- "factory-default baud rate not stated; five values are supported."
- "authority model implied by error code 02h 0Fh but no auth procedure documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
