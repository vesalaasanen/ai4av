---
spec_id: admin/integra-dtx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTX Series Control Spec"
manufacturer: Integra
model_family: "DTX Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DTX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:24:57.457Z
last_checked_at: 2026-10-07T13:24:57.457Z
generated_at: 2026-10-07T13:24:57.457Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific DTX sub-models not enumerated in source; source references TX-SR805, TX-NR905, TX-NR1000 as footnotes but does not provide a definitive DTX model list"
  - "exact hex encoding for negative values in tone/balance commands not fully specified"
  - "no explicit multi-step macros defined in source beyond calibration"
  - "no explicit safety warnings or power sequencing requirements found in source"
  - "specific DTX sub-model list not provided in source"
  - "firmware version compatibility not stated in source"
  - "exact hex encoding for tone/balance negative values not fully specified"
  - "eISCP header data_size field calculation (includes or excludes end characters?)"
  - "maximum command string length not stated"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:24:57.457Z
  matched_actions: 234
  action_count: 234
  confidence: medium
  summary: "All 234 action units match source ISCP mnemonics and parameters; transport literal in source; all ~113 source commands represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra DTX Series Control Spec

## Summary
ISCP (Integra Serial Control Protocol) for Integra DTX Series AV Receivers over RS-232C and TCP/IP (eISCP). Commands are 3-character codes with variable-length parameters. The protocol supports command, query (QSTN), and unsolicited event notification from the receiver. Multi-zone (Zone 2, 3, 4) and RI-system passthrough are included.

<!-- UNRESOLVED: specific DTX sub-models not enumerated in source; source references TX-SR805, TX-NR905, TX-NR1000 as footnotes but does not provide a definitive DTX model list -->

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
  connector: DB9 female (pin 2 TX, pin 3 RX, pin 5 GND)
  cable_type: straight-thru
addressing:
  port: 60128
  port_range: "49152-65535"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # PWR, ZPW, PW3, PW4 commands
- queryable       # QSTN parameter on most commands
- levelable       # MVL volume, tone controls, zone volumes
- routable        # SLI input selector, SLZ/SL3/SL4 zone selectors
```

## Actions
```yaml
# ISCP format: !1<CMD><PARAM>[CR|LF|CR+LF] over RS-232C
# eISCP format: binary header + !1<CMD><PARAM>[EOF|EOF+CR|EOF+CR+LF] over TCP
# Unit type "1" = Receiver

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
  label: Audio Mute On
  kind: action
  command: "!1AMT01"
  params: []

- id: mute_off
  label: Audio Mute Off
  kind: action
  command: "!1AMT00"
  params: []

- id: mute_toggle
  label: Audio Mute Toggle
  kind: action
  command: "!1AMTTG"
  params: []

- id: volume_set
  label: Set Master Volume
  kind: action
  command: "!1MVLxx"
  params:
    - name: level
      type: string
      description: "Volume level 0-100 in hex (00-64) or 0-80 in hex (00-50) depending on model"

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

- id: select_input
  label: Select Input
  kind: action
  command: "!1SLIxx"
  params:
    - name: input
      type: enum
      values:
        - "00:VIDEO1/VCR-DVR"
        - "01:VIDEO2/CBL-SAT"
        - "02:VIDEO3/GAME-TV"
        - "03:VIDEO4/AUX1"
        - "04:VIDEO5/AUX2"
        - "05:VIDEO6"
        - "06:VIDEO7"
        - "10:DVD"
        - "20:TAPE1"
        - "21:TAPE2"
        - "22:PHONO"
        - "23:CD"
        - "24:FM"
        - "25:AM"
        - "26:TUNER"
        - "27:MUSIC-SERVER"
        - "28:INTERNET-RADIO"
        - "29:USB-Front"
        - "2A:USB-Rear"
        - "40:Universal-PORT"
        - "30:MULTI-CH"
        - "31:XM"
        - "32:SIRIUS"
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

- id: speaker_a_set
  label: Speaker A Set
  kind: action
  command: "!1SPAxx"
  params:
    - name: state
      type: enum
      values: ["00:off", "01:on"]
      description: Speaker A on/off

- id: speaker_b_set
  label: Speaker B Set
  kind: action
  command: "!1SPBxx"
  params:
    - name: state
      type: enum
      values: ["00:off", "01:on"]
      description: Speaker B on/off

- id: speaker_layout_set
  label: Speaker Layout Set
  kind: action
  command: "!1SPLxx"
  params:
    - name: layout
      type: enum
      values: ["SB:SurrBack", "FH:Front-High", "FW:Front-Wide"]

- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  command: "!1LMDxx"
  params:
    - name: mode
      type: enum
      values:
        - "00:STEREO"
        - "01:DIRECT"
        - "02:SURROUND"
        - "11:PURE-AUDIO"
        - "0F:MONO"
        - "13:FULL-MONO"
        - "0C:ALL-CH-STEREO"
        - "0D:THEATER-DIMENSIONAL"
        - "80:PLII-Movie"
        - "81:PLII-Music"
        - "86:PLII-Game"
        - "90:PLIIz-Height"
      description: Listening mode code in hex (partial list; source contains 50+ modes)

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

- id: late_night_set
  label: Set Late Night Mode
  kind: action
  command: "!1LTNxx"
  params:
    - name: mode
      type: enum
      values: ["00:off", "01:low", "02:high", "03:auto"]

- id: audyssey_set
  label: Set Audyssey EQ
  kind: action
  command: "!1ADYxx"
  params:
    - name: state
      type: enum
      values: ["00:off", "01:on"]

- id: audyssey_dyn_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "!1ADQxx"
  params:
    - name: state
      type: enum
      values: ["00:off", "01:on"]

- id: audyssey_dyn_vol_set
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "!1ADVxx"
  params:
    - name: level
      type: enum
      values: ["00:off", "01:light", "02:medium", "03:heavy"]

- id: tone_front_set
  label: Set Front Tone
  kind: action
  command: "!1TFRBxxTxx"
  params:
    - name: bass
      type: string
      description: "Bass -10 to +10 in 2-step increments (hex: -A to +A)"
    - name: treble
      type: string
      description: "Treble -10 to +10 in 2-step increments (hex: -A to +A)"

- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  command: "!1DIMxx"
  params:
    - name: level
      type: enum
      values: ["00:bright", "01:dim", "02:dark", "03:shut-off", "08:bright-LED-OFF"]

- id: sleep_set
  label: Set Sleep Timer
  kind: action
  command: "!1SLPxx"
  params:
    - name: minutes
      type: string
      description: "1-90 min in hex (01-5A), or OFF"

- id: display_mode_set
  label: Set Display Mode
  kind: action
  command: "!1DIFxx"
  params:
    - name: mode
      type: enum
      values: ["00:selector-volume", "01:selector-listening-mode"]

- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  command: "!1SLAxx"
  params:
    - name: selector
      type: enum
      values: ["00:AUTO", "01:MULTI-CHANNEL", "02:ANALOG", "04:HDMI", "05:COAX-OPT"]

- id: hdmi_output_set
  label: Set HDMI Output
  kind: action
  command: "!1HDOxx"
  params:
    - name: output
      type: enum
      values: ["00:No-Analog", "01:Main", "02:Sub", "03:Both", "04:Both-Main", "05:Both-Sub"]

- id: resolution_set
  label: Set Monitor Out Resolution
  kind: action
  command: "!1RESxx"
  params:
    - name: resolution
      type: enum
      values: ["00:Through", "01:Auto", "02:480p", "03:720p", "04:1080i", "05:1080p", "07:1080p-24fs", "06:Source"]

- id: trigger_a_set
  label: Set 12V Trigger A
  kind: action
  command: "!1TGAxx"
  params:
    - name: state
      type: enum
      values: ["00:off", "01:on"]

- id: trigger_b_set
  label: Set 12V Trigger B
  kind: action
  command: "!1TGBxx"
  params:
    - name: state
      type: enum
      values: ["00:off", "01:on"]

- id: trigger_c_set
  label: Set 12V Trigger C
  kind: action
  command: "!1TGCxx"
  params:
    - name: state
      type: enum
      values: ["00:off", "01:on"]

- id: net_play
  label: Net/USB Play
  kind: action
  command: "!1NTCPLAY"
  params: []

- id: net_stop
  label: Net/USB Stop
  kind: action
  command: "!1NTCSTOP"
  params: []

- id: net_pause
  label: Net/USB Pause
  kind: action
  command: "!1NTCPAUSE"
  params: []

- id: net_track_up
  label: Net/USB Track Up
  kind: action
  command: "!1NTCTRUP"
  params: []

- id: net_track_down
  label: Net/USB Track Down
  kind: action
  command: "!1NTCTRDN"
  params: []

- id: net_repeat
  label: Net/USB Repeat
  kind: action
  command: "!1NTCREPEAT"
  params: []

- id: net_random
  label: Net/USB Random
  kind: action
  command: "!1NTCRANDOM"
  params: []

# Zone 2 Actions
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

- id: zone2_volume_set
  label: Set Zone 2 Volume
  kind: action
  command: "!1ZVLxx"
  params:
    - name: level
      type: string
      description: "Volume level in hex (00-64 for 0-100 or 00-50 for 0-80)"

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
  command: "!1SLZxx"
  params:
    - name: input
      type: string
      description: "Input selector code in hex (same codes as main SLI, plus 80=SOURCE)"

# Zone 3 Actions
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
  label: Set Zone 3 Volume
  kind: action
  command: "!1VL3xx"
  params:
    - name: level
      type: string
      description: "Volume level in hex"

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: "!1SL3xx"
  params:
    - name: input
      type: string
      description: "Input selector code in hex"

# Zone 4 Actions
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
  label: Zone 4 Mute Off
  kind: action
  command: "!1MT400"
  params: []

- id: zone4_volume_set
  label: Set Zone 4 Volume
  kind: action
  command: "!1VL4xx"
  params:
    - name: level
      type: string
      description: "Volume level in hex"

- id: zone4_select_input
  label: Zone 4 Select Input
  kind: action
  command: "!1SL4xx"
  params:
    - name: input
      type: string
      description: "Input selector code in hex"

# Memory
- id: memory_store
  label: Store Memory
  kind: action
  command: "!1MEMSTR"
  params: []

- id: memory_recall
  label: Recall Memory
  kind: action
  command: "!1MEMRCL"
  params: []

- id: memory_lock
  label: Lock Memory
  kind: action
  command: "!1MEMLOCK"
  params: []

- id: memory_unlock
  label: Unlock Memory
  kind: action
  command: "!1MEMUNLK"
  params: []

# OSD Navigation
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

# Additional source commands are literal mnemonics; params supply the documented parameter tokens.
- id: speaker_a_wrap
  label: Speaker A Wrap
  kind: action
  command: "SPA"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: speaker_b_wrap
  label: Speaker B Wrap
  kind: action
  command: "SPB"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: speaker_layout_wrap
  label: Speaker Layout Wrap
  kind: action
  command: "SPL"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: tone_front_operation
  label: Front Tone Operation
  kind: action
  command: "TFR"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_front_wide_operation
  label: Front Wide Tone Operation
  kind: action
  command: "TFW"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_front_high_operation
  label: Front High Tone Operation
  kind: action
  command: "TFH"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_center_operation
  label: Center Tone Operation
  kind: action
  command: "TCT"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_surround_operation
  label: Surround Tone Operation
  kind: action
  command: "TSR"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_surround_back_operation
  label: Surround Back Tone Operation
  kind: action
  command: "TSB"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_subwoofer_operation
  label: Subwoofer Tone Operation
  kind: action
  command: "TSW"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "BUP", "BDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: sleep_wrap
  label: Sleep Timer Wrap
  kind: action
  command: "SLP"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: speaker_level_calibration
  label: Speaker Level Calibration
  kind: action
  command: "SLC"
  params:
    - name: operation
      type: enum
      values: ["TEST", "CHSEL", "UP", "DOWN"]

- id: subwoofer_level_operation
  label: Subwoofer Level Operation
  kind: action
  command: "SWL"
  params:
    - name: parameter
      type: string
      description: '"-F"-"00"-"+C": sets Subwoofer Level -15dB-0dB-+12dB; "UP", "DOWN"'

- id: center_level_operation
  label: Center Level Operation
  kind: action
  command: "CTL"
  params:
    - name: parameter
      type: string
      description: '"-C"-"00"-"+C": sets Center Level -12dB-0dB-+12dB; "UP", "DOWN"'

- id: display_additional_operation
  label: Additional Display Operation
  kind: action
  command: "DIF"
  params:
    - name: operation
      type: enum
      values: ["02", "03", "04", "TG"]
      description: 'Display Information: "02" Display Digital Format Position, "03" Display Bass Level, "04" Display Treble Level. Display Mode: "02" Display Digital Format(temporary display), "03" Display Video Format(temporary display), "TG" sets Display Mode Wrap-Around Up. Meaning depends on model.'

- id: dimmer_wrap
  label: Dimmer Level Wrap
  kind: action
  command: "DIM"
  params:
    - name: operation
      type: enum
      values: ["DIM"]

- id: osd_adjust
  label: OSD Adjust
  kind: action
  command: "OSD"
  params:
    - name: operation
      type: enum
      values: ["AUDIO", "VIDEO"]

- id: recout_selector_set
  label: Set RECOUT Selector
  kind: action
  command: "SLR"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80"]
      description: '"00" VIDEO1; "01" VIDEO2; "02" VIDEO3; "03" VIDEO4; "04" VIDEO5; "05" VIDEO6; "06" VIDEO7; "10" DVD; "20" TAPE(1); "21" TAPE2; "22" PHONO; "23" CD; "24" FM; "25" AM; "26" TUNER; "27" MUSIC SERVER; "28" INTERNET RADIO; "30" MULTI CH; "31" XM; "7F" OFF; "80" SOURCE'

- id: audio_selector_additional_operation
  label: Additional Audio Selector Operation
  kind: action
  command: "SLA"
  params:
    - name: selector
      type: enum
      values: ["03", "06", "UP"]
      description: '"03" sets iLINK; "06" sets BALANCE; "UP" sets Audio Selector Wrap-Around Up'

- id: video_output_set
  label: Set Video Output
  kind: action
  command: "VOS"
  params:
    - name: output
      type: enum
      values: ["00", "01"]
      description: 'Japanese Model Only; "00" sets D4; "01" sets Component'

- id: hdmi_output_wrap
  label: HDMI Output Wrap
  kind: action
  command: "HDO"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: resolution_wrap
  label: Monitor Out Resolution Wrap
  kind: action
  command: "RES"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: isf_mode_operation
  label: ISF Mode Operation
  kind: action
  command: "ISF"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: '"00" sets ISF Mode Custom; "01" sets ISF Mode Day; "02" sets ISF Mode Night; "UP" sets ISF Mode State Wrap-Around Up'

- id: listening_mode_additional_operation
  label: Additional Listening Mode Operation
  kind: action
  command: "LMD"
  params:
    - name: mode
      type: enum
      values: ["03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0E", "12", "14", "15", "16", "40", "41", "42", "43", "44", "45", "50", "51", "52", "82", "83", "84", "85", "87", "88", "89", "8A", "8B", "8C", "8D", "8E", "8F", "91", "92", "93", "94", "95", "96", "97", "98", "99", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "MOVIE", "MUSIC", "GAME"]
      description: 'Additional source LMD codes; "MOVIE", "MUSIC", "GAME" each sets Listening Mode Wrap-Around Up. "87" Only Available North American Model. "40" and "41" meanings depend on model and input signal as documented in the source.'

- id: late_night_wrap
  label: Late Night Mode Wrap
  kind: action
  command: "LTN"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: re_eq_filter_operation
  label: Re-EQ Filter Operation
  kind: action
  command: "RAS"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "UP"]
      description: 'Re-EQ/Academy Filter: "00" sets Both Off; "01" sets Re-EQ On; "02" sets Academy On; "UP" sets Re-EQ/Academy State Wrap-Around Up. Re-EQ and Cinema Filter variants document "00", "01", "UP" only.'

- id: audyssey_wrap
  label: Audyssey EQ Wrap
  kind: action
  command: "ADY"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: audyssey_dyn_eq_wrap
  label: Audyssey Dynamic EQ Wrap
  kind: action
  command: "ADQ"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: audyssey_dyn_vol_wrap
  label: Audyssey Dynamic Volume Wrap
  kind: action
  command: "ADV"
  params:
    - name: operation
      type: enum
      values: ["UP"]

- id: dolby_volume_operation
  label: Dolby Volume Operation
  kind: action
  command: "DVL"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "UP"]
      description: '"00" sets Dolby Volume Off; "01" sets Dolby Volume Low; "02" sets Dolby Volume Mid; "03" sets Dolby Volume High; "UP" sets Dolby Volume State Wrap-Around Up'

- id: music_optimizer_operation
  label: Music Optimizer Operation
  kind: action
  command: "MOT"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: '"00" sets Music Optimizer Off; "01" sets Music Optimizer On; "UP" sets Music Optimizer State Wrap-Around Up'

- id: tuner_operation
  label: Tuner Operation
  kind: action
  command: "TUN"
  params:
    - name: parameter
      type: string
      description: '"nnnnn": sets Directly Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch) put 0 in the first two digits of nnnnn at XM; "UP", "DOWN". Frequency range: UNRESOLVED. Include Tuner Pack Model Only; shared by MAIN and ZONE.'

- id: tuner_preset_operation
  label: Tuner Preset Operation
  kind: action
  command: "PRS"
  params:
    - name: parameter
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation); "UP", "DOWN". Include Tuner Pack Model Only; shared by MAIN and ZONE.'

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "PRM"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation). Include Tuner Pack Model Only.'

- id: rds_display
  label: RDS Display
  kind: action
  command: "RDS"
  params:
    - name: information
      type: enum
      values: ["00", "01", "02", "UP"]
      description: '"00" Display RT Information; "01" Display PTY Information; "02" Display TP Information; "UP" Display RDS Information Wrap-Around Change. RDS Model Only; RBDS Model only supports Display RT information.'

- id: pty_scan
  label: PTY Scan
  kind: action
  command: "PTS"
  params:
    - name: parameter
      type: string
      description: '"00"-"1E": sets PTY No "0-30"(In hexadecimal representation); "ENTER": Finish PTY Scan. RDS Model Only.'

- id: tp_scan
  label: TP Scan
  kind: action
  command: "TPS"
  params:
    - name: operation
      type: enum
      values: ["", "ENTER"]
      description: '"": Start TP Scan (When Don''t Have Parameter); "ENTER": Finish TP Scan. RDS Model Only.'

- id: xm_channel_operation
  label: XM Channel Operation
  kind: action
  command: "XCH"
  params:
    - name: parameter
      type: string
      description: '"000"-"255": XM Channel Number "000-255"; "UP", "DOWN". XM Model Only.'

- id: xm_category_operation
  label: XM Category Operation
  kind: action
  command: "XCT"
  params:
    - name: operation
      type: enum
      values: ["UP", "DOWN"]
      description: XM Model Only

- id: sirius_channel_operation
  label: SIRIUS Channel Operation
  kind: action
  command: "SCH"
  params:
    - name: parameter
      type: string
      description: '"000"-"255": SIRIUS Channel Number "000-255"; "UP", "DOWN". SIRIUS Model Only.'

- id: sirius_category_operation
  label: SIRIUS Category Operation
  kind: action
  command: "SCT"
  params:
    - name: operation
      type: enum
      values: ["UP", "DOWN"]
      description: SIRIUS Model Only

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK"
  params:
    - name: password
      type: string
      description: '"nnnn": Lock Password (4 Digits). SIRIUS Model Only.'

- id: hd_radio_program_set
  label: Set HD Radio Program
  kind: action
  command: "HPR"
  params:
    - name: program
      type: string
      description: '"01"-"08": sets directly HD Radio Channel Program. HD Radio Model Only.'

- id: hd_radio_blend_set
  label: Set HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: mode
      type: enum
      values: ["00", "01"]
      description: '"00" sets HD Radio Blend Mode "Auto"; "01" sets HD Radio Blend Mode "Analog". HD Radio Model Only.'

- id: net_additional_operation
  label: Additional Net/USB Operation
  kind: action
  command: "NTC"
  params:
    - name: parameter
      type: string
      description: '"FF", "REW", "DISPLAY", "ALBUM", "ARTIST", "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT", "0"-"9", "DELETE", "CAPS", "LOCATION", "LANGUAGE", "SETUP", "RETURN", "CHUP", "CHDN"; Zone2 Net-Tune: "PLAYz", "STOPz", "PAUSEz", "TRUPz", "TRDNz". FF/REW Net-tune commands must be sent continuously, with no more than 100ms delay between codes.'

- id: internet_radio_preset_set
  label: Set Internet Radio Preset
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
    - name: parameter
      type: string
      description: '"POWER", "TRACK", "PLAY", "STOP", "PAUSE", "SKIP.F", "SKIP.R", "MEMORY", "CLEAR", "REPEAT", "RANDOM", "DISP", "D.MODE", "FF", "REW", "OP/CL", "0"-"10", "+10", "D.SKIP", "DISC.F", "DISC.R", "DISC1"-"DISC6", "STBY", "PON"'

- id: ri_tape1_operation
  label: RI Tape 1 Operation
  kind: action
  command: "CT1"
  params:
    - name: operation
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]

- id: ri_tape2_operation
  label: RI Tape 2 Operation
  kind: action
  command: "CT2"
  params:
    - name: operation
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]

- id: ri_equalizer_operation
  label: RI Graphics Equalizer Operation
  kind: action
  command: "CEQ"
  params:
    - name: operation
      type: enum
      values: ["POWER", "PRESET"]

- id: ri_dat_operation
  label: RI DAT Recorder Operation
  kind: action
  command: "CDT"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]

- id: ri_dvd_player_operation
  label: RI DVD Player Operation
  kind: action
  command: "CDV"
  params:
    - name: parameter
      type: string
      description: '"POWER", "PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R", "FF", "REW", "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU", "MENU", "UP", "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F", "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE", "0"-"10", "SEARCH", "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F", "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN", "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1"-"DISC6", "FOLDUP", "FOLDDN", "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN", "PCT", "RSCTG", "INIT"'

- id: ri_md_recorder_operation
  label: RI MD Recorder Operation
  kind: action
  command: "CMD"
  params:
    - name: parameter
      type: string
      description: '"POWER", "PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R", "PAUSE", "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM", "REPEAT", "ENTER", "EJECT", "0"-"10/0", "nn/nnn", "NAME", "GROUP", "STBY"; encoding of "nn/nnn": UNRESOLVED'

- id: ri_cd_r_recorder_operation
  label: RI CD-R Recorder Operation
  kind: action
  command: "CCR"
  params:
    - name: parameter
      type: string
      description: '"POWER", "P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC", "CLEAR", "REPEAT", "0"-"10/0", "nn/nnn", "SCROLL", "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY"; encoding of "nn/nnn": UNRESOLVED'

- id: zone2_mute_toggle
  label: Zone 2 Mute Toggle
  kind: action
  command: "ZMT"
  params:
    - name: operation
      type: enum
      values: ["TG"]

- id: zone2_tone_operation
  label: Zone 2 Tone Operation
  kind: action
  command: "ZTN"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]. Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_balance_operation
  label: Zone 2 Balance Operation
  kind: action
  command: "ZBL"
  params:
    - name: parameter
      type: string
      description: '"xx": xx is "-A"..."00"..."+A"[-10...0...+10 2 step]; "UP" sets Balance Up (to R 2 Step); "DOWN" sets Balance Down(to L 2 Step). Only works when main is ON and Zone2 is powered or variable.'

- id: zone2_tuner_operation
  label: Zone 2 Tuner Operation
  kind: action
  command: "TUZ"
  params:
    - name: parameter
      type: string
      description: '"nnnnn": sets Directly Tuning Frequency; "UP", "DOWN". Separated control; frequency range: UNRESOLVED.'

- id: zone2_preset_operation
  label: Zone 2 Preset Operation
  kind: action
  command: "PRZ"
  params:
    - name: parameter
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "UP", "DOWN". Separated control.'

- id: zone2_network_operation
  label: Zone 2 Network Operation
  kind: action
  command: "NTZ"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: Network Model Only

- id: zone2_internet_radio_preset_set
  label: Set Zone 2 Internet Radio Preset
  kind: action
  command: "NPZ"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation). Network Model Only.'

- id: zone2_listening_mode_set
  label: Set Zone 2 Listening Mode
  kind: action
  command: "LMZ"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "0F", "12", "87", "88"]
      description: '"00" sets STEREO; "01" sets DIRECT; "0F" sets MONO; "12" sets MULTIPLEX; "87" sets DVS(Pl2); "88" sets DVS(NEO6)'

- id: zone2_late_night_operation
  label: Zone 2 Late Night Operation
  kind: action
  command: "LTZ"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: '"00" sets Late Night Off; "01" sets Late Night Low; "02" sets Late Night High; "UP" sets Late Night State Wrap-Around Up'

- id: zone2_re_eq_filter_operation
  label: Zone 2 Re-EQ Filter Operation
  kind: action
  command: "RAZ"
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "UP"]
      description: '"00" sets Both Off; "01" sets Re-EQ On; "02" sets Academy On; "UP" sets Re-EQ/Academy State Wrap-Around Up'

- id: zone3_mute_toggle
  label: Zone 3 Mute Toggle
  kind: action
  command: "MT3"
  params:
    - name: operation
      type: enum
      values: ["TG"]

- id: zone3_volume_step
  label: Zone 3 Volume Step
  kind: action
  command: "VL3"
  params:
    - name: operation
      type: enum
      values: ["UP", "DOWN"]

- id: zone3_tone_operation
  label: Zone 3 Tone Operation
  kind: action
  command: "TN3"
  params:
    - name: parameter
      type: string
      description: '"Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: zone3_balance_operation
  label: Zone 3 Balance Operation
  kind: action
  command: "BL3"
  params:
    - name: parameter
      type: string
      description: '"xx": xx is"-A"..."00"..."+A"[-10...0...+10 2 step]; "UP" sets Balance Up (to R 2 Step); "DOWN" sets Balance Down (to L 2 Step)'

- id: zone3_tuner_operation
  label: Zone 3 Tuner Operation
  kind: action
  command: "TU3"
  params:
    - name: parameter
      type: string
      description: '"nnnnn": sets Directly Tuning Frequency; "UP", "DOWN". Separated control; frequency range: UNRESOLVED.'

- id: zone3_preset_operation
  label: Zone 3 Preset Operation
  kind: action
  command: "PR3"
  params:
    - name: parameter
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "UP", "DOWN". Separated control.'

- id: zone3_network_operation
  label: Zone 3 Network Operation
  kind: action
  command: "NT3"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: Network Model Only

- id: zone3_internet_radio_preset_set
  label: Set Zone 3 Internet Radio Preset
  kind: action
  command: "NP3"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation). Network Model Only.'

- id: zone4_mute_toggle
  label: Zone 4 Mute Toggle
  kind: action
  command: "MT4"
  params:
    - name: operation
      type: enum
      values: ["TG"]

- id: zone4_volume_step
  label: Zone 4 Volume Step
  kind: action
  command: "VL4"
  params:
    - name: operation
      type: enum
      values: ["UP", "DOWN"]

- id: zone4_tuner_operation
  label: Zone 4 Tuner Operation
  kind: action
  command: "TU4"
  params:
    - name: parameter
      type: string
      description: '"nnnnn": sets Directly Tuning Frequency; "UP", "DOWN". Separated control; frequency range: UNRESOLVED.'

- id: zone4_preset_operation
  label: Zone 4 Preset Operation
  kind: action
  command: "PR4"
  params:
    - name: parameter
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "UP", "DOWN". Separated control.'

- id: zone4_network_operation
  label: Zone 4 Network Operation
  kind: action
  command: "NT4"
  params:
    - name: operation
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN"]
      description: Network Model Only

- id: zone4_internet_radio_preset_set
  label: Set Zone 4 Internet Radio Preset
  kind: action
  command: "NP4"
  params:
    - name: preset
      type: string
      description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation). Network Model Only.'

- id: ri_dock_operation
  label: RI Dock Operation
  kind: action
  command: "CDS"
  params:
    - name: operation
      type: enum
      values: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
```

## Feedbacks
```yaml
# Query format: append QSTN to command, e.g. !1PWRQSTN
# Device responds with !1<CMD><value>
# Unsolicited notifications sent when status changes

- id: power_state
  label: Power State
  command_query: "!1PWRQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:standby", "01:on"]

- id: mute_state
  label: Mute State
  command_query: "!1AMTQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:off", "01:on"]

- id: volume_level
  label: Master Volume Level
  command_query: "!1MVLQSTN"
  query_command: "QSTN"
  type: string
  description: "Volume level in hex (00-64 or 00-50 depending on model)"

- id: input_selector
  label: Input Selector
  command_query: "!1SLIQSTN"
  query_command: "QSTN"
  type: enum
  values:
    - "00:VIDEO1"
    - "01:VIDEO2"
    - "02:VIDEO3"
    - "03:VIDEO4"
    - "04:VIDEO5"
    - "05:VIDEO6"
    - "06:VIDEO7"
    - "10:DVD"
    - "20:TAPE1"
    - "22:PHONO"
    - "23:CD"
    - "24:FM"
    - "25:AM"
    - "26:TUNER"
    - "27:MUSIC-SERVER"
    - "28:INTERNET-RADIO"
    - "29:USB-Front"
    - "2A:USB-Rear"
    - "40:Universal-PORT"

- id: listening_mode
  label: Listening Mode
  command_query: "!1LMDQSTN"
  query_command: "QSTN"
  type: string
  description: "Hex code for current listening mode (50+ possible values)"

- id: speaker_a_state
  label: Speaker A State
  command_query: "!1SPAQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:off", "01:on"]

- id: speaker_b_state
  label: Speaker B State
  command_query: "!1SPBQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:off", "01:on"]

- id: speaker_layout
  label: Speaker Layout
  command_query: "!1SPLQSTN"
  query_command: "QSTN"
  type: enum
  values: ["SB:SurrBack", "FH:Front-High", "FW:Front-Wide"]

- id: tone_front
  label: Front Tone
  command_query: "!1TFRQSTN"
  query_command: "QSTN"
  type: string
  description: "Returns BxxTxx format (bass and treble)"

- id: dimmer_level
  label: Dimmer Level
  command_query: "!1DIMQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:bright", "01:dim", "02:dark", "03:shut-off", "08:bright-LED-OFF"]

- id: sleep_time
  label: Sleep Timer
  command_query: "!1SLPQSTN"
  query_command: "QSTN"
  type: string
  description: "Sleep time in hex minutes (01-5A) or OFF"

- id: display_mode
  label: Display Mode
  command_query: "!1DIFQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:selector-volume", "01:selector-listening-mode"]

- id: audio_info
  label: Audio Information
  command_query: "!1IFAQSTN"
  query_command: "QSTN"
  type: string
  description: "Audio info string matching front panel display"

- id: video_info
  label: Video Information
  command_query: "!1IFVQSTN"
  query_command: "QSTN"
  type: string
  description: "Video info string matching front panel display"

- id: net_play_status
  label: Net/USB Play Status
  command_query: "!1NSTQSTN"
  query_command: "QSTN"
  type: string
  description: "3-char string: p=play(S/P/p/F/R), r=repeat(-/R/F/1)"

- id: net_track_info
  label: Net/USB Track Info
  command_query: "!1NTRQSTN"
  query_command: "QSTN"
  type: string
  description: "cccc/tttt (current/total tracks)"

- id: net_time_info
  label: Net/USB Time Info
  command_query: "!1NTMQSTN"
  query_command: "QSTN"
  type: string
  description: "mm:ss/mm:ss (elapsed/track time)"

- id: net_artist
  label: Net/USB Artist Name
  command_query: "!1NATQSTN"
  query_command: "QSTN"
  type: string
  description: "Artist name up to 64 chars"

- id: net_album
  label: Net/USB Album Name
  command_query: "!1NALQSTN"
  query_command: "QSTN"
  type: string
  description: "Album name up to 64 chars"

- id: net_title
  label: Net/USB Title Name
  command_query: "!1NTIQSTN"
  query_command: "QSTN"
  type: string
  description: "Title name up to 64 chars"

- id: hdmi_output
  label: HDMI Output Selector
  command_query: "!1HDOQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:No-Analog", "01:Main", "02:Sub", "03:Both", "04:Both-Main", "05:Both-Sub"]

- id: resolution
  label: Monitor Out Resolution
  command_query: "!1RESQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:Through", "01:Auto", "02:480p", "03:720p", "04:1080i", "05:1080p", "07:1080p-24fs", "06:Source"]

- id: audio_selector
  label: Audio Selector
  command_query: "!1SLAQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:AUTO", "01:MULTI-CHANNEL", "02:ANALOG", "04:HDMI", "05:COAX-OPT"]

# Zone 2 Feedbacks
- id: zone2_power_state
  label: Zone 2 Power State
  command_query: "!1ZPWQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:standby", "01:on"]

- id: zone2_mute_state
  label: Zone 2 Mute State
  command_query: "!1ZMTQSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:off", "01:on"]

- id: zone2_volume_level
  label: Zone 2 Volume Level
  command_query: "!1ZVLQSTN"
  query_command: "QSTN"
  type: string
  description: "Volume level in hex"

- id: zone2_input_selector
  label: Zone 2 Input Selector
  command_query: "!1SLZQSTN"
  query_command: "QSTN"
  type: string
  description: "Input selector code in hex"

# Zone 3 Feedbacks
- id: zone3_power_state
  label: Zone 3 Power State
  command_query: "!1PW3QSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:standby", "01:on"]

- id: zone3_mute_state
  label: Zone 3 Mute State
  command_query: "!1MT3QSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:off", "01:on"]

- id: zone3_volume_level
  label: Zone 3 Volume Level
  command_query: "!1VL3QSTN"
  query_command: "QSTN"
  type: string
  description: "Volume level in hex"

# Zone 4 Feedbacks
- id: zone4_power_state
  label: Zone 4 Power State
  command_query: "!1PW4QSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:standby", "01:on"]

- id: zone4_mute_state
  label: Zone 4 Mute State
  command_query: "!1MT4QSTN"
  query_command: "QSTN"
  type: enum
  values: ["00:off", "01:on"]

- id: zone4_volume_level
  label: Zone 4 Volume Level
  command_query: "!1VL4QSTN"
  query_command: "QSTN"
  type: string
  description: "Volume level in hex"

# Additional queries retain the source mnemonic and the separately documented QSTN token.
- id: tone_front_wide
  label: Front Wide Tone
  command_query: "TFW"
  query_command: "QSTN"
  type: string
  description: '"BxxTxx"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_front_high
  label: Front High Tone
  command_query: "TFH"
  query_command: "QSTN"
  type: string
  description: '"BxxTxx"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_center
  label: Center Tone
  command_query: "TCT"
  query_command: "QSTN"
  type: string
  description: '"BxxTxx"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_surround
  label: Surround Tone
  command_query: "TSR"
  query_command: "QSTN"
  type: string
  description: '"BxxTxx"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_surround_back
  label: Surround Back Tone
  command_query: "TSB"
  query_command: "QSTN"
  type: string
  description: '"BxxTxx"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: tone_subwoofer
  label: Subwoofer Tone
  command_query: "TSW"
  query_command: "QSTN"
  type: string
  description: 'Source documents query response "BxxTxx" and only Bass setters; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: subwoofer_level
  label: Subwoofer Level
  command_query: "SWL"
  query_command: "QSTN"
  type: string
  description: '"-F"-"00"-"+C"; Subwoofer Level -15dB-0dB-+12dB'

- id: center_level
  label: Center Level
  command_query: "CTL"
  query_command: "QSTN"
  type: string
  description: '"-C"-"00"-"+C"; Center Level -12dB-0dB-+12dB'

- id: recout_selector
  label: RECOUT Selector
  command_query: "SLR"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80"]

- id: video_output
  label: Video Output Selector
  command_query: "VOS"
  query_command: "QSTN"
  type: enum
  values: ["00", "01"]

- id: isf_mode
  label: ISF Mode
  command_query: "ISF"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02"]

- id: late_night_level
  label: Late Night Level
  command_query: "LTN"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02", "03"]

- id: re_eq_filter_state
  label: Re-EQ Filter State
  command_query: "RAS"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02"]
  description: 'Re-EQ/Academy Filter supports "00", "01", "02"; Re-EQ and Cinema Filter variants support "00", "01". Meaning depends on model.'

- id: audyssey_state
  label: Audyssey EQ State
  command_query: "ADY"
  query_command: "QSTN"
  type: enum
  values: ["00", "01"]

- id: audyssey_dyn_eq_state
  label: Audyssey Dynamic EQ State
  command_query: "ADQ"
  query_command: "QSTN"
  type: enum
  values: ["00", "01"]

- id: audyssey_dyn_vol_level
  label: Audyssey Dynamic Volume Level
  command_query: "ADV"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02", "03"]

- id: dolby_volume_level
  label: Dolby Volume Level
  command_query: "DVL"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02", "03"]

- id: music_optimizer_state
  label: Music Optimizer State
  command_query: "MOT"
  query_command: "QSTN"
  type: enum
  values: ["00", "01"]

- id: tuning_frequency
  label: Tuning Frequency
  command_query: "TUN"
  query_command: "QSTN"
  type: string
  description: '"nnnnn"; FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch; put 0 in the first two digits of nnnnn at XM. Frequency range: UNRESOLVED.'

- id: tuner_preset
  label: Tuner Preset
  command_query: "PRS"
  query_command: "QSTN"
  type: string
  description: '"01"-"28": Preset No. 1-40 (In hexadecimal representation); "01"-"1E": Preset No. 1-30 (In hexadecimal representation)'

- id: xm_channel_name
  label: XM Channel Name
  command_query: "XCN"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": XM Channel Name. XM Model Only; maximum length: UNRESOLVED.'

- id: xm_artist
  label: XM Artist Name
  command_query: "XAT"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": XM Artist Name. XM Model Only; maximum length: UNRESOLVED.'

- id: xm_title
  label: XM Title
  command_query: "XTI"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": XM Title. XM Model Only; maximum length: UNRESOLVED.'

- id: xm_channel_number
  label: XM Channel Number
  command_query: "XCH"
  query_command: "QSTN"
  type: string
  description: '"000"-"255": XM Channel Number "000-255". XM Model Only.'

- id: xm_category
  label: XM Category
  command_query: "XCT"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": XM Category Info. XM Model Only; maximum length: UNRESOLVED.'

- id: sirius_channel_name
  label: SIRIUS Channel Name
  command_query: "SCN"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": SIRIUS Channel Name. SIRIUS Model Only; maximum length: UNRESOLVED.'

- id: sirius_artist
  label: SIRIUS Artist Name
  command_query: "SAT"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": SIRIUS Artist Name. SIRIUS Model Only; maximum length: UNRESOLVED.'

- id: sirius_title
  label: SIRIUS Title
  command_query: "STI"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": SIRIUS Title. SIRIUS Model Only; maximum length: UNRESOLVED.'

- id: sirius_channel_number
  label: SIRIUS Channel Number
  command_query: "SCH"
  query_command: "QSTN"
  type: string
  description: '"000"-"255": SIRIUS Channel Number "000-255". SIRIUS Model Only.'

- id: sirius_category
  label: SIRIUS Category
  command_query: "SCT"
  query_command: "QSTN"
  type: string
  description: '"nnnnnnnnnn": SIRIUS Category Info. SIRIUS Model Only; maximum length: UNRESOLVED.'

- id: hd_radio_artist
  label: HD Radio Artist Name
  command_query: "HAT"
  query_command: "QSTN"
  type: string
  description: HD Radio Artist Name (variable-length, 64 digits max)

- id: hd_radio_channel_name
  label: HD Radio Channel Name
  command_query: "HCN"
  query_command: "QSTN"
  type: string
  description: HD Radio Channel Name (Station Name) (7 digits)

- id: hd_radio_title
  label: HD Radio Title
  command_query: "HTI"
  query_command: "QSTN"
  type: string
  description: HD Radio Title (variable-length, 64 digits max)

- id: hd_radio_detail
  label: HD Radio Detail Info
  command_query: "HDS"
  query_command: "QSTN"
  type: string
  description: 'Source labels this HD Radio Detail Info, but documents "nnnnnnnnnn" as HD Radio Title and QSTN as gets HD Radio Title. Maximum length: UNRESOLVED.'

- id: hd_radio_program
  label: HD Radio Program
  command_query: "HPR"
  query_command: "QSTN"
  type: string
  description: '"01"-"08": HD Radio Channel Program'

- id: hd_radio_blend_mode
  label: HD Radio Blend Mode
  command_query: "HBL"
  query_command: "QSTN"
  type: enum
  values: ["00", "01"]
  description: '"00" Auto; "01" Analog'

- id: hd_radio_tuner_status
  label: HD Radio Tuner Status
  command_query: "HTS"
  query_command: "QSTN"
  type: string
  description: '"mmnnoo": HD Radio Tuner Status (3 bytes) mm -> "00" not HD, "01" HD nn -> current Program "01"-"08" oo -> receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.)'

- id: zone2_tone
  label: Zone 2 Tone
  command_query: "ZTN"
  query_command: "QSTN"
  type: string
  description: '"BxxTxx"; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: zone2_balance
  label: Zone 2 Balance
  command_query: "ZBL"
  query_command: "QSTN"
  type: string
  description: '"xx"; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: zone2_tuning_frequency
  label: Zone 2 Tuning Frequency
  command_query: "TUZ"
  query_command: "QSTN"
  type: string
  description: '"nnnnn"; separated control. Frequency range: UNRESOLVED.'

- id: zone2_preset
  label: Zone 2 Preset
  command_query: "PRZ"
  query_command: "QSTN"
  type: string
  description: '"01"-"28": Preset No. 1-40 (In hexadecimal representation); separated control'

- id: zone2_late_night_level
  label: Zone 2 Late Night Level
  command_query: "LTZ"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02"]

- id: zone2_re_eq_filter_state
  label: Zone 2 Re-EQ Filter State
  command_query: "RAZ"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02"]

- id: zone3_tone
  label: Zone 3 Tone
  command_query: "TN3"
  query_command: "QSTN"
  type: string
  description: '"BxxTxx"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: zone3_balance
  label: Zone 3 Balance
  command_query: "BL3"
  query_command: "QSTN"
  type: string
  description: '"xx"; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

- id: zone3_input_selector
  label: Zone 3 Input Selector
  command_query: "SL3"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]

- id: zone3_tuning_frequency
  label: Zone 3 Tuning Frequency
  command_query: "TU3"
  query_command: "QSTN"
  type: string
  description: '"nnnnn"; separated control. Frequency range: UNRESOLVED.'

- id: zone3_preset
  label: Zone 3 Preset
  command_query: "PR3"
  query_command: "QSTN"
  type: string
  description: '"01"-"28": Preset No. 1-40 (In hexadecimal representation); separated control'

- id: zone4_input_selector
  label: Zone 4 Input Selector
  command_query: "SL4"
  query_command: "QSTN"
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]

- id: zone4_tuning_frequency
  label: Zone 4 Tuning Frequency
  command_query: "TU4"
  query_command: "QSTN"
  type: string
  description: '"nnnnn"; separated control. Frequency range: UNRESOLVED.'

- id: zone4_preset
  label: Zone 4 Preset
  command_query: "PR4"
  query_command: "QSTN"
  type: string
  description: '"01"-"28": Preset No. 1-40 (In hexadecimal representation); separated control'
```

## Variables
```yaml
# Tone controls per channel are settable parameters with continuous ranges
# Subwoofer level: SWL command, -15dB to +12dB
# Center level: CTL command, -12dB to +12dB
# Zone balance controls: ZBL (Zone 2), BL3 (Zone 3)
# UNRESOLVED: exact hex encoding for negative values in tone/balance commands not fully specified
```

## Events
```yaml
# Device sends unsolicited status notifications when state changes
# Format: !1<COMMAND><VALUE>[EOF] (same format as query responses)
# Example: Receiver sends "!1SLI03" when input changes to VIDEO4/AUX1
# Notes from source:
#   - Connection must be held continuously to receive notifications
#   - Only one client connection supported at a time
#   - Receiver responds within 50msec; no response = communication failure
```

## Macros
```yaml
# Speaker Level Calibration sequence (SLC command):
#   1. Send TEST to start test tone
#   2. Send CHSEL to cycle through channels
#   3. Send UP/DOWN to adjust level per channel
# UNRESOLVED: no explicit multi-step macros defined in source beyond calibration
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Zone 2 volume/tone only works when main zone is ON"
  - "Zone 2 volume/tone only works when Zone 2 is powered or set to variable"
  - "12V triggers (TGA/TGB/TGC) only available when all trigger params are OFF in Setup Menu"
# UNRESOLVED: no explicit safety warnings or power sequencing requirements found in source
```

## Notes
- ISCP commands use unit type character "1" for Receivers (format: `!1CCC##` where CCC=3-char command, ##=parameter).
- Volume values are hexadecimal. Two ranges exist depending on model: 0x00-0x64 (0-100) or 0x00-0x50 (0-80).
- RS-232C end characters: CR, LF, or CR+LF. eISCP end characters: EOF, EOF+CR, or EOF+CR+LF (model-dependent).
- eISCP header is 16 bytes big-endian: magic "ISCP", header size (0x00000010), data size, version (0x01), reserved (0x000000).
- Minimum interval between received messages is 50ms. Commands must not be sent faster than this.
- TCP connection must be maintained continuously; only one client connection is supported.
- TCP port default is 60128, configurable in receiver setup menu (49152-65535). Receiver must be set to standby and back on after port change.
- The listening mode command (LMD) has 50+ possible values; only a subset is listed in this spec.
- Tuner, XM, SIRIUS, and HD Radio commands are shared between MAIN and ZONE sides.
- RI (Remote Interactive) passthrough commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) control connected external devices, not the receiver itself.
- Document version: 1.15, dated 31 August 2009.

<!-- UNRESOLVED: specific DTX sub-model list not provided in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact hex encoding for tone/balance negative values not fully specified -->
<!-- UNRESOLVED: eISCP header data_size field calculation (includes or excludes end characters?) -->
<!-- UNRESOLVED: maximum command string length not stated -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:24:57.457Z
last_checked_at: 2026-10-07T13:24:57.457Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:24:57.457Z
matched_actions: 234
action_count: 234
confidence: medium
summary: "All 234 action units match source ISCP mnemonics and parameters; transport literal in source; all ~113 source commands represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific DTX sub-models not enumerated in source; source references TX-SR805, TX-NR905, TX-NR1000 as footnotes but does not provide a definitive DTX model list"
- "exact hex encoding for negative values in tone/balance commands not fully specified"
- "no explicit multi-step macros defined in source beyond calibration"
- "no explicit safety warnings or power sequencing requirements found in source"
- "specific DTX sub-model list not provided in source"
- "firmware version compatibility not stated in source"
- "exact hex encoding for tone/balance negative values not fully specified"
- "eISCP header data_size field calculation (includes or excludes end characters?)"
- "maximum command string length not stated"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
