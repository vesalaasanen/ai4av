---
spec_id: admin/sharp-nec-np-me301w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME301W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME301W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME301W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:41:36.752Z
last_checked_at: 2026-06-18T08:37:16.912Z
generated_at: 2026-06-18T08:37:16.912Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Input terminal value codes (DATA01 of 018/319-10), aspect value codes (030-12), and sub-input/eco-mode setting values are referenced to an \"Appendix: Supplementary Information by Command\" not included in this refined source."
  - "source states \"Full duplex\" communication mode; flow control type not stated"
  - "aspect enum value codes not in this refined source (in Appendix)"
  - "eco/light/lamp mode value codes not in this refined source (in Appendix)"
  - "source does not document unsolicited notifications. All responses are solicited ACKs/data replies to commands."
  - "source does not document multi-step command sequences beyond single-frame commands."
  - "full safety/interlock documentation not in this refined excerpt."
  - "input terminal value codes (018, 319-10), aspect value codes (030-12), eco/light/lamp mode value codes (097-8/098-8), and PIP/PBP sub-input value codes (097-198/098-198) are referenced to a source Appendix \"Supplementary Information by Command\" not contained in this refined document."
  - "serial baud rate default not stated (source lists five selectable rates)."
  - "flow_control type not stated (only \"Full duplex\" communication mode documented)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:37:16.912Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP ME301W Control Spec

## Summary
Sharp/NEC NP ME301W LCD projector controlled via binary hex command protocol. Supports RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). Commands are hexadecimal byte frames with a trailing checksum byte; responses echo the command header with optional data and error codes.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Input terminal value codes (DATA01 of 018/319-10), aspect value codes (030-12), and sub-input/eco-mode setting values are referenced to an "Appendix: Supplementary Information by Command" not included in this refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 bps (selectable); default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode; flow control type not stated
addressing:
  port: 7142  # TCP port for LAN command send/receive (wired/wireless LAN)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable     # inferred: extensive status request commands present
  - routable       # inferred: 018 INPUT SW CHANGE present
  - levelable      # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST present
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "009. Returns DATA01-DATA12 error bitfields (cover/fan/temp/lamp/etc.)."

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "015. No other command accepted during power-on."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "016. No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Full code list in source Appendix 'Supplementary Information by Command'."
  notes: "018. Response DATA01=FFh means ended with error (no switch made)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "020. Turned off by input/video switch."

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
  notes: "022. Turned off by input/video switch or volume adjust."

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
  notes: "024. Turned off by input/video switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "030-1. Example set brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example -10: ...00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "030-2. Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Value set for the aspect. Codes in source Appendix 'Supplementary Information by Command'."
  notes: "030-12."

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST). DATA01+DATA02=96h FFh pair per source."
    - name: data02
      type: integer
      description: "Adjustment target low byte (FFh pairs with 96h)."
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "030-15. Adjusts various gains (e.g. lamp/light adjust = DATA01:96h DATA02:FFh)."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "037. Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "037-3. Returns filter usage time (DATA01-04 seconds), filter alarm start time (DATA05-08 seconds). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "037-4. Example get lamp usage: 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life returned if replacement deadline exceeded. Eco mode affects values."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "037-6. Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD). See key code list, e.g. 02h=POWER ON, 05h=AUTO, 06h=MENU, 4Bh=COMPUTER1."
    - name: data02
      type: integer
      description: "Key code high byte (typically 00h)."
  notes: "050. Response DATA01=FFh = error. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Full key code table in source."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  notes: "051. Closes lens shutter."

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  notes: "052. Opens lens shutter."

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target. 06h = Periphery Focus (only value documented)."
    - name: data02
      type: integer
      description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "053. After 7Fh/81h, send 00h to stop. Response DATA01=FFh = error."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Lens target selector.
  notes: "053-1. Returns upper/lower limit and current value (DATA02-07)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "FFh=Stop (mode/value ignored); otherwise lens target."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "053-2."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-3. Response DATA01=FFh = error."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "053-4. Controls profile number specified by 053-10 LENS PROFILE SET. Response DATA01=FFh = error."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "053-5. Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
  notes: "053-6."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "053-7. Returns DATA01 bitmask: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
  notes: "053-10. Selects reference lens memory profile number."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "053-11. Returns DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "060-1. Example brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "078-1. Returns base model type (DATA01-03), sound function (DATA04: 00h=not avail/01h=avail), profile/clock/sleep (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "078-2. Returns power status (DATA03: 00h=Standby/01h=Power on), cooling process, power on/off process, operation status."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "078-3. Returns signal switch process, signal list number (returned value is practical number minus 1), selection signal type, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "078-4. Returns DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display (each 00h=Off/01h=On)."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "078-5. Returns model name (DATA01-32, NUL terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "078-6. Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF"
  notes: "079."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: "084. Returns English info strings (e.g. sync frequencies)."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "097-8. Returns 'Light mode' or 'Lamp mode' value depending on projector."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "097-45. Returns projector name (DATA01-17, NUL terminated)."

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "097-155. Returns MAC address (DATA01-06)."

- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "097-198. Returns DATA02 setting value per selected category."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "097-243-1. Returns DATA01: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Value set for eco mode. Codes in source Appendix 'Supplementary Information by Command'."
  notes: "098-8. Sets 'Light mode' or 'Lamp mode' depending on projector."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Projector name bytes (up to 16 bytes, DATA01-DATA16)."
  notes: "098-45."

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value per category (e.g. MODE: 00h=PIP/01h=PBP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT)."
  notes: "098-198."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
  notes: "098-243-1."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "305-1. Returns base model type (DATA01-02), model name (DATA03-11)."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "305-2. Returns serial number (DATA01-16, NUL terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "305-3. Returns operation status, content displayed, selection signal type, display signal type, video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal. Codes in source Appendix 'Supplementary Information by Command'."
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  notes: "319-10. Response DATA02: 00h=success, 01h=error."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06 / 305-3 DATA01"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: "078-2 DATA04"

- id: error_status
  type: bitmask
  description: "12-byte error bitfield from 009 ERROR STATUS REQUEST. Covers cover/fan/temperature/lamp/formatter/FPGA/mirror/foreign-matter/interlock/system errors."
  source: "009 DATA01-DATA12"

- id: lamp_usage_time_seconds
  type: integer
  source: "037 DATA83-86 / 037-4 DATA03-06"

- id: lamp_remaining_life_percent
  type: integer
  source: "037-4 DATA03-06 (may be negative if replacement deadline exceeded)"

- id: filter_usage_time_seconds
  type: integer
  source: "037-3 DATA01-04"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA03"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "305-3 DATA09"

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 DATA01"

- id: lens_operation_status
  type: bitmask
  description: "bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V"
  source: "053-7 DATA01"

- id: command_result
  type: enum
  values: [success, error]
  description: "Generic per-command ACK; A_h-prefixed responses carry ERR1/ERR2 error codes on failure."

- id: error_code
  type: composite
  description: "ERR1+ERR2 pair from A_h response frames. See source 2.4 error code list (e.g. 00h/00h=unrecognized, 02h/0Dh=power off, 03h/02h=adjustment failed)."
  source: "2.4 Error code list"
```

## Variables
```yaml
- id: brightness
  type: integer
  adjustable: true
  source: "030-1 (DATA01:00h) / 060-1 (DATA01:00h)"

- id: contrast
  type: integer
  adjustable: true
  source: "030-1 (DATA01:01h) / 060-1 (DATA01:01h)"

- id: color
  type: integer
  adjustable: true
  source: "030-1 (DATA01:02h) / 060-1 (DATA01:02h)"

- id: hue
  type: integer
  adjustable: true
  source: "030-1 (DATA01:03h) / 060-1 (DATA01:03h)"

- id: sharpness
  type: integer
  adjustable: true
  source: "030-1 (DATA01:04h) / 060-1 (DATA01:04h)"

- id: volume
  type: integer
  adjustable: true
  source: "030-2 / 060-1 (DATA01:05h)"

- id: lamp_light_adjust
  type: integer
  adjustable: true
  source: "030-15 (DATA01:96h) / 060-1 (DATA01:96h)"

- id: aspect
  type: enum
  adjustable: true
  # UNRESOLVED: aspect enum value codes not in this refined source (in Appendix)
  source: "030-12"

- id: eco_mode
  type: enum
  adjustable: true
  # UNRESOLVED: eco/light/lamp mode value codes not in this refined source (in Appendix)
  source: "098-8 / 097-8"

- id: projector_name
  type: string
  adjustable: true
  source: "098-45 / 097-45 (up to 16 bytes)"

- id: lens_memory_option
  type: enum
  adjustable: true
  values: [off, on]
  source: "053-6 / 053-5"

- id: lens_profile
  type: enum
  adjustable: true
  values: [profile_1, profile_2]
  source: "053-10 / 053-11"

- id: edge_blending_mode
  type: enum
  adjustable: true
  values: [off, on]
  source: "098-243-1 / 097-243-1"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications. All responses are solicited ACKs/data replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences beyond single-frame commands.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # blocks all other commands during cooldown; verify intent
interlocks: []
notes: |
  Source notes that during POWER ON and POWER OFF (including cooling time), no
  other command can be accepted. No explicit safety interlock procedures,
  voltage/current specs, or power-on sequencing requirements documented in
  this refined source.
  <!-- UNRESOLVED: full safety/interlock documentation not in this refined excerpt. -->
```

## Notes
- Binary hex command protocol. All frames carry a trailing checksum byte (CKS) computed as the low-order 8 bits of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- Response framing: `2xh`/`3xh` prefix = success (data follows); `Axh` prefix = error (ERR1/ERR2 follow). Command frames use `0xh`/`1xh`/`2xh`/`3xh` prefixes.
- `ID1` = projector control ID; `ID2` = model code (varies by model). These appear in responses and are device-supplied.
- Usage time values update at 1-minute intervals despite 1-second resolution.
- Signal list number returned by 078-3 is the practical number minus 1 (add 1 for actual).
- Lamp remaining life (%) may be negative when replacement deadline exceeded.
- "01h" (Lamp 2) selectors only valid on two-lamp projector models.

<!-- UNRESOLVED: input terminal value codes (018, 319-10), aspect value codes (030-12), eco/light/lamp mode value codes (097-8/098-8), and PIP/PBP sub-input value codes (097-198/098-198) are referenced to a source Appendix "Supplementary Information by Command" not contained in this refined document. -->
<!-- UNRESOLVED: serial baud rate default not stated (source lists five selectable rates). -->
<!-- UNRESOLVED: flow_control type not stated (only "Full duplex" communication mode documented). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

Spec done. 53 actions enumerated — all distinct command rows from source §2/§3, each carrying literal hex payload verbatim incl. checksum byte. Both `serial` + `tcp` (port 7142) populated since source §1.1-1.2 states both. UNRESOLVED markers on appendix-referenced enum codes, baud default, flow control, firmware version.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:41:36.752Z
last_checked_at: 2026-06-18T08:37:16.912Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:37:16.912Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Input terminal value codes (DATA01 of 018/319-10), aspect value codes (030-12), and sub-input/eco-mode setting values are referenced to an \"Appendix: Supplementary Information by Command\" not included in this refined source."
- "source states \"Full duplex\" communication mode; flow control type not stated"
- "aspect enum value codes not in this refined source (in Appendix)"
- "eco/light/lamp mode value codes not in this refined source (in Appendix)"
- "source does not document unsolicited notifications. All responses are solicited ACKs/data replies to commands."
- "source does not document multi-step command sequences beyond single-frame commands."
- "full safety/interlock documentation not in this refined excerpt."
- "input terminal value codes (018, 319-10), aspect value codes (030-12), eco/light/lamp mode value codes (097-8/098-8), and PIP/PBP sub-input value codes (097-198/098-198) are referenced to a source Appendix \"Supplementary Information by Command\" not contained in this refined document."
- "serial baud rate default not stated (source lists five selectable rates)."
- "flow_control type not stated (only \"Full duplex\" communication mode documented)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
