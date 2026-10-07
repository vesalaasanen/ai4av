---
spec_id: admin/integra-dtr-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTR Series Control Spec"
manufacturer: Integra
model_family: "DTR Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DTR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-19T04:26:35.609Z
last_checked_at: 2026-10-07T17:48:39.589Z
generated_at: 2026-10-07T17:48:39.589Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact DTR model numbers compatible with this protocol version (v1.15) not enumerated in source"
  - "no distinct settable parameters beyond those in Actions/Feedbacks found in source"
  - "no explicit multi-step sequences described in source"
  - "specific DTR model numbers compatible with this ISCP v1.15 spec not listed in source"
  - "eISCP packet byte-level encoding details for header fields beyond what is described above"
  - "complete list of models supporting Zone 3 and Zone 4 not specified"
  - "HD Radio commands (HAT, HCN, HTI, HDS, HPR, HBL, HTS) require HD Radio-equipped models; model list not specified"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:48:39.589Z
  matched_actions: 247
  action_count: 247
  confidence: medium
  summary: "All 247 action units match source command tokens and parameters, and transport values are supported. The source is a generic ISCP guide that never names DTR models. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Integra DTR Series Control Spec

## Summary

The Integra DTR Series AV receivers support the ISCP (Integra Serial Control Protocol) over both RS-232C and Ethernet (eISCP over TCP/IP). This spec covers the complete ISCP command set for third-party control integration, including main zone and multi-zone (Zone 2/3/4) control of power, volume, input selection, surround modes, tuner, and network audio functions.

<!-- UNRESOLVED: exact DTR model numbers compatible with this protocol version (v1.15) not enumerated in source -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; receiver can be configured 49152-65535 via setup menu
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits

```yaml
- powerable       # power on/off commands present (PWR, ZPW, PW3, PW4)
- routable        # input/output routing commands present (SLI, ZSL, SL3, SL4, SLA, HDO)
- queryable       # query commands returning state present (QSTN parameter on all commands)
- levelable       # volume, tone, and level control present (MVL, ZVL, VL3, VL4, TFR, etc.)
```

## Actions

```yaml
# ---- Main Zone Power ----
- id: power_on
  label: Power On
  kind: action
  params: []
  command: "!1PWR01\r"

- id: power_standby
  label: Power Standby
  kind: action
  params: []
  command: "!1PWR00\r"

# ---- Main Zone Muting ----
- id: mute_on
  label: Audio Muting On
  kind: action
  params: []
  command: "!1AMT01\r"

- id: mute_off
  label: Audio Muting Off
  kind: action
  params: []
  command: "!1AMT00\r"

- id: mute_toggle
  label: Audio Muting Toggle
  kind: action
  params: []
  command: "!1AMTTG\r"

# ---- Master Volume ----
- id: volume_set
  label: Set Master Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex value 00-64 (0-100) or 00-50 (0-80 on some models)"
  command: "!1MVL{level}\r"

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  command: "!1MVLUP\r"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  command: "!1MVLDOWN\r"

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  params: []
  command: "!1MVLUP1\r"

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  params: []
  command: "!1MVLDOWN1\r"

# ---- Input Selector ----
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: "Input code: 00=VIDEO1/VCR, 01=VIDEO2/CBL-SAT, 02=VIDEO3/GAME, 03=VIDEO4/AUX1, 04=VIDEO5/AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB-Front, 2A=USB-Rear, 40=Universal PORT, 30=MULTI CH, 31=XM, 32=SIRIUS"
  command: "!1SLI{input}\r"

- id: select_input_up
  label: Input Selector Up
  kind: action
  params: []
  command: "!1SLIUP\r"

- id: select_input_down
  label: Input Selector Down
  kind: action
  params: []
  command: "!1SLIDOWN\r"

# ---- Audio Selector ----
- id: select_audio
  label: Select Audio Input
  kind: action
  params:
    - name: mode
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"
  command: "!1SLA{mode}\r"

# ---- RECOUT Selector ----
- id: select_recout
  label: Select RECOUT Source
  kind: action
  params:
    - name: source
      type: string
      description: "Same codes as SLI plus 7F=OFF, 80=SOURCE"
  command: "!1SLR{source}\r"

# ---- Listening Mode ----
- id: set_listening_mode
  label: Set Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "Hex code: 00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM, 04=THX, 05=ACTION, 06=MUSICAL, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Surround Sensation, 16=Audyssey DSX, 40=5.1ch Surround, 41=Dolby EX/DTS ES, 42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games, 50=U2/S2 Cinema, 51=MusicMode, 52=Games Mode, 80=PLII-PLIIx Movie, 81=PLII-PLIIx Music, 82=Neo:6 Cinema, 83=Neo:6 Music, 84=PLII-PLIIx THX Cinema, 85=Neo:6 THX Cinema, 86=PLII-PLIIx Game, 87=Neural Surr, 88=Neural THX, 89=PLII-PLIIx THX Games, 8A=Neo:6 THX Games, 8B=PLII-PLIIx THX Music, 8C=Neo:6 THX Music, 8D=Neural THX Cinema, 8E=Neural THX Music, 8F=Neural THX Games, 90=PLIIz Height, 91-99=PLIIz Height combos, A0-A7=DSX combos"
  command: "!1LMD{mode}\r"

- id: listening_mode_movie
  label: Listening Mode Movie
  kind: action
  params: []
  command: "!1LMDMOVIE\r"

- id: listening_mode_music
  label: Listening Mode Music
  kind: action
  params: []
  command: "!1LMDMUSIC\r"

- id: listening_mode_game
  label: Listening Mode Game
  kind: action
  params: []
  command: "!1LMDGAME\r"

# ---- Tone Controls (Front) ----
- id: set_front_bass
  label: Set Front Bass
  kind: action
  params:
    - name: level
      type: string
      description: "B followed by level: B-A to B+A (-10 to +10 in 2-step)"
  command: "!1TFR{level}\r"

- id: set_front_treble
  label: Set Front Treble
  kind: action
  params:
    - name: level
      type: string
      description: "T followed by level: T-A to T+A (-10 to +10 in 2-step)"
  command: "!1TFR{level}\r"

# ---- Speaker A/B ----
- id: speaker_a_on
  label: Speaker A On
  kind: action
  params: []
  command: "!1SPA01\r"

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  params: []
  command: "!1SPA00\r"

- id: speaker_b_on
  label: Speaker B On
  kind: action
  params: []
  command: "!1SPB01\r"

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  params: []
  command: "!1SPB00\r"

# ---- Dimmer ----
- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"
  command: "!1DIM{level}\r"

# ---- Sleep Timer ----
- id: set_sleep
  label: Set Sleep Timer
  kind: action
  params:
    - name: time
      type: string
      description: "Hex 01-5A = 1-90 min, OFF = off"
  command: "!1SLP{time}\r"

# ---- 12V Triggers ----
- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  params: []
  command: "!1TGA01\r"

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  params: []
  command: "!1TGA00\r"

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  params: []
  command: "!1TGB01\r"

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  params: []
  command: "!1TGB00\r"

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  params: []
  command: "!1TGC01\r"

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  params: []
  command: "!1TGC00\r"

# ---- HDMI Output ----
- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  params:
    - name: mode
      type: string
      description: "00=No/Analog, 01=Yes/HDMI Main, 02=HDMI Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"
  command: "!1HDO{mode}\r"

# ---- Monitor Resolution ----
- id: set_resolution
  label: Set Monitor Output Resolution
  kind: action
  params:
    - name: res
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 07=1080p/24fs, 06=Source"
  command: "!1RES{res}\r"

# ---- OSD Navigation ----
- id: osd_menu
  label: OSD Menu
  kind: action
  params: []
  command: "!1OSDMENU\r"

- id: osd_up
  label: OSD Up
  kind: action
  params: []
  command: "!1OSDUP\r"

- id: osd_down
  label: OSD Down
  kind: action
  params: []
  command: "!1OSDDOWN\r"

- id: osd_left
  label: OSD Left
  kind: action
  params: []
  command: "!1OSDLEFT\r"

- id: osd_right
  label: OSD Right
  kind: action
  params: []
  command: "!1OSDRIGHT\r"

- id: osd_enter
  label: OSD Enter
  kind: action
  params: []
  command: "!1OSDENTER\r"

- id: osd_exit
  label: OSD Exit
  kind: action
  params: []
  command: "!1OSDEXIT\r"

# ---- Tuner ----
- id: tune_frequency
  label: Tune to Frequency
  kind: action
  params:
    - name: freq
      type: string
      description: "5-digit frequency: FM nnn.nn MHz / AM nnnnn kHz"
  command: "!1TUN{freq}\r"

- id: preset_select
  label: Select Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "Hex 01-28 (preset 1-40) or 01-1E (preset 1-30)"
  command: "!1PRS{preset}\r"

# ---- Network/USB Playback ----
- id: net_play
  label: Net/USB Play
  kind: action
  params: []
  command: "!1NTCPLAY\r"

- id: net_stop
  label: Net/USB Stop
  kind: action
  params: []
  command: "!1NTCSTOP\r"

- id: net_pause
  label: Net/USB Pause
  kind: action
  params: []
  command: "!1NTCPAUSE\r"

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  params: []
  command: "!1NTCTRUP\r"

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  params: []
  command: "!1NTCTRDN\r"

- id: net_ff
  label: Net/USB Fast Forward
  kind: action
  params: []
  command: "!1NTCFF\r"

- id: net_rew
  label: Net/USB Rewind
  kind: action
  params: []
  command: "!1NTCREW\r"

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  params: []
  command: "!1NTCREPEAT\r"

- id: net_random
  label: Net/USB Random
  kind: action
  params: []
  command: "!1NTCRANDOM\r"

# ---- Audyssey ----
- id: audyssey_multeq_on
  label: Audyssey MultEQ On
  kind: action
  params: []
  command: "!1ADY01\r"

- id: audyssey_multeq_off
  label: Audyssey MultEQ Off
  kind: action
  params: []
  command: "!1ADY00\r"

- id: audyssey_dynamic_eq_on
  label: Audyssey Dynamic EQ On
  kind: action
  params: []
  command: "!1ADQ01\r"

- id: audyssey_dynamic_eq_off
  label: Audyssey Dynamic EQ Off
  kind: action
  params: []
  command: "!1ADQ00\r"

- id: set_audyssey_dynamic_volume
  label: Set Audyssey Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"
  command: "!1ADV{level}\r"

# ---- Zone 2 ----
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  params: []
  command: "!1ZPW01\r"

- id: zone2_power_standby
  label: Zone 2 Standby
  kind: action
  params: []
  command: "!1ZPW00\r"

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
  command: "!1ZMT01\r"

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
  command: "!1ZMT00\r"

- id: zone2_volume_set
  label: Zone 2 Set Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100)"
  command: "!1ZVL{level}\r"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  command: "!1ZVLUP\r"

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  command: "!1ZVLDOWN\r"

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  params:
    - name: input
      type: string
      description: "Same input codes as SLI; 7F=OFF, 80=SOURCE"
  command: "!1ZSL{input}\r"

# ---- Zone 3 ----
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  params: []
  command: "!1PW301\r"

- id: zone3_power_standby
  label: Zone 3 Standby
  kind: action
  params: []
  command: "!1PW300\r"

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []
  command: "!1MT301\r"

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []
  command: "!1MT300\r"

- id: zone3_volume_set
  label: Zone 3 Set Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100)"
  command: "!1VL3{level}\r"

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  params:
    - name: input
      type: string
      description: "Same input codes as SLI; 80=SOURCE"
  command: "!1SL3{input}\r"

# ---- Zone 4 ----
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  params: []
  command: "!1PW401\r"

- id: zone4_power_standby
  label: Zone 4 Standby
  kind: action
  params: []
  command: "!1PW400\r"

- id: zone4_mute_on
  label: Zone 4 Mute On
  kind: action
  params: []
  command: "!1MT401\r"

- id: zone4_mute_off
  label: Zone 4 Mute Off
  kind: action
  params: []
  command: "!1MT400\r"

- id: zone4_volume_set
  label: Zone 4 Set Volume
  kind: action
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100)"
  command: "!1VL4{level}\r"

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  params:
    - name: input
      type: string
      description: "Same input codes as SLI; 80=SOURCE"
  command: "!1SL4{input}\r"

# ---- Memory ----
- id: memory_store
  label: Store Memory
  kind: action
  params: []
  command: "!1MEMSTR\r"

- id: memory_recall
  label: Recall Memory
  kind: action
  params: []
  command: "!1MEMRCL\r"

- id: memory_lock
  label: Lock Memory
  kind: action
  params: []
  command: "!1MEMLOCK\r"

- id: memory_unlock
  label: Unlock Memory
  kind: action
  params: []
  command: "!1MEMUNLK\r"

# ---- Additional Main Zone Commands ----
- id: set_speaker_layout
  label: Set Speaker Layout
  kind: action
  params:
    - name: layout
      type: string
      description: "SB, FH, FW"
  command: "SPL"

- id: speaker_layout_up
  label: Speaker Layout Up
  kind: action
  params: []
  command: "SPL"

- id: set_front_wide_tone
  label: Set Front Wide Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  command: "TFW"

- id: set_front_high_tone
  label: Set Front High Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  command: "TFH"

- id: set_center_tone
  label: Set Center Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  command: "TCT"

- id: set_surround_tone
  label: Set Surround Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  command: "TSR"

- id: set_surround_back_tone
  label: Set Surround Back Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  command: "TSB"

- id: set_subwoofer_tone
  label: Set Subwoofer Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, BUP, BDOWN"
  command: "TSW"

- id: speaker_level_calibration
  label: Speaker Level Calibration
  kind: action
  params:
    - name: setting
      type: string
      description: "TEST, CHSEL, UP, DOWN"
  command: "SLC"

- id: set_subwoofer_level
  label: Set Subwoofer Level
  kind: action
  params:
    - name: setting
      type: string
      description: "-F-00-+C"
  command: "SWL"

- id: subwoofer_level_adjust
  label: Adjust Subwoofer Level
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "SWL"

- id: set_center_level
  label: Set Center Level
  kind: action
  params:
    - name: setting
      type: string
      description: "-C-00-+C"
  command: "CTL"

- id: center_level_adjust
  label: Adjust Center Level
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "CTL"

- id: display_information
  label: Display Information
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, 02, 03, 04"
  command: "DIF"

- id: set_display_mode
  label: Set Display Mode
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, 02, 03, TG"
  command: "DIF"

- id: set_late_night
  label: Set Late Night
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, 02, 03, UP"
  command: "LTN"

- id: set_re_eq_academy_filter
  label: Set Re-EQ Academy Filter
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, 02, UP"
  command: "RAS"

- id: set_audyssey_multeq
  label: Set Audyssey MultEQ
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, UP"
  command: "ADY"

- id: set_music_optimizer
  label: Set Music Optimizer
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, UP"
  command: "MOT"

- id: set_dolby_volume
  label: Set Dolby Volume
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, 02, 03, UP"
  command: "DVL"

- id: set_isf_mode
  label: Set ISF Mode
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, 02, UP"
  command: "ISF"

- id: preset_memory_set
  label: Set Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28, 01-1E"
  command: "PRM"

- id: internet_radio_preset_set
  label: Set Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28"
  command: "NPR"

- id: set_zone2_tone
  label: Set Zone 2 Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  command: "ZTN"

- id: set_zone3_tone
  label: Set Zone 3 Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
  command: "TN3"

- id: zone3_tune_frequency
  label: Zone 3 Tune to Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: "nnnnn"
  command: "TU3"

- id: zone4_tune_frequency
  label: Zone 4 Tune to Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: "nnnnn"
  command: "TU4"

- id: zone3_select_preset
  label: Zone 3 Select Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28, 01-1E"
  command: "PR3"

- id: zone4_select_preset
  label: Zone 4 Select Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28, 01-1E"
  command: "PR4"

- id: zone2_network_operation
  label: Zone 2 Network Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAY, STOP, PAUSE, TRUP, TRDN, CHUP, CHDN"
  command: "NT2"

- id: zone3_network_operation
  label: Zone 3 Network Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAY, STOP, PAUSE, TRUP, TRDN, CHUP, CHDN"
  command: "NT3"

- id: zone4_network_operation
  label: Zone 4 Network Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAY, STOP, PAUSE, TRUP, TRDN"
  command: "NT4"

- id: zone2_internet_radio_preset_set
  label: Zone 2 Set Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28"
  command: "NP2"

- id: zone3_internet_radio_preset_set
  label: Zone 3 Set Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28"
  command: "NP3"

- id: zone4_internet_radio_preset_set
  label: Zone 4 Set Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-28"
  command: "NP4"

- id: sleep_timer_up
  label: Sleep Timer Up
  kind: action
  params: []
  command: "UP"

- id: speaker_switch_up
  label: Speaker Switch Up
  kind: action
  params: []
  command: "UP"

- id: tone_front_wide_high_controls
  label: Front Wide Tone Controls
  kind: action
  params:
    - name: setting
      type: string
      description: "BUP, BDOWN, TUP, TDOWN"
  command: "TFW"

- id: tone_front_high_controls
  label: Front High Tone Controls
  kind: action
  params:
    - name: setting
      type: string
      description: "BUP, BDOWN, TUP, TDOWN"
  command: "TFH"

- id: tone_center_controls
  label: Center Tone Controls
  kind: action
  params:
    - name: setting
      type: string
      description: "BUP, BDOWN, TUP, TDOWN"
  command: "TCT"

- id: tone_surround_controls
  label: Surround Tone Controls
  kind: action
  params:
    - name: setting
      type: string
      description: "BUP, BDOWN, TUP, TDOWN"
  command: "TSR"

- id: tone_surround_back_controls
  label: Surround Back Tone Controls
  kind: action
  params:
    - name: setting
      type: string
      description: "BUP, BDOWN, TUP, TDOWN"
  command: "TSB"

- id: tone_subwoofer_controls
  label: Subwoofer Tone Controls
  kind: action
  params:
    - name: setting
      type: string
      description: "BUP, BDOWN"
  command: "TSW"

- id: zone2_tuning_control
  label: Zone 2 Tuning Control
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "TUN"

- id: zone2_preset_control
  label: Zone 2 Preset Control
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "PRS"

- id: zone3_tuning_control
  label: Zone 3 Tuning Control
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "TU3"

- id: zone3_preset_control
  label: Zone 3 Preset Control
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "PR3"

- id: zone4_tuning_control
  label: Zone 4 Tuning Control
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "TU4"

- id: zone4_preset_control
  label: Zone 4 Preset Control
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "PR4"

- id: zone2_network_tune_operation
  label: Zone 2 Net-Tune Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAYz, STOPz, PAUSEz, TRUPz, TRDNz"
  command: "NTC"

- id: zone3_network_tune_operation
  label: Zone 3 Net-Tune Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAYz, STOPz, PAUSEz, TRUPz, TRDNz"
  command: "NTC"

- id: zone4_network_tune_operation
  label: Zone 4 Net-Tune Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAYz, STOPz, PAUSEz, TRUPz, TRDNz"
  command: "NTC"

# ---- Additional Documented Operations ----
- id: front_tone_adjust
  label: Adjust Front Tone
  kind: action
  params:
    - name: setting
      type: string
      description: "BUP, BDOWN, TUP, TDOWN"
  command: "TFR"

- id: dimmer_wrap
  label: Dimmer Wrap-Around Up
  kind: action
  params:
    - name: setting
      type: string
      description: "DIM"
  command: "DIM"

- id: osd_adjust
  label: OSD Audio Or Video Adjust
  kind: action
  params:
    - name: setting
      type: string
      description: "AUDIO, VIDEO"
  command: "OSD"

- id: audio_selector_up
  label: Audio Selector Up
  kind: action
  params:
    - name: setting
      type: string
      description: "UP"
  command: "SLA"

- id: hdmi_output_up
  label: HDMI Output Selector Up
  kind: action
  params:
    - name: setting
      type: string
      description: "UP"
  command: "HDO"

- id: monitor_resolution_up
  label: Monitor Output Resolution Up
  kind: action
  params:
    - name: setting
      type: string
      description: "UP"
  command: "RES"

- id: listening_mode_adjust
  label: Adjust Listening Mode
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "LMD"

- id: audyssey_dynamic_eq_up
  label: Audyssey Dynamic EQ Up
  kind: action
  params:
    - name: setting
      type: string
      description: "UP"
  command: "ADQ"

- id: audyssey_dynamic_volume_up
  label: Audyssey Dynamic Volume Up
  kind: action
  params:
    - name: setting
      type: string
      description: "UP"
  command: "ADV"

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  params:
    - name: setting
      type: string
      description: "TG"
  command: "ZMT"

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  params:
    - name: setting
      type: string
      description: "TG"
  command: "MT3"

- id: zone3_volume_adjust
  label: Adjust Zone 3 Volume
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "VL3"

- id: zone4_mute_toggle
  label: Zone 4 Mute Toggle
  kind: action
  params:
    - name: setting
      type: string
      description: "TG"
  command: "MT4"

- id: zone4_volume_adjust
  label: Adjust Zone 4 Volume
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN"
  command: "VL4"

- id: net_additional_operation
  label: Additional Net/USB Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "DISPLAY, ALBUM, ARTIST, GENRE, PLAYLIST, RIGHT, LEFT, UP, DOWN, SELECT, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, DELETE, CAPS, LOCATION, LANGUAGE, SETUP, RETURN, CHUP, CHDN"
  command: "NTC"

# ---- Video Output Selector ----
- id: set_video_output
  label: Set Video Output Selector
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01; 00=sets D4, 01=sets Component; Japanese Model Only"
  command: "VOS"

# ---- RDS ----
- id: display_rds_information
  label: Display RDS Information
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01, 02, UP; 00=Display RT Information, 01=Display PTY Information, 02=Display TP Information; RDS Model Only"
  command: "RDS"

- id: pty_scan
  label: PTY Scan
  kind: action
  params:
    - name: setting
      type: string
      description: "\"00\"-\"1E\"; sets PTY No \"0-30\" (In hexadecimal representation); ENTER=Finish PTY Scan; RDS Model Only"
  command: "PTS"

- id: tp_scan
  label: TP Scan
  kind: action
  params:
    - name: setting
      type: string
      description: "\"\"=Start TP Scan (When Don't Have Parameter); ENTER=Finish TP Scan; RDS Model Only"
  command: "TPS"

# ---- XM And SIRIUS ----
- id: xm_channel_control
  label: XM Channel Control
  kind: action
  params:
    - name: setting
      type: string
      description: "\"000\"-\"255\", UP, DOWN; XM Model Only"
  command: "XCH"

- id: xm_category_adjust
  label: Adjust XM Category
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN; XM Model Only"
  command: "XCT"

- id: sirius_channel_control
  label: SIRIUS Channel Control
  kind: action
  params:
    - name: setting
      type: string
      description: "\"000\"-\"255\", UP, DOWN; SIRIUS Model Only"
  command: "SCH"

- id: sirius_category_adjust
  label: Adjust SIRIUS Category
  kind: action
  params:
    - name: setting
      type: string
      description: "UP, DOWN; SIRIUS Model Only"
  command: "SCT"

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  params:
    - name: setting
      type: string
      description: "nnnn=Lock Password (4 Digits), INPUT, WRONG; INPUT=displays Please input the Lock password; WRONG=displays The Lock password is wrong; SIRIUS Model Only"
  command: "SLK"

# ---- HD Radio ----
- id: set_hd_radio_program
  label: Set HD Radio Channel Program
  kind: action
  params:
    - name: program
      type: string
      description: "\"01\"-\"08\"; HD Radio Model Only"
  command: "HPR"

- id: set_hd_radio_blend
  label: Set HD Radio Blend Mode
  kind: action
  params:
    - name: setting
      type: string
      description: "00, 01; 00=Auto, 01=Analog; HD Radio Model Only"
  command: "HBL"

# ---- RI Device Operations ----
- id: ri_cd_player_operation
  label: RI CD Player Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "POWER, TRACK, PLAY, STOP, PAUSE, SKIP.F, SKIP.R, MEMORY, CLEAR, REPEAT, RANDOM, DISP, D.MODE, FF, REW, OP/CL, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, +10, D.SKIP, DISC.F, DISC.R, DISC1, DISC2, DISC3, DISC4, DISC5, DISC6, STBY, PON"
  command: "CCD"

- id: ri_tape1_operation
  label: RI Tape 1 Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAY.F, PLAY.R, STOP, RC/PAU, FF, REW"
  command: "CT1"

- id: ri_tape2_operation
  label: RI Tape 2 Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAY.F, PLAY.R, STOP, RC/PAU, FF, REW, OP/CL, SKIP.F, SKIP.R, REC"
  command: "CT2"

- id: ri_equalizer_operation
  label: RI Graphics Equalizer Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "POWER, PRESET"
  command: "CEQ"

- id: ri_dat_recorder_operation
  label: RI DAT Recorder Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PLAY, RC/PAU, STOP, SKIP.F, SKIP.R, FF, REW"
  command: "CDT"

- id: ri_dvd_player_operation
  label: RI DVD Player Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "POWER, PWRON, PWROFF, PLAY, STOP, SKIP.F, SKIP.R, FF, REW, PAUSE, LASTPLAY, SUBTON/OFF, SUBTITLE, SETUP, TOPMENU, MENU, UP, DOWN, LEFT, RIGHT, ENTER, RETURN, DISC.F, DISC.R, AUDIO, RANDOM, OP/CL, ANGLE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, SEARCH, DISP, REPEAT, MEMORY, CLEAR, ABR, STEP.F, STEP.R, SLOW.F, SLOW.R, ZOOMTG, ZOOMUP, ZOOMDN, PROGRE, VDOFF, CONMEM, FUNMEM, DISC1, DISC2, DISC3, DISC4, DISC5, DISC6, FOLDUP, FOLDDN, P.MODE, ASCTG, CDPCD, MSPUP, MSPDN, PCT, RSCTG, INIT"
  command: "CDV"

- id: ri_md_recorder_operation
  label: RI MD Recorder Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "POWER, PLAY, STOP, FF, REW, P.MODE, SKIP.F, SKIP.R, PAUSE, REC, MEMORY, DISP, SCROLL, M.SCAN, CLEAR, RANDOM, REPEAT, ENTER, EJECT, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10/0, nn/nnn, NAME, GROUP, STBY"
  command: "CMD"

- id: ri_cd_r_recorder_operation
  label: RI CD-R Recorder Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "POWER, P.MODE, PLAY, STOP, SKIP.F, SKIP.R, PAUSE, REC, CLEAR, REPEAT, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10/0, nn/nnn, SCROLL, OP/CL, DISP, RANDOM, MEMORY, FF, REW, STBY"
  command: "CCR"

- id: ri_dock_operation
  label: RI Dock Operation
  kind: action
  params:
    - name: setting
      type: string
      description: "PWRON, PWROFF, PLY/RES, STOP, SKIP.F, SKIP.R, PAUSE, PLY/PAU, FF, REW, ALBUM+, ALBUM-, PLIST+, PLIST-, CHAPT+, CHAPT-, RANDOM, REPEAT, MUTE, BLIGHT, MENU, ENTER, UP, DOWN"
  command: "CDS"
```

## Feedbacks

```yaml
- id: power_state
  label: System Power State
  type: enum
  values: ["00", "01"]
  command: "!1PWRQSTN\r"
  query_command: "QSTN"
  notes: "00=Standby, 01=On"

- id: mute_state
  label: Audio Muting State
  type: enum
  values: ["00", "01"]
  command: "!1AMTQSTN\r"
  query_command: "QSTN"
  notes: "00=Off, 01=On"

- id: volume_level
  label: Master Volume Level
  type: string
  command: "!1MVLQSTN\r"
  query_command: "QSTN"
  notes: "Returns hex value 00-64"

- id: input_selector
  label: Current Input
  type: string
  command: "!1SLIQSTN\r"
  query_command: "QSTN"
  notes: "Returns input code (e.g. 23 = CD)"

- id: audio_selector
  label: Audio Selector State
  type: string
  command: "!1SLAQSTN\r"
  query_command: "QSTN"
  notes: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

- id: listening_mode
  label: Current Listening Mode
  type: string
  command: "!1LMDQSTN\r"
  query_command: "QSTN"
  notes: "Returns hex listening mode code"

- id: dimmer_level
  label: Dimmer Level
  type: string
  command: "!1DIMQSTN\r"
  query_command: "QSTN"
  notes: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED OFF"

- id: sleep_time
  label: Sleep Timer
  type: string
  command: "!1SLPQSTN\r"
  query_command: "QSTN"
  notes: "Hex 01-5A = 1-90 min, OFF = off"

- id: hdmi_output
  label: HDMI Output Selector
  type: string
  command: "!1HDOQSTN\r"
  query_command: "QSTN"
  notes: "00-05 output mode"

- id: monitor_resolution
  label: Monitor Output Resolution
  type: string
  command: "!1RESQSTN\r"
  query_command: "QSTN"
  notes: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 07=1080p/24fs, 06=Source"

- id: speaker_a_state
  label: Speaker A State
  type: enum
  values: ["00", "01"]
  command: "!1SPAQSTN\r"
  query_command: "QSTN"
  notes: "00=Off, 01=On"

- id: speaker_b_state
  label: Speaker B State
  type: enum
  values: ["00", "01"]
  command: "!1SPBQSTN\r"
  query_command: "QSTN"
  notes: "00=Off, 01=On"

- id: audio_info
  label: Audio Information
  type: string
  command: "!1IFAQSTN\r"
  query_command: "QSTN"
  notes: "Returns nnnnn:nnnnn format; trigger with DIF02"

- id: video_info
  label: Video Information
  type: string
  command: "!1IFVQSTN\r"
  query_command: "QSTN"
  notes: "Returns nnnnn:nnnnn format; trigger with DIF03"

- id: tuner_frequency
  label: Tuner Frequency
  type: string
  command: "!1TUNQSTN\r"
  query_command: "QSTN"
  notes: "5-digit: FM nnn.nn MHz / AM nnnnn kHz"

- id: tuner_preset
  label: Tuner Preset
  type: string
  command: "!1PRSQSTN\r"
  query_command: "QSTN"
  notes: "Hex preset number"

- id: net_play_status
  label: Net/USB Play Status
  type: string
  command: "!1NSTQSTN\r"
  query_command: "QSTN"
  notes: "3-letter string: p=play status (S/P/p/F/R), r=repeat status (-/R/F/1), s=shuffle (inferred)"

- id: net_artist
  label: Net/USB Artist Name
  type: string
  command: "!1NATQSTN\r"
  query_command: "QSTN"
  notes: "Variable-length ASCII, 64 chars max"

- id: net_album
  label: Net/USB Album Name
  type: string
  command: "!1NALQSTN\r"
  query_command: "QSTN"
  notes: "Variable-length ASCII, 64 chars max"

- id: net_title
  label: Net/USB Title
  type: string
  command: "!1NTIQSTN\r"
  query_command: "QSTN"
  notes: "Variable-length ASCII, 64 chars max"

- id: net_time
  label: Net/USB Time Info
  type: string
  command: "!1NTMQSTN\r"
  query_command: "QSTN"
  notes: "mm:ss/mm:ss (elapsed/total, max 99:59)"

- id: net_track
  label: Net/USB Track Info
  type: string
  command: "!1NTRQSTN\r"
  query_command: "QSTN"
  notes: "cccc/tttt (current/total, max 9999)"

- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  values: ["00", "01"]
  command: "!1ZPWQSTN\r"
  query_command: "QSTN"
  notes: "00=Standby, 01=On"

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  command: "!1ZVLQSTN\r"
  query_command: "QSTN"

- id: zone2_mute_state
  label: Zone 2 Mute State
  type: enum
  values: ["00", "01"]
  command: "!1ZMTQSTN\r"
  query_command: "QSTN"

- id: zone2_input_selector
  label: Zone 2 Input Selector
  type: string
  command: "!1ZSLQSTN\r"
  query_command: "QSTN"

- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  values: ["00", "01"]
  command: "!1PW3QSTN\r"
  query_command: "QSTN"

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  command: "!1VL3QSTN\r"
  query_command: "QSTN"

- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  values: ["00", "01"]
  command: "!1PW4QSTN\r"
  query_command: "QSTN"

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  command: "!1VL4QSTN\r"
  query_command: "QSTN"

- id: recout_selector
  label: RECOUT Selector Position
  type: string
  command: "!1SLRQSTN\r"
  query_command: "QSTN"

- id: late_night_level
  label: Late Night Level
  type: string
  command: "!1LTNQSTN\r"
  query_command: "QSTN"
  notes: "00=Off, 01=Low/On, 02=High, 03=Auto"

- id: audyssey_multeq_state
  label: Audyssey MultEQ State
  type: enum
  values: ["00", "01"]
  command: "!1ADYQSTN\r"
  query_command: "QSTN"

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  type: enum
  values: ["00", "01"]
  command: "!1ADQQSTN\r"
  query_command: "QSTN"

- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  type: string
  command: "!1ADVQSTN\r"
  query_command: "QSTN"
  notes: "00=Off, 01=Light, 02=Medium, 03=Heavy"

- id: music_optimizer_state
  label: Music Optimizer State
  type: enum
  values: ["00", "01"]
  command: "!1MOTQSTN\r"
  query_command: "QSTN"

- id: dolby_volume_state
  label: Dolby Volume State
  type: string
  command: "!1DVLQSTN\r"
  query_command: "QSTN"
  notes: "00=Off, 01=Low, 02=Mid, 03=High"

- id: subwoofer_level
  label: Subwoofer Level
  type: string
  command: "!1SWLQSTN\r"
  query_command: "QSTN"
  notes: "-F to +C (-15dB to +12dB)"

- id: center_level
  label: Center Level
  type: string
  command: "!1CTLQSTN\r"
  query_command: "QSTN"
  notes: "-C to +C (-12dB to +12dB)"

- id: isf_mode
  label: ISF Mode State
  type: string
  command: "!1ISFQSTN\r"
  query_command: "QSTN"
  notes: "00=Custom, 01=Day, 02=Night"

# ---- Additional Documented Queries ----
- id: speaker_layout_state
  label: Speaker Layout State
  type: string
  command: "SPL"
  query_command: "QSTN"
  notes: "SB, FH, FW"

- id: front_tone
  label: Front Tone
  type: string
  command: "TFR"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: front_wide_tone
  label: Front Wide Tone
  type: string
  command: "TFW"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: front_high_tone
  label: Front High Tone
  type: string
  command: "TFH"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: center_tone
  label: Center Tone
  type: string
  command: "TCT"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: surround_tone
  label: Surround Tone
  type: string
  command: "TSR"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: surround_back_tone
  label: Surround Back Tone
  type: string
  command: "TSB"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: subwoofer_tone
  label: Subwoofer Tone
  type: string
  command: "TSW"
  query_command: "QSTN"
  notes: "Bxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: display_mode
  label: Display Mode
  type: string
  command: "DIF"
  query_command: "QSTN"
  notes: "Gets The Display Mode"

- id: video_output_selector
  label: Video Output Selector
  type: enum
  values: ["00", "01"]
  command: "VOS"
  query_command: "QSTN"
  notes: "00=D4, 01=Component; Japanese Model Only"

- id: re_eq_academy_state
  label: Re-EQ Academy Filter State
  type: string
  command: "RAS"
  query_command: "QSTN"
  notes: "00=Both Off, 01=Re-EQ On, 02=Academy On; alternate models use RAS for Re-EQ or Cinema Filter with 00=Off, 01=On"

- id: xm_channel_name
  label: XM Channel Name
  type: string
  command: "XCN"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; XM Model Only"

- id: xm_artist_name
  label: XM Artist Name
  type: string
  command: "XAT"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; XM Model Only"

- id: xm_title
  label: XM Title
  type: string
  command: "XTI"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; XM Model Only"

- id: xm_channel_number
  label: XM Channel Number
  type: string
  command: "XCH"
  query_command: "QSTN"
  notes: "\"000\"-\"255\"; XM Model Only"

- id: xm_category
  label: XM Category
  type: string
  command: "XCT"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; XM Category Info; XM Model Only"

- id: sirius_channel_name
  label: SIRIUS Channel Name
  type: string
  command: "SCN"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; SIRIUS Model Only"

- id: sirius_artist_name
  label: SIRIUS Artist Name
  type: string
  command: "SAT"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; SIRIUS Model Only"

- id: sirius_title
  label: SIRIUS Title
  type: string
  command: "STI"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; SIRIUS Model Only"

- id: sirius_channel_number
  label: SIRIUS Channel Number
  type: string
  command: "SCH"
  query_command: "QSTN"
  notes: "\"000\"-\"255\"; SIRIUS Model Only"

- id: sirius_category
  label: SIRIUS Category
  type: string
  command: "SCT"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; SIRIUS Category Info; SIRIUS Model Only"

- id: hd_radio_artist_name
  label: HD Radio Artist Name
  type: string
  command: "HAT"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; variable-length, 64 digits max; HD Radio Model Only"

- id: hd_radio_channel_name
  label: HD Radio Channel Name
  type: string
  command: "HCN"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; Station Name; 7 digits; HD Radio Model Only"

- id: hd_radio_title
  label: HD Radio Title
  type: string
  command: "HTI"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; variable-length, 64 digits max; HD Radio Model Only"

- id: hd_radio_detail
  label: HD Radio Detail Info
  type: string
  command: "HDS"
  query_command: "QSTN"
  notes: "nnnnnnnnnn; source describes the returned value as HD Radio Title; HD Radio Model Only"

- id: hd_radio_program
  label: HD Radio Channel Program
  type: string
  command: "HPR"
  query_command: "QSTN"
  notes: "\"01\"-\"08\"; HD Radio Model Only"

- id: hd_radio_blend_mode
  label: HD Radio Blend Mode
  type: enum
  values: ["00", "01"]
  command: "HBL"
  query_command: "QSTN"
  notes: "00=Auto, 01=Analog; HD Radio Model Only"

- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  type: string
  command: "HTS"
  query_command: "QSTN"
  notes: "mmnnoo; mm: 00=not HD, 01=HD; nn: current Program \"01\"-\"08\"; oo: receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.); HD Radio Model Only"

- id: zone2_tone
  label: Zone 2 Tone
  type: string
  command: "ZTN"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: zone3_mute_state
  label: Zone 3 Mute State
  type: enum
  values: ["00", "01"]
  command: "MT3"
  query_command: "QSTN"
  notes: "00=Off, 01=On"

- id: zone3_tone
  label: Zone 3 Tone
  type: string
  command: "TN3"
  query_command: "QSTN"
  notes: "BxxTxx; xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"

- id: zone3_input_selector
  label: Zone 3 Input Selector
  type: string
  command: "SL3"
  query_command: "QSTN"
  notes: "Gets The Selector Position"

- id: zone3_tuner_frequency
  label: Zone 3 Tuner Frequency
  type: string
  command: "TU3"
  query_command: "QSTN"
  notes: "nnnnn"

- id: zone3_tuner_preset
  label: Zone 3 Tuner Preset
  type: string
  command: "PR3"
  query_command: "QSTN"
  notes: "\"01\"-\"28\" or \"01\"-\"1E\"; In hexadecimal representation"

- id: zone4_mute_state
  label: Zone 4 Mute State
  type: enum
  values: ["00", "01"]
  command: "MT4"
  query_command: "QSTN"
  notes: "00=Off, 01=On"

- id: zone4_input_selector
  label: Zone 4 Input Selector
  type: string
  command: "SL4"
  query_command: "QSTN"
  notes: "Gets The Selector Position"

- id: zone4_tuner_frequency
  label: Zone 4 Tuner Frequency
  type: string
  command: "TU4"
  query_command: "QSTN"
  notes: "nnnnn"

- id: zone4_tuner_preset
  label: Zone 4 Tuner Preset
  type: string
  command: "PR4"
  query_command: "QSTN"
  notes: "\"01\"-\"28\" or \"01\"-\"1E\"; In hexadecimal representation"
```

## Variables

```yaml
# UNRESOLVED: no distinct settable parameters beyond those in Actions/Feedbacks found in source
```

## Events

```yaml
# Unsolicited status notifications (Event Notice Communication)
# The receiver sends the current state of any changed parameter to the controller automatically.
# Format is the same as command responses. Examples:
# - Power state change: !1PWR01[EOF]
# - Input change: !1SLI23[EOF]
# - Volume change: !1MVL28[EOF]
# Note: Requires a persistent TCP connection; one client connection maximum.
# The receiver notifies within 50ms of any state change.
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings or interlock procedures found in source.
# Note: Zone 2 volume and selector only work when main zone is ON (source footnote).
```

## Notes

**Protocol framing (RS-232C):**
- Each command is framed as `!1{CMD}{PARAM}[CR]` (or [LF] or [CR][LF])
- Device responses are framed as `!1{CMD}{VALUE}[EOF]` where [EOF] = 0x1A
- The unit type character is always "1" for Receiver

**Protocol framing (eISCP / Ethernet):**
- Commands are wrapped in an eISCP packet with a 16-byte header (magic "ISCP", header size 0x10, data size, version 0x01, reserved 0x000000) in big-endian byte order
- The ISCP payload is the same as RS-232 but end character is [EOF][CR][LF]
- Default TCP port: 60128; configurable in receiver setup menu to 49152–65535
- Only one simultaneous client connection is supported
- A persistent connection is required to receive unsolicited status notifications
- Minimum 50ms interval between received messages required

**Query protocol:**
- To query any state, send the command with parameter "QSTN" (e.g., `!1PWRQSTN`)
- The receiver responds within 50ms; no response within 50ms indicates failure

**Zone dependencies:**
- Zone 2 volume/selector require the main zone to be powered on
- Tuner (TUN/PRS) is shared between main zone and Zone 2; Zone 3/4 have separate tuner control
- Net-Tune/Network playback is shared between all zones

**RI (Remote Interactive) bus:**
- The CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS commands control connected RI devices (CD, tape, MD, DVD, dock, etc.) via the RI bus — not direct TCP/serial commands to those devices

**FFW/REW continuous requirement:**
- Net/USB FF and REW commands (NTC FF/REW) must be sent continuously with no more than 100ms delay between codes

**XM/SIRIUS availability:**
- XM (inputs 31, SCH, XCH, XCN, XAT, XTI, XCT) and SIRIUS (input 32, SCH, SCN, SAT, STI, SCT, SLK) commands are only available on XM/SIRIUS-equipped models

<!-- UNRESOLVED: specific DTR model numbers compatible with this ISCP v1.15 spec not listed in source -->
<!-- UNRESOLVED: eISCP packet byte-level encoding details for header fields beyond what is described above -->
<!-- UNRESOLVED: complete list of models supporting Zone 3 and Zone 4 not specified -->
<!-- UNRESOLVED: HD Radio commands (HAT, HCN, HTI, HDS, HPR, HBL, HTS) require HD Radio-equipped models; model list not specified -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-19T04:26:35.609Z
last_checked_at: 2026-10-07T17:48:39.589Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:48:39.589Z
matched_actions: 247
action_count: 247
confidence: medium
summary: "All 247 action units match source command tokens and parameters, and transport values are supported. The source is a generic ISCP guide that never names DTR models. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact DTR model numbers compatible with this protocol version (v1.15) not enumerated in source"
- "no distinct settable parameters beyond those in Actions/Feedbacks found in source"
- "no explicit multi-step sequences described in source"
- "specific DTR model numbers compatible with this ISCP v1.15 spec not listed in source"
- "eISCP packet byte-level encoding details for header fields beyond what is described above"
- "complete list of models supporting Zone 3 and Zone 4 not specified"
- "HD Radio commands (HAT, HCN, HTI, HDS, HPR, HBL, HTS) require HD Radio-equipped models; model list not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
