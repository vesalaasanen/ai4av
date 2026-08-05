---
spec_id: admin/phoenix_audio_technologies-octopus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Phoenix Audio Technologies Octopus Control Spec"
manufacturer: "Phoenix Audio Technologies"
model_family: Octopus
aliases: []
compatible_with:
  manufacturers:
    - "Phoenix Audio Technologies"
  models:
    - Octopus
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - phnxaudio.com
source_urls:
  - https://www.phnxaudio.com/support-sub/hc/en-us/articles/360005777833-Octopus-Control-Protocol/
  - https://www.phnxaudio.com/support-sub/support/solutions/articles/4000071423-crestron-and-phoenix-audio-module-via-rs232/
retrieved_at: 2026-04-26T19:14:46.703Z
last_checked_at: 2026-07-22T00:39:34.396Z
generated_at: 2026-07-22T00:39:34.396Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not present in source"
  - "no standalone settable parameters beyond actions"
  - "no unsolicited event notifications described in source"
  - "no safety warnings or interlock procedures in source"
  - "telephone (PSTN) interface card is optional; not all units have dialer"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:39:34.396Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched as literal wire-level commands in source; transport parameters verified verbatim; complete bidirectional coverage of all documented operations. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Phoenix Audio Technologies Octopus Control Spec

## Summary
RS-232 audio conferencing interface. 9600 baud, 8N1, ASCII protocol. Each command is 16 ASCII chars + 0x0D CR. Controls transmit/receive volume and mute, saves DSP settings, provides telephone dialer interface (optional PSTN card).

<!-- UNRESOLVED: power on/off commands not present in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: get volume/mute commands present
- levelable  # inferred: volume set commands present
```

## Actions
```yaml
# All commands = 16 ASCII chars + 0x0D (CR). {VV} = ASCII hex volume 0x00-0x18.
- id: get_transmit_volume
  label: Get Transmit Volume
  kind: query
  command: "'F013040000000000',0x0D"
  params: []
- id: get_receive_volume
  label: Get Receive Volume
  kind: query
  command: "'F013020000000000',0x0D"
  params: []
- id: set_transmit_volume
  label: Set Transmit Volume
  kind: action
  command: "'F01203{VV}00000000',0x0D then 'F01207{VV}00000000',0x0D then 'F01204{VV}00000000',0x0D"
  params:
    - name: level
      type: integer
      description: "Volume level hex 0x00-0x18 (0-24 decimal); {VV} = ASCII hex representation"
- id: set_receive_volume
  label: Set Receive Volume
  kind: action
  command: "'F01201{VV}00000000',0x0D then 'F01202{VV}00000000',0x0D"
  params:
    - name: level
      type: integer
      description: "Volume level hex 0x00-0x18 (0-24 decimal); {VV} = ASCII hex representation"
- id: get_transmit_mute
  label: Get Transmit Mute
  kind: query
  command: "'F013240000000000',0x0D"
  params: []
- id: get_receive_mute
  label: Get Receive Mute
  kind: query
  command: "'F013220000000000',0x0D"
  params: []
- id: set_transmit_mute
  label: Set Transmit Mute
  kind: action
  command: "'F01223{m}00000000',0x0D then 'F01227{m}00000000',0x0D then 'F01224{m}00000000',0x0D  # {m}=1 mute, {m}=0 unmute"
  params:
    - name: mute
      type: boolean
      description: "True to mute ({m}=1), false to unmute ({m}=0)"
- id: set_transmit_mute_on
  label: Transmit Mute (Mute Mic)
  kind: action
  command: "'F012230100000000',0x0D then 'F012270100000000',0x0D then 'F012240100000000',0x0D"
  params: []
- id: set_transmit_mute_off
  label: Transmit UnMute (Open Mic)
  kind: action
  command: "'F012230000000000',0x0D then 'F012270000000000',0x0D then 'F012240000000000',0x0D"
  params: []
- id: set_receive_mute
  label: Set Receive Mute
  kind: action
  command: "'F01221{m}00000000',0x0D then 'F01222{m}00000000',0x0D  # {m}=1 mute, {m}=0 unmute"
  params:
    - name: mute
      type: boolean
      description: "True to mute ({m}=1), false to unmute ({m}=0)"
- id: set_receive_mute_on
  label: Receive Mute (Mute Speakers)
  kind: action
  command: "'F012210100000000',0x0D then 'F012220100000000',0x0D"
  params: []
- id: set_receive_mute_off
  label: Receive UnMute (Unmute Speakers)
  kind: action
  command: "'F012210000000000',0x0D then 'F012220000000000',0x0D"
  params: []
- id: save_settings
  label: Save Settings
  kind: action
  command: "'B100000000000000',0x0D"
  params: []
  description: "Saves volume and mute settings to DSP non-volatile memory; unit reuses them on next power-on."
- id: dial_digit
  label: Dial Digit
  kind: action
  command: "'F00C00060100000{X}',0x0D  # {X} = hex code per digit: 0=0,1=1,2=2,3=3,4=4,5=5,6=6,7=7,8=8,9=9,*=E,#=F"
  params:
    - name: digit
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"
        - "*"
        - "#"
      description: "DTMF digit to dial; {X} hex: 0-9 → 0-9, * → E, # → F"
- id: dial_0
  label: Dial 0
  kind: action
  command: "'F00C000601000000',0x0D"
  params: []
- id: dial_1
  label: Dial 1
  kind: action
  command: "'F00C000601000001',0x0D"
  params: []
- id: dial_2
  label: Dial 2
  kind: action
  command: "'F00C000601000002',0x0D"
  params: []
- id: dial_3
  label: Dial 3
  kind: action
  command: "'F00C000601000003',0x0D"
  params: []
- id: dial_4
  label: Dial 4
  kind: action
  command: "'F00C000601000004',0x0D"
  params: []
- id: dial_5
  label: Dial 5
  kind: action
  command: "'F00C000601000005',0x0D"
  params: []
- id: dial_6
  label: Dial 6
  kind: action
  command: "'F00C000601000006',0x0D"
  params: []
- id: dial_7
  label: Dial 7
  kind: action
  command: "'F00C000601000007',0x0D"
  params: []
- id: dial_8
  label: Dial 8
  kind: action
  command: "'F00C000601000008',0x0D"
  params: []
- id: dial_9
  label: Dial 9
  kind: action
  command: "'F00C000601000009',0x0D"
  params: []
- id: dial_star
  label: Dial *
  kind: action
  command: "'F00C00060100000E',0x0D"
  params: []
- id: dial_hash
  label: Dial #
  kind: action
  command: "'F00C00060100000F',0x0D"
  params: []
- id: dial_pause
  label: Dial Pause
  kind: action
  command: "'F00C000601000015',0x0D"
  params: []
- id: dial_redial
  label: Dial Redial
  kind: action
  command: "'F00C000600000001',0x0D"
  params: []
- id: dial_flash
  label: Dial Flash
  kind: action
  command: "'F00C000600000002',0x0D"
  params: []
- id: dial_on_off_hook
  label: Dial On/Off Hook Toggle
  kind: action
  command: "'F00C000600000004',0x0D"
  params: []
  description: "Toggle only - Octopus cannot report hook state; user relies on dial tone."
```

## Feedbacks
```yaml
- id: transmit_volume_response
  type: integer
  values: []  # range 0x00-0x18
  command_format: "'F01304VV00000000',0x0D"
  comment: "VV = ASCII hex volume level 0x00-0x18; response to Get Transmit Volume"
- id: receive_volume_response
  type: integer
  values: []
  command_format: "'F01302VV00000000',0x0D"
  comment: "VV = ASCII hex volume level 0x00-0x18; response to Get Receive Volume"
- id: transmit_mute_response
  type: enum
  values:
    - "0"
    - "1"
  command_format: "'F013240M00000000',0x0D"
  comment: "M=0 open (unmuted), M=1 muted; response to Get Transmit Mute"
- id: receive_mute_response
  type: enum
  values:
    - "0"
    - "1"
  command_format: "'F013220M00000000',0x0D"
  comment: "M=0 on (unmuted), M=1 muted; response to Get Receive Mute"
- id: command_echo
  type: string
  comment: "Every command returns echo of the sent command as feedback in same 16-char+0x0D format"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
- id: set_transmit_volume_macro
  description: "Set Transmit Volume = sequence of 3 commands: F01203, F01207, F01204 with same VV"
  steps:
    - "'F01203{VV}00000000',0x0D"
    - "'F01207{VV}00000000',0x0D"
    - "'F01204{VV}00000000',0x0D"
- id: set_receive_volume_macro
  description: "Set Receive Volume = sequence of 2 commands: F01201, F01202 with same VV"
  steps:
    - "'F01201{VV}00000000',0x0D"
    - "'F01202{VV}00000000',0x0D"
- id: set_transmit_mute_macro
  description: "Set Transmit Mute = sequence of 3 commands: F01223, F01227, F01224 with same {m} (1 mute / 0 unmute)"
  steps:
    - "'F01223{m}00000000',0x0D"
    - "'F01227{m}00000000',0x0D"
    - "'F01224{m}00000000',0x0D"
- id: set_receive_mute_macro
  description: "Set Receive Mute = sequence of 2 commands: F01221, F01222 with same {m}"
  steps:
    - "'F01221{m}00000000',0x0D"
    - "'F01222{m}00000000',0x0D"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All commands = exactly 16 ASCII characters followed by CR (0x0D). Unit returns feedback in same format.
- Volume range 0x00 (min, = mute) to 0x18 (24 decimal, max). {VV} = ASCII hex representation.
- Set Transmit Volume requires 3-command sequence (F01203, F01207, F01204) with same VV.
- Set Receive Volume requires 2-command sequence (F01201, F01202) with same VV.
- Set Transmit Mute requires 3-command sequence (F01223, F01227, F01224) with same m byte.
- Set Receive Mute requires 2-command sequence (F01221, F01222) with same m byte.
- Control unit should GET volume + mute state on connect, sync sliders/indicators before user interaction.
- On/Off Hook is a toggle — Octopus cannot determine hook state, only provides dial tone.

<!-- UNRESOLVED: telephone (PSTN) interface card is optional; not all units have dialer -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
```

Changes vs on-disk:
- Added `command:` verbatim payload to ALL actions (was major gap).
- Added `command_format:` to all feedback entries.
- Split mute/unmute into explicit `_on`/`_off` entries (source lists them as separate ops) — kept parameterized variants too.
- Enumerated 12 dialer digits as separate actions (source table = 12 distinct rows) — kept parameterized `dial_digit` too.
- Added `Macros` section documenting the multi-command sequences source explicitly describes.
- Preserved all original IDs/shapes.

## Provenance

```yaml
source_domains:
  - phnxaudio.com
source_urls:
  - https://www.phnxaudio.com/support-sub/hc/en-us/articles/360005777833-Octopus-Control-Protocol/
  - https://www.phnxaudio.com/support-sub/support/solutions/articles/4000071423-crestron-and-phoenix-audio-module-via-rs232/
retrieved_at: 2026-04-26T19:14:46.703Z
last_checked_at: 2026-07-22T00:39:34.396Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:39:34.396Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched as literal wire-level commands in source; transport parameters verified verbatim; complete bidirectional coverage of all documented operations. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not present in source"
- "no standalone settable parameters beyond actions"
- "no unsolicited event notifications described in source"
- "no safety warnings or interlock procedures in source"
- "telephone (PSTN) interface card is optional; not all units have dialer"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
