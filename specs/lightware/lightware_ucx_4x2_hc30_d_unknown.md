---
spec_id: admin/lightware-ucx-4x2-hc30d
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
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.lightware.com
  - ivojo.co.uk
  - aveosystems.com
  - lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/User-Manual/LARA_UsersManual_for_v120b37.pdf
  - https://www.ivojo.co.uk/instruction-books/lightware/lightware-ucx-4x2-hc40d.pdf
  - https://aveosystems.com/wp-content/uploads/product_pdfs/Lightware_Mira_Connect.pdf
  - https://www.ivojo.co.uk/instruction-books/lightware/lightware-ucx-4x2-hc30d.pdf
  - https://www.lightware.com/en/support/online-user-manuals
retrieved_at: 2026-05-13T05:56:11.478Z
last_checked_at: 2026-06-02T17:23:12.879Z
generated_at: 2026-06-02T17:23:12.879Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LW3 wire port number not stated in this source (6107 is the Lightware convention but is NOT asserted here)"
  - "LW3 wire port not stated in source (6107 is the Lightware LW3 convention but is not asserted here)"
  - "section 4.6 lists baudRate/stopBits/parity only; data bits not stated"
  - "no flow-control parameter documented in section 4.6"
  - "the full set of settable LW3 properties (the LW3 node tree) is not"
  - "the source does not document unsolicited out-of-band notifications"
  - "no multi-step sequences or named routines are documented in this source."
  - "no safety warnings, interlocks, or power-on sequencing procedures"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:12.879Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions matched verbatim to source §4.3/§4.4 method names; transport values base_url/baud_rate/parity/stop_bits/auth all confirmed in source; UNRESOLVED nulls correctly skipped. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lightware UCX-4x2-HC30D Control Spec

## Summary
The Lightware UCX-4x2-HC30D is a Taurus UCX-series HDMI/USB-C matrix switcher with built-in LARA (Lightware Advanced Room Automation) for room control. This spec covers the LARA Taurus UCX/MMX2 Driver Module control surface (section 4.3 of the LARA reference), the CEC-over-REST sink-control surface (section 4.4), and the occupancy-sensor / serial-message scripting surface (section 4.6). The underlying device control protocol is LW3 over TCP / WebSocket; the LARA web UI is exposed on HTTPS.

<!-- UNRESOLVED: LW3 wire port number not stated in this source (6107 is the Lightware convention but is NOT asserted here) -->

## Transport
```yaml
protocols:
  - tcp  # LW3 protocol - Raw TCP, Websocket, or Secure Websocket per section 4.3
  - http  # REST API used by CEC module (section 4.4) and Generic REST client (section 4.5)
addressing:
  port: null  # UNRESOLVED: LW3 wire port not stated in source (6107 is the Lightware LW3 convention but is not asserted here)
  base_url: "https://<IP>/lara"  # LARA web UI; port 443 must be enabled
serial:
  baud_rate: 9600  # example value stated in section 4.6 parameter list
  data_bits: null  # UNRESOLVED: section 4.6 lists baudRate/stopBits/parity only; data bits not stated
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: no flow-control parameter documented in section 4.6
auth:
  type: basic  # inferred: section 4.3 lists "Raw TCP - basic authentication" and LARA web UI uses admin + password login on port 443
```

## Traits
```yaml
- routable  # inferred: switchCrosspoint method + sourceInputChanged event across AUDIO/VIDEO/USB layers
- queryable  # inferred: get / open / callMethod primitives and LW3-property-changed subscription events
- levelable  # inferred: changeAnalogAudioVolumeDB and changeAnalogAudioVolumePercent methods
```

## Actions
```yaml
# LARA Taurus UCX/MMX2 Driver Module (section 4.3).
# Commands are LARA module method names (script-level surface).
# LW3 wire-level commands are reached via the callMethod action (e.g. callMethod on /V1/MEDIA/GPIO/P4 with method toggle()).

- id: get_lw3_property
  label: Get LW3 Property
  kind: query
  command: "get"
  params:
    - name: path
      type: string
      description: LW3 node path (e.g. /V1/MEDIA/VIDEO/...)
    - name: property
      type: string
      description: Property name under path

- id: set_lw3_property
  label: Set LW3 Property
  kind: action
  command: "set"
  params:
    - name: path
      type: string
    - name: property
      type: string
    - name: value
      type: string

- id: open_lw3_node
  label: Subscribe to LW3 Node
  kind: action
  command: "open"
  params:
    - name: path
      type: string
      description: LW3 node path to subscribe

- id: close_lw3_node
  label: Unsubscribe from LW3 Node
  kind: action
  command: "close"
  params:
    - name: path
      type: string

- id: call_lw3_method
  label: Call LW3 Method
  kind: action
  command: "callMethod"
  params:
    - name: path
      type: string
    - name: method
      type: string
    - name: parameters
      type: string
      description: Optional method parameters; wildcard (*) is not allowed in path

- id: switch_crosspoint
  label: Switch Crosspoint
  kind: action
  command: "switchCrosspoint"
  params:
    - name: layer
      type: string
      description: AUDIO | VIDEO | USB (USB only on specific models)
    - name: outputPort
      type: integer
    - name: sourcePort
      type: integer

- id: set_gpio_direction
  label: Set GPIO Direction
  kind: action
  command: "setGpioDirection"
  params:
    - name: port
      type: string
      description: GPIO port identifier (e.g. P4)
    - name: direction
      type: string
      description: Input | Output

- id: set_gpio_state
  label: Set GPIO State
  kind: action
  command: "setGpioState"
  params:
    - name: port
      type: string
    - name: state
      type: string
      description: low | high

- id: emulate_edid
  label: Emulate EDID
  kind: action
  command: "emulateEdid"
  params:
    - name: source
      type: string
      description: factory | dynamic | user
    - name: destination
      type: string
      description: emulated

- id: upload_edid
  label: Upload User EDID
  kind: action
  command: "uploadEdid"
  params:
    - name: target
      type: string
    - name: data
      type: string
      description: HEX-format EDID blob

- id: set_analog_audio_volume_db
  label: Set Analog Audio Volume (dB)
  kind: action
  command: "changeAnalogAudioVolumeDB"
  params:
    - name: port
      type: string
    - name: value
      type: number
      description: dB value

- id: set_analog_audio_volume_percent
  label: Set Analog Audio Volume (%)
  kind: action
  command: "changeAnalogAudioVolumePercent"
  params:
    - name: port
      type: string
    - name: value
      type: number
      description: 0-100 percentage

# CEC module (section 4.4) - sent over REST to the sink on a UCX HDMI output

- id: cec_power_on
  label: CEC Power On
  kind: action
  command: "powerOn"

- id: cec_image_view_on
  label: CEC Image View On
  kind: action
  command: "imageViewOn"
  notes: "Fallback when powerOn does not work."

- id: cec_power_off
  label: CEC Power Off
  kind: action
  command: "powerOff"

- id: cec_standby
  label: CEC Standby
  kind: action
  command: "standby"
  notes: "Fallback when powerOff does not work."

- id: cec_mute
  label: CEC Mute
  kind: action
  command: "mute"

- id: cec_unmute
  label: CEC Unmute
  kind: action
  command: "unmute"

- id: cec_volume_up
  label: CEC Volume Up
  kind: action
  command: "volumeUp"

- id: cec_volume_down
  label: CEC Volume Down
  kind: action
  command: "volumeDown"

- id: cec_custom_command
  label: CEC Custom Command
  kind: action
  command: "customCommand"
  params:
    - name: command
      type: string
      description: HEX string (hex chars only; spaces permitted as delimiters)

- id: cec_idle_polling_frequency
  label: CEC Idle Polling Frequency
  kind: action
  command: "idlePollingFrequency"
  params:
    - name: seconds
      type: integer
      description: Polling interval; 0 disables idle polling

# GPIO toggle via LW3 callMethod (GPIO Control section)

- id: gpio_toggle_lw3
  label: GPIO Toggle (LW3 callMethod)
  kind: action
  command: "callMethod"
  notes: "Example: path /V1/MEDIA/GPIO/P4, method toggle()"
  params:
    - name: path
      type: string
      description: e.g. /V1/MEDIA/GPIO/P4
    - name: method
      type: string
      description: e.g. toggle()
```

## Feedbacks
```yaml
- id: connection_state
  type: enum
  values: [connected, disconnected]
  notes: "Taurus UCX/MMX2 driver connected/disconnected events."

- id: overall_health
  type: string
  notes: "Mirrors /V1/MANAGEMENT/HEALTH/OverallHealthState (overallHealthChanged event)."

- id: source_input_changed
  type: object
  notes: "Fires when another source is switched to a specified output. Carries outputPort, sourcePort."

- id: output_connected_status
  type: boolean
  notes: "Sink device connection state per outputPort (outputConnectedStatusChanged event)."

- id: output_signal_present
  type: boolean
  notes: "Signal presence per outputPort (outputSignalPresentStatusChanged event)."

- id: usb_host
  type: string
  notes: "Currently selected USB host sourcePort (usbHostChanged event)."

- id: lw3_property_changed
  type: object
  notes: "Any subscribed LW3 property changed. Carries path, property, value."

- id: cec_availability
  type: enum
  values: [available, unavailable]
  notes: "Sink responds to CEC REST requests (availableOnCEC / unavailableOnCEC)."

- id: cec_error
  type: string
  notes: "CEC command send was not successful (CEC error event)."

- id: gpio_state_changed
  type: object
  notes: "GPIO input state changed. Carries port, value (low | high)."

- id: health_alert
  type: object
  notes: "Specific /V1/MANAGEMENT/HEALTH property changed. Carries property, value."

- id: ocs_status
  type: enum
  values: [low, high]
  notes: "Occupancy sensor state (section 4.6 ocsStatusChanged event)."
```

## Variables
```yaml
# UNRESOLVED: the full set of settable LW3 properties (the LW3 node tree) is not
# enumerated in this LARA module reference; populate from the device's LW3 Programmer
# Guide if/when it is ingested.
```

## Events
```yaml
# Observable state changes are captured in the Feedbacks section above.
# UNRESOLVED: the source does not document unsolicited out-of-band notifications
# beyond the LARA event channels listed there.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences or named routines are documented in this source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing procedures
# are described in this LARA module reference.
```

## Notes
- Source document is the Lightware Advanced Room Automation (LARA) Protocol Reference; the UCX-specific surface is section 4.3 (Taurus UCX/MMX2 Driver Module). UCX-4x2-HC30D is in the explicit model list at line 80.
- LARA web UI: `https://<IP>/lara`; port 443 must be enabled (Settings/Services tab). Login is user `admin` + password. Session timeout 25 min (prompt to continue), 2 h auto-logout.
- LARA module connection types to the UCX device: Raw TCP, Websocket, Secure Websocket. Auth options: none or basic authentication.
- NTP must be set (Settings/System tab) for time-sensitive LARA Rules.
- CEC commands (section 4.4) are sent to the downstream sink over the UCX REST API; port 80 (HTTP) or 443 (HTTPS), with optional basic authentication.
- Section 4.6 (Occupancy Sensor / Serial Message Module) documents serial-port configuration on the UCX: port identifier (e.g. P1), baud rate (example 9600), stop bits (example 1), parity (example None). Message types: string (unicode allowed, e.g. `\u000d` for CR) or HEX (`A0B1`, `A0 B1`, `0xA0 0xB1`, `\xA0 \xB1` formats all accepted).
- The full LW3 wire-level command catalogue (path/method/parameter grammar) is NOT in this source; this spec represents the LARA module surface that wraps LW3, plus the explicit CEC command set. The LW3 Programmer Guide is the authoritative source for wire-level commands and was not available for this draft.

## Provenance

```yaml
source_domains:
  - archive.lightware.com
  - ivojo.co.uk
  - aveosystems.com
  - lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/User-Manual/LARA_UsersManual_for_v120b37.pdf
  - https://www.ivojo.co.uk/instruction-books/lightware/lightware-ucx-4x2-hc40d.pdf
  - https://aveosystems.com/wp-content/uploads/product_pdfs/Lightware_Mira_Connect.pdf
  - https://www.ivojo.co.uk/instruction-books/lightware/lightware-ucx-4x2-hc30d.pdf
  - https://www.lightware.com/en/support/online-user-manuals
retrieved_at: 2026-05-13T05:56:11.478Z
last_checked_at: 2026-06-02T17:23:12.879Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:12.879Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions matched verbatim to source §4.3/§4.4 method names; transport values base_url/baud_rate/parity/stop_bits/auth all confirmed in source; UNRESOLVED nulls correctly skipped. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LW3 wire port number not stated in this source (6107 is the Lightware convention but is NOT asserted here)"
- "LW3 wire port not stated in source (6107 is the Lightware LW3 convention but is not asserted here)"
- "section 4.6 lists baudRate/stopBits/parity only; data bits not stated"
- "no flow-control parameter documented in section 4.6"
- "the full set of settable LW3 properties (the LW3 node tree) is not"
- "the source does not document unsolicited out-of-band notifications"
- "no multi-step sequences or named routines are documented in this source."
- "no safety warnings, interlocks, or power-on sequencing procedures"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
