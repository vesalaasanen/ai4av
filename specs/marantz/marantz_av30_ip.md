---
spec_id: admin/marantz-av30
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz AV30 Control Spec"
manufacturer: Marantz
model_family: AV30
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - AV30
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T11:58:41.162Z
last_checked_at: 2026-10-07T21:02:31.549Z
generated_at: 2026-10-07T21:02:31.549Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact product model variations covered by this protocol version (Ver.06) not specified"
  - "protocol version compatibility range not stated"
  - "flow control not stated in source"
  - "no explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source beyond the 1-second delay after PWON"
  - "some source-specific regional commands noted (North America Only, Europe Only) — full region applicability not determined"
  - "Auro-3D commands require optional upgrade — availability depends on unit configuration"
  - "AUX3 available only when Additional Source is set to On"
  - "flow_control for serial set to none per source stating \"Non procedural\" — actual hardware flow control lines (4,6,7,8,9) are NC"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:02:31.549Z
  matched_actions: 144
  action_count: 144
  confidence: medium
  summary: "All 144 action units match source command tables and transport values (9600 8N1, TCP 23) are stated; the source never names the AV30 and has other-model footnotes, so applicability is a caveat. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

# Marantz AV30 Control Spec

## Summary

The Marantz AV30 is an A/V receiver controllable via RS-232C serial and TCP/IP (Telnet on port 23). The protocol uses ASCII command strings: a 2-character command code followed by a parameter and carriage return (0x0D). Commands cover power, master and per-channel volume, input selection, surround modes, multi-zone control (Zone 2/3), tuner, HD Radio, network/USB/Bluetooth playback, video settings, Audyssey parameters, and system configuration.

<!-- UNRESOLVED: exact product model variations covered by this protocol version (Ver.06) not specified -->
<!-- UNRESOLVED: protocol version compatibility range not stated -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state authentication
```

## Traits

```yaml
traits:
  - powerable
  - levelable
  - queryable
  - routable
```

## Actions

```yaml
- id: power_set
  label: Power Control
  kind: action
  command: PW
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - STANDBY
        - "?"
      description: "ON=power on, STANDBY=standby, ?=query"
- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: MVUP
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: MVDOWN
  params: []
- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: MV
  params:
    - name: level
      type: string
      description: "00-98 two-char (80=0dB, 00=---MIN); three-char for 0.5dB steps e.g. 805=+0.5dB 795=-0.5dB"
- id: master_volume_query
  label: Master Volume Query
  kind: action
  command: "MV?"
  params: []
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  command: CV
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR
        - C
        - SW
        - SW2
        - SL
        - SR
        - SBL
        - SBR
        - SB
        - FHL
        - FHR
        - FWL
        - FWR
        - TFL
        - TFR
        - TML
        - TMR
        - TRL
        - TRR
        - RHL
        - RHR
        - FDL
        - FDR
        - SDL
        - SDR
        - BDL
        - BDR
        - SHL
        - SHR
        - TS
      description: "Speaker channel to adjust up"
- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  command: CV
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR
        - C
        - SW
        - SW2
        - SL
        - SR
        - SBL
        - SBR
        - SB
        - FHL
        - FHR
        - FWL
        - FWR
        - TFL
        - TFR
        - TML
        - TMR
        - TRL
        - TRR
        - RHL
        - RHR
        - FDL
        - FDR
        - SDL
        - SDR
        - BDL
        - BDR
        - SHL
        - SHR
        - TS
      description: "Speaker channel to adjust down"
- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  command: CV
  params:
    - name: channel
      type: enum
      values:
        - FL
        - FR
        - C
        - SW
        - SW2
        - SL
        - SR
        - SBL
        - SBR
        - SB
        - FHL
        - FHR
        - FWL
        - FWR
        - TFL
        - TFR
        - TML
        - TMR
        - TRL
        - TRR
        - RHL
        - RHR
        - FDL
        - FDR
        - SDL
        - SDR
        - BDL
        - BDR
        - SHL
        - SHR
        - TS
    - name: level
      type: string
      description: "38-62 two-char (50=0dB); SW/SW2 also accept 00"
- id: channel_volume_reset
  label: Channel Volume Reset All
  kind: action
  command: CVZRL
  params: []
- id: channel_volume_query
  label: Channel Volume Query
  kind: action
  command: "CV?"
  params: []
- id: mute_set
  label: Mute Control
  kind: action
  command: MU
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - "?"
      description: "Mute on/off/query"
- id: select_input
  label: Select Input Source
  kind: action
  command: SI
  params:
    - name: source
      type: enum
      values:
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP
        - "?"
      description: "Input source to select, ?=query"
- id: main_zone_set
  label: Main Zone Control
  kind: action
  command: ZM
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - FAVORITE1
        - FAVORITE2
        - FAVORITE3
        - FAVORITE4
        - "?"
      description: "Main zone on/off or favorite recall, ?=query"
- id: rec_select_set
  label: Record Select
  kind: action
  command: SR
  params:
    - name: source
      type: enum
      values:
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - AUX1
        - AUX2
        - AUX3
        - USB/IPOD
        - USB
        - IPOD
        - SOURCE
        - "?"
      description: "Record out source, SOURCE=cancel, ?=query"
- id: input_mode_set
  label: Input Mode Set
  kind: action
  command: SD
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - HDMI
        - DIGITAL
        - ANALOG
        - EXT.IN
        - 7.1IN
        - "NO"
        - "?"
      description: "Input signal mode, ?=query"
- id: digital_input_set
  label: Digital Input Mode Set
  kind: action
  command: DC
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - PCM
        - DTS
        - "?"
      description: "Digital input decode mode, ?=query"
- id: video_select_set
  label: Video Select
  kind: action
  command: SV
  params:
    - name: source
      type: enum
      values:
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - CD
        - SOURCE
        - "ON"
        - "OFF"
        - "?"
      description: "Video select source, ON/OFF enable/disable, SOURCE=cancel, ?=query"
- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: SLP
  params:
    - name: value
      type: string
      description: "OFF to cancel, 001-120 minutes as ASCII (e.g. 010=10min), ?=query"
- id: auto_standby_set
  label: Auto Standby Set
  kind: action
  command: STBY
  params:
    - name: timeout
      type: enum
      values:
        - 15M
        - 30M
        - 60M
        - "OFF"
        - "?"
      description: "Auto standby timeout or OFF, ?=query"
- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  command: ECO
  params:
    - name: mode
      type: enum
      values:
        - "ON"
        - AUTO
        - "OFF"
        - "?"
      description: "ECO power mode, ?=query"
- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  command: MS
  params:
    - name: mode
      type: enum
      values:
        - MOVIE
        - MUSIC
        - GAME
        - DIRECT
        - "PURE DIRECT"
        - STEREO
        - AUTO
        - "DOLBY DIGITAL"
        - "DTS SURROUND"
        - AURO3D
        - AURO2DSURR
        - "MCH STEREO"
        - "WIDE SCREEN"
        - "SUPER STADIUM"
        - "ROCK ARENA"
        - "JAZZ CLUB"
        - "CLASSIC CONCERT"
        - "MONO MOVIE"
        - MATRIX
        - "VIDEO GAME"
        - VIRTUAL
        - LEFT
        - RIGHT
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5
        - "?"
      description: "Surround mode. Additional Dolby PL2/PL2x/PL2z, DTS Neo:X/Neo:6, Atmos variants available. ?=query"
- id: surround_quick_memory
  label: Surround Quick Select Memory
  kind: action
  command: MS
  params:
    - name: slot
      type: enum
      values:
        - "QUICK1 MEMORY"
        - "QUICK2 MEMORY"
        - "QUICK3 MEMORY"
        - "QUICK4 MEMORY"
        - "QUICK5 MEMORY"
      description: "Store current settings to quick select slot"
- id: video_aspect_set
  label: Video Aspect Ratio Set
  kind: action
  command: VS
  params:
    - name: ratio
      type: enum
      values:
        - ASPNRM
        - ASPFUL
      description: "ASPNRM=4:3, ASPFUL=16:9"
- id: video_monitor_set
  label: Video Monitor Output Set
  kind: action
  command: VS
  params:
    - name: output
      type: enum
      values:
        - MONIAUTO
        - MONI1
        - MONI2
      description: "HDMI monitor auto/out1/out2"
- id: video_resolution_set
  kind: action
  label: Video Resolution Set (Analog)
  command: VS
  params:
    - name: resolution
      type: enum
      values:
        - SC48P
        - SC10I
        - SC72P
        - SC10P
        - SC10P24
        - SC4K
        - SC4KF
        - SCAUTO
      description: "480p/1080i/720p/1080p/1080p24/4K/4K60/Auto"
- id: video_hdmi_resolution_set
  label: Video Resolution Set (HDMI)
  kind: action
  command: VS
  params:
    - name: resolution
      type: enum
      values:
        - SCH48P
        - SCH10I
        - SCH72P
        - SCH10P
        - SCH10P24
        - SCH4K
        - SCH4KF
        - SCHAUTO
      description: "HDMI output resolution"
- id: video_hdmi_audio_set
  label: HDMI Audio Output Set
  kind: action
  command: VS
  params:
    - name: output
      type: enum
      values:
        - "AUDIO AMP"
        - "AUDIO TV"
      description: "HDMI audio to AMP or TV"
- id: video_processing_mode_set
  label: Video Processing Mode Set
  kind: action
  command: VS
  params:
    - name: mode
      type: enum
      values:
        - VPMAUTO
        - VPMGAME
        - VPMMOVI
      description: "Video processing: Auto/Game/Movie"
- id: video_vertical_stretch_set
  label: Vertical Stretch Set
  kind: action
  command: VS
  params:
    - name: state
      type: enum
      values:
        - "VST ON"
        - "VST OFF"
      description: "Vertical stretch on/off"
- id: tone_control_set
  label: Tone Control On/Off
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - "TONE CTRL ON"
        - "TONE CTRL OFF"
      description: "Tone control enable/disable"
- id: bass_adjust
  label: Bass Level Adjust
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "BAS UP, BAS DOWN, or BAS** where **=00-99 (50=0dB, AVR range 44-56)"
- id: treble_adjust
  label: Treble Level Adjust
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "TRE UP, TRE DOWN, or TRE** where **=00-99 (50=0dB, AVR range 44-56)"
- id: dialog_level_adjust
  label: Dialog Level Adjust
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "DIL ON, DIL OFF, DIL UP, DIL DOWN, DIL** (38-62, 50=0dB)"
- id: subwoofer_level_adjust
  label: Subwoofer Level Adjust
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "SWL ON, SWL OFF, SWL UP, SWL DOWN, SWL** (00 or 38-62, 50=0dB); SWL2 UP/DOWN/** for SW2"
- id: cinema_eq_set
  label: Cinema EQ Set
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - "CINEMA EQ.ON"
        - "CINEMA EQ.OFF"
      description: "Cinema equalizer on/off"
- id: pl_mode_set
  label: Pro Logic Mode Set
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - "MODE:MUSIC"
        - "MODE:CINEMA"
        - "MODE:GAME"
        - "MODE:PRO LOGIC"
      description: "Dolby PL2/PL2x processing mode"
- id: multeq_set
  label: MultEQ Mode Set
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - "MULTEQ:AUDYSSEY"
        - "MULTEQ:BYP.LR"
        - "MULTEQ:FLAT"
        - "MULTEQ:OFF"
      description: "Audyssey MultEQ mode"
- id: dynamic_eq_set
  label: Dynamic EQ Set
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - "DYNEQ ON"
        - "DYNEQ OFF"
      description: "Dynamic EQ on/off"
- id: ref_level_offset_set
  label: Reference Level Offset Set
  kind: action
  command: PS
  params:
    - name: offset
      type: enum
      values:
        - "REFLEV 0"
        - "REFLEV 5"
        - "REFLEV 10"
        - "REFLEV 15"
      description: "Reference level offset 0/5/10/15 dB"
- id: dynamic_vol_set
  label: Dynamic Volume Set
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - "DYNVOL HEV"
        - "DYNVOL MED"
        - "DYNVOL LIT"
        - "DYNVOL OFF"
      description: "Dynamic volume Heavy/Medium/Light/Off"
- id: lfc_set
  label: Audyssey LFC Set
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - "LFC ON"
        - "LFC OFF"
      description: "Audyssey LFC on/off"
- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "CNTAMT UP, CNTAMT DOWN, CNTAMT** (00-99, AVR range 01-07)"
- id: drc_set
  label: Dynamic Compression Set
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - "DRC AUTO"
        - "DRC LOW"
        - "DRC MID"
        - "DRC HI"
        - "DRC OFF"
      description: "Dynamic range compression"
- id: graphic_eq_set
  label: Graphic EQ Set
  kind: action
  command: PS
  params:
    - name: state
      type: enum
      values:
        - "GEQ ON"
        - "GEQ OFF"
      description: "Graphic equalizer on/off"
- id: speaker_output_set
  label: Speaker Output Configuration
  kind: action
  command: PS
  params:
    - name: config
      type: enum
      values:
        - "SP:FW"
        - "SP:FH"
        - "SP:SB"
        - "SP:HW"
        - "SP:BH"
        - "SP:BW"
        - "SP:FL"
        - "SP:HF"
        - "SP:FR"
      description: "Speaker output assignment (Front Height/Wide/Surround Back)"
- id: room_size_set
  label: Room Size Set
  kind: action
  command: PS
  params:
    - name: size
      type: enum
      values:
        - "RSZ S"
        - "RSZ MS"
        - "RSZ M"
        - "RSZ ML"
        - "RSZ L"
      description: "Room size preset"
- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "DELAY UP, DELAY DOWN, DELAY*** (000-999, 000=0ms, 200=200ms, AVR range 0-200)"
- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "BSC UP, BSC DOWN, BSC** (00-99, 00=0, range 0-16)"
- id: dialogue_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - "DEH OFF"
        - "DEH LOW"
        - "DEH MED"
        - "DEH HIGH"
      description: "Dialogue enhancer level"
- id: lfe_level_set
  label: LFE Level Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "LFE UP, LFE DOWN, LFE** (00-99, 00=0dB, 10=-10dB, range 0 to -10)"
- id: effect_set
  label: Effect Level Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "EFF ON, EFF OFF, EFF UP, EFF DOWN, EFF** (00-99, range 1-15)"
- id: restorer_set
  label: Audio Restorer Set
  kind: action
  command: PS
  params:
    - name: mode
      type: enum
      values:
        - "RSTR OFF"
        - "RSTR LOW"
        - "RSTR MED"
        - "RSTR HI"
      description: "Audio restorer mode"
- id: front_speaker_set
  label: Front Speaker Select
  kind: action
  command: PS
  params:
    - name: speaker
      type: enum
      values:
        - "FRONT SPA"
        - "FRONT SPB"
        - "FRONT A+B"
      description: "Front speaker pair A/B select"
- id: stage_width_set
  label: Stage Width Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "STW UP, STW DOWN, STW** (00-99, 50=0dB, range -10 to +10)"
- id: stage_height_set
  label: Stage Height Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "STH UP, STH DOWN, STH** (00-99, 50=0dB, range -10 to +10)"
- id: enhancer_set
  label: Enhancer Adjust
  kind: action
  command: PV
  params:
    - name: value
      type: string
      description: "ENH UP, ENH DOWN, ENH*** (00-12, range 0-12)"
- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: PV
  params:
    - name: mode
      type: enum
      values:
        - "OFF"
        - STD
        - MOV
        - VVD
        - STM
        - CTM
        - DAY
        - NGT
        - "?"
      description: "Picture mode preset (Off/Standard/Movie/Vivid/Stream/Custom/ISF Day/ISF Night), ?=query"
- id: contrast_set
  label: Contrast Adjust
  kind: action
  command: PV
  params:
    - name: value
      type: string
      description: "CN UP, CN DOWN, CN*** (000-100, 050=0, range -50 to +50)"
- id: brightness_set
  label: Brightness Adjust
  kind: action
  command: PV
  params:
    - name: value
      type: string
      description: "BR UP, BR DOWN, BR*** (000-100, 050=0, range -50 to +50)"
- id: saturation_set
  label: Saturation Adjust
  kind: action
  command: PV
  params:
    - name: value
      type: string
      description: "ST UP, ST DOWN, ST*** (000-100, 050=0, range -50 to +50)"
- id: hue_set
  label: Hue Adjust
  kind: action
  command: PV
  params:
    - name: value
      type: string
      description: "HUE UP, HUE DOWN, HUE** (44-56, 50=0, range -6 to +6)"
- id: dnr_set
  label: DNR Set
  kind: action
  command: PV
  params:
    - name: mode
      type: enum
      values:
        - "DNR OFF"
        - "DNR LOW"
        - "DNR MID"
        - "DNR HI"
      description: "Digital noise reduction"
- id: zone2_source_set
  label: Zone 2 Source Select
  kind: action
  command: Z2
  params:
    - name: source
      type: enum
      values:
        - SOURCE
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP
      description: "Zone 2 source; SOURCE=follow main zone"
- id: zone2_power_set
  label: Zone 2 Power Control
  kind: action
  command: Z2
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - "?"
      description: "Zone 2 power, ?=query"
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: Z2UP
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: Z2DOWN
  params: []
- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: Z2
  params:
    - name: level
      type: string
      description: "00-98 two-char (80=0dB, 00=---MIN)"
- id: zone2_mute_set
  label: Zone 2 Mute Control
  kind: action
  command: Z2MU
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - "?"
      description: "Zone 2 mute, ?=query"
- id: zone2_channel_set
  label: Zone 2 Channel Setting
  kind: action
  command: Z2CS
  params:
    - name: mode
      type: enum
      values:
        - ST
        - MONO
        - "?"
      description: "Zone 2 stereo/mono, ?=query"
- id: zone2_channel_volume
  label: Zone 2 Channel Volume
  kind: action
  command: Z2CV
  params:
    - name: value
      type: string
      description: "FL UP, FL DOWN, FL**; FR UP, FR DOWN, FR**; ?=query"
- id: zone2_hpf_set
  label: Zone 2 HPF Set
  kind: action
  command: Z2HPF
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - "?"
      description: "Zone 2 high-pass filter, ?=query"
- id: zone2_bass_treble_set
  label: Zone 2 Bass/Treble Adjust
  kind: action
  command: Z2PS
  params:
    - name: value
      type: string
      description: "BAS UP/DOWN/**, TRE UP/DOWN/** (00-99, 50=0dB), BAS ?/TRE ?"
- id: zone2_sleep_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: Z2SLP
  params:
    - name: value
      type: string
      description: "OFF or 001-120 minutes ASCII, ?=query"
- id: zone2_standby_set
  label: Zone 2 Auto Standby Set
  kind: action
  command: Z2STBY
  params:
    - name: timeout
      type: enum
      values:
        - 2H
        - 4H
        - 8H
        - "OFF"
        - "?"
      description: "Zone 2 auto standby timeout, ?=query"
- id: zone3_source_set
  label: Zone 3 Source Select
  kind: action
  command: Z3
  params:
    - name: source
      type: enum
      values:
        - SOURCE
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP
      description: "Zone 3 source; SOURCE=follow main zone"
- id: zone3_power_set
  label: Zone 3 Power Control
  kind: action
  command: Z3
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - "?"
      description: "Zone 3 power, ?=query"
- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: Z3UP
  params: []
- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: Z3DOWN
  params: []
- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  command: Z3
  params:
    - name: level
      type: string
      description: "00-98 two-char (80=0dB, 00=---MIN)"
- id: zone3_mute_set
  label: Zone 3 Mute Control
  kind: action
  command: Z3MU
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - "?"
      description: "Zone 3 mute, ?=query"
- id: zone3_channel_set
  label: Zone 3 Channel Setting
  kind: action
  command: Z3CS
  params:
    - name: mode
      type: enum
      values:
        - ST
        - MONO
        - "?"
      description: "Zone 3 stereo/mono, ?=query"
- id: zone3_channel_volume
  label: Zone 3 Channel Volume
  kind: action
  command: Z3CV
  params:
    - name: value
      type: string
      description: "FL UP, FL DOWN, FL**; FR UP, FR DOWN, FR**; ?=query"
- id: zone3_hpf_set
  label: Zone 3 HPF Set
  kind: action
  command: Z3HPF
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
        - "?"
      description: "Zone 3 high-pass filter, ?=query"
- id: zone3_bass_treble_set
  label: Zone 3 Bass/Treble Adjust
  kind: action
  command: Z3PS
  params:
    - name: value
      type: string
      description: "BAS UP/DOWN/**, TRE UP/DOWN/** (00-99, 50=0dB), BAS ?/TRE ?"
- id: zone3_sleep_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: Z3SLP
  params:
    - name: value
      type: string
      description: "OFF or 001-120 minutes ASCII, ?=query"
- id: zone3_standby_set
  label: Zone 3 Auto Standby Set
  kind: action
  command: Z3STBY
  params:
    - name: timeout
      type: enum
      values:
        - 2H
        - 4H
        - 8H
        - "OFF"
        - "?"
      description: "Zone 3 auto standby timeout, ?=query"
- id: tuner_frequency_set
  label: Tuner Frequency Control
  kind: action
  command: TF
  params:
    - name: value
      type: string
      description: "ANUP, ANDOWN, AN****** (6-digit: >050000=AM kHz, <050000=FM MHz), AN?"
- id: tuner_preset_set
  label: Tuner Preset Control
  kind: action
  command: TP
  params:
    - name: value
      type: string
      description: "ANUP, ANDOWN, AN** (01-56), ANMEM, ANMEM** (01-56), AN?"
- id: tuner_mode_set
  label: Tuner Band/Mode Set
  kind: action
  command: TM
  params:
    - name: value
      type: enum
      values:
        - ANAM
        - ANFM
        - ANAUTO
        - ANMANUAL
      description: "AM/FM band, Auto/Manual tuning"
- id: hd_radio_frequency_set
  label: HD Radio Frequency Control
  kind: action
  command: TF
  params:
    - name: value
      type: string
      description: "HDUP, HDDOWN, HD****** (6-digit freq), HDMC* (multicast 1-8, 0=analog), HD******MC*, HD?"
- id: hd_radio_preset_set
  label: HD Radio Preset Control
  kind: action
  command: TP
  params:
    - name: value
      type: string
      description: "HDUP, HDDOWN, HD** (01-56), HDMEM, HDMEM** (01-56), HD?"
- id: hd_radio_mode_set
  label: HD Radio Mode Set
  kind: action
  command: TM
  params:
    - name: value
      type: enum
      values:
        - HDAM
        - HDFM
        - HDAUTOHD
        - HDAUTO
        - HDMANUAL
        - HDANAAUTO
        - HDANAMANU
      description: "HD Radio band and tuning mode"
- id: network_cursor
  label: Network/USB Cursor Control
  kind: action
  command: NS
  params:
    - name: direction
      type: enum
      values:
        - "90"
        - "91"
        - "92"
        - "93"
      description: "90=Up, 91=Down, 92=Left, 93=Right"
- id: network_transport
  label: Network/USB Transport Control
  kind: action
  command: NS
  params:
    - name: action_code
      type: enum
      values:
        - 9A
        - 9B
        - 9C
        - 9D
        - 9E
        - 9F
        - 9G
      description: "9A=Play, 9B=Pause, 9C=Stop, 9D=Skip+, 9E=Skip-, 9F=Search+, 9G=Search-"
- id: network_repeat
  label: Network Repeat Mode
  kind: action
  command: NS
  params:
    - name: mode
      type: enum
      values:
        - 9H
        - 9I
        - 9J
        - RPT
      description: "9H=Repeat One, 9I=Repeat All, 9J=Repeat Off, RPT=Toggle"
- id: network_random
  label: Network Random Mode
  kind: action
  command: NS
  params:
    - name: mode
      type: enum
      values:
        - 9K
        - 9M
        - RND
      description: "9K=Random On, 9M=Random Off, RND=Toggle"
- id: network_preset_call
  label: Network Preset Call
  kind: action
  command: NS
  params:
    - name: number
      type: string
      description: "B** where **=00-35 preset number"
- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  command: NS
  params:
    - name: number
      type: string
      description: "C** where **=00-35 preset number"
- id: network_page
  label: Network Page Control
  kind: action
  command: NS
  params:
    - name: direction
      type: enum
      values:
        - 9X
        - 9Y
      description: "9X=Page Next, 9Y=Page Previous"
- id: menu_cursor
  label: Setup Menu Cursor
  kind: action
  command: MN
  params:
    - name: direction
      type: enum
      values:
        - CUP
        - CDN
        - CLT
        - CRT
        - ENT
        - RTN
        - OPT
        - INF
      description: "Cursor Up/Down/Left/Right, Enter, Return, Option, Info"
- id: menu_toggle
  label: Setup Menu On/Off
  kind: action
  command: MN
  params:
    - name: state
      type: enum
      values:
        - "MEN ON"
        - "MEN OFF"
        - "MEN?"
      description: "Setup menu on/off, ?=query"
- id: channel_level_menu
  label: Channel Level Adjust Menu
  kind: action
  command: MNCHL
  params: []
- id: all_zone_stereo
  label: All Zone Stereo
  kind: action
  command: MN
  params:
    - name: state
      type: enum
      values:
        - "ZST ON"
        - "ZST OFF"
        - "ZST?"
      description: "All Zone Stereo mode, ?=query"
- id: system_lock_set
  label: System Lock Set
  kind: action
  command: SY
  params:
    - name: mode
      type: enum
      values:
        - "REMOTE LOCK ON"
        - "REMOTE LOCK OFF"
        - "PANEL LOCK ON"
        - "PANEL+V LOCK ON"
        - "PANEL LOCK OFF"
      description: "Lock remote, panel buttons, or panel+volume"
- id: trigger_set
  label: Trigger Control
  kind: action
  command: TR
  params:
    - name: trigger
      type: enum
      values:
        - "1 ON"
        - "1 OFF"
        - "2 ON"
        - "2 OFF"
        - "?"
      description: "Trigger 1/2 on/off, ?=query both"
- id: dimmer_set
  label: Dimmer Control
  kind: action
  command: DIM
  params:
    - name: level
      type: enum
      values:
        - BRI
        - DIM
        - DAR
        - "OFF"
        - SEL
        - "?"
      description: "Front panel brightness Bright/Dim/Dark/Off, SEL=cycle, ?=query"
- id: remote_maintenance
  label: Remote Maintenance Mode
  kind: action
  command: RM
  params:
    - name: state
      type: enum
      values:
        - STA
        - END
        - "?"
      description: "Start/end remote maintenance, ?=query"
- id: surround_mode_advanced_set
  label: Additional Surround Modes Set
  kind: action
  command: MS
  params:
    - name: mode
      type: enum
      values:
        - "DOLBY PRO LOGIC"
        - "DOLBY PL2 C"
        - "DOLBY PL2 M"
        - "DOLBY PL2 G"
        - "DOLBY PL2X C"
        - "DOLBY PL2X M"
        - "DOLBY PL2X G"
        - "DOLBY PL2Z H"
        - "DOLBY SURROUND"
        - "DOLBY ATMOS"
        - "DOLBY D EX"
        - "DOLBY D+PL2X C"
        - "DOLBY D+PL2X M"
        - "DOLBY D+PL2Z H"
        - "DOLBY D+DS"
        - "DOLBY D+NEO:X C"
        - "DOLBY D+NEO:X M"
        - "DOLBY D+NEO:X G"
        - "DTS ES DSCRT6.1"
        - "DTS ES MTRX6.1"
        - "DTS+PL2X C"
        - "DTS+PL2X M"
        - "DTS+PL2Z H"
        - "DTS+DS"
        - "DTS96/24"
        - "DTS96 ES MTRX"
        - "DTS+NEO:6"
        - "DTS+NEO:X C"
        - "DTS+NEO:X M"
        - "DTS+NEO:X G"
        - "MULTI CH IN"
        - "M CH IN+DOLBY EX"
        - "M CH IN+PL2X C"
        - "M CH IN+PL2X M"
        - "M CH IN+PL2Z H"
        - "M CH IN+DS"
        - "MULTI CH IN 7.1"
        - "M CH IN+NEO:X C"
        - "M CH IN+NEO:X M"
        - "M CH IN+NEO:X G"
        - "DOLBY D+"
        - "DOLBY D+ +EX"
        - "DOLBY D+ +PL2X C"
        - "DOLBY D+ +PL2X M"
        - "DOLBY D+ +PL2Z H"
        - "DOLBY D+ +DS"
        - "DOLBY D+ +NEO:X C"
        - "DOLBY D+ +NEO:X M"
        - "DOLBY D+ +NEO:X G"
        - "DOLBY HD"
        - "DOLBY HD+EX"
        - "DOLBY HD+PL2X C"
        - "DOLBY HD+PL2X M"
        - "DOLBY HD+PL2Z H"
        - "DOLBY HD+DS"
        - "DOLBY HD+NEO:X C"
        - "DOLBY HD+NEO:X M"
        - "DOLBY HD+NEO:X G"
        - "DTS HD"
        - "DTS HD MSTR"
        - "DTS HD+PL2X C"
        - "DTS HD+PL2X M"
        - "DTS HD+PL2Z H"
        - "DTS HD+DS"
        - "DTS HD+NEO:6"
        - "DTS HD+NEO:X C"
        - "DTS HD+NEO:X M"
        - "DTS HD+NEO:X G"
        - "DTS EXPRESS"
        - "DTS ES 8CH DSCRT"
        - "MPEG2 AAC"
        - "AAC+DOLBY EX"
        - "AAC+PL2X C"
        - "AAC+PL2X M"
        - "AAC+PL2Z H"
        - "AAC+DS"
        - "AAC+NEO:X C"
        - "AAC+NEO:X M"
        - "AAC+NEO:X G"
        - "PL DSX"
        - "PL2 C DSX"
        - "PL2 M DSX"
        - "PL2 G DSX"
        - "AUDYSSEY DSX"
        - "DTS NEO:6 C"
        - "DTS NEO:6 M"
        - "DTS NEO:X C"
        - "DTS NEO:X M"
        - "DTS NEO:X G"
        - "7.1IN"
        - "PURE DIRECT EXT"
      description: "Additional surround modes documented in the COMMAND and RESPONSE list"
- id: additional_ps_controls
  label: Additional Audio Processing Controls
  kind: action
  command: PS
  params:
    - name: value
      type: enum
      values:
        - "LOM ON"
        - "LOM OFF"
        - "FH:ON"
        - "FH:OFF"
        - "PHG LOW"
        - "PHG MID"
        - "PHG HI"
        - "MULTEQ:MANUAL"
        - "DSX ONHW"
        - "DSX ONH"
        - "DSX ONW"
        - "DSX OFF"
        - "PAN ON"
        - "PAN OFF"
        - "DIM UP"
        - "DIM DOWN"
        - "DIM**"
        - "CEN UP"
        - "CEN DOWN"
        - "CEN**"
        - "CEI UP"
        - "CEI DOWN"
        - "CEI**"
        - "CEG UP"
        - "CEG DOWN"
        - "CEG**"
        - "CES ON"
        - "CES OFF"
        - "SWR ON"
        - "SWR OFF"
      description: "DIM** is 00 to 99 by ASCII; AVR can be operated from 0 to 6. CEN** is 00 to 99 by ASCII; AVR can be operated from 0 to 7. CEI** and CEG** are direct change values; AVR can be operated from 0.0 to 1.0."
- id: lfe_ext_in_set
  label: LFE Level Set for External Input
  kind: action
  command: PS
  params:
    - name: level
      type: enum
      values:
        - "LFL 00"
        - "LFL 05"
        - "LFL 10"
        - "LFL 15"
- id: audio_delay_direct_set
  label: Audio Delay Direct Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "DEL ***, where ***:000 to 999 by ASCII, 000=0ms, 300=300ms; AVR can be operated from 0 to 300; 0-60ms:3ms/Step Over 60ms:10ms/Step"
- id: auro_matic_preset_set
  label: Auro-Matic 3D Preset Set
  kind: action
  command: PS
  params:
    - name: preset
      type: enum
      values:
        - "AUROPR SMA"
        - "AUROPR MED"
        - "AUROPR LAR"
        - "AUROPR SPE"
- id: auro_matic_strength_set
  label: Auro-Matic 3D Strength Set
  kind: action
  command: PS
  params:
    - name: value
      type: string
      description: "AUROST UP, AUROST DOWN, AUROST** (00 to 99 by ASCII, 01=1, 10=10; AVR can be operated from 1 to 16)"
- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Set
  kind: action
  command: Z2HDA
  params:
    - name: mode
      type: enum
      values:
        - THR
        - PCM
- id: upgrade_id_display
  label: Upgrade ID Display
  kind: action
  command: UG
  params:
    - name: operation
      type: enum
      values:
        - IDN
- id: instaprevue_set
  label: InstaPrevue Control
  kind: action
  command: MN
  params:
    - name: state
      type: enum
      values:
        - "PRV ON"
        - "PRV OFF"
        - "PRV?"
- id: network_add_favorites
  label: Add Favorites Folder
  kind: action
  command: NS
  params:
    - name: operation
      type: enum
      values:
        - "FV MEM"
- id: network_playback_mode_control
  label: Network Playback Mode Control
  kind: action
  command: NS
  params:
    - name: action_code
      type: enum
      values:
        - "9W"
        - "9Z"
      description: "9W=Toggle Switch From iPod Mode/On Screen Mode; 9Z=Manual Search STOP"
- id: main_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  command: ZM
  params:
    - name: favorite
      type: enum
      values:
        - "FAVORITE1 MEMORY"
        - "FAVORITE2 MEMORY"
        - "FAVORITE3 MEMORY"
        - "FAVORITE4 MEMORY"
- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  command: Z2
  params:
    - name: slot
      type: enum
      values:
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5
        - "QUICK1 MEMORY"
        - "QUICK2 MEMORY"
        - "QUICK3 MEMORY"
        - "QUICK4 MEMORY"
        - "QUICK5 MEMORY"
- id: zone2_favorite_control
  label: Zone 2 Favorite Control
  kind: action
  command: Z2
  params:
    - name: favorite
      type: enum
      values:
        - FAVORITE1
        - FAVORITE2
        - FAVORITE3
        - FAVORITE4
        - "FAVORITE1 MEMORY"
        - "FAVORITE2 MEMORY"
        - "FAVORITE3 MEMORY"
        - "FAVORITE4 MEMORY"
- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  command: Z3
  params:
    - name: slot
      type: enum
      values:
        - QUICK1
        - QUICK2
        - QUICK3
        - QUICK4
        - QUICK5
        - "QUICK1 MEMORY"
        - "QUICK2 MEMORY"
        - "QUICK3 MEMORY"
        - "QUICK4 MEMORY"
        - "QUICK5 MEMORY"
- id: zone3_favorite_control
  label: Zone 3 Favorite Control
  kind: action
  command: Z3
  params:
    - name: favorite
      type: enum
      values:
        - FAVORITE1
        - FAVORITE2
        - FAVORITE3
        - FAVORITE4
        - "FAVORITE1 MEMORY"
        - "FAVORITE2 MEMORY"
        - "FAVORITE3 MEMORY"
        - "FAVORITE4 MEMORY"
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values:
    - "ON"
    - STANDBY
  command: PW
  query_command: "PW?"
  trigger: "EVENT on power state change"
- id: master_volume_level
  type: string
  command: MV
  query_command: "MV?"
  description: "Two-char (00-98) or three-char for 0.5dB steps"
  trigger: "EVENT on volume change"
- id: mute_state
  type: enum
  values:
    - "ON"
    - "OFF"
  command: MU
  query_command: "MU?"
  trigger: "EVENT on mute toggle"
- id: input_source
  type: string
  command: SI
  query_command: "SI?"
  description: "Active input source name"
  trigger: "EVENT on input change"
- id: main_zone_state
  type: enum
  values:
    - "ON"
    - "OFF"
  command: ZM
  query_command: "ZM?"
  trigger: "EVENT on zone state change"
- id: surround_mode
  type: string
  command: MS
  query_command: "MS?"
  description: "Active surround mode name"
  trigger: "EVENT on mode change; previous mode sent before new mode"
- id: channel_volume_report
  type: string
  command: CV
  query_command: "CV?"
  description: "Per-channel level, terminated by CVEND"
  trigger: "EVENT on channel volume change or input source change"
- id: sleep_timer
  type: string
  command: SLP
  query_command: "SLP?"
  description: "Remaining minutes or OFF"
- id: input_mode
  type: string
  command: SD
  query_command: "SD?"
  description: "Current input signal mode"
- id: video_select_state
  type: string
  command: SV
  query_command: "SV?"
  description: "Source and ON/OFF status"
- id: tuner_frequency
  type: string
  command: TF
  query_command: "TFAN?"
  description: "6-digit frequency (e.g. 105000=1050.00kHz AM)"
- id: tuner_preset
  type: string
  command: TP
  query_command: "TPAN?"
  description: "Preset number or OFF"
- id: tuner_station_name
  type: string
  command: TFANNAME?
  query_command: "TFANNAME?"
  description: "RDS station name (EU/AP only)"
- id: hd_radio_status
  type: string
  command: "HD?"
  query_command: "HD?"
  description: "Multi-line: station name, signal level, multicast, artist, title, album, genre, mode"
- id: network_display_ascii
  type: string
  command: NSA
  query_command: NSA
  description: "Multi-line onscreen display (ASCII, up to 96 bytes per line, lines NSA0-NSA8)"
- id: network_display_utf8
  type: string
  command: NSE
  query_command: NSE
  description: "Multi-line onscreen display (UTF-8, up to 96 bytes per line, lines NSE0-NSE8)"
- id: zone2_status
  type: string
  command: Z2
  query_command: "Z2?"
  description: "Zone 2 power, source, volume status"
- id: zone3_status
  type: string
  command: Z3
  query_command: "Z3?"
  description: "Zone 3 power, source, volume status"
- id: trigger_status
  type: string
  command: TR
  query_command: "TR?"
  description: "TR1 and TR2 on/off status"
- id: dimmer_status
  type: string
  command: DIM
  query_command: "DIM ?"
  description: "Current dimmer level"
- id: network_preset_names
  type: string
  command: NSH
  query_command: NSH
  description: "Preset name list (UTF-8, 20 chars each, 36 presets)"
```

## Variables

```yaml
- id: master_volume
  type: string
  access: read_write
  description: "00-98 (80=0dB, 00=---MIN); three-char for 0.5dB steps"
- id: channel_level
  type: string
  access: read_write
  description: "Per speaker 38-62 (50=0dB); SW 00 or 38-62"
- id: bass_level
  type: string
  access: read_write
  description: "00-99 (50=0dB, AVR range 44-56 = -6 to +6)"
- id: treble_level
  type: string
  access: read_write
  description: "00-99 (50=0dB, AVR range 44-56 = -6 to +6)"
- id: audio_delay
  type: string
  access: read_write
  description: "000-999 (000=0ms, 200=200ms, AVR range 0-200ms)"
- id: contrast
  type: string
  access: read_write
  description: "000-100 (050=0, range -50 to +50)"
- id: brightness
  type: string
  access: read_write
  description: "000-100 (050=0, range -50 to +50)"
- id: saturation
  type: string
  access: read_write
  description: "000-100 (050=0, range -50 to +50)"
- id: hue
  type: string
  access: read_write
  description: "44-56 (50=0, range -6 to +6)"
- id: zone2_volume
  type: string
  access: read_write
  description: "00-98 (80=0dB, 00=---MIN)"
- id: zone3_volume
  type: string
  access: read_write
  description: "00-98 (80=0dB, 00=---MIN)"
```

## Events

```yaml
- id: state_change_event
  description: "Unsolicited EVENT sent when device state changes via front panel or other control. Format identical to COMMAND. Must be sent within 5 seconds of state change."
- id: input_change_cascade
  description: "SURROUND MODE and CHANNEL VOLUME events fire on input source change when values differ from previous source. No event sent when values are unchanged."
- id: surround_mode_reapply
  description: "SURROUND MODE event returns when same mode is reapplied. CHANNEL VOLUME does not return on reapply."
- id: surround_mode_before_after
  description: "When surround mode changes, current (previous) mode is returned before new mode event."
```

## Macros

```yaml
- id: tuner_preset_memory
  description: "Store current frequency to preset: send TPANMEM, then navigate (TPANUP/TPANDOWN/TPAN**), then TPANMEM again to confirm."
  steps:
    - command: TPANMEM
    - command: "TPANUP or TPANDOWN or TPAN**"
    - command: TPANMEM
- id: quick_select_memory
  description: "Store current settings to quick select slot (main zone, zone 2, zone 3). E.g. MSQUICK1 MEMORY, Z2QUICK1 MEMORY, Z3QUICK1 MEMORY."
  steps:
    - command: "MSQUICK[n] MEMORY"
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source beyond the 1-second delay after PWON -->

## Notes

**Command format:** `COMMAND` + `PARAMETER` + `CR` (0x0D). Command is always 2 ASCII characters. Parameter is up to 25 ASCII characters. Special parameter `?` queries current state.

**Timing constraints (explicitly stated in source):**
- Minimum 50ms interval between commands
- Maximum 200ms response time for query (REQUEST COMMAND + `?` + CR)
- Wait 1 second after `PWON` before sending next command
- Events must be sent within 5 seconds of state change

**Volume encoding:** Two-char ASCII for integer dB (80=0dB, 81=+1dB, 79=-1dB, 00=---/MIN). Three-char for 0.5dB steps (805=+0.5dB, 795=-0.5dB, 005=-79.5dB).

**Channel volume:** Range 38-62 (50=0dB) for speakers. Subwoofer (SW/SW2) range 00 or 38-62. Query response `CV?` returns only channels present in speaker configuration, terminated by `CVEND`.

**Half-duplex communication:** Both RS-232 and Ethernet operate in half-duplex mode. Max data length 135 bytes.

**Audio delay (PS DELAY):** Range 000-999 (000=0ms, 200=200ms). AVR range 0-200ms.

**Surround mode variants:** The source documents 80+ specific Dolby, DTS, and Neo:X/Neo:6 surround mode names beyond the main categories listed (e.g. MSDOLBY PL2 C, MSDOLBY ATMOS, MSDTS HD MSTR, MSDTS+NEO:X G, etc.). See source "COMMAND and RESPONSE list" for complete enumeration.

<!-- UNRESOLVED: some source-specific regional commands noted (North America Only, Europe Only) — full region applicability not determined -->
<!-- UNRESOLVED: Auro-3D commands require optional upgrade — availability depends on unit configuration -->
<!-- UNRESOLVED: AUX3 available only when Additional Source is set to On -->
<!-- UNRESOLVED: flow_control for serial set to none per source stating "Non procedural" — actual hardware flow control lines (4,6,7,8,9) are NC -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T11:58:41.162Z
last_checked_at: 2026-10-07T21:02:31.549Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:02:31.549Z
matched_actions: 144
action_count: 144
confidence: medium
summary: "All 144 action units match source command tables and transport values (9600 8N1, TCP 23) are stated; the source never names the AV30 and has other-model footnotes, so applicability is a caveat. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact product model variations covered by this protocol version (Ver.06) not specified"
- "protocol version compatibility range not stated"
- "flow control not stated in source"
- "no explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source beyond the 1-second delay after PWON"
- "some source-specific regional commands noted (North America Only, Europe Only) — full region applicability not determined"
- "Auro-3D commands require optional upgrade — availability depends on unit configuration"
- "AUX3 available only when Additional Source is set to On"
- "flow_control for serial set to none per source stating \"Non procedural\" — actual hardware flow control lines (4,6,7,8,9) are NC"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
