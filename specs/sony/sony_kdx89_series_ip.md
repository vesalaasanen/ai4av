---
spec_id: admin/sony-kdx89-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX89 Series Simple IP Control Spec"
manufacturer: Sony
model_family: KD-43X89J
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-43X89J
    - KD-50X89J
    - KD-55X89J
    - KD-65X89J
    - KD-75X89J
    - KD-43X89K
    - KD-50X89K
    - KD-55X89K
    - KD-65X89K
    - KD-75X89K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/interfaces-for-control/simple-ip-control/
  - https://pro-bravia.sony.net/interfaces-for-control/rest-api/
  - https://pro-bravia.sony.net/setup/device-settings/red-da/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-08T16:36:59.577Z
last_checked_at: 2026-06-12T19:50:56.350Z
generated_at: 2026-06-12T19:50:56.350Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "exact firmware range that supports this protocol not stated in source"
  - "EU RED-DA variant differences in supported commands not enumerated in source"
  - "source documents scene_setting as a settable string but treats it as a"
  - "source does not document any multi-step sequences"
  - "source does not contain safety warnings, interlock procedures,"
  - "fields that could not be determined from the source, with explanation."
  - "firmware version compatibility range for this protocol not stated in source"
  - "exact differences between the 3 EU RED-DA variants not enumerated in source"
  - "maximum supported volume value (sample was \"0000000000000029\"=41; full range not stated)"
  - "behavior on TCP disconnect / keep-alive policy not stated in source"
  - "whether multiple concurrent TCP clients are supported (not stated in source)"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:50:56.350Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions match source commands with correct FourCC codes, parameters, and message types. Port 20060 verified. Complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDX89 Series Simple IP Control Spec

## Summary
Simple IP Control protocol for Sony Bravia KDX89 Series displays. TCP-based,
24-byte fixed-length ASCII messages, port 20060. Covers power, input, volume,
mute, picture mute, scene setting, IR pass-through, and network address
queries. EU models have three RED-DA variants with different available
commands.

<!-- UNRESOLVED: list any major gaps here -->
<!-- UNRESOLVED: exact firmware range that supports this protocol not stated in source -->
<!-- UNRESOLVED: EU RED-DA variant differences in supported commands not enumerated in source -->

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
- powerable       # inferred from setPowerStatus / togglePowerStatus / firePowerChange
- routable        # inferred from setInput / getInput / fireInputChange
- queryable       # inferred from get*Status / get* query commands
- levelable       # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
# Frame layout (24 bytes):
#   [0-1]   Header: 0x2A 0x53 ("*S")
#   [2]     Type: 0x43 'C'=Control, 0x45 'E'=Enquiry, 0x41 'A'=Answer, 0x4E 'N'=Notify
#   [3-6]   FourCC command (4 ASCII chars)
#   [7-22]  Parameter (16 bytes, ASCII digits or padding; "#"=unused, "0"-padded, "F"*16=error, "N"*16=not available)
#   [23]    Footer: 0x0A (LF)
#
# Command templates shown as ASCII strings for clarity; "#" denotes a wildcard/pad byte.
# Successful Control/Enquiry receives an Answer with 16 "0" bytes.
# Errors are answered with 16 "F" bytes.
# "Not available for current input" answers use 16 "N" bytes (scene setting only).

- id: set_ircc_code
  label: Send IR Remote Code (setIrccCode)
  kind: action
  command: "*SCIRCC{ircc_param_padded_16}"  # Byte[7-22] = IR code padded with '0' to 16 chars
  params:
    - name: ircc_param
      type: string
      description: IR command code from the IR Commands table (last 2 digits shown, full 16-char param in source)

- id: set_power_status
  label: Set Power Status (setPowerStatus)
  kind: action
  command: "*SCPOWR000000000000000{on_off}"  # 16-byte param ending in 0=standby, 1=active
  params:
    - name: on_off
      type: integer
      enum: [0, 1]
      description: 0 = standby (off), 1 = active (on)

- id: get_power_status
  label: Get Power Status (getPowerStatus)
  kind: query
  command: "*SEPOWR################"  # 16 "#" param for enquiry
  params: []

- id: toggle_power_status
  label: Toggle Power Status (togglePowerStatus)
  kind: action
  command: "*SCTPOW################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume (setAudioVolume)
  kind: action
  command: "*SCVOLU00000000000{volume_padded_5}"  # 16-byte param, right-justified 5-digit decimal, leading '0'
  params:
    - name: volume
      type: integer
      description: Volume value, right-justified decimal, padded with leading '0' to 16 bytes total (e.g. "0000000000000029" = 41)

- id: get_audio_volume
  label: Get Audio Volume (getAudioVolume)
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute (setAudioMute)
  kind: action
  command: "*SCAMUT000000000000000{mute_on_off}"  # 0 = unmute, 1 = mute
  params:
    - name: mute_on_off
      type: integer
      enum: [0, 1]
      description: 0 = mute off, 1 = mute on

- id: get_audio_mute
  label: Get Audio Mute (getAudioMute)
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input (setInput)
  kind: action
  command: "*SCINPT00000000000{kind}{port_padded_4}"  # kind digit at byte[14], port (1-9999) at bytes[18-21]
  params:
    - name: kind
      type: integer
      enum: [1, 3, 4, 5]
      description: 1 = HDMI, 3 = composite, 4 = component, 5 = screen mirroring
    - name: port
      type: integer
      description: Port number 1-9999, right-justified 4-digit decimal

- id: get_input
  label: Get Input (getInput)
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute (setPictureMute)
  kind: action
  command: "*SCPMUT000000000000000{on_off}"  # 0 = off, 1 = on (blank screen)
  params:
    - name: on_off
      type: integer
      enum: [0, 1]
      description: 0 = picture mute disabled, 1 = picture mute enabled (black screen)

- id: get_picture_mute
  label: Get Picture Mute (getPictureMute)
  kind: query
  command: "*SEPMUT################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute (togglePictureMute)
  kind: action
  command: "*SCTPMU################"
  params: []

- id: set_scene_setting
  label: Set Scene Setting (setSceneSetting)
  kind: action
  command: "*SCSCEN{scene_name_padded_16}"  # 16-byte param, left-justified name, right-padded with '#'; case-sensitive
  params:
    - name: scene
      type: string
      enum: ["auto", "auto24pSync", "general"]
      description: Scene name, case-sensitive, right-padded with '#' to 16 chars (e.g. "auto24pSync#####")

- id: get_scene_setting
  label: Get Scene Setting (getSceneSetting)
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (getBroadcastAddress)
  kind: query
  command: "*SEBADREth0##############"  # EU models: only on units that can choose auth method
  params:
    - name: interface
      type: string
      enum: ["eth0"]
      description: Network interface name; source documents only "eth0"

- id: get_mac_address
  label: Get MAC Address (getMacAddress)
  kind: query
  command: "*SEMADREth0##############"  # EU models: only on units that can choose auth method
  params:
    - name: interface
      type: string
      enum: ["eth0"]
      description: Network interface name; source documents only "eth0"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [active, standby]
  description: From getPowerStatus Answer; "0"=standby, "1"=active

- id: audio_volume
  type: integer
  description: From getAudioVolume Answer; right-justified decimal in 16-byte param (e.g. "0000000000000029" = 41)

- id: audio_mute_state
  type: enum
  values: [off, on]
  description: From getAudioMute Answer; "0"=off, "1"=on

- id: current_input
  type: object
  description: From getInput Answer; kind (1=HDMI, 3=composite, 4=component, 5=screen mirroring) and port (1-9999)

- id: picture_mute_state
  type: enum
  values: [off, on]
  description: From getPictureMute Answer; "0"=disabled, "1"=enabled

- id: scene_setting
  type: string
  description: From getSceneSetting Answer; "auto", "auto24pSync", "general" (case-sensitive)

- id: broadcast_address
  type: string
  description: From getBroadcastAddress Answer; IPv4 address left-justified, right-padded with '#' (e.g. "192.168.0.14####")

- id: mac_address
  type: string
  description: From getMacAddress Answer; MAC left-justified, right-padded with '#'
```

## Variables
```yaml
# UNRESOLVED: source documents scene_setting as a settable string but treats it as a
# discrete action (setSceneSetting). No continuous-variable parameters exposed by
# the protocol besides volume and the boolean mute/picture_mute states.
```

## Events
```yaml
- id: fire_power_change
  type: enum
  values: [standby, active]
  description: Notify "NPOWR..." sent on power change; "0"=standby, "1"=active

- id: fire_input_change
  type: object
  description: Notify "NINPT..." sent on input change; payload = kind (1/3/4/5) + port (1-9999)

- id: fire_volume_change
  type: integer
  description: Notify "NVOLU..." sent on volume change; 16-byte right-justified decimal

- id: fire_mute_change
  type: enum
  values: [off, on]
  description: Notify "NAMUT..." sent on mute change; "0"=mute off, "1"=mute on

- id: fire_picture_mute_change
  type: enum
  values: [off, on]
  description: Notify "NPMUT..." sent on picture mute change; "0"=disabled, "1"=enabled
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the on-screen settings menu path
# ([Settings] > [Network & Internet] > [Home Network] > [IP Control] > [Simple IP Control]).
```

## Notes
- Protocol: Sony "Simple IP Control" (簡易IPコントロール), CIS/AV integrator-facing.
- Transport: TCP, port 20060. 24-byte fixed-length ASCII frames.
- Frame anatomy: `*S` (0x2A 0x53) header, type byte, 4-char FourCC, 16-byte parameter, `0x0A` LF footer.
- Parameter padding: 16 bytes, digit `'0'` for unused fields, `'#'` for wildcards, all `'F'` for error, all `'N'` for "not available for current input" (scene setting only).
- Reply semantics: Control/Enquiry gets an Answer (`A`) with `0`*16 on success, `F`*16 on error. Scene setting additionally has `N`*16 for "not available for current input".
- EU sales models: per source, RED-DA compliance splits them into 3 variants. `getBroadcastAddress` and `getMacAddress` are unavailable on EU units that cannot choose auth method. Confirm variant via Settings > Network & Internet > Home Network > IP Control menu.
- Required display setup (must be done by user/integrator on the TV):
  1. Enable Remote Device Control: Settings > Network & Internet > Mobile Device Settings > Remote Control.
  2. Enable Simple IP Control: Settings > Network & Internet > Home Network > IP Control > Simple IP Control.
- IR pass-through: `setIrccCode` sends an IR-equivalent code. See IR Commands table in source for the 16-byte parameter per code (Display, Home, Options, Return, arrows, 0-9, Vol ±, Mute, Ch ±, transport keys, etc.).
- All command/answer frames end in `0x0A` (LF); the 16-byte parameter is itself ASCII, so the wire format is printable ASCII plus header/footer.

<!-- UNRESOLVED: fields that could not be determined from the source, with explanation. -->
<!-- UNRESOLVED: firmware version compatibility range for this protocol not stated in source -->
<!-- UNRESOLVED: exact differences between the 3 EU RED-DA variants not enumerated in source -->
<!-- UNRESOLVED: maximum supported volume value (sample was "0000000000000029"=41; full range not stated) -->
<!-- UNRESOLVED: behavior on TCP disconnect / keep-alive policy not stated in source -->
<!-- UNRESOLVED: whether multiple concurrent TCP clients are supported (not stated in source) -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/interfaces-for-control/simple-ip-control/
  - https://pro-bravia.sony.net/interfaces-for-control/rest-api/
  - https://pro-bravia.sony.net/setup/device-settings/red-da/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-08T16:36:59.577Z
last_checked_at: 2026-06-12T19:50:56.350Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:50:56.350Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions match source commands with correct FourCC codes, parameters, and message types. Port 20060 verified. Complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "exact firmware range that supports this protocol not stated in source"
- "EU RED-DA variant differences in supported commands not enumerated in source"
- "source documents scene_setting as a settable string but treats it as a"
- "source does not document any multi-step sequences"
- "source does not contain safety warnings, interlock procedures,"
- "fields that could not be determined from the source, with explanation."
- "firmware version compatibility range for this protocol not stated in source"
- "exact differences between the 3 EU RED-DA variants not enumerated in source"
- "maximum supported volume value (sample was \"0000000000000029\"=41; full range not stated)"
- "behavior on TCP disconnect / keep-alive policy not stated in source"
- "whether multiple concurrent TCP clients are supported (not stated in source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
