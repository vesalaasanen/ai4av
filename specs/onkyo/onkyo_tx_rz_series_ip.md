---
spec_id: admin/onkyo-tx-rz-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-RZ Series Control Spec"
manufacturer: Onkyo
model_family: "TX-RZ Series"
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - "TX-RZ Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T11:13:56.778Z
last_checked_at: 2026-10-07T15:43:17.211Z
generated_at: 2026-10-07T15:43:17.211Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact TX-RZ sub-models covered by this protocol version not stated"
  - "firmware version compatibility not stated"
  - "the supplied generic receiver guide does not establish TX-RZ compatibility"
  - "Tone commands for all speaker zones (TFR, TFW, TFH, TCT, TSR, TSB, TSW, ZTN, TN3)"
  - "Tuner commands (TUN, PRS, PRM) and HD Radio commands documented but model-dependent."
  - "XM/SIRIUS commands model-dependent."
  - "RI System commands (CCD, CT1, CT2, CDV, CMD, CCR, CDS) for external RI devices."
  - "RECOUT selector (SLR), ISF mode, Memory setup (MEM), Display commands."
  - "Feedbacks for tone (TFR, ZTN, TN3), sleep timer (SLP), dimmer (DIM),"
  - "no multi-step sequences described in source"
  - "full power-on sequencing requirements not stated in source"
  - "fault behavior and error recovery not documented"
  - "protocol version compatibility across firmware generations not stated"
  - "maximum volume range for TX-RZ models specifically not confirmed"
  - "behavior when TCP connection is lost during operation not documented"
  - "RS-232 pinout details for DB9 connector (pin 2=TX, pin 3=RX, pin 5=GND, straight-thru cable)"
  - "whether TX-RZ series supports Zone 4 commands or if that is limited to specific models"
verification:
  verdict: verified
  checked_at: 2026-10-07T15:43:17.211Z
  matched_actions: 236
  action_count: 236
  confidence: medium
  summary: "All 236 action units match source ISCP tokens and transport values; the generic receiver guide gives the spec full coverage, with TX-RZ applicability only a caveat. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Onkyo TX-RZ Series Control Spec

## Summary
The supplied ISCP Version 1.15 guide documents commands and transport details for Onkyo/Integra AV receivers, but does not establish that its commands apply to the TX-RZ Series. TX-RZ compatibility is UNRESOLVED. The source documents ISCP over RS-232 and eISCP over TCP/IP.

<!-- UNRESOLVED: exact TX-RZ sub-models covered by this protocol version not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: the supplied generic receiver guide does not establish TX-RZ compatibility -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; configurable 49152-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED
```

## Traits
```yaml
traits:
  - powerable     # PWR, ZPW, PW3, PW4 commands
  - queryable     # QSTN parameter on nearly every command
  - routable      # SLI, SLZ, SL3, SL4 input selector commands
  - levelable     # MVL, ZVL, VL3, VL4 volume commands
```

## Actions
```yaml
# All commands use ISCP format: "!" + unit_type + 3-char command + parameter + end_char
# Unit type "1" = Receiver. End chars: RS-232=[CR]/[LF]/[CR][LF]; TCP=[EOF]/[EOF][CR]/[EOF][CR][LF]
# Hex parameter values are uppercase ASCII hex (e.g. "0A", "64").

# === Main Zone Power & Audio ===
- id: power_on
  label: Power On
  kind: action
  command: "!1PWR01"
  params: []

- id: power_off
  label: Power Standby
  kind: action
  command: "!1PWR00"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "!1AMT01"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "!1AMT00"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "!1AMTTG"
  params: []

- id: volume_set
  label: Set Volume Level
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80) depending on model"

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

- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  command: "!1MVLUP1"
  params: []

- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  command: "!1MVLDOWN1"
  params: []

- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: "!1SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "Hex 01-5A (1-90 min) or OFF"

- id: sleep_off
  label: Sleep Timer Off
  kind: action
  command: "!1SLPOFF"
  params: []

- id: sleep_up
  label: Sleep Timer Wrap Up
  kind: action
  command: "!1SLPUP"
  params: []

# === Main Zone Input Selection ===
- id: select_input
  label: Select Input
  kind: action
  command: "!1SLI{input}"
  params:
    - name: input
      type: enum
      values:
        - "00"  # VCR/DVR (VIDEO1)
        - "01"  # CBL/SAT (VIDEO2)
        - "02"  # GAME/TV (VIDEO3)
        - "03"  # AUX1
        - "04"  # AUX2 (VIDEO5)
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE/TV/TAPE
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB Front
        - "2A"  # USB Rear
        - "30"  # MULTI CH
        - "31"  # XM (XM/SIRIUS model only)
        - "32"  # SIRIUS (XM/SIRIUS model only)
        - "40"  # Universal PORT
      description: Input selector code in hex

- id: input_up
  label: Input Selector Up
  kind: action
  command: "!1SLIUP"
  params: []

- id: input_down
  label: Input Selector Down
  kind: action
  command: "!1SLIDOWN"
  params: []

# === Listening Mode ===
- id: set_listening_mode
  label: Set Listening Mode
  kind: action
  command: "!1LMD{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # STEREO
        - "01"  # DIRECT
        - "02"  # SURROUND
        - "03"  # FILM Game-RPG
        - "04"  # THX
        - "05"  # ACTION Game-Action
        - "06"  # MUSICAL Game-Rock
        - "07"  # MONO MOVIE
        - "08"  # ORCHESTRA
        - "09"  # UNPLUGGED
        - "0A"  # STUDIO-MIX
        - "0B"  # TV LOGIC
        - "0C"  # ALL CH STEREO
        - "0D"  # THEATER-DIMENSIONAL
        - "0E"  # ENHANCED 7/ENHANCE Game-Sports
        - "0F"  # MONO
        - "11"  # PURE AUDIO
        - "12"  # MULTIPLEX
        - "13"  # FULL MONO
        - "14"  # DOLBY VIRTUAL
        - "15"  # DTS Surround Sensation
        - "16"  # Audyssey DSX
        - "40"  # 5.1ch Surround / Straight Decode (source lists both)
        - "41"  # Dolby EX/DTS ES / Dolby EX (source lists both)
        - "42"  # THX Cinema
        - "43"  # THX Surround EX
        - "44"  # THX Music
        - "45"  # THX Games
        - "50"  # U2/S2 Cinema/Cinema2
        - "51"  # MusicMode, U2/S2 Music
        - "52"  # Games Mode, U2/S2 Games
        - "80"  # PLII/PLIIx Movie
        - "81"  # PLII/PLIIx Music
        - "82"  # Neo:6 Cinema
        - "83"  # Neo:6 Music
        - "84"  # PLII/PLIIx THX Cinema
        - "85"  # Neo:6 THX Cinema
        - "86"  # PLII/PLIIx Game
        - "87"  # Neural Surr (North American model only)
        - "88"  # Neural THX/Neural Surround
        - "89"  # PLII/PLIIx THX Games
        - "8A"  # Neo:6 THX Games
        - "8B"  # PLII/PLIIx THX Music
        - "8C"  # Neo:6 THX Music
        - "8D"  # Neural THX Cinema
        - "8E"  # Neural THX Music
        - "8F"  # Neural THX Games
        - "90"  # PLIIz Height
        - "91"  # Neo:6 Cinema DTS Surround Sensation
        - "92"  # Neo:6 Music DTS Surround Sensation
        - "93"  # Neural Digital Music
        - "94"  # PLIIz Height + THX Cinema
        - "95"  # PLIIz Height + THX Music
        - "96"  # PLIIz Height + THX Games
        - "97"  # PLIIz Height + THX U2/S2 Cinema
        - "98"  # PLIIz Height + THX U2/S2 Music
        - "99"  # PLIIz Height + THX U2/S2 Games
        - "A0"  # PLIIx/PLII Movie + Audyssey DSX
        - "A1"  # PLIIx/PLII Music + Audyssey DSX
        - "A2"  # PLIIx/PLII Game + Audyssey DSX
        - "A3"  # Neo:6 Cinema + Audyssey DSX
        - "A4"  # Neo:6 Music + Audyssey DSX
        - "A5"  # Neural Surround + Audyssey DSX
        - "A6"  # Neural Digital Music + Audyssey DSX
        - "A7"  # Dolby EX + Audyssey DSX
      description: "Listening mode code. Availability is model and input dependent."

- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  command: "!1LMDUP"
  params: []

- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  command: "!1LMDDOWN"
  params: []

# === Audio Processing ===
- id: set_late_night
  label: Set Late Night Mode
  kind: action
  command: "!1LTN{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=Low(DD)/On(TrueHD), 02=High(DD), 03=Auto(TrueHD)"

- id: set_audyssey_eq
  label: Set Audyssey EQ
  kind: action
  command: "!1ADY{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_audyssey_dyn_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_audyssey_dyn_vol
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

- id: set_music_optimizer
  label: Set Music Optimizer
  kind: action
  command: "!1MOT{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

# === Speaker Commands ===
- id: set_speaker_a
  label: Set Speaker A
  kind: action
  command: "!1SPA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_speaker_b
  label: Set Speaker B
  kind: action
  command: "!1SPB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

# === Tone Control (Front) ===
- id: set_front_bass
  label: Set Front Bass
  kind: action
  command: "!1TFRB{value}"
  params:
    - name: value
      type: string
      description: "-A to +A (-10 to +10, 2-step increments)"

- id: set_front_treble
  label: Set Front Treble
  kind: action
  command: "!1TFRT{value}"
  params:
    - name: value
      type: string
      description: "-A to +A (-10 to +10, 2-step increments)"

# === Dimmer ===
- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "08", "DIM"]
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF, DIM=Wrap"

# === Audio Selector ===
- id: set_audio_selector
  label: Set Audio Selector
  kind: action
  command: "!1SLA{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06"]
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

# === 12V Triggers ===
- id: set_trigger_a
  label: Set 12V Trigger A
  kind: action
  command: "!1TGA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_trigger_b
  label: Set 12V Trigger B
  kind: action
  command: "!1TGB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: set_trigger_c
  label: Set 12V Trigger C
  kind: action
  command: "!1TGC{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

# === HDMI Output ===
- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: "!1HDO{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=No Analog, 01=Out Main, 02=Out Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"

# === Monitor Out Resolution ===
- id: set_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "!1RES{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07"]
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs"

# === Network/USB Playback ===
- id: net_play
  label: Network/USB Play
  kind: action
  command: "!1NTCPLAY"
  params: []

- id: net_stop
  label: Network/USB Stop
  kind: action
  command: "!1NTCSTOP"
  params: []

- id: net_pause
  label: Network/USB Pause
  kind: action
  command: "!1NTCPAUSE"
  params: []

- id: net_track_up
  label: Network/USB Track Up
  kind: action
  command: "!1NTCTRUP"
  params: []

- id: net_track_down
  label: Network/USB Track Down
  kind: action
  command: "!1NTCTRDN"
  params: []

- id: net_repeat
  label: Network/USB Repeat
  kind: action
  command: "!1NTCREPEAT"
  params: []

- id: net_random
  label: Network/USB Random
  kind: action
  command: "!1NTCRANDOM"
  params: []

# === OSD Navigation ===
- id: osd_menu
  label: OSD Menu
  kind: action
  command: "!1OSDMENU"
  params: []

- id: osd_up
  label: OSD Up
  kind: action
  command: "!1OSDUP"
  params: []

- id: osd_down
  label: OSD Down
  kind: action
  command: "!1OSDDOWN"
  params: []

- id: osd_left
  label: OSD Left
  kind: action
  command: "!1OSDLEFT"
  params: []

- id: osd_right
  label: OSD Right
  kind: action
  command: "!1OSDRIGHT"
  params: []

- id: osd_enter
  label: OSD Enter
  kind: action
  command: "!1OSDENTER"
  params: []

- id: osd_exit
  label: OSD Exit
  kind: action
  command: "!1OSDEXIT"
  params: []

# === Zone 2 Power & Audio ===
- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  command: "!1ZPW01"
  params: []

- id: zone2_power_off
  label: Zone 2 Power Standby
  kind: action
  command: "!1ZPW00"
  params: []

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "!1ZMT01"
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "!1ZMT00"
  params: []

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "!1ZMTTG"
  params: []

- id: zone2_volume_set
  label: Zone 2 Set Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80)"

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

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: "!1SLZ{input}"
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI command (subset available)"

# === Zone 3 Power & Audio ===
- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  command: "!1PW301"
  params: []

- id: zone3_power_off
  label: Zone 3 Power Standby
  kind: action
  command: "!1PW300"
  params: []

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: "!1MT301"
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: "!1MT300"
  params: []

- id: zone3_volume_set
  label: Zone 3 Set Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80)"

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

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "!1SL3{input}"
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI command (subset available)"

# === Zone 4 Power & Audio ===
- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  command: "!1PW401"
  params: []

- id: zone4_power_off
  label: Zone 4 Power Standby
  kind: action
  command: "!1PW400"
  params: []

- id: zone4_mute_on
  label: Zone 4 Mute On
  kind: action
  command: "!1MT401"
  params: []

- id: zone4_mute_off
  label: Zone 4 Mute Standby
  kind: action
  command: "!1MT400"
  params: []

- id: zone4_volume_set
  label: Zone 4 Set Volume
  kind: action
  command: "!1VL4{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 (0-100) or 00-50 (0-80)"

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

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "!1SL4{input}"
  params:
    - name: input
      type: string
      description: "Same hex codes as main SLI command (subset available)"

# UNRESOLVED: Tone commands for all speaker zones (TFR, TFW, TFH, TCT, TSR, TSB, TSW, ZTN, TN3)
# documented in source but omitted here for brevity. Follow same ISCP pattern.
# UNRESOLVED: Tuner commands (TUN, PRS, PRM) and HD Radio commands documented but model-dependent.
# UNRESOLVED: XM/SIRIUS commands model-dependent.
# UNRESOLVED: RI System commands (CCD, CT1, CT2, CDV, CMD, CCR, CDS) for external RI devices.
# UNRESOLVED: RECOUT selector (SLR), ISF mode, Memory setup (MEM), Display commands.

# Appended entries retain the source's literal three-character command tokens.
# For these entries, frame "!" + "1" + command + supplied parameter + end_char.
# Bxx/Txx/xx/nnnnn denote source parameter formats, not literal wire values.
# Model-specific availability remains as stated in the source; TX-RZ applicability is UNRESOLVED.

- id: speaker_a_wrap
  label: Speaker A Wrap
  kind: action
  command: "SPA"
  params:
    - name: state
      type: enum
      values: ["UP"]
      description: "sets Speaker Switch Wrap-Around"

- id: speaker_b_wrap
  label: Speaker B Wrap
  kind: action
  command: "SPB"
  params:
    - name: state
      type: enum
      values: ["UP"]
      description: "sets Speaker Switch Wrap-Around"

- id: set_speaker_layout
  label: Set Speaker Layout
  kind: action
  command: "SPL"
  params:
    - name: layout
      type: enum
      values: ["SB", "FH", "FW", "UP"]
      description: "SB=sets SurrBack Speaker; FH=sets Front High Speaker / SurrBack+Front High Speakers; FW=sets Front Wide Speaker / SurrBack+Front Wide Speakers; UP=sets Speaker Switch Wrap-Around"

- id: adjust_front_tone
  label: Adjust Front Tone
  kind: action
  command: "TFR"
  params:
    - name: operation
      type: enum
      values: ["BUP", "BDOWN", "TUP", "TDOWN"]
      description: "BUP=sets Front Bass up(2 step); BDOWN=sets Front Bass down(2 step); TUP=sets Front Treble up(2 step); TDOWN=sets Front Treble down(2 step)"

- id: front_wide_tone
  label: Front Wide Tone
  kind: action
  command: "TFW"
  params:
    - name: parameter
      type: string
      description: 'Bxx or Txx: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Front Wide Bass up(2 step); BDOWN=sets Front Wide Bass down(2 step); TUP=sets Front Wide Treble up(2 step); TDOWN=sets Front Wide Treble down(2 step)'

- id: front_high_tone
  label: Front High Tone
  kind: action
  command: "TFH"
  params:
    - name: parameter
      type: string
      description: 'Bxx or Txx: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Front High Bass up(2 step); BDOWN=sets Front High Bass down(2 step); TUP=sets Front High Treble up(2 step); TDOWN=sets Front High Treble down(2 step)'

- id: center_tone
  label: Center Tone
  kind: action
  command: "TCT"
  params:
    - name: parameter
      type: string
      description: 'Bxx or Txx: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Center Bass up(2 step); BDOWN=sets Center Bass down(2 step); TUP=sets Center Treble up(2 step); TDOWN=sets Center Treble down(2 step)'

- id: surround_tone
  label: Surround Tone
  kind: action
  command: "TSR"
  params:
    - name: parameter
      type: string
      description: 'Bxx or Txx: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Surround Bass up(2 step); BDOWN=sets Surround Bass down(2 step); TUP=sets Surround Treble up(2 step); TDOWN=sets Surround Treble down(2 step)'

- id: surround_back_tone
  label: Surround Back Tone
  kind: action
  command: "TSB"
  params:
    - name: parameter
      type: string
      description: 'Bxx or Txx: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Surround Back Bass up(2 step); BDOWN=sets Surround Back Bass down(2 step); TUP=sets Surround Back Treble up(2 step); TDOWN=sets Surround Back Treble down(2 step)'

- id: subwoofer_tone
  label: Subwoofer Tone
  kind: action
  command: "TSW"
  params:
    - name: parameter
      type: string
      description: 'Bxx: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Subwoofer Bass up(2 step); BDOWN=sets Subwoofer Bass down(2 step). No treble setter is documented.'

- id: speaker_level_calibration
  label: Speaker Level Calibration
  kind: action
  command: "SLC"
  params:
    - name: operation
      type: enum
      values: ["TEST", "CHSEL", "UP", "DOWN"]
      description: "TEST=TEST Key; CHSEL=CH SEL Key; UP=LEVEL + Key; DOWN=LEVEL–KEY"

- id: subwoofer_temporary_level
  label: Subwoofer Temporary Level
  kind: action
  command: "SWL"
  params:
    - name: level
      type: string
      description: '"-F"-"00"-"+C": sets Subwoofer Level -15dB-0dB-+12dB; UP=LEVEL + Key; DOWN=LEVEL–KEY'

- id: center_temporary_level
  label: Center Temporary Level
  kind: action
  command: "CTL"
  params:
    - name: level
      type: string
      description: '"-C"-"00"-"+C": sets Center Level -12dB-0dB-+12dB; UP=LEVEL + Key; DOWN=LEVEL–KEY'

- id: display_information_mode
  label: Display Information Mode
  kind: action
  command: "DIF"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "TG"]
      description: "Source lists two DIF tables. Display Information: 00=Display Program Format; 01=Display Digital Input Position; 02=Display Digital Format Position; 03=Display Bass Level; 04=Display Treble Level. Display Mode: 00=sets Selector + Volume Display Mode; 01=sets Selector + Listening Mode Display Mode; 02=Display Digital Format(temporary display); 03=Display Video Format(temporary display); TG=sets Display Mode Wrap-Around Up. Model mapping is UNRESOLVED."

- id: osd_adjust
  label: OSD Adjust
  kind: action
  command: "OSD"
  params:
    - name: operation
      type: enum
      values: ["AUDIO", "VIDEO"]
      description: "AUDIO=Audio Adjust Key; VIDEO=Video Adjust Key"

- id: memory_setup
  label: Memory Setup
  kind: action
  command: "MEM"
  params:
    - name: operation
      type: enum
      values: ["STR", "RCL", "LOCK", "UNLK"]
      description: "STR=stores memory; RCL=recalls memory; LOCK=locks memory; UNLK=unlocks memory"

- id: select_recout
  label: Select RECOUT
  kind: action
  command: "SLR"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80"]
      description: "00=VIDEO1; 01=VIDEO2; 02=VIDEO3; 03=VIDEO4; 04=VIDEO5; 05=VIDEO6; 06=VIDEO7; 10=DVD; 20=TAPE(1); 21=TAPE2; 22=PHONO; 23=CD; 24=FM; 25=AM; 26=TUNER; 27=MUSIC SERVER; 28=INTERNET RADIO; 30=MULTI CH; 31=XM; 7F=OFF; 80=SOURCE. Source note: REC/ZONE3."

- id: audio_selector_wrap
  label: Audio Selector Wrap
  kind: action
  command: "SLA"
  params:
    - name: mode
      type: enum
      values: ["UP"]
      description: "sets Audio Selector Wrap-Around Up"

- id: set_video_output
  label: Set Video Output
  kind: action
  command: "VOS"
  params:
    - name: mode
      type: enum
      values: ["00", "01"]
      description: "Japanese Model Only; 00=sets D4; 01=sets Component"

- id: hdmi_output_wrap
  label: HDMI Output Wrap
  kind: action
  command: "HDO"
  params:
    - name: mode
      type: enum
      values: ["UP"]
      description: "sets HDMI Out Selector Wrap-Around Up"

- id: resolution_wrap
  label: Resolution Wrap
  kind: action
  command: "RES"
  params:
    - name: mode
      type: enum
      values: ["UP"]
      description: "sets Monitor Out Resolution Wrap-Around Up"

- id: set_isf_mode
  label: Set ISF Mode
  kind: action
  command: "ISF"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=sets ISF Mode Custom; 01=sets ISF Mode Day; 02=sets ISF Mode Night; UP=sets ISF Mode State Wrap-Around Up"

- id: listening_mode_category_wrap
  label: Listening Mode Category Wrap
  kind: action
  command: "LMD"
  params:
    - name: mode
      type: enum
      values: ["MOVIE", "MUSIC", "GAME"]
      description: "Each documented parameter sets Listening Mode Wrap-Around Up"

- id: late_night_wrap
  label: Late Night Wrap
  kind: action
  command: "LTN"
  params:
    - name: mode
      type: enum
      values: ["UP"]
      description: "sets Late Night State Wrap-Around Up"

- id: set_re_eq_filter
  label: Set Re-EQ Filter
  kind: action
  command: "RAS"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "Re-EQ/Academy Filter table: 00=sets Both Off; 01=sets Re-EQ On; 02=sets Academy On; UP=sets Re-EQ/Academy State Wrap-Around Up. Separate Re-EQ and Cinema Filter tables also use RAS with 00, 01, UP; their model mapping is UNRESOLVED."

- id: audyssey_eq_wrap
  label: Audyssey EQ Wrap
  kind: action
  command: "ADY"
  params:
    - name: state
      type: enum
      values: ["UP"]
      description: "sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up"

- id: audyssey_dynamic_eq_wrap
  label: Audyssey Dynamic EQ Wrap
  kind: action
  command: "ADQ"
  params:
    - name: state
      type: enum
      values: ["UP"]
      description: "sets Audyssey Dynamic EQ State Wrap-Around Up"

- id: audyssey_dynamic_volume_wrap
  label: Audyssey Dynamic Volume Wrap
  kind: action
  command: "ADV"
  params:
    - name: state
      type: enum
      values: ["UP"]
      description: "sets Audyssey Dynamic Volume State Wrap-Around Up"

- id: set_dolby_volume
  label: Set Dolby Volume
  kind: action
  command: "DVL"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "03", "UP"]
      description: "00=sets Dolby Volume Off; 01=sets Dolby Volume Low; 02=sets Dolby Volume Mid; 03=sets Dolby Volume High; UP=sets Dolby Volume State Wrap-Around Up"

- id: music_optimizer_wrap
  label: Music Optimizer Wrap
  kind: action
  command: "MOT"
  params:
    - name: state
      type: enum
      values: ["UP"]
      description: "sets Music Optimizer State Wrap-Around Up"

- id: tuner_tuning
  label: Tuner Tuning
  kind: action
  command: "TUN"
  params:
    - name: frequency
      type: string
      description: "Include Tuner Pack Model Only. nnnnn: sets Directly Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch) put 0 in the first two digits of nnnnn at XM; frequency range UNRESOLVED. UP=sets Tuning Frequency Wrap-Around Up; DOWN=sets Tuning Frequency Wrap-Around Down. Shared by MAIN and ZONE."

- id: tuner_preset
  label: Tuner Preset
  kind: action
  command: "PRS"
  params:
    - name: preset
      type: string
      description: 'Include Tuner Pack Model Only. "01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation); UP=sets Preset No. Wrap-Around Up; DOWN=sets Preset No. Wrap-Around Down. Also documented for Zone2; shared preset control is represented once.'

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "PRM"
  params:
    - name: preset
      type: string
      description: 'Include Tuner Pack Model Only. "01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation)'

- id: rds_information
  label: RDS Information
  kind: action
  command: "RDS"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "RDS Model Only; 00=Display RT Information; 01=Display PTY Information; 02=Display TP Information; UP=Display RDS Information Wrap-Around Change. RBDS Model supports only Display RT information."

- id: pty_scan
  label: PTY Scan
  kind: action
  command: "PTS"
  params:
    - name: parameter
      type: string
      description: 'RDS Model Only. "00"-"1E": sets PTY No "0-30"(In hexadecimal representation); ENTER=Finish PTY Scan'

- id: tp_scan
  label: TP Scan
  kind: action
  command: "TPS"
  params:
    - name: operation
      type: enum
      values: ["", "ENTER"]
      description: "RDS Model Only; empty parameter=Start TP Scan (When Don't Have Parameter); ENTER=Finish TP Scan"

- id: xm_channel
  label: XM Channel
  kind: action
  command: "XCH"
  params:
    - name: channel
      type: string
      description: 'XM Model Only. "000"-"255": XM Channel Number "000-255"; UP=sets XM Channel Wrap-Around Up; DOWN=sets XM Channel Wrap-Around Down'

- id: xm_category_wrap
  label: XM Category Wrap
  kind: action
  command: "XCT"
  params:
    - name: operation
      type: enum
      values: ["UP", "DOWN"]
      description: "XM Model Only; UP=sets XM Category Wrap-Around Up; DOWN=sets XM Category Wrap-Around Down"

- id: sirius_channel
  label: SIRIUS Channel
  kind: action
  command: "SCH"
  params:
    - name: channel
      type: string
      description: 'SIRIUS Model Only. "000"-"255": SIRIUS Channel Number "000-255"; UP=sets SIRIUS Channel Wrap-Around Up; DOWN=sets SIRIUS Channel Wrap-Around Down'

- id: sirius_category_wrap
  label: SIRIUS Category Wrap
  kind: action
  command: "SCT"
  params:
    - name: operation
      type: enum
      values: ["UP", "DOWN"]
      description: "SIRIUS Model Only; UP=sets SIRIUS Category Wrap-Around Up; DOWN=sets SIRIUS Category Wrap-Around Down"

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK"
  params:
    - name: parameter
      type: string
      description: 'SIRIUS Model Only. nnnn=Lock Password (4 Digits); INPUT=displays "Please input the Lock password"; WRONG=displays "The Lock password is wrong". Password numeric range UNRESOLVED.'

- id: hd_radio_program
  label: HD Radio Program
  kind: action
  command: "HPR"
  params:
    - name: program
      type: string
      description: 'HD Radio Model Only. "01"-"08": sets directly HD Radio Channel Program'

- id: hd_radio_blend_mode
  label: HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: mode
      type: enum
      values: ["00", "01"]
      description: 'HD Radio Model Only; 00=sets HD Radio Blend Mode "Auto"; 01=sets HD Radio Blend Mode "Analog"'

- id: net_additional_operation
  label: Network/USB Additional Operation
  kind: action
  command: "NTC"
  params:
    - name: operation
      type: enum
      values: ["FF", "REW", "DISPLAY", "ALBUM", "ARTIST", "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT", "DELETE", "CAPS", "LOCATION", "LANGUAGE", "SETUP", "RETURN", "CHUP", "CHDN"]
      description: "Net-Tune Model Only before TX-NR1000; Network Model Only after TX-NR905. FF/REW must be sent continuously, with no more than 100ms delay between codes. CHUP=CH UP(for iRadio); CHDN=CH DOWN(for iRadio); other parameters are the corresponding KEY."

- id: net_digit
  label: Network/USB Digit
  kind: action
  command: "NTC"
  params:
    - name: digit
      type: string
      description: '"0"-"9": 0-9 KEY. Net-Tune Model Only before TX-NR1000; Network Model Only after TX-NR905.'

- id: internet_radio_preset
  label: Internet Radio Preset
  kind: action
  command: "NPR"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: ri_cd_player_operation
  label: RI CD Player Operation
  kind: action
  command: "CCD"
  params:
    - name: operation
      type: string
      description: 'Documented parameters: POWER, TRACK, PLAY, STOP, PAUSE, SKIP.F, SKIP.R, MEMORY, CLEAR, REPEAT, RANDOM, DISP, D.MODE, FF, REW, OP/CL, "0"-"10" (0-10), +10, D.SKIP, DISC.F, DISC.R, "DISC1"-"DISC6" (DISC1-DISC6), STBY, PON. POWER=POWER ON/OFF; TRACK=TRACK+; STBY=STANDBY; PON=POWER ON.'

- id: ri_tape1_operation
  label: RI Tape 1 Operation
  kind: action
  command: "CT1"
  params:
    - name: operation
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]
      description: "PLAY.F=PLAY >; PLAY.R=PLAY <; STOP=STOP; RC/PAU=REC/PAUSE; FF=FF >>; REW=REW <<"

- id: ri_tape2_operation
  label: RI Tape 2 Operation
  kind: action
  command: "CT2"
  params:
    - name: operation
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]
      description: "PLAY.F=PLAY >; PLAY.R=PLAY <; STOP=STOP; RC/PAU=REC/PAUSE; FF=FF >>; REW=REW <<; OP/CL=OPEN/CLOSE; SKIP.F=>>I; SKIP.R=I<<; REC=REC"

- id: ri_equalizer_operation
  label: RI Equalizer Operation
  kind: action
  command: "CEQ"
  params:
    - name: operation
      type: enum
      values: ["POWER", "PRESET"]
      description: "POWER=POWER ON/OFF; PRESET=PRESET"

- id: ri_dat_recorder_operation
  label: RI DAT Recorder Operation
  kind: action
  command: "CDT"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]
      description: "PLAY=PLAY; RC/PAU=REC/PAUSE; STOP=STOP; SKIP.F=>>I; SKIP.R=I<<; FF=FF >>; REW=REW <<"

- id: ri_dvd_player_operation
  label: RI DVD Player Operation
  kind: action
  command: "CDV"
  params:
    - name: operation
      type: string
      description: 'Documented parameters: POWER, PWRON, PWROFF, PLAY, STOP, SKIP.F, SKIP.R, FF, REW, PAUSE, LASTPLAY, SUBTON/OFF, SUBTITLE, SETUP, TOPMENU, MENU, UP, DOWN, LEFT, RIGHT, ENTER, RETURN, DISC.F, DISC.R, AUDIO, RANDOM, OP/CL, ANGLE, "0"-"10" (0-10), SEARCH, DISP, REPEAT, MEMORY, CLEAR, ABR, STEP.F, STEP.R, SLOW.F, SLOW.R, ZOOMTG, ZOOMUP, ZOOMDN, PROGRE, VDOFF, CONMEM, FUNMEM, "DISC1"-"DISC6" (DISC1-DISC6), FOLDUP, FOLDDN, P.MODE, ASCTG, CDPCD, MSPUP, MSPDN, PCT, RSCTG, INIT. POWER=POWER ON/OFF; PWRON=POWER ON; PWROFF=POWER OFF; INIT=Return to Factory Settings.'

- id: ri_md_recorder_operation
  label: RI MD Recorder Operation
  kind: action
  command: "CMD"
  params:
    - name: operation
      type: string
      description: 'Documented parameters: POWER, PLAY, STOP, FF, REW, P.MODE, SKIP.F, SKIP.R, PAUSE, REC, MEMORY, DISP, SCROLL, M.SCAN, CLEAR, RANDOM, REPEAT, ENTER, EJECT, "0"-"10/0" (0-10/0), "nn/nnn" (--/---), NAME, GROUP, STBY. POWER=POWER ON/OFF; STBY=STANDBY. Encoding of nn/nnn beyond the documented token is UNRESOLVED.'

- id: ri_cd_r_recorder_operation
  label: RI CD-R Recorder Operation
  kind: action
  command: "CCR"
  params:
    - name: operation
      type: string
      description: 'Documented parameters: POWER, P.MODE, PLAY, STOP, SKIP.F, SKIP.R, PAUSE, REC, CLEAR, REPEAT, "0"-"10/0" (0-10/0), "nn/nnn" (--/---), SCROLL, OP/CL, DISP, RANDOM, MEMORY, FF, REW, STBY. POWER=POWER ON/OFF; STBY=STANDBY. Encoding of nn/nnn beyond the documented token is UNRESOLVED.'

- id: zone2_tone
  label: Zone 2 Tone
  kind: action
  command: "ZTN"
  params:
    - name: parameter
      type: string
      description: 'Bxx or Txx: xx is "-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Bass Up (2 Step); BDOWN=sets Bass Down(2 Step); TUP=sets Treble Up (2 Step); TDOWN=sets Treble Down(2 Step). Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_balance
  label: Zone 2 Balance
  kind: action
  command: "ZBL"
  params:
    - name: parameter
      type: string
      description: 'xx is "-A"..."00"..."+A"[-10...0...+10 2 step]; UP=sets Balance Up (to R 2 Step); DOWN=sets Balance Down(to L 2 Step). Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_select_source
  label: Zone 2 Select Source
  kind: action
  command: "SLZ"
  params:
    - name: input
      type: enum
      values: ["80"]
      description: "sets SOURCE"

- id: zone2_separate_tuning
  label: Zone 2 Separate Tuning
  kind: action
  command: "TUZ"
  params:
    - name: frequency
      type: string
      description: "nnnnn=sets Directly Tuning Frequency; frequency range UNRESOLVED. UP=sets Tuning Frequency Wrap-Around Up; DOWN=sets Tuning Frequency Wrap-Around Down. The TUNER function is shared by the MAIN and ZONE side. But control is separated."

- id: zone2_separate_preset
  label: Zone 2 Separate Preset
  kind: action
  command: "PRZ"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); UP=sets Preset No. Wrap-Around Up; DOWN=sets Preset No. Wrap-Around Down'

- id: zone2_net_tune_operation
  label: Zone 2 Net-Tune Operation
  kind: action
  command: "NTC"
  params:
    - name: operation
      type: enum
      values: ["PLAYz", "STOPz", "PAUSEz", "TRUPz", "TRDNz"]
      description: "Net-Tune Model Only, Zone2; PLAYz=PLAY KEY; STOPz=STOP KEY; PAUSEz=PAUSE KEY; TRUPz=TRACK UP KEY; TRDNz=TRACK DOWN KEY. Lowercase z is literal."

- id: zone2_network_operation
  label: Zone 2 Network Operation
  kind: action
  command: "NTZ"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: "Network Model Only, Zone2; PLAY=PLAY KEY; STOP=STOP KEY; PAUSE=PAUSE KEY; TRUP=TRACK UP KEY; TRDN=TRACK DOWN KEY; CHUP=CH UP(for iRadio); CHDN=CH DOWN(for iRadio)"

- id: zone2_internet_radio_preset
  label: Zone 2 Internet Radio Preset
  kind: action
  command: "NPZ"
  params:
    - name: preset
      type: string
      description: 'Network Model Only, Zone2. "01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: zone2_listening_mode
  label: Zone 2 Listening Mode
  kind: action
  command: "LMZ"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "0F", "12", "87", "88"]
      description: "00=sets STEREO; 01=sets DIRECT; 0F=sets MONO; 12=sets MULTIPLEX; 87=sets DVS(Pl2); 88=sets DVS(NEO6)"

- id: zone2_late_night
  label: Zone 2 Late Night
  kind: action
  command: "LTZ"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=sets Late Night Off; 01=sets Late Night Low; 02=sets Late Night High; UP=sets Late Night State Wrap-Around Up"

- id: zone2_re_eq_filter
  label: Zone 2 Re-EQ Filter
  kind: action
  command: "RAZ"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=sets Both Off; 01=sets Re-EQ On; 02=sets Academy On; UP=sets Re-EQ/Academy State Wrap-Around Up"

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  command: "MT3"
  params:
    - name: state
      type: enum
      values: ["TG"]
      description: "sets Zone3 Muting Wrap-Around"

- id: zone3_tone
  label: Zone 3 Tone
  kind: action
  command: "TN3"
  params:
    - name: parameter
      type: string
      description: 'Bxx or Txx: xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; BUP=sets Bass Up (2 Step); BDOWN=sets Bass Down (2 Step); TUP=sets Treble Up (2 Step); TDOWN=sets Treble Down (2 Step)'

- id: zone3_balance
  label: Zone 3 Balance
  kind: action
  command: "BL3"
  params:
    - name: parameter
      type: string
      description: 'xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; UP=sets Balance Up (to R 2 Step); DOWN=sets Balance Down (to L 2 Step)'

- id: zone3_select_source
  label: Zone 3 Select Source
  kind: action
  command: "SL3"
  params:
    - name: input
      type: enum
      values: ["80"]
      description: "sets SOURCE"

- id: zone3_separate_tuning
  label: Zone 3 Separate Tuning
  kind: action
  command: "TU3"
  params:
    - name: frequency
      type: string
      description: "nnnnn=sets Directly Tuning Frequency; frequency range UNRESOLVED. UP=sets Tuning Frequency Wrap-Around Up; DOWN=sets Tuning Frequency Wrap-Around Down. The TUNER function is shared by the MAIN and ZONE side. But control is separated."

- id: zone3_separate_preset
  label: Zone 3 Separate Preset
  kind: action
  command: "PR3"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); UP=sets Preset No. Wrap-Around Up; DOWN=sets Preset No. Wrap-Around Down'

- id: zone3_network_operation
  label: Zone 3 Network Operation
  kind: action
  command: "NT3"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: "Network Model Only, Zone3; PLAY=PLAY KEY; STOP=STOP KEY; PAUSE=PAUSE KEY; TRUP=TRACK UP KEY; TRDN=TRACK DOWN KEY; CHUP=CH UP(for iRadio); CHDN=CH DOWN(for iRadio)"

- id: zone3_internet_radio_preset
  label: Zone 3 Internet Radio Preset
  kind: action
  command: "NP3"
  params:
    - name: preset
      type: string
      description: 'Network Model Only, Zone3. "01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: zone4_mute_toggle
  label: Zone 4 Mute Toggle
  kind: action
  command: "MT4"
  params:
    - name: state
      type: enum
      values: ["TG"]
      description: "sets Zone4 Muting Wrap-Around"

- id: zone4_select_source
  label: Zone 4 Select Source
  kind: action
  command: "SL4"
  params:
    - name: input
      type: enum
      values: ["80"]
      description: "sets SOURCE"

- id: zone4_separate_tuning
  label: Zone 4 Separate Tuning
  kind: action
  command: "TU4"
  params:
    - name: frequency
      type: string
      description: "nnnnn=sets Directly Tuning Frequency; frequency range UNRESOLVED. UP=sets Tuning Frequency Wrap-Around Up; DOWN=sets Tuning Frequency Wrap-Around Down. The TUNER function is shared by the MAIN and ZONE side. But control is separated."

- id: zone4_separate_preset
  label: Zone 4 Separate Preset
  kind: action
  command: "PR4"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); UP=sets Preset No. Wrap-Around Up; DOWN=sets Preset No. Wrap-Around Down'

- id: zone4_network_operation
  label: Zone 4 Network Operation
  kind: action
  command: "NT4"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN"]
      description: "Network Model Only, Zone4; PLAY=PLAY KEY; STOP=STOP KEY; PAUSE=PAUSE KEY; TRUP=TRACK UP KEY; TRDN=TRACK DOWN KEY"

- id: zone4_internet_radio_preset
  label: Zone 4 Internet Radio Preset
  kind: action
  command: "NP4"
  params:
    - name: preset
      type: string
      description: 'Network Model Only, Zone4. "01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

- id: ri_dock_operation
  label: RI Dock Operation
  kind: action
  command: "CDS"
  params:
    - name: operation
      type: enum
      values: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
      description: "Via RI; PWRON=sets Dock On; PWROFF=sets Dock Standby; PLY/RES=PLAY/RESUME Key; STOP=STOP Key; SKIP.F=TRACK UP Key; SKIP.R=TRACK DOWN Key; PAUSE=PAUSE Key; PLY/PAU=PLAY/PAUSE Key; FF=FF Key; REW=FR Key; ALBUM+=ALBUM UP Key; ALBUM-=ALBUM DOWN Key; PLIST+=PLAYLIST UP Key; PLIST-=PLAYLIST DOWN Key; CHAPT+=CHAPTER UP Key; CHAPT-=CHAPTER DOWN Key; RANDOM=SHUFFLE Key; REPEAT=REPEAT Key; MUTE=MUTE Key; BLIGHT=BACKLIGHT Key; MENU=MENU Key; ENTER=SELECT Key; UP=CURSOR UP Key; DOWN=CURSOR DOWN Key"
```

## Feedbacks
```yaml
# Query any command by appending "QSTN" as the parameter.
# Device returns current state as a status message.
# Example: "!1PWRQSTN" -> "!1PWR01" (power on)

- id: power_state
  label: System Power State
  type: enum
  command: "!1PWRQSTN"
  query_command: "!1PWRQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: mute_state
  label: Audio Mute State
  type: enum
  command: "!1AMTQSTN"
  query_command: "!1AMTQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": unmuted
    "01": muted

- id: volume_level
  label: Master Volume Level
  type: string
  command: "!1MVLQSTN"
  query_command: "!1MVLQSTN"
  description: "Returns hex value (00-64 or 00-50 depending on model)"

- id: input_selected
  label: Selected Input
  type: string
  command: "!1SLIQSTN"
  query_command: "!1SLIQSTN"
  description: "Returns hex input code matching SLI parameter values"

- id: listening_mode
  label: Listening Mode
  type: string
  command: "!1LMDQSTN"
  query_command: "!1LMDQSTN"
  description: "Returns hex listening mode code"

- id: zone2_power_state
  label: Zone 2 Power State
  type: enum
  command: "!1ZPWQSTN"
  query_command: "!1ZPWQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: zone2_mute_state
  label: Zone 2 Mute State
  type: enum
  command: "!1ZMTQSTN"
  query_command: "!1ZMTQSTN"
  values: ["00", "01"]
  value_meaning:
    "00": unmuted
    "01": muted

- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: string
  command: "!1ZVLQSTN"
  query_command: "!1ZVLQSTN"
  description: "Returns hex value"

- id: zone2_input_selected
  label: Zone 2 Selected Input
  type: string
  command: "!1SLZQSTN"
  query_command: "!1SLZQSTN"
  description: "Returns hex input code"

- id: zone3_power_state
  label: Zone 3 Power State
  type: enum
  command: "!1PW3QSTN"
  query_command: "!1PW3QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: string
  command: "!1VL3QSTN"
  query_command: "!1VL3QSTN"

- id: zone3_input_selected
  label: Zone 3 Selected Input
  type: string
  command: "!1SL3QSTN"
  query_command: "!1SL3QSTN"

- id: zone4_power_state
  label: Zone 4 Power State
  type: enum
  command: "!1PW4QSTN"
  query_command: "!1PW4QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": standby
    "01": on

- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: string
  command: "!1VL4QSTN"
  query_command: "!1VL4QSTN"

- id: zone4_input_selected
  label: Zone 4 Selected Input
  type: string
  command: "!1SL4QSTN"
  query_command: "!1SL4QSTN"

- id: audio_info
  label: Audio Information
  type: string
  command: "!1IFAQSTN"
  query_command: "!1IFAQSTN"
  description: "Audio program info (same as front-panel display)"

- id: video_info
  label: Video Information
  type: string
  command: "!1IFVQSTN"
  query_command: "!1IFVQSTN"
  description: "Video format info (same as front-panel display)"

- id: net_play_status
  label: Network/USB Play Status
  type: string
  command: "!1NSTQSTN"
  query_command: "!1NSTQSTN"
  description: "Three-character status: play status (S=STOP, P=Play, p=Pause, F=FF, R=FR), repeat status, and shuffle status"

- id: net_track_info
  label: Network/USB Track Info
  type: string
  command: "!1NTRQSTN"
  query_command: "!1NTRQSTN"
  description: "Format: cccc/tttt (current/total)"

- id: net_time_info
  label: Network/USB Time Info
  type: string
  command: "!1NTMQSTN"
  query_command: "!1NTMQSTN"
  description: "Format: mm:ss/mm:ss (elapsed/total)"

# UNRESOLVED: Feedbacks for tone (TFR, ZTN, TN3), sleep timer (SLP), dimmer (DIM),
# Audyssey settings, late night, trigger states, HDMI output, resolution, etc.

# For appended Feedbacks, command is the literal source opcode and
# query_command is its explicitly documented QSTN parameter.
# Frame "!" + "1" + command + query_command + end_char.
# Sleep and dimmer queries are already represented in Variables.
# No trigger query is added: TGA/TGB/TGC tables do not document QSTN.

- id: speaker_a_state
  label: Speaker A State
  type: enum
  command: "SPA"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": off
    "01": on

- id: speaker_b_state
  label: Speaker B State
  type: enum
  command: "SPB"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": off
    "01": on

- id: speaker_layout_state
  label: Speaker Layout State
  type: enum
  command: "SPL"
  query_command: "QSTN"
  values: ["SB", "FH", "FW"]
  value_meaning:
    "SB": SurrBack Speaker
    "FH": Front High Speaker / SurrBack+Front High Speakers
    "FW": Front Wide Speaker / SurrBack+Front Wide Speakers

- id: front_tone_state
  label: Front Tone State
  type: string
  command: "TFR"
  query_command: "QSTN"
  description: 'gets Front Tone ("BxxTxx"); xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: front_wide_tone_state
  label: Front Wide Tone State
  type: string
  command: "TFW"
  query_command: "QSTN"
  description: 'gets Front Wide Tone ("BxxTxx"); xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: front_high_tone_state
  label: Front High Tone State
  type: string
  command: "TFH"
  query_command: "QSTN"
  description: 'gets Front High Tone ("BxxTxx"); xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: center_tone_state
  label: Center Tone State
  type: string
  command: "TCT"
  query_command: "QSTN"
  description: 'gets Center Tone ("BxxTxx"); xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: surround_tone_state
  label: Surround Tone State
  type: string
  command: "TSR"
  query_command: "QSTN"
  description: 'gets Surround Tone ("BxxTxx"); xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: surround_back_tone_state
  label: Surround Back Tone State
  type: string
  command: "TSB"
  query_command: "QSTN"
  description: 'gets Surround Back Tone ("BxxTxx"); xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: subwoofer_tone_state
  label: Subwoofer Tone State
  type: string
  command: "TSW"
  query_command: "QSTN"
  description: 'gets Subwoofer Tone ("BxxTxx") as written in source; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]. No treble setter is documented.'

- id: subwoofer_temporary_level_state
  label: Subwoofer Temporary Level State
  type: string
  command: "SWL"
  query_command: "QSTN"
  description: 'gets the Subwoofer Level; "-F"-"00"-"+C": -15dB-0dB-+12dB'

- id: center_temporary_level_state
  label: Center Temporary Level State
  type: string
  command: "CTL"
  query_command: "QSTN"
  description: 'gets the Center Level; "-C"-"00"-"+C": -12dB-0dB-+12dB'

- id: display_mode_state
  label: Display Mode State
  type: string
  command: "DIF"
  query_command: "QSTN"
  description: "gets The Display Mode; persistent modes documented as 00=Selector + Volume and 01=Selector + Listening Mode. Complete returned-value range UNRESOLVED."

- id: recout_selected
  label: RECOUT Selected
  type: enum
  command: "SLR"
  query_command: "QSTN"
  values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80"]
  description: "gets The Selector Position; meanings match the SLR action parameters"

- id: audio_selector_state
  label: Audio Selector State
  type: enum
  command: "SLA"
  query_command: "QSTN"
  values: ["00", "01", "02", "03", "04", "05", "06"]
  description: "gets The Audio Selector Status; meanings match the existing SLA action parameters"

- id: video_output_state
  label: Video Output State
  type: enum
  command: "VOS"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": D4
    "01": Component

- id: hdmi_output_state
  label: HDMI Output State
  type: enum
  command: "HDO"
  query_command: "QSTN"
  values: ["00", "01", "02", "03", "04", "05"]
  description: "gets The HDMI Out Selector; meanings match the existing HDO action parameters"

- id: resolution_state
  label: Resolution State
  type: enum
  command: "RES"
  query_command: "QSTN"
  values: ["00", "01", "02", "03", "04", "05", "06", "07"]
  description: "gets The Monitor Out Resolution; meanings match the existing RES action parameters"

- id: isf_mode_state
  label: ISF Mode State
  type: enum
  command: "ISF"
  query_command: "QSTN"
  values: ["00", "01", "02"]
  value_meaning:
    "00": Custom
    "01": Day
    "02": Night

- id: late_night_state
  label: Late Night State
  type: enum
  command: "LTN"
  query_command: "QSTN"
  values: ["00", "01", "02", "03"]
  description: "gets The Late Night Level; meanings depend on DolbyDigital or Dolby TrueHD as documented in the LTN table"

- id: re_eq_filter_state
  label: Re-EQ Filter State
  type: enum
  command: "RAS"
  query_command: "QSTN"
  values: ["00", "01", "02"]
  description: "Re-EQ/Academy table: 00=Both Off; 01=Re-EQ On; 02=Academy On. Re-EQ-only and Cinema Filter tables document 00=Off and 01=On. Model mapping is UNRESOLVED."

- id: audyssey_eq_state
  label: Audyssey EQ State
  type: enum
  command: "ADY"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": off
    "01": on

- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  type: enum
  command: "ADQ"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": off
    "01": on

- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  type: enum
  command: "ADV"
  query_command: "QSTN"
  values: ["00", "01", "02", "03"]
  value_meaning:
    "00": Off
    "01": Light
    "02": Medium
    "03": Heavy

- id: dolby_volume_state
  label: Dolby Volume State
  type: enum
  command: "DVL"
  query_command: "QSTN"
  values: ["00", "01", "02", "03"]
  value_meaning:
    "00": Off
    "01": Low
    "02": Mid
    "03": High

- id: music_optimizer_state
  label: Music Optimizer State
  type: enum
  command: "MOT"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": off
    "01": on

- id: tuner_frequency
  label: Tuner Frequency
  type: string
  command: "TUN"
  query_command: "QSTN"
  description: "Include Tuner Pack Model Only; gets The Tuning Frequency; FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch; frequency range UNRESOLVED. Shared MAIN/ZONE query represented once."

- id: tuner_preset_state
  label: Tuner Preset State
  type: string
  command: "PRS"
  query_command: "QSTN"
  description: 'gets The Preset No.; "01"-"28": Preset No. 1-40 (In hexadecimal representation); "01"-"1E": Preset No. 1-30 (In hexadecimal representation). Shared MAIN/Zone2 query represented once.'

- id: xm_channel_name
  label: XM Channel Name
  type: string
  command: "XCN"
  query_command: "QSTN"
  description: "XM Model Only; nnnnnnnnnn=XM Channel Name; length range UNRESOLVED"

- id: xm_artist_name
  label: XM Artist Name
  type: string
  command: "XAT"
  query_command: "QSTN"
  description: "XM Model Only; nnnnnnnnnn=XM Artist Name; length range UNRESOLVED"

- id: xm_title
  label: XM Title
  type: string
  command: "XTI"
  query_command: "QSTN"
  description: "XM Model Only; nnnnnnnnnn=XM Title; length range UNRESOLVED"

- id: xm_channel_number
  label: XM Channel Number
  type: string
  command: "XCH"
  query_command: "QSTN"
  description: 'XM Model Only; "000"-"255": XM Channel Number "000-255"'

- id: xm_category
  label: XM Category
  type: string
  command: "XCT"
  query_command: "QSTN"
  description: "XM Model Only; nnnnnnnnnn=XM Category Info; length range UNRESOLVED"

- id: sirius_channel_name
  label: SIRIUS Channel Name
  type: string
  command: "SCN"
  query_command: "QSTN"
  description: "SIRIUS Model Only; nnnnnnnnnn=SIRIUS Channel Name; length range UNRESOLVED"

- id: sirius_artist_name
  label: SIRIUS Artist Name
  type: string
  command: "SAT"
  query_command: "QSTN"
  description: "SIRIUS Model Only; nnnnnnnnnn=SIRIUS Artist Name; length range UNRESOLVED"

- id: sirius_title
  label: SIRIUS Title
  type: string
  command: "STI"
  query_command: "QSTN"
  description: "SIRIUS Model Only; nnnnnnnnnn=SIRIUS Title; length range UNRESOLVED"

- id: sirius_channel_number
  label: SIRIUS Channel Number
  type: string
  command: "SCH"
  query_command: "QSTN"
  description: 'SIRIUS Model Only; "000"-"255": SIRIUS Channel Number "000-255"'

- id: sirius_category
  label: SIRIUS Category
  type: string
  command: "SCT"
  query_command: "QSTN"
  description: "SIRIUS Model Only; nnnnnnnnnn=SIRIUS Category Info; length range UNRESOLVED"

- id: hd_radio_artist_name
  label: HD Radio Artist Name
  type: string
  command: "HAT"
  query_command: "QSTN"
  description: "HD Radio Model Only; HD Radio Artist Name (variable-length, 64 digits max)"

- id: hd_radio_channel_name
  label: HD Radio Channel Name
  type: string
  command: "HCN"
  query_command: "QSTN"
  description: "HD Radio Model Only; HD Radio Channel Name (Station Name) (7 digits)"

- id: hd_radio_title
  label: HD Radio Title
  type: string
  command: "HTI"
  query_command: "QSTN"
  description: "HD Radio Model Only; HD Radio Title (variable-length, 64 digits max)"

- id: hd_radio_detail_info
  label: HD Radio Detail Info
  type: string
  command: "HDS"
  query_command: "QSTN"
  description: "HD Radio Model Only; source labels HDS as Detail Info but documents nnnnnnnnnn=HD Radio Title and QSTN=gets HD Radio Title; length range UNRESOLVED"

- id: hd_radio_program_state
  label: HD Radio Program State
  type: string
  command: "HPR"
  query_command: "QSTN"
  description: 'HD Radio Model Only; "01"-"08": HD Radio Channel Program'

- id: hd_radio_blend_state
  label: HD Radio Blend State
  type: enum
  command: "HBL"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": Auto
    "01": Analog

- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  type: string
  command: "HTS"
  query_command: "QSTN"
  description: 'HD Radio Model Only; mmnnoo: HD Radio Tuner Status (3 bytes); mm -> "00" not HD, "01" HD; nn -> current Program "01"-"08"; oo -> receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.)'

- id: net_artist_name
  label: Network/USB Artist Name
  type: string
  command: "NAT"
  query_command: "QSTN"
  description: "Net/USB Artist Name (variable-length, 64 letters max ASCII letter)"

- id: net_album_name
  label: Network/USB Album Name
  type: string
  command: "NAL"
  query_command: "QSTN"
  description: "Net/USB Album Name (variable-length, 64 letters max ASCII letter)"

- id: net_title_name
  label: Network/USB Title Name
  type: string
  command: "NTI"
  query_command: "QSTN"
  description: "Net/USB Title Name (variable-length, 64 letters max ASCII letter)"

- id: zone2_tone_state
  label: Zone 2 Tone State
  type: string
  command: "ZTN"
  query_command: "QSTN"
  description: 'gets Zone2 Tone("BxxTxx"); xx is "-A"..."00"..."+A"[-10...0...+10 2 step]. Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_balance_state
  label: Zone 2 Balance State
  type: string
  command: "ZBL"
  query_command: "QSTN"
  description: 'gets Zone2 Balance; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]. Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_separate_frequency
  label: Zone 2 Separate Frequency
  type: string
  command: "TUZ"
  query_command: "QSTN"
  description: "gets The Tuning Frequency; nnnnn format; frequency range UNRESOLVED. Shared tuner function with separated control."

- id: zone2_separate_preset_state
  label: Zone 2 Separate Preset State
  type: string
  command: "PRZ"
  query_command: "QSTN"
  description: 'gets The Preset No.; "01"-"28": Preset No. 1-40 (In hexadecimal representation)'

- id: zone2_late_night_state
  label: Zone 2 Late Night State
  type: enum
  command: "LTZ"
  query_command: "QSTN"
  values: ["00", "01", "02"]
  value_meaning:
    "00": Off
    "01": Low
    "02": High

- id: zone2_re_eq_filter_state
  label: Zone 2 Re-EQ Filter State
  type: enum
  command: "RAZ"
  query_command: "QSTN"
  values: ["00", "01", "02"]
  value_meaning:
    "00": Both Off
    "01": Re-EQ On
    "02": Academy On

- id: zone3_mute_state
  label: Zone 3 Mute State
  type: enum
  command: "MT3"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": unmuted
    "01": muted

- id: zone3_tone_state
  label: Zone 3 Tone State
  type: string
  command: "TN3"
  query_command: "QSTN"
  description: 'gets Zone3 Tone ("BxxTxx"); xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: zone3_balance_state
  label: Zone 3 Balance State
  type: string
  command: "BL3"
  query_command: "QSTN"
  description: 'gets Zone3 Balance; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: zone3_separate_frequency
  label: Zone 3 Separate Frequency
  type: string
  command: "TU3"
  query_command: "QSTN"
  description: "gets The Tuning Frequency; nnnnn format; frequency range UNRESOLVED. Shared tuner function with separated control."

- id: zone3_separate_preset_state
  label: Zone 3 Separate Preset State
  type: string
  command: "PR3"
  query_command: "QSTN"
  description: 'gets The Preset No.; "01"-"28": Preset No. 1-40 (In hexadecimal representation)'

- id: zone4_mute_state
  label: Zone 4 Mute State
  type: enum
  command: "MT4"
  query_command: "QSTN"
  values: ["00", "01"]
  value_meaning:
    "00": unmuted
    "01": muted

- id: zone4_separate_frequency
  label: Zone 4 Separate Frequency
  type: string
  command: "TU4"
  query_command: "QSTN"
  description: "gets The Tuning Frequency; nnnnn format; frequency range UNRESOLVED. Shared tuner function with separated control."

- id: zone4_separate_preset_state
  label: Zone 4 Separate Preset State
  type: string
  command: "PR4"
  query_command: "QSTN"
  description: 'gets The Preset No.; "01"-"28": Preset No. 1-40 (In hexadecimal representation)'
```

## Variables
```yaml
- id: master_volume
  label: Master Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1MVL{value}"
  query_command: "!1MVLQSTN"
  description: "Volume 0-100 in hex (00-64). Some models 0-80 (00-50)."

- id: zone2_volume
  label: Zone 2 Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1ZVL{value}"
  query_command: "!1ZVLQSTN"

- id: zone3_volume
  label: Zone 3 Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1VL3{value}"
  query_command: "!1VL3QSTN"

- id: zone4_volume
  label: Zone 4 Volume
  type: integer
  min: 0
  max: 100
  unit: "level (hex-encoded)"
  set_command: "!1VL4{value}"
  query_command: "!1VL4QSTN"

- id: sleep_timer
  label: Sleep Timer
  type: integer
  min: 0
  max: 90
  unit: minutes
  set_command: "!1SLP{value}"
  query_command: "!1SLPQSTN"
  description: "Hex 01-5A (1-90 min). Send OFF to disable."

- id: dimmer_level
  label: Front Panel Dimmer
  type: enum
  values: ["00", "01", "02", "03", "08"]
  value_meaning:
    "00": bright
    "01": dim
    "02": dark
    "03": shut-off
    "08": bright & LED off
  set_command: "!1DIM{value}"
  query_command: "!1DIMQSTN"
```

## Events
```yaml
# The receiver sends unsolicited status notifications when state changes.
# Format: "!1" + 3-char command + parameter value
# Example: "!1SLI03" when input changes to AUX1
# The controller must maintain a persistent TCP connection to receive these.
# Only one client connection is supported at a time.

- id: status_notification
  label: Unsolicited Status Change
  type: string
  description: >-
    Sent when receiver state changes autonomously (e.g. front-panel button press,
    remote control, internal timer). Format is identical to query response:
    "!1" + command + parameter. Covers all QSTN-addressable commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >-
      Only one TCP client connection allowed at a time. A new connection
      will disconnect the previous client, preventing it from receiving
      event notifications.
  - description: >-
      Zone 2 volume/tone commands only work when main zone is ON and
      Zone 2 is powered or set to variable output.
# UNRESOLVED: full power-on sequencing requirements not stated in source
# UNRESOLVED: fault behavior and error recovery not documented
```

## Notes

**ISCP Message Format (RS-232):** `"!" + unit_type + command(3 chars) + parameter + [CR|LF|CR LF]`. Unit type `"1"` for receivers.

**eISCP Packet Format (TCP):** Binary header followed by ISCP data. Header is 16 bytes: magic `"ISCP"` (4B), header size `0x00000010` (4B, big-endian), data size (4B, big-endian), version `0x01` (1B), reserved `0x000000` (3B). Data payload is the ISCP message terminated with `[EOF]` (0x1A), optionally followed by `[CR]` or `[CR][LF]`, depending on model.

**Query convention:** Append `QSTN` as the parameter to any command to query its current value. The receiver responds with a status message containing the current parameter value.

**Timing constraints:**
- Minimum 50ms between received messages.
- Receiver responds within 50ms; if no response, communication has failed.
- Persistent TCP connection required to receive unsolicited event notifications.

**Volume encoding:** Volume levels are hex-encoded ASCII. E.g., `MVL0A` sets volume to 10 (decimal). Range depends on model: 00-64 (0-100) or 00-50 (0-80).

**Zone 2/3/4 commands:** The source documents zone-specific command codes: ZPW/ZMT/ZVL/SLZ for Zone 2, PW3/MT3/VL3/SL3 for Zone 3, and PW4/MT4/VL4/SL4 for Zone 4. Applicability to TX-RZ models is UNRESOLVED.

**Network/USB FF/REW:** Must be sent continuously with no more than 100ms between codes.

**Source document version:** ISCP Version 1.15, dated 31 August 2009.

<!-- UNRESOLVED: exact TX-RZ sub-models covered by this protocol version not stated -->
<!-- UNRESOLVED: protocol version compatibility across firmware generations not stated -->
<!-- UNRESOLVED: maximum volume range for TX-RZ models specifically not confirmed -->
<!-- UNRESOLVED: behavior when TCP connection is lost during operation not documented -->
<!-- UNRESOLVED: RS-232 pinout details for DB9 connector (pin 2=TX, pin 3=RX, pin 5=GND, straight-thru cable) -->
<!-- UNRESOLVED: whether TX-RZ series supports Zone 4 commands or if that is limited to specific models -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T11:13:56.778Z
last_checked_at: 2026-10-07T15:43:17.211Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T15:43:17.211Z
matched_actions: 236
action_count: 236
confidence: medium
summary: "All 236 action units match source ISCP tokens and transport values; the generic receiver guide gives the spec full coverage, with TX-RZ applicability only a caveat. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact TX-RZ sub-models covered by this protocol version not stated"
- "firmware version compatibility not stated"
- "the supplied generic receiver guide does not establish TX-RZ compatibility"
- "Tone commands for all speaker zones (TFR, TFW, TFH, TCT, TSR, TSB, TSW, ZTN, TN3)"
- "Tuner commands (TUN, PRS, PRM) and HD Radio commands documented but model-dependent."
- "XM/SIRIUS commands model-dependent."
- "RI System commands (CCD, CT1, CT2, CDV, CMD, CCR, CDS) for external RI devices."
- "RECOUT selector (SLR), ISF mode, Memory setup (MEM), Display commands."
- "Feedbacks for tone (TFR, ZTN, TN3), sleep timer (SLP), dimmer (DIM),"
- "no multi-step sequences described in source"
- "full power-on sequencing requirements not stated in source"
- "fault behavior and error recovery not documented"
- "protocol version compatibility across firmware generations not stated"
- "maximum volume range for TX-RZ models specifically not confirmed"
- "behavior when TCP connection is lost during operation not documented"
- "RS-232 pinout details for DB9 connector (pin 2=TX, pin 3=RX, pin 5=GND, straight-thru cable)"
- "whether TX-RZ series supports Zone 4 commands or if that is limited to specific models"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
