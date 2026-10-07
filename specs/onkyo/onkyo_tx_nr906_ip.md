---
spec_id: admin/onkyo-tx-nr906
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-NR906 Control Spec"
manufacturer: Onkyo
model_family: TX-NR906
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-NR906
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:29:59.016Z
last_checked_at: 2026-10-07T22:08:06.215Z
generated_at: 2026-10-07T22:08:06.215Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Zone4 tone/balance not stated in source; Zone4 selector limited to USB/MUSIC SERVER only per support list"
  - "no discrete settable parameters beyond action commands"
  - "complete event taxonomy not explicitly enumerated in source"
  - "no explicit multi-step macro sequences documented in source"
  - "power-on sequencing, fault behavior, error recovery - not stated in source"
  - "complete unsolicited event list, Zone4 tone/balance support, firmware compatibility range"
verification:
  verdict: verified
  checked_at: 2026-10-07T22:08:06.215Z
  matched_actions: 497
  action_count: 497
  confidence: medium
  summary: "All 497 action units map to source ISCP/RI commands with agreeing shapes, transport matches, and no unrepresented source commands found; auth is left UNRESOLVED. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Onkyo TX-NR906 Control Spec

## Summary
AV receiver supporting ISCP (Integra Serial Control Protocol) over both RS-232 and Ethernet (eISCP). TCP destination port defaults to 60128 (configurable 49152–65535). Authentication is UNRESOLVED. Protocol supports main zone, 3 additional zones, tuner, network/USB, and RI-connected devices.

<!-- UNRESOLVED: Zone4 tone/balance not stated in source; Zone4 selector limited to USB/MUSIC SERVER only per support list -->

## Transport
```yaml
protocols:
  - tcp
  - serial  # RS-232 also supported per source
addressing:
  port: 60128  # default; configurable 49152-65535
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
- powerable       # PWR, PW3, ZPW, PW4 commands present
- routable        # SLI (input selector) and SLR (recout selector) commands present
- queryable       # QSTN suffix commands return status
- levelable       # MVL (master volume), ZVL, VL3, VL4, SWL, CTL commands present
```

## Actions
```yaml
# Main zone - power, audio
- id: power_standby
  label: System Standby
  kind: action
  params: []
- id: power_on
  label: System On
  kind: action
  params: []
- id: audio_muting_off
  label: Audio Muting Off
  kind: action
  params: []
- id: audio_muting_on
  label: Audio Muting On
  kind: action
  params: []
- id: audio_muting_toggle
  label: Audio Muting Toggle
  kind: action
  params: []
- id: speaker_a_off
  label: Speaker A Off
  kind: action
  params: []
- id: speaker_a_on
  label: Speaker A On
  kind: action
  params: []
- id: speaker_b_off
  label: Speaker B Off
  kind: action
  params: []
- id: speaker_b_on
  label: Speaker B On
  kind: action
  params: []
- id: speaker_ab_toggle
  label: Speaker A/B Wrap-Around
  kind: action
  params: []
- id: volume_set
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: string
      description: Hex value "00"-"64" (0-100), "00"-"50" (0-80)
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_up_1db
  label: Volume Up 1dB
  kind: action
  params: []
- id: volume_down_1db
  label: Volume Down 1dB
  kind: action
  params: []
- id: tone_front_bass_set
  label: Set Front Bass
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: tone_front_treble_set
  label: Set Front Treble
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: tone_front_bass_up
  label: Front Bass Up 2 Step
  kind: action
  params: []
- id: tone_front_bass_down
  label: Front Bass Down 2 Step
  kind: action
  params: []
- id: tone_front_treble_up
  label: Front Treble Up 2 Step
  kind: action
  params: []
- id: tone_front_treble_down
  label: Front Treble Down 2 Step
  kind: action
  params: []
- id: sleep_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "01"-"5A" (1-90 min in hex), "OFF"
- id: speaker_level_calibration_test
  label: Speaker Level Calibration Test
  kind: action
  params: []
- id: speaker_level_calibration_channel_select
  label: Speaker Level Calibration Channel Select
  kind: action
  params: []
- id: speaker_level_calibration_up
  label: Speaker Level Calibration +
  kind: action
  params: []
- id: speaker_level_calibration_down
  label: Speaker Level Calibration -
  kind: action
  params: []
- id: subwoofer_level_set
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: string
      description: "-F"-"00"-"+C" (-15dB-0dB-+12dB)
- id: center_level_set
  label: Set Center Level
  kind: action
  params:
    - name: level
      type: string
      description: "-C"-"00"-"+C" (-12dB-0dB-+12dB)
- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  params:
    - name: level
      type: string
      description: "00" Bright, "01" Dim, "02" Dark, "03" Shut-Off, "08" Bright LED OFF
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
- id: trigger_a_off
  label: 12V Trigger A Off
  kind: action
  params: []
- id: trigger_a_on
  label: 12V Trigger A On
  kind: action
  params: []
- id: trigger_b_off
  label: 12V Trigger B Off
  kind: action
  params: []
- id: trigger_b_on
  label: 12V Trigger B On
  kind: action
  params: []
- id: trigger_c_off
  label: 12V Trigger C Off
  kind: action
  params: []
- id: trigger_c_on
  label: 12V Trigger C On
  kind: action
  params: []
- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "00" STEREO, "01" DIRECT, "02" SURROUND, "03" FILM/Game-RPG, "04" THX, "05" ACTION/Game-Action, "06" MUSICAL/Game-Rock, "07" MONO MOVIE, "08" ORCHESTRA, "09" UNPLUGGED, "0A" STUDIO-MIX, "0B" TV LOGIC, "0C" ALL CH STEREO, "0D" THEATER-DIMENSIONAL, "0E" ENHANCED 7/ENHANCE/Game-Sports, "0F" MONO, "11" PURE AUDIO, "12" MULTIPLEX, "13" FULL MONO, "14" DOLBY VIRTUAL, "15" DTS Surround Sensation, "16" Audyssey DSX, plus many more encoding modes (40-9F range)
- id: listening_mode_up
  label: Listening Mode Wrap-Around Up
  kind: action
  params: []
- id: listening_mode_down
  label: Listening Mode Wrap-Around Down
  kind: action
  params: []
- id: late_night_set
  label: Set Late Night
  kind: action
  params:
    - name: level
      type: string
      description: "00" Off, "01" Low, "02" High, "03" Auto
- id: reeq_academy_filter_set
  label: Set Re-EQ/Academy Filter
  kind: action
  params:
    - name: mode
      type: string
      description: "00" Both Off, "01" Re-EQ On, "02" Academy On
- id: audyssey_2eq_set
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  params:
    - name: state
      type: string
      description: "00" Off, "01" On
- id: audyssey_dynamic_eq_set
  label: Set Audyssey Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "00" Off, "01" On
- id: audyssey_dynamic_volume_set
  label: Set Audyssey Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00" Off, "01" Light, "02" Medium, "03" Heavy
- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00" Off, "01" Low, "02" Mid, "03" High
- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  params:
    - name: state
      type: string
      description: "00" Off, "01" On
- id: tuner_set_frequency
  label: Set Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz
- id: tuner_frequency_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  params: []
- id: tuner_frequency_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  params: []
- id: preset_set
  label: Set Preset Number
  kind: action
  params:
    - name: number
      type: string
      description: "01"-"28" (1-40 in hex)
- id: preset_up
  label: Preset Wrap-Around Up
  kind: action
  params: []
- id: preset_down
  label: Preset Wrap-Around Down
  kind: action
  params: []
- id: input_selector
  label: Set Input Selector
  kind: action
  params:
    - name: source
      type: string
      description: "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4, "04" VIDEO5, "10" DVD, "20" TAPE(1), "21" TAPE2, "22" PHONO, "23" CD, "24" FM, "25" AM, "26" TUNER, "27" MUSIC SERVER, "28" INTERNET RADIO, "29" USB/USB(Front), "2A" USB(Rear), "30" MULTI CH, "31" XM, "32" SIRIUS, "40" Universal PORT
- id: input_selector_up
  label: Input Selector Wrap-Around Up
  kind: action
  params: []
- id: input_selector_down
  label: Input Selector Wrap-Around Down
  kind: action
  params: []

# Zone2
- id: zone2_power_standby
  label: Zone2 Standby
  kind: action
  params: []
- id: zone2_power_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_muting_off
  label: Zone2 Muting Off
  kind: action
  params: []
- id: zone2_muting_on
  label: Zone2 Muting On
  kind: action
  params: []
- id: zone2_muting_toggle
  label: Zone2 Muting Toggle
  kind: action
  params: []
- id: zone2_volume_set
  label: Set Zone2 Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00"-"64" (0-100 hex)
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []
- id: zone2_tone_bass_set
  label: Set Zone2 Bass
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: zone2_tone_treble_set
  label: Set Zone2 Treble
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: zone2_tone_up
  label: Zone2 Tone Up 2 Step
  kind: action
  params: []
- id: zone2_tone_down
  label: Zone2 Tone Down 2 Step
  kind: action
  params: []
- id: zone2_balance_set
  label: Set Zone2 Balance
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: zone2_balance_up
  label: Zone2 Balance Up (to R) 2 Step
  kind: action
  params: []
- id: zone2_balance_down
  label: Zone2 Balance Down (to L) 2 Step
  kind: action
  params: []
- id: zone2_selector
  label: Set Zone2 Input Selector
  kind: action
  params:
    - name: source
      type: string
      description: Same as input_selector values
- id: zone3_power_standby
  label: Zone3 Standby
  kind: action
  params: []
- id: zone3_power_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_muting_off
  label: Zone3 Muting Off
  kind: action
  params: []
- id: zone3_muting_on
  label: Zone3 Muting On
  kind: action
  params: []
- id: zone3_muting_toggle
  label: Zone3 Muting Toggle
  kind: action
  params: []
- id: zone3_volume_set
  label: Set Zone3 Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00"-"64" (0-100 hex)
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []
- id: zone3_tone_bass_set
  label: Set Zone3 Bass
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: zone3_tone_treble_set
  label: Set Zone3 Treble
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: zone3_tone_up
  label: Zone3 Tone Up 2 Step
  kind: action
  params: []
- id: zone3_tone_down
  label: Zone3 Tone Down 2 Step
  kind: action
  params: []
- id: zone3_balance_set
  label: Set Zone3 Balance
  kind: action
  params:
    - name: value
      type: string
      description: "-A"..."00"..."+A" (-10...0...+10, 2-step hex)
- id: zone3_balance_up
  label: Zone3 Balance Up (to R) 2 Step
  kind: action
  params: []
- id: zone3_balance_down
  label: Zone3 Balance Down (to L) 2 Step
  kind: action
  params: []
- id: zone3_selector
  label: Set Zone3 Input Selector
  kind: action
  params:
    - name: source
      type: string
      description: Same as input_selector values
- id: zone4_power_standby
  label: Zone4 Standby
  kind: action
  params: []
- id: zone4_power_on
  label: Zone4 On
  kind: action
  params: []
- id: zone4_muting_off
  label: Zone4 Muting Off
  kind: action
  params: []
- id: zone4_muting_on
  label: Zone4 Muting On
  kind: action
  params: []
- id: zone4_muting_toggle
  label: Zone4 Muting Toggle
  kind: action
  params: []
- id: zone4_volume_set
  label: Set Zone4 Volume
  kind: action
  params:
    - name: level
      type: string
      description: "00"-"64" (0-100 hex)
- id: zone4_volume_up
  label: Zone4 Volume Up
  kind: action
  params: []
- id: zone4_volume_down
  label: Zone4 Volume Down
  kind: action
  params: []
- id: zone4_selector
  label: Set Zone4 Input Selector
  kind: action
  params:
    - name: source
      type: string
      description: "\"00\"-\"06\" VIDEO1-VIDEO7, \"10\" DVD, \"20\" TAPE(1), \"21\" TAPE2, \"22\" PHONO, \"23\" CD, \"24\" FM, \"25\" AM, \"26\" TUNER, \"27\" MUSIC SERVER, \"28\" INTERNET RADIO, \"29\" USB/USB(Front), \"2A\" USB(Rear), \"40\" Universal PORT, \"30\" MULTI CH, \"31\" XM, \"32\" SIRIUS, \"80\" SOURCE"

# Network/USB
- id: network_play
  label: Network/USB Play
  kind: action
  params: []
- id: network_stop
  label: Network/USB Stop
  kind: action
  params: []
- id: network_pause
  label: Network/USB Pause
  kind: action
  params: []
- id: network_track_up
  label: Network/USB Track Up
  kind: action
  params: []
- id: network_track_down
  label: Network/USB Track Down
  kind: action
  params: []
- id: network_ff
  label: Network/USB Fast Forward (continuous)
  kind: action
  params: []
- id: network_rew
  label: Network/USB Rewind (continuous)
  kind: action
  params: []
- id: network_repeat
  label: Network/USB Repeat
  kind: action
  params: []
- id: network_random
  label: Network/USB Random
  kind: action
  params: []
- id: internet_radio_preset_set
  label: Set Internet Radio Preset
  kind: action
  params:
    - name: number
      type: string
      description: "01"-"28" (1-40 in hex)

# RI-connected devices
- id: cd_track_up
  label: CD Track Up
  kind: action
  params: []
- id: cd_play
  label: CD Play
  kind: action
  params: []
- id: cd_stop
  label: CD Stop
  kind: action
  params: []
- id: cd_pause
  label: CD Pause
  kind: action
  params: []
- id: cd_skip_forward
  label: CD Skip Forward
  kind: action
  params: []
- id: cd_skip_reverse
  label: CD Skip Reverse
  kind: action
  params: []
- id: cd_disc_fwd
  label: CD Disc Forward
  kind: action
  params: []
- id: cd_disc_rev
  label: CD Disc Reverse
  kind: action
  params: []
- id: cd_power_on
  label: CD Power On
  kind: action
  params: []
- id: cd_power_off
  label: CD Power Off
  kind: action
  params: []
- id: tape1_play_fwd
  label: TAPE1 Play Forward
  kind: action
  params: []
- id: tape1_play_rev
  label: TAPE1 Play Reverse
  kind: action
  params: []
- id: tape1_stop
  label: TAPE1 Stop
  kind: action
  params: []
- id: tape1_rec_pause
  label: TAPE1 Rec/Pause
  kind: action
  params: []
- id: tape1_ff
  label: TAPE1 Fast Forward
  kind: action
  params: []
- id: tape1_rew
  label: TAPE1 Rewind
  kind: action
  params: []
- id: tape2_play_fwd
  label: TAPE2 Play Forward
  kind: action
  params: []
- id: tape2_play_rev
  label: TAPE2 Play Reverse
  kind: action
  params: []
- id: tape2_stop
  label: TAPE2 Stop
  kind: action
  params: []
- id: tape2_rec_pause
  label: TAPE2 Rec/Pause
  kind: action
  params: []
- id: tape2_ff
  label: TAPE2 Fast Forward
  kind: action
  params: []
- id: tape2_rew
  label: TAPE2 Rewind
  kind: action
  params: []
- id: tape2_open_close
  label: TAPE2 Open/Close
  kind: action
  params: []
- id: tape2_skip_forward
  label: TAPE2 Skip Forward
  kind: action
  params: []
- id: tape2_skip_reverse
  label: TAPE2 Skip Reverse
  kind: action
  params: []
- id: tape2_rec
  label: TAPE2 Record
  kind: action
  params: []
- id: dvd_power_on
  label: DVD Power On
  kind: action
  params: []
- id: dvd_power_off
  label: DVD Power Off
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
- id: dock_play_resume
  label: Dock Play/Resume
  kind: action
  params: []
- id: dock_stop
  label: Dock Stop
  kind: action
  params: []
- id: dock_skip_fwd
  label: Dock Track Up
  kind: action
  params: []
- id: dock_skip_rev
  label: Dock Track Down
  kind: action
  params: []
- id: dock_pause
  label: Dock Pause
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
- id: dock_random
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
  label: Dock Enter
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

# Additional documented commands; literal mnemonics and fixed parameters appear in labels.
# Model-specific availability beyond the supplied support columns is UNRESOLVED.
- id: speaker_layout_set
  label: Set Speaker Layout (SPL)
  kind: action
  params:
    - name: layout
      type: string
      description: '"SB" sets SurrBack Speaker; "FH" sets Front High Speaker / SurrBack+Front High Speakers; "FW" sets Front Wide Speaker / SurrBack+Front Wide Speakers'
- id: speaker_layout_up
  label: Speaker Layout Wrap-Around Up (SPL UP)
  kind: action
  params: []
- id: tone_channel_bass_set
  label: Set Channel Bass (Bxx)
  kind: action
  params:
    - name: channel
      type: string
      description: '"TFW" Tone(Front Wide); "TFH" Tone(Front High); "TCT" Tone(Center); "TSR" Tone(Surround); "TSB" Tone(Surround Back)'
    - name: value
      type: string
      description: 'xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
- id: tone_channel_treble_set
  label: Set Channel Treble (Txx)
  kind: action
  params:
    - name: channel
      type: string
      description: '"TFW" Tone(Front Wide); "TFH" Tone(Front High); "TCT" Tone(Center); "TSR" Tone(Surround); "TSB" Tone(Surround Back)'
    - name: value
      type: string
      description: 'xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
- id: tone_channel_bass_up
  label: Channel Bass Up 2 Step (BUP)
  kind: action
  params:
    - name: channel
      type: string
      description: '"TFW" Tone(Front Wide); "TFH" Tone(Front High); "TCT" Tone(Center); "TSR" Tone(Surround); "TSB" Tone(Surround Back)'
- id: tone_channel_bass_down
  label: Channel Bass Down 2 Step (BDOWN)
  kind: action
  params:
    - name: channel
      type: string
      description: '"TFW" Tone(Front Wide); "TFH" Tone(Front High); "TCT" Tone(Center); "TSR" Tone(Surround); "TSB" Tone(Surround Back)'
- id: tone_channel_treble_up
  label: Channel Treble Up 2 Step (TUP)
  kind: action
  params:
    - name: channel
      type: string
      description: '"TFW" Tone(Front Wide); "TFH" Tone(Front High); "TCT" Tone(Center); "TSR" Tone(Surround); "TSB" Tone(Surround Back)'
- id: tone_channel_treble_down
  label: Channel Treble Down 2 Step (TDOWN)
  kind: action
  params:
    - name: channel
      type: string
      description: '"TFW" Tone(Front Wide); "TFH" Tone(Front High); "TCT" Tone(Center); "TSR" Tone(Surround); "TSB" Tone(Surround Back)'
- id: tone_subwoofer_bass_set
  label: Set Subwoofer Bass (TSW Bxx)
  kind: action
  params:
    - name: value
      type: string
      description: 'xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
- id: tone_subwoofer_bass_up
  label: Subwoofer Bass Up 2 Step (TSW BUP)
  kind: action
  params: []
- id: tone_subwoofer_bass_down
  label: Subwoofer Bass Down 2 Step (TSW BDOWN)
  kind: action
  params: []
- id: sleep_up
  label: Sleep Timer Wrap-Around Up (SLP UP)
  kind: action
  params: []
- id: subwoofer_level_up
  label: Subwoofer Level Up (SWL UP)
  kind: action
  params: []
- id: subwoofer_level_down
  label: Subwoofer Level Down (SWL DOWN)
  kind: action
  params: []
- id: center_level_up
  label: Center Level Up (CTL UP)
  kind: action
  params: []
- id: center_level_down
  label: Center Level Down (CTL DOWN)
  kind: action
  params: []
- id: display_set
  label: Set Display Mode Or Information (DIF)
  kind: action
  params:
    - name: mode
      type: string
      description: 'Display Mode: "00" sets Selector + Volume Display Mode; "01" sets Selector + Listening Mode Display Mode; "02" Display Digital Format(temporary display); "03" Display Video Format(temporary display). Display Information: "00" Display Program Format; "01" Display Digital Input Position; "02" Display Digital Format Position; "03" Display Bass Level; "04" Display Treble Level. Applicable interpretation is model-dependent; UNRESOLVED for TX-NR906.'
- id: display_toggle
  label: Display Mode Wrap-Around Up (DIF TG)
  kind: action
  params: []
- id: dimmer_up
  label: Dimmer Wrap-Around Up (DIM DIM)
  kind: action
  params: []
- id: osd_audio
  label: OSD Audio Adjust Key (OSD AUDIO)
  kind: action
  params: []
- id: osd_video
  label: OSD Video Adjust Key (OSD VIDEO)
  kind: action
  params: []
- id: recout_selector
  label: Set RECOUT Selector (SLR)
  kind: action
  params:
    - name: source
      type: string
      description: '"00" VIDEO1; "01" VIDEO2; "02" VIDEO3; "03" VIDEO4; "04" VIDEO5; "05" VIDEO6; "06" VIDEO7; "10" DVD; "20" TAPE(1); "21" TAPE2; "22" PHONO; "23" CD; "24" FM; "25" AM; "26" TUNER; "27" MUSIC SERVER; "28" INTERNET RADIO; "30" MULTI CH; "31" XM; "7F" OFF; "80" SOURCE'
- id: audio_selector
  label: Set Audio Selector (SLA)
  kind: action
  params:
    - name: source
      type: string
      description: '"00" AUTO; "01" MULTI-CHANNEL; "02" ANALOG; "03" iLINK; "04" HDMI; "05" COAX/OPT; "06" BALANCE'
- id: audio_selector_up
  label: Audio Selector Wrap-Around Up (SLA UP)
  kind: action
  params: []
- id: video_output_selector
  label: Set Video Output Selector (VOS)
  kind: action
  params:
    - name: output
      type: string
      description: 'Japanese Model Only; "00" D4; "01" Component'
- id: hdmi_output_selector
  label: Set HDMI Output Selector (HDO)
  kind: action
  params:
    - name: output
      type: string
      description: '"00" No / Analog; "01" Yes/Out Main / HDMI Main; "02" Out Sub / HDMI Sub; "03" Both; "04" Both(Main); "05" Both(Sub)'
- id: hdmi_output_selector_up
  label: HDMI Output Selector Wrap-Around Up (HDO UP)
  kind: action
  params: []
- id: monitor_resolution_set
  label: Set Monitor Out Resolution (RES)
  kind: action
  params:
    - name: resolution
      type: string
      description: '"00" Through; "01" Auto(HDMI Output Only); "02" 480p; "03" 720p; "04" 1080i; "05" 1080p(HDMI Output Only); "07" 1080p/24fs(HDMI Output Only); "06" Source'
- id: monitor_resolution_up
  label: Monitor Out Resolution Wrap-Around Up (RES UP)
  kind: action
  params: []
- id: isf_mode_set
  label: Set ISF Mode (ISF)
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" Custom; "01" Day; "02" Night'
- id: isf_mode_up
  label: ISF Mode Wrap-Around Up (ISF UP)
  kind: action
  params: []
- id: listening_mode_movie
  label: Listening Mode Movie Wrap-Around Up (LMD MOVIE)
  kind: action
  params: []
- id: listening_mode_music
  label: Listening Mode Music Wrap-Around Up (LMD MUSIC)
  kind: action
  params: []
- id: listening_mode_game
  label: Listening Mode Game Wrap-Around Up (LMD GAME)
  kind: action
  params: []
- id: late_night_up
  label: Late Night Wrap-Around Up (LTN UP)
  kind: action
  params: []
- id: reeq_academy_filter_up
  label: Re-EQ/Academy Filter Wrap-Around Up (RAS UP)
  kind: action
  params: []
- id: audyssey_2eq_up
  label: Audyssey 2EQ/MultEQ/MultEQ XT Wrap-Around Up (ADY UP)
  kind: action
  params: []
- id: audyssey_dynamic_eq_up
  label: Audyssey Dynamic EQ Wrap-Around Up (ADQ UP)
  kind: action
  params: []
- id: audyssey_dynamic_volume_up
  label: Audyssey Dynamic Volume Wrap-Around Up (ADV UP)
  kind: action
  params: []
- id: dolby_volume_up
  label: Dolby Volume Wrap-Around Up (DVL UP)
  kind: action
  params: []
- id: music_optimizer_up
  label: Music Optimizer Wrap-Around Up (MOT UP)
  kind: action
  params: []
- id: preset_memory_set
  label: Set Preset Memory (PRM)
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" sets Preset No. 1-40 ( In hexadecimal representation); "01"-"1E" sets Preset No. 1-30 ( In hexadecimal representation); applicable model range UNRESOLVED'
- id: rds_information_set
  label: Display RDS Information (RDS)
  kind: action
  params:
    - name: information
      type: string
      description: 'RDS Model Only; "00" Display RT Information; "01" Display PTY Information; "02" Display TP Information. In RBDS Model, only Display RT information is available.'
- id: rds_information_up
  label: RDS Information Wrap-Around Change (RDS UP)
  kind: action
  params: []
- id: pty_scan_set
  label: Set PTY Scan (PTS)
  kind: action
  params:
    - name: number
      type: string
      description: 'RDS Model Only; "00"-"1E" sets PTY No"0-30"( In hexadecimal representation)'
- id: pty_scan_finish
  label: Finish PTY Scan (PTS ENTER)
  kind: action
  params: []
- id: tp_scan_start
  label: Start TP Scan (TPS)
  kind: action
  params: []
- id: tp_scan_finish
  label: Finish TP Scan (TPS ENTER)
  kind: action
  params: []
- id: xm_channel_set
  label: Set XM Channel Number (XCH)
  kind: action
  params:
    - name: number
      type: string
      description: 'XM Model Only; "000"-"255" XM Channel Number"000-255"'
- id: xm_channel_up
  label: XM Channel Wrap-Around Up (XCH UP)
  kind: action
  params: []
- id: xm_channel_down
  label: XM Channel Wrap-Around Down (XCH DOWN)
  kind: action
  params: []
- id: xm_category_up
  label: XM Category Wrap-Around Up (XCT UP)
  kind: action
  params: []
- id: xm_category_down
  label: XM Category Wrap-Around Down (XCT DOWN)
  kind: action
  params: []
- id: sirius_channel_set
  label: Set SIRIUS Channel Number (SCH)
  kind: action
  params:
    - name: number
      type: string
      description: 'SIRIUS Model Only; "000"-"255" SIRIUS Channel Number"000-255"'
- id: sirius_channel_up
  label: SIRIUS Channel Wrap-Around Up (SCH UP)
  kind: action
  params: []
- id: sirius_channel_down
  label: SIRIUS Channel Wrap-Around Down (SCH DOWN)
  kind: action
  params: []
- id: sirius_category_up
  label: SIRIUS Category Wrap-Around Up (SCT UP)
  kind: action
  params: []
- id: sirius_category_down
  label: SIRIUS Category Wrap-Around Down (SCT DOWN)
  kind: action
  params: []
- id: sirius_lock_password
  label: Enter SIRIUS Lock Password (SLK nnnn)
  kind: action
  params:
    - name: password
      type: string
      description: 'SIRIUS Model Only; Lock Password (4Digits)'
- id: hd_radio_program_set
  label: Set HD Radio Channel Program (HPR)
  kind: action
  params:
    - name: program
      type: string
      description: 'HD Radio Model Only; "01"-"08"'
- id: hd_radio_blend_set
  label: Set HD Radio Blend Mode (HBL)
  kind: action
  params:
    - name: mode
      type: string
      description: 'HD Radio Model Only; "00" Auto; "01" Analog'
- id: network_display
  label: Network/USB Display (NTC DISPLAY)
  kind: action
  params: []
- id: network_album
  label: Network/USB Album Key (NTC ALBUM)
  kind: action
  params: []
- id: network_artist
  label: Network/USB Artist Key (NTC ARTIST)
  kind: action
  params: []
- id: network_genre
  label: Network/USB Genre Key (NTC GENRE)
  kind: action
  params: []
- id: network_playlist
  label: Network/USB Playlist Key (NTC PLAYLIST)
  kind: action
  params: []
- id: network_right
  label: Network/USB Right Key (NTC RIGHT)
  kind: action
  params: []
- id: network_left
  label: Network/USB Left Key (NTC LEFT)
  kind: action
  params: []
- id: network_up
  label: Network/USB Up Key (NTC UP)
  kind: action
  params: []
- id: network_down
  label: Network/USB Down Key (NTC DOWN)
  kind: action
  params: []
- id: network_select
  label: Network/USB Select Key (NTC SELECT)
  kind: action
  params: []
- id: network_number_key
  label: Network/USB Number Key (NTC)
  kind: action
  params:
    - name: key
      type: string
      description: '"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"'
- id: network_delete
  label: Network/USB Delete Key (NTC DELETE)
  kind: action
  params: []
- id: network_caps
  label: Network/USB Caps Key (NTC CAPS)
  kind: action
  params: []
- id: network_location
  label: Network/USB Location Key (NTC LOCATION)
  kind: action
  params: []
- id: network_language
  label: Network/USB Language Key (NTC LANGUAGE)
  kind: action
  params: []
- id: network_setup
  label: Network/USB Setup Key (NTC SETUP)
  kind: action
  params: []
- id: network_return
  label: Network/USB Return Key (NTC RETURN)
  kind: action
  params: []
- id: network_channel_up
  label: Internet Radio Channel Up (NTC CHUP)
  kind: action
  params: []
- id: network_channel_down
  label: Internet Radio Channel Down (NTC CHDN)
  kind: action
  params: []
- id: zone2_tone_treble_up
  label: Zone2 Treble Up 2 Step (ZTN TUP)
  kind: action
  params: []
- id: zone2_tone_treble_down
  label: Zone2 Treble Down 2 Step (ZTN TDOWN)
  kind: action
  params: []
- id: zone3_tone_treble_up
  label: Zone3 Treble Up 2 Step (TN3 TUP)
  kind: action
  params: []
- id: zone3_tone_treble_down
  label: Zone3 Treble Down 2 Step (TN3 TDOWN)
  kind: action
  params: []
- id: zone2_tuner_set_frequency
  label: Set Zone2 Tuning Frequency (TUZ nnnnn)
  kind: action
  params:
    - name: frequency
      type: string
      description: 'FM nnn.nn MHz / AM nnnnn kHz'
- id: zone2_tuner_frequency_up
  label: Zone2 Tuning Frequency Wrap-Around Up (TUZ UP)
  kind: action
  params: []
- id: zone2_tuner_frequency_down
  label: Zone2 Tuning Frequency Wrap-Around Down (TUZ DOWN)
  kind: action
  params: []
- id: zone2_preset_set
  label: Set Zone2 Preset Number (PRZ)
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" sets Preset No. 1 - 40 (In hexadecimal representation); "01"-"1E" sets Preset No. 1 - 30 (In hexadecimal representation); applicable model range UNRESOLVED'
- id: zone2_preset_up
  label: Zone2 Preset Wrap-Around Up (PRZ UP)
  kind: action
  params: []
- id: zone2_preset_down
  label: Zone2 Preset Wrap-Around Down (PRZ DOWN)
  kind: action
  params: []
- id: zone2_network_play
  label: Zone2 Network Play (NTZ PLAY)
  kind: action
  params: []
- id: zone2_network_stop
  label: Zone2 Network Stop (NTZ STOP)
  kind: action
  params: []
- id: zone2_network_pause
  label: Zone2 Network Pause (NTZ PAUSE)
  kind: action
  params: []
- id: zone2_network_track_up
  label: Zone2 Network Track Up (NTZ TRUP)
  kind: action
  params: []
- id: zone2_network_track_down
  label: Zone2 Network Track Down (NTZ TRDN)
  kind: action
  params: []
- id: zone2_network_channel_up
  label: Zone2 Internet Radio Channel Up (NTZ CHUP)
  kind: action
  params: []
- id: zone2_network_channel_down
  label: Zone2 Internet Radio Channel Down (NTZ CHDN)
  kind: action
  params: []
- id: zone2_internet_radio_preset_set
  label: Set Zone2 Internet Radio Preset (NPZ)
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" sets Preset No. 1 - 40 (In hexadecimal representation)'
- id: zone2_listening_mode_set
  label: Set Zone2 Listening Mode (LMZ)
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" STEREO; "01" DIRECT; "0F" MONO; "12" MULTIPLEX; "87" DVS (PL2); "88" DVS (NEO6)'
- id: zone2_late_night_set
  label: Set Zone2 Late Night (LTZ)
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Off; "01" Low; "02" High'
- id: zone2_late_night_up
  label: Zone2 Late Night Wrap-Around Up (LTZ UP)
  kind: action
  params: []
- id: zone2_reeq_academy_filter_set
  label: Set Zone2 Re-EQ/Academy Filter (RAZ)
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" Both Off; "01" Re-EQ On; "02" Academy On'
- id: zone2_reeq_academy_filter_up
  label: Zone2 Re-EQ/Academy Filter Wrap-Around Up (RAZ UP)
  kind: action
  params: []
- id: zone3_tuner_set_frequency
  label: Set Zone3 Tuning Frequency (TU3 nnnnn)
  kind: action
  params:
    - name: frequency
      type: string
      description: 'FM nnn.nn MHz / AM nnnnn kHz'
- id: zone3_tuner_frequency_up
  label: Zone3 Tuning Frequency Wrap-Around Up (TU3 UP)
  kind: action
  params: []
- id: zone3_tuner_frequency_down
  label: Zone3 Tuning Frequency Wrap-Around Down (TU3 DOWN)
  kind: action
  params: []
- id: zone3_preset_set
  label: Set Zone3 Preset Number (PR3)
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E" sets Preset No. 1-30 (In hexadecimal representation); applicable model range UNRESOLVED'
- id: zone3_preset_up
  label: Zone3 Preset Wrap-Around Up (PR3 UP)
  kind: action
  params: []
- id: zone3_preset_down
  label: Zone3 Preset Wrap-Around Down (PR3 DOWN)
  kind: action
  params: []
- id: zone3_network_play
  label: Zone3 Network Play (NT3 PLAY)
  kind: action
  params: []
- id: zone3_network_stop
  label: Zone3 Network Stop (NT3 STOP)
  kind: action
  params: []
- id: zone3_network_pause
  label: Zone3 Network Pause (NT3 PAUSE)
  kind: action
  params: []
- id: zone3_network_track_up
  label: Zone3 Network Track Up (NT3 TRUP)
  kind: action
  params: []
- id: zone3_network_track_down
  label: Zone3 Network Track Down (NT3 TRDN)
  kind: action
  params: []
- id: zone3_network_channel_up
  label: Zone3 Internet Radio Channel Up (NT3 CHUP)
  kind: action
  params: []
- id: zone3_network_channel_down
  label: Zone3 Internet Radio Channel Down (NT3 CHDN)
  kind: action
  params: []
- id: zone3_internet_radio_preset_set
  label: Set Zone3 Internet Radio Preset (NP3)
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation)'
- id: zone4_tuner_set_frequency
  label: Set Zone4 Tuning Frequency (TU4 nnnnn)
  kind: action
  params:
    - name: frequency
      type: string
      description: 'FM nnn.nn MHz / AM nnnnn kHz'
- id: zone4_tuner_frequency_up
  label: Zone4 Tuning Frequency Wrap-Around Up (TU4 UP)
  kind: action
  params: []
- id: zone4_tuner_frequency_down
  label: Zone4 Tuning Frequency Wrap-Around Down (TU4 DOWN)
  kind: action
  params: []
- id: zone4_preset_set
  label: Set Zone4 Preset Number (PR4)
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E" sets Preset No. 1-30 (In hexadecimal representation); applicable model range UNRESOLVED'
- id: zone4_preset_up
  label: Zone4 Preset Wrap-Around Up (PR4 UP)
  kind: action
  params: []
- id: zone4_preset_down
  label: Zone4 Preset Wrap-Around Down (PR4 DOWN)
  kind: action
  params: []
- id: zone4_network_play
  label: Zone4 Network Play (NT4 PLAY)
  kind: action
  params: []
- id: zone4_network_stop
  label: Zone4 Network Stop (NT4 STOP)
  kind: action
  params: []
- id: zone4_network_pause
  label: Zone4 Network Pause (NT4 PAUSE)
  kind: action
  params: []
- id: zone4_network_track_up
  label: Zone4 Network Track Up (NT4 TRUP)
  kind: action
  params: []
- id: zone4_network_track_down
  label: Zone4 Network Track Down (NT4 TRDN)
  kind: action
  params: []
- id: zone4_internet_radio_preset_set
  label: Set Zone4 Internet Radio Preset (NP4)
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" sets Preset No. 1-40 (In hexadecimal representation)'
- id: cd_memory
  label: CD Memory (CCD MEMORY)
  kind: action
  params: []
- id: cd_clear
  label: CD Clear (CCD CLEAR)
  kind: action
  params: []
- id: cd_repeat
  label: CD Repeat (CCD REPEAT)
  kind: action
  params: []
- id: cd_random
  label: CD Random (CCD RANDOM)
  kind: action
  params: []
- id: cd_display
  label: CD Display (CCD DISP)
  kind: action
  params: []
- id: cd_display_mode
  label: CD Display Mode (CCD D.MODE)
  kind: action
  params: []
- id: cd_ff
  label: CD Fast Forward (CCD FF)
  kind: action
  params: []
- id: cd_rew
  label: CD Rewind (CCD REW)
  kind: action
  params: []
- id: cd_open_close
  label: CD Open/Close (CCD OP/CL)
  kind: action
  params: []
- id: cd_number_key
  label: CD Number Key (CCD)
  kind: action
  params:
    - name: key
      type: string
      description: '"1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "10", "+10"'
- id: cd_disc_skip
  label: CD Disc Skip (CCD D.SKIP)
  kind: action
  params: []
- id: cd_disc_select
  label: CD Disc Select (CCD)
  kind: action
  params:
    - name: disc
      type: string
      description: '"DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6"'
- id: graphics_equalizer_preset
  label: Graphics Equalizer Preset (CEQ PRESET)
  kind: action
  params: []
- id: dat_play
  label: DAT Play (CDT PLAY)
  kind: action
  params: []
- id: dat_rec_pause
  label: DAT Rec/Pause (CDT RC/PAU)
  kind: action
  params: []
- id: dat_stop
  label: DAT Stop (CDT STOP)
  kind: action
  params: []
- id: dat_skip_forward
  label: DAT Skip Forward (CDT SKIP.F)
  kind: action
  params: []
- id: dat_skip_reverse
  label: DAT Skip Reverse (CDT SKIP.R)
  kind: action
  params: []
- id: dat_ff
  label: DAT Fast Forward (CDT FF)
  kind: action
  params: []
- id: dat_rew
  label: DAT Rewind (CDT REW)
  kind: action
  params: []
- id: dvd_play
  label: DVD Play (CDV PLAY)
  kind: action
  params: []
- id: dvd_stop
  label: DVD Stop (CDV STOP)
  kind: action
  params: []
- id: dvd_skip_forward
  label: DVD Skip Forward (CDV SKIP.F)
  kind: action
  params: []
- id: dvd_skip_reverse
  label: DVD Skip Reverse (CDV SKIP.R)
  kind: action
  params: []
- id: dvd_ff
  label: DVD Fast Forward (CDV FF)
  kind: action
  params: []
- id: dvd_rew
  label: DVD Rewind (CDV REW)
  kind: action
  params: []
- id: dvd_pause
  label: DVD Pause (CDV PAUSE)
  kind: action
  params: []
- id: dvd_last_play
  label: DVD Last Play (CDV LASTPLAY)
  kind: action
  params: []
- id: dvd_subtitle_toggle
  label: DVD Subtitle On/Off (CDV SUBTON/OFF)
  kind: action
  params: []
- id: dvd_subtitle
  label: DVD Subtitle (CDV SUBTITLE)
  kind: action
  params: []
- id: dvd_setup
  label: DVD Setup (CDV SETUP)
  kind: action
  params: []
- id: dvd_top_menu
  label: DVD Top Menu (CDV TOPMENU)
  kind: action
  params: []
- id: dvd_menu
  label: DVD Menu (CDV MENU)
  kind: action
  params: []
- id: dvd_up
  label: DVD Up (CDV UP)
  kind: action
  params: []
- id: dvd_down
  label: DVD Down (CDV DOWN)
  kind: action
  params: []
- id: dvd_left
  label: DVD Left (CDV LEFT)
  kind: action
  params: []
- id: dvd_right
  label: DVD Right (CDV RIGHT)
  kind: action
  params: []
- id: dvd_enter
  label: DVD Enter (CDV ENTER)
  kind: action
  params: []
- id: dvd_return
  label: DVD Return (CDV RETURN)
  kind: action
  params: []
- id: dvd_disc_forward
  label: DVD Disc Forward (CDV DISC.F)
  kind: action
  params: []
- id: dvd_disc_reverse
  label: DVD Disc Reverse (CDV DISC.R)
  kind: action
  params: []
- id: dvd_audio
  label: DVD Audio (CDV AUDIO)
  kind: action
  params: []
- id: dvd_random
  label: DVD Random (CDV RANDOM)
  kind: action
  params: []
- id: dvd_open_close
  label: DVD Open/Close (CDV OP/CL)
  kind: action
  params: []
- id: dvd_angle
  label: DVD Angle (CDV ANGLE)
  kind: action
  params: []
- id: dvd_number_key
  label: DVD Number Key (CDV)
  kind: action
  params:
    - name: key
      type: string
      description: '"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0"'
- id: dvd_search
  label: DVD Search (CDV SEARCH)
  kind: action
  params: []
- id: dvd_display
  label: DVD Display (CDV DISP)
  kind: action
  params: []
- id: dvd_repeat
  label: DVD Repeat (CDV REPEAT)
  kind: action
  params: []
- id: dvd_memory
  label: DVD Memory (CDV MEMORY)
  kind: action
  params: []
- id: dvd_clear
  label: DVD Clear (CDV CLEAR)
  kind: action
  params: []
- id: dvd_ab_repeat
  label: DVD A-B Repeat (CDV ABR)
  kind: action
  params: []
- id: dvd_step_forward
  label: DVD Step Forward (CDV STEP.F)
  kind: action
  params: []
- id: dvd_step_reverse
  label: DVD Step Back (CDV STEP.R)
  kind: action
  params: []
- id: dvd_slow_forward
  label: DVD Slow Forward (CDV SLOW.F)
  kind: action
  params: []
- id: dvd_slow_reverse
  label: DVD Slow Back (CDV SLOW.R)
  kind: action
  params: []
- id: dvd_zoom_toggle
  label: DVD Zoom (CDV ZOOMTG)
  kind: action
  params: []
- id: dvd_zoom_up
  label: DVD Zoom Up (CDV ZOOMUP)
  kind: action
  params: []
- id: dvd_zoom_down
  label: DVD Zoom Down (CDV ZOOMDN)
  kind: action
  params: []
- id: dvd_progressive
  label: DVD Progressive (CDV PROGRE)
  kind: action
  params: []
- id: dvd_video_toggle
  label: DVD Video On/Off (CDV VDOFF)
  kind: action
  params: []
- id: dvd_condition_memory
  label: DVD Condition Memory (CDV CONMEM)
  kind: action
  params: []
- id: dvd_function_memory
  label: DVD Function Memory (CDV FUNMEM)
  kind: action
  params: []
- id: dvd_disc_select
  label: DVD Disc Select (CDV)
  kind: action
  params:
    - name: disc
      type: string
      description: '"DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6"'
- id: dvd_folder_up
  label: DVD Folder Up (CDV FOLDUP)
  kind: action
  params: []
- id: dvd_folder_down
  label: DVD Folder Down (CDV FOLDDN)
  kind: action
  params: []
- id: dvd_play_mode
  label: DVD Play Mode (CDV P.MODE)
  kind: action
  params: []
- id: dvd_aspect_toggle
  label: DVD Aspect Toggle (CDV ASCTG)
  kind: action
  params: []
- id: dvd_cd_chain_repeat
  label: DVD CD Chain Repeat (CDV CDPCD)
  kind: action
  params: []
- id: dvd_multi_speed_up
  label: DVD Multi Speed Up (CDV MSPUP)
  kind: action
  params: []
- id: dvd_multi_speed_down
  label: DVD Multi Speed Down (CDV MSPDN)
  kind: action
  params: []
- id: dvd_picture_control
  label: DVD Picture Control (CDV PCT)
  kind: action
  params: []
- id: dvd_resolution_toggle
  label: DVD Resolution Toggle (CDV RSCTG)
  kind: action
  params: []
- id: dvd_factory_reset
  label: DVD Return To Factory Settings (CDV INIT)
  kind: action
  params: []
- id: md_play
  label: MD Play (CMD PLAY)
  kind: action
  params: []
- id: md_stop
  label: MD Stop (CMD STOP)
  kind: action
  params: []
- id: md_ff
  label: MD Fast Forward (CMD FF)
  kind: action
  params: []
- id: md_rew
  label: MD Rewind (CMD REW)
  kind: action
  params: []
- id: md_play_mode
  label: MD Play Mode (CMD P.MODE)
  kind: action
  params: []
- id: md_skip_forward
  label: MD Skip Forward (CMD SKIP.F)
  kind: action
  params: []
- id: md_skip_reverse
  label: MD Skip Reverse (CMD SKIP.R)
  kind: action
  params: []
- id: md_pause
  label: MD Pause (CMD PAUSE)
  kind: action
  params: []
- id: md_record
  label: MD Record (CMD REC)
  kind: action
  params: []
- id: md_memory
  label: MD Memory (CMD MEMORY)
  kind: action
  params: []
- id: md_display
  label: MD Display (CMD DISP)
  kind: action
  params: []
- id: md_scroll
  label: MD Scroll (CMD SCROLL)
  kind: action
  params: []
- id: md_music_scan
  label: MD Music Scan (CMD M.SCAN)
  kind: action
  params: []
- id: md_clear
  label: MD Clear (CMD CLEAR)
  kind: action
  params: []
- id: md_random
  label: MD Random (CMD RANDOM)
  kind: action
  params: []
- id: md_repeat
  label: MD Repeat (CMD REPEAT)
  kind: action
  params: []
- id: md_enter
  label: MD Enter (CMD ENTER)
  kind: action
  params: []
- id: md_eject
  label: MD Eject (CMD EJECT)
  kind: action
  params: []
- id: md_number_key
  label: MD Number Key (CMD)
  kind: action
  params:
    - name: key
      type: string
      description: '"1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0"'
- id: md_digit_mode
  label: MD Digit Mode (CMD nn/nnn)
  kind: action
  params: []
- id: md_name
  label: MD Name (CMD NAME)
  kind: action
  params: []
- id: md_group
  label: MD Group (CMD GROUP)
  kind: action
  params: []
- id: md_standby
  label: MD Standby (CMD STBY)
  kind: action
  params: []
- id: cdr_play_mode
  label: CD-R Play Mode (CCR P.MODE)
  kind: action
  params: []
- id: cdr_play
  label: CD-R Play (CCR PLAY)
  kind: action
  params: []
- id: cdr_stop
  label: CD-R Stop (CCR STOP)
  kind: action
  params: []
- id: cdr_skip_forward
  label: CD-R Skip Forward (CCR SKIP.F)
  kind: action
  params: []
- id: cdr_skip_reverse
  label: CD-R Skip Reverse (CCR SKIP.R)
  kind: action
  params: []
- id: cdr_pause
  label: CD-R Pause (CCR PAUSE)
  kind: action
  params: []
- id: cdr_record
  label: CD-R Record (CCR REC)
  kind: action
  params: []
- id: cdr_clear
  label: CD-R Clear (CCR CLEAR)
  kind: action
  params: []
- id: cdr_repeat
  label: CD-R Repeat (CCR REPEAT)
  kind: action
  params: []
- id: cdr_number_key
  label: CD-R Number Key (CCR)
  kind: action
  params:
    - name: key
      type: string
      description: '"1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0"'
- id: cdr_digit_mode
  label: CD-R Digit Mode (CCR nn/nnn)
  kind: action
  params: []
- id: cdr_scroll
  label: CD-R Scroll (CCR SCROLL)
  kind: action
  params: []
- id: cdr_open_close
  label: CD-R Open/Close (CCR OP/CL)
  kind: action
  params: []
- id: cdr_display
  label: CD-R Display (CCR DISP)
  kind: action
  params: []
- id: cdr_random
  label: CD-R Random (CCR RANDOM)
  kind: action
  params: []
- id: cdr_memory
  label: CD-R Memory (CCR MEMORY)
  kind: action
  params: []
- id: cdr_ff
  label: CD-R Fast Forward (CCR FF)
  kind: action
  params: []
- id: cdr_rew
  label: CD-R Rewind (CCR REW)
  kind: action
  params: []
- id: cdr_standby
  label: CD-R Standby (CCR STBY)
  kind: action
  params: []
- id: dock_play_pause
  label: Dock Play/Pause (CDS PLY/PAU)
  kind: action
  params: []
- id: dock_ff
  label: Dock Fast Forward (CDS FF)
  kind: action
  params: []
- id: dock_rew
  label: Dock Rewind (CDS REW)
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, on]
  query_command: PWRQSTN
- id: audio_muting_status
  type: enum
  values: [off, on]
  query_command: AMTQSTN
- id: speaker_a_status
  type: enum
  values: [off, on]
  query_command: SPAQSTN
- id: speaker_b_status
  type: enum
  values: [off, on]
  query_command: SPBQSTN
- id: volume_level
  type: string
  description: Hex "00"-"64" (0-100)
  query_command: MVLQSTN
- id: sleep_time
  type: string
  description: Hex "01"-"5A" (1-90 min) or "OFF"
  query_command: SLPQSTN
- id: subwoofer_level
  type: string
  description: "-F"-"00"-"+C" (-15dB-0dB-+12dB)
  query_command: SWLQSTN
- id: center_level
  type: string
  description: "-C"-"00"-"+C" (-12dB-0dB-+12dB)
  query_command: CTLQSTN
- id: dimmer_level
  type: enum
  values: ["00", "01", "02", "03", "08"]
  query_command: DIMQSTN
- id: input_selector_status
  type: string
  description: Input selector code (e.g. "23" for CD)
  query_command: SLIQSTN
- id: listening_mode_status
  type: string
  description: Listening mode code
  query_command: LMDQSTN
- id: late_night_level
  type: enum
  values: ["00", "01", "02", "03"]
  query_command: LTNQSTN
- id: audyssey_state
  type: enum
  values: [off, on]
  query_command: ADYQSTN
- id: audyssey_dynamic_eq_state
  type: enum
  values: [off, on]
  query_command: ADQQSTN
- id: audyssey_dynamic_volume_state
  type: enum
  values: [off, light, medium, heavy]
  query_command: ADVQSTN
- id: dolby_volume_state
  type: enum
  values: [off, low, mid, high]
  query_command: DVLQSTN
- id: music_optimizer_state
  type: enum
  values: [off, on]
  query_command: MOTQSTN
- id: tuner_frequency
  type: string
  description: FM nnn.nn MHz / AM nnnnn kHz
  query_command: TUNQSTN
- id: preset_number
  type: string
  description: "01"-"28" (1-40 in hex)
  query_command: PRSQSTN
- id: zone2_power_status
  type: enum
  values: [standby, on]
  query_command: ZPWQSTN
- id: zone2_muting_status
  type: enum
  values: [off, on]
  query_command: ZMTQSTN
- id: zone2_volume_level
  type: string
  description: Hex "00"-"64" (0-100)
  query_command: ZVLQSTN
- id: zone2_tone
  type: string
  description: "BxxTxx" format
  query_command: ZTNQSTN
- id: zone2_balance
  type: string
  description: Balance value
  query_command: ZBLQSTN
- id: zone2_selector_status
  type: string
  description: Zone2 input selector code
  query_command: SLZQSTN
- id: zone3_power_status
  type: enum
  values: [standby, on]
  query_command: PW3QSTN
- id: zone3_muting_status
  type: enum
  values: [off, on]
  query_command: MT3QSTN
- id: zone3_volume_level
  type: string
  description: Hex "00"-"64" (0-100)
  query_command: VL3QSTN
- id: zone3_tone
  type: string
  description: "BxxTxx" format
  query_command: TN3QSTN
- id: zone3_balance
  type: string
  description: Balance value
  query_command: BL3QSTN
- id: zone3_selector_status
  type: string
  description: Zone3 input selector code
  query_command: SL3QSTN
- id: zone4_power_status
  type: enum
  values: [standby, on]
  query_command: PW4QSTN
- id: zone4_muting_status
  type: enum
  values: [off, on]
  query_command: MT4QSTN
- id: zone4_volume_level
  type: string
  description: Hex "00"-"64" (0-100)
  query_command: VL4QSTN
- id: zone4_selector_status
  type: string
  description: Zone4 input selector code
  query_command: SL4QSTN
- id: netusb_artist
  type: string
  description: Net/USB Artist Name (variable-length, 64 chars max)
  query_command: NATQSTN
- id: netusb_album
  type: string
  description: Net/USB Album Name (variable-length, 64 chars max)
  query_command: NALQSTN
- id: netusb_title
  type: string
  description: Net/USB Title Name (variable-length, 64 chars max)
  query_command: NTIQSTN
- id: netusb_time
  type: string
  description: "mm:ss/mm:ss" elapsed/track max 99:59
  query_command: NTMQSTN
- id: netusb_track_info
  type: string
  description: "cccc/tttt" current/total tracks max 9999
  query_command: NTRQSTN
- id: netusb_play_status
  type: string
  description: 3-char "prs" - p=play state (S/P/p/F/R), r=repeat ("-"/R/F/1)
  query_command: NSTQSTN
- id: audio_information
  type: string
  description: "nnnnn:nnnnn" comma-separated audio info
  query_command: IFAQSTN
- id: video_information
  type: string
  description: "nnnnn:nnnnn" comma-separated video info
  query_command: IFVQSTN

# Additional documented feedbacks. Query commands concatenate the mnemonic and QSTN.
- id: speaker_layout_status
  type: enum
  values: ["SB", "FH", "FW"]
  description: 'SPL Speaker Layout'
  query_command: SPLQSTN
- id: tone_front
  type: string
  description: 'TFR Front Tone ("BxxTxx")'
  query_command: TFRQSTN
- id: tone_front_wide
  type: string
  description: 'TFW Front Wide Tone ("BxxTxx")'
  query_command: TFWQSTN
- id: tone_front_high
  type: string
  description: 'TFH Front High Tone ("BxxTxx")'
  query_command: TFHQSTN
- id: tone_center
  type: string
  description: 'TCT Tone(Center), "BxxTxx"'
  query_command: TCTQSTN
- id: tone_surround
  type: string
  description: 'TSR Surround Tone ("BxxTxx")'
  query_command: TSRQSTN
- id: tone_surround_back
  type: string
  description: 'TSB Surround Back Tone ("BxxTxx")'
  query_command: TSBQSTN
- id: tone_subwoofer
  type: string
  description: 'TSW Subwoofer Tone ("BxxTxx")'
  query_command: TSWQSTN
- id: display_mode_status
  type: string
  description: 'DIF Display Mode; response range UNRESOLVED'
  query_command: DIFQSTN
- id: recout_selector_status
  type: string
  description: 'SLR RECOUT Selector Position'
  query_command: SLRQSTN
- id: audio_selector_status
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06"]
  description: 'SLA Audio Selector Status'
  query_command: SLAQSTN
- id: video_output_selector_status
  type: enum
  values: ["00", "01"]
  description: 'VOS Video Output Selector(Japanese Model Only)'
  query_command: VOSQSTN
- id: hdmi_output_selector_status
  type: enum
  values: ["00", "01", "02", "03", "04", "05"]
  description: 'HDO HDMI Output Selector'
  query_command: HDOQSTN
- id: monitor_resolution_status
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "07", "06"]
  description: 'RES Monitor Out Resolution'
  query_command: RESQSTN
- id: isf_mode_status
  type: enum
  values: ["00", "01", "02"]
  description: 'ISF Mode State'
  query_command: ISFQSTN
- id: reeq_academy_filter_state
  type: enum
  values: ["00", "01", "02"]
  description: 'RAS Re-EQ/Academy State; Re-EQ and Cinema Filter interpretations depend on model'
  query_command: RASQSTN
- id: xm_channel_name
  type: string
  description: 'XCN XM Channel Name, "nnnnnnnnnn"; XM Model Only'
  query_command: XCNQSTN
- id: xm_artist_name
  type: string
  description: 'XAT XM Artist Name, "nnnnnnnnnn"; XM Model Only'
  query_command: XATQSTN
- id: xm_title
  type: string
  description: 'XTI XM Title, "nnnnnnnnnn"; XM Model Only'
  query_command: XTIQSTN
- id: xm_channel_number
  type: string
  description: 'XCH XM Channel Number"000-255"; XM Model Only'
  query_command: XCHQSTN
- id: xm_category
  type: string
  description: 'XCT XM Category Info, "nnnnnnnnnn"; XM Model Only'
  query_command: XCTQSTN
- id: sirius_channel_name
  type: string
  description: 'SCN SIRIUS Channel Name, "nnnnnnnnnn"; SIRIUS Model Only'
  query_command: SCNQSTN
- id: sirius_artist_name
  type: string
  description: 'SAT SIRIUS Artist Name, "nnnnnnnnnn"; SIRIUS Model Only'
  query_command: SATQSTN
- id: sirius_title
  type: string
  description: 'STI SIRIUS Title, "nnnnnnnnnn"; SIRIUS Model Only'
  query_command: STIQSTN
- id: sirius_channel_number
  type: string
  description: 'SCH SIRIUS Channel Number"000-255"; SIRIUS Model Only'
  query_command: SCHQSTN
- id: sirius_category
  type: string
  description: 'SCT SIRIUS Category Info, "nnnnnnnnnn"; SIRIUS Model Only'
  query_command: SCTQSTN
- id: sirius_lock_status
  type: enum
  values: ["INPUT", "WRONG"]
  description: 'SLK: "INPUT" displays"Please input the Lock password"; "WRONG" displays"The Lock password is wrong"; SIRIUS Model Only; no query documented'
- id: hd_radio_artist_name
  type: string
  description: 'HAT HD Radio Artist Name (variable-length, 64 digits max); HD Radio Model Only'
  query_command: HATQSTN
- id: hd_radio_channel_name
  type: string
  description: 'HCN HD Radio Channel Name (Station Name) (7 digits); HD Radio Model Only'
  query_command: HCNQSTN
- id: hd_radio_title
  type: string
  description: 'HTI HD Radio Title (variable-length, 64 digits max); HD Radio Model Only'
  query_command: HTIQSTN
- id: hd_radio_detail
  type: string
  description: 'HDS HD Radio Detail Info; source describes response as HD Radio Title, "nnnnnnnnnn"; HD Radio Model Only'
  query_command: HDSQSTN
- id: hd_radio_program
  type: string
  description: 'HPR HD Radio Channel Program, "01"-"08"; HD Radio Model Only'
  query_command: HPRQSTN
- id: hd_radio_blend_mode
  type: enum
  values: ["00", "01"]
  description: 'HBL: "00" Auto; "01" Analog; HD Radio Model Only'
  query_command: HBLQSTN
- id: hd_radio_tuner_status
  type: string
  description: 'HTS "mmnnoo" HD Radio Tuner Status (3 bytes); mm -> "00" not HD, "01" HD; nn -> current Program "01"-"08"; oo -> receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.); HD Radio Model Only'
  query_command: HTSQSTN
- id: zone2_tuner_frequency
  type: string
  description: 'TUZ Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz)'
  query_command: TUZQSTN
- id: zone2_preset_number
  type: string
  description: 'PRZ: "01"-"28" Preset No. 1 - 40; "01"-"1E" Preset No. 1 - 30; In hexadecimal representation; applicable model range UNRESOLVED'
  query_command: PRZQSTN
- id: zone2_late_night_level
  type: enum
  values: ["00", "01", "02"]
  description: 'LTZ: "00" Off; "01" Low; "02" High'
  query_command: LTZQSTN
- id: zone2_reeq_academy_filter_state
  type: enum
  values: ["00", "01", "02"]
  description: 'RAZ: "00" Both Off; "01" Re-EQ On; "02" Academy On'
  query_command: RAZQSTN
- id: zone3_tuner_frequency
  type: string
  description: 'TU3 Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz)'
  query_command: TU3QSTN
- id: zone3_preset_number
  type: string
  description: 'PR3: "01"-"28" Preset No. 1-40; "01"-"1E" Preset No. 1-30; In hexadecimal representation; applicable model range UNRESOLVED'
  query_command: PR3QSTN
- id: zone4_tuner_frequency
  type: string
  description: 'TU4 Tuning Frequency (FM nnn.nn MHz / AM nnnnn kHz)'
  query_command: TU4QSTN
- id: zone4_preset_number
  type: string
  description: 'PR4: "01"-"28" Preset No. 1-40; "01"-"1E" Preset No. 1-30; In hexadecimal representation; applicable model range UNRESOLVED'
  query_command: PR4QSTN
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands
```

## Events
```yaml
# Receiver sends unsolicited status messages when state changes
# Format: same as response to question commands (e.g. "SLI03" when input changes)
# Interval: receiver needs >50ms between received messages
# UNRESOLVED: complete event taxonomy not explicitly enumerated in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Zone2 tone/balance only works when main zone is ON
  - Zone3 tone/balance only works when main zone is ON and Zone2/Zone3 is powered or variable
  - TGA/TGB/TGC available only when each 12V Trigger parameter is "OFF" at setup menu
# UNRESOLVED: power-on sequencing, fault behavior, error recovery - not stated in source
```

## Notes
ISCP message format: `!1COMMANDVALUE[CR]`, `!1COMMANDVALUE[LF]`, or `!1COMMANDVALUE[CR][LF]` for sending; responses include `[EOF]` end character. eISCP wraps ISCP in TCP with 16-byte header (size 0x00000010, version 0x01, unit type "1" for receiver). Continuous connection required for unsolicited status notifications; only one client connection supported. FFW/REW network commands must be sent continuously with no more than 100ms delay between codes. Zone4 tone/balance commands absent from spec — may not be supported on TX-NR906 hardware.
<!-- UNRESOLVED: complete unsolicited event list, Zone4 tone/balance support, firmware compatibility range -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T13:29:59.016Z
last_checked_at: 2026-10-07T22:08:06.215Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:08:06.215Z
matched_actions: 497
action_count: 497
confidence: medium
summary: "All 497 action units map to source ISCP/RI commands with agreeing shapes, transport matches, and no unrepresented source commands found; auth is left UNRESOLVED. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Zone4 tone/balance not stated in source; Zone4 selector limited to USB/MUSIC SERVER only per support list"
- "no discrete settable parameters beyond action commands"
- "complete event taxonomy not explicitly enumerated in source"
- "no explicit multi-step macro sequences documented in source"
- "power-on sequencing, fault behavior, error recovery - not stated in source"
- "complete unsolicited event list, Zone4 tone/balance support, firmware compatibility range"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
