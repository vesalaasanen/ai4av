---
spec_id: admin/vaddio-roboshot-xxe-hdmi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio RoboSHOT xxE HDMI Control Spec"
manufacturer: Vaddio
model_family: "RoboSHOT 12E HDMI"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "RoboSHOT 12E HDMI"
    - "RoboSHOT 30E HDMI"
    - "RoboSHOT 12 HDMI"
    - "RoboSHOT 30 HDMI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
source_urls:
  - https://www.fullcompass.com/common/files/36420-RoboSHOTHDMICompleteManual.pdf
retrieved_at: 2026-07-24T19:24:38.674Z
last_checked_at: 2026-08-05T08:50:18.885Z
generated_at: 2026-08-05T08:50:18.885Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Telnet administrator credentials/token format not stated in source. Firmware version compatibility ranges not stated."
  - "administrator credentials/token format not stated in source"
  - "no unsolicited notification mechanism documented in source. The camera"
  - "no multi-step command sequences explicitly documented in source."
  - "no formal power-on sequencing requirements or interlock procedures stated."
  - "Telnet administrator credentials/token format not stated. Firmware version compatibility ranges not stated. RTSP port number default not stated numerically. Exact pan/tilt mechanical travel limits vary slightly per unit."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:50:18.885Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions (28 Telnet + 26 RS-232 + 25 inquiries) match source verbatim; transport params all sourced. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Vaddio RoboSHOT xxE HDMI Control Spec

## Summary
The Vaddio RoboSHOT xxE HDMI is a family of PTZ conferencing cameras (RoboSHOT 12E/30E HDMI and older RoboSHOT 12/30 HDMI variants) with HDMI video output. This spec covers the two control interfaces documented in the source: an RS-232 serial port (RJ-45) using a modified Sony VISCA hex command set, and a Telnet command-line API over TCP (port 23) that requires an administrator login.

<!-- UNRESOLVED: Telnet administrator credentials/token format not stated in source. Firmware version compatibility ranges not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: "Telnet port 23 is used"
serial:
  baud_rate: 9600  # stated default; 38400 optionally selectable (DIP/soft switch or web UI)
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: none  # stated
auth:
  type: password  # stated: "Telnet sessions require the administrator account login" (applies to TCP/Telnet only; RS-232 has no auth)
  # UNRESOLVED: administrator credentials/token format not stated in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: CAM_Power On/Off (RS-232) and camera standby on/off/toggle (Telnet) present
  - queryable  # inferred: extensive inquiry commands and "* get" query operations present
  - levelable  # inferred: zoom/focus/gain/iris/chroma/detail/gamma level control present
```

## Actions
```yaml
# Telnet Command API (port 23). Command prompt is ">". OK is the standard ack.
# "?" as a parameter lists valid subcommands. CTRL-5 clears the serial buffer.

- id: camera_home
  label: Camera Home (Telnet)
  kind: action
  command: "camera home"
  params: []

- id: pan_move
  label: Pan Move (Telnet)
  kind: action
  command: "camera pan {left|right|stop} [<speed>]"
  params:
    - name: direction
      type: enum
      values: [left, right, stop]
    - name: speed
      type: integer
      description: "Pan speed 1-24, default 12"

- id: pan_set
  label: Pan Set Position (Telnet)
  kind: action
  command: "camera pan set <position>"
  params:
    - name: position
      type: float
      description: "Absolute pan in degrees, approx -150.00 (left) to 150.00 (right)"

- id: pan_get
  label: Pan Position Query (Telnet)
  kind: query
  command: "camera pan get"
  params: []

- id: tilt_move
  label: Tilt Move (Telnet)
  kind: action
  command: "camera tilt {up|down|stop} [<speed>]"
  params:
    - name: direction
      type: enum
      values: [up, down, stop]
    - name: speed
      type: integer
      description: "Tilt speed 1-20, default 10"

- id: tilt_set
  label: Tilt Set Position (Telnet)
  kind: action
  command: "camera tilt set <position>"
  params:
    - name: position
      type: float
      description: "Absolute tilt in degrees, approx -30.00 (down) to 90.00 (up); inverted: -90 to 30"

- id: tilt_get
  label: Tilt Position Query (Telnet)
  kind: query
  command: "camera tilt get"
  params: []

- id: zoom_move
  label: Zoom Move (Telnet)
  kind: action
  command: "camera zoom {in|out|stop} [<speed>]"
  params:
    - name: direction
      type: enum
      values: [in, out, stop]
    - name: speed
      type: integer
      description: "Zoom speed 1-7, default 3"

- id: zoom_set
  label: Zoom Set Level (Telnet)
  kind: action
  command: "camera zoom set <level>"
  params:
    - name: level
      type: float
      description: "Zoom level; 1.00 to 12.00 for 12x camera"

- id: zoom_get
  label: Zoom Level Query (Telnet)
  kind: query
  command: "camera zoom get"
  params: []

- id: focus_move
  label: Focus Move (Telnet)
  kind: action
  command: "camera focus {near|far|stop} [<speed>]"
  params:
    - name: direction
      type: enum
      values: [near, far, stop]
    - name: speed
      type: integer
      description: "Focus speed 1-8; near/far only valid in manual mode"

- id: focus_mode
  label: Focus Mode (Telnet)
  kind: action
  command: "camera focus mode {get|auto|manual}"
  params:
    - name: mode
      type: enum
      values: [get, auto, manual]

- id: preset_recall
  label: Preset Recall (Telnet)
  kind: action
  command: "camera preset recall <1-16>"
  params:
    - name: preset
      type: integer
      description: "Preset number 1-16"

- id: preset_store
  label: Preset Store (Telnet)
  kind: action
  command: "camera preset store <1-16> [tri-sync <1-24>] [save-ccu]"
  params:
    - name: preset
      type: integer
      description: "Preset number 1-16"
    - name: tri_sync_speed
      type: integer
      description: "Optional Tri-Synchronous Motion speed 1-24"
    - name: save_ccu
      type: boolean
      description: "Optional: save current CCU settings with preset"

- id: ccu_get
  label: CCU Get (Telnet)
  kind: query
  command: "camera ccu get <param>"
  params:
    - name: param
      type: enum
      values: [all, auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma, gamma, wide_dynamic_range]

- id: ccu_set
  label: CCU Set (Telnet)
  kind: action
  command: "camera ccu set <param> <value>"
  params:
    - name: param
      type: enum
      values: [auto_white_balance, red_gain, blue_gain, backlight_compensation, iris, auto_iris, gain, detail, chroma, gamma, wide_dynamic_range]
    - name: value
      type: string
      description: "Value/range per param: auto_white_balance {on|off}; red_gain 0-255; blue_gain 0-255; backlight_compensation {on|off}; iris 0-11; auto_iris {on|off}; gain 0-11; detail 0-15; chroma 0-14; gamma -64 to 64; wide_dynamic_range {on|off}"

- id: ccu_scene_recall
  label: CCU Scene Recall (Telnet)
  kind: action
  command: "camera ccu scene recall {factory <1-6> | custom <1-3>}"
  params:
    - name: type
      type: enum
      values: [factory, custom]
    - name: number
      type: integer
      description: "factory 1-6 or custom 1-3"

- id: ccu_scene_store
  label: CCU Scene Store (Telnet)
  kind: action
  command: "camera ccu scene store custom <1-3>"
  params:
    - name: number
      type: integer
      description: "custom scene 1-3"

- id: camera_led
  label: Indicator LED (Telnet)
  kind: action
  command: "camera led {get|off|on}"
  params:
    - name: state
      type: enum
      values: [get, off, on]

- id: camera_standby
  label: Camera Standby (Telnet)
  kind: action
  command: "camera standby {get|off|on|toggle}"
  params:
    - name: state
      type: enum
      values: [get, off, on, toggle]

- id: network_ping
  label: Network Ping (Telnet)
  kind: action
  command: "network ping [count <count>] [size <size>] <string>"
  params:
    - name: count
      type: integer
      description: "Number of ECHO_REQUEST packets, default 5"
    - name: size
      type: integer
      description: "Packet size in bytes, default 56"
    - name: host
      type: string
      description: "Hostname or IP address"

- id: network_settings_get
  label: Network Settings Query (Telnet)
  kind: query
  command: "network settings get"
  params: []

- id: system_reboot
  label: System Reboot (Telnet)
  kind: action
  command: "system reboot [<seconds>]"
  params:
    - name: seconds
      type: integer
      description: "Optional reboot delay in seconds"

- id: system_factory_reset
  label: System Factory Reset Status (Telnet)
  kind: action
  command: "system factory-reset {get|on|off}"
  params:
    - name: state
      type: enum
      values: [get, on, off]
  notes: "Does not initiate reset; factory reset occurs on next reboot when set to on."

- id: history
  label: Command History (Telnet)
  kind: action
  command: "history [<limit>]"
  params:
    - name: limit
      type: integer
      description: "Max number of commands to return/remember"

- id: version
  label: Firmware Version Query (Telnet)
  kind: query
  command: "version"
  params: []

- id: help
  label: Help (Telnet)
  kind: action
  command: "help"
  params: []

- id: exit
  label: Exit Session (Telnet)
  kind: action
  command: "exit"
  params: []

# ---- RS-232 Serial (modified VISCA) ----
# Hex payloads verbatim from source. "8x" = address byte (socket 1-2);
# lower nibble x = camera address. Variable nibbles shown as p,q,r,s,v,w,Y,Z,R.

- id: cam_zoom
  label: Zoom Control (RS-232 CAM_Zoom)
  kind: action
  command: "Stop: 8x 01 04 07 00 FF | Tele(std): 8x 01 04 07 02 FF | Wide(std): 8x 01 04 07 03 FF | Tele(var): 8x 01 04 07 2p FF | Wide(var): 8x 01 04 07 3p FF | Direct: 8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: p
      type: integer
      description: "Variable speed p=0(low) to 7(high); Direct pqrs=zoom position (0h-4000h for 12x, 0h-7AC0h for 30x)"

- id: cam_focus
  label: Focus Control (RS-232 CAM_Focus)
  kind: action
  command: "Stop: 8x 01 04 08 00 FF | Far(std): 8x 01 04 08 02 FF | Near(std): 8x 01 04 08 03 FF | Far(var): 8x 01 04 08 2p FF | Near(var): 8x 01 04 08 3p FF | Direct: 8x 01 04 48 0p 0q 0r 0s FF | One Push Trigger: 8x 01 04 18 01 FF | Near Limit: 8x 01 04 28 0p 0q 0r 0s FF"
  params:
    - name: p
      type: integer
      description: "Variable speed p=0(low)-7(high); Direct/NearLimit pqrs=focus position (1000h-F000h)"

- id: cam_focus_mode
  label: Focus Mode (RS-232 CAM_Focus Mode)
  kind: action
  command: "Auto: 8x 01 04 38 02 FF | Manual: 8x 01 04 38 03 FF | Auto/Manual toggle: 8x 01 04 08 10 FF"
  params: []

- id: pan_tilt_drive
  label: Pan-Tilt Drive (RS-232)
  kind: action
  command: "Up: 8x 01 06 01 vv ww 03 01 FF | Down: 8x 01 06 01 vv ww 03 02 FF | Left: 8x 01 06 01 vv ww 01 03 FF | Right: 8x 01 06 01 vv ww 02 03 FF | UpLeft: 8x 01 06 01 vv ww 01 01 FF | UpRight: 8x 01 06 01 vv ww 02 01 FF | DownLeft: 8x 01 06 01 vv ww 01 02 FF | DownRight: 8x 01 06 01 vv ww 02 02 FF | Stop: 8x 01 06 01 vv ww 03 03 FF | Home: 8x 01 06 04 FF"
  params:
    - name: vv
      type: integer
      description: "Pan speed 01h-18h"
    - name: ww
      type: integer
      description: "Tilt speed 01h-14h"

- id: pan_tilt_drive_absolute
  label: Pan-Tilt Absolute Position (RS-232)
  kind: action
  command: "8x 01 06 02 vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: vv
      type: integer
      description: "Pan speed 01h-18h"
    - name: ww
      type: integer
      description: "Tilt speed 01h-14h"
    - name: pan
      type: string
      description: "0Y0Y0Y0Y = pan position (90E2h-6BD8h)"
    - name: tilt
      type: string
      description: "0Z0Z0Z0Z = tilt position (EB99h-3D59h)"

- id: pan_tilt_zoom_drive
  label: Pan-Tilt-Zoom Drive (RS-232)
  kind: action
  command: "Up: 8x 01 06 0A vv ww rr 03 01 03 FF | Down: 8x 01 06 0A vv ww rr 03 02 03 FF | Left: 8x 01 06 0A vv ww rr 01 03 03 FF | Right: 8x 01 06 0A vv ww rr 02 03 03 FF | In: 8x 01 06 0A vv ww rr 03 03 01 FF | Out: 8x 01 06 0A vv ww rr 03 03 02 FF | Stop: 8x 01 06 0A vv ww rr 03 03 03 FF | Home: 8x 01 06 0C FF"
  params:
    - name: vv
      type: integer
      description: "Pan speed 01h-18h"
    - name: ww
      type: integer
      description: "Tilt speed 01h-14h"
    - name: rr
      type: integer
      description: "Zoom speed 00h-07h"

- id: pan_tilt_zoom_absolute
  label: Pan-Tilt-Zoom Absolute Position (RS-232)
  kind: action
  command: "8x 01 06 0B vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z 0R 0R 0R 0R FF"
  params:
    - name: vv
      type: integer
      description: "Pan speed 01h-18h"
    - name: ww
      type: integer
      description: "Tilt speed 01h-14h"
    - name: pan
      type: string
      description: "0Y0Y0Y0Y = pan position (90E2h-6BD8h)"
    - name: tilt
      type: string
      description: "0Z0Z0Z0Z = tilt position (EB99h-3D59h)"
    - name: zoom
      type: string
      description: "0R0R0R0R = zoom position (0h-4000h for 12x, 0h-7AC0h for 30x)"

- id: cam_memory
  label: Preset Memory (RS-232 CAM_Memory)
  kind: action
  command: "Reset: 8x 01 04 3F 00 0p FF | Set standard: 8x 01 04 3F 01 0p FF | Set standard w/ scene: 8x 01 04 3F 21 0p FF | Set Tri-sync: 8x 01 04 3F 11 0p 0q 0r FF | Set Tri-sync w/ scene: 8x 01 04 3F 31 0p 0q 0r FF | Recall: 8x 01 04 3F 02 0p FF"
  params:
    - name: p
      type: integer
      description: "Preset number 0h-0Fh"
    - name: qr
      type: integer
      description: "Tri-sync speed 01h-18h (q=high nibble, r=low nibble)"

- id: cam_ptz_preset_speed
  label: PTZ Preset Speed (RS-232 CAM_PTZ_PresetSpeed)
  kind: action
  command: "8x 01 7e 01 0b pp qq rr FF"
  params:
    - name: pp
      type: integer
      description: "Pan speed 01h-18h"
    - name: qq
      type: integer
      description: "Tilt speed 01h-14h"
    - name: rr
      type: integer
      description: "Zoom speed 0h-07h"

- id: cam_wb
  label: White Balance (RS-232 CAM_WB)
  kind: action
  command: "Auto: 8x 01 04 35 00 FF | Manual: 8x 01 04 35 05 FF"
  params: []

- id: cam_rgain
  label: Red Gain (RS-232 CAM_RGain)
  kind: action
  command: "Reset: 8x 01 04 03 00 FF | Up: 8x 01 04 03 02 FF | Down: 8x 01 04 03 03 FF | Direct: 8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Red gain 00h-FFh"

- id: cam_bgain
  label: Blue Gain (RS-232 CAM_BGain)
  kind: action
  command: "Reset: 8x 01 04 04 00 FF | Up: 8x 01 04 04 02 FF | Down: 8x 01 04 04 03 FF | Direct: 8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Blue gain 00h-FFh"

- id: cam_ae
  label: Auto Exposure (RS-232 CAM_AE)
  kind: action
  command: "Auto: 8x 01 04 39 00 FF | Manual: 8x 01 04 39 03 FF"
  params: []

- id: cam_shutter
  label: Shutter (RS-232 CAM_Shutter)
  kind: action
  command: "Reset: 8x 01 04 0A 00 FF | Up: 8x 01 04 0A 02 FF | Down: 8x 01 04 0A 03FF | Direct: 8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Shutter position 00h-15h (see Shutter Speed Values table)"

- id: cam_iris
  label: Iris (RS-232 CAM_Iris)
  kind: action
  command: "Reset: 8x 01 04 0B 00 FF | Up: 8x 01 04 0B 02 FF | Down: 8x 01 04 0B 03 FF | Direct: 8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Iris position (0h, 05h-11h; see Iris Values table)"

- id: cam_gain
  label: Gain (RS-232 CAM_Gain)
  kind: action
  command: "Reset: 8x 01 04 0C 00 FF | Up: 8x 01 04 0C 02 FF | Down: 8x 01 04 0C 03 FF | Direct: 8x 01 04 4C 00 00 0p 0q FF | +Gain Limit: 8x 01 04 2C 0p FF"
  params:
    - name: pq
      type: integer
      description: "Gain position 01h-0Fh; Gain Limit p=04h-0Fh"

- id: cam_backlight
  label: Backlight Compensation (RS-232 CAM_BackLight)
  kind: action
  command: "On: 8x 01 04 33 02 FF | Off: 8x 01 04 33 03 FF"
  params: []

- id: cam_wd
  label: Wide Dynamic Range (RS-232 CAM_WD)
  kind: action
  command: "On: 8x 01 04 3D 02 FF | Off: 8x 01 04 3D 03 FF"
  params: []
  notes: "May be unavailable on some cameras."

- id: cam_aperture
  label: Aperture / Detail (RS-232 CAM_Aperture)
  kind: action
  command: "Reset: 8x 01 04 02 00 FF | Up: 8x 01 04 02 01 FF | Down: 8x 01 04 02 02 FF | Direct: 8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Aperture position 0h-0Fh"

- id: cam_chroma
  label: Chroma (RS-232 CAM_Chroma)
  kind: action
  command: "8x 01 7E 55 00 00 0p 0q FF"
  params:
    - name: pq
      type: integer
      description: "Chroma 00h-14h"

- id: cam_gamma_offset
  label: Gamma Offset (RS-232 CAM_GammaOffset)
  kind: action
  command: "8x 01 04 1E 00 00 00 0s 0t 0u FF"
  params:
    - name: s
      type: integer
      description: "Polarity offset (0=plus, 1=minus)"
    - name: tu
      type: integer
      description: "Offset; s=0: 00h-40h, s=1: 00h-10h"

- id: command_cancel
  label: Command Cancel (RS-232)
  kind: action
  command: "8x 2p FF"
  params:
    - name: p
      type: integer
      description: "Socket (1 or 2)"

- id: cam_power
  label: Power (RS-232 CAM_Power)
  kind: action
  command: "On: 8x 01 04 00 02 FF | Off: 8x 01 04 00 03 FF"
  params: []

- id: cam_tally
  label: Tally (RS-232 CAM_Tally)
  kind: action
  command: "On: 8x 01 7E 01 0A 00 02 FF | Off: 8x 01 7E 01 0A 00 03 FF"
  params: []

- id: cam_nr
  label: Noise Reduction (RS-232 CAM_NR)
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: p
      type: integer
      description: "Noise reduction level (0=off, 1-5)"

- id: cam_mute
  label: Video Mute (RS-232 CAM_Mute)
  kind: action
  command: "On: 8x 01 04 75 02 FF | Off: 8x 01 04 75 03 FF | Toggle: 8x 01 04 75 10 FF"
  params: []

# ---- RS-232 Inquiry Commands (kind: query) ----

- id: pan_tilt_pos_inq
  label: Pan-Tilt Position Inquiry (RS-232)
  kind: query
  command: "8x 09 06 12 FF"
  params: []
  response: "y0 50 0w 0w 0w 0w 0z 0z 0z 0z FF (wwww=pan, zzzz=tilt)"

- id: cam_zoom_pos_inq
  label: Zoom Position Inquiry (RS-232)
  kind: query
  command: "8x 09 04 47 FF"
  params: []
  response: "y0 50 0p 0q 0r 0s FF (pqrs=zoom position)"

- id: cam_focus_pos_inq
  label: Focus Position Inquiry (RS-232)
  kind: query
  command: "8x 09 04 48 FF"
  params: []
  response: "y0 50 0p 0q 0r 0s FF (pqrs=focus position)"

- id: cam_focus_mode_inq
  label: Focus Mode Inquiry (RS-232)
  kind: query
  command: "8x 09 04 38 FF"
  params: []
  response: "y0 50 02 FF (auto) | y0 50 03 FF (manual)"

- id: cam_memory_inq
  label: Preset Memory Inquiry (RS-232)
  kind: query
  command: "8x 09 04 3F FF"
  params: []
  response: "y0 50 pp FF (pp=last recalled preset 00h-0Fh)"

- id: cam_memory_status_inq
  label: Preset Memory Status Inquiry (RS-232)
  kind: query
  command: "8x 09 04 3F 0p FF"
  params:
    - name: p
      type: integer
      description: "Preset number 00h-0Fh"
  response: "y0 50 0p 0q 0r 0s FF (q: mode 00-std/10-std+w ccu/01-trisync/11-trisync+w ccu; rs: speed 01h-18h)"

- id: cam_mem_save_inq
  label: Preset Memory Save Inquiry (RS-232)
  kind: query
  command: "8x 09 04 23 0X FF"
  params:
    - name: X
      type: integer
      description: "Preset number 00h-0Fh"
  response: "y0 50 0p 0q 0r 0s FF (pqrs=data 0000h-FFFFh)"

- id: cam_ptz_preset_speed_inq
  label: PTZ Preset Speed Inquiry (RS-232)
  kind: query
  command: "8x 09 7E 01 0B FF"
  params: []
  response: "y0 50 p q r FF (p=pan 01h-18h, q=tilt 01h-14h, r=zoom 0h-07h)"

- id: cam_wb_mode_inq
  label: White Balance Mode Inquiry (RS-232)
  kind: query
  command: "8x 09 04 35 FF"
  params: []
  response: "y0 50 00 FF (auto) | y0 50 05 FF (manual)"

- id: cam_rgain_inq
  label: Red Gain Inquiry (RS-232)
  kind: query
  command: "8x 09 04 43 FF"
  params: []
  response: "y0 50 00 00 0p 0q FF (pq=red gain)"

- id: cam_bgain_inq
  label: Blue Gain Inquiry (RS-232)
  kind: query
  command: "8x 09 04 44 FF"
  params: []
  response: "y0 50 00 00 0p 0q FF (pq=blue gain)"

- id: cam_ae_mode_inq
  label: Auto Exposure Mode Inquiry (RS-232)
  kind: query
  command: "8x 09 04 39 FF"
  params: []
  response: "y0 50 00 FF (auto) | y0 50 03 FF (manual)"

- id: cam_shutter_pos_inq
  label: Shutter Position Inquiry (RS-232)
  kind: query
  command: "8x 09 04 4A FF"
  params: []
  response: "y0 50 00 00 0p 0q FF (pq=shutter position)"

- id: cam_iris_pos_inq
  label: Iris Position Inquiry (RS-232)
  kind: query
  command: "8x 09 04 4B FF"
  params: []
  response: "y0 50 00 00 0p 0q FF (pq=iris position)"

- id: cam_gain_pos_inq
  label: Gain Position Inquiry (RS-232)
  kind: query
  command: "8x 09 04 4C FF"
  params: []
  response: "y0 50 00 00 0p 0q FF (pq=gain position)"

- id: cam_wd_mode_inq
  label: Wide Dynamic Range Mode Inquiry (RS-232)
  kind: query
  command: "8x 09 04 3D FF"
  params: []
  response: "y0 50 02 FF (on) | y0 50 03 FF (off)"

- id: cam_backlight_mode_inq
  label: Backlight Mode Inquiry (RS-232)
  kind: query
  command: "8x 09 04 33 FF"
  params: []
  response: "y0 50 02 FF (on) | y0 50 03 FF (off)"

- id: cam_aperture_inq
  label: Aperture Inquiry (RS-232)
  kind: query
  command: "8x 09 04 42 FF"
  params: []
  response: "y0 50 00 00 0p 0q FF (pq=aperture gain)"

- id: cam_chroma_inq
  label: Chroma Inquiry (RS-232)
  kind: query
  command: "8x 09 7E 55 FF"
  params: []
  response: "y0 50 05 00 00 00 0p FF (p: 0-Eh)"

- id: cam_gamma_offset_inq
  label: Gamma Offset Inquiry (RS-232)
  kind: query
  command: "8x 09 04 1E FF"
  params: []
  response: "y0 50 00 00 00 0s 0t 0u FF (s=polarity 0=plus/1=minus; tu=offset)"

- id: cam_power_inq
  label: Power Inquiry (RS-232)
  kind: query
  command: "8x 09 04 00 FF"
  params: []
  response: "y0 50 02 FF (on) | y0 50 03 FF (off/standby)"

- id: cam_tally_inq
  label: Tally Inquiry (RS-232)
  kind: query
  command: "8x 09 7E 01 0A FF"
  params: []
  response: "y0 50 02 FF (on) | y0 50 03 FF (off)"

- id: cam_nr_inq
  label: Noise Reduction Inquiry (RS-232)
  kind: query
  command: "8x 09 04 53 FF"
  params: []
  response: "y0 50 0p FF (noise reduction 00h-05h)"

- id: cam_mute_mode_inq
  label: Video Mute Inquiry (RS-232)
  kind: query
  command: "8x 09 04 75 FF"
  params: []
  response: "y0 50 02 FF (on) | y0 50 03 FF (off)"

- id: vaddio_model_inq
  label: Model Inquiry (RS-232)
  kind: query
  command: "8x 09 08 0e FF"
  params: []
  response: "y0 50 05 04 00 00 00 FF (RoboSHOT 12 HDMI) | y0 50 05 05 00 00 00 FF (RoboSHOT 30 HDMI)"
```

## Feedbacks
```yaml
- id: telnet_ok
  type: string
  values: ["OK"]
  description: "Standard Telnet command acknowledgement."

- id: pan_position
  type: number
  description: "Absolute pan position in degrees (~-150.00 to 150.00); returned by 'camera pan get'."

- id: tilt_position
  type: number
  description: "Absolute tilt position in degrees (~-30.00 to 90.00); returned by 'camera tilt get'."

- id: zoom_level
  type: number
  description: "Current zoom level (float); returned by 'camera zoom get'."

- id: focus_mode_state
  type: enum
  values: [auto, manual]
  description: "Returned by 'camera focus mode get'."

- id: standby_state
  type: enum
  values: [on, off]
  description: "Returned by 'camera standby get'."

- id: led_state
  type: enum
  values: [on, off]
  description: "Returned by 'camera led get'."

- id: factory_reset_status
  type: enum
  values: [on, off]
  description: "Software + hardware factory-reset status; returned by 'system factory-reset get'."

- id: ccu_settings
  type: object
  description: "CCU settings bundle returned by 'camera ccu get all' (auto_iris, auto_white_balance, backlight_compensation, blue_gain, chroma, detail, gain, iris, red_gain, wide_dynamic_range)."

- id: network_settings
  type: object
  description: "MAC/IP/netmask/gateway/VLAN returned by 'network settings get'."

- id: firmware_version
  type: object
  description: "Commit, Pan/Tilt Motor Version, Sensor Version, System Version returned by 'version'."
```

## Variables
```yaml
# CCU settable parameters (Telnet 'camera ccu set'); ranges per source:
- name: auto_white_balance
  type: enum
  values: [on, off]
- name: red_gain
  type: integer
  range: [0, 255]
- name: blue_gain
  type: integer
  range: [0, 255]
- name: backlight_compensation
  type: enum
  values: [on, off]
- name: iris
  type: integer
  range: [0, 11]
- name: auto_iris
  type: enum
  values: [on, off]
- name: gain
  type: integer
  range: [0, 11]
- name: detail
  type: integer
  range: [0, 15]
- name: chroma
  type: integer
  range: [0, 14]
- name: gamma
  type: integer
  range: [-64, 64]
- name: wide_dynamic_range
  type: enum
  values: [on, off]
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source. The camera
# responds to inquiries only; no push/event subscription described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences explicitly documented in source.
# Preset recall with Tri-Synchronous Motion and save-ccu is captured as a single
# parameterized action (preset_store / preset_recall), not a named macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes (not interlocks, but operational cautions):
# - "Connecting a cable to the wrong port or using the wrong pin-out can result in
#   equipment damage and void the warranty." (RS-232 pin-out section)
# - Local power jack: "Connect only the power supply shipped with the camera or
#   approved replacement 12 VDC, 3A power supply."
# - Factory reset (software) takes effect on next reboot, not immediately.
# UNRESOLVED: no formal power-on sequencing requirements or interlock procedures stated.
```

## Notes
- Two control surfaces share most functionality: the Telnet CLI (TCP/23) and the RS-232 modified-VISCA hex set. The source cross-references equivalents (e.g. CAM_Power ↔ camera standby; CAM_Zoom ↔ camera zoom).
- RS-232 connector is RJ-45 (blue): Pin 6=GND, Pin 7=RXD (from control source TXD), Pin 8=TXD (to control source RXD); Pins 1-5 not used.
- RS-232 config: 1 start bit, 1 stop bit, 8 data bits, no parity, no flow control. Baud selectable 9600 (default) or 38400 via DIP switch (older RoboSHOT) or web UI / soft switches (E-series).
- Older RoboSHOT 12/30 HDMI use physical DIP switches for IR frequency, image flip, baud rate, sRGB; E-series (12E/30E) set these in the web interface. RoboSHOT 12 HDMI has a Super Wide Mode (switch 5).
- Telnet: prompt is ">"; "?" lists subcommands; CTRL-5 clears the serial buffer.
- Status light colors: Blue=normal, Red=on-air tally (external serial signal), Blinking red=video muted (UC scheme), Purple=standby/booting, Yellow=firmware update.
- RTSP streaming available when IP streaming enabled; default port recommended. RTSP path/URL configurable via web UI.

<!-- UNRESOLVED: Telnet administrator credentials/token format not stated. Firmware version compatibility ranges not stated. RTSP port number default not stated numerically. Exact pan/tilt mechanical travel limits vary slightly per unit. -->
````

## Provenance

```yaml
source_domains:
  - fullcompass.com
source_urls:
  - https://www.fullcompass.com/common/files/36420-RoboSHOTHDMICompleteManual.pdf
retrieved_at: 2026-07-24T19:24:38.674Z
last_checked_at: 2026-08-05T08:50:18.885Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:50:18.885Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions (28 Telnet + 26 RS-232 + 25 inquiries) match source verbatim; transport params all sourced. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Telnet administrator credentials/token format not stated in source. Firmware version compatibility ranges not stated."
- "administrator credentials/token format not stated in source"
- "no unsolicited notification mechanism documented in source. The camera"
- "no multi-step command sequences explicitly documented in source."
- "no formal power-on sequencing requirements or interlock procedures stated."
- "Telnet administrator credentials/token format not stated. Firmware version compatibility ranges not stated. RTSP port number default not stated numerically. Exact pan/tilt mechanical travel limits vary slightly per unit."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
