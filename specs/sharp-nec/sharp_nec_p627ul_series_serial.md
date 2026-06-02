---
spec_id: admin/sharp-nec-p627ul-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC P627UL Series Control Spec"
manufacturer: Sharp-NEC
model_family: "P627UL Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "P627UL Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-26T22:51:42.920Z
generated_at: 2026-04-26T22:51:42.920Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "P627UL-specific input terminal codes not in appendix (appendix lists older NP-series models); TCP port 7142 confirmed for LAN control but serial-only file was provided"
  - "flow control not explicitly stated"
  - "most parameters are settable via Actions rather than separate Variables."
  - "no unsolicited event notifications described in source. Device only responds to commands."
  - "no explicit multi-step macros described in source."
  - "no explicit safety warnings or interlock procedures beyond command timing notes."
  - "serial flow control (RTS/CTS) pin present in pinout but not confirmed in communication settings table"
  - "P627UL-specific appendix tables missing from source; only older NP-series models listed in supplementary info"
  - "TCP port 7142 from LAN section not used in serial-only spec but included for completeness since source covers both interfaces"
verification:
  verdict: verified
  checked_at: 2026-04-26T22:51:42.920Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions match distinct source commands; baud/data/parity/stop settings verified in source serial communication table. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Sharp-NEC P627UL Series Control Spec

## Summary
Laser projector supporting RS-232C serial and wired TCP/IP control. Supports power on/off, input routing, picture/sound mute, volume adjustment, lens control, eco mode, and queryable status. Commands use hex-encoded binary format with checksum.

<!-- UNRESOLVED: P627UL-specific input terminal codes not in appendix (appendix lists older NP-series models); TCP port 7142 confirmed for LAN control but serial-only file was provided -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # 115200/38400/19200/9600/4800 bps (selectable)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other command accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other command accepted during cooling.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (hex). Refer to appendix for model-specific codes.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Mute off triggered by input terminal switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Mute off triggered by input switch, video signal switch, or volume adjust.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Mute off triggered by input terminal switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "0= Brightness, 1=Contrast, 2=Color, 3=Hue, 4=Sharpness"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode code. Refer to appendix for model-specific values.

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "0x96FF=Lamp Adjust/Light Adjust"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code (e.g. 0x0200=POWER ON, 0x0300=POWER OFF, 0x0500=AUTO, etc.)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "0=Zoom, 1=Focus, 2=Lens Shift(H), 3=Lens Shift(V), 6=Periphery Focus"
    - name: direction
      type: integer
      description: "0=Stop, 1=+1s, 2=+0.5s, 3=+0.25s, 0x7F=continuous+, 0x81=continuous-, 0xFD=-0.25s, 0xFE=-0.5s, 0xFF=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "0=Zoom, 1=Focus, 2=Lens Shift(H), 3=Lens Shift(V), 0xFF=Stop"
    - name: mode
      type: integer
      description: "0=absolute, 2=relative"
    - name: value
      type: integer
      description: 16-bit position value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "0=Profile 1, 1=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "1=On, 2=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value. Refer to appendix for model-specific values.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Up to 16 bytes, NUL-terminated.

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT, 9=SUB INPUT 2, 0xA=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code.
    - name: value
      type: integer
      description: "0=specified terminal, 2=COMPUTER"
- id: information_request_cmd
  label: Information Request
  kind: action
  params: []
  description: "037. INFORMATION REQUEST - Gets the information of the projector including projector name, lamp usage time, filter usage time."

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []
  description: "037-3. FILTER USAGE INFORMATION REQUEST - Gets filter usage information such as usage time."

- id: lamp_info_request
  label: Lamp Information Request
  kind: action
  params: []
  description: "037-4. LAMP INFORMATION REQUEST 3 - Gets lamp information such as usage time and remaining life."

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: action
  params: []
  description: "037-6. CARBON SAVINGS INFORMATION REQUEST - Gets the Carbon Saving values on the projector."

- id: lens_control_request_cmd
  label: Lens Control Request
  kind: action
  params: []
  description: "053-1. LENS CONTROL REQUEST - Gets adjusted values of the lens position."

- id: lens_memory_option_request_cmd
  label: Lens Memory Option Request
  kind: action
  params: []
  description: "053-5. LENS MEMORY OPTION REQUEST - Gets the value set for the lens memory."

- id: lens_information_request
  label: Lens Information Request
  kind: action
  params: []
  description: "053-7. LENS INFORMATION REQUEST - Gets information about the lens of the projector."

- id: lens_profile_request_cmd
  label: Lens Profile Request
  kind: action
  params: []
  description: "053-11. LENS PROFILE REQUEST - Gets the selected profile number of the reference lens memory."

- id: gain_parameter_request_cmd
  label: Gain Parameter Request
  kind: action
  params: []
  description: "060-1. GAIN PARAMETER REQUEST 3 - Gets adjusted values of the picture, volume, and backlight."

- id: setting_request_cmd
  label: Setting Request
  kind: action
  params: []
  description: "078-1. SETTING REQUEST - Gets information of the projector."

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  description: "078-2. RUNNING STATUS REQUEST - Gets the information about the operation status of the projector."

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  description: "078-3. INPUT STATUS REQUEST - Gets the information about the input signal status of the projector."

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  description: "078-4. MUTE STATUS REQUEST - Gets the mute status of the projector."

- id: model_name_request_cmd
  label: Model Name Request
  kind: action
  params: []
  description: "078-5. MODEL NAME REQUEST - Gets the model name of the projector."

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  description: "078-6. COVER STATUS REQUEST - Gets the status of the mirror cover or lens cover."

- id: information_string_request_cmd
  label: Information String Request
  kind: action
  params: []
  description: "084. INFORMATION STRING REQUEST - Gets information strings (English) displayed on the projector."

- id: eco_mode_request_cmd
  label: Eco Mode Request
  kind: action
  params: []
  description: "097-8. ECO MODE REQUEST - Gets the value set for the eco mode."

- id: lan_projector_name_request_cmd
  label: LAN Projector Name Request
  kind: action
  params: []
  description: "097-45. LAN PROJECTOR NAME REQUEST - Gets the projector name."

- id: lan_mac_address_request_cmd
  label: LAN MAC Address Request
  kind: action
  params: []
  description: "097-155. LAN MAC ADDRESS STATUS REQUEST2 - Gets the MAC address of the projector."

- id: pip_picture_by_picture_request_cmd
  label: PIP/Picture by Picture Request
  kind: action
  params: []
  description: "097-198. PIP/PICTURE BY PICTURE REQUEST - Gets the value set for the picture in picture and picture by picture."

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  description: "009. ERROR STATUS REQUEST - Gets information about errors occurring in the projector."

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []
  description: "305-1. BASE MODEL TYPE REQUEST - Gets the base model type of the projector."

- id: serial_number_request_cmd
  label: Serial Number Request
  kind: action
  params: []
  description: "305-2. SERIAL NUMBER REQUEST - Gets the serial number of the projector."

- id: basic_information_request_cmd
  label: Basic Information Request
  kind: action
  params: []
  description: "305-3. BASIC INFORMATION REQUEST - Gets the operation status of the projector."
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitset
  description: Returns error bitfield (DATA01-DATA12). Bits for cover error, fan error, temperature error, power error, lamp status, etc.

- id: power_state
  label: Power State
  type: enum
  values: [standby, power_on, cooling]
  description: From RUNNING STATUS REQUEST (DATA03: 00h=Standby, 01h=Power on, 05h=Cooling)

- id: input_status
  label: Input Status
  type: object
  description: Input signal status from INPUT STATUS REQUEST.

- id: mute_status
  label: Mute Status
  type: object
  description: Picture/Sound/Onscreen mute state from MUTE STATUS REQUEST.

- id: model_name
  label: Model Name
  type: string
  description: Up to 32 chars NUL-terminated from MODEL NAME REQUEST.

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, closed]
  description: Mirror/lens cover status (00h=normal, 01h=closed).

- id: running_status
  label: Running Status
  type: object
  description: Full operation status including power, cooling, operation mode.

- id: information_request
  label: Information Request
  type: object
  description: Projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90).

- id: filter_usage_info
  label: Filter Usage Info
  type: object
  description: Filter usage time and alarm start time in seconds.

- id: lamp_info
  label: Lamp Info
  type: object
  description: Lamp usage time (seconds) or remaining life (%) by lamp index.

- id: carbon_savings_info
  label: Carbon Savings Info
  type: object
  description: Total or operation Carbon Savings in kg and mg.

- id: information_string
  label: Information String
  type: string
  description: Horizontal or vertical sync frequency string from INFORMATION STRING REQUEST.

- id: eco_mode
  label: Eco Mode
  type: integer
  description: Current eco mode value from ECO MODE REQUEST.

- id: projector_name
  label: Projector Name
  type: string
  description: Up to 17 chars NUL-terminated from LAN PROJECTOR NAME REQUEST.

- id: mac_address
  label: MAC Address
  type: string
  description: 6-byte MAC address from LAN MAC ADDRESS STATUS REQUEST2.

- id: pip_picture_by_picture
  label: PIP/Picture by Picture
  type: object
  description: PIP/PbP mode, position, sub-input from PIP/PICTURE BY PICTURE REQUEST.

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]
  description: Edge blending state from EDGE BLENDING MODE REQUEST.

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: Lens position limits and current value for target (zoom/focus/shiftH/shiftV).

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  description: LOAD BY SIGNAL and FORCED MUTE settings.

- id: lens_profile
  label: Lens Profile
  type: enum
  values: [profile_1, profile_2]
  description: Selected reference lens memory profile number.

- id: gain_parameter
  label: Gain Parameter
  type: object
  description: Picture/volume adjustment ranges and current value from GAIN PARAMETER REQUEST 3.

- id: setting_request
  label: Setting Request
  type: object
  description: Base model type, sound function, profile number.

- id: basic_info
  label: Basic Info
  type: object
  description: Operation status, signal type, display state, mute states, freeze status.

- id: lens_info
  label: Lens Info
  type: bitset
  description: Lens motor operation status bits.

- id: audio_select
  label: Audio Select
  type: object
  description: Audio input terminal and execution result.
```

## Variables
```yaml
# UNRESOLVED: most parameters are settable via Actions rather than separate Variables.
# Variables section retained for standalone settable parameters not tied to discrete commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source. Device only responds to commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Power on command blocks all other commands until power-on sequence completes.
  - description: Power off command blocks all other commands until cooling completes.
  - description: Some models cannot receive commands in standby mode (model-dependent standby mode setting required).
  - description: Lens control stop command (00h in DATA02) required to stop continuous lens drive (7Fh/81h).
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond command timing notes.
```

## Notes
Command format: `20h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` — all values hexadecimal. Checksum = low-order byte of sum of all preceding bytes. Response format varies by success/failure (22h/23h success vs A0h/A2h/A3h failure).

Power commands (015, 016) block other commands during execution — no pipelining.

<!-- UNRESOLVED: serial flow control (RTS/CTS) pin present in pinout but not confirmed in communication settings table -->
<!-- UNRESOLVED: P627UL-specific appendix tables missing from source; only older NP-series models listed in supplementary info -->
<!-- UNRESOLVED: TCP port 7142 from LAN section not used in serial-only spec but included for completeness since source covers both interfaces -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-26T22:51:42.920Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:51:42.920Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions match distinct source commands; baud/data/parity/stop settings verified in source serial communication table. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "P627UL-specific input terminal codes not in appendix (appendix lists older NP-series models); TCP port 7142 confirmed for LAN control but serial-only file was provided"
- "flow control not explicitly stated"
- "most parameters are settable via Actions rather than separate Variables."
- "no unsolicited event notifications described in source. Device only responds to commands."
- "no explicit multi-step macros described in source."
- "no explicit safety warnings or interlock procedures beyond command timing notes."
- "serial flow control (RTS/CTS) pin present in pinout but not confirmed in communication settings table"
- "P627UL-specific appendix tables missing from source; only older NP-series models listed in supplementary info"
- "TCP port 7142 from LAN section not used in serial-only spec but included for completeness since source covers both interfaces"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
