---
spec_id: admin/integra-dhc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DHC Series Control Spec"
manufacturer: Integra
model_family: "DHC Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DHC Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T20:33:41.268Z
last_checked_at: 2026-10-07T20:33:41.268Z
generated_at: 2026-10-07T20:33:41.268Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact DHC model numbers not enumerated in source"
  - "firmware version compatibility not stated"
  - "no explicit macro sequences defined in source"
  - "power-on sequencing requirements not stated in source"
  - "exact DHC sub-models covered by this protocol version not stated"
  - "maximum volume range per specific DHC model not stated"
  - "tone command hex encoding for negative/positive values not fully specified"
  - "RI system commands (CCD, CT1, CT2, CDV, CMD, CCR, CDS) control external devices, not the receiver itself"
  - "XM/SIRIUS/HD Radio commands are model-specific, not available on all DHC units"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:33:41.268Z
  matched_actions: 178
  action_count: 178
  confidence: medium
  summary: "All 178 action units match source ISCP codes and parameters, transport matches (60128, 9600 8N1), and the source catalogue is fully represented. Source is a generic Integra receiver guide that does not name DHC. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra DHC Series Control Spec

## Summary
The Integra DHC Series are AV receivers/pre-processors controllable via ISCP (Integra Serial Control Protocol) over RS-232C or TCP/IP (eISCP). The protocol uses three-character command codes with variable-length parameters. This spec covers ISCP Version 1.15 (2009-08-31), including power, volume, input selection, listening modes, zone control (2/3/4), tuner, network/USB playback, and RI-linked device control.

<!-- UNRESOLVED: exact DHC model numbers not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

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
- powerable     # PWR command for power on/standby
- routable      # SLI input selector, SLR RECOUT selector, zone selectors
- queryable     # QSTN suffix on most commands returns current state
- levelable     # MVL master volume, tone controls, balance, subwoofer level
- muteable      # AMT audio muting command
- zoned         # Zone 2/3/4 independent power, volume, selector commands
```

## Actions
```yaml
# === System Power ===
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
  label: Mute On
  kind: action
  command: "AMT01"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "AMT00"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "AMTTG"
  params: []

# === Master Volume ===
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

# === Input Selection ===
- id: select_input
  label: Select Input
  kind: action
  command: "SLI{input}"
  params:
    - name: input
      type: enum
      description: "Input code: 00=VCR/DVR, 01=CBL/SAT, 02=GAME/TV, 03=AUX1, 04=AUX2, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB/Front, 2A=USB/Rear, 30=MULTI CH, 31=XM, 32=SIRIUS, 40=Universal PORT"
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
        - "06"
        - "10"
        - "20"
        - "21"
        - "22"
        - "23"
        - "24"
        - "25"
        - "26"
        - "27"
        - "28"
        - "29"
        - "2A"
        - "30"
        - "31"
        - "32"
        - "40"

- id: input_up
  label: Input Selector Up
  kind: action
  command: "SLIUP"
  params: []

- id: input_down
  label: Input Selector Down
  kind: action
  command: "SLIDOWN"
  params: []

# === Listening Mode ===
- id: set_listening_mode
  label: Set Listening Mode
  kind: action
  command: "LMD{mode}"
  params:
    - name: mode
      type: enum
      description: "Listening mode code (hex). Key values: 00=STEREO, 01=DIRECT, 02=SURROUND, 11=PURE AUDIO, 0F=MONO, 0C=ALL CH STEREO, 40=5.1ch/Straight Decode, 80=PLII Movie, 81=PLII Music, 82=Neo:6 Cinema, 83=Neo:6 Music"
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
        - "06"
        - "07"
        - "08"
        - "09"
        - "0A"
        - "0B"
        - "0C"
        - "0D"
        - "0E"
        - "0F"
        - "11"
        - "12"
        - "13"
        - "14"
        - "15"
        - "16"
        - "40"
        - "41"
        - "42"
        - "43"
        - "44"
        - "45"
        - "50"
        - "51"
        - "52"
        - "80"
        - "81"
        - "82"
        - "83"
        - "84"
        - "85"
        - "86"
        - "87"
        - "88"
        - "89"
        - "8A"
        - "8B"
        - "8C"
        - "8D"
        - "8E"
        - "8F"
        - "90"
        - "91"
        - "92"
        - "93"
        - "94"
        - "95"
        - "96"
        - "97"
        - "98"
        - "99"
        - "A0"
        - "A1"
        - "A2"
        - "A3"
        - "A4"
        - "A5"
        - "A6"
        - "A7"

# === Audio Selector ===
- id: set_audio_selector
  label: Set Audio Selector
  kind: action
  command: "SLA{mode}"
  params:
    - name: mode
      type: enum
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
        - "06"

# === Speaker Control ===
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

# === Dimmer ===
- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  command: "DIM{level}"
  params:
    - name: level
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "08"
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"

# === Sleep Timer ===
- id: set_sleep
  label: Set Sleep Timer
  kind: action
  command: "SLP{time}"
  params:
    - name: time
      type: string
      description: "01-5A hex for 1-90 minutes, or OFF"

# === HDMI Output ===
- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: "HDO{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
      description: "00=No Analog, 01=Out Main, 02=Out Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"

# === Monitor Out Resolution ===
- id: set_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "RES{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"
        - "01"
        - "02"
        - "03"
        - "04"
        - "05"
        - "06"
        - "07"
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs"

# === 12V Trigger ===
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

# === Network/USB Transport ===
- id: net_play
  label: Network/USB Play
  kind: action
  command: "NTCPLAY"
  params: []

- id: net_stop
  label: Network/USB Stop
  kind: action
  command: "NTCSTOP"
  params: []

- id: net_pause
  label: Network/USB Pause
  kind: action
  command: "NTCPAUSE"
  params: []

- id: net_track_up
  label: Network/USB Track Up
  kind: action
  command: "NTCTRUP"
  params: []

- id: net_track_down
  label: Network/USB Track Down
  kind: action
  command: "NTCTRDN"
  params: []

# === Zone 2 ===
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "ZPW01"
  params: []

- id: zone2_power_off
  label: Zone 2 Standby
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
      description: "Volume level in hex (00-64 for 0-100, or 00-50 for 0-80)"

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: "SLZ{input}"
  params:
    - name: input
      type: string
      description: "Input code (same coding as SLI, subset available)"

# === Zone 3 ===
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "PW301"
  params: []

- id: zone3_power_off
  label: Zone 3 Standby
  kind: action
  command: "PW300"
  params: []

- id: zone3_volume_set
  label: Zone 3 Set Volume
  kind: action
  command: "VL3{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex"

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "SL3{input}"
  params:
    - name: input
      type: string
      description: "Input code (same coding as SLI)"

# === Zone 4 ===
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "PW401"
  params: []

- id: zone4_power_off
  label: Zone 4 Standby
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
      description: "Volume level in hex"

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "SL4{input}"
  params:
    - name: input
      type: string
      description: "Input code (same coding as SLI)"

# === OSD Navigation ===
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

# === Audyssey ===
- id: set_audyssey_eq
  label: Set Audyssey EQ
  kind: action
  command: "ADY{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_audyssey_dynamic_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "ADQ{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_audyssey_dynamic_volume
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "ADV{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

# === Additional Documented Commands ===
# For the appended entries, command is the literal three-character source token.
# Append the code parameter directly to command, without whitespace.
# In parameter patterns, replace xx or n placeholders with the documented value.

- id: speaker_a_toggle
  label: Speaker A Toggle
  kind: action
  command: "SPA"
  params:
    - name: code
      type: enum
      values: ["UP"]
      description: "sets Speaker Switch Wrap-Around"

- id: speaker_b_toggle
  label: Speaker B Toggle
  kind: action
  command: "SPB"
  params:
    - name: code
      type: enum
      values: ["UP"]
      description: "sets Speaker Switch Wrap-Around"

- id: speaker_layout
  label: Speaker Layout
  kind: action
  command: "SPL"
  params:
    - name: code
      type: enum
      values: ["SB", "FH", "FW", "UP", "QSTN"]
      description: "SB=SurrBack Speaker; FH=Front High Speaker / SurrBack+Front High Speakers; FW=Front Wide Speaker / SurrBack+Front Wide Speakers; UP=Wrap-Around; QSTN=gets the Speaker State"

- id: front_tone
  label: Front Tone
  kind: action
  command: "TFR"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Front Tone ("BxxTxx")'

- id: front_wide_tone
  label: Front Wide Tone
  kind: action
  command: "TFW"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Front Wide Tone ("BxxTxx")'

- id: front_high_tone
  label: Front High Tone
  kind: action
  command: "TFH"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Front High Tone ("BxxTxx")'

- id: center_tone
  label: Center Tone
  kind: action
  command: "TCT"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Center Tone ("BxxTxx")'

- id: surround_tone
  label: Surround Tone
  kind: action
  command: "TSR"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Surround Tone ("BxxTxx")'

- id: surround_back_tone
  label: Surround Back Tone
  kind: action
  command: "TSB"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Surround Back Tone ("BxxTxx")'

- id: subwoofer_tone
  label: Subwoofer Tone
  kind: action
  command: "TSW"
  params:
    - name: code
      type: string
      description: 'Bxx, BUP, BDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Subwoofer Tone ("BxxTxx")'

- id: sleep_cycle
  label: Sleep Timer Cycle
  kind: action
  command: "SLP"
  params:
    - name: code
      type: enum
      values: ["UP"]
      description: "sets Sleep Time Wrap-Around UP"

- id: speaker_level_calibration
  label: Speaker Level Calibration
  kind: action
  command: "SLC"
  params:
    - name: code
      type: enum
      values: ["TEST", "CHSEL", "UP", "DOWN"]
      description: "TEST=TEST Key; CHSEL=CH SEL Key; UP=LEVEL + Key; DOWN=LEVEL–KEY"

- id: subwoofer_level_control
  label: Subwoofer Level Control
  kind: action
  command: "SWL"
  params:
    - name: code
      type: string
      description: '"-F"-"00"-"+C": sets Subwoofer Level -15dB-0dB-+12dB; UP=LEVEL + Key; DOWN=LEVEL–KEY; QSTN=gets the Subwoofer Level'

- id: center_level_control
  label: Center Level Control
  kind: action
  command: "CTL"
  params:
    - name: code
      type: string
      description: '"-C"-"00"-"+C": sets Center Level -12dB-0dB-+12dB; UP=LEVEL + Key; DOWN=LEVEL–KEY; QSTN=gets the Center Level'

- id: display_control
  label: Display Control
  kind: action
  command: "DIF"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "04", "TG"]
      description: "Display Information: 00=Program Format, 01=Digital Input Position, 02=Digital Format Position, 03=Bass Level, 04=Treble Level. Display Mode: 00=Selector + Volume, 01=Selector + Listening Mode, 02=Digital Format, 03=Video Format, TG=Wrap-Around Up. Interpretation depends on supported command variant."

- id: dimmer_cycle
  label: Dimmer Cycle
  kind: action
  command: "DIM"
  params:
    - name: code
      type: enum
      values: ["DIM"]
      description: "sets Dimmer Level Wrap-Around Up"

- id: osd_additional_keys
  label: OSD Additional Keys
  kind: action
  command: "OSD"
  params:
    - name: code
      type: enum
      values: ["RIGHT", "LEFT", "AUDIO", "VIDEO"]
      description: "RIGHT=Right Key; LEFT=Left Key; AUDIO=Audio Adjust Key; VIDEO=Video Adjust Key"

- id: memory_setup
  label: Memory Setup
  kind: action
  command: "MEM"
  params:
    - name: code
      type: enum
      values: ["STR", "RCL", "LOCK", "UNLK"]
      description: "STR=stores memory; RCL=recalls memory; LOCK=locks memory; UNLK=unlocks memory"

- id: recout_selector
  label: RECOUT Selector
  kind: action
  command: "SLR"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80", "QSTN"]
      description: "00=VIDEO1; 01=VIDEO2; 02=VIDEO3; 03=VIDEO4; 04=VIDEO5; 05=VIDEO6; 06=VIDEO7; 10=DVD; 20=TAPE(1); 21=TAPE2; 22=PHONO; 23=CD; 24=FM; 25=AM; 26=TUNER; 27=MUSIC SERVER; 28=INTERNET RADIO; 30=MULTI CH; 31=XM; 7F=OFF; 80=SOURCE; QSTN=gets The Selector Position"

- id: audio_selector_cycle
  label: Audio Selector Cycle
  kind: action
  command: "SLA"
  params:
    - name: code
      type: enum
      values: ["UP"]
      description: "sets Audio Selector Wrap-Around Up"

- id: video_output_selector
  label: Video Output Selector
  kind: action
  command: "VOS"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
      description: "Japanese Model Only; 00=D4; 01=Component; QSTN=gets The Selector Position"

- id: hdmi_output_cycle
  label: HDMI Output Cycle
  kind: action
  command: "HDO"
  params:
    - name: code
      type: enum
      values: ["UP"]
      description: "sets HDMI Out Selector Wrap-Around Up"

- id: resolution_cycle
  label: Monitor Out Resolution Cycle
  kind: action
  command: "RES"
  params:
    - name: code
      type: enum
      values: ["UP"]
      description: "sets Monitor Out Resolution Wrap-Around Up"

- id: isf_mode
  label: ISF Mode
  kind: action
  command: "ISF"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
      description: "00=Custom; 01=Day; 02=Night; UP=Wrap-Around Up; QSTN=gets The ISF Mode State"

- id: listening_mode_cycle
  label: Listening Mode Cycle
  kind: action
  command: "LMD"
  params:
    - name: code
      type: enum
      values: ["UP", "DOWN", "MOVIE", "MUSIC", "GAME"]
      description: "UP=Wrap-Around Up; DOWN=Wrap-Around Down; MOVIE, MUSIC, GAME=Listening Mode Wrap-Around Up"

- id: late_night
  label: Late Night
  kind: action
  command: "LTN"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "UP", "QSTN"]
      description: "00=Off; 01=Low@DolbyDigital, On@Dolby TrueHD; 02=High@DolbyDigital, (On@Dolby TrueHD); 03=Auto@Dolby TrueHD; UP=Wrap-Around Up; QSTN=gets The Late Night Level"

- id: re_eq_filter
  label: Re-EQ Filter
  kind: action
  command: "RAS"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
      description: "Re-EQ/Academy variant: 00=Both Off, 01=Re-EQ On, 02=Academy On. Re-EQ or Cinema Filter variants: 00=Off, 01=On. UP=Wrap-Around Up; QSTN=gets the supported filter state."

- id: audyssey_eq_cycle_query
  label: Audyssey EQ Cycle Or Query
  kind: action
  command: "ADY"
  params:
    - name: code
      type: enum
      values: ["UP", "QSTN"]
      description: "UP=Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up; QSTN=gets The Audyssey 2EQ/MultEQ/MultEQ XT State"

- id: audyssey_dynamic_eq_cycle_query
  label: Audyssey Dynamic EQ Cycle Or Query
  kind: action
  command: "ADQ"
  params:
    - name: code
      type: enum
      values: ["UP", "QSTN"]
      description: "UP=Audyssey Dynamic EQ State Wrap-Around Up; QSTN=gets The Audyssey Dynamic EQ State"

- id: audyssey_dynamic_volume_cycle_query
  label: Audyssey Dynamic Volume Cycle Or Query
  kind: action
  command: "ADV"
  params:
    - name: code
      type: enum
      values: ["UP", "QSTN"]
      description: "UP=Audyssey Dynamic Volume State Wrap-Around Up; QSTN=gets The Audyssey Dynamic Volume State"

- id: dolby_volume
  label: Dolby Volume
  kind: action
  command: "DVL"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "UP", "QSTN"]
      description: "00=Off; 01=Low; 02=Mid; 03=High; UP=Wrap-Around Up; QSTN=gets The Dolby Volume State"

- id: music_optimizer
  label: Music Optimizer
  kind: action
  command: "MOT"
  params:
    - name: code
      type: enum
      values: ["00", "01", "UP", "QSTN"]
      description: "00=Off; 01=On; UP=Wrap-Around Up; QSTN=gets The Music Optimizer State"

- id: tuner_control
  label: Tuner Control
  kind: action
  command: "TUN"
  params:
    - name: code
      type: string
      description: "Include Tuner Pack Model Only; nnnnn=sets Directly Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch) put 0 in the first two digits of nnnnn at XM; numeric range UNRESOLVED; UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Tuning Frequency. Shared by MAIN and ZONE."

- id: tuner_preset
  label: Tuner Preset
  kind: action
  command: "PRS"
  params:
    - name: code
      type: string
      description: 'Include Tuner Pack Model Only; "01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation); UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Preset No. Shared MAIN/Zone2 command.'

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "PRM"
  params:
    - name: code
      type: string
      description: 'Include Tuner Pack Model Only; "01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation)'

- id: rds_information
  label: RDS Information
  kind: action
  command: "RDS"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "RDS Model Only; 00=Display RT Information; 01=Display PTY Information; 02=Display TP Information; UP=Display RDS Information Wrap-Around Change. RBDS Model supports only Display RT information."

- id: pty_scan
  label: PTY Scan
  kind: action
  command: "PTS"
  params:
    - name: code
      type: string
      description: 'RDS Model Only; "00"-"1E": sets PTY No "0-30"(In hexadecimal representation); ENTER=Finish PTY Scan'

- id: tp_scan
  label: TP Scan
  kind: action
  command: "TPS"
  params:
    - name: code
      type: enum
      values: ["", "ENTER"]
      description: "RDS Model Only; empty parameter=Start TP Scan (When Don't Have Parameter); ENTER=Finish TP Scan"

- id: xm_channel_name_query
  label: XM Channel Name Query
  kind: action
  command: "XCN"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "XM Model Only; gets XM Channel Name"

- id: xm_artist_query
  label: XM Artist Name Query
  kind: action
  command: "XAT"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "XM Model Only; gets XM Artist Name"

- id: xm_title_query
  label: XM Title Query
  kind: action
  command: "XTI"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "XM Model Only; gets XM Title"

- id: xm_channel
  label: XM Channel
  kind: action
  command: "XCH"
  params:
    - name: code
      type: string
      description: 'XM Model Only; "000"-"255": XM Channel Number "000-255"; UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets XM Channel Number'

- id: xm_category
  label: XM Category
  kind: action
  command: "XCT"
  params:
    - name: code
      type: enum
      values: ["UP", "DOWN", "QSTN"]
      description: "XM Model Only; UP=XM Category Wrap-Around Up; DOWN=XM Category Wrap-Around Down; QSTN=gets XM Category"

- id: sirius_channel_name_query
  label: SIRIUS Channel Name Query
  kind: action
  command: "SCN"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "SIRIUS Model Only; gets SIRIUS Channel Name"

- id: sirius_artist_query
  label: SIRIUS Artist Name Query
  kind: action
  command: "SAT"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "SIRIUS Model Only; gets SIRIUS Artist Name"

- id: sirius_title_query
  label: SIRIUS Title Query
  kind: action
  command: "STI"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "SIRIUS Model Only; gets SIRIUS Title"

- id: sirius_channel
  label: SIRIUS Channel
  kind: action
  command: "SCH"
  params:
    - name: code
      type: string
      description: 'SIRIUS Model Only; "000"-"255": SIRIUS Channel Number "000-255"; UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets SIRIUS Channel Number'

- id: sirius_category
  label: SIRIUS Category
  kind: action
  command: "SCT"
  params:
    - name: code
      type: enum
      values: ["UP", "DOWN", "QSTN"]
      description: "SIRIUS Model Only; UP=SIRIUS Category Wrap-Around Up; DOWN=SIRIUS Category Wrap-Around Down; QSTN=gets SIRIUS Category"

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK"
  params:
    - name: code
      type: string
      description: 'SIRIUS Model Only; nnnn=Lock Password (4 Digits); numeric range UNRESOLVED; INPUT=displays "Please input the Lock password"; WRONG=displays "The Lock password is wrong"'

- id: hd_radio_artist_query
  label: HD Radio Artist Name Query
  kind: action
  command: "HAT"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "HD Radio Model Only; gets HD Radio Artist Name (variable-length, 64 digits max)"

- id: hd_radio_channel_name_query
  label: HD Radio Channel Name Query
  kind: action
  command: "HCN"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "HD Radio Model Only; gets HD Radio Channel Name (Station Name) (7 digits)"

- id: hd_radio_title_query
  label: HD Radio Title Query
  kind: action
  command: "HTI"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "HD Radio Model Only; gets HD Radio Title (variable-length, 64 digits max)"

- id: hd_radio_detail_query
  label: HD Radio Detail Query
  kind: action
  command: "HDS"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: "HD Radio Model Only; source labels this Detail Info and documents QSTN as gets HD Radio Title"

- id: hd_radio_program
  label: HD Radio Channel Program
  kind: action
  command: "HPR"
  params:
    - name: code
      type: string
      description: 'HD Radio Model Only; "01"-"08": sets directly HD Radio Channel Program; QSTN=gets HD Radio Channel Program'

- id: hd_radio_blend
  label: HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
      description: "HD Radio Model Only; 00=Auto; 01=Analog; QSTN=gets the HD Radio Blend Mode Status"

- id: hd_radio_status_query
  label: HD Radio Tuner Status Query
  kind: action
  command: "HTS"
  params:
    - name: code
      type: enum
      values: ["QSTN"]
      description: 'HD Radio Model Only; gets the HD Radio Tuner Status: mmnnoo (3 bytes); mm="00" not HD, "01" HD; nn=current Program "01"-"08"; oo=receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.)'

- id: net_additional_operations
  label: Network Additional Operations
  kind: action
  command: "NTC"
  params:
    - name: code
      type: string
      description: 'FF, REW, REPEAT, RANDOM, DISPLAY, ALBUM, ARTIST, GENRE, PLAYLIST, RIGHT, LEFT, UP, DOWN, SELECT, "0"-"9", DELETE, CAPS, LOCATION, LANGUAGE, SETUP, RETURN, CHUP, CHDN; Zone2 Net-Tune variants: PLAYz, STOPz, PAUSEz, TRUPz, TRDNz. FF/REW Net-tune commands must be sent continuously, with no more than 100ms delay between codes.'

- id: internet_radio_preset
  label: Internet Radio Preset
  kind: action
  command: "NPR"
  params:
    - name: code
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: ri_cd_player
  label: RI CD Player Operation
  kind: action
  command: "CCD"
  params:
    - name: code
      type: string
      description: 'POWER, TRACK, PLAY, STOP, PAUSE, SKIP.F, SKIP.R, MEMORY, CLEAR, REPEAT, RANDOM, DISP, D.MODE, FF, REW, OP/CL, "0"-"10", +10, D.SKIP, DISC.F, DISC.R, "DISC1"-"DISC6", STBY, PON; controls an external RI CD player'

- id: ri_tape1
  label: RI Tape 1 Operation
  kind: action
  command: "CT1"
  params:
    - name: code
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]
      description: "Controls external RI TAPE1(A); PLAY.F=PLAY >; PLAY.R=PLAY <; RC/PAU=REC/PAUSE"

- id: ri_tape2
  label: RI Tape 2 Operation
  kind: action
  command: "CT2"
  params:
    - name: code
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]
      description: "Controls external RI TAPE2(B); PLAY.F=PLAY >; PLAY.R=PLAY <; RC/PAU=REC/PAUSE; OP/CL=OPEN/CLOSE"

- id: ri_graphics_equalizer
  label: RI Graphics Equalizer Operation
  kind: action
  command: "CEQ"
  params:
    - name: code
      type: enum
      values: ["POWER", "PRESET"]
      description: "Controls an external RI graphics equalizer; POWER=POWER ON/OFF; PRESET=PRESET"

- id: ri_dat_recorder
  label: RI DAT Recorder Operation
  kind: action
  command: "CDT"
  params:
    - name: code
      type: enum
      values: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]
      description: "Controls an external RI DAT recorder; RC/PAU=REC/PAUSE"

- id: ri_dvd_player
  label: RI DVD Player Operation
  kind: action
  command: "CDV"
  params:
    - name: code
      type: string
      description: 'POWER, PWRON, PWROFF, PLAY, STOP, SKIP.F, SKIP.R, FF, REW, PAUSE, LASTPLAY, SUBTON/OFF, SUBTITLE, SETUP, TOPMENU, MENU, UP, DOWN, LEFT, RIGHT, ENTER, RETURN, DISC.F, DISC.R, AUDIO, RANDOM, OP/CL, ANGLE, "0"-"10", SEARCH, DISP, REPEAT, MEMORY, CLEAR, ABR, STEP.F, STEP.R, SLOW.F, SLOW.R, ZOOMTG, ZOOMUP, ZOOMDN, PROGRE, VDOFF, CONMEM, FUNMEM, "DISC1"-"DISC6", FOLDUP, FOLDDN, P.MODE, ASCTG, CDPCD, MSPUP, MSPDN, PCT, RSCTG, INIT; INIT=Return to Factory Settings; controls an external RI DVD player'

- id: ri_md_recorder
  label: RI MD Recorder Operation
  kind: action
  command: "CMD"
  params:
    - name: code
      type: string
      description: 'POWER, PLAY, STOP, FF, REW, P.MODE, SKIP.F, SKIP.R, PAUSE, REC, MEMORY, DISP, SCROLL, M.SCAN, CLEAR, RANDOM, REPEAT, ENTER, EJECT, "0"-"10/0", "nn/nnn", NAME, GROUP, STBY; source maps "nn/nnn" to --/---; encoding beyond those literal key tokens UNRESOLVED; controls an external RI MD recorder'

- id: ri_cdr_recorder
  label: RI CD-R Recorder Operation
  kind: action
  command: "CCR"
  params:
    - name: code
      type: string
      description: 'POWER, P.MODE, PLAY, STOP, SKIP.F, SKIP.R, PAUSE, REC, CLEAR, REPEAT, "0"-"10/0", "nn/nnn", SCROLL, OP/CL, DISP, RANDOM, MEMORY, FF, REW, STBY; source maps "nn/nnn" to --/---; encoding beyond those literal key tokens UNRESOLVED; controls an external RI CD-R recorder'

- id: zone2_mute_toggle_query
  label: Zone 2 Mute Toggle Or Query
  kind: action
  command: "ZMT"
  params:
    - name: code
      type: enum
      values: ["TG", "QSTN"]
      description: "TG=Zone2 Muting Wrap-Around; QSTN=gets the Zone2 Muting Status"

- id: zone2_volume_step
  label: Zone 2 Volume Step
  kind: action
  command: "ZVL"
  params:
    - name: code
      type: enum
      values: ["UP", "DOWN"]
      description: "UP=Volume Level Up; DOWN=Volume Level Down; only works when main is ON"

- id: zone2_tone
  label: Zone 2 Tone
  kind: action
  command: "ZTN"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Zone2 Tone("BxxTxx"); only works when main is ON and Zone2 is powered or variable'

- id: zone2_balance
  label: Zone 2 Balance
  kind: action
  command: "ZBL"
  params:
    - name: code
      type: string
      description: 'xx is "-A"..."00"..."+A"[-10...0...+10 2 step]; UP=Balance Up (to R 2 Step); DOWN=Balance Down(to L 2 Step); QSTN=gets Zone2 Balance; only works when main is ON and Zone2 is powered or variable'

- id: zone2_tuner_control
  label: Zone 2 Separate Tuner Control
  kind: action
  command: "TUZ"
  params:
    - name: code
      type: string
      description: "nnnnn=sets Directly Tuning Frequency; numeric range UNRESOLVED; UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Tuning Frequency. The TUNER function is shared by the MAIN and ZONE side. But control is separated."

- id: zone2_tuner_preset
  label: Zone 2 Separate Tuner Preset
  kind: action
  command: "PRZ"
  params:
    - name: code
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Preset No.'

- id: zone2_network_operation
  label: Zone 2 Network Operation
  kind: action
  command: "NTZ"
  params:
    - name: code
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: "Network Model Only, Zone2; TRUP=TRACK UP KEY; TRDN=TRACK DOWN KEY; CHUP=CH UP(for iRadio); CHDN=CH DOWN(for iRadio)"

- id: zone2_internet_radio_preset
  label: Zone 2 Internet Radio Preset
  kind: action
  command: "NPZ"
  params:
    - name: code
      type: string
      description: 'Network Model Only, Zone2; "01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: zone2_listening_mode
  label: Zone 2 Listening Mode
  kind: action
  command: "LMZ"
  params:
    - name: code
      type: enum
      values: ["00", "01", "0F", "12", "87", "88"]
      description: "00=STEREO; 01=DIRECT; 0F=MONO; 12=MULTIPLEX; 87=DVS(Pl2); 88=DVS(NEO6)"

- id: zone2_late_night
  label: Zone 2 Late Night
  kind: action
  command: "LTZ"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
      description: "00=Off; 01=Low; 02=High; UP=Wrap-Around Up; QSTN=gets The Late Night Level"

- id: zone2_re_eq_filter
  label: Zone 2 Re-EQ Academy Filter
  kind: action
  command: "RAZ"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
      description: "00=Both Off; 01=Re-EQ On; 02=Academy On; UP=Wrap-Around Up; QSTN=gets The Re-EQ/Academy State"

- id: zone3_mute
  label: Zone 3 Mute
  kind: action
  command: "MT3"
  params:
    - name: code
      type: enum
      values: ["00", "01", "TG", "QSTN"]
      description: "00=Off; 01=On; TG=Wrap-Around; QSTN=gets the Zone3 Muting Status"

- id: zone3_volume_step
  label: Zone 3 Volume Step
  kind: action
  command: "VL3"
  params:
    - name: code
      type: enum
      values: ["UP", "DOWN"]
      description: "UP=Volume Level Up; DOWN=Volume Level Down"

- id: zone3_tone
  label: Zone 3 Tone
  kind: action
  command: "TN3"
  params:
    - name: code
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN, QSTN; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; QSTN gets Zone3 Tone ("BxxTxx")'

- id: zone3_balance
  label: Zone 3 Balance
  kind: action
  command: "BL3"
  params:
    - name: code
      type: string
      description: 'xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; UP=Balance Up (to R 2 Step); DOWN=Balance Down (to L 2 Step); QSTN=gets Zone3 Balance'

- id: zone3_tuner_control
  label: Zone 3 Separate Tuner Control
  kind: action
  command: "TU3"
  params:
    - name: code
      type: string
      description: "nnnnn=sets Directly Tuning Frequency; numeric range UNRESOLVED; UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Tuning Frequency. The TUNER function is shared by the MAIN and ZONE side. But control is separated."

- id: zone3_tuner_preset
  label: Zone 3 Separate Tuner Preset
  kind: action
  command: "PR3"
  params:
    - name: code
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Preset No.'

- id: zone3_network_operation
  label: Zone 3 Network Operation
  kind: action
  command: "NT3"
  params:
    - name: code
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: "Network Model Only, Zone3; TRUP=TRACK UP KEY; TRDN=TRACK DOWN KEY; CHUP=CH UP(for iRadio); CHDN=CH DOWN(for iRadio)"

- id: zone3_internet_radio_preset
  label: Zone 3 Internet Radio Preset
  kind: action
  command: "NP3"
  params:
    - name: code
      type: string
      description: 'Network Model Only, Zone3; "01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: zone4_mute
  label: Zone 4 Mute
  kind: action
  command: "MT4"
  params:
    - name: code
      type: enum
      values: ["00", "01", "TG", "QSTN"]
      description: "00=Off; 01=On; TG=Wrap-Around; QSTN=gets the Zone4 Muting Status"

- id: zone4_volume_step
  label: Zone 4 Volume Step
  kind: action
  command: "VL4"
  params:
    - name: code
      type: enum
      values: ["UP", "DOWN"]
      description: "UP=Volume Level Up; DOWN=Volume Level Down"

- id: zone4_tuner_control
  label: Zone 4 Separate Tuner Control
  kind: action
  command: "TU4"
  params:
    - name: code
      type: string
      description: "nnnnn=sets Directly Tuning Frequency; numeric range UNRESOLVED; UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Tuning Frequency. The TUNER function is shared by the MAIN and ZONE side. But control is separated."

- id: zone4_tuner_preset
  label: Zone 4 Separate Tuner Preset
  kind: action
  command: "PR4"
  params:
    - name: code
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); UP=Wrap-Around Up; DOWN=Wrap-Around Down; QSTN=gets The Preset No.'

- id: zone4_network_operation
  label: Zone 4 Network Operation
  kind: action
  command: "NT4"
  params:
    - name: code
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN"]
      description: "Network Model Only, Zone4; TRUP=TRACK UP KEY; TRDN=TRACK DOWN KEY"

- id: zone4_internet_radio_preset
  label: Zone 4 Internet Radio Preset
  kind: action
  command: "NP4"
  params:
    - name: code
      type: string
      description: 'Network Model Only, Zone4; "01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: ri_docking_station
  label: RI Docking Station Operation
  kind: action
  command: "CDS"
  params:
    - name: code
      type: enum
      values: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
      description: "Dock via RI; PWRON=On; PWROFF=Standby; PLY/RES=PLAY/RESUME; SKIP.F=TRACK UP; SKIP.R=TRACK DOWN; PLY/PAU=PLAY/PAUSE; REW=FR; ALBUM+=ALBUM UP; ALBUM-=ALBUM DOWN; PLIST+=PLAYLIST UP; PLIST-=PLAYLIST DOWN; CHAPT+=CHAPTER UP; CHAPT-=CHAPTER DOWN; RANDOM=SHUFFLE; BLIGHT=BACKLIGHT; ENTER=SELECT"
```

## Feedbacks
```yaml
# === System State Queries (all use QSTN suffix) ===
- id: power_state
  label: Power State
  type: enum
  command: "PWRQSTN"
  query_command: "PWRQSTN"
  values:
    - "00"
    - "01"
  value_labels:
    "00": standby
    "01": "on"

- id: mute_state
  label: Mute State
  type: enum
  command: "AMTQSTN"
  query_command: "AMTQSTN"
  values:
    - "00"
    - "01"
  value_labels:
    "00": "off"
    "01": "on"

- id: volume_level
  label: Master Volume Level
  type: string
  command: "MVLQSTN"
  query_command: "MVLQSTN"
  description: "Returns hex value 00-64 (or 00-50 depending on model)"

- id: input_selector
  label: Input Selector Position
  type: enum
  command: "SLIQSTN"
  query_command: "SLIQSTN"
  description: "Returns current input code (same coding as SLI command)"

- id: listening_mode
  label: Listening Mode
  type: string
  command: "LMDQSTN"
  query_command: "LMDQSTN"
  description: "Returns current listening mode code"

- id: audio_selector
  label: Audio Selector
  type: string
  command: "SLAQSTN"
  query_command: "SLAQSTN"
  description: "Returns current audio input mode"

- id: dimmer_level
  label: Dimmer Level
  type: enum
  command: "DIMQSTN"
  query_command: "DIMQSTN"
  values: ["00", "01", "02", "03", "08"]

- id: sleep_time
  label: Sleep Timer
  type: string
  command: "SLPQSTN"
  query_command: "SLPQSTN"
  description: "Returns hex 01-5A (1-90 min) or OFF"

- id: hdmi_output
  label: HDMI Output Selector
  type: string
  command: "HDOQSTN"
  query_command: "HDOQSTN"

- id: monitor_resolution
  label: Monitor Out Resolution
  type: string
  command: "RESQSTN"
  query_command: "RESQSTN"

- id: speaker_a_state
  label: Speaker A State
  type: enum
  command: "SPAQSTN"
  query_command: "SPAQSTN"
  values: ["00", "01"]

- id: speaker_b_state
  label: Speaker B State
  type: enum
  command: "SPBQSTN"
  query_command: "SPBQSTN"
  values: ["00", "01"]

- id: display_mode
  label: Display Mode
  type: string
  command: "DIFQSTN"
  query_command: "DIFQSTN"

- id: audio_info
  label: Audio Information
  type: string
  command: "IFAQSTN"
  query_command: "IFAQSTN"
  description: "Returns audio format info matching front panel display"

- id: video_info
  label: Video Information
  type: string
  command: "IFVQSTN"
  query_command: "IFVQSTN"
  description: "Returns video format info matching front panel display"

- id: net_play_status
  label: Net/USB Play Status
  type: string
  command: "NSTQSTN"
  query_command: "NSTQSTN"
  description: "3-char string: p=Play(S/P/p/F/R), r=Repeat(-/R/F/1)"

- id: net_artist
  label: Net/USB Artist Name
  type: string
  command: "NATQSTN"
  query_command: "NATQSTN"

- id: net_album
  label: Net/USB Album Name
  type: string
  command: "NALQSTN"
  query_command: "NALQSTN"

- id: net_title
  label: Net/USB Title Name
  type: string
  command: "NTIQSTN"
  query_command: "NTIQSTN"

- id: net_time
  label: Net/USB Time Info
  type: string
  command: "NTMQSTN"
  query_command: "NTMQSTN"
  description: "Format: mm:ss/mm:ss (elapsed/total)"

- id: net_track
  label: Net/USB Track Info
  type: string
  command: "NTRQSTN"
  query_command: "NTRQSTN"
  description: "Format: cccc/tttt (current/total)"

# === Zone 2 Queries ===
- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  command: "ZPWQSTN"
  query_command: "ZPWQSTN"
  values: ["00", "01"]

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  command: "ZVLQSTN"
  query_command: "ZVLQSTN"

- id: zone2_input_selector
  label: Zone 2 Input Selector
  type: string
  command: "SLZQSTN"
  query_command: "SLZQSTN"

# === Zone 3 Queries ===
- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  command: "PW3QSTN"
  query_command: "PW3QSTN"
  values: ["00", "01"]

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  command: "VL3QSTN"
  query_command: "VL3QSTN"

- id: zone3_input_selector
  label: Zone 3 Input Selector
  type: string
  command: "SL3QSTN"
  query_command: "SL3QSTN"

# === Zone 4 Queries ===
- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  command: "PW4QSTN"
  query_command: "PW4QSTN"
  values: ["00", "01"]

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  command: "VL4QSTN"
  query_command: "VL4QSTN"

- id: zone4_input_selector
  label: Zone 4 Input Selector
  type: string
  command: "SL4QSTN"
  query_command: "SL4QSTN"
```

## Variables
```yaml
- id: master_volume
  label: Master Volume
  command_prefix: "MVL"
  range:
    min: "00"
    max: "64"
  encoding: hex
  description: "Volume level 0-100 (or 0-80) in hex representation"

- id: zone2_volume
  label: Zone 2 Volume
  command_prefix: "ZVL"
  range:
    min: "00"
    max: "64"
  encoding: hex

- id: zone3_volume
  label: Zone 3 Volume
  command_prefix: "VL3"
  range:
    min: "00"
    max: "64"
  encoding: hex

- id: zone4_volume
  label: Zone 4 Volume
  command_prefix: "VL4"
  range:
    min: "00"
    max: "64"
  encoding: hex

- id: tone_front_bass
  label: Front Bass Tone
  command_prefix: "TFRB"
  range:
    min: "-A"
    max: "+A"
  description: "-10 to +10 in 2-step increments"

- id: tone_front_treble
  label: Front Treble Tone
  command_prefix: "TFRT"
  range:
    min: "-A"
    max: "+A"
  description: "-10 to +10 in 2-step increments"

- id: subwoofer_level
  label: Subwoofer Level
  command_prefix: "SWL"
  range:
    min: "-F"
    max: "+C"
  description: "-15dB to +12dB"

- id: center_level
  label: Center Level
  command_prefix: "CTL"
  range:
    min: "-C"
    max: "+C"
  description: "-12dB to +12dB"
```

## Events
```yaml
- id: status_notification
  label: Unsolicited Status Notification
  description: >-
    When the receiver's status changes (from front panel, remote, or internal),
    it sends an unsolicited status message to the connected controller.
    The message format is the same as a query response (e.g. "SLI03" when input changes).
    Only sent if the TCP connection is held continuously.
  trigger: device_state_change

- id: zone2_status_notification
  label: Zone 2 Status Notification
  description: >-
    Unsolicited Zone 2 status updates using Zone 2 command codes (ZPW, ZMT, ZVL, SLZ, etc.).
  trigger: zone2_state_change
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Zone 2 volume/tone only works when main zone is ON and Zone 2 is powered or variable"
    affected_commands:
      - zone2_volume_set
      - zone2_select_input
  - description: "12V Triggers (TGA/TGB/TGC) only available when each trigger parameter is set to OFF in Setup Menu"
    affected_commands:
      - trigger_a_on
      - trigger_a_off
      - trigger_b_on
      - trigger_b_off
      - trigger_c_on
      - trigger_c_off
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes
- **ISCP message format**: All commands are sent as `!1CCC...` where `!` is the start character, `1` is the unit type for Receiver, `CCC...` is the command+parameter, terminated by `[CR]` over RS-232 or `[EOF]` over TCP.
- **eISCP packet format** (TCP): 16-byte header (`ISCP` magic, header size 0x00000010 big-endian, data size big-endian, version 0x01, reserved 0x000000) followed by ISCP data.
- **Connection limit**: Only one TCP client can connect at a time.
- **Minimum command interval**: Commands must be spaced at least 50ms apart.
- **Response timeout**: If the receiver does not respond within 50ms, the communication has failed.
- **Volume encoding**: Volume levels use hexadecimal representation (e.g., "64" hex = 100 decimal, "50" hex = 80 decimal).
- **Preset numbering**: Preset numbers also use hexadecimal representation.
- **Zone dependency**: Zone 2 requires main zone to be ON for volume/tone/balance control.
- **Port range**: TCP destination port is 60128 by default, configurable from 49152 to 65535 via the receiver setup menu (requires standby power cycle to apply).
- **RS-232 hardware**: 3-wire (RX, TX, GND), DB9 female, pin 2=TX, pin 3=RX, pin 5=GND. Use straight-through cable.

<!-- UNRESOLVED: exact DHC sub-models covered by this protocol version not stated -->
<!-- UNRESOLVED: maximum volume range per specific DHC model not stated -->
<!-- UNRESOLVED: tone command hex encoding for negative/positive values not fully specified -->
<!-- UNRESOLVED: RI system commands (CCD, CT1, CT2, CDV, CMD, CCR, CDS) control external devices, not the receiver itself -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio commands are model-specific, not available on all DHC units -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T20:33:41.268Z
last_checked_at: 2026-10-07T20:33:41.268Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:33:41.268Z
matched_actions: 178
action_count: 178
confidence: medium
summary: "All 178 action units match source ISCP codes and parameters, transport matches (60128, 9600 8N1), and the source catalogue is fully represented. Source is a generic Integra receiver guide that does not name DHC. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact DHC model numbers not enumerated in source"
- "firmware version compatibility not stated"
- "no explicit macro sequences defined in source"
- "power-on sequencing requirements not stated in source"
- "exact DHC sub-models covered by this protocol version not stated"
- "maximum volume range per specific DHC model not stated"
- "tone command hex encoding for negative/positive values not fully specified"
- "RI system commands (CCD, CT1, CT2, CDV, CMD, CCR, CDS) control external devices, not the receiver itself"
- "XM/SIRIUS/HD Radio commands are model-specific, not available on all DHC units"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
