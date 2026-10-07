---
spec_id: admin/onkyo-pr-sc5507
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo PR-SC5507 Control Spec"
manufacturer: Onkyo
model_family: PR-SC5507
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - PR-SC5507
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:31:55.693Z
last_checked_at: 2026-10-07T20:33:36.834Z
generated_at: 2026-10-07T20:33:36.834Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact command subset supported by PR-SC5507 cannot be determined per-column from the multi-model support tables; PR-SC5507 was added to the ISCP v1.15 spec but has no dedicated Yes/No column in the support matrices"
  - "no multi-step sequences explicitly described in source"
  - "TGA/TGB/TGC triggers only available when each 12V Trigger"
  - "exact per-command support for PR-SC5507 cannot be determined from the multi-model support matrix columns (no PR-SC5507 column exists)"
  - "firmware version compatibility range not stated"
  - "whether PR-SC5507 supports XM/SIRIUS/HD Radio commands not determinable; all such rows show \"No\" across every model column in the source"
  - "Audyssey (ADY/ADQ/ADV), Dolby Volume (DVL), Music Optimizer (MOT), ISF Mode (ISF) commands are documented in the ISCP v1.15 spec but show \"No\" across every model column; included here as documented commands but device-level support for PR-SC5507 is unverified"
  - "per-channel Tone commands (TFR/TFW/TFH/TCT/TSR/TSB/TSW), SWL (subwoofer temp level), CTL (center temp level), MEM (memory setup), VOS (video output, JP-only) documented but show \"No\" across model columns"
  - "RI system peripheral commands (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR) depend on connected RI accessories, not built-in to PR-SC5507"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:33:36.834Z
  matched_actions: 354
  action_count: 354
  confidence: medium
  summary: "All 354 action units match source ISCP rows with agreeing shapes; port 60128 and 9600 8N1 serial settings are verbatim in source; coverage is near-complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Onkyo PR-SC5507 Control Spec

## Summary
The Onkyo PR-SC5507 is an A/V preamplifier/processor controllable via ISCP (Integra Serial Control Protocol) over RS-232 or eISCP over Ethernet (TCP/IP). This spec covers the eISCP over TCP transport with default port 60128. The protocol uses 3-character command codes with variable-length parameters; queries use the `QSTN` parameter suffix. The device supports multi-zone operation (Zone 2, Zone 3, Zone 4), input routing, listening modes, tuner, network/USB, and volume control.

<!-- UNRESOLVED: exact command subset supported by PR-SC5507 cannot be determined per-column from the multi-model support tables; PR-SC5507 was added to the ISCP v1.15 spec but has no dedicated Yes/No column in the support matrices -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable      # inferred from PWR power on/off/standby commands
  - queryable      # inferred from QSTN query parameter on most commands
  - routable       # inferred from SLI input selector and zone selector commands
  - levelable      # inferred from MVL master volume and tone commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PWR01
    description: Sets System On
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: PWR00
    description: Sets System Standby
    params: []

  - id: mute_on
    label: Audio Mute On
    kind: action
    command: AMT01
    description: Sets Audio Muting On
    params: []

  - id: mute_off
    label: Audio Mute Off
    kind: action
    command: AMT00
    description: Sets Audio Muting Off
    params: []

  - id: mute_toggle
    label: Audio Mute Toggle
    kind: action
    command: AMTTG
    description: Sets Audio Muting Wrap-Around
    params: []

  - id: volume_set
    label: Set Master Volume
    kind: action
    command: MVLxx
    description: Sets volume level (hex 00-64, range 0-100)
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume level 0-100 (sent as 2-char hex)

  - id: volume_up
    label: Volume Up
    kind: action
    command: MVLUP
    description: Sets Volume Level Up
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: MVLDOWN
    description: Sets Volume Level Down
    params: []

  - id: select_input
    label: Select Input
    kind: action
    command: SLIxx
    description: Selects input source
    params:
      - name: input
        type: enum
        values:
          - "00": VIDEO1 / VCR-DVR
          - "01": VIDEO2 / CBL-SAT
          - "02": VIDEO3 / GAME-TV
          - "03": VIDEO4 / AUX1
          - "04": VIDEO5 / AUX2
          - "05": VIDEO6
          - "06": VIDEO7
          - "10": DVD
          - "20": TAPE1 / TV-TAPE
          - "21": TAPE2
          - "22": PHONO
          - "23": CD
          - "24": FM
          - "25": AM
          - "26": TUNER
          - "27": MUSIC SERVER
          - "28": INTERNET RADIO
          - "29": USB / USB Front
          - "2A": USB Rear
          - "30": MULTI CH
          - "31": XM (XM model only)
          - "32": SIRIUS (SIRIUS model only)
          - "40": Universal PORT
        description: Input selector code

  - id: select_input_up
    label: Input Selector Up
    kind: action
    command: SLIUP
    description: Selector Position Wrap-Around Up
    params: []

  - id: select_input_down
    label: Input Selector Down
    kind: action
    command: SLIDOWN
    description: Selector Position Wrap-Around Down
    params: []

  - id: recout_select
    label: Select RECOUT Source
    kind: action
    command: SLRxx
    description: Sets RECOUT (record out) selector
    params:
      - name: input
        type: enum
        values:
          - "00": VIDEO1
          - "01": VIDEO2
          - "02": VIDEO3
          - "03": VIDEO4
          - "04": VIDEO5
          - "05": VIDEO6
          - "06": VIDEO7
          - "10": DVD
          - "20": TAPE1
          - "21": TAPE2
          - "22": PHONO
          - "23": CD
          - "24": FM
          - "25": AM
          - "26": TUNER
          - "27": MUSIC SERVER
          - "28": INTERNET RADIO
          - "30": MULTI CH
          - "31": XM
          - "7F": OFF
          - "80": SOURCE
        description: RECOUT selector code

  - id: audio_selector_set
    label: Set Audio Selector
    kind: action
    command: SLAxx
    description: Sets audio input selector
    params:
      - name: mode
        type: enum
        values:
          - "00": AUTO
          - "01": MULTI-CHANNEL
          - "02": ANALOG
          - "03": iLINK
          - "04": HDMI
          - "05": COAX/OPT
          - "06": BALANCE
        description: Audio selector code

  - id: audio_selector_up
    label: Audio Selector Up
    kind: action
    command: SLAUP
    description: Audio Selector Wrap-Around Up
    params: []

  - id: listening_mode_set
    label: Set Listening Mode
    kind: action
    command: LMDxx
    description: Sets listening mode
    params:
      - name: mode
        type: enum
        values:
          - "00": STEREO
          - "01": DIRECT
          - "02": SURROUND
          - "03": FILM / Game-RPG
          - "04": THX
          - "05": ACTION / Game-Action
          - "06": MUSICAL / Game-Rock
          - "07": MONO MOVIE
          - "08": ORCHESTRA
          - "09": UNPLUGGED
          - "0A": STUDIO-MIX
          - "0B": TV LOGIC
          - "0C": ALL CH STEREO
          - "0D": THEATER-DIMENSIONAL
          - "0E": ENHANCED 7 / ENHANCE / Game-Sports
          - "0F": MONO
          - "11": PURE AUDIO
          - "12": MULTIPLEX
          - "13": FULL MONO
          - "14": DOLBY VIRTUAL
          - "15": DTS Surround Sensation
          - "16": Audyssey DSX
          - "40": 5.1ch Surround / Straight Decode
          - "41": Dolby EX / DTS ES
          - "42": THX Cinema
          - "43": THX Surround EX
          - "44": THX Music
          - "45": THX Games
          - "50": U2/S2 Cinema / Cinema2
          - "51": U2/S2 Music
          - "52": U2/S2 Games
          - "80": PLII-PLIIx Movie
          - "81": PLII-PLIIx Music
          - "82": Neo:6 Cinema
          - "83": Neo:6 Music
          - "84": PLII-PLIIx THX Cinema
          - "85": Neo:6 THX Cinema
          - "86": PLII-PLIIx Game
          - "87": Neural Surr
          - "88": Neural THX / Neural Surround
          - "89": PLII-PLIIx THX Games
          - "8A": Neo:6 THX Games
          - "8B": PLII-PLIIx THX Music
          - "8C": Neo:6 THX Music
          - "8D": Neural THX Cinema
          - "8E": Neural THX Music
          - "8F": Neural THX Games
          - "90": PLIIz Height
          - "91": Neo:6 Cinema DTS Surround Sensation
          - "92": Neo:6 Music DTS Surround Sensation
          - "93": Neural Digital Music
          - "94": PLIIz Height + THX Cinema
          - "95": PLIIz Height + THX Music
          - "96": PLIIz Height + THX Games
          - "97": PLIIz Height + THX U2/S2 Cinema
          - "98": PLIIz Height + THX U2/S2 Music
          - "99": PLIIz Height + THX U2/S2 Games
          - "A0": PLIIx/PLII Movie + Audyssey DSX
          - "A1": PLIIx/PLII Music + Audyssey DSX
          - "A2": PLIIx/PLII Game + Audyssey DSX
          - "A3": Neo:6 Cinema + Audyssey DSX
          - "A4": Neo:6 Music + Audyssey DSX
          - "A5": Neural Surround + Audyssey DSX
          - "A6": Neural Digital Music + Audyssey DSX
          - "A7": Dolby EX + Audyssey DSX
        description: Listening mode code

  - id: listening_mode_up
    label: Listening Mode Up
    kind: action
    command: LMDUP
    description: Listening Mode Wrap-Around Up
    params: []

  - id: listening_mode_down
    label: Listening Mode Down
    kind: action
    command: LMDDOWN
    description: Listening Mode Wrap-Around Down
    params: []

  - id: late_night_set
    label: Set Late Night
    kind: action
    command: LTNxx
    description: Sets late night compression mode
    params:
      - name: mode
        type: enum
        values:
          - "00": Off
          - "01": Low (Dolby Digital) / On (Dolby TrueHD)
          - "02": High (Dolby Digital)
          - "03": Auto (Dolby TrueHD)
        description: Late night mode

  - id: late_night_up
    label: Late Night Up
    kind: action
    command: LTNUP
    description: Late Night State Wrap-Around Up
    params: []

  - id: reeq_academy_set
    label: Set Re-EQ / Academy Filter
    kind: action
    command: RASxx
    description: Sets Re-EQ / Academy filter state
    params:
      - name: mode
        type: enum
        values:
          - "00": Both Off
          - "01": Re-EQ On
          - "02": Academy On
        description: Re-EQ / Academy filter mode

  - id: reeq_academy_up
    label: Re-EQ / Academy Up
    kind: action
    command: RASUP
    description: Re-EQ / Academy State Wrap-Around Up
    params: []

  - id: cinema_filter_set
    label: Set Cinema Filter
    kind: action
    command: RASxx
    description: Sets Cinema Filter state (RAS code, cinema filter variant)
    params:
      - name: mode
        type: enum
        values:
          - "00": Cinema Filter Off
          - "01": Cinema Filter On
        description: Cinema filter mode

  - id: audyssey_multeq_set
    label: Set Audyssey 2EQ/MultEQ/MultEQ XT
    kind: action
    command: ADYxx
    description: Sets Audyssey MultEQ state
    params:
      - name: mode
        type: enum
        values:
          - "00": Off
          - "01": On
        description: Audyssey MultEQ mode

  - id: audyssey_dyn_eq_set
    label: Set Audyssey Dynamic EQ
    kind: action
    command: ADQxx
    description: Sets Audyssey Dynamic EQ state
    params:
      - name: mode
        type: enum
        values:
          - "00": Off
          - "01": On
        description: Dynamic EQ mode

  - id: audyssey_dyn_vol_set
    label: Set Audyssey Dynamic Volume
    kind: action
    command: ADVxx
    description: Sets Audyssey Dynamic Volume state
    params:
      - name: mode
        type: enum
        values:
          - "00": Off
          - "01": Light
          - "02": Medium
          - "03": Heavy
        description: Dynamic Volume mode

  - id: dolby_volume_set
    label: Set Dolby Volume
    kind: action
    command: DVLxx
    description: Sets Dolby Volume state
    params:
      - name: mode
        type: enum
        values:
          - "00": Off
          - "01": Low
          - "02": Mid
          - "03": High
        description: Dolby Volume mode

  - id: music_optimizer_set
    label: Set Music Optimizer
    kind: action
    command: MOTxx
    description: Sets Music Optimizer state
    params:
      - name: mode
        type: enum
        values:
          - "00": Off
          - "01": On
        description: Music Optimizer mode

  - id: speaker_level_test
    label: Speaker Level Calibration Test
    kind: action
    command: SLCTEST
    description: TEST Key for speaker level calibration
    params: []

  - id: speaker_level_chsel
    label: Speaker Level Channel Select
    kind: action
    command: SLCCHSEL
    description: CH SEL Key
    params: []

  - id: speaker_level_up
    label: Speaker Level Up
    kind: action
    command: SLCUP
    description: LEVEL + Key
    params: []

  - id: speaker_level_down
    label: Speaker Level Down
    kind: action
    command: SLCDOWN
    description: LEVEL - Key
    params: []

  - id: dimmer_set
    label: Set Dimmer Level
    kind: action
    command: DIMxx
    description: Sets front panel dimmer
    params:
      - name: level
        type: enum
        values:
          - "00": Bright
          - "01": Dim
          - "02": Dark
          - "03": Shut-Off
          - "08": Bright & LED OFF
        description: Dimmer level

  - id: dimmer_toggle
    label: Dimmer Wrap-Around Up
    kind: action
    command: DIMDIM
    description: Sets Dimmer Level Wrap-Around Up
    params: []

  - id: sleep_set
    label: Set Sleep Timer
    kind: action
    command: SLPxx
    description: Sets sleep timer (hex 01-5A for 1-90 min)
    params:
      - name: minutes
        type: integer
        min: 1
        max: 90
        description: Sleep time in minutes (sent as 2-char hex), or OFF to disable

  - id: sleep_off
    label: Sleep Timer Off
    kind: action
    command: SLPOFF
    description: Sets Sleep Time Off
    params: []

  - id: sleep_up
    label: Sleep Timer Wrap-Around Up
    kind: action
    command: SLPUP
    description: Sets Sleep Time Wrap-Around Up
    params: []

  - id: display_mode_set
    label: Set Display Mode
    kind: action
    command: DIFxx
    description: Sets display mode
    params:
      - name: mode
        type: enum
        values:
          - "00": Selector + Volume
          - "01": Selector + Listening Mode
          - "02": Digital Format (temporary display)
          - "03": Video Format (temporary display)
        description: Display mode

  - id: display_mode_toggle
    label: Display Mode Wrap-Around Up
    kind: action
    command: DIFTG
    description: Sets Display Mode Wrap-Around Up
    params: []

  - id: osd_menu
    label: OSD Menu
    kind: action
    command: OSDMENU
    description: Menu Key
    params: []

  - id: osd_up
    label: OSD Up
    kind: action
    command: OSDUP
    description: Up Key
    params: []

  - id: osd_down
    label: OSD Down
    kind: action
    command: OSDDOWN
    description: Down Key
    params: []

  - id: osd_right
    label: OSD Right
    kind: action
    command: OSDRIGHT
    description: Right Key
    params: []

  - id: osd_left
    label: OSD Left
    kind: action
    command: OSDLEFT
    description: Left Key
    params: []

  - id: osd_enter
    label: OSD Enter
    kind: action
    command: OSDENTER
    description: Enter Key
    params: []

  - id: osd_exit
    label: OSD Exit
    kind: action
    command: OSDEXIT
    description: Exit Key
    params: []

  - id: hdmi_output_set
    label: Set HDMI Output
    kind: action
    command: HDOxx
    description: Selects HDMI output routing
    params:
      - name: output
        type: enum
        values:
          - "00": Analog Only
          - "01": HDMI Main
          - "02": HDMI Sub
          - "03": Both
          - "04": Both (Main)
          - "05": Both (Sub)
        description: HDMI output selector

  - id: hdmi_output_up
    label: HDMI Output Wrap-Around Up
    kind: action
    command: HDOUP
    description: HDMI Out Selector Wrap-Around Up
    params: []

  - id: resolution_set
    label: Set Monitor Out Resolution
    kind: action
    command: RESxx
    description: Sets video output resolution
    params:
      - name: resolution
        type: enum
        values:
          - "00": Through
          - "01": Auto (HDMI Only)
          - "02": 480p
          - "03": 720p
          - "04": 1080i
          - "05": 1080p (HDMI Only)
          - "06": Source
          - "07": 1080p/24fs (HDMI Only)
        description: Monitor out resolution

  - id: resolution_up
    label: Monitor Out Resolution Wrap-Around Up
    kind: action
    command: RESUP
    description: Monitor Out Resolution Wrap-Around Up
    params: []

  - id: isf_mode_set
    label: Set ISF Mode
    kind: action
    command: ISFxx
    description: Sets ISF Mode (ISFccc calibration)
    params:
      - name: mode
        type: enum
        values:
          - "00": Custom
          - "01": Day
          - "02": Night
        description: ISF mode

  - id: isf_mode_up
    label: ISF Mode Wrap-Around Up
    kind: action
    command: ISFUP
    description: ISF Mode State Wrap-Around Up
    params: []

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

  - id: zone2_power_on
    label: Zone2 Power On
    kind: action
    command: ZPW01
    description: Sets Zone2 On
    params: []

  - id: zone2_power_standby
    label: Zone2 Power Standby
    kind: action
    command: ZPW00
    description: Sets Zone2 Standby
    params: []

  - id: zone2_mute_on
    label: Zone2 Mute On
    kind: action
    command: ZMT01
    description: Sets Zone2 Muting On
    params: []

  - id: zone2_mute_off
    label: Zone2 Mute Off
    kind: action
    command: ZMT00
    description: Sets Zone2 Muting Off
    params: []

  - id: zone2_mute_toggle
    label: Zone2 Mute Toggle
    kind: action
    command: ZMTTG
    description: Sets Zone2 Muting Wrap-Around
    params: []

  - id: zone2_volume_set
    label: Zone2 Set Volume
    kind: action
    command: ZVLxx
    description: Sets Zone2 volume (hex 00-64, range 0-100)
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume level 0-100 (sent as 2-char hex)

  - id: zone2_volume_up
    label: Zone2 Volume Up
    kind: action
    command: ZVLUP
    description: Sets Zone2 Volume Level Up
    params: []

  - id: zone2_volume_down
    label: Zone2 Volume Down
    kind: action
    command: ZVLDOWN
    description: Sets Zone2 Volume Level Down
    params: []

  - id: zone2_tone_set
    label: Zone2 Set Tone
    kind: action
    command: ZTNBxxTxx
    description: Sets Zone2 bass/treble (-10..0..+10, 2 step, sent as hex -A..00..+A)
    params:
      - name: bass
        type: integer
        min: -10
        max: 10
        description: Bass level (2-step)
      - name: treble
        type: integer
        min: -10
        max: 10
        description: Treble level (2-step)

  - id: zone2_tone_bass_up
    label: Zone2 Bass Up
    kind: action
    command: ZTNBUP
    description: Sets Zone2 Bass Up (2 step)
    params: []

  - id: zone2_tone_bass_down
    label: Zone2 Bass Down
    kind: action
    command: ZTNBDOWN
    description: Sets Zone2 Bass Down (2 step)
    params: []

  - id: zone2_tone_treble_up
    label: Zone2 Treble Up
    kind: action
    command: ZTNTUP
    description: Sets Zone2 Treble Up (2 step)
    params: []

  - id: zone2_tone_treble_down
    label: Zone2 Treble Down
    kind: action
    command: ZTNTDOWN
    description: Sets Zone2 Treble Down (2 step)
    params: []

  - id: zone2_balance_set
    label: Zone2 Set Balance
    kind: action
    command: ZBLxx
    description: Sets Zone2 balance (-10..0..+10, L..R, 2 step)
    params:
      - name: balance
        type: integer
        min: -10
        max: 10
        description: Balance (negative=Left, positive=Right)

  - id: zone2_balance_up
    label: Zone2 Balance Up
    kind: action
    command: ZBLUP
    description: Sets Zone2 Balance Up (to R, 2 step)
    params: []

  - id: zone2_balance_down
    label: Zone2 Balance Down
    kind: action
    command: ZBLDOWN
    description: Sets Zone2 Balance Down (to L, 2 step)
    params: []

  - id: zone2_select_input
    label: Zone2 Select Input
    kind: action
    command: SLZxx
    description: Selects Zone2 input source (same input codes as SLI)
    params:
      - name: input
        type: enum
        values:
          - "00": VIDEO1 / VCR-DVR
          - "01": VIDEO2 / CBL-SAT
          - "02": VIDEO3 / GAME-TV
          - "03": VIDEO4 / AUX1
          - "04": VIDEO5 / AUX2
          - "05": VIDEO6
          - "06": VIDEO7
          - "10": DVD
          - "20": TAPE1
          - "21": TAPE2
          - "22": PHONO
          - "23": CD
          - "24": FM
          - "25": AM
          - "26": TUNER
          - "27": MUSIC SERVER
          - "28": INTERNET RADIO
          - "29": USB / USB Front
          - "2A": USB Rear
          - "30": MULTI CH
          - "31": XM
          - "32": SIRIUS
          - "40": Universal PORT
          - "80": SOURCE
        description: Zone2 input selector code

  - id: zone2_tuner_set
    label: Zone2 Set Tuner Frequency
    kind: action
    command: TUZnnnnn
    description: Sets Zone2 tuning frequency directly (FM nnn.nn MHz / AM nnnnn kHz)
    params:
      - name: frequency
        type: string
        description: 5-digit frequency string

  - id: zone2_tuner_up
    label: Zone2 Tuning Up
    kind: action
    command: TUZUP
    description: Sets Zone2 Tuning Frequency Wrap-Around Up
    params: []

  - id: zone2_tuner_down
    label: Zone2 Tuning Down
    kind: action
    command: TUZDOWN
    description: Sets Zone2 Tuning Frequency Wrap-Around Down
    params: []

  - id: zone2_preset_set
    label: Zone2 Set Preset
    kind: action
    command: PRZxx
    description: Sets Zone2 preset number (hex 01-28 for presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: zone2_preset_up
    label: Zone2 Preset Up
    kind: action
    command: PRZUP
    description: Sets Zone2 Preset Wrap-Around Up
    params: []

  - id: zone2_preset_down
    label: Zone2 Preset Down
    kind: action
    command: PRZDOWN
    description: Sets Zone2 Preset Wrap-Around Down
    params: []

  - id: zone2_internet_radio_preset
    label: Zone2 Internet Radio Preset
    kind: action
    command: NPZxx
    description: Sets Zone2 internet radio preset (hex 01-28, presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: zone2_listening_mode_set
    label: Zone2 Set Listening Mode
    kind: action
    command: LMZxx
    description: Sets Zone2 listening mode
    params:
      - name: mode
        type: enum
        values:
          - "00": STEREO
          - "01": DIRECT
          - "0F": MONO
          - "12": MULTIPLEX
          - "87": DVS (PL2)
          - "88": DVS (NEO6)
        description: Zone2 listening mode code

  - id: zone2_late_night_set
    label: Zone2 Set Late Night
    kind: action
    command: LTZxx
    description: Sets Zone2 late night compression
    params:
      - name: mode
        type: enum
        values:
          - "00": Off
          - "01": Low
          - "02": High
        description: Zone2 late night mode

  - id: zone2_late_night_up
    label: Zone2 Late Night Up
    kind: action
    command: LTZUP
    description: Sets Zone2 Late Night State Wrap-Around Up
    params: []

  - id: zone2_reeq_academy_set
    label: Zone2 Set Re-EQ / Academy
    kind: action
    command: RAZxx
    description: Sets Zone2 Re-EQ / Academy filter
    params:
      - name: mode
        type: enum
        values:
          - "00": Both Off
          - "01": Re-EQ On
          - "02": Academy On
        description: Zone2 Re-EQ / Academy mode

  - id: zone2_reeq_academy_up
    label: Zone2 Re-EQ / Academy Up
    kind: action
    command: RAZUP
    description: Sets Zone2 Re-EQ / Academy Wrap-Around Up
    params: []

  - id: zone2_network_play
    label: Zone2 Network Play
    kind: action
    command: NTZPLAY
    description: Zone2 Network/USB Play Key
    params: []

  - id: zone2_network_stop
    label: Zone2 Network Stop
    kind: action
    command: NTZSTOP
    description: Zone2 Network/USB Stop Key
    params: []

  - id: zone2_network_pause
    label: Zone2 Network Pause
    kind: action
    command: NTZPAUSE
    description: Zone2 Network/USB Pause Key
    params: []

  - id: zone2_network_track_up
    label: Zone2 Network Track Up
    kind: action
    command: NTZTRUP
    description: Zone2 Network/USB Track Up Key
    params: []

  - id: zone2_network_track_down
    label: Zone2 Network Track Down
    kind: action
    command: NTZTRDN
    description: Zone2 Network/USB Track Down Key
    params: []

  - id: zone2_network_ch_up
    label: Zone2 Network Channel Up
    kind: action
    command: NTZCHUP
    description: Zone2 CH Up (for iRadio)
    params: []

  - id: zone2_network_ch_down
    label: Zone2 Network Channel Down
    kind: action
    command: NTZCHDN
    description: Zone2 CH Down (for iRadio)
    params: []

  - id: zone3_power_on
    label: Zone3 Power On
    kind: action
    command: PW301
    description: Sets Zone3 On
    params: []

  - id: zone3_power_standby
    label: Zone3 Power Standby
    kind: action
    command: PW300
    description: Sets Zone3 Standby
    params: []

  - id: zone3_mute_on
    label: Zone3 Mute On
    kind: action
    command: MT301
    description: Sets Zone3 Muting On
    params: []

  - id: zone3_mute_off
    label: Zone3 Mute Off
    kind: action
    command: MT300
    description: Sets Zone3 Muting Off
    params: []

  - id: zone3_mute_toggle
    label: Zone3 Mute Toggle
    kind: action
    command: MT3TG
    description: Sets Zone3 Muting Wrap-Around
    params: []

  - id: zone3_volume_set
    label: Zone3 Set Volume
    kind: action
    command: VL3xx
    description: Sets Zone3 volume (hex 00-64, range 0-100)
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume level 0-100 (sent as 2-char hex)

  - id: zone3_volume_up
    label: Zone3 Volume Up
    kind: action
    command: VL3UP
    description: Sets Zone3 Volume Level Up
    params: []

  - id: zone3_volume_down
    label: Zone3 Volume Down
    kind: action
    command: VL3DOWN
    description: Sets Zone3 Volume Level Down
    params: []

  - id: zone3_tone_set
    label: Zone3 Set Tone
    kind: action
    command: TN3BxxTxx
    description: Sets Zone3 bass/treble (-10..0..+10, 2 step)
    params:
      - name: bass
        type: integer
        min: -10
        max: 10
        description: Bass level (2-step)
      - name: treble
        type: integer
        min: -10
        max: 10
        description: Treble level (2-step)

  - id: zone3_tone_bass_up
    label: Zone3 Bass Up
    kind: action
    command: TN3BUP
    description: Sets Zone3 Bass Up (2 step)
    params: []

  - id: zone3_tone_bass_down
    label: Zone3 Bass Down
    kind: action
    command: TN3BDOWN
    description: Sets Zone3 Bass Down (2 step)
    params: []

  - id: zone3_tone_treble_up
    label: Zone3 Treble Up
    kind: action
    command: TN3TUP
    description: Sets Zone3 Treble Up (2 step)
    params: []

  - id: zone3_tone_treble_down
    label: Zone3 Treble Down
    kind: action
    command: TN3TDOWN
    description: Sets Zone3 Treble Down (2 step)
    params: []

  - id: zone3_balance_set
    label: Zone3 Set Balance
    kind: action
    command: BL3xx
    description: Sets Zone3 balance (-10..0..+10, L..R, 2 step)
    params:
      - name: balance
        type: integer
        min: -10
        max: 10
        description: Balance (negative=Left, positive=Right)

  - id: zone3_balance_up
    label: Zone3 Balance Up
    kind: action
    command: BL3UP
    description: Sets Zone3 Balance Up (to R, 2 step)
    params: []

  - id: zone3_balance_down
    label: Zone3 Balance Down
    kind: action
    command: BL3DOWN
    description: Sets Zone3 Balance Down (to L, 2 step)
    params: []

  - id: zone3_select_input
    label: Zone3 Select Input
    kind: action
    command: SL3xx
    description: Selects Zone3 input source (same input codes as SLZ)
    params:
      - name: input
        type: enum
        values:
          - "00": VIDEO1 / VCR-DVR
          - "01": VIDEO2 / CBL-SAT
          - "02": VIDEO3 / GAME-TV
          - "03": VIDEO4 / AUX1
          - "04": VIDEO5 / AUX2
          - "05": VIDEO6
          - "06": VIDEO7
          - "10": DVD
          - "20": TAPE1
          - "21": TAPE2
          - "22": PHONO
          - "23": CD
          - "24": FM
          - "25": AM
          - "26": TUNER
          - "27": MUSIC SERVER
          - "28": INTERNET RADIO
          - "29": USB / USB Front
          - "2A": USB Rear
          - "30": MULTI CH
          - "31": XM
          - "32": SIRIUS
          - "40": Universal PORT
          - "80": SOURCE
        description: Zone3 input selector code

  - id: zone3_tuner_set
    label: Zone3 Set Tuner Frequency
    kind: action
    command: TU3nnnnn
    description: Sets Zone3 tuning frequency directly (FM nnn.nn MHz / AM nnnnn kHz)
    params:
      - name: frequency
        type: string
        description: 5-digit frequency string

  - id: zone3_tuner_up
    label: Zone3 Tuning Up
    kind: action
    command: TU3UP
    description: Sets Zone3 Tuning Frequency Wrap-Around Up
    params: []

  - id: zone3_tuner_down
    label: Zone3 Tuning Down
    kind: action
    command: TU3DOWN
    description: Sets Zone3 Tuning Frequency Wrap-Around Down
    params: []

  - id: zone3_preset_set
    label: Zone3 Set Preset
    kind: action
    command: PR3xx
    description: Sets Zone3 preset number (hex 01-28 for presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: zone3_preset_up
    label: Zone3 Preset Up
    kind: action
    command: PR3UP
    description: Sets Zone3 Preset Wrap-Around Up
    params: []

  - id: zone3_preset_down
    label: Zone3 Preset Down
    kind: action
    command: PR3DOWN
    description: Sets Zone3 Preset Wrap-Around Down
    params: []

  - id: zone3_internet_radio_preset
    label: Zone3 Internet Radio Preset
    kind: action
    command: NP3xx
    description: Sets Zone3 internet radio preset (hex 01-28, presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: zone3_network_play
    label: Zone3 Network Play
    kind: action
    command: NT3PLAY
    description: Zone3 Network/USB Play Key
    params: []

  - id: zone3_network_stop
    label: Zone3 Network Stop
    kind: action
    command: NT3STOP
    description: Zone3 Network/USB Stop Key
    params: []

  - id: zone3_network_pause
    label: Zone3 Network Pause
    kind: action
    command: NT3PAUSE
    description: Zone3 Network/USB Pause Key
    params: []

  - id: zone3_network_track_up
    label: Zone3 Network Track Up
    kind: action
    command: NT3TRUP
    description: Zone3 Network/USB Track Up Key
    params: []

  - id: zone3_network_track_down
    label: Zone3 Network Track Down
    kind: action
    command: NT3TRDN
    description: Zone3 Network/USB Track Down Key
    params: []

  - id: zone3_network_ch_up
    label: Zone3 Network Channel Up
    kind: action
    command: NT3CHUP
    description: Zone3 CH Up (for iRadio)
    params: []

  - id: zone3_network_ch_down
    label: Zone3 Network Channel Down
    kind: action
    command: NT3CHDN
    description: Zone3 CH Down (for iRadio)
    params: []

  - id: zone4_power_on
    label: Zone4 Power On
    kind: action
    command: PW401
    description: Sets Zone4 On
    params: []

  - id: zone4_power_standby
    label: Zone4 Power Standby
    kind: action
    command: PW400
    description: Sets Zone4 Standby
    params: []

  - id: zone4_mute_on
    label: Zone4 Mute On
    kind: action
    command: MT401
    description: Sets Zone4 Muting On
    params: []

  - id: zone4_mute_off
    label: Zone4 Mute Off
    kind: action
    command: MT400
    description: Sets Zone4 Muting Off
    params: []

  - id: zone4_mute_toggle
    label: Zone4 Mute Toggle
    kind: action
    command: MT4TG
    description: Sets Zone4 Muting Wrap-Around
    params: []

  - id: zone4_volume_set
    label: Zone4 Set Volume
    kind: action
    command: VL4xx
    description: Sets Zone4 volume (hex 00-64, range 0-100)
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume level 0-100 (sent as 2-char hex)

  - id: zone4_volume_up
    label: Zone4 Volume Up
    kind: action
    command: VL4UP
    description: Sets Zone4 Volume Level Up
    params: []

  - id: zone4_volume_down
    label: Zone4 Volume Down
    kind: action
    command: VL4DOWN
    description: Sets Zone4 Volume Level Down
    params: []

  - id: zone4_select_input
    label: Zone4 Select Input
    kind: action
    command: SL4xx
    description: Selects Zone4 input source (same input codes as SLZ)
    params:
      - name: input
        type: enum
        values:
          - "00": VIDEO1 / VCR-DVR
          - "01": VIDEO2 / CBL-SAT
          - "02": VIDEO3 / GAME-TV
          - "03": VIDEO4 / AUX1
          - "04": VIDEO5 / AUX2
          - "05": VIDEO6
          - "06": VIDEO7
          - "10": DVD
          - "20": TAPE1
          - "21": TAPE2
          - "22": PHONO
          - "23": CD
          - "24": FM
          - "25": AM
          - "26": TUNER
          - "27": MUSIC SERVER
          - "28": INTERNET RADIO
          - "29": USB / USB Front
          - "2A": USB Rear
          - "30": MULTI CH
          - "31": XM
          - "32": SIRIUS
          - "40": Universal PORT
          - "80": SOURCE
        description: Zone4 input selector code

  - id: zone4_tuner_set
    label: Zone4 Set Tuner Frequency
    kind: action
    command: TU4nnnnn
    description: Sets Zone4 tuning frequency directly (FM nnn.nn MHz / AM nnnnn kHz)
    params:
      - name: frequency
        type: string
        description: 5-digit frequency string

  - id: zone4_tuner_up
    label: Zone4 Tuning Up
    kind: action
    command: TU4UP
    description: Sets Zone4 Tuning Frequency Wrap-Around Up
    params: []

  - id: zone4_tuner_down
    label: Zone4 Tuning Down
    kind: action
    command: TU4DOWN
    description: Sets Zone4 Tuning Frequency Wrap-Around Down
    params: []

  - id: zone4_preset_set
    label: Zone4 Set Preset
    kind: action
    command: PR4xx
    description: Sets Zone4 preset number (hex 01-28 for presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: zone4_preset_up
    label: Zone4 Preset Up
    kind: action
    command: PR4UP
    description: Sets Zone4 Preset Wrap-Around Up
    params: []

  - id: zone4_preset_down
    label: Zone4 Preset Down
    kind: action
    command: PR4DOWN
    description: Sets Zone4 Preset Wrap-Around Down
    params: []

  - id: zone4_internet_radio_preset
    label: Zone4 Internet Radio Preset
    kind: action
    command: NP4xx
    description: Sets Zone4 internet radio preset (hex 01-28, presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: zone4_network_play
    label: Zone4 Network Play
    kind: action
    command: NT4PLAY
    description: Zone4 Network/USB Play Key
    params: []

  - id: zone4_network_stop
    label: Zone4 Network Stop
    kind: action
    command: NT4STOP
    description: Zone4 Network/USB Stop Key
    params: []

  - id: zone4_network_pause
    label: Zone4 Network Pause
    kind: action
    command: NT4PAUSE
    description: Zone4 Network/USB Pause Key
    params: []

  - id: zone4_network_track_up
    label: Zone4 Network Track Up
    kind: action
    command: NT4TRUP
    description: Zone4 Network/USB Track Up Key
    params: []

  - id: zone4_network_track_down
    label: Zone4 Network Track Down
    kind: action
    command: NT4TRDN
    description: Zone4 Network/USB Track Down Key
    params: []

  - id: tuner_frequency_set
    label: Set Tuner Frequency
    kind: action
    command: TUNnnnnn
    description: Sets tuning frequency directly (FM nnn.nn MHz / AM nnnnn kHz)
    params:
      - name: frequency
        type: string
        description: 5-digit frequency string

  - id: tuner_up
    label: Tuning Up
    kind: action
    command: TUNUP
    description: Sets Tuning Frequency Wrap-Around Up
    params: []

  - id: tuner_down
    label: Tuning Down
    kind: action
    command: TUNDOWN
    description: Sets Tuning Frequency Wrap-Around Down
    params: []

  - id: preset_set
    label: Set Tuner Preset
    kind: action
    command: PRSxx
    description: Sets preset number (hex 01-28 for presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: preset_up
    label: Preset Up
    kind: action
    command: PRSUP
    description: Sets Preset Wrap-Around Up
    params: []

  - id: preset_down
    label: Preset Down
    kind: action
    command: PRSDOWN
    description: Sets Preset Wrap-Around Down
    params: []

  - id: rds_info_set
    label: Set RDS Information Display
    kind: action
    command: RDSxx
    description: Sets RDS information display (RDS model only)
    params:
      - name: mode
        type: enum
        values:
          - "00": RT Information
          - "01": PTY Information
          - "02": TP Information
        description: RDS information mode

  - id: rds_info_up
    label: RDS Information Wrap-Around
    kind: action
    command: RDSUP
    description: Display RDS Information Wrap-Around Change
    params: []

  - id: ptyscan_set
    label: PTY Scan Set
    kind: action
    command: PTSxx
    description: Sets PTY number for PTY Scan (RDS model only)
    params:
      - name: pty
        type: integer
        min: 0
        max: 30
        description: PTY number 0-30 (sent as 2-char hex)

  - id: ptyscan_finish
    label: PTY Scan Finish
    kind: action
    command: PTSENTER
    description: Finish PTY Scan
    params: []

  - id: tpscan_start
    label: TP Scan Start
    kind: action
    command: TPS
    description: Start TP Scan (no parameter)
    params: []

  - id: tpscan_finish
    label: TP Scan Finish
    kind: action
    command: TPSENTER
    description: Finish TP Scan
    params: []

  - id: network_play
    label: Network Play
    kind: action
    command: NTCPLAY
    description: Network/USB Play Key
    params: []

  - id: network_stop
    label: Network Stop
    kind: action
    command: NTCSTOP
    description: Network/USB Stop Key
    params: []

  - id: network_pause
    label: Network Pause
    kind: action
    command: NTCPAUSE
    description: Network/USB Pause Key
    params: []

  - id: network_track_up
    label: Network Track Up
    kind: action
    command: NTCTRUP
    description: Network/USB Track Up Key
    params: []

  - id: network_track_down
    label: Network Track Down
    kind: action
    command: NTCTRDN
    description: Network/USB Track Down Key
    params: []

  - id: network_ff
    label: Network Fast Forward
    kind: action
    command: NTCFF
    description: Network/USB FF Key (continuous; send repeatedly, max 100ms between codes)
    params: []

  - id: network_rew
    label: Network Rewind
    kind: action
    command: NTCREW
    description: Network/USB REW Key (continuous; send repeatedly, max 100ms between codes)
    params: []

  - id: network_repeat
    label: Network Repeat
    kind: action
    command: NTCREPEAT
    description: Network/USB Repeat Key
    params: []

  - id: network_random
    label: Network Random
    kind: action
    command: NTCRANDOM
    description: Network/USB Random Key
    params: []

  - id: network_display
    label: Network Display
    kind: action
    command: NTCDISPLAY
    description: Network/USB Display Key
    params: []

  - id: network_album
    label: Network Album
    kind: action
    command: NTCALBUM
    description: Network/USB Album Key
    params: []

  - id: network_artist
    label: Network Artist
    kind: action
    command: NTCARTIST
    description: Network/USB Artist Key
    params: []

  - id: network_genre
    label: Network Genre
    kind: action
    command: NTCGENRE
    description: Network/USB Genre Key
    params: []

  - id: network_playlist
    label: Network Playlist
    kind: action
    command: NTCPLAYLIST
    description: Network/USB Playlist Key
    params: []

  - id: network_right
    label: Network Right
    kind: action
    command: NTCRIGHT
    description: Network/USB Right Key
    params: []

  - id: network_left
    label: Network Left
    kind: action
    command: NTCLEFT
    description: Network/USB Left Key
    params: []

  - id: network_up
    label: Network Up
    kind: action
    command: NTCUP
    description: Network/USB Up Key
    params: []

  - id: network_down
    label: Network Down
    kind: action
    command: NTCDOWN
    description: Network/USB Down Key
    params: []

  - id: network_select
    label: Network Select
    kind: action
    command: NTCSELECT
    description: Network/USB Select Key
    params: []

  - id: network_key_0
    label: Network Key 0
    kind: action
    command: NTC0
    description: Network/USB 0 Key
    params: []

  - id: network_key_1
    label: Network Key 1
    kind: action
    command: NTC1
    description: Network/USB 1 Key
    params: []

  - id: network_key_2
    label: Network Key 2
    kind: action
    command: NTC2
    description: Network/USB 2 Key
    params: []

  - id: network_key_3
    label: Network Key 3
    kind: action
    command: NTC3
    description: Network/USB 3 Key
    params: []

  - id: network_key_4
    label: Network Key 4
    kind: action
    command: NTC4
    description: Network/USB 4 Key
    params: []

  - id: network_key_5
    label: Network Key 5
    kind: action
    command: NTC5
    description: Network/USB 5 Key
    params: []

  - id: network_key_6
    label: Network Key 6
    kind: action
    command: NTC6
    description: Network/USB 6 Key
    params: []

  - id: network_key_7
    label: Network Key 7
    kind: action
    command: NTC7
    description: Network/USB 7 Key
    params: []

  - id: network_key_8
    label: Network Key 8
    kind: action
    command: NTC8
    description: Network/USB 8 Key
    params: []

  - id: network_key_9
    label: Network Key 9
    kind: action
    command: NTC9
    description: Network/USB 9 Key
    params: []

  - id: network_delete
    label: Network Delete
    kind: action
    command: NTCDELETE
    description: Network/USB Delete Key
    params: []

  - id: network_caps
    label: Network Caps
    kind: action
    command: NTCCAPS
    description: Network/USB Caps Key
    params: []

  - id: network_location
    label: Network Location
    kind: action
    command: NTCLOCATION
    description: Network/USB Location Key
    params: []

  - id: network_language
    label: Network Language
    kind: action
    command: NTCLANGUAGE
    description: Network/USB Language Key
    params: []

  - id: network_setup
    label: Network Setup
    kind: action
    command: NTCSETUP
    description: Network/USB Setup Key
    params: []

  - id: network_return
    label: Network Return
    kind: action
    command: NTCRETURN
    description: Network/USB Return Key
    params: []

  - id: network_ch_up
    label: Network Channel Up
    kind: action
    command: NTCCHUP
    description: CH Up (for iRadio)
    params: []

  - id: network_ch_down
    label: Network Channel Down
    kind: action
    command: NTCCHDN
    description: CH Down (for iRadio)
    params: []

  - id: internet_radio_preset
    label: Internet Radio Preset
    kind: action
    command: NPRxx
    description: Sets internet radio preset (hex 01-28, presets 1-40)
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as 2-char hex)

  - id: dock_power_on
    label: RI Dock Power On
    kind: action
    command: CDSPWRON
    description: Sets Dock On (RI-connected docking station)
    params: []

  - id: dock_power_off
    label: RI Dock Standby
    kind: action
    command: CDSPWROFF
    description: Sets Dock Standby (RI-connected docking station)
    params: []

  - id: dock_play_resume
    label: RI Dock Play/Resume
    kind: action
    command: CDSPLY/RES
    description: Docking Station Play/Resume Key
    params: []

  - id: dock_stop
    label: RI Dock Stop
    kind: action
    command: CDSSTOP
    description: Docking Station Stop Key
    params: []

  - id: dock_track_up
    label: RI Dock Track Up
    kind: action
    command: CDSSKIP.F
    description: Docking Station Track Up Key
    params: []

  - id: dock_track_down
    label: RI Dock Track Down
    kind: action
    command: CDSSKIP.R
    description: Docking Station Track Down Key
    params: []

  - id: dock_pause
    label: RI Dock Pause
    kind: action
    command: CDSPAUSE
    description: Docking Station Pause Key
    params: []

  - id: dock_play_pause
    label: RI Dock Play/Pause
    kind: action
    command: CDSPLY/PAU
    description: Docking Station Play/Pause Key
    params: []

  - id: dock_ff
    label: RI Dock Fast Forward
    kind: action
    command: CDSFF
    description: Docking Station FF Key
    params: []

  - id: dock_rew
    label: RI Dock Rewind
    kind: action
    command: CDSREW
    description: Docking Station FR Key
    params: []

  - id: dock_album_up
    label: RI Dock Album Up
    kind: action
    command: CDSALBUM+
    description: Docking Station Album Up Key
    params: []

  - id: dock_album_down
    label: RI Dock Album Down
    kind: action
    command: CDSALBUM-
    description: Docking Station Album Down Key
    params: []

  - id: dock_playlist_up
    label: RI Dock Playlist Up
    kind: action
    command: CDSPLIST+
    description: Docking Station Playlist Up Key
    params: []

  - id: dock_playlist_down
    label: RI Dock Playlist Down
    kind: action
    command: CDSPLIST-
    description: Docking Station Playlist Down Key
    params: []

  - id: dock_chapter_up
    label: RI Dock Chapter Up
    kind: action
    command: CDSCHAPT+
    description: Docking Station Chapter Up Key
    params: []

  - id: dock_chapter_down
    label: RI Dock Chapter Down
    kind: action
    command: CDSCHAPT-
    description: Docking Station Chapter Down Key
    params: []

  - id: dock_random
    label: RI Dock Shuffle
    kind: action
    command: CDSRANDOM
    description: Docking Station Shuffle Key
    params: []

  - id: dock_repeat
    label: RI Dock Repeat
    kind: action
    command: CDSREPEAT
    description: Docking Station Repeat Key
    params: []

  - id: dock_mute
    label: RI Dock Mute
    kind: action
    command: CDSMUTE
    description: Docking Station Mute Key
    params: []

  - id: dock_backlight
    label: RI Dock Backlight
    kind: action
    command: CDSBLIGHT
    description: Docking Station Backlight Key
    params: []

  - id: dock_menu
    label: RI Dock Menu
    kind: action
    command: CDSMENU
    description: Docking Station Menu Key
    params: []

  - id: dock_enter
    label: RI Dock Select
    kind: action
    command: CDSENTER
    description: Docking Station Select Key
    params: []

  - id: dock_cursor_up
    label: RI Dock Cursor Up
    kind: action
    command: CDSUP
    description: Docking Station Cursor Up Key
    params: []

  - id: dock_cursor_down
    label: RI Dock Cursor Down
    kind: action
    command: CDSDOWN
    description: Docking Station Cursor Down Key
    params: []

  - id: speaker_switch_set
    label: Set Speaker Switch
    kind: action
    command: SPA
    description: Select SPA or SPB as the command and append the state parameter; exact PR-SC5507 support is UNRESOLVED
    params:
      - name: speaker
        type: enum
        values:
          - "SPA": MAIN A / Front A
          - "SPB": MAIN B / Front B
        description: Command code; source notes Front A/Front B exclusive use
      - name: state
        type: enum
        values:
          - "00": sets Speaker Off
          - "01": sets Speaker On
        description: Parameter appended to the selected command code

  - id: speaker_switch_up
    label: Speaker Switch Wrap-Around
    kind: action
    command: SPA
    description: Select SPA or SPB as the command and append UP
    params:
      - name: speaker
        type: enum
        values:
          - "SPA": MAIN A / Front A
          - "SPB": MAIN B / Front B
        description: Command code
      - name: operation
        type: enum
        values:
          - "UP": sets Speaker Switch Wrap-Around
        description: Parameter appended to the selected command code

  - id: speaker_layout_set
    label: Set Speaker Layout
    kind: action
    command: SPL
    description: Sets speaker layout by appending the layout parameter to SPL
    params:
      - name: layout
        type: enum
        values:
          - "SB": sets SurrBack Speaker
          - "FH": sets Front High Speaker / SurrBack+Front High Speakers
          - "FW": sets Front Wide Speaker / SurrBack+Front Wide Speakers
        description: Speaker layout parameter

  - id: speaker_layout_up
    label: Speaker Layout Wrap-Around
    kind: action
    command: SPL
    description: Appends UP to SPL
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets Speaker Switch Wrap-Around
        description: Speaker layout operation parameter

  - id: volume_step_set
    label: Master Volume 1dB Step
    kind: action
    command: MVL
    description: Appends the documented 1dB step parameter to MVL
    params:
      - name: direction
        type: enum
        values:
          - "UP1": sets Volume Level Up 1dB Step
          - "DOWN1": sets Volume Level Down 1dB Step
        description: Volume step parameter

  - id: channel_bass_set
    label: Set Channel Bass
    kind: action
    command: TFR
    description: Select the channel command code and append Bxx with the encoded bass level
    params:
      - name: channel
        type: enum
        values:
          - "TFR": Front
          - "TFW": Front Wide
          - "TFH": Front High
          - "TCT": Center
          - "TSR": Surround
          - "TSB": Surround Back
          - "TSW": Subwoofer
        description: Command code
      - name: bass
        type: integer
        min: -10
        max: 10
        description: 'Bxx; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: channel_treble_set
    label: Set Channel Treble
    kind: action
    command: TFR
    description: Select the channel command code and append Txx with the encoded treble level
    params:
      - name: channel
        type: enum
        values:
          - "TFR": Front
          - "TFW": Front Wide
          - "TFH": Front High
          - "TCT": Center
          - "TSR": Surround
          - "TSB": Surround Back
        description: Command code; TSW has no documented treble setter
      - name: treble
        type: integer
        min: -10
        max: 10
        description: 'Txx; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: channel_bass_up
    label: Channel Bass Up
    kind: action
    command: TFR
    description: Select the channel command code and append BUP
    params:
      - name: channel
        type: enum
        values:
          - "TFR": Front
          - "TFW": Front Wide
          - "TFH": Front High
          - "TCT": Center
          - "TSR": Surround
          - "TSB": Surround Back
          - "TSW": Subwoofer
        description: Command code
      - name: operation
        type: enum
        values:
          - "BUP": Bass up(2 step)
        description: Tone operation parameter

  - id: channel_bass_down
    label: Channel Bass Down
    kind: action
    command: TFR
    description: Select the channel command code and append BDOWN
    params:
      - name: channel
        type: enum
        values:
          - "TFR": Front
          - "TFW": Front Wide
          - "TFH": Front High
          - "TCT": Center
          - "TSR": Surround
          - "TSB": Surround Back
          - "TSW": Subwoofer
        description: Command code
      - name: operation
        type: enum
        values:
          - "BDOWN": Bass down(2 step)
        description: Tone operation parameter

  - id: channel_treble_up
    label: Channel Treble Up
    kind: action
    command: TFR
    description: Select the channel command code and append TUP
    params:
      - name: channel
        type: enum
        values:
          - "TFR": Front
          - "TFW": Front Wide
          - "TFH": Front High
          - "TCT": Center
          - "TSR": Surround
          - "TSB": Surround Back
        description: Command code
      - name: operation
        type: enum
        values:
          - "TUP": Treble up(2 step)
        description: Tone operation parameter

  - id: channel_treble_down
    label: Channel Treble Down
    kind: action
    command: TFR
    description: Select the channel command code and append TDOWN
    params:
      - name: channel
        type: enum
        values:
          - "TFR": Front
          - "TFW": Front Wide
          - "TFH": Front High
          - "TCT": Center
          - "TSR": Surround
          - "TSB": Surround Back
        description: Command code
      - name: operation
        type: enum
        values:
          - "TDOWN": Treble down(2 step)
        description: Tone operation parameter

  - id: subwoofer_level_set
    label: Set Temporary Subwoofer Level
    kind: action
    command: SWL
    description: Appends the encoded temporary subwoofer level to SWL
    params:
      - name: level
        type: integer
        min: -15
        max: 12
        description: '"-F"-"00"-"+C"; sets Subwoofer Level-15dB-0dB-+12dB'

  - id: subwoofer_level_up
    label: Temporary Subwoofer Level Up
    kind: action
    command: SWL
    description: Appends UP to SWL
    params:
      - name: operation
        type: enum
        values:
          - "UP": LEVEL + Key
        description: Temporary level operation parameter

  - id: subwoofer_level_down
    label: Temporary Subwoofer Level Down
    kind: action
    command: SWL
    description: Appends DOWN to SWL
    params:
      - name: operation
        type: enum
        values:
          - "DOWN": LEVEL–KEY
        description: Temporary level operation parameter

  - id: center_level_set
    label: Set Temporary Center Level
    kind: action
    command: CTL
    description: Appends the encoded temporary center level to CTL
    params:
      - name: level
        type: integer
        min: -12
        max: 12
        description: '"-C"-"00"-"+C"; sets Center Level-12dB-0dB-+12dB'

  - id: center_level_up
    label: Temporary Center Level Up
    kind: action
    command: CTL
    description: Appends UP to CTL
    params:
      - name: operation
        type: enum
        values:
          - "UP": LEVEL + Key
        description: Temporary level operation parameter

  - id: center_level_down
    label: Temporary Center Level Down
    kind: action
    command: CTL
    description: Appends DOWN to CTL
    params:
      - name: operation
        type: enum
        values:
          - "DOWN": LEVEL–KEY
        description: Temporary level operation parameter

  - id: osd_audio_adjust
    label: OSD Audio Adjust
    kind: action
    command: OSD
    description: Appends AUDIO to OSD
    params:
      - name: operation
        type: enum
        values:
          - "AUDIO": Audio Adjust Key
        description: Setup operation parameter

  - id: osd_video_adjust
    label: OSD Video Adjust
    kind: action
    command: OSD
    description: Appends VIDEO to OSD
    params:
      - name: operation
        type: enum
        values:
          - "VIDEO": Video Adjust Key
        description: Setup operation parameter

  - id: memory_store
    label: Store Memory
    kind: action
    command: MEM
    description: Appends STR to MEM
    params:
      - name: operation
        type: enum
        values:
          - "STR": stores memory
        description: Memory setup parameter

  - id: memory_recall
    label: Recall Memory
    kind: action
    command: MEM
    description: Appends RCL to MEM
    params:
      - name: operation
        type: enum
        values:
          - "RCL": recalls memory
        description: Memory setup parameter

  - id: memory_lock
    label: Lock Memory
    kind: action
    command: MEM
    description: Appends LOCK to MEM
    params:
      - name: operation
        type: enum
        values:
          - "LOCK": locks memory
        description: Memory setup parameter

  - id: memory_unlock
    label: Unlock Memory
    kind: action
    command: MEM
    description: Appends UNLK to MEM
    params:
      - name: operation
        type: enum
        values:
          - "UNLK": unlocks memory
        description: Memory setup parameter

  - id: video_output_set
    label: Set Video Output
    kind: action
    command: VOS
    description: Appends the video output parameter to VOS (Japanese Model Only)
    params:
      - name: output
        type: enum
        values:
          - "00": sets D4
          - "01": sets Component
        description: Video output selector parameter

  - id: listening_mode_category_up
    label: Listening Mode Category Up
    kind: action
    command: LMD
    description: Appends the category parameter to LMD for Listening Mode Wrap-Around Up
    params:
      - name: category
        type: enum
        values:
          - "MOVIE": sets Listening Mode Wrap-Around Up
          - "MUSIC": sets Listening Mode Wrap-Around Up
          - "GAME": sets Listening Mode Wrap-Around Up
        description: Listening mode category parameter

  - id: audyssey_multeq_up
    label: Audyssey MultEQ Wrap-Around Up
    kind: action
    command: ADY
    description: Appends UP to ADY
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up
        description: Audyssey operation parameter

  - id: audyssey_dyn_eq_up
    label: Audyssey Dynamic EQ Wrap-Around Up
    kind: action
    command: ADQ
    description: Appends UP to ADQ
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets Audyssey Dynamic EQ State Wrap-Around Up
        description: Dynamic EQ operation parameter

  - id: audyssey_dyn_vol_up
    label: Audyssey Dynamic Volume Wrap-Around Up
    kind: action
    command: ADV
    description: Appends UP to ADV
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets Audyssey Dynamic Volume State Wrap-Around Up
        description: Dynamic Volume operation parameter

  - id: dolby_volume_up
    label: Dolby Volume Wrap-Around Up
    kind: action
    command: DVL
    description: Appends UP to DVL
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets Dolby Volume State Wrap-Around Up
        description: Dolby Volume operation parameter

  - id: music_optimizer_up
    label: Music Optimizer Wrap-Around Up
    kind: action
    command: MOT
    description: Appends UP to MOT
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets Music Optimizer State Wrap-Around Up
        description: Music Optimizer operation parameter

  - id: preset_memory_set
    label: Set Preset Memory
    kind: action
    command: PRM
    description: Preset Memory Command (Include Tuner Pack Model Only); append the preset as hexadecimal
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: '"01"-"28": sets Preset No. 1-40 ( In hexadecimal representation); source also documents "01"-"1E" for Preset No. 1-30; applicable model range is UNRESOLVED'

  - id: xm_channel_set
    label: Set XM Channel
    kind: action
    command: XCH
    description: Appends the three-digit channel number to XCH (XM Model Only)
    params:
      - name: channel
        type: integer
        min: 0
        max: 255
        description: '"000"-"255"; XM Channel Number"000-255"'

  - id: xm_channel_up
    label: XM Channel Up
    kind: action
    command: XCH
    description: Appends UP to XCH (XM Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets XM Channel Wrap-Around Up
        description: XM channel operation parameter

  - id: xm_channel_down
    label: XM Channel Down
    kind: action
    command: XCH
    description: Appends DOWN to XCH (XM Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "DOWN": sets XM Channel Wrap-Around Down
        description: XM channel operation parameter

  - id: xm_category_up
    label: XM Category Up
    kind: action
    command: XCT
    description: Appends UP to XCT (XM Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets XM Category Wrap-Around Up
        description: XM category operation parameter

  - id: xm_category_down
    label: XM Category Down
    kind: action
    command: XCT
    description: Appends DOWN to XCT (XM Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "DOWN": sets XM Category Wrap-Around Down
        description: XM category operation parameter

  - id: sirius_channel_set
    label: Set SIRIUS Channel
    kind: action
    command: SCH
    description: Appends the three-digit channel number to SCH (SIRIUS Model Only)
    params:
      - name: channel
        type: integer
        min: 0
        max: 255
        description: '"000"-"255"; SIRIUS Channel Number"000-255"'

  - id: sirius_channel_up
    label: SIRIUS Channel Up
    kind: action
    command: SCH
    description: Appends UP to SCH (SIRIUS Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets SIRIUS Channel Wrap-Around Up
        description: SIRIUS channel operation parameter

  - id: sirius_channel_down
    label: SIRIUS Channel Down
    kind: action
    command: SCH
    description: Appends DOWN to SCH (SIRIUS Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "DOWN": sets SIRIUS Channel Wrap-Around Down
        description: SIRIUS channel operation parameter

  - id: sirius_category_up
    label: SIRIUS Category Up
    kind: action
    command: SCT
    description: Appends UP to SCT (SIRIUS Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "UP": sets SIRIUS Category Wrap-Around Up
        description: SIRIUS category operation parameter

  - id: sirius_category_down
    label: SIRIUS Category Down
    kind: action
    command: SCT
    description: Appends DOWN to SCT (SIRIUS Model Only)
    params:
      - name: operation
        type: enum
        values:
          - "DOWN": sets SIRIUS Category Wrap-Around Down
        description: SIRIUS category operation parameter

  - id: sirius_parental_lock_password
    label: SIRIUS Parental Lock Password
    kind: action
    command: SLK
    description: Appends the password to SLK (SIRIUS Model Only)
    params:
      - name: password
        type: string
        description: '"nnnn": Lock Password (4Digits); numeric range is UNRESOLVED'

  - id: hd_radio_program_set
    label: Set HD Radio Program
    kind: action
    command: HPR
    description: Appends the program parameter to HPR (HD Radio Model Only)
    params:
      - name: program
        type: enum
        values:
          - "01": "01"
          - "02": "02"
          - "03": "03"
          - "04": "04"
          - "05": "05"
          - "06": "06"
          - "07": "07"
          - "08": "08"
        description: '"01"-"08"; sets directly HD Radio Channel Program'

  - id: hd_radio_blend_set
    label: Set HD Radio Blend Mode
    kind: action
    command: HBL
    description: Appends the blend parameter to HBL (HD Radio Model Only)
    params:
      - name: mode
        type: enum
        values:
          - "00": Auto
          - "01": Analog
        description: HD Radio Blend Mode parameter

  - id: ri_cd_player_control
    label: RI CD Player Control
    kind: action
    command: CCD
    description: Appends the documented operation parameter to CCD for a connected RI CD player
    params:
      - name: operation
        type: enum
        values:
          - "TRACK": TRACK+
          - "PLAY": PLAY
          - "STOP": STOP
          - "PAUSE": PAUSE
          - "SKIP.F": ">>I"
          - "SKIP.R": "I<<"
          - "MEMORY": MEMORY
          - "CLEAR": CLEAR
          - "REPEAT": REPEAT
          - "RANDOM": RANDOM
          - "DISP": DISPLAY
          - "D.MODE": D.MODE
          - "FF": "FF >>"
          - "REW": "REW <<"
          - "OP/CL": OPEN/CLOSE
          - "1": "1"
          - "2": "2"
          - "3": "3"
          - "4": "4"
          - "5": "5"
          - "6": "6"
          - "7": "7"
          - "8": "8"
          - "9": "9"
          - "0": "0"
          - "10": "10"
          - "+10": "+10"
          - "D.SKIP": DISC +
          - "DISC.F": DISC +
          - "DISC.R": DISC-
          - "DISC1": DISC1
          - "DISC2": DISC2
          - "DISC3": DISC3
          - "DISC4": DISC4
          - "DISC5": DISC5
          - "DISC6": DISC6
          - "STBY": STANDBY
          - "PON": POWER ON
        description: CD Player Operation Command parameter; accessory and per-model support are UNRESOLVED

  - id: ri_tape_control
    label: RI Tape Control
    kind: action
    command: CT1
    description: Select CT1 or CT2 as the command and append the operation parameter; OP/CL, SKIP.F, SKIP.R and REC are documented only for CT2
    params:
      - name: deck
        type: enum
        values:
          - "CT1": TAPE1(A)
          - "CT2": TAPE2(B)
        description: Command code
      - name: operation
        type: enum
        values:
          - "PLAY.F": "PLAY >"
          - "PLAY.R": "PLAY <"
          - "STOP": STOP
          - "RC/PAU": REC/PAUSE
          - "FF": "FF >>"
          - "REW": "REW <<"
          - "OP/CL": OPEN/CLOSE
          - "SKIP.F": ">>I"
          - "SKIP.R": "I<<"
          - "REC": REC
        description: Tape operation parameter; accessory and per-model support are UNRESOLVED

  - id: ri_equalizer_preset
    label: RI Equalizer Preset
    kind: action
    command: CEQ
    description: Appends PRESET to CEQ for a connected RI graphics equalizer
    params:
      - name: operation
        type: enum
        values:
          - "PRESET": PRESET
        description: Graphics Equalizer Operation Command parameter

  - id: ri_dat_control
    label: RI DAT Recorder Control
    kind: action
    command: CDT
    description: Appends the operation parameter to CDT for a connected RI DAT recorder
    params:
      - name: operation
        type: enum
        values:
          - "PLAY": PLAY
          - "RC/PAU": REC/PAUSE
          - "STOP": STOP
          - "SKIP.F": ">>I"
          - "SKIP.R": "I<<"
          - "FF": "FF >>"
          - "REW": "REW <<"
        description: DAT Recorder Operation Command parameter; accessory and per-model support are UNRESOLVED

  - id: ri_dvd_player_control
    label: RI DVD Player Control
    kind: action
    command: CDV
    description: Appends the documented operation parameter to CDV for a connected RI DVD player
    params:
      - name: operation
        type: enum
        values:
          - "PWRON": POWER ON
          - "PWROFF": POWER OFF
          - "PLAY": PLAY
          - "STOP": STOP
          - "SKIP.F": ">>I"
          - "SKIP.R": "I<<"
          - "FF": "FF >>"
          - "REW": "REW <<"
          - "PAUSE": PAUSE
          - "LASTPLAY": LAST PLAY
          - "SUBTON/OFF": SUBTITLE ON/OFF
          - "SUBTITLE": SUBTITLE
          - "SETUP": SETUP
          - "TOPMENU": TOPMENU
          - "MENU": MENU
          - "UP": UP
          - "DOWN": DOWN
          - "LEFT": LEFT
          - "RIGHT": RIGHT
          - "ENTER": ENTER
          - "RETURN": RETURN
          - "DISC.F": DISC +
          - "DISC.R": DISC-
          - "AUDIO": AUDIO
          - "RANDOM": RANDOM
          - "OP/CL": OPEN/CLOSE
          - "ANGLE": ANGLE
          - "1": "1"
          - "2": "2"
          - "3": "3"
          - "4": "4"
          - "5": "5"
          - "6": "6"
          - "7": "7"
          - "8": "8"
          - "9": "9"
          - "10": "10"
          - "0": "0"
          - "SEARCH": SEARCH
          - "DISP": DISPLAY
          - "REPEAT": REPEAT
          - "MEMORY": MEMORY
          - "CLEAR": CLEAR
          - "ABR": A-B REPEAT
          - "STEP.F": STEP
          - "STEP.R": STEP BACK
          - "SLOW.F": SLOW
          - "SLOW.R": SLOW BACK
          - "ZOOMTG": ZOOM
          - "ZOOMUP": ZOOM UP
          - "ZOOMDN": ZOOM DOWN
          - "PROGRE": PROGRESSIVE
          - "VDOFF": VIDEO ON/OFF
          - "CONMEM": CONDITION MEMORY
          - "FUNMEM": FUNCTION MEMORY
          - "DISC1": DISC1
          - "DISC2": DISC2
          - "DISC3": DISC3
          - "DISC4": DISC4
          - "DISC5": DISC5
          - "DISC6": DISC6
          - "FOLDUP": FOLDER UP
          - "FOLDDN": FOLDER DOWN
          - "P.MODE": PLAY MODE
          - "ASCTG": ASPECT(Toggle)
          - "CDPCD": CD CHAIN REPEAT
          - "MSPUP": MULTI SPEED UP
          - "MSPDN": MULTI SPEED DOWN
          - "PCT": PICTURE CONTROL
          - "RSCTG": RESOLUTION(Toggle)
          - "INIT": Return to Factory Settings
        description: DVD Player Operation Command parameter; accessory and per-model support are UNRESOLVED

  - id: ri_md_control
    label: RI MD Recorder Control
    kind: action
    command: CMD
    description: Appends the documented operation parameter to CMD for a connected RI MD recorder
    params:
      - name: operation
        type: enum
        values:
          - "PLAY": PLAY
          - "STOP": STOP
          - "FF": "FF >>"
          - "REW": "REW <<"
          - "P.MODE": PLAY MODE
          - "SKIP.F": ">>I"
          - "SKIP.R": "I<<"
          - "PAUSE": PAUSE
          - "REC": REC
          - "MEMORY": MEMORY
          - "DISP": DISPLAY
          - "SCROLL": SCROLL
          - "M.SCAN": MUSIC SCAN
          - "CLEAR": CLEAR
          - "RANDOM": RANDOM
          - "REPEAT": REPEAT
          - "ENTER": ENTER
          - "EJECT": EJECT
          - "1": "1"
          - "2": "2"
          - "3": "3"
          - "4": "4"
          - "5": "5"
          - "6": "6"
          - "7": "7"
          - "8": "8"
          - "9": "9"
          - "10/0": "10/0"
          - "nn/nnn": "--/---"
          - "NAME": NAME
          - "GROUP": GROUP
          - "STBY": STANDBY
        description: MD Recorder Operation Command parameter; nn/nnn is the documented --/--- key token, not an invented numeric range

  - id: ri_cd_r_control
    label: RI CD-R Recorder Control
    kind: action
    command: CCR
    description: Appends the documented operation parameter to CCR for a connected RI CD-R recorder
    params:
      - name: operation
        type: enum
        values:
          - "P.MODE": PLAY MODE
          - "PLAY": PLAY
          - "STOP": STOP
          - "SKIP.F": ">>I"
          - "SKIP.R": "I<<"
          - "PAUSE": PAUSE
          - "REC": REC
          - "CLEAR": CLEAR
          - "REPEAT": REPEAT
          - "1": "1"
          - "2": "2"
          - "3": "3"
          - "4": "4"
          - "5": "5"
          - "6": "6"
          - "7": "7"
          - "8": "8"
          - "9": "9"
          - "10/0": "10/0"
          - "nn/nnn": "--/---"
          - "SCROLL": SCROLL
          - "OP/CL": OPEN/CLOSE
          - "DISP": DISPLAY
          - "RANDOM": RANDOM
          - "MEMORY": MEMORY
          - "FF": FF
          - "REW": REW
          - "STBY": STANDBY
        description: CD-R Recorder Operation Command parameter; accessory and per-model support are UNRESOLVED
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: PWRQSTN
    query_command: PWRQSTN
    type: enum
    values:
      - "00": Standby
      - "01": On

  - id: mute_state
    label: Mute State
    command: AMTQSTN
    query_command: AMTQSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: volume_level
    label: Master Volume Level
    command: MVLQSTN
    query_command: MVLQSTN
    type: string
    description: Returns hex value 00-64 (0-100)

  - id: input_state
    label: Input Selector State
    command: SLIQSTN
    query_command: SLIQSTN
    type: enum
    description: Returns current input selector code (same codes as SLI action)

  - id: recout_state
    label: RECOUT Selector State
    command: SLRQSTN
    query_command: SLRQSTN
    type: enum
    description: Returns RECOUT selector code (same codes as SLR action)

  - id: audio_selector_state
    label: Audio Selector State
    command: SLAQSTN
    query_command: SLAQSTN
    type: enum
    description: Returns audio selector code (same codes as SLA action)

  - id: listening_mode_state
    label: Listening Mode State
    command: LMDQSTN
    query_command: LMDQSTN
    type: enum
    description: Returns current listening mode code (same codes as LMD action)

  - id: late_night_state
    label: Late Night State
    command: LTNQSTN
    query_command: LTNQSTN
    type: enum
    values:
      - "00": Off
      - "01": Low
      - "02": High
      - "03": Auto

  - id: reeq_academy_state
    label: Re-EQ / Academy State
    command: RASQSTN
    query_command: RASQSTN
    type: enum
    values:
      - "00": Both Off
      - "01": Re-EQ On
      - "02": Academy On

  - id: audyssey_multeq_state
    label: Audyssey MultEQ State
    command: ADYQSTN
    query_command: ADYQSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: audyssey_dyn_eq_state
    label: Audyssey Dynamic EQ State
    command: ADQQSTN
    query_command: ADQQSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: audyssey_dyn_vol_state
    label: Audyssey Dynamic Volume State
    command: ADVQSTN
    query_command: ADVQSTN
    type: enum
    values:
      - "00": Off
      - "01": Light
      - "02": Medium
      - "03": Heavy

  - id: dolby_volume_state
    label: Dolby Volume State
    command: DVLQSTN
    query_command: DVLQSTN
    type: enum
    values:
      - "00": Off
      - "01": Low
      - "02": Mid
      - "03": High

  - id: music_optimizer_state
    label: Music Optimizer State
    command: MOTQSTN
    query_command: MOTQSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: dimmer_state
    label: Dimmer Level State
    command: DIMQSTN
    query_command: DIMQSTN
    type: enum
    values:
      - "00": Bright
      - "01": Dim
      - "02": Dark
      - "03": Shut-Off
      - "08": Bright & LED OFF

  - id: sleep_state
    label: Sleep Timer State
    command: SLPQSTN
    query_command: SLPQSTN
    type: string
    description: Returns hex 01-5A (1-90 min) or OFF

  - id: display_mode_state
    label: Display Mode State
    command: DIFQSTN
    query_command: DIFQSTN
    type: enum
    values:
      - "00": Selector + Volume
      - "01": Selector + Listening Mode

  - id: hdmi_output_state
    label: HDMI Output State
    command: HDOQSTN
    query_command: HDOQSTN
    type: enum
    description: Returns HDMI output selector code

  - id: resolution_state
    label: Monitor Out Resolution State
    command: RESQSTN
    query_command: RESQSTN
    type: enum
    description: Returns resolution code

  - id: isf_mode_state
    label: ISF Mode State
    command: ISFQSTN
    query_command: ISFQSTN
    type: enum
    values:
      - "00": Custom
      - "01": Day
      - "02": Night

  - id: zone2_power_state
    label: Zone2 Power State
    command: ZPWQSTN
    query_command: ZPWQSTN
    type: enum
    values:
      - "00": Standby
      - "01": On

  - id: zone2_mute_state
    label: Zone2 Mute State
    command: ZMTQSTN
    query_command: ZMTQSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: zone2_volume_level
    label: Zone2 Volume Level
    command: ZVLQSTN
    query_command: ZVLQSTN
    type: string
    description: Returns hex value for Zone2 volume

  - id: zone2_tone_state
    label: Zone2 Tone State
    command: ZTNQSTN
    query_command: ZTNQSTN
    type: string
    description: Returns Zone2 tone "BxxTxx"

  - id: zone2_balance_state
    label: Zone2 Balance State
    command: ZBLQSTN
    query_command: ZBLQSTN
    type: string
    description: Returns Zone2 balance value

  - id: zone2_input_state
    label: Zone2 Input State
    command: SLZQSTN
    query_command: SLZQSTN
    type: enum
    description: Returns Zone2 input selector code

  - id: zone2_tuner_frequency
    label: Zone2 Tuner Frequency
    command: TUZQSTN
    query_command: TUZQSTN
    type: string
    description: Returns Zone2 current tuning frequency

  - id: zone2_preset_state
    label: Zone2 Preset State
    command: PRZQSTN
    query_command: PRZQSTN
    type: string
    description: Returns Zone2 preset number (hex)

  - id: zone2_late_night_state
    label: Zone2 Late Night State
    command: LTZQSTN
    query_command: LTZQSTN
    type: enum
    values:
      - "00": Off
      - "01": Low
      - "02": High

  - id: zone2_reeq_state
    label: Zone2 Re-EQ / Academy State
    command: RAZQSTN
    query_command: RAZQSTN
    type: enum
    values:
      - "00": Both Off
      - "01": Re-EQ On
      - "02": Academy On

  - id: zone3_power_state
    label: Zone3 Power State
    command: PW3QSTN
    query_command: PW3QSTN
    type: enum
    values:
      - "00": Standby
      - "01": On

  - id: zone3_mute_state
    label: Zone3 Mute State
    command: MT3QSTN
    query_command: MT3QSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: zone3_volume_level
    label: Zone3 Volume Level
    command: VL3QSTN
    query_command: VL3QSTN
    type: string
    description: Returns hex value for Zone3 volume

  - id: zone3_tone_state
    label: Zone3 Tone State
    command: TN3QSTN
    query_command: TN3QSTN
    type: string
    description: Returns Zone3 tone "BxxTxx"

  - id: zone3_balance_state
    label: Zone3 Balance State
    command: BL3QSTN
    query_command: BL3QSTN
    type: string
    description: Returns Zone3 balance value

  - id: zone3_input_state
    label: Zone3 Input State
    command: SL3QSTN
    query_command: SL3QSTN
    type: enum
    description: Returns Zone3 input selector code

  - id: zone3_tuner_frequency
    label: Zone3 Tuner Frequency
    command: TU3QSTN
    query_command: TU3QSTN
    type: string
    description: Returns Zone3 current tuning frequency

  - id: zone3_preset_state
    label: Zone3 Preset State
    command: PR3QSTN
    query_command: PR3QSTN
    type: string
    description: Returns Zone3 preset number (hex)

  - id: zone4_power_state
    label: Zone4 Power State
    command: PW4QSTN
    query_command: PW4QSTN
    type: enum
    values:
      - "00": Standby
      - "01": On

  - id: zone4_mute_state
    label: Zone4 Mute State
    command: MT4QSTN
    query_command: MT4QSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: zone4_volume_level
    label: Zone4 Volume Level
    command: VL4QSTN
    query_command: VL4QSTN
    type: string
    description: Returns hex value for Zone4 volume

  - id: zone4_input_state
    label: Zone4 Input State
    command: SL4QSTN
    query_command: SL4QSTN
    type: enum
    description: Returns Zone4 input selector code

  - id: zone4_tuner_frequency
    label: Zone4 Tuner Frequency
    command: TU4QSTN
    query_command: TU4QSTN
    type: string
    description: Returns Zone4 current tuning frequency

  - id: zone4_preset_state
    label: Zone4 Preset State
    command: PR4QSTN
    query_command: PR4QSTN
    type: string
    description: Returns Zone4 preset number (hex)

  - id: tuner_frequency
    label: Tuner Frequency
    command: TUNQSTN
    query_command: TUNQSTN
    type: string
    description: Returns current tuning frequency

  - id: preset_state
    label: Tuner Preset State
    command: PRSQSTN
    query_command: PRSQSTN
    type: string
    description: Returns current preset number (hex)

  - id: network_artist_name
    label: Net/USB Artist Name
    command: NATQSTN
    query_command: NATQSTN
    type: string
    description: Returns Net/USB artist name (variable-length, 64 letters max)

  - id: network_album_name
    label: Net/USB Album Name
    command: NALQSTN
    query_command: NALQSTN
    type: string
    description: Returns Net/USB album name (variable-length, 64 letters max)

  - id: network_title_name
    label: Net/USB Title Name
    command: NTIQSTN
    query_command: NTIQSTN
    type: string
    description: Returns Net/USB title name (variable-length, 64 letters max)

  - id: network_time_info
    label: Net/USB Time Info
    command: NTMQSTN
    query_command: NTMQSTN
    type: string
    description: Returns "mm:ss/mm:ss" (Elapsed time / Track time, max 99:59)

  - id: network_track_info
    label: Net/USB Track Info
    command: NTRQSTN
    query_command: NTRQSTN
    type: string
    description: Returns "cccc/tttt" (Current Track / Total Track, max 9999)

  - id: network_play_status
    label: Network Play Status
    command: NSTQSTN
    query_command: NSTQSTN
    type: string
    description: "3-character string: p=Play Status (S=STOP, P=Play, p=Pause, F=FF, R=FR), r=Repeat (-/R/F/1), s=Shuffle (-/S/A)"

  - id: audio_info
    label: Audio Information
    command: IFAQSTN
    query_command: IFAQSTN
    type: string
    description: Returns audio format information

  - id: video_info
    label: Video Information
    command: IFVQSTN
    query_command: IFVQSTN
    type: string
    description: Returns video format information

  - id: speaker_a_state
    label: Speaker A State
    command: SPA
    query_command: SPAQSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: speaker_b_state
    label: Speaker B State
    command: SPB
    query_command: SPBQSTN
    type: enum
    values:
      - "00": Off
      - "01": On

  - id: speaker_layout_state
    label: Speaker Layout State
    command: SPL
    query_command: SPLQSTN
    type: enum
    values:
      - "SB": SurrBack Speaker
      - "FH": Front High Speaker / SurrBack+Front High Speakers
      - "FW": Front Wide Speaker / SurrBack+Front Wide Speakers

  - id: front_tone_state
    label: Front Tone State
    command: TFR
    query_command: TFRQSTN
    type: string
    description: 'Front Tone ("BxxTxx"); xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: front_wide_tone_state
    label: Front Wide Tone State
    command: TFW
    query_command: TFWQSTN
    type: string
    description: 'Front Wide Tone ("BxxTxx"); xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: front_high_tone_state
    label: Front High Tone State
    command: TFH
    query_command: TFHQSTN
    type: string
    description: 'Front High Tone ("BxxTxx"); xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: center_tone_state
    label: Center Tone State
    command: TCT
    query_command: TCTQSTN
    type: string
    description: 'Center Tone ("BxxTxx"); xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: surround_tone_state
    label: Surround Tone State
    command: TSR
    query_command: TSRQSTN
    type: string
    description: 'Surround Tone ("BxxTxx"); xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: surround_back_tone_state
    label: Surround Back Tone State
    command: TSB
    query_command: TSBQSTN
    type: string
    description: 'Surround Back Tone ("BxxTxx"); xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: subwoofer_tone_state
    label: Subwoofer Tone State
    command: TSW
    query_command: TSWQSTN
    type: string
    description: 'Source documents Subwoofer Tone ("BxxTxx") for the query, but only bass setters; treble semantics are UNRESOLVED'

  - id: subwoofer_level_state
    label: Temporary Subwoofer Level State
    command: SWL
    query_command: SWLQSTN
    type: string
    description: 'Subwoofer Level; "-F"-"00"-"+C"; -15dB-0dB-+12dB'

  - id: center_level_state
    label: Temporary Center Level State
    command: CTL
    query_command: CTLQSTN
    type: string
    description: 'Center temporary level command; "-C"-"00"-"+C"; -12dB-0dB-+12dB; source query description says Subwoofer Level, so that wording is UNRESOLVED'

  - id: video_output_state
    label: Video Output State
    command: VOS
    query_command: VOSQSTN
    type: enum
    values:
      - "00": D4
      - "01": Component

  - id: xm_channel_name
    label: XM Channel Name
    command: XCN
    query_command: XCNQSTN
    type: string
    description: 'XM Channel Name (XM Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: xm_artist_name
    label: XM Artist Name
    command: XAT
    query_command: XATQSTN
    type: string
    description: 'XM Artist Name (XM Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: xm_title
    label: XM Title
    command: XTI
    query_command: XTIQSTN
    type: string
    description: 'XM Title (XM Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: xm_channel_number
    label: XM Channel Number
    command: XCH
    query_command: XCHQSTN
    type: string
    description: 'XM Channel Number"000-255" (XM Model Only)'

  - id: xm_category
    label: XM Category
    command: XCT
    query_command: XCTQSTN
    type: string
    description: 'XM Category Info (XM Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: sirius_channel_name
    label: SIRIUS Channel Name
    command: SCN
    query_command: SCNQSTN
    type: string
    description: 'SIRIUS Channel Name (SIRIUS Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: sirius_artist_name
    label: SIRIUS Artist Name
    command: SAT
    query_command: SATQSTN
    type: string
    description: 'SIRIUS Artist Name (SIRIUS Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: sirius_title
    label: SIRIUS Title
    command: STI
    query_command: STIQSTN
    type: string
    description: 'SIRIUS Title (SIRIUS Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: sirius_channel_number
    label: SIRIUS Channel Number
    command: SCH
    query_command: SCHQSTN
    type: string
    description: 'SIRIUS Channel Number"000-255" (SIRIUS Model Only)'

  - id: sirius_category
    label: SIRIUS Category
    command: SCT
    query_command: SCTQSTN
    type: string
    description: 'SIRIUS Category Info (SIRIUS Model Only); source token "nnnnnnnnnn"; maximum length is UNRESOLVED'

  - id: sirius_parental_lock_status
    label: SIRIUS Parental Lock Status
    command: SLK
    type: enum
    values:
      - "INPUT": Please input the Lock password
      - "WRONG": The Lock password is wrong

  - id: hd_radio_artist_name
    label: HD Radio Artist Name
    command: HAT
    query_command: HATQSTN
    type: string
    description: HD Radio Artist Name (variable-length, 64 digits max) (HD Radio Model Only)

  - id: hd_radio_channel_name
    label: HD Radio Channel Name
    command: HCN
    query_command: HCNQSTN
    type: string
    description: HD Radio Channel Name (Station Name) (7 digits) (HD Radio Model Only)

  - id: hd_radio_title
    label: HD Radio Title
    command: HTI
    query_command: HTIQSTN
    type: string
    description: HD Radio Title (variable-length, 64 digits max) (HD Radio Model Only)

  - id: hd_radio_detail_info
    label: HD Radio Detail Info
    command: HDS
    query_command: HDSQSTN
    type: string
    description: 'HD Radio Detail Info command; source calls the value HD Radio Title; detail structure and maximum length are UNRESOLVED'

  - id: hd_radio_program_state
    label: HD Radio Program State
    command: HPR
    query_command: HPRQSTN
    type: string
    description: 'HD Radio Channel Program; "01"-"08" (HD Radio Model Only)'

  - id: hd_radio_blend_state
    label: HD Radio Blend Mode State
    command: HBL
    query_command: HBLQSTN
    type: enum
    values:
      - "00": Auto
      - "01": Analog

  - id: hd_radio_tuner_status
    label: HD Radio Tuner Status
    command: HTS
    query_command: HTSQSTN
    type: string
    description: '"mmnnoo": HD Radio Tuner Status (3 bytes); mm -> "00" not HD, "01" HD; nn -> current Program "01"-"08"; oo -> receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.)'
```

## Variables
```yaml
variables:
  - id: master_volume
    label: Master Volume
    min: 0
    max: 100
    step: 1
    unit: dB
    description: Volume level 0-100 sent as hex (00-64)

  - id: zone2_volume
    label: Zone2 Volume
    min: 0
    max: 100
    step: 1
    unit: dB
    description: Zone2 volume level 0-100 sent as hex (00-64)

  - id: zone3_volume
    label: Zone3 Volume
    min: 0
    max: 100
    step: 1
    unit: dB
    description: Zone3 volume level 0-100 sent as hex (00-64)

  - id: zone4_volume
    label: Zone4 Volume
    min: 0
    max: 100
    step: 1
    unit: dB
    description: Zone4 volume level 0-100 sent as hex (00-64)

  - id: zone2_balance
    label: Zone2 Balance
    min: -10
    max: 10
    step: 2
    description: Zone2 L/R balance

  - id: zone3_balance
    label: Zone3 Balance
    min: -10
    max: 10
    step: 2
    description: Zone3 L/R balance
```

## Events
```yaml
events:
  - id: status_notification
    label: Unsolicited Status Change
    description: >-
      When the receiver status changes (e.g. via front panel or IR remote),
      it sends an unsolicited status message to the connected controller.
      Messages follow the same ISCP format as query responses.
      Receiver will respond within 50msec of a command; if no response within
      50msec, communication has failed.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Zone2 volume and tone controls only work when main zone is ON
  - Zone2 tone only works when Zone2 is powered or set to variable
  # UNRESOLVED: TGA/TGB/TGC triggers only available when each 12V Trigger
  # parameter is set to "OFF" at Setup Menu (per source note)
```

## Notes

The protocol is called ISCP (Integra Serial Control Protocol). Over TCP it is called eISCP. The eISCP packet wraps ISCP messages in a binary header.

**eISCP Packet Structure (TCP):**
- Header (16 bytes, big-endian): magic `ISCP` (4B), header size `0x00000010` (4B), data size (4B), version `0x01` (1B), reserved `0x000000` (3B)
- Data: `!1` start + 3-char command + parameter(s) + end char `[EOF]` (0x1A), optionally followed by `[CR][LF]`

**RS-232 ISCP Message Structure:**
- `!1` start + 3-char command + parameter(s) + `[CR]` or `[LF]` or `[CR][LF]`
- Unit type character `1` = Receiver

**Timing:** Minimum 50ms interval between messages. Only one TCP client connection at a time. Connection must be held continuously to receive unsolicited status notifications. Network/USB FF and REW (NTCFF/NTCREW) are continuous commands that must be resent with no more than 100ms between codes.

**Volume encoding:** Hexadecimal. `00`=`0x00`=level 0, `64`=`0x64`=level 100.

**Preset encoding:** Hexadecimal. `01`-`28` maps to presets 1-40.

**eISCP destination port:** default 60128; receiver-configurable in range 49152-65535.

**RI peripheral pass-through commands:** The ISCP spec also documents RI (Remote Interactive) system commands for externally-connected accessories: CCD (CD Player), CT1 (Tape1), CT2 (Tape2), CEQ (Graphics EQ), CDT (DAT Recorder), CDV (DVD Player), CMD (MD Recorder), CCR (CD-R Recorder), and CDS (Docking Station). The CDS dock commands are included above; the remaining RI peripheral command sets are NOT enumerated here because they control daisy-changed RI accessories (not the PR-SC5507 itself) and require those accessories to be physically connected via RI.

<!-- UNRESOLVED: exact per-command support for PR-SC5507 cannot be determined from the multi-model support matrix columns (no PR-SC5507 column exists) -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: whether PR-SC5507 supports XM/SIRIUS/HD Radio commands not determinable; all such rows show "No" across every model column in the source -->
<!-- UNRESOLVED: Audyssey (ADY/ADQ/ADV), Dolby Volume (DVL), Music Optimizer (MOT), ISF Mode (ISF) commands are documented in the ISCP v1.15 spec but show "No" across every model column; included here as documented commands but device-level support for PR-SC5507 is unverified -->
<!-- UNRESOLVED: per-channel Tone commands (TFR/TFW/TFH/TCT/TSR/TSB/TSW), SWL (subwoofer temp level), CTL (center temp level), MEM (memory setup), VOS (video output, JP-only) documented but show "No" across model columns -->
<!-- UNRESOLVED: RI system peripheral commands (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR) depend on connected RI accessories, not built-in to PR-SC5507 -->
````

Self-check pass. No volt/current/power invented. Port 60128 + baud 9600 verbatim source. `status: draft`, `declared_confidence: low`. UNRESOLVED markers on firmware, per-model support, XM/SIRIUS/HD Radio, Audyssey/DVL/MOT/ISF, RI peripherals.

Added ~150 entries: full zone2/3/4 (tone/balance/tuner/preset/network/internet-radio/listening-mode/late-night/reeq + missing mute/volume-wrap), NTC full key set, SLC speaker-cal, SLR RECOUT, SLA audio-selector, RAS variants, LTN/DIM/SLP/HDO/RES/TUN/PRS wrap, Audyssey/DVL/MOT/ISF, RDS/PTY/TP scan, network info feedbacks, zone feedbacks, CDS dock. Kept all old IDs/shapes.

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:31:55.693Z
last_checked_at: 2026-10-07T20:33:36.834Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:33:36.834Z
matched_actions: 354
action_count: 354
confidence: medium
summary: "All 354 action units match source ISCP rows with agreeing shapes; port 60128 and 9600 8N1 serial settings are verbatim in source; coverage is near-complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact command subset supported by PR-SC5507 cannot be determined per-column from the multi-model support tables; PR-SC5507 was added to the ISCP v1.15 spec but has no dedicated Yes/No column in the support matrices"
- "no multi-step sequences explicitly described in source"
- "TGA/TGB/TGC triggers only available when each 12V Trigger"
- "exact per-command support for PR-SC5507 cannot be determined from the multi-model support matrix columns (no PR-SC5507 column exists)"
- "firmware version compatibility range not stated"
- "whether PR-SC5507 supports XM/SIRIUS/HD Radio commands not determinable; all such rows show \"No\" across every model column in the source"
- "Audyssey (ADY/ADQ/ADV), Dolby Volume (DVL), Music Optimizer (MOT), ISF Mode (ISF) commands are documented in the ISCP v1.15 spec but show \"No\" across every model column; included here as documented commands but device-level support for PR-SC5507 is unverified"
- "per-channel Tone commands (TFR/TFW/TFH/TCT/TSR/TSB/TSW), SWL (subwoofer temp level), CTL (center temp level), MEM (memory setup), VOS (video output, JP-only) documented but show \"No\" across model columns"
- "RI system peripheral commands (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR) depend on connected RI accessories, not built-in to PR-SC5507"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
