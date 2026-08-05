---
spec_id: admin/sharp-nec-np-02hd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-02HD Control Spec"
manufacturer: Sharp/NEC
model_family: NP-02HD
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-02HD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-19T06:03:02.732Z
last_checked_at: 2026-07-22T00:50:12.663Z
generated_at: 2026-07-22T00:50:12.663Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers command set for family of projectors (multi-model reference); exact NP-02HD-specific subset not enumerated. Appendix \"Supplementary Information by Command\" not present in refined excerpt — input terminal values, base model type values, eco mode values, sub input values referenced but not listed here."
  - "enum values live in Appendix not present in refined excerpt"
  - "source describes no multi-step command sequences."
  - "source mentions cover/temperature/fan/lamp error bits but no"
  - "NP-02HD-specific subset of commands not identified."
  - "Appendix \"Supplementary Information by Command\" tables not in refined excerpt — input terminal / eco mode / sub input / aspect / base model type enums missing."
  - "firmware version compatibility not stated."
  - "full 053 LENS CONTROL DATA01 target enumeration not in source (only 06h=Periphery Focus listed)."
  - "full 030-15 OTHER ADJUST DATA01/02 target matrix not in source (only 96h/FFh=LAMP/LIGHT ADJUST listed)."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:50:12.663Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim hex sequences in source; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-19
---

# Sharp/NEC NP-02HD Control Spec

## Summary
Sharp/NEC NP-02HD projector. Hex frame protocol over RS-232C serial (D-SUB 9P cross cable) and TCP/IP (wired/wireless LAN, port 7142). 53 commands covering power, input switch, mutes, picture/volume/aspect/gain adjust, shutter, lens control + memory, status/information queries, remote key emulation, eco mode, PIP/PbP, edge blending, audio select. BDT140013 manual rev 7.1.

<!-- UNRESOLVED: source covers command set for family of projectors (multi-model reference); exact NP-02HD-specific subset not enumerated. Appendix "Supplementary Information by Command" not present in refined excerpt — input terminal values, base model type values, eco mode values, sub input values referenced but not listed here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source says full-duplex; specific flow control not stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF
  - routable        # inferred: 018 INPUT SW CHANGE, audio select, PIP sub-input
  - queryable       # inferred: many 037/078/097/305 request commands
  - levelable       # inferred: 030-1 PICTURE, 030-2 VOLUME, 030-15 OTHER ADJUST
  - shutterable     # inferred: 051/052 SHUTTER CLOSE/OPEN (lens shutter)
```

## Actions
```yaml
# Each hex frame is command verbatim from source. Frame format:
#   <HDR> <CMD> <ID1 ID2> <LEN> <DATA...> <CKS>
# HDR byte reflects operation class: 00h/01h/02h/03h = request/command,
# 20h/21h/22h/23h = ack response, A0h/A1h/A2h/A3h = error response.
# CKS = low byte of sum of all preceding bytes (see §2.2 example).
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# For command frames, the leading literal bytes shown below are the
# verbatim payload - ID1/ID2/CKS are computed at send time per §2.2.

- id: error_status_request
  label: 009 Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Returns DATA01-DATA12 bitfield. Bits encode cover/fan/temp/lamp/mirror/interlock errors. See §3.1 table.

- id: power_on
  label: 015 Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: No other command accepted during power-on sequence.

- id: power_off
  label: 016 Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off incl. cooling time.

- id: input_sw_change
  label: 018 Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (see Appendix "Supplementary Information by Command" - not in refined excerpt). Source example: 06h = video port.
  notes: "Ack response DATA01=FFh means ended with error (no switch)."

- id: picture_mute_on
  label: 020 Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Auto-released on input switch or video signal switch.

- id: picture_mute_off
  label: 021 Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: 022 Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Auto-released on input switch / video signal switch / volume adjustment.

- id: sound_mute_off
  label: 023 Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: 024 Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Auto-released on input switch or video signal switch.

- id: onscreen_mute_off
  label: 025 Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: 030-1 Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value low 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high 8 bits
  notes: "Source example: brightness=10 → 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10 → ...F6h FFh 0Ch."

- id: volume_adjust
  label: 030-2 Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value low 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high 8 bits
  notes: "Source example: volume=10 → 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: 030-12 Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value (see Appendix - not in refined excerpt)

- id: other_adjust
  label: 030-15 Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Fixed FFh per source table"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value low 8 bits
    - name: DATA05
      type: integer
      description: Adjustment value high 8 bits

- id: information_request
  label: 037 Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns 98-byte block. DATA01-49=Projector name; DATA83-86=Lamp usage time (seconds); DATA87-90=Filter usage time (seconds).

- id: filter_usage_information_request
  label: 037-3 Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: DATA01-04=Filter usage time (seconds); DATA05-08=Filter alarm start time (seconds). "-1" returned if undefined.

- id: lamp_information_request_3
  label: 037-4 Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
  notes: Reflects eco mode if enabled. Remaining life is negative if replacement deadline exceeded.

- id: carbon_savings_information_request
  label: 037-6 Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: DATA02-05=kg (max 99999), DATA06-09=mg (max 999999).

- id: remote_key_code
  label: 050 Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list in notes)"
    - name: DATA02
      type: integer
      description: Key code high byte
  notes: "Key code list (DATA01 DATA02 = name): 02h 00h=POWER ON; 03h 00h=POWER OFF; 05h 00h=AUTO; 06h 00h=MENU; 07h 00h=UP; 08h 00h=DOWN; 09h 00h=RIGHT; 0Ah 00h=LEFT; 0Bh 00h=ENTER; 0Ch 00h=EXIT; 0Dh 00h=HELP; 0Fh 00h=MAGNIFY UP; 10h 00h=MAGNIFY DOWN; 13h 00h=MUTE; 29h 00h=PICTURE; 4Bh 00h=COMPUTER1; 4Ch 00h=COMPUTER2; 4Fh 00h=VIDEO1; 51h 00h=S-VIDEO1; 84h 00h=VOLUME UP; 85h 00h=VOLUME DOWN; 8Ah 00h=FREEZE; A3h 00h=ASPECT; D7h 00h=SOURCE; EEh 00h=LAMP MODE/ECO. Source example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: shutter_close
  label: 051 Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: 052 Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: 053 Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Source table lists 06h = Periphery Focus (other target values not enumerated in refined excerpt)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop; 01h=drive +1s; 02h=drive +0.5s; 03h=drive +0.25s; 7Fh=drive + continuous; 81h=drive - continuous; FDh=drive -0.25s; FEh=drive -0.5s; FFh=drive -1s"
  notes: After 7Fh/81h, send 00h to stop. Lens can be re-commanded without stop while driving.

- id: lens_control_request
  label: 053-1 Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens adjustment target (same target set as 053)
  notes: Response returns upper/lower limit + current value (16-bit LE pairs).

- id: lens_control_2
  label: 053-2 Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop (skips mode/value), otherwise adjustment target"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value low 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high 8 bits

- id: lens_memory_control
  label: 053-3 Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: 053-4 Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Operates on profile selected via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: 053-5 Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: Response DATA02: 00h=OFF, 01h=ON.

- id: lens_memory_option_set
  label: 053-6 Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: 053-7 Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Response DATA01 bitfield - Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V); 0=Stop, 1=During operation. Bits 5-7 reserved.

- id: lens_profile_set
  label: 053-10 Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: 053-11 Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Response DATA01 - 00h=Profile 1, 01h=Profile 2.

- id: gain_parameter_request_3
  label: 060-1 Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  notes: Response 16-byte block - status, upper/lower/default/current (16-bit LE), wide/narrow adjustment widths, default validity. Source example (brightness query): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh.

- id: setting_request
  label: 078-1 Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Response DATA01-03=Base model type; DATA04=Sound function (00h=No, 01h=Yes); DATA05=Profile number (clock/sleep timer).

- id: running_status_request
  label: 078-2 Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Response DATA03=Power (00h=Standby, 01h=Power on); DATA04=Cooling; DATA05=Power On/Off process; DATA06=Operation status (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Power saving, 10h Network standby).

- id: input_status_request
  label: 078-3 Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Response 16-byte block - signal switch process, signal list number (practical = returned+1), selection signal type 1 & 2, signal list type, test pattern display, content displayed.

- id: mute_status_request
  label: 078-4 Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Response DATA01=Picture mute; DATA02=Sound mute; DATA03=Onscreen mute; DATA04=Forced onscreen mute; DATA05=Onscreen display. All 00h=Off, 01h=On.

- id: model_name_request
  label: 078-5 Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Response DATA01-32 = model name (NUL-terminated).

- id: cover_status_request
  label: 078-6 Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Response DATA01 - 00h=Normal (cover opened), 01h=Cover closed.

- id: freeze_control
  label: 079 Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: 084 Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: 097-8 Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns "Light mode" or "Lamp mode" depending on projector. Values in Appendix (not in refined excerpt).

- id: lan_projector_name_request
  label: 097-45 LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Response DATA01-17 = projector name (NUL-terminated).

- id: lan_mac_address_status_request_2
  label: 097-155 LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Response DATA01-06 = MAC address.

- id: pip_picture_by_picture_request
  label: 097-198 PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: MODE values 00h=PIP, 01h=PbP. START POSITION 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub input values in Appendix.

- id: edge_blending_mode_request
  label: 097-243-1 Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Response DATA01 - 00h=OFF, 01h=ON.

- id: eco_mode_set
  label: 098-8 Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value (see Appendix - not in refined excerpt)

- id: lan_projector_name_set
  label: 098-45 LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01-DATA16
      type: string
      description: Projector name (up to 16 bytes), NUL-terminated

- id: pip_picture_by_picture_set
  label: 098-198 PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01 - MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; sub input values in Appendix)"

- id: edge_blending_mode_set
  label: 098-243-1 Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: 305-1 Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Response 15-byte block - DATA01-02=Base model type; DATA03-11=Model name (NUL-terminated); DATA12-13=Base model type.

- id: serial_number_request
  label: 305-2 Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Response DATA01-16 = serial number (NUL-terminated).

- id: basic_information_request
  label: 305-3 Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Response 15-byte block - operation status, content displayed, signal types 1 & 2, display signal type, video/sound/onscreen mute, freeze status.

- id: audio_select_set
  label: 319-10 Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix - not in refined excerpt)
    - name: DATA02
      type: integer
      description: "Setting value: 00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Devices respond with structured hex frames (no unsolicited feedback).
# Response HDR: 20h/21h/22h/23h = success ack; A0h/A1h/A2h/A3h = error.
# Error frame carries ERR1/ERR2 code pair - see §2.4 list (22 codes incl.
# 00h 00h "unrecognized", 02h 0Dh "command cannot be accepted because
# power is off", 02h 0Fh "no authority", etc.).
- id: error_response
  type: enum
  values:
    - "00h 00h: command not recognized"
    - "00h 01h: command not supported by model"
    - "01h 00h: specified value invalid"
    - "01h 01h: specified input terminal invalid"
    - "01h 02h: specified language invalid"
    - "02h 00h: memory allocation error"
    - "02h 02h: memory in use"
    - "02h 03h: specified value cannot be set"
    - "02h 04h: forced onscreen mute on"
    - "02h 06h: viewer error"
    - "02h 07h: no signal"
    - "02h 08h: test pattern or filter displayed"
    - "02h 09h: no PC card inserted"
    - "02h 0Ah: memory operation error"
    - "02h 0Ch: entry list displayed"
    - "02h 0Dh: power is off"
    - "02h 0Eh: command execution failed"
    - "02h 0Fh: no authority"
    - "03h 00h: specified gain number incorrect"
    - "03h 01h: specified gain invalid"
    - "03h 02h: adjustment failed"
```

## Variables
```yaml
# Settable parameters surfaced via dedicated request/set command pairs.
# Per-value enumerations referenced to Appendix not present in refined excerpt.
- id: eco_mode
  type: enum  # UNRESOLVED: enum values live in Appendix not present in refined excerpt
  get: eco_mode_request
  set: eco_mode_set

- id: lan_projector_name
  type: string
  max_length: 16
  get: lan_projector_name_request
  set: lan_projector_name_set

- id: pip_pbp_mode
  type: enum
  values: [PIP, PICTURE_BY_PICTURE]
  get: pip_picture_by_picture_request
  set: pip_picture_by_picture_set

- id: pip_pbp_start_position
  type: enum
  values: [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]
  get: pip_picture_by_picture_request
  set: pip_picture_by_picture_set

- id: edge_blending_mode
  type: enum
  values: [OFF, ON]
  get: edge_blending_mode_request
  set: edge_blending_mode_set

- id: lens_profile
  type: enum
  values: [Profile_1, Profile_2]
  get: lens_profile_request
  set: lens_profile_set

- id: lens_memory_load_by_signal
  type: enum
  values: [OFF, ON]
  get: lens_memory_option_request
  set: lens_memory_option_set

- id: lens_memory_forced_mute
  type: enum
  values: [OFF, ON]
  get: lens_memory_option_request
  set: lens_memory_option_set
```

## Events
```yaml
# Source documents no unsolicited events. All output is response to command.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on sequence: no other command accepted during power-on (015)."
  - "Power off sequence: no other command accepted during cool-down (016)."
  - "DATA09 bit1 (interlock switch open) surfaced via 009 ERROR STATUS REQUEST - source notes bit but no recovery procedure."
# UNRESOLVED: source mentions cover/temperature/fan/lamp error bits but no
# interlock recovery sequence or power-on ordering requirement beyond the
# "no other command during power transitions" notes above.
```

## Notes
- Multi-model command reference (BDT140013 rev 7.1). NP-02HD is one of many supported projectors; not all commands may apply to NP-02HD specifically.
- Frame structure: header byte (00h/01h/02h/03h = command, 2Xh = ack, AXh = error) + command byte + ID1 (control ID set on projector) + ID2 (model code, varies) + LEN + DATA + CKS.
- Checksum = low byte of sum of all preceding bytes. Source example: 20h+81h+01h+60h+01h+00h = 103h → CKS=03h.
- Serial cable is cross (null-modem). Pin 2/3 cross, pin 7/8 cross, pin 5 GND straight.
- LAN port 7142 used for both send and receive.
- Source excerpt omits Appendix "Supplementary Information by Command" — input terminal codes, eco mode values, sub-input values, base model type values, aspect values are referenced but not enumerated.

<!-- UNRESOLVED: NP-02HD-specific subset of commands not identified. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" tables not in refined excerpt — input terminal / eco mode / sub input / aspect / base model type enums missing. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: full 053 LENS CONTROL DATA01 target enumeration not in source (only 06h=Periphery Focus listed). -->
<!-- UNRESOLVED: full 030-15 OTHER ADJUST DATA01/02 target matrix not in source (only 96h/FFh=LAMP/LIGHT ADJUST listed). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-19T06:03:02.732Z
last_checked_at: 2026-07-22T00:50:12.663Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:50:12.663Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim hex sequences in source; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers command set for family of projectors (multi-model reference); exact NP-02HD-specific subset not enumerated. Appendix \"Supplementary Information by Command\" not present in refined excerpt — input terminal values, base model type values, eco mode values, sub input values referenced but not listed here."
- "enum values live in Appendix not present in refined excerpt"
- "source describes no multi-step command sequences."
- "source mentions cover/temperature/fan/lamp error bits but no"
- "NP-02HD-specific subset of commands not identified."
- "Appendix \"Supplementary Information by Command\" tables not in refined excerpt — input terminal / eco mode / sub input / aspect / base model type enums missing."
- "firmware version compatibility not stated."
- "full 053 LENS CONTROL DATA01 target enumeration not in source (only 06h=Periphery Focus listed)."
- "full 030-15 OTHER ADJUST DATA01/02 target matrix not in source (only 96h/FFh=LAMP/LIGHT ADJUST listed)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
