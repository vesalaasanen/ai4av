---
spec_id: admin/vaddio-easyip-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio EasyIP Series Control Spec"
manufacturer: Vaddio
model_family: "EasyIP 10 Camera (999-30200-000)"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "EasyIP 10 Camera (999-30200-000)"
    - "EasyIP Decoder (999-60210-000)"
    - "EasyIP Mixer (999-60320-000)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
  - manualslib.com
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://files.avprosupply.com/files/attachments/473597/vaddio-999-60210-000-manual.pdf
  - https://www.manualslib.com/manual/1851740/Vaddio-Easyip-Systems.html
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - https://res.cloudinary.com/avd/image/upload/v134214804/Resources/Vaddio/Cameras/Operation/411-0041-35_Rev_D_EasyIP_System_Complete_Manual.pdf
  - https://www.manualslib.com/manual/1988072/Vaddio-Easyip-999-60210-000.html
retrieved_at: 2026-07-26T09:02:27.463Z
last_checked_at: 2026-08-05T08:49:05.069Z
generated_at: 2026-08-05T08:49:05.069Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 baud rate, data bits, parity, stop bits, and flow control not stated in source."
  - "firmware version compatibility not stated in source."
  - "credential encoding and login exchange not specified in source"
  - "baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "full audio volume dB range not stated in source."
  - "source documents no unsolicited protocol notifications."
  - "source states that command API is used for macros but does not document macro authoring syntax."
  - "RS-232 serial line parameters not stated in source."
  - "EasyIP 20 camera is not covered by this source."
  - "macro authoring syntax not documented."
  - "full audio volume range not stated."
  - "admin login exchange and credential encoding not specified."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:49:05.069Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions match wire-literal commands documented in the source, transport port 23 is verbatim, and the source carries no additional functional commands beyond what the spec represents. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Vaddio EasyIP Series Control Spec

## Summary

Vaddio EasyIP Series includes EasyIP 10 Camera, EasyIP Decoder, and EasyIP Mixer. External controllers use Vaddio Telnet Serial Command API over TCP port 23; EasyIP Mixer also provides an RS-232 control port. Telnet is disabled by default and requires admin-account login after being enabled.

<!-- UNRESOLVED: RS-232 baud rate, data bits, parity, stop bits, and flow control not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
auth:
  type: password
  account: admin
  # UNRESOLVED: credential encoding and login exchange not specified in source
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
```

## Traits

```yaml
traits:
  - powerable  # inferred from standby commands
  - queryable  # inferred from get and status commands
  - levelable  # inferred from PTZ, volume, and gain commands
  - routable  # inferred from audio and video routing commands
```

## Actions

```yaml
- id: camera_home
  label: Camera Home
  kind: action
  command: "camera <input> home"
  params:
    - name: input
      type: integer
      required: false
      description: "Decoder input 1-4 or Mixer input 2-5; omit when sent directly to camera."

- id: camera_pan
  label: Camera Pan
  kind: action
  command: "camera <input> pan { left [<speed>] | right [<speed>] | stop | get | set <position> [<speed>] }"
  params:
    - name: input
      type: integer
      required: false
    - name: operation
      type: enum
      values: [left, right, stop, get, set]
    - name: speed
      type: integer
      required: false
      range: [1, 24]
      default: 12
    - name: position
      type: float
      required: false
      description: "Absolute position in degrees, approximately -155.00 to 155.00."
  notes: "`set` blocks later commands until target position is reached."

- id: camera_tilt
  label: Camera Tilt
  kind: action
  command: "camera <input> tilt { up [<speed>] | down [<speed>] | stop | get | set <position> [<speed>] }"
  params:
    - name: input
      type: integer
      required: false
    - name: operation
      type: enum
      values: [up, down, stop, get, set]
    - name: speed
      type: integer
      required: false
      range: [1, 20]
      default: 10
    - name: position
      type: float
      required: false
      range: [-30.00, 93.00]
      unit: degrees
  notes: "Image Flip changes reported range to 30.00 through -93.00. `set` blocks later commands."

- id: camera_zoom
  label: Camera Zoom
  kind: action
  command: "camera <input> zoom { in [<speed>] | out [<speed>] | stop | get | set <position> }"
  params:
    - name: input
      type: integer
      required: false
    - name: operation
      type: enum
      values: [in, out, stop, get, set]
    - name: speed
      type: integer
      required: false
      range: [1, 7]
    - name: position
      type: float
      required: false
      range: [1.00, 10.00]

- id: camera_focus
  label: Camera Focus
  kind: action
  command: "camera <input> focus { near [<speed>] | far [<speed>] | stop }"
  params:
    - name: input
      type: integer
      required: false
    - name: operation
      type: enum
      values: [near, far, stop]
    - name: speed
      type: integer
      required: false
      range: [1, 8]
  notes: "`near` and `far` require manual focus mode."

- id: camera_focus_mode
  label: Camera Focus Mode
  kind: action
  command: "camera <input> focus mode {get | auto | manual}"
  params:
    - name: input
      type: integer
      required: false
    - name: mode
      type: enum
      values: [get, auto, manual]

- id: camera_preset_recall
  label: Camera Preset Recall
  kind: action
  command: "camera <input> preset recall <1-16> [save-ccu]"
  params:
    - name: input
      type: integer
      required: false
    - name: index
      type: integer
      range: [1, 16]
    - name: save_ccu
      type: boolean
      required: false

- id: camera_preset_store
  label: Camera Preset Store
  kind: action
  command: "camera <input> preset store <1-16> [save-ccu]"
  params:
    - name: input
      type: integer
      required: false
    - name: index
      type: integer
      range: [1, 16]
    - name: save_ccu
      type: boolean
      required: false

- id: camera_ccu_get
  label: Camera CCU Get
  kind: query
  command: "camera <input> ccu get <param>"
  params:
    - name: input
      type: integer
      required: false
    - name: param
      type: enum
      values:
        - auto_iris
        - auto_white_balance
        - backlight_compensation
        - blue_gain
        - chroma
        - detail
        - gain
        - iris
        - red_gain
        - gamma
        - wide_dynamic_range
        - all

- id: camera_ccu_set
  label: Camera CCU Set
  kind: action
  command: "camera <input> ccu set <param> <value>"
  params:
    - name: input
      type: integer
      required: false
    - name: param
      type: enum
      values:
        - auto_iris
        - auto_white_balance
        - backlight_compensation
        - blue_gain
        - chroma
        - detail
        - gain
        - gamma
        - iris
        - red_gain
        - wide_dynamic_range
    - name: value
      type: string
      description: "Ranges: blue_gain/red_gain 0-255; chroma 0-14; detail 0-15; gain 1-11; gamma -16 to 64; iris 0-11. Boolean parameters use on or off."

- id: camera_standby
  label: Camera Standby
  kind: action
  command: "camera <input> standby { get | off | on | toggle }"
  params:
    - name: input
      type: integer
      required: false
    - name: state
      type: enum
      values: [get, off, on, toggle]

- id: camera_led
  label: Camera LED
  kind: action
  command: "camera led { get | off | on }"
  params:
    - name: state
      type: enum
      values: [get, off, on]
  notes: "Camera only."

- id: camera_icr
  label: Camera IR Cut Filter
  kind: action
  command: "camera icr { get | on | off }"
  params:
    - name: state
      type: enum
      values: [get, on, off]
  notes: "Camera only."

- id: camera_recalibrate
  label: Camera Recalibrate
  kind: action
  command: "camera recalibrate"
  params: []
  notes: "Camera only. Recalibrates pan and tilt motors."

- id: camera_authenticate
  label: Camera Authenticate
  kind: action
  command: "camera <input> authenticate <password>"
  params:
    - name: input
      type: integer
      description: "Decoder input 1-2 or Mixer input 2-5."
    - name: password
      type: string
      description: "Camera admin password."

- id: camera_comm_host
  label: Camera Communication Host
  kind: action
  command: "camera <input> comm host { get | set <host> | unset }"
  params:
    - name: input
      type: integer
    - name: operation
      type: enum
      values: [get, set, unset]
    - name: host
      type: string
      required: false
      description: "Camera IP address."

- id: video_mute
  label: Video Mute
  kind: action
  command: "video mute { get | off | on | toggle}"
  params:
    - name: state
      type: enum
      values: [get, off, on, toggle]
  notes: "Supported on Decoder, Mixer, and EasyIP 10 Camera. Muted USB stream displays blue screen."

- id: video_pip
  label: Video PIP
  kind: action
  command: "video pip { get | on | off | toggle | layout }"
  params:
    - name: operation
      type: enum
      values: [get, on, off, toggle, layout]
    - name: layout
      type: enum
      required: false
      values: [upper_right, lower_right, lower_left, upper_left, top_bottom, left_right]
  notes: "EasyIP Mixer only. Use `video pip layout get` to query layout."

- id: video_source
  label: Video Source
  kind: action
  command: "video source { get | set <input> }"
  params:
    - name: operation
      type: enum
      values: [get, set]
    - name: input
      type: string
      required: false
      description: "Input identifier such as input1 or input2."

- id: video_type
  label: Video Input Type
  kind: action
  command: "video <input> type { get | set { camera | video }}"
  params:
    - name: input
      type: integer
      range: [1, 4]
    - name: operation
      type: enum
      values: [get, set]
    - name: type
      type: enum
      required: false
      values: [camera, video]
  notes: "EasyIP Decoder only."

- id: audio_mute
  label: Audio Channel Mute
  kind: action
  command: "audio < channel > mute { get | on | off | toggle }"
  params:
    - name: channel
      type: enum
      values: [master, easy_mic_1, easy_mic_2, usb_playback, line_out_1, usb_record]
    - name: state
      type: enum
      values: [get, on, off, toggle]

- id: audio_volume
  label: Audio Channel Volume
  kind: action
  command: "audio < channel > volume { get | up | down | set }"
  params:
    - name: channel
      type: enum
      values: [master, easy_mic_1, easy_mic_2, usb_playback, line_out_1, usb_record]
    - name: operation
      type: enum
      values: [get, up, down, set]
    - name: level
      type: float
      required: false
      unit: dB
      description: "Required after `set`; full valid range not stated."

- id: audio_route
  label: Audio Route
  kind: action
  command: "audio <channel> route {get | set <inputs>}"
  params:
    - name: channel
      type: enum
      values:
        - line_out_1
        - line_out_2
        - usb3_record_left
        - usb3_record_right
        - hdmi_out_left
        - hdmi_out_right
        - dante_out_1
        - dante_out_2
        - dante_out_3
        - dante_out_4
    - name: operation
      type: enum
      values: [get, set]
    - name: inputs
      type: string
      required: false
      description: "One or more documented source-channel identifiers."
  notes: "EasyIP Mixer only. USB3 Record cannot include USB3 Playback in its route list."

- id: audio_crosspoint_gain
  label: Audio Crosspoint Gain
  kind: action
  command: "audio <output> crosspoint-gain <input> {get | set <level>}"
  params:
    - name: output
      type: enum
      values:
        - line_out_1
        - line_out_2
        - usb3_record_left
        - usb3_record_right
        - ip_out_left
        - ip_out_right
        - hdmi_out_left
        - hdmi_out_right
        - dante_out_1
        - dante_out_2
        - dante_out_3
        - dante_out_4
    - name: input
      type: enum
      values:
        - line_in_1
        - line_in_2
        - usb3_playback_left
        - usb3_playback_right
        - hdmi_in_1_left
        - hdmi_in_1_right
        - hdmi_in_2_left
        - hdmi_in_2_right
        - dante_in_1
        - dante_in_2
        - dante_in_3
        - dante_in_4
    - name: operation
      type: enum
      values: [get, set]
    - name: level
      type: float
      required: false
      range: [-12.00, 12.00]
      unit: dB
  notes: "EasyIP Mixer only."

- id: trigger_set
  label: Trigger Set
  kind: action
  command: "trigger <index> { off | on }"
  params:
    - name: index
      type: integer
      range: [1, 50]
    - name: state
      type: enum
      values: [off, on]
  notes: "Decoder or Mixer. No effect when trigger is undefined."

- id: system_standby
  label: System Standby
  kind: action
  command: "system standby { get | on | off | toggle }"
  params:
    - name: state
      type: enum
      values: [get, on, off, toggle]
  notes: "Decoder or Mixer. Depending on configuration, paired cameras may follow system standby."

- id: streaming_settings_get
  label: Streaming Settings Get
  kind: query
  command: "streaming settings get"
  params: []

- id: network_settings_get
  label: Network Settings Get
  kind: query
  command: "network settings get"
  params: []

- id: network_ping
  label: Network Ping
  kind: action
  command: "network ping [count <count>] [size <size>] <string>"
  params:
    - name: count
      type: integer
      required: false
      default: 5
    - name: size
      type: integer
      required: false
      default: 56
      unit: bytes
    - name: string
      type: string
      description: "Hostname or IP address."

- id: system_reboot
  label: System Reboot
  kind: action
  command: "system reboot [<seconds>]"
  params:
    - name: seconds
      type: integer
      required: false
      description: "Delay before reboot."

- id: system_factory_reset
  label: System Factory Reset
  kind: action
  command: "system factory-reset { get | on | off}"
  params:
    - name: state
      type: enum
      values: [get, on, off]
  notes: "`on` arms factory reset for next reboot; it does not immediately reset device. Dante Controller settings are unaffected."

- id: version
  label: Version
  kind: query
  command: "version"
  params: []

- id: history
  label: History
  kind: action
  command: "history <limit>"
  params:
    - name: limit
      type: integer
      required: false
      description: "Maximum command-history size or number of entries returned."
  notes: "History expansion supports `!!`, `!4`, and `!-3`."

- id: help
  label: Help
  kind: action
  command: "help"
  params: []

- id: exit
  label: Exit
  kind: action
  command: "exit"
  params: []
```

## Feedbacks

```yaml
- id: command_acknowledgement
  type: enum
  values: [OK]
  terminator: ">"

- id: pan_position
  type: number
  unit: degrees
  source: "camera <input> pan get"

- id: tilt_position
  type: number
  unit: degrees
  source: "camera <input> tilt get"

- id: zoom_level
  type: number
  source: "camera <input> zoom get"

- id: focus_mode
  type: enum
  values: [auto, manual]
  source: "camera <input> focus mode get"

- id: camera_standby_state
  type: enum
  values: [on, off]
  source: "camera <input> standby get"

- id: camera_led_state
  type: enum
  values: [on, off]
  source: "camera led get"

- id: camera_icr_state
  type: string
  source: "camera icr get"

- id: ccu_settings
  type: object
  source: "camera <input> ccu get <param>"

- id: camera_comm_host
  type: string
  source: "camera <input> comm host get"

- id: video_mute_state
  type: enum
  values: [on, off]
  source: "video mute get"

- id: pip_state
  type: enum
  values: [on, off]
  source: "video pip get"

- id: pip_layout
  type: enum
  values: [upper_right, lower_right, lower_left, upper_left, top_bottom, left_right]
  source: "video pip layout get"

- id: video_source
  type: string
  source: "video source get"

- id: video_input_type
  type: enum
  values: [camera, video]
  source: "video <input> type get"

- id: audio_mute_state
  type: enum
  values: [on, off]
  source: "audio <channel> mute get"

- id: audio_volume_level
  type: number
  unit: dB
  source: "audio <channel> volume get"

- id: audio_route_state
  type: string
  source: "audio <channel> route get"

- id: crosspoint_gain_level
  type: number
  unit: dB
  source: "audio <output> crosspoint-gain <input> get"

- id: system_standby_state
  type: enum
  values: [on, off]
  source: "system standby get"

- id: factory_reset_state
  type: object
  source: "system factory-reset get"

- id: streaming_settings
  type: object
  fields:
    - USB Active
    - USB Device
    - USB Frame_Rate
    - USB Resolution
    - USB Version
    - UVC Extensions_Enabled
  source: "streaming settings get"

- id: network_settings
  type: object
  fields:
    - Name
    - MAC Address
    - IP Address
    - Netmask
    - VLAN
    - Gateway
  source: "network settings get"

- id: firmware_version
  type: object
  source: "version"

- id: camera_status_indicator
  type: enum
  values: [blue, purple, yellow, blinking_red, blinking_yellow, off]
  description: "Blue active; purple standby or booting; yellow firmware update; blinking red video mute under UC color scheme; blinking yellow motor out of calibration."
```

## Variables

```yaml
- id: pan_speed
  type: integer
  range: [1, 24]
  default: 12

- id: pan_position
  type: float
  range: [-155.00, 155.00]
  unit: degrees
  range_qualifier: approximate

- id: tilt_speed
  type: integer
  range: [1, 20]
  default: 10

- id: tilt_position
  type: float
  range: [-30.00, 93.00]
  unit: degrees

- id: zoom_speed
  type: integer
  range: [1, 7]

- id: zoom_level
  type: float
  range: [1.00, 10.00]

- id: focus_speed
  type: integer
  range: [1, 8]

- id: crosspoint_gain
  type: float
  range: [-12.00, 12.00]
  unit: dB

- id: ccu_blue_gain
  type: integer
  range: [0, 255]

- id: ccu_red_gain
  type: integer
  range: [0, 255]

- id: ccu_chroma
  type: integer
  range: [0, 14]

- id: ccu_detail
  type: integer
  range: [0, 15]

- id: ccu_gain
  type: integer
  range: [1, 11]

- id: ccu_gamma
  type: integer
  range: [-16, 64]

- id: ccu_iris
  type: integer
  range: [0, 11]

# UNRESOLVED: full audio volume dB range not stated in source.
```

## Events

```yaml
# UNRESOLVED: source documents no unsolicited protocol notifications.
```

## Macros

```yaml
# UNRESOLVED: source states that command API is used for macros but does not document macro authoring syntax.
```

## Safety

```yaml
confirmation_required_for:
  - system_reboot
  - system_factory_reset
interlocks:
  - camera_ccu_set.auto_iris_on_disables_manual_iris_and_gain
  - camera_ccu_set.auto_white_balance_on_overrides_red_and_blue_gain
  - camera_ccu_set.backlight_compensation_requires_wide_dynamic_range_off
  - camera_ccu_set.wide_dynamic_range_requires_backlight_compensation_off
  - camera_ccu_set.blue_gain_requires_auto_white_balance_off
  - camera_ccu_set.red_gain_requires_auto_white_balance_off
  - camera_ccu_set.iris_requires_auto_iris_off
  - camera_ccu_set.gain_requires_auto_iris_off
  - audio_route.usb3_record_cannot_include_usb3_playback
  - system_standby.paired_cameras_may_follow_when_configured
  - telnet_access.must_be_enabled_before_connection
```

## Notes

- Source: Complete Manual for EasyIP Systems, Document 411-0041-35 Rev C, June 2020.
- Telnet prompt is `>`.
- Successful commands return `OK`.
- `CTRL-5` clears current device serial buffer.
- A question mark supplied as command parameter lists available subcommands or parameters.
- Decoder camera inputs are 1 through 4 for general camera commands; Mixer camera inputs are 2 through 5, with input 1 reserved for HDMI.
- Source describes Decoder inputs 1 and 2 for `camera authenticate` and `camera comm host`.
- `camera led`, `camera icr`, and `camera recalibrate` must be sent directly to camera.
- `video pip`, `audio route`, and `audio crosspoint-gain` are Mixer-only.
- `video type` is Decoder-only.
- Telnet and HTTP access are disabled by default and after factory reset. Deployment Tool and Device Controller use HTTPS.
- Factory reset does not affect settings managed through Dante Controller.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: RS-232 serial line parameters not stated in source. -->
<!-- UNRESOLVED: EasyIP 20 camera is not covered by this source. -->
<!-- UNRESOLVED: macro authoring syntax not documented. -->
<!-- UNRESOLVED: full audio volume range not stated. -->
<!-- UNRESOLVED: admin login exchange and credential encoding not specified. -->

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
  - manualslib.com
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://files.avprosupply.com/files/attachments/473597/vaddio-999-60210-000-manual.pdf
  - https://www.manualslib.com/manual/1851740/Vaddio-Easyip-Systems.html
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
  - https://res.cloudinary.com/avd/image/upload/v134214804/Resources/Vaddio/Cameras/Operation/411-0041-35_Rev_D_EasyIP_System_Complete_Manual.pdf
  - https://www.manualslib.com/manual/1988072/Vaddio-Easyip-999-60210-000.html
retrieved_at: 2026-07-26T09:02:27.463Z
last_checked_at: 2026-08-05T08:49:05.069Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:49:05.069Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions match wire-literal commands documented in the source, transport port 23 is verbatim, and the source carries no additional functional commands beyond what the spec represents. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 baud rate, data bits, parity, stop bits, and flow control not stated in source."
- "firmware version compatibility not stated in source."
- "credential encoding and login exchange not specified in source"
- "baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "full audio volume dB range not stated in source."
- "source documents no unsolicited protocol notifications."
- "source states that command API is used for macros but does not document macro authoring syntax."
- "RS-232 serial line parameters not stated in source."
- "EasyIP 20 camera is not covered by this source."
- "macro authoring syntax not documented."
- "full audio volume range not stated."
- "admin login exchange and credential encoding not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
