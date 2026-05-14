---
spec_id: admin/marantz-av-receiver
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz AV Receiver Control Spec"
manufacturer: Marantz
model_family: "Marantz AV Receiver"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz AV Receiver"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-05-14T18:17:17.893Z
generated_at: 2026-05-14T18:17:17.893Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.893Z
  matched_actions: 102
  action_count: 128
  confidence: high
  summary: "All 102 spec actions matched literally in source; transport parameters verified; comprehensive coverage of documented command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Marantz AV Receiver Control Spec

## Summary
Marantz AV Receiver with RS-232 and TCP/IP (Telnet) control. The protocol uses ASCII command strings terminated by carriage return (0x0D). Covers power, volume, input selection, surround modes, zone 2/3 control, tuner, and online music/USB/Bluetooth playback. This spec is derived from the Denon/Marantz AV Receiver Control Protocol document, which shares the same command set across Marantz and Denon models.

<!-- UNRESOLVED: specific Marantz model numbers not stated in source (document title references Denon but protocol applies to Marantz AV receivers) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
- powerable     # inferred from PW power on/off/standby commands
- routable       # inferred from SI input select commands
- queryable      # inferred from ? query commands on multiple parameters
- levelable      # inferred from MV volume and CV channel volume commands
```

## Actions
```yaml
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
  label: Master Volume Set
  kind: action
  command: MV** 
  params:
    - name: level
      type: string
      description: "Volume level 00-98 (80=0dB, 00=MIN). 3-char for 0.5dB steps (e.g. 805=+0.5dB)"

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
  label: Select Input
  kind: action
  command: SI
  params:
    - name: source
      type: enum
      description: "Input source name"
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

- id: surround_mode
  label: Surround Mode
  kind: action
  command: MS
  params:
    - name: mode
      type: enum
      description: "Surround mode name (e.g. STEREO, MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, AUTO, DOLBY DIGITAL, DOLBY SURROUND, DOLBY ATMOS, DTS SURROUND, MCH STEREO, etc.)"

- id: input_mode
  label: Input Mode
  kind: action
  command: SD
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - HDMI
        - DIGITAL
        - ANALOG
        - EXT.IN
        - 7.1IN
        - NO

- id: digital_input
  label: Digital Input Mode
  kind: action
  command: DC
  params:
    - name: mode
      type: enum
      values:
        - AUTO
        - PCM
        - DTS

- id: video_select
  label: Video Select
  kind: action
  command: SV
  params:
    - name: source
      type: enum
      description: "Video source or ON/OFF/SOURCE"

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: SLP
  params:
    - name: minutes
      type: integer
      description: "001 to 120 minutes, or OFF"

- id: auto_standby
  label: Auto Standby
  kind: action
  command: STBY
  params:
    - name: timeout
      type: enum
      values:
        - 15M
        - 30M
        - 60M
        - OFF

- id: eco_mode
  label: ECO Mode
  kind: action
  command: ECO
  params:
    - name: mode
      type: enum
      values:
        - ON
        - AUTO
        - OFF

- id: tone_ctrl
  label: Tone Control
  kind: action
  command: PS
  params:
    - name: setting
      type: string
      description: "Tone control parameter (e.g. TONE CTRL ON/OFF, BAS UP/DOWN/**, TRE UP/DOWN/**)"

- id: channel_volume
  label: Channel Volume
  kind: action
  command: CV
  params:
    - name: channel_and_level
      type: string
      description: "Channel and direction/level (e.g. FL UP, FR 50, C DOWN). Channels: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"

- id: picture_mode
  label: Picture Mode
  kind: action
  command: PV
  params:
    - name: mode
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

- id: video_output_setting
  label: Video Output Setting
  kind: action
  command: VS
  params:
    - name: setting
      type: string
      description: "Video setting (e.g. ASPNRM, ASPFUL, MONI1, MONI2, SC48P-SC4KF, VPMAUTO, etc.)"

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

- id: zone2_select_input
  label: Zone 2 Select Input
  kind: action
  command: Z2
  params:
    - name: source
      type: string
      description: "Input source name (same values as SI command plus SOURCE to cancel)"

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

- id: zone3_select_input
  label: Zone 3 Select Input
  kind: action
  command: Z3
  params:
    - name: source
      type: string
      description: "Input source name (same values as SI command plus SOURCE to cancel)"

- id: cursor_up
  label: Cursor Up (Network)
  kind: action
  command: NS90
  params: []

- id: cursor_down
  label: Cursor Down (Network)
  kind: action
  command: NS91
  params: []

- id: cursor_left
  label: Cursor Left (Network)
  kind: action
  command: NS92
  params: []

- id: cursor_right
  label: Cursor Right (Network)
  kind: action
  command: NS93
  params: []

- id: enter_play_pause
  label: Enter / Play Pause (Network)
  kind: action
  command: NS94
  params: []

- id: play
  label: Play (Network)
  kind: action
  command: NS9A
  params: []

- id: pause
  label: Pause (Network)
  kind: action
  command: NS9B
  params: []

- id: stop
  label: Stop (Network)
  kind: action
  command: NS9C
  params: []

- id: skip_plus
  label: Skip Forward (Network)
  kind: action
  command: NS9D
  params: []

- id: skip_minus
  label: Skip Backward (Network)
  kind: action
  command: NS9E
  params: []

- id: search_plus
  label: Search Forward (Network)
  kind: action
  command: NS9F
  params: []

- id: search_minus
  label: Search Backward (Network)
  kind: action
  command: NS9G
  params: []

- id: dimmer
  label: Front Panel Dimmer
  kind: action
  command: DIM
  params:
    - name: level
      type: enum
      values:
        - BRI
        - DIM
        - DAR
        - OFF
        - SEL

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

- id: quick_select
  label: Quick Select
  kind: action
  command: MSQUICK
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "Quick select slot number"

- id: quick_select_memory
  label: Quick Select Memory
  kind: action
  command: MSQUICK* MEMORY
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "Quick select slot to memorize"

- id: record_select
  label: Record Select
  kind: action
  command: SR
  params:
    - name: source
      type: string
      description: "Record source (PHONO, IPOD, USB DIRECT, IPOD DIRECT, SOURCE)"
- id: zm_favorite
  label: Main Zone Favorite Select
  kind: action
  command: ZMFAVORITE
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "Favorite preset slot 1-4"

- id: zm_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  command: ZMFAVORITE MEMORY
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "Favorite preset slot 1-4 to memorize"

- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: Z2**
  params:
    - name: level
      type: string
      description: "Volume level 00-98 by ASCII, 80=0dB, 00=MIN"

- id: zone2_channel_select
  label: Zone 2 Channel Setting
  kind: action
  command: Z2CS
  params:
    - name: mode
      type: enum
      values:
        - ST
        - MONO

- id: zone2_channel_volume
  label: Zone 2 Channel Volume
  kind: action
  command: Z2CV
  params:
    - name: channel_and_level
      type: string
      description: "Channel and direction/level (e.g. FL UP, FL DOWN, FL 50, FR UP). Range 38-62, 50=0dB"

- id: zone2_hpf
  label: Zone 2 HPF On/Off
  kind: action
  command: Z2HPF
  params:
    - name: state
      type: enum
      values:
        - ON
        - OFF

- id: zone2_tone
  label: Zone 2 Tone Control
  kind: action
  command: Z2PS
  params:
    - name: setting
      type: string
      description: "Tone parameter (e.g. BAS UP, BAS DOWN, BAS 50, TRE UP, TRE DOWN, TRE 50). Range 00-99, 50=0dB"

- id: zone2_hdmi_audio
  label: Zone 2 HDMI Audio Output
  kind: action
  command: Z2HDA
  params:
    - name: mode
      type: enum
      values:
        - THR
        - PCM

- id: zone2_sleep
  label: Zone 2 Sleep Timer
  kind: action
  command: Z2SLP
  params:
    - name: minutes
      type: string
      description: "OFF or 001 to 120 by ASCII, 010=10min"

- id: zone2_auto_standby
  label: Zone 2 Auto Standby
  kind: action
  command: Z2STBY
  params:
    - name: timeout
      type: enum
      values:
        - 2H
        - 4H
        - 8H
        - OFF

- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  command: Z2QUICK
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "Quick select slot 1-5"

- id: zone2_quick_select_memory
  label: Zone 2 Quick Select Memory
  kind: action
  command: Z2QUICK MEMORY
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "Quick select slot 1-5 to memorize"

- id: zone2_favorite
  label: Zone 2 Favorite Select
  kind: action
  command: Z2FAVORITE
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "Favorite preset slot 1-4"

- id: zone2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  command: Z2FAVORITE MEMORY
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "Favorite preset slot 1-4 to memorize"

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
      description: "Volume level 00-98 by ASCII, 80=0dB, 00=MIN"

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

- id: zone3_channel_select
  label: Zone 3 Channel Setting
  kind: action
  command: Z3CS
  params:
    - name: mode
      type: enum
      values:
        - ST
        - MONO

- id: zone3_channel_volume
  label: Zone 3 Channel Volume
  kind: action
  command: Z3CV
  params:
    - name: channel_and_level
      type: string
      description: "Channel and direction/level (e.g. FL UP, FL DOWN, FL 50, FR UP). Range 38-62, 50=0dB"

- id: zone3_hpf
  label: Zone 3 HPF On/Off
  kind: action
  command: Z3HPF
  params:
    - name: state
      type: enum
      values:
        - ON
        - OFF

- id: zone3_tone
  label: Zone 3 Tone Control
  kind: action
  command: Z3PS
  params:
    - name: setting
      type: string
      description: "Tone parameter (e.g. BAS UP, BAS DOWN, BAS 50, TRE UP, TRE DOWN, TRE 50). Range 00-99, 50=0dB"

- id: zone3_sleep
  label: Zone 3 Sleep Timer
  kind: action
  command: Z3SLP
  params:
    - name: minutes
      type: string
      description: "OFF or 001 to 120 by ASCII, 010=10min"

- id: zone3_auto_standby
  label: Zone 3 Auto Standby
  kind: action
  command: Z3STBY
  params:
    - name: timeout
      type: enum
      values:
        - 2H
        - 4H
        - 8H
        - OFF

- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  command: Z3QUICK
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "Quick select slot 1-5"

- id: zone3_quick_select_memory
  label: Zone 3 Quick Select Memory
  kind: action
  command: Z3QUICK MEMORY
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "Quick select slot 1-5 to memorize"

- id: zone3_favorite
  label: Zone 3 Favorite Select
  kind: action
  command: Z3FAVORITE
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "Favorite preset slot 1-4"

- id: zone3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  command: Z3FAVORITE MEMORY
  params:
    - name: slot
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
      description: "Favorite preset slot 1-4 to memorize"

- id: nav_cursor_up
  label: Navigation Cursor Up
  kind: action
  command: MNCUP
  params: []

- id: nav_cursor_down
  label: Navigation Cursor Down
  kind: action
  command: MNCDN
  params: []

- id: nav_cursor_left
  label: Navigation Cursor Left
  kind: action
  command: MNCLT
  params: []

- id: nav_cursor_right
  label: Navigation Cursor Right
  kind: action
  command: MNCRT
  params: []

- id: nav_enter
  label: Navigation Enter
  kind: action
  command: MNENT
  params: []

- id: nav_return
  label: Navigation Return
  kind: action
  command: MNRTN
  params: []

- id: nav_option
  label: Navigation Option
  kind: action
  command: MNOPT
  params: []

- id: nav_info
  label: Navigation Info
  kind: action
  command: MNINF
  params: []

- id: nav_channel_level
  label: Navigation Channel Level Adjust
  kind: action
  command: MNCHL
  params: []

- id: insta_prevue
  label: InstaPrevue On/Off
  kind: action
  command: MNPRV
  params:
    - name: state
      type: enum
      values:
        - ON
        - OFF

- id: all_zone_stereo
  label: All Zone Stereo
  kind: action
  command: MNZST
  params:
    - name: state
      type: enum
      values:
        - ON
        - OFF

- id: tuner_freq
  label: Tuner Frequency
  kind: action
  command: TF
  params:
    - name: setting
      type: string
      description: "ANUP, ANDOWN, or AN****** (6-digit freq, e.g. AN105000 = 1050.00kHz AM, <050000 is FM)"

- id: tuner_preset
  label: Tuner Preset
  kind: action
  command: TP
  params:
    - name: setting
      type: string
      description: "ANUP, ANDOWN, AN** (01-56), ANMEM, or ANMEM** (01-56)"

- id: tuner_mode
  label: Tuner Band and Mode
  kind: action
  command: TM
  params:
    - name: mode
      type: enum
      values:
        - ANAM
        - ANFM
        - ANAUTO
        - ANMANUAL

- id: ns_repeat_one
  label: Network Repeat One
  kind: action
  command: NS9H
  params: []

- id: ns_repeat_all
  label: Network Repeat All
  kind: action
  command: NS9I
  params: []

- id: ns_repeat_off
  label: Network Repeat Off
  kind: action
  command: NS9J
  params: []

- id: ns_random_on
  label: Network Random On
  kind: action
  command: NS9K
  params: []

- id: ns_random_off
  label: Network Random Off
  kind: action
  command: NS9M
  params: []

- id: ns_page_next
  label: Network Page Next
  kind: action
  command: NS9X
  params: []

- id: ns_page_prev
  label: Network Page Previous
  kind: action
  command: NS9Y
  params: []

- id: ns_search_stop
  label: Network Manual Search Stop
  kind: action
  command: NS9Z
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  query_command: PW?
  response_prefix: PW

- id: master_volume
  type: string
  description: "Volume level 00-98 (80=0dB, 00=MIN), 3-char for 0.5dB steps"
  query_command: MV?
  response_prefix: MV

- id: mute_state
  type: enum
  values: [ON, OFF]
  query_command: MU?
  response_prefix: MU

- id: input_source
  type: string
  description: "Current input source name"
  query_command: SI?
  response_prefix: SI

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  query_command: ZM?
  response_prefix: ZM

- id: surround_mode
  type: string
  description: "Current surround mode name"
  query_command: MS?
  response_prefix: MS

- id: input_mode
  type: string
  description: "Current input mode"
  query_command: SD?
  response_prefix: SD

- id: digital_input_mode
  type: string
  description: "Current digital input mode"
  query_command: DC?
  response_prefix: DC

- id: video_select_state
  type: string
  description: "Current video select state"
  query_command: SV?
  response_prefix: SV

- id: sleep_timer
  type: string
  description: "Current sleep timer value"
  query_command: SLP?
  response_prefix: SLP

- id: auto_standby
  type: string
  description: "Current auto standby setting"
  query_command: STBY?
  response_prefix: STBY

- id: eco_mode
  type: string
  description: "Current ECO mode"
  query_command: ECO?
  response_prefix: ECO

- id: channel_volume
  type: string
  description: "Channel volume levels for configured speakers, terminated by CVEND"
  query_command: CV?
  response_prefix: CV

- id: zone2_state
  type: string
  description: "Zone 2 on/off state"
  query_command: Z2?
  response_prefix: Z2

- id: zone2_volume
  type: string
  description: "Zone 2 volume level"
  query_command: Z2?
  response_prefix: Z2

- id: zone2_mute
  type: enum
  values: [ON, OFF]
  query_command: Z2MU?
  response_prefix: Z2MU

- id: zone3_state
  type: string
  description: "Zone 3 on/off state"
  query_command: Z3?
  response_prefix: Z3

- id: zone3_volume
  type: string
  description: "Zone 3 volume level"
  query_command: Z3?
  response_prefix: Z3

- id: zone3_mute
  type: enum
  values: [ON, OFF]
  query_command: Z3MU?
  response_prefix: Z3MU

- id: trigger_state
  type: string
  description: "Trigger 1 and 2 on/off states"
  query_command: TR?
  response_prefix: TR

- id: dimmer_state
  type: string
  description: "Current front panel dimmer level"
  query_command: DIM?
  response_prefix: DIM

- id: setup_menu_state
  type: enum
  values: [ON, OFF]
  query_command: MNMEN?
  response_prefix: MNMEN

- id: tuner_frequency
  type: string
  description: "Current tuner frequency"
  query_command: TFAN?
  response_prefix: TF

- id: hd_radio_info
  type: string
  description: "HD Radio status including band, station name, multicast, signal level, artist, title, album, genre"
  query_command: HD?
  response_prefix: HD
```

## Events
```yaml
- id: power_event
  description: "Unsolicited event sent when power state changes"
  prefix: PW
  values: [PWON, PWSTANDBY]

- id: volume_event
  description: "Unsolicited event sent when master volume changes"
  prefix: MV
  values: ["MV** (2 or 3 char level)"]

- id: mute_event
  description: "Unsolicited event sent when mute state changes"
  prefix: MU
  values: [MUON, MUOFF]

- id: input_source_event
  description: "Unsolicited event sent when input source changes"
  prefix: SI
  values: ["SI*** (source name)"]

- id: surround_mode_event
  description: "Unsolicited event sent when surround mode changes. Current mode returned first, then new mode."
  prefix: MS
  values: ["MS*** (mode name)"]

- id: channel_volume_event
  description: "Unsolicited event sent when channel volume changes due to input source change. Reports all configured speaker levels."
  prefix: CV
  values: ["CVFL 50<CR>:...:CVEND<CR>"]

- id: main_zone_event
  description: "Unsolicited event sent when main zone state changes"
  prefix: ZM
  values: [ZMON, ZMOFF]
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after sending PWON before transmitting next command"
    source: "Note J in source document"
# UNRESOLVED: no other safety warnings or interlock procedures stated in source
```

## Notes
- All commands use ASCII encoding terminated by carriage return (CR, 0x0D).
- Commands should be sent at 50ms or greater intervals.
- Maximum communication data length is 135 bytes.
- Volume encoding: 2-char for whole dB steps (80=0dB, 00=MIN/---dB), 3-char for 0.5dB steps (e.g. 805=+0.5dB, 795=-0.5dB).
- Channel volume range: 38-62 (50=0dB) per channel. Subwoofer: 00, 38-62.
- Events are sent within 5 seconds of a state change. Query responses within 200ms.
- When input source changes, channel volume and surround mode events are sent if they differ from the previous source.
- "Network Standby" must be set to "Always On" for IP control while in standby.
- The source document title is "Denon AV Receiver Control Protocol" but this same protocol applies to Marantz AV receivers.
- RS-232 connector is DB-9pin female (DCE type), pins 1(GND), 2(TxD), 3(RxD), 5(Common).
- TCP connection uses port 23 (Telnet), 10BASE-T/100BASE-TX via RJ-45.
<!-- UNRESOLVED: specific Marantz model numbers covered by this protocol not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version not stated in source -->
<!-- UNRESOLVED: exact list of Marantz models that share this Denon protocol not stated -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-05-14T18:17:17.893Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.893Z
matched_actions: 102
action_count: 128
confidence: high
summary: "All 102 spec actions matched literally in source; transport parameters verified; comprehensive coverage of documented command set."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
