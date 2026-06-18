---
spec_id: admin/classe-audio-ssp-300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio SSP-300 Control Spec"
manufacturer: "Classé"
model_family: SSP-300
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - SSP-300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-300-600_RS232_Protocol.pdf
retrieved_at: 2026-06-15T13:14:49.053Z
last_checked_at: 2026-06-16T07:02:09.943Z
generated_at: 2026-06-16T07:02:09.943Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Voltage/power specs not in source. Auth not addressed in source (treated as none, see Transport)."
  - "flow control not stated in source; FIFO (16-byte) supported, no inter-byte minimum"
  - "no multi-step sequences explicitly documented in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility not stated. Voltage/power/current specs not in source. Auth/login procedure not described (assumed none). Flow control not specified. DBGBALCON behavior on SSP-300 not stated. IR code table (numeric values for IRC nnn) not in this document — referenced only. Mode-set command absent."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:02:09.943Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions have literal command matches in the source document; all transport parameters verified; bidirectional coverage confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Classe Audio SSP-300 Control Spec

## Summary
Classe Audio SSP-300 AV surround sound processor controlled via RS-232C serial (9600 8N1, ASCII). Spec covers full command set: input/zone routing, volume, balance, channel trims, lip sync, power/standby, triggers, LCD intensity, status queries, and unsolicited status events. Source is the first-party Classe RS-232 spec covering SSP-300 and SSP-600 (SSP-300 address `S300`).

<!-- UNRESOLVED: firmware version compatibility not stated. Voltage/power specs not in source. Auth not addressed in source (treated as none, see Transport). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; FIFO (16-byte) supported, no inter-byte minimum
auth:
  type: none  # inferred: no auth procedure in source
# Framing notes (from source):
#   - All command/status data are ASCII bytes.
#   - Each command line: optional address field "S300" + period delimiter + command string + CR/LF.
#     Address and period may be omitted if controller is uniquely connected to the SSP-300.
#   - Command string = ASCII between period and CR; leading blanks ignored.
#   - Acknowledge reply within 100ms of LF: "!" + CR/LF (recognized) or "?" + CR/LF (unrecognized).
#   - xVOL+/- (MVOL/ZVOL) must be received within 200ms of prior reply for acceleration mode.
```

## Traits
```yaml
traits:
  - powerable    # inferred: STBY / OPER commands present
  - routable     # inferred: MAIN n / ZONE n input selection present
  - queryable    # inferred: STAT MAIN / STAT MODE queries present
  - levelable    # inferred: VOLA / VOLZ / channel trim commands present
```

## Actions
```yaml
# Address prefix "S300." shown optional; commands below omit it (controller uniquely connected).
# Each command terminated by CR/LF.
actions:
  # --- Input / zone routing ---
  - id: main_input_set
    label: Set Main Zone Input
    kind: action
    command: "MAIN {n}\r\n"
    params:
      - name: n
        type: integer
        description: Input number
  - id: zone_input_set
    label: Set Zone Input
    kind: action
    command: "ZONE {n}\r\n"
    params:
      - name: n
        type: integer
        description: Input number
  - id: main_input_next
    label: Main Input Next
    kind: action
    command: "MINP+\r\n"
    params: []
  - id: main_input_prev
    label: Main Input Previous
    kind: action
    command: "MINP-\r\n"
    params: []
  - id: zone_input_next
    label: Zone Input Next
    kind: action
    command: "ZINP+\r\n"
    params: []
  - id: zone_input_prev
    label: Zone Input Previous
    kind: action
    command: "ZINP-\r\n"
    params: []
  # --- Zone on/off / mute ---
  - id: zone_unmute
    label: Zone On (Unmute)
    kind: action
    command: "ZUMT\r\n"
    params: []
  - id: zone_mute_standby
    label: Zone Off (Standby/Mute)
    kind: action
    command: "ZMUT\r\n"
    params: []
  - id: zone_on
    label: Zone On
    kind: action
    command: "ZON\r\n"
    params: []
  - id: zone_off
    label: Zone Off
    kind: action
    command: "ZOFF\r\n"
    params: []
  - id: main_mute_engage
    label: Mute Main
    kind: action
    command: "MUTE\r\n"
    params: []
  - id: main_mute_release
    label: Unmute Main
    kind: action
    command: "UNMT\r\n"
    params: []
  # --- Listening position / volume ---
  - id: listening_position_set
    label: Set Listening Position
    kind: action
    command: "LPSN {m}\r\n"
    params:
      - name: m
        type: integer
        description: Listening position number
  - id: main_volume_set
    label: Set Main Volume (Absolute)
    kind: action
    command: "VOLA {vv}\r\n"
    params:
      - name: vv
        type: integer
        description: Absolute volume value (nearest possible applied; mute disengaged)
  - id: zone_volume_set
    label: Set Zone Volume (Absolute)
    kind: action
    command: "VOLZ {vv}\r\n"
    params:
      - name: vv
        type: integer
        description: Absolute zone output volume (00 = off)
  - id: main_volume_up
    label: Main Volume Up
    kind: action
    command: "MVOL+\r\n"
    params: []
    notes: "Acceleration mode: must be received within 200ms of prior reply."
  - id: main_volume_down
    label: Main Volume Down
    kind: action
    command: "MVOL-\r\n"
    params: []
    notes: "Acceleration mode: must be received within 200ms of prior reply."
  - id: zone_volume_up
    label: Zone Volume Up
    kind: action
    command: "ZVOL+\r\n"
    params: []
    notes: "Acceleration mode: must be received within 200ms of prior reply."
  - id: zone_volume_down
    label: Zone Volume Down
    kind: action
    command: "ZVOL-\r\n"
    params: []
    notes: "Acceleration mode: must be received within 200ms of prior reply."
  # --- Balance ---
  - id: balance_left
    label: Balance Shift Left (1 dB)
    kind: action
    command: "BALL\r\n"
    params: []
  - id: balance_center
    label: Balance Recenter
    kind: action
    command: "BALC\r\n"
    params: []
  - id: balance_right
    label: Balance Shift Right (1 dB)
    kind: action
    command: "BALR\r\n"
    params: []
  # --- Temporary channel trims ---
  - id: sub_trim_up
    label: Sub Trim +1 dB (Temporary)
    kind: action
    command: "SUB+\r\n"
    params: []
  - id: sub_trim_down
    label: Sub Trim -1 dB (Temporary)
    kind: action
    command: "SUB-\r\n"
    params: []
  - id: center_trim_up
    label: Center Trim +1 dB (Temporary)
    kind: action
    command: "CNT+\r\n"
    params: []
  - id: center_trim_down
    label: Center Trim -1 dB (Temporary)
    kind: action
    command: "CNT-\r\n"
    params: []
  - id: surround_trim_up
    label: Surround Trim +1 dB (Temporary)
    kind: action
    command: "SRN+\r\n"
    params: []
  - id: surround_trim_down
    label: Surround Trim -1 dB (Temporary)
    kind: action
    command: "SRN-\r\n"
    params: []
  - id: back_trim_up
    label: Back Trim +1 dB (Temporary)
    kind: action
    command: "BAK+\r\n"
    params: []
  - id: back_trim_down
    label: Back Trim -1 dB (Temporary)
    kind: action
    command: "BAK-\r\n"
    params: []
  # --- Lip sync ---
  - id: lipsync_up
    label: Lip Sync +1 ms
    kind: action
    command: "LSY+\r\n"
    params: []
  - id: lipsync_down
    label: Lip Sync -1 ms
    kind: action
    command: "LSY-\r\n"
    params: []
  - id: lipsync_reset
    label: Lip Sync Reset (No Delay)
    kind: action
    command: "LSY0\r\n"
    params: []
  - id: trims_reset
    label: Reset Temporary Channel Offset Trims
    kind: action
    command: "TRM0\r\n"
    params: []
  # --- Dolby Digital late night ---
  - id: dd_late_night_on
    label: Dolby Digital Late Night Compression On
    kind: action
    command: "DDLN\r\n"
    params: []
  - id: dd_late_night_off
    label: Dolby Digital Late Night Compression Off
    kind: action
    command: "DDNC\r\n"
    params: []
  # --- Power state ---
  - id: standby
    label: Standby
    kind: action
    command: "STBY\r\n"
    params: []
  - id: operate
    label: Operate
    kind: action
    command: "OPER\r\n"
    params: []
  # --- Triggers ---
  - id: trigger1_off
    label: Trigger 1 Off
    kind: action
    command: "T1_0\r\n"
    params: []
  - id: trigger1_on
    label: Trigger 1 On
    kind: action
    command: "T1_1\r\n"
    params: []
  - id: trigger2_off
    label: Trigger 2 Off
    kind: action
    command: "T2_0\r\n"
    params: []
  - id: trigger2_on
    label: Trigger 2 On
    kind: action
    command: "T2_1\r\n"
    params: []
  # --- Front panel LCD ---
  - id: lcd_screen_saver
    label: LCD Screen Saver (Low Power)
    kind: action
    command: "LCD0\r\n"
    params: []
  - id: lcd_low
    label: LCD Low Intensity
    kind: action
    command: "LCD1\r\n"
    params: []
  - id: lcd_medium
    label: LCD Medium Intensity
    kind: action
    command: "LCD2\r\n"
    params: []
  - id: lcd_high
    label: LCD High Intensity
    kind: action
    command: "LCD3\r\n"
    params: []
  # --- IR passthrough ---
  - id: ir_pass
    label: Pass IR Code
    kind: action
    command: "IRC {nnn}\r\n"
    params:
      - name: nnn
        type: integer
        description: IR code number from SSP-300/600 IR code table
  # --- Tape monitor ---
  - id: tape_off
    label: Tape Monitor Off
    kind: action
    command: "TAP0\r\n"
    params: []
  - id: tape_on
    label: Tape Monitor On
    kind: action
    command: "TAP1\r\n"
    params: []
  # --- UI skin ---
  - id: skin_set
    label: Set Front Panel Skin
    kind: action
    command: "CSK {n}\r\n"
    params:
      - name: n
        type: integer
        description: Skin number (1 = Classe, ..., 5 = Green)
  # --- Debug / config (SSP-600-only feature flagged in source) ---
  - id: dbg_balcon
    label: Debug Set Input Balanced Mode
    kind: action
    command: "DBGBALCON {n} {m}\r\n"
    params:
      - name: n
        type: integer
        description: Input number
      - name: m
        type: integer
        description: Balanced mode (0 = off, 1 = on); source marks SSP-600 only
    notes: "Source marks SSP600 only; behavior on SSP-300 UNRESOLVED."
  - id: dbg_vidout
    label: Debug Set Video Output State
    kind: action
    command: "DBGVIDOUT {n} {m}\r\n"
    params:
      - name: n
        type: integer
        description: Output video number
      - name: m
        type: integer
        description: State (0 = off, 1 = on)
  # --- Status queries ---
  - id: query_main_status
    label: Query Main Volume and Input
    kind: query
    command: "STAT MAIN\r\n"
    params: []
  - id: auto_status_on
    label: Enable Automatic Status Updates
    kind: action
    command: "STAT AUTO\r\n"
    params: []
  - id: auto_status_off
    label: Disable Automatic Status Updates
    kind: action
    command: "STAT OFF\r\n"
    params: []
  - id: query_mode
    label: Query Current Post-Processing Mode
    kind: query
    command: "STAT MODE\r\n"
    params: []
```

## Feedbacks
```yaml
# Acknowledge reply: device sends "!" + CR/LF within 100ms for recognized commands,
# "?" + CR/LF for unrecognized. See Events for status payloads.
feedbacks:
  - id: command_ack
    type: enum
    values: ["!", "?"]  # "!" = recognized, "?" = unrecognized
    notes: "Single-char reply + CR/LF, sent within 100ms of command LF."
```

## Variables
```yaml
# No directly settable scalar parameter exposed as a single value endpoint in source.
# Volume, balance, trims, lip sync are all driven via discrete actions above.
# Post-processing mode has no set command in source (read via STAT MODE); menu-only set path UNRESOLVED.
```

## Events
```yaml
# Unsolicited status strings emitted by the SSP-300 (esp. when STAT AUTO enabled).
# No leading address field. Numeric placeholders {n}, {vv}, {NN} substituted by device.
events:
  - id: sys_powerup
    label: System Power-Up Complete
    payload: "SY PWRUP"
    notes: "SSP-300/600 has completed power up."
  - id: sys_standby
    label: System Entered Standby
    payload: "SY STBY"
  - id: sys_operate
    label: System Entered Operate
    payload: "SY OPER"
  - id: volume_absolute
    label: Volume Absolute Report
    payload: "SY VOLA {vv}"
    params:
      - name: vv
        type: integer
        description: Current absolute volume; "muted" appended if mute engaged.
  - id: volume_relative
    label: Volume Relative (to THX level)
    payload: "SY VOLR {sign}{vv}"
    params:
      - name: sign
        type: string
        description: "+/-"
      - name: vv
        type: integer
  - id: main_input_report
    label: Main Input Selection Report
    payload: "SY MAIN {n} {NN}"
    params:
      - name: n
        type: integer
        description: Input number
      - name: NN
        type: string
        description: Input name
  - id: mode_report
    label: Post-Processing Mode Report
    payload: "SY MODE {n}"
    params:
      - name: n
        type: integer
        description: Mode index 0-34 (see enum below)
    enum:
      0: "multi-channel"
      1: "multi-channel+THX"
      2: "Dolby Pro Logic"
      3: "Dolby Pro Logic+THX"
      4: "music mode club"
      5: "music mode natural"
      6: "music mode concert"
      7: "music mode party"
      8: "music mode stadium"
      9: "music mode 6"
      10: "music mode 7"
      11: "mono"
      12: "mono+THX"
      13: "custom"
      14: "surround 6.1"
      15: "stereo"
      16: "stereo+THX"
      17: "Dolby PLII Movie"
      18: "Dolby PLII Movie+THX"
      19: "Dolby PLII Music"
      20: "Dolby PLIIx Music"
      21: "Dolby PLIIx Movie"
      22: "Dolby PLIIx Movie+THX"
      23: "Dolby Digital EX"
      24: "THX Ultra2 Music"
      25: "THX Ultra2 Cinema"
      26: "THX Surround EX"
      28: "DTS Neo:6+THX"
      29: "DTS Neo:6 Cinema"
      30: "DTS Neo:6 Cinema+THX"
      31: "DTS Neo:6 Music"
      32: "DTS Matrix 6.1"
      33: "DTS Matrix 6.1+THX"
      34: "stereo 24/96"
    notes: "Index 27 absent in source. Modes available depend on source stream."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Trigger outputs (T1/T2) drive external
# equipment - verify downstream device state before toggling. Not stated in source.
```

## Notes
- Source is the first-party Classe Audio RS-232 spec covering **both SSP-300 and SSP-600**. Address field differs: `S300` for SSP-300, `S600` for SSP-600. Address + period delimiter optional when controller is uniquely connected; omitted commands are interpreted for local operation.
- Line terminator: carriage return + line feed (`\r\n`). Status strings also use CR/LF.
- Acknowledge timing: reply issued within 100ms of command LF; if no reply after 100ms, reissue the command.
- xVOL acceleration: `MVOL+`, `MVOL-`, `ZVOL+`, `ZVOL-` must arrive within 200ms of the previous reply to engage acceleration mode (per source note, marked `(*)`).
- System setup allows other baud selections beyond 9600 (stated generically); specific alternates not enumerated. Default documented config = 9600 8N1.
- 16-byte FIFO on the SSP-300/600; no minimum inter-byte delay required by device, and the controller must likewise accept status bytes without inter-byte delays.
- `DBGBALCON` is flagged SSP-600-only in the source; effect on SSP-300 UNRESOLVED.
- Post-processing mode **has no set command** in the source (read via `STAT MODE`); set path is menu-driven on the front panel — UNRESOLVED as a remote action.
- Mode index `27` is absent from the source table (jumps 26 → 28); reason not stated.

<!-- UNRESOLVED: firmware version compatibility not stated. Voltage/power/current specs not in source. Auth/login procedure not described (assumed none). Flow control not specified. DBGBALCON behavior on SSP-300 not stated. IR code table (numeric values for IRC nnn) not in this document — referenced only. Mode-set command absent. -->
```Spec generated above. Full coverage: 9600 8N1, all ~50 source commands enumerated (no collapse), SY* events with mode enum 0-34 (idx 27 absent noted), ack `!`/`?` feedback, UNRESOLVED markers for firmware/voltage/auth/flow-control/mode-set/DBGBALCON-on-SSP300.

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_SSP-300-600_RS232_Protocol.pdf
retrieved_at: 2026-06-15T13:14:49.053Z
last_checked_at: 2026-06-16T07:02:09.943Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:02:09.943Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions have literal command matches in the source document; all transport parameters verified; bidirectional coverage confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Voltage/power specs not in source. Auth not addressed in source (treated as none, see Transport)."
- "flow control not stated in source; FIFO (16-byte) supported, no inter-byte minimum"
- "no multi-step sequences explicitly documented in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility not stated. Voltage/power/current specs not in source. Auth/login procedure not described (assumed none). Flow control not specified. DBGBALCON behavior on SSP-300 not stated. IR code table (numeric values for IRC nnn) not in this document — referenced only. Mode-set command absent."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
