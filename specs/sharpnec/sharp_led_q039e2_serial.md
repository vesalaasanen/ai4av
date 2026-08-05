---
spec_id: admin/sharp-nec-led-q039e2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED Q039E2 Control Spec"
manufacturer: Sharp/NEC
model_family: Q039E2
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Q039E2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:46:39.956Z
last_checked_at: 2026-07-22T00:50:11.219Z
generated_at: 2026-07-22T00:50:11.219Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "this manual is a generic Sharp/NEC projector command reference; device-specific parameters (input terminal values, aspect values, eco-mode values, base-model-type codes) are deferred to an \"Appendix: Supplementary Information by Command\" that is not included in the source text."
  - "flow control not stated in source (RTS/CTS pins wired in pin table)"
  - "no explicit safety warnings, interlock procedures, or power-on"
  - "device-specific value tables referenced as \"Appendix: Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base-model-type codes, sub-input values) are not present in the refined source text."
  - "default baud rate not stated (only the supported set 4800-115200)."
  - "flow control not stated despite RTS/CTS pins being wired."
  - "firmware version compatibility not stated."
  - "wireless-LAN unit details deferred to a separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:50:11.219Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched with identical hex byte sequences to source; transport parameters verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED Q039E2 Control Spec

## Summary
Control spec for the Sharp/NEC LED Q039E2 projector (document BDT140013 Revision 7.1, "Projector Control Command Reference Manual"). Covers RS-232C serial control and TCP/IP LAN control (port 7142). The protocol is a binary hex-byte command/response scheme with a trailing checksum byte.

<!-- UNRESOLVED: this manual is a generic Sharp/NEC projector command reference; device-specific parameters (input terminal values, aspect values, eco-mode values, base-model-type codes) are deferred to an "Appendix: Supplementary Information by Command" that is not included in the source text. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all supported; default not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired in pin table)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands (015, 016)
  - queryable    # inferred: numerous status request commands (009, 037, 078, etc.)
  - routable     # inferred: INPUT SW CHANGE command (018)
  - levelable    # inferred: VOLUME ADJUST and PICTURE ADJUST commands (030-2, 030-1)
```

## Actions
```yaml
# All command payloads are verbatim hex bytes from the source. CKS = checksum byte
# computed as the low-order 8 bits of the sum of all preceding bytes (see Notes).
# <ID1> = control ID set on projector; <ID2> = model code (varies by model). Both
# omitted from the `command` field below where they are positional response fields.

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
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port). Full value list in Appendix "Supplementary Information by Command" (not in source text).

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
      description: Aspect value; full list in Appendix (not in source text).

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Per source, FFh for LAMP/LIGHT target (DATA01=96h). Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
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
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (s), 04h=Lamp remaining life (%)"

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
      description: >-
        Key code low byte (WORD type). Source key code list:
        POWER ON=02h, POWER OFF=03h, AUTO=05h, MENU=06h, UP=07h, DOWN=08h,
        RIGHT=09h, LEFT=0Ah, ENTER=0Bh, EXIT=0Ch, HELP=0Dh, MAGNIFY UP=0Fh,
        MAGNIFY DOWN=10h, MUTE=13h, PICTURE=29h, COMPUTER1=4Bh, COMPUTER2=4Ch,
        VIDEO1=4Fh, S-VIDEO1=51h, VOLUME UP=84h, VOLUME DOWN=85h, FREEZE=8Ah,
        ASPECT=A3h, SOURCE=D7h, LAMP MODE/ECO=EEh
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys)

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
      description: "Lens target: 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: >-
        Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous,
        81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target (same values as lens_control DATA01)

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
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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
      description: >-
        Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE,
        04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST

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
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
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

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
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
      description: Eco mode value; full list in Appendix (not in source text).

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "For MODE: 00h=PIP, 01h=PbP. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: sub-input value (see Appendix)."

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
      description: Input terminal value; list in Appendix (not in source text).
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: 12-byte error information (DATA01-DATA12) from command 009.

- id: power_state
  type: enum
  values: [standby, power_on, not_supported]
  description: DATA03 of RUNNING STATUS REQUEST (078-2); 00h=Standby, 01h=Power on, FFh=Not supported.

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: DATA06 of RUNNING STATUS REQUEST (078-2).

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  description: DATA04 of RUNNING STATUS REQUEST (078-2).

- id: picture_mute_state
  type: enum
  values: [off, on]
  description: DATA01 of MUTE STATUS REQUEST (078-4).

- id: sound_mute_state
  type: enum
  values: [off, on]
  description: DATA02 of MUTE STATUS REQUEST (078-4).

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  description: DATA03 of MUTE STATUS REQUEST (078-4).

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: DATA01 of COVER STATUS REQUEST (078-6); 00h=Normal (open), 01h=Closed.

- id: lamp_usage_time
  type: integer
  description: Lamp usage time in seconds (updated at 1-min intervals), from 037 / 037-4.

- id: lamp_remaining_life
  type: integer
  description: Lamp remaining life (%) from 037-4; negative if replacement deadline exceeded.

- id: filter_usage_time
  type: integer
  description: Filter usage time in seconds from 037-3; -1 if undefined.

- id: input_signal_status
  type: object
  description: Input signal status block (selection signal type, signal list number) from 078-3.

- id: lens_status
  type: bitmask
  description: Lens operation status (DATA01 of 053-7); bits for lens memory, zoom, focus, lens shift H/V.

- id: lens_position
  type: object
  description: Lens position bounds + current value from 053-1 (upper/lower/current, 16-bit).

- id: gain_parameter
  type: object
  description: Picture/volume/lamp gain bounds + current value from 060-1.

- id: model_name
  type: string
  description: Model name string from 078-5.

- id: serial_number
  type: string
  description: Serial number string from 305-2.

- id: base_model_type
  type: object
  description: Base model type + model name from 305-1.

- id: projector_name
  type: string
  description: LAN projector name from 097-45.

- id: mac_address
  type: string
  description: MAC address (6 bytes) from 097-155.

- id: eco_mode
  type: integer
  description: Eco mode value from 097-8 (values in Appendix, not in source text).

- id: pip_pbp_setting
  type: object
  description: PIP/PbP mode / start position / sub-input from 097-198.

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: Edge blending setting from 097-243-1.

- id: carbon_savings
  type: object
  description: Carbon savings (kg + mg) from 037-6.

- id: information_string
  type: string
  description: Horizontal/vertical sync frequency string from 084.

- id: basic_information
  type: object
  description: Combined operation status / display content / signal type / mute / freeze from 305-3.

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: Selected reference lens memory profile from 053-11.

- id: lens_memory_option
  type: object
  description: Load-by-signal / forced-mute option + ON/OFF from 053-5.
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume set via VOLUME ADJUST (030-2).

- id: brightness
  type: integer
  description: Picture brightness set via PICTURE ADJUST (030-1).

- id: contrast
  type: integer
  description: Picture contrast set via PICTURE ADJUST (030-1).

- id: color
  type: integer
  description: Picture color set via PICTURE ADJUST (030-1).

- id: hue
  type: integer
  description: Picture hue set via PICTURE ADJUST (030-1).

- id: sharpness
  type: integer
  description: Picture sharpness set via PICTURE ADJUST (030-1).

- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust set via OTHER ADJUST (030-15, DATA01=96h).

- id: projector_name_var
  type: string
  description: LAN projector name set via 098-45 (up to 16 bytes).

- id: eco_mode_var
  type: integer
  description: Eco mode set via 098-8 (values in Appendix, not in source text).

- id: lens_profile_var
  type: enum
  values: [profile_1, profile_2]
  description: Reference lens memory profile set via 053-10.

- id: edge_blending_var
  type: enum
  values: [off, on]
  description: Edge blending mode set via 098-243-1.
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are solicited
# replies to commands. Response framing: success = 20h/21h/22h/23h-prefixed frame;
# failure = A0h/A1h/A2h/A3h-prefixed frame with <ERR1> <ERR2>.
```

## Macros
```yaml
# No multi-step command sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes that during POWER ON / POWER OFF (including cooling time) no other
# command can be accepted, but no formal interlock or confirmation procedure is
# documented.
# <!-- UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source. -->
```

## Notes
- **Checksum (CKS):** sum all preceding bytes, take the low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Frame format:** commands begin with a message-type byte (`00h`-`03h` for requests; `20h`-`23h` success responses; `A0h`-`A3h` error responses), followed by `<ID1>` (control ID set on projector) and `<ID2>` (model code, model-dependent), then LEN, then DATA bytes, then CKS.
- **Power-on/off blocking:** while POWER ON is executing, no other command is accepted; while POWER OFF is executing (including cooling time), no other command is accepted.
- **Lens drive:** after sending `7Fh` (+continuous) or `81h` (-continuous) in 053 DATA02, lens can be stopped by sending `00h`. While lens is driving, the same command can re-issue without a stop.
- **Usage-time resolution:** lamp/filter usage time returned in 1-second units but updated at 1-minute intervals.
- **Signal list number:** returned value is 1 less than the practical number; add 1.
- **Error codes:** ERR1/ERR2 combinations cover unrecognized command, unsupported-by-model, invalid value, invalid input, power-off rejection, memory errors, no signal, etc. (full list in section 2.4 of source).

<!-- UNRESOLVED: device-specific value tables referenced as "Appendix: Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base-model-type codes, sub-input values) are not present in the refined source text. -->
<!-- UNRESOLVED: default baud rate not stated (only the supported set 4800-115200). -->
<!-- UNRESOLVED: flow control not stated despite RTS/CTS pins being wired. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: wireless-LAN unit details deferred to a separate operation manual. -->
````

53 actions, all command bytes verbatim. Checksum + frame docs in Notes. Appendix value tables + default baud + flow_control marked UNRESOLVED (not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:46:39.956Z
last_checked_at: 2026-07-22T00:50:11.219Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:50:11.219Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched with identical hex byte sequences to source; transport parameters verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "this manual is a generic Sharp/NEC projector command reference; device-specific parameters (input terminal values, aspect values, eco-mode values, base-model-type codes) are deferred to an \"Appendix: Supplementary Information by Command\" that is not included in the source text."
- "flow control not stated in source (RTS/CTS pins wired in pin table)"
- "no explicit safety warnings, interlock procedures, or power-on"
- "device-specific value tables referenced as \"Appendix: Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base-model-type codes, sub-input values) are not present in the refined source text."
- "default baud rate not stated (only the supported set 4800-115200)."
- "flow control not stated despite RTS/CTS pins being wired."
- "firmware version compatibility not stated."
- "wireless-LAN unit details deferred to a separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
