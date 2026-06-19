---
spec_id: admin/sharp-nec-me551-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Me551 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC Me551 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC Me551 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:29:23.641Z
last_checked_at: 2026-06-18T08:30:55.023Z
generated_at: 2026-06-18T08:30:55.023Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Me551 Mpi4E\" taken from device-name token; source manual is generic across Sharp/NEC projector family and does not single out this model."
  - "authentication/credentials for LAN not described in source."
  - "command timing / inter-command delay not stated."
  - "bounds returned by GAIN PARAMETER REQUEST 3, not fixed in source"
  - "no power-on sequencing procedure described beyond interlock bits. Voltage/current/power specs not in this source."
  - "firmware version compatibility not stated."
  - "default baud rate not stated."
  - "adjustment-range bounds only available at runtime via GAIN PARAMETER REQUEST 3, not as fixed constants in source."
  - "input-terminal / eco-mode / aspect / signal-type enum value tables live in an Appendix not included in this source excerpt."
  - "LAN authentication/credentials not described; auth.type set to `none` is an inference (Tier 2) and should be verified."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:30:55.023Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Me551 Mpi4E Control Spec

## Summary
Sharp/NEC Me551 Mpi4E professional display, controlled via the "Projector Control Command Reference" protocol (BDT140013 Rev 7.1). Supports RS-232C serial (D-SUB 9P, PC CONTROL port) and TCP/IP over wired/wireless LAN (port 7142). Binary framed commands with hex-byte opcodes and a trailing checksum byte (low-order 8 bits of sum of preceding bytes).

<!-- UNRESOLVED: model name "Me551 Mpi4E" taken from device-name token; source manual is generic across Sharp/NEC projector family and does not single out this model. -->
<!-- UNRESOLVED: authentication/credentials for LAN not described in source. -->
<!-- UNRESOLVED: command timing / inter-command delay not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # one of 4800/9600/19200/38400/115200 bps (selectable); default value not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full-duplex per source; RTS/CTS pins present on D-SUB but flow control usage not explicit
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # POWER ON / POWER OFF commands present
  - queryable    # many status/info REQUEST commands present
  - levelable    # PICTURE/VOLUME/LAMP adjust present
  - routable     # INPUT SW CHANGE present
```

## Actions
```yaml
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
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte (e.g. 06h=video). Values listed in Appendix 'Supplementary Information by Command' - not reproduced in this source excerpt."
  notes: "Response DATA01 FFh = error, no switch made."

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
      description: "Aspect value - see Appendix 'Supplementary Information by Command' (values not reproduced in this source excerpt)."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target hi-byte: 96h"
    - name: DATA02
      type: integer
      description: "Adjustment target lo-byte: FFh (LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Key list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (always 00h in source list)"

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
      description: "Lens target - examples in source: 06h=Periphery Focus (other target values listed in Appendix)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus continuous, 81h=drive minus continuous, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop, ignores mode/value)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

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
  notes: "Acts on profile selected via 053-10 LENS PROFILE SET."

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
      description: "Setting: 00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco-mode value - see Appendix 'Supplementary Information by Command' (values not reproduced in this source excerpt)."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} ... {DATA16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbypicture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PBP; START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub-input values per Appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal - values per Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-12 bitmap of error flags (cover, fan, temp, lamp, formatter, mirror cover, foreign-matter, ballast, iris, interlock, system errors, etc.)."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns DATA01-98: projector name, lamp usage time (DATA83-86, sec), filter usage time (DATA87-90, sec)."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04, sec) and filter alarm start time (DATA05-08, sec). '-1' if undefined."

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
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (periphery focus, etc.)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V operation status (0=stop,1=operating)."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01 profile number (00h=Profile 1, 01h=Profile 2)."

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
  notes: "Returns DATA01-32: base model type, sound function, profile/clock/sleep-timer function."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, signal types, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns DATA01-32 model name string."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=normal (opened), 01h=cover closed."

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
  notes: "Returns eco/light/lamp mode value (per Appendix)."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns DATA01-17 projector name string."

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns DATA01-06 MAC address."

- id: pip_pbypicture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11), second base model type (DATA12-13)."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns DATA01-16 serial number string."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, display signal type, mute states, freeze status."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA06"

- id: picture_mute_state
  type: enum
  values: [on, off]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute_state
  type: enum
  values: [on, off]
  source: "078-4 MUTE STATUS REQUEST DATA02"

- id: onscreen_mute_state
  type: enum
  values: [on, off]
  source: "078-4 MUTE STATUS REQUEST DATA03"

- id: freeze_state
  type: enum
  values: [on, off]
  source: "305-3 BASIC INFORMATION REQUEST DATA09"

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: lens_operation_status
  type: bitmap
  description: "Bits: lens memory / zoom / focus / lens shift H / lens shift V (0=stop, 1=operating)"
  source: "053-7 LENS INFORMATION REQUEST DATA01"

- id: error_status
  type: bitmap
  description: "DATA01-12 error flag bitmap (cover, fan, temp, lamp, formatter, ballast, iris, interlock, system, etc.)"
  source: "009 ERROR STATUS REQUEST"
```

## Variables
```yaml
- id: brightness
  range: [min, max]  # UNRESOLVED: bounds returned by GAIN PARAMETER REQUEST 3, not fixed in source
  default: null  # UNRESOLVED
  source: "030-1 PICTURE ADJUST DATA01=00h / 060-1 GAIN PARAMETER REQUEST 3 DATA01=00h"

- id: contrast
  range: [min, max]  # UNRESOLVED
  default: null  # UNRESOLVED
  source: "030-1 DATA01=01h / 060-1 DATA01=01h"

- id: color
  range: [min, max]  # UNRESOLVED
  default: null  # UNRESOLVED
  source: "030-1 DATA01=02h / 060-1 DATA01=02h"

- id: hue
  range: [min, max]  # UNRESOLVED
  default: null  # UNRESOLVED
  source: "030-1 DATA01=03h / 060-1 DATA01=03h"

- id: sharpness
  range: [min, max]  # UNRESOLVED
  default: null  # UNRESOLVED
  source: "030-1 DATA01=04h / 060-1 DATA01=04h"

- id: volume
  range: [min, max]  # UNRESOLVED
  default: null  # UNRESOLVED
  source: "030-2 VOLUME ADJUST / 060-1 DATA01=05h"

- id: lamp_usage_time_seconds
  type: integer
  source: "037 INFORMATION REQUEST DATA83-86 / 037-4 LAMP INFORMATION REQUEST 3"
  notes: "Updated at one-minute intervals."

- id: filter_usage_time_seconds
  type: integer
  source: "037-3 FILTER USAGE INFORMATION REQUEST DATA01-04"

- id: lamp_remaining_life_percent
  type: integer
  source: "037-4 LAMP INFORMATION REQUEST 3 DATA02=04h"
  notes: "Negative if replacement deadline exceeded."
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are replies to commands.
```

## Macros
```yaml
# Source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on in progress (source §3.2)."
  - "POWER OFF: no other command accepted during power-off incl. cooling time (source §3.3)."
  - "Error DATA09 bit1: interlock switch open (source §3.1 error information list)."
# UNRESOLVED: no power-on sequencing procedure described beyond interlock bits. Voltage/current/power specs not in this source.
```

## Notes
- All commands are binary frames: leading opcode bytes, length byte, optional `<ID1> <ID2>` (Control ID + Model code), data bytes, trailing `<CKS>` checksum. Checksum = low-order 8 bits of sum of all preceding bytes.
- Command/response prefix pattern: `00h/01h/02h/03h` = command class; first byte of reply is prefix+`20h` (e.g. `02h` cmd → `22h` ack; error ack prefix `A0h/A1h/A2h/A3h`).
- Five baud rates selectable (4800/9600/19200/38400/115200). Default not stated in source.
- Many enum payloads (input terminal codes, eco-mode values, signal types) referenced as "see Appendix 'Supplementary Information by Command'" — that Appendix is not present in the refined source excerpt.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: default baud rate not stated. -->
<!-- UNRESOLVED: adjustment-range bounds only available at runtime via GAIN PARAMETER REQUEST 3, not as fixed constants in source. -->
<!-- UNRESOLVED: input-terminal / eco-mode / aspect / signal-type enum value tables live in an Appendix not included in this source excerpt. -->
<!-- UNRESOLVED: LAN authentication/credentials not described; auth.type set to `none` is an inference (Tier 2) and should be verified. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:29:23.641Z
last_checked_at: 2026-06-18T08:30:55.023Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:30:55.023Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Me551 Mpi4E\" taken from device-name token; source manual is generic across Sharp/NEC projector family and does not single out this model."
- "authentication/credentials for LAN not described in source."
- "command timing / inter-command delay not stated."
- "bounds returned by GAIN PARAMETER REQUEST 3, not fixed in source"
- "no power-on sequencing procedure described beyond interlock bits. Voltage/current/power specs not in this source."
- "firmware version compatibility not stated."
- "default baud rate not stated."
- "adjustment-range bounds only available at runtime via GAIN PARAMETER REQUEST 3, not as fixed constants in source."
- "input-terminal / eco-mode / aspect / signal-type enum value tables live in an Appendix not included in this source excerpt."
- "LAN authentication/credentials not described; auth.type set to `none` is an inference (Tier 2) and should be verified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
