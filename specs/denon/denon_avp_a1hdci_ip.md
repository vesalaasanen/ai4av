---
spec_id: admin/denon-avp-a1hdci
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVP-A1HDCI Control Spec"
manufacturer: Denon
model_family: AVP-A1HDCI
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVP-A1HDCI
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:02:58.595Z
last_checked_at: 2026-06-09T10:33:59.313Z
generated_at: 2026-06-09T10:33:59.313Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MSQUICK ?"
  - "Z2QUICK ?"
  - "Z3QUICK ?"
  - "multi-zone event push behavior not documented."
  - "full event code set not enumerated in source."
  - "source lists discrete commands rather than settable variables."
  - "complete event code table not provided."
  - "no explicit multi-step macros documented."
  - "no safety warnings or interlock procedures in source."
  - "firmware compatibility, error codes, binary protocol extensions, port configuration method, DHCP/static IP setup, MAC address, reset procedures."
verification:
  verdict: verified
  checked_at: 2026-06-09T10:33:59.313Z
  matched_actions: 260
  action_count: 260
  confidence: medium
  summary: "All 260 spec actions verified against source; only 3 trivial QUICK-status query commands absent from spec (below 5-extra threshold); transport confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Denon AVP-A1HDCI Control Spec

## Summary
Denon AVP-A1HDCI is a flagship AV processor supporting multi-zone audio/video routing, surround sound modes, and comprehensive system control. Control via TCP/IP on port 23 (Telnet) or RS-232C at 9600 baud, 8N1. Protocol is ASCII-based, half-duplex, commands terminated with CR (0x0D). No authentication required.

<!-- UNRESOLVED: multi-zone event push behavior not documented. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: TCP port 23 (telnet)
serial:
  baud_rate: 9600  # stated: 9600bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # PWON, PWSTANDBY present
- routable       # SI (input select) present
- levelable      # MV (master volume), CV (channel volume) present
- queryable      # PW?, MV?, SI? etc. present
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Standby
  kind: action
  params: []
- id: power_query
  label: Query Power Status
  kind: action
  params: []

# Master Volume
- id: mv_up
  label: Master Volume Up
  kind: action
  params: []
- id: mv_down
  label: Master Volume Down
  kind: action
  params: []
- id: mv_set
  label: Set Master Volume (dB)
  kind: action
  params:
    - name: value
      type: string
      description: 00-98 (ASCII), 80=0dB, 00=--- (MIN). 0.5dB steps use 3 chars (e.g. MV805)
- id: mv_query
  label: Query Master Volume
  kind: action
  params: []

# Channel Volume - FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
- id: cv_set
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL/FR/C/SW/SW2/SL/SR/SBL/SBR/SB/FHL/FHR/FWL/FWR/TFL/TFR/TML/TMR/TRL/TRR/RHL/RHR/FDL/FDR/SDL/SDR/BDL/BDR/SHL/SHR/TS
    - name: value
      type: string
      description: ASCII 38-62 (or 00 for SW/SW2), 50=0dB. 0.5dB steps use 3 chars.
- id: cv_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
- id: cv_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
- id: cv_query
  label: Query Channel Volume Status
  kind: action
  params: []
- id: cv_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []

# Mute
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_query
  label: Query Mute Status
  kind: action
  params: []

# Input Select - SI
- id: si_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO/CD/TUNER/DVD/BD/TV/SAT/CBL/MPLAY/GAME/HDRADIO/NET/PANDORA/SIRIUSXM/SPOTIFY/LASTFM/FLICKR/IRADIO/SERVER/FAVORITES/AUX1/AUX2/AUX3/AUX4/AUX5/AUX6/AUX7/BT/USB-IPOD/USB/IPD/IRP/FVP
- id: si_query
  label: Query Input Source
  kind: action
  params: []

# Surround Mode - MS
- id: ms_select
  label: Select Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE/MUSIC/GAME/DIRECT/PURE DIRECT/STEREO/AUTO/DOLBY DIGITAL/DTS SURROUND/AURO3D/AURO2DSURR/MCH STEREO/WIDE SCREEN/SUPER STADIUM/ROCK ARENA/JAZZ CLUB/CLASSIC CONCERT/MONO MOVIE/MATRIX/VIDEO GAME/VIRTUAL/LEFT/RIGHT/QUICK1-5/etc.
- id: ms_query
  label: Query Surround Mode
  kind: action
  params: []

# Main Zone - ZM
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_query
  label: Query Main Zone Status
  kind: action
  params: []
- id: zm_quick_select
  label: Main Zone Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
- id: zm_quick_memory
  label: Main Zone Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"

# Sleep Timer - SLP
- id: slp_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, or 0 for off"
- id: slp_query
  label: Query Sleep Timer
  kind: action
  params: []

# Auto Standby - STBY
- id: stby_set
  label: Set Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "15M/30M/60M/OFF"
- id: stby_query
  label: Query Auto Standby
  kind: action
  params: []

# ECO Mode - ECO
- id: eco_set
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON/AUTO/OFF"
- id: eco_query
  label: Query ECO Mode
  kind: action
  params: []

# Video Aspect - VS
- id: vs_aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM/ASPFUL"
- id: vs_aspect_query
  label: Query Aspect Ratio
  kind: action
  params: []
- id: vs_MONI_set
  label: Set HDMI Monitor Out
  kind: action
  params:
    - name: monitor
      type: string
      description: "MONIAUTO/MONI1/MONI2"
- id: vs_MONI_query
  label: Query HDMI Monitor Out
  kind: action
  params: []
- id: vs_resolution_set
  label: Set Resolution (HDMI + Non-HDMI)
  kind: action
  params:
    - name: res
      type: string
      description: "SC48P/SC10I/SC72P/SC10P/SC10P24/SC4K/SC4KF/SCAUTO or SCH48P/SCH10I/SCH72P/SCH10P/SCH10P24/SCH4K/SCH4KF/SCHAUTO"
- id: vs_resolution_query
  label: Query Resolution
  kind: action
  params: []
- id: vs_audio_amp_set
  label: Set HDMI Audio Output to AMP
  kind: action
  params: []
- id: vs_audio_tv_set
  label: Set HDMI Audio Output to TV
  kind: action
  params: []
- id: vs_audio_query
  label: Query HDMI Audio Output
  kind: action
  params: []
- id: vs_vpm_set
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO/VPMGAME/VPMMOVI"
- id: vs_vpm_query
  label: Query Video Processing Mode
  kind: action
  params: []
- id: vs_vst_set
  label: Set Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: vs_vst_query
  label: Query Vertical Stretch
  kind: action
  params: []

# Picture Mode - PV
- id: pv_mode_set
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF/STD/MOV/VVD/STM/CTM/DAY/NGT"
- id: pv_mode_query
  label: Query Picture Mode
  kind: action
  params: []
- id: pv_contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0, range -50 to +50"
- id: pv_brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0, range -50 to +50"
- id: pv_saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0, range -50 to +50"
- id: pv_hue_set
  label: Set Hue
  kind: action
  params:
    - name: value
      type: string
      description: "44-56, 50=0, range -6 to +6"
- id: pv_dnr_set
  label: Set DNR
  kind: action
  params:
    - name: level
      type: string
      description: "OFF/LOW/MID/HI"
- id: pv_enhancer_set
  label: Set Enhancer
  kind: action
  params:
    - name: value
      type: string
      description: "00-12, 00=0"
- id: pv_query
  label: Query Picture Adjustments
  kind: action
  params: []

# Parameter / Sound - PS
- id: ps_tone_ctrl_set
  label: Set Tone Control
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_tone_query
  label: Query Tone Control
  kind: action
  params: []
- id: ps_bass_set
  label: Set Bass
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_treble_set
  label: Set Treble
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_bass_query
  label: Query Bass
  kind: action
  params: []
- id: ps_treble_query
  label: Query Treble
  kind: action
  params: []
- id: ps_dialog_level_set
  label: Set Dialog Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "ON/OFF/UP/DOWN/**"
- id: ps_sw_level_set
  label: Set Subwoofer Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "ON/OFF/UP/DOWN/**"
- id: ps_sw2_level_set
  label: Set Subwoofer 2 Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_cinema_eq_set
  label: Set Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_mode_set
  label: Set Cinema/Music/Game Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC/CINEMA/GAME/PRO LOGIC"
- id: ps_loudness_set
  label: Set Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_front_height_set
  label: Set Front Height Output
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_speaker_output_set
  label: Set Speaker Output Configuration
  kind: action
  params:
    - name: config
      type: string
      description: "FW/FH/SB/HW/BH/BW/FL/HF/HR"
- id: ps_multieq_set
  label: Set MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY/BYP.LR/FLAT/MANUAL/OFF"
- id: ps_dyneq_set
  label: Set Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_reflev_set
  label: Set Reference Level Offset
  kind: action
  params:
    - name: offset
      type: string
      description: "0/5/10/15"
- id: ps_dynvol_set
  label: Set Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "HEV/MED/LIT/OFF"
- id: ps_lfc_set
  label: Set Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_dsx_set
  label: Set Audyssey DSX
  kind: action
  params:
    - name: config
      type: string
      description: "ONHW/ONH/ONW/OFF"
- id: ps_geq_set
  label: Set Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_drc_set
  label: Set Dynamic Compression
  kind: action
  params:
    - name: level
      type: string
      description: "AUTO/LOW/MID/HI/OFF"
- id: ps_delay_set
  label: Set Audio Delay
  kind: action
  params:
    - name: value
      type: string
      description: "000-999 ms, 0-60ms step 3ms, over 60ms step 10ms"
- id: ps_restorer_set
  label: Set Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF/LOW/MID/HI"
- id: ps_front_speaker_set
  label: Set Front Speaker
  kind: action
  params:
    - name: speaker
      type: string
      description: "SPA/SPB/A+B"
- id: ps_auropr_set
  label: Set Auro-Matic 3D Preset (Auro-3D Upgrade)
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA/MED/LAR/SPE"
- id: ps_aurostrength_set
  label: Set Auro-Matic 3D Strength (Auro-3D Upgrade)
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"

# Zone2 Control
- id: z2_on
  label: Zone 2 On
  kind: action
  params: []
- id: z2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: z2_source_select
  label: Select Zone 2 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI
- id: z2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: z2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: z2_volume_set
  label: Set Zone 2 Volume
  kind: action
  params:
    - name: value
      type: string
      description: "00-98, 80=0dB"
- id: z2_mute_set
  label: Set Zone 2 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: z2_quick_select
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
- id: z2_quick_memory
  label: Zone 2 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
- id: z2_hpfilter_set
  label: Set Zone 2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: z2_bass_set
  label: Set Zone 2 Bass
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: z2_treble_set
  label: Set Zone 2 Treble
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: z2_hda_set
  label: Set Zone 2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: "THR/PCM"
- id: z2_sleep_set
  label: Set Zone 2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 or 0 for off"
- id: z2_stby_set
  label: Set Zone 2 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "2H/4H/8H/OFF"
- id: z2_query
  label: Query Zone 2 Status
  kind: action
  params: []

# Zone3 Control
- id: z3_on
  label: Zone 3 On
  kind: action
  params: []
- id: z3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: z3_source_select
  label: Select Zone 3 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI
- id: z3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
- id: z3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
- id: z3_volume_set
  label: Set Zone 3 Volume
  kind: action
  params:
    - name: value
      type: string
      description: "00-98, 80=0dB"
- id: z3_mute_set
  label: Set Zone 3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: z3_quick_select
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
- id: z3_quick_memory
  label: Zone 3 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
- id: z3_hpfilter_set
  label: Set Zone 3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: z3_bass_set
  label: Set Zone 3 Bass
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: z3_treble_set
  label: Set Zone 3 Treble
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: z3_sleep_set
  label: Set Zone 3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 or 0 for off"
- id: z3_stby_set
  label: Set Zone 3 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "2H/4H/8H/OFF"
- id: z3_query
  label: Query Zone 3 Status
  kind: action
  params: []

# Tuner Control
- id: tf_frequency_set
  label: Set Tuner Frequency
  kind: action
  params:
    - name: freq
      type: string
      description: "6 digits: ****.** kHz AM or ****.** MHz FM"
- id: tf_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tf_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tf_name_query
  label: Query RDS Station Name
  kind: action
  params: []
- id: tp_preset_set
  label: Set Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tp_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
- id: tp_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
- id: tp_preset_memory
  label: Memory Tuner Preset
  kind: action
  params: []
- id: tm_band_set
  label: Set Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: "AM/FM"
- id: tm_mode_set
  label: Set Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO/MANUAL"

# HD Radio
- id: tfhd_frequency_set
  label: Set HD Radio Frequency
  kind: action
  params:
    - name: freq
      type: string
      description: "6 digits + optional MC* (Multi Cast 1-8, Analog 0)"
- id: tfhd_channel_up
  label: HD Channel Up
  kind: action
  params: []
- id: tfhd_channel_down
  label: HD Channel Down
  kind: action
  params: []
- id: tp_hd_preset_set
  label: Set HD Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tp_hd_preset_up
  label: HD Preset Up
  kind: action
  params: []
- id: tp_hd_preset_down
  label: HD Preset Down
  kind: action
  params: []
- id: tp_hd_memory
  label: Memory HD Preset
  kind: action
  params: []
- id: tm_hd_band_set
  label: Set HD Radio Band
  kind: action
  params:
    - name: band
      type: string
      description: "HDAM/HDFM"
- id: tm_hd_mode_set
  label: Set HD Radio Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAUTOHD/HDAUTO/HDMANUAL/HDANAAUTO/HDANAMANU"
- id: hd_query
  label: Query HD Radio Status
  kind: action
  params: []

# Online Music / USB/iPod / Bluetooth - NS
- id: ns_control
  label: Network Selector Control
  kind: action
  params:
    - name: code
      type: string
      description: "90-9Z, RPT, RND, B**, C**, H, FV MEM, NSA, NSE - see spec for full list"
- id: sr_select
  label: Record Select Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO/CD/TUNER/DVD/BD/TV/SAT/CBL/MPLAY/GAME/HDRADIO/NET/PANDORA/SIRIUSXM/SPOTIFY/LASTFM/FLICKR/IRADIO/SERVER/FAVORITES/AUX1/AUX2/AUX3/AUX4/AUX5/AUX6/AUX7/BT/USB/IPD/IRP/FVP/SOURCE"
- id: sr_query
  label: Query Record Select Status
  kind: action
  params: []
- id: sd_input_select
  label: Set Signal Detect Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO/HDMI/DIGITAL/ANALOG/EXT.IN/7.1IN/NO"
- id: sd_query
  label: Query Signal Detect Input Mode
  kind: action
  params: []
- id: dc_input_mode
  label: Set Digital Input Codec Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO/PCM/DTS"
- id: dc_query
  label: Query Digital Input Codec Mode
  kind: action
  params: []
- id: sv_source_select
  label: Set Video Select Source
  kind: action
  params:
    - name: source
      type: string
      description: "DVD/BD/TV/SAT/CBL/MPLAY/GAME/AUX1/AUX2/AUX3/AUX4/AUX5/AUX6/AUX7/CD/SOURCE"
- id: sv_mode_on
  label: Video Select On
  kind: action
  params: []
- id: sv_mode_off
  label: Video Select Off
  kind: action
  params: []
- id: sv_query
  label: Query Video Select Status
  kind: action
  params: []
- id: zm_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-4"
- id: zm_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-4"
- id: z2_mute_query
  label: Query Zone 2 Mute Status
  kind: action
  params: []
- id: z2_channel_set
  label: Set Zone 2 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ST/MONO"
- id: z2_channel_query
  label: Query Zone 2 Channel Mode
  kind: action
  params: []
- id: z2_cv_set
  label: Set Zone 2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL/FR"
    - name: value
      type: string
      description: "38-62, 50=0dB"
- id: z2_cv_up
  label: Zone 2 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL/FR"
- id: z2_cv_down
  label: Zone 2 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL/FR"
- id: z2_cv_query
  label: Query Zone 2 Channel Volume
  kind: action
  params: []
- id: z2_bass_query
  label: Query Zone 2 Bass
  kind: action
  params: []
- id: z2_treble_query
  label: Query Zone 2 Treble
  kind: action
  params: []
- id: z2_hda_query
  label: Query Zone 2 HDMI Audio Output
  kind: action
  params: []
- id: z2_slp_query
  label: Query Zone 2 Sleep Timer
  kind: action
  params: []
- id: z2_stby_query
  label: Query Zone 2 Auto Standby
  kind: action
  params: []
- id: z2_hpfilter_query
  label: Query Zone 2 HPF Status
  kind: action
  params: []
- id: z2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-4"
- id: z2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-4"
- id: z3_mute_query
  label: Query Zone 3 Mute Status
  kind: action
  params: []
- id: z3_channel_set
  label: Set Zone 3 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ST/MONO"
- id: z3_channel_query
  label: Query Zone 3 Channel Mode
  kind: action
  params: []
- id: z3_cv_set
  label: Set Zone 3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL/FR"
    - name: value
      type: string
      description: "38-62, 50=0dB"
- id: z3_cv_up
  label: Zone 3 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL/FR"
- id: z3_cv_down
  label: Zone 3 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL/FR"
- id: z3_cv_query
  label: Query Zone 3 Channel Volume
  kind: action
  params: []
- id: z3_bass_query
  label: Query Zone 3 Bass
  kind: action
  params: []
- id: z3_treble_query
  label: Query Zone 3 Treble
  kind: action
  params: []
- id: z3_slp_query
  label: Query Zone 3 Sleep Timer
  kind: action
  params: []
- id: z3_stby_query
  label: Query Zone 3 Auto Standby
  kind: action
  params: []
- id: z3_hpfilter_query
  label: Query Zone 3 HPF Status
  kind: action
  params: []
- id: z3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-4"
- id: z3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-4"
- id: tf_frequency_query
  label: Query Tuner Frequency Status
  kind: action
  params: []
- id: tp_preset_query
  label: Query Tuner Preset Status
  kind: action
  params: []
- id: tm_query
  label: Query Tuner Band and Mode
  kind: action
  params: []
- id: tfhd_frequency_query
  label: Query HD Radio Frequency Status
  kind: action
  params: []
- id: tp_hd_preset_query
  label: Query HD Preset Status
  kind: action
  params: []
- id: tm_hd_query
  label: Query HD Radio Band and Mode
  kind: action
  params: []
- id: mn_control
  label: System Menu Navigation Control
  kind: action
  params:
    - name: code
      type: string
      description: "CUP/CDN/CLT/CRT/ENT/RTN/OPT/INF/CHL/MEN ON/MEN OFF/MEN?/PRV ON/PRV OFF/PRV?/ZST ON/ZST OFF/ZST?"
- id: sy_lock_set
  label: Set System Lock
  kind: action
  params:
    - name: lock
      type: string
      description: "REMOTE LOCK ON/REMOTE LOCK OFF/PANEL LOCK ON/PANEL+V LOCK ON/PANEL LOCK OFF"
- id: tr_set
  label: Set Trigger Output
  kind: action
  params:
    - name: trigger
      type: string
      description: "1 ON/1 OFF/2 ON/2 OFF"
- id: tr_query
  label: Query Trigger Status
  kind: action
  params: []
- id: dim_set
  label: Set Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: "BRI/DIM/DAR/OFF/SEL"
- id: dim_query
  label: Query Display Dimmer Status
  kind: action
  params: []
- id: ps_phg_set
  label: Set PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "LOW/MID/HI"
- id: ps_phg_query
  label: Query PL2z Height Gain
  kind: action
  params: []
- id: ps_cntamt_set
  label: Set Containment Amount
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_cntamt_query
  label: Query Containment Amount
  kind: action
  params: []
- id: ps_stw_set
  label: Set Stage Width
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_stw_query
  label: Query Stage Width
  kind: action
  params: []
- id: ps_sth_set
  label: Set Stage Height
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_sth_query
  label: Query Stage Height
  kind: action
  params: []
- id: ps_pan_set
  label: Set Panorama
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_pan_query
  label: Query Panorama Status
  kind: action
  params: []
- id: ps_dim_set
  label: Set Dimension
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_dim_query
  label: Query Dimension
  kind: action
  params: []
- id: ps_cen_set
  label: Set Center Width
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_cen_query
  label: Query Center Width
  kind: action
  params: []
- id: ps_cei_set
  label: Set Center Image
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_cei_query
  label: Query Center Image
  kind: action
  params: []
- id: ps_ceg_set
  label: Set Center Gain
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_ceg_query
  label: Query Center Gain
  kind: action
  params: []
- id: ps_ces_set
  label: Set Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_ces_query
  label: Query Center Spread
  kind: action
  params: []
- id: ps_swr_set
  label: Set Subwoofer Output (Direct/Stereo)
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_swr_query
  label: Query Subwoofer Output Status
  kind: action
  params: []
- id: ps_rsz_set
  label: Set Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S/MS/M/ML/L"
- id: ps_rsz_query
  label: Query Room Size
  kind: action
  params: []
- id: ps_bsc_set
  label: Set Bass Sync
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_bsc_query
  label: Query Bass Sync
  kind: action
  params: []
- id: ps_deh_set
  label: Set Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: "OFF/LOW/MED/HIGH"
- id: ps_deh_query
  label: Query Dialogue Enhancer
  kind: action
  params: []
- id: ps_lfe_set
  label: Set LFE Level
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_lfe_query
  label: Query LFE Level
  kind: action
  params: []
- id: ps_lfl_set
  label: Set LFE Level (EXT.IN / 7.1CH IN)
  kind: action
  params:
    - name: value
      type: string
      description: "00/05/10/15"
- id: ps_lfl_query
  label: Query LFE Level (EXT.IN / 7.1CH IN)
  kind: action
  params: []
- id: ps_eff_set
  label: Set Effect On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON/OFF"
- id: ps_eff_level_set
  label: Set Effect Level
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/**"
- id: ps_eff_query
  label: Query Effect Status and Level
  kind: action
  params: []
- id: ps_audio_delay_set
  label: Set Audio Delay (PSDELAY)
  kind: action
  params:
    - name: direction
      type: string
      description: "UP/DOWN/***"
- id: ps_audio_delay_query
  label: Query Audio Delay (PSDELAY)
  kind: action
  params: []
- id: ps_dialog_level_query
  label: Query Dialog Level Adjust
  kind: action
  params: []
- id: ps_sw_level_query
  label: Query Subwoofer Level Adjust
  kind: action
  params: []
- id: ps_cinema_eq_query
  label: Query Cinema EQ Status
  kind: action
  params: []
- id: ps_mode_query
  label: Query Cinema/Music/Game Mode
  kind: action
  params: []
- id: ps_loudness_query
  label: Query Loudness Management
  kind: action
  params: []
- id: ps_front_height_query
  label: Query Front Height Output
  kind: action
  params: []
- id: ps_speaker_output_query
  label: Query Speaker Output Configuration
  kind: action
  params: []
- id: ps_multieq_query
  label: Query MultEQ Mode
  kind: action
  params: []
- id: ps_dyneq_query
  label: Query Dynamic EQ
  kind: action
  params: []
- id: ps_reflev_query
  label: Query Reference Level Offset
  kind: action
  params: []
- id: ps_dynvol_query
  label: Query Dynamic Volume
  kind: action
  params: []
- id: ps_lfc_query
  label: Query Audyssey LFC
  kind: action
  params: []
- id: ps_dsx_query
  label: Query Audyssey DSX
  kind: action
  params: []
- id: ps_geq_query
  label: Query Graphic EQ
  kind: action
  params: []
- id: ps_drc_query
  label: Query Dynamic Compression
  kind: action
  params: []
- id: ps_delay_query
  label: Query Delay (PSDEL)
  kind: action
  params: []
- id: ps_restorer_query
  label: Query Audio Restorer
  kind: action
  params: []
- id: ps_front_speaker_query
  label: Query Front Speaker
  kind: action
  params: []
- id: ps_auropr_query
  label: Query Auro-Matic 3D Preset
  kind: action
  params: []
- id: ps_aurostrength_query
  label: Query Auro-Matic 3D Strength
  kind: action
  params: []
- id: pv_contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: pv_contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: pv_contrast_query
  label: Query Contrast
  kind: action
  params: []
- id: pv_brightness_up
  label: Brightness Up
  kind: action
  params: []
- id: pv_brightness_down
  label: Brightness Down
  kind: action
  params: []
- id: pv_brightness_query
  label: Query Brightness
  kind: action
  params: []
- id: pv_saturation_up
  label: Saturation Up
  kind: action
  params: []
- id: pv_saturation_down
  label: Saturation Down
  kind: action
  params: []
- id: pv_saturation_query
  label: Query Saturation
  kind: action
  params: []
- id: pv_hue_up
  label: Hue Up
  kind: action
  params: []
- id: pv_hue_down
  label: Hue Down
  kind: action
  params: []
- id: pv_hue_query
  label: Query Hue
  kind: action
  params: []
- id: pv_dnr_query
  label: Query DNR
  kind: action
  params: []
- id: pv_enhancer_up
  label: Enhancer Up
  kind: action
  params: []
- id: pv_enhancer_down
  label: Enhancer Down
  kind: action
  params: []
- id: pv_enhancer_query
  label: Query Enhancer
  kind: action
  params: []
- id: ug_idn
  label: Display Upgrade ID Number
  kind: action
  params: []
- id: rm_maintenance
  label: Set Remote Maintenance Mode
  kind: action
  params:
    - name: command
      type: string
      description: "STA/END"
- id: rm_query
  label: Query Remote Maintenance Status
  kind: action
  params: []
```

## Feedbacks
```yaml
# Query responses mirror command structure with ? suffix.
# Events push automatically on state change within 5 seconds.
# Response within 200ms of request command.
# UNRESOLVED: full event code set not enumerated in source.
```

## Variables
```yaml
# UNRESOLVED: source lists discrete commands rather than settable variables.
```

## Events
```yaml
# Device sends EVENT messages automatically when:
#   - power state changes
#   - input source changes
#   - surround mode changes
#   - channel volume changes (when input source changes and values differ)
#   - mute state changes
# Event form matches COMMAND form.
# Max 135 bytes per message.
# UNRESOLVED: complete event code table not provided.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented.
# Note: power-on requires 1 second delay before next command (J in spec).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Send next command >= 50ms after previous command.
- Power on (PWON): wait 1 second before transmitting next command.
- RESPONSE sent within 200ms of request command.
- EVENT sent within 5 seconds of state change.
- COMMAND receivable during EVENT transmission (half-duplex).
- Max data length: 135 bytes per message.
- ASCII only: 0x20 to 0x7F.
- Volume 0.5dB steps encoded as 3 ASCII characters (e.g. MV805 for +0.5dB).
- Channel volume returns as EVENT when input source changes only if value differs from prior.
- When SURROUND MODE changes, device returns present mode before change as EVENT.
- ZONE2/ZONE3 status returns SR when REC mode selected, Z2 when ZONE2 mode selected.
- Subwoofer 2 level not output if SW2 not configured.
- Auro-3D commands require Auro-3D Upgrade option.
- AUROPR/AUROST require Auro-3D Upgrade.
- SHL/SHR/TS require Auro-3D Upgrade.
- Some MS modes (e.g. AURO3D, AURO2DSURR) only available with upgrade.
<!-- UNRESOLVED: firmware compatibility, error codes, binary protocol extensions, port configuration method, DHCP/static IP setup, MAC address, reset procedures. -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:02:58.595Z
last_checked_at: 2026-06-09T10:33:59.313Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T10:33:59.313Z
matched_actions: 260
action_count: 260
confidence: medium
summary: "All 260 spec actions verified against source; only 3 trivial QUICK-status query commands absent from spec (below 5-extra threshold); transport confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MSQUICK ?"
- "Z2QUICK ?"
- "Z3QUICK ?"
- "multi-zone event push behavior not documented."
- "full event code set not enumerated in source."
- "source lists discrete commands rather than settable variables."
- "complete event code table not provided."
- "no explicit multi-step macros documented."
- "no safety warnings or interlock procedures in source."
- "firmware compatibility, error codes, binary protocol extensions, port configuration method, DHCP/static IP setup, MAC address, reset procedures."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
