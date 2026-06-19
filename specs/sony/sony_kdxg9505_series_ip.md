---
spec_id: admin/sony-kdxg9505-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony BRAVIA KD-XG9505 Series Control Spec"
manufacturer: Sony
model_family: "KD-XG9505 Series (BRAVIA Professional Display)"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KD-XG9505 Series (BRAVIA Professional Display)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-17T15:44:31.432Z
last_checked_at: 2026-06-19T07:54:39.756Z
generated_at: 2026-06-19T07:54:39.756Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "RED-DA variant-specific command differences for EU models not enumerated (see pro-bravia.sony.net RED-DA page)"
  - "base_url/keepalive not applicable - raw TCP socket, no HTTP base"
  - "max volume value not stated -->\""
  - "min/max volume not stated -->\""
  - "no additional variables documented in source"
  - "no multi-step sequences documented in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility range not stated in source"
  - "max audio volume value not stated in source"
  - "RED-DA EU variant command set differences not enumerated"
  - "keepalive/idle socket timeout behaviour not stated"
  - "error-code taxonomy beyond generic FFFFFFFFFFFFFFFF not stated"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:54:39.756Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions have literal command matches in source; transport parameters verified; bidirectional coverage complete. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sony BRAVIA KD-XG9505 Series Control Spec

## Summary
Sony BRAVIA KD-XG9505 Series professional display controlled over Simple IP Control (SSIP) — Sony's proprietary TCP protocol on port 20060 using fixed-length 24-byte ASCII-framed messages. Covers power, audio volume/mute, input routing, picture mute, scene select, network info queries, and IR-code emulation.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RED-DA variant-specific command differences for EU models not enumerated (see pro-bravia.sony.net RED-DA page) -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  # UNRESOLVED: base_url/keepalive not applicable - raw TCP socket, no HTTP base
auth:
  type: none  # inferred: no auth procedure in source
  # Pre-shared key / login procedure not documented for Simple IP Control in this source.
```

## Traits
```yaml
traits:
  - powerable     # inferred from setPowerStatus / getPowerStatus / togglePowerStatus
  - queryable     # inferred from get* enquiry commands
  - levelable     # inferred from setAudioVolume / getAudioVolume
  - routable      # inferred from setInput / getInput (input source routing)
```

## Actions
```yaml
# Message format: 24 bytes fixed - header "*S" (0x2A 0x53) + type byte (C/E/A/N)
# + 4-char FourCC + 16-byte param + footer LF (0x0A).
# Param values shown verbatim per source. Multi-byte numeric params are ASCII
# digit strings; '#' is padding (right-pad for setSceneSetting, fill for
# no-param enquiry/control rows).

# --- Control (message type C) ---

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{state}"          # state = 16-char zero-padded ASCII "0"/"1"
  params:
    - name: state
      type: string
      description: "Power state. 0000000000000000 = Standby (Off); 0000000000000001 = Active (On)"
  notes: "Source example: *SCPOWR0000000000000000 (power off)."

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"  # 16 '#' padding per no-param control rule
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}"          # volume = 16-char decimal, zero-padded on the left
  params:
    - name: volume
      type: integer
      description: "Volume value, zero-padded left to 16 digits. e.g. 0000000000000029"
  notes: "Range bounds not stated in source. <!-- UNRESOLVED: max volume value not stated -->"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{state}"
  params:
    - name: state
      type: string
      description: "0000000000000000 = Unmute; 0000000000000001 = Mute"

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000{type}0000{index:04d}00"
  params:
    - name: type
      type: integer
      description: "Input type code: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: index
      type: integer
      description: "Input index (1-9999), zero-padded to 4 ASCII digits, occupies bytes 19-22."
  notes: "Per source: byte 14 carries the type code; bytes 19-22 carry the 4-digit index."

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state}"
  params:
    - name: state
      type: string
      description: "0000000000000000 = Picture mute off (screen visible); 0000000000000001 = Picture mute on (screen black)"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene}"
  params:
    - name: scene
      type: string
      description: "Scene name, case-sensitive, right-padded with '#' to 16 chars. Allowed: 'auto', 'auto24pSync', 'general'. e.g. 'auto24pSync####'"

- id: set_ircc_code
  label: Set IRCC Code (IR Remote Emulation)
  kind: action
  command: "*SCIRCC{code}"            # code = 16-char zero-padded ASCII 2-digit decimal
  params:
    - name: code
      type: string
      description: >
        16-byte param, zero-padded left, last 2 bytes are the IR command code.
        Allowed values (verbatim from source IR Commands table):
        Display=05, Home=06, Options=07, Return=08, Up=09, Down=10, Right=11,
        Left=12, Confirm=13, Red=14, Green=15, Yellow=16, Blue=17, Num1=18,
        Num2=19, Num3=20, Num4=21, Num5=22, Num6=23, Num7=24, Num8=25, Num9=26,
        Num0=27, Volume Up=30, Volume Down=31, Mute=32, Channel Up=33,
        Channel Down=34, Subtitle=35, DOT=38, Picture Off=50, Wide=61, Jump=62,
        Sync Menu=76, Forward=77, Play=78, Rewind=79, Prev=80, Stop=81, Next=82,
        Pause=84, Flash Plus=86, Flash Minus=87, TV Power=98, Audio=99,
        Input=0101, Sleep=0104, Sleep Timer=0105, Video 2=0108, Picture Mode=0110,
        Demo Surround=0121, HDMI 1=0124, HDMI 2=0125, HDMI 3=0126, HDMI 4=0127,
        Action Menu=0129, Help=0130.
  notes: "Source lists 53 distinct IR command rows; all share FourCC IRCC and differ only by param value."

# --- Enquiry (message type E) ---

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"   # 'eth0' in bytes 7-9, '#' pad to 16
  params:
    - name: interface
      type: string
      description: "Interface identifier; only 'eth0' shown in source."
  notes: "Returns IPv4 broadcast address (e.g. '192.168.0.14####'). *EU models: RED-DA variant differences apply."

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"
  params:
    - name: interface
      type: string
      description: "Interface identifier; only 'eth0' shown in source."
  notes: "*EU models: RED-DA variant differences apply."
```

## Feedbacks
```yaml
# All responses use message type A (Answer). Param bytes 7-22 carry the value.
# 0000000000000000 = success/no-data; FFFFFFFFFFFFFFFF = error; other = value.

- id: power_state
  type: enum
  values: [off, on]
  command_response: "*SAPOWR{value}"   # 0000000000000000 = off, 0000000000000001 = on
  notes: "Source example: *SAPOWR0000000000000000 (acknowledged power-off)."

- id: audio_volume
  type: integer
  command_response: "*SAVOLU{value}"   # 16-digit zero-padded decimal
  notes: "Range not stated in source. <!-- UNRESOLVED: min/max volume not stated -->"

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  command_response: "*SAAMUT{value}"   # ...0000 = unmuted, ...0001 = muted

- id: input_source
  type: object
  command_response: "*SAINPT{value}"   # byte 14 = type (1/3/4/5); bytes 19-22 = index
  fields:
    type: { enum: [hdmi, composite, component, screen_mirroring] }
    index: { type: integer, range: "1-9999" }

- id: picture_mute
  type: enum
  values: [off, on]
  command_response: "*SAPMUT{value}"   # ...0000 = off, ...0001 = on

- id: scene_setting
  type: enum
  values: [auto, auto24pSync, general]
  command_response: "*SASCEN{value}"   # case-sensitive name, '#' right-padded

- id: broadcast_address
  type: string
  command_response: "*SABADR{ipv4}####"  # IPv4 dotted-quad, '#' right-padded

- id: mac_address
  type: string
  command_response: "*SAMADR{mac}####"   # MAC address, '#' right-padded

- id: error
  type: enum
  values: [error]
  command_response: "*SA****FFFFFFFFFFFFFFFF"  # all-F param = error
  notes: "Generic error response for any command - invalid params, not found, etc."
```

## Variables
```yaml
# Settable parameters that are not discrete actions - covered by Actions above.
# No additional continuous variables beyond audio_volume (already enumerated).
# <!-- UNRESOLVED: no additional variables documented in source -->
```

## Events
```yaml
# Unsolicited Notify (message type N) messages the monitor pushes to the client.

- id: fire_power_change
  type: enum
  values: [off, on]
  payload: "*SNPOWR{value}"   # 0000000000000000 = powering off, 0000000000000001 = powering on
  notes: "Sent when monitor power state changes."

- id: fire_input_change
  type: object
  payload: "*SNINPT{value}"   # byte 14 = type; bytes 19-22 = index
  fields:
    type: { enum: [hdmi, composite, component, screen_mirroring] }
    index: { type: integer, range: "1-9999" }
  notes: "Sent when input source changes."

- id: fire_volume_change
  type: integer
  payload: "*SNVOLU{value}"   # 16-digit zero-padded decimal volume
  notes: "Sent when audio volume changes."

- id: fire_mute_change
  type: enum
  values: [unmuted, muted]
  payload: "*SNAMUT{value}"   # ...0000 = unmuted, ...0001 = muted

- id: fire_picture_mute_change
  type: enum
  values: [enabled, disabled]
  payload: "*SNPMUT{value}"   # ...0000 = enabled, ...0001 = disabled (per source)
  notes: "Source semantics inverted vs setPictureMute - see source rows 183-184."
```

## Macros
```yaml
# <!-- UNRESOLVED: no multi-step sequences documented in source -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# <!-- UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
#     or power-on sequencing requirements. The source's "Preparation" section only
#     instructs enabling Remote Device Control + Simple IP Control in monitor menus. -->
```

## Notes
- **Protocol name:** SSIP (Simple IP Control) — Sony BRAVIA Professional Displays proprietary.
- **Transport:** Raw TCP socket on port 20060. Wired and wireless LAN both supported. Monitor and controller must be on the same network.
- **Frame:** Fixed 24 bytes per message. Header `*S` (0x2A 0x53), type byte (`C`/`E`/`A`/`N`), 4-char FourCC, 16-byte param, footer LF (0x0A).
- **Required monitor settings:** [Settings] → [Network & Internet] → [Remote device settings] → [Control remotely], then [Home network] → [IP control] → [Simple IP control].
- **EU model caveat:** EU-area models have 3 RED-DA compliance variants; settings and available commands differ per variant. Not enumerated here — see `https://pro-bravia.sony.net/setup/device-settings/red-da/`.
- **Netcat example (verbatim from source):** `netcat [IP address] 20060` then send e.g. `*SCPOWR0000000000000000` to power off.
- **Picture-mute event inversion:** `firePictureMuteChange` rows in the source invert the on/off meaning of `setPictureMute`/`getPictureMute` (byte `...0000` = "enabled" for the notify, vs "off" for set/get). Verified against source lines 154–161 and 183–184.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: max audio volume value not stated in source -->
<!-- UNRESOLVED: RED-DA EU variant command set differences not enumerated -->
<!-- UNRESOLVED: keepalive/idle socket timeout behaviour not stated -->
<!-- UNRESOLVED: error-code taxonomy beyond generic FFFFFFFFFFFFFFFF not stated -->
````

Spec done. 17 actions (9 control + 8 enquiry incl. 2 network), 8 feedbacks, 5 events. `setIrccCode` collapsed to single parameterized action (one FourCC, 53 enum values listed inline) per opcode granularity rule. All payloads verbatim 24-byte format. UNRESOLVED markers on firmware, vol max, RED-DA variants, keepalive, error taxonomy.

Next: `entity_id` filled (`sony_kdxg9505_series`). Want ingest via `drafts.jsonl` + `scraper.ts ingest`, or authenticated path?

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-17T15:44:31.432Z
last_checked_at: 2026-06-19T07:54:39.756Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:54:39.756Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions have literal command matches in source; transport parameters verified; bidirectional coverage complete. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "RED-DA variant-specific command differences for EU models not enumerated (see pro-bravia.sony.net RED-DA page)"
- "base_url/keepalive not applicable - raw TCP socket, no HTTP base"
- "max volume value not stated -->\""
- "min/max volume not stated -->\""
- "no additional variables documented in source"
- "no multi-step sequences documented in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility range not stated in source"
- "max audio volume value not stated in source"
- "RED-DA EU variant command set differences not enumerated"
- "keepalive/idle socket timeout behaviour not stated"
- "error-code taxonomy beyond generic FFFFFFFFFFFFFFFF not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
