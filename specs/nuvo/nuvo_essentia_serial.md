---
spec_id: admin/nuvo-essentia-e6g
schema_version: ai4av-public-spec-v1
revision: 1
title: "Nuvo Essentia E6G Control Spec"
manufacturer: Nuvo
model_family: "Essentia E6G"
aliases: []
compatible_with:
  manufacturers:
    - Nuvo
  models:
    - "Essentia E6G"
    - NV-E6G
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - smarthomebus.com
  - manualslib.com
source_urls:
  - "https://smarthomebus.com/dealers/Protocols/NUVO%20Protocol.pdf"
  - https://www.manualslib.com/manual/113590/Nuvo-Essentia-Nv-E6dxs.html
retrieved_at: 2026-06-03T11:15:57.446Z
last_checked_at: 2026-06-04T06:28:49.480Z
generated_at: 2026-06-04T06:28:49.480Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "documentation also covers the Grand Concerto (NV-I8G); only Essentia E6G-specific fields are emitted here, but many commands are shared"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "protocol revision/version number not stated in source (only document revision \"0.7\" dated 4/15/2008). Product model number listed in source example as \"NV-E6G\"; treated here as an alias of \"Essentia E6G\"."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:28:49.480Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec commands have literal matches in the source with correct wire tokens, all transport parameters verified, source command catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Nuvo Essentia E6G Control Spec

## Summary
RS-232C serial control protocol for the Nuvo Essentia E6G multi-zone audio system (6 physical zones, up to 12 with expander, plus logical zones 15-20). Source covers the full command/response set: system commands, source commands, zone commands, zone and source configuration, group commands, and menu navigation. Protocol uses ASCII command/response strings over a DB9 RS-232 port at 57600 baud, no parity, 1 stop bit.

<!-- UNRESOLVED: documentation also covers the Grand Concerto (NV-I8G); only Essentia E6G-specific fields are emitted here, but many commands are shared -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from ZzON / ZzOFF / ZzPOWER / *ALLOFF commands
- routable        # inferred from ZzSRCx / ZzSRC+ source-select commands
- queryable       # inferred from ZzSTATUS? and other ?-suffixed query commands
- levelable       # inferred from ZzVOLx / ZzVOL+ / ZzVOL- volume and EQ commands
```

## Actions
```yaml
# All commands are ASCII, prefixed with '*', terminated with <CR>.
# Numeric/zone/source parameters are shown as {placeholders} with the source-stated range.

# --- 6.0 System commands ---

- id: request_version
  label: Request Version
  kind: query
  command: "*VER"
  params: []

- id: set_mute_all
  label: Set Mute (all active zones)
  kind: action
  command: "*MUTE{x}"
  params:
    - name: x
      type: integer
      description: "0=Mute OFF, 1=Mute ON"

- id: send_message_all_zones
  label: Send All Zones a Message
  kind: action
  command: "*MSG\"{x}\""
  params:
    - name: x
      type: string
      description: "Text message up to 50 characters"

- id: all_off
  label: Turn All Zones Off
  kind: action
  command: "*ALLOFF"
  params: []

- id: set_page
  label: Set Page
  kind: action
  command: "*PAGE{x}"
  params:
    - name: x
      type: integer
      description: "0=Page OFF, 1=Page ON"

- id: configure_security_code
  label: Configure the Security Code
  kind: action
  command: "*CFGSCODE\"{xxxx}\""
  params:
    - name: xxxx
      type: string
      description: "Exactly 4 numeric digits, e.g. \"1234\""

- id: configure_external_mute
  label: Configure the External Mute
  kind: action
  command: "*CFGEXTMUTE{x},{y}"
  params:
    - name: x
      type: integer
      description: "0=External mute OFF, 1=External mute ON"
    - name: y
      type: integer
      description: "0=Active LO (<0.5V or contact closure), 1=Active HI (>2V or open)"

- id: configure_time
  label: Configure Time
  kind: action
  command: "*CFGTIME{y},{m},{d},{h},{n}"
  params:
    - name: y
      type: integer
      description: "Year, format yyyy (e.g. 2007)"
    - name: m
      type: integer
      description: "Month, 01-12"
    - name: d
      type: integer
      description: "Day, 01-31"
    - name: h
      type: integer
      description: "Hours, 00-23"
    - name: n
      type: integer
      description: "Minutes, 00-59"
  notes: "Essentia E6G has no real time clock - returns #? error"

- id: configure_time_display_mode
  label: Configure Time Display Mode
  kind: action
  command: "*CFGTIMEMODE{x}"
  params:
    - name: x
      type: integer
      description: "0=12-hour display, 1=24-hour display"
  notes: "Essentia E6G has no real time clock - returns #? error"

- id: configure_serial_line_delay
  label: Configure Serial Line Delay
  kind: action
  command: "*CFGSDELAY{ms}"
  params:
    - name: ms
      type: integer
      description: "Line delay in ms; valid: 0,1,2,3,5,10,15,20,25,30,40,50,60,70,80,90,100. Other values rounded down."

- id: configure_power_off_mode
  label: Configure Power Off Mode
  kind: action
  command: "*CFGPWROFF{x}"
  params:
    - name: x
      type: integer
      description: "0=Tap power for zone mute; 1=Tap power for zone off; 2=Tap power for zone off, hold for all-off"

# --- 7.0 Source commands ---

- id: source_set_display_line
  label: Set a Source's Display Line Information
  kind: action
  command: "*S{s}DISPLINE{x}\"{y}\""
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: x
      type: integer
      description: "Line number 1-4"
    - name: y
      type: string
      description: "Line of text to display"
  notes: "Non-NuVoNet sources only"

- id: source_request_display_lines
  label: Request a Source's Display Line Information
  kind: query
  command: "*S{s}DISPLINE?"
  params:
    - name: s
      type: integer
      description: "Source 1-6"

- id: source_set_display_track_status
  label: Set a Source's Display Track Status
  kind: action
  command: "*S{s}DISPINFO,{x},{y},{z}"
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: x
      type: integer
      description: "Song length in 10ths of seconds"
    - name: y
      type: integer
      description: "Current stream time in 10ths of seconds"
    - name: z
      type: integer
      description: "0=Normal, 1=Idle, 2=Playing, 3=Paused, 4=FF, 5=Rewind, 6=Shuffle, 7=Repeat, 8=Shuffle Repeat"
  notes: "Non-NuVoNet sources only"

- id: source_request_display_track_status
  label: Request a Source's Display Track Status
  kind: query
  command: "*S{s}DISPINFO?"
  params:
    - name: s
      type: integer
      description: "Source 1-6"

- id: source_execute_ir_control_macro
  label: Execute an IR Control Macro for a Source
  kind: action
  command: "*S{s}IRCTL{y}"
  params:
    - name: s
      type: integer
      description: "Source 1-20"
    - name: y
      type: integer
      description: "Control macro number"

- id: source_execute_ir_preset_macro
  label: Execute an IR Preset Macro for a Source
  kind: action
  command: "*S{s}IRPRE{y}"
  params:
    - name: s
      type: integer
      description: "Source 1-20"
    - name: y
      type: integer
      description: "Preset macro number"

- id: source_send_message
  label: Send a Message to a Source
  kind: action
  command: "*S{s}MSG\"{x}\",{a},{b}"
  params:
    - name: s
      type: integer
      description: "Source 1-20"
    - name: x
      type: string
      description: "Text message, 20 chars max"
    - name: a
      type: integer
      description: "0=Information, 1=Warning, 2=Error, 3=Flash"
    - name: b
      type: integer
      description: "0=Normal dwell, 1=Short dwell, 2=Long dwell"

- id: source_is_active
  label: Is a NuVoNet Source Using this Address?
  kind: query
  command: "*S{s}ACTIVE?"
  params:
    - name: s
      type: integer
      description: "Source 1-6"

- id: source_get_name
  label: Get the Current Name of a Source
  kind: query
  command: "*S{s}NAME?"
  params:
    - name: s
      type: integer
      description: "Source 1-6"

- id: source_set_name
  label: Set the Name of a Source
  kind: action
  command: "*S{s}NAME\"{x}\""
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: x
      type: string
      description: "Text name, 20 chars max"
  notes: "Volatile override of configured name"

# --- 8.0 Source Configuration ---

- id: source_request_config
  label: Request the Source's Configuration Status
  kind: query
  command: "*SCFG{s}STATUS?"
  params:
    - name: s
      type: integer
      description: "Source 1-6"

- id: source_set_enable
  label: Set the Source Enable
  kind: action
  command: "*SCFG{s}ENABLE{x}"
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: x
      type: integer
      description: "0=Disable, 1=Enable"

- id: source_set_name_config
  label: Set the Source Name (config)
  kind: action
  command: "*SCFG{s}NAME\"{x}\""
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: x
      type: string
      description: "Text name, 20 chars max"

- id: source_set_gain
  label: Set the Source Gain
  kind: action
  command: "*SCFG{s}GAIN{x}"
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: x
      type: integer
      description: "Gain 0-14"

- id: source_set_nuvonet
  label: Set the NuVoNet Source
  kind: action
  command: "*SCFG{s}NUVONET{x}"
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: x
      type: integer
      description: "0=Not NuVoNet, 1=NuVoNet"

- id: source_set_short_name
  label: Set the Source's Short Name
  kind: action
  command: "*SCFG{s}SHORTNAME\"{xyz}\""
  params:
    - name: s
      type: integer
      description: "Source 1-6"
    - name: xyz
      type: string
      description: "Three-character short name"

# --- 9.0 Zone commands ---

- id: zone_request_status
  label: Request the Zone's Status
  kind: query
  command: "*Z{z}STATUS?"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_power_toggle
  label: Toggle Zone Power
  kind: action
  command: "*Z{z}POWER"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_on
  label: Turn Zone ON
  kind: action
  command: "*Z{z}ON"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_off
  label: Turn Zone OFF
  kind: action
  command: "*Z{z}OFF"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_set_source
  label: Set the Zone's Source
  kind: action
  command: "*Z{z}SRC{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Source 1-6"

- id: zone_source_next
  label: Switch Zone to Next Available Source
  kind: action
  command: "*Z{z}SRC+"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_set_volume
  label: Set the Zone's Volume
  kind: action
  command: "*Z{z}VOL{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Volume 0=Max to 79=Min (or MUTE)"

- id: zone_volume_up
  label: Increment Zone Volume
  kind: action
  command: "*Z{z}VOL+"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_volume_down
  label: Decrement Zone Volume
  kind: action
  command: "*Z{z}VOL-"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_mute_toggle
  label: Toggle Zone Mute
  kind: action
  command: "*Z{z}MUTE"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_mute_on
  label: Turn Zone Mute ON
  kind: action
  command: "*Z{z}MUTEON"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_mute_off
  label: Turn Zone Mute OFF
  kind: action
  command: "*Z{z}MUTEOFF"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_play_pause_simulate
  label: Simulate Zone PLAY/PAUSE Button Press
  kind: action
  command: "*Z{z}PLAYPAUSE"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_prev_simulate
  label: Simulate Zone PREV Button Press
  kind: action
  command: "*Z{z}PREV"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_next_simulate
  label: Simulate Zone NEXT Button Press
  kind: action
  command: "*Z{z}NEXT"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_dnd_toggle
  label: Toggle Zone DND
  kind: action
  command: "*Z{z}DND"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_dnd_on
  label: Turn Zone DND ON
  kind: action
  command: "*Z{z}DNDON"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_dnd_off
  label: Turn Zone DND OFF
  kind: action
  command: "*Z{z}DNDOFF"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_party_host
  label: Set Party Host ON/OFF
  kind: action
  command: "*Z{z}PARTY{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Release party host, 1=Make this zone the party host"

- id: zone_lock_on
  label: Turn Zone Lock ON
  kind: action
  command: "*Z{z}LOCKON"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_lock_off
  label: Turn Zone Lock OFF (with security code)
  kind: action
  command: "*Z{z}LOCKOFF\"{xxxx}\""
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: xxxx
      type: string
      description: "4-digit security code"

- id: zone_execute_ir_control_macro
  label: Execute an IR Control Macro for a Zone's Source
  kind: action
  command: "*Z{z}IRCTL{y}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: y
      type: integer
      description: "Control macro number"

- id: zone_execute_ir_preset_macro
  label: Execute an IR Preset Macro for a Zone's Source
  kind: action
  command: "*Z{z}IRPRE{y}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: y
      type: integer
      description: "Preset macro number"

- id: zone_send_message
  label: Send a Message to a Zone
  kind: action
  command: "*Z{z}MSG\"{x}\",{a},{b}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: string
      description: "Text message, 50 chars max"
    - name: a
      type: integer
      description: "0=Information, 1=Warning, 2=Error, 3=Flash"
    - name: b
      type: integer
      description: "0=Normal dwell, 1=Short dwell, 2=Long dwell"

- id: zone_is_active
  label: Is a Control Pad Using this Zone Address?
  kind: query
  command: "*Z{z}ACTIVE?"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zone_simulate_button_press
  label: Simulate Control Pad Button Press
  kind: action
  command: "*Z{z}BUTTON{b},{action},{menuid},{itemid},{itemindex}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: b
      type: integer
      description: "1=OK, 2=PLAYPAUSE, 3=PREV, 4=NEXT, 5=POWERMUTE, 7=UP, 8=DOWN"
    - name: action
      type: integer
      description: "0=DOWNUP, 1=DOWN (must follow with UP), 2=UP (no menu active)"
    - name: menuid
      type: integer
      description: "ID of active menu"
    - name: itemid
      type: integer
      description: "ID of selected menu item"
    - name: itemindex
      type: integer
      description: "Index of selected menu item"

- id: zone_select_favorite
  label: Select a Favorite
  kind: action
  command: "*Z{z}FAV{f}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: f
      type: integer
      description: "Favorite number 1-12"

- id: zone_redirect_to_serial
  label: Redirect Zone Communication to Serial Port
  kind: action
  command: "*Z{z}SERIAL{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Do not redirect, 1=Redirect to serial port"
  notes: "Required for menu browsing. Fails if zone is disabled or a ControlPad is already using the address."

- id: zone_request_menu
  label: Request a Menu
  kind: action
  command: "*Z{z}MENUREQ,{menuid},{up},{location},{itemindex}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: menuid
      type: integer
      description: "Menu id; 0xFFFFFFFF requests main menu"
    - name: up
      type: integer
      description: "0=ignore, 1=request parent menu and ignore rest"
    - name: location
      type: integer
      description: "0=from first, 1=ending with last, 2=from itemindex, 3=ending with itemindex"
    - name: itemindex
      type: integer
      description: "Base index for location=2 or 3"

- id: zone_keep_menu_active
  label: Keep Menu Active or Exit Menu
  kind: action
  command: "*Z{z}MENUACTIVE,{menuid},{exit}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: menuid
      type: integer
      description: "Currently active menu id"
    - name: exit
      type: integer
      description: "0=keep active, 1=exit menu"

# --- 10.0 Zone Configuration ---

- id: zonecfg_request_status
  label: Request Zone Configuration Status
  kind: query
  command: "*ZCFG{z}STATUS?"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zonecfg_set_enable
  label: Set Zone Enable
  kind: action
  command: "*ZCFG{z}ENABLE{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Disable, 1=Enable"

- id: zonecfg_set_name
  label: Set Zone Name
  kind: action
  command: "*ZCFG{z}NAME\"{x}\""
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: string
      description: "Text name, 20 chars max"

- id: zonecfg_slave_to
  label: Slave a Zone to Another Zone
  kind: action
  command: "*ZCFG{z}SLAVETO{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Zone to slave to (1-16) or 0=None"

- id: zonecfg_group
  label: Join a Zone to a Group
  kind: action
  command: "*ZCFG{z}GROUP{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Group 1-4 or 0=None"

- id: zonecfg_sources
  label: Enable Sources a Zone Can Select
  kind: action
  command: "*ZCFG{z}SOURCES{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Bitmask of allowed sources 0-63"

- id: zonecfg_xsrc
  label: Set Exclusive Source for a Zone
  kind: action
  command: "*ZCFG{z}XSRC{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Not Exclusive, 1=Exclusive"

- id: zonecfg_ir
  label: Set Zone IR State
  kind: action
  command: "*ZCFG{z}IR{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Enabled, 1=Pass Thru Disabled, 2=All Disabled"

- id: zonecfg_dnd
  label: Set Zone DND
  kind: action
  command: "*ZCFG{z}DND{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Bitmask 0x01=NoMute, 0x02=NoPage, 0x04=NoParty"

- id: zonecfg_locked
  label: Set Zone Lock
  kind: action
  command: "*ZCFG{z}LOCKED{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Lock Off, 1=Lock On"

- id: zonecfg_request_eq
  label: Request Zone EQ Configuration
  kind: query
  command: "*ZCFG{z}EQ?"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zonecfg_set_bass
  label: Set Zone Bass Level
  kind: action
  command: "*ZCFG{z}BASS{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Bass -18 to +18, increments of 2"

- id: zonecfg_set_treble
  label: Set Zone Treble Level
  kind: action
  command: "*ZCFG{z}TREB{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Treble -18 to +18, increments of 2"

- id: zonecfg_set_bal_right
  label: Set Zone Right Balance
  kind: action
  command: "*ZCFG{z}BALR{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0 to 18, increments of 2"

- id: zonecfg_set_bal_center
  label: Set Zone Balance to Center
  kind: action
  command: "*ZCFG{z}BALC"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zonecfg_set_bal_left
  label: Set Zone Left Balance
  kind: action
  command: "*ZCFG{z}BALL{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0 to 18, increments of 2"

- id: zonecfg_set_loudcmp
  label: Set Zone Loudness Compensation
  kind: action
  command: "*ZCFG{z}LOUDCMP{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Off, 1=On"

- id: zonecfg_request_volume
  label: Request Zone Volume Configuration
  kind: query
  command: "*ZCFG{z}VOL?"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zonecfg_set_maxvol
  label: Set Zone Maximum Volume Level
  kind: action
  command: "*ZCFG{z}MAXVOL{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Max level 0=Max to 79=Min"

- id: zonecfg_set_inivol
  label: Set Zone Initial Power-On Volume
  kind: action
  command: "*ZCFG{z}INIVOL{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Initial level 0=Max to 79=Min"

- id: zonecfg_set_pagevol
  label: Set Zone Paging Volume
  kind: action
  command: "*ZCFG{z}PAGEVOL{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Page volume 0=Max to 79=Min"

- id: zonecfg_set_partyvol
  label: Set Zone Party Volume
  kind: action
  command: "*ZCFG{z}PARTYVOL{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Party volume 0=Max to 79=Min"

- id: zonecfg_set_volrst
  label: Reset Zone Volume on Power On
  kind: action
  command: "*ZCFG{z}VOLRST{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Don't reset, 1=Reset to INIVOL"

- id: zonecfg_request_disp
  label: Request Zone Display Configuration
  kind: query
  command: "*ZCFG{z}DISP?"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"

- id: zonecfg_set_bright
  label: Set Zone Brightness Level
  kind: action
  command: "*ZCFG{z}BRIGHT{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "Brightness 1-7"

- id: zonecfg_set_autodim
  label: Set Zone Auto Dim Delay
  kind: action
  command: "*ZCFG{z}AUTODIM{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Disabled, 1=15s, 2=30s, 3=1m, 4=2m, 5=5m, 6=10m, 7=30m, 8=1h"

- id: zonecfg_set_dim
  label: Set Zone Dim Mode
  kind: action
  command: "*ZCFG{z}DIM{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Off, 1=Low, 2=Medium, 3=High"

- id: zonecfg_set_dispmode
  label: Set Zone Display Mode (not active)
  kind: action
  command: "*ZCFG{z}DISPMODE{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0 (not currently used)"

- id: zonecfg_set_time
  label: Set Zone Display Time
  kind: action
  command: "*ZCFG{z}TIME{x}"
  params:
    - name: z
      type: integer
      description: "Zone 1-20"
    - name: x
      type: integer
      description: "0=Don't display time, 1=Display time"

# --- 11.0 Group commands ---

- id: group_off
  label: Turn All Group Zones Off
  kind: action
  command: "*G{x}OFF"
  params:
    - name: x
      type: integer
      description: "Group 0-3 (i.e. group 1, 2, 3, or 4)"

- id: group_send_message
  label: Send a Message to a Group
  kind: action
  command: "*G{g}MSG\"{x}\",{a},{b}"
  params:
    - name: g
      type: integer
      description: "Group 1-4"
    - name: x
      type: string
      description: "Text message, 20 chars max"
    - name: a
      type: integer
      description: "0=Information, 1=Warning, 2=Error, 3=Flash"
    - name: b
      type: integer
      description: "0=Normal dwell, 1=Short dwell, 2=Long dwell"
```

## Feedbacks
```yaml
- id: version
  type: string
  description: 'Response: #VER"NV-E6G FWv0.91 HWv0"'

- id: mute_state
  type: enum
  values: [mute_off, mute_on]
  description: 'Response: #MUTEx (0=OFF, 1=ON)'

- id: alloff
  type: flag
  description: 'Response: #ALLOFF - all zones turned off'

- id: page_state
  type: enum
  values: [page_off, page_on]
  description: 'Response: #PAGEx (0=OFF, 1=ON)'

- id: zone_status
  type: object
  description: 'Response: #Zx,ON|OFF,SRCx,VOLx,DNDx,LOCKx - unsolicited on any state change; see section 5.2'
  fields:
    - name: power
      type: enum
      values: [on, off]
    - name: source
      type: integer
      description: "1-6"
    - name: volume
      type: integer
      description: "0=Max to 79=Min or MUTE"
    - name: dnd
      type: enum
      values: [off, on]
    - name: lock
      type: enum
      values: [unlocked, locked]

- id: source_display_info
  type: object
  description: 'Response: #SsDISPINFO,DURATIONx,POSITIONy,STATUSz - see section 5.1'
  fields:
    - name: source
      type: integer
      description: "1-6"
    - name: duration
      type: integer
      description: "Song length in 10ths of seconds"
    - name: position
      type: integer
      description: "Current position in 10ths of seconds"
    - name: status
      type: enum
      values: [normal, idle, playing, paused, fast_forward, rewind, shuffle, repeat, shuffle_repeat]

- id: source_display_line
  type: object
  description: 'Response: #SsDISPLINEx,"y" - see section 5.3'
  fields:
    - name: source
      type: integer
      description: "1-6"
    - name: line
      type: integer
      description: "1-4"
    - name: text
      type: string

- id: source_active
  type: object
  description: 'Response: #SsACTIVEx (0=NOT active, 1=active)'
  fields:
    - name: source
      type: integer
      description: "1-6"
    - name: active
      type: enum
      values: [inactive, active]

- id: source_name
  type: object
  description: 'Response: #SsNAME"x" (20 char max)'
  fields:
    - name: source
      type: integer
      description: "1-6"
    - name: name
      type: string

- id: source_config
  type: object
  description: 'Response: #SCFGx,ENABLEx,NAME"x",GAINx,NUVONETx,SRCSTATUSx,SHORTNAME"xyz" - see section 8.1'
  fields:
    - name: source
      type: integer
      description: "1-6"
    - name: enable
      type: enum
      values: [disabled, enabled]
    - name: name
      type: string
    - name: gain
      type: integer
      description: "0-14"
    - name: nuvonet
      type: enum
      values: [no, yes]

- id: zone_active
  type: object
  description: 'Response: #ZzACTIVEx (0=NOT active, 1=active)'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: active
      type: enum
      values: [inactive, active]

- id: zone_config
  type: object
  description: 'Response: #ZCFGx,ENABLEx,NAME"x",SLAVETOx,GROUPx,SOURCESx,XSRCx,IRx,DNDx,LOCKEDx - see section 10.1'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: enable
      type: enum
      values: [disabled, enabled]
    - name: name
      type: string
    - name: slaveto
      type: integer
      description: "1-16 or 0"
    - name: group
      type: integer
      description: "1-4 or 0"
    - name: sources
      type: integer
      description: "Bitmask 0-63"
    - name: xsrc
      type: enum
      values: [not_exclusive, exclusive]
    - name: ir
      type: integer
      description: "0=Enabled, 1=Pass Thru Disabled, 2=All Disabled"
    - name: dnd
      type: integer
      description: "Bitmask 0x01=NoMute, 0x02=NoPage, 0x04=NoParty"
    - name: locked
      type: enum
      values: [off, on]

- id: zone_eq_config
  type: object
  description: 'Response: #ZCFGx,BASSx,TREBx,BALx,LOUDCMPx - see section 10.12'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: bass
      type: integer
      description: "-18 to +18, increments of 2"
    - name: treble
      type: integer
      description: "-18 to +18, increments of 2"
    - name: balance
      type: enum
      values: [left, right, center]
      description: "BALL/BALR 2-18 or BALC 0"
    - name: loudcmp
      type: enum
      values: [off, on]

- id: zone_volume_config
  type: object
  description: 'Response: #ZCFGx,MAXVOLx,INIVOLx,PAGEVOLx,PARTYVOLx,VOLRSTx - see section 10.20'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: maxvol
      type: integer
      description: "0=Max to 79=Min"
    - name: inivol
      type: integer
      description: "0=Max to 79=Min"
    - name: pagevol
      type: integer
      description: "0=Max to 79=Min"
    - name: partyvol
      type: integer
      description: "0=Max to 79=Min"
    - name: volrst
      type: enum
      values: [no, yes]

- id: zone_disp_config
  type: object
  description: 'Response: #ZCFGx,BRIGHTx,AUTODIMx,DIMx,DISPMODEx,TIMEx - see section 10.27'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: bright
      type: integer
      description: "1-7"
    - name: autodim
      type: integer
      description: "0-8"
    - name: dim
      type: integer
      description: "0-3"
    - name: dispmode
      type: integer
      description: "0 (not currently used)"
    - name: time
      type: enum
      values: [off, on]

- id: menu
  type: object
  description: 'Response: #ZzMENU,menuid,timeout,albumartid,menusize,selecteditemindex,firstblockitemindex,blocksize,"description" - see section 9.29'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: menuid
      type: integer
    - name: timeout
      type: integer
    - name: albumartid
      type: integer
    - name: menusize
      type: integer
    - name: selecteditemindex
      type: integer
    - name: firstblockitemindex
      type: integer
    - name: blocksize
      type: integer
    - name: description
      type: string

- id: menu_item
  type: object
  description: 'Response: #ZzMENUITEM,itemid,itemtype,albumartid,"description" - see section 9.29'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: itemid
      type: integer
    - name: itemtype
      type: integer
      description: "Bitmask: bit0=submenu, bit1=play!=select, bit2=disabled, bit3=checkmark, bit4=advanced"
    - name: albumartid
      type: integer
    - name: description
      type: string

- id: party
  type: object
  description: 'Response: #ZzPARTYx (0=release, 1=host)'
  fields:
    - name: zone
      type: integer
      description: "1-20"
    - name: host
      type: enum
      values: [released, host]

- id: ir_macro_ack
  type: string
  description: 'Response: #Z0SsIRCTLy or #ZzSsIRCTLy or #Z0SsIRPREy or #ZzSsIRPREy - IR macro/preset execution ack'

- id: error
  type: flag
  description: 'Response: #? - command syntax error or unknown command'
```

## Events
```yaml
- id: prev_button_press
  pattern: "#ZzSsPREV"
  description: "Control Pad PREV button pressed (zone z, source s) - unsolicited, section 5.4"

- id: next_button_press
  pattern: "#ZzSsNEXT"
  description: "Control Pad NEXT button pressed (zone z, source s) - unsolicited, section 5.5"

- id: play_pause_button_press
  pattern: "#ZzSsPLAYPAUSE"
  description: "Control Pad PLAY/PAUSE button pressed (zone z, source s) - unsolicited, section 5.6"

- id: macro_ran
  pattern: "#ZzSsMACROm"
  description: "Named macro associated with an IR source executed (zone z, source s, macro m) - unsolicited, section 5.7"

- id: zone_status_change
  pattern: "#Zx,ON|OFF,SRCx,VOLx,DNDx,LOCKx"
  description: "Any zone state change (front panel, Control Pad, serial, NuVoNet) - unsolicited, section 5.2"

- id: source_display_info_change
  pattern: "#SsDISPINFO,DURATIONx,POSITIONy,STATUSz"
  description: "Source track info update - unsolicited, section 5.1"

- id: source_display_line_change
  pattern: "#SsDISPLINEx,\"y\""
  description: "Source display line text update - unsolicited, section 5.3"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. The only caveat is the standby "wake-up" sequence
# (5ms pause after a wake-up character), which is a transport-timing concern, not a
# safety interlock.
```

## Notes
- Commands are ASCII, prefixed with `*`, terminated with `<CR>` (0x0D). Responses are prefixed with `#` and terminated with `<CR><LF>`.
- When the Essentia E6G is in STANDBY (after `*ALLOFF`), the MPU sleeps under Energy-Star (<1W). To wake: send one `<CR>`, pause 5ms, then send the command — OR send 33 `<CR>` characters back-to-back, then the command.
- Between consecutive commands, the host should pause 50ms to avoid buffer overruns.
- Strings are quoted with `"`; embedded `"` and `*` must be escaped with `\`. Arguments are comma-delimited. All arguments are required.
- Zones 17-20 are recommended for serial controllers implementing menu navigation (no speaker outputs, always slaved).
- Slaved zones receive only the master's status commands; the controller must treat master status as if it were addressed to the slave.
- `*CFGTIME` and `*CFGTIMEMODE` always return `#?` on Essentia E6G (no RTC).
- `*ZxSRC` and related `Z` zone placeholders use integer 1-based zone numbers, NOT hex `0x`-prefixed, in all commands above. The source uses `0x` only in `MENUREQ` argument `menuid` when passing `0xFFFFFFFF`.

<!-- UNRESOLVED: protocol revision/version number not stated in source (only document revision "0.7" dated 4/15/2008). Product model number listed in source example as "NV-E6G"; treated here as an alias of "Essentia E6G". -->

## Provenance

```yaml
source_domains:
  - smarthomebus.com
  - manualslib.com
source_urls:
  - "https://smarthomebus.com/dealers/Protocols/NUVO%20Protocol.pdf"
  - https://www.manualslib.com/manual/113590/Nuvo-Essentia-Nv-E6dxs.html
retrieved_at: 2026-06-03T11:15:57.446Z
last_checked_at: 2026-06-04T06:28:49.480Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:28:49.480Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec commands have literal matches in the source with correct wire tokens, all transport parameters verified, source command catalogue fully represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "documentation also covers the Grand Concerto (NV-I8G); only Essentia E6G-specific fields are emitted here, but many commands are shared"
- "source contains no explicit safety warnings, interlock procedures, or"
- "protocol revision/version number not stated in source (only document revision \"0.7\" dated 4/15/2008). Product model number listed in source example as \"NV-E6G\"; treated here as an alias of \"Essentia E6G\"."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
