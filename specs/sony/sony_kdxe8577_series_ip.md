---
spec_id: admin/sony-kdxe8577-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXE8577 Series Control Spec"
manufacturer: Sony
model_family: "KDXE8577 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXE8577 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - helpguide.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://helpguide.sony.net/tv/naep3/v1/en/contents/TP1002006040.html
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-15T12:45:55.579Z
last_checked_at: 2026-06-16T07:19:51.227Z
generated_at: 2026-06-16T07:19:51.227Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec generated from pro-bravia.sony.net Simple IP control page; consumer KDXE8577 firmware/feature parity not explicitly confirmed in source."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "no firmware version compatibility range stated; no error-recovery sequence beyond retry on 'F...F' answer."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:19:51.227Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions verified against source command table with exact wire-token matches; transport port 20060 TCP confirmed; complete bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Sony KDXE8577 Series Control Spec

## Summary
Simple IP control (SSIP) for Sony Bravia professional/consumer displays using fixed 24-byte TCP messages on port 20060. Spec covers power, input, audio volume/mute, picture mute, scene setting, IR-code passthrough, network info queries, and unsolicited notify events.

<!-- UNRESOLVED: spec generated from pro-bravia.sony.net Simple IP control page; consumer KDXE8577 firmware/feature parity not explicitly confirmed in source. -->

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
- routable
- queryable
- levelable
```

## Actions
```yaml
# Fixed 24-byte frame: 0x2A 0x53 | msgType(1) | fourCC(4) | params(16) | 0x0A
# msgType C=Control, E=Enquiry, A=Answer, N=Notify

- id: power_off
  label: Power Off
  kind: action
  command: "*SCPOWR0000000000000000\n"
  notes: msgType=0x43 'C', fourCC=POWR, param 16 ASCII '0's, footer 0x0A
- id: power_on
  label: Power On
  kind: action
  command: "*SCPOWR0000000000000001\n"
- id: toggle_power
  label: Toggle Power
  kind: action
  command: "*SCTPOW0000000000000000\n"
  notes: msgType C, fourCC TPOW
- id: get_power
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
- id: set_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU00000000000000{XX}\n"
  notes: param 16 bytes, right-padded '0', volume decimal (e.g. 29 → 0000000000000029)
  params:
    - name: volume
      type: integer
      description: Volume value, 16 ASCII decimal digits right-padded with '0'
- id: get_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
- id: mute_on
  label: Mute On
  kind: action
  command: "*SCAMUT0000000000000001\n"
- id: mute_off
  label: Mute Off
  kind: action
  command: "*SCAMUT0000000000000000\n"
- id: get_mute
  label: Get Mute Status
  kind: query
  command: "*SEAMUT################\n"
- id: set_input_hdmi
  label: Set Input HDMI
  kind: action
  command: "*SCINPT00000000010000{XXXX}\n"
  notes: byte[12]=1 (HDMI), bytes[18-21]=HDMI number 1-9999 ASCII
  params:
    - name: hdmi_number
      type: integer
      description: HDMI input number 1-9999
- id: set_input_composite
  label: Set Input Composite
  kind: action
  command: "*SCINPT00000000030000{XXXX}\n"
  params:
    - name: composite_number
      type: integer
      description: Composite input number 1-9999
- id: set_input_component
  label: Set Input Component
  kind: action
  command: "*SCINPT00000000040000{XXXX}\n"
  params:
    - name: component_number
      type: integer
      description: Component input number 1-9999
- id: set_input_screen_mirroring
  label: Set Input Screen Mirroring
  kind: action
  command: "*SCINPT00000000050000{XXXX}\n"
  params:
    - name: screen_mirroring_number
      type: integer
      description: Screen Mirroring input number 1-9999
- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
- id: set_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "*SCPMUT0000000000000001\n"
- id: set_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "*SCPMUT0000000000000000\n"
- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU0000000000000000\n"
- id: set_scene
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{string}########\n"
  notes: 16-byte param, case-sensitive, right-padded '#'. Valid: auto, auto24pSync, general
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
- id: get_scene
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
- id: ir_command
  label: Send IR Command
  kind: action
  command: "*SCIRCC00000000000000{HH}\n"
  notes: 16-byte param, byte[21-22] = IR code hex from IR Commands table
  params:
    - name: ir_code
      type: string
      description: Two hex digits from IR Commands table (e.g. 05 Display, 09 Up, 30 VolUp, 32 Mute, 98 TV Power)
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADREth0############\n"
  notes: param starts with "eth0" then 11 pad bytes; answer echoes broadcast IPv4 right-padded '#'
- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADREth0############\n"
  notes: param starts with "eth0"; answer echoes MAC right-padded '#'
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  notes: Answer suffix byte[22]: '0'=Standby/Off, '1'=Active/On
- id: volume_value
  type: integer
  notes: Answer param bytes hold volume decimal
- id: mute_state
  type: enum
  values: [unmuted, muted]
  notes: Answer suffix byte[22]: '0'=Not Muted, '1'=Muted
- id: input_state
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  notes: Answer param byte[12]: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  notes: Answer suffix byte[22]: '0'=Disabled, '1'=Enabled
- id: scene_value
  type: string
  notes: 16-byte answer param, case-sensitive scene name
- id: broadcast_address
  type: string
  notes: IPv4 dotted-quad in answer param
- id: mac_address
  type: string
  notes: MAC address in answer param
- id: command_result
  type: enum
  values: [success, error, not_found, not_available]
  notes: '0...0' success, 'F...F' error, 'N...N' not found / not available
```

## Events
```yaml
- id: power_change
  trigger: power state change
  message: "*SNPOWR0000000000000000\n"  # off
  message_on: "*SNPOWR0000000000000001\n"  # on
  notes: msgType N, fourCC POWR
- id: input_change
  trigger: input source change
  message: "*SNINPT0000000000000000\n"  # generic
  notes: msgType N, fourCC INPT; byte[12] indicates source type
- id: volume_change
  trigger: volume change
  message: "*SNVOLU{16-byte value}\n"
  notes: msgType N, fourCC VOLU
- id: mute_change
  trigger: mute state change
  message: "*SNAMUT0000000000000000\n"  # unmuted
  message_muted: "*SNAMUT0000000000000001\n"
- id: picture_mute_change
  trigger: picture mute toggle
  message: "*SNPMUT0000000000000000\n"  # enabled
  message_disabled: "*SNPMUT0000000000000001\n"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Frame format: header 0x2A 0x53, msgType byte (C/E/A/N), fourCC 4 bytes, params 16 bytes, footer 0x0A. Total 24 bytes; all-non-ASCII text above shown as 24 ASCII characters for readability but real bytes follow this byte layout.
- 16-byte param fields: ASCII digits (volume) right-padded with '0'; scene strings right-padded with '#'; fixed-value C/E commands fill with '#'; interface params prefix with "eth0" + padding.
- EU region: 3 RED-DA compliance spec variants — command set may differ. See https://pro-bravia.sony.net/setup/device-settings/red-da/.
- IR Codes table maps remote buttons to two hex digits used as suffix in setIrccCode. List: Display 05, Home 06, Options 07, Return 08, Up 09, Down 10, Right 11, Left 12, Confirm 13, Red 14, Green 15, Yellow 16, Blue 17, Num1 18..Num0 27, VolUp 30, VolDown 31, Mute 32, ChUp 33, ChDown 34, Subtitle 35, DOT 38, Picture Off 50, Wide 61, Jump 62, SyncMenu 76, Forward 77, Play 78, Rewind 79, Prev 80, Stop 81, Next 82, Pause 84, FlashPlus 86, FlashMinus 87, TV Power 98, Audio 99, Input 101, Sleep 104, SleepTimer 105, Video2 108, PictureMode 110, DemoSurround 121, HDMI1 124, HDMI2 125, HDMI3 126, HDMI4 127, ActionMenu 129, Help 130.
- Transport framed over TCP, no auth, no encryption in source.
<!-- UNRESOLVED: no firmware version compatibility range stated; no error-recovery sequence beyond retry on 'F...F' answer. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - helpguide.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://helpguide.sony.net/tv/naep3/v1/en/contents/TP1002006040.html
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-15T12:45:55.579Z
last_checked_at: 2026-06-16T07:19:51.227Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:19:51.227Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions verified against source command table with exact wire-token matches; transport port 20060 TCP confirmed; complete bidirectional coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec generated from pro-bravia.sony.net Simple IP control page; consumer KDXE8577 firmware/feature parity not explicitly confirmed in source."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "no firmware version compatibility range stated; no error-recovery sequence beyond retry on 'F...F' answer."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
