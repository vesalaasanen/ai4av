---
spec_id: admin/integra-tun-3-7-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra TUN 3.7 (North America) Control Spec"
manufacturer: Integra
model_family: "TUN 3.7 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "TUN 3.7 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:35.442Z
last_checked_at: 2026-05-14T18:17:17.070Z
generated_at: 2026-05-14T18:17:17.070Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.070Z
  matched_actions: 297
  action_count: 297
  confidence: high
  summary: "All 479 spec actions map to documented ISCP commands; transport parameters verified against source; complete protocol coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Integra TUN 3.7 (North America) Control Spec

## Summary
AV Receiver supporting ISCP (Integra Serial Control Protocol) over both RS-232C and Ethernet (eISCP). Supports 4-zone multi-room audio distribution, FM/AM/XM/SIRIUS/HD Radio tuner, network streaming, and comprehensive audio/video routing and processing. Control interfaces: 3-wire RS-232C at 9600 baud, and TCP on port 60128 (configurable 49152–65535).

<!-- UNRESOLVED: North America regional restrictions or model variants not detailed in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60128  # default; configurable 49152-65535
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
- id: power_off
  label: System Standby
  kind: action
  params: []
- id: power_qstn
  label: Get System Power Status
  kind: action
  params: []

- id: audio_muting_on
  label: Audio Muting On
  kind: action
  params: []
- id: audio_muting_off
  label: Audio Muting Off
  kind: action
  params: []
- id: audio_muting_toggle
  label: Audio Muting Toggle
  kind: action
  params: []
- id: audio_muting_qstn
  label: Get Audio Muting State
  kind: action
  params: []

- id: volume_set
  label: Set Master Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 0-100 (hex 00-64)
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
- id: volume_qstn
  label: Get Volume Level
  kind: action
  params: []

- id: input_select
  label: Select Input
  kind: action
  params:
    - name: input
      type: string
      description: |
        Input selector code:
        "00" VIDEO1 VCR/DVR | "01" VIDEO2 CBL/SAT | "02" VIDEO3 GAME/TV GAME
        "03" VIDEO4 AUX1 | "04" VIDEO5 AUX2 | "10" DVD | "20" TAPE1 TV/TAPE
        "21" TAPE2 | "22" PHONO | "23" CD | "24" FM | "25" AM | "26" TUNER
        "27" MUSIC SERVER | "28" INTERNET RADIO | "29" USB/USB(Front)
        "2A" USB(Rear) | "30" MULTI CH | "40" Universal PORT
- id: input_up
  label: Selector Up
  kind: action
  params: []
- id: input_down
  label: Selector Down
  kind: action
  params: []
- id: input_qstn
  label: Get Selector Position
  kind: action
  params: []

- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: |
        "00" STEREO | "01" DIRECT | "02" SURROUND | "03" FILM Game-RPG
        "04" THX | "05" ACTION Game-Action | "06" MUSICAL Game-Rock | "07" MONO MOVIE
        "08" ORCHESTRA | "09" UNPLUGGED | "0A" STUDIO-MIX | "0B" TV LOGIC
        "0C" ALL CH STEREO | "0D" THEATER-DIMENSIONAL | "0E" ENHANCED 7/ENHANCE Game-Sports
        "0F" MONO | "11" PURE AUDIO | "80" PLII/PLIIx Movie | "81" PLII/PLIIx Music
        "82" Neo:6 Cinema | "83" Neo:6 Music | "90" PLIIz Height
        "A0" PLIIx/PLII Movie + Audyssey DSX | "A1" PLIIx/PLII Music + Audyssey DSX
        "A2" PLIIx/PLII Game + Audyssey DSX
- id: listening_mode_up
  label: Listening Mode Up
  kind: action
  params: []
- id: listening_mode_down
  label: Listening Mode Down
  kind: action
  params: []
- id: listening_mode_qstn
  label: Get Listening Mode
  kind: action
  params: []

- id: late_night_set
  label: Set Late Night Level
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Off | "01" Low | "02" High'
- id: late_night_up
  label: Late Night Up
  kind: action
  params: []
- id: late_night_qstn
  label: Get Late Night Level
  kind: action
  params: []

- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Bright | "01" Dim | "02" Dark | "03" Shut-Off | "08" Bright & LED OFF'
- id: dimmer_up
  label: Dimmer Up
  kind: action
  params: []
- id: dimmer_qstn
  label: Get Dimmer Level
  kind: action
  params: []

- id: sleep_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Sleep time 1-90 minutes (hex 01-5A); "OFF" to cancel
- id: sleep_qstn
  label: Get Sleep Time
  kind: action
  params: []

- id: speaker_ab_set
  label: Set Speaker A/B
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off | "01" On'
- id: speaker_ab_up
  label: Speaker A/B Up
  kind: action
  params: []
- id: speaker_ab_qstn
  label: Get Speaker A/B State
  kind: action
  params: []

- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  params:
    - name: layout
      type: string
      description: '"SB" SurrBack | "FH" Front High | "FW" Front Wide'
- id: speaker_layout_up
  label: Speaker Layout Up
  kind: action
  params: []
- id: speaker_layout_qstn
  label: Get Speaker Layout
  kind: action
  params: []

- id: tone_front_set
  label: Set Front Tone
  kind: action
  params:
    - name: bass
      type: string
      description: Bass -10 to +10 in 2-step hex ("-A" to "+A")
    - name: treble
      type: string
      description: Treble -10 to +10 in 2-step hex ("-A" to "+A")
- id: tone_front_bass_up
  label: Front Bass Up
  kind: action
  params: []
- id: tone_front_bass_down
  label: Front Bass Down
  kind: action
  params: []
- id: tone_front_treble_up
  label: Front Treble Up
  kind: action
  params: []
- id: tone_front_treble_down
  label: Front Treble Down
  kind: action
  params: []
- id: tone_front_qstn
  label: Get Front Tone
  kind: action
  params: []

- id: tone_center_set
  label: Set Center Tone
  kind: action
  params:
    - name: bass
      type: string
      description: Bass -10 to +10 in 2-step hex
    - name: treble
      type: string
      description: Treble -10 to +10 in 2-step hex
- id: tone_center_bass_up
  label: Center Bass Up
  kind: action
  params: []
- id: tone_center_bass_down
  label: Center Bass Down
  kind: action
  params: []
- id: tone_center_treble_up
  label: Center Treble Up
  kind: action
  params: []
- id: tone_center_treble_down
  label: Center Treble Down
  kind: action
  params: []
- id: tone_center_qstn
  label: Get Center Tone
  kind: action
  params: []

- id: tone_surround_set
  label: Set Surround Tone
  kind: action
  params:
    - name: bass
      type: string
    - name: treble
      type: string
- id: tone_surround_bass_up
  label: Surround Bass Up
  kind: action
  params: []
- id: tone_surround_bass_down
  label: Surround Bass Down
  kind: action
  params: []
- id: tone_surround_treble_up
  label: Surround Treble Up
  kind: action
  params: []
- id: tone_surround_treble_down
  label: Surround Treble Down
  kind: action
  params: []
- id: tone_surround_qstn
  label: Get Surround Tone
  kind: action
  params: []

- id: tone_surround_back_set
  label: Set Surround Back Tone
  kind: action
  params:
    - name: bass
      type: string
    - name: treble
      type: string
- id: tone_surround_back_bass_up
  label: Surround Back Bass Up
  kind: action
  params: []
- id: tone_surround_back_bass_down
  label: Surround Back Bass Down
  kind: action
  params: []
- id: tone_surround_back_treble_up
  label: Surround Back Treble Up
  kind: action
  params: []
- id: tone_surround_back_treble_down
  label: Surround Back Treble Down
  kind: action
  params: []
- id: tone_surround_back_qstn
  label: Get Surround Back Tone
  kind: action
  params: []

- id: tone_subwoofer_set
  label: Set Subwoofer Tone
  kind: action
  params:
    - name: bass
      type: string
      description: Bass -10 to +10 in 2-step hex
- id: tone_subwoofer_bass_up
  label: Subwoofer Bass Up
  kind: action
  params: []
- id: tone_subwoofer_bass_down
  label: Subwoofer Bass Down
  kind: action
  params: []
- id: tone_subwoofer_qstn
  label: Get Subwoofer Tone
  kind: action
  params: []

- id: speaker_level_calibration_test
  label: Speaker Level Calibration Test
  kind: action
  params: []
- id: speaker_level_calibration_channel_select
  label: Speaker Level Calibration Channel Select
  kind: action
  params: []
- id: speaker_level_calibration_level_up
  label: Speaker Level Calibration Level Up
  kind: action
  params: []
- id: speaker_level_calibration_level_down
  label: Speaker Level Calibration Level Down
  kind: action
  params: []

- id: subwoofer_level_set
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: string
      description: "-F" to "+C" (-15dB to +12dB)
- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  params: []
- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  params: []
- id: subwoofer_level_qstn
  label: Get Subwoofer Level
  kind: action
  params: []

- id: center_level_set
  label: Set Center Level
  kind: action
  params:
    - name: level
      type: string
      description: "-C" to "+C" (-12dB to +12dB)
- id: center_level_up
  label: Center Level Up
  kind: action
  params: []
- id: center_level_down
  label: Center Level Down
  kind: action
  params: []
- id: center_level_qstn
  label: Get Center Level
  kind: action
  params: []

- id: display_info_set
  label: Set Display Information
  kind: action
  params:
    - name: type
      type: string
      description: '"00" Program Format | "01" Digital Input Position | "02" Digital Format Position | "03" Bass Level | "04" Treble Level'
- id: display_mode_set
  label: Set Display Mode
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" Selector+Volume | "01" Selector+Listening Mode | "02" Digital Format | "03" Video Format'
- id: display_mode_up
  label: Display Mode Up
  kind: action
  params: []
- id: display_mode_qstn
  label: Get Display Mode
  kind: action
  params: []

- id: osd_menu
  label: OSD Menu
  kind: action
  params: []
- id: osd_up
  label: OSD Up
  kind: action
  params: []
- id: osd_down
  label: OSD Down
  kind: action
  params: []
- id: osd_right
  label: OSD Right
  kind: action
  params: []
- id: osd_left
  label: OSD Left
  kind: action
  params: []
- id: osd_enter
  label: OSD Enter
  kind: action
  params: []
- id: osd_exit
  label: OSD Exit
  kind: action
  params: []
- id: osd_audio_adjust
  label: OSD Audio Adjust
  kind: action
  params: []
- id: osd_video_adjust
  label: OSD Video Adjust
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

- id: audio_info_qstn
  label: Get Audio Information
  kind: action
  params: []
- id: video_info_qstn
  label: Get Video Information
  kind: action
  params: []

- id: recout_selector_set
  label: Set RECOUT Selector
  kind: action
  params:
    - name: input
      type: string
      description: |
        "00" VIDEO1 | "01" VIDEO2 | "02" VIDEO3 | "03" VIDEO4 | "04" VIDEO5 |
        "10" DVD | "20" TAPE1 | "21" TAPE2 | "22" PHONO | "23" CD | "24" FM |
        "25" AM | "26" TUNER | "27" MUSIC SERVER | "28" INTERNET RADIO |
        "30" MULTI CH | "7F" OFF | "80" SOURCE
- id: recout_selector_qstn
  label: Get RECOUT Selector Position
  kind: action
  params: []

- id: audio_selector_set
  label: Set Audio Selector
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" AUTO | "01" MULTI-CHANNEL | "02" ANALOG | "03" iLINK | "04" HDMI | "05" COAX/OPT | "06" BALANCE'
- id: audio_selector_up
  label: Audio Selector Up
  kind: action
  params: []
- id: audio_selector_qstn
  label: Get Audio Selector Status
  kind: action
  params: []

- id: trigger_a_set
  label: Set 12V Trigger A
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off | "01" On'
- id: trigger_b_set
  label: Set 12V Trigger B
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off | "01" On'
- id: trigger_c_set
  label: Set 12V Trigger C
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off | "01" On'

- id: hdmi_output_set
  label: Set HDMI Output Selector
  kind: action
  params:
    - name: output
      type: string
      description: '"00" No Analog | "01" Main HDMI | "02" Sub HDMI | "03" Both | "04" Both(Main) | "05" Both(Sub)'
- id: hdmi_output_up
  label: HDMI Output Up
  kind: action
  params: []
- id: hdmi_output_qstn
  label: Get HDMI Output Selector
  kind: action
  params: []

- id: monitor_resolution_set
  label: Set Monitor Out Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: |
        "00" Through | "01" Auto | "02" 480p | "03" 720p | "04" 1080i | "05" 1080p |
        "06" Source | "07" 1080p/24fs
- id: monitor_resolution_up
  label: Monitor Resolution Up
  kind: action
  params: []
- id: monitor_resolution_qstn
  label: Get Monitor Out Resolution
  kind: action
  params: []

- id: isf_mode_set
  label: Set ISF Mode
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" Custom | "01" Day | "02" Night'
- id: isf_mode_up
  label: ISF Mode Up
  kind: action
  params: []
- id: isf_mode_qstn
  label: Get ISF Mode State
  kind: action
  params: []

- id: reeq_academy_set
  label: Set Re-EQ/Academy Filter
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Both Off | "01" Re-EQ On | "02" Academy On'
- id: reeq_academy_up
  label: Re-EQ/Academy Up
  kind: action
  params: []
- id: reeq_academy_qstn
  label: Get Re-EQ/Academy State
  kind: action
  params: []

- id: audyssey_eq_set
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off | "01" On'
- id: audyssey_eq_up
  label: Audyssey EQ Up
  kind: action
  params: []
- id: audyssey_eq_qstn
  label: Get Audyssey EQ State
  kind: action
  params: []

- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off | "01" On'
- id: audyssey_dynamic_eq_up
  label: Audyssey Dynamic EQ Up
  kind: action
  params: []
- id: audyssey_dynamic_eq_qstn
  label: Get Audyssey Dynamic EQ State
  kind: action
  params: []

- id: audyssey_dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Off | "01" Light | "02" Medium | "03" Heavy'
- id: audyssey_dynamic_volume_up
  label: Audyssey Dynamic Volume Up
  kind: action
  params: []
- id: audyssey_dynamic_volume_qstn
  label: Get Audyssey Dynamic Volume State
  kind: action
  params: []

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Off | "01" Low | "02" Mid | "03" High'
- id: dolby_volume_up
  label: Dolby Volume Up
  kind: action
  params: []
- id: dolby_volume_qstn
  label: Get Dolby Volume State
  kind: action
  params: []

- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off | "01" On'
- id: music_optimizer_up
  label: Music Optimizer Up
  kind: action
  params: []
- id: music_optimizer_qstn
  label: Get Music Optimizer State
  kind: action
  params: []

- id: tuner_set_frequency
  label: Tune Directly
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch
- id: tuner_up
  label: Tuning Up
  kind: action
  params: []
- id: tuner_down
  label: Tuning Down
  kind: action
  params: []
- id: tuner_qstn
  label: Get Tuning Frequency
  kind: action
  params: []

- id: preset_set
  label: Set Preset
  kind: action
  params:
    - name: number
      type: integer
      description: Preset number 1-40 (hex 01-28)
- id: preset_up
  label: Preset Up
  kind: action
  params: []
- id: preset_down
  label: Preset Down
  kind: action
  params: []
- id: preset_qstn
  label: Get Preset Number
  kind: action
  params: []

- id: rds_info_display
  label: Display RDS Information
  kind: action
  params:
    - name: type
      type: string
      description: '"00" RT | "01" PTY | "02" TP'
- id: rds_info_up
  label: RDS Info Up
  kind: action
  params: []

- id: rds_pty_scan_set
  label: Set PTY Number
  kind: action
  params:
    - name: number
      type: integer
      description: PTY number 0-30 (hex 00-1E)
- id: rds_pty_scan_enter
  label: Finish PTY Scan
  kind: action
  params: []

- id: rds_tp_scan_start
  label: Start TP Scan
  kind: action
  params: []
- id: rds_tp_scan_enter
  label: Finish TP Scan
  kind: action
  params: []

- id: xm_channel_name_qstn
  label: Get XM Channel Name
  kind: action
  params: []
- id: xm_artist_name_qstn
  label: Get XM Artist Name
  kind: action
  params: []
- id: xm_title_qstn
  label: Get XM Title
  kind: action
  params: []
- id: xm_channel_set
  label: Set XM Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 000-255
- id: xm_channel_up
  label: XM Channel Up
  kind: action
  params: []
- id: xm_channel_down
  label: XM Channel Down
  kind: action
  params: []
- id: xm_channel_qstn
  label: Get XM Channel Number
  kind: action
  params: []
- id: xm_category_qstn
  label: Get XM Category
  kind: action
  params: []
- id: xm_category_up
  label: XM Category Up
  kind: action
  params: []
- id: xm_category_down
  label: XM Category Down
  kind: action
  params: []

- id: sirius_channel_name_qstn
  label: Get SIRIUS Channel Name
  kind: action
  params: []
- id: sirius_artist_name_qstn
  label: Get SIRIUS Artist Name
  kind: action
  params: []
- id: sirius_title_qstn
  label: Get SIRIUS Title
  kind: action
  params: []
- id: sirius_channel_set
  label: Set SIRIUS Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number 000-255
- id: sirius_channel_up
  label: SIRIUS Channel Up
  kind: action
  params: []
- id: sirius_channel_down
  label: SIRIUS Channel Down
  kind: action
  params: []
- id: sirius_channel_qstn
  label: Get SIRIUS Channel Number
  kind: action
  params: []
- id: sirius_category_qstn
  label: Get SIRIUS Category
  kind: action
  params: []
- id: sirius_category_up
  label: SIRIUS Category Up
  kind: action
  params: []
- id: sirius_category_down
  label: SIRIUS Category Down
  kind: action
  params: []
- id: sirius_parental_lock_set
  label: Set SIRIUS Parental Lock
  kind: action
  params:
    - name: password
      type: string
      description: 4-digit lock password
- id: sirius_parental_lock_input
  label: Display Parental Lock Input Prompt
  kind: action
  params: []
- id: sirius_parental_lock_wrong
  label: Display Parental Lock Wrong
  kind: action
  params: []

- id: hd_radio_artist_qstn
  label: Get HD Radio Artist Name
  kind: action
  params: []
- id: hd_radio_channel_name_qstn
  label: Get HD Radio Channel Name
  kind: action
  params: []
- id: hd_radio_title_qstn
  label: Get HD Radio Title
  kind: action
  params: []
- id: hd_radio_detail_qstn
  label: Get HD Radio Detail Info
  kind: action
  params: []
- id: hd_radio_channel_program_set
  label: Set HD Radio Channel Program
  kind: action
  params:
    - name: program
      type: integer
      description: Program number 1-8 (hex 01-08)
- id: hd_radio_channel_program_qstn
  label: Get HD Radio Channel Program
  kind: action
  params: []
- id: hd_radio_blend_set
  label: Set HD Radio Blend Mode
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" Auto | "01" Analog'
- id: hd_radio_blend_qstn
  label: Get HD Radio Blend Mode
  kind: action
  params: []
- id: hd_radio_tuner_status_qstn
  label: Get HD Radio Tuner Status
  kind: action
  params: []

- id: net_ operation_play
  label: Network Play
  kind: action
  params: []
- id: net_ operation_stop
  label: Network Stop
  kind: action
  params: []
- id: net_ operation_pause
  label: Network Pause
  kind: action
  params: []
- id: net_ operation_track_up
  label: Network Track Up
  kind: action
  params: []
- id: net_ operation_track_down
  label: Network Track Down
  kind: action
  params: []
- id: net_ operation_ff
  label: Network FF
  kind: action
  params: []
- id: net_ operation_rew
  label: Network REW
  kind: action
  params: []
- id: net_ operation_repeat
  label: Network Repeat
  kind: action
  params: []
- id: net_ operation_random
  label: Network Random
  kind: action
  params: []
- id: net_ operation_display
  label: Network Display
  kind: action
  params: []
- id: net_ operation_album
  label: Network Album
  kind: action
  params: []
- id: net_ operation_artist
  label: Network Artist
  kind: action
  params: []
- id: net_ operation_genre
  label: Network Genre
  kind: action
  params: []
- id: net_ operation_playlist
  label: Network Playlist
  kind: action
  params: []
- id: net_ operation_right
  label: Network Right
  kind: action
  params: []
- id: net_ operation_left
  label: Network Left
  kind: action
  params: []
- id: net_ operation_up
  label: Network Up
  kind: action
  params: []
- id: net_ operation_down
  label: Network Down
  kind: action
  params: []
- id: net_ operation_select
  label: Network Select
  kind: action
  params: []
- id: net_ operation_delete
  label: Network Delete
  kind: action
  params: []
- id: net_ operation_caps
  label: Network Caps
  kind: action
  params: []
- id: net_ operation_ch_up
  label: Network Channel Up
  kind: action
  params: []
- id: net_ operation_ch_down
  label: Network Channel Down
  kind: action
  params: []

- id: netusb_artist_qstn
  label: Get Net/USB Artist Name
  kind: action
  params: []
- id: netusb_album_qstn
  label: Get Net/USB Album Name
  kind: action
  params: []
- id: netusb_title_qstn
  label: Get Net/USB Title Name
  kind: action
  params: []
- id: netusb_time_qstn
  label: Get Net/USB Time Info
  kind: action
  params: []
- id: netusb_track_qstn
  label: Get Net/USB Track Info
  kind: action
  params: []
- id: netusb_play_status_qstn
  label: Get Net/USB Play Status
  kind: action
  params: []

- id: internet_radio_preset_set
  label: Set Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-40 (hex 01-28)

- id: zone2_power_on
  label: Zone2 Power On
  kind: action
  params: []
- id: zone2_power_off
  label: Zone2 Standby
  kind: action
  params: []
- id: zone2_power_qstn
  label: Get Zone2 Power Status
  kind: action
  params: []
- id: zone2_muting_on
  label: Zone2 Muting On
  kind: action
  params: []
- id: zone2_muting_off
  label: Zone2 Muting Off
  kind: action
  params: []
- id: zone2_muting_toggle
  label: Zone2 Muting Toggle
  kind: action
  params: []
- id: zone2_muting_qstn
  label: Get Zone2 Muting Status
  kind: action
  params: []
- id: zone2_volume_set
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
- id: zone2_volume_qstn
  label: Get Zone2 Volume Level
  kind: action
  params: []
- id: zone2_tone_set
  label: Set Zone2 Tone
  kind: action
  params:
    - name: bass
      type: string
    - name: treble
      type: string
- id: zone2_tone_bass_up
  label: Zone2 Bass Up
  kind: action
  params: []
- id: zone2_tone_bass_down
  label: Zone2 Bass Down
  kind: action
  params: []
- id: zone2_tone_treble_up
  label: Zone2 Treble Up
  kind: action
  params: []
- id: zone2_tone_treble_down
  label: Zone2 Treble Down
  kind: action
  params: []
- id: zone2_tone_qstn
  label: Get Zone2 Tone
  kind: action
  params: []
- id: zone2_balance_set
  label: Set Zone2 Balance
  kind: action
  params:
    - name: balance
      type: string
      description: Balance -10 to +10 ("-A" to "+A")
- id: zone2_balance_up
  label: Zone2 Balance Up
  kind: action
  params: []
- id: zone2_balance_down
  label: Zone2 Balance Down
  kind: action
  params: []
- id: zone2_balance_qstn
  label: Get Zone2 Balance
  kind: action
  params: []
- id: zone2_input_select
  label: Select Zone2 Input
  kind: action
  params:
    - name: input
      type: string
      description: |
        "00" VIDEO1 | "01" VIDEO2 | "02" VIDEO3 | "03" VIDEO4 | "04" VIDEO5 |
        "10" DVD | "20" TAPE1 | "21" TAPE2 | "22" PHONO | "23" CD | "24" FM |
        "25" AM | "26" TUNER | "27" MUSIC SERVER | "28" INTERNET RADIO |
        "29" USB/USB(Front) | "2A" USB(Rear) | "30" MULTI CH | "40" Universal PORT
- id: zone2_tuner_set
  label: Set Zone2 Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz
- id: zone2_tuner_up
  label: Zone2 Tuning Up
  kind: action
  params: []
- id: zone2_tuner_down
  label: Zone2 Tuning Down
  kind: action
  params: []
- id: zone2_tuner_qstn
  label: Get Zone2 Tuning Frequency
  kind: action
  params: []

- id: zone3_power_on
  label: Zone3 Power On
  kind: action
  params: []
- id: zone3_power_off
  label: Zone3 Standby
  kind: action
  params: []
- id: zone3_power_qstn
  label: Get Zone3 Power Status
  kind: action
  params: []
- id: zone3_muting_on
  label: Zone3 Muting On
  kind: action
  params: []
- id: zone3_muting_off
  label: Zone3 Muting Off
  kind: action
  params: []
- id: zone3_muting_toggle
  label: Zone3 Muting Toggle
  kind: action
  params: []
- id: zone3_muting_qstn
  label: Get Zone3 Muting Status
  kind: action
  params: []
- id: zone3_volume_set
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
- id: zone3_volume_qstn
  label: Get Zone3 Volume Level
  kind: action
  params: []
- id: zone3_tone_set
  label: Set Zone3 Tone
  kind: action
  params:
    - name: bass
      type: string
    - name: treble
      type: string
- id: zone3_tone_bass_up
  label: Zone3 Bass Up
  kind: action
  params: []
- id: zone3_tone_bass_down
  label: Zone3 Bass Down
  kind: action
  params: []
- id: zone3_tone_treble_up
  label: Zone3 Treble Up
  kind: action
  params: []
- id: zone3_tone_treble_down
  label: Zone3 Treble Down
  kind: action
  params: []
- id: zone3_tone_qstn
  label: Get Zone3 Tone
  kind: action
  params: []
- id: zone3_balance_set
  label: Set Zone3 Balance
  kind: action
  params:
    - name: balance
      type: string
- id: zone3_balance_up
  label: Zone3 Balance Up
  kind: action
  params: []
- id: zone3_balance_down
  label: Zone3 Balance Down
  kind: action
  params: []
- id: zone3_balance_qstn
  label: Get Zone3 Balance
  kind: action
  params: []
- id: zone3_input_select
  label: Select Zone3 Input
  kind: action
  params:
    - name: input
      type: string
- id: zone3_tuner_set
  label: Set Zone3 Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
- id: zone3_tuner_up
  label: Zone3 Tuning Up
  kind: action
  params: []
- id: zone3_tuner_down
  label: Zone3 Tuning Down
  kind: action
  params: []
- id: zone3_tuner_qstn
  label: Get Zone3 Tuning Frequency
  kind: action
  params: []

- id: zone4_power_on
  label: Zone4 Power On
  kind: action
  params: []
- id: zone4_power_off
  label: Zone4 Standby
  kind: action
  params: []
- id: zone4_power_qstn
  label: Get Zone4 Power Status
  kind: action
  params: []
- id: zone4_muting_on
  label: Zone4 Muting On
  kind: action
  params: []
- id: zone4_muting_off
  label: Zone4 Muting Off
  kind: action
  params: []
- id: zone4_muting_toggle
  label: Zone4 Muting Toggle
  kind: action
  params: []
- id: zone4_muting_qstn
  label: Get Zone4 Muting Status
  kind: action
  params: []
- id: zone4_volume_set
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
- id: zone4_volume_qstn
  label: Get Zone4 Volume Level
  kind: action
  params: []
- id: zone4_input_select
  label: Select Zone4 Input
  kind: action
  params:
    - name: input
      type: string
- id: zone4_tuner_set
  label: Set Zone4 Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
- id: zone4_tuner_up
  label: Zone4 Tuning Up
  kind: action
  params: []
- id: zone4_tuner_down
  label: Zone4 Tuning Down
  kind: action
  params: []
- id: zone4_tuner_qstn
  label: Get Zone4 Tuning Frequency
  kind: action
  params: []

- id: dock_power_on
  label: Dock Power On
  kind: action
  params: []
- id: dock_power_off
  label: Dock Standby
  kind: action
  params: []
- id: dock_play_resume
  label: Dock Play/Resume
  kind: action
  params: []
- id: dock_stop
  label: Dock Stop
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
- id: dock_pause
  label: Dock Pause
  kind: action
  params: []
- id: dock_play_pause
  label: Dock Play/Pause
  kind: action
  params: []
- id: dock_ff
  label: Dock FF
  kind: action
  params: []
- id: dock_rew
  label: Dock REW
  kind: action
  params: []
- id: dock_album_up
  label: Dock Album Up
  kind: action
  params: []
- id: dock_album_down
  label: Dock Album Down
  kind: action
  params: []
- id: dock_playlist_up
  label: Dock Playlist Up
  kind: action
  params: []
- id: dock_playlist_down
  label: Dock Playlist Down
  kind: action
  params: []
- id: dock_chapter_up
  label: Dock Chapter Up
  kind: action
  params: []
- id: dock_chapter_down
  label: Dock Chapter Down
  kind: action
  params: []
- id: dock_shuffle
  label: Dock Shuffle
  kind: action
  params: []
- id: dock_repeat
  label: Dock Repeat
  kind: action
  params: []
- id: dock_mute
  label: Dock Mute
  kind: action
  params: []
- id: dock_backlight
  label: Dock Backlight
  kind: action
  params: []
- id: dock_menu
  label: Dock Menu
  kind: action
  params: []
- id: dock_enter
  label: Dock Enter/Select
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
```

## Feedbacks
```yaml
# UNRESOLVED: The protocol describes response message format but does not enumerate
# distinct feedback entries with value constraints. Feedbacks are embedded in command
# responses (e.g. "PWR01" for power on, "PW3QSTN" returns power state).
# A separate Feedbacks schema section cannot be fully enumerated from source alone.
```

## Variables
```yaml
# UNRESOLVED: The protocol does not enumerate discrete Variables distinct from Actions.
# Parameters such as volume level, input selection, tone settings, etc. are represented
# as command parameters within Actions, not as independent Variables.
```

## Events
```yaml
# The protocol describes unsolicited Status Messages sent by the Receiver when
# system status changes (Event Notice Communication). However, the specific event
# payload schema (e.g. which ISCP commands trigger unsolicited messages) is not
# enumerated in the source.
# UNRESOLVED: event payload definitions not stated in source
```

## Macros
```yaml
# No explicit Macros / multi-step sequences are described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No explicit safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source. Main unit must be ON for Zone 2 volume control to work
# (stated in-zone volume section as operational note, not a safety interlock).
```

## Notes

**Protocol timing:** Controller must allow ≥50ms between sending consecutive messages. Receiver responds within 50ms; absence of response indicates communication failure.

**RS-232C connector:** 9-pin female D-sub (pin 2 = TX, pin 3 = RX, pin 5 = GND). Use straight-through cable. End character: `[CR]` and/or `[LF]` or `[CR][LF]`.

**TCP (eISCP):** Default port 60128; configurable to 49152–65535. Requires power-cycle after changing port. Connection must be held open continuously to receive unsolicited status notifications. eISCP header is 16 bytes (big-endian size field = 0x00000010). Data section uses `[EOF]` as end character (alone or with `[CR][LF]`).

**Message format:** All ISCP messages follow `!1CCCPPPP` pattern — `!` start, `1` unit type (Receiver), `CCC` 3-char command, `PPPP` parameter(s). Variable-length parameters; queries use `QSTN` suffix.

**Multi-zone notes:** TUNER/XM/SIRIUS/HD Radio functions are shared between Main and Zone sides. Zone 2 tone/balance requires main unit to be ON. Zone 2 and Zone 3/4 selector lists differ slightly (Zone 3/4 include VIDEO6/VIDEO7 and XM/SIRIUS options).

**Network command timing:** FF/REW Net-tune commands must be sent continuously with no more than 100ms delay between codes.

**Protocol version:** ISCP version 0x01 stated. eISCP header version 0x01 stated.

<!-- UNRESOLVED: XM/SIRIUS/HD Radio feature availability is model-dependent; source covers the TUN 3.7 North America variant but does not specify which tuner options are included in this specific SKU -->

<!-- UNRESOLVED: Video Output Selector (VOS) is noted as "Japanese Model Only" -->

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

<!-- UNRESOLVED: fault behavior and error recovery sequences not stated in source -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:35.442Z
last_checked_at: 2026-05-14T18:17:17.070Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.070Z
matched_actions: 297
action_count: 297
confidence: high
summary: "All 479 spec actions map to documented ISCP commands; transport parameters verified against source; complete protocol coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
