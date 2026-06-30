---
spec_id: admin/sharp-nec-np-me331x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME331X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME331X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME331X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:33:50.157Z
last_checked_at: 2026-06-18T08:38:32.093Z
generated_at: 2026-06-18T08:38:32.093Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "specific NP ME331X model code (ID2) not stated; ID2 varies by model."
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not included in refined source."
  - "RTS/CTS pins wired but flow control mode not stated in source"
  - "appendix not in source).\""
  - "full value list in Appendix 'Supplementary Information by Command', not in source).\""
  - "value list in Appendix 'Supplementary Information by Command', not in source).\""
  - "per-query structured feedback shapes (lamp/filter usage seconds,"
  - "none identified beyond action-driven parameters."
  - "source describes no unsolicited notifications / push events."
  - "source documents no multi-step command sequences."
  - "no explicit power-on sequencing procedure or voltage/current"
  - "NP ME331X-specific model code (ID2) not in source — ID2 varies by projector model."
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not present in refined source text."
  - "flow_control mode not stated (RTS/CTS pins wired per pin table)."
  - "whether TCP port 7142 also applies to the optional wireless LAN unit — source defers to wireless unit manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:38:32.093Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC NP ME331X Control Spec

## Summary
Sharp/NEC NP ME331X LCD projector controlled via a binary hexadecimal command protocol (document BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP network control (wired or optional wireless LAN unit) on TCP port 7142. Commands are framed hex sequences terminated by a modulo-256 checksum; responses use a success prefix (20h/21h/22h/23h) or error prefix (A0h/A1h/A2h/A3h) carrying ERR1/ERR2 codes.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: specific NP ME331X model code (ID2) not stated; ID2 varies by model. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not included in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # source: "115200/38400/19200/9600/4800 bps"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired but flow control mode not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many REQUEST / status query commands present
  - routable       # inferred: INPUT SW CHANGE / AUDIO SELECT SET present
  - levelable      # inferred: VOLUME ADJUST / PICTURE ADJUST / LENS CONTROL present
```

## Actions
```yaml
# All command payloads are verbatim hex from source BDT140013 Rev 7.1.
# Frame: <MT> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS> where CKS = low byte of sum
# of all preceding bytes. Commands shown omit <ID1> <ID2> as documented (default).
# Source lists each numbered command as a distinct row → one action each.

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

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source)."

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
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

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (UNRESOLVED: full value list in Appendix 'Supplementary Information by Command', not in source)."

# --- 030-15. OTHER ADJUST ---
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh per source)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list, e.g. 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1, 8Ah=FREEZE, A3h=ASPECT)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all documented keys)"

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (06h=Periphery Focus per source table)"
    - name: DATA02
      type: integer
      description: "Drive command: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target selector

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
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

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting: 00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
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
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
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
  label: PIP / Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (UNRESOLVED: value list in Appendix 'Supplementary Information by Command', not in source)."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16)"

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input values per Appendix)"

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting: 00h=OFF, 01h=ON"

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
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (UNRESOLVED: value list in Appendix 'Supplementary Information by Command', not in source)."
    - name: DATA02
      type: integer
      description: "Setting: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing: every command returns a frame prefixed by a success byte
# (20h/21h/22h/23h) or an error byte (A0h/A1h/A2h/A3h). Error responses carry
# <ERR1> <ERR2> codes (see Notes for full table). Success responses for queries
# carry the requested <DATA> fields.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06 + 305-3 BASIC INFORMATION REQUEST DATA01"

- id: error_status
  type: bitmask
  description: "12-byte error bitmap from 009 ERROR STATUS REQUEST (cover, fan, temp, lamp, mirror cover, interlock, etc.)"

- id: mute_state
  type: enum
  description: "Picture/sound/onscreen/forced-onscreen mute flags from 078-4 MUTE STATUS REQUEST"

- id: command_ack
  type: enum
  values: [success, error]
  description: "Per-command acknowledgement frame. Success prefix 20h/21h/22h/23h; error prefix A0h/A1h/A2h/A3h + ERR1/ERR2."

# UNRESOLVED: per-query structured feedback shapes (lamp/filter usage seconds,
# carbon savings kg/mg, MAC address, model name string, serial number string,
# gain parameter ranges) derivable from source DATA tables but not enumerated
# individually here.
```

## Variables
```yaml
# Settable continuous parameters are driven via the Actions above (VOLUME
# ADJUST, PICTURE ADJUST, LENS CONTROL 2, OTHER ADJUST). No additional
# out-of-band variables documented.
# UNRESOLVED: none identified beyond action-driven parameters.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# Protocol is strictly request/response.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command can be accepted (source 3.2)."
  - "While POWER OFF is executing (including cooling time), no other command can be accepted (source 3.3)."
  - "Error code 02h 0Dh: command rejected because power is off."
  - "Error code 02h 0Fh: no authority for operation."
# UNRESOLVED: no explicit power-on sequencing procedure or voltage/current
# interlocks stated beyond the command-lock notes above.
```

## Notes
- **Checksum rule** (source 2.2): CKS = low-order one byte (8 bits) of the sum of all preceding bytes in the frame. Worked example from source: `20h 81h 01h 60h 01h 00h` → sum = 103h → CKS = 03h.
- **Frame notation**: commands/responses are hex series. `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model). `<LEN>` = byte length of DATA part. `<DATA??>` = variable-length data. `<ERR1> <ERR2>` = response error codes.
- **Response prefixes**: success = `20h` (no-data ack), `21h`/`22h`/`23h` (data ack variants); error = `A0h`/`A1h`/`A2h`/`A3h` carrying `<ERR1> <ERR2> <CKS>`.
- **Picture/Sound/Onscreen mute auto-cancel**: input terminal switch, video signal switch, or (for sound) volume adjustment turns the respective mute off.
- **Usage time granularity**: lamp/filter usage time is returned in seconds but updated at one-minute intervals.
- **Error code list** (source 2.4), ERR1/ERR2 hex pairs:
  - `00 00` command not recognized
  - `00 01` command not supported by model
  - `01 00` specified value invalid
  - `01 01` specified input terminal invalid
  - `01 02` specified language invalid
  - `02 00` memory allocation error
  - `02 02` memory in use
  - `02 03` specified value cannot be set
  - `02 04` forced onscreen mute on
  - `02 06` viewer error
  - `02 07` no signal
  - `02 08` test pattern or filter displayed
  - `02 09` no PC card inserted
  - `02 0A` memory operation error
  - `02 0C` entry list displayed
  - `02 0D` command rejected (power off)
  - `02 0E` command execution failed
  - `02 0F` no authority for operation
  - `03 00` specified gain number incorrect
  - `03 01` specified gain invalid
  - `03 02` adjustment failed
- **Remote key code list** (source 3.19, DATA01/DATA02): POWER ON(02,00), POWER OFF(03,00), AUTO(05,00), MENU(06,00), UP(07,00), DOWN(08,00), RIGHT(09,00), LEFT(0A,00), ENTER(0B,00), EXIT(0C,00), HELP(0D,00), MAGNIFY UP(0F,00), MAGNIFY DOWN(10,00), MUTE(13,00), PICTURE(29,00), COMPUTER1(4B,00), COMPUTER2(4C,00), VIDEO1(4F,00), S-VIDEO1(51,00), VOLUME UP(84,00), VOLUME DOWN(85,00), FREEZE(8A,00), ASPECT(A3,00), SOURCE(D7,00), LAMP MODE/ECO(EE,00).

<!-- UNRESOLVED: NP ME331X-specific model code (ID2) not in source — ID2 varies by projector model. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not present in refined source text. -->
<!-- UNRESOLVED: flow_control mode not stated (RTS/CTS pins wired per pin table). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: whether TCP port 7142 also applies to the optional wireless LAN unit — source defers to wireless unit manual. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:33:50.157Z
last_checked_at: 2026-06-18T08:38:32.093Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:38:32.093Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "specific NP ME331X model code (ID2) not stated; ID2 varies by model."
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not included in refined source."
- "RTS/CTS pins wired but flow control mode not stated in source"
- "appendix not in source).\""
- "full value list in Appendix 'Supplementary Information by Command', not in source).\""
- "value list in Appendix 'Supplementary Information by Command', not in source).\""
- "per-query structured feedback shapes (lamp/filter usage seconds,"
- "none identified beyond action-driven parameters."
- "source describes no unsolicited notifications / push events."
- "source documents no multi-step command sequences."
- "no explicit power-on sequencing procedure or voltage/current"
- "NP ME331X-specific model code (ID2) not in source — ID2 varies by projector model."
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub-input values, eco-mode values) not present in refined source text."
- "flow_control mode not stated (RTS/CTS pins wired per pin table)."
- "whether TCP port 7142 also applies to the optional wireless LAN unit — source defers to wireless unit manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
