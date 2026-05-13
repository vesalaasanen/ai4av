---
spec_id: admin/philips-ltc-8300-video-matrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips LTC 8300 Control Spec"
manufacturer: Philips
model_family: "LTC 8300"
aliases: []
compatible_with:
  manufacturers:
    - Philips
  models:
    - "LTC 8300"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ptzprotocols.com
  - portal.7thsense.one
retrieved_at: 2026-04-30T14:19:23.110Z
last_checked_at: 2026-04-30T15:28:15.212Z
generated_at: 2026-04-30T15:28:15.212Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:28:15.212Z
  matched_actions: 121
  action_count: 121
  confidence: high
  summary: "All 121 spec actions match documented CCL commands; transport verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-28
---

# Philips LTC 8300 Control Spec

## Summary
Allegiant Series CCTV matrix switcher controlled via RS-232C integral console port. Supports switching, sequencing, alarm management, receiver/driver PTZ control, and on-screen display management. Default serial: 19200/8/1/none.

<!-- UNRESOLVED: TCP/IP, HTTP, or REST control not documented in source — RS-232 only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # Note: 1200 baud on CPU revisions < 7.2
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: on  # hardware handshake; can be defeated with jumper on pins 4&5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable       # switching commands (LCM, MON+CAM)
- queryable      # status commands (ALM-STATUS, MON-STATUS, SEQ-STATUS, KBD-STATUS)
- levelable      # VARSPEED_PTZ, auxiliary latching
```

## Actions
```yaml
- id: lcm
  label: Switch Logical Camera to Monitor
  kind: action
  params:
    - name: logical_camera
      type: integer
      description: Logical camera number (1-288 for LTC 8300)
    - name: logical_monitor
      type: integer
      description: Logical monitor number

- id: lcm_plus
  label: Switch Logical Camera to Monitor with On-Screen Title
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: logical_monitor
      type: integer

- id: lcm_minus
  label: Switch Logical Camera to Monitor with No On-Screen Title
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: logical_monitor
      type: integer

- id: lcmp
  label: Switch Logical Camera to Monitor with Pre-position
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: logical_monitor
      type: integer
    - name: pre_position
      type: integer
      description: Pre-position number

- id: x_titles
  label: Override On-Screen Titles Temporarily
  kind: action
  params:
    - name: index_monitor
      type: integer
    - name: index_camera
      type: integer
    - name: top_text
      type: string
      description: Up to 16 characters; use -1 to skip, 0 to restore
    - name: bottom_text
      type: string
      description: Up to 16 characters; use -1 to skip, 0 to restore

- id: mon_cam
  label: Switch Physical Camera to Monitor
  kind: action
  params:
    - name: physical_monitor
      type: integer
    - name: physical_camera
      type: integer

- id: mon_run
  label: Run Sequence by Monitor Number
  kind: action
  params:
    - name: monitor
      type: integer

- id: run
  label: Run Sequence by Keyboard Number
  kind: action
  params:
    - name: keyboard
      type: integer
      description: Keyboard port number on Allegiant main bay

- id: mon_hold
  label: Hold Sequence by Monitor Number
  kind: action
  params:
    - name: monitor
      type: integer

- id: hold
  label: Hold Sequence by Keyboard Number
  kind: action
  params:
    - name: keyboard
      type: integer

- id: mon_next
  label: Step Sequence Forward by Monitor Number
  kind: action
  params:
    - name: monitor
      type: integer

- id: next
  label: Step Sequence Forward by Keyboard Number
  kind: action
  params:
    - name: keyboard
      type: integer

- id: mon_prev
  label: Step Sequence Backward by Monitor Number
  kind: action
  params:
    - name: monitor
      type: integer

- id: prev
  label: Step Sequence Backward by Keyboard Number
  kind: action
  params:
    - name: keyboard
      type: integer

- id: seq_req
  label: Load Sequence onto Monitor
  kind: action
  params:
    - name: sequence
      type: integer
      description: Sequence number (1-60)
    - name: monitor
      type: integer

- id: seq_uld
  label: Unload Sequence from Monitor
  kind: action
  params:
    - name: monitor
      type: integer

- id: del_seq
  label: Delete Sequence
  kind: action
  params:
    - name: sequence
      type: integer

- id: dir
  label: Request Sequence Summary Table
  kind: action
  params: []

- id: chg_mon
  label: Change Keyboard Monitor Control
  kind: action
  params:
    - name: monitor
      type: integer
    - name: keyboard
      type: integer

- id: mon_cam_kbd
  label: Change Keyboard Monitor and Camera
  kind: action
  params:
    - name: monitor
      type: integer
    - name: keyboard
      type: integer
    - name: camera
      type: integer

- id: kbd_logon
  label: Log Keyboard On
  kind: action
  params:
    - name: keyboard
      type: integer
    - name: user_index
      type: integer

- id: kbd_logoff
  label: Log Keyboard Off
  kind: action
  params:
    - name: keyboard
      type: integer

- id: lock_mon_usr
  label: Set Monitor-to-User Block Lockout
  kind: action
  params:
    - name: monitor
      type: integer
    - name: user_bitmap
      type: string
      description: Hex bit-map of restricted users

- id: lock_cam_usr
  label: Set Camera-to-User Block Lockout
  kind: action
  params:
    - name: index_camera
      type: integer
    - name: user_bitmap
      type: string

- id: lock_rem_usr
  label: Set Remote-to-User Block Lockout
  kind: action
  params:
    - name: index_remote
      type: integer
    - name: user_bitmap
      type: string

- id: lock_kbd_usr
  label: Set Keyboard-to-User Block Lockout
  kind: action
  params:
    - name: keyboard
      type: integer
    - name: user_bitmap
      type: string

- id: lock_mon_kbd
  label: Set Monitor-to-Keyboard Block Lockout
  kind: action
  params:
    - name: monitor
      type: integer
    - name: keyboard_bitmap
      type: string

- id: lock_cam_kbd
  label: Set Camera-to-Keyboard Block Lockout
  kind: action
  params:
    - name: index_camera
      type: integer
    - name: keyboard_bitmap
      type: string

- id: lock_rem_kbd
  label: Set Remote-to-Keyboard Block Lockout
  kind: action
  params:
    - name: index_remote
      type: integer
    - name: keyboard_bitmap
      type: string

- id: set_mon_usr_lock
  label: Set Monitor-to-User Individual Lockout
  kind: action
  params:
    - name: monitor
      type: integer
    - name: index_user
      type: integer
    - name: lock_data
      type: integer
      description: "1 = locked, 0 = unlocked"

- id: set_cam_usr_lock
  label: Set Camera-to-User Individual Lockout
  kind: action
  params:
    - name: index_camera
      type: integer
    - name: index_user
      type: integer
    - name: lock_data
      type: integer

- id: set_rem_usr_lock
  label: Set Remote-to-User Individual Lockout
  kind: action
  params:
    - name: index_remote
      type: integer
    - name: index_user
      type: integer
    - name: lock_data
      type: integer

- id: set_kbd_usr_lock
  label: Set Keyboard-to-User Individual Lockout
  kind: action
  params:
    - name: keyboard
      type: integer
    - name: index_user
      type: integer
    - name: lock_data
      type: integer

- id: set_mon_kbd_lock
  label: Set Monitor-to-Keyboard Individual Lockout
  kind: action
  params:
    - name: monitor
      type: integer
    - name: keyboard
      type: integer
    - name: lock_data
      type: integer

- id: set_cam_kbd_lock
  label: Set Camera-to-Keyboard Individual Lockout
  kind: action
  params:
    - name: index_camera
      type: integer
    - name: keyboard
      type: integer
    - name: lock_data
      type: integer

- id: set_rem_kbd_lock
  label: Set Remote-to-Keyboard Individual Lockout
  kind: action
  params:
    - name: index_remote
      type: integer
    - name: keyboard
      type: integer
    - name: lock_data
      type: integer

- id: lock_monitor
  label: Lock Monitor Based on User Priority
  kind: action
  params:
    - name: monitor
      type: integer
    - name: logical_user
      type: integer

- id: unlock_monitor
  label: Unlock Monitor Based on User Priority
  kind: action
  params:
    - name: monitor
      type: integer
    - name: logical_user
      type: integer

- id: lock_remote
  label: Lock Remote Based on User Priority
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: user_index
      type: integer

- id: unlock_remote
  label: Unlock Remote Based on User Priority
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: user_index
      type: integer

- id: r_c
  label: Receiver/Driver Command
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: opcode
      type: integer
      description: OpCode number (function group)
    - name: data
      type: integer
      description: Data value

- id: remote_action
  label: Simultaneous Pan/Tilt/Zoom Control
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: data1
      type: integer
      description: Bit-mapped control functions
    - name: data2
      type: integer
      description: Bit-mapped control functions

- id: remote_tgl
  label: Toggle Pan/Tilt/Zoom Control
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: data1
      type: integer
    - name: data2
      type: integer

- id: prepos_set
  label: Set Pre-position
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: pre_position
      type: integer
      description: "1-16 (old TC8561), 1-99 (TC8561A/LTC8561)"

- id: prepos
  label: Call Pre-position
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: pre_position
      type: integer

- id: aux_on
  label: Auxiliary On
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: auxiliary
      type: integer

- id: aux_off
  label: Auxiliary Off
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: auxiliary
      type: integer

- id: aux_tgl
  label: Auxiliary Toggle
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: auxiliary
      type: integer

- id: latch_aux_on
  label: Latch Auxiliary On (level adjustment)
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: auxiliary
      type: integer

- id: latch_aux_off
  label: Latch Auxiliary Off (level adjustment)
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: auxiliary
      type: integer

- id: cancel_aux_latch
  label: Cancel Auxiliary Latch
  kind: action
  params:
    - name: logical_camera
      type: integer

- id: varspeed_ptz
  label: Variable Speed PTZ Control
  kind: action
  params:
    - name: logical_camera
      type: integer
    - name: pan_speed
      type: integer
      description: 0-F hex (0=slowest, F=fastest)
    - name: tilt_speed
      type: integer
      description: 0-F hex
    - name: zoom_speed
      type: integer
      description: 0-7 (0=slowest, 7=fastest)
    - name: function_code
      type: integer
      description: Bit-mapped function (all_off=0, pan_right=1, pan_left=2, tilt_down=4, tilt_up=8, zoom_out=16, zoom_in=32, focus_near=64, focus_far=128, iris_close=256, iris_open=512)

- id: alarm_on
  label: Activate Alarm
  kind: action
  params:
    - name: alarm
      type: integer

- id: alarm_off
  label: Deactivate Alarm
  kind: action
  params:
    - name: alarm
      type: integer

- id: mon_ack_alarm
  label: Acknowledge Monitor in Alarm
  kind: action
  params:
    - name: monitor
      type: integer

- id: mon_alm_run
  label: Run Alarm Sequence by Monitor
  kind: action
  params:
    - name: monitor
      type: integer

- id: mon_alm_hold
  label: Hold Alarm Sequence by Monitor
  kind: action
  params:
    - name: monitor
      type: integer

- id: mon_alm_next
  label: Step Alarm Sequence Forward by Monitor
  kind: action
  params:
    - name: monitor
      type: integer

- id: mon_alm_prev
  label: Step Alarm Sequence Backward by Monitor
  kind: action
  params:
    - name: monitor
      type: integer

- id: set_alm_config
  label: Set Alarm Response Mode
  kind: action
  params:
    - name: data
      type: integer
      description: "1=Basic, 2=Autobuild, 3=Sequence & Display"

- id: alarm_tbl
  label: Arm/Disarm Alarm
  kind: action
  params:
    - name: data
      type: integer
      description: Binary progression bitmap
    - name: alarm
      type: integer

- id: group_alarm_tbl
  label: Arm/Disarm Alarm Group
  kind: action
  params:
    - name: data
      type: integer
    - name: alarm
      type: integer

- id: mon_arm
  label: Arm/Disarm Monitors as Group
  kind: action
  params:
    - name: data
      type: integer
      description: Binary progression bitmap

- id: arm_monitors
  label: Arm Specific Range of Monitors
  kind: action
  params:
    - name: start_monitor
      type: integer
    - name: end_monitor
      type: integer

- id: disarm_monitors
  label: Disarm Specific Range of Monitors
  kind: action
  params:
    - name: start_monitor
      type: integer
    - name: end_monitor
      type: integer

- id: review_mon
  label: Set Step & Review Alarm Monitors
  kind: action
  params:
    - name: review_monitor
      type: integer
    - name: step_monitor
      type: integer

- id: enable_custom_alarm
  label: Enable Custom Alarm
  kind: action
  params:
    - name: data1
      type: integer
    - name: data2
      type: integer

- id: disable_custom_alarm
  label: Disable Custom Alarm
  kind: action
  params:
    - name: data1
      type: integer
    - name: data2
      type: integer

- id: alarm_polarity
  label: Define Alarm Input Polarity (LTC 8100/8200/8300 only)
  kind: action
  params:
    - name: data
      type: integer
      description: Binary bit-map; 1=normally closed, 0=normally open

- id: relay_polarity
  label: Define Alarm Relay Output Polarity (LTC 8100/8200/8300 only)
  kind: action
  params:
    - name: data
      type: integer
      description: Binary bit-map; 1=normally closed, 0=normally open

- id: auto_install
  label: Execute Automatic Video Scan
  kind: action
  params: []

- id: install_cam
  label: Enable/Disable Video Monitoring of Input
  kind: action
  params:
    - name: input
      type: integer
      description: Physical BNC input number
    - name: data
      type: integer
      description: "1=enable monitoring, 0=disable"

- id: uninstall_all
  label: Disable Video Monitoring of All Inputs
  kind: action
  params: []

- id: mon_vidloss_response
  label: Enable/Disable Monitors for Video Loss Events
  kind: action
  params:
    - name: monitor_bitmap
      type: integer
    - name: secondary_bitmap
      type: integer

- id: kbd_vidloss_response
  label: Enable/Disable Keyboard for Video Loss Events
  kind: action
  params:
    - name: keyboard_bitmap
      type: integer
    - name: secondary_bitmap
      type: integer

- id: set_time_format_12hr
  label: Set 12-Hour Time Format
  kind: action
  params: []

- id: set_time_format_24hr
  label: Set 24-Hour Time Format
  kind: action
  params: []

- id: set_date_format_standard
  label: Set Date Format (day/month/year)
  kind: action
  params: []

- id: set_date_format_us
  label: Set Date Format (month/day/year)
  kind: action
  params: []

- id: set_date_format_asian
  label: Set Date Format (year/month/day)
  kind: action
  params: []

- id: cam_title
  label: Set Camera Title
  kind: action
  params:
    - name: title
      type: string
      description: Up to 16 characters
    - name: index_camera
      type: integer

- id: cam_xtitle
  label: Set Extended Character Camera Title
  kind: action
  params:
    - name: index_camera
      type: integer
    - name: char_values
      type: array
      items:
        type: integer
      description: 1-16 character values from Allegiant Character ROM

- id: put_msg
  label: Set Monitor Title
  kind: action
  params:
    - name: title
      type: string
      description: Up to 12 characters
    - name: monitor
      type: integer

- id: mon_msg
  label: Select Monitor Title Option
  kind: action
  params:
    - name: monitor
      type: integer

- id: mon_stat
  label: Select Monitor Status Option
  kind: action
  params:
    - name: monitor
      type: integer

- id: camera_control_status
  label: Enable On-Screen Controllable Camera Indicator
  kind: action
  params:
    - name: data
      type: integer
      description: "1=enable, 0=disable"

- id: camera_controllable
  label: Designate Camera as Controllable
  kind: action
  params:
    - name: index_camera
      type: integer
    - name: data
      type: integer
      description: "1=controllable, 0=not controllable"

- id: mon_overlay_pos
  label: Set Monitor Overlay Position
  kind: action
  params:
    - name: monitor
      type: integer
    - name: x
      type: integer
      description: 0-7 (horizontal)
    - name: y
      type: integer
      description: 0-15 (vertical)

- id: mon_ovl_enable
  label: Enable/Disable Monitor Overlay
  kind: action
  params:
    - name: monitor
      type: integer
    - name: data1
      type: integer
      description: Camera number/titles/status display (1=on, 0=off)
    - name: data2
      type: integer
      description: Time/date display (1=on, 0=off)

- id: mon_brightness
  label: Set Monitor Overlay Brightness
  kind: action
  params:
    - name: monitor
      type: integer
    - name: data
      type: integer
      description: 0=full brightness, 3=dimmest

- id: mon_msg_override
  label: Monitor Message Override
  kind: action
  params:
    - name: monitor
      type: integer
    - name: message
      type: string
      description: Up to 12 characters

- id: top_title_override
  label: Override Top Line of On-Screen Display
  kind: action
  params:
    - name: monitor
      type: integer
    - name: text
      type: string
      description: Up to 16 characters

- id: bottom_title_override
  label: Override Bottom Line of On-Screen Display
  kind: action
  params:
    - name: monitor
      type: integer
    - name: text
      type: string
      description: Up to 16 characters

- id: broadcast
  label: Broadcast Message to All Monitors
  kind: action
  params:
    - name: message
      type: string
      description: Up to 24 characters (12 for LTC 8500)

- id: vidloss_sync_gen
  label: Enable Video Loss Raster Generator (LTC 8300/8600/8800/8900)
  kind: action
  params:
    - name: data
      type: integer
      description: "1=enable, 0=disable"

- id: video_format
  label: Set Raster Format
  kind: action
  params:
    - name: data
      type: integer
      description: "1=NTSC, 0=PAL"

- id: revision
  label: Request System Software Revision
  kind: action
  params: []

- id: camera_hash
  label: Request Camera Hash Value
  kind: action
  params: []

- id: hex_mode
  label: Set Hexadecimal Mode
  kind: action
  params: []

- id: decimal_mode
  label: Set Decimal Mode
  kind: action
  params: []

- id: set_time
  label: Set System Time
  kind: action
  params:
    - name: hour
      type: integer
      description: 0-23
    - name: minute
      type: integer
      description: 0-59
    - name: second
      type: integer
      description: 0-59

- id: get_time
  label: Display Time
  kind: action
  params: []

- id: set_date
  label: Set System Date
  kind: action
  params:
    - name: month
      type: integer
    - name: day
      type: integer
    - name: year
      type: integer

- id: get_date
  label: Display Date
  kind: action
  params: []

- id: date_time
  label: Display Date and Time
  kind: action
  params: []

- id: reset_system
  label: Reset System
  kind: action
  params: []

- id: set_rs232
  label: Set Direct RS-232 Port Parameters
  kind: action
  params:
    - name: data1
      type: integer
    - name: data2
      type: integer
    - name: data3
      type: integer
    - name: data4
      type: integer
    - name: data5
      type: integer

- id: get_rs232
  label: Request Direct RS-232 Port Parameters
  kind: action
  params: []

- id: set_port_rs232
  label: Set Indirect RS-232 Port Parameters
  kind: action
  params:
    - name: port
      type: integer
      description: "0=Console, 1-3=expander, 4=Printer, 5-7=expander printer, 8=Alarm"
    - name: data1
      type: integer
    - name: data2
      type: integer
    - name: data3
      type: integer
    - name: data4
      type: integer
    - name: data5
      type: integer

- id: get_port_rs232
  label: Request Indirect RS-232 Port Parameters
  kind: action
  params:
    - name: port
      type: integer

- id: default
  label: Default System to Factory Settings
  kind: action
  params: []

- id: find_log_cam
  label: Display Index Camera Number from Logical
  kind: action
  params:
    - name: logical_camera
      type: integer

- id: get_cam_log_num
  label: Display Logical Camera Number from Index
  kind: action
  params:
    - name: index_camera
      type: integer

- id: beep
  label: Sound Keyboard Beep
  kind: action
  params:
    - name: keyboard
      type: integer

- id: display
  label: Echo Message
  kind: action
  params:
    - name: text
      type: string
      description: Up to 117 characters

- id: print
  label: Print Message
  kind: action
  params:
    - name: text
      type: string

- id: working_cams
  label: Display Detected Cameras (diagnostic)
  kind: action
  params: []

- id: dump_xp
  label: Display Crosspoint Status (diagnostic)
  kind: action
  params: []
- id: dump_flash_map
  label: CPU Flash Memory Check
  kind: action
  params: []
- id: param_tbl
  label: Display CPU Parameter Settings
  kind: query
  params: []
- id: vims_installed
  label: Display Input Module Status
  kind: query
  params: []
- id: trunk_diag
  label: Display Satellite Trunk Status
  kind: query
  params: []
- id: script_debug
  label: Enable/Disable Command Script Debug Mode
  kind: action
  params:
    - name: data
      type: integer
- id: bay_revision
  label: Display Matrix Bay Firmware Revisions
  kind: query
  params: []
- id: debug_cts
  label: Enable ACTS Debugging
  kind: action
  params:
    - name: data
      type: integer
- id: cts_revision
  label: Display ACTS Software Revision
  kind: query
  params: []
- id: cts_cameras
  label: Display ACTS Cameras
  kind: query
  params: []
- id: cts_digital_inputs
  label: Display ACTS Alarm Input States
  kind: query
  params: []
- id: cts_relay_mask
  label: ACTS Relay Output States
  kind: action
  params:
    - name: camera_number
      type: integer
    - name: relay_mask
      type: integer
- id: enable_tevent
  label: Enable Time Event Function
  kind: action
  params:
    - name: first_event
      type: integer
    - name: last_event
      type: integer
- id: disable_tevent
  label: Disable Time Event Function
  kind: action
  params:
    - name: first_event
      type: integer
    - name: last_event
      type: integer
- id: disable_trunk_caching
  label: Enable/Disable Trunk Caching
  kind: action
  params:
    - name: data
      type: integer
- id: find_log_mon
  label: Find Logical Monitor (LTC 8900)
  kind: query
  params:
    - name: logical_monitor
      type: integer
- id: get_mon_log_num
  label: Get Monitor Log Number (LTC 8900)
  kind: query
  params:
    - name: logical_monitor
      type: integer
- id: cts_audio_following
  label: ACTS Audio Following on Monitor
  kind: action
  params:
    - name: monitor
      type: integer
    - name: data1
      type: integer
```

## Feedbacks
```yaml
- id: alm_status
  label: Alarm Status
  type: bitmap
  description: Bitmap of active alarms; 8 bytes for LTC 8300 (64 alarms)

- id: mon_status
  label: Monitor Status (Crosspoint)
  type: bytes
  description: Returns index camera number per monitor (2 bytes per monitor)

- id: seq_status
  label: Sequence Status
  type: bytes
  description: Returns sequence number, user, keyboard, direction, step info per monitor

- id: kbd_status
  label: Keyboard Status
  type: bytes
  description: 5 bytes per keyboard; monitor, user, logon state, installed state, camera

- id: mon_status_line
  label: Monitor Status Line
  type: bytes
  description: 3 bytes per monitor; alarm state, sequence type, armed status, error numbers

- id: video_status
  label: Video Detection Status
  type: bytes
  description: Video present and monitoring status per input

- id: current_mode
  label: RS-232 Port Mode
  type: enum
  values: [NORMAL, COPY, MERGE]

- id: get_rs232_response
  label: RS-232 Port Parameters Response
  type: bytes
  description: Series of values corresponding to SET-RS232 parameter table
```

## Variables
```yaml
# Numeric base mode (affects command parsing):
- id: numeric_base
  type: enum
  values: [decimal, hexadecimal]
  default: decimal
  description: Set via HEX or DECIMAL commands; prefix 0m=force decimal, 0x=force hex

# UNRESOLVED: additional configurable parameters not fully enumerated
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source - device does not autonomously emit status
```

## Macros
```yaml
# Sequence downloads (DSEQ command) - multi-step download protocol with 128-byte control blocks and checksums
# UNRESOLVED: full sequence download protocol complex - not fully specified in this spec
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - name: Keyboard login required
    description: KBD-LOGON required before CHG-MON or MON-CAM if log-in feature is enabled (Error 41 if not logged in)
  - name: Pre-position number limits
    description: Pre-position 1-16 for TC8561, 1-99 for TC8561A/LTC8561; numbers >100 activate AutoDome programming functions
  - name: Alarm deactivate before re-activate
    description: -ALARM must be sent before +ALARM with same alarm number
# UNRESOLVED: safety-critical fault behavior and error recovery sequences not documented
```

## Notes
- Serial console port at 9-pin D-sub on rear panel; same pinout as PC COM port
- Handshake (RTS/CTS) enabled by default; can be defeated by jumpering pins 4&5 on mating connector
- Command line max: 126 characters including spaces; terminated by carriage return (0x0D)
- Multiple commands per line separated by semicolon
- Numeric prefixes: `0m` forces decimal, `0x` forces hexadecimal regardless of current base
- LTC 8300: supports 4 keyboards, 32 physical cameras, 288 index range, 6 monitors
- System prompt: TC8300> for LTC 8300 series
- Camera numbering: index (1–288 physical), physical (1–32 actual BNC), logical (any 4 digits, operator-facing)
- User numbers: 1–32 (index); assignable to any non-duplicate 3-digit logical user number
- `+ALARM`/`-ALARM` are ASCII commands (not R/C opcodes); separate from receiver/driver alarm handling
<!-- UNRESOLVED: TCP/IP, HTTP, or REST control interface — RS-232 only documented -->
<!-- UNRESOLVED: firmware version for target LTC 8300 — CPU revision 8.1 document, actual device revision unknown -->
<!-- UNRESOLVED: binary command byte encodings — only text CCL commands documented; hex opcode tables reference only Receiver/Driver protocol -->
<!-- UNRESOLVED: authentication credential format — no login/auth procedure in source -->

## Provenance

```yaml
source_domains:
  - ptzprotocols.com
  - portal.7thsense.one
retrieved_at: 2026-04-30T14:19:23.110Z
last_checked_at: 2026-04-30T15:28:15.212Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:28:15.212Z
matched_actions: 121
action_count: 121
confidence: high
summary: "All 121 spec actions match documented CCL commands; transport verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
