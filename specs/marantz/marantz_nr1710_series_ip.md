---
spec_id: admin/marantz-nr1710
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NR1710 Series Control Spec"
manufacturer: Marantz
model_family: NR1710
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - NR1710
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:01:26.375Z
last_checked_at: 2026-10-07T13:29:25.917Z
generated_at: 2026-10-07T13:29:25.917Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "network authentication (none stated in source)"
  - "many setup/parameter commands exist but variable mapping not fully enumerated"
  - "complete unsolicited event list not enumerated in source"
  - "no explicit multi-step macros documented"
  - "no explicit safety warnings in source beyond timing note"
  - "authentication or login requirements on TCP (Telnet) or RS-232"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:29:25.917Z
  matched_actions: 360
  action_count: 360
  confidence: medium
  summary: "All 360 action units match source commands with correct shapes and transport; coverage near-complete; source is a generic Denon/Marantz protocol guide not naming NR1710. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz NR1710 Series Control Spec

## Summary
Marantz NR1710 Series AV receiver with both RS-232C and Ethernet (TCP/IP Telnet) control interfaces. ASCII-based command protocol with 2-character command codes, parameter + CR (0x0D) structure. Supports multi-zone control (Main, Zone2, Zone3), audio/video routing, surround mode selection, and tuner control. Authentication requirements are UNRESOLVED.

<!-- UNRESOLVED: network authentication (none stated in source) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # PWON/PWSTANDBY commands present
- routable        # SI (input select), SD (digital input), SV (video select) commands present
- queryable       # ? suffix commands return RESPONSE (e.g. PW?, MV?, SI?)
- levelable       # MV (master volume), CV (channel volume), MU (mute) commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98 (80=0dB, 00=--- MIN); 0.5dB steps use 3 ASCII chars"
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: digital_input_select
  label: Digital Input Select
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE, ON, OFF"
- id: surround_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, MULTI CH IN, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY, and many others"
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: main_zone_favorite
  label: Main Zone Favorite
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4 (FAVORITE1-4)"
- id: tone_control
  label: Tone Control
  kind: action
  params:
    - name: tone
      type: string
      description: "ON, OFF"
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (010=10min), OFF"
- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits: ****.** kHz AM, ****.** MHz FM"
- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
- id: tuner_preset_set
  label: Tuner Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tuner_band
  label: Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: "AM, FM"
- id: tuner_tuning_mode
  label: Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, MANUAL"
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_source
  label: Zone2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same options as SI (input select)"
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
- id: zone3_source
  label: Zone3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same options as SI (input select)"
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  params: []
- id: hd_radio_multicast_select
  label: HD Radio Multicast Channel Select
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-8 (Multi Cast)"
- id: net_audio_preset_call
  label: Net Audio Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: net_audio_preset_memory
  label: Net Audio Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: channel_volume_up # CVFL UP
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS; SHL, SHR, TS: Auro-3D Upgrade only"
- id: channel_volume_down # CVFL DOWN
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS; SHL, SHR, TS: Auro-3D Upgrade only"
- id: channel_volume_set # CVFL 50
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS; SHL, SHR, TS: Auro-3D Upgrade only"
    - name: level
      type: integer
      description: "38 to 62 by ASCII , 50=0dB; SW, SW2: 00,38 to 62 by ASCII , 50=0dB; 0.5dB step uses three ASCII characters"
- id: channel_volume_reset # CVZRL
  label: Channel Volume Reset
  kind: action
  params: []
- id: main_zone_favorite_memory # ZMFAVORITE1 MEMORY
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4; FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"
- id: record_source_select # SRPHONO
  label: Record Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "The name of PARAMETER is the same as that of the time of SI COMMAND.; additionally documented: IPOD, USB DIRECT, IPOD DIRECT, SOURCE; SOURCE cancels REC SELECT mode"
- id: digital_decode_mode # DCAUTO
  label: Digital Decode Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"
- id: auto_standby # STBY15M
  label: Auto Standby
  kind: action
  params:
    - name: mode
      type: string
      description: "15M, 30M, 60M, OFF"
- id: video_aspect_ratio # VSASPNRM
  label: Video Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM, ASPFUL; ASPNRM: 4:3; ASPFUL: 16:9"
- id: hdmi_monitor_select # VSMONIAUTO
  label: HDMI Monitor Select
  kind: action
  params:
    - name: mode
      type: string
      description: "MONIAUTO, MONI1, MONI2"
- id: video_resolution # VSSC48P
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO"
- id: hdmi_video_resolution # VSSCH48P
  label: HDMI Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
- id: hdmi_audio_output # VSAUDIO AMP
  label: HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: "AMP, TV"
- id: video_processing_mode # VSVPMAUTO
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"
- id: vertical_stretch # VSVST ON
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: bass_set # PSBAS 50
  label: Bass Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -6 to +6(44 to 56)"
- id: treble_set # PSTRE 50
  label: Treble Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -6 to +6(44 to 56)"
- id: dialog_level_adjust # PSDIL ON
  label: Dialog Level Adjust
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: dialog_level_up # PSDIL UP
  label: Dialog Level Up
  kind: action
  params: []
- id: dialog_level_down # PSDIL DOWN
  label: Dialog Level Down
  kind: action
  params: []
- id: dialog_level_set # PSDIL 50
  label: Dialog Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "38 to 62 by ASCII , 50=0dB"
- id: subwoofer_level_adjust # PSSWL ON
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: subwoofer_level_up # PSSWL UP
  label: Subwoofer Level Up
  kind: action
  params:
    - name: subwoofer
      type: string
      description: "SWL, SWL2"
- id: subwoofer_level_down # PSSWL DOWN
  label: Subwoofer Level Down
  kind: action
  params:
    - name: subwoofer
      type: string
      description: "SWL, SWL2"
- id: subwoofer_level_set # PSSWL 50
  label: Subwoofer Level Set
  kind: action
  params:
    - name: subwoofer
      type: string
      description: "SWL, SWL2"
    - name: level
      type: integer
      description: "00,38 to 62 by ASCII , 50=0dB"
- id: cinema_eq # PSCINEMA EQ.ON
  label: Cinema EQ
  kind: action
  params:
    - name: state
      type: string
      description: "CINEMA EQ.ON, CINEMA EQ.OFF"
- id: surround_parameter_mode # PSMODE:MUSIC
  label: Surround Parameter Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC; GAME can change DOLBY PL2 & PL2x mode; PL can change ONLY DOLBY PL2 mode"
- id: loudness_management # PSLOM ON
  label: Loudness Management
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: front_height_output # PSFH:ON
  label: Front Height Output
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: speaker_output # PSSP:FW
  label: Speaker Output
  kind: action
  params:
    - name: output
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"
- id: height_gain # PSPHG LOW
  label: Height Gain
  kind: action
  params:
    - name: gain
      type: string
      description: "LOW, MID, HI"
- id: multeq_mode # PSMULTEQ:AUDYSSEY
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF; AUDYSSEY= Reference; BYP.LR= L/R Bypass"
- id: dynamic_eq # PSDYNEQ ON
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: reference_level_offset # PSREFLEV 0
  label: Reference Level Offset
  kind: action
  params:
    - name: level
      type: integer
      description: "0, 5, 10, 15"
- id: dynamic_volume # PSDYNVOL HEV
  label: Dynamic Volume
  kind: action
  params:
    - name: mode
      type: string
      description: "HEV, MED, LIT, OFF"
- id: audyssey_lfc # PSLFC ON
  label: Audyssey LFC
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: containment_amount_up # PSCNTAMT UP
  label: Containment Amount Up
  kind: action
  params: []
- id: containment_amount_down # PSCNTAMT DOWN
  label: Containment Amount Down
  kind: action
  params: []
- id: containment_amount_set # PSCNTAMT 01
  label: Containment Amount Set
  kind: action
  params:
    - name: amount
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 1 to 7 (01 to 07)"
- id: audyssey_dsx # PSDSX ONHW
  label: Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW, ONH, ONW, OFF"
- id: stage_width_up # PSSTW UP
  label: Stage Width Up
  kind: action
  params: []
- id: stage_width_down # PSSTW DOWN
  label: Stage Width Down
  kind: action
  params: []
- id: stage_width_set # PSSTW 50
  label: Stage Width Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
- id: stage_height_up # PSSTH UP
  label: Stage Height Up
  kind: action
  params: []
- id: stage_height_down # PSSTH DOWN
  label: Stage Height Down
  kind: action
  params: []
- id: stage_height_set # PSSTH 50
  label: Stage Height Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
- id: graphic_eq # PSGEQ ON
  label: Graphic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: dynamic_compression # PSDRC AUTO
  label: Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"
- id: bass_sync_up # PSBSC UP
  label: Bass Sync Up
  kind: action
  params: []
- id: bass_sync_down # PSBSC DOWN
  label: Bass Sync Down
  kind: action
  params: []
- id: bass_sync_set # PSBSC 10
  label: Bass Sync Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 16"
- id: dialogue_enhancer # PSDEH OFF
  label: Dialogue Enhancer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HIGH"
- id: lfe_up # LFE UP
  label: LFE Up
  kind: action
  params: []
- id: lfe_down # PSLFE DOWN
  label: LFE Down
  kind: action
  params: []
- id: lfe_set # PSLFE 10
  label: LFE Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB, 10=-10dB; AVR can be operated from 0 to -10"
- id: external_input_lfe_level # PSLFL 00
  label: External Input LFE Level
  kind: action
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15; When EXT.IN/7.1CH IN"
- id: effect_enable # PSEFF ON
  label: Effect Enable
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: effect_level_up # PSEFF UP
  label: Effect Level Up
  kind: action
  params: []
- id: effect_level_down # PSEFF DOWN
  label: Effect Level Down
  kind: action
  params: []
- id: effect_level_set # PSEFF 10
  label: Effect Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB, 10=10dB; AVR can be operated from 1 to 15"
- id: delay_up # PSDEL UP
  label: Delay Up
  kind: action
  params: []
- id: delay_down # PSDEL DOWN
  label: Delay Down
  kind: action
  params: []
- id: delay_set # PSDEL 000
  label: Delay Set
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: "000 to 999 by ASCII , 000=0ms, 300=300ms; AVR can be operated from 0 to 300; 0-60ms:3ms/Step Over 60ms:10ms/Step"
- id: panorama # PSPAN ON
  label: Panorama
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: dimension_up # PSDIM UP
  label: Dimension Up
  kind: action
  params: []
- id: dimension_down # PSDIM DOWN
  label: Dimension Down
  kind: action
  params: []
- id: dimension_set # PSDIM 00
  label: Dimension Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 6"
- id: center_width_up # PSCEN UP
  label: Center Width Up
  kind: action
  params: []
- id: center_width_down # PSCEN DOWN
  label: Center Width Down
  kind: action
  params: []
- id: center_width_set # PSCEN 07
  label: Center Width Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 7"
- id: center_image_up # PSCEI UP
  label: Center Image Up
  kind: action
  params: []
- id: center_image_down # PSCEI DOWN
  label: Center Image Down
  kind: action
  params: []
- id: center_image_set # PSCEI 10
  label: Center Image Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
- id: center_gain_up # PSCEG UP
  label: Center Gain Up
  kind: action
  params: []
- id: center_gain_down # PSCEG DOWN
  label: Center Gain Down
  kind: action
  params: []
- id: center_gain_set # PSCEG 10
  label: Center Gain Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
- id: center_spread # PSCES ON
  label: Center Spread
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: direct_stereo_subwoofer # PSSWR ON
  label: Direct Stereo Subwoofer
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF; DIRECT,STEREO(2ch) mode"
- id: room_size # PSRSZ S
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"
- id: audio_delay_up # PSDELAY UP
  label: Audio Delay Up
  kind: action
  params: []
- id: audio_delay_down # PSDELAY DOWN
  label: Audio Delay Down
  kind: action
  params: []
- id: audio_delay_set # PSDELAY 200
  label: Audio Delay Set
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: "000 to 999 by ASCII , 000=0ms, 200=200ms; AVR can be operated from 0 to 200"
- id: audio_restorer # PSRSTR OFF
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"
- id: front_speaker_select # PSFRONT SPA
  label: Front Speaker Select
  kind: action
  params:
    - name: speaker
      type: string
      description: "SPA, SPB, A+B"
- id: auro_matic_preset # PSAUROPR SMA
  label: Auro-Matic Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE; Auro-3D Upgrade only"
- id: auro_matic_strength_up # PSAUROST UP
  label: Auro-Matic Strength Up
  kind: action
  params: []
- id: auro_matic_strength_down # PSAUROST DOWN
  label: Auro-Matic Strength Down
  kind: action
  params: []
- id: auro_matic_strength_set # PSAUROST**
  label: Auro-Matic Strength Set
  kind: action
  params:
    - name: strength
      type: integer
      description: "00 to 99 by ASCII , 01=1, 10=10; AVR can be operated from 1 to 16; Auro-3D Upgrade only"
- id: contrast_up # PVCN UP
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down # PVCN DOWN
  label: Contrast Down
  kind: action
  params: []
- id: contrast_set # PVCN 050
  label: Contrast Set
  kind: action
  params:
    - name: level
      type: integer
      description: "000 to 100 by ASCII , 050=0; AVR can be operated from -50 to +50(000 to 100)"
- id: brightness_up # PVBR UP
  label: Brightness Up
  kind: action
  params: []
- id: brightness_down # PVBR DOWN
  label: Brightness Down
  kind: action
  params: []
- id: brightness_set # PVBR 050
  label: Brightness Set
  kind: action
  params:
    - name: level
      type: integer
      description: "000 to 100 by ASCII , 050=0; AVR can be operated from -50 to +50(000 to 100)"
- id: saturation_up # PVST UP
  label: Saturation Up
  kind: action
  params: []
- id: saturation_down # PVST DOWN
  label: Saturation Down
  kind: action
  params: []
- id: saturation_set # PVST 050
  label: Saturation Set
  kind: action
  params:
    - name: level
      type: integer
      description: "000 to 100 by ASCII , 050=0; AVR can be operated from -50 to +50(000 to 100)"
- id: hue_up # PVHUE UP
  label: Hue Up
  kind: action
  params: []
- id: hue_down # PVHUE DOWN
  label: Hue Down
  kind: action
  params: []
- id: hue_set # PVHUE 50
  label: Hue Set
  kind: action
  params:
    - name: level
      type: integer
      description: "44 to 56 by ASCII , 50=0; AVR can be operated from -6 to +6(44 to 56)"
- id: digital_noise_reduction # PVDNR OFF
  label: Digital Noise Reduction
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MID, HI"
- id: enhancer_up # PVENH UP
  label: Enhancer Up
  kind: action
  params: []
- id: enhancer_down # PVENH DOWN
  label: Enhancer Down
  kind: action
  params: []
- id: enhancer_set # PVENH 12
  label: Enhancer Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 12 by ASCII, 00=0; AVR can be operated from 0 to 12"
- id: zone2_follow_main_source # Z2SOURCE
  label: Zone2 Follow Main Source
  kind: action
  params: []
- id: zone2_quick_select # Z2QUICK1
  label: Zone2 Quick Select
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-5"
- id: zone2_quick_memory # Z2QUICK1 MEMORY
  label: Zone2 Quick Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-5"
- id: zone2_favorite # Z2FAVORITE1
  label: Zone2 Favorite
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4"
- id: zone2_favorite_memory # Z2FAVORITE1 MEMORY
  label: Zone2 Favorite Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4; FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"
- id: zone2_volume_set # Z280
  label: Zone2 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 98 by ASCII , 80=0dB, 00=---(MIN); 0.5dB step uses three ASCII characters"
- id: zone2_mute_on # Z2MUON
  label: Zone2 Mute On
  kind: action
  params: []
- id: zone2_mute_off # Z2MUOFF
  label: Zone2 Mute Off
  kind: action
  params: []
- id: zone2_channel_mode # Z2CSST
  label: Zone2 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone2_channel_volume_up # Z2CVFL UP
  label: Zone2 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone2_channel_volume_down # Z2CVFL DOWN
  label: Zone2 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone2_channel_volume_set # Z2CVFL 50
  label: Zone2 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: integer
      description: "38 to 62 by ASCII , 50=0dB"
- id: zone2_hpf # Z2HPFON
  label: Zone2 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_bass_up # Z2PSBAS UP
  label: Zone2 Bass Up
  kind: action
  params: []
- id: zone2_bass_down # Z2PSBAS DOWN
  label: Zone2 Bass Down
  kind: action
  params: []
- id: zone2_bass_set # Z2PSBAS 50
  label: Zone2 Bass Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: zone2_treble_up # Z2PSTRE UP
  label: Zone2 Treble Up
  kind: action
  params: []
- id: zone2_treble_down # Z2PSTRE DOWN
  label: Zone2 Treble Down
  kind: action
  params: []
- id: zone2_treble_set # Z2PSTRE 50
  label: Zone2 Treble Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: zone2_hdmi_audio_output # Z2HDA THR
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: "THR, PCM"
- id: zone2_sleep_timer # Z2SLP120
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII , 010=10min; OFF"
- id: zone2_auto_standby # Z2STBY2H
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: mode
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone3_follow_main_source # Z3SOURCE
  label: Zone3 Follow Main Source
  kind: action
  params: []
- id: zone3_quick_select # Z3QUICK1
  label: Zone3 Quick Select
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-5"
- id: zone3_quick_memory # Z3QUICK1 MEMORY
  label: Zone3 Quick Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-5"
- id: zone3_favorite # Z3FAVORITE1
  label: Zone3 Favorite
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4"
- id: zone3_favorite_memory # Z3FAVORITE1 MEMORY
  label: Zone3 Favorite Memory
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-4; FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY"
- id: zone3_volume_set # Z380
  label: Zone3 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 98 by ASCII , 80=0dB, 00=---(MIN); 0.5dB step uses three ASCII characters"
- id: zone3_mute_on # Z3MUON
  label: Zone3 Mute On
  kind: action
  params: []
- id: zone3_mute_off # Z3MUOFF
  label: Zone3 Mute Off
  kind: action
  params: []
- id: zone3_channel_mode # Z3CSST
  label: Zone3 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone3_channel_volume_up # Z3CVFL UP
  label: Zone3 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone3_channel_volume_down # Z3CVFL DOWN
  label: Zone3 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone3_channel_volume_set # Z3CVFL 50
  label: Zone3 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: integer
      description: "38 to 62 by ASCII , 50=0dB"
- id: zone3_hpf # Z3HPFON
  label: Zone3 HPF
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone3_bass_up # Z3PSBAS UP
  label: Zone3 Bass Up
  kind: action
  params: []
- id: zone3_bass_down # Z3PSBAS DOWN
  label: Zone3 Bass Down
  kind: action
  params: []
- id: zone3_bass_set # Z3PSBAS 50
  label: Zone3 Bass Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: zone3_treble_up # Z3PSTRE UP
  label: Zone3 Treble Up
  kind: action
  params: []
- id: zone3_treble_down # Z3PSTRE DOWN
  label: Zone3 Treble Down
  kind: action
  params: []
- id: zone3_treble_set # Z3PSTRE 50
  label: Zone3 Treble Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: zone3_sleep_timer # Z3SLP120
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII , 010=10min; OFF"
- id: zone3_auto_standby # Z3STBY2H
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: mode
      type: string
      description: "2H, 4H, 8H, OFF"
- id: tuner_preset_query # TPAN?
  label: Tuner Preset Query
  kind: action
  params: []
- id: tuner_preset_memory_set # TPANMEM01
  label: Tuner Preset Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56 01=CH01,56=CH56"
- id: hd_radio_frequency_set # TFHD105000
  label: HD Radio Frequency Set
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.)"
- id: hd_radio_analog_select # TFHDMC2
  label: HD Radio Analog Select
  kind: action
  params: [] # HDMC*(1 digit): Multi Cast 1～8, Analog 0
- id: hd_radio_frequency_multicast_set # TFHD008750MC5
  label: HD Radio Frequency Multicast Set
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.)"
    - name: channel
      type: integer
      description: "Multi Cast 1～8, Analog 0"
- id: hd_radio_preset_up # TPHDUP
  label: HD Radio Preset Up
  kind: action
  params: []
- id: hd_radio_preset_down # TPHDDOWN
  label: HD Radio Preset Down
  kind: action
  params: []
- id: hd_radio_preset_set # TPHD01
  label: HD Radio Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56 01=CH01,56=CH56"
- id: hd_radio_preset_memory # TPHDMEM
  label: HD Radio Preset Memory
  kind: action
  params: []
- id: hd_radio_preset_memory_set # TPHDMEM01
  label: HD Radio Preset Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56 01=CH01,56=CH56"
- id: hd_radio_band # TMHDAM
  label: HD Radio Band
  kind: action
  params:
    - name: band
      type: string
      description: "HDAM, HDFM"
- id: hd_radio_tuning_mode # TMHDAUTOHD
  label: HD Radio Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"
- id: net_audio_cursor_up # NS90
  label: Net Audio Cursor Up
  kind: action
  params: []
- id: net_audio_cursor_down # NS91
  label: Net Audio Cursor Down
  kind: action
  params: []
- id: net_audio_cursor_left # NS92
  label: Net Audio Cursor Left
  kind: action
  params: []
- id: net_audio_cursor_right # NS93
  label: Net Audio Cursor Right
  kind: action
  params: []
- id: net_audio_enter # NS94
  label: Net Audio Enter
  kind: action
  params: []
- id: net_audio_play # NS9A
  label: Net Audio Play
  kind: action
  params: []
- id: net_audio_pause # NS9B
  label: Net Audio Pause
  kind: action
  params: []
- id: net_audio_stop # NS9C
  label: Net Audio Stop
  kind: action
  params: []
- id: net_audio_skip_plus # NS9D
  label: Net Audio Skip Plus
  kind: action
  params: []
- id: net_audio_skip_minus # NS9E
  label: Net Audio Skip Minus
  kind: action
  params: []
- id: net_audio_search_plus # NS9F
  label: Net Audio Search Plus
  kind: action
  params: []
- id: net_audio_search_minus # NS9G
  label: Net Audio Search Minus
  kind: action
  params: []
- id: net_audio_repeat # NS9H
  label: Net Audio Repeat
  kind: action
  params:
    - name: mode
      type: string
      description: "9H, 9I, 9J; 9H: Repeat One; 9I: Repeat All; 9J: Repeat Off"
- id: net_audio_random_on # NS9K
  label: Net Audio Random On
  kind: action
  params: []
- id: net_audio_random_off # NS9M
  label: Net Audio Random Off
  kind: action
  params: []
- id: ipod_mode_toggle # NS9W
  label: iPod Mode Toggle
  kind: action
  params: []
- id: net_audio_page_next # NS9X
  label: Net Audio Page Next
  kind: action
  params: []
- id: net_audio_page_previous # NS9Y
  label: Net Audio Page Previous
  kind: action
  params: []
- id: net_audio_search_stop # NS9Z
  label: Net Audio Search Stop
  kind: action
  params: []
- id: net_audio_repeat_toggle # NSRPT
  label: Net Audio Repeat Toggle
  kind: action
  params: []
- id: net_audio_random_toggle # NSRND
  label: Net Audio Random Toggle
  kind: action
  params: []
- id: net_audio_favorite_add # NSFV MEM
  label: Net Audio Favorite Add
  kind: action
  params: []
- id: onscreen_ascii_list_refresh # NSA0
  label: Onscreen ASCII List Refresh
  kind: action
  params: []
- id: onscreen_utf8_list_refresh # NSE0
  label: Onscreen UTF-8 List Refresh
  kind: action
  params: []
- id: system_cursor_up # MNCUP
  label: System Cursor Up
  kind: action
  params: []
- id: system_cursor_down # MNCDN
  label: System Cursor Down
  kind: action
  params: []
- id: system_cursor_left # MNCLT
  label: System Cursor Left
  kind: action
  params: []
- id: system_cursor_right # MNCRT
  label: System Cursor Right
  kind: action
  params: []
- id: system_enter # MNENT
  label: System Enter
  kind: action
  params: []
- id: system_return # MNRTN
  label: System Return
  kind: action
  params: []
- id: system_option # MNOPT
  label: System Option
  kind: action
  params: []
- id: system_info # MNINF
  label: System Info
  kind: action
  params: []
- id: channel_level_menu_toggle # MNCHL
  label: Channel Level Menu Toggle
  kind: action
  params: []
- id: setup_menu # MNMEN ON
  label: Setup Menu
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: insta_prevue # MNPRV ON
  label: InstaPrevue
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: all_zone_stereo # MNZST ON
  label: All Zone Stereo
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: remote_lock_on # SYREMOTE LOCK ON
  label: Remote Lock On
  kind: action
  params: []
- id: remote_lock_off # REMOTE LOCK OFF
  label: Remote Lock Off
  kind: action
  params: []
- id: panel_lock_on # SYPANEL LOCK ON
  label: Panel Lock On
  kind: action
  params: []
- id: panel_volume_lock_on # SYPANEL+V LOCK ON
  label: Panel Volume Lock On
  kind: action
  params: []
- id: panel_lock_off # SYPANEL LOCK OFF
  label: Panel Lock Off
  kind: action
  params: []
- id: trigger_on # TR1 ON
  label: Trigger On
  kind: action
  params:
    - name: trigger
      type: integer
      description: "1, 2"
- id: trigger_off # TR1 OFF
  label: Trigger Off
  kind: action
  params:
    - name: trigger
      type: integer
      description: "1, 2"
- id: upgrade_id_display # UGIDN
  label: Upgrade ID Display
  kind: action
  params: []
- id: remote_maintenance_start # RM STA
  label: Remote Maintenance Start
  kind: action
  params: []
- id: remote_maintenance_end # RM END
  label: Remote Maintenance End
  kind: action
  params: []
- id: display_dimmer # DIM BRI
  label: Display Dimmer
  kind: action
  params:
    - name: mode
      type: string
      description: "BRI, DIM, DAR, OFF"
- id: display_dimmer_toggle # DIM SEL
  label: Display Dimmer Toggle
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [PWON, PWSTANDBY]
  query_command: "PW?"
- id: master_volume_status
  label: Master Volume Status
  type: string
  description: "MV*** e.g. MV80 for 0dB"
  query_command: "MV?"
- id: mute_status
  label: Mute Status
  type: enum
  values: [MUON, MUOFF]
  query_command: "MU?"
- id: input_status
  label: Input Status
  type: string
  description: "SI*** e.g. SIDVD"
  query_command: "SI?"
- id: surround_status
  label: Surround Mode Status
  type: string
  description: "MS*** e.g. MSSTEREO"
  query_command: "MS?"
- id: main_zone_status
  label: Main Zone Status
  type: enum
  values: [ZMON, ZMOFF]
  query_command: "ZM?"
- id: zone2_status
  label: Zone2 Status
  type: enum
  values: [Z2ON, Z2OFF]
  query_command: "Z2?"
- id: zone3_status
  label: Zone3 Status
  type: enum
  values: [Z3ON, Z3OFF]
  query_command: "Z3?"
- id: tuner_status
  label: Tuner Status
  type: string
  description: "TFAN*** frequency or TPAN*** preset"
  query_command: "TFAN?"
- id: hd_radio_status
  label: HD Radio Status
  type: string
  description: "HDST NAME, HDSIG LEV, HDMLT CURRCH, HDTITLE, HDARTIST, HDALBUM, etc."
  query_command: "HD?"
- id: channel_volume_status
  label: Channel Volume Status
  type: string
  description: "CVFL 50, CVFR 50, etc. per channel"
  query_command: "CV?"
- id: record_source_status
  label: Record Source Status
  type: string
  description: "SR status; if ZONE2 mode is selected, Z2 status returns"
  query_command: "SR?"
- id: digital_input_status
  label: Digital Input Status
  type: string
  description: "SD status"
  query_command: "SD?"
- id: digital_decode_status
  label: Digital Decode Status
  type: string
  description: "DC status"
  query_command: "DC?"
- id: video_select_status
  label: Video Select Status
  type: string
  description: "SVDVD, SVON"
  query_command: "SV?"
- id: sleep_timer_status
  label: Sleep Timer Status
  type: string
  description: "SLP status"
  query_command: "SLP?"
- id: auto_standby_status
  label: Auto Standby Status
  type: string
  description: "STBY status"
  query_command: "STBY?"
- id: eco_mode_status
  label: ECO Mode Status
  type: string
  description: "ECO status"
  query_command: "ECO?"
- id: quick_select_status
  label: Quick Select Status
  type: string
  description: "MSQUICK status"
  query_command: "MSQUICK ?"
- id: video_aspect_status
  label: Video Aspect Status
  type: string
  description: "VSASPECT status"
  query_command: "VSASP ?"
- id: hdmi_monitor_status
  label: HDMI Monitor Status
  type: string
  description: "VSMONI status"
  query_command: "VSMONI ?"
- id: video_resolution_status
  label: Video Resolution Status
  type: string
  description: "VSSC status"
  query_command: "VSSC ?"
- id: hdmi_video_resolution_status
  label: HDMI Video Resolution Status
  type: string
  description: "VSSCH status"
  query_command: "VSSCH ?"
- id: hdmi_audio_output_status
  label: HDMI Audio Output Status
  type: string
  description: "VSAUDIO status"
  query_command: "VSAUDIO ?"
- id: video_processing_status
  label: Video Processing Status
  type: string
  description: "VSVPM status"
  query_command: "VSVPM ?"
- id: vertical_stretch_status
  label: Vertical Stretch Status
  type: string
  description: "VSVST status"
  query_command: "VSVST ?"
- id: tone_control_status
  label: Tone Control Status
  type: string
  description: "PSTONE CONTROL status"
  query_command: "PSTONE CTRL ?"
- id: bass_status
  label: Bass Status
  type: string
  description: "PSBAS status"
  query_command: "PSBAS ?"
- id: treble_status
  label: Treble Status
  type: string
  description: "PSTRE status"
  query_command: "PSTRE ?"
- id: dialog_level_status
  label: Dialog Level Status
  type: string
  description: "PSDIL ON, PSDIL 50"
  query_command: "PSDIL ?"
- id: subwoofer_level_status
  label: Subwoofer Level Status
  type: string
  description: "PSSWL ON, PSSWL 50, PSSWL2 50; PSSWL2 is not output if SW2 is none"
  query_command: "PSSWL ?"
- id: cinema_eq_status
  label: Cinema EQ Status
  type: string
  description: "PSCINEMA EQ. status"
  query_command: "PSCINEMA EQ. ?"
- id: surround_parameter_mode_status
  label: Surround Parameter Mode Status
  type: string
  description: "PSMODE: status; HEIGHT is EVENT only"
  query_command: "PSMODE: ?"
- id: loudness_management_status
  label: Loudness Management Status
  type: string
  description: "PSLOM status"
  query_command: "PSLOM ?"
- id: front_height_output_status
  label: Front Height Output Status
  type: string
  description: "PSFH: status"
  query_command: "PSFH: ?"
- id: speaker_output_status
  label: Speaker Output Status
  type: string
  description: "PSSP: status"
  query_command: "PSSP: ?"
- id: height_gain_status
  label: Height Gain Status
  type: string
  description: "PSPHG status"
  query_command: "PSPHG ?"
- id: multeq_status
  label: MultEQ Status
  type: string
  description: "PSMULTEQ: status"
  query_command: "PSMULTEQ: ?"
- id: dynamic_eq_status
  label: Dynamic EQ Status
  type: string
  description: "PSDYNEQ status"
  query_command: "PSDYNEQ ?"
- id: reference_level_offset_status
  label: Reference Level Offset Status
  type: string
  description: "PSREFLEV status"
  query_command: "PSREFLEV ?"
- id: dynamic_volume_status
  label: Dynamic Volume Status
  type: string
  description: "PSDYNVOL status"
  query_command: "PSDYNVOL ?"
- id: audyssey_lfc_status
  label: Audyssey LFC Status
  type: string
  description: "Audyssey LFC status"
  query_command: "PSLFC ?"
- id: containment_amount_status
  label: Containment Amount Status
  type: string
  description: "PSCNTAMT status"
  query_command: "PSCNTAMT ?"
- id: audyssey_dsx_status
  label: Audyssey DSX Status
  type: string
  description: "PSDSX status"
  query_command: "PSDSX ?"
- id: stage_width_status
  label: Stage Width Status
  type: string
  description: "PSSTW status"
  query_command: "PSSTW ?"
- id: stage_height_status
  label: Stage Height Status
  type: string
  description: "PSSTH status"
  query_command: "PSSTH ?"
- id: graphic_eq_status
  label: Graphic EQ Status
  type: string
  description: "Graphic EQ status"
  query_command: "PSGEQ ?"
- id: dynamic_compression_status
  label: Dynamic Compression Status
  type: string
  description: "PSDRC status"
  query_command: "PSDRC ?"
- id: bass_sync_status
  label: Bass Sync Status
  type: string
  description: "PSBSC status"
  query_command: "PSBSC ?"
- id: dialogue_enhancer_status
  label: Dialogue Enhancer Status
  type: string
  description: "PSDEH status"
  query_command: "PSDEH ?"
- id: lfe_status
  label: LFE Status
  type: string
  description: "PSLFE status"
  query_command: "PSLFE ?"
- id: external_input_lfe_status
  label: External Input LFE Status
  type: string
  description: "PSLFL status"
  query_command: "PSLFL ?"
- id: effect_status
  label: Effect Status
  type: string
  description: "PSEFF ON, PSEFF 10"
  query_command: "PSEFF ?"
- id: delay_status
  label: Delay Status
  type: string
  description: "PSDEL status"
  query_command: "PSDEL ?"
- id: panorama_status
  label: Panorama Status
  type: string
  description: "PSPAN status"
  query_command: "PSPAN ?"
- id: dimension_status
  label: Dimension Status
  type: string
  description: "PSDIM status"
  query_command: "PSDIM ?"
- id: center_width_status
  label: Center Width Status
  type: string
  description: "PSCEN status"
  query_command: "PSCEN ?"
- id: center_image_status
  label: Center Image Status
  type: string
  description: "PSCEI status"
  query_command: "PSCEI ?"
- id: center_gain_status
  label: Center Gain Status
  type: string
  description: "PSCEG status"
  query_command: "PSCEG ?"
- id: center_spread_status
  label: Center Spread Status
  type: string
  description: "PSCES status"
  query_command: "PSCES ?"
- id: direct_stereo_subwoofer_status
  label: Direct Stereo Subwoofer Status
  type: string
  description: "PSSWR status"
  query_command: "PSSWR ?"
- id: room_size_status
  label: Room Size Status
  type: string
  description: "PSRSZ status"
  query_command: "PSRSZ ?"
- id: audio_delay_status
  label: Audio Delay Status
  type: string
  description: "PSDELAY status"
  query_command: "PSDELAY ?"
- id: audio_restorer_status
  label: Audio Restorer Status
  type: string
  description: "PSRSTR status"
  query_command: "PSRSTR ?"
- id: front_speaker_status
  label: Front Speaker Status
  type: string
  description: "PSFRONT status"
  query_command: "PSFRONT?"
- id: auro_matic_preset_status
  label: Auro-Matic Preset Status
  type: string
  description: "PSAUROPR status"
  query_command: "PSAUROPR ?"
- id: auro_matic_strength_status
  label: Auro-Matic Strength Status
  type: string
  description: "PSAUROST status"
  query_command: "PSAUROST ?"
- id: picture_mode_status
  label: Picture Mode Status
  type: string
  description: "PV status"
  query_command: "PV?"
- id: contrast_status
  label: Contrast Status
  type: string
  description: "PVCN 050"
  query_command: "PVCN ?"
- id: brightness_status
  label: Brightness Status
  type: string
  description: "PVBR 050"
  query_command: "PVBR ?"
- id: saturation_status
  label: Saturation Status
  type: string
  description: "PVST 050"
  query_command: "PVST ?"
- id: hue_status
  label: Hue Status
  type: string
  description: "PVHUE 50"
  query_command: "PVHUE ?"
- id: digital_noise_reduction_status
  label: Digital Noise Reduction Status
  type: string
  description: "PVDNR status"
  query_command: "PVDNR ?"
- id: enhancer_status
  label: Enhancer Status
  type: string
  description: "PVENH status"
  query_command: "PVENH ?"
- id: zone2_quick_status
  label: Zone2 Quick Status
  type: string
  description: "Z2QUICK status"
  query_command: "Z2QUICK ?"
- id: zone2_mute_status
  label: Zone2 Mute Status
  type: enum
  values: [Z2MUON, Z2MUOFF]
  query_command: "Z2MU?"
- id: zone2_channel_mode_status
  label: Zone2 Channel Mode Status
  type: enum
  values: [Z2CSST, Z2CSMONO]
  query_command: "Z2CS?"
- id: zone2_channel_volume_status
  label: Zone2 Channel Volume Status
  type: string
  description: "Z2CVFL 50, Z2CVFR 50"
  query_command: "Z2CV?"
- id: zone2_hpf_status
  label: Zone2 HPF Status
  type: enum
  values: [Z2HPFON, Z2HPFOFF]
  query_command: "Z2HPF?"
- id: zone2_bass_status
  label: Zone2 Bass Status
  type: string
  description: "Z2PSBAS status"
  query_command: "Z2PSBAS ?"
- id: zone2_treble_status
  label: Zone2 Treble Status
  type: string
  description: "Z2PSTRE status"
  query_command: "Z2PSTRE ?"
- id: zone2_hdmi_audio_status
  label: Zone2 HDMI Audio Status
  type: string
  description: "Z2HDA THR, Z2HDA PCM"
  query_command: "Z2HDA?"
- id: zone2_sleep_timer_status
  label: Zone2 Sleep Timer Status
  type: string
  description: "Z2SLP status"
  query_command: "Z2SLP?"
- id: zone2_auto_standby_status
  label: Zone2 Auto Standby Status
  type: string
  description: "Z2STBY status"
  query_command: "Z2STBY?"
- id: zone3_quick_status
  label: Zone3 Quick Status
  type: string
  description: "Z3QUICK status"
  query_command: "Z3QUICK ?"
- id: zone3_mute_status
  label: Zone3 Mute Status
  type: enum
  values: [Z3MUON, Z3MUOFF]
  query_command: "Z3MU?"
- id: zone3_channel_mode_status
  label: Zone3 Channel Mode Status
  type: enum
  values: [Z3CSST, Z3CSMONO]
  query_command: "Z3CS?"
- id: zone3_channel_volume_status
  label: Zone3 Channel Volume Status
  type: string
  description: "Z3CVFL 50, Z3CVFR 50"
  query_command: "Z3CV?"
- id: zone3_hpf_status
  label: Zone3 HPF Status
  type: enum
  values: [Z3HPFON, Z3HPFOFF]
  query_command: "Z3HPF?"
- id: zone3_bass_status
  label: Zone3 Bass Status
  type: string
  description: "Z3PSBAS status"
  query_command: "Z3PSBAS ?"
- id: zone3_treble_status
  label: Zone3 Treble Status
  type: string
  description: "Z3PSTRE status"
  query_command: "Z3PSTRE ?"
- id: zone3_sleep_timer_status
  label: Zone3 Sleep Timer Status
  type: string
  description: "Z3SLP status"
  query_command: "Z3SLP?"
- id: zone3_auto_standby_status
  label: Zone3 Auto Standby Status
  type: string
  description: "Z3STBY status"
  query_command: "Z3STBY?"
- id: tuner_station_name_status
  label: Tuner Station Name Status
  type: string
  description: "RDS Station Name (EU,AP Only)"
  query_command: "TFANNAME?"
- id: tuner_band_mode_status
  label: Tuner Band Mode Status
  type: string
  description: "TM status"
  query_command: "TMAN?"
- id: hd_radio_frequency_status
  label: HD Radio Frequency Status
  type: string
  description: "TFHD status"
  query_command: "TFHD?"
- id: hd_radio_preset_status
  label: HD Radio Preset Status
  type: string
  description: "TPHD status"
  query_command: "TPHD?"
- id: hd_radio_band_mode_status
  label: HD Radio Band Mode Status
  type: string
  description: "TMHD status"
  query_command: "TMHD?"
- id: net_audio_preset_name_status
  label: Net Audio Preset Name Status
  type: string
  description: "Net Audio Preset Name status（UTF-8）; 00-35(2014 AVR); 20 digits; except Bluetooth, USB/iPod"
  query_command: "NSH"
- id: onscreen_ascii_status
  label: Onscreen ASCII Status
  type: string
  description: "ASCII CODE Character; MAX96byte; NSA0-NSA8; _:Null; ?: Don't Care; flag byte carries Playable, Directory, CURSOR SELECT, Picture"
  query_command: "NSA"
- id: onscreen_utf8_status
  label: Onscreen UTF-8 Status
  type: string
  description: "UTF-8 CODE Character; MAX96byte; NSE0-NSE8; _:Null; ?: Don't Care; flag byte carries Playable, Directory, CURSOR SELECT, Picture"
  query_command: "NSE"
- id: setup_menu_status
  label: Setup Menu Status
  type: enum
  values: [MNMEN ON, MNMEN OFF]
  query_command: "MNMEN?"
- id: insta_prevue_status
  label: InstaPrevue Status
  type: enum
  values: [MNPRV ON, MNPRV OFF, MNPRV NG]
  query_command: "MNPRV?"
- id: all_zone_stereo_status
  label: All Zone Stereo Status
  type: enum
  values: [MNZST ON, MNZST OFF]
  query_command: "MNZST?"
- id: trigger_status
  label: Trigger Status
  type: string
  description: "TR1 ON, TR1 OFF, TR2 ON, TR2 OFF"
  query_command: "TR?"
- id: remote_maintenance_status
  label: Remote Maintenance Status
  type: enum
  values: [RM ON, RM OFF]
  query_command: "RM ?"
- id: display_dimmer_status
  label: Display Dimmer Status
  type: string
  description: "DIM status"
  query_command: "DIM ?"
```

## Variables
```yaml
# UNRESOLVED: many setup/parameter commands exist but variable mapping not fully enumerated
```

## Events
```yaml
# The device sends EVENT messages when state changes:
# - Same format as COMMAND
# - EVENT sent within 5 seconds of state change
# - RESPONSE sent within 200ms of receiving request command
# UNRESOLVED: complete unsolicited event list not enumerated in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: wait 1 second after PWON command before sending next command
<!-- UNRESOLVED: no explicit safety warnings in source beyond timing note -->
```

## Notes
- Commands sent with 50ms+ minimum interval
- RESPONSE within 200ms of request, EVENT within 5 seconds of state change
- ASCII codes 0x20-0x7F only; CR (0x0D) as pause separator
- Half duplex on both RS-232 and Ethernet
- Max data length: 135 bytes per message
- Volume 0.5dB steps use 3 ASCII characters (e.g. MV805 for +0.5dB)
- Power on requires 1 second wait before next command
- Channel volume and surround mode change simultaneously with input source changes
- UNRESOLVED: authentication or login requirements on TCP (Telnet) or RS-232
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:01:26.375Z
last_checked_at: 2026-10-07T13:29:25.917Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:29:25.917Z
matched_actions: 360
action_count: 360
confidence: medium
summary: "All 360 action units match source commands with correct shapes and transport; coverage near-complete; source is a generic Denon/Marantz protocol guide not naming NR1710. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "network authentication (none stated in source)"
- "many setup/parameter commands exist but variable mapping not fully enumerated"
- "complete unsolicited event list not enumerated in source"
- "no explicit multi-step macros documented"
- "no explicit safety warnings in source beyond timing note"
- "authentication or login requirements on TCP (Telnet) or RS-232"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
