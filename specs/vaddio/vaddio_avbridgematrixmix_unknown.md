---
spec_id: admin/vaddio-avbridgematrixmix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio AV Bridge MatrixMIX Control Spec"
manufacturer: Vaddio
model_family: "AV Bridge MatrixMIX"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "AV Bridge MatrixMIX"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - sicontact.net
  - cdn.adiglobaldistribution.us
  - search-manual.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v134260596/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0006-30-rev-a-avb-matrixmix-integrators-complete-guide.pdf"
  - "https://res.cloudinary.com/avd/image/upload/v133917588/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0006-30-rev-a-avb-matrixmix-integrators-complete-guide.pdf"
  - https://www.sicontact.net/uploads/vaddio-bridge-matrix-pro-guide-complet-en.pdf
  - https://cdn.adiglobaldistribution.us/pim/Original/10046/Upload_MV-999566050_UserManual.pdf
  - https://www.search-manual.com/vaddio-av-bridge-matrixmix-production-system-246554-manual
retrieved_at: 2026-09-02T18:12:40.429Z
last_checked_at: 2026-10-07T11:10:13.591Z
generated_at: 2026-10-07T11:10:13.591Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-camera channel counts above the explicit 8-camera example bound are not enumerated. Front-panel button/label mappings beyond what is documented here are not covered."
  - "baud rate for the external RS-232 control port not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "source does not document any additional settable variables outside the command catalogue above."
  - "source documents the response format (e.g. \"OK\\n>\") but no unsolicited event/notifications are described."
  - "source references \"device macros\" and includes a `sleep` command and `trigger ... block <seconds>` to coordinate macros, but does not enumerate macro definitions themselves."
  - "source does not describe hardware interlocks, safety interlocks, or power-on sequencing requirements beyond the factory-reset behavior."
verification:
  verdict: verified
  checked_at: 2026-10-07T11:10:13.591Z
  matched_actions: 90
  action_count: 90
  confidence: medium
  summary: "All 90 action units match source Telnet commands with agreeing shapes; transport values are supported and the source's catalogue is fully represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Vaddio AV Bridge MatrixMIX Control Spec

## Summary
The Vaddio AV Bridge MatrixMIX is a multipurpose AV switcher / production switcher supporting HDMI inputs, audio mixing, IP (RTSP) and USB streaming, and camera control commands addressing cameras 1-8. The source lists RS-232 camera ports 1-6. This spec covers the documented Telnet command API used for external control and device macros, plus transport notes (RS-232, Ethernet, RTSP).

<!-- UNRESOLVED: per-camera channel counts above the explicit 8-camera example bound are not enumerated. Front-panel button/label mappings beyond what is documented here are not covered. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: UNRESOLVED  # source does not state the Telnet command API port
serial:
  baud_rate: null  # UNRESOLVED: baud rate for the external RS-232 control port not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null     # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: UNRESOLVED  # source does not state flow control
 auth:
  type: password
  username: admin
  password: password  # default per source; should be changed
  notes: Source states "When you connect via Telnet, you must log in using the admin account." Default password "password". A user/guest account also exists.
```

## Traits
```yaml
- powerable       # inferred from camera standby commands and system reboot / factory-reset
- routable        # inferred from audio route, video source, graphics source, switch take
- queryable       # inferred from explicit get variants on most commands (audio mute get, audio volume get, video mute get, video source get, network settings get, streaming settings get, system factory-reset get, camera ccu get, camera standby get, version, etc.)
- levelable       # inferred from audio volume up/down/set and audio crosspoint-gain set
```

## Actions
```yaml
- id: audio_mute_master
  label: Audio Mute (master)
  kind: action
  command: "audio master mute {get|on|off|toggle}"
  params:
    - name: action
      type: enum
      values: [get, on, off, toggle]
- id: audio_mute_line_out_1
  label: Audio Mute (Line Out 1)
  kind: action
  command: "audio line_out_1 mute {get|on|off|toggle}"
- id: audio_mute_line_out_2
  label: Audio Mute (Line Out 2)
  kind: action
  command: "audio line_out_2 mute {get|on|off|toggle}"
- id: audio_mute_line_in_1
  label: Audio Mute (Line In 1)
  kind: action
  command: "audio line_in_1 mute {get|on|off|toggle}"
- id: audio_mute_line_in_2
  label: Audio Mute (Line In 2)
  kind: action
  command: "audio line_in_2 mute {get|on|off|toggle}"
- id: audio_mute_usb3_record_left
  label: Audio Mute (USB3 Record Left)
  kind: action
  command: "audio usb3_record_left mute {get|on|off|toggle}"
- id: audio_mute_usb3_record_right
  label: Audio Mute (USB3 Record Right)
  kind: action
  command: "audio usb3_record_right mute {get|on|off|toggle}"
- id: audio_mute_usb3_playback_left
  label: Audio Mute (USB3 Playback Left)
  kind: action
  command: "audio usb3_playback_left mute {get|on|off|toggle}"
- id: audio_mute_usb3_playback_right
  label: Audio Mute (USB3 Playback Right)
  kind: action
  command: "audio usb3_playback_right mute {get|on|off|toggle}"
- id: audio_mute_hdmi_in_left
  label: Audio Mute (HDMI In N Left)
  kind: action
  command: "audio hdmi_in_{1..8}_left mute {get|on|off|toggle}"
  params:
    - name: input
      type: integer
      description: HDMI input number (1-8)
- id: audio_mute_hdmi_in_right
  label: Audio Mute (HDMI In N Right)
  kind: action
  command: "audio hdmi_in_{1..8}_right mute {get|on|off|toggle}"
  params:
    - name: input
      type: integer
      description: HDMI input number (1-8)
- id: audio_mute_ip_out_left
  label: Audio Mute (IP Stream Out Left)
  kind: action
  command: "audio ip_out_left mute {get|on|off|toggle}"
- id: audio_mute_ip_out_right
  label: Audio Mute (IP Stream Out Right)
  kind: action
  command: "audio ip_out_right mute {get|on|off|toggle}"
- id: audio_mute_program_out_left
  label: Audio Mute (Program Out Left)
  kind: action
  command: "audio program_out_left mute {get|on|off|toggle}"
- id: audio_mute_program_out_right
  label: Audio Mute (Program Out Right)
  kind: action
  command: "audio program_out_right mute {get|on|off|toggle}"
- id: audio_mute_preview_out_left
  label: Audio Mute (Preview Out Left)
  kind: action
  command: "audio preview_out_left mute {get|on|off|toggle}"
- id: audio_mute_preview_out_right
  label: Audio Mute (Preview Out Right)
  kind: action
  command: "audio preview_out_right mute {get|on|off|toggle}"
- id: audio_mute_multiviewer_out_left
  label: Audio Mute (Multiviewer Out Left)
  kind: action
  command: "audio multiviewer_out_left mute {get|on|off|toggle}"
- id: audio_mute_multiviewer_out_right
  label: Audio Mute (Multiviewer Out Right)
  kind: action
  command: "audio multiviewer_out_right mute {get|on|off|toggle}"

- id: audio_volume_master
  label: Audio Volume (master/AEC reference)
  kind: action
  command: "audio master volume {get|up|down|set <level>}"
  params:
    - name: level
      type: float
      description: Volume in dB. Range for master: -50.0 to 20.0 dB
- id: audio_volume_line_in_1
  label: Audio Volume (Line In 1)
  kind: action
  command: "audio line_in_1 volume {get|up|down|set <level>}"
  params:
    - name: level
      type: float
      description: dB. Line in range: -50.0 to 20.0 dB
- id: audio_volume_line_in_2
  label: Audio Volume (Line In 2)
  kind: action
  command: "audio line_in_2 volume {get|up|down|set <level>}"
- id: audio_volume_line_out_1
  label: Audio Volume (Line Out 1)
  kind: action
  command: "audio line_out_1 volume {get|up|down|set <level>}"
  params:
    - name: level
      type: float
      description: dB. Line out range: -50.0 to 20.0 dB
- id: audio_volume_line_out_2
  label: Audio Volume (Line Out 2)
  kind: action
  command: "audio line_out_2 volume {get|up|down|set <level>}"
- id: audio_volume_usb3_record_left
  label: Audio Volume (USB3 Record Left)
  kind: action
  command: "audio usb3_record_left volume {get|up|down|set <level>}"
  params:
    - name: level
      type: float
      description: dB. USB range: -42.0 to 6.0 dB
- id: audio_volume_usb3_record_right
  label: Audio Volume (USB3 Record Right)
  kind: action
  command: "audio usb3_record_right volume {get|up|down|set <level>}"
- id: audio_volume_usb3_playback_left
  label: Audio Volume (USB3 Playback Left)
  kind: action
  command: "audio usb3_playback_left volume {get|up|down|set <level>}"
- id: audio_volume_usb3_playback_right
  label: Audio Volume (USB3 Playback Right)
  kind: action
  command: "audio usb3_playback_right volume {get|up|down|set <level>}"
- id: audio_volume_hdmi_in_left
  label: Audio Volume (HDMI In N Left)
  kind: action
  command: "audio hdmi_in_{1..8}_left volume {get|up|down|set <level>}"
  params:
    - name: input
      type: integer
      description: HDMI input number (1-8)
    - name: level
      type: float
      description: dB. HDMI range: -42.0 to 6.0 dB
- id: audio_volume_hdmi_in_right
  label: Audio Volume (HDMI In N Right)
  kind: action
  command: "audio hdmi_in_{1..8}_right volume {get|up|down|set <level>}"
- id: audio_volume_ip_out_left
  label: Audio Volume (IP Stream Out Left)
  kind: action
  command: "audio ip_out_left volume {get|up|down|set <level>}"
- id: audio_volume_ip_out_right
  label: Audio Volume (IP Stream Out Right)
  kind: action
  command: "audio ip_out_right volume {get|up|down|set <level>}"
- id: audio_volume_program_out_left
  label: Audio Volume (Program Out Left)
  kind: action
  command: "audio program_out_left volume {get|up|down|set <level>}"
- id: audio_volume_program_out_right
  label: Audio Volume (Program Out Right)
  kind: action
  command: "audio program_out_right volume {get|up|down|set <level>}"
- id: audio_volume_preview_out_left
  label: Audio Volume (Preview Out Left)
  kind: action
  command: "audio preview_out_left volume {get|up|down|set <level>}"
- id: audio_volume_preview_out_right
  label: Audio Volume (Preview Out Right)
  kind: action
  command: "audio preview_out_right volume {get|up|down|set <level>}"
- id: audio_volume_multiviewer_out_left
  label: Audio Volume (Multiviewer Out Left)
  kind: action
  command: "audio multiviewer_out_left volume {get|up|down|set <level>}"
- id: audio_volume_multiviewer_out_right
  label: Audio Volume (Multiviewer Out Right)
  kind: action
  command: "audio multiviewer_out_right volume {get|up|down|set <level>}"

- id: audio_route_usb3_record_left
  label: Audio Route (USB3 Record Left)
  kind: action
  command: "audio usb3_record_left route {get|set <inputs>}"
- id: audio_route_usb3_record_right
  label: Audio Route (USB3 Record Right)
  kind: action
  command: "audio usb3_record_right route {get|set <inputs>}"
- id: audio_route_ip_out_left
  label: Audio Route (IP Stream Out Left)
  kind: action
  command: "audio ip_out_left route {get|set <inputs>}"
- id: audio_route_ip_out_right
  label: Audio Route (IP Stream Out Right)
  kind: action
  command: "audio ip_out_right route {get|set <inputs>}"
- id: audio_route_program_out_left
  label: Audio Route (Program Out Left)
  kind: action
  command: "audio program_out_left route {get|set <inputs>}"
- id: audio_route_program_out_right
  label: Audio Route (Program Out Right)
  kind: action
  command: "audio program_out_right route {get|set <inputs>}"
- id: audio_route_preview_out_left
  label: Audio Route (Preview Out Left)
  kind: action
  command: "audio preview_out_left route {get|set <inputs>}"
- id: audio_route_preview_out_right
  label: Audio Route (Preview Out Right)
  kind: action
  command: "audio preview_out_right route {get|set <inputs>}"
- id: audio_route_multiviewer_out_left
  label: Audio Route (Multiviewer Out Left)
  kind: action
  command: "audio multiviewer_out_left route {get|set <inputs>}"
- id: audio_route_multiviewer_out_right
  label: Audio Route (Multiviewer Out Right)
  kind: action
  command: "audio multiviewer_out_right route {get|set <inputs>}"
- id: audio_route_line_out_1
  label: Audio Route (Line Out 1)
  kind: action
  command: "audio line_out_1 route {get|set <inputs>}"
- id: audio_route_line_out_2
  label: Audio Route (Line Out 2)
  kind: action
  command: "audio line_out_2 route {get|set <inputs>}"

- id: audio_crosspoint_gain
  label: Audio Crosspoint Gain
  kind: action
  command: "audio <output> crosspoint-gain <input> {get|set <level>}"
  params:
    - name: output
      type: string
      description: One of usb3_record_left/right, ip_out_left/right, program_out_left/right, preview_out_left/right, multiviewer_out_left/right, line_out_1/2
    - name: input
      type: string
      description: One of auto_mic_mix, usb3_playback_left/right, line_in_1/2, hdmi_in_<1..8>_left/right
    - name: level
      type: float
      description: dB. Valid range -12.00 to 12.00 dB

- id: camera_home
  label: Camera Home
  kind: action
  command: "camera <1..8> home"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)

- id: camera_pan
  label: Camera Pan
  kind: action
  command: "camera <1..8> pan {left [<speed>]|right [<speed>]|stop}"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: direction
      type: enum
      values: [left, right, stop]
    - name: speed
      type: integer
      description: Optional speed 1-24 (default 12)
- id: camera_tilt
  label: Camera Tilt
  kind: action
  command: "camera <1..8> tilt {up [<speed>]|down [<speed>]|stop}"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: direction
      type: enum
      values: [up, down, stop]
    - name: speed
      type: integer
      description: Optional speed 1-20 (default 10)
- id: camera_zoom
  label: Camera Zoom
  kind: action
  command: "camera <1..8> zoom {in [<speed>]|out [<speed>]|stop}"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: direction
      type: enum
      values: [in, out, stop]
    - name: speed
      type: integer
      description: Optional speed 1-7 (default 3)
- id: camera_focus
  label: Camera Focus
  kind: action
  command: "camera <1..8> focus {{near [<speed>]|far [<speed>]} | {mode [auto|manual|get]} | stop}"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: speed
      type: integer
      description: Optional 1-8
    - name: mode
      type: enum
      values: [auto, manual, get]

- id: camera_preset_recall
  label: Camera Preset Recall
  kind: action
  command: "camera <1..8> preset recall <1..16> [tri-sync <1..24>] [save-ccu]"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: preset
      type: integer
      description: Preset number (1-16)
    - name: tri_sync
      type: integer
      description: Optional tri-sync speed 1-24
- id: camera_preset_store
  label: Camera Preset Store
  kind: action
  command: "camera <1..8> preset store <1..16> [tri-sync <1..24>] [save-ccu]"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: preset
      type: integer
      description: Preset number (1-16)
    - name: tri_sync
      type: integer
      description: Optional tri-sync speed 1-24

- id: camera_ccu_get
  label: Camera CCU Get
  kind: query
  command: "camera <1..8> ccu get <param>"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: param
      type: enum
      values: [auto_white_balance, red_gain, blue_gain, backlight_compensation, iris, auto_iris, gain, detail, chroma, wide_dynamic_range, all]
- id: camera_ccu_set
  label: Camera CCU Set
  kind: action
  command: "camera <1..8> ccu set <param> <value>"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: param
      type: enum
      values: [auto_white_balance, red_gain, blue_gain, backlight_compensation, iris, auto_iris, gain, detail, chroma, wide_dynamic_range]
    - name: value
      type: string
      description: on/off for booleans; integer range as per source (e.g. red_gain 0..255, iris 0..11, gain 0..11, detail 0..15, chroma 0..14)
- id: camera_ccu_scene_recall
  label: Camera CCU Scene Recall
  kind: action
  command: "camera <1..8> ccu scene recall {factory <1..6>|custom <1..3>}"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: kind
      type: enum
      values: [factory, custom]
    - name: index
      type: integer
      description: Scene number (factory 1-6, custom 1-3)
- id: camera_ccu_scene_store
  label: Camera CCU Scene Store (Custom)
  kind: action
  command: "camera <1..8> ccu scene store custom <1..3>"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: index
      type: integer
      description: Custom scene slot (1-3)

- id: camera_standby
  label: Camera Standby
  kind: action
  command: "camera <1..8> standby {off|on|toggle|get}"
  params:
    - name: camera
      type: integer
      description: Camera number (1-8)
    - name: action
      type: enum
      values: [off, on, toggle, get]

- id: video_mute_master
  label: Video Mute (master)
  kind: action
  command: "video master mute {get|off|on|toggle}"
- id: video_mute_input
  label: Video Mute (HDMI Input N)
  kind: action
  command: "video input<1..8> mute {get|off|on|toggle}"
  params:
    - name: input
      type: integer
      description: HDMI input number (1-8)
- id: video_mute_program
  label: Video Mute (Program)
  kind: action
  command: "video program mute {get|off|on|toggle}"
- id: video_mute_preview
  label: Video Mute (Preview)
  kind: action
  command: "video preview mute {get|off|on|toggle}"
- id: video_mute_usb_stream
  label: Video Mute (USB Stream)
  kind: action
  command: "video usb_stream mute {get|off|on|toggle}"
- id: video_mute_ip_stream
  label: Video Mute (IP Stream)
  kind: action
  command: "video ip_stream mute {get|off|on|toggle}"

- id: video_source_program
  label: Video Source (Program)
  kind: action
  command: "video program source {get|set <source channel>}"
  params:
    - name: source
      type: enum
      values: [input1, input2, input3, input4, input5, input6, input7, input8]
- id: video_source_preview
  label: Video Source (Preview)
  kind: action
  command: "video preview source {get|set <source channel>}"
  params:
    - name: source
      type: enum
      values: [input1, input2, input3, input4, input5, input6, input7, input8]
- id: video_source_usb_stream
  label: Video Source (USB Stream)
  kind: action
  command: "video usb_stream source {get|set <source channel>}"
  params:
    - name: source
      type: enum
      values: [program, preview, multiviewer]
- id: video_source_ip_stream
  label: Video Source (IP Stream)
  kind: action
  command: "video ip_stream source {get|set <source channel>}"
  params:
    - name: source
      type: enum
      values: [program, preview, multiviewer]

- id: video_pip
  label: Video PIP
  kind: action
  command: "video {program|preview} pip {get|off|source <input1..input8>}"
  params:
    - name: bus
      type: enum
      values: [program, preview]
    - name: action
      type: enum
      values: [get, off, source]
    - name: source
      type: integer
      description: HDMI input 1-8 (only when action=source)

- id: graphics_enable
  label: Graphics Layer Enable
  kind: action
  command: "graphics <channel> enable <layer> {get|on|off|toggle}"
  params:
    - name: channel
      type: enum
      values: [program, preview]
    - name: layer
      type: enum
      values: [layer1, layer2]
    - name: action
      type: enum
      values: [get, on, off, toggle]
- id: graphics_source
  label: Graphics Layer Source
  kind: action
  command: "graphics <channel> source <layer> {get|set <selection>}"
  params:
    - name: channel
      type: enum
      values: [program, preview]
    - name: layer
      type: enum
      values: [layer1, layer2]
    - name: selection
      type: string
      description: input7, input8, or a filename from the Graphics Library

- id: switch_mode
  label: Switch Mode
  kind: action
  command: "switch mode {get|a_b|dual_bus}"
  params:
    - name: mode
      type: enum
      values: [get, a_b, dual_bus]
- id: switch_take
  label: Switch Take
  kind: action
  command: "switch take"
  description: a/b mode take
- id: switch_take_dual_bus
  label: Switch Take (Dual Bus)
  kind: action
  command: "switch {preview|program} take"
  params:
    - name: bus
      type: enum
      values: [preview, program]
  description: Dual-bus mode take on specified bus

- id: trigger
  label: Trigger
  kind: action
  command: "trigger <1..10> {off|on|block <seconds>}"
  params:
    - name: index
      type: integer
      description: Trigger number (1-10)
    - name: action
      type: enum
      values: [off, on, block]
    - name: seconds
      type: integer
      description: Block duration in seconds (used with block)

- id: streaming_settings_get
  label: Streaming Settings Get
  kind: query
  command: "streaming settings get"
- id: network_settings_get
  label: Network Settings Get
  kind: query
  command: "network settings get"
- id: network_ping
  label: Network Ping
  kind: action
  command: "network ping [count <count>] [size <size>] <destination-ip>"
  params:
    - name: count
      type: integer
      description: Optional, default 5
    - name: size
      type: integer
      description: Optional, default 56 bytes
    - name: destination_ip
      type: string
      description: Target IP or hostname

- id: system_reboot
  label: System Reboot
  kind: action
  command: "system reboot [<seconds>]"
  params:
    - name: seconds
      type: integer
      description: Optional delay before reboot
- id: system_factory_reset
  label: System Factory Reset
  kind: action
  command: "system factory-reset {get|on|off}"
  params:
    - name: action
      type: enum
      values: [get, on, off]
  notes: factory-reset takes effect on the next reboot
- id: sleep
  label: Sleep
  kind: action
  command: "sleep <milliseconds>"
  params:
    - name: milliseconds
      type: integer
      description: 1-10000 ms
- id: version
  label: Version
  kind: query
  command: "version"
- id: history
  label: History
  kind: query
  command: "history <limit>"
  params:
    - name: limit
      type: integer
      description: Max number of commands to return
- id: help
  label: Help
  kind: query
  command: "help"
- id: exit
  label: Exit
  kind: action
  command: "exit"
```

## Feedbacks
```yaml
- id: audio_mute_state
  type: enum
  values: [on, off]
- id: audio_volume_db
  type: float
  description: Reported in dB (e.g. "-10.0 dB")
- id: audio_route_inputs
  type: string
  description: List of routed inputs returned by audio <ch> route get (e.g. "[auto_mic_mix]")
- id: audio_crosspoint_gain_db
  type: float
  description: dB value in -12.00..12.00 range
- id: video_mute_state
  type: enum
  values: [on, off]
- id: video_source
  type: string
  description: Source label returned by video <ch> source get (e.g. "input3")
- id: video_pip_source
  type: string
  description: HDMI input returned by video <bus> pip get (e.g. "input2")
- id: graphics_layer_enabled
  type: enum
  values: [on, off]
- id: graphics_layer_source
  type: string
  description: e.g. "120px-Stop_Sign.png", "input7", "input8"
- id: switch_mode
  type: enum
  values: [a_b, dual_bus]
- id: camera_focus_mode
  type: enum
  values: [auto, manual]
  description: Returned by camera <n> focus mode get (label "auto_focus: on/off")
- id: camera_standby_state
  type: enum
  values: [on, off]
- id: camera_ccu_auto_white_balance
  type: enum
  values: [on, off]
- id: camera_ccu_red_gain
  type: integer
  description: 0-255
- id: camera_ccu_blue_gain
  type: integer
  description: 0-255
- id: camera_ccu_backlight_compensation
  type: enum
  values: [on, off]
- id: camera_ccu_iris
  type: integer
  description: 0-11
- id: camera_ccu_auto_iris
  type: enum
  values: [on, off]
- id: camera_ccu_gain
  type: integer
  description: 0-11
- id: camera_ccu_detail
  type: integer
  description: 0-15
- id: camera_ccu_chroma
  type: integer
  description: 0-14
- id: camera_ccu_wide_dynamic_range
  type: enum
  values: [on, off]
- id: streaming_ip_enabled
  type: boolean
- id: streaming_ip_port
  type: integer
  description: RTSP port; default 554
- id: streaming_ip_url
  type: string
  description: e.g. "vaddio-avbmm-stream"
- id: streaming_ip_protocol
  type: string
  description: e.g. "RTSP"
- id: streaming_usb_enabled
  type: boolean
- id: network_mac_address
  type: string
- id: network_ip_address
  type: string
- id: network_netmask
  type: string
- id: network_gateway
  type: string
- id: network_vlan
  type: string
  description: e.g. "Disabled"
- id: factory_reset_software
  type: enum
  values: [on, off]
- id: factory_reset_hardware
  type: enum
  values: [on, off]
- id: firmware_version
  type: string
  description: Multi-line "version" output; key fields: System Version AVBMM, Audio, USB, Video 0 HW/SW, Video 1
```

## Variables
```yaml
# Volume, gain and level parameters already enumerated under Actions with their dB ranges.
# No additional free-form settable variables beyond what's modeled as Actions.
# UNRESOLVED: source does not document any additional settable variables outside the command catalogue above.
```

## Events
```yaml
# UNRESOLVED: source documents the response format (e.g. "OK\n>") but no unsolicited event/notifications are described.
```

## Macros
```yaml
# UNRESOLVED: source references "device macros" and includes a `sleep` command and `trigger ... block <seconds>` to coordinate macros, but does not enumerate macro definitions themselves.
```

## Safety
```yaml
confirmation_required_for:
  - system factory-reset on   # takes effect on next reboot; destructive if combined with reboot
  - system reboot             # disruptive
interlocks: []
# UNRESOLVED: source does not describe hardware interlocks, safety interlocks, or power-on sequencing requirements beyond the factory-reset behavior.
```

## Notes
- Transport: per source, control is exposed via a Telnet command API on the device's IP interface (TCP). The source does not explicitly state the TCP port. RS-232 is also exposed (External Control port + per-camera RS-232 ports 1-6); the source does not state baud/data/parity/stop or flow-control settings for these ports.
- Auth: Telnet requires admin login. Default admin password is `password`; the source recommends changing it. The source lists a `user` login whose password may be unset and says guest access is possible.
- Command framing: ASCII lines terminated with CR. Responses are terminated by `OK\n>`; non-OK errors precede that prefix. CTRL-5 clears the serial buffer.
- Echo: source notes all ASCII (including CR) is echoed with the VT100 `ESC[J` (hex `1B 5B 4A`) suffix; most terminal programs strip it automatically.
- Streaming: IP streaming uses RTSP, default port `554`. USB streaming also supported.
- Trigger command is disabled while the web UI's macro/trigger test mode is in use.
- After changing `switch mode`, the source recommends rebooting connected controller(s).
- `audio <out> route set` has constraints: master output cannot include `auto_mic_mix`; if speech lift is enabled, master output must include it; USB3 Record outputs cannot include `usb3_playback_*` in their route list.
- CCU setting precedence per source: `auto_white_balance` overrides manual red/blue gain; `auto_iris` disables manual iris/gain; `backlight_compensation` and `wide_dynamic_range` are mutually exclusive.

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - sicontact.net
  - cdn.adiglobaldistribution.us
  - search-manual.com
source_urls:
  - "https://res.cloudinary.com/avd/image/upload/v134260596/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0006-30-rev-a-avb-matrixmix-integrators-complete-guide.pdf"
  - "https://res.cloudinary.com/avd/image/upload/v133917588/Resources/Vaddio/AV%20to%20USB%20Bridges%20and%20Encoders/Operation/411-0006-30-rev-a-avb-matrixmix-integrators-complete-guide.pdf"
  - https://www.sicontact.net/uploads/vaddio-bridge-matrix-pro-guide-complet-en.pdf
  - https://cdn.adiglobaldistribution.us/pim/Original/10046/Upload_MV-999566050_UserManual.pdf
  - https://www.search-manual.com/vaddio-av-bridge-matrixmix-production-system-246554-manual
retrieved_at: 2026-09-02T18:12:40.429Z
last_checked_at: 2026-10-07T11:10:13.591Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:10:13.591Z
matched_actions: 90
action_count: 90
confidence: medium
summary: "All 90 action units match source Telnet commands with agreeing shapes; transport values are supported and the source's catalogue is fully represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-camera channel counts above the explicit 8-camera example bound are not enumerated. Front-panel button/label mappings beyond what is documented here are not covered."
- "baud rate for the external RS-232 control port not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "source does not document any additional settable variables outside the command catalogue above."
- "source documents the response format (e.g. \"OK\\n>\") but no unsolicited event/notifications are described."
- "source references \"device macros\" and includes a `sleep` command and `trigger ... block <seconds>` to coordinate macros, but does not enumerate macro definitions themselves."
- "source does not describe hardware interlocks, safety interlocks, or power-on sequencing requirements beyond the factory-reset behavior."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
