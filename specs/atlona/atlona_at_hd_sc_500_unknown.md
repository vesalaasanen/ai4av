---
spec_id: admin/atlona-at-hd-sc-500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HD-SC-500 Control Spec"
manufacturer: Atlona
model_family: AT-HD-SC-500
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HD-SC-500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HD-SC-500_API.pdf
retrieved_at: 2026-05-14T11:07:09.275Z
last_checked_at: 2026-06-02T21:39:58.801Z
generated_at: 2026-06-02T21:39:58.801Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default serial baud rate not stated in source — only supported values listed"
  - "firmware version compatibility range not stated"
  - "default not stated; supported: 2400, 4800, 9600, 19200, 38400, 57600, 115200"
  - "default not stated; supported: 7, 8"
  - "default not stated; supported: None, Odd, Even"
  - "default not stated; supported: 1, 2"
  - "not stated in source"
  - "no continuously-settable analog parameters beyond those covered by actions"
  - "no unsolicited notification events documented in source"
  - "no multi-step macro sequences documented in source"
  - "default serial baud/data/parity/stop not stated"
  - "no warm-up/power-on delay documented for the unit itself (LampCool refers to a connected projector)"
  - "CEC command details beyond TrigCEC trigger not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:58.801Z
  matched_actions: 82
  action_count: 82
  confidence: medium
  summary: "Complete HDMI/VGA scaler protocol with dual transport (serial + Telnet), audio/video routing, display, and network configuration (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Atlona AT-HD-SC-500 Control Spec

## Summary
The Atlona AT-HD-SC-500 is an HDMI/VGA scaler and switcher with 2 HDMI inputs, 1 VGA input, and HDMI + analog audio outputs. Control is via RS-232 serial or TCP (Telnet). Commands are case-sensitive ASCII strings terminated with CR (0x0d); responses are terminated with CR+LF (0x0a). A minimum of 500ms must separate consecutive commands. Failed commands return "Command FAILED".

<!-- UNRESOLVED: default serial baud rate not stated in source — only supported values listed -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default Telnet port per IPPort and IPCFG examples
serial:
  baud_rate: null  # UNRESOLVED: default not stated; supported: 2400, 4800, 9600, 19200, 38400, 57600, 115200
  data_bits: null  # UNRESOLVED: default not stated; supported: 7, 8
  parity: null  # UNRESOLVED: default not stated; supported: None, Odd, Even
  stop_bits: null  # UNRESOLVED: default not stated; supported: 1, 2
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: optional  # IPLogin on/off controls whether Telnet requires credentials; default password is "Atlona"
```

## Traits
```yaml
- powerable  # inferred: DispBtn on/off, AutoDispOn/AutoDispOff
- routable   # inferred: Input command switches HDMI1/HDMI2/VGA
- queryable  # inferred: most commands accept "sta" to return current value
- levelable  # inferred: VOUT1 volume, BRT, CTRST, HUE, SHARP, SATRT, Bass, Treble
```

## Actions
```yaml
- id: input_select
  label: Select Input
  kind: action
  params:
    - name: input
      type: enum
      values: [HDMI 1, HDMI 2, VGA, sta]
      description: Active input source
  command: Input {input}

- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: ["0", "1", "2", "3", "4"]
      description: "0=Full, 1=16:9, 2=16:10, 3=4:3, 4=Keep Ratio"
  command: Aspect {ratio}

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Volume level (-80 to 6, or +/- for relative)"
  command: VOUT1 {level}

- id: mute
  label: Audio Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: "on=mute, off=unmute, sta=query"
  command: VOUTMute1 {state}

- id: disp_btn
  label: Display Button
  kind: action
  params:
    - name: state
      type: enum
      values: [On, Off, Tog, Sta]
      description: Simulate front-panel DISPLAY button
  command: DispBtn {state}

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, or sta to query"
  command: BRT {value}

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, or sta to query"
  command: CTRST {value}

- id: hue_set
  label: Set Hue
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, or sta to query"
  command: HUE {value}

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, or sta to query"
  command: SHARP {value}

- id: saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100, or sta to query"
  command: SATRT {value}

- id: bass_set
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "-12 to 15, +/- for relative, sta to query"
  command: Bass {value}

- id: treble_set
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "-12 to 15, +/- for relative, sta to query"
  command: Treble {value}

- id: ana_gain_set
  label: Set Analog Audio Gain
  kind: action
  params:
    - name: gain
      type: integer
      description: "0-16"
  command: AnaGain {gain}

- id: video_output_resolution
  label: Set Output Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27"]
      description: "0=800x600p60 .. 26=1920x1080p60, 27=NATIVE; sta to query"
  command: VidOutRes {res}

- id: hdmi_audio
  label: HDMI Audio Output
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Enable/disable HDMI audio output
  command: HDMIAUD {state}

- id: lr_audio
  label: L/R Audio Output
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Enable/disable L/R analog audio output
  command: LRAUD {state}

- id: audio_src
  label: Set Audio Source
  kind: action
  params:
    - name: port
      type: enum
      values: ["1", "2"]
      description: HDMI input number
    - name: type
      type: enum
      values: [auto, dig, ana]
      description: "auto=auto-detect, dig=digital, ana=analog"
  command: AudioSrc{port} {type}

- id: hdcp_set1
  label: Set HDCP HDMI IN 1
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: HDCP detection on HDMI IN 1
  command: HDCPSet1 {state}

- id: hdcp_set2
  label: Set HDCP HDMI IN 2
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: HDCP detection on HDMI IN 2
  command: HDCPSet2 {state}

- id: hdmi_video_out
  label: HDMI Video Output Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Enable/disable HDMI video output
  command: "x1$ {state}"

- id: hzoom_set
  label: Set Horizontal Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: "0-50, sta to query"
  command: HZoom {value}

- id: vzoom_set
  label: Set Vertical Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: "0-50, sta to query"
  command: VZoom {value}

- id: zoom_set
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Enable/disable overscan
  command: Zoom {state}

- id: mirror_v
  label: Vertical Mirror
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Enable/disable vertical mirroring
  command: MirrorV {state}

- id: color_space_set
  label: Set Output Color Space
  kind: action
  params:
    - name: value
      type: enum
      values: ["0", "1", sta]
      description: "0=RGB, 1=YUV"
  command: SetCS {value}

- id: auto_sw
  label: Auto Switching
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Enable/disable auto input switching
  command: AutoSW {state}

- id: asw_pre_port
  label: Set Auto-Switch Fallback Input
  kind: action
  params:
    - name: port
      type: enum
      values: [HDMI1, HDMI2, VGA, Prev, sta]
      description: Fallback input for auto-switching
  command: ASwPrePort {port}

- id: asw_out_time
  label: Set Auto-Switch Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: "1-600 seconds"
  command: ASwOutTime {seconds}

- id: auto_disp_on
  label: Auto Display On
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Power-on display when signal detected
  command: AutoDispOn {state}

- id: auto_disp_off
  label: Auto Display Off
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Power-off display when signal lost
  command: AutoDispOf {state}

- id: auto_pwr_mode
  label: Auto Power Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [DISPAVON, DISPAVSW, AVSW, sta]
      description: Display auto power on/off mode
  command: AutoPwrMode {mode}

- id: ctl_type
  label: Set Display Control Protocol
  kind: action
  params:
    - name: protocol
      type: enum
      values: [rs232, IP, CEC, sta]
      description: Protocol for display on/off commands
  command: CtrlType {protocol}

- id: lamp_cool
  label: Set Lamp Cool-Down
  kind: action
  params:
    - name: seconds
      type: integer
      description: "0-300 seconds, sta to query"
  command: LampCool {seconds}

- id: panel_lock
  label: Lock Front Panel
  kind: action
  params: []
  command: Lock

- id: panel_unlock
  label: Unlock Front Panel
  kind: action
  params: []
  command: Unlock

- id: pw_lock
  label: Display Button Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Lock/unlock DISPLAY key on front panel
  command: PWLock {state}

- id: osd_location
  label: Set OSD Position
  kind: action
  params:
    - name: position
      type: enum
      values: ["0", "1", "2", "3", "4", sta]
      description: "0=Left-Top, 1=Right-Top, 2=Right-Bottom, 3=Left-Bottom, 4=Center"
  command: OSD {position}

- id: osd_alpha
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: "0-15, sta to query"
  command: OSDAlpha {value}

- id: osd_bg_color
  label: Set OSD Background Color
  kind: action
  params:
    - name: color
      type: enum
      values: ["0", "1", "2", "3", sta]
      description: "0=grey, 1=cyan, 2=magenta, 3=yellow"
  command: OSDBGRND {color}

- id: info_osd
  label: Info OSD Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, auto, sta]
      description: "on=always, off=hidden, auto=show on resolution change"
  command: INFOOSD {state}

- id: info_tmr
  label: Info Screen Timer
  kind: action
  params:
    - name: seconds
      type: integer
      description: "5-100 seconds, sta to query"
  command: INFOTMR {seconds}

- id: menu_tmr
  label: OSD Menu Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: "5-100 seconds, sta to query"
  command: MENUTMR {seconds}

- id: osd_up
  label: OSD Cursor Up
  kind: action
  params: []
  command: Up

- id: osd_down
  label: OSD Cursor Down
  kind: action
  params: []
  command: Down

- id: osd_select
  label: OSD Select
  kind: action
  params: []
  command: Select

- id: osd_quit
  label: OSD Quit
  kind: action
  params: []
  command: QOSD

- id: vout_osd
  label: Volume OSD Bar
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Show/hide volume bar in OSD
  command: VOUTOSD {state}

- id: broadcast
  label: Broadcast Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: Sync web GUI changes to control system via TCP/IP
  command: Broadcast {state}

- id: cmd_fmt
  label: Set Command Format
  kind: action
  params:
    - name: format
      type: enum
      values: [ascii, hex, sta]
      description: Display format for commands
  command: CMDFMT {format}

- id: pic_reset
  label: Reset Picture Settings
  kind: action
  params: []
  command: PicReset

- id: vga_auto
  label: VGA Auto-Adjust
  kind: action
  params: []
  command: VGAAuto

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  command: Mreset

- id: set_standby_timer
  label: Set Standby Timer
  kind: action
  params:
    - name: seconds
      type: integer
      description: "5-240 seconds, sta to query"
  command: SetOff {seconds}

- id: dis_warm_up
  label: Display Warm-Up Interval
  kind: action
  params:
    - name: seconds
      type: integer
      description: "0-300 seconds, sta to query"
  command: DisWarmUp {seconds}

- id: hdmi_timing
  label: Set Preferred HDMI Timing
  kind: action
  params:
    - name: timing
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", sta]
      description: "0=800x600 .. 6=1920x1080, 7=1920x1200"
  command: PTIMGHDMI {timing}

- id: vga_timing
  label: Set Preferred VGA Timing
  kind: action
  params:
    - name: timing
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "7", sta]
      description: "0=800x600 .. 7=1920x1200"
  command: PTIMGVGA {timing}

- id: aspbgrnd
  label: Set Letterbox Matte Color
  kind: action
  params:
    - name: color
      type: enum
      values: ["0", "1"]
      description: "0=Grey, 1=Black"
  command: ASPBGRND {color}

- id: btn_vol
  label: Set Volume Button Behavior
  kind: action
  params:
    - name: mode
      type: enum
      values: [AudOut, RS232, IP, sta]
      description: "AudOut=direct audio, RS232=serial, IP=Ethernet"
  command: BTNVol {mode}

- id: trig_cec
  label: Trigger CEC Command
  kind: action
  params:
    - name: command
      type: enum
      values: [on, off, vol+, vol-, mute]
  command: TrigCEC {command}

- id: trig_ip
  label: Trigger IP Command
  kind: action
  params:
    - name: command
      type: enum
      values: [on, off, vol+, vol-, mute]
  command: TrigIP {command}

- id: trig_rs
  label: Trigger RS-232/IP Command
  kind: action
  params:
    - name: command
      type: enum
      values: [on, off, vol+, vol-, mute]
  command: TrigRS {command}

- id: ip_login
  label: Set Telnet Login Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
      description: "on=require credentials, off=no login required"
  command: IPLogin {state}

- id: ip_port
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer
      description: "0-65535, sta to query"
  command: IPPort {port}

- id: ip_dhcp
  label: Set DHCP Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off, sta]
  command: IPDHCP {state}

- id: ip_static
  label: Set Static IP
  kind: action
  params:
    - name: address
      type: string
      description: IP address in dot-decimal notation
    - name: mask
      type: string
      description: Subnet mask in dot-decimal notation
    - name: gateway
      type: string
      description: Gateway address in dot-decimal notation
  command: IPStatic {address} {mask} {gateway}

- id: ip_timeout
  label: Set Telnet Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: "0-60000 seconds"
  command: IPTimeout {seconds}

- id: ip_quit
  label: Terminate Telnet Session
  kind: action
  params: []
  command: IPQuit

- id: ip_add_user
  label: Add Telnet User
  kind: action
  params:
    - name: username
      type: string
      description: "Max 20 characters"
    - name: password
      type: string
      description: "Max 20 characters"
  command: IPAddUser {username} {password}

- id: ip_del_user
  label: Delete Telnet User
  kind: action
  params:
    - name: username
      type: string
  command: IPDelUser {username}

- id: cli_ip_addr
  label: Set Telnet Client IP
  kind: action
  params:
    - name: address
      type: string
      description: IP address in dot-decimal notation
  command: CliIPAddr {address}

- id: cli_mode
  label: Set Client Login Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [login, non-login, sta]
  command: CliMode {mode}

- id: cli_port
  label: Set Client Listening Port
  kind: action
  params:
    - name: port
      type: integer
      description: "0-65535"
  command: CliPort {port}

- id: cs_para
  label: Set Serial Device Config
  kind: action
  params:
    - name: config
      type: string
      description: "Format: [baud,databits,parity,stopbits] e.g. [115200,8,0,1]"
  command: CSpara{config}

- id: uart_para
  label: Set Serial Port Config
  kind: action
  params:
    - name: config
      type: string
      description: "Format: baud,databits,parity,stopbits e.g. 115200,8,0,1"
  command: UARTPara {config}

- id: set_cmd
  label: Assign Command to Button
  kind: action
  params:
    - name: button
      type: enum
      values: [on, off, vol+, vol-, mute]
      description: Front panel button
    - name: command
      type: string
      description: Command string to assign
  command: SetCmd {button}[{command}]

- id: set_cmd_fb
  label: Set Command Feedback String
  kind: action
  params:
    - name: feedback
      type: string
      description: Feedback string for command key
  command: SetCmdFB {feedback}

- id: set_end
  label: Set Command End Character
  kind: action
  params:
    - name: command
      type: enum
      values: [on, off, vol+, vol-, mute, fbkon, fbkoff, fbkmute]
    - name: eol
      type: enum
      values: [None, CR, LF, CR-LF, Space, STX, ETX, null]
      description: End-of-line character
  command: SetEnd {command}[{eol}]

- id: help
  label: Help
  kind: action
  params:
    - name: command
      type: string
      description: Optional command name for specific help
  command: Help {command}

- id: system_info
  label: System Info
  kind: action
  params:
    - name: query
      type: enum
      values: [sta]
      description: Must be "sta"
  command: System {query}

- id: ip_config
  label: Show Network Config
  kind: action
  params: []
  command: IPCFG

- id: version
  label: Show Firmware Version
  kind: action
  params: []
  command: Version

- id: mac_address
  label: Show MAC Address
  kind: action
  params: []
  command: RAtlMac
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWOFF]
  description: Power status from System sta response

- id: input_state
  type: enum
  values: ["HDMI 1", "HDMI 2", VGA]
  description: Current active input (Input sta)

- id: volume_level
  type: integer
  description: "Volume level -80 to 6 (VOUT1 with no args)"

- id: mute_state
  type: enum
  values: [on, off]
  description: Mute state (VOUTMute1 sta)

- id: firmware_version
  type: string
  description: Firmware version string (Version command)
```

## Variables
```yaml
# UNRESOLVED: no continuously-settable analog parameters beyond those covered by actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# LampCool command sets cool-down interval before projector power-off -
# device ignores commands during cool-down cycle. Not marked as interlock
# since source does not describe a mandatory safety sequence.
```

## Notes
- Commands are case-sensitive and must be entered exactly as documented.
- Each command must be terminated with CR (0x0d); feedback is terminated with CR+LF (0x0a).
- Minimum 500ms between consecutive commands.
- Failed or incorrectly entered commands return "Command FAILED".
- Telnet default port is 23; configurable via IPPort command.
- Default Telnet password is "Atlona"; configurable via CliPass.
- Serial config is set via CSpara (for connected serial device) or UARTPara (for the control serial port).
- The VidOutRes command supports 28 resolution presets (0–27) plus NATIVE.
<!-- UNRESOLVED: default serial baud/data/parity/stop not stated -->
<!-- UNRESOLVED: no warm-up/power-on delay documented for the unit itself (LampCool refers to a connected projector) -->
<!-- UNRESOLVED: CEC command details beyond TrigCEC trigger not documented -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HD-SC-500_API.pdf
retrieved_at: 2026-05-14T11:07:09.275Z
last_checked_at: 2026-06-02T21:39:58.801Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:58.801Z
matched_actions: 82
action_count: 82
confidence: medium
summary: "Complete HDMI/VGA scaler protocol with dual transport (serial + Telnet), audio/video routing, display, and network configuration (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default serial baud rate not stated in source — only supported values listed"
- "firmware version compatibility range not stated"
- "default not stated; supported: 2400, 4800, 9600, 19200, 38400, 57600, 115200"
- "default not stated; supported: 7, 8"
- "default not stated; supported: None, Odd, Even"
- "default not stated; supported: 1, 2"
- "not stated in source"
- "no continuously-settable analog parameters beyond those covered by actions"
- "no unsolicited notification events documented in source"
- "no multi-step macro sequences documented in source"
- "default serial baud/data/parity/stop not stated"
- "no warm-up/power-on delay documented for the unit itself (LampCool refers to a connected projector)"
- "CEC command details beyond TrigCEC trigger not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
