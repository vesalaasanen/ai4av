---
spec_id: admin/jbl-sdp_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "JBL SYNTHESIS SDP-75 Processor Control Spec"
manufacturer: JBL
model_family: SDP-75
aliases: []
compatible_with:
  manufacturers:
    - JBL
  models:
    - SDP-75
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - jblsynthesis.com
source_urls:
  - "https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw45d0257f/pdfs/JBL%20Synthesis%20SDP-75_Automation%20Protocol%20Guide.pdf"
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw07c644ac/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-05-12T19:04:37.910Z
last_checked_at: 2026-05-14T05:46:56.945Z
generated_at: 2026-05-14T05:46:56.945Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T05:46:56.945Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions matched the source document with correct parameter shapes; transport parameters verified against protocol specifications."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# JBL SYNTHESIS SDP-75 Processor Control Spec

## Summary
JBL SYNTHESIS SDP-75 audio processor. Remote control via TCP/IP (port 44100) or RS-232 serial (19200 8N1). Bidirectional ASCII text protocol — device sends state-change messages unsolicited. No authentication required for RS-232; TCP requires client identification via `id` command (not auth). Controls volume, mute, dim, bypass, source/profile selection, preset loading, upmixer mode, remapping, and acoustic/time/level alignment.

<!-- UNRESOLVED: machine type (Trinnov Altitude) not confirmed as SDP-75-specific -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 44100  # stated: TCP port 44100
serial:
  baud_rate: 19200  # stated
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: null  # UNRESOLVED: flow control not stated
auth:
  type: none  # inferred: no login/password in source; TCP id command is identification not auth
```

## Traits
```yaml
- powerable  # power off command present; wake on LAN documented
- levelable  # volume, dvolume, volume ramp commands present
- routable  # profile/source selection command present
- queryable  # get current preset, get label, get all label, get current profile, get profile name present
```

## Actions
```yaml
- id: volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: number
      description: Target volume in dB

- id: dvolume
  label: Adjust Volume Delta
  kind: action
  params:
    - name: delta
      type: number
      description: Delta in dB to add to current volume (positive or negative)

- id: volume_ramp
  label: Volume Ramp
  kind: action
  params:
    - name: target
      type: number
      description: Target volume in dB
    - name: duration
      type: integer
      description: Duration in milliseconds

- id: mute
  label: Set Mute
  kind: action
  params:
    - name: action
      type: integer
      description: "0 = disable mute, 1 = enable mute, 2 = toggle"

- id: dim
  label: Set Dim
  kind: action
  params:
    - name: action
      type: integer
      description: "0 = disable dim, 1 = enable dim, 2 = toggle"

- id: bypass
  label: Set Bypass
  kind: action
  params:
    - name: action
      type: integer
      description: "0 = disable bypass, 1 = enable bypass, 2 = toggle"

- id: send_volume
  label: Request Volume State
  kind: action
  params: []

- id: remapping_mode
  label: Set Remapping Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "none | 2D | 3D | autoroute | manual"

- id: use_acoustics_correction
  label: Set Acoustics Correction
  kind: action
  params:
    - name: action
      type: integer
      description: "0 = disable, 1 = enable, 2 = toggle"

- id: use_level_alignment
  label: Set Level Alignment
  kind: action
  params:
    - name: action
      type: integer
      description: "0 = disable, 1 = enable, 2 = toggle"

- id: use_time_alignment
  label: Set Time Alignment
  kind: action
  params:
    - name: action
      type: integer
      description: "0 = disable, 1 = enable, 2 = toggle"

- id: quick_optimized
  label: Set Optimization
  kind: action
  params:
    - name: action
      type: integer
      description: "0 = disable, 1 = enable, 2 = toggle"

- id: change_page
  label: Change GUI Page
  kind: action
  params:
    - name: delta
      type: integer
      description: Number of pages to change (positive = next, negative = previous)

- id: loadp
  label: Load Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-based; 0 = built-in preset). Older versions also accept Config_n.xml syntax.

- id: get_current_preset
  label: Get Current Preset
  kind: action
  params: []

- id: get_label
  label: Get Preset Label
  kind: action
  params:
    - name: n
      type: integer
      description: Preset number

- id: get_all_label
  label: Get All Preset Labels
  kind: action
  params: []

- id: profile
  label: Set Source Profile
  kind: action
  params:
    - name: source
      type: integer
      description: Source number (0-based)

- id: upmixer
  label: Set Upmixer Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "Mode: auro3d | dts | dolby | auto | native | legacy | upmix on | + (next) | - (previous)"

- id: fav_light
  label: Light Button
  kind: action
  params: []

- id: get_current_profile
  label: Get Current Source Profile
  kind: action
  params: []

- id: get_profile_name
  label: Get Source Profile Name
  kind: action
  params:
    - name: n
      type: integer
      description: Source profile number

- id: bye
  label: Close Connection
  kind: action
  params: []
  notes: TCP only. RS-232: do not use.

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: Requires SECURED FHZMCH48FE token. Example: power off SECURED FHZMCH48FE
```

## Feedbacks
```yaml
- id: VOLUME
  label: Volume State
  type: number
  description: Current main volume in dB

- id: MUTE
  label: Mute State
  type: enum
  values: [0, 1]
  description: "0 = not muted, 1 = muted"

- id: DIM
  label: Dim State
  type: enum
  values: [0, 1]
  description: "0 = dim disabled, 1 = dim enabled"

- id: BYPASS
  label: Bypass State
  type: enum
  values: [0, 1]
  description: "0 = bypass disabled, 1 = bypass enabled"

- id: META_PRESET_LOADED
  label: Preset Loaded
  type: string
  description: Active profile/source name

- id: SRATE
  label: Sample Rate
  type: string
  description: Current audio sampling rate

- id: AUDIOSYNC_STATUS
  label: Audio Sync Status
  type: enum
  values: [0, 1]
  description: "0 = not synchronized, 1 = synchronized with audio source"

- id: AUDIOSYNC
  label: Audio Sync Mode
  type: string
  description: "Master or Slave"

- id: SPEAKER_INFO
  label: Speaker Info
  type: string
  description: "Spherical coordinates per calibrated loudspeaker (sent on preset load)"

- id: START_RUNNING
  label: Start Running
  type: string
  description: Device ready to make sound (sent after preset load)

- id: LABELS_CLEAR
  label: Labels Clear
  type: string
  description: Sent before preset list when client requests all labels

- id: LABEL
  label: Preset Label
  type: string
  description: "<n>: <name> - preset number and name pair

- id: BYE
  label: Bye
  type: string
  description: Server closing connection (TCP only)
```

## Variables
```yaml
# UNRESOLVED: no settable parameter variables beyond discrete actions documented
```

## Events
```yaml
# Device sends unsolicited state-change messages to all connected clients.
# Events listed above in Feedbacks section are also emitted as push notifications.
# UNRESOLVED: complete event catalog - source lists main messages only, not exhaustive
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for:
  - power off  # requires SECURED FHZMCH48FE token
interlocks:
  - Wake on LAN requires automation server and SDP-75 on same sub-network (same first 3 octets of IPv4)
  - Power on via trigger input: 5-12 V required
  - Power off via trigger: switch from 5-12 V to 0 V
  - Trigger output provides 12 V when SDP-75 is powered on
  - Wake on LAN MAC address displayed on network information page of GUI
  - Power on not possible via RS-232 or TCP/IP (those interfaces are off when processor is off)
```

## Notes
- Protocol is bidirectional push — device sends state-change messages to all connected clients; polling not recommended.
- TCP: client must send `id <identifier>` after connecting before issuing commands; identification is not authentication.
- RS-232: no identification required; device is immediately in command mode upon connection.
- RS-232 connector not present on all machines — check available connectors on unit.
- Protocol described as SMTP/FTP/HTTP-like; ASCII text lines with `\n`, `\r`, or `\r\n` terminators.
- Commands are case-sensitive.
- Compatibility note: protocol evolution will maintain backward compatibility.
- Contact for questions: csupport@harman.com
- Note: welcome message identifies device as "Trinnov Optimizer" — SDP-75 appears to be a JBL-branded Trinnov Altitude platform.
<!-- UNRESOLVED: full machine type enumeration from ID field not documented -->
<!-- UNRESOLVED: complete list of upmixer modes not fully enumerated in source -->
<!-- UNRESOLVED: trigger input connector type/pinout not stated -->

## Provenance

```yaml
source_domains:
  - jblsynthesis.com
source_urls:
  - "https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw45d0257f/pdfs/JBL%20Synthesis%20SDP-75_Automation%20Protocol%20Guide.pdf"
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw07c644ac/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-05-12T19:04:37.910Z
last_checked_at: 2026-05-14T05:46:56.945Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T05:46:56.945Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions matched the source document with correct parameter shapes; transport parameters verified against protocol specifications."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
