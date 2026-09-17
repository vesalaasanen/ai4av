---
spec_id: admin/hitachi-p50h401
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hitachi P50H401 Control Spec"
manufacturer: Hitachi
model_family: P50H401
aliases: []
compatible_with:
  manufacturers:
    - Hitachi
  models:
    - P50H401
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - http://web.archive.org/web/20091221205028/http://www.hitachi-america.us/supportingdocs/forhome/ubcg/remote_ir_codes/Hitachi_2007_RS232Codes.pdf
retrieved_at: 2026-09-16T05:09:09.897Z
last_checked_at: 2026-09-16T22:16:35.795Z
generated_at: 2026-09-16T22:16:35.795Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "source is a family-wide protocol document (14 models); P50H401-specific behavior only distinguishable where model letters (T/H/S/V/X) are called out"
  - "protocol/firmware version compatibility not stated beyond document version v.01"
  - "electrical specs beyond \"RS232C standard\" not stated"
verification:
  verdict: verified
  checked_at: 2026-09-16T22:16:35.795Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions resolve to source Table 4.5.1 literals or assembled read/query forms; transport parameters match section 2 verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-16
---

# Hitachi P50H401 Control Spec

## Summary
Hitachi P50H401 plasma TV, external control via RS-232C (DSUB-9P, 9600bps 7-bit no-parity 1 stop bit, no flow control) per Hitachi "RS232C COMMUNICATION SPECIFICATION" v.01 (Feb/29/'08). Spec covers Terminal Mode control bytes, hex-character read/write commands for power, input selection, audio (volume/balance/treble/bass/mute), picture settings, color temperature, aspect ratio, direct keys, info, auto movie mode, and exit. Source document covers the H401/T501/S601/V701/X901 plasma and S601/V651 LCD families; this spec targets the P50H401 ("H" model).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: source is a family-wide protocol document (14 models); P50H401-specific behavior only distinguishable where model letters (T/H/S/V/X) are called out -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 7
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER write commands (6E)
  - routable     # inferred from INPUT select commands (6F)
  - queryable    # inferred from R/W read mechanism (2nd byte 01)
  - levelable    # inferred from volume/bass/treble/contrast/brightness set commands
```

## Actions
```yaml
# Framing: every command = STX (0x02) + 12 ASCII characters + ETX (0x03).
# Each character is sent as its ASCII code ("0"-"9" -> 0x30-0x39, "A"-"F" -> 0x41-0x46).
# 12-char command layout: 1st=function, 2nd=R/W (00=write, 01=read), 3rd/4th=sub-function, 5th/6th=data (upper/lower byte).
# `command:` below shows the 12-character payload (or single control byte); add STX/ETX on the wire.

# --- Terminal mode control (single byte, no STX/ETX framing) ---
- id: terminal_mode_on
  label: Terminal Mode ON (Enable Communication)
  kind: action
  command: "05"
  params: []
  notes: "ENQ (hex 05). TV returns ACK (06) or NAK (15). Required before any command is accepted; factory setting is OFF."

- id: terminal_mode_off
  label: Terminal Mode OFF (Disable Communication)
  kind: action
  command: "04"
  params: []
  notes: "EOT (hex 04). TV returns ACK (06) or NAK (15)."

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "6E0000000001"
  params: []
  notes: "Source example row (Table 4.5.1 No.1); wire bytes 02 36 45 30 30 30 30 30 30 30 30 30 31 03"

- id: power_off
  label: Power Off
  kind: action
  command: "6E0000000000"
  params: []
  notes: "Table 4.5.1 No.2"

- id: power_query
  label: Power Status Query
  kind: query
  command: "6E0100000000"
  params: []
  notes: "Read form of POWER (function 6E, R/W); 2nd byte 01 = read"

# --- Input select (literal rows from Table 4.5.1) ---
- id: select_input_1
  label: Select Input 1
  kind: action
  command: "6F0000000000"
  params: []
  notes: "Table 4.5.1 No.3"

- id: select_input_2
  label: Select Input 2
  kind: action
  command: "6F0000000001"
  params: []
  notes: "Table 4.5.1 No.4"

- id: select_input_3
  label: Select Input 3
  kind: action
  command: "6F0000000002"
  params: []
  notes: "Table 4.5.1 No.5"

- id: select_input_front
  label: Select Input Front
  kind: action
  command: "6F0000000003"
  params: []
  notes: "Table 4.5.1 No.6"

- id: select_input_cable_air
  label: Select Cable or Air (Tuner)
  kind: action
  command: "6F0000000005"
  params: []
  notes: "Table 4.5.1 No.7"

- id: select_input
  label: Select Input (parameterized)
  kind: action
  command: "6F00000000{input}"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "03", "05", "09", "0B", "0C", "0D"]
      description: "00=Input1 01=Input2 02=Input3 03=Input Front 05=Cable or Air 09=Photo Input 0B=HDMI1 0C=HDMI2 0D=HDMI Front (hex data byte from Table 3.3.5.1)"

- id: input_query
  label: Input Status Query
  kind: query
  command: "6F0100000000"
  params: []
  notes: "Read form of INPUT (function 6F, R/W)"

# --- Audio: volume / balance / treble / bass ---
- id: volume_set_0
  label: Volume Set to 0
  kind: action
  command: "270000000000"
  params: []
  notes: "Table 4.5.1 No.8 example; full range 0-60 via volume variable"

- id: set_volume
  label: Set Volume
  kind: action
  command: "2700000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Volume 0-60 as 2-digit hex (00-3C) in data field"

- id: volume_query
  label: Volume Query
  kind: query
  command: "270100000000"
  params: []

- id: balance_set_31
  label: Balance Set to 31
  kind: action
  command: "28000000001F"
  params: []
  notes: "Table 4.5.1 No.9 example; full range 0-60"

- id: set_balance
  label: Set Balance
  kind: action
  command: "2800000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Balance 0-60 as 2-digit hex in data field"

- id: balance_query
  label: Balance Query
  kind: query
  command: "280100000000"
  params: []

- id: treble_set_16
  label: Treble Set to 16
  kind: action
  command: "2B0000000010"
  params: []
  notes: "Table 4.5.1 No.10 example; full range 0-30"

- id: set_treble
  label: Set Treble
  kind: action
  command: "2B00000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Treble 0-30 as 2-digit hex in data field"

- id: treble_query
  label: Treble Query
  kind: query
  command: "2B0100000000"
  params: []

- id: bass_set_16
  label: Bass Set to 16
  kind: action
  command: "2A0000000010"
  params: []
  notes: "Table 4.5.1 No.11 example; full range 0-30"

- id: set_bass
  label: Set Bass
  kind: action
  command: "2A00000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Bass 0-30 as 2-digit hex in data field"

- id: bass_query
  label: Bass Query
  kind: query
  command: "2A0100000000"
  params: []

# --- Audio mute ---
- id: audio_mute_off
  label: Audio Mute Off
  kind: action
  command: "290000000000"
  params: []
  notes: "Table 4.5.1 No.12"

- id: audio_mute_on
  label: Audio Mute On
  kind: action
  command: "290000000001"
  params: []
  notes: "Table 4.5.1 No.13"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2900000000{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02"]
      description: "00=Off 01=On 02=Soft Mute (Table 3.3.5.1)"

- id: audio_mute_query
  label: Audio Mute Query
  kind: query
  command: "290100000000"
  params: []

# --- Picture mode ---
- id: picture_mode_day_dynamic
  label: Picture Mode Day (Dynamic)
  kind: action
  command: "A40000030000"
  params: []
  notes: "Table 4.5.1; picture mode uses sub-function 0003"

- id: picture_mode_day_normal
  label: Picture Mode Day (Normal)
  kind: action
  command: "A40000030001"
  params: []
  notes: "Table 4.5.1"

- id: picture_mode_night
  label: Picture Mode Night
  kind: action
  command: "A40000030002"
  params: []
  notes: "Table 4.5.1"

- id: picture_mode_query
  label: Picture Mode Query
  kind: query
  command: "A40100030000"
  params: []
  notes: "Read form of PICTURE MODE (A4, sub-function 0003)"

# --- Video adjust ---
- id: contrast_set_59
  label: Contrast Set to 59
  kind: action
  command: "59000000003B"
  params: []
  notes: "Table 4.5.1 No.17 example; full range 0-62 step"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "5900000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Contrast 0-62 as 2-digit hex in data field"

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "590100000000"
  params: []

- id: brightness_set_29
  label: Brightness Set to 29
  kind: action
  command: "1F000000001D"
  params: []
  notes: "Table 4.5.1 No.18 example; full range 0-62 step"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "1F00000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Brightness 0-62 as 2-digit hex in data field"

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "1F0100000000"
  params: []

- id: color_set_29
  label: Color Set to 29
  kind: action
  command: "10000000001D"
  params: []
  notes: "Table 4.5.1 No.19 example; full range 0-62 step"

- id: set_color
  label: Set Color
  kind: action
  command: "1000000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Color 0-62 as 2-digit hex in data field"

- id: color_query
  label: Color Query
  kind: query
  command: "100100000000"
  params: []

- id: tint_set_29
  label: Tint Set to 29
  kind: action
  command: "13000000001D"
  params: []
  notes: "Table 4.5.1 No.20 example; full range 0-62 step"

- id: set_tint
  label: Set Tint
  kind: action
  command: "1300000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Tint 0-62 as 2-digit hex in data field"

- id: tint_query
  label: Tint Query
  kind: query
  command: "130100000000"
  params: []

- id: sharpness_set_29
  label: Sharpness Set to 29
  kind: action
  command: "14000000001D"
  params: []
  notes: "Table 4.5.1 No.21 example; full range 0-62 step"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "1400000000{value_hex}"
  params:
    - name: value_hex
      type: string
      description: "Sharpness 0-62 as 2-digit hex in data field"

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "140100000000"
  params: []

# --- Color temperature ---
- id: color_temp_high
  label: Color Temperature High
  kind: action
  command: "600000000000"
  params: []
  notes: "Table 4.5.1"

- id: color_temp_medium
  label: Color Temperature Medium
  kind: action
  command: "600000000001"
  params: []
  notes: "Table 4.5.1"

- id: color_temp_standard
  label: Color Temperature Standard
  kind: action
  command: "600000000002"
  params: []
  notes: "Table 4.5.1"

- id: color_temp_black_white
  label: Color Temperature Black & White
  kind: action
  command: "600000000003"
  params: []
  notes: "Table 4.5.1. NACK responds on model T and model H (P50H401 is model H)"

- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "600100000000"
  params: []

# --- Aspect ratio ---
- id: aspect_16x9_standard1
  label: Aspect 16:9 Standard1
  kind: action
  command: "400000000000"
  params: []
  notes: "Table 4.5.1"

- id: aspect_16x9_zoom
  label: Aspect 16:9 Zoom
  kind: action
  command: "400000000001"
  params: []
  notes: "Table 4.5.1"

- id: aspect_4x3_standard
  label: Aspect 4:3 Standard
  kind: action
  command: "400000000002"
  params: []
  notes: "Table 4.5.1"

- id: aspect_4x3_expanded
  label: Aspect 4:3 Expanded
  kind: action
  command: "400000000003"
  params: []
  notes: "Table 4.5.1"

- id: aspect_4x3_zoom1
  label: Aspect 4:3 Zoom1
  kind: action
  command: "400000000004"
  params: []
  notes: "Table 4.5.1"

- id: aspect_4x3_zoom2
  label: Aspect 4:3 Zoom2
  kind: action
  command: "400000000005"
  params: []
  notes: "Table 4.5.1"

- id: set_aspect
  label: Set Aspect Ratio
  kind: action
  command: "4000000000{mode}"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      description: "0=16:9 Standard1 1=16:9 Zoom 2=4:3 Standard 3=4:3 Expanded 4=4:3 Zoom1 5=4:3 Zoom2 6=16:9 Standard2 7=FULL 8=NORMAL 9=REAL (Table 3.3.5.1; literal write rows only given for 0-5)"

- id: aspect_query
  label: Aspect Ratio Query
  kind: query
  command: "400100000000"
  params: []

# --- Info / direct keys / exit / auto movie ---
- id: info_on
  label: Info OSD On
  kind: action
  command: "B20000000001"
  params: []
  notes: "Table 4.5.1 No.33; write-only"

- id: info_off
  label: Info OSD Off
  kind: action
  command: "B20000000000"
  params: []
  notes: "Table 4.5.1 No.34; write-only"

- id: direct_key_0
  label: Direct 0-9 Key (code 0)
  kind: action
  command: "D00000000000"
  params: []
  notes: "Table 4.5.1 No.35 example (key code 0); when INPUT is Cable/Air inputs channel number, when Photo Input inputs picture number"

- id: direct_key
  label: Direct 0-9 Key
  kind: action
  command: "D0000000000{key}"
  params:
    - name: key
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
      description: "Key code 0-9 as hex digit"

- id: direct_ch_select
  label: Direct CH Select
  kind: action
  command: "D00000010000"
  params: []
  notes: "Sub-function 0001 (Table 3.3.1 No.18); selects CH, or picture number/thumbnail on Photo Input"

- id: direct_select_key
  label: Direct Select Key
  kind: action
  command: "D00000020000"
  params: []
  notes: "Sub-function 0002 (Table 3.3.1 No.19); select key"

- id: auto_movie_off
  label: Auto Movie Mode Off
  kind: action
  command: "D40000000000"
  params: []
  notes: "Table 4.5.1; T/H/S models and V model (LCD) use 0=Off 1=On(AUTO)"

- id: auto_movie_on
  label: Auto Movie Mode On (Auto)
  kind: action
  command: "D40000000001"
  params: []
  notes: "Table 4.5.1; NACK responds when Game Mode is ON; NACK when Smooth specified on model T/H/S/V(LCD)"

- id: auto_movie_query
  label: Auto Movie Mode Query
  kind: query
  command: "D40100000000"
  params: []

- id: exit
  label: Exit (Erase OSD / TV Guide)
  kind: action
  command: "D90000000000"
  params: []
  notes: "Command assembled from Table 3.3.1 No.21 fields (function D9, W=00, sub 0000, data 0000); write-only. Similar to EXIT remote button; erases OSD/TV Guide temporarily"
```

## Feedbacks
```yaml
- id: ack_nak
  type: enum
  values: [ack, nak]
  description: "Single-byte response (Fig.5) to Terminal Mode control bytes and to write commands: ACK=0x06 accepted, NAK=0x15 rejected"

- id: read_response
  type: string
  description: "Answer to a read (Table 3.2.2): STX (0x02) + data upper char + data lower char + ACK/NAK (0x06/0x15) + ETX (0x03); data characters carry the queried value in hex-character form"

- id: power_state
  type: enum
  values: [off, on]
  description: "POWER (6E) read result; 0=Off 1=On"

- id: input_state
  type: enum
  values: [input1, input2, input3, input_front, cable_air, photo_input, hdmi1, hdmi2, hdmi_front]
  description: "INPUT (6F) read result; data codes 00,01,02,03,05,09,0B,0C,0D"

- id: volume_level
  type: integer
  description: "VOLUME (27) read result, 0-60"

- id: audio_mute_state
  type: enum
  values: [off, on, soft_mute]
  description: "AUDIO MUTE (29) read result; 0=Off 1=On 2=Soft Mute"

- id: picture_mode_state
  type: enum
  values: [day_dynamic, day_normal, night]
  description: "PICTURE MODE (A4) read result; 0=Day(Dynamic) 1=Day(Normal) 2=Night"

- id: color_temperature_state
  type: enum
  values: [high, medium, standard, black_and_white]
  description: "COLOR TEMPERATURE (60) read result"

- id: aspect_state
  type: enum
  values: ["16:9_standard1", "16:9_zoom", "4:3_standard", "4:3_expanded", "4:3_zoom1", "4:3_zoom2", "16:9_standard2", full, normal, real]
  description: "ASPECT (40) read result, values 0-9"
```

## Variables
```yaml
- id: volume
  type: integer
  range: "0-60"
  initial: 20
  command: "2700000000{value_hex}"

- id: balance
  type: integer
  range: "0-60"
  initial: 30
  command: "2800000000{value_hex}"

- id: treble
  type: integer
  range: "0-30"
  initial: 15
  command: "2B00000000{value_hex}"

- id: bass
  type: integer
  range: "0-30"
  initial: 15
  command: "2A00000000{value_hex}"

- id: contrast
  type: integer
  range: "0-62"
  initial: 62
  command: "5900000000{value_hex}"

- id: brightness
  type: integer
  range: "0-62"
  initial: 31
  command: "1F00000000{value_hex}"

- id: color
  type: integer
  range: "0-62"
  initial: 31
  command: "1000000000{value_hex}"

- id: tint
  type: integer
  range: "0-62"
  initial: 31
  command: "1300000000{value_hex}"

- id: sharpness
  type: integer
  range: "0-62"
  initial: 31
  command: "1400000000{value_hex}"
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are replies to control bytes or commands.
```

## Macros
```yaml
- id: input_change_from_power_saving_input1
  label: "Input change to Input1 from power-saving state"
  steps:
    - "Send select_input_1 (6F0000000000)"
    - "Send the same command again (6F0000000000)"
  notes: "INPUT command does not operate normally in power-saving state; source section 'Input select command in state of power saving' case1"

- id: input_change_from_power_saving_cable_air
  label: "Input change to Cable or Air from power-saving state"
  steps:
    - "Send select_input_1 (6F0000000000)"
    - "Send select_input_cable_air (6F0000000005)"
  notes: "Source section 'Input select command in state of power saving' case2 (Table 4.5.1 No.3 then No.8)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings or interlock procedures in source. Terminal Mode ON locks out front keys and
# remote control (operational lockout, not a safety interlock) - see Notes.
```

## Notes
- Wire format: commands are 14 bytes total — STX (0x02), 12 ASCII characters, ETX (0x03). All command/data nibbles are converted to hex characters first, then each character is sent as ASCII ("0"-"9" -> 0x30-0x39, "A"-"F" -> 0x41-0x46). Worked source example: Power On characters "6E0000000001" -> bytes 36 45 30 30 30 30 30 30 30 30 30 31.
- Terminal Mode: commands accepted only when ON. Factory setting OFF (with AV Control Mode checkbox unchecked). Request ON with ENQ (0x05), OFF with EOT (0x04); TV answers ACK/NAK. Mode persists across TV power off/on. While ON, front keys and remote are ignored (front Power SW still works). Cannot be enabled during Adjust Mode, Event Timer, or Timer Recording.
- Write commands with E2PROM flag write to E2PROM same as Normal Mode.
- Read-after-write timing: if READ executes immediately after WRITE, correct value cannot be read (data not yet updated). Wait until OSD display disappears and data updates.
- Model-specific NACKs: P50H401 is an "H" model — COLOR TEMPERATURE Black&White value NACKs (also on T model); AUTO MOVIE MODE Smooth value NACKs (also T, S, V-LCD models) and whenever Game Mode is ON. Auto Movie values 0=Off/1=On(AUTO) apply to T/H/S and V(LCD) models; X and V(PDP) models use 0=Off/1=Original/2=Smooth.
- TV Guide models: TV Guide screen can disturb RS232C communication; disable "Auto Guide" so the guide does not appear after initial power on.
- Input change from power-saving state requires the two-step sequences in Macros.
- Connector: female DSUB-9P. Pin assignment (outside view): 1=NC, 2=RXD0 (TV receives), 3=TXD0 (TV sends), 4=DTR (TV sends), 5=GND, 6=NC, 7=RTS (TV sends), 8=CTS (TV receives), 9=NC, frame=GND. Electrical: RS232C standard. Cable section in source is OCR-garbled straight-through 1-1 mapping.
- Source document version: v.01, dated Feb/29/'08. Family coverage: P42H401, P42T501, P50H401, P50T501, P50S601, P50V701, P50X901, P55H401, P55T501, P60X901, L42S601, L42V651, L47S601, L47V651.
- Query commands ({fn}01{sub}0000) and the EXIT payload are assembled from the documented fixed format (Table 3.2.1.2, Table 3.3.1, Section 3.3.2); only write-table rows 1-39 have verbatim literal strings in the source.
<!-- UNRESOLVED: protocol/firmware version compatibility not stated beyond document version v.01 -->
<!-- UNRESOLVED: electrical specs beyond "RS232C standard" not stated -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - http://web.archive.org/web/20091221205028/http://www.hitachi-america.us/supportingdocs/forhome/ubcg/remote_ir_codes/Hitachi_2007_RS232Codes.pdf
retrieved_at: 2026-09-16T05:09:09.897Z
last_checked_at: 2026-09-16T22:16:35.795Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-16T22:16:35.795Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions resolve to source Table 4.5.1 literals or assembled read/query forms; transport parameters match section 2 verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "source is a family-wide protocol document (14 models); P50H401-specific behavior only distinguishable where model letters (T/H/S/V/X) are called out"
- "protocol/firmware version compatibility not stated beyond document version v.01"
- "electrical specs beyond \"RS232C standard\" not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
