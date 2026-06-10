---
spec_id: admin/sony-fwxe8501-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWXE8501 Series Control Spec"
manufacturer: Sony
model_family: FWXE8501
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - FWXE8501
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-08T14:07:24.840Z
last_checked_at: 2026-06-09T07:16:13.813Z
generated_at: 2026-06-09T07:16:13.813Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. EU models ship in 3 RED-DA tiers; supported commands vary per tier."
  - "serial/RS-232 support not stated in source. Firmware version compatibility not stated. RED-DA EU tier command differences not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:16:13.813Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions verified against source Four-CC command table; transport (TCP port 20060, no auth) confirmed; complete coverage. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony FWXE8501 Series Control Spec

## Summary
Sony BRAVIA Professional Displays (FWXE8501 series) controlled over TCP/IP using the SSIP (Simple IP Control) proprietary protocol. 24-byte fixed-size frames with Four-CC commands, default listening port 20060. EU models vary by RED-DA specification tier.

<!-- UNRESOLVED: firmware version compatibility not stated in source. EU models ship in 3 RED-DA tiers; supported commands vary per tier. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: set_ircc_code
  label: Set IRCC Code
  kind: action
  command: "*SCIRCC{code:016d}*"
  params:
    - name: code
      type: integer
      description: 16-digit decimal IR command code (see IR Commands table)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{state:016d}*"
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0=Standby (Off), 1=Active (On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################*"

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################*"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume:016d}*"
  params:
    - name: volume
      type: integer
      description: Volume value, decimal digit-padded on the left with 0 (e.g. 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################*"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{state:016d}*"
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0=Unmute, 1=Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################*"

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00{type:01d}0000{port:04d}*"
  params:
    - name: type
      type: integer
      values: [1, 3, 4, 5]
      description: "Input type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: port
      type: integer
      description: Input number (1-9999)

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################*"

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state:016d}*"
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0=Disabled (picture on), 1=Enabled (screen black)"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################*"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################*"

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene:16s}*"
  params:
    - name: scene
      type: string
      values: ["auto", "auto24pSync", "general"]
      description: Scene name, case-sensitive, right-padded with #

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################*"

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADR{interface:4s}############*"
  params:
    - name: interface
      type: string
      values: ["eth0"]
      description: Network interface name (e.g. eth0)

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface:4s}############*"
  params:
    - name: interface
      type: string
      values: ["eth0"]
      description: Network interface name (e.g. eth0)
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, active]

- id: audio_volume
  type: integer
  description: Current volume value (decimal, right-padded with F on error)

- id: audio_mute
  type: enum
  values: [unmuted, muted]

- id: input
  type: object
  description: Current input (type + port number)

- id: picture_mute
  type: enum
  values: [disabled, enabled]

- id: scene_setting
  type: string
  description: Current scene name (auto / auto24pSync / general)

- id: broadcast_address
  type: string
  description: Broadcast IPv4 address of specified interface

- id: mac_address
  type: string
  description: MAC address of specified interface
```

## Variables
```yaml
```

## Events
```yaml
- id: power_change
  trigger: "firePowerChange"
  command: "*SNPOWR{state:016d}*"
  description: Sent when power state changes (0=powering off, 1=powering on)

- id: input_change
  trigger: "fireInputChange"
  command: "*SNINPT00{type:01d}0000{port:04d}*"
  description: Sent when active input changes

- id: volume_change
  trigger: "fireVolumeChange"
  command: "*SNVOLU{volume:016d}*"
  description: Sent when volume changes

- id: mute_change
  trigger: "fireMuteChange"
  command: "*SNAMUT{state:016d}*"
  description: Sent when mute state changes

- id: picture_mute_change
  trigger: "firePictureMuteChange"
  command: "*SNPMUT{state:016d}*"
  description: Sent when picture mute state changes
```

## Macros
```yaml
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
All messages are 24 bytes fixed: 0x2A 0x53 header (bytes 0-1), message type byte (byte 2), Four-CC command (bytes 3-6), 16-byte parameter field (bytes 7-22), 0x0A LF footer (byte 23). Message types: 0x43 [C] Control, 0x45 [E] Enquiry, 0x41 [A] Answer, 0x4E [N] Notify. Parameters right-padded with 0x23 '#' for string values; right-padded with 0x46 'F' on error replies. Answer with all 0x30 '0' = success; all 0x4E 'N' = not found/not available.

Netcat example: `netcat [IP address] 20060`. Required monitor settings: Settings → Network & Internet → Remote device settings → Control remotely; Settings → Network & Internet → Home network → IP control → Simple IP control. Wired and wireless LAN supported.

EU area models have 3 RED-DA compliance specifications; settings and available commands differ per spec. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.

<!-- UNRESOLVED: serial/RS-232 support not stated in source. Firmware version compatibility not stated. RED-DA EU tier command differences not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-08T14:07:24.840Z
last_checked_at: 2026-06-09T07:16:13.813Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:16:13.813Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions verified against source Four-CC command table; transport (TCP port 20060, no auth) confirmed; complete coverage. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. EU models ship in 3 RED-DA tiers; supported commands vary per tier."
- "serial/RS-232 support not stated in source. Firmware version compatibility not stated. RED-DA EU tier command differences not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
