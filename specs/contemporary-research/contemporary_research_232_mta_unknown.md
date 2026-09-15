---
spec_id: admin/contemporary-research-232-mta
schema_version: ai4av-public-spec-v1
revision: 1
title: "Contemporary Research 232-MTA Control Spec"
manufacturer: "Contemporary Research"
model_family: 232-MTA
aliases: []
compatible_with:
  manufacturers:
    - "Contemporary Research"
  models:
    - 232-MTA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.org
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
  - markertek.com
  - manualslib.com
source_urls:
  - https://archive.org/download/manualzz-id-1058460/1058460.pdf
  - https://archive.org/details/manualzz-id-1058460
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/232-ATSC_4K_Product_Manual_022026.pdf
  - https://www.markertek.com/Attachments/Manuals/Contemporary/5114-001-Manual.pdf
  - https://www.manualslib.com/products/Contemporary-Research-232-Mta-480250.html
retrieved_at: 2026-09-06T02:12:08.967Z
last_checked_at: 2026-09-06T22:16:13.394Z
generated_at: 2026-09-06T22:16:13.394Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "front-panel \"S-string\" layout (page 14 of source manual) referenced but not extracted in the protocol excerpt"
  - "full field layout referenced in source (manual page 14) but not extracted in protocol excerpt."
  - "full field layout not extracted in protocol excerpt."
  - "no RS-232 command documented for changing unit number (front-panel only per source)."
  - "no RS-232 command documented for changing baud (front-panel Mode 1 only)."
  - "source contains no explicit safety warnings or interlock procedures."
  - "full S-string and V-string response layouts referenced (manual page 14) but not extracted in protocol excerpt; only T-string layout is partially captured."
verification:
  verdict: verified
  checked_at: 2026-09-06T22:16:13.394Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions matched verbatim in the refined source; transport parameters (9600 baud, 8/N/1) and command coverage are complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-10
---

# Contemporary Research 232-MTA Control Spec

## Summary
The 232-MTA is a mono-audio TV tuner with full-duplex ASCII RS-232 control. This spec covers the full RS-232 command set: channel selection via Tune Ring, volume/mute, A/V routing, status queries, IR remote emulation, and front-panel mode settings, plus the response string format.

<!-- UNRESOLVED: front-panel "S-string" layout (page 14 of source manual) referenced but not extracted in the protocol excerpt -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # factory default per source; selectable 300-19200 via Front Panel Mode 1 (19,200 added in v3.5)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source; ASCII command strings are accepted without login
```

## Traits
```yaml
- powerable   # inferred from P0/P1/PT power commands
- levelable   # inferred from VU/VD/VL volume ramp/level commands
- queryable   # inferred from ST/SV/SS status-request commands and $R/$N queries
```

## Actions
```yaml
# Note on framing: source documents commands prefixed with ">" (Attention) and
# terminated with CR ($0D). Per-source "CR is assumed in all examples".
# Unit# prefix (1-9, or 0 = all units v4.0+) is mandatory for multi-tuner chains;
# omitted Unit# defaults to Unit#1. Parameter examples below show the value form
# the source uses; '=' is optional in the wire format.

# --- Q-series commands (compat with 232-STS) ---
- id: q0_caption_mode_off
  label: Caption Mode Off
  kind: action
  command: "Q0={0|1|2}"
  params:
    - name: value
      type: integer
      description: 0=Captioning off (fixed). Other values accepted but no functional effect on 232-MTA.
  notes: "Compatibility stub for 232-STS. Example: >Q0=0"

- id: q1_captioning_type
  label: Captioning Type
  kind: action
  command: "Q1={1-8}"
  params:
    - name: value
      type: integer
      description: 1=Caption 1 (default), 2=Caption 2, 3=Caption 3, 4=Caption 4, 5-8=Text 1-4. No functionality in 232-MTA.
  notes: "Example: >Q1=1"

- id: q2_video_loss_detection
  label: Video Loss Detection
  kind: action
  command: "Q2={0|1|2|3}"
  params:
    - name: value
      type: integer
      description: 3=No Function (fixed). Selects response when loss of video is detected.
  notes: "Other values have no functional effect on 232-MTA."

- id: q3_av_detect_status
  label: A/V Detect Status
  kind: action
  command: "Q3={0|1|2|3}"
  params:
    - name: value
      type: integer
      description: "0=Disable Stereo/Mono detection (fixed), 1=Enable Stereo/Mono, 2=Disable Stereo/Mono, 3=Enable Stereo/Mono. Only affects status reporting."
  notes: "Example: >Q3=1 or >Q31"

- id: q4_label_mode_with_status
  label: Label Mode with Status
  kind: action
  command: "Q4={0|1|2|3}"
  params:
    - name: value
      type: integer
      description: 0-3 all No Function (fixed) on 232-MTA.
  notes: "Compatibility stub."

# --- Tune Ring / channel select ---
- id: tr_set_tune_ring
  label: Set Tune Ring
  kind: action
  command: "TR={channels}"
  params:
    - name: channels
      type: string
      description: Comma/separated and dash/range list of channels (0-126, 126=External AV). Max 120 chars.
  notes: "Example: >2TR=2,4,7-10 stores Unit#2 Tune Ring as 2,4,7,8,9,10"

- id: tt_select_tuned_channel
  label: Select tuned channel
  kind: action
  command: "TT={channel}"
  params:
    - name: channel
      type: integer
      description: Channel number 0-126. 0=video mute, 255=video unmute, 126=External AV Inputs.
  notes: "Selects channel only if present in current TR. Example: >TT=28"

- id: tc_force_tuned_channel
  label: Force tuned channel
  kind: action
  command: "TC={channel}"
  params:
    - name: channel
      type: integer
      description: Channel number 0-126. 0=video mute, 255=video unmute, 126=External AV Inputs.
  notes: "Selects channel regardless of current TR. Example: >TC=39"

- id: tp_previous_channel
  label: Set to previous channel
  kind: action
  command: "TP"
  params: []
  notes: "Selects previous channel only if present in current TR."

- id: tu_tune_channel_up
  label: Tune channel up
  kind: action
  command: "TU"
  params: []
  notes: "Selects next higher channel in stored Tune Ring. Example: >3TU bumps Unit#3."

- id: td_tune_channel_down
  label: Tune channel down
  kind: action
  command: "TD"
  params: []
  notes: "Selects next lower channel in stored Tune Ring."

- id: xt_toggle_mute_av
  label: Toggle Mute A/V
  kind: action
  command: "XT"
  params: []
  notes: "Alternates Mute A/V on and off."

- id: xx_mute_av_off
  label: Mute A/V off
  kind: action
  command: "XX"
  params: []
  notes: "Turn A/V outputs on at previous level. Same as P1."

- id: xm_mute_av_on
  label: Mute A/V on
  kind: action
  command: "XM"
  params: []
  notes: "Mutes audio and video outputs. Example: >XM. Same as P0."

# --- Power ---
- id: p0_power_off
  label: Power Off
  kind: action
  command: "P0"
  params: []
  notes: "Same as XM."

- id: p1_power_on
  label: Power On
  kind: action
  command: "P1"
  params: []
  notes: "Same as XX."

- id: pt_power_toggle
  label: Power Toggle
  kind: action
  command: "PT"
  params: []
  notes: "Same as XT."

# --- Volume ---
- id: vu_ramp_volume_up
  label: Ramp volume up
  kind: action
  command: "VU"
  params: []
  notes: "No response."

- id: vd_ramp_volume_down
  label: Ramp volume down
  kind: action
  command: "VD"
  params: []
  notes: "No response."

- id: vl_set_volume_level
  label: Set volume level
  kind: action
  command: "VL{level}"
  params:
    - name: level
      type: integer
      description: Volume level 0-63.
  notes: "Ramps volume to specified level. No response."

- id: vx_volume_mute_off
  label: Volume mute off
  kind: action
  command: "VX"
  params: []
  notes: "Restores audio volume to previous level (full)."

- id: vm_volume_mute_on
  label: Volume mute on
  kind: action
  command: "VM"
  params: []
  notes: "Turns off audio outputs. Example: >VM. Source also lists VM as 'Stop volume ramp' with same mnemonic - same command string, two documented uses."

- id: vt_toggle_volume_mute
  label: Toggle volume mute
  kind: action
  command: "VT"
  params: []
  notes: "Alternates audio mute on and off."

# --- Setup (S-series) ---
- id: s0_set_tune_mode
  label: Set tune mode
  kind: action
  command: "S0={mode}"
  params:
    - name: mode
      type: integer
      description: "0=CATV, 1=Broadcast, 2=HRC, 3=IRC"
  notes: "Example: >S0=0 selects CATV."

- id: s4_set_front_panel_lockout
  label: Set front panel lockout mode
  kind: action
  command: "S4={mode}"
  params:
    - name: mode
      type: integer
      description: "0=None, 1=Channel, 2=Select, 3=Channel & Select, 4=Mute A/V, 5=Channel & Mute A/V, 6=Select & Mute A/V, 7=All"

- id: s5_set_powerup_volume
  label: Set power-up volume
  kind: action
  command: "S5={mode}"
  params:
    - name: mode
      type: integer
      description: "0=Restore to previous level (always full), 1=Restore to full"

- id: s7_set_audio_mode
  label: Set audio mode
  kind: action
  command: "S7={mode}"
  params:
    - name: mode
      type: integer
      description: "0=Mono (fixed). Other values have no functional effect on 232-MTA."

- id: s8_set_bass_gain
  label: Set bass gain level
  kind: action
  command: "S8={level}"
  params:
    - name: level
      type: integer
      description: 8=0 dB (fixed). Other values have no functional effect on 232-MTA.

- id: s9_set_treble_gain
  label: Set treble gain level
  kind: action
  command: "S9={level}"
  params:
    - name: level
      type: integer
      description: 4=0 dB (fixed). Other values have no functional effect on 232-MTA.

# --- Status requests ---
- id: ss_request_front_panel_status
  label: Request Front Panel status
  kind: query
  command: "SS"
  params: []
  notes: "Unit sends 'S' Front Panel status string."

- id: st_request_channel_status
  label: Request Channel status
  kind: query
  command: "ST"
  params: []
  notes: "Unit sends 'T' Channel/Source status string. Example: >ST"

- id: sv_request_av_status
  label: Request A/V status
  kind: query
  command: "SV"
  params: []
  notes: "Unit sends 'V' Audio status string."

# --- Character Generator (legacy option; no longer available, reference only) ---
- id: tm_set_label_mode
  label: Set on-screen channel label mode
  kind: action
  command: "TM={mode}"
  params:
    - name: mode
      type: integer
      description: "0=None, 1=Alpha only, 2=Numeric only, 3=Both alpha and numeric labels."
  notes: "Example: >TM=2. CG option no longer available for 232-MTA - reference only."

- id: tn_set_channel_label
  label: Set channel alpha label
  kind: action
  command: "TN={channel},{label}"
  params:
    - name: channel
      type: integer
      description: Channel number to label.
    - name: label
      type: string
      description: Up to 8 alphanumeric characters.
  notes: "Example: >TN=8,ABC. CG option no longer available for 232-MTA - reference only."

- id: tn_clear_labels
  label: Clear all stored alpha labels
  kind: action
  command: "TN=0,0"
  params: []
  notes: "CG option no longer available for 232-MTA - reference only."

- id: tc_display_current_label
  label: Display current channel label
  kind: action
  command: "TC"
  params: []
  notes: "Displays current channel label on screen for about 10 seconds. CG reference only. NOTE: collides with TC= force-tuned-channel command string; context (CG section vs Channel section) disambiguates per source."

- id: dg_move_cursor
  label: Move cursor to row/column
  kind: action
  command: "DG={row},{column}"
  params:
    - name: row
      type: integer
      description: Target row. 0 = leave row unchanged.
    - name: column
      type: integer
      description: Target column. 0 = leave column unchanged.
  notes: "CG reference only."

- id: e7_move_cursor_column
  label: Move cursor to column
  kind: action
  command: "E7={column}"
  params:
    - name: column
      type: integer
      description: Target column.
  notes: "CG reference only."

- id: e8_move_cursor_row
  label: Move cursor to row
  kind: action
  command: "E8={row}"
  params:
    - name: row
      type: integer
      description: Target row.
  notes: "CG reference only."

- id: ea_clear_screen
  label: Clear on-screen display
  kind: action
  command: "EA"
  params: []
  notes: "Also moves cursor to column 1 and row 1. CG reference only."

- id: eb_cursor_cr_lf
  label: Cursor carriage return + line feed
  kind: action
  command: "EB"
  params: []
  notes: "Moves cursor to first column of next row. CG reference only."

- id: dc_clear_to_end_of_screen
  label: Clear to end of screen
  kind: action
  command: "DC"
  params: []
  notes: "Cursor position does not change. CG reference only."

- id: db_clear_to_end_of_line
  label: Clear to end of line
  kind: action
  command: "DB"
  params: []
  notes: "Cursor position does not change. CG reference only."

- id: e9_clear_spaces
  label: Clear N spaces from cursor
  kind: action
  command: "E9={num_spaces}"
  params:
    - name: num_spaces
      type: integer
      description: Number of spaces to clear.
  notes: "Cursor position does not change. CG reference only."

- id: dm_clear_screen_full
  label: Clear on-screen display (full reset)
  kind: action
  command: "DM"
  params: []
  notes: "Moves cursor to col 1 / row 1, unblanks screen, cancels active KC or KT keypad command. CG reference only."

- id: dn_clear_and_write_text
  label: Clear screen and write text
  kind: action
  command: "DN{text}"
  params:
    - name: text
      type: string
      description: Text to write starting at column 1, row 1.
  notes: "CG reference only."

- id: dw_write_text
  label: Write text at cursor
  kind: action
  command: "DW{text}"
  params:
    - name: text
      type: string
      description: Text to write starting at current cursor position.
  notes: "CG reference only."

- id: dq_set_screen_timeout
  label: Set screen timeout
  kind: action
  command: "DQ={time}"
  params:
    - name: time
      type: integer
      description: "Timeout in seconds. 0 or 255 = persist indefinitely."
  notes: "CG reference only."

# --- Keypad emulation ---
- id: kc_key_0
  label: Emulate '0' key (any channel)
  kind: action
  command: "KC=0"
  params: []
  notes: "3-second timer selects channel. Append KC for immediate Enter."

- id: kc_key_1
  label: Emulate '1' key (any channel)
  kind: action
  command: "KC=1"
  params: []

- id: kc_key_2
  label: Emulate '2' key (any channel)
  kind: action
  command: "KC=2"
  params: []

- id: kc_key_3
  label: Emulate '3' key (any channel)
  kind: action
  command: "KC=3"
  params: []

- id: kc_key_4
  label: Emulate '4' key (any channel)
  kind: action
  command: "KC=4"
  params: []

- id: kc_key_5
  label: Emulate '5' key (any channel)
  kind: action
  command: "KC=5"
  params: []

- id: kc_key_6
  label: Emulate '6' key (any channel)
  kind: action
  command: "KC=6"
  params: []

- id: kc_key_7
  label: Emulate '7' key (any channel)
  kind: action
  command: "KC=7"
  params: []

- id: kc_key_8
  label: Emulate '8' key (any channel)
  kind: action
  command: "KC=8"
  params: []

- id: kc_key_9
  label: Emulate '9' key (any channel)
  kind: action
  command: "KC=9"
  params: []

- id: kc_enter
  label: Emulate 'Enter' key (any channel)
  kind: action
  command: "KC"
  params: []
  notes: "Selects channel immediately, bypassing 3-second timer."

- id: kt_key_9
  label: Emulate '9' key (Tune Ring only)
  kind: action
  command: "KT=9"
  params: []

- id: kt_enter
  label: Emulate 'Enter' key (Tune Ring only)
  kind: action
  command: "KT"
  params: []

- id: kd_cancel_keypad_entry
  label: Cancel keypad entry
  kind: action
  command: "KD"
  params: []
  notes: "Cancels pending KC/KT channel entry before timer or Enter fires."

# --- IR remote emulation ---
- id: kk_ir_remote_key
  label: Emulate IC-RC remote key
  kind: action
  command: "KK={key_code}"
  params:
    - name: key_code
      type: integer
      description: "0=Release Key, 9=Power (toggling), 10=0, 11=1, 12=2, 13=3, 14=4, 15=5, 16=6, 17=7, 18=8, 19=9, 21=Enter, 22=Channel up/+, 23=Channel down/-, 24=Volume up/+ (use 0 to stop ramp), 25=Volume down/- (use 0 to stop ramp), 26=Volume mute, 31=Input (toggling)"

# --- Tune Ring queries ---
- id: r_request_tune_ring
  label: Request Tune Ring
  kind: query
  command: "$R"
  params: []
  notes: "Example: >$R for Unit 1. Reply example: <1$TR2-31,35,52,126"

- id: n_request_label
  label: Request channel label
  kind: query
  command: "$N-{channel}"
  params:
    - name: channel
      type: integer
      description: Channel number to query (zero-padded to 3 digits in reply).
  notes: "Source documents command as '$N-xxx' with literal dash separator. Example: >$N31. Reply example: <1$TN038,ABC"

# --- Terminal communication ---
- id: ef_echo_off
  label: Echo off
  kind: action
  command: "EF"
  params: []
  notes: "Characters received will not be re-transmitted. Power-up default."

- id: en_echo_on
  label: Echo on
  kind: action
  command: "EN"
  params: []
  notes: "Characters received will be re-transmitted."

- id: id_product_id
  label: Product ID
  kind: query
  command: "ID"
  params: []
  notes: "Returns product model number and software version."

- id: z_zap_factory_defaults
  label: Zap to factory defaults
  kind: action
  command: "Z!"
  params: []
  notes: "Reconfigures unit for all factory default settings."
```

## Feedbacks
```yaml
# Status response strings begin with "<" (Attention), include Unit#, end with CR LF.
# Three groups: Channel/Source (T), Front Panel (S), Audio (V).
# Status is pushed after each valid group command or front-panel action; ~125ms delay.
# Each group may also be polled via ST / SS / SV.

- id: channel_source_status
  type: object
  description: Channel/Source status group, prefixed 'T' in the response string.
  fields:
    - name: channel
      type: integer
      description: 1-3 digit current channel number. N/A placeholder when not active.
    - name: mute
      type: string
      description: "U=Unmuted, M=Mute. 0-63 mute level also encoded in 2-digit field. M=Mono separator."

- id: front_panel_status
  type: object
  description: Front Panel status group, prefixed 'S'. Layout mirrors front-panel modes 0-9.
  # UNRESOLVED: full field layout referenced in source (manual page 14) but not extracted in protocol excerpt.

- id: av_status
  type: object
  description: Audio/Volume status group, prefixed 'V'. Returned by SV command.
  # UNRESOLVED: full field layout not extracted in protocol excerpt.
```

## Variables
```yaml
# Settable parameters persisted to NVRAM (per source: "All settings are saved to NVRAM in the 232-MTA").
# Distinct from one-shot commands - these retain state across power cycles.

- id: tune_ring
  type: object
  description: Comma/dash list of channels the tuner is allowed to access (set via TR).
  set_command: "TR={channels}"

- id: tune_mode
  type: string
  description: RF tune mode.
  values: [CATV, Broadcast, HRC, IRC]
  set_command: "S0={mode}"

- id: front_panel_lockout
  type: integer
  description: 0-7 per source S4= mapping.
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  set_command: "S4={mode}"

- id: powerup_volume
  type: integer
  description: "0=restore to previous level, 1=restore to full."
  values: [0, 1]
  set_command: "S5={mode}"

- id: audio_mode
  type: integer
  description: 0=Mono (fixed).
  values: [0]
  set_command: "S7={mode}"

- id: unit_number
  type: integer
  description: Per-tuner address 1-9 for multi-unit RS-232 chains. Set via Front Panel Mode 2.
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  # UNRESOLVED: no RS-232 command documented for changing unit number (front-panel only per source).

- id: baud_rate
  type: integer
  description: Per-source selectable values 300-19200; factory default 9600. 19200 added in v3.5.
  values: [300, 600, 1200, 2400, 4800, 9600, 19200]
  # UNRESOLVED: no RS-232 command documented for changing baud (front-panel Mode 1 only).
```

## Events
```yaml
# Status responses are sent unsolicited after any valid group command or front-panel action,
# and at power-up all three groups are sent. Treat as event pushes.
- id: channel_source_status_update
  description: "Push of T-string after channel/source group commands or front-panel activity."
  prefix: "T"
- id: front_panel_status_update
  description: "Push of S-string after front-panel mode commands."
  prefix: "S"
- id: av_status_update
  description: "Push of V-string after audio/volume group commands."
  prefix: "V"
```

## Macros
```yaml
# Multi-step sequences documented in source "Command Hints and Tips".

- id: full_status_update
  label: Request full status update
  description: Send all three status requests back-to-back to get all three response strings.
  steps:
    - command: "ST"
    - command: "SV"
    - command: "SS"
  notes: "Example: >STSVSS returns all 3 response strings back-to-back."

- id: mute_off_then_channel
  label: Mute A/V off then select channel
  description: Concatenated example showing combined string up to 120 ASCII chars.
  steps:
    - command: "XX"
    - command: "TC=9"
  notes: "Example: >XXTC=9. May be useful to send Mute A/V Off in case Mute A/V was set On from front panel."

- id: catv_no_lockout
  label: CATV mode + no lockout
  description: Concatenated setup example.
  steps:
    - command: "S0=0"
    - command: "S4=0"
  notes: "Example: >S0=0S4=0"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Hardware note from source: cables with all DB-9 pins wired can lock out front-panel
# programming and data communication (Pins 4 and 9 are inputs) - relevant for installers,
# not a runtime safety interlock.
```

## Notes
- **Framing:** Commands prefixed with `>` (Attention), terminated with CR ($0D). Responses prefixed with `<` and terminated with CR LF. Unit# prefix is required in multi-tuner chains; default Unit# = 1; Unit# 0 = global (broadcast to all tuners, v4.0+).
- **No inter-character delay required** — protocol is interrupt-driven and buffered.
- **Status latency:** Status responses intentionally delayed ~125 ms to coalesce rapid commands.
- **Baud rate:** Default 9600; selectable 300, 600, 1200, 2400, 4800, 9600, 19200 via front-panel Mode 1. v3.5 added 19,200 support.
- **Multi-tuner addressing:** Up to 9 units (v3.5+) on a single RS-232 port. First unit in chain must have the highest Unit# — CR tuners use an intelligent data bus where the highest-numbered tuner receives all commands and forwards commands addressed to lower-numbered units down the chain.
- **Cable:** Only pins 2, 3, 5 should be wired for RS-232 control. Pins 4 (Channel Up) and 9 (Channel Down) are contact-closure inputs sharing GND on pin 5 — they are NOT RS-232 data lines.
- **Front-panel mode mapping:** Modes 10-14 mirror RS-232 commands Q0-Q4 respectively (per source "Modes 10 - 14 are identical to RS-232 Commands Q0 - Q4"). Mode 0 = RF Tune, Mode 1 = Baud Rate, Mode 2 = Unit Number, Mode 4 = Panel Lockout, Mode 5 = Power-up Volume, Mode 6 = Firmware Version, Mode 7 = Audio Decode (Mono fixed), Mode 8 = Bass Gain, Mode 9 = Treble Gain.
- **CG section is legacy:** The character-generator option is no longer available for the 232-MTA — the related actions (TM/TN/DG/E7-E9/EA/EB/DC/DB/DM/DN/DW/DQ) are documented for reference on earlier units with the option installed.
- **`=` is optional** in command strings — `>Q3=1` and `>Q31` both work.
- **Leading zeros optional** in numeric parameters — `>TC=009` and `>TC=9` select the same channel.
- **Settings persist to NVRAM.**
- **VM mnemonic collision:** Source documents `VM` as both "Stop volume ramp" and "Volume Mute on" — same wire string, two documented uses.
- **TC mnemonic collision:** Source documents `TC` as both "Force tuned channel" (with `=` and channel parameter) and "Display current channel label" (no parameter, CG-only) — same mnemonic, distinct wire forms (parameter presence disambiguates).
- **$N format:** Source documents command as `$N-xxx` with literal `-` between `$N` and channel number (e.g., `>$N31`).
- **Versioned features:** Unit#0 global broadcast = v4.0+; multi-unit (4-9) and 19200 baud = v3.5+; $R/$N queries and KK IR emulation = v3.4+. Units shipped with new processor (Rev 3.4+) start at serial number 229-5017-001.

<!-- UNRESOLVED: full S-string and V-string response layouts referenced (manual page 14) but not extracted in protocol excerpt; only T-string layout is partially captured. -->

## Provenance

```yaml
source_domains:
  - archive.org
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
  - markertek.com
  - manualslib.com
source_urls:
  - https://archive.org/download/manualzz-id-1058460/1058460.pdf
  - https://archive.org/details/manualzz-id-1058460
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/232-ATSC_4K_Product_Manual_022026.pdf
  - https://www.markertek.com/Attachments/Manuals/Contemporary/5114-001-Manual.pdf
  - https://www.manualslib.com/products/Contemporary-Research-232-Mta-480250.html
retrieved_at: 2026-09-06T02:12:08.967Z
last_checked_at: 2026-09-06T22:16:13.394Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-06T22:16:13.394Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions matched verbatim in the refined source; transport parameters (9600 baud, 8/N/1) and command coverage are complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "front-panel \"S-string\" layout (page 14 of source manual) referenced but not extracted in the protocol excerpt"
- "full field layout referenced in source (manual page 14) but not extracted in protocol excerpt."
- "full field layout not extracted in protocol excerpt."
- "no RS-232 command documented for changing unit number (front-panel only per source)."
- "no RS-232 command documented for changing baud (front-panel Mode 1 only)."
- "source contains no explicit safety warnings or interlock procedures."
- "full S-string and V-string response layouts referenced (manual page 14) but not extracted in protocol excerpt; only T-string layout is partially captured."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
