---
spec_id: admin/marantz-sr8500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR8500 Control Spec"
manufacturer: Marantz
model_family: SR8500
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR8500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:42:32.670Z
last_checked_at: 2026-06-10T04:04:59.811Z
generated_at: 2026-06-10T04:04:59.811Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HD?"
  - "which surround modes, input sources, and zone features are specific to SR8500 vs other Marantz models in this protocol doc"
  - "firmware version compatibility"
  - "many PS sub-commands (DIL, FH, SP, PHG, LFC, CNTAMT, DSX, STW, STH, GEQ, BSC, DEH, LFL, EFF, DEL, PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, RSTR, FRONT, AUROPR, AUROST) and MN menu commands partially documented - source tables have OCR artifacts making some parameter values ambiguous"
  - "no explicit multi-step macro sequences documented in source"
  - "no explicit safety interlock procedures documented in source"
  - "which specific commands and features from this multi-model protocol doc apply to the SR8500"
  - "NS (Online Music / USB / iPod / Bluetooth) command set partially documented"
  - "MN (System/Menu) command set — cursor, setup menu, InstaPrevue, all zone stereo"
  - "HD Radio command set (TF HD*/TP HD*/TM HD*/HD?)"
  - "full PS parameter sub-command set (speaker config, Audyssey settings, room size, restorer, etc.)"
  - "REC SELECT (SR) command behavior — source notes ambiguity with ZONE2 mode"
  - "Quick Select / Favorite memory commands for zones and surround modes"
  - "Z2/Z3 bass/treble, channel setting, HPF, HDMI audio, sleep timer, auto standby sub-commands"
verification:
  verdict: verified
  checked_at: 2026-06-10T04:04:59.811Z
  matched_actions: 236
  action_count: 236
  confidence: medium
  summary: "All 236 spec actions match source write commands verbatim with correct shapes; only the standalone HD? metadata-status query (not backed by any write command) is absent from the spec, well within the 5-extra threshold. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR8500 Control Spec

## Summary
AV surround receiver supporting RS-232C serial and Ethernet (TCP telnet port 23) control. ASCII-based command protocol: 2-character command code + parameter + CR (0x0D). Covers power, volume, input selection, surround modes, zone 2/3, tuner, and system settings. Source document is a multi-model protocol reference (Control Protocol Ver.06); some commands may not apply to the SR8500 specifically.

<!-- UNRESOLVED: which surround modes, input sources, and zone features are specific to SR8500 vs other Marantz models in this protocol doc -->
<!-- UNRESOLVED: firmware version compatibility -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  connector: DB-9pin female (DCE)
  pinout:
    1: GND
    2: TxD
    3: RxD
    5: Common GND
    4_6_7_8_9: NC
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  duplex: half
  max_data_length: 135
addressing:
  port: 23
  transport: telnet
  duplex: half
  max_data_length: 135
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PW ON/STANDBY commands
  - queryable    # ? parameter returns status for most commands
  - routable     # SI command selects input source
  - levelable    # MV, CV volume/bass/treble control
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PWON
    params: []
    notes: Wait 1 second before sending next command after PWON

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
    label: Master Volume Set
    kind: action
    command: MV**
    params:
      - name: level
        type: string
        description: "Two-digit ASCII 00-98. 00=MIN(---), 80=0dB. 0.5dB steps use three digits (e.g. 805=+0.5dB)"
    notes: "Volume encoding: 00=---(MIN), 80=0dB, 98=+18dB. Half-dB step uses 3 ASCII chars."

  - id: channel_volume_up
    label: Channel Volume Up
    kind: action
    command: CV{CH} UP
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: Speaker channel code
    notes: "Range 38-62, 50=0dB. SW/SW2 range 00,38-62."

  - id: channel_volume_down
    label: Channel Volume Down
    kind: action
    command: CV{CH} DOWN
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: Speaker channel code

  - id: channel_volume_set
    label: Channel Volume Set
    kind: action
    command: CV{CH}**
    params:
      - name: channel
        type: enum
        values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
        description: Speaker channel code
      - name: level
        type: string
        description: "38-62 ASCII, 50=0dB"

  - id: channel_volume_reset
    label: Channel Volume Reset All
    kind: action
    command: CVZRL
    params: []
    notes: Resets all channel levels to factory defaults

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
    command: SI{SOURCE}
    params:
      - name: source
        type: enum
        values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
        description: Input source name

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

  - id: input_mode_set
    label: Set Input Mode
    kind: action
    command: SD{MODE}
    params:
      - name: mode
        type: enum
        values: [AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, "7.1IN", NO]
        description: Input mode selection (AUTO: HDMI>DIGITAL>ANALOG priority)

  - id: digital_input_set
    label: Set Digital Input Mode
    kind: action
    command: DC{MODE}
    params:
      - name: mode
        type: enum
        values: [AUTO, PCM, DTS]
        description: Digital input decode mode

  - id: surround_mode_set
    label: Set Surround Mode
    kind: action
    command: MS{MODE}
    params:
      - name: mode
        type: enum
        values: [MOVIE, MUSIC, GAME, DIRECT, "PURE DIRECT", STEREO, AUTO, "DOLBY DIGITAL", "DTS SURROUND", AURO3D, AURO2DSURR, "MCH STEREO", "WIDE SCREEN", "SUPER STADIUM", "ROCK ARENA", "JAZZ CLUB", "CLASSIC CONCERT", "MONO MOVIE", MATRIX, "VIDEO GAME", VIRTUAL, LEFT, RIGHT]
        description: Surround mode name

  - id: video_select_set
    label: Set Video Select
    kind: action
    command: SV{SOURCE}
    params:
      - name: source
        type: enum
        values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF]
        description: Video select source or ON/OFF

  - id: sleep_timer_set
    label: Set Sleep Timer
    kind: action
    command: SLP{VALUE}
    params:
      - name: minutes
        type: string
        description: "OFF or 001-120 ASCII (010=10min)"

  - id: auto_standby_set
    label: Set Auto Standby
    kind: action
    command: STBY{VALUE}
    params:
      - name: value
        type: enum
        values: [15M, 30M, 60M, OFF]

  - id: eco_mode_set
    label: Set Eco Mode
    kind: action
    command: ECO{VALUE}
    params:
      - name: value
        type: enum
        values: [ON, AUTO, OFF]

  - id: tone_control_set
    label: Set Tone Control
    kind: action
    command: PSTONE CTRL {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

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
    label: Bass Set
    kind: action
    command: PSBAS**
    params:
      - name: level
        type: string
        description: "00-99 ASCII, 50=0dB. AVR range -6 to +6 (44-56)"

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
    label: Treble Set
    kind: action
    command: PSTRE**
    params:
      - name: level
        type: string
        description: "00-99 ASCII, 50=0dB. AVR range -6 to +6 (44-56)"

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

  - id: dynamic_volume_set
    label: Set Dynamic Volume
    kind: action
    command: PSDYNVOL {VALUE}
    params:
      - name: value
        type: enum
        values: [HEV, MED, LIT, OFF]

  - id: multeq_set
    label: Set MultEQ Mode
    kind: action
    command: PSMULTEQ:{VALUE}
    params:
      - name: value
        type: enum
        values: [AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF]

  - id: drc_set
    label: Set Dynamic Compression
    kind: action
    command: PSDRC {VALUE}
    params:
      - name: value
        type: enum
        values: [AUTO, LOW, MID, HI, OFF]

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
    label: Audio Delay Set
    kind: action
    command: PSDELAY***
    params:
      - name: delay_ms
        type: string
        description: "000-999 ASCII, 000=0ms. Range 0-200ms"

  - id: lfe_set
    label: Set LFE Level
    kind: action
    command: PSLFE**
    params:
      - name: level
        type: string
        description: "00-99 ASCII, 00=0dB, 10=-10dB. Range 0 to -10dB"

  - id: picture_mode_set
    label: Set Picture Mode
    kind: action
    command: PV{VALUE}
    params:
      - name: value
        type: enum
        values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]

  - id: video_resolution_set
    label: Set Video Resolution
    kind: action
    command: VSSC{VALUE}
    params:
      - name: value
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

  - id: hdmi_monitor_set
    label: Set HDMI Monitor Output
    kind: action
    command: VSMONI{VALUE}
    params:
      - name: value
        type: enum
        values: [AUTO, 1, 2]

  - id: hdmi_audio_set
    label: Set HDMI Audio Output
    kind: action
    command: VSAUDIO {VALUE}
    params:
      - name: value
        type: enum
        values: [AMP, TV]

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
    label: Set Front Panel Dimmer
    kind: action
    command: DIM {VALUE}
    params:
      - name: value
        type: enum
        values: [BRI, DIM, DAR, OFF, SEL]
        description: "SEL cycles Bright>Dim>Dark>Off"

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
    command: Z2{SOURCE}
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
        description: Zone 2 source name

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
    command: Z2**
    params:
      - name: level
        type: string
        description: "00-98 ASCII, 80=0dB, 00=---(MIN)"

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
    command: Z3{SOURCE}
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
        description: Zone 3 source name

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
    command: Z3**
    params:
      - name: level
        type: string
        description: "00-98 ASCII, 80=0dB, 00=---(MIN)"

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

  - id: tuner_freq_up
    label: Tuner Frequency Up
    kind: action
    command: TFANUP
    params: []

  - id: tuner_freq_down
    label: Tuner Frequency Down
    kind: action
    command: TFANDOWN
    params: []

  - id: tuner_freq_set
    label: Tuner Frequency Set
    kind: action
    command: TFAN******
    params:
      - name: frequency
        type: string
        description: "6-digit ASCII. >050000=AM kHz, <050000=FM MHz"

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

  - id: tuner_preset_set
    label: Tuner Preset Select
    kind: action
    command: TPAN**
    params:
      - name: preset
        type: string
        description: "01-56 ASCII"

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
    label: Panel Lock On
    kind: action
    command: SYPANEL LOCK ON
    params: []
    notes: Locks panel buttons except master volume

  - id: panel_lock_off
    label: Panel Lock Off
    kind: action
    command: SYPANEL LOCK OFF
    params: []

  - id: panel_volume_lock_on
    label: Panel + Volume Lock On
    kind: action
    command: SYPANEL+V LOCK ON
    params: []
    notes: Locks panel buttons AND master volume

  # UNRESOLVED: many PS sub-commands (DIL, FH, SP, PHG, LFC, CNTAMT, DSX, STW, STH, GEQ, BSC, DEH, LFL, EFF, DEL, PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, RSTR, FRONT, AUROPR, AUROST) and MN menu commands partially documented - source tables have OCR artifacts making some parameter values ambiguous
  - id: zm_favorite_select
    label: Main Zone Favorite Select
    kind: action
    command: ZM{FAVORITE}
    params:
      - name: favorite
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: zm_favorite_memory
    label: Main Zone Favorite Memory
    kind: action
    command: ZM{FAVORITE} MEMORY
    params:
      - name: favorite
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: rec_select
    label: REC Select Source
    kind: action
    command: SR{SOURCE}
    params:
      - name: source
        type: enum
        values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, "SAT/CBL", MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]
        description: "SOURCE cancels REC mode; same parameter names as SI command"

  - id: ms_quick_select
    label: Quick Select Mode
    kind: action
    command: MS{PRESET}
    params:
      - name: preset
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: ms_quick_memory
    label: Quick Select Memory
    kind: action
    command: MS{PRESET} MEMORY
    params:
      - name: preset
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: vs_aspect_set
    label: Set Video Aspect Ratio
    kind: action
    command: VSASP{VALUE}
    params:
      - name: value
        type: enum
        values: [NRM, FUL]
        description: "NRM=4:3, FUL=16:9"

  - id: vs_resolution_hdmi_set
    label: Set HDMI-Specific Video Resolution
    kind: action
    command: VSSCH{VALUE}
    params:
      - name: value
        type: enum
        values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

  - id: vs_video_processing_set
    label: Set Video Processing Mode
    kind: action
    command: VSVPM{VALUE}
    params:
      - name: value
        type: enum
        values: [AUTO, GAME, MOVI]

  - id: vs_vertical_stretch_set
    label: Set Vertical Stretch
    kind: action
    command: VSVST {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_dialog_level_on
    label: Dialog Level Adjust On
    kind: action
    command: PSDIL ON
    params: []

  - id: ps_dialog_level_off
    label: Dialog Level Adjust Off
    kind: action
    command: PSDIL OFF
    params: []

  - id: ps_dialog_level_up
    label: Dialog Level Up
    kind: action
    command: PSDIL UP
    params: []

  - id: ps_dialog_level_down
    label: Dialog Level Down
    kind: action
    command: PSDIL DOWN
    params: []

  - id: ps_dialog_level_set
    label: Dialog Level Set
    kind: action
    command: PSDIL**
    params:
      - name: level
        type: string
        description: "38-62 ASCII, 50=0dB"

  - id: ps_subwoofer_level_up
    label: Subwoofer Level Up
    kind: action
    command: PSSWL UP
    params: []

  - id: ps_subwoofer_level_down
    label: Subwoofer Level Down
    kind: action
    command: PSSWL DOWN
    params: []

  - id: ps_subwoofer_level_set
    label: Subwoofer Level Set
    kind: action
    command: PSSWL**
    params:
      - name: level
        type: string
        description: "00,38-62 ASCII, 50=0dB"

  - id: ps_subwoofer2_level_up
    label: Subwoofer 2 Level Up
    kind: action
    command: PSSWL2 UP
    params: []

  - id: ps_subwoofer2_level_down
    label: Subwoofer 2 Level Down
    kind: action
    command: PSSWL2 DOWN
    params: []

  - id: ps_subwoofer2_level_set
    label: Subwoofer 2 Level Set
    kind: action
    command: PSSWL2**
    params:
      - name: level
        type: string
        description: "00,38-62 ASCII, 50=0dB"

  - id: ps_mode_set
    label: Set PL2/NEO Mode
    kind: action
    command: PSMODE:{VALUE}
    params:
      - name: value
        type: enum
        values: [MUSIC, CINEMA, GAME, "PRO LOGIC"]

  - id: ps_loudness_set
    label: Set Loudness Management
    kind: action
    command: PSLOM {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_front_height_set
    label: Set Front Height Output
    kind: action
    command: PSFH:{VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_speaker_output_set
    label: Set Speaker Output Configuration
    kind: action
    command: PSSP:{VALUE}
    params:
      - name: value
        type: enum
        values: [FW, FH, SB, HW, BH, BW, FL, HF, FR]

  - id: ps_phg_set
    label: Set PL2z Height Gain
    kind: action
    command: PSPHG {VALUE}
    params:
      - name: value
        type: enum
        values: [LOW, MID, HI]

  - id: ps_reference_level_offset_set
    label: Set Reference Level Offset
    kind: action
    command: PSREFLEV {VALUE}
    params:
      - name: value
        type: enum
        values: ["0", "5", "10", "15"]
        description: Reference level offset in dB

  - id: ps_lfc_set
    label: Set Audyssey LFC
    kind: action
    command: PSLFC {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_containment_amount_up
    label: Containment Amount Up
    kind: action
    command: PSCNTAMT UP
    params: []

  - id: ps_containment_amount_down
    label: Containment Amount Down
    kind: action
    command: PSCNTAMT DOWN
    params: []

  - id: ps_containment_amount_set
    label: Containment Amount Set
    kind: action
    command: PSCNTAMT**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 01-07"

  - id: ps_dsx_set
    label: Set Audyssey DSX
    kind: action
    command: PSDSX {VALUE}
    params:
      - name: value
        type: enum
        values: [ONHW, ONH, ONW, OFF]
        description: "ONHW=Height+Wide, ONH=Height, ONW=Width, OFF"

  - id: ps_stage_width_up
    label: Stage Width Up
    kind: action
    command: PSSTW UP
    params: []

  - id: ps_stage_width_down
    label: Stage Width Down
    kind: action
    command: PSSTW DOWN
    params: []

  - id: ps_stage_width_set
    label: Stage Width Set
    kind: action
    command: PSSTW**
    params:
      - name: level
        type: string
        description: "00-99 ASCII, 50=0dB; AVR range 40-60"

  - id: ps_stage_height_up
    label: Stage Height Up
    kind: action
    command: PSSTH UP
    params: []

  - id: ps_stage_height_down
    label: Stage Height Down
    kind: action
    command: PSSTH DOWN
    params: []

  - id: ps_stage_height_set
    label: Stage Height Set
    kind: action
    command: PSSTH**
    params:
      - name: level
        type: string
        description: "00-99 ASCII, 50=0dB; AVR range 40-60"

  - id: ps_graphic_eq_set
    label: Set Graphic EQ
    kind: action
    command: PSGEQ {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_bass_sync_up
    label: Bass Sync Up
    kind: action
    command: PSBSC UP
    params: []

  - id: ps_bass_sync_down
    label: Bass Sync Down
    kind: action
    command: PSBSC DOWN
    params: []

  - id: ps_bass_sync_set
    label: Bass Sync Set
    kind: action
    command: PSBSC**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 0-16"

  - id: ps_dialogue_enhancer_set
    label: Set Dialogue Enhancer
    kind: action
    command: PSDEH {VALUE}
    params:
      - name: value
        type: enum
        values: [OFF, LOW, MED, HIGH]

  - id: ps_lfl_set
    label: Set LFE Level EXT/7.1IN Mode
    kind: action
    command: PSLFL {VALUE}
    params:
      - name: value
        type: enum
        values: ["00", "05", "10", "15"]

  - id: ps_effect_on
    label: Effect On
    kind: action
    command: PSEFF ON
    params: []

  - id: ps_effect_off
    label: Effect Off
    kind: action
    command: PSEFF OFF
    params: []

  - id: ps_effect_up
    label: Effect Level Up
    kind: action
    command: PSEFF UP
    params: []

  - id: ps_effect_down
    label: Effect Level Down
    kind: action
    command: PSEFF DOWN
    params: []

  - id: ps_effect_set
    label: Effect Level Set
    kind: action
    command: PSEFF**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 1-15"

  - id: ps_pan_delay_up
    label: Pan Delay Up
    kind: action
    command: PSDEL UP
    params: []

  - id: ps_pan_delay_down
    label: Pan Delay Down
    kind: action
    command: PSDEL DOWN
    params: []

  - id: ps_pan_delay_set
    label: Pan Delay Set
    kind: action
    command: PSDEL***
    params:
      - name: delay_ms
        type: string
        description: "000-999 ASCII, 000=0ms; range 0-300ms"

  - id: ps_panorama_set
    label: Set Panorama
    kind: action
    command: PSPAN {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_dimension_up
    label: Dimension Up
    kind: action
    command: PSDIM UP
    params: []

  - id: ps_dimension_down
    label: Dimension Down
    kind: action
    command: PSDIM DOWN
    params: []

  - id: ps_dimension_set
    label: Dimension Set
    kind: action
    command: PSDIM**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 0-6"

  - id: ps_center_width_up
    label: Center Width Up
    kind: action
    command: PSCEN UP
    params: []

  - id: ps_center_width_down
    label: Center Width Down
    kind: action
    command: PSCEN DOWN
    params: []

  - id: ps_center_width_set
    label: Center Width Set
    kind: action
    command: PSCEN**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 0-7"

  - id: ps_center_image_up
    label: Center Image Up
    kind: action
    command: PSCEI UP
    params: []

  - id: ps_center_image_down
    label: Center Image Down
    kind: action
    command: PSCEI DOWN
    params: []

  - id: ps_center_image_set
    label: Center Image Set
    kind: action
    command: PSCEI**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 0.0-1.0"

  - id: ps_center_gain_up
    label: Center Gain Up
    kind: action
    command: PSCEG UP
    params: []

  - id: ps_center_gain_down
    label: Center Gain Down
    kind: action
    command: PSCEG DOWN
    params: []

  - id: ps_center_gain_set
    label: Center Gain Set
    kind: action
    command: PSCEG**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 0.0-1.0"

  - id: ps_center_spread_set
    label: Set Center Spread
    kind: action
    command: PSCES {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_subwoofer_sw_set
    label: Set SW Output Direct/Stereo Mode
    kind: action
    command: PSSWR {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: ps_room_size_set
    label: Set Room Size
    kind: action
    command: PSRSZ {VALUE}
    params:
      - name: value
        type: enum
        values: [S, MS, M, ML, L]

  - id: ps_restorer_set
    label: Set Audio Restorer
    kind: action
    command: PSRSTR {VALUE}
    params:
      - name: value
        type: enum
        values: [OFF, LOW, MED, HI]
        description: "LOW=MODE3, MED=MODE2, HI=MODE1"

  - id: ps_front_speaker_set
    label: Set Front Speaker Output
    kind: action
    command: PSFRONT {VALUE}
    params:
      - name: value
        type: enum
        values: [SPA, SPB, "A+B"]

  - id: ps_auro_preset_set
    label: Set Auro-3D Preset
    kind: action
    command: PSAUROPR {VALUE}
    params:
      - name: value
        type: enum
        values: [SMA, MED, LAR, SPE]

  - id: ps_auro_strength_up
    label: Auro-3D Strength Up
    kind: action
    command: PSAUROST UP
    params: []

  - id: ps_auro_strength_down
    label: Auro-3D Strength Down
    kind: action
    command: PSAUROST DOWN
    params: []

  - id: ps_auro_strength_set
    label: Auro-3D Strength Set
    kind: action
    command: PSAUROST**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; AVR range 1-16"

  - id: pv_contrast_up
    label: Contrast Up
    kind: action
    command: PVCN UP
    params: []

  - id: pv_contrast_down
    label: Contrast Down
    kind: action
    command: PVCN DOWN
    params: []

  - id: pv_contrast_set
    label: Contrast Set
    kind: action
    command: PVCN***
    params:
      - name: level
        type: string
        description: "000-100 ASCII, 050=0; AVR range 0-100"

  - id: pv_brightness_up
    label: Brightness Up
    kind: action
    command: PVBR UP
    params: []

  - id: pv_brightness_down
    label: Brightness Down
    kind: action
    command: PVBR DOWN
    params: []

  - id: pv_brightness_set
    label: Brightness Set
    kind: action
    command: PVBR***
    params:
      - name: level
        type: string
        description: "000-100 ASCII, 050=0; AVR range 0-100"

  - id: pv_saturation_up
    label: Saturation Up
    kind: action
    command: PVST UP
    params: []

  - id: pv_saturation_down
    label: Saturation Down
    kind: action
    command: PVST DOWN
    params: []

  - id: pv_saturation_set
    label: Saturation Set
    kind: action
    command: PVST***
    params:
      - name: level
        type: string
        description: "000-100 ASCII, 050=0; AVR range 0-100"

  - id: pv_hue_up
    label: Hue Up
    kind: action
    command: PVHUE UP
    params: []

  - id: pv_hue_down
    label: Hue Down
    kind: action
    command: PVHUE DOWN
    params: []

  - id: pv_hue_set
    label: Hue Set
    kind: action
    command: PVHUE**
    params:
      - name: level
        type: string
        description: "44-56 ASCII, 50=0; AVR range -6 to +6"

  - id: pv_dnr_set
    label: Set DNR Mode
    kind: action
    command: PVDNR {VALUE}
    params:
      - name: value
        type: enum
        values: [OFF, LOW, MID, HI]

  - id: pv_enhancer_up
    label: Enhancer Up
    kind: action
    command: PVENH UP
    params: []

  - id: pv_enhancer_down
    label: Enhancer Down
    kind: action
    command: PVENH DOWN
    params: []

  - id: pv_enhancer_set
    label: Enhancer Set
    kind: action
    command: PVENH***
    params:
      - name: level
        type: string
        description: "00-12 ASCII; AVR range 0-12"

  - id: z2_quick_select
    label: Zone 2 Quick Select
    kind: action
    command: Z2{PRESET}
    params:
      - name: preset
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: z2_quick_memory
    label: Zone 2 Quick Select Memory
    kind: action
    command: Z2{PRESET} MEMORY
    params:
      - name: preset
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: z2_favorite_select
    label: Zone 2 Favorite Select
    kind: action
    command: Z2{FAVORITE}
    params:
      - name: favorite
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: z2_favorite_memory
    label: Zone 2 Favorite Memory
    kind: action
    command: Z2{FAVORITE} MEMORY
    params:
      - name: favorite
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: z2_channel_set
    label: Zone 2 Channel Setting
    kind: action
    command: Z2CS{VALUE}
    params:
      - name: value
        type: enum
        values: [ST, MONO]

  - id: z2_channel_volume_up
    label: Zone 2 Channel Volume Up
    kind: action
    command: Z2CV{CH} UP
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: z2_channel_volume_down
    label: Zone 2 Channel Volume Down
    kind: action
    command: Z2CV{CH} DOWN
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: z2_channel_volume_set
    label: Zone 2 Channel Volume Set
    kind: action
    command: Z2CV{CH}**
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: level
        type: string
        description: "38-62 ASCII, 50=0dB"

  - id: z2_hpf_set
    label: Zone 2 HPF Set
    kind: action
    command: Z2HPF{VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: z2_bass_up
    label: Zone 2 Bass Up
    kind: action
    command: Z2PSBAS UP
    params: []

  - id: z2_bass_down
    label: Zone 2 Bass Down
    kind: action
    command: Z2PSBAS DOWN
    params: []

  - id: z2_bass_set
    label: Zone 2 Bass Set
    kind: action
    command: Z2PSBAS**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; range -10 to +10 (40-60)"

  - id: z2_treble_up
    label: Zone 2 Treble Up
    kind: action
    command: Z2PSTRE UP
    params: []

  - id: z2_treble_down
    label: Zone 2 Treble Down
    kind: action
    command: Z2PSTRE DOWN
    params: []

  - id: z2_treble_set
    label: Zone 2 Treble Set
    kind: action
    command: Z2PSTRE**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; range -10 to +10 (40-60)"

  - id: z2_hdmi_audio_set
    label: Zone 2 HDMI Audio Output
    kind: action
    command: Z2HDA {VALUE}
    params:
      - name: value
        type: enum
        values: [THR, PCM]
        description: "THR=Through, PCM=PCM"

  - id: z2_sleep_timer_set
    label: Zone 2 Sleep Timer Set
    kind: action
    command: Z2SLP{VALUE}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 ASCII"

  - id: z2_auto_standby_set
    label: Zone 2 Auto Standby Set
    kind: action
    command: Z2STBY{VALUE}
    params:
      - name: value
        type: enum
        values: [2H, 4H, 8H, OFF]

  - id: z3_quick_select
    label: Zone 3 Quick Select
    kind: action
    command: Z3{PRESET}
    params:
      - name: preset
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: z3_quick_memory
    label: Zone 3 Quick Select Memory
    kind: action
    command: Z3{PRESET} MEMORY
    params:
      - name: preset
        type: enum
        values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

  - id: z3_favorite_select
    label: Zone 3 Favorite Select
    kind: action
    command: Z3{FAVORITE}
    params:
      - name: favorite
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: z3_favorite_memory
    label: Zone 3 Favorite Memory
    kind: action
    command: Z3{FAVORITE} MEMORY
    params:
      - name: favorite
        type: enum
        values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]

  - id: z3_channel_set
    label: Zone 3 Channel Setting
    kind: action
    command: Z3CS{VALUE}
    params:
      - name: value
        type: enum
        values: [ST, MONO]

  - id: z3_channel_volume_up
    label: Zone 3 Channel Volume Up
    kind: action
    command: Z3CV{CH} UP
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: z3_channel_volume_down
    label: Zone 3 Channel Volume Down
    kind: action
    command: Z3CV{CH} DOWN
    params:
      - name: channel
        type: enum
        values: [FL, FR]

  - id: z3_channel_volume_set
    label: Zone 3 Channel Volume Set
    kind: action
    command: Z3CV{CH}**
    params:
      - name: channel
        type: enum
        values: [FL, FR]
      - name: level
        type: string
        description: "38-62 ASCII, 50=0dB"

  - id: z3_hpf_set
    label: Zone 3 HPF Set
    kind: action
    command: Z3HPF{VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: z3_bass_up
    label: Zone 3 Bass Up
    kind: action
    command: Z3PSBAS UP
    params: []

  - id: z3_bass_down
    label: Zone 3 Bass Down
    kind: action
    command: Z3PSBAS DOWN
    params: []

  - id: z3_bass_set
    label: Zone 3 Bass Set
    kind: action
    command: Z3PSBAS**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; range -10 to +10 (40-60)"

  - id: z3_treble_up
    label: Zone 3 Treble Up
    kind: action
    command: Z3PSTRE UP
    params: []

  - id: z3_treble_down
    label: Zone 3 Treble Down
    kind: action
    command: Z3PSTRE DOWN
    params: []

  - id: z3_treble_set
    label: Zone 3 Treble Set
    kind: action
    command: Z3PSTRE**
    params:
      - name: level
        type: string
        description: "00-99 ASCII; range -10 to +10 (40-60)"

  - id: z3_sleep_timer_set
    label: Zone 3 Sleep Timer Set
    kind: action
    command: Z3SLP{VALUE}
    params:
      - name: value
        type: string
        description: "OFF or 001-120 ASCII"

  - id: z3_auto_standby_set
    label: Zone 3 Auto Standby Set
    kind: action
    command: Z3STBY{VALUE}
    params:
      - name: value
        type: enum
        values: [2H, 4H, 8H, OFF]

  - id: tuner_preset_memory
    label: Tuner Preset Memory Toggle
    kind: action
    command: TPANMEM
    params: []
    notes: "Use TPANMEM, select channel, then TPANMEM again to confirm"

  - id: tuner_preset_memory_direct
    label: Tuner Preset Memory Direct
    kind: action
    command: TPANMEM**
    params:
      - name: preset
        type: string
        description: "01-56 ASCII"

  - id: tuner_mode_set
    label: Set Tuner or HD Radio Mode
    kind: action
    command: TM{VALUE}
    params:
      - name: value
        type: enum
        values: [ANAUTO, ANMANUAL, HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU]
        description: "AN*=standard tuner; HDAM/HDFM=HD band; HD*=HD tuning mode"

  - id: hd_freq_up
    label: HD Radio Frequency Up
    kind: action
    command: TFHDUP
    params: []

  - id: hd_freq_down
    label: HD Radio Frequency Down
    kind: action
    command: TFHDDOWN
    params: []

  - id: hd_freq_set
    label: HD Radio Frequency Set
    kind: action
    command: TFHD******
    params:
      - name: frequency
        type: string
        description: "6-digit ASCII; >050000=AM kHz, <050000=FM MHz"

  - id: hd_multicast_select
    label: HD Radio Multicast Channel Select
    kind: action
    command: TFHDMC*
    params:
      - name: channel
        type: string
        description: "1 digit: 1-8=multicast channel, 0=analog"

  - id: hd_freq_multicast_set
    label: HD Radio Frequency and Multicast Set
    kind: action
    command: TFHD******MC*
    params:
      - name: freq_mc
        type: string
        description: "6-digit freq + MC + 1-digit channel, e.g. TFHD008750MC5"

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

  - id: hd_preset_set
    label: HD Radio Preset Select
    kind: action
    command: TPHD**
    params:
      - name: preset
        type: string
        description: "01-56 ASCII"

  - id: hd_preset_memory
    label: HD Radio Preset Memory Toggle
    kind: action
    command: TPHDMEM
    params: []

  - id: hd_preset_memory_direct
    label: HD Radio Preset Memory Direct
    kind: action
    command: TPHDMEM**
    params:
      - name: preset
        type: string
        description: "01-56 ASCII"

  - id: ns_navigation
    label: Online Music/USB Navigation Control
    kind: action
    command: NS{CODE}
    params:
      - name: code
        type: enum
        values: ["90", "91", "92", "93", "94", "9A", "9B", "9C", "9D", "9E", "9F", "9G", "9H", "9I", "9J", "9K", "9M", "9W", "9X", "9Y", "9Z"]
        description: "90=Up 91=Dn 92=Lt 93=Rt 94=Enter 9A=Play 9B=Pause 9C=Stop 9D=SkipFwd 9E=SkipRev 9H=RepeatOne 9I=RepeatAll 9J=RepeatOff 9K=RndOn 9M=RndOff 9X=PageNext 9Y=PagePrev 9Z=SearchStop"

  - id: ns_repeat_toggle
    label: Online Music Repeat Toggle
    kind: action
    command: NSRPT
    params: []

  - id: ns_random_toggle
    label: Online Music Random Toggle
    kind: action
    command: NSRND
    params: []

  - id: ns_preset_call
    label: Online Music Preset Call
    kind: action
    command: NSB**
    params:
      - name: preset
        type: string
        description: "00-35 ASCII"

  - id: ns_preset_memory
    label: Online Music Preset Memory
    kind: action
    command: NSC**
    params:
      - name: preset
        type: string
        description: "00-35 ASCII"

  - id: ns_preset_name_query
    label: Online Music Preset Name Query
    kind: query
    command: NSH
    params: []
    notes: "Returns NSH00-NSH35 with 20-char UTF-8 preset names"

  - id: ns_favorites_add
    label: Add Favorites Folder
    kind: action
    command: NSFV MEM
    params: []

  - id: ns_display_info_ascii
    label: Request On-Screen Display Info ASCII
    kind: query
    command: NSA
    params: []
    notes: "Returns NSA0-NSA8, 96-byte ASCII lines with cursor/playable flags"

  - id: ns_display_info_utf8
    label: Request On-Screen Display Info UTF-8
    kind: query
    command: NSE
    params: []
    notes: "Returns NSE0-NSE8, 96-byte UTF-8 lines"

  - id: mn_cursor
    label: Menu Cursor Navigation
    kind: action
    command: MN{DIRECTION}
    params:
      - name: direction
        type: enum
        values: [CUP, CDN, CLT, CRT]
        description: "CUP=Up CDN=Down CLT=Left CRT=Right"

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

  - id: mn_channel_level_adjust
    label: Channel Level Adjust Menu Toggle
    kind: action
    command: MNCHL
    params: []

  - id: mn_setup_menu_set
    label: Set Setup Menu
    kind: action
    command: MNMEN {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: mn_instaprevue_set
    label: Set InstaPrevue
    kind: action
    command: MNPRV {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: mn_all_zone_stereo_set
    label: Set All Zone Stereo
    kind: action
    command: MNZST {VALUE}
    params:
      - name: value
        type: enum
        values: [ON, OFF]

  - id: remote_maintenance_set
    label: Remote Maintenance Mode
    kind: action
    command: RM {VALUE}
    params:
      - name: value
        type: enum
        values: [STA, END]

  - id: upgrade_id_display
    label: Display Upgrade ID Number
    kind: action
    command: UGIDN
    params: []
    notes: "Displays 12-digit ID on FL Display for firmware upgrade"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: PW?
    type: enum
    values: [ON, STANDBY]
    response: PWON or PWSTANDBY

  - id: master_volume
    label: Master Volume Level
    command: MV?
    type: string
    response: "MV** where ** = 00-98 (80=0dB). Three chars for 0.5dB step."
    notes: 00=MIN(---), 80=0dB, 98=+18dB

  - id: mute_state
    label: Mute State
    command: MU?
    type: enum
    values: [ON, OFF]

  - id: input_source
    label: Current Input Source
    command: SI?
    type: string
    response: "SI*** where *** = source name (e.g. SIDVD)"

  - id: main_zone_state
    label: Main Zone State
    command: ZM?
    type: enum
    values: [ON, OFF]

  - id: input_mode
    label: Input Mode
    command: SD?
    type: string
    response: "SD*** (AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO, ARC)"

  - id: digital_input_mode
    label: Digital Input Mode
    command: DC?
    type: string
    response: "DC*** (AUTO, PCM, DTS)"

  - id: surround_mode
    label: Surround Mode
    command: MS?
    type: string
    response: "MS*** full surround mode name"

  - id: video_select
    label: Video Select State
    command: SV?
    type: string
    response: "SV*** and SVON/SVOFF"

  - id: sleep_timer
    label: Sleep Timer
    command: SLP?
    type: string
    response: "SLP*** (OFF or 001-120)"

  - id: auto_standby
    label: Auto Standby
    command: STBY?
    type: string
    response: "STBY*** (15M, 30M, 60M, OFF)"

  - id: eco_mode
    label: Eco Mode
    command: ECO?
    type: string
    response: "ECO*** (ON, AUTO, OFF)"

  - id: channel_volume
    label: Channel Volume Status
    command: CV?
    type: string
    response: "CV** ** per channel ending with CVEND. Only speakers in current configuration reply."

  - id: video_resolution
    label: Video Resolution
    command: VSSC ?
    type: string

  - id: hdmi_monitor
    label: HDMI Monitor Output
    command: VSMONI ?
    type: string

  - id: hdmi_audio
    label: HDMI Audio Output
    command: VSAUDIO ?
    type: string

  - id: trigger_status
    label: Trigger Status
    command: TR?
    type: string
    response: "TR1 ON/OFF and TR2 ON/OFF"

  - id: dimmer_status
    label: Dimmer Status
    command: DIM ?
    type: string
    response: "DIM BRI/DIM/DAR/OFF"

  - id: zone2_state
    label: Zone 2 State
    command: Z2?
    type: string
    response: "Z2ON/Z2OFF or SR** if REC mode selected"

  - id: zone2_mute
    label: Zone 2 Mute
    command: Z2MU?
    type: enum
    values: [ON, OFF]

  - id: zone3_state
    label: Zone 3 State
    command: Z3?
    type: string
    response: "Z3ON/Z3OFF"

  - id: zone3_mute
    label: Zone 3 Mute
    command: Z3MU?
    type: enum
    values: [ON, OFF]

  - id: tuner_frequency
    label: Tuner Frequency
    command: TFAN?
    type: string
    response: "TFAN****** (6-digit frequency)"

  - id: tuner_preset
    label: Tuner Preset
    command: TPAN?
    type: string
    response: "TPAN** or TPANOFF"

  - id: tuner_rds_name
    label: RDS Station Name
    command: TFANNAME?
    type: string
    response: "TFANNAME******** or TFANNAME + spaces if NULL"
    notes: EU/AP models only
```

## Variables
```yaml
variables:
  - id: master_volume_db
    label: Master Volume (dB)
    type: string
    range: "--- to +18.0dB"
    encoding: "00=MIN, 80=0dB, 98=+18dB. 0.5dB step = 3 ASCII chars (e.g. 795=-0.5dB)"
    command_prefix: MV

  - id: zone2_volume_db
    label: Zone 2 Volume (dB)
    type: string
    encoding: "00=MIN, 80=0dB, 98=+18dB"
    command_prefix: Z2

  - id: zone3_volume_db
    label: Zone 3 Volume (dB)
    type: string
    encoding: "00=MIN, 80=0dB, 98=+18dB"
    command_prefix: Z3
```

## Events
```yaml
events:
  - id: state_change_event
    label: State Change Event
    description: >-
      Sent from AVR to controller when device state changes from front panel or IR.
      Same format as COMMAND. Sent within 5 seconds of state change.
      Covers: PW, MV, CV, MU, SI, ZM, MS, SD, SV, SLP, STBY, ECO, VS, PS, Z2, Z3.
    format: "COMMAND + PARAMETER + CR"

  - id: input_source_change_event
    label: Input Source Change Event
    description: >-
      When input source changes, channel volume and surround mode events return
      if they differ from previous source. If same, no event returned.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after PWON before sending next command (note J in source)"
  - description: "Send COMMAND at 50ms or greater intervals"
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- Command format: 2-character ASCII command + ASCII parameter (up to 25 chars) + CR (0x0D).
- ASCII range 0x20-0x7F plus 0x0D (carriage return) as terminator.
- Commands receivable during EVENT transmission (note A).
- When input source changes, channel volume and surround mode may emit events if different from prior source (notes B-F).
- Volume encoding is non-linear: `00` = --- (MIN), `80` = 0dB. Half-dB steps use 3-digit parameter (e.g. `805` = +0.5dB, `795` = -0.5dB).
- Source document (Control Protocol Ver.06) covers multiple Marantz models; not all commands/features may apply to the SR8500 specifically.
- Some PS (parameter setting) sub-commands, MN (menu) commands, and NS (network/USB) commands have partial or ambiguous documentation due to OCR artifacts in the source table.
- Request commands use `?` as parameter; response sent within 200ms.

<!-- UNRESOLVED: which specific commands and features from this multi-model protocol doc apply to the SR8500 -->
<!-- UNRESOLVED: NS (Online Music / USB / iPod / Bluetooth) command set partially documented -->
<!-- UNRESOLVED: MN (System/Menu) command set — cursor, setup menu, InstaPrevue, all zone stereo -->
<!-- UNRESOLVED: HD Radio command set (TF HD*/TP HD*/TM HD*/HD?) -->
<!-- UNRESOLVED: full PS parameter sub-command set (speaker config, Audyssey settings, room size, restorer, etc.) -->
<!-- UNRESOLVED: firmware version compatibility -->
<!-- UNRESOLVED: REC SELECT (SR) command behavior — source notes ambiguity with ZONE2 mode -->
<!-- UNRESOLVED: Quick Select / Favorite memory commands for zones and surround modes -->
<!-- UNRESOLVED: Z2/Z3 bass/treble, channel setting, HPF, HDMI audio, sleep timer, auto standby sub-commands -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:42:32.670Z
last_checked_at: 2026-06-10T04:04:59.811Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T04:04:59.811Z
matched_actions: 236
action_count: 236
confidence: medium
summary: "All 236 spec actions match source write commands verbatim with correct shapes; only the standalone HD? metadata-status query (not backed by any write command) is absent from the spec, well within the 5-extra threshold. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HD?"
- "which surround modes, input sources, and zone features are specific to SR8500 vs other Marantz models in this protocol doc"
- "firmware version compatibility"
- "many PS sub-commands (DIL, FH, SP, PHG, LFC, CNTAMT, DSX, STW, STH, GEQ, BSC, DEH, LFL, EFF, DEL, PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, RSTR, FRONT, AUROPR, AUROST) and MN menu commands partially documented - source tables have OCR artifacts making some parameter values ambiguous"
- "no explicit multi-step macro sequences documented in source"
- "no explicit safety interlock procedures documented in source"
- "which specific commands and features from this multi-model protocol doc apply to the SR8500"
- "NS (Online Music / USB / iPod / Bluetooth) command set partially documented"
- "MN (System/Menu) command set — cursor, setup menu, InstaPrevue, all zone stereo"
- "HD Radio command set (TF HD*/TP HD*/TM HD*/HD?)"
- "full PS parameter sub-command set (speaker config, Audyssey settings, room size, restorer, etc.)"
- "REC SELECT (SR) command behavior — source notes ambiguity with ZONE2 mode"
- "Quick Select / Favorite memory commands for zones and surround modes"
- "Z2/Z3 bass/treble, channel setting, HPF, HDMI audio, sleep timer, auto standby sub-commands"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
