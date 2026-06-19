---
spec_id: admin/sharp-nec-xp-a175u-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A175U B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp A175U B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp A175U B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:09:46.728Z
last_checked_at: 2026-06-19T07:48:11.829Z
generated_at: 2026-06-19T07:48:11.829Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value mapping (\"Supplementary Information by Command\" appendix) not included in refined source. Aspect, eco-mode, base-model-type, sub-input, and audio-select enum values referenced but not enumerated in this excerpt. Model code (ID2) value not stated."
  - "source states \"Full duplex\" communication mode; flow_control not explicitly named"
  - "terminal value table not in refined source\""
  - "value mapping in appendix not in refined source\""
  - "sub-input value table not in refined source\""
  - "terminal value table in appendix not in refined source\""
  - "min/max/default range only obtainable via gain_parameter_request_3 response at runtime"
  - "source describes no unsolicited notifications; all responses are"
  - "source documents no multi-step command sequences."
  - "no further explicit safety/interlock procedures stated beyond the power command lockouts."
  - "model code (ID2) value for Xp A175U B not stated in source."
  - "\"Supplementary Information by Command\" appendix (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values, audio-select terminal values) not present in refined source excerpt."
  - "firmware version compatibility not stated."
  - "serial flow_control not explicitly named (only \"Full duplex\" stated)."
  - "exact model string normalization (\"Xp A175U B\") unverified against device nameplate."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:48:11.829Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands matched verbatim hex sequences in source; all transport parameters present and verified; complete coverage of source protocol. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A175U B Control Spec

## Summary
Sharp/NEC Xp A175U B projector control spec covering the binary RS-232C and TCP/IP (LAN) command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands use a hex-byte frame format with a trailing checksum byte. Includes power, input switching, mute, lens/shutter, picture/volume adjust, and a broad set of status queries.

<!-- UNRESOLVED: input-terminal value mapping ("Supplementary Information by Command" appendix) not included in refined source. Aspect, eco-mode, base-model-type, sub-input, and audio-select enum values referenced but not enumerated in this excerpt. Model code (ID2) value not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode; flow_control not explicitly named
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status request commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - levelable    # inferred: VOLUME ADJUST / PICTURE ADJUST commands present
```

## Actions
```yaml
# Command frames are sent as hex bytes. Every frame ends with a checksum byte
# (CKS), computed as: sum all preceding bytes, take low-order 8 bits.
# ID1 (control ID) and ID2 (model code) appear in RESPONSE frames only; sent
# command frames use fixed bytes as shown verbatim in the source.
# Parameterized commands show {DATAxx} placeholders for variable bytes.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full mapping in appendix not in source. # UNRESOLVED: terminal value table not in refined source"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
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
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. # UNRESOLVED: value mapping in appendix not in refined source"

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (source shows DATA01=96h DATA02=FFh => LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: Adjustment target low byte
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (source shows 06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens adjustment target (same as lens_control DATA01)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. # UNRESOLVED: value mapping in appendix not in refined source"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01; e.g. MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT). Sub-input values in appendix not in source. # UNRESOLVED: sub-input value table not in refined source"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. # UNRESOLVED: terminal value table in appendix not in refined source"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frame format: <resp_header> <cmd_echo> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Success headers: 20h/21h/22h/23h (match command group). Error header: A0h/A1h/A2h/A3h
# with <ERR1> <ERR2>. See error code list in Notes.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request / basic_information_request (DATA: operation status)

- id: error_status
  type: bitmask
  description: 12-byte error info (DATA01-DATA12); bit=0 normal, bit=1 error. Covers cover/fan/temp/power/lamp/ formatter/FPGA/mirror-cover/iris/interlock/system errors.

- id: mute_state
  type: enum
  description: Picture/sound/onscreen/forced-onscreen mute + OSD display flags (mute_status_request)

- id: input_signal_status
  type: object
  description: Signal switch process, list number, signal type 1/2, list type, test pattern, content displayed

- id: cover_status
  type: enum
  values: [normal_open, closed]

- id: lens_operation_status
  type: bitmask
  description: Per-lens-axis stop/during-operation flags (lens memory, zoom, focus, lens shift H/V)

- id: execution_result
  type: enum
  values: [success, error]
  description: Generic DATA01+DATA02=0000h success response for adjust commands
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume (volume_adjust / gain_parameter_request_3 DATA01=05h)
  # UNRESOLVED: min/max/default range only obtainable via gain_parameter_request_3 response at runtime

- id: brightness
  type: integer
  description: Picture brightness (picture_adjust DATA01=00h)

- id: contrast
  type: integer
  description: Picture contrast (picture_adjust DATA01=01h)

- id: color
  type: integer
  description: Picture color (picture_adjust DATA01=02h)

- id: hue
  type: integer
  description: Picture hue (picture_adjust DATA01=03h)

- id: sharpness
  type: integer
  description: Picture sharpness (picture_adjust DATA01=04h)

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: Lamp usage time (information_request DATA83-86 / lamp_information_request_3). Updated at 1-minute intervals.

- id: filter_usage_time
  type: integer
  unit: seconds
  description: Filter usage time (information_request DATA87-90 / filter_usage_information_request)

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: Lamp remaining life % (lamp_information_request_3 DATA02=04h). Negative if replacement deadline exceeded.

- id: projector_name
  type: string
  maxLength: 16
  description: LAN projector name (lan_projector_name_set/request)
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are
# replies to commands. Remove if not applicable.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While power-on is in progress, no other command can be accepted."
  - command: power_off
    note: "While power-off (including cooling time) is in progress, no other command can be accepted."
# UNRESOLVED: no further explicit safety/interlock procedures stated beyond the power command lockouts.
```

## Notes
- Checksum (CKS): add all preceding bytes of the frame, take the low-order 8 bits of the sum. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Response frame parameters: ID1 = projector control ID; ID2 = model code (varies by model); LEN = data length of the DATA part following LEN; DATA?? = variable-length data; ERR1/ERR2 = response error codes.
- Error code list (ERR1/ERR2):
  - `00h/00h` command not recognized; `00h/01h` command not supported by model
  - `01h/00h` specified value invalid; `01h/01h` invalid input terminal; `01h/02h` invalid language
  - `02h/00h` memory allocation error; `02h/02h` memory in use; `02h/03h` value cannot be set; `02h/04h` forced onscreen mute on; `02h/06h` viewer error; `02h/07h` no signal; `02h/08h` test pattern/filter displayed; `02h/09h` no PC card inserted; `02h/0Ah` memory operation error; `02h/0Ch` entry list displayed; `02h/0Dh` command not accepted (power off); `02h/0Eh` command execution failed; `02h/0Fh` no authority for operation
  - `03h/00h` incorrect gain number; `03h/01h` invalid gain; `03h/02h` adjustment failed
- Picture/sound/onscreen mute auto-clear on input terminal switch or video signal switch (sound mute also clears on volume adjustment).
- Lens control: after sending `7Fh` (drive +) or `81h` (drive -) in DATA02, stop by sending `00h`. While lens is being driven, lens position can be controlled without a stop by re-issuing the same command.
- Serial cable: cross cable to PC CONTROL port (D-SUB 9P). Pin assignment: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN: wired (10/100 Mbps auto) or wireless (via optional wireless LAN unit). TCP port 7142 for command send/receive.
- Signal list number returned is 1 less than practical value (add 1).
- Carbon Savings response packs kg (max 99999) in DATA02-05 and mg (max 999999) in DATA06-09.

<!-- UNRESOLVED: model code (ID2) value for Xp A175U B not stated in source. -->
<!-- UNRESOLVED: "Supplementary Information by Command" appendix (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values, audio-select terminal values) not present in refined source excerpt. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control not explicitly named (only "Full duplex" stated). -->
<!-- UNRESOLVED: exact model string normalization ("Xp A175U B") unverified against device nameplate. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:09:46.728Z
last_checked_at: 2026-06-19T07:48:11.829Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:48:11.829Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands matched verbatim hex sequences in source; all transport parameters present and verified; complete coverage of source protocol. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value mapping (\"Supplementary Information by Command\" appendix) not included in refined source. Aspect, eco-mode, base-model-type, sub-input, and audio-select enum values referenced but not enumerated in this excerpt. Model code (ID2) value not stated."
- "source states \"Full duplex\" communication mode; flow_control not explicitly named"
- "terminal value table not in refined source\""
- "value mapping in appendix not in refined source\""
- "sub-input value table not in refined source\""
- "terminal value table in appendix not in refined source\""
- "min/max/default range only obtainable via gain_parameter_request_3 response at runtime"
- "source describes no unsolicited notifications; all responses are"
- "source documents no multi-step command sequences."
- "no further explicit safety/interlock procedures stated beyond the power command lockouts."
- "model code (ID2) value for Xp A175U B not stated in source."
- "\"Supplementary Information by Command\" appendix (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values, audio-select terminal values) not present in refined source excerpt."
- "firmware version compatibility not stated."
- "serial flow_control not explicitly named (only \"Full duplex\" stated)."
- "exact model string normalization (\"Xp A175U B\") unverified against device nameplate."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
