---
spec_id: admin/rotel-rc-1590
schema_version: ai4av-public-spec-v1
revision: 2
title: "Rotel RC-1590 Control Spec"
manufacturer: Rotel
model_family: RC-1590
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RC-1590
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1590%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-22T14:55:41.363Z
last_checked_at: 2026-06-09T07:16:11.603Z
generated_at: 2026-06-09T07:16:11.603Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "V1.0 (prior to V1.40) commands documented in Section 3/4 of source; not all enumerated as primary actions."
  - "automatic display update events mentioned but no explicit event schema in source"
  - "no other safety warnings or interlock procedures in source"
  - "V1.0 freq? response max is 192 kHz, V2.0 adds 384 kHz."
  - "exact volume scale boundary 0 vs 1 differs by protocol revision (vol_min! → 00 in V2.0, volume_min! → min in V1.0)."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:16:11.603Z
  matched_actions: 130
  action_count: 130
  confidence: medium
  summary: "All 130 spec actions verified as literal matches in source; V2.0 and V1.0 protocols fully covered; transport parameters confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Rotel RC-1590 Control Spec

## Summary
Rotel RC-1590 stereo preamplifier. Supports RS-232C (115200 baud, 8N1, no flow control) and TCP/IP control (port 9590). ASCII protocol with "!" command terminator and "$" response terminator (V2.0 protocol, firmware V1.40+). V1.0 legacy protocol (firmware prior to V1.40) uses "!" response terminator and different command names. Covers power, volume, source selection, tone/balance, transport, dimmer, display, power mode, and network queries.

<!-- UNRESOLVED: V1.0 (prior to V1.40) commands documented in Section 3/4 of source; not all enumerated as primary actions. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 9590
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
# V2.0 protocol (firmware V1.40+). V1.0 legacy commands (firmware prior to V1.40) are listed
# in a separate section below. Command payloads are verbatim from source.
- id: power_on
  label: Power On
  kind: action
  command: "power_on!"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "power_off!"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "power_toggle!"
  params: []

- id: power_query
  label: Power Status Query
  kind: query
  command: "power?"
  params: []

- id: vol_up
  label: Volume Up
  kind: action
  command: "vol_up!"
  params: []

- id: vol_dwn
  label: Volume Down
  kind: action
  command: "vol_dwn!"
  params: []

- id: vol_min
  label: Set Volume to Min
  kind: action
  command: "vol_min!"
  params: []

- id: vol_nn
  label: Set Volume to Level
  kind: action
  command: "vol_nn!"
  params:
    - name: level
      type: integer
      description: Volume level 01-96

- id: volume_query
  label: Volume Query
  kind: query
  command: "volume?"
  params: []

- id: mute
  label: Mute Toggle
  kind: action
  command: "mute!"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "mute_on!"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "mute_off!"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "mute?"
  params: []

- id: source_cd
  label: Source CD
  kind: action
  command: "cd!"
  params: []

- id: source_coax1
  label: Source Coax 1
  kind: action
  command: "coax1!"
  params: []

- id: source_coax2
  label: Source Coax 2
  kind: action
  command: "coax2!"
  params: []

- id: source_coax3
  label: Source Coax 3
  kind: action
  command: "coax3!"
  params: []

- id: source_opt1
  label: Source Optical 1
  kind: action
  command: "opt1!"
  params: []

- id: source_opt2
  label: Source Optical 2
  kind: action
  command: "opt2!"
  params: []

- id: source_opt3
  label: Source Optical 3
  kind: action
  command: "opt3!"
  params: []

- id: source_aux
  label: Source Aux
  kind: action
  command: "aux!"
  params: []

- id: source_tuner
  label: Source Tuner
  kind: action
  command: "tuner!"
  params: []

- id: source_phono
  label: Source Phono
  kind: action
  command: "phono!"
  params: []

- id: source_usb
  label: Source Front USB
  kind: action
  command: "usb!"
  params: []

- id: source_bluetooth
  label: Source Bluetooth
  kind: action
  command: "bluetooth!"
  params: []

- id: source_bal_xlr
  label: Source XLR
  kind: action
  command: "bal_xlr!"
  params: []

- id: source_pc_usb
  label: Source PC-USB
  kind: action
  command: "pcusb!"
  params: []

- id: source_query
  label: Source Query
  kind: query
  command: "source?"
  params: []

- id: play
  label: Play
  kind: action
  command: "play!"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "stop!"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "pause!"
  params: []

- id: trkf
  label: Track Forward / Tune Up
  kind: action
  command: "trkf!"
  params: []

- id: trkb
  label: Track Backward / Tune Down
  kind: action
  command: "trkb!"
  params: []

- id: bypass_on
  label: Tone Bypass On
  kind: action
  command: "bypass_on!"
  params: []

- id: bypass_off
  label: Tone Bypass Off
  kind: action
  command: "bypass_off!"
  params: []

- id: bypass_query
  label: Tone Bypass Query
  kind: query
  command: "bypass?"
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  command: "bass_up!"
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: "bass_down!"
  params: []

- id: bass_set
  label: Set Bass to Level
  kind: action
  command: "bass_{level}!"
  params:
    - name: level
      type: string
      description: Bass value: one of -10, 000, +10 (full range -10..+10 documented but only three discrete commands listed)

- id: bass_query
  label: Bass Level Query
  kind: query
  command: "bass?"
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  command: "treble_up!"
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: "treble_down!"
  params: []

- id: treble_set
  label: Set Treble to Level
  kind: action
  command: "treble_{level}!"
  params:
    - name: level
      type: string
      description: Treble value: one of -10, 000, +10 (full range -10..+10 documented but only three discrete commands listed)

- id: treble_query
  label: Treble Level Query
  kind: query
  command: "treble?"
  params: []

- id: balance_r
  label: Balance Right
  kind: action
  command: "balance_r!"
  params: []

- id: balance_l
  label: Balance Left
  kind: action
  command: "balance_l!"
  params: []

- id: balance_l15
  label: Set Balance to Max Left
  kind: action
  command: "balance_l15!"
  params: []

- id: balance_000
  label: Set Balance to Center
  kind: action
  command: "balance_000!"
  params: []

- id: balance_r15
  label: Set Balance to Max Right
  kind: action
  command: "balance_r15!"
  params: []

- id: balance_query
  label: Balance Query
  kind: query
  command: "balance?"
  params: []

- id: freq_query
  label: Digital Input Frequency Query
  kind: query
  command: "freq?"
  params: []

- id: dimmer_toggle
  label: Toggle Dimmer
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_0
  label: Set Dimmer to Brightest (0)
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_1
  label: Set Dimmer to Level 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_2
  label: Set Dimmer to Level 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_3
  label: Set Dimmer to Level 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_4
  label: Set Dimmer to Level 4
  kind: action
  command: "dimmer_4!"
  params: []

- id: dimmer_5
  label: Set Dimmer to Level 5
  kind: action
  command: "dimmer_5!"
  params: []

- id: dimmer_6
  label: Set Dimmer to Dimmest (6)
  kind: action
  command: "dimmer_6!"
  params: []

- id: dimmer_query
  label: Dimmer Query
  kind: query
  command: "dimmer?"
  params: []

- id: pcusb_class_1
  label: Set PC-USB Audio Class to 1.0
  kind: action
  command: "pcusb_class_1!"
  params: []

- id: pcusb_class_2
  label: Set PC-USB Audio Class to 2.0
  kind: action
  command: "pcusb_class_2!"
  params: []

- id: pcusb_query
  label: PC-USB Class Query
  kind: query
  command: "pcusb?"
  params: []

- id: rs232_update_on
  label: Set RS232 Update to Auto
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: Set RS232 Update to Manual
  kind: action
  command: "rs232_update_off!"
  params: []

- id: version_query
  label: Main CPU Version Query
  kind: query
  command: "version?"
  params: []

- id: pc_version_query
  label: PC-USB Version Query
  kind: query
  command: "pc_version?"
  params: []

- id: ip_query
  label: IP Address Query
  kind: query
  command: "ip?"
  params: []

- id: mac_query
  label: MAC Address Query
  kind: query
  command: "mac?"
  params: []

- id: model_query
  label: Model Number Query
  kind: query
  command: "model?"
  params: []

- id: discover_query
  label: Device Discover Query
  kind: query
  command: "discover?"
  params: []

# --- V1.0 legacy protocol (firmware prior to V1.40) ---
# These commands use different names and "!" response terminator.
# Listed separately so V2.0 IDs above remain stable for V1.40+ deployments.
- id: v1_volume_up
  label: Volume Up (V1.0 legacy)
  kind: action
  command: "volume_up!"
  notes: V1.0 protocol only. Replaced by vol_up! in V2.0.
  params: []

- id: v1_volume_down
  label: Volume Down (V1.0 legacy)
  kind: action
  command: "volume_down!"
  notes: V1.0 protocol only. Replaced by vol_dwn! in V2.0.
  params: []

- id: v1_volume_min
  label: Set Volume to Min (V1.0 legacy)
  kind: action
  command: "volume_min!"
  notes: V1.0 protocol only. Replaced by vol_min! in V2.0.
  params: []

- id: v1_volume_n
  label: Set Volume to Level n (V1.0 legacy)
  kind: action
  command: "volume_n!"
  notes: V1.0 protocol only. Replaced by vol_nn! in V2.0. Range 1-96.
  params:
    - name: level
      type: integer
      description: Volume level 1-96

- id: v1_track_fwd
  label: Track Forward (V1.0 legacy)
  kind: action
  command: "track_fwd!"
  notes: V1.0 protocol only. Replaced by trkf! in V2.0.
  params: []

- id: v1_track_back
  label: Track Backward (V1.0 legacy)
  kind: action
  command: "track_back!"
  notes: V1.0 protocol only. Replaced by trkb! in V2.0.
  params: []

- id: v1_fast_fwd
  label: Fast Forward / Search Forward (V1.0 legacy)
  kind: action
  command: "fast_fwd!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_fast_back
  label: Fast Backward / Search Backward (V1.0 legacy)
  kind: action
  command: "fast_back!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_pc_usb
  label: Source PC-USB (V1.0 legacy)
  kind: action
  command: "pc_usb!"
  notes: V1.0 protocol only. Replaced by pcusb! in V2.0.
  params: []

- id: v1_rcd
  label: Source Rotel CD (V1.0 legacy)
  kind: action
  command: "rcd!"
  notes: V1.0 protocol only. Removed in V2.0. Maps to one of coax1/coax2/bal_xlr based on RCD input setup.
  params: []

- id: v1_tone_on
  label: Tone Controls On (V1.0 legacy)
  kind: action
  command: "tone_on!"
  notes: V1.0 protocol only. Replaced by bypass_off! in V2.0.
  params: []

- id: v1_tone_off
  label: Tone Controls Off (V1.0 legacy)
  kind: action
  command: "tone_off!"
  notes: V1.0 protocol only. Replaced by bypass_on! in V2.0.
  params: []

- id: v1_balance_right
  label: Balance Right (V1.0 legacy)
  kind: action
  command: "balance_right!"
  notes: V1.0 protocol only. Replaced by balance_r! in V2.0.
  params: []

- id: v1_balance_left
  label: Balance Left (V1.0 legacy)
  kind: action
  command: "balance_left!"
  notes: V1.0 protocol only. Replaced by balance_l! in V2.0.
  params: []

- id: v1_balance_R15
  label: Set Balance to Max Right (V1.0 legacy)
  kind: action
  command: "balance_R15!"
  notes: V1.0 protocol only. Replaced by balance_r15! in V2.0.
  params: []

- id: v1_balance_L15
  label: Set Balance to Max Left (V1.0 legacy)
  kind: action
  command: "balance_L15!"
  notes: V1.0 protocol only. Replaced by balance_l15! in V2.0.
  params: []

- id: v1_power_mode_quick
  label: Set Power Mode to Quick (V1.0 legacy)
  kind: action
  command: "power_mode_quick!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_power_mode_normal
  label: Set Power Mode to Normal (V1.0 legacy)
  kind: action
  command: "power_mode_normal!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_factory_default_on
  label: Reset to Factory Defaults (V1.0 legacy)
  kind: action
  command: "factory_default_on!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_display_update_auto
  label: Set Display Update to Auto (V1.0 legacy)
  kind: action
  command: "display_update_auto!"
  notes: V1.0 protocol only. Replaced by rs232_update_on! in V2.0.
  params: []

- id: v1_display_update_manual
  label: Set Display Update to Manual (V1.0 legacy)
  kind: action
  command: "display_update_manual!"
  notes: V1.0 protocol only. Replaced by rs232_update_off! in V2.0.
  params: []

- id: v1_menu
  label: Display Menu (V1.0 legacy)
  kind: action
  command: "menu!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_exit
  label: Exit Key (V1.0 legacy)
  kind: action
  command: "exit!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_up
  label: Cursor Up (V1.0 legacy)
  kind: action
  command: "up!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_down
  label: Cursor Down (V1.0 legacy)
  kind: action
  command: "down!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_left
  label: Cursor Left (V1.0 legacy)
  kind: action
  command: "left!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_right
  label: Cursor Right (V1.0 legacy)
  kind: action
  command: "right!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_enter
  label: Enter Key (V1.0 legacy)
  kind: action
  command: "enter!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_1
  label: Number Key 1 (V1.0 legacy)
  kind: action
  command: "1!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_2
  label: Number Key 2 (V1.0 legacy)
  kind: action
  command: "2!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_3
  label: Number Key 3 (V1.0 legacy)
  kind: action
  command: "3!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_4
  label: Number Key 4 (V1.0 legacy)
  kind: action
  command: "4!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_5
  label: Number Key 5 (V1.0 legacy)
  kind: action
  command: "5!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_6
  label: Number Key 6 (V1.0 legacy)
  kind: action
  command: "6!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_7
  label: Number Key 7 (V1.0 legacy)
  kind: action
  command: "7!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_8
  label: Number Key 8 (V1.0 legacy)
  kind: action
  command: "8!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_9
  label: Number Key 9 (V1.0 legacy)
  kind: action
  command: "9!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_num_0
  label: Number Key 0 (V1.0 legacy)
  kind: action
  command: "0!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

# V1.0 feedback request commands
- id: v1_get_current_power
  label: Power Status Query (V1.0 legacy)
  kind: query
  command: "get_current_power!"
  notes: V1.0 protocol only. Replaced by power? in V2.0.
  params: []

- id: v1_get_current_source
  label: Source Query (V1.0 legacy)
  kind: query
  command: "get_current_source!"
  notes: V1.0 protocol only. Replaced by source? in V2.0.
  params: []

- id: v1_get_volume
  label: Volume Query (V1.0 legacy)
  kind: query
  command: "get_volume!"
  notes: V1.0 protocol only. Replaced by volume? in V2.0.
  params: []

- id: v1_get_mute_status
  label: Mute Status Query (V1.0 legacy)
  kind: query
  command: "get_mute_status!"
  notes: V1.0 protocol only. Replaced by mute? in V2.0.
  params: []

- id: v1_get_tone
  label: Tone Control State Query (V1.0 legacy)
  kind: query
  command: "get_tone!"
  notes: V1.0 protocol only. Replaced by bypass? in V2.0.
  params: []

- id: v1_get_bass
  label: Bass Level Query (V1.0 legacy)
  kind: query
  command: "get_bass!"
  notes: V1.0 protocol only. Replaced by bass? in V2.0.
  params: []

- id: v1_get_treble
  label: Treble Level Query (V1.0 legacy)
  kind: query
  command: "get_treble!"
  notes: V1.0 protocol only. Replaced by treble? in V2.0.
  params: []

- id: v1_get_balance
  label: Balance Query (V1.0 legacy)
  kind: query
  command: "get_balance!"
  notes: V1.0 protocol only. Replaced by balance? in V2.0.
  params: []

- id: v1_get_pcusb_class
  label: PC-USB Class Query (V1.0 legacy)
  kind: query
  command: "get_pcusb_class!"
  notes: V1.0 protocol only. Replaced by pcusb? in V2.0.
  params: []

- id: v1_get_current_freq
  label: Digital Input Frequency Query (V1.0 legacy)
  kind: query
  command: "get_current_freq!"
  notes: V1.0 protocol only. Replaced by freq? in V2.0. V1.0 does not include 384 kHz response.
  params: []

- id: v1_get_volume_max
  label: Max Volume Query (V1.0 legacy)
  kind: query
  command: "get_volume_max!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_get_volume_min
  label: Min Volume Query (V1.0 legacy)
  kind: query
  command: "get_volume_min!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_get_tone_max
  label: Max Tone Value Query (V1.0 legacy)
  kind: query
  command: "get_tone_max!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_get_power_mode
  label: Power Mode Query (V1.0 legacy)
  kind: query
  command: "get_power_mode!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_get_display
  label: Full Display Query (V1.0 legacy)
  kind: query
  command: "get_display!"
  notes: V1.0 protocol only. Removed in V2.0. Returns display=###,text format.
  params: []

- id: v1_get_display1
  label: Display Line 1 Query (V1.0 legacy)
  kind: query
  command: "get_display1!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_get_display2
  label: Display Line 2 Query (V1.0 legacy)
  kind: query
  command: "get_display2!"
  notes: V1.0 protocol only. Removed in V2.0.
  params: []

- id: v1_get_product_type
  label: Product Type Query (V1.0 legacy)
  kind: query
  command: "get_product_type!"
  notes: V1.0 protocol only. Replaced by model? in V2.0.
  params: []

- id: v1_get_product_version
  label: Product Version Query (V1.0 legacy)
  kind: query
  command: "get_product_version!"
  notes: V1.0 protocol only. Replaced by version? in V2.0.
  params: []

- id: v1_get_display_size
  label: Display Size Query (V1.0 legacy)
  kind: query
  command: "get_display_size!"
  notes: V1.0 protocol only. Removed in V2.0. Requires Main Software V1.2.9 or later.
  params: []

- id: v1_get_display_update
  label: Display Update Mode Query (V1.0 legacy)
  kind: query
  command: "get_display_update!"
  notes: V1.0 protocol only. Removed in V2.0. Requires Main Software V1.2.9 or later.
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  type: enum
  values:
    - on
    - standby

- id: source_state
  label: Source Status
  type: enum
  values:
    - cd
    - coax1
    - coax2
    - coax3
    - opt1
    - opt2
    - opt3
    - aux
    - tuner
    - phono
    - usb
    - pc_usb
    - bal_xlr
    - bluetooth
  notes: V1.0 adds _cd suffixed variants (e.g. coax1_cd) for Rotel Link RCD input.

- id: volume_state
  label: Volume Level
  type: integer
  description: 00-96 (V2.0); 1-96 in V1.0.

- id: mute_state
  label: Mute Status
  type: enum
  values:
    - on
    - off

- id: bypass_state
  label: Tone Bypass State
  type: enum
  values:
    - on
    - off

- id: bass_state
  label: Bass Level
  type: string
  description: 000, +01 to +10, -01 to -10

- id: treble_state
  label: Treble Level
  type: string
  description: 000, +01 to +10, -01 to -10

- id: balance_state
  label: Balance
  type: string
  description: 000, L01-L15, R01-R15

- id: freq_state
  label: Digital Input Frequency
  type: enum
  values:
    - "off"
    - "32"
    - "44.1"
    - "48"
    - "88.2"
    - "96"
    - "176.4"
    - "192"
    - "384"
  notes: V1.0 does not include 384 kHz response.

- id: dimmer_state
  label: Dimmer Level
  type: integer
  description: 0-6 (0=brightest, 6=dimmest)

- id: pcusb_class_state
  label: PC-USB Class
  type: enum
  values:
    - "1"
    - "2"

- id: version_state
  label: Main CPU Version
  type: string

- id: pc_version_state
  label: PC-USB Version
  type: string

- id: ip_state
  label: IP Address
  type: string
  notes: Returned as ipaddress=###.###.###.###$

- id: mac_state
  label: MAC Address
  type: string
  notes: Uppercase hex, no separators.

- id: model_state
  label: Model Number
  type: string

- id: discover_state
  label: Device Discover Response
  type: string
  description: Format: discover=ip=###.###.###.###port=#### mac=############
  notes: Source example shows no space between ip value and port key.

- id: update_mode_state
  label: RS232 Update Mode
  type: enum
  values:
    - auto
    - manual

- id: tone_state_v1
  label: Tone Control State (V1.0 only)
  type: enum
  values:
    - on
    - off
  notes: V1.0 only. Replaced by bypass_state in V2.0.

- id: power_mode_state_v1
  label: Power Mode (V1.0 only)
  type: enum
  values:
    - quick
    - normal
  notes: V1.0 only. Removed in V2.0.

- id: volume_max_state_v1
  label: Max Volume Value (V1.0 only)
  type: integer
  notes: V1.0 only. Removed in V2.0.

- id: volume_min_state_v1
  label: Min Volume Value (V1.0 only)
  type: integer
  notes: V1.0 only. Removed in V2.0.

- id: tone_max_state_v1
  label: Max Tone Value (V1.0 only)
  type: integer
  notes: V1.0 only. Returned as tone_max=10! in V1.0.

- id: product_type_state_v1
  label: Product Type (V1.0 only)
  type: string
  notes: V1.0 only. Format product_type=##,text. Replaced by model_state in V2.0.

- id: product_version_state_v1
  label: Product Version (V1.0 only)
  type: string
  notes: V1.0 only. Format product_version=##,text. Replaced by version_state in V2.0.

- id: display_size_state_v1
  label: Display Size (V1.0 only)
  type: string
  notes: V1.0 only. Format display_size=##,##. Requires Main Software V1.2.9+.

- id: display_update_state_v1
  label: Display Update Mode (V1.0 only)
  type: enum
  values:
    - auto
    - manual
  notes: V1.0 only. Requires Main Software V1.2.9+.

- id: display_state_v1
  label: Full Display Text (V1.0 only)
  type: string
  notes: V1.0 only. Format display=###,text. 3-digit length prefix.
```

## Variables
```yaml
# Volume, bass, treble, balance are set via Actions with params.
# No separate Variables section needed.
```

## Events
```yaml
# UNRESOLVED: automatic display update events mentioned but no explicit event schema in source
# (Section 5 describes hex char mapping for display text but not a structured notification).
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_default_on  # V1.0 only; resets unit to factory defaults
interlocks: []
# UNRESOLVED: no other safety warnings or interlock procedures in source
```

## Notes
- Command terminator: "!" (commands). Response terminator: "$" (V2.0, firmware V1.40+), "!" (V1.0, firmware prior to V1.40). Do not send CR/LF after command.
- Do not include spaces in commands.
- Rotel Link RCD input selection (V1.0): affects response strings for that input (suffix "_cd" variant, e.g. source=coax1_cd!).
- PC-USB transport controls (play/stop/pause/track) require USB 2.0 mode on RC-1590.
- V2.0 protocol (V1.40+) changes: tone_on!/tone_off! renamed to bypass_off!/bypass_on!; display_update_auto!/display_update_manual! renamed to rs232_update_on!/rs232_update_off!; volume_up!/volume_down! shortened to vol_up!/vol_dwn!; track_fwd!/track_back! shortened to trkf!/trkb!; all feedback request get_* commands shortened to bare noun? queries. See Appendix A of source for full delta.
- V2.0 adds 384 kHz to freq? response. V1.0 freq? tops out at 192 kHz.
- RS-232 hardware does not support flow control; avoid packet loss by pacing commands.
- IP responses sent via same TCP port (9590) as commands received.
- Section 5: special hex character mapping (3-byte EE 82 xx sequences) for display symbols A,C,F,G,I,L,M,R,S,T, and play/pause/skip icons. Used when parsing display=###,text (V1.0) feedback.
- V1.0 get_display* responses include a 2- or 3-digit byte-count prefix followed by "," then text; the byte count does not include the length digits or the comma.
- V1.0 rcd! source select maps dynamically to whichever input is configured as the Rotel Link RCD input in setup (coax1, coax2, or bal_xlr).

<!-- UNRESOLVED: V1.0 freq? response max is 192 kHz, V2.0 adds 384 kHz. -->
<!-- UNRESOLVED: exact volume scale boundary 0 vs 1 differs by protocol revision (vol_min! → 00 in V2.0, volume_min! → min in V1.0). -->
```

Spec upgraded to revision 2. Added: literal `command:` payloads to every action, all V1.0 legacy actions (volume, transport, RCD, power mode, factory default, display update, menu, numeric), all V1.0/V2.0 query commands, balance_000 action, new feedbacks (V1.0 product_type, product_version, display_size, display_update, power_mode, tone_max, volume_max/min), Safety confirmation_required for factory_default_on.

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1590%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
retrieved_at: 2026-05-22T14:55:41.363Z
last_checked_at: 2026-06-09T07:16:11.603Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:16:11.603Z
matched_actions: 130
action_count: 130
confidence: medium
summary: "All 130 spec actions verified as literal matches in source; V2.0 and V1.0 protocols fully covered; transport parameters confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "V1.0 (prior to V1.40) commands documented in Section 3/4 of source; not all enumerated as primary actions."
- "automatic display update events mentioned but no explicit event schema in source"
- "no other safety warnings or interlock procedures in source"
- "V1.0 freq? response max is 192 kHz, V2.0 adds 384 kHz."
- "exact volume scale boundary 0 vs 1 differs by protocol revision (vol_min! → 00 in V2.0, volume_min! → min in V1.0)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
