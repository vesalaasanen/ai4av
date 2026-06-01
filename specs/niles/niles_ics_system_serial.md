---
spec_id: admin/niles-ics-system
schema_version: ai4av-public-spec-v1
revision: 1
title: "Niles IntelliControl ICS System Control Spec"
manufacturer: Niles
model_family: "IntelliControl ICS System"
aliases: []
compatible_with:
  manufacturers:
    - Niles
  models:
    - "IntelliControl ICS System"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - nilesaudio.com
source_urls:
  - https://nilesaudio.com/sites/nilesaudio.com/files/_/techsupport/ICS-System-Support/rs232g_protocol_v2_6_2.pdf
retrieved_at: 2026-05-23T07:58:24.392Z
last_checked_at: 2026-05-31T06:54:50.271Z
generated_at: 2026-05-31T06:54:50.271Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T06:54:50.271Z
  matched_actions: 75
  action_count: 75
  confidence: high
  summary: "All 75 spec actions found verbatim in source with exact command codes; transport parameters verified; complete protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-23
---

# Niles IntelliControl ICS System Control Spec

## Summary
Niles IntelliControl ICS is a whole-house audio distribution system controlled via the RS232G gateway module. This spec covers the RS232G Protocol v2.6.2 — a standard ASCII, comma-separated, CR-terminated serial protocol that provides zone management, source transport control, metadata queries, sleep timers, alarm clocks, and paging across up to 30 zones and 8 source master keys.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact hardware models (GXR2 amplifier, RS232G module part numbers) not specified -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "9-pin female D-type (pin 2=TX, pin 3=RX, pin 5=GND)"
  encoding: "ASCII, comma-separated parameters, CR-terminated (ASCII 13)"
  available_baud_rates: [4800, 9600, 19200, 38400, 57600]
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from OFF command (znt key code 10)
  - queryable    # inferred from numerous query commands (zone status, source status, metadata, time, etc.)
  - levelable    # inferred from volume/bass/treble/balance control
  - routable     # inferred from zone change and master key selection commands
```

## Actions
```yaml
actions:
  # ── Zone Commands (znc) ──
  - id: request_available_zones
    label: Request Available Zones
    kind: action
    command: "znc,1"
    response: "rznc,1,#  (# = number of zones, max 30)"
    params: []

  - id: request_zone_name
    label: Request Zone Name
    kind: action
    command: "znc,2,{index}"
    response: "rznc,2,zone,bytes,name"
    params:
      - name: index
        type: integer
        description: "Zone index (0-based)"

  - id: request_current_zone_info
    label: Request Current Zone Information
    kind: action
    command: "znc,3"
    response: "rznc,3,zone,bytes,name"
    params: []

  - id: change_zone
    label: Change Zone
    kind: action
    command: "znc,4,{zone}"
    response: "rznc,4,zone"
    params:
      - name: zone
        type: integer
        description: "Zone number (from Request Zone Name response)"

  - id: request_current_zone_status
    label: Request Current Zone Status
    kind: action
    command: "znc,5"
    response: "See unsolicited USC,2"
    params: []

  # ── Zone Transport Commands (znt) ──
  - id: zone_master_key
    label: Zone Master Key Press
    kind: action
    command: "znt,{key_code}"
    response: "rznt,{key_code},OK"
    params:
      - name: key_code
        type: integer
        description: "1-8 = Master Key 1-8"
    notes: "Hold flag: znt,{key_code},h  (repeat every ~2-3s for master keys)"

  - id: zone_off
    label: Zone Off
    kind: action
    command: "znt,10"
    response: "rznt,10,OK"
    params: []
    notes: "Hold flag supported: znt,10,h"

  - id: zone_mute
    label: Zone Mute Toggle
    kind: action
    command: "znt,11"
    response: "rznt,11,OK"
    params: []
    notes: "Key-down only; no hold/repeat flag"

  - id: zone_volume_up
    label: Zone Volume Up
    kind: action
    command: "znt,12"
    response: "rznt,12,OK"
    params: []
    notes: "Hold/repeat sends flag every ~150ms"

  - id: zone_volume_down
    label: Zone Volume Down
    kind: action
    command: "znt,13"
    response: "rznt,13,OK"
    params: []
    notes: "Hold/repeat sends flag every ~150ms"

  - id: zone_bass_up
    label: Zone Bass Up
    kind: action
    command: "znt,128"
    response: "rznt,128,OK"
    params: []

  - id: zone_bass_down
    label: Zone Bass Down
    kind: action
    command: "znt,129"
    response: "rznt,129,OK"
    params: []

  - id: zone_treble_up
    label: Zone Treble Up
    kind: action
    command: "znt,130"
    response: "rznt,130,OK"
    params: []

  - id: zone_treble_down
    label: Zone Treble Down
    kind: action
    command: "znt,131"
    response: "rznt,131,OK"
    params: []

  - id: zone_balance_down
    label: Zone Balance Down
    kind: action
    command: "znt,132"
    response: "rznt,132,OK"
    params: []

  - id: zone_balance_up
    label: Zone Balance Up
    kind: action
    command: "znt,133"
    response: "rznt,133,OK"
    params: []

  # ── Source Commands (src) ──
  - id: request_available_master_keys
    label: Request Available Master Keys
    kind: action
    command: "src,1"
    response: "rsrc,1,#  (# = number of master keys, max 8)"
    params: []

  - id: request_master_key_info
    label: Request Master Key Information
    kind: action
    command: "src,2,{index}"
    response: "rsrc,2,master_key,slot,type,bytes,name"
    params:
      - name: index
        type: integer
        description: "Master key index (0-based)"
    notes: "type: 1=XM, 2=Sirius, 3=iPod/MP3, 4=AM/FM, 5=Audio, 6=Lutron, 7=HD AM/FM, 8=AM/FM Export"

  - id: request_source_status
    label: Request Source Status
    kind: action
    command: "src,3"
    response: "See unsolicited USC,3"
    params: []

  - id: request_metadata_status
    label: Request Metadata Status
    kind: action
    command: "src,4"
    response: "See unsolicited USC,4"
    params: []

  - id: request_available_soft_keys
    label: Request Available Soft Keys
    kind: action
    command: "src,5"
    response: "See unsolicited USC,5"
    params: []

  - id: request_soft_key_info
    label: Request Soft Key Information
    kind: action
    command: "src,6,{index}"
    response: "rsrc,6,{index},type,behavior,bytes,name"
    params:
      - name: index
        type: integer
        description: "Soft key index (0-based)"
    notes: "type: 0=Default, 1=PageDown, 2=PageUp, 3=Select, 4=Back, 5=Menu, 6=Guide, 7=Favorites, 8=Transport"

  - id: press_soft_key
    label: Press Soft Key
    kind: action
    command: "src,7,{index},{behavior}"
    response: "rsrc,7,OK"
    params:
      - name: index
        type: integer
        description: "Soft key index"
      - name: behavior
        type: integer
        description: "0=normal (press+release), 1=alternate (held 2s)"

  - id: request_available_menu_items
    label: Request Available Menu Items
    kind: action
    command: "src,8"
    response: "See unsolicited USC,6"
    params: []

  - id: request_menu_item_info
    label: Request Menu Item Information
    kind: action
    command: "src,9,{index}"
    response: "rsrc,9,{index},behavior,bytes,name"
    params:
      - name: index
        type: integer
        description: "Menu item index (0-based)"

  - id: press_menu_item
    label: Press Menu Item
    kind: action
    command: "src,10,{index},{behavior}"
    response: "rsrc,10,OK"
    params:
      - name: index
        type: integer
        description: "Menu item index"
      - name: behavior
        type: integer
        description: "0=normal, 1=alternate (held 2s)"

  - id: direct_tune
    label: Direct Tune
    kind: action
    command: "src,11,{byte_count},{station}"
    response: "rsrc,11,OK"
    params:
      - name: byte_count
        type: integer
        description: "Number of characters in station string"
      - name: station
        type: string
        description: "XM/Sirius: XX or XXX; AM: XXX or XXXX; FM: XX.X or XXX.X; HD AM: XXX-X or XXXX-X; HD FM: XX.X-X or XXX.X-X"

  - id: request_soft_keys_status
    label: Request Soft Keys Status
    kind: action
    command: "src,12"
    response: "See unsolicited USC,9"
    params: []

  - id: request_menu_items_status
    label: Request Menu Items Status
    kind: action
    command: "src,13"
    response: "See unsolicited USC,10"
    params: []

  - id: alphanumeric_search
    label: Alphanumeric Menu Search
    kind: action
    command: "src,14,{byte_count},{word}"
    response: "See unsolicited USC,6"
    params:
      - name: byte_count
        type: integer
        description: "Length of search word (max 3)"
      - name: word
        type: string
        description: "Letter or word to search (max 3 chars)"

  - id: cancel_menu
    label: Cancel Menu
    kind: action
    command: "src,15"
    response: "rsrc,15,0"
    params: []
    notes: "Returns to Now Playing screen; triggers metadata + soft key updates in auto mode"

  # ── Source Transport Commands (srt) ──
  - id: source_play
    label: Source Play
    kind: action
    command: "srt,17"
    response: "rsrt,17,OK"
    params: []

  - id: source_stop
    label: Source Stop
    kind: action
    command: "srt,18"
    response: "rsrt,18,OK"
    params: []

  - id: source_pause
    label: Source Pause
    kind: action
    command: "srt,19"
    response: "rsrt,19,OK"
    params: []

  - id: source_rewind
    label: Source Rewind
    kind: action
    command: "srt,20"
    response: "rsrt,20,OK"
    params: []
    notes: "Repeat flag: srt,20,r"

  - id: source_fast_forward
    label: Source Fast Forward
    kind: action
    command: "srt,21"
    response: "rsrt,21,OK"
    params: []
    notes: "Repeat flag: srt,21,r"

  - id: source_menu
    label: Source Menu
    kind: action
    command: "srt,22"
    response: "rsrt,22,OK"
    params: []

  - id: source_up
    label: Source Up
    kind: action
    command: "srt,23"
    response: "rsrt,23,OK"
    params: []

  - id: source_guide
    label: Source Guide
    kind: action
    command: "srt,24"
    response: "rsrt,24,OK"
    params: []

  - id: source_left
    label: Source Left
    kind: action
    command: "srt,25"
    response: "rsrt,25,OK"
    params: []

  - id: source_select
    label: Source Select
    kind: action
    command: "srt,26"
    response: "rsrt,26,OK"
    params: []

  - id: source_right
    label: Source Right
    kind: action
    command: "srt,27"
    response: "rsrt,27,OK"
    params: []

  - id: source_exit
    label: Source Exit
    kind: action
    command: "srt,28"
    response: "rsrt,28,OK"
    params: []

  - id: source_down
    label: Source Down
    kind: action
    command: "srt,29"
    response: "rsrt,29,OK"
    params: []

  - id: source_info
    label: Source Info
    kind: action
    command: "srt,30"
    response: "rsrt,30,OK"
    params: []

  - id: source_numeral
    label: Source Numeral
    kind: action
    command: "srt,{key_code}"
    response: "rsrt,{key_code},OK"
    params:
      - name: key_code
        type: integer
        description: "33-41 = digits 1-9, 42 = digit 0"

  - id: source_previous
    label: Source Previous
    kind: action
    command: "srt,43"
    response: "rsrt,43,OK"
    params: []

  - id: source_next
    label: Source Next
    kind: action
    command: "srt,44"
    response: "rsrt,44,OK"
    params: []

  - id: source_random
    label: Source Random
    kind: action
    command: "srt,45"
    response: "rsrt,45,OK"
    params: []

  - id: source_group
    label: Source Group
    kind: action
    command: "srt,46"
    response: "rsrt,46,OK"
    params: []

  - id: source_disc
    label: Source Disc
    kind: action
    command: "srt,47"
    response: "rsrt,47,OK"
    params: []

  - id: source_favorite
    label: Source Favorite
    kind: action
    command: "srt,48"
    response: "rsrt,48,OK"
    params: []

  - id: source_am
    label: Source AM
    kind: action
    command: "srt,65"
    response: "rsrt,65,OK"
    params: []

  - id: source_fm
    label: Source FM
    kind: action
    command: "srt,66"
    response: "rsrt,66,OK"
    params: []

  - id: source_page_channel_up
    label: Source Page/Channel Up
    kind: action
    command: "srt,67"
    response: "rsrt,67,OK"
    params: []

  - id: source_page_channel_down
    label: Source Page/Channel Down
    kind: action
    command: "srt,68"
    response: "rsrt,68,OK"
    params: []

  - id: source_enter
    label: Source Enter
    kind: action
    command: "srt,69"
    response: "rsrt,69,OK"
    params: []

  - id: source_clear
    label: Source Clear
    kind: action
    command: "srt,70"
    response: "rsrt,70,OK"
    params: []

  # ── Special Commands (spc) ──
  - id: request_time
    label: Request Time
    kind: action
    command: "spc,1"
    response: "rspc,1,hours,minutes,seconds"
    params: []
    notes: "hours 0-23, minutes 0-59, seconds 0-59"

  - id: set_time
    label: Set Time
    kind: action
    command: "spc,2,{hours},{minutes},{seconds}"
    response: "rspc,2,OK"
    params:
      - name: hours
        type: integer
        description: "0-23"
      - name: minutes
        type: integer
        description: "0-59"
      - name: seconds
        type: integer
        description: "0-59"

  - id: request_sleep_timer
    label: Request Zone Sleep Timer
    kind: action
    command: "spc,3"
    response: "rspc,3,on_off,all_zones,timeout"
    params: []
    notes: "on_off: 0=off 1=on; all_zones: 0=current zone only 1=all zones; timeout: 0-120 minutes"

  - id: set_sleep_timer
    label: Set Zone Sleep Timer
    kind: action
    command: "spc,4,{on_off},{all_zones},{timeout}"
    response: "rspc,4,OK"
    params:
      - name: on_off
        type: integer
        description: "0=off, 1=on"
      - name: all_zones
        type: integer
        description: "0=current zone only, 1=all zones off on expiry"
      - name: timeout
        type: integer
        description: "Minutes 0-120"

  - id: request_alarm_clock
    label: Request Zone Alarm Clock
    kind: action
    command: "spc,5"
    response: "rspc,5,on_off,master_key,hour,minute"
    params: []

  - id: set_alarm_clock
    label: Set Zone Alarm Clock
    kind: action
    command: "spc,6,{on_off},{master_key},{hour},{minute}"
    response: "rspc,6,OK"
    params:
      - name: on_off
        type: integer
        description: "0=off, 1=on"
      - name: master_key
        type: integer
        description: "Master key to select on alarm (1-8)"
      - name: hour
        type: integer
        description: "0-23"
      - name: minute
        type: integer
        description: "0-59"

  - id: request_zone_page
    label: Request Zone Page
    kind: action
    command: "spc,7"
    response: "rspc,7,setting,volume"
    params: []
    notes: "setting: 0=never, 1=always (even zone off), 2=zone on only"

  - id: set_zone_page
    label: Set Zone Page
    kind: action
    command: "spc,8,{setting},{volume}"
    response: "rspc,8,OK"
    params:
      - name: setting
        type: integer
        description: "0=never, 1=always, 2=zone on only"
      - name: volume
        type: integer
        description: "Page volume"

  - id: request_zone_turn_on_volume
    label: Request Zone Turn ON Volume
    kind: action
    command: "spc,9"
    response: "rspc,9,use_preset,preset"
    params: []
    notes: "use_preset: 0=use last volume, 1=preset volume"

  - id: set_zone_turn_on_volume
    label: Set Zone Turn ON Volume
    kind: action
    command: "spc,10,{use_preset},{preset}"
    response: "rspc,10,OK"
    params:
      - name: use_preset
        type: integer
        description: "0=use last volume, 1=preset"
      - name: preset
        type: integer
        description: "Preset volume level"

  - id: request_zone_max_volume
    label: Request Zone Max Volume
    kind: action
    command: "spc,11"
    response: "rspc,11,max_volume"
    params: []

  - id: set_zone_max_volume
    label: Set Zone Max Volume
    kind: action
    command: "spc,12,{max_volume}"
    response: "rspc,12,OK"
    params:
      - name: max_volume
        type: integer
        description: "Maximum volume level"

  - id: set_volume_current_zone
    label: Set Volume Current Zone
    kind: action
    command: "spc,13,{volume}"
    response: "rspc,13,{volume}"
    params:
      - name: volume
        type: integer
        description: "Volume level 0-100"
    notes: "Overrides max volume setting in GXR2 - caller should check max volume first"

  - id: set_volume_any_zone
    label: Set Volume Any Zone
    kind: action
    command: "spc,14,{zone},{volume}"
    response: "rspc,14,{zone},{volume}"
    params:
      - name: zone
        type: integer
        description: "Zone number 1-30"
      - name: volume
        type: integer
        description: "Volume level 0-100"
    notes: "Overrides max volume setting in GXR2 - caller should check max volume first. Invalid zone silently accepted by RS232G but ignored by GXR2."

  # ── System Commands (syc) ──
  - id: system_reset
    label: System Reset
    kind: action
    command: "syc,1"
    response: "None (unsolicited USC,1 sent when ready)"
    params: []

  - id: set_report_mode
    label: Set Report Mode
    kind: action
    command: "syc,2,{mode}"
    response: "rsyc,2,{mode}"
    params:
      - name: mode
        type: integer
        description: "0=manual, 1=auto zone+source status, 2=auto+metadata, 3=auto+menu, 4=auto+metadata+menu"
    notes: "Without parameter, queries current mode. Factory default is 0. Setting persists across power loss."

  - id: rebuild_eeprom
    label: Rebuild EEPROM
    kind: action
    command: "syc,3"
    response: "None (RS232G resets itself)"
    params: []
    notes: "WARNING: resets baud rate to 9600 - do not use if baud rate was changed via Intellifile-3"
```

## Feedbacks
```yaml
feedbacks:
  # ── Zone Status ──
  - id: zone_status
    type: struct
    description: "Full zone status (unsolicited USC,2 or response to znc,5)"
    fields:
      - name: zone
        type: integer
        description: "Current zone (1-30)"
      - name: master_key
        type: integer
        description: "Current master key (1-8)"
      - name: volume
        type: integer
        description: "Zone volume (1-100)"
      - name: mute
        type: integer
        description: "0=unmute, 1=mute"
      - name: bass
        type: integer
        description: "Bass (-10 to +10)"
      - name: treble
        type: integer
        description: "Treble (-10 to +10)"
      - name: balance
        type: integer
        description: "Balance (-50 to +50)"
      - name: slot
        type: integer
        description: "Current source card slot"

  - id: short_zone_status
    type: struct
    description: "Status change for non-current zone (unsolicited USC,12)"
    fields:
      - name: zone
        type: integer
        description: "Zone with changed status (1-30)"
      - name: master_key
        type: integer
        description: "0=off, 1-8=new master key selection"
      - name: what_changed
        type: integer
        description: "Bitwise: 1=zone status, 2=volume, 4=mute, 8=balance, 16=bass, 32=treble"

  # ── Source Status ──
  - id: source_status
    type: struct
    description: "Source status (unsolicited USC,3 or response to src,3)"
    fields:
      - name: source
        type: integer
        description: "Current source number"
      - name: type
        type: integer
        description: "1=XM, 2=Sirius, 3=iPod, 4=AM/FM, 5=Audio, 6=Lutron, 7=HD AM/FM, 8=AM/FM Export"
      - name: antenna
        type: integer
        description: "0=no antenna, 1=antenna present"
      - name: signal_strength
        type: integer
        description: "0=no signal, 1=low, 2=middle, 3=good"
      - name: stereo
        type: integer
        description: "0=mono, 1=FM stereo"
      - name: shuffle
        type: integer
        description: "0=normal, 1=shuffle"
      - name: pause
        type: integer
        description: "0=playing, 1=paused"

  # ── Metadata ──
  - id: metadata_status
    type: struct
    description: "Source metadata (unsolicited USC,4 or response to src,4)"
    fields:
      - name: count
        type: integer
        description: "Number of metadata entries"
    notes: "Each entry: id (3=Artist, 4=Song, 5=Channel, 6=ChannelNumber, 7=Genre, 8=Album, 9=ImageRef, 10=TrackNumber, 11=Band, 12=Frequency, 13=GenericLabel1, 14=GenericData1), bytes, name"

  # ── Command Acknowledgements ──
  - id: command_ok
    type: string
    description: "rXXX,key_code,OK - command succeeded"
    values: ["OK"]

  - id: command_fail
    type: struct
    description: "rXXX,key_code,FAIL,code - command failed"
    fields:
      - name: code
        type: integer
        description: "1=memory alloc, 2=invalid cmd, 3=missing cmd, 4=missing param, 5=memory, 6=invalid zone, 7=invalid keycode, 8=no hold flag, 9=no repeat flag, 10=invalid flag, 11=no flags allowed, 12=invalid zone index, 13=invalid source index, 14=invalid soft key index, 15=invalid menu index, 16=no IP, 17=no alt behavior, 18=waiting prev answer, 19=waiting prev setting, 20-23=param out of range, 24=too many dots, 25=non-numeric, 26=no menu, 27=byte mismatch, 28=no alphanumeric search"

  # ── Available Counts ──
  - id: available_zones_count
    type: integer
    description: "Number of zones (from rznc,1,#)"

  - id: available_master_keys_count
    type: integer
    description: "Number of master keys (from rsrc,1,#)"

  - id: available_soft_keys_count
    type: integer
    description: "Number of soft keys (from usc,5,#)"

  - id: available_menu_items_count
    type: integer
    description: "Number of menu items (from usc,6,#,...)"
```

## Variables
```yaml
variables:
  - id: report_mode
    type: integer
    description: "Current report mode: 0=manual, 1=auto status, 2=auto+metadata, 3=auto+menu, 4=auto+all"
    access: read_write
    set_command: "syc,2,{mode}"
    query_command: "syc,2"

  - id: zone_volume
    type: integer
    min: 0
    max: 100
    description: "Volume for current zone (0-100)"
    access: read_write
    set_command: "spc,13,{volume}"

  - id: any_zone_volume
    type: integer
    min: 0
    max: 100
    description: "Volume for any zone (zone 1-30, volume 0-100)"
    access: write_only
    set_command: "spc,14,{zone},{volume}"

  - id: zone_max_volume
    type: integer
    description: "Maximum allowed volume for current zone"
    access: read_write
    set_command: "spc,12,{max_volume}"
    query_command: "spc,11"

  - id: zone_turn_on_volume
    type: struct
    description: "Turn-on volume behavior for current zone"
    access: read_write
    set_command: "spc,10,{use_preset},{preset}"
    query_command: "spc,9"
    fields:
      - name: use_preset
        type: integer
        description: "0=use last volume, 1=preset"
      - name: preset
        type: integer
        description: "Preset volume level"

  - id: sleep_timer
    type: struct
    description: "Zone sleep timer configuration"
    access: read_write
    set_command: "spc,4,{on_off},{all_zones},{timeout}"
    query_command: "spc,3"
    fields:
      - name: on_off
        type: integer
        description: "0=off, 1=on"
      - name: all_zones
        type: integer
        description: "0=current zone, 1=all zones"
      - name: timeout
        type: integer
        description: "Minutes 0-120"

  - id: alarm_clock
    type: struct
    description: "Zone alarm clock configuration"
    access: read_write
    set_command: "spc,6,{on_off},{master_key},{hour},{minute}"
    query_command: "spc,5"
    fields:
      - name: on_off
        type: integer
        description: "0=off, 1=on"
      - name: master_key
        type: integer
        description: "1-8"
      - name: hour
        type: integer
        description: "0-23"
      - name: minute
        type: integer
        description: "0-59"

  - id: zone_page
    type: struct
    description: "Zone paging/doorbell setting"
    access: read_write
    set_command: "spc,8,{setting},{volume}"
    query_command: "spc,7"
    fields:
      - name: setting
        type: integer
        description: "0=never, 1=always, 2=zone on only"
      - name: volume
        type: integer
        description: "Page volume"

  - id: system_time
    type: struct
    description: "System clock"
    access: read_write
    set_command: "spc,2,{hours},{minutes},{seconds}"
    query_command: "spc,1"
    fields:
      - name: hours
        type: integer
        description: "0-23"
      - name: minutes
        type: integer
        description: "0-59"
      - name: seconds
        type: integer
        description: "0-59"
```

## Events
```yaml
events:
  - id: ready
    description: "RS232G ready after power-on or reset"
    syntax: "usc,1"

  - id: zone_status_update
    description: "Zone status change (auto mode) or periodic (~3s); see zone_status feedback"
    syntax: "usc,2,zone,master_key,volume,mute,bass,treble,balance,slot"

  - id: source_status_update
    description: "Source status change (auto mode) or periodic (~2s); see source_status feedback"
    syntax: "usc,3,source,type,antenna,signal_strength,stereo,shuffle,pause"

  - id: metadata_update
    description: "New metadata available (auto mode 2 or 4)"
    syntax: "usc,4,#,id1,bts1,name1,...,idN,btsN,nameN"

  - id: available_soft_keys
    description: "Soft keys available for current screen"
    syntax: "usc,5,#"

  - id: available_menu_items
    description: "Menu items available for current screen"
    syntax: "usc,6,#,bytes,title,menus_type"

  - id: metadata_and_soft_keys
    description: "Metadata + soft keys need refresh (auto mode 1 or 3)"
    syntax: "usc,7"

  - id: soft_keys_and_menu_items
    description: "Soft keys + menu items need refresh (auto mode 1 or 2)"
    syntax: "usc,8"

  - id: soft_keys_status
    description: "Full soft key status with all info (auto mode 2, 3, or 4)"
    syntax: "usc,9,#,index1,type1,behavior1,bytes1,name1,...,indexN,typeN,behaviorN,bytesN,nameN"

  - id: menu_items_status
    description: "Full menu items status"
    syntax: "usc,10,bytes,title,#,index1,behavior1,bytes1,name1,...,indexN,behaviorN,bytesN,nameN"

  - id: menu_items_status_extended
    description: "Extended menu items status with menus_type (auto mode 3 or 4 only)"
    syntax: "usc,11,bytes,title,menus_type,#,index1,behavior1,bytes1,name1,...,indexN,behaviorN,bytesN,nameN"

  - id: short_zone_status
    description: "Status change in non-current zone (auto mode)"
    syntax: "usc,12,zone,master_key,what_changed"

  - id: new_metadata_available
    description: "Metadata changed for active source not currently selected"
    syntax: "usc,13,src"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
warnings:
  - "syc,3 (Rebuild EEPROM) resets baud rate to 9600 - do not use if baud rate was changed via Intellifile-3"
  - "spc,13 and spc,14 (Set Volume) override max volume setting in GXR2 - caller must respect max volume"
  - "Key code must never be 0x00 (0) or 0xFF (255)"
# UNRESOLVED: no power-on sequencing requirements stated in source
```

## Notes
- All commands are ASCII, comma-separated, CR-terminated (`<CR>` = ASCII 13).
- Response prefixes follow pattern `r` + command group (e.g. `rznc`, `rsrc`, `rsrt`, `rspc`, `rsyc`).
- Unsolicited messages use prefix `usc,` followed by sub-command number.
- Report mode (syc,2) controls whether the RS232G pushes updates automatically (modes 1–4) or requires polling (mode 0). Factory default is mode 0.
- Zone transport hold flag repeats every ~2–3s; source transport repeat flag repeats every ~150ms.
- The RS232G acts as a gateway between serial and the ICS system bus — it manages a single "current zone" context that can be changed with `znc,4,{zone}`.
- Source types: 1=XM, 2=Sirius, 3=iPod/MP3, 4=AM/FM, 5=Audio, 6=Lutron, 7=HD AM/FM, 8=AM/FM Export.
- Baud rate can be changed via Intellifile-3 setup program (available rates: 4800, 9600, 19200, 38400, 57600).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact GXR2 and RS232G module model numbers not specified -->
<!-- UNRESOLVED: maximum cable length / serial distance not stated -->
<!-- UNRESOLVED: whether TCP/IP gateway variant exists (RS232G name implies serial only) -->

## Provenance

```yaml
source_domains:
  - nilesaudio.com
source_urls:
  - https://nilesaudio.com/sites/nilesaudio.com/files/_/techsupport/ICS-System-Support/rs232g_protocol_v2_6_2.pdf
retrieved_at: 2026-05-23T07:58:24.392Z
last_checked_at: 2026-05-31T06:54:50.271Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:54:50.271Z
matched_actions: 75
action_count: 75
confidence: high
summary: "All 75 spec actions found verbatim in source with exact command codes; transport parameters verified; complete protocol coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
