---
spec_id: admin/integra-dtm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTM Series Control Spec"
manufacturer: Integra
model_family: "DTM Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DTM Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T21:08:22.830Z
last_checked_at: 2026-10-07T21:08:22.830Z
generated_at: 2026-10-07T21:08:22.830Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) are passthrough"
  - "no explicit multi-step macro sequences described in source"
  - "no explicit safety warnings or power-on sequencing requirements found in source"
  - "specific DTM models covered by this protocol doc not enumerated"
  - "firmware version compatibility not stated"
  - "exact eISCP header byte offsets not fully documented for binary parsing"
  - "maximum command string length not stated"
  - "error response format not documented"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:08:22.830Z
  matched_actions: 187
  action_count: 187
  confidence: medium
  summary: "All 187 action units match source ISCP command codes with correct shapes and supported transport. Source is a generic Integra receiver guide that never names the DTM series. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra DTM Series Control Spec

## Summary
The Integra DTM Series are AV receivers controllable via ISCP (Integra Serial Control Protocol) over RS-232C and Ethernet (eISCP over TCP). Commands use a three-character command code followed by parameter characters. The protocol supports command, query, and unsolicited event notification messages. This spec covers both RS-232 and TCP/IP transport layers.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128
  # port range 49152-65535 configurable on device; 60128 is default
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
# inferred from power on/off commands
- powerable
# inferred from query commands (QSTN parameter throughout)
- queryable
# inferred from input selector (SLI) and zone routing commands
- routable
# inferred from master volume (MVL), tone, and level commands
- levelable
```

## Actions
```yaml
# --- System Power ---
- id: power_on
  label: Power On
  kind: action
  command: "PWR01"
  params: []

- id: power_off
  label: Power Standby
  kind: action
  command: "PWR00"
  params: []

- id: mute_on
  label: Audio Mute On
  kind: action
  command: "AMT01"
  params: []

- id: mute_off
  label: Audio Mute Off
  kind: action
  command: "AMT00"
  params: []

- id: mute_toggle
  label: Audio Mute Toggle
  kind: action
  command: "AMTTG"
  params: []

# --- Master Volume ---
- id: volume_set
  label: Set Volume Level
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex (00-64 for 0-100, or 00-50 for 0-80 depending on model)"

- id: volume_up
  label: Volume Up
  kind: action
  command: "MVLUP"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "MVLDOWN"
  params: []

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  command: "MVLUP1"
  params: []

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  command: "MVLDOWN1"
  params: []

# --- Input Selector ---
- id: select_input
  label: Select Input
  kind: action
  command: "SLI{input}"
  params:
    - name: input
      type: string
      description: "Input code (00=VIDEO1, 01=CBL/SAT, 02=GAME, 03=AUX1, 04=AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB/Front, 2A=USB/Rear, 30=MULTI CH, 31=XM, 32=SIRIUS, 40=Universal PORT)"

- id: input_up
  label: Input Selector Wrap Up
  kind: action
  command: "SLIUP"
  params: []

- id: input_down
  label: Input Selector Wrap Down
  kind: action
  command: "SLIDOWN"
  params: []

# --- Audio Selector ---
- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  command: "SLA{mode}"
  params:
    - name: mode
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

- id: audio_selector_up
  label: Audio Selector Wrap Up
  kind: action
  command: "SLAUP"
  params: []

# --- Listening Mode ---
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  command: "LMD{mode}"
  params:
    - name: mode
      type: string
      description: "Mode code in hex (00=STEREO, 01=DIRECT, 02=SURROUND, 11=PURE AUDIO, 40=5.1ch/ Straight Decode, 80=PLII Movie, 81=PLII Music, etc.)"

- id: listening_mode_up
  label: Listening Mode Wrap Up
  kind: action
  command: "LMDUP"
  params: []

- id: listening_mode_down
  label: Listening Mode Wrap Down
  kind: action
  command: "LMDDOWN"
  params: []

# --- Speaker A/B ---
- id: speaker_a_on
  label: Speaker A On
  kind: action
  command: "SPA01"
  params: []

- id: speaker_a_off
  label: Speaker A Off
  kind: action
  command: "SPA00"
  params: []

- id: speaker_b_on
  label: Speaker B On
  kind: action
  command: "SPB01"
  params: []

- id: speaker_b_off
  label: Speaker B Off
  kind: action
  command: "SPB00"
  params: []

# --- Tone (Front) ---
- id: tone_front_set
  label: Set Front Tone
  kind: action
  command: "TFR{params}"
  params:
    - name: params
      type: string
      description: "Bxx for bass, Txx for treble (-A to +A hex, -10 to +10 in 2-step). e.g. B00T00"

# --- Dimmer ---
- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  command: "DIM{level}"
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"

# --- Sleep ---
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: "SLP{time}"
  params:
    - name: time
      type: string
      description: "01-5A hex (1-90 min), or OFF"

- id: sleep_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

# --- OSD Navigation ---
- id: osd_menu
  label: OSD Menu
  kind: action
  command: "OSDMENU"
  params: []

- id: osd_up
  label: OSD Up
  kind: action
  command: "OSDUP"
  params: []

- id: osd_down
  label: OSD Down
  kind: action
  command: "OSDDOWN"
  params: []

- id: osd_left
  label: OSD Left
  kind: action
  command: "OSDLEFT"
  params: []

- id: osd_right
  label: OSD Right
  kind: action
  command: "OSDRIGHT"
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  command: "OSDENTER"
  params: []

- id: osd_exit
  label: OSD Exit
  kind: action
  command: "OSDEXIT"
  params: []

# --- HDMI Output ---
- id: hdmi_output_set
  label: Set HDMI Output
  kind: action
  command: "HDO{mode}"
  params:
    - name: mode
      type: string
      description: "00=No Analog, 01=Out Main, 02=Out Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"

# --- Monitor Out Resolution ---
- id: monitor_resolution_set
  label: Set Monitor Out Resolution
  kind: action
  command: "RES{mode}"
  params:
    - name: mode
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs"

# --- 12V Triggers ---
- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  command: "TGA01"
  params: []

- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  command: "TGA00"
  params: []

- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  command: "TGB01"
  params: []

- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  command: "TGB00"
  params: []

- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  command: "TGC01"
  params: []

- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  command: "TGC00"
  params: []

# --- Network/USB Playback ---
- id: net_play
  label: Network Play
  kind: action
  command: "NTCPLAY"
  params: []

- id: net_stop
  label: Network Stop
  kind: action
  command: "NTCSTOP"
  params: []

- id: net_pause
  label: Network Pause
  kind: action
  command: "NTCPAUSE"
  params: []

- id: net_track_up
  label: Network Track Up
  kind: action
  command: "NTCTRUP"
  params: []

- id: net_track_down
  label: Network Track Down
  kind: action
  command: "NTCTRDN"
  params: []

# --- Zone 2 ---
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "ZPW01"
  params: []

- id: zone2_power_off
  label: Zone 2 Power Standby
  kind: action
  command: "ZPW00"
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "ZMT01"
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "ZMT00"
  params: []

- id: zone2_volume_set
  label: Zone 2 Set Volume
  kind: action
  command: "ZVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex (00-64 for 0-100)"

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "ZVLUP"
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "ZVLDOWN"
  params: []

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: "SLZ{input}"
  params:
    - name: input
      type: string
      description: "Input code (same codes as main SLI)"

# --- Zone 3 ---
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "PW301"
  params: []

- id: zone3_power_off
  label: Zone 3 Power Standby
  kind: action
  command: "PW300"
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: "MT301"
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: "MT300"
  params: []

- id: zone3_volume_set
  label: Zone 3 Set Volume
  kind: action
  command: "VL3{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex (00-64 for 0-100)"

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "SL3{input}"
  params:
    - name: input
      type: string
      description: "Input code (same codes as main SLI)"

# --- Zone 4 ---
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "PW401"
  params: []

- id: zone4_power_off
  label: Zone 4 Power Standby
  kind: action
  command: "PW400"
  params: []

- id: zone4_volume_set
  label: Zone 4 Set Volume
  kind: action
  command: "VL4{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex (00-64 for 0-100)"

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "SL4{input}"
  params:
    - name: input
      type: string
      description: "Input code (same codes as main SLI)"

# UNRESOLVED: RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) are passthrough
# commands for connected RI devices (CD players, tape decks, DVD players, etc.) and are not
# direct receiver commands. Included in source but not listed as primary receiver actions.

# --- Additional Documented Commands ---
# Each added command field is the literal command-character token from the source.
# Append the selected parameter characters directly to that token for transmission.
# QSTN parameters below represent queries not already represented by existing Feedbacks.

- id: speaker_a_wrap
  label: Speaker A Wrap Around
  kind: action
  command: "SPA"
  params:
    - name: params
      type: string
      description: '"UP" sets Speaker Switch Wrap-Around'

- id: speaker_b_wrap
  label: Speaker B Wrap Around
  kind: action
  command: "SPB"
  params:
    - name: params
      type: string
      description: '"UP" sets Speaker Switch Wrap-Around'

- id: speaker_layout
  label: Speaker Layout
  kind: action
  command: "SPL"
  params:
    - name: params
      type: string
      description: '"SB" sets SurrBack Speaker; "FH" sets Front High Speaker / SurrBack+Front High Speakers; "FW" sets Front Wide Speaker / SurrBack+Front Wide Speakers; "UP" sets Speaker Switch Wrap-Around; "QSTN" gets the Speaker State'

- id: tone_front_adjust
  label: Adjust Front Tone
  kind: action
  command: "TFR"
  params:
    - name: params
      type: string
      description: '"BUP" sets Front Bass up(2 step); "BDOWN" sets Front Bass down(2 step); "TUP" sets Front Treble up(2 step); "TDOWN" sets Front Treble down(2 step)'

- id: tone_front_wide
  label: Front Wide Tone
  kind: action
  command: "TFW"
  params:
    - name: params
      type: string
      description: '"Bxx" Front Wide Bass; "Txx" Front Wide Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Front Wide Bass up(2 step); "BDOWN" sets Front Wide Bass down(2 step); "TUP" sets Front Wide Treble up(2 step); "TDOWN" sets Front Wide Treble down(2 step); "QSTN" gets Front Wide Tone ("BxxTxx")'

- id: tone_front_high
  label: Front High Tone
  kind: action
  command: "TFH"
  params:
    - name: params
      type: string
      description: '"Bxx" Front High Bass; "Txx" Front High Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Front High Bass up(2 step); "BDOWN" sets Front High Bass down(2 step); "TUP" sets Front High Treble up(2 step); "TDOWN" sets Front High Treble down(2 step); "QSTN" gets Front High Tone ("BxxTxx")'

- id: tone_center
  label: Center Tone
  kind: action
  command: "TCT"
  params:
    - name: params
      type: string
      description: '"Bxx" Center Bass; "Txx" Center Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Center Bass up(2 step); "BDOWN" sets Center Bass down(2 step); "TUP" sets Center Treble up(2 step); "TDOWN" sets Center Treble down(2 step); "QSTN" gets Center Tone ("BxxTxx")'

- id: tone_surround
  label: Surround Tone
  kind: action
  command: "TSR"
  params:
    - name: params
      type: string
      description: '"Bxx" Surround Bass; "Txx" Surround Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Surround Bass up(2 step); "BDOWN" sets Surround Bass down(2 step); "TUP" sets Surround Treble up(2 step); "TDOWN" sets Surround Treble down(2 step); "QSTN" gets Surround Tone ("BxxTxx")'

- id: tone_surround_back
  label: Surround Back Tone
  kind: action
  command: "TSB"
  params:
    - name: params
      type: string
      description: '"Bxx" Surround Back Bass; "Txx" Surround Back Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Surround Back Bass up(2 step); "BDOWN" sets Surround Back Bass down(2 step); "TUP" sets Surround Back Treble up(2 step); "TDOWN" sets Surround Back Treble down(2 step); "QSTN" gets Surround Back Tone ("BxxTxx")'

- id: tone_subwoofer
  label: Subwoofer Tone
  kind: action
  command: "TSW"
  params:
    - name: params
      type: string
      description: '"Bxx" Subwoofer Bass (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]); "BUP" sets Subwoofer Bass up(2 step); "BDOWN" sets Subwoofer Bass down(2 step); "QSTN" gets Subwoofer Tone ("BxxTxx")'

- id: sleep_wrap
  label: Sleep Timer Wrap Up
  kind: action
  command: "SLP"
  params:
    - name: params
      type: string
      description: '"UP" sets Sleep Time Wrap-Around UP'

- id: speaker_level_calibration
  label: Speaker Level Calibration
  kind: action
  command: "SLC"
  params:
    - name: params
      type: string
      description: '"TEST" TEST Key; "CHSEL" CH SEL Key; "UP" LEVEL + Key; "DOWN" LEVEL–KEY'

- id: subwoofer_temporary_level
  label: Subwoofer Temporary Level
  kind: action
  command: "SWL"
  params:
    - name: params
      type: string
      description: '"-F"-"00"-"+C" sets Subwoofer Level -15dB-0dB-+12dB; "UP" LEVEL + Key; "DOWN" LEVEL–KEY; "QSTN" gets the Subwoofer Level'

- id: center_temporary_level
  label: Center Temporary Level
  kind: action
  command: "CTL"
  params:
    - name: params
      type: string
      description: '"-C"-"00"-"+C" sets Center Level -12dB-0dB-+12dB; "UP" LEVEL + Key; "DOWN" LEVEL–KEY; "QSTN" gets the Center Level'

- id: display_information_mode
  label: Display Information And Mode
  kind: action
  command: "DIF"
  params:
    - name: params
      type: string
      description: 'Display Information: "00" Display Program Format; "01" Display Digital Input Position; "02" Display Digital Format Position; "03" Display Bass Level; "04" Display Treble Level. Display Mode: "00" sets Selector + Volume Display Mode; "01" sets Selector + Listening Mode Display Mode; "02" Display Digital Format(temporary display); "03" Display Video Format(temporary display); "TG" sets Display Mode Wrap-Around Up; "QSTN" gets The Display Mode. Interpretation is model-dependent; model mapping UNRESOLVED.'

- id: dimmer_wrap
  label: Dimmer Wrap Up
  kind: action
  command: "DIM"
  params:
    - name: params
      type: string
      description: '"DIM" sets Dimmer Level Wrap-Around Up'

- id: osd_adjust
  label: OSD Audio And Video Adjust
  kind: action
  command: "OSD"
  params:
    - name: params
      type: string
      description: '"AUDIO" Audio Adjust Key; "VIDEO" Video Adjust Key'

- id: memory_setup
  label: Memory Setup
  kind: action
  command: "MEM"
  params:
    - name: params
      type: string
      description: '"STR" stores memory; "RCL" recalls memory; "LOCK" locks memory; "UNLK" unlocks memory'

- id: audio_information_query
  label: Query Audio Information
  kind: action
  command: "IFA"
  params:
    - name: params
      type: string
      description: '"QSTN" gets Information of Audio'

- id: video_information_query
  label: Query Video Information
  kind: action
  command: "IFV"
  params:
    - name: params
      type: string
      description: '"QSTN" gets Information of Video'

- id: recout_selector
  label: RECOUT Selector
  kind: action
  command: "SLR"
  params:
    - name: params
      type: string
      description: '"00" sets VIDEO1; "01" sets VIDEO2; "02" sets VIDEO3; "03" sets VIDEO4; "04" sets VIDEO5; "05" sets VIDEO6; "06" sets VIDEO7; "10" sets DVD; "20" sets TAPE(1); "21" sets TAPE2; "22" sets PHONO; "23" sets CD; "24" sets FM; "25" sets AM; "26" sets TUNER; "27" sets MUSIC SERVER; "28" sets INTERNET RADIO; "30" sets MULTI CH; "31" sets XM; "7F" sets OFF; "80" sets SOURCE; "QSTN" gets The Selector Position'

- id: video_output_selector
  label: Video Output Selector
  kind: action
  command: "VOS"
  params:
    - name: params
      type: string
      description: 'Japanese Model Only. "00" sets D4; "01" sets Component; "QSTN" gets The Selector Position'

- id: hdmi_output_wrap
  label: HDMI Output Wrap Up
  kind: action
  command: "HDO"
  params:
    - name: params
      type: string
      description: '"UP" sets HDMI Out Selector Wrap-Around Up'

- id: monitor_resolution_wrap
  label: Monitor Resolution Wrap Up
  kind: action
  command: "RES"
  params:
    - name: params
      type: string
      description: '"UP" sets Monitor Out Resolution Wrap-Around Up'

- id: isf_mode
  label: ISF Mode
  kind: action
  command: "ISF"
  params:
    - name: params
      type: string
      description: '"00" sets ISF Mode Custom; "01" sets ISF Mode Day; "02" sets ISF Mode Night; "UP" sets ISF Mode State Wrap-Around Up; "QSTN" gets The ISF Mode State'

- id: listening_mode_category_wrap
  label: Listening Mode Category Wrap Up
  kind: action
  command: "LMD"
  params:
    - name: params
      type: string
      description: '"MOVIE", "MUSIC", "GAME": sets Listening Mode Wrap-Around Up'

- id: late_night
  label: Late Night
  kind: action
  command: "LTN"
  params:
    - name: params
      type: string
      description: '"00" sets Late Night Off; "01" sets Late Night Low@DolbyDigital, On@Dolby TrueHD; "02" sets Late Night High@DolbyDigital, (On@Dolby TrueHD); "03" sets Late Night Auto@Dolby TrueHD; "UP" sets Late Night State Wrap-Around Up; "QSTN" gets The Late Night Level'

- id: re_eq_academy_cinema_filter
  label: Re-EQ Academy And Cinema Filter
  kind: action
  command: "RAS"
  params:
    - name: params
      type: string
      description: 'Re-EQ/Academy Filter: "00" sets Both Off; "01" sets Re-EQ On; "02" sets Academy On; "UP" sets Re-EQ/Academy State Wrap-Around Up; "QSTN" gets The Re-EQ/Academy State. Re-EQ: "00" sets Re-EQ Off; "01" sets Re-EQ On; "UP" sets Re-EQ State Wrap-Around Up; "QSTN" gets The Re-EQ State. Cinema Filter: "00" sets Cinema Filter Off; "01" sets Cinema Filter On; "UP" sets Cinema Filter State Wrap-Around Up; "QSTN" gets The Cinema Filter State. Model mapping UNRESOLVED.'

- id: audyssey_equalization
  label: Audyssey Equalization
  kind: action
  command: "ADY"
  params:
    - name: params
      type: string
      description: '"00" sets Audyssey 2EQ/MultEQ/MultEQ XT Off; "01" sets Audyssey 2EQ/MultEQ/MultEQ XT On; "UP" sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up; "QSTN" gets The Audyssey 2EQ/MultEQ/MultEQ XT State'

- id: audyssey_dynamic_eq
  label: Audyssey Dynamic EQ
  kind: action
  command: "ADQ"
  params:
    - name: params
      type: string
      description: '"00" sets Audyssey Dynamic EQ Off; "01" sets Audyssey Dynamic EQ On; "UP" sets Audyssey Dynamic EQ State Wrap-Around Up; "QSTN" gets The Audyssey Dynamic EQ State'

- id: audyssey_dynamic_volume
  label: Audyssey Dynamic Volume
  kind: action
  command: "ADV"
  params:
    - name: params
      type: string
      description: '"00" sets Audyssey Dynamic Volume Off; "01" sets Audyssey Dynamic Volume Light; "02" sets Audyssey Dynamic Volume Medium; "03" sets Audyssey Dynamic Volume Heavy; "UP" sets Audyssey Dynamic Volume State Wrap-Around Up; "QSTN" gets The Audyssey Dynamic Volume State'

- id: dolby_volume
  label: Dolby Volume
  kind: action
  command: "DVL"
  params:
    - name: params
      type: string
      description: '"00" sets Dolby Volume Off; "01" sets Dolby Volume Low; "02" sets Dolby Volume Mid; "03" sets Dolby Volume High; "UP" sets Dolby Volume State Wrap-Around Up; "QSTN" gets The Dolby Volume State'

- id: music_optimizer
  label: Music Optimizer
  kind: action
  command: "MOT"
  params:
    - name: params
      type: string
      description: '"00" sets Music Optimizer Off; "01" sets Music Optimizer On; "UP" sets Music Optimizer State Wrap-Around Up; "QSTN" gets The Music Optimizer State'

- id: tuner_tuning
  label: Tuner Tuning
  kind: action
  command: "TUN"
  params:
    - name: params
      type: string
      description: 'Include Tuner Pack Model Only. "nnnnn" sets Directly Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch) put 0 in the first two digits of nnnnn at XM; numeric range UNRESOLVED. "UP" sets Tuning Frequency Wrap-Around Up; "DOWN" sets Tuning Frequency Wrap-Around Down; "QSTN" gets The Tuning Frequency. Also documented for shared Zone2 tuning.'

- id: tuner_preset
  label: Tuner Preset
  kind: action
  command: "PRS"
  params:
    - name: params
      type: string
      description: 'Include Tuner Pack Model Only. "01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E" sets Preset No. 1-30 (In hexadecimal representation); "UP" sets Preset No. Wrap-Around Up; "DOWN" sets Preset No. Wrap-Around Down; "QSTN" gets The Preset No. Also documented for shared Zone2 presets with "01"-"28".'

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "PRM"
  params:
    - name: params
      type: string
      description: 'Include Tuner Pack Model Only. "01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E" sets Preset No. 1-30 (In hexadecimal representation)'

- id: rds_information
  label: RDS Information
  kind: action
  command: "RDS"
  params:
    - name: params
      type: string
      description: 'RDS Model Only. "00" Display RT Information; "01" Display PTY Information; "02" Display TP Information; "UP" Display RDS Information Wrap-Around Change. RDS information Command in RBDS Model, is only available Display RT information.'

- id: pty_scan
  label: PTY Scan
  kind: action
  command: "PTS"
  params:
    - name: params
      type: string
      description: 'RDS Model Only. "00"-"1E" sets PTY No "0-30"(In hexadecimal representation); "ENTER" Finish PTY Scan'

- id: tp_scan
  label: TP Scan
  kind: action
  command: "TPS"
  params:
    - name: params
      type: string
      description: 'RDS Model Only. "" Start TP Scan (When Don''t Have Parameter); "ENTER" Finish TP Scan'

- id: xm_channel_name_query
  label: Query XM Channel Name
  kind: action
  command: "XCN"
  params:
    - name: params
      type: string
      description: 'XM Model Only. "QSTN" gets XM Channel Name'

- id: xm_artist_name_query
  label: Query XM Artist Name
  kind: action
  command: "XAT"
  params:
    - name: params
      type: string
      description: 'XM Model Only. "QSTN" gets XM Artist Name'

- id: xm_title_query
  label: Query XM Title
  kind: action
  command: "XTI"
  params:
    - name: params
      type: string
      description: 'XM Model Only. "QSTN" gets XM Title'

- id: xm_channel_number
  label: XM Channel Number
  kind: action
  command: "XCH"
  params:
    - name: params
      type: string
      description: 'XM Model Only. "000"-"255" XM Channel Number "000-255"; "UP" sets XM Channel Wrap-Around Up; "DOWN" sets XM Channel Wrap-Around Down; "QSTN" gets XM Channel Number'

- id: xm_category
  label: XM Category
  kind: action
  command: "XCT"
  params:
    - name: params
      type: string
      description: 'XM Model Only. "UP" sets XM Category Wrap-Around Up; "DOWN" sets XM Category Wrap-Around Down; "QSTN" gets XM Category'

- id: sirius_channel_name_query
  label: Query SIRIUS Channel Name
  kind: action
  command: "SCN"
  params:
    - name: params
      type: string
      description: 'SIRIUS Model Only. "QSTN" gets SIRIUS Channel Name'

- id: sirius_artist_name_query
  label: Query SIRIUS Artist Name
  kind: action
  command: "SAT"
  params:
    - name: params
      type: string
      description: 'SIRIUS Model Only. "QSTN" gets SIRIUS Artist Name'

- id: sirius_title_query
  label: Query SIRIUS Title
  kind: action
  command: "STI"
  params:
    - name: params
      type: string
      description: 'SIRIUS Model Only. "QSTN" gets SIRIUS Title'

- id: sirius_channel_number
  label: SIRIUS Channel Number
  kind: action
  command: "SCH"
  params:
    - name: params
      type: string
      description: 'SIRIUS Model Only. "000"-"255" SIRIUS Channel Number "000-255"; "UP" sets SIRIUS Channel Wrap-Around Up; "DOWN" sets SIRIUS Channel Wrap-Around Down; "QSTN" gets SIRIUS Channel Number'

- id: sirius_category
  label: SIRIUS Category
  kind: action
  command: "SCT"
  params:
    - name: params
      type: string
      description: 'SIRIUS Model Only. "UP" sets SIRIUS Category Wrap-Around Up; "DOWN" sets SIRIUS Category Wrap-Around Down; "QSTN" gets SIRIUS Category'

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK"
  params:
    - name: params
      type: string
      description: 'SIRIUS Model Only. "nnnn" Lock Password (4 Digits); numeric range UNRESOLVED. INPUT and WRONG are documented display messages; controller transmission direction for those messages is UNRESOLVED.'

- id: hd_radio_artist_name_query
  label: Query HD Radio Artist Name
  kind: action
  command: "HAT"
  params:
    - name: params
      type: string
      description: 'HD Radio Model Only. "QSTN" gets HD Radio Artist Name'

- id: hd_radio_channel_name_query
  label: Query HD Radio Channel Name
  kind: action
  command: "HCN"
  params:
    - name: params
      type: string
      description: 'HD Radio Model Only. "QSTN" gets HD Radio Channel Name'

- id: hd_radio_title_query
  label: Query HD Radio Title
  kind: action
  command: "HTI"
  params:
    - name: params
      type: string
      description: 'HD Radio Model Only. "QSTN" gets HD Radio Title'

- id: hd_radio_detail_query
  label: Query HD Radio Detail
  kind: action
  command: "HDS"
  params:
    - name: params
      type: string
      description: 'HD Radio Model Only. "QSTN" gets HD Radio Title'

- id: hd_radio_channel_program
  label: HD Radio Channel Program
  kind: action
  command: "HPR"
  params:
    - name: params
      type: string
      description: 'HD Radio Model Only. "01"-"08" sets directly HD Radio Channel Program; "QSTN" gets HD Radio Channel Program'

- id: hd_radio_blend_mode
  label: HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: params
      type: string
      description: 'HD Radio Model Only. "00" sets HD Radio Blend Mode "Auto"; "01" sets HD Radio Blend Mode "Analog"; "QSTN" gets the HD Radio Blend Mode Status'

- id: hd_radio_tuner_status_query
  label: Query HD Radio Tuner Status
  kind: action
  command: "HTS"
  params:
    - name: params
      type: string
      description: 'HD Radio Model Only. "QSTN" gets the HD Radio Tuner Status'

- id: net_additional_operations
  label: Additional Network Operations
  kind: action
  command: "NTC"
  params:
    - name: params
      type: string
      description: '"FF" FF KEY (CONTINUOUS*); "REW" REW KEY (CONTINUOUS*); "REPEAT" REPEAT KEY; "RANDOM" RANDOM KEY; "DISPLAY" DISPLAY KEY; "ALBUM" ALBUM KEY; "ARTIST" ARTIST KEY; "GENRE" GENRE KEY; "PLAYLIST" PLAYLIST KEY; "RIGHT" RIGHT KEY; "LEFT" LEFT KEY; "UP" UP KEY; "DOWN" DOWN KEY; "SELECT" SELECT KEY; "0"-"9" 0-9 KEY; "DELETE" DELETE KEY; "CAPS" CAPS KEY; "LOCATION" LOCATION KEY; "LANGUAGE" LANGUAGE KEY; "SETUP" SETUP KEY; "RETURN" RETURN KEY; "CHUP" CH UP(for iRadio); "CHDN" CH DOWN(for iRadio). Zone2 Net-Tune Model Only: "PLAYz" PLAY KEY; "STOPz" STOP KEY; "PAUSEz" PAUSE KEY; "TRUPz" TRACK UP KEY; "TRDNz" TRACK DOWN KEY. FF/REW Net-tune commands must be sent continuously, with no more than 100ms delay between codes.'

- id: internet_radio_preset
  label: Internet Radio Preset
  kind: action
  command: "NPR"
  params:
    - name: params
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation)'

# --- RI Passthrough Operations ---
# These additions represent documented operations for connected RI devices.

- id: ri_cd_player_operation
  label: RI CD Player Operation
  kind: action
  command: "CCD"
  params:
    - name: params
      type: string
      description: '"POWER" POWER ON/OFF; "TRACK" TRACK+; "PLAY" PLAY; "STOP" STOP; "PAUSE" PAUSE; "SKIP.F" >>I; "SKIP.R" I<<; "MEMORY" MEMORY; "CLEAR" CLEAR; "REPEAT" REPEAT; "RANDOM" RANDOM; "DISP" DISPLAY; "D.MODE" D.MODE; "FF" FF >>; "REW" REW <<; "OP/CL" OPEN/CLOSE; "0"-"10" 0-10; "+10" +10; "D.SKIP" DISC +; "DISC.F" DISC +; "DISC.R" DISC-; "DISC1"-"DISC6" DISC1-DISC6; "STBY" STANDBY; "PON" POWER ON'

- id: ri_tape1_operation
  label: RI Tape 1 Operation
  kind: action
  command: "CT1"
  params:
    - name: params
      type: string
      description: 'TAPE1(A). "PLAY.F" PLAY >; "PLAY.R" PLAY <; "STOP" STOP; "RC/PAU" REC/PAUSE; "FF" FF >>; "REW" REW <<'

- id: ri_tape2_operation
  label: RI Tape 2 Operation
  kind: action
  command: "CT2"
  params:
    - name: params
      type: string
      description: 'TAPE2(B). "PLAY.F" PLAY >; "PLAY.R" PLAY <; "STOP" STOP; "RC/PAU" REC/PAUSE; "FF" FF >>; "REW" REW <<; "OP/CL" OPEN/CLOSE; "SKIP.F" >>I; "SKIP.R" I<<; "REC" REC'

- id: ri_graphics_equalizer_operation
  label: RI Graphics Equalizer Operation
  kind: action
  command: "CEQ"
  params:
    - name: params
      type: string
      description: '"POWER" POWER ON/OFF; "PRESET" PRESET'

- id: ri_dat_recorder_operation
  label: RI DAT Recorder Operation
  kind: action
  command: "CDT"
  params:
    - name: params
      type: string
      description: '"PLAY" PLAY; "RC/PAU" REC/PAUSE; "STOP" STOP; "SKIP.F" >>I; "SKIP.R" I<<; "FF" FF >>; "REW" REW <<'

- id: ri_dvd_player_operation
  label: RI DVD Player Operation
  kind: action
  command: "CDV"
  params:
    - name: params
      type: string
      description: '"POWER" POWER ON/OFF; "PWRON" POWER ON; "PWROFF" POWER OFF; "PLAY" PLAY; "STOP" STOP; "SKIP.F" >>I; "SKIP.R" I<<; "FF" FF >>; "REW" REW <<; "PAUSE" PAUSE; "LASTPLAY" LAST PLAY; "SUBTON/OFF" SUBTITLE ON/OFF; "SUBTITLE" SUBTITLE; "SETUP" SETUP; "TOPMENU" TOPMENU; "MENU" MENU; "UP" UP; "DOWN" DOWN; "LEFT" LEFT; "RIGHT" RIGHT; "ENTER" ENTER; "RETURN" RETURN; "DISC.F" DISC +; "DISC.R" DISC-; "AUDIO" AUDIO; "RANDOM" RANDOM; "OP/CL" OPEN/CLOSE; "ANGLE" ANGLE; "0"-"10" 0-10; "SEARCH" SEARCH; "DISP" DISPLAY; "REPEAT" REPEAT; "MEMORY" MEMORY; "CLEAR" CLEAR; "ABR" A-B REPEAT; "STEP.F" STEP; "STEP.R" STEP BACK; "SLOW.F" SLOW; "SLOW.R" SLOW BACK; "ZOOMTG" ZOOM; "ZOOMUP" ZOOM UP; "ZOOMDN" ZOOM DOWN; "PROGRE" PROGRESSIVE; "VDOFF" VIDEO ON/OFF; "CONMEM" CONDITION MEMORY; "FUNMEM" FUNCTION MEMORY; "DISC1"-"DISC6" DISC1-DISC6; "FOLDUP" FOLDER UP; "FOLDDN" FOLDER DOWN; "P.MODE" PLAY MODE; "ASCTG" ASPECT(Toggle); "CDPCD" CD CHAIN REPEAT; "MSPUP" MULTI SPEED UP; "MSPDN" MULTI SPEED DOWN; "PCT" PICTURE CONTROL; "RSCTG" RESOLUTION(Toggle); "INIT" Return to Factory Settings'

- id: ri_md_recorder_operation
  label: RI MD Recorder Operation
  kind: action
  command: "CMD"
  params:
    - name: params
      type: string
      description: '"POWER" POWER ON/OFF; "PLAY" PLAY; "STOP" STOP; "FF" FF >>; "REW" REW <<; "P.MODE" PLAY MODE; "SKIP.F" >>I; "SKIP.R" I<<; "PAUSE" PAUSE; "REC" REC; "MEMORY" MEMORY; "DISP" DISPLAY; "SCROLL" SCROLL; "M.SCAN" MUSIC SCAN; "CLEAR" CLEAR; "RANDOM" RANDOM; "REPEAT" REPEAT; "ENTER" ENTER; "EJECT" EJECT; "0"-"10/0" 0-10/0; "nn/nnn" --/--- (numeric range UNRESOLVED); "NAME" NAME; "GROUP" GROUP; "STBY" STANDBY'

- id: ri_cd_r_recorder_operation
  label: RI CD-R Recorder Operation
  kind: action
  command: "CCR"
  params:
    - name: params
      type: string
      description: '"POWER" POWER ON/OFF; "P.MODE" PLAY MODE; "PLAY" PLAY; "STOP" STOP; "SKIP.F" >>I; "SKIP.R" I<<; "PAUSE" PAUSE; "REC" REC; "CLEAR" CLEAR; "REPEAT" REPEAT; "0"-"10/0" 0-10/0; "nn/nnn" --/--- (numeric range UNRESOLVED); "SCROLL" SCROLL; "OP/CL" OPEN/CLOSE; "DISP" DISPLAY; "RANDOM" RANDOM; "MEMORY" MEMORY; "FF" FF; "REW" REW; "STBY" STANDBY'

# --- Additional Zone 2 Commands ---
- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "ZMT"
  params:
    - name: params
      type: string
      description: '"TG" sets Zone2 Muting Wrap-Around'

- id: zone2_tone
  label: Zone 2 Tone
  kind: action
  command: "ZTN"
  params:
    - name: params
      type: string
      description: '"Bxx" sets Zone2 Bass; "Txx" sets Zone2 Treble; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Bass Up (2 Step); "BDOWN" sets Bass Down(2 Step); "TUP" sets Treble Up (2 Step); "TDOWN" sets Treble Down(2 Step); "QSTN" gets Zone2 Tone("BxxTxx"). Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_balance
  label: Zone 2 Balance
  kind: action
  command: "ZBL"
  params:
    - name: params
      type: string
      description: '"xx" sets Zone2 Balance(xx is "-A"..."00"..."+A"[-10...0...+10 2 step]); "UP" sets Balance Up (to R 2 Step); "DOWN" sets Balance Down(to L 2 Step); "QSTN" gets Zone2 Balance. Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_tuning
  label: Zone 2 Tuning
  kind: action
  command: "TUZ"
  params:
    - name: params
      type: string
      description: '"nnnnn" sets Directly Tuning Frequency (numeric range UNRESOLVED); "UP" sets Tuning Frequency Wrap-Around Up; "DOWN" sets Tuning Frequency Wrap-Around Down; "QSTN" gets The Tuning Frequency. The TUNER function is shared by the MAIN and ZONE side. But control is separated.'

- id: zone2_preset
  label: Zone 2 Preset
  kind: action
  command: "PRZ"
  params:
    - name: params
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "UP" sets Preset No. Wrap-Around Up; "DOWN" sets Preset No. Wrap-Around Down; "QSTN" gets The Preset No.'

- id: zone2_network_operation
  label: Zone 2 Network Operation
  kind: action
  command: "NTZ"
  params:
    - name: params
      type: string
      description: 'Network Model Only. "PLAY" PLAY KEY; "STOP" STOP KEY; "PAUSE" PAUSE KEY; "TRUP" TRACK UP KEY; "TRDN" TRACK DOWN KEY; "CHUP" CH UP(for iRadio); "CHDN" CH DOWN(for iRadio)'

- id: zone2_internet_radio_preset
  label: Zone 2 Internet Radio Preset
  kind: action
  command: "NPZ"
  params:
    - name: params
      type: string
      description: 'Network Model Only. "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)'

- id: zone2_listening_mode
  label: Zone 2 Listening Mode
  kind: action
  command: "LMZ"
  params:
    - name: params
      type: string
      description: '"00" sets STEREO; "01" sets DIRECT; "0F" sets MONO; "12" sets MULTIPLEX; "87" sets DVS(Pl2); "88" sets DVS(NEO6)'

- id: zone2_late_night
  label: Zone 2 Late Night
  kind: action
  command: "LTZ"
  params:
    - name: params
      type: string
      description: '"00" sets Late Night Off; "01" sets Late Night Low; "02" sets Late Night High; "UP" sets Late Night State Wrap-Around Up; "QSTN" gets The Late Night Level'

- id: zone2_re_eq_academy_filter
  label: Zone 2 Re-EQ Academy Filter
  kind: action
  command: "RAZ"
  params:
    - name: params
      type: string
      description: '"00" sets Both Off; "01" sets Re-EQ On; "02" sets Academy On; "UP" sets Re-EQ/Academy State Wrap-Around Up; "QSTN" gets The Re-EQ/Academy State'

# --- Additional Zone 3 Commands ---
- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  command: "MT3"
  params:
    - name: params
      type: string
      description: '"TG" sets Zone3 Muting Wrap-Around'

- id: zone3_volume_adjust
  label: Adjust Zone 3 Volume
  kind: action
  command: "VL3"
  params:
    - name: params
      type: string
      description: '"UP" sets Volume Level Up; "DOWN" sets Volume Level Down'

- id: zone3_tone
  label: Zone 3 Tone
  kind: action
  command: "TN3"
  params:
    - name: params
      type: string
      description: '"Bxx" Zone3 Bass; "Txx" Zone3 Treble; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "BUP" sets Bass Up (2 Step); "BDOWN" sets Bass Down (2 Step); "TUP" sets Treble Up (2 Step); "TDOWN" sets Treble Down (2 Step); "QSTN" gets Zone3 Tone ("BxxTxx")'

- id: zone3_balance
  label: Zone 3 Balance
  kind: action
  command: "BL3"
  params:
    - name: params
      type: string
      description: '"xx" Zone3 Balance (xx is"-A"..."00"..."+A"[-10...0...+10 2 step]); "UP" sets Balance Up (to R 2 Step); "DOWN" sets Balance Down (to L 2 Step); "QSTN" gets Zone3 Balance'

- id: zone3_tuning
  label: Zone 3 Tuning
  kind: action
  command: "TU3"
  params:
    - name: params
      type: string
      description: '"nnnnn" sets Directly Tuning Frequency (numeric range UNRESOLVED); "UP" sets Tuning Frequency Wrap-Around Up; "DOWN" sets Tuning Frequency Wrap-Around Down; "QSTN" gets The Tuning Frequency. The TUNER function is shared by the MAIN and ZONE side. But control is separated.'

- id: zone3_preset
  label: Zone 3 Preset
  kind: action
  command: "PR3"
  params:
    - name: params
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "UP" sets Preset No. Wrap-Around Up; "DOWN" sets Preset No. Wrap-Around Down; "QSTN" gets The Preset No.'

- id: zone3_network_operation
  label: Zone 3 Network Operation
  kind: action
  command: "NT3"
  params:
    - name: params
      type: string
      description: 'Network Model Only. "PLAY" PLAY KEY; "STOP" STOP KEY; "PAUSE" PAUSE KEY; "TRUP" TRACK UP KEY; "TRDN" TRACK DOWN KEY; "CHUP" CH UP(for iRadio); "CHDN" CH DOWN(for iRadio)'

- id: zone3_internet_radio_preset
  label: Zone 3 Internet Radio Preset
  kind: action
  command: "NP3"
  params:
    - name: params
      type: string
      description: 'Network Model Only. "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)'

# --- Additional Zone 4 Commands ---
- id: zone4_mute_control
  label: Zone 4 Mute Control
  kind: action
  command: "MT4"
  params:
    - name: params
      type: string
      description: '"00" sets Zone4 Muting Off; "01" sets Zone4 Muting On; "TG" sets Zone4 Muting Wrap-Around'

- id: zone4_volume_adjust
  label: Adjust Zone 4 Volume
  kind: action
  command: "VL4"
  params:
    - name: params
      type: string
      description: '"UP" sets Volume Level Up; "DOWN" sets Volume Level Down'

- id: zone4_tuning
  label: Zone 4 Tuning
  kind: action
  command: "TU4"
  params:
    - name: params
      type: string
      description: '"nnnnn" sets Directly Tuning Frequency (numeric range UNRESOLVED); "UP" sets Tuning Frequency Wrap-Around Up; "DOWN" sets Tuning Frequency Wrap-Around Down; "QSTN" gets The Tuning Frequency. The TUNER function is shared by the MAIN and ZONE side. But control is separated.'

- id: zone4_preset
  label: Zone 4 Preset
  kind: action
  command: "PR4"
  params:
    - name: params
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "UP" sets Preset No. Wrap-Around Up; "DOWN" sets Preset No. Wrap-Around Down; "QSTN" gets The Preset No.'

- id: zone4_network_operation
  label: Zone 4 Network Operation
  kind: action
  command: "NT4"
  params:
    - name: params
      type: string
      description: 'Network Model Only. "PLAY" PLAY KEY; "STOP" STOP KEY; "PAUSE" PAUSE KEY; "TRUP" TRACK UP KEY; "TRDN" TRACK DOWN KEY'

- id: zone4_internet_radio_preset
  label: Zone 4 Internet Radio Preset
  kind: action
  command: "NP4"
  params:
    - name: params
      type: string
      description: 'Network Model Only. "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)'

- id: ri_docking_station_operation
  label: RI Docking Station Operation
  kind: action
  command: "CDS"
  params:
    - name: params
      type: string
      description: '"PWRON" sets Dock On; "PWROFF" sets Dock Standby; "PLY/RES" PLAY/RESUME Key; "STOP" STOP Key; "SKIP.F" TRACK UP Key; "SKIP.R" TRACK DOWN Key; "PAUSE" PAUSE Key; "PLY/PAU" PLAY/PAUSE Key; "FF" FF Key; "REW" FR Key; "ALBUM+" ALBUM UP Key; "ALBUM-" ALBUM DOWN Key; "PLIST+" PLAYLIST UP Key; "PLIST-" PLAYLIST DOWN Key; "CHAPT+" CHAPTER UP Key; "CHAPT-" CHAPTER DOWN Key; "RANDOM" SHUFFLE Key; "REPEAT" REPEAT Key; "MUTE" MUTE Key; "BLIGHT" BACKLIGHT Key; "MENU" MENU Key; "ENTER" SELECT Key; "UP" CURSOR UP Key; "DOWN" CURSOR DOWN Key'
```

## Feedbacks
```yaml
# --- Power State ---
- id: power_state
  label: System Power Status
  type: enum
  command: "PWRQSTN"
  query_command: "PWRQSTN"
  values: [standby, on]

# --- Mute State ---
- id: mute_state
  label: Audio Muting State
  type: enum
  command: "AMTQSTN"
  query_command: "AMTQSTN"
  values: [off, on]

# --- Volume Level ---
- id: volume_level
  label: Master Volume Level
  type: string
  command: "MVLQSTN"
  query_command: "MVLQSTN"
  description: "Returns hex value 00-64 (0-100) or 00-50 (0-80) depending on model"

# --- Input Selector ---
- id: input_state
  label: Input Selector Position
  type: string
  command: "SLIQSTN"
  query_command: "SLIQSTN"
  description: "Returns current input code (e.g. 03, 10, 23, 27, etc.)"

# --- Audio Selector ---
- id: audio_selector_state
  label: Audio Selector Status
  type: string
  command: "SLAQSTN"
  query_command: "SLAQSTN"
  description: "Returns current audio input mode code"

# --- Listening Mode ---
- id: listening_mode_state
  label: Listening Mode
  type: string
  command: "LMDQSTN"
  query_command: "LMDQSTN"
  description: "Returns current listening mode code in hex"

# --- Speaker State ---
- id: speaker_a_state
  label: Speaker A State
  type: enum
  command: "SPAQSTN"
  query_command: "SPAQSTN"
  values: [off, on]

- id: speaker_b_state
  label: Speaker B State
  type: enum
  command: "SPBQSTN"
  query_command: "SPBQSTN"
  values: [off, on]

# --- Tone ---
- id: tone_front
  label: Front Tone
  type: string
  command: "TFRQSTN"
  query_command: "TFRQSTN"
  description: "Returns BxxTxx format where xx is hex -A to +A"

# --- Dimmer Level ---
- id: dimmer_level
  label: Dimmer Level
  type: enum
  command: "DIMQSTN"
  query_command: "DIMQSTN"
  values: [bright, dim, dark, shut_off]

# --- Sleep Timer ---
- id: sleep_time
  label: Sleep Time
  type: string
  command: "SLPQSTN"
  query_command: "SLPQSTN"
  description: "Returns hex 01-5A (1-90 min) or OFF"

# --- HDMI Output ---
- id: hdmi_output_state
  label: HDMI Output Selector
  type: string
  command: "HDOQSTN"
  query_command: "HDOQSTN"
  description: "Returns HDMI output mode code"

# --- Monitor Resolution ---
- id: monitor_resolution_state
  label: Monitor Out Resolution
  type: string
  command: "RESQSTN"
  query_command: "RESQSTN"
  description: "Returns resolution code"

# --- Net/USB Status ---
- id: net_play_status
  label: Net/USB Play Status
  type: string
  command: "NSTQSTN"
  query_command: "NSTQSTN"
  description: "3-character string: play status (S=Stop, P=Play, p=Pause, F=FF, R=FR), repeat status, shuffle status"

- id: net_artist
  label: Net/USB Artist Name
  type: string
  command: "NATQSTN"
  query_command: "NATQSTN"
  description: "Up to 64 ASCII characters"

- id: net_album
  label: Net/USB Album Name
  type: string
  command: "NALQSTN"
  query_command: "NALQSTN"
  description: "Up to 64 ASCII characters"

- id: net_title
  label: Net/USB Title Name
  type: string
  command: "NTIQSTN"
  query_command: "NTIQSTN"
  description: "Up to 64 ASCII characters"

- id: net_time
  label: Net/USB Time Info
  type: string
  command: "NTMQSTN"
  query_command: "NTMQSTN"
  description: "mm:ss/mm:ss (elapsed/track time)"

- id: net_track
  label: Net/USB Track Info
  type: string
  command: "NTRQSTN"
  query_command: "NTRQSTN"
  description: "cccc/tttt (current/total track)"

# --- Zone 2 ---
- id: zone2_power_state
  label: Zone 2 Power Status
  type: enum
  command: "ZPWQSTN"
  query_command: "ZPWQSTN"
  values: [standby, on]

- id: zone2_mute_state
  label: Zone 2 Muting Status
  type: enum
  command: "ZMTQSTN"
  query_command: "ZMTQSTN"
  values: [off, on]

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  command: "ZVLQSTN"
  query_command: "ZVLQSTN"

- id: zone2_input_state
  label: Zone 2 Selector Position
  type: string
  command: "SLZQSTN"
  query_command: "SLZQSTN"

# --- Zone 3 ---
- id: zone3_power_state
  label: Zone 3 Power Status
  type: enum
  command: "PW3QSTN"
  query_command: "PW3QSTN"
  values: [standby, on]

- id: zone3_mute_state
  label: Zone 3 Muting Status
  type: enum
  command: "MT3QSTN"
  query_command: "MT3QSTN"
  values: [off, on]

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  command: "VL3QSTN"
  query_command: "VL3QSTN"

- id: zone3_input_state
  label: Zone 3 Selector Position
  type: string
  command: "SL3QSTN"
  query_command: "SL3QSTN"

# --- Zone 4 ---
- id: zone4_power_state
  label: Zone 4 Power Status
  type: enum
  command: "PW4QSTN"
  query_command: "PW4QSTN"
  values: [standby, on]

- id: zone4_mute_state
  label: Zone 4 Muting Status
  type: enum
  command: "MT4QSTN"
  query_command: "MT4QSTN"
  values: [off, on]

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  command: "VL4QSTN"
  query_command: "VL4QSTN"

- id: zone4_input_state
  label: Zone 4 Selector Position
  type: string
  command: "SL4QSTN"
  query_command: "SL4QSTN"
```

## Variables
```yaml
# All settable parameters are represented as actions with command codes above.
# Volume, tone, sleep timer, etc. accept direct set values within their command structure.
# No separate variable abstraction is needed beyond the action parameterization.
```

## Events
```yaml
# The receiver sends unsolicited "Event Notice" status messages when state changes.
# These use the same format as query responses (e.g. "SLI03" when input changes).
# Only one TCP client connection is supported at a time.
# Connection must be held continuously to receive notifications.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Zone 2 volume/tone controls only work when main power is ON and Zone 2 is powered
  - 12V triggers only available when each trigger parameter is set to OFF in the Setup Menu
  - Zone 3/4 tuner function is shared with main zone but control is separated
# UNRESOLVED: no explicit safety warnings or power-on sequencing requirements found in source
```

## Notes
- ISCP commands consist of a start character `!`, unit type character `1` (for receivers), three-character command code, and parameter characters.
- Over RS-232, messages are terminated with `[CR]`, `[LF]`, or `[CR][LF]`. Over eISCP (TCP), messages are terminated with `[EOF]` (0x1A), optionally followed by `[CR][LF]`.
- eISCP packets include a 16-byte header: magic `ISCP`, header size (0x00000010 big-endian), data size (big-endian), version (0x01), and reserved bytes.
- Minimum 50ms interval between received messages.
- Only one concurrent TCP connection supported.
- Volume levels use hexadecimal representation (e.g., `0x64` = 100 decimal).
- Many commands are model-dependent (XM, SIRIUS, HD Radio, RDS features vary by model).
- FF/REW Net-Tune commands must be sent continuously with no more than 100ms delay between codes.
- Protocol document version 1.15, dated 31 August 2009.

<!-- UNRESOLVED: specific DTM models covered by this protocol doc not enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact eISCP header byte offsets not fully documented for binary parsing -->
<!-- UNRESOLVED: maximum command string length not stated -->
<!-- UNRESOLVED: error response format not documented -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T21:08:22.830Z
last_checked_at: 2026-10-07T21:08:22.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:08:22.830Z
matched_actions: 187
action_count: 187
confidence: medium
summary: "All 187 action units match source ISCP command codes with correct shapes and supported transport. Source is a generic Integra receiver guide that never names the DTM series. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) are passthrough"
- "no explicit multi-step macro sequences described in source"
- "no explicit safety warnings or power-on sequencing requirements found in source"
- "specific DTM models covered by this protocol doc not enumerated"
- "firmware version compatibility not stated"
- "exact eISCP header byte offsets not fully documented for binary parsing"
- "maximum command string length not stated"
- "error response format not documented"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
