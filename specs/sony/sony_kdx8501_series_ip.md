---
spec_id: admin/sony-kdx8501-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8501 Series Control Spec"
manufacturer: Sony
model_family: "KDX8501 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8501 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/samples-and-documentation/
retrieved_at: 2026-09-02T17:43:36.454Z
last_checked_at: 2026-09-22T11:43:05.881Z
generated_at: 2026-09-22T11:43:05.881Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA variants may differ in available commands and settings."
  - "source documents fixed parameter slots rather than named variables"
  - "source does not define multi-step sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "exact list of RED-DA spec variants and their command restrictions — referenced as external link."
  - "IR command codes beyond the table excerpt are not enumerated here in full (42 codes listed in source)."
verification:
  verdict: verified
  checked_at: 2026-09-22T11:43:05.881Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions map1:1 to source commands (POWR, VOLU, AMUT, INPT, PMUT, SCEN, IRCC, BADR, MADR plus toggle variants); TCP 20060 verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Sony KDX8501 Series Control Spec

## Summary
Simple IP Control protocol for Sony BRAVIA Professional Displays (KDX8501 Series). Uses fixed24-byte TCP messages on port 20060. Supports power, volume, mute, picture mute, input selection, scene setting, IR-emulation commands, and broadcast/MAC address queries over a local network.

<!-- UNRESOLVED: EU RED-DA variants may differ in available commands and settings. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
# Each command is a fixed 24-byte message: header "*S" (0x2A 0x53) +
# message type char (C=Control, E=Enquiry, A=Answer, N=Notify) +
# FourCC command (4 ASCII chars) + 16-byte parameter field +
# footer0x0A (LF). Parameters are zero-padded ASCII unless noted.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{0|1}\n"  # 0=Standby, 1=Active
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "* SCTPOW################\n"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded}\n"  # 16 ASCII digits, left-padded with 0; e.g. 0000000000000029
  params:
    - name: volume
      type: integer
      description: Volume value as16-digit left-zero-padded decimal in parameter field

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{0|1}\n"  # 0=Unmute, 1=Mute
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00000000{src_type}000{port}\n"  # src_type 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; port 1-9999
  params:
    - name: source_type
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Port number 1-9999

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{0|1}\n"  # 0=Disabled, 1=Enabled (screen black)
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Picture mute off, 1 = Picture mute on (screen black)

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_padded}\n"  # 16-char right-padded with "#"; values: auto, auto24pSync, general (case-sensitive)
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
      description: Scene name, right-padded to16 chars with "#"; case-sensitive

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: set_ircc_code
  label: Send IR Code  kind: action
  command: "*SCIRCC{ir_code_padded}\n"  # 16-digit parameter; see IR Commands table for codes
  params:
    - name: ir_code
      type: string
      description: Two-digit IR code from the IR Commands table, left-padded with 0s to 16 digits

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADR{interface_padded}\n"  # e.g. "eth0##############" (right-padded with #)
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0"), right-padded to 16 chars with "#"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface_padded}\n"  # e.g. "eth0##############" (right-padded with #)
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0"), right-padded to 16 chars with "#"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: Returned by get_power_status; 0=Standby, 1=Active

- id: audio_volume
  type: integer
  description: Returned by get_audio_volume as 16-digit left-zero-padded decimal

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: Returned by get_audio_mute; 0=Not Muted, 1=Muted

- id: current_input
  type: object
  description: Returned by get_input; source_type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) and port (1-9999)

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: Returned by get_picture_mute; 0=Disabled, 1=Enabled

- id: scene_setting
  type: string
  description: Returned by get_scene_setting (e.g. auto, auto24pSync, general)

- id: broadcast_address
  type: string
  description: Returned by get_broadcast_address; IPv4 address padded right with "#"

- id: mac_address
  type: string
  description: Returned by get_mac_address; MAC padded right with "#"

- id: ack_success
  type: enum
  values: [success]
  description: Answer "A" message with all-zero parameter field (16 ASCII "0")

- id: ack_error
  type: enum
  values: [error]
  description: Answer "A" message with all-"F" parameter field (16 ASCII "F") - invalid parameters / failure- id: not_available
  type: enum
  values: [not_available]
  description: Answer "A" message with all-"N" parameter field (16 ASCII "N") - e.g. Scene Setting not available for current input

- id: not_found
  type: enum
  values: [not_found]
  description: Answer "A" message returned by setInput when input not found
```

## Variables
```yaml
# UNRESOLVED: source documents fixed parameter slots rather than named variables
# outside of action params. No independent settable variables beyond action parameters.
```

## Events
```yaml
# All "N" (Notify) messages from monitor to client. Each carries the same
# FourCC + parameter format as the corresponding control, but with the
# message type byte set to 0x4E [N].

- id: fire_power_change
  fourcc: POWR
  description: Sent when power changes; 0=powering off, 1=powering on

- id: fire_input_change
  fourcc: INPT
  description: Sent when input changes; same encoding as setInput params

- id: fire_volume_change
  fourcc: VOLU
  description: Sent when volume changes; same encoding as setAudioVolume params

- id: fire_mute_change
  fourcc: AMUT
  description: Sent when mute state changes; 0=unmuting, 1=muting

- id: fire_picture_mute_change
  fourcc: PMUT
  description: Sent when picture mute changes; 0=enabled, 1=disabled
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
# Note: EU RED-DA compliance may restrict which commands are available; operators must check
# regional spec variant before issuing commands.
```

## Notes
- Protocol frame is exactly 24 bytes: header `*S` (0x2A 0x53) + msg type (C/E/A/N) + FourCC + 16-byte param + LF (0x0A).
- Parameter fields are 16 ASCII characters. Numeric values are zero-padded; strings are right-padded with "#" (case-sensitive).
- Source documents 3 EU specification variants under RED-DA compliance with differing settings/commands.
- TCP listen port 20060; no authentication required.
- Both wired and wireless LAN supported.
- Required monitor settings: Settings → Network & Internet → Remote device settings → Control remotely, AND Settings → Network & Internet → Home network → IP control → Simple IP control.
- getBroadcastAddress / getMacAddress marked "* EU models Note": availability may vary by region/spec.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact list of RED-DA spec variants and their command restrictions — referenced as external link. -->
<!-- UNRESOLVED: IR command codes beyond the table excerpt are not enumerated here in full (42 codes listed in source). -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/samples-and-documentation/
retrieved_at: 2026-09-02T17:43:36.454Z
last_checked_at: 2026-09-22T11:43:05.881Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:43:05.881Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions map1:1 to source commands (POWR, VOLU, AMUT, INPT, PMUT, SCEN, IRCC, BADR, MADR plus toggle variants); TCP 20060 verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA variants may differ in available commands and settings."
- "source documents fixed parameter slots rather than named variables"
- "source does not define multi-step sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "exact list of RED-DA spec variants and their command restrictions — referenced as external link."
- "IR command codes beyond the table excerpt are not enumerated here in full (42 codes listed in source)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
