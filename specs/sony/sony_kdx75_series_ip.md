---
spec_id: admin/sony-kdx75-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sony KDX75 Series Control Spec"
manufacturer: Sony
model_family: "KDX75 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX75 Series"
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
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T05:22:09.696Z
last_checked_at: 2026-06-12T19:48:43.548Z
generated_at: 2026-06-12T19:48:43.548Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU model RED-DA compliance variations not documented in full"
  - "no safety warnings or interlock procedures in source"
  - "full IR command code table truncated at 278 lines (Help=130 is last entry shown); getBroadcastAddress/getMacAddress answer payload format partially documented (interface name \"eth0\" is the only example given)"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:48:43.548Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched verbatim in source command table with correct SSIP Four-CC mnemonics and parameter shapes. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDX75 Series Control Spec

## Summary
Sony KDX75 Series professional display controlled over TCP/IP via Simple IP Control (SSIP) protocol on port 20060. Fixed 24-byte messages with 0x2A 0x53 header, Four-CC command codes, and 0x0A footer. Supports power, volume, mute, input selection, picture mute, scene setting, network queries, and IR remote code passthrough.

<!-- UNRESOLVED: EU model RED-DA compliance variations not documented in full -->

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
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{0|1}\n"  # 0=Standby, 1=Active; \n = 0x0A footer; header 0x2A 0x53 implied
  params:
    - name: power
      type: integer
      enum: [0, 1]
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"  # E=0x45 enquiry; # = 0x23
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"  # C=0x43 control, no params
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU00000000000000{vol:02d}\n"  # volume right-padded with '0' to 16 digits, e.g. 0000000000000029
  params:
    - name: volume
      type: integer
      description: Decimal value padded left with zeros to 16 digits, e.g., 0000000000000029

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{0|1}\n"  # 0=Unmute, 1=Mute
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT000000000{type}000{port:04d}\n"  # type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; port 1-9999
  params:
    - name: input_type
      type: integer
      enum: [1, 3, 4, 5]
      description: Input source code (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring)
    - name: port
      type: integer
      description: Port number (1-9999), right-padded with '0' to 4 digits

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{0|1}\n"  # 0=Disable, 1=Enable (screen black)
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Disable (picture on), 1 = Enable (screen black)

- id: get_picture_mute
  label: Get Picture Mute Status
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
  command: "*SCSCEN{scene:<16}#\n"  # scene left-justified, right-padded with '#' to 16 chars
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
      description: Scene name (auto, auto24pSync, general) - case-sensitive, padded right with #

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: set_ircc_code
  label: Send IR Command
  kind: action
  command: "*SCIRCC0000000000000{code:04d}\n"  # IR code right-padded with '0' to 16 digits, e.g. 0005=Display
  params:
    - name: code
      type: integer
      description: IR command code (e.g., 5=Display, 6=Home, 18=Num1, 124=HDMI1, etc.) - see IR Commands table

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "*SEBADR{interface:<12}#\n"  # e.g. eth0 padded right with '#' to 16 chars
  params:
    - name: interface
      type: string
      description: Network interface name (e.g., eth0), right-padded with '#' to 16 chars

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface:<12}#\n"  # e.g. eth0 padded right with '#' to 16 chars
  params:
    - name: interface
      type: string
      description: Network interface name (e.g., eth0), right-padded with '#' to 16 chars
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - 0  # Standby (Off)
    - 1  # Active (On)
    - FFFFFFFF  # Error (16 hex F's)

- id: audio_volume
  label: Audio Volume
  type: integer
  values:
    - XXXXXXXXXXXXXXXX  # Success with volume value (16-digit decimal, right-padded with '0')
    - FFFFFFFF  # Error (16 hex F's)

- id: audio_mute_status
  label: Audio Mute Status
  type: enum
  values:
    - 0  # Not Muted
    - 1  # Muted
    - FFFFFFFF  # Error (16 hex F's)

- id: input_status
  label: Input Status
  type: enum
  values:
    - 000000010000XXXX  # HDMI (1-9999, port right-padded with '0' to 4 digits)
    - 000000030000XXXX  # Composite (1-9999)
    - 000000040000XXXX  # Component (1-9999)
    - 000000050000XXXX  # Screen Mirroring (1-9999)
    - NNNNNNNNNNNNNNNN  # Not Found (16 N's)
    - 0000000000000000  # Success
    - FFFFFFFFFFFFFFFF  # Error (16 hex F's)

- id: picture_mute_status
  label: Picture Mute Status
  type: enum
  values:
    - 0  # Disabled
    - 1  # Enabled
    - FFFFFFFF  # Error (16 hex F's)

- id: scene_setting
  label: Scene Setting
  type: string
  values:
    - XXXXXXXXXXXXXXXX  # Success with scene value (16 chars, right-padded with '#')
    - NNNNNNNNNNNNNNNN  # Not available for current input (16 N's)
    - FFFFFFFFFFFFFFFF  # Error (16 hex F's)

- id: ircc_response
  label: IR Command Response
  type: enum
  values:
    - 0000000000000000  # Success
    - FFFFFFFFFFFFFFFF  # Error (16 hex F's)

- id: broadcast_address
  label: Broadcast IPv4 Address
  type: string
  description: Returns broadcast address of specified interface (e.g., 192.168.0.14####), right-padded with '#'

- id: mac_address
  label: MAC Address
  type: string
  description: Returns MAC address of specified interface (12 hex digits), right-padded with '#'
```

## Variables
```yaml
# No standalone settable parameters - all are action-based
```

## Events
```yaml
- id: fire_power_change
  label: Power Change Event
  command: "*SNPOWR000000000000000{0|1}\n"  # N=0x4E notify
  params:
    - name: status
      type: integer
      enum: [0, 1]
      description: 0 = powering off, 1 = powering on

- id: fire_input_change
  label: Input Change Event
  command: "*SNINPT00000000000{type}000{port:04d}\n"  # type 1/3/4/5 + port
  params:
    - name: input_type
      type: integer
      enum: [1, 3, 4, 5]
      description: Input source code (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring)
    - name: port
      type: integer
      description: Port number (1-9999)

- id: fire_volume_change
  label: Volume Change Event
  command: "*SNVOLU00000000000000{vol:02d}\n"
  params:
    - name: volume
      type: string
      description: Current volume value (16-digit decimal, right-padded with '0')

- id: fire_mute_change
  label: Mute Change Event
  command: "*SNAMUT000000000000000{0|1}\n"
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = unmuting, 1 = muting

- id: fire_picture_mute_change
  label: Picture Mute Change Event
  command: "*SNPMUT000000000000000{0|1}\n"
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = picture mute enabled, 1 = picture mute disabled
```

## Macros
```yaml
# No explicit multi-step macros defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: 24-byte fixed-length SSIP messages. Header 0x2A 0x53, Footer 0x0A. Four-CC command codes. No authentication required. Required monitor settings: [Settings] → [Network & Internet] → [Remote device settings] → [Control remotely], then [Settings] → [Network & Internet] → [Home network] → [IP control] → [Simple IP control].

Message types: 0x43 [C]=Control, 0x45 [E]=Enquiry, 0x41 [A]=Answer, 0x4E [N]=Notify. Common parameters: 'C' type uses '#' fill for no-param toggles; 'E' type uses '#' fill; 'A' success = "0000000000000000" (16 zeros), 'A' error = "FFFFFFFFFFFFFFFF" (16 hex F's), 'A' not-found/not-available = "NNNNNNNNNNNNNNNN" (16 N's).

IR command codes via setIrccCode (selective): Display(5), Home(6), Options(7), Return(8), Up(9), Down(10), Right(11), Left(12), Confirm(13), Red(14), Green(15), Yellow(16), Blue(17), Num1-9(18-26), Num0(27), Volume Up(30), Volume Down(31), Mute(32), Channel Up(33), Channel Down(34), Subtitle(35), DOT(38), Picture Off(50), Wide(61), Jump(62), Sync Menu(76), Forward(77), Play(78), Rewind(79), Prev(80), Stop(81), Next(82), Pause(84), Flash Plus(86), Flash Minus(87), TV Power(98), Audio(99), Input(101), Sleep(104), Sleep Timer(105), Video 2(108), Picture Mode(110), Demo Surround(121), HDMI 1-4(124-127), Action Menu(129), Help(130).

EU models: 3 RED-DA compliance spec variants - settings and available commands differ per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.

<!-- UNRESOLVED: full IR command code table truncated at 278 lines (Help=130 is last entry shown); getBroadcastAddress/getMacAddress answer payload format partially documented (interface name "eth0" is the only example given) -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T05:22:09.696Z
last_checked_at: 2026-06-12T19:48:43.548Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:48:43.548Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched verbatim in source command table with correct SSIP Four-CC mnemonics and parameter shapes. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU model RED-DA compliance variations not documented in full"
- "no safety warnings or interlock procedures in source"
- "full IR command code table truncated at 278 lines (Help=130 is last entry shown); getBroadcastAddress/getMacAddress answer payload format partially documented (interface name \"eth0\" is the only example given)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
