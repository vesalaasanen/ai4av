---
spec_id: admin/onkyo-tx_sr806
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-SR806 Control Spec"
manufacturer: Onkyo
model_family: TX-SR806
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-SR806
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:44:31.700Z
last_checked_at: 2026-10-07T15:43:19.563Z
generated_at: 2026-10-07T15:43:19.563Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "eISCP Ethernet authentication method not documented"
  - "source support matrix has no TX-SR806 column; command applicability inferred from TX-SR806-era feature set and the zone command lists (which carry no per-model matrix)"
  - "TX-SR806 applicability of additional model-dependent commands."
  - "applicable interpretation for TX-SR806."
  - "the source labels the CTL query result as Subwoofer Level'"
  - "model-dependent interpretation of DIF values'"
  - "model-dependent Re-EQ/Academy, Re-EQ, or Cinema Filter interpretation'"
  - "the source labels the MOT query result as Dolby Volume State'"
  - "HDS detail heading and Title description differ'"
  - "source query description says iPod Artist Name'"
  - "source query description says iPod Album Name'"
  - "source query description says HD Radio Title'"
  - "source query description says iPod Time Info'"
  - "s is not defined in the supplied source'"
  - "populate from source if applicable"
  - "event subscription model not fully detailed in source"
  - "no explicit macro sequences documented"
  - "source contains no explicit safety warnings or interlock procedures"
  - "eISCP Ethernet authentication method not stated"
  - "MAC address format not documented beyond \"confirm on setup menu\""
verification:
  verdict: verified
  checked_at: 2026-10-07T15:43:19.563Z
  matched_actions: 297
  action_count: 297
  confidence: medium
  summary: "All 297 action units match source ISCP mnemonics and parameters, transport values are supported, and the source catalogue is essentially fully represented by the spec. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Onkyo TX-SR806 Control Spec

## Summary
Integra Serial Control Protocol (ISCP) AV receiver supporting RS-232C and Ethernet (eISCP). Controls power, volume, input selection, surround modes, tuner, multi-zone operation, speaker calibration, and HDMI/monitor output. 3-wire RS-232C at 9600 baud with no flow control. TCP control via eISCP on port 60128.

<!-- UNRESOLVED: eISCP Ethernet authentication method not documented -->
<!-- UNRESOLVED: source support matrix has no TX-SR806 column; command applicability inferred from TX-SR806-era feature set and the zone command lists (which carry no per-model matrix) -->

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
  flow_control: none
addressing:
  port: 60128  # eISCP default; range 49152-65535 via setup menu
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# ISCP frame: "!1" + 3-char command + parameter + end char ([CR]/[LF]/[CR][LF] serial, [EOF] eISCP).
# "1" = Receiver destination. All command payloads below are the ISCP message body (without end char).

# === System Power (PWR) ===
- id: power_on
  label: Power On
  kind: action
  command: "!1PWR01"
  params: []
- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "!1PWR00"
  params: []
- id: power_query
  label: Get Power Status
  kind: query
  command: "!1PWRQSTN"
  params: []

# === Audio Muting (AMT) ===
- id: muting_on
  label: Mute Audio
  kind: action
  command: "!1AMT01"
  params: []
- id: muting_off
  label: Unmute Audio
  kind: action
  command: "!1AMT00"
  params: []
- id: muting_toggle
  label: Mute Wrap-Around (Toggle)
  kind: action
  command: "!1AMTTG"
  params: []
- id: muting_query
  label: Get Mute Status
  kind: query
  command: "!1AMTQSTN"
  params: []

# === Master Volume (MVL) ===
- id: volume_set
  label: Set Master Volume
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: "Hex value \"00\"-\"64\" (0-100)"
- id: volume_up
  label: Volume Up
  kind: action
  command: "!1MVLUP"
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  command: "!1MVLDOWN"
  params: []
- id: volume_query
  label: Get Master Volume
  kind: query
  command: "!1MVLQSTN"
  params: []

# === Input Selector (SLI) ===
- id: input_selector
  label: Select Input
  kind: action
  command: "!1SLI{source}"
  params:
    - name: source
      type: string
      description: |
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4,
        "04" VIDEO5, "05" VIDEO6, "06" VIDEO7, "10" DVD, "20" TAPE,
        "21" TAPE2, "22" PHONO, "23" CD, "24" FM, "25" AM, "26" TUNER,
        "27" MUSIC SERVER, "28" INTERNET RADIO, "29" USB/USB(Front),
        "2A" USB Rear, "30" MULTI CH, "31" XM, "32" SIRIUS,
        "40" Universal PORT, "80" SOURCE
- id: input_up
  label: Input Selector Wrap-Around Up
  kind: action
  command: "!1SLIUP"
  params: []
- id: input_down
  label: Input Selector Wrap-Around Down
  kind: action
  command: "!1SLIDOWN"
  params: []
- id: input_query
  label: Get Input Selection
  kind: query
  command: "!1SLIQSTN"
  params: []

# === Listening Mode (LMD) ===
- id: listening_mode
  label: Set Listening Mode
  kind: action
  command: "!1LMD{mode}"
  params:
    - name: mode
      type: string
      description: |
        "00" STEREO, "01" DIRECT, "02" SURROUND, "03" FILM/Game-RPG,
        "04" THX, "05" ACTION/Game-Action, "06" MUSICAL/Game-Rock,
        "07" MONO MOVIE, "08" ORCHESTRA, "09" UNPLUGGED, "0A" STUDIO-MIX,
        "0B" TV LOGIC, "0C" ALL CH STEREO, "0D" THEATER-DIMENSIONAL,
        "0E" ENHANCED 7/ENHANCE, "0F" MONO, "11" PURE AUDIO, "12" MULTIPLEX,
        "13" FULL MONO, "40" Straight Decode/5.1ch, "41" Dolby EX/DTS ES,
        "42" THX Cinema, "43" THX Surround EX, "44" THX Music, "45" THX Games,
        "50" U2/S2 Cinema, "51" U2/S2 Music, "52" U2/S2 Games,
        "80" PLII/PLIIx Movie, "81" PLII/PLIIx Music, "82" Neo:6 Cinema,
        "83" Neo:6 Music, "84" PLII/PLIIx THX Cinema, "85" Neo:6 THX Cinema,
        "86" PLII/PLIIx Game, "87" Neural Surround, "88" Neural THX,
        "89" PLII/PLIIx THX Games, "8A" Neo:6 THX Games, "8B" PLII/PLIIx THX Music,
        "8C" Neo:6 THX Music, "8D" Neural THX Cinema, "8E" Neural THX Music,
        "8F" Neural THX Games
- id: listening_mode_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "!1LMDUP"
  params: []
- id: listening_mode_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "!1LMDDOWN"
  params: []
- id: listening_mode_query
  label: Get Listening Mode
  kind: query
  command: "!1LMDQSTN"
  params: []

# === Dimmer (DIM) ===
- id: dimmer
  label: Set Dimmer Level
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: string
      description: "\"00\" Bright, \"01\" Dim, \"02\" Dark, \"03\" Shut-Off, \"08\" Bright & LED OFF"
- id: dimmer_wrap
  label: Dimmer Level Wrap-Around Up
  kind: action
  command: "!1DIMDIM"
  params: []
- id: dimmer_query
  label: Get Dimmer Level
  kind: query
  command: "!1DIMQSTN"
  params: []

# === Front Tone (TFR) ===
- id: tone_bass_set
  label: Set Front Bass
  kind: action
  command: "!1TFRB{value}"
  params:
    - name: value
      type: string
      description: "xx where xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: tone_treble_set
  label: Set Front Treble
  kind: action
  command: "!1TFRT{value}"
  params:
    - name: value
      type: string
      description: "xx where xx is \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: tone_bass_up
  label: Front Bass Up (2 step)
  kind: action
  command: "!1TFRBUP"
  params: []
- id: tone_bass_down
  label: Front Bass Down (2 step)
  kind: action
  command: "!1TFRBDOWN"
  params: []
- id: tone_treble_up
  label: Front Treble Up (2 step)
  kind: action
  command: "!1TFRTUP"
  params: []
- id: tone_treble_down
  label: Front Treble Down (2 step)
  kind: action
  command: "!1TFRTDOWN"
  params: []
- id: tone_query
  label: Get Front Tone
  kind: query
  command: "!1TFRQSTN"
  params: []

# === Tuner (TUN) ===
- id: tuner_frequency
  label: Set Tuner Frequency
  kind: action
  command: "!1TUN{freq}"
  params:
    - name: freq
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"
- id: tuner_up
  label: Tuning Frequency Up
  kind: action
  command: "!1TUNUP"
  params: []
- id: tuner_down
  label: Tuning Frequency Down
  kind: action
  command: "!1TUNDOWN"
  params: []
- id: tuner_query
  label: Get Tuner Frequency
  kind: query
  command: "!1TUNQSTN"
  params: []

# === Preset (PRS) ===
- id: preset_set
  label: Set Preset
  kind: action
  command: "!1PRS{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 in hex)"
- id: preset_up
  label: Preset Up
  kind: action
  command: "!1PRSUP"
  params: []
- id: preset_down
  label: Preset Down
  kind: action
  command: "!1PRSDOWN"
  params: []
- id: preset_query
  label: Get Preset Number
  kind: query
  command: "!1PRSQSTN"
  params: []
- id: preset_memory
  label: Store Preset Memory
  kind: action
  command: "!1PRM{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 in hex)"

# === Late Night (LTN) ===
- id: late_night
  label: Set Late Night
  kind: action
  command: "!1LTN{level}"
  params:
    - name: level
      type: string
      description: "\"00\" Off, \"01\" Low, \"02\" High, \"03\" Auto (TrueHD)"
- id: late_night_up
  label: Late Night Wrap-Around Up
  kind: action
  command: "!1LTNUP"
  params: []
- id: late_night_query
  label: Get Late Night Level
  kind: query
  command: "!1LTNQSTN"
  params: []

# === Sleep Timer (SLP) ===
- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  command: "!1SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "\"01\"-\"5A\" (1-90 min hex)"
- id: sleep_timer_off
  label: Cancel Sleep Timer
  kind: action
  command: "!1SLPOFF"
  params: []
- id: sleep_timer_up
  label: Sleep Timer Wrap-Around Up
  kind: action
  command: "!1SLPUP"
  params: []
- id: sleep_timer_query
  label: Get Sleep Timer
  kind: query
  command: "!1SLPQSTN"
  params: []

# === HDMI Output (HDO) ===
- id: hdmi_output
  label: Set HDMI Output
  kind: action
  command: "!1HDO{output}"
  params:
    - name: output
      type: string
      description: "\"00\" No/Analog, \"01\" Out Main, \"02\" Out Sub, \"03\" Both, \"04\" Both(Main), \"05\" Both(Sub)"
- id: hdmi_output_up
  label: HDMI Output Wrap-Around Up
  kind: action
  command: "!1HDOUP"
  params: []
- id: hdmi_output_query
  label: Get HDMI Output
  kind: query
  command: "!1HDOQSTN"
  params: []

# === Monitor Out Resolution (RES) ===
- id: monitor_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "!1RES{res}"
  params:
    - name: res
      type: string
      description: "\"00\" Through, \"01\" Auto, \"02\" 480p, \"03\" 720p, \"04\" 1080i, \"05\" 1080p, \"06\" Source, \"07\" 1080p/24fs"
- id: monitor_resolution_up
  label: Monitor Out Resolution Wrap-Around Up
  kind: action
  command: "!1RESUP"
  params: []
- id: monitor_resolution_query
  label: Get Monitor Out Resolution
  kind: query
  command: "!1RESQSTN"
  params: []

# === OSD / Setup Operation (OSD) ===
- id: osd_menu
  label: OSD Menu Key
  kind: action
  command: "!1OSDMENU"
  params: []
- id: osd_up
  label: OSD Up Key
  kind: action
  command: "!1OSDUP"
  params: []
- id: osd_down
  label: OSD Down Key
  kind: action
  command: "!1OSDDOWN"
  params: []
- id: osd_left
  label: OSD Left Key
  kind: action
  command: "!1OSDLEFT"
  params: []
- id: osd_right
  label: OSD Right Key
  kind: action
  command: "!1OSDRIGHT"
  params: []
- id: osd_enter
  label: OSD Enter Key
  kind: action
  command: "!1OSDENTER"
  params: []
- id: osd_exit
  label: OSD Exit Key
  kind: action
  command: "!1OSDEXIT"
  params: []
- id: osd_audio
  label: OSD Audio Adjust Key
  kind: action
  command: "!1OSDAUDIO"
  params: []
- id: osd_video
  label: OSD Video Adjust Key
  kind: action
  command: "!1OSDVIDEO"
  params: []

# === Speaker Level Calibration (SLC) ===
- id: slc_test
  label: Speaker Level TEST Key
  kind: action
  command: "!1SLCTEST"
  params: []
- id: slc_chsel
  label: Speaker Level CH SEL Key
  kind: action
  command: "!1SLCCHSEL"
  params: []
- id: slc_level_up
  label: Speaker Level Up
  kind: action
  command: "!1SLCUP"
  params: []
- id: slc_level_down
  label: Speaker Level Down
  kind: action
  command: "!1SLCDOWN"
  params: []

# === Audio / Video Information (IFA / IFV) ===
- id: audio_info_query
  label: Get Audio Information
  kind: query
  command: "!1IFAQSTN"
  params: []
- id: video_info_query
  label: Get Video Information
  kind: query
  command: "!1IFVQSTN"
  params: []

# === Zone 2 Power (ZPW) ===
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "!1ZPW01"
  params: []
- id: zone2_power_off
  label: Zone 2 Standby
  kind: action
  command: "!1ZPW00"
  params: []
- id: zone2_power_query
  label: Get Zone 2 Power Status
  kind: query
  command: "!1ZPWQSTN"
  params: []

# === Zone 2 Volume (ZVL) ===
- id: zone2_volume
  label: Set Zone 2 Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: "\"00\"-\"64\" (0-100 hex)"
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "!1ZVLUP"
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "!1ZVLDOWN"
  params: []
- id: zone2_volume_query
  label: Get Zone 2 Volume
  kind: query
  command: "!1ZVLQSTN"
  params: []

# === Zone 2 Muting (ZMT) ===
- id: zone2_muting
  label: Set Zone 2 Muting
  kind: action
  command: "!1ZMT{state}"
  params:
    - name: state
      type: string
      description: "\"00\" Off, \"01\" On, \"TG\" Toggle"
- id: zone2_muting_query
  label: Get Zone 2 Muting
  kind: query
  command: "!1ZMTQSTN"
  params: []

# === Zone 2 Selector (SLZ) ===
- id: zone2_selector
  label: Zone 2 Input Selector
  kind: action
  command: "!1SLZ{source}"
  params:
    - name: source
      type: string
      description: "Same codes as SLI"
- id: zone2_selector_query
  label: Get Zone 2 Selector
  kind: query
  command: "!1SLZQSTN"
  params: []

# === Zone 2 Tone (ZTN) ===
- id: zone2_tone_bass
  label: Set Zone 2 Bass
  kind: action
  command: "!1ZTNB{value}"
  params:
    - name: value
      type: string
      description: "xx \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: zone2_tone_treble
  label: Set Zone 2 Treble
  kind: action
  command: "!1ZTNT{value}"
  params:
    - name: value
      type: string
      description: "xx \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: zone2_tone_bass_up
  label: Zone 2 Bass Up (2 step)
  kind: action
  command: "!1ZTNBUP"
  params: []
- id: zone2_tone_bass_down
  label: Zone 2 Bass Down (2 step)
  kind: action
  command: "!1ZTNBDOWN"
  params: []
- id: zone2_tone_treble_up
  label: Zone 2 Treble Up (2 step)
  kind: action
  command: "!1ZTNTUP"
  params: []
- id: zone2_tone_treble_down
  label: Zone 2 Treble Down (2 step)
  kind: action
  command: "!1ZTNTDOWN"
  params: []
- id: zone2_tone_query
  label: Get Zone 2 Tone
  kind: query
  command: "!1ZTNQSTN"
  params: []

# === Zone 2 Balance (ZBL) ===
- id: zone2_balance
  label: Set Zone 2 Balance
  kind: action
  command: "!1ZBL{value}"
  params:
    - name: value
      type: string
      description: "xx \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: zone2_balance_up
  label: Zone 2 Balance Up (to R)
  kind: action
  command: "!1ZBLUP"
  params: []
- id: zone2_balance_down
  label: Zone 2 Balance Down (to L)
  kind: action
  command: "!1ZBLDOWN"
  params: []
- id: zone2_balance_query
  label: Get Zone 2 Balance
  kind: query
  command: "!1ZBLQSTN"
  params: []

# === Zone 2 Tuner (TUZ) ===
- id: zone2_tuner_frequency
  label: Set Zone 2 Tuner Frequency
  kind: action
  command: "!1TUZ{freq}"
  params:
    - name: freq
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"
- id: zone2_tuner_up
  label: Zone 2 Tuning Up
  kind: action
  command: "!1TUZUP"
  params: []
- id: zone2_tuner_down
  label: Zone 2 Tuning Down
  kind: action
  command: "!1TUZDOWN"
  params: []
- id: zone2_tuner_query
  label: Get Zone 2 Tuner Frequency
  kind: query
  command: "!1TUZQSTN"
  params: []

# === Zone 2 Preset (PRZ) ===
- id: zone2_preset
  label: Set Zone 2 Preset
  kind: action
  command: "!1PRZ{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 hex)"
- id: zone2_preset_up
  label: Zone 2 Preset Up
  kind: action
  command: "!1PRZUP"
  params: []
- id: zone2_preset_down
  label: Zone 2 Preset Down
  kind: action
  command: "!1PRZDOWN"
  params: []
- id: zone2_preset_query
  label: Get Zone 2 Preset
  kind: query
  command: "!1PRZQSTN"
  params: []

# === Zone 2 Net/USB (NTZ) ===
- id: zone2_net_play
  label: Zone 2 Play
  kind: action
  command: "!1NTZPLAY"
  params: []
- id: zone2_net_stop
  label: Zone 2 Stop
  kind: action
  command: "!1NTZSTOP"
  params: []
- id: zone2_net_pause
  label: Zone 2 Pause
  kind: action
  command: "!1NTZPAUSE"
  params: []
- id: zone2_net_track_up
  label: Zone 2 Track Up
  kind: action
  command: "!1NTZTRUP"
  params: []
- id: zone2_net_track_down
  label: Zone 2 Track Down
  kind: action
  command: "!1NTZTRDN"
  params: []
- id: zone2_net_ch_up
  label: Zone 2 CH Up (iRadio)
  kind: action
  command: "!1NTZCHUP"
  params: []
- id: zone2_net_ch_down
  label: Zone 2 CH Down (iRadio)
  kind: action
  command: "!1NTZCHDN"
  params: []

# === Zone 2 Internet Radio Preset (NPZ) ===
- id: zone2_internet_radio_preset
  label: Set Zone 2 Internet Radio Preset
  kind: action
  command: "!1NPZ{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 hex)"

# === Zone 2 Listening Mode (LMZ) ===
- id: zone2_listening_mode
  label: Set Zone 2 Listening Mode
  kind: action
  command: "!1LMZ{mode}"
  params:
    - name: mode
      type: string
      description: "\"00\" STEREO, \"01\" DIRECT, \"0F\" MONO, \"12\" MULTIPLEX, \"87\" DVS(PL2), \"88\" DVS(NEO6)"

# === Zone 2 Late Night (LTZ) ===
- id: zone2_late_night
  label: Set Zone 2 Late Night
  kind: action
  command: "!1LTZ{level}"
  params:
    - name: level
      type: string
      description: "\"00\" Off, \"01\" Low, \"02\" High"
- id: zone2_late_night_up
  label: Zone 2 Late Night Wrap-Around Up
  kind: action
  command: "!1LTZUP"
  params: []
- id: zone2_late_night_query
  label: Get Zone 2 Late Night
  kind: query
  command: "!1LTZQSTN"
  params: []

# === Zone 2 Re-EQ / Academy (RAZ) ===
- id: zone2_re_eq
  label: Set Zone 2 Re-EQ/Academy
  kind: action
  command: "!1RAZ{level}"
  params:
    - name: level
      type: string
      description: "\"00\" Both Off, \"01\" Re-EQ On, \"02\" Academy On"
- id: zone2_re_eq_up
  label: Zone 2 Re-EQ Wrap-Around Up
  kind: action
  command: "!1RAZUP"
  params: []
- id: zone2_re_eq_query
  label: Get Zone 2 Re-EQ/Academy
  kind: query
  command: "!1RAZQSTN"
  params: []

# === Zone 3 Power (PW3) ===
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "!1PW301"
  params: []
- id: zone3_power_off
  label: Zone 3 Standby
  kind: action
  command: "!1PW300"
  params: []
- id: zone3_power_query
  label: Get Zone 3 Power Status
  kind: query
  command: "!1PW3QSTN"
  params: []

# === Zone 3 Volume (VL3) ===
- id: zone3_volume
  label: Set Zone 3 Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: "\"00\"-\"64\" (0-100 hex)"
- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: "!1VL3UP"
  params: []
- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: "!1VL3DOWN"
  params: []
- id: zone3_volume_query
  label: Get Zone 3 Volume
  kind: query
  command: "!1VL3QSTN"
  params: []

# === Zone 3 Muting (MT3) ===
- id: zone3_muting
  label: Set Zone 3 Muting
  kind: action
  command: "!1MT3{state}"
  params:
    - name: state
      type: string
      description: "\"00\" Off, \"01\" On, \"TG\" Toggle"
- id: zone3_muting_query
  label: Get Zone 3 Muting
  kind: query
  command: "!1MT3QSTN"
  params: []

# === Zone 3 Selector (SL3) ===
- id: zone3_selector
  label: Zone 3 Input Selector
  kind: action
  command: "!1SL3{source}"
  params:
    - name: source
      type: string
      description: "Same codes as SLI"
- id: zone3_selector_query
  label: Get Zone 3 Selector
  kind: query
  command: "!1SL3QSTN"
  params: []

# === Zone 3 Tone (TN3) ===
- id: zone3_tone_bass
  label: Set Zone 3 Bass
  kind: action
  command: "!1TN3B{value}"
  params:
    - name: value
      type: string
      description: "xx \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: zone3_tone_treble
  label: Set Zone 3 Treble
  kind: action
  command: "!1TN3T{value}"
  params:
    - name: value
      type: string
      description: "xx \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: zone3_tone_bass_up
  label: Zone 3 Bass Up (2 step)
  kind: action
  command: "!1TN3BUP"
  params: []
- id: zone3_tone_bass_down
  label: Zone 3 Bass Down (2 step)
  kind: action
  command: "!1TN3BDOWN"
  params: []
- id: zone3_tone_treble_up
  label: Zone 3 Treble Up (2 step)
  kind: action
  command: "!1TN3TUP"
  params: []
- id: zone3_tone_treble_down
  label: Zone 3 Treble Down (2 step)
  kind: action
  command: "!1TN3TDOWN"
  params: []
- id: zone3_tone_query
  label: Get Zone 3 Tone
  kind: query
  command: "!1TN3QSTN"
  params: []

# === Zone 3 Balance (BL3) ===
- id: zone3_balance
  label: Set Zone 3 Balance
  kind: action
  command: "!1BL3{value}"
  params:
    - name: value
      type: string
      description: "xx \"-A\"...\"00\"...\"+A\" [-10...0...+10 2 step]"
- id: zone3_balance_up
  label: Zone 3 Balance Up (to R)
  kind: action
  command: "!1BL3UP"
  params: []
- id: zone3_balance_down
  label: Zone 3 Balance Down (to L)
  kind: action
  command: "!1BL3DOWN"
  params: []
- id: zone3_balance_query
  label: Get Zone 3 Balance
  kind: query
  command: "!1BL3QSTN"
  params: []

# === Zone 3 Tuner (TU3) ===
- id: zone3_tuner_frequency
  label: Set Zone 3 Tuner Frequency
  kind: action
  command: "!1TU3{freq}"
  params:
    - name: freq
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"
- id: zone3_tuner_up
  label: Zone 3 Tuning Up
  kind: action
  command: "!1TU3UP"
  params: []
- id: zone3_tuner_down
  label: Zone 3 Tuning Down
  kind: action
  command: "!1TU3DOWN"
  params: []
- id: zone3_tuner_query
  label: Get Zone 3 Tuner Frequency
  kind: query
  command: "!1TU3QSTN"
  params: []

# === Zone 3 Preset (PR3) ===
- id: zone3_preset
  label: Set Zone 3 Preset
  kind: action
  command: "!1PR3{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 hex)"
- id: zone3_preset_up
  label: Zone 3 Preset Up
  kind: action
  command: "!1PR3UP"
  params: []
- id: zone3_preset_down
  label: Zone 3 Preset Down
  kind: action
  command: "!1PR3DOWN"
  params: []
- id: zone3_preset_query
  label: Get Zone 3 Preset
  kind: query
  command: "!1PR3QSTN"
  params: []

# === Zone 3 Net/USB (NT3) ===
- id: zone3_net_play
  label: Zone 3 Play
  kind: action
  command: "!1NT3PLAY"
  params: []
- id: zone3_net_stop
  label: Zone 3 Stop
  kind: action
  command: "!1NT3STOP"
  params: []
- id: zone3_net_pause
  label: Zone 3 Pause
  kind: action
  command: "!1NT3PAUSE"
  params: []
- id: zone3_net_track_up
  label: Zone 3 Track Up
  kind: action
  command: "!1NT3TRUP"
  params: []
- id: zone3_net_track_down
  label: Zone 3 Track Down
  kind: action
  command: "!1NT3TRDN"
  params: []
- id: zone3_net_ch_up
  label: Zone 3 CH Up (iRadio)
  kind: action
  command: "!1NT3CHUP"
  params: []
- id: zone3_net_ch_down
  label: Zone 3 CH Down (iRadio)
  kind: action
  command: "!1NT3CHDN"
  params: []

# === Zone 3 Internet Radio Preset (NP3) ===
- id: zone3_internet_radio_preset
  label: Set Zone 3 Internet Radio Preset
  kind: action
  command: "!1NP3{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 hex)"

# === Zone 4 Power (PW4) ===
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "!1PW401"
  params: []
- id: zone4_power_off
  label: Zone 4 Standby
  kind: action
  command: "!1PW400"
  params: []
- id: zone4_power_query
  label: Get Zone 4 Power Status
  kind: query
  command: "!1PW4QSTN"
  params: []

# === Zone 4 Volume (VL4) ===
- id: zone4_volume
  label: Set Zone 4 Volume
  kind: action
  command: "!1VL4{level}"
  params:
    - name: level
      type: string
      description: "\"00\"-\"64\" (0-100 hex)"
- id: zone4_volume_up
  label: Zone 4 Volume Up
  kind: action
  command: "!1VL4UP"
  params: []
- id: zone4_volume_down
  label: Zone 4 Volume Down
  kind: action
  command: "!1VL4DOWN"
  params: []
- id: zone4_volume_query
  label: Get Zone 4 Volume
  kind: query
  command: "!1VL4QSTN"
  params: []

# === Zone 4 Muting (MT4) ===
- id: zone4_muting
  label: Set Zone 4 Muting
  kind: action
  command: "!1MT4{state}"
  params:
    - name: state
      type: string
      description: "\"00\" Off, \"01\" On, \"TG\" Toggle"
- id: zone4_muting_query
  label: Get Zone 4 Muting
  kind: query
  command: "!1MT4QSTN"
  params: []

# === Zone 4 Selector (SL4) ===
- id: zone4_selector
  label: Zone 4 Input Selector
  kind: action
  command: "!1SL4{source}"
  params:
    - name: source
      type: string
      description: "Same codes as SLI"
- id: zone4_selector_query
  label: Get Zone 4 Selector
  kind: query
  command: "!1SL4QSTN"
  params: []

# === Zone 4 Tuner (TU4) ===
- id: zone4_tuner_frequency
  label: Set Zone 4 Tuner Frequency
  kind: action
  command: "!1TU4{freq}"
  params:
    - name: freq
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"
- id: zone4_tuner_up
  label: Zone 4 Tuning Up
  kind: action
  command: "!1TU4UP"
  params: []
- id: zone4_tuner_down
  label: Zone 4 Tuning Down
  kind: action
  command: "!1TU4DOWN"
  params: []
- id: zone4_tuner_query
  label: Get Zone 4 Tuner Frequency
  kind: query
  command: "!1TU4QSTN"
  params: []

# === Zone 4 Preset (PR4) ===
- id: zone4_preset
  label: Set Zone 4 Preset
  kind: action
  command: "!1PR4{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 hex)"
- id: zone4_preset_up
  label: Zone 4 Preset Up
  kind: action
  command: "!1PR4UP"
  params: []
- id: zone4_preset_down
  label: Zone 4 Preset Down
  kind: action
  command: "!1PR4DOWN"
  params: []
- id: zone4_preset_query
  label: Get Zone 4 Preset
  kind: query
  command: "!1PR4QSTN"
  params: []

# === Zone 4 Net/USB (NT4) ===
- id: zone4_net_play
  label: Zone 4 Play
  kind: action
  command: "!1NT4PLAY"
  params: []
- id: zone4_net_stop
  label: Zone 4 Stop
  kind: action
  command: "!1NT4STOP"
  params: []
- id: zone4_net_pause
  label: Zone 4 Pause
  kind: action
  command: "!1NT4PAUSE"
  params: []
- id: zone4_net_track_up
  label: Zone 4 Track Up
  kind: action
  command: "!1NT4TRUP"
  params: []
- id: zone4_net_track_down
  label: Zone 4 Track Down
  kind: action
  command: "!1NT4TRDN"
  params: []

# === Zone 4 Internet Radio Preset (NP4) ===
- id: zone4_internet_radio_preset
  label: Set Zone 4 Internet Radio Preset
  kind: action
  command: "!1NP4{num}"
  params:
    - name: num
      type: string
      description: "\"01\"-\"28\" (1-40 hex)"

# === Additional Source Commands ===
# The appended command fields contain literal source command characters.
# Encode these entries as "!1" + command + the parameter described in params,
# followed by the transport end character. Do not send the bare opcode alone.
# Query commands for these groups are represented in Feedbacks below.
# UNRESOLVED: TX-SR806 applicability of additional model-dependent commands.

- id: speaker_a
  label: Set Speaker A
  kind: action
  command: "SPA"
  params:
    - name: state
      type: string
      description: '"00" sets Speaker Off; "01" sets Speaker On; "UP" sets Speaker Switch Wrap-Around'
- id: speaker_b
  label: Set Speaker B
  kind: action
  command: "SPB"
  params:
    - name: state
      type: string
      description: '"00" sets Speaker Off; "01" sets Speaker On; "UP" sets Speaker Switch Wrap-Around'
- id: speaker_layout
  label: Set Speaker Layout
  kind: action
  command: "SPL"
  params:
    - name: layout
      type: string
      description: '"SB" sets SurrBack Speaker; "FH" sets Front High Speaker / SurrBack+Front High Speakers; "FW" sets Front Wide Speaker / SurrBack+Front Wide Speakers; "UP" sets Speaker Switch Wrap-Around'
- id: volume_one_db_step
  label: Adjust Master Volume By 1dB
  kind: action
  command: "MVL"
  params:
    - name: direction
      type: string
      description: '"UP1" sets Volume Level Up 1dB Step; "DOWN1" sets Volume Level Down 1dB Step'
- id: front_wide_tone
  label: Adjust Front Wide Tone
  kind: action
  command: "TFW"
  params:
    - name: value
      type: string
      description: '"Bxx" Front Wide Bass; "Txx" Front Wide Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Front Wide Bass up(2 step); "BDOWN" sets Front Wide Bass down(2 step); "TUP" sets Front Wide Treble up(2 step); "TDOWN" sets Front Wide Treble down(2 step)'
- id: front_high_tone
  label: Adjust Front High Tone
  kind: action
  command: "TFH"
  params:
    - name: value
      type: string
      description: '"Bxx" Front High Bass; "Txx" Front High Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Front High Bass up(2 step); "BDOWN" sets Front High Bass down(2 step); "TUP" sets Front High Treble up(2 step); "TDOWN" sets Front High Treble down(2 step)'
- id: center_tone
  label: Adjust Center Tone
  kind: action
  command: "TCT"
  params:
    - name: value
      type: string
      description: '"Bxx" Center Bass; "Txx" Center Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Center Bass up(2 step); "BDOWN" sets Center Bass down(2 step); "TUP" sets Center Treble up(2 step); "TDOWN" sets Center Treble down(2 step)'
- id: surround_tone
  label: Adjust Surround Tone
  kind: action
  command: "TSR"
  params:
    - name: value
      type: string
      description: '"Bxx" Surround Bass; "Txx" Surround Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Surround Bass up(2 step); "BDOWN" sets Surround Bass down(2 step); "TUP" sets Surround Treble up(2 step); "TDOWN" sets Surround Treble down(2 step)'
- id: surround_back_tone
  label: Adjust Surround Back Tone
  kind: action
  command: "TSB"
  params:
    - name: value
      type: string
      description: '"Bxx" Surround Back Bass; "Txx" Surround Back Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Surround Back Bass up(2 step); "BDOWN" sets Surround Back Bass down(2 step); "TUP" sets Surround Back Treble up(2 step); "TDOWN" sets Surround Back Treble down(2 step)'
- id: subwoofer_tone
  label: Adjust Subwoofer Tone
  kind: action
  command: "TSW"
  params:
    - name: value
      type: string
      description: '"Bxx" Subwoofer Bass; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Subwoofer Bass up(2 step); "BDOWN" sets Subwoofer Bass down(2 step)'
- id: subwoofer_temporary_level
  label: Adjust Temporary Subwoofer Level
  kind: action
  command: "SWL"
  params:
    - name: level
      type: string
      description: '"-F"-"00"-"+C" sets Subwoofer Level-15dB-0dB-+12dB; "UP" LEVEL + Key; "DOWN" LEVEL–KEY'
- id: center_temporary_level
  label: Adjust Temporary Center Level
  kind: action
  command: "CTL"
  params:
    - name: level
      type: string
      description: '"-C"-"00"-"+C" sets Center Level-12dB-0dB-+12dB; "UP" LEVEL + Key; "DOWN" LEVEL–KEY'
- id: display_information_mode
  label: Set Display Information Or Mode
  kind: action
  command: "DIF"
  params:
    - name: mode
      type: string
      description: |
        Model-dependent interpretations:
        "00" Display Program Format / sets Selector + Volume Display Mode
        "01" Display Digital Input Position / sets Selector + Listening Mode Display Mode
        "02" Display Digital Format Position / Display Digital Format(temporary display)
        "03" Display Bass Level / Display Video Format(temporary display)
        "04" Display Treble Level
        "TG" sets Display Mode Wrap-Around Up
        "UP" Parameter Character for the source's *1 models
        UNRESOLVED: applicable interpretation for TX-SR806.
- id: memory_setup
  label: Operate Setup Memory
  kind: action
  command: "MEM"
  params:
    - name: operation
      type: string
      description: '"STR" stores memory; "RCL" recalls memory; "LOCK" locks memory; "UNLK" unlocks memory'
- id: recout_selector
  label: Select RECOUT Input
  kind: action
  command: "SLR"
  params:
    - name: source
      type: string
      description: |
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4,
        "04" VIDEO5, "05" VIDEO6, "06" VIDEO7, "10" DVD,
        "20" TAPE(1), "21" TAPE2, "22" PHONO, "23" CD,
        "24" FM, "25" AM, "26" TUNER, "27" MUSIC SERVER,
        "28" INTERNET RADIO, "30" MULTI CH, "31" XM,
        "7F" OFF, "80" SOURCE
- id: audio_selector
  label: Select Audio Input Type
  kind: action
  command: "SLA"
  params:
    - name: source
      type: string
      description: '"00" AUTO; "01" MULTI-CHANNEL; "02" ANALOG; "03" iLINK; "04" HDMI; "05" COAX/OPT; "06" BALANCE; "UP" sets Audio Selector Wrap-Around Up'
- id: trigger_a
  label: Set 12V Trigger A
  kind: action
  command: "TGA"
  params:
    - name: state
      type: string
      description: '"00" sets 12V Trigger A Off; "01" sets 12V Trigger A On'
- id: trigger_b
  label: Set 12V Trigger B
  kind: action
  command: "TGB"
  params:
    - name: state
      type: string
      description: '"00" sets 12V Trigger B Off; "01" sets 12V Trigger B On'
- id: trigger_c
  label: Set 12V Trigger C
  kind: action
  command: "TGC"
  params:
    - name: state
      type: string
      description: '"00" sets 12V Trigger C Off; "01" sets 12V Trigger C On'
- id: video_output_selector
  label: Select Video Output
  kind: action
  command: "VOS"
  params:
    - name: output
      type: string
      description: '"00" sets D4; "01" sets Component; Japanese Model Only'
- id: isf_mode
  label: Set ISF Mode
  kind: action
  command: "ISF"
  params:
    - name: mode
      type: string
      description: '"00" sets ISF Mode Custom; "01" sets ISF Mode Day; "02" sets ISF Mode Night; "UP" sets ISF Mode State Wrap-Around Up'
- id: listening_mode_additional
  label: Set Additional Listening Mode
  kind: action
  command: "LMD"
  params:
    - name: mode
      type: string
      description: |
        "14" DOLBY VIRTUAL
        "15" DTS Surround Sensation
        "16" Audyssey DSX
        "90" PLIIz Height
        "91" Neo:6 Cinema DTS Surround Sensation
        "92" Neo:6 Music DTS Surround Sensation
        "93" Neural Digital Music
        "94" PLIIz Height + THX Cinema
        "95" PLIIz Height + THX Music
        "96" PLIIz Height + THX Games
        "97" PLIIz Height + THX U2/S2 Cinema
        "98" PLIIz Height + THX U2/S2 Music
        "99" PLIIz Height + THX U2/S2 Games
        "A0" PLIIx/PLII Movie + Audyssey DSX
        "A1" PLIIx/PLII Music + Audyssey DSX
        "A2" PLIIx/PLII Game + Audyssey DSX
        "A3" Neo:6 Cinema + Audyssey DSX
        "A4" Neo:6 Music + Audyssey DSX
        "A5" Neural Surround + Audyssey DSX
        "A6" Neural Digital Music + Audyssey DSX
        "A7" Dolby EX + Audyssey DSX
        "MOVIE", "MUSIC", "GAME" sets Listening Mode Wrap-Around Up
- id: re_eq_academy_cinema_filter
  label: Set Re-EQ Or Academy Or Cinema Filter
  kind: action
  command: "RAS"
  params:
    - name: level
      type: string
      description: |
        Model-dependent interpretations:
        "00" sets Both Off / sets Re-EQ Off / sets Cinema Filter Off
        "01" sets Re-EQ On / sets Cinema Filter On
        "02" sets Academy On
        "UP" sets Re-EQ/Academy State Wrap-Around Up / sets Re-EQ State Wrap-Around Up / sets Cinema Filter State Wrap-Around Up
        UNRESOLVED: applicable interpretation for TX-SR806.
- id: audyssey_equalization
  label: Set Audyssey Equalization
  kind: action
  command: "ADY"
  params:
    - name: state
      type: string
      description: '"00" sets Audyssey 2EQ/MultEQ/MultEQ XT Off; "01" sets Audyssey 2EQ/MultEQ/MultEQ XT On; "UP" sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up'
- id: audyssey_dynamic_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "ADQ"
  params:
    - name: state
      type: string
      description: '"00" sets Audyssey Dynamic EQ Off; "01" sets Audyssey Dynamic EQ On; "UP" sets Audyssey Dynamic EQ State Wrap-Around Up'
- id: audyssey_dynamic_volume
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "ADV"
  params:
    - name: level
      type: string
      description: '"00" sets Audyssey Dynamic Volume Off; "01" sets Audyssey Dynamic Volume Light; "02" sets Audyssey Dynamic Volume Medium; "03" sets Audyssey Dynamic Volume Heavy; "UP" sets Audyssey Dynamic Volume State Wrap-Around Up'
- id: dolby_volume
  label: Set Dolby Volume
  kind: action
  command: "DVL"
  params:
    - name: level
      type: string
      description: '"00" sets Dolby Volume Off; "01" sets Dolby Volume Low; "02" sets Dolby Volume Mid; "03" sets Dolby Volume High; "UP" sets Dolby Volume State Wrap-Around Up'
- id: music_optimizer
  label: Set Music Optimizer
  kind: action
  command: "MOT"
  params:
    - name: state
      type: string
      description: '"00" sets Music Optimizer Off; "01" sets Music Optimizer On; "UP" sets Music Optimizer State Wrap-Around Up'
- id: rds_information
  label: Display RDS Information
  kind: action
  command: "RDS"
  params:
    - name: information
      type: string
      description: '"00" Display RT Information; "01" Display PTY Information; "02" Display TP Information; "UP" Display RDS Information Wrap-Around Change'
- id: pty_scan
  label: Operate PTY Scan
  kind: action
  command: "PTS"
  params:
    - name: value
      type: string
      description: '"00"-"1E" sets PTY No"0-30"( In hexadecimal representation); "ENTER" Finish PTY Scan'
- id: tp_scan
  label: Operate TP Scan
  kind: action
  command: "TPS"
  params:
    - name: operation
      type: string
      description: '"" Start TP Scan (When Don''t Have Parameter); "ENTER" Finish TP Scan'
- id: xm_channel
  label: Select XM Channel
  kind: action
  command: "XCH"
  params:
    - name: channel
      type: string
      description: '"000"-"255" XM Channel Number"000-255"; "UP" sets XM Channel Wrap-Around Up; "DOWN" sets XM Channel Wrap-Around Down'
- id: xm_category
  label: Change XM Category
  kind: action
  command: "XCT"
  params:
    - name: direction
      type: string
      description: '"UP" sets XM Category Wrap-Around Up; "DOWN" sets XM Category Wrap-Around Down'
- id: sirius_channel
  label: Select SIRIUS Channel
  kind: action
  command: "SCH"
  params:
    - name: channel
      type: string
      description: '"000"-"255" SIRIUS Channel Number"000-255"; "UP" sets SIRIUS Channel Wrap-Around Up; "DOWN" sets SIRIUS Channel Wrap-Around Down'
- id: sirius_category
  label: Change SIRIUS Category
  kind: action
  command: "SCT"
  params:
    - name: direction
      type: string
      description: '"UP" sets SIRIUS Category Wrap-Around Up; "DOWN" sets SIRIUS Category Wrap-Around Down'
- id: sirius_parental_lock_password
  label: Enter SIRIUS Parental Lock Password
  kind: action
  command: "SLK"
  params:
    - name: password
      type: string
      description: '"nnnn" Lock Password (4Digits)'
- id: hd_radio_program
  label: Select HD Radio Channel Program
  kind: action
  command: "HPR"
  params:
    - name: program
      type: string
      description: '"01"-"08" sets directly HD Radio Channel Program'
- id: hd_radio_blend_mode
  label: Set HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: mode
      type: string
      description: '"00" sets HD Radio Blend Mode"Auto"; "01" sets HD Radio Blend Mode"Analog"'
- id: network_usb_operation
  label: Operate Network Or USB
  kind: action
  command: "NTC"
  params:
    - name: operation
      type: string
      description: |
        "PLAY" PLAY KEY
        "STOP" STOP KEY
        "PAUSE" PAUSE KEY
        "TRUP" TRACK UP KEY
        "TRDN" TRACK DOWN KEY
        "FF" FF KEY (CONTINUOUS*)
        "REW" REW KEY (CONTINUOUS*)
        "REPEAT" REPEAT KEY
        "RANDOM" RANDOM KEY
        "DISPLAY" DISPLAY KEY
        "ALBUM" ALBUM KEY
        "ARTIST" ARTIST KEY
        "GENRE" GENRE KEY
        "PLAYLIST" PLAYLIST KEY
        "RIGHT" RIGHT KEY
        "LEFT" LEFT KEY
        "UP" UP KEY
        "DOWN" DOWN KEY
        "SELECT" SELECT KEY
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" corresponding numeric KEY
        "DELETE" DELETE KEY
        "CAPS" CAPS KEY
        "LOCATION" LOCATION KEY
        "LANGUAGE" LANGUAGE KEY
        "SETUP" SETUP KEY
        "RETURN" RETURN KEY
        "CHUP" CH UP(for iRadio)
        "CHDN" CH DOWN(for iRadio)
- id: internet_radio_preset
  label: Set Internet Radio Preset
  kind: action
  command: "NPR"
  params:
    - name: num
      type: string
      description: '"01"-"28" sets Preset No. 1-40 ( In hexadecimal representation)'
- id: ri_cd_operation
  label: Operate RI CD Player
  kind: action
  command: "CCD"
  params:
    - name: operation
      type: string
      description: |
        "TRACK" TRACK+
        "PLAY" PLAY
        "STOP" STOP
        "PAUSE" PAUSE
        "SKIP.F" >>I
        "SKIP.R" I<<
        "MEMORY" MEMORY
        "CLEAR" CLEAR
        "REPEAT" REPEAT
        "RANDOM" RANDOM
        "DISP" DISPLAY
        "D.MODE" D.MODE
        "FF" FF >>
        "REW" REW <<
        "OP/CL" OPEN/CLOSE
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "10", "+10" corresponding numeric key
        "D.SKIP" DISC +
        "DISC.F" DISC +
        "DISC.R" DISC-
        "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6" corresponding disc
        "STBY" STANDBY
        "PON" POWER ON
- id: ri_tape1_operation
  label: Operate RI Tape 1
  kind: action
  command: "CT1"
  params:
    - name: operation
      type: string
      description: '"PLAY.F" PLAY >; "PLAY.R" PLAY <; "STOP" STOP; "RC/PAU" REC/PAUSE; "FF" FF >>; "REW" REW <<'
- id: ri_tape2_operation
  label: Operate RI Tape 2
  kind: action
  command: "CT2"
  params:
    - name: operation
      type: string
      description: '"PLAY.F" PLAY >; "PLAY.R" PLAY <; "STOP" STOP; "RC/PAU" REC/PAUSE; "FF" FF >>; "REW" REW <<; "OP/CL" OPEN/CLOSE; "SKIP.F" >>I; "SKIP.R" I<<; "REC" REC'
- id: ri_equalizer_preset
  label: Operate RI Equalizer Preset
  kind: action
  command: "CEQ"
  params:
    - name: operation
      type: string
      description: '"PRESET" PRESET'
- id: ri_dat_operation
  label: Operate RI DAT Recorder
  kind: action
  command: "CDT"
  params:
    - name: operation
      type: string
      description: '"PLAY" PLAY; "RC/PAU" REC/PAUSE; "STOP" STOP; "SKIP.F" >>I; "SKIP.R" I<<; "FF" FF >>; "REW" REW <<'
- id: ri_dvd_operation
  label: Operate RI DVD Player
  kind: action
  command: "CDV"
  params:
    - name: operation
      type: string
      description: |
        "PWRON" POWER ON
        "PWROFF" POWER OFF
        "PLAY" PLAY
        "STOP" STOP
        "SKIP.F" >>I
        "SKIP.R" I<<
        "FF" FF >>
        "REW" REW <<
        "PAUSE" PAUSE
        "LASTPLAY" LAST PLAY
        "SUBTON/OFF" SUBTITLE ON/OFF
        "SUBTITLE" SUBTITLE
        "SETUP" SETUP
        "TOPMENU" TOPMENU
        "MENU" MENU
        "UP" UP
        "DOWN" DOWN
        "LEFT" LEFT
        "RIGHT" RIGHT
        "ENTER" ENTER
        "RETURN" RETURN
        "DISC.F" DISC +
        "DISC.R" DISC-
        "AUDIO" AUDIO
        "RANDOM" RANDOM
        "OP/CL" OPEN/CLOSE
        "ANGLE" ANGLE
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0" corresponding numeric key
        "SEARCH" SEARCH
        "DISP" DISPLAY
        "REPEAT" REPEAT
        "MEMORY" MEMORY
        "CLEAR" CLEAR
        "ABR" A-B REPEAT
        "STEP.F" STEP
        "STEP.R" STEP BACK
        "SLOW.F" SLOW
        "SLOW.R" SLOW BACK
        "ZOOMTG" ZOOM
        "ZOOMUP" ZOOM UP
        "ZOOMDN" ZOOM DOWN
        "PROGRE" PROGRESSIVE
        "VDOFF" VIDEO ON/OFF
        "CONMEM" CONDITION MEMORY
        "FUNMEM" FUNCTION MEMORY
        "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6" corresponding disc
        "FOLDUP" FOLDER UP
        "FOLDDN" FOLDER DOWN
        "P.MODE" PLAY MODE
        "ASCTG" ASPECT(Toggle)
        "CDPCD" CD CHAIN REPEAT
        "MSPUP" MULTI SPEED UP
        "MSPDN" MULTI SPEED DOWN
        "PCT" PICTURE CONTROL
        "RSCTG" RESOLUTION(Toggle)
        "INIT" Return to Factory Settings
- id: ri_md_operation
  label: Operate RI MD Recorder
  kind: action
  command: "CMD"
  params:
    - name: operation
      type: string
      description: |
        "PLAY" PLAY
        "STOP" STOP
        "FF" FF >>
        "REW" REW <<
        "P.MODE" PLAY MODE
        "SKIP.F" >>I
        "SKIP.R" I<<
        "PAUSE" PAUSE
        "REC" REC
        "MEMORY" MEMORY
        "DISP" DISPLAY
        "SCROLL" SCROLL
        "M.SCAN" MUSIC SCAN
        "CLEAR" CLEAR
        "RANDOM" RANDOM
        "REPEAT" REPEAT
        "ENTER" ENTER
        "EJECT" EJECT
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0" corresponding numeric key
        "nn/nnn" --/---
        "NAME" NAME
        "GROUP" GROUP
        "STBY" STANDBY
- id: ri_cdr_operation
  label: Operate RI CD-R Recorder
  kind: action
  command: "CCR"
  params:
    - name: operation
      type: string
      description: |
        "P.MODE" PLAY MODE
        "PLAY" PLAY
        "STOP" STOP
        "SKIP.F" >>I
        "SKIP.R" I<<
        "PAUSE" PAUSE
        "REC" REC
        "CLEAR" CLEAR
        "REPEAT" REPEAT
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0" corresponding numeric key
        "nn/nnn" --/---
        "SCROLL" SCROLL
        "OP/CL" OPEN/CLOSE
        "DISP" DISPLAY
        "RANDOM" RANDOM
        "MEMORY" MEMORY
        "FF" FF
        "REW" REW
        "STBY" STANDBY
- id: ri_dock_operation
  label: Operate RI Docking Station
  kind: action
  command: "CDS"
  params:
    - name: operation
      type: string
      description: |
        "PWRON" sets Dock On
        "PWROFF" sets Dock Standby
        "PLY/RES" PLAY/RESUME Key
        "STOP" STOP Key
        "SKIP.F" TRACK UP Key
        "SKIP.R" TRACK DOWN Key
        "PAUSE" PAUSE Key
        "PLY/PAU" PLAY/PAUSE Key
        "FF" FF Key
        "REW" FR Key
        "ALBUM+" ALBUM UP Key
        "ALBUM-" ALBUM DOWN Key
        "PLIST+" PLAYLIST UP Key
        "PLIST-" PLAYLIST DOWN Key
        "CHAPT+" CHAPTER UP Key
        "CHAPT-" CHAPTER DOWN Key
        "RANDOM" SHUFFLE Key
        "REPEAT" REPEAT Key
        "MUTE" MUTE Key
        "BLIGHT" BACKLIGHT Key
        "MENU" MENU Key
        "ENTER" SELECT Key
        "UP" CURSOR UP Key
        "DOWN" CURSOR DOWN Key
```

## Feedbacks
```yaml
# Each query_command below is the literal source opcode.
# The documented query parameter is "QSTN" for every listed query_command.
# Encode a query as "!1" + query_command + "QSTN" + the transport end character.
- id: power_state
  label: Power State
  type: enum
  values: [on, standby]
  query_command: "PWR"
- id: volume_state
  label: Master Volume Level
  type: string
  description: "Hex \"00\"-\"64\""
  query_command: "MVL"
- id: muting_state
  label: Mute State
  type: enum
  values: [on, off]
  query_command: "AMT"
- id: input_state
  label: Input Selection
  type: string
  description: Input code string
  query_command: "SLI"
- id: listening_mode_state
  label: Listening Mode
  type: string
  description: Mode code string
  query_command: "LMD"
- id: dimmer_state
  label: Dimmer Level
  type: string
  description: "\"00\" Bright, \"01\" Dim, \"02\" Dark, \"03\" Shut-Off"
  query_command: "DIM"
- id: front_tone_state
  label: Front Tone
  type: string
  description: "\"BxxTxx\" format"
  query_command: "TFR"
- id: tuner_state
  label: Tuner Frequency
  type: string
  description: "FM nnn.nn MHz / AM nnnnn kHz"
  query_command: "TUN"
- id: preset_state
  label: Preset Number
  type: string
  description: "Hex \"01\"-\"28\""
  query_command: "PRS"
- id: late_night_state
  label: Late Night Level
  type: string
  description: "\"00\" Off, \"01\" Low, \"02\" High, \"03\" Auto"
  query_command: "LTN"
- id: sleep_timer_state
  label: Sleep Timer
  type: string
  description: "\"01\"-\"5A\" minutes or \"OFF\""
  query_command: "SLP"
- id: audio_info
  label: Audio Information
  type: string
  description: "nnnnn:nnnnn format"
  query_command: "IFA"
- id: video_info
  label: Video Information
  type: string
  description: "nnnnn:nnnnn format"
  query_command: "IFV"
- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  values: [on, standby]
  query_command: "ZPW"
- id: zone2_volume_state
  label: Zone 2 Volume
  type: string
  description: "Hex \"00\"-\"64\""
  query_command: "ZVL"
- id: zone2_muting_state
  label: Zone 2 Mute State
  type: enum
  values: [on, off]
  query_command: "ZMT"
- id: zone2_input_state
  label: Zone 2 Input
  type: string
  query_command: "SLZ"
- id: zone2_tone_state
  label: Zone 2 Tone
  type: string
  description: "\"BxxTxx\" format"
  query_command: "ZTN"
- id: zone2_balance_state
  label: Zone 2 Balance
  type: string
  query_command: "ZBL"
- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  values: [on, standby]
  query_command: "PW3"
- id: zone3_volume_state
  label: Zone 3 Volume
  type: string
  description: "Hex \"00\"-\"64\""
  query_command: "VL3"
- id: zone3_muting_state
  label: Zone 3 Mute State
  type: enum
  values: [on, off]
  query_command: "MT3"
- id: zone3_input_state
  label: Zone 3 Input
  type: string
  query_command: "SL3"
- id: zone3_tone_state
  label: Zone 3 Tone
  type: string
  description: "\"BxxTxx\" format"
  query_command: "TN3"
- id: zone3_balance_state
  label: Zone 3 Balance
  type: string
  query_command: "BL3"
- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  values: [on, standby]
  query_command: "PW4"
- id: zone4_volume_state
  label: Zone 4 Volume
  type: string
  description: "Hex \"00\"-\"64\""
  query_command: "VL4"
- id: zone4_muting_state
  label: Zone 4 Mute State
  type: enum
  values: [on, off]
  query_command: "MT4"
- id: zone4_input_state
  label: Zone 4 Input
  type: string
  query_command: "SL4"
- id: speaker_a_state
  label: Speaker A State
  type: string
  description: '"00" Speaker Off; "01" Speaker On'
  query_command: "SPA"
- id: speaker_b_state
  label: Speaker B State
  type: string
  description: '"00" Speaker Off; "01" Speaker On'
  query_command: "SPB"
- id: speaker_layout_state
  label: Speaker Layout
  type: string
  description: '"SB" SurrBack Speaker; "FH" Front High Speaker / SurrBack+Front High Speakers; "FW" Front Wide Speaker / SurrBack+Front Wide Speakers'
  query_command: "SPL"
- id: front_wide_tone_state
  label: Front Wide Tone
  type: string
  description: '"BxxTxx" format'
  query_command: "TFW"
- id: front_high_tone_state
  label: Front High Tone
  type: string
  description: '"BxxTxx" format'
  query_command: "TFH"
- id: center_tone_state
  label: Center Tone
  type: string
  description: '"BxxTxx" format'
  query_command: "TCT"
- id: surround_tone_state
  label: Surround Tone
  type: string
  description: '"BxxTxx" format'
  query_command: "TSR"
- id: surround_back_tone_state
  label: Surround Back Tone
  type: string
  description: '"BxxTxx" format'
  query_command: "TSB"
- id: subwoofer_tone_state
  label: Subwoofer Tone
  type: string
  description: '"BxxTxx" format as documented; no subwoofer treble setter is documented'
  query_command: "TSW"
- id: subwoofer_temporary_level_state
  label: Temporary Subwoofer Level
  type: string
  description: '"-F"-"00"-"+C"; Subwoofer Level-15dB-0dB-+12dB'
  query_command: "SWL"
- id: center_temporary_level_state
  label: Temporary Center Level
  type: string
  description: '"-C"-"00"-"+C"; Center Level-12dB-0dB-+12dB; UNRESOLVED: the source labels the CTL query result as Subwoofer Level'
  query_command: "CTL"
- id: display_mode_state
  label: Display Mode
  type: string
  description: 'UNRESOLVED: model-dependent interpretation of DIF values'
  query_command: "DIF"
- id: recout_input_state
  label: RECOUT Input
  type: string
  description: Selector position code
  query_command: "SLR"
- id: audio_selector_state
  label: Audio Input Type
  type: string
  description: '"00" AUTO; "01" MULTI-CHANNEL; "02" ANALOG; "03" iLINK; "04" HDMI; "05" COAX/OPT; "06" BALANCE'
  query_command: "SLA"
- id: video_output_state
  label: Video Output
  type: string
  description: '"00" D4; "01" Component; Japanese Model Only'
  query_command: "VOS"
- id: isf_mode_state
  label: ISF Mode
  type: string
  description: '"00" Custom; "01" Day; "02" Night'
  query_command: "ISF"
- id: re_eq_academy_cinema_filter_state
  label: Re-EQ Or Academy Or Cinema Filter State
  type: string
  description: 'UNRESOLVED: model-dependent Re-EQ/Academy, Re-EQ, or Cinema Filter interpretation'
  query_command: "RAS"
- id: audyssey_equalization_state
  label: Audyssey Equalization State
  type: string
  description: '"00" Off; "01" On'
  query_command: "ADY"
- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  type: string
  description: '"00" Off; "01" On'
  query_command: "ADQ"
- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  type: string
  description: '"00" Off; "01" Light; "02" Medium; "03" Heavy'
  query_command: "ADV"
- id: dolby_volume_state
  label: Dolby Volume State
  type: string
  description: '"00" Off; "01" Low; "02" Mid; "03" High'
  query_command: "DVL"
- id: music_optimizer_state
  label: Music Optimizer State
  type: string
  description: '"00" Off; "01" On; UNRESOLVED: the source labels the MOT query result as Dolby Volume State'
  query_command: "MOT"
- id: xm_channel_name
  label: XM Channel Name
  type: string
  description: '"nnnnnnnnnn" XM Channel Name'
  query_command: "XCN"
- id: xm_artist_name
  label: XM Artist Name
  type: string
  description: '"nnnnnnnnnn" XM Artist Name'
  query_command: "XAT"
- id: xm_title
  label: XM Title
  type: string
  description: '"nnnnnnnnnn" XM Title'
  query_command: "XTI"
- id: xm_channel_state
  label: XM Channel Number
  type: string
  description: '"000"-"255"'
  query_command: "XCH"
- id: xm_category_state
  label: XM Category
  type: string
  description: '"nnnnnnnnnn" XM Category Info'
  query_command: "XCT"
- id: sirius_channel_name
  label: SIRIUS Channel Name
  type: string
  description: '"nnnnnnnnnn" SIRIUS Channel Name'
  query_command: "SCN"
- id: sirius_artist_name
  label: SIRIUS Artist Name
  type: string
  description: '"nnnnnnnnnn" SIRIUS Artist Name'
  query_command: "SAT"
- id: sirius_title
  label: SIRIUS Title
  type: string
  description: '"nnnnnnnnnn" SIRIUS Title'
  query_command: "STI"
- id: sirius_channel_state
  label: SIRIUS Channel Number
  type: string
  description: '"000"-"255"'
  query_command: "SCH"
- id: sirius_category_state
  label: SIRIUS Category
  type: string
  description: '"nnnnnnnnnn" SIRIUS Category Info'
  query_command: "SCT"
- id: sirius_parental_lock_message
  label: SIRIUS Parental Lock Message
  type: string
  description: 'SLK "INPUT" displays"Please input the Lock password"; "WRONG" displays"The Lock password is wrong"; no query documented'
- id: hd_radio_artist_name
  label: HD Radio Artist Name
  type: string
  description: 'variable-length, 64 digits max'
  query_command: "HAT"
- id: hd_radio_channel_name
  label: HD Radio Channel Name
  type: string
  description: 'HD Radio Channel Name (Station Name) (7 digits)'
  query_command: "HCN"
- id: hd_radio_title
  label: HD Radio Title
  type: string
  description: 'variable-length, 64 digits max'
  query_command: "HTI"
- id: hd_radio_detail_info
  label: HD Radio Detail Information
  type: string
  description: '"nnnnnnnnnn"; UNRESOLVED: HDS detail heading and Title description differ'
  query_command: "HDS"
- id: hd_radio_program_state
  label: HD Radio Channel Program
  type: string
  description: '"01"-"08"'
  query_command: "HPR"
- id: hd_radio_blend_mode_state
  label: HD Radio Blend Mode
  type: string
  description: '"00" Auto; "01" Analog'
  query_command: "HBL"
- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  type: string
  description: '"mmnnoo"; mm -> "00" not HD, "01" HD; nn -> current Program "01"-"08"; oo -> receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.)'
  query_command: "HTS"
- id: network_usb_artist_name
  label: Network Or USB Artist Name
  type: string
  description: 'variable-length, 64 letters max; UNRESOLVED: source query description says iPod Artist Name'
  query_command: "NAT"
- id: network_usb_album_name
  label: Network Or USB Album Name
  type: string
  description: 'variable-length, 64 letters max; UNRESOLVED: source query description says iPod Album Name'
  query_command: "NAL"
- id: network_usb_title
  label: Network Or USB Title
  type: string
  description: 'variable-length, 64 letters max; UNRESOLVED: source query description says HD Radio Title'
  query_command: "NTI"
- id: network_usb_time_info
  label: Network Or USB Time Information
  type: string
  description: '"mm:ss/mm:ss" Net/USB Time Info (Elapsed time/Track Time Max 99:59)'
  query_command: "NTM"
- id: network_usb_track_info
  label: Network Or USB Track Information
  type: string
  description: '"cccc/tttt" Net/USB Track Info (Current Track/Toral Track Max 9999); UNRESOLVED: source query description says iPod Time Info'
  query_command: "NTR"
- id: network_usb_play_status
  label: Network Or USB Play Status
  type: string
  description: '"prs" Net/USB Play Status (3 letters); p -> Play Status: "S": STOP, "P": Play, "p": Pause, "F": FF, "R": FR; r-> Repeat Status:"-": Off,"R": All,"F": Folder,"1": Repeat 1; UNRESOLVED: s is not defined in the supplied source'
  query_command: "NST"
```

## Variables
```yaml
# UNRESOLVED: populate from source if applicable
```

## Events
```yaml
# Device sends unsolicited status messages via eISCP when connection is held continuously.
# UNRESOLVED: event subscription model not fully detailed in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes
ISCP message format: `!1CCC<parameter>[CR/LF/CRLF]` where `CCC` is the 3-char command and `1` is the Receiver destination. Device→Controller responses mirror the command (source char `1`). End char is `[CR]`, `[LF]`, or `[CR][LF]` over RS-232C; `[EOF]` (0x1A), optionally `[EOF][CR]` or `[EOF][CR][LF]`, over eISCP.

RS-232C hardware: 3-wire, DB9 female (pin 2 = TX, pin 3 = RX, pin 5 = GND), straight-thru cable. Response latency: device replies within 50ms; messages must be spaced at least 50ms apart.

eISCP packet: 16-byte header (`ISCP`, header size 0x00000010 big-endian, data size big-endian, version 0x01, reserved 0x000000, unit type `1`) + ISCP data. Only one client connection at a time; connection must be held continuously to receive unsolicited status notifications.

Zone 2/3/4 power and volume commands only work when main zone is on. Zone 2/3 tone/balance only works when main is on and that zone is powered or variable. Tuner function is shared by MAIN and ZONE sides; control is separated. Net-Tune/Network FF/REW commands must be sent continuously with no more than 100ms between codes.

<!-- UNRESOLVED: eISCP Ethernet authentication method not stated -->
<!-- UNRESOLVED: MAC address format not documented beyond "confirm on setup menu" -->
<!-- UNRESOLVED: source support matrix has no TX-SR806 column; per-model applicability of matrix-only commands (SPA/SPB, SPL, SWL, CTL, DIF, MEM, SLR, SLA, TGA/TGB/TGC, VOS, ISF, ADY, ADQ, ADV, DVL, MOT, RAS variants, RDS/PTS/TPS, XM/SIRIUS, HD Radio, full NTC, RI-dock CCD/CT1/CT2/CDV/CT1/CT2/CDV/CMD/CCR/CDS) not confirmable from this document -->
<!-- UNRESOLVED: firmware version compatibility not stated for TX-SR806 specifically -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:44:31.700Z
last_checked_at: 2026-10-07T15:43:19.563Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T15:43:19.563Z
matched_actions: 297
action_count: 297
confidence: medium
summary: "All 297 action units match source ISCP mnemonics and parameters, transport values are supported, and the source catalogue is essentially fully represented by the spec. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "eISCP Ethernet authentication method not documented"
- "source support matrix has no TX-SR806 column; command applicability inferred from TX-SR806-era feature set and the zone command lists (which carry no per-model matrix)"
- "TX-SR806 applicability of additional model-dependent commands."
- "applicable interpretation for TX-SR806."
- "the source labels the CTL query result as Subwoofer Level'"
- "model-dependent interpretation of DIF values'"
- "model-dependent Re-EQ/Academy, Re-EQ, or Cinema Filter interpretation'"
- "the source labels the MOT query result as Dolby Volume State'"
- "HDS detail heading and Title description differ'"
- "source query description says iPod Artist Name'"
- "source query description says iPod Album Name'"
- "source query description says HD Radio Title'"
- "source query description says iPod Time Info'"
- "s is not defined in the supplied source'"
- "populate from source if applicable"
- "event subscription model not fully detailed in source"
- "no explicit macro sequences documented"
- "source contains no explicit safety warnings or interlock procedures"
- "eISCP Ethernet authentication method not stated"
- "MAC address format not documented beyond \"confirm on setup menu\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
