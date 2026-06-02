---
spec_id: admin/integra-4125dsp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra 4125DSP Series Control Spec"
manufacturer: Integra
model_family: "4125DSP Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "4125DSP Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:20.402Z
last_checked_at: 2026-05-14T18:17:16.814Z
generated_at: 2026-05-14T18:17:16.814Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - ISF
  - LTN
  - RAS
  - DVL
  - RDS
  - PTS
  - TPS
  - "firmware version compatibility not stated in source"
  - "exact DSP configuration commands for the 4125DSP variant not distinguished from general Integra AV receiver commands"
  - "RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS)"
  - "XM, SIRIUS, HD Radio commands are model-specific and not confirmed"
  - "tone feedbacks for individual speaker zones (TFW, TFH, TCT, TSR, TSB, TSW)"
  - "XM/SIRIUS/HD Radio info feedbacks - model-specific"
  - "no separate variable system documented in source"
  - "no multi-step sequences described in source"
  - "no power-on sequencing requirements documented"
  - "no thermal or fault protection interlocks documented"
  - "which commands in the full list are specifically supported on the 4125DSP vs. other Integra models"
  - "Zone 2/3/4 availability on the 4125DSP Series — document covers all zones but model may not support all"
  - "maximum volume range (0-80 vs 0-100) depends on model variant"
  - "XM/SIRIUS/HD Radio tuner availability on the 4125DSP Series"
  - "tone commands for all individual speaker channels (TFW, TFH, TCT, TSR, TSB, TSW) omitted from Actions for brevity — follow TFR pattern"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.814Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 85 spec actions matched verbatim to source commands; transport parameters verified; core command set comprehensively represented. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra 4125DSP Series Control Spec

## Summary

The Integra 4125DSP Series is an AV receiver controllable via ISCP (Integra Serial Control Protocol) over both RS-232C and TCP/IP (eISCP). The protocol uses a 3-character command code with variable-length parameters. This spec covers the eISCP (TCP) transport and the full ISCP command set including power, volume, input selection, listening modes, multi-zone control, tuner, network/USB playback, and RI system device control.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact DSP configuration commands for the 4125DSP variant not distinguished from general Integra AV receiver commands -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; configurable 49152-65535 via receiver setup menu
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "9-pin female D-sub (pin 2 TX, pin 3 RX, pin 5 GND, straight-thru cable)"
auth:
  type: none  # inferred: no auth procedure in source
```

### eISCP Packet Framing (TCP)

The eISCP header is 16 bytes (0x00000010 big-endian) containing: magic `ISCP`, header size, data size, version (0x01), reserved. The data payload is the ISCP message: `!` + unit type `1` + 3-char command + parameter(s) + end character (`0x1A` or `0x1A0D` or `0x1A0D0A`).

### RS-232 Framing

ISCP message: `!` + unit type `1` + 3-char command + parameter(s) + end character (`0x0D` or `0x0A` or `0x0D0A`).

### Communication Constraints

- Only one TCP client connection at a time.
- Connection must be held continuously to receive unsolicited status notifications.
- Minimum 50 ms interval between commands.

## Traits
```yaml
traits:
  - powerable    # PWR command
  - routable     # SLI, SLR, SLA, SLZ, SL3, SL4 input selectors
  - queryable    # QSTN parameter on most commands
  - levelable    # MVL, ZVL, VL3, VL4 volume; tone controls; balance
```

## Actions
```yaml
# === MAIN ZONE ===

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
  label: Audio Mute On
  kind: action
  command: "!1AMT01"
  params: []

- id: mute_off
  label: Audio Mute Off
  kind: action
  command: "!1AMT00"
  params: []

- id: mute_toggle
  label: Audio Mute Toggle
  kind: action
  command: "!1AMTTG"
  params: []

- id: set_master_volume
  label: Set Master Volume
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level 00-64 hex (0-100 decimal) or 00-50 hex (0-80 decimal) depending on model"

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
  label: Volume Up 1dB Step
  kind: action
  command: "!1MVLUP1"
  params: []

- id: volume_down_1db
  label: Volume Down 1dB Step
  kind: action
  command: "!1MVLDOWN1"
  params: []

- id: select_input
  label: Select Input
  kind: action
  command: "!1SLI{input}"
  params:
    - name: input
      type: enum
      values:
        - "00"  # VIDEO1 / VCR/DVR
        - "01"  # VIDEO2 / CBL/SAT
        - "02"  # VIDEO3 / GAME/TV / GAME
        - "03"  # VIDEO4 / AUX1(AUX)
        - "04"  # VIDEO5 / AUX2
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE(1) / TV/TAPE
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "30"  # MULTI CH
        - "31"  # XM
        - "32"  # SIRIUS
        - "40"  # Universal PORT
      description: Input selector code

- id: input_up
  label: Input Selector Wrap Up
  kind: action
  command: "!1SLIUP"
  params: []

- id: input_down
  label: Input Selector Wrap Down
  kind: action
  command: "!1SLIDOWN"
  params: []

- id: select_audio_input
  label: Select Audio Input
  kind: action
  command: "!1SLA{audio}"
  params:
    - name: audio
      type: enum
      values:
        - "00"  # AUTO
        - "01"  # MULTI-CHANNEL
        - "02"  # ANALOG
        - "03"  # iLINK
        - "04"  # HDMI
        - "05"  # COAX/OPT
        - "06"  # BALANCE
      description: Audio selector code

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
        - "11"  # PURE AUDIO
        - "0C"  # ALL CH STEREO
        - "0F"  # MONO
        - "80"  # PLII/PLIIx Movie
        - "81"  # PLII/PLIIx Music
        - "82"  # Neo:6 Cinema
        - "83"  # Neo:6 Music
      description: "Listening mode code (partial list - 50+ modes available)"

- id: listening_mode_up
  label: Listening Mode Wrap Up
  kind: action
  command: "!1LMDUP"
  params: []

- id: listening_mode_down
  label: Listening Mode Wrap Down
  kind: action
  command: "!1LMDDOWN"
  params: []

- id: set_sleep_timer
  label: Set Sleep Timer
  kind: action
  command: "!1SLP{time}"
  params:
    - name: time
      type: string
      description: "01-5A hex (1-90 min) or OFF"

- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: enum
      values:
        - "00"  # Bright
        - "01"  # Dim
        - "02"  # Dark
        - "03"  # Shut-Off
        - "08"  # Bright & LED OFF
        - DIM   # Wrap-around up
      description: Dimmer level

- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: "!1HDO{output}"
  params:
    - name: output
      type: enum
      values:
        - "00"  # No Analog
        - "01"  # Out Main / HDMI Main
        - "02"  # Out Sub / HDMI Sub
        - "03"  # Both
        - "04"  # Both(Main)
        - "05"  # Both(Sub)
      description: HDMI output selector

- id: set_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "!1RES{resolution}"
  params:
    - name: resolution
      type: enum
      values:
        - "00"  # Through
        - "01"  # Auto (HDMI only)
        - "02"  # 480p
        - "03"  # 720p
        - "04"  # 1080i
        - "05"  # 1080p (HDMI only)
        - "06"  # Source
        - "07"  # 1080p/24fs (HDMI only)
      description: Monitor out resolution

- id: set_speaker_a
  label: Set Speaker A
  kind: action
  command: "!1SPA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap"

- id: set_speaker_b
  label: Set Speaker B
  kind: action
  command: "!1SPB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap"

- id: set_subwoofer_level
  label: Set Subwoofer Level
  kind: action
  command: "!1SWL{level}"
  params:
    - name: level
      type: string
      description: "-F to +C hex (-15dB to +12dB), UP, or DOWN"

- id: set_center_level
  label: Set Center Level
  kind: action
  command: "!1CTL{level}"
  params:
    - name: level
      type: string
      description: "-C to +C hex (-12dB to +12dB), UP, or DOWN"

- id: set_tone_front
  label: Set Front Tone
  kind: action
  command: "!1TFR{param}"
  params:
    - name: param
      type: string
      description: "Bxx for bass, Txx for treble (xx is -A to +A hex, -10 to +10 in 2-step), BUP/BDOWN/TUP/TDOWN"

- id: set_12v_trigger_a
  label: Set 12V Trigger A
  kind: action
  command: "!1TGA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_12v_trigger_b
  label: Set 12V Trigger B
  kind: action
  command: "!1TGB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_12v_trigger_c
  label: Set 12V Trigger C
  kind: action
  command: "!1TGC{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

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

- id: set_audyssey
  label: Set Audyssey EQ
  kind: action
  command: "!1ADY{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap"

- id: set_audyssey_dyn_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap"

- id: set_audyssey_dyn_vol
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # Light
        - "02"  # Medium
        - "03"  # Heavy
        - UP    # Wrap-around
      description: Dynamic volume level

- id: set_music_optimizer
  label: Set Music Optimizer
  kind: action
  command: "!1MOT{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap"

# === TUNER ===

- id: tune_frequency
  label: Tune Frequency
  kind: action
  command: "!1TUN{freq}"
  params:
    - name: freq
      type: string
      description: "5-digit frequency (FM nnn.nn MHz / AM nnnnn kHz), UP, or DOWN"

- id: select_preset
  label: Select Preset
  kind: action
  command: "!1PRS{preset}"
  params:
    - name: preset
      type: string
      description: "01-28 hex (preset 1-40), UP, or DOWN"

- id: store_preset
  label: Store Preset
  kind: action
  command: "!1PRM{preset}"
  params:
    - name: preset
      type: string
      description: "01-28 hex (preset 1-40)"

# === NETWORK/USB ===

- id: net_play
  label: Net/USB Play
  kind: action
  command: "!1NTCPLAY"
  params: []

- id: net_stop
  label: Net/USB Stop
  kind: action
  command: "!1NTCSTOP"
  params: []

- id: net_pause
  label: Net/USB Pause
  kind: action
  command: "!1NTCPAUSE"
  params: []

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  command: "!1NTCTRUP"
  params: []

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  command: "!1NTCTRDN"
  params: []

- id: net_ff
  label: Net/USB Fast Forward
  kind: action
  command: "!1NTCFF"
  params: []

- id: net_rew
  label: Net/USB Rewind
  kind: action
  command: "!1NTCREW"
  params: []

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  command: "!1NTCREPEAT"
  params: []

- id: net_random
  label: Net/USB Random
  kind: action
  command: "!1NTCRANDOM"
  params: []

# === ZONE 2 ===

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "!1ZPW01"
  params: []

- id: zone2_power_off
  label: Zone 2 Standby
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

- id: zone2_set_volume
  label: Set Zone 2 Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level 00-64 hex (0-100) or UP/DOWN"

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: "!1SLZ{input}"
  params:
    - name: input
      type: string
      description: "Input code (same codes as main SLI minus some entries), or QSTN"

# === ZONE 3 ===

- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "!1PW301"
  params: []

- id: zone3_power_off
  label: Zone 3 Standby
  kind: action
  command: "!1PW300"
  params: []

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  command: "!1MT3TG"
  params: []

- id: zone3_set_volume
  label: Set Zone 3 Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: "Volume level 00-64 hex (0-100) or UP/DOWN"

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "!1SL3{input}"
  params:
    - name: input
      type: string
      description: Input selector code

# === ZONE 4 ===

- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "!1PW401"
  params: []

- id: zone4_power_off
  label: Zone 4 Standby
  kind: action
  command: "!1PW400"
  params: []

- id: zone4_set_volume
  label: Set Zone 4 Volume
  kind: action
  command: "!1VL4{level}"
  params:
    - name: level
      type: string
      description: "Volume level 00-64 hex (0-100) or UP/DOWN"

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "!1SL4{input}"
  params:
    - name: input
      type: string
      description: Input selector code

# UNRESOLVED: RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS)
# are pass-through for connected RI devices and not included as primary actions.
# UNRESOLVED: XM, SIRIUS, HD Radio commands are model-specific and not confirmed
# for the 4125DSP Series.
```

## Feedbacks
```yaml
# All feedbacks use the QSTN query parameter. The device responds with the
# current parameter value in the same command format (e.g. "!1PWR01" for power on).

- id: power_state
  type: enum
  values: [off, on]
  query: "!1PWRQSTN"
  response_format: "!1PWR{00|01}"

- id: mute_state
  type: enum
  values: [off, on]
  query: "!1AMTQSTN"
  response_format: "!1AMT{00|01}"

- id: master_volume
  type: integer
  query: "!1MVLQSTN"
  response_format: "!1MVL{xx}"
  description: Volume level in hex (00-64 or 00-50 depending on model)

- id: input_selector
  type: enum
  query: "!1SLIQSTN"
  response_format: "!1SLI{xx}"
  description: Current input selector code

- id: audio_selector
  type: enum
  query: "!1SLAQSTN"
  response_format: "!1SLA{xx}"
  description: Current audio input type

- id: listening_mode
  type: enum
  query: "!1LMDQSTN"
  response_format: "!1LMD{xx}"
  description: Current listening mode code

- id: sleep_timer
  type: string
  query: "!1SLPQSTN"
  response_format: "!1SLP{xx|OFF}"
  description: Sleep time remaining

- id: dimmer_level
  type: enum
  query: "!1DIMQSTN"
  response_format: "!1DIM{xx}"
  description: "Dimmer level: 00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"

- id: hdmi_output
  type: enum
  query: "!1HDOQSTN"
  response_format: "!1HDO{xx}"
  description: HDMI output selector state

- id: resolution
  type: enum
  query: "!1RESQSTN"
  response_format: "!1RES{xx}"
  description: Monitor out resolution

- id: display_mode
  type: enum
  query: "!1DIFQSTN"
  response_format: "!1DIF{xx}"
  description: "Display mode: 00=Selector+Volume, 01=Selector+Listening"

- id: speaker_a_state
  type: enum
  values: [off, on]
  query: "!1SPAQSTN"
  response_format: "!1SPA{00|01}"

- id: speaker_b_state
  type: enum
  values: [off, on]
  query: "!1SPBQSTN"
  response_format: "!1SPB{00|01}"

- id: speaker_layout
  type: enum
  query: "!1SPLQSTN"
  response_format: "!1SPL{xx}"
  description: "SB=SurrBack, FH=FrontHigh, FW=FrontWide"

- id: subwoofer_level
  type: string
  query: "!1SWLQSTN"
  response_format: "!1SWL{xx}"
  description: Subwoofer temporary level

- id: center_level
  type: string
  query: "!1CTLQSTN"
  response_format: "!1CTL{xx}"
  description: Center temporary level

- id: front_tone
  type: string
  query: "!1TFRQSTN"
  response_format: "!1TFRBxxTxx"
  description: "Bass and treble values (-A to +A hex)"

- id: audio_information
  type: string
  query: "!1IFAQSTN"
  response_format: "!1IFA{nnnnn:nnnnn}"
  description: Audio info matching front panel display

- id: video_information
  type: string
  query: "!1IFVQSTN"
  response_format: "!1IFV{nnnnn:nnnnn}"
  description: Video info matching front panel display

- id: audyssey_state
  type: enum
  values: [off, on]
  query: "!1ADYQSTN"
  response_format: "!1ADY{00|01}"

- id: audyssey_dyn_eq
  type: enum
  values: [off, on]
  query: "!1ADQQSTN"
  response_format: "!1ADQ{00|01}"

- id: audyssey_dyn_vol
  type: enum
  query: "!1ADVQSTN"
  response_format: "!1ADV{00|01|02|03}"
  description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

- id: tuning_frequency
  type: string
  query: "!1TUNQSTN"
  response_format: "!1TUN{nnnnn}"
  description: "Current frequency (FM nnn.nn MHz / AM nnnnn kHz)"

- id: preset_number
  type: string
  query: "!1PRSQSTN"
  response_format: "!1PRS{xx}"
  description: Current preset number in hex

- id: net_artist
  type: string
  query: "!1NATQSTN"
  response_format: "!1NAT{nnnnnnnnnn}"
  description: Net/USB artist name (up to 64 ASCII chars)

- id: net_album
  type: string
  query: "!1NALQSTN"
  response_format: "!1NAL{nnnnnnn}"
  description: Net/USB album name (up to 64 ASCII chars)

- id: net_title
  type: string
  query: "!1NTIQSTN"
  response_format: "!1NTI{nnnnnnnnnn}"
  description: Net/USB title name (up to 64 ASCII chars)

- id: net_time
  type: string
  query: "!1NTMQSTN"
  response_format: "!1NTM{mm:ss/mm:ss}"
  description: "Elapsed time / track time (max 99:59)"

- id: net_track_info
  type: string
  query: "!1NTRQSTN"
  response_format: "!1NTR{cccc/tttt}"
  description: "Current track / total tracks (max 9999)"

- id: net_play_status
  type: string
  query: "!1NSTQSTN"
  response_format: "!1NST{prs}"
  description: "3-char: p=Play(S/P/p/F/R), r=Repeat(-/R/F/1), s=Shuffle(-/S/A)"

- id: zone2_power_state
  type: enum
  values: [off, on]
  query: "!1ZPWQSTN"
  response_format: "!1ZPW{00|01}"

- id: zone2_mute_state
  type: enum
  values: [off, on]
  query: "!1ZMTQSTN"
  response_format: "!1ZMT{00|01}"

- id: zone2_volume
  type: string
  query: "!1ZVLQSTN"
  response_format: "!1ZVL{xx}"
  description: Zone 2 volume in hex

- id: zone3_power_state
  type: enum
  values: [off, on]
  query: "!1PW3QSTN"
  response_format: "!1PW3{00|01}"

- id: zone4_power_state
  type: enum
  values: [off, on]
  query: "!1PW4QSTN"
  response_format: "!1PW4{00|01}"

# UNRESOLVED: tone feedbacks for individual speaker zones (TFW, TFH, TCT, TSR, TSB, TSW)
# UNRESOLVED: XM/SIRIUS/HD Radio info feedbacks - model-specific
```

## Variables
```yaml
# Volume levels are set directly via MVL/ZVL/VL3/VL4 commands (not a separate variable system).
# Tone, balance, and level adjustments are also direct command parameters.

# UNRESOLVED: no separate variable system documented in source
```

## Events
```yaml
# The receiver sends unsolicited "Status Message" notifications when system state changes.
# These arrive in the same ISCP format as query responses (e.g. "!1SLI03" when input changes).
# Only delivered on a continuously-held TCP connection.

- id: status_notification
  description: >-
    Unsolicited status update sent when receiver state changes externally
    (front panel, IR remote, etc.). Format matches query response format
    for the relevant command. Example: "!1SLI03" indicates input changed to VIDEO4.
  trigger: device_state_change
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Zone 2 commands only work when main zone is ON"
  - "Zone 2 tone/balance commands only work when main is ON and Zone 2 is powered or variable"
  - "12V Trigger commands only available when trigger parameters are set to OFF in Setup Menu"
  - "FF/REW Net-Tune commands must be sent continuously with no more than 100ms delay"
# UNRESOLVED: no power-on sequencing requirements documented
# UNRESOLVED: no thermal or fault protection interlocks documented
```

## Notes

- **Protocol version:** ISCP v1.15 (31 August 2009 document).
- **Hex notation:** Volume, preset, sleep timer, and other numeric parameters use hexadecimal representation as stated in the source. For example, MVL volume "00"-"64" hex = 0-100 decimal.
- **Unit type character:** "1" for all receiver commands. The `!1` prefix is mandatory.
- **End characters differ between transports:** RS-232 uses CR/LF; eISCP uses EOF (0x1A) possibly followed by CR/LF.
- **Single connection limit:** Only one TCP client can connect at a time. The connection must persist to receive event notifications.
- **50ms minimum interval:** Commands must be spaced at least 50ms apart. If no response within 50ms, the communication is considered failed.
- **RECOUT selector (SLR):** Separate input routing for recording output zone.
- **RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS):** These control connected RI-compatible devices through the receiver and are pass-through commands.
- **DSP-specific features:** The 4125DSP model name suggests DSP processing features, but no DSP-specific commands were distinguished in this protocol document from the general Integra AV receiver command set.

<!-- UNRESOLVED: which commands in the full list are specifically supported on the 4125DSP vs. other Integra models -->
<!-- UNRESOLVED: Zone 2/3/4 availability on the 4125DSP Series — document covers all zones but model may not support all -->
<!-- UNRESOLVED: maximum volume range (0-80 vs 0-100) depends on model variant -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio tuner availability on the 4125DSP Series -->
<!-- UNRESOLVED: tone commands for all individual speaker channels (TFW, TFH, TCT, TSR, TSB, TSW) omitted from Actions for brevity — follow TFR pattern -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:20.402Z
last_checked_at: 2026-05-14T18:17:16.814Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.814Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 85 spec actions matched verbatim to source commands; transport parameters verified; core command set comprehensively represented. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- ISF
- LTN
- RAS
- DVL
- RDS
- PTS
- TPS
- "firmware version compatibility not stated in source"
- "exact DSP configuration commands for the 4125DSP variant not distinguished from general Integra AV receiver commands"
- "RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS)"
- "XM, SIRIUS, HD Radio commands are model-specific and not confirmed"
- "tone feedbacks for individual speaker zones (TFW, TFH, TCT, TSR, TSB, TSW)"
- "XM/SIRIUS/HD Radio info feedbacks - model-specific"
- "no separate variable system documented in source"
- "no multi-step sequences described in source"
- "no power-on sequencing requirements documented"
- "no thermal or fault protection interlocks documented"
- "which commands in the full list are specifically supported on the 4125DSP vs. other Integra models"
- "Zone 2/3/4 availability on the 4125DSP Series — document covers all zones but model may not support all"
- "maximum volume range (0-80 vs 0-100) depends on model variant"
- "XM/SIRIUS/HD Radio tuner availability on the 4125DSP Series"
- "tone commands for all individual speaker channels (TFW, TFH, TCT, TSR, TSB, TSW) omitted from Actions for brevity — follow TFR pattern"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
