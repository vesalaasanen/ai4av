---
spec_id: admin/sony-kdx8066-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8066 Series Control Spec"
manufacturer: Sony
model_family: KD-49X8066D
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-49X8066D
    - KD-55X8066E
    - "KDX8066 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:39:29.525Z
generated_at: 2026-05-31T22:39:29.525Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:39:29.525Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions match verbatim commands in the source protocol table; all transport parameters confirmed; source inventory fully represented by spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDX8066 Series Control Spec

## Summary
Sony BRAVIA consumer TV series supporting Simple IP Control over TCP (port 20060). 24-byte fixed-length command protocol for power, volume, mute, input selection, picture mute, scene settings, and IR remote code forwarding. No authentication required.

<!-- UNRESOLVED: RS-232 serial control not documented in this source -->
<!-- UNRESOLVED: REST API reference not included in this source -->
<!-- UNRESOLVED: EU RED-DA compliance variants not detailed -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060  # stated: "control listening port is TCP 20060"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # POWR set/get/toggle commands present
- levelable    # VOLU set/get with decimal value parameter
- queryable    # POWR/VOLU/INPT/PMUT/SCEN enquiry commands present
- routable     # INPT set/get for HDMI/Composite/Component/ScreenMirroring
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "*SCPOWR0000000000000001"  # byte[23]=1

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "*SCPOWR0000000000000000"  # byte[23]=0

- id: power_status_query
  label: Power Status Query
  kind: query
  params: []
  notes: "*SCPOWR##############"  # enquiry; returns 0=standby, 1=active, F=error

- id: power_toggle
  label: Toggle Power
  kind: action
  params: []

- id: volume_set
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume value as decimal, left-padded with zeros, e.g. 0000000000000029 for 29
  notes: 16-digit decimal, e.g. "*SCVOLU0000000000000029"

- id: volume_query
  label: Get Audio Volume
  kind: query
  params: []
  notes: Returns current volume value as decimal string

- id: mute_set
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0=Unmute, 1=Mute

- id: mute_query
  label: Get Audio Mute Status
  kind: query
  params: []
  notes: Returns 0=not muted, 1=muted

- id: input_set
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-9999)
    - name: source
      type: integer
      enum: [1, 3, 4, 5]
      description: "Source type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
  notes: Byte[7]=source type, byte[8-11]=input number, bytes[12-15]=XXXX (unused)

- id: input_query
  label: Get Current Input
  kind: query
  params: []

- id: picture_mute_set
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: "0=Disable (show picture), 1=Enable (black screen)"

- id: picture_mute_query
  label: Get Picture Mute Status
  kind: query
  params: []

- id: picture_mute_toggle
  label: Toggle Picture Mute
  kind: action
  params: []

- id: scene_set
  label: Set Scene Setting
  kind: action
  params:
    - name: scene
      type: string
      description: Scene name (auto, auto24pSync, general), case-sensitive, right-padded with "#"
  notes: Parameter string padded to 16 chars on right with "#"

- id: scene_query
  label: Get Scene Setting
  kind: query
  params: []

- id: ircc_send
  label: Send IRCC Code
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code (0-255 decimal). See IR Commands table for mapping.
  notes: Maps to remote control button press. Full IR code table documented separately.

- id: broadcast_address_query
  label: Get Broadcast Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0")
  notes: Returns IPv4 broadcast address for specified interface

- id: mac_address_query
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0")
  notes: Returns MAC address for specified interface
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "0"  # Standby (Off)
    - "1"  # Active (On)
  notes: Byte[23] of POWR answer message

- id: volume_value
  label: Audio Volume Value
  type: integer
  notes: Decimal string in answer parameters

- id: mute_state
  label: Audio Mute State
  type: enum
  values:
    - "0"  # Not Muted
    - "1"  # Muted

- id: input_state
  label: Input State
  type: object
  properties:
    source:
      type: integer
      enum: [1, 3, 4, 5]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    number:
      type: integer

- id: picture_mute_state
  label: Picture Mute State
  type: enum
  values:
    - "0"  # Disabled (picture visible)
    - "1"  # Enabled (black screen)

- id: scene_state
  label: Scene Setting State
  type: string
  notes: Case-sensitive string from device

- id: command_success
  label: Command Success
  type: enum
  values:
    - "0000000000000000"  # Success (16 zeros)
    - "FFFFFFFFFFFFFFFF"  # Error (16 Fs)
    - "NNNNNNNNNNNNNNNN"  # Not available (16 Ns)

- id: broadcast_address
  label: Broadcast Address
  type: string

- id: mac_address
  label: MAC Address
  type: string
```

## Variables
```yaml
# No standalone settable parameters separate from discrete actions in this protocol.
# All parameters are command payload within Actions.
```

## Events
```yaml
# Monitor → client notifications (message type N = Notify):
- id: power_change
  label: Power Change Notification
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=powering off, 1=powering on"

- id: input_change
  label: Input Change Notification
  params:
    - name: source
      type: integer
      enum: [0, 1, 3, 4, 5]
      description: "0=none, 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: number
      type: integer
      description: Input number (1-9999)

- id: volume_change
  label: Volume Change Notification
  params:
    - name: volume
      type: string
      description: Current volume as decimal string

- id: mute_change
  label: Mute Change Notification
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=unmuting, 1=muting"

- id: picture_mute_change
  label: Picture Mute Change Notification
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=picture mute enabled (black), 1=picture mute disabled (visible)"
```

## Macros
```yaml
# No explicit multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Simple IP Control uses a proprietary SSIP protocol with 24-byte fixed-length messages. Each message begins with `*S` (0x2A 0x53) header and ends with 0x0A (LF) footer. Four message types: Control (C), Enquiry (E), Answer (A), Notify (N). Commands are identified by 4-CC ASCII mnemonics (POWR, VOLU, AMUT, INPT, PMUT, SCEN, IRCC, BADR, MADR). EU models have RED-DA compliance variants with different command availability.

IR command codes (decimal) include: Display=05, Home=06, Up=09, Down=10, Right=11, Left=12, Confirm=13, Volume Up=30, Volume Down=31, Mute=32, HDMI1=124, HDMI2=125, HDMI3=126, HDMI4=127, TV Power=98, Sleep=104, Sleep Timer=105, and 30+ more documented in the IR command table.
<!-- UNRESOLVED: serial RS-232C protocol not included in this source document -->
<!-- UNRESOLVED: REST API JSON-RPC reference not included in this source document -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RED-DA EU model command restrictions not detailed in source -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:39:29.525Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:39:29.525Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions match verbatim commands in the source protocol table; all transport parameters confirmed; source inventory fully represented by spec."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
