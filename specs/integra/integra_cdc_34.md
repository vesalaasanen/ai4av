---
spec_id: admin/integra-cdc-34
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra CDC 34 Control Spec"
manufacturer: Integra
model_family: "CDC 34"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "CDC 34"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
retrieved_at: 2026-04-29T09:20:22.333Z
last_checked_at: 2026-04-23T07:01:27.477Z
generated_at: 2026-04-23T07:01:27.477Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T07:01:27.477Z
  matched_actions: 152
  action_count: 152
  confidence: high
  summary: "All 152 spec actions have literal ISCP command counterparts in source; transport parameters (9600 baud, port 60128) verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Integra CDC 34 Control Spec

## Summary
AV receiver supporting ISCP (Integra Serial Control Protocol) v1.15 over RS-232C and eISCP over Ethernet (TCP). Provides power control, multi-zone audio management (Main/Zone2/Zone3/Zone4), input selection, tone adjustment, listening modes, tuner control, network/USB playback, and RI-connected dock/CD/Tape/MD commands. No authentication required for either transport.

<!-- UNRESOLVED: compatible models listed only in revision history; entity may represent a family broader than CDC-34 specifically -->

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
  port: 60128  # eISCP default; range 49152-65535 configurable via receiver setup menu
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWR/zone power commands present
- routable        # SLI selector, SLA audio selector, SLR RECOUT selector present
- queryable       # QSTN suffixed commands returning state present throughout
- levelable       # MVL/ZVL/VL3/VL4 volume commands, tone Bxx/Txx parameters present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_query
  label: Get Power Status
  kind: action
  params: []

- id: muting_on
  label: Audio Muting On
  kind: action
  params: []
- id: muting_off
  label: Audio Muting Off
  kind: action
  params: []
- id: muting_toggle
  label: Audio Muting Toggle
  kind: action
  params: []
- id: muting_query
  label: Get Muting Status
  kind: action
  params: []

- id: volume_set
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: string
      description: Hex value "00"-"64" for 0-100 range; "00"-"50" for 0-80 range on some models
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_query
  label: Get Volume Level
  kind: action
  params: []

- id: select_input
  label: Select Input Selector
  kind: action
  params:
    - name: input
      type: string
      description: >
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4, "04" VIDEO5, "05" VIDEO6,
        "06" VIDEO7, "10" DVD, "20" TAPE(1), "21" TAPE2, "22" PHONO, "23" CD,
        "24" FM, "25" AM, "26" TUNER, "27" MUSIC SERVER, "28" INTERNET RADIO,
        "29" USB/USB(Front), "2A" USB(Rear), "30" MULTI CH, "31" XM, "32" SIRIUS,
        "40" Universal PORT, "80" SOURCE
- id: selector_up
  label: Selector Wrap-Around Up
  kind: action
  params: []
- id: selector_down
  label: Selector Wrap-Around Down
  kind: action
  params: []
- id: selector_query
  label: Get Selector Position
  kind: action
  params: []

- id: tone_set
  label: Set Tone (Bass/Treble)
  kind: action
  params:
    - name: bass
      type: string
      description: "Bxx" where xx is "-A"..."00"..."+A" representing -10...0...+10 in 2-step increments
    - name: treble
      type: string
      description: "Txx" where xx is "-A"..."00"..."+A" representing -10...0...+10 in 2-step increments
- id: bass_up
  label: Front Bass Up (2 step)
  kind: action
  params: []
- id: bass_down
  label: Front Bass Down (2 step)
  kind: action
  params: []
- id: treble_up
  label: Front Treble Up (2 step)
  kind: action
  params: []
- id: treble_down
  label: Front Treble Down (2 step)
  kind: action
  params: []
- id: tone_query
  label: Get Front Tone
  kind: action
  params: []

- id: listening_mode_set
  label: Set Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: >
        "00" STEREO, "01" DIRECT, "02" SURROUND, "04" THX, "07" MONO MOVIE,
        "08" ORCHESTRA, "09" UNPLUGGED, "0A" STUDIO-MIX, "0B" TV LOGIC,
        "0C" ALL CH STEREO, "0D" THEATER-DIMENSIONAL, "0E" ENHANCED 7,
        "0F" MONO, "11" PURE AUDIO, "12" MULTIPLEX, "13" FULL MONO,
        "80" PLII/PLIIx Movie, "81" PLII/PLIIx Music, "82" Neo:6 Cinema,
        "83" Neo:6 Music, "90" PLIIz Height, plus many THX/Dolby/DTS variants
- id: listening_mode_up
  label: Listening Mode Wrap-Around Up
  kind: action
  params: []
- id: listening_mode_down
  label: Listening Mode Wrap-Around Down
  kind: action
  params: []
- id: listening_mode_query
  label: Get Listening Mode
  kind: action
  params: []

- id: late_night_set
  label: Set Late Night Level
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Off, "01" Low, "02" High, "03" Auto (Dolby TrueHD only)'
- id: late_night_query
  label: Get Late Night Level
  kind: action
  params: []

- id: sleep_set
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: '"01"-"5A" for 1-90 minutes in hex; "OFF" to disable'
- id: sleep_query
  label: Get Sleep Time
  kind: action
  params: []

- id: dimmer_set
  label: Set Dimmer Level
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Bright, "01" Dim, "02" Dark, "03" Shut-Off, "08" Bright & LED OFF'
- id: dimmer_query
  label: Get Dimmer Level
  kind: action
  params: []

- id: tuner_tune
  label: Tune Directly to Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz, AM nnnnn kHz, XM nnnnn ch (zero-pad first two digits of XM channel)
- id: tuner_up
  label: Tuning Frequency Up
  kind: action
  params: []
- id: tuner_down
  label: Tuning Frequency Down
  kind: action
  params: []
- id: tuner_query
  label: Get Tuning Frequency
  kind: action
  params: []

- id: preset_set
  label: Set Preset Number
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" (hex, preset 1-40) or "01"-"1E" (hex, preset 1-30) depending on model'
- id: preset_up
  label: Preset Wrap-Around Up
  kind: action
  params: []
- id: preset_down
  label: Preset Wrap-Around Down
  kind: action
  params: []
- id: preset_query
  label: Get Preset Number
  kind: action
  params: []

- id: display_info_query
  label: Get Display Information
  kind: action
  params:
    - name: type
      type: string
      description: '"00" Program Format, "01" Digital Input Position, "02" Digital Format, "03" Bass Level, "04" Treble Level'
- id: video_info_query
  label: Get Video Information
  kind: action
  params: []
- id: audio_info_query
  label: Get Audio Information
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
- id: osd_left
  label: OSD Left Key
  kind: action
  params: []
- id: osd_right
  label: OSD Right Key
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

- id: trigger_a_set
  label: Set 12V Trigger A
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off, "01" On'
- id: trigger_b_set
  label: Set 12V Trigger B
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off, "01" On'
- id: trigger_c_set
  label: Set 12V Trigger C
  kind: action
  params:
    - name: state
      type: string
      description: '"00" Off, "01" On'

- id: zone2_power_on
  label: Zone 2 Power On
  kind: action
  params: []
- id: zone2_power_standby
  label: Zone 2 Standby
  kind: action
  params: []
- id: zone2_power_query
  label: Get Zone 2 Power Status
  kind: action
  params: []
- id: zone2_muting_on
  label: Zone 2 Muting On
  kind: action
  params: []
- id: zone2_muting_off
  label: Zone 2 Muting Off
  kind: action
  params: []
- id: zone2_muting_toggle
  label: Zone 2 Muting Toggle
  kind: action
  params: []
- id: zone2_muting_query
  label: Get Zone 2 Muting Status
  kind: action
  params: []
- id: zone2_volume_set
  label: Set Zone 2 Volume
  kind: action
  params:
    - name: level
      type: string
      description: '"00"-"64" (hex, 0-100) or "00"-"50" (hex, 0-80) depending on model'
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: zone2_volume_query
  label: Get Zone 2 Volume
  kind: action
  params: []
- id: zone2_tone_set
  label: Set Zone 2 Tone
  kind: action
  params:
    - name: bass
      type: string
      description: '"Bxx" with -10...0...+10 in 2-step increments'
    - name: treble
      type: string
      description: '"Txx" with -10...0...+10 in 2-step increments'
- id: zone2_tone_query
  label: Get Zone 2 Tone
  kind: action
  params: []
- id: zone2_balance_set
  label: Set Zone 2 Balance
  kind: action
  params:
    - name: balance
      type: string
      description: '"xx" with -10...0...+10 in 2-step increments'
- id: zone2_balance_up
  label: Zone 2 Balance Up (to R)
  kind: action
  params: []
- id: zone2_balance_down
  label: Zone 2 Balance Down (to L)
  kind: action
  params: []
- id: zone2_balance_query
  label: Get Zone 2 Balance
  kind: action
  params: []
- id: zone2_selector_set
  label: Set Zone 2 Selector
  kind: action
  params:
    - name: input
      type: string
      description: Same selector codes as SLI command
- id: zone2_selector_query
  label: Get Zone 2 Selector
  kind: action
  params: []
- id: zone2_tuner_tune
  label: Zone 2 Tune Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz
- id: zone2_tuner_up
  label: Zone 2 Tuning Up
  kind: action
  params: []
- id: zone2_tuner_down
  label: Zone 2 Tuning Down
  kind: action
  params: []
- id: zone2_tuner_query
  label: Get Zone 2 Tuning Frequency
  kind: action
  params: []
- id: zone2_preset_set
  label: Set Zone 2 Preset
  kind: action
  params:
    - name: number
      type: string
      description: '"01"-"28" (hex, 1-40)'
- id: zone2_preset_up
  label: Zone 2 Preset Up
  kind: action
  params: []
- id: zone2_preset_down
  label: Zone 2 Preset Down
  kind: action
  params: []
- id: zone2_preset_query
  label: Get Zone 2 Preset
  kind: action
  params: []
- id: zone2_listening_mode_set
  label: Set Zone 2 Listening Mode
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" STEREO, "01" DIRECT, "0F" MONO, "12" MULTIPLEX, "87" DVS (PL2), "88" DVS (NEO6)'
- id: zone2_late_night_set
  label: Set Zone 2 Late Night
  kind: action
  params:
    - name: level
      type: string
      description: '"00" Off, "01" Low, "02" High'
- id: zone2_late_night_query
  label: Get Zone 2 Late Night
  kind: action
  params: []
- id: zone2_reeq_set
  label: Set Zone 2 Re-EQ/Academy Filter
  kind: action
  params:
    - name: mode
      type: string
      description: '"00" Both Off, "01" Re-EQ On, "02" Academy On'
- id: zone2_reeq_query
  label: Get Zone 2 Re-EQ/Academy State
  kind: action
  params: []

- id: zone3_power_on
  label: Zone 3 Power On
  kind: action
  params: []
- id: zone3_power_standby
  label: Zone 3 Standby
  kind: action
  params: []
- id: zone3_power_query
  label: Get Zone 3 Power Status
  kind: action
  params: []
- id: zone3_muting_on
  label: Zone 3 Muting On
  kind: action
  params: []
- id: zone3_muting_off
  label: Zone 3 Muting Off
  kind: action
  params: []
- id: zone3_muting_toggle
  label: Zone 3 Muting Toggle
  kind: action
  params: []
- id: zone3_muting_query
  label: Get Zone 3 Muting Status
  kind: action
  params: []
- id: zone3_volume_set
  label: Set Zone 3 Volume
  kind: action
  params:
    - name: level
      type: string
      description: '"00"-"64" (hex, 0-100) or "00"-"50" (hex, 0-80) depending on model'
- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
- id: zone3_volume_query
  label: Get Zone 3 Volume
  kind: action
  params: []
- id: zone3_tone_set
  label: Set Zone 3 Tone
  kind: action
  params:
    - name: bass
      type: string
    - name: treble
      type: string
- id: zone3_tone_query
  label: Get Zone 3 Tone
  kind: action
  params: []
- id: zone3_balance_set
  label: Set Zone 3 Balance
  kind: action
  params:
    - name: balance
      type: string
- id: zone3_balance_query
  label: Get Zone 3 Balance
  kind: action
  params: []
- id: zone3_selector_set
  label: Set Zone 3 Selector
  kind: action
  params:
    - name: input
      type: string
      description: Same selector codes as SLI command
- id: zone3_selector_query
  label: Get Zone 3 Selector
  kind: action
  params: []
- id: zone3_tuner_tune
  label: Zone 3 Tune Frequency
  kind: action
  params:
    - name: frequency
      type: string
- id: zone3_tuner_up
  label: Zone 3 Tuning Up
  kind: action
  params: []
- id: zone3_tuner_down
  label: Zone 3 Tuning Down
  kind: action
  params: []
- id: zone3_tuner_query
  label: Get Zone 3 Tuning Frequency
  kind: action
  params: []
- id: zone3_preset_set
  label: Set Zone 3 Preset
  kind: action
  params:
    - name: number
      type: string
- id: zone3_preset_query
  label: Get Zone 3 Preset
  kind: action
  params: []

- id: zone4_power_on
  label: Zone 4 Power On
  kind: action
  params: []
- id: zone4_power_standby
  label: Zone 4 Standby
  kind: action
  params: []
- id: zone4_power_query
  label: Get Zone 4 Power Status
  kind: action
  params: []
- id: zone4_muting_on
  label: Zone 4 Muting On
  kind: action
  params: []
- id: zone4_muting_off
  label: Zone 4 Muting Off
  kind: action
  params: []
- id: zone4_muting_query
  label: Get Zone 4 Muting Status
  kind: action
  params: []
- id: zone4_volume_set
  label: Set Zone 4 Volume
  kind: action
  params:
    - name: level
      type: string
- id: zone4_volume_up
  label: Zone 4 Volume Up
  kind: action
  params: []
- id: zone4_volume_down
  label: Zone 4 Volume Down
  kind: action
  params: []
- id: zone4_volume_query
  label: Get Zone 4 Volume
  kind: action
  params: []
- id: zone4_selector_set
  label: Set Zone 4 Selector
  kind: action
  params:
    - name: input
      type: string
- id: zone4_selector_query
  label: Get Zone 4 Selector
  kind: action
  params: []
- id: zone4_tuner_tune
  label: Zone 4 Tune Frequency
  kind: action
  params:
    - name: frequency
      type: string
- id: zone4_tuner_query
  label: Get Zone 4 Tuning Frequency
  kind: action
  params: []
- id: zone4_preset_set
  label: Set Zone 4 Preset
  kind: action
  params:
    - name: number
      type: string
- id: zone4_preset_query
  label: Get Zone 4 Preset
  kind: action
  params: []

- id: net_play
  label: Network/USB Play
  kind: action
  params: []
- id: net_stop
  label: Network/USB Stop
  kind: action
  params: []
- id: net_pause
  label: Network/USB Pause
  kind: action
  params: []
- id: net_track_up
  label: Network/USB Track Up
  kind: action
  params: []
- id: net_track_down
  label: Network/USB Track Down
  kind: action
  params: []
- id: net_ff
  label: Network/USB Fast Forward
  kind: action
  params: []
- id: net_rew
  label: Network/USB Rewind
  kind: action
  params: []
- id: net_repeat
  label: Network/USB Repeat
  kind: action
  params: []
- id: net_random
  label: Network/USB Random
  kind: action
  params: []
- id: net_display
  label: Network/USB Display
  kind: action
  params: []
- id: net_album
  label: Network/USB Album Key
  kind: action
  params: []
- id: net_artist
  label: Network/USB Artist Key
  kind: action
  params: []
- id: net_ch_up
  label: Network/USB CH UP (for iRadio)
  kind: action
  params: []
- id: net_ch_down
  label: Network/USB CH DOWN (for iRadio)
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
- id: dock_skip_back
  label: Dock Track Down
  kind: action
  params: []
- id: dock_pause
  label: Dock Pause
  kind: action
  params: []
- id: dock_ff
  label: Dock FF
  kind: action
  params: []
- id: dock_rew
  label: Dock Rewind
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

- id: cd_track_plus
  label: CD Track+
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
- id: cd_skip_back
  label: CD Skip Back
  kind: action
  params: []
- id: cd_open_close
  label: CD Open/Close
  kind: action
  params: []
- id: cd_memory
  label: CD Memory
  kind: action
  params: []
- id: cd_clear
  label: CD Clear
  kind: action
  params: []
- id: cd_repeat
  label: CD Repeat
  kind: action
  params: []
- id: cd_random
  label: CD Random
  kind: action
  params: []
- id: cd_display
  label: CD Display
  kind: action
  params: []
- id: cd_disc_plus
  label: CD Disc+
  kind: action
  params: []

- id: memory_store
  label: Store Memory
  kind: action
  params: []
- id: memory_recall
  label: Recall Memory
  kind: action
  params: []
- id: memory_lock
  label: Lock Memory
  kind: action
  params: []
- id: memory_unlock
  label: Unlock Memory
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["PWR00", "PWR01"]
  description: "PWR00=Standby, PWR01=On"
- id: muting_state
  type: enum
  values: ["AMT00", "AMT01"]
  description: "AMT00=Off, AMT01=On"
- id: volume_level
  type: string
  description: 2-char hex "00"-"64" (0-100) or "00"-"50" (0-80)
- id: selector_position
  type: string
  description: 2-char hex code for selected input
- id: tone_response
  type: string
  description: "BxxTxx" format, xx is "-A"..."00"..."+A"
- id: listening_mode_state
  type: string
  description: 2-char hex code for current listening mode
- id: late_night_state
  type: enum
  values: ["LTN00", "LTN01", "LTN02", "LTN03"]
  description: "00"=Off, "01"=Low, "02"=High, "03"=Auto
- id: sleep_time
  type: string
  description: '"01"-"5A" (1-90 min hex) or "OFF"'
- id: dimmer_state
  type: enum
  values: ["DIM00", "DIM01", "DIM02", "DIM03", "DIM08"]
  description: "00"=Bright, "01"=Dim, "02"=Dark, "03"=Shut-Off, "08"=Bright & LED OFF
- id: tuning_frequency
  type: string
  description: 5-digit frequency (FM nnn.nn MHz / AM nnnnn kHz)
- id: preset_number
  type: string
  description: 2-char hex "01"-"28"
- id: display_info
  type: string
  description: "nnnnn:nnnnn" format separator
- id: audio_info
  type: string
  description: "nnnnn:nnnnn" format
- id: video_info
  type: string
  description: "nnnnn:nnnnn" format

- id: zone2_power_state
  type: enum
  values: ["ZPW00", "ZPW01"]
- id: zone2_muting_state
  type: enum
  values: ["ZMT00", "ZMT01"]
- id: zone2_volume_level
  type: string
- id: zone2_tone_response
  type: string
- id: zone2_balance_state
  type: string
- id: zone2_selector_position
  type: string
- id: zone2_tuning_frequency
  type: string
- id: zone2_preset_number
  type: string
- id: zone2_listening_mode_state
  type: string
- id: zone2_late_night_state
  type: string
- id: zone2_reeq_state
  type: enum
  values: ["RAZ00", "RAZ01", "RAZ02"]

- id: zone3_power_state
  type: enum
  values: ["PW300", "PW301"]
- id: zone3_muting_state
  type: enum
  values: ["MT300", "MT301"]
- id: zone3_volume_level
  type: string
- id: zone3_tone_response
  type: string
- id: zone3_balance_state
  type: string
- id: zone3_selector_position
  type: string

- id: zone4_power_state
  type: enum
  values: ["PW400", "PW401"]
- id: zone4_muting_state
  type: enum
  values: ["MT400", "MT401"]
- id: zone4_volume_level
  type: string
- id: zone4_selector_position
  type: string

- id: net_artist_name
  type: string
  description: Variable-length up to 64 ASCII letters
- id: net_album_name
  type: string
  description: Variable-length up to 64 ASCII letters
- id: net_title_name
  type: string
  description: Variable-length up to 64 ASCII letters
- id: net_time_info
  type: string
  description: "mm:ss/mm:ss" format, max 99:59
- id: net_track_info
  type: string
  description: "cccc/tttt" (current/total, max 9999)
- id: net_play_status
  type: string
  description: 3-char "prs" format: play, repeat, shuffle state

- id: xm_channel_name
  type: string
- id: xm_artist_name
  type: string
- id: xm_title
  type: string
- id: xm_channel_number
  type: string
  description: '"000"-"255"'
- id: xm_category
  type: string

- id: hd_radio_artist_name
  type: string
  description: Up to 64 characters
- id: hd_radio_channel_name
  type: string
  description: 7 characters (station name)
- id: hd_radio_title
  type: string
  description: Up to 64 characters
- id: hd_radio_tuner_status
  type: string
  description: '"mmnnoo" 3-byte format: HD mode, program number, receivable bitmap'
```

## Variables
```yaml
# UNRESOLVED: Variables section - source defines only action/feedback commands;
# no separate settable parameter namespace identified beyond direct commands.
# Volume, tone, and similar controls are handled via Actions with immediate effect.
```

## Events
```yaml
# UNRESOLVED: Events section - unsolicited status push semantics described in
# section 2.3 but no explicit event list or message format enumerated.
# The protocol supports state-change notifications, but specific event names
# and payload schemas are not separately documented.
```

## Macros
```yaml
# UNRESOLVED: Macros section - no explicit multi-step macro definitions in source.
# Compound operations (e.g., power-on with input selection) are composed by
# sending individual commands sequentially; no named macro storage mechanism.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Zone 2 volume and tone control only functions when Main zone is On
  - Zone 3/Zone 4 volume only works when main is On and Zone is powered or variable
  - TGA/TGB/TGC 12V trigger commands only available when each trigger parameter is set to "OFF" in receiver setup menu
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source
```

## Notes
ISCP message format: `!1XXY[parameter][CR]` where `!` is start char, `1` is unit type (Receiver), `XXY` is 3-char command (e.g., `PWR`, `SLI`, `MVL`). Responses use same format with `S` prefix (e.g., `!1PWR01[EOF]`). End characters: `[CR]` or `[LF]` or `[CR][LF]` for commands; `[EOF]` or `[EOF][CR]` or `[EOF][CR][LF]` for responses. eISCP wraps ISCP in TCP with header (16-byte, big-endian size+version). Minimum receive interval: 50ms. Ethernet port configurable 49152-65535; default 60128. No authentication required. Net-Tune FF/REW commands require continuous sending with no more than 100ms delay between codes.
<!-- UNRESOLVED: precise eISCP end character sequence model-dependent — source notes "depend on model" -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio availability is model-dependent — not available on all CDC-34 family devices -->
<!-- UNRESOLVED: specific model compatibility for individual commands not documented beyond revision history model list -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
retrieved_at: 2026-04-29T09:20:22.333Z
last_checked_at: 2026-04-23T07:01:27.477Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T07:01:27.477Z
matched_actions: 152
action_count: 152
confidence: high
summary: "All 152 spec actions have literal ISCP command counterparts in source; transport parameters (9600 baud, port 60128) verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
