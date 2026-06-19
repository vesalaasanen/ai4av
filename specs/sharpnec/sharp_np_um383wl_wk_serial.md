---
spec_id: admin/sharpnec-np-um383wl-wk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP UM383WL WK Control Spec"
manufacturer: Sharp/NEC
model_family: "NP UM383WL WK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP UM383WL WK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:35:57.446Z
last_checked_at: 2026-06-18T08:56:42.275Z
generated_at: 2026-06-18T08:56:42.275Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "base model type values and input-terminal value tables are referenced to an \"Appendix: Supplementary Information by Command\" that is not included in the refined source; per-model value maps are therefore unavailable."
  - "flow control mode not stated (RTS/CTS pins present on D-SUB 9P but no flow-control setting documented)"
  - "absolute range returned per-device by GAIN PARAMETER REQUEST 3"
  - "per-device via GAIN PARAMETER REQUEST 3"
  - "source documents no multi-step macro sequences."
  - "source states no explicit confirmation-required list (e.g. for power off)."
  - "input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, and PIP sub-input value table are all referenced to an Appendix \"Supplementary Information by Command\" not present in the refined source."
  - "firmware version compatibility not stated."
  - "serial flow_control mode not stated (RTS/CTS pins wired but no flow-control setting documented)."
  - "wireless LAN unit specifications deferred to a separate operation manual not included here."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:56:42.275Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP UM383WL WK Control Spec

## Summary
Control spec for the Sharp/NEC NP UM383WL WK projector, covering its binary RS-232C serial and wired/wireless LAN (TCP) control interface. All commands are hex-framed with an ID1/ID2 header, a length byte, optional DATA payload, and a trailing checksum (low byte of the sum of all preceding bytes). The source documents 53 distinct operations spanning power, input switching, mute, picture/volume/aspect adjust, lens control and lens memory, status queries, and LAN/PIP/edge-blending settings.

<!-- UNRESOLVED: base model type values and input-terminal value tables are referenced to an "Appendix: Supplementary Information by Command" that is not included in the refined source; per-model value maps are therefore unavailable. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control mode not stated (RTS/CTS pins present on D-SUB 9P but no flow-control setting documented)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - routable        # inferred: INPUT SW CHANGE command present
  - queryable       # inferred: many status/information request commands present
  - levelable       # inferred: PICTURE ADJUST / VOLUME ADJUST commands present
```

## Actions
```yaml
# Command frame convention (verbatim from source):
#   Commands are hex byte sequences. <ID1> <ID2> = control/model id header;
#   <CKS> = checksum = low byte of sum of all preceding bytes.
#   Parameterized commands show the variable DATA bytes in braces.

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

- id: input_switch
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Input terminal value (see Appendix "Supplementary Information by Command"; example 06h = video port)

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
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA02
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 96h (with DATA02=FFh) = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: byte
      description: "FFh for lamp/light adjust"
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA04
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD type). Source key codes: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: byte
      description: Key code high byte (00h for all listed key codes)

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
      type: byte
      description: "Lens target: 06h = Periphery Focus"
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "FFh = Stop (mode/value ignored)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: DATA03
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: byte
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET (operates on profile selected by LENS PROFILE SET)"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command"; sets "Light mode" or "Lamp mode" depending on model)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value. MODE: 00h=PIP, 01h=PBP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values per Appendix."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Input terminal value (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
      type: byte
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: Lens target (same target space as LENS CONTROL)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

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
      type: byte
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

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

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
```

## Feedbacks
```yaml
# Every command returns an ACK frame whose first byte identifies the command group:
#   2xh = ack for 02h-prefixed (action) commands; 3xh = ack for 03h-prefixed commands;
#   0xh/A0h = ack for 00h-prefixed (status) commands; A_xh_ = negative (error) ack.
# On success with no data: "<ACK> <ID1> <ID2> 00h <CKS>".
# On success with data: "<ACK> <ID1> <ID2> <LEN> <DATA...> <CKS>".
# On failure:  "<ACK> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>" (ACK high nibble set, e.g. A2h).

- id: command_ack
  type: enum
  values: [success_no_data, success_with_data, error]

- id: power_status
  type: enum
  values: [standby, power_on, not_supported]
  note: "From RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  note: "From RUNNING STATUS REQUEST DATA06: 00h/0Fh/04h/10h/05h/06h"

- id: picture_mute_state
  type: enum
  values: [off, on]
  note: "From MUTE STATUS REQUEST DATA01"

- id: sound_mute_state
  type: enum
  values: [off, on]
  note: "From MUTE STATUS REQUEST DATA02"

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  note: "From MUTE STATUS REQUEST DATA03"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  note: "From COVER STATUS REQUEST DATA01: 00h=Normal (cover opened), 01h=Cover closed"

- id: eco_mode_value
  type: raw
  note: "From ECO MODE REQUEST DATA01 (value map in Appendix 'Supplementary Information by Command')"

- id: edge_blending_state
  type: enum
  values: [off, on]
  note: "From EDGE BLENDING MODE REQUEST DATA01"

- id: lamp_remaining_life_percent
  type: integer
  note: "From LAMP INFORMATION REQUEST 3 (DATA02=04h); negative if replacement deadline exceeded"

- id: lamp_usage_time_seconds
  type: integer
  note: "From LAMP INFORMATION REQUEST 3 (DATA02=01h) or INFORMATION REQUEST DATA83-86; updated at 1-minute intervals"

- id: filter_usage_time_seconds
  type: integer
  note: "From FILTER USAGE INFORMATION REQUEST DATA01-04; -1 if undefined"

- id: error_status
  type: bitmask
  note: "From ERROR STATUS REQUEST DATA01-12; bit=1 indicates error (cover/fan/temp/lamp/interlock/system errors, see source error information list)"
```

## Variables
```yaml
- id: brightness
  type: integer
  range: null  # UNRESOLVED: absolute range returned per-device by GAIN PARAMETER REQUEST 3
  note: "Set via PICTURE ADJUST DATA01=00h; range/limits via GAIN PARAMETER REQUEST 3"

- id: contrast
  type: integer
  range: null  # UNRESOLVED: per-device via GAIN PARAMETER REQUEST 3
  note: "Set via PICTURE ADJUST DATA01=01h"

- id: color
  type: integer
  range: null  # UNRESOLVED: per-device via GAIN PARAMETER REQUEST 3
  note: "Set via PICTURE ADJUST DATA01=02h"

- id: hue
  type: integer
  range: null  # UNRESOLVED: per-device via GAIN PARAMETER REQUEST 3
  note: "Set via PICTURE ADJUST DATA01=03h"

- id: sharpness
  type: integer
  range: null  # UNRESOLVED: per-device via GAIN PARAMETER REQUEST 3
  note: "Set via PICTURE ADJUST DATA01=04h"

- id: volume
  type: integer
  range: null  # UNRESOLVED: per-device via GAIN PARAMETER REQUEST 3
  note: "Set via VOLUME ADJUST; range/limits via GAIN PARAMETER REQUEST 3 DATA01=05h"

- id: lamp_light_adjust
  type: integer
  range: null  # UNRESOLVED: per-device via GAIN PARAMETER REQUEST 3
  note: "Set via OTHER ADJUST (DATA01=96h, DATA02=FFh)"
```

## Events
```yaml
# The source describes no unsolicited (push) notifications. All device state is obtained
# by explicit request commands (pull model). Responses are only returned after a command is sent.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On: while turning on, no other command can be accepted (source §3.2)."
  - "Power Off: while turning off (including cooling time), no other command can be accepted (source §3.3)."
  - "Picture/Sound/Onscreen mute auto-clear on input terminal switch or video signal switch (source §3.5, §3.7, §3.9)."
  - "Sound mute also auto-clears on volume adjustment (source §3.7)."
  - "Lens Control: after sending 7Fh/81h (continuous drive), a 00h stop must be sent to halt (source §3.22)."
# UNRESOLVED: source states no explicit confirmation-required list (e.g. for power off).
# Interlock-switch-open is reported via ERROR STATUS REQUEST DATA09 Bit1, not enforced by protocol.
```

## Notes
- Command framing: all commands/responses are hex byte sequences. The leading byte encodes the command class (`00h`/`01h`/`02h`/`03h` request; `20h`/`21h`/`22h`/`23h` positive ack; `A0h`/`A1h`/`A2h`/`A3h` negative/error ack). `<ID1>` is the projector control ID; `<ID2>` is the model code.
- Checksum (`<CKS>`): sum all preceding bytes, take the low-order 8 bits. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → checksum `03h`.
- The same opcode byte (`10h`) is shared by PICTURE ADJUST, VOLUME ADJUST, ASPECT ADJUST, and OTHER ADJUST; they are disambiguated by their DATA layout (e.g. `05h` second byte for volume, `18h` for aspect). The literal payloads above preserve this distinction.
- Usage-time fields are in seconds and updated at 1-minute intervals (source §3.15, §3.17).
- Error response carries `<ERR1> <ERR2>`; the source enumerates 24 ERR1/ERR2 combinations (e.g. `02h 0Dh` = "command cannot be accepted because the power is off"; `02h 0Fh` = "no authority for the operation").

<!-- UNRESOLVED: input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, and PIP sub-input value table are all referenced to an Appendix "Supplementary Information by Command" not present in the refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control mode not stated (RTS/CTS pins wired but no flow-control setting documented). -->
<!-- UNRESOLVED: wireless LAN unit specifications deferred to a separate operation manual not included here. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:35:57.446Z
last_checked_at: 2026-06-18T08:56:42.275Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:56:42.275Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "base model type values and input-terminal value tables are referenced to an \"Appendix: Supplementary Information by Command\" that is not included in the refined source; per-model value maps are therefore unavailable."
- "flow control mode not stated (RTS/CTS pins present on D-SUB 9P but no flow-control setting documented)"
- "absolute range returned per-device by GAIN PARAMETER REQUEST 3"
- "per-device via GAIN PARAMETER REQUEST 3"
- "source documents no multi-step macro sequences."
- "source states no explicit confirmation-required list (e.g. for power off)."
- "input-terminal value table, aspect value table, eco-mode value table, base-model-type value table, and PIP sub-input value table are all referenced to an Appendix \"Supplementary Information by Command\" not present in the refined source."
- "firmware version compatibility not stated."
- "serial flow_control mode not stated (RTS/CTS pins wired but no flow-control setting documented)."
- "wireless LAN unit specifications deferred to a separate operation manual not included here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
