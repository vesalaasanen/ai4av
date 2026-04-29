---
schema_version: ai4av-public-spec-v1
device_id: integra/dsx-3
entity_id: integra_dsx_3
spec_id: admin/integra-dsx-3
revision: 1
author: admin
title: "Integra DSX-3 Control Spec"
status: published
manufacturer: Integra
manufacturer_key: integra
model_family: DSX-3
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DSX-3
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:20.402Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:22.333Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:26.686Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:31.200Z
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-26T13:53:42.933Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps:
  - TUZ
  - PRZ
  - TU3
  - PR3
  - TU4
  - PR4
  - PTS
  - PRM
  - XCN
  - XAT
  - XTI
  - XCH
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T13:53:42.933Z
  matched_actions: 124
  action_count: 124
  confidence: high
  summary: "All 124 spec commands have literal matches in source; transport verified; spec correctly omits model-specific RI, tuning variant, and satellite radio commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra DSX-3 Control Spec

## Summary
The Integra DSX-3 is an AV receiver controllable via ISCP (Integra Serial Control Protocol) over RS-232C or Ethernet (eISCP over TCP). Commands are ASCII strings composed of a 3-character command code followed by a variable-length parameter. The device supports multi-zone audio (Zones 2–4), input routing, volume/tone control, listening mode selection, tuner control, and network/USB playback. Unsolicited status notifications are sent when the receiver state changes.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128
  # Port is configurable 49152-65535 via receiver setup menu
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
  - powerable    # PWR command: power on/off/standby
  - queryable    # QSTN suffix queries current state for most commands
  - routable     # SLI/SLR/SLZ/SL3/SL4 input selector commands
  - levelable    # MVL/ZVL/VL3/VL4 volume, tone controls, balance
```

## Actions
```yaml
# ISCP command format (serial): !1<CCC><PP>[CR|LF]
# eISCP command format (TCP): 16-byte header + ISCP data payload
# Unit type character "1" = Receiver
# Parameters marked "QSTN" are queries, listed in Feedbacks section.
# Volume values are hexadecimal representation.

# --- System Power ---
- id: power_on
  label: Power On
  kind: action
  command: "!1PWR01"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "!1PWR00"
  params: []

# --- Audio Muting ---
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

# --- Master Volume ---
- id: volume_set
  label: Set Volume Level
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: "Hex value 00-64 (0-100 decimal) or 00-50 (0-80 decimal)"

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

# --- Input Selector ---
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
        - "02"  # VIDEO3 / GAME/TV
        - "03"  # VIDEO4 / AUX1
        - "04"  # VIDEO5 / AUX2
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE1 / TV/TAPE
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
        - "40"  # Universal PORT
        - "30"  # MULTI CH
        - "31"  # XM
        - "32"  # SIRIUS
      description: "Input selector code (hex)"

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

# --- Audio Selector ---
- id: select_audio
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
      description: "Audio selector code"

# --- Listening Mode ---
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
        - "0F"  # MONO
        - "0C"  # ALL CH STEREO
        - "80"  # PLII/PLIIx Movie
        - "81"  # PLII/PLIIx Music
        - "86"  # PLII/PLIIx Game
        - "82"  # Neo:6 Cinema
        - "83"  # Neo:6 Music
        - "40"  # 5.1ch Surround / Straight Decode
        - "41"  # Dolby EX / DTS ES
      description: "Listening mode code (hex, partial list)"

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

# --- Speaker A/B ---
- id: speaker_a_on
  label: Speaker A On
  kind: action
  command: "!1SPA01"
  params: []

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  command: "!1SPA00"
  params: []

- id: speaker_b_on
  label: Speaker B On
  kind: action
  command: "!1SPB01"
  params: []

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  command: "!1SPB00"
  params: []

# --- Dimmer ---
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
      description: "Dimmer level"

- id: dimmer_toggle
  label: Dimmer Toggle
  kind: action
  command: "!1DIMDIM"
  params: []

# --- Sleep Timer ---
- id: set_sleep
  label: Set Sleep Timer
  kind: action
  command: "!1SLP{time}"
  params:
    - name: time
      type: string
      description: "Hex 01-5A (1-90 min) or OFF"

# --- Tone (Front) ---
- id: set_front_tone
  label: Set Front Tone
  kind: action
  command: "!1TFR{bass_treble}"
  params:
    - name: bass_treble
      type: string
      description: "Bxx and/or Txx where xx is -A to +A (-10 to +10, 2-step)"

# --- HDMI Output ---
- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: "!1HDO{output}"
  params:
    - name: output
      type: enum
      values:
        - "00"  # No Analog
        - "01"  # Out Main
        - "02"  # Out Sub
        - "03"  # Both
        - "04"  # Both(Main)
        - "05"  # Both(Sub)
      description: "HDMI output selector"

# --- Monitor Out Resolution ---
- id: set_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "!1RES{res}"
  params:
    - name: res
      type: enum
      values:
        - "00"  # Through
        - "01"  # Auto
        - "02"  # 480p
        - "03"  # 720p
        - "04"  # 1080i
        - "05"  # 1080p
        - "07"  # 1080p/24fs
        - "06"  # Source
      description: "Resolution code"

# --- 12V Triggers ---
- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  command: "!1TGA01"
  params: []

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  command: "!1TGA00"
  params: []

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  command: "!1TGB01"
  params: []

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  command: "!1TGB00"
  params: []

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  command: "!1TGC01"
  params: []

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  command: "!1TGC00"
  params: []

# --- Network/USB Playback ---
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

# --- Zone 2 ---
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "!1ZPW01"
  params: []

- id: zone2_power_standby
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

- id: zone2_volume_set
  label: Zone 2 Set Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: "Hex value 00-64 (0-100) or 00-50 (0-80)"

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
      description: "Input selector code (same codes as main SLI, subset available)"

# --- Zone 3 ---
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "!1PW301"
  params: []

- id: zone3_power_standby
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
      description: "Hex value 00-64 (0-100) or 00-50 (0-80)"

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "!1SL3{input}"
  params:
    - name: input
      type: string
      description: "Input selector code"

# --- Zone 4 ---
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "!1PW401"
  params: []

- id: zone4_power_standby
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
      description: "Hex value 00-64 (0-100) or 00-50 (0-80)"

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "!1SL4{input}"
  params:
    - name: input
      type: string
      description: "Input selector code"

# --- Audyssey ---
- id: audyssey_set
  label: Set Audyssey EQ
  kind: action
  command: "!1ADY{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

# --- OSD Navigation ---
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
- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  command: "!1SPL{layout}"
  params:
    - name: layout
      type: string
      description: "SB=SurrBack, FH=Front High/SurrBack+FH, FW=Front Wide/SurrBack+FW, UP=Wrap-Around"

- id: tone_front_wide_set
  label: Set Front Wide Tone
  kind: action
  command: "!1TFW{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=bass, Txx=treble (xx: -A to +A, -10 to +10 2-step); BUP/BDOWN/TUP/TDOWN for step"

- id: tone_front_high_set
  label: Set Front High Tone
  kind: action
  command: "!1TFH{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=bass, Txx=treble (xx: -A to +A, -10 to +10 2-step); BUP/BDOWN/TUP/TDOWN for step"

- id: tone_center_set
  label: Set Center Tone
  kind: action
  command: "!1TCT{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=bass, Txx=treble (xx: -A to +A, -10 to +10 2-step); BUP/BDOWN/TUP/TDOWN for step"

- id: tone_surround_set
  label: Set Surround Tone
  kind: action
  command: "!1TSR{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=bass, Txx=treble (xx: -A to +A, -10 to +10 2-step); BUP/BDOWN/TUP/TDOWN for step"

- id: tone_surround_back_set
  label: Set Surround Back Tone
  kind: action
  command: "!1TSB{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=bass, Txx=treble (xx: -A to +A, -10 to +10 2-step); BUP/BDOWN/TUP/TDOWN for step"

- id: tone_subwoofer_set
  label: Set Subwoofer Tone
  kind: action
  command: "!1TSW{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=subwoofer bass (xx: -A to +A); BUP/BDOWN for step"

- id: subwoofer_level_set
  label: Set Subwoofer Temporary Level
  kind: action
  command: "!1SWL{level}"
  params:
    - name: level
      type: string
      description: "-F to +C (-15dB to +12dB); UP/DOWN for step"

- id: center_level_set
  label: Set Center Temporary Level
  kind: action
  command: "!1CTL{level}"
  params:
    - name: level
      type: string
      description: "-C to +C (-12dB to +12dB); UP/DOWN for step"

- id: display_mode_set
  label: Set Display Mode
  kind: action
  command: "!1DIF{mode}"
  params:
    - name: mode
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format, 03=Video Format, TG=Wrap-Around"

- id: recout_selector_set
  label: Set RECOUT Selector
  kind: action
  command: "!1SLR{input}"
  params:
    - name: input
      type: string
      description: "00=VIDEO1..06=VIDEO7, 10=DVD, 20-31=TAPE/PHONO/CD/FM/AM/TUNER/MUSIC SERVER/INTERNET RADIO/MULTI CH/XM, 7F=OFF, 80=SOURCE"

- id: video_output_selector_set
  label: Set Video Output Selector
  kind: action
  command: "!1VOS{output}"
  params:
    - name: output
      type: string
      description: "00=D4, 01=Component (Japanese model only)"

- id: isf_mode_set
  label: Set ISF Mode
  kind: action
  command: "!1ISF{mode}"
  params:
    - name: mode
      type: string
      description: "00=Custom, 01=Day, 02=Night, UP=Wrap-Around"

- id: late_night_set
  label: Set Late Night
  kind: action
  command: "!1LTN{mode}"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=Low@DD/On@TrueHD, 02=High@DD, 03=Auto@TrueHD, UP=Wrap-Around"

- id: re_eq_set
  label: Set Re-EQ / Academy Filter
  kind: action
  command: "!1RAS{state}"
  params:
    - name: state
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=Wrap-Around"

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  command: "!1DVL{state}"
  params:
    - name: state
      type: string
      description: "00=Off, 01=Low, 02=Mid, 03=High, UP=Wrap-Around"

- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  command: "!1MOT{state}"
  params:
    - name: state
      type: string
      description: "00=Off, 01=On, UP=Wrap-Around"

- id: tuner_set
  label: Set Tuner Frequency
  kind: action
  command: "!1TUN{freq}"
  params:
    - name: freq
      type: string
      description: "5-digit frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch); UP/DOWN for wrap-around"

- id: preset_set
  label: Set Tuner Preset
  kind: action
  command: "!1PRS{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 (1-40) or 01-1E (1-30); UP/DOWN for wrap-around"

- id: rds_display
  label: Set RDS Display
  kind: action
  command: "!1RDS{mode}"
  params:
    - name: mode
      type: string
      description: "00=RT Information, 01=PTY Information, 02=TP Information, UP=Wrap-Around (RDS models only)"

- id: osd_audio
  label: OSD Audio Adjust
  kind: action
  command: "!1OSDAUDIO"
  params: []

- id: osd_video
  label: OSD Video Adjust
  kind: action
  command: "!1OSDVIDEO"
  params: []

- id: memory_store
  label: Memory Store
  kind: action
  command: "!1MEMSTR"
  params: []

- id: memory_recall
  label: Memory Recall
  kind: action
  command: "!1MEMRCL"
  params: []

- id: zone2_tone_set
  label: Zone 2 Set Tone
  kind: action
  command: "!1ZTN{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=bass, Txx=treble (xx: -A to +A 2-step); BUP/BDOWN/TUP/TDOWN for step"

- id: zone2_balance_set
  label: Zone 2 Set Balance
  kind: action
  command: "!1ZBL{balance}"
  params:
    - name: balance
      type: string
      description: "xx (-A to +A 2-step); UP=right, DOWN=left"

- id: zone2_listening_mode_set
  label: Zone 2 Set Listening Mode
  kind: action
  command: "!1LMZ{mode}"
  params:
    - name: mode
      type: string
      description: "00=STEREO, 01=DIRECT, 0F=MONO, 12=MULTIPLEX, 87=DVS(Pl2), 88=DVS(NEO6)"

- id: zone2_late_night_set
  label: Zone 2 Set Late Night
  kind: action
  command: "!1LTZ{mode}"
  params:
    - name: mode
      type: string
      description: "00=Off, 01=Low, 02=High, UP=Wrap-Around"

- id: zone2_re_eq_set
  label: Zone 2 Set Re-EQ
  kind: action
  command: "!1RAZ{state}"
  params:
    - name: state
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=Wrap-Around"

- id: zone2_net_play
  label: Zone 2 Net/USB Play
  kind: action
  command: "!1NTZPLAY"
  params: []

- id: zone2_net_stop
  label: Zone 2 Net/USB Stop
  kind: action
  command: "!1NTZSTOP"
  params: []

- id: zone2_net_pause
  label: Zone 2 Net/USB Pause
  kind: action
  command: "!1NTZPAUSE"
  params: []

- id: zone3_tone_set
  label: Zone 3 Set Tone
  kind: action
  command: "!1TN3{tone}"
  params:
    - name: tone
      type: string
      description: "Bxx=bass, Txx=treble (xx: -A to +A 2-step); BUP/BDOWN/TUP/TDOWN for step"

- id: zone3_balance_set
  label: Zone 3 Set Balance
  kind: action
  command: "!1BL3{balance}"
  params:
    - name: balance
      type: string
      description: "xx (-A to +A 2-step); UP=right, DOWN=left"

- id: zone3_net_play
  label: Zone 3 Net/USB Play
  kind: action
  command: "!1NT3PLAY"
  params: []

- id: zone4_net_play
  label: Zone 4 Net/USB Play
  kind: action
  command: "!1NT4PLAY"
  params: []
```

## Feedbacks
```yaml
# Query format: append QSTN as parameter to any command
# Response format: !1<CCC><value> (same command code with current value)
# All QSTN-supporting commands return current state as a response.
# Unsolicited notifications sent when state changes (Event Notice).

- id: power_state
  label: Power State
  type: enum
  values:
    - "00"  # Standby
    - "01"  # On
  query: "!1PWRQSTN"

- id: mute_state
  label: Mute State
  type: enum
  values:
    - "00"  # Off
    - "01"  # On
  query: "!1AMTQSTN"

- id: volume_level
  label: Master Volume Level
  type: string
  description: "Hex value 00-64 or 00-50"
  query: "!1MVLQSTN"

- id: input_selector
  label: Input Selector
  type: enum
  values:
    - "00"  # VIDEO1
    - "01"  # VIDEO2/CBL/SAT
    - "02"  # VIDEO3/GAME
    - "03"  # VIDEO4/AUX1
    - "04"  # VIDEO5/AUX2
    - "05"  # VIDEO6
    - "06"  # VIDEO7
    - "10"  # DVD
    - "20"  # TAPE1
    - "22"  # PHONO
    - "23"  # CD
    - "24"  # FM
    - "25"  # AM
    - "26"  # TUNER
    - "27"  # MUSIC SERVER
    - "28"  # INTERNET RADIO
    - "29"  # USB
    - "40"  # Universal PORT
  query: "!1SLIQSTN"

- id: listening_mode
  label: Listening Mode
  type: string
  description: "Hex mode code (see LMD command for full list)"
  query: "!1LMDQSTN"

- id: audio_info
  label: Audio Information
  type: string
  description: "Same as front-panel display, fields separated by commas"
  query: "!1IFAQSTN"

- id: video_info
  label: Video Information
  type: string
  description: "Same as front-panel display, fields separated by commas"
  query: "!1IFVQSTN"

- id: dimmer_level
  label: Dimmer Level
  type: enum
  values:
    - "00"  # Bright
    - "01"  # Dim
    - "02"  # Dark
    - "03"  # Shut-Off
    - "08"  # Bright & LED OFF
  query: "!1DIMQSTN"

- id: sleep_time
  label: Sleep Timer
  type: string
  description: "Hex 01-5A (1-90 min) or OFF"
  query: "!1SLPQSTN"

- id: display_mode
  label: Display Mode
  type: enum
  values:
    - "00"  # Selector + Volume
    - "01"  # Selector + Listening Mode
    - "02"  # Digital Format (temporary)
    - "03"  # Video Format (temporary)
  query: "!1DIFQSTN"

- id: hdmi_output
  label: HDMI Output
  type: enum
  values:
    - "00"  # No Analog
    - "01"  # Out Main
    - "02"  # Out Sub
    - "03"  # Both
  query: "!1HDOQSTN"

- id: monitor_resolution
  label: Monitor Out Resolution
  type: string
  query: "!1RESQSTN"

- id: net_play_status
  label: Net/USB Play Status
  type: string
  description: "3 chars: p=Play status (S=Stop,P=Play,p=Pause,F=FF,R=REW), r=Repeat (-/R/F/1)"
  query: "!1NSTQSTN"

- id: net_artist
  label: Net/USB Artist Name
  type: string
  query: "!1NATQSTN"

- id: net_album
  label: Net/USB Album Name
  type: string
  query: "!1NALQSTN"

- id: net_title
  label: Net/USB Title Name
  type: string
  query: "!1NTIQSTN"

- id: net_time
  label: Net/USB Time Info
  type: string
  description: "mm:ss/mm:ss (elapsed/track total)"
  query: "!1NTMQSTN"

- id: net_track
  label: Net/USB Track Info
  type: string
  description: "cccc/tttt (current/total)"
  query: "!1NTRQSTN"

- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  values: ["00", "01"]
  query: "!1ZPWQSTN"

- id: zone2_mute_state
  label: Zone 2 Mute State
  type: enum
  values: ["00", "01"]
  query: "!1ZMTQSTN"

- id: zone2_volume
  label: Zone 2 Volume Level
  type: string
  query: "!1ZVLQSTN"

- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  values: ["00", "01"]
  query: "!1PW3QSTN"

- id: zone3_mute_state
  label: Zone 3 Mute State
  type: enum
  values: ["00", "01"]
  query: "!1MT3QSTN"

- id: zone3_volume
  label: Zone 3 Volume Level
  type: string
  query: "!1VL3QSTN"

- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  values: ["00", "01"]
  query: "!1PW4QSTN"

- id: zone4_mute_state
  label: Zone 4 Mute State
  type: enum
  values: ["00", "01"]
  query: "!1MT4QSTN"

- id: zone4_volume
  label: Zone 4 Volume Level
  type: string
  query: "!1VL4QSTN"
```

## Variables
```yaml
# UNRESOLVED: continuous/settable parameters not fully distinct from actions above
# Volume levels, tone settings, and balance are set via action commands with hex params
```

## Events
```yaml
# Device sends unsolicited status messages when state changes.
# Format: !1<CCC><value> - identical to query response format.
# Example: if input changes, receiver sends "!1SLI03" to the controller.
# Requires persistent TCP connection - only one client connection supported.
# Receiver responds within 50msec; no response = communication failure.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Zone 2 volume/tone only works when main zone is ON
  - Zone 2 volume/tone requires Zone 2 to be powered or variable
# UNRESOLVED: no explicit safety interlock or power sequencing warnings in source
```

## Notes
- ISCP commands are ASCII: `!` (start) + unit type `1` (receiver) + 3-char command + parameter + end character.
- Serial end characters: CR, LF, or CR+LF. eISCP end characters: EOF, EOF+CR, or EOF+CR+LF (model-dependent).
- eISCP packets have a 16-byte header (magic "ISCP", header size 0x00000010, data size, version 0x01) — all multi-byte fields are big-endian.
- Minimum interval between commands: 50ms.
- Only one TCP client connection at a time. Connection must be held continuously to receive event notifications.
- Volume and preset values use hexadecimal representation (e.g., "64" hex = 100 decimal).
- Tone values use hex representation with "-A" through "00" to "+A" representing -10 to +10 in 2-step increments.
- Tuner/XM/SIRIUS/HD Radio functions are shared across MAIN and Zone sides.
- 12V triggers (TGA/TGB/TGC) only available when corresponding trigger setup menu parameter is "OFF".
<!-- UNRESOLVED: specific DSX-3 feature subset not confirmed — source is generic Integra ISCP protocol doc v1.15 -->
<!-- UNRESOLVED: which tone control commands apply to DSX-3 specifically -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio support depends on model variant -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:20.402Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:22.333Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:26.686Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:31.200Z
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-26T13:53:42.933Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T13:53:42.933Z
matched_actions: 124
action_count: 124
confidence: high
summary: "All 124 spec commands have literal matches in source; transport verified; spec correctly omits model-specific RI, tuning variant, and satellite radio commands."
```

## Known Gaps

```yaml
- TUZ
- PRZ
- TU3
- PR3
- TU4
- PR4
- PTS
- PRM
- XCN
- XAT
- XTI
- XCH
```
