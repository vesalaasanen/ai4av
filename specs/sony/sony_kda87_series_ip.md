---
spec_id: admin/sony-kda87-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDA87 Series Control Spec"
manufacturer: Sony
model_family: "KDA87 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDA87 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-10T00:17:33.288Z
last_checked_at: 2026-06-10T07:33:49.275Z
generated_at: 2026-06-10T07:33:49.275Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA variant spec availability is conditional and not enumerated; source states \"3 types of specifications based on RED-DA compliance. Settings and available commands differ for each specification\" but the variant matrix is on a separate page not provided."
  - "source states parameter is the interface name (e.g. \"eth0\"), padded to 16 chars with \"#\". The set of valid interface names is not enumerated in source. Example payload is hard-coded to `eth0` above; replace with target interface."
  - "same as get_broadcast_address - interface name not enumerated in source."
  - "source does not describe multi-step sequences; remove or populate when source provides them."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements. EU models have RED-DA conditional command availability but the source does not characterize it as a safety interlock."
  - "volume min/max bounds not stated in source. Interface names for getBroadcastAddress / getMacAddress are not enumerated; `eth0` shown as example. Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-10T07:33:49.275Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions match their wire tokens exactly in the source command table. Transport (TCP 20060, no auth) verified. Bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KDA87 Series Control Spec

## Summary
BRAVIA Professional Displays "Simple IP control" protocol for the Sony KDA87 Series. Sony's proprietary SSIP runs over TCP port 20060 using fixed 24-byte messages (2-byte header `*S`, 1-byte type, 4-byte Four-CC command, 16-byte parameters, 1-byte LF footer). No authentication is required. The protocol supports power, input, volume, mute, picture mute, scene setting, IR-passthrough, and basic network discovery (broadcast address, MAC address) commands.

<!-- UNRESOLVED: EU RED-DA variant spec availability is conditional and not enumerated; source states "3 types of specifications based on RED-DA compliance. Settings and available commands differ for each specification" but the variant matrix is on a separate page not provided. -->

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
- routable        # inferred from setInput / getInput
- queryable       # inferred from getPowerStatus / getAudioVolume / etc.
- levelable       # inferred from setAudioVolume
```

## Actions
```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}\n"
  params:
    - name: state
      type: string
      enum: [off, on]
      description: 16th parameter byte (last) - "0" = Standby (Off), "1" = Active (On). Remaining 15 parameter bytes are "0". Full 24-byte message: `*SCPOWR` + 15×`0` + `0` or `1` + `\n`.

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}\n"
  params:
    - name: volume
      type: integer
      description: Volume as decimal, right-padded with "0" to 16 chars (e.g. `0000000000000029` for value 29). Source notes "Set the volume value in the decimal digit pad on the left with 0". Maximum/minimum not stated in source.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{mute}\n"
  params:
    - name: mute
      type: string
      enum: [off, on]
      description: 16th parameter byte - "0" = Unmute, "1" = Mute. Remaining 15 parameter bytes are "0".

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{kind}000{port}\n"
  params:
    - name: kind
      type: integer
      enum: [1, 3, 4, 5]
      description: 8th parameter byte (byte[14] of full message): 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring.
    - name: port
      type: integer
      description: 4-digit decimal, right-padded with "0" to 4 chars (e.g. "0001" for input 1). Range stated as 1-9999.

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}\n"
  params:
    - name: state
      type: string
      enum: [off, on]
      description: 16th parameter byte - "0" = Disables picture mute, "1" = Turns the screen black (picture mute). Remaining 15 parameter bytes are "0".

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene}\n"
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
      description: Scene name, right-padded with `#` to 16 chars (e.g. `auto24pSync#####`). Case-sensitive.

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0###########\n"
  params: []
  # UNRESOLVED: source states parameter is the interface name (e.g. "eth0"), padded to 16 chars with "#". The set of valid interface names is not enumerated in source. Example payload is hard-coded to `eth0` above; replace with target interface.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0###########\n"
  params: []
  # UNRESOLVED: same as get_broadcast_address - interface name not enumerated in source.

- id: set_ircc_code
  label: Set IR Remote Control Code
  kind: action
  command: "*SCIRCC00000000000000{code}\n"
  params:
    - name: code
      type: integer
      enum: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 38, 50, 61, 62, 76, 77, 78, 79, 80, 81, 82, 84, 86, 87, 98, 99, 101, 104, 105, 108, 110, 121, 124, 125, 126, 127, 129, 130]
      description: IR code value, 2-digit decimal at the last two parameter positions (byte[21..22]). Remaining 14 parameter bytes are "0". Codes from the IR Commands table. Common ones: Display=5, Home=6, Options=7, Return=8, Up=9, Down=10, Right=11, Left=12, Confirm=13, Red=14, Green=15, Yellow=16, Blue=17, Num1-9=18-26, Num0=27, Volume Up=30, Volume Down=31, Mute=32, Channel Up/Down=33/34, Subtitle=35, DOT=38, Picture Off=50, Wide=61, Jump=62, Sync Menu=76, Forward=77, Play=78, Rewind=79, Prev=80, Stop=81, Next=82, Pause=84, Flash Plus/Minus=86/87, TV Power=98, Audio=99, Input=101, Sleep=104, Sleep Timer=105, Video 2=108, Picture Mode=110, Demo Surround=121, HDMI 1-4=124-127, Action Menu=129, Help=130.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  # Answer to getPowerStatus: byte[22] = "0" → Standby (Off); "1" → Active (On). "F…" → error.

- id: audio_volume
  type: integer
  # Answer to getAudioVolume: 16 parameter bytes - decimal volume right-padded with "0".

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  # Answer to getAudioMute: byte[22] = "0" → Not Muted; "1" → Muted. "F…" → error.

- id: current_input
  type: object
  # Answer to getInput: byte[14] = input kind (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring); bytes[19..22] = 4-digit port number, right-padded with "0".

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  # Answer to getPictureMute: byte[22] = "0" → Disabled; "1" → Enabled. "F…" → error.

- id: scene_setting
  type: string
  enum: [auto, auto24pSync, general]
  # Answer to getSceneSetting: 16-byte parameter string, right-padded with "#". "N…" → not available for current input. "F…" → error.

- id: broadcast_address
  type: string
  # Answer to getBroadcastAddress: 16-byte IPv4 address string, right-padded with "#" (e.g. "192.168.0.14####").

- id: mac_address
  type: string
  # Answer to getMacAddress: 12-hex MAC, right-padded with "#" to 16 chars.

- id: command_result
  type: enum
  values: [success, not_found, error, not_available]
  # Common Answer prefix: 16×"0" = success; 16×"F" = error; 16×"N" = not found / not available for current input.
```

## Variables
```yaml
# No settable parameters beyond those exposed via Actions (volume, mute, input, picture mute, scene, power).
```

## Events
```yaml
- id: fire_power_change
  command: "*SNPOWR000000000000000{state}\n"
  description: Sent by monitor on power change. byte[22] = "0" → powering off, "1" → powering on.
  params:
    - name: state
      type: string
      enum: [off, on]

- id: fire_input_change
  command: "*SNINPT0000000000{kind}000{port}\n"
  description: Sent by monitor on input change. byte[14] = input kind (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring); bytes[19..22] = 4-digit port, right-padded with "0". A `0000000000000000` payload is sent for generic input change events.
  params:
    - name: kind
      type: integer
      enum: [0, 1, 3, 4, 5]
    - name: port
      type: integer

- id: fire_volume_change
  command: "*SNVOLU{volume}\n"
  description: Sent by monitor on volume change. 16-byte decimal volume, right-padded with "0".
  params:
    - name: volume
      type: integer

- id: fire_mute_change
  command: "*SNAMUT000000000000000{state}\n"
  description: Sent by monitor on mute state change. byte[22] = "0" → unmuting, "1" → muting.
  params:
    - name: state
      type: string
      enum: [unmuted, muted]

- id: fire_picture_mute_change
  command: "*SNPMUT000000000000000{state}\n"
  description: Sent by monitor on picture mute change. byte[22] = "0" → picture mute enabled, "1" → picture mute disabled. (Note: inverted relative to the set/get command polarity.)
  params:
    - name: state
      type: string
      enum: [enabled, disabled]
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences; remove or populate when source provides them.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements. EU models have RED-DA conditional command availability but the source does not characterize it as a safety interlock.
```

## Notes
- Frame format: 24 bytes total. Header `*S` (0x2A 0x53), then byte[2] = type (`C`/`E`/`A`/`N`), bytes[3..6] = Four-CC command, bytes[7..22] = 16-byte parameter block, byte[23] = LF (0x0A).
- Padding: parameter block is always exactly 16 bytes. Numeric values are right-padded with `0`; string values are right-padded with `#`; unused fields are filled with `#` for enquiry/control-without-parameters and `0` for success answers or `F` for error answers.
- Message type semantics: Control (`C`) Client→Monitor with no parameters used for toggle functions; Enquiry (`E`) Client→Monitor with no parameters; Answer (`A`) Monitor→Client (16×`0` = success, 16×`F` = error, 16×`N` = not found / not available for current input); Notify (`N`) Monitor→Client unsolicited events.
- Netcat example from source: `netcat [IP address] 20060`, then send `*SCPOWR0000000000000000\n` to power off. The monitor responds with `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (accept + notify).
- EU RED-DA: source flags that EU-area models have 3 RED-DA compliance variants with different available command sets; this spec reflects the commands listed for the base protocol and does not enumerate per-variant deltas.
- IR command codes are passed via `setIrccCode` and the enum above covers the full IR Commands table from the source.
<!-- UNRESOLVED: volume min/max bounds not stated in source. Interface names for getBroadcastAddress / getMacAddress are not enumerated; `eth0` shown as example. Firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-10T00:17:33.288Z
last_checked_at: 2026-06-10T07:33:49.275Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:33:49.275Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions match their wire tokens exactly in the source command table. Transport (TCP 20060, no auth) verified. Bidirectional coverage complete. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA variant spec availability is conditional and not enumerated; source states \"3 types of specifications based on RED-DA compliance. Settings and available commands differ for each specification\" but the variant matrix is on a separate page not provided."
- "source states parameter is the interface name (e.g. \"eth0\"), padded to 16 chars with \"#\". The set of valid interface names is not enumerated in source. Example payload is hard-coded to `eth0` above; replace with target interface."
- "same as get_broadcast_address - interface name not enumerated in source."
- "source does not describe multi-step sequences; remove or populate when source provides them."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements. EU models have RED-DA conditional command availability but the source does not characterize it as a safety interlock."
- "volume min/max bounds not stated in source. Interface names for getBroadcastAddress / getMacAddress are not enumerated; `eth0` shown as example. Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
