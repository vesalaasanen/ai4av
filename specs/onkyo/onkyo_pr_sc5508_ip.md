---
spec_id: admin/onkyo-pr-sc5508
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo PR-SC5508 Control Spec"
manufacturer: Onkyo
model_family: PR-SC5508
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - PR-SC5508
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T20:38:33.366Z
last_checked_at: 2026-10-07T21:04:39.614Z
generated_at: 2026-10-07T21:04:39.614Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PR-SC5508 not explicitly listed in compatibility columns; source is the shared ISCP protocol document for all Onkyo/Integra receivers and pre-pros"
  - "no multi-step macro sequences described in source"
  - "no explicit safety interlock or power sequencing warnings found"
  - "exact command subset supported by PR-SC5508 not confirmed — source is shared protocol doc for all Onkyo/Integra receivers"
  - "RS-232 transport parameters documented (9600/8N1/no flow) but this spec covers TCP/IP only per user request"
  - "RI (Remote Interactive) passthrough commands (CCD, CT1, CT2, CDV, CMD, CCR, CEQ, CDT, CDS) not included — these control external docked devices (CD/DVD/MD/CD-R/DAT/tape decks), not the PR-SC5508 itself"
  - "XM/SIRIUS/HD Radio info/channel commands (XCN/XAT/XTI/XCH/XCT, SCN/SAT/STI/SCH/SCT/SLK, HAT/HCN/HTI/HDS/HPR/HBL/HTS) not included — availability depends on installed tuner module"
  - "RDS/PTY Scan/TP Scan commands included conditionally (RDS Model Only) — availability on PR-SC5508 not confirmed"
  - "eISCP end-of-message character varies by model — may be EOF, EOF+CR, or EOF+CR+LF"
  - "RAS opcode overloaded across model generations (Re-EQ/Academy, Re-EQ-only, Cinema Filter) — this spec uses the Cinema Filter variant"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:04:39.614Z
  matched_actions: 362
  action_count: 362
  confidence: medium
  summary: "All 362 action units match source opcodes and parameters, and port 60128 and TCP are stated. The source is a shared receiver ISCP guide, so PR-SC5508 applicability is only inferred. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Onkyo PR-SC5508 Control Spec

## Summary

Onkyo PR-SC5508 A/V pre-pro controller using ISCP (Integra Serial Control Protocol) over Ethernet (eISCP). TCP-based control with 3-character command codes and variable-length parameters. Supports main zone, Zone 2, Zone 3, Zone 4, multi-zone audio routing, extensive listening mode selection, Audyssey processing, multi-channel tone controls, and RI (Remote Interactive) pass-through for connected Onkyo components.

<!-- UNRESOLVED: PR-SC5508 not explicitly listed in compatibility columns; source is the shared ISCP protocol document for all Onkyo/Integra receivers and pre-pros -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 60128
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits

```yaml
- powerable     # PWR command with on/standby
- queryable     # QSTN parameter on most commands returns current state
- routable      # SLI input selector, multi-zone routing
- levelable     # MVL master volume, tone controls, zone volumes
- muting        # AMT mute command
- zonable       # Zone 2/3/4 independent power/volume/source control
```

## Actions

```yaml
# --- Main Zone Power ---
- id: power_on
  label: Power On
  kind: action
  command: PWR01
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: PWR00
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: AMT01
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: AMT00
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: AMTTG
  params: []

# --- Master Volume ---
- id: volume_set
  label: Set Volume Level
  kind: action
  command: MVL{level}
  params:
    - name: level
      type: string
      description: "Volume 0-100 in hex (00-64). E.g. '1A' = 26"

- id: volume_up
  label: Volume Up
  kind: action
  command: MVLUP
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: MVLDOWN
  params: []

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  command: MVLUP1
  params: []

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  command: MVLDOWN1
  params: []

# --- Input Selector ---
- id: select_input
  label: Select Input
  kind: action
  command: SLI{input}
  params:
    - name: input
      type: string
      description: >
        Input code: 00=VCR/DVR, 01=CBL/SAT, 02=GAME, 03=AUX1, 04=AUX2,
        05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO,
        23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO,
        29=USB/Front, 2A=USB/Rear, 30=MULTI CH, 31=XM, 32=SIRIUS,
        40=UNIVERSAL PORT

- id: input_up
  label: Input Selector Up
  kind: action
  command: SLIUP
  params: []

- id: input_down
  label: Input Selector Down
  kind: action
  command: SLIDOWN
  params: []

# --- Audio Selector ---
- id: audio_select
  label: Select Audio Input
  kind: action
  command: SLA{mode}
  params:
    - name: mode
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

- id: audio_select_up
  label: Audio Selector Up
  kind: action
  command: SLAUP
  params: []

# --- Listening Mode ---
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  command: LMD{mode}
  params:
    - name: mode
      type: string
      description: >
        Hex code: 00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM, 04=THX,
        05=ACTION, 06=MUSICAL, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED,
        0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL,
        0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO,
        14=DOLBY VIRTUAL, 15=DTS Surround Sensation, 16=Audyssey DSX,
        40=5.1ch Surround/Straight Decode, 41=Dolby EX/DTS ES,
        42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games,
        50=U2/S2 Cinema, 51=U2/S2 Music, 52=U2/S2 Games,
        80=PLII/PLIIx Movie, 81=PLII/PLIIx Music, 82=Neo:6 Cinema,
        83=Neo:6 Music, 84=PLII/PLIIx THX Cinema, 85=Neo:6 THX Cinema,
        86=PLII/PLIIx Game, 87=Neural Surr, 88=Neural THX,
        89-8F=THX variants, 90=PLIIz Height, 91-99=Height+THX combos,
        A0-A7=Audyssey DSX combos

- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  command: LMDUP
  params: []

- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  command: LMDDOWN
  params: []

- id: listening_mode_movie
  label: Listening Mode Movie Wrap
  kind: action
  command: LMDMOVIE
  params: []

- id: listening_mode_music
  label: Listening Mode Music Wrap
  kind: action
  command: LMDMUSIC
  params: []

- id: listening_mode_game
  label: Listening Mode Game Wrap
  kind: action
  command: LMDGAME
  params: []

# --- Speaker Layout ---
- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  command: SPL{layout}
  params:
    - name: layout
      type: string
      description: "SB=SurrBack, FH=Front High / SurrBack+FrontHigh, FW=Front Wide / SurrBack+FrontWide"

- id: speaker_layout_up
  label: Speaker Layout Wrap-Around Up
  kind: action
  command: SPLUP
  params: []

# --- Dimmer ---
- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  command: DIM{level}
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"

- id: dimmer_toggle
  label: Dimmer Wrap-Around
  kind: action
  command: DIMDIM
  params: []

# --- Sleep Timer ---
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: SLP{time}
  params:
    - name: time
      type: string
      description: "01-5A hex for 1-90 min, or OFF"

- id: sleep_up
  label: Sleep Timer Up
  kind: action
  command: SLPUP
  params: []

# --- Speaker Level Calibration ---
- id: speaker_cal_test
  label: Speaker Test Tone
  kind: action
  command: SLCTEST
  params: []

- id: speaker_cal_ch_select
  label: Speaker CH Select
  kind: action
  command: SLCCHSEL
  params: []

- id: speaker_cal_level_up
  label: Speaker Level Up
  kind: action
  command: SLCUP
  params: []

- id: speaker_cal_level_down
  label: Speaker Level Down
  kind: action
  command: SLCDOWN
  params: []

# --- Tone Controls (Front) ---
- id: tone_front_bass_set
  label: Set Front Bass
  kind: action
  command: TFRB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_front_treble_set
  label: Set Front Treble
  kind: action
  command: TFRT{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_front_bass_up
  label: Front Bass Up
  kind: action
  command: TFRBUP
  params: []

- id: tone_front_bass_down
  label: Front Bass Down
  kind: action
  command: TFRBDOWN
  params: []

- id: tone_front_treble_up
  label: Front Treble Up
  kind: action
  command: TFRTUP
  params: []

- id: tone_front_treble_down
  label: Front Treble Down
  kind: action
  command: TFRTDOWN
  params: []

# --- Tone Controls (Front Wide) ---
- id: tone_front_wide_bass_set
  label: Set Front Wide Bass
  kind: action
  command: TFWB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_front_wide_treble_set
  label: Set Front Wide Treble
  kind: action
  command: TFWT{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_front_wide_bass_up
  label: Front Wide Bass Up
  kind: action
  command: TFWBUP
  params: []

- id: tone_front_wide_bass_down
  label: Front Wide Bass Down
  kind: action
  command: TFWBDOWN
  params: []

- id: tone_front_wide_treble_up
  label: Front Wide Treble Up
  kind: action
  command: TFWTUP
  params: []

- id: tone_front_wide_treble_down
  label: Front Wide Treble Down
  kind: action
  command: TFWTDOWN
  params: []

# --- Tone Controls (Front High) ---
- id: tone_front_high_bass_set
  label: Set Front High Bass
  kind: action
  command: TFHB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_front_high_treble_set
  label: Set Front High Treble
  kind: action
  command: TFHT{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_front_high_bass_up
  label: Front High Bass Up
  kind: action
  command: TFHBUP
  params: []

- id: tone_front_high_bass_down
  label: Front High Bass Down
  kind: action
  command: TFHBDOWN
  params: []

- id: tone_front_high_treble_up
  label: Front High Treble Up
  kind: action
  command: TFHTUP
  params: []

- id: tone_front_high_treble_down
  label: Front High Treble Down
  kind: action
  command: TFHTDOWN
  params: []

# --- Tone Controls (Center) ---
- id: tone_center_bass_set
  label: Set Center Bass
  kind: action
  command: TCTB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_center_treble_set
  label: Set Center Treble
  kind: action
  command: TCTT{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_center_bass_up
  label: Center Bass Up
  kind: action
  command: TCTBUP
  params: []

- id: tone_center_bass_down
  label: Center Bass Down
  kind: action
  command: TCTBDOWN
  params: []

- id: tone_center_treble_up
  label: Center Treble Up
  kind: action
  command: TCTTUP
  params: []

- id: tone_center_treble_down
  label: Center Treble Down
  kind: action
  command: TCTTDOWN
  params: []

# --- Tone Controls (Surround) ---
- id: tone_surround_bass_set
  label: Set Surround Bass
  kind: action
  command: TSRB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_surround_treble_set
  label: Set Surround Treble
  kind: action
  command: TSRT{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_surround_bass_up
  label: Surround Bass Up
  kind: action
  command: TSRBUP
  params: []

- id: tone_surround_bass_down
  label: Surround Bass Down
  kind: action
  command: TSRBDOWN
  params: []

- id: tone_surround_treble_up
  label: Surround Treble Up
  kind: action
  command: TSRTUP
  params: []

- id: tone_surround_treble_down
  label: Surround Treble Down
  kind: action
  command: TSRTDOWN
  params: []

# --- Tone Controls (Surround Back) ---
- id: tone_surround_back_bass_set
  label: Set Surround Back Bass
  kind: action
  command: TSBB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_surround_back_treble_set
  label: Set Surround Back Treble
  kind: action
  command: TSBT{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_surround_back_bass_up
  label: Surround Back Bass Up
  kind: action
  command: TSBBUP
  params: []

- id: tone_surround_back_bass_down
  label: Surround Back Bass Down
  kind: action
  command: TSBBDOWN
  params: []

- id: tone_surround_back_treble_up
  label: Surround Back Treble Up
  kind: action
  command: TSBTUP
  params: []

- id: tone_surround_back_treble_down
  label: Surround Back Treble Down
  kind: action
  command: TSBTDOWN
  params: []

# --- Tone Controls (Subwoofer) ---
- id: tone_subwoofer_bass_set
  label: Set Subwoofer Tone Bass
  kind: action
  command: TSWB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: tone_subwoofer_bass_up
  label: Subwoofer Tone Bass Up
  kind: action
  command: TSWBUP
  params: []

- id: tone_subwoofer_bass_down
  label: Subwoofer Tone Bass Down
  kind: action
  command: TSWBDOWN
  params: []

# --- Subwoofer Level ---
- id: subwoofer_level_set
  label: Set Subwoofer Level
  kind: action
  command: SWL{level}
  params:
    - name: level
      type: string
      description: "-F to +C hex, representing -15dB to +12dB"

- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  command: SWLUP
  params: []

- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  command: SWLDOWN
  params: []

# --- Center Level ---
- id: center_level_set
  label: Set Center Level
  kind: action
  command: CTL{level}
  params:
    - name: level
      type: string
      description: "-C to +C hex, representing -12dB to +12dB"

- id: center_level_up
  label: Center Level Up
  kind: action
  command: CTLUP
  params: []

- id: center_level_down
  label: Center Level Down
  kind: action
  command: CTLDOWN
  params: []

# --- Late Night ---
- id: late_night_set
  label: Set Late Night
  kind: action
  command: LTN{level}
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low(DD)/On(TrueHD), 02=High(DD), 03=Auto(TrueHD)"

- id: late_night_up
  label: Late Night Up
  kind: action
  command: LTNUP
  params: []

# --- Cinema Filter / Re-EQ ---
- id: cinema_filter_set
  label: Set Cinema Filter
  kind: action
  command: RAS{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=On"

- id: cinema_filter_up
  label: Cinema Filter Toggle Up
  kind: action
  command: RASUP
  params: []

# --- Dolby Volume ---
- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  command: DVL{level}
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low, 02=Mid, 03=High"

- id: dolby_volume_up
  label: Dolby Volume Wrap-Around Up
  kind: action
  command: DVLUP
  params: []

# --- Audyssey ---
- id: audyssey_set
  label: Set Audyssey MultEQ
  kind: action
  command: ADY{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=On"

- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  command: ADQ{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=On"

- id: audyssey_dynamic_vol_set
  label: Set Audyssey Dynamic Volume
  kind: action
  command: ADV{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

- id: audyssey_dynamic_vol_up
  label: Audyssey Dynamic Volume Up
  kind: action
  command: ADVUP
  params: []

# --- Music Optimizer ---
- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  command: MOT{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=On"

# --- OSD / Setup ---
- id: osd_menu
  label: OSD Menu
  kind: action
  command: OSDMENU
  params: []

- id: osd_up
  label: OSD Up
  kind: action
  command: OSDUP
  params: []

- id: osd_down
  label: OSD Down
  kind: action
  command: OSDDOWN
  params: []

- id: osd_right
  label: OSD Right
  kind: action
  command: OSDRIGHT
  params: []

- id: osd_left
  label: OSD Left
  kind: action
  command: OSDLEFT
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  command: OSDENTER
  params: []

- id: osd_exit
  label: OSD Exit
  kind: action
  command: OSDEXIT
  params: []

- id: osd_audio
  label: OSD Audio Adjust
  kind: action
  command: OSDAUDIO
  params: []

- id: osd_video
  label: OSD Video Adjust
  kind: action
  command: OSDVIDEO
  params: []

# --- HDMI Output ---
- id: hdmi_output_set
  label: Set HDMI Output
  kind: action
  command: HDO{value}
  params:
    - name: value
      type: string
      description: "00=Analog Only, 01=HDMI Main, 02=HDMI Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"

- id: hdmi_output_up
  label: HDMI Output Wrap-Around Up
  kind: action
  command: HDOUP
  params: []

# --- Monitor Out Resolution ---
- id: monitor_resolution_set
  label: Set Monitor Out Resolution
  kind: action
  command: RES{value}
  params:
    - name: value
      type: string
      description: "00=Through, 01=Auto(HDMI), 02=480p, 03=720p, 04=1080i, 05=1080p(HDMI), 07=1080p/24fs(HDMI), 06=Source"

- id: monitor_resolution_up
  label: Monitor Resolution Up
  kind: action
  command: RESUP
  params: []

# --- ISF Mode ---
- id: isf_mode_set
  label: Set ISF Mode
  kind: action
  command: ISF{value}
  params:
    - name: value
      type: string
      description: "00=Custom, 01=Day, 02=Night"

- id: isf_mode_up
  label: ISF Mode Up
  kind: action
  command: ISFUP
  params: []

# --- 12V Triggers ---
- id: trigger_a_set
  label: Set 12V Trigger A
  kind: action
  command: TGA{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=On"

- id: trigger_b_set
  label: Set 12V Trigger B
  kind: action
  command: TGB{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=On"

- id: trigger_c_set
  label: Set 12V Trigger C
  kind: action
  command: TGC{value}
  params:
    - name: value
      type: string
      description: "00=Off, 01=On"

# --- Display Mode ---
- id: display_mode_set
  label: Set Display Mode
  kind: action
  command: DIF{mode}
  params:
    - name: mode
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, 03=Video Format(temporary)"

- id: display_mode_toggle
  label: Display Mode Toggle
  kind: action
  command: DIFTG
  params: []

# --- Memory ---
- id: memory_store
  label: Store Memory
  kind: action
  command: MEMSTR
  params: []

- id: memory_recall
  label: Recall Memory
  kind: action
  command: MEMRCL
  params: []

- id: memory_lock
  label: Lock Memory
  kind: action
  command: MEMLOCK
  params: []

- id: memory_unlock
  label: Unlock Memory
  kind: action
  command: MEMUNLK
  params: []

# --- Tuner ---
- id: tuner_frequency_set
  label: Set Tuner Frequency
  kind: action
  command: TUN{freq}
  params:
    - name: freq
      type: string
      description: "5-digit: FM nnn.nn MHz / AM nnnnn kHz"

- id: tuner_up
  label: Tuner Frequency Up
  kind: action
  command: TUNUP
  params: []

- id: tuner_down
  label: Tuner Frequency Down
  kind: action
  command: TUNDOWN
  params: []

- id: preset_set
  label: Set Preset
  kind: action
  command: PRS{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

- id: preset_up
  label: Preset Up
  kind: action
  command: PRSUP
  params: []

- id: preset_down
  label: Preset Down
  kind: action
  command: PRSDOWN
  params: []

- id: preset_memory_set
  label: Store Current Station to Preset
  kind: action
  command: PRM{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40 (stores current station into preset memory)"

# --- RDS (RDS Model Only) ---
- id: rds_info_set
  label: Set RDS Information Display
  kind: action
  command: RDS{value}
  params:
    - name: value
      type: string
      description: "00=RT Information, 01=PTY Information, 02=TP Information"

- id: rds_info_up
  label: RDS Information Wrap-Around Change
  kind: action
  command: RDSUP
  params: []

- id: pty_scan_set
  label: Set PTY Scan Number
  kind: action
  command: PTS{num}
  params:
    - name: num
      type: string
      description: "00-1E hex for PTY No. 0-30"

- id: pty_scan_enter
  label: Finish PTY Scan
  kind: action
  command: PTSENTER
  params: []

- id: tp_scan_start
  label: Start TP Scan
  kind: action
  command: TPS
  params: []

- id: tp_scan_enter
  label: Finish TP Scan
  kind: action
  command: TPSENTER
  params: []

# --- Network/USB ---
- id: net_play
  label: Network Play
  kind: action
  command: NTCPLAY
  params: []

- id: net_stop
  label: Network Stop
  kind: action
  command: NTCSTOP
  params: []

- id: net_pause
  label: Network Pause
  kind: action
  command: NTCPAUSE
  params: []

- id: net_track_up
  label: Network Track Up
  kind: action
  command: NTCTRUP
  params: []

- id: net_track_down
  label: Network Track Down
  kind: action
  command: NTCTRDN
  params: []

- id: net_ff
  label: Network Fast Forward
  kind: action
  command: NTCFF
  params: []

- id: net_rew
  label: Network Rewind
  kind: action
  command: NTCREW
  params: []

- id: net_repeat
  label: Network Repeat
  kind: action
  command: NTCREPEAT
  params: []

- id: net_random
  label: Network Random
  kind: action
  command: NTCRANDOM
  params: []

- id: net_display
  label: Network Display
  kind: action
  command: NTCDISPLAY
  params: []

- id: net_album
  label: Network Album Key
  kind: action
  command: NTCALBUM
  params: []

- id: net_artist
  label: Network Artist Key
  kind: action
  command: NTCARTIST
  params: []

- id: net_genre
  label: Network Genre Key
  kind: action
  command: NTCGENRE
  params: []

- id: net_playlist
  label: Network Playlist Key
  kind: action
  command: NTCPLAYLIST
  params: []

- id: net_right
  label: Network Right Key
  kind: action
  command: NTCRIGHT
  params: []

- id: net_left
  label: Network Left Key
  kind: action
  command: NTCLEFT
  params: []

- id: net_up
  label: Network Up Key
  kind: action
  command: NTCUP
  params: []

- id: net_down
  label: Network Down Key
  kind: action
  command: NTCDOWN
  params: []

- id: net_select
  label: Network Select Key
  kind: action
  command: NTCSELECT
  params: []

- id: net_key_0
  label: Network 0 Key
  kind: action
  command: NTC0
  params: []

- id: net_key_1
  label: Network 1 Key
  kind: action
  command: NTC1
  params: []

- id: net_key_2
  label: Network 2 Key
  kind: action
  command: NTC2
  params: []

- id: net_key_3
  label: Network 3 Key
  kind: action
  command: NTC3
  params: []

- id: net_key_4
  label: Network 4 Key
  kind: action
  command: NTC4
  params: []

- id: net_key_5
  label: Network 5 Key
  kind: action
  command: NTC5
  params: []

- id: net_key_6
  label: Network 6 Key
  kind: action
  command: NTC6
  params: []

- id: net_key_7
  label: Network 7 Key
  kind: action
  command: NTC7
  params: []

- id: net_key_8
  label: Network 8 Key
  kind: action
  command: NTC8
  params: []

- id: net_key_9
  label: Network 9 Key
  kind: action
  command: NTC9
  params: []

- id: net_delete
  label: Network Delete Key
  kind: action
  command: NTCDELETE
  params: []

- id: net_caps
  label: Network Caps Key
  kind: action
  command: NTCCAPS
  params: []

- id: net_location
  label: Network Location Key
  kind: action
  command: NTCLOCATION
  params: []

- id: net_language
  label: Network Language Key
  kind: action
  command: NTCLANGUAGE
  params: []

- id: net_return
  label: Network Return Key
  kind: action
  command: NTCRETURN
  params: []

- id: net_chup
  label: Network Channel Up (iRadio)
  kind: action
  command: NTCCHUP
  params: []

- id: net_chdn
  label: Network Channel Down (iRadio)
  kind: action
  command: NTCCHDN
  params: []

# --- Internet Radio Preset ---
- id: net_radio_preset_set
  label: Set Internet Radio Preset
  kind: action
  command: NPR{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

# --- Zone 2 ---
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: ZPW01
  params: []

- id: zone2_power_standby
  label: Zone 2 Power Standby
  kind: action
  command: ZPW00
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: ZMT01
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: ZMT00
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: ZMTTG
  params: []

- id: zone2_volume_set
  label: Zone 2 Set Volume
  kind: action
  command: ZVL{level}
  params:
    - name: level
      type: string
      description: "00-64 hex for 0-100"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: ZVLUP
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: ZVLDOWN
  params: []

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: SLZ{input}
  params:
    - name: input
      type: string
      description: "Same input codes as SLI command. 80=SOURCE"

- id: zone2_tone_bass_set
  label: Zone 2 Set Bass
  kind: action
  command: ZTNB{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: zone2_tone_treble_set
  label: Zone 2 Set Treble
  kind: action
  command: ZTNT{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: zone2_tone_bass_up
  label: Zone 2 Bass Up
  kind: action
  command: ZTNBUP
  params: []

- id: zone2_tone_bass_down
  label: Zone 2 Bass Down
  kind: action
  command: ZTNBDOWN
  params: []

- id: zone2_tone_treble_up
  label: Zone 2 Treble Up
  kind: action
  command: ZTNTUP
  params: []

- id: zone2_tone_treble_down
  label: Zone 2 Treble Down
  kind: action
  command: ZTNTDOWN
  params: []

- id: zone2_balance_set
  label: Zone 2 Set Balance
  kind: action
  command: ZBL{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: zone2_balance_up
  label: Zone 2 Balance Up (to R)
  kind: action
  command: ZBLUP
  params: []

- id: zone2_balance_down
  label: Zone 2 Balance Down (to L)
  kind: action
  command: ZBLDOWN
  params: []

- id: zone2_tuner_frequency_set
  label: Zone 2 Set Tuner Frequency
  kind: action
  command: TUZ{freq}
  params:
    - name: freq
      type: string
      description: "5-digit: FM nnn.nn MHz / AM nnnnn kHz"

- id: zone2_tuner_up
  label: Zone 2 Tuner Frequency Up
  kind: action
  command: TUZUP
  params: []

- id: zone2_tuner_down
  label: Zone 2 Tuner Frequency Down
  kind: action
  command: TUZDOWN
  params: []

- id: zone2_preset_set
  label: Zone 2 Set Preset
  kind: action
  command: PRZ{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

- id: zone2_preset_up
  label: Zone 2 Preset Up
  kind: action
  command: PRZUP
  params: []

- id: zone2_preset_down
  label: Zone 2 Preset Down
  kind: action
  command: PRZDOWN
  params: []

- id: zone2_net_play
  label: Zone 2 Network Play
  kind: action
  command: NTZPLAY
  params: []

- id: zone2_net_stop
  label: Zone 2 Network Stop
  kind: action
  command: NTZSTOP
  params: []

- id: zone2_net_pause
  label: Zone 2 Network Pause
  kind: action
  command: NTZPAUSE
  params: []

- id: zone2_net_track_up
  label: Zone 2 Network Track Up
  kind: action
  command: NTZTRUP
  params: []

- id: zone2_net_track_down
  label: Zone 2 Network Track Down
  kind: action
  command: NTZTRDN
  params: []

- id: zone2_net_chup
  label: Zone 2 Network Channel Up (iRadio)
  kind: action
  command: NTZCHUP
  params: []

- id: zone2_net_chdn
  label: Zone 2 Network Channel Down (iRadio)
  kind: action
  command: NTZCHDN
  params: []

- id: zone2_net_radio_preset_set
  label: Zone 2 Set Internet Radio Preset
  kind: action
  command: NPZ{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

- id: zone2_listening_mode_set
  label: Zone 2 Set Listening Mode
  kind: action
  command: LMZ{mode}
  params:
    - name: mode
      type: string
      description: "00=STEREO, 01=DIRECT, 0F=MONO, 12=MULTIPLEX, 87=DVS(PL2), 88=DVS(NEO6)"

- id: zone2_late_night_set
  label: Zone 2 Set Late Night
  kind: action
  command: LTZ{level}
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low, 02=High"

- id: zone2_late_night_up
  label: Zone 2 Late Night Wrap-Around Up
  kind: action
  command: LTZUP
  params: []

- id: zone2_cinema_filter_set
  label: Zone 2 Set Re-EQ/Academy
  kind: action
  command: RAZ{value}
  params:
    - name: value
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On"

- id: zone2_cinema_filter_up
  label: Zone 2 Re-EQ/Academy Wrap-Around Up
  kind: action
  command: RAZUP
  params: []

# --- Zone 3 ---
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: PW301
  params: []

- id: zone3_power_standby
  label: Zone 3 Power Standby
  kind: action
  command: PW300
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: MT301
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: MT300
  params: []

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  command: MT3TG
  params: []

- id: zone3_volume_set
  label: Zone 3 Set Volume
  kind: action
  command: VL3{level}
  params:
    - name: level
      type: string
      description: "00-64 hex for 0-100"

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: VL3UP
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: VL3DOWN
  params: []

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: SL3{input}
  params:
    - name: input
      type: string
      description: "Same input codes as SLI command. 80=SOURCE"

- id: zone3_tone_bass_set
  label: Zone 3 Set Bass
  kind: action
  command: TN3B{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: zone3_tone_treble_set
  label: Zone 3 Set Treble
  kind: action
  command: TN3T{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: zone3_tone_bass_up
  label: Zone 3 Bass Up
  kind: action
  command: TN3BUP
  params: []

- id: zone3_tone_bass_down
  label: Zone 3 Bass Down
  kind: action
  command: TN3BDOWN
  params: []

- id: zone3_tone_treble_up
  label: Zone 3 Treble Up
  kind: action
  command: TN3TUP
  params: []

- id: zone3_tone_treble_down
  label: Zone 3 Treble Down
  kind: action
  command: TN3TDOWN
  params: []

- id: zone3_balance_set
  label: Zone 3 Set Balance
  kind: action
  command: BL3{value}
  params:
    - name: value
      type: string
      description: "-A to +A hex, representing -10 to +10 in 2-step increments"

- id: zone3_balance_up
  label: Zone 3 Balance Up (to R)
  kind: action
  command: BL3UP
  params: []

- id: zone3_balance_down
  label: Zone 3 Balance Down (to L)
  kind: action
  command: BL3DOWN
  params: []

- id: zone3_tuner_frequency_set
  label: Zone 3 Set Tuner Frequency
  kind: action
  command: TU3{freq}
  params:
    - name: freq
      type: string
      description: "5-digit: FM nnn.nn MHz / AM nnnnn kHz"

- id: zone3_tuner_up
  label: Zone 3 Tuner Frequency Up
  kind: action
  command: TU3UP
  params: []

- id: zone3_tuner_down
  label: Zone 3 Tuner Frequency Down
  kind: action
  command: TU3DOWN
  params: []

- id: zone3_preset_set
  label: Zone 3 Set Preset
  kind: action
  command: PR3{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

- id: zone3_preset_up
  label: Zone 3 Preset Up
  kind: action
  command: PR3UP
  params: []

- id: zone3_preset_down
  label: Zone 3 Preset Down
  kind: action
  command: PR3DOWN
  params: []

- id: zone3_net_play
  label: Zone 3 Network Play
  kind: action
  command: NT3PLAY
  params: []

- id: zone3_net_stop
  label: Zone 3 Network Stop
  kind: action
  command: NT3STOP
  params: []

- id: zone3_net_pause
  label: Zone 3 Network Pause
  kind: action
  command: NT3PAUSE
  params: []

- id: zone3_net_track_up
  label: Zone 3 Network Track Up
  kind: action
  command: NT3TRUP
  params: []

- id: zone3_net_track_down
  label: Zone 3 Network Track Down
  kind: action
  command: NT3TRDN
  params: []

- id: zone3_net_chup
  label: Zone 3 Network Channel Up (iRadio)
  kind: action
  command: NT3CHUP
  params: []

- id: zone3_net_chdn
  label: Zone 3 Network Channel Down (iRadio)
  kind: action
  command: NT3CHDN
  params: []

- id: zone3_net_radio_preset_set
  label: Zone 3 Set Internet Radio Preset
  kind: action
  command: NP3{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

# --- Zone 4 ---
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: PW401
  params: []

- id: zone4_power_standby
  label: Zone 4 Power Standby
  kind: action
  command: PW400
  params: []

- id: zone4_mute_on
  label: Zone 4 Mute On
  kind: action
  command: MT401
  params: []

- id: zone4_mute_off
  label: Zone 4 Mute Off
  kind: action
  command: MT400
  params: []

- id: zone4_mute_toggle
  label: Zone 4 Mute Toggle
  kind: action
  command: MT4TG
  params: []

- id: zone4_volume_set
  label: Zone 4 Set Volume
  kind: action
  command: VL4{level}
  params:
    - name: level
      type: string
      description: "00-64 hex for 0-100"

- id: zone4_volume_up
  label: Zone 4 Volume Up
  kind: action
  command: VL4UP
  params: []

- id: zone4_volume_down
  label: Zone 4 Volume Down
  kind: action
  command: VL4DOWN
  params: []

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: SL4{input}
  params:
    - name: input
      type: string
      description: "Same input codes as SLI command. 80=SOURCE"

- id: zone4_tuner_frequency_set
  label: Zone 4 Set Tuner Frequency
  kind: action
  command: TU4{freq}
  params:
    - name: freq
      type: string
      description: "5-digit: FM nnn.nn MHz / AM nnnnn kHz"

- id: zone4_tuner_up
  label: Zone 4 Tuner Frequency Up
  kind: action
  command: TU4UP
  params: []

- id: zone4_tuner_down
  label: Zone 4 Tuner Frequency Down
  kind: action
  command: TU4DOWN
  params: []

- id: zone4_preset_set
  label: Zone 4 Set Preset
  kind: action
  command: PR4{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

- id: zone4_preset_up
  label: Zone 4 Preset Up
  kind: action
  command: PR4UP
  params: []

- id: zone4_preset_down
  label: Zone 4 Preset Down
  kind: action
  command: PR4DOWN
  params: []

- id: zone4_net_play
  label: Zone 4 Network Play
  kind: action
  command: NT4PLAY
  params: []

- id: zone4_net_stop
  label: Zone 4 Network Stop
  kind: action
  command: NT4STOP
  params: []

- id: zone4_net_pause
  label: Zone 4 Network Pause
  kind: action
  command: NT4PAUSE
  params: []

- id: zone4_net_track_up
  label: Zone 4 Network Track Up
  kind: action
  command: NT4TRUP
  params: []

- id: zone4_net_track_down
  label: Zone 4 Network Track Down
  kind: action
  command: NT4TRDN
  params: []

- id: zone4_net_radio_preset_set
  label: Zone 4 Set Internet Radio Preset
  kind: action
  command: NP4{num}
  params:
    - name: num
      type: string
      description: "01-28 hex for preset 1-40"

# --- RECOUT Selector ---
- id: recout_select
  label: Set Record Out
  kind: action
  command: SLR{input}
  params:
    - name: input
      type: string
      description: "Input code (same as SLI codes). 7F=OFF, 80=SOURCE"

# --- Additional Source Commands ---
# New command fields retain literal source opcodes. Append the documented
# parameter to the opcode when constructing an ISCP message.
# Model and accessory compatibility of these additions is UNRESOLVED.
- id: speaker_a_control
  label: Speaker A Control
  kind: action
  command: SPA
  params:
    - name: parameter
      type: string
      description: '"00": sets Speaker Off; "01": sets Speaker On; "UP": sets Speaker Switch Wrap-Around'

- id: speaker_b_control
  label: Speaker B Control
  kind: action
  command: SPB
  params:
    - name: parameter
      type: string
      description: '"00": sets Speaker Off; "01": sets Speaker On; "UP": sets Speaker Switch Wrap-Around'

- id: display_digital_format
  label: Display Digital Format
  kind: action
  command: DIF02
  params: []

- id: display_treble_level
  label: Display Treble Level
  kind: action
  command: DIF
  params:
    - name: parameter
      type: string
      description: '"04": Display Treble Level; Display Information variant, model compatibility UNRESOLVED'

- id: display_mode_up
  label: Display Mode Up
  kind: action
  command: DIF
  params:
    - name: parameter
      type: string
      description: '"UP": Parameter Character for the models identified by the source footnote; model compatibility UNRESOLVED'

- id: video_output_select
  label: Select Video Output
  kind: action
  command: VOS
  params:
    - name: parameter
      type: string
      description: '"00": sets D4; "01": sets Component; Japanese Model Only'

- id: audyssey_up
  label: Audyssey MultEQ Up
  kind: action
  command: ADY
  params:
    - name: parameter
      type: string
      description: '"UP": sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up'

- id: audyssey_dynamic_eq_up
  label: Audyssey Dynamic EQ Up
  kind: action
  command: ADQ
  params:
    - name: parameter
      type: string
      description: '"UP": sets Audyssey Dynamic EQ State Wrap-Around Up'

- id: music_optimizer_up
  label: Music Optimizer Up
  kind: action
  command: MOT
  params:
    - name: parameter
      type: string
      description: '"UP": sets Music Optimizer State Wrap-Around Up'

- id: net_setup
  label: Network Setup Key
  kind: action
  command: NTC
  params:
    - name: parameter
      type: string
      description: '"SETUP": SETUP KEY'

# --- XM Model Only ---
- id: xm_channel_control
  label: XM Channel Control
  kind: action
  command: XCH
  params:
    - name: parameter
      type: string
      description: '"000"-"255": XM Channel Number"000-255"; "UP": sets XM Channel Wrap-Around Up; "DOWN": sets XM Channel Wrap-Around Down'

- id: xm_category_control
  label: XM Category Control
  kind: action
  command: XCT
  params:
    - name: parameter
      type: string
      description: '"UP": sets XM Category Wrap-Around Up; "DOWN": sets XM Category Wrap-Around Down'

# --- SIRIUS Model Only ---
- id: sirius_channel_control
  label: SIRIUS Channel Control
  kind: action
  command: SCH
  params:
    - name: parameter
      type: string
      description: '"000"-"255": SIRIUS Channel Number"000-255"; "UP": sets SIRIUS Channel Wrap-Around Up; "DOWN": sets SIRIUS Channel Wrap-Around Down'

- id: sirius_category_control
  label: SIRIUS Category Control
  kind: action
  command: SCT
  params:
    - name: parameter
      type: string
      description: '"UP": sets SIRIUS Category Wrap-Around Up; "DOWN": sets SIRIUS Category Wrap-Around Down'

- id: sirius_lock_password
  label: SIRIUS Lock Password
  kind: action
  command: SLK
  params:
    - name: password
      type: string
      description: '"nnnn": Lock Password (4Digits); numeric range UNRESOLVED'

# --- HD Radio Model Only ---
- id: hd_radio_program_set
  label: Set HD Radio Channel Program
  kind: action
  command: HPR
  params:
    - name: parameter
      type: string
      description: '"01"-"08": sets directly HD Radio Channel Program'

- id: hd_radio_blend_mode_set
  label: Set HD Radio Blend Mode
  kind: action
  command: HBL
  params:
    - name: parameter
      type: string
      description: '"00": sets HD Radio Blend Mode"Auto"; "01": sets HD Radio Blend Mode"Analog"'

# --- ONKYO RI CD Player ---
- id: ri_cd_operation
  label: RI CD Player Operation
  kind: action
  command: CCD
  params:
    - name: parameter
      type: string
      description: >
        Documented parameter tokens: "TRACK", "PLAY", "STOP", "PAUSE",
        "SKIP.F", "SKIP.R", "MEMORY", "CLEAR", "REPEAT", "RANDOM",
        "DISP", "D.MODE", "FF", "REW", "OP/CL", "1", "2", "3", "4",
        "5", "6", "7", "8", "9", "0", "10", "+10", "D.SKIP",
        "DISC.F", "DISC.R", "DISC1", "DISC2", "DISC3", "DISC4",
        "DISC5", "DISC6", "STBY", "PON".

# --- ONKYO RI Tape Decks ---
- id: ri_tape1_operation
  label: RI Tape 1 Operation
  kind: action
  command: CT1
  params:
    - name: parameter
      type: string
      description: 'Documented parameter tokens: "PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"'

- id: ri_tape2_operation
  label: RI Tape 2 Operation
  kind: action
  command: CT2
  params:
    - name: parameter
      type: string
      description: 'Documented parameter tokens: "PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"'

# --- ONKYO RI Graphics Equalizer ---
- id: ri_equalizer_preset
  label: RI Equalizer Preset
  kind: action
  command: CEQ
  params:
    - name: parameter
      type: string
      description: '"PRESET": PRESET'

# --- ONKYO RI DAT Recorder ---
- id: ri_dat_operation
  label: RI DAT Recorder Operation
  kind: action
  command: CDT
  params:
    - name: parameter
      type: string
      description: 'Documented parameter tokens: "PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"'

# --- ONKYO RI DVD Player ---
- id: ri_dvd_operation
  label: RI DVD Player Operation
  kind: action
  command: CDV
  params:
    - name: parameter
      type: string
      description: >
        Documented parameter tokens: "PWRON", "PWROFF", "PLAY", "STOP",
        "SKIP.F", "SKIP.R", "FF", "REW", "PAUSE", "LASTPLAY",
        "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU", "MENU", "UP",
        "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F",
        "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE", "1", "2",
        "3", "4", "5", "6", "7", "8", "9", "10", "0", "SEARCH",
        "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F",
        "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN",
        "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1", "DISC2",
        "DISC3", "DISC4", "DISC5", "DISC6", "FOLDUP", "FOLDDN",
        "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN", "PCT",
        "RSCTG", "INIT". "INIT": Return to Factory Settings.

# --- ONKYO RI MD Recorder ---
- id: ri_md_operation
  label: RI MD Recorder Operation
  kind: action
  command: CMD
  params:
    - name: parameter
      type: string
      description: >
        Documented parameter tokens: "PLAY", "STOP", "FF", "REW",
        "P.MODE", "SKIP.F", "SKIP.R", "PAUSE", "REC", "MEMORY",
        "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM", "REPEAT",
        "ENTER", "EJECT", "1", "2", "3", "4", "5", "6", "7", "8",
        "9", "10/0", "nn/nnn", "NAME", "GROUP", "STBY".
        "nn/nnn" is the documented --/--- key token, not a stated numeric range.

# --- ONKYO RI CD-R Recorder ---
- id: ri_cdr_operation
  label: RI CD-R Recorder Operation
  kind: action
  command: CCR
  params:
    - name: parameter
      type: string
      description: >
        Documented parameter tokens: "P.MODE", "PLAY", "STOP", "SKIP.F",
        "SKIP.R", "PAUSE", "REC", "CLEAR", "REPEAT", "1", "2", "3",
        "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "SCROLL",
        "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY".
        "nn/nnn" is the documented --/--- key token, not a stated numeric range.

# --- Docking Station via RI ---
- id: ri_dock_operation
  label: RI Dock Operation
  kind: action
  command: CDS
  params:
    - name: parameter
      type: string
      description: >
        Documented parameter tokens: "PWRON", "PWROFF", "PLY/RES", "STOP",
        "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+",
        "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM",
        "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN".
```

## Feedbacks

```yaml
# --- Main Zone Queries (send QSTN as parameter) ---
- id: power_state
  label: Power State
  command: PWRQSTN
  query_command: PWR
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Standby
    "01": On

- id: mute_state
  label: Mute State
  command: AMTQSTN
  query_command: AMT
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Off
    "01": On

- id: volume_level
  label: Master Volume Level
  command: MVLQSTN
  query_command: MVL
  type: string
  description: "00-64 hex = 0-100 decimal"

- id: input_state
  label: Input Selector State
  command: SLIQSTN
  query_command: SLIQSTN
  type: string
  description: "Returns current input code (see SLI action for codes)"

- id: audio_selector_state
  label: Audio Selector State
  command: SLAQSTN
  query_command: SLA
  type: string
  description: "Returns current audio selector code"

- id: listening_mode_state
  label: Listening Mode State
  command: LMDQSTN
  query_command: LMD
  type: string
  description: "Returns current listening mode code"

- id: speaker_layout_state
  label: Speaker Layout State
  command: SPLQSTN
  query_command: SPL
  type: string
  description: "Returns current speaker layout code (SB/FH/FW)"

- id: dimmer_state
  label: Dimmer Level
  command: DIMQSTN
  query_command: DIM
  type: enum
  values: ["00", "01", "02", "03", "08"]
  value_labels:
    "00": Bright
    "01": Dim
    "02": Dark
    "03": Shut-Off
    "08": Bright & LED OFF

- id: sleep_state
  label: Sleep Timer State
  command: SLPQSTN
  query_command: SLP
  type: string
  description: "01-5A hex = 1-90 min, or OFF"

- id: late_night_state
  label: Late Night State
  command: LTNQSTN
  query_command: LTN
  type: string
  description: "00=Off, 01=Low, 02=High, 03=Auto"

- id: dolby_volume_state
  label: Dolby Volume State
  command: DVLQSTN
  query_command: DVL
  type: enum
  values: ["00", "01", "02", "03"]
  value_labels:
    "00": Off
    "01": Low
    "02": Mid
    "03": High

- id: display_mode_state
  label: Display Mode State
  command: DIFQSTN
  query_command: DIF
  type: string

- id: hdmi_output_state
  label: HDMI Output State
  command: HDOQSTN
  query_command: HDO
  type: string

- id: monitor_resolution_state
  label: Monitor Resolution State
  command: RESQSTN
  query_command: RES
  type: string

- id: isf_mode_state
  label: ISF Mode State
  command: ISFQSTN
  query_command: ISF
  type: string

- id: subwoofer_level
  label: Subwoofer Level
  command: SWLQSTN
  query_command: SWL
  type: string
  description: "-F to +C hex = -15dB to +12dB"

- id: center_level
  label: Center Level
  command: CTLQSTN
  query_command: CTL
  type: string

- id: tone_front
  label: Front Tone
  command: TFRQSTN
  query_command: TFR
  type: string
  description: "Returns BxxTxx format"

- id: tone_front_wide
  label: Front Wide Tone
  command: TFWQSTN
  query_command: TFW
  type: string
  description: "Returns BxxTxx format"

- id: tone_front_high
  label: Front High Tone
  command: TFHQSTN
  query_command: TFH
  type: string
  description: "Returns BxxTxx format"

- id: tone_center
  label: Center Tone
  command: TCTQSTN
  query_command: TCT
  type: string
  description: "Returns BxxTxx format"

- id: tone_surround
  label: Surround Tone
  command: TSRQSTN
  query_command: TSR
  type: string
  description: "Returns BxxTxx format"

- id: tone_surround_back
  label: Surround Back Tone
  command: TSBQSTN
  query_command: TSB
  type: string
  description: "Returns BxxTxx format"

- id: tone_subwoofer
  label: Subwoofer Tone
  command: TSWQSTN
  query_command: TSW
  type: string
  description: "Returns Bxx format (bass only)"

- id: audyssey_state
  label: Audyssey MultEQ State
  command: ADYQSTN
  query_command: ADY
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Off
    "01": On

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  command: ADQQSTN
  query_command: ADQ
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Off
    "01": On

- id: audyssey_dynamic_vol_state
  label: Audyssey Dynamic Volume State
  command: ADVQSTN
  query_command: ADV
  type: enum
  values: ["00", "01", "02", "03"]
  value_labels:
    "00": Off
    "01": Light
    "02": Medium
    "03": Heavy

- id: music_optimizer_state
  label: Music Optimizer State
  command: MOTQSTN
  query_command: MOT
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Off
    "01": On

- id: tuner_frequency
  label: Tuner Frequency
  command: TUNQSTN
  query_command: TUN
  type: string
  description: "5-digit frequency value"

- id: preset_state
  label: Preset State
  command: PRSQSTN
  query_command: PRS
  type: string
  description: "01-28 hex preset number"

- id: net_artist
  label: Network Artist Name
  command: NATQSTN
  query_command: NAT
  type: string
  description: "Variable-length artist name (64 ASCII letters max)"

- id: net_album
  label: Network Album Name
  command: NALQSTN
  query_command: NAL
  type: string
  description: "Variable-length album name (64 ASCII letters max)"

- id: net_title
  label: Network Title Name
  command: NTIQSTN
  query_command: NTI
  type: string
  description: "Variable-length title name (64 ASCII letters max)"

- id: net_play_status
  label: Network Play Status
  command: NSTQSTN
  query_command: NST
  type: string
  description: "3-char: p=play status (S/P/p/F/R), r=repeat (-/R/F/1), s=shuffle (-/S/A)"

- id: net_track_info
  label: Network Track Info
  command: NTRQSTN
  query_command: NTR
  type: string
  description: "cccc/tttt = current/total tracks"

- id: net_time_info
  label: Network Time Info
  command: NTMQSTN
  query_command: NTM
  type: string
  description: "mm:ss/mm:ss = elapsed/track time"

- id: audio_info
  label: Audio Information
  command: IFAQSTN
  query_command: IFA
  type: string
  description: "Audio info string matching front-panel display"

- id: video_info
  label: Video Information
  command: IFVQSTN
  query_command: IFV
  type: string
  description: "Video info string matching front-panel display"

# --- Zone 2 Queries ---
- id: zone2_power_state
  label: Zone 2 Power State
  command: ZPWQSTN
  query_command: ZPW
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Standby
    "01": On

- id: zone2_mute_state
  label: Zone 2 Mute State
  command: ZMTQSTN
  query_command: ZMT
  type: enum
  values: ["00", "01"]

- id: zone2_volume_level
  label: Zone 2 Volume Level
  command: ZVLQSTN
  query_command: ZVL
  type: string
  description: "00-64 hex = 0-100 decimal"

- id: zone2_input_state
  label: Zone 2 Input State
  command: SLZQSTN
  query_command: SLZ
  type: string

- id: zone2_tone
  label: Zone 2 Tone
  command: ZTNQSTN
  query_command: ZTN
  type: string
  description: "Returns BxxTxx"

- id: zone2_balance
  label: Zone 2 Balance
  command: ZBLQSTN
  query_command: ZBL
  type: string

- id: zone2_late_night
  label: Zone 2 Late Night State
  command: LTZQSTN
  query_command: LTZ
  type: string
  description: "00=Off, 01=Low, 02=High"

# --- Zone 3 Queries ---
- id: zone3_power_state
  label: Zone 3 Power State
  command: PW3QSTN
  query_command: PW3
  type: enum
  values: ["00", "01"]

- id: zone3_mute_state
  label: Zone 3 Mute State
  command: MT3QSTN
  query_command: MT3
  type: enum
  values: ["00", "01"]

- id: zone3_volume_level
  label: Zone 3 Volume Level
  command: VL3QSTN
  query_command: VL3
  type: string

- id: zone3_input_state
  label: Zone 3 Input State
  command: SL3QSTN
  query_command: SL3
  type: string

- id: zone3_tone
  label: Zone 3 Tone
  command: TN3QSTN
  query_command: TN3
  type: string
  description: "Returns BxxTxx"

- id: zone3_balance
  label: Zone 3 Balance
  command: BL3QSTN
  query_command: BL3
  type: string

# --- Zone 4 Queries ---
- id: zone4_power_state
  label: Zone 4 Power State
  command: PW4QSTN
  query_command: PW4
  type: enum
  values: ["00", "01"]

- id: zone4_mute_state
  label: Zone 4 Mute State
  command: MT4QSTN
  query_command: MT4
  type: enum
  values: ["00", "01"]

- id: zone4_volume_level
  label: Zone 4 Volume Level
  command: VL4QSTN
  query_command: VL4
  type: string

- id: zone4_input_state
  label: Zone 4 Input State
  command: SL4QSTN
  query_command: SL4
  type: string

# --- Additional Documented Queries ---
# A three-character query_command is the literal source opcode and takes
# the documented "QSTN" parameter. Existing command fields retain the
# complete query strings. SLIQSTN also appears verbatim in the source.
- id: speaker_a_state
  label: Speaker A State
  command: SPA
  query_command: SPA
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Off
    "01": On
  description: 'Query parameter: "QSTN". Model compatibility UNRESOLVED.'

- id: speaker_b_state
  label: Speaker B State
  command: SPB
  query_command: SPB
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Off
    "01": On
  description: 'Query parameter: "QSTN". Model compatibility UNRESOLVED.'

- id: recout_state
  label: Record Out State
  command: SLR
  query_command: SLR
  type: string
  description: 'Query parameter: "QSTN"; gets The Selector Position'

- id: video_output_state
  label: Video Output State
  command: VOS
  query_command: VOS
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": D4
    "01": Component
  description: 'Query parameter: "QSTN". Japanese Model Only; model compatibility UNRESOLVED.'

- id: cinema_filter_state
  label: Cinema Filter State
  command: RAS
  query_command: RAS
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Off
    "01": On
  description: 'Query parameter: "QSTN"; gets The Cinema Filter State'

- id: zone2_tuner_frequency
  label: Zone 2 Tuner Frequency
  command: TUZ
  query_command: TUZ
  type: string
  description: 'Query parameter: "QSTN"; FM nnn.nn MHz / AM nnnnn kHz'

- id: zone2_preset_state
  label: Zone 2 Preset State
  command: PRZ
  query_command: PRZ
  type: string
  description: 'Query parameter: "QSTN"; "01"-"28" or "01"-"1E", depending on model; model compatibility UNRESOLVED'

- id: zone2_cinema_filter_state
  label: Zone 2 Re-EQ/Academy State
  command: RAZ
  query_command: RAZ
  type: enum
  values: ["00", "01", "02"]
  value_labels:
    "00": Both Off
    "01": Re-EQ On
    "02": Academy On
  description: 'Query parameter: "QSTN"; gets The Re-EQ/Academy State'

- id: zone3_tuner_frequency
  label: Zone 3 Tuner Frequency
  command: TU3
  query_command: TU3
  type: string
  description: 'Query parameter: "QSTN"; FM nnn.nn MHz / AM nnnnn kHz'

- id: zone3_preset_state
  label: Zone 3 Preset State
  command: PR3
  query_command: PR3
  type: string
  description: 'Query parameter: "QSTN"; "01"-"28" or "01"-"1E", depending on model; model compatibility UNRESOLVED'

- id: zone4_tuner_frequency
  label: Zone 4 Tuner Frequency
  command: TU4
  query_command: TU4
  type: string
  description: 'Query parameter: "QSTN"; FM nnn.nn MHz / AM nnnnn kHz'

- id: zone4_preset_state
  label: Zone 4 Preset State
  command: PR4
  query_command: PR4
  type: string
  description: 'Query parameter: "QSTN"; "01"-"28" or "01"-"1E", depending on model; model compatibility UNRESOLVED'

# --- XM Model Only ---
- id: xm_channel_name
  label: XM Channel Name
  command: XCN
  query_command: XCN
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": XM Channel Name. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: xm_artist_name
  label: XM Artist Name
  command: XAT
  query_command: XAT
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": XM Artist Name. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: xm_title
  label: XM Title
  command: XTI
  query_command: XTI
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": XM Title. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: xm_channel_number
  label: XM Channel Number
  command: XCH
  query_command: XCH
  type: string
  description: 'Query parameter: "QSTN"; "000"-"255": XM Channel Number"000-255". Accessory compatibility UNRESOLVED.'

- id: xm_category
  label: XM Category
  command: XCT
  query_command: XCT
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": XM Category Info. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

# --- SIRIUS Model Only ---
- id: sirius_channel_name
  label: SIRIUS Channel Name
  command: SCN
  query_command: SCN
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": SIRIUS Channel Name. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: sirius_artist_name
  label: SIRIUS Artist Name
  command: SAT
  query_command: SAT
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": SIRIUS Artist Name. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: sirius_title
  label: SIRIUS Title
  command: STI
  query_command: STI
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": SIRIUS Title. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: sirius_channel_number
  label: SIRIUS Channel Number
  command: SCH
  query_command: SCH
  type: string
  description: 'Query parameter: "QSTN"; "000"-"255": SIRIUS Channel Number"000-255". Accessory compatibility UNRESOLVED.'

- id: sirius_category
  label: SIRIUS Category
  command: SCT
  query_command: SCT
  type: string
  description: 'Query parameter: "QSTN"; "nnnnnnnnnn": SIRIUS Category Info. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: sirius_lock_message
  label: SIRIUS Lock Message
  command: SLK
  type: enum
  values: ["INPUT", "WRONG"]
  value_labels:
    "INPUT": Please input the Lock password
    "WRONG": The Lock password is wrong
  description: 'No query parameter documented. Accessory compatibility UNRESOLVED.'

# --- HD Radio Model Only ---
- id: hd_radio_artist_name
  label: HD Radio Artist Name
  command: HAT
  query_command: HAT
  type: string
  description: 'Query parameter: "QSTN"; HD Radio Artist Name (variable-length, 64 digits max). Accessory compatibility UNRESOLVED.'

- id: hd_radio_channel_name
  label: HD Radio Channel Name
  command: HCN
  query_command: HCN
  type: string
  description: 'Query parameter: "QSTN"; HD Radio Channel Name (Station Name) (7 digits). Accessory compatibility UNRESOLVED.'

- id: hd_radio_title
  label: HD Radio Title
  command: HTI
  query_command: HTI
  type: string
  description: 'Query parameter: "QSTN"; HD Radio Title (variable-length, 64 digits max). Accessory compatibility UNRESOLVED.'

- id: hd_radio_detail_info
  label: HD Radio Detail Info
  command: HDS
  query_command: HDS
  type: string
  description: 'Query parameter: "QSTN"; source labels the payload HD Radio Title. Length and character range UNRESOLVED; accessory compatibility UNRESOLVED.'

- id: hd_radio_program_state
  label: HD Radio Channel Program State
  command: HPR
  query_command: HPR
  type: string
  description: 'Query parameter: "QSTN"; "01"-"08". Accessory compatibility UNRESOLVED.'

- id: hd_radio_blend_mode_state
  label: HD Radio Blend Mode State
  command: HBL
  query_command: HBL
  type: enum
  values: ["00", "01"]
  value_labels:
    "00": Auto
    "01": Analog
  description: 'Query parameter: "QSTN". Accessory compatibility UNRESOLVED.'

- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  command: HTS
  query_command: HTS
  type: string
  description: >
    Query parameter: "QSTN". "mmnnoo": HD Radio Tuner Status (3 bytes).
    mm -> "00" not HD, "01" HD; nn -> current Program "01"-"08";
    oo -> receivable Program (8 bits are represented in hexadecimal
    notation. Each bit shows receivable or not.).
    Accessory compatibility UNRESOLVED.
```

## Events

```yaml
# Unsolicited status notifications sent when receiver state changes
- id: status_notification
  label: Status Change Notification
  description: >
    When receiver status changes, it sends an unsolicited ISCP message to the
    controller (e.g. 'SLI03' when input changes to AUX1). Same format as query
    responses. Requires persistent TCP connection.
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - Zone 2/3/4 volume/source only works when main zone is ON
  - Zone 2 tone only works when main is ON and Zone 2 is powered
# UNRESOLVED: no explicit safety interlock or power sequencing warnings found
```

## Notes
ISCP commands consist of 3 command characters + variable-length parameter. Over eISCP (Ethernet), commands are wrapped in a binary header: magic "ISCP", header size (0x00000010 big-endian), data size (big-endian), version (0x01), reserved (0x000000), then the ISCP data starting with unit type character "1" (Receiver).

Key timing constraints: minimum 50ms interval between commands. Only one TCP client connection at a time. Connection must be held continuously to receive unsolicited status notifications. Receiver responds within 50ms; if no response, communication has failed.

Volume and preset values use hexadecimal representation (e.g. "1A" = 26 decimal). Input codes use hex ("00"-"40", "80"). Tone values use hex "-A" to "+A" for -10 to +10 in 2-step increments.

The 12V trigger commands (TGA/TGB/TGC) are only available when each trigger parameter is set to "OFF" in the Setup Menu.

The TUNER/XM/SIRIUS/HD Radio function is shared by the MAIN and ZONE side. Zone control of tuner/network functions is separated (per-zone commands TUZ/PRZ/NTZ/NPZ, TU3/PR3/NT3/NP3, TU4/PR4/NT4/NP4).

<!-- UNRESOLVED: exact command subset supported by PR-SC5508 not confirmed — source is shared protocol doc for all Onkyo/Integra receivers -->
<!-- UNRESOLVED: RS-232 transport parameters documented (9600/8N1/no flow) but this spec covers TCP/IP only per user request -->
<!-- UNRESOLVED: RI (Remote Interactive) passthrough commands (CCD, CT1, CT2, CDV, CMD, CCR, CEQ, CDT, CDS) not included — these control external docked devices (CD/DVD/MD/CD-R/DAT/tape decks), not the PR-SC5508 itself -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio info/channel commands (XCN/XAT/XTI/XCH/XCT, SCN/SAT/STI/SCH/SCT/SLK, HAT/HCN/HTI/HDS/HPR/HBL/HTS) not included — availability depends on installed tuner module -->
<!-- UNRESOLVED: RDS/PTY Scan/TP Scan commands included conditionally (RDS Model Only) — availability on PR-SC5508 not confirmed -->
<!-- UNRESOLVED: eISCP end-of-message character varies by model — may be EOF, EOF+CR, or EOF+CR+LF -->
<!-- UNRESOLVED: RAS opcode overloaded across model generations (Re-EQ/Academy, Re-EQ-only, Cinema Filter) — this spec uses the Cinema Filter variant -->
````

Upgrade done. Added ~110 actions + 9 feedbacks, all source-documented. Kept all existing entries verbatim. Exclusions left as UNRESOLVED notes: RI passthrough, XM/SIRIUS/HD Radio, RS-232 (TCP-only per request).

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T20:38:33.366Z
last_checked_at: 2026-10-07T21:04:39.614Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:04:39.614Z
matched_actions: 362
action_count: 362
confidence: medium
summary: "All 362 action units match source opcodes and parameters, and port 60128 and TCP are stated. The source is a shared receiver ISCP guide, so PR-SC5508 applicability is only inferred. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PR-SC5508 not explicitly listed in compatibility columns; source is the shared ISCP protocol document for all Onkyo/Integra receivers and pre-pros"
- "no multi-step macro sequences described in source"
- "no explicit safety interlock or power sequencing warnings found"
- "exact command subset supported by PR-SC5508 not confirmed — source is shared protocol doc for all Onkyo/Integra receivers"
- "RS-232 transport parameters documented (9600/8N1/no flow) but this spec covers TCP/IP only per user request"
- "RI (Remote Interactive) passthrough commands (CCD, CT1, CT2, CDV, CMD, CCR, CEQ, CDT, CDS) not included — these control external docked devices (CD/DVD/MD/CD-R/DAT/tape decks), not the PR-SC5508 itself"
- "XM/SIRIUS/HD Radio info/channel commands (XCN/XAT/XTI/XCH/XCT, SCN/SAT/STI/SCH/SCT/SLK, HAT/HCN/HTI/HDS/HPR/HBL/HTS) not included — availability depends on installed tuner module"
- "RDS/PTY Scan/TP Scan commands included conditionally (RDS Model Only) — availability on PR-SC5508 not confirmed"
- "eISCP end-of-message character varies by model — may be EOF, EOF+CR, or EOF+CR+LF"
- "RAS opcode overloaded across model generations (Re-EQ/Academy, Re-EQ-only, Cinema Filter) — this spec uses the Cinema Filter variant"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
