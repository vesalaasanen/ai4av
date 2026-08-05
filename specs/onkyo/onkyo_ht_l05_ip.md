---
spec_id: admin/onkyo-ht-l05
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo HT-L05 Control Spec"
manufacturer: Onkyo
model_family: HT-L05
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - HT-L05
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T20:35:53.620Z
last_checked_at: 2026-07-21T23:41:23.711Z
generated_at: 2026-07-21T23:41:23.711Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SWL (Subwoofer temporary Level set/UP/DOWN)"
  - "CTL (Center temporary Level set/UP/DOWN)"
  - "ASCTG (CDV aspect toggle, unsupported on all listed models)"
  - "CDPCD (CDV chain repeat, unsupported on all listed models)"
  - "MSPUP/MSPDN (CDV multi speed, unsupported)"
  - "PCT (CDV picture control, unsupported)"
  - "RSCTG (CDV resolution toggle, unsupported)"
  - "INIT (CDV factory reset, unsupported)"
  - "exact HT-L05 firmware version compatibility not stated"
  - "HT-L05 is not listed in the revision history model tables; per-command applicability to HT-L05 specifically is unclear. Many commands below are model-conditional (XM/SIRIUS/HD Radio/Japanese/Network-only) and may not apply to HT-L05"
  - "configurable range 49152-65535 per source; default is 60128"
  - "no explicit multi-step macro sequences in source"
  - "no explicit safety warnings or interlock procedures stated in source"
  - "exact command subset supported by HT-L05 not stated — source lists many models across columns; HT-L05 not explicitly named in the revision history"
  - "firmware version compatibility not stated"
  - "many commands are model-conditional (XM/SIRIUS/HD Radio/Network/Japanese) and HT-L05 support for them is unconfirmed"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:41:23.711Z
  matched_actions: 415
  action_count: 415
  confidence: medium
  summary: "Near-exhaustive one-to-one mapping of the ISCP/eISCP command catalogue (main+zone2/3/4+RI-bus) with verbatim command-code and parameter matches and verified transport params; only a handful of universally-unsupported source tokens are unrepresented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Onkyo HT-L05 Control Spec

## Summary
The Onkyo HT-L05 is an AV receiver controllable via the Integra Serial Communication Protocol (ISCP) over TCP/IP (eISCP) and over RS-232C. The protocol uses 3-character command codes with variable-length parameters. This spec covers the eISCP over Ethernet transport layer, the RS-232C serial transport, and the core receiver command set documented in the ISCP protocol specification v1.15, including main-zone, Zone2, Zone3 and Zone4 command groups plus RI-bus relay commands.

<!-- UNRESOLVED: exact HT-L05 firmware version compatibility not stated -->
<!-- UNRESOLVED: HT-L05 is not listed in the revision history model tables; per-command applicability to HT-L05 specifically is unclear. Many commands below are model-conditional (XM/SIRIUS/HD Radio/Japanese/Network-only) and may not apply to HT-L05 -->

## Transport
```yaml
# Source documents both eISCP over Ethernet (TCP) and ISCP over RS-232C.
protocols:
  - tcp
  - serial
addressing:
  port: 60128
  # UNRESOLVED: configurable range 49152-65535 per source; default is 60128
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # 3-wire RS-232C, DB9 female (pin 2 TX, pin 3 RX, pin 5 GND), straight-thru cable
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from PWR power on/off/standby commands
- routable  # inferred from SLI input selector commands
- queryable  # inferred from QSTN query parameter on multiple commands
- levelable  # inferred from MVL master volume commands
```

## Actions
```yaml
# ===================================================================
# MAIN ZONE - Power / Muting
# ===================================================================
- id: power_standby
  label: Power Standby
  kind: action
  command: PWR00
  description: Sets system to standby
  params: []

- id: power_on
  label: Power On
  kind: action
  command: PWR01
  description: Sets system on
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: AMT00
  description: Sets audio muting off
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: AMT01
  description: Sets audio muting on
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: AMTTG
  description: Sets audio muting wrap-around
  params: []

# ===================================================================
# MAIN ZONE - Speaker A/B / Layout (model-conditional)
# ===================================================================
- id: speaker_a_off
  label: Speaker A Off
  kind: action
  command: SPA00
  description: Sets Speaker A Off (SPA=MAIN A on some models, Front A on others)
  params: []

- id: speaker_a_on
  label: Speaker A On
  kind: action
  command: SPA01
  description: Sets Speaker A On
  params: []

- id: speaker_a_up
  label: Speaker A Wrap-Around Up
  kind: action
  command: SPAUP
  description: Sets Speaker A switch wrap-around up
  params: []

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  command: SPB00
  description: Sets Speaker B Off (SPB=MAIN B on some models, Front B on others)
  params: []

- id: speaker_b_on
  label: Speaker B On
  kind: action
  command: SPB01
  description: Sets Speaker B On
  params: []

- id: speaker_b_up
  label: Speaker B Wrap-Around Up
  kind: action
  command: SPBUP
  description: Sets Speaker B switch wrap-around up
  params: []

- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  command: SPL{layout}
  description: "Sets speaker layout: SB=SurrBack, FH=Front High (or SurrBack+Front High), FW=Front Wide (or SurrBack+Front Wide)"
  params:
    - name: layout
      type: string
      description: "SB, FH, FW, or UP (wrap-around)"

# ===================================================================
# MAIN ZONE - Master Volume
# ===================================================================
- id: master_volume_set
  label: Set Master Volume
  kind: action
  command: MVL{level}
  description: Sets volume level (hex 00-64, decimal 0-100)
  params:
    - name: level
      type: string
      description: Volume level in hex (00-64 for 0-100)

- id: master_volume_up
  label: Volume Up
  kind: action
  command: MVLUP
  description: Sets volume level up
  params: []

- id: master_volume_down
  label: Volume Down
  kind: action
  command: MVLDOWN
  description: Sets volume level down
  params: []

# ===================================================================
# MAIN ZONE - Tone (Front / Front Wide / Front High / Center / Surround / SurrBack / Subwoofer)
# ===================================================================
- id: tone_front_bass_up
  label: Front Bass Up
  kind: action
  command: TFRBUP
  description: Sets Front Bass up (2 step)
  params: []

- id: tone_front_bass_down
  label: Front Bass Down
  kind: action
  command: TFRBDOWN
  description: Sets Front Bass down (2 step)
  params: []

- id: tone_front_treble_up
  label: Front Treble Up
  kind: action
  command: TFRTUP
  description: Sets Front Treble up (2 step)
  params: []

- id: tone_front_treble_down
  label: Front Treble Down
  kind: action
  command: TFRTDOWN
  description: Sets Front Treble down (2 step)
  params: []

- id: tone_front_wide_bass_set
  label: Set Front Wide Bass
  kind: action
  command: TFWB{xx}
  description: "Front Wide Bass (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Bass level code

- id: tone_front_wide_treble_set
  label: Set Front Wide Treble
  kind: action
  command: TFWT{xx}
  description: "Front Wide Treble (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Treble level code

- id: tone_front_wide_bass_up
  label: Front Wide Bass Up
  kind: action
  command: TFWBUP
  description: Sets Front Wide Bass up (2 step)
  params: []

- id: tone_front_wide_bass_down
  label: Front Wide Bass Down
  kind: action
  command: TFWBDOWN
  description: Sets Front Wide Bass down (2 step)
  params: []

- id: tone_front_wide_treble_up
  label: Front Wide Treble Up
  kind: action
  command: TFWTUP
  description: Sets Front Wide Treble up (2 step)
  params: []

- id: tone_front_wide_treble_down
  label: Front Wide Treble Down
  kind: action
  command: TFWTDOWN
  description: Sets Front Wide Treble down (2 step)
  params: []

- id: tone_front_high_bass_set
  label: Set Front High Bass
  kind: action
  command: TFHB{xx}
  description: "Front High Bass (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Bass level code

- id: tone_front_high_treble_set
  label: Set Front High Treble
  kind: action
  command: TFHT{xx}
  description: "Front High Treble (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Treble level code

- id: tone_front_high_bass_up
  label: Front High Bass Up
  kind: action
  command: TFHBUP
  description: Sets Front High Bass up (2 step)
  params: []

- id: tone_front_high_bass_down
  label: Front High Bass Down
  kind: action
  command: TFHBDOWN
  description: Sets Front High Bass down (2 step)
  params: []

- id: tone_front_high_treble_up
  label: Front High Treble Up
  kind: action
  command: TFHTUP
  description: Sets Front High Treble up (2 step)
  params: []

- id: tone_front_high_treble_down
  label: Front High Treble Down
  kind: action
  command: TFHTDOWN
  description: Sets Front High Treble down (2 step)
  params: []

- id: tone_center_bass_set
  label: Set Center Bass
  kind: action
  command: TCTB{xx}
  description: "Center Bass (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Bass level code

- id: tone_center_treble_set
  label: Set Center Treble
  kind: action
  command: TCTT{xx}
  description: "Center Treble (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Treble level code

- id: tone_center_bass_up
  label: Center Bass Up
  kind: action
  command: TCTBUP
  description: Sets Center Bass up (2 step)
  params: []

- id: tone_center_bass_down
  label: Center Bass Down
  kind: action
  command: TCTBDOWN
  description: Sets Center Bass down (2 step)
  params: []

- id: tone_center_treble_up
  label: Center Treble Up
  kind: action
  command: TCTTUP
  description: Sets Center Treble up (2 step)
  params: []

- id: tone_center_treble_down
  label: Center Treble Down
  kind: action
  command: TCTTDOWN
  description: Sets Center Treble down (2 step)
  params: []

- id: tone_surround_bass_set
  label: Set Surround Bass
  kind: action
  command: TSRB{xx}
  description: "Surround Bass (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Bass level code

- id: tone_surround_treble_set
  label: Set Surround Treble
  kind: action
  command: TSRT{xx}
  description: "Surround Treble (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Treble level code

- id: tone_surround_bass_up
  label: Surround Bass Up
  kind: action
  command: TSRBUP
  description: Sets Surround Bass up (2 step)
  params: []

- id: tone_surround_bass_down
  label: Surround Bass Down
  kind: action
  command: TSRBDOWN
  description: Sets Surround Bass down (2 step)
  params: []

- id: tone_surround_treble_up
  label: Surround Treble Up
  kind: action
  command: TSRTUP
  description: Sets Surround Treble up (2 step)
  params: []

- id: tone_surround_treble_down
  label: Surround Treble Down
  kind: action
  command: TSRTDOWN
  description: Sets Surround Treble down (2 step)
  params: []

- id: tone_surround_back_bass_set
  label: Set Surround Back Bass
  kind: action
  command: TSBB{xx}
  description: "Surround Back Bass (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Bass level code

- id: tone_surround_back_treble_set
  label: Set Surround Back Treble
  kind: action
  command: TSBT{xx}
  description: "Surround Back Treble (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Treble level code

- id: tone_surround_back_bass_up
  label: Surround Back Bass Up
  kind: action
  command: TSBBUP
  description: Sets Surround Back Bass up (2 step)
  params: []

- id: tone_surround_back_bass_down
  label: Surround Back Bass Down
  kind: action
  command: TSBBDOWN
  description: Sets Surround Back Bass down (2 step)
  params: []

- id: tone_surround_back_treble_up
  label: Surround Back Treble Up
  kind: action
  command: TSBTUP
  description: Sets Surround Back Treble up (2 step)
  params: []

- id: tone_surround_back_treble_down
  label: Surround Back Treble Down
  kind: action
  command: TSBTDOWN
  description: Sets Surround Back Treble down (2 step)
  params: []

- id: tone_subwoofer_bass_set
  label: Set Subwoofer Tone
  kind: action
  command: TSWB{xx}
  description: "Subwoofer Bass (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Bass level code

- id: tone_subwoofer_bass_up
  label: Subwoofer Bass Up
  kind: action
  command: TSWBUP
  description: Sets Subwoofer Bass up (2 step)
  params: []

- id: tone_subwoofer_bass_down
  label: Subwoofer Bass Down
  kind: action
  command: TSWBDOWN
  description: Sets Subwoofer Bass down (2 step)
  params: []

# ===================================================================
# MAIN ZONE - Sleep / Speaker Calibration
# ===================================================================
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: SLP{time}
  description: Sets sleep timer (hex 01-5A for 1-90 min), OFF to disable
  params:
    - name: time
      type: string
      description: "Sleep time in hex (01-5A for 1-90min), OFF to disable, UP for wrap-around"

- id: speaker_calibration_test
  label: Speaker Calibration Test
  kind: action
  command: SLCTEST
  description: Speaker level calibration test tone key
  params: []

- id: speaker_calibration_ch_select
  label: Speaker Calibration CH Select
  kind: action
  command: SLCCHSEL
  description: Channel select during calibration
  params: []

- id: speaker_calibration_level_up
  label: Speaker Calibration Level Up
  kind: action
  command: SLCUP
  description: Level up during calibration
  params: []

- id: speaker_calibration_level_down
  label: Speaker Calibration Level Down
  kind: action
  command: SLCDOWN
  description: Level down during calibration
  params: []

# ===================================================================
# MAIN ZONE - Display / Dimmer
# ===================================================================
- id: display_info_program
  label: Display Program Format
  kind: action
  command: DIF00
  description: "Display Information: program format (temporary display)"
  params: []

- id: display_info_digital_input
  label: Display Digital Input Position
  kind: action
  command: DIF01
  description: "Display Information: digital input position (temporary display)"
  params: []

- id: display_info_digital_format
  label: Display Digital Format
  kind: action
  command: DIF02
  description: "Display Information: digital format (temporary display)"
  params: []

- id: display_info_bass
  label: Display Bass Level
  kind: action
  command: DIF03
  description: "Display Information: bass level (temporary display)"
  params: []

- id: display_info_treble
  label: Display Treble Level
  kind: action
  command: DIF04
  description: "Display Information: treble level (temporary display)"
  params: []

- id: display_mode_set
  label: Set Display Mode
  kind: action
  command: DIF{mode}
  description: Sets display mode
  params:
    - name: mode
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, TG=wrap-around"

- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  command: DIM{level}
  description: Sets front panel dimmer level
  params:
    - name: level
      type: string
      description: "Dimmer level. 00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF, DIM=wrap-around"

# ===================================================================
# MAIN ZONE - OSD Setup Operation
# ===================================================================
- id: osd_menu
  label: OSD Menu
  kind: action
  command: OSDMENU
  description: Opens on-screen display menu
  params: []

- id: osd_up
  label: OSD Up
  kind: action
  command: OSDUP
  description: OSD navigation up
  params: []

- id: osd_down
  label: OSD Down
  kind: action
  command: OSDDOWN
  description: OSD navigation down
  params: []

- id: osd_right
  label: OSD Right
  kind: action
  command: OSDRIGHT
  description: OSD navigation right
  params: []

- id: osd_left
  label: OSD Left
  kind: action
  command: OSDLEFT
  description: OSD navigation left
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  command: OSDENTER
  description: OSD enter/select
  params: []

- id: osd_exit
  label: OSD Exit
  kind: action
  command: OSDEXIT
  description: OSD exit
  params: []

- id: osd_audio
  label: OSD Audio Adjust
  kind: action
  command: OSDAUDIO
  description: Audio adjust key
  params: []

- id: osd_video
  label: OSD Video Adjust
  kind: action
  command: OSDVIDEO
  description: Video adjust key
  params: []

# ===================================================================
# MAIN ZONE - Memory Setup
# ===================================================================
- id: memory_store
  label: Memory Store
  kind: action
  command: MEMSTR
  description: Stores memory
  params: []

- id: memory_recall
  label: Memory Recall
  kind: action
  command: MEMRCL
  description: Recalls memory
  params: []

- id: memory_lock
  label: Memory Lock
  kind: action
  command: MEMLOCK
  description: Locks memory
  params: []

- id: memory_unlock
  label: Memory Unlock
  kind: action
  command: MEMUNLK
  description: Unlocks memory
  params: []

# ===================================================================
# MAIN ZONE - Input / Record Output / Audio Selectors
# ===================================================================
- id: select_input
  label: Select Input
  kind: action
  command: SLI{input}
  description: Selects input source
  params:
    - name: input
      type: string
      description: >
        Input code in hex. Known values: 00=VCR/DVR, 01=CBL/SAT,
        02=GAME/TV, 03=AUX1, 04=AUX2, 05=VIDEO6, 06=VIDEO7,
        10=DVD, 20=TAPE, 21=TAPE2, 22=PHONO, 23=CD, 24=FM,
        25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO,
        29=USB, 2A=USB Rear, 30=MULTI CH, 31=XM, 32=SIRIUS,
        40=Universal PORT

- id: input_up
  label: Input Selector Up
  kind: action
  command: SLIUP
  description: Sets selector position wrap-around up
  params: []

- id: input_down
  label: Input Selector Down
  kind: action
  command: SLIDOWN
  description: Sets selector position wrap-around down
  params: []

- id: select_audio
  label: Select Audio Input
  kind: action
  command: SLA{input}
  description: Selects audio input source
  params:
    - name: input
      type: string
      description: >
        Audio input code. 00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG,
        03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE

- id: recout_select
  label: Select Record Output
  kind: action
  command: SLR{input}
  description: Selects record output source
  params:
    - name: input
      type: string
      description: >
        Same input codes as SLI. 7F=OFF, 80=SOURCE

# ===================================================================
# MAIN ZONE - Listening Mode / Late Night / Surround filters
# ===================================================================
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  command: LMD{mode}
  description: Sets listening mode
  params:
    - name: mode
      type: string
      description: >
        Mode code in hex. Common values: 00=STEREO, 01=DIRECT,
        02=SURROUND, 03=FILM, 04=THX, 05=ACTION, 06=MUSICAL,
        07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX,
        0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL,
        0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX,
        13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Surround Sensation,
        16=Audyssey DSX, 40=5.1ch/Straight Decode, 41=Dolby EX/DTS ES,
        42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games,
        50-52=U2/S2 Cinema/Music/Games, 80=PLII/PLIIx Movie,
        81=PLII/PLIIx Music, 82=Neo:6 Cinema, 83=Neo:6 Music,
        84=PLII/PLIIx THX Cinema, 85=Neo:6 THX Cinema, 86=PLII/PLIIx Game,
        87=Neural Surr, 88=Neural THX/Neural Surround, 89-8F=THX Games/Music/Cinema variants,
        90=PLIIz Height, 91-93=Neo:6/Neural Sensation/Digital Music,
        94-99=PLIIz Height + THX variants, A0-A7=PLIIx/Neo:6/Neural + Audyssey DSX.
        Also MOVIE/MUSIC/GAME wrap-around

- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  command: LMDUP
  description: Sets listening mode wrap-around up
  params: []

- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  command: LMDDOWN
  description: Sets listening mode wrap-around down
  params: []

- id: late_night_set
  label: Set Late Night Mode
  kind: action
  command: LTN{level}
  description: Sets late night compression level
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low (Dolby Digital)/On (TrueHD), 02=High (Dolby Digital), 03=Auto (TrueHD), UP=wrap-around"

- id: reeq_set
  label: Set Re-EQ / Academy / Cinema Filter
  kind: action
  command: RAS{level}
  description: "Re-EQ/Academy Filter (older models: 00=Both Off,01=Re-EQ On,02=Academy On). Re-EQ only (00=Off,01=On). Cinema Filter (00=Off,01=On). UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00/01/02/UP depending on model generation"

- id: audyssey_multeq_set
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  command: ADY{level}
  description: "00=Off, 01=On, UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00, 01, or UP"

- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  command: ADQ{level}
  description: "00=Off, 01=On, UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00, 01, or UP"

- id: audyssey_dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  command: ADV{level}
  description: "00=Off, 01=Light, 02=Medium, 03=Heavy, UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00, 01, 02, 03, or UP"

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  command: DVL{level}
  description: "00=Off, 01=Low, 02=Mid, 03=High, UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00, 01, 02, 03, or UP"

- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  command: MOT{level}
  description: "00=Off, 01=On, UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00, 01, or UP"

# ===================================================================
# MAIN ZONE - Video Output (model-conditional)
# ===================================================================
- id: video_output_select
  label: Video Output Selector (Japanese Model Only)
  kind: action
  command: VOS{mode}
  description: "00=D4, 01=Component"
  params:
    - name: mode
      type: string
      description: "00 or 01 (Japanese model only)"

- id: hdmi_output_select
  label: HDMI Output Select
  kind: action
  command: HDO{mode}
  description: Selects HDMI output routing
  params:
    - name: mode
      type: string
      description: "00=Analog only, 01=HDMI Main, 02=HDMI Sub, 03=Both, 04=Both(Main), 05=Both(Sub), UP=wrap-around"

- id: resolution_set
  label: Set Monitor Out Resolution
  kind: action
  command: RES{mode}
  description: Sets monitor output resolution
  params:
    - name: mode
      type: string
      description: "00=Through, 01=Auto(HDMI), 02=480p, 03=720p, 04=1080i, 05=1080p(HDMI), 06=Source, 07=1080p/24fs(HDMI), UP=wrap-around"

- id: isf_mode_set
  label: Set ISF Mode
  kind: action
  command: ISF{mode}
  description: "00=Custom, 01=Day, 02=Night, UP=wrap-around"
  params:
    - name: mode
      type: string
      description: "00, 01, 02, or UP"

# ===================================================================
# MAIN ZONE - 12V Triggers
# ===================================================================
- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  command: TGA01
  description: Sets 12V Trigger A On
  params: []

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  command: TGA00
  description: Sets 12V Trigger A Off
  params: []

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  command: TGB01
  description: Sets 12V Trigger B On
  params: []

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  command: TGB00
  description: Sets 12V Trigger B Off
  params: []

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  command: TGC01
  description: Sets 12V Trigger C On
  params: []

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  command: TGC00
  description: Sets 12V Trigger C Off
  params: []

# ===================================================================
# MAIN ZONE - Tuner (Tuner Pack Model Only)
# ===================================================================
- id: tuning_set
  label: Set Tuning Frequency
  kind: action
  command: TUN{freq}
  description: "Directly tunes frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch; put 0 in first two digits at XM)"
  params:
    - name: freq
      type: string
      description: Frequency value as 5-digit string

- id: tuning_up
  label: Tuning Up
  kind: action
  command: TUNUP
  description: Sets tuning frequency wrap-around up
  params: []

- id: tuning_down
  label: Tuning Down
  kind: action
  command: TUNDOWN
  description: Sets tuning frequency wrap-around down
  params: []

- id: preset_set
  label: Set Preset Number
  kind: action
  command: PRS{preset}
  description: "Sets preset number (01-28 hex for 1-40, or 01-1E hex for 1-30 depending on model)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

- id: preset_up
  label: Preset Up
  kind: action
  command: PRSUP
  description: Sets preset number wrap-around up
  params: []

- id: preset_down
  label: Preset Down
  kind: action
  command: PRSDOWN
  description: Sets preset number wrap-around down
  params: []

- id: preset_memory
  label: Preset Memory
  kind: action
  command: PRM{preset}
  description: "Stores preset (01-28 hex for 1-40, or 01-1E hex for 1-30)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

- id: rds_info_select
  label: Select RDS Information
  kind: action
  command: RDS{mode}
  description: "00=RT Information, 01=PTY Information, 02=TP Information, UP=wrap-around (RDS Model Only)"
  params:
    - name: mode
      type: string
      description: "00, 01, 02, or UP"

- id: pty_scan_set
  label: Set PTY Scan Number
  kind: action
  command: PTS{no}
  description: "Sets PTY No 0-30 (00-1E hex) (RDS Model Only)"
  params:
    - name: "no"
      type: string
      description: PTY number in hex

- id: pty_scan_finish
  label: Finish PTY Scan
  kind: action
  command: PTSENTER
  description: Finishes PTY scan
  params: []

- id: tp_scan_start
  label: Start TP Scan
  kind: action
  command: TPS
  description: Starts TP scan (no parameter) (RDS Model Only)
  params: []

- id: tp_scan_finish
  label: Finish TP Scan
  kind: action
  command: TPSENTER
  description: Finishes TP scan
  params: []

# ===================================================================
# MAIN ZONE - XM (XM Model Only)
# ===================================================================
- id: xm_channel_set
  label: Set XM Channel
  kind: action
  command: XCH{no}
  description: "Sets XM channel 000-255 (XM Model Only)"
  params:
    - name: "no"
      type: string
      description: Channel number 000-255

- id: xm_channel_up
  label: XM Channel Up
  kind: action
  command: XCHUP
  description: Sets XM channel wrap-around up
  params: []

- id: xm_channel_down
  label: XM Channel Down
  kind: action
  command: XCHDOWN
  description: Sets XM channel wrap-around down
  params: []

- id: xm_category_up
  label: XM Category Up
  kind: action
  command: XCTUP
  description: Sets XM category wrap-around up
  params: []

- id: xm_category_down
  label: XM Category Down
  kind: action
  command: XCTDOWN
  description: Sets XM category wrap-around down
  params: []

# ===================================================================
# MAIN ZONE - SIRIUS (SIRIUS Model Only)
# ===================================================================
- id: sirius_channel_set
  label: Set SIRIUS Channel
  kind: action
  command: SCH{no}
  description: "Sets SIRIUS channel 000-255 (SIRIUS Model Only)"
  params:
    - name: "no"
      type: string
      description: Channel number 000-255

- id: sirius_channel_up
  label: SIRIUS Channel Up
  kind: action
  command: SCHUP
  description: Sets SIRIUS channel wrap-around up
  params: []

- id: sirius_channel_down
  label: SIRIUS Channel Down
  kind: action
  command: SCHDOWN
  description: Sets SIRIUS channel wrap-around down
  params: []

- id: sirius_category_up
  label: SIRIUS Category Up
  kind: action
  command: SCTUP
  description: Sets SIRIUS category wrap-around up
  params: []

- id: sirius_category_down
  label: SIRIUS Category Down
  kind: action
  command: SCTDOWN
  description: Sets SIRIUS category wrap-around down
  params: []

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  command: SLK{password}
  description: "Sets SIRIUS lock password (4 digits) (SIRIUS Model Only)"
  params:
    - name: password
      type: string
      description: 4-digit lock password

# ===================================================================
# MAIN ZONE - HD Radio (HD Radio Model Only)
# ===================================================================
- id: hd_radio_program_set
  label: Set HD Radio Channel Program
  kind: action
  command: HPR{no}
  description: "Sets HD Radio channel program 01-08 (HD Radio Model Only)"
  params:
    - name: "no"
      type: string
      description: Program number 01-08

- id: hd_radio_blend_set
  label: Set HD Radio Blend Mode
  kind: action
  command: HBL{mode}
  description: "00=Auto, 01=Analog (HD Radio Model Only)"
  params:
    - name: mode
      type: string
      description: "00 or 01"

# ===================================================================
# MAIN ZONE - Network / USB Operation (Network Model Only)
# ===================================================================
- id: network_play
  label: Network Play
  kind: action
  command: NTCPLAY
  description: Network/USB play key
  params: []

- id: network_stop
  label: Network Stop
  kind: action
  command: NTCSTOP
  description: Network/USB stop key
  params: []

- id: network_pause
  label: Network Pause
  kind: action
  command: NTCPAUSE
  description: Network/USB pause key
  params: []

- id: network_track_up
  label: Network Track Up
  kind: action
  command: NTCTRUP
  description: Network/USB track up
  params: []

- id: network_track_down
  label: Network Track Down
  kind: action
  command: NTCTRDN
  description: Network/USB track down
  params: []

- id: network_ff
  label: Network FF
  kind: action
  command: NTCFF
  description: "Network/USB FF key (CONTINUOUS - must be sent repeatedly, no more than 100ms between codes)"
  params: []

- id: network_rew
  label: Network REW
  kind: action
  command: NTCREW
  description: "Network/USB REW key (CONTINUOUS - must be sent repeatedly, no more than 100ms between codes)"
  params: []

- id: network_repeat
  label: Network Repeat
  kind: action
  command: NTCREPEAT
  description: Network/USB repeat key
  params: []

- id: network_random
  label: Network Random
  kind: action
  command: NTCRANDOM
  description: Network/USB random key
  params: []

- id: network_display
  label: Network Display
  kind: action
  command: NTCDISPLAY
  description: Network/USB display key
  params: []

- id: network_album
  label: Network Album Key
  kind: action
  command: NTCALBUM
  description: Network/USB album key
  params: []

- id: network_artist
  label: Network Artist Key
  kind: action
  command: NTCARTIST
  description: Network/USB artist key
  params: []

- id: network_genre
  label: Network Genre Key
  kind: action
  command: NTCGENRE
  description: Network/USB genre key
  params: []

- id: network_playlist
  label: Network Playlist Key
  kind: action
  command: NTCPLAYLIST
  description: Network/USB playlist key
  params: []

- id: network_right
  label: Network Right Key
  kind: action
  command: NTCRIGHT
  description: Network/USB right key
  params: []

- id: network_left
  label: Network Left Key
  kind: action
  command: NTCLEFT
  description: Network/USB left key
  params: []

- id: network_up
  label: Network Up Key
  kind: action
  command: NTCUP
  description: Network/USB up key
  params: []

- id: network_down
  label: Network Down Key
  kind: action
  command: NTCDOWN
  description: Network/USB down key
  params: []

- id: network_select
  label: Network Select Key
  kind: action
  command: NTCSELECT
  description: Network/USB select key
  params: []

- id: network_key_0
  label: Network 0 Key
  kind: action
  command: NTC0
  description: Network/USB 0 key
  params: []

- id: network_key_1
  label: Network 1 Key
  kind: action
  command: NTC1
  description: Network/USB 1 key
  params: []

- id: network_key_2
  label: Network 2 Key
  kind: action
  command: NTC2
  description: Network/USB 2 key
  params: []

- id: network_key_3
  label: Network 3 Key
  kind: action
  command: NTC3
  description: Network/USB 3 key
  params: []

- id: network_key_4
  label: Network 4 Key
  kind: action
  command: NTC4
  description: Network/USB 4 key
  params: []

- id: network_key_5
  label: Network 5 Key
  kind: action
  command: NTC5
  description: Network/USB 5 key
  params: []

- id: network_key_6
  label: Network 6 Key
  kind: action
  command: NTC6
  description: Network/USB 6 key
  params: []

- id: network_key_7
  label: Network 7 Key
  kind: action
  command: NTC7
  description: Network/USB 7 key
  params: []

- id: network_key_8
  label: Network 8 Key
  kind: action
  command: NTC8
  description: Network/USB 8 key
  params: []

- id: network_key_9
  label: Network 9 Key
  kind: action
  command: NTC9
  description: Network/USB 9 key
  params: []

- id: network_delete
  label: Network Delete Key
  kind: action
  command: NTCDELETE
  description: Network/USB delete key
  params: []

- id: network_caps
  label: Network Caps Key
  kind: action
  command: NTCCAPS
  description: Network/USB caps key
  params: []

- id: network_location
  label: Network Location Key
  kind: action
  command: NTCLOCATION
  description: Network/USB location key
  params: []

- id: network_language
  label: Network Language Key
  kind: action
  command: NTCLANGUAGE
  description: Network/USB language key
  params: []

- id: network_setup
  label: Network Setup Key
  kind: action
  command: NTCSETUP
  description: Network/USB setup key
  params: []

- id: network_return
  label: Network Return Key
  kind: action
  command: NTCRETURN
  description: Network/USB return key
  params: []

- id: network_ch_up
  label: Network Channel Up (iRadio)
  kind: action
  command: NTCCHUP
  description: Channel up for internet radio
  params: []

- id: network_ch_down
  label: Network Channel Down (iRadio)
  kind: action
  command: NTCCHDN
  description: Channel down for internet radio
  params: []

- id: internet_radio_preset
  label: Internet Radio Preset
  kind: action
  command: NPR{preset}
  description: "Sets internet radio preset 01-28 hex for 1-40"
  params:
    - name: preset
      type: string
      description: Preset number in hex

# ===================================================================
# ZONE 2 COMMANDS
# ===================================================================
- id: zone2_power_standby
  label: Zone2 Power Standby
  kind: action
  command: ZPW00
  description: Sets Zone2 to standby
  params: []

- id: zone2_power_on
  label: Zone2 Power On
  kind: action
  command: ZPW01
  description: Sets Zone2 on
  params: []

- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  command: ZMT00
  description: Sets Zone2 muting off
  params: []

- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  command: ZMT01
  description: Sets Zone2 muting on
  params: []

- id: zone2_mute_toggle
  label: Zone2 Mute Toggle
  kind: action
  command: ZMTTG
  description: Sets Zone2 muting wrap-around
  params: []

- id: zone2_volume_set
  label: Set Zone2 Volume
  kind: action
  command: ZVL{level}
  description: "Sets Zone2 volume (hex 00-64 for 0-100, or 00-50 for 0-80). Only works when main is ON."
  params:
    - name: level
      type: string
      description: Volume level in hex

- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: ZVLUP
  description: Sets Zone2 volume up
  params: []

- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: ZVLDOWN
  description: Sets Zone2 volume down
  params: []

- id: zone2_tone_set
  label: Set Zone2 Tone
  kind: action
  command: ZTN{Bxx}{Txx}
  description: "Sets Zone2 bass/treble (xx is -A..00..+A [-10..0..+10 2 step]). Only works when main is ON and Zone2 powered or variable."
  params:
    - name: Bxx
      type: string
      description: Bass level code
    - name: Txx
      type: string
      description: Treble level code

- id: zone2_bass_up
  label: Zone2 Bass Up
  kind: action
  command: ZTNBUP
  description: Sets Zone2 bass up (2 step)
  params: []

- id: zone2_bass_down
  label: Zone2 Bass Down
  kind: action
  command: ZTNBDOWN
  description: Sets Zone2 bass down (2 step)
  params: []

- id: zone2_treble_up
  label: Zone2 Treble Up
  kind: action
  command: ZTNTUP
  description: Sets Zone2 treble up (2 step)
  params: []

- id: zone2_treble_down
  label: Zone2 Treble Down
  kind: action
  command: ZTNTDOWN
  description: Sets Zone2 treble down (2 step)
  params: []

- id: zone2_balance_set
  label: Set Zone2 Balance
  kind: action
  command: ZBL{xx}
  description: "Sets Zone2 balance (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Balance level code

- id: zone2_balance_up
  label: Zone2 Balance Up
  kind: action
  command: ZBLUP
  description: Sets Zone2 balance up (to R, 2 step)
  params: []

- id: zone2_balance_down
  label: Zone2 Balance Down
  kind: action
  command: ZBLDOWN
  description: Sets Zone2 balance down (to L, 2 step)
  params: []

- id: zone2_select_input
  label: Zone2 Select Input
  kind: action
  command: SLZ{input}
  description: "Selects Zone2 input source (same codes as SLI: 00-06,10,20-26,27,28,29,2A,30,31,32,40,80=SOURCE)"
  params:
    - name: input
      type: string
      description: Input code in hex

- id: zone2_tuning_set
  label: Set Zone2 Tuning Frequency
  kind: action
  command: TUZ{freq}
  description: "Directly tunes Zone2 frequency (FM nnn.nn MHz / AM nnnnn kHz). Tuner shared with main but control separated."
  params:
    - name: freq
      type: string
      description: Frequency value as 5-digit string

- id: zone2_tuning_up
  label: Zone2 Tuning Up
  kind: action
  command: TUZUP
  description: Sets Zone2 tuning frequency wrap-around up
  params: []

- id: zone2_tuning_down
  label: Zone2 Tuning Down
  kind: action
  command: TUZDOWN
  description: Sets Zone2 tuning frequency wrap-around down
  params: []

- id: zone2_preset_set
  label: Set Zone2 Preset
  kind: action
  command: PRZ{preset}
  description: "Sets Zone2 preset (01-28 hex for 1-40, or 01-1E hex for 1-30)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

- id: zone2_preset_up
  label: Zone2 Preset Up
  kind: action
  command: PRZUP
  description: Sets Zone2 preset wrap-around up
  params: []

- id: zone2_preset_down
  label: Zone2 Preset Down
  kind: action
  command: PRZDOWN
  description: Sets Zone2 preset wrap-around down
  params: []

- id: zone2_network_play
  label: Zone2 Network Play
  kind: action
  command: NTZPLAY
  description: Zone2 network play key (control separated from main)
  params: []

- id: zone2_network_stop
  label: Zone2 Network Stop
  kind: action
  command: NTZSTOP
  description: Zone2 network stop key
  params: []

- id: zone2_network_pause
  label: Zone2 Network Pause
  kind: action
  command: NTZPAUSE
  description: Zone2 network pause key
  params: []

- id: zone2_network_track_up
  label: Zone2 Network Track Up
  kind: action
  command: NTZTRUP
  description: Zone2 network track up
  params: []

- id: zone2_network_track_down
  label: Zone2 Network Track Down
  kind: action
  command: NTZTRDN
  description: Zone2 network track down
  params: []

- id: zone2_network_ch_up
  label: Zone2 Channel Up (iRadio)
  kind: action
  command: NTZCHUP
  description: Zone2 channel up for internet radio
  params: []

- id: zone2_network_ch_down
  label: Zone2 Channel Down (iRadio)
  kind: action
  command: NTZCHDN
  description: Zone2 channel down for internet radio
  params: []

- id: zone2_internet_radio_preset
  label: Zone2 Internet Radio Preset
  kind: action
  command: NPZ{preset}
  description: "Sets Zone2 internet radio preset 01-28 hex for 1-40 (Network Model Only)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

- id: zone2_listening_mode_set
  label: Set Zone2 Listening Mode
  kind: action
  command: LMZ{mode}
  description: "00=STEREO, 01=DIRECT, 0F=MONO, 12=MULTIPLEX, 87=DVS(PL2), 88=DVS(NEO6)"
  params:
    - name: mode
      type: string
      description: Mode code in hex

- id: zone2_late_night_set
  label: Set Zone2 Late Night
  kind: action
  command: LTZ{level}
  description: "00=Off, 01=Low, 02=High, UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00, 01, 02, or UP"

- id: zone2_late_night_up
  label: Zone2 Late Night Up
  kind: action
  command: LTZUP
  description: Sets Zone2 late night wrap-around up
  params: []

- id: zone2_reeq_set
  label: Set Zone2 Re-EQ/Academy
  kind: action
  command: RAZ{level}
  description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=wrap-around"
  params:
    - name: level
      type: string
      description: "00, 01, 02, or UP"

- id: zone2_reeq_up
  label: Zone2 Re-EQ Up
  kind: action
  command: RAZUP
  description: Sets Zone2 Re-EQ/Academy wrap-around up
  params: []

# ===================================================================
# ZONE 3 COMMANDS
# ===================================================================
- id: zone3_power_standby
  label: Zone3 Power Standby
  kind: action
  command: PW300
  description: Sets Zone3 to standby
  params: []

- id: zone3_power_on
  label: Zone3 Power On
  kind: action
  command: PW301
  description: Sets Zone3 on
  params: []

- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  command: MT300
  description: Sets Zone3 muting off
  params: []

- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  command: MT301
  description: Sets Zone3 muting on
  params: []

- id: zone3_mute_toggle
  label: Zone3 Mute Toggle
  kind: action
  command: MT3TG
  description: Sets Zone3 muting wrap-around
  params: []

- id: zone3_volume_set
  label: Set Zone3 Volume
  kind: action
  command: VL3{level}
  description: "Sets Zone3 volume (hex 00-64 for 0-100, or 00-50 for 0-80)"
  params:
    - name: level
      type: string
      description: Volume level in hex

- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: VL3UP
  description: Sets Zone3 volume up
  params: []

- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: VL3DOWN
  description: Sets Zone3 volume down
  params: []

- id: zone3_tone_set
  label: Set Zone3 Tone
  kind: action
  command: TN3{Bxx}{Txx}
  description: "Sets Zone3 bass/treble (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: Bxx
      type: string
      description: Bass level code
    - name: Txx
      type: string
      description: Treble level code

- id: zone3_bass_up
  label: Zone3 Bass Up
  kind: action
  command: TN3BUP
  description: Sets Zone3 bass up (2 step)
  params: []

- id: zone3_bass_down
  label: Zone3 Bass Down
  kind: action
  command: TN3BDOWN
  description: Sets Zone3 bass down (2 step)
  params: []

- id: zone3_treble_up
  label: Zone3 Treble Up
  kind: action
  command: TN3TUP
  description: Sets Zone3 treble up (2 step)
  params: []

- id: zone3_treble_down
  label: Zone3 Treble Down
  kind: action
  command: TN3TDOWN
  description: Sets Zone3 treble down (2 step)
  params: []

- id: zone3_balance_set
  label: Set Zone3 Balance
  kind: action
  command: BL3{xx}
  description: "Sets Zone3 balance (xx is -A..00..+A [-10..0..+10 2 step])"
  params:
    - name: xx
      type: string
      description: Balance level code

- id: zone3_balance_up
  label: Zone3 Balance Up
  kind: action
  command: BL3UP
  description: Sets Zone3 balance up (to R, 2 step)
  params: []

- id: zone3_balance_down
  label: Zone3 Balance Down
  kind: action
  command: BL3DOWN
  description: Sets Zone3 balance down (to L, 2 step)
  params: []

- id: zone3_select_input
  label: Zone3 Select Input
  kind: action
  command: SL3{input}
  description: "Selects Zone3 input source (same codes as SLI)"
  params:
    - name: input
      type: string
      description: Input code in hex

- id: zone3_tuning_set
  label: Set Zone3 Tuning Frequency
  kind: action
  command: TU3{freq}
  description: "Directly tunes Zone3 frequency (FM nnn.nn MHz / AM nnnnn kHz). Tuner shared but control separated."
  params:
    - name: freq
      type: string
      description: Frequency value as 5-digit string

- id: zone3_tuning_up
  label: Zone3 Tuning Up
  kind: action
  command: TU3UP
  description: Sets Zone3 tuning frequency wrap-around up
  params: []

- id: zone3_tuning_down
  label: Zone3 Tuning Down
  kind: action
  command: TU3DOWN
  description: Sets Zone3 tuning frequency wrap-around down
  params: []

- id: zone3_preset_set
  label: Set Zone3 Preset
  kind: action
  command: PR3{preset}
  description: "Sets Zone3 preset (01-28 hex for 1-40, or 01-1E hex for 1-30)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

- id: zone3_preset_up
  label: Zone3 Preset Up
  kind: action
  command: PR3UP
  description: Sets Zone3 preset wrap-around up
  params: []

- id: zone3_preset_down
  label: Zone3 Preset Down
  kind: action
  command: PR3DOWN
  description: Sets Zone3 preset wrap-around down
  params: []

- id: zone3_network_play
  label: Zone3 Network Play
  kind: action
  command: NT3PLAY
  description: Zone3 network play key
  params: []

- id: zone3_network_stop
  label: Zone3 Network Stop
  kind: action
  command: NT3STOP
  description: Zone3 network stop key
  params: []

- id: zone3_network_pause
  label: Zone3 Network Pause
  kind: action
  command: NT3PAUSE
  description: Zone3 network pause key
  params: []

- id: zone3_network_track_up
  label: Zone3 Network Track Up
  kind: action
  command: NT3TRUP
  description: Zone3 network track up
  params: []

- id: zone3_network_track_down
  label: Zone3 Network Track Down
  kind: action
  command: NT3TRDN
  description: Zone3 network track down
  params: []

- id: zone3_internet_radio_preset
  label: Zone3 Internet Radio Preset
  kind: action
  command: NP3{preset}
  description: "Sets Zone3 internet radio preset 01-28 hex for 1-40 (Network Model Only)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

# ===================================================================
# ZONE 4 COMMANDS
# ===================================================================
- id: zone4_power_standby
  label: Zone4 Power Standby
  kind: action
  command: PW400
  description: Sets Zone4 to standby
  params: []

- id: zone4_power_on
  label: Zone4 Power On
  kind: action
  command: PW401
  description: Sets Zone4 on
  params: []

- id: zone4_mute_off
  label: Zone4 Mute Off
  kind: action
  command: MT400
  description: Sets Zone4 muting off
  params: []

- id: zone4_mute_on
  label: Zone4 Mute On
  kind: action
  command: MT401
  description: Sets Zone4 muting on
  params: []

- id: zone4_mute_toggle
  label: Zone4 Mute Toggle
  kind: action
  command: MT4TG
  description: Sets Zone4 muting wrap-around
  params: []

- id: zone4_volume_set
  label: Set Zone4 Volume
  kind: action
  command: VL4{level}
  description: "Sets Zone4 volume (hex 00-64 for 0-100, or 00-50 for 0-80)"
  params:
    - name: level
      type: string
      description: Volume level in hex

- id: zone4_volume_up
  label: Zone4 Volume Up
  kind: action
  command: VL4UP
  description: Sets Zone4 volume up
  params: []

- id: zone4_volume_down
  label: Zone4 Volume Down
  kind: action
  command: VL4DOWN
  description: Sets Zone4 volume down
  params: []

- id: zone4_select_input
  label: Zone4 Select Input
  kind: action
  command: SL4{input}
  description: "Selects Zone4 input source (same codes as SLI)"
  params:
    - name: input
      type: string
      description: Input code in hex

- id: zone4_tuning_set
  label: Set Zone4 Tuning Frequency
  kind: action
  command: TU4{freq}
  description: "Directly tunes Zone4 frequency (FM nnn.nn MHz / AM nnnnn kHz). Tuner shared but control separated."
  params:
    - name: freq
      type: string
      description: Frequency value as 5-digit string

- id: zone4_tuning_up
  label: Zone4 Tuning Up
  kind: action
  command: TU4UP
  description: Sets Zone4 tuning frequency wrap-around up
  params: []

- id: zone4_tuning_down
  label: Zone4 Tuning Down
  kind: action
  command: TU4DOWN
  description: Sets Zone4 tuning frequency wrap-around down
  params: []

- id: zone4_preset_set
  label: Set Zone4 Preset
  kind: action
  command: PR4{preset}
  description: "Sets Zone4 preset (01-28 hex for 1-40, or 01-1E hex for 1-30)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

- id: zone4_preset_up
  label: Zone4 Preset Up
  kind: action
  command: PR4UP
  description: Sets Zone4 preset wrap-around up
  params: []

- id: zone4_preset_down
  label: Zone4 Preset Down
  kind: action
  command: PR4DOWN
  description: Sets Zone4 preset wrap-around down
  params: []

- id: zone4_network_play
  label: Zone4 Network Play
  kind: action
  command: NT4PLAY
  description: Zone4 network play key
  params: []

- id: zone4_network_stop
  label: Zone4 Network Stop
  kind: action
  command: NT4STOP
  description: Zone4 network stop key
  params: []

- id: zone4_network_pause
  label: Zone4 Network Pause
  kind: action
  command: NT4PAUSE
  description: Zone4 network pause key
  params: []

- id: zone4_network_track_up
  label: Zone4 Network Track Up
  kind: action
  command: NT4TRUP
  description: Zone4 network track up
  params: []

- id: zone4_network_track_down
  label: Zone4 Network Track Down
  kind: action
  command: NT4TRDN
  description: Zone4 network track down
  params: []

- id: zone4_internet_radio_preset
  label: Zone4 Internet Radio Preset
  kind: action
  command: NP4{preset}
  description: "Sets Zone4 internet radio preset 01-28 hex for 1-40 (Network Model Only)"
  params:
    - name: preset
      type: string
      description: Preset number in hex

# ===================================================================
# RI SYSTEM - CD Player (CCD)
# ===================================================================
- id: ri_cd_track
  label: RI CD Track+
  kind: action
  command: CCDTRACK
  description: CD player track+ via RI bus
  params: []

- id: ri_cd_play
  label: RI CD Play
  kind: action
  command: CCDPLAY
  description: CD player play via RI bus
  params: []

- id: ri_cd_stop
  label: RI CD Stop
  kind: action
  command: CCDSTOP
  description: CD player stop via RI bus
  params: []

- id: ri_cd_pause
  label: RI CD Pause
  kind: action
  command: CCDPAUSE
  description: CD player pause via RI bus
  params: []

- id: ri_cd_skip_fwd
  label: RI CD Skip Forward
  kind: action
  command: CCD SKIP.F
  description: CD player skip forward (>>) via RI bus
  params: []

- id: ri_cd_skip_rev
  label: RI CD Skip Reverse
  kind: action
  command: CCD SKIP.R
  description: CD player skip reverse (<<) via RI bus
  params: []

- id: ri_cd_memory
  label: RI CD Memory
  kind: action
  command: CCDMEMORY
  description: CD player memory via RI bus
  params: []

- id: ri_cd_clear
  label: RI CD Clear
  kind: action
  command: CCDCLEAR
  description: CD player clear via RI bus
  params: []

- id: ri_cd_repeat
  label: RI CD Repeat
  kind: action
  command: CCDREPEAT
  description: CD player repeat via RI bus
  params: []

- id: ri_cd_random
  label: RI CD Random
  kind: action
  command: CCDRANDOM
  description: CD player random via RI bus
  params: []

- id: ri_cd_display
  label: RI CD Display
  kind: action
  command: CCDDISP
  description: CD player display via RI bus
  params: []

- id: ri_cd_dmode
  label: RI CD D.Mode
  kind: action
  command: CCD D.MODE
  description: CD player D.Mode via RI bus
  params: []

- id: ri_cd_ff
  label: RI CD FF
  kind: action
  command: CCDFF
  description: CD player FF via RI bus
  params: []

- id: ri_cd_rew
  label: RI CD REW
  kind: action
  command: CCDREW
  description: CD player REW via RI bus
  params: []

- id: ri_cd_openclose
  label: RI CD Open/Close
  kind: action
  command: CCD OP/CL
  description: CD player open/close via RI bus
  params: []

- id: ri_cd_disc_fwd
  label: RI CD Disc+
  kind: action
  command: CCD DISC.F
  description: CD player disc+ via RI bus
  params: []

- id: ri_cd_disc_rev
  label: RI CD Disc-
  kind: action
  command: CCD DISC.R
  description: CD player disc- via RI bus
  params: []

- id: ri_cd_disc_1
  label: RI CD Disc1
  kind: action
  command: CCDDISC1
  description: CD player disc1 via RI bus
  params: []

- id: ri_cd_disc_2
  label: RI CD Disc2
  kind: action
  command: CCDDISC2
  description: CD player disc2 via RI bus
  params: []

- id: ri_cd_disc_3
  label: RI CD Disc3
  kind: action
  command: CCDDISC3
  description: CD player disc3 via RI bus
  params: []

- id: ri_cd_disc_4
  label: RI CD Disc4
  kind: action
  command: CCDDISC4
  description: CD player disc4 via RI bus
  params: []

- id: ri_cd_disc_5
  label: RI CD Disc5
  kind: action
  command: CCDDISC5
  description: CD player disc5 via RI bus
  params: []

- id: ri_cd_disc_6
  label: RI CD Disc6
  kind: action
  command: CCDDISC6
  description: CD player disc6 via RI bus
  params: []

- id: ri_cd_standby
  label: RI CD Standby
  kind: action
  command: CCDSTBY
  description: CD player standby via RI bus
  params: []

- id: ri_cd_power_on
  label: RI CD Power On
  kind: action
  command: CCDPON
  description: CD player power on via RI bus
  params: []

# ===================================================================
# RI SYSTEM - Tape1 (CT1)
# ===================================================================
- id: ri_tape1_play_fwd
  label: RI Tape1 Play Forward
  kind: action
  command: CT1 PLAY.F
  description: Tape1 play forward via RI bus
  params: []

- id: ri_tape1_play_rev
  label: RI Tape1 Play Reverse
  kind: action
  command: CT1 PLAY.R
  description: Tape1 play reverse via RI bus
  params: []

- id: ri_tape1_stop
  label: RI Tape1 Stop
  kind: action
  command: CT1STOP
  description: Tape1 stop via RI bus
  params: []

- id: ri_tape1_recpause
  label: RI Tape1 Rec/Pause
  kind: action
  command: CT1 RC/PAU
  description: Tape1 rec/pause via RI bus
  params: []

- id: ri_tape1_ff
  label: RI Tape1 FF
  kind: action
  command: CT1FF
  description: Tape1 FF via RI bus
  params: []

- id: ri_tape1_rew
  label: RI Tape1 REW
  kind: action
  command: CT1REW
  description: Tape1 REW via RI bus
  params: []

# ===================================================================
# RI SYSTEM - Tape2 (CT2)
# ===================================================================
- id: ri_tape2_play_fwd
  label: RI Tape2 Play Forward
  kind: action
  command: CT2 PLAY.F
  description: Tape2 play forward via RI bus
  params: []

- id: ri_tape2_play_rev
  label: RI Tape2 Play Reverse
  kind: action
  command: CT2 PLAY.R
  description: Tape2 play reverse via RI bus
  params: []

- id: ri_tape2_stop
  label: RI Tape2 Stop
  kind: action
  command: CT2STOP
  description: Tape2 stop via RI bus
  params: []

- id: ri_tape2_recpause
  label: RI Tape2 Rec/Pause
  kind: action
  command: CT2 RC/PAU
  description: Tape2 rec/pause via RI bus
  params: []

- id: ri_tape2_ff
  label: RI Tape2 FF
  kind: action
  command: CT2FF
  description: Tape2 FF via RI bus
  params: []

- id: ri_tape2_rew
  label: RI Tape2 REW
  kind: action
  command: CT2REW
  description: Tape2 REW via RI bus
  params: []

- id: ri_tape2_openclose
  label: RI Tape2 Open/Close
  kind: action
  command: CT2 OP/CL
  description: Tape2 open/close via RI bus
  params: []

- id: ri_tape2_skip_fwd
  label: RI Tape2 Skip Forward
  kind: action
  command: CT2 SKIP.F
  description: Tape2 skip forward via RI bus
  params: []

- id: ri_tape2_skip_rev
  label: RI Tape2 Skip Reverse
  kind: action
  command: CT2 SKIP.R
  description: Tape2 skip reverse via RI bus
  params: []

- id: ri_tape2_rec
  label: RI Tape2 Rec
  kind: action
  command: CT2REC
  description: Tape2 record via RI bus
  params: []

# ===================================================================
# RI SYSTEM - Graphics Equalizer (CEQ)
# ===================================================================
- id: ri_geq_preset
  label: RI Graphics EQ Preset
  kind: action
  command: CEQPRESET
  description: Graphics equalizer preset via RI bus
  params: []

# ===================================================================
# RI SYSTEM - DAT Recorder (CDT)
# ===================================================================
- id: ri_dat_play
  label: RI DAT Play
  kind: action
  command: CDTPLAY
  description: DAT play via RI bus
  params: []

- id: ri_dat_recpause
  label: RI DAT Rec/Pause
  kind: action
  command: CDT RC/PAU
  description: DAT rec/pause via RI bus
  params: []

- id: ri_dat_stop
  label: RI DAT Stop
  kind: action
  command: CDTSTOP
  description: DAT stop via RI bus
  params: []

- id: ri_dat_skip_fwd
  label: RI DAT Skip Forward
  kind: action
  command: CDT SKIP.F
  description: DAT skip forward via RI bus
  params: []

- id: ri_dat_skip_rev
  label: RI DAT Skip Reverse
  kind: action
  command: CDT SKIP.R
  description: DAT skip reverse via RI bus
  params: []

- id: ri_dat_ff
  label: RI DAT FF
  kind: action
  command: CDTFF
  description: DAT FF via RI bus
  params: []

- id: ri_dat_rew
  label: RI DAT REW
  kind: action
  command: CDTREW
  description: DAT REW via RI bus
  params: []

# ===================================================================
# RI SYSTEM - DVD Player (CDV)
# ===================================================================
- id: ri_dvd_power_on
  label: RI DVD Power On
  kind: action
  command: CDVPWRON
  description: DVD player power on via RI bus
  params: []

- id: ri_dvd_power_off
  label: RI DVD Power Off
  kind: action
  command: CDVPWROFF
  description: DVD player power off via RI bus
  params: []

- id: ri_dvd_play
  label: RI DVD Play
  kind: action
  command: CDVPLAY
  description: DVD player play via RI bus
  params: []

- id: ri_dvd_stop
  label: RI DVD Stop
  kind: action
  command: CDVSTOP
  description: DVD player stop via RI bus
  params: []

- id: ri_dvd_skip_fwd
  label: RI DVD Skip Forward
  kind: action
  command: CDV SKIP.F
  description: DVD player skip forward via RI bus
  params: []

- id: ri_dvd_skip_rev
  label: RI DVD Skip Reverse
  kind: action
  command: CDV SKIP.R
  description: DVD player skip reverse via RI bus
  params: []

- id: ri_dvd_ff
  label: RI DVD FF
  kind: action
  command: CDVFF
  description: DVD player FF via RI bus
  params: []

- id: ri_dvd_rew
  label: RI DVD REW
  kind: action
  command: CDVREW
  description: DVD player REW via RI bus
  params: []

- id: ri_dvd_pause
  label: RI DVD Pause
  kind: action
  command: CDVPAUSE
  description: DVD player pause via RI bus
  params: []

- id: ri_dvd_last_play
  label: RI DVD Last Play
  kind: action
  command: CDVLASTPLAY
  description: DVD player last play via RI bus
  params: []

- id: ri_dvd_subtitle_toggle
  label: RI DVD Subtitle On/Off
  kind: action
  command: CDV SUBTON/OFF
  description: DVD player subtitle on/off via RI bus
  params: []

- id: ri_dvd_subtitle
  label: RI DVD Subtitle
  kind: action
  command: CDVSUBTITLE
  description: DVD player subtitle via RI bus
  params: []

- id: ri_dvd_setup
  label: RI DVD Setup
  kind: action
  command: CDVSETUP
  description: DVD player setup via RI bus
  params: []

- id: ri_dvd_top_menu
  label: RI DVD Top Menu
  kind: action
  command: CDVTOPMENU
  description: DVD player top menu via RI bus
  params: []

- id: ri_dvd_menu
  label: RI DVD Menu
  kind: action
  command: CDVMENU
  description: DVD player menu via RI bus
  params: []

- id: ri_dvd_up
  label: RI DVD Up
  kind: action
  command: CDVUP
  description: DVD player up via RI bus
  params: []

- id: ri_dvd_down
  label: RI DVD Down
  kind: action
  command: CDVDOWN
  description: DVD player down via RI bus
  params: []

- id: ri_dvd_left
  label: RI DVD Left
  kind: action
  command: CDVLEFT
  description: DVD player left via RI bus
  params: []

- id: ri_dvd_right
  label: RI DVD Right
  kind: action
  command: CDVRIGHT
  description: DVD player right via RI bus
  params: []

- id: ri_dvd_enter
  label: RI DVD Enter
  kind: action
  command: CDVENTER
  description: DVD player enter via RI bus
  params: []

- id: ri_dvd_return
  label: RI DVD Return
  kind: action
  command: CDVRETURN
  description: DVD player return via RI bus
  params: []

- id: ri_dvd_disc_fwd
  label: RI DVD Disc+
  kind: action
  command: CDV DISC.F
  description: DVD player disc+ via RI bus
  params: []

- id: ri_dvd_disc_rev
  label: RI DVD Disc-
  kind: action
  command: CDV DISC.R
  description: DVD player disc- via RI bus
  params: []

- id: ri_dvd_audio
  label: RI DVD Audio
  kind: action
  command: CDVAUDIO
  description: DVD player audio via RI bus
  params: []

- id: ri_dvd_random
  label: RI DVD Random
  kind: action
  command: CDVRANDOM
  description: DVD player random via RI bus
  params: []

- id: ri_dvd_openclose
  label: RI DVD Open/Close
  kind: action
  command: CDV OP/CL
  description: DVD player open/close via RI bus
  params: []

- id: ri_dvd_angle
  label: RI DVD Angle
  kind: action
  command: CDVANGLE
  description: DVD player angle via RI bus
  params: []

- id: ri_dvd_search
  label: RI DVD Search
  kind: action
  command: CDVSEARCH
  description: DVD player search via RI bus
  params: []

- id: ri_dvd_display
  label: RI DVD Display
  kind: action
  command: CDVDISP
  description: DVD player display via RI bus
  params: []

- id: ri_dvd_repeat
  label: RI DVD Repeat
  kind: action
  command: CDVREPEAT
  description: DVD player repeat via RI bus
  params: []

- id: ri_dvd_memory
  label: RI DVD Memory
  kind: action
  command: CDVMEMORY
  description: DVD player memory via RI bus
  params: []

- id: ri_dvd_clear
  label: RI DVD Clear
  kind: action
  command: CDVCLEAR
  description: DVD player clear via RI bus
  params: []

- id: ri_dvd_ab_repeat
  label: RI DVD A-B Repeat
  kind: action
  command: CDVABR
  description: DVD player A-B repeat via RI bus
  params: []

- id: ri_dvd_step_fwd
  label: RI DVD Step Forward
  kind: action
  command: CDV STEP.F
  description: DVD player step forward via RI bus
  params: []

- id: ri_dvd_step_rev
  label: RI DVD Step Back
  kind: action
  command: CDV STEP.R
  description: DVD player step back via RI bus
  params: []

- id: ri_dvd_slow_fwd
  label: RI DVD Slow Forward
  kind: action
  command: CDV SLOW.F
  description: DVD player slow forward via RI bus
  params: []

- id: ri_dvd_slow_rev
  label: RI DVD Slow Reverse
  kind: action
  command: CDV SLOW.R
  description: DVD player slow reverse via RI bus
  params: []

- id: ri_dvd_zoom_toggle
  label: RI DVD Zoom Toggle
  kind: action
  command: CDVZOOMTG
  description: DVD player zoom toggle via RI bus
  params: []

- id: ri_dvd_zoom_up
  label: RI DVD Zoom Up
  kind: action
  command: CDVZOOMUP
  description: DVD player zoom up via RI bus
  params: []

- id: ri_dvd_zoom_down
  label: RI DVD Zoom Down
  kind: action
  command: CDVZOOMDN
  description: DVD player zoom down via RI bus
  params: []

- id: ri_dvd_progressive
  label: RI DVD Progressive
  kind: action
  command: CDVPROGRE
  description: DVD player progressive via RI bus
  params: []

- id: ri_dvd_video_off
  label: RI DVD Video On/Off
  kind: action
  command: CDVVDOFF
  description: DVD player video on/off via RI bus
  params: []

- id: ri_dvd_condition_memory
  label: RI DVD Condition Memory
  kind: action
  command: CDVCONMEM
  description: DVD player condition memory via RI bus
  params: []

- id: ri_dvd_function_memory
  label: RI DVD Function Memory
  kind: action
  command: CDVFUNMEM
  description: DVD player function memory via RI bus
  params: []

- id: ri_dvd_disc_1
  label: RI DVD Disc1
  kind: action
  command: CDVDISC1
  description: DVD player disc1 via RI bus
  params: []

- id: ri_dvd_disc_2
  label: RI DVD Disc2
  kind: action
  command: CDVDISC2
  description: DVD player disc2 via RI bus
  params: []

- id: ri_dvd_disc_3
  label: RI DVD Disc3
  kind: action
  command: CDVDISC3
  description: DVD player disc3 via RI bus
  params: []

- id: ri_dvd_disc_4
  label: RI DVD Disc4
  kind: action
  command: CDVDISC4
  description: DVD player disc4 via RI bus
  params: []

- id: ri_dvd_disc_5
  label: RI DVD Disc5
  kind: action
  command: CDVDISC5
  description: DVD player disc5 via RI bus
  params: []

- id: ri_dvd_disc_6
  label: RI DVD Disc6
  kind: action
  command: CDVDISC6
  description: DVD player disc6 via RI bus
  params: []

- id: ri_dvd_folder_up
  label: RI DVD Folder Up
  kind: action
  command: CDVFOLDUP
  description: DVD player folder up via RI bus
  params: []

- id: ri_dvd_folder_down
  label: RI DVD Folder Down
  kind: action
  command: CDVFOLDDN
  description: DVD player folder down via RI bus
  params: []

- id: ri_dvd_play_mode
  label: RI DVD Play Mode
  kind: action
  command: CDVP.MODE
  description: DVD player play mode via RI bus
  params: []

# ===================================================================
# RI SYSTEM - MD Recorder (CMD)
# ===================================================================
- id: ri_md_play
  label: RI MD Play
  kind: action
  command: CMDPLAY
  description: MD recorder play via RI bus
  params: []

- id: ri_md_stop
  label: RI MD Stop
  kind: action
  command: CMDSTOP
  description: MD recorder stop via RI bus
  params: []

- id: ri_md_ff
  label: RI MD FF
  kind: action
  command: CMDFF
  description: MD recorder FF via RI bus
  params: []

- id: ri_md_rew
  label: RI MD REW
  kind: action
  command: CMDREW
  description: MD recorder REW via RI bus
  params: []

- id: ri_md_play_mode
  label: RI MD Play Mode
  kind: action
  command: CMDP.MODE
  description: MD recorder play mode via RI bus
  params: []

- id: ri_md_skip_fwd
  label: RI MD Skip Forward
  kind: action
  command: CMD SKIP.F
  description: MD recorder skip forward via RI bus
  params: []

- id: ri_md_skip_rev
  label: RI MD Skip Reverse
  kind: action
  command: CMD SKIP.R
  description: MD recorder skip reverse via RI bus
  params: []

- id: ri_md_pause
  label: RI MD Pause
  kind: action
  command: CMDPAUSE
  description: MD recorder pause via RI bus
  params: []

- id: ri_md_rec
  label: RI MD Rec
  kind: action
  command: CMDREC
  description: MD recorder record via RI bus
  params: []

- id: ri_md_memory
  label: RI MD Memory
  kind: action
  command: CMDMEMORY
  description: MD recorder memory via RI bus
  params: []

- id: ri_md_display
  label: RI MD Display
  kind: action
  command: CMDDISP
  description: MD recorder display via RI bus
  params: []

- id: ri_md_scroll
  label: RI MD Scroll
  kind: action
  command: CMDSCROLL
  description: MD recorder scroll via RI bus
  params: []

- id: ri_md_music_scan
  label: RI MD Music Scan
  kind: action
  command: CMDM.SCAN
  description: MD recorder music scan via RI bus
  params: []

- id: ri_md_clear
  label: RI MD Clear
  kind: action
  command: CMDCLEAR
  description: MD recorder clear via RI bus
  params: []

- id: ri_md_random
  label: RI MD Random
  kind: action
  command: CMDRANDOM
  description: MD recorder random via RI bus
  params: []

- id: ri_md_repeat
  label: RI MD Repeat
  kind: action
  command: CMDREPEAT
  description: MD recorder repeat via RI bus
  params: []

- id: ri_md_enter
  label: RI MD Enter
  kind: action
  command: CMDENTER
  description: MD recorder enter via RI bus
  params: []

- id: ri_md_eject
  label: RI MD Eject
  kind: action
  command: CMDEJECT
  description: MD recorder eject via RI bus
  params: []

- id: ri_md_name
  label: RI MD Name
  kind: action
  command: CMDNAME
  description: MD recorder name via RI bus
  params: []

- id: ri_md_group
  label: RI MD Group
  kind: action
  command: CMDGROUP
  description: MD recorder group via RI bus
  params: []

- id: ri_md_standby
  label: RI MD Standby
  kind: action
  command: CMDSTBY
  description: MD recorder standby via RI bus
  params: []

# ===================================================================
# RI SYSTEM - CD-R Recorder (CCR)
# ===================================================================
- id: ri_cdr_play_mode
  label: RI CD-R Play Mode
  kind: action
  command: CCRP.MODE
  description: CD-R recorder play mode via RI bus
  params: []

- id: ri_cdr_play
  label: RI CD-R Play
  kind: action
  command: CCRPLAY
  description: CD-R recorder play via RI bus
  params: []

- id: ri_cdr_stop
  label: RI CD-R Stop
  kind: action
  command: CCRSTOP
  description: CD-R recorder stop via RI bus
  params: []

- id: ri_cdr_skip_fwd
  label: RI CD-R Skip Forward
  kind: action
  command: CCR SKIP.F
  description: CD-R recorder skip forward via RI bus
  params: []

- id: ri_cdr_skip_rev
  label: RI CD-R Skip Reverse
  kind: action
  command: CCR SKIP.R
  description: CD-R recorder skip reverse via RI bus
  params: []

- id: ri_cdr_pause
  label: RI CD-R Pause
  kind: action
  command: CCRPAUSE
  description: CD-R recorder pause via RI bus
  params: []

- id: ri_cdr_rec
  label: RI CD-R Rec
  kind: action
  command: CCRREC
  description: CD-R recorder record via RI bus
  params: []

- id: ri_cdr_clear
  label: RI CD-R Clear
  kind: action
  command: CCRCLEAR
  description: CD-R recorder clear via RI bus
  params: []

- id: ri_cdr_repeat
  label: RI CD-R Repeat
  kind: action
  command: CCRREPEAT
  description: CD-R recorder repeat via RI bus
  params: []

- id: ri_cdr_scroll
  label: RI CD-R Scroll
  kind: action
  command: CCRSCROLL
  description: CD-R recorder scroll via RI bus
  params: []

- id: ri_cdr_openclose
  label: RI CD-R Open/Close
  kind: action
  command: CCR OP/CL
  description: CD-R recorder open/close via RI bus
  params: []

- id: ri_cdr_display
  label: RI CD-R Display
  kind: action
  command: CCRDISP
  description: CD-R recorder display via RI bus
  params: []

- id: ri_cdr_random
  label: RI CD-R Random
  kind: action
  command: CCRRANDOM
  description: CD-R recorder random via RI bus
  params: []

- id: ri_cdr_memory
  label: RI CD-R Memory
  kind: action
  command: CCRMEMORY
  description: CD-R recorder memory via RI bus
  params: []

- id: ri_cdr_ff
  label: RI CD-R FF
  kind: action
  command: CCRFF
  description: CD-R recorder FF via RI bus
  params: []

- id: ri_cdr_rew
  label: RI CD-R REW
  kind: action
  command: CCRREW
  description: CD-R recorder REW via RI bus
  params: []

- id: ri_cdr_standby
  label: RI CD-R Standby
  kind: action
  command: CCRSTBY
  description: CD-R recorder standby via RI bus
  params: []

# ===================================================================
# RI SYSTEM - Docking Station (CDS via RI)
# ===================================================================
- id: ri_dock_power_on
  label: RI Dock Power On
  kind: action
  command: CDSPWRON
  description: Docking station on via RI bus
  params: []

- id: ri_dock_power_off
  label: RI Dock Standby
  kind: action
  command: CDSPWROFF
  description: Docking station standby via RI bus
  params: []

- id: ri_dock_play_resume
  label: RI Dock Play/Resume
  kind: action
  command: CDS PLY/RES
  description: Dock play/resume key via RI bus
  params: []

- id: ri_dock_stop
  label: RI Dock Stop
  kind: action
  command: CDSSTOP
  description: Dock stop key via RI bus
  params: []

- id: ri_dock_track_up
  label: RI Dock Track Up
  kind: action
  command: CDS SKIP.F
  description: Dock track up key via RI bus
  params: []

- id: ri_dock_track_down
  label: RI Dock Track Down
  kind: action
  command: CDS SKIP.R
  description: Dock track down key via RI bus
  params: []

- id: ri_dock_pause
  label: RI Dock Pause
  kind: action
  command: CDSPAUSE
  description: Dock pause key via RI bus
  params: []

- id: ri_dock_play_pause
  label: RI Dock Play/Pause
  kind: action
  command: CDS PLY/PAU
  description: Dock play/pause key via RI bus
  params: []

- id: ri_dock_ff
  label: RI Dock FF
  kind: action
  command: CDSFF
  description: Dock FF key via RI bus
  params: []

- id: ri_dock_rew
  label: RI Dock REW
  kind: action
  command: CDSREW
  description: Dock FR key via RI bus
  params: []

- id: ri_dock_album_up
  label: RI Dock Album Up
  kind: action
  command: CDS ALBUM+
  description: Dock album up key via RI bus
  params: []

- id: ri_dock_album_down
  label: RI Dock Album Down
  kind: action
  command: CDS ALBUM-
  description: Dock album down key via RI bus
  params: []

- id: ri_dock_playlist_up
  label: RI Dock Playlist Up
  kind: action
  command: CDS PLIST+
  description: Dock playlist up key via RI bus
  params: []

- id: ri_dock_playlist_down
  label: RI Dock Playlist Down
  kind: action
  command: CDS PLIST-
  description: Dock playlist down key via RI bus
  params: []

- id: ri_dock_chapter_up
  label: RI Dock Chapter Up
  kind: action
  command: CDS CHAPT+
  description: Dock chapter up key via RI bus
  params: []

- id: ri_dock_chapter_down
  label: RI Dock Chapter Down
  kind: action
  command: CDS CHAPT-
  description: Dock chapter down key via RI bus
  params: []

- id: ri_dock_shuffle
  label: RI Dock Shuffle
  kind: action
  command: CDSRANDOM
  description: Dock shuffle key via RI bus
  params: []

- id: ri_dock_repeat
  label: RI Dock Repeat
  kind: action
  command: CDSREPEAT
  description: Dock repeat key via RI bus
  params: []

- id: ri_dock_mute
  label: RI Dock Mute
  kind: action
  command: CDSMUTE
  description: Dock mute key via RI bus
  params: []

- id: ri_dock_backlight
  label: RI Dock Backlight
  kind: action
  command: CDSBLIGHT
  description: Dock backlight key via RI bus
  params: []

- id: ri_dock_menu
  label: RI Dock Menu
  kind: action
  command: CDSMENU
  description: Dock menu key via RI bus
  params: []

- id: ri_dock_enter
  label: RI Dock Select
  kind: action
  command: CDSENTER
  description: Dock select key via RI bus
  params: []

- id: ri_dock_up
  label: RI Dock Cursor Up
  kind: action
  command: CDSUP
  description: Dock cursor up key via RI bus
  params: []

- id: ri_dock_down
  label: RI Dock Cursor Down
  kind: action
  command: CDSDOWN
  description: Dock cursor down key via RI bus
  params: []
```

## Feedbacks
```yaml
# --- MAIN ZONE ---
- id: power_state
  label: Power State
  command: PWRQSTN
  response: PWR{status}
  type: enum
  values: ["00", "01"]
  description: "00=Standby, 01=On"

- id: mute_state
  label: Mute State
  command: AMTQSTN
  response: AMT{status}
  type: enum
  values: ["00", "01"]
  description: "00=Off, 01=On"

- id: speaker_a_state
  label: Speaker A State
  command: SPAQSTN
  response: SPA{status}
  type: string
  description: Speaker A state (model-conditional)

- id: speaker_b_state
  label: Speaker B State
  command: SPBQSTN
  response: SPB{status}
  type: string
  description: Speaker B state (model-conditional)

- id: speaker_layout
  label: Speaker Layout
  command: SPLQSTN
  response: SPL{layout}
  type: string
  description: "Current speaker layout (SB/FH/FW)"

- id: master_volume
  label: Master Volume Level
  command: MVLQSTN
  response: MVL{level}
  type: string
  description: Volume level in hex (00-64 for 0-100)

- id: tone_front
  label: Front Tone
  command: TFRQSTN
  response: TFR{Bxx}{Txx}
  type: string
  description: "Front bass+treble (BxxTxx)"

- id: tone_front_wide
  label: Front Wide Tone
  command: TFWQSTN
  response: TFW{Bxx}{Txx}
  type: string
  description: Front Wide bass+treble

- id: tone_front_high
  label: Front High Tone
  command: TFHQSTN
  response: TFH{Bxx}{Txx}
  type: string
  description: Front High bass+treble

- id: tone_center
  label: Center Tone
  command: TCTQSTN
  response: TCT{Bxx}{Txx}
  type: string
  description: Center bass+treble

- id: tone_surround
  label: Surround Tone
  command: TSRQSTN
  response: TSR{Bxx}{Txx}
  type: string
  description: Surround bass+treble

- id: tone_surround_back
  label: Surround Back Tone
  command: TSBQSTN
  response: TSB{Bxx}{Txx}
  type: string
  description: Surround Back bass+treble

- id: tone_subwoofer
  label: Subwoofer Tone
  command: TSWQSTN
  response: TSW{Bxx}
  type: string
  description: Subwoofer bass

- id: subwoofer_level
  label: Subwoofer Temporary Level
  command: SWLQSTN
  response: SWL{level}
  type: string
  description: "-F to 00 to +C (-15dB to 0dB to +12dB)"

- id: center_level
  label: Center Temporary Level
  command: CTLQSTN
  response: CTL{level}
  type: string
  description: "-C to 00 to +C (-12dB to 0dB to +12dB)"

- id: input_selector
  label: Input Selector Position
  command: SLIQSTN
  response: SLI{position}
  type: string
  description: Current input selector position code in hex

- id: listening_mode
  label: Listening Mode
  command: LMDQSTN
  response: LMD{mode}
  type: string
  description: Current listening mode code in hex

- id: dimmer_level
  label: Dimmer Level
  command: DIMQSTN
  response: DIM{level}
  type: enum
  values: ["00", "01", "02", "03"]
  description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off"

- id: sleep_time
  label: Sleep Timer
  command: SLPQSTN
  response: SLP{time}
  type: string
  description: Sleep time in hex or OFF

- id: late_night
  label: Late Night Level
  command: LTNQSTN
  response: LTN{level}
  type: enum
  values: ["00", "01", "02", "03"]
  description: "00=Off, 01=Low, 02=High, 03=Auto"

- id: display_mode
  label: Display Mode
  command: DIFQSTN
  response: DIF{mode}
  type: string
  description: Current display mode

- id: audio_selector
  label: Audio Selector Status
  command: SLAQSTN
  response: SLA{status}
  type: string
  description: Current audio selector status

- id: recout_selector
  label: Record Output Selector Position
  command: SLRQSTN
  response: SLR{position}
  type: string
  description: Current record output selector position

- id: hdmi_output
  label: HDMI Output Selector
  command: HDOQSTN
  response: HDO{mode}
  type: string
  description: Current HDMI output mode

- id: monitor_resolution
  label: Monitor Out Resolution
  command: RESQSTN
  response: RES{mode}
  type: string
  description: Current monitor output resolution setting

- id: video_output
  label: Video Output Selector
  command: VOSQSTN
  response: VOS{mode}
  type: string
  description: Current video output (Japanese model only)

- id: isf_mode
  label: ISF Mode State
  command: ISFQSTN
  response: ISF{mode}
  type: string
  description: Current ISF mode state

- id: reeq_state
  label: Re-EQ/Academy/Cinema Filter State
  command: RASQSTN
  response: RAS{status}
  type: string
  description: Current Re-EQ/Academy/cinema filter state

- id: audyssey_multeq_state
  label: Audyssey 2EQ/MultEQ State
  command: ADYQSTN
  response: ADY{status}
  type: string
  description: "00=Off, 01=On"

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  command: ADQQSTN
  response: ADQ{status}
  type: string
  description: "00=Off, 01=On"

- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  command: ADVQSTN
  response: ADV{status}
  type: string
  description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

- id: dolby_volume_state
  label: Dolby Volume State
  command: DVLQSTN
  response: DVL{status}
  type: string
  description: "00=Off, 01=Low, 02=Mid, 03=High"

- id: music_optimizer_state
  label: Music Optimizer State
  command: MOTQSTN
  response: MOT{status}
  type: string
  description: "00=Off, 01=On"

- id: audio_info
  label: Audio Information
  command: IFAQSTN
  response: IFA{nnnnn:nnnnn}
  type: string
  description: "Audio info (same as immediate display, comma-separated). Returned after DIF02."

- id: video_info
  label: Video Information
  command: IFVQSTN
  response: IFV{nnnnn:nnnnn}
  type: string
  description: "Video info (same as immediate display, comma-separated). Returned after DIF03."

# --- TUNER ---
- id: tuning_frequency
  label: Tuning Frequency
  command: TUNQSTN
  response: TUN{freq}
  type: string
  description: "Current tuning frequency (FM nnn.nn MHz / AM nnnnn kHz)"

- id: preset_number
  label: Preset Number
  command: PRSQSTN
  response: PRS{no}
  type: string
  description: Current preset number in hex

# --- XM (XM Model Only) ---
- id: xm_channel_name
  label: XM Channel Name
  command: XCNQSTN
  response: XCN{name}
  type: string
  description: XM channel name (XM Model Only)

- id: xm_artist
  label: XM Artist Name
  command: XATQSTN
  response: XAT{name}
  type: string
  description: XM artist name (XM Model Only)

- id: xm_title
  label: XM Title
  command: XTIQSTN
  response: XTI{name}
  type: string
  description: XM title (XM Model Only)

- id: xm_channel
  label: XM Channel Number
  command: XCHQSTN
  response: XCH{no}
  type: string
  description: XM channel number 000-255 (XM Model Only)

- id: xm_category
  label: XM Category
  command: XCTQSTN
  response: XCT{category}
  type: string
  description: XM category info (XM Model Only)

# --- SIRIUS (SIRIUS Model Only) ---
- id: sirius_channel_name
  label: SIRIUS Channel Name
  command: SCNQSTN
  response: SCN{name}
  type: string
  description: SIRIUS channel name (SIRIUS Model Only)

- id: sirius_artist
  label: SIRIUS Artist Name
  command: SATQSTN
  response: SAT{name}
  type: string
  description: SIRIUS artist name (SIRIUS Model Only)

- id: sirius_title
  label: SIRIUS Title
  command: STIQSTN
  response: STI{name}
  type: string
  description: SIRIUS title (SIRIUS Model Only)

- id: sirius_channel
  label: SIRIUS Channel Number
  command: SCHQSTN
  response: SCH{no}
  type: string
  description: SIRIUS channel number 000-255 (SIRIUS Model Only)

- id: sirius_category
  label: SIRIUS Category
  command: SCTQSTN
  response: SCT{category}
  type: string
  description: SIRIUS category info (SIRIUS Model Only)

# --- HD RADIO (HD Radio Model Only) ---
- id: hd_radio_artist
  label: HD Radio Artist Name
  command: HATQSTN
  response: HAT{name}
  type: string
  description: HD Radio artist name (64 digits max, HD Radio Model Only)

- id: hd_radio_channel_name
  label: HD Radio Channel Name
  command: HCNQSTN
  response: HCN{name}
  type: string
  description: HD Radio channel/station name (7 digits, HD Radio Model Only)

- id: hd_radio_title
  label: HD Radio Title
  command: HTIQSTN
  response: HTI{name}
  type: string
  description: HD Radio title (64 digits max, HD Radio Model Only)

- id: hd_radio_detail
  label: HD Radio Detail Info
  command: HDSQSTN
  response: HDS{info}
  type: string
  description: HD Radio detail title (HD Radio Model Only)

- id: hd_radio_program
  label: HD Radio Channel Program
  command: HPRQSTN
  response: HPR{no}
  type: string
  description: HD Radio channel program 01-08 (HD Radio Model Only)

- id: hd_radio_blend
  label: HD Radio Blend Mode
  command: HBLQSTN
  response: HBL{mode}
  type: string
  description: "00=Auto, 01=Analog (HD Radio Model Only)"

- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  command: HTSQSTN
  response: HTS{mmnnoo}
  type: string
  description: "3-byte status: mm=00 not HD/01 HD, nn=current program 01-08, oo=receivable programs bitmask (HD Radio Model Only)"

# --- NETWORK / USB ---
- id: net_play_status
  label: Network/USB Play Status
  command: NSTQSTN
  response: NST{status}
  type: string
  description: "3-letter status: p=Play/Pause/Stop/FF/FR, r=Repeat, s=Shuffle"

- id: net_track_info
  label: Network/USB Track Info
  command: NTRQSTN
  response: NTR{info}
  type: string
  description: "cccc/tttt (current/total track)"

- id: net_time_info
  label: Network/USB Time Info
  command: NTMQSTN
  response: NTM{info}
  type: string
  description: "mm:ss/mm:ss (elapsed/total)"

- id: net_artist
  label: Network/USB Artist Name
  command: NATQSTN
  response: NAT{name}
  type: string
  description: Artist name up to 64 characters

- id: net_album
  label: Network/USB Album Name
  command: NALQSTN
  response: NAL{name}
  type: string
  description: Album name up to 64 characters

- id: net_title
  label: Network/USB Title Name
  command: NTIQSTN
  response: NTI{name}
  type: string
  description: Title name up to 64 characters

# --- ZONE 2 ---
- id: zone2_power_state
  label: Zone2 Power State
  command: ZPWQSTN
  response: ZPW{status}
  type: enum
  values: ["00", "01"]
  description: "00=Standby, 01=On"

- id: zone2_mute_state
  label: Zone2 Mute State
  command: ZMTQSTN
  response: ZMT{status}
  type: string
  description: "00=Off, 01=On"

- id: zone2_volume
  label: Zone2 Volume Level
  command: ZVLQSTN
  response: ZVL{level}
  type: string
  description: Zone2 volume level in hex

- id: zone2_tone
  label: Zone2 Tone
  command: ZTNQSTN
  response: ZTN{Bxx}{Txx}
  type: string
  description: Zone2 bass+treble

- id: zone2_balance
  label: Zone2 Balance
  command: ZBLQSTN
  response: ZBL{xx}
  type: string
  description: Zone2 balance

- id: zone2_selector
  label: Zone2 Selector Position
  command: SLZQSTN
  response: SLZ{position}
  type: string
  description: Zone2 input selector position

- id: zone2_tuning
  label: Zone2 Tuning Frequency
  command: TUZQSTN
  response: TUZ{freq}
  type: string
  description: Zone2 tuning frequency

- id: zone2_preset
  label: Zone2 Preset Number
  command: PRZQSTN
  response: PRZ{no}
  type: string
  description: Zone2 preset number in hex

- id: zone2_late_night
  label: Zone2 Late Night Level
  command: LTZQSTN
  response: LTZ{level}
  type: string
  description: "00=Off, 01=Low, 02=High"

- id: zone2_reeq_state
  label: Zone2 Re-EQ/Academy State
  command: RAZQSTN
  response: RAZ{status}
  type: string
  description: Zone2 Re-EQ/Academy state

# --- ZONE 3 ---
- id: zone3_power_state
  label: Zone3 Power State
  command: PW3QSTN
  response: PW3{status}
  type: enum
  values: ["00", "01"]
  description: "00=Standby, 01=On"

- id: zone3_mute_state
  label: Zone3 Mute State
  command: MT3QSTN
  response: MT3{status}
  type: string
  description: "00=Off, 01=On"

- id: zone3_volume
  label: Zone3 Volume Level
  command: VL3QSTN
  response: VL3{level}
  type: string
  description: Zone3 volume level in hex

- id: zone3_tone
  label: Zone3 Tone
  command: TN3QSTN
  response: TN3{Bxx}{Txx}
  type: string
  description: Zone3 bass+treble

- id: zone3_balance
  label: Zone3 Balance
  command: BL3QSTN
  response: BL3{xx}
  type: string
  description: Zone3 balance

- id: zone3_selector
  label: Zone3 Selector Position
  command: SL3QSTN
  response: SL3{position}
  type: string
  description: Zone3 input selector position

- id: zone3_tuning
  label: Zone3 Tuning Frequency
  command: TU3QSTN
  response: TU3{freq}
  type: string
  description: Zone3 tuning frequency

- id: zone3_preset
  label: Zone3 Preset Number
  command: PR3QSTN
  response: PR3{no}
  type: string
  description: Zone3 preset number in hex

# --- ZONE 4 ---
- id: zone4_power_state
  label: Zone4 Power State
  command: PW4QSTN
  response: PW4{status}
  type: enum
  values: ["00", "01"]
  description: "00=Standby, 01=On"

- id: zone4_mute_state
  label: Zone4 Mute State
  command: MT4QSTN
  response: MT4{status}
  type: string
  description: "00=Off, 01=On"

- id: zone4_volume
  label: Zone4 Volume Level
  command: VL4QSTN
  response: VL4{level}
  type: string
  description: Zone4 volume level in hex

- id: zone4_selector
  label: Zone4 Selector Position
  command: SL4QSTN
  response: SL4{position}
  type: string
  description: Zone4 input selector position

- id: zone4_tuning
  label: Zone4 Tuning Frequency
  command: TU4QSTN
  response: TU4{freq}
  type: string
  description: Zone4 tuning frequency

- id: zone4_preset
  label: Zone4 Preset Number
  command: PR4QSTN
  response: PR4{no}
  type: string
  description: Zone4 preset number in hex
```

## Variables
```yaml
- id: master_volume_level
  label: Master Volume Level
  command: MVL
  type: integer
  min: 0
  max: 100
  description: Volume level 0-100, sent as hex

- id: tone_front_bass
  label: Front Bass Tone
  command: TFRB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_front_treble
  label: Front Treble Tone
  command: TFRT{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_front_wide_bass
  label: Front Wide Bass Tone
  command: TFWB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_front_wide_treble
  label: Front Wide Treble Tone
  command: TFWT{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_front_high_bass
  label: Front High Bass Tone
  command: TFHB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_front_high_treble
  label: Front High Treble Tone
  command: TFHT{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_center_bass
  label: Center Bass Tone
  command: TCTB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_center_treble
  label: Center Treble Tone
  command: TCTT{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_surround_bass
  label: Surround Bass Tone
  command: TSRB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_surround_treble
  label: Surround Treble Tone
  command: TSRT{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_surround_back_bass
  label: Surround Back Bass Tone
  command: TSBB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_surround_back_treble
  label: Surround Back Treble Tone
  command: TSBT{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: tone_subwoofer_bass
  label: Subwoofer Tone
  command: TSWB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: subwoofer_level
  label: Subwoofer Temporary Level
  command: SWL{level}
  type: string
  description: "-F to 00 to +C (-15dB to 0dB to +12dB)"

- id: center_level
  label: Center Temporary Level
  command: CTL{level}
  type: string
  description: "-C to 00 to +C (-12dB to 0dB to +12dB)"

- id: zone2_volume_level
  label: Zone2 Volume Level
  command: ZVL
  type: integer
  min: 0
  max: 100
  description: Zone2 volume 0-100, sent as hex (only when main is ON)

- id: zone2_balance
  label: Zone2 Balance
  command: ZBL{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: zone2_bass
  label: Zone2 Bass Tone
  command: ZTNB{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: zone2_treble
  label: Zone2 Treble Tone
  command: ZTNT{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: zone3_volume_level
  label: Zone3 Volume Level
  command: VL3
  type: integer
  min: 0
  max: 100
  description: Zone3 volume 0-100, sent as hex

- id: zone3_balance
  label: Zone3 Balance
  command: BL3{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: zone3_bass
  label: Zone3 Bass Tone
  command: TN3B{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: zone3_treble
  label: Zone3 Treble Tone
  command: TN3T{xx}
  type: string
  description: "-A to 00 to +A (-10 to 0 to +10 in 2-step increments)"

- id: zone4_volume_level
  label: Zone4 Volume Level
  command: VL4
  type: integer
  min: 0
  max: 100
  description: Zone4 volume 0-100, sent as hex

- id: tuning_frequency
  label: Tuning Frequency
  command: TUN{freq}
  type: string
  description: "Direct tuning frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch)"

- id: preset_number_var
  label: Preset Number
  command: PRS{preset}
  type: integer
  min: 1
  max: 40
  description: "Preset number 1-40 (sent as hex), or 1-30 on some models"
```

## Events
```yaml
# Device sends unsolicited status messages when state changes.
# Example: if input selector changes, receiver sends "SLI03" to controller.
# Connection must be held continuously to receive notifications.
# Only one client connection supported at a time.
# Applies to all zones: any Zone2/Zone3/Zone4 state change produces an
# unsolicited notification (e.g. "ZPW01", "VL350", "SL301").
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Zone2 volume/control only works when main zone is ON
  - Zone2 tone only works when main is ON and Zone2 is powered or variable
  - TGA/TGB/TGC 12V trigger commands only available when each trigger parameter is set to OFF in the setup menu
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source
```

## Notes
- Protocol is ISCP (Integra Serial Control Protocol) v1.15, available over both eISCP (Ethernet/TCP) and RS-232C (serial).
- eISCP packet format: magic header "ISCP" + 4-byte header size (0x00000010 big-endian) + 4-byte data size (big-endian) + 1-byte version (0x01) + 3-byte reserved (0x000000) + ISCP data.
- ISCP message format: start char "!" + unit type "1" (Receiver) + 3-char command + parameter(s) + end char (EOF=0x1A for eISCP, CR/LF for RS-232).
- RS-232C transport: 3-wire, 9600 baud, 8 data bits, 1 stop bit, no parity, no flow control. DB9 female (pin 2 TX, pin 3 RX, pin 5 GND), straight-thru cable.
- Minimum interval between commands: 50ms.
- Only one TCP client connection at a time; must maintain persistent connection to receive unsolicited status notifications.
- Volume parameters are in hexadecimal representation (e.g. "00"-"64" = decimal 0-100).
- Many commands use "QSTN" parameter to query current state, "UP"/"DOWN" for wrap-around cycling, "TG" for toggle.
- FF/REW network commands must be sent continuously with no more than 100ms delay between codes.
- Tuner function is shared by MAIN and ZONE sides but control is separated per zone.
- XM/SIRIUS/HD Radio commands are model-conditional (only on models with those tuner packs). VOS is Japanese-model only.
- Many command rows in the source support matrix show applicability varying by model generation; HT-L05 is not named in the revision history, so per-command applicability to HT-L05 is UNRESOLVED.
- DIF has two distinct meanings: the "Display Information" table (DIF00-04 = temporary displays of program/digital/bass/treble info) and the "Display Mode" table (DIF00/01/TG = persistent selector+volume/listening-mode display). Both use the DIF opcode; behavior is model-dependent.
- RAS is overloaded across three meanings depending on model generation: Re-EQ/Academy Filter, Re-EQ only, or Cinema Filter.

<!-- UNRESOLVED: exact command subset supported by HT-L05 not stated — source lists many models across columns; HT-L05 not explicitly named in the revision history -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: many commands are model-conditional (XM/SIRIUS/HD Radio/Network/Japanese) and HT-L05 support for them is unconfirmed -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T20:35:53.620Z
last_checked_at: 2026-07-21T23:41:23.711Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:41:23.711Z
matched_actions: 415
action_count: 415
confidence: medium
summary: "Near-exhaustive one-to-one mapping of the ISCP/eISCP command catalogue (main+zone2/3/4+RI-bus) with verbatim command-code and parameter matches and verified transport params; only a handful of universally-unsupported source tokens are unrepresented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SWL (Subwoofer temporary Level set/UP/DOWN)"
- "CTL (Center temporary Level set/UP/DOWN)"
- "ASCTG (CDV aspect toggle, unsupported on all listed models)"
- "CDPCD (CDV chain repeat, unsupported on all listed models)"
- "MSPUP/MSPDN (CDV multi speed, unsupported)"
- "PCT (CDV picture control, unsupported)"
- "RSCTG (CDV resolution toggle, unsupported)"
- "INIT (CDV factory reset, unsupported)"
- "exact HT-L05 firmware version compatibility not stated"
- "HT-L05 is not listed in the revision history model tables; per-command applicability to HT-L05 specifically is unclear. Many commands below are model-conditional (XM/SIRIUS/HD Radio/Japanese/Network-only) and may not apply to HT-L05"
- "configurable range 49152-65535 per source; default is 60128"
- "no explicit multi-step macro sequences in source"
- "no explicit safety warnings or interlock procedures stated in source"
- "exact command subset supported by HT-L05 not stated — source lists many models across columns; HT-L05 not explicitly named in the revision history"
- "firmware version compatibility not stated"
- "many commands are model-conditional (XM/SIRIUS/HD Radio/Network/Japanese) and HT-L05 support for them is unconfirmed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
