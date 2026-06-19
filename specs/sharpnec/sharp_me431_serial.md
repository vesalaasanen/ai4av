---
spec_id: admin/sharp-nec-me431
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Me431 Control Spec"
manufacturer: Sharp/NEC
model_family: Me431
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Me431
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:34:34.800Z
last_checked_at: 2026-06-18T08:28:26.796Z
generated_at: 2026-06-18T08:28:26.796Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "ID2 model code value not stated in source (model-dependent)"
  - "control ID (ID1) default value not stated in source"
  - "default baud not stated"
  - "flow control not explicitly stated (full-duplex mode noted)"
  - "source documents no unsolicited notifications. All responses are command-acknowledgement only."
  - "source documents no multi-step sequences."
  - "source contains no explicit safety interlock procedures or power-on sequencing warnings beyond the command-lock notes above."
  - "default ID1 (control ID) value not stated"
  - "ID2 (model code) value for Me431 not stated — model-dependent"
  - "default baud rate not stated (115200/38400/19200/9600/4800 all listed as options)"
  - "serial flow control not explicitly specified (full-duplex mode only noted)"
  - "command timing / inter-command delays not stated"
  - "input terminal value table referenced in Appendix \"Supplementary Information by Command\" not present in this refined excerpt"
  - "aspect/eco-mode/sub-input value tables referenced in Appendix not present in this refined excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:28:26.796Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Me431 Control Spec

## Summary
The Sharp/NEC Me431 is a projector controllable via RS-232C serial and TCP/IP network connections. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1), including power, input switching, mute, lens, picture/volume adjust, lamp/filter information, and status query commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID2 model code value not stated in source (model-dependent) -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated. UNRESOLVED: default baud not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated (full-duplex mode noted)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON (015) / POWER OFF (016) commands present
  - routable        # inferred: INPUT SW CHANGE (018) routing command present
  - queryable       # inferred: many status/information request commands present
  - levelable       # inferred: PICTURE ADJUST / VOLUME ADJUST / lens control present
```

## Actions
```yaml
actions:
  # --- 009. ERROR STATUS REQUEST ---
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  # --- 015. POWER ON ---
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command can be accepted."

  # --- 016. POWER OFF ---
  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off power (including cooling time), no other command can be accepted."

  # --- 018. INPUT SW CHANGE ---
  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: Input terminal value (see Appendix Supplementary Information by Command). Example 06h = video port.

  # --- 020. PICTURE MUTE ON ---
  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video switch."

  # --- 021. PICTURE MUTE OFF ---
  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # --- 022. SOUND MUTE ON ---
  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input/video switch or volume adjust."

  # --- 023. SOUND MUTE OFF ---
  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # --- 024. ONSCREEN MUTE ON ---
  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input/video switch."

  # --- 025. ONSCREEN MUTE OFF ---
  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- 030-1. PICTURE ADJUST ---
  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  # --- 030-2. VOLUME ADJUST ---
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)

  # --- 030-12. ASPECT ADJUST ---
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {checksum}"
    params:
      - name: data01
        type: string
        description: Aspect value (see Appendix Supplementary Information by Command)

  # --- 030-15. OTHER ADJUST (LAMP/LIGHT) ---
  - id: other_adjust_lamp_light
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {data03} {data04} {data05} {checksum}"
    params:
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: "DATA01=96h DATA02=FFh selects LAMP ADJUST / LIGHT ADJUST target."

  # --- 037. INFORMATION REQUEST ---
  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (DATA83-86 seconds), filter usage time (DATA87-90 seconds)."

  # --- 037-3. FILTER USAGE INFORMATION REQUEST ---
  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04 seconds) and filter alarm start time (DATA05-08 seconds). -1 if undefined."

  # --- 037-4. LAMP INFORMATION REQUEST 3 ---
  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  # --- 050. REMOTE KEY CODE ---
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Key code low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: data02
        type: string
        description: Key code high byte (WORD type, typically 00h)

  # --- 051. SHUTTER CLOSE ---
  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  # --- 052. SHUTTER OPEN ---
  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- 053. LENS CONTROL ---
  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Lens adjustment target (e.g. 06h=Periphery Focus)"
      - name: data02
        type: string
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: "Send 00h after 7Fh/81h to stop continuous drive."

  # --- 053-1. LENS CONTROL REQUEST ---
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {checksum}"
    params:
      - name: data01
        type: string
        description: Lens adjustment target

  # --- 053-2. LENS CONTROL 2 ---
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {checksum}"
    params:
      - name: data01
        type: string
        description: "Target (FFh=Stop; otherwise lens axis selector)"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  # --- 053-3. LENS MEMORY CONTROL ---
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL ---
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile number set via 053-10 LENS PROFILE SET."

  # --- 053-5. LENS MEMORY OPTION REQUEST ---
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  # --- 053-6. LENS MEMORY OPTION SET ---
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST ---
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop,1=Operating)."

  # --- 053-10. LENS PROFILE SET ---
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  # --- 053-11. LENS PROFILE REQUEST ---
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  # --- 060-1. GAIN PARAMETER REQUEST 3 ---
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

  # --- 078-1. SETTING REQUEST ---
  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  # --- 078-2. RUNNING STATUS REQUEST ---
  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  # --- 078-3. INPUT STATUS REQUEST ---
  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  # --- 078-4. MUTE STATUS REQUEST ---
  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  # --- 078-5. MODEL NAME REQUEST ---
  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  # --- 078-6. COVER STATUS REQUEST ---
  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  # --- 079. FREEZE CONTROL ---
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "01h=Freeze on, 02h=Freeze off"

  # --- 084. INFORMATION STRING REQUEST ---
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {checksum}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  # --- 097-8. ECO MODE REQUEST ---
  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  # --- 097-45. LAN PROJECTOR NAME REQUEST ---
  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  # --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  # --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
  - id: pip_pbp_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  # --- 097-243-1. EDGE BLENDING MODE REQUEST ---
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  # --- 098-8. ECO MODE SET ---
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: Value set for the eco mode (see Appendix)

  # --- 098-45. LAN PROJECTOR NAME SET ---
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {checksum}"
    params:
      - name: data01_to_data16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)

  # --- 098-198. PIP/PICTURE BY PICTURE SET ---
  - id: pip_pbp_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value (context-dependent on DATA01)"

  # --- 098-243-1. EDGE BLENDING MODE SET ---
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=OFF, 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST ---
  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  # --- 305-2. SERIAL NUMBER REQUEST ---
  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  # --- 305-3. BASIC INFORMATION REQUEST ---
  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  # --- 319-10. AUDIO SELECT SET ---
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: Input terminal (see Appendix)
      - name: data02
        type: string
        description: "Setting value: 00h=terminal-specified, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA03 / 305-3 BASIC INFORMATION REQUEST DATA01"

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution, not_supported]
    source: "078-2 DATA04"

  - id: picture_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA01"

  - id: sound_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA02"

  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA03"

  - id: error_status
    type: bitmask
    description: "12-byte error bitmask from 009 ERROR STATUS REQUEST. See source error information list for bit meanings (cover/fan/temp/lamp/etc)."
    source: "009 ERROR STATUS REQUEST DATA01-12"

  - id: command_ack
    type: enum
    values: [success, error]
    description: "Response framing: 2Xh prefix = success, AXh prefix = error (carries ERR1/ERR2)."
    source: "2.3 Responses"

  - id: error_code
    type: struct
    description: "ERR1+ERR2 pair from error responses. See 2.4 Error code list."
    source: "2.4 Error code list"
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: Picture brightness (PICTURE ADJUST target 00h)
  - id: contrast
    type: integer
    description: Picture contrast (PICTURE ADJUST target 01h)
  - id: color
    type: integer
    description: Picture color (PICTURE ADJUST target 02h)
  - id: hue
    type: integer
    description: Picture hue (PICTURE ADJUST target 03h)
  - id: sharpness
    type: integer
    description: Picture sharpness (PICTURE ADJUST target 04h)
  - id: volume
    type: integer
    description: Sound volume (VOLUME ADJUST)
  - id: lamp_light_adjust
    type: integer
    description: Lamp/Light adjust (OTHER ADJUST target 96h FFh)
  - id: lamp_usage_time_seconds
    type: integer
    description: Lamp usage time in seconds (DATA83-86 of INFORMATION REQUEST)
  - id: filter_usage_time_seconds
    type: integer
    description: Filter usage time in seconds
  - id: lamp_remaining_life_percent
    type: integer
    description: Lamp remaining life percentage (negative if past replacement deadline)
  - id: projector_name
    type: string
    description: LAN projector name (up to 16 bytes)
  - id: eco_mode
    type: string
    description: Eco/light/lamp mode setting
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are command-acknowledgement only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other commands accepted while power-on sequence in progress"
  - "POWER OFF: no other commands accepted during power-off including cooling time"
# UNRESOLVED: source contains no explicit safety interlock procedures or power-on sequencing warnings beyond the command-lock notes above.
```

## Notes
- Binary protocol. All command/response frames begin with a type byte (00h-03h command, 20h/22h/23h success response, A0h/A1h/A2h/A3h error response), followed by command/parameter bytes and a trailing checksum (CKS).
- Checksum is the low-order byte of the sum of all preceding bytes.
- Frames carry `<ID1>` (control ID set on projector) and `<ID2>` (model code, model-dependent) in success/error responses. Broadcast/initial commands use 00h 00h placeholders.
- RS-232C uses D-SUB 9P cross cable on the PC CONTROL port (pin assignment documented in source §1.1).
- Source documents a wired/wireless LAN path with TCP port 7142 in addition to serial.
- Usage-time fields update at one-minute intervals despite one-second resolution.
- Lamp remaining life returns negative percentage if replacement deadline exceeded.
<!-- UNRESOLVED: default ID1 (control ID) value not stated -->
<!-- UNRESOLVED: ID2 (model code) value for Me431 not stated — model-dependent -->
<!-- UNRESOLVED: default baud rate not stated (115200/38400/19200/9600/4800 all listed as options) -->
<!-- UNRESOLVED: serial flow control not explicitly specified (full-duplex mode only noted) -->
<!-- UNRESOLVED: command timing / inter-command delays not stated -->
<!-- UNRESOLVED: input terminal value table referenced in Appendix "Supplementary Information by Command" not present in this refined excerpt -->
<!-- UNRESOLVED: aspect/eco-mode/sub-input value tables referenced in Appendix not present in this refined excerpt -->
````

Spec output above. 56 source commands enumerated — no skip, no collapse. All hex payloads verbatim. `entity_id: sharp_nec_me431` set from input. UNRESOLVED markers on default baud, ID1/ID2, appendix value tables.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:34:34.800Z
last_checked_at: 2026-06-18T08:28:26.796Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:28:26.796Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "ID2 model code value not stated in source (model-dependent)"
- "control ID (ID1) default value not stated in source"
- "default baud not stated"
- "flow control not explicitly stated (full-duplex mode noted)"
- "source documents no unsolicited notifications. All responses are command-acknowledgement only."
- "source documents no multi-step sequences."
- "source contains no explicit safety interlock procedures or power-on sequencing warnings beyond the command-lock notes above."
- "default ID1 (control ID) value not stated"
- "ID2 (model code) value for Me431 not stated — model-dependent"
- "default baud rate not stated (115200/38400/19200/9600/4800 all listed as options)"
- "serial flow control not explicitly specified (full-duplex mode only noted)"
- "command timing / inter-command delays not stated"
- "input terminal value table referenced in Appendix \"Supplementary Information by Command\" not present in this refined excerpt"
- "aspect/eco-mode/sub-input value tables referenced in Appendix not present in this refined excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
