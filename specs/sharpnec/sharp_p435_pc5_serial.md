---
spec_id: admin/sharpnec-p435pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P435 Pc5 Control Spec"
manufacturer: Sharp/NEC
model_family: "P435 Pc5"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P435 Pc5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:24:59.151Z
last_checked_at: 2026-06-18T08:59:04.431Z
generated_at: 2026-06-18T08:59:04.431Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-name string returned by the device not confirmed against a real unit; input-terminal value table (\"Supplementary Information by Command\") is not included in this source excerpt and several DATA01 enum value lists are referenced but not printed."
  - "flow control not stated in source (RTS/CTS pins wired cross, comm mode \"full duplex\")"
  - "full interlock recovery / power-on sequencing not stated in source."
  - "input-terminal value table (\"Supplementary Information by Command\" Appendix) not present in this source excerpt — DATA01 enum values for 018 INPUT SW CHANGE, 030-12 ASPECT, 098-8 ECO MODE, 319-10 AUDIO SELECT, and PIP sub-input values are referenced but not printed."
  - "default baud rate not stated (5 options listed); flow control setting not stated."
  - "firmware version compatibility not stated in source."
  - "protocol version number not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:59:04.431Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P435 Pc5 Control Spec

## Summary
The Sharp/NEC P435 Pc5 is a projector controllable via an RS-232C serial port (PC CONTROL D-SUB 9P) and a wired/wireless LAN connection. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1), including power, input selection, mute, picture/volume/lens adjustment, lens memory, status queries, and system information requests. Commands are framed hex byte sequences with a trailing checksum byte.

<!-- UNRESOLVED: exact model-name string returned by the device not confirmed against a real unit; input-terminal value table ("Supplementary Information by Command") is not included in this source excerpt and several DATA01 enum value lists are referenced but not printed. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired cross, comm mode "full duplex")
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON / POWER OFF commands
  - queryable  # inferred from numerous status/information request commands
  - levelable  # inferred from picture adjust, volume adjust, lamp adjust commands
  - routable  # inferred from INPUT SW CHANGE and PIP/PbP sub-input selection
```

## Actions
```yaml
# All 53 commands from the source Command List enumerated. Hex payloads are
# copied verbatim from the source. {DATAxx} = variable parameter byte, {CKS} =
# checksum (low byte of sum of all preceding bytes). Common params ID1 (control
# ID) and ID2 (model code) appear only in responses, not in the sent command.
actions:
  - id: c009_error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response returns DATA01-DATA12 error bitmasks (cover, fan, temp, lamp, interlock switch, etc.)."

  - id: c015_power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on is in progress."

  - id: c016_power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off including cooling time."

  - id: c018_input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Input terminal value (e.g. 06h = video). Full list in Appendix 'Supplementary Information by Command'."
    notes: "Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means ended with error (no switch)."

  - id: c020_picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: c021_picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: c022_sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input/video switch or volume adjustment."

  - id: c023_sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: c024_onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: c025_onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: c030_1_picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: enum
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  - id: c030_2_volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: c030_12_aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Aspect value (see Appendix 'Supplementary Information by Command')."

  - id: c030_15_other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: enum
        description: "FFh (fixed) for this target"
      - name: DATA03
        type: enum
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: c037_information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response DATA01-49 projector name, DATA83-86 lamp usage time (sec), DATA87-90 filter usage time (sec). Updated at 1-minute intervals."

  - id: c037_3_filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "DATA01-04 filter usage time (sec), DATA05-08 filter alarm start time (sec). -1 if undefined."

  - id: c037_4_lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: enum
        description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
    notes: "Remaining life returns negative value if replacement deadline exceeded."

  - id: c037_6_carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: c050_remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD type). See key code list."
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for all listed keys)."
    notes: "Key codes include POWER ON(02h), POWER OFF(03h), AUTO(05h), MENU(06h), UP/DOWN/RIGHT/LEFT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO. Response DATA01=FFh = error."

  - id: c051_shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: c052_shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: c053_lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "06h = Periphery Focus"
      - name: DATA02
        type: enum
        description: "00h=Stop, 01h=drive 1s plus, 02h=0.5s plus, 03h=0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=0.25s minus, FEh=0.5s minus, FFh=1s minus"
    notes: "Send 00h to stop after 7Fh/81h continuous drive. Response DATA01=FFh = error."

  - id: c053_1_lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "06h = Periphery Focus"
    notes: "Returns upper/lower limit and current value (DATA02-07)."

  - id: c053_2_lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "FFh=Stop (mode/value ignored)"
      - name: DATA02
        type: enum
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: c053_3_lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: c053_4_reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number selected by LENS PROFILE SET."

  - id: c053_5_lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: c053_6_lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: enum
        description: "00h=OFF, 01h=ON"

  - id: c053_7_lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmask: lens memory, zoom, focus, lens shift H/V operation status."

  - id: c053_10_lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=Profile 1, 01h=Profile 2"

  - id: c053_11_lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01 profile number (00h=Profile 1, 01h=Profile 2)."

  - id: c060_1_gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

  - id: c078_1_setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "DATA01-03 base model type, DATA04 sound function, DATA05 profile/timer function."

  - id: c078_2_running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "DATA03 power status (00h=Standby,01h=Power on), DATA04 cooling, DATA05 power process, DATA06 operation status."

  - id: c078_3_input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern, content displayed."

  - id: c078_4_mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD."

  - id: c078_5_model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "DATA01-32 model name (NUL-terminated)."

  - id: c078_6_cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: c079_freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "01h=freeze on, 02h=freeze off"

  - id: c084_information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Returns label/information string (NUL-terminated)."

  - id: c097_8_eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns DATA01 eco mode value (values in Appendix). May reflect 'Light mode' or 'Lamp mode'."

  - id: c097_45_lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "DATA01-17 projector name (NUL-terminated)."

  - id: c097_155_lan_mac_address_status_request2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "DATA01-06 MAC address."

  - id: c097_198_pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "Returns setting value (PIP vs PbP, position, sub input)."

  - id: c097_243_1_edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "DATA01: 00h=OFF, 01h=ON."

  - id: c098_8_eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Eco mode value (see Appendix 'Supplementary Information by Command')."

  - id: c098_45_lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA16} 00h {CKS}"
    params:
      - name: DATA01_to_DATA16
        type: string
        description: "Projector name (up to 16 bytes)."

  - id: c098_198_pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: enum
        description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h-03h corners; sub input values in Appendix)."

  - id: c098_243_1_edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "00h=OFF, 01h=ON"

  - id: c305_1_base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

  - id: c305_2_serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "DATA01-16 serial number (NUL-terminated)."

  - id: c305_3_basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, mute states, freeze status."

  - id: c319_10_audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: enum
        description: "Input terminal (see Appendix 'Supplementary Information by Command')."
      - name: DATA02
        type: enum
        description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA06; 305-3 DATA01"

  - id: error_status
    type: bitmask
    description: "12-byte error bitmask (009 ERROR STATUS REQUEST): cover, fan, temperature, lamp, interlock switch, formatter, FPGA, mirror cover, ballast, iris, foreign matter, lens."

  - id: mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST (picture/sound/onscreen/forced onscreen separately)"

  - id: input_status
    type: composite
    description: "Signal list number, selection signal type 1/2, test pattern, content displayed (078-3 INPUT STATUS REQUEST)."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=01h); updated 1-min intervals"

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=04h); negative if deadline exceeded"

  - id: filter_usage_time
    type: integer
    unit: seconds
    source: "037-3 FILTER USAGE INFORMATION REQUEST"

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source: "078-6 COVER STATUS REQUEST"

  - id: eco_mode
    type: enum
    source: "097-8 ECO MODE REQUEST (values in Appendix)"

  - id: freeze_status
    type: enum
    values: [off, on]
    source: "305-3 BASIC INFORMATION REQUEST DATA09"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    source: "030-1 PICTURE ADJUST (DATA01=00h); 060-1 (DATA01=00h) for limits"

  - id: contrast
    type: integer
    source: "030-1 (DATA01=01h); 060-1 (DATA01=01h)"

  - id: color
    type: integer
    source: "030-1 (DATA01=02h); 060-1 (DATA01=02h)"

  - id: hue
    type: integer
    source: "030-1 (DATA01=03h); 060-1 (DATA01=03h)"

  - id: sharpness
    type: integer
    source: "030-1 (DATA01=04h); 060-1 (DATA01=04h)"

  - id: volume
    type: integer
    source: "030-2 VOLUME ADJUST; 060-1 (DATA01=05h)"

  - id: lamp_light_adjust
    type: integer
    source: "030-15 OTHER ADJUST (DATA01=96h); 060-1 (DATA01=96h)"
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are
# solicited (reply to a sent command).
events: []
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: interlock_switch
    description: "Error status DATA09 Bit1: 'The interlock switch is open.' Reported as an error condition."
    source: "009 ERROR STATUS REQUEST error information list"
  - id: power_off_lockout
    description: "No other command accepted during power-on ramp or power-off (including cooling time)."
    source: "015 POWER ON / 016 POWER OFF command notes"
  - id: cover_error
    description: "Error status DATA01 Bit0: Cover error."
    source: "009 ERROR STATUS REQUEST"
notes: |
  Source documents error bitmasks for temperature, fan, lamp, and cover faults
  but does not state explicit power-on sequencing or interlock recovery
  procedures. No confirmation_required commands identified.
# UNRESOLVED: full interlock recovery / power-on sequencing not stated in source.
```

## Notes
- **Command framing:** Commands are hex byte sequences. Leading byte indicates class: `00h`=read, `01h`=set, `02h`=action, `03h`=adjust/read-extended. Followed by command code, `00h 00h`, data-length byte, data, then checksum.
- **Checksum (CKS):** Low-order one byte of the sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Common response params:** ID1 = projector control ID; ID2 = model code (varies by model); LEN = data length following LEN; ERR1/ERR2 = error code pair.
- **Response prefixes:** `2Xh` = success response (with data if requested); `AXh` = error response (carries ERR1/ERR2).
- **Usage time granularity:** Lamp and filter usage times are available in 1-second units but updated at 1-minute intervals.
- **Wireless LAN:** See separate wireless LAN unit operation manual (not covered here).

<!-- UNRESOLVED: input-terminal value table ("Supplementary Information by Command" Appendix) not present in this source excerpt — DATA01 enum values for 018 INPUT SW CHANGE, 030-12 ASPECT, 098-8 ECO MODE, 319-10 AUDIO SELECT, and PIP sub-input values are referenced but not printed. -->
<!-- UNRESOLVED: default baud rate not stated (5 options listed); flow control setting not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version number not stated. -->
````

Spec built. 53 actions, all hex payloads verbatim. Serial + TCP both populated (source documents port 7142 + RS-232C config explicitly). Unresolved markers on: input-terminal appendix values, default baud, flow_control, firmware/protocol versions. Ready for ingest.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:24:59.151Z
last_checked_at: 2026-06-18T08:59:04.431Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:59:04.431Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-name string returned by the device not confirmed against a real unit; input-terminal value table (\"Supplementary Information by Command\") is not included in this source excerpt and several DATA01 enum value lists are referenced but not printed."
- "flow control not stated in source (RTS/CTS pins wired cross, comm mode \"full duplex\")"
- "full interlock recovery / power-on sequencing not stated in source."
- "input-terminal value table (\"Supplementary Information by Command\" Appendix) not present in this source excerpt — DATA01 enum values for 018 INPUT SW CHANGE, 030-12 ASPECT, 098-8 ECO MODE, 319-10 AUDIO SELECT, and PIP sub-input values are referenced but not printed."
- "default baud rate not stated (5 options listed); flow control setting not stated."
- "firmware version compatibility not stated in source."
- "protocol version number not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
