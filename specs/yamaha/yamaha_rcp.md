---
spec_id: admin/yamaha-rcp-rcp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha MTX/MRX/XMV/EX Series Remote Control Protocol Spec"
manufacturer: Yamaha
model_family: MTX3
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - MTX3
    - MTX5-D
    - MRX7-D
    - "XMV Series"
    - EXi8
    - EXo8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usa.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/5/1343735/200330_mtx_mrx_xmv_ex_rcps_v400_rev14_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/1/313111/AMX_Control_Module_MTX5-D.zip
  - https://usa.yamaha.com/files/download/other_assets/2/1204842/Crestron_module_MRX7-D.zip
  - https://usa.yamaha.com/files/download/other_assets/6/1209076/Crestron_module_MTXseries_v.1.2.zip
retrieved_at: 2026-07-17T07:06:34.199Z
last_checked_at: 2026-07-22T08:08:44.558Z
generated_at: 2026-07-22T08:08:44.558Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MRX7-D uses an index-based parameter addressing scheme (Remote Control Setup List) that must be configured in MTX-MRX Editor before external control — the mapping is device-specific and not enumerable from the protocol spec alone"
  - "XMV-specific parameter details (InputSelect, ATT, DigitalATT) are in section 7.3 but not fully extracted here"
  - "no explicit safety interlock procedures documented in source"
  - "Full parameter address tables (section 7) contain hundreds of entries with MemNo, UniqueId, ElmNo, Xpos, Ypos, PrmNo per parameter — too extensive to list individually. See source document sections 7.1–7.6."
  - "Meter address tables (section 8) list all meter UniqueIds per device model."
  - "Fader parameter dB-to-raw-value lookup tables (section 6.1) cover -Infinity to +10dB range with precise mapping."
  - "XMV-specific parameters (InputSelect, ATT, DigitalInputSensitivity, Power) in section 7.3."
  - "XMV power on/off command behavior (Power parameter in XMV parameter list)."
verification:
  verdict: verified
  checked_at: 2026-07-22T08:08:44.558Z
  matched_actions: 65
  action_count: 65
  confidence: medium
  summary: "All 65 spec actions map 1:1 to the source's Section 2.2/2.3 command tables (devstatus/devmode/scpmode/get/set/setr/mtr/ss*/devinfo/event MTX:* families) with matching command strings, response shapes, and enums; transport (port 49280, RS-232 8N1 38400/115200) confirmed verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Yamaha MTX/MRX/XMV/EX Series Remote Control Protocol Spec

## Summary
Yamaha MTX3, MTX5-D, MRX7-D, XMV Series, EXi8, and EXo8 commercial installation DSP/matrix processors and I/O units. Controlled via TCP/IP (Ethernet NETWORK connector, port 49280) or RS-232C (REMOTE connector on MTX/MRX). Text-based ASCII command protocol with LF-terminated lines, supporting parameter get/set (raw, normalized, relative), preset/snapshot recall, metering, event processing, audio player transport, scheduling, DST management, and alert event log retrieval. Protocol version V4.0.0 rev14. Up to 9 simultaneous controllers (8 TCP + 1 RS-232 on MTX/MRX; 8 TCP on XMV/EX).

<!-- UNRESOLVED: MRX7-D uses an index-based parameter addressing scheme (Remote Control Setup List) that must be configured in MTX-MRX Editor before external control — the mapping is device-specific and not enumerable from the protocol spec alone -->
<!-- UNRESOLVED: XMV-specific parameter details (InputSelect, ATT, DigitalATT) are in section 7.3 but not fully extracted here -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 49280
serial:
  baud_rate: 38400  # configurable: 38400 or 115200 on MTX/MRX
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: devmode normal/emergency switches run mode
- queryable    # inferred: extensive parameter query commands (get, getn, devstatus, devinfo)
- levelable    # inferred: fader parameter set/setn/setr with dB-level control
- routable     # inferred: input/output patch and router parameters in section 7
```

## Actions
```yaml
- id: devstatus_runmode
  label: Query Device Run Mode
  kind: action
  params: []
  command: devstatus runmode
  response: 'OK devstatus runmode "{mode}"'
  description: Queries current run mode (normal, emergency, update)

- id: devstatus_error
  label: Query Device Error Status
  kind: action
  params: []
  command: devstatus error
  response: 'OK devstatus error "{status}"'
  description: Queries current alert/error status

- id: devstatus_fs
  label: Query Sampling Frequency
  kind: action
  params: []
  command: devstatus fs
  response: 'OK devstatus fs "{fs}"'
  description: Queries current sampling frequency (unknown, 44.1kHz, 48kHz)

- id: devstatus_lockstatus
  label: Query Word Clock Lock Status
  kind: action
  params: []
  command: devstatus lockstatus
  response: 'OK devstatus lockstatus "{status}"'
  description: Queries word clock lock status (lock, unlock)

- id: devmode_normal
  label: Set Normal Run Mode
  kind: action
  params: []
  command: devmode normal
  response: OK devmode normal
  description: Sets device to normal run mode

- id: devmode_emergency
  label: Set Emergency Run Mode
  kind: action
  params: []
  command: devmode emergency
  response: OK devmode emergency
  description: Sets device to emergency run mode (invalid on XMV, EXi8, EXo8)

- id: scpmode_encoding
  label: Set Character Encoding
  kind: action
  params:
    - name: encoding
      type: enum
      values: [ascii, utf8]
      description: Character encoding mode
  command: 'scpmode encoding {encoding}'
  description: Sets response/notification encoding (default: ascii)

- id: scpmode_valuetype
  label: Set Value Notification Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [raw, normalized]
      description: Value type for notifications
  command: 'scpmode valuetype {mode}'
  description: Sets parameter change notification value type (default: raw)

- id: scpmode_resolution
  label: Set Normalization Resolution
  kind: action
  params:
    - name: resolution
      type: integer
      description: Resolution for normalized values (minimum 100, default 1000)
  command: 'scpmode resolution {resolution}'
  description: Sets normalized value resolution

- id: scpmode_keepalive
  label: Set Keepalive Interval
  kind: action
  params:
    - name: interval_ms
      type: integer
      description: Timeout in milliseconds (minimum 1000)
  command: 'scpmode keepalive {interval_ms}'
  description: Enables keepalive; device disconnects if no message received within timeout

- id: get_parameter
  label: Query Parameter (Raw)
  kind: action
  params:
    - name: address
      type: string
      description: "MTX:mem_MemNo/UniqueId/ElmNo/Xpos/Ypos/PrmNo/IndexNo or MTX:Index_IndexNo"
  command: 'get {address} 0 0'
  response: 'OK get {address} 0 0 {value}'
  description: Queries parameter value in raw units

- id: getn_parameter
  label: Query Parameter (Normalized)
  kind: action
  params:
    - name: address
      type: string
      description: "MTX:mem_MemNo/UniqueId/ElmNo/Xpos/Ypos/PrmNo/IndexNo or MTX:Index_IndexNo"
  command: 'getn {address} 0 0'
  response: 'OK getn {address} 0 0 {value}'
  description: Queries parameter value in normalized units (0-1000)

- id: scheduler_status_query
  label: Query Scheduler Status
  kind: query
  params: []
  command: get MTX:EvntScd_On 0 0
  response: 'OK get MTX:EvntScd_On 0 0 {state}'
  description: "Queries scheduler on/off state (1=on, 0=off). Invalid on XMV, EXi8, EXo8."

- id: set_parameter
  label: Set Parameter (Raw)
  kind: action
  params:
    - name: address
      type: string
      description: Parameter address path
    - name: value
      type: integer
      description: Raw value to set
  command: 'set {address} 0 0 {value}'
  response: 'OK set {address} 0 0 {value} "{string}"'
  description: Sets parameter to raw value. OKm response if value was clamped.

- id: setn_parameter
  label: Set Parameter (Normalized)
  kind: action
  params:
    - name: address
      type: string
      description: Parameter address path
    - name: value
      type: integer
      description: Normalized value (0-1000 default resolution)
  command: 'setn {address} 0 0 {value}'
  response: 'OK setn {address} 0 0 {value} "{string}"'
  description: Sets parameter to normalized value. OKm response if clamped.

- id: setr_parameter
  label: Set Parameter (Relative)
  kind: action
  params:
    - name: address
      type: string
      description: Parameter address path
    - name: delta
      type: integer
      description: Relative increment/decrement value
  command: 'setr {address} 0 0 "{delta}"'
  response: 'OK setr {address} 0 0 {value}'
  description: Relative inc/dec for fader-type parameters only. OKm if clamped.

- id: scheduler_on_off
  label: Set Scheduler On/Off
  kind: action
  params:
    - name: enabled
      type: enum
      values: ["1", "0"]
      description: "1 = on, 0 = off"
  command: 'set MTX:EvntScd_On 0 0 {enabled}'
  description: Enables or disables the event scheduler (invalid on XMV, EXi8, EXo8)

- id: mtrstart
  label: Start Meter Transmission
  kind: action
  params:
    - name: address
      type: string
      description: "MTX:mtr_MemNo/UniqueId/meter or MTX:Index_IndexNo"
    - name: meter_type
      type: enum
      values: [level, gr, hold]
      description: Meter type (MRX7-D supports all; others use level)
    - name: interval_ms
      type: integer
      description: Minimum transmission interval in milliseconds
  command: 'mtrstart {address} {meter_type} {interval_ms}'
  description: Requests periodic meter data transmission

- id: mtrstop
  label: Stop Meter Transmission
  kind: action
  params:
    - name: address
      type: string
      description: Meter address
    - name: meter_type
      type: enum
      values: [level, gr, hold]
      description: Meter type to stop
  command: 'mtrstop {address} {meter_type}'
  description: Stops periodic meter data transmission

- id: sscurrent
  label: Query Current Preset Number
  kind: action
  params: []
  command: sscurrent
  response: 'OK sscurrent {index} {status}'
  description: Queries current preset index; status is unmodified or modified

- id: ssrecall
  label: Recall Preset
  kind: action
  params:
    - name: index
      type: integer
      description: Preset index number
  command: 'ssrecall {index}'
  response: 'OK ssrecall {index}'
  description: Recalls preset at specified index (invalid on XMV, EXi8, EXo8)

- id: ssrecall_ex
  label: Recall Snapshot
  kind: action
  params:
    - name: index
      type: integer
      description: Snapshot index from Remote Control Setup List (MRX7-D only)
  command: 'ssrecall_ex list {index}'
  response: 'OK ssrecall_ex list {index}'
  description: Recalls Snapshot or SnapshotGroup assigned in Remote Control Setup List (MRX7-D only)

- id: ssnum
  label: Query Preset Count
  kind: action
  params: []
  command: ssnum
  response: 'OK ssnum {count}'
  description: Queries number of preset lists (invalid on XMV, EXi8, EXo8)

- id: ssinfo
  label: Query Preset Info
  kind: action
  params:
    - name: index
      type: integer
      description: Preset index number
  command: 'ssinfo {index}'
  response: 'OK ssinfo {index} "{num}" {attrib} "{title}" "{comment}"'
  description: Returns preset display number, attribute (preinst/reserve/user/empty), title, comment. Invalid on XMV/EXi8/EXo8.

- id: devinfo_protocolver
  label: Query Protocol Version
  kind: action
  params: []
  command: devinfo protocolver
  response: 'OK devinfo protocolver "{version}"'

- id: devinfo_paramsetver
  label: Query Parameter Set Version
  kind: action
  params: []
  command: devinfo paramsetver
  response: 'OK devinfo paramsetver "{version}"'

- id: devinfo_version
  label: Query Firmware Version
  kind: action
  params: []
  command: devinfo version
  response: 'OK devinfo version "{version}"'

- id: devinfo_productname
  label: Query Product Name
  kind: action
  params: []
  command: devinfo productname
  response: 'OK devinfo productname "{name}"'

- id: devinfo_serialno
  label: Query Serial Number
  kind: action
  params: []
  command: devinfo serialno
  response: 'OK devinfo serialno "{serial}"'

- id: devinfo_deviceid
  label: Query Device ID
  kind: action
  params: []
  command: devinfo deviceid
  response: 'OK devinfo deviceid "{id}"'

- id: devinfo_devicename
  label: Query Device Name
  kind: action
  params: []
  command: devinfo devicename
  response: 'OK devinfo devicename "{name}"'

- id: event_set_time_old
  label: Set Device Time (Old Format)
  kind: action
  params:
    - name: datetime
      type: string
      description: "yyyy/mm/dd hh:mm:ss"
  command: 'event MTX:AbsoluteTime "{datetime}"'
  response: 'OK event MTX:AbsoluteTime "caught"'
  description: Sets device clock using legacy MTX:AbsoluteTime path. Invalid on EXi8/EXo8.

- id: event_set_time
  label: Set Device Time
  kind: action
  params:
    - name: datetime
      type: string
      description: "yyyy/mm/dd hh:mm:ss"
  command: 'event MTX:SetAbsoluteTime "{datetime}"'
  response: 'OK event MTX:SetAbsoluteTime "caught"'
  description: Sets device clock (new format). Invalid on EXi8/EXo8.

- id: event_get_time
  label: Query Device Time
  kind: action
  params: []
  command: 'event MTX:GetAbsoluteTime ""'
  response: 'OK event MTX:GetAbsoluteTime "{datetime}"'
  description: Invalid on EXi8/EXo8.

- id: event_dst_enable
  label: Set DST Enable/Disable
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]
      description: DST enabled state
  command: 'event MTX:DSTSetEnable "{state}"'
  response: 'OK event MTX:DSTSetEnable "{state}"'
  description: Invalid on XMV, EXi8, EXo8.

- id: event_dst_enable_query
  label: Query DST Enable/Disable Setting
  kind: query
  params: []
  command: 'event MTX:DSTGetEnable ""'
  response: 'OK event MTX:DSTGetEnable "{enable|disable}"'
  description: Queries configured DST enable state. Invalid on XMV, EXi8, EXo8.

- id: event_dst_status_query
  label: Query DST Working Status
  kind: query
  params: []
  command: 'event MTX:DSTGetStatus ""'
  response: 'OK event MTX:DSTGetStatus "{on|off}"'
  description: Queries whether DST is currently in effect. Invalid on XMV, EXi8, EXo8.

- id: event_dst_offset_set
  label: Set DST Offset Time
  kind: action
  params:
    - name: hh
      type: integer
      description: "Hour offset (0 to 2)"
    - name: mm
      type: integer
      description: "Minute offset (0 to 59)"
  command: 'event MTX:DSTSetOffset "offset={hh}:{mm}"'
  response: 'OK event MTX:DSTSetOffset "offset={hh}:{mm}"'
  description: Sets DST offset (up to 2 hours). Invalid on XMV, EXi8, EXo8.

- id: event_dst_offset_query
  label: Query DST Offset Time
  kind: query
  params: []
  command: 'event MTX:DSTGetOffset ""'
  response: 'OK event MTX:DSTGetOffset "offset={hh}:{mm}"'
  description: Invalid on XMV, EXi8, EXo8.

- id: event_dst_start_time_set
  label: Set DST Start Time
  kind: action
  params:
    - name: hh
      type: integer
      description: "Hour (0 to 23)"
    - name: mm
      type: integer
      description: "Minute (0 to 59)"
  command: 'event MTX:DSTSetStartTime "time={hh}:{mm}"'
  response: 'OK event MTX:DSTSetStartTime "time={hh}:{mm}"'
  description: Invalid on XMV, EXi8, EXo8.

- id: event_dst_start_time_query
  label: Query DST Start Time
  kind: query
  params: []
  command: 'event MTX:DSTGetStartTime ""'
  response: 'OK event MTX:DSTGetStartTime "time={hh}:{mm}"'
  description: Invalid on XMV, EXi8, EXo8.

- id: event_dst_end_time_set
  label: Set DST End Time
  kind: action
  params:
    - name: hh
      type: integer
      description: "Hour (0 to 23)"
    - name: mm
      type: integer
      description: "Minute (0 to 59)"
  command: 'event MTX:DSTSetEndTime "time={hh}:{mm}"'
  response: 'OK event MTX:DSTSetEndTime "time={hh}:{mm}"'
  description: Invalid on XMV, EXi8, EXo8.

- id: event_dst_end_time_query
  label: Query DST End Time
  kind: query
  params: []
  command: 'event MTX:DSTGetEndTime ""'
  response: 'OK event MTX:DSTGetEndTime "time={hh}:{mm}"'
  description: Invalid on XMV, EXi8, EXo8.

- id: event_dst_days_set_dayweek
  label: Set DST Start/End Days (day and week)
  kind: action
  params:
    - name: s_weekindex
      type: enum
      values: [First, Second, Third, Fourth, Fifth, Last]
      description: Start week index
    - name: s_day
      type: enum
      values: [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
      description: Start day of week
    - name: s_month
      type: enum
      values: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
      description: Start month
    - name: e_weekindex
      type: enum
      values: [First, Second, Third, Fourth, Fifth, Last]
      description: End week index
    - name: e_day
      type: enum
      values: [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
      description: End day of week
    - name: e_month
      type: enum
      values: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
      description: End month
  command: 'event MTX:DSTSetDayWeek "s_weekindex={s_weekindex}|s_day={s_day}|s_month={s_month}|e_weekindex={e_weekindex}|e_day={e_day}|e_month={e_month}"'
  response: 'OK event MTX:DSTSetDayWeek "..."'
  description: Sets DST start/end days by nth weekday of month. Invalid on XMV, EXi8, EXo8.

- id: event_dst_days_query_dayweek
  label: Query DST Start/End Days (day and week)
  kind: query
  params: []
  command: 'event MTX:DSTGetDayWeek ""'
  response: 'OK event MTX:DSTGetDayWeek "s_weekindex=...|s_day=...|s_month=...|e_weekindex=...|e_day=...|e_month=..."'
  description: Returns error if DST configured by "day" not "day and week". Invalid on XMV, EXi8, EXo8.

- id: event_dst_days_set_day
  label: Set DST Start/End Days (fixed date)
  kind: action
  params:
    - name: s_month
      type: enum
      values: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
      description: Start month
    - name: s_date
      type: integer
      description: "Start day of month (1 to 31)"
    - name: e_month
      type: enum
      values: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec]
      description: End month
    - name: e_date
      type: integer
      description: "End day of month (1 to 31)"
  command: 'event MTX:DSTSetDay "s_month={s_month}|s_date={s_date}|e_month={e_month}|e_date={e_date}"'
  response: 'OK event MTX:DSTSetDay "..."'
  description: Sets DST start/end days by fixed date. Invalid on XMV, EXi8, EXo8.

- id: event_dst_days_query_day
  label: Query DST Start/End Days (fixed date)
  kind: query
  params: []
  command: 'event MTX:DSTGetDay ""'
  response: 'OK event MTX:DSTGetDay "s_month=...|s_date=...|e_month=...|e_date=..."'
  description: Returns error if DST configured by "day and week" not "day". Invalid on XMV, EXi8, EXo8.

- id: event_dst_days_setting_query
  label: Query DST Day Format Setting
  kind: query
  params: []
  command: 'event MTX:DSTGetDaySetting ""'
  response: 'OK event MTX:DSTGetDaySetting "setting={dayweek|day}"'
  description: Returns which DST day format is currently configured. Invalid on XMV, EXi8, EXo8.

- id: audio_player_get_current_dir
  label: Query Audio Player Current Folder
  kind: query
  params: []
  command: 'event MTX:AudioPlayerGetCurrentDir ""'
  response: 'OK event MTX:AudioPlayerGetCurrentDir "dirpath={path}|dirname={name}|subdirnum={n}|filenum={n}"'
  description: Queries current folder info. OKm with "sdcard is not inserted" if no SD card. MTX/MRX only.

- id: audio_player_set_current_dir
  label: Move Audio Player Current Folder
  kind: action
  params:
    - name: dirpath
      type: string
      description: "Directory path in index expression (0 for root, 0/nnnn for sub folder)"
  command: 'event MTX:AudioPlayerSetCurrentDir "dirpath={dirpath}"'
  response: 'OK event MTX:AudioPlayerSetCurrentDir "dirpath=...|dirname=...|subdirnum=...|filenum=..."'
  description: Moves current folder. Only root and one level of subfolders supported. MTX/MRX only.

- id: audio_player_get_dir_name
  label: Query Audio Player Folder Name
  kind: query
  params:
    - name: dirindex
      type: integer
      description: Folder index number
  command: 'event MTX:AudioPlayerGetDirName "dirindex={dirindex}"'
  response: 'OK event MTX:AudioPlayerGetDirName "dirname={name}"'
  description: Queries folder name by index. Valid only when current folder is root. MTX/MRX only.

- id: audio_player_get_file_name
  label: Query Audio Player File Name
  kind: query
  params:
    - name: fileindex
      type: integer
      description: File index number
  command: 'event MTX:AudioPlayerGetFileName "fileindex={fileindex}"'
  response: 'OK event MTX:AudioPlayerGetFileName "filename={name}"'
  description: Queries file name by index in current folder. MTX/MRX only.

- id: audio_player_get_dir_name_list
  label: Query Audio Player Folder Name List
  kind: query
  params:
    - name: first
      type: integer
      description: First index of desired range
    - name: last
      type: integer
      description: Last index of desired range
  command: 'event MTX:AudioPlayerGetDirNameList "dirindex={first}-{last}"'
  response: 'OK event MTX:AudioPlayerGetDirNameList "dirindex={first}-{last}|dirname0=...|..."'
  description: Queries multiple folder names in a range. MTX/MRX only.

- id: audio_player_get_file_name_list
  label: Query Audio Player File Name List
  kind: query
  params:
    - name: first
      type: integer
      description: First index of desired range
    - name: last
      type: integer
      description: Last index of desired range
  command: 'event MTX:AudioPlayerGetFileNameList "fileindex={first}-{last}"'
  response: 'OK event MTX:AudioPlayerGetFileNameList "fileindex={first}-{last}|filename0=...|..."'
  description: Queries multiple file names in a range. MTX/MRX only.

- id: audio_player_get_play_mode
  label: Query Audio Player Play Mode
  kind: query
  params: []
  command: 'event MTX:AudioPlayerGetPlayMode ""'
  response: 'OK event MTX:AudioPlayerGetPlayMode "playmode={mode}"'
  description: Queries current play mode. MTX/MRX only.

- id: audio_player_set_play_mode
  label: Set Audio Player Play Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [one, "repeat one", all, "repeat all", shuffle]
      description: Play mode
  command: 'event MTX:AudioPlayerSetPlayMode "playmode={mode}"'
  description: Sets audio player play mode (MTX/MRX only)

- id: audio_player_get_status
  label: Query Audio Player Playback Status
  kind: query
  params: []
  command: 'event MTX:AudioPlayerGetStatus ""'
  response: 'OK event MTX:AudioPlayerGetStatus "status={stop|play|pause}"'
  description: Queries playback status. MTX/MRX only.

- id: audio_player_transport
  label: Audio Player Transport Control
  kind: action
  params:
    - name: operation
      type: enum
      values: [play, stop, pause, prev, next]
      description: Transport operation (prev = beginning of previous song, next = next song)
  command: 'event MTX:AudioPlayerTransport "operation={operation}"'
  description: Controls audio player playback (MTX/MRX only; invalid on XMV/EXi8/EXo8)

- id: audio_player_get_current_song
  label: Query Audio Player Current Song
  kind: query
  params: []
  command: 'event MTX:AudioPlayerGetCurrentSong ""'
  response: 'OK event MTX:AudioPlayerGetCurrentSong "dirpath={path}|dirname={name}|fileindex={n}|filename={name}"'
  description: Queries currently playing or selected song. MTX/MRX only.

- id: audio_player_set_current_song
  label: Set Audio Player Current Song
  kind: action
  params:
    - name: dirpath
      type: string
      description: Directory path in index expression (e.g. 0/1)
    - name: fileindex
      type: integer
      description: File index number
  command: 'event MTX:AudioPlayerSetCurrentSong "dirpath={dirpath}|fileindex={fileindex}"'
  response: 'OK event MTX:AudioPlayerSetCurrentSong "dirpath=...|dirname=...|fileindex=...|filename=..."'
  description: Selects song for playback (MTX/MRX only)

- id: editor_sync_status_query
  label: Query MTX Editor Synchronization Status
  kind: query
  params: []
  command: 'event MTX:SynchronizationGetStatus ""'
  response: 'OK event MTX:SynchronizationGetStatus "{active|inactive}"'
  description: Queries sync status with MTX Editor. Invalid on XMV, EXi8, EXo8.

- id: event_log_number_query
  label: Query Alert Event Log Count
  kind: query
  params: []
  command: 'event MTX:EventLogGetLogNumber ""'
  response: 'OK event MTX:EventLogGetLogNumber "lognum={count}"'
  description: Queries number of alert event log entries.

- id: event_log_query
  label: Query Alert Event Log Entry
  kind: query
  params:
    - name: logindex
      type: integer
      description: Index number of event log
  command: 'event MTX:EventLogGetLog "logindex={logindex}"'
  response: 'OK event MTX:EventLogGetLog "log{n}={AlertData}"'
  description: "Queries one event log entry. AlertData format: {flt|err|wrn}/message// xnnn onf (sssss) ID-xxx yyyy/mm/dd hh:mm:ss"

- id: event_log_list_query
  label: Query Alert Event Log as List
  kind: query
  params:
    - name: first
      type: integer
      description: First index of desired range
    - name: last
      type: integer
      description: Last index of desired range (max 10 logs per query)
  command: 'event MTX:EventLogGetLogList "logindex={first}-{last}"'
  response: 'OK event MTX:EventLogGetLogList "logindex={first}-{last}|log0=(AlertData)|log1=(AlertData)|..."'
  description: Queries up to 10 event log entries in a range.

- id: event_log_clear
  label: Clear Alert Event Log
  kind: action
  params: []
  command: 'event MTX:EventLogClear ""'
  response: 'OK event MTX:EventLogClear "lognum=0"'
  description: Clears the alert event log
```

## Feedbacks
```yaml
- id: run_mode
  type: enum
  values: [normal, emergency, update]
  description: Current device run mode (via devstatus runmode or NOTIFY devstatus runmode)

- id: error_status
  type: string
  description: "Alert status string: none, or flt/err/wrn with details (via devstatus error or NOTIFY devstatus error)"

- id: sampling_frequency
  type: enum
  values: [unknown, "44.1kHz", "48kHz"]
  description: Current sampling frequency (via devstatus fs or NOTIFY devstatus fs)

- id: word_clock_status
  type: enum
  values: [lock, unlock]
  description: Word clock lock status (via devstatus lockstatus or NOTIFY devstatus lockstatus)

- id: parameter_change
  type: string
  description: "Parameter change notification via NOTIFY set or NOTIFY setn. Address format: MTX:mem_MemNo/.../PrmNo/IndexNo or MTX:Index_IndexNo. Includes raw or normalized value."

- id: meter_level
  type: string
  description: "Meter data via NOTIFY mtr. Values are 2-digit hexadecimal per channel. Address: MTX:mtr_MemNo/UniqueId/meter or MTX:Index_IndexNo."

- id: preset_current
  type: integer
  description: Current preset index number (via NOTIFY sscurrent)

- id: preset_recall_status
  type: integer
  description: Preset recall in progress notification (via NOTIFY ssrecall with index)

- id: snapshot_current
  type: integer
  description: Current snapshot index from Remote Control Setup List, MRX7-D only (via NOTIFY sscurrent_ex)

- id: snapshot_recall_status
  type: integer
  description: Snapshot recall in progress, MRX7-D only (via NOTIFY ssrecall_ex)

- id: media_event
  type: enum
  values: ["sdcard=inserted", "sdcard=extracted"]
  description: SD card insertion/removal notification (via NOTIFY event MTX:Media; invalid on XMV/EXi8/EXo8)

- id: synchronization_status
  type: enum
  values: [active, inactive]
  description: MTX Editor synchronization status (via NOTIFY event MTX:SynchronizationSetStatus; invalid on XMV/EXi8/EXo8)

- id: audio_player_play_mode
  type: enum
  values: [one, "repeat one", all, "repeat all", shuffle]
  description: Audio player play mode change notification (MTX/MRX only)

- id: audio_player_transport
  type: enum
  values: [play, stop, pause, prev, next]
  description: Audio player transport state notification (MTX/MRX only)

- id: audio_player_current_song
  type: string
  description: "Playback song designation change (via NOTIFY event MTX:AudioPlayerSetCurrentSong; MTX/MRX only). Format: dirpath=...|dirname=...|fileindex=...|filename=..."

- id: dst_status
  type: string
  description: "DST enable/disable, offset, start/end time notifications (via NOTIFY event MTX:DSTSet*)"

- id: dst_days_setting
  type: string
  description: "DST start/end day setting change (day/week via NOTIFY event MTX:DSTSetDayWeek, or day via NOTIFY event MTX:DSTSetDay). Invalid on XMV, EXi8, EXo8."
```

## Variables
```yaml
- id: parameter_raw
  type: integer
  description: "Any addressed parameter value (raw). Address path: MTX:mem_MemNo/UniqueId/ElmNo/Xpos/Ypos/PrmNo/IndexNo (MTX/MTX5/XMV/EX) or MTX:Index_IndexNo (MRX7-D). Ranges vary by parameter - see section 7 Parameter List."

- id: parameter_normalized
  type: integer
  description: "Any addressed parameter value (normalized 0-1000). Same address scheme as raw."

- id: fader_level
  type: integer
  description: "Fader-type parameter. Raw range -13801 to +1000 (represents -Infinity to +10dB). Normalized 0 to 1000. Supports relative setr command."

- id: scheduler_state
  type: enum
  values: ["1", "0"]
  description: "Event scheduler on/off state (1=on, 0=off) at MTX:EvntScd_On. Invalid on XMV, EXi8, EXo8."
```

## Events
```yaml
- id: notify_devstatus_runmode
  description: "Unsolicited run mode change: NOTIFY devstatus runmode \"{mode}\""
  trigger: Device run mode changes

- id: notify_devstatus_error
  description: "Unsolicited error/alert: NOTIFY devstatus error \"{flt|err|wrn}/message// xnnn onf (sssss) ID-xxx yyyy/mm/dd hh:mm:ss\""
  trigger: Alert condition occurs or clears

- id: notify_devstatus_fs
  description: "Unsolicited Fs change: NOTIFY devstatus fs \"{fs}\""
  trigger: Sampling frequency changes

- id: notify_devstatus_lockstatus
  description: "Unsolicited word clock change: NOTIFY devstatus lockstatus \"{status}\""
  trigger: Word clock lock status changes

- id: notify_set
  description: "Unsolicited parameter change (raw): NOTIFY set {address} 0 0 {value} \"{string}\""
  trigger: Any parameter changes on device (including from other controllers)

- id: notify_setn
  description: "Unsolicited parameter change (normalized): NOTIFY setn {address} 0 0 {value} \"{string}\""
  trigger: Any parameter changes on device

- id: notify_mtr
  description: "Periodic meter data: NOTIFY mtr {address} {type} {hex_values...}"
  trigger: After mtrstart; at configured interval

- id: notify_sscurrent
  description: "Preset number changed: NOTIFY sscurrent {index}"
  trigger: Preset recall completes or preset changes

- id: notify_ssrecall
  description: "Preset recall started: NOTIFY ssrecall {index}"
  trigger: Preset recall begins

- id: notify_sscurrent_ex
  description: "Snapshot changed (MRX7-D only): NOTIFY sscurrent_ex list {index}"
  trigger: Snapshot recall completes

- id: notify_ssrecall_ex
  description: "Snapshot recall started (MRX7-D only): NOTIFY ssrecall_ex list {index}"
  trigger: Snapshot recall begins

- id: notify_event_media
  description: "SD card event: NOTIFY event MTX:Media \"sdcard={inserted|extracted}\""
  trigger: SD card insertion or removal (invalid on XMV/EXi8/EXo8)

- id: notify_event_time_old
  description: "Time sync <old format>: NOTIFY event MTX:AbsoluteTime \"yyyy/mm/dd hh:mm:ss\""
  trigger: Device clock changed via old-format command (invalid on EXi8/EXo8)

- id: notify_event_time_new
  description: "Time sync <new format>: NOTIFY event MTX:SetAbsoluteTime \"yyyy/mm/dd hh:mm:ss\""
  trigger: Device clock changed via SetAbsoluteTime command (invalid on EXi8/EXo8)

- id: notify_event_dst_enable
  description: "DST enable change: NOTIFY event MTX:DSTSetEnable \"{enable|disable}\""
  trigger: DST enable/disable setting changed (invalid on XMV/EXi8/EXo8)

- id: notify_event_dst_offset
  description: "DST offset change: NOTIFY event MTX:DSTSetOffset \"offset=hh:mm\""
  trigger: DST offset time changed (invalid on XMV/EXi8/EXo8)

- id: notify_event_dst_start_time
  description: "DST start time change: NOTIFY event MTX:DSTSetStartTime \"time=hh:mm\""
  trigger: DST start time changed (invalid on XMV/EXi8/EXo8)

- id: notify_event_dst_end_time
  description: "DST end time change: NOTIFY event MTX:DSTSetEndTime \"time=hh:mm\""
  trigger: DST end time changed (invalid on XMV/EXi8/EXo8)

- id: notify_event_dst_dayweek
  description: "DST days change (day/week): NOTIFY event MTX:DSTSetDayWeek \"s_weekindex=...|...\""
  trigger: DST start/end day-and-week setting changed (invalid on XMV/EXi8/EXo8)

- id: notify_event_dst_day
  description: "DST days change (day): NOTIFY event MTX:DSTSetDay \"s_month=...|...\""
  trigger: DST start/end fixed-date setting changed (invalid on XMV/EXi8/EXo8)

- id: notify_event_play_mode
  description: "Song play mode change: NOTIFY event MTX:AudioPlayerSetPlayMode \"playmode={mode}\""
  trigger: Audio player play mode changes (MTX/MRX only)

- id: notify_event_transport
  description: "Transport operation: NOTIFY event MTX:AudioPlayerTransport \"operation={play|stop|pause}\""
  trigger: Audio player transport operated (MTX/MRX only)

- id: notify_event_current_song
  description: "Playback song change: NOTIFY event MTX:AudioPlayerSetCurrentSong \"dirpath=...|dirname=...|fileindex=...|filename=...\""
  trigger: Playback song designation changed (MTX/MRX only)

- id: notify_event_sync
  description: "Editor sync: NOTIFY event MTX:SynchronizationSetStatus \"{active|inactive}\""
  trigger: MTX Editor synchronization starts/stops
```

## Macros
```yaml
- id: communication_start
  description: >
    Communication start sequence (section 4.1):
    1. Connect via TCP (port 49280) or RS-232C.
    2. Send: devstatus runmode
    3. Await response: OK devstatus runmode "normal"
    4. Device is now ready to accept commands.
    If response is not "normal", device is in emergency or update mode.

- id: parameter_sync
  description: >
    Parameter sync sequence (section 4.2):
    After connection established, query all needed parameters via get/getn
    to synchronize controller state with device state.

- id: preset_recall_sequence
  description: >
    Preset recall sequence (section 4.5):
    1. Send: ssrecall {index}
    2. Await: OK ssrecall {index}
    3. Device sends NOTIFY ssrecall {index} (recall started)
    4. Device sends NOTIFY sscurrent {index} (recall complete)
    5. Device sends NOTIFY set/setn for each changed parameter
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "After devmode emergency, device operates in emergency mode - verify intentional before sending"
  - "SD Card should not be removed when the MTX is powered on"
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- **Command syntax:** `<command> <option1> <option2> ... <optionN><LF>`. Each command terminated with LF (0x0A). Bare LF serves as heartbeat when keepalive is active.
- **Escaping:** Double-quote strings with `\"`; backslash with `\\`.
- **Parameter addressing (MTX3/MTX5-D/XMV/EXi8/EXo8):** `MTX:mem_MemNo/UniqueId/ElmNo/Xpos/Ypos/PrmNo/IndexNo` — all fields from section 7 Parameter List.
- **Parameter addressing (MRX7-D):** `MTX:Index_IndexNo` — index-based, requires Remote Control Setup List configured in MTX-MRX Editor.
- **Value modes:** Raw (integer, parameter-specific range), Normalized (0–1000, default resolution adjustable via `scpmode resolution`), and Relative (fader parameters only, via `setr`). For setn, value 1023 makes resolution equal to raw.
- **OKm vs OK:** Response `OKm` indicates the requested value was clamped to the valid range, OR for audio-player/event-log commands that no SD card is inserted or the playback song is not specified.
- **Max connections:** 9 simultaneous controllers on MTX/MRX (8 TCP + 1 RS-232); 8 TCP on standalone XMV/EX.
- **MRX7-D Remote Control Setup List:** Must be created in MTX-MRX Editor and uploaded to MRX7-D before external parameter control works. The list maps index numbers to specific parameters.
- **Dante mode on MTX5-D:** In Daisy Chain mode, either NETWORK connector can be used. In Redundant mode, only Primary NETWORK + RS-232.
- **RS-232 baud rate:** Configurable to 38400 or 115200 via MTX-MRX Editor. XMV/EXi8/EXo8 have no REMOTE connector (TCP only).
- **Audio player commands** (3-27 through 3-39) are invalid on XMV, EXi8, EXo8.
- **Preset/snapshot commands** (2-19, 2-20, 3-8, 3-9) are invalid on XMV, EXi8, EXo8.
- **Snapshot commands** (1-10, 1-11, 2-21) are MRX7-D only.
- **DST/scheduler/media/sync event commands** are invalid on XMV, EXi8, EXo8 — see Remarks column in section 2 Command List.
- **DST day queries are mode-sensitive:** `DSTGetDayWeek` returns an error if DST is configured by fixed date; `DSTGetDay` returns an error if configured by day-and-week. Use `DSTGetDaySetting` first to determine which mode is active.
- **Event log:** Indices range 0 to (total − 1); list queries return at most 10 entries; first index must be ≤ last index.

<!-- UNRESOLVED: Full parameter address tables (section 7) contain hundreds of entries with MemNo, UniqueId, ElmNo, Xpos, Ypos, PrmNo per parameter — too extensive to list individually. See source document sections 7.1–7.6. -->
<!-- UNRESOLVED: Meter address tables (section 8) list all meter UniqueIds per device model. -->
<!-- UNRESOLVED: Fader parameter dB-to-raw-value lookup tables (section 6.1) cover -Infinity to +10dB range with precise mapping. -->
<!-- UNRESOLVED: XMV-specific parameters (InputSelect, ATT, DigitalInputSensitivity, Power) in section 7.3. -->
<!-- UNRESOLVED: XMV power on/off command behavior (Power parameter in XMV parameter list). -->
````

Upgrade done. Added 28 missing actions: scheduler query (2-12), old-format time set (3-10), DST query family (3-14..3-26), audio player folder/file/status/current-song queries (3-27..3-33, 3-35, 3-37), editor sync query (3-39), event log queries (3-40..3-42). Fixed `audio_player_transport` enum (added `prev`/`next`) and `event_log_clear` response (`lognum=0`). Added 8 missing DST/time Events + current-song Feedback. Preserved all existing IDs/shapes.

## Provenance

```yaml
source_domains:
  - usa.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/5/1343735/200330_mtx_mrx_xmv_ex_rcps_v400_rev14_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/1/313111/AMX_Control_Module_MTX5-D.zip
  - https://usa.yamaha.com/files/download/other_assets/2/1204842/Crestron_module_MRX7-D.zip
  - https://usa.yamaha.com/files/download/other_assets/6/1209076/Crestron_module_MTXseries_v.1.2.zip
retrieved_at: 2026-07-17T07:06:34.199Z
last_checked_at: 2026-07-22T08:08:44.558Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:08:44.558Z
matched_actions: 65
action_count: 65
confidence: medium
summary: "All 65 spec actions map 1:1 to the source's Section 2.2/2.3 command tables (devstatus/devmode/scpmode/get/set/setr/mtr/ss*/devinfo/event MTX:* families) with matching command strings, response shapes, and enums; transport (port 49280, RS-232 8N1 38400/115200) confirmed verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MRX7-D uses an index-based parameter addressing scheme (Remote Control Setup List) that must be configured in MTX-MRX Editor before external control — the mapping is device-specific and not enumerable from the protocol spec alone"
- "XMV-specific parameter details (InputSelect, ATT, DigitalATT) are in section 7.3 but not fully extracted here"
- "no explicit safety interlock procedures documented in source"
- "Full parameter address tables (section 7) contain hundreds of entries with MemNo, UniqueId, ElmNo, Xpos, Ypos, PrmNo per parameter — too extensive to list individually. See source document sections 7.1–7.6."
- "Meter address tables (section 8) list all meter UniqueIds per device model."
- "Fader parameter dB-to-raw-value lookup tables (section 6.1) cover -Infinity to +10dB range with precise mapping."
- "XMV-specific parameters (InputSelect, ATT, DigitalInputSensitivity, Power) in section 7.3."
- "XMV power on/off command behavior (Power parameter in XMV parameter list)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
