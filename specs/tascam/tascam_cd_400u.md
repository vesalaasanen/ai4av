---
spec_id: admin/tascam-cd-400u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tascam CD-400U/CD-400UDAB Control Spec"
manufacturer: Tascam
model_family: CD-400U
aliases: []
compatible_with:
  manufacturers:
    - Tascam
  models:
    - CD-400U
    - CD-400UDAB
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cf.tascam.com
source_urls:
  - https://cf.tascam.com/wp-content/uploads/downloads/products/tascam/cd-400u/rs-232c_protocol_cd400u_v1.21_e.pdf
retrieved_at: 2026-04-30T01:50:57.652Z
last_checked_at: 2026-05-14T18:17:21.207Z
generated_at: 2026-05-14T18:17:21.207Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.207Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 38 spec actions matched to source commands with correct wire tokens, parameters, and transport specs verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Tascam CD-400U/CD-400UDAB Control Spec

## Summary
CD-400U/CD-400UDAB is a networked CD/media player controllable via RS-232C serial and Ethernet (TELNET). Both interfaces use 2-byte ASCII command format with machine ID fixed at 0. Commands require 100ms minimum interval between transmissions.

<!-- UNRESOLVED: TELNET port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from TELNET mention
serial:
  baud_rate: 4800  # menu-selectable: 4800/9600/19200/38400/57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TELNET port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
```

## Actions
```yaml
- id: stop
  label: STOP
  kind: action
  params: []
- id: play
  label: PLAY
  kind: action
  params: []
- id: ready
  label: READY
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=ReadyON
- id: search
  label: SEARCH
  kind: action
  params:
    - name: direction
      type: integer
      description: 0=forward, 1=reverse
    - name: speed
      type: integer
      description: 0=normal, 1=high
- id: eject
  label: EJECT
  kind: action
  params: []
- id: track_skip
  label: TRACK SKIP
  kind: action
  params:
    - name: direction
      type: integer
      description: 0=next, 1=previous
- id: direct_track_search
  label: DIRECT TRACK SEARCH PRESET
  kind: action
  params:
    - name: track
      type: integer
      description: Track number (max 999 MP3/WAV, 99 CD-DA)
- id: resume_play_select
  label: RESUME PLAY SELECT
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=off, 1=on, F=sense
- id: repeat_select
  label: REPEAT SELECT
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=off, 1=on, F=sense
- id: incr_play_select
  label: INCR PLAY SELECT
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=off, 1=on, F=sense
- id: clear
  label: CLEAR
  kind: action
  params: []
- id: remote_local_select
  label: REMOTE/LOCAL SELECT
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=remote only, 1=remote+front key, 2=serial only, 3=IR disable, F=sense
- id: play_mode_select
  label: PLAY MODE SELECT
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=continuous, 1=single, 6=random
- id: mecha_status_sense
  label: MECHA STATUS SENSE
  kind: action
  params: []
- id: track_no_sense
  label: TRACK No. SENSE
  kind: action
  params: []
- id: media_status_sense
  label: MEDIA STATUS SENSE
  kind: action
  params: []
- id: current_track_info_sense
  label: CURRENT TRACK INFORMATION SENSE
  kind: action
  params: []
- id: current_track_time_sense
  label: CURRENT TRACK TIME SENSE
  kind: action
  params:
    - name: type
      type: integer
      description: 0=elapsed, 1=remaining, 2=total elapsed, 3=total remaining
- id: total_track_time_sense
  label: TOTAL TRACK No./TOTAL TIME SENSE
  kind: action
  params: []
- id: error_sense
  label: ERROR SENSE
  kind: action
  params: []
- id: caution_sense
  label: CAUTION SENSE
  kind: action
  params: []
- id: vendor_command
  label: VENDOR COMMAND
  kind: action
  params:
    - name: category_code
      type: string
    - name: sub_command
      type: string
    - name: parameters
      type: string
- id: device_select
  label: DEVICE SELECT
  kind: action
  params:
    - name: device
      type: integer
      description: 0=SD, 10=USB, 11=CD, 20=Bluetooth, 30=FM/DAB, 31=AM/FM, 40=AUX
- id: play_area_select
  label: PLAY AREA SELECT
  kind: action
  params:
    - name: area
      type: integer
      description: 0=all, 1=folder no skip, F=folder skip
- id: enter
  label: ENTER
  kind: action
  params:
    - name: action
      type: integer
      description: 0=release, 1=push
- id: back
  label: BACK
  kind: action
  params:
    - name: action
      type: integer
      description: 0=release, 1=push, 2=push and hold
```

## Feedbacks
```yaml
- id: information_return
  label: INFORMATION RETURN
  type: object
  fields:
    - name: version
      type: string
      description: 4-byte ASCII software version (e.g. 0123 = v01.23)
- id: mecha_status_return
  label: MECHA STATUS RETURN
  type: enum
  values:
    - "00": No Media
    - "01": Preparing for disc ejection
    - "10": Stop
    - "11": Play
    - "12": Ready
    - "28": Searching forward
    - "29": Searching backward
    - "81": Record
    - "82": Record ready
    - "83": Information writing
    - "FF": Other
- id: track_no_return
  label: TRACK No. RETURN
  type: object
  fields:
    - name: track
      type: integer
      description: Current track number (4-digit BCD)
- id: media_status_return
  label: MEDIA STATUS RETURN
  type: object
  fields:
    - name: presence
      type: string
      description: "00=no media, 01=media loaded"
    - name: media_type
      type: string
      description: "00=CD-DA/SD/USB, 10=CD-ROM"
- id: current_track_info_return
  label: CURRENT TRACK INFORMATION RETURN
  type: object
  fields:
    - name: track
      type: integer
    - name: minutes
      type: integer
    - name: seconds
      type: integer
- id: current_track_time_return
  label: CURRENT TRACK TIME RETURN
  type: object
  fields:
    - name: time_type
      type: integer
    - name: minutes
      type: integer
    - name: seconds
      type: integer
- id: total_track_time_return
  label: TOTAL TRACK No./TOTAL TIME RETURN
  type: object
  fields:
    - name: total_tracks
      type: integer
    - name: total_minutes
      type: integer
    - name: total_seconds
      type: integer
- id: error_sense_return
  label: ERROR SENSE RETURN
  type: object
  fields:
    - name: code
      type: string
      description: Error code N1-N2N3
- id: caution_sense_return
  label: CAUTION SENSE RETURN
  type: object
  fields:
    - name: code
      type: string
      description: Caution code N1-N2N3
- id: change_status
  label: CHANGE STATUS
  type: object
  fields:
    - name: type
      type: string
      description: "00=mechanism status change, 03=track/preset/frequency/EOM change"
- id: power_on_status
  label: POWER ON STATUS
  type: object
- id: illegal_status
  label: ILLEGAL STATUS
  type: object
- id: device_select_return
  label: DEVICE SELECT RETURN
  type: object
  fields:
    - name: device
      type: string
- id: play_area_select_return
  label: PLAY AREA SELECT RETURN
  type: object
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found - all parameters are action-based
```

## Events
```yaml
- id: error_sense_request
  label: ERROR SENSE REQUEST
  description: Device sends when error occurs
- id: caution_sense_request
  label: CAUTION SENSE REQUEST
  description: Device sends when caution state occurs
- id: illegal_status
  label: ILLEGAL STATUS
  description: Device sends when invalid command received
- id: power_on_status
  label: POWER ON STATUS
  description: Device sends on power-on
- id: change_status
  label: CHANGE STATUS
  description: Device sends on state transition
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Commands require 100ms minimum interval. Machine ID fixed at 0; non-zero IDs are ignored. No ACK sent for transport or preset commands; return commands only sent in response to sense queries. ILLEGAL STATUS (F2) returned for invalid data values.
<!-- UNRESOLVED: TELNET port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: serial connector pinout beyond basic Tx/Rx/GND not exploitable via RS-232C control -->

## Provenance

```yaml
source_domains:
  - cf.tascam.com
source_urls:
  - https://cf.tascam.com/wp-content/uploads/downloads/products/tascam/cd-400u/rs-232c_protocol_cd400u_v1.21_e.pdf
retrieved_at: 2026-04-30T01:50:57.652Z
last_checked_at: 2026-05-14T18:17:21.207Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.207Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 38 spec actions matched to source commands with correct wire tokens, parameters, and transport specs verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
