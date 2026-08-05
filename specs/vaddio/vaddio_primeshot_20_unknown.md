---
spec_id: admin/vaddio-primeshot-20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio PrimeSHOT 20 Control Spec"
manufacturer: Vaddio
model_family: "PrimeSHOT 20 HDMI"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "PrimeSHOT 20 HDMI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - bhphotovideo.com
  - manua.ls
  - manuals.plus
  - manuals.ca
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v133953876/Resources/Vaddio/Cameras/Operation/411-0022-30_Rev_D_PrimeSHOT_HDMI_Complete_Manual.pdf
  - https://www.bhphotovideo.com/lit_files/971694.pdf
  - https://www.manua.ls/vaddio/primeshot-20-hdmi/manual
  - https://manuals.plus/m/e570efc129f9334a8f9b7cd73964a6f900938e6d2d75ca318937a4480e7945dd_optim.pdf
  - https://www.manuals.ca/vaddio/primeshot-20-hdmi/manual
retrieved_at: 2026-07-24T19:20:31.769Z
last_checked_at: 2026-08-05T08:54:19.095Z
generated_at: 2026-08-05T08:54:19.095Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "camera icr"
  - "firmware version compatibility range not stated in source"
  - "exact power/voltage/current specs not in this refined excerpt"
  - "exact credential/token formats not specified beyond \"admin account\" requirement"
  - "source describes no unsolicited notification mechanism. VISCA is"
  - "no macro examples in source."
  - "no power-on sequencing or hardware interlock procedures documented in source."
  - "firmware version compatibility range not stated"
  - "exact admin/user credential format and auth token scheme not detailed beyond \"admin account\""
  - "SSH port not explicitly stated (only Telnet port 23 given); SSH is \"recommended\""
  - "exact VISCA socket/command-buffer timing constraints not specified"
  - "no voltage/power/current specs in this refined excerpt"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:54:19.095Z
  matched_actions: 164
  action_count: 164
  confidence: medium
  summary: "All 164 spec actions match source verbatim (CLISH ASCII commands + VISCA hex bytes); transport values also match; coverage ratio ≈ 0.95. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Vaddio PrimeSHOT 20 Control Spec

## Summary
The Vaddio PrimeSHOT 20 HDMI is a 20x-zoom PTZ camera controllable over RS-232 serial, TCP (SSH/Telnet), and RTSP streaming. Two command sets are documented: a Vaddio Command Line Interface SHell (CLISH) of ASCII text commands, and a Sony VISCA-compatible hex-byte serial command set. This spec covers both.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: exact power/voltage/current specs not in this refined excerpt -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http  # inferred: HTTPS web interface for configuration (https:// prefix shown); CLISH control itself is SSH/Telnet
# Note: device exposes an HTTPS web UI for configuration, CLISH over SSH/Telnet for control,
# RS-232 for direct serial control (both CLISH-style and VISCA hex), and RTSP for streaming.
# RTSP streaming is a media transport, not a control transport; not enumerated in protocols[].
addressing:
  port: 23  # Telnet port stated for CLISH access
  base_url: "https://{ip-address}"  # HTTPS web UI; http disabled by default, https required
serial:
  baud_rate: 9600  # switch-selectable 9600 or 38400; 9600 is default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: login  # admin login required for CLISH; admin password required for web UI
  # UNRESOLVED: exact credential/token formats not specified beyond "admin account" requirement
```

## Traits
```yaml
traits:
  - powerable   # inferred: camera standby + VISCA CAM_Power commands present
  - queryable   # inferred: numerous get/inquiry commands present
  - levelable   # inferred: iris/gain/chroma/detail/gamma/red_gain/blue_gain level control present
  # routable: N/A (single-lens camera, no input/output matrix routing)
```

## Actions
```yaml
# =============== CLISH (ASCII) COMMANDS ===============
# Delivered over SSH (recommended), Telnet (port 23), or RS-232.
# Command prompt is ">". Successful commands return "OK".
# CTRL-5 clears the current serial buffer.

- id: clish_camera_home
  label: Camera Home (CLISH)
  kind: action
  command: "camera home"
  params: []

- id: clish_camera_pan
  label: Camera Pan (CLISH)
  kind: action
  command: "camera pan {left|right|stop|set|get} [params]"
  params:
    - name: direction
      type: enum
      description: "left | right | stop"
    - name: speed
      type: integer
      description: "Pan speed 1-24 (default 12). Applies to left/right/set."
    - name: position
      type: float
      description: "Absolute pan position in degrees, ~-160.00 to 160.00. Applies to set."
    - name: no_wait
      type: boolean
      description: "Optional: return prompt immediately while movement in progress (set only)."

- id: clish_camera_tilt
  label: Camera Tilt (CLISH)
  kind: action
  command: "camera tilt {up|down|stop|set|get} [params]"
  params:
    - name: direction
      type: enum
      description: "up | down | stop"
    - name: speed
      type: integer
      description: "Tilt speed 1-20 (default 10). Applies to up/down/set."
    - name: position
      type: float
      description: "Absolute tilt position in degrees, ~-30.00 to 90.00 (image-flip inverted ~30 to -90). Applies to set."
    - name: no_wait
      type: boolean
      description: "Optional: return prompt immediately while movement in progress (set only)."

- id: clish_camera_zoom
  label: Camera Zoom (CLISH)
  kind: action
  command: "camera zoom {in|out|stop|set|get} [params]"
  params:
    - name: direction
      type: enum
      description: "in | out | stop"
    - name: position
      type: float
      description: "Absolute zoom level 1.00 to 20.00 (PrimeSHOT 20). Applies to set."
    - name: no_wait
      type: boolean
      description: "Optional: return prompt immediately while movement in progress (set only)."

- id: clish_camera_ptz_position
  label: Camera PTZ-Position (CLISH)
  kind: action
  command: "camera ptz-position pan <pan> tilt <tilt> zoom <zoom> [no_wait]"
  params:
    - name: pan
      type: float
      description: "Pan position ~-160.00 to 160.00."
    - name: tilt
      type: float
      description: "Tilt position ~-30.0 to 93.0."
    - name: zoom
      type: float
      description: "Zoom 1.0 to 20.0 (PrimeSHOT 20)."
    - name: no_wait
      type: boolean
      description: "Optional: return prompt immediately while movement in progress."

- id: clish_camera_focus_near_far_stop
  label: Camera Focus Near/Far/Stop (CLISH)
  kind: action
  command: "camera focus {near|far|stop} [<speed>]"
  params:
    - name: direction
      type: enum
      description: "near | far | stop. near/far only when in manual focus mode."
    - name: speed
      type: integer
      description: "Focus speed 1-8."

- id: clish_camera_focus_mode
  label: Camera Focus Mode Set (CLISH)
  kind: action
  command: "camera focus mode {auto|manual}"
  params:
    - name: mode
      type: enum
      description: "auto | manual"

- id: clish_camera_focus_mode_get
  label: Camera Focus Mode Query (CLISH)
  kind: query
  command: "camera focus mode get"
  params: []

- id: clish_camera_preset_recall
  label: Camera Preset Recall (CLISH)
  kind: action
  command: "camera preset recall <1-16>"
  params:
    - name: preset
      type: integer
      description: "Preset number 1-16."

- id: clish_camera_preset_store
  label: Camera Preset Store (CLISH)
  kind: action
  command: "camera preset store <1-16> [save-ccu]"
  params:
    - name: preset
      type: integer
      description: "Preset number 1-16."
    - name: save_ccu
      type: boolean
      description: "Optional: save current color/lighting (CCU) settings with preset."

- id: clish_camera_ccu_get
  label: Camera CCU Get (CLISH)
  kind: query
  command: "camera ccu get [<param>|all]"
  params:
    - name: param
      type: enum
      description: "auto_white_balance | red_gain | blue_gain | backlight_compensation | iris | auto_iris | gain | detail | chroma | gamma | wide_dynamic_range | all"

- id: clish_camera_ccu_set_auto_white_balance
  label: Camera CCU Set Auto White Balance (CLISH)
  kind: action
  command: "camera ccu set auto_white_balance {on|off}"
  params:
    - name: value
      type: enum
      description: "on | off. Overrides red_gain/blue_gain manual settings when on."

- id: clish_camera_ccu_set_red_gain
  label: Camera CCU Set Red Gain (CLISH)
  kind: action
  command: "camera ccu set red_gain <0-20>"
  params:
    - name: value
      type: integer
      description: "Red gain 0-20. Manual only (AWB off)."

- id: clish_camera_ccu_set_blue_gain
  label: Camera CCU Set Blue Gain (CLISH)
  kind: action
  command: "camera ccu set blue_gain <0-20>"
  params:
    - name: value
      type: integer
      description: "Blue gain 0-20. Manual only (AWB off)."

- id: clish_camera_ccu_set_backlight_compensation
  label: Camera CCU Set Backlight Compensation (CLISH)
  kind: action
  command: "camera ccu set backlight_compensation {on|off}"
  params:
    - name: value
      type: enum
      description: "on | off. Only when WDR is off."

- id: clish_camera_ccu_set_iris
  label: Camera CCU Set Iris (CLISH)
  kind: action
  command: "camera ccu set iris <0-11>"
  params:
    - name: value
      type: integer
      description: "Iris 0-11. Manual only (auto-iris off)."

- id: clish_camera_ccu_set_auto_iris
  label: Camera CCU Set Auto Iris (CLISH)
  kind: action
  command: "camera ccu set auto_iris {on|off}"
  params:
    - name: value
      type: enum
      description: "on | off. Disables manual iris and gain when on."

- id: clish_camera_ccu_set_gain
  label: Camera CCU Set Gain (CLISH)
  kind: action
  command: "camera ccu set gain <1-10>"
  params:
    - name: value
      type: integer
      description: "Gain 1-11 per source text. Manual only (auto-iris off)."

- id: clish_camera_ccu_set_detail
  label: Camera CCU Set Detail (CLISH)
  kind: action
  command: "camera ccu set detail <0-10>"
  params:
    - name: value
      type: integer
      description: "Detail 0-10."

- id: clish_camera_ccu_set_chroma
  label: Camera CCU Set Chroma (CLISH)
  kind: action
  command: "camera ccu set chroma <0-20>"
  params:
    - name: value
      type: integer
      description: "Chroma 0-20."

- id: clish_camera_ccu_set_gamma
  label: Camera CCU Set Gamma (CLISH)
  kind: action
  command: "camera ccu set gamma <-16 - 64>"
  params:
    - name: value
      type: integer
      description: "Gamma -16 to 64."

- id: clish_camera_ccu_set_wide_dynamic_range
  label: Camera CCU Set Wide Dynamic Range (CLISH)
  kind: action
  command: "camera ccu set wide_dynamic_range {on|off}"
  params:
    - name: value
      type: enum
      description: "on | off. Only when backlight compensation is off."

- id: clish_camera_ccu_scene_recall_factory
  label: Camera CCU Scene Recall Factory (CLISH)
  kind: action
  command: "camera ccu scene recall factory <1-6>"
  params:
    - name: scene
      type: integer
      description: "Factory scene 1-6."

- id: clish_camera_ccu_scene_recall_custom
  label: Camera CCU Scene Recall Custom (CLISH)
  kind: action
  command: "camera ccu scene recall custom <1-3>"
  params:
    - name: scene
      type: integer
      description: "Custom scene 1-3."

- id: clish_camera_ccu_scene_store_custom
  label: Camera CCU Scene Store Custom (CLISH)
  kind: action
  command: "camera ccu scene store custom <1-3>"
  params:
    - name: scene
      type: integer
      description: "Custom scene 1-3."

- id: clish_camera_led_get
  label: Camera LED Status Query (CLISH)
  kind: query
  command: "camera led get"
  params: []

- id: clish_camera_led_off
  label: Camera LED Off (CLISH)
  kind: action
  command: "camera led off"
  params: []

- id: clish_camera_led_on
  label: Camera LED On (CLISH)
  kind: action
  command: "camera led on"
  params: []

- id: clish_camera_standby_get
  label: Camera Standby Query (CLISH)
  kind: query
  command: "camera standby get"
  params: []

- id: clish_camera_standby_off
  label: Camera Standby Off (CLISH)
  kind: action
  command: "camera standby off"
  params: []

- id: clish_camera_standby_on
  label: Camera Standby On (CLISH)
  kind: action
  command: "camera standby on"
  params: []

- id: clish_camera_standby_toggle
  label: Camera Standby Toggle (CLISH)
  kind: action
  command: "camera standby toggle"
  params: []

- id: clish_video_mute_get
  label: Video Mute Query (CLISH)
  kind: query
  command: "video mute get"
  params: []

- id: clish_video_mute_off
  label: Video Mute Off (CLISH)
  kind: action
  command: "video mute off"
  params: []

- id: clish_video_mute_on
  label: Video Mute On (CLISH)
  kind: action
  command: "video mute on"
  params: []

- id: clish_video_mute_toggle
  label: Video Mute Toggle (CLISH)
  kind: action
  command: "video mute toggle"
  params: []

- id: clish_streaming_ip_enable_get
  label: Streaming IP Enable Query (CLISH)
  kind: query
  command: "streaming ip enable get"
  params: []

- id: clish_streaming_ip_enable_on
  label: Streaming IP Enable On (CLISH)
  kind: action
  command: "streaming ip enable on"
  params: []

- id: clish_streaming_ip_enable_off
  label: Streaming IP Enable Off (CLISH)
  kind: action
  command: "streaming ip enable off"
  params: []

- id: clish_streaming_ip_enable_toggle
  label: Streaming IP Enable Toggle (CLISH)
  kind: action
  command: "streaming ip enable toggle"
  params: []

- id: clish_streaming_settings_get
  label: Streaming Settings Query (CLISH)
  kind: query
  command: "streaming settings get"
  params: []

- id: clish_network_settings_get
  label: Network Settings Query (CLISH)
  kind: query
  command: "network settings get"
  params: []

- id: clish_network_ping
  label: Network Ping (CLISH)
  kind: action
  command: "network ping [count <count>] [size <size>] <string>"
  params:
    - name: count
      type: integer
      description: "Number of ECHO_REQUEST packets. Default 5."
    - name: size
      type: integer
      description: "Packet size in bytes. Default 56."
    - name: string
      type: string
      description: "Hostname or IP address."

- id: clish_camera_recalibrate
  label: Camera Recalibrate (CLISH)
  kind: action
  command: "camera recalibrate"
  params: []

- id: clish_system_reboot
  label: System Reboot (CLISH)
  kind: action
  command: "system reboot [<seconds>]"
  params:
    - name: seconds
      type: integer
      description: "Optional delay in seconds."

- id: clish_system_factory_reset_get
  label: System Factory-Reset Query (CLISH)
  kind: query
  command: "system factory-reset get"
  params: []

- id: clish_system_factory_reset_on
  label: System Factory-Reset Arm (CLISH)
  kind: action
  command: "system factory-reset on"
  params: []

- id: clish_system_factory_reset_off
  label: System Factory-Reset Disarm (CLISH)
  kind: action
  command: "system factory-reset off"
  params: []

- id: clish_version
  label: Version Query (CLISH)
  kind: query
  command: "version"
  params: []

- id: clish_help
  label: Help (CLISH)
  kind: action
  command: "help"
  params: []

- id: clish_history
  label: History (CLISH)
  kind: query
  command: "history [<limit>]"
  params:
    - name: limit
      type: integer
      description: "Max number of commands to return / set buffer size."

- id: clish_exit
  label: Exit Session (CLISH)
  kind: action
  command: "exit"
  params: []

# =============== VISCA-COMPATIBLE SERIAL (HEX) COMMANDS ===============
# x = camera address byte (0-E); typical broadcast/1 = 01. y = response address.
# "Set" commands return 4100 (OK) + 2-digit code. "Get" returns 4-digit code + hex value.

# --- Zoom ---
- id: visca_cam_zoom_stop
  label: VISCA Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_zoom_tele_std
  label: VISCA Zoom Tele (Standard)
  kind: action
  command: "8x 01 04 07 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_zoom_wide_std
  label: VISCA Zoom Wide (Standard)
  kind: action
  command: "8x 01 04 07 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_zoom_tele_variable
  label: VISCA Zoom Tele (Variable)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Speed 0 (low) - 7 (high)."

- id: visca_cam_zoom_wide_variable
  label: VISCA Zoom Wide (Variable)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Speed 0 (low) - 7 (high)."

- id: visca_cam_zoom_direct
  label: VISCA Zoom Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pqrs
      type: hex
      description: "Zoom position 0h-7AC0h."

# --- Focus ---
- id: visca_cam_focus_stop
  label: VISCA Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_far_std
  label: VISCA Focus Far (Standard)
  kind: action
  command: "8x 01 04 08 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_near_std
  label: VISCA Focus Near (Standard)
  kind: action
  command: "8x 01 04 08 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_far_variable
  label: VISCA Focus Far (Variable)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Speed 0 (low) - 7 (high)."

- id: visca_cam_focus_near_variable
  label: VISCA Focus Near (Variable)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Speed 0 (low) - 7 (high)."

- id: visca_cam_focus_direct
  label: VISCA Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pqrs
      type: hex
      description: "Focus position 1000h-F000h."

- id: visca_cam_focus_auto
  label: VISCA Auto Focus
  kind: action
  command: "8x 01 04 38 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_manual
  label: VISCA Manual Focus
  kind: action
  command: "8x 01 04 38 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_auto_manual
  label: VISCA Focus Auto/Manual Toggle
  kind: action
  command: "8x 01 04 08 10 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_one_push_trigger
  label: VISCA Focus One Push Trigger
  kind: action
  command: "8x 01 04 18 01 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_near_limit
  label: VISCA Focus Near Limit
  kind: action
  command: "8x 01 04 28 0p 0q 0r 0s FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pqrs
      type: hex
      description: "Near limit focus position 1000h-F000h."

# --- Pan-Tilt Drive ---
- id: visca_pan_tilt_up
  label: VISCA Pan-Tilt Up
  kind: action
  command: "8x 01 06 01 vv ww 03 01 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_down
  label: VISCA Pan-Tilt Down
  kind: action
  command: "8x 01 06 01 vv ww 03 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_left
  label: VISCA Pan-Tilt Left
  kind: action
  command: "8x 01 06 01 vv ww 01 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_right
  label: VISCA Pan-Tilt Right
  kind: action
  command: "8x 01 06 01 vv ww 02 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_upleft
  label: VISCA Pan-Tilt UpLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 01 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_upright
  label: VISCA Pan-Tilt UpRight
  kind: action
  command: "8x 01 06 01 vv ww 02 01 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_downleft
  label: VISCA Pan-Tilt DownLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_downright
  label: VISCA Pan-Tilt DownRight
  kind: action
  command: "8x 01 06 01 vv ww 02 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_stop
  label: VISCA Pan-Tilt Stop
  kind: action
  command: "8x 01 06 01 vv ww 03 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."

- id: visca_pan_tilt_absolute_position
  label: VISCA Pan-Tilt Absolute Position
  kind: action
  command: "8x 01 06 02 vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: YYYY
      type: hex
      description: "Pan position 90E2h-6BD8h."
    - name: ZZZZ
      type: hex
      description: "Tilt position EB99h-3D59h."

- id: visca_pan_tilt_home
  label: VISCA Pan-Tilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_pan_tilt_reset
  label: VISCA Pan-Tilt Reset/Recalibrate
  kind: action
  command: "81 01 06 05 FF"
  params: []

# --- Pan-Tilt-Zoom Drive ---
- id: visca_ptz_up
  label: VISCA Pan-Tilt-Zoom Up
  kind: action
  command: "8x 01 06 0A vv ww rr 03 01 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: rr
      type: hex
      description: "Zoom speed 00h-07h."

- id: visca_ptz_down
  label: VISCA Pan-Tilt-Zoom Down
  kind: action
  command: "8x 01 06 0A vv ww rr 03 02 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: rr
      type: hex
      description: "Zoom speed 00h-07h."

- id: visca_ptz_left
  label: VISCA Pan-Tilt-Zoom Left
  kind: action
  command: "8x 01 06 0A vv ww rr 01 03 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: rr
      type: hex
      description: "Zoom speed 00h-07h."

- id: visca_ptz_right
  label: VISCA Pan-Tilt-Zoom Right
  kind: action
  command: "8x 01 06 0A vv ww rr 02 03 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: rr
      type: hex
      description: "Zoom speed 00h-07h."

- id: visca_ptz_in
  label: VISCA Pan-Tilt-Zoom In
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 01 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: rr
      type: hex
      description: "Zoom speed 00h-07h."

- id: visca_ptz_out
  label: VISCA Pan-Tilt-Zoom Out
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: rr
      type: hex
      description: "Zoom speed 00h-07h."

- id: visca_ptz_stop
  label: VISCA Pan-Tilt-Zoom Stop
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: rr
      type: hex
      description: "Zoom speed 00h-07h."

- id: visca_ptz_home
  label: VISCA Pan-Tilt-Zoom Home
  kind: action
  command: "8x 01 06 0C FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_ptz_absolute_position
  label: VISCA Pan-Tilt-Zoom Absolute Position
  kind: action
  command: "8x 01 06 0B vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z 0R 0R 0R 0R FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: vv
      type: hex
      description: "Pan speed 01h-18h."
    - name: ww
      type: hex
      description: "Tilt speed 01h-14h."
    - name: YYYY
      type: hex
      description: "Pan position 90E2h-6BD8h."
    - name: ZZZZ
      type: hex
      description: "Tilt position EB99h-3D59h."
    - name: RRRR
      type: hex
      description: "Zoom position 0h-4000h."

# --- Memory (Presets) ---
- id: visca_cam_memory_reset
  label: VISCA Memory Reset
  kind: action
  command: "8x 01 04 3F 00 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Preset number 0h-0Fh."

- id: visca_cam_memory_set
  label: VISCA Memory Set
  kind: action
  command: "8x 01 04 3F 01 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Preset number 0h-0Fh."

- id: visca_cam_memory_set_with_scene
  label: VISCA Memory Set with Scene
  kind: action
  command: "8x 01 04 3F 21 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Preset number 0h-0Fh."

- id: visca_cam_memory_recall
  label: VISCA Memory Recall
  kind: action
  command: "8x 01 04 3F 02 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Preset number 0h-0Fh."

# --- White Balance ---
- id: visca_cam_wb_auto
  label: VISCA White Balance Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_wb_manual
  label: VISCA White Balance Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_rgain_reset
  label: VISCA Red Gain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_rgain_up
  label: VISCA Red Gain Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_rgain_down
  label: VISCA Red Gain Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_rgain_direct
  label: VISCA Red Gain Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pq
      type: hex
      description: "Red gain 00h-14h."

- id: visca_cam_bgain_reset
  label: VISCA Blue Gain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_bgain_up
  label: VISCA Blue Gain Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_bgain_down
  label: VISCA Blue Gain Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_bgain_direct
  label: VISCA Blue Gain Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pq
      type: hex
      description: "Blue gain 00h-14h."

# --- Auto Exposure ---
- id: visca_cam_ae_auto
  label: VISCA Auto Exposure Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_ae_manual
  label: VISCA Auto Exposure Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

# --- Shutter ---
- id: visca_cam_shutter_reset
  label: VISCA Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_shutter_up
  label: VISCA Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_shutter_down
  label: VISCA Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_shutter_direct
  label: VISCA Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pq
      type: hex
      description: "Shutter position 00h-15h."

# --- Iris ---
- id: visca_cam_iris_reset
  label: VISCA Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_iris_up
  label: VISCA Iris Up
  kind: action
  command: "8x 01 04 0B 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_iris_down
  label: VISCA Iris Down
  kind: action
  command: "8x 01 04 0B 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_iris_direct
  label: VISCA Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pq
      type: hex
      description: "Iris position 0h, 05h-11h."

# --- Gain ---
- id: visca_cam_gain_reset
  label: VISCA Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_gain_up
  label: VISCA Gain Up
  kind: action
  command: "8x 01 04 0C 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_gain_down
  label: VISCA Gain Down
  kind: action
  command: "8x 01 04 0C 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_gain_direct
  label: VISCA Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pq
      type: hex
      description: "Gain position 01h-0Fh."

- id: visca_cam_gain_limit
  label: VISCA Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Gain limit 04h-0Fh."

# --- Backlight ---
- id: visca_cam_backlight_on
  label: VISCA Backlight On
  kind: action
  command: "8x 01 04 33 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_backlight_off
  label: VISCA Backlight Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

# --- Wide Dynamic Range ---
- id: visca_cam_wd_on
  label: VISCA Wide Dynamic Range On
  kind: action
  command: "8x 01 04 3D 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_wd_off
  label: VISCA Wide Dynamic Range Off
  kind: action
  command: "8x 01 04 3D 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

# --- Aperture (Detail) ---
- id: visca_cam_aperture_reset
  label: VISCA Aperture Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_aperture_up
  label: VISCA Aperture Up
  kind: action
  command: "8x 01 04 02 01 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_aperture_down
  label: VISCA Aperture Down
  kind: action
  command: "8x 01 04 02 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_aperture_direct
  label: VISCA Aperture Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pq
      type: hex
      description: "Aperture position 0h-0Fh."

# --- Chroma ---
- id: visca_cam_chroma_direct
  label: VISCA Chroma Direct
  kind: action
  command: "8x 01 7E 55 00 00 0p 0q FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: pq
      type: hex
      description: "Chroma 00h-14h."

# --- Gamma ---
- id: visca_cam_gamma
  label: VISCA Gamma
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Gamma 0 (std) | 1 (straight)."

# --- Command Cancel ---
- id: visca_command_cancel
  label: VISCA Command Cancel
  kind: action
  command: "8x 2p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Socket 1 or 2."

# --- Power ---
- id: visca_cam_power_on
  label: VISCA Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_power_off
  label: VISCA Power Off
  kind: action
  command: "8x 01 04 00 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

# --- Tally ---
- id: visca_cam_tally_on
  label: VISCA Tally On
  kind: action
  command: "8x 01 7E 01 0A 00 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_tally_off
  label: VISCA Tally Off
  kind: action
  command: "8x 01 7E 01 0A 00 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

# --- Noise Reduction ---
- id: visca_cam_nr
  label: VISCA Noise Reduction
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Noise reduction 0 (off) | 1-5."

# --- Video Mute ---
- id: visca_cam_mute_on
  label: VISCA Video Mute On
  kind: action
  command: "8x 01 04 75 02 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_mute_off
  label: VISCA Video Mute Off
  kind: action
  command: "8x 01 04 75 03 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_mute_toggle
  label: VISCA Video Mute Toggle
  kind: action
  command: "8x 01 04 75 10 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

# =============== VISCA INQUIRY (GET) COMMANDS ===============
- id: visca_cam_zoom_pos_inq
  label: VISCA Zoom Position Inquiry
  kind: query
  command: "8x 09 04 47 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_pos_inq
  label: VISCA Focus Position Inquiry
  kind: query
  command: "8x 09 04 48 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_focus_mode_inq
  label: VISCA Focus Mode Inquiry
  kind: query
  command: "8x 09 04 38 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_pan_tilt_pos_inq
  label: VISCA Pan-Tilt Position Inquiry
  kind: query
  command: "8x 09 06 12 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_memory_inq
  label: VISCA Memory Inquiry
  kind: query
  command: "8x 09 04 3F FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_memory_status_inq
  label: VISCA Memory Status Inquiry
  kind: query
  command: "8x 09 04 3F 0p FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: p
      type: hex
      description: "Preset number 00h-0Fh."

- id: visca_cam_mem_save_inq
  label: VISCA Memory Save Inquiry
  kind: query
  command: "8x 09 04 23 0X FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
    - name: X
      type: hex
      description: "Preset number 00h-0Fh."

- id: visca_cam_ptz_preset_speed_inq
  label: VISCA PTZ Preset Speed Inquiry
  kind: query
  command: "8x 09 7E 01 0B FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_wb_mode_inq
  label: VISCA White Balance Mode Inquiry
  kind: query
  command: "8x 09 04 35 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_rgain_inq
  label: VISCA Red Gain Inquiry
  kind: query
  command: "8x 09 04 43 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_bgain_inq
  label: VISCA Blue Gain Inquiry
  kind: query
  command: "8x 09 04 44 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_ae_mode_inq
  label: VISCA Auto Exposure Mode Inquiry
  kind: query
  command: "8x 09 04 39 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_shutter_pos_inq
  label: VISCA Shutter Position Inquiry
  kind: query
  command: "8x 09 04 4A FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_iris_pos_inq
  label: VISCA Iris Position Inquiry
  kind: query
  command: "8x 09 04 4B FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_gain_pos_inq
  label: VISCA Gain Position Inquiry
  kind: query
  command: "8x 09 04 4C FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_wd_mode_inq
  label: VISCA Wide Dynamic Range Mode Inquiry
  kind: query
  command: "8x 09 04 3D FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_backlight_mode_inq
  label: VISCA Backlight Mode Inquiry
  kind: query
  command: "8x 09 04 33 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_aperture_inq
  label: VISCA Aperture Inquiry
  kind: query
  command: "8x 09 04 42 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_chroma_inq
  label: VISCA Chroma Inquiry
  kind: query
  command: "8x 09 7E 55 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_gamma_inq
  label: VISCA Gamma Inquiry
  kind: query
  command: "8x 09 04 5B FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_power_inq
  label: VISCA Power Inquiry
  kind: query
  command: "8x 09 04 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_tally_inq
  label: VISCA Tally Inquiry
  kind: query
  command: "8x 09 7E 01 0A FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_nr_inq
  label: VISCA Noise Reduction Inquiry
  kind: query
  command: "8x 09 04 53 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_cam_mute_mode_inq
  label: VISCA Mute Mode Inquiry
  kind: query
  command: "8x 09 04 75 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_ip_address_inq
  label: VISCA IP Address Inquiry
  kind: query
  command: "8x 09 08 4E 00 00 FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."

- id: visca_vaddio_model_inq
  label: VISCA Vaddio Model Inquiry
  kind: query
  command: "8x 09 08 0e FF"
  params:
    - name: x
      type: hex
      description: "Camera address nibble."
```

## Feedbacks
```yaml
# CLISH query responses:
- id: clish_pan_position_response
  type: float
  description: "Pan position in degrees (~-160.00 to 160.00), returned by 'camera pan get'."

- id: clish_tilt_position_response
  type: float
  description: "Tilt position in degrees (~-30.00 to 90.00), returned by 'camera tilt get'."

- id: clish_zoom_position_response
  type: float
  description: "Zoom level (1.00-20.00 for PrimeSHOT 20), returned by 'camera zoom get'."

- id: clish_focus_mode_response
  type: enum
  values: [auto_focus_on, auto_focus_off]
  description: "Returned by 'camera focus mode get'. Example: 'auto_focus:\non'."

- id: clish_ccu_response
  type: object
  description: "CCU setting(s) returned by 'camera ccu get <param>|all'. 'all' returns all CCU values."

- id: clish_led_response
  type: enum
  values: [on, off]
  description: "Returned by 'camera led get'. Example: 'led:\non'."

- id: clish_standby_response
  type: enum
  values: [on, off]
  description: "Returned by 'camera standby get'. Example: 'standby:\non'."

- id: clish_video_mute_response
  type: enum
  values: [on, off]
  description: "Returned by 'video mute get'. Example: 'mute:\noff'."

- id: clish_streaming_enable_response
  type: boolean
  description: "Returned by 'streaming ip enable get'. Example: 'enabled: true'."

- id: clish_streaming_settings_response
  type: object
  description: "Streaming settings (Custom_Frame_Rate, Custom_Resolution, Enabled, Port, Preset_Quality, Preset_Resolution, Protocol, URL, Video_Mode) returned by 'streaming settings get'."

- id: clish_network_settings_response
  type: object
  description: "Network settings (Name, MAC Address, IP Address, Netmask, VLAN, Gateway) returned by 'network settings get'."

- id: clish_factory_reset_response
  type: object
  description: "factory-reset (software) and factory-reset (hardware) status, returned by 'system factory-reset get'."

- id: clish_version_response
  type: object
  description: "Commit, Sensor Version, System Version returned by 'version'."

# VISCA inquiry responses (response packet format: y0 50 ... FF, y = address):
- id: visca_zoom_pos_response
  type: hex
  description: "y0 50 0p 0q 0r 0s FF; pqrs = zoom position."

- id: visca_focus_pos_response
  type: hex
  description: "y0 50 0p 0q 0r 0s FF; pqrs = focus position."

- id: visca_focus_mode_response
  type: enum
  values: [auto, manual]
  description: "y0 50 02 FF (auto) | y0 50 03 FF (manual)."

- id: visca_pan_tilt_pos_response
  type: hex
  description: "y0 50 0w 0w 0w 0w 0z 0z 0z 0z FF; wwww=pan, zzzz=tilt."

- id: visca_memory_response
  type: hex
  description: "y0 50 pp FF; pp = last recalled preset (00h-0Fh)."

- id: visca_memory_status_response
  type: hex
  description: "y0 50 0p 0q 0r 0s FF; p=preset, q=mode, rs=speed."

- id: visca_ptz_preset_speed_response
  type: hex
  description: "y0 50 p q r FF; p=pan, q=tilt, r=zoom speed."

- id: visca_wb_mode_response
  type: enum
  values: [auto, manual]
  description: "y0 50 00 FF (auto) | y0 50 05 FF (manual)."

- id: visca_rgain_response
  type: hex
  description: "y0 50 00 00 0p 0q FF; pq = red gain."

- id: visca_bgain_response
  type: hex
  description: "y0 50 00 00 0p 0q FF; pq = blue gain."

- id: visca_ae_mode_response
  type: enum
  values: [auto, manual]
  description: "y0 50 00 FF (auto) | y0 50 03 FF (manual)."

- id: visca_shutter_pos_response
  type: hex
  description: "y0 50 00 00 0p 0q FF; pq = shutter position."

- id: visca_iris_pos_response
  type: hex
  description: "y0 50 00 00 0p 0q FF; pq = iris position."

- id: visca_gain_pos_response
  type: hex
  description: "y0 50 00 00 0p 0q FF; pq = gain position."

- id: visca_wd_mode_response
  type: enum
  values: [on, off]
  description: "y0 50 02 FF (on) | y0 50 03 FF (off)."

- id: visca_backlight_mode_response
  type: enum
  values: [on, off]
  description: "y0 50 02 FF (on) | y0 50 03 FF (off)."

- id: visca_aperture_response
  type: hex
  description: "y0 50 00 00 0p 0q FF; pq = aperture gain."

- id: visca_chroma_response
  type: hex
  description: "y0 50 05 00 00 00 0p FF; p = chroma 0-Eh."

- id: visca_gamma_response
  type: hex
  description: "y0 50 0p FF; p = gamma 00h | 01h."

- id: visca_power_response
  type: enum
  values: [on, off]
  description: "y0 50 02 FF (on) | y0 50 03 FF (off/standby)."

- id: visca_tally_response
  type: enum
  values: [on, off]
  description: "y0 50 02 FF (on) | y0 50 03 FF (off)."

- id: visca_nr_response
  type: hex
  description: "y0 50 0p FF; p = noise reduction 00h-05h."

- id: visca_mute_mode_response
  type: enum
  values: [on, off]
  description: "y0 50 02 FF (on) | y0 50 03 FF (off)."

- id: visca_ip_address_response
  type: ip
  description: "90 50 49 50 00 00 00 ... FF; pppqqqrrrsss = IP address."

- id: visca_model_response
  type: enum
  values: ["PrimeSHOT 10 HDMI", "PrimeSHOT 20 HDMI"]
  description: "90 50 04 6C 00 00 00 FF (10) | 90 50 04 68 00 00 00 FF (20)."
```

## Variables
```yaml
# CCU/lighting parameters settable but also exposed as discrete actions above.
# Re-referenced here as continuous variables for level-style UIs.
- id: red_gain
  type: integer
  range: [0, 20]
  description: "Red gain; manual only (AWB off)."
- id: blue_gain
  type: integer
  range: [0, 20]
  description: "Blue gain; manual only (AWB off)."
- id: iris
  type: integer
  range: [0, 11]
  description: "Iris; manual only (auto-iris off)."
- id: gain
  type: integer
  range: [1, 10]
  description: "Gain; manual only (auto-iris off)."
- id: detail
  type: integer
  range: [0, 10]
  description: "Detail (aperture)."
- id: chroma
  type: integer
  range: [0, 20]
  description: "Chroma."
- id: gamma
  type: integer
  range: [-16, 64]
  description: "Gamma."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notification mechanism. VISCA is
# request/response; CLISH returns OK or query values. No push events documented.
```

## Macros
```yaml
# Source mentions CLISH is "used for writing macros" but documents no explicit
# multi-step macro sequences.
# UNRESOLVED: no macro examples in source.
```

## Safety
```yaml
confirmation_required_for:
  - system_reboot         # reboots the device
  - system_factory_reset_on  # arms factory reset on next reboot - destructive
  - camera_recalibrate    # recalibrates pan/tilt motors
interlocks:
  - "auto_white_balance on overrides manual red_gain and blue_gain."
  - "auto_iris on disables manual iris and gain."
  - "backlight_compensation can only be set when wide_dynamic_range is off."
  - "wide_dynamic_range can only be set when backlight_compensation is off."
  - "system factory-reset on does NOT reset immediately - it resets on next reboot."
  - "Red gain / blue gain manual set only valid when auto_white_balance is off."
# UNRESOLVED: no power-on sequencing or hardware interlock procedures documented in source.
```

## Notes
- **Two distinct control protocols documented:** CLISH (ASCII text, over SSH/Telnet/RS-232) and a VISCA-compatible hex-byte serial command set. The two are NOT interchangeable — CLISH commands return `OK`; VISCA commands return `4100` codes or `y0 50 ...` inquiry responses.
- **CLISH prompt:** `>`. **Buffer clear:** `CTRL-5`. **Help:** `?` after any command/subcommand returns valid parameters.
- **VISCA addressing:** `x`/`y` = camera address nibble (0-E). Reset command uses fixed `81`.
- **Standby vs Power:** CLISH `camera standby` corresponds to VISCA `CAM_Power`. Standby stops video.
- **Baud rate:** switch-selectable 9600 (default) or 38400; must match the controlling device. Web UI shows but cannot change baud rate.
- **RTSP** default port 554 (stated for streaming, not control).
- **Image Flip** inverts tilt range (~30 to -90 instead of -30 to 90).
- **Status light colors:** Purple = standby/booting, Blue = active, Yellow = firmware update, Blinking yellow = motor out of calibration.

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact admin/user credential format and auth token scheme not detailed beyond "admin account" -->
<!-- UNRESOLVED: SSH port not explicitly stated (only Telnet port 23 given); SSH is "recommended" -->
<!-- UNRESOLVED: exact VISCA socket/command-buffer timing constraints not specified -->
<!-- UNRESOLVED: no voltage/power/current specs in this refined excerpt -->
```

Spec written above. Single AI4AV revision covering both CLISH (ASCII, SSH/Telnet/RS-232) + VISCA hex serial. Full enumeration of every source-documented command row, verbatim payloads. Inferences flagged. UNRESOLVED markers on auth scheme details, SSH port, firmware range, voltage/power.

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - bhphotovideo.com
  - manua.ls
  - manuals.plus
  - manuals.ca
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v133953876/Resources/Vaddio/Cameras/Operation/411-0022-30_Rev_D_PrimeSHOT_HDMI_Complete_Manual.pdf
  - https://www.bhphotovideo.com/lit_files/971694.pdf
  - https://www.manua.ls/vaddio/primeshot-20-hdmi/manual
  - https://manuals.plus/m/e570efc129f9334a8f9b7cd73964a6f900938e6d2d75ca318937a4480e7945dd_optim.pdf
  - https://www.manuals.ca/vaddio/primeshot-20-hdmi/manual
retrieved_at: 2026-07-24T19:20:31.769Z
last_checked_at: 2026-08-05T08:54:19.095Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:54:19.095Z
matched_actions: 164
action_count: 164
confidence: medium
summary: "All 164 spec actions match source verbatim (CLISH ASCII commands + VISCA hex bytes); transport values also match; coverage ratio ≈ 0.95. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "camera icr"
- "firmware version compatibility range not stated in source"
- "exact power/voltage/current specs not in this refined excerpt"
- "exact credential/token formats not specified beyond \"admin account\" requirement"
- "source describes no unsolicited notification mechanism. VISCA is"
- "no macro examples in source."
- "no power-on sequencing or hardware interlock procedures documented in source."
- "firmware version compatibility range not stated"
- "exact admin/user credential format and auth token scheme not detailed beyond \"admin account\""
- "SSH port not explicitly stated (only Telnet port 23 given); SSH is \"recommended\""
- "exact VISCA socket/command-buffer timing constraints not specified"
- "no voltage/power/current specs in this refined excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
