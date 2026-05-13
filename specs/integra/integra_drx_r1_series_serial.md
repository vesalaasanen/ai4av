---
spec_id: admin/integra-drx-r1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DRX-R1 Series Control Spec"
manufacturer: Integra
model_family: "DRX-R1 Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DRX-R1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-26T13:49:59.416Z
generated_at: 2026-04-26T13:49:59.416Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - CCD
  - CT1
  - CT2
  - CEQ
  - CDT
  - CDV
  - CMD
  - CCR
  - CDS
verification:
  verdict: verified
  checked_at: 2026-04-26T13:49:59.416Z
  matched_actions: 145
  action_count: 145
  confidence: high
  summary: "All 145 spec actions matched literally in source; transport parameters verified; core receiver control comprehensively represented; RI system commands are optional peripherals."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra DRX-R1 Series Control Spec

## Summary

Integra DRX-R1 Series AV Receiver control via ISCP (Integra Serial Control Protocol) over RS-232C and eISCP over Ethernet (TCP). The protocol uses a fixed 3-character command code plus variable-length parameter, prefixed with `!1` (start character + receiver unit type). Supports multi-zone control (Zone 2, Zone 3, Zone 4), input routing, volume/tone, listening modes, tuner, network/USB playback, and 12V triggers. All commands support a `QSTN` parameter for state queries, and the receiver sends unsolicited status notifications when state changes.

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
  connector: DB9 female (pin 2 TX, pin 3 RX, pin 5 GND)
  cable_type: straight-thru
addressing:
  port: 60128
  port_range: "49152-65535"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PWR, ZPW, PW3, PW4 power commands
  - queryable    # QSTN parameter supported on most commands
  - routable     # SLI, SLZ, SL3, SL4 input selector commands
  - levelable    # MVL, ZVL, VL3, VL4 volume; tone controls; sub/center level
```

## Actions
```yaml
# ISCP framing: !1{CMD}{PARAM}{END}
# RS-232 end chars: CR (0x0D) or LF (0x0A) or CRLF
# eISCP end chars: EOF (0x1A) or EOF+CR or EOF+CR+LF
# Numeric params use uppercase hexadecimal representation unless noted.

# ── System / Amplifier ──

- id: system_power
  label: Set System Power
  kind: action
  command: PWR
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Standby
        - code: "01"
          label: On

- id: audio_mute
  label: Set Audio Muting
  kind: action
  command: AMT
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Muting Off
        - code: "01"
          label: Muting On
        - code: TG
          label: Toggle

- id: speaker_a
  label: Set Speaker A
  kind: action
  command: SPA
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: UP
          label: Toggle

- id: speaker_b
  label: Set Speaker B
  kind: action
  command: SPB
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: UP
          label: Toggle

- id: speaker_layout
  label: Set Speaker Layout
  kind: action
  command: SPL
  params:
    - name: layout
      type: enum
      values:
        - code: SB
          label: Surround Back
        - code: FH
          label: Front High / SurrBack+Front High
        - code: FW
          label: Front Wide / SurrBack+Front Wide
        - code: UP
          label: Toggle

- id: master_volume
  label: Set Master Volume
  kind: action
  command: MVL
  params:
    - name: level
      type: string
      description: "Hex 00-64 for level 0-100 (or 00-50 for level 0-80 depending on model), UP, DOWN, UP1, DOWN1"

- id: tone_front
  label: Set Front Tone
  kind: action
  command: TFR
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A, -10..0..+10 in 2-step), BUP, BDOWN, TUP, TDOWN"

- id: tone_front_wide
  label: Set Front Wide Tone
  kind: action
  command: TFW
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A), BUP, BDOWN, TUP, TDOWN"

- id: tone_front_high
  label: Set Front High Tone
  kind: action
  command: TFH
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A), BUP, BDOWN, TUP, TDOWN"

- id: tone_center
  label: Set Center Tone
  kind: action
  command: TCT
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A), BUP, BDOWN, TUP, TDOWN"

- id: tone_surround
  label: Set Surround Tone
  kind: action
  command: TSR
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A), BUP, BDOWN, TUP, TDOWN"

- id: tone_surround_back
  label: Set Surround Back Tone
  kind: action
  command: TSB
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A), BUP, BDOWN, TUP, TDOWN"

- id: tone_subwoofer
  label: Set Subwoofer Tone
  kind: action
  command: TSW
  params:
    - name: setting
      type: string
      description: "Bxx (xx: -A..00..+A), BUP, BDOWN"

- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: SLP
  params:
    - name: time
      type: string
      description: "Hex 01-5A for 1-90 min, OFF, UP (toggle)"

- id: speaker_level_cal
  label: Speaker Level Calibration
  kind: action
  command: SLC
  params:
    - name: key
      type: enum
      values:
        - code: TEST
          label: Test Tone
        - code: CHSEL
          label: Channel Select
        - code: UP
          label: Level Up
        - code: DOWN
          label: Level Down

- id: subwoofer_level
  label: Set Subwoofer Level
  kind: action
  command: SWL
  params:
    - name: level
      type: string
      description: "Range -F..00..+C (-15dB..0..+12dB), UP, DOWN"

- id: center_level
  label: Set Center Level
  kind: action
  command: CTL
  params:
    - name: level
      type: string
      description: "Range -C..00..+C (-12dB..0..+12dB), UP, DOWN"

- id: dimmer_level
  label: Set Dimmer Level
  kind: action
  command: DIM
  params:
    - name: level
      type: enum
      values:
        - code: "00"
          label: Bright
        - code: "01"
          label: Dim
        - code: "02"
          label: Dark
        - code: "03"
          label: Shut-Off
        - code: "08"
          label: Bright & LED OFF
        - code: DIM
          label: Toggle

- id: display_info
  label: Set Display Information
  kind: action
  command: DIF
  params:
    - name: info
      type: enum
      values:
        - code: "00"
          label: Program Format
        - code: "01"
          label: Digital Input Position
        - code: "02"
          label: Digital Format Position
        - code: "03"
          label: Bass Level
        - code: "04"
          label: Treble Level

- id: display_mode
  label: Set Display Mode
  kind: action
  command: DIF
  params:
    - name: mode
      type: enum
      values:
        - code: "00"
          label: Selector + Volume
        - code: "01"
          label: Selector + Listening Mode
        - code: "02"
          label: Digital Format (temporary)
        - code: "03"
          label: Video Format (temporary)
        - code: TG
          label: Toggle

- id: setup_osd
  label: Setup OSD Navigation
  kind: action
  command: OSD
  params:
    - name: key
      type: enum
      values:
        - code: MENU
          label: Menu
        - code: UP
          label: Up
        - code: DOWN
          label: Down
        - code: RIGHT
          label: Right
        - code: LEFT
          label: Left
        - code: ENTER
          label: Enter
        - code: EXIT
          label: Exit
        - code: AUDIO
          label: Audio Adjust
        - code: VIDEO
          label: Video Adjust

- id: memory_setup
  label: Memory Setup
  kind: action
  command: MEM
  params:
    - name: operation
      type: enum
      values:
        - code: STR
          label: Store
        - code: RCL
          label: Recall
        - code: LOCK
          label: Lock
        - code: UNLK
          label: Unlock

# ── Input / Output Routing ──

- id: input_select
  label: Select Input
  kind: action
  command: SLI
  params:
    - name: input
      type: enum
      values:
        - code: "00"
          label: VIDEO1 / VCR-DVR
        - code: "01"
          label: VIDEO2 / CBL-SAT
        - code: "02"
          label: VIDEO3 / GAME-TV
        - code: "03"
          label: VIDEO4 / AUX1
        - code: "04"
          label: VIDEO5 / AUX2
        - code: "05"
          label: VIDEO6
        - code: "06"
          label: VIDEO7
        - code: "10"
          label: DVD
        - code: "20"
          label: TAPE1 / TV-TAPE
        - code: "21"
          label: TAPE2
        - code: "22"
          label: PHONO
        - code: "23"
          label: CD
        - code: "24"
          label: FM
        - code: "25"
          label: AM
        - code: "26"
          label: TUNER
        - code: "27"
          label: MUSIC SERVER
        - code: "28"
          label: INTERNET RADIO
        - code: "29"
          label: USB-Front
        - code: 2A
          label: USB-Rear
        - code: "30"
          label: MULTI CH
        - code: "31"
          label: XM
        - code: "32"
          label: SIRIUS
        - code: "40"
          label: Universal PORT
        - code: UP
          label: Next (wrap-around)
        - code: DOWN
          label: Previous (wrap-around)

- id: recout_select
  label: Select Record Output
  kind: action
  command: SLR
  params:
    - name: input
      type: string
      description: "Same hex codes as SLI (00-06,10,20-28,30,31), plus 7F=OFF, 80=SOURCE"

- id: audio_select
  label: Select Audio Input
  kind: action
  command: SLA
  params:
    - name: input
      type: enum
      values:
        - code: "00"
          label: AUTO
        - code: "01"
          label: MULTI-CHANNEL
        - code: "02"
          label: ANALOG
        - code: "03"
          label: iLINK
        - code: "04"
          label: HDMI
        - code: "05"
          label: COAX-OPT
        - code: "06"
          label: BALANCE
        - code: UP
          label: Toggle

- id: trigger_a
  label: Set 12V Trigger A
  kind: action
  command: TGA
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On

- id: trigger_b
  label: Set 12V Trigger B
  kind: action
  command: TGB
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On

- id: trigger_c
  label: Set 12V Trigger C
  kind: action
  command: TGC
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On

- id: hdmi_output
  label: Set HDMI Output
  kind: action
  command: HDO
  params:
    - name: output
      type: enum
      values:
        - code: "00"
          label: No Analog
        - code: "01"
          label: Out Main (HDMI Main)
        - code: "02"
          label: Out Sub (HDMI Sub)
        - code: "03"
          label: Both
        - code: "04"
          label: Both (Main)
        - code: "05"
          label: Both (Sub)
        - code: UP
          label: Toggle

- id: monitor_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: RES
  params:
    - name: resolution
      type: enum
      values:
        - code: "00"
          label: Through
        - code: "01"
          label: Auto (HDMI only)
        - code: "02"
          label: 480p
        - code: "03"
          label: 720p
        - code: "04"
          label: 1080i
        - code: "05"
          label: 1080p (HDMI only)
        - code: "07"
          label: 1080p/24fs (HDMI only)
        - code: "06"
          label: Source
        - code: UP
          label: Toggle

- id: isf_mode
  label: Set ISF Mode
  kind: action
  command: ISF
  params:
    - name: mode
      type: enum
      values:
        - code: "00"
          label: Custom
        - code: "01"
          label: Day
        - code: "02"
          label: Night
        - code: UP
          label: Toggle

# ── Surround / Listening Mode ──

- id: listening_mode
  label: Set Listening Mode
  kind: action
  command: LMD
  params:
    - name: mode
      type: string
      description: "Hex code or named: 00=STEREO,01=DIRECT,02=SURROUND,04=THX,0F=MONO,11=PURE AUDIO,40=5.1ch/Straight Decode,80=PLII-Movie,81=PLII-Music,82=Neo6 Cinema,90=PLIIz Height,UP/DOWN=wrap-around,MOVIE/MUSIC/GAME=category wrap-around"

- id: late_night
  label: Set Late Night Mode
  kind: action
  command: LTN
  params:
    - name: mode
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: Low (DD) / On (TrueHD)
        - code: "02"
          label: High (DD)
        - code: "03"
          label: Auto (TrueHD)
        - code: UP
          label: Toggle

- id: cinema_filter
  label: Set Cinema Filter
  kind: action
  command: RAS
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: UP
          label: Toggle

- id: audyssey
  label: Set Audyssey EQ
  kind: action
  command: ADY
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: UP
          label: Toggle

- id: audyssey_dynamic_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: ADQ
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: UP
          label: Toggle

- id: audyssey_dynamic_volume
  label: Set Audyssey Dynamic Volume
  kind: action
  command: ADV
  params:
    - name: level
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: Light
        - code: "02"
          label: Medium
        - code: "03"
          label: Heavy
        - code: UP
          label: Toggle

- id: dolby_volume
  label: Set Dolby Volume
  kind: action
  command: DVL
  params:
    - name: level
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: Low
        - code: "02"
          label: Mid
        - code: "03"
          label: High
        - code: UP
          label: Toggle

- id: music_optimizer
  label: Set Music Optimizer
  kind: action
  command: MOT
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: UP
          label: Toggle

# ── Network / USB ──

- id: net_usb_operation
  label: Network/USB Transport Control
  kind: action
  command: NTC
  params:
    - name: key
      type: enum
      values:
        - code: PLAY
          label: Play
        - code: STOP
          label: Stop
        - code: PAUSE
          label: Pause
        - code: TRUP
          label: Track Up
        - code: TRDN
          label: Track Down
        - code: FF
          label: Fast Forward
        - code: REW
          label: Rewind
        - code: REPEAT
          label: Repeat
        - code: RANDOM
          label: Random
        - code: DISPLAY
          label: Display
        - code: ALBUM
          label: Album
        - code: ARTIST
          label: Artist
        - code: GENRE
          label: Genre
        - code: PLAYLIST
          label: Playlist
        - code: RIGHT
          label: Right
        - code: LEFT
          label: Left
        - code: UP
          label: Up
        - code: DOWN
          label: Down
        - code: SELECT
          label: Select
        - code: SETUP
          label: Setup
        - code: RETURN
          label: Return
        - code: CHUP
          label: Channel Up (iRadio)
        - code: CHDN
          label: Channel Down (iRadio)

- id: internet_radio_preset
  label: Internet Radio Preset
  kind: action
  command: NPR
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40"

# ── Zone 2 ──

- id: zone2_power
  label: Set Zone 2 Power
  kind: action
  command: ZPW
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Standby
        - code: "01"
          label: On

- id: zone2_mute
  label: Set Zone 2 Muting
  kind: action
  command: ZMT
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: TG
          label: Toggle

- id: zone2_volume
  label: Set Zone 2 Volume
  kind: action
  command: ZVL
  params:
    - name: level
      type: string
      description: "Hex 00-64 for level 0-100 (or 00-50 for 0-80), UP, DOWN. Only works when main is ON."

- id: zone2_tone
  label: Set Zone 2 Tone
  kind: action
  command: ZTN
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A), BUP, BDOWN, TUP, TDOWN. Only when main ON and Zone2 powered/variable."

- id: zone2_balance
  label: Set Zone 2 Balance
  kind: action
  command: ZBL
  params:
    - name: balance
      type: string
      description: "xx (-A..00..+A, -10..0..+10 in 2-step), UP, DOWN"

- id: zone2_input_select
  label: Select Zone 2 Input
  kind: action
  command: SLZ
  params:
    - name: input
      type: enum
      values:
        - code: "00"
          label: VIDEO1 / VCR-DVR
        - code: "01"
          label: VIDEO2 / CBL-SAT
        - code: "02"
          label: VIDEO3 / GAME-TV
        - code: "03"
          label: VIDEO4 / AUX1
        - code: "04"
          label: VIDEO5 / AUX2
        - code: "10"
          label: DVD
        - code: "20"
          label: TAPE1
        - code: "22"
          label: PHONO
        - code: "23"
          label: CD
        - code: "24"
          label: FM
        - code: "25"
          label: AM
        - code: "26"
          label: TUNER
        - code: "27"
          label: MUSIC SERVER
        - code: "28"
          label: INTERNET RADIO
        - code: "29"
          label: USB-Front
        - code: 2A
          label: USB-Rear
        - code: "40"
          label: Universal PORT
        - code: "80"
          label: SOURCE

- id: zone2_listening_mode
  label: Set Zone 2 Listening Mode
  kind: action
  command: LMZ
  params:
    - name: mode
      type: enum
      values:
        - code: "00"
          label: STEREO
        - code: "01"
          label: DIRECT
        - code: "0F"
          label: MONO
        - code: "12"
          label: MULTIPLEX
        - code: "87"
          label: DVS (PL2)
        - code: "88"
          label: DVS (NEO6)

# ── Zone 3 ──

- id: zone3_power
  label: Set Zone 3 Power
  kind: action
  command: PW3
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Standby
        - code: "01"
          label: On

- id: zone3_mute
  label: Set Zone 3 Muting
  kind: action
  command: MT3
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: TG
          label: Toggle

- id: zone3_volume
  label: Set Zone 3 Volume
  kind: action
  command: VL3
  params:
    - name: level
      type: string
      description: "Hex 00-64 for level 0-100 (or 00-50 for 0-80), UP, DOWN"

- id: zone3_tone
  label: Set Zone 3 Tone
  kind: action
  command: TN3
  params:
    - name: setting
      type: string
      description: "Bxx/Txx (xx: -A..00..+A), BUP, BDOWN, TUP, TDOWN"

- id: zone3_balance
  label: Set Zone 3 Balance
  kind: action
  command: BL3
  params:
    - name: balance
      type: string
      description: "xx (-A..00..+A), UP, DOWN"

- id: zone3_input_select
  label: Select Zone 3 Input
  kind: action
  command: SL3
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI (00-06,10,20-21,22-2A,30-32,40,80)"

# ── Zone 4 ──

- id: zone4_power
  label: Set Zone 4 Power
  kind: action
  command: PW4
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Standby
        - code: "01"
          label: On

- id: zone4_mute
  label: Set Zone 4 Muting
  kind: action
  command: MT4
  params:
    - name: state
      type: enum
      values:
        - code: "00"
          label: Off
        - code: "01"
          label: On
        - code: TG
          label: Toggle

- id: zone4_volume
  label: Set Zone 4 Volume
  kind: action
  command: VL4
  params:
    - name: level
      type: string
      description: "Hex 00-64 for level 0-100 (or 00-50 for 0-80), UP, DOWN"

- id: zone4_input_select
  label: Select Zone 4 Input
  kind: action
  command: SL4
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI (00-06,10,20-21,22-2A,30-32,40,80)"
# ── Tuner (Main Zone) ──

- id: tuner_tune
  label: Set Tuning Frequency
  kind: action
  command: TUN
  params:
    - name: frequency
      type: string
      description: "nnnnn for direct tune (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch), UP, DOWN"

- id: tuner_preset
  label: Set Tuner Preset
  kind: action
  command: PRS
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40, or 01-1E for 1-30, UP, DOWN"

- id: tuner_preset_memory
  label: Store Tuner Preset Memory
  kind: action
  command: PRM
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40 (In hexadecimal representation)"

- id: rds_display
  label: RDS Information Display
  kind: action
  command: RDS
  params:
    - name: mode
      type: string
      description: "00=RT Information, 01=PTY Information, 02=TP Information, UP=Wrap-Around"

- id: pty_scan
  label: PTY Scan
  kind: action
  command: PTS
  params:
    - name: pty
      type: string
      description: "Hex 00-1E for PTY No 0-30, or ENTER to finish"

- id: tp_scan
  label: TP Scan
  kind: action
  command: TPS
  params:
    - name: action
      type: string
      description: "Empty string to start TP scan, ENTER to finish"

# ── XM Radio ──

- id: xm_channel_name
  label: XM Channel Name Info
  kind: query
  command: XCN
  params:
    - name: name
      type: string
      description: "XM Channel Name (variable-length)"

- id: xm_artist_name
  label: XM Artist Name Info
  kind: query
  command: XAT
  params:
    - name: name
      type: string
      description: "XM Artist Name (variable-length)"

- id: xm_title
  label: XM Title Info
  kind: query
  command: XTI
  params:
    - name: title
      type: string
      description: "XM Title (variable-length)"

- id: xm_channel_number
  label: XM Channel Number
  kind: action
  command: XCH
  params:
    - name: channel
      type: string
      description: "000-255 for direct channel, UP, DOWN"

- id: xm_category
  label: XM Category
  kind: action
  command: XCT
  params:
    - name: category
      type: string
      description: "XM Category Info (variable-length), UP, DOWN"

# ── SIRIUS Radio ──

- id: sirius_channel_name
  label: SIRIUS Channel Name Info
  kind: query
  command: SCN
  params:
    - name: name
      type: string
      description: "SIRIUS Channel Name (variable-length)"

- id: sirius_artist_name
  label: SIRIUS Artist Name Info
  kind: query
  command: SAT
  params:
    - name: name
      type: string
      description: "SIRIUS Artist Name (variable-length)"

- id: sirius_title
  label: SIRIUS Title Info
  kind: query
  command: STI
  params:
    - name: title
      type: string
      description: "SIRIUS Title (variable-length)"

- id: sirius_channel_number
  label: SIRIUS Channel Number
  kind: action
  command: SCH
  params:
    - name: channel
      type: string
      description: "000-255 for direct channel, UP, DOWN"

- id: sirius_category
  label: SIRIUS Category
  kind: action
  command: SCT
  params:
    - name: category
      type: string
      description: "SIRIUS Category Info (variable-length), UP, DOWN"

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  command: SLK
  params:
    - name: password
      type: string
      description: "nnnn = 4-digit lock password, INPUT = show prompt, WRONG = wrong password"

# ── HD Radio ──

- id: hd_radio_artist_name
  label: HD Radio Artist Name Info
  kind: query
  command: HAT
  params:
    - name: name
      type: string
      description: "HD Radio Artist Name (variable-length, 64 digits max)"

- id: hd_radio_channel_name
  label: HD Radio Channel Name Info
  kind: query
  command: HCN
  params:
    - name: name
      type: string
      description: "HD Radio Channel Name / Station Name (7 digits)"

- id: hd_radio_title
  label: HD Radio Title Info
  kind: query
  command: HTI
  params:
    - name: title
      type: string
      description: "HD Radio Title (variable-length, 64 digits max)"

- id: hd_radio_detail_info
  label: HD Radio Detail Info
  kind: query
  command: HDS
  params:
    - name: info
      type: string
      description: "HD Radio detail info (variable-length)"

- id: hd_radio_channel_program
  label: HD Radio Channel Program
  kind: action
  command: HPR
  params:
    - name: program
      type: string
      description: "Hex 01-08 for HD Radio channel program"

- id: hd_radio_blend_mode
  label: HD Radio Blend Mode
  kind: action
  command: HBL
  params:
    - name: mode
      type: string
      description: "00=Auto, 01=Analog"

- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  kind: query
  command: HTS
  params:
    - name: status
      type: string
      description: "mmnnoo: mm=00 not HD/01 HD, nn=current program 01-08, oo=receivable programs bitmask"

# ── Zone 2 Additional ──

- id: zone2_tune
  label: Zone 2 Tuning (Separated Control)
  kind: action
  command: TUZ
  params:
    - name: frequency
      type: string
      description: "nnnnn for direct tune frequency, UP, DOWN"

- id: zone2_preset
  label: Zone 2 Preset (Separated Control)
  kind: action
  command: PRZ
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40, UP, DOWN"

- id: zone2_net_operation
  label: Zone 2 Network/USB Operation
  kind: action
  command: NTZ
  params:
    - name: key
      type: string
      description: "PLAY, STOP, PAUSE, TRUP, TRDN, CHUP, CHDN"

- id: zone2_internet_radio_preset
  label: Zone 2 Internet Radio Preset
  kind: action
  command: NPZ
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40"

- id: zone2_late_night
  label: Zone 2 Late Night
  kind: action
  command: LTZ
  params:
    - name: mode
      type: string
      description: "00=Off, 01=Low, 02=High, UP=Toggle"

- id: zone2_re_eq
  label: Zone 2 Re-EQ / Academy Filter
  kind: action
  command: RAZ
  params:
    - name: mode
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=Toggle"

# ── Zone 3 Additional ──

- id: zone3_tune
  label: Zone 3 Tuning (Separated Control)
  kind: action
  command: TU3
  params:
    - name: frequency
      type: string
      description: "nnnnn for direct tune frequency, UP, DOWN"

- id: zone3_preset
  label: Zone 3 Preset (Separated Control)
  kind: action
  command: PR3
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40, UP, DOWN"

- id: zone3_net_operation
  label: Zone 3 Network/USB Operation
  kind: action
  command: NT3
  params:
    - name: key
      type: string
      description: "PLAY, STOP, PAUSE, TRUP, TRDN, CHUP, CHDN"

- id: zone3_internet_radio_preset
  label: Zone 3 Internet Radio Preset
  kind: action
  command: NP3
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40"

# ── Zone 4 Additional ──

- id: zone4_tune
  label: Zone 4 Tuning (Separated Control)
  kind: action
  command: TU4
  params:
    - name: frequency
      type: string
      description: "nnnnn for direct tune frequency, UP, DOWN"

- id: zone4_preset
  label: Zone 4 Preset (Separated Control)
  kind: action
  command: PR4
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40, UP, DOWN"

- id: zone4_net_operation
  label: Zone 4 Network/USB Operation
  kind: action
  command: NT4
  params:
    - name: key
      type: string
      description: "PLAY, STOP, PAUSE, TRUP, TRDN"

- id: zone4_internet_radio_preset
  label: Zone 4 Internet Radio Preset
  kind: action
  command: NP4
  params:
    - name: preset
      type: string
      description: "Hex 01-28 for preset 1-40"
```

## Feedbacks
```yaml
# All feedbacks obtained by sending command + "QSTN" parameter.
# Device responds with command + current value code.
# Device also sends unsolicited notifications when state changes (see Events).

- id: power_state
  label: System Power State
  command: PWR
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Standby
    - code: "01"
      label: On

- id: mute_state
  label: Audio Muting State
  command: AMT
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: speaker_a_state
  label: Speaker A State
  command: SPA
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: speaker_b_state
  label: Speaker B State
  command: SPB
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: speaker_layout_state
  label: Speaker Layout State
  command: SPL
  query: QSTN
  type: enum
  values:
    - code: SB
      label: Surround Back
    - code: FH
      label: Front High
    - code: FW
      label: Front Wide

- id: volume_level
  label: Master Volume Level
  command: MVL
  query: QSTN
  type: string
  description: "Hex 00-64 (0-100) or 00-50 (0-80)"

- id: tone_front_state
  label: Front Tone State
  command: TFR
  query: QSTN
  type: string
  description: "Returns BxxTxx format"

- id: input_position
  label: Input Selector Position
  command: SLI
  query: QSTN
  type: string
  description: "Hex code matching SLI input values"

- id: recout_position
  label: RECOUT Selector Position
  command: SLR
  query: QSTN
  type: string
  description: "Hex code matching SLR output values"

- id: audio_selector_state
  label: Audio Selector State
  command: SLA
  query: QSTN
  type: string
  description: "Hex code 00-06"

- id: hdmi_output_state
  label: HDMI Output State
  command: HDO
  query: QSTN
  type: string
  description: "Hex code 00-05"

- id: resolution_state
  label: Monitor Out Resolution
  command: RES
  query: QSTN
  type: string
  description: "Hex code 00-07"

- id: isf_mode_state
  label: ISF Mode State
  command: ISF
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Custom
    - code: "01"
      label: Day
    - code: "02"
      label: Night

- id: listening_mode_state
  label: Listening Mode State
  command: LMD
  query: QSTN
  type: string
  description: "Hex code (see LMD action for full mapping)"

- id: late_night_state
  label: Late Night Level
  command: LTN
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: Low / On
    - code: "02"
      label: High
    - code: "03"
      label: Auto

- id: cinema_filter_state
  label: Cinema Filter State
  command: RAS
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: audyssey_state
  label: Audyssey EQ State
  command: ADY
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: audyssey_deq_state
  label: Audyssey Dynamic EQ State
  command: ADQ
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: audyssey_dvol_state
  label: Audyssey Dynamic Volume State
  command: ADV
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: Light
    - code: "02"
      label: Medium
    - code: "03"
      label: Heavy

- id: dolby_volume_state
  label: Dolby Volume State
  command: DVL
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: Low
    - code: "02"
      label: Mid
    - code: "03"
      label: High

- id: music_optimizer_state
  label: Music Optimizer State
  command: MOT
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: dimmer_state
  label: Dimmer Level
  command: DIM
  query: QSTN
  type: string
  description: "Hex code 00-03,08"

- id: display_mode_state
  label: Display Mode State
  command: DIF
  query: QSTN
  type: string
  description: "Hex code 00-03"

- id: sleep_time
  label: Sleep Time
  command: SLP
  query: QSTN
  type: string
  description: "Hex 01-5A (1-90 min) or OFF"

- id: subwoofer_level_state
  label: Subwoofer Level
  command: SWL
  query: QSTN
  type: string
  description: "Range -F..00..+C (-15dB..0..+12dB)"

- id: center_level_state
  label: Center Level
  command: CTL
  query: QSTN
  type: string
  description: "Range -C..00..+C (-12dB..0..+12dB)"

- id: audio_info
  label: Audio Information
  command: IFA
  query: QSTN
  type: string
  description: "Audio info string (same as immediate display), fields separated by commas"

- id: video_info
  label: Video Information
  command: IFV
  query: QSTN
  type: string
  description: "Video info string (same as immediate display), fields separated by commas"

- id: net_usb_artist
  label: Net/USB Artist Name
  command: NAT
  query: QSTN
  type: string
  description: "Up to 64 ASCII characters"

- id: net_usb_album
  label: Net/USB Album Name
  command: NAL
  query: QSTN
  type: string
  description: "Up to 64 ASCII characters"

- id: net_usb_title
  label: Net/USB Title Name
  command: NTI
  query: QSTN
  type: string
  description: "Up to 64 ASCII characters"

- id: net_usb_time
  label: Net/USB Time Info
  command: NTM
  query: QSTN
  type: string
  description: "mm:ss/mm:ss (elapsed/track time, max 99:59)"

- id: net_usb_track
  label: Net/USB Track Info
  command: NTR
  query: QSTN
  type: string
  description: "cccc/tttt (current track/total tracks, max 9999)"

- id: net_usb_status
  label: Net/USB Play Status
  command: NST
  query: QSTN
  type: string
  description: "3 chars: p=Play(S=Stop,P=Play,p=Pause,F=FF,R=FR), r=Repeat(-=Off,R=All,F=Folder,1=One)"

- id: zone2_power_state
  label: Zone 2 Power State
  command: ZPW
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Standby
    - code: "01"
      label: On

- id: zone2_mute_state
  label: Zone 2 Muting State
  command: ZMT
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: zone2_volume_level
  label: Zone 2 Volume Level
  command: ZVL
  query: QSTN
  type: string
  description: "Hex 00-64 or 00-50"

- id: zone2_input_position
  label: Zone 2 Input Position
  command: SLZ
  query: QSTN
  type: string
  description: "Hex code matching SLZ input values"

- id: zone2_balance_state
  label: Zone 2 Balance
  command: ZBL
  query: QSTN
  type: string
  description: "xx (-A..00..+A)"

- id: zone3_power_state
  label: Zone 3 Power State
  command: PW3
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Standby
    - code: "01"
      label: On

- id: zone3_mute_state
  label: Zone 3 Muting State
  command: MT3
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: zone3_volume_level
  label: Zone 3 Volume Level
  command: VL3
  query: QSTN
  type: string
  description: "Hex 00-64 or 00-50"

- id: zone3_input_position
  label: Zone 3 Input Position
  command: SL3
  query: QSTN
  type: string
  description: "Hex code matching SL3 input values"

- id: zone4_power_state
  label: Zone 4 Power State
  command: PW4
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Standby
    - code: "01"
      label: On

- id: zone4_mute_state
  label: Zone 4 Muting State
  command: MT4
  query: QSTN
  type: enum
  values:
    - code: "00"
      label: Off
    - code: "01"
      label: On

- id: zone4_volume_level
  label: Zone 4 Volume Level
  command: VL4
  query: QSTN
  type: string
  description: "Hex 00-64 or 00-50"

- id: zone4_input_position
  label: Zone 4 Input Position
  command: SL4
  query: QSTN
  type: string
  description: "Hex code matching SL4 input values"
```

## Variables
```yaml
# UNRESOLVED: no continuously variable settable parameters distinct from the actions above
# Volume, tone, balance, and level are covered as action params.
```

## Events
```yaml
# The receiver sends unsolicited status messages when its state changes
# (Event Notice Communication, source section 2.3).
# Format is identical to query responses: !1{CMD}{VALUE}{END}
# Must maintain persistent TCP connection to receive events over eISCP.

- id: status_notification
  label: Unsolicited Status Change
  type: string
  description: "Sent when any receiver state changes. Format: ISCP command + new value (e.g. SLI03 when input changes to VIDEO4)."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Zone 2 volume/tone/balance only operational when main zone is ON"
  - "Zone 2 volume/tone/balance only operational when Zone 2 is powered or set to variable"
  - "12V triggers (TGA/TGB/TGC) only available when each trigger parameter is set to OFF in Setup Menu"
# UNRESOLVED: no power-on sequencing requirements or safety interlocks stated in source
```

## Notes

### ISCP Command Framing

All ISCP commands share the same format regardless of transport:
```
!1{CMD}{PARAM}{END}
```
- `!` — start character
- `1` — unit type character for Receiver
- `{CMD}` — 3-character command code (e.g., PWR, MVL, SLI)
- `{PARAM}` — variable-length parameter code
- `{END}` — end character(s)

**RS-232 end characters:** CR (0x0D), LF (0x0A), or CR+LF
**eISCP end characters:** EOF (0x1A), EOF+CR, or EOF+CR+LF (model-dependent)

### eISCP Packet Structure (TCP)

The eISCP packet wraps the ISCP message in a binary header:

| Offset | Size | Field | Value |
|--------|------|-------|-------|
| 0 | 4 | Magic | `ISCP` (ASCII) |
| 4 | 4 | Header Size | 0x00000010 (16, big-endian) |
| 8 | 4 | Data Size | size of ISCP data (big-endian) |
| 12 | 1 | Version | 0x01 |
| 13 | 3 | Reserved | 0x000000 |

### Timing and Connection Constraints

- Minimum 50ms interval between messages (both directions)
- Receiver responds within 50ms; if no response, communication has failed
- TCP: only one client connection at a time
- TCP: connection must be held continuously to receive unsolicited event notifications
- FF/REW over Net-Tune: commands must be sent continuously with no more than 100ms between codes

### Numeric Parameter Encoding

Volume levels (MVL, ZVL, VL3, VL4) and sleep timer (SLP) use **uppercase hexadecimal** representation. For example, volume level 50 decimal = hex "32", sent as `!1MVL32`.

### Volume Range

Volume range is model-dependent: 0-100 (hex 00-64) or 0-80 (hex 00-50). The source documents both ranges.

### Tuner Sharing

The TUNER/XM/SIRIUS/HD Radio function is shared between MAIN and ZONE sides. Zone 3 and Zone 4 tuner control (TU3, PR3, TU4, PR4) uses separated control from main zone.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact DRX-R1 sub-models covered by this protocol not specified -->
<!-- UNRESOLVED: protocol version 1.15 is the document version; ISCP version 0x01 is the wire version — compatibility range unknown -->
<!-- UNRESOLVED: Tuner, XM, SIRIUS, HD Radio, and RI System commands not fully enumerated in Actions — these are model-optional and documented in source sections "Tuner-related Command Support List" through "Dock-related Command Support List" -->
<!-- UNRESOLVED: video output selector (VOS) is Japanese model only -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-26T13:49:59.416Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T13:49:59.416Z
matched_actions: 145
action_count: 145
confidence: high
summary: "All 145 spec actions matched literally in source; transport parameters verified; core receiver control comprehensively represented; RI system commands are optional peripherals."
```

## Known Gaps

```yaml
- CCD
- CT1
- CT2
- CEQ
- CDT
- CDV
- CMD
- CCR
- CDS
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
