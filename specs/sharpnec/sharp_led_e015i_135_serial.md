---
spec_id: admin/sharp-nec-led-e015i-135
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED E015I 135 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED E015I 135"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED E015I 135"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:12:39.520Z
last_checked_at: 2026-06-17T20:10:08.393Z
generated_at: 2026-06-17T20:10:08.393Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name not stated inside source doc itself — taken from user input. Source is a generic projector command reference, not model-specific. Firmware version, hardware revision, and exact product family coverage not stated."
  - "full response payload schemas for each query not individually broken out - see source section 3 for per-command response tables."
  - "no standalone variable list in source; settable state lives inside"
  - "no event/notification mechanism described in source."
  - "not applicable per source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "Appendix 'Supplementary Information by Command' not in source — input terminal / aspect / eco mode / base model / sub-input / signal-type enum tables missing."
  - "ID1 (control ID) and ID2 (model code) default values not stated in source — must be discovered per-device."
  - "firmware version compatibility range not stated."
  - "wireless LAN unit model support not specified (refers to external operation manual)."
  - "default baud rate not stated (only the selectable list)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:10:08.393Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literal hex opcodes in source; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED E015I 135 Control Spec

## Summary
Sharp/NEC projector control spec. Covers RS-232C serial and wired/wireless LAN (TCP) control. Binary command protocol with hex-byte frames and per-frame checksum. Source: "Projector Control Command Reference Manual" (BDT140013 Rev 7.1).

<!-- UNRESOLVED: model name not stated inside source doc itself — taken from user input. Source is a generic projector command reference, not model-specific. Firmware version, hardware revision, and exact product family coverage not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source: "Communication mode: Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - queryable    # inferred: many status request commands present
  - levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST, LENS CONTROL present
  - mutable      # inferred: picture/sound/onscreen mute commands present
```

## Actions
```yaml
# Every frame: lead + body + checksum (CKS). CKS = low-order byte of sum of all
# preceding bytes. Parameterized bytes shown as {DATA??}. ID1=control ID, ID2=model
# code (both device-set). Source: section 2.2 + each command's hex table.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted during power-on sequence."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

# --- Input switching ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal code (hex). Example: 06h = video port. See Appendix 'Supplementary Information by Command' for full value list."
  notes: "Response FFh = no signal switch made."

# --- Mute ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared on input/video switch."

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
  notes: "Cleared on input/video switch or volume adjust."

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
  notes: "Cleared on input/video switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- Picture / Volume / Aspect / Other adjust (030-x) ---
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
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte: 96h"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte: FFh (LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- Remote key code (050) ---
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
      description: "Key code high byte (always 00h per key code list)"

# --- Shutter ---
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

# --- Lens control (053-x) ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. Source example: 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous plus, 81h=continuous minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target. FFh=Stop (then DATA02-04 not referenced)"
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
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

# --- Freeze ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- Eco mode set ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. See Appendix 'Supplementary Information by Command'. Sets 'Light mode' or 'Lamp mode' depending on projector."

# --- LAN projector name set ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: name_bytes
      type: string
      description: "DATA01-DATA16: projector name (up to 16 bytes)"

# --- PIP / Picture by Picture set ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (mode/position/sub-input per DATA01). See Appendix for sub-input values."

# --- Edge blending set ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

# --- Audio select set ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. See Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

# --- Queries (kind: query) ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response: 12-byte error bitmap (DATA01-12). See error code list in source section 2.4 and error info list in section 3.1."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-min intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage seconds (DATA01-04) and filter alarm start seconds (DATA05-08). -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "01h=lamp usage time (sec), 04h=lamp remaining life (%)"

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
      description: "Lens target. Same as lens_control DATA01."
  notes: "Returns adjustment range upper/lower limit + current value."

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
  notes: "Returns bitmap: lens memory / zoom / focus / lens shift H+V operation state."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected reference lens memory profile (00h=Profile 1, 01h=Profile 2)."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
  notes: "Returns power status, cooling process, power on/off process, operation status."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + OSD display state."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns 32-byte model name (NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns 00h=normal (cover open), 01h=cover closed (mirror/lens cover)."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
  notes: "Returns 17-byte projector name (NUL-terminated)."

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address."

- id: pip_pbp_request
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

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type + model name + base model type (duplicate)."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns 16-byte serial number (NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, mute states, freeze status."
```

## Feedbacks
```yaml
# Response framing per command: success frame uses 2Xh lead (where X = cmd group),
# failure uses AXh lead + ERR1/ERR2 codes. ERR1/ERR2 codes (section 2.4):
#   00h/00h = command not recognized
#   00h/01h = command not supported by model
#   01h/00h = invalid value
#   01h/01h = invalid input terminal
#   01h/02h = invalid language
#   02h/00h = memory allocation error
#   02h/02h = memory in use
#   02h/03h = value cannot be set
#   02h/04h = forced onscreen mute on
#   02h/06h = viewer error
#   02h/07h = no signal
#   02h/08h = test pattern/filter displayed
#   02h/09h = no PC card inserted
#   02h/0Ah = memory operation error
#   02h/0Ch = entry list displayed
#   02h/0Dh = command rejected (power off)
#   02h/0Eh = command execution failed
#   02h/0Fh = no authority for operation
#   03h/00h = incorrect gain number
#   03h/01h = invalid gain
#   03h/02h = adjustment failed

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA03 + DATA06

- id: error_status
  type: bitmap
  source: error_status_request DATA01-12
  notes: "Bitmap. Cover/fan/temperature/power/lamp/interlock/system errors. DATA09 bit1 = interlock switch open (safety-relevant)."

- id: cover_state
  type: enum
  values: [normal_open, closed]
  source: cover_status_request DATA01

- id: lamp_remaining_life_percent
  type: integer
  source: lamp_information_request_3 (DATA02=04h)
  notes: "Negative value if replacement deadline exceeded."

# UNRESOLVED: full response payload schemas for each query not individually broken out - see source section 3 for per-command response tables.
```

## Variables
```yaml
# Most settable values route through Actions above (parameterized). No separate
# variable registry documented in source.

# UNRESOLVED: no standalone variable list in source; settable state lives inside
# command parameters (DATA bytes). ECO mode, aspect, sub-input value tables
# referenced but defined only in 'Appendix - Supplementary Information by Command'
# which is not present in this source extract.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are replies to
# issued commands.

# UNRESOLVED: no event/notification mechanism described in source.
```

## Macros
```yaml
# No multi-step command sequences described in source.

# UNRESOLVED: not applicable per source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents NO explicit interlock procedures or power-on sequencing
# requirements. Only error-status bit reporting exists (error_status_request
# DATA09 bit1 = interlock switch open; DATA01 bit0 = cover error).
# Per population policy: safety procedures are NOT inferred from status bits.
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
- Binary protocol: every frame = `<lead> <ID1> <ID2> <LEN> <DATA...> <CKS>`. CKS = low byte of sum of all preceding bytes. ID1 = control ID (device-set), ID2 = model code (device-set). Implementer must read ID1/ID2 from device or set control ID via projector menu.
- Response lead byte: 2Xh prefix on success (X mirrors command group), AXh prefix on failure with ERR1/ERR2.
- Many commands reference "Appendix — Supplementary Information by Command" for full value enumerations (input terminal codes, aspect values, eco mode values, base model types, sub-input values, selection signal types). **That appendix is NOT in this source extract** — those enum tables are UNRESOLVED.
- Baud rate is selectable across 5 values (115200/38400/19200/9600/4800); one must be configured on the projector. Default not stated.
- POWER ON and POWER OFF block all other commands during their execution window (incl. cooling).
- Lamp/filter usage time updates at 1-minute intervals even though stored in 1-second units.

<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' not in source — input terminal / aspect / eco mode / base model / sub-input / signal-type enum tables missing. -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default values not stated in source — must be discovered per-device. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: wireless LAN unit model support not specified (refers to external operation manual). -->
<!-- UNRESOLVED: default baud rate not stated (only the selectable list). -->
````

Spec generated. 51 actions enumerated (every command row from section 3.1–3.53). Binary payloads copied verbatim, params templated where source uses `{DATA??}`. Appendix enum tables flagged UNRESOLVED — referenced but not in this extract.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:12:39.520Z
last_checked_at: 2026-06-17T20:10:08.393Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:10:08.393Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literal hex opcodes in source; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name not stated inside source doc itself — taken from user input. Source is a generic projector command reference, not model-specific. Firmware version, hardware revision, and exact product family coverage not stated."
- "full response payload schemas for each query not individually broken out - see source section 3 for per-command response tables."
- "no standalone variable list in source; settable state lives inside"
- "no event/notification mechanism described in source."
- "not applicable per source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "Appendix 'Supplementary Information by Command' not in source — input terminal / aspect / eco mode / base model / sub-input / signal-type enum tables missing."
- "ID1 (control ID) and ID2 (model code) default values not stated in source — must be discovered per-device."
- "firmware version compatibility range not stated."
- "wireless LAN unit model support not specified (refers to external operation manual)."
- "default baud rate not stated (only the selectable list)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
