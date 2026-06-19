---
spec_id: admin/sharp-nec-led-fa019i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA019I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA019I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA019I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:38:32.582Z
last_checked_at: 2026-06-18T08:02:18.853Z
generated_at: 2026-06-18T08:02:18.853Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source manual is a generic reference (BDT140013 Rev 7.1) covering multiple models; exact command/parameter support for the FA019I2 specifically (model code ID2, supported input terminals, aspect values, eco-mode values, base model type) requires the per-model \"Supplementary Information by Command\" appendix which is not present in the provided source text."
  - "source states \"Full duplex\" communication mode and wires RTS<->CTS, but does not explicitly specify a flow-control setting"
  - "FA019I2 model code not stated in source."
  - "not in source).\""
  - "eco-mode value list is in the per-model appendix, not in source"
  - "numeric min/max/default not stated; returned dynamically by 060-1 GAIN PARAMETER REQUEST 3"
  - "device-reported via 060-1"
  - "no push/event mechanism documented in source"
  - "no explicit power-on sequencing procedure or safety interlock"
  - "FA019I2-specific model code (ID2), firmware version compatibility, supported input-terminal enumeration, aspect value enumeration, eco-mode value enumeration, base-model-type enumeration, and PIP sub-input value enumeration — all referenced to an appendix not included in the source."
  - "serial flow_control setting (source states \"Full duplex\" and wires RTS/CTS but does not explicitly specify a flow-control mode)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:02:18.853Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands found verbatim in source; transport parameters fully supported. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA019I2 Control Spec

## Summary
The Sharp/NEC LED FA019I2 is a projector controllable via RS-232C serial (PC CONTROL, D-SUB 9P) and via wired/wireless LAN using TCP port 7142. This spec covers the binary command protocol documented in the "Projector Control Command Reference Manual" (BDT140013, Revision 7.1), including power, input switching, mute, picture/volume/lens adjustment, lens memory, status queries, and eco/edge-blending/PIP control. Commands are binary hex frames with a trailing checksum byte.

<!-- UNRESOLVED: The source manual is a generic reference (BDT140013 Rev 7.1) covering multiple models; exact command/parameter support for the FA019I2 specifically (model code ID2, supported input terminals, aspect values, eco-mode values, base model type) requires the per-model "Supplementary Information by Command" appendix which is not present in the provided source text. -->

## Transport
```yaml
# Both RS-232C serial and LAN (TCP) are explicitly documented. ID1/ID2/CKS
# framing applies identically over both transports.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # supported rates: 115200/38400/19200/9600/4800 bps (source lists all five)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode and wires RTS<->CTS, but does not explicitly specify a flow-control setting
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable   # inferred: many status/information request commands present
  - levelable   # inferred: picture/volume/lens/gain adjustment commands present
```

## Actions
```yaml
# Binary frame structure (applies to every command below):
#   <class> <op> <ID1> <ID2> <LEN> [<DATA...>] <CKS>
#   - class : request class byte (00h/01h/02h/03h). Success responses use
#             20h/21h/22h/23h; error responses use A0h/A1h/A2h/A3h.
#   - op    : operation/command code.
#   - ID1   : control ID set on the projector (00h default in examples).
#   - ID2   : model code, varies by model (00h default in examples).
#             UNRESOLVED: FA019I2 model code not stated in source.
#   - LEN   : data length (bytes) following LEN.
#   - DATA  : variable data (documented per command).
#   - CKS   : checksum = low-order one byte of the sum of all preceding bytes.
# Request payloads below are copied verbatim from the source. <DATA..> and <CKS>
# are placeholders to be filled at runtime; 00h values for ID1/ID2 are the
# documented defaults.

actions:
  - id: error_status_request
    label: Error Status Request (009)
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitfields (cover, fan, temperature, lamp, etc.)."

  - id: power_on
    label: Power On (015)
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power is turning on."

  - id: power_off
    label: Power Off (016)
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off (incl. cooling time)."

  - id: input_sw_change
    label: Input SW Change (018)
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal selector (DATA01). Example: 06h = video port. Full value list in appendix (UNRESOLVED: not in source)."

  - id: picture_mute_on
    label: Picture Mute On (020)
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: Picture Mute Off (021)
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On (022)
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: Sound Mute Off (023)
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On (024)
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off (025)
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust (030-1)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        description: "Adjustment target (DATA01): 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: mode
        type: enum
        description: "Adjustment mode (DATA02): 00h=absolute, 01h=relative."
      - name: value
        type: integer
        description: "Adjustment value (DATA03 low byte, DATA04 high byte)."

  - id: volume_adjust
    label: Volume Adjust (030-2)
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: enum
        description: "Adjustment mode (DATA01): 00h=absolute, 01h=relative."
      - name: value
        type: integer
        description: "Adjustment value (DATA02 low byte, DATA03 high byte)."

  - id: aspect_adjust
    label: Aspect Adjust (030-12)
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value (DATA01). Full value list in appendix (UNRESOLVED: not in source)."

  - id: other_adjust
    label: Other Adjust (030-15)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01=96h (LAMP ADJUST / LIGHT ADJUST); DATA02=FFh."
      - name: mode
        type: enum
        description: "Adjustment mode (DATA03): 00h=absolute, 01h=relative."
      - name: value
        type: integer
        description: "Adjustment value (DATA04 low byte, DATA05 high byte)."

  - id: information_request
    label: Information Request (037)
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time (DATA83-86, seconds), filter usage time (DATA87-90, seconds)."

  - id: filter_usage_information_request
    label: Filter Usage Information Request (037-3)
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04, seconds) and filter alarm start time (DATA05-08, seconds). -1 if undefined."

  - id: lamp_information_request_3
    label: Lamp Information Request 3 (037-4)
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: enum
        description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: content
        type: enum
        description: "DATA02: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request (037-6)
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: content
        type: enum
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation."

  - id: remote_key_code
    label: Remote Key Code (050)
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code (DATA01 low, DATA02 high). Documented keys incl. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."

  - id: shutter_close
    label: Shutter Close (051)
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: Shutter Open (052)
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: Lens Control (053)
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01: 06h=Periphery Focus."
      - name: drive
        type: enum
        description: "DATA02: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s."

  - id: lens_control_request
    label: Lens Control Request (053-1)
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "Lens adjustment target (DATA01). Returns upper/lower range and current value."

  - id: lens_control_2
    label: Lens Control 2 (053-2)
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01: FFh=Stop (mode/value ignored), otherwise adjustment target."
      - name: mode
        type: enum
        description: "DATA02: 00h=absolute, 02h=relative."
      - name: value
        type: integer
        description: "Adjustment value (DATA03 low byte, DATA04 high byte)."

  - id: lens_memory_control
    label: Lens Memory Control (053-3)
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control (053-4)
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile selected via LENS PROFILE SET (053-10)."

  - id: lens_memory_option_request
    label: Lens Memory Option Request (053-5)
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Returns DATA02: 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: Lens Memory Option Set (053-6)
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: value
        type: enum
        description: "DATA02: 00h=OFF, 01h=ON."

  - id: lens_information_request
    label: Lens Information Request (053-7)
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: lens memory / zoom / focus / lens-shift-H / lens-shift-V operation state (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: Lens Profile Set (053-10)
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: enum
        description: "DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request
    label: Lens Profile Request (053-11)
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3 (060-1)
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: name
        type: enum
        description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST. Returns status, upper/lower/default/current limits and adjustment widths."

  - id: setting_request
    label: Setting Request (078-1)
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function availability, profile/timer function."

  - id: running_status_request
    label: Running Status Request (078-2)
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: Input Status Request (078-3)
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, displayed content."

  - id: mute_status_request
    label: Mute Status Request (078-4)
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display state."

  - id: model_name_request
    label: Model Name Request (078-5)
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name string (DATA01-32, NUL-terminated)."

  - id: cover_status_request
    label: Cover Status Request (078-6)
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status: 00h=Normal (open), 01h=Cover closed."

  - id: freeze_control
    label: Freeze Control (079)
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: state
        type: enum
        description: "DATA01: 01h=freeze on, 02h=freeze off."

  - id: information_string_request
    label: Information String Request (084)
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: type
        type: enum
        description: "DATA01: 03h=horizontal sync frequency, 04h=vertical sync frequency."

  - id: eco_mode_request
    label: Eco Mode Request (097-8)
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value. Value list in appendix (UNRESOLVED: not in source)."

  - id: lan_projector_name_request
    label: LAN Projector Name Request (097-45)
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name string (DATA01-17, NUL-terminated)."

  - id: lan_mac_address_request
    label: LAN MAC Address Status Request 2 (097-155)
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address (DATA01-06)."

  - id: pip_pbp_request
    label: PIP/Picture By Picture Request (097-198)
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request (097-243-1)
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: Eco Mode Set (098-8)
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "Eco/light/lamp mode value (DATA01). Value list in appendix (UNRESOLVED: not in source)."

  - id: lan_projector_name_set
    label: LAN Projector Name Set (098-45)
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-16), NUL-terminated."

  - id: pip_pbp_set
    label: PIP/Picture By Picture Set (098-198)
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: value
        type: integer
        description: "DATA02 setting value (e.g. MODE: 00h=PIP, 01h=PBP; START POSITION: 00h-03h corners; sub-input values per appendix, UNRESOLVED)."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set (098-243-1)
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: enum
        description: "DATA01: 00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: Base Model Type Request (305-1)
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type and model name string. Base model type value list in appendix (UNRESOLVED: not in source)."

  - id: serial_number_request
    label: Serial Number Request (305-2)
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number string (DATA01-16, NUL-terminated)."

  - id: basic_information_request
    label: Basic Information Request (305-3)
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, displayed content, signal types, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: Audio Select Set (319-10)
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal (DATA01). Value list in appendix (UNRESOLVED: not in source)."
      - name: value
        type: enum
        description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST / 305-3 BASIC INFORMATION REQUEST"

  - id: picture_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST"

  - id: sound_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST"

  - id: onscreen_mute
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST"

  - id: freeze_state
    type: enum
    values: [off, on]
    source: "305-3 BASIC INFORMATION REQUEST (DATA09)"

  - id: cover_status
    type: enum
    values: [normal_open, cover_closed]
    source: "078-6 COVER STATUS REQUEST"

  - id: edge_blending
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST"

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: "053-11 LENS PROFILE REQUEST"

  - id: input_signal_type
    type: enum
    values: [computer, video, s_video, component, dvi_d, hdmi, displayport, viewer]
    source: "078-3 INPUT STATUS REQUEST (DATA04)"

  - id: error_status
    type: bitfield
    source: "009 ERROR STATUS REQUEST (DATA01-12)"
    notes: "Cover, fan, temperature, lamp, mirror-cover, interlock-switch, foreign-matter sensor and other device fault bits."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: "037-4 LAMP INFORMATION REQUEST 3 (DATA03-06); updated at 1-minute intervals"

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: "037-4 LAMP INFORMATION REQUEST 3; negative if replacement deadline exceeded"

  - id: filter_usage_time
    type: integer
    unit: seconds
    source: "037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04)"

  - id: eco_mode
    type: enum
    values: []  # UNRESOLVED: eco-mode value list is in the per-model appendix, not in source
    source: "097-8 ECO MODE REQUEST"

  - id: projector_name
    type: string
    source: "097-45 LAN PROJECTOR NAME REQUEST"

  - id: mac_address
    type: string
    source: "097-155 LAN MAC ADDRESS STATUS REQUEST 2"

  - id: model_name
    type: string
    source: "078-5 MODEL NAME REQUEST"

  - id: serial_number
    type: string
    source: "305-2 SERIAL NUMBER REQUEST"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: "Sound volume level."
    limits: null  # UNRESOLVED: numeric min/max/default not stated; returned dynamically by 060-1 GAIN PARAMETER REQUEST 3
    set_via: "030-2 VOLUME ADJUST"

  - id: brightness
    type: integer
    description: "Picture brightness."
    limits: null  # UNRESOLVED: device-reported via 060-1
    set_via: "030-1 PICTURE ADJUST (DATA01=00h)"

  - id: contrast
    type: integer
    limits: null  # UNRESOLVED: device-reported via 060-1
    set_via: "030-1 PICTURE ADJUST (DATA01=01h)"

  - id: color
    type: integer
    limits: null  # UNRESOLVED: device-reported via 060-1
    set_via: "030-1 PICTURE ADJUST (DATA01=02h)"

  - id: hue
    type: integer
    limits: null  # UNRESOLVED: device-reported via 060-1
    set_via: "030-1 PICTURE ADJUST (DATA01=03h)"

  - id: sharpness
    type: integer
    limits: null  # UNRESOLVED: device-reported via 060-1
    set_via: "030-1 PICTURE ADJUST (DATA01=04h)"

  - id: lamp_light_adjust
    type: integer
    description: "Lamp/Light adjust level."
    limits: null  # UNRESOLVED: device-reported via 060-1
    set_via: "030-15 OTHER ADJUST"
```

## Events
```yaml
# No unsolicited notifications are described in the source; all responses are
# solicited (returned after a command).
events: []  # UNRESOLVED: no push/event mechanism documented in source
```

## Macros
```yaml
# No multi-step command sequences are described in the source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_transition_lockout
    description: "While POWER ON (015) is executing, no other command is accepted. While POWER OFF (016) is executing (including cooling time), no other command is accepted."
    source: "3.2 POWER ON / 3.3 POWER OFF"
  - id: interlock_switch
    description: "An interlock switch is monitored; if open it is reported as an error (DATA09 bit1 of 009 ERROR STATUS REQUEST)."
    source: "3.1 ERROR STATUS REQUEST, extended status"
  - id: mirror_lens_cover
    description: "Mirror cover / lens cover status is monitored (00h normal/open, 01h closed) via 078-6 COVER STATUS REQUEST; cover closed is also surfaced in error status."
    source: "3.38 COVER STATUS REQUEST"
# UNRESOLVED: no explicit power-on sequencing procedure or safety interlock
# arming sequence is documented beyond the error-status bits above.
```

## Notes
- Command/response framing is binary hex. A leading class byte distinguishes requests (00h/01h/02h/03h) from success responses (20h/21h/22h/23h) and error responses (A0h/A1h/A2h/A3h). Example checksum: `20h 81h 01h 60h 01h 00h` → sum = 103h → CKS = 03h.
- `ID1` = control ID configured on the projector (00h default in examples). `ID2` = model code, varies by model. The FA019I2 model code is not stated in the source; both must be set to the projector's configured values and the checksum recomputed accordingly.
- The source is a generic manual (BDT140013 Rev 7.1). Parameter value lists marked "see the Appendix Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base model type values, PIP sub-input values) are NOT present in the provided refined source and are left UNRESOLVED.
- Lamp/filter usage times are returned in one-second units but updated at one-minute intervals.
- Picture/Sound/Onscreen mute auto-clear on input-terminal switch or video-signal switch (Picture/Onscreen), and additionally on volume adjustment (Sound).
- LENS CONTROL (053): after sending a continuous-drive byte (7Fh plus / 81h minus), send 00h to stop. While the lens is driving, the same command can be reissued to change direction without an explicit stop.

<!-- UNRESOLVED: FA019I2-specific model code (ID2), firmware version compatibility, supported input-terminal enumeration, aspect value enumeration, eco-mode value enumeration, base-model-type enumeration, and PIP sub-input value enumeration — all referenced to an appendix not included in the source. -->
<!-- UNRESOLVED: serial flow_control setting (source states "Full duplex" and wires RTS/CTS but does not explicitly specify a flow-control mode). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:38:32.582Z
last_checked_at: 2026-06-18T08:02:18.853Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:02:18.853Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands found verbatim in source; transport parameters fully supported. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source manual is a generic reference (BDT140013 Rev 7.1) covering multiple models; exact command/parameter support for the FA019I2 specifically (model code ID2, supported input terminals, aspect values, eco-mode values, base model type) requires the per-model \"Supplementary Information by Command\" appendix which is not present in the provided source text."
- "source states \"Full duplex\" communication mode and wires RTS<->CTS, but does not explicitly specify a flow-control setting"
- "FA019I2 model code not stated in source."
- "not in source).\""
- "eco-mode value list is in the per-model appendix, not in source"
- "numeric min/max/default not stated; returned dynamically by 060-1 GAIN PARAMETER REQUEST 3"
- "device-reported via 060-1"
- "no push/event mechanism documented in source"
- "no explicit power-on sequencing procedure or safety interlock"
- "FA019I2-specific model code (ID2), firmware version compatibility, supported input-terminal enumeration, aspect value enumeration, eco-mode value enumeration, base-model-type enumeration, and PIP sub-input value enumeration — all referenced to an appendix not included in the source."
- "serial flow_control setting (source states \"Full duplex\" and wires RTS/CTS but does not explicitly specify a flow-control mode)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
