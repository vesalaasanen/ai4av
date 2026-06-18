---
spec_id: admin/sharp-nec-c750q-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C750Q Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "C750Q Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C750Q Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:42:44.546Z
last_checked_at: 2026-06-17T19:36:23.944Z
generated_at: 2026-06-17T19:36:23.944Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Flow control wiring (RTS/CTS pins connected) not explicitly confirmed as active flow control. Input terminal value tables referenced as Appendix \"Supplementary Information by Command\" not present in refined source."
  - "flow control not stated in source (RTS/CTS pins wired but mode not declared)"
  - "source documents no unsolicited notifications; device responds only to commands."
  - "source documents no explicit multi-step command sequences."
  - "source contains no explicit power-on sequencing procedure or full interlock matrix beyond the error-status bitfield."
  - "firmware version compatibility not stated. Flow control mode not declared (RTS/CTS pins wired). Input terminal / aspect / eco-mode / sub-input full value tables live in source Appendix not present in refined excerpt. Two-lamp vs single-lamp variant behavior for lamp commands. Wireless LAN unit details deferred to separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:36:23.944Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched exactly to source hex sequences; transport parameters verified; complete one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C750Q Avt3 Control Spec

## Summary
Sharp/NEC C750Q Avt3 large-venue projector control spec derived from the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Covers binary frame control over RS-232C serial and TCP LAN (port 7142). Commands use a fixed hex-byte frame with trailing checksum; 53 documented commands spanning power, input switching, mute, picture/volume/aspect/lens adjustment, shutter, lens memory, eco mode, edge blending, PIP/PbP, and extensive status/error queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Flow control wiring (RTS/CTS pins connected) not explicitly confirmed as active flow control. Input terminal value tables referenced as Appendix "Supplementary Information by Command" not present in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired but mode not declared)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands (015/016)
  - routable     # inferred from INPUT SW CHANGE command (018)
  - queryable    # inferred from extensive query command set (009/037/078/097/305 etc.)
  - levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST (030-1/030-2/030-15)
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns 12 bytes of error/status bitfield (DATA01-DATA12)."

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (e.g. 06h = video port). Full value table in source Appendix 'Supplementary Information by Command' (not in refined excerpt)."
    notes: "Response DATA01=FFh means ended with error (no signal switch). CKS computed over preceding bytes."

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
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

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
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Value set for the aspect (full table in source Appendix)."

  - id: other_adjust
    label: Other Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time (DATA87-90). Updated at 1-min intervals."

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp select: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
    notes: "Negative remaining-life % if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see source Key code list)"
      - name: DATA02
        type: integer
        description: "Key code high byte"
    notes: "Response DATA01=FFh means error. Key code list includes POWER ON(02h),POWER OFF(03h),AUTO(05h),MENU(06h),UP(07h),DOWN(08h),RIGHT(09h),LEFT(0Ah),ENTER(0Bh),EXIT(0Ch),HELP(0Dh),MAGNIFY UP(0Fh),MAGNIFY DOWN(10h),MUTE(13h),PICTURE(29h),COMPUTER1(4Bh),COMPUTER2(4Ch),VIDEO1(4Fh),S-VIDEO1(51h),VOLUME UP(84h),VOLUME DOWN(85h),FREEZE(8Ah),ASPECT(A3h),SOURCE(D7h),LAMP MODE/ECO(EEh)."

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
        description: "Lens target (e.g. 06h=Periphery Focus; full table truncated in refined source)"
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=+continuous,81h=-continuous,FDh=-0.25s,FEh=-0.5s,FFh=-1s"
    notes: "Send 00h to stop after 7Fh/81h continuous drive. While lens driven, reissue same command to adjust without stop."

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (same values as lens_control DATA01)"
    notes: "Returns upper/lower/current adjustment range (DATA02-07)."

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
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "If DATA01=FFh (Stop), mode/value not referenced."

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number selected via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Response DATA02 returns 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=stop,1=operating)."

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
    notes: "Returns DATA01 profile number (00h=Profile1, 01h=Profile2)."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"
    notes: "Returns status, upper/lower/default/current limits and wide/narrow adjustment widths (DATA01-16)."

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal types, test pattern display, content displayed."

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display states (DATA01-05)."

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns 32-byte NUL-terminated model name (DATA01-32)."

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

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
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Returns label/info string (NUL-terminated)."

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode value depending on projector."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns 17-byte NUL-terminated projector name (DATA01-17)."

  - id: lan_mac_address_status_request2
    label: LAN MAC Address Status Request2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

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
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value (full table in source Appendix)."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes, NUL-terminated)"
    notes: "DATA01-16 carry name bytes; trailing 00h terminator."

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
        description: "Setting value (MODE: 00h=PIP,01h=PbP / START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR / sub-input value for SUB INPUT types)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type2 (DATA12-13)."

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns 16-byte NUL-terminated serial number (DATA01-16)."

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, display signal type, mute states, freeze status (DATA01-09)."

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (full table in source Appendix)"
      - name: DATA02
        type: integer
        description: "00h=audio from terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitfield
    bytes: 12
    description: "Error information bitfield returned by 009. ERROR STATUS REQUEST (DATA01-DATA12). Bit=0 normal, Bit=1 error. Covers cover/fan/temperature/power/lamp/ formatter/mirror-cover/interlock/system errors."
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "From 078-2 RUNNING STATUS REQUEST DATA03/DATA06 and 305-3 BASIC INFORMATION REQUEST DATA01."
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From 078-2 DATA06 / 305-3 DATA01."
  - id: mute_status
    type: object
    fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
    description: "From 078-4 MUTE STATUS REQUEST, each 00h=off / 01h=on."
  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    description: "From 078-6 COVER STATUS REQUEST DATA01."
  - id: input_status
    type: object
    fields: [signal_switch_process, signal_list_number, selection_signal_type_1, selection_signal_type_2, signal_list_type, test_pattern_display, content_displayed]
    description: "From 078-3 INPUT STATUS REQUEST."
  - id: command_response
    type: enum
    values: [success, error]
    description: "Per-command success/failure. 2xh response = success; Axh response carries ERR1/ERR2 error codes."
```

## Variables
```yaml
variables:
  - id: brightness
    description: "Picture brightness (030-1 DATA01=00h)"
  - id: contrast
    description: "Picture contrast (030-1 DATA01=01h)"
  - id: color
    description: "Picture color (030-1 DATA01=02h)"
  - id: hue
    description: "Picture hue (030-1 DATA01=03h)"
  - id: sharpness
    description: "Picture sharpness (030-1 DATA01=04h)"
  - id: volume
    description: "Sound volume (030-2)"
  - id: aspect
    description: "Aspect setting (030-12)"
  - id: eco_mode
    description: "Eco/Light/Lamp mode (098-8 / 097-8)"
  - id: projector_name
    description: "LAN projector name, up to 16 bytes (098-45 / 097-45)"
  - id: edge_blending_mode
    description: "Edge blending on/off (098-243-1 / 097-243-1)"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; device responds only to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: no other command accepted during power-off incl. cooling time
  - power_on   # source: no other command accepted while power-on in progress
interlocks:
  - "DATA09 Bit1 of ERROR STATUS REQUEST: interlock switch open is reported as error."
  - "Commands return ERR1=02h ERR2=0Dh ('command cannot be accepted because the power is off') when power is off."
# UNRESOLVED: source contains no explicit power-on sequencing procedure or full interlock matrix beyond the error-status bitfield.
```

## Notes
- Binary frame protocol: commands/responses are hex-byte sequences. Frame format per source: `20h 88h <ID1> <ID2> 0Ch <DATA01> ... <DATA12> <CKS>`.
- **Checksum (CKS):** sum all preceding bytes, take low-order one byte (8 bits) of result. Computed by controller, NOT a literal in parameterized commands — for fixed commands the final byte shown is the precomputed CKS.
- **ID1** = projector control ID; **ID2** = model code (varies by model).
- Serial: RS-232C cross cable on PC CONTROL D-SUB 9P (pin2=RxD, pin3=TxD, pin5=GND, pin7=RTS, pin8=CTS).
- LAN: TCP port 7142; wired 10/100Mbps auto-negotiate (RJ-45) or wireless LAN unit.
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals.
- Error code table (ERR1/ERR2) covers unrecognized command, unsupported model, invalid value, invalid input terminal, memory errors, forced mute, no signal, power-off rejection, etc.
- Several commands reference "Supplementary Information by Command" Appendix for full input-terminal / aspect / eco-mode value tables; that appendix is not present in the refined source excerpt.

<!-- UNRESOLVED: firmware version compatibility not stated. Flow control mode not declared (RTS/CTS pins wired). Input terminal / aspect / eco-mode / sub-input full value tables live in source Appendix not present in refined excerpt. Two-lamp vs single-lamp variant behavior for lamp commands. Wireless LAN unit details deferred to separate operation manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:42:44.546Z
last_checked_at: 2026-06-17T19:36:23.944Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:36:23.944Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched exactly to source hex sequences; transport parameters verified; complete one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Flow control wiring (RTS/CTS pins connected) not explicitly confirmed as active flow control. Input terminal value tables referenced as Appendix \"Supplementary Information by Command\" not present in refined source."
- "flow control not stated in source (RTS/CTS pins wired but mode not declared)"
- "source documents no unsolicited notifications; device responds only to commands."
- "source documents no explicit multi-step command sequences."
- "source contains no explicit power-on sequencing procedure or full interlock matrix beyond the error-status bitfield."
- "firmware version compatibility not stated. Flow control mode not declared (RTS/CTS pins wired). Input terminal / aspect / eco-mode / sub-input full value tables live in source Appendix not present in refined excerpt. Two-lamp vs single-lamp variant behavior for lamp commands. Wireless LAN unit details deferred to separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
