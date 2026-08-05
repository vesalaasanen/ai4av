---
spec_id: admin/vaddio-conferenceshot-10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio ConferenceSHOT 10 Control Spec"
manufacturer: Vaddio
model_family: "ConferenceSHOT 10"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "ConferenceSHOT 10"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - legrandav.com
  - manualslib.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v134260596/Resources/Vaddio/Cameras/Operation/411-0002-30_Rev_E_ConferenceSHOT_10_Complete_Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/vaddio_ConferenceSHOT_AV_Complete_Manual.pdf"
  - "https://www.legrandav.com/-/media/files/vaddio/literature/170001b-conferenceshot-av.pdf?sc_lang=en"
  - https://www.manualslib.com/products/Vaddio-Conferenceshot-10-8656260.html
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/vaddio-ConferenceSHOT-10-AdminGuide.pdf"
retrieved_at: 2026-07-24T19:19:50.612Z
last_checked_at: 2026-08-05T08:50:04.940Z
generated_at: 2026-08-05T08:50:04.940Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "streaming ip enable is listed in the Telnet command index but no synopsis/payload is given in the source."
  - "HTTP web admin exists (disabled by default) but is a configuration UI, not a device-control protocol; not modelled here."
  - "default admin/user passwords are deliberately unset; telnet auth requires an operator-set admin password."
  - "start bits = 1 is stated but not modelled as a field here"
  - "\"streaming ip enable\" appears in the Telnet command index but the"
  - "full enumeration of per-CCU-variable ranges is captured in the"
  - "source documents no unsolicited notifications / async events."
  - "source documents no explicit multi-step macro sequences."
  - "source contains no explicit safety interlocks, power-on sequencing,"
  - "firmware version compatibility ranges not stated."
  - "\"streaming ip enable\" Telnet command has no synopsis/payload in source."
  - "exact RS-232 framing (start bits) and cable pin-out beyond RXD/TXD/GND not fully specified for control."
  - "no auth model documented for RS-232 (physical port assumed)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:50:04.940Z
  matched_actions: 136
  action_count: 136
  confidence: medium
  summary: "All 136 spec actions match source verbatim; transport (port 23, baud 9600, admin auth) verified; spec covers the full VISCA+Telnet command set documented in source. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Vaddio ConferenceSHOT 10 Control Spec

## Summary
The Vaddio ConferenceSHOT 10 is an enterprise-class PTZ conferencing camera. This spec covers two documented control interfaces: a Telnet (TCP) text command API on port 23, and an RS-232 serial command API implementing a Sony VISCA-compatible binary command set. The Telnet API exposes camera movement, zoom, focus, presets, CCU color/lighting, standby, video mute, network/streaming status queries, and system maintenance commands. The RS-232 API exposes VISCA movement, zoom, focus, memory, color/lighting, power, tally, noise-reduction, and mute commands plus inquiry commands.

<!-- UNRESOLVED: streaming ip enable is listed in the Telnet command index but no synopsis/payload is given in the source. -->
<!-- UNRESOLVED: HTTP web admin exists (disabled by default) but is a configuration UI, not a device-control protocol; not modelled here. -->
<!-- UNRESOLVED: default admin/user passwords are deliberately unset; telnet auth requires an operator-set admin password. -->

## Transport
```yaml
# Two protocols documented: Telnet (TCP, port 23) and RS-232 serial (VISCA-like).
# Telnet is disabled by default in firmware issued after mid-December 2019; must be
# enabled on the web UI Security page. RS-232 is available via the blue RJ-45 port.
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet port stated explicitly in source
serial:
  baud_rate: 9600  # default; 38400 bps switch-selectable via soft DIP switch
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # UNRESOLVED: start bits = 1 is stated but not modelled as a field here
auth:
  type: password  # Telnet requires admin login; no default admin password.
  # NOTE: RS-232 serial has no auth procedure described in source (physical-port control).
```

## Traits
```yaml
# - powerable  : CAM_Power on/off (RS-232) and camera standby on/off (Telnet)
# - queryable  : extensive inquiry commands on both APIs (version, ccu get, *Inq, etc.)
# - levelable  : zoom, focus, gain, iris, chroma, detail, gamma continuous-value set commands
traits:
  - powerable    # inferred from power/standby command examples
  - queryable    # inferred from query/inquiry command examples
  - levelable    # inferred from continuous-value set command examples
```

## Actions
```yaml
# ============================================================================
# NOTE on VISCA command bytes: the source writes commands as "8x 01 ... FF" where
# x = destination camera address (0-F), default 1, and the response prefix is "y0"
# where y = (x + 8). Commands are reproduced VERBATIM from the source. "8x" is a
# single byte whose low nibble is the camera address.
# ============================================================================

# ----------------------------- TELNET API -----------------------------------

- id: telnet_camera_home
  label: Camera Home (Telnet)
  kind: action
  command: "camera home"
  params: []
  notes: "Moves camera to home position and zoom level."

- id: telnet_camera_pan
  label: Camera Pan (Telnet)
  kind: action
  command: "camera pan {left [<speed>] | right [<speed>] | stop | get | set <position> [<speed>] [no_wait]}"
  params:
    - name: direction
      type: enum
      description: "left | right | stop | get | set"
    - name: speed
      type: integer
      description: "Pan speed 1-24 (default 12). Optional for left/right/set."
    - name: position
      type: float
      description: "Absolute pan position in degrees, approx -160.00 (left) to 160.00 (right). Required for set."
    - name: no_wait
      type: flag
      description: "Return prompt immediately while movement in progress."

- id: telnet_camera_tilt
  label: Camera Tilt (Telnet)
  kind: action
  command: "camera tilt {up [<speed>] | down [<speed>] | stop | get | set <position> [<speed>] [no_wait]}"
  params:
    - name: direction
      type: enum
      description: "up | down | stop | get | set"
    - name: speed
      type: integer
      description: "Tilt speed 1-20 (default 10)."
    - name: position
      type: float
      description: "Absolute tilt in degrees, approx -30.00 to 90.00."
    - name: no_wait
      type: flag

- id: telnet_camera_zoom
  label: Camera Zoom (Telnet)
  kind: action
  command: "camera zoom {in [<speed>] | out [<speed>] | stop | get | set <position> [<speed>] [no_wait]}"
  params:
    - name: direction
      type: enum
      description: "in | out | stop | get | set"
    - name: position
      type: float
      description: "Zoom level 1.00-10.00 (12.00 in Super Wide Mode)."

- id: telnet_camera_ptz_position
  label: Camera PTZ-Position (Telnet)
  kind: action
  command: "camera ptz-position pan <position> tilt <position> zoom <position> [no_wait]"
  params:
    - name: pan
      type: float
      description: "Pan position approx -160.00 to 160.00."
    - name: tilt
      type: float
      description: "Tilt position approx -30.0 to 93.0."
    - name: zoom
      type: float
      description: "Zoom 1.0 to 10.0."
    - name: no_wait
      type: flag

- id: telnet_camera_focus
  label: Camera Focus (Telnet)
  kind: action
  command: "camera focus {near [<speed>] | far [<speed>] | stop | mode {get | auto | manual}}"
  params:
    - name: direction
      type: enum
      description: "near | far | stop (manual mode only)."
    - name: speed
      type: integer
      description: "Focus speed 1-8."
    - name: mode
      type: enum
      description: "get | auto | manual"

- id: telnet_camera_preset
  label: Camera Preset (Telnet)
  kind: action
  command: "camera preset {recall | store} [1 - 16] [save-ccu]"
  params:
    - name: operation
      type: enum
      description: "recall | store"
    - name: preset
      type: integer
      description: "Preset number 1-16."
    - name: save_ccu
      type: flag
      description: "Save current CCU color/lighting with preset."

- id: telnet_camera_ccu_get
  label: Camera CCU Get (Telnet)
  kind: query
  command: "camera ccu get <param>"
  params:
    - name: param
      type: enum
      description: "auto_white_balance | red_gain | blue_gain | backlight_compensation | iris | auto_iris | gain | detail | chroma | gamma | wide_dynamic_range | all"

- id: telnet_camera_ccu_set
  label: Camera CCU Set (Telnet)
  kind: action
  command: "camera ccu set <param> <value>"
  params:
    - name: param
      type: enum
      description: "auto_white_balance | red_gain | blue_gain | backlight_compensation | iris | auto_iris | gain | detail | chroma | gamma | wide_dynamic_range"
    - name: value
      type: string
      description: "See source for per-param ranges: red/blue_gain 0-255, iris 0-11, gain 0-11, detail 0-15, chroma 0-14, gamma -16 to 64, on/off enums for booleans."

- id: telnet_camera_led
  label: Camera LED (Telnet)
  kind: action
  command: "camera led {get | off | on}"
  params:
    - name: state
      type: enum
      description: "get | off | on"

- id: telnet_camera_icr
  label: Camera ICR (Telnet)
  kind: action
  command: "camera icr {get | off}"
  params:
    - name: state
      type: enum
      description: "get | off (IR cut filter)"
  notes: "Documented only via troubleshooting table."

- id: telnet_camera_recalibrate
  label: Camera Recalibrate (Telnet)
  kind: action
  command: "camera recalibrate"
  params: []
  notes: "Recalibrates pan/tilt motors; typically run on motor fault."

- id: telnet_camera_standby
  label: Camera Standby (Telnet)
  kind: action
  command: "camera standby {get | off | on | toggle}"
  params:
    - name: state
      type: enum
      description: "get | off | on | toggle"

- id: telnet_video_mute
  label: Video Mute (Telnet)
  kind: action
  command: "video mute {get | off | on | toggle}"
  params:
    - name: state
      type: enum
      description: "get | off | on | toggle"
  notes: "Sends blue/black video with on-screen message. Does not affect audio."

- id: telnet_network_settings_get
  label: Network Settings Get (Telnet)
  kind: query
  command: "network settings get"
  params: []
  notes: "Returns interface name, MAC, IP, netmask, VLAN, gateway."

- id: telnet_streaming_settings_get
  label: Streaming Settings Get (Telnet)
  kind: query
  command: "streaming settings get"
  params: []
  notes: "Returns IP (RTSP/RTMP) and USB streaming parameters."

- id: telnet_network_ping
  label: Network Ping (Telnet)
  kind: action
  command: "network ping [count <count>] [size <size>] <string>"
  params:
    - name: count
      type: integer
      description: "Number of ECHO_REQUEST packets (default 5)."
    - name: size
      type: integer
      description: "Packet size in bytes (default 56)."
    - name: string
      type: string
      description: "Hostname or IP address."

- id: telnet_system_reboot
  label: System Reboot (Telnet)
  kind: action
  command: "system reboot [<seconds>]"
  params:
    - name: seconds
      type: integer
      description: "Delay in seconds before reboot."
  notes: "Reboot required after system factory-reset."

- id: telnet_system_factory_reset
  label: System Factory-Reset (Telnet)
  kind: action
  command: "system factory-reset {get | on | off}"
  params:
    - name: state
      type: enum
      description: "get | on | off. 'on' arms reset-on-next-reboot; does not itself reset."
  notes: "Returns software + hardware (DIP switch) factory-reset status."

- id: telnet_version
  label: Version (Telnet)
  kind: query
  command: "version"
  params: []
  notes: "Returns Commit, Sensor Version, System Version."

- id: telnet_history
  label: History (Telnet)
  kind: action
  command: "history <limit>"
  params:
    - name: limit
      type: integer
      description: "Max number of commands to return / buffer size."

- id: telnet_help
  label: Help (Telnet)
  kind: action
  command: "help"
  params: []

- id: telnet_exit
  label: Exit (Telnet)
  kind: action
  command: "exit"
  params: []
  notes: "Ends session and closes socket."

# UNRESOLVED: "streaming ip enable" appears in the Telnet command index but the
# source provides no synopsis, options, or example. Not modelled as an action.

# ----------------------------- RS-232 VISCA API -----------------------------
# Camera Movement, Zoom, and Focus Commands

- id: visca_zoom_stop
  label: CAM_Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params: []

- id: visca_zoom_tele_std
  label: CAM_Zoom Tele (std)
  kind: action
  command: "8x 01 04 07 02 FF"
  params: []

- id: visca_zoom_wide_std
  label: CAM_Zoom Wide (std)
  kind: action
  command: "8x 01 04 07 03 FF"
  params: []

- id: visca_zoom_tele_variable
  label: CAM_Zoom Tele (variable)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: p
      type: integer
      description: "Zoom speed 0 (low) to 7 (high)."

- id: visca_zoom_wide_variable
  label: CAM_Zoom Wide (variable)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: p
      type: integer
      description: "Zoom speed 0 (low) to 7 (high)."

- id: visca_zoom_direct
  label: CAM_Zoom Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: string
      description: "Direct zoom position 0h-4000h."

- id: visca_focus_stop
  label: CAM_Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params: []

- id: visca_focus_far_std
  label: CAM_Focus Far (std)
  kind: action
  command: "8x 01 04 08 02 FF"
  params: []

- id: visca_focus_near_std
  label: CAM_Focus Near (std)
  kind: action
  command: "8x 01 04 08 03 FF"
  params: []

- id: visca_focus_far_variable
  label: CAM_Focus Far (variable)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: p
      type: integer
      description: "Focus speed 0 (low) to 7 (high)."

- id: visca_focus_near_variable
  label: CAM_Focus Near (variable)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: p
      type: integer
      description: "Focus speed 0 (low) to 7 (high)."

- id: visca_focus_direct
  label: CAM_Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: string
      description: "Direct focus position 1000h-F000h."

- id: visca_focus_auto
  label: CAM_Focus Auto Focus
  kind: action
  command: "8x 01 04 38 02 FF"
  params: []

- id: visca_focus_manual
  label: CAM_Focus Manual Focus
  kind: action
  command: "8x 01 04 38 03 FF"
  params: []

- id: visca_focus_auto_manual
  label: CAM_Focus Auto/Manual Toggle
  kind: action
  command: "8x 01 04 08 10 FF"
  params: []

- id: visca_focus_one_push_trigger
  label: CAM_Focus One Push Trigger
  kind: action
  command: "8x 01 04 18 01 FF"
  params: []

- id: visca_focus_near_limit
  label: CAM_Focus Near Limit
  kind: action
  command: "8x 01 04 28 0p 0q 0r 0s FF"
  params:
    - name: pqrs
      type: string
      description: "Near limit focus position 1000h-F000h."

- id: visca_pantilt_up
  label: Pan-TiltDrive Up
  kind: action
  command: "8x 01 06 01 vv ww 03 01 FF"
  params:
    - name: vv
      type: string
      description: "Pan speed 01h-18h."
    - name: ww
      type: string
      description: "Tilt speed 01h-14h."

- id: visca_pantilt_down
  label: Pan-TiltDrive Down
  kind: action
  command: "8x 01 06 01 vv ww 03 02 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_left
  label: Pan-TiltDrive Left
  kind: action
  command: "8x 01 06 01 vv ww 01 03 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_right
  label: Pan-TiltDrive Right
  kind: action
  command: "8x 01 06 01 vv ww 02 03 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_upleft
  label: Pan-TiltDrive UpLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 01 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_upright
  label: Pan-TiltDrive UpRight
  kind: action
  command: "8x 01 06 01 vv ww 02 01 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_downleft
  label: Pan-TiltDrive DownLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 02 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_downright
  label: Pan-TiltDrive DownRight
  kind: action
  command: "8x 01 06 01 vv ww 02 02 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_stop
  label: Pan-TiltDrive Stop
  kind: action
  command: "8x 01 06 01 vv ww 03 03 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string

- id: visca_pantilt_absolute
  label: Pan-TiltDrive Absolute Position
  kind: action
  command: "8x 01 06 02 vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: vv
      type: string
      description: "Pan speed 01h-18h."
    - name: ww
      type: string
      description: "Tilt speed 01h-14h."
    - name: YYYY
      type: string
      description: "Pan position 90E2h-6BD8h."
    - name: ZZZZ
      type: string
      description: "Tilt position EB99h-3D59h."

- id: visca_pantilt_home
  label: Pan-TiltDrive Home
  kind: action
  command: "8x 01 06 04 FF"
  params: []
  notes: "Returns camera to default position."

- id: visca_pantilt_reset
  label: Pan-TiltDrive Reset
  kind: action
  command: "81 01 06 05 FF"
  params: []
  notes: "Resets/recalibrates pan and tilt motors."

- id: visca_ptz_up
  label: Pan-Tilt-ZoomDrive Up
  kind: action
  command: "8x 01 06 0A vv ww rr 03 01 03 FF"
  params:
    - name: vv
      type: string
      description: "Pan speed 01h-18h."
    - name: ww
      type: string
      description: "Tilt speed 01h-14h."
    - name: rr
      type: string
      description: "Zoom speed 00h-07h."

- id: visca_ptz_down
  label: Pan-Tilt-ZoomDrive Down
  kind: action
  command: "8x 01 06 0A vv ww rr 03 02 03 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string
    - name: rr
      type: string

- id: visca_ptz_left
  label: Pan-Tilt-ZoomDrive Left
  kind: action
  command: "8x 01 06 0A vv ww rr 01 03 03 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string
    - name: rr
      type: string

- id: visca_ptz_right
  label: Pan-Tilt-ZoomDrive Right
  kind: action
  command: "8x 01 06 0A vv ww rr 02 03 03 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string
    - name: rr
      type: string

- id: visca_ptz_in
  label: Pan-Tilt-ZoomDrive In
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 01 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string
    - name: rr
      type: string

- id: visca_ptz_out
  label: Pan-Tilt-ZoomDrive Out
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 02 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string
    - name: rr
      type: string

- id: visca_ptz_stop
  label: Pan-Tilt-ZoomDrive Stop
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 03 FF"
  params:
    - name: vv
      type: string
    - name: ww
      type: string
    - name: rr
      type: string

- id: visca_ptz_home
  label: Pan-Tilt-ZoomDrive Home
  kind: action
  command: "8x 01 06 0C FF"
  params: []
  notes: "Returns camera to default position and zoom."

- id: visca_ptz_absolute
  label: Pan-Tilt-ZoomDrive Absolute Position
  kind: action
  command: "8x 01 06 0B vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z 0R 0R 0R 0R FF"
  params:
    - name: vv
      type: string
      description: "Pan speed 01h-18h."
    - name: ww
      type: string
      description: "Tilt speed 01h-14h."
    - name: YYYY
      type: string
      description: "Pan position 90E2h-6BD8h."
    - name: ZZZZ
      type: string
      description: "Tilt position EB99h-3D59h."
    - name: RRRR
      type: string
      description: "Zoom position 0h-4000h."

- id: visca_memory_reset
  label: CAM_Memory Reset
  kind: action
  command: "8x 01 04 3F 00 0p FF"
  params:
    - name: p
      type: string
      description: "Preset number 0h-0Fh."

- id: visca_memory_set
  label: CAM_Memory Set
  kind: action
  command: "8x 01 04 3F 01 0p FF"
  params:
    - name: p
      type: string
      description: "Preset number 0h-0Fh."

- id: visca_memory_set_scene
  label: CAM_Memory Set with scene
  kind: action
  command: "8x 01 04 3F 21 0p FF"
  params:
    - name: p
      type: string
      description: "Preset number 0h-0Fh."

- id: visca_memory_recall
  label: CAM_Memory Recall
  kind: action
  command: "8x 01 04 3F 02 0p FF"
  params:
    - name: p
      type: string
      description: "Preset number 0h-0Fh."

- id: visca_ptz_preset_speed
  label: CAM_PTZ_PresetSpeed
  kind: action
  command: "8x 01 7e 01 0b pp qq rr FF"
  params:
    - name: pp
      type: string
      description: "Pan speed 01h-18h."
    - name: qq
      type: string
      description: "Tilt speed 01h-14h."
    - name: rr
      type: string
      description: "Zoom speed 0h-07h."

# Color and Light Management Commands (RS-232)

- id: visca_wb_auto
  label: CAM_WB Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params: []
  notes: "Normal auto white balance."

- id: visca_wb_manual
  label: CAM_WB Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params: []
  notes: "Manual control mode."

- id: visca_rgain_reset
  label: CAM_RGain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params: []

- id: visca_rgain_up
  label: CAM_RGain Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params: []

- id: visca_rgain_down
  label: CAM_RGain Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params: []

- id: visca_rgain_direct
  label: CAM_RGain Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "Red gain 00h-FFh."

- id: visca_bgain_reset
  label: CAM_BGain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params: []

- id: visca_bgain_up
  label: CAM_BGain Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params: []

- id: visca_bgain_down
  label: CAM_BGain Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params: []

- id: visca_bgain_direct
  label: CAM_BGain Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "Blue gain 00h-FFh."

- id: visca_ae_auto
  label: CAM_AE Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params: []
  notes: "Auto exposure mode."

- id: visca_ae_manual
  label: CAM_AE Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params: []
  notes: "Manual control mode."

- id: visca_shutter_reset
  label: CAM_Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params: []

- id: visca_shutter_up
  label: CAM_Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params: []

- id: visca_shutter_down
  label: CAM_Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params: []

- id: visca_shutter_direct
  label: CAM_Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "Shutter position 00h-15h."

- id: visca_iris_reset
  label: CAM_Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params: []

- id: visca_iris_up
  label: CAM_Iris Up
  kind: action
  command: "8x 01 04 0B 02 FF"
  params: []

- id: visca_iris_down
  label: CAM_Iris Down
  kind: action
  command: "8x 01 04 0B 03 FF"
  params: []

- id: visca_iris_direct
  label: CAM_Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "Iris position 0h, 05h-11h."

- id: visca_gain_reset
  label: CAM_Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params: []

- id: visca_gain_up
  label: CAM_Gain Up
  kind: action
  command: "8x 01 04 0C 02 FF"
  params: []

- id: visca_gain_down
  label: CAM_Gain Down
  kind: action
  command: "8x 01 04 0C 03 FF"
  params: []

- id: visca_gain_direct
  label: CAM_Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "Gain position 01h-0Fh."

- id: visca_gain_limit
  label: CAM_Gain +Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: p
      type: string
      description: "Gain limit 04h-0Fh."

- id: visca_backlight_on
  label: CAM_BackLight On
  kind: action
  command: "8x 01 04 33 02 FF"
  params: []

- id: visca_backlight_off
  label: CAM_BackLight Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params: []

- id: visca_wd_on
  label: CAM_WD On
  kind: action
  command: "8x 01 04 3D 02 FF"
  params: []
  notes: "Wide Dynamic Range On."

- id: visca_wd_off
  label: CAM_WD Off
  kind: action
  command: "8x 01 04 3D 03 FF"
  params: []
  notes: "Wide Dynamic Range Off."

- id: visca_aperture_reset
  label: CAM_Aperture Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params: []

- id: visca_aperture_up
  label: CAM_Aperture Up
  kind: action
  command: "8x 01 04 02 01 FF"
  params: []

- id: visca_aperture_down
  label: CAM_Aperture Down
  kind: action
  command: "8x 01 04 02 02 FF"
  params: []

- id: visca_aperture_direct
  label: CAM_Aperture Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "Aperture position 0h-0Fh."

- id: visca_chroma_direct
  label: CAM_Chroma Direct
  kind: action
  command: "8x 01 7E 55 00 00 0p 0q FF"
  params:
    - name: pq
      type: string
      description: "Chroma 00h-14h."

- id: visca_gamma_offset_direct
  label: CAM_GammaOffset Direct
  kind: action
  command: "8x 01 04 1E 00 00 00 0s 0t 0u FF"
  params:
    - name: s
      type: string
      description: "Polarity offset (0 = plus, 1 = minus)."
    - name: tu
      type: string
      description: "Offset; s=0: 00h-40h, s=1: 00h-10h."

# Other Commands (RS-232)

- id: visca_command_cancel
  label: CommandCancel
  kind: action
  command: "8x 2p FF"
  params:
    - name: p
      type: string
      description: "Socket 1 or 2."

- id: visca_power_on
  label: CAM_Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params: []
  notes: "Power on (corresponds to camera standby in Telnet API)."

- id: visca_power_off
  label: CAM_Power Off
  kind: action
  command: "8x 01 04 00 03 FF"
  params: []
  notes: "Power off."

- id: visca_tally_on
  label: CAM_Tally On
  kind: action
  command: "8x 01 7E 01 0A 00 02 FF"
  params: []

- id: visca_tally_off
  label: CAM_Tally Off
  kind: action
  command: "8x 01 7E 01 0A 00 03 FF"
  params: []

- id: visca_nr
  label: CAM_NR
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: p
      type: string
      description: "Noise reduction level 0 (off) to 5."

- id: visca_mute_on
  label: CAM_Mute On
  kind: action
  command: "8x 01 04 75 02 FF"
  params: []

- id: visca_mute_off
  label: CAM_Mute Off
  kind: action
  command: "8x 01 04 75 03 FF"
  params: []

- id: visca_mute_toggle
  label: CAM_Mute Toggle
  kind: action
  command: "8x 01 04 75 10 FF"
  params: []

# ----------------------------- RS-232 INQUIRY (query) -----------------------

- id: visca_zoom_pos_inq
  label: CAM_ZoomPosInq
  kind: query
  command: "8x 09 04 47 FF"
  params: []
  notes: "Response: y0 50 0p 0q 0r 0s FF (pqrs = zoom position)."

- id: visca_focus_pos_inq
  label: CAM_FocusPosInq
  kind: query
  command: "8x 09 04 48 FF"
  params: []
  notes: "Response: y0 50 0p 0q 0r 0s FF (pqrs = focus position)."

- id: visca_focus_mode_inq
  label: CAM_FocusModeInq
  kind: query
  command: "8x 09 04 38 FF"
  params: []
  notes: "Response: y0 50 02 FF (auto) / y0 50 03 FF (manual)."

- id: visca_pantilt_pos_inq
  label: Pan-TiltPosInq
  kind: query
  command: "8x 09 06 12 FF"
  params: []
  notes: "Response: y0 50 0w 0w 0w 0w 0z 0z 0z 0z FF (wwww=pan, zzzz=tilt)."

- id: visca_memory_inq
  label: CAM_MemoryInq
  kind: query
  command: "8x 09 04 3F FF"
  params: []
  notes: "Response: y0 50 pp FF (pp = last recalled preset 00h-0Fh)."

- id: visca_memory_status_inq
  label: CAM_MemoryStatusInq
  kind: query
  command: "8x 09 04 3F 0p FF"
  params:
    - name: p
      type: string
      description: "Preset number 00h-0Fh."
  notes: "Response: y0 50 0p 0q 0r 0s FF."

- id: visca_mem_save_inq
  label: CAM_MemSaveInq
  kind: query
  command: "8x 09 04 23 0X FF"
  params:
    - name: X
      type: string
      description: "Preset number 00h-0Fh."
  notes: "Response: y0 50 0p 0q 0r 0s FF (pqrs = data 0000h-FFFFh)."

- id: visca_ptz_preset_speed_inq
  label: CAM_PTZ_PresetSpeedInq
  kind: query
  command: "8x 09 7E 01 0B FF"
  params: []
  notes: "Response: y0 50 p q r FF (pan/tilt/zoom speeds)."

- id: visca_wb_mode_inq
  label: CAM_WBModeInq
  kind: query
  command: "8x 09 04 35 FF"
  params: []
  notes: "Response: y0 50 00 FF (auto) / y0 50 05 FF (manual)."

- id: visca_rgain_inq
  label: CAM_RGainInq
  kind: query
  command: "8x 09 04 43 FF"
  params: []
  notes: "Response: y0 50 00 00 0p 0q FF (pq = red gain)."

- id: visca_bgain_inq
  label: CAM_BGainInq
  kind: query
  command: "8x 09 04 44 FF"
  params: []
  notes: "Response: y0 50 00 00 0p 0q FF (pq = blue gain)."

- id: visca_ae_mode_inq
  label: CAM_AEModeInq
  kind: query
  command: "8x 09 04 39 FF"
  params: []
  notes: "Response: y0 50 00 FF (auto) / y0 50 03 FF (manual)."

- id: visca_shutter_pos_inq
  label: CAM_ShutterPosInq
  kind: query
  command: "8x 09 04 4A FF"
  params: []
  notes: "Response: y0 50 00 00 0p 0q FF (pq = shutter position)."

- id: visca_iris_pos_inq
  label: CAM_IrisPosInq
  kind: query
  command: "8x 09 04 4B FF"
  params: []
  notes: "Response: y0 50 00 00 0p 0q FF (pq = iris position)."

- id: visca_gain_pos_inq
  label: CAM_GainPosInq
  kind: query
  command: "8x 09 04 4C FF"
  params: []
  notes: "Response: y0 50 00 00 0p 0q FF (pq = gain position)."

- id: visca_wd_mode_inq
  label: CAM_WDModeInq
  kind: query
  command: "8x 09 04 3D FF"
  params: []
  notes: "Response: y0 50 02 FF (on) / y0 50 03 FF (off)."

- id: visca_backlight_mode_inq
  label: CAM_BackLightModeInq
  kind: query
  command: "8x 09 04 33 FF"
  params: []
  notes: "Response: y0 50 02 FF (on) / y0 50 03 FF (off)."

- id: visca_aperture_inq
  label: CAM_ApertureInq
  kind: query
  command: "8x 09 04 42 FF"
  params: []
  notes: "Response: y0 50 00 00 0p 0q FF (pq = aperture gain)."

- id: visca_chroma_inq
  label: CAM_ChromaInq
  kind: query
  command: "8x 09 7E 55 FF"
  params: []
  notes: "Response: y0 50 05 00 00 00 0p FF (p = 0-Eh)."

- id: visca_gamma_offset_inq
  label: CAM_GammaOffsetInq
  kind: query
  command: "8x 09 04 1E FF"
  params: []
  notes: "Response: y0 50 00 00 00 0s 0t 0u FF."

- id: visca_power_inq
  label: CAM_PowerInq
  kind: query
  command: "8x 09 04 00 FF"
  params: []
  notes: "Response: y0 50 02 FF (on) / y0 50 03 FF (off/standby)."

- id: visca_tally_inq
  label: CAM_TallyInq
  kind: query
  command: "8x 09 7E 01 0A FF"
  params: []
  notes: "Response: y0 50 02 FF (on) / y0 50 03 FF (off)."

- id: visca_nr_inq
  label: CAM_NRInq
  kind: query
  command: "8x 09 04 53 FF"
  params: []
  notes: "Response: y0 50 0p FF (noise reduction 00h-05h)."

- id: visca_mute_mode_inq
  label: CAM_MuteModeInq
  kind: query
  command: "8x 09 04 75 FF"
  params: []
  notes: "Response: y0 50 02 FF (on) / y0 50 03 FF (off)."

- id: visca_ip_address_inq
  label: IPAddressInq
  kind: query
  command: "8x 09 08 4E 00 00 FF"
  params: []
  notes: "Response: 90 50 49 50 00 00 00 0p... FF (pppqqqrrrsss = IP address)."

- id: visca_model_inq
  label: Vaddio_ModelInq
  kind: query
  command: "8x 09 08 0e FF"
  params: []
  notes: "Response: y0 50 05 08 00 00 00 FF (ConferenceSHOT 10)."
```

## Feedbacks
```yaml
# Observable state values returned by query/get commands.
- id: power_state
  type: enum
  values: [on, off]
  source: [telnet_camera_standby, visca_power_inq]

- id: video_mute_state
  type: enum
  values: [on, off]
  source: [telnet_video_mute, visca_mute_mode_inq]

- id: focus_mode
  type: enum
  values: [auto, manual]
  source: [telnet_camera_focus, visca_focus_mode_inq]

- id: white_balance_mode
  type: enum
  values: [auto, manual]
  source: [visca_wb_mode_inq]

- id: ae_mode
  type: enum
  values: [auto, manual]
  source: [visca_ae_mode_inq]

- id: led_state
  type: enum
  values: [on, off]
  source: [telnet_camera_led]

- id: pan_position
  type: float
  source: [telnet_camera_pan, visca_pantilt_pos_inq]

- id: tilt_position
  type: float
  source: [telnet_camera_tilt, visca_pantilt_pos_inq]

- id: zoom_position
  type: float
  source: [telnet_camera_zoom, visca_zoom_pos_inq]

- id: firmware_version
  type: string
  source: [telnet_version]
```

## Variables
```yaml
# Settable continuous parameters (CCU). These mirror telnet_camera_ccu_set /
# VISCA direct commands; listed here as named settable variables.
# UNRESOLVED: full enumeration of per-CCU-variable ranges is captured in the
# camera_ccu_set action params; not duplicated here to avoid drift.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications / async events.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety interlocks, power-on sequencing,
# or confirmation procedures for control commands. camera recalibrate (motor
# recalibration) and system factory-reset / system reboot are maintenance
# operations but carry no documented confirmation requirement.
```

## Notes
- Two independent control APIs exist: Telnet (TCP/23, text) and RS-232 (binary VISCA-like). They are NOT command-compatible; many operations have a counterpart in both APIs (e.g. zoom, focus, power/standby, mute) but the payload formats differ entirely.
- Telnet is **disabled by default** in firmware released after mid-December 2019 and must be enabled on the web UI Security page. HTTP web access is also disabled by default.
- Telnet requires admin login; there is no default admin password (operator-set).
- Default IP when no DHCP: 169.254.1.1.
- RS-232 RJ-45 connector (blue): Pin 6 = GND, Pin 7 = RXD, Pin 8 = TXD; Pins 1-5 unused.
- RS-232 baud rate is soft-DIP-switch selectable (9600 default or 38400); must match controller.
- The `>` character is the Telnet command prompt. `CTRL-5` clears the serial buffer. `?` lists available commands/subcommands/parameters.
- VISCA `8x` byte: low nibble = camera address (default 1). Response prefix `y0` where y = address + 8.
- Status indicator light colors: blue=active, purple=standby/booting, yellow=firmware update, blinking blue=USB disconnected, blinking red=video mute on, blinking yellow=motor out of calibration.
- Shutter/Iris/Gain value lookup tables (CAM_Shutter 0x00-0x15, CAM_Iris 0x00-0x11, CAM_Gain 0x01-0x0F + gain limit 0x04-0x0F) are documented in the source but not enumerated as separate actions; they are parameter ranges of the Direct commands.

<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: "streaming ip enable" Telnet command has no synopsis/payload in source. -->
<!-- UNRESOLVED: exact RS-232 framing (start bits) and cable pin-out beyond RXD/TXD/GND not fully specified for control. -->
<!-- UNRESOLVED: no auth model documented for RS-232 (physical port assumed). -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - legrandav.com
  - manualslib.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v134260596/Resources/Vaddio/Cameras/Operation/411-0002-30_Rev_E_ConferenceSHOT_10_Complete_Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/vaddio_ConferenceSHOT_AV_Complete_Manual.pdf"
  - "https://www.legrandav.com/-/media/files/vaddio/literature/170001b-conferenceshot-av.pdf?sc_lang=en"
  - https://www.manualslib.com/products/Vaddio-Conferenceshot-10-8656260.html
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/vaddio-ConferenceSHOT-10-AdminGuide.pdf"
retrieved_at: 2026-07-24T19:19:50.612Z
last_checked_at: 2026-08-05T08:50:04.940Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:50:04.940Z
matched_actions: 136
action_count: 136
confidence: medium
summary: "All 136 spec actions match source verbatim; transport (port 23, baud 9600, admin auth) verified; spec covers the full VISCA+Telnet command set documented in source. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "streaming ip enable is listed in the Telnet command index but no synopsis/payload is given in the source."
- "HTTP web admin exists (disabled by default) but is a configuration UI, not a device-control protocol; not modelled here."
- "default admin/user passwords are deliberately unset; telnet auth requires an operator-set admin password."
- "start bits = 1 is stated but not modelled as a field here"
- "\"streaming ip enable\" appears in the Telnet command index but the"
- "full enumeration of per-CCU-variable ranges is captured in the"
- "source documents no unsolicited notifications / async events."
- "source documents no explicit multi-step macro sequences."
- "source contains no explicit safety interlocks, power-on sequencing,"
- "firmware version compatibility ranges not stated."
- "\"streaming ip enable\" Telnet command has no synopsis/payload in source."
- "exact RS-232 framing (start bits) and cable pin-out beyond RXD/TXD/GND not fully specified for control."
- "no auth model documented for RS-232 (physical port assumed)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
