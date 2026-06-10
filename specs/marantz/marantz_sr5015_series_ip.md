---
spec_id: admin/marantz-sr5015-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR5015 Series Control Spec"
manufacturer: Marantz
model_family: SR5015
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR5015
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:15:27.640Z
last_checked_at: 2026-06-09T19:19:22.256Z
generated_at: 2026-06-09T19:19:22.256Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PSSWL2 UP"
  - "PSSWL2 DOWN"
  - "PSSWL2 {value}"
  - "HD?"
  - "exact firmware versions compatible not stated"
  - "some surround modes marked per-model availability; full SR5015-specific subset not documented"
  - "no explicit multi-step macro sequences in source"
  - "source does not describe additional safety interlocks beyond command timing"
  - "firmware version compatibility not stated"
  - "exact SR5015-specific surround mode subset not documented (many modes listed with per-model availability markers)"
  - "REC SELECT (SR) command full parameter list shared with SI but table incomplete"
  - "NS onscreen display (NSA/NSE) binary flag byte encoding partially documented"
  - "HD Radio detailed metadata response format partially documented"
verification:
  verdict: verified
  checked_at: 2026-06-09T19:19:22.256Z
  matched_actions: 283
  action_count: 283
  confidence: medium
  summary: "All 283 spec actions matched verbatim in the source; only 4 source commands not covered (PSSWL2 UP/DOWN/set and HD? status query), below the 5-extra threshold for short. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR5015 Series Control Spec

## Summary
AV receiver supporting RS-232C and TCP/IP (telnet) control via ASCII command protocol. Commands are 2-character codes with ASCII parameters, terminated by CR (0x0D). Covers power, volume, input selection, surround modes, multi-zone (Zone 2/3), tuner, online music/USB, and system control. Protocol version 06.

<!-- UNRESOLVED: exact firmware versions compatible not stated -->
<!-- UNRESOLVED: some surround modes marked per-model availability; full SR5015-specific subset not documented -->

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
traits:
  - powerable     # PW command: power on/standby
  - queryable     # ? parameter returns status for most commands
  - routable      # SI command: input source selection
  - levelable     # MV/CV: volume and channel level control
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PWON
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: PWSTANDBY
    params: []

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
    label: Set Master Volume
    kind: action
    command: MV{value}
    params:
      - name: value
        type: string
        description: "Volume as ASCII 00-98, 80=0dB, 00=---(MIN). 3-char for 0.5dB steps (e.g. 805=+0.5dB)"

  - id: mute_on
    label: Mute On
    kind: action
    command: MUON
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: MUOFF
    params: []

  - id: select_input
    label: Select Input Source
    kind: action
    command: SI{source}
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
        description: Input source name

  - id: surround_mode
    label: Select Surround Mode
    kind: action
    command: MS{mode}
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
        description: Surround mode name

  - id: main_zone_on
    label: Main Zone On
    kind: action
    command: ZMON
    params: []

  - id: main_zone_off
    label: Main Zone Off
    kind: action
    command: ZMOFF
    params: []

  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: CV{channel} UP
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
        description: Speaker channel abbreviation

  - id: channel_volume_down
    label: Channel Volume Down
    kind: action
    command: CV{channel} DOWN
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
        description: Speaker channel abbreviation

  - id: channel_volume_set
    label: Set Channel Volume
    kind: action
    command: CV{channel} {value}
    params:
      - name: channel
        type: string
        description: Speaker channel abbreviation (FL, FR, C, SW, etc.)
      - name: value
        type: string
        description: "Level 38-62 by ASCII, 50=0dB"

  - id: channel_volume_reset
    label: Reset All Channel Levels
    kind: action
    command: CVZRL
    params: []

  - id: input_mode_auto
    label: Set Input Mode Auto
    kind: action
    command: SDAUTO
    params: []

  - id: input_mode_hdmi
    label: Set Input Mode HDMI
    kind: action
    command: SDHDMI
    params: []

  - id: input_mode_digital
    label: Set Input Mode Digital
    kind: action
    command: SDDIGITAL
    params: []

  - id: input_mode_analog
    label: Set Input Mode Analog
    kind: action
    command: SDANALOG
    params: []

  - id: input_mode_ext_in
    label: Set External In Mode
    kind: action
    command: SDEXT.IN
    params: []

  - id: input_mode_71in
    label: Set 7.1CH In Mode
    kind: action
    command: SD7.1IN
    params: []

  - id: digital_input_auto
    label: Set Digital Input Auto
    kind: action
    command: DCAUTO
    params: []

  - id: digital_input_pcm
    label: Set Digital Input PCM
    kind: action
    command: DCPCM
    params: []

  - id: digital_input_dts
    label: Set Digital Input DTS
    kind: action
    command: DCDTS
    params: []

  - id: video_select
    label: Video Select Source
    kind: action
    command: SV{source}
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
          - ON
          - OFF
        description: Video source name, SOURCE=cancel, ON/OFF=toggle video select

  - id: sleep_timer
    label: Set Sleep Timer
    kind: action
    command: SLP{value}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 minutes by ASCII (010=10min)"

  - id: auto_standby
    label: Set Auto Standby
    kind: action
    command: STBY{value}
    params:
      - name: value
        type: enum
        values:
          - 15M
          - 30M
          - 60M
          - OFF
        description: Auto standby timer

  - id: eco_mode
    label: Set ECO Mode
    kind: action
    command: ECO{value}
    params:
      - name: value
        type: enum
        values:
          - ON
          - AUTO
          - OFF

  - id: video_aspect_normal
    label: Set Aspect Ratio 4:3
    kind: action
    command: VSASPNRM
    params: []

  - id: video_aspect_full
    label: Set Aspect Ratio 16:9
    kind: action
    command: VSASPFUL
    params: []

  - id: video_monitor_auto
    label: Set HDMI Monitor Auto
    kind: action
    command: VSMONIAUTO
    params: []

  - id: video_monitor_out1
    label: Set HDMI Monitor Out 1
    kind: action
    command: VSMONI1
    params: []

  - id: video_monitor_out2
    label: Set HDMI Monitor Out 2
    kind: action
    command: VSMONI2
    params: []

  - id: video_resolution_set
    label: Set Video Resolution
    kind: action
    command: VSSC{value}
    params:
      - name: value
        type: enum
        values:
          - 48P
          - 10I
          - 72P
          - 10P
          - 10P24
          - 4K
          - 4KF
          - AUTO
        description: Resolution preset (analogue output)

  - id: video_resolution_hdmi_set
    label: Set HDMI Video Resolution
    kind: action
    command: VSSCH{value}
    params:
      - name: value
        type: enum
        values:
          - 48P
          - 10I
          - 72P
          - 10P
          - 10P24
          - 4K
          - 4KF
          - AUTO
        description: Resolution preset (HDMI output)

  - id: hdmi_audio_amp
    label: Set HDMI Audio to AMP
    kind: action
    command: VSAUDIO AMP
    params: []

  - id: hdmi_audio_tv
    label: Set HDMI Audio to TV
    kind: action
    command: VSAUDIO TV
    params: []

  - id: video_processing_mode
    label: Set Video Processing Mode
    kind: action
    command: VSVPM{value}
    params:
      - name: value
        type: enum
        values:
          - AUTO
          - GAME
          - MOVI

  - id: vertical_stretch_on
    label: Vertical Stretch On
    kind: action
    command: VSVST ON
    params: []

  - id: vertical_stretch_off
    label: Vertical Stretch Off
    kind: action
    command: VSVST OFF
    params: []

  - id: tone_control_on
    label: Tone Control On
    kind: action
    command: PSTONE CTRL ON
    params: []

  - id: tone_control_off
    label: Tone Control Off
    kind: action
    command: PSTONE CTRL OFF
    params: []

  - id: bass_up
    label: Bass Up
    kind: action
    command: PSBAS UP
    params: []

  - id: bass_down
    label: Bass Down
    kind: action
    command: PSBAS DOWN
    params: []

  - id: bass_set
    label: Set Bass Level
    kind: action
    command: PSBAS {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB, AVR range -6 to +6 (44 to 56)"

  - id: treble_up
    label: Treble Up
    kind: action
    command: PSTRE UP
    params: []

  - id: treble_down
    label: Treble Down
    kind: action
    command: PSTRE DOWN
    params: []

  - id: treble_set
    label: Set Treble Level
    kind: action
    command: PSTRE {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB, AVR range -6 to +6 (44 to 56)"

  - id: subwoofer_level_on
    label: Subwoofer Level Adjust On
    kind: action
    command: PSSWL ON
    params: []

  - id: subwoofer_level_off
    label: Subwoofer Level Adjust Off
    kind: action
    command: PSSWL OFF
    params: []

  - id: subwoofer_level_up
    label: Subwoofer Level Up
    kind: action
    command: PSSWL UP
    params: []

  - id: subwoofer_level_down
    label: Subwoofer Level Down
    kind: action
    command: PSSWL DOWN
    params: []

  - id: subwoofer_level_set
    label: Set Subwoofer Level
    kind: action
    command: PSSWL {value}
    params:
      - name: value
        type: string
        description: "00,38-62 by ASCII, 50=0dB"

  - id: cinema_eq_on
    label: Cinema EQ On
    kind: action
    command: PSCINEMA EQ.ON
    params: []

  - id: cinema_eq_off
    label: Cinema EQ Off
    kind: action
    command: PSCINEMA EQ.OFF
    params: []

  - id: audyssey_multeq_set
    label: Set MultEQ Mode
    kind: action
    command: PSMULTEQ:{value}
    params:
      - name: value
        type: enum
        values:
          - AUDYSSEY
          - BYP.LR
          - FLAT
          - MANUAL
          - OFF

  - id: dynamic_eq_on
    label: Dynamic EQ On
    kind: action
    command: PSDYNEQ ON
    params: []

  - id: dynamic_eq_off
    label: Dynamic EQ Off
    kind: action
    command: PSDYNEQ OFF
    params: []

  - id: ref_level_offset
    label: Set Reference Level Offset
    kind: action
    command: PSREFLEV {value}
    params:
      - name: value
        type: enum
        values:
          - "0"
          - "5"
          - "10"
          - "15"
        description: Offset in dB

  - id: dynamic_volume_set
    label: Set Dynamic Volume
    kind: action
    command: PSDYNVOL {value}
    params:
      - name: value
        type: enum
        values:
          - HEV
          - MED
          - LIT
          - OFF

  - id: lfc_on
    label: Audyssey LFC On
    kind: action
    command: PSLFC ON
    params: []

  - id: lfc_off
    label: Audyssey LFC Off
    kind: action
    command: PSLFC OFF
    params: []

  - id: containment_amount_up
    label: Containment Amount Up
    kind: action
    command: PSCNTAMT UP
    params: []

  - id: containment_amount_down
    label: Containment Amount Down
    kind: action
    command: PSCNTAMT DOWN
    params: []

  - id: containment_amount_set
    label: Set Containment Amount
    kind: action
    command: PSCNTAMT {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0, AVR range 1-7 (01-07)"

  - id: drc_set
    label: Set Dynamic Compression
    kind: action
    command: PSDRC {value}
    params:
      - name: value
        type: enum
        values:
          - AUTO
          - LOW
          - MID
          - HI
          - OFF

  - id: dialogue_enhancer_set
    label: Set Dialogue Enhancer
    kind: action
    command: PSDEH {value}
    params:
      - name: value
        type: enum
        values:
          - OFF
          - LOW
          - MED
          - HIGH

  - id: lfe_set
    label: Set LFE Level
    kind: action
    command: PSLFE {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0dB, 10=-10dB. AVR range 0 to -10"

  - id: audio_delay_up
    label: Audio Delay Up
    kind: action
    command: PSDELAY UP
    params: []

  - id: audio_delay_down
    label: Audio Delay Down
    kind: action
    command: PSDELAY DOWN
    params: []

  - id: audio_delay_set
    label: Set Audio Delay
    kind: action
    command: PSDELAY {value}
    params:
      - name: value
        type: string
        description: "000-999 by ASCII, 000=0ms, 200=200ms. AVR range 0-200ms"

  - id: restorer_set
    label: Set Audio Restorer
    kind: action
    command: PSRSTR {value}
    params:
      - name: value
        type: enum
        values:
          - OFF
          - LOW
          - MED
          - HI

  - id: graphic_eq_on
    label: Graphic EQ On
    kind: action
    command: PSGEQ ON
    params: []

  - id: graphic_eq_off
    label: Graphic EQ Off
    kind: action
    command: PSGEQ OFF
    params: []

  - id: speaker_output_set
    label: Set Speaker Output Configuration
    kind: action
    command: PSSP:{value}
    params:
      - name: value
        type: enum
        values:
          - FW
          - FH
          - SB
          - HW
          - BH
          - BW
          - FL
          - HF
          - FR
        description: Speaker output config (F.Height/F.Wide/S.Back/Floor combinations)

  - id: picture_mode_set
    label: Set Picture Mode
    kind: action
    command: PV{value}
    params:
      - name: value
        type: enum
        values:
          - OFF
          - STD
          - MOV
          - VVD
          - STM
          - CTM
          - DAY
          - NGT

  - id: contrast_up
    label: Contrast Up
    kind: action
    command: PVCN UP
    params: []

  - id: contrast_down
    label: Contrast Down
    kind: action
    command: PVCN DOWN
    params: []

  - id: contrast_set
    label: Set Contrast
    kind: action
    command: PVCN {value}
    params:
      - name: value
        type: string
        description: "000-100 by ASCII, 050=0, AVR range -50 to +50"

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: PVBR UP
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: PVBR DOWN
    params: []

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: PVBR {value}
    params:
      - name: value
        type: string
        description: "000-100 by ASCII, 050=0, AVR range -50 to +50"

  - id: saturation_up
    label: Saturation Up
    kind: action
    command: PVST UP
    params: []

  - id: saturation_down
    label: Saturation Down
    kind: action
    command: PVST DOWN
    params: []

  - id: saturation_set
    label: Set Saturation
    kind: action
    command: PVST {value}
    params:
      - name: value
        type: string
        description: "000-100 by ASCII, 050=0, AVR range -50 to +50"

  - id: hue_up
    label: Hue Up
    kind: action
    command: PVHUE UP
    params: []

  - id: hue_down
    label: Hue Down
    kind: action
    command: PVHUE DOWN
    params: []

  - id: hue_set
    label: Set Hue
    kind: action
    command: PVHUE {value}
    params:
      - name: value
        type: string
        description: "44-56 by ASCII, 50=0, AVR range -6 to +6"

  - id: dnr_set
    label: Set DNR
    kind: action
    command: PVDNR {value}
    params:
      - name: value
        type: enum
        values:
          - OFF
          - LOW
          - MID
          - HI

  - id: enhancer_up
    label: Enhancer Up
    kind: action
    command: PVENH UP
    params: []

  - id: enhancer_down
    label: Enhancer Down
    kind: action
    command: PVENH DOWN
    params: []

  - id: enhancer_set
    label: Set Enhancer
    kind: action
    command: PVENH {value}
    params:
      - name: value
        type: string
        description: "00-12 by ASCII, 00=0, AVR range 0-12"

  - id: zone2_on
    label: Zone 2 On
    kind: action
    command: Z2ON
    params: []

  - id: zone2_off
    label: Zone 2 Off
    kind: action
    command: Z2OFF
    params: []

  - id: zone2_source
    label: Zone 2 Select Source
    kind: action
    command: Z2{source}
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
    label: Zone 2 Set Volume
    kind: action
    command: Z2{value}
    params:
      - name: value
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=---(MIN)"

  - id: zone2_mute_on
    label: Zone 2 Mute On
    kind: action
    command: Z2MUON
    params: []

  - id: zone2_mute_off
    label: Zone 2 Mute Off
    kind: action
    command: Z2MUOFF
    params: []

  - id: zone2_channel_set
    label: Zone 2 Channel Setting
    kind: action
    command: Z2CS{value}
    params:
      - name: value
        type: enum
        values:
          - ST
          - MONO

  - id: zone2_quick_select
    label: Zone 2 Quick Select
    kind: action
    command: Z2QUICK{value}
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"

  - id: zone2_quick_memory
    label: Zone 2 Quick Select Memory
    kind: action
    command: Z2QUICK{value} MEMORY
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"

  - id: zone2_sleep_timer
    label: Zone 2 Sleep Timer
    kind: action
    command: Z2SLP{value}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 minutes by ASCII"

  - id: zone2_auto_standby
    label: Zone 2 Auto Standby
    kind: action
    command: Z2STBY{value}
    params:
      - name: value
        type: enum
        values:
          - 2H
          - 4H
          - 8H
          - OFF

  - id: zone2_bass_up
    label: Zone 2 Bass Up
    kind: action
    command: Z2PSBAS UP
    params: []

  - id: zone2_bass_down
    label: Zone 2 Bass Down
    kind: action
    command: Z2PSBAS DOWN
    params: []

  - id: zone2_bass_set
    label: Zone 2 Set Bass
    kind: action
    command: Z2PSBAS {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB"

  - id: zone2_treble_up
    label: Zone 2 Treble Up
    kind: action
    command: Z2PSTRE UP
    params: []

  - id: zone2_treble_down
    label: Zone 2 Treble Down
    kind: action
    command: Z2PSTRE DOWN
    params: []

  - id: zone2_treble_set
    label: Zone 2 Set Treble
    kind: action
    command: Z2PSTRE {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB"

  - id: zone3_on
    label: Zone 3 On
    kind: action
    command: Z3ON
    params: []

  - id: zone3_off
    label: Zone 3 Off
    kind: action
    command: Z3OFF
    params: []

  - id: zone3_source
    label: Zone 3 Select Source
    kind: action
    command: Z3{source}
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
    label: Zone 3 Set Volume
    kind: action
    command: Z3{value}
    params:
      - name: value
        type: string
        description: "00-98 by ASCII, 80=0dB, 00=---(MIN)"

  - id: zone3_mute_on
    label: Zone 3 Mute On
    kind: action
    command: Z3MUON
    params: []

  - id: zone3_mute_off
    label: Zone 3 Mute Off
    kind: action
    command: Z3MUOFF
    params: []

  - id: zone3_sleep_timer
    label: Zone 3 Sleep Timer
    kind: action
    command: Z3SLP{value}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 minutes by ASCII"

  - id: zone3_auto_standby
    label: Zone 3 Auto Standby
    kind: action
    command: Z3STBY{value}
    params:
      - name: value
        type: enum
        values:
          - 2H
          - 4H
          - 8H
          - OFF

  - id: tuner_frequency_up
    label: Tuner Frequency Up
    kind: action
    command: TFANUP
    params: []

  - id: tuner_frequency_down
    label: Tuner Frequency Down
    kind: action
    command: TFANDOWN
    params: []

  - id: tuner_frequency_set
    label: Set Tuner Frequency
    kind: action
    command: TFAN{value}
    params:
      - name: value
        type: string
        description: "6 digits, ****.** kHz (AM >050000) or ****.** MHz (FM <050000)"

  - id: tuner_preset_up
    label: Tuner Preset Up
    kind: action
    command: TPANUP
    params: []

  - id: tuner_preset_down
    label: Tuner Preset Down
    kind: action
    command: TPANDOWN
    params: []

  - id: tuner_preset_select
    label: Tuner Preset Select
    kind: action
    command: TPAN{value}
    params:
      - name: value
        type: string
        description: "01-56 preset number"

  - id: tuner_preset_memory
    label: Tuner Preset Memory
    kind: action
    command: TPANMEM
    params: []

  - id: tuner_band_am
    label: Tuner Band AM
    kind: action
    command: TMANAM
    params: []

  - id: tuner_band_fm
    label: Tuner Band FM
    kind: action
    command: TMANFM
    params: []

  - id: tuner_mode_auto
    label: Tuning Mode Auto
    kind: action
    command: TMANAUTO
    params: []

  - id: tuner_mode_manual
    label: Tuning Mode Manual
    kind: action
    command: TMANMANUAL
    params: []

  - id: net_usb_cursor_up
    label: Net/USB Cursor Up
    kind: action
    command: NS90
    params: []

  - id: net_usb_cursor_down
    label: Net/USB Cursor Down
    kind: action
    command: NS91
    params: []

  - id: net_usb_cursor_left
    label: Net/USB Cursor Left
    kind: action
    command: NS92
    params: []

  - id: net_usb_cursor_right
    label: Net/USB Cursor Right
    kind: action
    command: NS93
    params: []

  - id: net_usb_enter
    label: Net/USB Enter
    kind: action
    command: NS94
    params: []

  - id: net_usb_play
    label: Net/USB Play
    kind: action
    command: NS9A
    params: []

  - id: net_usb_pause
    label: Net/USB Pause
    kind: action
    command: NS9B
    params: []

  - id: net_usb_stop
    label: Net/USB Stop
    kind: action
    command: NS9C
    params: []

  - id: net_usb_skip_plus
    label: Net/USB Skip Forward
    kind: action
    command: NS9D
    params: []

  - id: net_usb_skip_minus
    label: Net/USB Skip Backward
    kind: action
    command: NS9E
    params: []

  - id: net_usb_search_plus
    label: Net/USB Search Forward
    kind: action
    command: NS9F
    params: []

  - id: net_usb_search_minus
    label: Net/USB Search Backward
    kind: action
    command: NS9G
    params: []

  - id: net_usb_repeat_one
    label: Net/USB Repeat One
    kind: action
    command: NS9H
    params: []

  - id: net_usb_repeat_all
    label: Net/USB Repeat All
    kind: action
    command: NS9I
    params: []

  - id: net_usb_repeat_off
    label: Net/USB Repeat Off
    kind: action
    command: NS9J
    params: []

  - id: net_usb_random_on
    label: Net/USB Random On
    kind: action
    command: NS9K
    params: []

  - id: net_usb_random_off
    label: Net/USB Random Off
    kind: action
    command: NS9M
    params: []

  - id: net_usb_repeat_toggle
    label: Net/USB Repeat Toggle
    kind: action
    command: NSRPT
    params: []

  - id: net_usb_random_toggle
    label: Net/USB Random Toggle
    kind: action
    command: NSRND
    params: []

  - id: net_usb_preset_call
    label: Net/USB Preset Call
    kind: action
    command: NSB{value}
    params:
      - name: value
        type: string
        description: "00-35 preset number"

  - id: net_usb_preset_memory
    label: Net/USB Preset Memory
    kind: action
    command: NSC{value}
    params:
      - name: value
        type: string
        description: "00-35 preset number"

  - id: menu_cursor_up
    label: Menu Cursor Up
    kind: action
    command: MNCUP
    params: []

  - id: menu_cursor_down
    label: Menu Cursor Down
    kind: action
    command: MNCDN
    params: []

  - id: menu_cursor_left
    label: Menu Cursor Left
    kind: action
    command: MNCLT
    params: []

  - id: menu_cursor_right
    label: Menu Cursor Right
    kind: action
    command: MNCRT
    params: []

  - id: menu_enter
    label: Menu Enter
    kind: action
    command: MNENT
    params: []

  - id: menu_return
    label: Menu Return
    kind: action
    command: MNRTN
    params: []

  - id: menu_option
    label: Menu Option
    kind: action
    command: MNOPT
    params: []

  - id: menu_info
    label: Menu Info
    kind: action
    command: MNINF
    params: []

  - id: channel_level_menu
    label: Channel Level Menu Toggle
    kind: action
    command: MNCHL
    params: []

  - id: setup_menu_on
    label: Setup Menu On
    kind: action
    command: MNMEN ON
    params: []

  - id: setup_menu_off
    label: Setup Menu Off
    kind: action
    command: MNMEN OFF
    params: []

  - id: all_zone_stereo_on
    label: All Zone Stereo On
    kind: action
    command: MNZST ON
    params: []

  - id: all_zone_stereo_off
    label: All Zone Stereo Off
    kind: action
    command: MNZST OFF
    params: []

  - id: remote_lock_on
    label: Remote Lock On
    kind: action
    command: SYREMOTE LOCK ON
    params: []

  - id: remote_lock_off
    label: Remote Lock Off
    kind: action
    command: SYREMOTE LOCK OFF
    params: []

  - id: panel_lock_on
    label: Panel Lock On (Except Volume)
    kind: action
    command: SYPANEL LOCK ON
    params: []

  - id: panel_volume_lock_on
    label: Panel & Volume Lock On
    kind: action
    command: SYPANEL+V LOCK ON
    params: []

  - id: panel_lock_off
    label: Panel Lock Off
    kind: action
    command: SYPANEL LOCK OFF
    params: []

  - id: trigger1_on
    label: Trigger 1 On
    kind: action
    command: TR1 ON
    params: []

  - id: trigger1_off
    label: Trigger 1 Off
    kind: action
    command: TR1 OFF
    params: []

  - id: trigger2_on
    label: Trigger 2 On
    kind: action
    command: TR2 ON
    params: []

  - id: trigger2_off
    label: Trigger 2 Off
    kind: action
    command: TR2 OFF
    params: []

  - id: dimmer_set
    label: Set Dimmer
    kind: action
    command: DIM {value}
    params:
      - name: value
        type: enum
        values:
          - BRI
          - DIM
          - DAR
          - OFF
          - SEL
        description: "BRI=Bright, DIM=Dim, DAR=Dark, OFF=Off, SEL=Toggle cycle"

  - id: rec_select_source
    label: REC Select Source
    kind: action
    command: SR{source}
    params:
      - name: source
        type: string
        description: "Source name (same as SI parameters) or SOURCE to cancel"

  - id: quick_select
    label: Quick Select Mode
    kind: action
    command: MSQUICK{value}
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"

  - id: quick_select_memory
    label: Quick Select Memory
    kind: action
    command: MSQUICK{value} MEMORY
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"

  - id: favorite_select
    label: Favorite Select
    kind: action
    command: ZMFAVORITE{value}
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"

  - id: favorite_memory
    label: Favorite Memory
    kind: action
    command: ZMFAVORITE{value} MEMORY
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"

  - id: zone2_hpf_on
    label: Zone 2 HPF On
    kind: action
    command: Z2HPFON
    params: []

  - id: zone2_hpf_off
    label: Zone 2 HPF Off
    kind: action
    command: Z2HPFOFF
    params: []

  - id: zone2_hdmi_audio_set
    label: Zone 2 HDMI Audio Mode
    kind: action
    command: Z2HDA {value}
    params:
      - name: value
        type: enum
        values:
          - THR
          - PCM

  - id: zone2_cv_up
    label: Zone 2 Channel Volume Up
    kind: action
    command: Z2CV{channel} UP
    params:
      - name: channel
        type: enum
        values:
          - FL
          - FR
        description: Zone 2 speaker channel

  - id: zone2_cv_down
    label: Zone 2 Channel Volume Down
    kind: action
    command: Z2CV{channel} DOWN
    params:
      - name: channel
        type: enum
        values:
          - FL
          - FR

  - id: zone2_cv_set
    label: Zone 2 Set Channel Volume
    kind: action
    command: Z2CV{channel} {value}
    params:
      - name: channel
        type: enum
        values:
          - FL
          - FR
      - name: value
        type: string
        description: "38-62 by ASCII, 50=0dB"

  - id: zone3_cv_up
    label: Zone 3 Channel Volume Up
    kind: action
    command: Z3CV{channel} UP
    params:
      - name: channel
        type: enum
        values:
          - FL
          - FR

  - id: zone3_cv_down
    label: Zone 3 Channel Volume Down
    kind: action
    command: Z3CV{channel} DOWN
    params:
      - name: channel
        type: enum
        values:
          - FL
          - FR

  - id: zone3_cv_set
    label: Zone 3 Set Channel Volume
    kind: action
    command: Z3CV{channel} {value}
    params:
      - name: channel
        type: enum
        values:
          - FL
          - FR
      - name: value
        type: string
        description: "38-62 by ASCII, 50=0dB"

  - id: zone3_hpf_on
    label: Zone 3 HPF On
    kind: action
    command: Z3HPFON
    params: []

  - id: zone3_hpf_off
    label: Zone 3 HPF Off
    kind: action
    command: Z3HPFOFF
    params: []

  - id: zone3_channel_set
    label: Zone 3 Channel Setting
    kind: action
    command: Z3CS{value}
    params:
      - name: value
        type: enum
        values:
          - ST
          - MONO

  - id: zone3_bass_up
    label: Zone 3 Bass Up
    kind: action
    command: Z3PSBAS UP
    params: []

  - id: zone3_bass_down
    label: Zone 3 Bass Down
    kind: action
    command: Z3PSBAS DOWN
    params: []

  - id: zone3_bass_set
    label: Zone 3 Set Bass
    kind: action
    command: Z3PSBAS {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB"

  - id: zone3_treble_up
    label: Zone 3 Treble Up
    kind: action
    command: Z3PSTRE UP
    params: []

  - id: zone3_treble_down
    label: Zone 3 Treble Down
    kind: action
    command: Z3PSTRE DOWN
    params: []

  - id: zone3_treble_set
    label: Zone 3 Set Treble
    kind: action
    command: Z3PSTRE {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB"

  - id: remote_maintenance_start
    label: Remote Maintenance Start
    kind: action
    command: RM STA
    params: []

  - id: remote_maintenance_end
    label: Remote Maintenance End
    kind: action
    command: RM END
    params: []
  - id: input_mode_no
    label: Set Input Mode No Signal
    kind: action
    command: SDNO
    params: []

  - id: dialog_level_on
    label: Dialog Level Adjust On
    kind: action
    command: PSDIL ON
    params: []

  - id: dialog_level_off
    label: Dialog Level Adjust Off
    kind: action
    command: PSDIL OFF
    params: []

  - id: dialog_level_up
    label: Dialog Level Up
    kind: action
    command: PSDIL UP
    params: []

  - id: dialog_level_down
    label: Dialog Level Down
    kind: action
    command: PSDIL DOWN
    params: []

  - id: dialog_level_set
    label: Set Dialog Level
    kind: action
    command: PSDIL {value}
    params:
      - name: value
        type: string
        description: "38-62 by ASCII, 50=0dB"

  - id: ps_mode_set
    label: Set PS Surround Sub-Mode
    kind: action
    command: PSMODE:{mode}
    params:
      - name: mode
        type: enum
        values:
          - MUSIC
          - CINEMA
          - GAME
          - "PRO LOGIC"

  - id: loudness_management_on
    label: Loudness Management On
    kind: action
    command: PSLOM ON
    params: []

  - id: loudness_management_off
    label: Loudness Management Off
    kind: action
    command: PSLOM OFF
    params: []

  - id: front_height_on
    label: Front Height On
    kind: action
    command: PSFH:ON
    params: []

  - id: front_height_off
    label: Front Height Off
    kind: action
    command: PSFH:OFF
    params: []

  - id: pl2z_height_gain_set
    label: Set PL2z Height Gain
    kind: action
    command: PSPHG {value}
    params:
      - name: value
        type: enum
        values:
          - LOW
          - MID
          - HI

  - id: audyssey_dsx_set
    label: Set Audyssey DSX
    kind: action
    command: PSDSX {value}
    params:
      - name: value
        type: enum
        values:
          - ONHW
          - ONH
          - ONW
          - OFF

  - id: stage_width_up
    label: Stage Width Up
    kind: action
    command: PSSTW UP
    params: []

  - id: stage_width_down
    label: Stage Width Down
    kind: action
    command: PSSTW DOWN
    params: []

  - id: stage_width_set
    label: Set Stage Width
    kind: action
    command: PSSTW {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB, AVR range 40-60"

  - id: stage_height_up
    label: Stage Height Up
    kind: action
    command: PSSTH UP
    params: []

  - id: stage_height_down
    label: Stage Height Down
    kind: action
    command: PSSTH DOWN
    params: []

  - id: stage_height_set
    label: Set Stage Height
    kind: action
    command: PSSTH {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 50=0dB, AVR range 40-60"

  - id: bass_sync_up
    label: Bass Sync Up
    kind: action
    command: PSBSC UP
    params: []

  - id: bass_sync_down
    label: Bass Sync Down
    kind: action
    command: PSBSC DOWN
    params: []

  - id: bass_sync_set
    label: Set Bass Sync
    kind: action
    command: PSBSC {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0, AVR range 0-16"

  - id: lfe_level_ext_set
    label: Set LFE Level for Ext/7.1CH In
    kind: action
    command: PSLFL {value}
    params:
      - name: value
        type: enum
        values:
          - "00"
          - "05"
          - "10"
          - "15"
        description: "LFE level for EXT.IN/7.1CH IN mode"

  - id: effect_on
    label: Effect On
    kind: action
    command: PSEFF ON
    params: []

  - id: effect_off
    label: Effect Off
    kind: action
    command: PSEFF OFF
    params: []

  - id: effect_level_up
    label: Effect Level Up
    kind: action
    command: PSEFF UP
    params: []

  - id: effect_level_down
    label: Effect Level Down
    kind: action
    command: PSEFF DOWN
    params: []

  - id: effect_level_set
    label: Set Effect Level
    kind: action
    command: PSEFF {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0dB, 10=10dB, AVR range 1-15"

  - id: surround_delay_up
    label: Surround Delay Up
    kind: action
    command: PSDEL UP
    params: []

  - id: surround_delay_down
    label: Surround Delay Down
    kind: action
    command: PSDEL DOWN
    params: []

  - id: surround_delay_set
    label: Set Surround Delay
    kind: action
    command: PSDEL {value}
    params:
      - name: value
        type: string
        description: "000-999 by ASCII, 000=0ms, 300=300ms, AVR range 0-300ms"

  - id: panorama_on
    label: Panorama On
    kind: action
    command: PSPAN ON
    params: []

  - id: panorama_off
    label: Panorama Off
    kind: action
    command: PSPAN OFF
    params: []

  - id: dimension_up
    label: Dimension Up
    kind: action
    command: PSDIM UP
    params: []

  - id: dimension_down
    label: Dimension Down
    kind: action
    command: PSDIM DOWN
    params: []

  - id: dimension_set
    label: Set Dimension
    kind: action
    command: PSDIM {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0, AVR range 0-6"

  - id: center_width_up
    label: Center Width Up
    kind: action
    command: PSCEN UP
    params: []

  - id: center_width_down
    label: Center Width Down
    kind: action
    command: PSCEN DOWN
    params: []

  - id: center_width_set
    label: Set Center Width
    kind: action
    command: PSCEN {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0, AVR range 0-7"

  - id: center_image_up
    label: Center Image Up
    kind: action
    command: PSCEI UP
    params: []

  - id: center_image_down
    label: Center Image Down
    kind: action
    command: PSCEI DOWN
    params: []

  - id: center_image_set
    label: Set Center Image
    kind: action
    command: PSCEI {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0.0, AVR range 0.0-1.0"

  - id: center_gain_up
    label: Center Gain Up
    kind: action
    command: PSCEG UP
    params: []

  - id: center_gain_down
    label: Center Gain Down
    kind: action
    command: PSCEG DOWN
    params: []

  - id: center_gain_set
    label: Set Center Gain
    kind: action
    command: PSCEG {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 00=0.0, AVR range 0.0-1.0"

  - id: center_spread_on
    label: Center Spread On
    kind: action
    command: PSCES ON
    params: []

  - id: center_spread_off
    label: Center Spread Off
    kind: action
    command: PSCES OFF
    params: []

  - id: subwoofer_sw_on
    label: Subwoofer SW On
    kind: action
    command: PSSWR ON
    params: []

  - id: subwoofer_sw_off
    label: Subwoofer SW Off
    kind: action
    command: PSSWR OFF
    params: []

  - id: room_size_set
    label: Set Room Size
    kind: action
    command: PSRSZ {value}
    params:
      - name: value
        type: enum
        values:
          - S
          - MS
          - M
          - ML
          - L

  - id: front_speaker_set
    label: Set Front Speaker Output
    kind: action
    command: PSFRONT {value}
    params:
      - name: value
        type: enum
        values:
          - SPA
          - SPB
          - "A+B"

  - id: auro_3d_preset_set
    label: Set Auro-Matic 3D Preset
    kind: action
    command: PSAUROPR {value}
    params:
      - name: value
        type: enum
        values:
          - SMA
          - MED
          - LAR
          - SPE
        description: "Auro-3D Upgrade only"

  - id: auro_3d_strength_up
    label: Auro-Matic 3D Strength Up
    kind: action
    command: PSAUROST UP
    params: []

  - id: auro_3d_strength_down
    label: Auro-Matic 3D Strength Down
    kind: action
    command: PSAUROST DOWN
    params: []

  - id: auro_3d_strength_set
    label: Set Auro-Matic 3D Strength
    kind: action
    command: PSAUROST {value}
    params:
      - name: value
        type: string
        description: "00-99 by ASCII, 01=1, 10=10, AVR range 1-16. Auro-3D Upgrade only"

  - id: net_usb_ipod_toggle
    label: Net/USB iPod Mode Toggle
    kind: action
    command: NS9W
    params: []

  - id: net_usb_page_next
    label: Net/USB Page Next
    kind: action
    command: NS9X
    params: []

  - id: net_usb_page_prev
    label: Net/USB Page Previous
    kind: action
    command: NS9Y
    params: []

  - id: net_usb_search_stop
    label: Net/USB Manual Search Stop
    kind: action
    command: NS9Z
    params: []

  - id: net_usb_favorites_add
    label: Net/USB Add Favorites Folder
    kind: action
    command: NSFV MEM
    params: []

  - id: instaprevue_on
    label: InstaPrevue On
    kind: action
    command: MNPRV ON
    params: []

  - id: instaprevue_off
    label: InstaPrevue Off
    kind: action
    command: MNPRV OFF
    params: []

  - id: zone2_favorite_select
    label: Zone 2 Favorite Select
    kind: action
    command: Z2FAVORITE{value}
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"

  - id: zone2_favorite_memory
    label: Zone 2 Favorite Memory
    kind: action
    command: Z2FAVORITE{value} MEMORY
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"

  - id: zone3_quick_select
    label: Zone 3 Quick Select
    kind: action
    command: Z3QUICK{value}
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"

  - id: zone3_quick_memory
    label: Zone 3 Quick Select Memory
    kind: action
    command: Z3QUICK{value} MEMORY
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"

  - id: zone3_favorite_select
    label: Zone 3 Favorite Select
    kind: action
    command: Z3FAVORITE{value}
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"

  - id: zone3_favorite_memory
    label: Zone 3 Favorite Memory
    kind: action
    command: Z3FAVORITE{value} MEMORY
    params:
      - name: value
        type: enum
        values:
          - "1"
          - "2"
          - "3"
          - "4"

  - id: hd_channel_up
    label: HD Radio Channel Up
    kind: action
    command: TFHDUP
    params: []

  - id: hd_channel_down
    label: HD Radio Channel Down
    kind: action
    command: TFHDDOWN
    params: []

  - id: hd_frequency_set
    label: Set HD Radio Frequency
    kind: action
    command: TFHD{value}
    params:
      - name: value
        type: string
        description: "6 digits, ****.** kHz (AM >050000) or ****.** MHz (FM <050000)"

  - id: hd_multicast_select
    label: HD Radio Multicast Channel Select
    kind: action
    command: TFHDMC{digit}
    params:
      - name: digit
        type: string
        description: "1-8 for multicast channels, 0 for analog"

  - id: hd_freq_multicast_set
    label: Set HD Radio Frequency and Multicast Channel
    kind: action
    command: TFHD{freq}MC{digit}
    params:
      - name: freq
        type: string
        description: "6 digits, ****.** kHz or MHz"
      - name: digit
        type: string
        description: "1-8 for multicast, 0 for analog"

  - id: hd_preset_up
    label: HD Radio Preset Up
    kind: action
    command: TPHDUP
    params: []

  - id: hd_preset_down
    label: HD Radio Preset Down
    kind: action
    command: TPHDDOWN
    params: []

  - id: hd_preset_select
    label: HD Radio Preset Select
    kind: action
    command: TPHD{value}
    params:
      - name: value
        type: string
        description: "01-56 preset number"

  - id: hd_preset_memory
    label: HD Radio Preset Memory
    kind: action
    command: TPHDMEM
    params: []

  - id: hd_preset_memory_direct
    label: HD Radio Preset Memory Direct
    kind: action
    command: TPHDMEM{value}
    params:
      - name: value
        type: string
        description: "01-56 preset number"

  - id: hd_band_am
    label: HD Radio Band AM
    kind: action
    command: TMHDAM
    params: []

  - id: hd_band_fm
    label: HD Radio Band FM
    kind: action
    command: TMHDFM
    params: []

  - id: hd_tuning_mode_set
    label: Set HD Radio Tuning Mode
    kind: action
    command: TMHD{mode}
    params:
      - name: mode
        type: enum
        values:
          - AUTOHD
          - AUTO
          - MANUAL
          - ANAAUTO
          - ANAMANU

  - id: tuner_preset_memory_direct
    label: Tuner Preset Memory Direct
    kind: action
    command: TPANMEM{value}
    params:
      - name: value
        type: string
        description: "01-56 preset number"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values:
      - ON
      - STANDBY
    query: PW?
    response_prefix: PW

  - id: master_volume
    type: string
    description: "Volume 00-98 (80=0dB, 00=---MIN). 3-char for 0.5dB steps."
    query: MV?
    response_prefix: MV

  - id: mute_state
    type: enum
    values:
      - ON
      - OFF
    query: MU?
    response_prefix: MU

  - id: input_source
    type: string
    description: Current input source name
    query: SI?
    response_prefix: SI

  - id: surround_mode
    type: string
    description: Current surround mode name
    query: MS?
    response_prefix: MS

  - id: main_zone_state
    type: enum
    values:
      - ON
      - OFF
    query: ZM?
    response_prefix: ZM

  - id: channel_volume
    type: string
    description: "Channel volume for all configured speakers. Returns multiple lines ending with CVEND."
    query: CV?
    response_prefix: CV

  - id: input_mode
    type: string
    query: SD?
    response_prefix: SD

  - id: digital_input_mode
    type: string
    query: DC?
    response_prefix: DC

  - id: video_select
    type: string
    query: SV?
    response_prefix: SV

  - id: sleep_timer
    type: string
    query: SLP?
    response_prefix: SLP

  - id: auto_standby
    type: string
    query: STBY?
    response_prefix: STBY

  - id: eco_mode
    type: string
    query: ECO?
    response_prefix: ECO

  - id: video_aspect
    type: string
    query: VSASP ?
    response_prefix: VSASP

  - id: video_monitor
    type: string
    query: VSMONI ?
    response_prefix: VSMONI

  - id: video_resolution
    type: string
    query: VSSC ?
    response_prefix: VSSC

  - id: video_resolution_hdmi
    type: string
    query: VSSCH ?
    response_prefix: VSSCH

  - id: hdmi_audio
    type: string
    query: VSAUDIO ?
    response_prefix: VSAUDIO

  - id: video_processing_mode
    type: string
    query: VSVPM ?
    response_prefix: VSVPM

  - id: vertical_stretch
    type: string
    query: VSVST ?
    response_prefix: VSVST

  - id: tone_control
    type: string
    query: PSTONE CTRL ?
    response_prefix: PSTONE CTRL

  - id: bass_level
    type: string
    query: PSBAS ?
    response_prefix: PSBAS

  - id: treble_level
    type: string
    query: PSTRE ?
    response_prefix: PSTRE

  - id: subwoofer_level
    type: string
    description: "Returns PSSWL ON/OFF + PSSWL value + optionally PSSWL2 value"
    query: PSSWL ?
    response_prefix: PSSWL

  - id: cinema_eq
    type: enum
    values:
      - ON
      - OFF
    query: PSCINEMA EQ. ?
    response_prefix: PSCINEMA EQ.

  - id: multeq_mode
    type: string
    query: PSMULTEQ ?
    response_prefix: PSMULTEQ

  - id: dynamic_eq
    type: enum
    values:
      - ON
      - OFF
    query: PSDYNEQ ?
    response_prefix: PSDYNEQ

  - id: ref_level_offset
    type: string
    query: PSREFLEV ?
    response_prefix: PSREFLEV

  - id: dynamic_volume
    type: string
    query: PSDYNVOL ?
    response_prefix: PSDYNVOL

  - id: lfc_state
    type: enum
    values:
      - ON
      - OFF
    query: PSLFC ?
    response_prefix: PSLFC

  - id: containment_amount
    type: string
    query: PSCNTAMT ?
    response_prefix: PSCNTAMT

  - id: drc_state
    type: string
    query: PSDRC ?
    response_prefix: PSDRC

  - id: dialogue_enhancer
    type: string
    query: PSDEH ?
    response_prefix: PSDEH

  - id: lfe_level
    type: string
    query: PSLFE ?
    response_prefix: PSLFE

  - id: audio_delay
    type: string
    query: PSDELAY ?
    response_prefix: PSDELAY

  - id: restorer_state
    type: string
    query: PSRSTR ?
    response_prefix: PSRSTR

  - id: graphic_eq
    type: enum
    values:
      - ON
      - OFF
    query: PSGEQ ?
    response_prefix: PSGEQ

  - id: speaker_output
    type: string
    query: PSSP: ?
    response_prefix: PSSP

  - id: picture_mode
    type: string
    query: PV?
    response_prefix: PV

  - id: contrast
    type: string
    query: PVCN ?
    response_prefix: PVCN

  - id: brightness
    type: string
    query: PVBR ?
    response_prefix: PVBR

  - id: saturation
    type: string
    query: PVST ?
    response_prefix: PVST

  - id: hue
    type: string
    query: PVHUE ?
    response_prefix: PVHUE

  - id: dnr_state
    type: string
    query: PVDNR ?
    response_prefix: PVDNR

  - id: enhancer
    type: string
    query: PVENH ?
    response_prefix: PVENH

  - id: zone2_state
    type: string
    query: Z2?
    response_prefix: Z2

  - id: zone2_mute
    type: enum
    values:
      - ON
      - OFF
    query: Z2MU?
    response_prefix: Z2MU

  - id: zone2_channel_setting
    type: string
    query: Z2CS?
    response_prefix: Z2CS

  - id: zone2_channel_volume
    type: string
    query: Z2CV?
    response_prefix: Z2CV

  - id: zone2_hpf
    type: enum
    values:
      - ON
      - OFF
    query: Z2HPF?
    response_prefix: Z2HPF

  - id: zone2_bass
    type: string
    query: Z2PSBAS ?
    response_prefix: Z2PSBAS

  - id: zone2_treble
    type: string
    query: Z2PSTRE ?
    response_prefix: Z2PSTRE

  - id: zone2_hdmi_audio
    type: string
    query: Z2HDA?
    response_prefix: Z2HDA

  - id: zone2_sleep
    type: string
    query: Z2SLP?
    response_prefix: Z2SLP

  - id: zone2_auto_standby
    type: string
    query: Z2STBY?
    response_prefix: Z2STBY

  - id: zone3_state
    type: string
    query: Z3?
    response_prefix: Z3

  - id: zone3_mute
    type: enum
    values:
      - ON
      - OFF
    query: Z3MU?
    response_prefix: Z3MU

  - id: zone3_channel_setting
    type: string
    query: Z3CS?
    response_prefix: Z3CS

  - id: zone3_channel_volume
    type: string
    query: Z3CV?
    response_prefix: Z3CV

  - id: zone3_hpf
    type: enum
    values:
      - ON
      - OFF
    query: Z3HPF?
    response_prefix: Z3HPF

  - id: zone3_bass
    type: string
    query: Z3PSBAS ?
    response_prefix: Z3PSBAS

  - id: zone3_treble
    type: string
    query: Z3PSTRE ?
    response_prefix: Z3PSTRE

  - id: zone3_sleep
    type: string
    query: Z3SLP?
    response_prefix: Z3SLP

  - id: zone3_auto_standby
    type: string
    query: Z3STBY?
    response_prefix: Z3STBY

  - id: tuner_frequency
    type: string
    query: TFAN?
    response_prefix: TFAN

  - id: tuner_rds_name
    type: string
    description: RDS station name (EU/AP only)
    query: TFANNAME?
    response_prefix: TFANNAME

  - id: tuner_preset
    type: string
    query: TPAN?
    response_prefix: TPAN

  - id: tuner_band_mode
    type: string
    query: TMAN?
    response_prefix: TMAN

  - id: trigger_state
    type: string
    query: TR?
    response_prefix: TR

  - id: dimmer_state
    type: string
    query: DIM ?
    response_prefix: DIM

  - id: setup_menu_state
    type: enum
    values:
      - "MNMEN ON"
      - "MNMEN OFF"
    query: MNMEN?
    response_prefix: MNMEN

  - id: all_zone_stereo_state
    type: enum
    values:
      - "MNZST ON"
      - "MNZST OFF"
    query: MNZST?
    response_prefix: MNZST

  - id: remote_maintenance_state
    type: enum
    values:
      - "RM ON"
      - "RM OFF"
    query: "RM ?"
    response_prefix: RM

  - id: upgrade_id
    type: string
    description: 12-digit upgrade ID number displayed on FL display
    query: UGIDN
    response_prefix: UGIDN

  - id: net_usb_onscreen_ascii
    type: string
    description: Onscreen display info as ASCII (NSA0-NSA8 lines)
    query: NSA
    response_prefix: NSA

  - id: net_usb_onscreen_utf8
    type: string
    description: Onscreen display info as UTF-8 (NSE0-NSE8 lines)
    query: NSE
    response_prefix: NSE

  - id: net_audio_preset_names
    type: string
    description: "Preset name list, NSH00-NSH35 (20 char each, UTF-8)"
    query: NSH
    response_prefix: NSH
```

## Variables
```yaml
variables:
  - id: master_volume_db
    type: string
    description: "Volume 00-98, 80=0dB, 00=---(MIN). 3-char for 0.5dB steps."
    set_command: MV{value}
    query: MV?

  - id: zone2_volume_db
    type: string
    description: "Zone 2 volume 00-98, 80=0dB, 00=---(MIN)"
    set_command: Z2{value}
    query: Z2?

  - id: zone3_volume_db
    type: string
    description: "Zone 3 volume 00-98, 80=0dB, 00=---(MIN)"
    set_command: Z3{value}
    query: Z3?
```

## Events
```yaml
events:
  - id: power_event
    description: Sent when power state changes via front panel or remote. Returns PWON or PWSTANDBY.
    response_prefix: PW

  - id: volume_event
    description: Sent when master volume changes. Returns MV followed by volume value.
    response_prefix: MV

  - id: mute_event
    description: Sent when mute state changes. Returns MUON or MUOFF.
    response_prefix: MU

  - id: input_source_event
    description: Sent when input source changes. Returns SI followed by source name.
    response_prefix: SI

  - id: surround_mode_event
    description: Sent when surround mode changes. Returns MS followed by mode name. When mode changes, current mode is returned before new mode.
    response_prefix: MS

  - id: channel_volume_event
    description: Sent when channel volume changes (e.g. on input source switch). Returns CV lines for all active channels.
    response_prefix: CV

  - id: main_zone_event
    description: Sent when main zone power changes.
    response_prefix: ZM

  - id: zone2_event
    description: Sent when Zone 2 state changes.
    response_prefix: Z2

  - id: zone3_event
    description: Sent when Zone 3 state changes.
    response_prefix: Z3
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after sending PWON before sending next command (source: note J)"
# UNRESOLVED: source does not describe additional safety interlocks beyond command timing
```

## Notes
- Commands use 2-character ASCII codes with ASCII parameters, terminated by CR (0x0D).
- Send commands at 50ms minimum intervals.
- Response to query (?) commands should arrive within 200ms.
- Events (unsolicited status changes) should arrive within 5 seconds of state change.
- Max communication data length: 135 bytes.
- Volume encoding: 80=0dB, 00=---(MIN/MUTE), 98=~+18dB. 0.5dB steps use 3 ASCII characters (e.g. 805=+0.5dB, 795=-0.5dB).
- Channel volume encoding: 50=0dB, range 38-62.
- Bass/treble encoding: 50=0dB, AVR operational range 44-56 (-6 to +6).
- When surround mode is re-set to current mode, surround mode EVENT returns but channel volume does NOT (note E).
- When input source changes, surround mode and channel volume events return only if they differ from previous source (notes C-D).
- HD Radio commands (HDRADIO, HD*) are North America model only.
- Spotify commands are North America & Europe model only.
- SiriusXM, Pandora, LastFM commands are region-specific.
- Auro-3D commands (AURO3D, AUROPR, AUROST) require Auro-3D Upgrade.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact SR5015-specific surround mode subset not documented (many modes listed with per-model availability markers) -->
<!-- UNRESOLVED: REC SELECT (SR) command full parameter list shared with SI but table incomplete -->
<!-- UNRESOLVED: NS onscreen display (NSA/NSE) binary flag byte encoding partially documented -->
<!-- UNRESOLVED: HD Radio detailed metadata response format partially documented -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:15:27.640Z
last_checked_at: 2026-06-09T19:19:22.256Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T19:19:22.256Z
matched_actions: 283
action_count: 283
confidence: medium
summary: "All 283 spec actions matched verbatim in the source; only 4 source commands not covered (PSSWL2 UP/DOWN/set and HD? status query), below the 5-extra threshold for short. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PSSWL2 UP"
- "PSSWL2 DOWN"
- "PSSWL2 {value}"
- "HD?"
- "exact firmware versions compatible not stated"
- "some surround modes marked per-model availability; full SR5015-specific subset not documented"
- "no explicit multi-step macro sequences in source"
- "source does not describe additional safety interlocks beyond command timing"
- "firmware version compatibility not stated"
- "exact SR5015-specific surround mode subset not documented (many modes listed with per-model availability markers)"
- "REC SELECT (SR) command full parameter list shared with SI but table incomplete"
- "NS onscreen display (NSA/NSE) binary flag byte encoding partially documented"
- "HD Radio detailed metadata response format partially documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
