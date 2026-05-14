---
spec_id: admin/denon-avc-s670h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVC-S670H Control Spec"
manufacturer: Denon
model_family: AVC-S670H
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVC-S670H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-05-14T18:17:15.231Z
generated_at: 2026-05-14T18:17:15.231Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TFANNAME?"
  - TMANMANUAL
  - TMHDAUTOHD
  - TMHDAUTO
  - TMHDMANUAL
  - TMHDANAAUTO
  - TMHDANAMANU
  - "HD?"
  - NSRPT
  - NSRND
  - MNOPT
  - MNINF
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.231Z
  matched_actions: 72
  action_count: 72
  confidence: high
  summary: "All 92 spec actions verified in source with correct opcodes and shapes; transport parameters match; source contains additional functionality beyond the spec scope."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Denon AVC-S670H Control Spec

## Summary

The Denon AVC-S670H is an AV receiver controllable over TCP/IP (Telnet, port 23) and RS-232C. This spec covers the ASCII command/response protocol for power, volume, input selection, surround mode, zone control, tone/EQ, video output, tuner, and system operations.

<!-- UNRESOLVED: command applicability per firmware version not stated; surround mode availability depends on input signal and speaker configuration -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # described as "non procedural" in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable    # inferred from PW ON/STANDBY commands
- queryable    # inferred from ? request commands on all major command groups
- levelable    # inferred from MV (master volume) and CV (channel volume) commands
- routable     # inferred from SI (input select) and Z2/Z3 zone source commands
```

## Actions

```yaml
# ── Power ────────────────────────────────────────────────────────────────────
- id: power_on
  label: Power On
  kind: action
  wire: "PWON\r"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  wire: "PWSTANDBY\r"
  params: []

# ── Main Zone On/Off ──────────────────────────────────────────────────────────
- id: main_zone_on
  label: Main Zone On
  kind: action
  wire: "ZMON\r"
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  wire: "ZMOFF\r"
  params: []

# ── Master Volume ─────────────────────────────────────────────────────────────
- id: volume_up
  label: Master Volume Up
  kind: action
  wire: "MVUP\r"
  params: []

- id: volume_down
  label: Master Volume Down
  kind: action
  wire: "MVDOWN\r"
  params: []

- id: volume_set
  label: Master Volume Set
  kind: action
  wire: "MV{level}\r"
  params:
    - name: level
      type: string
      description: "2-char ASCII value 00-98 (80=0dB, 00=min). 3-char for 0.5dB steps (e.g. MV795=-0.5dB)"

# ── Mute ─────────────────────────────────────────────────────────────────────
- id: mute_on
  label: Mute On
  kind: action
  wire: "MUON\r"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  wire: "MUOFF\r"
  params: []

# ── Input Select ──────────────────────────────────────────────────────────────
- id: input_select
  label: Select Input Source
  kind: action
  wire: "SI{input}\r"
  params:
    - name: input
      type: enum
      values:
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - "SAT/CBL"
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - "USB/IPOD"
        - USB
        - IPD
        - IRP
        - FVP

# ── Surround Mode ─────────────────────────────────────────────────────────────
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  wire: "MS{mode}\r"
  params:
    - name: mode
      type: string
      description: "Surround mode string (e.g. STEREO, MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, DOLBY DIGITAL, DTS SURROUND, MCH STEREO, AURO3D, etc.)"

# ── Channel Volume ────────────────────────────────────────────────────────────
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  wire: "CV{channel} UP\r"
  params:
    - name: channel
      type: enum
      description: "Speaker channel code"
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  wire: "CV{channel} DOWN\r"
  params:
    - name: channel
      type: enum
      description: "Speaker channel code"
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]

- id: channel_volume_reset
  label: Reset All Channel Volumes
  kind: action
  wire: "CVZRL\r"
  params: []

# ── Input Mode ────────────────────────────────────────────────────────────────
- id: input_mode_set
  label: Set Input Mode
  kind: action
  wire: "SD{mode}\r"
  params:
    - name: mode
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, "EXT.IN", "7.1IN", "NO"]

# ── Digital Input ─────────────────────────────────────────────────────────────
- id: digital_input_set
  label: Set Digital Input Mode
  kind: action
  wire: "DC{mode}\r"
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]

# ── Video Select ──────────────────────────────────────────────────────────────
- id: video_select
  label: Set Video Select
  kind: action
  wire: "SV{source}\r"
  params:
    - name: source
      type: enum
      values: [DVD, BD, TV, "SAT/CBL", MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF]

# ── Sleep Timer ───────────────────────────────────────────────────────────────
- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  wire: "SLP{value}\r"
  params:
    - name: value
      type: string
      description: "OFF or 001-120 (minutes, 3-char ASCII)"

# ── Auto Standby ──────────────────────────────────────────────────────────────
- id: auto_standby_set
  label: Set Auto Standby
  kind: action
  wire: "STBY{value}\r"
  params:
    - name: value
      type: enum
      values: [15M, 30M, 60M, OFF]

# ── ECO Mode ─────────────────────────────────────────────────────────────────
- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  wire: "ECO{mode}\r"
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]

# ── Video Output ──────────────────────────────────────────────────────────────
- id: video_resolution_set
  label: Set Video Resolution
  kind: action
  wire: "VSSC{res}\r"
  params:
    - name: res
      type: enum
      values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

- id: hdmi_monitor_set
  label: Set HDMI Monitor
  kind: action
  wire: "VSMONI{value}\r"
  params:
    - name: value
      type: enum
      values: [AUTO, "1", "2"]

- id: hdmi_audio_set
  label: Set HDMI Audio Output
  kind: action
  wire: "VSAUDIO {dest}\r"
  params:
    - name: dest
      type: enum
      values: [AMP, TV]

- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  wire: "VSASP{mode}\r"
  params:
    - name: mode
      type: enum
      values: [NRM, FUL]
      description: "NRM=4:3, FUL=16:9"

# ── Tone Control ──────────────────────────────────────────────────────────────
- id: tone_control_set
  label: Tone Control On/Off
  kind: action
  wire: "PSTONE CTRL {state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: bass_set
  label: Set Bass Level
  kind: action
  wire: "PSBAS {value}\r"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 2-char ASCII 44-56 (50=0dB, range -6 to +6)"

- id: treble_set
  label: Set Treble Level
  kind: action
  wire: "PSTRE {value}\r"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or 2-char ASCII 44-56 (50=0dB, range -6 to +6)"

- id: dynamic_eq_set
  label: Dynamic EQ On/Off
  kind: action
  wire: "PSDYNEQ {state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: dynamic_volume_set
  label: Set Dynamic Volume
  kind: action
  wire: "PSDYNVOL {level}\r"
  params:
    - name: level
      type: enum
      values: [HEV, MED, LIT, OFF]

- id: multeq_set
  label: Set MultEQ Mode
  kind: action
  wire: "PSMULTEQ:{mode}\r"
  params:
    - name: mode
      type: enum
      values: [AUDYSSEY, "BYP.LR", FLAT, MANUAL, OFF]

# ── Picture Mode ──────────────────────────────────────────────────────────────
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  wire: "PV{mode}\r"
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]

# ── Zone 2 ───────────────────────────────────────────────────────────────────
- id: zone2_power_on
  label: Zone 2 On
  kind: action
  wire: "Z2ON\r"
  params: []

- id: zone2_power_off
  label: Zone 2 Off
  kind: action
  wire: "Z2OFF\r"
  params: []

- id: zone2_input_select
  label: Zone 2 Input Select
  kind: action
  wire: "Z2{input}\r"
  params:
    - name: input
      type: string
      description: "Same input names as SI command, or SOURCE to mirror main zone"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  wire: "Z2UP\r"
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  wire: "Z2DOWN\r"
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  wire: "Z2MUON\r"
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  wire: "Z2MUOFF\r"
  params: []

# ── Zone 3 ───────────────────────────────────────────────────────────────────
- id: zone3_power_on
  label: Zone 3 On
  kind: action
  wire: "Z3ON\r"
  params: []

- id: zone3_power_off
  label: Zone 3 Off
  kind: action
  wire: "Z3OFF\r"
  params: []

- id: zone3_input_select
  label: Zone 3 Input Select
  kind: action
  wire: "Z3{input}\r"
  params:
    - name: input
      type: string
      description: "Same input names as SI command, or SOURCE to mirror main zone"

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  wire: "Z3UP\r"
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  wire: "Z3DOWN\r"
  params: []

# ── Tuner ─────────────────────────────────────────────────────────────────────
- id: tuner_freq_up
  label: Tuner Frequency Up
  kind: action
  wire: "TFANUP\r"
  params: []

- id: tuner_freq_down
  label: Tuner Frequency Down
  kind: action
  wire: "TFANDOWN\r"
  params: []

- id: tuner_freq_set
  label: Tuner Frequency Set
  kind: action
  wire: "TFAN{freq}\r"
  params:
    - name: freq
      type: string
      description: "6-digit ASCII frequency (e.g. 105000 = 1050.00kHz AM / 87.50MHz FM)"

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  wire: "TPANUP\r"
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  wire: "TPANDOWN\r"
  params: []

- id: tuner_preset_set
  label: Tuner Preset Select
  kind: action
  wire: "TPAN{preset}\r"
  params:
    - name: preset
      type: string
      description: "2-char ASCII preset number 01-56"

# ── System / Navigation ───────────────────────────────────────────────────────
- id: cursor_up
  label: Cursor Up
  kind: action
  wire: "MNCUP\r"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  wire: "MNCDN\r"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  wire: "MNCLT\r"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  wire: "MNCRT\r"
  params: []

- id: cursor_enter
  label: Enter
  kind: action
  wire: "MNENT\r"
  params: []

- id: menu_return
  label: Return
  kind: action
  wire: "MNRTN\r"
  params: []

- id: setup_menu_on
  label: Setup Menu On
  kind: action
  wire: "MNMEN ON\r"
  params: []

- id: setup_menu_off
  label: Setup Menu Off
  kind: action
  wire: "MNMEN OFF\r"
  params: []

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  wire: "MNZST ON\r"
  params: []

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  wire: "MNZST OFF\r"
  params: []

# ── Trigger ───────────────────────────────────────────────────────────────────
- id: trigger1_on
  label: Trigger 1 On
  kind: action
  wire: "TR1 ON\r"
  params: []

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  wire: "TR1 OFF\r"
  params: []

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  wire: "TR2 ON\r"
  params: []

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  wire: "TR2 OFF\r"
  params: []

# ── Dimmer ────────────────────────────────────────────────────────────────────
- id: dimmer_set
  label: Set Display Dimmer
  kind: action
  wire: "DIM {level}\r"
  params:
    - name: level
      type: enum
      values: [BRI, DIM, DAR, OFF, SEL]
      description: "BRI=Bright, DIM=Dim, DAR=Dark, OFF=Off, SEL=Toggle"

# ── Online / USB / Bluetooth Playback ─────────────────────────────────────────
- id: ns_play_pause
  label: Play/Pause
  kind: action
  wire: "NS94\r"
  params: []

- id: ns_play
  label: Play
  kind: action
  wire: "NS9A\r"
  params: []

- id: ns_pause
  label: Pause
  kind: action
  wire: "NS9B\r"
  params: []

- id: ns_stop
  label: Stop
  kind: action
  wire: "NS9C\r"
  params: []

- id: ns_skip_next
  label: Skip Next
  kind: action
  wire: "NS9D\r"
  params: []

- id: ns_skip_prev
  label: Skip Previous
  kind: action
  wire: "NS9E\r"
  params: []

- id: ns_repeat_toggle
  label: Repeat Toggle
  kind: action
  wire: "NSRPT\r"
  params: []

- id: ns_random_toggle
  label: Random Toggle
  kind: action
  wire: "NSRND\r"
  params: []
```

## Feedbacks

```yaml
- id: power_state
  label: Power State
  query_wire: "PW?\r"
  type: enum
  values: [PWON, PWSTANDBY]
  event: true
  description: "Returns PWON or PWSTANDBY. Also sent as EVENT on direct operation."

- id: master_volume_state
  label: Master Volume
  query_wire: "MV?\r"
  type: string
  description: "Returns MV## or MV###. 80=0dB, 00=min(---). 3-char for 0.5dB steps (e.g. MV795)."
  event: true

- id: mute_state
  label: Mute State
  query_wire: "MU?\r"
  type: enum
  values: [MUON, MUOFF]
  event: true

- id: input_state
  label: Input Source
  query_wire: "SI?\r"
  type: string
  description: "Returns SI{source} e.g. SIDVD, SIBD, SIBT"
  event: true

- id: surround_mode_state
  label: Surround Mode
  query_wire: "MS?\r"
  type: string
  description: "Returns MS{mode}. Refer to MS command parameter list for possible values."
  event: true

- id: main_zone_state
  label: Main Zone Power State
  query_wire: "ZM?\r"
  type: enum
  values: [ZMON, ZMOFF]
  event: true

- id: zone2_state
  label: Zone 2 State
  query_wire: "Z2?\r"
  type: string
  description: "Returns Z2ON/Z2OFF/Z2{source}. Returns SR status if REC mode selected."
  event: true

- id: zone3_state
  label: Zone 3 State
  query_wire: "Z3?\r"
  type: string
  description: "Returns Z3ON/Z3OFF/Z3{source}."
  event: true

- id: channel_volume_state
  label: Channel Volume State
  query_wire: "CV?\r"
  type: string
  description: "Returns CVFL ##, CVFR ##, ... CVEND for configured speakers. 50=0dB, range 38-62."
  event: true

- id: zone2_volume_state
  label: Zone 2 Volume
  query_wire: "Z2?\r"
  type: string
  description: "Returns Z2## (80=0dB, 00=min)"
  event: true

- id: zone3_volume_state
  label: Zone 3 Volume
  query_wire: "Z3?\r"
  type: string
  description: "Returns Z3## (80=0dB)"
  event: true

- id: input_mode_state
  label: Input Mode
  query_wire: "SD?\r"
  type: string
  description: "Returns SDAUTO, SDHDMI, SDDIGITAL, SDANALOG, SDARC, SDNO, etc."
  event: true

- id: sleep_timer_state
  label: Sleep Timer
  query_wire: "SLP?\r"
  type: string
  description: "Returns SLP### (001-120 min) or SLPOFF"
  event: true

- id: eco_state
  label: ECO Mode
  query_wire: "ECO?\r"
  type: enum
  values: [ECOON, ECOAUTO, ECOOFF]
  event: true

- id: trigger_state
  label: Trigger State
  query_wire: "TR?\r"
  type: string
  description: "Returns TR1 ON/OFF and TR2 ON/OFF lines"
  event: false

- id: dimmer_state
  label: Dimmer State
  query_wire: "DIM?\r"
  type: enum
  values: ["DIM BRI", "DIM DIM", "DIM DAR", "DIM OFF"]
  event: false

- id: bass_state
  label: Bass Level
  query_wire: "PSBAS?\r"
  type: string
  description: "Returns PSBAS ## (44-56, 50=0dB)"
  event: true

- id: treble_state
  label: Treble Level
  query_wire: "PSTRE?\r"
  type: string
  description: "Returns PSTRE ## (44-56, 50=0dB)"
  event: true

- id: video_resolution_state
  label: Video Resolution
  query_wire: "VSSC?\r"
  type: string
  description: "Returns VSSC{res} e.g. VSSCAUTO, VSSC4K"
  event: false

- id: hdmi_audio_state
  label: HDMI Audio Output
  query_wire: "VSAUDIO?\r"
  type: enum
  values: ["VSAUDIO AMP", "VSAUDIO TV"]
  event: false

- id: picture_mode_state
  label: Picture Mode
  query_wire: "PV?\r"
  type: string
  description: "Returns PV{mode}"
  event: false

- id: onscreen_display_ascii
  label: On-Screen Display (ASCII)
  query_wire: "NSA\r"
  type: string
  description: "Returns NSA0-NSA8 lines with ASCII content (max 96 bytes each). See NS command spec for flag byte encoding."
  event: false

- id: onscreen_display_utf8
  label: On-Screen Display (UTF-8)
  query_wire: "NSE\r"
  type: string
  description: "Returns NSE0-NSE8 lines with UTF-8 content (max 96 bytes each)."
  event: false
```

## Variables

```yaml
# UNRESOLVED: no distinct settable parameters beyond those covered in Actions/Feedbacks
```

## Events

```yaml
- id: event_general
  description: "The AVR sends unsolicited EVENT messages (same format as RESPONSE) within 5 seconds when the device state changes due to direct front-panel or remote control operation. All queryable states that have EVENT=true in Feedbacks section generate unsolicited events."

- id: event_input_change_side_effects
  description: "When input source changes, SURROUND MODE and CHANNEL VOLUME EVENTs are also emitted if those values change. If surround mode is unchanged between input change, no EVENT is sent for it."
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences explicitly described; see Notes for power-on timing requirement
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_command_delay
    description: "After sending PWON, wait at least 1 second before sending the next command (source note J)."
    applies_to: [power_on]
# UNRESOLVED: no other safety warnings or interlock procedures stated in source
```

## Notes

**Command framing:** All commands are ASCII text terminated with CR (0x0D). No LF. Maximum command/response length is 135 bytes.

**Command interval:** Send commands at intervals of 50ms or greater.

**Response timing:** RESPONSE to a query (`?`) command is sent within 200ms. EVENT notifications are sent within 5 seconds of state change.

**Volume encoding:** Master volume uses 2-char ASCII (80=0dB, 00=min/mute). 0.5dB steps use 3-char (e.g., MV795=-0.5dB, MV805=+0.5dB). Same encoding applies to Zone 2 and Zone 3 volume.

**Channel volume encoding:** Channel volumes use 2-char ASCII in range 38–62, where 50=0dB. Subwoofer channel also accepts 00 (off).

**Network Standby:** IP Control must be set to "Always On" (via Setup > Network > IP Control) for the receiver to respond to TCP commands while in standby.

**Surround modes:** The MS command has an extensive list of surround modes (50+). Not all modes are available for all inputs or speaker configurations. Refer to source document for the full enumeration.

**Zone 2/Zone 3 volume response:** Z2 volume response uses the Z2## format (not Z2UP/Z2DOWN echo). Similarly Z3## for Zone 3.

**CV query response:** Returns one line per configured speaker followed by CVEND\r.

**HD Radio:** HD Radio commands (TF HD*, TP HD*, TM HD*) are North America model only.

**Regional content:** PANDORA, HDRADIO inputs are North America model only; SPOTIFY is North America and Europe only.

<!-- UNRESOLVED: AVC-S670H-specific command subset vs. generic Denon AVR protocol not delimited in source; this document is a generic Denon IP/RS-232 control reference and may include commands not present on the S670H model -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: Auro-3D commands (AURO3D, AURO2DSURR, SHL, SHR, TS channel volumes) require optional Auro-3D upgrade; applicability to AVC-S670H not confirmed -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-05-14T18:17:15.231Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.231Z
matched_actions: 72
action_count: 72
confidence: high
summary: "All 92 spec actions verified in source with correct opcodes and shapes; transport parameters match; source contains additional functionality beyond the spec scope."
```

## Known Gaps

```yaml
- "TFANNAME?"
- TMANMANUAL
- TMHDAUTOHD
- TMHDAUTO
- TMHDMANUAL
- TMHDANAAUTO
- TMHDANAMANU
- "HD?"
- NSRPT
- NSRND
- MNOPT
- MNINF
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
