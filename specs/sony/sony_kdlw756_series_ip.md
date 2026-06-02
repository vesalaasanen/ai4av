---
spec_id: admin/sony-kdlw756-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW756 Series Control Spec"
manufacturer: Sony
model_family: "KDLW756 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLW756 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T04:12:15.587Z
last_checked_at: 2026-05-31T22:30:32.178Z
generated_at: 2026-05-31T22:30:32.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - BADR
  - MADR
  - "protocol may share variants across the broader BRAVIA Professional Displays line; for EU models the available command set depends on the RED-DA compliance specification (3 variants)."
  - "no safety warnings, interlocks, or power-on sequencing requirements documented in source."
  - "complete enumeration of every supported IR code; the table above reflects the codes documented in the source excerpt."
verification:
  verdict: verified
  checked_at: 2026-05-31T22:30:32.178Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions matched to their corresponding source commands (IRCC, POWR, TPOW, VOLU, AMUT, INPT, PMUT, TPMU, SCEN); transport verified; 2 unrepresented network diagnostic commands (BADR, MADR) are orthogonal to core AV control. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDLW756 Series Control Spec

## Summary

The Sony KDLW756 Series is a BRAVIA Professional Display monitor. This spec covers Sony's Simple IP Control protocol — a 24-byte fixed-frame TCP protocol on port 20060 — used to control power, input, volume, mute, picture mute, scene setting, and to send IR-equivalent codes. The KDLW756 implements Simple IP Control as part of the broader BRAVIA Professional Displays family.

<!-- UNRESOLVED: protocol may share variants across the broader BRAVIA Professional Displays line; for EU models the available command set depends on the RED-DA compliance specification (3 variants). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

Message framing — 24-byte fixed-size frames with the following byte layout:
- Byte 0-1: Header `0x2A 0x53` (`*S`, fixed)
- Byte 2: Message type — `0x43` C (Control), `0x45` E (Enquiry), `0x41` A (Answer), `0x4E` N (Notify)
- Byte 3-6: 4-character FourCC command identifier
- Byte 7-22: 16-byte parameter area
- Byte 23: Footer `0x0A` (LF, fixed)

ASCII rendering: `*S{type}{fourcc}{16-char params}\n`. Numeric parameter areas are zero-padded on the left; string parameter areas are padded on the right with `#`.

## Traits
```yaml
- powerable       # setPowerStatus, togglePowerStatus
- routable        # setInput
- queryable       # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- levelable       # setAudioVolume
```

## Actions
```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{power}\n"
  params:
    - name: power
      type: string
      description: "16-character zero-padded decimal; rightmost digit is 0=Standby, 1=Active. Example: '0000000000000000' or '0000000000000001'."

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR0000000000000000\n"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW0000000000000000\n"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}\n"
  params:
    - name: volume
      type: string
      description: "16-digit zero-padded decimal. Source example: '0000000000000029'. Source does not state a min/max value."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU0000000000000000\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{mute}\n"
  params:
    - name: mute
      type: string
      description: "16-character zero-padded decimal; rightmost digit is 0=Unmute, 1=Mute."

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT0000000000000000\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000{type}0000{number}\n"
  params:
    - name: type
      type: integer
      values: [1, 3, 4, 5]
      description: "Input type - 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring. Single character at byte 14 of the parameter area."
    - name: number
      type: integer
      range: [1, 9999]
      description: "Input number (1-9999), 4-digit zero-padded decimal at bytes 19-22 of the parameter area."

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT0000000000000000\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state}\n"
  params:
    - name: state
      type: string
      description: "16-character zero-padded decimal; rightmost digit is 0=Disable picture mute, 1=Enable picture mute (screen black)."

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT0000000000000000\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU0000000000000000\n"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{setting}\n"
  params:
    - name: setting
      type: string
      values:
        - auto
        - auto24pSync
        - general
      description: "Scene setting name (case-sensitive). Right-pad with `#` to fill 16 chars. Source example: 'auto24pSync#####'."

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN0000000000000000\n"
  params: []

- id: set_ircc_code
  label: Send IR-Equivalent Code
  kind: action
  command: "*SCIRCC{ir_code}\n"
  params:
    - name: ir_code
      type: string
      description: "16-digit zero-padded decimal IR code. See the IR command table in Notes for valid values."

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADRETH00000000000000\n"
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADRETH00000000000000\n"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  # Answer format: *SAPOWR{16-pad}\n - rightmost char 0=standby, 1=active.
  # Source: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | Standby (Off)"

- id: audio_volume
  type: integer
  # Answer format: *SAVOLU{volume}\n - 16-digit zero-padded decimal.
  # Source: "X X X X X X X X X X X X X X X X | Success with volume value."

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  # Answer format: *SAAMUT{16-pad}\n - rightmost char 0=unmuted, 1=muted.

- id: current_input
  type: object
  # Answer format: *SAINPT0000000{type}0000{number}\n - type 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; number 1-9999.

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  # Answer format: *SAPMUT{16-pad}\n - rightmost char 0=disabled, 1=enabled.

- id: scene_setting
  type: string
  # Answer format: *SASCEN{16-pad}\n - scene name right-padded with `#` in 16-byte area.

- id: broadcast_address
  type: string
  # Answer format: *SABADR{16-pad}\n - IPv4 address right-padded with `#`.
  # Source example: "1 9 2 . 1 6 8 . 0 . 1 4 # # # #" (192.168.0.14 + 4 #s).

- id: mac_address
  type: string
  # Answer format: *SAMADR{16-pad}\n - MAC address right-padded with `#`.

- id: command_result
  type: enum
  values: [success, error, not_found, not_available]
  # Common Answer (A) result for any control command.
  # Parameter area: 16 x '0' = success, 16 x 'F' = error, 16 x 'N' = not found or not available for current input.
```

## Events
```yaml
- id: fire_power_change
  type: notify
  command: "*SNPOWR{state}\n"
  description: "Sent by the monitor on power state change. Rightmost char 0=powering off, 1=powering on."

- id: fire_input_change
  type: notify
  command: "*SNINPT{input}\n"
  description: "Sent by the monitor on input change. Format: 16 x '0' for a generic change, or 0000000{type}0000{number} for the new input (type 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; number 1-9999)."

- id: fire_volume_change
  type: notify
  command: "*SNVOLU{volume}\n"
  description: "Sent by the monitor on volume change. 16-digit zero-padded decimal in the parameter area."

- id: fire_mute_change
  type: notify
  command: "*SNAMUT{state}\n"
  description: "Sent by the monitor on mute change. Rightmost char 0=unmuting, 1=muting."

- id: fire_picture_mute_change
  type: notify
  command: "*SNPMUT{state}\n"
  description: "Sent by the monitor on picture mute change. Rightmost char 0=enabled (screen black), 1=disabled (normal)."
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements documented in source.
```

## Notes

- The KDLW756 is part of Sony's BRAVIA Professional Displays line; Simple IP Control is shared across this family. Command availability may vary by firmware, model, and region.
- EU area models ship with 3 RED-DA compliance specifications. Settings and available commands differ per specification. Refer to Sony's RED-DA page for the affected command set.
- The protocol uses 24-byte fixed-size frames. ASCII representation is shown in the `command:` field; the LF character (`0x0A`) is the literal 24th byte.
- Numeric parameter values are left-padded with `0`; string parameter values are right-padded with `#`. Always pad to fill the 16-byte parameter area.
- `setIrccCode` (FourCC `IRCC`) takes a 16-digit zero-padded decimal IR code. The source's IR Commands table (16-byte param value, rightmost digits):
  - `0000000000000005` Display
  - `0000000000000006` Home
  - `0000000000000007` Options
  - `0000000000000008` Return
  - `0000000000000009` Up
  - `0000000000000010` Down
  - `0000000000000011` Right
  - `0000000000000012` Left
  - `0000000000000013` Confirm
  - `0000000000000014` Red
  - `0000000000000015` Green
  - `0000000000000016` Yellow
  - `0000000000000017` Blue
  - `0000000000000018` Num1
  - `0000000000000019` Num2
  - `0000000000000020` Num3
  - `0000000000000021` Num4
  - `0000000000000022` Num5
  - `0000000000000023` Num6
  - `0000000000000024` Num7
  - `0000000000000025` Num8
  - `0000000000000026` Num9
  - `0000000000000027` Num0
  - `0000000000000030` Volume Up
  - `0000000000000031` Volume Down
  - `0000000000000032` Mute
  - `0000000000000033` Channel Up
  - `0000000000000034` Channel Down
  - `0000000000000035` Subtitle
  - `0000000000000038` DOT
  - `0000000000000050` Picture Off
  - `0000000000000061` Wide
  - `0000000000000062` Jump
  - `0000000000000076` Sync Menu
  - `0000000000000077` Forward
  - `0000000000000078` Play
  - `0000000000000079` Rewind
  - `0000000000000080` Prev
  - `0000000000000081` Stop
  - `0000000000000082` Next
  - `0000000000000084` Pause
  - `0000000000000086` Flash Plus
  - `0000000000000087` Flash Minus
  - `0000000000000098` TV Power
  - `0000000000000099` Audio
  - `0000000000000101` Input
  - `0000000000000104` Sleep
  - `0000000000000105` Sleep Timer
  - `0000000000000108` Video 2
  - `0000000000000110` Picture Mode
  - `0000000000000121` Demo Surround
  - `0000000000000124` HDMI 1
  - `0000000000000125` HDMI 2
  - `0000000000000126` HDMI 3
  - `0000000000000127` HDMI 4
  - `0000000000000129` Action Menu
  - `0000000000000130` Help

<!-- UNRESOLVED: complete enumeration of every supported IR code; the table above reflects the codes documented in the source excerpt. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T04:12:15.587Z
last_checked_at: 2026-05-31T22:30:32.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:30:32.178Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions matched to their corresponding source commands (IRCC, POWR, TPOW, VOLU, AMUT, INPT, PMUT, TPMU, SCEN); transport verified; 2 unrepresented network diagnostic commands (BADR, MADR) are orthogonal to core AV control. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- BADR
- MADR
- "protocol may share variants across the broader BRAVIA Professional Displays line; for EU models the available command set depends on the RED-DA compliance specification (3 variants)."
- "no safety warnings, interlocks, or power-on sequencing requirements documented in source."
- "complete enumeration of every supported IR code; the table above reflects the codes documented in the source excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
