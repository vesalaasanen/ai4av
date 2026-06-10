---
spec_id: admin/sony-kdxe8004-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXE8004 Series Simple IP Control Spec"
manufacturer: Sony
model_family: "KDXE8004 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXE8004 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
retrieved_at: 2026-06-08T17:32:37.911Z
last_checked_at: 2026-06-09T07:21:02.277Z
generated_at: 2026-06-09T07:21:02.277Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP/JSON-RPC endpoint URL for the WebAPI layer is not in this source."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "HTTP/JSON-RPC WebAPI endpoint + method names not in this source."
  - "firmware version compatibility not stated in source."
  - "'Analog?' IR code label has a literal '?' in source; needs verification."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:21:02.277Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec action-units match their literal Four-CC commands in source Table 4; transport parameters (TCP port 20060, no auth) verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDXE8004 Series Simple IP Control Spec

## Summary
Sony BRAVIA 2014 series TVs provide IP control via Sony's "Simple IP Control" protocol on TCP port 20060. Frames are 24-byte fixed-size: 2-byte header `0x2A 0x53`, type byte, 4-byte Four-CC function, 16-byte parameter, 1-byte footer `0x0A`. The same command set is also exposed via HTTP/JSON-RPC ("WebAPI") on a higher layer. This spec catalogs the Low Level (TCP) commands — set/get state for power, volume, mute, channel, input, picture mute, and PIP, plus a large IR-like code table.

<!-- UNRESOLVED: HTTP/JSON-RPC endpoint URL for the WebAPI layer is not in this source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format (24 bytes):**
- Header: `0x2A 0x53` (fixed)
- Type: `0x43` Control / `0x45` Enquiry / `0x41` Answer / `0x4E` Notify
- Function: 4 ASCII characters (Four-CC)
- Parameter: 16 bytes
- Footer: `0x0A` (LF, fixed)

Server disconnects after 30 s idle.

## Traits
```yaml
- powerable   # inferred from setPowerStatus / getPowerStatus
- routable    # inferred from setInput / setInputSource / setChannel commands
- queryable   # inferred from get* Enquiry commands
- levelable   # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
# Each action payload is a 24-byte frame:
#   0x2A 0x53 [type] [F0 F1 F2 F3] [P0..P15] 0x0A
# Type is 'C' (0x43) for Control, 'E' (0x45) for Enquiry.
# Four-CC strings are written in quotes inside the command field;
# the implementer must pack each as four ASCII bytes at offset 3.

- id: set_ircc_code
  label: Send IR-like Code (setIrccCode)
  kind: action
  command: "0x2A 0x53 0x43 I R C C [P0..P15] 0x0A  # FourCC=IRCC; P=IR function code from Table 5"
  params:
    - name: ir_function
      type: string
      description: IR function name from Table 5 (e.g. "Power Off", "Volume Up", "Num1")

- id: set_power_status_standby
  label: Set Power Standby
  kind: action
  command: "0x2A 0x53 0x43 P O W R 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x0A  # FourCC=POWR; P last byte = 0x00 (Standby)"
  params: []

- id: set_power_status_active
  label: Set Power Active (On)
  kind: action
  command: "0x2A 0x53 0x43 P O W R 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x31 0x0A  # FourCC=POWR; P last byte = 0x01 (Active)"
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x2A 0x53 0x45 P O W R 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=POWR; Enquiry"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "0x2A 0x53 0x43 V O L U [volume_digits] 0x0A  # FourCC=VOLU; P=right-padded decimal (e.g. 0x30..0x32 0x39 = 0000000000000029 = 41)"
  params:
    - name: volume
      type: integer
      description: Volume level, ASCII decimal digits, right-padded with '0' to fill 16 bytes

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "0x2A 0x53 0x45 V O L U 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=VOLU"
  params: []

- id: set_audio_mute_unmute
  label: Set Audio Mute Off
  kind: action
  command: "0x2A 0x53 0x43 A M U T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x0A  # FourCC=AMUT; P last byte = 0x00"
  params: []

- id: set_audio_mute_mute
  label: Set Audio Mute On
  kind: action
  command: "0x2A 0x53 0x43 A M U T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x31 0x0A  # FourCC=AMUT; P last byte = 0x01"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "0x2A 0x53 0x45 A M U T 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=AMUT"
  params: []

- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "0x2A 0x53 0x43 C H N N [preset_major][.][preset_minor][pad] 0x0A  # FourCC=CHNN; e.g. 00000050.1000000 = ch 50.1, 00000006.0000000 = ch 6"
  params:
    - name: preset
      type: string
      description: "Preset channel as 'MAJOR.MINOR' with major/minor each left-padded with '0' to 8 digits"

- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "0x2A 0x53 0x45 C H N N 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=CHNN"
  params: []

- id: set_triplet_channel
  label: Set Channel (triplet, hex)
  kind: action
  command: "0x2A 0x53 0x43 T C H N [triplet_hex] 0x0A  # FourCC=TCHN; e.g. 0x37 0x46 0x45 0x30 0x37 0x46 0x45 0x30 0x30 0x34 0x30 0x30 = 32736.32736.1024"
  params:
    - name: triplet
      type: string
      description: Triplet channel as 12-byte hex (e.g. "7FE07FE00400")

- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "0x2A 0x53 0x45 T C H N 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=TCHN"
  params: []

- id: set_input_source
  label: Set TV Input Source (tuner)
  kind: action
  command: "0x2A 0x53 0x43 I S R C [source_padded] 0x0A  # FourCC=ISRC; e.g. dvbt############, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt"
  params:
    - name: source
      type: string
      description: "Tuner source mnemonic right-padded with '#' to fill 16 bytes (e.g. 'dvbt', 'cable')"

- id: get_input_source
  label: Get TV Input Source
  kind: query
  command: "0x2A 0x53 0x45 I S R C 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=ISRC"
  params: []

- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x0A  # FourCC=INPT; byte 7 = 0x00 (TV)"
  params: []

- id: set_input_hdmi
  label: Set Input to HDMI (1-9999)
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x31 [port_padded] 0x0A  # FourCC=INPT; byte 7 = 0x01 (HDMI)"
  params:
    - name: port
      type: integer
      description: HDMI port number 1-9999, ASCII decimal right-padded with '0' to fill last 4 bytes

- id: set_input_scart
  label: Set Input to SCART (1-9999)
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x32 [port_padded] 0x0A  # FourCC=INPT; byte 7 = 0x02 (SCART)"
  params:
    - name: port
      type: integer
      description: SCART port number 1-9999

- id: set_input_composite
  label: Set Input to Composite (1-9999)
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x33 [port_padded] 0x0A  # FourCC=INPT; byte 7 = 0x03 (Composite)"
  params:
    - name: port
      type: integer
      description: Composite port number 1-9999

- id: set_input_component
  label: Set Input to Component (1-9999)
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x34 [port_padded] 0x0A  # FourCC=INPT; byte 7 = 0x04 (Component)"
  params:
    - name: port
      type: integer
      description: Component port number 1-9999

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring (1-9999)
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x35 [port_padded] 0x0A  # FourCC=INPT; byte 7 = 0x05 (Screen Mirroring)"
  params:
    - name: port
      type: integer
      description: Screen Mirroring port number 1-9999

- id: set_input_pc_rgb
  label: Set Input to PC RGB (1-9999)
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x36 [port_padded] 0x0A  # FourCC=INPT; byte 7 = 0x06 (PC RGB)"
  params:
    - name: port
      type: integer
      description: PC RGB port number 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "0x2A 0x53 0x45 I N P T 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=INPT"
  params: []

- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 P M U T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x0A  # FourCC=PMUT; P last byte = 0x00"
  params: []

- id: set_picture_mute_on
  label: Enable Picture Mute (blank screen)
  kind: action
  command: "0x2A 0x53 0x43 P M U T 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x31 0x0A  # FourCC=PMUT; P last byte = 0x01"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "0x2A 0x53 0x45 P M U T 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=PMUT"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 T P M U 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=TPMU"
  params: []

- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "0x2A 0x53 0x43 P I P I 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x0A  # FourCC=PIPI; P last byte = 0x00"
  params: []

- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "0x2A 0x53 0x43 P I P I 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x30 0x31 0x0A  # FourCC=PIPI; P last byte = 0x01"
  params: []

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "0x2A 0x53 0x45 P I P I 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=PIPI"
  params: []

- id: toggle_pip
  label: Toggle PIP Status
  kind: action
  command: "0x2A 0x53 0x43 T P I P 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=TPIP"
  params: []

- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "0x2A 0x53 0x43 T P P P 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x0A  # FourCC=TPPP"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (eth0)
  kind: query
  command: "0x2A 0x53 0x45 B A D R e t h 0 [pad] 0x0A  # FourCC=BADR; param starts with 'eth0' then '#' padding"
  params: []

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "0x2A 0x53 0x45 M A D R e t h 0 [pad] 0x0A  # FourCC=MADR; param starts with 'eth0' then '#' padding"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: "getPowerStatus answer: P last byte 0x00 = Standby, 0x01 = Active"

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: "getAudioMute answer: 0x00 = Not Muted, 0x01 = Muted"

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: "getPictureMute answer: 0x00 = Disabled, 0x01 = Enabled"

- id: pip_state
  type: enum
  values: [disabled, enabled]
  source: "getPip answer: 0x00 = Disabled, 0x01 = Enabled"

- id: current_input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  source: "getInput answer: byte 7 selects family; last 4 bytes (right-padded '0') carry 1-9999 port"

- id: current_tuner_source
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
  source: "getInputSource answer: right-padded '#' string"

- id: channel_preset
  type: string
  source: "getChannel answer: 'MAJOR.MINOR' with 8-digit zero-padded fields"

- id: channel_triplet
  type: string
  source: "getTripletChannel answer: 12 hex digits representing major.minor.sub"

- id: broadcast_address
  type: string
  source: "getBroadcastAddress answer: ASCII IPv4 right-padded with '#'"

- id: mac_address
  type: string
  source: "getMacAddress answer: ASCII MAC right-padded with '#'"
```

## Events
```yaml
# Unsolicited Notify (type 0x4E) frames the TV sends to the controller.
# Each is the same 24-byte frame layout with type = 0x4E.

- id: power_change
  source: "firePowerChange (N POWR): P last byte 0x00 = powering off, 0x01 = powering on"

- id: channel_change
  source: "fireChannelChange (N CHNN): P carries MAJOR.MINOR preset (same format as set_channel)"

- id: input_change
  source: "fireInputChange (N INPT): byte 7 selects family (TV/HDMI/SCART/Composite/Component/Screen Mirroring/PC RGB), port in last 4 bytes"

- id: volume_change
  source: "fireVolumeChange (N VOLU): P carries new volume as right-padded decimal"

- id: mute_change
  source: "fireMuteChange (N AMUT): P last byte 0x00 = unmuting, 0x01 = muting"

- id: pip_change
  source: "firePipChange (N PIPI): P last byte 0x00 = disabled, 0x01 = enabled"

- id: picture_mute_change
  source: "firePictureMuteChange (N PMUT): P last byte 0x00 = disabled, 0x01 = enabled"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Frame structure is fixed at 24 bytes: `0x2A 0x53 [type] [Four-CC] [16-byte param] 0x0A`. Each Four-CC is four ASCII characters.
- Server disconnects after 30 s of client idle; clients must keep-alive or reconnect.
- High-level HTTP/JSON-RPC ("WebAPI") layer exists per §1 of the source, but endpoint URL/method names are not in this document.
- IR function codes (Table 5) are emitted via the `setIrccCode` (IRCC) action with a 16-byte parameter, e.g. `0x00..0x00` = Power Off, `0x00..0x30` = Volume Up. The full table is large (≈90 entries) and is parameterized rather than enumerated as separate actions.
- `Analog?` row in Table 5 appears in the source with a literal `?` and is preserved as-is; flag for operator review.
- Volume is encoded as ASCII decimal digits, right-padded with ASCII `0` (`0x30`) to fill 16 bytes — not as a binary integer.
- The source notes BRAVIA 2014 models; cross-check KDXE8004 series firmware compatibility before deployment.

<!-- UNRESOLVED: HTTP/JSON-RPC WebAPI endpoint + method names not in this source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: 'Analog?' IR code label has a literal '?' in source; needs verification. -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
retrieved_at: 2026-06-08T17:32:37.911Z
last_checked_at: 2026-06-09T07:21:02.277Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:21:02.277Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec action-units match their literal Four-CC commands in source Table 4; transport parameters (TCP port 20060, no auth) verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP/JSON-RPC endpoint URL for the WebAPI layer is not in this source."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "HTTP/JSON-RPC WebAPI endpoint + method names not in this source."
- "firmware version compatibility not stated in source."
- "'Analog?' IR code label has a literal '?' in source; needs verification."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
