---
spec_id: admin/vaddio-doccam-20-hdbt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio DocCAM 20 HDBT Control Spec"
manufacturer: Vaddio
model_family: "DocCAM 20 HDBT"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "DocCAM 20 HDBT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
  - manualslib.com
  - legrandav.com
  - fullcompass.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v132197248/Resources/Vaddio/Cameras/Operation/411-0017-30-rev-c-doccam-20-hdbt-integrators-complete-guide.pdf
  - https://res.cloudinary.com/avd/image/upload/v134308980/Resources/Vaddio/Cameras/Operation/411-0017-30-rev-c-doccam-20-hdbt-integrators-complete-guide.pdf
  - https://www.manualslib.com/manual/1374952/Vaddio-DocCAM-20-Hdbt.html
  - https://www.legrandav.com/products/cameras/document_camera/doccam-20-hdbt
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
retrieved_at: 2026-08-16T13:24:47.421Z
last_checked_at: 2026-08-19T10:02:19.166Z
generated_at: 2026-08-19T10:02:19.166Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not list a voltage/current draw spec; firmware version compatibility range not stated."
  - "data bits not explicitly stated in source (VISCA standard = 8)"
  - "parity not explicitly stated in source (VISCA standard = none)"
  - "stop bits not explicitly stated in source (VISCA standard = 1)"
  - "flow control not explicitly stated in source"
  - "source does not document any unsolicited notification/event packet format"
  - "source does not define any multi-step macro sequences"
  - "source mentions a laser pointer (CLASS II / IIIR safety typically applies) but"
  - "- Source does not state data bits, parity, stop bits, or flow control for the RS-232 port; values shown are VISCA convention, not source-derived."
verification:
  verdict: verified
  checked_at: 2026-08-19T10:02:19.166Z
  matched_actions: 162
  action_count: 162
  confidence: medium
  summary: "All 162 spec actions (Telnet CLI + VISCA + Inquiry) match literals in the source; transport port 23 and baud 9600 verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-09
---

# Vaddio DocCAM 20 HDBT Control Spec

## Summary
The Vaddio DocCAM 20 HDBT is a HDBT-output document camera supporting VISCA-compatible RS-232 serial control and a Telnet text-based command API on the Ethernet port (default TCP 23, admin login required). The spec covers the high-level Telnet CLI plus the low-level VISCA byte-level command set, as well as RTSP H.264 streaming settings.

<!-- UNRESOLVED: source does not list a voltage/current draw spec; firmware version compatibility range not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 9600  # source: DIP-switch selectable 9600 or 38400; 9600 listed first as default
  data_bits: 8  # UNRESOLVED: data bits not explicitly stated in source (VISCA standard = 8)
  parity: none  # UNRESOLVED: parity not explicitly stated in source (VISCA standard = none)
  stop_bits: 1  # UNRESOLVED: stop bits not explicitly stated in source (VISCA standard = 1)
  flow_control: none  # UNRESOLVED: flow control not explicitly stated in source
auth:
  type: basic  # source: "Telnet sessions require the administrator account login"
```

## Traits
```yaml
- powerable       # inferred from CAM_Power and camera standby commands
- routable        # inferred from CAM_Memory recall/store (preset routing)
- queryable       # inferred from CAM_*Inq and "get" variants throughout Telnet API
- levelable       # inferred from CCU iris/gain/direct level commands
```

## Actions
```yaml
# === Telnet CLI (text, sent over TCP port 23, CR-terminated) ===

- id: zoom_in
  label: Camera Zoom In
  kind: action
  command: "camera zoom in [speed]"  # speed optional, default 3; range 1-7
  params:
    - name: speed
      type: integer
      description: Optional zoom speed 1-7
      optional: true

- id: zoom_out
  label: Camera Zoom Out
  kind: action
  command: "camera zoom out [speed]"
  params:
    - name: speed
      type: integer
      description: Optional zoom speed 1-7
      optional: true

- id: zoom_stop
  label: Camera Zoom Stop
  kind: action
  command: "camera zoom stop"

- id: zoom_set
  label: Camera Zoom Set
  kind: action
  command: "camera zoom set {level}"
  params:
    - name: level
      type: integer
      description: Zoom level 1-20

- id: zoom_get
  label: Camera Zoom Get
  kind: query
  command: "camera zoom get"

- id: focus_near
  label: Camera Focus Near
  kind: action
  command: "camera focus near [speed]"  # manual mode only
  params:
    - name: speed
      type: integer
      description: Optional focus speed 1-8
      optional: true

- id: focus_far
  label: Camera Focus Far
  kind: action
  command: "camera focus far [speed]"  # manual mode only
  params:
    - name: speed
      type: integer
      description: Optional focus speed 1-8
      optional: true

- id: focus_stop
  label: Camera Focus Stop
  kind: action
  command: "camera focus stop"

- id: focus_mode_get
  label: Camera Focus Mode Get
  kind: query
  command: "camera focus mode get"

- id: focus_mode_auto
  label: Camera Focus Mode Auto
  kind: action
  command: "camera focus mode auto"

- id: focus_mode_manual
  label: Camera Focus Mode Manual
  kind: action
  command: "camera focus mode manual"

- id: preset_recall
  label: Camera Preset Recall
  kind: action
  command: "camera preset recall {preset}"
  params:
    - name: preset
      type: integer
      description: Preset number 1-16

- id: preset_store
  label: Camera Preset Store
  kind: action
  command: "camera preset store {preset} [save-ccu]"
  params:
    - name: preset
      type: integer
      description: Preset number 1-16
    - name: save_ccu
      type: flag
      description: Optional save-ccu flag to include CCU settings
      optional: true

- id: ccu_get
  label: Camera CCU Get
  kind: query
  command: "camera ccu get {param}"
  params:
    - name: param
      type: enum
      description: CCU parameter name (all, auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma, freeze)

- id: ccu_set
  label: Camera CCU Set
  kind: action
  command: "camera ccu set {param} {value}"
  params:
    - name: param
      type: enum
      description: CCU parameter (auto_white_balance, red_gain, blue_gain, backlight_compensation, iris, auto_iris, gain, detail, chroma, freeze)
    - name: value
      type: string
      description: Value per source (e.g. red_gain 0-255, iris 0-13, gain 1-11, detail 0-15, chroma 0-14)

- id: resolution_get
  label: Camera Resolution Get
  kind: query
  command: "camera resolution get"

- id: resolution_set
  label: Camera Resolution Set
  kind: action
  command: "camera resolution set {resolution}"
  params:
    - name: resolution
      type: enum
      description: Resolution string (1080p/60, 1080p/59.94, 1080p/50, 1080p/30, 1080p/25, 1080i/60, 1080i/59.94, 1080i/50, 720p/60, 720p/59.94, 720p/50)

- id: laser_get
  label: Camera Laser Get
  kind: query
  command: "camera laser get"

- id: laser_on
  label: Camera Laser On
  kind: action
  command: "camera laser on"

- id: laser_off
  label: Camera Laser Off
  kind: action
  command: "camera laser off"

- id: laser_toggle
  label: Camera Laser Toggle
  kind: action
  command: "camera laser toggle"

- id: laser_momentary
  label: Camera Laser Momentary
  kind: action
  command: "camera laser momentary"  # 5-second burst

- id: home
  label: Camera Home
  kind: action
  command: "camera home"

- id: standby_get
  label: Camera Standby Get
  kind: query
  command: "camera standby get"

- id: standby_off
  label: Camera Standby Off
  kind: action
  command: "camera standby off"

- id: standby_on
  label: Camera Standby On
  kind: action
  command: "camera standby on"

- id: standby_toggle
  label: Camera Standby Toggle
  kind: action
  command: "camera standby toggle"

- id: video_mute_get
  label: Video Mute Get
  kind: query
  command: "video mute get"

- id: video_mute_off
  label: Video Mute Off
  kind: action
  command: "video mute off"

- id: video_mute_on
  label: Video Mute On
  kind: action
  command: "video mute on"

- id: video_mute_toggle
  label: Video Mute Toggle
  kind: action
  command: "video mute toggle"

- id: streaming_settings_get
  label: Streaming Settings Get
  kind: query
  command: "streaming settings get"

- id: network_ping
  label: Network Ping
  kind: action
  command: "network ping [count {count}] [size {size}] {destination-ip}"
  params:
    - name: count
      type: integer
      description: Number of ECHO_REQUEST packets (default 5)
      optional: true
    - name: size
      type: integer
      description: Packet size in bytes (default 56)
      optional: true
    - name: destination_ip
      type: string
      description: IP address or hostname

- id: network_settings_get
  label: Network Settings Get
  kind: query
  command: "network settings get"

- id: system_reboot
  label: System Reboot
  kind: action
  command: "system reboot [{seconds}]"
  params:
    - name: seconds
      type: integer
      description: Optional delay in seconds
      optional: true

- id: system_factory_reset_get
  label: System Factory-Reset Get
  kind: query
  command: "system factory-reset get"

- id: system_factory_reset_on
  label: System Factory-Reset On
  kind: action
  command: "system factory-reset on"

- id: system_factory_reset_off
  label: System Factory-Reset Off
  kind: action
  command: "system factory-reset off"

- id: version
  label: Firmware Version
  kind: query
  command: "version"

- id: history
  label: Command History
  kind: query
  command: "history [{limit}]"
  params:
    - name: limit
      type: integer
      description: Optional max entries to display
      optional: true

- id: help
  label: CLI Help
  kind: query
  command: "help"

- id: exit
  label: Exit Telnet Session
  kind: action
  command: "exit"

# === RS-232 / VISCA hex packet commands ===

- id: rs232_zoom_stop
  label: RS-232 Zoom Stop (VISCA)
  kind: action
  command: "8x 01 04 07 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_zoom_tele_std
  label: RS-232 Zoom Tele Standard (VISCA)
  kind: action
  command: "8x 01 04 07 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_zoom_wide_std
  label: RS-232 Zoom Wide Standard (VISCA)
  kind: action
  command: "8x 01 04 07 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_zoom_tele_var
  label: RS-232 Zoom Tele Variable (VISCA)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Speed 0 (low) - 7 (high)

- id: rs232_zoom_wide_var
  label: RS-232 Zoom Wide Variable (VISCA)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Speed 0 (low) - 7 (high)

- id: rs232_zoom_direct
  label: RS-232 Zoom Direct (VISCA)
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pqrs
      type: integer
      description: Zoom position 0x0000 - 0x4000

- id: rs232_focus_stop
  label: RS-232 Focus Stop (VISCA)
  kind: action
  command: "8x 01 04 08 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_focus_far_std
  label: RS-232 Focus Far Standard (VISCA)
  kind: action
  command: "8x 01 04 08 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_focus_near_std
  label: RS-232 Focus Near Standard (VISCA)
  kind: action
  command: "8x 01 04 08 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_focus_far_var
  label: RS-232 Focus Far Variable (VISCA)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Speed 0-7

- id: rs232_focus_near_var
  label: RS-232 Focus Near Variable (VISCA)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Speed 0-7

- id: rs232_focus_direct
  label: RS-232 Focus Direct (VISCA)
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pqrs
      type: integer
      description: Focus position 0x1000 - 0xF000

- id: rs232_focus_auto
  label: RS-232 Auto Focus (VISCA)
  kind: action
  command: "8x 01 04 38 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_focus_manual
  label: RS-232 Manual Focus (VISCA)
  kind: action
  command: "8x 01 04 38 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_focus_auto_manual_toggle
  label: RS-232 Auto/Manual Focus Toggle (VISCA)
  kind: action
  command: "8x 01 04 08 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_focus_one_push_trigger
  label: RS-232 One-Push AF Trigger (VISCA)
  kind: action
  command: "8x 01 04 18 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_focus_near_limit
  label: RS-232 Near Focus Limit (VISCA)
  kind: action
  command: "8x 01 04 28 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pqrs
      type: integer
      description: Near focus limit value

- id: rs232_afmode_normal
  label: RS-232 AF Mode Normal (VISCA)
  kind: action
  command: "8x 01 04 57 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_afmode_interval
  label: RS-232 AF Mode Interval (VISCA)
  kind: action
  command: "8x 01 04 57 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_afmode_zoom_trigger
  label: RS-232 AF Mode Zoom Trigger (VISCA)
  kind: action
  command: "8x 01 04 57 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_afmode_activate_internal_time
  label: RS-232 AF Mode Activate Internal Time (VISCA)
  kind: action
  command: "8x 01 04 27 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pqrs
      type: integer
      description: Movement time / interval (per source: pqrs = movement time, rs = interval)

- id: rs232_memory_reset
  label: RS-232 Memory Reset (VISCA)
  kind: action
  command: "8x 01 04 3F 00 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Preset number 0x00 - 0x0F

- id: rs232_memory_set_standard
  label: RS-232 Memory Set Standard (VISCA)
  kind: action
  command: "8x 01 04 3F 01 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Preset number 0x00 - 0x0F

- id: rs232_memory_set_with_scene
  label: RS-232 Memory Set Standard with Scene (VISCA)
  kind: action
  command: "8x 01 04 3F 21 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Preset number 0x00 - 0x0F

- id: rs232_memory_recall
  label: RS-232 Memory Recall (VISCA)
  kind: action
  command: "8x 01 04 3F 02 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Preset number 0x00 - 0x0F

# White Balance
- id: rs232_wb_auto
  label: RS-232 WB Auto (VISCA)
  kind: action
  command: "8x 01 04 35 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_indoor
  label: RS-232 WB Indoor (VISCA)
  kind: action
  command: "8x 01 04 35 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_outdoor
  label: RS-232 WB Outdoor (VISCA)
  kind: action
  command: "8x 01 04 35 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_one_push
  label: RS-232 WB One-Push (VISCA)
  kind: action
  command: "8x 01 04 35 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_atw
  label: RS-232 WB ATW (VISCA)
  kind: action
  command: "8x 01 04 35 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_manual
  label: RS-232 WB Manual (VISCA)
  kind: action
  command: "8x 01 04 35 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_one_push_trigger
  label: RS-232 WB One-Push Trigger (VISCA)
  kind: action
  command: "8x 01 04 10 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_outdoor_auto
  label: RS-232 WB Outdoor Auto (VISCA)
  kind: action
  command: "8x 01 04 35 06 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_sodium_auto
  label: RS-232 WB Sodium Lamp Auto (VISCA)
  kind: action
  command: "8x 01 04 35 07 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_sodium
  label: RS-232 WB Sodium Lamp (VISCA)
  kind: action
  command: "8x 01 04 35 08 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_wb_sodium_outdoor_auto
  label: RS-232 WB Sodium Lamp Outdoor Auto (VISCA)
  kind: action
  command: "8x 01 04 35 09 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

# Red Gain
- id: rs232_rgain_reset
  label: RS-232 Red Gain Reset (VISCA)
  kind: action
  command: "8x 01 04 03 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_rgain_up
  label: RS-232 Red Gain Up (VISCA)
  kind: action
  command: "8x 01 04 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_rgain_down
  label: RS-232 Red Gain Down (VISCA)
  kind: action
  command: "8x 01 04 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_rgain_direct
  label: RS-232 Red Gain Direct (VISCA)
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Red gain 0x00 - 0xFF

# Blue Gain
- id: rs232_bgain_reset
  label: RS-232 Blue Gain Reset (VISCA)
  kind: action
  command: "8x 01 04 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_bgain_up
  label: RS-232 Blue Gain Up (VISCA)
  kind: action
  command: "8x 01 04 04 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_bgain_down
  label: RS-232 Blue Gain Down (VISCA)
  kind: action
  command: "8x 01 04 04 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_bgain_direct
  label: RS-232 Blue Gain Direct (VISCA)
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Blue gain 0x00 - 0xFF

# Auto Exposure Mode
- id: rs232_ae_full_auto
  label: RS-232 AE Full Auto (VISCA)
  kind: action
  command: "8x 01 04 39 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_ae_manual
  label: RS-232 AE Manual (VISCA)
  kind: action
  command: "8x 01 04 39 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_ae_shutter_priority
  label: RS-232 AE Shutter Priority (VISCA)
  kind: action
  command: "8x 01 04 39 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_ae_iris_priority
  label: RS-232 AE Iris Priority (VISCA)
  kind: action
  command: "8x 01 04 39 0B FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_ae_bright
  label: RS-232 AE Bright (VISCA)
  kind: action
  command: "8x 01 04 39 0D FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

# Exposure Compensation
- id: rs232_expcomp_on
  label: RS-232 Exposure Compensation On (VISCA)
  kind: action
  command: "8x 01 04 3E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_expcomp_off
  label: RS-232 Exposure Compensation Off (VISCA)
  kind: action
  command: "8x 01 04 3E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_expcomp_reset
  label: RS-232 Exposure Compensation Reset (VISCA)
  kind: action
  command: "8x 01 04 0E 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_expcomp_up
  label: RS-232 Exposure Compensation Up (VISCA)
  kind: action
  command: "8x 01 04 0E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_expcomp_down
  label: RS-232 Exposure Compensation Down (VISCA)
  kind: action
  command: "8x 01 04 0E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_expcomp_direct
  label: RS-232 Exposure Compensation Direct (VISCA)
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Exposure compensation position 0x00 - 0x0E (see CAM_ExpComp table)

# Shutter
- id: rs232_shutter_reset
  label: RS-232 Shutter Reset (VISCA)
  kind: action
  command: "8x 01 04 0A 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_shutter_up
  label: RS-232 Shutter Up (VISCA)
  kind: action
  command: "8x 01 04 0A 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_shutter_down
  label: RS-232 Shutter Down (VISCA)
  kind: action
  command: "8x 01 04 0A 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_shutter_direct
  label: RS-232 Shutter Direct (VISCA)
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Shutter position 0x00 - 0x15 (see CAM_Shutter table)

# Iris
- id: rs232_iris_reset
  label: RS-232 Iris Reset (VISCA)
  kind: action
  command: "8x 01 04 0B 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_iris_up
  label: RS-232 Iris Up (VISCA)
  kind: action
  command: "8x 01 04 0B 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_iris_down
  label: RS-232 Iris Down (VISCA)
  kind: action
  command: "8x 01 04 0B 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_iris_direct
  label: RS-232 Iris Direct (VISCA)
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Iris position 0x00, 0x05-0x11 (see CAM_Iris table)

# Gain
- id: rs232_gain_reset
  label: RS-232 Gain Reset (VISCA)
  kind: action
  command: "8x 01 04 0C 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_gain_up
  label: RS-232 Gain Up (VISCA)
  kind: action
  command: "8x 01 04 0C 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_gain_down
  label: RS-232 Gain Down (VISCA)
  kind: action
  command: "8x 01 04 0C 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_gain_direct
  label: RS-232 Gain Direct (VISCA)
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Gain position 0x01 - 0x0F; gain limit 0x04 - 0x0F (see CAM_Gain tables)

- id: rs232_gain_limit
  label: RS-232 Gain Limit (VISCA)
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Gain limit 0x04 - 0x0F

# Backlight
- id: rs232_backlight_on
  label: RS-232 Backlight On (VISCA)
  kind: action
  command: "8x 01 04 33 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_backlight_off
  label: RS-232 Backlight Off (VISCA)
  kind: action
  command: "8x 01 04 33 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

# Aperture
- id: rs232_aperture_reset
  label: RS-232 Aperture Reset (VISCA)
  kind: action
  command: "8x 01 04 02 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_aperture_up
  label: RS-232 Aperture Up (VISCA)
  kind: action
  command: "8x 01 04 02 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_aperture_down
  label: RS-232 Aperture Down (VISCA)
  kind: action
  command: "8x 01 04 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_aperture_direct
  label: RS-232 Aperture Direct (VISCA)
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Aperture position 0x00 - 0x0F

# Gamma
- id: rs232_gamma
  label: RS-232 Gamma (VISCA)
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Gamma setting 0 (standard) or 1 (straight)

# Chroma
- id: rs232_chroma_direct
  label: RS-232 Chroma Direct (VISCA)
  kind: action
  command: "8x 01 7E 55 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: pq
      type: integer
      description: Chroma value 0x00 - 0x14

# ICR (IR cut filter)
- id: rs232_icr_on
  label: RS-232 ICR On (VISCA)
  kind: action
  command: "8x 01 04 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_icr_off
  label: RS-232 ICR Off (VISCA)
  kind: action
  command: "8x 01 04 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

# Other VISCA commands
- id: rs232_address_set_broadcast
  label: RS-232 Address Set Broadcast (VISCA)
  kind: action
  command: "88 30 01 FF"

- id: rs232_if_clear_broadcast
  label: RS-232 IF Clear Broadcast (VISCA)
  kind: action
  command: "88 01 00 01 FF"

- id: rs232_command_cancel
  label: RS-232 Command Cancel (VISCA)
  kind: action
  command: "8x 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Socket number 1 or 2

- id: rs232_power_on
  label: RS-232 Power On (VISCA)
  kind: action
  command: "8x 01 04 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_power_off
  label: RS-232 Power Off (VISCA)
  kind: action
  command: "8x 01 04 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_tally_on
  label: RS-232 Tally On (VISCA)
  kind: action
  command: "8x 01 7E 01 0A 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_tally_off
  label: RS-232 Tally Off (VISCA)
  kind: action
  command: "8x 01 7E 01 0A 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_freeze_on
  label: RS-232 Freeze On (VISCA)
  kind: action
  command: "8x 01 04 62 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_freeze_off
  label: RS-232 Freeze Off (VISCA)
  kind: action
  command: "8x 01 04 62 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_mute_on
  label: RS-232 Video Mute On (VISCA)
  kind: action
  command: "8x 01 04 75 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_mute_off
  label: RS-232 Video Mute Off (VISCA)
  kind: action
  command: "8x 01 04 75 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_mute_toggle
  label: RS-232 Video Mute Toggle (VISCA)
  kind: action
  command: "8x 01 04 75 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7

- id: rs232_laser_on
  label: RS-232 Laser On (VISCA)
  kind: action
  command: "81 01 04 2F 02 FF"

- id: rs232_laser_off
  label: RS-232 Laser Off (VISCA)
  kind: action
  command: "81 01 04 2F 03 FF"

- id: rs232_laser_toggle
  label: RS-232 Laser Toggle (VISCA)
  kind: action
  command: "81 01 04 2F 01 FF"

# === VISCA Inquiry (query) commands ===

- id: rs232_zoom_pos_inq
  label: RS-232 Zoom Position Inquiry (VISCA)
  kind: query
  command: "8x 09 04 47 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 0p 0q 0r 0s FF"  # pqrs: zoom position

- id: rs232_focus_pos_inq
  label: RS-232 Focus Position Inquiry (VISCA)
  kind: query
  command: "8x 09 04 48 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 0p 0q 0r 0s FF"  # pqrs: focus position

- id: rs232_focus_mode_inq
  label: RS-232 Focus Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 38 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF | y0 50 03 FF"  # auto / manual

- id: rs232_afmode_inq
  label: RS-232 AF Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 57 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 FF | y0 50 01 FF | y0 50 02 FF"  # normal / interval / zoom trigger

- id: rs232_memory_inq
  label: RS-232 Memory Last Recall Inquiry (VISCA)
  kind: query
  command: "8x 09 04 3F FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 pp FF"  # pp: memory number recalled last

- id: rs232_memory_status_inq
  label: RS-232 Memory Status Inquiry (VISCA)
  kind: query
  command: "8x 09 04 3F 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: p
      type: integer
      description: Memory number
  response_template: "y0 50 0p 0q 0r 0s FF"  # p=memory, q=mode (00-std, 10-std/w ccu, 01-trisync, 11-trisync/w ccu), rs=speed 0x1-0x18 (1-24)

- id: rs232_memsave_inq
  label: RS-232 Memory Save Inquiry (VISCA)
  kind: query
  command: "8x 09 04 23 0X FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
    - name: X
      type: integer
      description: Address 0x00 - 0x07
  response_template: "y0 50 0p 0q 0r 0s FF"  # pqrs: 0x0000 - 0xFFFF data

- id: rs232_wb_mode_inq
  label: RS-232 WB Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 35 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 0m FF"  # m: 00=auto, 01=indoor, 02=outdoor, 03=one-push, 04=ATW, 05=manual, 06=outdoor auto, 07=sodium auto, 08=sodium, 09=sodium outdoor auto

- id: rs232_rgain_inq
  label: RS-232 Red Gain Inquiry (VISCA)
  kind: query
  command: "8x 09 04 43 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 00 0p 0q FF"  # pq: red gain

- id: rs232_bgain_inq
  label: RS-232 Blue Gain Inquiry (VISCA)
  kind: query
  command: "8x 09 04 44 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 00 0p 0q FF"  # pq: blue gain

- id: rs232_ae_mode_inq
  label: RS-232 AE Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 39 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 0m FF"  # m: 00=full auto, 03=manual, 0A=shutter priority, 0B=iris priority, 0D=bright

- id: rs232_expcomp_mode_inq
  label: RS-232 Exposure Compensation Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 3E FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF"  # on

- id: rs232_shutter_pos_inq
  label: RS-232 Shutter Position Inquiry (VISCA)
  kind: query
  command: "8x 09 04 4A FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 00 0p 0q FF"  # pq: shutter position

- id: rs232_iris_pos_inq
  label: RS-232 Iris Position Inquiry (VISCA)
  kind: query
  command: "8x 09 04 4B FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 00 0p 0q FF"  # pq: iris position

- id: rs232_gain_pos_inq
  label: RS-232 Gain Position Inquiry (VISCA)
  kind: query
  command: "8x 09 04 4C FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 00 0p 0q FF"  # pq: gain position

- id: rs232_backlight_mode_inq
  label: RS-232 Backlight Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 33 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF"  # on

- id: rs232_aperture_inq
  label: RS-232 Aperture Inquiry (VISCA)
  kind: query
  command: "8x 09 04 42 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 00 0p 0q FF"  # pq: aperture gain

- id: rs232_chroma_inq
  label: RS-232 Chroma Inquiry (VISCA)
  kind: query
  command: "8x 09 7E 55 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 05 00 00 00 0p FF"  # p: 0-0xE

- id: rs232_gamma_inq
  label: RS-232 Gamma Inquiry (VISCA)
  kind: query
  command: "8x 09 04 5B FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 0p FF"  # p: 00h or 01h

- id: rs232_icr_mode_inq
  label: RS-232 ICR Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF"  # on

- id: rs232_power_inq
  label: RS-232 Power Inquiry (VISCA)
  kind: query
  command: "8x 09 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF | y0 50 03 FF"  # on / off (standby)

- id: rs232_tally_inq
  label: RS-232 Tally Inquiry (VISCA)
  kind: query
  command: "8x 09 7E 01 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF"  # on

- id: rs232_resolution_inq
  label: RS-232 Resolution Inquiry (VISCA)
  kind: query
  command: "8x 09 06 23 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 0p 0q FF"  # pq: video resolution

- id: rs232_freeze_mode_inq
  label: RS-232 Freeze Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 62 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF"  # on

- id: rs232_mute_mode_inq
  label: RS-232 Video Mute Mode Inquiry (VISCA)
  kind: query
  command: "8x 09 04 75 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF"  # on

- id: rs232_version_inq
  label: RS-232 Version Inquiry (VISCA)
  kind: query
  command: "8x 09 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 00 10 mn pq 0E 0E 02 FF"  # mnpq: model code; DocCAM 20 HDBT = 050E

- id: rs232_laser_inq
  label: RS-232 Laser Inquiry (VISCA)
  kind: query
  command: "8x 09 04 2F FF"
  params:
    - name: x
      type: integer
      description: Camera address 1-7
  response_template: "y0 50 02 FF | y0 50 03 FF"  # on / off

# === RTSP / Streaming URL (informational; not a control command) ===
# Note: The streaming URL is configured via the web interface and queried via `streaming settings get`.
# RTSP port default is 554 (per the IP Port parameter); Vaddio "strongly recommends using the default RTSP port number."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  source: "CAM_PowerInq response (y0 50 02 = on, y0 50 03 = off/standby)"

- id: zoom_position
  type: integer
  source: "CAM_ZoomPosInq response pqrs"

- id: focus_position
  type: integer
  source: "CAM_FocusPosInq response pqrs"

- id: focus_mode
  type: enum
  values: [auto, manual]
  source: "CAM_FocusModeInq response"

- id: af_mode
  type: enum
  values: [normal, interval, zoom_trigger]
  source: "CAM_AFModeInq response"

- id: last_memory_recalled
  type: integer
  source: "CAM_MemoryInq response pp"

- id: white_balance_mode
  type: enum
  values: [auto, indoor, outdoor, one_push, atw, manual, outdoor_auto, sodium_auto, sodium, sodium_outdoor_auto]
  source: "CAM_WBModeInq response"

- id: red_gain
  type: integer
  source: "CAM_RGainInq response pq (0x00-0xFF)"

- id: blue_gain
  type: integer
  source: "CAM_BGainInq response pq (0x00-0xFF)"

- id: ae_mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority, bright]
  source: "CAM_AEModeInq response"

- id: exposure_compensation_on
  type: boolean
  source: "CAM_ExpCompModeInq response"

- id: shutter_position
  type: integer
  source: "CAM_ShutterPosInq response pq"

- id: iris_position
  type: integer
  source: "CAM_IrisPosInq response pq"

- id: gain_position
  type: integer
  source: "CAM_GainPosInq response pq"

- id: backlight_on
  type: boolean
  source: "CAM_BackLightModeInq response"

- id: aperture_position
  type: integer
  source: "CAM_ApertureInq response pq"

- id: chroma
  type: integer
  source: "CAM_ChromaInq response p (0-0xE)"

- id: gamma
  type: integer
  source: "CAM_GammaInq response p (0 or 1)"

- id: icr_on
  type: boolean
  source: "CAM_ICRModeInq response"

- id: tally_on
  type: boolean
  source: "CAM_TallyInq response"

- id: video_resolution
  type: string
  source: "CAM_ResolutionInq response pq"

- id: freeze_on
  type: boolean
  source: "CAM_FreezeModeInq response"

- id: video_mute_on
  type: boolean
  source: "CAM_MuteModeInq response"

- id: firmware_version
  type: string
  source: "version (Telnet) or CAM_VersionInq (mnpq = model code 050E for DocCAM 20 HDBT)"

- id: laser_on
  type: boolean
  source: "CAM_LaserInq response (or camera laser get)"

- id: streaming_settings
  type: object
  source: "streaming settings get returns IP_Custom_Frame_Rate, IP_Custom_Resolution, IP_Enabled, IP_Port (default 554), IP_Preset_Quality, IP_Preset_Resolution, IP_Protocol, IP_URL, IP_Video_Mode"

- id: network_settings
  type: object
  source: "network settings get returns eth0/WAN MAC, IP, Netmask, VLAN, Gateway"

- id: standby_state
  type: enum
  values: [on, off]
  source: "camera standby get"
```

## Variables
```yaml
# Per-command parametric ranges are encoded in the action params; no standalone settable
# variables are documented outside the action surface.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notification/event packet format
# from the device. Telnet responses are solicited; VISCA completion/acknowledge packets
# are referenced but not enumerated.
```

## Macros
```yaml
# UNRESOLVED: source does not define any multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - system_factory_reset_on   # factory reset on next reboot
  - system_reboot             # disrupts IP stream
interlocks: []
# UNRESOLVED: source mentions a laser pointer (CLASS II / IIIR safety typically applies) but
# does not explicitly state laser safety classification, interlock procedures, or warning text.
# "In most cases, Vaddio recommends leaving the status light on, to let people in the room
# know whether the camera is currently sending video" - privacy/awareness note.
```

## Notes
- Two parallel control surfaces: Telnet text API (TCP 23, admin login, CR-terminated ASCII following VT100 conventions with `ESC[J` suffix echo) and VISCA-style RS-232 hex packets.
- RTSP streaming is for output only; H.264 over RTSP, default port 554, configurable via web UI.
- DIP-switch configurable baud rate: 9600 or 38400 bps. Source lists 9600 first; treat 9600 as default unless DIP-switch indicates otherwise.
- VISCA camera address field `x` = camera address 1-7 (encoded in the high nibble of the first byte, e.g. `81` for address 1).
- Telnet `CTRL-5` clears the current serial buffer on the device.
- `system factory-reset on` does NOT trigger the reset immediately; the reset happens on the next reboot.
- Resolution changes interrupt the IP stream; consumer must reopen the media player.
- Auto white balance overrides red_gain/blue_gain manual settings when on; auto_iris disables manual iris and gain when on.
- IR Remote Commander can control up to 3 cameras in same room (frequency-selected via DIP switches 1+2); this spec does not cover IR protocol details.

<!-- UNRESOLVED:
- Source does not state data bits, parity, stop bits, or flow control for the RS-232 port; values shown are VISCA convention, not source-derived.
- Firmware version compatibility range / minimum supported firmware not stated.
- Power consumption, voltage, and current draw not stated.
- RTSP URL path portion is editable via web UI but exact default URL pattern beyond "vaddio-doccam-stream" not formally documented; the example in source is one possible name.
- Source mentions a "HDLink: TX4.6.1*0.01" / "PSoC Version: 1.2" / "Sensor Version: 06.00" line from `version` but does not describe what those sub-fields mean.
- VISCA completion (y0 50 ...) and error packet shapes are referenced implicitly via the Inquiry Response templates but no explicit completion/error table is given in the source excerpt.
-->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
  - manualslib.com
  - legrandav.com
  - fullcompass.com
source_urls:
  - https://res.cloudinary.com/avd/image/upload/v132197248/Resources/Vaddio/Cameras/Operation/411-0017-30-rev-c-doccam-20-hdbt-integrators-complete-guide.pdf
  - https://res.cloudinary.com/avd/image/upload/v134308980/Resources/Vaddio/Cameras/Operation/411-0017-30-rev-c-doccam-20-hdbt-integrators-complete-guide.pdf
  - https://www.manualslib.com/manual/1374952/Vaddio-DocCAM-20-Hdbt.html
  - https://www.legrandav.com/products/cameras/document_camera/doccam-20-hdbt
  - https://www.fullcompass.com/common/files/36364-RoboSHOTHDBTCompleteManual.pdf
retrieved_at: 2026-08-16T13:24:47.421Z
last_checked_at: 2026-08-19T10:02:19.166Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T10:02:19.166Z
matched_actions: 162
action_count: 162
confidence: medium
summary: "All 162 spec actions (Telnet CLI + VISCA + Inquiry) match literals in the source; transport port 23 and baud 9600 verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not list a voltage/current draw spec; firmware version compatibility range not stated."
- "data bits not explicitly stated in source (VISCA standard = 8)"
- "parity not explicitly stated in source (VISCA standard = none)"
- "stop bits not explicitly stated in source (VISCA standard = 1)"
- "flow control not explicitly stated in source"
- "source does not document any unsolicited notification/event packet format"
- "source does not define any multi-step macro sequences"
- "source mentions a laser pointer (CLASS II / IIIR safety typically applies) but"
- "- Source does not state data bits, parity, stop bits, or flow control for the RS-232 port; values shown are VISCA convention, not source-derived."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
