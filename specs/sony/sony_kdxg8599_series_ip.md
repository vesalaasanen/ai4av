---
spec_id: admin/sony-kdxg8599-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXG8599 Series Control Spec"
manufacturer: Sony
model_family: "KDXG8599 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXG8599 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-05-26T12:23:40.416Z
last_checked_at: 2026-06-02T07:06:40.943Z
generated_at: 2026-06-02T07:06:40.943Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "KDXG8599 model number does not appear verbatim in the source; source covers \"BRAVIA 2014 models\" generically. Confirm applicability against a real KDXG8599 unit before publishing."
  - "no standalone variable registry documented in source."
  - "no macro sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "exact KDXG8599 hardware revision and firmware compatibility ranges are not stated; source describes \"BRAVIA 2014 models\" generically."
  - "behavior when Simple IP Control is disabled in TV menus (assumed: TCP port 20060 closed) is not explicitly stated."
  - "maximum concurrent client count for port 20060 not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:40.943Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched to source FourCC tokens; all transport parameters (TCP 20060, fixed 24-byte frame, no auth) verified; full source coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDXG8599 Series Control Spec

## Summary
Sony BRAVIA Simple IP Control Protocol (Low Level Protocol) for 2014-era BRAVIA TV models. Control runs over TCP using a 24-byte fixed-size message format (header `*S`, 1-byte type, 4-byte FourCC function, 16-byte parameter, `LF` footer). Must be enabled on the TV via Network > Home Network Setup > IP Control > Simple IP Control (or via Hotel/Pro Mode > IP Control > Simple IP Control).

<!-- UNRESOLVED: KDXG8599 model number does not appear verbatim in the source; source covers "BRAVIA 2014 models" generically. Confirm applicability against a real KDXG8599 unit before publishing. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
connection:
  keepalive: true
  idle_timeout_seconds: 30  # server disconnects if no command for 30 s
framing:
  type: fixed_length
  length_bytes: 24
  header_bytes: "2A 53"        # *S
  footer_byte: "0A"            # LF
  encoding: ascii_in_byte_frame
```

## Traits
```yaml
- powerable    # inferred from setPowerStatus / IR Power Off
- queryable    # inferred from getPowerStatus, getAudioVolume, getInput, etc.
- routable     # inferred from setInput / setInputSource
- levelable    # inferred from setAudioVolume
```

## Actions
```yaml
- id: set_ircc_code
  label: Send IRCC (IR-like) Code
  kind: action
  command: "*SCIRCC{code16}\n"   # 24-byte frame: 2A 53 43 'I' 'R' 'C' 'C' <16 ASCII digits> 0A
  params:
    - name: code16
      type: enum
      description: 16-character ASCII IR code from Table 5 (left-padded with '0'). Examples - Power Off=0000000000000000, Input=0000000000000001, Up=0000000000000009, Down=0000000000000010, Volume Up=0000000000000030, Volume Down=0000000000000031, Mute=0000000000000032, Channel Up=0000000000000033, Channel Down=0000000000000034, Home=0000000000000006, Confirm=0000000000000013, Return=0000000000000008, Netflix=0000000000000056, Play=0000000000000078, Stop=0000000000000081, Pause=0000000000000084, Num0=0000000000000027, Num1=0000000000000018, ... up to Social=0000000000000097. See source Table 5 for full list of ~95 codes.

- id: set_power_status_off
  label: Power Off (Standby)
  kind: action
  command: "*SCPOWR0000000000000000\n"
  params: []

- id: set_power_status_on
  label: Power On (Active)
  kind: action
  command: "*SCPOWR0000000000000001\n"
  params: []

- id: get_power_status
  label: Power Status Query
  kind: query
  command: "*EPOWR################\n"   # E type, 16 '#' parameter pad
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{level16}\n"
  params:
    - name: level16
      type: string
      description: Volume value in decimal, left-padded with '0' to 16 ASCII characters. Example "0000000000000029" sets volume 29.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*EVOLU################\n"
  params: []

- id: set_audio_mute_off
  label: Audio Unmute
  kind: action
  command: "*SCAMUT0000000000000000\n"
  params: []

- id: set_audio_mute_on
  label: Audio Mute
  kind: action
  command: "*SCAMUT0000000000000001\n"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*EAMUT################\n"
  params: []

- id: set_channel
  label: Set Channel (preset number)
  kind: action
  command: "*SCCHNN{channel16}\n"
  params:
    - name: channel16
      type: string
      description: 16-char preset channel string with literal '.' separator. Example "00000050.1000000" = channel 50.1, "00000006.0000000" = channel 6.

- id: get_channel
  label: Get Current Channel
  kind: query
  command: "*ECHNN################\n"
  params: []

- id: set_triplet_channel
  label: Set Channel (triplet, hexadecimal)
  kind: action
  command: "*SCTCHN{triplet12}####\n"
  params:
    - name: triplet12
      type: string
      description: 12 hex characters representing triplet ID, padded by 4 '#' on the right. Example "7FE07FE00400" → 32736.32736.1024.

- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "*ETCHN################\n"
  params: []

- id: set_input_source
  label: Set TV Input Source (broadcast)
  kind: action
  command: "*SCISRC{source16}\n"
  params:
    - name: source16
      type: enum
      description: TV broadcast input source, right-padded with '#' to 16 ASCII characters. Valid values from source - dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt. Example "dvbt############".

- id: get_input_source
  label: Get TV Input Source
  kind: query
  command: "*EISRC################\n"
  params: []

- id: set_input
  label: Set Active Input
  kind: action
  command: "*SCINPT{input16}\n"
  params:
    - name: input16
      type: string
      description: 16-digit ASCII input descriptor. "0000000000000000" = TV. For external inputs the leading 8 digits encode input type and trailing 8 digits encode index (1-9999). HDMI(n) = "00000001" + 8-digit n. SCART(n) = "00000002" + n. Composite(n) = "00000003" + n. Component(n) = "00000004" + n. Screen Mirroring(n) = "00000005" + n. PC RGB Input(n) = "00000006" + n.

- id: get_input
  label: Get Active Input
  kind: query
  command: "*EINPT################\n"
  params: []

- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "*SCPMUT0000000000000000\n"
  params: []

- id: set_picture_mute_on
  label: Enable Picture Mute (black screen)
  kind: action
  command: "*SCPMUT0000000000000001\n"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*EPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "*SCPIPI0000000000000000\n"
  params: []

- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "*SCPIPI0000000000000001\n"
  params: []

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "*EPIPI################\n"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "*SCTPIP################\n"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "*SCTPPP################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (eth0)
  kind: query
  command: "*EBADReth0############\n"   # 'eth0' followed by 12 '#' pads parameter to 16 bytes
  params:
    - name: interface
      type: string
      description: Network interface, right-padded with '#'. Source example uses "eth0". Reply pads broadcast address (e.g. "192.168.0.14") with '#' on the right.

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "*EMADReth0############\n"
  params:
    - name: interface
      type: string
      description: Network interface, right-padded with '#'. Source example uses "eth0". Reply returns MAC address right-padded with '#'.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source_function: POWR
  answer_examples:
    - "*APOWR0000000000000000\n"   # off
    - "*APOWR0000000000000001\n"   # on

- id: audio_volume
  type: integer
  description: Current audio volume value, returned as ASCII decimal left-padded with '0' in the 16-byte parameter.
  source_function: VOLU

- id: audio_mute
  type: enum
  values: [not_muted, muted]
  source_function: AMUT

- id: channel_preset
  type: string
  description: Preset channel number with '.' separator (e.g. "00000050.1000000").
  source_function: CHNN
  error_answer: "*ACHNNNNNNNNNNNNNNNNNN\n"   # "NN...NN" payload = no such channel

- id: triplet_channel
  type: string
  description: 12 hex chars representing channel triplet, padded with '#'.
  source_function: TCHN

- id: input_source
  type: string
  description: Current broadcast input source string (dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt), right-padded with '#'.
  source_function: ISRC

- id: active_input
  type: string
  description: 16-digit ASCII input descriptor. "0...0" = TV; otherwise 8-digit type + 8-digit index as in set_input.
  source_function: INPT

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source_function: PMUT

- id: pip
  type: enum
  values: [disabled, enabled]
  source_function: PIPI

- id: broadcast_address
  type: string
  description: IPv4 broadcast address for requested interface, right-padded with '#'.
  source_function: BADR

- id: mac_address
  type: string
  description: MAC address of requested interface, right-padded with '#'.
  source_function: MADR

- id: answer_success
  type: enum
  values: [success]
  description: Generic success answer - 16 ASCII '0' parameter on a Control acknowledgement.
  example: "*A<FUNC>0000000000000000\n"

- id: answer_error
  type: enum
  values: [error]
  description: Generic error answer - 16 ASCII 'F' parameter (e.g. invalid parameter).
  example: "*A<FUNC>FFFFFFFFFFFFFFFF\n"
```

## Variables
```yaml
# Variables are exposed through set_audio_volume / get_audio_volume,
# set_channel / get_channel, etc. No separate parameter store described in source.
# UNRESOLVED: no standalone variable registry documented in source.
```

## Events
```yaml
- id: fire_power_change
  type: notify
  source_function: POWR
  payloads:
    - "*NPOWR0000000000000000\n"   # powering off
    - "*NPOWR0000000000000001\n"   # powering on

- id: fire_channel_change
  type: notify
  source_function: CHNN
  description: Sent when channel changes. Payload uses the same 16-char preset format as set_channel.

- id: fire_input_change
  type: notify
  source_function: INPT
  description: Sent when active input changes. Payload uses the same 16-digit format as set_input (TV / HDMI / SCART / Composite / Component / Screen Mirroring / PC RGB Input).

- id: fire_volume_change
  type: notify
  source_function: VOLU
  description: Sent when volume changes. Payload is current volume value, ASCII decimal left-padded with '0'.

- id: fire_mute_change
  type: notify
  source_function: AMUT
  payloads:
    - "*NAMUT0000000000000000\n"   # unmuting
    - "*NAMUT0000000000000001\n"   # muting

- id: fire_pip_change
  type: notify
  source_function: PIPI
  payloads:
    - "*NPIPI0000000000000000\n"   # PIP disabled
    - "*NPIPI0000000000000001\n"   # PIP enabled

- id: fire_picture_mute_change
  type: notify
  source_function: PMUT
  payloads:
    - "*NPMUT0000000000000000\n"   # picture mute off
    - "*NPMUT0000000000000001\n"   # picture mute on
```

## Macros
```yaml
# UNRESOLVED: no macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Power-off command is non-destructive (standby).
```

## Notes
- Protocol version 0.6 per source title.
- Two control planes: High Level (HTTP / JSON-RPC, WebAPI) and Low Level (TCP / 24-byte binary). This spec covers the Low Level Protocol; all Low Level commands are also reachable via the High Level WebAPI per source §1.
- Every frame is exactly 24 bytes: `0x2A 0x53` header, 1-byte type (`C`/`E`/`A`/`N`), 4-byte FourCC, 16-byte parameter, `0x0A` footer. Parameters use ASCII digits / hex chars / `'#'` padding as documented per command.
- Parameter padding conventions vary by command — left-pad with `'0'` for numeric values (volume, channel preset), right-pad with `'#'` for variable-length strings (input source, interface name, MAC, broadcast address).
- Common Answer parameters per source Table 3: `0000000000000000` = success, `FFFFFFFFFFFFFFFF` = error. `NNNNNNNNNNNNNNNN` returned by `setChannel` / `setTripletChannel` / `setInput` = not found.
- Enquiry (`E`) requests use `################` (16 `'#'`) as the parameter.
- TCP connection is persistent across requests; server closes after 30 s of inactivity — client must reconnect or keepalive with traffic.
- IRCC code table (Table 5) lists ~95 codes; full enumeration is in the source. The action `set_ircc_code` accepts any code from that table as a 16-char left-padded ASCII parameter.

<!-- UNRESOLVED: exact KDXG8599 hardware revision and firmware compatibility ranges are not stated; source describes "BRAVIA 2014 models" generically. -->
<!-- UNRESOLVED: behavior when Simple IP Control is disabled in TV menus (assumed: TCP port 20060 closed) is not explicitly stated. -->
<!-- UNRESOLVED: maximum concurrent client count for port 20060 not stated. -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-05-26T12:23:40.416Z
last_checked_at: 2026-06-02T07:06:40.943Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:40.943Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched to source FourCC tokens; all transport parameters (TCP 20060, fixed 24-byte frame, no auth) verified; full source coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "KDXG8599 model number does not appear verbatim in the source; source covers \"BRAVIA 2014 models\" generically. Confirm applicability against a real KDXG8599 unit before publishing."
- "no standalone variable registry documented in source."
- "no macro sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "exact KDXG8599 hardware revision and firmware compatibility ranges are not stated; source describes \"BRAVIA 2014 models\" generically."
- "behavior when Simple IP Control is disabled in TV menus (assumed: TCP port 20060 closed) is not explicitly stated."
- "maximum concurrent client count for port 20060 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
