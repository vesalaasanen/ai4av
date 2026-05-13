---
spec_id: admin/hdanywhere-mhub-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "HDANYWHERE MHUB Series Control Spec"
manufacturer: HDANYWHERE
model_family: "MHUB U (4x1+1)"
aliases: []
compatible_with:
  manufacturers:
    - HDANYWHERE
  models:
    - "MHUB U (4x1+1)"
    - "MHUB U (4x3+1)"
    - "MHUB U (8x6+2)"
    - "MHUB (8x6+2)"
    - "MHUB PRO (4x4) 40"
    - "MHUB PRO (4x4) 70"
    - "MHUB PRO (8x8) 40"
    - "MHUB PRO (8x8) 70"
    - "MHUB PRO 2.0 (4x4) 40"
    - "MHUB PRO 2.0 (8x8) 100"
    - "MHUB S (8+8x8) 100"
    - "MHUB S (8+8x8) 100 A"
    - "MHUB S (16+16x16) 100 A"
    - "MHUB MAX (4x4)"
    - "MHUB AUDIO (6x4)"
    - "MULTI ZONE AMP (6x4) 55"
    - "UCONTROL ZONE PROCESSOR (5)"
    - "UCONTROL ZONE PROCESSOR (1)"
    - "MHUB (4x4) 100 A"
    - "MHUB (6x6) 100 A"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.google.com
retrieved_at: 2026-05-04T15:16:46.093Z
last_checked_at: 2026-04-25T20:45:33.313Z
generated_at: 2026-04-25T20:45:33.313Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T20:45:33.313Z
  matched_actions: 36
  action_count: 36
  confidence: high
  summary: "All 36 spec actions map one-to-one to documented MHUB API endpoints; transport parameters verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# HDANYWHERE MHUB Series Control Spec

## Summary
HDANYWHERE MHUB is a family of HDMI matrix switches supporting video and audio routing, zone management, and third-party device control via IR, CEC, RS-232, and IP. The API is REST/HTTP-based, accessible at `http://devicehost/api/`, using GET and POST verbs. Port 80 is used for HTTP. No authentication procedure is described for local LAN control.

<!-- UNRESOLVED: OAuth 2.0 listed under Protocol(s) but not detailed; relevance to local control unclear -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://devicehost/api/"
  port: 80  # inferred from DNS-SD responses showing Port: 80
auth:
  type: none  # inferred: no auth procedure described for local MHUB control
```

## Traits
```yaml
- powerable       # power on/off commands present (/api/power/0/, /api/power/1/)
- routable        # input/output routing commands present (/api/control/switch/)
- queryable       # state query APIs present (/api/data/0/, /api/data/200/)
- levelable       # volume control present (/api/control/volume/)
```

## Actions
```yaml
- id: power_standby_on
  label: Standby ON (Turn Off)
  kind: action
  params: []
  # Note: not universally supported on all MHUB systems

- id: power_standby_off
  label: Standby OFF (Turn On)
  kind: action
  params: []

- id: reboot_full
  label: Full Reboot / Power Cycle
  kind: action
  params: []
  # Execution time: 30000ms (30 seconds)

- id: reboot_os
  label: Reboot OS
  kind: action
  params: []
  # Maintains video/audio function active

- id: identify
  label: Identify Device
  kind: action
  params: []

- id: switch
  label: Source Switch
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c, ...)
    - name: input
      type: integer
      description: Input number (1-based)

- id: switch_zone
  label: Zone Switching (MHUB Audio/MZMA)
  kind: action
  params:
    - name: zone_id
      type: string
      description: Zone ID (z1, z2, z3...)
    - name: input
      type: integer
      description: Input number (1-based)

- id: fixaudio
  label: Source Audio Extraction
  kind: action
  params:
    - name: state
      type: boolean
      description: "true = disable audio matrix and fix audio switch; false = enable audio matrix"

- id: followaudio
  label: Audio Output Ports (100A systems)
  kind: action
  params:
    - name: mode
      type: string
      enum: [input, output]
      description: "input = Follow Input; output = Follow Output"

- id: set_volume
  label: Set Output Volume
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c, ...)
    - name: volume
      type: integer
      description: Volume level (1-100)
  # Supported on: MHUBAUDIO6455, MZMA6455, MHUB44100A, MHUB66100, MHUBS888100A, MHUBS161616100A/DM

- id: volume_step
  label: Step Output Volume
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c, ...)
    - name: direction
      type: string
      enum: [up, down]
    - name: step
      type: integer
      description: Volume step percentage (1-10)

- id: set_zone_volume
  label: Set Zone Volume (MZMA only)
  kind: action
  params:
    - name: zone_id
      type: string
      description: Zone ID (z1, z2, z3...)
    - name: volume
      type: integer
      description: Volume (0-100)

- id: set_arc
  label: Audio Return Channel (ARC)
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c)
    - name: type
      type: integer
      enum: [0, 1]
      description: "0=HDMI, 1=HDBaseT"
    - name: arc_state
      type: boolean
      description: "true=ARC On, false=ARC Off"

- id: mute
  label: Mute Output
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c, ...)
    - name: mute_state
      type: boolean
      description: "true=muted, false=unmuted, toggle=toggles current state"

- id: mute_zone
  label: Mute Zone (MHUB Audio/MZMA)
  kind: action
  params:
    - name: zone_id
      type: string
      description: Zone ID (z1, z2, z3...)
    - name: mute_state
      type: boolean
      description: "true=muted, false=unmuted"

- id: set_output
  label: Shutdown Amplifier Output (MHUB Audio/MZMA)
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c, ...)
    - name: state
      type: string
      enum: [on, off]
      description: "on=Enables output, off=Disables output"

- id: set_zone_output
  label: Shutdown Amplifier Zone (MHUB Audio/MZMA)
  kind: action
  params:
    - name: zone_id
      type: string
    - name: state
      type: string
      enum: [on, off]

- id: group_create
  label: Create Group
  kind: action
  params:
    - name: label
      type: string
      description: Label for group

- id: group_delete
  label: Delete Group
  kind: action
  params:
    - name: group_id
      type: string

- id: group_add_zone
  label: Add Zone to Group
  kind: action
  params:
    - name: group_id
      type: string
    - name: zones
      type: array
      items:
        type: string

- id: group_remove_zone
  label: Remove Zone from Group
  kind: action
  params:
    - name: group_id
      type: string
    - name: zones
      type: array
      items:
        type: string

- id: group_volume_set
  label: Set Group Volume
  kind: action
  params:
    - name: group_id
      type: string
    - name: volume
      type: integer
      description: Volume (1-100)

- id: group_volume_step
  label: Step Group Volume
  kind: action
  params:
    - name: group_id
      type: string
    - name: direction
      type: string
      enum: [up, down]

- id: group_mute
  label: Mute Group Audio
  kind: action
  params:
    - name: group_id
      type: string
    - name: mute_state
      type: boolean

- id: execute_sequence
  label: Execute Sequence
  kind: action
  params:
    - name: sequence_id
      type: string
    - name: state
      type: boolean
      required: false

- id: execute_function
  label: Execute Function
  kind: action
  params:
    - name: function_id
      type: string
    - name: state
      type: boolean
      required: false

- id: execute_ir
  label: Execute uControl IR Command
  kind: action
  params:
    - name: ir_port
      type: integer
      description: IR port ID (1, 2, 3...)
    - name: command_id
      type: integer
      description: IR command ID from uControl pack

- id: execute_ir_hold
  label: Execute IR Command (Hold)
  kind: action
  params:
    - name: ir_port
      type: integer
    - name: command_id
      type: integer
  # Sends IR command every 250ms until release

- id: execute_ir_release
  label: Release IR Hold
  kind: action
  params:
    - name: ir_port
      type: integer
    - name: command_id
      type: integer

- id: execute_irpass
  label: IR Passthrough
  kind: action
  params:
    - name: ir_port
      type: integer
    - name: irdata
      type: string
      description: Pronto IR hex string

- id: execute_cec
  label: Execute uControl CEC Command
  kind: action
  params:
    - name: port_id
      type: string
      description: "Port ID: a,b,c... for outputs; 1,2,3... for inputs"
    - name: type
      type: integer
      enum: [0, 1]
      description: "0=HDMI output, 1=HDBT output"
    - name: command_id
      type: integer
      description: CEC command ID from uControl CEC library

- id: execute_cecpass
  label: CEC Passthrough
  kind: action
  params:
    - name: port_id
      type: string
    - name: type
      type: integer
      enum: [0, 1]
    - name: logicaladdress
      type: string
    - name: command
      type: string
    - name: arguments
      type: string

- id: configure_rs232
  label: RS232 Port Configuration
  kind: action
  params:
    - name: port
      type: string
    - name: baud
      type: string
      enum: ["1", "2", "3", "4", "5", "6", "7", "8"]
      description: "1=115200, 2=57600, 3=56000, 4=38400, 5=19200, 6=14400, 7=9600, 8=4800"
    - name: data
      type: string
      enum: ["1", "2", "3", "4"]
      description: "1=8bit, 2=7bit, 3=6bit, 4=5bit"
    - name: parity
      type: string
      enum: ["1", "2", "3"]
      description: "1=none, 2=odd, 3=even"

- id: execute_rs232pass
  label: RS232 Passthrough
  kind: action
  params:
    - name: port_id
      type: string
    - name: type
      type: integer
      enum: [0, 1]
      description: "0=ASCII, 1=hexadecimal"
    - name: rs232data
      type: string

- id: execute_ip
  label: Execute uControl IP Command
  kind: action
  params:
    - name: pack_id
      type: integer
    - name: command_id
      type: integer

- id: execute_ipass
  label: IP Passthrough
  kind: action
  params:
    - name: type
      type: string
      description: "Command type: POST, GET, PUT, TCP, TCPX, UDP, BROADCAST, TELNET"
    - name: ip
      type: string
    - name: path
      type: string
    - name: port
      type: string
    - name: ipdata
      type: string
    - name: auth
      type: object
      properties:
        type:
          type: string
          enum: [header, text, login]
        data:
          type: object
```

## Feedbacks
```yaml
- id: power_state
  label: MHUB Power State
  type: boolean
  # true = MHUB is on, false = MHUB is off

- id: system_info_standalone
  label: System Information (Standalone)
  type: object
  properties:
    - io_data (input_video, output_video, output_video_mirror, input_audio, output_audio, output_audio_mirror)
    - ir (backwards, forwards, avr)
    - cec (output, input)
    - rs232
    - ws
    - mhub (first_boot, ip_address, firmware, os_firmware, os_version, api, mhub_official_name, unit_id, mhub_name, serial_number)
    - stack (stack_status, stack_rank, stack_master)

- id: system_info_stacked
  label: System Information (Stacked Mode)
  type: object
  properties:
    - stacked_io (stack_input_video, stack_output_video, stack_output_video_mirror, stack_input_audio, stack_output_audio, stack_output_audio_mirror)
    - mapping (input, output, split_input, stack_unit_info)

- id: zones
  label: MHUB Zones
  type: array
  description: Output and inputs assigned to zones, with zone labels

- id: groups
  label: MHUB Groups
  type: array
  properties:
    - group_id
    - group_label
    - zones
    - group_volume
    - group_mute

- id: status_single
  label: Status (Single System)
  type: object
  description: Current routing, volume, and audio states for all zones

- id: status_stacked
  label: MHUB Status (Stacked)
  type: object
  description: Current routing information for all zones in stacked setup

- id: ucontrol_pack_summary
  label: uControl Pack Summary
  type: object
  description: MHUB ports with uControl Packs installed (IR and IP packs)

- id: ucontrol_cec_pack
  label: uControl CEC Pack
  type: object
  description: CEC pack command IDs and labels

- id: sequences_functions
  label: Sequences and Functions
  type: object

- id: reboot_response
  label: Reboot Response
  type: object
  properties:
    - Description

- id: power_response
  label: Power Command Response
  type: object
  properties:
    - power

- id: switch_response
  label: Switch Response
  type: object
  properties:
    - output_id
    - input_id

- id: volume_response
  label: Volume Response
  type: object
  properties:
    - output_id
    - volume

- id: mute_response
  label: Mute Response
  type: object
  properties:
    - output_id
    - mute

- id: arc_response
  label: ARC Response
  type: object
  properties:
    - output_id
    - type
    - arc

- id: group_response
  label: Group Operation Response
  type: object

- id: execute_response
  label: Execute Response
  type: boolean
  # Returns true on successful execution
```

## Variables
```yaml
# UNRESOLVED: variables are returned by query APIs but are not independently settable
# All writable parameters are exposed as Actions
```

## Events
```yaml
# UNRESOLVED: document describes request/response pattern only; no unsolicited event
# notifications are documented for local LAN control. UDP state broadcast is mentioned
# (Port 3000) but not detailed.
```

## Macros
```yaml
# UNRESOLVED: sequences and functions are user-defined on the device; the API executes
# them but does not define their internal steps
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - |
    ARC routing: "ARC can only be routed to MHUB if the mode is enabled - before -
    the input is switched to. This is to avoid the display's internal speaker from
    delivering no audio when ARC is not needed." (from source: /api/control/arc/)
  - |
    Reboot execution time: "The reboot command is processed as soon as it is received
    and 30 seconds later the system is automatically brought back online." (from source:
    /api/reboot/1/)
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond ARC timing note
```

## Notes
- MHUB devices are HDMI matrix switches routing AV inputs to outputs. Inputs are numbered (1, 2, 3...), outputs are lettered (a, b, c...).
- The API uses lowerCamelCase for IDs, lowercase_with_underscores for array names/labels.
- Port 80 is used for HTTP based on DNS-SD response examples.
- CEC support is via uControl library; document notes CEC is not standardized across manufacturers and HDA cannot guarantee command compatibility.
- RS-232 configuration allows: baud rates 4800-115200, data bits 5-8, parity none/odd/even.
- IP passthrough supports multiple command types: POST, GET, PUT, TCP, TCPX, UDP, BROADCAST, TELNET.
- MHUB supports stacking up to 10 units (Audio Matrix devices or Audio + single Video Matrix).
- Zones group outputs; Groups aggregate up to 4 zones for shared volume control.
- mDNS/DNS-SD discovery uses `_http._tcp` (older devices) or `_hda._tcp` (newer devices) on multicast address 244.0.0.251.

<!-- UNRESOLVED: OAuth 2.0 listed under Protocol(s) in source prologue but no auth procedure described for local control -->
<!-- UNRESOLVED: UDP state broadcast (Port 3000) mentioned but not detailed -->
<!-- UNRESOLVED: HDA Cloud features noted as "development paused" -->
<!-- UNRESOLVED: uControl command IDs 0-102 listed in appendix but source does not specify which are CEC vs IR vs IP specific -->

## Provenance

```yaml
source_domains:
  - docs.google.com
retrieved_at: 2026-05-04T15:16:46.093Z
last_checked_at: 2026-04-25T20:45:33.313Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:45:33.313Z
matched_actions: 36
action_count: 36
confidence: high
summary: "All 36 spec actions map one-to-one to documented MHUB API endpoints; transport parameters verified verbatim in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
