---
spec_id: admin/sharp-nec-dd-e244fl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Dd E244Fl Control Spec"
manufacturer: Sharp/NEC
model_family: "Dd E244Fl"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Dd E244Fl"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:42:05.681Z
last_checked_at: 2026-06-17T19:40:33.502Z
generated_at: 2026-06-17T19:40:33.502Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Dd E244Fl\" supplied as device name; source manual is generic projector reference (BDT140013 Rev 7.1) and does not itself name a model. Source does not state firmware version compatibility or product family specifics."
  - "source does not state flow control setting (RTS/CTS pins present on D-SUB 9P)"
  - "numeric ranges/default values for picture/volume variables are"
  - "source describes no unsolicited notifications. All responses are"
  - "source describes no multi-step sequences."
  - "source lists no explicit safety interlock procedures or power-on"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:40:33.502Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands match source hex sequences exactly with correct parameters and shapes; transport ports and serial settings verified verbatim; perfect bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Dd E244Fl Control Spec

## Summary
Sharp/NEC projector control spec covering RS-232C serial and TCP/IP LAN (port 7142) control. Hex-frame protocol with checksum; provides power, input select, mute, lens, picture/volume/aspect adjust, status queries, and edge-blending/PIP control commands.

<!-- UNRESOLVED: model name "Dd E244Fl" supplied as device name; source manual is generic projector reference (BDT140013 Rev 7.1) and does not itself name a model. Source does not state firmware version compatibility or product family specifics. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated by source
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five switchable rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source does not state flow control setting (RTS/CTS pins present on D-SUB 9P)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable    # inferred: many *REQUEST query commands
  - routable     # inferred: 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
```

## Actions
```yaml
# All 53 commands from source §2 Command List, each as a separate action.
# Command frames verbatim from source. ID1/ID2/CKS are runtime-computed
# (see §2.2 Parameters: CKS = low-order byte of sum of all preceding bytes).

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: cmd_018_input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (e.g. 06h = video port). See Appendix "Supplementary Information by Command".
  notes: "Example from source: 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
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

- id: cmd_030_2_volume_adjust
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

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect. See Appendix "Supplementary Information by Command".

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST (per source DATA01=96h DATA02=FFh)"
    - name: DATA02
      type: integer
      description: "FFh (per source)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (e.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO, 02h=POWER ON, 03h=POWER OFF)"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (see cmd_053)

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop, otherwise adjustment target"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
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

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode. See Appendix "Supplementary Information by Command".

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: cmd_098_198_pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (context-dependent on DATA01; see source §3.48)"

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code. See Appendix "Supplementary Information by Command".
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "12-byte error info (DATA01-DATA12) from cmd_009. Bit=1 means error (cover, fan, temp, lamp, mirror cover, iris calibration, etc.). See source §3.1."

- id: response_ack
  type: raw
  description: "Ack frame returned for every command. Success format: 2Xh/AXh prefix + ID1 ID2 + LEN + data + CKS. Failure format: AXh prefix + ID1 ID2 + 02h + ERR1 ERR2 + CKS. Error code pairs in source §2.4."

- id: running_status
  type: enum
  description: "From cmd_078_2: power status (00h Standby / 01h Power On), cooling, power-on/off process, operation status."

- id: mute_status
  type: bitmask
  description: "From cmd_078_4: picture/sound/onscreen/forced-onscreen mute + OSD display flags."

- id: input_status
  type: raw
  description: "From cmd_078_3: signal switch process, signal list number, selection signal types 1/2, content displayed."
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "PICTURE/BRIGHTNESS - adjusted via cmd_030_1 DATA01=00h; readable via cmd_060_1 DATA01=00h."
- id: contrast
  type: integer
  description: "PICTURE/CONTRAST - DATA01=01h."
- id: color
  type: integer
  description: "PICTURE/COLOR - DATA01=02h."
- id: hue
  type: integer
  description: "PICTURE/HUE - DATA01=03h."
- id: sharpness
  type: integer
  description: "PICTURE/SHARPNESS - DATA01=04h."
- id: volume
  type: integer
  description: "Audio volume - adjusted via cmd_030_2; readable via cmd_060_1 DATA01=05h."
- id: lamp_usage_time_seconds
  type: integer
  description: "From cmd_037 / cmd_037_4. Updated at 1-minute intervals."
- id: lamp_remaining_life_pct
  type: integer
  description: "From cmd_037_4 DATA02=04h. Negative if replacement deadline exceeded."
- id: filter_usage_time_seconds
  type: integer
  description: "From cmd_037_3 DATA01-04. -1 if undefined."
- id: eco_mode
  type: integer
  description: "Light/Lamp mode value - set via cmd_098_8, read via cmd_097_8. Enum values UNRESOLVED (see Appendix)."
# UNRESOLVED: numeric ranges/default values for picture/volume variables are
# device-reported at runtime via cmd_060_1 (DATA02-DATA13); not enumerated in source.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are
# replies to commands (see §2.3).
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: while turning on, no other command accepted (source §3.2)."
  - "016 POWER OFF: while turning off (incl. cooling time), no other command accepted (source §3.3)."
  - "ERR1=02h ERR2=0Dh: 'The command cannot be accepted because the power is off.'"
  - "053 LENS CONTROL: after driving (7Fh/81h), must send 00h to stop."
warnings:
  - "DATA09 extended status bit1 'interlock switch is open' (source §3.1)."
# UNRESOLVED: source lists no explicit safety interlock procedures or power-on
# sequencing beyond the power-on/off lockout notes above.
```

## Notes
- **Protocol frame:** `20h 88h <ID1> <ID2> 0Ch <DATA01> ... <DATA12> <CKS>` — all commands/responses use hex framing with prefix byte indicating direction/result (`2Xh`=success ack, `AXh`=error ack).
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- **ID1:** control ID set on the projector. **ID2:** model code (varies by model).
- **Error codes:** full ERR1/ERR2 table in source §2.4 (21 combinations).
- **Baud rate** switchable among five values; source states no single default.
- **Two-lamp models only:** cmd_037_4 DATA01=01h (Lamp 2) effective on two-lamp projectors.

<!-- UNRESOLVED: -->
<!-- - Device model "Dd E244Fl" not confirmed inside the source (manual is generic). -->
<!-- - Firmware version compatibility not stated. -->
<!-- - Serial flow control not stated (RTS/CTS pins wired on D-SUB 9P but setting not specified). -->
<!-- - Appendix "Supplementary Information by Command" (input terminal codes, aspect values, base model types, eco mode enum values, sub input codes) not present in refined source — referenced only. -->
<!-- - Wireless LAN details deferred to "operation manual of the wireless LAN unit". -->
<!-- - Numeric adjustment ranges/defaults reported dynamically by device via cmd_060_1. -->
```

Spec above. 53 actions, all commands from source §2 list. Gaps marked `UNRESOLVED`. Next: ingest via `drafts.jsonl` + `scraper.ts ingest`, or hand off to user agent.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:42:05.681Z
last_checked_at: 2026-06-17T19:40:33.502Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:40:33.502Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands match source hex sequences exactly with correct parameters and shapes; transport ports and serial settings verified verbatim; perfect bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Dd E244Fl\" supplied as device name; source manual is generic projector reference (BDT140013 Rev 7.1) and does not itself name a model. Source does not state firmware version compatibility or product family specifics."
- "source does not state flow control setting (RTS/CTS pins present on D-SUB 9P)"
- "numeric ranges/default values for picture/volume variables are"
- "source describes no unsolicited notifications. All responses are"
- "source describes no multi-step sequences."
- "source lists no explicit safety interlock procedures or power-on"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
