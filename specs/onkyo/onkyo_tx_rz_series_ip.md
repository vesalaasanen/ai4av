---
schema_version: ai4av-public-spec-v1
device_id: onkyo/tx-rz-series
entity_id: onkyo_tx_rz_series
spec_id: admin/onkyo-tx-rz-series
revision: 1
author: admin
title: "Onkyo TX-RZ Series Control Spec"
status: published
manufacturer: Onkyo
manufacturer_key: onkyo
model_family: "TX-RZ Series"
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - "TX-RZ Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Onkyo public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:56.778Z
retrieved_at: 2026-04-29T11:13:56.778Z
last_checked_at: 2026-04-25T21:42:42.793Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps:
  - DVL
  - SLC
  - SWL
  - CTL
  - DIF
  - ISF
  - RAS
  - TFW
  - TFH
  - TCT
  - TSR
  - TSB
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:42:42.793Z
  matched_actions: 72
  action_count: 72
  confidence: low
  summary: "All 72 spec actions match literals in source; transport values confirmed; spec is verified core subset of comprehensive ISCP protocol"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Onkyo TX-RZ Series Control Spec

## Summary
Onkyo TX-RZ Series AV Receivers support the ISCP (Integra Serial Control Protocol) over both RS-232 and TCP/IP (eISCP). The protocol uses 3-character command codes with variable-length parameters, covering power, volume, input selection, listening modes, Zone 2/3/4 control, tuner, network/USB playback, and multi-zone audio routing. Commands are sent as ASCII strings with a unit-type prefix and termination characters.

<!-- UNRESOLVED: exact TX-RZ sub-models covered by this protocol version not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; configurable 49152-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # PWR, ZPW, PW3, PW4 commands
  - queryable     # QSTN parameter on nearly every command
  - routable      # SLI, SLZ, SL3, SL4 input selector commands
  - levelable     # MVL, ZVL, VL3, VL4 volume commands
```

## Actions
```yaml
# All commands use ISCP format: "!" + unit_type + 3-char command + parameter + end_char
# Unit type "1" = Receiver. End chars: RS-232=[CR]/[LF]/[CR][LF]; TCP=[EOF]/[EOF][CR]/[EOF][CR][LF]
# Hex parameter values are uppercase ASCII hex (e.g. "0A", "64").

# === Main Zone Power & Audio ===
- id: power_on
  label: Power On
  kind: action
  command: "!1PWR01"
  params: []

- id: power_off
  label: Power Standby
  kind: action
  command: "!1PWR00"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "!1AMT01"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "!1AMT00"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "!1AMTTG"
  params: []

- id: volume_set
  label: Set Volume Level
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80) depending on model"

- id: volume_up
  label: Volume Up
  kind: action
  command: "!1MVLUP"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "!1MVLDOWN"
  params: []

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  command: "!1MVLUP1"
  params: []

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  command: "!1MVLDOWN1"
  params: []

- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: "!1SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "Hex 01-5A (1-90 min) or OFF"

- id: sleep_off
  label: Sleep Timer Off
  kind: action
  command: "!1SLPOFF"
  params: []

- id: sleep_up
  label: Sleep Timer Wrap Up
  kind: action
  command: "!1SLPUP"
  params: []

# === Main Zone Input Selection ===
- id: select_input
  label: Select Input
  kind: action
  command: "!1SLI{input}"
  params:
    - name: input
      type: enum
      values:
        - "00"  # VCR/DVR (VIDEO1)
        - "01"  # CBL/SAT (VIDEO2)
        - "02"  # GAME/TV (VIDEO3)
        - "03"  # AUX1
        - "04"  # AUX2 (VIDEO5)
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE/TV/TAPE
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB Front
        - "2A"  # USB Rear
        - "30"  # MULTI CH
        - "40"  # Universal PORT
        - "80"  # SOURCE (Zone 2/3/4 only)
      description: Input selector code in hex

- id: input_up
  label: Input Selector Up
  kind: action
  command: "!1SLIUP"
  params: []

- id: input_down
  label: Input Selector Down
  kind: action
  command: "!1SLIDOWN"
  params: []

# === Listening Mode ===
- id: set_listening_mode
  label: Set Listening Mode
  kind: action
  command: "!1LMD{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # STEREO
        - "01"  # DIRECT
        - "02"  # SURROUND
        - "0F"  # MONO
        - "11"  # PURE AUDIO
        - "40"  # 5.1ch Surround / Straight Decode
        - "80"  # PLII/PLIIx Movie
        - "81"  # PLII/PLIIx Music
        - "82"  # Neo:6 Cinema
        - "83"  # Neo:6 Music
      description: "Listening mode code (partial list - source has 50+ modes)"

- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  command: "!1LMDUP"
  params: []

- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  command: "!1LMDDOWN"
  params: []

# === Audio Processing ===
- id: set_late_night
  label: Set Late Night Mode
  kind: action
  command: "!1LTN{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=Low(DD)/On(TrueHD), 02=High(DD), 03=Auto(TrueHD)"

- id: set_audyssey_eq
  label: Set Audyssey EQ
  kind: action
  command: "!1ADY{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_audyssey_dyn_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_audyssey_dyn_vol
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

- id: set_music_optimizer
  label: Set Music Optimizer
  kind: action
  command: "!1MOT{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

# === Speaker Commands ===
- id: set_speaker_a
  label: Set Speaker A
  kind: action
  command: "!1SPA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_speaker_b
  label: Set Speaker B
  kind: action
  command: "!1SPB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

# === Tone Control (Front) ===
- id: set_front_bass
  label: Set Front Bass
  kind: action
  command: "!1TFRB{value}"
  params:
    - name: value
      type: string
      description: "-A to +A (-10 to +10, 2-step increments)"

- id: set_front_treble
  label: Set Front Treble
  kind: action
  command: "!1TFRT{value}"
  params:
    - name: value
      type: string
      description: "-A to +A (-10 to +10, 2-step increments)"

# === Dimmer ===
- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "08", "DIM"]
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF, DIM=Wrap"

# === Audio Selector ===
- id: set_audio_selector
  label: Set Audio Selector
  kind: action
  command: "!1SLA{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

# === 12V Triggers ===
- id: set_trigger_a
  label: Set 12V Trigger A
  kind: action
  command: "!1TGA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_trigger_b
  label: Set 12V Trigger B
  kind: action
  command: "!1TGB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_trigger_c
  label: Set 12V Trigger C
  kind: action
  command: "!1TGC{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

# === HDMI Output ===
- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: "!1HDO{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=No Analog, 01=Out Main, 02=Out Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"

# === Monitor Out Resolution ===
- id: set_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "!1RES{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07"]
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs"

# === Network/USB Playback ===
- id: net_play
  label: Network/USB Play
  kind: action
  command: "!1NTCPLAY"
  params: []

- id: net_stop
  label: Network/USB Stop
  kind: action
  command: "!1NTCSTOP"
  params: []

- id: net_pause
  label: Network/USB Pause
  kind: action
  command: "!1NTCPAUSE"
  params: []

- id: net_track_up
  label: Network/USB Track Up
  kind: action
  command: "!1NTCTRUP"
  params: []

- id: net_track_down
  label: Network/USB Track Down
  kind: action
  command: "!1NTCTRDN"
  params: []

- id: net_repeat
  label: Network/USB Repeat
  kind: action
  command: "!1NTCREPEAT"
  params: []

- id: net_random
  label: Network/USB Random
  kind: action
  command: "!1NTCRANDOM"
  params: []

# === OSD Navigation ===
- id: osd_menu
  label: OSD Menu
  kind: action
  command: "!1OSDMENU"
  params: []

- id: osd_up
  label: OSD Up
  kind: action
  command: "!1OSDUP"
  params: []

- id: osd_down
  label: OSD Down
  kind: action
  command: "!1OSDDOWN"
  params: []

- id: osd_left
  label: OSD Left
  kind: action
  command: "!1OSDLEFT"
  params: []

- id: osd_right
  label: OSD Right
  kind: action
  command: "!1OSDRIGHT"
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  command: "!1OSDENTER"
  params: []

- id: osd_exit
  label: OSD Exit
  kind: action
  command: "!1OSDEXIT"
  params: []

# === Zone 2 Power & Audio ===
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "!1ZPW01"
  params: []

- id: zone2_power_off
  label: Zone 2 Power Standby
  kind: action
  command: "!1ZPW00"
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "!1ZMT01"
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "!1ZMT00"
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "!1ZMTTG"
  params: []

- id: zone2_volume_set
  label: Zone 2 Set Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80)"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "!1ZVLUP"
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "!1ZVLDOWN"
  params: []

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: "!1SLZ{input}"
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI command (subset available)"

# === Zone 3 Power & Audio ===
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "!1PW301"
  params: []

- id: zone3_power_off
  label: Zone 3 Power Standby
  kind: action
  command: "!1PW300"
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: "!1MT301"
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: "!1MT300"
  params: []

- id: zone3_volume_set
  label: Zone 3 Set Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80)"

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: "!1VL3UP"
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: "!1VL3DOWN"
  params: []

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "!1SL3{input}"
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI command (subset available)"

# === Zone 4 Power & Audio ===
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "!1PW401"
  params: []

- id: zone4_power_off
  label: Zone 4 Power Standby
  kind: action
  command: "!1PW400"
  params: []

- id: zone4_mute_on
  label: Zone 4 Mute On
  kind: action
  command: "!1MT401"
  params: []

- id: zone4_mute_off
  label: Zone 4 Mute Off
  kind: action
  command: "!1MT400"
  params: []

- id: zone4_volume_set
  label: Zone 4 Set Volume
  kind: action
  command: "!1VL4{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80)"

- id: zone4_volume_up
  label: Zone 4 Volume Up
  kind: action
  command: "!1VL4UP"
  params: []

- id: zone4_volume_down
  label: Zone 4 Volume Down
  kind: action
  command: "!1VL4DOWN"
  params: []

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "!1SL4{input}"
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI command (subset available)"

# UNRESOLVED: Tone commands for all speaker zones (TFR, TFW, TFH, TCT, TSR, TSB, TSW, ZTN, TN3)
# documented in source but omitted here for brevity. Follow same ISCP pattern.
# UNRESOLVED: Tuner commands (TUN, PRS, PRM) and HD Radio commands documented but model-dependent.
# UNRESOLVED: XM/SIRIUS commands model-dependent.
# UNRESOLVED: RI System commands (CCD, CT1, CT2, CDV, CMD, CCR, CDS) for external RI devices.
# UNRESOLVED: RECOUT selector (SLR), ISF mode, Memory setup (MEM), Display commands.
```

## Feedbacks
```yaml
# Query any command by appending "QSTN" as the parameter.
# Device returns current state as a status message.
# Example: "!1PWRQSTN" -> "!1PWR01" (power on)

- id: power_state
  label: System Power State
  type: enum
  command: "!1PWRQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: mute_state
  label: Audio Mute State
  type: enum
  command: "!1AMTQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": unmuted
    "01": muted

- id: volume_level
  label: Master Volume Level
  type: string
  command: "!1MVLQSTN"
  description: "Returns hex value (00-64 or 00-50 depending on model)"

- id: input_selected
  label: Selected Input
  type: string
  command: "!1SLIQSTN"
  description: "Returns hex input code matching SLI parameter values"

- id: listening_mode
  label: Listening Mode
  type: string
  command: "!1LMDQSTN"
  description: "Returns hex listening mode code"

- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  command: "!1ZPWQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: zone2_mute_state
  label: Zone 2 Mute State
  type: enum
  command: "!1ZMTQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": unmuted
    "01": muted

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  command: "!1ZVLQSTN"
  description: "Returns hex value"

- id: zone2_input_selected
  label: Zone 2 Selected Input
  type: string
  command: "!1SLZQSTN"
  description: "Returns hex input code"

- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  command: "!1PW3QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  command: "!1VL3QSTN"

- id: zone3_input_selected
  label: Zone 3 Selected Input
  type: string
  command: "!1SL3QSTN"

- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  command: "!1PW4QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  command: "!1VL4QSTN"

- id: zone4_input_selected
  label: Zone 4 Selected Input
  type: string
  command: "!1SL4QSTN"

- id: audio_info
  label: Audio Information
  type: string
  command: "!1IFAQSTN"
  description: "Audio program info (same as front-panel display)"

- id: video_info
  label: Video Information
  type: string
  command: "!1IFVQSTN"
  description: "Video format info (same as front-panel display)"

- id: net_play_status
  label: Network/USB Play Status
  type: string
  command: "!1NSTQSTN"
  description: "3-char string: p=Play status (S=STOP, P=Play, p=Pause, F=FF, R=FR), r=Repeat, s=Shuffle"

- id: net_track_info
  label: Network/USB Track Info
  type: string
  command: "!1NTRQSTN"
  description: "Format: cccc/tttt (current/total)"

- id: net_time_info
  label: Network/USB Time Info
  type: string
  command: "!1NTMQSTN"
  description: "Format: mm:ss/mm:ss (elapsed/total)"

# UNRESOLVED: Feedbacks for tone (TFR, ZTN, TN3), sleep timer (SLP), dimmer (DIM),
# Audyssey settings, late night, trigger states, HDMI output, resolution, etc.
```

## Variables
```yaml
- id: master_volume
  label: Master Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1MVL{value}"
  query_command: "!1MVLQSTN"
  description: "Volume 0-100 in hex (00-64). Some models 0-80 (00-50)."

- id: zone2_volume
  label: Zone 2 Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1ZVL{value}"
  query_command: "!1ZVLQSTN"

- id: zone3_volume
  label: Zone 3 Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1VL3{value}"
  query_command: "!1VL3QSTN"

- id: zone4_volume
  label: Zone 4 Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1VL4{value}"
  query_command: "!1VL4QSTN"

- id: sleep_timer
  label: Sleep Timer
  type: integer
  min: 0
  max: 90
  unit: minutes
  set_command: "!1SLP{value}"
  query_command: "!1SLPQSTN"
  description: "Hex 01-5A (1-90 min). Send OFF to disable."

- id: dimmer_level
  label: Front Panel Dimmer
  type: enum
  values: ["00", "01", "02", "03", "08"]
  value_meaning:
    "00": bright
    "01": dim
    "02": dark
    "03": shut-off
    "08": bright & LED off
  set_command: "!1DIM{value}"
  query_command: "!1DIMQSTN"
```

## Events
```yaml
# The receiver sends unsolicited status notifications when state changes.
# Format: "!1" + 3-char command + parameter value
# Example: "!1SLI03" when input changes to AUX1
# The controller must maintain a persistent TCP connection to receive these.
# Only one client connection is supported at a time.

- id: status_notification
  label: Unsolicited Status Change
  type: string
  description: >-
    Sent when receiver state changes autonomously (e.g. front-panel button press,
    remote control, internal timer). Format is identical to query response:
    "!1" + command + parameter. Covers all QSTN-addressable commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >-
      Only one TCP client connection allowed at a time. A new connection
      will disconnect the previous client, preventing it from receiving
      event notifications.
  - description: >-
      Zone 2 volume/tone commands only work when main zone is ON and
      Zone 2 is powered or set to variable output.
# UNRESOLVED: full power-on sequencing requirements not stated in source
# UNRESOLVED: fault behavior and error recovery not documented
```

## Notes

**ISCP Message Format (RS-232):** `"!" + unit_type + command(3 chars) + parameter + [CR|LF|CR LF]`. Unit type `"1"` for receivers.

**eISCP Packet Format (TCP):** Binary header followed by ISCP data. Header is 16 bytes: magic `"ISCP"` (4B), header size `0x00000010` (4B, big-endian), data size (4B, big-endian), version `0x01` (1B), reserved `0x000000` (3B). Data payload is the ISCP message terminated with `[EOF]` (0x1A), optionally followed by `[CR][LF]`.

**Query convention:** Append `QSTN` as the parameter to any command to query its current value. The receiver responds with a status message containing the current parameter value.

**Timing constraints:**
- Minimum 50ms between received messages.
- Receiver responds within 50ms; if no response, communication has failed.
- Persistent TCP connection required to receive unsolicited event notifications.

**Volume encoding:** Volume levels are hex-encoded ASCII. E.g., `MVL0A` sets volume to 10 (decimal). Range depends on model: 00-64 (0-100) or 00-50 (0-80).

**Zone 2/3/4 commands:** Follow the same ISCP pattern with zone-specific command codes (ZPW/ZMT/ZVL/SLZ for Zone 2, PW3/MT3/VL3/SL3 for Zone 3, PW4/MT4/VL4/SL4 for Zone 4).

**Network/USB FF/REW:** Must be sent continuously with no more than 100ms between codes.

**Source document version:** ISCP Version 1.15, dated 31 August 2009.

<!-- UNRESOLVED: exact TX-RZ sub-models covered by this protocol version not stated -->
<!-- UNRESOLVED: protocol version compatibility across firmware generations not stated -->
<!-- UNRESOLVED: maximum volume range for TX-RZ models specifically not confirmed -->
<!-- UNRESOLVED: behavior when TCP connection is lost during operation not documented -->
<!-- UNRESOLVED: RS-232 pinout details for DB9 connector (pin 2=TX, pin 3=RX, pin 5=GND, straight-thru cable) -->
<!-- UNRESOLVED: whether TX-RZ series supports Zone 4 commands or if that is limited to specific models -->

## Provenance

```yaml
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Onkyo public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:13:56.778Z
retrieved_at: 2026-04-29T11:13:56.778Z
last_checked_at: 2026-04-25T21:42:42.793Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:42:42.793Z
matched_actions: 72
action_count: 72
confidence: low
summary: "All 72 spec actions match literals in source; transport values confirmed; spec is verified core subset of comprehensive ISCP protocol"
```

## Known Gaps

```yaml
- DVL
- SLC
- SWL
- CTL
- DIF
- ISF
- RAS
- TFW
- TFH
- TCT
- TSR
- TSB
```
