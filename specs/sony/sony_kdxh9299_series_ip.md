---
spec_id: admin/sony-kdxh9299-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony BRAVIA KDXH9299 Series Control Spec"
manufacturer: Sony
model_family: KD-55XH9299
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-55XH9299
    - KD-65XH9299
    - KD-75XH9299
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-07-24T19:06:10.824Z
last_checked_at: 2026-08-05T08:46:14.875Z
generated_at: 2026-08-05T08:46:14.875Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic BRAVIA Simple IP Control reference, not a"
  - "exact min/max volume range not stated in source"
  - "only \"eth0\" interface shown in source; other interface names not documented"
  - "min/max range not stated in source"
  - "no multi-step sequences described in source"
  - "firmware version compatibility not stated in source"
  - "audio volume min/max range not stated in source"
  - "network interface names beyond \"eth0\" not documented"
  - "EU RED-DA variant command availability not documented"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:46:14.875Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions match their corresponding source FourCC commands (set/get/toggle variants per granularity rule); IR codes are params of IRCC; transport port 20060 and 24-byte format verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Sony BRAVIA KDXH9299 Series Control Spec

## Summary
Sony BRAVIA KDXH9299 series professional/consumer displays controlled over the
LAN via Sony's "Simple IP Control" (SSIP) protocol. Simple IP Control is a
fixed-size 24-byte ASCII protocol carried over TCP on listening port 20060,
supporting power, volume/mute, input routing, picture mute, scene setting, IR
remote-code injection, and device-info queries. Source document is the generic
BRAVIA Professional Displays "Simple IP control" reference, which applies to the
XH9299 series Android TV displays.

<!-- UNRESOLVED: source is the generic BRAVIA Simple IP Control reference, not a -->
<!-- model-specific XH9299 command supplement; some commands may behave differently -->
<!-- on consumer vs professional variants. EU-area models have 3 RED-DA spec -->
<!-- variants whose available commands/settings differ — variant mapping not -->
<!-- documented in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

### Wire format (applies to all commands below)
Every message is exactly 24 bytes: 2-byte header (`*S` = `0x2A 0x53`), 1-byte
message type (`C` control / `E` enquiry / `A` answer / `N` notify), 4-byte
FourCC command, 16-byte parameter field, 1-byte footer (`0x0A` LF). Parameter
fields are always 16 chars, left- or right-padded with `0` or `#` as shown.
Commands below are written as the 23 printable ASCII chars + implied trailing LF.

## Traits
```yaml
# - powerable   (setPowerStatus / togglePowerStatus / getPowerStatus present)
# - routable    (setInput / getInput input-routing commands present)
# - queryable   (get* enquiry commands return device state)
# - levelable   (setAudioVolume / getAudioVolume continuous volume control)
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# FourCC mnemonics documented in source (each = one action). Enum values / ranges
# inside a single mnemonic do NOT multiply. IR remote codes are all carried by
# the single setIrccCode (IRCC) mnemonic - enumerated in its params below.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}"
  params:
    - name: state
      type: enum
      description: "Last param char: 0 = Standby (Off), 1 = Active (On)"
      values:
        "0": Standby (Off)  # literal payload: *SCPOWR0000000000000000
        "1": Active (On)    # literal payload: *SCPOWR0000000000000001

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
  command: "*SCVOLU{volume:016d}"
  params:
    - name: volume
      type: integer
      description: "Volume value left-padded with 0 to 16 chars, e.g. 29 -> 0000000000000029"
  # UNRESOLVED: exact min/max volume range not stated in source

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
      type: enum
      description: "Last param char: 0 = Unmute, 1 = Mute"
      values:
        "0": Unmute
        "1": Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  # param field (16 chars) = 7x'0' + type(1) + 4x'0' + index(4 digits)
  command: "*SCINPT0000000{type}0000{index:04d}"
  params:
    - name: type
      type: enum
      description: "Input type code at param cell 7"
      values:
        "1": HDMI
        "3": Composite
        "4": Component
        "5": Screen Mirroring
    - name: index
      type: integer
      description: "Input index 1-9999 (4-digit zero-padded)"

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
      type: enum
      description: "Last param char: 0 = picture mute disabled, 1 = screen black (mute on)"
      values:
        "0": Disabled
        "1": Enabled (screen black)

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
  # param field = scene string left-aligned, right-padded with '#' to 16 chars.
  # Strings are case-sensitive. e.g. "auto24pSync#####"
  command: "*SCSCEN{scene_padded_16}"
  params:
    - name: scene
      type: enum
      description: "Scene name; field right-padded with '#' to 16 chars"
      values:
        auto: auto
        auto24pSync: auto24pSync
        general: general

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: set_ircc_code
  label: Set IRCC Code (IR Remote Command)
  kind: action
  # Sends an IR-remote-equivalent code. FourCC is always IRCC; the 16-char param
  # is the code (right-aligned, left-padded with '0' to 16 chars).
  command: "*SCIRCC{code}"
  params:
    - name: code
      type: enum
      description: "16-char IR code (verbatim from source IR Commands table)"
      values:
        "0000000000000005": Display
        "0000000000000006": Home
        "0000000000000007": Options
        "0000000000000008": Return
        "0000000000000009": Up
        "0000000000000010": Down
        "0000000000000011": Right
        "0000000000000012": Left
        "0000000000000013": Confirm
        "0000000000000014": Red
        "0000000000000015": Green
        "0000000000000016": Yellow
        "0000000000000017": Blue
        "0000000000000018": Num1
        "0000000000000019": Num2
        "0000000000000020": Num3
        "0000000000000021": Num4
        "0000000000000022": Num5
        "0000000000000023": Num6
        "0000000000000024": Num7
        "0000000000000025": Num8
        "0000000000000026": Num9
        "0000000000000027": Num0
        "0000000000000030": Volume Up
        "0000000000000031": Volume Down
        "0000000000000032": Mute
        "0000000000000033": Channel Up
        "0000000000000034": Channel Down
        "0000000000000035": Subtitle
        "0000000000000038": DOT
        "0000000000000050": Picture Off
        "0000000000000061": Wide
        "0000000000000062": Jump
        "0000000000000076": Sync Menu
        "0000000000000077": Forward
        "0000000000000078": Play
        "0000000000000079": Rewind
        "0000000000000080": Prev
        "0000000000000081": Stop
        "0000000000000082": Next
        "0000000000000084": Pause
        "0000000000000086": Flash Plus
        "0000000000000087": Flash Minus
        "0000000000000098": TV Power
        "0000000000000099": Audio
        "0000000000000101": Input
        "0000000000000104": Sleep
        "0000000000000105": Sleep Timer
        "0000000000000108": Video 2
        "0000000000000110": Picture Mode
        "0000000000000121": Demo Surround
        "0000000000000124": HDMI 1
        "0000000000000125": HDMI 2
        "0000000000000126": HDMI 3
        "0000000000000127": HDMI 4
        "0000000000000129": Action Menu
        "0000000000000130": Help

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"
  params: []
  # UNRESOLVED: only "eth0" interface shown in source; other interface names not documented

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"
  params: []
  # UNRESOLVED: only "eth0" interface shown in source; other interface names not documented
```

## Feedbacks
```yaml
# Observable states returned by Answer (A) messages or Notify (N) events.

- id: power_state
  type: enum
  values: [standby_off, active_on]
  query_action: get_power_status
  answer_map:
    "*SAPOWR0000000000000000": Standby (Off)
    "*SAPOWR0000000000000001": Active (On)

- id: audio_volume
  type: integer
  query_action: get_audio_volume
  # UNRESOLVED: min/max range not stated in source

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  query_action: get_audio_mute
  answer_map:
    "*SAAMUT0000000000000000": Not Muted
    "*SAAMUT0000000000000001": Muted

- id: input
  type: string
  query_action: get_input
  description: "type (1=HDMI,3=Composite,4=Component,5=Screen Mirroring) + 1-9999 index"
  answer_map:
    "*SAINPT000000010000XXXX": HDMI (1-9999)
    "*SAINPT000000030000XXXX": Composite (1-9999)
    "*SAINPT000000040000XXXX": Component (1-9999)
    "*SAINPT000000050000XXXX": Screen Mirroring (1-9999)

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  query_action: get_picture_mute
  answer_map:
    "*SAPMUT0000000000000000": Disabled (picture mute off)
    "*SAPMUT0000000000000001": Enabled (picture mute on)

- id: scene_setting
  type: string
  query_action: get_scene_setting
  values: [auto, auto24pSync, general]

- id: broadcast_address
  type: string
  query_action: get_broadcast_address

- id: mac_address
  type: string
  query_action: get_mac_address
```

## Variables
```yaml
# Settable continuous/non-discrete parameters. Discrete set operations are listed
# under Actions; the values below are the stateful targets those actions mutate.

- id: audio_volume_level
  type: integer
  description: "Audio volume target; range UNRESOLVED (min/max not stated in source)."
  set_action: set_audio_volume
  query_action: get_audio_volume
```

## Events
```yaml
# Unsolicited Notify (N) messages sent from monitor to client.

- id: fire_power_change
  fourcc: POWR
  description: Power state transition
  payloads:
    "*SNPOWR0000000000000000": Sent when powering off
    "*SNPOWR0000000000000001": Sent when powering on

- id: fire_input_change
  fourcc: INPT
  description: Input changed on the monitor
  payloads:
    "*SNINPT000000010000XXXX": HDMI (1-9999)
    "*SNINPT000000030000XXXX": Composite (1-9999)
    "*SNINPT000000040000XXXX": Component (1-9999)
    "*SNINPT000000050000XXXX": Screen Mirroring (1-9999)

- id: fire_volume_change
  fourcc: VOLU
  description: Audio volume changed

- id: fire_mute_change
  fourcc: AMUT
  description: Audio mute state changed
  payloads:
    "*SNAMUT0000000000000000": Sent when unmuting
    "*SNAMUT0000000000000001": Sent when muting

- id: fire_picture_mute_change
  fourcc: PMUT
  description: Picture mute state changed
  payloads:
    "*SNPMUT0000000000000000": Sent when picture mute enabled
    "*SNPMUT0000000000000001": Sent when picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents no safety warnings, interlocks, or power-on sequencing.
# Required monitor settings (must be enabled before IP control works):
#   [Settings] -> [Network & Internet] -> [Remote device settings] -> [Control remotely]
#   [Settings] -> [Network & Internet] -> [Home network] -> [IP control] -> [Simple IP control]
```

## Notes
- Protocol name: SSIP (BRAVIA Professional Displays proprietary). Listening port
  TCP 20060, fixed 24-byte messages, ASCII payload + trailing `0x0A` LF.
- Both wired and wireless LAN are supported; computer and monitor must share a
  network. Netcat example from source: `netcat <IP> 20060`.
- Answer convention: 16x `0` = success, 16x `F` = error; 16x `N` = not found /
  not available; `#` = don't-care padding for control/enquiry with no parameter.
- `*` (0x2A) `S` (0x53) header and `0x0A` footer are fixed on every message.
- EU-area models: 3 RED-DA compliance specification variants exist; settings and
  available commands differ per variant. Variant-specific command availability is
  not documented in this source.
- Source document is the generic BRAVIA Professional Displays "Simple IP Control"
  reference (https://pro-bravia.sony.net/remote-display-control/simple-ip-control/),
  applied to the KDXH9299 series; it is not an XH9299-specific command supplement.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: audio volume min/max range not stated in source -->
<!-- UNRESOLVED: network interface names beyond "eth0" not documented -->
<!-- UNRESOLVED: EU RED-DA variant command availability not documented -->
````

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-07-24T19:06:10.824Z
last_checked_at: 2026-08-05T08:46:14.875Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:46:14.875Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions match their corresponding source FourCC commands (set/get/toggle variants per granularity rule); IR codes are params of IRCC; transport port 20060 and 24-byte format verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic BRAVIA Simple IP Control reference, not a"
- "exact min/max volume range not stated in source"
- "only \"eth0\" interface shown in source; other interface names not documented"
- "min/max range not stated in source"
- "no multi-step sequences described in source"
- "firmware version compatibility not stated in source"
- "audio volume min/max range not stated in source"
- "network interface names beyond \"eth0\" not documented"
- "EU RED-DA variant command availability not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
