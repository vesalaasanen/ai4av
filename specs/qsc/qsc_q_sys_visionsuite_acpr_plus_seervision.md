---
spec_id: admin/qsc-q-sys-visionsuite-acpr-seervision
schema_version: ai4av-public-spec-v1
revision: 1
title: "QSC Q-SYS VisionSuite (ACPR + Seervision) Control Spec"
manufacturer: QSC
model_family: "Q-SYS VisionSuite Plugin (Seervision Control)"
aliases: []
compatible_with:
  manufacturers:
    - QSC
  models:
    - "Q-SYS VisionSuite Plugin (Seervision Control)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - help.qsys.com
source_urls:
  - https://help.qsys.com/Content/VisionSuite/seervision_control.htm
retrieved_at: 2026-07-16T04:03:08.126Z
last_checked_at: 2026-07-22T00:42:05.323Z
generated_at: 2026-07-22T00:42:05.323Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "underlying Seervision websocket API is not documented in source; only the Q-SYS plugin pin interface is described"
  - "compatible hardware accelerators (SVS4-2U, SVS1-2U, VSA-100) firmware version ranges not stated"
  - "no explicit multi-step sequences described in source beyond the"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "Seervision server websocket API (message format, authentication) not documented"
  - "ACPR plugin API and audio trigger protocol not documented"
  - "exact Mediacast Router integration protocol details not documented"
  - "compatible camera firmware versions not stated"
  - "hardware accelerator (VSA-100, SVS4, SVS1) management API not documented"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:42:05.323Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions match documented Q-SYS plugin controls; transport (TCP/HTTP on port 8123) verified; no extra source commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# QSC Q-SYS VisionSuite (ACPR + Seervision) Control Spec

## Summary

The Q-SYS VisionSuite Plugin provides AI-driven camera tracking and automated presenter routing within a Q-SYS system. It integrates Seervision AI processing (subject detection, tracking zones, exclusion zones) with ACPR (Automatic Camera Presenter Routing) audio-triggered switching. Control is exposed through Q-SYS plugin control pins; internally the plugin connects to Seervision server instances via websocket. This spec documents the plugin's control pin interface and the event/action automation model.

<!-- UNRESOLVED: underlying Seervision websocket API is not documented in source; only the Q-SYS plugin pin interface is described -->
<!-- UNRESOLVED: compatible hardware accelerators (SVS4-2U, SVS1-2U, VSA-100) firmware version ranges not stated -->

## Transport

```yaml
# This is a Q-SYS plugin component - control is via Q-SYS platform control pins.
# Internally the plugin connects to Seervision server instances over websocket.
# VSA-100 accelerators (Q-SYS OS) expose an HTTP configuration webpage at port 8123.
protocols:
  - tcp   # inferred: plugin connects to Seervision server via websocket over TCP
  - http  # VSA-100 configuration webpage (Q-SYS OS accelerators only)
addressing:
  # Seervision server websocket port: UNRESOLVED (not stated in source)
  # Server IP is user-configurable per camera in the plugin; instances at /1 or /2
  port: 8123  # VSA-100 VisionSuite configuration webpage (HTTP only - Peripheral Manager uses HTTPS)
auth:
  type: none  # inferred: no auth procedure in source for plugin control pins
```

## Traits

```yaml
# - powerable     # inferred: server reboot controls present
- queryable       # inferred: status, connection state, temperature queries present
- levelable       # inferred: auto-privacy delay, coordinates adjustable
```

## Actions

```yaml
# --- Tracking Camera Controls ---
- id: start_tracking
  label: Start Tracking
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Tracking camera index (1-based)
  notes: Immediately starts tracking without using a Container recall

- id: stop_tracking
  label: Stop Tracking
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Tracking camera index (1-based)
  notes: Immediately stops tracking without using a Container recall

- id: set_tracking_zone
  label: Set Tracking Zone
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Tracking camera index (1-based)
    - name: zone
      type: string
      description: Tracking zone to enable (only one at a time per camera)

- id: set_vip_id
  label: Set VIP ID
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Tracking camera index (1-based)
    - name: vip_id
      type: string
      description: ID of the subject to designate as VIP for tracking
  notes: Sets the VIP ID for the currently tracked subject

- id: enable_trigger_zone
  label: Enable Trigger Zone
  kind: action
  params:
    - name: zone_index
      type: integer
      description: Trigger zone index
    - name: enabled
      type: boolean
      description: Enable (true) or disable (false)

- id: enable_exclusion_zone
  label: Enable Exclusion Zone
  kind: action
  params:
    - name: zone_index
      type: integer
      description: Exclusion zone index
    - name: enabled
      type: boolean
      description: Enable (true) or disable (false)
  notes: Multiple exclusion zones can be enabled simultaneously per camera

- id: set_exclusion_zone_name
  label: Set Exclusion Zone Name
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: zone_index
      type: integer
      description: Exclusion zone index
    - name: name
      type: string
      description: Name for the exclusion zone

- id: manual_recall
  label: Manual Recall
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index for the event/action row
    - name: action_id
      type: string
      description: Container action ID to recall

- id: set_container
  label: Set Container
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: container_name
      type: string
      description: Container to recall (dynamically generated based on camera)

- id: set_trigger_zone_name
  label: Set Trigger Zone Name
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: zone_index
      type: integer
      description: Trigger zone index
    - name: name
      type: string
      description: Name for the trigger zone

- id: set_acpr_zone_enable
  label: Set ACPR Zone Enable/Disable
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: zone_index
      type: integer
      description: Trigger zone index
    - name: enabled
      type: string
      description: Enable or disable ACPR control for this trigger zone
  notes: Per-trigger-zone ACPR enable/disable control pin

- id: set_event_camera_number
  label: Set Event Camera Number
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: zone_index
      type: integer
      description: Trigger zone index
    - name: camera_number
      type: string
      description: Camera number assigned to the event/action row

- id: set_container_action_id
  label: Set Container Action ID
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: zone_index
      type: integer
      description: Trigger zone index
    - name: action_id
      type: string
      description: Container Action ID for the event/action row

- id: set_trigger_zone_container_name
  label: Set Trigger Zone Container Name
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: zone_index
      type: integer
      description: Trigger zone index
    - name: container_name
      type: string
      description: Container name for the event/action row

- id: set_video_auto_switch
  label: Set Video Auto Switch
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Enable automatic Seervision Source update on Container recall complete

- id: set_acpr_sv_control
  label: Set ACPR/SV Control
  kind: action
  params:
    - name: output_index
      type: integer
      description: Mediacast Router output index
    - name: mode
      type: string
      description: "ACPR or SV - determines whether ACPR or Seervision controls the Mediacast Router output"

- id: set_event_config
  label: Set Event Config
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: event_type
      type: string
      description: "Event type: Enter, Leave, or Fallback"
    - name: trigger_zone
      type: string
      description: Trigger zone assignment
    - name: trigger_on_person
      type: string
      description: "VIP or Any Person"
    - name: persons
      type: string
      description: "Person count trigger: 0, 1, 2+, or Any"
    - name: tracking_target
      type: string
      description: "Left, Middle, Right, Caused By, or Inside (native only)"

# --- Camera Setup Controls ---
- id: set_camera_selection
  label: Set Camera Selection
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: code_name
      type: string
      description: Code Name corresponding to the wired camera status component
  notes: Used to provide privacy compatibility and daily recalibration

- id: set_camera_streaming_mode
  label: Set Camera Streaming Mode
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Camera index
    - name: mode
      type: string
      description: Streaming mode for the camera (e.g. privacy mode, streaming mode, camera selection mode)

# --- Mediacast Router Controls ---
- id: set_privacy
  label: Set Privacy
  kind: action
  params:
    - name: output_index
      type: integer
      description: Mediacast Router output index
    - name: enabled
      type: boolean
      description: Enable or disable privacy for selected USB Video Bridge

- id: set_auto_privacy_delay
  label: Set Auto Privacy Delay
  kind: action
  params:
    - name: delay_seconds
      type: integer
      description: "Delay in seconds before invoking privacy (5-600)"

- id: set_write_protect
  label: Set Write Protect
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "Prevent ACPR/SV Control buttons from writing state to current Room Configuration"

- id: set_acpr_output_select
  label: Set ACPR Output Select Control
  kind: action
  params:
    - name: output_index
      type: integer
      description: Mediacast Router output index
    - name: enabled
      type: boolean
      description: "Enable (true=1) or disable (false=0) ACPR output select for the Mediacast Router output"

- id: set_mediacast_video_router
  label: Set Mediacast Video Router
  kind: action
  params:
    - name: router_name
      type: string
      description: Code Name of the Mediacast Video Router component to use
  notes: Only one Mediacast Router is allowed per Seervision plugin

# --- Camera Recalibration ---
- id: recalibrate_now
  label: Recalibrate Now
  kind: action
  params: []
  notes: Immediately recalibrates all Seervision and ACPR cameras

- id: set_recalibration_time
  label: Set Recalibration Time
  kind: action
  params:
    - name: time
      type: string
      description: Daily time for automatic recalibration

# --- Server Management ---
- id: reboot_server
  label: Reboot Server
  kind: action
  params: []
  notes: Immediately restarts the Seervision server

- id: set_reboot_schedule
  label: Set Reboot Schedule
  kind: action
  params:
    - name: day
      type: string
      description: "Day of week or All for daily"
    - name: time
      type: string
      description: Time for automatic reboot

- id: server_backup
  label: Server Backup
  kind: action
  params: []
  notes: Generates backup of all Seervision Instance settings (Containers, Trigger Zones, Thresholds, PTU Configuration, RTSP settings)

- id: server_restore
  label: Server Restore
  kind: action
  params:
    - name: file
      type: string
      description: Backup file selection from Core Manager

- id: discover_servers
  label: Discover Servers
  kind: action
  params: []
  notes: Uses mDNS to discover Seervision servers on the network

# --- Plugin Data ---
- id: plugin_database_backup
  label: Plugin Database Backup
  kind: action
  params: []
  notes: Generates JSON string of all plugin controls and configurations

- id: plugin_database_restore
  label: Plugin Database Restore
  kind: action
  params:
    - name: json_string
      type: string
      description: Plugin data JSON string to restore

# --- Room Configuration ---
- id: add_room_configuration
  label: Add Room Configuration
  kind: action
  params: []

- id: remove_room_configuration
  label: Remove Room Configuration
  kind: action
  params: []

- id: rename_room_configuration
  label: Rename Room Configuration
  kind: action
  params:
    - name: name
      type: string
      description: New name for the current room configuration

- id: clear_room_configuration
  label: Clear Room Configuration
  kind: action
  params: []
  notes: Resets or clears the current room configuration settings

- id: select_room_configuration
  label: Select Room Configuration
  kind: action
  params:
    - name: index
      type: integer
      description: Room configuration index

# --- Static Camera Position Containers ---
- id: save_position_container
  label: Save Position Container
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Static camera index
    - name: zone_index
      type: integer
      description: Zone index
    - name: name
      type: string
      description: Container name

- id: manually_trigger_container
  label: Manually Trigger Container
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Static camera index
    - name: zone_index
      type: integer
      description: Zone index

- id: set_coordinates
  label: Set Coordinates
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Static camera index
    - name: zone_index
      type: integer
      description: Zone index
    - name: pan
      type: number
      description: "Pan: -0.9936 to +0.9936"
    - name: tilt
      type: number
      description: "Tilt: -0.9936 to +2.9808"
    - name: zoom
      type: number
      description: "Zoom: 0.000000 to 1.0"

# --- Enable/Disable Plugin ---
- id: set_plugin_enabled
  label: Set Plugin Enabled
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "Enable (value=1) or disable (value=0) the plugin"
  notes: When disabled, Connection Status changes to "Not Present - Disabled"

# --- Plugin Properties ---
- id: set_lock
  label: Set Lock
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "When Yes, all commissioning-time controls are disabled until unlocked after a design redeploy"
  notes: Default setting is No

- id: set_is_managed
  label: Set Is Managed
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "When Yes, adds the plugin to the Inventory list for monitoring in Core Manager and Enterprise Manager"

- id: set_show_debug
  label: Set Show Debug
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "When Yes, shows the Debug Output window"

- id: set_vsa_model
  label: Set VSA Model
  kind: action
  params:
    - name: model
      type: string
      description: "SVS1/4 (Seervision OS) or VSA-100 (Q-SYS OS)"

# --- Reconnection Controls ---
- id: set_enable_fallback_reconnect
  label: Set Enable Fallback on Reconnect
  kind: action
  params:
    - name: camera_index
      type: integer
      description: Tracking or conductor camera index
    - name: enabled
      type: boolean
      description: "Enable or disable the fallback mechanism upon reconnection"
  notes: When enabled, fallback will not be triggered when the server reconnects
```

## Feedbacks

```yaml
- id: connection_status
  type: string
  description: Websocket connection status for a specific Seervision instance
  values: [OK, Initializing, Compromised, Missing, Fault, Unknown, "Not Present"]

- id: global_status
  type: string
  description: Aggregate status of all Seervision servers and instances

- id: suite_status
  type: string
  description: Suite status for a specific instance

- id: suite_version
  type: string
  description: Suite version for a specific instance

- id: is_tracking
  type: boolean
  description: Indicates whether a tracking camera is actively tracking

- id: camera_is_tracking_led
  type: boolean
  description: LED indicator for tracking state

- id: vip_id
  type: string
  description: ID of the currently tracked subject

- id: privacy_opt_out
  type: boolean
  description: "Indicates whether a camera is excluded from privacy handling logic (per camera: conductor, static, tracking)"
  notes: By default disabled for new plugins. Not available for ACPR cameras.

- id: last_event_zone_name
  type: string
  description: Name of the Trigger Zone that was last triggered

- id: last_event_type
  type: string
  description: Type of the last triggered event

- id: last_event_caused_by
  type: string
  description: ID of the subject that caused the last triggered event

- id: last_event_inside_ids
  type: string
  description: IDs of all subjects remaining in the last-triggered Trigger Zone

- id: triggered_led
  type: boolean
  description: Indicates when an Event/Action row is triggered

- id: container_running
  type: boolean
  description: Indicates a Container recall is in progress

- id: container_complete
  type: boolean
  description: Indicates a Container recall is finished

- id: container_interrupted
  type: boolean
  description: Indicates an Action was interrupted

- id: container_abandoned
  type: boolean
  description: Indicates an Action was abandoned

- id: current_route
  type: string
  description: Current Mediacast Router input selection for a given output

- id: seervision_source
  type: string
  description: Desired Seervision Source selection for a Mediacast output

- id: acpr_source
  type: string
  description: Desired ACPR Source selection for a Mediacast output

- id: seervision_output_select_control
  type: string
  description: Seervision Output Select Control for a specific Mediacast Router output

- id: acpr_presenter_zone_active
  type: boolean
  description: Indicates a Seervision Zone is active in the ACPR plugin

- id: ptu_status
  type: string
  description: PTU (Pan-Tilt Unit) connection status for a specific instance

- id: gpu_temperature
  type: string
  description: GPU temperature in Celsius for a specific instance

- id: cpu_temperature
  type: string
  description: CPU temperature in Celsius for a specific instance

- id: capture_card_temperature
  type: string
  description: Capture card temperature for conductor cameras

- id: recalibrating
  type: boolean
  description: Pulsing LED indicating recalibration is active

- id: camera_streaming_mode
  type: string
  description: Current streaming mode of a camera

- id: room_configuration_number
  type: integer
  description: Index of the currently selected room configuration

- id: discovered_servers
  type: string
  description: Server hostnames discovered via mDNS

- id: container_name
  type: string
  description: Name of the Position Container for a static camera zone

- id: coordinates
  type: string
  description: "Current coordinates of a static camera (Pan Tilt Zoom, space-separated)"

- id: event_log
  type: string
  description: "Last item added to the event log (date/time, severity, category, message)"
```

## Variables

```yaml
- id: seervision_ip_address
  type: string
  description: IP address used to connect to the Seervision server (per camera)

- id: server_instance
  type: string
  description: Instance selector for the Seervision server (/1 or /2)

- id: mcr_input
  type: integer
  description: Mediacast Input index for a specific camera in a room configuration

- id: mcr_output
  type: integer
  description: Mediacast Output index for a specific camera in a room configuration

- id: usb_video_bridge
  type: string
  description: USB Video Bridge selection for Auto-Privacy

- id: auto_privacy_delay
  type: integer
  description: "Delay in seconds before auto-privacy invokes (5-600)"

- id: recalibration_time
  type: string
  description: Daily time for automatic camera recalibration

- id: reconnect_interval
  type: string
  description: Time interval before fallback triggers upon reconnection

- id: debounce_time
  type: integer
  description: Minutes a websocket can be down before triggering fallback

- id: reboot_day
  type: string
  description: Scheduled reboot day (day name or All)

- id: reboot_time
  type: string
  description: Scheduled reboot time

- id: server_configuration_file
  type: string
  description: Backup file selection from Core Manager > Files > Seervision Server Configurations

- id: plugin_database_text
  type: string
  description: Plugin Data JSON string (enter or retrieve for backup/restore)

- id: room_configuration_name
  type: string
  description: Name of the currently selected room configuration

- id: mediacast_video_router
  type: string
  description: Code Name of the Mediacast Video Router component

- id: tracking_cams_count
  type: integer
  description: "Number of Tracking Cameras configured (1-8)"

- id: static_cams_count
  type: integer
  description: "Number of Static Cameras configured (1-8)"

- id: conductor_cams_count
  type: integer
  description: "Number of Conductor Cameras configured (1-8)"

- id: trigger_zones_count
  type: integer
  description: "Number of Trigger Zones configured (1-25)"

- id: exclusion_zones_count
  type: integer
  description: "Number of Exclusion Zones configured (1-25)"

- id: ptu_model
  type: string
  description: "PTU camera driver model (e.g. Q-SYS NC 12x80 v9.10+, Q-SYS NC 20x60 v9.10+, Virtual Static Camera Driver)"

- id: lens
  type: string
  description: "Lens selection for the camera (e.g. Q-SYS_NC_12x80, Q-SYS_NC_20x60)"

- id: calibration_model
  type: string
  description: Calibration model selection (Q-SYS)

- id: invert_pan
  type: boolean
  description: Invert pan when camera is installed upside down

- id: invert_tilt
  type: boolean
  description: Invert tilt when camera is installed upside down

- id: rtsp_stream_url
  type: string
  description: "Camera multicast RTSP stream URL (e.g. rtsp://camera_ip/main or rtsp://camera_ip/rtpstream/config1)"
```

## Events

```yaml
- id: zone_entered
  description: Generated when a subject enters an enabled Trigger Zone
  payload:
    zone_name: string
    caused_by_id: string
    inside_ids: string
    person_count: integer

- id: zone_leave
  description: Generated when a subject leaves a Trigger Zone
  payload:
    zone_name: string
    caused_by_id: string
    inside_ids: string
    person_count: integer

- id: fallback_triggered
  description: Generated when the fallback mechanism is triggered on reconnection
  payload: {}
```

## Macros

```yaml
# UNRESOLVED: no explicit multi-step sequences described in source beyond the
# event→action automation model already documented in Actions
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source
```

## Notes

- This is a Q-SYS plugin component, not a standalone device. Control is via Q-SYS platform control pins, not a direct serial/TCP/REST interface.
- The plugin uses v2 encryption and requires Q-SYS 9.10.1 or above. Do not use with 9.10.0.
- VSA-100 does not support Seervision OS; uses Q-SYS OS with legacy plugins only. VSA-100 configuration web interface is at `http://<IP>:8123` (HTTP, not HTTPS). The Peripheral Manager page uses HTTPS.
- SVS4-2U supports 2 simultaneous AI processing instances; SVS1-2U supports 1; VSA-100 supports 2. Instances are accessed at `/<n>` paths (SVS1/4 at `http://<IP>/<n>`, VSA-100 at `http://<IP>:8123/<n>`).
- SVS4 / SVS1 uses the .patch upgrade file type; VSA-100 uses the .squash file type.
- VisionSuite accelerators are provisioned with DHCP enabled by default. Discover server IP via mDNS (not supported on VSA-100 / Q-SYS OS).
- Position Container recalls use continuous VISCA movements, not absolute coordinates — recall accuracy may not be 100% exact.
- Standard shot framing options for Containers: Full Body, American, Half Body, Medium Close Up.
- Only one Tracking Zone can be enabled per camera at a time. Multiple Exclusion Zones are supported simultaneously.
- Every integration requires at least one camera, one Mediacast Router component, and one Seervision plugin. Only one Mediacast Router per plugin.
- All camera and Mediacast Router components must have Script Access set to All. Plugin Code Name must be "Seervision_Plugin"; Mediacast Router Code Name must be "Mediacast_Router".
- Legacy (Seervision OS + ACPR) and VisionSuite Designer systems must not be commissioned alongside each other.
- Privacy Opt Out is not available for any ACPR cameras.
- Cameras in privacy mode will not recalibrate; an external script must take cameras out of privacy for recalibration when auto-privacy is enabled.
- When plugin is connected, manipulating Trigger/Tracking/Exclusion Zone states via the web interface is not recommended — use plugin controls.

<!-- UNRESOLVED: Seervision server websocket API (message format, authentication) not documented -->
<!-- UNRESOLVED: ACPR plugin API and audio trigger protocol not documented -->
<!-- UNRESOLVED: exact Mediacast Router integration protocol details not documented -->
<!-- UNRESOLVED: compatible camera firmware versions not stated -->
<!-- UNRESOLVED: hardware accelerator (VSA-100, SVS4, SVS1) management API not documented -->
````

Upgrade done. Added 17 new actions (camera selection, streaming mode, VIP ID set, zone names, ACPR zone enable, event camera number, container action ID, ACPR output select, mediacast router select, clear room config, lock, is managed, show debug, VSA model, fallback reconnect). Added 3 new feedbacks (privacy_opt_out, seervision_output_select_control, event_log). Added 15 new variables (server config file, plugin DB text, room name, camera counts ×5, PTU model, lens, calibration, invert pan/tilt, RTSP URL). Extended transport with HTTP:8123 for VSA-100. Preserved all 30 existing actions + existing feedbacks/variables/events intact.

## Provenance

```yaml
source_domains:
  - help.qsys.com
source_urls:
  - https://help.qsys.com/Content/VisionSuite/seervision_control.htm
retrieved_at: 2026-07-16T04:03:08.126Z
last_checked_at: 2026-07-22T00:42:05.323Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:42:05.323Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions match documented Q-SYS plugin controls; transport (TCP/HTTP on port 8123) verified; no extra source commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "underlying Seervision websocket API is not documented in source; only the Q-SYS plugin pin interface is described"
- "compatible hardware accelerators (SVS4-2U, SVS1-2U, VSA-100) firmware version ranges not stated"
- "no explicit multi-step sequences described in source beyond the"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "Seervision server websocket API (message format, authentication) not documented"
- "ACPR plugin API and audio trigger protocol not documented"
- "exact Mediacast Router integration protocol details not documented"
- "compatible camera firmware versions not stated"
- "hardware accelerator (VSA-100, SVS4, SVS1) management API not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
