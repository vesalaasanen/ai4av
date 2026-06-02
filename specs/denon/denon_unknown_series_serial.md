---
spec_id: admin/denon-avr-s700-s900-x1100-x2100-x3100-x4100-x5200-x7200
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR-S700/S900/X1100W/X2100W/X3100W/X4100W/X5200W/X7200W Control Spec"
manufacturer: Denon
model_family: AVR-S700W
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVR-S700W
    - AVR-S900W
    - AVR-X1100W
    - AVR-X2100W
    - AVR-X3100W
    - AVR-X4100W
    - AVR-X5200W
    - AVR-X7200W
    - AVR-X7200A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-05-20T11:38:42.349Z
last_checked_at: 2026-05-20T11:38:42.349Z
generated_at: 2026-05-20T11:38:42.349Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Not all models support all commands — model-specific availability is noted in the command tables but not fully captured in this spec. RS-232C is only available on X2100W (NA only), X3100W, X4100W, X5200W, X7200W/A; the S700W and X1100W use Ethernet only."
  - "No discrete settable-parameter section beyond actions; all adjustable parameters"
  - "populate from source, or remove section if not applicable"
  - "Complete list of surround mode EVENT-only responses not fully captured; source contains extensive surround mode response tables. Binary command encoding not applicable (ASCII protocol). Authentication not applicable. Firmware compatibility range not stated in source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-05-20T11:38:42.349Z
  matched_actions: 182
  action_count: 182
  confidence: medium
  summary: "All 182 actions matched; transport verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Denon AVR-S700/S900/X1100W/X2100W/X3100W/X4100W/X5200W/X7200W Control Spec

## Summary

This spec covers the Denon AVR control protocol (Ver.06, last updated Jun 30, 2015) for the AVR-S700W, S900W, X1100W, X2100W, X3100W, X4100W, X5200W, X7200W, and X7200A AV receivers. Control is available via RS-232C serial (subset of models) and Ethernet TCP/IP (all models). Commands follow an ASCII-based structure: COMMAND (2 chars) + PARAMETER (up to 25 chars) + CR (0x0D). The protocol supports power, volume, input selection, surround mode, zone control (Zone 2, Zone 3), tuner, and various DSP/parameter settings.

<!-- UNRESOLVED: Not all models support all commands — model-specific availability is noted in the command tables but not fully captured in this spec. RS-232C is only available on X2100W (NA only), X3100W, X4100W, X5200W, X7200W/A; the S700W and X1100W use Ethernet only. -->

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
  flow_control: none  # source states "Non procedural"
addressing:
  port: 23  # stated in source: "TCP port 23 (telnet)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable    # inferred from power command examples (PWON, PWSTANDBY)
- queryable    # inferred from query command examples (PW?, MV?, SI?, etc.)
- routable     # inferred from input selection and zone routing commands
- levelable    # inferred from master volume, channel volume, tone control commands
```

## Actions

```yaml
# --- POWER ---
- id: power_on
  label: Power On
  kind: action
  params: []
  command: "PWON\r"

- id: power_standby
  label: Power Standby
  kind: action
  params: []
  command: "PWSTANDBY\r"

# --- MASTER VOLUME ---
- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
  command: "MVUP\r"

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
  command: "MVDOWN\r"

- id: master_volume_set
  label: Master Volume Set (direct)
  kind: action
  params:
    - name: level
      type: string
      description: "ASCII 00-98; 80=0dB, 00=min. Use 3 chars for 0.5dB steps (e.g. MV795 = -0.5dB)"
  command: "MV{level}\r"

- id: master_volume_query
  label: Query Master Volume
  kind: action
  params: []
  command: "MV?\r"

# --- MUTE ---
- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: "MUON\r"

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: "MUOFF\r"

- id: mute_query
  label: Query Mute
  kind: action
  params: []
  command: "MU?\r"

# --- INPUT SELECTION (Main Zone) ---
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: input
      type: enum
      values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
      description: "Input source name. Model availability varies."
  command: "SI{input}\r"

- id: select_input_query
  label: Query Current Input
  kind: action
  params: []
  command: "SI?\r"

# --- MAIN ZONE ON/OFF ---
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
  command: "ZMON\r"

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
  command: "ZMOFF\r"

- id: main_zone_query
  label: Query Main Zone Status
  kind: action
  params: []
  command: "ZM?\r"

# --- SURROUND MODE ---
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, MCH STEREO, ROCK ARENA, JAZZ CLUB, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, AURO3D, AURO2DSURR, WIDE SCREEN, SUPER STADIUM, CLASSIC CONCERT, LEFT, RIGHT]
      description: "Surround mode name. Model availability varies."
  command: "MS{mode}\r"

- id: surround_mode_query
  label: Query Surround Mode
  kind: action
  params: []
  command: "MS?\r"

- id: quick_select
  label: Quick Select (1-5)
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select preset number 1-5"
  command: "MSQUICK{number}\r"

- id: quick_select_memory
  label: Quick Select Memory (1-5)
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select preset number 1-5"
  command: "MSQUICK{number} MEMORY\r"

# --- CHANNEL VOLUME ---
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      description: "Channel code"
  command: "CV{channel} UP\r"

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      description: "Channel code"
  command: "CV{channel} DOWN\r"

- id: channel_volume_reset
  label: Reset All Channel Levels to Defaults
  kind: action
  params: []
  command: "CVZRL\r"

- id: channel_volume_query
  label: Query Channel Volume Status
  kind: action
  params: []
  command: "CV?\r"

# --- INPUT MODE ---
- id: input_mode_set
  label: Set Input Mode (SD)
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, 7.1IN, NO]
      description: "Input mode"
  command: "SD{mode}\r"

- id: input_mode_query
  label: Query Input Mode
  kind: action
  params: []
  command: "SD?\r"

# --- DIGITAL INPUT MODE ---
- id: digital_input_mode_set
  label: Set Digital Input Mode (DC)
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]
  command: "DC{mode}\r"

# --- VIDEO SELECT ---
- id: video_select_set
  label: Set Video Select Mode
  kind: action
  params:
    - name: source
      type: enum
      values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, CD, SOURCE, ON, OFF]
  command: "SV{source}\r"

- id: video_select_query
  label: Query Video Select
  kind: action
  params: []
  command: "SV?\r"

# --- SLEEP TIMER ---
- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF, or 001-120 (ASCII 3 digits, e.g. 010=10min)"
  command: "SLP{minutes}\r"

- id: sleep_timer_query
  label: Query Sleep Timer
  kind: action
  params: []
  command: "SLP?\r"

# --- AUTO STANDBY ---
- id: auto_standby_set
  label: Set Auto Standby
  kind: action
  params:
    - name: setting
      type: enum
      values: [15M, 30M, 60M, OFF]
  command: "STBY{setting}\r"

- id: auto_standby_query
  label: Query Auto Standby
  kind: action
  params: []
  command: "STBY?\r"

# --- ECO MODE ---
- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]
  command: "ECO{mode}\r"

- id: eco_mode_query
  label: Query ECO Mode
  kind: action
  params: []
  command: "ECO?\r"

# --- VIDEO SETTINGS (VS) ---
- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [ASPNRM, ASPFUL]
      description: "ASPNRM=4:3, ASPFUL=16:9"
  command: "VS{ratio}\r"

- id: hdmi_monitor_set
  label: Set HDMI Monitor Output
  kind: action
  params:
    - name: setting
      type: enum
      values: [MONIAUTO, MONI1, MONI2]
  command: "VS{setting}\r"

- id: resolution_set
  label: Set Video Resolution
  kind: action
  params:
    - name: resolution
      type: enum
      values: [SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO]
  command: "VS{resolution}\r"

- id: hdmi_audio_output_set
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: output
      type: enum
      values: ["AUDIO AMP", "AUDIO TV"]
  command: "VS{output}\r"

- id: video_processing_mode_set
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [VPMAUTO, VPMGAME, VPMMOVI]
  command: "VS{mode}\r"

# --- PARAMETER SETTINGS (PS) ---
- id: tone_control_set
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: ["TONE CTRL ON", "TONE CTRL OFF"]
  command: "PS{state}\r"

- id: bass_set
  label: Set Bass Level
  kind: action
  params:
    - name: level
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB, range 44-56 operative)"
  command: "PSBAS {level}\r"

- id: treble_set
  label: Set Treble Level
  kind: action
  params:
    - name: level
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB, range 44-56 operative)"
  command: "PSTRE {level}\r"

- id: subwoofer_level_set
  label: Set Subwoofer Level
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF, UP, DOWN]
  command: "PSSWL {state}\r"

- id: cinema_eq_set
  label: Set Cinema EQ
  kind: action
  params:
    - name: state
      type: enum
      values: ["CINEMA EQ.ON", "CINEMA EQ.OFF"]
  command: "PS{state}\r"

- id: multeq_set
  label: Set MultEQ Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: ["MULTEQ:AUDYSSEY", "MULTEQ:BYP.LR", "MULTEQ:FLAT", "MULTEQ:MANUAL", "MULTEQ:OFF"]
  command: "PS{mode}\r"

- id: dynamic_eq_set
  label: Set Dynamic EQ
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
  command: "PSDYNEQ {state}\r"

- id: reference_level_set
  label: Set Reference Level Offset
  kind: action
  params:
    - name: offset
      type: enum
      values: ["REFLEV 0", "REFLEV 5", "REFLEV 10", "REFLEV 15"]
  command: "PS{offset}\r"

- id: dynamic_volume_set
  label: Set Dynamic Volume
  kind: action
  params:
    - name: setting
      type: enum
      values: ["DYNVOL HEV", "DYNVOL MED", "DYNVOL LIT", "DYNVOL OFF"]
  command: "PS{setting}\r"

- id: audyssey_lfc_set
  label: Set Audyssey LFC
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
  command: "PSLFC {state}\r"

- id: graphic_eq_set
  label: Set Graphic EQ
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
  command: "PSGEQ {state}\r"

- id: drc_set
  label: Set Dynamic Range Compression
  kind: action
  params:
    - name: setting
      type: enum
      values: [AUTO, LOW, MID, HI, OFF]
  command: "PSDRC {setting}\r"

- id: delay_set
  label: Set Audio Delay
  kind: action
  params:
    - name: ms
      type: string
      description: "000-300 (3-char ASCII, 0-300ms range)"
  command: "PSDEL {ms}\r"

- id: audio_restorer_set
  label: Set Audio Restorer
  kind: action
  params:
    - name: setting
      type: enum
      values: [OFF, LOW, MED, HI]
  command: "PSRSTR {setting}\r"

- id: front_speaker_set
  label: Set Front Speaker Output
  kind: action
  params:
    - name: setting
      type: enum
      values: [SPA, SPB, "A+B"]
  command: "PSFRONT {setting}\r"

- id: room_size_set
  label: Set Room Size
  kind: action
  params:
    - name: size
      type: enum
      values: [S, MS, M, ML, L]
  command: "PSRSZ {size}\r"

- id: speaker_config_set
  label: Set Speaker Output Config (PSS)
  kind: action
  params:
    - name: config
      type: enum
      values: ["SP:FW", "SP:FH", "SP:SB", "SP:HW", "SP:BH", "SP:BW", "SP:FL", "SP:HF", "SP:FR"]
  command: "PS{config}\r"

# --- PICTURE SETTINGS (PV) ---
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]
  command: "PV{mode}\r"

- id: picture_mode_query
  label: Query Picture Mode
  kind: action
  params: []
  command: "PV?\r"

# --- ZONE 2 ---
- id: zone2_power_on
  label: Zone 2 On
  kind: action
  params: []
  command: "Z2ON\r"

- id: zone2_power_off
  label: Zone 2 Off
  kind: action
  params: []
  command: "Z2OFF\r"

- id: zone2_power_query
  label: Query Zone 2 Status
  kind: action
  params: []
  command: "Z2?\r"

- id: zone2_input_set
  label: Set Zone 2 Input Source
  kind: action
  params:
    - name: input
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, BT, USB/IPOD, USB, IPD, IRP, FVP]
      description: "Input source. MODEL availability varies."
  command: "Z2{input}\r"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  command: "Z2UP\r"

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  command: "Z2DOWN\r"

- id: zone2_volume_set
  label: Zone 2 Volume Set (direct)
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII; 80=0dB, 00=min"
  command: "Z2{level}\r"

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
  command: "Z2MUON\r"

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
  command: "Z2MUOFF\r"

- id: zone2_sleep_set
  label: Set Zone 2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"
  command: "Z2SLP{minutes}\r"

- id: zone2_channel_set
  label: Set Zone 2 Channel Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ST, MONO]
  command: "Z2CS{mode}\r"

- id: zone2_bass_set
  label: Set Zone 2 Bass
  kind: action
  params:
    - name: level
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB)"
  command: "Z2PSBAS {level}\r"

- id: zone2_treble_set
  label: Set Zone 2 Treble
  kind: action
  params:
    - name: level
      type: string
      description: "UP, DOWN, or 00-99 (50=0dB)"
  command: "Z2PSTRE {level}\r"

- id: zone2_auto_standby_set
  label: Set Zone 2 Auto Standby
  kind: action
  params:
    - name: setting
      type: enum
      values: [2H, 4H, 8H, OFF]
  command: "Z2STBY{setting}\r"

- id: zone2_quick_select
  label: Zone 2 Quick Select (1-5)
  kind: action
  params:
    - name: number
      type: integer
      description: "1-5"
  command: "Z2QUICK{number}\r"

# --- ZONE 3 ---
- id: zone3_power_on
  label: Zone 3 On
  kind: action
  params: []
  command: "Z3ON\r"

- id: zone3_power_off
  label: Zone 3 Off
  kind: action
  params: []
  command: "Z3OFF\r"

- id: zone3_power_query
  label: Query Zone 3 Status
  kind: action
  params: []
  command: "Z3?\r"

- id: zone3_input_set
  label: Set Zone 3 Input Source
  kind: action
  params:
    - name: input
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, BT, USB/IPOD, USB]
      description: "Zone 3 available on X4100W, X5200W, X7200W only"
  command: "Z3{input}\r"

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
  command: "Z3UP\r"

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
  command: "Z3DOWN\r"

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []
  command: "Z3MUON\r"

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []
  command: "Z3MUOFF\r"

- id: zone3_channel_set
  label: Set Zone 3 Channel Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ST, MONO]
  command: "Z3CS{mode}\r"

- id: zone3_auto_standby_set
  label: Set Zone 3 Auto Standby
  kind: action
  params:
    - name: setting
      type: enum
      values: [2H, 4H, 8H, OFF]
  command: "Z3STBY{setting}\r"

# --- TUNER ---
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
  command: "TFANUP\r"

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
  command: "TFANDOWN\r"

- id: tuner_frequency_set
  label: Tuner Frequency Set (direct)
  kind: action
  params:
    - name: frequency
      type: string
      description: "6-digit ASCII; e.g. 105000 = 1050.00kHz AM, FM <050000"
  command: "TFAN{frequency}\r"

- id: tuner_frequency_query
  label: Query Tuner Frequency
  kind: action
  params: []
  command: "TFAN?\r"

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
  command: "TPANUP\r"

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
  command: "TPANDOWN\r"

- id: tuner_preset_set
  label: Tuner Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56 (2-digit ASCII)"
  command: "TPAN{preset}\r"

- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  params:
    - name: band
      type: enum
      values: [ANAM, ANFM]
      description: "ANAM=AM, ANFM=FM"
  command: "TM{band}\r"

- id: tuner_mode_set
  label: Tuner Mode Set (Auto/Manual)
  kind: action
  params:
    - name: mode
      type: enum
      values: [ANAUTO, ANMANUAL]
  command: "TM{mode}\r"

- id: tuner_preset_memory
  label: Store Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "Optional 01-56; omit to use TPANMEM (sequential)"
  command: "TPANMEM{preset}\r"

# --- ONLINE MUSIC / USB / BLUETOOTH TRANSPORT ---
- id: ns_cursor_up
  label: NS Cursor Up
  kind: action
  params: []
  command: "NS90\r"

- id: ns_cursor_down
  label: NS Cursor Down
  kind: action
  params: []
  command: "NS91\r"

- id: ns_cursor_left
  label: NS Cursor Left
  kind: action
  params: []
  command: "NS92\r"

- id: ns_cursor_right
  label: NS Cursor Right
  kind: action
  params: []
  command: "NS93\r"

- id: ns_enter_play_pause
  label: NS Enter / Play / Pause
  kind: action
  params: []
  command: "NS94\r"

- id: ns_play
  label: NS Play
  kind: action
  params: []
  command: "NS9A\r"

- id: ns_pause
  label: NS Pause
  kind: action
  params: []
  command: "NS9B\r"

- id: ns_stop
  label: NS Stop
  kind: action
  params: []
  command: "NS9C\r"

- id: ns_skip_plus
  label: NS Skip Plus
  kind: action
  params: []
  command: "NS9D\r"

- id: ns_skip_minus
  label: NS Skip Minus
  kind: action
  params: []
  command: "NS9E\r"

- id: ns_repeat_one
  label: NS Repeat One
  kind: action
  params: []
  command: "NS9H\r"

- id: ns_repeat_all
  label: NS Repeat All
  kind: action
  params: []
  command: "NS9I\r"

- id: ns_repeat_off
  label: NS Repeat Off
  kind: action
  params: []
  command: "NS9J\r"

- id: ns_random_on
  label: NS Random On
  kind: action
  params: []
  command: "NS9K\r"

- id: ns_random_off
  label: NS Random Off
  kind: action
  params: []
  command: "NS9M\r"

- id: ns_repeat_toggle
  label: NS Repeat Toggle
  kind: action
  params: []
  command: "NSRPT\r"

- id: ns_random_toggle
  label: NS Random Toggle
  kind: action
  params: []
  command: "NSRND\r"

- id: ns_page_next
  label: NS Page Next
  kind: action
  params: []
  command: "NS9X\r"

- id: ns_page_prev
  label: NS Page Previous
  kind: action
  params: []
  command: "NS9Y\r"

- id: ns_preset_call
  label: NS Preset Call
  kind: action
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"
  command: "NSB{preset}\r"

- id: ns_preset_memory
  label: NS Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"
  command: "NSC{preset}\r"

- id: ns_display_ascii_query
  label: Query Onscreen Display (ASCII)
  kind: action
  params: []
  command: "NSA\r"

- id: ns_display_utf8_query
  label: Query Onscreen Display (UTF-8)
  kind: action
  params: []
  command: "NSE\r"

# --- SYSTEM / MENU ---
- id: menu_cursor_up
  label: Menu Cursor Up
  kind: action
  params: []
  command: "MNCUP\r"

- id: menu_cursor_down
  label: Menu Cursor Down
  kind: action
  params: []
  command: "MNCDN\r"

- id: menu_cursor_left
  label: Menu Cursor Left
  kind: action
  params: []
  command: "MNCLT\r"

- id: menu_cursor_right
  label: Menu Cursor Right
  kind: action
  params: []
  command: "MNCRT\r"

- id: menu_enter
  label: Menu Enter
  kind: action
  params: []
  command: "MNENT\r"

- id: menu_return
  label: Menu Return
  kind: action
  params: []
  command: "MNRTN\r"

- id: menu_option
  label: Menu Option
  kind: action
  params: []
  command: "MNOPT\r"

- id: menu_info
  label: Menu Info
  kind: action
  params: []
  command: "MNINF\r"

- id: setup_menu_on
  label: Setup Menu On
  kind: action
  params: []
  command: "MNMEN ON\r"

- id: setup_menu_off
  label: Setup Menu Off
  kind: action
  params: []
  command: "MNMEN OFF\r"

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
  command: "MNZST ON\r"

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
  command: "MNZST OFF\r"

# --- SYSTEM LOCK ---
- id: remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
  command: "SYREMOTE LOCK ON\r"

- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
  command: "SYREMOTE LOCK OFF\r"

- id: panel_lock_on
  label: Panel Lock On (except Master Vol)
  kind: action
  params: []
  command: "SYPANEL LOCK ON\r"

- id: panel_vol_lock_on
  label: Panel + Volume Lock On
  kind: action
  params: []
  command: "SYPANEL+V LOCK ON\r"

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []
  command: "SYPANEL LOCK OFF\r"

# --- TRIGGER ---
- id: trigger1_on
  label: Trigger 1 On
  kind: action
  params: []
  command: "TR1 ON\r"

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  params: []
  command: "TR1 OFF\r"

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  params: []
  command: "TR2 ON\r"

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  params: []
  command: "TR2 OFF\r"

- id: trigger_query
  label: Query Trigger Status
  kind: action
  params: []
  command: "TR?\r"

# --- DIMMER ---
- id: dimmer_set
  label: Set Front Panel Dimmer
  kind: action
  params:
    - name: level
      type: enum
      values: [BRI, DIM, DAR, OFF, SEL]
      description: "BRI=Bright, DIM=Dim, DAR=Dark, OFF=Off, SEL=Toggle"
  command: "DIM {level}\r"

- id: dimmer_query
  label: Query Dimmer Status
  kind: action
  params: []
  command: "DIM ?\r"

# --- REMOTE MAINTENANCE ---
- id: remote_maintenance_start
  label: Remote Maintenance Mode Start
  kind: action
  params: []
  command: "RM STA\r"

- id: remote_maintenance_end
  label: Remote Maintenance Mode End
  kind: action
  params: []
  command: "RM END\r"

- id: remote_maintenance_query
  label: Query Remote Maintenance Status
  kind: action
  params: []
  command: "RM ?\r"

# --- UPGRADE ---
- id: upgrade_id_query
  label: Query Upgrade ID Number
  kind: action
  params: []
  command: "UGIDN\r"
- id: zone2_cv_fl_up
  label: Zone 2 Channel Volume FL Up
  kind: action
  params: []
  command: "Z2CVFL UP\r"

- id: zone2_cv_fl_down
  label: Zone 2 Channel Volume FL Down
  kind: action
  params: []
  command: "Z2CVFL DOWN\r"

- id: zone2_cv_fr_up
  label: Zone 2 Channel Volume FR Up
  kind: action
  params: []
  command: "Z2CVFR UP\r"

- id: zone2_cv_fr_down
  label: Zone 2 Channel Volume FR Down
  kind: action
  params: []
  command: "Z2CVFR DOWN\r"

- id: zone2_cv_query
  label: Query Zone 2 Channel Volume
  kind: action
  params: []
  command: "Z2CV?\r"

- id: zone2_hpf_on
  label: Zone 2 HPF On
  kind: action
  params: []
  command: "Z2HPFON\r"

- id: zone2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  params: []
  command: "Z2HPFOFF\r"

- id: zone2_hpf_query
  label: Query Zone 2 HPF Status
  kind: action
  params: []
  command: "Z2HPF?\r"

- id: zone2_hda_set
  label: Set Zone 2 HDMI Output
  kind: action
  params:
    - name: mode
      type: string
      description: "THR=Through, PCM=PCM"
  command: "Z2HDA {mode}\r"

- id: zone2_hda_query
  label: Query Zone 2 HDMI Output
  kind: action
  params: []
  command: "Z2HDA?\r"

- id: zone2_mute_query
  label: Query Zone 2 Mute
  kind: action
  params: []
  command: "Z2MU?\r"

- id: zone3_cv_fl_up
  label: Zone 3 Channel Volume FL Up
  kind: action
  params: []
  command: "Z3CVFL UP\r"

- id: zone3_cv_fl_down
  label: Zone 3 Channel Volume FL Down
  kind: action
  params: []
  command: "Z3CVFL DOWN\r"

- id: zone3_cv_fr_up
  label: Zone 3 Channel Volume FR Up
  kind: action
  params: []
  command: "Z3CVFR UP\r"

- id: zone3_cv_fr_down
  label: Zone 3 Channel Volume FR Down
  kind: action
  params: []
  command: "Z3CVFR DOWN\r"

- id: zone3_cv_query
  label: Query Zone 3 Channel Volume
  kind: action
  params: []
  command: "Z3CV?\r"

- id: zone3_hpf_on
  label: Zone 3 HPF On
  kind: action
  params: []
  command: "Z3HPFON\r"

- id: zone3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  params: []
  command: "Z3HPFOFF\r"

- id: zone3_hpf_query
  label: Query Zone 3 HPF Status
  kind: action
  params: []
  command: "Z3HPF?\r"

- id: zone3_bass_set
  label: Set Zone 3 Bass
  kind: action
  params:
    - name: level
      type: string
  command: "Z3PSBAS {level}\r"

- id: zone3_treble_set
  label: Set Zone 3 Treble
  kind: action
  params:
    - name: level
      type: string
  command: "Z3PSTRE {level}\r"

- id: zone3_sleep_set
  label: Set Zone 3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
  command: "Z3SLP{minutes}\r"

- id: zone3_mute_query
  label: Query Zone 3 Mute
  kind: action
  params: []
  command: "Z3MU?\r"

- id: menu_channel_level
  label: Menu Channel Level Adjust Toggle
  kind: action
  params: []
  command: "MNCHL\r"

- id: ns_manual_search_plus
  label: NS Manual Search Plus
  kind: action
  params: []
  command: "NS9F\r"

- id: ns_manual_search_minus
  label: NS Manual Search Minus
  kind: action
  params: []
  command: "NS9G\r"

- id: ns_ipod_onscreen_toggle
  label: NS iPod / On Screen Mode Toggle
  kind: action
  params: []
  command: "NS9W\r"

- id: ns_manual_search_stop
  label: NS Manual Search Stop
  kind: action
  params: []
  command: "NS9Z\r"

- id: dialog_level_set
  label: Set Dialog Level Adjust
  kind: action
  params:
    - name: state
      type: string
  command: "PSDIL {state}\r"

- id: loudness_management_set
  label: Set Loudness Management
  kind: action
  params:
    - name: state
      type: string
  command: "PSLOM {state}\r"

- id: ps_mode_set
  label: Set Cinema/Music/Game/PL Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"
  command: "PSMODE:{mode}\r"

- id: ps_mode_query
  label: Query PS Mode
  kind: action
  params: []
  command: "PSMODE: ?\r"

- id: containment_amount_set
  label: Set Containment Amount (LFC)
  kind: action
  params:
    - name: level
      type: string
  command: "PSCNTAMT {level}\r"

- id: audyssey_dsx_set
  label: Set Audyssey DSX
  kind: action
  params:
    - name: setting
      type: string
      description: "ONHW, ONH, ONW, OFF"
  command: "PSDSX {setting}\r"

- id: audyssey_dsx_query
  label: Query Audyssey DSX
  kind: action
  params: []
  command: "PSDSX ?\r"

- id: bass_sync_set
  label: Set Bass Sync
  kind: action
  params:
    - name: level
      type: string
  command: "PSBSC {level}\r"

- id: bass_sync_query
  label: Query Bass Sync
  kind: action
  params: []
  command: "PSBSC ?\r"

- id: dialogue_enhancer_set
  label: Set Dialogue Enhancer
  kind: action
  params:
    - name: setting
      type: string
      description: "OFF, LOW, MED, HIGH"
  command: "PSDEH {setting}\r"

- id: dialogue_enhancer_query
  label: Query Dialogue Enhancer
  kind: action
  params: []
  command: "PSDEH ?\r"
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]
  description: "Returned in response to PW? or when power state changes"

- id: master_volume_state
  type: string
  description: "MV** or MV*** (e.g. MV80=0dB, MV795=-0.5dB). Returned in response to MV? or on change."

- id: mute_state
  type: enum
  values: [MUON, MUOFF]
  description: "Returned in response to MU? or on mute state change"

- id: input_source_state
  type: string
  description: "SI{source} — e.g. SIDVD, SINET. Returned in response to SI? or on input change"

- id: main_zone_state
  type: enum
  values: [ZMON, ZMOFF]
  description: "Returned in response to ZM?"

- id: surround_mode_state
  type: string
  description: "MS{mode} — e.g. MSSTEREO, MSDOLBY DIGITAL. Returned in response to MS? or on mode change"

- id: channel_volume_state
  type: string
  description: "CV{channel} {value} per channel. Returned in response to CV? (all configured speakers) and on change"

- id: zone2_state
  type: string
  description: "Z2{source} or Z2{volume}. Returned in response to Z2?"

- id: zone2_mute_state
  type: enum
  values: [Z2MUON, Z2MUOFF]

- id: zone3_state
  type: string
  description: "Z3{source} or Z3{volume}. Returned in response to Z3?"

- id: tuner_frequency_state
  type: string
  description: "TFAN{frequency} — 6-digit frequency. Returned in response to TFAN?"

- id: tuner_preset_state
  type: string
  description: "TPAN{preset} — 2-digit preset number. Returned in response to TPAN?"

- id: sleep_timer_state
  type: string
  description: "SLP{value} — e.g. SLP120 or SLPOFF. Returned in response to SLP?"

- id: auto_standby_state
  type: enum
  values: [STBY15M, STBY30M, STBY60M, STBYOFF]

- id: eco_mode_state
  type: enum
  values: [ECOON, ECOAUTO, ECOOFF]

- id: input_mode_state
  type: string
  description: "SD{mode} response — can also return SDARC or SDNO as event"

- id: surround_quick_select_state
  type: string
  description: "MSQUICK{n} returned in response to MSQUICK?"

- id: onscreen_display_ascii
  type: string
  description: "NSA0-NSA8 lines (96-byte ASCII each) returned in response to NSA"

- id: onscreen_display_utf8
  type: string
  description: "NSE0-NSE8 lines (96-byte UTF-8 each) returned in response to NSE"

- id: setup_menu_state
  type: enum
  values: ["MNMEN ON", "MNMEN OFF"]

- id: all_zone_stereo_state
  type: enum
  values: ["MNZST ON", "MNZST OFF"]

- id: trigger_state
  type: string
  description: "TR1 ON/OFF and TR2 ON/OFF returned in response to TR?"

- id: dimmer_state
  type: enum
  values: ["DIM BRI", "DIM DIM", "DIM DAR", "DIM OFF"]

- id: tone_control_state
  type: enum
  values: ["PSTONE CTRL ON", "PSTONE CTRL OFF"]

- id: bass_state
  type: string
  description: "PSBAS {value} returned in response to PSBAS?"

- id: treble_state
  type: string
  description: "PSTRE {value} returned in response to PSTRE?"

- id: multeq_state
  type: string
  description: "PSMULTEQ:{mode} returned in response to PSMULTEQ:?"

- id: dynamic_eq_state
  type: enum
  values: ["PSDYNEQ ON", "PSDYNEQ OFF"]

- id: dynamic_volume_state
  type: enum
  values: ["PSDYNVOL HEV", "PSDYNVOL MED", "PSDYNVOL LIT", "PSDYNVOL OFF"]

- id: picture_mode_state
  type: enum
  values: [PVOFF, PVSTD, PVMOV, PVVVD, PVSTM, PVCTM, PVDAY, PVNGT]

- id: upgrade_id_state
  type: string
  description: "UGIDN{12-digit-id} or UGIDN NG"

- id: remote_maintenance_state
  type: enum
  values: ["RM ON", "RM OFF"]

- id: tuner_rds_name
  type: string
  description: "TFANNAME{8-char station name} — EU/AP models only, returned in response to TFANNAME?"
```

## Variables

```yaml
# UNRESOLVED: No discrete settable-parameter section beyond actions; all adjustable parameters
# are controlled via action commands above. Remove section if not applicable.
```

## Events

```yaml
- id: state_change_event
  description: "EVENT messages sent by AVR when its state changes (same format as COMMAND/RESPONSE). Examples: surround mode change triggers MS{mode} event; input change triggers CV channel events for all active channels. EVENT must be sent within 5 seconds of state change."
- id: channel_volume_event
  description: "CVFL/CVFR/etc. events sent automatically when input source changes (all active channel volumes returned). CVEND<CR> terminates the sequence."
```

## Macros

```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - description: "After sending PWON (power on command), wait at least 1 second before sending the next command. Source states: '1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON).'"
```

## Notes

**Command structure:** COMMAND (2 ASCII chars) + PARAMETER (up to 25 ASCII chars) + CR (0x0D). Total max data length 135 bytes. Only ASCII 0x20-0x7F plus CR (0x0D as delimiter) are used.

**Protocol modes:**
- COMMAND: controller to AVR
- EVENT: AVR to controller when state changes (same format as COMMAND, sent within 5s of change)
- RESPONSE: AVR reply to a request command (COMMAND + ? + CR); sent within 200ms of receiving request

**Request queries:** Append `?` to any command that supports it: e.g. `PW?<CR>`, `MV?<CR>`, `SI?<CR>`.

**Volume encoding:** Master volume 00-98 (ASCII). 80=0dB, 00=minimum (---dB). For 0.5dB steps, use 3-character parameter (e.g. MV795=-0.5dB, MV805=+0.5dB). At whole-dB steps, use 2-character parameter.

**Channel volume encoding:** 38-62 ASCII (50=0dB). Subwoofer also accepts 00=OFF.

**Ethernet / Network Standby:** Must set "Network > IP Control" to "Always On" to respond to commands during standby.

**RS-232C availability:** RS-232C connector is DB-9 female, DCE type (pins: 1=GND, 2=TxD, 3=RxD, 5=Common GND, 4/6/7/8/9=NC). Only available on AVR-X2100W (North America), X3100W, X4100W, X5200W, X7200W/A. AVR-S700W and X1100W are Ethernet-only.

**Timing:** Send COMMAND intervals of 50ms or more. Commands are receivable during EVENT transmission.

**Model-specific commands:** Many commands are model-specific (indicated by ○/-in the source tables). Notably: PHONO input on X3100W/X4100W/X5200W/X7200W only; Subwoofer 2 on X4100W/X5200W/X7200W only; Zone 3 on X4100W/X5200W/X7200W only; Auro-3D commands on X4100W/X5200W/X7200W only; Trigger 2 on X4100W/X5200W/X7200W only.

**Protocol version:** Ver.06, document ID AVR-S700_S900_X1100_X2100_X3100_X4100_X5200_X7200_PROTOCOL_V06, last updated Jun 30, 2015.

<!-- UNRESOLVED: Complete list of surround mode EVENT-only responses not fully captured; source contains extensive surround mode response tables. Binary command encoding not applicable (ASCII protocol). Authentication not applicable. Firmware compatibility range not stated in source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-05-20T11:38:42.349Z
last_checked_at: 2026-05-20T11:38:42.349Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T11:38:42.349Z
matched_actions: 182
action_count: 182
confidence: medium
summary: "All 182 actions matched; transport verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Not all models support all commands — model-specific availability is noted in the command tables but not fully captured in this spec. RS-232C is only available on X2100W (NA only), X3100W, X4100W, X5200W, X7200W/A; the S700W and X1100W use Ethernet only."
- "No discrete settable-parameter section beyond actions; all adjustable parameters"
- "populate from source, or remove section if not applicable"
- "Complete list of surround mode EVENT-only responses not fully captured; source contains extensive surround mode response tables. Binary command encoding not applicable (ASCII protocol). Authentication not applicable. Firmware compatibility range not stated in source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
