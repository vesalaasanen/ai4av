---
schema_version: ai4av-public-spec-v1
device_id: integra/dmi-40-4
entity_id: integra_dmi_40_4
spec_id: admin/integra-dmi-40-4
revision: 1
author: admin
title: "Integra DMI-40.4 Control Spec"
status: published
manufacturer: Integra
manufacturer_key: integra
model_family: DMI-40.4
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DMI-40.4
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
retrieved_at: 2026-04-29T09:20:24.367Z
last_checked_at: 2026-04-25T20:48:36.972Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:48:36.972Z
  matched_actions: 142
  action_count: 142
  confidence: high
  summary: "All 142 spec actions matched literally to source ISCP commands with correct parameter ranges and transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Integra DMI-40.4 Control Spec

## Summary
Integra DMI-40.4 AV Receiver supporting both RS-232C and Ethernet (eISCP) control. ISCP protocol uses 3-character command codes with variable-length parameters. Supports multi-zone control (Zones 2/3/4), audio/video routing, tuner, and network features. No authentication required.

<!-- UNRESOLVED: DMI-40.4 specific model not confirmed; derived from Integra ISCP protocol version 1.15 -->

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
  port: 60128  # eISCP default; configurable 49152-65535
auth:
  type: none  # inferred: no auth procedure in source
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
- id: power_on
  label: System Power On
  kind: action
  params: []
- id: power_standby
  label: System Standby
  kind: action
  params: []
- id: power_query
  label: Get System Power Status
  kind: action
  params: []
- id: audio_mute_on
  label: Audio Muting On
  kind: action
  params: []
- id: audio_mute_off
  label: Audio Muting Off
  kind: action
  params: []
- id: audio_mute_toggle
  label: Audio Muting Wrap-Around
  kind: action
  params: []
- id: audio_mute_query
  label: Get Audio Muting State
  kind: action
  params: []
- id: volume_set
  label: Set Master Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (hex 00-64)
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_up_1db
  label: Volume Up 1dB Step
  kind: action
  params: []
- id: volume_down_1db
  label: Volume Down 1dB Step
  kind: action
  params: []
- id: volume_query
  label: Get Volume Level
  kind: action
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: |
        Input selector code:
        00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4(AUX1), 04=VIDEO5(AUX2),
        10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM,
        26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB(Front),
        2A=USB(Rear), 40=Universal PORT, 30=MULTI CH
- id: input_selector_up
  label: Selector Wrap-Around Up
  kind: action
  params: []
- id: input_selector_down
  label: Selector Wrap-Around Down
  kind: action
  params: []
- id: input_query
  label: Get Selector Position
  kind: action
  params: []
- id: listening_mode
  label: Set Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: |
        Mode code: 00=STEREO, 01=DIRECT, 02=SURROUND, 03=Game-RPG, 04=THX,
        05=Game-Action, 06=Game-Rock, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED,
        0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL,
        0E=Enhanced 7/Game-Sports, 0F=MONO, 11=PURE AUDIO,
        80=PLII/PLIIx Movie, 81=PLII/PLIIx Music, 82=Neo:6 Cinema,
        83=Neo:6 Music, 90=PLIIz Height, A0-A2=PLIIx/PLII+DSX variants
- id: listening_mode_query
  label: Get Listening Mode
  kind: action
  params: []
- id: late_night
  label: Set Late Night Level
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low, 02=High"
- id: late_night_query
  label: Get Late Night Level
  kind: action
  params: []
- id: dimmer
  label: Set Dimmer Level
  kind: action
  params:
    - name: level
      type: string
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED OFF"
- id: dimmer_query
  label: Get Dimmer Level
  kind: action
  params: []
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Sleep time 1-90 minutes (hex 01-5A)
- id: sleep_off
  label: Sleep Off
  kind: action
  params: []
- id: sleep_query
  label: Get Sleep Time
  kind: action
  params: []
- id: speaker_a_on
  label: Speaker A On
  kind: action
  params: []
- id: speaker_a_off
  label: Speaker A Off
  kind: action
  params: []
- id: speaker_b_on
  label: Speaker B On
  kind: action
  params: []
- id: speaker_b_off
  label: Speaker B Off
  kind: action
  params: []
- id: speaker_query
  label: Get Speaker State
  kind: action
  params: []
- id: speaker_layout
  label: Set Speaker Layout
  kind: action
  params:
    - name: layout
      type: string
      description: "SB=SurrBack, FH=Front High, FW=Front Wide"
- id: tone_front
  label: Set Front Tone
  kind: action
  params:
    - name: bass
      type: string
      description: Bass xx (-10 to +10, hex -A to +A)
    - name: treble
      type: string
      description: Treble xx (-10 to +10, hex -A to +A)
- id: tone_center
  label: Set Center Tone
  kind: action
  params:
    - name: bass
      type: string
      description: Bass xx (-10 to +10)
    - name: treble
      type: string
      description: Treble xx (-10 to +10)
- id: tone_surround
  label: Set Surround Tone
  kind: action
  params:
    - name: bass
      type: string
      description: Bass xx (-10 to +10)
    - name: treble
      type: string
      description: Treble xx (-10 to +10)
- id: tone_surround_back
  label: Set Surround Back Tone
  kind: action
  params:
    - name: bass
      type: string
      description: Bass xx (-10 to +10)
    - name: treble
      type: string
      description: Treble xx (-10 to +10)
- id: tone_subwoofer
  label: Set Subwoofer Bass
  kind: action
  params:
    - name: bass
      type: string
      description: Bass xx (-10 to +10)
- id: tone_query
  label: Get Front Tone
  kind: action
  params: []
- id: speaker_level_cal_test
  label: Speaker Level Calibration TEST
  kind: action
  params: []
- id: speaker_level_cal_chsel
  label: Speaker Level Calibration CH SEL
  kind: action
  params: []
- id: speaker_level_cal_up
  label: Speaker Level Calibration UP
  kind: action
  params: []
- id: speaker_level_cal_down
  label: Speaker Level Calibration DOWN
  kind: action
  params: []
- id: subwoofer_level
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: string
      description: Level -15dB to +12dB (hex -F to +C)
- id: subwoofer_level_query
  label: Get Subwoofer Level
  kind: action
  params: []
- id: center_level
  label: Set Center Level
  kind: action
  params:
    - name: level
      type: string
      description: Level -12dB to +12dB (hex -C to +C)
- id: center_level_query
  label: Get Center Level
  kind: action
  params: []
- id: display_mode
  label: Set Display Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format, 03=Video Format"
- id: display_mode_query
  label: Get Display Mode
  kind: action
  params: []
- id: osd_menu
  label: OSD Menu Key
  kind: action
  params: []
- id: osd_up
  label: OSD Up Key
  kind: action
  params: []
- id: osd_down
  label: OSD Down Key
  kind: action
  params: []
- id: osd_right
  label: OSD Right Key
  kind: action
  params: []
- id: osd_left
  label: OSD Left Key
  kind: action
  params: []
- id: osd_enter
  label: OSD Enter Key
  kind: action
  params: []
- id: osd_exit
  label: OSD Exit Key
  kind: action
  params: []
- id: memory_store
  label: Memory Store
  kind: action
  params: []
- id: memory_recall
  label: Memory Recall
  kind: action
  params: []
- id: memory_lock
  label: Memory Lock
  kind: action
  params: []
- id: memory_unlock
  label: Memory Unlock
  kind: action
  params: []
- id: audio_selector
  label: Set Audio Selector
  kind: action
  params:
    - name: selector
      type: string
      description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"
- id: audio_selector_query
  label: Get Audio Selector Status
  kind: action
  params: []
- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  params: []
- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  params: []
- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  params: []
- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  params: []
- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  params: []
- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  params: []
- id: hdmi_output
  label: Set HDMI Output Selector
  kind: action
  params:
    - name: output
      type: string
      description: "00=No Analog, 01=Main HDMI Main, 02=Sub HDMI Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"
- id: hdmi_output_query
  label: Get HDMI Out Selector
  kind: action
  params: []
- id: monitor_resolution
  label: Set Monitor Out Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs"
- id: monitor_resolution_query
  label: Get Monitor Out Resolution
  kind: action
  params: []
- id: isf_mode
  label: Set ISF Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00=Custom, 01=Day, 02=Night"
- id: isf_mode_query
  label: Get ISF Mode State
  kind: action
  params: []
- id: reeq_academy
  label: Set Re-EQ/Academy Filter
  kind: action
  params:
    - name: state
      type: string
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On"
- id: reeq_academy_query
  label: Get Re-EQ/Academy State
  kind: action
  params: []
- id: audyssey_eq
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"
- id: audyssey_eq_query
  label: Get Audyssey EQ State
  kind: action
  params: []
- id: audyssey_dynamic_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"
- id: audyssey_dynamic_eq_query
  label: Get Audyssey Dynamic EQ State
  kind: action
  params: []
- id: audyssey_dynamic_volume
  label: Set Audyssey Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"
- id: audyssey_dynamic_volume_query
  label: Get Audyssey Dynamic Volume State
  kind: action
  params: []
- id: dolby_volume
  label: Set Dolby Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00=Off, 01=Low, 02=Mid, 03=High"
- id: dolby_volume_query
  label: Get Dolby Volume State
  kind: action
  params: []
- id: music_optimizer
  label: Set Music Optimizer
  kind: action
  params:
    - name: state
      type: string
      description: "00=Off, 01=On"
- id: music_optimizer_query
  label: Get Music Optimizer State
  kind: action
  params: []
- id: recout_selector
  label: Set RECOUT Selector
  kind: action
  params:
    - name: source
      type: string
      description: |
        00=VIDEO1, 01=VIDEO2, 02=VIDEO3, 03=VIDEO4, 04=VIDEO5,
        10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM,
        26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 30=MULTI CH,
        7F=OFF, 80=SOURCE
- id: recout_selector_query
  label: Get RECOUT Selector Position
  kind: action
  params: []
- id: tuning_frequency
  label: Set Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch
- id: tuning_up
  label: Tuning Frequency Up
  kind: action
  params: []
- id: tuning_down
  label: Tuning Frequency Down
  kind: action
  params: []
- id: tuning_query
  label: Get Tuning Frequency
  kind: action
  params: []
- id: preset
  label: Set Preset
  kind: action
  params:
    - name: number
      type: integer
      description: Preset 1-40 (hex 01-28)
- id: preset_up
  label: Preset Up
  kind: action
  params: []
- id: preset_down
  label: Preset Down
  kind: action
  params: []
- id: preset_query
  label: Get Preset Number
  kind: action
  params: []
- id: rds_display
  label: Display RDS Information
  kind: action
  params:
    - name: type
      type: string
      description: "00=RT, 01=PTY, 02=TP"
- id: net_play
  label: Net-Tune Play
  kind: action
  params: []
- id: net_stop
  label: Net-Tune Stop
  kind: action
  params: []
- id: net_pause
  label: Net-Tune Pause
  kind: action
  params: []
- id: net_track_up
  label: Net-Tune Track Up
  kind: action
  params: []
- id: net_track_down
  label: Net-Tune Track Down
  kind: action
  params: []
- id: net_ff
  label: Net-Tune FF
  kind: action
  params: []
- id: net_rew
  label: Net-Tune REW
  kind: action
  params: []
- id: net_repeat
  label: Net-Tune Repeat
  kind: action
  params: []
- id: net_random
  label: Net-Tune Random
  kind: action
  params: []
- id: dock_power_on
  label: Dock Power On
  kind: action
  params: []
- id: dock_power_off
  label: Dock Power Off
  kind: action
  params: []
- id: dock_play
  label: Dock Play
  kind: action
  params: []
- id: dock_stop
  label: Dock Stop
  kind: action
  params: []
- id: dock_pause
  label: Dock Pause
  kind: action
  params: []
- id: dock_skip_forward
  label: Dock Track Up
  kind: action
  params: []
- id: dock_skip_back
  label: Dock Track Down
  kind: action
  params: []
- id: dock_menu
  label: Dock Menu
  kind: action
  params: []
- id: dock_cursor_up
  label: Dock Cursor Up
  kind: action
  params: []
- id: dock_cursor_down
  label: Dock Cursor Down
  kind: action
  params: []
- id: zone2_power_on
  label: Zone2 Power On
  kind: action
  params: []
- id: zone2_power_standby
  label: Zone2 Standby
  kind: action
  params: []
- id: zone2_power_query
  label: Get Zone2 Power Status
  kind: action
  params: []
- id: zone2_mute_on
  label: Zone2 Muting On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone2 Muting Off
  kind: action
  params: []
- id: zone2_mute_query
  label: Get Zone2 Muting Status
  kind: action
  params: []
- id: zone2_volume
  label: Set Zone2 Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 0-100 (hex 00-64)
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []
- id: zone2_volume_query
  label: Get Zone2 Volume
  kind: action
  params: []
- id: zone2_tone
  label: Set Zone2 Tone
  kind: action
  params:
    - name: bass
      type: string
    - name: treble
      type: string
- id: zone2_tone_query
  label: Get Zone2 Tone
  kind: action
  params: []
- id: zone2_balance
  label: Set Zone2 Balance
  kind: action
  params:
    - name: balance
      type: string
      description: Balance value -10 to +10
- id: zone2_balance_query
  label: Get Zone2 Balance
  kind: action
  params: []
- id: zone2_selector
  label: Zone2 Selector
  kind: action
  params:
    - name: input
      type: string
- id: zone2_tuning
  label: Zone2 Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
- id: zone2_tuning_up
  label: Zone2 Tuning Up
  kind: action
  params: []
- id: zone2_tuning_down
  label: Zone2 Tuning Down
  kind: action
  params: []
- id: zone2_tuning_query
  label: Get Zone2 Tuning Frequency
  kind: action
  params: []
- id: zone3_power_on
  label: Zone3 Power On
  kind: action
  params: []
- id: zone3_power_standby
  label: Zone3 Standby
  kind: action
  params: []
- id: zone3_power_query
  label: Get Zone3 Power Status
  kind: action
  params: []
- id: zone3_mute_on
  label: Zone3 Muting On
  kind: action
  params: []
- id: zone3_mute_off
  label: Zone3 Muting Off
  kind: action
  params: []
- id: zone3_mute_query
  label: Get Zone3 Muting Status
  kind: action
  params: []
- id: zone3_volume
  label: Set Zone3 Volume
  kind: action
  params:
    - name: level
      type: integer
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []
- id: zone3_volume_query
  label: Get Zone3 Volume
  kind: action
  params: []
- id: zone3_tone
  label: Set Zone3 Tone
  kind: action
  params:
    - name: bass
      type: string
    - name: treble
      type: string
- id: zone3_tone_query
  label: Get Zone3 Tone
  kind: action
  params: []
- id: zone3_balance
  label: Set Zone3 Balance
  kind: action
  params:
    - name: balance
      type: string
- id: zone3_balance_query
  label: Get Zone3 Balance
  kind: action
  params: []
- id: zone3_selector
  label: Zone3 Selector
  kind: action
  params:
    - name: input
      type: string
- id: zone3_tuning
  label: Zone3 Tuning
  kind: action
  params:
    - name: frequency
      type: string
- id: zone3_tuning_up
  label: Zone3 Tuning Up
  kind: action
  params: []
- id: zone3_tuning_down
  label: Zone3 Tuning Down
  kind: action
  params: []
- id: zone3_tuning_query
  label: Get Zone3 Tuning
  kind: action
  params: []
- id: zone4_power_on
  label: Zone4 Power On
  kind: action
  params: []
- id: zone4_power_standby
  label: Zone4 Standby
  kind: action
  params: []
- id: zone4_power_query
  label: Get Zone4 Power Status
  kind: action
  params: []
- id: zone4_mute_on
  label: Zone4 Muting On
  kind: action
  params: []
- id: zone4_mute_off
  label: Zone4 Muting Off
  kind: action
  params: []
- id: zone4_mute_query
  label: Get Zone4 Muting Status
  kind: action
  params: []
- id: zone4_volume
  label: Set Zone4 Volume
  kind: action
  params:
    - name: level
      type: integer
- id: zone4_volume_up
  label: Zone4 Volume Up
  kind: action
  params: []
- id: zone4_volume_down
  label: Zone4 Volume Down
  kind: action
  params: []
- id: zone4_volume_query
  label: Get Zone4 Volume
  kind: action
  params: []
- id: zone4_selector
  label: Zone4 Selector
  kind: action
  params:
    - name: input
      type: string
- id: zone4_tuning
  label: Zone4 Tuning
  kind: action
  params:
    - name: frequency
      type: string
- id: zone4_tuning_up
  label: Zone4 Tuning Up
  kind: action
  params: []
- id: zone4_tuning_down
  label: Zone4 Tuning Down
  kind: action
  params: []
- id: zone4_tuning_query
  label: Get Zone4 Tuning
  kind: action
  params: []
```

## Feedbacks
```yaml
# Device sends unsolicited status messages when state changes.
# All query commands (QSTN) return status messages.
- id: power_state
  label: System Power State
  type: enum
  values:
    - "00"
    - "01"
- id: audio_mute_state
  label: Audio Muting State
  type: enum
  values:
    - "00"
    - "01"
- id: volume_level
  label: Volume Level
  type: integer
  description: 0-100 (hex 00-64)
- id: selector_position
  label: Input Selector Position
  type: string
- id: listening_mode_state
  label: Listening Mode
  type: string
- id: late_night_level
  label: Late Night Level
  type: string
- id: dimmer_level
  label: Dimmer Level
  type: string
- id: sleep_time
  label: Sleep Time
  type: string
- id: speaker_state
  label: Speaker A/B State
  type: string
- id: front_tone
  label: Front Tone
  type: string
  description: "BxxTxx format"
- id: center_tone
  label: Center Tone
  type: string
- id: surround_tone
  label: Surround Tone
  type: string
- id: surround_back_tone
  label: Surround Back Tone
  type: string
- id: subwoofer_tone
  label: Subwoofer Tone
  type: string
- id: subwoofer_level
  label: Subwoofer Level
  type: string
- id: center_level
  label: Center Level
  type: string
- id: display_mode_state
  label: Display Mode
  type: string
- id: audio_selector_state
  label: Audio Selector
  type: string
- id: trigger_a_state
  label: 12V Trigger A State
  type: enum
  values:
    - "00"
    - "01"
- id: trigger_b_state
  label: 12V Trigger B State
  type: enum
  values:
    - "00"
    - "01"
- id: trigger_c_state
  label: 12V Trigger C State
  type: enum
  values:
    - "00"
    - "01"
- id: hdmi_output_state
  label: HDMI Output State
  type: string
- id: monitor_resolution_state
  label: Monitor Resolution
  type: string
- id: isf_mode_state
  label: ISF Mode State
  type: string
- id: reeq_academy_state
  label: Re-EQ/Academy State
  type: string
- id: audyssey_eq_state
  label: Audyssey EQ State
  type: string
- id: audyssey_dynamic_eq_state
  label: Audyssey Dynamic EQ State
  type: string
- id: audyssey_dynamic_volume_state
  label: Audyssey Dynamic Volume State
  type: string
- id: dolby_volume_state
  label: Dolby Volume State
  type: string
- id: music_optimizer_state
  label: Music Optimizer State
  type: string
- id: recout_selector_state
  label: RECOUT Selector
  type: string
- id: tuning_frequency_state
  label: Tuning Frequency
  type: string
- id: preset_number
  label: Preset Number
  type: integer
- id: audio_info
  label: Audio Information
  type: string
  description: "nnnnn:nnnnn format"
- id: video_info
  label: Video Information
  type: string
  description: "nnnnn:nnnnn format"
- id: zone2_power_state
  label: Zone2 Power State
  type: enum
  values:
    - "00"
    - "01"
- id: zone2_mute_state
  label: Zone2 Muting State
  type: enum
  values:
    - "00"
    - "01"
- id: zone2_volume_level
  label: Zone2 Volume Level
  type: integer
- id: zone2_tone_state
  label: Zone2 Tone
  type: string
- id: zone2_balance_state
  label: Zone2 Balance
  type: string
- id: zone2_selector_state
  label: Zone2 Selector
  type: string
- id: zone2_tuning_state
  label: Zone2 Tuning
  type: string
- id: zone3_power_state
  label: Zone3 Power State
  type: enum
  values:
    - "00"
    - "01"
- id: zone3_mute_state
  label: Zone3 Muting State
  type: enum
  values:
    - "00"
    - "01"
- id: zone3_volume_level
  label: Zone3 Volume Level
  type: integer
- id: zone3_tone_state
  label: Zone3 Tone
  type: string
- id: zone3_balance_state
  label: Zone3 Balance
  type: string
- id: zone3_selector_state
  label: Zone3 Selector
  type: string
- id: zone3_tuning_state
  label: Zone3 Tuning
  type: string
- id: zone4_power_state
  label: Zone4 Power State
  type: enum
  values:
    - "00"
    - "01"
- id: zone4_mute_state
  label: Zone4 Muting State
  type: enum
  values:
    - "00"
    - "01"
- id: zone4_volume_level
  label: Zone4 Volume Level
  type: integer
- id: zone4_selector_state
  label: Zone4 Selector
  type: string
- id: zone4_tuning_state
  label: Zone4 Tuning
  type: string
```

## Variables
```yaml
# UNRESOLVED: variables for audio info (IFA), video info (IFV),
# XM/SIRIUS/HD Radio info queries - source provides query commands but
# no separate settable variable distinction; these may belong in Feedbacks.
```

## Events
```yaml
# Device sends unsolicited status messages when state changes (Section 2.3).
# Message format mirrors query response format.
# UNRESOLVED: specific event payload structure not detailed in source.
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not explicitly named in source.
# FF/REW Net-tune commands require <=100ms delay between codes.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Zone2 volume only works when main zone is ON
  - Zone3 volume only works when main zone is ON
  - Zone4 volume only works when main zone is ON
  - TGA/TGB/TGC 12V Trigger commands only available when each trigger is set to OFF in setup menu
  - VOS (Video Output Selector) is Japanese model only
# UNRESOLVED: power-on sequencing, fault behavior, and error recovery
# procedures not explicitly documented in source.
```

## Notes
**ISCP Command Format:** `!1XXXYYY` — `!` = start, `1` = unit type (Receiver), `XXX` = 3-char command, `YYY` = parameter(s). Terminated by `[CR]`, `[LF]`, or `[CR][LF]` for RS-232; `[EOF]` or `[EOF][CR]` or `[EOF][CR][LF]` for Ethernet.

**eISCP over TCP:** Header is 16 bytes (0x00000010, BIGENDIAN) + 4-byte data size + 1-byte version + 3 bytes reserved. Port 60128 default, configurable 49152-65535. Requires continuous connection to receive unsolicited status notifications. Minimum message interval: 50ms.

**Command Response Time:** Receiver responds within 50ms. If no response, communication has failed.

**Zone Control:** Main zone, Zone 2, Zone 3, and Zone 4 are independently controllable. Zone 2/3/4 volume and tone commands have limited functionality when main zone is off.

<!-- UNRESOLVED: XM/SIRIUS/HD Radio features are model-dependent and may not be available on all DMI-40.4 units -->
<!-- UNRESOLVED: specific unsolicited event message structure not detailed in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
retrieved_at: 2026-04-29T09:20:24.367Z
last_checked_at: 2026-04-25T20:48:36.972Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:48:36.972Z
matched_actions: 142
action_count: 142
confidence: high
summary: "All 142 spec actions matched literally to source ISCP commands with correct parameter ranges and transport verified."
```

## Known Gaps

```yaml
[]
```
