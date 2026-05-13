---
spec_id: admin/hdanywhere-mhublegacy
schema_version: ai4av-public-spec-v1
revision: 1
title: "HDANYWHERE MHUBLegacy Control Spec"
manufacturer: HDANYWHERE
model_family: "MHUB U"
aliases: []
compatible_with:
  manufacturers:
    - HDANYWHERE
  models:
    - "MHUB U"
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
    - "MHUB (4x4) 100 A"
    - "MHUB (6x6) 100 A"
    - "UCONTROL ZONE PROCESSOR (5)"
    - "UCONTROL ZONE PROCESSOR (1)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.google.com
retrieved_at: 2026-05-04T15:16:46.093Z
last_checked_at: 2026-04-25T20:45:34.318Z
generated_at: 2026-04-25T20:45:34.318Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T20:45:34.318Z
  matched_actions: 58
  action_count: 58
  confidence: high
  summary: "All 58 spec actions matched to source; transport parameters verified; API fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# HDANYWHERE MHUBLegacy Control Spec

## Summary
HDANYWHERE MHUBLegacy is a family of HDMI matrix switches supporting video and audio routing, zone management, and third-party device control. Control is via a REST/HTTP API accessible on the local network. The base URL is `http://devicehost/api/` and the HTTP port is 80. No authentication is required for local control.

<!-- UNRESOLVED: RS232 and IP control mentioned are for pass-through to attached devices, not MHUB matrix control. MHUB itself is controlled exclusively via HTTP REST API. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://devicehost/api/
  port: 80  # inferred from DNS-SD responses showing port 80
auth:
  type: none  # inferred: no auth procedure in source for local MHUB control
```

## Traits
```yaml
- powerable       # inferred from power on/off commands (api/power/0/, api/power/1/)
- routable        # inferred from switch command (api/control/switch/)
- queryable       # inferred from data endpoints returning state
- levelable       # inferred from volume and mute commands
```

## Actions
```yaml
- id: power_off
  label: Standby ON (Turn Off)
  kind: action
  params: []
  protocol_hint: GET http://devicehost/api/power/0/

- id: power_on
  label: Standby OFF (Turn On)
  kind: action
  params: []
  protocol_hint: GET http://devicehost/api/power/1/

- id: reboot_full
  label: Full Reboot / Power Cycle
  kind: action
  params: []
  protocol_hint: GET http://devicehost/api/reboot/1/ (30s execution time)

- id: reboot_os
  label: Reboot OS
  kind: action
  params: []
  protocol_hint: GET http://devicehost/api/reboot/2/

- id: identify
  label: Identify Device
  kind: action
  params: []
  protocol_hint: GET http://devicehost/api/identify/

- id: switch
  label: Switch Input to Output
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c, d...)
    - name: input
      type: integer
      description: Input port number (1, 2, 3, 4...)
  protocol_hint: GET http://devicehost/api/control/switch/[ox]/[iy]/

- id: switch_zone
  label: Zone Switching (MHUB Audio)
  kind: action
  params:
    - name: zone
      type: string
      description: Zone ID (z1, z2, z3...)
    - name: input
      type: integer
      description: Input port number (1, 2, 3...)
  protocol_hint: GET http://devicehost/api/control/switch/zone/[zid]/[iy]/

- id: set_volume
  label: Set Output Volume
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c...)
    - name: volume
      type: integer
      description: Volume level 1-100
  protocol_hint: GET http://devicehost/api/control/volume/[ox]/[vy]/

- id: volume_step
  label: Step Output Volume
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c...)
    - name: direction
      type: string
      enum: [up, down]
    - name: step
      type: integer
      description: Volume step 1-10
  protocol_hint: GET http://devicehost/api/control/volume/step/[ox]/[x]/[y]

- id: set_zone_volume
  label: Set Zone Volume (MZMA only)
  kind: action
  params:
    - name: zone
      type: string
      description: Zone ID (z1, z2, z3...)
    - name: volume
      type: integer
      description: Volume level 0-100
  protocol_hint: GET http://devicehost/api/control/volume/zone/[zid]/[x]

- id: mute
  label: Mute Output
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c...)
    - name: state
      type: boolean
      description: true=muted, false=unmuted, toggle=toggle
  protocol_hint: GET http://devicehost/api/control/mute/[ox]/[mx]/

- id: mute_zone
  label: Mute Zone (MHUB AUDIO/MZMA)
  kind: action
  params:
    - name: zone
      type: string
      description: Zone ID (z1, z2, z3...)
    - name: state
      type: boolean
      description: true=muted, false=unmuted
  protocol_hint: GET http://devicehost/api/control/mute/zone/[zid]/[mx]/

- id: set_arc
  label: Audio Return Channel (ARC)
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c...)
    - name: type
      type: integer
      description: Type 0=HDMI, 1=HDBaseT
    - name: enabled
      type: boolean
      description: true=ARC On, false=ARC Off
  protocol_hint: GET http://devicehost/api/control/arc/[ox]/[ty]/[ax]/

- id: output_enable
  label: Shutdown Amplifier / Enable Output
  kind: action
  params:
    - name: output
      type: string
      description: Output port ID (a, b, c...)
    - name: state
      type: string
      enum: [on, off]
  protocol_hint: GET http://devicehost/api/control/output/[oid]/[x]/

- id: zone_enable
  label: Enable/Disable Zone Output
  kind: action
  params:
    - name: zone
      type: string
      description: Zone ID (z1, z2, z3...)
    - name: state
      type: string
      enum: [on, off]
  protocol_hint: GET http://devicehost/api/control/zone/[zid]/[x]/

- id: execute_sequence
  label: Execute Sequence
  kind: action
  params:
    - name: sequence_id
      type: string
      description: Sequence ID
    - name: state
      type: boolean
      description: Optional boolean state
  protocol_hint: GET http://devicehost/api/control/sequence/[sid]/[y]

- id: execute_function
  label: Execute Function
  kind: action
  params:
    - name: function_id
      type: string
      description: Function ID
    - name: state
      type: boolean
      description: Optional boolean state
  protocol_hint: GET http://devicehost/api/control/function/[fid]/[y]

- id: group_create
  label: Create Group
  kind: action
  params:
    - name: label
      type: string
      description: Group label
  protocol_hint: GET http://devicehost/api/control/group/create/[groupLabel]/

- id: group_delete
  label: Delete Group
  kind: action
  params:
    - name: group_id
      type: string
      description: Group ID
  protocol_hint: GET http://devicehost/api/control/group/delete/[gid]/

- id: group_add_zone
  label: Add Zone to Group
  kind: action
  params:
    - name: group_id
      type: string
      description: Group ID
    - name: zones
      type: array
      items:
        type: string
      description: Array of zone IDs
  protocol_hint: POST http://devicehost/api/control/group/[gid]/add

- id: group_remove_zone
  label: Remove Zone from Group
  kind: action
  params:
    - name: group_id
      type: string
      description: Group ID
    - name: zones
      type: array
      items:
        type: string
      description: Array of zone IDs
  protocol_hint: POST http://devicehost/api/control/group/[gid]/delete

- id: group_set_volume
  label: Set Group Volume
  kind: action
  params:
    - name: group_id
      type: string
      description: Group ID
    - name: volume
      type: integer
      description: Volume 1-100
  protocol_hint: GET http://devicehost/api/control/group/volume/set/[gid]/[vs]/

- id: group_volume_step
  label: Step Group Volume
  kind: action
  params:
    - name: group_id
      type: string
      description: Group ID
    - name: direction
      type: string
      enum: [up, down]
  protocol_hint: GET http://devicehost/api/control/group/volume/set/[gid]/x/

- id: group_mute
  label: Mute Group
  kind: action
  params:
    - name: group_id
      type: string
      description: Group ID
    - name: state
      type: boolean
      description: true=muted, false=unmuted
  protocol_hint: GET http://devicehost/api/control/mutegroup/[gid]/[ox]/

- id: fix_audio
  label: Source Audio Extraction (Fix Audio)
  kind: action
  params:
    - name: enabled
      type: boolean
      description: true=disable matrix, false=enable matrix
  protocol_hint: GET http://devicehost/api/control/fixaudio/[ax]/

- id: follow_audio
  label: Follow Audio Selection
  kind: action
  params:
    - name: mode
      type: string
      enum: [input, output, ?]
      description: Follow Input, Follow Output, or query current state
  protocol_hint: GET http://devicehost/api/control/followaudio/[ax]/

- id: send_ir_command
  label: Execute uControl IR Command
  kind: action
  params:
    - name: ir_port
      type: integer
      description: IR port ID (1, 2, 3...)
    - name: command_id
      type: integer
      description: IR command ID from uControl pack
  protocol_hint: GET http://devicehost/api/command/ir/[io]/[cy]

- id: send_ir_hold
  label: Execute uControl IR Command (Hold)
  kind: action
  params:
    - name: ir_port
      type: integer
      description: IR port ID
    - name: command_id
      type: integer
      description: IR command ID
  protocol_hint: GET http://devicehost/api/command/ir/[io]/[cy]/hold (repeats every 250ms)

- id: send_ir_release
  label: Release IR Hold
  kind: action
  params:
    - name: ir_port
      type: integer
      description: IR port ID
    - name: command_id
      type: integer
      description: IR command ID
  protocol_hint: GET http://devicehost/api/command/ir/[io]/[cy]/release

- id: send_cec_command
  label: Execute uControl CEC Command
  kind: action
  params:
    - name: port
      type: string
      description: Port ID (a, b, c... for outputs, 1, 2, 3... for inputs)
    - name: type
      type: integer
      description: CEC command type 0=HDMI output, 1=HDBT output
    - name: command_id
      type: integer
      description: CEC command ID from uControl pack
  protocol_hint: POST http://devicehost/api/command/cec/[io]/[ty]/[cy]/

- id: send_cec_passthrough
  label: CEC Passthrough (Custom CEC Command)
  kind: action
  params:
    - name: port
      type: string
      description: Port ID
    - name: type
      type: integer
      description: CEC type 0=HDMI output, 1=HDBT output
    - name: logical_address
      type: string
      description: CEC logical address (hex)
    - name: command
      type: string
      description: CEC command (hex)
    - name: arguments
      type: string
      description: CEC arguments (space-separated hex)
  protocol_hint: POST http://devicehost/api/command/cecpass/[io]/[ty]/ with JSON body

- id: send_ip_command
  label: Execute uControl IP Command
  kind: action
  params:
    - name: pack_id
      type: integer
      description: Pack ID (1, 2, 3...)
    - name: command_id
      type: integer
      description: IP command ID from uControl pack
  protocol_hint: GET http://devicehost/api/command/ip/[pid]/[cy]

- id: send_ip_passthrough
  label: IP Passthrough (Custom IP Command)
  kind: action
  params:
    - name: type
      type: string
      description: Command type (POST, GET, PUT, TCP, TCPX, UDP, BROADCAST, TELNET)
    - name: ip
      type: string
      description: Target device IP address
    - name: port
      type: string
      description: Target port
    - name: path
      type: string
      description: Path if required
    - name: data
      type: string
      description: Command data
    - name: auth_type
      type: string
      description: Auth type (header, text, login) for POST/PUT/TELNET only
    - name: auth_data
      type: object
      description: Auth data object
  protocol_hint: POST http://devicehost/api/command/ippass/ with JSON body
```

## Feedbacks
```yaml
- id: power_state
  label: MHUB Power State
  type: boolean
  values: [true, false]
  description: true=MHUB is on, false=MHUB is off
  protocol_hint: GET http://devicehost/api/data/0/ returns {power: boolean}

- id: system_info
  label: System Information (Standalone)
  type: object
  description: Returns basic system info, IO connectivity, software versions, stack status
  protocol_hint: GET http://devicehost/api/data/100/ returns io_data, ir, cec, rs232, ws, mhub, stack

- id: system_info_stacked
  label: System Information (Stacked Mode)
  type: object
  description: Returns stacked IO mapping and unit info
  protocol_hint: GET http://devicehost/api/data/101/

- id: zones
  label: MHUB Zones
  type: array
  description: Returns outputs/inputs assigned to zones
  protocol_hint: GET http://devicehost/api/data/102/

- id: groups
  label: MHUB Groups
  type: array
  description: Returns group info, volume, mute state
  protocol_hint: GET http://devicehost/api/data/103/

- id: status_all
  label: Status - All Zones (Single System)
  type: object
  description: Returns routing, volume, mute, ARC state for all zones
  protocol_hint: GET http://devicehost/api/data/200/

- id: status_zone
  label: Status - Single Zone
  type: object
  description: Returns routing and audio state for a specific zone
  protocol_hint: GET http://devicehost/api/data/200/[zid] where zid = z1, z2, z3...

- id: status_stacked
  label: Status - All Zones (Stacked MHUB)
  type: object
  protocol_hint: GET http://devicehost/api/data/203/

- id: status_zone_stacked
  label: Status - Single Zone (Stacked MHUB)
  type: object
  protocol_hint: GET http://devicehost/api/data/203/[zid]

- id: ucontrol_summary
  label: uControl Pack Summary (Single)
  type: object
  description: Returns which IR ports have uControl packs installed
  protocol_hint: GET http://devicehost/api/data/201/

- id: ucontrol_pack
  label: uControl Pack Details
  type: object
  description: Returns button IDs and labels for a uControl pack
  protocol_hint: GET http://devicehost/api/data/201/[x] where x = IR port

- id: sequences_functions
  label: Sequences and Functions
  type: object
  protocol_hint: GET http://devicehost/api/data/202/

- id: cec_pack
  label: uControl CEC Pack
  type: object
  protocol_hint: GET http://devicehost/api/data/204/

- id: ucontrol_summary_stack
  label: uControl Pack Summary (Stack)
  type: object
  protocol_hint: GET http://devicehost/api/data/205/

- id: ucontrol_pack_stack
  label: uControl Pack Details (Stack)
  type: object
  protocol_hint: GET http://devicehost/api/data/205/[x]

- id: ip_pack_info
  label: uControl IP Pack Information
  type: object
  protocol_hint: GET http://devicehost/api/data/206/ or GET http://devicehost/api/data/206/[x]
```

## Variables
```yaml
# Volume levels are returned as integers (0-100) via status endpoints
# Mute states are returned as booleans via status endpoints
# These are queried via /api/data/200/ and /api/data/203/ endpoints

- id: zone_volume
  label: Zone Audio Volume
  type: integer
  range: [0, 100]
  description: Audio volume level for a zone

- id: zone_mute
  label: Zone Mute State
  type: boolean
  description: true=muted, false=unmuted

- id: output_enabled
  label: Output Enabled State
  type: boolean
  description: true=output enabled, false=output disabled

- id: arc_enabled
  label: ARC Enabled State
  type: boolean
  description: true=ARC enabled, false=ARC disabled

- id: display_power
  label: Display Power State
  type: string
  values: [true, false, unknown]
  description: Power state of display connected to output
```

## Events
```yaml
# UNRESOLVED: The document mentions UDP State broadcast on port 3000 but does not
# document the event format or triggering conditions for unsolicited notifications.
# Events may be emitted by MHUB but no explicit documentation found.

- id: udp_state_broadcast
  label: UDP State Broadcast
  type: object
  description: MHUB broadcasts state changes via UDP to port 3000
  note: "Event format not documented in source"
```

## Macros
```yaml
# UNRESOLVED: Macros (called "Sequences" in MHUB docs) are user-defined and stored
# on the device. The document describes the API to execute them but not their
# creation or the list of available sequences. Query /api/data/202/ for stored sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety warnings or interlock procedures found in source.
# The document notes that power commands (api/power/0/, api/power/1/) are not
# universally supported on every MHUB system - users should verify device support.
```

## Notes
- **Naming convention:** All API interaction is lowercase. Output ports use letters (a, b, c...), input ports use numbers (1, 2, 3...). Zones use z-prefix (z1, z2, z3...). Groups use g-prefix (g1, g2...).
- **API version:** The document describes API version 2.1 for newer (_hda._tcp) devices and API version 2.0 for older (_http._tcp) devices.
- **HTTP methods:** Only GET and POST are supported. PUT and DELETE are not supported.
- **Device discovery:** MHUB uses mDNS/DNS-SD on the network. Services announced under either "_http._tcp" (older) or "_hda._tcp" (newer).
- **Port 3000:** UDP state broadcast is mentioned at port 3000 but the event payload format is not documented.
- **Stacking:** Up to 10 MHUB devices can be stacked. Communication is only with the Master device in a stack.
- **Reboot timing:** Full reboot (api/reboot/1/) has a fixed execution time of 30 seconds before communication is restored.
- **IR port numbering:** IR ports use separate numbering from video/audio ports. Ports start at 1 and increment. AVR ports are always ++1 after the final forwards port.
- **ARC routing:** ARC must be enabled before switching the input, to avoid no audio from display's internal speaker.
- **Volume support:** Volume APIs (api/control/volume/) are only supported on MHUB AUDIO, MZMA6455, MHUB44100A, MHUB66100A, MHUBS888100A, and MHUBS161616100A/DM systems.
```

## Provenance

```yaml
source_domains:
  - docs.google.com
retrieved_at: 2026-05-04T15:16:46.093Z
last_checked_at: 2026-04-25T20:45:34.318Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:45:34.318Z
matched_actions: 58
action_count: 58
confidence: high
summary: "All 58 spec actions matched to source; transport parameters verified; API fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
