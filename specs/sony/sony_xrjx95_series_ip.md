---
spec_id: admin/sony-xrjx95-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony BRAVIA Professional Displays (XRJ-X95 Series) Simple IP Control Spec"
manufacturer: Sony
model_family: "XRJ-X95 series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XRJ-X95 series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
retrieved_at: 2026-05-27T10:24:14.658Z
last_checked_at: 2026-06-02T07:06:45.475Z
generated_at: 2026-06-02T07:06:45.475Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range and EU RED-DA spec variant behaviour not stated in source"
  - "any voltage/current/power-draw specs are out of scope for this control spec"
  - "EU RED-DA spec variant command availability matrix not in source."
  - "exact keep-alive / heartbeat behaviour between commands not in source."
  - "any authentication or pairing handshake for the Simple IP Control listener is not described in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:45.475Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literally in source command table with correct parameter shapes and transport port 20060 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony BRAVIA Professional Displays (XRJ-X95 Series) Simple IP Control Spec

## Summary
Simple IP Control is a 24-byte fixed-frame TCP protocol used to control Sony BRAVIA Professional Displays (XRJ-X95 series) over a local network on TCP port 20060. The spec enumerates the full set of Control (C), Enquiry (E), Answer (A), and Notify (N) messages for power, audio volume/mute, input selection, picture mute, scene setting, IR code relay, and network interface queries.

<!-- UNRESOLVED: firmware compatibility range and EU RED-DA spec variant behaviour not stated in source -->
<!-- UNRESOLVED: any voltage/current/power-draw specs are out of scope for this control spec -->

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
- powerable       # inferred from setPowerStatus, togglePowerStatus, getPowerStatus
- levelable       # inferred from setAudioVolume, getAudioVolume
- routable        # inferred from setInput, getInput
- queryable       # inferred from get* enquiry commands
```

## Actions

### Frame template

All Simple IP Control messages are 24 bytes:

| Byte offset | Type            | Length | Value (ASCII / byte)                                            |
|-------------|-----------------|--------|-----------------------------------------------------------------|
| 0–1         | Header          | 2      | `0x2A 0x53` ("*S"), fixed                                       |
| 2           | Message Type    | 1      | `C` (0x43) Control, `E` (0x45) Enquiry, `A` (0x41) Answer, `N` (0x4E) Notify |
| 3–6         | Command (FourCC)| 4      | ASCII mnemonic                                                 |
| 7–22        | Parameters      | 16     | Padded per-command (see below)                                  |
| 23          | Footer          | 1      | `0x0A` (LF), fixed                                              |

The example given by the vendor for power off is the 24-byte literal:
```
*SCPOWR0000000000000000\n
```
i.e. `0x2A 0x53 0x43 0x50 0x4F 0x57 0x52 0x30×16 0x0A`.

```yaml
# Each action uses a `command:` field with the literal 24-byte template.
# `{X}` placeholders show variable param bytes; the surrounding ASCII framing is fixed.

# ---------- Power ----------

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{on|off}\n"
  params:
    - name: state
      type: enum
      description: '`0000000000000000` = Standby (Off), `0000000000000001` = Active (On)'

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"
  params: []  # params field is `#` (don't-care) per source

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

# ---------- Audio: volume ----------

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume:016d}\n"
  params:
    - name: volume
      type: integer
      description: Decimal value zero-padded to 16 ASCII digits (e.g. `0000000000000029` for 29)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

# ---------- Audio: mute ----------

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{mute|unmute}\n"
  params:
    - name: state
      type: enum
      description: '`0000000000000000` = Unmute, `0000000000000001` = Mute'

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

# ---------- Input ----------

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00000000000{kind}0000{port:04d}\n"
  params:
    - name: kind
      type: enum
      description: '`1` HDMI, `3` Composite, `4` Component, `5` Screen Mirroring (placed at byte[14])'
    - name: port
      type: integer
      description: Port number 1-9999, zero-padded to 4 ASCII digits (bytes[18-21])

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

# ---------- Picture mute ----------

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{enabled|disabled}\n"
  params:
    - name: state
      type: enum
      description: '`0000000000000000` = disable picture mute, `0000000000000001` = turn screen black'

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
  params: []

# ---------- Scene setting ----------

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value:16}\n"
  params:
    - name: value
      type: string
      description: One of `auto`, `auto24pSync`, `general`, right-padded with `#` to 16 bytes. Strings are case-sensitive.

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

# ---------- IR relay ----------

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{code:16}\n"
  params:
    - name: code
      type: integer
      description: |
        IR code zero-padded to 16 ASCII digits. Source provides these decimal codes:
        5=Display, 6=Home, 7=Options, 8=Return, 9=Up, 10=Down, 11=Right, 12=Left,
        13=Confirm, 14=Red, 15=Green, 16=Yellow, 17=Blue,
        18..27=Num1..Num0, 30=Volume Up, 31=Volume Down, 32=Mute,
        33=Channel Up, 34=Channel Down, 35=Subtitle, 38=DOT,
        50=Picture Off, 61=Wide, 62=Jump, 76=Sync Menu, 77=Forward, 78=Play,
        79=Rewind, 80=Prev, 81=Stop, 82=Next, 84=Pause,
        86=Flash Plus, 87=Flash Minus, 98=TV Power, 99=Audio,
        101=Input, 104=Sleep, 105=Sleep Timer, 108=Video 2,
        110=Picture Mode, 121=Demo Surround,
        124..127=HDMI 1..HDMI 4, 129=Action Menu, 130=Help.

# ---------- Network interface queries ----------

- id: get_broadcast_address
  label: Get Broadcast Address (Interface)
  kind: query
  command: "*SEBADReth0##########\n"
  params:
    - name: interface
      type: string
      description: 'Source example uses `eth0` (4 ASCII chars in bytes[7-10]). Pad remainder with `#`.'

- id: get_mac_address
  label: Get MAC Address (Interface)
  kind: query
  command: "*SEMADReth0##########\n"
  params:
    - name: interface
      type: string
      description: 'Source example uses `eth0` (4 ASCII chars in bytes[7-10]). Pad remainder with `#`.'
```

## Feedbacks
```yaml
# Values are the 16-byte param field of the corresponding A-type (Answer) frame.
# Success rows use the value `0000000000000000` (or the actual value); error rows use `FFFFFFFFFFFFFFFF`.

- id: power_state
  type: enum
  values: [standby, active]  # from getPowerStatus answer bytes[21]: 0=Standby, 1=Active

- id: audio_volume
  type: integer  # decimal value embedded in 16-byte zero-padded param field of getAudioVolume answer

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]  # from getAudioMute answer bytes[21]: 0=Not Muted, 1=Muted

- id: current_input
  type: object  # bytes[14]=kind (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring); bytes[18..21]=port (1-9999)

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]  # from getPictureMute answer bytes[21]

- id: scene_setting
  type: enum
  values: [auto, auto24pSync, general, not_available]  # last returned as `NNNNNNNNNNNNNNNN` when input does not support it

- id: broadcast_address
  type: string  # e.g. `192.168.0.14##` right-padded with `#` per source

- id: mac_address
  type: string  # left-justified, right-padded with `#` per source

- id: answer_status
  type: enum
  values: [success, error, not_found, not_available]
  # Encoded as the 16-byte param:
  #   success        = 0000000000000000
  #   error          = FFFFFFFFFFFFFFFF
  #   not_found      = NNNNNNNNNNNNNNNN  (e.g. for setInput when target input absent)
  #   not_available  = NNNNNNNNNNNNNNNN  (e.g. for setSceneSetting/getSceneSetting)
```

## Events
```yaml
# Unsolicited Notify (N) frames from the monitor. 24-byte format identical to
# the control/enquiry frames except byte[2] = 'N'.

- id: power_change
  trigger: "*SNPOWR000000000000000{on|off}\n"
  description: Sent on power on (`…0001`) and power off (`…0000`).

- id: input_change
  trigger: "*SNINPT00000000000{kind}0000{port:04d}\n"
  description: Sent when input changes. Same byte layout as setInput.

- id: volume_change
  trigger: "*SNVOLU{volume:016d}\n"
  description: Sent when volume changes.

- id: mute_change
  trigger: "*SNAMUT000000000000000{mute|unmute}\n"
  description: Sent on mute (`…0001`) and unmute (`…0000`).

- id: picture_mute_change
  trigger: "*SNPMUT000000000000000{enabled|disabled}\n"
  description: Sent when picture mute state changes.
```

## Notes
- Source URL: https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
- Vendor's netcat example for power off:
  - Request:  `*SCPOWR0000000000000000\n`
  - Response: `*SAPOWR0000000000000000 *SNPOWR0000000000000000`
    (Acceptance answer, then Notify giving the new power state.)
- The 24-byte frame is fully fixed-length; clients should send exactly 24 bytes per command. For Control messages without a meaningful parameter, send the `setPowerStatus` form with all-zero params or use the `toggle*` variants.
- `setPowerStatus`, `setAudioMute`, `setPictureMute` use a trailing single byte (`…0000` / `…0001`) inside the 16-byte param field (byte[22]); the rest of the 16-byte field is zero.
- `setInput` encodes the input kind in byte[14] and the 1–9999 port number in bytes[18..21] (zero-padded). Source gives examples for HDMI(1), Composite(3), Component(4), Screen Mirroring(5).
- `setSceneSetting` parameter is a string right-padded to 16 bytes with `#`. Valid values: `auto`, `auto24pSync`, `general` (case-sensitive).
- `getBroadcastAddress` / `getMacAddress` carry the interface name in the first 4 param bytes (source example: `eth0`); pad the remaining 12 bytes with `#`.
- Vendor note on EU models: "EU area models have 3 types of specifications based on RED-DA compliance. Settings and available commands differ for each specification." Behaviour for the three EU sub-specs is not enumerated in the source — treat as device-dependent.
- Source typo: notify event name `firePicture MuteChange` (space inside) is rendered here as `picture_mute_change` (Command FourCC = `PMUT`, identical to get/set).

<!-- UNRESOLVED: EU RED-DA spec variant command availability matrix not in source. -->
<!-- UNRESOLVED: exact keep-alive / heartbeat behaviour between commands not in source. -->
<!-- UNRESOLVED: any authentication or pairing handshake for the Simple IP Control listener is not described in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
retrieved_at: 2026-05-27T10:24:14.658Z
last_checked_at: 2026-06-02T07:06:45.475Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:45.475Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literally in source command table with correct parameter shapes and transport port 20060 confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range and EU RED-DA spec variant behaviour not stated in source"
- "any voltage/current/power-draw specs are out of scope for this control spec"
- "EU RED-DA spec variant command availability matrix not in source."
- "exact keep-alive / heartbeat behaviour between commands not in source."
- "any authentication or pairing handshake for the Simple IP Control listener is not described in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
