---
spec_id: admin/sony-kdlw790-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW790 Series Control Spec"
manufacturer: Sony
model_family: "KDLW790 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLW790 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control
retrieved_at: 2026-05-27T14:21:06.369Z
last_checked_at: 2026-05-31T22:30:33.049Z
generated_at: 2026-05-31T22:30:33.049Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic Sony BRAVIA \"Simple IP control\" page; per-family firmware constraints and KDLW790-specific quirks not stated. EU models have RED-DA compliance variants with differing command availability — not enumerated here."
  - "full parameter structure for the interface selector beyond"
  - "KDLW790-specific firmware version range supporting this protocol not stated. EU RED-DA variant command availability not enumerated. KDLW790-specific quirks (e.g. max volume, input count, supported scene list) not stated in this generic source."
verification:
  verdict: verified
  checked_at: 2026-05-31T22:30:33.049Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched FourCC codes and message types in the source; transport parameters verified; full command coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDLW790 Series Control Spec

## Summary
Sony BRAVIA Professional Display Simple IP control protocol over TCP port 20060. Fixed 24-byte messages with a 2-byte header (`*S` = 0x2A 0x53), 1-byte message type (Control/Enquiry/Answer/Notify), 4-byte FourCC command, 16-byte parameter field, and 1-byte LF footer (0x0A). Commands cover power, input select, volume, mute, picture mute, scene setting, IR pass-through, plus network info queries (broadcast address, MAC).

<!-- UNRESOLVED: source is the generic Sony BRAVIA "Simple IP control" page; per-family firmware constraints and KDLW790-specific quirks not stated. EU models have RED-DA compliance variants with differing command availability — not enumerated here. -->

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
- powerable    # inferred from setPowerStatus / togglePowerStatus
- routable     # inferred from setInput / getInput
- queryable    # inferred from get* enquiry commands
- levelable    # inferred from setAudioVolume
```

## Actions
```yaml
# Protocol envelope (fixed for every command):
#   bytes 0-1   : header 0x2A 0x53  ("*S")
#   byte  2     : message type (0x43=C, 0x45=E, 0x41=A, 0x4E=N)
#   bytes 3-6   : FourCC command (ASCII)
#   bytes 7-22  : 16-byte parameter field (left/right padded with '0' or '#')
#   byte  23    : footer 0x0A (LF)
# `command` field below shows bytes 0-22 as ASCII; 0x0A footer is implicit on the wire.

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{ir_code:16-chars-right-padded-with-#}"
  params:
    - name: ir_code
      type: string
      description: |
        IR command code, 2 hex digits left-padded with zeros, then right-padded
        with '#' to fill the 16-byte param field. Supported codes:
        Display=05, Home=06, Options=07, Return=08, Up=09, Down=10, Right=11,
        Left=12, Confirm=13, Red=14, Green=15, Yellow=16, Blue=17,
        Num1=18, Num2=19, Num3=20, Num4=21, Num5=22, Num6=23, Num7=24,
        Num8=25, Num9=26, Num0=27, VolumeUp=30, VolumeDown=31, Mute=32,
        ChannelUp=33, ChannelDown=34, Subtitle=35, DOT=38, PictureOff=50,
        Wide=61, Jump=62, SyncMenu=76, Forward=77, Play=78, Rewind=79,
        Prev=80, Stop=81, Next=82, Pause=84, FlashPlus=86, FlashMinus=87,
        TVPower=98, Audio=99, Input=101, Sleep=104, SleepTimer=105, Video2=108,
        PictureMode=110, DemoSurround=121, HDMI1=124, HDMI2=125, HDMI3=126,
        HDMI4=127, ActionMenu=129, Help=130.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{power}"
  params:
    - name: power
      type: integer
      enum: [0, 1]
      description: "0 = Standby (Off), 1 = Active (On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR0000000000000000"

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW0000000000000000"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume:2-digit-right-padded-with-0}"
  params:
    - name: volume
      type: integer
      description: "Volume value 0-99, right-padded with '0' to fill 16 bytes (e.g. 29 -> 0000000000000029)"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU0000000000000000"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{mute}"
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: "0 = Unmute, 1 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT0000000000000000"

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00000000000{input_type}000{number:4-digit}"
  params:
    - name: input_type
      type: integer
      enum: [1, 3, 4, 5]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring (occupies byte 14 of 16-byte param field)"
    - name: number
      type: integer
      description: "Input number 1-9999 (occupies bytes 19-22, 4 ASCII digits)"

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT0000000000000000"

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{mute}"
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: "0 = Disabled (picture shown), 1 = Enabled (screen blacked)"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT0000000000000000"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU0000000000000000"

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene:right-padded-with-#}"
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
      description: "Scene name, case-sensitive, right-padded with '#' to fill 16 bytes (e.g. auto24pSync#####)"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN0000000000000000"

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADRETH00000000000000"
  # UNRESOLVED: full parameter structure for the interface selector beyond
  # "eth0" prefix not exhaustively stated; this matches the single example given.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADRETH00000000000000"
  # UNRESOLVED: full parameter structure for the interface selector beyond
  # "eth0" prefix not exhaustively stated; this matches the single example given.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: "Returned in answer (A) message for getPowerStatus: 0=Standby, 1=Active. 'F'*16 = error."

- id: audio_volume_value
  type: integer
  description: "Returned in answer for getAudioVolume: 0-99 left-padded with zeros in 16-byte field."

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Returned in answer for getAudioMute: 0=Not Muted, 1=Muted. 'F'*16 = error."

- id: current_input
  type: object
  description: |
    Returned in answer for getInput / fireInputChange. Format matches
    setInput param layout: byte 14 = input type (1=HDMI, 3=Composite,
    4=Component, 5=Screen Mirroring); bytes 19-22 = 4-digit number (1-9999).
    'N'*16 = Not Found. 'F'*16 = Error.

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "Returned in answer for getPictureMute: 0=Disabled, 1=Enabled. 'F'*16 = error."

- id: scene_setting_value
  type: string
  description: "Returned in answer for getSceneSetting: scene name right-padded with '#'. 'N'*16 = Not available for current input. 'F'*16 = error."

- id: broadcast_address
  type: string
  description: "Returned in answer for getBroadcastAddress: IPv4 broadcast address as ASCII dots-and-digits, right-padded with '#'. 'F'*16 = error."

- id: mac_address
  type: string
  description: "Returned in answer for getMacAddress: MAC address as 12 hex digits, right-padded with '#'. 'F'*16 = error."

- id: command_result
  type: enum
  values: [success, error]
  description: "Generic answer (A) acknowledgement for any Control message: '0'*16 = Success, 'F'*16 = Error."
```

## Variables
```yaml
- id: power
  type: enum
  values: [off, on]
  settable_via: set_power_status
  queryable_via: get_power_status
  enum_codes:
    off: 0
    on: 1

- id: input_select
  type: object
  settable_via: set_input
  queryable_via: get_input
  fields:
    - name: input_type
      enum: [hdmi, composite, component, screen_mirroring]
      enum_codes:
        hdmi: 1
        composite: 3
        component: 4
        screen_mirroring: 5
    - name: number
      type: integer
      range: [1, 9999]

- id: audio_volume
  type: integer
  range: [0, 99]
  settable_via: set_audio_volume
  queryable_via: get_audio_volume

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  settable_via: set_audio_mute
  queryable_via: get_audio_mute
  enum_codes:
    unmuted: 0
    muted: 1

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  settable_via: set_picture_mute
  queryable_via: get_picture_mute
  enum_codes:
    disabled: 0
    enabled: 1

- id: scene_setting
  type: string
  enum: [auto, auto24pSync, general]
  settable_via: set_scene_setting
  queryable_via: get_scene_setting
```

## Events
```yaml
# Notify messages (type byte = 0x4E 'N') are unsolicited, monitor -> client.
# Same 24-byte envelope as control/answer messages; command FourCC mirrors
# the corresponding state variable.

- id: power_change
  description: "Sent on power state transition. Parameter last byte: 0=powering off, 1=powering on."
  message_type: notify
  command: "*SNPOWR000000000000000{state}"
  params:
    - name: state
      type: integer
      enum: [0, 1]

- id: input_change
  description: "Sent when active input changes. Param layout matches setInput (type in byte 14, 4-digit number in bytes 19-22)."
  message_type: notify
  command: "*SNINPT{16-byte param: 0000000{type}000{number}}"

- id: volume_change
  description: "Sent when audio volume changes. 16-byte param carries the new volume value, same format as setAudioVolume."
  message_type: notify
  command: "*SNVOLU{16-byte volume param}"

- id: mute_change
  description: "Sent on audio mute state change. Last param byte: 0=unmuting, 1=muting."
  message_type: notify
  command: "*SNAMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      enum: [0, 1]

- id: picture_mute_change
  description: "Sent on picture mute state change. Last param byte: 0=muted, 1=unmuted (note: polarity is inverted vs. setPictureMute)."
  message_type: notify
  command: "*SNPMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      enum: [0, 1]
```

## Macros
```yaml
[]
```

## Safety
```yaml
[]
```

## Notes
- All messages are exactly 24 bytes. The 0x0A LF footer (byte 23) is implicit in the `command` fields above; the visible ASCII payload is bytes 0-22.
- Parameter fields are 16 ASCII characters. Numeric values are left-padded with '0' (e.g. volume 29 -> `0000000000000029`). String values like scene names and IR codes are right-padded with '#'. Unused bytes in a control message (toggle, enquiry) are filled with '0'.
- The KDLW790 series is a Sony BRAVIA Professional Display family; the Simple IP control protocol is shared across BRAVIA Pro models. This spec reflects the generic Simple IP control command set, not KDLW790-specific behaviour.
- EU-area models: 3 RED-DA compliance variants exist with differing settings and available commands. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for the per-variant command list — not transcribed here.
- The simple `netcat` example in the source treats the 24-byte payload as opaque ASCII; in practice, parameter bytes may include any printable ASCII digit or '#' padding, but never a literal 0x0A inside the param field (since 0x0A terminates the message).
- Monitor-side prerequisite: Remote Device Control and Simple IP Control must be enabled in [Settings] -> [Network & Internet] before the port is open.

<!-- UNRESOLVED: KDLW790-specific firmware version range supporting this protocol not stated. EU RED-DA variant command availability not enumerated. KDLW790-specific quirks (e.g. max volume, input count, supported scene list) not stated in this generic source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control
retrieved_at: 2026-05-27T14:21:06.369Z
last_checked_at: 2026-05-31T22:30:33.049Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:30:33.049Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched FourCC codes and message types in the source; transport parameters verified; full command coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic Sony BRAVIA \"Simple IP control\" page; per-family firmware constraints and KDLW790-specific quirks not stated. EU models have RED-DA compliance variants with differing command availability — not enumerated here."
- "full parameter structure for the interface selector beyond"
- "KDLW790-specific firmware version range supporting this protocol not stated. EU RED-DA variant command availability not enumerated. KDLW790-specific quirks (e.g. max volume, input count, supported scene list) not stated in this generic source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
