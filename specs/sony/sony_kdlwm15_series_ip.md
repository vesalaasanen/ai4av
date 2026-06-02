---
spec_id: admin/sony-kdlwm15-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDL-WM15 Series Control Spec"
manufacturer: Sony
model_family: "KDL-WM15 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDL-WM15 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - "https://aca.im/driver_docs/Sony/sony bravia simple ip control.pdf"
retrieved_at: 2026-05-26T04:31:42.826Z
last_checked_at: 2026-06-02T05:46:27.375Z
generated_at: 2026-06-02T05:46:27.375Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source notes EU area models have 3 RED-DA specifications with differing settings/commands; per-specification availability not enumerated"
  - "source gives no min/max; example value 41, no upper bound stated"
  - "source defines no multi-step sequences"
  - "source contains no safety warnings, interlock procedures,"
  - "firmware version compatibility not stated in source"
  - "max audio volume value not stated in source"
  - "source does not enumerate which IR codes are model-specific vs. universal"
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:27.375Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched to source commands; port 20060 verified; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDL-WM15 Series Control Spec

## Summary
Sony BRAVIA professional displays in the KDL-WM15 Series expose a Simple IP Control protocol over TCP for AV integrators. Each message is a fixed 24-byte frame with a 4-character command code and 16-byte parameter field. The spec covers power, input, volume, mute, picture mute, scene, IR passthrough, and basic network identification commands, plus unsolicited notify events.

<!-- UNRESOLVED: source notes EU area models have 3 RED-DA specifications with differing settings/commands; per-specification availability not enumerated -->

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
# - powerable       (inferred from setPowerStatus / togglePowerStatus / getPowerStatus)
# - routable        (inferred from setInput / getInput)
# - queryable       (inferred from getPowerStatus, getInput, getAudioVolume, getAudioMute, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress)
# - levelable       (inferred from setAudioVolume / getAudioVolume)
```

## Actions
```yaml
# Protocol note: every frame is exactly 24 bytes:
#   Byte[0-1]   Header   0x2A 0x53 ("*S"), fixed
#   Byte[2]     Type     0x43 [C] Control | 0x45 [E] Enquiry | 0x41 [A] Answer | 0x4E [N] Notify
#   Byte[3-6]   Command  Four-CC ASCII
#   Byte[7-22]  Params   16 bytes, right-padded with "0" (numeric) or "#" (string/enquiry)
#   Byte[23]    Footer   0x0A (LF), fixed
#
# command strings below show the literal 23-byte payload (header + type + FourCC + 16-byte params);
# append 0x0A LF to make the full 24-byte frame.

- id: set_ircc_code
  label: Set IRCC Code (IR Passthrough)
  kind: action
  command: "*SCIRCC{ircc_code}####"
  params:
    - name: ircc_code
      type: string
      description: |
        IR code as a 2-digit decimal pair right-padded with "#" to fill the 16-byte
        param field. Examples from source:
          Display=05, Home=06, Options=07, Return=08, Up=09, Down=10, Right=11,
          Left=12, Confirm=13, Red=14, Green=15, Yellow=16, Blue=17, Num1=18,
          Num2=19, Num3=20, Num4=21, Num5=22, Num6=23, Num7=24, Num8=25, Num9=26,
          Num0=27, VolumeUp=30, VolumeDown=31, Mute=32, ChannelUp=33, ChannelDown=34,
          Subtitle=35, DOT=38, PictureOff=50, Wide=61, Jump=62, SyncMenu=76,
          Forward=77, Play=78, Rewind=79, Prev=80, Stop=81, Next=82, Pause=84,
          FlashPlus=86, FlashMinus=87, TVPower=98, Audio=99, Input=101, Sleep=104,
          SleepTimer=105, Video2=108, PictureMode=110, DemoSurround=121,
          HDMI1=124, HDMI2=125, HDMI3=126, HDMI4=127, ActionMenu=129, Help=130

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}"
  params:
    - name: state
      type: integer
      description: "0 = Standby (Off), 1 = Active (On)"

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
  command: "*SCVOLU000000000000{volume_padded}"
  params:
    - name: volume_padded
      type: string
      description: |
        Volume value right-aligned in a 4-character zero-padded decimal field occupying
        bytes 19-22. Source example: volume 41 → "0029" → frame "...0000000000000029".

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      description: "0 = Unmute, 1 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT000000000{type}{number_padded}"
  params:
    - name: type
      type: integer
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring (single ASCII digit at byte 14)"
    - name: number_padded
      type: string
      description: "Input number 1-9999, zero-padded to 4 ASCII digits in bytes 19-22"

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      description: "0 = Disable picture mute (screen on), 1 = Enable picture mute (screen black)"

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
  command: "*SCSCEN{value_padded}"
  params:
    - name: value_padded
      type: string
      description: |
        Case-sensitive scene name right-padded with "#" to 16 bytes.
        Source-defined values: "auto", "auto24pSync", "general".
        Source example: "auto24pSync" + "#####" → "auto24pSync#####"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADREth0##########"
  params:
    - name: interface
      type: string
      description: |
        Interface name left-aligned in 16-byte param field, right-padded with "#".
        Source example: "eth0" + 12 "#" → "eth0############".
        Source lists "eth0"; other interface names not enumerated.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADREth0##########"
  params:
    - name: interface
      type: string
      description: |
        Interface name left-aligned in 16-byte param field, right-padded with "#".
        Source example: "eth0" + 12 "#" → "eth0############".
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: |
    POWR Answer (byte 22): "0" = Standby (Off), "1" = Active (On), "FFFF…" = Error.

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  source: |
    AMUT Answer (byte 22): "0" = Not Muted, "1" = Muted, "FFFF…" = Error.

- id: input_source
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  source: |
    INPT Answer (byte 14): "1" = HDMI, "3" = Composite, "4" = Component,
    "5" = Screen Mirroring. Last 4 bytes = 1-9999 instance number.

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source: |
    PMUT Answer (byte 22): "0" = Disabled (Picture mute off), "1" = Enabled (Picture mute on).

- id: audio_volume
  type: integer
  source: |
    VOLU Answer bytes 7-22 contain a zero-padded decimal volume value.
    Source example: 41 → "0000000000000029".

- id: scene_setting
  type: enum
  values: [auto, auto24pSync, general]
  source: |
    SCEN Answer returns the 16-byte scene string (right-padded with "#").
    "N…" = Not available for the current input. "F…" = Error.

- id: broadcast_address
  type: string
  source: |
    BADR Answer bytes 7-22: IPv4 dotted-quad ASCII right-padded with "#".
    Source example: "192.168.0.14####".

- id: mac_address
  type: string
  source: |
    MADR Answer bytes 7-18: MAC address ASCII right-padded with "#" in bytes 19-22.

- id: control_result
  type: enum
  values: [success, error, not_found, not_available]
  source: |
    Any Control command's Answer (type "A") returns:
    bytes 7-22 = "0…0" (16 zeros) for Success,
                "F…F" (16 F's) for Error,
                "N…N" (16 N's) for Not Found (setInput) / Not available (setSceneSetting).
```

## Variables
```yaml
# Discrete-state setters are exposed as Actions; only one continuously-variable
# state is settable and worth tracking as a Variable.
- id: audio_volume
  type: integer
  range: ""  # UNRESOLVED: source gives no min/max; example value 41, no upper bound stated
  settable_via: set_audio_volume
  readable_via: get_audio_volume
  notes: "Source example uses 41 (0x29) right-aligned as 0029; no range bounds stated."
```

## Events
```yaml
# All events are unsolicited Notify frames (Byte[2] = 0x4E "N"), 24 bytes total
# (header "*S" + type + FourCC + 16-byte params + LF footer).
- id: fire_power_change
  label: Power Status Changed
  frame: "*SNPOWR000000000000000{state}"
  params:
    - name: state
      type: integer
      description: "0 = powering off, 1 = powering on"

- id: fire_input_change
  label: Input Changed
  frame: "*SNINPT000000000000000000"
  params: []

- id: fire_input_change_hdmi
  label: Input Changed (HDMI)
  frame: "*SNINPT000000000100{XXXX}"
  params:
    - name: XXXX
      type: string
      description: "HDMI instance 1-9999, 4 ASCII digits"

- id: fire_input_change_composite
  label: Input Changed (Composite)
  frame: "*SNINPT000000000300{XXXX}"
  params:
    - name: XXXX
      type: string
      description: "Composite instance 1-9999, 4 ASCII digits"

- id: fire_input_change_component
  label: Input Changed (Component)
  frame: "*SNINPT000000000400{XXXX}"
  params:
    - name: XXXX
      type: string
      description: "Component instance 1-9999, 4 ASCII digits"

- id: fire_input_change_screen_mirroring
  label: Input Changed (Screen Mirroring)
  frame: "*SNINPT000000000500{XXXX}"
  params:
    - name: XXXX
      type: string
      description: "Screen Mirroring instance 1-9999, 4 ASCII digits"

- id: fire_volume_change
  label: Volume Changed
  frame: "*SNVOLU000000000000{XXXX}"
  params:
    - name: XXXX
      type: string
      description: "New volume as 4 zero-padded ASCII digits (right-aligned in bytes 19-22)"

- id: fire_mute_change
  label: Mute State Changed
  frame: "*SNAMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      description: "0 = unmuted, 1 = muted"

- id: fire_picture_mute_change
  label: Picture Mute Changed
  frame: "*SNPMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      description: "0 = picture mute enabled, 1 = picture mute disabled"
```

## Macros
```yaml
# UNRESOLVED: source defines no multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures,
# or power-on sequencing requirements
```

## Notes
- Frames are 24 bytes total. The literal command strings above show 23 visible
  bytes (header `*S` + message type + FourCC + 16-byte param field); the 24th
  byte is the fixed 0x0A LF footer.
- Both wired and wireless LAN are supported. Computer and monitor must share
  the same network.
- Source notes EU area models have 3 RED-DA specifications; available commands
  and settings differ per specification. Non-EU behaviour assumed unless
  overridden.
- The source page is part of Sony's "BRAVIA Professional Displays Knowledge
  Center" rather than a model-specific manual. Command catalogue is
  BRAVIA-platform-wide, not KDL-WM15-exclusive.
- `setIrccCode` accepts 50+ IR remote-control codes enumerated in the source
  IR Commands table; they are encoded as a single IRCC action with an enum
  parameter rather than 50+ separate actions.
- Source example for power off request: `*SCPOWR0000000000000000` → answer
  `*SAPOWR0000000000000000` (accept) + `*SNPOWR0000000000000000` (notify: off).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: max audio volume value not stated in source -->
<!-- UNRESOLVED: source does not enumerate which IR codes are model-specific vs. universal -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - "https://aca.im/driver_docs/Sony/sony bravia simple ip control.pdf"
retrieved_at: 2026-05-26T04:31:42.826Z
last_checked_at: 2026-06-02T05:46:27.375Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:27.375Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched to source commands; port 20060 verified; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source notes EU area models have 3 RED-DA specifications with differing settings/commands; per-specification availability not enumerated"
- "source gives no min/max; example value 41, no upper bound stated"
- "source defines no multi-step sequences"
- "source contains no safety warnings, interlock procedures,"
- "firmware version compatibility not stated in source"
- "max audio volume value not stated in source"
- "source does not enumerate which IR codes are model-specific vs. universal"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
