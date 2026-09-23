---
spec_id: admin/rotel-rc-1590
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RC-1590 Control Spec"
manufacturer: Rotel
model_family: RC-1590
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RC-1590
  firmware: "Main CPU V1.40 and newer (protocol V2.0); prior to V1.40 (protocol V1.0 legacy)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1590%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1580%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1572%20Protocol.pdf"
retrieved_at: 2026-09-02T14:51:19.560Z
last_checked_at: 2026-09-18T22:18:38.927Z
generated_at: 2026-09-18T22:18:38.927Z
firmware_coverage: "Main CPU V1.40 and newer (protocol V2.0); prior to V1.40 (protocol V1.0 legacy)"
protocol_coverage: []
known_gaps:
  - "no IP addressing details (DHCP/static, network config commands) beyond TCP port stated in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "no IP network configuration commands (DHCP/static assignment) documented in source"
  - "command acknowledgement/error behavior for invalid commands not documented in source"
verification:
  verdict: verified
  checked_at: 2026-09-18T22:18:38.927Z
  matched_actions: 136
  action_count: 136
  confidence: medium
  summary: "All 136 spec action units (power/volume/source/tone/balance/dimmer/transport/menu/numeric/system V2.0 + V1.0 legacy and feedback queries) appear verbatim as ASCII tokens in the refined Rotel RC-1590 command list; transport (115200 8N1, TCP 9590) matches the Connection/IP Control Settings tables. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Rotel RC-1590 Control Spec

## Summary
Rotel RC-1590 stereo preamplifier controlled via an ASCII command protocol over RS-232 (115200 8N1, no flow control) and TCP/IP (port 9590). This spec covers the V2.0 command set (main CPU firmware V1.40 and newer) and the legacy V1.0 command set (pre-V1.40), including control commands, feedback queries, and response string formats as documented in Rotel's "RC-1590 RS232 / IP ASCII Controller Command List" (spec version 2.00, July 16, 2019).

<!-- UNRESOLVED: no IP addressing details (DHCP/static, network config commands) beyond TCP port stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 9590
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (inferred from power_on!/power_off!/power_toggle! commands)
# - queryable    (inferred from power?, source?, volume?, get_* query commands)
# - levelable    (inferred from vol_nn!, bass/treble/balance set commands)
# - routable     (inferred from source selection commands cd!/coax1!/opt1!/etc.)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# All commands MUST be terminated with "!" (no spaces, no CR/LF after it).
# Commands marked (both) use the same ASCII string on all firmware revisions;
# only the feedback terminator differs ("$" on fw >= 1.40, "!" on older fw).

# --- POWER & VOLUME (V2.0, fw >= 1.40; power/mute strings identical on V1.0) ---
- id: power_on
  label: Power On (both revisions)
  kind: action
  command: "power_on!"
  params: []
- id: power_off
  label: Power Off (both revisions)
  kind: action
  command: "power_off!"
  params: []
- id: power_toggle
  label: Power Toggle (both revisions)
  kind: action
  command: "power_toggle!"
  params: []
- id: vol_up
  label: Volume Up (V2.0)
  kind: action
  command: "vol_up!"
  params: []
- id: vol_dwn
  label: Volume Down (V2.0)
  kind: action
  command: "vol_dwn!"
  params: []
- id: vol_min
  label: Set Volume to Min (V2.0)
  kind: action
  command: "vol_min!"
  params: []
- id: vol_set
  label: Set Volume to Level (V2.0)
  kind: action
  command: "vol_nn!"
  params:
    - name: level
      type: integer
      description: "Volume level nn, 01-96, two digits"
- id: mute_toggle
  label: Mute Toggle (both revisions)
  kind: action
  command: "mute!"
  params: []
- id: mute_on
  label: Mute On (both revisions)
  kind: action
  command: "mute_on!"
  params: []
- id: mute_off
  label: Mute Off (both revisions)
  kind: action
  command: "mute_off!"
  params: []

# --- POWER & VOLUME (V1.0 legacy, fw < 1.40) ---
- id: volume_up
  label: Volume Up (V1.0 legacy)
  kind: action
  command: "volume_up!"
  params: []
- id: volume_down
  label: Volume Down (V1.0 legacy)
  kind: action
  command: "volume_down!"
  params: []
- id: volume_min
  label: Set Volume to Min (V1.0 legacy)
  kind: action
  command: "volume_min!"
  params: []
- id: volume_set
  label: Set Volume to Level (V1.0 legacy)
  kind: action
  command: "volume_n!"
  params:
    - name: level
      type: integer
      description: "Volume level n, 1-96"
- id: volume_max
  label: Set Volume to Max (V1.0 legacy; removed in V2.0)
  kind: action
  command: "volume_max!"
  params: []

# --- SOURCE SELECTION (command strings shared by both revisions) ---
- id: source_cd
  label: Source CD (both revisions)
  kind: action
  command: "cd!"
  params: []
- id: source_coax1
  label: Source Coax 1 (both revisions)
  kind: action
  command: "coax1!"
  params: []
- id: source_coax2
  label: Source Coax 2 (both revisions)
  kind: action
  command: "coax2!"
  params: []
- id: source_coax3
  label: Source Coax 3 (both revisions)
  kind: action
  command: "coax3!"
  params: []
- id: source_opt1
  label: Source Optical 1 (both revisions)
  kind: action
  command: "opt1!"
  params: []
- id: source_opt2
  label: Source Optical 2 (both revisions)
  kind: action
  command: "opt2!"
  params: []
- id: source_opt3
  label: Source Optical 3 (both revisions)
  kind: action
  command: "opt3!"
  params: []
- id: source_aux
  label: Source Aux (both revisions)
  kind: action
  command: "aux!"
  params: []
- id: source_tuner
  label: Source Tuner (both revisions)
  kind: action
  command: "tuner!"
  params: []
- id: source_phono
  label: Source Phono (both revisions)
  kind: action
  command: "phono!"
  params: []
- id: source_usb
  label: Source Front USB (both revisions)
  kind: action
  command: "usb!"
  params: []
- id: source_bluetooth
  label: Source Bluetooth (both revisions)
  kind: action
  command: "bluetooth!"
  params: []
- id: source_bal_xlr
  label: Source XLR (both revisions)
  kind: action
  command: "bal_xlr!"
  params: []
- id: source_pcusb
  label: Source PC-USB (V2.0)
  kind: action
  command: "pcusb!"
  params: []
- id: source_pc_usb
  label: Source PC-USB (V1.0 legacy spelling)
  kind: action
  command: "pc_usb!"
  params: []
- id: source_rcd
  label: Source Rotel CD (V1.0 legacy; removed in V2.0)
  kind: action
  command: "rcd!"
  params: []

# --- SOURCE CONTROL / TRANSPORT ---
- id: play
  label: Play Source (both revisions)
  kind: action
  command: "play!"
  params: []
- id: stop
  label: Stop Source (both revisions)
  kind: action
  command: "stop!"
  params: []
- id: pause
  label: Pause Source (both revisions)
  kind: action
  command: "pause!"
  params: []
- id: trkf
  label: Track Forward / Tune Up (V2.0)
  kind: action
  command: "trkf!"
  params: []
- id: trkb
  label: Track Backward / Tune Down (V2.0)
  kind: action
  command: "trkb!"
  params: []
- id: track_fwd
  label: Track Forward / Tune Up (V1.0 legacy)
  kind: action
  command: "track_fwd!"
  params: []
- id: track_back
  label: Track Backward / Tune Down (V1.0 legacy)
  kind: action
  command: "track_back!"
  params: []
- id: fast_fwd
  label: Fast Forward / Search Forward (V1.0 legacy; removed in V2.0)
  kind: action
  command: "fast_fwd!"
  params: []
- id: fast_back
  label: Fast Backward / Search Backward (V1.0 legacy; removed in V2.0)
  kind: action
  command: "fast_back!"
  params: []

# --- MENU CONTROL (V1.0 legacy; removed in V2.0) ---
- id: menu
  label: Display the Menu (V1.0 legacy)
  kind: action
  command: "menu!"
  params: []
- id: exit
  label: Exit Key (V1.0 legacy)
  kind: action
  command: "exit!"
  params: []
- id: cursor_up
  label: Cursor Up (V1.0 legacy)
  kind: action
  command: "up!"
  params: []
- id: cursor_down
  label: Cursor Down (V1.0 legacy)
  kind: action
  command: "down!"
  params: []
- id: cursor_left
  label: Cursor Left (V1.0 legacy)
  kind: action
  command: "left!"
  params: []
- id: cursor_right
  label: Cursor Right (V1.0 legacy)
  kind: action
  command: "right!"
  params: []
- id: enter
  label: Enter Key (V1.0 legacy)
  kind: action
  command: "enter!"
  params: []

# --- NUMERIC KEY COMMANDS (V1.0 legacy; removed in V2.0) ---
- id: num_1
  label: Number Key 1 (V1.0 legacy)
  kind: action
  command: "1!"
  params: []
- id: num_2
  label: Number Key 2 (V1.0 legacy)
  kind: action
  command: "2!"
  params: []
- id: num_3
  label: Number Key 3 (V1.0 legacy)
  kind: action
  command: "3!"
  params: []
- id: num_4
  label: Number Key 4 (V1.0 legacy)
  kind: action
  command: "4!"
  params: []
- id: num_5
  label: Number Key 5 (V1.0 legacy)
  kind: action
  command: "5!"
  params: []
- id: num_6
  label: Number Key 6 (V1.0 legacy)
  kind: action
  command: "6!"
  params: []
- id: num_7
  label: Number Key 7 (V1.0 legacy)
  kind: action
  command: "7!"
  params: []
- id: num_8
  label: Number Key 8 (V1.0 legacy)
  kind: action
  command: "8!"
  params: []
- id: num_9
  label: Number Key 9 (V1.0 legacy)
  kind: action
  command: "9!"
  params: []
- id: num_0
  label: Number Key 0 (V1.0 legacy)
  kind: action
  command: "0!"
  params: []

# --- TONE CONTROL ---
- id: bypass_on
  label: Tone Bypass On (V2.0)
  kind: action
  command: "bypass_on!"
  params: []
- id: bypass_off
  label: Tone Bypass Off (V2.0)
  kind: action
  command: "bypass_off!"
  params: []
- id: tone_on
  label: Tone Controls On (V1.0 legacy)
  kind: action
  command: "tone_on!"
  params: []
- id: tone_off
  label: Tone Controls Off (V1.0 legacy)
  kind: action
  command: "tone_off!"
  params: []
- id: bass_up
  label: Bass Up (both revisions)
  kind: action
  command: "bass_up!"
  params: []
- id: bass_down
  label: Bass Down (both revisions)
  kind: action
  command: "bass_down!"
  params: []
- id: bass_set_neg10
  label: Set Bass to -10 (both revisions)
  kind: action
  command: "bass_-10!"
  params: []
- id: bass_set_000
  label: Set Bass to 0 (both revisions)
  kind: action
  command: "bass_000!"
  params: []
- id: bass_set_pos10
  label: Set Bass to +10 (both revisions)
  kind: action
  command: "bass_+10!"
  params: []
- id: treble_up
  label: Treble Up (both revisions)
  kind: action
  command: "treble_up!"
  params: []
- id: treble_down
  label: Treble Down (both revisions)
  kind: action
  command: "treble_down!"
  params: []
- id: treble_set_neg10
  label: Set Treble to -10 (both revisions)
  kind: action
  command: "treble_-10!"
  params: []
- id: treble_set_000
  label: Set Treble to 0 (both revisions)
  kind: action
  command: "treble_000!"
  params: []
- id: treble_set_pos10
  label: Set Treble to +10 (both revisions)
  kind: action
  command: "treble_+10!"
  params: []

# --- BALANCE CONTROL ---
- id: balance_r
  label: Balance Right (V2.0)
  kind: action
  command: "balance_r!"
  params: []
- id: balance_l
  label: Balance Left (V2.0)
  kind: action
  command: "balance_l!"
  params: []
- id: balance_right
  label: Balance Right (V1.0 legacy)
  kind: action
  command: "balance_right!"
  params: []
- id: balance_left
  label: Balance Left (V1.0 legacy)
  kind: action
  command: "balance_left!"
  params: []
- id: balance_set_l15
  label: Set Balance to Max Left (V2.0)
  kind: action
  command: "balance_l15!"
  params: []
- id: balance_set_r15
  label: Set Balance to Max Right (V2.0)
  kind: action
  command: "balance_r15!"
  params: []
- id: balance_set_L15
  label: Set Balance to Max Left (V1.0 legacy, uppercase)
  kind: action
  command: "balance_L15!"
  params: []
- id: balance_set_R15
  label: Set Balance to Max Right (V1.0 legacy, uppercase)
  kind: action
  command: "balance_R15!"
  params: []
- id: balance_set_000
  label: Set Balance to 0 (both revisions)
  kind: action
  command: "balance_000!"
  params: []

# --- DIMMER / PC-USB CLASS (command strings shared by both revisions) ---
- id: dimmer_toggle
  label: Toggle Display Dimmer (both revisions)
  kind: action
  command: "dimmer!"
  params: []
- id: dimmer_0
  label: Set Display Brightest (both revisions)
  kind: action
  command: "dimmer_0!"
  params: []
- id: dimmer_1
  label: Set Display Dimmer Level 1 (both revisions)
  kind: action
  command: "dimmer_1!"
  params: []
- id: dimmer_2
  label: Set Display Dimmer Level 2 (both revisions)
  kind: action
  command: "dimmer_2!"
  params: []
- id: dimmer_3
  label: Set Display Dimmer Level 3 (both revisions)
  kind: action
  command: "dimmer_3!"
  params: []
- id: dimmer_4
  label: Set Display Dimmer Level 4 (both revisions)
  kind: action
  command: "dimmer_4!"
  params: []
- id: dimmer_5
  label: Set Display Dimmer Level 5 (both revisions)
  kind: action
  command: "dimmer_5!"
  params: []
- id: dimmer_6
  label: Set Display Dimmest (both revisions)
  kind: action
  command: "dimmer_6!"
  params: []
- id: pcusb_class_1
  label: Set PC-USB Audio Class 1.0 (both revisions)
  kind: action
  command: "pcusb_class_1!"
  params: []
- id: pcusb_class_2
  label: Set PC-USB Audio Class 2.0 (both revisions)
  kind: action
  command: "pcusb_class_2!"
  params: []

# --- POWER MODE (V1.0 legacy; removed in V2.0) ---
- id: power_mode_quick
  label: Set Power Mode Quick (V1.0 legacy)
  kind: action
  command: "power_mode_quick!"
  params: []
- id: power_mode_normal
  label: Set Power Mode Normal (V1.0 legacy)
  kind: action
  command: "power_mode_normal!"
  params: []

# --- SYSTEM / UPDATE MODE ---
- id: rs232_update_on
  label: Set RS232 Update Auto On (V2.0)
  kind: action
  command: "rs232_update_on!"
  params: []
- id: rs232_update_off
  label: Set RS232 Update Manual Off (V2.0)
  kind: action
  command: "rs232_update_off!"
  params: []
- id: display_update_auto
  label: Set Display Update Auto (V1.0 legacy)
  kind: action
  command: "display_update_auto!"
  params: []
- id: display_update_manual
  label: Set Display Update Manual (V1.0 legacy)
  kind: action
  command: "display_update_manual!"
  params: []
- id: factory_default
  label: Reset Unit to Factory Defaults (V1.0 legacy)
  kind: action
  command: "factory_default_on!"
  params: []

# --- FEEDBACK QUERIES (V2.0, fw >= 1.40) ---
- id: q_power
  label: Power Status Query (V2.0)
  kind: query
  command: "power?"
  params: []
- id: q_source
  label: Current Source Query (V2.0)
  kind: query
  command: "source?"
  params: []
- id: q_volume
  label: Current Volume Query (V2.0)
  kind: query
  command: "volume?"
  params: []
- id: q_mute
  label: Mute Status Query (V2.0)
  kind: query
  command: "mute?"
  params: []
- id: q_bypass
  label: Tone Bypass State Query (V2.0)
  kind: query
  command: "bypass?"
  params: []
- id: q_bass
  label: Bass Level Query (V2.0)
  kind: query
  command: "bass?"
  params: []
- id: q_treble
  label: Treble Level Query (V2.0)
  kind: query
  command: "treble?"
  params: []
- id: q_balance
  label: Balance Setting Query (V2.0)
  kind: query
  command: "balance?"
  params: []
- id: q_freq
  label: Digital Input Frequency Query (V2.0)
  kind: query
  command: "freq?"
  params: []
- id: q_dimmer
  label: Dimmer Level Query (V2.0)
  kind: query
  command: "dimmer?"
  params: []
- id: q_pcusb
  label: PC-USB Class Query (V2.0)
  kind: query
  command: "pcusb?"
  params: []
- id: q_version
  label: Main CPU Software Version Query (V2.0)
  kind: query
  command: "version?"
  params: []
- id: q_pc_version
  label: PC-USB Software Version Query (V2.0)
  kind: query
  command: "pc_version?"
  params: []
- id: q_ip
  label: IP Address Query (V2.0)
  kind: query
  command: "ip?"
  params: []
- id: q_mac
  label: MAC Address Query (V2.0)
  kind: query
  command: "mac?"
  params: []
- id: q_model
  label: Model Number Query (V2.0)
  kind: query
  command: "model?"
  params: []
- id: q_discover
  label: Network Identify / Discovery Query (V2.0)
  kind: query
  command: "discover?"
  params: []

# --- FEEDBACK QUERIES (V1.0 legacy, fw < 1.40) ---
- id: q_get_current_power
  label: Power Status Query (V1.0 legacy)
  kind: query
  command: "get_current_power!"
  params: []
- id: q_get_current_source
  label: Current Source Query (V1.0 legacy)
  kind: query
  command: "get_current_source!"
  params: []
- id: q_get_volume
  label: Current Volume Query (V1.0 legacy)
  kind: query
  command: "get_volume!"
  params: []
- id: q_get_volume_max
  label: Max Volume Query (V1.0 legacy)
  kind: query
  command: "get_volume_max!"
  params: []
- id: q_get_volume_min
  label: Min Volume Query (V1.0 legacy)
  kind: query
  command: "get_volume_min!"
  params: []
- id: q_get_mute_status
  label: Mute Status Query (V1.0 legacy)
  kind: query
  command: "get_mute_status!"
  params: []
- id: q_get_tone
  label: Tone Control State Query (V1.0 legacy)
  kind: query
  command: "get_tone!"
  params: []
- id: q_get_tone_max
  label: Max Tone Value Query (V1.0 legacy)
  kind: query
  command: "get_tone_max!"
  params: []
- id: q_get_bass
  label: Bass Level Query (V1.0 legacy)
  kind: query
  command: "get_bass!"
  params: []
- id: q_get_treble
  label: Treble Level Query (V1.0 legacy)
  kind: query
  command: "get_treble!"
  params: []
- id: q_get_balance
  label: Balance Setting Query (V1.0 legacy)
  kind: query
  command: "get_balance!"
  params: []
- id: q_get_current_freq
  label: Digital Input Frequency Query (V1.0 legacy)
  kind: query
  command: "get_current_freq!"
  params: []
- id: q_get_current_dimmer
  label: Dimmer Level Query (V1.0 legacy; listed in Appendix A)
  kind: query
  command: "get_current_dimmer!"
  params: []
- id: q_get_pcusb_class
  label: PC-USB Class Query (V1.0 legacy)
  kind: query
  command: "get_pcusb_class!"
  params: []
- id: q_get_power_mode
  label: Power Mode Query (V1.0 legacy)
  kind: query
  command: "get_power_mode!"
  params: []
- id: q_get_display
  label: Request Entire Display (V1.0 legacy)
  kind: query
  command: "get_display!"
  params: []
- id: q_get_display1
  label: Request Display Line 1 (V1.0 legacy)
  kind: query
  command: "get_display1!"
  params: []
- id: q_get_display2
  label: Request Display Line 2 (V1.0 legacy)
  kind: query
  command: "get_display2!"
  params: []
- id: q_get_display_size
  label: Request Display Size (V1.0 legacy; requires main software V1.2.9 or later)
  kind: query
  command: "get_display_size!"
  params: []
- id: q_get_display_update
  label: Request Display Update Mode (V1.0 legacy; requires main software V1.2.9 or later)
  kind: query
  command: "get_display_update!"
  params: []
- id: q_get_product_type
  label: Request Product Type (V1.0 legacy)
  kind: query
  command: "get_product_type!"
  params: []
- id: q_get_product_version
  label: Request Main CPU Software Version (V1.0 legacy)
  kind: query
  command: "get_product_version!"
  params: []
```

## Feedbacks
```yaml
# Response terminator: "$" on fw >= 1.40 (V2.0), "!" on fw < 1.40 (V1.0).
# Variable-length display text uses a length prefix + "," instead of a terminator.
- id: power_state
  type: enum
  values: [on, standby]
  format: "power=on$ / power=standby$"
- id: volume_level
  type: integer
  range: "00-96, two digits"
  format: "volume=##$"
- id: mute_state
  type: enum
  values: [on, off]
  format: "mute=on$ / mute=off$"
- id: source
  type: enum
  values: [cd, coax1, coax2, coax3, opt1, opt2, opt3, tuner, phono, usb, aux, pc_usb, bal_xlr, bluetooth]
  format: "source=cd$ etc."
  notes: "If an input is set as the Rotel Link RCD input, its response string gains a _cd suffix (e.g. source=coax1_cd$)"
- id: tone_bypass_state
  type: enum
  values: [on, off]
  format: "bypass=on$ / bypass=off$"
- id: tone_state_legacy
  type: enum
  values: [on, off]
  format: "tone=on! / tone=off!"
  notes: "V1.0 legacy only"
- id: bass_level
  type: string
  values: ["+01..+10", "-01..-10", "000"]
  format: "bass=###$"
- id: treble_level
  type: string
  values: ["+01..+10", "-01..-10", "000"]
  format: "treble=###$"
- id: balance_setting
  type: string
  values: ["L01-15", "R01-15", "000"]
  format: "balance=###$"
- id: sample_rate
  type: enum
  values: [off, "32", "44.1", "48", "88.2", "96", "176.4", "192", "384"]
  format: "freq=44.1$"
  notes: "384 listed in V2.0 only; V1.0 list ends at 192"
- id: dimmer_level
  type: integer
  range: "0-6"
  format: "dimmer=#$"
- id: pcusb_class
  type: enum
  values: ["1", "2"]
  format: "pcusb_class=1$ / pcusb_class=2$"
- id: update_mode
  type: enum
  values: [auto, manual]
  format: "update_mode=auto$ / update_mode=manual$"
  notes: "V2.0; V1.0 legacy equivalent display_update=auto!/display_update=manual!"
- id: main_cpu_version
  type: string
  format: "version=#.##$"
  notes: "V1.0 legacy equivalent product_version=##,text"
- id: pcusb_version
  type: string
  format: "pc_version=#.##$"
- id: ip_address
  type: string
  format: "ipaddress=###.###.###.###$"
- id: mac_address
  type: string
  format: "mac=############$"
  notes: "Uppercase characters"
- id: model_name
  type: string
  format: "model=text$"
  notes: "V1.0 legacy equivalent product_type=##,text"
- id: discover_info
  type: string
  format: "discover=ip=###.###.###.### port=#### mac=############$"
- id: display_text_legacy
  type: string
  format: "display=###,text"
  notes: "V1.0 legacy; 3-digit byte count (text only, excludes length and ',') then ',' then text, no terminator"
- id: display_line1_legacy
  type: string
  format: "display1=##,text"
  notes: "V1.0 legacy; 2-digit byte count + ',' + text, no terminator"
- id: display_line2_legacy
  type: string
  format: "display2=##,text"
  notes: "V1.0 legacy; 2-digit byte count + ',' + text, no terminator"
- id: display_size_legacy
  type: string
  format: "display_size=##,##!"
  notes: "V1.0 legacy; columns and rows"
- id: volume_max_legacy
  type: integer
  format: "volume_max=##!"
  notes: "V1.0 legacy"
- id: volume_min_legacy
  type: integer
  format: "volume_min=0!"
  notes: "V1.0 legacy"
- id: tone_max_legacy
  type: integer
  format: "tone_max=10!"
  notes: "V1.0 legacy"
- id: power_mode_legacy
  type: enum
  values: [quick, normal]
  format: "power_mode=quick! / power_mode=normal!"
  notes: "V1.0 legacy"
```

## Variables
```yaml
# All settable parameters (volume, bass, treble, balance, dimmer, PC-USB class)
# are expressed as discrete or parameterized actions in the Actions section;
# no additional settable variables documented in source.
```

## Events
```yaml
- id: automatic_status_update
  description: >-
    Unsolicited status strings sent automatically on state change when update
    mode is auto (rs232_update_on! / display_update_auto!). Basic status such
    as volume, power, or source changes is always provided automatically;
    display/metadata updates depend on auto vs manual display update mode.
  format: "volume=##$ / power=on$ / source=cd$ / mute=on$ etc."
- id: display_update_legacy
  description: >-
    V1.0 legacy: in display_update_auto mode, each display change causes the
    new display line(s) to be sent automatically (length-prefixed text format).
  format: "display=###,text / display1=##,text / display2=##,text"
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Note: factory_default_on! (V1.0 legacy)
# resets the unit to factory defaults; source attaches no warning to it.
```

## Notes
- All commands must be terminated with the "!" character. Do not include spaces, carriage returns, or line feeds — only the terminating "!".
- Feedback strings terminate with "$" on firmware V1.40+ (protocol V2.0) and "!" on older firmware (protocol V1.0). Variable-length display text uses a decimal byte count (covering text data only, not the length digits or the "," separator) followed by "," and the text, with no terminating character. The control application must parse all three forms.
- RS-232 hardware does not support flow control; care must be taken when sending/receiving to avoid packet loss. Serial settings: 115200 baud, 8 data bits, no parity, 1 stop bit, no handshaking, string data type.
- IP control: commands accepted via TCP port 9590; responses return on the same port. Command/response format identical to serial.
- Protocol revision break: as of main CPU software V1.40, several commands and ALL feedback strings changed (see spec Sections 3, 4, Appendix A). Connected control systems must be updated to the new protocol before updating RC-1590 firmware. RS-232 settings and IP port are unchanged between V1.0 and V2.0.
- Rotel Link RCD: the input selected for ROTEL LINK RCD in the setup menu returns a `_cd`-suffixed source string (e.g. `source=coax1_cd$` instead of `source=coax1$`).
- PC-USB transport controls (play/pause/track) only function when the RC-1590 is set to USB 2.0 mode (`pcusb_class_2!`).
- Special character mapping (spec Section 5): some display characters are represented as 2–3 hex byte sequences in feedback (e.g. EE 82 85, EE 82 82 for play/arrow symbols, EE 80 80 EE 80 81 EE 80 82 for END). Parse display text accordingly.
- Volume scale is 1–96 (corrected in spec v1.11 from an earlier 1–86).
<!-- UNRESOLVED: no IP network configuration commands (DHCP/static assignment) documented in source -->
<!-- UNRESOLVED: command acknowledgement/error behavior for invalid commands not documented in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1590%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1580%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - "https://www.rotel.com/sites/default/files/product/rs232/RC1572%20Protocol.pdf"
retrieved_at: 2026-09-02T14:51:19.560Z
last_checked_at: 2026-09-18T22:18:38.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-18T22:18:38.927Z
matched_actions: 136
action_count: 136
confidence: medium
summary: "All 136 spec action units (power/volume/source/tone/balance/dimmer/transport/menu/numeric/system V2.0 + V1.0 legacy and feedback queries) appear verbatim as ASCII tokens in the refined Rotel RC-1590 command list; transport (115200 8N1, TCP 9590) matches the Connection/IP Control Settings tables. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no IP addressing details (DHCP/static, network config commands) beyond TCP port stated in source"
- "source contains no safety warnings, interlock procedures, or"
- "no IP network configuration commands (DHCP/static assignment) documented in source"
- "command acknowledgement/error behavior for invalid commands not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
