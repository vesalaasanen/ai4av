---
spec_id: admin/marantz-modelm1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz MODELM1 Series Control Spec"
manufacturer: Marantz
model_family: "MODELM1 Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "MODELM1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - marantz.com
  - rn.dmglobal.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/en_US/v1709469166640/archive-downloads/heos_cli_protocol_specification_290616.pdf
  - https://rn.dmglobal.com/usmodel/HEOS_CLI_ProtocolSpecification-Version-1.17.pdf
retrieved_at: 2026-08-15T11:26:06.211Z
last_checked_at: 2026-10-07T18:44:46.430Z
generated_at: 2026-10-07T18:44:46.430Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "exact MODELM1 sub-model variants not enumerated in source"
  - "whether PSLEE is a source typo or an accepted command spelling."
  - "full per-zone and per-PS feedback enums not exhaustively enumerated"
  - "meaning of NG not explicitly stated.\""
  - "no macros described in source"
  - "no explicit safety interlock or power-sequencing warnings beyond timing notes"
  - "exact MODELM1 sub-model variants and their command subset differences not enumerated"
  - "full set of codec-specific MS response strings only partially enumerated (Dolby/DTS/NEO:X variants are response-driven)"
  - "0.5dB step 3-char volume encoding boundary details inferred from examples"
verification:
  verdict: verified
  checked_at: 2026-10-07T18:44:46.430Z
  matched_actions: 536
  action_count: 536
  confidence: medium
  summary: "All 536 action units map to command-table rows and transport values are supported. The source is a generic Control Protocol Ver.06 that never names MODELM1, so applicability to that model is not confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Marantz MODELM1 Series Control Spec

## Summary
The Marantz MODELM1 Series is an AV receiver (AVR) controllable via RS-232C serial and TCP/IP (telnet, TCP port 23). The protocol uses ASCII command strings of the form `COMMAND + PARAMETER + CR (0x0D)` where COMMAND is 2 ASCII characters. This spec covers power, master/channel volume, input/source selection, multi-zone (Main/Zone2/Zone3), surround mode, video and audio parameter setting, tuner, HD Radio, online music/USB/iPod, system menu, triggers, dimmer, and maintenance commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact MODELM1 sub-model variants not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # source: "TCP port 23 (telnet)"
serial:
  baud_rate: 9600  # source: "Communication speed : 9600bps"
  data_bits: 8  # source: "Character length : 8 bits"
  parity: none  # source: "Parity control : None"
  stop_bits: 1  # source: "Stop bit : 1 bit"
  flow_control: UNRESOLVED  # source does not state this (was inferred none: source describes "Non procedural", no flow control mentioned)
  connector: "DB-9pin female, DCE straight"  # source states DB-9pin female type, slave straight connection
  max_data_length: 135  # source: "Communication data length : 135 bytes (maximum)"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable    # inferred from PW power on/off commands
  - routable     # inferred from SI input source and Z2/Z3 zone routing commands
  - queryable    # inferred from many request commands (PW?, MV?, SI?, etc.)
  - levelable    # inferred from MV/CV volume and PS level control commands
```

## Actions
```yaml
# Command structure: COMMAND (2 ASCII chars) + PARAMETER (up to 25 chars) + CR (0x0D).
# Send COMMAND in 50ms+ intervals. After PWON, wait 1 second before next command.
# Verbatim payloads shown as in source (<CR> = 0x0D).

# ===== PW - Power =====
- id: power_on
  label: Power ON
  kind: action
  command: "PWON<CR>"
  params: []

- id: power_standby
  label: Power STANDBY
  kind: action
  command: "PWSTANDBY<CR>"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PW?<CR>"
  params: []

# ===== MV - Master Volume =====
- id: master_volume_up
  label: Master Volume UP
  kind: action
  command: "MVUP<CR>"
  params: []

- id: master_volume_down
  label: Master Volume DOWN
  kind: action
  command: "MVDOWN<CR>"
  params: []

- id: master_volume_set
  label: Master Volume Direct Set
  kind: action
  command: "MV{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 98; 80=0dB, 00=MIN(---). 0.5dB step uses 3 chars (e.g. MV805=+0.5dB, MV795=-0.5dB)"

- id: master_volume_query
  label: Master Volume Query
  kind: query
  command: "MV?<CR>"
  params: []

# ===== CV - Channel Volume =====
# Channels: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR,
#           TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR,
#           BDL, BDR, SHL, SHR (Auro-3D only), TS (Auro-3D only)
- id: channel_volume_up
  label: Channel Volume UP
  kind: action
  command: "CV{channel} UP<CR>"
  params:
    - name: channel
      type: string
      description: "Speaker channel mnemonic (FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS)"

- id: channel_volume_down
  label: Channel Volume DOWN
  kind: action
  command: "CV{channel} DOWN<CR>"
  params:
    - name: channel
      type: string
      description: "Speaker channel mnemonic (see channel_volume_up)"

- id: channel_volume_set
  label: Channel Volume Direct Set
  kind: action
  command: "CV{channel} {level}<CR>"
  params:
    - name: channel
      type: string
      description: "Speaker channel mnemonic (see channel_volume_up)"
    - name: level
      type: string
      description: "38 to 62, 50=0dB (SW/SW2 also allow 00=MIN)"

- id: channel_volume_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  command: "CVZRL<CR>"
  params: []

- id: channel_volume_query
  label: Channel Volume Status Query
  kind: query
  command: "CV?<CR>"
  params: []

# ===== MU - Mute =====
- id: mute_on
  label: Mute ON
  kind: action
  command: "MUON<CR>"
  params: []

- id: mute_off
  label: Mute OFF
  kind: action
  command: "MUOFF<CR>"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "MU?<CR>"
  params: []

# ===== SI - Select Input source =====
# Sources (each a distinct source row in source): PHONO, CD, TUNER, DVD, BD, TV,
# SAT/CBL, MPLAY, GAME, HDRADIO (NA only), NET, PANDORA (NA only), SIRIUSXM,
# SPOTIFY (NA/EU only), LASTFM, FLICKR, IRADIO, SERVER, FAVORITES,
# AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: select_input
  label: Select Input Source
  kind: action
  command: "SI{source}<CR>"
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

- id: select_input_query
  label: Input Source Query
  kind: query
  command: "SI?<CR>"
  params: []

# ===== ZM - Main Zone =====
- id: main_zone_on
  label: Main Zone ON
  kind: action
  command: "ZMON<CR>"
  params: []

- id: main_zone_off
  label: Main Zone OFF
  kind: action
  command: "ZMOFF<CR>"
  params: []

- id: main_zone_query
  label: Main Zone Status Query
  kind: query
  command: "ZM?<CR>"
  params: []

- id: main_zone_favorite_select
  label: Main Zone Favorite Mode Select
  kind: action
  command: "ZMFAVORITE{n}<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 4"

- id: main_zone_favorite_memory
  label: Main Zone Favorite Mode Memory
  kind: action
  command: "ZMFAVORITE{n} MEMORY<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 4"

# ===== SR - Rec Select =====
- id: rec_select_source
  label: REC Select Source (same params as SI)
  kind: action
  command: "SR{source}<CR>"
  params:
    - name: source
      type: string
      description: "Source name same as SI command (PHONO, CD, DVD, USB DIRECT, IPOD DIRECT, SOURCE, etc.)"

- id: rec_select_query
  label: REC Select Status Query
  kind: query
  command: "SR?<CR>"
  params: []

# ===== SD - Input Signal Mode =====
- id: signal_select_auto
  label: Input Signal AUTO (HDMI>DIGITAL>ANALOG)
  kind: action
  command: "SDAUTO<CR>"
  params: []

- id: signal_select_hdmi
  label: Input Signal Force HDMI
  kind: action
  command: "SDHDMI<CR>"
  params: []

- id: signal_select_digital
  label: Input Signal Force DIGITAL (Optical/Coaxial)
  kind: action
  command: "SDDIGITAL<CR>"
  params: []

- id: signal_select_analog
  label: Input Signal Force ANALOG
  kind: action
  command: "SDANALOG<CR>"
  params: []

- id: signal_select_ext_in
  label: Set EXTERNAL IN Mode
  kind: action
  command: "SDEXT.IN<CR>"
  params: []

- id: signal_select_71in
  label: Set 7.1CH IN Mode
  kind: action
  command: "SD7.1IN<CR>"
  params: []

- id: signal_select_no
  label: Input Signal NO (cancel)
  kind: action
  command: "SDNO<CR>"
  params: []

- id: signal_select_query
  label: Input Signal Status Query
  kind: query
  command: "SD?<CR>"
  params: []

# ===== DC - Digital Input Mode =====
- id: digital_input_auto
  label: Digital Input AUTO
  kind: action
  command: "DCAUTO<CR>"
  params: []

- id: digital_input_pcm
  label: Digital Input Force PCM
  kind: action
  command: "DCPCM<CR>"
  params: []

- id: digital_input_dts
  label: Digital Input Force DTS
  kind: action
  command: "DCDTS<CR>"
  params: []

- id: digital_input_query
  label: Digital Input Status Query
  kind: query
  command: "DC?<CR>"
  params: []

# ===== SV - Video Select =====
- id: video_select_source
  label: Video Select Source
  kind: action
  command: "SV{source}<CR>"
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE"

- id: video_select_on
  label: Video Select ON
  kind: action
  command: "SVON<CR>"
  params: []

- id: video_select_off
  label: Video Select OFF
  kind: action
  command: "SVOFF<CR>"
  params: []

- id: video_select_query
  label: Video Select Status Query
  kind: query
  command: "SV?<CR>"
  params: []

# ===== SLP - Main Zone Sleep Timer =====
- id: sleep_timer_off
  label: Sleep Timer OFF
  kind: action
  command: "SLPOFF<CR>"
  params: []

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}<CR>"
  params:
    - name: minutes
      type: string
      description: "001 to 120 (010=10min)"

- id: sleep_timer_query
  label: Sleep Timer Status Query
  kind: query
  command: "SLP?<CR>"
  params: []

# ===== STBY - Main Zone Auto Standby =====
- id: auto_standby_15m
  label: Auto Standby 15 Minutes
  kind: action
  command: "STBY15M<CR>"
  params: []

- id: auto_standby_30m
  label: Auto Standby 30 Minutes
  kind: action
  command: "STBY30M<CR>"
  params: []

- id: auto_standby_60m
  label: Auto Standby 60 Minutes
  kind: action
  command: "STBY60M<CR>"
  params: []

- id: auto_standby_off
  label: Auto Standby OFF
  kind: action
  command: "STBYOFF<CR>"
  params: []

- id: auto_standby_query
  label: Auto Standby Status Query
  kind: query
  command: "STBY?<CR>"
  params: []

# ===== ECO - ECO Mode =====
- id: eco_on
  label: ECO Mode ON
  kind: action
  command: "ECOON<CR>"
  params: []

- id: eco_auto
  label: ECO Mode AUTO
  kind: action
  command: "ECOAUTO<CR>"
  params: []

- id: eco_off
  label: ECO Mode OFF
  kind: action
  command: "ECOOFF<CR>"
  params: []

- id: eco_query
  label: ECO Mode Status Query
  kind: query
  command: "ECO?<CR>"
  params: []

# ===== MS - Surround Mode =====
- id: surround_mode_set
  label: Select Surround Mode
  kind: action
  command: "MS{mode}<CR>"
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, AURO3D, AURO2DSURR"

- id: surround_mode_query
  label: Surround Mode Status Query
  kind: query
  command: "MS?<CR>"
  params: []

# ===== MS QUICK SELECT =====
- id: quick_select
  label: Quick Select Mode Select
  kind: action
  command: "MSQUICK{n}<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 5"

- id: quick_select_memory
  label: Quick Select Mode Memory
  kind: action
  command: "MSQUICK{n} MEMORY<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 5"

- id: quick_select_query
  label: Quick Select Status Query
  kind: query
  command: "MSQUICK ?<CR>"
  params: []

# ===== VS - Video Setting =====
- id: vs_aspect_normal
  label: Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM<CR>"
  params: []

- id: vs_aspect_full
  label: Aspect Ratio 16:9
  kind: action
  command: "VSASPFUL<CR>"
  params: []

- id: vs_aspect_query
  label: Aspect Status Query
  kind: query
  command: "VSASP ?<CR>"
  params: []

- id: vs_monitor_auto
  label: HDMI Monitor Auto
  kind: action
  command: "VSMONIAUTO<CR>"
  params: []

- id: vs_monitor_1
  label: HDMI Monitor OUT-1
  kind: action
  command: "VSMONI1<CR>"
  params: []

- id: vs_monitor_2
  label: HDMI Monitor OUT-2
  kind: action
  command: "VSMONI2<CR>"
  params: []

- id: vs_monitor_query
  label: HDMI Monitor Status Query
  kind: query
  command: "VSMONI ?<CR>"
  params: []

- id: vs_scaling_set
  label: Output Resolution Scaling (analog)
  kind: action
  command: "VSSC{res}<CR>"
  params:
    - name: res
      type: string
      description: "48P (480p/576p), 10I (1080i), 72P (720p), 10P (1080p), 10P24 (1080p/24Hz), 4K, 4KF (4K 60/50), AUTO"

- id: vs_scaling_query
  label: Scaling Status Query
  kind: query
  command: "VSSC ?<CR>"
  params: []

- id: vs_scaling_hdmi_set
  label: Output Resolution Scaling (HDMI)
  kind: action
  command: "VSSCH{res}<CR>"
  params:
    - name: res
      type: string
      description: "48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO"

- id: vs_scaling_hdmi_query
  label: HDMI Scaling Status Query
  kind: query
  command: "VSSCH ?<CR>"
  params: []

- id: vs_hdmi_audio_amp
  label: HDMI Audio Output AMP
  kind: action
  command: "VSAUDIO AMP<CR>"
  params: []

- id: vs_hdmi_audio_tv
  label: HDMI Audio Output TV
  kind: action
  command: "VSAUDIO TV<CR>"
  params: []

- id: vs_hdmi_audio_query
  label: HDMI Audio Status Query
  kind: query
  command: "VSAUDIO ?<CR>"
  params: []

- id: vs_video_processing_set
  label: Video Processing Mode Set
  kind: action
  command: "VSVPM{mode}<CR>"
  params:
    - name: mode
      type: string
      description: "AUTO, GAME, MOVI"

- id: vs_video_processing_query
  label: Video Processing Status Query
  kind: query
  command: "VSVPM ?<CR>"
  params: []

- id: vs_vertical_stretch_on
  label: Vertical Stretch ON
  kind: action
  command: "VSVST ON<CR>"
  params: []

- id: vs_vertical_stretch_off
  label: Vertical Stretch OFF
  kind: action
  command: "VSVST OFF<CR>"
  params: []

- id: vs_vertical_stretch_query
  label: Vertical Stretch Status Query
  kind: query
  command: "VSVST ?<CR>"
  params: []

# ===== PS - Parameter Setting (each sub-mnemonic a separate action) =====
- id: ps_tone_ctrl_on
  label: Tone Control ON
  kind: action
  command: "PSTONE CTRL ON<CR>"
  params: []

- id: ps_tone_ctrl_off
  label: Tone Control OFF
  kind: action
  command: "PSTONE CTRL OFF<CR>"
  params: []

- id: ps_tone_ctrl_query
  label: Tone Control Status Query
  kind: query
  command: "PSTONE CTRL ?<CR>"
  params: []

- id: ps_bass_up
  label: Bass UP
  kind: action
  command: "PSBAS UP<CR>"
  params: []

- id: ps_bass_down
  label: Bass DOWN
  kind: action
  command: "PSBAS DOWN<CR>"
  params: []

- id: ps_bass_set
  label: Bass Direct Set
  kind: action
  command: "PSBAS{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (44 to 56 = -6 to +6)"

- id: ps_bass_query
  label: Bass Status Query
  kind: query
  command: "PSBAS ?<CR>"
  params: []

- id: ps_treble_up
  label: Treble UP
  kind: action
  command: "PSTRE UP<CR>"
  params: []

- id: ps_treble_down
  label: Treble DOWN
  kind: action
  command: "PSTRE DOWN<CR>"
  params: []

- id: ps_treble_set
  label: Treble Direct Set
  kind: action
  command: "PSTRE{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (44 to 56 = -6 to +6)"

- id: ps_treble_query
  label: Treble Status Query
  kind: query
  command: "PSTRE ?<CR>"
  params: []

- id: ps_dialog_level_on
  label: Dialog Level Adjust ON
  kind: action
  command: "PSDIL ON<CR>"
  params: []

- id: ps_dialog_level_off
  label: Dialog Level Adjust OFF
  kind: action
  command: "PSDIL OFF<CR>"
  params: []

- id: ps_dialog_level_up
  label: Dialog Level UP
  kind: action
  command: "PSDIL UP<CR>"
  params: []

- id: ps_dialog_level_down
  label: Dialog Level DOWN
  kind: action
  command: "PSDIL DOWN<CR>"
  params: []

- id: ps_dialog_level_set
  label: Dialog Level Direct Set
  kind: action
  command: "PSDIL{level}<CR>"
  params:
    - name: level
      type: string
      description: "38 to 62, 50=0dB"

- id: ps_dialog_level_query
  label: Dialog Level Status Query
  kind: query
  command: "PSDIL ?<CR>"
  params: []

- id: ps_subwoofer_level_on
  label: Subwoofer Level Adjust ON
  kind: action
  command: "PSSWL ON<CR>"
  params: []

- id: ps_subwoofer_level_off
  label: Subwoofer Level Adjust OFF
  kind: action
  command: "PSSWL OFF<CR>"
  params: []

- id: ps_subwoofer_level_up
  label: Subwoofer(1) Level UP
  kind: action
  command: "PSSWL UP<CR>"
  params: []

- id: ps_subwoofer_level_down
  label: Subwoofer(1) Level DOWN
  kind: action
  command: "PSSWL DOWN<CR>"
  params: []

- id: ps_subwoofer_level_set
  label: Subwoofer(1) Level Direct Set
  kind: action
  command: "PSSWL{level}<CR>"
  params:
    - name: level
      type: string
      description: "00,38 to 62, 50=0dB"

- id: ps_subwoofer2_level_up
  label: Subwoofer(2) Level UP
  kind: action
  command: "PSSWL2 UP<CR>"
  params: []

- id: ps_subwoofer2_level_down
  label: Subwoofer(2) Level DOWN
  kind: action
  command: "PSSWL2 DOWN<CR>"
  params: []

- id: ps_subwoofer2_level_set
  label: Subwoofer(2) Level Direct Set
  kind: action
  command: "PSSWL2{level}<CR>"
  params:
    - name: level
      type: string
      description: "00,38 to 62, 50=0dB"

- id: ps_subwoofer_level_query
  label: Subwoofer Level Status Query
  kind: query
  command: "PSSWL ?<CR>"
  params: []

- id: ps_cinema_eq_on
  label: Cinema EQ ON
  kind: action
  command: "PSCINEMA EQ.ON<CR>"
  params: []

- id: ps_cinema_eq_off
  label: Cinema EQ OFF
  kind: action
  command: "PSCINEMA EQ.OFF<CR>"
  params: []

- id: ps_cinema_eq_query
  label: Cinema EQ Status Query
  kind: query
  command: "PSCINEMA EQ. ?<CR>"
  params: []

- id: ps_mode_set
  label: PL2/PL2x/NEO Mode Set
  kind: action
  command: "PSMODE:{mode}<CR>"
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"

- id: ps_mode_query
  label: PL Mode Status Query
  kind: query
  command: "PSMODE: ?<CR>"
  params: []

- id: ps_lom_on
  label: Loudness Management ON
  kind: action
  command: "PSLOM ON<CR>"
  params: []

- id: ps_lom_off
  label: Loudness Management OFF
  kind: action
  command: "PSLOM OFF<CR>"
  params: []

- id: ps_lom_query
  label: Loudness Management Status Query
  kind: query
  command: "PSLOM ?<CR>"
  params: []

- id: ps_front_height_on
  label: Front Height (PLIIx Height) Output ON
  kind: action
  command: "PSFH:ON<CR>"
  params: []

- id: ps_front_height_off
  label: Front Height Output OFF
  kind: action
  command: "PSFH:OFF<CR>"
  params: []

- id: ps_front_height_query
  label: Front Height Status Query
  kind: query
  command: "PSFH: ?<CR>"
  params: []

- id: ps_speaker_output_set
  label: Speaker Output Set (F.Height/F.Wide/S.Back)
  kind: action
  command: "PSSP:{config}<CR>"
  params:
    - name: config
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"

- id: ps_speaker_output_query
  label: Speaker Output Status Query
  kind: query
  command: "PSSP: ?<CR>"
  params: []

- id: ps_height_gain_set
  label: PL2z Height Gain Direct Change
  kind: action
  command: "PSPHG {gain}<CR>"
  params:
    - name: gain
      type: string
      description: "LOW, MID, HI"

- id: ps_height_gain_query
  label: Height Gain Status Query
  kind: query
  command: "PSPHG ?<CR>"
  params: []

- id: ps_multeq_set
  label: MultEQ Mode Direct Change
  kind: action
  command: "PSMULTEQ:{mode}<CR>"
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"

- id: ps_multeq_query
  label: MultEQ Status Query
  kind: query
  command: "PSMULTEQ: ?<CR>"
  params: []

- id: ps_dyneq_on
  label: Dynamic EQ ON
  kind: action
  command: "PSDYNEQ ON<CR>"
  params: []

- id: ps_dyneq_off
  label: Dynamic EQ OFF
  kind: action
  command: "PSDYNEQ OFF<CR>"
  params: []

- id: ps_dyneq_query
  label: Dynamic EQ Status Query
  kind: query
  command: "PSDYNEQ ?<CR>"
  params: []

- id: ps_reflev_set
  label: Reference Level Offset Set
  kind: action
  command: "PSREFLEV {offset}<CR>"
  params:
    - name: offset
      type: string
      description: "0, 5, 10, 15 (dB)"

- id: ps_reflev_query
  label: Reference Level Status Query
  kind: query
  command: "PSREFLEV ?<CR>"
  params: []

- id: ps_dynvol_set
  label: Dynamic Volume Set
  kind: action
  command: "PSDYNVOL {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "HEV (Heavy), MED (Medium), LIT (Light), OFF"

- id: ps_dynvol_query
  label: Dynamic Volume Status Query
  kind: query
  command: "PSDYNVOL ?<CR>"
  params: []

- id: ps_lfc_on
  label: Audyssey LFC ON
  kind: action
  command: "PSLFC ON<CR>"
  params: []

- id: ps_lfc_off
  label: Audyssey LFC OFF
  kind: action
  command: "PSLFC OFF<CR>"
  params: []

- id: ps_lfc_query
  label: Audyssey LFC Status Query
  kind: query
  command: "PSLFC ?<CR>"
  params: []

- id: ps_containment_up
  label: Containment Amount UP
  kind: action
  command: "PSCNTAMT UP<CR>"
  params: []

- id: ps_containment_down
  label: Containment Amount DOWN
  kind: action
  command: "PSCNTAMT DOWN<CR>"
  params: []

- id: ps_containment_set
  label: Containment Amount Direct Set
  kind: action
  command: "PSCNTAMT{amount}<CR>"
  params:
    - name: amount
      type: string
      description: "00 to 99, operable 01 to 07"

- id: ps_containment_query
  label: Containment Amount Status Query
  kind: query
  command: "PSCNTAMT ?<CR>"
  params: []

- id: ps_dsx_set
  label: Audyssey DSX Set
  kind: action
  command: "PSDSX {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "ONHW (Height & Wide), ONH (Height), ONW (Width), OFF"

- id: ps_dsx_query
  label: Audyssey DSX Status Query
  kind: query
  command: "PSDSX ?<CR>"
  params: []

- id: ps_stage_width_up
  label: Stage Width UP
  kind: action
  command: "PSSTW UP<CR>"
  params: []

- id: ps_stage_width_down
  label: Stage Width DOWN
  kind: action
  command: "PSSTW DOWN<CR>"
  params: []

- id: ps_stage_width_set
  label: Stage Width Direct Set
  kind: action
  command: "PSSTW{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (40 to 60 = -10 to +10)"

- id: ps_stage_width_query
  label: Stage Width Status Query
  kind: query
  command: "PSSTW ?<CR>"
  params: []

- id: ps_stage_height_up
  label: Stage Height UP
  kind: action
  command: "PSSTH UP<CR>"
  params: []

- id: ps_stage_height_down
  label: Stage Height DOWN
  kind: action
  command: "PSSTH DOWN<CR>"
  params: []

- id: ps_stage_height_set
  label: Stage Height Direct Set
  kind: action
  command: "PSSTH{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (40 to 60 = -10 to +10)"

- id: ps_stage_height_query
  label: Stage Height Status Query
  kind: query
  command: "PSSTH ?<CR>"
  params: []

- id: ps_graphic_eq_on
  label: Graphic EQ ON
  kind: action
  command: "PSGEQ ON<CR>"
  params: []

- id: ps_graphic_eq_off
  label: Graphic EQ OFF
  kind: action
  command: "PSGEQ OFF<CR>"
  params: []

- id: ps_graphic_eq_query
  label: Graphic EQ Status Query
  kind: query
  command: "PSGEQ ?<CR>"
  params: []

- id: ps_drc_set
  label: Dynamic Compression Direct Change
  kind: action
  command: "PSDRC {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"

- id: ps_drc_query
  label: Dynamic Compression Status Query
  kind: query
  command: "PSDRC ?<CR>"
  params: []

- id: ps_bass_sync_up
  label: Bass Sync UP
  kind: action
  command: "PSBSC UP<CR>"
  params: []

- id: ps_bass_sync_down
  label: Bass Sync DOWN
  kind: action
  command: "PSBSC DOWN<CR>"
  params: []

- id: ps_bass_sync_set
  label: Bass Sync Direct Set
  kind: action
  command: "PSBSC{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 00=0 (operable 0 to 16)"

- id: ps_bass_sync_query
  label: Bass Sync Status Query
  kind: query
  command: "PSBSC ?<CR>"
  params: []

- id: ps_dialog_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  command: "PSDEH {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HIGH"

- id: ps_dialog_enhancer_query
  label: Dialogue Enhancer Status Query
  kind: query
  command: "PSDEH ?<CR>"
  params: []

- id: ps_lfe_up
  label: LFE UP
  kind: action
  command: "PSLFE UP<CR>"
  params: []

- id: ps_lfe_down
  label: LFE DOWN
  kind: action
  command: "PSLFE DOWN<CR>"
  params: []

- id: ps_lfe_set
  label: LFE Direct Set
  kind: action
  command: "PSLFE{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 00=0dB, 10=-10dB (operable 0 to -10)"

- id: ps_lfe_query
  label: LFE Status Query
  kind: query
  command: "PSLFE ?<CR>"
  params: []

- id: ps_lfe_ext_level_set
  label: LFE Level (EXT.IN/7.1CH IN) Direct Set
  kind: action
  command: "PSLFL {level}<CR>"
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15"

- id: ps_lfe_ext_level_query
  label: LFE Level (EXT.IN) Status Query
  kind: query
  command: "PSLFL ?<CR>"
  params: []

- id: ps_effect_on
  label: Effect ON
  kind: action
  command: "PSEFF ON<CR>"
  params: []

- id: ps_effect_off
  label: Effect OFF
  kind: action
  command: "PSEFF OFF<CR>"
  params: []

- id: ps_effect_up
  label: Effect Level UP
  kind: action
  command: "PSEFF UP<CR>"
  params: []

- id: ps_effect_down
  label: Effect Level DOWN
  kind: action
  command: "PSEFF DOWN<CR>"
  params: []

- id: ps_effect_set
  label: Effect Level Direct Set
  kind: action
  command: "PSEFF{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 00=0dB, 10=10dB (operable 1 to 15)"

- id: ps_effect_query
  label: Effect Status Query
  kind: query
  command: "PSEFF ?<CR>"
  params: []

- id: ps_delay_up
  label: Delay UP
  kind: action
  command: "PSDEL UP<CR>"
  params: []

- id: ps_delay_down
  label: Delay DOWN
  kind: action
  command: "PSDEL DOWN<CR>"
  params: []

- id: ps_delay_set
  label: Delay Direct Set
  kind: action
  command: "PSDEL{delay}<CR>"
  params:
    - name: delay
      type: string
      description: "000 to 999, 000=0ms, 300=300ms (operable 0 to 300; 0-60ms=3ms/step, >60ms=10ms/step)"

- id: ps_delay_query
  label: Delay Status Query
  kind: query
  command: "PSDEL ?<CR>"
  params: []

- id: ps_panorama_on
  label: Panorama ON
  kind: action
  command: "PSPAN ON<CR>"
  params: []

- id: ps_panorama_off
  label: Panorama OFF
  kind: action
  command: "PSPAN OFF<CR>"
  params: []

- id: ps_panorama_query
  label: Panorama Status Query
  kind: query
  command: "PSPAN ?<CR>"
  params: []

- id: ps_dimension_up
  label: Dimension UP
  kind: action
  command: "PSDIM UP<CR>"
  params: []

- id: ps_dimension_down
  label: Dimension DOWN
  kind: action
  command: "PSDIM DOWN<CR>"
  params: []

- id: ps_dimension_set
  label: Dimension Direct Set
  kind: action
  command: "PSDIM{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 00=0 (operable 0 to 6)"

- id: ps_dimension_query
  label: Dimension Status Query
  kind: query
  command: "PSDIM ?<CR>"
  params: []

- id: ps_center_width_up
  label: Center Width UP
  kind: action
  command: "PSCEN UP<CR>"
  params: []

- id: ps_center_width_down
  label: Center Width DOWN
  kind: action
  command: "PSCEN DOWN<CR>"
  params: []

- id: ps_center_width_set
  label: Center Width Direct Set
  kind: action
  command: "PSCEN{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 00=0 (operable 0 to 7)"

- id: ps_center_width_query
  label: Center Width Status Query
  kind: query
  command: "PSCEN ?<CR>"
  params: []

- id: ps_center_image_up
  label: Center Image UP
  kind: action
  command: "PSCEI UP<CR>"
  params: []

- id: ps_center_image_down
  label: Center Image DOWN
  kind: action
  command: "PSCEI DOWN<CR>"
  params: []

- id: ps_center_image_set
  label: Center Image Direct Set
  kind: action
  command: "PSCEI{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 00=0.0 (operable 0.0 to 1.0)"

- id: ps_center_image_query
  label: Center Image Status Query
  kind: query
  command: "PSCEI ?<CR>"
  params: []

- id: ps_center_gain_up
  label: Center Gain UP
  kind: action
  command: "PSCEG UP<CR>"
  params: []

- id: ps_center_gain_down
  label: Center Gain DOWN
  kind: action
  command: "PSCEG DOWN<CR>"
  params: []

- id: ps_center_gain_set
  label: Center Gain Direct Set
  kind: action
  command: "PSCEG{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 00=0.0 (operable 0.0 to 1.0)"

- id: ps_center_gain_query
  label: Center Gain Status Query
  kind: query
  command: "PSCEG ?<CR>"
  params: []

- id: ps_center_spread_on
  label: Center Spread ON
  kind: action
  command: "PSCES ON<CR>"
  params: []

- id: ps_center_spread_off
  label: Center Spread OFF
  kind: action
  command: "PSCES OFF<CR>"
  params: []

- id: ps_center_spread_query
  label: Center Spread Status Query
  kind: query
  command: "PSCES ?<CR>"
  params: []

- id: ps_subwoofer_on_off_set
  label: Subwoofer ON/OFF (DIRECT/STEREO 2ch)
  kind: action
  command: "PSSWR {state}<CR>"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: ps_subwoofer_query
  label: Subwoofer (2ch) Status Query
  kind: query
  command: "PSSWR ?<CR>"
  params: []

- id: ps_room_size_set
  label: Room Size Direct Change
  kind: action
  command: "PSRSZ {size}<CR>"
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"

- id: ps_room_size_query
  label: Room Size Status Query
  kind: query
  command: "PSRSZ ?<CR>"
  params: []

- id: ps_audio_delay_up
  label: Audio Delay UP
  kind: action
  command: "PSDELAY UP<CR>"
  params: []

- id: ps_audio_delay_down
  label: Audio Delay DOWN
  kind: action
  command: "PSDELAY DOWN<CR>"
  params: []

- id: ps_audio_delay_set
  label: Audio Delay Direct Set
  kind: action
  command: "PSDELAY{delay}<CR>"
  params:
    - name: delay
      type: string
      description: "000 to 999, 000=0ms, 200=200ms (operable 0 to 200)"

- id: ps_audio_delay_query
  label: Audio Delay Status Query
  kind: query
  command: "PSDELAY ?<CR>"
  params: []

- id: ps_restorer_set
  label: Audio Restorer Direct Change
  kind: action
  command: "PSRSTR {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "OFF, LOW (MODE3), MED (MODE2), HI (MODE1)"

- id: ps_restorer_query
  label: Audio Restorer Status Query
  kind: query
  command: "PSRSTR ?<CR>"
  params: []

- id: ps_front_speaker_set
  label: Front Speaker Direct Change
  kind: action
  command: "PSFRONT {config}<CR>"
  params:
    - name: config
      type: string
      description: "SPA, SPB, A+B"

- id: ps_front_speaker_query
  label: Front Speaker Status Query
  kind: query
  command: "PSFRONT ?<CR>"
  params: []

- id: ps_auromatic_preset_set
  label: Auro-Matic 3D Preset Direct Change (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR {preset}<CR>"
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"

- id: ps_auromatic_preset_query
  label: Auro-Matic 3D Preset Status Query
  kind: query
  command: "PSAUROPR ?<CR>"
  params: []

- id: ps_auromatic_strength_up
  label: Auro-Matic 3D Strength UP (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST UP<CR>"
  params: []

- id: ps_auromatic_strength_down
  label: Auro-Matic 3D Strength DOWN (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST DOWN<CR>"
  params: []

- id: ps_auromatic_strength_set
  label: Auro-Matic 3D Strength Direct Set (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 01=1, 10=10 (operable 1 to 16)"

- id: ps_auromatic_strength_query
  label: Auro-Matic 3D Strength Status Query
  kind: query
  command: "PSAUROST ?<CR>"
  params: []

# ===== PV - Picture / Video Parameter =====
- id: pv_picture_mode_set
  label: Picture Mode Direct Change
  kind: action
  command: "PV{mode}<CR>"
  params:
    - name: mode
      type: string
      description: "OFF, STD (Standard), MOV (Movie), VVD (Vivid), STM (Stream), CTM (Custom), DAY (ISF Day), NGT (ISF Night)"

- id: pv_picture_mode_query
  label: Picture Mode Status Query
  kind: query
  command: "PV?<CR>"
  params: []

- id: pv_contrast_up
  label: Contrast UP
  kind: action
  command: "PVCN UP<CR>"
  params: []

- id: pv_contrast_down
  label: Contrast DOWN
  kind: action
  command: "PVCN DOWN<CR>"
  params: []

- id: pv_contrast_set
  label: Contrast Direct Set
  kind: action
  command: "PVCN {level}<CR>"
  params:
    - name: level
      type: string
      description: "000 to 100, 050=0 (-50 to +50)"

- id: pv_contrast_query
  label: Contrast Status Query
  kind: query
  command: "PVCN ?<CR>"
  params: []

- id: pv_brightness_up
  label: Brightness UP
  kind: action
  command: "PVBR UP<CR>"
  params: []

- id: pv_brightness_down
  label: Brightness DOWN
  kind: action
  command: "PVBR DOWN<CR>"
  params: []

- id: pv_brightness_set
  label: Brightness Direct Set
  kind: action
  command: "PVBR {level}<CR>"
  params:
    - name: level
      type: string
      description: "000 to 100, 050=0 (-50 to +50)"

- id: pv_brightness_query
  label: Brightness Status Query
  kind: query
  command: "PVBR ?<CR>"
  params: []

- id: pv_saturation_up
  label: Saturation UP
  kind: action
  command: "PVST UP<CR>"
  params: []

- id: pv_saturation_down
  label: Saturation DOWN
  kind: action
  command: "PVST DOWN<CR>"
  params: []

- id: pv_saturation_set
  label: Saturation Direct Set
  kind: action
  command: "PVST {level}<CR>"
  params:
    - name: level
      type: string
      description: "000 to 100, 050=0 (-50 to +50)"

- id: pv_saturation_query
  label: Saturation Status Query
  kind: query
  command: "PVST ?<CR>"
  params: []

- id: pv_hue_set
  label: Hue Direct Set
  kind: action
  command: "PVHUE{level}<CR>"
  params:
    - name: level
      type: string
      description: "44 to 56, 50=0 (-6 to +6)"

- id: pv_hue_query
  label: Hue Status Query
  kind: query
  command: "PVHUE ?<CR>"
  params: []

- id: pv_dnr_set
  label: DNR Direct Change
  kind: action
  command: "PVDNR {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MID, HI"

- id: pv_dnr_query
  label: DNR Status Query
  kind: query
  command: "PVDNR ?<CR>"
  params: []

- id: pv_enhancer_up
  label: Enhancer UP
  kind: action
  command: "PVENH UP<CR>"
  params: []

- id: pv_enhancer_down
  label: Enhancer DOWN
  kind: action
  command: "PVENH DOWN<CR>"
  params: []

- id: pv_enhancer_set
  label: Enhancer Direct Set
  kind: action
  command: "PVENH{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 12, 00=0 (operable 0 to 12)"

- id: pv_enhancer_query
  label: Enhancer Status Query
  kind: query
  command: "PVENH ?<CR>"
  params: []

# ===== Z2 - Zone 2 =====
- id: z2_source_select
  label: Zone2 Source Select
  kind: action
  command: "Z2{source}<CR>"
  params:
    - name: source
      type: string
      description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

- id: z2_query
  label: Zone2 Status Query
  kind: query
  command: "Z2?<CR>"
  params: []

- id: z2_on
  label: Zone2 ON
  kind: action
  command: "Z2ON<CR>"
  params: []

- id: z2_off
  label: Zone2 OFF
  kind: action
  command: "Z2OFF<CR>"
  params: []

- id: z2_volume_up
  label: Zone2 Volume UP
  kind: action
  command: "Z2UP<CR>"
  params: []

- id: z2_volume_down
  label: Zone2 Volume DOWN
  kind: action
  command: "Z2DOWN<CR>"
  params: []

- id: z2_volume_set
  label: Zone2 Volume Direct Set
  kind: action
  command: "Z2{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 98, 80=0dB, 00=MIN(---)"

- id: z2_quick_select
  label: Zone2 Quick Select
  kind: action
  command: "Z2QUICK{n}<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 5"

- id: z2_quick_select_memory
  label: Zone2 Quick Select Memory
  kind: action
  command: "Z2QUICK{n} MEMORY<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 5"

- id: z2_quick_select_query
  label: Zone2 Quick Select Status Query
  kind: query
  command: "Z2QUICK ?<CR>"
  params: []

- id: z2_favorite_select
  label: Zone2 Favorite Mode Select
  kind: action
  command: "Z2FAVORITE{n}<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 4"

- id: z2_favorite_memory
  label: Zone2 Favorite Mode Memory
  kind: action
  command: "Z2FAVORITE{n} MEMORY<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 4"

# ===== Z2MU / Z2CS / Z2CV / Z2HPF / Z2PS / Z2HDA / Z2SLP / Z2STBY =====
- id: z2_mute_on
  label: Zone2 Mute ON
  kind: action
  command: "Z2MUON<CR>"
  params: []

- id: z2_mute_off
  label: Zone2 Mute OFF
  kind: action
  command: "Z2MUOFF<CR>"
  params: []

- id: z2_mute_query
  label: Zone2 Mute Status Query
  kind: query
  command: "Z2MU?<CR>"
  params: []

- id: z2_channel_set_st
  label: Zone2 Channel Setting STEREO
  kind: action
  command: "Z2CSST<CR>"
  params: []

- id: z2_channel_set_mono
  label: Zone2 Channel Setting MONO
  kind: action
  command: "Z2CSMONO<CR>"
  params: []

- id: z2_channel_query
  label: Zone2 Channel Status Query
  kind: query
  command: "Z2CS?<CR>"
  params: []

- id: z2_channel_volume_up
  label: Zone2 Channel Volume UP (FL/FR)
  kind: action
  command: "Z2CV{channel} UP<CR>"
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: z2_channel_volume_down
  label: Zone2 Channel Volume DOWN (FL/FR)
  kind: action
  command: "Z2CV{channel} DOWN<CR>"
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: z2_channel_volume_set
  label: Zone2 Channel Volume Direct Set (FL/FR)
  kind: action
  command: "Z2CV{channel} {level}<CR>"
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38 to 62, 50=0dB"

- id: z2_channel_volume_query
  label: Zone2 Channel Volume Status Query
  kind: query
  command: "Z2CV?<CR>"
  params: []

- id: z2_hpf_on
  label: Zone2 HPF ON
  kind: action
  command: "Z2HPFON<CR>"
  params: []

- id: z2_hpf_off
  label: Zone2 HPF OFF
  kind: action
  command: "Z2HPFOFF<CR>"
  params: []

- id: z2_hpf_query
  label: Zone2 HPF Status Query
  kind: query
  command: "Z2HPF?<CR>"
  params: []

- id: z2_bass_up
  label: Zone2 Bass UP
  kind: action
  command: "Z2PSBAS UP<CR>"
  params: []

- id: z2_bass_down
  label: Zone2 Bass DOWN
  kind: action
  command: "Z2PSBAS DOWN<CR>"
  params: []

- id: z2_bass_set
  label: Zone2 Bass Direct Set
  kind: action
  command: "Z2PSBAS {level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (40-60 = -10 to +10)"

- id: z2_bass_query
  label: Zone2 Bass Status Query
  kind: query
  command: "Z2PSBAS ?<CR>"
  params: []

- id: z2_treble_up
  label: Zone2 Treble UP
  kind: action
  command: "Z2PSTRE UP<CR>"
  params: []

- id: z2_treble_down
  label: Zone2 Treble DOWN
  kind: action
  command: "Z2PSTRE DOWN<CR>"
  params: []

- id: z2_treble_set
  label: Zone2 Treble Direct Set
  kind: action
  command: "Z2PSTRE {level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (40-60 = -10 to +10)"

- id: z2_treble_query
  label: Zone2 Treble Status Query
  kind: query
  command: "Z2PSTRE ?<CR>"
  params: []

- id: z2_hdmi_audio_thr
  label: Zone2 HDMI Out Through
  kind: action
  command: "Z2HDA THR<CR>"
  params: []

- id: z2_hdmi_audio_pcm
  label: Zone2 HDMI Out PCM
  kind: action
  command: "Z2HDA PCM<CR>"
  params: []

- id: z2_hdmi_audio_query
  label: Zone2 HDMI Audio Status Query
  kind: query
  command: "Z2HDA?<CR>"
  params: []

- id: z2_sleep_off
  label: Zone2 Sleep Timer OFF
  kind: action
  command: "Z2SLPOFF<CR>"
  params: []

- id: z2_sleep_set
  label: Zone2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}<CR>"
  params:
    - name: minutes
      type: string
      description: "001 to 120 (010=10min)"

- id: z2_sleep_query
  label: Zone2 Sleep Timer Status Query
  kind: query
  command: "Z2SLP?<CR>"
  params: []

- id: z2_standby_2h
  label: Zone2 Auto Standby 2 Hours
  kind: action
  command: "Z2STBY2H<CR>"
  params: []

- id: z2_standby_4h
  label: Zone2 Auto Standby 4 Hours
  kind: action
  command: "Z2STBY4H<CR>"
  params: []

- id: z2_standby_8h
  label: Zone2 Auto Standby 8 Hours
  kind: action
  command: "Z2STBY8H<CR>"
  params: []

- id: z2_standby_off
  label: Zone2 Auto Standby OFF
  kind: action
  command: "Z2STBYOFF<CR>"
  params: []

- id: z2_standby_query
  label: Zone2 Auto Standby Status Query
  kind: query
  command: "Z2STBY?<CR>"
  params: []

# ===== Z3 - Zone 3 =====
- id: z3_source_select
  label: Zone3 Source Select
  kind: action
  command: "Z3{source}<CR>"
  params:
    - name: source
      type: string
      description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

- id: z3_query
  label: Zone3 Status Query
  kind: query
  command: "Z3?<CR>"
  params: []

- id: z3_on
  label: Zone3 ON
  kind: action
  command: "Z3ON<CR>"
  params: []

- id: z3_off
  label: Zone3 OFF
  kind: action
  command: "Z3OFF<CR>"
  params: []

- id: z3_volume_up
  label: Zone3 Volume UP
  kind: action
  command: "Z3UP<CR>"
  params: []

- id: z3_volume_down
  label: Zone3 Volume DOWN
  kind: action
  command: "Z3DOWN<CR>"
  params: []

- id: z3_volume_set
  label: Zone3 Volume Direct Set
  kind: action
  command: "Z3{level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 98, 80=0dB, 00=MIN(---)"

- id: z3_quick_select
  label: Zone3 Quick Select
  kind: action
  command: "Z3QUICK{n}<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 5"

- id: z3_quick_select_memory
  label: Zone3 Quick Select Memory
  kind: action
  command: "Z3QUICK{n} MEMORY<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 5"

- id: z3_quick_select_query
  label: Zone3 Quick Select Status Query
  kind: query
  command: "Z3QUICK ?<CR>"
  params: []

- id: z3_favorite_select
  label: Zone3 Favorite Mode Select
  kind: action
  command: "Z3FAVORITE{n}<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 4"

- id: z3_favorite_memory
  label: Zone3 Favorite Mode Memory
  kind: action
  command: "Z3FAVORITE{n} MEMORY<CR>"
  params:
    - name: n
      type: integer
      description: "1 to 4"

- id: z3_mute_on
  label: Zone3 Mute ON
  kind: action
  command: "Z3MUON<CR>"
  params: []

- id: z3_mute_off
  label: Zone3 Mute OFF
  kind: action
  command: "Z3MUOFF<CR>"
  params: []

- id: z3_mute_query
  label: Zone3 Mute Status Query
  kind: query
  command: "Z3MU?<CR>"
  params: []

- id: z3_channel_set_st
  label: Zone3 Channel Setting STEREO
  kind: action
  command: "Z3CSST<CR>"
  params: []

- id: z3_channel_set_mono
  label: Zone3 Channel Setting MONO
  kind: action
  command: "Z3CSMONO<CR>"
  params: []

- id: z3_channel_query
  label: Zone3 Channel Status Query
  kind: query
  command: "Z3CS?<CR>"
  params: []

- id: z3_channel_volume_up
  label: Zone3 Channel Volume UP (FL/FR)
  kind: action
  command: "Z3CV{channel} UP<CR>"
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: z3_channel_volume_down
  label: Zone3 Channel Volume DOWN (FL/FR)
  kind: action
  command: "Z3CV{channel} DOWN<CR>"
  params:
    - name: channel
      type: string
      description: "FL, FR"

- id: z3_channel_volume_set
  label: Zone3 Channel Volume Direct Set (FL/FR)
  kind: action
  command: "Z3CV{channel} {level}<CR>"
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38 to 62, 50=0dB"

- id: z3_channel_volume_query
  label: Zone3 Channel Volume Status Query
  kind: query
  command: "Z3CV?<CR>"
  params: []

- id: z3_hpf_on
  label: Zone3 HPF ON
  kind: action
  command: "Z3HPFON<CR>"
  params: []

- id: z3_hpf_off
  label: Zone3 HPF OFF
  kind: action
  command: "Z3HPFOFF<CR>"
  params: []

- id: z3_hpf_query
  label: Zone3 HPF Status Query
  kind: query
  command: "Z3HPF?<CR>"
  params: []

- id: z3_bass_up
  label: Zone3 Bass UP
  kind: action
  command: "Z3PSBAS UP<CR>"
  params: []

- id: z3_bass_down
  label: Zone3 Bass DOWN
  kind: action
  command: "Z3PSBAS DOWN<CR>"
  params: []

- id: z3_bass_set
  label: Zone3 Bass Direct Set
  kind: action
  command: "Z3PSBAS {level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (40-60 = -10 to +10)"

- id: z3_bass_query
  label: Zone3 Bass Status Query
  kind: query
  command: "Z3PSBAS ?<CR>"
  params: []

- id: z3_treble_up
  label: Zone3 Treble UP
  kind: action
  command: "Z3PSTRE UP<CR>"
  params: []

- id: z3_treble_down
  label: Zone3 Treble DOWN
  kind: action
  command: "Z3PSTRE DOWN<CR>"
  params: []

- id: z3_treble_set
  label: Zone3 Treble Direct Set
  kind: action
  command: "Z3PSTRE {level}<CR>"
  params:
    - name: level
      type: string
      description: "00 to 99, 50=0dB (40-60 = -10 to +10)"

- id: z3_treble_query
  label: Zone3 Treble Status Query
  kind: query
  command: "Z3PSTRE ?<CR>"
  params: []

- id: z3_sleep_off
  label: Zone3 Sleep Timer OFF
  kind: action
  command: "Z3SLPOFF<CR>"
  params: []

- id: z3_sleep_set
  label: Zone3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}<CR>"
  params:
    - name: minutes
      type: string
      description: "001 to 120 (010=10min)"

- id: z3_sleep_query
  label: Zone3 Sleep Timer Status Query
  kind: query
  command: "Z3SLP?<CR>"
  params: []

- id: z3_standby_2h
  label: Zone3 Auto Standby 2 Hours
  kind: action
  command: "Z3STBY2H<CR>"
  params: []

- id: z3_standby_4h
  label: Zone3 Auto Standby 4 Hours
  kind: action
  command: "Z3STBY4H<CR>"
  params: []

- id: z3_standby_8h
  label: Zone3 Auto Standby 8 Hours
  kind: action
  command: "Z3STBY8H<CR>"
  params: []

- id: z3_standby_off
  label: Zone3 Auto Standby OFF
  kind: action
  command: "Z3STBYOFF<CR>"
  params: []

- id: z3_standby_query
  label: Zone3 Auto Standby Status Query
  kind: query
  command: "Z3STBY?<CR>"
  params: []

# ===== TF / TP / TM - Tuner =====
- id: tuner_freq_up
  label: Tuner Frequency UP
  kind: action
  command: "TFANUP<CR>"
  params: []

- id: tuner_freq_down
  label: Tuner Frequency DOWN
  kind: action
  command: "TFANDOWN<CR>"
  params: []

- id: tuner_freq_set
  label: Tuner Frequency Direct Set
  kind: action
  command: "TFAN{freq}<CR>"
  params:
    - name: freq
      type: string
      description: "6 digits; >050000 = AM (kHz), <050000 = FM (MHz). e.g. TFAN105000 = 1050.00kHz AM"

- id: tuner_freq_query
  label: Tuner Frequency Status Query
  kind: query
  command: "TFAN?<CR>"
  params: []

- id: tuner_rds_name_query
  label: Tuner RDS Station Name Query (EU/AP only)
  kind: query
  command: "TFANNAME?<CR>"
  params: []

- id: tuner_preset_up
  label: Tuner Preset CH UP
  kind: action
  command: "TPANUP<CR>"
  params: []

- id: tuner_preset_down
  label: Tuner Preset CH DOWN
  kind: action
  command: "TPANDOWN<CR>"
  params: []

- id: tuner_preset_set
  label: Tuner Preset Direct Set
  kind: action
  command: "TPAN{n}<CR>"
  params:
    - name: n
      type: string
      description: "01 to 56"

- id: tuner_preset_query
  label: Tuner Preset Status Query
  kind: query
  command: "TPAN?<CR>"
  params: []

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM<CR>"
  params: []

- id: tuner_preset_memory_set
  label: Tuner Preset Memory Direct
  kind: action
  command: "TPANMEM{n}<CR>"
  params:
    - name: n
      type: string
      description: "01 to 56"

- id: tuner_band_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM<CR>"
  params: []

- id: tuner_band_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM<CR>"
  params: []

- id: tuner_mode_query
  label: Tuner Band/Mode Status Query
  kind: query
  command: "TMAN?<CR>"
  params: []

- id: tuner_tune_auto
  label: Tuning Mode AUTO
  kind: action
  command: "TMANAUTO<CR>"
  params: []

- id: tuner_tune_manual
  label: Tuning Mode MANUAL
  kind: action
  command: "TMANMANUAL<CR>"
  params: []

# ===== HD Radio =====
- id: hd_freq_up
  label: HD Radio Channel UP
  kind: action
  command: "TFHDUP<CR>"
  params: []

- id: hd_freq_down
  label: HD Radio Channel DOWN
  kind: action
  command: "TFHDDOWN<CR>"
  params: []

- id: hd_freq_set
  label: HD Radio Frequency Direct Set
  kind: action
  command: "TFHD{freq}<CR>"
  params:
    - name: freq
      type: string
      description: "6 digits; >050000 = AM, <050000 = FM"

- id: hd_multicast_set
  label: HD Multi Cast CH Select
  kind: action
  command: "TFHDMC{n}<CR>"
  params:
    - name: n
      type: string
      description: "1 digit; 1-8 = MultiCast, 0 = Analog"

- id: hd_freq_multicast_set
  label: HD Frequency + MultiCast CH Select
  kind: action
  command: "TFHD{freq}MC{n}<CR>"
  params:
    - name: freq
      type: string
      description: "6 digits frequency"
    - name: n
      type: string
      description: "MultiCast 1-8, 0=Analog"

- id: hd_freq_query
  label: HD Radio Status Query
  kind: query
  command: "TFHD?<CR>"
  params: []

- id: hd_preset_up
  label: HD Preset CH UP
  kind: action
  command: "TPHDUP<CR>"
  params: []

- id: hd_preset_down
  label: HD Preset CH DOWN
  kind: action
  command: "TPHDDOWN<CR>"
  params: []

- id: hd_preset_set
  label: HD Preset Direct Set
  kind: action
  command: "TPHD{n}<CR>"
  params:
    - name: n
      type: string
      description: "01 to 56"

- id: hd_preset_query
  label: HD Preset Status Query
  kind: query
  command: "TPHD?<CR>"
  params: []

- id: hd_preset_memory
  label: HD Preset Memory
  kind: action
  command: "TPHDMEM<CR>"
  params: []

- id: hd_preset_memory_set
  label: HD Preset Memory Direct
  kind: action
  command: "TPHDMEM{n}<CR>"
  params:
    - name: n
      type: string
      description: "01 to 56"

- id: hd_band_am
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM<CR>"
  params: []

- id: hd_band_fm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM<CR>"
  params: []

- id: hd_tune_auto_hd
  label: HD Tuning Mode AUTO-HD
  kind: action
  command: "TMHDAUTOHD<CR>"
  params: []

- id: hd_tune_auto
  label: HD Tuning Mode AUTO
  kind: action
  command: "TMHDAUTO<CR>"
  params: []

- id: hd_tune_manual
  label: HD Tuning Mode MANUAL
  kind: action
  command: "TMHDMANUAL<CR>"
  params: []

- id: hd_tune_analog_auto
  label: HD Tuning Mode ANALOG AUTO
  kind: action
  command: "TMHDANAAUTO<CR>"
  params: []

- id: hd_tune_analog_manual
  label: HD Tuning Mode ANALOG MANUAL
  kind: action
  command: "TMHDANAMANU<CR>"
  params: []

- id: hd_mode_query
  label: HD Radio Mode Status Query
  kind: query
  command: "TMHD?<CR>"
  params: []

- id: hd_status_query
  label: HD Radio Full Status Query
  kind: query
  command: "HD?<CR>"
  params: []

# ===== NS - Online Music / USB / iPod / Bluetooth =====
- id: ns_cursor_up
  label: Net/USB Cursor Up
  kind: action
  command: "NS90<CR>"
  params: []

- id: ns_cursor_down
  label: Net/USB Cursor Down
  kind: action
  command: "NS91<CR>"
  params: []

- id: ns_cursor_left
  label: Net/USB Cursor Left
  kind: action
  command: "NS92<CR>"
  params: []

- id: ns_cursor_right
  label: Net/USB Cursor Right
  kind: action
  command: "NS93<CR>"
  params: []

- id: ns_enter_play_pause
  label: Net/USB Enter (Play/Pause)
  kind: action
  command: "NS94<CR>"
  params: []

- id: ns_play
  label: Net/USB Play
  kind: action
  command: "NS9A<CR>"
  params: []

- id: ns_pause
  label: Net/USB Pause
  kind: action
  command: "NS9B<CR>"
  params: []

- id: ns_stop
  label: Net/USB Stop
  kind: action
  command: "NS9C<CR>"
  params: []

- id: ns_skip_plus
  label: Net/USB Skip Plus
  kind: action
  command: "NS9D<CR>"
  params: []

- id: ns_skip_minus
  label: Net/USB Skip Minus
  kind: action
  command: "NS9E<CR>"
  params: []

- id: ns_search_plus
  label: Net/USB Manual Search Plus
  kind: action
  command: "NS9F<CR>"
  params: []

- id: ns_search_minus
  label: Net/USB Manual Search Minus
  kind: action
  command: "NS9G<CR>"
  params: []

- id: ns_repeat_one
  label: Net/USB Repeat One
  kind: action
  command: "NS9H<CR>"
  params: []

- id: ns_repeat_all
  label: Net/USB Repeat All
  kind: action
  command: "NS9I<CR>"
  params: []

- id: ns_repeat_off
  label: Net/USB Repeat Off
  kind: action
  command: "NS9J<CR>"
  params: []

- id: ns_random_on
  label: Net/USB Random On / Shuffle Songs
  kind: action
  command: "NS9K<CR>"
  params: []

- id: ns_random_off
  label: Net/USB Random Off / Shuffle Off
  kind: action
  command: "NS9M<CR>"
  params: []

- id: ns_toggle_ipod_onscreen
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  command: "NS9W<CR>"
  params: []

- id: ns_page_next
  label: Net/USB Page Next
  kind: action
  command: "NS9X<CR>"
  params: []

- id: ns_page_previous
  label: Net/USB Page Previous
  kind: action
  command: "NS9Y<CR>"
  params: []

- id: ns_search_stop
  label: Net/USB Manual Search Stop
  kind: action
  command: "NS9Z<CR>"
  params: []

- id: ns_repeat_toggle
  label: Net/USB Repeat Toggle
  kind: action
  command: "NSRPT<CR>"
  params: []

- id: ns_random_toggle
  label: Net/USB Random Toggle
  kind: action
  command: "NSRND<CR>"
  params: []

- id: ns_preset_call
  label: Net/USB Preset Call
  kind: action
  command: "NSB{n}<CR>"
  params:
    - name: n
      type: string
      description: "00 to 35 (2014 AVR)"

- id: ns_preset_memory
  label: Net/USB Preset Memory
  kind: action
  command: "NSC{n}<CR>"
  params:
    - name: n
      type: string
      description: "00 to 35 (2014 AVR)"

- id: ns_preset_name_query
  label: Net Audio Preset Name Status Query (UTF-8)
  kind: query
  command: "NSH<CR>"
  params: []

- id: ns_favorites_mem
  label: Add Favorites Folder
  kind: action
  command: "NSFV MEM<CR>"
  params: []

- id: ns_display_info_ascii
  label: Request Onscreen Display Info (ASCII)
  kind: query
  command: "NSA<CR>"
  params: []

- id: ns_display_info_utf8
  label: Request Onscreen Display Info (UTF-8)
  kind: query
  command: "NSE<CR>"
  params: []

# ===== MN - System / Menu =====
- id: mn_cursor_up
  label: System Cursor Up
  kind: action
  command: "MNCUP<CR>"
  params: []

- id: mn_cursor_down
  label: System Cursor Down
  kind: action
  command: "MNCDN<CR>"
  params: []

- id: mn_cursor_left
  label: System Cursor Left
  kind: action
  command: "MNCLT<CR>"
  params: []

- id: mn_cursor_right
  label: System Cursor Right
  kind: action
  command: "MNCRT<CR>"
  params: []

- id: mn_enter
  label: System Enter
  kind: action
  command: "MNENT<CR>"
  params: []

- id: mn_return
  label: System RETURN
  kind: action
  command: "MNRTN<CR>"
  params: []

- id: mn_option
  label: System OPTION
  kind: action
  command: "MNOPT<CR>"
  params: []

- id: mn_info
  label: System INFO
  kind: action
  command: "MNINF<CR>"
  params: []

- id: mn_channel_level_menu
  label: Channel Level Adjust Menu On/Off
  kind: action
  command: "MNCHL<CR>"
  params: []

- id: mn_menu_on
  label: Setup Menu ON
  kind: action
  command: "MNMEN ON<CR>"
  params: []

- id: mn_menu_off
  label: Setup Menu OFF
  kind: action
  command: "MNMEN OFF<CR>"
  params: []

- id: mn_menu_query
  label: Setup Menu Status Query
  kind: query
  command: "MNMEN?<CR>"
  params: []

- id: mn_instaprevue_on
  label: InstaPrevue ON
  kind: action
  command: "MNPRV ON<CR>"
  params: []

- id: mn_instaprevue_off
  label: InstaPrevue OFF
  kind: action
  command: "MNPRV OFF<CR>"
  params: []

- id: mn_instaprevue_query
  label: InstaPrevue Status Query
  kind: query
  command: "MNPRV?<CR>"
  params: []

- id: mn_all_zone_stereo_on
  label: All Zone Stereo ON
  kind: action
  command: "MNZST ON<CR>"
  params: []

- id: mn_all_zone_stereo_off
  label: All Zone Stereo OFF
  kind: action
  command: "MNZST OFF<CR>"
  params: []

- id: mn_all_zone_stereo_query
  label: All Zone Stereo Status Query
  kind: query
  command: "MNZST?<CR>"
  params: []

# ===== SY - System Lock =====
- id: sy_remote_lock_on
  label: Remote Lock ON
  kind: action
  command: "SYREMOTE LOCK ON<CR>"
  params: []

- id: sy_remote_lock_off
  label: Remote Lock OFF
  kind: action
  command: "SYREMOTE LOCK OFF<CR>"
  params: []

- id: sy_panel_lock_on
  label: Panel Button Lock ON (except MASTER VOL)
  kind: action
  command: "SYPANEL LOCK ON<CR>"
  params: []

- id: sy_panel_vol_lock_on
  label: Panel Button & Master Vol Lock ON
  kind: action
  command: "SYPANEL+V LOCK ON<CR>"
  params: []

- id: sy_panel_lock_off
  label: Panel Button & Master Vol Lock OFF
  kind: action
  command: "SYPANEL LOCK OFF<CR>"
  params: []

# ===== TR - Trigger =====
- id: trigger1_on
  label: Trigger 1 ON
  kind: action
  command: "TR1 ON<CR>"
  params: []

- id: trigger1_off
  label: Trigger 1 OFF
  kind: action
  command: "TR1 OFF<CR>"
  params: []

- id: trigger2_on
  label: Trigger 2 ON
  kind: action
  command: "TR2 ON<CR>"
  params: []

- id: trigger2_off
  label: Trigger 2 OFF
  kind: action
  command: "TR2 OFF<CR>"
  params: []

- id: trigger_query
  label: Trigger Status Query
  kind: query
  command: "TR?<CR>"
  params: []

# ===== UG - Upgrade =====
- id: upgrade_idn
  label: Display Upgrade ID Number
  kind: action
  command: "UGIDN<CR>"
  params: []

# ===== RM - Remote Maintenance =====
- id: rm_start
  label: Remote Maintenance Mode Start
  kind: action
  command: "RM STA<CR>"
  params: []

- id: rm_end
  label: Remote Maintenance Mode End
  kind: action
  command: "RM END<CR>"
  params: []

- id: rm_query
  label: Remote Maintenance Status Query
  kind: query
  command: "RM ?<CR>"
  params: []

# ===== DIM - Dimmer =====
- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  command: "DIM BRI<CR>"
  params: []

- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM<CR>"
  params: []

- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  command: "DIM DAR<CR>"
  params: []

- id: dimmer_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF<CR>"
  params: []

- id: dimmer_select
  label: Dimmer Select Toggle (Bright→Dim→Dark→Off)
  kind: action
  command: "DIM SEL<CR>"
  params: []

- id: dimmer_query
  label: Dimmer Status Query
  kind: query
  command: "DIM ?<CR>"
  params: []

# ===== Additional Documented Commands =====
- id: pv_hue_up
  label: Hue Up
  kind: action
  command: "PVHUE UP<CR>"
  params: []

- id: pv_hue_down
  label: Hue Down
  kind: action
  command: "PVHUE DOWN<CR>"
  params: []

- id: ps_front_speaker_query_compact
  label: Front Speaker Status Query Compact
  kind: query
  command: "PSFRONT?<CR>"
  params: []

- id: z2_usb_direct_select
  label: Zone2 USB Direct Select
  kind: action
  command: "Z2USB DIRECT<CR>"
  params: []

- id: z2_ipod_direct_select
  label: Zone2 iPod Direct Select
  kind: action
  command: "Z2IPOD DIRECT<CR>"
  params: []

# ===== Additional Source MS Tokens =====
- id: surround_dsd_direct
  label: DSD Direct
  kind: action
  command: "MSDSD DIRECT<CR>"
  params: []

- id: surround_dsd_pure_direct
  label: DSD Pure Direct
  kind: action
  command: "MSDSD PURE DIRECT<CR>"
  params: []

- id: surround_dolby_pro_logic
  label: Dolby Pro Logic
  kind: action
  command: "MSDOLBY PRO LOGIC<CR>"
  params: []

- id: surround_dolby_pl2_c
  label: Dolby PL2 C
  kind: action
  command: "MSDOLBY PL2 C<CR>"
  params: []

- id: surround_dolby_pl2_m
  label: Dolby PL2 M
  kind: action
  command: "MSDOLBY PL2 M<CR>"
  params: []

- id: surround_dolby_pl2_g
  label: Dolby PL2 G
  kind: action
  command: "MSDOLBY PL2 G<CR>"
  params: []

- id: surround_dolby_pl2x_c
  label: Dolby PL2X C
  kind: action
  command: "MSDOLBY PL2X C<CR>"
  params: []

- id: surround_dolby_pl2x_m
  label: Dolby PL2X M
  kind: action
  command: "MSDOLBY PL2X M<CR>"
  params: []

- id: surround_dolby_pl2x_g
  label: Dolby PL2X G
  kind: action
  command: "MSDOLBY PL2X G<CR>"
  params: []

- id: surround_dolby_pl2z_h
  label: Dolby PL2Z H
  kind: action
  command: "MSDOLBY PL2Z H<CR>"
  params: []

- id: surround_dolby_surround
  label: Dolby Surround
  kind: action
  command: "MSDOLBY SURROUND<CR>"
  params: []

- id: surround_dolby_atmos
  label: Dolby Atmos
  kind: action
  command: "MSDOLBY ATMOS<CR>"
  params: []

- id: surround_dolby_d_ex
  label: Dolby D EX
  kind: action
  command: "MSDOLBY D EX<CR>"
  params: []

- id: surround_dolby_d_pl2x_c
  label: Dolby D Plus PL2X C
  kind: action
  command: "MSDOLBY D+PL2X C<CR>"
  params: []

- id: surround_dolby_d_pl2x_m
  label: Dolby D Plus PL2X M
  kind: action
  command: "MSDOLBY D+PL2X M<CR>"
  params: []

- id: surround_dolby_d_pl2z_h
  label: Dolby D Plus PL2Z H
  kind: action
  command: "MSDOLBY D+PL2Z H<CR>"
  params: []

- id: surround_dolby_d_ds
  label: Dolby D Plus DS
  kind: action
  command: "MSDOLBY D+DS<CR>"
  params: []

- id: surround_dolby_d_neo_x_c
  label: Dolby D Plus NEO:X C
  kind: action
  command: "MSDOLBY D+NEO:X C<CR>"
  params: []

- id: surround_dolby_d_neo_x_m
  label: Dolby D Plus NEO:X M
  kind: action
  command: "MSDOLBY D+NEO:X M<CR>"
  params: []

- id: surround_dolby_d_neo_x_g
  label: Dolby D Plus NEO:X G
  kind: action
  command: "MSDOLBY D+NEO:X G<CR>"
  params: []

- id: surround_dts_es_dscrt_61
  label: DTS ES DSCRT6.1
  kind: action
  command: "MSDTS ES DSCRT6.1<CR>"
  params: []

- id: surround_dts_es_mtrx_61
  label: DTS ES MTRX6.1
  kind: action
  command: "MSDTS ES MTRX6.1<CR>"
  params: []

- id: surround_dts_pl2x_c
  label: DTS Plus PL2X C
  kind: action
  command: "MSDTS+PL2X C<CR>"
  params: []

- id: surround_dts_pl2x_m
  label: DTS Plus PL2X M
  kind: action
  command: "MSDTS+PL2X M<CR>"
  params: []

- id: surround_dts_pl2z_h
  label: DTS Plus PL2Z H
  kind: action
  command: "MSDTS+PL2Z H<CR>"
  params: []

- id: surround_dts_ds
  label: DTS Plus DS
  kind: action
  command: "MSDTS+DS<CR>"
  params: []

- id: surround_dts_96_24
  label: DTS96/24
  kind: action
  command: "MSDTS96/24<CR>"
  params: []

- id: surround_dts_96_es_mtrx
  label: DTS96 ES MTRX
  kind: action
  command: "MSDTS96 ES MTRX<CR>"
  params: []

- id: surround_dts_neo_6
  label: DTS Plus NEO:6
  kind: action
  command: "MSDTS+NEO:6<CR>"
  params: []

- id: surround_dts_neo_x_c
  label: DTS Plus NEO:X C
  kind: action
  command: "MSDTS+NEO:X C<CR>"
  params: []

- id: surround_dts_neo_x_m
  label: DTS Plus NEO:X M
  kind: action
  command: "MSDTS+NEO:X M<CR>"
  params: []

- id: surround_dts_neo_x_g
  label: DTS Plus NEO:X G
  kind: action
  command: "MSDTS+NEO:X G<CR>"
  params: []

- id: surround_multi_ch_in
  label: Multi CH In
  kind: action
  command: "MSMULTI CH IN<CR>"
  params: []

- id: surround_m_ch_in_dolby_ex
  label: M CH In Plus Dolby EX
  kind: action
  command: "MSM CH IN+DOLBY EX<CR>"
  params: []

- id: surround_m_ch_in_pl2x_c
  label: M CH In Plus PL2X C
  kind: action
  command: "MSM CH IN+PL2X C<CR>"
  params: []

- id: surround_m_ch_in_pl2x_m
  label: M CH In Plus PL2X M
  kind: action
  command: "MSM CH IN+PL2X M<CR>"
  params: []

- id: surround_m_ch_in_pl2z_h
  label: M CH In Plus PL2Z H
  kind: action
  command: "MSM CH IN+PL2Z H<CR>"
  params: []

- id: surround_m_ch_in_ds
  label: M CH In Plus DS
  kind: action
  command: "MSM CH IN+DS<CR>"
  params: []

- id: surround_multi_ch_in_71
  label: Multi CH In 7.1
  kind: action
  command: "MSMULTI CH IN 7.1<CR>"
  params: []

- id: surround_m_ch_in_neo_x_c
  label: M CH In Plus NEO:X C
  kind: action
  command: "MSM CH IN+NEO:X C<CR>"
  params: []

- id: surround_m_ch_in_neo_x_m
  label: M CH In Plus NEO:X M
  kind: action
  command: "MSM CH IN+NEO:X M<CR>"
  params: []

- id: surround_m_ch_in_neo_x_g
  label: M CH In Plus NEO:X G
  kind: action
  command: "MSM CH IN+NEO:X G<CR>"
  params: []

- id: surround_dolby_d_plus
  label: Dolby D Plus
  kind: action
  command: "MSDOLBY D+<CR>"
  params: []

- id: surround_dolby_d_plus_ex
  label: Dolby D Plus With EX
  kind: action
  command: "MSDOLBY D+ +EX<CR>"
  params: []

- id: surround_dolby_d_plus_pl2x_c
  label: Dolby D Plus With PL2X C
  kind: action
  command: "MSDOLBY D+ +PL2X C<CR>"
  params: []

- id: surround_dolby_d_plus_pl2x_m
  label: Dolby D Plus With PL2X M
  kind: action
  command: "MSDOLBY D+ +PL2X M<CR>"
  params: []

- id: surround_dolby_d_plus_pl2z_h
  label: Dolby D Plus With PL2Z H
  kind: action
  command: "MSDOLBY D+ +PL2Z H<CR>"
  params: []

- id: surround_dolby_d_plus_ds
  label: Dolby D Plus With DS
  kind: action
  command: "MSDOLBY D+ +DS<CR>"
  params: []

- id: surround_dolby_d_plus_neo_x_c
  label: Dolby D Plus With NEO:X C
  kind: action
  command: "MSDOLBY D+ +NEO:X C<CR>"
  params: []

- id: surround_dolby_d_plus_neo_x_m
  label: Dolby D Plus With NEO:X M
  kind: action
  command: "MSDOLBY D+ +NEO:X M<CR>"
  params: []

- id: surround_dolby_d_plus_neo_x_g
  label: Dolby D Plus With NEO:X G
  kind: action
  command: "MSDOLBY D+ +NEO:X G<CR>"
  params: []

- id: surround_dolby_hd
  label: Dolby HD
  kind: action
  command: "MSDOLBY HD<CR>"
  params: []

- id: surround_dolby_hd_ex
  label: Dolby HD Plus EX
  kind: action
  command: "MSDOLBY HD+EX<CR>"
  params: []

- id: surround_dolby_hd_pl2x_c
  label: Dolby HD Plus PL2X C
  kind: action
  command: "MSDOLBY HD+PL2X C<CR>"
  params: []

- id: surround_dolby_hd_pl2x_m
  label: Dolby HD Plus PL2X M
  kind: action
  command: "MSDOLBY HD+PL2X M<CR>"
  params: []

- id: surround_dolby_hd_pl2z_h
  label: Dolby HD Plus PL2Z H
  kind: action
  command: "MSDOLBY HD+PL2Z H<CR>"
  params: []

- id: surround_dolby_hd_ds
  label: Dolby HD Plus DS
  kind: action
  command: "MSDOLBY HD+DS<CR>"
  params: []

- id: surround_dolby_hd_neo_x_c
  label: Dolby HD Plus NEO:X C
  kind: action
  command: "MSDOLBY HD+NEO:X C<CR>"
  params: []

- id: surround_dolby_hd_neo_x_m
  label: Dolby HD Plus NEO:X M
  kind: action
  command: "MSDOLBY HD+NEO:X M<CR>"
  params: []

- id: surround_dolby_hd_neo_x_g
  label: Dolby HD Plus NEO:X G
  kind: action
  command: "MSDOLBY HD+NEO:X G<CR>"
  params: []

- id: surround_dts_hd
  label: DTS HD
  kind: action
  command: "MSDTS HD<CR>"
  params: []

- id: surround_dts_hd_mstr
  label: DTS HD MSTR
  kind: action
  command: "MSDTS HD MSTR<CR>"
  params: []

- id: surround_dts_hd_pl2x_c
  label: DTS HD Plus PL2X C
  kind: action
  command: "MSDTS HD+PL2X C<CR>"
  params: []

- id: surround_dts_hd_pl2x_m
  label: DTS HD Plus PL2X M
  kind: action
  command: "MSDTS HD+PL2X M<CR>"
  params: []

- id: surround_dts_hd_pl2z_h
  label: DTS HD Plus PL2Z H
  kind: action
  command: "MSDTS HD+PL2Z H<CR>"
  params: []

- id: surround_dts_hd_ds
  label: DTS HD Plus DS
  kind: action
  command: "MSDTS HD+DS<CR>"
  params: []

- id: surround_dts_hd_neo_6
  label: DTS HD Plus NEO:6
  kind: action
  command: "MSDTS HD+NEO:6<CR>"
  params: []

- id: surround_dts_hd_neo_x_c
  label: DTS HD Plus NEO:X C
  kind: action
  command: "MSDTS HD+NEO:X C<CR>"
  params: []

- id: surround_dts_hd_neo_x_m
  label: DTS HD Plus NEO:X M
  kind: action
  command: "MSDTS HD+NEO:X M<CR>"
  params: []

- id: surround_dts_hd_neo_x_g
  label: DTS HD Plus NEO:X G
  kind: action
  command: "MSDTS HD+NEO:X G<CR>"
  params: []

- id: surround_dts_express
  label: DTS Express
  kind: action
  command: "MSDTS EXPRESS<CR>"
  params: []

- id: surround_dts_es_8ch_dscrt
  label: DTS ES 8CH DSCRT
  kind: action
  command: "MSDTS ES 8CH DSCRT<CR>"
  params: []

- id: surround_mpeg2_aac
  label: MPEG2 AAC
  kind: action
  command: "MSMPEG2 AAC<CR>"
  params: []

- id: surround_aac_dolby_ex
  label: AAC Plus Dolby EX
  kind: action
  command: "MSAAC+DOLBY EX<CR>"
  params: []

- id: surround_aac_pl2x_c
  label: AAC Plus PL2X C
  kind: action
  command: "MSAAC+PL2X C<CR>"
  params: []

- id: surround_aac_pl2x_m
  label: AAC Plus PL2X M
  kind: action
  command: "MSAAC+PL2X M<CR>"
  params: []

- id: surround_aac_pl2z_h
  label: AAC Plus PL2Z H
  kind: action
  command: "MSAAC+PL2Z H<CR>"
  params: []

- id: surround_aac_ds
  label: AAC Plus DS
  kind: action
  command: "MSAAC+DS<CR>"
  params: []

- id: surround_aac_neo_x_c
  label: AAC Plus NEO:X C
  kind: action
  command: "MSAAC+NEO:X C<CR>"
  params: []

- id: surround_aac_neo_x_m
  label: AAC Plus NEO:X M
  kind: action
  command: "MSAAC+NEO:X M<CR>"
  params: []

- id: surround_aac_neo_x_g
  label: AAC Plus NEO:X G
  kind: action
  command: "MSAAC+NEO:X G<CR>"
  params: []

- id: surround_pl_dsx
  label: PL DSX
  kind: action
  command: "MSPL DSX<CR>"
  params: []

- id: surround_pl2_c_dsx
  label: PL2 C DSX
  kind: action
  command: "MSPL2 C DSX<CR>"
  params: []

- id: surround_pl2_m_dsx
  label: PL2 M DSX
  kind: action
  command: "MSPL2 M DSX<CR>"
  params: []

- id: surround_pl2_g_dsx
  label: PL2 G DSX
  kind: action
  command: "MSPL2 G DSX<CR>"
  params: []

- id: surround_audyssey_dsx
  label: Audyssey DSX
  kind: action
  command: "MSAUDYSSEY DSX<CR>"
  params: []

- id: surround_dts_neo_6_c
  label: DTS NEO:6 C
  kind: action
  command: "MSDTS NEO:6 C<CR>"
  params: []

- id: surround_dts_neo_6_m
  label: DTS NEO:6 M
  kind: action
  command: "MSDTS NEO:6 M<CR>"
  params: []

- id: surround_dts_neo_x_c_direct
  label: DTS NEO:X C
  kind: action
  command: "MSDTS NEO:X C<CR>"
  params: []

- id: surround_dts_neo_x_m_direct
  label: DTS NEO:X M
  kind: action
  command: "MSDTS NEO:X M<CR>"
  params: []

- id: surround_dts_neo_x_g_direct
  label: DTS NEO:X G
  kind: action
  command: "MSDTS NEO:X G<CR>"
  params: []

# ===== Additional Literal Source Example =====
# The source prints PSLEE UP in the LFE UP example; preserve its spelling.
# UNRESOLVED: whether PSLEE is a source typo or an accepted command spelling.
- id: ps_lfe_up_source_spelling
  label: LFE Up Source Spelling
  kind: action
  command: "PSLEE UP<CR>"
  params: []
```

## Feedbacks
```yaml
# RESPONSE/EVENT messages mirror COMMAND form. Key observable states:
- id: power_state
  type: enum
  values: [ON, STANDBY]
  command_response: "PWON<CR> / PWSTANDBY<CR>"
  query_command: "PW?<CR>"

- id: master_volume_state
  type: string
  description: "00 to 98 (80=0dB, 00=MIN); 0.5dB step = 3 chars"
  command_response: "MV{value}<CR>"
  query_command: "MV?<CR>"

- id: channel_volume_state
  type: string
  description: "Per-channel level (38-62, 50=0dB); terminates with CVEND"
  command_response: "CV{channel} {value}<CR>"
  query_command: "CV?<CR>"

- id: mute_state
  type: enum
  values: [ON, OFF]
  command_response: "MUON<CR> / MUOFF<CR>"
  query_command: "MU?<CR>"

- id: input_source_state
  type: string
  command_response: "SI{source}<CR>"
  query_command: "SI?<CR>"

- id: surround_mode_state
  type: string
  description: "Returns active surround mode incl. codec-specific modes (DOLBY DIGITAL, DTS SURROUND, NEO:X, etc.)"
  command_response: "MS{mode}<CR>"
  query_command: "MS?<CR>"

- id: sleep_timer_state
  type: string
  command_response: "SLP{value}<CR> / SLPOFF<CR>"
  query_command: "SLP?<CR>"

- id: hd_radio_metadata
  type: string
  description: "HD status: BAND, STATION NAME, MULTI CAST, SIGNAL LEVEL (0-6), ARTIST, TITLE, ALBUM, GENRE, PROGRAM TYPE, MODE (DIGITAL/ANALOG)"
  command_response: "HD*<CR>"
  query_command: "HD?<CR>"

- id: trigger_state
  type: string
  command_response: "TR1 ON<CR> / TR2 ON<CR>"
  query_command: "TR?<CR>"

# UNRESOLVED: full per-zone and per-PS feedback enums not exhaustively enumerated

# ===== Additional Documented Status Tokens =====
# These source rows have no settable parameter or are explicitly status-only.
- id: signal_arc_state
  type: string
  description: "ARC token listed with the input signal status responses."
  command_response: "SDARC<CR>"
  query_command: "SD?<CR>"

- id: surround_71in_state
  type: string
  description: "7.1IN status token; the source marks its command parameter [-]."
  command_response: "MS7.1IN<CR>"
  query_command: "MS?<CR>"

- id: surround_pure_direct_ext_state
  type: string
  description: "PURE DIRECT EXT status token; the source marks its command parameter [-]."
  command_response: "MSPURE DIRECT EXT<CR>"
  query_command: "MS?<CR>"

- id: quick_select_zero_state
  type: string
  description: "QUICK0 status token; the source marks its command parameter [-]."
  command_response: "MSQUICK0<CR>"
  query_command: "MSQUICK ?<CR>"

- id: z2_quick_select_zero_state
  type: string
  description: "Zone2 QUICK0 status token; the source marks its command parameter [-]."
  command_response: "Z2QUICK0<CR>"
  query_command: "Z2QUICK ?<CR>"

- id: z3_quick_select_zero_state
  type: string
  description: "Zone3 QUICK0 status token; the source marks its command parameter [-]."
  command_response: "Z3QUICK0<CR>"
  query_command: "Z3QUICK ?<CR>"

- id: tuner_preset_off_state
  type: string
  description: "OFF token listed with the tuner preset status responses."
  command_response: "TPANOFF<CR>"
  query_command: "TPAN?<CR>"

- id: hd_preset_off_state
  type: string
  description: "OFF token listed with the HD preset status responses."
  command_response: "TPHDOFF<CR>"
  query_command: "TPHD?<CR>"

- id: ps_mode_height_state
  type: string
  description: "PL2z HEIGHT mode (EVENT only)."
  command_response: "PSMODE:HEIGHT<CR>"

- id: mn_instaprevue_unavailable_state
  type: string
  description: "status only (when InstaPrevue is not available)"
  command_response: "MNPRV NG<CR>"
  query_command: "MNPRV?<CR>"

- id: upgrade_id_number_state
  type: string
  description: "************:12-digit ID Number"
  command_response: "UGIDN************<CR>"

- id: upgrade_id_unavailable_state
  type: string
  description: "UNRESOLVED: meaning of NG not explicitly stated."
  command_response: "UGIDN NG<CR>"

- id: ns_preset_memory_result
  type: string
  description: "Preset memory response token."
  command_response: "NSCOK<CR>"
```

## Variables
```yaml
# Settable parameters exposed as continuous/range state (non-discrete).
- id: master_volume
  type: level
  range: "00-98 (80=0dB), 0.5dB step supported"
  unit: dB

- id: channel_volume
  type: level
  range: "38-62 (50=0dB); SW/SW2 also 00=MIN"

- id: zone2_volume
  type: level
  range: "00-98 (80=0dB)"

- id: zone3_volume
  type: level
  range: "00-98 (80=0dB)"

- id: bass
  type: level
  range: "00-99 (50=0dB; 44-56 = -6 to +6)"

- id: treble
  type: level
  range: "00-99 (50=0dB; 44-56 = -6 to +6)"

- id: audio_delay
  type: level
  range: "000-999 ms (operable 0-200)"
  unit: ms

- id: lfe_level
  type: level
  range: "00-99 (00=0dB; operable 0 to -10)"
  unit: dB
```

## Events
```yaml
# Unsolicited EVENT messages sent when device state changes (within 5s).
# EVENT form same as COMMAND. Key unsolicited events:
- id: event_input_source_change
  description: "SI{source}<CR> when input source changes"

- id: event_master_volume_change
  description: "MV{value}<CR> when master volume changes"

- id: event_mute_change
  description: "MUON/MUOFF<CR> when mute toggles"

- id: event_channel_volume_change
  description: "CV{channel} {value}<CR> - channel volumes change when input source changes"

- id: event_surround_mode_change
  description: "MS{mode}<CR> when surround mode changes (current mode returned before new mode)"

- id: event_power_change
  description: "PWON/PWSTANDBY<CR> when power state changes"
```

## Macros
```yaml
# No explicit multi-step macro sequences documented in source.
# UNRESOLVED: no macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
power_on_timing:
  note: "Send next COMMAND at least 1 second after transmitting PWON (power on command). Source note J."
command_interval:
  note: "Send COMMAND in 50ms or more intervals."
# UNRESOLVED: no explicit safety interlock or power-sequencing warnings beyond timing notes
```

## Notes
- Command structure: `COMMAND (2 ASCII chars) + PARAMETER (up to 25 chars) + CR (0x0D)`. Usable ASCII 0x20-0x7F plus 0x0D as pause.
- Half-duplex on both serial (RS-232C) and TCP (telnet port 23). Max message length 135 bytes.
- Volume encoding: 2-char PARAMETER normally; 0.5dB step uses 3 chars (e.g. `MV805`=+0.5dB, `MV795`=-0.5dB). Min volume defined as `00`.
- When input source changes, SURROUND MODE and CHANNEL VOLUME return as EVENT (only if they actually changed).
- RESPONSE required for any command that has a corresponding EVENT; not needed for commands without EVENT (e.g. `SV`).
- RESPONSE must be sent within 200ms of a request command; EVENT within 5 seconds of state change.
- Some sources/commands are region-specific (HDRADIO, PANDORA = North America; SPOTIFY = NA/EU).
- Several MS surround modes and PS sub-parameters apply only to specific AVR models / feature tiers (Auro-3D Upgrade required for AURO3D, AUROPR, AUROST, SHL/SHR/TS channels).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact MODELM1 sub-model variants and their command subset differences not enumerated -->
<!-- UNRESOLVED: full set of codec-specific MS response strings only partially enumerated (Dolby/DTS/NEO:X variants are response-driven) -->
<!-- UNRESOLVED: 0.5dB step 3-char volume encoding boundary details inferred from examples -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - marantz.com
  - rn.dmglobal.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/en_US/v1709469166640/archive-downloads/heos_cli_protocol_specification_290616.pdf
  - https://rn.dmglobal.com/usmodel/HEOS_CLI_ProtocolSpecification-Version-1.17.pdf
retrieved_at: 2026-08-15T11:26:06.211Z
last_checked_at: 2026-10-07T18:44:46.430Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:44:46.430Z
matched_actions: 536
action_count: 536
confidence: medium
summary: "All 536 action units map to command-table rows and transport values are supported. The source is a generic Control Protocol Ver.06 that never names MODELM1, so applicability to that model is not confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "exact MODELM1 sub-model variants not enumerated in source"
- "whether PSLEE is a source typo or an accepted command spelling."
- "full per-zone and per-PS feedback enums not exhaustively enumerated"
- "meaning of NG not explicitly stated.\""
- "no macros described in source"
- "no explicit safety interlock or power-sequencing warnings beyond timing notes"
- "exact MODELM1 sub-model variants and their command subset differences not enumerated"
- "full set of codec-specific MS response strings only partially enumerated (Dolby/DTS/NEO:X variants are response-driven)"
- "0.5dB step 3-char volume encoding boundary details inferred from examples"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
