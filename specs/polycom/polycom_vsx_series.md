---
spec_id: admin/polycom-vsx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Polycom VSX Series Control Spec"
manufacturer: Polycom
model_family: "VSX 6000"
aliases: []
compatible_with:
  manufacturers:
    - Polycom
  models:
    - "VSX 6000"
    - "VSX 6000A"
    - "VSX 7000"
    - "VSX 7000s"
    - "VSX 7000e"
    - "VSX 8000"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - dekom.com
  - manualslib.com
source_urls:
  - https://www.dekom.com/fileadmin/user_upload/manufacturers/polycom/polycom_vsx_series/polycom_vsx_series_integrator_reference_manual_en.pdf
  - https://www.manualslib.com/manual/784027/Polycom-Vsx-Series.html
retrieved_at: 2026-05-02T21:56:30.537Z
last_checked_at: 2026-10-07T21:08:35.020Z
generated_at: 2026-10-07T21:08:35.020Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial data bits, parity, and stop bits not stated in source"
  - "source documents 200+ commands; spec below covers primary AV control commands"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "source references script execution via `run` command but no specific macro sequences documented"
  - "no explicit safety interlock procedures documented in source"
  - "serial data bits, parity, stop bits, and flow control not stated in source"
  - "firmware version compatibility range not stated"
  - "full command catalog (~200+ commands) exceeds this spec; see source Appendix B for categorical list"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:08:35.020Z
  matched_actions: 365
  action_count: 365
  confidence: medium
  summary: "All 365 units map to source commands with matching shapes. Port 24, baud 9600 and TLS are sourced. Id echoctone_set was read as semantic for echocanceller yes/no. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Polycom VSX Series Control Spec

## Summary
Polycom VSX series video conferencing codec systems controllable via RS-232 serial or Telnet over LAN. The API provides text-based commands for call management, camera PTZ, audio, display configuration, directory access, streaming, and system administration. Models include VSX 6000, 7000, 7000s, 7000e, and 8000.

<!-- UNRESOLVED: serial data bits, parity, and stop bits not stated in source -->
<!-- UNRESOLVED: source documents 200+ commands; spec below covers primary AV control commands -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 24
serial:
  baud_rate: 9600
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure required by default; Security Mode / TLS optional)
```

## Traits
```yaml
- powerable  # inferred: sleep, wake, reboot commands present
- queryable  # inferred: extensive get commands for all subsystems
- levelable  # inferred: volume set {0..50}, audiotransmitlevel set {-20..30}
- routable  # inferred: camera source selection, monitor routing commands present
```

## Actions
```yaml
- id: dial_manual
  label: Dial Manual
  kind: action
  params:
    - name: speed
      type: string
      description: "Call speed (e.g. 64, 128, 384)"
    - name: dialstr
      type: string
      description: "Number or IP address to dial"
    - name: call_type
      type: string
      description: "Optional: h323, h320, ip, isdn, sip"

- id: dial_addressbook
  label: Dial Address Book Entry
  kind: action
  params:
    - name: name
      type: string
      description: "Address book entry name (up to 25 chars)"

- id: dial_phone
  label: Dial Phone
  kind: action
  params:
    - name: dialstring
      type: string
      description: "Phone number to dial"

- id: hangup_video
  label: Hang Up Video
  kind: action
  params:
    - name: callid
      type: integer
      description: "Optional call ID to hang up specific site"

- id: hangup_phone
  label: Hang Up Phone
  kind: action
  params: []

- id: hangup_all
  label: Hang Up All
  kind: action
  params: []

- id: answer_video
  label: Answer Video Call
  kind: action
  params: []

- id: answer_phone
  label: Answer Phone Call
  kind: action
  params: []

- id: autoanswer_set
  label: Set Auto Answer
  kind: action
  params:
    - name: mode
      type: string
      description: "yes, no, or donotdisturb"

- id: mpautoanswer_set
  label: Set Multipoint Auto Answer
  kind: action
  params:
    - name: mode
      type: string
      description: "yes, no, or donotdisturb"

- id: camera_near_select
  label: Select Near Camera
  kind: action
  params:
    - name: camera
      type: integer
      description: "Camera number 1-4"

- id: camera_far_select
  label: Select Far Camera
  kind: action
  params:
    - name: camera
      type: integer
      description: "Camera number 1-5"

- id: camera_move
  label: Camera Move
  kind: action
  params:
    - name: site
      type: string
      description: "near or far"
    - name: direction
      type: string
      description: "left, right, up, down, zoom+, zoom-, stop"

- id: camera_near_setposition
  label: Set Camera Position
  kind: action
  params:
    - name: pan
      type: integer
      description: "Pan coordinate (-880 to 880)"
    - name: tilt
      type: integer
      description: "Tilt coordinate (-300 to 300)"
    - name: zoom
      type: integer
      description: "Zoom coordinate (0 to 1023)"

- id: camera_tracking
  label: Set Camera Tracking
  kind: action
  params:
    - name: site
      type: string
      description: "near or far"
    - name: mode
      type: string
      description: "on, off, or to_presets"

- id: preset_near_go
  label: Go To Near Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 0-99"

- id: preset_near_set
  label: Set Near Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 0-99"

- id: preset_far_go
  label: Go To Far Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 0-15"

- id: preset_far_set
  label: Set Far Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 0-15"

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Volume level 0-50"

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: mute_near
  label: Mute Near
  kind: action
  params:
    - name: state
      type: string
      description: "on, off, or toggle"

- id: pip_set
  label: Set PIP Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "on, off, auto, camera, swap"

- id: pip_location
  label: Set PIP Location
  kind: action
  params:
    - name: position
      type: integer
      description: "0=bottom right, 1=top right, 2=top left, 3=bottom left"

- id: sleep
  label: Sleep
  kind: action
  params: []

- id: wake
  label: Wake
  kind: action
  params: []

- id: reboot
  label: Reboot
  kind: action
  params: []

- id: reboot_now
  label: Reboot Now
  kind: action
  params: []

- id: configdisplay_set
  label: Set Monitor Config
  kind: action
  params:
    - name: monitor
      type: string
      description: "monitor1 or monitor2"
    - name: format
      type: string
      description: "s_video, composite, or vga"
    - name: aspect
      type: string
      description: "4:3 or 16:9"

- id: configpresentation_set
  label: Set Presentation Mode
  kind: action
  params:
    - name: monitor
      type: string
      description: "monitor1 or monitor2"
    - name: source
      type: string
      description: "near, far, content, near-or-far, content-or-near, content-or-far, all, none"

- id: mpmode_set
  label: Set Multipoint Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "auto, discussion, presentation, fullscreen"

- id: stream_start
  label: Start Streaming
  kind: action
  params:
    - name: addr
      type: string
      description: "Optional multicast address"
    - name: ttl
      type: string
      description: "Optional TTL"
    - name: vidPort
      type: string
      description: "Optional video port"
    - name: audPort
      type: string
      description: "Optional audio port"

- id: stream_stop
  label: Stop Streaming
  kind: action
  params: []

- id: vcbutton_play
  label: Visual Concert Play
  kind: action
  params: []

- id: vcbutton_stop
  label: Visual Concert Stop
  kind: action
  params: []

- id: button_simulate
  label: Simulate Remote Button
  kind: action
  params:
    - name: button
      type: string
      description: "Remote button name (up, down, left, right, select, home, mute, callhangup, near, far, camera, pip, preset, etc.)"

- id: showpopup
  label: Show Popup Message
  kind: action
  params:
    - name: text
      type: string
      description: "Message text to display"

- id: gendial
  label: Generate DTMF Tone
  kind: action
  params:
    - name: digit
      type: string
      description: "0-9, #, or *"

- id: chaircontrol_req_chair
  label: Request Chair Control
  kind: action
  params: []

- id: chaircontrol_rel_chair
  label: Release Chair Control
  kind: action
  params: []

- id: chaircontrol_req_floor
  label: Request Floor
  kind: action
  params: []

- id: chaircontrol_view
  label: View Terminal
  kind: action
  params:
    - name: term_no
      type: string
      description: "Terminal number (x.y format)"

- id: chaircontrol_hangup_term
  label: Hangup Terminal
  kind: action
  params:
    - name: term_no
      type: string
      description: "Terminal number (x.y format)"

- id: echoctone_set
  label: Set Echo Canceller
  kind: action
  params:
    - name: state
      type: string
      description: "yes or no"

- id: colorbar
  label: Toggle Color Bars
  kind: action
  params:
    - name: state
      type: string
      description: "on or off"

- id: generatetone
  label: Generate Test Tone
  kind: action
  params:
    - name: state
      type: string
      description: "on or off"

- id: exit
  label: End Session
  kind: action
  params: []

- id: abk_all
  label: Read All Local Directory Entries
  kind: action
  params: []

- id: abk_batch
  label: Read Local Directory Batch
  kind: action
  params:
    - name: batch
      type: integer
      description: "{0..59}; returns a batch of 10 local directory entries; request batches sequentially"

- id: abk_batch_search
  label: Search Local Directory Batch
  kind: action
  params:
    - name: pattern
      type: string
      description: "Pattern to match; range UNRESOLVED"
    - name: count
      type: integer
      description: "Number of matching entries to list; range UNRESOLVED"

- id: abk_batch_define
  label: Define Local Directory Batch
  kind: action
  params:
    - name: start_no
      type: integer
      description: "Beginning entry number; range UNRESOLVED; deprecated"
    - name: stop_no
      type: integer
      description: "Ending entry number; range UNRESOLVED"

- id: abk_letter
  label: Read Local Directory By Letter
  kind: action
  params:
    - name: letter
      type: string
      description: "{a..z}; one or two alphanumeric characters; source also permits - _ / ; @ , . \\ and 0 through 9"

- id: abk_range
  label: Read Local Directory Range
  kind: action
  params:
    - name: start_no
      type: integer
      description: "Beginning entry number; range UNRESOLVED"
    - name: stop_no
      type: integer
      description: "Ending entry number; range UNRESOLVED"

- id: abk_refresh
  label: Refresh Local Directory Cache
  kind: action
  params: []

- id: addressdisplayedingab
  label: Configure Global Directory Address Visibility
  kind: action
  params:
    - name: mode
      type: string
      description: "get, private, public"

- id: adminpassword
  label: Configure Remote Access Password
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; not supported on the serial port"
    - name: password
      type: string
      description: "Optional for set; omit to erase; valid characters: a through z (lower and uppercase), -, _, @, /, ;, comma, ., \\, 0 through 9; no spaces; length UNRESOLVED"

- id: alertusertone
  label: Configure User Alert Tone
  kind: action
  params:
    - name: tone
      type: string
      description: "<get|1|2|3|4>"

- id: alertvideotone
  label: Configure Incoming Video Tone
  kind: action
  params:
    - name: tone
      type: string
      description: "<get|1|2|3|4|5|6|7|8|9|10>"

- id: all_register
  label: Register Common Notifications
  kind: action
  params: []

- id: all_unregister
  label: Unregister All Notifications
  kind: action
  params: []

- id: allowabkchanges
  label: Configure Directory Changes
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: allowcamerapresetssetup
  label: Configure Camera Preset Setup Permission
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: allowdialing
  label: Configure Dialing Permission
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: allowmixedcalls
  label: Configure Mixed Protocol Calls
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: allowstreaming
  label: Configure Streaming Screen Access
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: allowusersetup
  label: Configure User Settings Access
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: areacode
  label: Configure BRI Area Code
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a BRI network interface"
    - name: areacode
      type: string
      description: "Area code for all BRI lines; omit for set to erase; range UNRESOLVED"

- id: audiometer
  label: Monitor Audio Input Levels
  kind: action
  params:
    - name: input
      type: string
      description: "<micpod|farin|linein|lineinred|lineinwhite|balancedin|visualconcert|vcr|aux|off>; reports levels and peak 10 times per second; off stops output"

- id: audiotransmitlevel
  label: Configure Audio Transmit Level
  kind: action
  params:
    - name: operation
      type: string
      description: "<get|up|down|register|unregister> or set"
    - name: level
      type: integer
      description: "Required for set: {-20..30} dB; omitted for other operations"

- id: autoshowcontent
  label: Configure Automatic Content Sending
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|on|off|nearfar|nearonly>"

- id: backlightcompensation
  label: Configure Backlight Compensation
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: basicmode
  label: Configure Basic Mode
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>"

- id: bri1enable
  label: Configure BRI Line Enablement
  kind: action
  params:
    - name: command
      type: string
      description: "Select one literal command token: bri1enable, bri2enable, bri3enable, bri4enable; requires a BRI network interface"
    - name: state
      type: string
      description: "<get|yes|no>"

- id: briallenable
  label: Configure All BRI Lines
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; yes only enables lines with populated directory numbers"

- id: calldetail
  label: Read Call Detail Records
  kind: action
  params:
    - name: item
      type: string
      description: "Nth_item or all; numeric range UNRESOLVED"

- id: calldetailreport
  label: Configure Call Detail Reporting
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: callencryption
  label: Configure Deprecated Call Encryption
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|whenavailable|disabled>; deprecated; cannot be used while a call is in progress"

- id: callinfo_callid
  label: Read Call Information By ID
  kind: action
  params:
    - name: callid
      type: string
      description: "Connection call ID; range UNRESOLVED"

- id: callpreference
  label: Configure Supported Call Types
  kind: action
  params:
    - name: call_type
      type: string
      description: "get or <analogphone|basicmode|h239|h320|h323|isdngateway|sip|v35|voiceoverisdn>"
    - name: state
      type: string
      description: "Omitted for get; source documents yes in callpreference basicmode yes; other setting values UNRESOLVED"

- id: callstate
  label: Configure Call State Notifications
  kind: action
  params:
    - name: operation
      type: string
      description: "<get|register|unregister>; get returns registration state"

- id: callstats
  label: Read Call Summary Statistics
  kind: action
  params: []

- id: camera
  label: Control Additional Camera Operations
  kind: action
  params:
    - name: site
      type: string
      description: "near or far for move, source, stop, tracking; near only for getposition; omitted for register or unregister"
    - name: operation
      type: string
      description: "move <continuous|discrete>, source, stop, tracking <get>, getposition, register, unregister, register get; excludes camera operations already represented above"

- id: cameradirection
  label: Configure Camera Pan Direction
  kind: action
  params:
    - name: direction
      type: string
      description: "<get|normal|reversed>"

- id: camerainput
  label: Configure Camera Input Format
  kind: action
  params:
    - name: input
      type: integer
      description: "<1|2|3>"
    - name: format
      type: string
      description: "<get|s-video|composite>"

- id: chaircontrol_end_conf
  label: End Multipoint Conference
  kind: action
  params: []

- id: chaircontrol_list
  label: List Conference Terminals
  kind: action
  params: []

- id: chaircontrol_register
  label: Register Chair Control Notifications
  kind: action
  params: []

- id: chaircontrol_unregister
  label: Unregister Chair Control Notifications
  kind: action
  params: []

- id: chaircontrol_req_term_name
  label: Request Terminal Name
  kind: action
  params:
    - name: term_no
      type: string
      description: "x.y where x is the MCU and y is the participant; numeric ranges UNRESOLVED"

- id: chaircontrol_req_vas
  label: Request Voice Activated Switching
  kind: action
  params: []

- id: chaircontrol_set_broadcaster
  label: Set Conference Broadcaster
  kind: action
  params:
    - name: term_no
      type: string
      description: "x.y where x is the MCU and y is the participant; numeric ranges UNRESOLVED"

- id: chaircontrol_set_password
  label: Set Chair Control Password
  kind: action
  params:
    - name: password
      type: string
      description: "Meeting Password; length is limited to 10 characters; valid characters: A through Z (lower and uppercase), -, _, @, /, ;, comma, ., \\, and 0 through 9; no spaces"

- id: chaircontrol_set_term_name
  label: Set Terminal Name
  kind: action
  params:
    - name: term_no
      type: string
      description: "x.y where x is the MCU and y is the participant; numeric ranges UNRESOLVED"
    - name: term_name
      type: string
      description: "Terminal name; quote if it contains a space; length UNRESOLVED"

- id: chaircontrol_stop_view
  label: Stop Viewing Terminal
  kind: action
  params: []

- id: chaircontrol_view_broadcaster
  label: View Conference Broadcaster
  kind: action
  params: []

- id: colorscheme
  label: Configure Interface Color Scheme
  kind: action
  params:
    - name: scheme
      type: string
      description: "<get|1|2|3|4|5|20>; 1 = Ocean Blue, 2 = Wine Red, 3 = Concrete Gray, 4 = Midnight Gray, 5 = Steel Gray, 20 = ViewStation Classic"

- id: configchange
  label: Configure Configuration Change Notifications
  kind: action
  params:
    - name: operation
      type: string
      description: "<get|register|unregister>; deprecated; get returns registration state"

- id: configdisplay_monitor2_off
  label: Disable Monitor Two
  kind: action
  params: []

- id: configparam
  label: Configure System Parameter
  kind: action
  params:
    - name: parameter
      type: string
      description: "allow_directory_changes, area_code_required, audio_in_level, balanced_input_type, balanced_output_mode, camera_video_quality, camera1_video_quality, camera2_video_quality, camera3_video_quality, camera4_video_quality, contactlist_as_homescreen, date_format, displaylastnumberdialed, do_not_disturb, enable_analog_phone, enable_ftp_access, enable_isdn_gateway, enable_polycom_mic, enable_polycom_stereo, enable_sip, enable_telnet_access, enable_web_access, firewall_fixed_ports, ip_max_incoming_speed, line_input_red, line_input_white, line_output_mode, mainscreensites, preferred_dialing_method, remote_control_keypad, sites_button_name, snap_button_option, use_non-polycom_remote, video_pro-motion"
    - name: input
      type: integer
      description: "Only for camera_video_quality: <1|2|3|4>; omit for other parameters"
    - name: operation
      type: string
      description: "get or set"
    - name: value
      type: string
      description: "Required for set, omitted for get. allow_directory_changes, area_code_required, contactlist_as_homescreen, displaylastnumberdialed, do_not_disturb, enable_analog_phone, enable_ftp_access, enable_isdn_gateway, enable_polycom_mic, enable_polycom_stereo, enable_sip, enable_telnet_access, enable_web_access, firewall_fixed_ports, mainscreensites, use_non-polycom_remote: yes|no; audio_in_level: 0|1|2|3|4|5|6|7|8|9|10; balanced_input_type: line_input|microphone; balanced_output_mode, line_output_mode: variable|fixed; camera_video_quality and camera1_video_quality through camera4_video_quality: motion|sharpness; date_format: mm_dd_yyyy|dd_mm_yyyy|yyyy_mm_dd; ip_max_incoming_speed: 128|256|384|512|768|1024|1472|1920; line_input_red, line_input_white: vcr|vcnx; preferred_dialing_method: auto|manual; remote_control_keypad: presets|tones; sites_button_name: speed_dial|buddy_list; snap_button_option: calendar|callhistory|systeminformation|callstatistics|off; video_pro-motion: auto|off|512|768|1024"

- id: configpresentation_monitor1
  label: Configure Both Presentation Monitors
  kind: action
  params:
    - name: monitor1_source
      type: string
      description: "near|far|content|near-or-far|content-or-near|content-or-far|all|none; source syntax: configpresentation monitor1 \"value\" monitor2 \"value\""
    - name: monitor2_source
      type: string
      description: "near|far|content|near-or-far|content-or-near|content-or-far|all|none"

- id: confirmdiradd
  label: Configure Directory Addition Prompt
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: confirmdirdel
  label: Configure Directory Deletion Confirmation
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: contentauto
  label: Configure Automatic Content Bandwidth
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>"

- id: country
  label: Configure System Country
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: country
      type: string
      description: "Required for set: {afghanistan...zimbabwe}; source parameter table instead gives {algeria...zimbabwe}; complete country enumeration UNRESOLVED; quote compound names"

- id: cts
  label: Configure CTS Signal
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|normal|inverted|ignore>; requires a V.35 network interface"

- id: daylightsavings
  label: Configure Daylight Saving Adjustment
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: dcd
  label: Configure DCD Signal
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|normal|inverted>; requires a V.35 network interface"

- id: dcdfilter
  label: Configure DCD Filter
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>; requires a V.35 network interface"

- id: defaultgateway
  label: Configure Default Gateway
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Required for set: xxx.xxx.xxx.xxx; IP address range UNRESOLVED; DHCP must be off; change prompts restart"

- id: dhcp
  label: Configure DHCP Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|off|client|server>; change prompts restart; server may be unavailable by configuration"

- id: dial_auto
  label: Dial Automatic Video Call
  kind: action
  params:
    - name: speed
      type: string
      description: "Valid data rate for the network; enumeration UNRESOLVED; deprecated command"
    - name: dialstr
      type: string
      description: "Valid ISDN or IP directory number; range UNRESOLVED"

- id: dialchannels
  label: Configure Parallel ISDN Dial Channels
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: channels
      type: integer
      description: "Required for set: 8 for QBRI, 12 for PRI"

- id: dialingdisplay
  label: Configure Home Screen Dialing Display
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|dialingentry|displaymarquee|none>"

- id: dialingentryfield
  label: Configure Dialing Entry Field
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: diffservaudio
  label: Configure DiffServ Priority
  kind: action
  params:
    - name: command
      type: string
      description: "Select one literal command token: diffservaudio, diffservfecc, diffservvideo"
    - name: operation
      type: string
      description: "get or set; applicable when typeofservice is diffserv"
    - name: priority
      type: integer
      description: "Required for set: {0..63}"

- id: dir
  label: List Flash Files
  kind: action
  params:
    - name: pattern
      type: string
      description: "Optional partial filename match of up to 250 alphanumeric characters; omit to list all files; no wild cards"

- id: directory
  label: Configure Home Directory Button
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: display_call
  label: Read Deprecated Call Display
  kind: action
  params: []

- id: display_whoami
  label: Read Deprecated System Display
  kind: action
  params: []

- id: displayglobaladdresses
  label: Configure Global Address Display
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: displaygraphics
  label: Configure Call Icon Display
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: displayipext
  label: Configure IP Extension Display
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: displayipisdninfo
  label: Configure Deprecated IP ISDN Display
  kind: action
  params:
    - name: mode
      type: string
      description: "<yes|no|both|ip-only|isdn-only|none|get>; deprecated"

- id: displayparams
  label: Read System Settings List
  kind: action
  params: []

- id: dns
  label: Configure DNS Server
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: server
      type: integer
      description: "{1..4}"
    - name: address
      type: string
      description: "Required for set: xxx.xxx.xxx.xxx; IP address range UNRESOLVED; cannot set in DHCP client mode; change prompts restart"

- id: dsr
  label: Configure DSR Signal
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|normal|inverted>; requires a V.35 network interface"

- id: dsranswer
  label: Configure Answer On DSR
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>; requires a V.35 network interface"

- id: dtr
  label: Configure DTR Signal
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|normal|inverted|on>; requires a V.35 network interface"

- id: dualmonitor
  label: Configure Dual Monitor Emulation
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: dynamicbandwidth
  label: Configure Dynamic Bandwidth
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: e164ext
  label: Configure E164 Extension
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: extension
      type: string
      description: "Optional for set; omit to erase; valid E.164 extension, usually a four-digit number; exact range UNRESOLVED"

- id: echo
  label: Echo API Text
  kind: action
  params:
    - name: text
      type: string
      description: "Text to print to the API client screen; length UNRESOLVED"

- id: echocanceller
  label: Query Echo Canceller Configuration
  kind: action
  params:
    - name: operation
      type: string
      description: "get; setting echo cancellation is already represented by Set Echo Canceller"

- id: echocancellerred
  label: Configure Line Input Echo Canceller
  kind: action
  params:
    - name: command
      type: string
      description: "Select one literal command token: echocancellerred, echocancellerwhite"
    - name: state
      type: string
      description: "<get|yes|no>"

- id: enablefirewalltraversal
  label: Configure NAT Firewall Traversal
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; requires an Edgewater session border controller supporting H.460"

- id: enablepvec
  label: Configure Video Error Concealment
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: enablersvp
  label: Configure RSVP
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: enablesnmp
  label: Configure SNMP Enablement
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; changing the setting restarts the system"

- id: encryption
  label: Configure AES Encryption
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; cannot be used while a call is in progress"

- id: farcontrolnearcamera
  label: Configure Far Control Of Near Camera
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: farnametimedisplay
  label: Configure Far Site Name Display Time
  kind: action
  params:
    - name: duration
      type: string
      description: "off or <get|on|15|30|60|120>; numeric values are seconds; on displays the name for the duration of the call"

- id: flash
  label: Flash Analog Phone Call
  kind: action
  params:
    - name: callid
      type: string
      description: "Optional call ID; range UNRESOLVED"
    - name: duration
      type: integer
      description: "Optional pulse duration in ms; range UNRESOLVED"

- id: gabk_all
  label: Read All Global Directory Entries
  kind: action
  params: []

- id: gabk_batch
  label: Read Global Directory Batch
  kind: action
  params:
    - name: batch
      type: integer
      description: "{0..59}; batch size determined by global directory; request batches sequentially"

- id: gabk_batch_define
  label: Define Global Directory Batch
  kind: action
  params:
    - name: start_no
      type: integer
      description: "Beginning entry number; range UNRESOLVED; source recommends gabk range instead"
    - name: stop_no
      type: integer
      description: "Ending entry number; range UNRESOLVED"

- id: gabk_batch_search
  label: Search Global Directory Batch
  kind: action
  params:
    - name: pattern
      type: string
      description: "Pattern to match; range UNRESOLVED"
    - name: count
      type: integer
      description: "Number of matching entries to list; range UNRESOLVED"

- id: gabk_letter
  label: Read Global Directory By Letter
  kind: action
  params:
    - name: letter
      type: string
      description: "{a..z}; one or two alphanumeric characters; source also permits - _ / ; @ , . \\ and 0 through 9"

- id: gabk_range
  label: Read Global Directory Range
  kind: action
  params:
    - name: start_no
      type: integer
      description: "Beginning entry number; range UNRESOLVED"
    - name: stop_no
      type: integer
      description: "Ending entry number; range UNRESOLVED"

- id: gabk_refresh
  label: Refresh Global Directory
  kind: action
  params: []

- id: gabpassword
  label: Configure Global Directory Password
  kind: action
  params:
    - name: server
      type: string
      description: "Optional {1..5}; all is permitted for get only"
    - name: operation
      type: string
      description: "get or set; requires adminpassword to have been set"
    - name: password
      type: string
      description: "Optional for set; omit to erase; valid characters: a through z (lower and uppercase), -, _, @, /, ;, comma, ., \\, 0 through 9; quote strings containing spaces; length UNRESOLVED"

- id: gabserverip
  label: Configure Global Directory Server Address
  kind: action
  params:
    - name: server
      type: string
      description: "Optional {1..5}; all is permitted for get only"
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Optional for set; numeric or character string specifying server address; omit to erase; range UNRESOLVED"

- id: gatekeeperip
  label: Configure Gatekeeper Address
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Optional for set: xxx.xxx.xxx.xxx; omit to erase; range UNRESOLVED"

- id: gatekeeperpin
  label: Configure Gatekeeper Authentication PIN
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: pin
      type: string
      description: "Optional for set; omit to erase; range UNRESOLVED"

- id: gatewayareacode
  label: Configure Gateway Area Code
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: areacode
      type: string
      description: "Optional numeric string for set; omit to erase; range UNRESOLVED"

- id: gatewaycountrycode
  label: Configure Gateway Country Code
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: countrycode
      type: string
      description: "Optional numeric string for set; omit to erase; range UNRESOLVED"

- id: gatewayext
  label: Configure Gateway Extension
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: extension
      type: string
      description: "Optional numeric string for set; omit to erase; range UNRESOLVED"

- id: gatewaynumber
  label: Configure Gateway Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: number
      type: string
      description: "Optional numeric string for set; omit to erase; range UNRESOLVED"

- id: gatewaynumbertype
  label: Configure Gateway Number Type
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|did|number+extension>"

- id: gatewayprefix
  label: Configure Gateway Prefix
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: speed
      type: string
      description: "56, 64, 2x56, 112, 2x64, 128, 168, 192, 224, 256, 280, 320, 336, 384, 392, 7x64, 8x56, 504, 512, 560, 576, 616, 640, 672, 704, 728, 768, 784, 832, 840, 16x56, 14x64, 952, 960, 1008, 1024, 1064, 1088, 1120, 1152, 1176, 1216, 1232, 1280, 1288, 24x56, 21x64, 1400, 1408, 1456, 1472, 1512, 1536, 1568, 1600, 1624, 1664, 1680, 1728, 1736, 32x56, 28x64, 1848, 1856, 1904, and 1920 kbps"
    - name: value
      type: string
      description: "Optional prefix for set; omit to erase; consult gateway manual; range UNRESOLVED"

- id: gatewaysetup
  label: Read Gateway Speed Settings
  kind: action
  params: []

- id: gatewaysuffix
  label: Configure Gateway Suffix
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: speed
      type: string
      description: "56, 64, 2x56, 112, 2x64, 128, 168, 192, 224, 256, 280, 320, 336, 384, 392, 7x64, 8x56, 504, 512, 560, 576, 616, 640, 672, 704, 728, 768, 784, 832, 840, 16x56, 14x64, 952, 960, 1008, 1024, 1064, 1088, 1120, 1152, 1176, 1216, 1232, 1280, 1288, 24x56, 21x64, 1400, 1408, 1456, 1472, 1512, 1536, 1568, 1600, 1624, 1664, 1680, 1728, 1736, 32x56, 28x64, 1848, 1856, 1904, and 1920 kbps"
    - name: value
      type: string
      description: "Optional suffix for set; omit to erase; quote strings containing spaces; consult gateway manual; range UNRESOLVED"

- id: gendialtonepots
  label: Generate Analog Phone DTMF Tone
  kind: action
  params:
    - name: digit
      type: string
      description: "<{0..9}|#|*>; deprecated"

- id: gmscity
  label: Configure Management City
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: city
      type: string
      description: "Optional for set; omit to erase; quote strings containing spaces; length UNRESOLVED"

- id: gmscontactemail
  label: Configure Management Contact Email
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: email
      type: string
      description: "Optional alphanumeric email string for set; omit to erase; length UNRESOLVED"

- id: gmscontactfax
  label: Configure Management Contact Fax
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: fax_number
      type: string
      description: "Optional for set; omit to erase; quote strings containing spaces; length UNRESOLVED"

- id: gmscontactnumber
  label: Configure Management Contact Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: number
      type: string
      description: "Optional numeric string for set; omit to erase; quote strings containing spaces; range UNRESOLVED"

- id: gmscontactperson
  label: Configure Management Contact Person
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: person
      type: string
      description: "Optional for set; omit to erase; quote strings containing spaces; length UNRESOLVED"

- id: gmscountry
  label: Configure Management Country
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: countryname
      type: string
      description: "Optional character string for set; omit to erase; quote strings containing spaces; enumeration UNRESOLVED"

- id: gmsstate
  label: Configure Management State
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: state
      type: string
      description: "Optional character string for set; omit to erase; quote strings containing spaces; length UNRESOLVED"

- id: gmstechsupport
  label: Configure Management Technical Support Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: tech_support_digits
      type: string
      description: "Optional numeric string for set; omit to erase; quote strings containing spaces; range UNRESOLVED"

- id: gmsurl
  label: Configure Management Server URL
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: server
      type: string
      description: "{1..10}; all permitted for get; server 1 performs account validation"
    - name: address
      type: string
      description: "Required for set: xxx.xxx.xxx.xxx; range UNRESOLVED; omit for get"

- id: graphicsmonitor
  label: Configure Graphics Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: "<get|tv|fxvga|visualconcert|1|2|vcnx>; tv, fxvga, visualconcert are deprecated"

- id: h239enable
  label: Configure H239 People Content
  kind: action
  params:
    - name: state
      type: string
      description: "get, yes, no"

- id: h323name
  label: Configure H323 Name
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: name
      type: string
      description: "Optional character string for set; omit to erase; quote strings containing spaces; length UNRESOLVED"

- id: h331audiomode
  label: Configure H331 Audio Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: "<get|g729|g728|g711u|g711a|g722-56|g722-48|g7221-16|g7221-24|g7221-32|siren14|siren14stereo|off>; requires a V.35 network interface; cannot change during a call"

- id: h331dualstream
  label: Configure H331 Dual Stream
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>; requires a V.35 network interface; cannot change during a call"

- id: h331framerate
  label: Configure H331 Frame Rate
  kind: action
  params:
    - name: rate
      type: string
      description: "<get|30|15|10|7.5>; requires a V.35 network interface; cannot change during a call"

- id: h331videoformat
  label: Configure H331 Video Format
  kind: action
  params:
    - name: format
      type: string
      description: "<get|fcif>; requires a V.35 network interface"

- id: h331videoprotocol
  label: Configure H331 Video Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: "<get|h264|h263+|h263|h261>; requires a V.35 network interface; cannot change during a call"

- id: help
  label: Read API Help
  kind: action
  params:
    - name: topic
      type: string
      description: "Optional all, help, command string, verbose, terse, syntax, or apropos; omit to list command names"
    - name: search
      type: string
      description: "Required string after apropos; omitted otherwise; length UNRESOLVED"

- id: history
  label: Read Command History
  kind: action
  params: []

- id: homecallquality
  label: Configure Home Call Quality Menu
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: homemultipoint
  label: Configure Home Multipoint Button
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; requires multipoint calling to be enabled"

- id: homerecentcalls
  label: Configure Home Recent Calls Button
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; requires Call Detail Report to be enabled"

- id: homesystem
  label: Configure Home System Button
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: homesystemname
  label: Configure Home System Name Display
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: hostname
  label: Configure LAN Host Name
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: hostname
      type: string
      description: "Optional for set; omission sets Admin; starts with a letter (A-a to Z-z), ends with a letter (A-a to Z-z) or a number (0 to 9), may include letters, numbers, and a hyphen, may not be longer than 63 characters; change prompts restart"

- id: ipaddress
  label: Configure LAN IP Address
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Required for set: xxx.xxx.xxx.xxx; range UNRESOLVED; DHCP must be off; change prompts restart"

- id: ipdialspeed
  label: Configure IP Dialing Speed Enablement
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: speed
      type: string
      description: "56, 64, 2x56, 112, 2x64, 128, 168, 192, 224, 256, 280, 320, 33 6, 384, 392, 7x64, 8x56, 504, 512, 560, 576, 616, 640, 672, 704, 728, 768, 784, 832, 840, 16x56, 14x64, 952, 960, 1008, 1024, 1064, 1088, 1120, 1152, 1176, 1216, 1232, 1280, 1288, 24x56, 21x64, 1400, 1408, 1456, 1472, 1512, 1536, 1568, 1600, 1624, 1664, 1680, 1728, 1736, 32x56, 28x64, 1848, 1856, 1904, and 1920 kbps; source prints 33 6 with an internal space; interpretation of that value UNRESOLVED"
    - name: state
      type: string
      description: "Required for set: <on|off>; omitted for get"

- id: ipisdninfo
  label: Configure Home IP ISDN Information
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|both|ip-only|isdn-only|none>"

- id: ipprecaudio
  label: Configure IP Precedence Priority
  kind: action
  params:
    - name: command
      type: string
      description: "Select one literal command token: ipprecaudio, ipprecfecc, ipprecvideo"
    - name: operation
      type: string
      description: "get or set; applicable when typeofservice is ipprecedence"
    - name: priority
      type: integer
      description: "Required for set: {0..7}"

- id: ipstat
  label: Read LAN Configuration Statistics
  kind: action
  params: []

- id: isdnareacode
  label: Configure ISDN Area Code
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires an ISDN network interface"
    - name: area_code
      type: string
      description: "Optional numeric value for set; omit to erase; range UNRESOLVED"

- id: isdncountrycode
  label: Configure ISDN Country Code
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires an ISDN network interface"
    - name: country_code
      type: string
      description: "Optional for set; omit to erase; range UNRESOLVED"

- id: isdndialingprefix
  label: Configure ISDN Outside Line Prefix
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires an ISDN network interface"
    - name: prefix
      type: string
      description: "Optional digit string for set; omit to erase; range UNRESOLVED"

- id: isdndialspeed
  label: Configure ISDN Dialing Speed Enablement
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires an ISDN network interface"
    - name: speed
      type: string
      description: "56, 2x56, 112, 168, 224, 280, 336, 392, 64, 8x56, 2x64, 128, 192, 256, 320, 384, 7x64, 512, 560, 576, 616, 640, 672, 704, 728, 768, 784, 832, 840, 14x64, 952, 960, 1008, 1024, 1064, 1088, 1120, 1152, 1176, 1216, 1232, 1280, 1288, 21x64, 1400, 1408, 1456, 1472, 1512, 1536, 1568, 1600, 1624, 1664, 1680, 1728, 28x64, 1856, and 1920 kbps; highest speed: BRI 512 kbps, T1 1472 kbps, E1 1920 kbps"
    - name: state
      type: string
      description: "Required for set: <on|off>; omitted for get"

- id: isdnnum
  label: Configure ISDN Channel Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires an ISDN network interface"
    - name: channel
      type: string
      description: "<1b1|1b2|2b1|2b2|3b1|3b2|4b1|4b2>"
    - name: number
      type: string
      description: "Optional for set; omit to erase; supplied by network service provider; range UNRESOLVED"

- id: isdnswitch
  label: Configure ISDN Switch Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: "get or pt-to-pt_at&t_5_ess, multipoint_at&t_5_ess, ni-1, nortel_dms-100, standard_etsi_euro-isdn, ts-031, ntt_ins-64; requires an ISDN network interface"

- id: keypadaudioconf
  label: Configure Keypad Audio Confirmation
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: language
  label: Configure System Language
  kind: action
  params:
    - name: operation
      type: string
      description: "<set|get>"
    - name: language
      type: string
      description: "Required for set: <chinese|englishuk|englishus|finnish|french|german|hungarian|italian|japanese|korean|norwegian|polish|portuguese|russian|spanish|traditional_chinese>"

- id: lanport
  label: Configure LAN Speed And Duplex
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|auto|autohdx|autofdx|10|10hdx|10fdx|100|100hdx|100fdx>; change prompts restart"

- id: linestate
  label: Configure Line State Notifications
  kind: action
  params:
    - name: operation
      type: string
      description: "get, register, unregister; get returns registration state; IP line state changes are received only in a serial API session"

- id: listen
  label: Listen For Incoming Calls Or Sleep
  kind: action
  params:
    - name: event
      type: string
      description: "<video|phone|sleep>; registers the RS-232 session; sleep is deprecated"

- id: localdatetime
  label: Configure Home Date And Time Display
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: marqueedisplaytext
  label: Configure Dialing Marquee Text
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: text
      type: string
      description: "Text for set; omission sets Welcome; quote strings containing spaces; length UNRESOLVED; effective only when dialingdisplay displays a marquee"

- id: maxgabinternationalcallspeed
  label: Configure Global Directory International Call Speed
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires an ISDN network interface"
    - name: speed
      type: string
      description: "Required for set: 2x64, 128, 256, 384, 512, 768, 1024, and 1472 kbps"

- id: maxgabinternetcallspeed
  label: Configure Global Directory Internet Call Speed
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: speed
      type: string
      description: "Required for set: 128, 256, 384, 512, 768, 1024, and 1472 kbps"

- id: maxgabisdncallspeed
  label: Configure Global Directory ISDN Call Speed
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires an ISDN network interface"
    - name: speed
      type: string
      description: "Required for set: 56, 64, 128, 256, 384, 512, 768, 1024, and 1472 kbps"

- id: maxtimeincall
  label: Configure Maximum Call Duration
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: minutes
      type: integer
      description: "Optional for set: {0..999}; omit or use 0 for indefinite duration"

- id: mcupassword
  label: Send MCU Password
  kind: action
  params:
    - name: password
      type: string
      description: "Optional password to send to the MCU; length and characters UNRESOLVED"

- id: meetingpassword
  label: Configure Meeting Password
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: password
      type: string
      description: "Optional for set; omit to erase; valid characters: A through Z (lower and uppercase), -, _, @, /, ;, comma, ., \\, and 0 through 9; length limited to 10 characters; no spaces"

- id: midrangespeaker
  label: Configure Midrange Speaker
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>; VSX 7000, VSX 7000s, and VSX 6000 only; available when Polycom StereoSurround is disabled"

- id: monitor1
  label: Configure Deprecated Monitor Output
  kind: action
  params:
    - name: command
      type: string
      description: "Select one literal command token: monitor1, monitor2; deprecated"
    - name: mode
      type: string
      description: "monitor1: <get|4:3|16:9|vga>; monitor2: off, <get|4:3|16:9>, vga; monitor1 vga restarts the system"

- id: monitor1screensaveroutput
  label: Configure Monitor Screen Saver Output
  kind: action
  params:
    - name: command
      type: string
      description: "Select one literal command token: monitor1screensaveroutput, monitor2screensaveroutput"
    - name: mode
      type: string
      description: "<get|black|no_signal>"

- id: mtumode
  label: Configure MTU Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|default|specify>; default uses 1260; specify enables mtusize selection"

- id: mtusize
  label: Configure MTU Size
  kind: action
  params:
    - name: size
      type: string
      description: "<get|660|780|900|1020|1140|1260|1500>; set mtumode to specify before selecting size"

- id: mute_register
  label: Register Mute Notifications
  kind: action
  params: []

- id: mute_unregister
  label: Unregister Mute Notifications
  kind: action
  params: []

- id: muteautoanswer
  label: Configure Auto Answer Microphone Mute
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: natconfig
  label: Configure NAT Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|auto|manual|upnp|off>"

- id: nath323compatible
  label: Configure H323 Compatible NAT
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; applicable when NAT Configuration is Auto, Manual, or UPnP"

- id: nearloop
  label: Configure Near End Loop Test
  kind: action
  params:
    - name: state
      type: string
      description: "<on|off>"

- id: nonotify
  label: Unregister Status Notification Type
  kind: action
  params:
    - name: notification
      type: string
      description: "callstatus, captions, linestatus, mutestatus, screenchanges, sysstatus, sysalerts, vidsourcechanges"

- id: notify
  label: Register Or List Status Notifications
  kind: action
  params:
    - name: notification
      type: string
      description: "Optional callstatus, captions, linestatus, mutestatus, screenchanges, sysstatus, sysalerts, vidsourcechanges; omit to list currently received notification types"

- id: ntpmode
  label: Configure Network Time Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|auto|off|manual>"

- id: ntpserver
  label: Configure Network Time Server
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Optional IP address or DNS server name for set; omit to erase; range UNRESOLVED"

- id: numberofmonitors
  label: Read Deprecated Monitor Count
  kind: action
  params:
    - name: operation
      type: string
      description: "get; deprecated"

- id: numberofrouterhops
  label: Configure Maximum Streaming Router Hops
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: hops
      type: integer
      description: "Required for set: {1..127}"

- id: numdigitsdid
  label: Configure DID Digit Count
  kind: action
  params:
    - name: count
      type: string
      description: "<get|{0..24}>"

- id: numdigitsext
  label: Configure Gateway Extension Digit Count
  kind: action
  params:
    - name: count
      type: string
      description: "<get|{0..24}>"

- id: overlayname
  label: Configure Video Overlay Name
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: name
      type: string
      description: "Required for set; limited to 20 characters; quote strings containing spaces; empty string removes overlay text"

- id: overlaytheme
  label: Configure Video Overlay Theme
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: theme
      type: integer
      description: "Required for set: <0|1|2|3|4|5>; 0 — None, 1 — Green, 2 — Blue, 3 — Red, 4 — Orange, 5 — Yellow"

- id: pause
  label: Pause Command Interpreter
  kind: action
  params:
    - name: seconds
      type: integer
      description: "{0..65535}"

- id: phone
  label: Control Analog Phone Line
  kind: action
  params:
    - name: operation
      type: string
      description: "<clear|flash>; clear clears the phone number text box; flash sends flash hook"

- id: ping
  label: Ping Network Device
  kind: action
  params:
    - name: address
      type: string
      description: "Device IP address: xxx.xxx.xxx.xxx; range UNRESOLVED"
    - name: count
      type: integer
      description: "Optional number of ping attempts; default is 1; range UNRESOLVED"

- id: pip_register
  label: Register PIP Notifications
  kind: action
  params: []

- id: pip_unregister
  label: Unregister PIP Notifications
  kind: action
  params: []

- id: popupinfo
  label: Configure Popup Information Notifications
  kind: action
  params:
    - name: operation
      type: string
      description: "<get|register|unregister>; get returns registration state"

- id: preset_register
  label: Register Preset Notifications
  kind: action
  params: []

- id: preset_unregister
  label: Unregister Preset Notifications
  kind: action
  params: []

- id: preset_register_get
  label: Read Preset Notification Registration
  kind: action
  params: []

- id: priareacode
  label: Configure PRI Area Code
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a PRI network interface"
    - name: area_code
      type: string
      description: "Optional numeric string for set; omit to erase; range UNRESOLVED"

- id: pricallbycall
  label: Configure PRI Call By Call Value
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a PRI network interface"
    - name: value
      type: integer
      description: "Required for set: {0..31}; values greater than 31 are reserved and must not be used"

- id: prichannel
  label: Configure Active PRI Channels
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a PRI network interface"
    - name: channel
      type: string
      description: "all or {1..n}; PRI T1: 1..23; PRI E1: 1..30"
    - name: state
      type: string
      description: "For set: <on|off>; omitted for get; source syntax also documents prichannel set all without a state"

- id: pricsu
  label: Configure PRI CSU Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|internal|external>; T1 interface; external requires PRI line buildout"

- id: pridialchannels
  label: Configure Parallel PRI Dial Channels
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a PRI network interface"
    - name: channels
      type: integer
      description: "{1..n}; PRI T1: 1..12; PRI E1: 1..15; omit for set to erase"

- id: priintlprefix
  label: Configure PRI International Prefix
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: prefix
      type: string
      description: "Optional numeric string for set; omit to erase; range UNRESOLVED"

- id: prilinebuildout
  label: Configure PRI Line Buildout
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: attenuation
      type: string
      description: "Required for set: <0|-7.5|-15|-22.5> dB for internal CSUs, or <0-133|134-266|267-399|400-533|534-665> feet for external CSUs"

- id: prilinesignal
  label: Configure PRI Line Signal
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a PRI network interface"
    - name: signal
      type: string
      description: "Required for set: <esf/b8zs|crc4/hdb3|hdb3>; esf/b8zs is the only T1 choice"

- id: primarycallchoice
  label: Configure Primary Call Type
  kind: action
  params:
    - name: call_type
      type: string
      description: "<get|isdn|ip|sip>"

- id: primarycamera
  label: Configure Primary Camera
  kind: action
  params:
    - name: camera
      type: string
      description: "<get|1|2|3>"

- id: prinumber
  label: Configure PRI Video Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: number
      type: string
      description: "Optional numeric string for set; omit to erase; supplied by network service provider; range UNRESOLVED"

- id: prinumberingplan
  label: Configure PRI Numbering Plan
  kind: action
  params:
    - name: plan
      type: string
      description: "<get|isdn|unknown>; requires a PRI network interface"

- id: prioutsideline
  label: Configure PRI Outside Line Access
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: outside_line
      type: string
      description: "Optional numeric string for set; omit to erase; range UNRESOLVED"

- id: priswitch
  label: Configure PRI Switch Protocol
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: protocol
      type: string
      description: "Required for set: att5ess, att4ess, norteldms, ni2, net5/ctr4, nttins-1500, ts-038"

- id: reboot_yes
  label: Confirm Reboot
  kind: action
  params: []

- id: reboot_no
  label: Decline Reboot
  kind: action
  params: []

- id: recentcalls
  label: Read Recent Calls
  kind: action
  params: []

- id: registerall
  label: Register All Notifications Alias
  kind: action
  params: []

- id: registerthissystem
  label: Configure Global Directory Registration
  kind: action
  params:
    - name: server
      type: string
      description: "Optional {1..5} or all"
    - name: state
      type: string
      description: "<get|yes|no>"

- id: remotecontrol
  label: Configure Remote Control Buttons
  kind: action
  params:
    - name: operation
      type: string
      description: "disable, dontintercept, enable, intercept"
    - name: buttons
      type: string
      description: "all, none, or one or more valid button names; get permitted only after disable or intercept; documented buttons: call, hangup, left, right, up, down, select, home, directory, back, zoom-, zoom+, volume-, volume+, mute, far, near, auto, camera, preset, pip, keyboard, delete, ., 0-9, *, #, graphics, help"

- id: remotemonenable
  label: Read Remote Monitoring State
  kind: action
  params:
    - name: operation
      type: string
      description: "get"

- id: repeat
  label: Repeat Command History Entry
  kind: action
  params:
    - name: command
      type: string
      description: "repeat or !; ! is followed immediately by the entry number or prefix string"
    - name: entry
      type: string
      description: "{1..64}; ! also accepts a string selecting the most recent command beginning with that string; prefix length UNRESOLVED; repeat cannot repeat a repeat command"

- id: requireacctnumtodial
  label: Configure Account Number Requirement
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: roomphonenumber
  label: Configure Room Phone Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: number
      type: string
      description: "Optional for set; omit to erase; quote strings containing spaces; range UNRESOLVED"

- id: rs232
  label: Configure Serial Port
  kind: action
  params:
    - name: command
      type: string
      description: "Select one literal command token: rs232 for the first port, rs232port1 for the second port"
    - name: setting
      type: string
      description: "baud or mode"
    - name: value
      type: string
      description: "baud: <get|9600|14400|19200|38400|57600|115200>; mode: <get|passthru|control|debug|sony_ptz|closed_caption|vortex_mixer|cps|interactive_touch_board|polycom_annotation|smartboard|pointmaker>"

- id: rs232monitor
  label: Configure Serial Port Monitoring
  kind: action
  params:
    - name: state
      type: string
      description: "get, on, off; monitoring output uses Telnet port 23"

- id: rs366dialing
  label: Configure RS366 Dialing
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>; requires a V.35 network interface"

- id: rt
  label: Configure Receive Timing Signal
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|normal|inverted>; requires a V.35 network interface"

- id: rts
  label: Configure Request To Send Signal
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|normal|inverted>; requires a V.35 network interface"

- id: run
  label: Execute Flash Script
  kind: action
  params:
    - name: scriptfilename
      type: string
      description: "Name of flash script containing API commands; filename restrictions UNRESOLVED; each command occupies one line terminated by <CR><LF>"

- id: screen
  label: Navigate Or Register Screen Changes
  kind: action
  params:
    - name: operation
      type: string
      description: "register, unregister, register get, or screen_name; screen_name depends on system configuration and is discovered using screen; supported screen enumeration UNRESOLVED; bare screen query represented by screen_name Feedback"

- id: screencontrol
  label: Configure Screen Navigation Access
  kind: action
  params:
    - name: operation
      type: string
      description: "enable or disable"
    - name: screen_name
      type: string
      description: "all, none, or a specific screen_name; supported screen enumeration UNRESOLVED"

- id: secondarycallchoice
  label: Configure Secondary Call Type
  kind: action
  params:
    - name: call_type
      type: string
      description: "<get|isdn|ip|sip>"

- id: serialnum
  label: Read System Serial Number
  kind: action
  params: []

- id: setaccountnumber
  label: Set Dialing Account Number
  kind: action
  params:
    - name: account_number
      type: string
      description: "Account number for dialing validation; range UNRESOLVED; requireacctnumtodial and validateacctnum must be enabled"

- id: showgatekeeper
  label: Read Gatekeeper Addresses
  kind: action
  params:
    - name: selection
      type: string
      description: "<active|primary|alternates|all>"

- id: sleep_register
  label: Register Sleep Wake Notifications
  kind: action
  params: []

- id: sleep_unregister
  label: Unregister Sleep Wake Notifications
  kind: action
  params: []

- id: sleep_register_get
  label: Read Sleep Notification Registration
  kind: action
  params: []

- id: sleeptext
  label: Configure Screen Saver Text
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: text
      type: string
      description: "Optional for set; omit to erase; quote strings containing spaces; length UNRESOLVED"

- id: sleeptime
  label: Configure Sleep Wait Time
  kind: action
  params:
    - name: minutes
      type: string
      description: "<get|0|1|3|15|30|60|120|240|480>"

- id: snapshottimeout
  label: Configure Snapshot Timeout
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; yes returns to live video after four minutes"

- id: snmpadmin
  label: Configure SNMP Administrator Name
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: admin_name
      type: string
      description: "Optional character string for set; omit to erase; quote strings containing spaces; length UNRESOLVED; change prompts restart"

- id: snmpcommunity
  label: Configure SNMP Community Name
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: community_name
      type: string
      description: "Optional character string for set; omit to erase; quote strings containing spaces; length UNRESOLVED; change prompts restart"

- id: snmpconsoleip
  label: Configure SNMP Console Address
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Optional for set: xxx.xxx.xxx.xxx; omit to erase; range UNRESOLVED"

- id: snmplocation
  label: Configure SNMP Location Name
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: location_name
      type: string
      description: "Optional for set; omit to erase; quote strings containing spaces; length UNRESOLVED; change prompts restart"

- id: snmpsystemdescription
  label: Configure SNMP System Description
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: system_description
      type: string
      description: "Optional for set; omit to erase; length UNRESOLVED"

- id: snmptrapversion
  label: Configure SNMP Trap Version
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: version
      type: string
      description: "Required for set: <v1|v2c>"

- id: soundeffectsvolume
  label: Configure Or Test Sound Effects Volume
  kind: action
  params:
    - name: operation
      type: string
      description: "get, set, test; get also produces a test tone at the current volume"
    - name: level
      type: integer
      description: "Required for set: {0..10}; omitted for get or test"

- id: spidnum
  label: Configure BRI Channel SPID
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a BRI network interface"
    - name: channel
      type: string
      description: "<1b1|1b2|2b1|2b2|3b1|3b2|4b1|4b2>; all also permitted for get"
    - name: spid_number
      type: string
      description: "Optional numeric string for set; omit to erase; supplied by network service provider; range UNRESOLVED"

- id: st
  label: Configure Send Timing Signal
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|normal|inverted>; requires a V.35 network interface"

- id: streamannounce
  label: Configure Streaming Announcement
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: streamaudioport
  label: Configure Streaming Audio Port
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: port
      type: integer
      description: "Optional audio port number for set; omit to erase; range UNRESOLVED"

- id: streamenable
  label: Configure Streaming Enablement
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: streammulticastip
  label: Configure Streaming Multicast Address
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Optional multicast IP address for set: xxx.xxx.xxx.xxx; omit to erase; range UNRESOLVED"

- id: streamrestoredefaults
  label: Restore Streaming Defaults
  kind: action
  params: []

- id: streamrouterhops
  label: Configure Streaming Router Hops
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: hops
      type: integer
      description: "{1..127}; omit for set to erase"

- id: streamspeed
  label: Configure Streaming Speed
  kind: action
  params:
    - name: speed
      type: string
      description: "<get|192|256|384|512>; numeric values are kbps"

- id: streamvideoport
  label: Configure Streaming Video Port
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: port
      type: integer
      description: "Optional video port number for set; omit to erase; range UNRESOLVED"

- id: subnetmask
  label: Configure Subnet Mask
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: mask
      type: string
      description: "Optional for set: xxx.xxx.xxx.xxx; omit to erase; range UNRESOLVED; change prompts restart"

- id: subwoofer
  label: Configure Subwoofer Enablement
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>; VSX 7000 and VSX 7000s only"

- id: subwooferoffset
  label: Configure Subwoofer Level Offset
  kind: action
  params:
    - name: offset
      type: string
      description: "<get|+3|+2|+1|0|-1|-2|-3>; numeric values are dB; VSX 7000 and VSX 7000s only"

- id: sysinfo
  label: Configure System Status Notifications
  kind: action
  params:
    - name: operation
      type: string
      description: "<get|register|unregister>; get returns registration state"

- id: systemname
  label: Configure System Name
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: system_name
      type: string
      description: "Required for set; first character must be numeric or alphabetic including foreign language characters; any combination of alphanumeric characters; up to 30 characters; cannot be blank; quote strings containing spaces"

- id: tcpports
  label: Configure Fixed TCP Ports
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; Fixed Ports must be selected"
    - name: port
      type: integer
      description: "Optional for set: {1024..49150}; omit to erase"

- id: techsupport
  label: Request Management Technical Support
  kind: action
  params:
    - name: phone_num
      type: string
      description: "Contact phone number sent to Global Management System technical support; include area code; quote strings containing spaces; range UNRESOLVED"

- id: teleareacode
  label: Configure Telephone Area Code
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: telephone_area_code
      type: string
      description: "Optional for set; omit to erase; range UNRESOLVED"

- id: telenumber
  label: Configure System Telephone Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: telephone_number
      type: string
      description: "Optional for set; omit to erase; quote strings containing spaces; range UNRESOLVED"

- id: telnetmonitor
  label: Configure Telnet Session Monitoring
  kind: action
  params:
    - name: state
      type: string
      description: "get, on, off; monitoring output uses Telnet port 23"

- id: timediffgmt
  label: Configure GMT Time Difference
  kind: action
  params:
    - name: offset
      type: string
      description: "<get|{-12:00..+12:00}>; +00:00 is GMT"

- id: traceroute
  label: Trace Network Route
  kind: action
  params:
    - name: host
      type: string
      description: "Host name or IP address; range UNRESOLVED"
    - name: hops
      type: integer
      description: "Optional; 0 <hops< 100"

- id: typeofservice
  label: Configure Quality Of Service Type
  kind: action
  params:
    - name: service
      type: string
      description: "<get|ipprecedence|diffserv>"

- id: udpports
  label: Configure Fixed UDP Ports
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; Fixed Ports must be selected"
    - name: port
      type: integer
      description: "Optional for set: {1024..49150}; omit to erase"

- id: unregisterall
  label: Unregister All Notifications Alias
  kind: action
  params: []

- id: usefixedports
  label: Configure Fixed Port Usage
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: usegatekeeper
  label: Configure Gatekeeper Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|off|specify|auto>"

- id: usepathnavigator
  label: Configure PathNavigator Usage
  kind: action
  params:
    - name: mode
      type: string
      description: "<get|always|never|required>"

- id: useroompassword
  label: Configure Shared Room And Remote Password
  kind: action
  params:
    - name: state
      type: string
      description: "get, yes, no"

- id: v35broadcastmode
  label: Configure V35 Broadcast Mode
  kind: action
  params:
    - name: state
      type: string
      description: "<get|on|off>; requires a V.35 network interface; source examples use v35broadcast instead of v35broadcastmode, alias equivalence UNRESOLVED"

- id: v35dialingprotocol
  label: Configure V35 Dialing Protocol
  kind: action
  params:
    - name: protocol
      type: string
      description: "<get|rs366>; requires a V.35 network interface"

- id: v35num
  label: Configure V35 Channel Number
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; requires a V.35 network interface"
    - name: channel
      type: string
      description: "<1b1|1b2>; 1b1 is port 1 and 1b2 is port 2"
    - name: number
      type: string
      description: "Optional numeric string for set; omit to erase; supplied by network service provider; range UNRESOLVED"

- id: v35portsused
  label: Configure V35 Ports Used
  kind: action
  params:
    - name: ports
      type: string
      description: "<get|1|1+2>"

- id: v35prefix
  label: Configure V35 Dialing Prefix
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; a profile must already be selected"
    - name: speed
      type: string
      description: "56, 64, 2x56, 112, 2x64, 128, 168, 192, 224, 256, 280, 320, 336, 384, 392, 7x64, 504, 512, 560, 576, 616, 640, 672, 704, 728, 768, 784, 832, 840, 14x64, 952, 960, 1008, 1024, 1064, 1088, 1120, 1152, 1176, 1216, 1232, 1280, 1288, 21x64, 1400, 1408, 1456, 1472, 1512, 1536, 1568, 1600, 1624, 1664, 1680, 1728, 28x64, 1856, 1920, all; all lists available speeds and associated prefixes"
    - name: value
      type: string
      description: "Optional prefix for set; omit to erase; consult DCE user guide; range UNRESOLVED"

- id: v35profile
  label: Configure V35 Calling Profile
  kind: action
  params:
    - name: profile
      type: string
      description: "<get|adtran|adtran_isu512|ascend|ascend_vsx|ascend_max|avaya_mcu|custom_1|fvc.com|initia|lucent_mcu|madge_teleos>"

- id: v35suffix
  label: Configure V35 Dialing Suffix
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set; a profile must already be selected"
    - name: speed
      type: string
      description: "56, 64, 2x56, 112, 2x64, 128, 168, 192, 224, 256, 280, 320, 336, 384, 392, 7x64, 504, 512, 560, 576, 616, 640, 672, 704, 728, 768, 784, 832, 840, 14x64, 952, 960, 1008, 1024, 1064, 1088, 1120, 1152, 1176, 1216, 1232, 1280, 1288, 21x64, 1400, 1408, 1456, 1472, 1512, 1536, 1568, 1600, 1624, 1664, 1680, 1728, 28x64, 1856, 1920, all"
    - name: value
      type: string
      description: "Optional suffix for set; omit to erase; consult DCE user guide; range UNRESOLVED"

- id: validateacctnum
  label: Configure Account Number Validation
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; available only when Require Account Number to Dial is enabled"

- id: vcbutton_register
  label: Register Visual Concert Button Notifications
  kind: action
  params: []

- id: vcbutton_unregister
  label: Unregister Visual Concert Button Notifications
  kind: action
  params: []

- id: vcraudioout
  label: Configure Continuous VCR Audio Output
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>"

- id: vcrrecordsource
  label: Configure VCR Record Source
  kind: action
  params:
    - name: source
      type: string
      description: "get or <near|far|auto|content|content-or-near|content-or-far|content-or-auto|none>; cannot configure while Monitor 2 is enabled"

- id: vcstream
  label: Configure Visual Concert Stream Notifications
  kind: action
  params:
    - name: operation
      type: string
      description: "<state|register|unregister>; state reads stream status"

- id: version
  label: Read System Version
  kind: action
  params: []

- id: vgaqualitypreference
  label: Configure People Content Bandwidth Preference
  kind: action
  params:
    - name: preference
      type: string
      description: "get or <content|people|both>"

- id: videocallorder
  label: Configure Video Call Protocol Order
  kind: action
  params:
    - name: protocol
      type: string
      description: "<isdn|h323|sip>"
    - name: slot
      type: integer
      description: "<1|2|3>"

- id: voicecallorder
  label: Configure Voice Call Protocol Order
  kind: action
  params:
    - name: protocol
      type: string
      description: "<pots|voice|vtx>"
    - name: slot
      type: integer
      description: "<1|2|3>; relative positions shown as 3-5 in the user interface if video protocols are enabled"

- id: volume_register
  label: Register Volume Notifications
  kind: action
  params: []

- id: volume_unregister
  label: Unregister Volume Notifications
  kind: action
  params: []

- id: vortex
  label: Control Connected Vortex Mixer
  kind: action
  params:
    - name: port
      type: integer
      description: "<0|1>; serial port connected to the Vortex mixer"
    - name: operation
      type: string
      description: "mute or forward"
    - name: value
      type: string
      description: "For mute: <on|off>; for forward: vortex_macro, a Vortex-specific command; macro enumeration UNRESOLVED"

- id: vtxstate
  label: Read Conference Phone State
  kind: action
  params:
    - name: operation
      type: string
      description: "get"

- id: waitfor
  label: Wait For Call Or System Readiness
  kind: action
  params:
    - name: event
      type: string
      description: "<callcomplete|systemready>"

- id: wanipaddress
  label: Configure WAN IP Address
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Optional for set: xxx.xxx.xxx.xxx; omit to erase; range UNRESOLVED; NAT Configuration must be Auto, Manual, or UPnP"

- id: webport
  label: Configure Web Access Port
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: port
      type: integer
      description: "Required for set; range UNRESOLVED; default port 80; change prompts restart"

- id: whoami
  label: Read System Banner Information
  kind: action
  params: []

- id: winsresolution
  label: Configure WINS Resolution
  kind: action
  params:
    - name: state
      type: string
      description: "<get|yes|no>; change prompts restart"

- id: winsserver
  label: Configure WINS Server
  kind: action
  params:
    - name: operation
      type: string
      description: "get or set"
    - name: address
      type: string
      description: "Optional for set: xxx.xxx.xxx.xxx; omit to erase; range UNRESOLVED; requires manual IP addressing; change prompts restart"

- id: xmladvnetstats
  label: Read Advanced Network Statistics XML
  kind: action
  params:
    - name: call
      type: integer
      description: "Optional {0..n}; n is the maximum number of calls supported by the system"

- id: xmlnetstats
  label: Read Network Statistics XML
  kind: action
  params:
    - name: call
      type: integer
      description: "Optional {0..n}; n is the maximum number of calls supported by the system"
```

## Feedbacks
```yaml
- id: call_state
  type: event
  description: "Call status notifications (RINGING, CONNECTED, COMPLETE, etc.) via callstate register"

- id: mute_state
  type: enum
  values: [on, off]
  description: "Near/far mute state via mute register"

- id: volume_level
  type: integer
  description: "Current volume level 0-50 via volume register"
  query_command: "volume get"

- id: camera_source
  type: integer
  description: "Current camera source number via camera register"

- id: pip_state
  type: enum
  values: [on, off]
  description: "PIP on/off state via pip register"

- id: screen_name
  type: string
  description: "Current UI screen name via screen register"
  query_command: "screen"

- id: sleep_wake
  type: enum
  values: [sleep, wake]
  description: "Sleep/wake events via sleep register"

- id: preset_change
  type: event
  description: "Preset set/go events via preset register"

- id: vcbutton_state
  type: enum
  values: [play, stop]
  description: "Visual Concert VSX button state via vcbutton register"
  query_command: "vcbutton get"

- id: call_info
  type: string
  description: "Call information (callid, far site name/number/speed/status/mute/direction/type) via callinfo"
  query_command: "callinfo all"

- id: getcallstate
  type: string
  description: "Call state for all conference connections"
  query_command: "getcallstate"

- id: advnetstats
  type: string
  description: "Advanced network statistics per connection (audio/video rates, packet loss, jitter)"
  query_command: "advnetstats"

- id: netstats
  type: string
  description: "Network statistics summary per call"
  query_command: "netstats"

- id: mute_far_state
  type: enum
  values: [on, off]
  description: "Far site mute state via mute far get"
  query_command: "mute far get"

- id: autoanswer_state
  type: enum
  values: [yes, no, donotdisturb]
  description: "Current auto answer mode via autoanswer get"
  query_command: "autoanswer get"

- id: pip_location
  type: integer
  description: "Current PIP corner position 0-3 via pip location get"
  query_command: "pip location get"

- id: volume_get
  type: integer
  description: "Current volume level 0-50 via volume get"
  query_command: "volume get"

- id: get_screen
  type: string
  description: "Current user interface screen through the documented alternative query"
  query_command: "get screen"

- id: configdisplay
  type: string
  description: "Video format and aspect ratio for the monitors"
  query_command: "configdisplay get"

- id: configpresentation
  type: string
  description: "Current content presentation settings for active monitors"
  query_command: "configpresentation get"

- id: mpautoanswer
  type: enum
  values: [yes, no, donotdisturb]
  description: "Current Auto Answer Multipoint mode"
  query_command: "mpautoanswer get"

- id: mpmode
  type: enum
  values: [auto, discussion, presentation, fullscreen]
  description: "Current multipoint conference viewing mode"
  query_command: "mpmode get"
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: 50
  description: "Master audio volume level"

- id: audiotransmitlevel
  type: integer
  min: -20
  max: 30
  description: "Audio transmit level in dB"

- id: soundeffectsvolume
  type: integer
  min: 0
  max: 10
  description: "Ring tone and user alert volume"

- id: sleeptime
  type: integer
  description: "Minutes of inactivity before sleep (0, 1, 3, 15, 30, 60, 120, 240, 480)"

- id: rs232_baud
  type: integer
  description: "RS-232 baud rate (9600, 14400, 19200, 38400, 57600, 115200)"

- id: rs232_mode
  type: string
  description: "RS-232 mode (passthru, control, debug, sony_ptz, closed_caption, etc.)"

- id: streamspeed
  type: integer
  description: "Streaming speed in kbps (192, 256, 384, 512)"
```

## Events
```yaml
- id: callstate_notification
  description: "Unsolicited call state changes when registered via callstate register or all register"

- id: linestate_notification
  description: "IP or ISDN line state changes via linestate register"

- id: button_intercept
  description: "Remote control button press events when intercepted via remotecontrol intercept"

- id: popupinfo_notification
  description: "Popup dialog text and button choices via popupinfo register"

- id: configchange_notification
  description: "Configuration variable changes (deprecated) via configchange register"

- id: chaircontrol_notification
  description: "Chair control operations via chaircontrol register"

- id: vcstream_notification
  description: "Visual Concert VSX stream state changes via vcstream register"
```

## Macros
```yaml
# UNRESOLVED: source references script execution via `run` command but no specific macro sequences documented
```

## Safety
```yaml
confirmation_required_for:
  - reboot
interlocks:
  - "Changing monitor format between VGA and composite/S-Video causes system restart"
  - "Several network configuration changes prompt system restart"
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- All API commands are case sensitive. Use full command strings, not abbreviations.
- The RS-232 port must be set to Control mode (not Pass-Thru) for API usage.
- When Security Mode is enabled, Telnet sessions require TLS and the remote access password.
- `adminpassword` command is not supported on the serial port.
- The `notify`/`nonotify` commands are preferred over `callstate register`/`unregister` for call state parsing.
- `all register` registers for the most commonly-used event notifications in one command.
- Camera PTZ ranges: pan -880 to 880, tilt -300 to 300, zoom 0 to 1023.
- The source documents API version 8.7 with approximately 200+ commands across 15 categories (API Utility, Audio, Call, Cameras/Content/Monitors, Diagnostics, Global Services, Home Screen, Directory, Network, Notification, Security, Serial Port, Streaming, System Settings, Telephony/V.35). This spec covers the primary AV control subset.

<!-- UNRESOLVED: serial data bits, parity, stop bits, and flow control not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: full command catalog (~200+ commands) exceeds this spec; see source Appendix B for categorical list -->

## Provenance

```yaml
source_domains:
  - dekom.com
  - manualslib.com
source_urls:
  - https://www.dekom.com/fileadmin/user_upload/manufacturers/polycom/polycom_vsx_series/polycom_vsx_series_integrator_reference_manual_en.pdf
  - https://www.manualslib.com/manual/784027/Polycom-Vsx-Series.html
retrieved_at: 2026-05-02T21:56:30.537Z
last_checked_at: 2026-10-07T21:08:35.020Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:08:35.020Z
matched_actions: 365
action_count: 365
confidence: medium
summary: "All 365 units map to source commands with matching shapes. Port 24, baud 9600 and TLS are sourced. Id echoctone_set was read as semantic for echocanceller yes/no. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial data bits, parity, and stop bits not stated in source"
- "source documents 200+ commands; spec below covers primary AV control commands"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "source references script execution via `run` command but no specific macro sequences documented"
- "no explicit safety interlock procedures documented in source"
- "serial data bits, parity, stop bits, and flow control not stated in source"
- "firmware version compatibility range not stated"
- "full command catalog (~200+ commands) exceeds this spec; see source Appendix B for categorical list"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
