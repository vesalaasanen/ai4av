---
spec_id: admin/sony-kd-xxx8500e-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KD-xxX8500E Series Control Spec"
manufacturer: Sony
model_family: "KD-xxX8500E Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KD-xxX8500E Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - pro.sony
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
retrieved_at: 2026-06-20T19:31:31.585Z
last_checked_at: 2026-07-22T01:19:28.066Z
generated_at: 2026-07-22T01:19:28.066Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific firmware/version compatibility not stated; EU RED-DA variants may restrict commands."
  - "no multi-step sequences described in source."
  - "source contains no explicit safety warnings or interlock procedures."
  - "firmware version compatibility not stated in source."
  - "EU RED-DA variant command differences not enumerated in source."
  - "exact model string for KD-xxX8500E series sizes not specified by command doc."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:19:28.066Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions match source FourCC codes verbatim; source commands fully represented; transport port 20060 verified; bidirectional coverage confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-20
---

# Sony KD-xxX8500E Series Control Spec

## Summary
Sony BRAVIA consumer TV controlled via Simple IP Control, a TCP protocol on port 20060 using fixed-length 24-byte ASCII messages. Source is the Sony "Simple IP control" documentation (Bravia platform); no model-specific command doc exists for the KD-xxX8500E, so coverage reflects the shared Bravia Simple IP Control surface.

<!-- UNRESOLVED: model-specific firmware/version compatibility not stated; EU RED-DA variants may restrict commands. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

Frame format (24 bytes, ASCII): header `*S` (0x2A 0x53), message type (`C` control / `E` enquiry / `A` answer / `N` notify), 4-char FourCC command, 16-char parameter field, footer LF (0x0A). Parameter field left-padded with `0` for numeric values, right-padded with `#` for string values.

Byte layout from source:

| Byte Offset | Type | Length | Value |
| --- | --- | --- | --- |
| 0-1 | Header | 2 | 0x2A [*] 0x53 [S] (fixed) |
| 2 | Message Type | 1 | 0x43 [C] / 0x45 [E] / 0x41 [A] / 0x4E [N] |
| 3-6 | Command (FourCC) | 4 | — |
| 7-22 | Parameters | 16 | — |
| 23 | Footer | 1 | 0x0A [LF] (fixed) |

Common parameter conventions: Control/Enquiry with no param = 16×`#`; Answer success = `0000000000000000`; Answer error = `FFFFFFFFFFFFFFFF`.

## Traits
```yaml
traits:
  - powerable    # inferred: setPowerStatus / togglePowerStatus present
  - queryable    # inferred: getPowerStatus / getAudioVolume / getInput etc.
  - levelable    # inferred: setAudioVolume present
  - routable     # inferred: setInput selects HDMI/Composite/Component/Screen Mirroring
```

## Actions
```yaml
# Message type byte[2]: C = Control (client→monitor), E = Enquiry (client→monitor).
# Parameter field below shown after the 4-char FourCC. `0`-padded numeric, `#`-padded string.
# Answer payloads (type A) are documented under Feedbacks.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{state}"   # FourCC=POWR, param=16-digit 0/1
  params:
    - name: state
      type: enum
      values:
        - "0000000000000000": Standby (Off)
        - "0000000000000001": Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"   # Enquiry POWR
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"   # FourCC=TPOW
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{level}"   # param=16-digit decimal, left-padded; e.g. 0000000000000029
  params:
    - name: level
      type: integer
      description: Volume level, decimal digits left-padded with 0 to 16 chars.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{state}"
  params:
    - name: state
      type: enum
      values:
        - "0000000000000000": Unmute
        - "0000000000000001": Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT{input}"   # param byte[13]=type code, bytes[18-21]=index (1-9999)
  params:
    - name: input
      type: string
      description: >
        16-char param. byte[13] type: 1=HDMI, 3=Composite, 4=Component,
        5=Screen Mirroring. bytes[18-21] = 1-based index (1-9999).
        e.g. HDMI1 = "000000010000XXXX", Composite1 = "000000030000XXXX".

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state}"
  params:
    - name: state
      type: enum
      values:
        - "0000000000000000": Disable picture mute
        - "0000000000000001": Enable picture mute (black screen)

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"   # FourCC=TPMU
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene}"   # param=string, case-sensitive, right-padded with #
  params:
    - name: scene
      type: enum
      values:
        - "auto##############": auto
        - "auto24pSync#######": auto24pSync
        - "general############": general

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{code}"   # param=16-digit decimal IR code from IR Commands table
  params:
    - name: code
      type: enum
      description: 16-digit zero-padded IR code (last 1-3 significant digits identify the key).
      values:
        - "0000000000000005": Display
        - "0000000000000006": Home
        - "0000000000000007": Options
        - "0000000000000008": Return
        - "0000000000000009": Up
        - "0000000000000010": Down
        - "0000000000000011": Right
        - "0000000000000012": Left
        - "0000000000000013": Confirm
        - "0000000000000014": Red
        - "0000000000000015": Green
        - "0000000000000016": Yellow
        - "0000000000000017": Blue
        - "0000000000000018": Num1
        - "0000000000000019": Num2
        - "0000000000000020": Num3
        - "0000000000000021": Num4
        - "0000000000000022": Num5
        - "0000000000000023": Num6
        - "0000000000000024": Num7
        - "0000000000000025": Num8
        - "0000000000000026": Num9
        - "0000000000000027": Num0
        - "0000000000000030": Volume Up
        - "0000000000000031": Volume Down
        - "0000000000000032": Mute
        - "0000000000000033": Channel Up
        - "0000000000000034": Channel Down
        - "0000000000000035": Subtitle
        - "0000000000000038": DOT
        - "0000000000000050": Picture Off
        - "0000000000000061": Wide
        - "0000000000000062": Jump
        - "0000000000000076": Sync Menu
        - "0000000000000077": Forward
        - "0000000000000078": Play
        - "0000000000000079": Rewind
        - "0000000000000080": Prev
        - "0000000000000081": Stop
        - "0000000000000082": Next
        - "0000000000000084": Pause
        - "0000000000000086": Flash Plus
        - "0000000000000087": Flash Minus
        - "0000000000000098": TV Power
        - "0000000000000099": Audio
        - "0000000000000101": Input
        - "0000000000000104": Sleep
        - "0000000000000105": Sleep Timer
        - "0000000000000108": Video 2
        - "0000000000000110": Picture Mode
        - "0000000000000121": Demo Surround
        - "0000000000000124": HDMI 1
        - "0000000000000125": HDMI 2
        - "0000000000000126": HDMI 3
        - "0000000000000127": HDMI 4
        - "0000000000000129": Action Menu
        - "0000000000000130": Help

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"   # interface prefix 'eth0' + padding
  params:
    - name: interface
      type: string
      description: Interface identifier (e.g. "eth0"). Param right-padded with #.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"
  params:
    - name: interface
      type: string
      description: Interface identifier (e.g. "eth0"). Param right-padded with #.
```

## Feedbacks
```yaml
# Answer messages: type byte[2]=A. Param field 16 chars.
- id: power_state
  command_prefix: "*SAPOWR"
  type: enum
  values:
    "0000000000000000": Standby (Off)
    "0000000000000001": Active (On)
    "FFFFFFFFFFFFFFFF": Error

- id: audio_volume
  command_prefix: "*SAVOLU"
  type: string
  description: 16-digit decimal volume value (X-padded on success).

- id: audio_mute_state
  command_prefix: "*SAAMUT"
  type: enum
  values:
    "0000000000000000": Not Muted
    "0000000000000001": Muted
    "FFFFFFFFFFFFFFFF": Error

- id: input_state
  command_prefix: "*SAINPT"
  type: string
  description: >
    byte[13] type code: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring;
    bytes[18-21] = 1-based index. "NNNN...NN" = Not Found, "FFFF...FF" = Error.

- id: picture_mute_state
  command_prefix: "*SAPMUT"
  type: enum
  values:
    "0000000000000000": Disabled
    "0000000000000001": Enabled
    "FFFFFFFFFFFFFFFF": Error

- id: scene_setting_state
  command_prefix: "*SASCEN"
  type: string
  description: Scene Setting string (X-padded). "NNNN...NN" = Not available, "FFFF...FF" = Error.

- id: broadcast_address
  command_prefix: "*SABADR"
  type: string
  description: IPv4 broadcast address, right-padded with #. Source example payload: "192.168.0.14####".

- id: mac_address
  command_prefix: "*SAMADR"
  type: string
  description: MAC address string, right-padded with #.

- id: command_result
  description: Generic answer for any Control command.
  type: enum
  values:
    "0000000000000000": Success
    "FFFFFFFFFFFFFFFF": Error
```

## Variables
```yaml
# All settable values (power, volume, mute, input, picture mute, scene, IR code)
# are expressed as discrete Actions above. No additional continuous variables.
```

## Events
```yaml
# Unsolicited Notify messages: type byte[2]=N. Monitor → client.
- id: power_change
  command_prefix: "*SNPOWR"
  type: enum
  values:
    "0000000000000000": Powering off
    "0000000000000001": Powering on

- id: input_change
  command_prefix: "*SNINPT"
  type: string
  description: Fires on input change. Same layout as input_state answer.

- id: volume_change
  command_prefix: "*SNVOLU"
  type: string
  description: Fires on volume change. 16-digit decimal volume value.

- id: mute_change
  command_prefix: "*SNAMUT"
  type: enum
  values:
    "0000000000000000": Unmuting
    "0000000000000001": Muting

- id: picture_mute_change
  command_prefix: "*SNPMUT"
  type: enum
  values:
    "0000000000000000": Picture mute enabled
    "0000000000000001": Picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Note: monitor must be on same LAN; Remote Device Control + Simple IP Control must
# be enabled in monitor Settings before protocol responds.
```

## Notes
- Protocol listens on TCP 20060, accepts 24-byte fixed-length ASCII frames terminated by LF (0x0A).
- Monitor-side prep required: `[Settings] → [Network & Internet] → [Remote device settings] → [Control remotely]` AND `[Settings] → [Network & Internet] → [Home network] → [IP control] → [Simple IP control]`.
- Worked example from source (netcat on Linux): `netcat [IP] 20060`, send `*SCPOWR0000000000000000` for Power Off. Monitor replies with two messages on one line: `*SAPOWR0000000000000000` (answer: command accepted) followed by `*SNPOWR0000000000000000` (notify: power now OFF).
- EU RED-DA models ship in 3 spec variants; available commands differ per variant — verify on target device.
- Source documents the Bravia platform Simple IP Control surface generically; KD-xxX8500E has no model-specific command doc.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: EU RED-DA variant command differences not enumerated in source. -->
<!-- UNRESOLVED: exact model string for KD-xxX8500E series sizes not specified by command doc. -->
```

Upgrade changes vs on-disk:
- Fix `set_power_status` command `*SCPWR` → `*SCPOWR` (FourCC=POWR verbatim from source line 42/105; previous typo would fail command fidelity).
- Transport: add byte-offset layout table + common param conventions (`#`/`0…0`/`F…F`) from source lines 58-96.
- Feedbacks: add source-stated literal example payload `192.168.0.14####` to broadcast_address (source line 174).
- Notes: add verbatim netcat worked example (Power Off request + dual SA/SN response) from source lines 36-53.

No existing IDs/shapes rewritten beyond the one typo fix. All 22 source command rows + full IR table preserved.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - pro.sony
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro.sony/s3/2018/07/19110602/Sony_Protocol-Manual_Supported-Command-List_1st-Edition-Revised-1.pdf
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
retrieved_at: 2026-06-20T19:31:31.585Z
last_checked_at: 2026-07-22T01:19:28.066Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:19:28.066Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions match source FourCC codes verbatim; source commands fully represented; transport port 20060 verified; bidirectional coverage confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific firmware/version compatibility not stated; EU RED-DA variants may restrict commands."
- "no multi-step sequences described in source."
- "source contains no explicit safety warnings or interlock procedures."
- "firmware version compatibility not stated in source."
- "EU RED-DA variant command differences not enumerated in source."
- "exact model string for KD-xxX8500E series sizes not specified by command doc."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
