---
spec_id: admin/denon-electronics-avr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon Electronics AVR Series Control Spec"
manufacturer: "Denon Electronics"
model_family: AVR-X1100W
aliases: []
compatible_with:
  manufacturers:
    - "Denon Electronics"
  models:
    - AVR-X1100W
    - AVR-X1100W/S700W
    - AVR-X2100W
    - AVR-X2100W/S900W
    - AVR-X3100W
    - AVR-X4100W
    - AVR-X5200W
    - AVR-X7200W
    - AVR-X7200A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T16:21:46.585Z
last_checked_at: 2026-05-14T18:17:15.435Z
generated_at: 2026-05-14T18:17:15.435Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.435Z
  matched_actions: 141
  action_count: 141
  confidence: high
  summary: "All 173 spec actions have literal matches in source; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Denon Electronics AVR Series Control Spec

## Summary
Denon AVR-X series network/RS-232 controlled AV receivers. Supports TCP (telnet port 23) and RS-232C serial control. Command set covers power, volume, input selection, surround modes, zone 2/3 control, tuner, network/USB playback, video settings, and system configuration. Protocol version 6 (FY14V06, Jun 30 2015).

<!-- UNRESOLVED: full surround mode parameter list is model-dependent; this spec lists common parameters only -->
<!-- UNRESOLVED: NS (network/USB/iPod/Bluetooth) on-screen display data format is complex binary; represented as opaque here -->

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
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # PW ON/STANDBY commands
- queryable    # ? parameter returns status for most commands
- routable     # SI selects input source
- levelable    # MV/CV volume, PS tone/bass/treble parameters
```

## Actions
```yaml
# Power
- id: pw_on
  label: Power On
  kind: action
  command: PWON
  description: "System power ON. Wait 1 second before next command."
  params: []

- id: pw_standby
  label: Power Standby
  kind: action
  command: PWSTANDBY
  description: "System power STANDBY"
  params: []

# Master Volume
- id: mv_up
  label: Master Volume Up
  kind: action
  command: MVUP
  params: []

- id: mv_down
  label: Master Volume Down
  kind: action
  command: MVDOWN
  params: []

- id: mv_set
  label: Master Volume Set
  kind: action
  command: MV**
  description: "Direct volume. 00=MIN(---), 80=0dB, 98=+18dB. 0.5dB steps use 3 chars (e.g. MV805=+0.5dB, MV795=-0.5dB)."
  params:
    - name: level
      type: string
      description: "Two-digit ASCII for whole dB, three-digit for 0.5dB steps (00-98)"

# Mute
- id: mu_on
  label: Mute On
  kind: action
  command: MUON
  params: []

- id: mu_off
  label: Mute Off
  kind: action
  command: MUOFF
  params: []

# Input Select
- id: si_select
  label: Select Input Source
  kind: action
  command: SI**
  description: "Select input source. Parameters: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP. Some sources model/region dependent."
  params:
    - name: source
      type: string
      description: "Input source name"

# Main Zone
- id: zm_on
  label: Main Zone On
  kind: action
  command: ZMON
  params: []

- id: zm_off
  label: Main Zone Off
  kind: action
  command: ZMOFF
  params: []

# Input Mode
- id: sd_set
  label: Set Input Mode
  kind: action
  command: SD**
  description: "Set input signal mode. Parameters: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO."
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"

# Digital Input Mode
- id: dc_set
  label: Set Digital Input Mode
  kind: action
  command: DC**
  description: "Parameters: AUTO, PCM, DTS"
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"

# Surround Mode
- id: ms_set
  label: Set Surround Mode
  kind: action
  command: MS**
  description: "Parameters include: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DOLBY SURROUND, DOLBY ATMOS, DTS SURROUND, DTS HD, DTS HD MSTR, MULTI CH IN, MCH STEREO, NEO:6, NEO:X C/M/G, AURO3D, AURO2DSURR, ROCK ARENA, JAZZ CLUB, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, QUICK1-QUICK5. Many parameters are model-dependent."
  params:
    - name: mode
      type: string
      description: "Surround mode name"

- id: ms_quick_memory
  label: Quick Select Memory
  kind: action
  command: MSQUICK* MEMORY
  description: "Save current settings to quick select 1-5. Parameters: QUICK1 MEMORY through QUICK5 MEMORY."
  params:
    - name: slot
      type: integer
      description: "Quick select slot 1-5"

# Sleep Timer
- id: slp_set
  label: Set Sleep Timer
  kind: action
  command: SLP**
  description: "OFF or 001-120 minutes (010=10min)"
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"

# Auto Standby
- id: stby_set
  label: Set Auto Standby
  kind: action
  command: STBY**
  description: "Parameters: 15M, 30M, 60M, OFF"
  params:
    - name: mode
      type: string
      description: "15M, 30M, 60M, OFF"

# ECO Mode
- id: eco_set
  label: Set ECO Mode
  kind: action
  command: ECO**
  description: "Parameters: ON, AUTO, OFF"
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"

# Video Select
- id: sv_set
  label: Video Select Source
  kind: action
  command: SV**
  description: "Parameters: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE (cancel), ON, OFF"
  params:
    - name: source
      type: string
      description: "Video source name, SOURCE, ON, or OFF"

# Video Settings (VS commands)
- id: vs_aspect
  label: Set Aspect Ratio
  kind: action
  command: VSASP**
  description: "Parameters: ASPNRM (4:3), ASPFUL (16:9)"
  params:
    - name: ratio
      type: string
      description: "ASPNRM or ASPFUL"

- id: vs_monitor
  label: Set HDMI Monitor
  kind: action
  command: VSMONI**
  description: "Parameters: MONIAUTO, MONI1, MONI2"
  params:
    - name: output
      type: string
      description: "MONIAUTO, MONI1, MONI2"

- id: vs_resolution
  label: Set Resolution
  kind: action
  command: VSSC**
  description: "Parameters: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO. SCH* variants for HDMI output."
  params:
    - name: resolution
      type: string
      description: "Resolution code"

- id: vs_hdmi_audio
  label: Set HDMI Audio Output
  kind: action
  command: VSAUDIO **
  description: "Parameters: AMP, TV"
  params:
    - name: output
      type: string
      description: "AMP or TV"

# Channel Volume
- id: cv_set
  label: Set Channel Volume
  kind: action
  command: CV** **
  description: "Set individual channel level. Channel prefix (FL/FR/C/SW/SW2/SL/SR/SBL/SBR/SB/FHL/FHR/FWL/FWR/TFL/TFR/TML/TMR/TRL/TRR/RHL/RHR/FDL/FDR/SDL/SDR/BDL/BDR/SHL/SHR/TS) followed by UP, DOWN, or direct value (38-62, 50=0dB). SW/SW2 also accept 00=OFF."
  params:
    - name: channel
      type: string
      description: "Channel code (FL, FR, C, SW, etc.)"
    - name: value
      type: string
      description: "UP, DOWN, or direct value 38-62 (50=0dB)"

- id: cv_reset
  label: Reset Channel Levels
  kind: action
  command: CVZRL
  description: "Reset all channel levels to factory defaults"
  params: []

# Parameter Settings (PS commands - tone/bass/treble)
- id: ps_tone_ctrl
  label: Set Tone Control
  kind: action
  command: PSTONE CTRL **
  description: "Parameters: ON, OFF"
  params:
    - name: state
      type: string
      description: "ON or OFF"

- id: ps_bass
  label: Set Bass Level
  kind: action
  command: PSBAS **
  description: "UP, DOWN, or direct (00-99, 50=0dB, operable -6 to +6 i.e. 44-56)"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or direct value"

- id: ps_treble
  label: Set Treble Level
  kind: action
  command: PSTRE **
  description: "UP, DOWN, or direct (00-99, 50=0dB, operable -6 to +6 i.e. 44-56)"
  params:
    - name: value
      type: string
      description: "UP, DOWN, or direct value"

- id: ps_multeq
  label: Set MultEQ Mode
  kind: action
  command: PSMULTEQ:**
  description: "Parameters: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"

- id: ps_dyn_eq
  label: Set Dynamic EQ
  kind: action
  command: PSDYNEQ **
  description: "Parameters: ON, OFF"
  params:
    - name: state
      type: string
      description: "ON or OFF"

- id: ps_reflev
  label: Set Reference Level Offset
  kind: action
  command: PSREFLEV **
  description: "Parameters: 0, 5, 10, 15 (dB)"
  params:
    - name: offset
      type: integer
      description: "Offset in dB (0, 5, 10, 15)"

- id: ps_dynvol
  label: Set Dynamic Volume
  kind: action
  command: PSDYNVOL **
  description: "Parameters: HEV, MED, LIT, OFF"
  params:
    - name: mode
      type: string
      description: "HEV, MED, LIT, OFF"

- id: ps_drc
  label: Set Dynamic Compression
  kind: action
  command: PSDRC **
  description: "Parameters: AUTO, LOW, MID, HI, OFF"
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"

- id: ps_cinema_eq
  label: Set Cinema EQ
  kind: action
  command: PSCINEMA EQ.**
  description: "Parameters: ON, OFF"
  params:
    - name: state
      type: string
      description: "ON or OFF"

- id: ps_delay
  label: Set Audio Delay
  kind: action
  command: PSDELAY***
  description: "000-999 by ASCII, 000=0ms, 300=300ms. 0-60ms: 3ms/step, over 60ms: 10ms/step."
  params:
    - name: delay_ms
      type: string
      description: "Three-digit ASCII (000-300)"

- id: ps_lfe
  label: Set LFE Level
  kind: action
  command: PSLFE **
  description: "UP, DOWN, or direct. 00=0dB, 10=-10dB. Operable 0 to -10."
  params:
    - name: value
      type: string
      description: "UP, DOWN, or direct value"

- id: ps_sw_level
  label: Set Subwoofer Level Adjust
  kind: action
  command: PSSWL **
  description: "ON, OFF, UP, DOWN, or direct (38-62, 50=0dB, SW also 00=OFF)"
  params:
    - name: value
      type: string
      description: "ON, OFF, UP, DOWN, or direct value"

- id: ps_restorer
  label: Set Audio Restorer
  kind: action
  command: PSRSTR **
  description: "Parameters: OFF, LOW, MED, HI"
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"

# Picture Mode (PV commands)
- id: pv_set
  label: Set Picture Mode
  kind: action
  command: PV**
  description: "Parameters: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"

- id: pv_contrast
  label: Set Contrast
  kind: action
  command: PVCN ***
  description: "000-100 by ASCII, 050=0. Operable -50 to +50."
  params:
    - name: value
      type: string
      description: "Three-digit ASCII (000-100)"

- id: pv_brightness
  label: Set Brightness
  kind: action
  command: PVBR ***
  description: "000-100 by ASCII, 050=0. Operable -50 to +50."
  params:
    - name: value
      type: string
      description: "Three-digit ASCII (000-100)"

- id: pv_saturation
  label: Set Saturation
  kind: action
  command: PVST ***
  description: "000-100 by ASCII, 050=0. Operable -50 to +50."
  params:
    - name: value
      type: string
      description: "Three-digit ASCII (000-100)"

# Zone 2
- id: z2_source
  label: Zone 2 Select Source
  kind: action
  command: Z2**
  description: "Parameters: SOURCE (cancel), PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, QUICK1-QUICK5"
  params:
    - name: source
      type: string
      description: "Source name"

- id: z2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: Z2UP
  params: []

- id: z2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: Z2DOWN
  params: []

- id: z2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: Z2**
  description: "Direct volume, same scale as MV (00=MIN, 80=0dB)"
  params:
    - name: level
      type: string
      description: "Two-digit ASCII volume level"

- id: z2_on
  label: Zone 2 On
  kind: action
  command: Z2ON
  params: []

- id: z2_off
  label: Zone 2 Off
  kind: action
  command: Z2OFF
  params: []

- id: z2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: Z2MUON
  params: []

- id: z2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: Z2MUOFF
  params: []

- id: z2_quick_memory
  label: Zone 2 Quick Select Memory
  kind: action
  command: Z2QUICK* MEMORY
  description: "Save Z2 settings to quick select 1-5"
  params:
    - name: slot
      type: integer
      description: "Quick select slot 1-5"

# Zone 3
- id: z3_source
  label: Zone 3 Select Source
  kind: action
  command: Z3**
  description: "Same source parameters as Z2 (model dependent, X7200W/X5200W/X4100W only)"
  params:
    - name: source
      type: string
      description: "Source name"

- id: z3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: Z3UP
  params: []

- id: z3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: Z3DOWN
  params: []

- id: z3_on
  label: Zone 3 On
  kind: action
  command: Z3ON
  params: []

- id: z3_off
  label: Zone 3 Off
  kind: action
  command: Z3OFF
  params: []

- id: z3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: Z3MUON
  params: []

- id: z3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: Z3MUOFF
  params: []

# Tuner Control
- id: tf_freq_up
  label: Tuner Frequency Up
  kind: action
  command: TFANUP
  params: []

- id: tf_freq_down
  label: Tuner Frequency Down
  kind: action
  command: TFANDOWN
  params: []

- id: tf_freq_set
  label: Tuner Set Frequency
  kind: action
  command: TFAN******
  description: "6-digit ASCII. <050000=FM (MHz), >050000=AM (kHz)"
  params:
    - name: frequency
      type: string
      description: "6-digit frequency code"

- id: tp_preset_up
  label: Tuner Preset Up
  kind: action
  command: TPANUP
  params: []

- id: tp_preset_down
  label: Tuner Preset Down
  kind: action
  command: TPANDOWN
  params: []

- id: tp_preset_set
  label: Tuner Set Preset
  kind: action
  command: TPAN**
  description: "01-56 (CH01-CH56)"
  params:
    - name: preset
      type: string
      description: "Two-digit preset number 01-56"

- id: tp_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: TPANMEM
  description: "Store current frequency to preset. Optionally specify preset number: TPANMEM**"
  params:
    - name: preset
      type: string
      description: "Optional two-digit preset number 01-56"

- id: tm_band
  label: Tuner Band Select
  kind: action
  command: TMAN**
  description: "Parameters: AM, FM"
  params:
    - name: band
      type: string
      description: "AM or FM"

- id: tm_tuning_mode
  label: Tuner Tuning Mode
  kind: action
  command: TMAN**
  description: "Parameters: AUTO, MANUAL"
  params:
    - name: mode
      type: string
      description: "AUTO or MANUAL"

# Network/USB/iPod/Bluetooth (NS commands)
- id: ns_cursor_up
  label: Network Cursor Up
  kind: action
  command: NS90
  params: []

- id: ns_cursor_down
  label: Network Cursor Down
  kind: action
  command: NS91
  params: []

- id: ns_cursor_left
  label: Network Cursor Left
  kind: action
  command: NS92
  params: []

- id: ns_cursor_right
  label: Network Cursor Right
  kind: action
  command: NS93
  params: []

- id: ns_enter
  label: Network Enter/Play/Pause
  kind: action
  command: NS94
  params: []

- id: ns_play
  label: Network Play
  kind: action
  command: NS9A
  params: []

- id: ns_pause
  label: Network Pause
  kind: action
  command: NS9B
  params: []

- id: ns_stop
  label: Network Stop
  kind: action
  command: NS9C
  params: []

- id: ns_skip_plus
  label: Network Skip Forward
  kind: action
  command: NS9D
  params: []

- id: ns_skip_minus
  label: Network Skip Back
  kind: action
  command: NS9E
  params: []

- id: ns_search_plus
  label: Network Search Forward
  kind: action
  command: NS9F
  params: []

- id: ns_search_minus
  label: Network Search Back
  kind: action
  command: NS9G
  params: []

- id: ns_repeat_one
  label: Network Repeat One
  kind: action
  command: NS9H
  params: []

- id: ns_repeat_all
  label: Network Repeat All
  kind: action
  command: NS9I
  params: []

- id: ns_repeat_off
  label: Network Repeat Off
  kind: action
  command: NS9J
  params: []

- id: ns_random_on
  label: Network Random On
  kind: action
  command: NS9K
  params: []

- id: ns_random_off
  label: Network Random Off
  kind: action
  command: NS9M
  params: []

- id: ns_repeat_toggle
  label: Network Repeat Toggle
  kind: action
  command: NSRPT
  params: []

- id: ns_random_toggle
  label: Network Random Toggle
  kind: action
  command: NSRND
  params: []

- id: ns_preset_call
  label: Network Preset Call
  kind: action
  command: NSB**
  description: "Preset number 00-55 (00-35 for 2014 AVR)"
  params:
    - name: preset
      type: string
      description: "Two-digit preset number"

- id: ns_preset_memory
  label: Network Preset Memory
  kind: action
  command: NSC**
  description: "Store to preset number 00-55 (00-35 for 2014 AVR)"
  params:
    - name: preset
      type: string
      description: "Two-digit preset number"

# System Menu (MN commands)
- id: mn_cursor_up
  label: Menu Cursor Up
  kind: action
  command: MNCUP
  params: []

- id: mn_cursor_down
  label: Menu Cursor Down
  kind: action
  command: MNCDN
  params: []

- id: mn_cursor_left
  label: Menu Cursor Left
  kind: action
  command: MNCLT
  params: []

- id: mn_cursor_right
  label: Menu Cursor Right
  kind: action
  command: MNCRT
  params: []

- id: mn_enter
  label: Menu Enter
  kind: action
  command: MNENT
  params: []

- id: mn_return
  label: Menu Return
  kind: action
  command: MNRTN
  params: []

- id: mn_option
  label: Menu Option
  kind: action
  command: MNOPT
  params: []

- id: mn_info
  label: Menu Info
  kind: action
  command: MNINF
  params: []

- id: mn_menu_on
  label: Setup Menu On
  kind: action
  command: MNMEN ON
  params: []

- id: mn_menu_off
  label: Setup Menu Off
  kind: action
  command: MNMEN OFF
  params: []

# Triggers
- id: tr1_on
  label: Trigger 1 On
  kind: action
  command: TR1 ON
  params: []

- id: tr1_off
  label: Trigger 1 Off
  kind: action
  command: TR1 OFF
  params: []

- id: tr2_on
  label: Trigger 2 On
  kind: action
  command: TR2 ON
  params: []

- id: tr2_off
  label: Trigger 2 Off
  kind: action
  command: TR2 OFF
  params: []

# System Lock
- id: sy_remote_lock_on
  label: Remote Lock On
  kind: action
  command: SYREMOTE LOCK ON
  params: []

- id: sy_remote_lock_off
  label: Remote Lock Off
  kind: action
  command: SYREMOTE LOCK OFF
  params: []

- id: sy_panel_lock_on
  label: Panel Lock On
  kind: action
  command: SYPANEL LOCK ON
  description: "Lock panel buttons except master volume"
  params: []

- id: sy_panel_vol_lock_on
  label: Panel + Volume Lock On
  kind: action
  command: SYPANEL+V LOCK ON
  description: "Lock panel buttons and master volume"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: SYPANEL LOCK OFF
  params: []

# All Zone Stereo
- id: mn_zst_on
  label: All Zone Stereo On
  kind: action
  command: MNZST ON
  params: []

- id: mn_zst_off
  label: All Zone Stereo Off
  kind: action
  command: MNZST OFF
  params: []

# Dimmer
- id: dim_set
  label: Set Dimmer
  kind: action
  command: DIM **
  description: "Parameters: BRI, DIM, DAR, OFF, SEL (toggle)"
  params:
    - name: level
      type: string
      description: "BRI, DIM, DAR, OFF, SEL"

# Remote Maintenance
- id: rm_start
  label: Remote Maintenance Start
  kind: action
  command: RM STA
  params: []

- id: rm_end
  label: Remote Maintenance End
  kind: action
  command: RM END
  params: []

# Upgrade ID
- id: ug_idn
  label: Get Upgrade ID
  kind: action
  command: UGIDN
  description: "Display 12-digit upgrade ID number on FL display"
  params: []
```

## Feedbacks
```yaml
# Power state
- id: power_state
  type: enum
  values: [ON, STANDBY]
  query_command: PW?
  response_prefix: PW

# Master volume level
- id: master_volume
  type: string
  query_command: MV?
  response_prefix: MV
  description: "Two-digit (whole dB) or three-digit (0.5dB step). 00=MIN, 80=0dB"

# Mute state
- id: mute_state
  type: enum
  values: [ON, OFF]
  query_command: MU?
  response_prefix: MU

# Input source
- id: input_source
  type: string
  query_command: SI?
  response_prefix: SI
  description: "Current input source name"

# Main zone state
- id: main_zone_state
  type: enum
  values: [ON, OFF]
  query_command: ZM?
  response_prefix: ZM

# Input signal mode
- id: input_mode
  type: string
  query_command: SD?
  response_prefix: SD
  description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"

# Digital input mode
- id: digital_mode
  type: string
  query_command: DC?
  response_prefix: DC
  description: "AUTO, PCM, DTS"

# Surround mode
- id: surround_mode
  type: string
  query_command: MS?
  response_prefix: MS

# Video select state
- id: video_select
  type: string
  query_command: SV?
  response_prefix: SV

# Sleep timer
- id: sleep_timer
  type: string
  query_command: SLP?
  response_prefix: SLP
  description: "OFF or 001-120 minutes"

# Auto standby
- id: auto_standby
  type: string
  query_command: STBY?
  response_prefix: STBY
  description: "15M, 30M, 60M, OFF"

# ECO mode
- id: eco_mode
  type: string
  query_command: ECO?
  response_prefix: ECO
  description: "ON, AUTO, OFF"

# Channel volume
- id: channel_volume
  type: string
  query_command: CV?
  response_prefix: CV
  description: "Returns all configured speaker channel levels ending with CVEND"

# Tuner frequency
- id: tuner_frequency
  type: string
  query_command: TFAN?
  response_prefix: TFAN
  description: "6-digit frequency (<050000=FM MHz, >050000=AM kHz)"

# Tuner preset
- id: tuner_preset
  type: string
  query_command: TPAN?
  response_prefix: TPAN
  description: "Two-digit preset number or OFF"

# RDS station name
- id: rds_station_name
  type: string
  query_command: TFANNAME?
  response_prefix: TFANNAME
  description: "RDS station name (EU/AP only)"

# Tuner band/mode
- id: tuner_band_mode
  type: string
  query_command: TMAN?
  response_prefix: TMAN

# Menu state
- id: menu_state
  type: enum
  values: [ON, OFF]
  query_command: MNMEN?
  response_prefix: MNMEN

# Trigger state
- id: trigger_state
  type: string
  query_command: TR?
  response_prefix: TR
  description: "Returns TR1 and TR2 status (ON/OFF)"

# Remote maintenance state
- id: rm_state
  type: enum
  values: [ON, OFF]
  query_command: RM ?
  response_prefix: RM

# Dimmer state
- id: dimmer_state
  type: string
  query_command: DIM ?
  response_prefix: DIM
  description: "BRI, DIM, DAR, OFF"

# Upgrade ID
- id: upgrade_id
  type: string
  query_command: UGIDN
  response_prefix: UGIDN
  description: "12-digit ID number or NG"

# All zone stereo state
- id: all_zone_stereo
  type: enum
  values: [ON, OFF]
  query_command: MNZST?
  response_prefix: MNZST

# Zone 2 state
- id: z2_state
  type: string
  query_command: Z2?
  response_prefix: Z2

# Zone 2 mute
- id: z2_mute_state
  type: enum
  values: [ON, OFF]
  query_command: Z2MU?
  response_prefix: Z2MU

# Zone 3 state
- id: z3_state
  type: string
  query_command: Z3?
  response_prefix: Z3

# Zone 3 mute
- id: z3_mute_state
  type: enum
  values: [ON, OFF]
  query_command: Z3MU?
  response_prefix: Z3MU

# On-screen display (ASCII)
- id: net_display_ascii
  type: string
  query_command: NSA
  response_prefix: NSA
  description: "Returns NSA0-NSA8 lines, up to 96 bytes each"

# On-screen display (UTF-8)
- id: net_display_utf8
  type: string
  query_command: NSE
  response_prefix: NSE
  description: "Returns NSE0-NSE8 lines, up to 96 bytes each (UTF-8)"
```

## Variables
```yaml
# UNRESOLVED: many PS parameters are settable variables but are already represented as actions above
```

## Events
```yaml
- id: state_change_event
  description: "Unsolicited EVENT sent within 5 seconds when system state changes (e.g. front panel operation). Same format as COMMAND."

- id: channel_volume_event
  description: "Channel volume EVENTs sent when input source changes and channel volume changes as a result."

- id: surround_mode_event
  description: "Surround mode EVENT sent when mode changes due to input source change or direct operation."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after PWON before sending next command"
    reference: "Source note J"
  - description: "Send commands at 50ms or greater intervals"
    reference: "Source protocol specification"
# UNRESOLVED: no explicit safety interlock procedures stated in source beyond timing constraints
```

## Notes
- Command structure: 2-character ASCII COMMAND + PARAMETER (up to 25 chars) + CR (0x0D)
- ASCII range 0x20-0x7F plus CR (0x0D) as terminator
- Max communication data length: 135 bytes
- Volume encoding: 00=MIN(---), 80=0dB, 98=+18dB. Half-dB steps use 3-char params (e.g. 805=+0.5dB, 795=-0.5dB)
- Channel volume: 38-62 range, 50=0dB. SW also accepts 00=OFF
- Half-duplex communication on both serial and TCP
- TCP: 10BASE-T/100BASE-TX, RJ-45 connector
- RS-232C: DB-9 female (DCE), pins: 1=GND, 2=TxD, 3=RxD, 5=Common(GND), 4/6/7/8/9=NC
- RESPONSE should be sent within 200ms of receiving request command
- Many commands are model-dependent (see source compatibility columns)
- Network Standby must be set to "Always On" for IP control during standby

<!-- UNRESOLVED: full model-by-model command compatibility not represented; source has per-model checkmark columns -->
<!-- UNRESOLVED: HD Radio commands are North America model only, not fully enumerated here -->
<!-- UNRESOLVED: Zone 2 bass/treble (Z2PS), channel setting (Z2CS), HPF (Z2HPF), HDMI audio (Z2HDA), sleep (Z2SLP), auto standby (Z2STBY) not enumerated as separate actions -->
<!-- UNRESOLVED: Zone 3 equivalents of Zone 2 sub-commands not enumerated -->
<!-- UNRESOLVED: PS commands for Audyssey DSX, Stage Width/Height, Graphic EQ, Room Size, Auro-3D preset/strength not enumerated -->
<!-- UNRESOLVED: PV Hue, DNR, Enhancer sub-commands not enumerated -->
<!-- UNRESOLVED: NS on-screen display binary flag format not fully decoded -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T16:21:46.585Z
last_checked_at: 2026-05-14T18:17:15.435Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.435Z
matched_actions: 141
action_count: 141
confidence: high
summary: "All 173 spec actions have literal matches in source; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
