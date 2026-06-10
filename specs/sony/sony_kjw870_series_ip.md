---
spec_id: admin/sony-kjw870-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJW870 Series Control Spec"
manufacturer: Sony
model_family: "KJW870 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KJW870 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-09T01:57:29.266Z
last_checked_at: 2026-06-09T07:22:55.007Z
generated_at: 2026-06-09T07:22:55.007Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models have 3 RED-DA specification variants with different available commands; spec not enumerated."
  - "full IR table copied here as enum values; see Notes."
  - "source does not describe multi-step sequences."
  - "source does not document safety warnings, interlocks, or power-on sequencing."
  - "setInput port number range (1-9999) and power/volume/mute param byte values copied verbatim from source prose. Max/min volume value bounds not stated. Connection keepalive / reconnection behavior not stated."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:22:55.007Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched verbatim in source command table; transport and shapes verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony KJW870 Series Control Spec

## Summary
Simple IP control protocol for Sony KJW870 Series professional displays. Uses fixed 24-byte TCP frames on port 20060 with FourCC command mnemonics. Supports power, input, volume, mute, picture mute, scene setting, IR-passthrough, and network info commands.

<!-- UNRESOLVED: EU models have 3 RED-DA specification variants with different available commands; spec not enumerated. -->

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
- powerable       # inferred from setPowerStatus / togglePowerStatus
- routable        # inferred from setInput (HDMI/Composite/Component/Screen Mirroring)
- queryable       # inferred from getPowerStatus, getInput, getAudioVolume, getAudioMute, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- levelable       # inferred from setAudioVolume
```

## Actions
```yaml
# All commands are 24-byte fixed-size frames:
#   Byte[0-1]  Header   0x2A 0x53 ("*S")
#   Byte[2]    Type     0x43[C] Control | 0x45[E] Enquiry | 0x41[A] Answer | 0x4E[N] Notify
#   Byte[3-6]  Command  FourCC
#   Byte[7-22] Params   16 bytes
#   Byte[23]   Footer   0x0A
# ASCII form shown below as "*S" + type char + FourCC + 16-char params + "\n".

- id: set_ircc_code
  label: Set IR Command Code
  kind: action
  command: "*SCIRCC"  # followed by 16-byte IR parameter; see Feedbacks/Variables for table
  params: []

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{0|1}"  # trailing byte: 0=Standby, 1=Active
  params:
    - name: state
      type: integer
      description: 0=Standby (Off), 1=Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{XXXXXXXXXXXXXX29}"  # zero-padded decimal on the right; e.g. 0000000000000029
  params:
    - name: level
      type: integer
      description: Volume value, right-padded with zeros in 16-byte field

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{0|1}"  # trailing byte: 0=Unmute, 1=Mute
  params:
    - name: state
      type: integer
      description: 0=Unmute, 1=Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00000000000{1|3|4|5}000{XXXX}"  # type 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; then 4-digit port (1-9999)
  params:
    - name: input_type
      type: integer
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Port number (1-9999)

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{0|1}"  # trailing byte: 0=Disabled, 1=Enabled
  params:
    - name: state
      type: integer
      description: 0=Disable picture mute, 1=Enable (screen black)

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value###########}"  # right-padded with "#"; case-sensitive; e.g. auto24pSync#####
  params:
    - name: scene
      type: string
      description: "Scene name; one of: auto, auto24pSync, general (right-padded with '#')"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address (EU models)
  kind: query
  command: "*SEBADReth0###########"  # interface id "eth0" left-aligned in 4-byte slot
  params:
    - name: interface
      type: string
      description: "Interface identifier (e.g. 'eth0')"

- id: get_mac_address
  label: Get MAC Address (EU models)
  kind: query
  command: "*SEMADReth0###########"
  params:
    - name: interface
      type: string
      description: "Interface identifier (e.g. 'eth0')"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: audio_mute_state
  type: enum
  values: [muted, unmuted]

- id: picture_mute_state
  type: enum
  values: [enabled, disabled]

- id: current_input
  type: string
  description: "Active input as FourCC-encoded value (type 1/3/4/5 + 4-digit port)"

- id: scene_setting
  type: string

- id: broadcast_address
  type: string  # e.g. "192.168.0.14", right-padded with "#"

- id: mac_address
  type: string  # right-padded with "#"
```

## Variables
```yaml
# IR command codes (parameter table for setIrccCode)
# Each entry: 14 leading "0" bytes + 2 ASCII hex digit code.
# Emit one variable per code; values right-padded with "0" to 16 bytes total.
# UNRESOLVED: full IR table copied here as enum values; see Notes.
- name: ir_code
  type: string
  description: "IR command mnemonic (see ir_commands table in Notes)"
```

## Events
```yaml
# Notify (0x4E) messages - unsolicited, monitor-to-client
- id: power_change
  fourcc: POWR
  description: "Sent on power state change. Last param byte 0=powering off, 1=powering on."

- id: input_change
  fourcc: INPT
  description: "Sent on input change. Type+port as per setInput parameter layout."

- id: volume_change
  fourcc: VOLU
  description: "Sent on volume change. 16-byte zero-padded decimal volume value."

- id: mute_change
  fourcc: AMUT
  description: "Sent on mute state change. Last byte 0=unmuted, 1=muted."

- id: picture_mute_change
  fourcc: PMUT
  description: "Sent on picture mute change. Last byte 0=enabled, 1=disabled."
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing.
```

## Notes
Protocol uses fixed 24-byte frames wrapped as `*S` + type char + FourCC + 16 params + LF. Power-off example from source: request `*SCPOWR0000000000000000` → response `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (Accept + state notify).

EU models ship in 3 RED-DA specification variants; not all commands available on all variants. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for per-spec command availability.

IR command codes (parameter for setIrccCode) — verbatim from source:

| IR Command | Last 2 hex bytes |
|---|---|
| Display | 5 |
| Home | 6 |
| Options | 7 |
| Return | 8 |
| Up | 9 |
| Down | 10 |
| Right | 11 |
| Left | 12 |
| Confirm | 13 |
| Red | 14 |
| Green | 15 |
| Yellow | 16 |
| Blue | 17 |
| Num1 | 18 |
| Num2 | 19 |
| Num3 | 20 |
| Num4 | 21 |
| Num5 | 22 |
| Num6 | 23 |
| Num7 | 24 |
| Num8 | 25 |
| Num9 | 26 |
| Num0 | 27 |
| Volume Up | 30 |
| Volume Down | 31 |
| Mute | 32 |
| Channel Up | 33 |
| Channel Down | 34 |
| Subtitle | 35 |
| DOT | 38 |
| Picture Off | 50 |
| Wide | 61 |
| Jump | 62 |
| Sync Menu | 76 |
| Forward | 77 |
| Play | 78 |
| Rewind | 79 |
| Prev | 80 |
| Stop | 81 |
| Next | 82 |
| Pause | 84 |
| Flash Plus | 86 |
| Flash Minus | 87 |
| TV Power | 98 |
| Audio | 99 |
| Input | 101 |
| Sleep | 104 |
| Sleep Timer | 105 |
| Video 2 | 108 |
| Picture Mode | 110 |
| Demo Surround | 121 |
| HDMI 1 | 124 |
| HDMI 2 | 125 |
| HDMI 3 | 126 |
| HDMI 4 | 127 |
| Action Menu | 129 |
| Help | 130 |

<!-- UNRESOLVED: setInput port number range (1-9999) and power/volume/mute param byte values copied verbatim from source prose. Max/min volume value bounds not stated. Connection keepalive / reconnection behavior not stated. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-09T01:57:29.266Z
last_checked_at: 2026-06-09T07:22:55.007Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:22:55.007Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched verbatim in source command table; transport and shapes verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models have 3 RED-DA specification variants with different available commands; spec not enumerated."
- "full IR table copied here as enum values; see Notes."
- "source does not describe multi-step sequences."
- "source does not document safety warnings, interlocks, or power-on sequencing."
- "setInput port number range (1-9999) and power/volume/mute param byte values copied verbatim from source prose. Max/min volume value bounds not stated. Connection keepalive / reconnection behavior not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
