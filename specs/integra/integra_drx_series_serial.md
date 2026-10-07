---
spec_id: admin/integra-drx-series
schema_version: ai4av-public-spec-v1
revision: 3
title: "Integra DRX Series Control Spec"
manufacturer: Integra
model_family: DRX-2
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DRX-2
    - "DRX-2 MultiZone"
    - "DRX-2.1 MultiZone"
    - "DRX-2.3 MultiZone"
    - "DRX-3.1 MultiZone"
    - DRX-3.2
    - "DRX-3.2 MultiZone"
    - "DRX-3.3 MultiZone"
    - "DRX-4.2 MultiZone"
    - "DRX-4.3 MultiZone"
    - DRX-5
    - "DRX-5.2 MultiZone"
    - "DRX-5.3 MultiZone"
    - "DRX-5.4 MultiZone"
    - DRX-7
    - "DRX-8.4 MultiZone"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-07-14T05:28:20.548Z
last_checked_at: 2026-10-07T11:19:52.939Z
generated_at: 2026-10-07T11:19:52.939Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "volume and tone parameters are discrete actions with inline params."
  - "no explicit multi-step macros described in source."
  - "firmware version compatibility not stated in source"
  - "exact response timeout values beyond the stated 50ms not specified"
  - "maximum cable length for RS-232 not stated"
  - "eISCP connection keepalive/heartbeat mechanism not documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T11:19:52.939Z
  matched_actions: 493
  action_count: 493
  confidence: medium
  summary: "All 493 action units match source command tables and transport values are supported. The source's remaining commands are already represented as spec Feedbacks. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# Integra DRX Series Control Spec

## Summary
Integra DRX Series AV receivers controllable via ISCP (Integra Serial Control Protocol) over RS-232C serial and eISCP over TCP/IP. Commands use a three-character command code plus variable-length parameter. Supports power, volume, muting, tone, input selection, listening modes, speaker configuration, Zone 2/3/4 independent control, tuner operations, network/USB playback, and Onkyo RI system device control.

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: DB9 female (pin 2=TX, pin 3=RX, pin 5=GND, straight-thru cable)
addressing:
  port: 60128
  port_range: [49152, 65535]
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
connection:
  mode: persistent
  max_clients: 1
  min_interval_ms: 50
```

## Traits
```yaml
traits:
  - powerable     # PWR command for power on/off; ZPW/PW3/PW4 for zones
  - queryable     # QSTN suffix on most commands
  - routable      # SLI input selector, SLR recout selector, zone selectors
  - levelable     # MVL master volume, tone controls, zone volumes
```

## Message Framing
```yaml
serial_message:
  format: "!1CCCPE"
  description: |
    Start char "!" + unit type "1" (Receiver) + 3-char command (CCC) +
    variable-length parameter (P) + end char (CR, LF, or CR+LF)
  example_tx: "!1PWR01\r"
  example_rx: "!1SST00\x1A"

eiscp_message:
  header:
    magic: "ISCP"
    header_size: 16
    header_size_encoding: big-endian uint32
    data_size_encoding: big-endian uint32
    version: 1
    reserved: 0x000000
  payload: "!1CCCPE"
  payload_end_chars: ["\x1A", "\x1A\r", "\x1A\r\n"]
```

## Actions
```yaml
# ===== MAIN ZONE - AMPLIFIER COMMANDS =====

- id: power_on
  label: Power On
  kind: action
  command: "PWR01"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "PWR00"
  params: []

- id: mute_on
  label: Audio Mute On
  kind: action
  command: "AMT01"
  params: []

- id: mute_off
  label: Audio Mute Off
  kind: action
  command: "AMT00"
  params: []

- id: mute_toggle
  label: Audio Mute Toggle
  kind: action
  command: "AMTTG"
  params: []

- id: speaker_a_on
  label: Speaker A On
  kind: action
  command: "SPA01"
  params: []

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  command: "SPA00"
  params: []

- id: speaker_a_toggle
  label: Speaker A Toggle
  kind: action
  command: "SPAUP"
  params: []

- id: speaker_b_on
  label: Speaker B On
  kind: action
  command: "SPB01"
  params: []

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  command: "SPB00"
  params: []

- id: speaker_b_toggle
  label: Speaker B Toggle
  kind: action
  command: "SPBUP"
  params: []

- id: set_speaker_layout
  label: Set Speaker Layout
  kind: action
  command: "SPL{param}"
  params:
    - name: layout
      type: enum
      values:
        - id: SB
          label: Surround Back
        - id: FH
          label: Front High
        - id: FW
          label: Front Wide
        - id: UP
          label: Toggle Wrap-Around

- id: set_volume
  label: Set Master Volume
  kind: action
  command: "MVL{param}"
  params:
    - name: level
      type: string
      description: "Volume level 00-64 hex (0-100 decimal) or 00-50 hex (0-80 decimal) depending on model"

- id: volume_up
  label: Volume Up
  kind: action
  command: "MVLUP"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "MVLDOWN"
  params: []

- id: volume_up_1db
  label: Volume Up 1dB Step
  kind: action
  command: "MVLUP1"
  params: []

- id: volume_down_1db
  label: Volume Down 1dB Step
  kind: action
  command: "MVLDOWN1"
  params: []

- id: set_tone_front
  label: Set Front Tone
  kind: action
  command: "TFR{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN/TUP/TDOWN for incremental."

- id: set_tone_front_wide
  label: Set Front Wide Tone
  kind: action
  command: "TFW{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN/TUP/TDOWN for incremental."

- id: set_tone_front_high
  label: Set Front High Tone
  kind: action
  command: "TFH{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN/TUP/TDOWN for incremental."

- id: set_tone_center
  label: Set Center Tone
  kind: action
  command: "TCT{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN/TUP/TDOWN for incremental."

- id: set_tone_surround
  label: Set Surround Tone
  kind: action
  command: "TSR{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN/TUP/TDOWN for incremental."

- id: set_tone_surround_back
  label: Set Surround Back Tone
  kind: action
  command: "TSB{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN/TUP/TDOWN for incremental."

- id: set_tone_subwoofer
  label: Set Subwoofer Tone
  kind: action
  command: "TSW{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN for incremental."

- id: set_sleep
  label: Set Sleep Timer
  kind: action
  command: "SLP{param}"
  params:
    - name: minutes
      type: string
      description: "01-5A hex (1-90 min), OFF to disable, UP to wrap-around"

- id: speaker_level_cal_test
  label: Speaker Level Calibration Test
  kind: action
  command: "SLCTEST"
  params: []

- id: speaker_level_cal_ch_sel
  label: Speaker Level Calibration Channel Select
  kind: action
  command: "SLCCHSEL"
  params: []

- id: speaker_level_cal_up
  label: Speaker Level Calibration Up
  kind: action
  command: "SLCUP"
  params: []

- id: speaker_level_cal_down
  label: Speaker Level Calibration Down
  kind: action
  command: "SLCDOWN"
  params: []

- id: set_subwoofer_level
  label: Set Subwoofer Level
  kind: action
  command: "SWL{param}"
  params:
    - name: level
      type: string
      description: "-F..00..+C (-15dB..0dB..+12dB), UP, DOWN"

- id: set_center_level
  label: Set Center Level
  kind: action
  command: "CTL{param}"
  params:
    - name: level
      type: string
      description: "-C..00..+C (-12dB..0dB..+12dB), UP, DOWN"

- id: set_display_info
  label: Set Display Information
  kind: action
  command: "DIF{param}"
  params:
    - name: info
      type: enum
      values:
        - id: "00"
          label: Program Format
        - id: "01"
          label: Digital Input Position
        - id: "02"
          label: Digital Format Position
        - id: "03"
          label: Bass Level
        - id: "04"
          label: Treble Level

- id: set_display_mode
  label: Set Display Mode
  kind: action
  command: "DIF{param}"
  params:
    - name: mode
      type: enum
      values:
        - id: "00"
          label: Selector + Volume
        - id: "01"
          label: Selector + Listening Mode
        - id: "02"
          label: Digital Format (temporary)
        - id: "03"
          label: Video Format (temporary)
        - id: TG
          label: Wrap-Around

- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  command: "DIM{param}"
  params:
    - name: level
      type: enum
      values:
        - id: "00"
          label: Bright
        - id: "01"
          label: Dim
        - id: "02"
          label: Dark
        - id: "03"
          label: Shut-Off
        - id: "08"
          label: Bright & LED OFF
        - id: DIM
          label: Wrap-Around

- id: osd_menu
  label: OSD Menu
  kind: action
  command: "OSDMENU"
  params: []

- id: osd_up
  label: OSD Up
  kind: action
  command: "OSDUP"
  params: []

- id: osd_down
  label: OSD Down
  kind: action
  command: "OSDDOWN"
  params: []

- id: osd_right
  label: OSD Right
  kind: action
  command: "OSDRIGHT"
  params: []

- id: osd_left
  label: OSD Left
  kind: action
  command: "OSDLEFT"
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  command: "OSDENTER"
  params: []

- id: osd_exit
  label: OSD Exit
  kind: action
  command: "OSDEXIT"
  params: []

- id: osd_audio
  label: OSD Audio Adjust
  kind: action
  command: "OSDAUDIO"
  params: []

- id: osd_video
  label: OSD Video Adjust
  kind: action
  command: "OSDVIDEO"
  params: []

- id: memory_store
  label: Memory Store
  kind: action
  command: "MEMSTR"
  params: []

- id: memory_recall
  label: Memory Recall
  kind: action
  command: "MEMRCL"
  params: []

- id: memory_lock
  label: Memory Lock
  kind: action
  command: "MEMLOCK"
  params: []

- id: memory_unlock
  label: Memory Unlock
  kind: action
  command: "MEMUNLK"
  params: []

# ===== MAIN ZONE - INPUT SELECTOR =====

- id: select_input
  label: Select Input
  kind: action
  command: "SLI{param}"
  params:
    - name: input
      type: enum
      values:
        - id: "00"
          label: VIDEO1 (VCR/DVR)
        - id: "01"
          label: VIDEO2 (CBL/SAT)
        - id: "02"
          label: VIDEO3 (GAME/TV)
        - id: "03"
          label: VIDEO4 (AUX1)
        - id: "04"
          label: VIDEO5 (AUX2)
        - id: "05"
          label: VIDEO6
        - id: "06"
          label: VIDEO7
        - id: "10"
          label: DVD
        - id: "20"
          label: TAPE1 (TV/TAPE)
        - id: "21"
          label: TAPE2
        - id: "22"
          label: PHONO
        - id: "23"
          label: CD
        - id: "24"
          label: FM
        - id: "25"
          label: AM
        - id: "26"
          label: TUNER
        - id: "27"
          label: MUSIC SERVER
        - id: "28"
          label: INTERNET RADIO
        - id: "29"
          label: USB/USB(Front)
        - id: 2A
          label: USB(Rear)
        - id: "30"
          label: MULTI CH
        - id: "31"
          label: XM
        - id: "32"
          label: SIRIUS
        - id: "40"
          label: Universal PORT
        - id: UP
          label: Wrap-Around Up
        - id: DOWN
          label: Wrap-Around Down

- id: select_recout
  label: Select RECOUT
  kind: action
  command: "SLR{param}"
  params:
    - name: input
      type: enum
      values:
        - id: "00"
          label: VIDEO1
        - id: "01"
          label: VIDEO2
        - id: "02"
          label: VIDEO3
        - id: "03"
          label: VIDEO4
        - id: "04"
          label: VIDEO5
        - id: "05"
          label: VIDEO6
        - id: "06"
          label: VIDEO7
        - id: "10"
          label: DVD
        - id: "20"
          label: TAPE1
        - id: "21"
          label: TAPE2
        - id: "22"
          label: PHONO
        - id: "23"
          label: CD
        - id: "24"
          label: FM
        - id: "25"
          label: AM
        - id: "26"
          label: TUNER
        - id: "27"
          label: MUSIC SERVER
        - id: "28"
          label: INTERNET RADIO
        - id: "30"
          label: MULTI CH
        - id: "31"
          label: XM
        - id: 7F
          label: OFF
        - id: "80"
          label: SOURCE

- id: select_audio
  label: Select Audio Input
  kind: action
  command: "SLA{param}"
  params:
    - name: mode
      type: enum
      values:
        - id: "00"
          label: AUTO
        - id: "01"
          label: MULTI-CHANNEL
        - id: "02"
          label: ANALOG
        - id: "03"
          label: iLINK
        - id: "04"
          label: HDMI
        - id: "05"
          label: COAX/OPT
        - id: "06"
          label: BALANCE
        - id: UP
          label: Wrap-Around

# ===== MAIN ZONE - 12V TRIGGERS =====

- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  command: "TGA01"
  params: []

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  command: "TGA00"
  params: []

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  command: "TGB01"
  params: []

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  command: "TGB00"
  params: []

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  command: "TGC01"
  params: []

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  command: "TGC00"
  params: []

# ===== MAIN ZONE - VIDEO OUTPUT (Japanese Model Only) =====

- id: set_video_output_selector
  label: Set Video Output Selector (Japanese Model Only)
  kind: action
  command: "VOS{param}"
  params:
    - name: output
      type: enum
      values:
        - id: "00"
          label: D4
        - id: "01"
          label: Component

# ===== MAIN ZONE - HDMI OUTPUT =====

- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: "HDO{param}"
  params:
    - name: output
      type: enum
      values:
        - id: "00"
          label: Analog Only
        - id: "01"
          label: HDMI Main
        - id: "02"
          label: HDMI Sub
        - id: "03"
          label: Both
        - id: "04"
          label: Both (Main)
        - id: "05"
          label: Both (Sub)
        - id: UP
          label: Wrap-Around

- id: set_monitor_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "RES{param}"
  params:
    - name: resolution
      type: enum
      values:
        - id: "00"
          label: Through
        - id: "01"
          label: Auto (HDMI only)
        - id: "02"
          label: 480p
        - id: "03"
          label: 720p
        - id: "04"
          label: 1080i
        - id: "05"
          label: 1080p (HDMI only)
        - id: "06"
          label: Source
        - id: "07"
          label: 1080p/24fs (HDMI only)
        - id: UP
          label: Wrap-Around

- id: set_isf_mode
  label: Set ISF Mode
  kind: action
  command: "ISF{param}"
  params:
    - name: mode
      type: enum
      values:
        - id: "00"
          label: Custom
        - id: "01"
          label: Day
        - id: "02"
          label: Night
        - id: UP
          label: Wrap-Around

# ===== MAIN ZONE - LISTENING MODES =====

- id: set_listening_mode
  label: Set Listening Mode
  kind: action
  command: "LMD{param}"
  params:
    - name: mode
      type: enum
      values:
        - id: "00"
          label: STEREO
        - id: "01"
          label: DIRECT
        - id: "02"
          label: SURROUND
        - id: "03"
          label: FILM / Game-RPG
        - id: "04"
          label: THX
        - id: "05"
          label: ACTION / Game-Action
        - id: "06"
          label: MUSICAL / Game-Rock
        - id: "07"
          label: MONO MOVIE
        - id: "08"
          label: ORCHESTRA
        - id: "09"
          label: UNPLUGGED
        - id: 0A
          label: STUDIO-MIX
        - id: 0B
          label: TV LOGIC
        - id: 0C
          label: ALL CH STEREO
        - id: 0D
          label: THEATER-DIMENSIONAL
        - id: 0E
          label: ENHANCED 7 / Game-Sports
        - id: 0F
          label: MONO
        - id: "11"
          label: PURE AUDIO
        - id: "12"
          label: MULTIPLEX
        - id: "13"
          label: FULL MONO
        - id: "14"
          label: DOLBY VIRTUAL
        - id: "15"
          label: DTS Surround Sensation
        - id: "16"
          label: Audyssey DSX
        - id: "40"
          label: 5.1ch Surround / Straight Decode
        - id: "41"
          label: Dolby EX / DTS ES
        - id: "42"
          label: THX Cinema
        - id: "43"
          label: THX Surround EX
        - id: "44"
          label: THX Music
        - id: "45"
          label: THX Games
        - id: "50"
          label: U2/S2 Cinema/Cinema2
        - id: "51"
          label: U2/S2 Music
        - id: "52"
          label: U2/S2 Games
        - id: "80"
          label: PLII/PLIIx Movie
        - id: "81"
          label: PLII/PLIIx Music
        - id: "82"
          label: Neo:6 Cinema
        - id: "83"
          label: Neo:6 Music
        - id: "84"
          label: PLII/PLIIx THX Cinema
        - id: "85"
          label: Neo:6 THX Cinema
        - id: "86"
          label: PLII/PLIIx Game
        - id: "87"
          label: Neural Surround
        - id: "88"
          label: Neural THX / Neural Surround
        - id: "89"
          label: PLII/PLIIx THX Games
        - id: 8A
          label: Neo:6 THX Games
        - id: 8B
          label: PLII/PLIIx THX Music
        - id: 8C
          label: Neo:6 THX Music
        - id: 8D
          label: Neural THX Cinema
        - id: 8E
          label: Neural THX Music
        - id: 8F
          label: Neural THX Games
        - id: "90"
          label: PLIIz Height
        - id: "91"
          label: Neo:6 Cinema DTS Surround Sensation
        - id: "92"
          label: Neo:6 Music DTS Surround Sensation
        - id: "93"
          label: Neural Digital Music
        - id: "94"
          label: PLIIz Height + THX Cinema
        - id: "95"
          label: PLIIz Height + THX Music
        - id: "96"
          label: PLIIz Height + THX Games
        - id: "97"
          label: PLIIz Height + THX U2/S2 Cinema
        - id: "98"
          label: PLIIz Height + THX U2/S2 Music
        - id: "99"
          label: PLIIz Height + THX U2/S2 Games
        - id: A0
          label: PLIIx Movie + Audyssey DSX
        - id: A1
          label: PLIIx Music + Audyssey DSX
        - id: A2
          label: PLIIx Game + Audyssey DSX
        - id: A3
          label: Neo:6 Cinema + Audyssey DSX
        - id: A4
          label: Neo:6 Music + Audyssey DSX
        - id: A5
          label: Neural Surround + Audyssey DSX
        - id: A6
          label: Neural Digital Music + Audyssey DSX
        - id: A7
          label: Dolby EX + Audyssey DSX
        - id: UP
          label: Wrap-Around Up
        - id: DOWN
          label: Wrap-Around Down
        - id: MOVIE
          label: Movie Wrap-Around
        - id: MUSIC
          label: Music Wrap-Around
        - id: GAME
          label: Game Wrap-Around

- id: set_late_night
  label: Set Late Night
  kind: action
  command: "LTN{param}"
  params:
    - name: level
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: Low (DD) / On (TrueHD)
        - id: "02"
          label: High (DD) / On (TrueHD)
        - id: "03"
          label: Auto (TrueHD only)
        - id: UP
          label: Wrap-Around

- id: set_cinema_filter
  label: Set Cinema Filter
  kind: action
  command: "RAS{param}"
  params:
    - name: state
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: On
        - id: UP
          label: Wrap-Around

- id: set_re_eq_academy
  label: Set Re-EQ/Academy Filter
  kind: action
  command: "RAS{param}"
  params:
    - name: state
      type: enum
      values:
        - id: "00"
          label: Both Off
        - id: "01"
          label: Re-EQ On
        - id: "02"
          label: Academy On
        - id: UP
          label: Wrap-Around

- id: set_re_eq
  label: Set Re-EQ
  kind: action
  command: "RAS{param}"
  params:
    - name: state
      type: enum
      values:
        - id: "00"
          label: Re-EQ Off
        - id: "01"
          label: Re-EQ On
        - id: UP
          label: Wrap-Around

- id: set_audyssey_eq
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  command: "ADY{param}"
  params:
    - name: state
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: On
        - id: UP
          label: Wrap-Around

- id: set_audyssey_dynamic_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "ADQ{param}"
  params:
    - name: state
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: On
        - id: UP
          label: Wrap-Around

- id: set_audyssey_dynamic_volume
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "ADV{param}"
  params:
    - name: level
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: Light
        - id: "02"
          label: Medium
        - id: "03"
          label: Heavy
        - id: UP
          label: Wrap-Around

- id: set_dolby_volume
  label: Set Dolby Volume
  kind: action
  command: "DVL{param}"
  params:
    - name: level
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: Low
        - id: "02"
          label: Mid
        - id: "03"
          label: High
        - id: UP
          label: Wrap-Around

- id: set_music_optimizer
  label: Set Music Optimizer
  kind: action
  command: "MOT{param}"
  params:
    - name: state
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: On
        - id: UP
          label: Wrap-Around

# ===== MAIN ZONE - TUNER =====

- id: set_tuning_frequency
  label: Set Tuning Frequency
  kind: action
  command: "TUN{param}"
  params:
    - name: frequency
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch as 5 digits. UP/DOWN for wrap-around."

- id: set_preset
  label: Set Preset
  kind: action
  command: "PRS{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40) or 01-1E hex (preset 1-30). UP/DOWN for wrap-around."

- id: store_preset
  label: Store Preset Memory
  kind: action
  command: "PRM{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40) or 01-1E hex (preset 1-30)"

- id: set_rds_info
  label: Set RDS Information
  kind: action
  command: "RDS{param}"
  params:
    - name: type
      type: enum
      values:
        - id: "00"
          label: RT Information
        - id: "01"
          label: PTY Information
        - id: "02"
          label: TP Information
        - id: UP
          label: Wrap-Around

- id: pty_scan
  label: PTY Scan (RDS Model Only)
  kind: action
  command: "PTS{param}"
  params:
    - name: pty_number
      type: string
      description: "00-1E hex (PTY No 0-30), or ENTER to finish PTY Scan"

- id: tp_scan
  label: TP Scan (RDS Model Only)
  kind: action
  command: "TPS{param}"
  params:
    - name: action
      type: enum
      values:
        - id: ""
          label: Start TP Scan
        - id: ENTER
          label: Finish TP Scan

# ===== MAIN ZONE - TUNER (XM Model Only) =====

- id: set_xm_channel
  label: Set XM Channel Number (XM Model Only)
  kind: action
  command: "XCH{param}"
  params:
    - name: channel
      type: string
      description: "000-255 channel number. UP/DOWN for wrap-around."

- id: set_xm_category
  label: Set XM Category (XM Model Only)
  kind: action
  command: "XCT{param}"
  params:
    - name: action
      type: enum
      values:
        - id: UP
          label: Category Wrap-Around Up
        - id: DOWN
          label: Category Wrap-Around Down

# ===== MAIN ZONE - TUNER (SIRIUS Model Only) =====

- id: set_sirius_channel
  label: Set SIRIUS Channel Number (SIRIUS Model Only)
  kind: action
  command: "SCH{param}"
  params:
    - name: channel
      type: string
      description: "000-255 channel number. UP/DOWN for wrap-around."

- id: set_sirius_category
  label: Set SIRIUS Category (SIRIUS Model Only)
  kind: action
  command: "SCT{param}"
  params:
    - name: action
      type: enum
      values:
        - id: UP
          label: Category Wrap-Around Up
        - id: DOWN
          label: Category Wrap-Around Down

- id: set_sirius_parental_lock
  label: Set SIRIUS Parental Lock (SIRIUS Model Only)
  kind: action
  command: "SLK{param}"
  params:
    - name: action
      type: enum
      values:
        - id: INPUT
          label: Display Lock Password Input Prompt
        - id: WRONG
          label: Display Lock Password Wrong

- id: set_sirius_parental_lock_code
  label: Set SIRIUS Parental Lock Password (SIRIUS Model Only)
  kind: action
  command: "SLK{param}"
  params:
    - name: password
      type: string
      description: "4-digit lock password (nnnn)"

# ===== MAIN ZONE - TUNER (HD Radio Model Only) =====

- id: set_hd_radio_program
  label: Set HD Radio Channel Program (HD Radio Model Only)
  kind: action
  command: "HPR{param}"
  params:
    - name: program
      type: enum
      values:
        - id: "01"
          label: Program 1
        - id: "02"
          label: Program 2
        - id: "03"
          label: Program 3
        - id: "04"
          label: Program 4
        - id: "05"
          label: Program 5
        - id: "06"
          label: Program 6
        - id: "07"
          label: Program 7
        - id: "08"
          label: Program 8

- id: set_hd_radio_blend
  label: Set HD Radio Blend Mode (HD Radio Model Only)
  kind: action
  command: "HBL{param}"
  params:
    - name: mode
      type: enum
      values:
        - id: "00"
          label: Auto
        - id: "01"
          label: Analog

# ===== NETWORK/USB =====

- id: net_play
  label: Net/USB Play
  kind: action
  command: "NTCPLAY"
  params: []

- id: net_stop
  label: Net/USB Stop
  kind: action
  command: "NTCSTOP"
  params: []

- id: net_pause
  label: Net/USB Pause
  kind: action
  command: "NTCPAUSE"
  params: []

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  command: "NTCTRUP"
  params: []

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  command: "NTCTRDN"
  params: []

- id: net_ff
  label: Net/USB Fast Forward
  kind: action
  command: "NTCFF"
  params: []
  notes: Must be sent continuously with no more than 100ms delay between codes.

- id: net_rew
  label: Net/USB Rewind
  kind: action
  command: "NTCREW"
  params: []
  notes: Must be sent continuously with no more than 100ms delay between codes.

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  command: "NTCREPEAT"
  params: []

- id: net_random
  label: Net/USB Random
  kind: action
  command: "NTCRANDOM"
  params: []

- id: net_display
  label: Net/USB Display
  kind: action
  command: "NTCDISPLAY"
  params: []

- id: net_select
  label: Net/USB Select
  kind: action
  command: "NTCSELECT"
  params: []

- id: net_setup
  label: Net/USB Setup
  kind: action
  command: "NTCSETUP"
  params: []

- id: net_return
  label: Net/USB Return
  kind: action
  command: "NTCRETURN"
  params: []

- id: net_channel_up
  label: Net Channel Up (iRadio)
  kind: action
  command: "NTCCHUP"
  params: []

- id: net_channel_down
  label: Net Channel Down (iRadio)
  kind: action
  command: "NTCCHDN"
  params: []

- id: net_album
  label: Net/USB Album Key
  kind: action
  command: "NTCALBUM"
  params: []

- id: net_artist
  label: Net/USB Artist Key
  kind: action
  command: "NTCARTIST"
  params: []

- id: net_genre
  label: Net/USB Genre Key
  kind: action
  command: "NTCGENRE"
  params: []

- id: net_playlist
  label: Net/USB Playlist Key
  kind: action
  command: "NTCPLAYLIST"
  params: []

- id: net_right
  label: Net/USB Right Key
  kind: action
  command: "NTCRIGHT"
  params: []

- id: net_left
  label: Net/USB Left Key
  kind: action
  command: "NTCLEFT"
  params: []

- id: net_up
  label: Net/USB Up Key
  kind: action
  command: "NTCUP"
  params: []

- id: net_down
  label: Net/USB Down Key
  kind: action
  command: "NTCDOWN"
  params: []

- id: net_key_0
  label: Net/USB 0 Key
  kind: action
  command: "NTC0"
  params: []

- id: net_key_1
  label: Net/USB 1 Key
  kind: action
  command: "NTC1"
  params: []

- id: net_key_2
  label: Net/USB 2 Key
  kind: action
  command: "NTC2"
  params: []

- id: net_key_3
  label: Net/USB 3 Key
  kind: action
  command: "NTC3"
  params: []

- id: net_key_4
  label: Net/USB 4 Key
  kind: action
  command: "NTC4"
  params: []

- id: net_key_5
  label: Net/USB 5 Key
  kind: action
  command: "NTC5"
  params: []

- id: net_key_6
  label: Net/USB 6 Key
  kind: action
  command: "NTC6"
  params: []

- id: net_key_7
  label: Net/USB 7 Key
  kind: action
  command: "NTC7"
  params: []

- id: net_key_8
  label: Net/USB 8 Key
  kind: action
  command: "NTC8"
  params: []

- id: net_key_9
  label: Net/USB 9 Key
  kind: action
  command: "NTC9"
  params: []

- id: net_delete
  label: Net/USB Delete Key
  kind: action
  command: "NTCDELETE"
  params: []

- id: net_caps
  label: Net/USB Caps Key
  kind: action
  command: "NTCCAPS"
  params: []

- id: net_location
  label: Net/USB Location Key
  kind: action
  command: "NTCLOCATION"
  params: []

- id: net_language
  label: Net/USB Language Key
  kind: action
  command: "NTCLANGUAGE"
  params: []

- id: set_internet_radio_preset
  label: Set Internet Radio Preset
  kind: action
  command: "NPR{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40)"

# ===== ZONE 2 =====

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "ZPW01"
  params: []

- id: zone2_power_standby
  label: Zone 2 Power Standby
  kind: action
  command: "ZPW00"
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "ZMT01"
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "ZMT00"
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "ZMTTG"
  params: []

- id: zone2_set_volume
  label: Zone 2 Set Volume
  kind: action
  command: "ZVL{param}"
  params:
    - name: level
      type: string
      description: "00-64 hex (0-100) or 00-50 hex (0-80). UP/DOWN for incremental."

- id: zone2_set_tone
  label: Zone 2 Set Tone
  kind: action
  command: "ZTN{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step). BUP/BDOWN/TUP/TDOWN for incremental."

- id: zone2_set_balance
  label: Zone 2 Set Balance
  kind: action
  command: "ZBL{param}"
  params:
    - name: balance
      type: string
      description: "xx=-A..00..+A (-10..0..+10, 2-step). UP/DOWN for incremental."

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: "SLZ{param}"
  params:
    - name: input
      type: enum
      values:
        - id: "00"
          label: VIDEO1 (VCR/DVR)
        - id: "01"
          label: VIDEO2 (CBL/SAT)
        - id: "02"
          label: VIDEO3 (GAME/TV)
        - id: "03"
          label: VIDEO4 (AUX1)
        - id: "04"
          label: VIDEO5 (AUX2)
        - id: "10"
          label: DVD
        - id: "20"
          label: TAPE1 (TV/TAPE)
        - id: "22"
          label: PHONO
        - id: "23"
          label: CD
        - id: "24"
          label: FM
        - id: "25"
          label: AM
        - id: "26"
          label: TUNER
        - id: "27"
          label: MUSIC SERVER
        - id: "28"
          label: INTERNET RADIO
        - id: "29"
          label: USB/USB(Front)
        - id: 2A
          label: USB(Rear)
        - id: "40"
          label: Universal PORT
        - id: "80"
          label: SOURCE
        - id: UP
          label: Wrap-Around Up
        - id: DOWN
          label: Wrap-Around Down

- id: zone2_set_listening_mode
  label: Zone 2 Set Listening Mode
  kind: action
  command: "LMZ{param}"
  params:
    - name: mode
      type: enum
      values:
        - id: "00"
          label: STEREO
        - id: "01"
          label: DIRECT
        - id: 0F
          label: MONO
        - id: "12"
          label: MULTIPLEX
        - id: "87"
          label: DVS (PL2)
        - id: "88"
          label: DVS (NEO6)

- id: zone2_set_late_night
  label: Zone 2 Set Late Night
  kind: action
  command: "LTZ{param}"
  params:
    - name: level
      type: enum
      values:
        - id: "00"
          label: Off
        - id: "01"
          label: Low
        - id: "02"
          label: High
        - id: UP
          label: Wrap-Around

- id: zone2_set_re_eq_academy
  label: Zone 2 Set Re-EQ/Academy Filter
  kind: action
  command: "RAZ{param}"
  params:
    - name: state
      type: enum
      values:
        - id: "00"
          label: Both Off
        - id: "01"
          label: Re-EQ On
        - id: "02"
          label: Academy On
        - id: UP
          label: Wrap-Around

- id: zone2_set_tuning_frequency
  label: Zone 2 Set Tuning Frequency
  kind: action
  command: "TUZ{param}"
  params:
    - name: frequency
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz as 5 digits. UP/DOWN for wrap-around. Separated control from MAIN."

- id: zone2_set_preset
  label: Zone 2 Set Preset (Separated Control)
  kind: action
  command: "PRZ{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40). UP/DOWN for wrap-around. Separated control from MAIN."

- id: zone2_net_play
  label: Zone 2 Net Play (Network Model Only)
  kind: action
  command: "NTZPLAY"
  params: []

- id: zone2_net_stop
  label: Zone 2 Net Stop (Network Model Only)
  kind: action
  command: "NTZSTOP"
  params: []

- id: zone2_net_pause
  label: Zone 2 Net Pause (Network Model Only)
  kind: action
  command: "NTZPAUSE"
  params: []

- id: zone2_net_track_up
  label: Zone 2 Net Track Up (Network Model Only)
  kind: action
  command: "NTZTRUP"
  params: []

- id: zone2_net_track_down
  label: Zone 2 Net Track Down (Network Model Only)
  kind: action
  command: "NTZTRDN"
  params: []

- id: zone2_net_channel_up
  label: Zone 2 Net Channel Up / iRadio (Network Model Only)
  kind: action
  command: "NTZCHUP"
  params: []

- id: zone2_net_channel_down
  label: Zone 2 Net Channel Down / iRadio (Network Model Only)
  kind: action
  command: "NTZCHDN"
  params: []

- id: zone2_set_internet_radio_preset
  label: Zone 2 Set Internet Radio Preset (Network Model Only)
  kind: action
  command: "NPZ{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40)"

- id: zone2_nettune_play
  label: Zone 2 Net-Tune Play (Net-Tune Model Only)
  kind: action
  command: "NTCPLAYz"
  params: []

- id: zone2_nettune_stop
  label: Zone 2 Net-Tune Stop (Net-Tune Model Only)
  kind: action
  command: "NTCSTOPz"
  params: []

- id: zone2_nettune_pause
  label: Zone 2 Net-Tune Pause (Net-Tune Model Only)
  kind: action
  command: "NTCPAUSEz"
  params: []

- id: zone2_nettune_track_up
  label: Zone 2 Net-Tune Track Up (Net-Tune Model Only)
  kind: action
  command: "NTCTRUPz"
  params: []

- id: zone2_nettune_track_down
  label: Zone 2 Net-Tune Track Down (Net-Tune Model Only)
  kind: action
  command: "NTCTRDNz"
  params: []

# ===== ZONE 3 =====

- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "PW301"
  params: []

- id: zone3_power_standby
  label: Zone 3 Power Standby
  kind: action
  command: "PW300"
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: "MT301"
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: "MT300"
  params: []

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  command: "MT3TG"
  params: []

- id: zone3_set_volume
  label: Zone 3 Set Volume
  kind: action
  command: "VL3{param}"
  params:
    - name: level
      type: string
      description: "00-64 hex (0-100) or 00-50 hex (0-80). UP/DOWN for incremental."

- id: zone3_set_tone
  label: Zone 3 Set Tone
  kind: action
  command: "TN3{param}"
  params:
    - name: tone
      type: string
      description: "Bxx for bass or Txx for treble, xx=-A..00..+A (-10..0..+10, 2-step)"

- id: zone3_set_balance
  label: Zone 3 Set Balance
  kind: action
  command: "BL3{param}"
  params:
    - name: balance
      type: string
      description: "xx=-A..00..+A (-10..0..+10, 2-step). UP/DOWN for incremental."

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "SL3{param}"
  params:
    - name: input
      type: enum
      values:
        - id: "00"
          label: VIDEO1 (VCR/DVR)
        - id: "01"
          label: VIDEO2 (CBL/SAT)
        - id: "02"
          label: VIDEO3 (GAME/TV)
        - id: "03"
          label: VIDEO4 (AUX1)
        - id: "04"
          label: VIDEO5 (AUX2)
        - id: "05"
          label: VIDEO6
        - id: "06"
          label: VIDEO7
        - id: "10"
          label: DVD
        - id: "20"
          label: TAPE1
        - id: "21"
          label: TAPE2
        - id: "22"
          label: PHONO
        - id: "23"
          label: CD
        - id: "24"
          label: FM
        - id: "25"
          label: AM
        - id: "26"
          label: TUNER
        - id: "27"
          label: MUSIC SERVER
        - id: "28"
          label: INTERNET RADIO
        - id: "29"
          label: USB/USB(Front)
        - id: 2A
          label: USB(Rear)
        - id: "30"
          label: MULTI CH
        - id: "31"
          label: XM
        - id: "32"
          label: SIRIUS
        - id: "40"
          label: Universal PORT
        - id: "80"
          label: SOURCE

- id: zone3_set_tuning_frequency
  label: Zone 3 Set Tuning Frequency (Separated Control)
  kind: action
  command: "TU3{param}"
  params:
    - name: frequency
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz as 5 digits. UP/DOWN for wrap-around. Separated control from MAIN."

- id: zone3_set_preset
  label: Zone 3 Set Preset (Separated Control)
  kind: action
  command: "PR3{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40). UP/DOWN for wrap-around. Separated control from MAIN."

- id: zone3_net_play
  label: Zone 3 Net Play (Network Model Only)
  kind: action
  command: "NT3PLAY"
  params: []

- id: zone3_net_stop
  label: Zone 3 Net Stop (Network Model Only)
  kind: action
  command: "NT3STOP"
  params: []

- id: zone3_net_pause
  label: Zone 3 Net Pause (Network Model Only)
  kind: action
  command: "NT3PAUSE"
  params: []

- id: zone3_net_track_up
  label: Zone 3 Net Track Up (Network Model Only)
  kind: action
  command: "NT3TRUP"
  params: []

- id: zone3_net_track_down
  label: Zone 3 Net Track Down (Network Model Only)
  kind: action
  command: "NT3TRDN"
  params: []

- id: zone3_net_channel_up
  label: Zone 3 Net Channel Up / iRadio (Network Model Only)
  kind: action
  command: "NT3CHUP"
  params: []

- id: zone3_net_channel_down
  label: Zone 3 Net Channel Down / iRadio (Network Model Only)
  kind: action
  command: "NT3CHDN"
  params: []

- id: zone3_set_internet_radio_preset
  label: Zone 3 Set Internet Radio Preset (Network Model Only)
  kind: action
  command: "NP3{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40)"

- id: zone3_nettune_play
  label: Zone 3 Net-Tune Play (Net-Tune Model Only)
  kind: action
  command: "NTCPLAYz"
  params: []

- id: zone3_nettune_stop
  label: Zone 3 Net-Tune Stop (Net-Tune Model Only)
  kind: action
  command: "NTCSTOPz"
  params: []

- id: zone3_nettune_pause
  label: Zone 3 Net-Tune Pause (Net-Tune Model Only)
  kind: action
  command: "NTCPAUSEz"
  params: []

- id: zone3_nettune_track_up
  label: Zone 3 Net-Tune Track Up (Net-Tune Model Only)
  kind: action
  command: "NTCTRUPz"
  params: []

- id: zone3_nettune_track_down
  label: Zone 3 Net-Tune Track Down (Net-Tune Model Only)
  kind: action
  command: "NTCTRDNz"
  params: []

# ===== ZONE 4 =====

- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "PW401"
  params: []

- id: zone4_power_standby
  label: Zone 4 Power Standby
  kind: action
  command: "PW400"
  params: []

- id: zone4_mute_on
  label: Zone 4 Mute On
  kind: action
  command: "MT401"
  params: []

- id: zone4_mute_off
  label: Zone 4 Mute Off
  kind: action
  command: "MT400"
  params: []

- id: zone4_mute_toggle
  label: Zone 4 Mute Toggle
  kind: action
  command: "MT4TG"
  params: []

- id: zone4_set_volume
  label: Zone 4 Set Volume
  kind: action
  command: "VL4{param}"
  params:
    - name: level
      type: string
      description: "00-64 hex (0-100) or 00-50 hex (0-80). UP/DOWN for incremental."

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "SL4{param}"
  params:
    - name: input
      type: enum
      values:
        - id: "00"
          label: VIDEO1 (VCR/DVR)
        - id: "01"
          label: VIDEO2 (CBL/SAT)
        - id: "02"
          label: VIDEO3 (GAME/TV)
        - id: "03"
          label: VIDEO4 (AUX1)
        - id: "04"
          label: VIDEO5 (AUX2)
        - id: "05"
          label: VIDEO6
        - id: "06"
          label: VIDEO7
        - id: "10"
          label: DVD
        - id: "20"
          label: TAPE1 (TV/TAPE)
        - id: "21"
          label: TAPE2
        - id: "22"
          label: PHONO
        - id: "23"
          label: CD
        - id: "24"
          label: FM
        - id: "25"
          label: AM
        - id: "26"
          label: TUNER
        - id: "27"
          label: MUSIC SERVER
        - id: "28"
          label: INTERNET RADIO
        - id: "29"
          label: USB/USB(Front)
        - id: 2A
          label: USB(Rear)
        - id: "30"
          label: MULTI CH
        - id: "31"
          label: XM
        - id: "32"
          label: SIRIUS
        - id: "40"
          label: Universal PORT
        - id: "80"
          label: SOURCE

- id: zone4_set_tuning_frequency
  label: Zone 4 Set Tuning Frequency (Separated Control)
  kind: action
  command: "TU4{param}"
  params:
    - name: frequency
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz as 5 digits. UP/DOWN for wrap-around. Separated control from MAIN."

- id: zone4_set_preset
  label: Zone 4 Set Preset (Separated Control)
  kind: action
  command: "PR4{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40). UP/DOWN for wrap-around. Separated control from MAIN."

- id: zone4_net_play
  label: Zone 4 Net Play (Network Model Only)
  kind: action
  command: "NT4PLAY"
  params: []

- id: zone4_net_stop
  label: Zone 4 Net Stop (Network Model Only)
  kind: action
  command: "NT4STOP"
  params: []

- id: zone4_net_track_up
  label: Zone 4 Net Track Up (Network Model Only)
  kind: action
  command: "NT4TRUP"
  params: []

- id: zone4_net_track_down
  label: Zone 4 Net Track Down (Network Model Only)
  kind: action
  command: "NT4TRDN"
  params: []

- id: zone4_set_internet_radio_preset
  label: Zone 4 Set Internet Radio Preset (Network Model Only)
  kind: action
  command: "NP4{param}"
  params:
    - name: number
      type: string
      description: "01-28 hex (preset 1-40)"

# ===== DOCK (via RI) =====

- id: dock_power_on
  label: Dock Power On
  kind: action
  command: "CDSPWRON"
  params: []

- id: dock_power_standby
  label: Dock Power Standby
  kind: action
  command: "CDSPWROFF"
  params: []

- id: dock_play_resume
  label: Dock Play/Resume
  kind: action
  command: "CDSPLY/RES"
  params: []

- id: dock_stop
  label: Dock Stop
  kind: action
  command: "CDSSTOP"
  params: []

- id: dock_track_up
  label: Dock Track Up
  kind: action
  command: "CDSSKIP.F"
  params: []

- id: dock_track_down
  label: Dock Track Down
  kind: action
  command: "CDSSKIP.R"
  params: []

- id: dock_pause
  label: Dock Pause
  kind: action
  command: "CDSPAUSE"
  params: []

- id: dock_play_pause
  label: Dock Play/Pause
  kind: action
  command: "CDSPLY/PAU"
  params: []

- id: dock_ff
  label: Dock Fast Forward
  kind: action
  command: "CDSFF"
  params: []

- id: dock_rew
  label: Dock Rewind
  kind: action
  command: "CDSREW"
  params: []

- id: dock_album_up
  label: Dock Album Up
  kind: action
  command: "CDSALBUM+"
  params: []

- id: dock_album_down
  label: Dock Album Down
  kind: action
  command: "CDSALBUM-"
  params: []

- id: dock_playlist_up
  label: Dock Playlist Up
  kind: action
  command: "CDSPLIST+"
  params: []

- id: dock_playlist_down
  label: Dock Playlist Down
  kind: action
  command: "CDSPLIST-"
  params: []

- id: dock_chapter_up
  label: Dock Chapter Up
  kind: action
  command: "CDSCHAPT+"
  params: []

- id: dock_chapter_down
  label: Dock Chapter Down
  kind: action
  command: "CDSCHAPT-"
  params: []

- id: dock_shuffle
  label: Dock Shuffle
  kind: action
  command: "CDSRANDOM"
  params: []

- id: dock_repeat
  label: Dock Repeat
  kind: action
  command: "CDSREPEAT"
  params: []

- id: dock_mute
  label: Dock Mute
  kind: action
  command: "CDSMUTE"
  params: []

- id: dock_backlight
  label: Dock Backlight
  kind: action
  command: "CDSBLIGHT"
  params: []

- id: dock_menu
  label: Dock Menu
  kind: action
  command: "CDSMENU"
  params: []

- id: dock_select
  label: Dock Select
  kind: action
  command: "CDSENTER"
  params: []

- id: dock_cursor_up
  label: Dock Cursor Up
  kind: action
  command: "CDSUP"
  params: []

- id: dock_cursor_down
  label: Dock Cursor Down
  kind: action
  command: "CDSDOWN"
  params: []

# ===== ONKYO RI - CD PLAYER (CCD) =====

- id: cd_power_toggle
  label: CD Player Power Toggle
  kind: action
  command: "CCDPOWER"
  params: []

- id: cd_power_on
  label: CD Player Power On
  kind: action
  command: "CCDPON"
  params: []

- id: cd_standby
  label: CD Player Standby
  kind: action
  command: "CCDSTBY"
  params: []

- id: cd_track_up
  label: CD Player Track+
  kind: action
  command: "CCDTRACK"
  params: []

- id: cd_play
  label: CD Player Play
  kind: action
  command: "CCDPLAY"
  params: []

- id: cd_stop
  label: CD Player Stop
  kind: action
  command: "CCDSTOP"
  params: []

- id: cd_pause
  label: CD Player Pause
  kind: action
  command: "CCDPAUSE"
  params: []

- id: cd_skip_forward
  label: CD Player Skip Forward
  kind: action
  command: "CCDSKIP.F"
  params: []

- id: cd_skip_reverse
  label: CD Player Skip Reverse
  kind: action
  command: "CCDSKIP.R"
  params: []

- id: cd_memory
  label: CD Player Memory
  kind: action
  command: "CCDMEMORY"
  params: []

- id: cd_clear
  label: CD Player Clear
  kind: action
  command: "CCDCLEAR"
  params: []

- id: cd_repeat
  label: CD Player Repeat
  kind: action
  command: "CCDREPEAT"
  params: []

- id: cd_random
  label: CD Player Random
  kind: action
  command: "CCDRANDOM"
  params: []

- id: cd_display
  label: CD Player Display
  kind: action
  command: "CCDDISP"
  params: []

- id: cd_d_mode
  label: CD Player D.Mode
  kind: action
  command: "CCDD.MODE"
  params: []

- id: cd_ff
  label: CD Player Fast Forward
  kind: action
  command: "CCDFF"
  params: []

- id: cd_rew
  label: CD Player Rewind
  kind: action
  command: "CCDREW"
  params: []

- id: cd_open_close
  label: CD Player Open/Close
  kind: action
  command: "CCDOP/CL"
  params: []

- id: cd_key_0
  label: CD Player 0
  kind: action
  command: "CCD0"
  params: []

- id: cd_key_1
  label: CD Player 1
  kind: action
  command: "CCD1"
  params: []

- id: cd_key_2
  label: CD Player 2
  kind: action
  command: "CCD2"
  params: []

- id: cd_key_3
  label: CD Player 3
  kind: action
  command: "CCD3"
  params: []

- id: cd_key_4
  label: CD Player 4
  kind: action
  command: "CCD4"
  params: []

- id: cd_key_5
  label: CD Player 5
  kind: action
  command: "CCD5"
  params: []

- id: cd_key_6
  label: CD Player 6
  kind: action
  command: "CCD6"
  params: []

- id: cd_key_7
  label: CD Player 7
  kind: action
  command: "CCD7"
  params: []

- id: cd_key_8
  label: CD Player 8
  kind: action
  command: "CCD8"
  params: []

- id: cd_key_9
  label: CD Player 9
  kind: action
  command: "CCD9"
  params: []

- id: cd_key_10
  label: CD Player 10
  kind: action
  command: "CCD10"
  params: []

- id: cd_key_plus10
  label: CD Player +10
  kind: action
  command: "CCD+10"
  params: []

- id: cd_disc_skip
  label: CD Player Disc+
  kind: action
  command: "CCDD.SKIP"
  params: []

- id: cd_disc_forward
  label: CD Player Disc Forward
  kind: action
  command: "CCDDISC.F"
  params: []

- id: cd_disc_reverse
  label: CD Player Disc Reverse
  kind: action
  command: "CCDDISC.R"
  params: []

- id: cd_disc_1
  label: CD Player Disc 1
  kind: action
  command: "CCDDISC1"
  params: []

- id: cd_disc_2
  label: CD Player Disc 2
  kind: action
  command: "CCDDISC2"
  params: []

- id: cd_disc_3
  label: CD Player Disc 3
  kind: action
  command: "CCDDISC3"
  params: []

- id: cd_disc_4
  label: CD Player Disc 4
  kind: action
  command: "CCDDISC4"
  params: []

- id: cd_disc_5
  label: CD Player Disc 5
  kind: action
  command: "CCDDISC5"
  params: []

- id: cd_disc_6
  label: CD Player Disc 6
  kind: action
  command: "CCDDISC6"
  params: []

# ===== ONKYO RI - TAPE1 (CT1) =====

- id: tape1_play_forward
  label: Tape1 Play Forward
  kind: action
  command: "CT1PLAY.F"
  params: []

- id: tape1_play_reverse
  label: Tape1 Play Reverse
  kind: action
  command: "CT1PLAY.R"
  params: []

- id: tape1_stop
  label: Tape1 Stop
  kind: action
  command: "CT1STOP"
  params: []

- id: tape1_rec_pause
  label: Tape1 Rec/Pause
  kind: action
  command: "CT1RC/PAU"
  params: []

- id: tape1_ff
  label: Tape1 Fast Forward
  kind: action
  command: "CT1FF"
  params: []

- id: tape1_rew
  label: Tape1 Rewind
  kind: action
  command: "CT1REW"
  params: []

# ===== ONKYO RI - TAPE2 (CT2) =====

- id: tape2_play_forward
  label: Tape2 Play Forward
  kind: action
  command: "CT2PLAY.F"
  params: []

- id: tape2_play_reverse
  label: Tape2 Play Reverse
  kind: action
  command: "CT2PLAY.R"
  params: []

- id: tape2_stop
  label: Tape2 Stop
  kind: action
  command: "CT2STOP"
  params: []

- id: tape2_rec_pause
  label: Tape2 Rec/Pause
  kind: action
  command: "CT2RC/PAU"
  params: []

- id: tape2_ff
  label: Tape2 Fast Forward
  kind: action
  command: "CT2FF"
  params: []

- id: tape2_rew
  label: Tape2 Rewind
  kind: action
  command: "CT2REW"
  params: []

- id: tape2_open_close
  label: Tape2 Open/Close
  kind: action
  command: "CT2OP/CL"
  params: []

- id: tape2_skip_forward
  label: Tape2 Skip Forward
  kind: action
  command: "CT2SKIP.F"
  params: []

- id: tape2_skip_reverse
  label: Tape2 Skip Reverse
  kind: action
  command: "CT2SKIP.R"
  params: []

- id: tape2_rec
  label: Tape2 Record
  kind: action
  command: "CT2REC"
  params: []

# ===== ONKYO RI - GRAPHICS EQUALIZER (CEQ) =====

- id: geq_power_toggle
  label: Graphics Equalizer Power Toggle
  kind: action
  command: "CEQPOWER"
  params: []

- id: geq_preset
  label: Graphics Equalizer Preset
  kind: action
  command: "CEQPRESET"
  params: []

# ===== ONKYO RI - DAT RECORDER (CDT) =====

- id: dat_play
  label: DAT Play
  kind: action
  command: "CDTPLAY"
  params: []

- id: dat_rec_pause
  label: DAT Rec/Pause
  kind: action
  command: "CDTRC/PAU"
  params: []

- id: dat_stop
  label: DAT Stop
  kind: action
  command: "CDTSTOP"
  params: []

- id: dat_skip_forward
  label: DAT Skip Forward
  kind: action
  command: "CDTSKIP.F"
  params: []

- id: dat_skip_reverse
  label: DAT Skip Reverse
  kind: action
  command: "CDTSKIP.R"
  params: []

- id: dat_ff
  label: DAT Fast Forward
  kind: action
  command: "CDTFF"
  params: []

- id: dat_rew
  label: DAT Rewind
  kind: action
  command: "CDTREW"
  params: []

# ===== ONKYO RI - DVD PLAYER (CDV) =====

- id: dvd_power_toggle
  label: DVD Player Power Toggle
  kind: action
  command: "CDVPOWER"
  params: []

- id: dvd_power_on
  label: DVD Player Power On
  kind: action
  command: "CDVPWRON"
  params: []

- id: dvd_power_off
  label: DVD Player Power Off
  kind: action
  command: "CDVPWROFF"
  params: []

- id: dvd_play
  label: DVD Player Play
  kind: action
  command: "CDVPLAY"
  params: []

- id: dvd_stop
  label: DVD Player Stop
  kind: action
  command: "CDVSTOP"
  params: []

- id: dvd_skip_forward
  label: DVD Player Skip Forward
  kind: action
  command: "CDVSKIP.F"
  params: []

- id: dvd_skip_reverse
  label: DVD Player Skip Reverse
  kind: action
  command: "CDVSKIP.R"
  params: []

- id: dvd_ff
  label: DVD Player Fast Forward
  kind: action
  command: "CDVFF"
  params: []

- id: dvd_rew
  label: DVD Player Rewind
  kind: action
  command: "CDVREW"
  params: []

- id: dvd_pause
  label: DVD Player Pause
  kind: action
  command: "CDVPAUSE"
  params: []

- id: dvd_last_play
  label: DVD Player Last Play
  kind: action
  command: "CDVLASTPLAY"
  params: []

- id: dvd_subtitle_toggle
  label: DVD Player Subtitle On/Off
  kind: action
  command: "CDVSUBTON/OFF"
  params: []

- id: dvd_subtitle
  label: DVD Player Subtitle
  kind: action
  command: "CDVSUBTITLE"
  params: []

- id: dvd_setup
  label: DVD Player Setup
  kind: action
  command: "CDVSETUP"
  params: []

- id: dvd_top_menu
  label: DVD Player Top Menu
  kind: action
  command: "CDVTOPMENU"
  params: []

- id: dvd_menu
  label: DVD Player Menu
  kind: action
  command: "CDVMENU"
  params: []

- id: dvd_up
  label: DVD Player Up
  kind: action
  command: "CDVUP"
  params: []

- id: dvd_down
  label: DVD Player Down
  kind: action
  command: "CDVDOWN"
  params: []

- id: dvd_left
  label: DVD Player Left
  kind: action
  command: "CDVLEFT"
  params: []

- id: dvd_right
  label: DVD Player Right
  kind: action
  command: "CDVRIGHT"
  params: []

- id: dvd_enter
  label: DVD Player Enter
  kind: action
  command: "CDVENTER"
  params: []

- id: dvd_return
  label: DVD Player Return
  kind: action
  command: "CDVRETURN"
  params: []

- id: dvd_disc_forward
  label: DVD Player Disc+
  kind: action
  command: "CDVDISC.F"
  params: []

- id: dvd_disc_reverse
  label: DVD Player Disc-
  kind: action
  command: "CDVDISC.R"
  params: []

- id: dvd_audio
  label: DVD Player Audio
  kind: action
  command: "CDVAUDIO"
  params: []

- id: dvd_random
  label: DVD Player Random
  kind: action
  command: "CDVRANDOM"
  params: []

- id: dvd_open_close
  label: DVD Player Open/Close
  kind: action
  command: "CDVOP/CL"
  params: []

- id: dvd_angle
  label: DVD Player Angle
  kind: action
  command: "CDVANGLE"
  params: []

- id: dvd_key_0
  label: DVD Player 0
  kind: action
  command: "CDV0"
  params: []

- id: dvd_key_1
  label: DVD Player 1
  kind: action
  command: "CDV1"
  params: []

- id: dvd_key_2
  label: DVD Player 2
  kind: action
  command: "CDV2"
  params: []

- id: dvd_key_3
  label: DVD Player 3
  kind: action
  command: "CDV3"
  params: []

- id: dvd_key_4
  label: DVD Player 4
  kind: action
  command: "CDV4"
  params: []

- id: dvd_key_5
  label: DVD Player 5
  kind: action
  command: "CDV5"
  params: []

- id: dvd_key_6
  label: DVD Player 6
  kind: action
  command: "CDV6"
  params: []

- id: dvd_key_7
  label: DVD Player 7
  kind: action
  command: "CDV7"
  params: []

- id: dvd_key_8
  label: DVD Player 8
  kind: action
  command: "CDV8"
  params: []

- id: dvd_key_9
  label: DVD Player 9
  kind: action
  command: "CDV9"
  params: []

- id: dvd_key_10
  label: DVD Player 10
  kind: action
  command: "CDV10"
  params: []

- id: dvd_search
  label: DVD Player Search
  kind: action
  command: "CDVSEARCH"
  params: []

- id: dvd_display
  label: DVD Player Display
  kind: action
  command: "CDVDISP"
  params: []

- id: dvd_repeat
  label: DVD Player Repeat
  kind: action
  command: "CDVREPEAT"
  params: []

- id: dvd_memory
  label: DVD Player Memory
  kind: action
  command: "CDVMEMORY"
  params: []

- id: dvd_clear
  label: DVD Player Clear
  kind: action
  command: "CDVCLEAR"
  params: []

- id: dvd_ab_repeat
  label: DVD Player A-B Repeat
  kind: action
  command: "CDVABR"
  params: []

- id: dvd_step_forward
  label: DVD Player Step Forward
  kind: action
  command: "CDVSTEP.F"
  params: []

- id: dvd_step_reverse
  label: DVD Player Step Back
  kind: action
  command: "CDVSTEP.R"
  params: []

- id: dvd_slow_forward
  label: DVD Player Slow Forward
  kind: action
  command: "CDVSLOW.F"
  params: []

- id: dvd_slow_reverse
  label: DVD Player Slow Back
  kind: action
  command: "CDVSLOW.R"
  params: []

- id: dvd_zoom_toggle
  label: DVD Player Zoom
  kind: action
  command: "CDVZOOMTG"
  params: []

- id: dvd_zoom_up
  label: DVD Player Zoom Up
  kind: action
  command: "CDVZOOMUP"
  params: []

- id: dvd_zoom_down
  label: DVD Player Zoom Down
  kind: action
  command: "CDVZOOMDN"
  params: []

- id: dvd_progressive
  label: DVD Player Progressive
  kind: action
  command: "CDVPROGRE"
  params: []

- id: dvd_video_off
  label: DVD Player Video On/Off
  kind: action
  command: "CDVVDOFF"
  params: []

- id: dvd_condition_memory
  label: DVD Player Condition Memory
  kind: action
  command: "CDVCONMEM"
  params: []

- id: dvd_function_memory
  label: DVD Player Function Memory
  kind: action
  command: "CDVFUNMEM"
  params: []

- id: dvd_disc_1
  label: DVD Player Disc 1
  kind: action
  command: "CDVDISC1"
  params: []

- id: dvd_disc_2
  label: DVD Player Disc 2
  kind: action
  command: "CDVDISC2"
  params: []

- id: dvd_disc_3
  label: DVD Player Disc 3
  kind: action
  command: "CDVDISC3"
  params: []

- id: dvd_disc_4
  label: DVD Player Disc 4
  kind: action
  command: "CDVDISC4"
  params: []

- id: dvd_disc_5
  label: DVD Player Disc 5
  kind: action
  command: "CDVDISC5"
  params: []

- id: dvd_disc_6
  label: DVD Player Disc 6
  kind: action
  command: "CDVDISC6"
  params: []

- id: dvd_folder_up
  label: DVD Player Folder Up
  kind: action
  command: "CDVFOLDUP"
  params: []

- id: dvd_folder_down
  label: DVD Player Folder Down
  kind: action
  command: "CDVFOLDDN"
  params: []

- id: dvd_play_mode
  label: DVD Player Play Mode
  kind: action
  command: "CDVP.MODE"
  params: []

- id: dvd_aspect_toggle
  label: DVD Player Aspect Toggle
  kind: action
  command: "CDVASCTG"
  params: []

- id: dvd_cd_chain_repeat
  label: DVD Player CD Chain Repeat
  kind: action
  command: "CDVCDPCD"
  params: []

- id: dvd_multi_speed_up
  label: DVD Player Multi Speed Up
  kind: action
  command: "CDVMSPUP"
  params: []

- id: dvd_multi_speed_down
  label: DVD Player Multi Speed Down
  kind: action
  command: "CDVMSPDN"
  params: []

- id: dvd_picture_control
  label: DVD Player Picture Control
  kind: action
  command: "CDVPCT"
  params: []

- id: dvd_resolution_toggle
  label: DVD Player Resolution Toggle
  kind: action
  command: "CDVRSCTG"
  params: []

- id: dvd_factory_init
  label: DVD Player Return to Factory Settings
  kind: action
  command: "CDVINIT"
  params: []

# ===== ONKYO RI - MD RECORDER (CMD) =====

- id: md_power_toggle
  label: MD Recorder Power Toggle
  kind: action
  command: "CMDPOWER"
  params: []

- id: md_play
  label: MD Recorder Play
  kind: action
  command: "CMDPLAY"
  params: []

- id: md_stop
  label: MD Recorder Stop
  kind: action
  command: "CMDSTOP"
  params: []

- id: md_ff
  label: MD Recorder Fast Forward
  kind: action
  command: "CMDFF"
  params: []

- id: md_rew
  label: MD Recorder Rewind
  kind: action
  command: "CMDREW"
  params: []

- id: md_play_mode
  label: MD Recorder Play Mode
  kind: action
  command: "CMDP.MODE"
  params: []

- id: md_skip_forward
  label: MD Recorder Skip Forward
  kind: action
  command: "CMDSKIP.F"
  params: []

- id: md_skip_reverse
  label: MD Recorder Skip Reverse
  kind: action
  command: "CMDSKIP.R"
  params: []

- id: md_pause
  label: MD Recorder Pause
  kind: action
  command: "CMDPAUSE"
  params: []

- id: md_rec
  label: MD Recorder Record
  kind: action
  command: "CMDREC"
  params: []

- id: md_memory
  label: MD Recorder Memory
  kind: action
  command: "CMDMEMORY"
  params: []

- id: md_display
  label: MD Recorder Display
  kind: action
  command: "CMDDISP"
  params: []

- id: md_scroll
  label: MD Recorder Scroll
  kind: action
  command: "CMDSCROLL"
  params: []

- id: md_music_scan
  label: MD Recorder Music Scan
  kind: action
  command: "CMDM.SCAN"
  params: []

- id: md_clear
  label: MD Recorder Clear
  kind: action
  command: "CMDCLEAR"
  params: []

- id: md_random
  label: MD Recorder Random
  kind: action
  command: "CMDRANDOM"
  params: []

- id: md_repeat
  label: MD Recorder Repeat
  kind: action
  command: "CMDREPEAT"
  params: []

- id: md_enter
  label: MD Recorder Enter
  kind: action
  command: "CMDENTER"
  params: []

- id: md_eject
  label: MD Recorder Eject
  kind: action
  command: "CMDEJECT"
  params: []

- id: md_key_1
  label: MD Recorder 1
  kind: action
  command: "CMD1"
  params: []

- id: md_key_2
  label: MD Recorder 2
  kind: action
  command: "CMD2"
  params: []

- id: md_key_3
  label: MD Recorder 3
  kind: action
  command: "CMD3"
  params: []

- id: md_key_4
  label: MD Recorder 4
  kind: action
  command: "CMD4"
  params: []

- id: md_key_5
  label: MD Recorder 5
  kind: action
  command: "CMD5"
  params: []

- id: md_key_6
  label: MD Recorder 6
  kind: action
  command: "CMD6"
  params: []

- id: md_key_7
  label: MD Recorder 7
  kind: action
  command: "CMD7"
  params: []

- id: md_key_8
  label: MD Recorder 8
  kind: action
  command: "CMD8"
  params: []

- id: md_key_9
  label: MD Recorder 9
  kind: action
  command: "CMD9"
  params: []

- id: md_key_10_0
  label: MD Recorder 10/0
  kind: action
  command: "CMD10/0"
  params: []

- id: md_name
  label: MD Recorder Name
  kind: action
  command: "CMDNAME"
  params: []

- id: md_group
  label: MD Recorder Group
  kind: action
  command: "CMDGROUP"
  params: []

- id: md_standby
  label: MD Recorder Standby
  kind: action
  command: "CMDSTBY"
  params: []

# ===== ONKYO RI - CD-R RECORDER (CCR) =====

- id: cdr_power_toggle
  label: CD-R Recorder Power Toggle
  kind: action
  command: "CCRPOWER"
  params: []

- id: cdr_play_mode
  label: CD-R Recorder Play Mode
  kind: action
  command: "CCRP.MODE"
  params: []

- id: cdr_play
  label: CD-R Recorder Play
  kind: action
  command: "CCRPLAY"
  params: []

- id: cdr_stop
  label: CD-R Recorder Stop
  kind: action
  command: "CCRSTOP"
  params: []

- id: cdr_skip_forward
  label: CD-R Recorder Skip Forward
  kind: action
  command: "CCRSKIP.F"
  params: []

- id: cdr_skip_reverse
  label: CD-R Recorder Skip Reverse
  kind: action
  command: "CCRSKIP.R"
  params: []

- id: cdr_pause
  label: CD-R Recorder Pause
  kind: action
  command: "CCRPAUSE"
  params: []

- id: cdr_rec
  label: CD-R Recorder Record
  kind: action
  command: "CCRREC"
  params: []

- id: cdr_clear
  label: CD-R Recorder Clear
  kind: action
  command: "CCRCLEAR"
  params: []

- id: cdr_repeat
  label: CD-R Recorder Repeat
  kind: action
  command: "CCRREPEAT"
  params: []

- id: cdr_key_1
  label: CD-R Recorder 1
  kind: action
  command: "CCR1"
  params: []

- id: cdr_key_2
  label: CD-R Recorder 2
  kind: action
  command: "CCR2"
  params: []

- id: cdr_key_3
  label: CD-R Recorder 3
  kind: action
  command: "CCR3"
  params: []

- id: cdr_key_4
  label: CD-R Recorder 4
  kind: action
  command: "CCR4"
  params: []

- id: cdr_key_5
  label: CD-R Recorder 5
  kind: action
  command: "CCR5"
  params: []

- id: cdr_key_6
  label: CD-R Recorder 6
  kind: action
  command: "CCR6"
  params: []

- id: cdr_key_7
  label: CD-R Recorder 7
  kind: action
  command: "CCR7"
  params: []

- id: cdr_key_8
  label: CD-R Recorder 8
  kind: action
  command: "CCR8"
  params: []

- id: cdr_key_9
  label: CD-R Recorder 9
  kind: action
  command: "CCR9"
  params: []

- id: cdr_key_10_0
  label: CD-R Recorder 10/0
  kind: action
  command: "CCR10/0"
  params: []

- id: cdr_scroll
  label: CD-R Recorder Scroll
  kind: action
  command: "CCRSCROLL"
  params: []

- id: cdr_open_close
  label: CD-R Recorder Open/Close
  kind: action
  command: "CCROP/CL"
  params: []

- id: cdr_display
  label: CD-R Recorder Display
  kind: action
  command: "CCRDISP"
  params: []

- id: cdr_random
  label: CD-R Recorder Random
  kind: action
  command: "CCRRANDOM"
  params: []

- id: cdr_memory
  label: CD-R Recorder Memory
  kind: action
  command: "CCRMEMORY"
  params: []

- id: cdr_ff
  label: CD-R Recorder Fast Forward
  kind: action
  command: "CCRFF"
  params: []

- id: cdr_rew
  label: CD-R Recorder Rewind
  kind: action
  command: "CCRREW"
  params: []

- id: cdr_standby
  label: CD-R Recorder Standby
  kind: action
  command: "CCRSTBY"
  params: []

- id: md_numeric_key
  label: MD Recorder Numeric Key
  kind: action
  command: "CMD{param}"
  params:
    - name: number
      type: string
      description: "nn/nnn (--/---); parameter range: UNRESOLVED"

- id: cdr_numeric_key
  label: CD-R Recorder Numeric Key
  kind: action
  command: "CCR{param}"
  params:
    - name: number
      type: string
      description: "nn/nnn (--/---); parameter range: UNRESOLVED"
```

## Feedbacks
```yaml
# Commands supporting QSTN return current state when queried.
# Response format mirrors the command: "!1CCCPE" where P is current value.

- id: power_state
  label: System Power Status
  type: enum
  command: "PWRQSTN"
  query_command: "PWRQSTN"
  values:
    - id: "00"
      label: Standby
    - id: "01"
      label: On

- id: mute_state
  label: Audio Muting State
  type: enum
  command: "AMTQSTN"
  query_command: "AMTQSTN"
  values:
    - id: "00"
      label: Off
    - id: "01"
      label: On

- id: speaker_a_state
  label: Speaker A State
  type: enum
  command: "SPAQSTN"
  query_command: "SPAQSTN"
  values:
    - id: "00"
      label: Off
    - id: "01"
      label: On

- id: speaker_b_state
  label: Speaker B State
  type: enum
  command: "SPBQSTN"
  query_command: "SPBQSTN"
  values:
    - id: "00"
      label: Off
    - id: "01"
      label: On

- id: speaker_layout
  label: Speaker Layout State
  type: string
  command: "SPLQSTN"
  query_command: "SPLQSTN"
  description: "Returns SB/FH/FW speaker layout code"

- id: volume_level
  label: Master Volume Level
  type: string
  command: "MVLQSTN"
  query_command: "MVLQSTN"
  description: "Returns hex value 00-64 (0-100) or 00-50 (0-80)"

- id: tone_front
  label: Front Tone
  type: string
  command: "TFRQSTN"
  query_command: "TFRQSTN"
  description: "Returns BxxTxx where xx=-A..00..+A"

- id: tone_front_wide
  label: Front Wide Tone
  type: string
  command: "TFWQSTN"
  query_command: "TFWQSTN"
  description: "Returns BxxTxx where xx=-A..00..+A"

- id: tone_front_high
  label: Front High Tone
  type: string
  command: "TFHQSTN"
  query_command: "TFHQSTN"
  description: "Returns BxxTxx where xx=-A..00..+A"

- id: tone_center
  label: Center Tone
  type: string
  command: "TCTQSTN"
  query_command: "TCTQSTN"
  description: "Returns BxxTxx where xx=-A..00..+A"

- id: tone_surround
  label: Surround Tone
  type: string
  command: "TSRQSTN"
  query_command: "TSRQSTN"
  description: "Returns BxxTxx where xx=-A..00..+A"

- id: tone_surround_back
  label: Surround Back Tone
  type: string
  command: "TSBQSTN"
  query_command: "TSBQSTN"
  description: "Returns BxxTxx where xx=-A..00..+A"

- id: tone_subwoofer
  label: Subwoofer Tone
  type: string
  command: "TSWQSTN"
  query_command: "TSWQSTN"
  description: "Returns Bxx where xx=-A..00..+A"

- id: sleep_time
  label: Sleep Timer
  type: string
  command: "SLPQSTN"
  query_command: "SLPQSTN"
  description: "Returns hex 01-5A (1-90 min) or OFF"

- id: subwoofer_level
  label: Subwoofer Level
  type: string
  command: "SWLQSTN"
  query_command: "SWLQSTN"
  description: "Returns -F..00..+C (-15dB..0dB..+12dB)"

- id: center_level
  label: Center Level
  type: string
  command: "CTLQSTN"
  query_command: "CTLQSTN"
  description: "Returns -C..00..+C (-12dB..0dB..+12dB)"

- id: display_mode
  label: Display Mode
  type: enum
  command: "DIFQSTN"
  query_command: "DIFQSTN"
  values:
    - id: "00"
      label: Selector + Volume
    - id: "01"
      label: Selector + Listening Mode
    - id: "02"
      label: Digital Format (temporary)
    - id: "03"
      label: Video Format (temporary)

- id: dimmer_level
  label: Dimmer Level
  type: enum
  command: "DIMQSTN"
  query_command: "DIMQSTN"
  values:
    - id: "00"
      label: Bright
    - id: "01"
      label: Dim
    - id: "02"
      label: Dark
    - id: "03"
      label: Shut-Off
    - id: "08"
      label: Bright & LED OFF

- id: input_selector
  label: Input Selector Position
  type: string
  command: "SLIQSTN"
  query_command: "SLIQSTN"
  description: "Returns current input code (see select_input action for full mapping)"

- id: recout_selector
  label: RECOUT Selector Position
  type: string
  command: "SLRQSTN"
  query_command: "SLRQSTN"
  description: "Returns current RECOUT input code"

- id: audio_selector
  label: Audio Selector Status
  type: string
  command: "SLAQSTN"
  query_command: "SLAQSTN"
  description: "Returns current audio selector code"

- id: video_output_selector
  label: Video Output Selector (Japanese Model Only)
  type: string
  command: "VOSQSTN"
  query_command: "VOSQSTN"
  description: "Returns current video output code (D4/Component)"

- id: hdmi_output
  label: HDMI Output Selector
  type: string
  command: "HDOQSTN"
  query_command: "HDOQSTN"
  description: "Returns current HDMI output code"

- id: monitor_resolution
  label: Monitor Out Resolution
  type: string
  command: "RESQSTN"
  query_command: "RESQSTN"
  description: "Returns current resolution code"

- id: isf_mode
  label: ISF Mode State
  type: string
  command: "ISFQSTN"
  query_command: "ISFQSTN"
  description: "Returns current ISF mode code"

- id: listening_mode
  label: Listening Mode
  type: string
  command: "LMDQSTN"
  query_command: "LMDQSTN"
  description: "Returns current listening mode code (see set_listening_mode for full mapping)"

- id: late_night
  label: Late Night Level
  type: string
  command: "LTNQSTN"
  query_command: "LTNQSTN"
  description: "Returns current late night level code"

- id: cinema_filter
  label: Cinema Filter State
  type: string
  command: "RASQSTN"
  query_command: "RASQSTN"
  description: "Returns current cinema filter / Re-EQ / Academy state code"

- id: audyssey_eq
  label: Audyssey EQ State
  type: string
  command: "ADYQSTN"
  query_command: "ADYQSTN"
  description: "Returns current Audyssey EQ state code"

- id: audyssey_dynamic_eq
  label: Audyssey Dynamic EQ State
  type: string
  command: "ADQQSTN"
  query_command: "ADQQSTN"
  description: "Returns current Dynamic EQ state code"

- id: audyssey_dynamic_volume
  label: Audyssey Dynamic Volume State
  type: string
  command: "ADVQSTN"
  query_command: "ADVQSTN"
  description: "Returns current Dynamic Volume level code"

- id: dolby_volume
  label: Dolby Volume State
  type: string
  command: "DVLQSTN"
  query_command: "DVLQSTN"
  description: "Returns current Dolby Volume level code"

- id: music_optimizer
  label: Music Optimizer State
  type: string
  command: "MOTQSTN"
  query_command: "MOTQSTN"
  description: "Returns current Music Optimizer state code"

- id: audio_info
  label: Audio Information
  type: string
  command: "IFAQSTN"
  query_command: "IFAQSTN"
  description: "Returns nnnnn:nnnnn (same as immediate display, comma-separated)"

- id: video_info
  label: Video Information
  type: string
  command: "IFVQSTN"
  query_command: "IFVQSTN"
  description: "Returns nnnnn:nnnnn (same as immediate display, comma-separated)"

- id: tuning_frequency
  label: Tuning Frequency
  type: string
  command: "TUNQSTN"
  query_command: "TUNQSTN"
  description: "Returns FM nnn.nn MHz / AM nnnnn kHz as 5 digits"

- id: preset_number
  label: Preset Number
  type: string
  command: "PRSQSTN"
  query_command: "PRSQSTN"
  description: "Returns current preset number in hex"

- id: net_play_status
  label: Net/USB Play Status
  type: string
  command: "NSTQSTN"
  query_command: "NSTQSTN"
  description: "3-letter status: p=Play(S=Stop,P=Play,p=Pause,F=FF,R=FR), r=Repeat(-/R/F/1), s=Random(-/R)"

- id: net_time_info
  label: Net/USB Time Info
  type: string
  command: "NTMQSTN"
  query_command: "NTMQSTN"
  description: "mm:ss/mm:ss (elapsed/track time, max 99:59)"

- id: net_track_info
  label: Net/USB Track Info
  type: string
  command: "NTRQSTN"
  query_command: "NTRQSTN"
  description: "cccc/tttt (current track / total track, max 9999)"

- id: net_artist
  label: Net/USB Artist Name
  type: string
  command: "NATQSTN"
  query_command: "NATQSTN"
  description: "Variable-length ASCII, 64 chars max"

- id: net_album
  label: Net/USB Album Name
  type: string
  command: "NALQSTN"
  query_command: "NALQSTN"
  description: "Variable-length ASCII, 64 chars max"

- id: net_title
  label: Net/USB Title Name
  type: string
  command: "NTIQSTN"
  query_command: "NTIQSTN"
  description: "Variable-length ASCII, 64 chars max"

- id: xm_channel_name
  label: XM Channel Name
  type: string
  command: "XCNQSTN"
  query_command: "XCNQSTN"
  description: "XM channel name info"

- id: xm_artist
  label: XM Artist Name
  type: string
  command: "XATQSTN"
  query_command: "XATQSTN"
  description: "XM artist name info"

- id: xm_title
  label: XM Title
  type: string
  command: "XTIQSTN"
  query_command: "XTIQSTN"
  description: "XM title info"

- id: xm_channel
  label: XM Channel Number
  type: string
  command: "XCHQSTN"
  query_command: "XCHQSTN"
  description: "XM channel 000-255"

- id: xm_category
  label: XM Category
  type: string
  command: "XCTQSTN"
  query_command: "XCTQSTN"
  description: "XM category info"

- id: sirius_channel_name
  label: SIRIUS Channel Name
  type: string
  command: "SCNQSTN"
  query_command: "SCNQSTN"
  description: "SIRIUS channel name info"

- id: sirius_artist
  label: SIRIUS Artist Name
  type: string
  command: "SATQSTN"
  query_command: "SATQSTN"
  description: "SIRIUS artist name info"

- id: sirius_title
  label: SIRIUS Title
  type: string
  command: "STIQSTN"
  query_command: "STIQSTN"
  description: "SIRIUS title info"

- id: sirius_channel
  label: SIRIUS Channel Number
  type: string
  command: "SCHQSTN"
  query_command: "SCHQSTN"
  description: "SIRIUS channel 000-255"

- id: sirius_category
  label: SIRIUS Category
  type: string
  command: "SCTQSTN"
  query_command: "SCTQSTN"
  description: "SIRIUS category info"

- id: hd_radio_artist
  label: HD Radio Artist Name
  type: string
  command: "HATQSTN"
  query_command: "HATQSTN"
  description: "Variable-length, 64 chars max"

- id: hd_radio_channel_name
  label: HD Radio Channel Name
  type: string
  command: "HCNQSTN"
  query_command: "HCNQSTN"
  description: "Station name, 7 chars"

- id: hd_radio_title
  label: HD Radio Title
  type: string
  command: "HTIQSTN"
  query_command: "HTIQSTN"
  description: "Variable-length, 64 chars max"

- id: hd_radio_detail
  label: HD Radio Detail Info
  type: string
  command: "HDSQSTN"
  query_command: "HDSQSTN"
  description: "HD Radio title detail"

- id: hd_radio_program
  label: HD Radio Channel Program
  type: string
  command: "HPRQSTN"
  query_command: "HPRQSTN"
  description: "Returns program 01-08"

- id: hd_radio_blend
  label: HD Radio Blend Mode
  type: enum
  command: "HBLQSTN"
  query_command: "HBLQSTN"
  values:
    - id: "00"
      label: Auto
    - id: "01"
      label: Analog

- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  type: string
  command: "HTSQSTN"
  query_command: "HTSQSTN"
  description: "3 bytes mmnnoo: mm=HD status, nn=current program, oo=receivable programs bitmap"

# ===== ZONE 2 FEEDBACKS =====

- id: zone2_power_state
  label: Zone 2 Power Status
  type: enum
  command: "ZPWQSTN"
  query_command: "ZPWQSTN"
  values:
    - id: "00"
      label: Standby
    - id: "01"
      label: On

- id: zone2_mute_state
  label: Zone 2 Muting Status
  type: enum
  command: "ZMTQSTN"
  query_command: "ZMTQSTN"
  values:
    - id: "00"
      label: Off
    - id: "01"
      label: On

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  command: "ZVLQSTN"
  query_command: "ZVLQSTN"
  description: "Returns hex value 00-64 or 00-50"

- id: zone2_tone
  label: Zone 2 Tone
  type: string
  command: "ZTNQSTN"
  query_command: "ZTNQSTN"
  description: "Returns BxxTxx"

- id: zone2_balance
  label: Zone 2 Balance
  type: string
  command: "ZBLQSTN"
  query_command: "ZBLQSTN"
  description: "Returns xx=-A..00..+A"

- id: zone2_input
  label: Zone 2 Selector Position
  type: string
  command: "SLZQSTN"
  query_command: "SLZQSTN"
  description: "Returns current zone 2 input code"

- id: zone2_late_night
  label: Zone 2 Late Night Level
  type: string
  command: "LTZQSTN"
  query_command: "LTZQSTN"
  description: "Returns current late night level code"

- id: zone2_re_eq
  label: Zone 2 Re-EQ/Academy State
  type: string
  command: "RAZQSTN"
  query_command: "RAZQSTN"
  description: "Returns current Re-EQ/Academy state code"

- id: zone2_tuning_frequency
  label: Zone 2 Tuning Frequency (Separated Control)
  type: string
  command: "TUZQSTN"
  query_command: "TUZQSTN"
  description: "Returns FM nnn.nn MHz / AM nnnnn kHz"

- id: zone2_preset
  label: Zone 2 Preset Number (Separated Control)
  type: string
  command: "PRZQSTN"
  query_command: "PRZQSTN"
  description: "Returns current preset number in hex"

# ===== ZONE 3 FEEDBACKS =====

- id: zone3_power_state
  label: Zone 3 Power Status
  type: enum
  command: "PW3QSTN"
  query_command: "PW3QSTN"
  values:
    - id: "00"
      label: Standby
    - id: "01"
      label: On

- id: zone3_mute_state
  label: Zone 3 Muting Status
  type: enum
  command: "MT3QSTN"
  query_command: "MT3QSTN"
  values:
    - id: "00"
      label: Off
    - id: "01"
      label: On

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  command: "VL3QSTN"
  query_command: "VL3QSTN"
  description: "Returns hex value 00-64 or 00-50"

- id: zone3_tone
  label: Zone 3 Tone
  type: string
  command: "TN3QSTN"
  query_command: "TN3QSTN"
  description: "Returns BxxTxx"

- id: zone3_balance
  label: Zone 3 Balance
  type: string
  command: "BL3QSTN"
  query_command: "BL3QSTN"
  description: "Returns xx=-A..00..+A"

- id: zone3_input
  label: Zone 3 Selector Position
  type: string
  command: "SL3QSTN"
  query_command: "SL3QSTN"
  description: "Returns current zone 3 input code"

- id: zone3_tuning_frequency
  label: Zone 3 Tuning Frequency (Separated Control)
  type: string
  command: "TU3QSTN"
  query_command: "TU3QSTN"
  description: "Returns FM nnn.nn MHz / AM nnnnn kHz"

- id: zone3_preset
  label: Zone 3 Preset Number (Separated Control)
  type: string
  command: "PR3QSTN"
  query_command: "PR3QSTN"
  description: "Returns current preset number in hex"

# ===== ZONE 4 FEEDBACKS =====

- id: zone4_power_state
  label: Zone 4 Power Status
  type: enum
  command: "PW4QSTN"
  query_command: "PW4QSTN"
  values:
    - id: "00"
      label: Standby
    - id: "01"
      label: On

- id: zone4_mute_state
  label: Zone 4 Muting Status
  type: enum
  command: "MT4QSTN"
  query_command: "MT4QSTN"
  values:
    - id: "00"
      label: Off
    - id: "01"
      label: On

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  command: "VL4QSTN"
  query_command: "VL4QSTN"
  description: "Returns hex value 00-64 or 00-50"

- id: zone4_input
  label: Zone 4 Selector Position
  type: string
  command: "SL4QSTN"
  query_command: "SL4QSTN"
  description: "Returns current zone 4 input code"

- id: zone4_tuning_frequency
  label: Zone 4 Tuning Frequency (Separated Control)
  type: string
  command: "TU4QSTN"
  query_command: "TU4QSTN"
  description: "Returns FM nnn.nn MHz / AM nnnnn kHz"

- id: zone4_preset
  label: Zone 4 Preset Number (Separated Control)
  type: string
  command: "PR4QSTN"
  query_command: "PR4QSTN"
  description: "Returns current preset number in hex"
```

## Variables
```yaml
# UNRESOLVED: volume and tone parameters are discrete actions with inline params.
# No standalone Variables section needed - settable parameters are captured in Actions.
```

## Events
```yaml
# The receiver sends unsolicited Notification messages when system status changes.
# These arrive on the persistent connection without a prior QSTN query.
# Format is identical to response messages: "!1CCCPE"
# Source states: "If Receiver's status changes, a Status Message is sent to the Controller."
# Specific notification events are not individually enumerated - any command's
# response can arrive as a notification when state changes on the device.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: zone_power_requires_main_on
    description: "Zone 2 commands only work when main zone is ON (source: *1 only works when main is ON)"
  - id: single_connection
    description: "Only one TCP client can connect at a time. New connection disconnects existing."
  - id: message_interval
    description: "Minimum 50ms interval between messages. Receiver responds within 50ms or communication has failed."
  - id: trigger_requires_setup
    description: "12V triggers TGA/TGB/TGC only available when each trigger parameter is set to OFF in Setup Menu."
  - id: tuner_shared_zones
    description: "Tuner function is shared between MAIN and ZONE sides. Simultaneous independent control requires separated-control commands (TUZ/PRZ for Zone2, TU3/PR3 for Zone3, TU4/PR4 for Zone4)."
  - id: net_shared_zones
    description: "Net-Tune/Network function is shared by MAIN and ZONE sides. Separated control commands (NTZ/NT3/NT4) for independent zone operation."
```

## Notes
- ISCP protocol version 1.15 (31 August 2009).
- RS-232: 3-wire, DB9 female, straight-thru cable (pin 2=TX, 3=RX, 5=GND).
- eISCP TCP header: magic "ISCP", header size 0x10 (big-endian), version 0x01.
- eISCP end char varies by model: EOF, EOF+CR, or EOF+CR+LF.
- Zone 2 tone and balance only work when main is ON and Zone 2 is powered or variable.
- Net-Tune FF/REW commands must be sent continuously with no more than 100ms between codes.
- Volume parameters use hexadecimal representation (e.g., "64" hex = 100 decimal).
- Tone parameters use -A through 00 through +A notation for -10 to 0 to +10 in 2-step increments.
- XM and SIRIUS commands are model-dependent (only available on models with those tuners).
- HD Radio commands are model-dependent (only available on HD Radio models).
- RDS commands are model-dependent (only available on RDS models).
- VOS (Video Output Selector) is Japanese Model Only.
- Onkyo RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR) control connected RI devices (CD players, tape decks, DVD players, DAT recorders, MD/CD-R recorders, graphics equalizers) through the receiver.
- RAS opcode has three distinct parameter sets in source: Re-EQ/Academy Filter (00-02), Re-EQ (00-01), and Cinema Filter (00-01). All use the same 3-char code RAS — see separate action entries.
- DIF opcode covers both Display Information (00-04, temporary) and Display Mode (00-03+TG, with QSTN). DIM opcode is Dimmer Level only.
- Zone2/3/4 Net-Tune commands with 'z' suffix (NTCPLAYz etc.) are for legacy Net-Tune models; NTZ/NT3/NT4 are for current Network models.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact response timeout values beyond the stated 50ms not specified -->
<!-- UNRESOLVED: maximum cable length for RS-232 not stated -->
<!-- UNRESOLVED: eISCP connection keepalive/heartbeat mechanism not documented -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-07-14T05:28:20.548Z
last_checked_at: 2026-10-07T11:19:52.939Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:19:52.939Z
matched_actions: 493
action_count: 493
confidence: medium
summary: "All 493 action units match source command tables and transport values are supported. The source's remaining commands are already represented as spec Feedbacks. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "volume and tone parameters are discrete actions with inline params."
- "no explicit multi-step macros described in source."
- "firmware version compatibility not stated in source"
- "exact response timeout values beyond the stated 50ms not specified"
- "maximum cable length for RS-232 not stated"
- "eISCP connection keepalive/heartbeat mechanism not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
