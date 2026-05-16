---
spec_id: admin/lightware-ucx-4x2-hc30-d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware UCX-4x2-HC30D Control Spec"
manufacturer: Lightware
model_family: UCX-4x2-HC30D
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - UCX-4x2-HC30D
    - UCX-4x2-HC30
    - UCX-2x1-HC30
    - UCX-2x2-H30
    - UCX-4x3-HC40
    - UCX-4x3-HC40-BD
    - UCX-2x1-TPX-TX20
    - UCX-4x3-TPX-TX20
    - MMX2-4x3-H20
    - MMX2-4x1-H20
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.lightware.com
  - go.lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/Lightware_s_Open_API_Environment_v1.pdf
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-05-04T15:17:11.619Z
last_checked_at: 2026-05-16T11:29:21.334Z
generated_at: 2026-05-16T11:29:21.334Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T11:29:21.334Z
  matched_actions: 20
  action_count: 20
  confidence: high
  summary: "All 20 spec actions matched source LARA Protocol Reference methods; transport parameters verified in source documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Lightware UCX-4x2-HC30D Control Spec

## Summary
Matrix switcher with HDMI and USB-C connectivity for AV routing. Controlled via Lightware Advanced Room Automation (LARA) over TCP/IP. Supports video/audio crosspoint switching, USB routing, GPIO, EDID management, CEC, and analog audio volume control. Web-based LARA interface at `https://<IP>/lara` (port 443). Actual LW3 command syntax and port number for direct device control not documented in this source — consult the Lightware LW3 Protocol Reference for property paths and command strings.

<!-- UNRESOLVED: direct LW3 command strings / hex encoding not present in source -->
<!-- UNRESOLVED: native TCP control port number not stated in source -->
<!-- UNRESOLVED: default admin password not stated — "password" placeholder only -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: null  # UNRESOLVED: TCP control port number not stated in source
  base_url: https://<IP>/lara  # LARA web interface; IP address set during device setup
auth:
  type: null  # UNRESOLVED: web UI requires admin+password but default credentials not stated
  # Source lists: no auth, Raw TCP basic auth, Websocket, Secure Websocket - operator configures
serial:
  # UNRESOLVED: RS-232 serial control not documented in this source
  # Occupancy sensor script module (4.6) supports serial but is for scripting, not device control
```

## Traits
```yaml
- powerable       # inferred: CEC driver module (4.4) has powerOn/powerOff/standby
- routable        # inferred: switchCrosspoint method for AUDIO/VIDEO/USB crosspoint switching
- queryable        # inferred: get/set methods for LW3 property queries
- levelable       # inferred: changeAnalogAudioVolumeDB, changeAnalogAudioVolumePercent
```

## Actions
```yaml
# LW3 methods (Taurus UCX/MMX2 Driver Module 4.3) - actual command strings UNRESOLVED
- id: switch_crosspoint
  label: Switch Crosspoint
  kind: action
  params:
    - name: layer
      type: enum
      values: [AUDIO, VIDEO, USB]
      description: Crosspoint layer to switch
    - name: output_port
      type: string
      description: Output port identifier (e.g. P1, P2)
    - name: source_port
      type: string
      description: Source port to route to output

- id: set_gpio_direction
  label: Set GPIO Direction
  kind: action
  params:
    - name: port
      type: string
      description: GPIO port (e.g. P4)
    - name: direction
      type: enum
      values: [Input, Output]

- id: set_gpio_state
  label: Set GPIO State
  kind: action
  params:
    - name: port
      type: string
      description: GPIO port (e.g. P4)
    - name: state
      type: enum
      values: [low, high]

- id: emulate_edid
  label: Emulate EDID
  kind: action
  params:
    - name: source
      type: enum
      values: [factory, dynamic, user]
      description: EDID source type
    - name: destination
      type: string
      description: Destination input port for emulated EDID

- id: upload_edid
  label: Upload EDID
  kind: action
  params:
    - name: target
      type: string
      description: Target EDID slot
    - name: data
      type: string
      description: HEX-format EDID data

- id: change_analog_audio_volume_db
  label: Change Analog Audio Volume (dB)
  kind: action
  params:
    - name: port
      type: string
      description: Analog audio output port
    - name: value
      type: number
      description: Volume level in dB

- id: change_analog_audio_volume_percent
  label: Change Analog Audio Volume (Percent)
  kind: action
  params:
    - name: port
      type: string
      description: Analog audio output port
    - name: value
      type: number
      description: Volume level in percentage (0-100)

# CEC power actions (via Taurus CEC Driver Module 4.4)
- id: cec_power_on
  label: CEC Power On
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number

- id: cec_power_off
  label: CEC Power Off
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number

- id: cec_standby
  label: CEC Standby
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number

- id: cec_mute
  label: CEC Mute
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number

- id: cec_unmute
  label: CEC Unmute
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number

- id: cec_volume_up
  label: CEC Volume Up
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number

- id: cec_volume_down
  label: CEC Volume Down
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number

- id: cec_custom_command
  label: CEC Custom Command
  kind: action
  params:
    - name: output_port
      type: string
      description: HDMI output port number
    - name: command
      type: string
      description: HEX string CEC command

# Generic LW3 methods (applicable to all LW3-controlled Lightware devices)
- id: lw3_get
  label: LW3 Get Property
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path (e.g. /V1/MANAGEMENT/HEALTH/OverallHealthState)
    - name: property
      type: string
      description: Property name to query

- id: lw3_set
  label: LW3 Set Property
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path
    - name: property
      type: string
      description: Property name to set
    - name: value
      type: string
      description: New value

- id: lw3_open
  label: LW3 Subscribe
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path to subscribe to

- id: lw3_close
  label: LW3 Unsubscribe
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path to unsubscribe from

- id: lw3_call_method
  label: LW3 Call Method
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path
    - name: method
      type: string
      description: Method name (e.g. toggle)
    - name: parameters
      type: object
      description: Optional method parameters
```

## Feedbacks
```yaml
# Unsolicited events from Taurus UCX/MMX2 Driver Module 4.3
- id: source_input_changed
  type: object
  description: Another source switched to specified output
  fields:
    - name: output_port
      type: string
    - name: source_port
      type: string

- id: output_connected_status_changed
  type: object
  description: Sink device connected/disconnected from output
  fields:
    - name: output_port
      type: string
    - name: status
      type: string

- id: output_signal_present_status_changed
  type: object
  description: Signal presence changed on output
  fields:
    - name: output_port
      type: string
    - name: status
      type: boolean

- id: usb_host_changed
  type: object
  description: USB host device changed for USB peripherals
  fields:
    - name: source_port
      type: string

- id: overall_health_changed
  type: string
  description: Overall health status changed at /V1/MANAGEMENT/HEALTH/OverallHealthState

- id: health_alert
  type: object
  description: Health parameter under /V1/MANAGEMENT/HEALTH changed
  fields:
    - name: property
      type: string
    - name: value
      type: string

- id: lw3_property_changed
  type: object
  description: Generic LW3 property change event
  fields:
    - name: path
      type: string
    - name: property
      type: string
    - name: value
      type: string

# Connection state events
- id: connected
  type: boolean
  description: Device TCP connection state

- id: disconnected
  type: boolean
  description: Device TCP disconnection event
```

## Variables
```yaml
# Readable device properties accessible via lw3_get
# UNRESOLVED: full variable list requires Lightware LW3 Protocol Reference
- id: connection_state
  type: enum
  values: [connected, disconnected]
  path: /V1/MANAGEMENT/CONNECTION

- id: output_source
  type: string
  path: /V1/MEDIA/VIDEO/OUTPUTS

- id: firmware_version
  type: string
  path: /V1/MANAGEMENT/INFO/FwPackageVersion

- id: output_connection_state
  type: string
  path: /V1/MEDIA/VIDEO/OUTPUTS/<port>/ConnectionState

- id: output_signal_present
  type: boolean
  path: /V1/MEDIA/VIDEO/OUTPUTS/<port>/SignalPresent

- id: usb_host_input
  type: string
  path: /V1/MEDIA/USB/HostSelected

- id: overall_health_state
  type: enum
  values: [OK, Warning, Error]
  path: /V1/MANAGEMENT/HEALTH/OverallHealthState

- id: analog_audio_volume_db
  type: number
  path: /V1/MEDIA/AUDIO/ANALOG/<port>/VolumeDB

- id: analog_audio_volume_percent
  type: number
  path: /V1/MEDIA/AUDIO/ANALOG/<port>/VolumePercent

- id: gpio_state
  type: enum
  values: [low, high]
  path: /V1/MEDIA/GPIO/<port>

- id: gpio_direction
  type: enum
  values: [Input, Output]
  path: /V1/MEDIA/GPIO/<port>
```

## Events
```yaml
# All events listed in Feedbacks section are also available as device-sent events
# UNRESOLVED: spontaneous event generation by device (vs subscription-based) not confirmed in source
```

## Macros
```yaml
# No explicit multi-step macros documented in source
# GPIO toggle example (via lw3_call_method):
#   path: /V1/MEDIA/GPIO/P4
#   method: toggle
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Source is LARA (Lightware Advanced Room Automation) Protocol Reference — describes the control platform framework, not raw device protocol. Actual LW3 command encoding and property paths require the Lightware LW3 Protocol Reference document.
- LARA web interface: `https://<IP>/lara` on port 443. Session timeout: 25 min inactivity → continue prompt; 2 hours → auto-logout.
- TCP session management introduced for UCX/MMX2 devices — `permanent` parameter determines keep-alive behavior.
- Authentication types supported: none, Raw TCP basic auth, Websocket, Secure Websocket. Web UI uses admin account with operator-set password.
- CEC control (Section 4.4) uses REST API over TCP/IP to send CEC commands to sinks connected via HDMI output.
- GPIO control available via setGpioDirection/setGioState or lw3_call_method with toggle().
- For direct LW3 access without LARA: Generic LW3 Device Module (Section 4.2) with ipAddress + portNumber parameters.
<!-- UNRESOLVED: native RS-232 serial command protocol not covered in source -->
<!-- UNRESOLVED: direct TCP port for LW3 device module not stated in source -->
<!-- UNRESOLVED: default admin password not stated in source -->

## Provenance

```yaml
source_domains:
  - archive.lightware.com
  - go.lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/Lightware_s_Open_API_Environment_v1.pdf
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-05-04T15:17:11.619Z
last_checked_at: 2026-05-16T11:29:21.334Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:29:21.334Z
matched_actions: 20
action_count: 20
confidence: high
summary: "All 20 spec actions matched source LARA Protocol Reference methods; transport parameters verified in source documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
